import type ZoteroLibraryPlugin from "./main";
import { App, FuzzySuggestModal, Modal, Notice } from "obsidian";
import { createReference } from "./bib-data";
import type { BibData, Reference } from "./types";
import { createAuthorKey, openSelectedNote, orderByDateModified } from "./utils";

export class ReferenceSuggestModal extends FuzzySuggestModal<Reference> {
    private entries: Reference[] = [];
    private data: BibData;
    constructor(app: App, private plugin: ZoteroLibraryPlugin) { super(app); }

    onOpen(): void { this.plugin.runTask(this.loadEntries()); }
    private async loadEntries() {
        const data = await this.plugin.loadBibData();
        if (!data) { this.close(); return; }
        this.data = data;
        this.entries = data.items.map(entry => {
            const year = entry.date.match(/\d{4}/)?.[0] || "";
            return {...entry, inlineReference: `${createAuthorKey(entry.creators)}, (${year}), '${entry.title}'\n${entry.citationKey}`};
        }).sort(orderByDateModified);
        this.entries.unshift(createReference({citationKey: "Entire Library", inlineReference: "Entire Library: " + this.plugin.settings.bibPath}));
        // The public API does not expose updateSuggestions; an input event refreshes the list.
        this.inputEl.dispatchEvent(new Event("input"));
    }
    getItems(): Reference[] { return this.entries; }
    getItemText(entry: Reference): string { return entry.inlineReference; }
    onChooseItem(entry: Reference): void { this.plugin.runTask(this.importEntries(entry)); }
    private async importEntries(selected: Reference) {
        const entries = selected.citationKey === "Entire Library" ? this.data.items : this.data.items.filter(entry => entry.citationKey === selected.citationKey);
        for (const entry of entries) await this.plugin.createNote(entry, this.data);
        const last = entries[entries.length - 1];
        if (last) await openSelectedNote(this.app, last, this.plugin.settings.exportTitle, this.plugin.settings.exportPath);
    }
}

export class UpdateLibraryModal extends Modal {
    constructor(app: App, private plugin: ZoteroLibraryPlugin) { super(app); }
    onOpen(): void { this.plugin.runTask(this.updateLibrary()); }
    private async updateLibrary() {
        try {
            const data = await this.plugin.loadBibData();
            if (!data) return;
            const entries = await this.plugin.updateLibraryEntries(data);
            new Notice(`Updated ${entries.length} entries`);
        } finally { this.close(); }
    }
}
