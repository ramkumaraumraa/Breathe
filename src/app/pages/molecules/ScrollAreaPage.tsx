import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Separator } from '@/app/components/ui/separator'

const residents = [
  { flat: 'A-101', name: 'Ramkumar G', status: 'Paid' },
  { flat: 'A-102', name: 'Priya Shankar', status: 'Paid' },
  { flat: 'B-201', name: 'Karthik Raja', status: 'Pending' },
  { flat: 'B-202', name: 'Meena Devi', status: 'Paid' },
  { flat: 'C-301', name: 'Santhosh Kumar', status: 'Overdue' },
  { flat: 'C-302', name: 'Anitha Raj', status: 'Paid' },
  { flat: 'D-401', name: 'Murugan P', status: 'Pending' },
  { flat: 'D-402', name: 'Lakshmi S', status: 'Paid' },
]

export function ScrollAreaPage() {
  return (
    <ComponentPageLayout
      title="Scroll Area"
      description="A custom-styled scrollable container with consistent cross-browser appearance."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Resident list',
          description: 'Fixed height container with overflow scroll.',
          preview: (
            <ScrollArea className="h-64 w-full max-w-sm rounded-lg border border-border">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  All Residents
                </p>
                {residents.map((r, i) => (
                  <div key={r.flat}>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.flat}</p>
                      </div>
                      <span className={`text-xs font-medium ${
                        r.status === 'Paid' ? 'text-green-600' :
                        r.status === 'Overdue' ? 'text-destructive' :
                        'text-amber-600'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    {i < residents.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `import { ScrollArea } from '@aumraa/breathe/components/ui/scroll-area'

<ScrollArea className="h-64 w-full rounded-lg border">
  <div className="p-4">
    {residents.map(r => (
      <div key={r.flat}>{/* row content */}</div>
    ))}
  </div>
</ScrollArea>`,
          },
        },
      ]}
    />
  )
}
