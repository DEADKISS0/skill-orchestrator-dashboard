"use client";
import { useState } from "react";

export default function WebResearchWidget() {
  const [url, setUrl] = useState("https://ejemplo.com");
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");
  const results = [
    { type: "text", content: "RR ALIADOS es una agencia de marketing digital..." },
    { type: "metadata", content: "Título: RR ALIADOS — Marketing Digital Colombia" },
    { type: "links", content: "12 enlaces encontrados, 3 imágenes, 1 video" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔍</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Web Research Assistant</h3>
        <span className="skill-badge active">web-research-assistant</span>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="input-dark flex-1" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL a investigar..." />
        <button className="btn-primary" onClick={() => { setStatus("loading"); setTimeout(() => setStatus("done"), 1500); }}>
          Investigar
        </button>
      </div>
      {status === "done" && (
        <div className="space-y-2">
          {results.map((r,i) => (
            <div key={i} className="p-2 rounded text-xs" style={{background:"var(--bg-secondary)", color:"var(--text-secondary)"}}>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded mr-2"
                style={{background:"var(--bg-card)", color:"var(--accent)"}}>{r.type}</span>
              {r.content}
            </div>
          ))}
        </div>
      )}
      {status === "loading" && (
        <div className="text-xs text-center py-4" style={{color:"var(--text-muted)"}}>Investigando con comportamiento humano...</div>
      )}
    </div>
  );
}
