# Changelog

Semua perubahan signifikan dicatat di file ini.

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
