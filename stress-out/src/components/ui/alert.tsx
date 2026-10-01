import * as React from 'react'
import { cn } from '@/utils/format'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

const alertVariants: Record<'default' | 'destructive' | 'success' | 'info', { className: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  default: { className: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200', Icon: AlertTriangle },
  destructive: { className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200', Icon: AlertTriangle },
  success: { className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200', Icon: CheckCircle },
  info: { className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200', Icon: Info },
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
  className?: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { className: variantClassName, Icon } = alertVariants[variant]
    return (
      <div
        className={cn(
          'flex w-full items-center gap-3 rounded-md border px-3 py-2 text-sm',
          variantClassName,
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">{children}</div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      ref={ref}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      className={cn('text-sm opacity-90', className)}
      ref={ref}
      {...props}
    />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
