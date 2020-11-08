const makeTerser = require('./make-terser');

makeTerser('dist/global/traits.esnext.umd.js', {
  compress: {
    inline: false
  },
  format: {
    comments: false,
  }
});
