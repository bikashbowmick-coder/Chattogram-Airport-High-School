const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8').split('\\n');

let start = lines.findIndex(l => l.includes('function getGreeting()'));
let end = lines.findIndex(l => l.includes('export const AdminDashboardPage: React.FC'));

if (start !== -1 && end !== -1) {
  lines.splice(start, end - start);
  fs.writeFileSync('src/pages/AdminDashboardPage.tsx', lines.join('\\n'));
  console.log('Deleted lines ' + start + ' to ' + end);
}
