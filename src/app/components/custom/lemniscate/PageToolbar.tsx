import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface PageToolbarProps {
  /** Left slot: filters, period tabs, date selectors */
  left?: ReactNode
  /** Right slot: export buttons, secondary actions */
  right?: ReactNode
  className?: string
}

/**
 * Toolbar row that sits between the page header and content.
 * Left and right slots wrap independently on small screens so
 * the row never forces horizontal overflow on tablet/mobile.
 */
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
