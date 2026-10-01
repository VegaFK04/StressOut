import * as React from 'react'
import {
  Settings,
  Building,
  Users,
  Shield,
  Clock,
  Bell,
  Eye,
  User,
  Calendar,
  Check,
  X,
  ChevronRight,
  BarChart3,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/format'

type Section = 'perfil' | 'empresa' | 'usuarios' | 'permisos' | 'monitoreo' | 'privacidad' | 'notificaciones'

interface NavItem {
  id: Section
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'perfil', label: 'Perfil', icon: <User className="h-5 w-5" /> },
  { id: 'empresa', label: 'Empresa', icon: <Building className="h-5 w-5" /> },
  { id: 'usuarios', label: 'Usuarios', icon: <Users className="h-5 w-5" /> },
  { id: 'permisos', label: 'Permisos', icon: <Shield className="h-5 w-5" /> },
  { id: 'monitoreo', label: 'Monitoreo', icon: <Clock className="h-5 w-5" /> },
  { id: 'privacidad', label: 'Privacidad', icon: <Eye className="h-5 w-5" /> },
  { id: 'notificaciones', label: 'Notificaciones', icon: <Bell className="h-5 w-5" /> },
]

interface PermissionRow {
  role: string
  roleDescription: string
  manageAll: boolean
  viewEmployees: boolean
  viewAnalytics: boolean
  viewTeam: boolean
  viewOwnData: boolean
}

const permissionColumns: { key: keyof PermissionRow; label: string; icon: React.ReactNode }[] = [
  { key: 'manageAll', label: 'Gestión total', icon: <Check className="h-4 w-4" /> },
  { key: 'viewEmployees', label: 'Ver empleados', icon: <Users className="h-4 w-4" /> },
  { key: 'viewAnalytics', label: 'Análisis', icon: <BarChart3 className="h-4 w-4" /> },
  { key: 'viewTeam', label: 'Ver equipo', icon: <Users className="h-4 w-4" /> },
  { key: 'viewOwnData', label: 'Ver propios datos', icon: <Eye className="h-4 w-4" /> },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState<Section>('perfil')

  // Perfil / Company profile (local state - ready for backend integration)
  const [companyName, setCompanyName] = React.useState('Nexa Solutions')
  const [industry, setIndustry] = React.useState('Tecnología')
  const [location, setLocation] = React.useState('Madrid, España')
  const [teamSize, setTeamSize] = React.useState('50-100')

  // Permisos - Role-based permissions matrix (local state - ready for backend integration)
  const [permissions, setPermissions] = React.useState<PermissionRow[]>([
    { role: 'Administrador', roleDescription: 'Gestión total', manageAll: true, viewEmployees: true, viewAnalytics: true, viewTeam: true, viewOwnData: true },
    { role: 'RRHH', roleDescription: 'Consulta de empleados y análisis', manageAll: false, viewEmployees: true, viewAnalytics: true, viewTeam: false, viewOwnData: false },
    { role: 'Supervisor', roleDescription: 'Consulta de su equipo', manageAll: false, viewEmployees: false, viewAnalytics: false, viewTeam: true, viewOwnData: false },
    { role: 'Emabajados', roleDescription: 'Solo sus propios datos', manageAll: false, viewEmployees: false, viewAnalytics: false, viewTeam: false, viewOwnData: true },
  ])

  // Monitoreo - Analysis schedule (local state - ready for backend integration)
  const [startTime, setStartTime] = React.useState('08:00')
  const [endTime, setEndTime] = React.useState('18:00')
  const [scheduleDays, setScheduleDays] = React.useState<Record<string, boolean>>({
    lunes: true,
    martes: true,
    miércoles: true,
    jueves: true,
    viernes: true,
  })

  // Notificaciones - Alert preferences (local state - ready for backend integration)
  const [alertOverload, setAlertOverload] = React.useState(false)
  const [alertPattern, setAlertPattern] = React.useState(false)
  const [alertOvertime, setAlertOvertime] = React.useState(false)
  const [alertProductivity, setAlertProductivity] = React.useState(false)

  const handleSave = () => {
    console.log('Configuration saved')
  }

  const toggleDay = (day: string) => {
    setScheduleDays((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const togglePermission = (index: number, field: keyof PermissionRow) => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: !p[field] } : p)),
    )
  }

  const activeAlerts = [alertOverload, alertPattern, alertOvertime, alertProductivity].filter(Boolean).length

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Left sidebar navigation with 7 sections */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración empresarial
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona la configuración de tu organización
          </p>
        </div>
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                activeSection === item.id
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted hover:text-foreground text-muted-foreground',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Configuración empresarial
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Administra los parámetros y preferencias de tu organización
            </p>
          </div>
          <Button onClick={handleSave}>
            <Check className="h-4 w-4 mr-2" />
            Guardar cambios
          </Button>
        </div>

        {/* Perfil Section */}
        {activeSection === 'perfil' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Perfil de la empresa
                  </CardTitle>
                  <CardDescription>
                    Información corporativa editable
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre de la empresa</label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industria</label>
                    <Input
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="Industria"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ubicación</label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ubicación"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tamaño del equipo</label>
                    <Input
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      placeholder="Tamaño del equipo"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Resumen organizacional
                  </CardTitle>
                  <CardDescription>
                    Estadísticas generales de la empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Nombre</span>
                    </div>
                    <span className="text-sm font-medium">{companyName}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Industria</span>
                    </div>
                    <span className="text-sm font-medium">{industry}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Ubicación</span>
                    </div>
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Equipo</span>
                    </div>
                    <span className="text-sm font-medium">{teamSize}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    <Check className="h-3 w-3 mr-1" />
                    Configuración activa
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empresa Section */}
        {activeSection === 'empresa' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Configuración de empresa
              </CardTitle>
              <CardDescription>
                Ajustes generales de la organización
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre legal</label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sector</label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tamaño del equipo</label>
                <Input value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
              </div>
              <p className="text-sm text-muted-foreground">
                Estructura lista para integración con backend mediante API endpoints.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Usuarios Section */}
        {activeSection === 'usuarios' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de usuarios
              </CardTitle>
              <CardDescription>
                Administra los usuarios y sus roles en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Usuario administrador</p>
                    <p className="text-xs text-muted-foreground">Rol: Administrador</p>
                  </div>
                </div>
                <Badge>Activo</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Usuario RRHH</p>
                    <p className="text-xs text-muted-foreground">Rol: RRHH</p>
                  </div>
                </div>
                <Badge variant="secondary">Activo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                La gestión de usuarios está preparada para integración con el backend de autenticación.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Permisos Section */}
        {activeSection === 'permisos' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Matriz de permisos por rol
              </CardTitle>
              <CardDescription>
                Define qué acciones puede realizar cada rol en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium">Rol</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Descripción</th>
                      {permissionColumns.map((col) => (
                        <th key={col.key} className="text-center py-3 px-4 text-sm font-medium">
                          <span className="inline-flex items-center gap-1">{col.icon}{col.label}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((p, index) => (
                      <tr key={p.role} className="border-b last:border-0">
                        <td className="py-3 px-4 text-sm font-medium">{p.role}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{p.roleDescription}</td>
                        {permissionColumns.map((col) => (
                          <td key={col.key} className="py-3 px-4 text-center">
                            {p[col.key] ? (
                              <Check className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Los permisos se almacenan localmente y están listos para sincronización con el backend.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Monitoreo Section */}
        {activeSection === 'monitoreo' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Programación de análisis
              </CardTitle>
              <CardDescription>
                Configura el horario y días de análisis de estrés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hora de inicio</label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hora de fin</label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Días de análisis</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(scheduleDays) as [string, boolean][]).map(([day, isEnabled]) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-colors capitalize',
                        isEnabled
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-muted text-muted-foreground hover:bg-muted',
                      )}
                    >
                      {isEnabled ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    Análisis programado: {startTime} - {endTime}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Object.entries(scheduleDays)
                      .filter(([, v]) => v)
                      .map(([d]) => d.charAt(0).toUpperCase() + d.slice(1))
                      .join(', ')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                La programación está lista para conexión con el servicio de backend de monitoreo.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Privacidad Section */}
        {activeSection === 'privacidad' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Configuración de privacidad
              </CardTitle>
              <CardDescription>
                Controla las preferencias de privacidad y manejo de datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Captura de actividad</p>
                  <p className="text-xs text-muted-foreground">Permite el rastreo de actividades del usuario</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Anonimización de datos</p>
                  <p className="text-xs text-muted-foreground">Los datos se anonimizan después de 30 días</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Retención de datos</p>
                  <p className="text-xs text-muted-foreground">Almacena datos por un período limitado</p>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-muted-foreground">
                La configuración de privacidad está preparada para integración con el backend de cumplimiento GDPR.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Notificaciones Section */}
        {activeSection === 'notificaciones' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferencias de alertas
              </CardTitle>
              <CardDescription>
                Configura qué tipo de alertas recibirás
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <AlertIcon className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Posible sobrecarga</p>
                    <p className="text-xs text-muted-foreground">
                      Alerta cuando un usuario se acerca a su límite de carga de trabajo
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alertOverload}
                  onCheckedChange={setAlertOverload}
                  name="alert-overload"
                  aria-label="Alerta de posible sobrecarga"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <TrendUpIcon className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Cambios de patrón</p>
                    <p className="text-xs text-muted-foreground">
                      Notifica sobre cambios significativos en los patrones de comportamiento
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alertPattern}
                  onCheckedChange={setAlertPattern}
                  name="alert-pattern"
                  aria-label="Alerta de cambios de patrón"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Horas extra</p>
                    <p className="text-xs text-muted-foreground">
                      Alerta sobre acumulación de horas extra no programadas
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alertOvertime}
                  onCheckedChange={setAlertOvertime}
                  name="alert-overtime"
                  aria-label="Alerta de horas extra"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <TrendingDownIcon className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Disminución de productividad</p>
                    <p className="text-xs text-muted-foreground">
                      Notifica cuando se detecta una caída significativa en la productividad
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alertProductivity}
                  onCheckedChange={setAlertProductivity}
                  name="alert-productivity"
                  aria-label="Alerta de disminución de productividad"
                />
              </div>
              <Badge variant="secondary" className="mt-2">
                <Check className="h-3 w-3 mr-1" />
                {activeAlerts} de 4 alertas activas
              </Badge>
              <p className="text-sm text-muted-foreground">
                Las preferencias de notificaciones están almacenadas localmente y listas para sincronización con el backend.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

// Helper icon components for notification alert types
function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function TrendUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function TrendingDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}
