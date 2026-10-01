import * as React from 'react'
import { cn } from '@/utils/format'

const badgeVariants = {
  default: 'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  secondary: 'inline-flex items-center rounded-md border border-secondary bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-medium',
  outline: 'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
  destructive: 'inline-flex items-center rounded-md border bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-medium',
  // Success variant removed as it used hardcoded colors; use StatusBadge or custom styling for success states
} as const

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
  className?: string
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      className={cn(badgeVariants[variant], className)}
      ref={ref}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge }
