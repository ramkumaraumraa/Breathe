import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { StatGrid } from '@/app/components/custom/template/StatGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

export function StatGridPage() {
  return (
    <ComponentPageLayout
      title="Stat Grid"
      description="Responsive grid for stat card layouts. Handles single-column mobile and 2-column desktop automatically."
      level="Template"
      status="Stable"
      sections={[
        {
          title: '2-column grid',
          preview: (
            <StatGrid variant="2col" className="w-full">
              <StatCard label="Total Members" value="12,430" />
              <StatCard label="Active This Month" value="8,291" />
              <StatCard label="New Sign-ups" value="342" />
              <StatCard label="Churn Rate" value="1.2%" />
            </StatGrid>
          ),
          code: {
            react: `import { StatGrid } from '@breathe/templates'

<StatGrid variant="2col">
  <StatCard label="Total Members" value="12,430" />
  <StatCard label="Active This Month" value="8,291" />
</StatGrid>`,
          },
        },
        {
          title: '2/3 + 1/3 split',
          preview: (
            <StatGrid variant="2-1" className="w-full">
              <StatCard label="Revenue" value="₹4,28,000" />
              <StatCard label="MRR" value="₹35,667" />
            </StatGrid>
          ),
          code: {
            react: `<StatGrid variant="2-1">
  <MainContent />
  <Sidebar />
</StatGrid>`,
          },
        },
      ]}
    />
  )
}
