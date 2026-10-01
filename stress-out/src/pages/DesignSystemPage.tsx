import * as React from 'react'
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
