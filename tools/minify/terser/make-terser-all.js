const makeTerser = require('./make-terser');

makeTerser('dist/global/traits.umd.js', {
  format: {
    comments: false,
  }
});
