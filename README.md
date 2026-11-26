# Indonesia Pulse — Statistik Indonesia 2024

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/masoplek1011/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/masoplek1011/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**Indonesia Pulse** adalah portal statistik nasional Indonesia — satu halaman
dengan rute hash yang menyajikan angka-angka tahun data 2024: penduduk,
ekonomi, tenaga kerja dan kemiskinan, pembangunan manusia, serta penjelajah
provinsi. Semua angka dikutip dari Badan Pusat Statistik (BPS) dan setiap
bagian mencantumkan sumber beserta tahunnya.

## Isi situs

- **Beranda** — delapan kartu KPI utama, grafik tren pertumbuhan ekonomi
  (toggle batang/garis), sorotan angka 2024, dan fakta Indonesia sekilas.
- **Penduduk** — 281,6 juta jiwa (proyeksi interim 2024), pembagian
  Jawa–luar Jawa dalam grafik donat, dan sepuluh provinsi terpadat.
- **Ekonomi** — PDB Rp22.138,96 triliun, pertumbuhan 5,03%, inflasi 1,57%,
  dengan tab seri (pertumbuhan/inflasi) dan tab periode (2021–2024 / 2023–2024).
- **Tenaga Kerja** — TPT Agustus 2024 4,91%, kemiskinan 9,03%, kemiskinan
  ekstrem 0,83%, rasio gini 0,379.
- **Pembangunan** — IPM 75,02, harapan hidup 74,15 tahun, harapan lama
  sekolah 13,21 tahun.
- **Provinsi** — tabel 10 provinsi teratas dengan pencarian, pengurutan
  kolom, tombol salin angka, dan unduh CSV.
- **Metodologi** — sumber data dan catatan metodologi setiap angka.

## Menjalankan situs

Situs ini statis, tanpa build step dan tanpa permintaan jaringan. Sajikan
`app/` dengan server HTTP statis apa pun, misalnya dari direktori repo:

```sh
cd app && python3 -m http.server 8080
```

Lalu buka http://localhost:8080 di desktop Chrome atau di ponsel.

## Menyerahkan (program)

`main.ts` di root repo menyalin `app/` dan `screenshots/` ke direktori
keluaran dan menulis `dossier.json` (Node 22, pustaka standar saja):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Data

Semua angka memakai tahun data 2024 dan bersumber dari Badan Pusat Statistik
(BPS). Situs ini bukan situs resmi BPS dan tidak berafiliasi dengannya.

## Lisensi

MIT — lihat `LICENSE`.
