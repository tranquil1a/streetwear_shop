// Handle Sign Up
function handleSignUp(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert('All fields are required!');
    return;
  }

  // Retrieve existing users or initialize empty array
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email is already registered
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert('An account with this email already exists!');
    return;
  }

  // Add new user to users array
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users)); // Save to Local Storage

  alert('Account created successfully! You can now log in.');
  window.location.href = '/html/login.html'; // Redirect to login page
}

// Handle Log In
function handleLogIn(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Both email and password are required!');
    return;
  }

  // Retrieve users from Local Storage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Validate user credentials
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    alert('Invalid email or password!');
    return;
  }

  // Save logged-in user to Local Storage
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  alert(`Welcome, ${user.username}!`);
  window.location.href = '/html/private-cabinet.html'; // Redirect to private cabinet
}

// Check if User is Logged In
function checkLoggedInUser() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${loggedInUser.username}!`;
    }
  }

  // Update navigation links dynamically
  updateNavLinks();
}

// Handle Log Out
function handleLogOut() {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = '/html/login.html'; // Redirect to login page
}

// Dynamically update navigation links based on login state
function updateNavLinks() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Check if a user is logged in
  const authLinks = document.getElementById('auth-links');

  if (!authLinks) return; // Exit if no auth-links element exists

  if (loggedInUser) {
    // If logged in, show "Log Out" button
    authLinks.innerHTML = `
      <button onclick="handleLogOut()" class="logout-btn">Log Out</button>
    `;
  } else {
    // If not logged in, show "Account" link
    authLinks.innerHTML = `
      <a href="/html/login.html">Account</a>
    `;
  }
}

// Attach Event Listeners to Forms
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) signupForm.addEventListener('submit', handleSignUp);

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogIn);

  // Check user login state and update navigation links on page load
  checkLoggedInUser();
});