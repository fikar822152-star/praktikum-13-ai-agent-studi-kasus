# Analisis Jobdesk & Aktivitas Repetitif → AI Agent

Dokumen ini membedah kelima skenario magang secara sistematis. Untuk setiap skenario disajikan: **jobdesk**, **aktivitas repetitif**, **kriteria automasi**, **usulan AI Agent**, **output**, dan **dampak**.

---

## Metode Identifikasi

Suatu aktivitas layak didelegasikan ke AI Agent bila memenuhi **minimal 3 dari 5 kriteria**:

| Kriteria | Penjelasan |
| --- | --- |
| **Berulang & volume tinggi** | Dilakukan berkali-kali per hari/minggu dengan pola sama |
| **Berbasis aturan / format jelas** | Ada SOP, template, checklist, atau kategori tetap |
| **Data terstruktur atau semi-terstruktur** | Teks, tabel, tanggal, nominal, field formulir |
| **Penilaian rendah / risiko rendah** | Kesalahan masih bisa dikoreksi sebelum keputusan final |
| **Butuh kecepatan, bukan empati** | Tidak memerlukan negosiasi, kasihan, atau pertimbangan moral |

Sebaliknya, aktivitas berikut **tidak boleh** diserahkan sepenuhnya: pengambilan keputusan final, diagnosa medis, persetujuan kredit, sidang disiplin, penandatanganan resmi, dan komunikasi emosional/krisis.

---

## Skenario 1 — Administrasi Perkantoran Dinas Pemerintahan Daerah

### Jobdesk (Manual)
- Menerima, mencatat, dan mendistribusikan surat masuk/keluar (buku agenda).
- Memberi catatan disposisi untuk diteruskan ke bidang terkait.
- Menyiapkan notulen rapat, agenda pimpinan, dan undangan.
- Menjawab pertanyaan warga: prosedur layanan, status pengaduan, jam buka, persyaratan.
- Menyusun laporan bulanan/tahunan dari data tiap bidang.
- Menyiapkan berkas SK, SPPD, dan form administrasi lain.

### Aktivitas Repetitif → AI Agent

| Aktivitas | Frekuensi | Masalah | AI Agent | Output |
| --- | --- | --- | --- | --- |
| Input & klasifikasi surat masuk | 20–50/hari | Antri, salah kategori | OCR + klasifikasi (Surat Masuk/SK/Pengaduan/Undangan) | Metadata surat + kategori + prioritas |
| Draft disposisi | 10–20/hari | Redaksi berulang | Generator draft berdasarkan aturan bidang | Draft disposisi (draft, bukan tanda tangan) |
| Ringkas transkrip rapat | 3–5/minggu | Notulen lama | Summarization → poin, keputusan, tindak lanjut | Notulen terstruktur + daftar tugas |
| Jawab FAQ warga | 30–80/hari | Pertanyaan sama | Chatbot layanan + eskalasi ke staf | Jawaban otomatis + tiket eskalasi |
| Rekap laporan bulanan | 1/bulan | Copy-paste antar bidang | Agregasi & validasi format | Draft laporan + grafik ringkas |
| Pengingat agenda/SK | Harian | Terlewat deadline | Scheduler + notifikasi | Reminder ke pimpinan/staf |

### Dampak
Waktu administrasi turun drastis; arsip lebih konsisten; warga mendapat jawaban 24/7. **Manusia tetap** menandatangani disposisi dan menentukan kebijakan.

---

## Skenario 2 — Klinik Dokter: Registrasi & Anamnesa

### Jobdesk (Manual)
- Registrasi pasien baru/lama, verifikasi identitas & BPJS.
- Mengisi formulir anamnesa: keluhan utama, onset, riwayat penyakit, alergi, obat, riwayat keluarga.
- Menjadwalkan janji temu dan mengingatkan kontrol.
- Mencatat tanda vital awal (diserahkan ke perawat, AI hanya mencatat input).
- Merekap jumlah kunjungan dan diagnosis untuk pelaporan.

### Aktivitas Repetitif → AI Agent

| Aktivitas | Frekuensi | Masalah | AI Agent | Output |
| --- | --- | --- | --- | --- |
| Isi form registrasi | 30–80/hari | Tulis tangan sulit dibaca | Chatbot/voice-to-form + validasi field | Data pasien tervalidasi |
| Strukturasi anamnesa | 30–80/hari | Narasi pasien panjang | Ekstraksi → format **SOAP** (Subjective, Objective, Assessment, Plan) | Ringkasan anamnesa untuk dokter |
| Cek kelengkapan form | Tiap pasien | Field kosong terlewat | Validator checklist | Daftar field kurang |
| Penjadwalan & pengingat | Harian | Pasien lupa kontrol | Scheduler + WA reminder | Jadwal + pengingat otomatis |
| Rekap kunjungan | 1/minggu | Manual dari buku | Agregasi data | Statistik kunjungan |

### Guardrails khusus
- AI **tidak** menentukan diagnosis, triase final, atau resep.
- Field penting bertanda `[PERLU VERIFIKASI DOKTER]`.
- Data rekam medis bersifat sensitif → tidak dikirim ke layanan eksternal publik.

### Dampak
Antrian lebih cepat, dokter menerima ringkasan siap baca, waktu tunggu turun.

---

## Skenario 3 — Digital Marketing Agency

### Jobdesk (Manual)
- Menulis caption, hook, artikel, dan skrip iklan untuk berbagai klien.
- Menentukan waktu posting dan mengelola kalender konten.
- Memantau engagement (likes, comments, CTR, reach) tiap hari.
- Membalas komentar/DM yang bersifat umum.
- Riset keyword, tren, dan kompetitor.
- Menyusun laporan mingguan/bulanan untuk klien.

### Aktivitas Repetitif → AI Agent

| Aktivitas | Frekuensi | Masalah | AI Agent | Output |
| --- | --- | --- | --- | --- |
| Buat variasi caption/hook | 50+/minggu | Kehabisan ide | Generator multi-varian + tone brand | 5–10 opsi untuk A/B testing |
| Riset keyword & tren | 2–3/minggu | Manual scroll | Perangkum tren + klaster keyword | Daftar keyword + peluang konten |
| Ringkas analitik | Harian | Baca dashboard berulang | Analis angka → insight singkat | "Reach naik 18%, CTR turun 0,4%" |
| Auto-reply komentar/DM | 100+/hari | Balasan berulang | Balas FAQ + eskalasi ke humans | Reply otomatis + flag eskalasi |
| Draft laporan klien | 1/minggu | Format berulang | Template + ringkasan metrik | Draft laporan siap review |

### Guardrails khusus
- Konten **wajib login approval** sebelum dipublish (hindari klaim palsu, pelanggaran merek).
- Auto-reply hanya untuk pertanyaan faktual; keluhan/escalation langsung diteruskan.

### Dampak
Produksi konten meningkat, insight lebih cepat, laporan konsisten antar klien.

---

## Skenario 4 — Perusahaan Sawit, Bagian HRD

### Jobdesk (Manual)
- Membuat lowongan dan menyebar ke kanal rekrutmen.
- Menyaring CV, mencocokkan kualifikasi, memanggil interview.
- Mengelola data karyawan: kontrak, absensi, cuti, BPJS.
- Menjawab pertanyaan karyawan tentang gaji, cuti, dan prosedur.
- Menyusun laporan absensi, turnover, dan pelatihan.

### Aktivitas Repetitif → AI Agent

| Aktivitas | Frekuensi | Masalah | AI Agent | Output |
| --- | --- | --- | --- | --- |
| Screening & ranking CV | 20–100/lamaran | Lama, subjektif | Parsing CV + skor kecocokan (kriteria objektif) | Tabel peringkat + alasan skor |
| Draft job posting | 5–10/bulan | Redaksi sama | Generator dari template + kriteria | Iklan lowongan siap review |
| Jadwal interview | Mingguan | Bolak-balik chat | Scheduler + reminder | Jadwal final + pengingat |
| FAQ karyawan | 50+/hari | Ditanya berulang | Chatbot HR (cuti, slip gaji, BPJS) | Jawaban instan + tiket |
| Rekap absensi & anomali | Harian | Coretan manual | Agregasi + deteksi pola terlambat | Laporan + flag anomali |

### Guardrails khusus
- Skor CV adalah **prasaran**, bukan keputusan; hindari atribut sensitif (usia, jenis kelamin, suku, agama).
- Keputusan hiring, disiplin, dan hubungan industrial tetap di HRD manusia.

### Dampak
Time-to-hire lebih singkat, karyawan cepat dapat informasi, HR fokus pada pedagogi & budaya.

---

## Skenario 5 — Bank, Bagian Kredit

### Jobdesk (Manual)
- Menerima pengajuan kredit dan memeriksa kelengkapan dokumen.
- Menginput data nasabah ke sistem.
- Melakukan analisis 5C: *Character, Capacity, Capital, Collateral, Condition*.
- Menyusun memo analisis untuk komite kredit.
- Mengingatkan jatuh tempo dan menindaklanjuti tunggakan awal.
- Menyusun laporan portofolio kredit.

### Aktivitas Repetitif → AI Agent

| Aktivitas | Frekuensi | Masalah | AI Agent | Output |
| --- | --- | --- | --- | --- |
| Ekstraksi dokumen (KTP, slip gaji, rekening, agunan) | 10–30/hari | Input manual | OCR + field extraction | Data terekstraksi + confidence score |
| Cek kelengkapan berkas | Tiap pengajuan | Ada yang kurang | Checklist otomatis | Daftar dokumen missing |
| Pra-screening & scoring awal | Tiap pengajuan | Subjektif | Aturan rasio DSR/DSCR + kontrol bias | Skor awal + flag, **bukan keputusan** |
| Draft memo 5C | 5–15/hari | Redaksi panjang | Generator memo dari data terekstraksi | Draft memo untuk analis |
| Pengingat angsuran | Harian | Nasabah lupa | Scheduler + notifikasi | Reminder + daftar tunggakan awal |
| Rekap portofolio | 1/bulan | Manual Excel | Agregasi + visualisasi | Dashboard ringkas |

### Guardrails khusus
- **Dilarang** menyetujui atau menolak kredit secara otomatis.
- Data nasabah sangat sensitif → akses terbatas, audit trail wajib.
- Skor awal harus dapat dijelaskan (*explainable*) dan bebas diskriminasi.

### Dampak
Dokumen lebih cepat diverifikasi, analis fokus pada analisis mendalam, nasabah mendapat respons lebih cepat.

---

## Ringkasan Lintas Skenario

| Tema | Skenario 1 | Skenario 2 | Skenario 3 | Skenario 4 | Skenario 5 |
| --- | --- | --- | --- | --- | --- |
| Ekstraksi/OCR | Surat masuk | Form pasien | — | CV | Dokumen kredit |
| Klasifikasi & validasi | Kategori surat | Kelengkapan form | Kategori konten | Kecocokan CV | Kelengkapan berkas |
| Draft teks terstruktur | Disposisi & laporan | Anamnesa SOAP | Caption & laporan | Job posting | Memo 5C |
| Penjadwalan & reminder | Agenda pimpinan | Kontrol pasien | Kalender konten | Interview | Jatuh tempo |
| Chatbot FAQ | Warga | — | Komentar/DM | Karyawan | Nasabah |
| Ringkasan & analitik | Laporan bulanan | Statistik kunjungan | Insight metrik | Absensi & turnover | Portofolio |

**Kesimpulan:** Pola automasi sangat mirip lintas bidang — perbedaan hanya pada *objek data* dan *guardrails*. Dengan satu kerangka skill (`SKILL.md` + references + human-in-the-loop), kelima skenario dapat dikelola dalam satu repository yang konsisten.
