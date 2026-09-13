import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

const src = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8')
const web = src('packages/react/src/lemniscate/button.tsx')
const nat = src('packages/react-native/src/atoms/button.tsx')
const natText = nat.slice(nat.indexOf('buttonTextVariants = cva'))

/** { key: classes } of the first `<marker>` object literal (cva variant/size maps). */
function entries(text: string, marker: string): Record<string, string> {
  const open = text.indexOf('{', text.indexOf(marker)); let d = 0, end = open
  for (let i = open; i < text.length; i++) { if (text[i] === '{') d++; if (text[i] === '}' && --d === 0) { end = i; break } }
  const body = text.slice(open + 1, end)
  return Object.fromEntries([...body.matchAll(/["']?([\w-]+)["']?:\s*\n?\s*["']([^"']*)["']/g)].map((m) => [m[1], m[2]]))
}
// Web → native class form (atoms plan §0.4 R2): drop hover/focus/disabled, bg-[var(--color-x)] → bg-x.
const norm = (c: string) => c.split(/\s+/).filter((x) => x && !/^(hover|focus-visible|disabled):/.test(x))
  .map((x) => x.replace(/-\[(?:color:)?var\(--color-([\w-]+)\)\]/, '-$1'))
const colours = (l: string[]) => l.filter((x) => /^(active:)?(bg|border|text)-/.test(x)).sort()
// §0.5: gradient is painted via style on native; link's pressed colour is a compound variant on native.
const WEB_ONLY: Record<string, string[]> = { gradient: ['bg-gradient-brand'], link: ['active:text-primary-700'] }

const wV = entries(web, 'variant: {'), nV = entries(nat, 'variant: {'), nTV = entries(natText, 'variant: {')
const wS = entries(web, 'size: {'), nS = entries(nat, 'size: {'), nTS = entries(natText, 'size: {')

describe('Leminiscate Button: web ↔ native', () => {
  it('parses all 13 variants and 9 sizes from the web file', () => {
    expect(Object.keys(wV)).toHaveLength(13)
    expect(Object.keys(wS)).toHaveLength(9)
  })
  it('exposes the same variants and sizes', () => {
    expect(Object.keys(nV)).toEqual(Object.keys(wV))
    expect(Object.keys(nS)).toEqual(Object.keys(wS))
  })
  it.each(Object.keys(wV))('variant %s uses the same colour classes', (v) => {
    const webC = colours(norm(wV[v])).filter((c) => !WEB_ONLY[v]?.includes(c))
    expect(colours([...norm(nV[v]), ...norm(nTV[v])])).toEqual(webC)
  })
  it.each(Object.keys(wS))('size %s has the same box and label size', (s) => {
    const w = norm(wS[s]).filter((c) => !c.startsWith('[&_svg]'))
    expect(norm(nS[s]).sort()).toEqual(w.filter((c) => !c.startsWith('text-')).sort())
    const wText = w.filter((c) => c.startsWith('text-'))
    if (wText.length) expect(norm(nTS[s])).toEqual(wText)
  })
})
