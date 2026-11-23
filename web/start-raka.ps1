# RAKA — Start (Windows)
# Menyalakan Ollama (bila belum aktif) lalu menjalankan web RAKA.
# Pakai dari folder web/:
#   powershell -ExecutionPolicy Bypass -File .\start-raka.ps1

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

function Find-Ollama {
  $cmd = Get-Command ollama -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  foreach ($p in @("$env:LOCALAPPDATA\Programs\Ollama\ollama.exe", "$env:ProgramFiles\Ollama\ollama.exe")) {
    if (Test-Path $p) { return $p }
  }
  return $null
}

function Test-Ollama {
  try {
    Invoke-RestMethod -Uri "http://127.0.0.1:11434/api/version" -TimeoutSec 2 | Out-Null
    return $true
  } catch { return $false }
}

$exe = Find-Ollama
if (-not $exe) {
  Write-Host "Ollama belum terpasang." -ForegroundColor Red
  Write-Host "Install: powershell -ExecutionPolicy Bypass -File .\setup-ollama.ps1"
  exit 1
}

if (-not (Test-Ollama)) {
  Write-Host "Menyalakan Ollama..." -ForegroundColor Yellow
  Start-Process -FilePath $exe -ArgumentList "serve" -WindowStyle Hidden
  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Milliseconds 500
    if (Test-Ollama) { break }
  }
}

if (-not (Test-Ollama)) {
  Write-Host "Ollama tidak merespons di http://127.0.0.1:11434" -ForegroundColor Red
  Write-Host "Buka aplikasi Ollama dari Start Menu, lalu jalankan skrip ini lagi."
  exit 1
}

Write-Host "Ollama aktif. Model tersedia:" -ForegroundColor Cyan
& $exe list

if (-not (Test-Path (Join-Path $here ".env"))) {
  Write-Host ""
  Write-Host "PERINGATAN: web/.env belum ada. Salin dari .env.example lalu isi LLM_*." -ForegroundColor Yellow
}

Write-Host ""
node server.js
