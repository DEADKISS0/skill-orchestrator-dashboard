"use client";
import { STATS } from "@/data/skillsCatalog";

const plan = [
  { skill: "interface-designing", score: 9, role: "Diseñar UI" },
  { skill: "benchmarking-expert", score: 8, role: "Panel competitivo" },
  { skill: "excel-widget", score: 8, role: "Widget Excel" },
  { skill: "google-news", score: 8, role: "Feed noticias" },
  { skill: "firecrawl", score: 7, role: "Módulo scraping" },
  { skill: "writing-plans", score: 7, role: "Planificar tareas" },
  { skill: "karpathy-rules", score: 6, role: "Calidad código" },
  { skill: "loop-mode", score: 6, role: "Ciclos mejora" },
];

export default function SkillOrchestratorWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎯</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill Orchestrator</h3>
        <span className="skill-badge active">skill-orchestrator</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-2 rounded text-center" style={{background:"var(--bg-secondary)"}}>
          <div className="text-lg font-bold" style={{color:"var(--success)"}}>{STATS.installed}</div>
          <div className="text-[10px]" style={{color:"var(--text-muted)"}}>INSTALADAS</div>
        </div>
        <div className="p-2 rounded text-center" style={{background:"var(--bg-secondary)"}}>
          <div className="text-lg font-bold" style={{color:"var(--accent)"}}>{STATS.available}</div>
          <div className="text-[10px]" style={{color:"var(--text-muted)"}}>DISPONIBLES</div>
        </div>
        <div className="p-2 rounded text-center" style={{background:"var(--bg-secondary)"}}>
          <div className="text-lg font-bold" style={{color:"var(--text-primary)"}}>{STATS.total}</div>
          <div className="text-[10px]" style={{color:"var(--text-muted)"}}>TOTAL</div>
        </div>
      </div>
      <div className="space-y-1">
        {plan.map((p,i) => (
          <div key={i} className="flex items-center justify-between p-1.5 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span className="font-mono w-5 text-center font-bold" style={{color: p.score>=8?"var(--success)":"var(--accent)"}}>{p.score}</span>
              <span style={{color:"var(--text-primary)"}}>{p.skill}</span>
            </div>
            <span style={{color:"var(--text-muted)"}}>{p.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
