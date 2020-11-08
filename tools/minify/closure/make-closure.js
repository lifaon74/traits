const compiler = require('google-closure-compiler-js').compile;
const fs = require('fs');
const path = require('path');

module.exports = function makeClosure(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf8');

  const compilerFlags = {
    jsCode: [{ src: source }],
    languageIn: 'ES2015',
    createSourceMap: true,
    rewritePolyfills: false,
  };

  const output = compiler(compilerFlags);

  const dest = sourcePath.replace(/.js$/, '.min.js');
  const sourceMapDest = dest + '.map';
  output.compiledCode = output.compiledCode + '\n//# sourceMappingURL=' + path.basename(sourceMapDest);

  fs.writeFileSync(dest, output.compiledCode, 'utf8');
  fs.writeFileSync(sourceMapDest, output.sourceMap, 'utf8');
};
