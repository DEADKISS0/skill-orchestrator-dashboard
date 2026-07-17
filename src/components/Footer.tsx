"use client";
import { STATS } from "@/data/skillsCatalog";

export default function Footer() {
  return (
    <footer
      className="col-12 relative z-10"
      style={{
        marginTop: "1.5rem",
        padding: "1rem 0 0.25rem",
        borderTop: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-mono-label text-[10px] text-center sm:text-left">
          RR ALIADOS S.A.S. · NIT 902.036.366 · Medellín, Colombia
        </span>
        <span className="font-display text-sm tracking-widest" style={{ color: "var(--ember-light)" }}>
          Con las manos en el fuego.
        </span>
        <div className="flex items-center gap-3 font-mono-label text-[10px]">
          <span style={{ color: "var(--success)" }}>{STATS.installed} activas</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span style={{ color: "var(--ember)" }}>{STATS.available} disp.</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{STATS.total} total</span>
        </div>
      </div>
    </footer>
  );
}
