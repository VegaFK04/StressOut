import * as React from 'react'
import { Switch } from '@radix-ui/react-switch'
import { cn } from '@/utils/format'

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Switch> {}

const SwitchComponent = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <Switch
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'bg-muted peer-checked:bg-primary peer-focus-visible:ring-ring',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
SwitchComponent.displayName = 'Switch'

export { SwitchComponent as Switch }
