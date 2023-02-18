const $path = require('path');
const $fs = require('fs/promises');
const $fsh = require('../../misc/fs-helpers.js');

const ROOT_PATH = $path.resolve($path.join(__dirname, '../../../..'));
const SRC_PATH = $path.join(ROOT_PATH, 'src');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const DIST_TS_PATH = $path.join(DIST_PATH, 'ts_cjs');

function resolveImportMetaForFile(
  entryPath,
) {
  const destPath = $path.join(DIST_TS_PATH, $path.relative(ROOT_PATH, entryPath));

  return $fsh.createDirectory($path.dirname(destPath))
    .then(() => {
      if (entryPath.endsWith('.ts')) {
        return $fs.readFile(entryPath, { encoding: 'utf8' })
          .then((content) => {
            if (content.includes('import.meta.url')) {
              content = `declare const require: any;\n`
                + `declare const __filename: string;\n`
                + `const __meta__ = { url: require('url').pathToFileURL(__filename).href } as { url: string };\n\n`
                + content.replace('import.meta', '__meta__');
              return $fs.writeFile(destPath, content);
            } else {
              return $fs.copyFile(entryPath, destPath);
            }
          });
      } else {
        return $fs.copyFile(entryPath, destPath);
      }
    });
}

function resolveImportMeta() {
  return $fsh.exploreDirectory(SRC_PATH, (entryPath, entry) => {
    if (entry.isFile()) {
      return resolveImportMetaForFile(entryPath);
    }
  })
    .then(() => {
      return resolveImportMetaForFile($path.join(ROOT_PATH, 'index.ts'));
    });
}


resolveImportMeta()
  .catch((error) => {
    console.error(error);
  });

