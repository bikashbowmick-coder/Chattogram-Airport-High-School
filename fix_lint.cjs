const fs = require('fs');

// Fix dashboard.types.ts
let types = fs.readFileSync('src/types/dashboard.types.ts', 'utf8');
types = types.replace('changePercents: z.record(z.number()),', 'changePercents: z.record(z.string(), z.number()),');
fs.writeFileSync('src/types/dashboard.types.ts', types);

// Fix AdminDashboardPage.tsx
let page = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');
page = page.replace(/const C = {[\s\S]*?};\n/, '');
page = page.replace(/const ACCENTS = {[\s\S]*?};\n/, '');
page = page.replace(/const FONT_DISPLAY = '.*?';\n/, '');
page = page.replace(/const FONT_BODY = '.*?';\n/, '');
page = page.replace(/const FONT_BN = '.*?';\n/, '');
page = page.replace(/function formatCount[\s\S]*?\}\n/, '');
page = page.replace(/function formatBDT[\s\S]*?\}\n/, '');
fs.writeFileSync('src/pages/AdminDashboardPage.tsx', page);
