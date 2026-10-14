const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const {bumpVersion} = require('../scripts/bump-version.cjs');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zotero-version-test-'));
try {
    function fixture() {
        const data = {
            'manifest.json': {version: '1.2.16', minAppVersion: '1.13.0'},
            'package.json': {version: '1.2.14', scripts: {test: 'kept'}},
            'package-lock.json': {version: '1.2.14', lockfileVersion: 3, packages: {'': {version: '1.2.14'}, 'node_modules/example': {version: '4.0.0'}}},
            'versions.json': {'1.2.14': '1.13.0'},
        };
        for (const [name, value] of Object.entries(data)) fs.writeFileSync(path.join(root, name), JSON.stringify(value));
    }
    const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
    for (const [type, expected] of [['patch', '1.2.17'], ['minor', '1.3.0'], ['major', '2.0.0']]) {
        fixture();
        assert.equal(bumpVersion(type, root), expected);
        for (const name of ['manifest.json', 'package.json', 'package-lock.json']) assert.equal(read(name).version, expected);
        assert.equal(read('package-lock.json').packages[''].version, expected);
        assert.equal(read('package-lock.json').packages['node_modules/example'].version, '4.0.0');
        assert.equal(read('versions.json')[expected], '1.13.0');
        assert.equal(read('package.json').scripts.test, 'kept');
    }
    fixture();
    const before = fs.readFileSync(path.join(root, 'manifest.json'), 'utf8');
    assert.throws(() => bumpVersion('invalid', root), /major, minor, or patch/);
    assert.equal(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'), before);
    const script = path.resolve(__dirname, '../scripts/validate-release.cjs');
    const env = {...process.env, GITHUB_REF_TYPE: 'branch', GITHUB_REF_NAME: 'main'};
    assert.equal(spawnSync(process.execPath, [script], {env}).status, 0, 'Branch names are not release tags');
    env.GITHUB_REF_TYPE = 'tag';
    env.GITHUB_REF_NAME = require('../manifest.json').version;
    assert.equal(spawnSync(process.execPath, [script], {env}).status, 0);
    env.GITHUB_REF_NAME = '0.0.0';
    assert.notEqual(spawnSync(process.execPath, [script], {env}).status, 0, 'Mismatched tags must fail');
    console.log('Passed: synchronized version bumps, preserved dependencies, branch checks, and tag validation.');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
