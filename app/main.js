// Indonesia Pulse — main.js
// Router hash + init: memetakan hash ke tampilan dan menandai nav aktif.

import {
  renderHome,
  bindHome,
  renderPopulation,
  renderEconomy,
  bindEconomy,
  renderLabour,
  renderDevelopment,
  renderProvinces,
  bindProvinces,
  renderMethodology,
  setRerenderer,
} from "./views.js";

const app = document.getElementById("app");

const routes = {
  "/": { render: renderHome, bind: bindHome, title: "Beranda" },
  "/penduduk": { render: renderPopulation, bind: null, title: "Penduduk" },
  "/ekonomi": { render: renderEconomy, bind: bindEconomy, title: "Ekonomi" },
  "/tenaga-kerja": { render: renderLabour, bind: null, title: "Tenaga Kerja" },
  "/pembangunan": { render: renderDevelopment, bind: null, title: "Pembangunan" },
  "/provinsi": { render: renderProvinces, bind: bindProvinces, title: "Provinsi" },
  "/metodologi": { render: renderMethodology, bind: null, title: "Metodologi" },
};

function currentPath() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1) || "/";
  return routes[path] ? path : "/";
}

function render() {
  const path = currentPath();
  const route = routes[path];
  app.innerHTML = route.render();
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-nav") === path);
  });
  document.title =
    "Indonesia Pulse — " + route.title + " · Statistik Indonesia 2024";
  if (route.bind) route.bind(app);
  window.scrollTo(0, 0);
}

setRerenderer(render);
window.addEventListener("hashchange", render);
render();
