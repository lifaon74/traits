const makeUglify = require('./make-uglify');

makeUglify('dist/global/traits.esnext.umd.js', {
  compress: {
    inline: false
  },
});
