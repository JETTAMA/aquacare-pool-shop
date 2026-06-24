const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = document.querySelectorAll(".category-tabs button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.filter;
    productCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const cartTrigger = document.querySelector(".cart-trigger");
const cartClose = document.querySelector(".cart-close");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartSummary = document.querySelector(".cart-summary");
const cartTotal = document.querySelector(".cart-total");
const cartCount = document.querySelector(".cart-count");
const checkoutButton = document.querySelector(".cart-checkout");
const clearButton = document.querySelector(".cart-clear");
const cartToast = document.querySelector(".cart-toast");

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("mpe-cart")) || [];
} catch {
  cart = [];
}

const money = (amount) =>
  new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);

const saveCart = () => {
  localStorage.setItem("mpe-cart", JSON.stringify(cart));
};

const openCart = () => {
  document.body.classList.add("cart-open");
  cartTrigger.setAttribute("aria-expanded", "true");
  document.querySelector(".cart-drawer").setAttribute("aria-hidden", "false");
};

const closeCart = () => {
  document.body.classList.remove("cart-open");
  cartTrigger.setAttribute("aria-expanded", "false");
  document.querySelector(".cart-drawer").setAttribute("aria-hidden", "true");
};

const showToast = (message) => {
  cartToast.textContent = message;
  cartToast.classList.add("show");
  window.setTimeout(() => cartToast.classList.remove("show"), 1600);
};

const renderCart = () => {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = money(total);
  cartEmpty.classList.toggle("visible", cart.length === 0);
  cartItemsContainer.hidden = cart.length === 0;
  cartSummary.hidden = cart.length === 0;
  checkoutButton.disabled = cart.length === 0;
  clearButton.disabled = cart.length === 0;

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="">
          <div>
            <h3>${item.name}</h3>
            <span class="cart-item-price">${money(item.price)} each</span>
            <div class="quantity-control" aria-label="Quantity for ${item.name}">
              <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-remove" type="button" data-action="remove" data-id="${item.id}">Remove</button>
        </article>
      `,
    )
    .join("");
};

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const existing = cart.find((item) => item.id === button.dataset.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        quantity: 1,
      });
    }
    saveCart();
    renderCart();
    button.classList.add("added");
    button.textContent = "Added ✓";
    window.setTimeout(() => {
      button.classList.remove("added");
      button.textContent = "Add to cart";
    }, 1200);
    showToast(`${button.dataset.name} added`);
  });
});

cartItemsContainer.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;

  const item = cart.find((entry) => entry.id === control.dataset.id);
  if (!item) return;

  if (control.dataset.action === "increase") item.quantity += 1;
  if (control.dataset.action === "decrease") item.quantity -= 1;
  if (control.dataset.action === "remove" || item.quantity < 1) {
    cart = cart.filter((entry) => entry.id !== item.id);
  }

  saveCart();
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (!cart.length) return;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = cart.map(
    (item) =>
      `• ${item.name} × ${item.quantity} — ${money(item.price * item.quantity)}`,
  );
  const message = [
    "Hi MPE, I would like to enquire about these pool products:",
    "",
    ...lines,
    "",
    `Estimated subtotal: ${money(total)}`,
    "",
    "Please confirm availability, exact specifications, delivery and final price. Thank you.",
  ].join("\n");

  window.open(`https://wa.me/60162616781?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

clearButton.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

cartTrigger.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

renderCart();
