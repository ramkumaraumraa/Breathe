import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/molecules/dropdown-menu'
import {
  Eye, Edit, Trash2, Copy, Download, Share2, Settings,
  MoreHorizontal, Bell, User, FileText, LogOut,
} from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistDropdownMenu } from '@/app/components/custom/kaayo/KayoBrutalistDropdownMenu'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function DropdownMenuPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Dropdown Menu"
      description="A contextual menu triggered by a button. Use for action lists, overflow menus, and context-sensitive options."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: '5 plain text items, no icons — the minimal dropdown pattern.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Actions ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details', onClick: () => {} },
                { type: 'item', label: 'Edit resident', onClick: () => {} },
                { type: 'item', label: 'Send reminder', onClick: () => {} },
                { type: 'item', label: 'Download PDF', onClick: () => {} },
                { type: 'item', label: 'Remove resident', onClick: () => {} },
              ]}
            />
          ) : (
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
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Remove resident</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `import { KayoBrutalistDropdownMenu } from '@breathe/kaayo'

<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Actions ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'View details', onClick: () => {} },
    { type: 'item', label: 'Edit resident', onClick: () => {} },
    { type: 'item', label: 'Remove resident', onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Icons',
          description: 'Each item has a Lucide icon left of the label.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details',   icon: <Eye size={14} />,      onClick: () => {} },
                { type: 'item', label: 'Edit',           icon: <Edit size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Copy link',      icon: <Copy size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Download',       icon: <Download size={14} />, onClick: () => {} },
                { type: 'item', label: 'Delete',         icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Manage ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View details</DropdownMenuItem>
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Copy link</DropdownMenuItem>
                <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `import { Eye, Edit, Trash2 } from 'lucide-react'

<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'View details', icon: <Eye size={14} />, onClick: () => {} },
    { type: 'item', label: 'Delete', icon: <Trash2 size={14} />, destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Shortcuts',
          description: 'Keyboard shortcuts right-aligned in monospace — for power-user menus.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="File ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'New document',  shortcut: '⌘N',   onClick: () => {} },
                { type: 'item', label: 'Open',          shortcut: '⌘O',   onClick: () => {} },
                { type: 'item', label: 'Save',          shortcut: '⌘S',   onClick: () => {} },
                { type: 'item', label: 'Save as…',      shortcut: '⌘⇧S',  onClick: () => {} },
                { type: 'item', label: 'Print',         shortcut: '⌘P',   onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">File ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex justify-between gap-8">New document <span className="text-xs text-muted-foreground font-mono">⌘N</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Open <span className="text-xs text-muted-foreground font-mono">⌘O</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Save <span className="text-xs text-muted-foreground font-mono">⌘S</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Save as… <span className="text-xs text-muted-foreground font-mono">⌘⇧S</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Print <span className="text-xs text-muted-foreground font-mono">⌘P</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="File ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'Save', shortcut: '⌘S', onClick: () => {} },
    { type: 'item', label: 'Print', shortcut: '⌘P', onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Separator + Labels',
          description: 'Grouped items with label headers and a separator between safe and danger zones.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Options ▾" variant="secondary" />}
              items={[
                { type: 'label', text: 'Actions' },
                { type: 'item', label: 'View profile',   icon: <User size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Notifications',  icon: <Bell size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Settings',       icon: <Settings size={14} />, onClick: () => {} },
                { type: 'separator' },
                { type: 'label', text: 'Danger Zone' },
                { type: 'item', label: 'Delete account', icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Options ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem><User className="mr-2 h-4 w-4" />View profile</DropdownMenuItem>
                <DropdownMenuItem><Bell className="mr-2 h-4 w-4" />Notifications</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Options ▾" />}
  items={[
    { type: 'label', text: 'Actions' },
    { type: 'item', label: 'Settings', icon: <Settings size={14} />, onClick: () => {} },
    { type: 'separator' },
    { type: 'label', text: 'Danger Zone' },
    { type: 'item', label: 'Delete account', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Disabled Items',
          description: 'Disabled items are muted and non-interactive — use for permission-gated actions.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details',  icon: <Eye size={14} />,      onClick: () => {} },
                { type: 'item', label: 'Edit',          icon: <Edit size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Share',         icon: <Share2 size={14} />,   disabled: true },
                { type: 'item', label: 'Export report', icon: <FileText size={14} />, onClick: () => {} },
                { type: 'item', label: 'Delete',        icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Manage ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View details</DropdownMenuItem>
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem disabled><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />Export report</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Manage ▾" />}
  items={[
    { type: 'item', label: 'Edit', onClick: () => {} },
    { type: 'item', label: 'Share', disabled: true },
    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Destructive Item',
          description: 'Destructive item in crimson red with hover background tint — for irreversible actions.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Account ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'Profile settings', icon: <User size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Billing',           icon: <FileText size={14} />, onClick: () => {} },
                { type: 'separator' },
                { type: 'item', label: 'Sign out',          icon: <LogOut size={14} />,   onClick: () => {} },
                { type: 'separator' },
                { type: 'item', label: 'Delete account',    icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Account ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  items={[
    { type: 'item', label: 'Sign out', onClick: () => {} },
    { type: 'separator' },
    { type: 'item', label: 'Delete account', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'Icon Button Trigger',
          description: 'Trigger is a ⋯ icon button — the overflow menu pattern.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={
                <button
                  type="button"
                  style={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    background: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '2px 2px 0 #191b1f',
                  }}
                >
                  <MoreHorizontal size={18} />
                </button>
              }
              align="end"
              items={[
                { type: 'item', label: 'Edit',   icon: <Edit size={14} />,   onClick: () => {} },
                { type: 'item', label: 'Delete', icon: <Trash2 size={14} />, destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={
    <button style={{ width: 36, height: 36, border: '2px solid #3b3d3f', borderRadius: 6 }}>
      <MoreHorizontal size={18} />
    </button>
  }
  align="end"
  items={[
    { type: 'item', label: 'Edit', icon: <Edit size={14} />, onClick: () => {} },
    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
