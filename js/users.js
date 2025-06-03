// users.js

const roleOptions = ["Member", "Support", "Tech", "Manager", "Admin", "Owner"];

function renderUsersTable() {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const currentUser = sessionStorage.getItem('loggedInUser');
  const currentRole = users[currentUser]?.role || "Member";

  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';

  Object.keys(users).forEach(username => {
    const role = users[username].role || "Member";

    const roleDropdown = `
      <select onchange="changeRole('${username}', this.value)">
        ${roleOptions.map(r =>
          `<option value="${r}" ${r === role ? 'selected' : ''}>${r}</option>`
        ).join('')}
      </select>`;

    const resetBtn = (["Admin", "Owner"].includes(currentRole) && username !== currentUser)
      ? `<button onclick="resetPassword('${username}')">Reset Password</button>`
      : '';

    const deleteBtn = (["Admin", "Owner"].includes(currentRole) && username !== currentUser)
      ? `<button onclick="deleteUser('${username}')">Delete</button>`
      : '';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${username}</td>
      <td>${roleDropdown}</td>
      <td>
        ${resetBtn}
        ${deleteBtn}
      </td>
    `;
    tbody.appendChild(row);
  });
}

function changeRole(username, newRole) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    users[username].role = newRole;
    localStorage.setItem('users', JSON.stringify(users));
    showNotification(`Updated role for ${username} to ${newRole}`, 'success');
    logAction(`Changed role of ${username} to ${newRole}`);
    renderUsersTable();
  }
}

function deleteUser(username) {
  if (!confirm(`Delete user ${username}?`)) return;
  const users = JSON.parse(localStorage.getItem('users')) || {};
  delete users[username];
  localStorage.setItem('users', JSON.stringify(users));
  showNotification(`Deleted user ${username}`, 'error');
  logAction(`Deleted user: ${username}`);
  renderUsersTable();
}

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

  users[username] = {
    password: password,
    role: role,
    theme: "light"
  };

  localStorage.setItem('users', JSON.stringify(users));
  showNotification(`User "${username}" created.`, "success");
  logAction(`Created new user: ${username} (${role})`);

  document.getElementById('newUsername').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('newRole').value = 'Member';

  renderUsersTable();
}

function resetPassword(username) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (!users[username]) return;

  const newPassword = `${username}123!`;
  users[username].password = newPassword;

  localStorage.setItem('users', JSON.stringify(users));
  showNotification(`Password reset for ${username}. New password: ${newPassword}`, 'success');
  logAction(`Reset password for ${username}`);
}
