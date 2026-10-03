import type MyPlugin from "./main";
import { App, PluginSettingTab, SettingDefinitionItem, SettingDefinitionList } from "obsidian";
import { DEFAULT_SETTINGS } from "./constants";
import type { MyPluginSettings } from "./types";

const TRANSFORMATION_KEYS = [
    "keyH1", "keyH2", "keyH3", "keyH4", "keyH5", "keyH6",
    "keyMergeAbove", "keyCommentPrepend", "keyTask", "keyKeyword",
] as const;

export class SettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // Native controls persist existing keys; changing the JSON source also refreshes field discovery.
    async setControlValue(key: string, value: unknown): Promise<void> {
        await super.setControlValue(key, value);
        if (key === "bibPath") {
            await this.plugin.refreshDiscoveredLibraryFields(true);
            this.plugin.refreshLibraryViews();
        }
    }

    private validateTransformation(key: string, value: string): string | undefined {
        if (value && TRANSFORMATION_KEYS.some(other => other !== key && this.plugin.settings[other] === value)) {
            return "This value is already assigned to another transformation. Choose a different value.";
        }
    }

    getSettingDefinitions(): SettingDefinitionItem<keyof MyPluginSettings>[] {
        return [
            {
                type: "group",
                heading: "Import Library",
                items: [
                    {
                        name: "BetterBibTex Json File",
                        desc: "Add relative path from the vault folder to the *BetterBibTex Json* file to be imported. For instance, add `library.json` if the file (library.json) is in the root folder. Instead, if the file is in a subfolder, specify first the subfolder followed by the name of the file (e.g. 'zotero/library.json' if the json file is located in a subfolder of your vault called 'zotero') ",
                        control: {
                            type: "file",
                            key: "bibPath",
                            placeholder: "/path/to/BetterBibTex.json",
                            filter: file => file.extension.toLowerCase() === "json",
                        },
                    },
                    {
                        name: "Auto Import on Json Change",
                        desc: "Automatically update related notes when the BetterBibTex JSON file changes.",
                        control: {
                            type: "toggle",
                            key: "autoImportOnBibChange",
                        },
                    },
                ],
            },
            this.libraryColumnsDefinition(),
            {
                type: "group",
                heading: "Export Notes",
                items: [
                    {
                        name: "Export Path",
                        desc: "Add the relative path to the folder inside your vault where the notes will be exported",
                        control: {
                            type: "folder",
                            key: "exportPath",
                            placeholder: "Example: folder1/folder2",
                            includeRoot: true,
                        },
                    },
                    {
                        name: "Note Title",
                        desc: "Select the format of the title of the note. Possible values include: {{citeKey}}, {{title}}, {{author}},{{authorInitials}}, {{authorFullName}} {{year}}",
                        control: {
                            type: "text",
                            key: "exportTitle",
                            placeholder: "{{citeKey}}",
                        },
                    },
                    {
                        name: "Select Template",
                        desc: "Select one of the default templates or provide a custom one.",
                        control: {
                            type: "dropdown",
                            key: "templateType",
                            options: {"Plain": "Plain", "Admonition": "Admonition", "Custom": "Custom Template"},
                        },
                    },
                    {
                        name: "Custom Template",
                        visible: () => (this.plugin.settings.templateType === "Custom"),
                        control: {
                            type: "textarea",
                            key: "templateContent",
                            rows: 10,
                        },
                    },
                    {
                        name: "Missing Fields",
                        desc: "Fields that are present in the template but missing from the selected field.",
                        control: {
                            type: "dropdown",
                            key: "missingfield",
                            options: {"Leave placeholder": "Leave placeholder", "Remove (entire row)": "Remove (entire row)", "Replace with custom text": "Replace with custom text"},
                        },
                    },
                    {
                        name: "Replacement for missing fields",
                        visible: () => (this.plugin.settings.missingfield === "Replace with custom text"),
                        control: {
                            type: "text",
                            key: "missingfieldreplacement",
                        },
                    },
                    {
                        name: "Multiple Entries Divider",
                        desc: "Type the character or expression that should separate multiple values when found in the same field (e.g. authors, editors, tags, collections).",
                        control: {
                            type: "textarea",
                            key: "multipleFieldsDivider",
                        },
                    },
                    {
                        name: "Format Names",
                        desc: "Specify how the names of the authors/editors should be exported. Accepted values are {{firstName}}, {{lastName}} and {{firstNameInitials}}",
                        control: {
                            type: "textarea",
                            key: "nameFormat",
                        },
                    },
                    {
                        name: "Save Manual Edits",
                        desc: "Select \"Yes\" to preserve the manual edits made to the previously extracted note (e.g. block references, comments added manually, fixed typos) when this is updated. Select \"No\" to overwrite any manual change to the extracted annotation when this is updated.",
                        control: {
                            type: "dropdown",
                            key: "saveManualEdits",
                            options: {"Save Entire Note": "Save Entire Note", "Select Section": "Select Section", "Overwrite Entire Note": "Overwrite Entire Note"},
                        },
                    },
                    {
                        name: "Start - Save Manual Edits",
                        desc: "Define string (e.g. '## Notes') in the template starting from where updating the note will not overwrite the existing text. If field is left empty, the value will be set to the beginning of the note",
                        visible: () => (this.plugin.settings.saveManualEdits == "Select Section"),
                        control: {
                            type: "text",
                            key: "saveManualEditsStart",
                        },
                    },
                    {
                        name: "End - Save Manual Edits",
                        desc: "Define string (e.g. '## Notes') in the template until where updating the note will not overwrite the existing text. If field is left empty, the value will be set to the end of the note",
                        visible: () => (this.plugin.settings.saveManualEdits == "Select Section"),
                        control: {
                            type: "text",
                            key: "saveManualEditsEnd",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Update Library",
                items: [
                    {
                        name: "Update Existing/All Notes",
                        desc: "Select whether to create new notes that are missing from Obsidian but present/modified within Zotero when runing the Update Library command",
                        control: {
                            type: "dropdown",
                            key: "updateLibrary",
                            options: {"Only update existing notes": "Only existing notes", "Create new notes when missing": "Create new notes when missing"},
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "In-text Citations",
                items: [
                    {
                        name: "End of Highlight Citation Format",
                        desc: "Select the style of the reference added next to the highlights and figures extracted from the PDF. This feature is for now available only for sources extracted from Zotero",
                        control: {
                            type: "dropdown",
                            key: "highlightCitationsFormat",
                            options: {"Author, year, page number": "Author, year, page number", "Only page number": "Only page number", "Pandoc": "Pandoc", "Empty": "Empty"},
                        },
                    },
                    {
                        name: "Create Link to the Highlight Page in the PDF",
                        desc: "If enabled, a link will be created at the end of the extracted highlights or figures to the original page of the PDF in the Zotero reader",
                        control: {
                            type: "toggle",
                            key: "highlightCitationsLink",
                        },
                    },
                    {
                        name: "Structure of the extracted highlights/comments/tag",
                        desc: "Placeholder include {{highlight}}, {{comment}}, {{tag}}",
                        control: {
                            type: "textarea",
                            key: "highlightExportTemplate",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Highlights",
                items: [
                    {
                        name: "Double Spaced",
                        desc: "Set toggle to on to add an empty space between different highlights",
                        control: {
                            type: "toggle",
                            key: "isDoubleSpaced",
                        },
                    },
                    {
                        name: "Quotation Marks",
                        control: {
                            type: "toggle",
                            key: "isHighlightQuote",
                        },
                    },
                    {
                        name: "Bold",
                        control: {
                            type: "toggle",
                            key: "isHighlightBold",
                        },
                    },
                    {
                        name: "Italic",
                        control: {
                            type: "toggle",
                            key: "isHighlightItalic",
                        },
                    },
                    {
                        name: "Highlighted (markdown)",
                        control: {
                            type: "toggle",
                            key: "isHighlightHighlighted",
                        },
                    },
                    {
                        name: "Highlighted (original colour)",
                        control: {
                            type: "toggle",
                            key: "isHighlightColoured",
                        },
                    },
                    {
                        name: "Bullet Points",
                        control: {
                            type: "toggle",
                            key: "isHighlightBullet",
                        },
                    },
                    {
                        name: "Blockquote",
                        control: {
                            type: "toggle",
                            key: "isHighlightBlockquote",
                        },
                    },
                    {
                        name: "Custom text before all highlights",
                        control: {
                            type: "textarea",
                            key: "highlightCustomTextBefore",
                        },
                    },
                    {
                        name: "Custom text after all highlights",
                        control: {
                            type: "textarea",
                            key: "highlightCustomTextAfter",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Comments",
                items: [
                    {
                        name: "Quotation Marks",
                        control: {
                            type: "toggle",
                            key: "isCommentQuote",
                        },
                    },
                    {
                        name: "Bold",
                        control: {
                            type: "toggle",
                            key: "isCommentBold",
                        },
                    },
                    {
                        name: "Italic",
                        control: {
                            type: "toggle",
                            key: "isCommentItalic",
                        },
                    },
                    {
                        name: "Highlighted (markdown)",
                        control: {
                            type: "toggle",
                            key: "isCommentHighlighted",
                        },
                    },
                    {
                        name: "Highlighted (original colour)",
                        control: {
                            type: "toggle",
                            key: "isCommentColoured",
                        },
                    },
                    {
                        name: "Bullet Points",
                        control: {
                            type: "toggle",
                            key: "isCommentBullet",
                        },
                    },
                    {
                        name: "Blockquote",
                        control: {
                            type: "toggle",
                            key: "isCommentBlockquote",
                        },
                    },
                    {
                        name: "Custom text before all comments",
                        control: {
                            type: "textarea",
                            key: "commentCustomTextBefore",
                        },
                    },
                    {
                        name: "Custom text after all comments",
                        control: {
                            type: "textarea",
                            key: "commentCustomTextAfter",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Tags",
                items: [
                    {
                        name: "Hash sign (#)",
                        control: {
                            type: "toggle",
                            key: "isTagHash",
                        },
                    },
                    {
                        name: "Quotation Marks",
                        control: {
                            type: "toggle",
                            key: "isTagQuote",
                        },
                    },
                    {
                        name: "Bold",
                        control: {
                            type: "toggle",
                            key: "isTagBold",
                        },
                    },
                    {
                        name: "Italic",
                        control: {
                            type: "toggle",
                            key: "isTagItalic",
                        },
                    },
                    {
                        name: "Highlighted (markdown)",
                        control: {
                            type: "toggle",
                            key: "isTagHighlighted",
                        },
                    },
                    {
                        name: "Highlighted (original colour)",
                        control: {
                            type: "toggle",
                            key: "isTagColoured",
                        },
                    },
                    {
                        name: "Bullet Points",
                        control: {
                            type: "toggle",
                            key: "isTagBullet",
                        },
                    },
                    {
                        name: "Blockquote",
                        control: {
                            type: "toggle",
                            key: "isTagBlockquote",
                        },
                    },
                    {
                        name: "Custom text before each individual tag",
                        control: {
                            type: "textarea",
                            key: "tagCustomTextBefore",
                        },
                    },
                    {
                        name: "Custom text after each individual tag",
                        control: {
                            type: "textarea",
                            key: "tagCustomTextAfter",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Additional Transformations",
                items: [
                    { name: "Transformation triggers", desc: "Enter a character or word to recognize at the beginning of a comment. Matching comments or highlights receive the selected transformation." },
                    {
                        name: "Heading Level 1",
                        control: {
                            type: "text",
                            key: "keyH1",
                            validate: value => this.validateTransformation("keyH1", value),
                        },
                    },
                    {
                        name: "Heading Level 2",
                        control: {
                            type: "text",
                            key: "keyH2",
                            validate: value => this.validateTransformation("keyH2", value),
                        },
                    },
                    {
                        name: "Heading Level 3",
                        control: {
                            type: "text",
                            key: "keyH3",
                            placeholder: "###",
                            validate: value => this.validateTransformation("keyH3", value),
                        },
                    },
                    {
                        name: "Heading Level 4",
                        control: {
                            type: "text",
                            key: "keyH4",
                            validate: value => this.validateTransformation("keyH4", value),
                        },
                    },
                    {
                        name: "Heading Level 5",
                        control: {
                            type: "text",
                            key: "keyH5",
                            validate: value => this.validateTransformation("keyH5", value),
                        },
                    },
                    {
                        name: "Heading Level 6",
                        control: {
                            type: "text",
                            key: "keyH6",
                            validate: value => this.validateTransformation("keyH6", value),
                        },
                    },
                    {
                        name: "Append highlight to the end of the previous one",
                        control: {
                            type: "text",
                            key: "keyMergeAbove",
                            validate: value => this.validateTransformation("keyMergeAbove", value),
                        },
                    },
                    {
                        name: "Place comment before the highlight",
                        control: {
                            type: "text",
                            key: "keyCommentPrepend",
                            validate: value => this.validateTransformation("keyCommentPrepend", value),
                        },
                    },
                    {
                        name: "Always place comments before highlights",
                        desc: "Always place the comment made to an highlight before the text of the highlight",
                        control: {
                            type: "toggle",
                            key: "commentPrependDefault",
                        },
                    },
                    {
                        name: "Transform the highlight/comment into a task",
                        control: {
                            type: "text",
                            key: "keyTask",
                            validate: value => this.validateTransformation("keyTask", value),
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Highlight Color",
                items: [
                    { name: "Color transformations", desc: 'Use {{highlight}} with custom text, H1–H6 for headings, AddToAbove to append, Keyword to collect keywords, or Todo to create a task.' },
                    {
                        name: "Yellow",
                        control: {
                            type: "text",
                            key: "colourYellowText",
                        },
                    },
                    {
                        name: "Red",
                        control: {
                            type: "text",
                            key: "colourRedText",
                        },
                    },
                    {
                        name: "Green",
                        control: {
                            type: "text",
                            key: "colourGreenText",
                        },
                    },
                    {
                        name: "Blue",
                        control: {
                            type: "text",
                            key: "colourBlueText",
                        },
                    },
                    {
                        name: "Purple",
                        control: {
                            type: "text",
                            key: "colourPurpleText",
                        },
                    },
                    {
                        name: "Black",
                        control: {
                            type: "text",
                            key: "colourBlackText",
                        },
                    },
                    {
                        name: "White",
                        control: {
                            type: "text",
                            key: "colourWhiteText",
                        },
                    },
                    {
                        name: "Gray",
                        control: {
                            type: "text",
                            key: "colourGrayText",
                        },
                    },
                    {
                        name: "Orange",
                        control: {
                            type: "text",
                            key: "colourOrangeText",
                        },
                    },
                    {
                        name: "Cyan",
                        control: {
                            type: "text",
                            key: "colourCyanText",
                        },
                    },
                    {
                        name: "Magenta",
                        control: {
                            type: "text",
                            key: "colourMagentaText",
                        },
                    },
                    {
                        name: "Custom Hex Value",
                        control: {
                            type: "text",
                            key: "colourCustomHexValue",
                        },
                    },
                    {
                        name: "Custom Hex Transformation",
                        control: {
                            type: "text",
                            key: "colourCustomHexText",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Import Images",
                items: [
                    {
                        name: "Import Images",
                        desc: "This option is available only for notes extracted using the Zotero native PDF reader",
                        control: {
                            type: "toggle",
                            key: "imagesImport",
                        },
                    },
                    {
                        name: "Zotero Local Folder",
                        desc: "Add the path on your computer where Zotero's data is stored (e.g. \"/Users/yourusername/Zotero/storage\"). This field is required only when this is different from the folder where the PDF files are stored. To retrieve this information, open Zotero --> Preferences --> Advanced --> Files and Folder, and copy the \"data directory location\", followed by the subdirectory \"/storage\"",
                        control: {
                            type: "text",
                            key: "zoteroStoragePathManual",
                        },
                    },
                    {
                        name: "Copy the Image into the Obsidian Vault",
                        desc: "If this option is selected, images selected through the Zotero reader will be copied into the Vault. If this option is not selected, the note will link to the file stored in Zotero/storage",
                        visible: () => (this.plugin.settings.imagesImport),
                        control: {
                            type: "toggle",
                            key: "imagesCopy",
                        },
                    },
                    {
                        name: "Image Import Path",
                        desc: "Add the relative path to the folder inside your vault where the image will be copied",
                        visible: () => (this.plugin.settings.imagesImport) && (this.plugin.settings.imagesCopy),
                        control: {
                            type: "folder",
                            key: "imagesPath",
                            placeholder: "Example: folder1/folder2",
                            includeRoot: true,
                        },
                    },
                    {
                        name: "Position of Comment to an Image",
                        visible: () => (this.plugin.settings.imagesImport),
                        control: {
                            type: "dropdown",
                            key: "imagesCommentPosition",
                            options: {"Above the image": "Above the image", "Below the image": "Below the image"},
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Debugging",
                items: [
                    {
                        name: "Activate Debug Mode",
                        desc: "Activating this option will print the console logs of each entry exported in a text file to faciliate debugging.",
                        control: {
                            type: "toggle",
                            key: "debugMode",
                        },
                    },
                ],
            },
        ];
    }

    private async saveColumns(columns: string[], rebuild = true): Promise<void> {
        this.plugin.settings.libraryViewColumns = this.plugin.parseLibraryViewColumns(columns.join(","));
        await this.plugin.saveSettings();
        this.plugin.refreshLibraryViews();
        if (rebuild) this.update();
    }

    private libraryColumnsDefinition(): SettingDefinitionList<keyof MyPluginSettings> {
        const plugin = this.plugin;
        return {
            type: "list",
            heading: "Library View Columns",
            items: plugin.getLibraryViewColumns().map((column, index) => ({
                name: `Column ${index + 1}`,
                desc: "Title, source field, and optional sub-property.",
                render: setting => {
                    const parts = column.split("|");
                    const field = plugin.resolveLibraryColumnField(column);
                    const savePart = async (part: number, value: string, rebuild: boolean) => {
                        // Read live state so edits to another column are never overwritten.
                        const columns = plugin.getLibraryViewColumns().slice();
                        const current = columns[index].split("|");
                        current[1] = current[1] || plugin.resolveLibraryColumnField(columns[index]);
                        current[part] = value;
                        if (part === 1) current[2] = "";
                        columns[index] = [current[0], current[1], current[2] || ""].join("|");
                        await this.saveColumns(columns, rebuild);
                    };
                    setting.addText(text => text
                        .setPlaceholder("Title")
                        .setValue(parts[0])
                        .onChange(value => { void savePart(0, value, false); }));
                    setting.addDropdown(dropdown => {
                        const populate = () => {
                            const selected = dropdown.getValue() || field;
                            dropdown.selectEl.empty();
                            const fields = new Set([...plugin.getAvailableLibrarySourceFields(), selected]);
                            fields.forEach(value => dropdown.addOption(value, value));
                            dropdown.setValue(selected);
                        };
                        populate();
                        // Refresh choices after a JSON path change without rebuilding the focused input.
                        dropdown.selectEl.addEventListener("focus", populate);
                        dropdown.setValue(field).onChange(value => { void savePart(1, value, true); });
                    });
                    setting.addDropdown(dropdown => {
                        const populate = () => {
                            const selected = dropdown.getValue();
                            dropdown.selectEl.empty();
                            dropdown.addOption("", "- none -");
                            const fields = new Set([...(plugin.discoveredSubFields[field] || []), selected]);
                            fields.forEach(value => { if (value) dropdown.addOption(value, value); });
                            dropdown.setValue(selected);
                        };
                        populate();
                        dropdown.selectEl.addEventListener("focus", populate);
                        dropdown.setValue(parts[2] || "").onChange(value => { void savePart(2, value, false); });
                    });
                },
            })),
            addItem: {
                name: "Add column",
                action: () => { void this.saveColumns([...plugin.getLibraryViewColumns(), "New Column"]); },
            },
            onDelete: index => {
                const columns = plugin.getLibraryViewColumns().slice();
                if (columns.length <= 1) return;
                columns.splice(index, 1);
                void this.saveColumns(columns);
            },
            onReorder: (from, to) => {
                const columns = plugin.getLibraryViewColumns().slice();
                const [column] = columns.splice(from, 1);
                columns.splice(to, 0, column);
                void this.saveColumns(columns);
            },
            extraButtons: [button => button
                .setIcon("reset")
                .setTooltip("Reset default columns")
                .onClick(() => { void this.saveColumns(DEFAULT_SETTINGS.libraryViewColumns.slice()); })],
        };
    }
}
