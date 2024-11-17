import { spawn } from 'node:child_process';

/**
 * Runs "command" into the terminal.
 * @param {string} command
 * @param {readonly string[]} args
 * @param {SpawnOptions | undefined} options
 */
export async function cmd(command, args = [], options) {
  return new Promise((resolve, reject) => {
    console.log(`> ${command} ${args.join(' ')}`);

    const childProcess = spawn(command, args, {
      cwd: process.cwd(),
      shell: process.platform === 'win32',
      detached: false,
      stdio: 'inherit',
      ...options,
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Exit with code ${code}.`));
      }
    });

    childProcess.on('error', (err) => {
      reject(err);
    });

    // process.on('SIGINT', () => {
    //   childProcess.kill('SIGINT');
    // });
    //
    // process.on('SIGTERM', () => {
    //   childProcess.kill('SIGTERM');
    // });
    //
    // process.on('SIGBREAK', () => {
    //   childProcess.kill('SIGBREAK');
    // });
  });
}
