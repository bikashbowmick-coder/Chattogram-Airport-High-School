const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8').split('\\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function Panel(')) {
    startIndex = i;
  }
  if (lines[i].includes('export const AdminDashboardPage')) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex);
  fs.writeFileSync('src/pages/AdminDashboardPage.tsx', lines.join('\\n'));
  console.log('Removed old components');
}
