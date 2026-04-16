import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { PageBody } from '@/app/components/custom/template/PageBody'

export function PageBodyPage() {
  return (
    <ComponentPageLayout
      title="Page Body"
      description="Consistent content inset for all app screens. Handles padding across mobile / tablet / desktop in one place. Wrap every screen's main content in PageBody."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Usage',
          preview: (
            <div className="w-full border border-dashed border-border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-1.5 text-xs text-muted-foreground font-mono">Screen boundary</div>
              <PageBody>
                <p className="text-sm">Content rendered inside PageBody gets consistent padding: <code className="text-xs bg-muted px-1 rounded">px-4 pb-4</code> on mobile, <code className="text-xs bg-muted px-1 rounded">px-8 pb-8</code> on desktop.</p>
              </PageBody>
            </div>
          ),
          code: {
            react: `import { PageBody } from '@breathe/templates'

export function MyScreen() {
  return (
    <PageBody>
      <PageToolbar ... />
      <StatGrid ... />
      <DataSection>...</DataSection>
    </PageBody>
  )
}`,
          },
        },
      ]}
    />
  )
}
