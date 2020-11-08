const makeTerser = require('./make-terser');

makeTerser('dist/global/traits.core.umd.js', {
  format: {
    comments: false,
  }
});
