const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function bumpVersion(type, root = path.resolve(__dirname, '..')) {
    assert.ok(['major', 'minor', 'patch'].includes(type), 'Choose major, minor, or patch');
    const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
    const manifest = read('manifest.json');
    const pkg = read('package.json');
    const lock = read('package-lock.json');
    const versions = read('versions.json');
    assert.match(manifest.version, /^\d+\.\d+\.\d+$/, 'Expected a stable semantic version');
    const numbers = manifest.version.split('.').map(Number);
    const index = {major: 0, minor: 1, patch: 2}[type];
    numbers[index]++;
    for (let i = index + 1; i < numbers.length; i++) numbers[i] = 0;
    const version = numbers.join('.');
    assert.ok(!Object.hasOwn(versions, version), 'Version is already recorded');
    manifest.version = pkg.version = lock.version = lock.packages[''].version = version;
    versions[version] = manifest.minAppVersion;
    for (const [name, data] of Object.entries({'manifest.json': manifest, 'package.json': pkg, 'package-lock.json': lock, 'versions.json': versions})) {
        fs.writeFileSync(path.join(root, name), JSON.stringify(data, null, 2) + '\n');
    }
    return version;
}

module.exports = {bumpVersion};
if (require.main === module) {
    const version = bumpVersion(process.argv[2] || 'patch');
    if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
    console.log(`Updated all version files to ${version}`);
}
