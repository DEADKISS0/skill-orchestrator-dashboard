export type ReportRegenerarVariant = "predicciones" | "estrategicos";

/** Local docs exist at mirofish_lite/DOCUMENTACION.md — no public URL hosted. */
export const MIROFISH_DOCS_URL: string | null = null;

export const REGENERAR_INSTRUCTIONS: Record<ReportRegenerarVariant, string> = {
  predicciones: `# Regenerar Predicciones (MiroFish-Lite)
cd "G:\\Mi unidad\\RR_Aliados\\05_IA_Herramientas\\mirofish_lite"
python enhanced_report.py
cd "G:\\Mi unidad\\RR_Aliados\\skill-orchestrator-dashboard"
.\\scripts\\sync_reports.ps1`,
  estrategicos: `# Regenerar Optimización Estratégica (MiroFish-Lite)
cd "G:\\Mi unidad\\RR_Aliados\\05_IA_Herramientas\\mirofish_lite"
python reporte_optimizacion_estrategica.py
cd "G:\\Mi unidad\\RR_Aliados\\skill-orchestrator-dashboard"
.\\scripts\\sync_reports.ps1`,
};

export const REGENERAR_TOOLTIP =
  "Regenerar vía MiroFish-Lite y sincronizar con scripts/sync_reports.ps1";
