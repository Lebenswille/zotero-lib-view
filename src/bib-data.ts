import type { AnnotationElements, BibData, Collection, Creator, Reference } from "./types";

export function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown): string { return typeof value === "string" ? value : ""; }
function numeric(value: unknown): number { return typeof value === "number" ? value : Number(value) || 0; }
function records(value: unknown): Record<string, unknown>[] {
    return Array.isArray(value) ? (value as unknown[]).filter(isRecord) : [];
}
function strings(value: unknown): string[] {
    return Array.isArray(value) ? (value as unknown[]).map(value => String(value)) : [];
}

export function createReference(value: Record<string, unknown> = {}): Reference {
    const creators: Creator[] = records(value.creators).map(creator => ({
        creatorType: text(creator.creatorType),
        ...(typeof creator.firstName === "string" ? {firstName: creator.firstName} : {}),
        ...(typeof creator.lastName === "string" ? {lastName: creator.lastName} : {}),
        ...(typeof creator.name === "string" ? {name: creator.name} : {}),
    }));
    const tags = Array.isArray(value.tags) ? (value.tags as unknown[]).map(tag => ({tag: typeof tag === "string" ? tag : isRecord(tag) ? text(tag.tag) : ""})).filter(tag => tag.tag) : [];
    return {
        ...value,
        authorKey: text(value.authorKey), authorKeyInitials: text(value.authorKeyInitials), authorKeyFullName: text(value.authorKeyFullName),
        id: numeric(value.id), itemID: typeof value.itemID === "string" ? value.itemID : numeric(value.itemID ?? value.id), citationKey: text(value.citationKey), citeKey: text(value.citeKey),
        year: text(value.year), citationInLine: text(value.citationInLine), citationInLineInitials: text(value.citationInLineInitials),
        citationInLineFullName: text(value.citationInLineFullName), citationShort: text(value.citationShort), citationFull: text(value.citationFull),
        itemType: text(value.itemType), inlineReference: text(value.inlineReference), date: text(value.date), dateModified: text(value.dateModified),
        dateAdded: text(value.dateAdded), itemKey: text(value.itemKey), title: text(value.title), publicationTitle: text(value.publicationTitle),
        volume: typeof value.volume === "number" ? value.volume : text(value.volume), issue: typeof value.issue === "number" ? value.issue : text(value.issue), pages: text(value.pages), creators, file: text(value.file),
        filePath: text(value.filePath), zoteroReaderLink: text(value.zoteroReaderLink), localLibrary: text(value.localLibrary),
        localLibraryLink: text(value.localLibraryLink), select: text(value.select), uri: text(value.uri), url: text(value.url),
        attachments: records(value.attachments).map(attachment => ({
            dateAdded: text(attachment.dateAdded), dateModified: text(attachment.dateModified), itemType: text(attachment.itemType),
            path: text(attachment.path), relations: strings(attachment.relations), select: text(attachment.select), tags: strings(attachment.tags),
            title: text(attachment.title), uri: text(attachment.uri), contentType: text(attachment.contentType),
        })),
        notes: records(value.notes).map(note => ({
            dateAdded: text(note.dateAdded), dateModified: text(note.dateModified), itemType: text(note.itemType), key: text(note.key),
            note: text(note.note), parentItem: text(note.parentItem), relations: strings(note.relations), tags: strings(note.tags),
            uri: text(note.uri), version: numeric(note.version),
        })),
        tags, zoteroTags: strings(value.zoteroTags),
    };
}

export function parseBibData(json: string): BibData {
    const value: unknown = JSON.parse(json);
    if (!isRecord(value) || !Array.isArray(value.items)) throw new Error("Expected a Better BibTeX library with an items array");
    const items = (value.items as unknown[]).filter(isRecord).filter(item => typeof item.citationKey === "string" && !!item.citationKey).map(createReference);
    const collections: Record<string, Collection> = {};
    if (isRecord(value.collections) || Array.isArray(value.collections)) {
        for (const [key, collection] of Object.entries(value.collections)) {
            if (!isRecord(collection)) continue;
            const parsed = {key: text(collection.key) || key, name: text(collection.name), parent: text(collection.parent), items: strings(collection.items), collections: strings(collection.collections)};
            Object.defineProperty(collections, key, {value: parsed, enumerable: true});
        }
    }
    return {items, collections, config: isRecord(value.config) ? value.config : undefined, version: text(value.version)};
}

export function createAnnotationElements(values: Partial<AnnotationElements>): AnnotationElements {
    return {
        annotationType: "", citeKey: "", commentText: "", commentFormatted: "", commentFormattedNoPrepend: "",
        highlightText: "", highlightColour: "", highlightFormatted: "", highlightFormattedNoPrepend: "",
        inlineTagsText: "", inlineTagsArray: [], inlineTagsFormatted: "", inlineTagsFormattedNoPrepend: "",
        indexNote: undefined, rowOriginal: "", rowEdited: "", foundOld: false, positionOld: undefined, extractionSource: "",
        colourTemplate: "", colourTemplateFormatted: "", colourTemplateNoPrepend: "", colourTextBefore: "", colourTextAfter: "",
        imagePath: "", pagePDF: 0, pageLabel: 0, attachmentURI: "", zoteroBackLink: "", annotationKey: "", ...values,
    };
}
