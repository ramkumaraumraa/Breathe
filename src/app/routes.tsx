import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import { Root } from './components/layout/Root'
import { HomePage } from './pages/HomePage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { NotFoundPage } from './pages/NotFoundPage'

const PageLoader = () => (
  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
    Loading…
  </div>
)

function lazy_page(
  factory: () => Promise<Record<string, React.ComponentType>>
): React.ComponentType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = lazy(async () => {
    const mod = await factory()
    const exported = Object.values(mod)[0]
    return { default: exported }
  }) as React.ComponentType
  return function LazyPage() {
    return <Suspense fallback={<PageLoader />}><Comp /></Suspense>
  }
}

// Foundations
const LogosPage        = lazy_page(() => import('./pages/foundations/LogosPage'))
const ColorsPage       = lazy_page(() => import('./pages/foundations/ColorsPage'))
const DesignTokensPage = lazy_page(() => import('./pages/foundations/DesignTokensPage'))
const TypographyPage   = lazy_page(() => import('./pages/foundations/TypographyPage'))
const SpacingPage      = lazy_page(() => import('./pages/foundations/SpacingPage'))
const GridPage         = lazy_page(() => import('./pages/foundations/GridPage'))
const ElevationPage    = lazy_page(() => import('./pages/foundations/ElevationPage'))
const IconsPage        = lazy_page(() => import('./pages/foundations/IconsPage'))
const MotionPage       = lazy_page(() => import('./pages/foundations/MotionPage'))

// Atoms
const ButtonPage     = lazy_page(() => import('./pages/atoms/ButtonPage'))
const InputPage      = lazy_page(() => import('./pages/atoms/InputPage'))
const TextareaPage   = lazy_page(() => import('./pages/atoms/TextareaPage'))
const CheckboxPage   = lazy_page(() => import('./pages/atoms/CheckboxPage'))
const RadioGroupPage = lazy_page(() => import('./pages/atoms/RadioGroupPage'))
const SwitchPage     = lazy_page(() => import('./pages/atoms/SwitchPage'))
const TogglePage     = lazy_page(() => import('./pages/atoms/TogglePage'))
const SliderPage     = lazy_page(() => import('./pages/atoms/SliderPage'))
const AvatarPage     = lazy_page(() => import('./pages/atoms/AvatarPage'))
const BadgePage      = lazy_page(() => import('./pages/atoms/BadgePage'))
const LabelPage      = lazy_page(() => import('./pages/atoms/LabelPage'))
const SeparatorPage  = lazy_page(() => import('./pages/atoms/SeparatorPage'))
const ProgressPage   = lazy_page(() => import('./pages/atoms/ProgressPage'))
const SkeletonPage   = lazy_page(() => import('./pages/atoms/SkeletonPage'))

// Molecules
const AlertPage        = lazy_page(() => import('./pages/molecules/AlertPage'))
const CardPage         = lazy_page(() => import('./pages/molecules/CardPage'))
const FormPage         = lazy_page(() => import('./pages/molecules/FormPage'))
const SelectPage       = lazy_page(() => import('./pages/molecules/SelectPage'))
const DropdownMenuPage = lazy_page(() => import('./pages/molecules/DropdownMenuPage'))
const TabsPage         = lazy_page(() => import('./pages/molecules/TabsPage'))
const AccordionPage    = lazy_page(() => import('./pages/molecules/AccordionPage'))
const CollapsiblePage  = lazy_page(() => import('./pages/molecules/CollapsiblePage'))
const TooltipPage      = lazy_page(() => import('./pages/molecules/TooltipPage'))
const HoverCardPage    = lazy_page(() => import('./pages/molecules/HoverCardPage'))
const BreadcrumbPage   = lazy_page(() => import('./pages/molecules/BreadcrumbPage'))
const PaginationPage   = lazy_page(() => import('./pages/molecules/PaginationPage'))
const ScrollAreaPage   = lazy_page(() => import('./pages/molecules/ScrollAreaPage'))
const SonnerPage       = lazy_page(() => import('./pages/molecules/SonnerPage'))

// Organisms
const DialogPage         = lazy_page(() => import('./pages/organisms/DialogPage'))
const SheetPage          = lazy_page(() => import('./pages/organisms/SheetPage'))
const DrawerPage         = lazy_page(() => import('./pages/organisms/DrawerPage'))
const CommandPage        = lazy_page(() => import('./pages/organisms/CommandPage'))
const TablePage          = lazy_page(() => import('./pages/organisms/TablePage'))
const CalendarPage       = lazy_page(() => import('./pages/organisms/CalendarPage'))
const CarouselPage       = lazy_page(() => import('./pages/organisms/CarouselPage'))
const SidebarPage        = lazy_page(() => import('./pages/organisms/SidebarPage'))
const NavigationMenuPage = lazy_page(() => import('./pages/organisms/NavigationMenuPage'))

// Templates
const StatGridPage    = lazy_page(() => import('./pages/templates/StatGridPage'))
const PageToolbarPage = lazy_page(() => import('./pages/templates/PageToolbarPage'))
const DataSectionPage = lazy_page(() => import('./pages/templates/DataSectionPage'))
const PageBodyPage    = lazy_page(() => import('./pages/templates/PageBodyPage'))
const MobileFabPage   = lazy_page(() => import('./pages/templates/MobileFabPage'))
const TabBarPage      = lazy_page(() => import('./pages/templates/TabBarPage'))

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
      { path: 'atoms/button',      Component: ButtonPage },
      { path: 'atoms/input',       Component: InputPage },
      { path: 'atoms/textarea',    Component: TextareaPage },
      { path: 'atoms/checkbox',    Component: CheckboxPage },
      { path: 'atoms/radio-group', Component: RadioGroupPage },
      { path: 'atoms/switch',      Component: SwitchPage },
      { path: 'atoms/toggle',      Component: TogglePage },
      { path: 'atoms/slider',      Component: SliderPage },
      { path: 'atoms/avatar',      Component: AvatarPage },
      { path: 'atoms/badge',       Component: BadgePage },
      { path: 'atoms/label',       Component: LabelPage },
      { path: 'atoms/separator',   Component: SeparatorPage },
      { path: 'atoms/progress',    Component: ProgressPage },
      { path: 'atoms/skeleton',    Component: SkeletonPage },

      // Molecules
      { path: 'molecules/alert',         Component: AlertPage },
      { path: 'molecules/card',          Component: CardPage },
      { path: 'molecules/form',          Component: FormPage },
      { path: 'molecules/select',        Component: SelectPage },
      { path: 'molecules/dropdown-menu', Component: DropdownMenuPage },
      { path: 'molecules/tabs',          Component: TabsPage },
      { path: 'molecules/accordion',     Component: AccordionPage },
      { path: 'molecules/collapsible',   Component: CollapsiblePage },
      { path: 'molecules/tooltip',       Component: TooltipPage },
      { path: 'molecules/hover-card',    Component: HoverCardPage },
      { path: 'molecules/breadcrumb',    Component: BreadcrumbPage },
      { path: 'molecules/pagination',    Component: PaginationPage },
      { path: 'molecules/scroll-area',   Component: ScrollAreaPage },
      { path: 'molecules/sonner',        Component: SonnerPage },

      // Organisms
      { path: 'organisms/dialog',          Component: DialogPage },
      { path: 'organisms/sheet',           Component: SheetPage },
      { path: 'organisms/drawer',          Component: DrawerPage },
      { path: 'organisms/command',         Component: CommandPage },
      { path: 'organisms/table',           Component: TablePage },
      { path: 'organisms/calendar',        Component: CalendarPage },
      { path: 'organisms/carousel',        Component: CarouselPage },
      { path: 'organisms/sidebar',         Component: SidebarPage },
      { path: 'organisms/navigation-menu', Component: NavigationMenuPage },

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
