"use client";
import { useState, ReactNode } from "react";

interface Props {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function SidebarGroup({ label, defaultOpen = false, children }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2 py-2 rounded-md transition-colors hover:bg-white/5 text-left group"
      >
        <span
          className="font-mono-label group-hover:text-[var(--ember-light)] transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <span
          className="text-[9px] transition-transform"
          style={{
            color: "var(--text-muted)",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-0.5 mt-0.5 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}
