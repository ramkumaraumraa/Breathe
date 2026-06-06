import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistBreadcrumb } from '@/app/components/custom/kaayo/KayoBrutalistBreadcrumb'

export function BreadcrumbPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Breadcrumb"
      description="Shows the user's current location within a navigational hierarchy. Use for deep page structures."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default (3 levels)',
          description: 'Three-level path — the most common breadcrumb pattern.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Projects', href: '#' },
                { label: 'Active Project' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Active Project</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `import { KayoBrutalistBreadcrumb } from '@breathe/kaayo'

<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Active Project' },
  ]}
/>`,
          },
        },
        {
          title: 'Two Levels',
          description: 'Minimal two-level path — home + current page.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Settings' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Settings</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Settings' },
  ]}
/>`,
          },
        },
        {
          title: 'With Home Icon',
          description: 'First item uses a Home icon instead of text — common in app shells.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#', icon: <Home size={14} /> },
                { label: 'Reports', href: '#' },
                { label: 'Q1 Summary' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Q1 Summary</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `import { Home } from 'lucide-react'

<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#', icon: <Home size={14} /> },
    { label: 'Reports', href: '#' },
    { label: 'Q1 Summary' },
  ]}
/>`,
          },
        },
        {
          title: 'Four Levels',
          description: 'Deep path showing 4 levels — all visible, no ellipsis.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Kaayo', href: '#' },
                { label: 'Atoms' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Products</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Kaayo</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Atoms</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Kaayo', href: '#' },
    { label: 'Atoms' },
  ]}
/>`,
          },
        },
        {
          title: 'With Overflow',
          description: '`maxVisible={3}` on a 5-level path — shows first item, …, and last 2. Click … to expand.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              maxVisible={3}
              items={[
                { label: 'Home', href: '#' },
                { label: 'Society', href: '#' },
                { label: 'Sunrise Residences', href: '#' },
                { label: 'Block A', href: '#' },
                { label: 'Flat A-101' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><span className="text-muted-foreground">…</span></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Block A</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Flat A-101</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  maxVisible={3}
  items={[
    { label: 'Home', href: '#' },
    { label: 'Society', href: '#' },
    { label: 'Sunrise Residences', href: '#' },
    { label: 'Block A', href: '#' },
    { label: 'Flat A-101' },
  ]}
/>`,
          },
        },
        {
          title: 'Custom Separator',
          description: '`separator="›"` — chevron-style divider instead of the default slash.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              separator="›"
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Residents', href: '#' },
                { label: 'Ramkumar G' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>›</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbLink href="#">Residents</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>›</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbCurrentPage>Ramkumar G</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  separator="›"
  items={[
    { label: 'Dashboard', href: '#' },
    { label: 'Residents', href: '#' },
    { label: 'Ramkumar G' },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
