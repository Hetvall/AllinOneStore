const api = "https://fakestoreapi.com/products";
const products = document.querySelector(".products");
const filterInput = document.querySelector(".filter");
let productList = [];

// Promise
const getProducts = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// Reload event
document.addEventListener("DOMContentLoaded", async () => {
  productList = await getProducts();
  displayProducts(productList);

// Category Filter
  filterInput.addEventListener("keyup", () => {
    const filterValue = filterInput.value.trim().toLowerCase();
    const filteredProducts = productList.filter((product) =>
      product.category.toLowerCase().includes(filterValue)
    );
    if (filterValue) {
      displayProducts(filteredProducts);
    } else {
      alert("Please enter a valid category");
    }
  });
});

// List of products
function displayProducts(productsToDisplay) {
  products.innerHTML = "";

  productsToDisplay.forEach((product) => {
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const id = document.createElement("text");
    id.innerHTML = `Product ID: ${product.id}`;
    products.appendChild(id);

    const title = document.createElement("h1");
    title.innerHTML = product.title;
    products.appendChild(title);

    const price = document.createElement("h2");
    price.innerHTML = `$${product.price}`;
    products.appendChild(price);

    const category = document.createElement("span");
    category.innerHTML = `Category: ${product.category}`;
    products.appendChild(category);

    const description = document.createElement("p");
    description.innerHTML = product.description;
    products.appendChild(description);

    const image = document.createElement("img");
    image.src = product.image;
    products.appendChild(image);
  });
}
