# Contoh Penggunaan — kredit-bank

## Contoh 1 — Cek berkas + DSR

**Prompt**
```
Gunakan skill `kredit-bank`.
NAS-014: penghasilan rata-rata Rp 6.500.000; cicilan existing Rp 1.800.000;
pengajuan Rp 40.000.000, tenor 24 bulan, estimasi angsuran Rp 1.950.000.
Ada: KTP, KK, slip gaji 3 bln, rekening 3 bln. Belum ada: surat agunan.
Buat cek kelengkapan + DSR + draft memo 5C.
```

**Keluaran (ilustrasi)**
- Kurang: surat agunan → `[PERLU VERIFIKASI ANALIS]`
- DSR ≈ (1.800.000 + 1.950.000) / 6.500.000 = **57,7%** (asumsi: penghasilan dari slip 3 bulan, angsuran sesuai simulasi).
- Memo 5C dengan `A` dan `Collateral` bertanda `[DATA BELUM ADA]`.
- Kesimpulan: `[PERLU VERIFIKASI ANALIS — AI tidak memutus kredit]`.

## Contoh 2 — Ekstraksi dokumen

**Input:** teks OCR KTP dengan nomor 16 digit.
**Keluaran:** "KTP: `******4321` (confidence 0,91). Nama: `NAS-014`. Tanggal lahir: `...`. Field lain: `[PERLU VERIFIKASI ANALIS]`."

## Contoh 3 — Pengingat angsuran

**Input:** daftar tanggal jatuh tempo 20 nasabah.
**Keluaran:** "7 nasabah jatuh tempo 3 hari ke depan. Teks pengingat: 'Yth. NAS-___, angsuran Anda jatuh tempo pada [tanggal]. Mohon dibayar tepat waktu.' Tidak ada tindakan collection otomatis."

> Semua contoh memakai data fiktif. Jangan commit data nasabah nyata ke repository.
