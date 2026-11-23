# Template — Pengesahan Kelengkapan Dokumen (DRAFT)

**Kode nasabah:** `NAS-___` | **Jenis kredit:** `...` | **Diolah:** `[waktu]`

| No | Dokumen | Ada? | Confidence | Keterangan |
| --- | --- | --- | --- | --- |
| 1 | KTP (disamarkan `******4321`) | Ya / Tidak | `0.__` | `...` |
| 2 | KK | Ya / Tidak | `0.__` | `...` |
| 3 | Slip gaji 3 bulan terakhir | Ya / Tidak | `0.__` | `...` |
| 4 | Rekening 3 bulan terakhir | Ya / Tidak | `0.__` | `...` |
| 5 | Form aplikasi kredit | Ya / Tidak | `0.__` | `...` |
| 6 | Surat/bukti agunan | Ya / Tidak | `0.__` | `...` |
| 7 | Dokumen pendukung lain | Ya / Tidak | `0.__` | `...` |

## Hasil cek
- **Lengkap:** `Ya / Tidak`
- **Dokumen kurang:** `...`
- **Flag verifikasi:** field dengan confidence < 0,8 → `[PERLU VERIFIKASI ANALIS]`
- **Dokumen dicurigai tidak terbaca/tidak asli:** `...`

## Data terekstraksi (contoh field)
| Field | Nilai | Sumber dokumen | Confidence |
| --- | --- | --- | --- |
| Penghasilan rata-rata | `Rp ...` | Slip gaji | `0.__` |
| Cicilan existing | `Rp ...` | Rekening/slip | `0.__` |
| Nilai agunan | `[DATA BELUM ADA]` | `...` | `—` |

**Diverifikasi oleh:** `____________` — **DRAFT, bukan persetujuan kredit.**
