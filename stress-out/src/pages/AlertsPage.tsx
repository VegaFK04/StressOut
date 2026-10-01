import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Shield,
  Info,
  X,
  Check,
  Search,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Eye,
  MessageSquare,
  Filter,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import { Avatar } from '@/components/ui/avatar'
import { getAlerts, getEmployees, getDepartments } from '@/services/mockDataService'
import { useLocalState } from '@/hooks/useLocalState'

export interface ExtendedAlert {
  id: string
  employeeId: string
  type: 'Posible sobrecarga' | 'Cambio de patrón' | 'Horas extra' | 'Reducción de pausas' | 'Disminución de productividad' | 'Datos insuficientes'
  title: string
  description: string
  severity: 'critical' | 'attention' | 'low'
  status: 'nueva' | 'revisada' | 'contextualizada' | 'descartada'
  createdAt: string
  metricsSummary?: string
}

const DEFAULT_ALERTS: ExtendedAlert[] = [
  {
    id: 'alt-1',
    employeeId: 'emp-1',
    type: 'Posible sobrecarga',
    title: 'Posible sobrecarga sostenida en Ingeniería',
    description: 'El empleado muestra 42 horas trabajadas con alta densidad de foco y escasa desconexión en los últimos 7 días.',
    severity: 'critical',
    status: 'nueva',
    createdAt: '2026-09-16T09:00:00Z',
    metricsSummary: 'Estrés 78% | Carga 85%',
  },
  {
    id: 'alt-2',
    employeeId: 'emp-2',
    type: 'Cambio de patrón',
    title: 'Cambio brusco en patrón de actividad nocturna',
    description: 'Se detectaron inicios de sesión recurrentes fuera del horario laboral habitual sin pausas intermedias.',
    severity: 'attention',
    status: 'revisada',
    createdAt: '2026-09-15T18:30:00Z',
    metricsSummary: 'Actividad fuera de hora +4.5h',
  },
  {
    id: 'alt-3',
    employeeId: 'emp-3',
    type: 'Horas extra',
    title: 'Acumulación de horas extra consecutivas',
    description: 'Superación del límite semanal de horas extra en el departamento de Operaciones y Soporte.',
    severity: 'critical',
    status: 'nueva',
    createdAt: '2026-09-16T11:15:00Z',
    metricsSummary: '12.5h extra esta semana',
  },
  {
    id: 'alt-4',
    employeeId: 'emp-4',
    type: 'Reducción de pausas',
    title: 'Reducción drástica en pausas de descanso',
    description: 'Promedio inferior a 15 minutos de pausa diaria en jornadas continuas de más de 8 horas.',
    severity: 'attention',
    status: 'contextualizada',
    createdAt: '2026-09-14T14:20:00Z',
    metricsSummary: 'Pausas promedio: 11 min/día',
  },
  {
    id: 'alt-5',
    employeeId: 'emp-5',
    type: 'Disminución de productividad',
    title: 'Disminución temporal de productividad reportada',
    description: 'Caída del 25% en la tasa de cierre de tareas frente al promedio histórico de los últimos 3 meses.',
    severity: 'low',
    status: 'descartada',
    createdAt: '2026-09-12T10:00:00Z',
    metricsSummary: 'Productividad 58%',
  },
  {
    id: 'alt-6',
    employeeId: 'emp-6',
    type: 'Datos insuficientes',
    title: 'Datos insuficientes para análisis preciso',
    description: 'El colaborador ha optado por privacidad estricta o actividad mínima, impidiendo generar métricas de bienestar concluyentes.',
    severity: 'low',
    status: 'nueva',
    createdAt: '2026-09-16T07:00:00Z',
    metricsSummary: 'Muestras < 3 días',
  },
]

export function AlertsPage() {
  const employees = getEmployees()
  const departments = getDepartments()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q')?.toLowerCase() ?? ''
  const tabFilter = searchParams.get('filter') ?? 'Todas'
  const typeFilter = searchParams.get('type') ?? ''

  const [alerts, setAlerts] = useLocalState<ExtendedAlert[]>('hr_alert_center_v2', DEFAULT_ALERTS)
  const [hrContextNotes, setHrContextNotes] = useLocalState<Record<string, string>>('hr_alert_context_notes', {})
  const [selectedAlert, setSelectedAlert] = React.useState<ExtendedAlert | null>(null)
  const [noteInput, setNoteInput] = React.useState('')
  const [successToast, setSuccessToast] = React.useState(false)

  React.useEffect(() => {
    if (!alerts || alerts.length === 0) {
      setAlerts(DEFAULT_ALERTS)
    }
  }, [])

  const filteredAlerts = alerts.filter((alert) => {
    const emp = employees.find((e) => e.id === alert.employeeId)
    const matchesSearch =
      (emp?.name.toLowerCase().includes(query) ?? false) ||
      alert.title.toLowerCase().includes(query) ||
      alert.description.toLowerCase().includes(query)

    const matchesType = typeFilter ? alert.type === typeFilter : true

    let matchesTab = true
    if (tabFilter === 'Críticas') {
      matchesTab = alert.severity === 'critical'
    } else if (tabFilter === 'Atención') {
      matchesTab = alert.severity === 'attention'
    } else if (tabFilter === 'Revisadas') {
      matchesTab = alert.status === 'revisada' || alert.status === 'contextualizada'
    } else if (tabFilter === 'Descartadas') {
      matchesTab = alert.status === 'descartada'
    }

    return matchesSearch && matchesType && matchesTab
  })

  const handleUpdateStatus = (alertId: string, newStatus: ExtendedAlert['status']) => {
    const updated = alerts.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    setAlerts(updated)
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert({ ...selectedAlert, status: newStatus })
    }
    setSuccessToast(true)
    setTimeout(() => setSuccessToast(false), 2000)
  }

  const handleSaveContextNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAlert || !noteInput.trim()) return
    const key = selectedAlert.id
    const updatedNotes = { ...hrContextNotes, [key]: noteInput.trim() }
    setHrContextNotes(updatedNotes)

    const updatedAlerts = alerts.map((a) =>
      a.id === selectedAlert.id ? { ...a, status: 'contextualizada' as const } : a
    )
    setAlerts(updatedAlerts)
    setSelectedAlert({ ...selectedAlert, status: 'contextualizada' })
    setNoteInput('')
    setSuccessToast(true)
    setTimeout(() => setSuccessToast(false), 2000)
  }

  const counts = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity === 'critical').length,
    attention: alerts.filter((a) => a.severity === 'attention').length,
    reviewed: alerts.filter((a) => a.status === 'revisada' || a.status === 'contextualizada').length,
    discarded: alerts.filter((a) => a.status === 'descartada').length,
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Centro de Alertas RRHH</h1>
          <p className="text-muted-foreground">
            Monitoreo preventivo de bienestar, patrones de carga y gestión respetuosa de incidencias.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {successToast && (
            <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4" /> Cambios guardados en localStorage
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        {[
          { label: 'Todas', count: counts.total },
          { label: 'Críticas', count: counts.critical },
          { label: 'Atención', count: counts.attention },
          { label: 'Revisadas', count: counts.reviewed },
          { label: 'Descartadas', count: counts.discarded },
        ].map((tab) => {
          const isActive = tabFilter === tab.label
          return (
            <button
              key={tab.label}
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.set('filter', tab.label)
                setSearchParams(params)
              }}
              className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ' + (
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{tab.label}</span>
              <span className={'px-1.5 py-0.5 rounded-full text-xs ' + (isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search & Type Filter Bar */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por colaborador, título o descripción..."
            value={query}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams)
              if (e.target.value) params.set('q', e.target.value)
              else params.delete('q')
              setSearchParams(params)
            }}
            className="pl-9"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams)
              if (e.target.value) params.set('type', e.target.value)
              else params.delete('type')
              setSearchParams(params)
            }}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Todos los tipos de alerta</option>
            <option value="Posible sobrecarga">Posible sobrecarga</option>
            <option value="Cambio de patrón">Cambio de patrón</option>
            <option value="Horas extra">Horas extra</option>
            <option value="Reducción de pausas">Reducción de pausas</option>
            <option value="Disminución de productividad">Disminución de productividad</option>
            <option value="Datos insuficientes">Datos insuficientes</option>
          </select>
        </div>
      </div>

      {/* Alerts Table */}
      <Card>
        <Table>
          <TableCaption>Mostrando {filteredAlerts.length} alertas registradas en el sistema.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Tipo de Alerta</TableHead>
              <TableHead>Título y Descripción</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => {
              const emp = employees.find((e) => e.id === alert.employeeId)
              const dept = departments.find((d) => d.id === emp?.departmentId)
              const hasNote = hrContextNotes[alert.id]

              return (
                <TableRow key={alert.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      <Avatar name={emp?.name ?? 'Colaborador'} />
                      <div>
                        <Link to={'/employees/' + alert.employeeId} className="font-medium hover:underline text-foreground">
                          {emp?.name ?? 'Desconocido'}
                        </Link>
                        <p className="text-xs text-muted-foreground">{dept?.name ?? 'Sin depto'}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {alert.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium text-sm">{alert.title}</div>
                    <p className="text-xs text-muted-foreground truncate">{alert.description}</p>
                    {hasNote && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded mt-1">
                        <MessageSquare className="h-3 w-3" /> Nota RRHH guardada
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === 'critical'
                          ? 'destructive'
                          : alert.severity === 'attention'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {alert.severity === 'critical' ? 'Crítica' : alert.severity === 'attention' ? 'Atención' : 'Baja'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ' + (
                      alert.status === 'nueva'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : alert.status === 'revisada'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : alert.status === 'contextualizada'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    )}>
                      {alert.status === 'nueva' ? 'Nueva' : alert.status === 'revisada' ? 'Revisada' : alert.status === 'contextualizada' ? 'Contextualizada' : 'Descartada'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedAlert(alert)} className="gap-1">
                        <Eye className="h-3.5 w-3.5" /> Detalle
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={'/employees/' + alert.employeeId}>
                          Perfil <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredAlerts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No hay alertas que coincidan con los filtros seleccionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Slide-over Detail Panel */}
      {selectedAlert && (() => {
        const emp = employees.find((e) => e.id === selectedAlert.employeeId)
        const dept = departments.find((d) => d.id === emp?.departmentId)
        const currentNote = hrContextNotes[selectedAlert.id] || ''

        return (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-end transition-all animate-fadeIn">
            <div className="bg-card w-full max-w-xl h-full shadow-2xl flex flex-col border-l overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {selectedAlert.type}
                  </span>
                  <h2 className="text-xl font-bold">{selectedAlert.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Employee Quick Info */}
              <div className="flex items-center justify-between bg-muted/40 p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar name={emp?.name ?? 'Colaborador'} />
                  <div>
                    <Link
                      to={'/employees/' + selectedAlert.employeeId}
                      className="font-bold hover:underline text-foreground flex items-center gap-1"
                    >
                      {emp?.name ?? 'Desconocido'} <ArrowRight className="h-3 w-3" />
                    </Link>
                    <p className="text-xs text-muted-foreground">{dept?.name ?? 'Sin depto'} &bull; {emp?.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={selectedAlert.severity === 'critical' ? 'destructive' : 'secondary'}
                  >
                    {selectedAlert.severity}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {new Date(selectedAlert.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>

              {/* Description & Metrics */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Descripción de la Incidencia
                </h3>
                <p className="text-sm leading-relaxed bg-muted/20 p-4 rounded-lg border">
                  {selectedAlert.description}
                </p>
                {selectedAlert.metricsSummary && (
                  <div className="flex items-center gap-2 text-xs font-medium bg-primary/5 text-primary p-3 rounded-lg border border-primary/10">
                    <TrendingUp className="h-4 w-4" /> Métrica analizada: {selectedAlert.metricsSummary}
                  </div>
                )}
              </div>

              {/* Status Manager */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Estado de la Alerta
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'nueva', label: 'Nueva' },
                    { id: 'revisada', label: 'Revisada' },
                    { id: 'contextualizada', label: 'Contextualizada' },
                    { id: 'descartada', label: 'Descartada' },
                  ].map((st) => (
                    <Button
                      key={st.id}
                      variant={selectedAlert.status === st.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedAlert.id, st.id as ExtendedAlert['status'])}
                      className="text-xs"
                    >
                      {st.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* El sistema puede estar equivocado */}
              <div className="rounded-lg border bg-indigo-500/5 border-indigo-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  <Shield className="h-4 w-4" /> El sistema puede estar equivocado
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Las alertas automáticas se basan en umbrales estadísticos de actividad y patrones digitales. No constituyen un diagnóstico clínico ni médico, y pueden activarse por variaciones legítimas de trabajo autónomo, entregas puntuales de proyectos o picos temporales de alta concentración.
                </p>
              </div>

              {/* Lo que el sistema no sabe */}
              <div className="rounded-lg border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                  <HelpCircle className="h-4 w-4" /> Lo que el sistema no sabe
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc">
                  <li>Situaciones personales o familiares temporales del colaborador.</li>
                  <li>Acuerdos previos de flexibilidad horaria o compensación de días libres.</li>
                  <li>Trabajo estratégico realizado fuera de la pantalla (lectura, planificación offline, mentoría).</li>
                  <li>Motivación intrínseca positiva frente a un reto apasionante de lanzamiento.</li>
                </ul>
              </div>

              {/* Context Note Persistence in localStorage */}
              <div className="space-y-3 pt-2 border-t">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Notas de Contexto RRHH (localStorage)
                </h3>
                {currentNote && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-xs space-y-1">
                    <span className="font-semibold text-amber-700 dark:text-amber-300">Nota guardada previamente:</span>
                    <p className="text-foreground">{currentNote}</p>
                  </div>
                )}
                <form onSubmit={handleSaveContextNote} className="space-y-3">
                  <textarea
                    rows={3}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Añadir contexto humano, acuerdo con el manager, o justificación de la alerta..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setSelectedAlert(null)}>
                      Cerrar
                    </Button>
                    <Button type="submit" size="sm">
                      Guardar Nota (Persistente)
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
