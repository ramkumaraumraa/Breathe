import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import { Root } from './components/layout/Root'
import { HomePage } from './pages/HomePage'
import { InstallationPage } from './pages/InstallationPage'
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
const AvatarPage     = lazy_page(() => import('./pages/atoms/AvatarPage'))
const BadgePage      = lazy_page(() => import('./pages/atoms/BadgePage'))
const LabelPage      = lazy_page(() => import('./pages/atoms/LabelPage'))
const SeparatorPage  = lazy_page(() => import('./pages/atoms/SeparatorPage'))
const ProgressPage   = lazy_page(() => import('./pages/atoms/ProgressPage'))
const SkeletonPage   = lazy_page(() => import('./pages/atoms/SkeletonPage'))
const SpinnerPage    = lazy_page(() => import('./pages/atoms/SpinnerPage'))

// Form Elements under Atoms
const TextInputPage     = lazy_page(() => import('./pages/atoms/form-elements/TextInputPage'))
const TextareaInputPage = lazy_page(() => import('./pages/atoms/form-elements/TextareaInputPage'))
const RadioPage         = lazy_page(() => import('./pages/atoms/form-elements/RadioPage'))
const CheckboxPage      = lazy_page(() => import('./pages/atoms/form-elements/CheckboxPage'))
const DropdownPage      = lazy_page(() => import('./pages/atoms/form-elements/DropdownPage'))
const SearchbarPage     = lazy_page(() => import('./pages/atoms/form-elements/SearchbarPage'))
const TogglePage        = lazy_page(() => import('./pages/atoms/form-elements/TogglePage'))
const CalendarPage      = lazy_page(() => import('./pages/atoms/form-elements/CalendarPage'))
const DragSliderPage    = lazy_page(() => import('./pages/atoms/form-elements/DragSliderPage'))
const ListElementsPage  = lazy_page(() => import('./pages/atoms/form-elements/ListElementsPage'))
const OTPInputPage      = lazy_page(() => import('./pages/atoms/form-elements/OTPInputPage'))
const AmountVisibilityTogglePage = lazy_page(() => import('./pages/atoms/AmountVisibilityTogglePage'))
const ChipMultiSelectPage        = lazy_page(() => import('./pages/atoms/form-elements/ChipMultiSelectPage'))

// Molecules
const AlertPage            = lazy_page(() => import('./pages/molecules/AlertPage'))
const CardPage             = lazy_page(() => import('./pages/molecules/CardPage'))
const EmptyStatePage        = lazy_page(() => import('./pages/molecules/EmptyStatePage'))
const StepIndicatorPage     = lazy_page(() => import('./pages/molecules/StepIndicatorPage'))
const DeleteGuardSheetPage  = lazy_page(() => import('./pages/molecules/DeleteGuardSheetPage'))
const WhatsAppControlsPage  = lazy_page(() => import('./pages/molecules/WhatsAppControlsPage'))
const PhotoViewerPage       = lazy_page(() => import('./pages/molecules/PhotoViewerPage'))
const FormPage         = lazy_page(() => import('./pages/molecules/FormPage'))
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
const CarouselPage       = lazy_page(() => import('./pages/organisms/CarouselPage'))
const SidebarPage        = lazy_page(() => import('./pages/organisms/SidebarPage'))
const NavigationMenuPage = lazy_page(() => import('./pages/organisms/NavigationMenuPage'))
const HeaderPage         = lazy_page(() => import('./pages/molecules/HeaderPage'))
const BottomNavPage      = lazy_page(() => import('./pages/molecules/BottomNavPage'))
const MenuLayoutsPage    = lazy_page(() => import('./pages/organisms/MenuLayoutsPage'))

// Templates
const StatGridPage    = lazy_page(() => import('./pages/templates/StatGridPage'))
const PageToolbarPage = lazy_page(() => import('./pages/templates/PageToolbarPage'))
const DataSectionPage = lazy_page(() => import('./pages/templates/DataSectionPage'))
const PageBodyPage    = lazy_page(() => import('./pages/templates/PageBodyPage'))
const MobileFabPage   = lazy_page(() => import('./pages/templates/MobileFabPage'))
const TabBarPage      = lazy_page(() => import('./pages/templates/TabBarPage'))

// Technocracy Dark Admin OS
const TechnocracyDashboardPage = lazy_page(() => import('./pages/technocracy/TechnocracyDashboardPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'installation', Component: InstallationPage },
      // Introduction + Getting Started merged into "Get Started" at /
      { path: 'getting-started', element: <Navigate to="/" replace /> },

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
      { path: 'components/input',    element: <Navigate to="/atoms/form-elements/text-input"       replace /> },
      { path: 'components/checkbox', element: <Navigate to="/atoms/form-elements/checkbox"    replace /> },
      { path: 'components/switch',   element: <Navigate to="/atoms/form-elements/toggle"      replace /> },
      { path: 'components/avatar',   element: <Navigate to="/atoms/avatar"      replace /> },
      { path: 'components/badge',    element: <Navigate to="/atoms/badge"       replace /> },
      { path: 'components/alert',    element: <Navigate to="/molecules/alert"   replace /> },
      { path: 'components/card',     element: <Navigate to="/molecules/card"    replace /> },
      { path: 'components/select',   element: <Navigate to="/atoms/form-elements/dropdown"  replace /> },
      { path: 'components/tabs',     element: <Navigate to="/molecules/tabs"    replace /> },
      { path: 'components/tooltip',  element: <Navigate to="/molecules/tooltip" replace /> },
      { path: 'components/modal',    element: <Navigate to="/organisms/dialog"  replace /> },

      // Legacy direct paths → redirect to nested form elements paths
      { path: 'atoms/input',         element: <Navigate to="/atoms/form-elements/text-input" replace /> },
      { path: 'atoms/textarea',      element: <Navigate to="/atoms/form-elements/textarea-input" replace /> },
      { path: 'atoms/checkbox',      element: <Navigate to="/atoms/form-elements/checkbox" replace /> },
      { path: 'atoms/radio-group',   element: <Navigate to="/atoms/form-elements/radio" replace /> },
      { path: 'atoms/switch',        element: <Navigate to="/atoms/form-elements/toggle" replace /> },
      { path: 'atoms/toggle',        element: <Navigate to="/atoms/form-elements/toggle" replace /> },
      { path: 'atoms/slider',        element: <Navigate to="/atoms/form-elements/drag-slider" replace /> },
      { path: 'molecules/select',    element: <Navigate to="/atoms/form-elements/dropdown" replace /> },
      { path: 'organisms/calendar',  element: <Navigate to="/atoms/form-elements/calendar" replace /> },

      // Atoms
      { path: 'atoms/button',                  Component: ButtonPage },
      { path: 'atoms/button/screen-footer',    element: <Navigate to="/atoms/button" replace /> },
      { path: 'atoms/avatar',                  Component: AvatarPage },
      { path: 'atoms/avatar/student-avatar',   element: <Navigate to="/atoms/avatar" replace /> },
      { path: 'atoms/badge',                   Component: BadgePage },
      { path: 'atoms/label',                   Component: LabelPage },
      { path: 'atoms/separator',               Component: SeparatorPage },
      { path: 'atoms/progress',                Component: ProgressPage },
      { path: 'atoms/skeleton',                Component: SkeletonPage },
      { path: 'atoms/spinner',                 Component: SpinnerPage },
      { path: 'atoms/amount-visibility-toggle', Component: AmountVisibilityTogglePage },

      // Form Elements under Atoms
      { path: 'atoms/form-elements/text-input',       Component: TextInputPage },
      { path: 'atoms/form-elements/textarea-input',   Component: TextareaInputPage },
      { path: 'atoms/form-elements/radio',            Component: RadioPage },
      { path: 'atoms/form-elements/checkbox',         Component: CheckboxPage },
      { path: 'atoms/form-elements/dropdown',         Component: DropdownPage },
      { path: 'atoms/form-elements/searchbar',        Component: SearchbarPage },
      { path: 'atoms/form-elements/toggle',           Component: TogglePage },
      { path: 'atoms/form-elements/calendar',         Component: CalendarPage },
      { path: 'atoms/form-elements/calendar/date-field', element: <Navigate to="/atoms/form-elements/calendar" replace /> },
      { path: 'atoms/form-elements/calendar/date-nav',   element: <Navigate to="/atoms/form-elements/calendar" replace /> },
      { path: 'atoms/form-elements/chip-multi-select', Component: ChipMultiSelectPage },
      { path: 'atoms/form-elements/drag-slider',      Component: DragSliderPage },
      { path: 'atoms/form-elements/list-elements',    Component: ListElementsPage },
      { path: 'atoms/form-elements/otp-input',        Component: OTPInputPage },
      { path: 'atoms/form-elements',                  element: <Navigate to="/atoms/form-elements/text-input" replace /> },

      // Molecules
      { path: 'molecules/alert',               Component: AlertPage },
      { path: 'molecules/card',                Component: CardPage },
      { path: 'molecules/card/payment-summary', element: <Navigate to="/molecules/card" replace /> },
      { path: 'molecules/empty-state',         Component: EmptyStatePage },
      { path: 'molecules/step-indicator',       Component: StepIndicatorPage },
      { path: 'molecules/delete-guard-sheet',   Component: DeleteGuardSheetPage },
      { path: 'molecules/whatsapp-controls',    Component: WhatsAppControlsPage },
      { path: 'molecules/photo-viewer',         Component: PhotoViewerPage },
      { path: 'molecules/form',          Component: FormPage },
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
      { path: 'molecules/header',        Component: HeaderPage },
      { path: 'molecules/bottom-nav',    Component: BottomNavPage },

      // Organisms
      { path: 'organisms/dialog',          Component: DialogPage },
      { path: 'organisms/sheet',           Component: SheetPage },
      { path: 'organisms/drawer',          Component: DrawerPage },
      { path: 'organisms/command',         Component: CommandPage },
      { path: 'organisms/table',           Component: TablePage },
      { path: 'organisms/carousel',        Component: CarouselPage },
      { path: 'organisms/sidebar',         Component: SidebarPage },
      { path: 'organisms/navigation-menu', Component: NavigationMenuPage },
      { path: 'organisms/menu-layouts',    Component: MenuLayoutsPage },

      // Legacy/Reclassified redirects
      { path: 'organisms/header',          element: <Navigate to="/molecules/header" replace /> },
      { path: 'organisms/bottom-nav',      element: <Navigate to="/molecules/bottom-nav" replace /> },

      // Templates
      { path: 'templates/stat-grid',    Component: StatGridPage },
      { path: 'templates/page-toolbar', Component: PageToolbarPage },
      { path: 'templates/data-section', Component: DataSectionPage },
      { path: 'templates/page-body',    Component: PageBodyPage },
      { path: 'templates/mobile-fab',   Component: MobileFabPage },
      { path: 'templates/tab-bar',      Component: TabBarPage },

      // Technocracy Dark Admin OS Showcase
      { path: 'technocracy',            Component: TechnocracyDashboardPage },

      { path: '*', Component: NotFoundPage },
    ],
  },
])
