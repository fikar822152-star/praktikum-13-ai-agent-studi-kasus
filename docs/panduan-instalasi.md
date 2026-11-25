# Panduan Instalasi & Pengujian Skill

Panduan ini menjelaskan cara memasang kelima AI Agent Skill ke dalam agent harness dan mengujinya.

---

## 1. Format Skill

Setiap skill berupa folder dengan struktur:

```
nama-skill/
├── SKILL.md              # WAJIB: frontmatter + instruksi
└── references/           # OPSIONAL: template, contoh, panduan tambahan
```

Contoh frontmatter:

```yaml
---
name: admin-perkantoran-pemda
description: Use this skill when ... Triggers on "surat masuk", "disposisi", ...
---
```

- `name`: unik, huruf kecil, gunakan tanda hubung.
- `description`: jelaskan **kapan** skill dipakai (pemicu), bukan hanya apa itu.

---

## 2. Pasang di OpenCode

### Opsi A — Project scope (direkomendasikan untuk praktikum)

```bash
mkdir -p .opencode/skills
cp -r skills/admin-perkantoran-pemda .opencode/skills/
cp -r skills/registrasi-anamnesa-klinik .opencode/skills/
cp -r skills/digital-marketing-agency .opencode/skills/
cp -r skills/hrd-perusahaan-sawit .opencode/skills/
cp -r skills/kredit-bank .opencode/skills/
```

### Opsi B — Global scope

```bash
mkdir -p ~/.config/opencode/skills
cp -r skills/* ~/.config/opencode/skills/
```

Verifikasi:

```bash
ls .opencode/skills
```

Lalu di sesi OpenCode, panggil:

```
Gunakan skill `kredit-bank` untuk memeriksa kelengkapan berkas pengajuan berikut: ...
```

### Opsi C — PowerShell (Windows, sesuai lingkungan praktikum)

```powershell
New-Item -ItemType Directory -Force -Path .opencode\skills
Copy-Item -Recurse skills\* -Destination .opencode\skills\
Get-ChildItem .opencode\skills
```

---

## 3. Pasang di Claude Code

```bash
cp -r skills/* ~/.claude/skills/
```

Skill akan otomatis terdeteksi. Panggil dengan menyebut nama skill atau deskripsi pemicunya.

---

## 4. Pasang di Framework Lain

Untuk framework yang mendukung *tool calling*, langkah umumnya:

1. Baca isi `SKILL.md`.
2. Daftarkan `name` dan `description` sebagai metadata tool/skill.
3. Sertakan isi `SKILL.md` sebagai system prompt saat skill dipilih.
4. Muat file pendukung di `references/` bila dibutuhkan (progressive disclosure).

---

## 5. Cara Menguji

Gunakan contoh prompt yang tersedia di `skills/<nama-skill>/references/contoh-penggunaan.md`.

Checklist pengujian:

- [ ] Skill terpicu saat kata kunci disebut.
- [ ] Keluaran mengikuti template di `references/`.
- [ ] Field yang tidak lengkap ditandai `[PERLU VERIFIKASI]`.
- [ ] Tidak ada keputusan final yang diambil AI.
- [ ] Data sensitif tidak dibocorkan / dianonimkan.
- [ ] Ada ringkasan audit (sumber, waktu, validator).

Contoh uji cepat:

```
Gunakan skill `registrasi-anamnesa-klinik`.
Keluhan pasien: "Sudah 3 hari demam, batuk, tenggorokan sakit. Dulu pernah alergi amoxicilin."
Ubah ke format SOAP dan tandai bagian yang perlu diverifikasi dokter.
```

Keluaran yang diharapkan: format SOAP dengan `S:` berisi keluhan, `O:` berisi tanda vital (kosong → ditandai), `A:` bertanda `[PERLU VERIFIKASI DOKTER]`, `P:` berisi rencana pemeriksaan, bukan resep.

### 5.1 Uji dengan model lokal (Ollama)

Lingkungan uji: Windows, RAM 8 GB, CPU 4 core (tanpa GPU), Ollama 0.5.7, model `qwen2.5:1.5b` (986 MB).

| Skill | Waktu jawab | Catatan |
| --- | --- | --- |
| `admin-perkantoran-pemda` | ±43 s | daftar tugas terstruktur, sesuai peran |
| `registrasi-anamnesa-klinik` | ±44 s | format SOAP + `[PERLU VERIFIKASI DOKTER]` muncul |
| `digital-marketing-agency` | ±32 s | caption jadi, emoji terbatas pada model kecil |
| `hrd-perusahaan-sawit` | ±59 s | pertanyaan interview relevan |
| `kredit-bank` | ±36 s | angka terbaca, istilah DSR perlu dikoreksi manusia |

Kesimpulan: model 1.5B cukup untuk **draft terstruktur**, tetapi kualitas bahasa dan istilah teknis perlu diverifikasi. Untuk mutu lebih baik gunakan `qwen2.5:3b` bila RAM lega.

---

## 6. Pemecahan Masalah

| Masalah | Penyebab | Solusi |
| --- | --- | --- |
| Skill tidak terdeteksi | Salah folder | Pastikan `SKILL.md` ada langsung di dalam folder skill |
| Skill tidak terpicu | Deskripsi kurang spesifik | Tambahkan kata kunci pemicu di `description` |
| Output terlalu panjang | Semua referensi dimuat | Gunakan progressive disclosure: muat `references/` hanya bila perlu |
| AI mengambil keputusan final | Guardrails lemah | Perkuat bagian "Batasan" dan minta tanda tangan manusia |
| Data sensitif muncul di log | Tidak dianonimkan | Terapkan aturan anonimisasi di setiap skill |

---

## 7. Menyalin Repository ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: 5 AI Agent skills for internship case study"
git branch -M main
git remote add origin https://github.com/<USERNAME>/praktikum-13-ai-agent-studi-kasus.git
git push -u origin main
```

> Ganti `<USERNAME>` dengan username GitHub Anda. Jangan pernah commit token/kredensial.
