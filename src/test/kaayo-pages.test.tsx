import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import React from 'react'
import { ProductThemeProvider } from '../app/context/ProductThemeContext'

import { MenuLayoutsPage } from '../app/pages/organisms/MenuLayoutsPage'
import { ElevationPage } from '../app/pages/foundations/ElevationPage'
import { TypographyPage } from '../app/pages/foundations/TypographyPage'
import { ColorsPage } from '../app/pages/foundations/ColorsPage'
import { DesignTokensPage } from '../app/pages/foundations/DesignTokensPage'
import { StatusDotPage } from '../app/pages/atoms/StatusDotPage'
import { ChipPage } from '../app/pages/atoms/ChipPage'
import { ClayControlsPage } from '../app/pages/atoms/ClayControlsPage'
import { WarliVeilPage } from '../app/pages/atoms/WarliVeilPage'
import { EnrollmentTagPage } from '../app/pages/atoms/EnrollmentTagPage'
import { ClayDialPage } from '../app/pages/molecules/ClayDialPage'
import { KhataFolderPage } from '../app/pages/molecules/KhataFolderPage'
import { NotificationBannerPage } from '../app/pages/molecules/NotificationBannerPage'
import { PushedScreenHeaderPage } from '../app/pages/molecules/PushedScreenHeaderPage'
import { HeaderPage } from '../app/pages/molecules/HeaderPage'
import { CanopyBandPage } from '../app/pages/organisms/CanopyBandPage'

const pages: [string, React.ComponentType][] = [
  ['MenuLayoutsPage', MenuLayoutsPage],
  ['ElevationPage', ElevationPage],
  ['TypographyPage', TypographyPage],
  ['ColorsPage', ColorsPage],
  ['DesignTokensPage', DesignTokensPage],
  ['StatusDotPage', StatusDotPage],
  ['ChipPage', ChipPage],
  ['ClayControlsPage', ClayControlsPage],
  ['WarliVeilPage', WarliVeilPage],
  ['EnrollmentTagPage', EnrollmentTagPage],
  ['ClayDialPage', ClayDialPage],
  ['KhataFolderPage', KhataFolderPage],
  ['NotificationBannerPage', NotificationBannerPage],
  ['PushedScreenHeaderPage', PushedScreenHeaderPage],
  ['HeaderPage', HeaderPage],
  ['CanopyBandPage', CanopyBandPage],
]

describe('Kaayo showcase pages render without errors across product themes', () => {
  it('renders all Kaayo showcase pages under ?product=kaayo', () => {
    delete (window as any).location
    window.location = new URL('http://localhost:5173/?product=kaayo') as any

    for (const [_, Component] of pages) {
      const { unmount } = render(
        <MemoryRouter>
          <ProductThemeProvider>
            <Component />
          </ProductThemeProvider>
        </MemoryRouter>
      )
      unmount()
    }
  })
})

