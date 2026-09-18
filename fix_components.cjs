const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

// The internal components start around line 180 and end around line 950.
// Let's just remove them with a regex.
code = code.replace(/function Panel\([\s\S]*?\}\n\nfunction StatCard\([\s\S]*?\}\n\nfunction WelcomeHeader\([\s\S]*?\}\n\nfunction AttendanceOverviewCard\([\s\S]*?\}\n\nfunction StudentDistributionCard\([\s\S]*?\}\n\nfunction AcademicPerformanceCard\([\s\S]*?\}\n\nfunction FeeOverviewCard\([\s\S]*?\}\n\nfunction RecentActivityTimeline\([\s\S]*?\}\n/g, '');

// Also import the missing ones
code = code.replace(/import { C, FONT_BODY } from '\.\.\/components\/admin\/dashboard\/utils';/, "import { C, ACCENTS, FONT_DISPLAY, FONT_BODY, FONT_BN, formatCount, formatBDT } from '../components/admin/dashboard/utils';");

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
