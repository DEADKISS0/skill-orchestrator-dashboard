import { getBusinessContext } from "./businessContext";

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

export function getMetrics(
  predictionReports: number,
  strategicReports: number,
  installedSkills: number,
  totalSkills: number,
  optimizationReports = 0
): Metric[] {
  const ctx = getBusinessContext();

  return [
    {
      id: "reports",
      label: "Reportes Totales",
      icon: "📊",
      value: predictionReports + strategicReports + optimizationReports,
      subtitle: `${predictionReports} pred · ${strategicReports} estr · ${optimizationReports} opt`,
      color: "var(--ember)",
      trend: predictionReports > 0 ? "up" : "stable",
      trendValue: predictionReports > 0 ? `${predictionReports} predicciones` : "Sin nuevos",
    },
    {
      id: "skills",
      label: "Skills Instaladas",
      icon: "⚡",
      value: `${installedSkills}/${totalSkills}`,
      subtitle: `${((installedSkills / totalSkills) * 100).toFixed(1)}% del catálogo`,
      color: installedSkills === 36 ? "var(--success)" : "var(--warning)",
      trend: installedSkills === 36 ? "stable" : "down",
      trendValue: installedSkills === 36 ? "Sincronizado" : "Ejecutar sync_skills.py",
    },
    {
      id: "clients",
      label: "Meta Q3 Clientes",
      icon: "🎯",
      value: `${ctx.clientsClosed}/${ctx.clientsTargetQ3}`,
      subtitle: "Objetivo supervivencia 2026",
      color: "var(--ember-light)",
      trend: ctx.clientsClosed > 0 ? "up" : "stable",
      trendValue: ctx.wuunderDaysLeft <= 14 ? `Wuunder: ${ctx.wuunderDaysLeft}d` : "En negociación",
    },
    {
      id: "runway",
      label: "Runway",
      icon: "💰",
      value: `${ctx.runwayDays}d`,
      subtitle: "Días de caja restantes",
      color: ctx.runwayDays < 90 ? "var(--danger)" : "var(--success)",
      trend: ctx.runwayDays < 90 ? "down" : "stable",
      trendValue: `Burn ~$450K/mes`,
    },
    {
      id: "apps",
      label: "Apps Integradas",
      icon: "🔗",
      value: 6,
      subtitle: "Ecosistema RR ALIADOS",
      color: "var(--ember)",
      trend: "stable",
    },
    {
      id: "pipeline",
      label: "Pipeline",
      icon: "🔥",
      value: "Wuunder",
      subtitle: "Prioridad #1 — negociación activa",
      color: "var(--ember-light)",
      trend: "up",
      trendValue: `$36M-$42M COP`,
    },
  ];
}
