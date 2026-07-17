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
  const [label, setLabel] = useState("Regenerar");
  const [busy, setBusy] = useState(false);

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

  const flash = (text: string) => {
    setLabel(text);
    window.setTimeout(() => setLabel("Regenerar"), 2200);
  };

  const copyInstructions = async () => {
    try {
      await navigator.clipboard.writeText(REGENERAR_INSTRUCTIONS[variant]);
      flash("Copiado ✓");
    } catch {
      flash("Ver consola");
      console.info(REGENERAR_INSTRUCTIONS[variant]);
    }
  };

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const resp = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant }),
      });
      const data = (await resp.json()) as {
        ok?: boolean;
        mode?: string;
        instructions?: string;
        message?: string;
      };

      if (data.mode === "webhook" && data.ok) {
        flash("Webhook ✓");
        return;
      }

      if (data.instructions) {
        try {
          await navigator.clipboard.writeText(data.instructions);
          flash(data.mode === "webhook" ? "Fallback ✓" : "Copiado ✓");
        } catch {
          await copyInstructions();
        }
        return;
      }

      await copyInstructions();
    } catch {
      await copyInstructions();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={`btn-ghost !py-1 !px-2 text-xs ${className}`}
      title={`${REGENERAR_TOOLTIP}. Si hay MIROFISH_WEBHOOK_URL, dispara webhook; si no, copia comandos.`}
      aria-label={`Regenerar reporte: ${variant}`}
    >
      {busy ? "…" : label}
    </button>
  );
}
