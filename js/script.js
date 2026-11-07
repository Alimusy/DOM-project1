// Shopping cart: quantity, delete, like, and live total price.

const totalElement = document.querySelector(".total");

// Each product is a direct child of .list-products
// (the inner div also has the class card-body, so we use the child selector).
const getProduct = (element) => element.closest(".list-products > .card-body");

// Reads a number out of text like "100 $"
const toNumber = (text) => parseFloat(text) || 0;

// Recalculates the total from every product still in the cart
function updateTotal() {
  const products = document.querySelectorAll(".list-products > .card-body");
  let total = 0;

  products.forEach((product) => {
    const unitPrice = toNumber(product.querySelector(".unit-price").textContent);
    const quantity = toNumber(product.querySelector(".quantity").textContent);
    total += unitPrice * quantity;
  });

  totalElement.textContent = `${total} $`;
}

// 1a. "+" button increases the quantity
document.querySelectorAll(".fa-plus-circle").forEach((plusButton) => {
  plusButton.addEventListener("click", () => {
    const quantityElement = getProduct(plusButton).querySelector(".quantity");
    quantityElement.textContent = toNumber(quantityElement.textContent) + 1;
    updateTotal();
  });
});

// 1b. "-" button decreases the quantity, never below 0
document.querySelectorAll(".fa-minus-circle").forEach((minusButton) => {
  minusButton.addEventListener("click", () => {
    const quantityElement = getProduct(minusButton).querySelector(".quantity");
    const quantity = toNumber(quantityElement.textContent);
    if (quantity > 0) {
      quantityElement.textContent = quantity - 1;
      updateTotal();
    }
  });
});

// 2. Trash button removes the product from the cart
document.querySelectorAll(".fa-trash-alt").forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    getProduct(deleteButton).remove();
    updateTotal();
  });
});

// 3. Heart button toggles liked / not liked and changes color
document.querySelectorAll(".fa-heart").forEach((heartButton) => {
  heartButton.addEventListener("click", () => {
    heartButton.classList.toggle("liked");
    heartButton.style.color = heartButton.classList.contains("liked") ? "red" : "black";
  });
});

// 4. Start with the correct total
updateTotal();
