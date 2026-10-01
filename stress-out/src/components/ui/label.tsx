import * as React from 'react'
import { cn } from '@/utils/format'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, htmlFor, ...props }, ref) => (
  <label
    className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className)}
    htmlFor={htmlFor}
    ref={ref}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
