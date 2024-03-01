// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making function
function ready() {
  // remove items from cards
  let removeCartButtons = document.getElementsByClassName("cart-remover");
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //   Quantity Changes
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }

  //   Add to Cart
  let addCart = document.getElementsByClassName("add-cart ");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClick);
  }

  //Buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClick);
}

// Buy Button
function buyButtonClick() {
  alert("Your order is placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Remove items from carts
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity Change
function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to Cart
function addCartClick(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  //   console.log(title, price, productImg);
  updateTotal();
}

// Add product To Cart
function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    alert("You have already add this item to cart");
    return;
  }
}

let cartBoxContent = ` <img src="${productImg}" alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
</div>
<!-- Remove Cart -->

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="cart-remover"
  id="cart-remover"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  />
</svg> `;

// let cartBoxContent = `     <img src="${productImg}" alt="" class="product-img" />
// <div class="detail-box">
//   <div class="cart-product-title">${title}</div>
//   <div class="cart-product-price">${price}</div>
//   <input type="number" value="1" class="cart-quantity" />
// </div>

// <!-- Remove Cart -->

// <svg
// xmlns="http://www.w3.org/2000/svg"
// fill="none"
// viewBox="0 0 24 24"
// stroke-width="1.5"
// stroke="currentColor"
// class="cart-remover"
// id="cart-remover"
// >
// <path
//   stroke-linecap="round"
//   stroke-linejoin="round"
//   d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
// />
// </svg>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
  .getElementsByClassName("cart-remover")[0]
  .addEventListener("click", removeCartItem);

cartShopBox
  .getElementsByClassName("cart-quantity")[0]
  .addEventListener("change", quantityChange);

// Update Total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("Af", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }

  // If price has some changes پول میده یا اعشاری
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "Af" + total;
}

// Accordion
function showDetail() {
  let element = document.getElementById("item");
  let details = document.getElementById("hidden-box");
  element.addEventListener("mouseover", function () {
    details.style.display = "block";
  });

  element.addEventListener("mouseout", function () {
    details.style.display = "none";
  });
}
showDetail();

// Swap the books
// Swapper
// let Swiper1 = document.getElementById("swiper1");
// let Swiper2 = document.getElementById("swiper2");

// Swiper1.addEventListener("click", function () {
//   document.getElementById("p1").innerHTML = "<img src='gallery/gallery-1.jpg'>";
//   document.getElementById("p2").innerHTML = "<img src='gallery/gallery-2.jpg'>";
//   document.getElementById("p3").innerHTML = "<img src='gallery/gallery-3.jpg'>";
//   document.getElementById("p4").innerHTML = "<img src='gallery/gallery-4.jpg'>";
//   document.getElementById("p5").innerHTML = "<img src='gallery/gallery-5.jpg'>";
//   document.getElementById("p6").innerHTML = "<img src='gallery/gallery-6.jpg'>";
//   document.getElementById("p7").innerHTML = "<img src='gallery/gallery-7.jpg'>";
//   document.getElementById("p8").innerHTML = "<img src='gallery/gallery-8.jpg'>";
//   document.getElementById("swiper1").style.backgroundColor = "#024430";
//   document.getElementById("swiper1").style.width = "15px";
//   document.getElementById("swiper2").style.width = "10px";
//   document.getElementById("swiper2").style.backgroundColor = "#FFFFFF";
// });

// Swiper2.addEventListener("click", function () {
//   document.getElementById("p1").innerHTML = "<img src='1.png'>";
//   document.getElementById("p2").innerHTML = "<img src='2.png'>";
//   document.getElementById("p3").innerHTML = "<img src='3.png'>";
//   document.getElementById("p4").innerHTML = "<img src='4.png'>";
//   document.getElementById("p5").innerHTML = "<img src='5.png'>";
//   document.getElementById("p6").innerHTML = "<img src='6.png'>";
//   document.getElementById("p7").innerHTML = "<img src='logo.png'>";
//   document.getElementById("p8").innerHTML = "<img src='apple.png'>";
//   document.getElementById("swiper2").style.backgroundColor = "#024430";
//   document.getElementById("swiper2").style.width = "15px";
//   document.getElementById("swiper1").style.backgroundColor = "#FFFFFF";
//   document.getElementById("swiper1").style.width = "10px";
// });
