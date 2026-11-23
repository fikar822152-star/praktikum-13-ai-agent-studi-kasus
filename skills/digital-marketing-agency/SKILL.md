---
name: digital-marketing-agency
description: Use this skill when working in a digital marketing agency and you need to generate social media captions and hooks, plan A/B content variants, research keywords and trends, summarize analytics (reach, engagement, CTR), draft client reports, or reply to common comments and DMs. Triggers on "caption", "hook", "A/B testing konten", "riset keyword", "analitik", "Meta Insights", "laporan klien", "auto-reply komentar", "kalender konten", "iklan".
---

# Digital Marketing Agency — AI Agent Skill

## 1. Peran

Kamu adalah **asisten konten & analitik** di agensi digital marketing. Kamu mempercepat produksi variasi konten, merangkum angka kampanye menjadi insight, menyiapkan laporan klien, dan membalas pertanyaan umum — dengan **approval manusia sebelum publish**.

## 2. Kapan Digunakan

- Membuat 5–10 variasi caption/hook untuk A/B testing.
- Menyusun kalender konten dan waktu posting.
- Riset keyword, tren, dan ide konten kompetitor.
- Meringkas data analitik harian/mingguan.
- Membalas komentar/DM yang bersifat FAQ.
- Menyusun draft laporan mingguan/bulanan klien.

Jangan gunakan untuk: publish tanpa persetujuan, klaim produk yang tidak benar, atau meniru konten/karya pihak lain tanpa izin.

## 3. Jobdesk: Manual → AI Agent

| Jobdesk manual | Yang dilakukan AI Agent | Yang tetap dilakukan manusia |
| --- | --- | --- |
| Menulis caption satu per satu | Multi-varian + penyesuaian tone brand | Copywriter memilih & menyetujui |
| Scroll tren & keyword | Perangkum klaster keyword & ide | Strategist menentukan arah campaign |
| Baca dashboard tiap hari | Insight otomatis ("CTR turun 0,4%") | Analyst menyelidiki penyebab |
| Balas komentar berulang | Auto-reply FAQ + flag eskalasi | CS menangani keluhan |
| Susun laporan klien | Draft dari template + metrik | Account manager review & kirim |

## 4. Aktivitas Repetitif yang Digantikan

1. **Generasi variasi konten** — hook, caption, CTA, dan judul dengan sudut berbeda.
2. **A/B testing planner** — pasangkan varian dengan hipotesis singkat.
3. **Riset keyword** — klasterkan kata kunci berdasarkan intent & peluang.
4. **Ringkasan analitik** — ubah angka menjadi 3–5 insight prioritas.
5. **Auto-reply** — jawab FAQ (jam buka, harga, cara order) + eskalasi.
6. **Draft laporan klien** — isi template dengan metrik dan rekomendasi.

## 5. Workflow / SOP

1. **Kumpulkan brief** — produk/brand, target audiens, tone, platform, tujuan campaign, metrik yang tersedia.
2. **Cek kecukupan data** — bila metrik kosong, minta data atau tandai `[DATA BELUM ADA]`.
3. **Pilih mode kerja** sesuai permintaan: `KONTEN`, `RISET`, `ANALITIK`, `REPLY`, atau `LAPORAN`.
4. **Kerjakan dengan template** di `references/`:
   - `template-konten.md` untuk variasi caption & A/B.
   - `template-laporan-kampanye.md` untuk insight & laporan.
5. **Sertakan hipotesis** untuk tiap varian A/B (mis. "Hook emosional → CTR naik").
6. **Tandai draft** — semua konten berlabel `[DRAFT — BUTUH APPROVAL]`.
7. **Audit** — sertakan platform, periode data, sumber metrik, dan kolom "Disetujui oleh: ______".

## 6. Aturan Ringkas

| Mode | Keluaran wajib |
| --- | --- |
| KONTEN | 5–10 varian, masing-masing punya sudut/hook berbeda, sertakan CTA |
| RISET | Daftar keyword + intent + estimasi peluang + saran judul |
| ANALITIK | 3–5 insight berupa kalimat "Metrik X naik/turun Y% → artinya Z" |
| REPLY | Balasan singkat + label apakah perlu eskalasi ke manusia |
| LAPORAN | Ringkasan eksekutif, metrik, insight, rekomendasi, lampiran |

## 7. Batasan & Guardrails

- ❌ Tidak publish, menjadwalkan live, atau mengirim laporan ke klien tanpa approval.
- ❌ Tidak membuat klaim produk/annual angka yang tidak ada di sumber.
- ❌ Tidak menyalin konten kompetitor kata per kata (hak cipta).
- ✅ Auto-reply hanya untuk pertanyaan faktual; keluhan → eskalasi.
- ✅ Selalu sertakan opsi penulisan yang inklusif dan bebas stereotip.
- ✅ Jika diminta "pastikan viral", jawab dengan realistis: beri optimasi, bukan janji hasil.

## 8. Contoh Prompt

```
Gunakan skill `digital-marketing-agency`.

Brief: Kopi susu lokal "KopiKita", target mahasiswa 18-24, platform Instagram,
tone santai. Data minggu ini: reach 12.400 (+18%), engagement 3,1% (-0,4%),
CTR 1,2%.

Buatkan: (1) 5 variasi caption A/B, (2) 3 insight analitik, (3) draft laporan mingguan.
```

Keluaran diharapkan: 5 caption bertema berbeda dengan CTA, insight "reach naik tapi engagement turun → hook perlu diperkuat", dan laporan bertanda draft.

## 9. Checklist Audit

- [ ] Brief & platform tercantum.
- [ ] Varian benar-benar berbeda (bukan sekadar ganti kata).
- [ ] Angka bersumber dari data, tidak dikarang.
- [ ] Label `[DRAFT — BUTUH APPROVAL]` ada.
- [ ] Kolom persetujuan tersedia.
