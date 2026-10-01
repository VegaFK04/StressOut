import * as React from "react"
import { Link } from "react-router-dom"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Briefcase,
  Heart,
  Clock,
  Info,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmployeeAvatar } from "@/components/ui/employee-avatar"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { ChartCard } from "@/components/ui/chart-card"
import { SectionHeader } from "@/components/ui/section-header"
import { AlertCard } from "@/components/ui/alert-card"
import { useLocalState } from "@/hooks/useLocalState"
import {
  getEmployeeById,
  getEmployeeMetrics,
  getEmployeeHistory,
} from "@/services/mockDataService"

const DEFAULT_EMPLOYEE_ID = "emp-001"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<'textarea'>>((props, ref) => (
  <textarea
    ref={ref}
    {...props}
    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
))
Textarea.displayName = "Textarea"

export function MePage() {
  const [employeeId, setEmployeeId] = React.useState(DEFAULT_EMPLOYEE_ID)
  const employee = getEmployeeById(employeeId)

  if (!employee) {
    return (
      <div className="space-y-6 text-center py-16">
        <h1 className="text-3xl font-bold">Empleado no encontrado</h1>
        <p className="text-muted-foreground">El ID especificado no corresponde a ningun registro.</p>
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    )
  }

  const metrics = getEmployeeMetrics(employeeId, "7days")
  const history = getEmployeeHistory(employeeId, "7days")

  const productivity = metrics.productivity?.productivityScore ?? 85
  const workload = metrics.stress?.workloadScore ?? 55
  const wellBeing = metrics.stress?.recoveryScore ?? 60
  const overtime = metrics.productivity?.overtimeHours ?? 0

  const chartData = history.map((h) => ({
    date: new Date(h.date).toLocaleDateString("es-ES", { weekday: "short" }),
    stress: h.stressScore,
    workload: h.workloadScore,
    productivity: h.productivityScore,
    recovery: Math.max(10, 100 - h.stressScore),
  }))

  const [showStress, setShowStress] = React.useState(true)
  const [showWorkload, setShowWorkload] = React.useState(true)
  const [showProd, setShowProd] = React.useState(true)

  const baseline = {
    stress: Math.round(history.reduce((acc, h) => acc + h.stressScore, 0) / history.length),
    workload: Math.round(history.reduce((acc, h) => acc + h.workloadScore, 0) / history.length),
    productivity: Math.round(history.reduce((acc, h) => acc + h.productivityScore, 0) / history.length),
  }
  const latest = history[history.length - 1]

  const factors = [
    { name: "Estr�s", value: latest.stressScore, baseline: baseline.stress, icon: Heart, positiveWhenUp: false },
    { name: "Carga laboral", value: latest.workloadScore, baseline: baseline.workload, icon: Briefcase, positiveWhenUp: true },
    { name: "Productividad", value: latest.productivityScore, baseline: baseline.productivity, icon: BarChart3, positiveWhenUp: true },
    { name: "Recuperaci�n", value: Math.max(10, 100 - latest.stressScore), baseline: Math.max(10, 100 - baseline.stress), icon: Clock, positiveWhenUp: true },
  ]

  const [contextNotes, setContextNotes] = useLocalState<string>('me_page_context_notes', "")
  const noteText = contextNotes.trim()

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi bienestar</h1>
          <p className="text-muted-foreground mt-2">
            Hola, <strong className="text-foreground">{employee.name.split(" ")[0]}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Una vista personal de tus patrones de trabajo para ayudarte a conocerte mejor y tomar mejores decisiones sobre tu bienestar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <EmployeeAvatar name={employee.name} size="lg" />
          <div>
            <p className="font-semibold">{employee.name}</p>
            <p className="text-xs text-muted-foreground">{employee.role}</p>
            <StatusBadge status={employee.status as any} />
          </div>
        </div>
      </div>

      {/* Employee selector */}
      <div className="flex items-center gap-2">
        <Input
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="ID de empleado (ej. emp-001)"
          className="max-w-xs"
        />
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Productividad" value={productivity + "%"} change={{ value: 2, label: "vs semana anterior" }} icon={<BarChart3 className="h-4 w-4" />} />
        <StatCard title="Carga laboral" value={workload + "%"} change={{ value: -4, label: "vs semana anterior" }} icon={<Briefcase className="h-4 w-4" />} />
        <StatCard title="Bienestar" value={wellBeing + "%"} change={{ value: 1, label: "vs semana anterior" }} icon={<Heart className="h-4 w-4" />} />
        <StatCard title="Horas extra" value={overtime + "h"} change={{ value: 0, label: "sin cambios" }} icon={<Clock className="h-4 w-4" />} />
      </div>

      {/* Esta semana */}
      <ChartCard title="Esta semana" description="Evoluci�n de tus m�tricas durante los �ltimos 7 d�as">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium mb-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showStress} onChange={(e) => setShowStress(e.target.checked)} className="rounded border-input" />
            <span className="text-indigo-600">Estr�s</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showWorkload} onChange={(e) => setShowWorkload(e.target.checked)} className="rounded border-input" />
            <span className="text-amber-600">Carga</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showProd} onChange={(e) => setShowProd(e.target.checked)} className="rounded border-input" />
            <span className="text-emerald-600">Productividad</span>
          </label>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            {showStress && <Line type="monotone" dataKey="stress" name="Estr�s" stroke="#6366f1" strokeWidth={2} dot={false} />}
            {showWorkload && <Line type="monotone" dataKey="workload" name="Carga laboral" stroke="#f59e0b" strokeWidth={2} dot={false} />}
            {showProd && <Line type="monotone" dataKey="productivity" name="Productividad" stroke="#10b981" strokeWidth={2} dot={false} />}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* �Qu� est� influyendo? */}
      <SectionHeader title="�Qu� est� influyendo en tu estado actual?" description="Compara tus m�tricas actuales con tu patr�n personal habitual" />
      <p className="text-sm text-muted-foreground">Estos indicadores representan cambios respecto a tu patr�n habitual.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {factors.map((factor) => {
          const deviation = factor.value - factor.baseline
          const direction = deviation > 0 ? "up" : deviation < 0 ? "down" : "same"
          const Icon = factor.icon
          return (
            <Card key={factor.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{factor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Actual: {factor.value}%</span>
                    <span className="text-xs font-medium">
                      {direction === "up" && <ArrowUp className="h-3 w-3 text-red-500" />}
                      {direction === "down" && <ArrowDown className="h-3 w-3 text-emerald-500" />}
                      {direction === "same" && <span className="text-gray-500">&plusmn;</span>}
                      {Math.abs(deviation)}%
                    </span>
                  </div>
                </div>
                <ProgressIndicator value={factor.value} label={factor.name + " vs baseline"} className="mt-3" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contexto */}
      <Card>
        <CardHeader>
          <CardTitle>Contexto</CardTitle>
          <CardDescription>A�ade informaci�n sobre esta semana que el sistema no puede ver por s� mismo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Notas de RRHH / contexto personal</p>
              <p className="text-xs text-muted-foreground">
                Este espacio es solo para ti. Tus notas se guardan en tu navegador y no son interpretadas autom�ticamente por Stress Out.
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="context-notes" className="text-sm font-medium">Agregar contexto</label>
            <Textarea
              id="context-notes"
              value={contextNotes}
              onChange={(e) => setContextNotes(e.target.value)}
              placeholder="�Hay algo que el sistema no conozca sobre esta semana? (Ejemplos: Cierre de proyecto, Capacitaci�n, Trabajo excepcional, Situaci�n personal)"
              className="mt-2"
            />
            {noteText && (
              <div className="mt-3 bg-card border rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground">Contexto guardado localmente</p>
                <p className="text-sm mt-1">{noteText}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lo que Stress Out no puede saber */}
      <Card>
        <CardHeader>
          <CardTitle>Lo que Stress Out no puede saber</CardTitle>
          <CardDescription>Los indicadores son anal�ticos; hay cosas que solo t� puedes responder</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {["Motivo del cambio", "Estado emocional real", "Situaciones personales", "Circunstancias externas"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
              <Info className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy link */}
      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
        <div>
          <p className="font-semibold">Privacidad y transparencia</p>
          <p className="text-sm text-muted-foreground">C�mo protegemos tus datos</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/privacy">Ver c�mo protegemos tus datos</Link>
        </Button>
      </div>

      {/* Visible note */}
      <AlertCard title="Nota importante" severity="info" description="Stress Out proporciona indicadores anal�ticos basados en m�tricas agregadas de actividad digital y no sustituye la evaluaci�n humana." />
    </div>
  )
}
