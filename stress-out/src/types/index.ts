export type ID = string

export type Role = 'admin' | 'manager' | 'employee'

export type Period = 'today' | '7days' | '30days' | 'week' | 'month'

export type EmployeeStatus = 'healthy' | 'attention' | 'overload' | 'no-data' | 'paused' | 'active' | 'on-leave' | 'offboarded'

export type ProfileType =
  | 'stable'
  | 'high-prod-low-stress'
  | 'overloaded'
  | 'declining-prod'
  | 'increasing-stress'
  | 'irregular'
  | 'no-data'
  | 'recovering'

export interface Department {
  id: ID
  name: string
  color: string
}

export interface Employee {
  id: ID
  name: string
  email: string
  role: string
  departmentId: ID
  departmentName: string
  location: string
  joinDate: string
  seniority: 'Junior' | 'Semi-Senior' | 'Senior' | 'Lead'
  schedule: string
  status: EmployeeStatus
  productivityGoal: number
  profileType: ProfileType
  avatarColor: string
  managerId: ID | null
}

export interface AppsByCategory {
  Development: number
  Communication: number
  Productivity: number
  Browsing: number
  Other: number
  [key: string]: number
}

export interface DailyMetrics {
  date: string
  activeHours: number
  inactiveHours: number
  workedHours: number
  overtimeHours: number
  breaksCount: number
  avgBreakDurationMinutes: number
  focusedWorkMinutes: number
  meetingMinutes: number
  relativeActivity: number
  activityChangesCount: number
  appsByCategory: AppsByCategory
  workloadScore: number
  productivityScore: number
  stressScore: number
  status: EmployeeStatus
}

export type ActivityType =
  | 'focus-session'
  | 'meeting'
  | 'break'
  | 'overtime'
  | 'task-completed'
  | 'check-in'

export type Mood = 'positive' | 'neutral' | 'tired' | 'overwhelmed'

export interface ActivityRecord {
  id: ID
  employeeId: ID
  date: string
  type: ActivityType
  durationMinutes: number
  description: string
  mood?: Mood
}

export interface StressTrendPoint {
  date: string
  value: number
}

export interface StressMetrics {
  employeeId: ID
  period: Period
  averageStressScore: number
  peakStressScore: number
  lowStressScore: number
  stressTrend: StressTrendPoint[]
  workloadScore: number
  recoveryScore: number
  burnoutRisk: 'low' | 'moderate' | 'high'
}

export interface ProductivityMetrics {
  employeeId: ID
  period: Period
  focusHours: number
  meetingsHours: number
  taskCompletionRate: number
  deadlinesMet: number
  deadlinesTotal: number
  overtimeHours: number
  breaksTaken: number
  productivityScore: number
}

export type InsightSeverity = 'info' | 'warning' | 'critical'

export interface StressInsight {
  id: ID
  employeeId: ID
  title: string
  description: string
  severity: InsightSeverity
  date: string
  recommendedAction: string
}

export type AlertType = 'stress' | 'workload' | 'overtime' | 'inactivity'
export type AlertSeverity = 'low' | 'moderate' | 'high'
export type AlertStatus = 'open' | 'acknowledged' | 'resolved'

export interface Alert {
  id: ID
  employeeId: ID
  type: AlertType
  title: string
  description: string
  severity: AlertSeverity
  createdAt: string
  status: AlertStatus
  assignedTo: ID | null
}

export interface TeamUser {
  id: ID
  name: string
  role: Role
  email: string
}

export interface PrivacySettings {
  dataRetentionDays: number
  anonymizeAfterDays: number
  allowKeystrokeCapture: boolean
  allowScreenshotCapture: boolean
  allowActivityTracking: boolean
  allowStressScoring: boolean
  managerVisibilityLevel: 'aggregated' | 'detailed' | 'restricted'
  employeeCanOptOut: boolean
}

export interface DepartmentMetrics {
  departmentId: ID
  departmentName: string
  employeeCount: number
  averageStress: number
  averageProductivity: number
  totalOvertimeHours: number
  openAlertsCount: number
}
