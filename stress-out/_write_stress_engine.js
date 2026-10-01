import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = __dirname;

function writeFile(relativePath, content) {
  const fullPath = path.join(base, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Wrote:', relativePath);
}

// 1. Create stress-out/src/services/stressAnalysisEngine.ts
const stressAnalysisEngineCode = `import type { DailyMetrics } from '../types'

export type StressLevel = 'low' | 'moderate' | 'elevated' | 'high'
export type StressTrend = 'improving' | 'stable' | 'increasing' | 'decreasing'

export interface ContributingFactor {
  factor: 'workloadDeviation' | 'overtimeDeviation' | 'activityDeviation' | 'breakDeviation' | 'focusDuration' | 'patternChange'
  name: string
  impact: 'low' | 'moderate' | 'high'
  description: string
}

export interface StressAnalysisResult {
  employeeId: string
  period: string
  stressScore: number
  confidence: number
  level: StressLevel
  trend: StressTrend
  factors: ContributingFactor[]
  explanation: string
  recommendation: string
  timestamp: string
  baselineComparison: {
    personalBaseline: number
    deviation: number
  }
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

export function calculateStressTrend(history: DailyMetrics[]): StressTrend {
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
        name: 'Cambio de patrón base',
        impact: 'low',
        description: 'Indicador estable dentro del nivel estimado sin desviaciones notables.',
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
      name: 'Desviación de carga laboral',
      impact: workloadDev > 25 ? 'high' : 'moderate',
      description: 'Posible sobrecarga operativa detectada respecto al promedio estimado de tareas.',
    })
  }

  const overtime = latest.overtimeHours ?? 0
  if (overtime > 1.5) {
    factors.push({
      factor: 'overtimeDeviation',
      name: 'Indicador de horas extra',
      impact: overtime > 3 ? 'high' : 'moderate',
      description: 'Señal de extensión de jornada más allá del horario habitual establecido.',
    })
  }

  const activity = latest.relativeActivity ?? 50
  if (activity > 80) {
    factors.push({
      factor: 'activityDeviation',
      name: 'Intensidad de actividad',
      impact: 'moderate',
      description: 'Ritmo operativo elevado con alta frecuencia de interacción digital.',
    })
  }

  const breaks = latest.breaksCount ?? 3
  if (breaks < 2) {
    factors.push({
      factor: 'breakDeviation',
      name: 'Indicador de pausas reducidas',
      impact: breaks === 0 ? 'high' : 'moderate',
      description: 'Señales de intervalos de descanso inferiores al patrón recomendado.',
    })
  }

  const focusMin = latest.focusedWorkMinutes ?? 180
  if (focusMin > 300) {
    factors.push({
      factor: 'focusDuration',
      name: 'Duración de foco continuo',
      impact: 'moderate',
      description: 'Bloques prolongados de concentración sin interrupción de pausas breves.',
    })
  }

  if (factors.length === 0) {
    factors.push({
      factor: 'patternChange',
      name: 'Estabilidad de patrón',
      impact: 'low',
      description: 'Indicador equilibrado acorde al historial personal de referencia.',
    })
  }

  return factors
}

export function analyzeEmployeeStress(employeeId: string, history: DailyMetrics[], period: string = '30days'): StressAnalysisResult {
  const baseline = calculatePersonalBaseline(history)
  const trend = calculateStressTrend(history)

  const valid = history.filter((h) => h.status !== 'no-data' && typeof h.stressScore === 'number')
  const latestScore = valid.length > 0 ? valid[valid.length - 1].stressScore : baseline
  const stressScore = Math.round(latestScore * 0.6 + baseline * 0.4)

  let level: StressLevel = 'low'
  if (stressScore > 75) level = 'high'
  else if (stressScore > 55) level = 'elevated'
  else if (stressScore > 35) level = 'moderate'

  const factors = calculateContributingFactors(history, baseline)

  let explanation = `Nivel estimado dentro del rango habitual para el colaborador, con una desviación del ${Math.abs(stressScore - baseline)}% respecto a su línea base personal.`
  let recommendation = `Mantener el ritmo actual de trabajo y asegurar pausas regulares durante la jornada.`

  if (level === 'high' || level === 'elevated') {
    explanation = `Posible sobrecarga detectada. El indicador actual supera el baseline personal debido a variaciones en la carga operativa y ritmo de actividad.`
    recommendation = `Sugerir revisión de prioridades de sprint, equilibrio de tareas y refuerzo de desconexión digital.`
  } else if (trend === 'increasing') {
    explanation = `Se observa una tendencia ascendente en el indicador de estrés durante los últimos períodos analizados.`
    recommendation = `Monitorear la distribución de reuniones y programar un espacio de diálogo preventivo.`
  }

  const confidence = valid.length >= 10 ? 92 : valid.length >= 5 ? 85 : 75

  return {
    employeeId,
    period,
    stressScore,
    confidence,
    level,
    trend,
    factors,
    explanation,
    recommendation,
    timestamp: new Date().toISOString(),
    baselineComparison: {
      personalBaseline: baseline,
      deviation: stressScore - baseline,
    },
  }
}
`;

writeFile('src/services/stressAnalysisEngine.ts', stressAnalysisEngineCode);

// 2. Update mockDataService.ts
const mockDataServicePath = path.join(base, 'src/services/mockDataService.ts');
let mockDataContent = fs.readFileSync(mockDataServicePath, 'utf8');

if (!mockDataContent.includes('getEmployeeStressAnalysis')) {
  mockDataContent = "import type { StressAnalysisResult } from './stressAnalysisEngine';\nimport { analyzeEmployeeStress } from './stressAnalysisEngine';\n\n" + mockDataContent;
  
  mockDataContent += "\nexport function getEmployeeStressAnalysis(id: string, period?: Period): StressAnalysisResult {\n  const history = getEmployeeHistory(id, period);\n  return analyzeEmployeeStress(id, history, period || '30days');\n}\n";

  fs.writeFileSync(mockDataServicePath, mockDataContent, 'utf8');
  console.log('Updated: src/services/mockDataService.ts');
}

// 3. Update DashboardPage.tsx
const dashboardPath = path.join(base, 'src/pages/DashboardPage.tsx');
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
if (!dashboardContent.includes('getEmployeeStressAnalysis')) {
  dashboardContent = dashboardContent.replace(
    "import {\n  getTeamStats,\n  getStressInsights,\n  getAlerts,\n  getDepartmentMetrics,\n  getEmployees,\n  getStressMetrics,\n} from '@/services/mockDataService'",
    "import {\n  getTeamStats,\n  getStressInsights,\n  getAlerts,\n  getDepartmentMetrics,\n  getEmployees,\n  getStressMetrics,\n  getEmployeeStressAnalysis,\n} from '@/services/mockDataService'"
  );
  fs.writeFileSync(dashboardPath, dashboardContent, 'utf8');
  console.log('Updated: DashboardPage.tsx');
}

// 4. Update EmployeeDetailPage.tsx
const employeeDetailPath = path.join(base, 'src/pages/EmployeeDetailPage.tsx');
let employeeDetailContent = fs.readFileSync(employeeDetailPath, 'utf8');
if (!employeeDetailContent.includes('getEmployeeStressAnalysis')) {
  employeeDetailContent = employeeDetailContent.replace(
    "import {\n  getEmployeeById,\n  getActivityRecords,\n  getEmployeeMetrics,\n  getStressInsights,\n  getDepartments,\n} from '@/services/mockDataService'",
    "import {\n  getEmployeeById,\n  getActivityRecords,\n  getEmployeeMetrics,\n  getStressInsights,\n  getDepartments,\n  getEmployeeStressAnalysis,\n} from '@/services/mockDataService'"
  );

  employeeDetailContent = employeeDetailContent.replace(
    "  const metrics = getEmployeeMetrics(employee.id, '30days')\n  const activities = getActivityRecords().filter((a) => a.employeeId === employee.id)\n  const insights = getStressInsights().filter((i) => i.employeeId === employee.id)\n\n  const stressScore = metrics.stress?.averageStressScore ?? 40\n  const burnoutRisk = metrics.stress?.burnoutRisk ?? 'low'\n  const prodScore = metrics.productivity?.productivityScore ?? 85\n  const overtime = metrics.productivity?.overtimeHours ?? 2.5\n  const focusHrs = metrics.productivity?.focusHours ?? 34\n  const recoveryScore = metrics.stress?.recoveryScore ?? 75",
    "  const metrics = getEmployeeMetrics(employee.id, '30days')\n  const stressAnalysis = getEmployeeStressAnalysis(employee.id, '30days')\n  const activities = getActivityRecords().filter((a) => a.employeeId === employee.id)\n  const insights = getStressInsights().filter((i) => i.employeeId === employee.id)\n\n  const stressScore = stressAnalysis.stressScore\n  const burnoutRisk = stressAnalysis.level === 'high' ? 'high' : stressAnalysis.level === 'elevated' ? 'moderate' : 'low'\n  const prodScore = metrics.productivity?.productivityScore ?? 85\n  const overtime = metrics.productivity?.overtimeHours ?? 2.5\n  const focusHrs = metrics.productivity?.focusHours ?? 34\n  const recoveryScore = Math.max(15, 100 - stressScore)"
  );

  const oldFactorsBlock = `<div className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
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
            </div>`;

  const newFactorsBlock = `{stressAnalysis.factors.map((factor, idx) => (
              <div key={idx} className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
                <Activity className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{factor.name}</p>
                    <Badge variant={factor.impact === 'high' ? 'destructive' : factor.impact === 'moderate' ? 'secondary' : 'outline'}>
                      {factor.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              </div>
            ))}`;

  if (employeeDetailContent.includes('Distribución de Reuniones')) {
    employeeDetailContent = employeeDetailContent.replace(oldFactorsBlock, newFactorsBlock);
  }

  fs.writeFileSync(employeeDetailPath, employeeDetailContent, 'utf8');
  console.log('Updated: EmployeeDetailPage.tsx');
}