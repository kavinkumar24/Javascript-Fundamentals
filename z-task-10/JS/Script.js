const productListSection = document.getElementById("product-list");
const cart_count = document.getElementById("cart-count");

async function fetchProducts() {
  const api_url = "https://dummyjson.com/products";
  const response = await fetch(api_url);
  const data = await response.json();
  const products = data.products;
  return products;
}

async function displayProducts(category = "", searchQuery = "") {
  const products = await fetchProducts();
  const productList = document.getElementById("product-list");
  const category_title = document.getElementById("category_title");
  productList.innerHTML = "";

  category_title.innerHTML = `Products in ${
    category ? category : "All"
  } Category`;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    let truncatedDescription = product.description;
    const periodIndex = truncatedDescription.indexOf(".");
    if (periodIndex !== -1) {
      truncatedDescription = truncatedDescription.slice(0, periodIndex) + "...";
    }

    productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.thumbnail}" alt="${
      product.name
    }" class="product-image">
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${truncatedDescription}</p>
          <div class="rating-container">
            <img src="../UI/assests/graph.png" alt="star rating" class="star-rating">
            <p class="rating">(${product.rating})</p>
          </div>
          <div class="price-container">
            <p class="price"><span>PRICE</span> ₹${product.price.toFixed(
              2
            )}/-</p>
            <button class="add-to-cart">Add Cart</button>

          </div>
        </div>
      `;
    const addToCartButton = productCard.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      AddCart(product);
    });

    productList.appendChild(productCard);
  });
}

const categoryItems = document.querySelectorAll("nav ul li");
categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.getAttribute("data-category");
    categoryItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
    displayProducts(
      category.toLowerCase(),
      document.getElementById("search-box").value
    );

    productListSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const searchInput = document.getElementById("search-box");
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value;
  displayProducts(
    document.querySelector("nav ul li.active")?.getAttribute("data-category"),
    searchQuery
  );
});

const AddCart = (Product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === Product.id);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    Product.quantity = 1;
    cart.push(Product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
  console.log(Product);
  location.reload();
};

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const uniqueCartCount = new Set(cart.map((item) => item.id)).size;
  if (cart_count) {
    cart_count.innerHTML = uniqueCartCount;
  }
}

updateCartCount();

displayProducts();
