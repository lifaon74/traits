const $fsh = require('./fs-helpers');
const $fs = require('fs').promises;
const $path = require('path');

module.exports = function fixSourceMap(mapRoot, sourcesRoot) {
  return $fsh.exploreDirectory(mapRoot, (path, entry) => {
    if (entry.isFile() && path.endsWith('.js.map')) {
      return $fs.readFile(path)
        .then((content) => {
          const sourceMap = JSON.parse(content.toString());
          sourceMap.sources = sourceMap.sources.map((source) => {
            return $path.relative($path.dirname(path), $path.resolve($path.join(sourcesRoot, source)));
          });
          delete sourceMap.sourceRoot;
          return sourceMap;
        })
        .then((sourceMap) => {
          return $fs.writeFile(path, JSON.stringify(sourceMap));
        });
    }
  });
};

