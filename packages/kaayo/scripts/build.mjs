#!/usr/bin/env node
// 1. Copies Kaayo's compiled primitive tokens (tokens/dist/web/kaayo.css —
//    the --kayo-* custom properties) into this package.
// 2. Runs the Tailwind CLI against src/theme-source.css, which pulls in
//    tokens.css, defines the full semantic mapping (@theme inline) and base
//    element styles, and @source-scans @aumraa/breathe-ui's component
//    source for every Tailwind class actually used. Output is style.css —
//    a single, plain, pre-compiled CSS file. Consumers get real styling
//    with zero Tailwind setup of their own; `import "@aumraa/kaayo-ui/style.css"`
//    is the only step.
//
// Source of truth for tokens is tokens/src/kaayo.json — run the root repo's
// `pnpm tokens` after editing it, then re-run this script. Source of truth
// for the semantic mapping is src/styles/theme.css in the root repo — keep
// theme-source.css in sync with it by hand if that file changes.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import path from "node:path";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tokensSource = path.resolve(packageRoot, "../../tokens/dist/web/kaayo.css");
const srcDir = path.join(packageRoot, "src");

mkdirSync(srcDir, { recursive: true });
copyFileSync(tokensSource, path.join(srcDir, "tokens.css"));
console.log("@aumraa/kaayo-ui: copied tokens/dist/web/kaayo.css");

const tailwindBin = path.join(packageRoot, "node_modules", ".bin", "tailwindcss");
execFileSync(tailwindBin, ["-i", "src/theme-source.css", "-o", "src/style.css", "--minify"], {
  cwd: packageRoot,
  stdio: "inherit",
});
console.log("@aumraa/kaayo-ui: compiled src/style.css");
