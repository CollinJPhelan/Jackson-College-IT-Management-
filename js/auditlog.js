// auditlog.js

function logAction(action) {
  const logs = JSON.parse(localStorage.getItem('auditlogs')) || [];
  const user = sessionStorage.getItem('loggedInUser') || 'Unknown';
  const timestamp = new Date().toLocaleString();
  
  logs.unshift({
    action,
    user,
    timestamp
  });

  localStorage.setItem('auditlogs', JSON.stringify(logs));
}

function renderAuditTable() {
  const logs = JSON.parse(localStorage.getItem('auditlogs')) || [];
  const search = document.getElementById('searchAudit')?.value.toLowerCase() || '';

  const tbody = document.querySelector('#auditTable tbody');
  tbody.innerHTML = '';

  logs
    .filter(log => log.action.toLowerCase().includes(search) || log.user.toLowerCase().includes(search))
    .forEach(log => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${log.action}</td>
        <td>${log.user}</td>
        <td>${log.timestamp}</td>
      `;
      tbody.appendChild(row);
    });
}
