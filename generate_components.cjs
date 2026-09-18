const fs = require('fs');

const constants = `
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, Clock, Award } from 'lucide-react';
export const C = {
  navyDeep: '#0B1F3A',
  navy: '#0F2A4A',
  royal: '#1F4E8C',
  gold: '#C9A227',
  goldLight: '#E7C766',
  green: '#1E8E5A',
  greenBg: '#E6F4EC',
  red: '#D6455D',
  redBg: '#FBE7EA',
  slate: '#64748B',
  slateBg: '#F1F5F9',
  bg: '#F5F7FB',
  card: '#FFFFFF',
  border: '#E7EAF0',
  ink: '#0F1F3D',
};
export const ACCENTS = {
  royal: { bg: 'rgba(31,78,140,0.10)', fg: C.royal },
  gold: { bg: 'rgba(201,162,39,0.14)', fg: C.gold },
  green: { bg: C.greenBg, fg: C.green },
  red: { bg: C.redBg, fg: C.red },
  navy: { bg: 'rgba(11,31,58,0.08)', fg: C.navy },
};
export const FONT_DISPLAY = "'Plus Jakarta Sans', 'Noto Sans Bengali', sans-serif";
export const FONT_BODY = "'Inter', 'Noto Sans Bengali', sans-serif";
export const FONT_BN = "'Noto Sans Bengali', sans-serif";

export function formatCount(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function formatBDT(n) {
  const rounded = Math.round(n);
  const str = String(rounded);
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const withCommas = rest.replace(/\\B(?=(\\d{2})+(?!\\d))/g, ',');
  return withCommas + ',' + last3;
}
`;
fs.writeFileSync('src/components/admin/dashboard/utils.ts', constants);

const statCardCode = `
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { C, ACCENTS, FONT_DISPLAY, FONT_BN, formatCount, formatBDT } from './utils';

export function StatCard({ stat }: any) {
  const displayValue = stat.isCurrency ? formatBDT(stat.value) : formatCount(stat.value) + (stat.decimals ? '' : '');
  const accent = ACCENTS[stat.accent as keyof typeof ACCENTS];
  const Icon = stat.icon;
  const neutral = stat.good === null;
  const deltaColor = neutral ? C.slate : (stat.good ? C.green : C.red);
  const deltaBg = neutral ? C.slateBg : (stat.good ? C.greenBg : C.redBg);
  const DeltaIcon = stat.trendDir === 'up' ? ArrowUpRight : stat.trendDir === 'down' ? ArrowDownRight : Minus;
  const deltaSuffix = stat.deltaSuffix !== undefined ? stat.deltaSuffix : '%';

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md animate-fadeIn"
      style={{ backgroundColor: C.card, border: \`1px solid \${C.border}\` }}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent.bg }}>
          <Icon size={20} color={accent.fg} />
        </div>
        {stat.delta !== 0 && (
          <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: deltaBg }}>
            <DeltaIcon size={12} color={deltaColor} />
            <span className="text-xs font-semibold" style={{ color: deltaColor }}>{Math.abs(stat.delta)}{deltaSuffix}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
          {stat.prefix || ''}{displayValue}{stat.suffix || ''}
        </p>
        <p className="text-sm mt-1" style={{ color: C.ink, opacity: 0.75 }}>{stat.label}</p>
        <p className="text-xs" style={{ color: C.slate, fontFamily: FONT_BN }}>{stat.bnLabel}</p>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/StatCard.tsx', statCardCode);

const statisticsGridCode = `
import React from 'react';
import { StatCard } from './StatCard';
import { Users, GraduationCap, UsersRound, Layers, ClipboardList, CreditCard, FileText } from 'lucide-react';
import { useDashboardStats } from '../../../hooks/dashboard/useDashboard';

export function StatisticsGrid() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {Array(8).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl" />)}
    </div>;
  }

  if (isError || !stats) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-2xl">Failed to load statistics.</div>;
  }

  const STATS_UI = [
    { label: 'Total Students', bnLabel: 'মোট শিক্ষার্থী', value: stats.totalStudents, delta: stats.changePercents.totalStudents, trendDir: 'up', good: true, icon: Users, accent: 'royal' },
    { label: 'Total Teachers', bnLabel: 'মোট শিক্ষক', value: stats.totalTeachers, delta: stats.changePercents.totalTeachers, trendDir: 'up', good: true, icon: GraduationCap, accent: 'gold' },
    { label: 'Total Parents', bnLabel: 'মোট অভিভাবক', value: stats.totalParents, delta: stats.changePercents.totalParents, trendDir: 'up', good: true, icon: UsersRound, accent: 'royal' },
    { label: 'Total Classes', bnLabel: 'মোট শ্রেণি', value: stats.totalClasses, delta: stats.changePercents.totalClasses, trendDir: 'flat', good: null, icon: Layers, accent: 'navy' },
    { label: "Today's Attendance", bnLabel: 'আজকের উপস্থিতি', value: stats.todayAttendancePercent, decimals: 1, suffix: '%', delta: stats.changePercents.todayAttendancePercent, trendDir: 'up', good: true, icon: ClipboardList, accent: 'green' },
    { label: 'Pending Fees', bnLabel: 'বকেয়া বেতন', value: stats.pendingFeesAmount, prefix: '৳', isCurrency: true, delta: stats.changePercents.pendingFeesAmount, trendDir: 'down', good: true, icon: CreditCard, accent: 'red' },
    { label: 'Active Notices', bnLabel: 'সক্রিয় নোটিশ', value: stats.activeNoticesCount, delta: stats.changePercents.activeNoticesCount, deltaSuffix: '', trendDir: 'up', good: null, icon: FileText, accent: 'gold' },
    { label: 'Upcoming Exams', bnLabel: 'আসন্ন পরীক্ষা', value: stats.upcomingExamsCount, delta: stats.changePercents.upcomingExamsCount, trendDir: 'flat', good: null, icon: GraduationCap, accent: 'navy' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS_UI.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/StatisticsGrid.tsx', statisticsGridCode);

const panelCode = `
import React from 'react';
import { C, FONT_DISPLAY, FONT_BN } from './utils';

export function Panel({ title, bnTitle, right, children, className }: any) {
  return (
    <div
      className={\`rounded-2xl p-5 \${className || ''}\`}
      style={{ backgroundColor: C.card, border: \`1px solid \${C.border}\` }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-base font-semibold" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>{title}</h3>
          {bnTitle && <p className="text-xs mt-0.5" style={{ color: C.slate, fontFamily: FONT_BN }}>{bnTitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/Panel.tsx', panelCode);

const attendanceCode = `
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from './Panel';
import { C, FONT_DISPLAY } from './utils';
import { useAttendanceOverview } from '../../../hooks/dashboard/useDashboard';

export function AttendanceOverviewCard() {
  const [range, setRange] = useState('Today');
  const { data, isLoading, isError } = useAttendanceOverview(range);

  const right = (
    <div className="flex gap-1 rounded-full p-1" style={{ backgroundColor: C.bg }}>
      {['Today', 'This Week', 'This Month'].map((f) => (
        <button
          key={f}
          onClick={() => setRange(f)}
          className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          style={f === range ? { backgroundColor: C.navy, color: '#fff' } : { color: C.slate }}
        >
          {f}
        </button>
      ))}
    </div>
  );

  return (
    <Panel title="Attendance Overview" bnTitle="উপস্থিতির সারসংক্ষেপ" right={right}>
      {isLoading ? (
        <div className="h-48 flex items-center justify-center animate-pulse bg-slate-100 rounded-xl" />
      ) : isError || !data ? (
        <div className="h-48 flex items-center justify-center text-slate-500">Failed to load data.</div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
          <div className="relative w-48 h-48 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={[
                    { name: 'Present', value: data.present, color: C.green },
                    { name: 'Absent', value: data.absent, color: C.red },
                    { name: 'Late', value: data.late, color: C.gold },
                    { name: 'Leave', value: data.leave, color: C.royal },
                  ]} 
                  dataKey="value" nameKey="name" innerRadius={62} outerRadius={82} paddingAngle={3} stroke="none"
                >
                  {[
                    { name: 'Present', value: data.present, color: C.green },
                    { name: 'Absent', value: data.absent, color: C.red },
                    { name: 'Late', value: data.late, color: C.gold },
                    { name: 'Leave', value: data.leave, color: C.royal },
                  ].map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number, n: string) => [\`\${v} students\`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>{data.percentage}%</span>
              <span className="text-xs" style={{ color: C.slate }}>Present</span>
            </div>
          </div>
          <div className="flex-1 w-full space-y-2.5">
            {[
              { name: 'Present', value: data.present, color: C.green },
              { name: 'Absent', value: data.absent, color: C.red },
              { name: 'Late', value: data.late, color: C.gold },
              { name: 'Leave', value: data.leave, color: C.royal },
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-sm" style={{ color: C.ink }}>{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: C.ink }}>{d.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/AttendanceOverviewCard.tsx', attendanceCode);

const studentDistCode = `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from './Panel';
import { C } from './utils';
import { useStudentDistribution } from '../../../hooks/dashboard/useDashboard';

export function StudentDistributionCard() {
  const { data, isLoading, isError } = useStudentDistribution();

  return (
    <Panel title="Student Distribution" bnTitle="শ্রেণিভিত্তিক শিক্ষার্থী বিভাজন" className="lg:col-span-2">
      {isLoading ? (
        <div className="h-64 animate-pulse bg-slate-100 rounded-xl" />
      ) : isError || !data ? (
        <div className="h-64 flex items-center justify-center text-slate-500">Failed to load data.</div>
      ) : (
        <>
          <div className="h-64 animate-fadeIn">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={6} barCategoryGap="28%">
                <CartesianGrid vertical={false} stroke={C.border} />
                <XAxis dataKey="className" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: C.slate }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="male" name="Male" fill={C.royal} radius={[6, 6, 0, 0]} />
                <Bar dataKey="female" name="Female" fill={C.gold} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.royal }} /><span className="text-xs" style={{ color: C.slate }}>Male · ছাত্র</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.gold }} /><span className="text-xs" style={{ color: C.slate }}>Female · ছাত্রী</span></div>
          </div>
        </>
      )}
    </Panel>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/StudentDistributionCard.tsx', studentDistCode);

const academicCode = `
import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from './Panel';
import { C } from './utils';
import { useAcademicPerformance } from '../../../hooks/dashboard/useDashboard';

export function AcademicPerformanceCard() {
  const [filters] = useState({});
  const { data, isLoading, isError } = useAcademicPerformance(filters);

  return (
    <>
      <Panel title="Academic Performance" bnTitle="একাডেমিক ফলাফল বিশ্লেষণ" className="lg:col-span-2">
        {isLoading ? (
          <div className="h-64 animate-pulse bg-slate-100 rounded-xl" />
        ) : isError || !data ? (
          <div className="h-64 flex items-center justify-center text-slate-500">Failed to load data.</div>
        ) : (
          <>
            <div className="h-64 animate-fadeIn">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.byClass}>
                  <CartesianGrid vertical={false} stroke={C.border} />
                  <XAxis dataKey="className" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: C.slate }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="avgMarks" name="Average Marks" fill={C.royal} radius={[6, 6, 0, 0]} barSize={32} />
                  <Line type="monotone" dataKey="passRate" name="Pass Rate %" stroke={C.gold} strokeWidth={3} dot={{ r: 4, fill: C.gold }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.royal }} /><span className="text-xs" style={{ color: C.slate }}>Average Marks</span></div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-0.5" style={{ backgroundColor: C.gold }} /><span className="text-xs" style={{ color: C.slate }}>Pass Rate %</span></div>
            </div>
          </>
        )}
      </Panel>
      
      <Panel title="Top Performing Classes" bnTitle="সেরা ফলাফলকারী শ্রেণি">
        {isLoading ? (
          <div className="h-64 animate-pulse bg-slate-100 rounded-xl" />
        ) : isError || !data ? (
          <div className="h-64 flex items-center justify-center text-slate-500">Failed to load data.</div>
        ) : (
          <div className="space-y-3 animate-fadeIn">
            {[...data.byClass].sort((a, b) => b.avgMarks - a.avgMarks).map((c, i) => (
              <div key={c.className} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: i === 0 ? C.gold : C.bg, color: i === 0 ? '#fff' : C.slate }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: C.ink }}>{c.className}</p>
                  <div className="w-full h-1.5 rounded-full mt-1" style={{ backgroundColor: C.bg }}>
                    <div className="h-1.5 rounded-full" style={{ width: \`\${c.avgMarks}%\`, backgroundColor: C.royal }} />
                  </div>
                </div>
                <span className="text-sm font-semibold flex-shrink-0" style={{ color: C.ink }}>{c.avgMarks}</span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/AcademicPerformanceCard.tsx', academicCode);

const feeCode = `
import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from './Panel';
import { C, ACCENTS, FONT_DISPLAY, formatBDT } from './utils';
import { useFeeOverview } from '../../../hooks/dashboard/useDashboard';
import { CreditCard, ArrowUpRight, Clock, ArrowDownRight, Award, TrendingUp } from 'lucide-react';

export function FeeOverviewCard() {
  const { data, isLoading, isError } = useFeeOverview();

  if (isLoading) return <Panel title="Fee Overview" bnTitle="আর্থিক সারসংক্ষেপ"><div className="h-64 animate-pulse bg-slate-100 rounded-xl" /></Panel>;
  if (isError || !data) return <Panel title="Fee Overview" bnTitle="আর্থিক সারসংক্ষেপ"><div className="h-64 flex items-center justify-center text-slate-500">Failed to load data.</div></Panel>;

  const FEE_TILES = [
    { label: 'Total Fees', value: data.total, icon: CreditCard },
    { label: 'Collected', value: data.collected, icon: ArrowUpRight, color: 'green' },
    { label: 'Pending', value: data.pending, icon: Clock, color: 'red' },
    { label: 'Overdue', value: data.overdue, icon: ArrowDownRight, color: 'red' },
    { label: 'Concession', value: data.concession, icon: Award, color: 'gold' },
    { label: "Today's Collection", value: data.todayCollection, icon: TrendingUp, color: 'royal' },
  ];
  
  const classColors = [C.royal, C.gold, C.green, C.red, C.slate];

  return (
    <Panel title="Fee Overview" bnTitle="আর্থিক সারসংক্ষেপ" className="animate-fadeIn">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {FEE_TILES.map((t) => {
          const Icon = t.icon;
          const fg = t.color ? ACCENTS[t.color as keyof typeof ACCENTS].fg : C.ink;
          return (
            <div key={t.label} className="rounded-xl p-3" style={{ backgroundColor: C.bg }}>
              <Icon size={16} color={fg} />
              <p className="text-sm font-bold mt-2" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>৳{formatBDT(t.value)}</p>
              <p className="text-xs mt-0.5" style={{ color: C.slate }}>{t.label}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold mb-2" style={{ color: C.ink }}>Monthly Collection</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly}>
                <defs>
                  <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.royal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={C.royal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={C.border} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: C.slate }} axisLine={false} tickLine={false} tickFormatter={(v) => \`\${(v / 100000).toFixed(1)}L\`} />
                <Tooltip formatter={(v: number) => [\`৳\${formatBDT(v)}\`, 'Collected']} />
                <Area type="monotone" dataKey="amount" stroke={C.royal} strokeWidth={2.5} fill="url(#feeGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: C.ink }}>Pending by Class</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.pendingByClass} dataKey="percentage" nameKey="className" innerRadius={38} outerRadius={58} paddingAngle={2} stroke="none">
                  {data.pendingByClass.map((e, i) => (
                    <Cell key={i} fill={classColors[i % classColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number, n: string) => [\`\${v}%\`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2">
            {data.pendingByClass.map((e, i) => (
              <div key={e.className} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: classColors[i % classColors.length] }} />
                <span className="text-xs" style={{ color: C.slate }}>{e.className} {e.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/FeeOverviewCard.tsx', feeCode);

const activitiesCode = `
import React from 'react';
import { Panel } from './Panel';
import { C, ACCENTS } from './utils';
import { useRecentActivities } from '../../../hooks/dashboard/useDashboard';
import { Clock, UserPlus, CreditCard, FileText, GraduationCap, Award, PencilLine, ClipboardList, Calendar } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  registration: UserPlus,
  payment: CreditCard,
  notice: FileText,
  staffing: GraduationCap,
  result: Award,
  homework: PencilLine,
  attendance: ClipboardList,
  event: Calendar
};
const COLOR_MAP: Record<string, string> = {
  registration: 'royal',
  payment: 'green',
  notice: 'gold',
  staffing: 'navy',
  result: 'green',
  homework: 'royal',
  attendance: 'gold',
  event: 'red'
};

export function RecentActivityTimeline() {
  const { data: activities, isLoading, isError } = useRecentActivities();

  return (
    <Panel title="Recent Activity" bnTitle="সাম্প্রতিক কার্যক্রম" className="lg:col-span-2">
      {isLoading ? (
        <div className="h-64 animate-pulse bg-slate-100 rounded-xl" />
      ) : isError || !activities ? (
        <div className="h-64 flex items-center justify-center text-slate-500">Failed to load data.</div>
      ) : (
        <div className="animate-fadeIn">
          {activities.map((a, i) => {
            const Icon = ICON_MAP[a.type] || Clock;
            const colorKey = COLOR_MAP[a.type] || 'slate';
            const accent = ACCENTS[colorKey as keyof typeof ACCENTS] || { bg: C.slateBg, fg: C.slate };
            
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 py-2.5"
                style={{ borderBottom: i < activities.length - 1 ? \`1px solid \${C.border}\` : 'none' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent.bg }}>
                  <Icon size={16} color={accent.fg} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: C.ink }}>
                    <span className="font-semibold">{a.actorName}</span> {a.action} — <span className="italic">{a.entityLabel}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} color={C.slate} />
                    <span className="text-xs" style={{ color: C.slate }}>
                      {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
`;
fs.writeFileSync('src/components/admin/dashboard/RecentActivityTimeline.tsx', activitiesCode);

console.log("Done generating components.");
