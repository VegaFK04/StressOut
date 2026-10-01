import * as React from 'react'
import { Separator } from '@radix-ui/react-separator'
import { cn } from '@/utils/format'

const SeparatorComp = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <Separator
    className={cn(
      orientation === 'horizontal'
        ? 'h-px w-full shrink-0 bg-border'
        : 'h-full w-px shrink-0 bg-border',
      className
    )}
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    {...props}
  />
))
SeparatorComp.displayName = Separator.displayName

export { SeparatorComp as Separator }
