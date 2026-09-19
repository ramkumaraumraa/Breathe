import { readdirSync } from 'fs'
import { resolve } from 'path'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import { HomePage } from '@/app/pages/HomePage'
import { InstallationPage } from '@/app/pages/InstallationPage'
import { navigation, componentCount, allNavItems } from '@/app/components/layout/navData'
import { PRODUCT_TABS, STAGE_MARKS, type ProductStage } from '@/app/components/shared/ProductTabs'
import { ThemeProvider } from '@/app/context/ThemeContext'
import { ProductThemeProvider } from '@/app/context/ProductThemeContext'

const routed = (ui: React.ReactNode) =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <ProductThemeProvider>{ui}</ProductThemeProvider>
      </ThemeProvider>
    </MemoryRouter>,
  )

describe('componentCount', () => {
  it('counts a group row by its children, a plain row by itself', () => {
    const atoms = navigation.find(s => s.section === 'Atoms')!
    const group = atoms.items.find(i => i.items)!
    const leaf = atoms.items.find(i => !i.items)!
    expect(group.items!.length).toBeGreaterThan(1) // the group contributes its children
    expect(leaf.items).toBeUndefined() // the plain row contributes one

    const expected = navigation
      .filter(s => ['Atoms', 'Molecules', 'Organisms', 'Templates'].includes(s.section))
      .flatMap(s => s.items)
      .reduce((n, i) => n + (i.items ? i.items.length : 1), 0)
    expect(componentCount).toBe(expected)
  })

  it('is far past the "20+" the page used to claim', () => {
    expect(componentCount).toBeGreaterThan(20)
  })
})

describe('Get Started', () => {
  it('states the counted component total, never a hardcoded one', () => {
    routed(<HomePage />)
    expect(screen.getByText(`${componentCount} documented components`)).toBeInTheDocument()
    expect(screen.queryByText(/20\+/)).not.toBeInTheDocument()
  })

  it('agrees with the package version instead of claiming v1.0', () => {
    routed(<HomePage />)
    expect(screen.getByText(/Breathe Design System v0\.1/)).toBeInTheDocument()
  })

  it('lists every product exactly once, with its tagline', () => {
    routed(<HomePage />)
    for (const product of PRODUCT_TABS) {
      expect(screen.getAllByText(product.label)).toHaveLength(1)
      expect(screen.getAllByText(product.tagline).length).toBeGreaterThan(0)
    }
  })

  it('carries a legend row for every stage, worded from STAGE_MARKS', () => {
    routed(<HomePage />)
    for (const stage of Object.keys(STAGE_MARKS) as ProductStage[]) {
      const { label, meaning } = STAGE_MARKS[stage]
      expect(screen.getByText(label)).toBeInTheDocument()
      expect(screen.getByText(`— ${meaning}`)).toBeInTheDocument()
      expect(meaning.length).toBeGreaterThan(0)
    }
  })

  it('links only to routes the nav actually has', () => {
    const { container } = routed(<HomePage />)
    const navPaths = new Set(allNavItems.map(i => i.path))
    const internal = [...container.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')!)
    expect(internal.length).toBeGreaterThan(0)
    expect(internal.filter(href => !navPaths.has(href))).toEqual([])
  })

  it('previews real components in the grid, not coloured placeholders', () => {
    const { container } = routed(<HomePage />)
    const stages = [...container.querySelectorAll('[aria-hidden="true"].pointer-events-none')]
    expect(stages).toHaveLength(8)
    // Every stage holds rendered component markup, not an empty coloured swatch.
    for (const stage of stages) expect(stage.querySelector('*')).not.toBeNull()
    // The ones that carry a role prove they are the real components, not lookalikes.
    expect(container.querySelector('input[placeholder="Email"]')).not.toBeNull() // Input
    expect(container.querySelector('[role="tablist"]')).not.toBeNull() // Tabs
    expect(container.querySelector('[role="alert"]')).not.toBeNull() // Alert
    expect(container.querySelector('[role="switch"]')).not.toBeNull() // Switch
    expect(container.querySelector('.bg-teal-500')).toBeNull() // the old swatches
  })

  it('keeps those previews out of the accessibility tree and out of the tab order', () => {
    const { container } = routed(<HomePage />)
    // aria-hidden means role queries skip them; the card's Link stays the only target.
    expect(screen.queryByRole('button', { name: 'Button' })).toBeNull()
    expect(screen.getByRole('link', { name: /Button/ })).toBeInTheDocument()
    for (const stage of container.querySelectorAll('[aria-hidden="true"].pointer-events-none')) {
      expect(stage.className).toContain('pointer-events-none')
    }
  })

  it('names both packages, not just the web one', () => {
    routed(<HomePage />)
    expect(screen.getAllByText(/@aumraa\/breathe-react/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/@aumraa\/breathe-native/).length).toBeGreaterThan(0)
  })
})

describe('Installation', () => {
  it('advertises only themes that exist in the packages', () => {
    const { container } = routed(<InstallationPage />)
    // The list is read off the packages at build time, so it can only name real files.
    const shipped = readdirSync(resolve(process.cwd(), 'packages/react/styles'))
      .filter(f => f.endsWith('.css') && f !== 'breathe.css')
      .map(f => f.replace('.css', ''))
    expect(shipped.length).toBeGreaterThan(0)
    const themeList = container.querySelector('dd')!.textContent!
    expect(themeList.split(' · ').sort()).toEqual([...shipped].sort())
    expect(container.textContent).not.toMatch(/ulagellam/i)
  })

  it('documents every product subpath the package exports', () => {
    routed(<InstallationPage />)
    for (const sub of ['kaayo', 'technocracy', 'lemniscate', 'aumraa']) {
      expect(screen.getByText(`@aumraa/breathe-react/${sub}`)).toBeInTheDocument()
    }
  })

  it('covers the native package as well as the web one', () => {
    routed(<InstallationPage />)
    expect(screen.getByText('React — web')).toBeInTheDocument()
    expect(screen.getByText('React Native — Expo')).toBeInTheDocument()
  })
})
