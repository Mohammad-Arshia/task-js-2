const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "AUDIO",
    description: "Rich sound, all-day comfort.",
    price: 50,
    image: "assets/headphone.jpg",
    tag: "POPULAR",
  },
  {
    id: 2,
    name: "Everyday Sneakers",
    category: "FOOTWEAR",
    description: "Fresh steps, effortless style.",
    price: 80,
    image: "assets/shoes.jpg",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Classic Wristwatch",
    category: "ACCESSORIES",
    description: "Timeless looks for every day.",
    price: 120,
    image: "assets/wristwatch.jpg",
    tag: "",
  },
  {
    id: 4,
    name: "Backpack",
    category: "LIFESTYLE",
    description: "Made wherever you go.",
    price: 35,
    image: "assets/backpack.jpg",
    tag: "",
  },
];

const productsContainer = document.getElementById("products");
const productCount      = document.getElementById("productCount");

const productElements = products.map(product => {

  const productCard = document.createElement("section");
  productCard.className = "product";
  productCard.dataset.productId = product.id;

  const productImage = document.createElement("div");
  productImage.className = "product-image";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;

  productImage.appendChild(image);

  if (product.tag) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = product.tag;

    productImage.appendChild(tag);
  }

  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  const category = document.createElement("p");
  category.className = "category";
  category.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = product.description;

  const productBottom = document.createElement("div");
  productBottom.className = "product-bottom";

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = "$" + product.price;

  const addButton = document.createElement("button");
  addButton.className = "add-btn";
  addButton.dataset.productId = product.id;
  addButton.type = "button";
  addButton.textContent = "+ Add to Cart";

  productBottom.append(price, addButton);

  productInfo.append(
    category,
    name,
    description,
    productBottom
  );

  productCard.append(productImage, productInfo);

  return productCard;
});

productsContainer.append(...productElements);
productCount.textContent = `${products.length} products`;

const cart = [];

const cartItemsContainer = document.getElementById("cartList");
const cartCount          = document.getElementById("cartBadge");
const cartTitleCount     = document.getElementById("cartItems");
const cartEmpty          = document.getElementById("cartEmpty");
const subtotal           = document.getElementById("subtotal");
const clearCartButton    = document.getElementById("clearBtn");

function addToBag(productId) {

  const selectedProduct = products.find(
    product => product.id === productId
  );

  if (selectedProduct) {
    cart.push(selectedProduct);
    renderCart();
  }

}

productsContainer.addEventListener("click", event => {

  const addButton = event.target.closest(".add-btn");

  if (!addButton) return;

  const productId = Number(addButton.dataset.productId);

  addToBag(productId);

});

function renderCart() {

  cartItemsContainer.replaceChildren();

//   cartEmpty.hidden = cart.length !== 0;
    if (cart.length===0) {
        cartEmpty.style.display="block"
    }
    else{
        cartEmpty.style.display="none"
    }

  const cartElements = cart.map((product, index) => {

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const productName = document.createElement("span");
    productName.textContent = product.name;

    const productPrice = document.createElement("span");
    productPrice.textContent = "$" + product.price;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.dataset.cartIndex = index;
    removeButton.textContent = "Remove";
    removeButton.type = "button";

    cartItem.append(productName, productPrice, removeButton);

    return cartItem;

  });

  cartItemsContainer.append(...cartElements);

  cartCount.textContent = cart.length;
  cartTitleCount.textContent = `(${cart.length})`;

  const total = cart.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  subtotal.textContent = "$" + total;

}

cartItemsContainer.addEventListener("click", event => {

  const removeButton = event.target.closest(".remove-btn");

  if (!removeButton) return;

  const cartIndex = Number(removeButton.dataset.cartIndex);

  cart.splice(cartIndex, 1);

  renderCart();

});

clearCartButton.addEventListener("click", () => {

  cart.length = 0;

  renderCart();

});

renderCart();