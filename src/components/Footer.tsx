"use client";
import { STATS } from "@/data/skillsCatalog";

export default function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-col gap-3"
      style={{
        padding: "0.875rem var(--page-x) 1rem",
        borderTop: "1px solid var(--border)",
        color: "var(--text-muted)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="glow-line w-full max-w-md mx-auto opacity-40" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
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
