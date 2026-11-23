# Contoh Penggunaan — registrasi-anamnesa-klinik

## Contoh 1 — Narasi → SOAP

**Prompt**
```
Gunakan skill `registrasi-anamnesa-klinik`.
Pasien: "Sudah 3 hari demam, batuk, tenggorokan sakit. Dulu alergi amoxicilin."
Belum ada tanda vital. Buat anamnesa SOAP.
```

**Keluaran (ilustrasi)**
```
S : Demam 3 hari, batuk, tenggorokan sakit. Riwayat alergi: amoxicilin.
O : [PERLU VERIFIKASI PERAWAT] — tanda vital belum diisi
A : [PERLU VERIFIKASI DOKTER — AI tidak membuat diagnosis]
P : [DRAFT] Anamnesa lanjutan & pemeriksaan penunjang sesuai kebijakan klinik.
```

## Contoh 2 — Cek kelengkapan form

**Input:** BPJS kosong, alamat kosong, kontak terisi.
**Keluaran:** "Field kurang: nomor BPJS, alamat. Kode pasien: PAS-021. `[PERLU VERIFIKASI PETUGAS]`"

## Contoh 3 — Jadwal & pengingat

**Prompt:** "Pasien minta kontrol 3 hari lagi jam 10."
**Keluaran:** "Jadwal: [tanggal + 3 hari] pukul 10.00. Teks pengingat: 'Yth. PAS-021, jadwal kontrol Anda ... Mohon konfirmasi.'"

> Catatan: contoh menggunakan data fiktif. Jangan memasukkan data pasien nyata ke dalam repository.
