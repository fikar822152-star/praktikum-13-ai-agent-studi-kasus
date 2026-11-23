# Contoh Penggunaan — admin-perkantoran-pemda

## Contoh 1 — Klasifikasi surat & disposisi

**Prompt**
```
Gunakan skill `admin-perkantoran-pemda`.
Surat dari Dinas Pendidikan: "Perihal: Permohonan data guru bantu.
Mohon dikirim sebelum 26 November 2026."
Klasifikasikan dan buatkan draft disposisi.
```

**Keluaran ringkas (ilustrasi)**
- Kategori: `SURAT_MASUK` — alasan: permohonan data antar-instansi.
- Prioritas: `Tinggi` — tenggat 3 hari.
- Bidang tujuan: Bidang Kepegawaian.
- Draft disposisi: "Diteruskan ke Bidang Kepegawaian untuk menyiapkan data guru bantu, dengan tenggat 26 November 2026. DRAFT — perlu verifikasi."
- Reminder: kirim data sebelum 25 November.

## Contoh 2 — Notulen dari transkrip

**Prompt**
```
Ringkas transkrip rapat berikut menjadi notulen. Tandai bagian yang tidak jelas.
"Rapat membahas anggaran. Pak A bilang kuota kurang. Ibu B usulkan realokasi.
Disepakati realokasi 5%."
```

**Keluaran ringkas (ilustrasi)**
- Pokok bahasan: anggaran & kuota.
- Keputusan: realokasi 5% (PIC: `[PERLU VERIFIKASI]`).
- Action item: susun revisi anggaran — PIC `[PERLU VERIFIKASI]`.

## Contoh 3 — FAQ warga

**Prompt**
```
Warga bertanya: "Syarat mengurus KTP di kelurahan apa saja?"
Jawab singkat, lalu sebutkan kapan harus dieskalasi.
```

**Keluaran ringkas (ilustrasi)**
- Jawaban berdasarkan SOP yang diberikan petugas (contoh: KK, surat permohonan, foto).
- Eskalasi: jika warga menanyakan status berkas yang sudah diproses → alihkan ke petugas.
- Label: jawaban umum, bukan penetapan resmi.
