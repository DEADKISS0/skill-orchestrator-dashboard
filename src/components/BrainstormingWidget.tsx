"use client";
import { useState } from "react";

export default function BrainstormingWidget() {
  const [ideas, setIdeas] = useState(["Campaña de IA para PyMEs", "Marketplace de skills", "Consultoría brutalista"]);
  const [newIdea, setNewIdea] = useState("");
  const questions = [
    "¿Cuál es el problema real que resuelve?",
    "¿Quién es el público exacto?",
    "¿Cuál es el diferenciador vs competencia?",
    "¿Qué pasa si NO lo hacemos?",
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💡</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Brainstorming Generator</h3>
        <span className="skill-badge active">brainstorming</span>
      </div>
      <div className="mb-3">
        <div className="text-[10px] font-semibold tracking-wider mb-2" style={{color:"var(--text-muted)"}}>PREGUNTAS ESTRATÉGICAS</div>
        <div className="space-y-1">
          {questions.map((q,i) => (
            <div key={i} className="text-xs p-2 rounded" style={{background:"var(--bg-secondary)", color:"var(--text-secondary)"}}>
              <span style={{color:"var(--accent)"}}>{i+1}.</span> {q}
            </div>
          ))}
        </div>
      </div>
      <div className="text-[10px] font-semibold tracking-wider mb-2" style={{color:"var(--text-muted)"}}>IDEAS GENERADAS</div>
      <div className="space-y-1 mb-3">
        {ideas.map((idea,i) => (
          <div key={i} className="flex items-center gap-2 text-xs p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <span style={{color:"var(--success)"}}>●</span>
            <span style={{color:"var(--text-primary)"}}>{idea}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input-dark flex-1" value={newIdea} onChange={(e) => setNewIdea(e.target.value)} placeholder="Nueva idea..." />
        <button className="btn-primary" onClick={() => { if(newIdea) { setIdeas([...ideas, newIdea]); setNewIdea(""); } }}>+ Agregar</button>
      </div>
    </div>
  );
}
