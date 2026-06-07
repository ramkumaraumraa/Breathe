import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistDataTable, KayoTableColumn } from '@/app/components/custom/kaayo/KayoBrutalistDataTable'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/app/components/ui/table'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

// ─── Module-level data ────────────────────────────────────────────────────────

const PEOPLE = [
  { id: '1', name: 'Arjun Mehta',   role: 'Admin',   status: 'active',   joined: '2024-01-15' },
  { id: '2', name: 'Priya Sharma',  role: 'Manager', status: 'active',   joined: '2024-03-22' },
  { id: '3', name: 'Kiran Rao',     role: 'Member',  status: 'inactive', joined: '2023-11-08' },
  { id: '4', name: 'Divya Nair',    role: 'Admin',   status: 'pending',  joined: '2024-05-01' },
  { id: '5', name: 'Suresh Kumar',  role: 'Member',  status: 'archived', joined: '2023-07-19' },
  { id: '6', name: 'Ananya Iyer',   role: 'Manager', status: 'active',   joined: '2024-02-28' },
]

const PEOPLE_WIDE = [
  { id: '1', name: 'Arjun Mehta',   role: 'Admin',   status: 'active',   joined: '2024-01-15', email: 'arjun@example.com',   phone: '+91 98001 11111', department: 'Engineering', score: 94 },
  { id: '2', name: 'Priya Sharma',  role: 'Manager', status: 'active',   joined: '2024-03-22', email: 'priya@example.com',   phone: '+91 98002 22222', department: 'Product',     score: 88 },
  { id: '3', name: 'Kiran Rao',     role: 'Member',  status: 'inactive', joined: '2023-11-08', email: 'kiran@example.com',   phone: '+91 98003 33333', department: 'Design',      score: 72 },
  { id: '4', name: 'Divya Nair',    role: 'Admin',   status: 'pending',  joined: '2024-05-01', email: 'divya@example.com',   phone: '+91 98004 44444', department: 'Operations',  score: 61 },
  { id: '5', name: 'Suresh Kumar',  role: 'Member',  status: 'archived', joined: '2023-07-19', email: 'suresh@example.com',  phone: '+91 98005 55555', department: 'Sales',       score: 55 },
  { id: '6', name: 'Ananya Iyer',   role: 'Manager', status: 'active',   joined: '2024-02-28', email: 'ananya@example.com',  phone: '+91 98006 66666', department: 'Engineering', score: 91 },
]

// Legacy shadcn dataset (non-kaayo sections)
const payments = [
  { flat: 'A-101', resident: 'Ramkumar G',  month: 'Apr 2026', amount: '₹2,500', status: 'Paid',    method: 'UPI' },
  { flat: 'A-102', resident: 'Priya S',     month: 'Apr 2026', amount: '₹2,500', status: 'Pending', method: '—' },
  { flat: 'B-201', resident: 'Karthik R',   month: 'Apr 2026', amount: '₹3,000', status: 'Paid',    method: 'Bank' },
  { flat: 'B-202', resident: 'Meena D',     month: 'Apr 2026', amount: '₹3,000', status: 'Overdue', method: '—' },
  { flat: 'C-301', resident: 'Santhosh K',  month: 'Apr 2026', amount: '₹2,500', status: 'Paid',    method: 'Cash' },
]

const statusVariant = (s: string) =>
  s === 'Paid' ? 'default' : s === 'Overdue' ? 'destructive' : 'secondary'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    active:   { bg: '#f0fdf4', color: '#15803d', border: '#86efac' },
    inactive: { bg: '#f9fafb', color: '#6b7280', border: '#d1d5db' },
    pending:  { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    archived: { bg: '#fef2f2', color: '#991b1b', border: '#fca5a5' },
  }
  const c = colors[status] ?? colors.inactive
  return (
    <span style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
      {status}
    </span>
  )
}

function PaginationFooter() {
  const [page, setPage] = useState(1)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13 }}>
      <span style={{ color: '#6b7280' }}>Showing 6 of 18 records</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 12px', border: '2px solid #3b3d3f', borderRadius: 4, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, background: '#fff', fontFamily: "'DM Sans', system-ui, sans-serif" }}>Prev</button>
        <span style={{ padding: '6px 12px', border: '2px solid #970103', borderRadius: 4, background: '#970103', color: '#fff', fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{page}</span>
        <button onClick={() => setPage(p => Math.min(3, p + 1))} disabled={page === 3} style={{ padding: '6px 12px', border: '2px solid #3b3d3f', borderRadius: 4, cursor: page === 3 ? 'not-allowed' : 'pointer', opacity: page === 3 ? 0.4 : 1, background: '#fff', fontFamily: "'DM Sans', system-ui, sans-serif" }}>Next</button>
      </div>
    </div>
  )
}

// ─── Base columns (reused across many sections) ────────────────────────────────

const BASE_COLUMNS: KayoTableColumn[] = [
  { key: 'name',   header: 'Name',   width: 180 },
  { key: 'role',   header: 'Role',   width: 120 },
  { key: 'status', header: 'Status', width: 120 },
  { key: 'joined', header: 'Joined', width: 120 },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function TablePage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  // Section 2 — sortable
  const [sortKey, setSortKey] = useState<string | undefined>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  function handleSort(key: string) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  // Section 3 — interactive selection
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
    <ComponentPageLayout
      title="Table"
      description="Structured data display with sort, selection, pagination slot, and skeleton loading."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[

        // ── Section 1: Basic ──────────────────────────────────────────────────
        {
          title: 'Basic — 4 columns',
          description: 'Minimal table with Name, Role, Status, and Joined columns. No interactivity.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={PEOPLE}
            />
          ) : (
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
                  {payments.map(p => (
                    <TableRow key={p.flat}>
                      <TableCell className="font-mono text-xs">{p.flat}</TableCell>
                      <TableCell className="font-medium">{p.resident}</TableCell>
                      <TableCell className="text-muted-foreground">{p.month}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell><Badge variant={statusVariant(p.status) as 'default' | 'destructive' | 'secondary'}>{p.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{p.method}</TableCell>
                      <TableCell>{p.status !== 'Paid' && <Button size="sm" variant="outline">Record</Button>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistDataTable, KayoTableColumn } from '@/components/custom/kaayo/KayoBrutalistDataTable'

const columns: KayoTableColumn[] = [
  { key: 'name',   header: 'Name' },
  { key: 'role',   header: 'Role' },
  { key: 'status', header: 'Status' },
  { key: 'joined', header: 'Joined' },
]

<KayoBrutalistDataTable columns={columns} rows={PEOPLE} />`,
          },
        },

        // ── Section 2: Sortable ───────────────────────────────────────────────
        {
          title: 'Sortable columns',
          description: 'Name and Joined columns are sortable. Click a header to toggle asc/desc.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={[
                { key: 'name',   header: 'Name',   width: 180, sortable: true },
                { key: 'role',   header: 'Role',   width: 120 },
                { key: 'status', header: 'Status', width: 120 },
                { key: 'joined', header: 'Joined', width: 120, sortable: true },
              ]}
              rows={PEOPLE}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `const [sortKey, setSortKey] = useState<string | undefined>()
const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc')

function handleSort(key: string) {
  if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
  else { setSortKey(key); setSortDir('asc') }
}

<KayoBrutalistDataTable
  columns={[
    { key: 'name',   header: 'Name',   sortable: true },
    { key: 'role',   header: 'Role' },
    { key: 'status', header: 'Status' },
    { key: 'joined', header: 'Joined', sortable: true },
  ]}
  rows={PEOPLE}
  sortKey={sortKey}
  sortDir={sortDir}
  onSort={handleSort}
/>`,
          },
        },

        // ── Section 3: Row selection ──────────────────────────────────────────
        {
          title: 'With row selection',
          description: 'Checkboxes on every row. Select-all checkbox in the header toggles all rows.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={PEOPLE}
              selectable
              selectedKeys={selectedKeys}
              onSelectChange={setSelectedKeys}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `const [selectedKeys, setSelectedKeys] = useState<string[]>([])

<KayoBrutalistDataTable
  columns={columns}
  rows={PEOPLE}
  selectable
  selectedKeys={selectedKeys}
  onSelectChange={setSelectedKeys}
/>`,
          },
        },

        // ── Section 4: Partial selection ─────────────────────────────────────
        {
          title: 'Partial selection',
          description: 'Pre-selected rows (ids 1 and 3). The header checkbox shows an indeterminate state.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={PEOPLE}
              selectable
              selectedKeys={['1', '3']}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `// Read-only pre-selected state (no onSelectChange = non-interactive)
<KayoBrutalistDataTable
  columns={columns}
  rows={PEOPLE}
  selectable
  selectedKeys={['1', '3']}
/>`,
          },
        },

        // ── Section 5: Status badges ──────────────────────────────────────────
        {
          title: 'With status badges',
          description: 'The Status column uses a custom render function to display coloured inline badges.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={[
                { key: 'name',   header: 'Name',   width: 180 },
                { key: 'role',   header: 'Role',   width: 120 },
                {
                  key: 'status',
                  header: 'Status',
                  width: 120,
                  render: (value) => <StatusBadge status={String(value)} />,
                },
                { key: 'joined', header: 'Joined', width: 120 },
              ]}
              rows={PEOPLE}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell><Badge>{p.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `function StatusBadge({ status }: { status: string }) {
  const colors = { active: { bg:'#f0fdf4', color:'#15803d', border:'#86efac' }, ... }
  const c = colors[status] ?? colors.inactive
  return <span style={{ backgroundColor:c.bg, color:c.color, border:\`1px solid \${c.border}\`, borderRadius:4, padding:'2px 8px', fontSize:11, fontWeight:600 }}>{status}</span>
}

<KayoBrutalistDataTable
  columns={[
    { key: 'name',   header: 'Name' },
    { key: 'role',   header: 'Role' },
    { key: 'status', header: 'Status', render: (v) => <StatusBadge status={String(v)} /> },
    { key: 'joined', header: 'Joined' },
  ]}
  rows={PEOPLE}
/>`,
          },
        },

        // ── Section 6: Action column ──────────────────────────────────────────
        {
          title: 'With action column',
          description: 'Final column renders Edit and Delete buttons per row using the render prop.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={[
                { key: 'name',   header: 'Name',   width: 160 },
                { key: 'role',   header: 'Role',   width: 110 },
                { key: 'status', header: 'Status', width: 110 },
                { key: 'joined', header: 'Joined', width: 110 },
                {
                  key: 'actions',
                  header: 'Actions',
                  align: 'right',
                  render: (_value, row) => (
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => alert(`Edit ${(row as { name: string }).name}`)}
                        style={{ padding: '4px 10px', border: '1.5px solid #3b3d3f', borderRadius: 4, background: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => alert(`Delete ${(row as { name: string }).name}`)}
                        style={{ padding: '4px 10px', border: '1.5px solid #970103', borderRadius: 4, background: '#fff', color: '#970103', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif" }}
                      >
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={PEOPLE}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `{
  key: 'actions',
  header: 'Actions',
  align: 'right',
  render: (_value, row) => (
    <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
      <button onClick={() => alert(\`Edit \${row.name}\`)}>Edit</button>
      <button onClick={() => alert(\`Delete \${row.name}\`)}>Delete</button>
    </div>
  ),
}`,
          },
        },

        // ── Section 7: Empty state ────────────────────────────────────────────
        {
          title: 'Empty state',
          description: 'When rows is an empty array the table renders the emptyState slot.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={[]}
              emptyState={<span style={{ color: '#6b7280', fontSize: 14, fontFamily: "'DM Sans', system-ui, sans-serif" }}>No records found.</span>}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      No records found.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `<KayoBrutalistDataTable
  columns={columns}
  rows={[]}
  emptyState={<span>No records found.</span>}
/>`,
          },
        },

        // ── Section 8: Loading skeleton ───────────────────────────────────────
        {
          title: 'Loading skeleton',
          description: 'Passing loading={true} replaces rows with animated skeleton bars. skeletonRowCount controls how many placeholder rows appear.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={[]}
              loading
              skeletonRowCount={5}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 4 }).map((__, j) => (
                        <TableCell key={j}><div className="h-4 bg-muted animate-pulse rounded" /></TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `<KayoBrutalistDataTable
  columns={columns}
  rows={[]}
  loading={true}
  skeletonRowCount={5}
/>`,
          },
        },

        // ── Section 9: Pagination footer ──────────────────────────────────────
        {
          title: 'With pagination',
          description: 'The footer slot accepts any ReactNode — here a Prev/Next pagination control with live page state.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={PEOPLE}
              footer={<PaginationFooter />}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t px-4 py-3 flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing 6 of 18 records</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Prev</Button>
                  <Button size="sm" variant="outline">Next</Button>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `function PaginationFooter() {
  const [page, setPage] = useState(1)
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:13 }}>
      <span>Showing 6 of 18 records</span>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>{page}</span>
        <button onClick={() => setPage(p => Math.min(3,p+1))} disabled={page===3}>Next</button>
      </div>
    </div>
  )
}

<KayoBrutalistDataTable columns={columns} rows={PEOPLE} footer={<PaginationFooter />} />`,
          },
        },

        // ── Section 10: Compact rows ──────────────────────────────────────────
        {
          title: 'Compact rows',
          description: 'rowHeight="compact" reduces cell padding for dense data views.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={BASE_COLUMNS}
              rows={PEOPLE}
              rowHeight="compact"
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow className="h-8">
                    <TableHead className="py-1">Name</TableHead>
                    <TableHead className="py-1">Role</TableHead>
                    <TableHead className="py-1">Status</TableHead>
                    <TableHead className="py-1">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.map(p => (
                    <TableRow key={p.id} className="h-8">
                      <TableCell className="py-1 font-medium">{p.name}</TableCell>
                      <TableCell className="py-1">{p.role}</TableCell>
                      <TableCell className="py-1">{p.status}</TableCell>
                      <TableCell className="py-1 text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `<KayoBrutalistDataTable
  columns={columns}
  rows={PEOPLE}
  rowHeight="compact"
/>`,
          },
        },

        // ── Section 11: Sticky header ─────────────────────────────────────────
        {
          title: 'Sticky header',
          description: 'Wrap the table in a fixed-height scrollable container with stickyHeader={true} — the header row stays visible while the body scrolls.',
          preview: isKaayo ? (
            <div style={{ height: 300, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 6 }}>
              <KayoBrutalistDataTable
                columns={BASE_COLUMNS}
                rows={[...PEOPLE, ...PEOPLE]}
                stickyHeader
              />
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full h-72 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...PEOPLE, ...PEOPLE].map((p, i) => (
                    <TableRow key={`${p.id}-${i}`}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `<div style={{ height: 300, overflowY: 'auto' }}>
  <KayoBrutalistDataTable
    columns={columns}
    rows={[...PEOPLE, ...PEOPLE]}
    stickyHeader
  />
</div>`,
          },
        },

        // ── Section 12: Wide — 8 columns ──────────────────────────────────────
        {
          title: 'Wide — 8 columns',
          description: 'Extended dataset with 8 columns: Name, Role, Status, Joined, Email, Phone, Department, and Score. Horizontal scroll activates on narrow viewports.',
          preview: isKaayo ? (
            <KayoBrutalistDataTable
              columns={[
                { key: 'name',       header: 'Name',       width: 150 },
                { key: 'role',       header: 'Role',       width: 100 },
                { key: 'status',     header: 'Status',     width: 100 },
                { key: 'joined',     header: 'Joined',     width: 110 },
                { key: 'email',      header: 'Email',      width: 180 },
                { key: 'phone',      header: 'Phone',      width: 150 },
                { key: 'department', header: 'Department', width: 120 },
                { key: 'score',      header: 'Score',      width: 80, align: 'right' },
              ]}
              rows={PEOPLE_WIDE}
            />
          ) : (
            <div className="rounded-lg border border-border overflow-hidden w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE_WIDE.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell className="text-muted-foreground">{p.joined}</TableCell>
                      <TableCell className="text-muted-foreground">{p.email}</TableCell>
                      <TableCell className="text-muted-foreground">{p.phone}</TableCell>
                      <TableCell>{p.department}</TableCell>
                      <TableCell className="text-right font-mono">{p.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: {
            react: `<KayoBrutalistDataTable
  columns={[
    { key: 'name',       header: 'Name' },
    { key: 'role',       header: 'Role' },
    { key: 'status',     header: 'Status' },
    { key: 'joined',     header: 'Joined' },
    { key: 'email',      header: 'Email' },
    { key: 'phone',      header: 'Phone' },
    { key: 'department', header: 'Department' },
    { key: 'score',      header: 'Score', align: 'right' },
  ]}
  rows={PEOPLE_WIDE}
/>`,
          },
        },

      ]}
    />
  )
}
