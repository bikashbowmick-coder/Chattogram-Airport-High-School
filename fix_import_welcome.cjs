const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

const importStr = "import { WelcomeHeader } from '../components/admin/dashboard/WelcomeHeader';\\n";
code = code.replace(/import \{ StatisticsGrid \}/, importStr + "import { StatisticsGrid }");

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
