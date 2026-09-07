# Baktify POS — F&B UI Template

**Powered by Baktify Creative Team** • v1.0 • 100% static / dummy data

Template UI website POS (Point of Sale) untuk kategori Food & Beverage — mobile-first, tanpa framework, tanpa build step. Dilengkapi alur transaksi front-end lengkap (buat order, checkout, update status order) menggunakan data dummy. Cocok sebagai starter template, portofolio desain, dan **siap dijadikan template komunitas Google Apps Script**.

Referensi: `PRD-POS-FnB-Baktify.md` & `baktify-pos-design-system.json`.

---

## Struktur File

```
index.html              App shell: konfigurasi Tailwind (design tokens), 8 screen, bottom nav + FAB
assets/
  css/main.css          CSS global (backdrop desktop, scrollbar, gaya cetak struk)
  js/data.js            Seluruh data dummy (outlet, order, customer, menu, meja, pembayaran)
  js/ui.js              Helper umum, format Rupiah, ikon SVG, placeholder gambar
  js/views.js           Fungsi render per layar (baca state, tulis ke DOM)
  js/app.js             State terpusat, navigasi SPA, actions, init
```

Urutan muat script: `data.js` → `ui.js` → `views.js` → `app.js`.

## Cara Menjalankan

Buka `index.html` langsung di browser (double-click), atau gunakan Live Server di VS Code. Tidak ada `npm install`, tidak ada build — hanya butuh koneksi internet untuk CDN Tailwind & Google Fonts.

## Stack & Keputusan Desain

1. **Tailwind CSS via Play CDN** — satu-satunya cara memakai Tailwind tanpa build step. Cocok untuk Google Apps Script (tidak ada Node/webpack).
2. **Vanilla JS** — SPA sederhana (show/hide section), tanpa React/Vue/jQuery.
3. **Ikon inline SVG** gaya line-icon (stroke 1.8px, rounded caps) — tanpa icon font/library.
4. **Gambar produk memakai layanan placeholder** `placehold.net` (default `https://placehold.net/400x400.png`). Sumbernya satu konstanta `PLACEHOLDER_IMAGE` di `assets/js/ui.js` — ganti satu baris untuk berpindah layanan, mis. `https://placehold.co/400x400/F1653D/FFFFFF.png?text=` bila butuh placeholder berwarna/berlabel (placehold.net tidak mendukung warna/teks kustom).
5. **Mata uang Rupiah** — diformat via `Intl.NumberFormat("id-ID")` (contoh: `Rp 48.000`); seluruh harga di `data.js` berupa bilangan bulat Rupiah.
6. **Cetak struk** — tombol "Cetak Struk" di Order Detail membuka pratinjau struk (gaya struk thermal: header outlet, rincian item, pajak, total, metode bayar) lalu `window.print()`; CSS `@media print` memastikan hanya struk yang tercetak pada lebar 80mm.
7. **Desktop = "centered app frame"** (PRD 7.1.1): konten dibatasi `max-w-[430px]` di tengah layar dengan backdrop netral, menjaga rasio desain mobile original.

## Design Tokens (dari design system JSON)

| Token | Nilai | Class Tailwind |
|---|---|---|
| Primary coral | `#F1653D` | `coral` / `bg-coral`, `text-coral` |
| Soft peach | `#FDEDE8` | `coral-soft` |
| Mint green | `#2ED8A0` (tint `#E4FBF3`) | `mint` / `mint-tint` |
| Amber | `#F5B324` (tint `#FDF3DD`) | `amber` / `amber-tint` |
| Background | `#F4F4F4` | `canvas` |
| Surface card | `#FFFFFF` | `surface` |
| Teks | `#1A1A1A` / `#8C8C8C` / `#B5B5B5` | `ink` / `ink2` / `ink3` |
| Radius | 8 / 16 / 20 / 999px | `rounded-r8` `rounded-r16` `rounded-r20` `rounded-full` |
| Shadow card | `0 4px 12px rgba(0,0,0,0.05)` | `shadow-card` |
| Shadow FAB | `0 6px 16px rgba(241,101,61,0.35)` | `shadow-fab` |
| Font | Poppins (rounded geometric sans) | `font-sans` |

Komponen reusable didefinisikan di blok `<style type="text/tailwindcss">` dalam `index.html`: `.app-header`, `.icon-btn`, `.search-bar`, `.filter-pill`, `.badge` (+ `.badge-success/-progress/-warning`), `.nav-item`, `.trend-up/-down`.

## Halaman & Alur

1. **Home/Dashboard** — greeting, stat card coral (earnings), 2 stat card putih, carousel Popular Dishes & Out of Stock. Angka statistik diturunkan dari data order (bukan hardcode).
2. **Orders** — filter pill (In Progress / Waiting for Payment) yang benar-benar memfilter data, search, 8 order card. Tap card untuk membuka Order Detail.
3. **Select Customer** — dibuka via FAB tengah; pilih customer untuk memulai order baru.
4. **New Order** — pilih kategori menu, search menu, tambah/kurang item (stepper qty), cart bar mengambang menampilkan jumlah & total.
5. **Checkout** — ringkasan item, subtotal + pajak 10%, pilih meja kosong (opsional, meja otomatis jadi Terisi), metode pembayaran (Cash/Card/QRIS), Place Order.
6. **Order Detail** — rincian item, subtotal, pajak, total, aksi sesuai status (Mark as Ready, Complete Order, Mark as Paid — earnings bertambah saat dibayar), dan tombol **Cetak Struk**.
7. **Table** — grid 9 meja dengan badge Kosong/Terisi/Reserved.
8. **More** — list menu + branding "Powered by Baktify Creative Team".

Alur transaksi lengkap: **FAB → pilih customer → pilih menu → checkout → Place Order → order masuk ke In Progress (Cooking Now) → Ready → Complete Order → Mark as Paid**. Semua hanya mengubah state lokal di sesi berjalan — refresh mengembalikan data awal.

Navigasi antar tab berjalan **tanpa reload halaman** (SPA behavior).

## Arsitektur Kode

- **`assets/js/data.js`** — seluruh konstanta dummy: outlet, orders (rincian item + metode bayar), customers, menu, meja, pajak, palet tag.
- **`assets/js/ui.js`** — helper murni tanpa state: `esc()` (escape HTML), `money()` (Rupiah), `orderTotal()`/`orderQty()`, `svgIcon()` + kumpulan `ICONS`, `productImg()` (placeholder), `avatarEl()`.
- **`assets/js/views.js`** — fungsi render murni per layar + potongan bersama (`itemRows()`, `totalsRows()`, `card()`) agar tidak ada duplikasi markup antar Order Detail, Checkout, dan Struk.
- **`assets/js/app.js`** — `state` terpusat (satu-satunya sumber kebenaran; deep-copy dari data.js), navigasi `showScreen`/`showRoute`, objek `ACTIONS` untuk event delegation (satu listener klik global; menambah aksi = menambah satu entri), dan `init()`.
- Tetap tanpa dependensi & tanpa build step — mudah dibaca, dimodifikasi, dan di-porting ke Google Apps Script.

## Porting ke Google Apps Script

1. Di Apps Script editor, buat file HTML: `Index.html` (salin isi `index.html`, hapus baris `<script src="...">` & `<link rel="stylesheet" ...>`), `Styles.html` (isi `assets/css/main.css`), `Data.html` (isi `assets/js/data.js`), `Ui.html` (isi `assets/js/ui.js`), `Views.html` (isi `assets/js/views.js`), `App.html` (isi `assets/js/app.js`).
2. Gabungkan di `Index.html` dengan scriptlet sesuai urutan:
   ```
   <?!= include('Styles'); ?>
   <?!= include('Data'); ?>
   <?!= include('Ui'); ?>
   <?!= include('Views'); ?>
   <?!= include('App'); ?>
   ```
3. Buat `Code.gs`:
   ```gas
   function doGet() {
     return HtmlService.createHtmlOutputFromFile('Index')
       .setTitle('Baktify POS — F&B UI Template')
       .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
   }
   function include(name) {
     return HtmlService.createHtmlOutputFromFile(name).getContent();
   }
   ```
4. Deploy → New deployment → Web app. Catatan: CDN Tailwind, Google Fonts, dan placehold.net tetap dimuat via internet.

## Catatan

- Play CDN Tailwind tidak direkomendasikan untuk aplikasi produksi berskala besar, namun ideal untuk template komunitas tanpa build step.
- Seluruh data bersifat dummy/statis sesuai scope PRD v1.0 — tidak ada backend, autentikasi, atau transaksi nyata.

