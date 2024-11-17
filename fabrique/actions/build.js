import { cp, glob, readFile, rm, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { cmd } from '../helpers/cmd.js';

/**
 * Builds the lib.
 * @param {{ cwd?: string; dev?: boolean }} options
 * @return {Promise<void>}
 */
async function build({ dev = false } = {}) {
  const rootPath = '.';
  const sourcePath = './src';
  const destinationPath = './dist';

  await removeDestination(destinationPath);

  try {
    const [withProtected] = await Promise.all([
      buildTypescript(sourcePath),
      buildScss(sourcePath, destinationPath),
      copyOtherFiles(rootPath, destinationPath),
    ]);

    await buildPackageJsonFile(destinationPath, {
      dev,
      withProtected,
    });
  } catch (error) {
    await removeDestination(destinationPath);
    throw error;
  }

  console.log('Library built with success !');
}

/**
 * Removes the destination folder.
 *
 * @param {string} destinationPath
 * @return {Promise<void>}
 */
async function removeDestination(destinationPath) {
  await rm(destinationPath, { recursive: true, force: true });
}

/**
 * Builds the typescript part.
 *
 * @param {string} sourcePath
 * @return {Promise<boolean>}
 */
async function buildTypescript(sourcePath) {
  const typescriptIndexFilePath = await buildTypescriptIndexFile(sourcePath);
  const typescriptProtectedIndexFilePath = await buildTypescriptProtectedIndexFile(sourcePath);

  try {
    await compileTypescript();
    // await copyTypescriptFiles(sourcePath, destinationPath);
  } finally {
    await removeTypescriptIndexFile(typescriptIndexFilePath);
    if (typescriptProtectedIndexFilePath !== null) {
      await removeTypescriptIndexFile(typescriptProtectedIndexFilePath);
    }
  }

  return typescriptProtectedIndexFilePath !== null;
}

/**
 * Builds the scss part.
 *
 * @param {string} sourcePath
 * @param {string} destinationPath
 * @return {Promise<void>}
 */
async function buildScss(sourcePath, destinationPath) {
  await copyScssFiles(sourcePath, destinationPath);
  await buildScssIndexFile(destinationPath);
}

/**
 * Builds the typescript index file used to export all public APIs.
 *
 * @param {string} cwd
 * @return {Promise<string>}
 */
async function buildTypescriptIndexFile(cwd = process.cwd()) {
  console.log('Building typescript index file...');

  const content = (
    await Array.fromAsync(
      glob('./**/*.ts', {
        cwd,
        exclude: (path) => {
          return (
            path.endsWith('.spec.ts') ||
            path.endsWith('.test.ts') ||
            path.includes('.private') ||
            path.includes('.protected')
          );
        },
      }),
    )
  )
    .map((path) => {
      return `export * from './${path.replaceAll('\\', '/').slice(0, -3)}.js';`;
    })
    .join('\n');

  if (content === '') {
    throw new Error('Nothing exported.');
  }

  const indexFilePath = join(cwd, 'index.ts');
  await writeFile(indexFilePath, content + '\n');

  return indexFilePath;
}

/**
 * Builds the typescript index file used to export all protected APIs.
 *
 * @param {string} cwd
 * @return {Promise<string | null>}
 */
async function buildTypescriptProtectedIndexFile(cwd = process.cwd()) {
  console.log('Building typescript protected index file...');

  const content = (
    await Array.fromAsync(
      glob('{./**/*.protected/**/*.ts,./**/*.protected.ts,}', {
        cwd,
        exclude: (path) => {
          return (
            path.endsWith('.spec.ts') || path.endsWith('.test.ts') || path.includes('.private')
          );
        },
      }),
    )
  )
    .map((path) => {
      return `export * from './${path.replaceAll('\\', '/').slice(0, -3)}.js';`;
    })
    .join('\n');

  if (content === '') {
    return null;
  }

  const indexFilePath = join(cwd, 'index.protected.ts');
  await writeFile(indexFilePath, content + '\n');

  return indexFilePath;
}

/**
 * Compiles the typescript files.
 *
 * @param {string | undefined } cwd
 * @return {Promise<void>}
 */
async function compileTypescript(cwd = process.cwd()) {
  console.log('Compiling typescript...');

  await cmd('tsc', ['-p', './tsconfig.build.json'], { cwd });
}

/**
 * Copies typescript files into the destination.
 *
 * @param {string} sourcePath
 * @param {string} destinationPath
 * @return {Promise<void>}
 */
async function copyTypescriptFiles(sourcePath, destinationPath) {
  console.log('Copying typescript files...');

  for await (const path of glob('./**/!(*.spec|*.test).ts', { cwd: sourcePath })) {
    await cp(join(sourcePath, path), join(destinationPath, path));
  }
}

/**
 * Builds the typescript index file used to export all public APIs.
 *
 * @param {string} cwd
 * @return {Promise<void>}
 */
async function buildScssIndexFile(cwd = process.cwd()) {
  console.log('Building scss index file...');

  // TODO exclude directories too
  const content = (await Array.fromAsync(glob('./**/!(*.private).scss', { cwd })))
    .map((path) => {
      return `@forward './${path.slice(0, -5)}';`;
    })
    .join('\n');

  if (content === '') {
    console.log('=> No scss file to export.');
  } else {
    const indexFilePath = join(cwd, 'index.scss');
    await writeFile(indexFilePath, content + '\n');
  }
}

/**
 * Copies scss files into the destination.
 *
 * @param {string} sourcePath
 * @param {string} destinationPath
 * @return {Promise<void>}
 */
async function copyScssFiles(sourcePath, destinationPath) {
  console.log('Copying scss files...');

  for await (const path of glob('./**/!(*.private).scss', { cwd: sourcePath })) {
    // await cp(join(sourcePath, path), join(destinationPath, path));
    await writeFile(
      join(destinationPath, path),
      fixScssFileContent(await readFile(join(sourcePath, path), { encoding: 'utf8' })),
    );
  }
}

/**
 * Fixes the content of a scss file.
 *
 * @param {string} content
 * @return {string}
 */
function fixScssFileContent(content) {
  return content.replace(/@(use|import)\s+['"]([^'"]*)['"]/g, (_, type, importPath) => {
    if (isAbsolute(importPath)) {
      throw new Error(`Import path ${importPath} cannot be absolute.`);
    }

    if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
      importPath = `./${importPath}`;
    }

    if (importPath.endsWith('.scss')) {
      importPath = importPath.slice(0, -5);
    }

    return `@${type} '${fixScssFilePath(importPath)}'`;
  });
}

/**
 * Fixes a scss file path.
 *
 * @param {string} path
 * @return {string}
 */
function fixScssFilePath(path) {
  if (!path.startsWith('@')) {
    if (isAbsolute(path)) {
      throw new Error(`Import path ${path} cannot be absolute.`);
    }

    if (!path.startsWith('./') && !path.startsWith('../')) {
      path = `./${path}`;
    }
  }

  if (path.endsWith('.scss')) {
    path = path.slice(0, -5);
  }

  return path;
}

/**
 * Copies other files.
 *
 * @param {string} rootPath
 * @param {string} destinationPath
 * @return {Promise<void>}
 */
async function copyOtherFiles(rootPath, destinationPath) {
  console.log('Copying other files...');

  await Promise.all(
    ['README.md', 'CONTRIBUTING.md', 'LICENSE'].map((path) => {
      return cp(join(rootPath, path), join(destinationPath, path)).catch(() => {
        console.log(`Missing file: ${path}`);
      });
    }),
  );
}

/**
 * Removes the index file.
 *
 * @param {string} indexFilePath
 * @return {Promise<void>}
 */
async function removeTypescriptIndexFile(indexFilePath) {
  await rm(indexFilePath);
}

/**
 * Generates the package.json to publish.
 *
 * @param {string} destinationPath
 * @param {{ cwd?: string; dev?: boolean, withProtected?: boolean }} options
 * @return {Promise<void>}
 */
async function buildPackageJsonFile(
  destinationPath,
  { cwd = process.cwd(), dev = false, withProtected = false } = {},
) {
  console.log('Building package.json...');

  const fileName = 'package.json';

  /**
   * @type any
   */
  const pkg = JSON.parse(await readFile(join(cwd, fileName), { encoding: 'utf8' }));

  const indexTypesPath = './index.d.ts';

  if (dev) {
    pkg.version += `-dev.${Date.now()}`;
  }

  Object.assign(pkg, {
    exports: {
      '.': {
        types: indexTypesPath,
        default: './index.js',
      },
      ...(withProtected
        ? {
            './protected': {
              types: './index.protected.d.ts',
              default: './index.protected.js',
            },
          }
        : {}),
    },
    typings: indexTypesPath,
    types: indexTypesPath,
  });

  await writeFile(join(destinationPath, fileName), JSON.stringify(pkg, null, 2));
}

/*-----------------------------------*/

const [dev = false] = process.argv.slice(2);

build({ dev });
