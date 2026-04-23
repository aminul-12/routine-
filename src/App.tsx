/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  BookOpen, 
  Users, 
  MapPin, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap,
  Info
} from "lucide-react";

// ── DATA ──

const allCourses = [
  { sl: 1,  code: "CSE 4101", title: "Computer Networks",                        type: "theory",   status: "scheduled" },
  { sl: 2,  code: "CSE 4121", title: "Computer Networks: Sessional",              type: "sessional",status: "scheduled" },
  { sl: 3,  code: "CSE 4102", title: "Computer Vision & Image Processing",        type: "theory",   status: "scheduled" },
  { sl: 4,  code: "CSE 4122", title: "CV & Image Processing: Sessional",          type: "sessional",status: "scheduled" },
  { sl: 5,  code: "CSE 4103", title: "Microprocessors & Microcontrollers",        type: "theory",   status: "scheduled" },
  { sl: 6,  code: "CSE 4123", title: "Microprocessors: Sessional",                type: "sessional",status: "scheduled" },
  { sl: 7,  code: "CSE 4224", title: "Placement / Practicum / Internship",        type: "special",  status: "confirm"   },
  { sl: 8,  code: "CSE 4225", title: "Thesis / Project",                          type: "special",  status: "confirm"   },
  { sl: 9,  code: "CSE 3203", title: "Computer Graphics",                         type: "theory",   status: "scheduled" },
  { sl: 10, code: "CSE 3223", title: "Computer Graphics: Sessional",              type: "sessional",status: "scheduled" },
  { sl: 11, code: "CSE 2203", title: "Simulation and Modeling",                   type: "theory",   status: "scheduled" },
];

const schedule = [
  {
    day: "Thursday",
    short: "THU",
    color: "teal",
    bg: "bg-teal-500/5",
    accent: "text-teal-500",
    badge: "bg-teal-500",
    border: "border-teal-500",
    source: "Evening Routine",
    classes: [
      { period:"1st", time:"10:00 AM", code:"CSE 3223", title:"Computer Graphics: Sessional", teacher:"RIH", room:"305", src:"EVE" },
    ],
  },
  {
    day: "Sunday",
    short: "SUN",
    color: "amber",
    bg: "bg-amber-500/5",
    accent: "text-amber-500",
    badge: "bg-amber-500",
    border: "border-amber-500",
    source: "Day Routine",
    classes: [
      { period:"3rd", time:"12:00 PM", code:"CSE 4102", title:"Computer Vision & Image Processing",  teacher:"AAA", room:"304", src:"DAY" },
      { period:"3rd", time:"12:00 PM", code:"CSE 2203", title:"Simulation and Modeling",             teacher:"AR",  room:"304", src:"MIG" },
      { period:"4th", time:"2:00 PM",  code:"CSE 4123", title:"Microprocessors: Sessional",          teacher:"AR",  room:"305", src:"DAY" },
    ],
  },
  {
    day: "Monday",
    short: "MON",
    color: "emerald",
    bg: "bg-emerald-500/5",
    accent: "text-emerald-500",
    badge: "bg-emerald-500",
    border: "border-emerald-500",
    source: "Day Routine",
    note: "Migrated",
    classes: [
      { period:"3rd", time:"12:00 PM", code:"CSE 2203", title:"Simulation and Modeling",             teacher:"AR",  room:"304", src:"MIG" },
    ],
  },
  {
    day: "Tuesday",
    short: "TUE",
    color: "blue",
    bg: "bg-blue-500/5",
    accent: "text-blue-500",
    badge: "bg-blue-500",
    border: "border-blue-500",
    source: "Day Routine",
    classes: [
      { period:"2nd", time:"10:30 AM", code:"CSE 4121", title:"Computer Networks: Sessional",        teacher:"MSA", room:"305", src:"DAY" },
      { period:"3rd", time:"12:00 PM", code:"CSE 4122", title:"CV & Image Processing: Sessional",   teacher:"AAA", room:"305", src:"DAY" },
    ],
  },
  {
    day: "Friday",
    short: "FRI",
    color: "purple",
    bg: "bg-purple-500/5",
    accent: "text-purple-500",
    badge: "bg-purple-500",
    border: "border-purple-500",
    source: "Special Session Day",
    classes: [
      { period:"1st–2nd", time:"10:00 AM", code:"CSE 3203", title:"Computer Graphics",              teacher:"RIH", room:"304", src:"EVE" },
      { period:"1st–2nd", time:"10:00 AM", code:"CSE 4101", title:"Computer Networks",              teacher:"MSA", room:"305", src:"DAY" },
      { period:"3rd–4th", time:"2:00 PM",  code:"CSE 4103", title:"Microprocessors & Microcontrollers", teacher:"AR", room:"305", src:"DAY" },
    ],
  },
];

const teachers = {
  AAA: { name: "Md. Abdul Awal Ansary", color: "amber", phone: "01710445033" },
  AR:  { name: "Abdullah Rajib",        color: "blue",  phone: "01675937860" },
  MSA: { name: "MD. Samiul Alim",       color: "emerald", phone: "01730298445" },
  RIH: { name: "Rasa Iffat Helmi",      color: "teal", phone: "01989823193" },
};

const typeMapping = {
  theory:   { label: "Theory" },
  sessional:{ label: "Sessional" },
  special:  { label: "Special" },
};

// ── COMPONENTS ──

export default function App() {
  const [tab, setTab] = useState("schedule");

  return (
    <div className="min-h-screen bg-[#07090f] text-[#e2e8f0] font-sans p-6 overflow-x-hidden flex flex-col">
      {/* ── HEADER ── */}
      <header className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-[10px] tracking-[4px] text-slate-500 uppercase mb-1 font-bold">RTM Al-Kabir Technical University</p>
          <h1 className="text-3xl font-black text-white tracking-tighter">My Class Routine <span className="text-blue-500">·</span> Spring 2026</h1>
          <p className="text-xs text-slate-400 mt-1">Year 4 · Semester 2 · Dept. of Computer Science & Engineering</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3 w-full md:w-auto"
        >
          {[
            { val: "5", label: "Days", color: "purple" },
            { val: "10", label: "Classes", color: "emerald" },
            { val: "9", label: "Courses", color: "blue" },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className={`flex-1 md:flex-none bg-slate-900/50 border border-${stat.color}-500/30 px-4 py-2 rounded-lg text-center min-w-[80px]`}
            >
              <div className={`text-xl font-black text-${stat.color}-500`}>{stat.val}</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </header>

      {/* ── NAVIGATION ── */}
      <nav className="max-w-fit mx-auto mb-10">
        <div className="flex p-1 bg-slate-900/40 rounded-xl border border-slate-800 shadow-xl relative backdrop-blur-sm">
          {[
            { id: "schedule", label: "Schedule", icon: Calendar },
            { id: "courses", label: "Courses", icon: BookOpen },
            { id: "teachers", label: "Teachers", icon: Users },
          ].map((t) => {
            const isActive = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center justify-center gap-2 py-2 px-6 rounded-lg text-xs font-black uppercase tracking-wider transition-all z-10 ${
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                  />
                )}
                <Icon size={14} className="relative z-20" />
                <span className="relative z-20">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          {tab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {schedule.map((dayData) => (
                <section key={dayData.day} className="flex flex-col gap-4">
                  <div className={`border-b-2 ${dayData.border} pb-2 mb-1`}>
                    <h2 className={`${dayData.accent} font-black text-sm uppercase tracking-widest`}>{dayData.day}</h2>
                    <p className="text-[10px] text-slate-500">{dayData.source} {dayData.note && `· ${dayData.note}`}</p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {dayData.classes.map((cls, idx) => {
                      const course = allCourses.find(c => c.code === cls.code);
                      return (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`${dayData.bg} border border-${dayData.color}-500/20 rounded-xl p-3 flex flex-col gap-3 group hover:border-${dayData.color}-500/40 transition-colors`}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-[10px] font-black ${dayData.badge} text-black px-2 py-0.5 rounded shadow-sm`}>
                              {cls.time}
                            </span>
                            <span className={`text-[10px] ${dayData.accent} font-mono font-bold tracking-tight opacity-70`}>Rm {cls.room}</span>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{cls.code}: {cls.title}</p>
                            <p className={`text-[9px] ${dayData.accent} mt-1.5 uppercase font-black tracking-widest`}>
                              {typeMapping[course?.type as keyof typeof typeMapping]?.label || "Theory"} · {cls.teacher}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </motion.div>
          )}

          {tab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {allCourses.map((c) => (
                <div key={c.code} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-blue-500 transition-colors">
                      {String(c.sl).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-200 tracking-wider mb-1">{c.code}</h3>
                      <p className="text-[11px] text-slate-400 font-medium leading-tight">{c.title}</p>
                    </div>
                  </div>
                  <div className={`text-[9px] font-black uppercase tracking-widest ${c.status === 'scheduled' ? 'text-emerald-500' : 'text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20'}`}>
                    {c.status === 'scheduled' ? '✓ Found' : 'PENDING'}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "teachers" && (
            <motion.div
              key="teachers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {Object.entries(teachers).map(([code, t]) => (
                <div key={code} className={`flex items-center gap-4 bg-slate-900/40 border border-${t.color}-500/20 p-5 rounded-2xl`}>
                  <div className={`w-12 h-12 rounded-lg bg-${t.color}-500/20 border border-${t.color}-500/40 flex items-center justify-center text-${t.color}-500 font-black text-lg italic tracking-tight`}>
                    {code}
                  </div>
                  <div>
                    <p className="text-slate-100 font-black text-sm uppercase tracking-tight">{t.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 font-bold">📞 {t.phone}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-12 border-t border-slate-800 pt-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-6 pb-8">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-4">Instructor details </p>
          <div className="flex flex-wrap gap-6">
            {Object.entries(teachers).slice(0, 3).map(([code, t]) => (
              <div key={code} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded bg-${t.color}-500/20 border border-${t.color}-500/40 flex items-center justify-center text-${t.color}-500 font-bold text-xs`}>{code}</div>
                <div className="text-[10px]">
                  <p className="text-slate-200 font-bold">{t.name}</p>
                  <p className="text-slate-500 font-mono">{t.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl w-full max-w-xs group hover:bg-rose-950/30 transition-all">
            <div className="flex items-center gap-2 mb-2 text-rose-500 font-black text-[10px] uppercase tracking-tighter">
              <AlertCircle size={14} /> Updated on: 15.03.2026 updated with Dept:
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic">CSE 4224 · CSE 4225 (Thesis / Internship)</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">System all right reserved</p>
            <p className="text-[8px] text-slate-800 mt-1 uppercase font-bold tracking-widest">Build Aminul-4.2.1-CSE · RTM Al-Kabir</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

