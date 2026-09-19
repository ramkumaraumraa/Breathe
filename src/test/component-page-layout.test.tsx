import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductThemeProvider, productMeta } from '@/app/context/ProductThemeContext'
import { ComponentPageLayout, type ComponentSection } from '@/app/components/shared/ComponentPageLayout'

const kaayoOnly: ComponentSection = { title: 'Kaayo only', preview: <p>kaayo preview</p>, products: ['kaayo'] }
const shared: ComponentSection = { title: 'Shared', preview: <p>shared preview</p> }

// Switch product the way the app does: click the top-level product tab.
function renderOn(tab: RegExp, sections: ComponentSection[]) {
  render(
    <ProductThemeProvider>
      <ComponentPageLayout title="T" description="D" level="Atom" sections={sections} implemented={['lemniscate', 'kaayo']} />
    </ProductThemeProvider>,
  )
  fireEvent.click(screen.getByRole('tab', { name: tab }))
}

describe('ComponentPageLayout product filtering', () => {
  it('hides kaayo-tagged sections on lemniscate, keeps untagged ones', () => {
    renderOn(/Leminiscate/, [kaayoOnly, shared])
    expect(screen.getByText('shared preview')).toBeInTheDocument()
    expect(screen.queryByText('kaayo preview')).not.toBeInTheDocument()
    expect(screen.queryByText(/Not available for/)).not.toBeInTheDocument()
  })

  it('shows both tagged and untagged sections on kaayo', () => {
    renderOn(/Kaayo/, [kaayoOnly, shared])
    expect(screen.getByText('kaayo preview')).toBeInTheDocument()
    expect(screen.getByText('shared preview')).toBeInTheDocument()
  })

  it('shows the placeholder when nothing is available for the active product', () => {
    renderOn(/Leminiscate/, [kaayoOnly])
    expect(screen.queryByText('kaayo preview')).not.toBeInTheDocument()
    expect(screen.getByText(`Not available for ${productMeta.lemniscate.label} yet`)).toBeInTheDocument()
    expect(screen.getByText('Not available for Lemniscate yet')).toBeInTheDocument()
  })
})

describe('ComponentPageLayout Kaayo code guard', () => {
  const kaayoCode: ComponentSection = {
    title: 'Code',
    preview: <p>preview</p>,
    code: { react: `<KayoBrutalistButton label="Save" />` },
  }

  it('hides Kaayo code on a non-Kaayo product and shows the placeholder', () => {
    renderOn(/Leminiscate/, [kaayoCode])
    fireEvent.click(screen.getByRole('button', { name: 'React' }))
    expect(document.body.textContent).not.toContain('KayoBrutalistButton')
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
  })

  it('shows Kaayo code on Kaayo', () => {
    renderOn(/Kaayo/, [kaayoCode])
    fireEvent.click(screen.getByRole('button', { name: 'React' }))
    expect(document.body.textContent).toContain('KayoBrutalistButton')
  })
})
