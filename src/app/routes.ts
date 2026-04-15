import { createBrowserRouter } from 'react-router';
import { Root } from './components/layout/Root';
import { HomePage } from './pages/HomePage';
import { LogosPage } from './pages/foundations/LogosPage';
import { ColorsPage } from './pages/foundations/ColorsPage';
import { DesignTokensPage } from './pages/foundations/DesignTokensPage';
import { TypographyPage } from './pages/foundations/TypographyPage';
import { SpacingPage } from './pages/foundations/SpacingPage';
import { GridPage } from './pages/foundations/GridPage';
import { ElevationPage } from './pages/foundations/ElevationPage';
import { IconsPage } from './pages/foundations/IconsPage';
import { MotionPage } from './pages/foundations/MotionPage';
import { ButtonPage } from './pages/components/ButtonPage';
import { InputPage } from './pages/components/InputPage';
import { CardPage } from './pages/components/CardPage';
import { BadgePage } from './pages/components/BadgePage';
import { AvatarPage } from './pages/components/AvatarPage';
import { AlertPage } from './pages/components/AlertPage';
import { ModalPage } from './pages/components/ModalPage';
import { TabsPage } from './pages/components/TabsPage';
import { TooltipPage } from './pages/components/TooltipPage';
import { SelectPage } from './pages/components/SelectPage';
import { CheckboxPage } from './pages/components/CheckboxPage';
import { SwitchPage } from './pages/components/SwitchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { GettingStartedPage } from './pages/GettingStartedPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'getting-started', Component: GettingStartedPage },
      { path: 'foundations/logos', Component: LogosPage },
      { path: 'foundations/colors', Component: ColorsPage },
      { path: 'foundations/design-tokens', Component: DesignTokensPage },
      { path: 'foundations/typography', Component: TypographyPage },
      { path: 'foundations/spacing', Component: SpacingPage },
      { path: 'foundations/grid', Component: GridPage },
      { path: 'foundations/elevation', Component: ElevationPage },
      { path: 'foundations/icons', Component: IconsPage },
      { path: 'foundations/motion', Component: MotionPage },
      { path: 'components/button', Component: ButtonPage },
      { path: 'components/input', Component: InputPage },
      { path: 'components/card', Component: CardPage },
      { path: 'components/badge', Component: BadgePage },
      { path: 'components/avatar', Component: AvatarPage },
      { path: 'components/alert', Component: AlertPage },
      { path: 'components/modal', Component: ModalPage },
      { path: 'components/tabs', Component: TabsPage },
      { path: 'components/tooltip', Component: TooltipPage },
      { path: 'components/select', Component: SelectPage },
      { path: 'components/checkbox', Component: CheckboxPage },
      { path: 'components/switch', Component: SwitchPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
