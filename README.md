# RR ALIADOS — MiroFish Dashboard

Dashboard de skills y reportes MiroFish-Lite para RR ALIADOS S.A.S.

## Widgets de reportes

### MiroFish Reports
- Visor PDF con KPIs (cambios, tendencias, anomalías, riesgos, oportunidades, acciones)
- Auto-refresh cada 5 minutos
- Fuente: `public/reports/reports_index.json` (generado por `enhanced_report.py`)

### Optimización
- Tabs: Diarios / Semanales / Mensuales / Dashboards
- Visor PDF con descarga y enlace a nueva pestaña
- Auto-refresh cada 5 minutos
- Fuente: `public/optimizacion/reports_index.json` (generado por `optimization_report.py`)

## Pipeline

```
enhanced_report.py → _sync_to_dashboard() → /public/reports/
optimization_report.py → generate_all() → /public/optimizacion/
                                     ↓
                        run_daily.bat → vercel deploy --prod --yes
                                     ↓
                        https://skill-orchestrator-dashboard.vercel.app
```

## Deploy manual

```bash
cd skill-orchestrator-dashboard
vercel deploy --prod --yes
```

## Estructura

| Ruta | Contenido |
|------|-----------|
| `src/components/MiroFishReportsWidget.tsx` | Widget de reportes de predicciones |
| `src/components/OptimizacionWidget.tsx` | Widget de reportes de optimización |
| `public/reports/` | PDFs y JSON de predicciones (generados por bot) |
| `public/optimizacion/` | PDFs y JSON de optimización (generados por bot) |

https://rr-aliados-mega-dashboard.vercel.app/
