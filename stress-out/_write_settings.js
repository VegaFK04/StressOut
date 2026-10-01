import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const targetPath = path.resolve(__dirname, 'src/pages/SettingsPage.tsx')

const settingsPageCode = `import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/utils/format'

export function SettingsPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')
  const [language, setLanguage] = React.useState<'es' | 'en'>('es')
  const [notifications, setNotifications] = React.useState(true)
  const [dataSharing, setDataSharing] = React.useState(false)
  const [name, setName] = React.useState('')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Ajusta las preferencias de la aplicación a tu gusto.
        </p>
      </div>

      {/* Apariencia */}
      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Elige el tema y el idioma de la interfaz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={theme === 'system'}
                onChange={() => setTheme('system')}
                className="rounded border-input"
              />
              <span>Sistema</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
                className="rounded border-input"
              />
              <span>Ligero</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
                className="rounded border-input"
              />
              <span>Oscuro</span>
            </label>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={language === 'es'}
                onChange={() => setLanguage('es')}
                className="rounded border-input"
              />
              <span>Español</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
                className="rounded border-input"
              />
              <span>English</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>Controla los tipos de notificaciones que recibes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            name="notifications"
            aria-label="Activar notificaciones"
          />
          <p className="text-sm text-muted-foreground">
            Recibir alertas y resumos por correo electrónico
          </p>
        </CardContent>
      </Card>

      {/* Compartir datos */}
      <Card>
        <CardHeader>
          <CardTitle>Compartir datos anonymizados</CardTitle>
          <CardDescription>
            Ayuda a mejorar Stress Out compartiendo datos anonymizados de forma opt-in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch
            checked={dataSharing}
            onCheckedChange={setDataSharing}
            name="data-sharing"
            aria-label="Compartir datos anonymizados"
          />
          <p className="text-sm text-muted-foreground">
            Tus datos se agregarán de forma anonima para mejorar el algoritmo de
            bienestar.
          </p>
        </CardContent>
      </Card>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Actualiza tu nombre para mostrar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            aria-label="Nombre completo"
          />
          <p className="text-sm text-muted-foreground">
            El nombre que se muestra en el encabezado de la aplicación.
          </p>
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="space-y-4 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => {
            setTheme('system')
            setLanguage('es')
            setNotifications(true)
            setDataSharing(false)
            setName('')
          }}
        >
          Restablecer ajustes
        </Button>
        <Button>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
`

fs.writeFileSync(targetPath, settingsPageCode, 'utf8')
console.log('Successfully wrote SettingsPage.tsx')
