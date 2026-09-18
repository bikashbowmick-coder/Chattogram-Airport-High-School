const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

const importsToAdd = `
import { StatisticsGrid } from '../components/admin/dashboard/StatisticsGrid';
import { AttendanceOverviewCard } from '../components/admin/dashboard/AttendanceOverviewCard';
import { StudentDistributionCard } from '../components/admin/dashboard/StudentDistributionCard';
import { AcademicPerformanceCard } from '../components/admin/dashboard/AcademicPerformanceCard';
import { FeeOverviewCard } from '../components/admin/dashboard/FeeOverviewCard';
import { RecentActivityTimeline } from '../components/admin/dashboard/RecentActivityTimeline';
import { C, FONT_BODY } from '../components/admin/dashboard/utils';
`;

// Insert after the last import
code = code.replace(/import {.*?} from 'lucide-react';/, (match) => {
  return match + '\\n' + importsToAdd;
});

// Replace the dashboard JSX with the components
const dashboardRegex = /\{activeTab === 'dashboard' \? \([\s\S]*?(?=\{\/\* Other Tabs \*\/)/;
const newDashboardJSX = `{activeTab === 'dashboard' ? (
        <div className="flex-1 space-y-5 animate-fadeIn" style={{ fontFamily: FONT_BODY }}>
          <WelcomeHeader userName={user?.name || 'Administrator'} />
          <StatisticsGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <AttendanceOverviewCard />
            <StudentDistributionCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <AcademicPerformanceCard />
            <div className="flex flex-col gap-5">
              <RecentActivityTimeline />
            </div>
          </div>
          <FeeOverviewCard />

          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold" style={{ color: C.ink }}>Quick Actions</h3>
            <p className="text-sm" style={{ color: C.slate }}>দ্রুত কার্যতালিকা</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => setActiveTab(a.action as AdminTab)}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: C.card, border: \`1px solid \${C.border}\` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: a.color === 'royal' ? 'rgba(31,78,140,0.1)' : a.color === 'gold' ? 'rgba(201,162,39,0.1)' : a.color === 'navy' ? 'rgba(11,31,58,0.1)' : a.color === 'green' ? C.greenBg : C.redBg }}>
                  <a.icon size={18} color={a.color === 'royal' ? C.royal : a.color === 'gold' ? C.gold : a.color === 'navy' ? C.navy : a.color === 'green' ? C.green : C.red} />
                </div>
                <span className="text-xs font-medium text-center" style={{ color: C.ink }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        `;

code = code.replace(dashboardRegex, newDashboardJSX);

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
console.log('patched');
