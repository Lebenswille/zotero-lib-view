const assert = require('assert/strict');
const fs = require('fs');
const vm = require('vm');
const esbuild = require('esbuild');

function bundle(entry, obsidian) {
    const result = esbuild.buildSync({entryPoints: [entry], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false});
    const context = {exports: {}, require: name => name === 'obsidian' ? obsidian : require(name)};
    vm.runInNewContext(result.outputFiles[0].text, context);
    return context.exports;
}
class PluginSettingTab {
    constructor(app, plugin) { this.app = app; this.plugin = plugin; this.updates = 0; }
    async setControlValue(key, value) {
        this.plugin.settings[key] = value;
        await this.plugin.saveData(this.plugin.settings);
    }
    update() { this.updates++; }
}
const {SettingTab} = bundle('src/settings.ts', {PluginSettingTab});
const {DEFAULT_SETTINGS} = bundle('src/constants.ts', {});
const settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
settings.libraryViewColumns = ['First|title', 'Second|notes|note'];
let saved, discoveries = 0, refreshes = 0;
const plugin = {
    settings, discoveredSubFields: {notes: ['note']},
    saveData: async value => { saved = JSON.parse(JSON.stringify(value)); },
    saveSettings: async () => { saved = JSON.parse(JSON.stringify(settings)); },
    refreshDiscoveredLibraryFields: async () => { discoveries++; },
    refreshLibraryViews: () => { refreshes++; },
    getLibraryViewColumns: () => settings.libraryViewColumns,
    parseLibraryViewColumns: value => value.split(','),
    getAvailableLibrarySourceFields: () => ['title', 'notes'],
    resolveLibraryColumnField: column => column.split('|')[1] || column.split('|')[0],
};
const tab = new SettingTab({}, plugin);
const definitions = () => tab.getSettingDefinitions();
const controls = definitions().flatMap(group => group.items || []).filter(item => item.control);
const byKey = Object.fromEntries(controls.map(item => [item.control.key, item]));
const expectedKeys = ["bibPath", "autoImportOnBibChange", "exportPath", "exportTitle", "templateType", "templateContent", "missingfield", "missingfieldreplacement", "multipleFieldsDivider", "nameFormat", "saveManualEdits", "saveManualEditsStart", "saveManualEditsEnd", "updateLibrary", "highlightCitationsFormat", "highlightCitationsLink", "highlightExportTemplate", "isDoubleSpaced", "isHighlightQuote", "isHighlightBold", "isHighlightItalic", "isHighlightHighlighted", "isHighlightColoured", "isHighlightBullet", "isHighlightBlockquote", "highlightCustomTextBefore", "highlightCustomTextAfter", "isCommentQuote", "isCommentBold", "isCommentItalic", "isCommentHighlighted", "isCommentColoured", "isCommentBullet", "isCommentBlockquote", "commentCustomTextBefore", "commentCustomTextAfter", "isTagHash", "isTagQuote", "isTagBold", "isTagItalic", "isTagHighlighted", "isTagColoured", "isTagBullet", "isTagBlockquote", "tagCustomTextBefore", "tagCustomTextAfter", "keyH1", "keyH2", "keyH3", "keyH4", "keyH5", "keyH6", "keyMergeAbove", "keyCommentPrepend", "commentPrependDefault", "keyTask", "colourYellowText", "colourRedText", "colourGreenText", "colourBlueText", "colourPurpleText", "colourBlackText", "colourWhiteText", "colourGrayText", "colourOrangeText", "colourCyanText", "colourMagentaText", "colourCustomHexValue", "colourCustomHexText", "imagesImport", "zoteroStoragePathManual", "imagesCopy", "imagesPath", "imagesCommentPosition", "debugMode"];
assert.deepEqual(Object.keys(byKey).sort(), expectedKeys.sort(), 'All previous controls must survive migration');
assert.equal(controls.length, expectedKeys.length);
assert.ok(!Object.hasOwn(SettingTab.prototype, 'display'));
assert.equal(discoveries, 0, 'Building definitions for search must not read the library');
assert.equal(saved, undefined, 'Building definitions must not save data');
for (const item of controls) {
    assert.ok(item.name);
    assert.ok(Object.hasOwn(settings, item.control.key), `Missing default for ${item.control.key}`);
    if (item.control.type === 'dropdown') assert.ok(Object.hasOwn(item.control.options, settings[item.control.key]));
}
for (const key of ['exportPath', 'imagesPath']) {
    assert.equal(byKey[key].control.type, 'folder');
    assert.equal(byKey[key].control.includeRoot, true);
}
assert.equal(byKey.bibPath.control.type, 'file');
assert.ok(byKey.bibPath.control.filter({extension: 'JSON'}));
assert.ok(!byKey.bibPath.control.filter({extension: 'md'}));
settings.templateType = 'Plain';
assert.equal(byKey.templateContent.visible(), false);
settings.templateType = 'Custom';
assert.equal(byKey.templateContent.visible(), true);
settings.missingfield = 'Leave placeholder';
assert.equal(byKey.missingfieldreplacement.visible(), false);
settings.missingfield = 'Replace with custom text';
assert.equal(byKey.missingfieldreplacement.visible(), true);
settings.saveManualEdits = 'Select Section';
assert.ok(byKey.saveManualEditsStart.visible() && byKey.saveManualEditsEnd.visible());
settings.saveManualEdits = 'Save Entire Note';
assert.ok(!byKey.saveManualEditsStart.visible() && !byKey.saveManualEditsEnd.visible());
for (const imagesImport of [false, true]) for (const imagesCopy of [false, true]) {
    Object.assign(settings, {imagesImport, imagesCopy});
    assert.equal(byKey.imagesCopy.visible(), imagesImport);
    assert.equal(byKey.imagesCommentPosition.visible(), imagesImport);
    assert.equal(byKey.imagesPath.visible(), imagesImport && imagesCopy);
}
assert.equal(byKey.keyH1.control.validate(settings.keyH1), undefined);
assert.equal(byKey.keyH1.control.validate(''), undefined);
assert.ok(byKey.keyH1.control.validate(settings.keyH2));
assert.ok(byKey.keyH1.control.validate(settings.keyKeyword));

// Exercise custom column editing against the saved string format.
function row() {
    const components = [];
    const setting = {};
    for (const method of ['addText', 'addDropdown']) setting[method] = callback => {
        const component = { value: '', options: {}, events: {},
            setPlaceholder() { return this; },
            setValue(value) { this.value = value; return this; },
            getValue() { return this.value; },
            onChange(callback) { this.change = callback; return this; },
            addOption(value, label) { this.options[value] = label; return this; },
        };
        component.selectEl = {
            empty() { component.options = {}; },
            addEventListener(name, callback) { component.events[name] = callback; },
        };
        components.push(component); callback(component); return setting;
    };
    return {setting, components};
}
const list = () => definitions().find(group => group.type === 'list');
const settle = () => new Promise(resolve => setImmediate(resolve));
(async () => {
    await tab.setControlValue('exportPath', 'Notes/论文');
    assert.equal(saved.exportPath, 'Notes/论文');
    await tab.setControlValue('bibPath', 'References/library.json');
    assert.equal(saved.bibPath, 'References/library.json');
    assert.equal(discoveries, 1);
    assert.equal(tab.updates, 0, 'Typing must not recreate the focused path input');
    const first = row(), second = row();
    list().items[0].render(first.setting);
    list().items[1].render(second.setting);
    first.components[0].change('Renamed');
    await settle();
    second.components[0].change('Also renamed');
    await settle();
    assert.equal(saved.libraryViewColumns[0], 'Renamed|title|');
    assert.equal(saved.libraryViewColumns[1], 'Also renamed|notes|note');
    plugin.getAvailableLibrarySourceFields = () => ['title', 'notes', 'newField'];
    first.components[1].events.focus();
    assert.ok(Object.hasOwn(first.components[1].options, 'newField'));
    second.components[1].change('title');
    await settle();
    assert.equal(saved.libraryViewColumns[1], 'Also renamed|title|', 'Changing source clears stale sub-property');
    list().onReorder(1, 0);
    await settle();
    assert.equal(saved.libraryViewColumns[0], 'Also renamed|title|');
    list().onDelete(0);
    await settle();
    list().onDelete(0);
    await settle();
    assert.equal(saved.libraryViewColumns.length, 1, 'Keep at least one column');
    list().addItem.action();
    await settle();
    assert.equal(saved.libraryViewColumns.length, 2);
    const reset = {setIcon() {return this;}, setTooltip() {return this;}, onClick(fn) {this.click = fn;return this;}};
    list().extraButtons[0](reset);
    reset.click();
    await settle();
    assert.deepEqual(saved.libraryViewColumns, Array.from(DEFAULT_SETTINGS.libraryViewColumns));
    assert.ok(refreshes > 1);
    assert.equal(JSON.parse(fs.readFileSync('manifest.json')).minAppVersion, '1.13.0');
    console.log(`Passed: ${controls.length} migrated settings, native suggesters, visibility, validation, persistence, and column editing.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
