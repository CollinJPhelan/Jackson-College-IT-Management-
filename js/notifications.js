// notifications.js

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);

  // Save to history (localStorage)
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.unshift({
    message,
    type,
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  renderNotificationDropdown();
}

function renderNotificationDropdown() {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const list = document.getElementById('notificationList');
  
  list.innerHTML = notifications.length === 0
    ? "<div style='padding:10px;'>No notifications</div>"
    : notifications.map(n => `<div style="padding:10px;border-bottom:1px solid #eee;">${n.message} <br><small>${n.timestamp}</small></div>`).join('');
}

function updateNotificationCount() {
  const count = JSON.parse(localStorage.getItem('notifications'))?.length || 0;
  document.getElementById('notificationCount').innerText = count;
}

function clearNotifications() {
  if (confirm('Clear all notifications?')) {
    localStorage.removeItem('notifications');
    updateNotificationCount();
    toggleNotifications(); // hide dropdown
    showNotification('All notifications cleared.', 'success');
  }
}

// Update count on load
window.addEventListener('load', updateNotificationCount);

