# Etika, Privasi, dan Batasan AI Agent

Dokumen ini berlaku untuk **kelima skill** di repository. Bagian "Batasan" di tiap `SKILL.md` merupakan turunan dari prinsip-prinsip di sini.

---

## 1. Prinsip Utama

| Prinsip | Penerapan konkret |
| --- | --- |
| **Human-in-the-loop** | Setiap keluaran berlabel *draft*. Tidak ada eksekusi final tanpa verifikasi manusia. |
| **Explainability** | AI wajib menyebut sumber data dan alasan di balik klasifikasi/skor. |
| **Data minimization** | Minta hanya field yang diperlukan. Anonimkan NIK, BPJS, rekening, CV bila bisa. |
| **Confidentiality** | Jangan kirim data pribadi ke layanan publik/eksternal tanpa izin dan dasar hukum. |
| **Audit trail** | Catat: sumber data, waktu, versi skill, output, dan nama validator. |
| **Fail-safe** | Bila ragu, tandai `[PERLU VERIFIKASI]` dan bertanya — jangan mengarang. |

---

## 2. Pembagian Kerja: AI vs Manusia

```
        AI Agent                                  Manusia
 ┌────────────────────────┐              ┌────────────────────────┐
 │ Ekstraksi data         │              │ Validasi kebenaran     │
 │ Klasifikasi/ranking    │   ──draft──▶ │ Keputusan final        │
 │ Ringkasan & draft teks │              │ Empati & komunikasi    │
 │ Penjadwalan & reminder │              │ Tanda tangan & approval│
 │ Rekap & analitik       │              │ Pertanggungjawaban hukum│
 └────────────────────────┘              └────────────────────────┘
```

---

## 3. Batasan per Skenario (Ringkas)

| Skenario | Yang BOLEH | Yang DILARANG |
| --- | --- | --- |
| Admin Pemda | Draft disposisi, klasifikasi surat, notulen | Menandatangani, menetapkan kebijakan, membagi surat rahasia tanpa otorisasi |
| Klinik | Strukturasi anamnesa, registrasi, reminder | Diagnosis, resep, triase final, menggantikan informed consent |
| Digital Marketing | Variasi konten, insight metrik, draft laporan | Publish tanpa approval, klaim palsu, melanggar hak cipta/merek |
| HRD Sawit | Ranking CV objektif, FAQ, rekap absensi | Diskriminasi (usia/gender/agama/suku), keputusan PHK, data gaji terbuka |
| Kredit Bank | Ekstraksi dokumen, cek kelengkapan, memo 5C | Persetujuan/penolakan kredit, skor diskriminatif, membocorkan data nasabah |

---

## 4. Penanganan Data Sensitif

1. **Anonimisasi** — ganti identitas dengan kode (mis. `PAS-001`, `NAS-014`) saat membuat contoh atau laporan.
2. **Redaksi** — tampilkan hanya 4 digit terakhir NIK/rekening bila wajib.
3. **Penyimpanan** — gunakan folder lokal terenkripsi; jangan commit ke GitHub.
4. **Retensi** — hapus data setelah kebutuhan selesai sesuai kebijakan instansi.
5. **Akses** — batasi siapa yang bisa melihat hasil ekstraksi.

---

## 5. Contoh Penandaan Ketidakpastian

```
Nama pasien        : PAS-014
Nomor BPJS         : [PERLU VERIFIKASI — 4 digit terakhir tidak terbaca]
Keluhan utama      : Demam 3 hari, batuk
Riwayat alergi     : Amoxicilin (dari narasi pasien)
Assessment (A)     : [PERLU VERIFIKASI DOKTER — AI tidak membuat diagnosis]
```

---

## 6. Dampak & Tanggung Jawab

Jika AI Agent salah klasifikasi surat, salah menulis angka, atau salah menilai kelengkapan dokumen, **tanggung jawab tetap berada pada manusia yang memvalidasi**. Karena itu:

- Selalu baca kembali keluaran AI sebelum dipakai.
- Simpan bukti validasi (nama + waktu).
- Laporkan kesalahan untuk perbaikan skill (versioning via `CHANGELOG.md`).

---

## 7. Kepatuhan

Praktikum ini mengacu pada budaya kerja administrasi yang baik. Bila diterapkan di dunia nyata, sesuaikan dengan regulasi yang berlaku (mis. perlindungan data pribadi, kerahasiaan medis, dan ketentuan internal bank/Pemda).
