import { createBrowserRouter, Navigate } from 'react-router'
import { Root } from './components/layout/Root'
import { HomePage } from './pages/HomePage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Foundations
import { LogosPage }        from './pages/foundations/LogosPage'
import { ColorsPage }       from './pages/foundations/ColorsPage'
import { DesignTokensPage } from './pages/foundations/DesignTokensPage'
import { TypographyPage }   from './pages/foundations/TypographyPage'
import { SpacingPage }      from './pages/foundations/SpacingPage'
import { GridPage }         from './pages/foundations/GridPage'
import { ElevationPage }    from './pages/foundations/ElevationPage'
import { IconsPage }        from './pages/foundations/IconsPage'
import { MotionPage }       from './pages/foundations/MotionPage'

// Atoms
import { ButtonPage }   from './pages/atoms/ButtonPage'
import { InputPage }    from './pages/atoms/InputPage'
import { CheckboxPage } from './pages/atoms/CheckboxPage'
import { SwitchPage }   from './pages/atoms/SwitchPage'
import { AvatarPage }   from './pages/atoms/AvatarPage'
import { BadgePage }    from './pages/atoms/BadgePage'

// Molecules
import { AlertPage }   from './pages/molecules/AlertPage'
import { CardPage }    from './pages/molecules/CardPage'
import { SelectPage }  from './pages/molecules/SelectPage'
import { TabsPage }    from './pages/molecules/TabsPage'
import { TooltipPage } from './pages/molecules/TooltipPage'

// Organisms
import { DialogPage } from './pages/organisms/DialogPage'

// Templates
import { StatGridPage }    from './pages/templates/StatGridPage'
import { PageToolbarPage } from './pages/templates/PageToolbarPage'
import { DataSectionPage } from './pages/templates/DataSectionPage'
import { PageBodyPage }    from './pages/templates/PageBodyPage'
import { MobileFabPage }   from './pages/templates/MobileFabPage'
import { TabBarPage }      from './pages/templates/TabBarPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'getting-started', Component: GettingStartedPage },

      // Foundations
      { path: 'foundations/logos',         Component: LogosPage },
      { path: 'foundations/colors',        Component: ColorsPage },
      { path: 'foundations/design-tokens', Component: DesignTokensPage },
      { path: 'foundations/typography',    Component: TypographyPage },
      { path: 'foundations/spacing',       Component: SpacingPage },
      { path: 'foundations/grid',          Component: GridPage },
      { path: 'foundations/elevation',     Component: ElevationPage },
      { path: 'foundations/icons',         Component: IconsPage },
      { path: 'foundations/motion',        Component: MotionPage },

      // /components/* → redirect to atomic paths
      { path: 'components/button',   element: <Navigate to="/atoms/button"      replace /> },
      { path: 'components/input',    element: <Navigate to="/atoms/input"       replace /> },
      { path: 'components/checkbox', element: <Navigate to="/atoms/checkbox"    replace /> },
      { path: 'components/switch',   element: <Navigate to="/atoms/switch"      replace /> },
      { path: 'components/avatar',   element: <Navigate to="/atoms/avatar"      replace /> },
      { path: 'components/badge',    element: <Navigate to="/atoms/badge"       replace /> },
      { path: 'components/alert',    element: <Navigate to="/molecules/alert"   replace /> },
      { path: 'components/card',     element: <Navigate to="/molecules/card"    replace /> },
      { path: 'components/select',   element: <Navigate to="/molecules/select"  replace /> },
      { path: 'components/tabs',     element: <Navigate to="/molecules/tabs"    replace /> },
      { path: 'components/tooltip',  element: <Navigate to="/molecules/tooltip" replace /> },
      { path: 'components/modal',    element: <Navigate to="/organisms/dialog"  replace /> },

      // Atoms
      { path: 'atoms/button',   Component: ButtonPage },
      { path: 'atoms/input',    Component: InputPage },
      { path: 'atoms/checkbox', Component: CheckboxPage },
      { path: 'atoms/switch',   Component: SwitchPage },
      { path: 'atoms/avatar',   Component: AvatarPage },
      { path: 'atoms/badge',    Component: BadgePage },

      // Molecules
      { path: 'molecules/alert',   Component: AlertPage },
      { path: 'molecules/card',    Component: CardPage },
      { path: 'molecules/select',  Component: SelectPage },
      { path: 'molecules/tabs',    Component: TabsPage },
      { path: 'molecules/tooltip', Component: TooltipPage },

      // Organisms
      { path: 'organisms/dialog', Component: DialogPage },

      // Templates
      { path: 'templates/stat-grid',    Component: StatGridPage },
      { path: 'templates/page-toolbar', Component: PageToolbarPage },
      { path: 'templates/data-section', Component: DataSectionPage },
      { path: 'templates/page-body',    Component: PageBodyPage },
      { path: 'templates/mobile-fab',   Component: MobileFabPage },
      { path: 'templates/tab-bar',      Component: TabBarPage },

      { path: '*', Component: NotFoundPage },
    ],
  },
])
