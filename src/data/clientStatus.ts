export interface Client {
  id: string;
  name: string;
  status: "activo" | "historico" | "prospecto";
  period?: string;
  deliverables: number;
  notes: string;
}

export interface Prospect {
  name: string;
  type: string;
  status: string;
  prototype: boolean;
}

export const clients: Client[] = [
  {
    id: "siraitia",
    name: "Siraitia",
    status: "historico",
    period: "Nov 2025 - Feb 2026",
    deliverables: 25,
    notes: "Primer cliente. Cerrado prematuramente. Brief, estrategia, pitch, minutas, roadmap, sprints, guiones, documentación técnica, brand kit, prototipo web-app.",
  },
  {
    id: "alma-y-mente",
    name: "Alma y Mente Psicología",
    status: "historico",
    deliverables: 3,
    notes: "Cliente temprano. Estrategia de posicionamiento y contenido. 2 guiones finales.",
  },
];

export const prospects: Prospect[] = [
  { name: "Augustula Cafe", type: "Cafetería", status: "Prototipo con correcciones pendientes", prototype: true },
  { name: "Dayana Yulitsa", type: "Estética", status: "Prototipo con correcciones pendientes", prototype: true },
];

export const clientMetrics = {
  totalClients: 2,
  activeClients: 0,
  historicalClients: 2,
  prospects: 2,
  totalDeliverables: 28,
  objective: "5 clientes activos simultáneos en 12 meses",
};
