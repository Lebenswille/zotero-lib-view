import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {buildOptions} from '../esbuild.config.mjs';
const result = await build({...buildOptions, write: false});
assert.deepEqual(Buffer.from(result.outputFiles[0].contents), await readFile(new URL('../main.js', import.meta.url)), 'main.js must match the production build byte-for-byte');
console.log('Production build reproduced byte-for-byte.');
