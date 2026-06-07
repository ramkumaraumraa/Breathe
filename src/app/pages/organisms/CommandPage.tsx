import { useState, useEffect } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistCommand } from '@/app/components/custom/kaayo/KayoBrutalistCommand'
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from '@/app/components/ui/command'
import { LayoutDashboard, Users, CreditCard, Settings, Plus, Search, FileText, Archive, Bell } from 'lucide-react'

// ─── Group factories ──────────────────────────────────────────────────────────

function makeNavGroup() {
  return {
    label: 'Navigation',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
      { key: 'students',  label: 'Students',  icon: <Users size={16} /> },
      { key: 'payments',  label: 'Payments',  icon: <CreditCard size={16} /> },
      { key: 'settings',  label: 'Settings',  icon: <Settings size={16} /> },
    ],
  }
}

function makeActionGroup() {
  return {
    label: 'Actions',
    items: [
      { key: 'new-student', label: 'Add Student', icon: <Plus size={16} /> },
      { key: 'search',      label: 'Search',      icon: <Search size={16} /> },
      { key: 'export',      label: 'Export Data', icon: <FileText size={16} /> },
    ],
  }
}

// ─── Trigger button ───────────────────────────────────────────────────────────

const triggerStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: '2px solid #3b3d3f',
  borderRadius: 6,
  backgroundColor: '#ffffff',
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '2px 2px 0 #191b1f',
}

// ─── Page component ───────────────────────────────────────────────────────────

export function CommandPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [open1,  setOpen1]  = useState(false)
  const [open2,  setOpen2]  = useState(false)
  const [open3,  setOpen3]  = useState(false)
  const [open4,  setOpen4]  = useState(false)
  const [open5,  setOpen5]  = useState(false)
  const [open6,  setOpen6]  = useState(false)
  const [open7,  setOpen7]  = useState(false)
  const [open8,  setOpen8]  = useState(false)
  const [open9,  setOpen9]  = useState(false)
  const [open10, setOpen10] = useState(false)
  const [open11, setOpen11] = useState(false)
  const [open12, setOpen12] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string>('')

  // Cmd+K listener for section 11
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen11(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ComponentPageLayout
      title="Command"
      description="Command palette for quick keyboard-driven navigation and actions."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        // ── Section 1: Default palette ────────────────────────────────────────
        {
          title: 'Default palette',
          description: 'A two-group command palette triggered by a button. Supports keyboard navigation and Escape to close.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen1(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open1}
                onClose={() => setOpen1(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Export Data</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={[navGroup, actionGroup]}
/>`,
          },
        },

        // ── Section 2: With icons ─────────────────────────────────────────────
        {
          title: 'With icons',
          description: 'Each item displays an icon to the left of its label. Icons are passed as ReactNode via the icon prop on each item.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen2(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open2}
                onClose={() => setOpen2(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Export Data</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `// Each item in the group includes an icon prop:
{ key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> }`,
          },
        },

        // ── Section 3: With shortcuts ─────────────────────────────────────────
        {
          title: 'With shortcuts',
          description: 'Keyboard shortcut hints are displayed as pills on the right side of each item.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen3(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open3}
                onClose={() => setOpen3(false)}
                groups={[
                  {
                    label: 'Navigation',
                    items: [
                      { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, shortcut: '⌘1' },
                      { key: 'students',  label: 'Students',  icon: <Users size={16} />,           shortcut: '⌘2' },
                      { key: 'payments',  label: 'Payments',  icon: <CreditCard size={16} />,      shortcut: '⌘3' },
                      { key: 'settings',  label: 'Settings',  icon: <Settings size={16} />,        shortcut: '⌘4' },
                    ],
                  },
                  {
                    label: 'Actions',
                    items: [
                      { key: 'new-student', label: 'Add Student', icon: <Plus size={16} />,     shortcut: '⌘N' },
                      { key: 'search',      label: 'Search',      icon: <Search size={16} />,   shortcut: '⌘F' },
                      { key: 'export',      label: 'Export Data', icon: <FileText size={16} />, shortcut: '⌘E' },
                    ],
                  },
                ]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `{ key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, shortcut: '⌘1' }`,
          },
        },

        // ── Section 4: Loading state ──────────────────────────────────────────
        {
          title: 'Loading state',
          description: 'Pass loading={true} to show a "Searching…" indicator while async results are being fetched.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen4(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open4}
                onClose={() => setOpen4(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
                loading={true}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>Searching…</CommandEmpty>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={groups}
  loading={true}
/>`,
          },
        },

        // ── Section 5: Empty search ───────────────────────────────────────────
        {
          title: 'Empty search',
          description: 'Type a query that matches nothing in the open palette to see the empty state. The emptyMessage prop controls the displayed text.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen5(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open5}
                onClose={() => setOpen5(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
                emptyMessage="No commands match."
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No commands match.</CommandEmpty>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={groups}
  emptyMessage="No commands match."
/>`,
          },
        },

        // ── Section 6: Custom empty message ──────────────────────────────────
        {
          title: 'Custom empty message',
          description: 'The emptyMessage prop accepts any string, letting you tailor the no-results copy to your context.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen6(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open6}
                onClose={() => setOpen6(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
                emptyMessage="Nothing matches your search."
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>Nothing matches your search.</CommandEmpty>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={groups}
  emptyMessage="Nothing matches your search."
/>`,
          },
        },

        // ── Section 7: Single group ───────────────────────────────────────────
        {
          title: 'Single group',
          description: 'All items merged into one flat group. The group label is intentionally empty to suppress the header.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen7(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open7}
                onClose={() => setOpen7(false)}
                groups={[
                  {
                    label: '',
                    items: [
                      ...makeNavGroup().items,
                      ...makeActionGroup().items,
                    ],
                  },
                ]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem>Settings</CommandItem>
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={[{ label: '', items: [...navItems, ...actionItems] }]}
/>`,
          },
        },

        // ── Section 8: Many groups ────────────────────────────────────────────
        {
          title: 'Many groups',
          description: 'Four distinct groups demonstrating how the palette scrolls gracefully with a large item set.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen8(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open8}
                onClose={() => setOpen8(false)}
                groups={[
                  {
                    label: 'Navigation',
                    items: makeNavGroup().items.slice(0, 3),
                  },
                  {
                    label: 'Actions',
                    items: makeActionGroup().items,
                  },
                  {
                    label: 'Documents',
                    items: [
                      { key: 'doc-new',    label: 'New Document',  icon: <FileText size={16} /> },
                      { key: 'doc-recent', label: 'Recent Files',  icon: <Archive size={16} /> },
                      { key: 'doc-export', label: 'Export as PDF', icon: <FileText size={16} /> },
                    ],
                  },
                  {
                    label: 'Notifications',
                    items: [
                      { key: 'notif-all',   label: 'All Notifications', icon: <Bell size={16} /> },
                      { key: 'notif-unread',label: 'Unread Only',       icon: <Bell size={16} /> },
                      { key: 'notif-mute',  label: 'Mute Alerts',       icon: <Bell size={16} /> },
                    ],
                  },
                ]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Export Data</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Documents">
                  <CommandItem>New Document</CommandItem>
                  <CommandItem>Recent Files</CommandItem>
                  <CommandItem>Export as PDF</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Notifications">
                  <CommandItem>All Notifications</CommandItem>
                  <CommandItem>Unread Only</CommandItem>
                  <CommandItem>Mute Alerts</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={[navGroup, actionGroup, docGroup, notifGroup]}
/>`,
          },
        },

        // ── Section 9: Disabled items ─────────────────────────────────────────
        {
          title: 'Disabled items',
          description: 'Items with disabled={true} are rendered at reduced opacity, are non-interactive, and are skipped during keyboard navigation.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen9(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open9}
                onClose={() => setOpen9(false)}
                groups={[{
                  ...makeNavGroup(),
                  items: makeNavGroup().items.map((item, i) =>
                    i === 1 || i === 3 ? { ...item, disabled: true } : item
                  ),
                }]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem disabled>Students (disabled)</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem disabled>Settings (disabled)</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `// Spread and override specific items:
groups={[{
  ...navGroup,
  items: navGroup.items.map((item, i) =>
    i === 1 || i === 3 ? { ...item, disabled: true } : item
  ),
}]}`,
          },
        },

        // ── Section 10: Keyboard demo ─────────────────────────────────────────
        {
          title: 'Keyboard demo',
          description: 'Full keyboard support: Arrow Up / Arrow Down to navigate, Enter to select, Escape to close. The focused item is highlighted in brand red.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen10(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open10}
                onClose={() => setOpen10(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Export Data</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `// Keyboard is handled internally — no extra props needed.
// ↑ ↓ navigate, Enter selects, Escape closes.`,
          },
        },

        // ── Section 11: Cmd+K trigger ─────────────────────────────────────────
        {
          title: 'Cmd+K trigger',
          description: 'A global keydown listener opens the palette when the user presses ⌘K (macOS) or Ctrl+K (Windows/Linux). Click the button below or press the keyboard shortcut.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen11(true)}>Press ⌘K (or Ctrl+K)</button>
              <KayoBrutalistCommand
                open={open11}
                onClose={() => setOpen11(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
              />
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>Dashboard</CommandItem>
                  <CommandItem>Students</CommandItem>
                  <CommandItem>Payments</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Add Student</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Export Data</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: {
            react: `useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen(true)
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [])`,
          },
        },

        // ── Section 12: Select callback ───────────────────────────────────────
        {
          title: 'Select callback',
          description: 'The onSelect prop fires with the selected item key whenever a command is chosen. The last-selected key is displayed below the trigger.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <button style={triggerStyle} onClick={() => setOpen12(true)}>Open Palette</button>
              <KayoBrutalistCommand
                open={open12}
                onClose={() => setOpen12(false)}
                groups={[makeNavGroup(), makeActionGroup()]}
                onSelect={(key) => setSelectedKey(key)}
              />
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', margin: 0 }}>
                Last selected: {selectedKey || '—'}
              </p>
            </div>
          ) : (
            <Command className="rounded-lg border border-border shadow-md w-full max-w-sm">
              <CommandInput placeholder="Search or type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Dashboard</CommandItem>
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Students</CommandItem>
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Payments</CommandItem>
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Add Student</CommandItem>
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Search</CommandItem>
                  <CommandItem onSelect={(v) => setSelectedKey(v)}>Export Data</CommandItem>
                </CommandGroup>
              </CommandList>
              <p style={{ fontFamily: 'system-ui', fontSize: 14, padding: '8px 16px', color: '#3b3d3f' }}>
                Last selected: {selectedKey || '—'}
              </p>
            </Command>
          ),
          code: {
            react: `<KayoBrutalistCommand
  open={open}
  onClose={() => setOpen(false)}
  groups={groups}
  onSelect={(key) => setSelectedKey(key)}
/>
<p>Last selected: {selectedKey || '—'}</p>`,
          },
        },
      ]}
    />
  )
}
