// Copies the Style Dictionary web output into the package so published
// styles/*.css can @import them without reaching outside the package.
// Run `pnpm tokens` at the repo root first if token sources changed.
import { cpSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const pkgRoot = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const src = path.resolve(pkgRoot, '../../tokens/dist/web')
const dest = path.resolve(pkgRoot, 'styles/tokens')

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
console.log(`Copied token CSS: ${src} -> ${dest}`)
