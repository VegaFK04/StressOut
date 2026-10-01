import * as React from 'react'
import { cn } from '@/utils/format'

const tableVariants = {
  default: 'w-full caption-bottom text-sm',
  striped: 'w-full caption-bottom text-sm',
} as const

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean
  className?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-md border">
      <table
        className={cn(
          tableVariants[striped ? 'striped' : 'default'],
          striped && '[&_tr]:not(:last-child):border-b',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'thead'>>((props, ref) => (
  <thead ref={ref} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tbody'>>((props, ref) => (
  <tbody ref={ref} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tfoot'>>((props, ref) => (
  <tfoot ref={ref} {...props} />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>((props, ref) => (
  <tr
    ref={ref}
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'th'>>((props, ref) => (
  <th
    ref={ref}
    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'td'>>((props, ref) => (
  <td
    ref={ref}
    className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<'caption'>>((props, ref) => (
  <caption ref={ref} className="p-4 text-left text-sm text-muted-foreground" {...props} />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
