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
    name: "Wristwatch",
    category: "ACCESSORIES",
    description: "Timeless looks for every day.",
    price: 120,
    image: "assets/Wristwatch.jpg",
    tag: "",
  },
  {
    id: 4,
    name: "Urban Backpack",
    category: "LIFESTYLE",
    description: "Made for wherever you go.",
    price: 35,
    image: "assets/backpack.jpg",
    tag: "",
  },
];
const cart = [];

const cartItemsContainer = document.getElementById("cartList");
const cartCount = document.getElementById("cartBadge");
const cartTitleCount = document.getElementById("cartItemsContainer");
const cartEmpty = document.getElementById("cartEmpty");
const subtotal = document.getElementById("subtotal");
const clearCartButton = document.getElementById("clearBtn");

const prolist = document.getElementById("products");
const productCount = document.getElementById("productCount");

function displayPro() {
  prolist.innerHTML = "";

  const proElements = products.map((pro) => {
    const proCard = document.createElement("section");
    proCard.className = "product";
    proCard.dataset.proID = pro.id;

    const proImage = document.createElement("div");
    proImage.className = "product-image";

    const img = document.createElement("img");
    img.src = pro.image;
    img.alt = pro.name;

    proImage.appendChild(img);

    if (pro.tag) {
      const proTag = document.createElement("span");
      proTag.className = "tag";
      proTag.textContent = pro.tag;
      proImage.appendChild(proTag);
    }

    const proInfo = document.createElement("div");
    proInfo.className = "product-info";

    const proCategory = document.createElement("p");
    proCategory.className = "category";
    proCategory.textContent = pro.category;

    const proName = document.createElement("h3");
    proName.className = "product-name";
    proName.textContent = pro.name;

    const proDescription = document.createElement("p");
    proDescription.className = "description";
    proDescription.textContent = pro.description;

    const proBtn = document.createElement("div");
    proBtn.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "$" + pro.price;

    const addButton = document.createElement("button");
    addButton.className = "add-btn";
    addButton.dataset.productId = pro.id;
    addButton.type = "button";
    addButton.textContent = "+ Add to Cart";

    proBtn.append(price, addButton);
    proInfo.append(proCategory, proName, proDescription, proBtn);
    proCard.append(proImage, proInfo);

    return proCard;
  });

  prolist.append(...proElements);
  productCount.textContent = `${products.length} products`;
}

function addToBag(productId) {
  const foundItem = cart.find((item) => item.id === productId);

  if (foundItem) {
    foundItem.num += 1;
  } else {
    const selectedProduct = products.find((p) => p.id === productId);

    if (selectedProduct) {
      cart.push({ ...selectedProduct, num: 1 });
    }
  }

  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
  } else {
    cartEmpty.style.display = "none";
  }

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const productName = document.createElement("span");
    productName.textContent = product.name;

    const productQuantity = document.createElement("span");
    productQuantity.textContent = `× ${product.num}`;

    const productPrice = document.createElement("span");
    productPrice.textContent = "$" + product.price * product.num;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.dataset.cartIndex = index;
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    cartItem.append(productName, productQuantity, productPrice, removeButton);

    cartItemsContainer.appendChild(cartItem);
  });

  let count = 0;

  cart.forEach((product) => {
    count = count + product.num;
  });

  cartCount.textContent = count;
  cartTitleCount.textContent = `(${cart.length})`;

  let total = 0;

  cart.forEach((product) => {
    total = total + product.price * product.num;
  });

  subtotal.textContent = "$" + total;

  const productCards = prolist.querySelectorAll(".product");

  productCards.forEach((productCard) => {
    const productId = Number(productCard.dataset.proID);
    const currentItem = cart.find((item) => item.id === productId);

    let badge = productCard.querySelector(".cart-badge-small");

    if (currentItem) {
      if (!badge) {
        badge = document.createElement("div");
        badge.className = "cart-badge-small";

        const quantity = document.createElement("span");
        quantity.className = "quantity";

        const increaseButton = document.createElement("button");
        increaseButton.className = "in-btn";
        increaseButton.type = "button";
        increaseButton.textContent = "+";

        const decreaseButton = document.createElement("button");
        decreaseButton.className = "de-btn";
        decreaseButton.type = "button";
        decreaseButton.textContent = "-";

        badge.append(increaseButton, quantity, decreaseButton);
        productCard.appendChild(badge);
      }

      const quantity = badge.querySelector(".quantity");
      quantity.textContent = currentItem.num;
    } else if (badge) {
      badge.remove();
    }
  });
}

prolist.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-btn");

  if (!addButton) return;

  const productId = Number(addButton.dataset.productId);
  addToBag(productId);
});

prolist.addEventListener("click", (event) => {
  const increaseButton = event.target.closest(".in-btn");
  const decreaseButton = event.target.closest(".de-btn");

  if (!increaseButton && !decreaseButton) return;

  const productCard = event.target.closest(".product");
  const productId = Number(productCard.dataset.proID);

  const currentItem = cart.find((item) => item.id === productId);

  if (!currentItem) return;

  if (increaseButton) {
    currentItem.num += 1;
  }

  if (decreaseButton) {
    currentItem.num -= 1;

    if (currentItem.num === 0) {
      const cartIndex = cart.findIndex((item) => item.id === productId);
      cart.splice(cartIndex, 1);
    }
  }

  renderCart();
});

cartItemsContainer.addEventListener("click", (event) => {
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

displayPro();
renderCart();
