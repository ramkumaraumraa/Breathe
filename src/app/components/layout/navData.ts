export interface NavItem {
  label: string
  path: string
  badge?: string
  description?: string
}

export interface NavSection {
  section: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Introduction',    path: '/',                description: 'What is Breathe design system' },
      { label: 'Getting Started', path: '/getting-started', description: 'Install and set up Breathe' },
    ],
  },
  {
    section: 'Foundations',
    items: [
      { label: 'Logos',         path: '/foundations/logos',         description: 'Brand logo sets and download assets' },
      { label: 'Colors',        path: '/foundations/colors',        description: 'Color palette and tokens' },
      { label: 'Design Tokens', path: '/foundations/design-tokens', description: 'Token architecture and product outputs' },
      { label: 'Typography',    path: '/foundations/typography',    description: 'Type scale and fonts' },
      { label: 'Spacing',       path: '/foundations/spacing',       description: 'Spacing scale and layout' },
      { label: 'Grid',          path: '/foundations/grid',          description: 'Responsive grid system' },
      { label: 'Elevation',     path: '/foundations/elevation',     description: 'Shadows and depth' },
      { label: 'Iconography',   path: '/foundations/icons',         description: 'Icon library and usage' },
      { label: 'Motion',        path: '/foundations/motion',        description: 'Animation tokens and patterns' },
    ],
  },
  {
    section: 'Atoms',
    items: [
      { label: 'Button',      path: '/atoms/button',      description: 'Action triggers' },
      { label: 'Input',       path: '/atoms/input',       description: 'Text entry fields' },
      { label: 'Textarea',    path: '/atoms/textarea',    description: 'Multi-line text entry' },
      { label: 'Checkbox',    path: '/atoms/checkbox',    description: 'Boolean selection' },
      { label: 'Radio Group', path: '/atoms/radio-group', description: 'Single-choice selection' },
      { label: 'Switch',      path: '/atoms/switch',      description: 'Toggle controls' },
      { label: 'Toggle',      path: '/atoms/toggle',      description: 'Pressed-state button' },
      { label: 'Slider',      path: '/atoms/slider',      description: 'Range value input' },
      { label: 'Avatar',      path: '/atoms/avatar',      description: 'User representations' },
      { label: 'Badge',       path: '/atoms/badge',       description: 'Status indicators' },
      { label: 'Label',       path: '/atoms/label',       description: 'Accessible form labels' },
      { label: 'Separator',   path: '/atoms/separator',   description: 'Visual dividers' },
      { label: 'Progress',    path: '/atoms/progress',    description: 'Completion indicators' },
      { label: 'Skeleton',    path: '/atoms/skeleton',    description: 'Loading placeholders' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Alert',         path: '/molecules/alert',         description: 'Feedback messages' },
      { label: 'Card',          path: '/molecules/card',          description: 'Content containers' },
      { label: 'Form',          path: '/molecules/form',          description: 'Input collection patterns' },
      { label: 'Select',        path: '/molecules/select',        description: 'Option dropdowns' },
      { label: 'Dropdown Menu', path: '/molecules/dropdown-menu', description: 'Contextual action menus' },
      { label: 'Tabs',          path: '/molecules/tabs',          description: 'Content navigation' },
      { label: 'Accordion',     path: '/molecules/accordion',     description: 'Collapsible content sections' },
      { label: 'Collapsible',   path: '/molecules/collapsible',   description: 'Single toggle section' },
      { label: 'Tooltip',       path: '/molecules/tooltip',       description: 'Contextual hints' },
      { label: 'Hover Card',    path: '/molecules/hover-card',    description: 'Rich hover preview' },
      { label: 'Breadcrumb',    path: '/molecules/breadcrumb',    description: 'Navigational hierarchy' },
      { label: 'Pagination',    path: '/molecules/pagination',    description: 'Multi-page navigation' },
      { label: 'Scroll Area',   path: '/molecules/scroll-area',   description: 'Custom scrollable containers' },
      { label: 'Sonner',        path: '/molecules/sonner',        description: 'Toast notifications' },
    ],
  },
  {
    section: 'Organisms',
    items: [
      { label: 'Dialog',           path: '/organisms/dialog',           description: 'Overlay dialogs' },
      { label: 'Sheet',            path: '/organisms/sheet',            description: 'Side panel overlay' },
      { label: 'Drawer',           path: '/organisms/drawer',           description: 'Bottom sheet for mobile' },
      { label: 'Command',          path: '/organisms/command',          description: 'Command palette' },
      { label: 'Table',            path: '/organisms/table',            description: 'Structured data display' },
      { label: 'Calendar',         path: '/organisms/calendar',         description: 'Date and range picker' },
      { label: 'Carousel',         path: '/organisms/carousel',         description: 'Scrollable item series' },
      { label: 'Sidebar',          path: '/organisms/sidebar',          description: 'Primary nav structure' },
      { label: 'Navigation Menu',  path: '/organisms/navigation-menu',  description: 'Horizontal nav with dropdowns' },
    ],
  },
  {
    section: 'Templates',
    items: [
      { label: 'Stat Grid',    path: '/templates/stat-grid',    description: 'Responsive stat card grid' },
      { label: 'Page Toolbar', path: '/templates/page-toolbar', description: 'Left/right slot toolbar' },
      { label: 'Data Section', path: '/templates/data-section', description: 'Bordered data container' },
      { label: 'Page Body',    path: '/templates/page-body',    description: 'Content inset wrapper' },
      { label: 'Mobile FAB',   path: '/templates/mobile-fab',   description: 'Fixed floating action button' },
      { label: 'Tab Bar',      path: '/templates/tab-bar',      description: 'Pill-style tab switcher' },
    ],
  },
]

export const allNavItems = navigation.flatMap(s => s.items)
