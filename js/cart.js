const getCounts = () => {
  const cart = getFromStorage("cart");

  $("#cart-count").text(cart.reduce((acc, item) => acc + item.quantity, 0));
};

const addToCart = () => {
  $(".add-to-cart")
    .off("click")
    .on("click", function () {
      const id = $(this).attr("data-id");
      const name = $(this).attr("data-name");
      const image = $(this).attr("data-image");
      const price = parseInt($(this).attr("data-price"));

      const cart = getFromStorage("cart");
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        cart.push({ id, name, image, quantity: 1, price, total: price });
      }

      setToLocalStorage("cart", cart);
      getCounts();
      renderCartsItems();
    });
};

const removeFromCart = () => {
  $(".remove-from-cart")
    .off("click")
    .on("click", function () {
      const id = $(this).attr("data-id");
      const cart = getFromStorage("cart");
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity -= 1;
        existingItem.total =
          parseInt(existingItem.price) * existingItem.quantity;

        if (existingItem.quantity === 0) {
          cart.splice(cart.indexOf(existingItem), 1);
        }
      }

      setToLocalStorage("cart", cart);
      getCounts();
      renderCartsItems();
    });
};

const clearCart = () => {
  $("#clear-cart").click(function () {
    localStorage.removeItem("cart");
    getCounts();
  });
};

const renderCartsItems = () => {
  const cart = getFromStorage("cart");
  const cartItems = $("#cart-items");
  const checkOutButton = $("#checkout-btn");

  checkOutButton.prop("disabled", cart.length < 1);

  if (!cart || cart.length < 1) {
    cartItems.html(`<p class="fs-5">Your cart is empty.</p>`);
    $("#grand-total").text(`฿ 0`);
  } else {
    cartItems.empty();

    cart.forEach((item) => {
      cartItems.append(`
           <div
                 class="d-flex justify-content-between align-items-end bg-light p-2 rounded-2 mb-2"
               >
                 <div class="w-75 d-flex justify-content-start align-items-center">
                   <div
                     class="me-3 overflow-hidden h-100 bg-dark"
                     style="width: 30%"
                   >
                     <img
                       src="${item.image}"
                       alt=""
                       class="w-100 h-100"
                     />
                   </div>
                   <div class="w-75 h-100">
                     <p class="fs-5 text-clip-2-lines">${item.name}</p>
                     <p class="fs-6 text-muted">฿ ${item.price}</p>
                     <div
                       class="w-100 d-flex justify-content-start align-items-center h-100 gap-2"
                     >
                       <button class="btn btn-warning remove-from-cart" data-id="${item.id}">
                         -
                       </button>
                       <div class="btn btn-outline-dark">
                         <p class="m-0">${item.quantity}</p>
                       </div>
                       <button class="btn btn-dark add-to-cart" data-id="${item.id}">
                         +
                       </button>
                     </div>
                   </div>
                 </div>
                 <div>
                   <p class="fs-4 fw-semibold">฿ ${item.total}</p>
                 </div>
               </div>
         `);
    });

    $("#grand-total").text(
      `฿ ${cart.reduce((acc, item) => acc + item.total, 0)}`
    );

    // Rebind click events after rendering
    addToCart();
    removeFromCart();
  }
};

const render = () => {
  addToCart();
  removeFromCart();
  clearCart();
};

$(document).ready(function () {
  getCounts();
  render();
});
