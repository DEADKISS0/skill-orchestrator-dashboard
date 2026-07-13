"use client";
import { useState } from "react";

export default function GoogleMapsWidget() {
  const [query, setQuery] = useState("Agencias digitales Medellín");
  const businesses = [
    { name: "Agencia360", rating: 4.5, reviews: 128, phone: "+57 4 123 4567" },
    { name: "EcomData", rating: 4.2, reviews: 87, phone: "+57 4 234 5678" },
    { name: "Digital Marketing Co", rating: 4.8, reviews: 203, phone: "+57 4 345 6789" },
    { name: "RR ALIADOS", rating: 5.0, reviews: 42, phone: "+57 4 456 7890" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🗺️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Google Maps Extractor</h3>
        <span className="skill-badge active">google-maps-extractor</span>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="input-dark flex-1" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar negocios..." />
        <button className="btn-primary">Extraer</button>
      </div>
      <div className="space-y-2">
        {businesses.map((b,i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded" style={{ background: "var(--bg-secondary)" }}>
            <div>
              <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{b.name}</span>
              <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{b.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: "var(--warning)" }}>★ {b.rating}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>({b.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
