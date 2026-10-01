import * as React from 'react'
import { cn } from '@/utils/format'
import { Progress } from '@/components/ui/progress'

interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'healthy' | 'attention' | 'overload' | 'neutral'
  className?: string
}

const colorClasses = {
  healthy: '[&>div]:bg-emerald-500',
  attention: '[&>div]:bg-amber-500',
  overload: '[&>div]:bg-orange-500',
  neutral: '[&>div]:bg-primary',
} as const

const heightClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ className, value, label, showValue = true, size = 'md', color = 'neutral', ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value))

    return (
      <div className={cn('space-y-1', className)} ref={ref} {...props}>
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && <span className="text-sm text-muted-foreground">{clampedValue}%</span>}
        </div>
        <Progress
          value={clampedValue}
          className={cn(heightClasses[size], colorClasses[color])}
        />
      </div>
    )
  }
)
ProgressIndicator.displayName = 'ProgressIndicator'

export { ProgressIndicator }