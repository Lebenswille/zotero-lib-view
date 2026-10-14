const assert = require('node:assert/strict');
const manifest = require('../manifest.json');
const pkg = require('../package.json');
const lock = require('../package-lock.json');
const versions = require('../versions.json');
assert.equal(pkg.version, manifest.version, 'Package and manifest versions must match');
assert.equal(lock.version, manifest.version, 'Lockfile and manifest versions must match');
assert.equal(lock.packages[''].version, manifest.version, 'Lockfile package version must match manifest');
assert.equal(versions[manifest.version], manifest.minAppVersion, 'Update versions.json before releasing');
if (process.env.GITHUB_REF_TYPE === 'tag') {
    assert.equal(process.env.GITHUB_REF_NAME?.replace(/^v/, ''), manifest.version, 'Tag must match manifest version');
}
console.log('Release versions are consistent.');
