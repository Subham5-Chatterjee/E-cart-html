fetch("data/product.json")
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementById("CollectionList");
    const productList2 = document.getElementById("CollectionList2");

    if(!productList || !productList2) return;

    console.log("data.products", data.products);
    const saleLive = data.products.slice(0, 8);
    const  bestSeller = data.products.slice(0, 8);
    
    const filterProducts = data.products?.filter((item) => item.featured);

    console.log("filter", filterProducts);

    saleLive.forEach((product) => {
      const div = document.createElement("div");
      div.className = "col-6 col-md-3"
      div.innerHTML = `
                            <div class="card new-product-card">
                                <img src="${product.thumbnail_image}" class="product-image" alt="${product.name}">
                                <div class="card-body">
                           <h6 class="text-primary text-left"  onclick='viewProduct(${JSON.stringify(
                    product
                  )})'>${product.name}</h6>
                                    <div class="hr"></div>
                                    <div class="price d-flex justify-content-between align-items-start">
                                        <div class="left_price_details text-start">
                                            <h5>$${product.sale_price}</h5>
                                            <div>
                                                <span class="price-old">$${product.regular_price}</span>
                                                <span class="price-discount">60% off</span>
                                            </div>
                                        </div>
                                        <div class="right_price_details">
                                            <div class="rating mt-0">
                                                <i class="bi bi-star-fill"></i>
                                                <!--<i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-half"></i>-->
                                                <small class="text-muted">${product.review?.rating}</small>
                                            </div>
                                            <div class="d-flex justify-content-end mt-2 gap-2">
                                                <button onclick="addToCart('${product.id}')"0 class="btn btn-outline-primary icon-btnp">
                                                    <i class="bi bi-bag"></i>
                                                </button>
                                                <button class="btn btn-outline-secondary icon-btnp" onclick="wishList('${product.id}')">
                                                    <i class="bi bi-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
        `;
        productList.appendChild(div);
    });
    bestSeller.forEach((product) => {
      const div = document.createElement("div");
      div.className = "swiper-slide"
      div.innerHTML = `
                        <div class="card new-product-card">
                                <img src="${product.thumbnail_image}" class="product-image" alt="${product.name}">
                                <div class="card-body">
                                    <h6 class="text-primary text-left" onclick='viewProduct(${JSON.stringify(
                    product
                  )})'>${product.name}</h6>
                                    <div class="hr"></div>
                                    <div class="price d-flex justify-content-between align-items-start">
                                        <div class="left_price_details text-start">
                                            <h5>$${product.sale_price}</h5>
                                            <div>
                                                <span class="price-old">$${product.regular_price}</span>
                                                <span class="price-discount">60% off</span>
                                            </div>
                                        </div>
                                        <div class="right_price_details">
                                            <div class="rating mt-0">
                                                <i class="bi bi-star-fill"></i>
                                                <!--<i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-half"></i>-->
                                                <small class="text-muted">${product.review?.rating}</small>
                                            </div>
                                            <div class="d-flex justify-content-end mt-2 gap-2">
                                                <button onclick="addToCart('${product.id}')" class="btn btn-outline-primary icon-btnp">
                                                    <i class="bi bi-bag"></i>
                                                </button>
                                                <button class="btn btn-outline-secondary icon-btnp" onclick="wishList('${product.id}')">
                                                    <i class="bi bi-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
        `;
        productList2.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error loading products:", error);
  });
//Add to Cart
function addToCart(productId) {
  fetch("data/product.json")
    .then((response) => response.json())
    .then((data) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
     const product = data.products.find((p) => p.id === productId);
      const cartCounter = document.getElementById("cartCount");
      if (product) {
        const existing = cart.find((item) => item.id === productId);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        cartCounter.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
        // alert(`${product.name} added to cart.`);
        console.log("cart", cart.length);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}


//wishlist
function wishList(productId) {
  fetch("data/product.json")
    .then((response) => response.json())
    .then((data) => {
      let wishlist = JSON.parse(localStorage.getItem("wishstore")) || [];
      const product = data.products.find((wish) => wish.id === productId);
      const wishCounter = document.getElementById("wishCount");
      const icon = document.getElementById(`wish-icon-${productId}`); // get the icon

      if (product) {
        const existing = wishlist.find((item) => item.id === productId);

        if (existing) {
          alert("Product is already in your wishlist!");
        } else {
          wishlist.push(product);
          alert("Product added to your wishlist!");

          // Change icon color by adding a class
          if (icon) {
            icon.classList.add("active-wishlist");
          }
        }

        wishCounter.textContent = wishlist.length;
        localStorage.setItem("wishstore", JSON.stringify(wishlist));

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishstore")) || [];
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("wishCount").textContent = wishlist.length;
});




//Buy Now
//function buyNow(productId) {
 // let products = JSON.parse(localStorage.getItem("cart")) || [];
 // const product = products.find((p) => p.id === productId);
 // if (product) {
 //   alert(`Redirecting to checkout for ${product.name}...`);
  //  window.location.href = `/checkout.html?productId=${product.id}`;
 // }
//}
//document.addEventListener("DOMContentLoaded", () => {
 // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //document.getElementById("cartCount").textContent = cart.length;
//});

//Cart Page
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cartItems");
  const totalPriceEl = document.querySelector(".totalPrice");
  const cartTotal = document.querySelector(".cartTotal");
  const shipping = document.getElementById("shipping");
  let shippingCharges = 5.00;
  
  shipping.textContent = shippingCharges.toFixed(2);
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartData || cartData.length === 0) {
    cartContainer.innerHTML = `
    <td colspan="4" class="overflow-hidden">
      <div class="row justify-content-center">
        <div class="col-12 text-center py-5">
          <img src="images/cart.png" alt="Empty Cart" style="max-width: 150px; opacity: 0.6;" />
          <h4 class="mt-3">Your cart is empty</h4>
          <a href="/" class="btn btn-outline-dark mt-3">Continue Shopping</a>
        </div>
      </div></td>
    `;
    totalPriceEl.textContent = 0;
    return;
  }

  let total = 0;
  cartData.forEach((item, index) => {
    const itemTotal = item.sale_price * item.quantity;
    total += itemTotal;

    console.log('itemTotal', itemTotal);

    const cartItemHtml = `
        <tr>
          <td>
              <div class="d-flex align-items-center">
                  <button class="btn btn-sm btn-light me-2 text-danger border border-0 delete-btn" data-id="${item.id}">
                      <strong>×</strong>
                  </button>
                  <img src="${item.thumbnail_image}" alt="${item.name}" class="img-fluid cart_image">
                  <div class="ms-3 cart_product_info">
                      <p class="mb-0">${item.name}</p>
                  </div>
              </div>
          </td>
          <td>
              <span class="text-muted strike me-1">$${item.regular_price}</span>
              <strong>$${item.sale_price}</strong>
          </td>
          <td>
              <div class="quantity-selector">
                  <button class="btn-minus" data-id="${item.id}">-</button>
                  <input type="text" value="${item.quantity}" readonly />
                  <button class="btn-plus" data-id="${item.id}">+</button>
              </div>
          </td>
          <td><strong><span>$${itemTotal}</span></strong></td>
      </tr>
      `;

    cartContainer.insertAdjacentHTML("beforeend", cartItemHtml);
  });

  totalPriceEl.textContent = total;
  cartTotal.textContent = total + shippingCharges;

  // === Event Handlers: Increment, Decrement, Delete ===
  document.addEventListener("click", function (e) {
    const target = e.target;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log(target);

    // Plus button
    if (target.classList.contains("btn-plus")) {
      const id = target.dataset.id;
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      }
    }

    // Minus button
    if (target.classList.contains("btn-minus")) {
      const id = target.dataset.id;
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1 && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      }
    }

    // Delete button (Fix here)
    const deleteBtn = target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });
});

//product-listing Page
document.addEventListener("DOMContentLoaded", function () {
  fetch("data/product.json")
    .then((res) => res.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      if(!productList) return ;
      //   const paginationContainer = document.getElementById("pagination");
      //   const productsPerPage = 4;
      //   let currentPage = 1;
      //   let productsData = [];

      const listHTML = products.products.map((item) => {
        return `<div class="col-6 col-md-3 mb-4">
                  <div class="card new-product-card" id="productList">
                    <a href="/product-details.html" onclick='viewProduct(${JSON.stringify(
                item
              )})'><img src="${item.thumbnail_image}" class="product-image" alt="${item.name}"></a>
                    <div class="card-body">
                        <h6 class="text-primary text-left">${item.name}</h6>
                        <div class="hr"></div>
                        <div class="price d-flex justify-content-between align-items-start">
                            <div class="left_price_details text-start">
                                <h5>$${item.regular_price}</h5>
                                <div>
                                    <span class="price-old">$${item.sale_price}</span>
                                    <span class="price-discount">60% off</span>
                                </div>
                            </div>
                            <div class="right_price_details">
                                <div class="rating mt-0">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-half"></i>
                                    <small class="text-muted">4.5</small>
                                </div>
                                <div class="d-flex justify-content-end mt-2 gap-2">
                                    <button onclick="addToCart('${item.id}')"  class="btn btn-outline-primary icon-btnp">
                                        <i class="bi bi-bag"></i>
                                    </button>
                                    <button class="btn btn-outline-secondary icon-btnp" onclick="wishList('${item.id}')">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
              </div>`
      }).join("");

      productList.innerHTML = listHTML;

    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
});


//Wishlist Page
document.addEventListener("DOMContentLoaded", function () {
  const wishlist = JSON.parse(localStorage.getItem("wishstore")) || [];

  const WishproductList = document.getElementById("wishlist-list");

  if(!WishproductList) return;

  const WishlistHTML = wishlist.map((product) => {
      return `<div class="col-12 col-md-4 col-lg-3 mb-4">
          <div class="card new-product-card">
            <a href="/product-details.html">
              <img src="${product.thumbnail_image}" class="product-image" alt="${product.name}">
            </a>
            <div class="card-body">
                <h6 class="text-primary text-left">${product.name}</h6>
                <div class="hr"></div>
                <div class="price d-flex justify-content-between align-items-start">
                    <div class="left_price_details text-start">
                        <h5>$${product.regular_price}</h5>
                        <div>
                            <span class="price-old">$${product.sale_price}</span>
                            <span class="price-discount">60% off</span>
                        </div>
                    </div>
                    <div class="right_price_details">
                        <div class="rating mt-0">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>
                            <small class="text-muted">4.5</small>
                        </div>
                        <div class="d-flex justify-content-end mt-2 gap-2">
                            <button data-id="${product.id}" class="btn btn-outline-primary icon-btnp addtocart-wishlist">
                                <i class="bi bi-bag"></i>
                            </button>
                            <button class="btn btn-outline-secondary icon-btnp delete-btn" data-id="${product.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>`;
    })
    .join("");

  WishproductList.innerHTML = WishlistHTML;

  
});
// === addtocart from Wishlist ===
document.addEventListener("click", function (e) {
  const addToCartBtn = e.target.closest(".addtocart-wishlist");
  if (!addToCartBtn) return;
  const productId = addToCartBtn.dataset.id;
  if (!productId) return;
  let wishlist = JSON.parse(localStorage.getItem("wishstore")) || [];
  const productToAdd = wishlist.find(item => item.id === productId);
  if (!productToAdd) return;
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem("wishstore", JSON.stringify(updatedWishlist));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const alreadyInCart = cart.some(item => item.id === productId);
  if (!alreadyInCart) {
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  location.reload();
});



// === Delete from Wishlist ===
document.addEventListener("click", function (e) {
  let wishlist = JSON.parse(localStorage.getItem("wishstore")) || [];
  const deleteBtn = e.target.closest(".delete-btn");
  if(!deleteBtn) return;
  console.log('deleteBtn', deleteBtn);
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    console.log(id);
   const resultWishlist = wishlist.filter((itemId) => itemId.id !== id);
    console.log('resultWishlist', resultWishlist);
    localStorage.setItem("wishstore", JSON.stringify(resultWishlist));
    location.reload();
  }
});

//single Product Page
//Store Product Details in Local Storage by specific ID
function viewProduct(product) {
  localStorage.setItem("singleProduct", JSON.stringify(product));
}

//Thank you

document.addEventListener("DOMContentLoaded", function () {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  console.log(orderDetails);

  if (orderDetails && orderDetails.formData && orderDetails.orderSummary) {
    const { formData, orderSummary } = orderDetails;
    document.getElementById("customerName").textContent = formData.fullname;
    document.getElementById("address").textContent = `${formData.address}, ${formData.city}, ${formData.country}, ${formData.postalCode}`;
   document.getElementById("phone").textContent = formData.phone;
    document.getElementById("emailInfo").textContent = formData.email;
    document.getElementById("paymentMethod").textContent = orderSummary.paymentMethod;
    document.getElementById("totalPrice").textContent = `${orderSummary?.total}`;
  } else {
    console.warn("No order details found in localStorage.");
  }
});
