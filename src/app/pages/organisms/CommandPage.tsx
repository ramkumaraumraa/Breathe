import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from '@/app/components/ui/command'

export function CommandPage() {
  return (
    <ComponentPageLayout
      title="Command"
      description="A command palette and combobox primitive. Powers search, quick actions, and keyboard-driven navigation."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Command palette',
          preview: (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Residents">
                  <CommandItem>View all residents</CommandItem>
                  <CommandItem>Add new resident</CommandItem>
                  <CommandItem>Send bulk reminder</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Finances">
                  <CommandItem>Record payment</CommandItem>
                  <CommandItem>Add expense</CommandItem>
                  <CommandItem>Export report</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>Community settings</CommandItem>
                  <CommandItem>Manage users</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from '@aumraa/breathe/components/ui/command'

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Record payment</CommandItem>
      <CommandItem>Add expense</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
          },
        },
      ]}
    />
  )
}
