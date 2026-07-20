#!/usr/bin/env node
// Copies Lemniscate's compiled primitive tokens (tokens/dist/web/lemniscate.css
// — the --lmns-* custom properties) into this package. Same reasoning as
// breathe-ui/scripts/copy-source.mjs: the published tarball must be
// self-contained, so this is a copy, not a relative import reaching outside
// the package. Source of truth is tokens/src/lemniscate.json — run the root
// repo's `pnpm tokens` after editing it, then re-run this script.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.resolve(packageRoot, "../../tokens/dist/web/lemniscate.css");
const destDir = path.join(packageRoot, "src");

mkdirSync(destDir, { recursive: true });
copyFileSync(source, path.join(destDir, "tokens.css"));

console.log("@aumraa/lemniscate-ui: copied tokens/dist/web/lemniscate.css");
