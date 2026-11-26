// Indonesia Pulse — data.js
// Satu sumber kebenaran untuk semua angka di situs ini.
// Semua angka berasal dari Badan Pusat Statistik (BPS), tahun data 2024,
// kecuali dinyatakan lain. Tidak ada angka yang dibuat-buat di file ini.

export const SOURCE = "BPS";
export const DATA_YEAR = 2024;

export const siteMeta = {
  name: "Indonesia Pulse",
  tagline: "Denyut angka Indonesia, dalam satu tempat.",
  country: "Indonesia",
  dataYear: 2024,
  source: "Badan Pusat Statistik (BPS)",
  updatedNote: "Angka di situs ini memakai tahun data 2024, kecuali dinyatakan lain.",
};

export const population = {
  total: 281603800,
  totalLabel: "281,6 juta jiwa",
  year2020: "270,20 juta",
  projection2025: "284,44 juta",
  javaShare: 55.93,
  densityNational: 149,
  densityJakarta: 16165,
  islands: 17380,
  landAreaKm2: "1.890.179,78",
  languages: 718,
};

export const provinces = [
  { name: "Jawa Barat", population: 50.35, share: 17.88 },
  { name: "Jawa Timur", population: 41.81, share: 14.85 },
  { name: "Jawa Tengah", population: 37.89, share: 13.46 },
  { name: "Sumatera Utara", population: 15.59, share: 5.54 },
  { name: "Banten", population: 12.43, share: 4.41 },
  { name: "DKI Jakarta", population: 10.68, share: 3.79 },
  { name: "Sulawesi Selatan", population: 9.46, share: 3.36 },
  { name: "Lampung", population: 9.42, share: 3.35 },
  { name: "Sumatera Selatan", population: 8.84, share: 3.14 },
  { name: "Riau", population: 6.73, share: 2.39 },
];

export const economy = {
  gdp2024: "Rp22.138,96 triliun",
  gdp2023: "Rp20.892,4 triliun",
  gdpPerCapita: "Rp78,62 juta",
  gdpPerCapitaUsd: "US$4.960,33",
  growth: [
    { year: 2021, value: 3.7 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  inflation: [
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  householdConsumptionGrowth: 4.94,
  investmentGrowth: 4.61,
};

export const labour = {
  unemploymentAug2024: 4.91,
  unemployedMillions: 7.47,
  unemploymentFeb2024: 4.82,
  unemploymentAug2023: 5.32,
  highestProvince: { name: "Jawa Barat", value: 6.75 },
  lowestProvince: { name: "Bali", value: 1.79 },
  povertyMar2024: 9.03,
  poverty2023: 9.36,
  extremePoverty2024: 0.83,
  extremePoverty2023: 1.12,
  gini2024: 0.379,
  gini2023: 0.388,
};

export const humanDevelopment = {
  hdi2024: 75.02,
  hdi2023: 74.39,
  lifeExpectancy: 74.15,
  expectedSchooling: 13.21,
  meanSchooling2024: 8.85,
  meanSchooling2023: 8.77,
  realExpenditureIncrease: "Rp442 ribu",
  realExpenditureGrowth: 3.71,
};

export const kpiCards = [
  {
    label: "Penduduk",
    value: "281,6 jt",
    detail: "Proyeksi interim pertengahan 2024",
    route: "#/penduduk",
  },
  {
    label: "PDB 2024",
    value: "Rp22.139 T",
    detail: "Naik dari Rp20.892 T pada 2023",
    route: "#/ekonomi",
  },
  {
    label: "Pertumbuhan ekonomi",
    value: "5,03%",
    detail: "Tahun 2024",
    route: "#/ekonomi",
  },
  {
    label: "Inflasi 2024",
    value: "1,57%",
    detail: "Turun dari 2,61% pada 2023",
    route: "#/ekonomi",
  },
  {
    label: "Pengangguran",
    value: "4,91%",
    detail: "Agustus 2024 · 7,47 juta orang",
    route: "#/tenaga-kerja",
  },
  {
    label: "Kemiskinan",
    value: "9,03%",
    detail: "Maret 2024 · turun dari 9,36%",
    route: "#/tenaga-kerja",
  },
  {
    label: "IPM 2024",
    value: "75,02",
    detail: "Naik dari 74,39 pada 2023",
    route: "#/pembangunan",
  },
  {
    label: "Harapan hidup",
    value: "74,15 thn",
    detail: "Tahun 2024",
    route: "#/pembangunan",
  },
];

export const highlights = [
  {
    title: "Jawa menampung lebih dari separuh penduduk",
    text: "55,93% penduduk Indonesia tinggal di Pulau Jawa. Tiga provinsi — Jawa Barat, Jawa Timur, dan Jawa Tengah — saja sudah menampung 46,2% penduduk nasional.",
    route: "#/penduduk",
  },
  {
    title: "Ekonomi tumbuh 5,03% di 2024",
    text: "PDB mencapai Rp22.138,96 triliun dengan PDB per kapita Rp78,62 juta (US$4.960,33). Konsumsi rumah tangga tumbuh 4,94% dan investasi 4,61%.",
    route: "#/ekonomi",
  },
  {
    title: "Kemiskinan turun, ketimpangan menyempit",
    text: "Tingkat kemiskinan Maret 2024 tercatat 9,03%, turun dari 9,36% setahun sebelumnya. Kemiskinan ekstrem turun ke 0,83% dan rasio gini ke 0,379.",
    route: "#/tenaga-kerja",
  },
  {
    title: "IPM naik ke 75,02",
    text: "Indeks Pembangunan Manusia 2024 naik dari 74,39. Harapan lama sekolah 13,21 tahun dan rata-rata lama sekolah 8,85 tahun.",
    route: "#/pembangunan",
  },
];

export const methodNotes = [
  "Penduduk 2024 memakai proyeksi interim BPS pertengahan tahun; angka 2020 berasal dari Sensus Penduduk 2020.",
  "PDB memakai harga berlaku; pertumbuhan ekonomi memakai harga konstan.",
  "Tingkat pengangguran terbuka (TPT) memakai hasil Survei Angkatan Kerja Nasional (Sakernas) Agustus 2024.",
  "Tingkat kemiskinan memakai garis kemiskinan Maret 2024; kemiskinan ekstrem memakai garis yang ditetapkan pemerintah.",
  "IPM memakai komponen harapan hidup, harapan lama sekolah, rata-rata lama sekolah, dan pengeluaran riil per kapita yang disesuaikan.",
  "Angka provinsi pada halaman Provinsi memakai tahun data 2024 dan dibulatkan ke dua desimal (juta jiwa).",
  "Situs ini bukan situs resmi BPS. Angka-angkanya dikutip dari publikasi BPS; untuk data terbaru dan rinci, lihat publikasi resmi BPS.",
];
