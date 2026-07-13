"use client";
import { useState } from "react";

export default function XPublisherWidget() {
  const [content, setContent] = useState("# RR ALIADOS\n\n35 skills orquestadas en una sola página.\n\nEl brutalismo estratégico colombiano llega al dashboard.");
  const chars = content.length;
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🐦</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>X Article Publisher</h3>
        <span className="skill-badge active">x-article-publisher</span>
      </div>
      <textarea className="input-dark w-full mb-2 h-20 resize-none font-mono text-xs" value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px]" style={{color: chars>280?"var(--danger)":"var(--text-muted)"}}>{chars}/280 chars</span>
        <span className="text-[10px]" style={{color:"var(--text-muted)"}}>{chars>280?"Excedido":"Válido"}</span>
      </div>
      <button className="btn-primary w-full">Publicar en X</button>
    </div>
  );
}
