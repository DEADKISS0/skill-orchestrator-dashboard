"use client";
import { useState } from "react";

export default function ExportWidget() {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = async () => {
    setExporting(true);
    try {
      // Fetch report data
      const [predRes, stratRes, optRes] = await Promise.all([
        fetch("/reports/predicciones_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
        fetch("/reports/estrategicos_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
        fetch("/optimizacion/reports_index.json").then(r => r.json()).catch(() => ({ reports: {} })),
      ]);

      // Build CSV content
      let csv = "Tipo,Fecha,Label,Progreso,Acciones,Urgentes,Predicciones,Riesgos\n";
      
      predRes.reports?.forEach((r: any) => {
        csv += `Predicciones,${r.date},"${r.label}",N/A,N/A,N/A,${r.summary?.total_changes || 0},${r.summary?.risks || 0}\n`;
      });
      
      stratRes.reports?.forEach((r: any) => {
        csv += `Estratégico,${r.date},"${r.label}",${r.summary?.progreso || "N/A"},${r.summary?.acciones || 0},${r.summary?.urgentes || 0},N/A,N/A\n`;
      });

      const optReports = optRes.reports || {};
      (["diarios", "semanales", "mensuales", "dashboards"] as const).forEach((tab) => {
        optReports[tab]?.forEach((r: { date: string; name: string; type: string }) => {
          csv += `Optimización ${tab},${r.date},"${r.name}",N/A,N/A,N/A,N/A,N/A\n`;
        });
      });

      // Download CSV
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `RR_ALIADOS_Metrics_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export error:", e);
    } finally {
      setExporting(false);
    }
  };

  const exportToJSON = async () => {
    setExporting(true);
    try {
      const [predRes, stratRes, optRes] = await Promise.all([
        fetch("/reports/predicciones_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
        fetch("/reports/estrategicos_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
        fetch("/optimizacion/reports_index.json").then(r => r.json()).catch(() => ({ reports: {} })),
      ]);

      const optReports = optRes.reports || {};
      const optimizationFlat = (["diarios", "semanales", "mensuales", "dashboards"] as const).flatMap(
        (tab) => (optReports[tab] || []).map((r: { date: string; name: string; type: string; path: string }) => ({ ...r, tab }))
      );

      const data = {
        exportDate: new Date().toISOString(),
        company: "RR ALIADOS S.A.S.",
        predictions: predRes.reports || [],
        strategic: stratRes.reports || [],
        optimization: optimizationFlat,
        summary: {
          totalPredictionReports: predRes.reports?.length || 0,
          totalStrategicReports: stratRes.reports?.length || 0,
          totalOptimizationReports: optimizationFlat.length,
        },
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `RR_ALIADOS_Export_${new Date().toISOString().split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export error:", e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📥</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Exportar Datos</h3>
      </div>

      <div className="space-y-2">
        <button
          onClick={exportToCSV}
          disabled={exporting}
          className="w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
          style={{
            background: exporting ? "var(--border)" : "var(--accent)",
            color: "white",
          }}
        >
          {exporting ? "Exportando..." : "📊 Exportar a CSV"}
        </button>

        <button
          onClick={exportToJSON}
          disabled={exporting}
          className="w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
          style={{
            background: exporting ? "var(--border)" : "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          }}
        >
          {exporting ? "Exportando..." : "📋 Exportar a JSON"}
        </button>
      </div>

      <p className="text-[10px] mt-2 text-center" style={{ color: "var(--text-muted)" }}>
        Exporta métricas y reportes para análisis externo
      </p>
    </div>
  );
}
