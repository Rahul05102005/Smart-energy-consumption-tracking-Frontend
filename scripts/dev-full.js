import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';
const children = [
  spawn(npm, ['run', 'dev'], { cwd: root, stdio: 'inherit', shell: isWindows }),
  spawn(npm, ['run', 'dev:api'], { cwd: root, stdio: 'inherit', shell: isWindows }),
];
const stop = () => children.forEach(child => child.kill('SIGTERM'));
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach(child => child.on('exit', code => { if (code && code !== 0) process.exitCode = code; stop(); }));
