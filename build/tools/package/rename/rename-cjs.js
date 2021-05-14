const $path = require('path');
const $fs = require('fs').promises;
const $fsh = require('../../misc/fs-helpers.js');

const ROOT_PATH = $path.join(__dirname, '../../../../');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const DIST_CJS_PATH = $path.join(DIST_PATH, 'cjs');

async function renameCJSFile(jsFilePath) {
  const newPath = `${ jsFilePath.slice(0, -3) }.cjs`;
  await $fs.rename(jsFilePath, newPath);
}

function renameCJS() {
  return $fsh.createDirectory(DIST_CJS_PATH)
    .then(() => {
      return $fsh.exploreDirectory(DIST_CJS_PATH, (entryPath, entry) => {
        if (entry.isFile()) {
          if (entryPath.endsWith('.js')) {
            return renameCJSFile(entryPath);
          }
        }
      });
    });
}

renameCJS()
  .catch((error) => {
    console.error(error);
  });


