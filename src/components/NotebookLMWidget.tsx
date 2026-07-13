"use client";
import { useState } from "react";

export default function NotebookLMWidget() {
  const [query, setQuery] = useState("");
  const sources = [
    { name: "Manual RR ALIADOS v2.0", type: "PDF", pages: 45 },
    { name: "Historial de Lecciones", type: "Markdown", pages: 12 },
    { name: "Catálogo de Skills", type: "MD", pages: 290 },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📓</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>NotebookLM Integration</h3>
        <span className="skill-badge active">notebooklm-integration</span>
      </div>
      <div className="space-y-2 mb-3">
        {sources.map((s,i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span className="text-xs px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--accent)"}}>{s.type}</span>
              <span className="text-xs" style={{color:"var(--text-primary)"}}>{s.name}</span>
            </div>
            <span className="text-xs" style={{color:"var(--text-muted)"}}>{s.pages}p</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input-dark flex-1" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Consultar knowledge base..." />
        <button className="btn-primary">Consultar</button>
      </div>
    </div>
  );
}
