"use client";
import { useState } from "react";

export default function YouTubeClipperWidget() {
  const [url, setUrl] = useState("https://youtube.com/watch?v=...");
  const clips = [
    { start: "02:15", end: "03:42", title: "Introducción al concepto", duration: "1:27" },
    { start: "08:30", end: "10:15", title: "Demo en vivo", duration: "1:45" },
    { start: "15:00", end: "16:30", title: "Conclusiones clave", duration: "1:30" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎬</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>YouTube Clipper</h3>
        <span className="skill-badge active">youtube-clipper</span>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="input-dark flex-1" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL de YouTube..." />
        <button className="btn-primary">Extraer</button>
      </div>
      <div className="space-y-2">
        {clips.map((c,i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="w-12 text-center">
              <div className="text-[10px]" style={{color:"var(--text-muted)"}}>INICIO</div>
              <div className="text-xs font-mono font-bold" style={{color:"var(--accent)"}}>{c.start}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{c.title}</div>
              <div className="text-[11px]" style={{color:"var(--text-muted)"}}>{c.duration}</div>
            </div>
            <div className="w-12 text-center">
              <div className="text-[10px]" style={{color:"var(--text-muted)"}}>FIN</div>
              <div className="text-xs font-mono font-bold" style={{color:"var(--accent)"}}>{c.end}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
