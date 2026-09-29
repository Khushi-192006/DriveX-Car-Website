function addToCart(name, price, image) {
  const car = {
    name: name,
    price: price,
    image: image,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const alreadyAdded = cart.some((item) => item.name === name);

  if (alreadyAdded) {
    alert("This car is already in your cart!");
    return;
  }

  cart.push(car);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  window.location.href = "cart.html";
}
function showCart() {
  const cartItems = document.getElementById("cart-items");

  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    let total = 0;
    const cart = JSON.parse(savedCart);

    cartItems.innerHTML = "";

    cart.forEach((car, index) => {
      total += Number(car.price);
      cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${car.image}" alt="${car.name}">

                    <div class="cart-item-details">

                        <span>FEATURED CAR</span>

                        <h2>${car.name}</h2>

                        <h3>₹${Number(car.price).toLocaleString("en-IN")}</h3>

                    </div>
                        <button class="remove-button" onclick="removeFromCart(${index})">
                            Remove
                         </button>

                </div>
            `;
    });
    document.getElementById("cart-subtotal").textContent =
      "₹" + total.toLocaleString("en-IN");

    document.getElementById("cart-total").textContent =
      "₹" + total.toLocaleString("en-IN");
  } else {
    cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;
  }
}
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

   updateCartCount(); 
  showCart();
}
if (document.getElementById("cart-items")) {
  showCart();
}
function goToCheckout() {
  window.location.href = "checkout.html";
}

function showCheckout() {
  const checkoutItems = document.getElementById("checkout-items");

  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    const cart = JSON.parse(savedCart);

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach((car) => {
      total += Number(car.price);

      checkoutItems.innerHTML += `
                <div class="checkout-item">

                    <h3>${car.name}</h3>

                    <p>₹${Number(car.price).toLocaleString("en-IN")}</p>

                </div>
            `;
    });

    document.getElementById("checkout-total").textContent =
      "₹" + total.toLocaleString("en-IN");
  } else {
    checkoutItems.innerHTML = `
            <p style="color: #BBE1FA;">
                Your cart is empty.
            </p>
        `;

    document.getElementById("checkout-total").textContent = "₹0";
  }
}

if (document.getElementById("checkout-items")) {
  showCheckout();
}
function placeOrder() {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;

  if (name === "" || mobile === "" || address === "") {
    alert("Please fill all customer details.");
    return;
  }

  alert("Order placed successfully!");

  localStorage.removeItem("cart");
  updateCartCount();

  document.getElementById("order-success").style.display = "block";
}
function toggleDetails(id) {
  const details = document.getElementById(id);

  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    details.style.display = "block";
  }
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}
updateCartCount();