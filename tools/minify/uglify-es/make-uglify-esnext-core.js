const makeUglify = require('./make-uglify');

makeUglify('dist/global/traits.esnext.core.umd.js', {
  compress: {
    inline: false,
    ecma: 6,
    unsafe_arrows: true,
    unsafe_comps: true,
    unsafe_methods: true,
    unsafe_undefined: true,
    warnings: true,
  },
});
