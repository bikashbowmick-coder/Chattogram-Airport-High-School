const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

// Step 1: Add new imports for Lucide icons
const lucideImportRegex = /import \{([\s\S]*?)\} from 'lucide-react';/;
code = code.replace(lucideImportRegex, (match, p1) => {
  const existing = p1.split(',').map(s => s.trim()).filter(Boolean);
  const newIcons = [
    'Building2', 'LayoutGrid', 'CalendarCheck', 'Wallet', 
    'PencilLine', 'CalendarDays', 'Megaphone', 'CalendarPlus', 
    'FolderOpen', 'Library', 'Handshake', 'BarChart3', 'Bot', 
    'MessageSquare', 'Settings', 'LogOut', 'Search', 'Bell', 
    'Globe', 'ChevronDown', 'ArrowUpRight', 'ArrowDownRight', 
    'Minus', 'TrendingUp', 'UploadCloud', 'UserPlus', 'Menu', 
    'X', 'Clock', 'ShieldCheck'
  ];
  const merged = Array.from(new Set([...existing, ...newIcons]));
  return `import { ${merged.join(', ')} } from 'lucide-react';`;
});

// Step 2: Add Recharts ComposedChart, Line
const rechartsImportRegex = /import \{([\s\S]*?)\} from 'recharts';/;
code = code.replace(rechartsImportRegex, (match, p1) => {
  const existing = p1.split(',').map(s => s.trim()).filter(Boolean);
  const newIcons = ['ComposedChart', 'Line'];
  const merged = Array.from(new Set([...existing, ...newIcons]));
  return `import { ${merged.join(', ')} } from 'recharts';`;
});

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
console.log('Fixed imports in AdminDashboardPage.tsx');

let topbarCode = fs.readFileSync('src/components/layout/AdminTopbar.tsx', 'utf8');
const topbarRegex = /import \{([\s\S]*?)\} from 'lucide-react';/;
topbarCode = topbarCode.replace(topbarRegex, (match, p1) => {
  const existing = p1.split(',').map(s => s.trim()).filter(Boolean);
  const newIcons = ['Search', 'Globe'];
  const merged = Array.from(new Set([...existing, ...newIcons]));
  return `import { ${merged.join(', ')} } from 'lucide-react';`;
});
fs.writeFileSync('src/components/layout/AdminTopbar.tsx', topbarCode);
console.log('Fixed imports in AdminTopbar.tsx');
