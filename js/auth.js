// auth.js

function showRegister() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('registerBox').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerBox').style.display = 'none';
  document.getElementById('loginBox').style.display = 'block';
}

function resetPassword() {
  alert('Please contact your system administrator to reset your password.');
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const code = document.getElementById('login2FA').value.trim();
  
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username].password === password) {
    if (users[username].role !== "Member") {
      document.getElementById('login2FA').style.display = 'block';
      if (code !== '1234') {
        alert('Invalid 2FA Code!');
        return;
      }
    }
    sessionStorage.setItem('loggedInUser', username);
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials!');
  }
}

function register() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!username || !password) {
    alert('Please fill out all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    alert('Username already exists.');
    return;
  }

  users[username] = { password: password, role: "Member", theme: "light" };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! Please login.');
  showLogin();
}

// For Admin Create User inside Dashboard
function createUser() {
  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const role = document.getElementById('newRole').value;

  if (!username || !password) {
    alert('Please fill out all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    alert('Username already exists.');
    return;
  }

  users[username] = { password: password, role: role, theme: "light" };
  localStorage.setItem('users', JSON.stringify(users));
  alert('User created successfully!');

  document.getElementById('newUsername').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('newRole').value = 'Member';

  renderUsersTable();
}
