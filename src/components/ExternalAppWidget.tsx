"use client";
import { useState } from "react";

interface Props {
  title: string;
  url: string;
  icon: string;
}

export default function ExternalAppWidget({ title, url, icon }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="card p-4 animate-in col-span-2" style={{ position: "relative" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="ml-auto text-xs px-2 py-1 rounded transition-colors hover:bg-white/10"
          style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}>
          ↗ Abrir en nueva pestaña
        </a>
      </div>

      <div style={{ position: "relative", height: "600px", borderRadius: "8px", overflow: "hidden" }}>
        {!loaded && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-secondary)",
            zIndex: 1,
            color: "var(--text-muted)"
          }}>
            <div className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="text-sm">Cargando {title}...</p>
            </div>
          </div>
        )}

        <iframe
          src={url}
          title={title}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
            background: "#000000",
          }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
