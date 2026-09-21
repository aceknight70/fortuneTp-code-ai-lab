import React, { useState } from 'react';
import {
  KeyRound,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldAlert,
  GraduationCap,
  Terminal,
  Lock,
  Smartphone,
  Layers,
  Code2,
  Bot,
  Play,
} from 'lucide-react';
import { CaiClass, CaiSchool, CaiStudent } from '../types';
import { db } from '../lib/db';

interface EntryFlowProps {
  onStudentStart: (school: CaiSchool, cls: CaiClass, student: CaiStudent) => void;
  onParentStart: (school: CaiSchool, cls: CaiClass, student: CaiStudent) => void;
  onMasterLogin: () => void;
  onReplaySplash?: () => void;
}

export const EntryFlow: React.FC<EntryFlowProps> = ({
  onStudentStart,
  onParentStart,
  onMasterLogin,
  onReplaySplash,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [checkingPin, setCheckingPin] = useState(false);
  const [matchedData, setMatchedData] = useState<{
    cls: CaiClass;
    school: CaiSchool;
    students: CaiStudent[];
  } | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [entryMode, setEntryMode] = useState<'student' | 'parent'>('student');

  // Master Login Modal (stays fully separate with independent credentials)
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [masterPasscode, setMasterPasscode] = useState('');
  const [masterError, setMasterError] = useState<string | null>(null);

  const handleVerifyPin = async (pinToTest?: string) => {
    const pin = (pinToTest ?? pinInput).trim().toUpperCase();
    if (!pin) {
      setPinError('Please enter your Class PIN');
      return;
    }

    setCheckingPin(true);
    setPinError(null);

    const result = await db.checkClassPin(pin);
    setCheckingPin(false);

    if (result) {
      setMatchedData(result);
      // Auto select first student if available
      if (result.students.length > 0) {
        setSelectedStudentId(result.students[0].id);
      }
    } else {
      setMatchedData(null);
      setPinError('Class PIN not recognized. Check with your teacher or try a demo PIN.');
    }
  };

  const handleQuickDemoPin = (pin: string) => {
    setPinInput(pin);
    handleVerifyPin(pin);
  };

  const handleProceed = () => {
    if (!matchedData) return;
    const student = matchedData.students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    if (entryMode === 'student') {
      onStudentStart(matchedData.school, matchedData.cls, student);
    } else {
      onParentStart(matchedData.school, matchedData.cls, student);
    }
  };

  const handleMasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (db.verifyMasterAuth(masterPasscode)) {
      setMasterError(null);
      setShowMasterModal(false);
      onMasterLogin();
    } else {
      setMasterError('Invalid Master Passcode. Use FORTUNE2026 or MASTER2026');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* 1. Brand Header */}
      <div className="text-center space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17182B] text-white text-xs font-semibold shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-[#8CF2C7]" />
            <span>Fortune's TP Hublet</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#8CF2C7]">ESGMC Network</span>
          </div>

          {onReplaySplash && (
            <button
              onClick={onReplaySplash}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Watch FATap-CT intro animation again"
            >
              <Play className="w-3 h-3 fill-blue-600 text-blue-600" />
              <span>Intro</span>
            </button>
          )}
        </div>

        {/* App Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-[#17182B] tracking-tight">
          Fortune's Code &amp; AI Lab
        </h1>

        {/* Powered by FATap-CT Credit Line */}
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold tracking-wide uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Powered by FATap-CT
          </span>
        </div>

        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Interactive coding and mini AI experiments for Primary, JSS, and SS students. Real progress logged automatically into your student booklet.
        </p>
      </div>

      {/* 2. Main Student/Class Single PIN Entry Card */}
      <div
        id="student-entry-card"
        className="bg-white border-2 border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
      >
        {/* Step 1: Enter Class PIN */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="class-pin-input"
              className="text-xs font-black uppercase tracking-wider text-slate-700 block"
            >
              1. Enter your Class PIN
            </label>
            <span className="text-[11px] font-medium text-slate-500">
              Auto-detects tier &amp; curriculum
            </span>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="class-pin-input"
                type="text"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.toUpperCase());
                  setPinError(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyPin()}
                placeholder="e.g. PRI-401, JSS-201, SS-101"
                maxLength={10}
                className="w-full pl-11 pr-4 py-3 text-base sm:text-lg font-mono font-black text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white tracking-wider"
              />
            </div>

            <button
              id="verify-pin-btn"
              onClick={() => handleVerifyPin()}
              disabled={checkingPin || !pinInput.trim()}
              className="px-5 py-3 rounded-xl font-extrabold text-sm text-white bg-[#17182B] hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer"
            >
              {checkingPin ? 'Checking...' : 'Find Class'}
            </button>
          </div>

          {pinError && (
            <p className="mt-2 text-xs font-semibold text-rose-600 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{pinError}</span>
            </p>
          )}

          {/* Quick Demo PIN Chips */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Demo PINs:</span>
            <button
              id="demo-pri-btn"
              onClick={() => handleQuickDemoPin('PRI-401')}
              className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold font-mono transition-colors cursor-pointer"
            >
              PRI-401 (Primary)
            </button>
            <button
              id="demo-jss-btn"
              onClick={() => handleQuickDemoPin('JSS-201')}
              className="px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold font-mono transition-colors cursor-pointer"
            >
              JSS-201 (JSS)
            </button>
            <button
              id="demo-ss-btn"
              onClick={() => handleQuickDemoPin('SS-101')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold font-mono transition-colors cursor-pointer"
            >
              SS-101 (SS)
            </button>
          </div>
        </div>

        {/* Step 2: Matched Class & Pick Name */}
        {matchedData && (
          <div className="pt-4 border-t border-slate-200 space-y-5 animate-fade-in">
            {/* Auto-detected Tier & Class Badge */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  {matchedData.school.name}
                </div>
                <div className="text-lg font-black text-[#17182B] mt-0.5">
                  {matchedData.cls.name}
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    matchedData.cls.tier === 'primary'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : matchedData.cls.tier === 'jss'
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : 'bg-[#17182B] text-[#8CF2C7] border border-[#8CF2C7]/30'
                  }`}
                >
                  {matchedData.cls.tier.toUpperCase()} TIER AUTO-DETECTED
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Tailored curriculum automatically unlocked
                </p>
              </div>
            </div>

            {/* Student Dropdown */}
            <div>
              <label
                htmlFor="student-select"
                className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2"
              >
                2. Select your name from roster
              </label>

              <select
                id="student-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full p-3.5 text-base font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
              >
                {matchedData.students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.full_name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Roster selection protects your booklet record from accidental typing mistakes.
              </p>
            </div>

            {/* Mode: Student or Parent */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2">
                3. Who is accessing today?
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="mode-student-btn"
                  onClick={() => setEntryMode('student')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    entryMode === 'student'
                      ? 'border-[#F5A623] bg-amber-50/70 text-[#17182B] shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#F5A623]" />
                    <span className="font-black text-sm">I'm a Student</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Open interactive coding &amp; Mini AI playground
                  </p>
                </button>

                <button
                  type="button"
                  id="mode-parent-btn"
                  onClick={() => setEntryMode('parent')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    entryMode === 'parent'
                      ? 'border-[#0F6B63] bg-teal-50/70 text-[#17182B] shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-[#0F6B63]" />
                    <span className="font-black text-sm">I'm a Parent</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    View child's weekly booklet &amp; sign off
                  </p>
                </button>
              </div>
            </div>

            {/* Start Button */}
            <button
              id="entry-proceed-btn"
              onClick={handleProceed}
              disabled={!selectedStudentId}
              className={`w-full py-4 rounded-xl font-black text-base text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                entryMode === 'student'
                  ? 'bg-gradient-to-r from-[#F5A623] to-[#e09315] hover:from-[#e09315] hover:to-[#c97f0e]'
                  : 'bg-gradient-to-r from-[#0F6B63] to-[#0a534d] hover:from-[#0a534d] hover:to-[#07403b]'
              }`}
            >
              <span>
                {entryMode === 'student' ? 'Start Coding Playground' : 'Open Child Booklet'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. New Explanatory Write-Up Section (Bottom of Landing Page) */}
      <section
        id="about-lab-section"
        aria-label="About Fortune's Code and AI Lab"
        className="bg-white border-2 border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        {/* A. What this app is for */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#17182B]">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Smartphone className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight">
              What this app is for
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed pl-9">
            Fortune's Code &amp; AI Lab lets you try real coding and a mini AI experiment right from your phone — no app to download. Every class period, what you try here gets saved to your own page so your parents and your teacher can see your progress.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* B. The different class levels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#17182B]">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight">
              The different class levels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Primary */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                  Primary
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  P1–P6
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                Build your first program by tapping, no typing needed.
              </p>
            </div>

            {/* JSS */}
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-900 uppercase tracking-wide">
                  JSS1–3
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                  Junior
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                Type real code: variables, math, and decisions.
              </p>
            </div>

            {/* SS */}
            <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-300/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#17182B] uppercase tracking-wide">
                  SS1–2
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#17182B] text-[#8CF2C7]">
                  Senior
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                The full experience, including loops and repeating patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* C. What you'll be coding with */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#17182B]">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight">
              What you'll be coding with
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed pl-9">
            This app uses a simplified, beginner version of <strong className="font-extrabold text-[#17182B]">Python</strong> — the same language taught in the classroom scheme of work — running directly in the browser, plus a small rule-based <strong className="font-extrabold text-[#17182B]">Mini AI</strong> demo that guesses the mood of a sentence, to show one basic idea behind how AI works.
          </p>

          <div className="pl-9 flex items-center gap-2 pt-1 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
              <Terminal className="w-3 h-3 text-[#0F6B63]" />
              In-Browser Python Interpreter
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
              <Bot className="w-3 h-3 text-blue-600" />
              Rule-Based Sentiment Detector
            </span>
          </div>
        </div>
      </section>

      {/* 4. Master/Teacher Access — Stays Fully Separate with Distinct Visual Boundary */}
      <section
        id="master-teacher-portal-card"
        aria-label="Instructor & Administration Login"
        className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#8CF2C7] shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-white">
                  Master / Teacher Access
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-[#8CF2C7] border border-slate-700">
                  Staff Only
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Separate instructor portal for Fortune and classroom teachers with administrative PIN to review submissions and manage schemes.
              </p>
            </div>
          </div>

          <button
            id="master-login-modal-trigger"
            onClick={() => setShowMasterModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <GraduationCap className="w-4 h-4 text-[#8CF2C7]" />
            <span>Teacher Login</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </section>

      {/* Footer Branding Note */}
      <div className="text-center text-xs text-slate-500 pt-2 space-y-1">
        <p className="font-semibold text-slate-600">
          Fortune's Code &amp; AI Lab • Powered by FATap-CT
        </p>
        <p className="text-[11px] text-slate-400">
          Edu-Tech and Computational Thinking Training Framework • ESGMC Network
        </p>
      </div>

      {/* Master Login Modal */}
      {showMasterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#17182B] flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4 text-[#8CF2C7]" />
                </div>
                <h3 className="font-extrabold text-base text-[#17182B]">
                  Master &amp; Teacher Login
                </h3>
              </div>
              <button
                onClick={() => setShowMasterModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Provides multi-school rollup analytics, student booklet auditing, and live editing of weekly curriculum content for Fortune &amp; teaching leads.
            </p>

            <form onSubmit={handleMasterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Master Access Passcode or Supabase PIN:
                </label>
                <input
                  type="password"
                  value={masterPasscode}
                  onChange={(e) => {
                    setMasterPasscode(e.target.value);
                    setMasterError(null);
                  }}
                  placeholder="Enter Master PIN (e.g. FORTUNE2026)"
                  className="w-full p-3 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#17182B] focus:bg-white"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Demo Master PIN: <strong className="text-slate-700">FORTUNE2026</strong>
                </p>
              </div>

              {masterError && (
                <div className="text-xs text-rose-600 font-semibold p-2 bg-rose-50 rounded-lg border border-rose-200">
                  {masterError}
                </div>
              )}

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowMasterModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#17182B] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Access Master Console
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
