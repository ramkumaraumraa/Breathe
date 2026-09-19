import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PRODUCT_TABS, STAGE_MARKS, ProductTabs } from '@/app/components/shared/ProductTabs'
import { MemoryRouter } from 'react-router'
import { productMeta, ProductThemeProvider, useProductTheme } from '@/app/context/ProductThemeContext'
import { brands as logoBrands } from '@/app/pages/foundations/logos/logoData'
import { TypographyPage } from '@/app/pages/foundations/TypographyPage'

function ActiveProductProbe() {
  const { activeProduct } = useProductTheme()
  return <span data-testid="active">{activeProduct}</span>
}

/** A Foundations page mounted the way the app mounts it. */
function renderFoundationsPage(extra?: React.ReactNode) {
  render(
    <MemoryRouter>
      <ProductThemeProvider>
        <TypographyPage />
        {extra}
      </ProductThemeProvider>
    </MemoryRouter>,
  )
}

const EXPECTED = [
  'Aumraa',
  'Technocracy',
  'Leminiscate',
  'Kaayo',
  'Maligai Manager',
  'Ilakh',
  'Yakaizen',
  'Smart Life-Style App',
]

describe('PRODUCT_TABS', () => {
  it('is the flat, ordered list of 8 products', () => {
    expect(PRODUCT_TABS.map(t => t.label)).toEqual(EXPECTED)
  })

  it('has no Ulagellam left anywhere', () => {
    expect(JSON.stringify(PRODUCT_TABS)).not.toMatch(/ulagellam/i)
    expect(Object.keys(productMeta)).not.toContain('ulagellam')
  })

  it('maps every tab onto a themed product and a logo entry', () => {
    for (const tab of PRODUCT_TABS) {
      expect(productMeta[tab.id]).toBeDefined()
      expect(logoBrands.find(b => b.id === tab.id)).toBeDefined()
    }
  })
})

describe('ProductTabs', () => {
  it('renders the labels alone — no inline stage chips widening the strip', () => {
    render(<ProductTabs active="aumraa" onChange={() => {}} />)
    expect(screen.getAllByRole('tab').map(el => el.textContent)).toEqual(
      PRODUCT_TABS.map(t => t.label),
    )
  })

  it('exposes the stage on hover, on every tab — no exceptions', () => {
    render(<ProductTabs active="aumraa" onChange={() => {}} />)
    for (const tab of PRODUCT_TABS) {
      const { label, meaning } = STAGE_MARKS[tab.stage]
      const title = screen.getByRole('tab', { name: tab.label }).title
      expect(title).toContain(label)
      expect(title).toContain(meaning)
    }
  })

  it('says a tab is a placeholder in its tooltip when the page has no content for it', () => {
    render(<ProductTabs active="aumraa" onChange={() => {}} implemented={['aumraa']} />)
    expect(screen.getByRole('tab', { name: 'Aumraa' }).title).toContain('Studio brand — green primary')
    expect(screen.getByRole('tab', { name: 'Yakaizen' }).title).toContain('Placeholder')
  })

  it('treats the base brand and the internal tool as separate stages', () => {
    const stageOf = (label: string) => PRODUCT_TABS.find(t => t.label === label)!.stage
    expect(stageOf('Aumraa')).toBe('Base')
    expect(stageOf('Technocracy')).toBe('Internal')
    expect(PRODUCT_TABS.filter(t => t.stage === 'Live').map(t => t.label)).toEqual(['Leminiscate', 'Kaayo'])
  })

  // Shape is what carries the stage — red/green dots alone fail under deuteranopia.
  it('gives every stage its own icon, not just its own colour', () => {
    const marks = Object.values(STAGE_MARKS)
    expect(new Set(marks.map(m => m.icon)).size).toBe(marks.length)
    expect(new Set(marks.map(m => m.color)).size).toBe(marks.length)
  })

  it('gives every stage legend copy for the Get Started key', () => {
    for (const m of Object.values(STAGE_MARKS)) {
      expect(m.label).not.toBe('')
      expect(m.meaning).not.toBe('')
    }
  })

  it('renders a stage icon inside every tab', () => {
    render(<ProductTabs active="aumraa" onChange={() => {}} />)
    for (const tab of PRODUCT_TABS) {
      expect(screen.getByRole('tab', { name: tab.label }).querySelector('svg')).toBeInTheDocument()
    }
  })

  it('marks only the active tab selected and reports clicks', () => {
    const onChange = vi.fn()
    render(<ProductTabs active="kaayo" onChange={onChange} />)
    expect(screen.getByRole('tab', { name: /^Kaayo/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: /^Ilakh/ })).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(screen.getByRole('tab', { name: /^Ilakh/ }))
    expect(onChange).toHaveBeenCalledWith('ilakh')
  })

  it('dims tabs the page has no content for, and only those', () => {
    render(<ProductTabs active="aumraa" onChange={() => {}} implemented={['aumraa']} />)
    expect(screen.getByRole('tab', { name: /^Aumraa/ }).className).not.toMatch(/opacity-50/)
    expect(screen.getByRole('tab', { name: /^Yakaizen/ }).className).toMatch(/opacity-50/)
  })
})

describe('product selection is shared across the site', () => {
  it('a Foundations page writes the picked product into the global theme', () => {
    renderFoundationsPage(<ActiveProductProbe />)
    expect(screen.getByTestId('active')).toHaveTextContent('aumraa')

    fireEvent.click(screen.getByRole('tab', { name: 'Kaayo' }))
    expect(screen.getByTestId('active')).toHaveTextContent('kaayo')
  })

  it('and reads it back, so the choice follows you between pages', () => {
    renderFoundationsPage()
    fireEvent.click(screen.getByRole('tab', { name: 'Technocracy' }))
    expect(screen.getByRole('tab', { name: 'Technocracy' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Aumraa' })).toHaveAttribute('aria-selected', 'false')
  })
})
