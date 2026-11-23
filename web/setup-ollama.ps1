# RAKA — Setup Ollama (Windows)
# Jalankan dari folder web/:  .\setup-ollama.ps1
# Jika eksekusi .ps1 diblokir:
#   powershell -ExecutionPolicy Bypass -File .\setup-ollama.ps1

param(
  [string]$Model = "qwen2.5:1.5b"
)

$ErrorActionPreference = "Stop"

function Find-Ollama {
  $cmd = Get-Command ollama -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }

  $candidates = @(
    "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe",
    "$env:ProgramFiles\Ollama\ollama.exe"
  )
  foreach ($path in $candidates) {
    if (Test-Path $path) { return $path }
  }
  return $null
}

function Test-OllamaApi {
  try {
    Invoke-RestMethod -Uri "http://127.0.0.1:11434/api/tags" -TimeoutSec 3 | Out-Null
    return $true
  } catch {
    return $false
  }
}

Write-Host ""
Write-Host "=== RAKA - Setup Ollama ===" -ForegroundColor Green
Write-Host ""

$exe = Find-Ollama
if (-not $exe) {
  Write-Host "Ollama belum terpasang." -ForegroundColor Yellow
  Write-Host "Install terlebih dahulu:"
  Write-Host "  winget install --id Ollama.Ollama -e --accept-source-agreements --accept-package-agreements"
  Write-Host ""
  Write-Host "Setelah installer selesai, buka terminal baru lalu jalankan skrip ini lagi."
  exit 1
}

Write-Host "Lokasi : $exe"
& $exe --version
Write-Host ""

if (-not (Test-OllamaApi)) {
  Write-Host "Service Ollama belum aktif. Menjalankan 'ollama serve'..." -ForegroundColor Yellow
  Start-Process -FilePath $exe -ArgumentList "serve" -WindowStyle Hidden
  Start-Sleep -Seconds 4
}

if (-not (Test-OllamaApi)) {
  Write-Host "Gagal terhubung ke http://127.0.0.1:11434" -ForegroundColor Red
  Write-Host "Coba buka aplikasi Ollama dari Start Menu, lalu ulangi skrip ini."
  exit 1
}

Write-Host "Mengunduh model $Model (bisa beberapa menit)..." -ForegroundColor Cyan
& $exe pull $Model

Write-Host ""
Write-Host "Model yang tersedia:" -ForegroundColor Cyan
& $exe list

Write-Host ""
Write-Host "Konfigurasi web/.env yang benar:" -ForegroundColor Green
Write-Host "  LLM_API_KEY=ollama"
Write-Host "  LLM_BASE_URL=http://127.0.0.1:11434/v1"
Write-Host "  LLM_MODEL=$Model"
Write-Host ""
Write-Host "Langkah terakhir:"
Write-Host "  1. Hentikan server RAKA (Ctrl+C)."
Write-Host "  2. Jalankan: node server.js"
Write-Host "  3. Buka: http://localhost:4173"
Write-Host ""
