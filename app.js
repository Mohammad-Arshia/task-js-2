const proName = document.getElementById("name");
const proCategory = document.getElementById("category");
const proDescription = document.getElementById("description");
const proPrice = document.getElementById("price");
const proImage = document.getElementById("image");
const proTag = document.getElementById("tag");
const addproBtn = document.getElementById("add-btn");

let products = JSON.parse(localStorage.getItem("products")) || [];

function addpro() {
  if (
    !proName.value.trim() ||
    !proCategory.value.trim() ||
    !proDescription.value.trim() ||
    !proPrice.value.trim() ||
    !proImage.value.trim() ||
    !proTag.value.trim()
  ) {
    alert("فیلد هارو چک انگار جا انداختی");
    return;
  }

  const newproduct = {
    id: Date.now(),
    name: proName.value,
    category: proCategory.value,
    description: proDescription.value,
    price: Number(proPrice.value),
    image: proImage.value,
    tag: proTag.value,
  };

  products.push(newproduct);
  localStorage.setItem("products", JSON.stringify(products));
  displayPro();

  proName.value = "";
  proCategory.value = "";
  proDescription.value = "";
  proPrice.value = "";
  proImage.value = "";
  proTag.value = "";
}

addproBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addpro();
});

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

const cart = [];

const cartItemsContainer = document.getElementById("cartList");
const cartCount = document.getElementById("cartBadge");
const cartTitleCount = document.getElementById("cartItemsContainer");
const cartEmpty = document.getElementById("cartEmpty");
const subtotal = document.getElementById("subtotal");
const clearCartButton = document.getElementById("clearBtn");

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

prolist.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-btn");

  if (!addButton) return;

  const productId = Number(addButton.dataset.productId);

  addToBag(productId);
});

function renderCart() {
  cartItemsContainer.replaceChildren();

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
  } else {
    cartEmpty.style.display = "none";
  }

  const cartElements = cart.map((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const productName = document.createElement("span");
    productName.textContent = product.name;

    const productnum = document.createElement("span");
    productnum.textContent = `* ${product.num}`;

    const productPrice = document.createElement("span");
    productPrice.textContent = "$" + product.price * product.num;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.dataset.cartIndex = index;
    removeButton.textContent = "Remove";
    removeButton.type = "button";

    cartItem.append(productName, productnum, productPrice, removeButton);

    return cartItem;
  });

  cartItemsContainer.append(...cartElements);

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
        productCard.appendChild(badge);
      }

      badge.textContent = `${currentItem.num} عدد در سبد`;
    } else if (badge) {
      badge.remove();
    }
  });
}

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

renderCart();
displayPro();
