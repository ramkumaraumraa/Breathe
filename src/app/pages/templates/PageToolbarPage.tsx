import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { PageToolbar } from '@/app/components/templates/PageToolbar'
import { Button } from '@/app/components/atoms/button'
import { TabBar } from '@/app/components/templates/TabBar'

export function PageToolbarPage() {
  return (
    <ComponentPageLayout
      title="Page Toolbar"
      description="Toolbar row between the page header and content. Left slot holds filters and period selectors; right slot holds export and secondary actions."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'With filters and actions',
          preview: (
            <PageToolbar
              left={
                <TabBar
                  tabs={[
                    { value: '7d', label: '7d' },
                    { value: '30d', label: '30d' },
                    { value: '90d', label: '90d' },
                  ]}
                  value="30d"
                  onChange={() => {}}
                />
              }
              right={
                <>
                  <Button variant="outline" size="sm">Export CSV</Button>
                  <Button size="sm">+ Add</Button>
                </>
              }
            />
          ),
          code: {
            react: `import { PageToolbar } from '@breathe/templates'

<PageToolbar
  left={<PeriodTabs />}
  right={
    <>
      <Button variant="outline" size="sm">Export</Button>
      <Button size="sm">+ Add</Button>
    </>
  }
/>`,
          },
        },
      ]}
    />
  )
}
