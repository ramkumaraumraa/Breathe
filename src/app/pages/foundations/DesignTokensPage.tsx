import { useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageHeader } from '../../components/shared/PageHeader';
import { PageNavigation } from '../../components/shared/PageNavigation';

type TokenRow = {
  name: string;
  token: string;
  value: string;
  role?: string;
};

type Product = {
  id: string;
  label: string;
  prefix: string;
  description: string;
  surface: 'light' | 'dark';
  platforms: string[];
  colors: TokenRow[];
  typography: TokenRow[];
  radius: TokenRow[];
  icons: TokenRow[];
};

const products: Product[] = [
  {
    id: 'lemniscate',
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS with light surfaces, dark-blue primary actions, and sky-blue support accents.',
    surface: 'light',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary', token: '--lmns-color-primary', value: '#1C60C1', role: 'Buttons, links, selected states' },
      { name: 'Primary Light', token: '--lmns-color-primary-light', value: '#ADC6E9', role: 'Hover states, tints' },
      { name: 'Primary Dark', token: '--lmns-color-primary-dark', value: '#1B4A8D', role: 'Active states, borders' },
      { name: 'Secondary', token: '--lmns-color-secondary', value: '#40AAD4', role: 'Secondary accents, highlights' },
      { name: 'Tertiary', token: '--lmns-color-tertiary', value: '#ED651C', role: 'Accent, highlights' },
      { name: 'Positive', token: '--lmns-color-positive', value: '#16A34A', role: 'Success states' },
      { name: 'Negative', token: '--lmns-color-negative', value: '#DC2626', role: 'Errors, destructive' },
      { name: 'Background', token: '--lmns-color-background', value: '#FFFFFF', role: 'Page surface' },
      { name: 'Background Secondary', token: '--lmns-color-background-secondary', value: '#F9FAFB', role: 'Cards, sidebars' },
      { name: 'Foreground', token: '--lmns-color-foreground', value: '#2E3033', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--lmns-color-foreground-secondary', value: '#57595B', role: 'Captions, metadata' },
      { name: 'Border', token: '--lmns-color-border', value: '#E5E7EB', role: 'Inputs, dividers' },
      { name: 'Gradient Start', token: '--lmns-color-gradient-start', value: '#1C60C1', role: 'Brand gradient start' },
      { name: 'Gradient End', token: '--lmns-color-gradient-end', value: '#40AAD4', role: 'Brand gradient end' },
    ],
    typography: [
      { name: 'Base size', token: '--lmns-font-size-base', value: '16px' },
      { name: 'Body weight', token: '--lmns-font-weight-body', value: '400' },
      { name: 'Heading weight', token: '--lmns-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--lmns-radius-default', value: '10px' },
      { name: 'Small', token: '--lmns-radius-sm', value: '8px' },
      { name: 'Large', token: '--lmns-radius-lg', value: '16px' },
      { name: 'Pill', token: '--lmns-radius-pill', value: '9999px' },
    ],
    icons: [
      { name: 'XS', token: '--lmns-icon-xs', value: '12px' },
      { name: 'SM', token: '--lmns-icon-sm', value: '16px' },
      { name: 'MD', token: '--lmns-icon-md', value: '20px' },
      { name: 'LG', token: '--lmns-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'technocracy',
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Dense admin dashboard with dark surfaces and the same shared base palette.',
    surface: 'dark',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary', token: '--thcy-color-primary', value: '#40AAD4', role: 'Interactive elements' },
      { name: 'Primary Light', token: '--thcy-color-primary-light', value: '#6EC6E6', role: 'Hover states' },
      { name: 'Secondary', token: '--thcy-color-secondary', value: '#1C60C1', role: 'Secondary actions' },
      { name: 'Tertiary', token: '--thcy-color-tertiary', value: '#E07722', role: 'Accent highlights' },
      { name: 'Positive', token: '--thcy-color-positive', value: '#00D06D', role: 'Success states' },
      { name: 'Negative', token: '--thcy-color-negative', value: '#E11D2A', role: 'Errors, destructive' },
      { name: 'Background', token: '--thcy-color-background', value: '#111827', role: 'App shell surface' },
      { name: 'Background Secondary', token: '--thcy-color-background-secondary', value: '#1F2937', role: 'Panels and cards' },
      { name: 'Sidebar', token: '--thcy-color-sidebar', value: '#111827', role: 'Navigation column' },
      { name: 'Foreground', token: '--thcy-color-foreground', value: '#F9FAFB', role: 'Text on dark' },
      { name: 'Foreground Secondary', token: '--thcy-color-foreground-secondary', value: '#9CA3AF', role: 'Metadata' },
      { name: 'Border', token: '--thcy-color-border', value: '#374151', role: 'Dividers' },
    ],
    typography: [
      { name: 'Base size', token: '--thcy-font-size-base', value: '14px' },
      { name: 'Body weight', token: '--thcy-font-weight-body', value: '400' },
      { name: 'Heading weight', token: '--thcy-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--thcy-radius-default', value: '8px' },
      { name: 'Small', token: '--thcy-radius-sm', value: '4px' },
      { name: 'Large', token: '--thcy-radius-lg', value: '10px' },
    ],
    icons: [
      { name: 'SM', token: '--thcy-icon-sm', value: '16px' },
      { name: 'MD', token: '--thcy-icon-md', value: '20px' },
      { name: 'LG', token: '--thcy-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'aumraa',
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand layer for the marketing site and outward-facing communications.',
    surface: 'light',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary',        token: '--amra-color-primary',        value: '#2F9E44', role: 'Forest green — buttons, headings, primary actions' },
      { name: 'Secondary',      token: '--amra-color-secondary',      value: '#CFCF2A', role: 'Yellow-green — energy, accent highlights' },
      { name: 'Tertiary',       token: '--amra-color-tertiary',       value: '#2F6FED', role: 'Blue — digital accent, links' },
      { name: 'Positive',       token: '--amra-color-positive',       value: '#00D06D', role: 'Bright green — success, positive states' },
      { name: 'Negative',       token: '--amra-color-negative',       value: '#E11D2A', role: 'Red — errors, destructive' },
      { name: 'Alert',          token: '--amra-color-accent',         value: '#F59E0B', role: 'Amber — warnings, calls to action' },
      { name: 'Background',     token: '--amra-color-background',     value: '#ffffff', role: 'Page surface' },
      { name: 'Foreground',     token: '--amra-color-foreground',     value: '#002100', role: 'Deep forest black — primary text' },
      { name: 'Gradient Start', token: '--amra-color-gradient-start', value: '#4ADE80', role: 'Brand gradient light end' },
      { name: 'Gradient End',   token: '--amra-color-gradient-end',   value: '#15803D', role: 'Brand gradient dark end' },
    ],
    typography: [
      { name: 'Typeface',        token: '--amra-font-family',          value: 'Source Sans 3' },
      { name: 'Base size',       token: '--amra-font-size-base',       value: '16px' },
      { name: 'Body weight',     token: '--amra-font-weight-body',     value: '400' },
      { name: 'Heading weight',  token: '--amra-font-weight-heading',  value: '700 (H1–H2)' },
      { name: 'Subhead weight',  token: '--amra-font-weight-subhead',  value: '600 (H3–H6)' },
    ],
    radius: [],
    icons: [{ name: 'MD', token: '--amra-icon-md', value: '20px' }],
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    prefix: 'ykai',
    description: 'Health and wellness — mobile, watch, and app widgets',
    surface: 'light',
    platforms: ['React Native', 'iOS Swift', 'Android XML', 'watchOS', 'iOS WidgetKit', 'Android Glance'],
    colors: [
      { name: 'Primary', token: '--ykai-color-primary', value: '#40AAD4', role: 'Placeholder until kickoff' },
      { name: 'Primary Light', token: '--ykai-color-primary-light', value: '#6EC6E6', role: 'Hover states' },
      { name: 'Secondary', token: '--ykai-color-secondary', value: '#E07722', role: 'Energy, highlights' },
      { name: 'Tertiary', token: '--ykai-color-tertiary', value: '#2F6FED', role: 'Digital accent' },
      { name: 'Positive', token: '--ykai-color-positive', value: '#00D06D', role: 'Success states' },
      { name: 'Negative', token: '--ykai-color-negative', value: '#E11D2A', role: 'Errors' },
      { name: 'Background', token: '--ykai-color-background', value: '#FFFFFF', role: 'Placeholder surface' },
      { name: 'Foreground', token: '--ykai-color-foreground', value: '#111827', role: 'Placeholder text' },
    ],
    typography: [{ name: 'Base size', token: '--ykai-font-size-base', value: '14px' }],
    radius: [],
    icons: [
      { name: 'SM', token: '--ykai-icon-sm', value: '16px' },
      { name: 'MD', token: '--ykai-icon-md', value: '20px' },
    ],
  },
  {
    id: 'maligai',
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery and retail management — mobile primary, web secondary',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--mlgm-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Primary Light',        token: '--mlgm-color-primary-light',        value: '#6EC6E6', role: 'Hover states' },
      { name: 'Secondary',            token: '--mlgm-color-secondary',            value: '#E07722', role: 'Energy, highlights' },
      { name: 'Tertiary',             token: '--mlgm-color-tertiary',             value: '#2F6FED', role: 'Digital accent' },
      { name: 'Positive',             token: '--mlgm-color-positive',             value: '#00D06D', role: 'Success states' },
      { name: 'Negative',             token: '--mlgm-color-negative',             value: '#E11D2A', role: 'Errors' },
      { name: 'Background',           token: '--mlgm-color-background',           value: '#ffffff', role: 'Page / screen surface' },
      { name: 'Background Secondary', token: '--mlgm-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--mlgm-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--mlgm-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--mlgm-color-border',               value: '#E5E7EB', role: 'Dividers' },
    ],
    typography: [
      { name: 'Base size',      token: '--mlgm-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--mlgm-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--mlgm-font-weight-heading', value: '600 (mobile readability)' },
    ],
    radius: [
      { name: 'Default', token: '--mlgm-radius-default', value: '16px (mobile-native)' },
      { name: 'Small',   token: '--mlgm-radius-sm',      value: '8px' },
      { name: 'Pill',    token: '--mlgm-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--mlgm-icon-sm', value: '16px' },
      { name: 'MD', token: '--mlgm-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--mlgm-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'ulagellam',
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app — React Native, iOS, Android',
    platforms: ['React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--ulge-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Primary Light',        token: '--ulge-color-primary-light',        value: '#6EC6E6', role: 'Hover states' },
      { name: 'Secondary',            token: '--ulge-color-secondary',            value: '#E07722', role: 'Energy, highlights' },
      { name: 'Tertiary',             token: '--ulge-color-tertiary',             value: '#2F6FED', role: 'Digital accent' },
      { name: 'Positive',             token: '--ulge-color-positive',             value: '#00D06D', role: 'Success states' },
      { name: 'Negative',             token: '--ulge-color-negative',             value: '#E11D2A', role: 'Errors' },
      { name: 'Background',           token: '--ulge-color-background',           value: '#ffffff', role: 'Screen surface' },
      { name: 'Background Secondary', token: '--ulge-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--ulge-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--ulge-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--ulge-color-border',               value: '#E5E7EB', role: 'Dividers' },
    ],
    typography: [
      { name: 'Base size',      token: '--ulge-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--ulge-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--ulge-font-weight-heading', value: '600' },
    ],
    radius: [
      { name: 'Default', token: '--ulge-radius-default', value: '16px' },
      { name: 'Small',   token: '--ulge-radius-sm',      value: '8px' },
      { name: 'Pill',    token: '--ulge-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--ulge-icon-sm', value: '16px' },
      { name: 'MD', token: '--ulge-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--ulge-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'kaayo',
    label: 'Kaayo',
    prefix: 'kayo',
    description: 'Tutor & class operations — mobile-first, Neo-Brutalist. Crimson primary, Warm Peach secondary, Deep Navy tertiary.',
    surface: 'light' as const,
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    colors: [
      { name: 'Primary',              token: '--kayo-color-primary',              value: '#970103', role: 'Tutor Crimson — buttons, brand presence, primary actions' },
      { name: 'Primary Light',        token: '--kayo-color-primary-light',        value: '#E14144', role: 'Hover states, tinted highlights' },
      { name: 'Primary Dark',         token: '--kayo-color-primary-dark',         value: '#570001', role: 'Active states, pressed borders' },
      { name: 'Secondary',            token: '--kayo-color-secondary',            value: '#FDA581', role: 'Warm Peach — energy, community warmth' },
      { name: 'Tertiary',             token: '--kayo-color-tertiary',             value: '#37415C', role: 'Deep Navy — admin, tracking elements' },
      { name: 'Positive',             token: '--kayo-color-positive',             value: '#15803D', role: 'Success, paid states' },
      { name: 'Negative',             token: '--kayo-color-negative',             value: '#A81818', role: 'Errors, overdue, destructive' },
      { name: 'Warning',              token: '--kayo-color-warning',              value: '#B86508', role: 'Partial payment, pending' },
      { name: 'Background',           token: '--kayo-color-background',           value: '#FFFFFF', role: 'Screen surface' },
      { name: 'Background Secondary', token: '--kayo-color-background-secondary', value: '#F8F8F9', role: 'Cards, raised surfaces' },
      { name: 'Foreground',           token: '--kayo-color-foreground',           value: '#191B1F', role: 'Primary text' },
      { name: 'Foreground Secondary', token: '--kayo-color-foreground-secondary', value: '#2E3033', role: 'Secondary text, captions' },
      { name: 'Border',               token: '--kayo-color-border',               value: '#191B1F', role: 'Hard brutalist borders' },
      { name: 'Gradient Start',       token: '--kayo-color-gradient-start',       value: '#970103', role: 'Tutor Collection gradient start' },
      { name: 'Gradient End',         token: '--kayo-color-gradient-end',         value: '#FDA581', role: 'Tutor Collection gradient end' },
    ],
    typography: [
      { name: 'Typeface',       token: '--kayo-font-family',         value: 'DM Sans' },
      { name: 'Base size',      token: '--kayo-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--kayo-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--kayo-font-weight-heading', value: '700 (Neo-Brutalist bold)' },
    ],
    radius: [
      { name: 'Default', token: '--kayo-radius-default', value: '8px (Neo-Brutalist — no rounding >12)' },
      { name: 'Small',   token: '--kayo-radius-sm',      value: '4px' },
      { name: 'Pill',    token: '--kayo-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--kayo-icon-sm', value: '16px' },
      { name: 'MD', token: '--kayo-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--kayo-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'ilakh',
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web and mobile — mobile-first approach',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--ilkh-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Primary Light',        token: '--ilkh-color-primary-light',        value: '#6EC6E6', role: 'Hover states' },
      { name: 'Secondary',            token: '--ilkh-color-secondary',            value: '#E07722', role: 'Energy, highlights' },
      { name: 'Tertiary',             token: '--ilkh-color-tertiary',             value: '#2F6FED', role: 'Digital accent' },
      { name: 'Positive',             token: '--ilkh-color-positive',             value: '#00D06D', role: 'Success states' },
      { name: 'Negative',             token: '--ilkh-color-negative',             value: '#E11D2A', role: 'Errors' },
      { name: 'Background',           token: '--ilkh-color-background',           value: '#ffffff', role: 'Page / screen surface' },
      { name: 'Background Secondary', token: '--ilkh-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--ilkh-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--ilkh-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--ilkh-color-border',               value: '#E5E7EB', role: 'Dividers' },
    ],
    typography: [
      { name: 'Base size',      token: '--ilkh-font-size-base',      value: '16px (mobile-first)' },
      { name: 'Body weight',    token: '--ilkh-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--ilkh-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--ilkh-radius-default', value: '10px' },
      { name: 'Small',   token: '--ilkh-radius-sm',      value: '8px' },
      { name: 'Large',   token: '--ilkh-radius-lg',      value: '16px' },
      { name: 'Pill',    token: '--ilkh-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--ilkh-icon-sm', value: '16px' },
      { name: 'MD', token: '--ilkh-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--ilkh-icon-lg', value: '24px' },
    ],
  },
];

const platformMatrix = [
  { product: 'Aumraa',          web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Technocracy',     web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Lemniscate',      web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Maligai Manager', web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Ulagellam',       web: false, rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Kaayo',          web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Ilakh',           web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Yakaizen',        web: false, rn: true,  ios: true,  android: true,  watch: true,  widgets: true  },
];

function TokenBadge({ token }: { token: string }) {
  return (
    <code
      className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}
    >
      {token}
    </code>
  );
}

function Swatch({ color }: { color: string }) {
  return <div className="h-6 w-6 rounded-md border border-slate-200 dark:border-slate-700" style={{ backgroundColor: color }} />;
}

function StatusCell({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 ${active ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}
      style={{ minWidth: '2.75rem', fontSize: '0.72rem', fontWeight: 600 }}
    >
      {active ? 'Yes' : 'No'}
    </span>
  );
}

function TokenTable({
  rows,
  showSwatch = false,
  showRole = false,
}: {
  rows: TokenRow[];
  showSwatch?: boolean;
  showRole?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/70">
            {showSwatch && (
              <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Sample
              </th>
            )}
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Name
            </th>
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Token
            </th>
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Value
            </th>
            {showRole && (
              <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Role
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.token} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/60 dark:bg-slate-900/40'}>
              {showSwatch && (
                <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                  <Swatch color={row.value} />
                </td>
              )}
              <td className="border-t border-slate-100 px-4 py-3 text-slate-900 dark:text-slate-100 dark:border-slate-800" style={{ fontWeight: 600 }}>
                {row.name}
              </td>
              <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                <TokenBadge token={row.token} />
              </td>
              <td className="border-t border-slate-100 px-4 py-3 text-slate-500 dark:text-slate-400 dark:border-slate-800" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                {row.value}
              </td>
              {showRole && (
                <td className="border-t border-slate-100 px-4 py-3 text-slate-500 dark:text-slate-400 dark:border-slate-800" style={{ fontSize: '0.82rem' }}>
                  {row.role}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type UlagellamSubTab = 'kaayo' | 'ilakh' | 'ulagellam';

const ULAGELLAM_SUBS: { id: UlagellamSubTab; label: string; accent: string }[] = [
  { id: 'kaayo',     label: '🎓 Kaayo (Tutor Ops)',   accent: '#970103' },
  { id: 'ilakh',     label: '📈 Ilakh (Finance)',      accent: '#0369A1' },
  { id: 'ulagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED' },
];

function UlagellamTokenTabs({ products }: { products: Product[] }) {
  const [subTab, setSubTab] = useState<UlagellamSubTab>('kaayo');
  const product = products.find(p => p.id === subTab) ?? products.find(p => p.id === 'ulagellam')!;
  const isPlaceholderProduct = (id: string) => ['maligai', 'ulagellam', 'ilakh', 'yakaizen', 'kaayo'].includes(id);

  return (
    <div className="mt-0 space-y-8">
      <div className="flex gap-2 flex-wrap">
        {ULAGELLAM_SUBS.map((sub) => {
          const isActive = subTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSubTab(sub.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${
                isActive ? 'text-white' : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              style={{
                borderColor: isActive ? sub.accent : undefined,
                backgroundColor: isActive ? sub.accent : undefined,
              }}
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="m-0 text-slate-900 dark:text-slate-100" style={{ fontWeight: 700, fontSize: '1rem' }}>
            {product.label}
          </p>
          <p className="m-0 mt-2 max-w-2xl text-slate-500 dark:text-slate-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
            {product.description}
          </p>
          {isPlaceholderProduct(product.id) && (
            <Badge variant="outline" className="mt-3 text-amber-600 border-amber-300">
              Pending design kickoff — token values are placeholders
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {product.platforms.map(p => (
            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
          ))}
        </div>
      </div>

      {product.colors.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Colors</h3>
          <TokenTable rows={product.colors} showSwatch showRole />
        </div>
      )}
      {product.typography.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Typography</h3>
          <TokenTable rows={product.typography} />
        </div>
      )}
      {product.radius.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Radius</h3>
          <TokenTable rows={product.radius} />
        </div>
      )}
      {product.icons.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Icons</h3>
          <TokenTable rows={product.icons} />
        </div>
      )}
    </div>
  );
}

export function DesignTokensPage() {
  return (
    <div className="max-w-7xl px-6 py-10 lg:px-10">
      <PageHeader
        title="Design Tokens"
        description="Breathe stores every shared design decision in JSON, then distributes those tokens automatically to product-specific outputs for web, mobile, iOS, and Android."
        section="Foundations"
        badge="Style Dictionary"
        badgeColor="indigo"
      />

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            How the architecture works
          </h2>
          <p className="m-0 max-w-3xl text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            The system is intentionally split into two layers. Global tokens describe what a value is. Product tokens describe what that value does in a specific product. Components only consume the stable shadcn bridge.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {[
            {
              title: '1. Global Palette',
              subtitle: 'Raw values',
              body: 'Examples: --color-blue-400, --radius-lg, --font-size-base. These are reusable and product-agnostic.',
            },
            {
              title: '2. Product Aliases',
              subtitle: 'Semantic meaning',
              body: 'Examples: --lmns-color-primary, --tech-color-background. Products map the shared palette into business meaning.',
            },
            {
              title: '3. shadcn Bridge',
              subtitle: 'Stable interface',
              body: 'Examples: --primary, --background, --radius. Components read this layer so product swaps do not require component rewrites.',
            },
            {
              title: '4. Components',
              subtitle: 'Rendered UI',
              body: 'Buttons, cards, sidebars, and charts resolve the bridge variables at runtime and inherit the active product theme.',
            },
          ].map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="outline">{step.subtitle}</Badge>
                {index < 3 && <span className="hidden text-slate-300 xl:block">→</span>}
              </div>
              <h3 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/30">
          <p className="m-0 text-amber-900 dark:text-amber-200" style={{ fontWeight: 700 }}>
            Cardinal rule
          </p>
          <p className="m-0 mt-2 text-amber-800 dark:text-amber-300" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
            Never hard-code brand colors or spacing in product code. Add or change the token in
            <code className="mx-1 rounded bg-white/70 px-1 py-0.5 dark:bg-slate-900/60">tokens/src/</code>
            and rebuild the outputs instead.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Product token reference
          </h2>
          <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
            Each product ships a prefixed token surface. The underlying palette is shared, but the semantics and platform outputs vary by product.
          </p>
        </div>

        {(() => {
          const isPlaceholder = (id: string) =>
            ['maligai', 'ulagellam', 'ilakh', 'yakaizen'].includes(id);

          return (
        <Tabs defaultValue="lemniscate">
          <TabsList className="mb-6 h-auto flex-wrap justify-start gap-2 rounded-xl bg-slate-100 p-2 dark:bg-slate-900">
            {products.filter(p => p.id !== 'kaayo' && p.id !== 'ilakh').map((p) => (
              <TabsTrigger key={p.id} value={p.id} className="flex items-center gap-2 rounded-lg px-4 py-2">
                {p.label}
                {isPlaceholder(p.id) && (
                  <Badge variant="outline" className="text-[10px] py-0 h-4 text-muted-foreground">
                    Pending kickoff
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent key="ulagellam" value="ulagellam" className="mt-0">
            <UlagellamTokenTabs products={products} />
          </TabsContent>

          {products.filter(p => p.id !== 'ulagellam' && p.id !== 'kaayo' && p.id !== 'ilakh').map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0 space-y-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="m-0 text-slate-900 dark:text-slate-100" style={{ fontWeight: 700, fontSize: '1rem' }}>
                    {product.label}
                  </p>
                  <p className="m-0 mt-2 max-w-2xl text-slate-500 dark:text-slate-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {product.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 dark:bg-slate-900 dark:text-slate-300" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  prefix: {product.prefix}--
                  <div className="mt-1 text-slate-400 dark:text-slate-500">surface: {product.surface}</div>
                </div>
              </div>

              <div>
                <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                  Colors
                </h3>
                <TokenTable rows={product.colors} showSwatch showRole />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Typography
                  </h3>
                  <TokenTable rows={product.typography} />
                </div>
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Icon Sizes
                  </h3>
                  <TokenTable rows={product.icons} />
                </div>
              </div>

              {product.radius.length > 0 && (
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Border Radius
                  </h3>
                  <TokenTable rows={product.radius} />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
          );
        })()}
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Platform availability
          </h2>
          <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
            One JSON source fans out to the right output format for each delivery surface. Web is live today. Yakaizen is scaffolded for future native work.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70">
                {['Product', 'Web CSS', 'React Native', 'iOS Swift', 'Android XML', 'watchOS', 'Widgets'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platformMatrix.map((row, index) => (
                <tr key={row.product} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/60 dark:bg-slate-900/40'}>
                  <td className="border-t border-slate-100 px-4 py-3 text-slate-900 dark:text-slate-100 dark:border-slate-800" style={{ fontWeight: 600 }}>
                    {row.product}
                  </td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.web} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.rn} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.ios} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.android} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.watch} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.widgets} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Using tokens in product apps
          </h2>
          <p className="m-0 max-w-3xl text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Apps import the generated CSS for their product, then bridge those product aliases into generic shadcn variables. Components should stay blissfully unaware of product prefixes.
          </p>
        </div>

        <div className="space-y-4">
          <CodeBlock
            language="css"
            filename="globals.css"
            code={`/* Step 1: import product tokens */
@import '@aumraa/breathe/tokens/dist/web/lemniscate.css';

/* Step 2: bridge product aliases to shadcn */
:root {
  --primary: var(--lmns-color-primary);
  --accent: var(--lmns-color-accent);
  --background: var(--lmns-color-background);
  --foreground: var(--lmns-color-foreground);
  --border: var(--lmns-color-border);
  --radius: var(--lmns-radius-default);
}`}
          />

          <CodeBlock
            language="bash"
            filename="token-workflow.sh"
            code={`# 1. Edit the JSON source of truth
tokens/src/lemniscate.json

# 2. Rebuild all outputs
pnpm tokens

# 3. Commit the generated dist files
git add tokens/src tokens/dist
git commit -m "tokens: update lemniscate theme"`}
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}
