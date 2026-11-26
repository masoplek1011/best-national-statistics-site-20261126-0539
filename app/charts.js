// Indonesia Pulse — charts.js
// Fungsi gambar grafik SVG murni dari data.js. Tidak ada gambar statis,
// tidak ada pustaka eksternal: semua grafik digambar oleh fungsi di sini.

const NAVY = "#0b2a4a";
const TEAL = "#0e7c7b";
const AMBER = "#f2a900";
const GRID = "#d9e2ea";
const MUTED = "#5a6b7c";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const ticks = [];
  for (let i = 0; i <= count; i += 1) {
    ticks.push(min + step * i);
  }
  return ticks;
}

// Grafik garis tren: points = [{label, value}], dengan sumbu Y berlabel.
export function lineChart(points, opts) {
  const width = 720;
  const height = 300;
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 38;
  const values = points.map((p) => p.value);
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  const pad = (max - min) * 0.25 || 1;
  min -= pad;
  max += pad;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xAt = (i) => padL + (innerW * i) / (points.length - 1);
  const yAt = (v) => padT + innerH * (1 - (v - min) / (max - min));
  const ticks = niceTicks(min, max, 4);

  let grid = "";
  ticks.forEach((t) => {
    const y = yAt(t);
    grid += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="' + MUTED + '">' + t.toFixed(2).replace(/\.?0+$/, "") + "</text>";
  });

  const line = points.map((p, i) => (i === 0 ? "M" : "L") + xAt(i).toFixed(1) + " " + yAt(p.value).toFixed(1)).join(" ");
  let dots = "";
  points.forEach((p, i) => {
    dots += '<circle cx="' + xAt(i).toFixed(1) + '" cy="' + yAt(p.value).toFixed(1) + '" r="5" fill="' + TEAL + '" stroke="#fff" stroke-width="2"/>';
    dots += '<text x="' + xAt(i).toFixed(1) + '" y="' + (yAt(p.value) - 12).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + NAVY + '">' + p.value.toFixed(2).replace(/\.?0+$/, "") + "%</text>";
    dots += '<text x="' + xAt(i).toFixed(1) + '" y="' + (height - 12) + '" text-anchor="middle" font-size="12" fill="' + MUTED + '">' + esc(p.label) + "</text>";
  });

  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(opts.label || "Grafik garis") + '">' +
    grid +
    '<path d="' + line + '" fill="none" stroke="' + TEAL + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots +
    "</svg>"
  );
}

// Grafik batang vertikal: items = [{label, value, display}]
export function barChart(items, opts) {
  const width = 720;
  const height = 320;
  const padL = 52;
  const padR = 16;
  const padT = 24;
  const padB = 44;
  const max = Math.max.apply(null, items.map((d) => d.value)) * 1.15;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const slot = innerW / items.length;
  const barW = Math.min(64, slot * 0.6);
  const ticks = niceTicks(0, max, 4);

  let grid = "";
  ticks.forEach((t) => {
    const y = padT + innerH * (1 - t / max);
    grid += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="' + MUTED + '">' + Math.round(t) + "</text>";
  });

  let bars = "";
  items.forEach((d, i) => {
    const cx = padL + slot * i + slot / 2;
    const h = innerH * (d.value / max);
    const y = padT + innerH - h;
    bars += '<rect x="' + (cx - barW / 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW + '" height="' + h.toFixed(1) + '" rx="4" fill="' + (i % 2 === 0 ? TEAL : NAVY) + '"/>';
    bars += '<text x="' + cx.toFixed(1) + '" y="' + (y - 8).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + NAVY + '">' + esc(d.display) + "</text>";
    bars += '<text x="' + cx.toFixed(1) + '" y="' + (height - 14) + '" text-anchor="middle" font-size="11.5" fill="' + MUTED + '">' + esc(d.label) + "</text>";
  });

  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(opts.label || "Grafik batang") + '">' +
    grid + bars +
    "</svg>"
  );
}

// Grafik batang horizontal untuk provinsi.
export function hbarChart(items, opts) {
  const rowH = 34;
  const width = 720;
  const height = 30 + items.length * rowH + 16;
  const padL = 150;
  const padR = 70;
  const max = Math.max.apply(null, items.map((d) => d.value)) * 1.08;
  const innerW = width - padL - padR;

  let rows = "";
  items.forEach((d, i) => {
    const y = 30 + i * rowH;
    const w = innerW * (d.value / max);
    rows += '<text x="' + (padL - 10) + '" y="' + (y + 15) + '" text-anchor="end" font-size="13" fill="' + NAVY + '">' + esc(d.label) + "</text>";
    rows += '<rect x="' + padL + '" y="' + (y + 4) + '" width="' + w.toFixed(1) + '" height="18" rx="4" fill="' + (i < 3 ? AMBER : TEAL) + '"/>';
    rows += '<text x="' + (padL + w + 8).toFixed(1) + '" y="' + (y + 18) + '" font-size="13" font-weight="700" fill="' + NAVY + '">' + esc(d.display) + "</text>";
  });

  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(opts.label || "Grafik batang horizontal") + '">' +
    rows +
    "</svg>"
  );
}

// Donat sederhana: segments = [{label, value, color}]
export function donutChart(segments, opts) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 95;
  const total = segments.reduce((s, d) => s + d.value, 0);
  let offset = -90;
  let arcs = "";
  segments.forEach((d) => {
    const frac = d.value / total;
    const a0 = (offset * Math.PI) / 180;
    const a1 = ((offset + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    arcs += '<path d="M ' + cx + " " + cy + " L " + x0.toFixed(1) + " " + y0.toFixed(1) +
      " A " + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) + ' Z" fill="' + d.color + '"/>';
    offset += frac * 360;
  });
  arcs += '<circle cx="' + cx + '" cy="' + cy + '" r="58" fill="#fff"/>';
  arcs += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="26" font-weight="800" fill="' + NAVY + '">' + esc(opts.center || "") + "</text>";
  arcs += '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="12" fill="' + MUTED + '">' + esc(opts.centerLabel || "") + "</text>";

  let legend = "";
  segments.forEach((d) => {
    legend += '<span style="display:inline-block;margin:4px 14px 4px 0;font-size:0.92rem;">' +
      '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:' + d.color + ';margin-right:6px;"></span>' +
      esc(d.label) + " — <strong>" + d.value + "%</strong></span>";
  });

  return (
    '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">' +
    '<svg viewBox="0 0 ' + size + " " + size + '" width="' + size + '" height="' + size + '" role="img" aria-label="' + esc(opts.label || "Grafik donat") + '">' + arcs + "</svg>" +
    '<div style="flex:1;min-width:220px;">' + legend + "</div></div>"
  );
}
