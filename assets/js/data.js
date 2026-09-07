/* ============================================================
   Baktify POS — F&B UI Template
   data.js — 100% data dummy (statis, tanpa API/backend)
   Semua harga dalam Rupiah (bilangan bulat, tanpa desimal)
   Powered by Baktify Creative Team
   ============================================================ */

const OUTLET = {
  name: "Al Dente Dreams",
  subLabel: "Outlet Venice",
  user: "Diana",
  initials: "AD",
  address: "Jl. Rialto No. 12, Venice",
  phone: "(+62) 812-3456-7890",
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
  { id: 1, name: "Garlic Bread",       ordered: 0, from: "#8C8C8C", to: "#B5B5B5" },
  { id: 2, name: "Matcha Cake",        ordered: 0, from: "#2ED8A0", to: "#4FC3E8" },
  { id: 3, name: "Orange Juice",       ordered: 0, from: "#F5B324", to: "#F1653D" },
  { id: 4, name: "Mozzarella Sticks",  ordered: 0, from: "#FF8FA3", to: "#F1653D" },
];

/* ---------- Daftar Order ----------
   status: "cooking" | "ready" | "waitingPayment" | "paid"
   payment: id metode pembayaran terakhir dipakai */
const ORDERS = [
  { id: "o1", tag: "MM", name: "Matt Murdock", status: "ready", tagColor: "#F1653D", payment: "cash",
    items: [{ name: "Truffle Pasta", qty: 2, price: 48000 }, { name: "Iced Latte", qty: 2, price: 20000 }, { name: "Tiramisu Cup", qty: 1, price: 28000 }] },
  { id: "o2", tag: "NR", name: "Natasha Romanoff", status: "cooking", tagColor: "#2ED8A0", payment: "cash",
    items: [{ name: "Beef Lasagna", qty: 1, price: 56000 }, { name: "Lemon Tea", qty: 2, price: 16000 }] },
  { id: "o3", tag: "TS", name: "Tony Stark", status: "waitingPayment", tagColor: "#F5B324", payment: "card",
    items: [{ name: "Pepperoni Pizza", qty: 2, price: 52000 }, { name: "Quattro Formaggi", qty: 1, price: 56000 }, { name: "Sparkling Water", qty: 3, price: 12000 }] },
  { id: "o4", tag: "SR", name: "Steve Rogers", status: "ready", tagColor: "#6C8DFF", payment: "cash",
    items: [{ name: "Chicken Alfredo", qty: 1, price: 44000 }, { name: "Iced Latte", qty: 1, price: 20000 }] },
  { id: "o5", tag: "WM", name: "Wanda Maximoff", status: "cooking", tagColor: "#B583F5", payment: "qris",
    items: [{ name: "Margherita Pizza", qty: 1, price: 40000 }, { name: "Panna Cotta", qty: 2, price: 24000 }] },
  { id: "o6", tag: "BB", name: "Bruce Banner", status: "ready", tagColor: "#FF8FA3", payment: "cash",
    items: [{ name: "Truffle Pasta", qty: 1, price: 48000 }, { name: "Chocolate Cake", qty: 1, price: 28000 }, { name: "Lemon Tea", qty: 1, price: 16000 }] },
  { id: "o7", tag: "SS", name: "Stephen Strange", status: "waitingPayment", tagColor: "#4FC3E8", payment: "qris",
    items: [{ name: "Quattro Formaggi", qty: 1, price: 56000 }, { name: "Sparkling Water", qty: 2, price: 12000 }] },
  { id: "o8", tag: "PP", name: "Peter Parker", status: "cooking", tagColor: "#F5803D", payment: "cash",
    items: [{ name: "Pepperoni Pizza", qty: 1, price: 52000 }, { name: "Iced Latte", qty: 2, price: 20000 }, { name: "Tiramisu Cup", qty: 2, price: 28000 }] },
];

/* ---------- Customer ---------- */
const CUSTOMERS = [
  { name: "Matt Murdock",     email: "matt.murdock@aldente.com",  added: "12 Jan 2026", from: "#F1653D", to: "#F5803D" },
  { name: "Natasha Romanoff", email: "natasha.r@aldente.com",     added: "03 Feb 2026", from: "#2ED8A0", to: "#4FC3E8" },
  { name: "Tony Stark",       email: "tony.stark@aldente.com",    added: "18 Mar 2026", from: "#F5B324", to: "#F1653D" },
  { name: "Wanda Maximoff",   email: "wanda.m@aldente.com",       added: "02 May 2026", from: "#8C7AE6", to: "#E85D75" },
  { name: "Steve Rogers",     email: "steve.r@aldente.com",       added: "21 Jun 2026", from: "#4FC3E8", to: "#2ED8A0" },
];

/* ---------- Meja ----------
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

/* ---------- Menu (alur buat order baru) ---------- */
const MENU_CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "pasta",   label: "Pasta" },
  { id: "pizza",   label: "Pizza" },
  { id: "drinks",  label: "Drinks" },
  { id: "dessert", label: "Dessert" },
];

const MENU_ITEMS = [
  { id: "m01", name: "Truffle Pasta",    price: 48000, cat: "pasta",   from: "#F1653D", to: "#F5B324" },
  { id: "m02", name: "Beef Lasagna",     price: 56000, cat: "pasta",   from: "#E85D75", to: "#F1653D" },
  { id: "m03", name: "Chicken Alfredo",  price: 44000, cat: "pasta",   from: "#F5B324", to: "#F1653D" },
  { id: "m04", name: "Margherita Pizza", price: 40000, cat: "pizza",   from: "#2ED8A0", to: "#F5B324" },
  { id: "m05", name: "Pepperoni Pizza",  price: 52000, cat: "pizza",   from: "#F1653D", to: "#E85D75" },
  { id: "m06", name: "Quattro Formaggi", price: 56000, cat: "pizza",   from: "#F5B324", to: "#2ED8A0" },
  { id: "m07", name: "Iced Latte",       price: 20000, cat: "drinks",  from: "#4FC3E8", to: "#2ED8A0" },
  { id: "m08", name: "Lemon Tea",        price: 16000, cat: "drinks",  from: "#F5B324", to: "#4FC3E8" },
  { id: "m09", name: "Sparkling Water",  price: 12000, cat: "drinks",  from: "#4FC3E8", to: "#B5B5B5" },
  { id: "m10", name: "Tiramisu Cup",     price: 28000, cat: "dessert", from: "#8C7AE6", to: "#F1653D" },
  { id: "m11", name: "Panna Cotta",      price: 24000, cat: "dessert", from: "#FF8FA3", to: "#8C7AE6" },
  { id: "m12", name: "Chocolate Cake",   price: 28000, cat: "dessert", from: "#B583F5", to: "#F1653D" },
];

/* ---------- Metode pembayaran, pajak & palet tag ---------- */
const PAYMENT_METHODS = [
  { id: "cash", label: "Cash", icon: "banknote" },
  { id: "card", label: "Card", icon: "creditCard" },
  { id: "qris", label: "QRIS", icon: "qr" },
];

const TAX_RATE = 0.1; // Pajak 10%

const TAG_COLORS = ["#F1653D", "#2ED8A0", "#F5B324", "#6C8DFF", "#B583F5", "#FF8FA3", "#4FC3E8"];

/* ---------- Menu More ---------- */
const MORE_MENU = [
  { icon: "store",    tint: "bg-coral-soft", color: "text-coral", title: "Profil Outlet",   desc: "Info nama, alamat & jam operasional" },
  { icon: "settings", tint: "bg-mint-tint",  color: "text-mint",  title: "Pengaturan",      desc: "Preferensi aplikasi & tampilan" },
  { icon: "help",     tint: "bg-amber-tint", color: "text-amber", title: "Bantuan",         desc: "FAQ, panduan & pusat bantuan" },
  { icon: "info",     tint: "bg-[#EBEBEB]",  color: "text-ink2",  title: "Tentang Baktify", desc: "POS F&B Template v1.0" },
];

