// dashboard.js

function showSection(sectionId) {
  document.querySelectorAll('main section').forEach(section => {
    section.style.display = 'none';
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = 'block';
  }

  if (sectionId === 'users') renderUsersTable?.();
  if (sectionId === 'inventory') renderInventoryTable?.();
  if (sectionId === 'pending') renderPendingTable?.();
  if (sectionId === 'auditlogs') renderAuditTable?.();
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function renderWelcome() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[loggedInUser];

  document.getElementById('profile').innerText = `${loggedInUser} (${user.role})`;

  renderSummary();
  renderRecentActivity();
  renderStats();
}

function renderSummary() {
  document.getElementById('welcomeMessage').innerHTML = `
    <h2>Welcome back, ${sessionStorage.getItem('loggedInUser')}!</h2>
  `;
}

function renderStats() {
  const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || {};

  const totalAssets = inventory.filter(i => i.status === "approved").length;
  const pendingAssets = inventory.filter(i => i.status === "pending").length;
  const totalUsers = Object.keys(users).length;

  const assetsCard = document.getElementById('totalAssets');
  const pendingCard = document.getElementById('pendingAssets');
  const usersCard = document.getElementById('totalUsers');

  assetsCard.innerText = `Total Assets: ${totalAssets}`;
  pendingCard.innerText = `Pending Approvals: ${pendingAssets}`;
  usersCard.innerText = `Total Users: ${totalUsers}`;

  assetsCard.style.background = "#e0f7fa"; // Light Blue
  usersCard.style.background = "#e8f5e9"; // Light Green

  if (pendingAssets > 0) {
    pendingCard.style.background = "#ffebee"; // Light Red
    pendingCard.style.color = "#b71c1c"; // Deep red text
    pendingCard.style.fontWeight = "bold";
  } else {
    pendingCard.style.background = "#fff8e1"; // Light Yellow if no pending
    pendingCard.style.color = "black";
    pendingCard.style.fontWeight = "normal";
  }
}

function renderRecentActivity() {
  const logs = JSON.parse(localStorage.getItem('auditlogs')) || [];
  const recentLogs = logs.slice(-15).reverse(); // Last 15, newest first

  const container = document.getElementById('recentActivity');
  container.innerHTML = '';

  if (recentLogs.length === 0) {
    container.innerHTML = "<p>No recent activity.</p>";
    return;
  }

  recentLogs.forEach(log => {
    const item = document.createElement('div');
    item.innerHTML = `<strong>${log.action}</strong><br><small>${log.timestamp}</small>`;
    item.style.borderBottom = "1px solid #ccc";
    item.style.padding = "8px 0";
    container.appendChild(item);
  });
}

window.onload = function () {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = "index.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[loggedInUser];

  if (!user) {
    alert('Session invalid. Please log in again.');
    sessionStorage.clear();
    window.location.href = "index.html";
    return;
  }

  document.getElementById('profile').innerText = `${loggedInUser} (${user.role})`;

  // 🌙 Apply saved theme
  if (user.theme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // 🔐 Role-Based Access Control
  const role = user.role;

  // This block hides admin-only sections from non-admins
if (!["Admin", "Owner" , "Tech"].includes(role)) {
  const usersBtn = document.getElementById('users');
  const logsBtn = document.getElementById('auditlogs');

  if (usersBtn) usersBtn.remove();
  if (logsBtn) logsBtn.remove();

  const navButtons = document.querySelectorAll('nav button');
  if (navButtons[3]) navButtons[3].remove(); // User Management
  if (navButtons[5]) navButtons[5].remove(); // Audit Logs
}


  if (!["Owner", "Admin", "Manager"].includes(role)) {
    // Hide approval section
    const navButtons = document.querySelectorAll('nav button');
    if (navButtons[2]) navButtons[2].remove(); // Pending Approvals
    const pendingSection = document.getElementById('pending');
    if (pendingSection) pendingSection.remove();
  }

  renderWelcome();
};
