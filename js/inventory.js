// inventory.js

function getInventory() {
  return JSON.parse(localStorage.getItem('inventory')) || [];
}

function saveInventory(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

function addItem() {
  const tag = document.getElementById('itemTag').value.trim();
  const mac = document.getElementById('itemMAC').value.trim();
  const serial = document.getElementById('itemSerial').value.trim();
  const notes = document.getElementById('itemNotes').value.trim();
  const checkedOut = document.getElementById('itemCheckedOut').checked;

  if (!tag || !mac || !serial) {
    alert('Please fill out all required fields.');
    return;
  }

  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const dateAdded = new Date().toLocaleDateString();

  const newItem = {
    tag,
    mac,
    serial,
    notes,
    checkedOut,
    dateAdded,
    status: "pending",
    createdBy: loggedInUser
  };

  const inventory = getInventory();
  inventory.push(newItem);
  saveInventory(inventory);

  showNotification('Asset submitted for approval.', 'success');
  logAction(`Asset submitted for approval: Tag ${tag}`);

  document.getElementById('itemMAC').value = '';
  document.getElementById('itemTag').value = '';
  document.getElementById('itemSerial').value = '';
  document.getElementById('itemNotes').value = '';
  document.getElementById('itemCheckedOut').checked = false;

  renderPendingTable();
}

function renderInventoryTable() {
  const inventory = getInventory();
  const approvedItems = inventory.filter(item => item.status === "approved");

  const tbody = document.querySelector('#inventoryTable tbody');
  tbody.innerHTML = '';

  approvedItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.tag}</td>
      <td>${item.mac}</td>
      <td>${item.serial}</td>
      <td>${item.dateAdded}</td>
      <td>${item.notes}</td>
      <td>${item.checkedOut ? 'Checked Out' : 'Available'}</td>
      <td>
        <button onclick="toggleCheckedOut(${index})">${item.checkedOut ? 'Check In' : 'Check Out'}</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleCheckedOut(index) {
  const inventory = getInventory();
  const approvedItems = inventory.filter(item => item.status === "approved");

  const itemToToggle = approvedItems[index];

  const updatedInventory = inventory.map(item => {
    if (item.tag === itemToToggle.tag && item.serial === itemToToggle.serial) {
      return { ...item, checkedOut: !item.checkedOut };
    }
    return item;
  });

  saveInventory(updatedInventory);
  showNotification(itemToToggle.checkedOut ? 'Checked In asset!' : 'Checked Out asset!', 'success');
  logAction((itemToToggle.checkedOut ? 'Checked In' : 'Checked Out') + ` asset: Tag ${itemToToggle.tag}`);
  renderInventoryTable();
}

function renderPendingTable() {
  const inventory = getInventory();
  const pendingItems = inventory.filter(item => item.status === "pending");

  const tbody = document.querySelector('#pendingTable tbody');
  tbody.innerHTML = '';

  pendingItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.tag}</td>
      <td>${item.mac}</td>
      <td>${item.serial}</td>
      <td>${item.dateAdded}</td>
      <td>${item.notes}</td>
      <td>
        <button onclick="approveItem(${index})">Approve</button>
        <button onclick="rejectItem(${index})">Reject</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function approveItem(index) {
  const inventory = getInventory();
  const pendingItems = inventory.filter(item => item.status === "pending");
  const itemToApprove = pendingItems[index];

  const updatedInventory = inventory.map(item => {
    if (item.tag === itemToApprove.tag && item.serial === itemToApprove.serial) {
      return { ...item, status: "approved" };
    }
    return item;
  });

  saveInventory(updatedInventory);
  showNotification('Asset approved!', 'success');
  logAction(`Approved asset: Tag ${itemToApprove.tag}`);
  renderPendingTable();
  renderInventoryTable();
}

function rejectItem(index) {
  const inventory = getInventory();
  const pendingItems = inventory.filter(item => item.status === "pending");
  const itemToReject = pendingItems[index];

  const updatedInventory = inventory.filter(item => !(item.tag === itemToReject.tag && item.serial === itemToReject.serial));

  saveInventory(updatedInventory);
  showNotification('Asset rejected.', 'error');
  logAction(`Rejected asset: Tag ${itemToReject.tag}`);
  renderPendingTable();
}

function deleteItem(index) {
  if (!confirm('Are you sure you want to delete this asset?')) return;

  const inventory = getInventory();
  const approvedItems = inventory.filter(item => item.status === "approved");
  const itemToDelete = approvedItems[index];

  const updatedInventory = inventory.filter(item => !(item.tag === itemToDelete.tag && item.serial === itemToDelete.serial));

  saveInventory(updatedInventory);
  showNotification('Asset deleted.', 'error');
  logAction(`Deleted asset: Tag ${itemToDelete.tag}`);
  renderInventoryTable();
}
