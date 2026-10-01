import type { StressAnalysisResult } from './stressAnalysisEngine';
import { analyzeEmployee } from './stressAnalysisEngine';
import type {
  Employee,
  Alert,
  StressInsight,
  StressMetrics,
  ProductivityMetrics,
  ActivityRecord,
  Department,
  TeamUser,
  PrivacySettings,
  DepartmentMetrics,
  Period,
  DailyMetrics,
} from '../types'
import {
  employees,
  employeeHistory,
  alerts,
  stressInsights,
  stressMetrics,
  productivityMetrics,
  activityRecords,
  departments,
  teamUsers,
  privacySettings,
} from '../data/mockData'

export function getEmployees(period?: Period): Employee[] {
  return employees
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id)
}

export function getDepartments(): Department[] {
  return departments
}

export function getTeamUsers(): TeamUser[] {
  return teamUsers
}

export function getAlerts(): Alert[] {
  return alerts
}

export function getPrivacySettings(): PrivacySettings {
  return privacySettings
}

export function updatePrivacySettings(newSettings: Partial<PrivacySettings>): PrivacySettings {
  Object.assign(privacySettings, newSettings)
  return privacySettings
}

export function getEmployeeHistory(id: string, period?: Period): DailyMetrics[] {
  const history = employeeHistory[id] || []
  if (!period || period === '30days' || period === 'month') {
    return history
  }
  if (period === '7days' || period === 'week') {
    return history.slice(-7)
  }
  if (period === 'today') {
    return history.slice(-1)
  }
  return history
}

export function getEmployeeMetrics(id: string, period?: Period): { stress?: StressMetrics; productivity?: ProductivityMetrics } {
  const history = getEmployeeHistory(id, period)
  const validHistory = history.filter((h) => h.status !== 'no-data')

  const avgStress = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.stressScore, 0) / validHistory.length) : 25
  const peakStress = validHistory.length ? Math.max(...validHistory.map((h) => h.stressScore)) : 30
  const lowStress = validHistory.length ? Math.min(...validHistory.map((h) => h.stressScore)) : 10
  const avgWorkload = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.workloadScore, 0) / validHistory.length) : 40
  const recovery = Math.max(10, 100 - avgStress)

  let burnoutRisk: 'low' | 'moderate' | 'high' = 'low'
  if (avgStress > 70) burnoutRisk = 'high'
  else if (avgStress > 50) burnoutRisk = 'moderate'

  const stressTrend = history.map((h) => ({
    date: h.date.slice(5),
    value: h.stressScore,
  }))

  const stress: StressMetrics = {
    employeeId: id,
    period: period || '30days',
    averageStressScore: avgStress,
    peakStressScore: peakStress,
    lowStressScore: lowStress,
    stressTrend,
    workloadScore: avgWorkload,
    recoveryScore: recovery,
    burnoutRisk,
  }

  const totalFocusMin = validHistory.reduce((acc, h) => acc + h.focusedWorkMinutes, 0)
  const totalMeetingMin = validHistory.reduce((acc, h) => acc + h.meetingMinutes, 0)
  const totalOvertime = validHistory.reduce((acc, h) => acc + h.overtimeHours, 0)
  const totalBreaks = validHistory.reduce((acc, h) => acc + h.breaksCount, 0)
  const avgProd = validHistory.length ? Math.round(validHistory.reduce((acc, h) => acc + h.productivityScore, 0) / validHistory.length) : 75

  const productivity: ProductivityMetrics = {
    employeeId: id,
    period: period || '30days',
    focusHours: Number((totalFocusMin / 60).toFixed(1)),
    meetingsHours: Number((totalMeetingMin / 60).toFixed(1)),
    taskCompletionRate: avgProd,
    deadlinesMet: Math.round(avgProd / 10),
    deadlinesTotal: 12,
    overtimeHours: Number(totalOvertime.toFixed(1)),
    breaksTaken: totalBreaks,
    productivityScore: avgProd,
  }

  return { stress, productivity }
}

export function getDepartmentMetrics(period?: Period): DepartmentMetrics[] {
  return departments.map((dept) => {
    const deptEmployees = employees.filter((e) => e.departmentId === dept.id)
    let totalStress = 0
    let totalProd = 0
    let totalOvertime = 0
    let count = 0

    deptEmployees.forEach((emp) => {
      const metrics = getEmployeeMetrics(emp.id, period)
      if (metrics.stress && metrics.productivity) {
        totalStress += metrics.stress.averageStressScore
        totalProd += metrics.productivity.productivityScore
        totalOvertime += metrics.productivity.overtimeHours
        count++
      }
    })

    const openAlertsCount = alerts.filter(
      (a) => a.status === 'open' && deptEmployees.some((e) => e.id === a.employeeId)
    ).length

    return {
      departmentId: dept.id,
      departmentName: dept.name,
      employeeCount: deptEmployees.length,
      averageStress: count > 0 ? Math.round(totalStress / count) : 0,
      averageProductivity: count > 0 ? Math.round(totalProd / count) : 0,
      totalOvertimeHours: Number(totalOvertime.toFixed(1)),
      openAlertsCount,
    }
  })
}

export function getTeamStats(period?: Period) {
  const activeCount = employees.filter((e) => e.status !== 'paused' && e.status !== 'no-data').length
  let totalStress = 0
  let totalProd = 0
  let stressCount = 0

  employees.forEach((emp) => {
    const metrics = getEmployeeMetrics(emp.id, period)
    if (metrics.stress) {
      totalStress += metrics.stress.averageStressScore
      stressCount++
    }
    if (metrics.productivity) {
      totalProd += metrics.productivity.productivityScore
    }
  })

  const avgStress = stressCount > 0 ? Math.round(totalStress / stressCount) : 40
  const avgProductivity = stressCount > 0 ? Math.round(totalProd / stressCount) : 80
  const openAlerts = alerts.filter((a) => a.status === 'open').length

  return {
    totalEmployees: employees.length,
    activeEmployees: activeCount,
    averageStress: avgStress,
    openAlerts,
    averageProductivity: avgProductivity,
  }
}

export function getStressMetrics(): StressMetrics[] {
  return stressMetrics
}

export function getProductivityMetrics(): ProductivityMetrics[] {
  return productivityMetrics
}

export function getActivityRecords(): ActivityRecord[] {
  return activityRecords
}

export function getStressInsights(): StressInsight[] {
  return stressInsights
}
export function getEmployeeStressAnalysis(id: string, period?: Period): StressAnalysisResult {
  const employee = getEmployeeById(id);
  const history = getEmployeeHistory(id, period);
  return analyzeEmployee(employee || id, history, period || '30days');
}
