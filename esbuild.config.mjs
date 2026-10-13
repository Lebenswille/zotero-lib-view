import * as esbuild from "esbuild";
import process from "node:process";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";

export const buildOptions = {
    absWorkingDir: fileURLToPath(new URL(".", import.meta.url)),
    banner: {js: "/* Generated from src/main.ts. See the repository for source. */"},
    entryPoints: ["src/main.ts"],
    bundle: true,
    external: ["obsidian", "electron", ...builtinModules, ...builtinModules.map(name => `node:${name}`)],
    format: "cjs",
    target: "es2018",
    supported: {"dynamic-import": false},
    treeShaking: true,
    outfile: "main.js",
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    if (process.argv[2] === "production") await esbuild.build(buildOptions);
    else {
        const context = await esbuild.context({...buildOptions, sourcemap: "inline"});
        await context.watch();
    }
}
