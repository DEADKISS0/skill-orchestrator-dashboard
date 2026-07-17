# Sync reportes PDF/XLSX/JSON desde MiroFish-Lite hacia Mega Dashboard
# Uso: .\scripts\sync_reports.ps1
# Cron sugerido (Task Scheduler): diario 06:00 y 18:00 tras MiroFish
#   Program: powershell.exe
#   Args: -NoProfile -ExecutionPolicy Bypass -File "G:\Mi unidad\RR_Aliados\skill-orchestrator-dashboard\scripts\sync_reports.ps1"
# Luego: vercel deploy --prod --yes (o CI)

$ErrorActionPreference = "Stop"

$DashboardRoot = Split-Path -Parent $PSScriptRoot
$MiroFishReports = "G:\Mi unidad\RR_Aliados\05_IA_Herramientas\mirofish_lite\output\reports"
$MiroFishOptim = "G:\Mi unidad\RR_Aliados\05_IA_Herramientas\mirofish_lite\output\optimizacion"
$PublicReports = Join-Path $DashboardRoot "public\reports"
$PublicOptim = Join-Path $DashboardRoot "public\optimizacion"

function Sync-Folder {
    param([string]$Source, [string]$Dest, [string]$Label)
    if (-not (Test-Path -LiteralPath $Source)) {
        Write-Warning "Origen no encontrado ($Label): $Source"
        return 0
    }
    if (-not (Test-Path -LiteralPath $Dest)) {
        New-Item -ItemType Directory -Path $Dest -Force | Out-Null
    }
    $files = Get-ChildItem -LiteralPath $Source -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Extension -in '.pdf', '.xlsx', '.json' }
    $count = 0
    foreach ($f in $files) {
        $destPath = Join-Path $Dest $f.Name
        Copy-Item -LiteralPath $f.FullName -Destination $destPath -Force
        $count++
    }
    Write-Host "[$Label] $count archivos sincronizados -> $Dest"
    return $count
}

Write-Host "=== Sync Reportes Mega Dashboard ===" -ForegroundColor Cyan
Write-Host "Dashboard: $DashboardRoot"
Write-Host "Inicio: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

$r1 = Sync-Folder -Source $MiroFishReports -Dest $PublicReports -Label "Predicciones"
$r2 = Sync-Folder -Source $MiroFishOptim -Dest $PublicOptim -Label "Optimizacion"

Write-Host ""
Write-Host "Total: $($r1 + $r2) archivos." -ForegroundColor Green
Write-Host "Salud en prod: GET /api/automation (stale >24h = warning)." -ForegroundColor DarkGray
Write-Host "Siguiente: vercel deploy --prod --yes" -ForegroundColor Green
