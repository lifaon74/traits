const $path = require('path');
const $fs = require('fs').promises;
const $fsh = require('./fs-helpers.js');
const fixSourceMap = require('./fix-source-maps.js');



const ROOT = $path.join(__dirname, '../');
const DIST_ROOT = $path.join(ROOT, 'dist');
const SRC_ROOT = $path.join(ROOT, 'src');

const CJS_ROOT = $path.join(DIST_ROOT, 'cjs');
const ESM5_ROOT = $path.join(DIST_ROOT, 'esm5');
const ESNEXT_ROOT = $path.join(DIST_ROOT, 'esnext');
const ESM5_FOR_ROLLUP_ROOT = $path.join(DIST_ROOT, 'esm5_for_rollup');
const ESNEXT_FOR_ROLLUP_ROOT = $path.join(DIST_ROOT, 'esnext_for_rollup');
const ESM2015_ROOT = $path.join(DIST_ROOT, 'esm2015');
const UMD_ROOT = $path.join(DIST_ROOT, 'global');
const TYPE_ROOT = $path.join(DIST_ROOT, 'typings');

const PKG_ROOT = $path.join(DIST_ROOT, 'package');

const CJS_PKG = $path.join(PKG_ROOT, 'cjs');
const ESM5_PKG = $path.join(PKG_ROOT, 'esm5');
const ESM2015_PKG = $path.join(PKG_ROOT, 'esm2015');
const ESNEXT_PKG = $path.join(PKG_ROOT, 'esnext');
const UMD_PKG = $path.join(PKG_ROOT, 'bundles');
const SRC_ROOT_PKG = $path.join(PKG_ROOT,  'src');
const TYPE_PKG = $path.join(PKG_ROOT, 'types');


function fixUMDSourceMaps() {
  return $fsh.exploreDirectory(UMD_PKG, (path, entry) => {
    if (entry.isFile() && path.endsWith('.js.map')) {
      return $fs.readFile(path)
        .then((content) => {
          const sourceMap = JSON.parse(content.toString());
          sourceMap.sources = sourceMap.sources
            .map((source) => {
              const NODE_MODULE_PATH = /node_modules[\\\/]?/;
              source = $path.resolve(ROOT, $path.join(ROOT, source));
              const match = NODE_MODULE_PATH.exec(source);
              if (match !== null) {
                return source.substring(match.index + match[0].length);
              } else if (source.includes(ESM5_FOR_ROLLUP_ROOT)) {
                return $path.relative(ESM5_FOR_ROLLUP_ROOT, source);
              } else if (source.includes(ESNEXT_FOR_ROLLUP_ROOT)) {
                return $path.relative(ESNEXT_FOR_ROLLUP_ROOT, source);
              } else if (path.endsWith('.min.js.map')) {
                return $path.basename(path.slice(0, -('.min.js.map'.length)) + '.js');
              } else {
                console.warn(`[WARN]: unknown source path: '${ source }'`);
                console.log(`file: '${ path }'`);
                return $path.relative(ROOT, source);
              }
            })
            .map((source) => source.replace(/\\/g, '/'));
          // console.log('\n');
          // console.log(path);
          // console.log(sourceMap.sources);
          return sourceMap;
        })
        .then((sourceMap) => {
          return $fs.writeFile(path, JSON.stringify(sourceMap));
        });
    }
  });
}

function makeSRC() {
  return $fsh.copyDirectory(SRC_ROOT, SRC_ROOT_PKG)
    .then(() => {
      return $fs.copyFile($path.join(ROOT, 'tsconfig.base.json'), $path.join(PKG_ROOT, 'src/tsconfig.json'));
    });
}

function makeCJS() {
  return $fsh.copyDirectory(CJS_ROOT, CJS_PKG)
    .then(() => {
      return fixSourceMap(CJS_PKG, SRC_ROOT_PKG);
    });
}

function makeES5() {
  return $fsh.copyDirectory(ESM5_ROOT, ESM5_PKG)
    .then(() => {
      return fixSourceMap(ESM5_PKG, SRC_ROOT_PKG);
    });
}

function makeESM2015() {
  return $fsh.copyDirectory(ESM2015_ROOT, ESM2015_PKG)
    .then(() => {
      return fixSourceMap(ESM2015_PKG, SRC_ROOT_PKG);
    });
}

function makeESNEXT() {
  return $fsh.copyDirectory(ESNEXT_ROOT, ESNEXT_PKG)
    .then(() => {
      return fixSourceMap(ESNEXT_PKG, SRC_ROOT_PKG);
    });
}

function makeUMD() {
  return $fsh.copyDirectory(UMD_ROOT, UMD_PKG)
    .then(() => {
      return fixUMDSourceMaps();
    });
}

function makeTyping() {
  return $fsh.copyDirectory(TYPE_ROOT, TYPE_PKG);
}

function makePackageJSON() {
  const pkg = {
    ...require($path.join(ROOT, 'package.json')),
    main: './index.js',
    typings: './index.d.ts',
    module: './esm5/public.js',
    es2015: './esm2015/public.js',
    esnext: './esnext/public.js',
    'jsnext:main': './esnext/public.js',
    unpkg: './bundles/traits.umd.min.js',
  };

  delete pkg.scripts;

  return $fs.writeFile($path.join(PKG_ROOT, 'package.json'), JSON.stringify(pkg, null, 2));
}


const indexJSContent = `"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./cjs/public"));
`;

const indexTDContent = `export * from './types/public';
`;

function makeOthers() {
  return Promise.all([
    makePackageJSON(),
    $fs.copyFile($path.join(ROOT, 'README.md'), $path.join(PKG_ROOT, 'README.md')),
    $fs.copyFile($path.join(ROOT, 'LICENSE'), $path.join(PKG_ROOT, 'LICENSE')),
    $fs.writeFile($path.join(PKG_ROOT, 'index.js'), indexJSContent),
    $fs.writeFile($path.join(PKG_ROOT, 'index.d.ts'), indexTDContent),
  ]);
}



function make() {
  return $fsh.createDirectory(PKG_ROOT)
    .then(() => {
      return Promise.all([
        makeSRC(),
        makeCJS(),
        makeES5(),
        makeESM2015(),
        makeESNEXT(),
        makeUMD(),
        makeTyping(),
        makeOthers(),
      ]);
    });
}

make()
  .catch((error) => {
    console.error(error);
  });


