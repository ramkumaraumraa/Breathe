#!/usr/bin/env node
// Copies Kaayo's compiled primitive tokens (tokens/dist/web/kaayo.css — the
// --kayo-* custom properties) into this package. See
// packages/breathe-ui/scripts/copy-source.mjs for why this is a copy, not a
// relative import reaching outside the package. Source of truth is
// tokens/src/kaayo.json — run the root repo's `pnpm tokens` after editing
// it, then re-run this script.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.resolve(packageRoot, "../../tokens/dist/web/kaayo.css");
const destDir = path.join(packageRoot, "src");

mkdirSync(destDir, { recursive: true });
copyFileSync(source, path.join(destDir, "tokens.css"));

console.log("@aumraa/kaayo-ui: copied tokens/dist/web/kaayo.css");
