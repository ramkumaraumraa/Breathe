import { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/app/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/molecules/dropdown-menu'
import { cn } from '@/app/components/shared/utils'

export interface FabAction {
  label: string
  icon: ReactNode
  onClick: () => void
}

interface MobileFabProps {
  /** Single-action: tapping the FAB calls this directly */
  onClick?: () => void
  /** Multi-action: FAB opens a dropdown menu instead */
  actions?: FabAction[]
  /** Icon inside the FAB button. Defaults to Plus. */
  icon?: ReactNode
  className?: string
}

/**
 * Fixed-position floating action button — visible only on mobile (md:hidden).
 *
 * - Pass `onClick` for a single primary action (e.g. Add Expense).
 * - Pass `actions` for a dropdown menu of quick actions (e.g. Dashboard).
 *
 * Positioned above the page fold (bottom-6) since there is no bottom nav bar.
 */
export function MobileFab({ onClick, actions, icon, className }: MobileFabProps) {
  if (actions && actions.length > 0) {
    return (
      <div className={cn('fixed bottom-6 right-4 z-50 md:hidden', className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-brand-hover transition-transform hover:scale-105 active:scale-95"
            >
              {icon ?? <Plus className="h-6 w-6 text-primary-foreground" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mb-2 w-48">
            {actions.map((action) => (
              <DropdownMenuItem key={action.label} onClick={action.onClick} className="gap-2">
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className={cn('fixed bottom-6 right-4 z-50 md:hidden', className)}>
      <Button
        type="button"
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onClick}
      >
        {icon ?? <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
