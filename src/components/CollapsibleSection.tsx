"use client";
import { useState, useEffect, ReactNode } from "react";

interface Props {
  title: string;
  icon: string;
  sectionId: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  icon,
  sectionId,
  defaultOpen = false,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ sectionId?: string }>).detail;
      if (detail?.sectionId === sectionId) {
        setIsOpen(true);
      }
    };
    window.addEventListener("dashboard-nav", handler);
    return () => window.removeEventListener("dashboard-nav", handler);
  }, [sectionId]);

  return (
    <div id={sectionId} className="col-12 section-zone">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all hover:border-[var(--border-accent)] group"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
        }}
      >
        <span className="text-lg">{icon}</span>
        <span
          className="font-display text-sm tracking-widest group-hover:text-[var(--ember-light)] transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </span>
        <span
          className="ml-auto font-mono-label px-2.5 py-1 rounded-md transition-colors"
          style={{
            color: isOpen ? "var(--ember-light)" : "var(--text-muted)",
            background: isOpen ? "var(--ember-10)" : "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {isOpen ? "Cerrar" : "Expandir"}
        </span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in">
          {children}
        </div>
      )}
    </div>
  );
}
