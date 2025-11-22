# set_openai_env.ps1
# Prompt for OPENAI_API_KEY and write to backend/.env safely (local dev only).

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    New-Item -Path $envFile -ItemType File | Out-Null
}

$val = Read-Host -AsSecureString "Enter OPENAI_API_KEY (will be written to backend/.env)"
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($val))

# Read existing lines
$lines = Get-Content $envFile -ErrorAction SilentlyContinue
$found = $false
for ($i=0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^OPENAI_API_KEY=') {
        $lines[$i] = "OPENAI_API_KEY=$plain"
        $found = $true
        break
    }
}
if (-not $found) {
    $lines += "OPENAI_API_KEY=$plain"
}
Set-Content -Path $envFile -Value $lines -Encoding UTF8
Write-Host "Wrote OPENAI_API_KEY to $envFile (keep this file out of git)."
