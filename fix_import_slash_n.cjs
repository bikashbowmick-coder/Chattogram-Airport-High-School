const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');
code = code.replace(/lucide-react';\\n/g, "lucide-react';\n");
fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
