import * as React from 'react'
import {
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  Eye,
  Download,
  FileText,
  PenLine,
  Users,
  User,
  Activity,
  Database,
  Cpu,
  BarChart3,
  LayoutDashboard,
  ArrowRight,
  Lock,
  AlertCircle,
  Info,
  Calendar,
  Coffee,
  Keyboard,
  Camera,
  Mic,
  Mail,
  TrendingUp,
  Monitor,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import { useLocalState } from '@/hooks/useLocalState'

const ANALYZED_ITEMS = [
  { label: 'Tiempo activo', icon: Activity },
  { label: 'Tiempo inactivo', icon: Clock },
  { label: 'Horarios', icon: Calendar },
  { label: 'Pausas', icon: Coffee },
  { label: 'Uso agregado de aplicaciones', icon: LayoutDashboard },
  { label: 'Patrones de actividad', icon: BarChart3 },
  { label: 'Cambios respecto al patrón personal', icon: AlertCircle },
  { label: 'Tendencias laborales', icon: TrendingUp },
]

const NEVER_COLLECTED_ITEMS = [
  { label: 'Contenido de teclado', icon: Keyboard },
  { label: 'Contraseñas', icon: Lock },
  { label: 'Capturas de pantalla', icon: Monitor },
  { label: 'Cámara', icon: Camera },
  { label: 'Micrófono', icon: Mic },
  { label: 'Correos', icon: Mail },
  { label: 'Mensajes', icon: MessageSquare },
  { label: 'Archivos personales', icon: FileText },
]

const PIPELINE_STEPS = [
  { label: 'PC del empleado', icon: Monitor },
  { label: 'Métricas agregadas', icon: Database },
  { label: 'Procesamiento', icon: Cpu },
  { label: 'Análisis', icon: BarChart3 },
  { label: 'Dashboard', icon: LayoutDashboard },
]

const ROLES = [
  { role: 'Empleado', scope: 'Solo sus propios datos', detail: 'Acceso completo a métricas personales, historial, alertas propias y ejercicios recomendados' },
  { role: 'Supervisor', scope: 'Miembros autorizados de su equipo', detail: 'Visibilidad agregada de bienestar del equipo, alertas de sus reportes directos, sin acceso a detalle individual sin consentimiento' },
  { role: 'RRHH', scope: 'Empleados y tendencias autorizadas', detail: 'Acceso a reportes anonimizados, tendencias departamentales, alertas críticas escaladas, cumplimiento normativo' },
  { role: 'Administrador', scope: 'Configuración y permisos', detail: 'Gestión de roles, políticas de retención, auditoría de accesos, configuración de umbrales, sin acceso a datos personales' },
]

const RIGHTS = [
  { key: 'access', label: 'Consultar mis datos', icon: Eye, description: 'Ver qué datos se han procesado y qué métricas se derivan de tu actividad' },
  { key: 'download', label: 'Descargar mis datos', icon: Download, description: 'Obtener una copia portable de tus métricas y reportes en formato estándar' },
  { key: 'correction', label: 'Solicitar corrección', icon: PenLine, description: 'Reportar inexactitudes en los datos procesados para su revisión y ajuste' },
]

export function PrivacyPage() {
  const [rightsActions, setRightsActions] = useLocalState<Record<string, string>>('privacy_rights_actions', {})

  const handleRightAction = (key: string) => {
    const timestamp = new Date().toLocaleString('es-ES')
    setRightsActions({ ...rightsActions, [key]: timestamp })
  }

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Privacidad y transparencia</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Stress Out analiza métricas agregadas de actividad digital para ofrecer indicadores de bienestar laboral.
          No capturamos contenido, no grabamos pantalla, no accedemos a comunicaciones privadas. Esta página explica
          exactamente qué se analiza, qué nunca se recopila, quién accede a los datos y qué derechos tienes.
        </p>
      </div>

      {/* Two card sections: Analyzed vs Never Collected */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Lo que analizamos */}
        <Card className="border-emerald-200 dark:border-emerald-900/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <CardTitle className="text-emerald-700 dark:text-emerald-300">Lo que analizamos</CardTitle>
            </div>
            <CardDescription>
              Métricas agregadas y anonimizadas derivadas de la actividad digital en horario laboral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ANALYZED_ITEMS.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">{item.label}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lo que nunca recopilamos */}
        <Card className="border-red-200 dark:border-red-900/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              <CardTitle className="text-red-700 dark:text-red-300">Lo que nunca recopilamos</CardTitle>
            </div>
            <CardDescription>
              Datos sensibles que quedan fuera del alcance del análisis por diseño
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {NEVER_COLLECTED_ITEMS.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-red-800 dark:text-red-200">{item.label}</span>
                <XCircle className="h-4 w-4 text-red-500 ml-auto" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Horario de análisis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            <CardTitle>Horario de análisis</CardTitle>
          </div>
          <CardDescription>
            El procesamiento de métricas solo se ejecuta dentro del horario laboral configurado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-lg">Lunes a viernes</p>
                <p className="text-sm text-muted-foreground">08:00 - 18:00 (hora local)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Fuera de este horario no se procesa ni almacena actividad</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual pipeline diagram */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Shield className="h-5 w-5" />
            <CardTitle>Flujo de datos: del dispositivo al dashboard</CardTitle>
          </div>
          <CardDescription>
            Cada paso está diseñado para minimizar exposición y maximizar agregación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max px-2 py-4">
              {PIPELINE_STEPS.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                      <step.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium text-center max-w-[100px]">{step.label}</span>
                  </div>
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="flex items-center text-muted-foreground px-2">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-5 text-xs text-muted-foreground">
            {PIPELINE_STEPS.map((step, index) => (
              <div key={index} className="text-center p-2 bg-muted/50 rounded">
                <p className="font-medium text-foreground">{step.label}</p>
                <p className="mt-1">
                  {index === 0 && 'Actividad local en el dispositivo del empleado'}
                  {index === 1 && 'Solo contadores y timestamps, sin contenido'}
                  {index === 2 && 'Agregación, anonimización y filtrado horario'}
                  {index === 3 && 'Modelos estadísticos sobre datos agregados'}
                  {index === 4 && 'Visualización de tendencias y alertas para roles autorizados'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ¿Quién puede ver mis datos? */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <CardTitle>¿Quién puede ver mis datos?</CardTitle>
          </div>
          <CardDescription>
            Acceso basado en roles con principio de menor privilegio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Matriz de acceso a datos por rol. Todos los accesos son auditables.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Rol</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Detalle de acceso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROLES.map((role, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {index === 0 && <User className="h-4 w-4" />}
                        {index === 1 && <Users className="h-4 w-4" />}
                        {index === 2 && <Shield className="h-4 w-4" />}
                        {index === 3 && <Lock className="h-4 w-4" />}
                      </div>
                      {role.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{role.scope}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">{role.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mis derechos */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            <CardTitle>Mis derechos</CardTitle>
          </div>
          <CardDescription>
            Ejercita tus derechos sobre los datos procesados (simulación con localStorage)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {RIGHTS.map((right) => (
            <div
              key={right.key}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <right.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{right.label}</p>
                  <p className="text-xs text-muted-foreground">{right.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRightAction(right.key)}
                  className="gap-1"
                >
                  <right.icon className="h-3.5 w-3.5" />
                  {right.label}
                </Button>
                {rightsActions[right.key] && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Última vez: {rightsActions[right.key]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disclaimer note */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/30 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-semibold">Nota importante:</p>
          <p className="mt-1">
            Stress Out proporciona indicadores analíticos basados en métricas agregadas de actividad digital y
            <strong> no sustituye la evaluación humana</strong>. Los resultados son orientativos para la gestión
            preventiva de bienestar laboral y deben contextualizarse por personas cualificadas.
          </p>
          <p className="mt-2 text-xs">
            No hay captura real de actividad, no hay backend real, todos los datos son simulados para demostración.
          </p>
        </div>
      </div>
    </div>
  )
}
