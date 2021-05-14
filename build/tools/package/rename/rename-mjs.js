const $path = require('path');
const $fs = require('fs').promises;
const $fsh = require('../../misc/fs-helpers.js');

const ROOT_PATH = $path.join(__dirname, '../../../../');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');

async function renameMJSFile(jsFilePath) {
  const jsFilePathWithoutExtension = jsFilePath.slice(0, -3);
  const mjsFilePath = `${ jsFilePathWithoutExtension }.mjs`;

  await $fs.rename(jsFilePath, mjsFilePath);
}


function renameMJS() {
  return $fsh.createDirectory(DIST_PATH)
    .then(() => {
      return $fsh.exploreDirectory(DIST_PATH, (entryPath, entry) => {
        if (entry.isFile()) {
          if (!entryPath.includes('/cjs/')) {
            if (entryPath.endsWith('.js')) {
              return renameMJSFile(entryPath);
            }
          }
        }
      });
    });
}

renameMJS()
  .catch((error) => {
    console.error(error);
  });


