import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'

export function DropdownMenuPage() {
  return (
    <ComponentPageLayout
      title="Dropdown Menu"
      description="A contextual menu triggered by a button. Use for action lists, overflow menus, and context-sensitive options."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Basic dropdown',
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions ▾</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Flat A-101</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit resident</DropdownMenuItem>
                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Remove resident
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '@aumraa/breathe/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Flat A-101</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>View details</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
          },
        },
      ]}
    />
  )
}
