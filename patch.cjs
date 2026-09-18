const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

const searchStringStart = `{activeTab === 'dashboard' ? (`;
const searchStringEnd = `      ) : (`;

const startIndex = code.indexOf(searchStringStart);
const endIndex = code.indexOf(searchStringEnd, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find the start or end index for dashboard replacement.");
  console.log("Start: ", startIndex, "End: ", endIndex);
  process.exit(1);
}

const replacementDashboardUI = `
      {activeTab === 'dashboard' ? (
        <div className="flex-1 space-y-5 animate-fadeIn" style={{ fontFamily: FONT_BODY }}>
          <WelcomeHeader userName={user?.name || 'Administrator'} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Panel
              title="Attendance Overview"
              bnTitle="উপস্থিতির সারসংক্ষেপ"
              right={
                <div className="flex gap-1 rounded-full p-1" style={{ backgroundColor: C.bg }}>
                  {['Today', 'This Week', 'This Month'].map((f) => (
                    <button
                      key={f}
                      className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                      style={f === 'Today' ? { backgroundColor: C.navy, color: '#fff' } : { color: C.slate }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={ATTENDANCE_DATA} dataKey="value" nameKey="name" innerRadius={62} outerRadius={82} paddingAngle={3} stroke="none">
                        {ATTENDANCE_DATA.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [\`\${v} students\`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>94.6%</span>
                    <span className="text-xs" style={{ color: C.slate }}>Present</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-2.5">
                  {ATTENDANCE_DATA.map((d) => (
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
            </Panel>

            <Panel title="Student Distribution" bnTitle="শ্রেণিভিত্তিক শিক্ষার্থী বিভাজন" className="lg:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={STUDENT_DISTRIBUTION} barGap={6} barCategoryGap="28%">
                    <CartesianGrid vertical={false} stroke={C.border} />
                    <XAxis dataKey="class" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
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
            </Panel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Panel title="Academic Performance" bnTitle="একাডেমিক ফলাফল বিশ্লেষণ" className="lg:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={ACADEMIC_PERFORMANCE}>
                    <CartesianGrid vertical={false} stroke={C.border} />
                    <XAxis dataKey="class" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
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
            </Panel>

            <Panel title="Top Performing Classes" bnTitle="সেরা ফলাফলকারী শ্রেণি">
              <div className="space-y-3">
                {[...ACADEMIC_PERFORMANCE].sort((a, b) => b.avgMarks - a.avgMarks).map((c, i) => (
                  <div key={c.class} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: i === 0 ? C.gold : C.bg, color: i === 0 ? '#fff' : C.slate }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: C.ink }}>{c.class}</p>
                      <div className="w-full h-1.5 rounded-full mt-1" style={{ backgroundColor: C.bg }}>
                        <div className="h-1.5 rounded-full" style={{ width: \`\${c.avgMarks}%\`, backgroundColor: C.royal }} />
                      </div>
                    </div>
                    <span className="text-sm font-semibold flex-shrink-0" style={{ color: C.ink }}>{c.avgMarks}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel title="Fee Overview" bnTitle="আর্থিক সারসংক্ষেপ">
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
                    <AreaChart data={FEE_MONTHLY}>
                      <defs>
                        <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={C.royal} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={C.royal} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke={C.border} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.slate }} axisLine={{ stroke: C.border }} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: C.slate }} axisLine={false} tickLine={false} tickFormatter={(v) => \`\${(v / 100000).toFixed(1)}L\`} />
                      <Tooltip formatter={(v) => [\`৳\${formatBDT(v as number)}\`, 'Collected']} />
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
                      <Pie data={FEE_PENDING_DIST} dataKey="value" nameKey="name" innerRadius={38} outerRadius={58} paddingAngle={2} stroke="none">
                        {FEE_PENDING_DIST.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [\`\${v}%\`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2">
                  {FEE_PENDING_DIST.map((e) => (
                    <div key={e.name} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                      <span className="text-xs" style={{ color: C.slate }}>{e.name} {e.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Panel title="Recent Activity" bnTitle="সাম্প্রতিক কার্যক্রম" className="lg:col-span-2">
              <div>
                {ACTIVITIES.map((a, i) => {
                  const Icon = a.icon;
                  const accent = ACCENTS[a.color as keyof typeof ACCENTS];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-2.5"
                      style={{ borderBottom: i < ACTIVITIES.length - 1 ? \`1px solid \${C.border}\` : 'none' }}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent.bg }}>
                        <Icon size={16} color={accent.fg} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: C.ink }}>
                          <span className="font-semibold">{a.user}</span> {a.action}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock size={11} color={C.slate} />
                          <span className="text-xs" style={{ color: C.slate }}>{a.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel title="Quick Actions" bnTitle="দ্রুত কার্যক্রম">
              <div className="grid grid-cols-2 gap-2.5">
                {QUICK_ACTIONS.map((q) => {
                  const Icon = q.icon;
                  const accent = ACCENTS[q.color as keyof typeof ACCENTS];
                  return (
                    <button
                      key={q.label}
                      onClick={() => setActiveTab(q.action as AdminTab)}
                      className="flex flex-col items-start gap-2 rounded-xl p-3 text-left transition-shadow hover:shadow-md"
                      style={{ backgroundColor: C.bg }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent.bg }}>
                        <Icon size={15} color={accent.fg} />
                      </div>
                      <span className="text-xs font-medium leading-tight" style={{ color: C.ink }}>{q.label}</span>
                    </button>
                  );
                })}
              </div>
            </Panel>
          </div>
        </div>
`;

code = code.substring(0, startIndex) + replacementDashboardUI + code.substring(endIndex);
fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);
console.log('Successfully patched AdminDashboardPage.tsx main block.');
