import * as React from 'react'
import { cn } from '@/utils/format'
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const severityConfig = {
  healthy: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50/50',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600',
  },
  info: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50/50',
    icon: Info,
    iconColor: 'text-blue-600',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50/50',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  critical: {
    border: 'border-l-orange-500',
    bg: 'bg-orange-50/50',
    icon: AlertCircle,
    iconColor: 'text-orange-600',
  },
} as const

interface AlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  severity?: 'healthy' | 'info' | 'warning' | 'critical'
  status?: string
  onAction?: () => void
  actionLabel?: string
}

const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
  ({ className, title, description, severity = 'info', onAction, actionLabel, ...props }, ref) => {
    const config = severityConfig[severity]
    const Icon = config.icon

    return (
      <div
        className={cn(
          'rounded-lg border border-l-4 bg-card p-4 shadow-sm',
          config.border,
          config.bg,
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-start gap-3">
          <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {onAction && actionLabel && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={onAction}>
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
AlertCard.displayName = 'AlertCard'

export { AlertCard }
