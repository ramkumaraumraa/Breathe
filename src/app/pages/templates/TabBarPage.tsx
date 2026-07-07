import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { TabBar } from '@/app/components/templates/TabBar'

export function TabBarPage() {
  return (
    <ComponentPageLayout
      title="Tab Bar"
      description="Pill-style tab switcher for period selectors, view mode toggles, and filter groups. Renders horizontally on all breakpoints."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Period selector',
          preview: (
            <PeriodExample />
          ),
          code: {
            react: `import { TabBar } from '@breathe/templates'

const [period, setPeriod] = useState('30d')

<TabBar
  tabs={[
    { value: '7d',  label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: '1y',  label: '1 year' },
  ]}
  value={period}
  onChange={setPeriod}
/>`,
          },
        },
        {
          title: 'With badges',
          preview: (
            <BadgeExample />
          ),
          code: {
            react: `<TabBar
  tabs={[
    { value: 'all',     label: 'All',      badge: 24 },
    { value: 'pending', label: 'Pending',  badge: 5 },
    { value: 'done',    label: 'Done' },
  ]}
  value={active}
  onChange={setActive}
/>`,
          },
        },
      ]}
    />
  )
}

function PeriodExample() {
  const [v, setV] = useState('30d')
  return (
    <TabBar
      tabs={[
        { value: '7d',  label: '7 days' },
        { value: '30d', label: '30 days' },
        { value: '90d', label: '90 days' },
        { value: '1y',  label: '1 year' },
      ]}
      value={v}
      onChange={setV}
    />
  )
}

function BadgeExample() {
  const [v, setV] = useState('all')
  return (
    <TabBar
      tabs={[
        { value: 'all',     label: 'All',     badge: 24 },
        { value: 'pending', label: 'Pending', badge: 5 },
        { value: 'done',    label: 'Done' },
      ]}
      value={v}
      onChange={setV}
    />
  )
}
