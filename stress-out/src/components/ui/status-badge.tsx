import * as React from 'react'
import { cn } from '@/utils/format'
import { CheckCircle2, AlertCircle, AlertTriangle, Circle, PauseCircle } from 'lucide-react'

const statusConfig = {
  healthy: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Icon: CheckCircle2,
  },
  attention: {
    dot: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    Icon: AlertCircle,
  },
  overload: {
    dot: 'bg-orange-500',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    Icon: AlertTriangle,
  },
  'no-data': {
    dot: 'bg-gray-400',
    badge: 'bg-gray-50 text-gray-500 border-gray-200',
    Icon: Circle,
  },
  paused: {
    dot: 'bg-purple-500',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    Icon: PauseCircle,
  },
} as const

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'healthy' | 'attention' | 'overload' | 'no-data' | 'paused'
  size?: 'sm' | 'md' | 'lg'
  showDot?: boolean
  showIcon?: boolean
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, size = 'md', showDot = true, showIcon = false, ...props }, ref) => {
    const config = statusConfig[status]
    const Icon = config.Icon
    const sizeClasses = {
      sm: 'px-1.5 py-0.5 text-[10px]',
      md: 'px-2 py-0.5 text-xs',
      lg: 'px-2.5 py-1 text-sm',
    }
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-md border font-medium',
          config.badge,
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {showDot && <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />}
        {showIcon && <Icon className="h-3 w-3" />}
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </div>
    )
  }
)
StatusBadge.displayName = 'StatusBadge'

export { StatusBadge }
