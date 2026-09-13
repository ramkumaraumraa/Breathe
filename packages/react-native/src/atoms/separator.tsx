import * as SeparatorPrimitive from '@rn-primitives/separator';
import * as React from 'react';
import { cn } from '../lib/utils';

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>;

function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      {...props}
    />
  );
}

export { Separator };
export type { SeparatorProps };
