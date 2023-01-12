const $util = require('util');
const $path = require('path');
const $fs = require('fs/promises');
const $fsh = require('../../misc/fs-helpers.js');
const $acorn = require('acorn');
const $acornWalk = require('acorn-walk');
const $astring = require('astring');
const $crypto = require('crypto');
const { minifyHTML } = require('./minify-html');
const { minifyCSS } = require('./minify-css');
const { compileSASS } = require('./compile-sass');

const ROOT_PATH = $path.join(__dirname, '../../../../');
const SRC_PATH = $path.join(ROOT_PATH, 'src');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const MJS_CACHE_PATH = $path.join(DIST_PATH, '.mjs-cache');
const CJS_CACHE_PATH = $path.join(DIST_PATH, '.cjs-cache');

function logObject(obj) {
  console.log($util.inspect(obj, false, null, true /* enable colors */));
}


function isRelativeRequire(value) {
  // return importPath.startsWith('.')
  //   || $path.isAbsolute(importPath);
  return value.startsWith('./')
    || value.startsWith('../')
    || value.startsWith('/');

}

// https://nodejs.org/api/modules.html#modules_all_together

function isFile(path) {
  return $fs.stat(path)
    .then(
      (stats) => {
        return stats.isFile();
      },
      (error) => {
        if (error.code === 'ENOENT') {
          return false;
        } else {
          throw error;
        }
      },
    );
}

function isFileRelative(
  sourcePath,
  path,
) {
  return isFile($path.join($path.dirname(sourcePath), path));
}


function createRawFileESM(
  path,
  content,
) {
  return $fs.writeFile(path, `export default ${JSON.stringify(content)};`);
}

function createRawFileCJS(
  path,
  content,
) {
  return $fs.writeFile(path, `module.exports = ${JSON.stringify(content)};`);
}


function createRawFileModule(
  path,
  content,
  mode,
) {
  switch (mode) {
    case 'mjs':
     return createRawFileESM(path, content);
    case 'cjs':
      return createRawFileCJS(path, content);
    default:
      throw new Error(`Invalid module mode`);
  }
}


function createHashedRawFileModule(
  path,
  content,
  mode,
) {
  const id = $crypto.createHash('sha256').update(content).digest('hex');
  const name = `${id}.${mode}`;
  const newPath = $path.join($path.dirname(path), name);
  return createRawFileModule(newPath, content, mode)
    .then(() => newPath);
}

function findOriginalFilePath(
  path,
  mode,
) {
  const modePath = (() => {
    switch (mode) {
      case 'mjs':
        return 'src';
      case 'cjs':
        return 'cjs/src';
      default:
        throw new Error(`Invalid module mode`);
    }
  })();

  const relativeToDistPath = $path.relative($path.join($path.resolve(DIST_PATH), modePath), $path.resolve(path));

  return $path.join(SRC_PATH, relativeToDistPath);
}

async function isSpecialRequireValue(
  sourcePath,
  path,
  mode,
) {
  const parentPath = $path.dirname(sourcePath);
  const _path = $path.join(parentPath, path);
  const url = new URL(_path, 'https://test.com');

  const pathname = url.pathname;
  const extension = $path.extname(url.pathname);

  const raw = url.searchParams.has('raw');
  const inline = url.searchParams.has('inline');


  if (extension === '.html') {
    const srcPath = findOriginalFilePath(pathname, mode);
    const content = await minifyHTML(await $fs.readFile(srcPath, { encoding: 'utf8' }));
    const newPath = await createHashedRawFileModule(pathname, content, mode);
    console.log(`optimizing html: ${srcPath}`);
    return './' + $path.relative(parentPath, newPath);
  } else if (extension === '.css') {
    const srcPath = findOriginalFilePath(pathname, mode);
    const content = await minifyCSS(await $fs.readFile(srcPath, { encoding: 'utf8' }), srcPath);
    const newPath = await createHashedRawFileModule(pathname, content, mode);
    console.log(`optimizing css: ${srcPath}`);
    return './' + $path.relative(parentPath, newPath);
  } else if (extension === '.scss') {
    const srcPath = findOriginalFilePath(pathname, mode);
    const content = await compileSASS(srcPath);
    const newPath = await createHashedRawFileModule(pathname, content, mode);
    console.log(`optimizing scss: ${srcPath}`);
    return './' + $path.relative(parentPath, newPath);
  } else {
    return null;
  }
}

async function resolveRequireAsFile(
  sourcePath,
  value,
  mode,
) {
  let _value;
  if ((_value = await isSpecialRequireValue(sourcePath, value, mode)) !== null) {
    return _value;
  }
  if (await isFileRelative(sourcePath, value)) {
    return value;
  }
  const withJSExt = `${ value }.js`;
  if (await isFileRelative(sourcePath, withJSExt)) {
    return withJSExt;
  }
  const withMJSExt = `${ value }.mjs`;
  if (await isFileRelative(sourcePath, withMJSExt)) {
    return withMJSExt;
  }
  const withCJSExt = `${ value }.cjs`;
  if (await isFileRelative(sourcePath, withCJSExt)) {
    return withCJSExt;
  }
  const withJSONExt = `${ value }.json`;
  if (await isFileRelative(sourcePath, withJSONExt)) {
    return withJSONExt;
  }
  return null;
}

async function resolveRequireLoadIndex(
  sourcePath,
  value,
) {
  const withJSExt = `${ value }/index.js`;
  if (await isFileRelative(sourcePath, withJSExt)) {
    return withJSExt;
  }
  const withMJSExt = `${ value }/index.mjs`;
  if (await isFileRelative(sourcePath, withMJSExt)) {
    return withMJSExt;
  }
  const withCJSExt = `${ value }/index.cjs`;
  if (await isFileRelative(sourcePath, withCJSExt)) {
    return withCJSExt;
  }
  const withJSONExt = `${ value }/index.json`;
  if (await isFileRelative(sourcePath, withJSONExt)) {
    return withJSONExt;
  }
  return null;
}


async function resolveRequireAsDirectory(
  sourcePath,
  value,
) {
  const packageJSON = `${ value }/package.json`;
  if (await isFileRelative(sourcePath, packageJSON)) {
    throw new Error(`TODO: support package.json`);
  }

  const asIndex = await resolveRequireLoadIndex(sourcePath, value);
  if (asIndex !== null) {
    return asIndex;
  }

  return null;
}


async function resolveRelativeRequire(
  sourcePath,
  value,
  mode,
) {
  const asFile = await resolveRequireAsFile(sourcePath, value, mode);
  if (asFile !== null) {
    return asFile;
  }

  const asDirectory = await resolveRequireAsDirectory(sourcePath, value);
  if (asDirectory !== null) {
    return asDirectory;
  }

  // TODO LOAD_PACKAGE_IMPORTS
  // TODO LOAD_PACKAGE_IMPORTS
  // TODO LOAD_PACKAGE_SELF

  throw new Error(`Not found:  ${ value }`);
}


function resolveRequire(
  sourcePath,
  value,
  mode,
) {
  return isRelativeRequire(value)
    ? resolveRelativeRequire(sourcePath, value, mode)
    : Promise.resolve(value);
}

// alternative shortcut
/**
 * TODO
 * https://nodejs.org/api/esm.html
 *
 * - use nodejs resolution algorithm - MOSTLY implemented
 * - support data:... import
 * - support file:... import
 * - support caching to avoid rebuild everything everytime - EXPERIMENTAL
 */

async function resolveMJSFile(jsFilePath) {
  const cache = await loadMJSCache();

  if (cache.has(jsFilePath)) {
    const stats = await $fs.stat(jsFilePath);
    if (stats.mtimeMs < cache.get(jsFilePath)) { // already done
      // console.log('cached', jsFilePath);
      return;
    }
  }

  // if (!jsFilePath.includes('index')) {
  // if (!jsFilePath.includes('hello-world-named')) {
  // if (!jsFilePath.includes('hello-world-import')) {
  // if (!jsFilePath.includes('hello-world-import-all')) {
  //   return;
  // }

  let jsFileContent = await $fs.readFile(jsFilePath, { encoding: 'utf8' });

  const tree = $acorn.parse(jsFileContent, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  });
  // logObject(tree);

  const promises = [];

  $acornWalk.full(tree, node => {

    const resolve = (node) => {
      const requireValue = node.value;
      promises.push(
        resolveRequire(jsFilePath, requireValue, 'mjs')
          .then((resolvedRequireValue) => {
            // console.log(jsFilePath, ':', requireValue, '->', resolvedRequireValue);
            node.value = resolvedRequireValue;
            node.raw = JSON.stringify(resolvedRequireValue);
          }),
      );
    };

    switch (node.type) {
      case 'ImportExpression': {  // await import('./hello-world-lazy')
        if (node.source.type === 'Literal') { // only literal is currently supported
          resolve(node.source);
        }
        break;
      }
      case 'ImportDeclaration': {  // import { helloWorldNamed } from './hello-world-named'; or import * as helloWorld from './hello-world-named';
        if (node.source.type === 'Literal') {
          resolve(node.source);
        }
        break;
      }
      case 'ExportAllDeclaration': {  // export * from './src/index';
        resolve(node.source);
        break;
      }
      case 'ExportNamedDeclaration': {  // export { helloWorldNamed } from './hello-world-named';
        if (node.source && (node.source.type === 'Literal')) {
          resolve(node.source);
        }
        break;
      }
    }
  });

  await Promise.all(promises);

  jsFileContent = $astring.generate(tree);

  await $fs.writeFile(jsFilePath, jsFileContent);

  cache.set(jsFilePath, Date.now());
}


async function resolveCJSFile(jsFilePath) {
  const cache = await loadCJSCache();

  if (cache.has(jsFilePath)) {
    const stats = await $fs.stat(jsFilePath);
    if (stats.mtimeMs < cache.get(jsFilePath)) { // already done
      // console.log('cached', jsFilePath);
      return;
    }
  }

  let jsFileContent = await $fs.readFile(jsFilePath, { encoding: 'utf8' });

  const tree = $acorn.parse(jsFileContent, {
    ecmaVersion: 'latest',
    sourceType: 'script',
  });
  // logObject(tree);

  const promises = [];

  $acornWalk.full(tree, node => {

    const resolve = (node) => {
      const requireValue = node.value;
      promises.push(
        resolveRequire(jsFilePath, requireValue, 'cjs')
          .then((resolvedRequireValue) => {
            // console.log(jsFilePath, ':', requireValue, '->', resolvedRequireValue);
            node.value = resolvedRequireValue;
            node.raw = JSON.stringify(resolvedRequireValue);
          }),
      );
    };

    switch (node.type) {
      case 'CallExpression': {  // require('./hello-world-lazy')
        if (
          (
            (node.callee.type === 'Identifier')
            && (node.callee.name === 'require')
          )
          &&
          (
            (node.arguments.length === 1)
            && (node.arguments[0].type === 'Literal')
          )
        ) { // only literal is currently supported
          resolve(node.arguments[0]);
        }
        break;
      }
    }
  });

  await Promise.all(promises);

  jsFileContent = $astring.generate(tree);

  // console.log(jsFileContent);
  await $fs.writeFile(jsFilePath, jsFileContent);

  cache.set(jsFilePath, Date.now());
}

/* START - CACHE */

const CACHED_PROMISE_MAP = new Map();

function loadCache(
  cachedPromiseName,
  path,
) {
  let cachedPromise = CACHED_PROMISE_MAP.get(cachedPromiseName);
  if (cachedPromise === void 0) {
    cachedPromise = $fs.readFile(path, 'utf8')
      .then(
        (content) => {
          return new Map(JSON.parse(content));
        },
        () => {
          return new Map();
        },
      );

    CACHED_PROMISE_MAP.set(cachedPromiseName, cachedPromise);
  }
  return cachedPromise;
}

function saveCache(
  cachedPromiseName,
  path,
) {
  return (
    CACHED_PROMISE_MAP.has(cachedPromiseName)
      ? CACHED_PROMISE_MAP.get(cachedPromiseName)
      : Promise.resolve(new Map())
  )
    .then((cache) => {
      return $fs.writeFile(path, JSON.stringify(Array.from(cache.entries()), null, 2), 'utf8');
    });
}

// MJS

function loadMJSCache() {
  return loadCache(
    'mjs',
    MJS_CACHE_PATH,
  );
}

function saveMJSCache() {
  return saveCache(
    'mjs',
    MJS_CACHE_PATH,
  );
}

// CJS

function loadCJSCache() {
  return loadCache(
    'cjs',
    CJS_CACHE_PATH,
  );
}

function saveCJSCache() {
  return saveCache(
    'cjs',
    CJS_CACHE_PATH,
  );
}


/* END - CACHE */

function resolveNodeModules(
  modes,  // Set<'mjs' | 'cjs'>
) {
  return $fsh.createDirectory(DIST_PATH)
    .then(() => {
      return $fsh.exploreDirectory(DIST_PATH, (entryPath, entry) => {
        if (entry.isFile()) {
          if (entryPath.includes('/cjs/')) {
            if (entryPath.endsWith('.cjs')) {
              if (modes.has('cjs')) {
                return resolveCJSFile(entryPath);
              }
            }
          } else {
            if (entryPath.endsWith('.mjs')) {
              if (modes.has('mjs')) {
                return resolveMJSFile(entryPath);
              }
            }
          }
        }
      });
    })
    .then(() => {
      const cachePromises = [];
      if (modes.has('cjs')) {
        cachePromises.push(saveCJSCache());
      }
      if (modes.has('mjs')) {
        cachePromises.push(saveMJSCache());
      }
      return Promise.all(cachePromises);
    });
}

function getModes() {
  const modes = new Set();
  if (process.argv.includes('--cjs')) {
    modes.add('cjs');
  }
  if (process.argv.includes('--mjs')) {
    modes.add('mjs');
  }
  return modes;
}


// console.log(getModes());
resolveNodeModules(getModes())
  .catch((error) => {
    console.error(error);
  });


