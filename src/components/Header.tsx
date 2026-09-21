import React from 'react';
import { Sparkles, Terminal, BookOpen, ShieldCheck, ArrowLeft, GraduationCap, Menu } from 'lucide-react';
import { CaiClass, CaiSchool, CaiStudent, Tier } from '../types';

interface HeaderProps {
  currentRole: 'entry' | 'student' | 'parent' | 'master';
  selectedClass: CaiClass | null;
  selectedSchool: CaiSchool | null;
  selectedStudent: CaiStudent | null;
  currentWeekNumber: number;
  totalWeeks: number;
  onWeekChange?: (week: number) => void;
  onExit: () => void;
  onOpenMasterLogin: () => void;
  onToggleMobileMenu?: () => void;
  primaryTab?: 'home' | 'about';
  onSelectPrimaryTab?: (tab: 'home' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  selectedClass,
  selectedSchool,
  selectedStudent,
  currentWeekNumber,
  totalWeeks,
  onWeekChange,
  onExit,
  onOpenMasterLogin,
  onToggleMobileMenu,
  primaryTab = 'home',
  onSelectPrimaryTab,
}) => {
  const getTierBadge = (tier: Tier) => {
    switch (tier) {
      case 'primary':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5A623]/20 text-[#D97706] border border-[#F5A623]/30">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
            PRIMARY 1–6
          </span>
        );
      case 'jss':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F6B63]/15 text-[#0F6B63] border border-[#0F6B63]/30">
            <span className="w-2 h-2 rounded-full bg-[#0F6B63]" />
            JSS 1–3
          </span>
        );
      case 'ss':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#17182B] text-[#8CF2C7] border border-[#8CF2C7]/30">
            <Terminal className="w-3.5 h-3.5 text-[#8CF2C7]" />
            SS 1–2 (SENIOR)
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-3">
          {/* Hamburger on mobile for JSS/SS students */}
          {currentRole === 'student' && selectedClass && selectedClass.tier !== 'primary' && onToggleMobileMenu && (
            <button
              id="mobile-nav-toggle-btn"
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {currentRole !== 'entry' && (!selectedClass || selectedClass.tier === 'primary') && (
            <button
              id="header-back-btn"
              onClick={onExit}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Return to Class Entry"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#17182B] flex items-center justify-center text-white shadow-xs">
              <Terminal className="w-5 h-5 text-[#8CF2C7]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base sm:text-lg tracking-tight text-[#17182B]">
                  Fortune's Code &amp; AI Lab
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Powered by FATap-CT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Interactive Coding &amp; Mini AI Lab for Primary, JSS &amp; SS
              </p>
            </div>
          </div>
        </div>

        {/* Primary Tier Simplified Navigation Tabs */}
        {selectedClass && currentRole === 'student' && selectedClass.tier === 'primary' && onSelectPrimaryTab && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="primary-tab-home"
              onClick={() => onSelectPrimaryTab('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                primaryTab === 'home'
                  ? 'bg-white text-[#17182B] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Block Lab
            </button>
            <button
              id="primary-tab-about"
              onClick={() => onSelectPrimaryTab('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                primaryTab === 'about'
                  ? 'bg-white text-[#17182B] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About Us
            </button>
          </div>
        )}

        {/* Center: Context information if inside class */}
        {selectedClass && currentRole !== 'master' && (
          <div className="hidden lg:flex items-center gap-3">
            {getTierBadge(selectedClass.tier)}

            <div className="text-left border-l border-slate-200 pl-3">
              <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <span>{selectedClass.name}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 truncate max-w-[160px]">
                  {selectedSchool?.name || "Fortune's TP"}
                </span>
              </div>
              {selectedStudent && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span>Student:</span>
                  <span className="font-medium text-slate-700">{selectedStudent.full_name}</span>
                </div>
              )}
            </div>

            {/* Week Selector */}
            {onWeekChange && currentRole === 'student' && (
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 ml-2">
                <span className="text-xs font-semibold text-slate-600 px-2">Week:</span>
                <select
                  id="header-week-select"
                  value={currentWeekNumber}
                  onChange={(e) => onWeekChange(Number(e.target.value))}
                  className="bg-white text-xs font-bold text-slate-800 rounded px-2 py-1 border border-slate-200 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#F5A623]"
                >
                  {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      Week {w}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {currentRole === 'master' ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#17182B] text-[#8CF2C7]">
                <ShieldCheck className="w-3.5 h-3.5" />
                MASTER PORTAL
              </span>
              <button
                id="header-master-exit-btn"
                onClick={onExit}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : currentRole === 'student' ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Live Playground
              </span>
              <button
                id="header-change-student-btn"
                onClick={onExit}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Switch Student
              </button>
            </div>
          ) : currentRole === 'parent' ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                Parent Booklet
              </span>
              <button
                id="header-parent-exit-btn"
                onClick={onExit}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Exit Booklet
              </button>
            </div>
          ) : (
            <button
              id="header-master-login-btn"
              onClick={onOpenMasterLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>Master / Teacher</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
