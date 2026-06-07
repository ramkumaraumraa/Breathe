export interface NavItem {
  label: string
  path: string
  badge?: string
  description?: string
  items?: NavItem[]
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
      { label: 'Colors',        path: '/foundations/colors',        description: 'Color palette and tokens' },
      { label: 'Design Tokens', path: '/foundations/design-tokens', description: 'Token architecture and product outputs' },
      { label: 'Elevation',     path: '/foundations/elevation',     description: 'Shadows and depth' },
      { label: 'Grid',          path: '/foundations/grid',          description: 'Responsive grid system' },
      { label: 'Iconography',   path: '/foundations/icons',         description: 'Icon library and usage' },
      { label: 'Logos',         path: '/foundations/logos',         description: 'Brand logo sets and download assets' },
      { label: 'Motion',        path: '/foundations/motion',        description: 'Animation tokens and patterns' },
      { label: 'Spacing',       path: '/foundations/spacing',       description: 'Spacing scale and layout' },
      { label: 'Typography',    path: '/foundations/typography',    description: 'Type scale and fonts' },
    ],
  },
  {
    section: 'Atoms',
    items: [
      { label: 'Avatar',      path: '/atoms/avatar',      description: 'User representations' },
      { label: 'Badge',       path: '/atoms/badge',       description: 'Status indicators' },
      { label: 'Button',      path: '/atoms/button',      description: 'Action triggers' },
      {
        label: 'Form Elements',
        path: '/atoms/form-elements',
        description: 'Inputs, dropdowns, calendars, and sliders',
        items: [
          { label: 'Calendar',         path: '/atoms/form-elements/calendar',         description: 'Date and time selector' },
          { label: 'Checkbox',         path: '/atoms/form-elements/checkbox',         description: 'Boolean selection' },
          { label: 'Drag Slider',      path: '/atoms/form-elements/drag-slider',      description: 'Touch and drag value selector 0-50' },
          { label: 'Dropdown',         path: '/atoms/form-elements/dropdown',         description: 'Option dropdowns' },
          { label: 'List Elements',    path: '/atoms/form-elements/list-elements',    description: 'Bullet, numbered, and action list items' },
          { label: 'Radio',            path: '/atoms/form-elements/radio',            description: 'Single-choice selection' },
          { label: 'Searchbar',        path: '/atoms/form-elements/searchbar',        description: 'Interactive searchbar with autocomplete suggestions' },
          { label: 'Text Input',       path: '/atoms/form-elements/text-input',       description: 'Text entry fields' },
          { label: 'Textarea Input',   path: '/atoms/form-elements/textarea-input',   description: 'Multi-line text entry' },
          { label: 'OTP Input',        path: '/atoms/form-elements/otp-input',        description: 'One-time password digit slots' },
          { label: 'Toggle (Switch)',  path: '/atoms/form-elements/toggle',           description: 'Binary switch controls' },
        ]
      },
      { label: 'Label',       path: '/atoms/label',       description: 'Accessible form labels' },
      { label: 'Progress',    path: '/atoms/progress',    description: 'Completion indicators' },
      { label: 'Separator',   path: '/atoms/separator',   description: 'Visual dividers' },
      { label: 'Skeleton',    path: '/atoms/skeleton',    description: 'Loading placeholders' },
      { label: 'Spinner',     path: '/atoms/spinner',     description: 'Animated loading indicator' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Accordion',     path: '/molecules/accordion',     description: 'Collapsible content sections' },
      { label: 'Alert',         path: '/molecules/alert',         description: 'Feedback messages' },
      { label: 'Breadcrumb',    path: '/molecules/breadcrumb',    description: 'Navigational hierarchy' },
      { label: 'Card',          path: '/molecules/card',          description: 'Content containers' },
      { label: 'Collapsible',   path: '/molecules/collapsible',   description: 'Single toggle section' },
      { label: 'Dropdown Menu', path: '/molecules/dropdown-menu', description: 'Contextual action menus' },
      { label: 'Form',          path: '/molecules/form',          description: 'Input collection patterns' },
      { label: 'Hover Card',    path: '/molecules/hover-card',    description: 'Rich hover preview' },
      { label: 'Pagination',    path: '/molecules/pagination',    description: 'Multi-page navigation' },
      { label: 'Scroll Area',   path: '/molecules/scroll-area',   description: 'Custom scrollable containers' },
      { label: 'Sonner',        path: '/molecules/sonner',        description: 'Toast notifications' },
      { label: 'Tabs',          path: '/molecules/tabs',          description: 'Content navigation' },
      { label: 'Tooltip',       path: '/molecules/tooltip',       description: 'Contextual hints' },
    ],
  },
  {
    section: 'Organisms',
    items: [
      { label: 'Carousel',         path: '/organisms/carousel',         description: 'Scrollable item series' },
      { label: 'Command',          path: '/organisms/command',          description: 'Command palette' },
      { label: 'Dialog',           path: '/organisms/dialog',           description: 'Overlay dialogs' },
      { label: 'Drawer',           path: '/organisms/drawer',           description: 'Bottom sheet for mobile' },
      { label: 'Header',           path: '/organisms/header',           description: 'App top bar with logo, bell and user chip' },
      { label: 'Bottom Nav',       path: '/organisms/bottom-nav',       description: 'Fixed 5-tab mobile and tablet navigation bar' },
      { label: 'Navigation Menu',  path: '/organisms/navigation-menu',  description: 'Horizontal nav with dropdowns' },
      { label: 'Sheet',            path: '/organisms/sheet',            description: 'Side panel overlay' },
      { label: 'Sidebar',          path: '/organisms/sidebar',          description: 'Primary nav structure' },
      { label: 'Table',            path: '/organisms/table',            description: 'Structured data display' },
    ],
  },
  {
    section: 'Templates',
    items: [
      { label: 'Data Section', path: '/templates/data-section', description: 'Bordered data container' },
      { label: 'Mobile FAB',   path: '/templates/mobile-fab',   description: 'Fixed floating action button' },
      { label: 'Page Body',    path: '/templates/page-body',    description: 'Content inset wrapper' },
      { label: 'Page Toolbar', path: '/templates/page-toolbar', description: 'Left/right slot toolbar' },
      { label: 'Stat Grid',    path: '/templates/stat-grid',    description: 'Responsive stat card grid' },
      { label: 'Tab Bar',      path: '/templates/tab-bar',      description: 'Pill-style tab switcher' },
    ],
  },
]

export const allNavItems = navigation.flatMap(s => {
  return s.items.flatMap(item => {
    if (item.items) {
      return [item, ...item.items]
    }
    return [item]
  })
})
