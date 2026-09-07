/* ============================================================
   Baktify POS — F&B UI Template
   ui.js — helper umum, ikon, dan aset gambar
   Powered by Baktify Creative Team
   ============================================================ */
"use strict";

/* ---------- Helper DOM & format ---------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Escape karakter HTML sebelum disisipkan via innerHTML */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Format mata uang Rupiah, contoh: Rp 48.000 */
const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const money = (n) => idr.format(n);

const orderTotal = (items) => items.reduce((sum, it) => sum + it.price * it.qty, 0);
const orderQty = (items) => items.reduce((sum, it) => sum + it.qty, 0);
const initialsOf = (name) => name.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("").toUpperCase();

/* ---------- Placeholder gambar ----------
   Default: placehold.net (tidat mendukung warna/teks kustom).
   Ganti konstanta ini bila ingin layanan lain, contoh:
   https://placehold.co/400x400/F1653D/FFFFFF.png?text= */
const PLACEHOLDER_IMAGE = "https://placehold.net/400x400.png";

const productImg = (name, cls = "") =>
  `<img src="${PLACEHOLDER_IMAGE}" alt="${esc(name)}" loading="lazy" class="object-cover ${cls}" />`;

/* Avatar inisial berwarna (gradient dari data dummy) */
const avatarEl = (name, from, to, size = 44) => {
  const fs = Math.round(size * 0.34);
  return `<span class="inline-grid place-items-center rounded-full text-white font-semibold shrink-0 select-none" style="width:${size}px;height:${size}px;font-size:${fs}px;background:linear-gradient(135deg,${from},${to})">${esc(initialsOf(name))}</span>`;
};

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
  chevronDown: `<path d="m6 9 6 6 6-6"/>`,
  plus: `<path d="M12 5v14M5 12h14"/>`,
  minus: `<path d="M5 12h14"/>`,
  user: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  receipt: `<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>`,
  printer: `<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>`,
  banknote: `<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>`,
  creditCard: `<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`,
  qr: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v.01M14 21v.01M17 17l4 4M21 21h.01"/>`,
  store: `<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>`,
  settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
  help: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
  info: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
};
