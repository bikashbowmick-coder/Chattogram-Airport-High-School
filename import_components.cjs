const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

const imports = "import { Panel } from '../components/admin/dashboard/Panel';\\nimport { StatCard } from '../components/admin/dashboard/StatCard';\\n";
code = code.replace(/import \{ StatisticsGrid \}/, imports + "import { StatisticsGrid }");

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
