import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'
import { productMeta, type ProductId } from '@/app/context/ProductThemeContext'

// Guards the two ways a product preview can lie about what consumers get:
// a theme file that references a token nobody defines, and a docs preview that
// has drifted from the theme file it claims to mirror (Kaayo shipped 7 vars the
// preview never applied — --card, --popover, --input and friends).

const STYLES = 'packages/react/styles'
const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8')
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '')

/** Products whose preview is parsed from a shipped stylesheet. */
const THEMED: ProductId[] = ['aumraa', 'technocracy', 'lemniscate', 'maligai', 'ilakh', 'kaayo']
/** Products with no web tokens yet — placeholders until design kickoff. */
const PLACEHOLDER: ProductId[] = ['yakaizen', 'smartlife']

const rootBlock = (css: string) => {
  const s = strip(css)
  const start = s.indexOf(':root {')
  return s.slice(s.indexOf('{', start) + 1, s.indexOf('}', start))
}
const declared = (body: string) => [...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()] as const)

const tokenNames = new Set(
  readdirSync(resolve(process.cwd(), STYLES, 'tokens')).flatMap((f) =>
    [...read(`${STYLES}/tokens/${f}`).matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]),
  ),
)

const baseline = declared(rootBlock(read(`${STYLES}/kaayo.css`))).map(([k]) => k)

describe('product theme stylesheets', () => {
  it.each(THEMED)('%s references only tokens that exist', (id) => {
    const css = strip(read(`${STYLES}/${id}.css`))
    const local = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))
    const unresolved = [...new Set([...css.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]))]
      .filter((v) => !tokenNames.has(v) && !local.has(v))
    expect(unresolved).toEqual([])
  })

  it.each(THEMED)('%s preview matches the shipped stylesheet exactly', (id) => {
    expect(productMeta[id].vars).toEqual(Object.fromEntries(declared(rootBlock(read(`${STYLES}/${id}.css`)))))
  })

  it.each(THEMED)('%s covers every semantic var Kaayo ships', (id) => {
    const names = declared(rootBlock(read(`${STYLES}/${id}.css`))).map(([k]) => k)
    expect(baseline.filter((v) => !names.includes(v))).toEqual([])
  })
})

describe('products without web tokens', () => {
  it.each(PLACEHOLDER)('%s uses literal values, never a dangling token reference', (id) => {
    const refs = Object.values(productMeta[id].vars)
      .flatMap((v) => [...v.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]))
      .filter((v) => !(v in productMeta[id].vars))
    expect(refs).toEqual([])
  })

  it.each(PLACEHOLDER)('%s still fills every semantic var Kaayo ships', (id) => {
    expect(baseline.filter((v) => !(v in productMeta[id].vars))).toEqual([])
  })
})

it('every product id is either themed or an acknowledged placeholder', () => {
  expect([...THEMED, ...PLACEHOLDER].sort()).toEqual(Object.keys(productMeta).sort())
})
