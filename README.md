# Baktify POS — F&B UI Template

**Powered by Baktify Creative Team** • v1.0 • 100% static / dummy data

Template UI website POS (Point of Sale) untuk kategori Food & Beverage — mobile-first, tanpa framework, tanpa build step. Cocok sebagai starter template, portofolio desain, dan **siap dijadikan template komunitas Google Apps Script**.

Referensi: `PRD-POS-FnB-Baktify.md` & `baktify-pos-design-system.json`.

---

## 📁 Struktur File

| File | Fungsi |
|---|---|
| `index.html` | App shell: konfigurasi Tailwind (design tokens), 5 screen, bottom navigation + FAB |
| `style.css` | CSS custom kecil (backdrop desktop, hide scrollbar, tap highlight) |
| `app.js` | Logika SPA vanilla JS: switching tab, filter pill, render list, ikon SVG |
| `data.js` | Seluruh dummy data (outlet, orders, customers, dishes, tables, menu More) |

## 🚀 Cara Menjalankan

Buka `index.html` langsung di browser (double-click), atau gunakan Live Server di VS Code. Tidak ada `npm install`, tidak ada build — hanya butuh koneksi internet untuk CDN Tailwind & Google Fonts.

## 🧱 Stack & Keputusan Desain

1. **Tailwind CSS via Play CDN** — satu-satunya cara memakai Tailwind tanpa build step. Cocok untuk Google Apps Script (tidak ada Node/webpack).
2. **Vanilla JS** — SPA sederhana (show/hide section), tanpa React/Vue/jQuery.
3. **Ikon inline SVG** gaya line-icon (stroke 1.8px, rounded caps) — tanpa icon font/library.
4. **Gambar dummy berupa SVG gradient inline** — self-contained, tidak bergantung CDN gambar eksternal.
5. **Desktop = "centered app frame"** (PRD 7.1.1): konten dibatasi `max-w-[430px]` di tengah layar dengan backdrop netral, menjaga rasio desain mobile original.

## 🎨 Design Tokens (dari design system JSON)

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

## 📱 Halaman & Alur

1. **Home/Dashboard** — greeting, stat card coral ($580), 2 stat card putih, carousel Popular Dishes & Out of Stock.
2. **Orders** — filter pill (In Progress / Waiting for Payment) yang benar-benar memfilter dummy data, search, 8 order card.
3. **Select Customer** — dibuka via **FAB tengah** (alur "tambah order baru", PRD section 8), 5 customer card, tombol kembali.
4. **Table** — grid 9 meja dengan badge Kosong/Terisi/Reserved.
5. **More** — list menu + branding "Powered by Baktify Creative Team".

Navigasi antar 5 tab berjalan **tanpa reload halaman** (SPA behavior). Semua interaksi (filter/search) hanya mengubah state lokal — refresh mengembalikan data awal.

## 📋 Porting ke Google Apps Script

1. Di Apps Script editor, buat file HTML: `Index.html` (salin isi `index.html`, hapus baris `<script src="...">` & `<link rel="stylesheet" href="style.css">`), `Styles.html`, `JavaScript.html` (isi `app.js`), `Data.html` (isi `data.js`).
2. Gabungkan dengan scriptlet: `<?!= include('Styles'); ?>`, `<?!= include('Data'); ?>`, `<?!= include('JavaScript'); ?>`.
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
4. Deploy → New deployment → Web app. Catatan: CDN Tailwind & Google Fonts tetap dimuat via internet.

## ⚠️ Catatan

- Play CDN Tailwind tidak direkomendasikan untuk aplikasi produksi berskala besar, namun ideal untuk template komunitas tanpa build step.
- Seluruh data bersifat dummy/statis sesuai scope PRD v1.0 — tidak ada backend, autentikasi, atau transaksi nyata.
