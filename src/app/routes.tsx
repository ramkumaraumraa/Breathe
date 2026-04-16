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

// Legacy component pages — kept until Phase 3 page migrations complete
import { ButtonPage as LegacyButtonPage }     from './pages/components/ButtonPage'
import { InputPage as LegacyInputPage }       from './pages/components/InputPage'
import { CardPage as LegacyCardPage }         from './pages/components/CardPage'
import { BadgePage as LegacyBadgePage }       from './pages/components/BadgePage'
import { AvatarPage as LegacyAvatarPage }     from './pages/components/AvatarPage'
import { AlertPage as LegacyAlertPage }       from './pages/components/AlertPage'
import { ModalPage as LegacyModalPage }       from './pages/components/ModalPage'
import { TabsPage as LegacyTabsPage }         from './pages/components/TabsPage'
import { TooltipPage as LegacyTooltipPage }   from './pages/components/TooltipPage'
import { SelectPage as LegacySelectPage }     from './pages/components/SelectPage'
import { CheckboxPage as LegacyCheckboxPage } from './pages/components/CheckboxPage'
import { SwitchPage as LegacySwitchPage }     from './pages/components/SwitchPage'

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

      // Legacy /components/* — redirect to new atomic paths
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

      // Atoms — served by legacy pages until Phase 3 creates new ones
      { path: 'atoms/button',   Component: LegacyButtonPage },
      { path: 'atoms/input',    Component: LegacyInputPage },
      { path: 'atoms/checkbox', Component: LegacyCheckboxPage },
      { path: 'atoms/switch',   Component: LegacySwitchPage },
      { path: 'atoms/avatar',   Component: LegacyAvatarPage },
      { path: 'atoms/badge',    Component: LegacyBadgePage },

      // Molecules — served by legacy pages until Phase 3
      { path: 'molecules/alert',   Component: LegacyAlertPage },
      { path: 'molecules/card',    Component: LegacyCardPage },
      { path: 'molecules/select',  Component: LegacySelectPage },
      { path: 'molecules/tabs',    Component: LegacyTabsPage },
      { path: 'molecules/tooltip', Component: LegacyTooltipPage },

      // Organisms — served by legacy page until Phase 3
      { path: 'organisms/dialog', Component: LegacyModalPage },

      // Templates — empty until Phase 3 creates pages
      // (nav links will 404 until Task 18 adds them)

      { path: '*', Component: NotFoundPage },
    ],
  },
])
