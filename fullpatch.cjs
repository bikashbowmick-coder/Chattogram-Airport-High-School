const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

// Step 3: Insert Dashboard components and constants just before export const AdminDashboardPage
const dashboardCode = `
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const C = {
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

const ACCENTS = {
  royal: { bg: 'rgba(31,78,140,0.10)', fg: C.royal },
  gold: { bg: 'rgba(201,162,39,0.14)', fg: C.gold },
  green: { bg: C.greenBg, fg: C.green },
  red: { bg: C.redBg, fg: C.red },
  navy: { bg: 'rgba(11,31,58,0.08)', fg: C.navy },
};

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Noto Sans Bengali', sans-serif";
const FONT_BODY = "'Inter', 'Noto Sans Bengali', sans-serif";
const FONT_BN = "'Noto Sans Bengali', sans-serif";

const STATS = [
  { label: 'Total Students', bnLabel: 'মোট শিক্ষার্থী', value: 2450, delta: 5.2, trendDir: 'up', good: true, icon: Users, accent: 'royal' },
  { label: 'Total Teachers', bnLabel: 'মোট শিক্ষক', value: 95, delta: 1.1, trendDir: 'up', good: true, icon: GraduationCap, accent: 'gold' },
  { label: 'Total Parents', bnLabel: 'মোট অভিভাবক', value: 2100, delta: 0.6, trendDir: 'up', good: true, icon: UsersRound, accent: 'royal' },
  { label: 'Total Classes', bnLabel: 'মোট শ্রেণি', value: 48, delta: 0, trendDir: 'flat', good: null, icon: Layers, accent: 'navy' },
  { label: "Today's Attendance", bnLabel: 'আজকের উপস্থিতি', value: 94.6, decimals: 1, suffix: '%', delta: 1.8, trendDir: 'up', good: true, icon: ClipboardList, accent: 'green' },
  { label: 'Pending Fees', bnLabel: 'বকেয়া বেতন', value: 485000, prefix: '৳', isCurrency: true, delta: 3.4, trendDir: 'down', good: true, icon: CreditCard, accent: 'red' },
  { label: 'Active Notices', bnLabel: 'সক্রিয় নোটিশ', value: 12, delta: 2, deltaSuffix: '', trendDir: 'up', good: null, icon: FileText, accent: 'gold' },
  { label: 'Upcoming Exams', bnLabel: 'আসন্ন পরীক্ষা', value: 4, delta: 0, trendDir: 'flat', good: null, icon: GraduationCap, accent: 'navy' },
];

const ATTENDANCE_DATA = [
  { name: 'Present', value: 2318, color: C.green },
  { name: 'Absent', value: 78, color: C.red },
  { name: 'Late', value: 40, color: C.gold },
  { name: 'Leave', value: 14, color: C.royal },
];

const STUDENT_DISTRIBUTION = [
  { class: 'Class 6', male: 260, female: 235 },
  { class: 'Class 7', male: 255, female: 240 },
  { class: 'Class 8', male: 245, female: 235 },
  { class: 'Class 9', male: 235, female: 230 },
  { class: 'Class 10', male: 260, female: 255 },
];

const ACADEMIC_PERFORMANCE = [
  { class: 'Class 6', avgMarks: 78, passRate: 96 },
  { class: 'Class 7', avgMarks: 75, passRate: 93 },
  { class: 'Class 8', avgMarks: 72, passRate: 90 },
  { class: 'Class 9', avgMarks: 68, passRate: 85 },
  { class: 'Class 10', avgMarks: 74, passRate: 91 },
];

const FEE_TILES = [
  { label: 'Total Fees', value: 6200000, icon: CreditCard },
  { label: 'Collected', value: 5715000, icon: ArrowUpRight, color: 'green' },
  { label: 'Pending', value: 485000, icon: Clock, color: 'red' },
  { label: 'Overdue', value: 120000, icon: ArrowDownRight, color: 'red' },
  { label: 'Concession', value: 45000, icon: Award, color: 'gold' },
  { label: "Today's Collection", value: 185500, icon: TrendingUp, color: 'royal' },
];

const FEE_MONTHLY = [
  { month: 'Mar', amount: 890000 },
  { month: 'Apr', amount: 915000 },
  { month: 'May', amount: 860000 },
  { month: 'Jun', amount: 965000 },
  { month: 'Jul', amount: 1010000 },
  { month: 'Aug', amount: 571500 },
];

const FEE_PENDING_DIST = [
  { name: 'Class 9', value: 25, color: C.royal },
  { name: 'Class 8', value: 22, color: C.gold },
  { name: 'Class 10', value: 20, color: C.green },
  { name: 'Class 6', value: 18, color: C.red },
  { name: 'Class 7', value: 15, color: C.slate },
];

const ACTIVITIES = [
  { user: 'Admin', action: 'registered a new student — Rafiq Islam (Class 7)', time: '8 minutes ago', icon: UserPlus, color: 'royal' },
  { user: 'Accounts', action: 'received a fee payment of ৳4,200 from Class 9', time: '22 minutes ago', icon: CreditCard, color: 'green' },
  { user: 'Admin', action: 'published a notice — "Half-Yearly Exam Routine"', time: '1 hour ago', icon: FileText, color: 'gold' },
  { user: 'HR', action: 'added a new teacher — Farzana Akter (Chemistry)', time: '2 hours ago', icon: GraduationCap, color: 'navy' },
  { user: 'Exam Cell', action: 'published results for Class 8 Monthly Test', time: '3 hours ago', icon: Award, color: 'green' },
  { user: 'S. Rahman', action: 'assigned homework to Class 6 — Mathematics', time: 'Yesterday', icon: PencilLine, color: 'royal' },
  { user: 'Class Teachers', action: 'submitted daily attendance for all sections', time: 'Yesterday', icon: ClipboardList, color: 'gold' },
  { user: 'Admin', action: 'created an event — Annual Sports Day 2026', time: '2 days ago', icon: Calendar, color: 'red' },
];

const QUICK_ACTIONS = [
  { label: 'Add Student', icon: UserPlus, color: 'royal', action: 'students' },
  { label: 'Add Teacher', icon: GraduationCap, color: 'gold', action: 'teachers' },
  { label: 'Create Notice', icon: FileText, color: 'navy', action: 'notices' },
  { label: 'Create Homework', icon: PencilLine, color: 'green', action: 'homework' },
  { label: 'Create Exam', icon: ClipboardList, color: 'red', action: 'exams' },
  { label: 'Record Attendance', icon: ClipboardList, color: 'royal', action: 'attendance' },
  { label: 'Collect Fee', icon: CreditCard, color: 'gold', action: 'fees' },
  { label: 'Publish Result', icon: Award, color: 'green', action: 'results' },
  { label: 'Upload Material', icon: Download, color: 'navy', action: 'studyMaterials' },
  { label: 'Create Event', icon: Calendar, color: 'red', action: 'events' },
];

function formatCount(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

function formatBDT(n: number) {
  const rounded = Math.round(n);
  const str = String(rounded);
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const withCommas = rest.replace(/\\B(?=(\\d{2})+(?!\\d))/g, ',');
  return withCommas + ',' + last3;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function Panel({ title, bnTitle, right, children, className }: any) {
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

function StatCard({ stat }: any) {
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
      className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
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

function WelcomeHeader({ userName }: { userName: string }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div
      className="rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      style={{ background: \`linear-gradient(120deg, \${C.navyDeep} 0%, \${C.royal} 100%)\` }}
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: FONT_DISPLAY }}>{getGreeting()}, {userName}</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Here's what's happening at Chattogram Airport High School today.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }}>{today}</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }}>Academic Year 2026</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: C.gold, color: C.navyDeep }}>
          <Shield size={12} /> Live Dashboard
        </span>
      </div>
    </div>
  );
}

export const AdminDashboardPage`;

code = code.replace(/export const AdminDashboardPage/, dashboardCode);
fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
console.log('Successfully patched constants and components.');
