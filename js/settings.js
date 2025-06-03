// settings.js

window.addEventListener('DOMContentLoaded', () => {
  const userKey = sessionStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const role = users[userKey]?.role || 'Member';

  if (!["Admin", "Owner"].includes(role)) {
    document.getElementById('exportBtn')?.remove();
    document.getElementById('importFile')?.remove();
    document.getElementById('clearUsersBtn')?.remove();
    document.getElementById('clearInventoryBtn')?.remove();
    document.getElementById('clearLogsBtn')?.remove();
  }
});

function exportBackup() {
  const backup = {
    users: JSON.parse(localStorage.getItem('users')) || {},
    inventory: JSON.parse(localStorage.getItem('inventory')) || [],
    auditlogs: JSON.parse(localStorage.getItem('auditlogs')) || [],
    notifications: JSON.parse(localStorage.getItem('notifications')) || []
  };

  const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'jc_it_asset_backup.json';
  a.click();
  URL.revokeObjectURL(url);

  showNotification('Backup exported!', 'success');
  logAction('Backup exported.');
}

function importBackup() {
  const file = document.getElementById('importFile').files[0];
  if (!file) {
    alert('No file selected.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const backup = JSON.parse(e.target.result);
    localStorage.setItem('users', JSON.stringify(backup.users));
    localStorage.setItem('inventory', JSON.stringify(backup.inventory));
    localStorage.setItem('auditlogs', JSON.stringify(backup.auditlogs));
    localStorage.setItem('notifications', JSON.stringify(backup.notifications));
    showNotification('Backup imported successfully! Please reload.', 'success');
    logAction('Backup imported.');
  };
  reader.readAsText(file);
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');

  const userKey = sessionStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[userKey]) {
    users[userKey].theme = body.classList.contains('dark-theme') ? "dark" : "light";
    localStorage.setItem('users', JSON.stringify(users));
    showNotification("Theme updated!", "success");
  }
}

function confirmClearUsers() {
  if (confirm('Are you sure you want to clear all users?')) {
    localStorage.removeItem('users');
    showNotification('All users cleared.', 'error');
    renderUsersTable();
    logAction('Cleared all users.');
  }
}

function confirmClearInventory() {
  if (confirm('Are you sure you want to clear all inventory?')) {
    localStorage.removeItem('inventory');
    showNotification('All inventory cleared.', 'error');
    renderInventoryTable();
    logAction('Cleared all inventory.');
  }
}

function confirmClearAuditLogs() {
  if (confirm('Are you sure you want to clear all audit logs?')) {
    localStorage.removeItem('auditlogs');
    showNotification('All audit logs cleared.', 'error');
    renderAuditTable();
    logAction('Cleared all audit logs.');
  }
}

function resetOwnPassword() {
  const newPassword = document.getElementById("newPassword").value.trim();
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!newPassword || newPassword.length < 4) {
    showNotification("Password must be at least 4 characters", "error");
    return;
  }

  if (users[loggedInUser]) {
    users[loggedInUser].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    logAction(`User ${loggedInUser} updated their own password`);
    showNotification("Password updated successfully", "success");
    document.getElementById("newPassword").value = "";
  }
}
