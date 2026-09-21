import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Terminal,
  PlayCircle,
  BookOpen,
  FileCheck,
  FolderGit2,
  HelpCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCode,
  Award,
} from 'lucide-react';
import { CaiClass, CaiFile, CaiProgress, CaiStudent, CaiWeek } from '../types';
import { StudentNavRoom } from './SideNav';
import { db } from '../lib/db';

interface HomeDashboardRoomProps {
  student: CaiStudent;
  cls: CaiClass;
  currentWeekNumber: number;
  weeks: CaiWeek[];
  progress: CaiProgress[];
  onNavigateRoom: (room: StudentNavRoom) => void;
  onSelectWeekForLab: (weekNumber: number) => void;
}

export function HomeDashboardRoom({
  student,
  cls,
  currentWeekNumber,
  weeks,
  progress,
  onNavigateRoom,
  onSelectWeekForLab,
}: HomeDashboardRoomProps) {
  const [recentFiles, setRecentFiles] = useState<CaiFile[]>([]);

  useEffect(() => {
    loadRecentFiles();
  }, [student.id]);

  const loadRecentFiles = async () => {
    const files = await db.getFiles(student.id);
    setRecentFiles(files.slice(0, 3));
  };

  const completedWeeks = new Set(progress.map((p) => p.week_number));
  const activeWeek = weeks.find((w) => w.week_number === currentWeekNumber) || weeks[0];
  const isCurrentWeekDone = completedWeeks.has(currentWeekNumber);
  const signedOffCount = progress.filter((p) => p.parent_signoff).length;

  return (
    <div id="home-dashboard-room" className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#17182B] via-slate-900 to-[#17182B] text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30 text-xs font-bold uppercase tracking-wider">
            <span>Welcome back, {student.full_name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {cls.name} • {cls.tier.toUpperCase()} Coding Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Ready to build? Dive into the <strong>AI System</strong> IDE for open-ended Python programming, or complete your Week {currentWeekNumber} curriculum challenge below.
          </p>
        </div>

        {/* Big Launch AI System CTA */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            id="dashboard-launch-ide"
            onClick={() => onNavigateRoom('editor')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F5A623] hover:bg-amber-400 text-[#17182B] rounded-xl text-sm font-black transition shadow-md"
          >
            <Terminal className="w-4 h-4" />
            <span>Open AI System (IDE)</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Completed Weeks
          </div>
          <div className="text-xl font-black text-[#17182B]">
            {completedWeeks.size} <span className="text-xs text-slate-400 font-normal">/ {weeks.length}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Parent Signoffs
          </div>
          <div className="text-xl font-black text-purple-700">
            {signedOffCount} <span className="text-xs text-slate-400 font-normal">Verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Current Focus
          </div>
          <div className="text-xl font-black text-[#F5A623]">
            Week {currentWeekNumber}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Tier
          </div>
          <div className="text-xl font-black text-emerald-700 uppercase">
            {cls.tier}
          </div>
        </div>
      </div>

      {/* Main Grid: Active Week Card & Quick Jump Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: This Week's Lab Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#17182B] text-[#F5A623] flex items-center justify-center font-bold text-xs">
                  W{activeWeek?.week_number || currentWeekNumber}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Curriculum Mission
                  </span>
                  <h3 className="font-bold text-sm text-[#17182B]">{activeWeek?.title}</h3>
                </div>
              </div>

              {isCurrentWeekDone ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Logged in Booklet</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ready to Attempt</span>
                </span>
              )}
            </div>

            {/* Instruction Snippet */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-700">📖 Weekly Core Concept:</div>
              <p className="text-slate-600 leading-relaxed">{activeWeek?.learn_text}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Includes interactive playground + Mini AI pattern detector.
              </span>
              <button
                onClick={() => onSelectWeekForLab(activeWeek?.week_number || currentWeekNumber)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#17182B] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <PlayCircle className="w-4 h-4 text-[#F5A623]" />
                <span>{isCurrentWeekDone ? 'Review Weekly Lab' : 'Launch Week ' + currentWeekNumber}</span>
              </button>
            </div>
          </div>

          {/* Recent Files in Workspace */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#17182B] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-600" />
                <span>Recent Files in AI System</span>
              </h3>
              <button
                onClick={() => onNavigateRoom('editor')}
                className="text-xs font-bold text-[#F5A623] hover:underline"
              >
                View all files →
              </button>
            </div>

            {recentFiles.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No files created yet. Click "Open AI System" to start.</p>
            ) : (
              <div className="space-y-2">
                {recentFiles.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => onNavigateRoom('editor')}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 cursor-pointer transition text-xs"
                  >
                    <div className="flex items-center gap-2 font-mono font-semibold text-slate-800">
                      <FileCode className="w-3.5 h-3.5 text-slate-400" />
                      <span>{f.filename}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(f.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Room Launchpads */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Quick Hub Rooms
          </div>

          {/* Scheme of Work */}
          <div
            onClick={() => onNavigateRoom('scheme')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-pointer transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#F5A623]" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#17182B] group-hover:text-[#F5A623] transition">
                  Scheme of Work
                </h4>
                <p className="text-[11px] text-slate-500">View all 13 curriculum weeks</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#F5A623] transition" />
          </div>

          {/* Assignments */}
          <div
            onClick={() => onNavigateRoom('assignments')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-pointer transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#17182B] group-hover:text-emerald-700 transition">
                  Assignments Desk
                </h4>
                <p className="text-[11px] text-slate-500">Turn in Fortune's challenge tasks</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
          </div>

          {/* Projects */}
          <div
            onClick={() => onNavigateRoom('projects')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-pointer transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#17182B] group-hover:text-indigo-700 transition">
                  Capstone Projects
                </h4>
                <p className="text-[11px] text-slate-500">Major multi-week engineering tasks</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
          </div>

          {/* Ask a Question */}
          <div
            onClick={() => onNavigateRoom('questions')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-pointer transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#17182B] group-hover:text-purple-700 transition">
                  Ask a Question
                </h4>
                <p className="text-[11px] text-slate-500">Direct message to Fortune &amp; teachers</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}
