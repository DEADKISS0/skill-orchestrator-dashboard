export interface Metric {
  id: string;
  label: string;
  icon: string;
  value: string | number;
  subtitle?: string;
  color: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export function getMetrics(predictionReports: number, strategicReports: number, installedSkills: number, totalSkills: number): Metric[] {
  return [
    {
      id: "reports",
      label: "Reportes Totales",
      icon: "📊",
      value: predictionReports + strategicReports,
      subtitle: `${predictionReports} predicción · ${strategicReports} estratégicos`,
      color: "var(--accent)",
      trend: "up",
      trendValue: `+${predictionReports} esta semana`,
    },
    {
      id: "skills",
      label: "Skills Instaladas",
      icon: "⚡",
      value: `${installedSkills}/${totalSkills}`,
      subtitle: `${((installedSkills / totalSkills) * 100).toFixed(1)}% del catálogo`,
      color: "var(--success)",
      trend: "up",
      trendValue: "+2 esta semana",
    },
    {
      id: "progress",
      label: "Meta 5-Year",
      icon: "🎯",
      value: "15%",
      subtitle: "Progreso hacia meta",
      color: "var(--warning)",
      trend: "up",
      trendValue: "+5% vs mes anterior",
    },
    {
      id: "urgent",
      label: "Acciones Urgentes",
      icon: "🔴",
      value: 4,
      subtitle: "Requieren atención esta semana",
      color: "var(--danger)",
      trend: "down",
      trendValue: "-2 vs semana anterior",
    },
    {
      id: "apps",
      label: "Apps Integradas",
      icon: "🔗",
      value: 7,
      subtitle: "Company Hub, Cotizador, etc.",
      color: "var(--accent)",
      trend: "stable",
    },
    {
      id: "last-report",
      label: "Último Reporte",
      icon: "🕐",
      value: "Hoy",
      subtitle: "Hace 2 horas",
      color: "var(--success)",
    },
  ];
}
