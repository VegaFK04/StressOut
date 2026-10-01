import * as React from "react"
import { cn } from "@/utils/format"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FilterOption {
  label: string
  value: string
  active: boolean
}

interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterOption[]
  onFilterChange?: (filter: string) => void
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  className?: string
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ className, filters, onFilterChange, searchPlaceholder = "Search...", onSearch, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-4", className)} ref={ref} {...props}>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange?.(filter.value)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                filter.active
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
      </div>
    )
  }
)
FilterBar.displayName = "FilterBar"

export { FilterBar }