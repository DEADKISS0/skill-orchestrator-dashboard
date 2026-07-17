import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string" || message.length > 1000) {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    const systemPrompt = `Eres el asistente de RR ALIADOS S.A.S., una empresa colombiana de tecnología en posicionamiento online. 
Tu META es SER LA EMPRESA DE TECNOLOGÍA EN POSICIONAMIENTO ONLINE MÁS GRANDE DE COLOMBIA.

El dashboard tiene:
- 36 skills de IA instaladas de 291 disponibles
- Reportes de predicciones y optimización estratégica
- 7 aplicaciones corporativas (Company Hub, Cotizador, Altruismo, etc.)
- Métricas del negocio y tareas programadas

Responde en español neutro. Sé conciso y útil.`;

    const safeHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role,
          content: String(h.content || "").slice(0, 500),
        }))
      : [];

    const messages = [
      { role: "system", content: systemPrompt },
      ...safeHistory,
      { role: "user", content: message.slice(0, 1000) },
    ];

    const { content, provider } = await chatCompletion(messages, {
      maxTokens: 1024,
      temperature: 0.7,
    });

    if (!content) {
      return NextResponse.json(
        {
          error:
            "No hay proveedor LLM disponible. Configura OPENROUTER_API_KEY, OPENCODE_API_KEY o GROQ_API_KEY en .env.local",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ reply: content, provider });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
