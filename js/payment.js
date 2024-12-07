// Simulate Payment Submission
document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Get the cart and logged-in user
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (!loggedInUser) {
      alert('You must log in to complete the payment.');
      window.location.href = '/html/login.html';
      return;
    }
  
    if (cart.length === 0) {
      alert('Your cart is empty.');
      window.location.href = '/html/product.html';
      return;
    }
  
    // Get payment form inputs
    const name = document.getElementById('name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
  
    // Validate inputs
    if (!name || !cardNumber || !expiry || !cvv) {
      alert('Please fill in all payment details.');
      return;
    }
  
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert('Invalid card number. It must be 16 digits.');
      return;
    }
  
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert('Invalid CVV. It must be 3 digits.');
      return;
    }
  
    // Simulate payment success
    alert('Payment successful! Thank you for your purchase.');
  
    // Clear the cart and redirect to the homepage
    localStorage.removeItem('cart');
    window.location.href = '/html/index.html';
  });
  
  // Render Cart Summary
  function renderCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = document.getElementById('cart-summary');
  
    if (cart.length === 0) {
      cartSummary.innerHTML = '<p>Your cart is empty. Start shopping now!</p>';
      return;
    }
  
    let total = 0;
    let cartDetails = '<h2>Cart Summary</h2><ul>';
  
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartDetails += `
        <li>
          ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
        </li>
      `;
    });
  
    cartDetails += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    cartSummary.innerHTML = cartDetails;
  }
  
  // Load cart summary on page load
  document.addEventListener('DOMContentLoaded', renderCartSummary);