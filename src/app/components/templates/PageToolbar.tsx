import { ReactNode } from 'react'
import { cn } from '@/app/components/shared/utils'

interface PageToolbarProps {
  left?: ReactNode
  right?: ReactNode
  className?: string
}

export function PageToolbar({ left, right, className }: PageToolbarProps) {
  return (
    <div className={cn('flex items-center gap-3 justify-between flex-wrap', className)}>
      {left && (
        <div className="flex items-center gap-3 flex-wrap">
          {left}
        </div>
      )}
      {right && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {right}
        </div>
      )}
    </div>
  )
}
