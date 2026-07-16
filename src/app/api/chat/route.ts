import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key no configurada. Agrega OPENROUTER_API_KEY en .env.local" },
        { status: 500 }
      );
    }

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

    const safeHistory = Array.isArray(history) ? history.slice(-6).map((h: { role: string; content: string }) => ({
      role: h.role,
      content: String(h.content || "").slice(0, 500),
    })) : [];

    const messages = [
      { role: "system", content: systemPrompt },
      ...safeHistory,
      { role: "user", content: message.slice(0, 1000) },
    ];

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      return NextResponse.json({ error: "API error" }, { status: resp.status });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || "No se pudo generar una respuesta.";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
