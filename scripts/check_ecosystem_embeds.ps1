# Pre-deploy gate: verifica que apps con embed iframe/auto no tengan hard-block de framing.
# Uso: .\scripts\check_ecosystem_embeds.ps1
# Preferible contra prod: .\scripts\check_ecosystem_embeds.ps1 -BaseUrl https://rr-aliados-mega-dashboard.vercel.app
# O local: npm run dev + .\scripts\check_ecosystem_embeds.ps1 -BaseUrl http://localhost:3000

param(
    [string]$BaseUrl = "https://rr-aliados-mega-dashboard.vercel.app"
)

$ErrorActionPreference = "Stop"
$endpoint = "$BaseUrl/api/ecosystem/embed-check"

Write-Host "=== Ecosystem embed check ===" -ForegroundColor Cyan
Write-Host "GET $endpoint"

try {
    $resp = Invoke-RestMethod -Uri $endpoint -Method Get -TimeoutSec 120
} catch {
    Write-Host "FAIL: no se pudo llamar embed-check: $_" -ForegroundColor Red
    exit 2
}

Write-Host "checkedAt: $($resp.checkedAt)"
Write-Host "ok: $($resp.ok)"
Write-Host ""

foreach ($r in $resp.results) {
    $color = switch ($r.verdict) {
        "ok" { "Green" }
        "soft-block" { "Yellow" }
        "hard-block" { "Red" }
        "unreachable" { "Red" }
        default { "Gray" }
    }
    Write-Host ("[{0}] {1} embed={2} — {3}" -f $r.verdict, $r.id, $r.configuredEmbed, $r.detail) -ForegroundColor $color
}

if (-not $resp.ok) {
    Write-Host ""
    Write-Host "GATE FAIL — hardFails: $($resp.hardFails -join ', ')" -ForegroundColor Red
    Write-Host "Corrige headers del sitio destino o marca embed:card solo si es imposible embeber." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "GATE OK — ninguna app iframe/auto con hard-block." -ForegroundColor Green
exit 0
