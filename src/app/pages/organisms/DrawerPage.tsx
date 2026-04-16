import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/app/components/ui/drawer'

export function DrawerPage() {
  return (
    <ComponentPageLayout
      title="Drawer"
      description="A bottom sheet drawer — the mobile-native equivalent of a dialog. Ideal for action sheets and mobile-first flows."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Payment action drawer',
          preview: (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Record Payment</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Record Payment</DrawerTitle>
                  <DrawerDescription>
                    Mark maintenance as paid for Flat A-101
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount due</span>
                    <span className="font-medium">₹2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Month</span>
                    <span className="font-medium">April 2026</span>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Confirm Payment</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from '@aumraa/breathe/components/ui/drawer'

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Confirm</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
          },
        },
      ]}
    />
  )
}
