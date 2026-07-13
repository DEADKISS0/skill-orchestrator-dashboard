"use client";
import { useState } from "react";

export default function SkillBuilderWidget() {
  const [desc, setDesc] = useState("");
  const [built, setBuilt] = useState(false);
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔨</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill Builder</h3>
        <span className="skill-badge active">skill-builder</span>
      </div>
      <textarea className="input-dark w-full mb-2 h-16 resize-none" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe tu skill..." />
      <button className="btn-primary w-full mb-3" onClick={() => setBuilt(true)}>Generar Skill</button>
      {built && (
        <div className="p-3 rounded text-xs font-mono" style={{background:"var(--bg-secondary)",color:"var(--text-secondary)"}}>
          <div style={{color:"var(--success)"}}>✓ SKILL.md generado</div>
          <div className="mt-1">Frontmatter: 8 campos</div>
          <div>Secciones: 6</div>
          <div>Ejemplos: 3</div>
          <div className="mt-2 p-2 rounded" style={{background:"var(--bg-card)"}}>
            <span style={{color:"var(--accent)"}}>---</span><br/>
            <span>name: custom-skill</span><br/>
            <span>description: Generada automáticamente</span><br/>
            <span style={{color:"var(--accent)"}}>---</span>
          </div>
        </div>
      )}
    </div>
  );
}
