import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
function block(src: string, marker: string) {
  const open = src.indexOf('{', src.indexOf(marker)); let d = 0
  for (let i = open; i < src.length; i++) { if (src[i] === '{') d++; if (src[i] === '}' && --d === 0) return src.slice(open + 1, i) }
  throw new Error(`no block: ${marker}`)
}
const vars = (t: string) => Object.fromEntries([...t.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))

const dist = vars(block(read('tokens/dist/web/lemniscate.css'), ':root'))
const native = read('packages/react-native/styles/lemniscate.css')
const nLight = vars(block(native, ':root')), nDark = vars(block(native, '@media (prefers-color-scheme: dark)'))
const nTheme = vars(block(native, '@theme inline'))
const web = read('packages/react/styles/lemniscate.css')
const wLight = vars(block(web, ':root')), wDark = vars(block(web, '.dark'))
const pick = (p: string) => Object.entries(dist).filter(([k]) => k.startsWith(p)).map(([k, v]) => [k.slice(p.length), v, k] as const)

describe('Leminiscate: web and native carry the same token values', () => {
  it('has the expected token counts', () => {
    expect(pick('lmns-color-')).toHaveLength(54)
    expect(pick('lmns-dark-color-')).toHaveLength(28)
    expect(pick('lmns-palette-')).toHaveLength(43)
  })
  it.each(pick('lmns-color-'))('light %s', (n, v, t) => { expect(nLight[n]).toBe(v); expect(wLight[n]).toBe(`var(--${t})`) })
  it.each(pick('lmns-dark-color-'))('dark %s', (n, v, t) => { expect(nDark[n]).toBe(v); expect(wDark[n]).toBe(`var(--${t})`) })
  it.each(pick('lmns-palette-'))('scale %s', (n, v, t) => { expect(nTheme[`color-${n}`]).toBe(v); expect(wLight[`color-${n}`]).toBe(`var(--${t})`) })
  it('native has no colour the tokens lack', () => {
    expect(Object.keys(nLight).sort()).toEqual(pick('lmns-color-').map(([n]) => n).sort())
    expect(Object.keys(nDark).sort()).toEqual(pick('lmns-dark-color-').map(([n]) => n).sort())
  })
  it('radius, shadow and gradient come from the tokens', () => {
    expect(nTheme['radius-sm']).toBe(dist['lmns-radius-sm'])
    expect(nTheme['radius-md']).toBe(dist['lmns-radius-md'])
    expect(nTheme['radius-lg']).toBe(dist['lmns-radius-default'])
    expect(nTheme['radius-xl']).toBe(dist['lmns-radius-lg'])
    expect(nTheme['shadow-card']).toBe(dist['lmns-shadow-card'])
    expect(nTheme['shadow-brand']).toBe(dist['lmns-shadow-brand'])
    expect(wLight['radius']).toBe('var(--lmns-radius-default)')
    expect(wLight['gradient-brand']).toBe('linear-gradient(135deg, var(--lmns-color-gradient-start) 0%, var(--lmns-color-gradient-end) 100%)')
  })
})
