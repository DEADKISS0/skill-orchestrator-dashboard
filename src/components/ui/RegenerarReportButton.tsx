"use client";
import { useState } from "react";
import {
  MIROFISH_DOCS_URL,
  REGENERAR_INSTRUCTIONS,
  REGENERAR_TOOLTIP,
  type ReportRegenerarVariant,
} from "@/data/regenerarReports";

interface RegenerarReportButtonProps {
  variant: ReportRegenerarVariant;
  className?: string;
}

export default function RegenerarReportButton({ variant, className = "" }: RegenerarReportButtonProps) {
  const [copied, setCopied] = useState(false);

  if (MIROFISH_DOCS_URL) {
    return (
      <a
        href={MIROFISH_DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-ghost !py-1 !px-2 text-xs ${className}`}
        title={REGENERAR_TOOLTIP}
      >
        Regenerar ↗
      </a>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REGENERAR_INSTRUCTIONS[variant]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn-ghost !py-1 !px-2 text-xs ${className}`}
      title={REGENERAR_TOOLTIP}
      aria-label={`Regenerar reporte: copiar instrucciones de ${variant}`}
    >
      {copied ? "Copiado ✓" : "Regenerar"}
    </button>
  );
}
