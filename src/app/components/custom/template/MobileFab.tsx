import { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { cn } from '@/app/components/ui/utils'

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
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {icon ?? <Plus className="h-6 w-6 text-primary-foreground" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mb-2 w-48">
            {actions.map((action) => (
              <DropdownMenuItem key={action.label} onClick={action.onClick}>
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
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onClick}
      >
        {icon ?? <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
