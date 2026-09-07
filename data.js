/* ============================================================
   Baktify POS — F&B UI Template
   data.js — 100% Dummy Data (statis, tanpa API/backend)
   Powered by Baktify Creative Team
   ============================================================ */

const OUTLET = {
  name: "Al Dente Dreams",
  subLabel: "Outlet Venice",
  user: "Diana",
  initials: "AD",
};

/* ---------- Home / Dashboard ---------- */
const POPULAR_DISHES = [
  { id: 1, name: "Truffle Pasta",     ordered: 128, from: "#F1653D", to: "#F5B324" },
  { id: 2, name: "Beef Lasagna",      ordered: 96,  from: "#E85D75", to: "#F1653D" },
  { id: 3, name: "Margherita Pizza",  ordered: 87,  from: "#2ED8A0", to: "#F5B324" },
  { id: 4, name: "Chicken Alfredo",   ordered: 64,  from: "#F5B324", to: "#F1653D" },
  { id: 5, name: "Tiramisu Cup",      ordered: 52,  from: "#8C7AE6", to: "#F1653D" },
  { id: 6, name: "Iced Latte",        ordered: 47,  from: "#4FC3E8", to: "#2ED8A0" },
];

const OUT_OF_STOCK = [
  { id: 1, name: "Garlic Bread",        ordered: 0, from: "#8C8C8C", to: "#B5B5B5" },
  { id: 2, name: "Matcha Cake",         ordered: 0, from: "#2ED8A0", to: "#4FC3E8" },
  { id: 3, name: "Orange Juice",        ordered: 0, from: "#F5B324", to: "#F1653D" },
  { id: 4, name: "Mozzarella Sticks",   ordered: 0, from: "#FF8FA3", to: "#F1653D" },
];

/* ---------- Orders List ----------
   status: "ready" | "cooking" | "waitingPayment" */
const ORDERS = [
  { tag: "MM", name: "Matt Murdock",    items: 8,  status: "ready",          tagColor: "#F1653D" },
  { tag: "NR", name: "Natasha Romanoff",items: 3,  status: "cooking",        tagColor: "#2ED8A0" },
  { tag: "TS", name: "Tony Stark",      items: 12, status: "waitingPayment", tagColor: "#F5B324" },
  { tag: "SR", name: "Steve Rogers",    items: 2,  status: "ready",          tagColor: "#6C8DFF" },
  { tag: "WM", name: "Wanda Maximoff",  items: 5,  status: "cooking",        tagColor: "#B583F5" },
  { tag: "BB", name: "Bruce Banner",    items: 6,  status: "ready",          tagColor: "#FF8FA3" },
  { tag: "SS", name: "Stephen Strange", items: 4,  status: "waitingPayment", tagColor: "#4FC3E8" },
  { tag: "PP", name: "Peter Parker",    items: 9,  status: "cooking",        tagColor: "#F5803D" },
];

/* ---------- Select Customer ---------- */
const CUSTOMERS = [
  { name: "Matt Murdock",     email: "matt.murdock@aldente.com",  added: "12 Jan 2026", from: "#F1653D", to: "#F5803D" },
  { name: "Natasha Romanoff", email: "natasha.r@aldente.com",     added: "03 Feb 2026", from: "#2ED8A0", to: "#4FC3E8" },
  { name: "Tony Stark",       email: "tony.stark@aldente.com",    added: "18 Mar 2026", from: "#F5B324", to: "#F1653D" },
  { name: "Wanda Maximoff",   email: "wanda.m@aldente.com",       added: "02 May 2026", from: "#8C7AE6", to: "#E85D75" },
  { name: "Steve Rogers",     email: "steve.r@aldente.com",       added: "21 Jun 2026", from: "#4FC3E8", to: "#2ED8A0" },
];

/* ---------- Table Management ----------
   status: "empty" (Kosong) | "occupied" (Terisi) | "reserved" (Reserved) */
const TABLES = [
  { num: "01",  name: "Table 1",  seats: 4,  status: "occupied" },
  { num: "02",  name: "Table 2",  seats: 2,  status: "empty" },
  { num: "03",  name: "Table 3",  seats: 6,  status: "reserved" },
  { num: "04",  name: "Table 4",  seats: 4,  status: "empty" },
  { num: "05",  name: "Table 5",  seats: 2,  status: "occupied" },
  { num: "06",  name: "Table 6",  seats: 8,  status: "empty" },
  { num: "07",  name: "Table 7",  seats: 4,  status: "reserved" },
  { num: "08",  name: "Table 8",  seats: 2,  status: "occupied" },
  { num: "VIP", name: "VIP Room", seats: 10, status: "reserved" },
];

/* ---------- More Menu ---------- */
const MORE_MENU = [
  { icon: "store",    tint: "bg-coral-soft", color: "text-coral", title: "Profil Outlet",  desc: "Info nama, alamat & jam operasional" },
  { icon: "settings", tint: "bg-mint-tint",  color: "text-mint",  title: "Pengaturan",     desc: "Preferensi aplikasi & tampilan" },
  { icon: "help",     tint: "bg-amber-tint", color: "text-amber", title: "Bantuan",        desc: "FAQ, panduan & pusat bantuan" },
  { icon: "info",     tint: "bg-[#EBEBEB]",  color: "text-ink2",  title: "Tentang Baktify", desc: "POS F&B Template v1.0" },
];
