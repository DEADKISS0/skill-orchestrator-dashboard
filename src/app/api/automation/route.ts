import { NextResponse } from "next/server";

interface AutomationJob {
  id: string;
  name: string;
  status: "ok" | "warning" | "error" | "unknown";
  lastRun?: string;
  detail: string;
}

export async function GET() {
  const now = new Date();
  const jobs: AutomationJob[] = [
    {
      id: "mirofish-daily",
      name: "MiroFish Daily Report",
      status: "ok",
      lastRun: "Hoy 02:11",
      detail: "enhanced_report.py → predicciones_index.json",
    },
    {
      id: "optimization",
      name: "Optimización Temporal",
      status: "ok",
      lastRun: "Hoy 02:11",
      detail: "optimization_report.py → optimizacion/reports_index.json",
    },
    {
      id: "skills-sync",
      name: "Skills Sync",
      status: "warning",
      lastRun: "Manual",
      detail: "Ejecutar sync_skills.py antes de deploy (meta 36=36)",
    },
    {
      id: "reports-sync",
      name: "Sync Reportes PDF",
      status: "warning",
      lastRun: "Manual",
      detail: "scripts/sync_reports.ps1 — PDFs desde MiroFish-Lite",
    },
    {
      id: "investigacion",
      name: "Investigación Continua",
      status: "unknown",
      lastRun: undefined,
      detail: "run_daily.bat — verificar logs en 05_IA_Herramientas",
    },
    {
      id: "vercel-deploy",
      name: "Deploy Vercel",
      status: "ok",
      lastRun: "rr-aliados-mega-dashboard.vercel.app",
      detail: "Build en Vercel (no local Drive)",
    },
  ];

  const summary = {
    ok: jobs.filter((j) => j.status === "ok").length,
    warning: jobs.filter((j) => j.status === "warning").length,
    error: jobs.filter((j) => j.status === "error").length,
    total: jobs.length,
  };

  return NextResponse.json({
    updatedAt: now.toISOString(),
    jobs,
    summary,
  });
}
