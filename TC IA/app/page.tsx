import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, BarChart3, FileText, Brain } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Sistema de Encuestas IA</h1>
          <p className="text-lg text-gray-600">Crea encuestas inteligentes y obtén diagnósticos automáticos con IA</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-blue-600" />
                Crear Encuesta
              </CardTitle>
              <CardDescription>Diseña encuestas personalizadas con diferentes tipos de preguntas</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create-survey">
                <Button className="w-full">Crear Nueva Encuesta</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Responder Encuesta
              </CardTitle>
              <CardDescription>Participa en encuestas y recibe diagnósticos personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/surveys">
                <Button variant="outline" className="w-full">
                  Ver Encuestas
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Dashboard
              </CardTitle>
              <CardDescription>Analiza resultados y diagnósticos generados por IA</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Ver Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Características del Sistema</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">✨ Análisis Inteligente</h3>
              <p className="text-sm text-gray-600">
                La IA analiza las respuestas y genera diagnósticos personalizados automáticamente
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">📊 Múltiples Tipos de Preguntas</h3>
              <p className="text-sm text-gray-600">Opción múltiple, texto libre, escalas de valoración y más</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">📈 Dashboard Completo</h3>
              <p className="text-sm text-gray-600">Visualiza estadísticas, tendencias y diagnósticos en tiempo real</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">🎯 Diagnósticos Precisos</h3>
              <p className="text-sm text-gray-600">
                Obtén insights valiosos y recomendaciones basadas en las respuestas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
