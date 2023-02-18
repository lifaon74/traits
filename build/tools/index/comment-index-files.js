const $fsh = require('../misc/fs-helpers.js');
const $path = require('path');
const { promises: $fs } = require('fs');

const ROOT_PATH = $path.join(__dirname, '../../../');
const SRC_PATH = $path.join(ROOT_PATH, 'src');

async function commentIndexFile(indexFilePath) {
  const newFilePath = `${ indexFilePath }.txt`;
  await $fs.rename(indexFilePath, newFilePath);
}

async function uncommentIndexFile(indexFilePath) {
  const newFilePath = indexFilePath.slice(0, -4);
  await $fs.rename(indexFilePath, newFilePath);
}


function commentIndexFiles() {
  return $fsh.exploreDirectory(SRC_PATH, (entryPath, entry) => {
    if (entry.isFile()) {
      if (entryPath.endsWith('index.ts')) {
        return commentIndexFile(entryPath);
      }
    }
  });
}

function uncommentIndexFiles() {
  return $fsh.exploreDirectory(SRC_PATH, (entryPath, entry) => {
    if (entry.isFile()) {
      if (entryPath.endsWith('index.ts.txt')) {
        // console.log(entryPath);
        return uncommentIndexFile(entryPath);
      }
    }
  });
}

const uncomment = process.argv.includes('--uncomment');

(uncomment ? uncommentIndexFiles() : commentIndexFiles())
  .catch((error) => {
    console.error(error);
  });
