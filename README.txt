============================================
Jackson College IT Asset Management System
Enterprise Edition – Version 1.0
============================================

Developed for: Jackson College IT Department  
Status: Offline-ready | Role-based | LocalStorage-based  
Author: [Your Name or IT Admin]  
Date: April 2025


🧭 System Overview
------------------
This system is designed to manage IT assets across Jackson College. It allows role-based access for tracking, approving, and reporting on equipment issued to departments, staff, and students.

Works entirely offline using the browser's localStorage (no server/database required).


📦 Features
-----------
✔️ Secure Login + Member Registration  
✔️ Role-Based Access (Member / Admin / Owner)  
✔️ Admins can create new users and set roles  
✔️ Full Inventory Tracking System:  
   - Tag Number  
   - MAC Address  
   - Serial Number  
   - Notes  
   - Checked Out (toggleable)  
✔️ Members and Admins can add and check out/in items  
✔️ Pending Approval queue for new assets  
✔️ Audit Log of all actions  
✔️ Toast Notifications for system feedback  
✔️ Backup / Restore support (export/import JSON file)  
✔️ Analytics Dashboard with charts for inventory and user roles  
✔️ Light/Dark theme toggle  
✔️ Fully responsive design  

✅ All data is stored securely in the browser and persists between sessions.


📂 Folder Structure
-------------------
- `index.html`         – Login & Registration Screen  
- `dashboard.html`     – Main Admin/Member interface  
- `/assets/style.css`  – Clean UI styling  
- `/js/*.js`            – Core system logic by module


🚀 How To Use
-------------
1. Open `index.html` in a modern browser (Chrome or Edge recommended)
2. Register a new user OR login as the default admin
3. Navigate tabs:
   - Inventory: Submit/view assets
   - Pending: Approve submitted assets
   - Users: Create/manage roles
   - Settings: Export/Import/Reset data
   - Audit Logs: View all actions

✔️ **No setup required** — fully browser-based.


🛠 Admin Tips
-------------
- Always export backups regularly (Settings tab)
- Use the Audit Log to track sensitive activity
- You can assign users as Admins or Owners using Promote/Demote
- Clear data with caution – this will remove all local records
- Assets can be marked Checked Out by Members or Admins


🔄 Backup & Restore
-------------------
- Click "Export Backup" to download all current data (JSON)
- Click "Import" and choose a file to restore data
  (System will overwrite current data with backup)


🧩 Customization & Extensions
-----------------------------
- You can add new fields in the asset form by editing `inventory.js` and `dashboard.html`
- For cloud version, adapt logic to use server-side storage (Node.js, PHP, etc.)


🛡️ Disclaimer
-------------
This system uses localStorage in the browser. Clearing browser cache, using private mode, or switching devices will erase stored data unless backed up.

For production deployment, consider server-backed storage for multi-user access.


🎓 Created for Jackson College – IT Operations
-----------------------------------------------
