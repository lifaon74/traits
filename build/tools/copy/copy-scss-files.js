const $path = require('path');
const $fs = require('fs/promises');
const $fsh = require('../misc/fs-helpers.js');

const ROOT_PATH = $path.resolve($path.join(__dirname, '../../..'));
const SRC_PATH = $path.join(ROOT_PATH, 'src');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const DIST_ESM_PATH = $path.join(DIST_PATH, 'src');

function copySCSSFiles() {
  return $fsh.exploreDirectory(SRC_PATH, (entryPath, entry) => {
    if (
      entry.isFile()
      && (
        entryPath.endsWith('variables.scss')
        || entryPath.endsWith('functions.scss')
        || entryPath.endsWith('mixins.scss')
        || (/^_(.*)\.scss$/).test(entryPath)
      )
    ) {
      const destPath = $path.join(DIST_ESM_PATH, $path.relative(SRC_PATH, entryPath));
      return $fsh.createDirectory($path.dirname(destPath))
        .then(() => {
          return $fs.copyFile(entryPath, destPath);
        });
    }
  });
}


copySCSSFiles()
  .catch((error) => {
    console.error(error);
  });


