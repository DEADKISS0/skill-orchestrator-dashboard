"use client";

export default function CronogramaWidget() {
  const months = ["Ene","Feb","Mar","Abr","May","Jun"];
  const tasks = [
    { name: "Investigación", start: 0, end: 1, color: "var(--accent)" },
    { name: "Diseño", start: 1, end: 3, color: "#8b5cf6" },
    { name: "Desarrollo", start: 2, end: 5, color: "var(--success)" },
    { name: "Testing", start: 4, end: 5, color: "var(--warning)" },
    { name: "Lanzamiento", start: 5, end: 5, color: "var(--danger)" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cronograma Consistente</h3>
        <span className="skill-badge active">cronograma-consistente</span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        <div className="text-[10px]" style={{color:"var(--text-muted)"}}>Tarea</div>
        {months.map((m,i) => <div key={i} className="text-[10px] text-center" style={{color:"var(--text-muted)"}}>{m}</div>)}
      </div>
      {tasks.map((t,i) => (
        <div key={i} className="grid grid-cols-7 gap-1 mb-1">
          <div className="text-[11px] truncate" style={{color:"var(--text-secondary)"}}>{t.name}</div>
          {months.map((_,j) => (
            <div key={j} className="h-5 rounded" style={{
              background: j >= t.start && j <= t.end ? t.color : "var(--bg-secondary)",
              opacity: j >= t.start && j <= t.end ? 0.7 : 1,
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}
