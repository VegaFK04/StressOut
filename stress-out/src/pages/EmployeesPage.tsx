import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  Shield,
  Info,
  AlertTriangle,
  Users,
  CheckCircle,
  Plus,
  X,
  Activity,
  Briefcase,
  MapPin,
  Mail,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Avatar } from '@/components/ui/avatar'
import { getEmployees, getDepartments, getEmployeeMetrics, getAlerts } from '@/services/mockDataService'
import { useLocalState } from '@/hooks/useLocalState'

export function EmployeesPage() {
  const employees = getEmployees()
  const departments = getDepartments()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q')?.toLowerCase() ?? ''
  const departmentFilter = searchParams.get('department') ?? ''
  const statusFilter = searchParams.get('status') ?? ''
  const riskFilter = searchParams.get('risk') ?? ''

  const [showMethodology, setShowMethodology] = React.useState(false)
  const [showHrModal, setShowHrModal] = React.useState(false)
  const [hrNotes, setHrNotes] = useLocalState<Record<string, string>>('hr_employee_notes', {})
  const [targetEmpId, setTargetEmpId] = React.useState<string>(employees[0]?.id ?? '')
  const [noteText, setNoteText] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState(false)

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query)
    const matchesDept = departmentFilter ? e.departmentId === departmentFilter : true
    const matchesStatus = statusFilter ? e.status === statusFilter : true

    const metrics = getEmployeeMetrics(e.id, '30days')
    const risk = metrics.stress?.burnoutRisk ?? 'low'
    const matchesRisk = riskFilter ? risk === riskFilter : true

    return matchesSearch && matchesDept && matchesStatus && matchesRisk
  })

  const handleSaveHrContext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetEmpId || !noteText.trim()) return
    const updated = { ...hrNotes, [targetEmpId]: noteText.trim() }
    setHrNotes(updated)
    setSuccessMsg(true)
    setNoteText('')
    setTimeout(() => {
      setSuccessMsg(false)
      setShowHrModal(false)
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Directorio de Empleados</h1>
          <p className="text-muted-foreground">
            Gestión de bienestar, métricas de carga y contexto organizacional del equipo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowMethodology(true)} className="gap-2">
            <Info className="h-4 w-4" /> Metodología Respetuosa
          </Button>
          <Button size="sm" onClick={() => setShowHrModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Registrar Contexto RRHH
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label className="text-xs">Buscar Empleado</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre, correo o rol..."
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
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Departamento</Label>
              <select
                value={departmentFilter}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) params.set('department', e.target.value)
                  else params.delete('department')
                  setSearchParams(params)
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos los departamentos</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Estado</Label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) params.set('status', e.target.value)
                  else params.delete('status')
                  setSearchParams(params)
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="healthy">Saludable</option>
                <option value="attention">Atención</option>
                <option value="overload">Sobrecarga</option>
                <option value="paused">Pausado</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Riesgo de Burnout</Label>
              <select
                value={riskFilter}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) params.set('risk', e.target.value)
                  else params.delete('risk')
                  setSearchParams(params)
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Cualquier riesgo</option>
                <option value="low">Bajo</option>
                <option value="moderate">Moderado</option>
                <option value="high">Alto</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableCaption>Mostrando {filtered.length} de {employees.length} colaboradores registrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Rol y Seniority</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Estrés / Riesgo</TableHead>
              <TableHead>Productividad</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((emp) => {
              const dept = departments.find((d) => d.id === emp.departmentId)
              const metrics = getEmployeeMetrics(emp.id, '30days')
              const stressScore = metrics.stress?.averageStressScore ?? 35
              const prodScore = metrics.productivity?.productivityScore ?? 80
              const risk = metrics.stress?.burnoutRisk ?? 'low'
              const note = hrNotes[emp.id]

              return (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={emp.name} />
                      <div>
                        <Link to={'/employees/' + emp.id} className="font-medium hover:underline text-foreground">
                          {emp.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                        {note && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded mt-0.5">
                            <FileText className="h-3 w-3" /> Nota RRHH
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{emp.role}</div>
                    <div className="text-xs text-muted-foreground">{emp.seniority}</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {dept?.name ?? '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(emp.status) ? emp.status : "healthy") as "healthy" | "attention" | "overload" | "no-data" | "paused"} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{stressScore}%</span>
                      <Badge
                        variant={
                          risk === 'high' ? 'destructive' : risk === 'moderate' ? 'secondary' : 'outline'
                        }
                      >
                        {risk === 'high' ? 'Alto' : risk === 'moderate' ? 'Mod.' : 'Bajo'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-sm">{prodScore}%</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={'/employees/' + emp.id}>
                          Ver Perfil <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron empleados que coincidan con los filtros aplicados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
                <h2 className="text-xl font-bold">Metodología de Bienestar Respetuoso</h2>
                <p className="text-xs text-muted-foreground">Privacidad y ética en analítica laboral</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Stress Out opera bajo estrictos estándares de privacidad y apoyo preventivo. Las métricas de estrés se calculan mediante agregación anónima de patrones de actividad, pausas y distribución de carga, <strong>sin realizar nunca vigilancia invasiva ni capturar contenido personal</strong>.
              </p>
              <p>
                El objetivo exclusivo es identificar indicios tempranos de agotamiento (burnout) para fomentar la redistribución proactiva de tareas, el respeto al descanso y el soporte humano oportuno.
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
                <h2 className="text-xl font-bold">Registrar Contexto RRHH</h2>
                <p className="text-xs text-muted-foreground">Añadir notas de bienestar u observaciones guardadas en localStorage</p>
              </div>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Contexto registrado correctamente.
              </div>
            ) : (
              <form onSubmit={handleSaveHrContext} className="space-y-4">
                <div className="space-y-2">
                  <Label>Seleccionar Colaborador</Label>
                  <select
                    value={targetEmpId}
                    onChange={(e) => setTargetEmpId(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Notas y Contexto de Soporte</Label>
                  <textarea
                    rows={4}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Ej. Carga de proyecto crítico en curso, se acordó flexibilidad horaria y reducción de reuniones..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowHrModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar Registro</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
