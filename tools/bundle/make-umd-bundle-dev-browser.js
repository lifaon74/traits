const rollupBundle = require('./rollup-bundle');

rollupBundle({
  input: 'dist/browser/app.js',
  dest: 'dist/browser/app.bundled.js',
});
