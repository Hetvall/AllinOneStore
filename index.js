const URL = "https://fakestoreapi.com/products";
const products = document.querySelector(".products");
const filterInput = document.querySelector(".filter");
let page = 1;
let limit = 5;
let productList = [];

// Promise
async function getProducts(page, limit) {
  const response = await fetch(`${URL}?limit=${limit}&page=${page}`);
  const data = await response.json();
  return data;
}

// List of products
function displayProducts(productsToDisplay) {
  productsToDisplay.forEach((product) => {
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const id = document.createElement("text");
    id.innerHTML = `Product ID: ${product.id}`;
    productItem.appendChild(id);

    const title = document.createElement("h1");
    title.innerHTML = product.title;
    productItem.appendChild(title);

    const price = document.createElement("h2");
    price.innerHTML = `$${product.price}`;
    productItem.appendChild(price);

    const category = document.createElement("span");
    category.innerHTML = `Category: ${product.category}`;
    productItem.appendChild(category);

    const description = document.createElement("p");
    description.innerHTML = product.description;
    productItem.appendChild(description);

    const image = document.createElement("img");
    image.src = product.image;
    productItem.appendChild(image);

    products.appendChild(productItem);
  });
}

// Infinite Scroll logic
async function loadProducts() {
  const loadedProducts = await getProducts(page, limit);
  productList = [...productList, ...loadedProducts];
  displayProducts(loadedProducts);
  page++;
}

// Reload event
document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
});

// Category Filter
filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.trim().toLowerCase();
  const filteredProducts = productList.filter((product) =>
    product.category.toLowerCase().includes(filterValue)
  );
  products.innerHTML = "";
  displayProducts(filteredProducts);
});

// scroll event
window.addEventListener("scroll", async function () {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight
  ) {
    await loadProducts();
  }
});
