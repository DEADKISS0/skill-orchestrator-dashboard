export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: "widget" | "skill" | "section" | "app";
  section: string;
  targetId: string;
  icon: string;
}

export const searchIndex: SearchItem[] = [
  // Widgets de Reportes
  { id: "mirofish-reports", title: "MiroFish Reports", description: "Reportes de predicciones con IA para los próximos 7 días", type: "widget", section: "REPORTES", targetId: "mirofish-reports", icon: "📊" },
  { id: "estrategia", title: "Optimización Estratégica", description: "Reporte estratégico contra la meta 5-year de RR ALIADOS", type: "widget", section: "REPORTES", targetId: "estrategia", icon: "🎯" },

  // Aplicaciones
  { id: "company-hub", title: "Company Hub", description: "Hub corporativo de RR ALIADOS", type: "app", section: "APLICACIONES", targetId: "company-hub", icon: "🏢" },
  { id: "cotizador", title: "RR Cotizador", description: "Plan maestro y cotizaciones", type: "app", section: "APLICACIONES", targetId: "cotizador", icon: "🧮" },
  { id: "altruismo", title: "Altruismo", description: "Herramientas web sin anuncios", type: "app", section: "APLICACIONES", targetId: "altruismo", icon: "🤝" },
  { id: "skills-hub-app", title: "RR Skills Hub", description: "Catálogo de skills de RR ALIADOS", type: "app", section: "APLICACIONES", targetId: "skills-hub-app", icon: "📚" },
  { id: "adquisicion", title: "Dashboard de Adquisición", description: "Panel de adquisición de clientes", type: "app", section: "APLICACIONES", targetId: "adquisicion", icon: "📈" },
  { id: "dashweb", title: "DashWeb Core", description: "Plataforma ERP/CRM interna", type: "app", section: "APLICACIONES", targetId: "dashweb", icon: "🔧" },

  // Skills Catalog
  { id: "skills-catalog", title: "Skills Catalog", description: "Catálogo completo de 35+ skills de IA", type: "section", section: "CATÁLOGO", targetId: "skills-catalog", icon: "📦" },

  // Data & Analytics
  { id: "excel-widget", title: "Excel Widget", description: "Herramientas avanzadas de Excel y Google Sheets", type: "widget", section: "DATA & ANALYTICS", targetId: "excel-widget", icon: "📊" },
  { id: "google-news", title: "Google News", description: "Monitoreo de noticias en Google News", type: "widget", section: "DATA & ANALYTICS", targetId: "google-news", icon: "📰" },
  { id: "google-maps", title: "Google Maps", description: "Extracción de datos de Google Maps", type: "widget", section: "DATA & ANALYTICS", targetId: "google-maps", icon: "🗺️" },
  { id: "amazon-analyzer", title: "Amazon Analyzer", description: "Análisis de competidores en Amazon", type: "widget", section: "DATA & ANALYTICS", targetId: "amazon-analyzer", icon: "🛒" },
  { id: "metricool", title: "Metricool", description: "Gestión de redes sociales", type: "widget", section: "DATA & ANALYTICS", targetId: "metricool", icon: "📱" },

  // Research
  { id: "web-research", title: "Web Research", description: "Asistente de investigación web con navegador real", type: "widget", section: "RESEARCH", targetId: "web-research", icon: "🔍" },
  { id: "firecrawl", title: "Firecrawl", description: "Scraping web profesional", type: "widget", section: "RESEARCH", targetId: "firecrawl", icon: "🕷️" },
  { id: "notebooklm", title: "NotebookLM", description: "Integración con bases de conocimiento", type: "widget", section: "RESEARCH", targetId: "notebooklm", icon: "📓" },

  // Dev & QA
  { id: "karpathy-rules", title: "Karpathy Rules", description: "Reglas de código de Andrej Karpathy", type: "widget", section: "DEV & QA", targetId: "karpathy-rules", icon: "📏" },
  { id: "debugging", title: "Debugging", description: "Metodología de debugging sistemático", type: "widget", section: "DEV & QA", targetId: "debugging", icon: "🐛" },
  { id: "verification", title: "Verification", description: "Verificación antes de completar", type: "widget", section: "DEV & QA", targetId: "verification", icon: "✅" },
  { id: "qa-auditor", title: "QA Auditor", description: "Auditoría de QA para sitios web", type: "widget", section: "DEV & QA", targetId: "qa-auditor", icon: "🔎" },
  { id: "loop-mode", title: "Loop Mode", description: "Ciclo iterativo de planificación y ejecución", type: "widget", section: "DEV & QA", targetId: "loop-mode", icon: "🔄" },
  { id: "quality-loop", title: "Quality Loop", description: "Loop de calidad infinito", type: "widget", section: "DEV & QA", targetId: "quality-loop", icon: "♾️" },

  // Content
  { id: "x-publisher", title: "X Publisher", description: "Publicación de artículos en X (Twitter)", type: "widget", section: "CONTENT", targetId: "x-publisher", icon: "🐦" },
  { id: "youtube-clip", title: "YouTube Clip", description: "Extracción de clips destacados de YouTube", type: "widget", section: "CONTENT", targetId: "youtube-clip", icon: "🎬" },
  { id: "remotion", title: "Remotion", description: "Generación de videos con React", type: "widget", section: "CONTENT", targetId: "remotion", icon: "🎥" },
  { id: "cronograma", title: "Cronograma", description: "Gráfico de Gantt para timelines", type: "widget", section: "CONTENT", targetId: "cronograma", icon: "📅" },

  // Strategy
  { id: "brainstorming", title: "Brainstorming", description: "Framework de lluvia de ideas", type: "widget", section: "STRATEGY", targetId: "brainstorming", icon: "💡" },
  { id: "grill-me", title: "Grill-Me", description: "Validación de planes por preguntas", type: "widget", section: "STRATEGY", targetId: "grill-me", icon: "🔥" },
  { id: "writing-plans", title: "Writing Plans", description: "Creación de planes de implementación", type: "widget", section: "STRATEGY", targetId: "writing-plans", icon: "📝" },
  { id: "benchmarking", title: "Benchmarking", description: "Análisis competitivo de mercado", type: "widget", section: "STRATEGY", targetId: "benchmarking", icon: "📊" },
  { id: "interface-designing", title: "Interface Designing", description: "Diseño de interfaces estilo Linear/Vercel", type: "widget", section: "STRATEGY", targetId: "interface-designing", icon: "🎨" },

  // Meta / Skills
  { id: "find-skills", title: "Find Skills", description: "Descubrir skills del ecosistema", type: "widget", section: "META", targetId: "find-skills", icon: "🔍" },
  { id: "skill-builder", title: "Skill Builder", description: "Construir skills desde descripciones", type: "widget", section: "META", targetId: "skill-builder", icon: "🔨" },
  { id: "skill-creator", title: "Skill Creator", description: "Crear skills con triggers y alcance", type: "widget", section: "META", targetId: "skill-creator", icon: "✨" },
  { id: "masters", title: "Masters", description: "Crear skills investigando expertos", type: "widget", section: "META", targetId: "masters", icon: "🎓" },
  { id: "installer", title: "Installer", description: "Instalar skills del ecosistema", type: "widget", section: "META", targetId: "installer", icon: "📦" },
  { id: "mcp", title: "MCP", description: "Model Context Protocol client", type: "widget", section: "META", targetId: "mcp", icon: "🔌" },
  { id: "a2a", title: "A2A", description: "Orquestación Agent-to-Agent", type: "widget", section: "META", targetId: "a2a", icon: "🤝" },
  { id: "consulta", title: "Consulta Contexto", description: "Consulta de contexto empresarial", type: "widget", section: "META", targetId: "consulta", icon: "💬" },
  { id: "superpowers", title: "Superpowers", description: "Metodología completa de desarrollo", type: "widget", section: "META", targetId: "superpowers", icon: "💪" },
  { id: "orchestrator", title: "Skill Orchestrator", description: "Orquestación de múltiples skills", type: "widget", section: "META", targetId: "orchestrator", icon: "🧠" },
  { id: "warpgrep", title: "Warpgrep", description: "Búsqueda de código con IA", type: "widget", section: "META", targetId: "warpgrep", icon: "🔎" },
];
