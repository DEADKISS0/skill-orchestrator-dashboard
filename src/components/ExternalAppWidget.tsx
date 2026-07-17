"use client";
import { useState } from "react";
import WidgetCard from "@/components/ui/WidgetCard";

interface Props {
  title: string;
  url: string;
  icon: string;
}

export default function ExternalAppWidget({ title, url, icon }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <WidgetCard
      title={title}
      icon={icon}
      action={
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-1 !px-2">
          ↗ Abrir
        </a>
      }
    >
      <div className="report-iframe relative rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="text-sm font-mono-label">Cargando {title}...</p>
            </div>
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          style={{ background: "var(--pitch)", minHeight: "520px" }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </WidgetCard>
  );
}
