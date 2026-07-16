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
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors hover:bg-white/5 text-left"
      >
        <span className="text-[10px] font-semibold tracking-widest" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
          {isOpen ? "▼" : "▶"}
        </span>
      </button>
      {isOpen && (
        <div className="ml-1 mt-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
