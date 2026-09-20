import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext'
import {
  ProductThemeProvider,
  useProductTheme,
  productMeta,
  type ProductId,
} from '@/app/context/ProductThemeContext'
import { DarkOnlyGuard } from '@/app/components/layout/DarkOnlyGuard'

/** Exposes both contexts so a test can drive the product and read the theme. */
function Harness() {
  const { theme, isForced, toggleTheme } = useTheme()
  const { activeProduct, setActiveProduct } = useProductTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="forced">{String(isForced)}</span>
      <span data-testid="product">{activeProduct}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setActiveProduct('technocracy')}>go-thcy</button>
      <button onClick={() => setActiveProduct('lemniscate')}>go-lmns</button>
    </div>
  )
}

const mount = () =>
  render(
    <ProductThemeProvider>
      <ThemeProvider>
        <DarkOnlyGuard />
        <Harness />
      </ThemeProvider>
    </ProductThemeProvider>,
  )

const click = (name: string) => act(() => { screen.getByText(name).click() })
const theme = () => screen.getByTestId('theme').textContent
const forced = () => screen.getByTestId('forced').textContent

describe('dark-only products', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('marks technocracy as dark-only and no other product', () => {
    const darkOnly = (Object.keys(productMeta) as ProductId[]).filter(
      (id) => productMeta[id].darkOnly,
    )
    expect(darkOnly).toEqual(['technocracy'])
  })

  it('pins the theme to dark when technocracy becomes active', () => {
    mount()
    expect(theme()).toBe('light')
    expect(forced()).toBe('false')

    click('go-thcy')
    expect(theme()).toBe('dark')
    expect(forced()).toBe('true')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('ignores the toggle while pinned', () => {
    mount()
    click('go-thcy')
    click('toggle')
    expect(theme()).toBe('dark')
  })

  it('restores the reader’s own choice on leaving', () => {
    mount()
    click('toggle')              // reader opts into dark
    expect(theme()).toBe('dark')
    click('go-thcy')
    click('go-lmns')
    expect(forced()).toBe('false')
    expect(theme()).toBe('dark') // their choice, not a leftover pin

    click('toggle')
    expect(theme()).toBe('light')
  })

  it('does not persist the pinned theme as a preference', () => {
    mount()
    expect(localStorage.getItem('breathe-theme')).toBe('light')
    click('go-thcy')
    expect(theme()).toBe('dark')
    expect(localStorage.getItem('breathe-theme')).toBe('light')

    click('go-lmns')
    expect(theme()).toBe('light')
  })

  it('technocracy carries no darkVars — its :root is already the dark set', () => {
    expect(productMeta.technocracy.darkVars).toBeUndefined()
    expect(productMeta.technocracy.vars['--background']).toBeTruthy()
  })
})
