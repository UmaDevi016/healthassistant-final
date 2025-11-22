# PRE-DEPLOYMENT CHECKLIST

Write-Host ""
Write-Host "DEPLOYMENT CHECKLIST" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan

$script:passed = 0
$script:total = 0

function Check {
    param([string]$name, [bool]$ok)
    $script:total++
    if ($ok) {
        Write-Host "OK - $name" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "FAIL - $name" -ForegroundColor Red
    }
}

# CHECKS
Write-Host ""
Write-Host "Files:" -ForegroundColor Yellow

Check "Dockerfile" (Test-Path "Dockerfile")
Check "docker-compose.yml" (Test-Path "docker-compose.yml")
Check "backend/app.py" (Test-Path "backend/app.py")
Check "frontend/src/App.jsx" (Test-Path "frontend/src/App.jsx")
Check "requirements.txt" (Test-Path "backend/requirements.txt")
Check "package.json" (Test-Path "frontend/package.json")

Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow

Check "QUICK_DEPLOY.md" (Test-Path "QUICK_DEPLOY.md")
Check "DEPLOYMENT.md" (Test-Path "DEPLOYMENT.md")

Write-Host ""
Write-Host "Languages:" -ForegroundColor Yellow

$langs = @("en", "hi", "ta", "te", "bn", "es", "fr", "ar")
$langCount = 0
foreach ($lang in $langs) {
    if (Test-Path "frontend/src/locales/$lang.json") {
        $langCount++
    }
}
Check "All 8 locale files ($langCount/8)" ($langCount -eq 8)

# SUMMARY
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
$pct = if ($script:total -gt 0) { [int](($script:passed / $script:total) * 100) } else { 0 }
Write-Host "Result: $($script:passed) of $($script:total) checks passed" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan

if ($pct -eq 100) {
    Write-Host ""
    Write-Host "Ready to deploy!" -ForegroundColor Green
    Write-Host "git push origin main" -ForegroundColor Cyan
}

Write-Host ""
