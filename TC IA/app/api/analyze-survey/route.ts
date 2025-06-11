import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { survey, answers } = await request.json()

    // Construir el prompt para la IA
    const questionsAndAnswers = survey.questions
      .map((question: any) => {
        const answer = answers[question.id] || "Sin respuesta"
        return `Pregunta: ${question.question}\nRespuesta: ${answer}`
      })
      .join("\n\n")

    const prompt = `
Eres un asistente de análisis especializado en interpretar respuestas de encuestas y generar diagnósticos útiles.

ENCUESTA: "${survey.title}"
${survey.description ? `DESCRIPCIÓN: ${survey.description}` : ""}

RESPUESTAS DEL USUARIO:
${questionsAndAnswers}

Por favor, analiza estas respuestas y proporciona un diagnóstico detallado que incluya:

1. **Resumen de Hallazgos**: Un análisis conciso de los puntos clave identificados
2. **Áreas de Fortaleza**: Aspectos positivos detectados en las respuestas
3. **Áreas de Mejora**: Puntos que requieren atención o desarrollo
4. **Recomendaciones Específicas**: Sugerencias prácticas y accionables
5. **Próximos Pasos**: Acciones concretas que el usuario puede tomar

El diagnóstico debe ser:
- Personalizado y específico para estas respuestas
- Constructivo y orientado a soluciones
- Profesional pero accesible
- Basado en evidencia de las respuestas proporcionadas

Formato la respuesta de manera clara y estructurada.
`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return Response.json({ diagnosis: text })
  } catch (error) {
    console.error("Error generating diagnosis:", error)
    return Response.json({ error: "Error al generar el diagnóstico" }, { status: 500 })
  }
}
