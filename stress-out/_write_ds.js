import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const base = __dirname;

function writeFile(relativePath, content) {
  const fullPath = path.join(base, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Wrote:', relativePath);
}

const designSystemPageContent = `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/ui/status-badge'
import { StatCard } from '@/components/ui/stat-card'
import { MetricChange } from '@/components/ui/metric-change'
import { Avatar } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { SectionHeader } from '@/components/ui/section-header'
import { EmptyState } from '@/components/ui/empty-state'
import { Bell, Shield, Users, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

export function DesignSystemPage() {
  const [switchState, setSwitchState] = React.useState(true)
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div className="space-y-10 pb-12">
      <SectionHeader 
        title="Sistema de Diseño" 
        description="Componentes y directrices visuales de Stress Out para analítica laboral."
      />

      <Card>
        <CardHeader>
          <CardTitle>Tipografía</CardTitle>
          <CardDescription>Escala tipográfica utilizada en la aplicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Heading 1 (text-4xl)</h1>
            <p className="text-sm text-muted-foreground">Utilizado para títulos principales de página.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Heading 2 (text-3xl)</h2>
            <p className="text-sm text-muted-foreground">Utilizado para encabezados de sección destacados.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Heading 3 (text-2xl)</h3>
            <p className="text-sm text-muted-foreground">Utilizado para títulos de tarjetas y modales.</p>
          </div>
          <div>
            <p className="text-base leading-7">Body Text (text-base) - Texto principal utilizado en párrafos y descripciones generales de contenido dentro de las vistas analíticas.</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Small / Caption (text-sm) - Texto secundario, metadatos y etiquetas auxiliares.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Botones (Buttons)</CardTitle>
          <CardDescription>Variantes y tamaños disponibles para acciones de usuario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Variantes</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-3">Tamaños</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges y Estados</CardTitle>
          <CardDescription>Indicadores de estado y etiquetas de clasificación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Badges estándar</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-3">Badges de estado (StatusBadge)</p>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="healthy">Saludable</StatusBadge>
              <StatusBadge status="attention">Atención</StatusBadge>
              <StatusBadge status="overload">Sobrecarga</StatusBadge>
              <StatusBadge status="paused">Pausado</StatusBadge>
              <StatusBadge status="no-data">Sin datos</StatusBadge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tarjetas de Estadísticas y Métricas</CardTitle>
          <CardDescription>Componentes para visualización rápida de KPIs</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Total Empleados" 
            value="48" 
            icon={<Users className="h-5 w-5 text-accent" />}
            change={{ value: 5.4, label: "vs mes anterior" }}
          />
          <StatCard 
            title="Índice de Estrés Promedio" 
            value="42.5%" 
            icon={<Activity className="h-5 w-5 text-amber-500" />}
            change={{ value: -2.1, label: "vs mes anterior" }}
          />
          <StatCard 
            title="Productividad Global" 
            value="88.4%" 
            icon={<Shield className="h-5 w-5 text-emerald-500" />}
            change={{ value: 4.2, label: "vs semana pasada" }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Controles de Formularios</CardTitle>
          <CardDescription>Entradas de texto, etiquetas y conmutadores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="ds-input">Correo electrónico del empleado</Label>
            <Input 
              id="ds-input" 
              placeholder="ejemplo@empresa.com" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones automáticas de alertas</Label>
              <p className="text-xs text-muted-foreground">Recibir avisos cuando el nivel de estrés supere el umbral.</p>
            </div>
            <Switch checked={switchState} onCheckedChange={setSwitchState} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertas y Notificaciones</CardTitle>
          <CardDescription>Comentarios y avisos contextuales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sincronización exitosa</AlertTitle>
            <AlertDescription>Los datos de actividad laboral se han actualizado correctamente.</AlertDescription>
          </Alert>
          <Alert className="border-amber-500/50 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Advertencia de carga</AlertTitle>
            <AlertDescription>Se detectaron sesiones prolongadas sin pausas en el departamento de ingeniería.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pestañas (Tabs)</CardTitle>
          <CardDescription>Navegación por secciones internas</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="pt-4 text-sm text-muted-foreground">
              Contenido de la pestaña General. Visualización de parámetros globales de la organización.
            </TabsContent>
            <TabsContent value="activity" className="pt-4 text-sm text-muted-foreground">
              Contenido de la pestaña Actividad. Métricas de tecleo, sesiones activas y pausas.
            </TabsContent>
            <TabsContent value="security" className="pt-4 text-sm text-muted-foreground">
              Contenido de la pestaña Seguridad. Políticas de privacidad y anonimización de datos.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Avatares</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar name="Ana Gómez" className="h-8 w-8" />
            <Avatar name="Carlos Díaz" className="h-10 w-10" />
            <Avatar name="Elena Ruiz" className="h-12 w-12" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estado Vacío (Empty State)</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState 
              icon={<Bell className="h-8 w-8 text-muted-foreground" />}
              title="No hay alertas pendientes"
              description="Todo marcha según los parámetros normales de operación."
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cambio de Métrica (MetricChange)</CardTitle>
          <CardDescription>Componente para mostrar variaciones porcentuales</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <MetricChange value={1050} previousValue={1000} prefix="$" />
          <MetricChange value={92} previousValue={98} suffix="%" />
        </CardContent>
      </Card>
    </div>
  )
}
`;

const appTsContent = `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { EmployeesPage } from './pages/EmployeesPage'
import { EmployeeDetailPage } from './pages/EmployeeDetailPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { AlertsPage } from './pages/AlertsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { SettingsPage } from './pages/SettingsPage'
import { MePage } from './pages/MePage'
import { DesignSystemPage } from './pages/DesignSystemPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="me" element={<MePage />} />
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
`;

const appLayoutContent = `import * as React from 'react'
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
`;

writeFile('src/pages/DesignSystemPage.tsx', designSystemPageContent);
writeFile('src/App.tsx', appTsContent);
writeFile('src/layouts/AppLayout.tsx', appLayoutContent);
