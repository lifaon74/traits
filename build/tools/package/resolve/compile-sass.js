const sass = require('sass');
const { minifyCSS } = require('./minify-css');


function compileSASS(
  path,
) {
  return minifyCSS(sass.compile(path).css, path);
}

module.exports = {
  compileSASS,
};
