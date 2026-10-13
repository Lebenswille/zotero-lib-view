export class DebugLog {
    private lines: string[] = [];
    constructor(private enabled: boolean) {}
    log(value: unknown): void {
        if (this.enabled) this.lines.push(typeof value === "string" ? value : JSON.stringify(value));
    }
    downloadLog(): void {
        if (!this.enabled) return;
        const url = URL.createObjectURL(new Blob([this.lines.join("\n")], { type: "text/plain" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "zotero-library-debug.txt";
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
