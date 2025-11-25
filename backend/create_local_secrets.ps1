# create_local_secrets.ps1
# Helper to create secret files for local docker-compose use.
# Usage: Run from repo root: .\backend\create_local_secrets.ps1

$secretsDir = Join-Path -Path $PSScriptRoot -ChildPath ".secrets"
if (-not (Test-Path $secretsDir)) {
    New-Item -ItemType Directory -Path $secretsDir | Out-Null
}

$keys = @("OPENAI_API_KEY","LINGO_API_KEY","GROQ_API_KEY","LINGO_PROJECT_ID")
foreach ($k in $keys) {
    $path = Join-Path $secretsDir $k
    if (Test-Path $path) {
        Write-Host "$k already exists at $path; skipping (delete file to recreate)"
        continue
    }
    $val = Read-Host "Enter value for $k (leave blank to skip)"
    if ([string]::IsNullOrWhiteSpace($val)) {
        Write-Host "Skipping $k"
        continue
    }
    Set-Content -Path $path -Value $val -NoNewline -Encoding UTF8
    Write-Host "Wrote secret $k -> $path"
}

Write-Host "Local secrets created. Ensure .gitignore includes backend/.secrets to avoid committing them."