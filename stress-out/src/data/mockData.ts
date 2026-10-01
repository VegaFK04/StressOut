import type {
  Department,
  Employee,
  DailyMetrics,
  ActivityRecord,
  StressMetrics,
  ProductivityMetrics,
  StressInsight,
  Alert,
  TeamUser,
  PrivacySettings,
} from '../types'

export const departments: Department[] = [
  { id: 'dept-desarrollo', name: 'Desarrollo', color: '#6366f1' },
  { id: 'dept-diseno', name: 'Diseño', color: '#ec4899' },
  { id: 'dept-marketing', name: 'Marketing', color: '#0ea5e9' },
  { id: 'dept-rh', name: 'Recursos Humanos', color: '#f59e0b' },
  { id: 'dept-soporte', name: 'Soporte', color: '#10b981' },
  { id: 'dept-finanzas', name: 'Finanzas', color: '#8b5cf6' },
]

export const teamUsers: TeamUser[] = [
  { id: 'u-admin', name: 'Marina Solís', role: 'admin', email: 'marina.solis@nexa-solutions.com' },
  { id: 'u-manager', name: 'Tomás Herrera', role: 'manager', email: 'tomas.herrera@nexa-solutions.com' },
]

export const employees: Employee[] = [
  { id: 'emp-001', name: 'Sofía Martínez', email: 'sofia.martinez@nexa-solutions.com', role: 'Senior Frontend Engineer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Madrid, ES', joinDate: '2022-03-14', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#6366f1', managerId: 'u-manager' },
  { id: 'emp-002', name: 'Diego Fernández', email: 'diego.fernandez@nexa-solutions.com', role: 'Backend Engineer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Barcelona, ES', joinDate: '2023-06-01', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'overload', productivityGoal: 80, profileType: 'overloaded', avatarColor: '#0ea5e9', managerId: 'u-manager' },
  { id: 'emp-003', name: 'Andrés Molina', email: 'andres.molina@nexa-solutions.com', role: 'DevOps Lead', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Madrid, ES', joinDate: '2021-09-30', seniority: 'Lead', schedule: '08:30 - 17:30', status: 'attention', productivityGoal: 90, profileType: 'increasing-stress', avatarColor: '#ef4444', managerId: 'u-manager' },
  { id: 'emp-004', name: 'Elena Blanco', email: 'elena.blanco@nexa-solutions.com', role: 'Junior Frontend Dev', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Valencia, ES', joinDate: '2024-02-10', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 75, profileType: 'high-prod-low-stress', avatarColor: '#10b981', managerId: 'u-manager' },
  { id: 'emp-005', name: 'Javier Ramos', email: 'javier.ramos@nexa-solutions.com', role: 'Fullstack Engineer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Sevilla, ES', joinDate: '2022-11-15', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 80, profileType: 'declining-prod', avatarColor: '#f59e0b', managerId: 'u-manager' },
  { id: 'emp-006', name: 'Clara Gil', email: 'clara.gil@nexa-solutions.com', role: 'QA Automation Engineer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Bilbao, ES', joinDate: '2023-01-20', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#8b5cf6', managerId: 'u-manager' },
  { id: 'emp-007', name: 'Hugo Navarro', email: 'hugo.navarro@nexa-solutions.com', role: 'Mobile Developer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Málaga, ES', joinDate: '2022-07-05', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'recovering', avatarColor: '#ec4899', managerId: 'u-manager' },
  { id: 'emp-008', name: 'Valeria Castro', email: 'valeria.castro@nexa-solutions.com', role: 'Security Engineer', departmentId: 'dept-desarrollo', departmentName: 'Desarrollo', location: 'Madrid, ES', joinDate: '2021-05-12', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 85, profileType: 'irregular', avatarColor: '#14b8a6', managerId: 'u-manager' },
  { id: 'emp-009', name: 'Lucía Torres', email: 'lucia.torres@nexa-solutions.com', role: 'Lead Product Designer', departmentId: 'dept-diseno', departmentName: 'Diseño', location: 'Valencia, ES', joinDate: '2021-11-22', seniority: 'Lead', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 90, profileType: 'high-prod-low-stress', avatarColor: '#ec4899', managerId: 'u-manager' },
  { id: 'emp-010', name: 'Camila Rojas', email: 'camila.rojas@nexa-solutions.com', role: 'UX Researcher', departmentId: 'dept-diseno', departmentName: 'Diseño', location: 'Málaga, ES', joinDate: '2023-02-27', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'paused', productivityGoal: 80, profileType: 'no-data', avatarColor: '#14b8a6', managerId: 'u-manager' },
  { id: 'emp-011', name: 'Pablo León', email: 'pablo.leon@nexa-solutions.com', role: 'UI Designer', departmentId: 'dept-diseno', departmentName: 'Diseño', location: 'Barcelona, ES', joinDate: '2023-09-15', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 80, profileType: 'stable', avatarColor: '#6366f1', managerId: 'u-manager' },
  { id: 'emp-012', name: 'Sara Ortiz', email: 'sara.ortiz@nexa-solutions.com', role: 'Brand Designer', departmentId: 'dept-diseno', departmentName: 'Diseño', location: 'Madrid, ES', joinDate: '2022-04-18', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'overload', productivityGoal: 85, profileType: 'overloaded', avatarColor: '#0ea5e9', managerId: 'u-manager' },
  { id: 'emp-013', name: 'Mario Vega', email: 'mario.vega@nexa-solutions.com', role: 'Motion Designer', departmentId: 'dept-diseno', departmentName: 'Diseño', location: 'Sevilla, ES', joinDate: '2024-01-10', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 75, profileType: 'irregular', avatarColor: '#f59e0b', managerId: 'u-manager' },
  { id: 'emp-014', name: 'Mateo Ruiz', email: 'mateo.ruiz@nexa-solutions.com', role: 'Marketing Director', departmentId: 'dept-marketing', departmentName: 'Marketing', location: 'Madrid, ES', joinDate: '2020-08-10', seniority: 'Lead', schedule: '09:00 - 18:00', status: 'overload', productivityGoal: 90, profileType: 'overloaded', avatarColor: '#f59e0b', managerId: 'u-manager' },
  { id: 'emp-015', name: 'Paula Jimenez', email: 'paula.jimenez@nexa-solutions.com', role: 'Content Strategist', departmentId: 'dept-marketing', departmentName: 'Marketing', location: 'Barcelona, ES', joinDate: '2022-10-01', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#8b5cf6', managerId: 'u-manager' },
  { id: 'emp-016', name: 'Daniel Alonso', email: 'daniel.alonso@nexa-solutions.com', role: 'SEO Specialist', departmentId: 'dept-marketing', departmentName: 'Marketing', location: 'Valencia, ES', joinDate: '2023-05-14', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 80, profileType: 'high-prod-low-stress', avatarColor: '#10b981', managerId: 'u-manager' },
  { id: 'emp-017', name: 'Irene Sanz', email: 'irene.sanz@nexa-solutions.com', role: 'Growth Marketer', departmentId: 'dept-marketing', departmentName: 'Marketing', location: 'Bilbao, ES', joinDate: '2023-11-20', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 80, profileType: 'increasing-stress', avatarColor: '#ef4444', managerId: 'u-manager' },
  { id: 'emp-018', name: 'Adrián Calvo', email: 'adrian.calvo@nexa-solutions.com', role: 'Social Media Manager', departmentId: 'dept-marketing', departmentName: 'Marketing', location: 'Madrid, ES', joinDate: '2024-03-01', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 75, profileType: 'recovering', avatarColor: '#ec4899', managerId: 'u-manager' },
  { id: 'emp-019', name: 'Carmen Navarro', email: 'carmen.navarro@nexa-solutions.com', role: 'HR Director', departmentId: 'dept-rh', departmentName: 'Recursos Humanos', location: 'Madrid, ES', joinDate: '2019-03-01', seniority: 'Lead', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#10b981', managerId: 'u-admin' },
  { id: 'emp-020', name: 'Gonzalo Prieto', email: 'gonzalo.prieto@nexa-solutions.com', role: 'Talent Acquisition', departmentId: 'dept-rh', departmentName: 'Recursos Humanos', location: 'Barcelona, ES', joinDate: '2022-06-15', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 80, profileType: 'high-prod-low-stress', avatarColor: '#6366f1', managerId: 'u-manager' },
  { id: 'emp-021', name: 'Beatriz Molina', email: 'beatriz.molina@nexa-solutions.com', role: 'People Operations', departmentId: 'dept-rh', departmentName: 'Recursos Humanos', location: 'Sevilla, ES', joinDate: '2023-08-10', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 80, profileType: 'declining-prod', avatarColor: '#f59e0b', managerId: 'u-manager' },
  { id: 'emp-022', name: 'Álvaro Rubio', email: 'alvaro.rubio@nexa-solutions.com', role: 'HR Specialist', departmentId: 'dept-rh', departmentName: 'Recursos Humanos', location: 'Valencia, ES', joinDate: '2024-01-20', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'no-data', productivityGoal: 75, profileType: 'no-data', avatarColor: '#94a3b8', managerId: 'u-manager' },
  { id: 'emp-023', name: 'Santiago Vega', email: 'santiago.vega@nexa-solutions.com', role: 'Support Lead', departmentId: 'dept-soporte', departmentName: 'Soporte', location: 'Bilbao, ES', joinDate: '2019-04-08', seniority: 'Lead', schedule: '08:00 - 17:00', status: 'attention', productivityGoal: 85, profileType: 'increasing-stress', avatarColor: '#10b981', managerId: 'u-admin' },
  { id: 'emp-024', name: 'Natalia Herrero', email: 'natalia.herrero@nexa-solutions.com', role: 'Customer Success', departmentId: 'dept-soporte', departmentName: 'Soporte', location: 'Madrid, ES', joinDate: '2022-09-12', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#0ea5e9', managerId: 'u-manager' },
  { id: 'emp-025', name: 'Marcos Iglesias', email: 'marcos.iglesias@nexa-solutions.com', role: 'Support Engineer', departmentId: 'dept-soporte', departmentName: 'Soporte', location: 'Barcelona, ES', joinDate: '2023-04-01', seniority: 'Semi-Senior', schedule: '10:00 - 19:00', status: 'overload', productivityGoal: 80, profileType: 'overloaded', avatarColor: '#ef4444', managerId: 'u-manager' },
  { id: 'emp-026', name: 'Claudia Bravo', email: 'claudia.bravo@nexa-solutions.com', role: 'Technical Support Specialist', departmentId: 'dept-soporte', departmentName: 'Soporte', location: 'Valencia, ES', joinDate: '2023-10-15', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 75, profileType: 'recovering', avatarColor: '#ec4899', managerId: 'u-manager' },
  { id: 'emp-027', name: 'Raúl Medina', email: 'raul.medina@nexa-solutions.com', role: 'Helpdesk Technician', departmentId: 'dept-soporte', departmentName: 'Soporte', location: 'Sevilla, ES', joinDate: '2024-02-01', seniority: 'Junior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 75, profileType: 'irregular', avatarColor: '#8b5cf6', managerId: 'u-manager' },
  { id: 'emp-028', name: 'Marina Solís', email: 'marina.solis@nexa-solutions.com', role: 'CFO', departmentId: 'dept-finanzas', departmentName: 'Finanzas', location: 'Madrid, ES', joinDate: '2018-01-15', seniority: 'Lead', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 90, profileType: 'high-prod-low-stress', avatarColor: '#8b5cf6', managerId: null },
  { id: 'emp-029', name: 'Tomás Herrera', email: 'tomas.herrera@nexa-solutions.com', role: 'Financial Controller', departmentId: 'dept-finanzas', departmentName: 'Finanzas', location: 'Madrid, ES', joinDate: '2020-05-20', seniority: 'Senior', schedule: '09:00 - 18:00', status: 'healthy', productivityGoal: 85, profileType: 'stable', avatarColor: '#6366f1', managerId: 'u-admin' },
  { id: 'emp-030', name: 'Esther Montero', email: 'esther.montero@nexa-solutions.com', role: 'Accountant', departmentId: 'dept-finanzas', departmentName: 'Finanzas', location: 'Barcelona, ES', joinDate: '2022-11-01', seniority: 'Semi-Senior', schedule: '09:00 - 18:00', status: 'attention', productivityGoal: 80, profileType: 'declining-prod', avatarColor: '#f59e0b', managerId: 'u-manager' },
]

function generateDates() {
  const dates = []
  const baseDate = new Date('2026-09-16')
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate)
    d.setDate(baseDate.getDate() - i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

const dates = generateDates()

export const employeeHistory: Record<string, DailyMetrics[]> = {}

employees.forEach((emp, empIdx) => {
  const history: DailyMetrics[] = []
  dates.forEach((date, dayIdx) => {
    let activeHours = 6.5
    let inactiveHours = 1.5
    let workedHours = 8.0
    let overtimeHours = 0.5
    let breaksCount = 3
    let avgBreakDurationMinutes = 15
    let focusedWorkMinutes = 240
    let meetingMinutes = 120
    let relativeActivity = 80
    let activityChangesCount = 120
    let workloadScore = 55
    let productivityScore = 85
    let stressScore = 40
    let status = emp.status

    const profile = emp.profileType

    if (profile === 'stable') {
      const noise = Math.sin(empIdx + dayIdx) * 3
      activeHours = 6.8 + noise * 0.05
      workedHours = 8.0
      overtimeHours = 0.2
      breaksCount = 3
      focusedWorkMinutes = 250
      meetingMinutes = 120
      workloadScore = 55 + Math.round(noise)
      productivityScore = 86 + Math.round(noise * 0.5)
      stressScore = 38 + Math.round(noise)
      status = 'healthy'
    } else if (profile === 'high-prod-low-stress') {
      activeHours = 7.2
      workedHours = 8.0
      overtimeHours = 0.0
      breaksCount = 4
      avgBreakDurationMinutes = 15
      focusedWorkMinutes = 320
      meetingMinutes = 90
      relativeActivity = 92
      workloadScore = 50
      productivityScore = 95
      stressScore = 25
      status = 'healthy'
    } else if (profile === 'overloaded') {
      const loadFactor = 1 + (dayIdx * 0.01)
      activeHours = 9.0 * loadFactor
      workedHours = 10.5
      overtimeHours = 2.8
      breaksCount = 1
      avgBreakDurationMinutes = 8
      focusedWorkMinutes = 380
      meetingMinutes = 180
      relativeActivity = 96
      workloadScore = 90 + Math.min(5, Math.round(dayIdx * 0.2))
      productivityScore = 78
      stressScore = 88 + Math.min(8, Math.round(dayIdx * 0.3))
      status = 'overload'
    } else if (profile === 'declining-prod') {
      const progress = dayIdx / 29
      productivityScore = Math.round(92 - (progress * 30))
      stressScore = Math.round(40 + (progress * 40))
      workloadScore = Math.round(60 + (progress * 25))
      overtimeHours = progress > 0.6 ? 2.0 : 0.5
      focusedWorkMinutes = Math.round(300 - (progress * 100))
      status = progress > 0.7 ? 'attention' : 'healthy'
    } else if (profile === 'increasing-stress') {
      const progress = dayIdx / 29
      stressScore = Math.round(30 + (progress * 58))
      workloadScore = Math.round(50 + (progress * 40))
      productivityScore = 82
      overtimeHours = Number((0.5 + progress * 2.0).toFixed(1))
      breaksCount = Math.max(1, Math.round(4 - (progress * 2)))
      status = progress > 0.5 ? 'attention' : 'healthy'
    } else if (profile === 'irregular') {
      const seed = Math.sin(dayIdx * 7 + empIdx)
      activeHours = 5 + Math.abs(seed) * 4
      workedHours = 7 + Math.abs(seed) * 3
      overtimeHours = seed > 0.5 ? 2.0 : 0.2
      breaksCount = seed > 0 ? 4 : 1
      focusedWorkMinutes = Math.round(180 + Math.abs(seed) * 200)
      meetingMinutes = Math.round(60 + Math.abs(seed) * 120)
      workloadScore = Math.round(40 + Math.abs(seed) * 50)
      productivityScore = Math.round(65 + Math.abs(seed) * 25)
      stressScore = Math.round(35 + Math.abs(seed) * 50)
      status = stressScore > 75 ? 'overload' : 'attention'
    } else if (profile === 'no-data') {
      activeHours = 0
      inactiveHours = 0
      workedHours = 0
      overtimeHours = 0
      breaksCount = 0
      avgBreakDurationMinutes = 0
      focusedWorkMinutes = 0
      meetingMinutes = 0
      relativeActivity = 0
      activityChangesCount = 0
      workloadScore = 0
      productivityScore = 0
      stressScore = 0
      status = 'no-data'
    } else if (profile === 'recovering') {
      const progress = dayIdx / 29
      stressScore = Math.round(85 - (progress * 48))
      workloadScore = Math.round(88 - (progress * 30))
      productivityScore = Math.round(70 + (progress * 18))
      overtimeHours = Math.max(0.2, Number((2.5 - progress * 2.0).toFixed(1)))
      breaksCount = Math.round(1 + (progress * 2))
      status = progress > 0.6 ? 'healthy' : 'attention'
    }

    history.push({
      date,
      activeHours: Number(activeHours.toFixed(1)),
      inactiveHours: Number((8 - activeHours).toFixed(1)),
      workedHours: Number(workedHours.toFixed(1)),
      overtimeHours: Number(overtimeHours.toFixed(1)),
      breaksCount,
      avgBreakDurationMinutes,
      focusedWorkMinutes,
      meetingMinutes,
      relativeActivity: Math.min(100, Math.max(0, Math.round(relativeActivity))),
      activityChangesCount,
      appsByCategory: {
        Development: Math.round(focusedWorkMinutes * 0.6),
        Communication: Math.round(meetingMinutes * 0.8),
        Productivity: 120,
        Browsing: 45,
        Other: 30,
      },
      workloadScore: Math.min(100, Math.max(0, workloadScore)),
      productivityScore: Math.min(100, Math.max(0, productivityScore)),
      stressScore: Math.min(100, Math.max(0, stressScore)),
      status,
    })
  })
  employeeHistory[emp.id] = history
})

export const stressMetrics: StressMetrics[] = employees.map((emp) => {
  const history = employeeHistory[emp.id] || []
  const validHistory = history.filter((h) => h.status !== 'no-data')
  const avgStress = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.stressScore, 0) / validHistory.length) : 25
  const peakStress = validHistory.length ? Math.max(...validHistory.map((h) => h.stressScore)) : 30
  const lowStress = validHistory.length ? Math.min(...validHistory.map((h) => h.stressScore)) : 10
  const avgWorkload = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.workloadScore, 0) / validHistory.length) : 40
  const recovery = Math.max(10, 100 - avgStress)

  let burnoutRisk: 'low' | 'moderate' | 'high' = 'low'
  if (avgStress > 70) burnoutRisk = 'high'
  else if (avgStress > 50) burnoutRisk = 'moderate'

  const stressTrend = history.filter((_, idx) => idx % 5 === 0 || idx === history.length - 1).map((h) => ({
    date: h.date.slice(5),
    value: h.stressScore,
  }))

  return {
    employeeId: emp.id,
    period: '30days',
    averageStressScore: avgStress,
    peakStressScore: peakStress,
    lowStressScore: lowStress,
    stressTrend,
    workloadScore: avgWorkload,
    recoveryScore: recovery,
    burnoutRisk,
  }
})

export const productivityMetrics: ProductivityMetrics[] = employees.map((emp) => {
  const history = employeeHistory[emp.id] || []
  const validHistory = history.filter((h) => h.status !== 'no-data')
  const totalFocusMin = validHistory.reduce((acc, h) => acc + h.focusedWorkMinutes, 0)
  const totalMeetingMin = validHistory.reduce((acc, h) => acc + h.meetingMinutes, 0)
  const totalOvertime = validHistory.reduce((acc, h) => acc + h.overtimeHours, 0)
  const totalBreaks = validHistory.reduce((acc, h) => acc + h.breaksCount, 0)
  const avgProd = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.productivityScore, 0) / validHistory.length) : 75

  return {
    employeeId: emp.id,
    period: '30days',
    focusHours: Number((totalFocusMin / 60).toFixed(1)),
    meetingsHours: Number((totalMeetingMin / 60).toFixed(1)),
    taskCompletionRate: avgProd,
    deadlinesMet: Math.round(avgProd / 10),
    deadlinesTotal: 12,
    overtimeHours: Number(totalOvertime.toFixed(1)),
    breaksTaken: totalBreaks,
    productivityScore: avgProd,
  }
})

export const activityRecords: ActivityRecord[] = []
employees.forEach((emp) => {
  const hist = employeeHistory[emp.id] || []
  if (hist.length > 0) {
    const latest = hist[hist.length - 1]
    activityRecords.push({
      id: 'act-' + emp.id + '-1',
      employeeId: emp.id,
      date: latest.date,
      type: 'focus-session',
      durationMinutes: latest.focusedWorkMinutes,
      description: 'Sesión de trabajo enfocado - ' + emp.departmentName,
      mood: latest.stressScore > 75 ? 'overwhelmed' : latest.stressScore > 50 ? 'tired' : 'positive',
    })
    activityRecords.push({
      id: 'act-' + emp.id + '-2',
      employeeId: emp.id,
      date: latest.date,
      type: 'meeting',
      durationMinutes: latest.meetingMinutes,
      description: 'Reunión de coordinación de equipo',
      mood: 'neutral',
    })
  }
})

export const stressInsights: StressInsight[] = employees
  .filter((e) => e.profileType === 'overloaded' || e.profileType === 'increasing-stress')
  .map((e, idx) => ({
    id: 'ins-' + (idx + 1),
    employeeId: e.id,
    title: e.profileType === 'overloaded' ? 'Carga de trabajo elevada sostenida' : 'Tendencia de estrés ascendente',
    description: 'El empleado ' + e.name + ' muestra indicadores de estrés elevados en las últimas semanas.',
    severity: 'critical',
    date: '2026-09-16',
    recommendedAction: 'Reasignar tareas pendientes y programar una sesión de bienestar.',
  }))

export const alerts: Alert[] = employees
  .filter((e) => e.status === 'overload' || e.profileType === 'increasing-stress')
  .map((e, idx) => ({
    id: 'alt-' + (idx + 1),
    employeeId: e.id,
    type: e.status === 'overload' ? 'workload' : 'stress',
    title: e.status === 'overload' ? 'Sobrecarga detectada' : 'Alerta de estrés elevado',
    description: 'Nivel de estrés o carga superó el umbral seguro en ' + e.departmentName + '.',
    severity: 'high',
    createdAt: '2026-09-16T08:30:00Z',
    status: 'open',
    assignedTo: 'u-manager',
  }))

export const privacySettings: PrivacySettings = {
  dataRetentionDays: 90,
  anonymizeAfterDays: 365,
  allowKeystrokeCapture: false,
  allowScreenshotCapture: false,
  allowActivityTracking: true,
  allowStressScoring: true,
  managerVisibilityLevel: 'aggregated',
  employeeCanOptOut: true,
}