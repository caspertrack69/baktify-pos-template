/* ============================================================
   Baktify POS — F&B UI Template
   app.js — SPA vanilla JavaScript (tanpa framework)
   Powered by Baktify Creative Team
   ============================================================ */
"use strict";

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Ikon line-style (rounded caps, stroke 1.8px) ---------- */
const svgIcon = (paths, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  check: `<path d="M20 6 9 17l-5-5"/>`,
  clock: `<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5"/>`,
  hourglass: `<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17c0 .53.21 1.04.59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>`,
  phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/>`,
  message: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`,
  chevronRight: `<path d="m9 18 6-6-6-6"/>`,
  store: `<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>`,
  settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
  help: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
  info: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
};

/* ---------- Aset gambar dummy (SVG inline, self-contained) ---------- */

/* Placeholder gambar menu: gradient + ilustrasi piring line-art */
function dishImage(d, gid) {
  return `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${d.from}"/><stop offset="1" stop-color="${d.to}"/>
    </linearGradient></defs>
    <rect width="128" height="128" fill="url(#${gid})"/>
    <circle cx="100" cy="28" r="26" fill="rgba(255,255,255,0.16)"/>
    <circle cx="26" cy="104" r="34" fill="rgba(255,255,255,0.12)"/>
    <g stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.9">
      <circle cx="64" cy="64" r="20"/><circle cx="64" cy="64" r="8"/>
      <path d="M64 36v-6M64 98v-6M36 64h-6M98 64h-6"/>
    </g>
  </svg>`;
}

/* Avatar customer: lingkaran gradient + inisial */
function avatarSvg(name, from, to, size = 44) {
  const initials = name.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("").toUpperCase();
  const gid = "av-" + name.replace(/\W+/g, "-").toLowerCase();
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient></defs>
    <rect width="${size}" height="${size}" rx="${size / 2}" fill="url(#${gid})"/>
    <text x="50%" y="50%" dy="0.36em" text-anchor="middle" font-family="Poppins, sans-serif" font-size="${Math.round(size * 0.34)}" font-weight="600" fill="#FFFFFF">${initials}</text>
  </svg>`;
}

/* ---------- Header global (avatar outlet + search & notifikasi) ---------- */
function renderAppHeader() {
  $$(".app-header").forEach((el) => {
    el.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-full p-[3px] bg-gradient-to-br from-coral to-amber shadow-chip shrink-0">
          <div class="w-full h-full rounded-full bg-surface grid place-items-center text-[14px] font-bold text-coral">${OUTLET.initials}</div>
        </div>
        <div>
          <p class="text-[15px] font-semibold leading-tight">${OUTLET.name}</p>
          <p class="text-[12px] text-ink2 leading-tight">${OUTLET.subLabel}</p>
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <button type="button" class="icon-btn" aria-label="Cari">${svgIcon(ICONS.search, 19)}</button>
        <button type="button" class="icon-btn relative" aria-label="Notifikasi">
          ${svgIcon(ICONS.bell, 19)}
          <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-coral"></span>
        </button>
      </div>`;
  });
}

/* ---------- Carousel: Popular Dishes & Out of Stock ---------- */
function renderDishes(list, containerId, gidPrefix) {
  $("#" + containerId).innerHTML = list
    .map(
      (d, i) => `
      <article class="shrink-0 w-[128px]">
        <div class="relative w-[128px] h-[128px] rounded-r16 overflow-hidden">
          ${dishImage(d, gidPrefix + "-" + d.id)}
          <span class="absolute top-2 left-2 w-6 h-6 rounded-full bg-surface text-coral text-[11px] font-bold grid place-items-center shadow-chip">${i + 1}</span>
        </div>
        <h3 class="mt-2 text-[13px] font-semibold truncate">${d.name}</h3>
        <p class="text-[11px] text-ink3">${d.ordered}x ordered</p>
      </article>`
    )
    .join("");
}

/* ---------- Status order (badge + caption) ---------- */
const ORDER_STATUS = {
  ready:          { badge: "badge-success", icon: "check",     label: "Ready",       caption: "Ready to serve" },
  cooking:        { badge: "badge-progress", icon: "clock",    label: "In Progress", caption: "Cooking Now" },
  waitingPayment: { badge: "badge-warning",  icon: "hourglass", label: "Waiting",     caption: "Awaiting Payment" },
};

/* ---------- Orders List ---------- */
function renderOrders(filter = "inProgress", query = "") {
  const q = query.trim().toLowerCase();
  const list = ORDERS.filter(
    (o) =>
      (filter === "waitingPayment" ? o.status === "waitingPayment" : o.status !== "waitingPayment") &&
      o.name.toLowerCase().includes(q)
  );
  $("#orderList").innerHTML = list.length
    ? list
        .map((o) => {
          const s = ORDER_STATUS[o.status];
          return `
      <article class="bg-surface rounded-r16 shadow-card p-4 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-11 h-11 rounded-r8 shrink-0 grid place-items-center text-white text-[13px] font-bold" style="background:${o.tagColor}">${o.tag}</div>
          <div class="min-w-0">
            <h3 class="text-[15px] font-semibold truncate">${o.name}</h3>
            <p class="text-[12px] text-ink2">${o.items} Items</p>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 shrink-0">
          <span class="badge ${s.badge}">${svgIcon(ICONS[s.icon], 12)}${s.label}</span>
          <p class="text-[11px] text-ink3">${s.caption}</p>
        </div>
      </article>`;
        })
        .join("")
    : `<div class="bg-surface rounded-r16 shadow-card p-6 text-center text-[13px] text-ink2">Tidak ada order yang cocok.</div>`;
}

/* ---------- Select Customer ---------- */
function renderCustomers(query = "") {
  const q = query.trim().toLowerCase();
  const list = CUSTOMERS.filter(
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
  $("#customerList").innerHTML = list.length
    ? list
        .map(
          (c) => `
      <article class="bg-surface rounded-r20 shadow-card p-4">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            ${avatarSvg(c.name, c.from, c.to, 44)}
            <div class="min-w-0">
              <h3 class="text-[15px] font-semibold truncate">${c.name}</h3>
              <p class="text-[12px] text-ink2 truncate">${c.email}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" class="w-9 h-9 rounded-full bg-coral-soft text-coral grid place-items-center" aria-label="Telepon ${c.name}">${svgIcon(ICONS.phone, 16)}</button>
            <button type="button" class="w-9 h-9 rounded-full bg-mint-tint text-mint grid place-items-center" aria-label="Pesan ${c.name}">${svgIcon(ICONS.message, 16)}</button>
          </div>
        </div>
        <div class="h-px bg-line my-3.5"></div>
        <div class="flex justify-between gap-4">
          <div class="min-w-0">
            <p class="text-[11px] font-medium text-ink3">Email address</p>
            <p class="text-[13px] font-medium truncate">${c.email}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[11px] font-medium text-ink3">Date Added</p>
            <p class="text-[13px] font-medium">${c.added}</p>
          </div>
        </div>
      </article>`
        )
        .join("")
    : `<div class="bg-surface rounded-r16 shadow-card p-6 text-center text-[13px] text-ink2">Customer tidak ditemukan.</div>`;
}

/* ---------- Table Management ---------- */
const TABLE_STATUS = {
  empty:    { badge: "badge-success", icon: "check",     label: "Kosong" },
  occupied: { badge: "badge-progress", icon: "clock",    label: "Terisi" },
  reserved: { badge: "badge-warning",  icon: "hourglass", label: "Reserved" },
};

function renderTables() {
  $("#tableGrid").innerHTML = TABLES.map((t) => {
    const s = TABLE_STATUS[t.status];
    return `
    <article class="bg-surface rounded-r16 shadow-card p-4">
      <div class="flex items-center justify-between">
        <div class="w-10 h-10 rounded-r8 bg-canvas text-ink2 text-[13px] font-bold grid place-items-center">${t.num}</div>
        <span class="badge ${s.badge}">${svgIcon(ICONS[s.icon], 12)}${s.label}</span>
      </div>
      <h3 class="mt-3 text-[15px] font-semibold">${t.name}</h3>
      <p class="text-[12px] text-ink2 mt-0.5">${t.seats} seats</p>
    </article>`;
  }).join("");
}

/* ---------- More Menu ---------- */
function renderMore() {
  $("#moreList").innerHTML = MORE_MENU.map(
    (m) => `
    <button type="button" class="w-full bg-surface rounded-r16 shadow-card p-4 flex items-center gap-3.5 text-left cursor-pointer transition active:scale-[0.98]">
      <span class="w-11 h-11 rounded-full ${m.tint} ${m.color} grid place-items-center shrink-0">${svgIcon(ICONS[m.icon], 20)}</span>
      <span class="min-w-0 flex-1">
        <span class="block text-[15px] font-semibold truncate">${m.title}</span>
        <span class="block text-[12px] text-ink2 truncate">${m.desc}</span>
      </span>
      <span class="text-ink3 shrink-0">${svgIcon(ICONS.chevronRight, 18)}</span>
    </button>`
  ).join("");
}

/* ---------- Navigasi SPA (tanpa reload halaman) ---------- */
function showScreen(name) {
  $$(".screen").forEach((s) => s.classList.add("hidden"));
  const target = $("#screen-" + name);
  if (target) target.classList.remove("hidden");
  $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
  window.scrollTo(0, 0);
}

function activeFilter() {
  const el = $("#orderFilters .filter-pill.active");
  return el ? el.dataset.filter : "inProgress";
}

/* ---------- Init ---------- */
function init() {
  renderAppHeader();
  renderDishes(POPULAR_DISHES, "popularList", "pop");
  renderDishes(OUT_OF_STOCK, "outOfStockList", "oos");
  renderOrders();
  renderCustomers();
  renderTables();
  renderMore();
  showScreen("home");

  /* Navigasi bottom bar */
  $$(".nav-item").forEach((b) => b.addEventListener("click", () => showScreen(b.dataset.nav)));

  /* FAB tengah: alur tambah order baru -> Select Customer (PRD section 8) */
  $("#fabBtn").addEventListener("click", () => showScreen("customer"));
  $("#backBtn").addEventListener("click", () => showScreen("orders"));

  /* Filter pill Orders: toggle state aktif + filter data dummy */
  $$("#orderFilters .filter-pill").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$("#orderFilters .filter-pill").forEach((b) => b.classList.toggle("active", b === btn));
      renderOrders(activeFilter(), $("#orderSearch").value);
    })
  );

  /* Search (state lokal saja, tidak menyimpan permanen) */
  $("#orderSearch").addEventListener("input", (e) => renderOrders(activeFilter(), e.target.value));
  $("#customerSearch").addEventListener("input", (e) => renderCustomers(e.target.value));

  /* "View all": scroll carousel ke ujung (versi statis) */
  $$(".view-all").forEach((b) =>
    b.addEventListener("click", () => {
      const list = $("#" + b.dataset.target);
      if (list) list.scrollBy({ left: list.scrollWidth, behavior: "smooth" });
    })
  );
}

document.addEventListener("DOMContentLoaded", init);
