import * as React from 'react'
import { Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarNavItem } from '@/components/ui/sidebar-nav-item'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/utils/format'

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Inicio' },
  { to: '/employees', icon: <Users className="h-5 w-5" />, label: 'Empleados' },
  { to: '/analytics', icon: <BarChart3 className="h-5 w-5" />, label: 'Analítica' },
  { to: '/alerts', icon: <Bell className="h-5 w-5" />, label: 'Alertas' },
  { to: '/privacy', icon: <Shield className="h-5 w-5" />, label: 'Privacidad' },
  { to: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Configuración' },
  { to: '/design-system', icon: <Palette className="h-5 w-5" />, label: 'Design System' },
]

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isLoggedOut, setIsLoggedOut] = React.useState(false)

  if (isLoggedOut) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Sesión cerrada</h1>
          <p className="text-muted-foreground">Has cerrado sesión correctamente.</p>
          <a href="/login">
            <Button>Volver al inicio de sesión</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside
        className={cn(
          'border-r flex flex-col transition-all duration-200',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!sidebarCollapsed && (
            <span className="text-lg font-bold">Stress Out</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} to={item.to} icon={item.icon}>
              {!sidebarCollapsed && item.label}
            </SidebarNavItem>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <Avatar name="Marina Solís" />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Marina Solís</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLoggedOut(true)}
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Stress Out</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Simulated data</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
