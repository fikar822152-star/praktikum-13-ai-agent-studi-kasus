@echo off
cd /d "%~dp0"
if not exist ".env" (
  echo [!] File .env belum ada.
  echo     Salin .env.example menjadi .env lalu isi LLM_API_KEY.
  echo.
)
node server.js
pause
