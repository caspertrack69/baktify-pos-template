/* ============================================================
   Baktify POS — F&B UI Template
   app.js — state terpusat, navigasi SPA, actions, init
   Powered by Baktify Creative Team
   ============================================================ */
"use strict";

/* ============================================================
   STATE — satu-satunya sumber kebenaran sesi ini.
   Data awal disalin dari data.js; refresh = kembali ke awal.
   ============================================================ */
const state = {
  screen: "home",          // tab aktif bottom nav
  route: null,             // layar sekunder: "customer" | "neworder" | "checkout" | "order"
  orders: ORDERS.map((o) => ({
    ...o,
    createdAt: Date.now(), // dummy: semua order dianggap dibuat hari ini
    items: o.items.map((it) => ({ ...it })),
  })),
  tables: TABLES.map((t) => ({ ...t })),
  earnings: 5800000,        // angka awal dummy, bertambah saat order dibayar
  orderFilter: "inProgress",
  cart: [],                 // [{ id, name, price, qty, ... }]
  cartCustomer: null,
  cartTable: null,
  menuCategory: "all",
  payment: "cash",
  currentOrder: null,       // order yang dilihat di Order Detail / Struk
};

/* ============================================================
   NAVIGASI — SPA tanpa reload
   ============================================================ */
function showScreen(name) {
  state.screen = name;
  state.route = null;
  $$(".screen").forEach((s) => s.classList.add("hidden"));
  window.scrollTo(0, 0); // reset scroll saat layar masih tersembunyi, agar tidak terlihat "melompat"
  $("#screen-" + name)?.classList.remove("hidden");
  $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
  renderCartBar();
}

function showRoute(name) {
  state.route = name;
  $$(".screen").forEach((s) => s.classList.add("hidden"));
  window.scrollTo(0, 0); // reset scroll saat layar masih tersembunyi, agar tidak terlihat "melompat"
  $("#screen-" + name)?.classList.remove("hidden");
  renderCartBar();
}

/* ============================================================
   ACTIONS — satu listener global (event delegation).
   Tambah aksi baru = tambah satu entri di objek ini.
   ============================================================ */
const ACTIONS = {
  /* --- Navigasi --- */
  nav(el) { showScreen(el.dataset.nav); },
  fab() { showRoute("customer"); },
  back() {
    if (state.route === "checkout") showRoute("neworder");
    else if (state.route === "neworder") showRoute("customer");
    else showScreen(state.screen);
  },
  "change-customer"() { showRoute("customer"); },

  /* --- Alur transaksi --- */
  "select-customer"(el) {
    state.cartCustomer = CUSTOMERS.find((c) => c.name === el.dataset.name) || null;
    showRoute("neworder");
    renderNewOrderCustomer();
  },
  "set-menu-category"(el) {
    state.menuCategory = el.dataset.cat;
    renderMenuCategories();
    renderMenuList();
  },
  "cart-add"(el) { ACTIONS["cart-inc"](el); },
  "cart-inc"(el) {
    const item = state.cart.find((it) => it.id === el.dataset.id);
    if (item) item.qty++;
    else {
      const m = MENU_ITEMS.find((x) => x.id === el.dataset.id);
      if (m) state.cart.push({ ...m, qty: 1 });
    }
    renderMenuList();
    renderCartBar();
  },
  "cart-dec"(el) {
    const item = state.cart.find((it) => it.id === el.dataset.id);
    if (!item) return;
    item.qty--;
    if (item.qty <= 0) state.cart = state.cart.filter((it) => it.id !== el.dataset.id);
    renderMenuList();
    renderCartBar();
  },
  "go-checkout"() {
    if (!state.cart.length) return;
    showRoute("checkout");
    renderCheckout();
  },
  "set-table"(el) {
    state.cartTable = state.cartTable === el.dataset.num ? null : el.dataset.num;
    renderCheckout();
  },
  "set-payment"(el) {
    state.payment = el.dataset.id;
    renderCheckout();
  },
  "place-order"() {
    if (!state.cart.length) return;
    const c = state.cartCustomer || { name: "Walk-in Guest" };
    state.orders.unshift({
      id: "ord-" + Date.now().toString(36),
      tag: initialsOf(c.name),
      name: c.name,
      status: "cooking",
      tagColor: TAG_COLORS[state.orders.length % TAG_COLORS.length],
      payment: state.payment,
      createdAt: Date.now(),
      items: state.cart.map((it) => ({ name: it.name, qty: it.qty, price: it.price })),
    });
    if (state.cartTable) {
      const table = state.tables.find((t) => t.num === state.cartTable);
      if (table) table.status = "occupied";
      renderTables();
    }
    state.cart = [];
    state.cartTable = null;
    state.payment = "cash";
    renderOrders();
    renderStats();
    $("#successModal").classList.remove("hidden");
  },

  /* --- Order detail --- */
  "open-order"(el) {
    state.currentOrder = state.orders.find((o) => o.id === el.dataset.id) || null;
    if (!state.currentOrder) return;
    showRoute("order");
    renderOrderDetail();
  },
  "order-ready"(el) { updateOrder(el.dataset.id, "ready"); },
  "order-waiting-payment"(el) { updateOrder(el.dataset.id, "waitingPayment"); },
  "order-paid"(el) {
    const o = state.orders.find((x) => x.id === el.dataset.id);
    if (!o) return;
    o.status = "paid";
    state.earnings += orderTotal(o.items) * (1 + TAX_RATE);
    renderOrders();
    renderStats();
    renderOrderDetail();
  },

  /* --- Struk --- */
  "open-receipt"(el) {
    state.currentOrder = state.orders.find((o) => o.id === el.dataset.id) || null;
    if (!state.currentOrder) return;
    renderReceipt();
    $("#receiptModal").classList.remove("hidden");
  },
  "receipt-close"() { $("#receiptModal").classList.add("hidden"); },
  "receipt-print"() { window.print(); },

  /* --- Lain-lain --- */
  "add-customer"() { /* placeholder statis: form tambah customer di luar scope template v1.0 */ },
  "set-order-filter"(el) {
    state.orderFilter = el.dataset.filter;
    $$("#orderFilters .filter-pill").forEach((b) => b.classList.toggle("active", b === el));
    renderOrders();
  },
  "modal-close"() { $("#successModal").classList.add("hidden"); },
  "modal-orders"() {
    $("#successModal").classList.add("hidden");
    showScreen("orders");
  },
};

function updateOrder(id, status) {
  const o = state.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = status;
  renderOrders();
  renderOrderDetail();
  renderStats();
}

/* ---------- Init ---------- */
function init() {
  renderAppHeader();
  renderStats();
  renderDishes(POPULAR_DISHES, "popularList");
  renderDishes(OUT_OF_STOCK, "outOfStockList");
  renderOrders();
  renderCustomers();
  renderTables();
  renderMore();
  renderNewOrderCustomer();
  renderMenuCategories();
  renderMenuList();
  renderCartBar();
  showScreen("home");

  /* Satu listener untuk semua elemen bertanda data-action */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    ACTIONS[el.dataset.action]?.(el);
  });

  /* Search — state lokal saja, tidak menyimpan permanen */
  $("#orderSearch").addEventListener("input", renderOrders);
  $("#customerSearch").addEventListener("input", renderCustomers);
  $("#menuSearch").addEventListener("input", renderMenuList);

  /* "View all": scroll carousel ke ujung (versi statis) */
  $$(".view-all").forEach((b) =>
    b.addEventListener("click", () => {
      $("#" + b.dataset.target)?.scrollBy({ left: 9999, behavior: "smooth" });
    })
  );
}

document.addEventListener("DOMContentLoaded", init);


