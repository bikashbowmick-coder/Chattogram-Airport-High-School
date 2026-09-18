const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

code = code.replace(/\];\s*\);\s*\}\sexport const AdminDashboardPage/, '];\nexport const AdminDashboardPage');

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
