// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const mkdirp = require('mkdirp');
// const rimraf = require('rimraf');
// const tempy = require('tempy');
// const installFrom = require('../lib/install');
// const uninstallFrom = require('../lib/uninstall');

// function install(rootDir, dir) {
//   installFrom(path.join(rootDir, dir));
// }

// function uninstall(rootDir, dir) {
//   uninstallFrom(path.join(rootDir, dir));
// }

// function mkdir(rootDir, dir) {
//   mkdirp.sync(path.join(rootDir, dir));
// }

// function writeFile(dir, filePath, data) {
//   fs.writeFileSync(path.join(dir, filePath), data);
// }

// function readFile(dir, filePath) {
//   return fs.readFileSync(path.join(dir, filePath), 'utf-8');
// }

// function exists(dir, filePath) {
//   return fs.existsSync(path.join(dir, filePath));
// }

// describe('husky', () => {
//   let dir;
//   beforeEach(() => (dir = tempy.directory()));
//   afterEach(() => rimraf.sync(dir));

//   it('should support basic layout', () => {
//     mkdir(dir, '.git/hooks');
//     mkdir(dir, 'node_modules/husky');

//     install(dir, '/node_modules/husky');
//     const hook = readFile(dir, '.git/hooks/pre-commit');

//     expect(hook).toMatch('#husky');
//     expect(hook).toMatch('cd "."');
//     expect(hook).toMatch('npm run -s precommit');
//     expect(hook).toMatch('--no-verify');

//     const prepareCommitMsg = readFile(dir, '.git/hooks/prepare-commit-msg');
//     expect(prepareCommitMsg).toMatch('cannot be bypassed');

//     uninstall(dir, 'node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeFalsy();
//   });

//   it('should support project installed in sub directory', () => {
//     mkdir(dir, '.git/hooks');
//     mkdir(dir, 'A/B/node_modules/husky');

//     install(dir, 'A/B/node_modules/husky');
//     const hook = readFile(dir, '.git/hooks/pre-commit');

//     expect(hook).toMatch('cd "A/B"');

//     uninstall(dir, 'A/B/node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeFalsy();
//   });

//   it('should support git submodule', () => {
//     mkdir(dir, '.git/modules/A/B');
//     mkdir(dir, 'A/B/node_modules/husky');
//     writeFile(dir, 'A/B/.git', 'git: ../../.git/modules/A/B');

//     install(dir, 'A/B/node_modules/husky');
//     const hook = readFile(dir, '.git/modules/A/B/hooks/pre-commit');

//     expect(hook).toMatch('cd "."');

//     uninstall(dir, 'A/B/node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeFalsy();
//   });

//   it('should support git submodule and sub directory', () => {
//     mkdir(dir, '.git/modules/A/B');
//     mkdir(dir, 'A/B/C/node_modules/husky');
//     writeFile(dir, 'A/B/.git', 'git: ../../.git/modules/A/B');

//     install(dir, 'A/B/C/node_modules/husky');
//     const hook = readFile(dir, '.git/modules/A/B/hooks/pre-commit');

//     expect(hook).toMatch('cd "C"');

//     uninstall(dir, 'A/B/app/node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeFalsy();
//   });

//   it('should support git worktrees', () => {
//     mkdir(dir, '.git/worktrees/B');
//     mkdir(dir, 'A/B/node_modules/husky');

//     // Git path for worktrees is absolute
//     const absolutePath = path.join(dir, '.git/worktrees/B');
//     writeFile(dir, 'A/B/.git', `git: ${absolutePath}`);

//     install(dir, 'A/B/node_modules/husky');
//     const hook = readFile(dir, '.git/worktrees/B/hooks/pre-commit');

//     expect(hook).toMatch('cd "."');

//     uninstall(dir, 'A/B/node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-commit')).toBeFalsy();
//   });

//   it('should not modify user hooks', () => {
//     mkdir(dir, '.git/hooks');
//     mkdir(dir, 'node_modules/husky');
//     writeFile(dir, '.git/hooks/pre-push', 'foo');

//     // Verify that it's not overwritten
//     install(dir, 'node_modules/husky');
//     const hook = readFile(dir, '.git/hooks/pre-push');
//     expect(hook).toBe('foo');

//     uninstall(dir, 'node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeTruthy();
//   });

//   it('should not install from /node_modules/A/node_modules', () => {
//     mkdir(dir, '.git/hooks');
//     mkdir(dir, 'node_modules/A/node_modules/husky');

//     install(dir, 'node_modules/A/node_modules/husky');
//     expect(exists(dir, '.git/hooks/pre-push')).toBeFalsy();
//   });

//   it("should not crash if there's no .git directory", () => {
//     mkdir(dir, 'node_modules/husky');

//     expect(() => install(dir, 'node_modules/husky')).not.toThrow();
//     expect(() => uninstall(dir, 'node_modules/husky')).not.toThrow();
//   });

//   it('should migrate ghooks scripts', () => {
//     mkdir(dir, '.git/hooks');
//     mkdir(dir, '/node_modules/husky');
//     writeFile(
//       dir,
//       '.git/hooks/pre-commit',
//       '// Generated by ghooks. Do not edit this file.'
//     );

//     install(dir, 'node_modules/husky');
//     const hook = readFile(dir, '.git/hooks/pre-commit');
//     expect(hook).toMatch('husky');
//     expect(hook).not.toMatch('ghooks');
//   });
// });
