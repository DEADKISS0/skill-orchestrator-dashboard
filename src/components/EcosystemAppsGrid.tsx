"use client";

import ExternalAppWidget from "@/components/ExternalAppWidget";
import { ECOSYSTEM_APPS } from "@/data/ecosystemApps";

export default function EcosystemAppsGrid() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {ECOSYSTEM_APPS.filter((a) => a.deepLinkPrimary).map((a) => (
          <a
            key={`dl-${a.id}`}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !py-1 !px-2.5 text-xs"
            title={`Deep-link ${a.title}`}
          >
            {a.icon} {a.title} ↗
          </a>
        ))}
      </div>
      <p className="text-[10px] font-mono-label" style={{ color: "var(--text-muted)" }}>
        Preview: embed cuando el sitio lo permite · si no, tarjeta con estado + abrir en pestaña (sin iframe vacío).
      </p>
      <div className="apps-grid">
        {ECOSYSTEM_APPS.map((a) => (
          <div key={a.id} id={a.id}>
            <ExternalAppWidget app={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
