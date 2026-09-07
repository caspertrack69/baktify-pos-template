/* ============================================================
   Baktify POS — F&B UI Template
   views.js — seluruh fungsi render (baca state, tulis ke DOM)
   Powered by Baktify Creative Team
   ============================================================ */
"use strict";

/* ---------- Konfigurasi status (badge + ikon + label) ---------- */
const ORDER_STATUS = {
  cooking:        { badge: "badge-progress", icon: "clock",     label: "In Progress", caption: "Cooking Now" },
  ready:          { badge: "badge-success",  icon: "check",     label: "Ready",       caption: "Ready to serve" },
  waitingPayment: { badge: "badge-warning",  icon: "hourglass", label: "Waiting",     caption: "Awaiting Payment" },
  paid:           { badge: "badge-success",  icon: "check",     label: "Paid",        caption: "Completed" },
};

const TABLE_STATUS = {
  empty:    { badge: "badge-success",  icon: "check",     label: "Kosong" },
  occupied: { badge: "badge-progress", icon: "clock",     label: "Terisi" },
  reserved: { badge: "badge-warning",  icon: "hourglass", label: "Reserved" },
};

/* ---------- Potongan bersama (dipakai beberapa layar) ---------- */

/* Baris rincian item: [qty]x Nama ......... Total */
function itemRows(items) {
  return items
    .map(
      (it) => `
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-6 h-6 rounded-full bg-coral-soft text-coral text-[11px] font-bold grid place-items-center shrink-0">${it.qty}x</span>
          <p class="text-[14px] font-medium truncate">${esc(it.name)}</p>
        </div>
        <p class="text-[13px] text-ink2 shrink-0">${money(it.price * it.qty)}</p>
      </div>`
    )
    .join("");
}

/* Baris subtotal / pajak / total */
function totalsRows(items) {
  const subtotal = orderTotal(items);
  const tax = Math.round(subtotal * TAX_RATE);
  return `
    <div class="flex items-center justify-between text-[13px] text-ink2"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="flex items-center justify-between text-[13px] text-ink2 mt-1.5"><span>Pajak (10%)</span><span>${money(tax)}</span></div>
    <div class="flex items-center justify-between mt-3">
      <span class="text-[15px] font-bold">Total</span>
      <span class="text-[20px] font-bold text-coral">${money(subtotal + tax)}</span>
    </div>`;
}

/* Card putih standar */
const card = (inner, extra = "") =>
  `<article class="bg-surface rounded-r20 shadow-card p-5 ${extra}">${inner}</article>`;

/* ---------- Header, statistik & carousel Home ---------- */
function renderAppHeader() {
  $$(".app-header").forEach((el) => {
    el.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-full p-[3px] bg-gradient-to-br from-coral to-amber shadow-chip shrink-0">
          <div class="w-full h-full rounded-full bg-surface grid place-items-center text-[14px] font-bold text-coral">${OUTLET.initials}</div>
        </div>
        <div>
          <p class="text-[15px] font-semibold leading-tight">${esc(OUTLET.name)}</p>
          <p class="text-[12px] text-ink2 leading-tight">${esc(OUTLET.subLabel)}</p>
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

/* Statistik Home — diturunkan dari state, bukan hardcode */
function renderStats() {
  $("#statEarnings").textContent = money(state.earnings);
  $("#statInProgress").textContent = state.orders.filter((o) => o.status === "cooking" || o.status === "ready").length;
  $("#statWaiting").textContent = state.orders.filter((o) => o.status === "waitingPayment").length;
}

/* Carousel: Popular Dishes & Out of Stock */
function renderDishes(list, containerId) {
  $("#" + containerId).innerHTML = list
    .map(
      (d, i) => `
      <article class="shrink-0 w-[128px]">
        <div class="relative w-[128px] h-[128px] rounded-r16 overflow-hidden bg-canvas">
          ${productImg(d.name, "w-full h-full")}
          <span class="absolute top-2 left-2 w-6 h-6 rounded-full bg-surface text-coral text-[11px] font-bold grid place-items-center shadow-chip">${i + 1}</span>
        </div>
        <h3 class="mt-2 text-[13px] font-semibold truncate">${esc(d.name)}</h3>
        <p class="text-[11px] text-ink3">${d.ordered}x ordered</p>
      </article>`
    )
    .join("");
}

/* ---------- Orders List ---------- */
function renderOrders() {
  const q = $("#orderSearch").value.trim().toLowerCase();
  const list = state.orders.filter(
    (o) =>
      (state.orderFilter === "waitingPayment" ? o.status === "waitingPayment" : o.status !== "waitingPayment") &&
      o.name.toLowerCase().includes(q)
  );
  $("#orderList").innerHTML = list.length
    ? list
        .map((o) => {
          const s = ORDER_STATUS[o.status];
          return `
      <button type="button" data-action="open-order" data-id="${o.id}" class="w-full text-left bg-surface rounded-r16 shadow-card p-4 flex items-center justify-between gap-3 cursor-pointer transition active:scale-[0.98]">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-11 h-11 rounded-r8 shrink-0 grid place-items-center text-white text-[13px] font-bold" style="background:${o.tagColor}">${esc(o.tag)}</div>
          <div class="min-w-0">
            <h3 class="text-[15px] font-semibold truncate">${esc(o.name)}</h3>
            <p class="text-[12px] text-ink2">${orderQty(o.items)} Items &bull; ${money(orderTotal(o.items))}</p>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 shrink-0">
          <span class="badge ${s.badge}">${svgIcon(ICONS[s.icon], 12)}${s.label}</span>
          <p class="text-[11px] text-ink3">${s.caption}</p>
        </div>
      </button>`;
        })
        .join("")
    : `<div class="bg-surface rounded-r16 shadow-card p-6 text-center text-[13px] text-ink2">Tidak ada order yang cocok.</div>`;
}

/* ---------- Select Customer ---------- */
function renderCustomers() {
  const q = $("#customerSearch").value.trim().toLowerCase();
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
            ${avatarEl(c.name, c.from, c.to, 44)}
            <div class="min-w-0">
              <h3 class="text-[15px] font-semibold truncate">${esc(c.name)}</h3>
              <p class="text-[12px] text-ink2 truncate">${esc(c.email)}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" class="w-9 h-9 rounded-full bg-coral-soft text-coral grid place-items-center" aria-label="Telepon ${esc(c.name)}">${svgIcon(ICONS.phone, 16)}</button>
            <button type="button" class="w-9 h-9 rounded-full bg-mint-tint text-mint grid place-items-center" aria-label="Pesan ${esc(c.name)}">${svgIcon(ICONS.message, 16)}</button>
            <button type="button" data-action="select-customer" data-name="${esc(c.name)}" class="h-9 px-3.5 rounded-full bg-coral text-white text-[12px] font-semibold cursor-pointer transition active:scale-95">Pilih</button>
          </div>
        </div>
        <div class="h-px bg-line my-3.5"></div>
        <div class="flex justify-between gap-4">
          <div class="min-w-0">
            <p class="text-[11px] font-medium text-ink3">Email address</p>
            <p class="text-[13px] font-medium truncate">${esc(c.email)}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[11px] font-medium text-ink3">Date Added</p>
            <p class="text-[13px] font-medium">${esc(c.added)}</p>
          </div>
        </div>
      </article>`
        )
        .join("")
    : `<div class="bg-surface rounded-r16 shadow-card p-6 text-center text-[13px] text-ink2">Customer tidak ditemukan.</div>`;
}

/* ---------- Table & More ---------- */
function renderTables() {
  $("#tableGrid").innerHTML = state.tables
    .map((t) => {
      const s = TABLE_STATUS[t.status];
      return `
    <article class="bg-surface rounded-r16 shadow-card p-4">
      <div class="flex items-center justify-between">
        <div class="w-10 h-10 rounded-r8 bg-canvas text-ink2 text-[13px] font-bold grid place-items-center">${esc(t.num)}</div>
        <span class="badge ${s.badge}">${svgIcon(ICONS[s.icon], 12)}${s.label}</span>
      </div>
      <h3 class="mt-3 text-[15px] font-semibold">${esc(t.name)}</h3>
      <p class="text-[12px] text-ink2 mt-0.5">${t.seats} seats</p>
    </article>`;
    })
    .join("");
}

function renderMore() {
  $("#moreList").innerHTML = MORE_MENU.map(
    (m) => `
    <button type="button" class="w-full bg-surface rounded-r16 shadow-card p-4 flex items-center gap-3.5 text-left cursor-pointer transition active:scale-[0.98]">
      <span class="w-11 h-11 rounded-full ${m.tint} ${m.color} grid place-items-center shrink-0">${svgIcon(ICONS[m.icon], 20)}</span>
      <span class="min-w-0 flex-1">
        <span class="block text-[15px] font-semibold truncate">${esc(m.title)}</span>
        <span class="block text-[12px] text-ink2 truncate">${esc(m.desc)}</span>
      </span>
      <span class="text-ink3 shrink-0">${svgIcon(ICONS.chevronRight, 18)}</span>
    </button>`
  ).join("");
}

/* ---------- Order Detail ---------- */
function renderOrderDetail() {
  const o = state.currentOrder;
  if (!o) return;
  const s = ORDER_STATUS[o.status];

  const primaryAction =
    o.status === "cooking"
      ? `<button type="button" data-action="order-ready" data-id="${o.id}" class="action-btn-primary">Mark as Ready</button>`
      : o.status === "ready"
        ? `<button type="button" data-action="order-waiting-payment" data-id="${o.id}" class="action-btn-primary">Complete Order</button>`
        : o.status === "waitingPayment"
          ? `<button type="button" data-action="order-paid" data-id="${o.id}" class="action-btn-primary">Mark as Paid</button>`
          : "";

  $("#orderDetail").innerHTML = `
    ${card(`
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-r8 shrink-0 grid place-items-center text-white text-[14px] font-bold" style="background:${o.tagColor}">${esc(o.tag)}</div>
        <div class="min-w-0">
          <h2 class="text-[17px] font-bold truncate">${esc(o.name)}</h2>
          <p class="text-[12px] text-ink2">${orderQty(o.items)} Items</p>
        </div>
        <span class="badge ${s.badge} ml-auto shrink-0">${svgIcon(ICONS[s.icon], 12)}${s.label}</span>
      </div>`)}

    ${card(`
      <h3 class="text-[15px] font-bold flex items-center gap-2">${svgIcon(ICONS.receipt, 18)} Rincian Pesanan</h3>
      <div class="mt-3.5 flex flex-col gap-3">${itemRows(o.items)}</div>
      <div class="h-px bg-line my-4"></div>
      ${totalsRows(o.items)}`)}

    <div class="flex flex-col gap-2.5">
      ${primaryAction}
      <button type="button" data-action="open-receipt" data-id="${o.id}" class="w-full py-3.5 rounded-full bg-canvas text-ink text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98]">
        ${svgIcon(ICONS.printer, 18)} Cetak Struk
      </button>
    </div>`;
}

/* ---------- New Order ---------- */
function renderNewOrderCustomer() {
  const c = state.cartCustomer;
  $("#newOrderCustomer").innerHTML = c
    ? `${avatarEl(c.name, c.from, c.to, 40)}
       <span class="min-w-0 flex-1">
         <span class="block text-[14px] font-semibold truncate">${esc(c.name)}</span>
         <span class="block text-[12px] text-ink2 truncate">${esc(c.email)}</span>
       </span>
       <span class="text-ink3 shrink-0">${svgIcon(ICONS.chevronDown, 18)}</span>`
    : `<span class="w-10 h-10 rounded-full bg-canvas text-ink3 grid place-items-center shrink-0">${svgIcon(ICONS.user, 20)}</span>
       <span class="text-[13px] text-ink2">Pilih customer dulu untuk lanjut</span>
       <span class="text-ink3 ml-auto shrink-0">${svgIcon(ICONS.chevronDown, 18)}</span>`;
}

function renderMenuCategories() {
  const el = $("#menuCategories");
  const keep = el.scrollLeft;
  el.innerHTML = MENU_CATEGORIES.map(
    (c) => `<button type="button" data-action="set-menu-category" data-cat="${c.id}" class="filter-pill shrink-0 ${state.menuCategory === c.id ? "active" : ""}">${esc(c.label)}</button>`
  ).join("");
  el.scrollLeft = keep;
}

function renderMenuList() {
  const q = $("#menuSearch").value.trim().toLowerCase();
  const list = MENU_ITEMS.filter(
    (m) => (state.menuCategory === "all" || m.cat === state.menuCategory) && m.name.toLowerCase().includes(q)
  );
  $("#menuList").innerHTML = list.length
    ? list
        .map((m) => {
          const inCart = state.cart.find((it) => it.id === m.id);
          const stepper = inCart
            ? `<div class="flex items-center gap-2 shrink-0">
                 <button type="button" data-action="cart-dec" data-id="${m.id}" class="w-8 h-8 rounded-full bg-canvas text-ink2 grid place-items-center cursor-pointer transition active:scale-90" aria-label="Kurangi ${esc(m.name)}">${svgIcon(ICONS.minus, 15)}</button>
                 <span class="w-6 text-center text-[14px] font-bold">${inCart.qty}</span>
                 <button type="button" data-action="cart-inc" data-id="${m.id}" class="w-8 h-8 rounded-full bg-coral text-white grid place-items-center cursor-pointer transition active:scale-90" aria-label="Tambah ${esc(m.name)}">${svgIcon(ICONS.plus, 15)}</button>
               </div>`
            : `<button type="button" data-action="cart-add" data-id="${m.id}" class="w-8 h-8 rounded-full bg-coral text-white grid place-items-center cursor-pointer transition active:scale-90" aria-label="Tambah ${esc(m.name)}">${svgIcon(ICONS.plus, 16)}</button>`;
          return `
      <article class="bg-surface rounded-r16 shadow-card p-3 flex items-center gap-3">
        <div class="w-14 h-14 rounded-r16 overflow-hidden shrink-0 bg-canvas">${productImg(m.name, "w-full h-full")}</div>
        <div class="min-w-0 flex-1">
          <h3 class="text-[14px] font-semibold truncate">${esc(m.name)}</h3>
          <p class="text-[12px] text-ink2">${money(m.price)}</p>
        </div>
        ${stepper}
      </article>`;
        })
        .join("")
    : `<div class="bg-surface rounded-r16 shadow-card p-6 text-center text-[13px] text-ink2">Menu tidak ditemukan.</div>`;
}

/* Cart bar mengambang — tampil hanya saat cart berisi & di layar New Order */
function renderCartBar() {
  const count = orderQty(state.cart);
  $("#cartBar").classList.toggle("hidden", !(state.route === "neworder" && count > 0));
  $("#cartBarBtn").innerHTML = `
    <span class="flex items-center gap-2 text-[14px] font-semibold">
      <span class="w-7 h-7 rounded-full bg-white/25 grid place-items-center text-[12px] font-bold">${count}</span>
      Lihat Keranjang
    </span>
    <span class="text-[15px] font-bold">${money(orderTotal(state.cart))}</span>`;
}

/* ---------- Checkout ---------- */
function renderCheckout() {
  const emptyTables = state.tables.filter((t) => t.status === "empty");

  $("#checkoutBody").innerHTML = `
    ${card(`
      <h3 class="text-[15px] font-bold flex items-center gap-2">${svgIcon(ICONS.receipt, 18)} Ringkasan</h3>
      <div class="mt-3.5 flex flex-col gap-3">${itemRows(state.cart)}</div>
      <div class="h-px bg-line my-4"></div>
      ${totalsRows(state.cart)}`)}

    ${card(`
      <h3 class="text-[15px] font-bold flex items-center gap-2">${svgIcon(ICONS.user, 18)} Customer</h3>
      <p class="mt-2 text-[14px] font-medium">${state.cartCustomer ? esc(state.cartCustomer.name) : "Walk-in Guest"}</p>`)}

    ${card(`
      <h3 class="text-[15px] font-bold">Pilih Meja (opsional)</h3>
      <div class="mt-3 flex flex-wrap gap-2">
        ${emptyTables
          .map(
            (t) => `<button type="button" data-action="set-table" data-num="${t.num}" class="h-10 px-4 rounded-full text-[12px] font-semibold cursor-pointer transition ${state.cartTable === t.num ? "bg-coral text-white" : "bg-canvas text-ink2"}">${esc(t.num)}</button>`
          )
          .join("")}
      </div>`)}

    ${card(`
      <h3 class="text-[15px] font-bold">Metode Pembayaran</h3>
      <div class="mt-3 grid grid-cols-3 gap-2.5">
        ${PAYMENT_METHODS.map(
          (p) => `
          <button type="button" data-action="set-payment" data-id="${p.id}" class="h-20 rounded-r16 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition ${state.payment === p.id ? "bg-coral text-white" : "bg-canvas text-ink2"}">
            ${svgIcon(ICONS[p.icon], 22)}
            <span class="text-[12px] font-semibold">${p.label}</span>
          </button>`
        ).join("")}
      </div>`)}

    <button type="button" data-action="place-order" class="action-btn-primary text-[15px] font-bold shadow-fab">Place Order &bull; ${money(orderTotal(state.cart) * (1 + TAX_RATE))}</button>`;
}

/* ---------- Struk (receipt) ---------- */
function renderReceipt() {
  const o = state.currentOrder;
  if (!o) return;
  const subtotal = orderTotal(o.items);
  const tax = Math.round(subtotal * TAX_RATE);
  const pay = PAYMENT_METHODS.find((p) => p.id === o.payment);
  const date = new Date(o.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  const dash = `<div class="border-t border-dashed border-ink3 my-3"></div>`;

  $("#receiptPrint").innerHTML = `
    <div class="text-center">
      <p class="text-[15px] font-bold uppercase">${esc(OUTLET.name)}</p>
      <p class="text-[11px] text-ink2 mt-0.5">${esc(OUTLET.subLabel)}</p>
      <p class="text-[11px] text-ink2">${esc(OUTLET.address)}</p>
      <p class="text-[11px] text-ink2">${esc(OUTLET.phone)}</p>
    </div>
    ${dash}
    <div class="flex justify-between text-[11px] text-ink2"><span>No. Order</span><span class="font-medium text-ink">${esc(o.id.toUpperCase())}</span></div>
    <div class="flex justify-between text-[11px] text-ink2 mt-1"><span>Tanggal</span><span class="font-medium text-ink">${esc(date)}</span></div>
    <div class="flex justify-between text-[11px] text-ink2 mt-1"><span>Customer</span><span class="font-medium text-ink">${esc(o.name)}</span></div>
    <div class="flex justify-between text-[11px] text-ink2 mt-1"><span>Kasir</span><span class="font-medium text-ink">${esc(OUTLET.user)}</span></div>
    ${dash}
    <div class="flex flex-col gap-2">
      ${o.items
        .map(
          (it) => `
        <div class="flex justify-between gap-3 text-[12px]">
          <span class="min-w-0"><span class="font-semibold">${it.qty}x</span> ${esc(it.name)}</span>
          <span class="shrink-0 tabular-nums">${money(it.price * it.qty)}</span>
        </div>`
        )
        .join("")}
    </div>
    ${dash}
    <div class="flex justify-between text-[12px]"><span>Subtotal</span><span class="tabular-nums">${money(subtotal)}</span></div>
    <div class="flex justify-between text-[12px] mt-1"><span>Pajak (10%)</span><span class="tabular-nums">${money(tax)}</span></div>
    <div class="flex justify-between text-[13px] font-bold mt-2.5"><span>TOTAL</span><span class="tabular-nums">${money(subtotal + tax)}</span></div>
    <div class="flex justify-between text-[12px] mt-1 text-ink2"><span>Metode</span><span>${pay ? pay.label : "Cash"}</span></div>
    ${dash}
    <p class="text-center text-[11px] text-ink2">Terima kasih atas kunjungan Anda</p>
    <p class="text-center text-[10px] text-ink3 mt-1">Powered by <a href="https://baktify.my.id" target="_blank" rel="noopener" class="text-coral">Baktify Creative Team</a></p>`;
}




