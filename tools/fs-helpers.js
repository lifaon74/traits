const $fs = require('fs').promises;
const $path = require('path');

function exploreDirectory(path, callback) {
  return exploreDirectoryConcurrent(path, callback);
}

function exploreDirectorySequential(path, callback) {
  return $fs.readdir(path, { withFileTypes: true })
    .then(async (entries) => {
      for (const entry of entries) {
        const subPath = $path.join(path, entry.name);
        await new Promise(resolve => resolve(callback(subPath, entry)))
          .then(() => {
            if (entry.isDirectory()) {
              return exploreDirectorySequential(subPath, callback);
            }
          });
      }
    })
}

function exploreDirectoryConcurrent(path, callback) {
  return $fs.readdir(path, { withFileTypes: true })
    .then((entries) => {
      return Promise.all(
        entries.map((entry) => {
          const subPath = $path.join(path, entry.name);
          return new Promise(resolve => resolve(callback(subPath, entry)))
            .then(() => {
              if (entry.isDirectory()) {
                return exploreDirectoryConcurrent(subPath, callback);
              }
            });
        })
      );
    })
}

function createDirectory(path) {
  return $fs.mkdir(path, { recursive: true })
    .catch((error) => {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    });
}

function copyDirectory(source, destination, filter = () => true) {
  return exploreDirectory(source, (sourcePath, entry) => {
    if (entry.isFile()) {
      // console.log('\n');
      // console.log(sourcePath);
      // console.log($path.join(destination, $path.relative(source, sourcePath)));
      // console.log('\n');
      const destinationPath = $path.join(destination, $path.relative(source, sourcePath));

      if (filter(sourcePath, destinationPath, entry)) {
        return copyFile(sourcePath, destinationPath);
      }
    }
  });
}

function copyFile(source, destination) {
  return createDirectory($path.dirname(destination))
    .then(() => $fs.copyFile(source, destination));
}

module.exports = {
  exploreDirectory,
  createDirectory,
  copyDirectory,
};
