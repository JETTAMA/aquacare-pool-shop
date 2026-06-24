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
