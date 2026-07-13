"use client";
import { useState } from "react";

export default function GrillMeWidget() {
  const [plan, setPlan] = useState("Quiero crear un SaaS de automatización para PyMEs colombianas con IA");
  const [validated, setValidated] = useState(false);
  const assumptions = [
    { text: "PyMEs colombianas tienen presupuesto para SaaS", risk: "alto" },
    { text: "La IA es el diferenciador principal", risk: "medio" },
    { text: "No se especifica el modelo de negocio", risk: "crítico" },
    { text: "No se menciona competencia directa", risk: "alto" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔎</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Grill-Me Validator</h3>
        <span className="skill-badge active">grill-me</span>
      </div>
      <textarea className="input-dark w-full mb-3 h-16 resize-none" value={plan} onChange={(e) => setPlan(e.target.value)} />
      <button className="btn-primary w-full mb-3" onClick={() => setValidated(true)}>Validar Plan</button>
      {validated && (
        <div className="space-y-2">
          <div className="text-[10px] font-semibold tracking-wider mb-1" style={{color:"var(--danger)"}}>SUPUESTOS DETECTADOS</div>
          {assumptions.map((a,i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
              <span style={{color:"var(--text-secondary)"}}>{a.text}</span>
              <span className="text-[10px] px-2 py-0.5 rounded" style={{
                background: a.risk==="crítico"?"rgba(239,68,68,0.15)":a.risk==="alto"?"rgba(245,158,11,0.15)":"rgba(100,116,139,0.15)",
                color: a.risk==="crítico"?"var(--danger)":a.risk==="alto"?"var(--warning)":"var(--text-muted)"
              }}>{a.risk}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
