const $fsh = require('./fs-helpers');
const $path = require('path');

if (process.argv.length !== 3) {
  throw new Error(`Expects only one argument: the dist folder`);
}

const ROOT = $path.join(__dirname, '../');
const DIST_ROOT = $path.join(ROOT, 'dist');
const SRC_ROOT = $path.join(ROOT, 'src');
const DIR_ROOT = $path.join(DIST_ROOT, process.argv[2]);


function copyHTMLFiles(source, destination) {
  return $fsh.copyDirectory(source, destination, (sourcePath, destinationPath, entry) => {
    return entry.isFile() && sourcePath.endsWith('.html');
  });
}

copyHTMLFiles(SRC_ROOT, DIR_ROOT);

