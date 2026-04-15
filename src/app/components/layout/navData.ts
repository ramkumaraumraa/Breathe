export interface NavItem {
  label: string;
  path: string;
  badge?: string;
  description?: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Introduction', path: '/', description: 'What is Breathe design system' },
      { label: 'Getting Started', path: '/getting-started', description: 'Install and set up Breathe' },
    ],
  },
  {
    section: 'Foundations',
    items: [
      { label: 'Logos', path: '/foundations/logos', description: 'Brand logo sets and download assets' },
      { label: 'Colors', path: '/foundations/colors', description: 'Color palette and tokens' },
      { label: 'Design Tokens', path: '/foundations/design-tokens', description: 'Token architecture and product outputs' },
      { label: 'Typography', path: '/foundations/typography', description: 'Type scale and fonts' },
      { label: 'Spacing', path: '/foundations/spacing', description: 'Spacing scale and layout' },
      { label: 'Grid', path: '/foundations/grid', description: 'Responsive grid system' },
      { label: 'Elevation', path: '/foundations/elevation', description: 'Shadows and depth' },
      { label: 'Iconography', path: '/foundations/icons', description: 'Icon library and usage' },
      { label: 'Motion', path: '/foundations/motion', description: 'Animation tokens and patterns' },
    ],
  },
  {
    section: 'Components',
    items: [
      { label: 'Alert', path: '/components/alert', description: 'Feedback messages' },
      { label: 'Avatar', path: '/components/avatar', description: 'User representations' },
      { label: 'Badge', path: '/components/badge', description: 'Status indicators' },
      { label: 'Button', path: '/components/button', description: 'Action triggers' },
      { label: 'Card', path: '/components/card', description: 'Content containers' },
      { label: 'Checkbox', path: '/components/checkbox', description: 'Boolean selection' },
      { label: 'Input', path: '/components/input', description: 'Text entry fields' },
      { label: 'Modal', path: '/components/modal', description: 'Overlay dialogs' },
      { label: 'Select', path: '/components/select', description: 'Option dropdowns' },
      { label: 'Switch', path: '/components/switch', description: 'Toggle controls' },
      { label: 'Tabs', path: '/components/tabs', description: 'Content navigation' },
      { label: 'Tooltip', path: '/components/tooltip', description: 'Contextual hints' },
    ],
  },
];

export const allNavItems = navigation.flatMap(s => s.items);
