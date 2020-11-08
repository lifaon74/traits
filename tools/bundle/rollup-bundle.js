const rollup = require('rollup');
const rollupAlias = require('rollup-plugin-alias');
const rollupInject = require('rollup-plugin-inject');
const rollupNodeResolve = require('rollup-plugin-node-resolve');

const $fs = require('fs').promises;
const tslib = require('tslib');
const $path = require('path');

function mapValues(input, mapper) {
  return Object.entries(input)
    .reduce( (result, [key, value]) => {
      result[key] = mapper(value, key, result);
      return result;
    }, {});
}

function getImportMeta(url) {
  return `((function() {
    var meta = { url: ${url} };
    try {
      return Object.assign({}, eval('import.meta'), meta);
    } catch (e) {
      return meta;
    }
  })())`;

}

module.exports = function rollupBundle(options) {
  const dest = options.dest;
  const sourcemapFullFile = dest + '.map';

  rollup.rollup({
    input: options.input,
    plugins: [
      rollupAlias(options.aliases),
      rollupNodeResolve({
        mainFields: ['jsnext:main', 'browser', 'module', 'main'],
      }),
      rollupInject({
        exclude: 'node_modules/**',
        modules: mapValues(tslib, (value, key) => {
          return ['tslib', key];
        }),
      }),
      {
        resolveImportMeta(prop, { moduleId }) {
          moduleId = $path.resolve(process.cwd(), moduleId);
          const destinationFolder = $path.dirname($path.resolve(process.cwd(), dest));
          const relativePath = $path.relative(destinationFolder, moduleId);
          // console.log('------------------------------');
          // console.log('moduleId', moduleId);
          // console.log('dest', dest);
          // console.log('relativePath', relativePath, relativePath.replace('\\', '/'));

          const path = relativePath.replace('\\', '/');
          const url = `new URL(${JSON.stringify(path)}, window.origin).href`;
          if (prop === 'url') {
            return url;
          }

          // also handle just `import.meta`
          if (prop === null) {
            return getImportMeta(url);
            // return `Object.assign({}, import.meta, { url: ${url} })`;
          }

          // use the default behaviour for all other props
          return null;
        }
      }
    ],
  })
    .then((bundle) => {
      return bundle.generate({
        format: 'umd',
        name: 'traits',
        amd: {
          id: 'traits'
        },
        sourcemap: true,
      });
    })
    .then((result) => {
      const _result = result.output[0];
      // rollup doesn't add a sourceMappingURL
      // https://github.com/rollup/rollup/issues/121
      _result.code = _result.code + '\n//# sourceMappingURL=' + $path.basename(sourcemapFullFile);

      return Promise.all([
        $fs.writeFile(dest, _result.code),
        $fs.writeFile(sourcemapFullFile, _result.map.toString())
      ]);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
