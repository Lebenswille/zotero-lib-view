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
