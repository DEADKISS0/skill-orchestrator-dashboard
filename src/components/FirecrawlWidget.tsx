"use client";
import { useState } from "react";

export default function FirecrawlWidget() {
  const [url, setUrl] = useState("https://ejemplo.com/blog");
  const [scraped, setScraped] = useState(false);
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🕷️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Firecrawl Scraper</h3>
        <span className="skill-badge active">firecrawl</span>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="input-dark flex-1" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="btn-primary" onClick={() => setScraped(true)}>Scrappear</button>
      </div>
      {scraped && (
        <div className="p-3 rounded text-xs font-mono" style={{background:"var(--bg-secondary)", color:"var(--text-secondary)"}}>
          <div style={{color:"var(--success)"}}>✓ Contenido extraído</div>
          <div className="mt-1">Markdown: 2,340 caracteres</div>
          <div>Imágenes: 8 detectadas</div>
          <div>Metadata: título, descripción, OG tags</div>
          <div className="mt-2 p-2 rounded" style={{background:"var(--bg-card)"}}>
            &quot;# Cómo automatizar tu marketing digital...&lt;markdown&gt;...&lt;/markdown&gt;&quot;
          </div>
        </div>
      )}
    </div>
  );
}
