import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  ArrowLeft,
  Shield,
  Info,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  FileText,
  CheckCircle,
  Calendar,
  Activity,
  Briefcase,
  MapPin,
  Mail,
  Plus,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/ui/status-badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getEmployeeById,
  getActivityRecords,
  getEmployeeMetrics,
  getStressInsights,
  getDepartments,
  getEmployeeStressAnalysis,
} from '@/services/mockDataService'
import { useLocalState } from '@/hooks/useLocalState'

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const employee = getEmployeeById(id ?? '')
  const departments = getDepartments()

  const [showStress, setShowStress] = React.useState(true)
  const [showWorkload, setShowWorkload] = React.useState(true)
  const [showProd, setShowProd] = React.useState(true)
  const [showRecovery, setShowRecovery] = React.useState(false)

  const [showMethodology, setShowMethodology] = React.useState(false)
  const [showHrModal, setShowHrModal] = React.useState(false)
  const [hrNotes, setHrNotes] = useLocalState<Record<string, string[]>>('employee_hr_notes', {})
  const [newNote, setNewNote] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState(false)

  if (!employee) {
    return (
      <div className="space-y-6 text-center py-16">
        <h1 className="text-3xl font-bold">Colaborador no encontrado</h1>
        <p className="text-muted-foreground">El ID especificado no corresponde a ningún registro activo.</p>
        <Button asChild>
          <Link to="/employees">Volver al Directorio</Link>
        </Button>
      </div>
    )
  }

  const dept = departments.find((d) => d.id === employee.departmentId)
  const metrics = getEmployeeMetrics(employee.id, '30days');
  const stressAnalysis = getEmployeeStressAnalysis(employee.id, '30days');
  const activities = getActivityRecords().filter((a) => a.employeeId === employee.id);
  const insights = getStressInsights().filter((i) => i.employeeId === employee.id);

  const stressScore = stressAnalysis.estimationScore;
  const burnoutRisk = stressAnalysis.level === 'high' ? 'high' : stressAnalysis.level === 'elevated' ? 'moderate' : 'low';
  const prodScore = metrics.productivity?.productivityScore ?? 85;
  const overtime = metrics.productivity?.overtimeHours ?? 2.5;
  const focusHrs = metrics.productivity?.focusHours ?? 34;
  const recoveryScore = Math.max(15, 100 - stressScore);

  const rawTrend = metrics.stress?.stressTrend || []
  const chartData = rawTrend.map((pt, idx) => {
    const s = pt.value
    const w = Math.min(100, Math.max(15, s + (idx % 2 === 0 ? 8 : -6)))
    const p = Math.min(100, Math.max(40, 95 - s * 0.35))
    const r = Math.max(10, 100 - s)
    return {
      date: pt.date,
      estres: s,
      carga: Math.round(w),
      productividad: Math.round(p),
      recuperacion: Math.round(r),
    }
  })

  const currentNotes = hrNotes[employee.id] || []

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return
    const updated = [newNote.trim(), ...currentNotes]
    setHrNotes({ ...hrNotes, [employee.id]: updated })
    setNewNote('')
    setSuccessMsg(true)
    setTimeout(() => {
      setSuccessMsg(false)
      setShowHrModal(false)
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link to="/employees">
            <ArrowLeft className="h-4 w-4" /> Volver a Empleados
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowMethodology(true)} className="gap-2">
            <Info className="h-4 w-4" /> Metodología
          </Button>
          <Button size="sm" onClick={() => setShowHrModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Registrar Nota RRHH
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-card to-muted/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar name={employee.name} className="h-20 w-20 text-2xl" />
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight">{employee.name}</h1>
                  <StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(employee.status) ? employee.status : "healthy") as "healthy" | "attention" | "overload" | "no-data" | "paused"} />
                </div>
                <p className="text-muted-foreground font-medium">{employee.role} · <span className="text-foreground">{employee.seniority}</span></p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {dept?.name ?? 'Sin departamento'}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {employee.location}</span>
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {employee.email}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Ingreso: {employee.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-card border rounded-lg p-3 text-center min-w-[120px]">
                <p className="text-xs text-muted-foreground">Riesgo Burnout</p>
                <Badge
                  variant={burnoutRisk === 'high' ? 'destructive' : burnoutRisk === 'moderate' ? 'secondary' : 'outline'}
                  className="mt-1 uppercase text-xs font-bold"
                >
                  {burnoutRisk === 'high' ? 'Alto' : burnoutRisk === 'moderate' ? 'Moderado' : 'Bajo'}
                </Badge>
              </div>
              <div className="bg-card border rounded-lg p-3 text-center min-w-[120px]">
                <p className="text-xs text-muted-foreground">Estrés Promedio</p>
                <p className="text-xl font-bold mt-1 text-indigo-600 dark:text-indigo-400">{stressScore}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productividad</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prodScore}%</div>
            <p className="text-xs text-muted-foreground">Eficiencia general en tareas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overtime}h</div>
            <p className="text-xs text-muted-foreground">Registradas en el período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabajo de Foco</CardTitle>
            <Activity className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{focusHrs}h</div>
            <p className="text-xs text-muted-foreground">Bloques de alta concentración</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Índice Recuperación</CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recoveryScore}%</div>
            <p className="text-xs text-muted-foreground">Calidad de descanso y pausas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Evolución de 30 Días</CardTitle>
            <CardDescription>Seguimiento temporal multidimensional de bienestar y carga</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showStress}
                onChange={(e) => setShowStress(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-indigo-600">Estrés</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showWorkload}
                onChange={(e) => setShowWorkload(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-amber-600">Carga</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showProd}
                onChange={(e) => setShowProd(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-emerald-600">Productividad</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showRecovery}
                onChange={(e) => setShowRecovery(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-purple-600">Recuperación</span>
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} />
              <Tooltip />
              <Legend />
              {showStress && <Line type="monotone" dataKey="estres" name="Estrés" stroke="#6366f1" strokeWidth={2} dot={false} />}
              {showWorkload && <Line type="monotone" dataKey="carga" name="Carga Laboral" stroke="#f59e0b" strokeWidth={2} dot={false} />}
              {showProd && <Line type="monotone" dataKey="productividad" name="Productividad" stroke="#10b981" strokeWidth={2} dot={false} />}
              {showRecovery && <Line type="monotone" dataKey="recuperacion" name="Recuperación" stroke="#8b5cf6" strokeWidth={2} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Señales y Factores Detectados</CardTitle>
            <CardDescription>Análisis automatizado de patrones de trabajo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Distribución de Reuniones</p>
                <p className="text-xs text-muted-foreground">El 38% de la jornada transcurre en reuniones continuas, reduciendo bloques de foco profundo.</p>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
              <Clock className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Conectividad Fuera de Horario</p>
                <p className="text-xs text-muted-foreground">Se detectó actividad ocasional en horario nocturno. Se recomienda reforzar desconexión digital.</p>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Ritmo de Entrega Sostenido</p>
                <p className="text-xs text-muted-foreground">Cumplimiento de objetivos estables con alta calidad en entregables clave.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notas y Contexto RRHH</CardTitle>
              <CardDescription>Historial de observaciones guardadas localmente</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={() => setShowHrModal(true)} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Agregar
            </Button>
          </CardHeader>
          <CardContent>
            {currentNotes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No hay notas de RRHH registradas para este colaborador.
              </div>
            ) : (
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                {currentNotes.map((note, idx) => (
                  <div key={idx} className="p-3 border rounded-lg bg-card text-sm space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Nota de Seguimiento</span>
                      <span>Registrado localmente</span>
                    </div>
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights y Recomendaciones de Soporte</CardTitle>
          <CardDescription>Sugerencias proactivas para el bienestar del colaborador</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((ins) => (
            <div key={ins.id} className="border-b pb-4 last:border-0 last:pb-0 space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    ins.severity === 'critical' ? 'destructive' : ins.severity === 'warning' ? 'secondary' : 'outline'
                  }
                >
                  {ins.severity.toUpperCase()}
                </Badge>
                <h3 className="font-semibold text-sm">{ins.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{ins.description}</p>
              <div className="bg-muted/50 p-2.5 rounded text-xs text-foreground font-medium">
                💡 <strong>Acción recomendada:</strong> {ins.recommendedAction}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {showMethodology && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              onClick={() => setShowMethodology(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Metodología de Perfil Individual</h2>
                <p className="text-xs text-muted-foreground">Privacidad y soporte preventivo</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Los perfiles individuales en Stress Out se diseñan con un enfoque estrictamente confidencial y de apoyo. Las métricas de estrés y carga sirven exclusivamente para que líderes y RRHH detecten necesidades de balance y ofrezcan soporte preventivo.
              </p>
              <p>
                Ningún dato individual es utilizado con fines disciplinarios ni de vigilancia invasiva.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => setShowMethodology(false)}>Entendido</Button>
            </div>
          </div>
        </div>
      )}

      {showHrModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              onClick={() => setShowHrModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Registrar Nota para {employee.name}</h2>
                <p className="text-xs text-muted-foreground">Guardado persistente en localStorage</p>
              </div>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Nota guardada correctamente.
              </div>
            ) : (
              <form onSubmit={handleAddNote} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nota de Seguimiento o Acomodación</Label>
                  <textarea
                    rows={4}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Ej. Se acordó ajustar entregas de sprint y brindar días de descanso compensatorio..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowHrModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar Nota</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
