import * as React from 'react'
import { Progress as PrimitiveProgress } from '@radix-ui/react-progress'
import { cn } from '@/utils/format'

const Progress = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof PrimitiveProgress>
>(({ className, value, ...props }, ref) => (
  <PrimitiveProgress
    className={cn('h-2 w-full overflow-hidden rounded-xs bg-muted', className)}
    ref={ref}
    value={value}
    {...props}
  />
))
Progress.displayName = PrimitiveProgress.displayName

export { Progress }
