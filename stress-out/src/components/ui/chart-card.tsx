import * as React from "react"
import { cn } from "@/utils/format"

interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
}

const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(
  ({ className, title, description, children, footer, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}
        ref={ref}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="flex-1">{children}</div>
        {footer && <div className="mt-4 border-t pt-4">{footer}</div>}
      </div>
    )
  }
)
ChartCard.displayName = "ChartCard"

export { ChartCard }