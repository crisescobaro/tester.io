"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  type: "multiple-choice" | "text" | "scale" | "yes-no"
  question: string
  options?: string[]
  required: boolean
}

export default function CreateSurveyPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", ""],
      required: true,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, ""],
      })
    }
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const saveSurvey = () => {
    if (!title.trim() || questions.length === 0) {
      alert("Por favor completa el título y agrega al menos una pregunta")
      return
    }

    const survey = {
      id: Date.now().toString(),
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
    }

    // Guardar en localStorage (en producción usarías una base de datos)
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]")
    surveys.push(survey)
    localStorage.setItem("surveys", JSON.stringify(surveys))

    alert("Encuesta creada exitosamente!")
    router.push("/surveys")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Encuesta</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Define el título y descripción de tu encuesta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título de la Encuesta</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Evaluación de Satisfacción del Cliente"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe el propósito de esta encuesta..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas</CardTitle>
              <CardDescription>Agrega las preguntas que quieres incluir en tu encuesta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Pregunta {index + 1}</Label>
                        <Button variant="outline" size="sm" onClick={() => removeQuestion(question.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Input
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                        placeholder="Escribe tu pregunta aquí..."
                      />

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label>Tipo de Pregunta</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value: Question["type"]) => updateQuestion(question.id, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Opción Múltiple</SelectItem>
                              <SelectItem value="text">Texto Libre</SelectItem>
                              <SelectItem value="scale">Escala (1-5)</SelectItem>
                              <SelectItem value="yes-no">Sí/No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {question.type === "multiple-choice" && question.options && (
                        <div className="space-y-2">
                          <Label>Opciones</Label>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                placeholder={`Opción ${optionIndex + 1}`}
                              />
                              {question.options!.length > 2 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeOption(question.id, optionIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Opción
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button onClick={addQuestion} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Pregunta
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button onClick={saveSurvey}>Guardar Encuesta</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
