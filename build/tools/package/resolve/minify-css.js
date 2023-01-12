const cssnano = require('cssnano');
const postcss = require('postcss');

// https://github.com/clean-css/clean-css
// https://github.com/postcss/postcss
// https://vitejs.dev/guide/features.html#postcss
// https://cssnano.co/docs/config-file/

function minifyCSS(
  code,
  from = '',
) {
  const cssnanoPlugin = cssnano({
    preset: 'default',
  });

  return postcss([
    cssnanoPlugin,
  ])
    .process(code, { from })
    .then((result) => {
      return result.css;
    });
}

module.exports = {
  minifyCSS,
};
