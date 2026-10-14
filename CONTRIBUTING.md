# Contributing

Use Node.js 24 and npm. Install dependencies with `npm ci --ignore-scripts`.

Run `npm run check` for type checking, typed lint rules, and regression tests. Run `npm audit` to check dependencies. Build with `npm run build`, then run `npm run verify-build` to confirm that `main.js` matches the source.

For manual testing, copy `main.js`, `manifest.json`, and `styles.css` into a test vault's `.obsidian/plugins/zotero-lib-view` directory. Test single-note and library imports, preservation of manual edits, custom templates, sidebar and tab placement, and mobile loading. Use an example Better BibTeX export without personal data in bug reports.

Keep vault reads and writes on Obsidian's vault APIs. Access to Zotero images outside the vault belongs in `src/desktop-files.ts`, behind the desktop platform guard. Validate imported JSON and catch asynchronous errors. Include regression coverage for behavior changes.

Use the **Bump Version** workflow to prepare a release. It updates `manifest.json`, `package.json`, `package-lock.json`, and `versions.json` together, verifies the build, and pushes a new tag only after all checks pass. For local preparation, run `npm run release:prepare -- patch` (or `minor` / `major`), update `RELEASE_NOTES.md`, rebuild `main.js`, and run `node scripts/validate-release.cjs`. Do not overwrite existing release tags. The release workflow checks the source, audits locked dependencies, creates build attestations, and uploads only the three supported plugin files.
