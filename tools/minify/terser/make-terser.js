const $terser = require('terser');
const $fs = require('fs').promises;
const $path = require('path');

module.exports = async function makeTerser(sourcePath, _options = {}) {
  const source = await $fs.readFile(sourcePath, 'utf8');

  const dest = sourcePath.replace(/.js$/, '.min.js');
  const sourceMapDest = dest + '.map';

  const options = Object.assign({
    // mangle: {
    //   properties: true,
    // },
    sourceMap: {
      filename: $path.basename(sourcePath),
      url: $path.basename(sourceMapDest)
    }
  }, _options);

  const result = await $terser.minify(source, options);

  if (result.error) {
    throw result;
  } else {
    await $fs.writeFile(dest, result.code, 'utf8');
    await $fs.writeFile(sourceMapDest, result.map, 'utf8');
  }
};
