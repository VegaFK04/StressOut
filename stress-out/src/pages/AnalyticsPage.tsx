import * as React from 'react'
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
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { 
  SectionHeader 
} from '@/components/ui/section-header'
import { 
  FilterBar 
} from '@/components/ui/filter-bar'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell, 
  TableCaption 
} from '@/components/ui/table'
import { 
  Badge 
} from '@/components/ui/badge'
import { 
  getTeamStats, 
  getDepartmentMetrics, 
  getEmployees, 
  getEmployeeHistory,
  getStressInsights
} from '@/services/mockDataService'
import { formatPercent } from '@/utils/format'
import type { Period } from '@/types'

export function AnalyticsPage() {
  const [period, setPeriod] = React.useState<Period>('30days')
  const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null)
  
  // Fetch data
  const stats = getTeamStats(period)
  const allDepartments = getDepartmentMetrics(period)
  const employees = getEmployees(period)
  const insights = getStressInsights()
  
  // Filter departments if selected
  const departments = selectedDepartment 
    ? allDepartments.filter(d => d.departmentId === selectedDepartment)
    : allDepartments
  
  // Prepare trend data (team aggregate over time)
  const trendData = React.useMemo(() => {
    // Get unique dates from employee histories
    const dateSet = new Set<string>()
    employees.forEach(emp => {
      const history = getEmployeeHistory(emp.id, period)
      history.forEach(day => dateSet.add(day.date))
    })
    const sortedDates = Array.from(dateSet).sort()
    
    // Aggregate by date
    return sortedDates.map(date => {
      let totalStress = 0
      let totalWorkload = 0
      let totalProductivity = 0
      let totalActivity = 0
      let count = 0
      
      employees.forEach(emp => {
        const history = getEmployeeHistory(emp.id, period)
        const day = history.find(d => d.date === date)
        if (day && day.status !== 'no-data') {
          totalStress += day.stressScore
          totalWorkload += day.workloadScore
          totalProductivity += day.productivityScore
          totalActivity += day.relativeActivity
          count++
        }
      })
      
      return {
        date,
        stress: count ? Math.round(totalStress / count) : 0,
        workload: count ? Math.round(totalWorkload / count) : 0,
        productivity: count ? Math.round(totalProductivity / count) : 0,
        activity: count ? Math.round(totalActivity / count) : 0,
      }
    })
  }, [employees, period])
  
  // Prepare donut data (department distribution)
  const donutData = React.useMemo(() => {
    return allDepartments.map(dept => ({
      name: dept.departmentName,
      value: dept.employeeCount
    }))
  }, [allDepartments])
  
  // Prepare department table data with heatmap styling
  const tableData = React.useMemo(() => {
    return departments.map(dept => {
      // Determine stress level for heatmap
      let stressClass = ''
      if (dept.averageStress >= 75) stressClass = 'bg-red-50 text-red-800'
      else if (dept.averageStress >= 60) stressClass = 'bg-orange-50 text-orange-800'
      else if (dept.averageStress >= 40) stressClass = 'bg-yellow-50 text-yellow-800'
      else stressClass = 'bg-green-50 text-green-800'
      
      // Determine productivity level for heatmap (reverse: high productivity = good)
      let prodClass = ''
      if (dept.averageProductivity >= 85) prodClass = 'bg-green-50 text-green-800'
      else if (dept.averageProductivity >= 70) prodClass = 'bg-yellow-50 text-yellow-800'
      else if (dept.averageProductivity >= 50) prodClass = 'bg-orange-50 text-orange-800'
      else prodClass = 'bg-red-50 text-red-800'
      
      return {
        ...dept,
        stressClass,
        prodClass
      }
    })
  }, [departments])
  
  // Prepare activity heatmap data (last 7 days x departments)
  const activityHeatmapData = React.useMemo(() => {
    // Get last 7 days
    const dates = []
    const baseDate = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(baseDate)
      d.setDate(baseDate.getDate() - i)
      dates.push(d.toISOString().split('T')[0])
    }
    
    // Create matrix: dates x departments
    return dates.map(date => {
      return {
        date,
        departments: allDepartments.map(dept => {
          let totalActivity = 0
          let count = 0
          
          const deptEmployees = employees.filter(e => e.departmentId === dept.departmentId)
          deptEmployees.forEach(emp => {
            const history = getEmployeeHistory(emp.id, period)
            const day = history.find(d => d.date === date)
            if (day && day.status !== 'no-data') {
              totalActivity += day.relativeActivity
              count++
            }
          })
          
          const activity = count ? Math.round(totalActivity / count) : 0
          return {
            departmentId: dept.departmentId,
            departmentName: dept.departmentName,
            activity,
            date
          }
        })
      }
    })
  }, [employees, allDepartments, period])
  
  // Handle period change
  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod)
  }
  
  // Handle department change
  const handleDepartmentChange = (deptId: string | null) => {
    setSelectedDepartment(deptId)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Anal�tica</h1>
        <p className="text-muted-foreground">
          Visualizaciones detalladas de productividad y bienestar del equipo.
        </p>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FilterBar
              filters={[
                { label: 'Hoy', value: 'today', active: period === 'today' },
                { label: '7 D�as', value: '7days', active: period === '7days' },
                { label: '30 D�as', value: '30days', active: period === '30days' }
              ]}
              onFilterChange={(filter) => handlePeriodChange(filter as Period)}
            />
            <FilterBar
              filters={[
                { label: 'Todos', value: 'all', active: !selectedDepartment },
                ...allDepartments.map(dept => ({
                  label: dept.departmentName,
                  value: dept.departmentId,
                  active: selectedDepartment === dept.departmentId
                }))
              ]}
              onFilterChange={(filter) => handleDepartmentChange(filter === 'all' ? null : filter)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Trend Chart */}
      <Card>
        <SectionHeader
          title="Tendencia del Equipo"
          description="Evoluci�n temporal de estr�s, carga laboral y productividad"
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {/* Stress line */}
              <Line
                type="monotone"
                dataKey="stress"
                name="Estr�s (%)"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1', r: 3 }}
              />
              {/* Workload line */}
              <Line
                type="monotone"
                dataKey="workload"
                name="Carga (%)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', r: 3 }}
              />
              {/* Productivity line */}
              <Line
                type="monotone"
                dataKey="productivity"
                name="Productividad (%)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Donut Chart */}
      <Card>
        <SectionHeader
          title="Distribuci�n por Departamento"
          description="N�mero de empleados por �rea"
        />
        <CardContent>
          <div className="h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#ec4899', '#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Department Table with Heatmap */}
      <Card>
        <SectionHeader
          title="Resumen por Departamentos"
          description="M�tricas agregadas con indicadores de calor"
        />
        <CardContent>
          <Table>
            <TableCaption>Resumen departamental basado en el per�odo actual.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Empleados</TableHead>
                <TableHead>Estr�s Promedio</TableHead>
                <TableHead>Productividad</TableHead>
                <TableHead>Horas Extra</TableHead>
                <TableHead>Alertas Abiertas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map(dept => (
                <TableRow key={dept.departmentId}>
                  <TableCell className="font-medium">{dept.departmentName}</TableCell>
                  <TableCell>{dept.employeeCount}</TableCell>
                  <TableCell className={dept.stressClass}>
                    {dept.averageStress}%
                  </TableCell>
                  <TableCell className={dept.prodClass}>
                    {dept.averageProductivity}%
                  </TableCell>
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
      
      {/* Activity Heatmap */}
      <Card>
        <SectionHeader
          title="Mapa de Actividad"
          description="Intensidad de actividad por departamento y d�a"
        />
        <CardContent>
          <div className="space-y-4">
            {activityHeatmapData.map(dayData => (
              <div key={dayData.date} className="space-y-2">
                <p className="text-sm font-medium">{new Date(dayData.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                <div className="flex gap-2">
                  {dayData.departments.map(dept => (
                    <div 
                      key={dept.departmentId} 
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: `hsl(210, 40%, ${Math.max(20, Math.min(90, 30 + dept.activity * 0.7))}%)`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Significant Changes */}
      <Card>
        <SectionHeader
          title="Cambios Significativos"
          description="Insights y cambios notables que requieren atenci�n"
        />
        <CardContent className="space-y-4">
          {insights.slice(0, 3).map(insight => (
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
              </div>
            </div>
          ))}
          {insights.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No se han detectado cambios significativos en el per�odo seleccionado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


