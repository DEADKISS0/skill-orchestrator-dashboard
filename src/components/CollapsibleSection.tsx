"use client";
import { useState, ReactNode } from "react";

interface Props {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({ title, icon, defaultOpen = false, children }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="col-span-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-white/5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{title}</span>
        <span className="ml-auto text-[10px]" style={{ color: "var(--text-muted)" }}>
          {isOpen ? "▼ Cerrar" : "▶ Abrir"}
        </span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3">
          {children}
        </div>
      )}
    </div>
  );
}
