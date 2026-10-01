import * as React from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">404 — Página no encontrada</h1>
      <p className="text-muted-foreground">
        La página que buscas no existe en el sistema académico simulado.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Ir al inicio
      </Link>
    </div>
  )
}
