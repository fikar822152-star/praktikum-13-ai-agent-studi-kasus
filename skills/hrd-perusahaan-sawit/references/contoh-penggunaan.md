# Contoh Penggunaan — hrd-perusahaan-sawit

## Contoh 1 — Ranking CV

**Prompt**
```
Gunakan skill `hrd-perusahaan-sawit`.
Posisi: Operator Panen. Kriteria: pengalaman panen ≥ 1 thn (40%), domisili ≤20 km (30%),
bersedia shift (30%). 5 CV dianonimkan ... Buat tabel peringkat + draft undangan.
```

**Keluaran (ilustrasi)**
| Kode | Skor | Alasan |
| --- | --- | --- |
| KAND-001 | 88 | Pengalaman 3 thn, domisili sesuai, shift bersedia |
| KAND-002 | 62 | Pengalaman 6 bulan → di bawah syarat |

Tidak ada keputusan "diterima"; ada kolom "Diputus oleh: ______".

## Contoh 2 — FAQ

**Input:** "Saya mau cuti 2 hari, caranya gimana?"
**Keluaran:** "Ajukan melalui form cuti ke atasan langsung minimal 3 hari kerja sebelum tanggal cuti. `[DRAFT — jawaban umum, bukan keputusan HRD]`"

## Contoh 3 — Rekap absensi

**Input:** Data harian 30 karyawan.
**Keluaran:** "3 karyawan terlambat > 3× dalam seminggu → `[PERLU VERIFIKASI HRD]`. Total hadir 96%."
