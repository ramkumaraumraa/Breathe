import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion'

export function AccordionPage() {
  return (
    <ComponentPageLayout
      title="Accordion"
      description="Vertically stacked sections that expand to reveal content. Use for FAQs, settings groups, and collapsible details."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Single expand',
          description: 'Only one section open at a time.',
          preview: (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="dues">
                <AccordionTrigger>How are dues calculated?</AccordionTrigger>
                <AccordionContent>
                  Dues are calculated based on the maintenance amount set for
                  your flat, billed on the 1st of each month.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  UPI, bank transfer, and cash payments are all recorded in Lemniscate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="receipt">
                <AccordionTrigger>Can I get a receipt?</AccordionTrigger>
                <AccordionContent>
                  Yes — receipts are auto-generated and sent via email on payment confirmation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from '@aumraa/breathe/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer content here.</AccordionContent>
  </AccordionItem>
</Accordion>`,
          },
        },
        {
          title: 'Multiple expand',
          description: 'Multiple sections can be open simultaneously.',
          preview: (
            <Accordion type="multiple" className="w-full max-w-sm">
              <AccordionItem value="a">
                <AccordionTrigger>Building Rules</AccordionTrigger>
                <AccordionContent>Community rules and regulations.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Amenity Booking</AccordionTrigger>
                <AccordionContent>How to book shared amenities.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<Accordion type="multiple">
  ...items
</Accordion>`,
          },
        },
      ]}
    />
  )
}
