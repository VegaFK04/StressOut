import fs from 'fs';
import path from 'path';

const code = `import type { DailyMetrics, Employee } from '../types'

export type IndicatorLevel = 'low' | 'moderate' | 'elevated' | 'high'
export type TrendDirection = 'improving' | 'stable' | 'increasing' | 'decreasing'

export interface ContributingFactor {
  factor: 'workloadDeviation' | 'overtimeDeviation' | 'activityDeviation' | 'breakDeviation' | 'focusDuration' | 'patternChange'
  name: string
  impact: 'low' | 'moderate' | 'high'
  description: string
}

export interface StressAnalysisResult {
  employeeId: string
  period: string
  estimationScore: number
  confidence: number
  level: IndicatorLevel
  trend: TrendDirection
  factors: ContributingFactor[]
  estimationText: string
  recommendation: string
  timestamp: string
  baselineComparison: {
    personalBaseline: number
    deviation: number
  }
  possibleOverload: boolean
  patternChange: boolean
}

export function calculatePersonalBaseline(history: DailyMetrics[]): number {
  if (!history || history.length === 0) return 30
  const valid = history.filter((h) => h.status !== 'no-data' && typeof h.stressScore === 'number')
  if (valid.length === 0) return 30

  const scores = valid.map((h) => h.stressScore).sort((a, b) => a - b)
  const trimCount = Math.floor(scores.length * 0.1)
  const trimmed = scores.length > 4 ? scores.slice(trimCount, scores.length - trimCount) : scores
  const sum = trimmed.reduce((acc, s) => acc + s, 0)
  return Math.round(sum / trimmed.length)
}

export function calculateStressTrend(history: DailyMetrics[]): TrendDirection {
  if (!history || history.length < 3) return 'stable'
  const valid = history.filter((h) => h.status !== 'no-data' && typeof h.stressScore === 'number')
  if (valid.length < 3) return 'stable'

  const recentCount = Math.max(2, Math.floor(valid.length / 3))
  const recent = valid.slice(-recentCount)
  const previous = valid.slice(0, valid.length - recentCount)

  const recentAvg = recent.reduce((acc, h) => acc + h.stressScore, 0) / recent.length
  const prevAvg = previous.reduce((acc, h) => acc + h.stressScore, 0) / previous.length

  const diff = recentAvg - prevAvg
  if (diff > 5) return 'increasing'
  if (diff < -5) return 'decreasing'
  return 'stable'
}

export function calculateContributingFactors(history: DailyMetrics[], baseline: number): ContributingFactor[] {
  if (!history || history.length === 0) {
    return [
      {
        factor: 'patternChange',
        name: 'Pattern change baseline indicator',
        impact: 'low',
        description: 'Stable signal within estimated operational parameters with no notable deviations.',
      },
    ]
  }

  const latest = history[history.length - 1] || {
    workloadScore: 40,
    overtimeHours: 0,
    relativeActivity: 50,
    breaksCount: 3,
    focusedWorkMinutes: 180,
    activityChangesCount: 10,
    stressScore: baseline,
  }

  const factors: ContributingFactor[] = []

  const workloadDev = (latest.workloadScore ?? 40) - 50
  if (workloadDev > 15) {
    factors.push({
      factor: 'workloadDeviation',
      name: 'Workload indicator variation',
      impact: workloadDev > 25 ? 'high' : 'moderate',
      description: 'Possible overload signal detected regarding estimated task volume.',
    })
  }

  const overtime = latest.overtimeHours ?? 0
  if (overtime > 1.5) {
    factors.push({
      factor: 'overtimeDeviation',
      name: 'Extended hours indicator',
      impact: overtime > 3 ? 'high' : 'moderate',
      description: 'Signal of schedule extension beyond established regular operational hours.',
    })
  }

  const activity = latest.relativeActivity ?? 50
  if (activity > 80) {
    factors.push({
      factor: 'activityDeviation',
      name: 'Operational activity intensity',
      impact: 'moderate',
      description: 'Elevated operational pace with high frequency of digital interactions.',
    })
  }

  const breaks = latest.breaksCount ?? 3
  if (breaks < 2) {
    factors.push({
      factor: 'breakDeviation',
      name: 'Break interval indicator',
      impact: breaks === 0 ? 'high' : 'moderate',
      description: 'Signal of rest intervals falling below recommended operational patterns.',
    })
  }

  const focusMin = latest.focusedWorkMinutes ?? 180
  if (focusMin > 300) {
    factors.push({
      factor: 'focusDuration',
      name: 'Continuous focus duration',
      impact: 'moderate',
      description: 'Prolonged concentration blocks without short pause interruptions.',
    })
  }

  if (factors.length === 0) {
    factors.push({
      factor: 'patternChange',
      name: 'Pattern change stability indicator',
      impact: 'low',
      description: 'Balanced indicator consistent with personal reference history.',
    })
  }

  return factors
}

export function analyzeEmployee(
  employee: Employee | string,
  history: DailyMetrics[],
  period: string = '30days'
): StressAnalysisResult {
  const employeeId = typeof employee === 'string' ? employee : employee.id
  const baseline = calculatePersonalBaseline(history)
  const trend = calculateStressTrend(history)

  const valid = history.filter((h) => h.status !== 'no-data' && typeof h.stressScore === 'number')
  const latestScore = valid.length > 0 ? valid[valid.length - 1].stressScore : baseline
  const estimationScore = Math.round(latestScore * 0.6 + baseline * 0.4)

  let level: IndicatorLevel = 'low'
  if (estimationScore > 75) level = 'high'
  else if (estimationScore > 55) level = 'elevated'
  else if (estimationScore > 35) level = 'moderate'

  const factors = calculateContributingFactors(history, baseline)
  const possibleOverload = estimationScore > 65 || level === 'high' || level === 'elevated'
  const patternChange = trend !== 'stable' || Math.abs(estimationScore - baseline) > 15

  let estimationText = \`Estimation within standard operational range for the contributor, with a deviation of \${Math.abs(estimationScore - baseline)}% relative to personal baseline.\`
  let recommendation = \`Maintain current operational rhythm and ensure regular breaks during the schedule.\`

  if (possibleOverload) {
    estimationText = \`Possible overload detected. Current indicator exceeds personal baseline due to variations in operational workload and activity rhythm.\`
    recommendation = \`Suggest sprint priority review, task balancing, and digital disconnection reinforcement.\`
  } else if (trend === 'increasing') {
    estimationText = \`Ascending trend observed in the signal indicator across recent analyzed periods.\`
    recommendation = \`Monitor meeting distribution and schedule a preventative dialogue space.\`
  }

  const confidence = valid.length >= 10 ? 92 : valid.length >= 5 ? 85 : 75

  return {
    employeeId,
    period,
    estimationScore,
    confidence,
    level,
    trend,
    factors,
    estimationText,
    recommendation,
    timestamp: new Date().toISOString(),
    baselineComparison: {
      personalBaseline: baseline,
      deviation: estimationScore - baseline,
    },
    possibleOverload,
    patternChange,
  }
}
`;

const targetDir = path.join('stress-out', 'src', 'services');
fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, 'stressAnalysisEngine.ts'), code, 'utf8');
console.log('Created stressAnalysisEngine.ts successfully.');
