import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '@/app/context/ThemeContext'
import { ProductThemeProvider, ProductPreviewWrapper, productMeta } from '@/app/context/ProductThemeContext'

const wrap = (ui: React.ReactNode) =>
  render(
    <ThemeProvider>
      <ProductThemeProvider>
        <ProductPreviewWrapper>{ui}</ProductPreviewWrapper>
      </ProductThemeProvider>
    </ThemeProvider>,
  )

describe('Leminiscate preview theme', () => {
  it('maps every semantic var from the package stylesheet', () => {
    expect(productMeta.lemniscate.vars['--primary']).toBe('var(--lmns-color-primary)')
    expect(productMeta.lemniscate.vars['--card']).toBeDefined() // used to fall through to the Aumraa docs default
    expect(Object.keys(productMeta.lemniscate.vars).length).toBeGreaterThan(18)
  })
  it('opens on ?product=', () => {
    window.history.replaceState(null, '', '/?product=lemniscate')
    const { container } = wrap(<span />)
    expect((container.firstChild as HTMLElement).style.getPropertyValue('--primary')).toBe('var(--lmns-color-primary)')
    window.history.replaceState(null, '', '/')
  })
  it('opens on ?theme=dark', () => {
    localStorage.removeItem('breathe-theme')
    window.history.replaceState(null, '', '/?product=lemniscate&theme=dark')
    wrap(<span />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    window.history.replaceState(null, '', '/')
    document.documentElement.classList.remove('dark')
  })
})
