import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose,
} from '@/app/components/ui/sheet'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export function SheetPage() {
  return (
    <ComponentPageLayout
      title="Sheet"
      description="A panel that slides in from the screen edge. Use for forms, filters, and detail views that don't need a full page."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Right sheet — Add Expense',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Add Expense</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add Expense</SheetTitle>
                  <SheetDescription>
                    Record a new community expense. Click save when done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="s-desc">Description</Label>
                    <Input id="s-desc" placeholder="e.g. Generator fuel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-amount">Amount (₹)</Label>
                    <Input id="s-amount" type="number" placeholder="0.00" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button>Save Expense</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@aumraa/breathe/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>`,
          },
        },
        {
          title: 'Left + bottom variants',
          preview: (
            <div className="flex gap-3 flex-wrap">
              {(['left', 'bottom', 'top'] as const).map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="capitalize">{side}</Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
                    </SheetHeader>
                    <p className="text-sm text-muted-foreground pt-4">
                      Slides in from the {side}.
                    </p>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          ),
          code: {
            react: `<SheetContent side="left">...</SheetContent>
<SheetContent side="bottom">...</SheetContent>
<SheetContent side="top">...</SheetContent>`,
          },
        },
      ]}
    />
  )
}
