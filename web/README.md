# RAKA — Web AI Agent (Praktikum #13)

Aplikasi web chat **RAKA (Rekan Kerja Otomatis)** untuk menjalankan kelima **AI Agent Skill** dari folder `../skills/`.
Dibuat dengan **Node.js murni tanpa dependency** — tidak perlu `npm install`.

---

## 1. Persyaratan

- **Node.js 18+** (sudah tersedia: v26)
- API key dari penyedia LLM yang kompatibel dengan format OpenAI

---

## 2. Konfigurasi

1. Salin `.env.example` menjadi `.env`:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Buka `.env` dan isi minimal:

   ```env
   LLM_API_KEY=sk-xxxxxxxxxxxxxxxx
   LLM_BASE_URL=https://api.openai.com/v1
   LLM_MODEL=gpt-4o-mini
   ```

3. Sesuaikan penyedia bila bukan OpenAI:

   | Penyedia | `LLM_BASE_URL` | Contoh `LLM_MODEL` |
   | --- | --- | --- |
   | OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
   | DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
   | OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o-mini` |
   | Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` |
   | Ollama (lokal) | `http://127.0.0.1:11434/v1` | `qwen2.5:7b` (API key boleh `ollama`) |

> Jangan pernah commit file `.env`. File `web/.env` sudah diabaikan oleh `.gitignore` di root repository.

### Rekomendasi model untuk RAM 8 GB (tanpa GPU)

Mesin uji: RAM 8 GB, CPU 4 core, GPU Intel HD (shared), tanpa CUDA. Inferensi berjalan di **CPU**, sehingga model kecil lebih realistis.

| RAM bebas | Model | Unduhan | Perkiraan RAM | Catatan |
| --- | --- | --- | --- | --- |
| ±2 GB | `llama3.2:1b` | ±1,3 GB | ±1,5 GB | paling cepat, kualitas dasar |
| ±3 GB | `qwen2.5:1.5b` | ±1,0 GB | ±2 GB | **disarankan** — seimbang |
| ±5 GB | `qwen2.5:3b` | ±2,0 GB | ±3 GB | kualitas lebih baik, lebih lambat |
| ≥8 GB | `qwen2.5:7b` | ±4,7 GB | ±6 GB | **tidak disarankan** di mesin ini |

> Tutup aplikasi berat (browser banyak tab, OneDrive syncing) sebelum menjalankan model. Tanpa GPU NVIDIA, kecepatan 1.5B sekitar 10–20 token/detik dan 3B sekitar 5–10 token/detik — cukup untuk tugas draft, bukan percakapan panjang.

### Skrip setup otomatis

Setelah Ollama terpasang, dari folder `web/`:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-ollama.ps1
```

Skrip akan mengecek instalasi, menyalakan service, mengunduh `qwen2.5:1.5b`, dan menampilkan konfigurasi `.env` yang benar.

Untuk model lain:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-ollama.ps1 -Model qwen2.5:3b
```

---

## 3. Menjalankan

Dari folder `web/`:

```powershell
node server.js
```

Atau klik dua kali `start.bat`.

Server berjalan di **http://localhost:4173** dan browser akan terbuka otomatis.

Jika port dipakai:

```powershell
$env:PORT=4174; node server.js
```

---

## 4. Cara Menggunakan

1. Pilih agent di sidebar (5 pilihan).
2. Klik salah satu contoh prompt, atau tulis instruksi sendiri.
3. Tekan **Enter** untuk mengirim, **Shift+Enter** untuk baris baru.
4. Hasil berlabel **DRAFT** — verifikasi tetap wajib.
5. Tombol **Salin** menyalin jawaban mentah (format Markdown).

---

## 5. Arsitektur

```
Browser (index.html + app.js + style.css)
        │  POST /api/chat { skillId, messages }
        ▼
server.js (Node http)
        │  1. muat SKILL.md dari ../skills/<id>/SKILL.md
        │  2. jadikan isi SKILL.md sebagai system prompt
        │  3. teruskan ke LLM (OpenAI-compatible)
        ▼
Penyedia LLM → jawaban → browser
```

- API key **hanya** disimpan di server (`.env`), tidak dikirim ke browser.
- Server mengikat `127.0.0.1` (hanya lokal).
- Tidak ada data yang disimpan ke disk; riwayat chat ada di memori browser.

---

## 6. Endpoint

| Method | Path | Keterangan |
| --- | --- | --- |
| `GET` | `/api/health` | Status konfigurasi, model, jumlah skill |
| `GET` | `/api/skills` | Daftar skill (id, name, description, references) |
| `POST` | `/api/chat` | `{ skillId, messages: [{role, content}] }` |

---

## 7. Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `API key belum dikonfigurasi` | Isi `web/.env`, restart server |
| `Gagal menghubungi penyedia LLM` | Cek `LLM_BASE_URL`, koneksi internet, dan validitas key |
| `Model tidak mengembalikan teks` | Coba model lain di `LLM_MODEL` |
| Port dipakai | Jalankan `$env:PORT=4174; node server.js` |
| `npm.ps1 cannot be loaded` | Tidak perlu npm; jalankan langsung `node server.js` |
| Halaman kosong | Pastikan membuka `http://localhost:4173`, bukan file HTML langsung |
