"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Users } from "lucide-react"
import Link from "next/link"

interface Survey {
  id: string
  title: string
  description: string
  questions: any[]
  createdAt: string
}

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]")
    setSurveys(savedSurveys)
  }, [])

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
          <h1 className="text-3xl font-bold text-gray-900">Encuestas Disponibles</h1>
        </div>

        {surveys.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay encuestas disponibles</h3>
              <p className="text-gray-600 mb-4">Crea tu primera encuesta para comenzar</p>
              <Link href="/create-survey">
                <Button>Crear Encuesta</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {survey.title}
                  </CardTitle>
                  <CardDescription>{survey.description || "Sin descripción"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {survey.questions.length} preguntas
                    </div>
                    <div className="text-sm text-gray-500">
                      Creada: {new Date(survey.createdAt).toLocaleDateString()}
                    </div>
                    <Link href={`/survey/${survey.id}`}>
                      <Button className="w-full">Responder Encuesta</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
