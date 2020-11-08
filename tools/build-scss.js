const $fsh = require('./fs-helpers');
const $fs = require('fs').promises;
const $path = require('path');
const $sass = require('node-sass');

if (process.argv.length !== 3) {
  throw new Error(`Expects only one argument: the dist folder`);
}

const ROOT = $path.join(__dirname, '../');
const DIST_ROOT = $path.join(ROOT, 'dist');
const SRC_ROOT = $path.join(ROOT, 'src');
const DIR_ROOT = $path.join(DIST_ROOT, process.argv[2]);

function renderSCSS(path) {
  return new Promise((resolve, reject) => {
    $sass.render({ file: path }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  });
}

function buildSCSS(source, destination) {
  return $fsh.exploreDirectory(source, (sourcePath, entry) => {
    if (entry.isFile() && sourcePath.endsWith('.scss')) {
      const destinationPath = $path.join(destination, $path.relative(source, sourcePath)).replace(/\.scss$/g, '.css');
      // console.log('--------------');
      // console.log('explore', sourcePath);
      // console.log('destinationPath', destinationPath);
      return renderSCSS(sourcePath)
        .then((result) => {
          return $fs.writeFile(destinationPath, result.css);
        });
    }
  });
}

buildSCSS(SRC_ROOT, DIR_ROOT);
