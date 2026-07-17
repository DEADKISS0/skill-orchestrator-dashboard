export interface Deal {
  id: string;
  name: string;
  status: "prospecto" | "negociacion" | "pre-contrato" | "contratado" | "activo";
  value: string;
  monthlyFee: string;
  probability: "alta" | "media" | "baja";
  timeline: string;
  nextStep: string;
  priority: "critico" | "alto" | "medio";
}

export interface SalesMetric {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const deals: Deal[] = [
  {
    id: "wuunder",
    name: "Wuunder",
    status: "negociacion",
    value: "$36M-$42M COP",
    monthlyFee: "$6M-$7M/mes",
    probability: "media",
    timeline: "6 meses",
    nextStep: "Decisión de firma — deadline 2 semanas (Jul 2026)",
    priority: "critico",
  },
  {
    id: "real-seguros",
    name: "Real Seguros",
    status: "pre-contrato",
    value: "$75.8M COP",
    monthlyFee: "$4.95M/quincena",
    probability: "media",
    timeline: "12 meses",
    nextStep: "Firma de contrato y pago inicial de $16.4M COP",
    priority: "alto",
  },
  {
    id: "fisioterapeuta",
    name: "Fisioterapeuta (prospecto)",
    status: "negociacion",
    value: "$17.5M-$20M COP",
    monthlyFee: "$2.7M + 15% ventas",
    probability: "alta",
    timeline: "6 meses",
    nextStep: "Cierre de negociación y firma",
    priority: "alto",
  },
  {
    id: "augustula-cafe",
    name: "Augustula Cafe",
    status: "prospecto",
    value: "$17M COP",
    monthlyFee: "$2.7M COP",
    probability: "baja",
    timeline: "6 meses",
    nextStep: "Seguimiento con Sandra (escéptica)",
    priority: "medio",
  },
];

export const salesMetrics: SalesMetric[] = [
  { label: "Pipeline Total", value: "$129M+ COP", icon: "💰", color: "var(--success)" },
  { label: "Prospectos Activos", value: "4", icon: "🎯", color: "var(--ember)" },
  { label: "Prioridad #1", value: "Wuunder", icon: "🔥", color: "var(--ember)" },
  { label: "Clientes Activos", value: "0", icon: "👥", color: "var(--danger)" },
];

export const revenueScenarios = [
  { name: "Ninguno cierra", revenue: "$0", probability: "Baja" },
  { name: "Solo Fisio", revenue: "$17.5M-$20M", probability: "Alta" },
  { name: "Solo Cafe", revenue: "$17M", probability: "Baja" },
  { name: "Solo Real Seguros", revenue: "$75.8M", probability: "Media-Alta" },
  { name: "Fisio + Cafe", revenue: "$34.5M-$37M", probability: "Media" },
  { name: "Fisio + Real Seguros", revenue: "$93M-$96M", probability: "Media-Alta" },
  { name: "Cafe + Real Seguros", revenue: "$92.8M", probability: "Media" },
  { name: "Los tres", revenue: "$110M-$113M", probability: "Baja" },
];
