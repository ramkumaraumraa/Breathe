import { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../molecules/dropdown-menu'
import { cn } from '../lib/utils'

export interface FabAction {
  label: string
  icon: ReactNode
  onClick: () => void
}

interface MobileFabProps {
  onClick?: () => void
  actions?: FabAction[]
  icon?: ReactNode
  className?: string
}

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
                <span>{action.label}</span>
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
        className="h-14 w-14 rounded-full p-0 shadow-lg"
        onClick={onClick}
      >
        {icon ?? <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
