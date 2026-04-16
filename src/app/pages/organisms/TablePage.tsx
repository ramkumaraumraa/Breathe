import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/app/components/ui/table'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

const payments = [
  { flat: 'A-101', resident: 'Ramkumar G',  month: 'Apr 2026', amount: '₹2,500', status: 'Paid',    method: 'UPI' },
  { flat: 'A-102', resident: 'Priya S',     month: 'Apr 2026', amount: '₹2,500', status: 'Pending',  method: '—' },
  { flat: 'B-201', resident: 'Karthik R',   month: 'Apr 2026', amount: '₹3,000', status: 'Paid',    method: 'Bank' },
  { flat: 'B-202', resident: 'Meena D',     month: 'Apr 2026', amount: '₹3,000', status: 'Overdue', method: '—' },
  { flat: 'C-301', resident: 'Santhosh K',  month: 'Apr 2026', amount: '₹2,500', status: 'Paid',    method: 'Cash' },
]

const statusVariant = (s: string) =>
  s === 'Paid' ? 'default' : s === 'Overdue' ? 'destructive' : 'secondary'

export function TablePage() {
  return (
    <ComponentPageLayout
      title="Table"
      description="Displays structured data in rows and columns. The primary data display pattern for lists of records."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Payment collection table',
          description: 'Standard data table with status badges and actions.',
          preview: (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flat</TableHead>
                    <TableHead>Resident</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.flat}>
                      <TableCell className="font-mono text-xs">{p.flat}</TableCell>
                      <TableCell className="font-medium">{p.resident}</TableCell>
                      <TableCell className="text-muted-foreground">{p.month}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(p.status) as any}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.method}</TableCell>
                      <TableCell>
                        {p.status !== 'Paid' && (
                          <Button size="sm" variant="outline">Record</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@aumraa/breathe/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Flat</TableHead>
      <TableHead>Resident</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.flat}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell><Badge>{row.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
          },
        },
      ]}
    />
  )
}
