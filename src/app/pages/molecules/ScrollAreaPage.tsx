import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Separator } from '@/app/components/ui/separator'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistScrollArea } from '@/app/components/custom/kaayo/KayoBrutalistScrollArea'

const residents = [
  { flat: 'A-101', name: 'Ramkumar G',      status: 'Paid' },
  { flat: 'A-102', name: 'Priya Shankar',    status: 'Paid' },
  { flat: 'B-201', name: 'Karthik Raja',     status: 'Pending' },
  { flat: 'B-202', name: 'Meena Devi',       status: 'Paid' },
  { flat: 'C-301', name: 'Santhosh Kumar',   status: 'Overdue' },
  { flat: 'C-302', name: 'Anitha Raj',       status: 'Paid' },
  { flat: 'D-401', name: 'Murugan P',        status: 'Pending' },
  { flat: 'D-402', name: 'Lakshmi S',        status: 'Paid' },
  { flat: 'E-501', name: 'Vijay Kumar',      status: 'Paid' },
  { flat: 'E-502', name: 'Sangeetha B',      status: 'Pending' },
  { flat: 'F-601', name: 'Arjun Reddy',      status: 'Overdue' },
  { flat: 'F-602', name: 'Deepika Nair',     status: 'Paid' },
]

function statusColor(status: string): string {
  if (status === 'Paid') return '#166534'
  if (status === 'Overdue') return '#970103'
  return '#92400e'
}

export function ScrollAreaPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Scroll Area"
      description="A custom-styled scrollable container with consistent cross-browser appearance."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Vertical List',
          description: 'Fixed 300px height, 12-item resident list — shows vertical custom scrollbar.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={300} width="100%" style={{ maxWidth: 400 }}>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#a8a8aa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  All Residents
                </div>
                {residents.map((r, i) => (
                  <div key={r.flat}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#3b3d3f' }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{r.flat}</div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: statusColor(r.status) }}>{r.status}</span>
                    </div>
                    {i < residents.length - 1 && (
                      <div style={{ height: 1, backgroundColor: 'var(--kayo-color-muted, #f4f4f4)' }} />
                    )}
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-64 w-full max-w-sm rounded-lg border border-border">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">All Residents</p>
                {residents.map((r, i) => (
                  <div key={r.flat}>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.flat}</p>
                      </div>
                      <span className={`text-xs font-medium ${r.status === 'Paid' ? 'text-green-600' : r.status === 'Overdue' ? 'text-destructive' : 'text-amber-600'}`}>
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
            react: `import { KayoBrutalistScrollArea } from '@breathe/kaayo'

<KayoBrutalistScrollArea height={300} width="100%">
  {residents.map(r => (
    <div key={r.flat}>{/* row */}</div>
  ))}
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Horizontal Content',
          description: 'Fixed width container, wide content — scrolls horizontally.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={80} width="100%" orientation="horizontal" style={{ maxWidth: 480 }}>
              <div style={{ display: 'flex', gap: 12, padding: '12px 16px', width: 'max-content' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <div key={month} style={{
                    flexShrink: 0,
                    width: 80,
                    padding: '8px 12px',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>{month}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#3b3d3f' }}>₹42k</div>
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="w-full max-w-lg whitespace-nowrap rounded-lg border border-border">
              <div className="flex gap-3 p-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <div key={m} className="flex-shrink-0 rounded-md border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">{m}</p>
                    <p className="text-sm font-semibold">₹42k</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={80} orientation="horizontal">
  <div style={{ display: 'flex', gap: 12, width: 'max-content', padding: 16 }}>
    {months.map(m => <MonthCard key={m} />)}
  </div>
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Both Axes',
          description: 'Fixed 300×400px box, large grid content — scrolls in both directions.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={300} width={400} orientation="both">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 100px)', gap: 8, padding: 16, width: 'max-content' }}>
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} style={{
                    width: 100,
                    height: 60,
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#6b7280',
                    fontWeight: 600,
                  }}>
                    Cell {i + 1}
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-64 w-96 rounded-lg border">
              <div className="grid gap-2 p-4" style={{ gridTemplateColumns: 'repeat(8, 100px)', width: 'max-content' }}>
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="flex h-14 w-24 items-center justify-center rounded border text-xs text-muted-foreground">
                    Cell {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={300} width={400} orientation="both">
  <div style={{ width: 'max-content', padding: 16 }}>
    {/* wide grid content */}
  </div>
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Custom Height',
          description: '`height={200}` narrow box — demonstrates scrollbar style at a smaller viewport.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={200} width="100%" style={{ maxWidth: 300 }}>
              <div style={{ padding: '12px 16px' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f4f4f4',
                    fontSize: 13,
                    color: '#3b3d3f',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>Item {i + 1}</span>
                    <span style={{ color: '#6b7280' }}>₹{(i + 1) * 100}</span>
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-48 w-full max-w-xs rounded-lg border">
              <div className="p-4 space-y-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-border/50 pb-2">
                    <span>Item {i + 1}</span>
                    <span className="text-muted-foreground">₹{(i + 1) * 100}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={200} width="100%">
  {items.map(item => <div key={item.id}>{item.label}</div>)}
</KayoBrutalistScrollArea>`,
          },
        },
      ]}
    />
  )
}
