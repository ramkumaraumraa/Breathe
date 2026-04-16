import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb'

export function BreadcrumbPage() {
  return (
    <ComponentPageLayout
      title="Breadcrumb"
      description="Shows the user's current location within a navigational hierarchy. Use for deep page structures."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Expenses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrentPage>Add Expense</BreadcrumbCurrentPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from '@aumraa/breathe/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbCurrentPage>Add Expense</BreadcrumbCurrentPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
          },
        },
      ]}
    />
  )
}
