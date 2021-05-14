const $path = require('path');
const $fs = require('fs').promises;
const $fsh = require('../misc/fs-helpers.js');

// https://docs.skypack.dev/package-authors/package-checks
// https://nodejs.org/api/packages.html#packages_conditional_exports

const ROOT_PATH = $path.join(__dirname, '../../../');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const SRC_PATH = $path.join(ROOT_PATH, 'src');

function generatePackageJSON() {
  const pkg = {
    ...require($path.join(ROOT_PATH, 'package.json')),
    type: 'module',
    main: './cjs/index.cjs',
    typings: './index.d.ts',
    module: './index.mjs',
    exports: {
      'import': './index.mjs',
      'require': './cjs/index.cjs',
    },
  };

  return $fs.writeFile($path.join(DIST_PATH, 'package.json'), JSON.stringify(pkg, null, 2));
}

function generateNPMIgnore() {
  return $fs.writeFile($path.join(DIST_PATH, '.npmignore'), [
    `.npmrc`,
    `.yarn.lock`,
    `package-lock.json`,
    `.cache`,
  ].join('\n'));
}

function copyReadmeAndLicense() {
  return Promise.all([
    $fs.copyFile($path.join(ROOT_PATH, 'README.md'), $path.join(DIST_PATH, 'README.md')),
    $fs.copyFile($path.join(ROOT_PATH, 'LICENSE'), $path.join(DIST_PATH, 'LICENSE')),
  ]);
}


function assemblePackage() {
  return $fsh.createDirectory(DIST_PATH)
    .then(() => {
      return Promise.all([
        generatePackageJSON(),
        generateNPMIgnore(),
        copyReadmeAndLicense(),
      ]);
    });
}

assemblePackage()
  .catch((error) => {
    console.error(error);
  });


