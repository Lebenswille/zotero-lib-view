const assert = require('assert/strict');
const esbuild = require('esbuild');
const vm = require('vm');
const result = esbuild.buildSync({entryPoints: ['src/utils.ts'], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false});
const sandbox = {exports: {}, URL, require: name => name === 'obsidian' ? {normalizePath: x => x} : require(name)};
vm.runInNewContext(result.outputFiles[0].text, sandbox);
const {attachmentTemplateFields, replaceAllTemplates, replaceMissingFields} = sandbox.exports;
const reference = {file: 'original $& export', attachments: [
  {path: '/Users/me/论文 #1 (draft)?.pdf', title: 'Paper [PDF] $&', itemType: 'attachment', select: 'zotero://select/library/items/ABC'},
  {path: 'C:\\Papers\\a b.pdf', title: 'Windows'},
  {path: '\\\\server\\share\\a.pdf', title: 'Network'},
  {title: 'Web attachment', itemType: 'attachment'},
]};
const original = JSON.stringify(reference);
const fields = attachmentTemplateFields(reference);
const render = (template, values = fields) => replaceAllTemplates(Object.keys(values), template, values);
assert.equal(render('{{file}}'), 'original $& export');
assert.ok(fields.localFile.includes('[Paper \\[PDF\\] $&](file:///Users/me/%E8%AE%BA%E6%96%87%20%231%20%28draft%29%3F.pdf)'));
assert.ok(fields.localFile.includes('(file:///C:/Papers/a%20b.pdf)'));
assert.ok(fields.localFile.includes('(file://server/share/a.pdf)'));
assert.ok(!fields.localFile.includes('Web attachment'));
assert.ok(fields.localFilePathLink.includes('/Users/me/论文 #1 (draft)?.pdf]'));
assert.ok(fields.filePath.includes('zotero://select/library/items/ABC'));
assert.ok(fields.zoteroReaderLink.includes('zotero://open-pdf/library/items/ABC'));
assert.equal(render('{{localFile}}\n{{localFile}}'), fields.localFile + '\n' + fields.localFile);
assert.equal(JSON.stringify(reference), original);
const fallback = attachmentTemplateFields({attachments: [{path: '/a.pdf'}]});
assert.equal(fallback.file, fallback.localFile);
for (const input of [{}, {attachments: []}, {attachments: [{title: 'No local file'}]}]) {
  const empty = attachmentTemplateFields(input);
  const output = render('{{file}}\n{{localFile}}\n{{localFilePathLink}}', empty);
  assert.equal(replaceMissingFields(output, 'Remove (entire row)', ''), '');
}
assert.equal(attachmentTemplateFields({attachments: [{path: 'files/a b.pdf'}]}).localFile, '[a b.pdf](files/a%20b.pdf)');
assert.equal(attachmentTemplateFields({attachments: [{path: '/100%.pdf'}]}).localFile, '[100%.pdf](file:///100%25.pdf)');
console.log('Attachment template regression checks passed.');

// Parse the rendered property using a YAML parser, not just string comparisons.
const yaml = require('js-yaml');
const {createZoteroReaderPathLinkYamlList} = sandbox.exports;
const readerReference = {attachments: [
  {itemType: 'attachment', title: 'A "quoted" title \\ [PDF]\nnext line', select: 'zotero://select/library/items/ABCD1234'},
  {itemType: 'attachment', title: 'Snapshot', select: 'zotero://select/groups/12345/items/EFGH5678', contentType: 'text/html'},
  {title: 'Already a reader URI', select: 'zotero://open-pdf/library/items/IJKL9012?page=2'},
  {title: 'Duplicate', select: 'zotero://select/library/items/ABCD1234'},
  {itemType: 'note', select: 'zotero://select/library/items/NOTE1234'},
  {title: 'No address'},
  {select: ''}, {select: '   '}, {select: 'not a URL'},
  {select: 'https://example.com/library/items/ABCD1234'},
  {select: 'zotero://select/library/items/'},
  {select: 'zotero://select/library/collections/ABCD1234'},
  {select: 'zotero://select/groups/not-a-number/items/ABCD1234'},
]};
const readerOriginal = JSON.stringify(readerReference);
const readerFields = attachmentTemplateFields(readerReference);
const propertyTemplate = 'readerLinks:\n{{zoteroReaderLinkYamlList}}\ncopy:\n{{zoteroReaderLinkYamlList}}\n';
const output = render(propertyTemplate, readerFields);
const parsed = yaml.load(output);
const expectedURIs = [
  'zotero://open-pdf/library/items/ABCD1234',
  'zotero://open-pdf/groups/12345/items/EFGH5678',
  'zotero://open-pdf/library/items/IJKL9012?page=2',
];
assert.deepEqual(parsed.readerLinks, expectedURIs);
assert.deepEqual(parsed.copy, expectedURIs);
assert.equal(JSON.stringify(readerReference), readerOriginal, 'Do not mutate imported attachments');
assert.ok(!output.includes('quoted'), 'Titles cannot break YAML properties');
assert.ok(!output.includes('{{'));
for (const input of [{}, {attachments: []}, {attachments: [{title: 'No address'}]}]) {
  const fields = attachmentTemplateFields(input);
  const note = render(propertyTemplate, fields);
  assert.deepEqual(yaml.load(note).readerLinks, []);
  for (const mode of ['Leave placeholder', 'Remove (entire row)', 'Replace with custom text']) {
    assert.deepEqual(yaml.load(replaceMissingFields(note, mode, 'NA')).readerLinks, []);
  }
}
const oddURI = 'zotero://open-pdf/library/items/ABCD1234?label="quoted"&path=folder\\file';
const scalarList = createZoteroReaderPathLinkYamlList({attachments: [{select: oddURI}]});
assert.deepEqual(yaml.load('links:\n' + scalarList).links, [new URL(oddURI).href]);
assert.equal(createZoteroReaderPathLinkYamlList({attachments: [{select: 42}, null]}), '  []');
console.log('Reader URI YAML regression checks passed.');
