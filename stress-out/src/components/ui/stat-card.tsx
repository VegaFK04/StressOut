import * as React from 'react'
import { cn } from '@/utils/format'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  icon?: React.ReactNode
  status?: 'healthy' | 'attention' | 'overload' | 'no-data' | 'paused'
  className?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, change, icon, status, ...props }, ref) => {
    const isPositive = change && change.value >= 0
    const isNeutral = change && change.value === 0
    const ChangeIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown

    return (
      <div
        className={cn(
          'rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {change && (
            <span
              className={cn(
                'flex items-center gap-0.5 text-xs font-medium',
                isPositive && 'text-emerald-600',
                !isPositive && !isNeutral && 'text-red-600',
                isNeutral && 'text-gray-500'
              )}
            >
              <ChangeIcon className="h-3 w-3" />
              {change.value > 0 && '+'}
              {change.value}%
            </span>
          )}
        </div>
        {change && (
          <p className="mt-1 text-xs text-muted-foreground">{change.label}</p>
        )}
      </div>
    )
  }
)
StatCard.displayName = 'StatCard'

export { StatCard }
