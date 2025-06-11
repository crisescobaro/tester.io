"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Brain, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  type: "multiple-choice" | "text" | "scale" | "yes-no"
  question: string
  options?: string[]
  required: boolean
}

interface Survey {
  id: string
  title: string
  description: string
  questions: Question[]
  createdAt: string
}

export default function SurveyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [diagnosis, setDiagnosis] = useState<string | null>(null)

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]")
    const foundSurvey = surveys.find((s: Survey) => s.id === params.id)
    setSurvey(foundSurvey || null)
  }, [params.id])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const generateDiagnosis = async (surveyData: Survey, userAnswers: Record<string, string>) => {
    try {
      const response = await fetch("/api/analyze-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          survey: surveyData,
          answers: userAnswers,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al generar diagnóstico")
      }

      const data = await response.json()
      return data.diagnosis
    } catch (error) {
      console.error("Error:", error)
      return "No se pudo generar el diagnóstico automático. Por favor, revisa las respuestas manualmente."
    }
  }

  const handleSubmit = async () => {
    if (!survey) return

    // Verificar respuestas requeridas
    const missingAnswers = survey.questions.filter((q) => q.required && !answers[q.id]).map((q) => q.question)

    if (missingAnswers.length > 0) {
      alert(`Por favor responde las siguientes preguntas requeridas:\n${missingAnswers.join("\n")}`)
      return
    }

    setIsSubmitting(true)

    try {
      // Generar diagnóstico con IA
      const aiDiagnosis = await generateDiagnosis(survey, answers)

      // Guardar respuesta
      const response = {
        id: Date.now().toString(),
        surveyId: survey.id,
        surveyTitle: survey.title,
        answers,
        diagnosis: aiDiagnosis,
        submittedAt: new Date().toISOString(),
      }

      const responses = JSON.parse(localStorage.getItem("survey-responses") || "[]")
      responses.push(response)
      localStorage.setItem("survey-responses", JSON.stringify(responses))

      setDiagnosis(aiDiagnosis)
    } catch (error) {
      alert("Error al procesar la encuesta. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Encuesta no encontrada</h2>
            <p className="text-gray-600 mb-4">La encuesta que buscas no existe o ha sido eliminada.</p>
            <Link href="/surveys">
              <Button>Ver Encuestas</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (diagnosis) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mx-auto max-w-4xl">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Brain className="h-6 w-6" />
                Diagnóstico Completado
              </CardTitle>
              <CardDescription className="text-green-700">
                Basado en tus respuestas, aquí está tu diagnóstico personalizado:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{diagnosis}</div>
              </div>
              <div className="flex gap-4">
                <Link href="/surveys">
                  <Button variant="outline">Ver Más Encuestas</Button>
                </Link>
                <Link href="/dashboard">
                  <Button>Ver Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/surveys">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{survey.title}</h1>
            {survey.description && <p className="text-gray-600 mt-1">{survey.description}</p>}
          </div>
        </div>

        <div className="space-y-6">
          {survey.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1}. {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                        <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "text" && (
                  <Textarea
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows={4}
                  />
                )}

                {question.type === "scale" && (
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex flex-col items-center">
                          <RadioGroupItem value={num.toString()} id={`${question.id}-${num}`} />
                          <Label htmlFor={`${question.id}-${num}`} className="mt-1">
                            {num}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Muy bajo</span>
                      <span>Muy alto</span>
                    </div>
                  </RadioGroup>
                )}

                {question.type === "yes-no" && (
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                      <Label htmlFor={`${question.id}-yes`}>Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${question.id}-no`} />
                      <Label htmlFor={`${question.id}-no`}>No</Label>
                    </div>
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          ))}

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">¿Listo para enviar?</h3>
                  <p className="text-sm text-blue-700">
                    La IA analizará tus respuestas y generará un diagnóstico personalizado
                  </p>
                </div>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    "Enviar Encuesta"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
