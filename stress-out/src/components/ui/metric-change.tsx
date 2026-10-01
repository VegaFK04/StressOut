import * as React from 'react'
import { cn } from '@/utils/format'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricChangeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  previousValue?: number
  prefix?: string
  suffix?: string
  className?: string
}

const MetricChange = React.forwardRef<HTMLDivElement, MetricChangeProps>(
  ({ className, value, previousValue, prefix, suffix, ...props }, ref) => {
    const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0
    const isPositive = change > 0
    const isNegative = change < 0
    const isNeutral = change === 0

    const ChangeIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown

    return (
      <div className={cn('inline-flex items-center gap-1', className)} ref={ref} {...props}>
        <span className="font-semibold">{prefix}{value}{suffix}</span>
        <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', isPositive && 'text-emerald-600', isNegative && 'text-red-600', isNeutral && 'text-gray-500')}>
          <ChangeIcon className="h-3 w-3" />
          {change > 0 && '+'}
          {change.toFixed(1)}%
        </span>
      </div>
    )
  }
)
MetricChange.displayName = 'MetricChange'
export { MetricChange }
