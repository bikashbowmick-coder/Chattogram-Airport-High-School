const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

// Remove the injected QUICK_ACTIONS and its lucide import
code = code.replace(/import \{ UserPlus[\s\S]*?\];\n/, '');

// Remove FONT_DISPLAY, FONT_BODY, FONT_BN from the local file if they exist
code = code.replace(/const FONT_DISPLAY = '.*?';\n/g, '');
code = code.replace(/const FONT_BODY = '.*?';\n/g, '');
code = code.replace(/const FONT_BN = '.*?';\n/g, '');

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
