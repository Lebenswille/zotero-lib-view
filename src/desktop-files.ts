import { App, Notice, Platform } from "obsidian";
import { vaultRelativePath } from "./utils";

// Only Zotero's external image directory requires desktop filesystem access.
export async function copyExternalImage(app: App, source: string, destination: string): Promise<boolean> {
    if (!Platform.isDesktopApp) {
        new Notice("Copying images from Zotero storage requires the desktop app");
        return false;
    }
    const path = vaultRelativePath(destination);
    if (await app.vault.adapter.exists(path)) return true;
    const fs = await import("fs");
    const bytes = await fs.promises.readFile(source);
    const folder = path.slice(0, path.lastIndexOf("/"));
    if (folder && !await app.vault.adapter.exists(folder)) await app.vault.adapter.mkdir(folder);
    await app.vault.adapter.writeBinary(path, Uint8Array.from(bytes).buffer);
    return true;
}
