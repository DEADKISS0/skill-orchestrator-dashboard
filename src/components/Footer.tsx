"use client";
import { STATS } from "@/data/skillsCatalog";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t text-xs"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-secondary)" }}>
      <span>RR ALIADOS S.A.S. — NIT 902.036.366 — Medellín, Colombia</span>
      <div className="flex items-center gap-3">
        <span style={{color:"var(--success)"}}>{STATS.installed} instaladas</span>
        <span>·</span>
        <span style={{color:"var(--accent)"}}>{STATS.available} disponibles</span>
        <span>·</span>
        <span>{STATS.total} total</span>
      </div>
    </footer>
  );
}
