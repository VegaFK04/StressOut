import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const targetPath = path.resolve(__dirname, 'src/pages/DashboardPage.tsx')

const dashboardCode = `import * as React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Users, AlertTriangle, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import {
  getTeamStats,
  getStressInsights,
  getAlerts,
  getDepartmentMetrics,
  getEmployees,
  getStressMetrics,
} from '@/services/mockDataService'
import type { Period } from '@/types'
import { Link } from 'react-router-dom'

const DONUT_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1']

export function DashboardPage() {
  const [period, setPeriod] = React.useState<Period>('30days')
  const [showStress, setShowStress] = React.useState(true)
  const [showWorkload, setShowWorkload] = React.useState(true)
  const [showProd, setShowProd] = React.useState(true)

  const stats = getTeamStats(period)
  const deptMetrics = getDepartmentMetrics(period)
  const insights = getStressInsights()
  const alerts = getAlerts().filter((a) => a.status === 'open')
  const employees = getEmployees(period)
  const stressMetrics = getStressMetrics()

  const sampleTrend = stressMetrics[0]?.stressTrend || []
  const trendData = sampleTrend.map((point, idx) => {
    const stressVal = point.value
    const workloadVal = Math.min(100, Math.max(10, stressVal + (idx % 3 === 0 ? 10 : -5)))
    const prodVal = Math.min(100, Math.max(40, 90 - (stressVal * 0.3)))
    return {
      date: point.date,
      estres: stressVal,
      carga: Math.round(workloadVal),
      productividad: Math.round(prodVal),
    }
  })

  const healthyCount = employees.filter((e) => e.status === 'healthy' || e.status === 'active').length
  const attentionCount = employees.filter((e) => e.status === 'attention').length
  const overloadCount = employees.filter((e) => e.status === 'overload').length
  const otherCount = Math.max(0, employees.length - (healthyCount + attentionCount + overloadCount))

  const teamStatusData = [
    { name: 'Saludable', value: healthyCount > 0 ? healthyCount : 25 },
    { name: 'Atención', value: attentionCount > 0 ? attentionCount : 12 },
    { name: 'Sobrecarga', value: overloadCount > 0 ? overloadCount : 8 },
    { name: 'Pausado / Otro', value: otherCount > 0 ? otherCount : 3 },
  ].filter((item) => item.value > 0)

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
          <p className="text-muted-foreground">
            Métricas de bienestar, carga laboral y analítica del equipo en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={period === 'today' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriod('today')}
          >
            Hoy
          </Button>
          <Button
            variant={period === '7days' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriod('7days')}
          >
            7 Días
          </Button>
          <Button
            variant={period === '30days' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriod('30days')}
          >
            30 Días
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeEmployees}</div>
            <p className="text-xs text-muted-foreground">de {stats.totalEmployees} total en plantilla</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estrés Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageStress}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ArrowDownRight className="h-3 w-3" /> -2.4% vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Abiertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openAlerts}</div>
            <p className="text-xs text-muted-foreground">requieren atención de managers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productividad Global</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProductivity}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" /> +1.8% eficiencia general
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Estado Laboral (Tendencia)</CardTitle>
              <CardDescription>Evolución temporal de estrés, carga y productividad</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStress}
                  onChange={(e) => setShowStress(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-indigo-600 font-medium">Estrés</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWorkload}
                  onChange={(e) => setShowWorkload(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-amber-600 font-medium">Carga</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showProd}
                  onChange={(e) => setShowProd(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-emerald-600 font-medium">Productividad</span>
              </label>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                {showStress && (
                  <Line
                    type="monotone"
                    dataKey="estres"
                    name="Estrés (%)"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', r: 3 }}
                  />
                )}
                {showWorkload && (
                  <Line
                    type="monotone"
                    dataKey="carga"
                    name="Carga (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 3 }}
                  />
                )}
                {showProd && (
                  <Line
                    type="monotone"
                    dataKey="productividad"
                    name="Productividad (%)"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 3 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado del Equipo</CardTitle>
            <CardDescription>Distribución general de bienestar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {teamStatusData.map((_, index) => (
                      <Cell key={'cell-' + index} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alertas Recientes</CardTitle>
            <CardDescription>Avisos activos que requieren supervisión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <Badge
                      variant={
                        alert.severity === 'high'
                          ? 'destructive'
                          : alert.severity === 'moderate'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <Link to={'/employees/' + alert.employeeId}>
                  <Button variant="outline" size="sm">Ver</Button>
                </Link>
              </div>
            ))}
            {alerts.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No hay alertas abiertas actualmente.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencias Detectadas</CardTitle>
            <CardDescription>Insights y recomendaciones automáticas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="rounded-lg border p-3 space-y-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">{insight.title}</span>
                  <Badge
                    variant={
                      insight.severity === 'critical'
                        ? 'destructive'
                        : insight.severity === 'warning'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {insight.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs italic text-blue-600 dark:text-blue-400">Rec: {insight.recommendedAction}</span>
                  <Link to={'/employees/' + insight.employeeId} className="text-xs font-medium hover:underline">
                    Perfil &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen por Departamentos</CardTitle>
          <CardDescription>Métricas agregadas de estrés, productividad y alertas por área</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Resumen departamental basado en el período actual.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Empleados</TableHead>
                <TableHead>Estrés Promedio</TableHead>
                <TableHead>Productividad</TableHead>
                <TableHead>Horas Extra</TableHead>
                <TableHead>Alertas Abiertas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deptMetrics.map((dept) => (
                <TableRow key={dept.departmentId}>
                  <TableCell className="font-medium">{dept.departmentName}</TableCell>
                  <TableCell>{dept.employeeCount}</TableCell>
                  <TableCell>
                    <span
                      className={'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ' + (
                        dept.averageStress > 60
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : dept.averageStress > 40
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                      )}
                    >
                      {dept.averageStress}%
                    </span>
                  </TableCell>
                  <TableCell>{dept.averageProductivity}%</TableCell>
                  <TableCell>{dept.totalOvertimeHours}h</TableCell>
                  <TableCell>
                    {dept.openAlertsCount > 0 ? (
                      <Badge variant="destructive">{dept.openAlertsCount}</Badge>
                    ) : (
                      <Badge variant="outline">0</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
`

fs.writeFileSync(targetPath, dashboardCode, 'utf8')
console.log('Successfully wrote DashboardPage.tsx')