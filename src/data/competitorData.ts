export interface Competitor {
  id: string;
  name: string;
  type: string;
  strengths: string[];
  weaknesses: string[];
  threatLevel: "alto" | "medio" | "bajo";
}

export const competitors: Competitor[] = [
  {
    id: "agencia-1",
    name: "Agencia Digital Local",
    type: "Agencia tradicional",
    strengths: ["Presencia local", "Relaciones establecidas"],
    weaknesses: ["Sin IA", "Procesos manuales", "Sin diferenciación"],
    threatLevel: "medio",
  },
  {
    id: "freelancer-1",
    name: "Freelancers Especializados",
    type: "Freelancers",
    strengths: ["Bajo costo", "Especialización"],
    weaknesses: ["Sin escala", "Sin equipo completo"],
    threatLevel: "bajo",
  },
  {
    id: "plataforma-1",
    name: "Plataformas DIY (Wix, Squarespace)",
    type: "Plataformas",
    strengths: ["Bajo costo", "Fácil uso"],
    weaknesses: ["Sin personalización", "Sin soporte humano"],
    threatLevel: "bajo",
  },
  {
    id: "consultora-1",
    name: "Consultora de Marketing Digital",
    type: "Consultora",
    strengths: ["Experiencia", "Red de contactos"],
    weaknesses: ["Sin tecnología propia", "Sin IA"],
    threatLevel: "medio",
  },
];

export const competitorMetrics = {
  totalCompetitors: 4,
  highThreat: 0,
  mediumThreat: 2,
  lowThreat: 2,
  keyDifferentiators: [
    "IA First (32 skills de IA)",
    "Automatización completa",
    "Modelo de negocio diferente (fee + % sobre ventas)",
    "Resultados medibles y reportables",
  ],
};
