"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, FileText, Users, Brain } from "lucide-react"
import Link from "next/link"

interface SurveyResponse {
  id: string
  surveyId: string
  surveyTitle: string
  answers: Record<string, string>
  diagnosis: string
  submittedAt: string
}

interface Survey {
  id: string
  title: string
  description: string
  questions: any[]
  createdAt: string
}

export default function DashboardPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("survey-responses") || "[]")
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
    setResponses(savedResponses)
    setSurveys(savedSurveys)
  }, [])

  const getResponsesForSurvey = (surveyId: string) => {
    return responses.filter((r) => r.surveyId === surveyId)
  }

  const totalResponses = responses.length
  const totalSurveys = surveys.length
  const avgResponsesPerSurvey = totalSurveys > 0 ? (totalResponses / totalSurveys).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Análisis</h1>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalSurveys}</p>
                <p className="text-sm text-gray-600">Encuestas Creadas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
                <p className="text-sm text-gray-600">Respuestas Totales</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgResponsesPerSurvey}</p>
                <p className="text-sm text-gray-600">Promedio por Encuesta</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Brain className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
                <p className="text-sm text-gray-600">Diagnósticos IA</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encuestas y sus Estadísticas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Análisis por Encuesta</h2>

          {surveys.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos para mostrar</h3>
                <p className="text-gray-600 mb-4">Crea encuestas y recopila respuestas para ver análisis detallados</p>
                <Link href="/create-survey">
                  <Button>Crear Primera Encuesta</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            surveys.map((survey) => {
              const surveyResponses = getResponsesForSurvey(survey.id)
              return (
                <Card key={survey.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{survey.title}</span>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {surveyResponses.length} respuestas
                      </div>
                    </CardTitle>
                    <CardDescription>{survey.description || "Sin descripción"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {surveyResponses.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No hay respuestas para esta encuesta aún</p>
                        <Link href={`/survey/${survey.id}`}>
                          <Button variant="outline">Responder Encuesta</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Estadísticas</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-blue-800">Total de respuestas: {surveyResponses.length}</p>
                              <p className="text-blue-800">
                                Última respuesta:{" "}
                                {new Date(
                                  surveyResponses[surveyResponses.length - 1]?.submittedAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">IA Insights</h4>
                            <p className="text-sm text-green-800">
                              {surveyResponses.length} diagnósticos generados automáticamente
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Diagnósticos Recientes</h4>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {surveyResponses
                              .slice(-3)
                              .reverse()
                              .map((response) => (
                                <div key={response.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">
                                      Respuesta #{response.id.slice(-4)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(response.submittedAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 line-clamp-3">{response.diagnosis}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
