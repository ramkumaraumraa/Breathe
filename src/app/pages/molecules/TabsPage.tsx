import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

export function TabsPage() {
  return (
    <ComponentPageLayout
      title="Tabs"
      description="Organises content into switchable panels. All tabs are visible at once — use when the user needs to compare or switch between views."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content here.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content here.</TabsContent>
              <TabsContent value="settings" className="mt-3 text-sm text-muted-foreground">Settings content here.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@breathe/ui'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content.</TabsContent>
  <TabsContent value="analytics">Analytics content.</TabsContent>
</Tabs>`,
          },
        },
      ]}
    />
  )
}
