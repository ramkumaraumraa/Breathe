import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const COMPONENT_DIR = join(process.cwd(), 'packages/react/src/technocracy')
const TOKEN_CSS = join(process.cwd(), 'tokens/dist/web/technocracy.css')

const componentFiles = readdirSync(COMPONENT_DIR).filter((f) => f.endsWith('.tsx'))
const source = (f: string) => readFileSync(join(COMPONENT_DIR, f), 'utf8')

/** Every custom property declared by the generated Technocracy stylesheet. */
const declared = new Set(
  [...readFileSync(TOKEN_CSS, 'utf8').matchAll(/(--[\w-]+):/g)].map((m) => m[1]),
)

describe('technocracy components consume tokens', () => {
  it('ships the components that exist', () => {
    expect(componentFiles.length).toBeGreaterThan(0)
  })

  // Hardcoded colour is how these drifted from the dashboards that consume them.
  it.each(componentFiles)('%s holds no colour literals', (file) => {
    const withoutVars = source(file).replace(/var\(--[\w-]+\)/g, '')
    const literals = withoutVars.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d/g)
    expect(literals ?? []).toEqual([])
  })

  it.each(componentFiles)('%s only references tokens that exist', (file) => {
    const used = [...source(file).matchAll(/var\((--thcy-[\w-]+)\)/g)].map((m) => m[1])
    const missing = used.filter((v) => !declared.has(v))
    expect(missing).toEqual([])
  })

  it('actually uses tokens rather than avoiding colour altogether', () => {
    const all = componentFiles.flatMap((f) =>
      [...source(f).matchAll(/var\((--thcy-[\w-]+)\)/g)].map((m) => m[1]),
    )
    expect(new Set(all).size).toBeGreaterThanOrEqual(20)
  })

  // The 11 variables Technocracy-Kaayo's globals.css maps. Renaming any of them
  // silently breaks the shipped dashboard, which pins them by name.
  it('keeps the variables the deployed dashboards depend on', () => {
    const loadBearing = [
      '--thcy-color-background',
      '--thcy-color-background-secondary',
      '--thcy-color-glass',
      '--thcy-color-border',
      '--thcy-color-border-strong',
      '--thcy-color-foreground',
      '--thcy-color-foreground-secondary',
      '--thcy-color-signal-green',
      '--thcy-color-signal-amber',
      '--thcy-color-signal-red',
      '--thcy-color-signal-blue',
      '--thcy-color-brand',
    ]
    const missing = loadBearing.filter((v) => !declared.has(v))
    expect(missing).toEqual([])
  })

  it('is a permanent-dark surface — no .dark block, :root already is dark', () => {
    const css = readFileSync(TOKEN_CSS, 'utf8')
    expect(css).not.toMatch(/^\.dark\s*\{/m)
    expect(css).toMatch(/--thcy-color-background:\s*#04060f/)
  })
})
