// Add item to cart
function addToCart(itemId, itemName, itemPrice, itemImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart count dynamically
  updateCartCount();

  if (!window.location.pathname.includes('cart.html')) {
    alert(`${itemName} added to cart!`);
  }

  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
}

// Render cart items on the cart page
function renderCart() {
  // Get the cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  const cartTotal = document.getElementById('cart-total');
  const proceedBtn = document.getElementById('proceed-to-payment');

  // Clear the cart display
  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    // If the cart is empty
    cartContainer.innerHTML = '<p>Your cart is empty. Start shopping now!</p>';
    proceedBtn.style.display = 'none';
    return;
  }

  // Loop through the cart and display each item
  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div>
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        <button class="add-btn" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}')">Add</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Update the total price
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Show the proceed to payment button if there are items in the cart
  proceedBtn.style.display = 'block';
}

function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const itemIndex = cart.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity -= 1;

    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart count dynamically
  updateCartCount();

  renderCart();
}

// Proceed to payment
function proceedToPayment() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Check if user is logged in

  if (loggedInUser) {
    // Redirect to payment page if logged in
    window.location.href = '/html/payment.html'; // Update with your payment page path
  } else {
    // Alert user to log in and redirect to login page
    alert('You must log in or sign up to proceed to payment.');
    window.location.href = '/html/login.html'; // Redirect to login page
  }
}

// Render the cart on page load if on the cart page
if (window.location.pathname.includes('cart.html')) {
  renderCart();
}

// Update cart count dynamically
function updateCartCount() {
  // Get the cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Calculate the total quantity of all items in the cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update the cart count in the sticky cart icon
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }
}

// Call this function on every page load
updateCartCount();