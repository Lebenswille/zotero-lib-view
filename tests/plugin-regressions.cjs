const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const esbuild = require('esbuild');
const notices = [];
const requiredModules = [];
class TFile { constructor(name) { this.path = name; this.name = name.split('/').pop(); this.basename = this.name.replace(/\.md$/, ''); } }
const obsidian = {
    Plugin: class {}, ItemView: class {}, Modal: class {}, FuzzySuggestModal: class {}, PluginSettingTab: class {},
    MarkdownView: class {}, TFile, Notice: class { constructor(message) { notices.push(message); } },
    Platform: {isDesktopApp: false}, normalizePath: value => path.posix.normalize(value).replace(/\/$/, ''),
};
function bundle(entry) {
    const result = esbuild.buildSync({entryPoints: [entry], bundle: true, target: 'es2018', supported: {'dynamic-import': false}, format: 'cjs', external: ['obsidian', 'fs'], write: false});
    const sandbox = {module: {exports: {}}, exports: {}, URL, Event, Uint8Array, window: {clearTimeout() {}}, require: name => {
        requiredModules.push(name);
        if (name === 'obsidian') return obsidian;
        if (name === 'fs' && obsidian.Platform.isDesktopApp) return {promises: {readFile: async () => Buffer.from([1, 2, 3])}};
        throw new Error('Unexpected module on mobile: ' + name);
    }};
    vm.runInNewContext(result.outputFiles[0].text, sandbox);
    return sandbox.module.exports;
}
const {default: Plugin} = bundle('src/main.ts');
const {DEFAULT_SETTINGS} = bundle('src/constants.ts');
const {parseBibData, createReference, createAnnotationElements} = bundle('src/bib-data.ts');
const {copyExternalImage} = bundle('src/desktop-files.ts');
const {createNoteTitle, parseCiteKeyFromNoteName, decodeLegacyEscapes, vaultRelativePath, createAuthorKey} = bundle('src/utils.ts');
const {ReferenceSuggestModal} = bundle('src/modal.ts');
const input = {
    items: [{citationKey: 'Smith-2024.a', title: 'Title', date: '2024-01-01', volume: 'S1', tags: ['topic'], creators: [{creatorType: 'author', firstName: 'Alice', lastName: 'Smith'}], notes: null, attachments: null, custom: {label: 'Custom field'}}],
    collections: {ROOT: {name: 'Parent', items: [], parent: ''}, CHILD: {name: 'Child', items: [7], parent: 'ROOT'}},
};
const data = parseBibData(JSON.stringify(input));
assert.equal(data.items[0].volume, 'S1');
assert.equal(createAuthorKey(createReference({creators: [{creatorType: 'author', firstName: 'Alice'}]}).creators), 'Alice');
assert.equal(data.items[0].tags[0].tag, 'topic');
assert.equal(data.items[0].notes.length, 0);
assert.equal(data.items[0].attachments.length, 0);
assert.equal(data.items[0].custom.label, 'Custom field');
assert.equal(data.collections.CHILD.items[0], '7');
assert.throws(() => parseBibData('{"items":{}}'), /items array/);
assert.equal(parseBibData('{"items":[null,42,{}, {"citationKey":"ok"}]}').items.length, 1);
assert.equal(parseBibData('{"items":[],"collections":{"__proto__":{"name":"Safe"}}}').collections.__proto__.name, 'Safe');
assert.equal(vaultRelativePath('notes\\sub\\a.md'), 'notes/sub/a.md');
assert.throws(() => vaultRelativePath('notes/../../outside.md'), /inside the vault/);
assert.throws(() => vaultRelativePath('C:\\outside.md'), /inside the vault/);
assert.equal(createNoteTitle(createReference({citationKey: 'Smith-2024.a', title: 'A/B'}), '@{{citeKey}}-{{title}}', 'notes'), 'notes/@Smith-2024.a-AB.md');
assert.equal(parseCiteKeyFromNoteName('@Smith-2024.a.md', '@{{citeKey}}.md'), 'Smith-2024.a');
assert.equal(parseCiteKeyFromNoteName('Smith-2024.a_Title.md', '{{citeKey}}_{{title}}.md'), 'Smith-2024.a');
assert.equal(parseCiteKeyFromNoteName('other.txt', '@{{citeKey}}.md'), null);
assert.equal(decodeLegacyEscapes('%u4E2D%20%FF%ZZ'), '中 \u00ff%ZZ');

(async () => {
    const plugin = new Plugin();
    const files = new Map();
    const content = new Map();
    const directories = new Set();
    let binary;
    plugin.settings = {...DEFAULT_SETTINGS, exportPath: 'notes', exportTitle: '@{{citeKey}}', saveManualEdits: 'Overwrite Entire Note'};
    plugin.app = {
        vault: {
            adapter: {exists: async name => files.has(name) || directories.has(name), read: async name => content.get(name), mkdir: async name => directories.add(name), writeBinary: async (_name, bytes) => { binary = bytes; }},
            getAbstractFileByPath: name => files.get(name),
            create: async (name, text) => { const file = new TFile(name); files.set(name, file); content.set(name, text); return file; },
            modify: async (file, text) => content.set(file.path, text),
        },
        workspace: {getActiveFile: () => null, getLeavesOfType: () => []},
    };
    plugin.loadData = async () => ({lastUpdateDate: '2026-01-01T00:00:00Z', imagesCopy: false, exportPath: 42, libraryViewColumns: ['Title|title'], fieldPropertyMapping: {custom: 'label', ignored: 42}});
    await plugin.loadSettings();
    assert.equal(plugin.settings.lastUpdateDate.toISOString(), '2026-01-01T00:00:00.000Z');
    assert.equal(plugin.settings.exportPath, DEFAULT_SETTINGS.exportPath);
    assert.equal(plugin.settings.fieldPropertyMapping.custom, 'label');
    assert.equal(plugin.settings.fieldPropertyMapping.ignored, undefined);
    plugin.settings = {...DEFAULT_SETTINGS, exportPath: 'notes', exportTitle: '@{{citeKey}}', saveManualEdits: 'Overwrite Entire Note'};
    data.items[0].itemID = 7;
    const entries = plugin.buildLibraryEntries(data);
    assert.equal(entries[0].notePathShort, 'notes/@Smith-2024.a.md');
    assert.equal(entries[0].collections, 'Child; Parent');
    assert.equal(entries[0].parentCollections, 'Parent');
    await plugin.createNote(data.items[0], data);
    assert.ok(content.get('notes/@Smith-2024.a.md').includes('Title'));
    assert.ok(notices.includes('Imported Smith-2024.a!'));
    assert.ok(directories.has('notes'));
    const existing = files.get('notes/@Smith-2024.a.md');
    await plugin.writeNote(existing.path, 'Updated');
    assert.equal(files.get(existing.path), existing, 'Update existing files through vault.modify');
    assert.equal(content.get(existing.path), 'Updated');

    plugin.noteElements = [createAnnotationElements({highlightText: 'Previous import'})];
    plugin.keyWordArray = ['old'];
    const empty = await plugin.extractAnnotation(createReference(), 'notes/empty.md');
    assert.equal(empty.noteElements.length, 0, 'Do not reuse annotations from the previous reference');
    assert.equal(empty.extractedKeywords.length, 0);
    await plugin.updateCurrentNote();
    assert.ok(notices.includes('Open a literature note first'));

    plugin.app.vault.create = async () => { throw new Error('Write failed'); };
    const noticeCount = notices.length;
    await assert.rejects(plugin.createNote(createReference({citationKey: 'failure'}), {items: [], collections: {}}), /Write failed/);
    assert.equal(notices.length, noticeCount, 'A failed write must not report successful import');

    const before = requiredModules.length;
    assert.equal(await copyExternalImage(plugin.app, '/Zotero/storage/ABC/image.png', 'images/ABC.png'), false);
    assert.equal(requiredModules.length, before, 'Mobile must never import fs');
    obsidian.Platform.isDesktopApp = true;
    assert.equal(await copyExternalImage(plugin.app, '/Zotero/storage/ABC/image.png', 'images/ABC.png'), true);
    assert.deepEqual([...new Uint8Array(binary)], [1, 2, 3]);
    obsidian.Platform.isDesktopApp = false;

    const selection = new ReferenceSuggestModal({}, plugin);
    let finish;
    let opened = false;
    selection.data = data;
    selection.app = {vault: {getAbstractFileByPath: () => existing}, workspace: {getLeaf: () => ({openFile: async () => {opened = true;}})}};
    plugin.createNote = () => new Promise(resolve => { finish = resolve; });
    let selectionTask;
    plugin.runTask = task => { selectionTask = task; };
    selection.onChooseItem(data.items[0]);
    assert.equal(opened, false);
    finish();
    await selectionTask;
    assert.equal(opened, true, 'Open the note after its write finishes');

    let detached = false;
    plugin.app.workspace.detachLeavesOfType = () => { detached = true; };
    plugin.onunload();
    assert.equal(detached, false, 'Unloading must preserve panel placement');
    const leaf = {};
    let leafArgs;
    plugin.findOpenLeafForFile = () => leaf;
    plugin.app.workspace.revealLeaf = async () => {};
    plugin.app.workspace.setActiveLeaf = (...args) => {leafArgs = args;};
    await plugin.openFileReusingLeaf(existing);
    assert.equal(leafArgs.length, 2);
    assert.equal(leafArgs[1].focus, true);

    console.log('Passed: validated libraries, vault imports, failed writes, mobile/desktop image guards, awaited selection, and panel placement.');
})().catch(error => {console.error(error); process.exitCode = 1;});
