const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

// The exported component is:
// export const AdminDashboardPage: React.FC = () => {
// But there was a `const QUICK_ACTIONS = [ ... ];` above it, or inside it. Let's see if QUICK_ACTIONS is defined.
// Actually QUICK_ACTIONS is used in AdminDashboardPage.tsx. I should just put it back.

const quickActions = `
import { UserPlus, GraduationCap, FileText, PencilLine, ClipboardList, CreditCard, Award, Download, Calendar } from 'lucide-react';
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
`;

code = code.replace(/import { StatisticsGrid } from '\.\.\/components\/admin\/dashboard\/StatisticsGrid';/, quickActions + "\nimport { StatisticsGrid } from '../components/admin/dashboard/StatisticsGrid';");

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
