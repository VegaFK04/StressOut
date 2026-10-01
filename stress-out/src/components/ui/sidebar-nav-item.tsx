import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/format'

interface SidebarNavItemProps {
  to: string
  icon: React.ReactNode
  children: React.ReactNode
}

export function SidebarNavItem({ to, icon, children }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'hover:bg-muted hover:text-foreground'
        )
      }
    >
      {icon}
      {children}
    </NavLink>
  )
}
