import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'

export function SidebarPage() {
  return (
    <ComponentPageLayout
      title="Sidebar"
      description="The primary navigation structure for desktop applications. Contains section groups, active state, collapse behaviour, and footer actions."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Structure',
          description: "Breathe's sidebar is this documentation site itself. The sidebar you see on the left is the live component.",
          preview: (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center space-y-2">
              <p className="text-sm font-medium">Live example</p>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                The left navigation of this documentation site is the Sidebar component
                using Lemniscate tokens. Switch the product pill above to see how
                it adapts to other brand tokens.
              </p>
            </div>
          ),
          code: {
            react: `// The Sidebar component from Lemniscate's extracted codebase
// Source: src/app/components/layout/Sidebar.tsx
// Uses shadcn/ui sidebar primitives from components/ui/sidebar.tsx

import { Sidebar, SidebarContent, SidebarGroup,
  SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton
} from '@aumraa/breathe/components/ui/sidebar'

<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Foundations</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/foundations/colors">Colors</a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>`,
          },
        },
      ]}
    />
  )
}
