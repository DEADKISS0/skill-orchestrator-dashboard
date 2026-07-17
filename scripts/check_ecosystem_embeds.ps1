# Pre-deploy gate: apps with embed iframe/auto must not have hard-block framing headers.
# Usage: .\scripts\check_ecosystem_embeds.ps1
# Against prod: .\scripts\check_ecosystem_embeds.ps1 -BaseUrl https://rr-aliados-mega-dashboard.vercel.app

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
    Write-Host "FAIL: embed-check unreachable: $_" -ForegroundColor Red
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
    $line = "[{0}] {1} embed={2} - {3}" -f $r.verdict, $r.id, $r.configuredEmbed, $r.detail
    Write-Host $line -ForegroundColor $color
}

if (-not $resp.ok) {
    Write-Host ""
    Write-Host ("GATE FAIL - hardFails: {0}" -f ($resp.hardFails -join ", ")) -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "GATE OK - no iframe/auto app with hard-block." -ForegroundColor Green
exit 0
