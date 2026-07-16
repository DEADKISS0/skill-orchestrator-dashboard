"use client";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const features = [
    {
      icon: "📊",
      title: "Reportes de Predicciones",
      desc: "Análisis predictivo con IA que genera predicciones para los próximos 7 días basándose en el historial de cambios del workspace.",
      targetId: "mirofish-reports"
    },
    {
      icon: "🎯",
      title: "Optimización Estratégica",
      desc: "Reporte estratégico que analiza todo el workspace contra la meta 5-year de RR ALIADOS: ser la empresa de tecnología en posicionamiento online más grande de Colombia.",
      targetId: "estrategia"
    },
    {
      icon: "🛠️",
      title: "Herramientas de IA",
      desc: "35+ skills especializadas en análisis de mercado, generación de contenido, desarrollo web, automatización y más. Todo integrado en un solo lugar.",
      targetId: "skills-catalog"
    },
  ];

  return (
    <section id="dashboard" className="relative overflow-hidden rounded-2xl border"
      style={{
        background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)",
        borderColor: "var(--border)",
      }}>
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--accent)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5"
        style={{ background: "var(--success)" }} />

      <div className="relative z-10 p-8 md:p-12">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">🧠</span>
          <span className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(59,130,246,0.15)", color: "var(--accent)" }}>
            SKILL ORCHESTRATOR
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          RR ALIADOS — Mega Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base max-w-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
          Centro de comando centralizado para RR ALIADOS S.A.S. Aquí convergen todas las herramientas
          de inteligencia artificial, reportes de predicciones, aplicaciones corporativas y 35+ skills
          especializadas que impulsan nuestra operación.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Skills Instaladas", value: "36", icon: "⚡", color: "var(--accent)" },
            { label: "Skills Disponibles", value: "291", icon: "📦", color: "var(--warning)" },
            { label: "Reportes Activos", value: "3", icon: "📊", color: "var(--success)" },
            { label: "Apps Integradas", value: "7", icon: "🔗", color: "var(--accent)" },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-lg text-center"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards - CLICKABLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map((f) => (
            <button key={f.title} onClick={() => scrollTo(f.targetId)}
              className="p-4 rounded-lg text-left transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div className="text-lg mb-2">{f.icon}</div>
              <h3 className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>{f.title} →</h3>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
