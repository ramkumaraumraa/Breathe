#!/usr/bin/env node
// Copies the canonical component source (src/app/components/ui/) into this
// package's src/ and regenerates the barrel index.ts. Run via `pnpm build`
// before publish (also wired as `prepack`) and any time you want a local
// checkout of the package in sync with the app's source during development.
//
// ponytail: this is a copy, not a symlink or build-time alias, because the
// published tarball must be self-contained — a relative import reaching
// outside the package directory breaks once installed elsewhere. Single
// source of truth stays src/app/components/ui/; this script is the only
// place that reads it.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.resolve(packageRoot, "../../src/app/components/ui");
const destDir = path.join(packageRoot, "src");

rmSync(destDir, { recursive: true, force: true });
mkdirSync(destDir, { recursive: true });
cpSync(sourceDir, destDir, { recursive: true });

// The source files are siblings under src/app/components/ui/ in the root
// app and import each other via the "@/app/components/ui/*" alias, which
// only exists in the root app's tsconfig. Once copied here they're still
// siblings (flat directory), just without that alias — rewrite to relative
// imports so the package resolves standalone.
const sourceFiles = readdirSync(destDir).filter((f) => /\.(tsx|ts)$/.test(f));
for (const file of sourceFiles) {
  const filePath = path.join(destDir, file);
  const rewritten = readFileSync(filePath, "utf8").replace(/@\/app\/components\/ui\//g, "./");
  writeFileSync(filePath, rewritten);
}

const exportNames = readdirSync(sourceDir)
  .filter((f) => /\.(tsx|ts)$/.test(f))
  .map((f) => f.replace(/\.(tsx|ts)$/, ""))
  .sort();

// sonner.tsx and toaster.tsx both export a component named `Toaster` (two
// different toast systems the app offers) — `export *` can't have both.
// Alias sonner's under an unambiguous name; toaster.tsx keeps the plain name.
const NAMED_EXPORTS = {
  sonner: `export { Toaster as SonnerToaster, toast as sonnerToast } from "./sonner";`,
};

const barrel =
  exportNames
    .map((name) => NAMED_EXPORTS[name] ?? `export * from "./${name}";`)
    .join("\n") + "\n";
writeFileSync(path.join(destDir, "index.ts"), barrel);

console.log(`@aumraa/breathe-ui: copied ${exportNames.length} components from src/app/components/ui/`);
