# Praktikum #13 — Studi Kasus: Perancangan AI Agent untuk Lima Skenario Magang

> **Tugas:** Kelola AI Agent sesuai studi kasus — identifikasi *jobdesk* dan aktivitas repetitif yang bisa digantikan oleh AI Agent, buat AI Agent *skills*-nya, dan kumpulkan dalam **satu GitHub repository**.

| Keterangan | Isi |
| --- | --- |
| Nama | Ahmad Zulfikar |
| NIM | C1D124022 |
| Mata Kuliah | `[Nama Mata Kuliah]` |
| Dosen Pengampu | Andy Ismail, S.Kom., M.M., MTA |
| Topik | Praktikum #13 — Studi Kasus AI Agent |
| Tanggal | 23 November 2026 |
| Repository | `praktikum-13-ai-agent-studi-kasus` |

---

## 1. Latar Belakang

AI Agent bukan sekadar chatbot: ia adalah sistem yang mampu **memahami tugas, merencanakan langkah, memanggil alat, dan menghasilkan keluaran kerja** dengan pengawasan manusia. Di dunia magang, banyak pekerjaan harian bersifat **repetitif, berbasis aturan, dan berformat tetap** — mulai dari mengklasifikasikan surat, mengisi form anamnesa, membuat caption, menyaring CV, hingga mengecek kelengkapan dokumen kredit. Aktivitas-aktivitas inilah yang paling rasional didelegasikan ke AI Agent, sehingga mahasiswa magang bisa fokus pada pekerjaan yang membutuhkan empati, analisis, dan keputusan.

Lima skenario yang dianalisis dalam repository ini:

| No | Skenario Magang | Fokus | Kode Skill |
| --- | --- | --- | --- |
| 1 | Administrasi perkantoran dinas pemerintahan daerah (Pemda) | Surat-menyurat, disposisi, notulen, layanan warga | `admin-perkantoran-pemda` |
| 2 | Klinik dokter — registrasi & anamnesa | Pendaftaran pasien, anamnesa terstruktur, penjadwalan | `registrasi-anamnesa-klinik` |
| 3 | Digital marketing agency | Konten, riset, analitik, laporan klien | `digital-marketing-agency` |
| 4 | Perusahaan sawit — HRD | Rekrutmen, administrasi karyawan, FAQ HR | `hrd-perusahaan-sawit` |
| 5 | Bank — bagian kredit | Verifikasi dokumen, pra-analisis 5C, monitoring | `kredit-bank` |

---

## 2. Tujuan

1. Memetakan **jobdesk** pada kelima skenario magang.
2. Mengidentifikasi **aktivitas repetitif** yang memenuhi syarat untuk diautomasi (rule-based, volume tinggi, data terstruktur, risiko keputusan rendah).
3. Merancang **AI Agent Skill** untuk setiap skenario dalam format `SKILL.md` yang siap dipakai di agent harness (OpenCode / Claude Code / framework serupa).
4. Menetapkan **guardrails**: human-in-the-loop, privasi data, dan audit trail.
5. Mengemas seluruh artefak dalam **satu repository GitHub** yang rapi dan terdokumentasi.

---

## 3. Ringkasan Pemetaan: Jobdesk → Aktivitas Repetitif → AI Agent

| Skenario | Aktivitas Repetitif Utama | AI Agent Menggantikan | manusia tetap memegang |
| --- | --- | --- | --- |
| Admin Pemda | Input surat masuk, disposisi, notulen, rekap laporan, jawab FAQ warga | OCR + klasifikasi surat, draft balasan/disposisi, ringkasan rapat, chatbot layanan, agregasi laporan | Persetujuan disposisi, kebijakan, tanda tangan |
| Klinik | Isi form registrasi, tulis anamnesa, jadwalkan kontrol, rekap kunjungan | Registrasi via chatbot/voice, strukturasi anamnesa → SOAP, pengingat WA, validasi form, rekap data | Diagnosis, triase final, informs consent |
| Digital Marketing | Caption/ide konten, riset keyword, cek engagement, laporan mingguan | Generasi variasi hook + A/B, riset tren, ringkasan analitik, auto-reply, draft laporan | Strategi brand, approval konten, negosiasi klien |
| HRD Sawit | Screening CV, mengajukan lowongan, jadwal interview, jawab FAQ cuti/gaji, rekap absensi | Parsing & ranking CV, draft job posting, penjadwalan, chatbot HR, deteksi anomali absensi | Keputusan hiring, hubungan industrial, approval akhir |
| Kredit Bank | Cek dokumen, input data, hitung pra-screening, follow-up, laporan portofolio | Ekstraksi dokumen (KTP/slip/rekening), checklist kelengkapan, memo analisis 5C, pengingat jatuh tempo, dashboard | **Keputusan kredit**, analisis final, approver berwenang |

> **Prinsip:** AI Agent melakukan *drafting, ekstraksi, klasifikasi, penjadwalan, dan ringkasan*. Manusia melakukan *validasi, keputusan, empati, dan pertanggungjawaban hukum*.

Analisis lengkap ada di [`docs/analisis-jobdesk-ai.md`](docs/analisis-jobdesk-ai.md).

---

## 4. Struktur Repository

```
praktikum-13-ai-agent-studi-kasus/
├── README.md                          # Ringkasan & pemetaan (file ini)
├── LICENSE                            # MIT
├── docs/
│   ├── analisis-jobdesk-ai.md          # Analisis mendalam per skenario
│   ├── panduan-instalasi.md            # Cara pasang & uji skill
│   └── etika-dan-batasan.md           # Guardrails, privasi, human-in-the-loop
├── skills/
│   ├── admin-perkantoran-pemda/
│   │   ├── SKILL.md                    # Definisi AI Agent Skill
│   │   └── references/
│   │       ├── template-surat-masuk.md
│   │       ├── template-notulen-rapat.md
│   │       └── contoh-penggunaan.md
│   ├── registrasi-anamnesa-klinik/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── template-anamnesa-soap.md
│   │       ├── template-registrasi-pasien.md
│   │       └── contoh-penggunaan.md
│   ├── digital-marketing-agency/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── template-laporan-kampanye.md
│   │       ├── template-konten.md
│   │       └── contoh-penggunaan.md
│   ├── hrd-perusahaan-sawit/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── template-screening-cv.md
│   │       ├── template-faq-karyawan.md
│   │       └── contoh-penggunaan.md
│   └── kredit-bank/
│       ├── SKILL.md
│       └── references/
│           ├── template-pengesahan-dokumen.md
│           ├── template-memo-analisis-kredit.md
│           └── contoh-penggunaan.md
└── CHANGELOG.md
```

---

## 5. Katalog Skill

Setiap `SKILL.md` memakai format standar Agent Skills: **YAML frontmatter** (`name`, `description`) + instruksi tubuh (peran, jobdesk, workflow, template, guardrails, contoh).

| Skill | Deskripsi singkat | Pemicu penggunaan |
| --- | --- | --- |
| [`admin-perkantoran-pemda`](skills/admin-perkantoran-pemda/SKILL.md) | Mengelola surat masuk/keluar, menyusun disposisi, merangkum rapat, menjawab layanan warga, dan menyusun laporan periodik Pemda | "Klasifikasikan surat masuk ini", "Buatkan notulen rapat", "Draft balasan pengaduan warga" |
| [`registrasi-anamnesa-klinik`](skills/registrasi-anamnesa-klinik/SKILL.md) | Membantu registrasi pasien, menstrukturkan anamnesa ke format SOAP, mengatur jadwal & pengingat, merekap kunjungan | "Ubah keluhan pasien ini ke SOAP", "Buat jadwal kontrol", "Cek kelengkapan form" |
| [`digital-marketing-agency`](skills/digital-marketing-agency/SKILL.md) | Membuat variasi konten, riset keyword/tren, meringkas analitik, auto-reply, dan menyusun laporan klien | "Buat 5 caption A/B testing", "Ringkas Meta Insights minggu ini", "Draft laporan klien" |
| [`hrd-perusahaan-sawit`](skills/hrd-perusahaan-sawit/SKILL.md) | Menyaring & memberi peringkat CV, menyusun lowongan, menjadwalkan interview, chatbot FAQ karyawan, rekap absensi | "Saring 20 CV ini", "Buat job posting operator panen", "Jawab FAQ cuti karyawan" |
| [`kredit-bank`](skills/kredit-bank/SKILL.md) | Mengekstraksi dokumen kredit, memeriksa kelengkapan, menyusun memo pra-analisis 5C, pengingat angsuran, rekap portofolio | "Cek kelengkapan berkas kredit", "Buat memo analisis 5C", "Rekap jatuh tempo" |

---

## 6. Cara Pakai (Ringkas)

Untuk OpenCode:

```bash
# Salin skill yang dibutuhkan ke folder skill project
cp -r skills/admin-perkantoran-pemda .opencode/skills/
# atau ke folder global
cp -r skills/admin-perkantoran-pemda ~/.config/opencode/skills/
```

Untuk Claude Code: salin ke `~/.claude/skills/`.

Lalu panggil lewat prompt, misalnya:

> "Gunakan skill `admin-perkantoran-pemda` untuk mengklasifikasikan surat masuk berikut dan buatkan draft disposisinya."

Panduan lengkap: [`docs/panduan-instalasi.md`](docs/panduan-instalasi.md).

---

## 7. Guardrails (Berlaku untuk Semua Skill)

1. **Human-in-the-loop** — AI hanya membuat *draft*; manusia yang menyetujui, menandatangani, dan memutuskan.
2. **Privasi & kerahasiaan** — data pribadi (NIK, BPJS, rekening, rekam medis, CV) diproses minimal, dianonimkan bila memungkinkan, tidak dikirim ke layanan publik.
3. **Audit trail** — setiap keluaran dicatat: sumber data, waktu, versi skill, dan siapa yang memvalidasi.
4. **Tidak membuat keputusan final** — terutama pada klinik (diagnosis) dan bank (persetujuan kredit).
5. **Toleransi terhadap ketidakpastian** — bila data kurang atau ambigu, skill wajib menandai `[PERLU VERIFIKASI]` dan bertanya, bukan mengarang.

Detail: [`docs/etika-dan-batasan.md`](docs/etika-dan-batasan.md).

---

## 8. Indikator Keberhasilan (Ilustratif)

| Metrik | Sebelum (manual) | Sesudah (AI Agent + verifikasi) |
| --- | --- | --- |
| Waktu klasifikasi surat | ± 10 menit/surat | ± 1 menit/surat |
| Waktu input anamnesa | ± 8 menit/pasien | ± 2 menit/pasien |
| Waktu screening 20 CV | ± 3 jam | ± 20 menit |
| Cek dokumen kredit | ± 15 menit/berkas | ± 3 menit/berkas |
| Ketepatan format laporan | Bergantung individu | Konsisten via template |

> Angka bersifat ilustratif untuk menunjukkan dampak, bukan hasil pengukuran aktual.

---

## 9. Catatan

- Isi identitas pada tabel atas dengan data diri sebelum dikumpulkan.
- Seluruh konten dibuat sebagai artefak pembelajaran; tidak mengandung data pribadi nyata.
- Lisensi: MIT — lihat [`LICENSE`](LICENSE).
