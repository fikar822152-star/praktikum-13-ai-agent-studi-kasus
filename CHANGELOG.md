# Changelog

Semua perubahan signifikan dicatat di file ini.

## [1.3.2] - 2026-11-23

### Added
- Pemilih model di UI (`/api/models`, `/api/model`) — semua model penyedia bisa dipakai tanpa edit `.env`/restart.
- Endpoint `/api/models` membaca daftar model langsung dari penyedia (termasuk Ollama lokal).
- `web/start-raka.ps1` — menyalakan Ollama + server RAKA dalam satu perintah.
- Pesan error yang lebih jelas untuk model belum diunduh / Ollama tidak aktif.

## [1.3.1] - 2026-11-23

### Added
- Skrip `web/setup-ollama.ps1` untuk cek instalasi, menyalakan service, dan mengunduh model.
- Panduan model lokal untuk RAM 8 GB di `web/README.md`.

## [1.3.0] - 2026-11-23

### Changed
- Mengembalikan judul resmi tugas sebagai H1 README.
- Menempatkan RAKA sebagai **identitas/persona pelengkap**, bukan pengganti ketentuan tugas.
- Menambahkan tabel **Kesesuaian dengan Ketentuan Tugas** untuk memudahkan penilaian.

## [1.2.0] - 2026-11-23

### Changed
- Menetapkan identitas agent menjadi **RAKA (Rekan Kerja Otomatis)**.
- Branding web UI, judul halaman, avatar, dan label pesan memakai nama RAKA.
- Persona RAKA ditambahkan ke system prompt web dan bagian Peran kelima `SKILL.md`.
- Dokumentasi README dan `web/README.md` diperbarui.

## [1.1.0] - 2026-11-23

### Added
- Web AI Agent tanpa dependency (`web/`): server Node.js + UI chat.
- Pemilih 5 skill, contoh prompt, render Markdown, dan tombol salin.
- Dukungan penyedia LLM kompatibel OpenAI (OpenAI, DeepSeek, OpenRouter, Groq, Ollama).
- Konfigurasi `.env.example`, `start.bat`, dan panduan `web/README.md`.
- `.gitignore` untuk `.opencode/`, `web/.env`, dan file log.

## [1.0.1] - 2026-11-23

### Changed
- Melengkapi identitas mahasiswa, mata kuliah, dan dosen pengampu di README.
- Memperbarui nama pemegang hak cipta di LICENSE.

## [1.0.0] - 2026-11-23

### Added
- README utama dengan pemetaan 5 studi kasus.
- Dokumen analisis jobdesk & aktivitas repetitif (`docs/analisis-jobdesk-ai.md`).
- Panduan instalasi & pengujian skill (`docs/panduan-instalasi.md`).
- Dokumen etika, privasi, dan batasan (`docs/etika-dan-batasan.md`).
- Skill `admin-perkantoran-pemda` + template referensi.
- Skill `registrasi-anamnesa-klinik` + template referensi.
- Skill `digital-marketing-agency` + template referensi.
- Skill `hrd-perusahaan-sawit` + template referensi.
- Skill `kredit-bank` + template referensi.
- Lisensi MIT.
