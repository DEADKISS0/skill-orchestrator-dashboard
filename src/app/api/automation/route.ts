import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface AutomationJob {
  id: string;
  name: string;
  status: "ok" | "warning" | "error" | "unknown";
  lastRun?: string;
  detail: string;
  ageHours?: number;
}

const STALE_OK_H = 24;
const STALE_WARN_H = 72;

function statusFromAge(
  exists: boolean,
  ageHours: number | undefined
): AutomationJob["status"] {
  if (!exists) return "error";
  if (ageHours === undefined) return "unknown";
  if (ageHours <= STALE_OK_H) return "ok";
  if (ageHours <= STALE_WARN_H) return "warning";
  return "error";
}

function formatLastRun(mtime: Date): string {
  return mtime.toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

async function statPublic(relPath: string): Promise<{
  exists: boolean;
  mtime?: Date;
  ageHours?: number;
}> {
  const full = path.join(process.cwd(), "public", relPath);
  try {
    const st = await fs.stat(full);
    const ageHours = (Date.now() - st.mtimeMs) / 3_600_000;
    return { exists: true, mtime: st.mtime, ageHours };
  } catch {
    return { exists: false };
  }
}

/** Prefer index JSON date label when fresher signal than fs mtime (CDN/deploy skew). */
async function latestReportLabel(relPath: string): Promise<string | undefined> {
  const full = path.join(process.cwd(), "public", relPath);
  try {
    const raw = await fs.readFile(full, "utf8");
    const data = JSON.parse(raw) as {
      reports?: Array<{ label?: string; date?: string }>;
      generated_at?: string;
    };
    const first = data.reports?.[0];
    return first?.label || first?.date || data.generated_at;
  } catch {
    return undefined;
  }
}

export async function GET() {
  const now = new Date();

  const [pred, strat, opt, finance] = await Promise.all([
    statPublic("reports/predicciones_index.json"),
    statPublic("reports/estrategicos_index.json"),
    statPublic("optimizacion/reports_index.json"),
    statPublic("data/finance_snapshot.json"),
  ]);

  const [predLabel, stratLabel] = await Promise.all([
    latestReportLabel("reports/predicciones_index.json"),
    latestReportLabel("reports/estrategicos_index.json"),
  ]);

  const jobs: AutomationJob[] = [
    {
      id: "mirofish-daily",
      name: "MiroFish Predicciones",
      status: statusFromAge(pred.exists, pred.ageHours),
      lastRun: pred.mtime ? formatLastRun(pred.mtime) : undefined,
      detail: predLabel
        ? `Último índice: ${predLabel} → predicciones_index.json`
        : "enhanced_report.py → predicciones_index.json",
      ageHours: pred.ageHours !== undefined ? Math.round(pred.ageHours * 10) / 10 : undefined,
    },
    {
      id: "strategic",
      name: "Reporte Estratégico",
      status: statusFromAge(strat.exists, strat.ageHours),
      lastRun: strat.mtime ? formatLastRun(strat.mtime) : undefined,
      detail: stratLabel
        ? `Último índice: ${stratLabel} → estrategicos_index.json`
        : "reporte_optimizacion_estrategica.py → estrategicos_index.json",
      ageHours: strat.ageHours !== undefined ? Math.round(strat.ageHours * 10) / 10 : undefined,
    },
    {
      id: "optimization",
      name: "Índice Optimización (archivo)",
      status: statusFromAge(opt.exists, opt.ageHours),
      lastRun: opt.mtime ? formatLastRun(opt.mtime) : undefined,
      detail: "optimization_report.py → optimizacion/reports_index.json (no montado en UI)",
      ageHours: opt.ageHours !== undefined ? Math.round(opt.ageHours * 10) / 10 : undefined,
    },
    {
      id: "reports-sync",
      name: "Sync Reportes PDF",
      status:
        pred.exists && strat.exists
          ? statusFromAge(true, Math.max(pred.ageHours ?? 999, strat.ageHours ?? 999))
          : "warning",
      lastRun:
        pred.mtime || strat.mtime
          ? formatLastRun(
              new Date(Math.max(pred.mtime?.getTime() ?? 0, strat.mtime?.getTime() ?? 0))
            )
          : undefined,
      detail: "scripts/sync_reports.ps1 — PDFs desde MiroFish-Lite (stale >24h = revisar)",
    },
    {
      id: "finance-snapshot",
      name: "Finance Snapshot",
      status: finance.exists ? "ok" : "warning",
      lastRun: finance.mtime ? formatLastRun(finance.mtime) : undefined,
      detail: finance.exists
        ? "public/data/finance_snapshot.json — capital/burn (sin CRM)"
        : "Falta finance_snapshot.json",
    },
    {
      id: "skills-sync",
      name: "Skills Sync",
      status: "warning",
      lastRun: "Manual",
      detail: "Catálogo compilado en bundle — ejecutar sync_skills.py antes de deploy (meta 36=36)",
    },
    {
      id: "vercel-deploy",
      name: "Deploy Vercel",
      status: "ok",
      lastRun: "rr-aliados-mega-dashboard.vercel.app",
      detail: "Build en Vercel (no local Drive). Salud de reportes = frescura de índices.",
    },
  ];

  const summary = {
    ok: jobs.filter((j) => j.status === "ok").length,
    warning: jobs.filter((j) => j.status === "warning").length,
    error: jobs.filter((j) => j.status === "error").length,
    total: jobs.length,
    staleThresholdHours: STALE_OK_H,
  };

  return NextResponse.json({
    updatedAt: now.toISOString(),
    jobs,
    summary,
  });
}
