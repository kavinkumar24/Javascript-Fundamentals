const cartProducts = document.getElementById("cart-products");

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const displayCartProducts = () => {
  cartProducts.innerHTML = "";

  if (cartItems.length === 0) {
    cartProducts.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
    return;
  }

  let total = 0;

  cartItems.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-product");

    productElement.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.name}">
        <div class="product-info">
            <h3>${item.title}</h3>
            <p id="stock">${item.availabilityStatus}</p>
            
            <div class="quantity-container">
            <div class="border-box">
                <button class="quantity-btn-decrease">-</button>
                <p class="quantity-display">${item.quantity}</p>
                <button class="quantity-btn-increase">+</button>
                </div>
                 <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
            <div class="price-container">
            <button class="discount">${item.discountPercentage}% off</button>
            <p class="price">₹${(item.price * item.quantity).toFixed(2)}</p>
            <p class="return-policy">${item.returnPolicy}</p>
      
            </div>
           
           
        </div>
        `;

    const stock = productElement.querySelector("#stock");
    if (item.availabilityStatus == "Low Stock") {
      stock.style.color = "red";
    } else {
      stock.style.color = "green";
    }
    const increaseButton = productElement.querySelector(
      ".quantity-btn-increase"
    );
    const decreaseButton = productElement.querySelector(
      ".quantity-btn-decrease"
    );
    const removeButton = productElement.querySelector(".remove-btn");

    increaseButton.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      displayCartProducts();
    });

    decreaseButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartProducts();
      } else {
        const confirmRemove = confirm(
          "Do you want to remove this item from the cart?"
        );
        if (confirmRemove) {
          removeFromCart(item.id);
        }
      }
    });

    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });
    cartProducts.appendChild(productElement);

    total += item.price * item.quantity;
  });

  cartTotal.innerHTML = `
    <p>Tax: 10% </p>
    <p>Total: ₹${(total + total * 0.1).toFixed(2)}</p>
  `;
};

const removeFromCart = (productId) => {
  console.log(productId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  location.reload();
  displayCartProducts();
};

displayCartProducts();
