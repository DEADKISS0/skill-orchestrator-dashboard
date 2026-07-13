"use client";
import { useState } from "react";

export default function WarpgrepWidget() {
  const [query, setQuery] = useState("handleSubmit");
  const results = [
    { file: "src/components/Form.tsx", line: 42, match: "const handleSubmit = () => {" },
    { file: "src/utils/api.ts", line: 18, match: "export function handleSubmit(data) {" },
    { file: "src/hooks/useForm.ts", line: 7, match: "handleSubmit: () => void" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔍</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Warpgrep Code Search</h3>
        <span className="skill-badge active">warpgrep</span>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="input-dark flex-1" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar función/variable..." />
        <button className="btn-primary">Buscar</button>
      </div>
      <div className="space-y-1">
        {results.map((r,i) => (
          <div key={i} className="p-2 rounded text-xs font-mono" style={{background:"var(--bg-secondary)"}}>
            <span style={{color:"var(--text-muted)"}}>{r.file}:{r.line}</span>
            <div className="mt-1" style={{color:"var(--accent)"}}>{r.match}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
