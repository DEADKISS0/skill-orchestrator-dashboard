"use client";

export default function ConsultaContextoWidget() {
  const questions = [
    { q: "¿Cuál es el objetivo real?", status: "answered", a: "Demostrar 35 skills en un dashboard" },
    { q: "¿Quién es el público?", status: "answered", a: "Santiago, equipo RR ALIADOS" },
    { q: "¿Qué restricciones hay?", status: "answered", a: "Single page, Next.js, profesional" },
    { q: "¿Cuáles los criterios de éxito?", status: "pending", a: "" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">❓</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Consulta Contexto</h3>
        <span className="skill-badge active">consulta-contexto</span>
      </div>
      <div className="space-y-2">
        {questions.map((q,i) => (
          <div key={i} className="p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2 mb-1">
              <span style={{color: q.status==="answered"?"var(--success)":"var(--warning)"}}>
                {q.status==="answered"?"✓":"?"}
              </span>
              <span className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{q.q}</span>
            </div>
            {q.a && <div className="text-[11px] ml-5" style={{color:"var(--text-secondary)"}}>{q.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
