// Indonesia Pulse — views.js
// Render tiap rute dan semua logika interaktif situs:
// pencarian + sorting provinsi, toggle batang/garis, tab periode tren,
// serta salin angka dan unduh CSV data provinsi.

import {
  siteMeta,
  population,
  provinces,
  economy,
  labour,
  humanDevelopment,
  kpiCards,
  highlights,
  methodNotes,
} from "./data.js";
import { lineChart, barChart, hbarChart, donutChart } from "./charts.js";

const SRC = "Sumber: BPS, 2024";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sourceLine(extra) {
  return '<p class="source-note"><strong>' + SRC + ".</strong>" + (extra ? " " + extra : "") + "</p>";
}

function kpiGrid() {
  return (
    '<div class="kpi-grid">' +
    kpiCards
      .map(
        (k) =>
          '<a class="kpi" href="' + k.route + '">' +
          '<span class="kpi-label">' + esc(k.label) + "</span>" +
          '<span class="kpi-value">' + esc(k.value) + "</span>" +
          '<span class="kpi-detail">' + esc(k.detail) + "</span></a>",
      )
      .join("") +
    "</div>"
  );
}

// ---------------- Beranda ----------------
let homeChartMode = "bar";

export function renderHome() {
  const growth = economy.growth.map((g) => ({
    label: String(g.year),
    value: g.value,
    display: g.value.toFixed(2).replace(/\.?0+$/, "") + "%",
  }));
  const chart =
    homeChartMode === "line"
      ? lineChart(
          economy.growth.map((g) => ({ label: String(g.year), value: g.value })),
          { label: "Tren pertumbuhan ekonomi Indonesia 2021 sampai 2024" },
        )
      : barChart(growth, { label: "Pertumbuhan ekonomi Indonesia 2021 sampai 2024" });

  return (
    "<h1>" + esc(siteMeta.name) + ": Statistik Indonesia 2024</h1>" +
    '<p class="lede">' + esc(siteMeta.tagline) +
    " Penduduk 281,6 juta jiwa, ekonomi tumbuh 5,03%, dan IPM 75,02 — semua angka di sini dikutip dari BPS tahun data 2024.</p>" +
    kpiGrid() +
    sourceLine("Klik sebuah kartu untuk membuka halaman rinciannya.") +
    "<h2>Tren pertumbuhan ekonomi</h2>" +
    '<div class="chart-wrap">' +
    "<h3>Pertumbuhan ekonomi 2021–2024 (%)</h3>" +
    '<div class="controls" role="group" aria-label="Jenis grafik">' +
    '<button class="btn" type="button" data-chart-mode="bar" aria-pressed="' + (homeChartMode === "bar") + '">Batang</button>' +
    '<button class="btn" type="button" data-chart-mode="line" aria-pressed="' + (homeChartMode === "line") + '">Garis</button>' +
    "</div>" +
    chart +
    '<p class="chart-caption">PDB 2024 mencapai ' + esc(economy.gdp2024) + ", naik dari " + esc(economy.gdp2023) + " pada 2023.</p>" +
    sourceLine() +
    "</div>" +
    "<h2>Sorotan angka 2024</h2>" +
    '<div class="highlight-grid">' +
    highlights
      .map(
        (h) =>
          '<article class="highlight"><h3>' + esc(h.title) + "</h3><p>" + esc(h.text) + "</p>" +
          '<a class="link-more" href="' + h.route + '">Baca selengkapnya →</a></article>',
      )
      .join("") +
    "</div>" +
    "<h2>Indonesia sekilas</h2>" +
    '<div class="card"><p>' +
    '<span class="fact-chip">Luas daratan ' + esc(population.landAreaKm2) + " km²</span>" +
    '<span class="fact-chip">' + population.islands.toLocaleString("id-ID") + " pulau</span>" +
    '<span class="fact-chip">' + population.languages + " bahasa daerah</span>" +
    '<span class="fact-chip">Kepadatan ' + population.densityNational + " jiwa/km²</span>" +
    '<span class="fact-chip">DKI Jakarta ' + population.densityJakarta.toLocaleString("id-ID") + " jiwa/km²</span>" +
    "</p>" +
    sourceLine("Luas daratan, jumlah pulau, dan jumlah bahasa daerah menurut BPS.") +
    "</div>"
  );
}

export function bindHome(root) {
  root.querySelectorAll("[data-chart-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      homeChartMode = btn.getAttribute("data-chart-mode");
      renderCurrent();
    });
  });
}

// ---------------- Penduduk ----------------
export function renderPopulation() {
  return (
    "<h1>Penduduk Indonesia</h1>" +
    '<p class="lede">281,6 juta jiwa pada pertengahan 2024 — naik dari 270,20 juta pada Sensus 2020, dan diproyeksikan 284,44 juta pada 2025.</p>' +
    '<div class="card"><ul class="stat-list">' +
    "<li><span class=\"stat-label\">Penduduk pertengahan 2024 (proyeksi interim)</span><span class=\"stat-value\">281.603.800 jiwa</span></li>" +
    "<li><span class=\"stat-label\">Penduduk 2020 (Sensus Penduduk)</span><span class=\"stat-value\">270,20 juta jiwa</span></li>" +
    "<li><span class=\"stat-label\">Proyeksi penduduk 2025</span><span class=\"stat-value\">284,44 juta jiwa</span></li>" +
    "<li><span class=\"stat-label\">Penduduk di Pulau Jawa</span><span class=\"stat-value\">55,93%</span></li>" +
    "<li><span class=\"stat-label\">Tiga provinsi Jawa (Jabar, Jatim, Jateng)</span><span class=\"stat-value\">46,2% penduduk nasional</span></li>" +
    "<li><span class=\"stat-label\">Kepadatan penduduk nasional</span><span class=\"stat-value\">149 jiwa/km²</span></li>" +
    "<li><span class=\"stat-label\">Kepadatan DKI Jakarta</span><span class=\"stat-value\">16.165 jiwa/km²</span></li>" +
    "</ul>" + sourceLine() + "</div>" +
    "<h2>Di mana penduduk tinggal?</h2>" +
    '<div class="chart-wrap"><h3>Pembagian penduduk: Jawa dan luar Jawa</h3>' +
    donutChart(
      [
        { label: "Pulau Jawa", value: 55.93, color: "#0e7c7b" },
        { label: "Luar Jawa", value: 44.07, color: "#f2a900" },
      ],
      { center: "55,93%", centerLabel: "di Pulau Jawa", label: "Pembagian penduduk Jawa dan luar Jawa" },
    ) +
    '<p class="chart-caption">Lebih dari separuh penduduk Indonesia tinggal di Pulau Jawa, yang luasnya hanya sekitar 7% dari luas daratan nasional.</p>' +
    sourceLine() +
    "</div>" +
    "<h2>Provinsi terpadat</h2>" +
    '<div class="chart-wrap"><h3>Sepuluh provinsi dengan penduduk terbanyak, 2024 (juta jiwa)</h3>' +
    hbarChart(
      provinces.map((p) => ({ label: p.name, value: p.population, display: p.population.toFixed(2) })),
      { label: "Sepuluh provinsi dengan penduduk terbanyak 2024" },
    ) +
    '<p class="chart-caption">Jawa Barat adalah provinsi terpadat dengan 50,35 juta jiwa, diikuti Jawa Timur 41,81 juta dan Jawa Tengah 37,89 juta.</p>' +
    sourceLine("Lihat tabel lengkap dengan pencarian dan pengurutan di halaman Provinsi.") +
    '<p><a class="link-more" href="#/provinsi">Buka penjelajah provinsi →</a></p>' +
    "</div>"
  );
}

// ---------------- Ekonomi ----------------
let econSeries = "growth";
let econPeriod = "2021-2024";

export function renderEconomy() {
  const series = econSeries === "growth" ? economy.growth : economy.inflation;
  const label = econSeries === "growth" ? "Pertumbuhan ekonomi" : "Inflasi";
  const filtered =
    econPeriod === "2023-2024" ? series.filter((g) => g.year >= 2023) : series;
  const chart = lineChart(
    filtered.map((g) => ({ label: String(g.year), value: g.value })),
    { label: "Tren " + label.toLowerCase() + " Indonesia" },
  );

  return (
    "<h1>Ekonomi Indonesia</h1>" +
    '<p class="lede">PDB 2024 mencapai Rp22.138,96 triliun dengan pertumbuhan 5,03% dan inflasi 1,57% — inflasi terendah dalam empat tahun terakhir.</p>' +
    '<div class="card"><ul class="stat-list">' +
    "<li><span class=\"stat-label\">PDB 2024 (harga berlaku)</span><span class=\"stat-value\">Rp22.138,96 triliun</span></li>" +
    "<li><span class=\"stat-label\">PDB 2023</span><span class=\"stat-value\">Rp20.892,4 triliun</span></li>" +
    "<li><span class=\"stat-label\">PDB per kapita 2024</span><span class=\"stat-value\">Rp78,62 juta (US$4.960,33)</span></li>" +
    "<li><span class=\"stat-label\">Pertumbuhan ekonomi 2024</span><span class=\"stat-value\">5,03%</span></li>" +
    "<li><span class=\"stat-label\">Inflasi 2024</span><span class=\"stat-value\">1,57%</span></li>" +
    "<li><span class=\"stat-label\">Konsumsi rumah tangga tumbuh</span><span class=\"stat-value\">4,94%</span></li>" +
    "<li><span class=\"stat-label\">Investasi (PMTB) tumbuh</span><span class=\"stat-value\">4,61%</span></li>" +
    "</ul>" + sourceLine() + "</div>" +
    "<h2>Tren 2021–2024</h2>" +
    '<div class="chart-wrap">' +
    "<h3>" + label + " (%)</h3>" +
    '<div class="controls" role="group" aria-label="Seri data">' +
    '<button class="btn" type="button" data-econ-series="growth" aria-pressed="' + (econSeries === "growth") + '">Pertumbuhan</button>' +
    '<button class="btn" type="button" data-econ-series="inflation" aria-pressed="' + (econSeries === "inflation") + '">Inflasi</button>' +
    "</div>" +
    '<div class="controls" role="group" aria-label="Periode">' +
    '<button class="btn" type="button" data-econ-period="2021-2024" aria-pressed="' + (econPeriod === "2021-2024") + '">2021–2024</button>' +
    '<button class="btn" type="button" data-econ-period="2023-2024" aria-pressed="' + (econPeriod === "2023-2024") + '">2023–2024</button>' +
    "</div>" +
    chart +
    '<p class="chart-caption">' +
    (econSeries === "growth"
      ? "Pertumbuhan: 2021: 3,70% · 2022: 5,31% · 2023: 5,05% · 2024: 5,03%."
      : "Inflasi: 2021: 1,87% · 2022: 5,51% · 2023: 2,61% · 2024: 1,57%.") +
    "</p>" + sourceLine() + "</div>" +
    '<div class="card"><h3>Apa artinya?</h3><p>Pertumbuhan 5,03% ditopang konsumsi rumah tangga yang tumbuh 4,94% dan investasi 4,61%. Inflasi 1,57% adalah yang terendah sejak 2021, setelah sempat melonjak ke 5,51% pada 2022.</p>' +
    sourceLine() + "</div>"
  );
}

export function bindEconomy(root) {
  root.querySelectorAll("[data-econ-series]").forEach((btn) => {
    btn.addEventListener("click", () => {
      econSeries = btn.getAttribute("data-econ-series");
      renderCurrent();
    });
  });
  root.querySelectorAll("[data-econ-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
      econPeriod = btn.getAttribute("data-econ-period");
      renderCurrent();
    });
  });
}

// ---------------- Tenaga kerja ----------------
export function renderLabour() {
  return (
    "<h1>Tenaga Kerja &amp; Kemiskinan</h1>" +
    '<p class="lede">Pengangguran Agustus 2024 tercatat 4,91% (7,47 juta orang), dan kemiskinan Maret 2024 tercatat 9,03% — keduanya turun dari tahun sebelumnya.</p>' +
    '<div class="two-col">' +
    '<div class="card"><h3>Pengangguran (TPT)</h3><ul class="stat-list">' +
    "<li><span class=\"stat-label\">Agustus 2024</span><span class=\"stat-value\">4,91%</span></li>" +
    "<li><span class=\"stat-label\">Jumlah penganggur</span><span class=\"stat-value\">7,47 juta orang</span></li>" +
    "<li><span class=\"stat-label\">Februari 2024</span><span class=\"stat-value\">4,82%</span></li>" +
    "<li><span class=\"stat-label\">Agustus 2023</span><span class=\"stat-value\">5,32%</span></li>" +
    "<li><span class=\"stat-label\">Tertinggi: Jawa Barat</span><span class=\"stat-value\">6,75%</span></li>" +
    "<li><span class=\"stat-label\">Terendah: Bali</span><span class=\"stat-value\">1,79%</span></li>" +
    "</ul>" + sourceLine("Survei Angkatan Kerja Nasional (Sakernas), Agustus 2024.") + "</div>" +
    '<div class="card"><h3>Kemiskinan &amp; ketimpangan</h3><ul class="stat-list">' +
    "<li><span class=\"stat-label\">Kemiskinan, Maret 2024</span><span class=\"stat-value\">9,03%</span></li>" +
    "<li><span class=\"stat-label\">Kemiskinan, 2023</span><span class=\"stat-value\">9,36%</span></li>" +
    "<li><span class=\"stat-label\">Kemiskinan ekstrem 2024</span><span class=\"stat-value\">0,83%</span></li>" +
    "<li><span class=\"stat-label\">Kemiskinan ekstrem 2023</span><span class=\"stat-value\">1,12%</span></li>" +
    "<li><span class=\"stat-label\">Rasio gini 2024</span><span class=\"stat-value\">0,379</span></li>" +
    "<li><span class=\"stat-label\">Rasio gini 2023</span><span class=\"stat-value\">0,388</span></li>" +
    "</ul>" + sourceLine() + "</div></div>" +
    "<h2>Tren pengangguran</h2>" +
    '<div class="chart-wrap"><h3>Tingkat pengangguran terbuka (%)</h3>' +
    barChart(
      [
        { label: "Agt 2023", value: 5.32, display: "5,32%" },
        { label: "Feb 2024", value: 4.82, display: "4,82%" },
        { label: "Agt 2024", value: 4.91, display: "4,91%" },
      ],
      { label: "Tingkat pengangguran terbuka Agustus 2023 sampai Agustus 2024" },
    ) +
    '<p class="chart-caption">TPT turun 0,41 poin dari Agustus 2023 ke Agustus 2024, meski naik tipis dari Februari ke Agustus 2024.</p>' +
    sourceLine() + "</div>" +
    '<div class="card"><h3>Apa artinya?</h3><p>Pengangguran tertinggi ada di Jawa Barat (6,75%) dan terendah di Bali (1,79%) pada Agustus 2024. Di sisi lain, kemiskinan dan ketimpangan sama-sama membaik: rasio gini turun dari 0,388 ke 0,379.</p>' +
    sourceLine() + "</div>"
  );
}

// ---------------- Pembangunan manusia ----------------
export function renderDevelopment() {
  return (
    "<h1>Pembangunan Manusia</h1>" +
    '<p class="lede">Indeks Pembangunan Manusia (IPM) 2024 mencapai 75,02 — naik dari 74,39 pada 2023 — dengan harapan hidup 74,15 tahun.</p>' +
    '<div class="card"><ul class="stat-list">' +
    "<li><span class=\"stat-label\">IPM 2024</span><span class=\"stat-value\">75,02</span></li>" +
    "<li><span class=\"stat-label\">IPM 2023</span><span class=\"stat-value\">74,39</span></li>" +
    "<li><span class=\"stat-label\">Angka harapan hidup</span><span class=\"stat-value\">74,15 tahun</span></li>" +
    "<li><span class=\"stat-label\">Harapan lama sekolah</span><span class=\"stat-value\">13,21 tahun</span></li>" +
    "<li><span class=\"stat-label\">Rata-rata lama sekolah 2024</span><span class=\"stat-value\">8,85 tahun</span></li>" +
    "<li><span class=\"stat-label\">Rata-rata lama sekolah 2023</span><span class=\"stat-value\">8,77 tahun</span></li>" +
    "<li><span class=\"stat-label\">Pengeluaran riil per kapita naik</span><span class=\"stat-value\">Rp442 ribu (+3,71%)</span></li>" +
    "</ul>" + sourceLine() + "</div>" +
    "<h2>Tren IPM</h2>" +
    '<div class="chart-wrap"><h3>IPM 2023–2024</h3>' +
    barChart(
      [
        { label: "2023", value: 74.39, display: "74,39" },
        { label: "2024", value: 75.02, display: "75,02" },
      ],
      { label: "Indeks Pembangunan Manusia 2023 dan 2024" },
    ) +
    '<p class="chart-caption">IPM naik 0,63 poin dalam setahun, ditopang kenaikan harapan lama sekolah, rata-rata lama sekolah, dan pengeluaran riil per kapita.</p>' +
    sourceLine() + "</div>" +
    '<div class="card"><h3>Apa itu IPM?</h3><p>IPM mengukur tiga dimensi pembangunan manusia: umur panjang dan hidup sehat (harapan hidup), pengetahuan (harapan dan rata-rata lama sekolah), serta standar hidup layak (pengeluaran riil per kapita yang disesuaikan). Skalanya 0–100; semakin tinggi, semakin baik.</p>' +
    sourceLine() + "</div>"
  );
}

// ---------------- Provinsi ----------------
let provQuery = "";
let provSortKey = "population";
let provSortDir = -1;

function provinceRows() {
  let rows = provinces.slice();
  const q = provQuery.trim().toLowerCase();
  if (q) {
    rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  }
  rows.sort((a, b) => {
    if (provSortKey === "name") {
      return provSortDir * a.name.localeCompare(b.name, "id");
    }
    return provSortDir * (a[provSortKey] - b[provSortKey]);
  });
  return rows;
}

export function renderProvinces() {
  const rows = provinceRows();
  const body = rows.length
    ? rows
        .map(
          (p) =>
            "<tr><td>" + esc(p.name) + "</td>" +
            '<td class="num">' + p.population.toFixed(2) + "</td>" +
            '<td class="num">' + p.share.toFixed(2) + "%</td>" +
            '<td><span class="bar-cell"><span class="bar-track"><span class="bar-fill" style="width:' +
            ((p.population / 50.35) * 100).toFixed(1) + '%"></span></span></span></td></tr>',
        )
        .join("")
    : '<tr><td colspan="4" class="empty-note">Tidak ada provinsi yang cocok dengan pencarian Anda.</td></tr>';

  return (
    "<h1>Penjelajah Provinsi</h1>" +
    '<p class="lede">Sepuluh provinsi dengan penduduk terbanyak, 2024. Cari nama provinsi, atau klik judul kolom untuk mengurutkan tabel.</p>' +
    '<div class="controls">' +
    '<input class="search-input" id="prov-search" type="search" placeholder="Cari provinsi, misalnya Jawa…" value="' + esc(provQuery) + '" aria-label="Cari provinsi">' +
    '<button class="btn primary" type="button" id="prov-csv">Unduh CSV</button>' +
    '<button class="btn" type="button" id="prov-copy">Salin angka</button>' +
    '<span class="copy-msg" id="prov-msg" aria-live="polite"></span>' +
    "</div>" +
    '<div class="table-wrap"><table class="data-table"><thead><tr>' +
    '<th class="sortable" data-sort="name">Provinsi</th>' +
    '<th class="sortable num" data-sort="population">Penduduk (juta jiwa)</th>' +
    '<th class="sortable num" data-sort="share">Pangsa (%)</th>' +
    "<th>Perbandingan</th>" +
    "</tr></thead><tbody>" + body + "</tbody></table></div>" +
    '<p class="source-note"><strong>' + SRC + ".</strong> Menampilkan " + rows.length + " dari 10 provinsi. Pangsa dihitung terhadap penduduk nasional 281,6 juta jiwa.</p>" +
    "<h2>Sepuluh provinsi teratas dalam grafik</h2>" +
    '<div class="chart-wrap"><h3>Penduduk per provinsi, 2024 (juta jiwa)</h3>' +
    hbarChart(
      provinces.map((p) => ({ label: p.name, value: p.population, display: p.population.toFixed(2) })),
      { label: "Penduduk sepuluh provinsi teratas 2024" },
    ) +
    sourceLine() + "</div>"
  );
}

export function bindProvinces(root) {
  const search = root.querySelector("#prov-search");
  if (search) {
    search.addEventListener("input", () => {
      provQuery = search.value;
      renderCurrent();
      const again = document.querySelector("#prov-search");
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    });
  }
  root.querySelectorAll("[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-sort");
      if (provSortKey === key) {
        provSortDir = -provSortDir;
      } else {
        provSortKey = key;
        provSortDir = key === "name" ? 1 : -1;
      }
      renderCurrent();
    });
  });
  const csvBtn = root.querySelector("#prov-csv");
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const lines = ["Provinsi,Penduduk (juta jiwa),Pangsa (%)"];
      provinceRows().forEach((p) => {
        lines.push('"' + p.name + '",' + p.population.toFixed(2) + "," + p.share.toFixed(2));
      });
      lines.push("Sumber,BPS 2024");
      const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "provinsi-indonesia-2024.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      const msg = root.querySelector("#prov-msg");
      if (msg) msg.textContent = "CSV diunduh.";
    });
  }
  const copyBtn = root.querySelector("#prov-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const lines = provinceRows().map(
        (p) => p.name + ": " + p.population.toFixed(2) + " juta jiwa (" + p.share.toFixed(2) + "%)",
      );
      const text = "Penduduk 10 provinsi teratas, 2024 (Sumber: BPS)\n" + lines.join("\n");
      const done = () => {
        const msg = document.querySelector("#prov-msg");
        if (msg) msg.textContent = "Angka disalin.";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    /* clipboard tidak tersedia */
  }
  ta.remove();
  done();
}

// ---------------- Metodologi ----------------
export function renderMethodology() {
  return (
    "<h1>Metodologi &amp; Sumber Data</h1>" +
    '<p class="lede">Setiap angka di situs ini dikutip dari Badan Pusat Statistik (BPS), tahun data 2024, dan dicantumkan sumbernya di samping angka tersebut.</p>' +
    '<div class="card"><h3>Sumber data</h3><p>Seluruh angka pada situs ini berasal dari publikasi Badan Pusat Statistik (BPS) — bps.go.id — tahun data 2024, kecuali dinyatakan lain (misalnya Sensus Penduduk 2020 untuk angka dasar penduduk).</p>' +
    '<p>Situs ini <strong>bukan</strong> situs resmi BPS dan tidak berafiliasi dengan BPS. Untuk data terbaru, rincian menurut provinsi, dan tabel lengkap, silakan merujuk ke publikasi resmi BPS.</p></div>' +
    "<h2>Catatan metodologi</h2>" +
    '<div class="card"><ul>' +
    methodNotes.map((n) => "<li>" + esc(n) + "</li>").join("") +
    "</ul></div>" +
    "<h2>Tentang situs ini</h2>" +
    '<div class="card"><p><strong>Indonesia Pulse</strong> adalah portal statistik nasional Indonesia yang dibuat untuk kompetisi make.fun. Situs ini statis, berjalan tanpa jaringan, dan seluruh grafiknya digambar dari data yang tersimpan di dalam situs.</p>' +
    "<p>Desain, teks, dan grafik di situs ini orisinal. Angka-angkanya dikutip dari BPS dengan sumber dan tahun yang dicantumkan di setiap bagian.</p>" +
    sourceLine() + "</div>"
  );
}

// renderCurrent dipasang oleh main.js agar kontrol bisa me-render ulang.
let renderCurrent = () => {};
export function setRerenderer(fn) {
  renderCurrent = fn;
}
