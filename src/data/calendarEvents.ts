export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "report" | "deploy" | "deadline" | "meeting";
  recurring?: "daily" | "weekly" | "monthly";
}

export const calendarEvents: CalendarEvent[] = [
  { id: "1", title: "Reporte de Predicciones", date: "2026-07-14", type: "report", recurring: "daily" },
  { id: "2", title: "Reporte Estratégico", date: "2026-07-14", type: "report", recurring: "daily" },
  { id: "3", title: "Deploy Vercel", date: "2026-07-14", type: "deploy", recurring: "daily" },
  { id: "4", title: "Revisión Semanal", date: "2026-07-18", type: "meeting", recurring: "weekly" },
  { id: "5", title: "Cierre Mensual Q2", date: "2026-07-31", type: "deadline" },
  { id: "6", title: "Backup Data", date: "2026-07-20", type: "deploy" },
  { id: "7", title: "Análisis Competitivo", date: "2026-07-25", type: "meeting" },
];

export function getEventsForMonth(year: number, month: number): CalendarEvent[] {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return calendarEvents.filter(e => e.date.startsWith(prefix) || e.recurring);
}

export function getEventsForDay(date: string): CalendarEvent[] {
  return calendarEvents.filter(e => {
    if (e.date === date) return true;
    if (!e.recurring) return false;
    if (e.recurring === "daily") return true;
    if (e.recurring === "weekly") {
      const eventDate = new Date(e.date);
      const checkDate = new Date(date);
      return eventDate.getDay() === checkDate.getDay();
    }
    return false;
  });
}
