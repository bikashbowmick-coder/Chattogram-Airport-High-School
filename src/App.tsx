import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">
          চট্টগ্রাম এয়ারপোর্ট উচ্চ বিদ্যালয়
        </h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Chattogram Airport High School
        </h2>
        <p className="text-lg text-slate-600 mt-4">
          EIIN: 104248 | Patenga, Chattogram
        </p>
        <p className="text-md text-emerald-600 font-semibold mt-2">
          Knowledge is Power — শিক্ষাই শক্তি
        </p>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
