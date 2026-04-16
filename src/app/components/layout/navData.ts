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
      { label: 'Button',   path: '/atoms/button',   description: 'Action triggers' },
      { label: 'Input',    path: '/atoms/input',    description: 'Text entry fields' },
      { label: 'Checkbox', path: '/atoms/checkbox', description: 'Boolean selection' },
      { label: 'Switch',   path: '/atoms/switch',   description: 'Toggle controls' },
      { label: 'Avatar',   path: '/atoms/avatar',   description: 'User representations' },
      { label: 'Badge',    path: '/atoms/badge',    description: 'Status indicators' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Alert',   path: '/molecules/alert',   description: 'Feedback messages' },
      { label: 'Card',    path: '/molecules/card',    description: 'Content containers' },
      { label: 'Select',  path: '/molecules/select',  description: 'Option dropdowns' },
      { label: 'Tabs',    path: '/molecules/tabs',    description: 'Content navigation' },
      { label: 'Tooltip', path: '/molecules/tooltip', description: 'Contextual hints' },
    ],
  },
  {
    section: 'Organisms',
    items: [
      { label: 'Dialog', path: '/organisms/dialog', description: 'Overlay dialogs' },
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
