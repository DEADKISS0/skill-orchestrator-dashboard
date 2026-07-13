"use client";

const competitors = [
  { name: "Agencia360", swot: { s: "Full-stack digital", w: "Sin IA", o: "Mercado LATAM", t: "Nuevos players" } },
  { name: "EcomData", swot: { s: "Data-driven", w: "Poca creatividad", o: "E-commerce", t: "Regulación" } },
  { name: "RR ALIADOS", swot: { s: "IA + Brutalismo", w: "Equipo pequeño", o: "Expansión", t: "Competencia global" } },
];

export default function BenchmarkingWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🏆</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Benchmarking Expert</h3>
        <span className="skill-badge active">benchmarking-expert</span>
      </div>
      <div className="space-y-3">
        {competitors.map((c,i) => (
          <div key={i} className="p-3 rounded-lg" style={{background:"var(--bg-secondary)"}}>
            <div className="text-xs font-semibold mb-2" style={{color: i===2?"var(--accent)":"var(--text-primary)"}}>{c.name} {i===2&&"(Nosotros)"}</div>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(c.swot).map(([k,v]) => (
                <div key={k} className="text-[11px] p-1.5 rounded" style={{background:"var(--bg-card)"}}>
                  <span className="font-mono" style={{color: k==="s"?"var(--success)":k==="w"?"var(--danger)":k==="o"?"var(--accent)":"var(--warning)"}}>
                    {k.toUpperCase()}:
                  </span> <span style={{color:"var(--text-secondary)"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
