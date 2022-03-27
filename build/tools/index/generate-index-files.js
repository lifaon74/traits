const { promises: $fs } = require('fs');
const $path = require('path');

const ROOT_PATH = $path.join(__dirname, '../../../');
const SRC_PATH = $path.join(ROOT_PATH, 'src');

function generateIndexFiles({ dry = true }) {
  const explore = (path) => {
    return $fs.readdir(path, { withFileTypes: true })
      .then((entries) => {
        const lines = [];
        let hasIndex = false;
        return Promise.all(
          entries.map((entry) => {
            const entryName = entry.name;
            if (entry.isDirectory()) {
              lines.push(`export * from './${entryName}/index'`);
              return explore($path.join(path, entryName));
            } else if (entryName === 'index.ts') {
              hasIndex = true;
            } else if (entryName.endsWith('.ts')) {
              lines.push(`export * from './${entryName.slice(0, -3)}'`);
            }
          })
        )
          .then(() => {
            if (!hasIndex) {
              const indexFilePath = $path.join(path, 'index.ts');
              const indexFileContent = lines.join('\n') + '\n';
              if (dry) {
                console.log(`create ${ indexFilePath }`);
                // console.log(indexFileContent);
              } else {
                return $fs.writeFile(indexFilePath, indexFileContent);
              }
            }
          });
      });
  };


  return explore(SRC_PATH);
}

const dry = process.argv.includes('--dry');

generateIndexFiles({ dry })
  .catch((error) => {
    console.error(error);
  });
