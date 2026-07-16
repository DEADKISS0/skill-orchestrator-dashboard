export interface FinancialMetric {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend?: "up" | "down" | "stable";
  subtitle?: string;
}

export interface CostItem {
  name: string;
  amount: string;
  period: string;
  type: "fijo" | "variable";
}

export const financialMetrics: FinancialMetric[] = [
  { label: "Capital Disponible", value: "$10M COP", icon: "💰", color: "var(--success)", subtitle: "Inversión de capitalista" },
  { label: "Costo Mensual (mín)", value: "$450K COP", icon: "📉", color: "var(--warning)", subtitle: "Suscripciones + honorarios" },
  { label: "Costo Mensual (equipo)", value: "$800K-$1.2M", icon: "👥", color: "var(--danger)", subtitle: "Con equipo activo, sin proyectos" },
  { label: "Runway Estimado", value: "18-20 meses", icon: "⏰", color: "var(--accent)", subtitle: "Sin nuevos ingresos" },
  { label: "Ingresos Activos", value: "$0", icon: "⚠️", color: "var(--danger)", subtitle: "Situación crítica" },
  { label: "Objetivo 12 meses", value: "5 clientes", icon: "🎯", color: "var(--success)", subtitle: "Activos simultáneos" },
];

export const teamCosts: CostItem[] = [
  { name: "Santiago (CEO)", amount: "$300K/mes", period: "Mensual", type: "fijo" },
  { name: "Juan Manuel (COO)", amount: "$600K-$800K/mes", period: "Mensual", type: "fijo" },
  { name: "Dev Backend", amount: "$700K-$2M/mes", period: "Mensual", type: "variable" },
  { name: "Account Manager", amount: "$200K-$800K/mes", period: "Mensual", type: "variable" },
  { name: "Guionista", amount: "$100K-$600K/mes", period: "Mensual", type: "variable" },
  { name: "Supervisor Grabación", amount: "$100K-$500K/mes", period: "Mensual", type: "variable" },
  { name: "Cocos/Julio", amount: "$60K/sesión", period: "Por sesión", type: "variable" },
];

export const keyDeadlines = [
  { event: "Cierre contrato crítico", deadline: "6-8 semanas desde Mayo 2026", urgency: "critico" },
  { event: "Primera contratación tiempo completo", deadline: "Mes 9-12", urgency: "alto" },
  { event: "Objetivo: 5 clientes activos", deadline: "12 meses", urgency: "medio" },
];
