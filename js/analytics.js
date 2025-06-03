// analytics.js

function renderSummary() {
  const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || {};

  const totalAssets = inventory.length;
  const approvedAssets = inventory.filter(item => item.status === "approved").length;
  const pendingAssets = inventory.filter(item => item.status === "pending").length;

  const summary = `
    <h3>Summary</h3>
    <p>Total Assets: ${totalAssets}</p>
    <p>Approved Assets: ${approvedAssets}</p>
    <p>Pending Assets: ${pendingAssets}</p>
  `;
  document.getElementById('summaryStats').innerHTML = summary;
}

function renderCharts() {
  const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || {};

  const approved = inventory.filter(item => item.status === "approved").length;
  const pending = inventory.filter(item => item.status === "pending").length;

  const roles = {
    Owner: 0,
    Admin: 0,
    Member: 0
  };

  Object.values(users).forEach(u => {
    roles[u.role] = (roles[u.role] || 0) + 1;
  });

  // Inventory Chart
  const ctx1 = document.getElementById('inventoryChart').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Approved', 'Pending'],
      datasets: [{
        label: 'Assets',
        data: [approved, pending],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    }
  });

  // Users Chart
  const ctx2 = document.getElementById('usersChart').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Owner', 'Admin', 'Member'],
      datasets: [{
        label: 'Users',
        data: [roles.Owner, roles.Admin, roles.Member],
        backgroundColor: ['#f1c40f', '#3498db', '#9b59b6']
      }]
    }
  });
}
