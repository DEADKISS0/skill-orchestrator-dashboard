import { NextRequest, NextResponse } from "next/server";

// Google Calendar API (Free Tier: 1,000,000 queries/day)
// Configuración requerida en .env.local:
// - GOOGLE_CALENDAR_CLIENT_ID: OAuth2 Client ID
// - GOOGLE_CALENDAR_CLIENT_SECRET: OAuth2 Client Secret
// - GOOGLE_CALENDAR_REFRESH_TOKEN: Refresh Token (obtenido después del primer OAuth flow)

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      // Return simulated data when credentials are not configured
      const now = new Date();
      const data = {
        configured: false,
        message: "Google Calendar no está configurado. Agrega GOOGLE_CALENDAR_CLIENT_ID y GOOGLE_CALENDAR_CLIENT_SECRET en .env.local",
        today: [
          { id: "1", time: "05:00", title: "Reporte de Predicciones", type: "report", color: "var(--accent)" },
          { id: "2", time: "05:00", title: "Reporte Estratégico", type: "report", color: "var(--accent)" },
          { id: "3", time: "17:00", title: "Reporte de Predicciones (PM)", type: "report", color: "var(--accent)" },
          { id: "4", time: "17:00", title: "Reporte Estratégico (PM)", type: "report", color: "var(--accent)" },
        ],
        tomorrow: [
          { id: "5", time: "09:00", title: "Sprint Planning", type: "meeting", color: "var(--warning)" },
          { id: "6", time: "15:00", title: "Deploy Review", type: "deploy", color: "var(--success)" },
        ],
        thisWeek: [
          { id: "7", day: "Viernes", title: "Cierre Mensual Q2", type: "deadline", color: "var(--danger)" },
          { id: "8", day: "Sábado", title: "Backup Data", type: "deploy", color: "var(--success)" },
        ],
      };
      return NextResponse.json(data);
    }

    // Real Google Calendar API call would go here
    // For now, return simulated data
    return NextResponse.json({ configured: true, message: "Google Calendar API no implementada aún" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
