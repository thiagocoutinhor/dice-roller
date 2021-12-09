import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { config } from "dotenv";

config();

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = process.argv[2] === "production";

const dir = prod ? "./" : process.env.OUTDIR;

esbuild
    .build({
        banner: {
            js: banner
        },
        entryPoints: ["src/main.ts", "src/styles.css"],
        bundle: true,
        external: ["obsidian", "electron", ...builtins],
        format: "cjs",
        watch: !prod,
        target: "es2016",
        logLevel: "info",
        sourcemap: prod ? false : "inline",
        treeShaking: true,
        outdir: dir
    })
    .catch(() => process.exit(1));
