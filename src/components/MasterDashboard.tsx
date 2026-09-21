import React, { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  BookOpen,
  CheckCircle2,
  Database,
  Edit3,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Code2,
  Search,
} from 'lucide-react';
import {
  CaiClass,
  CaiMasterOverview,
  CaiProgress,
  CaiSchool,
  CaiStudent,
  CaiWeek,
  Tier,
} from '../types';
import { db, SUPABASE_SQL_SCHEMA } from '../lib/db';

interface MasterDashboardProps {
  onSignOut: () => void;
  onInspectStudent: (school: CaiSchool, cls: CaiClass, student: CaiStudent) => void;
}

export const MasterDashboard: React.FC<MasterDashboardProps> = ({
  onSignOut,
  onInspectStudent,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'curriculum' | 'supabase'>('overview');
  const [overviewData, setOverviewData] = useState<CaiMasterOverview[]>([]);
  interface HierarchyClass extends CaiClass {
    students: (CaiStudent & { progressCount: number; progress: CaiProgress[] })[];
  }
  interface HierarchySchool extends CaiSchool {
    classes: HierarchyClass[];
  }
  const [hierarchy, setHierarchy] = useState<HierarchySchool[]>([]);
  const [loading, setLoading] = useState(true);

  // Curriculum Editor state
  const [selectedTier, setSelectedTier] = useState<Tier>('primary');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [curriculumWeeks, setCurriculumWeeks] = useState<CaiWeek[]>([]);
  const [activeWeek, setActiveWeek] = useState<CaiWeek | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLearn, setEditLearn] = useState('');
  const [editDo, setEditDo] = useState('');
  const [editStarterCode, setEditStarterCode] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Supabase Settings state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [configSaveMsg, setConfigSaveMsg] = useState(false);

  // Search filter
  const [searchFilter, setSearchFilter] = useState('');

  const loadData = async () => {
    setLoading(true);
    const overview = await db.getMasterOverview();
    const hier = await db.getMasterHierarchy();
    const weeks = await db.getWeeks(selectedTier);

    setOverviewData(overview);
    setHierarchy(hier as HierarchySchool[]);
    setCurriculumWeeks(weeks);

    const match = weeks.find((w) => w.week_number === selectedWeekNum) || weeks[0];
    if (match) {
      setActiveWeek(match);
      setEditTitle(match.title);
      setEditLearn(match.learn_text || '');
      setEditDo(match.do_instructions || '');
      setEditStarterCode(match.content_json.starterCode || '');
    }

    const cfg = db.getSupabaseConfig();
    setSupabaseUrl(cfg.url);
    setSupabaseKey(cfg.key);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // When tier changes in curriculum editor
  useEffect(() => {
    async function loadWeeks() {
      const weeks = await db.getWeeks(selectedTier);
      setCurriculumWeeks(weeks);
      const match = weeks.find((w) => w.week_number === selectedWeekNum) || weeks[0];
      if (match) {
        setActiveWeek(match);
        setEditTitle(match.title);
        setEditLearn(match.learn_text || '');
        setEditDo(match.do_instructions || '');
        setEditStarterCode(match.content_json.starterCode || '');
      }
    }
    loadWeeks();
  }, [selectedTier, selectedWeekNum]);

  const handleSaveWeek = async () => {
    if (!activeWeek) return;
    const updatedContent = {
      ...activeWeek.content_json,
      starterCode: editStarterCode,
    };

    const res = await db.updateWeek(activeWeek.id, {
      title: editTitle,
      learn_text: editLearn,
      do_instructions: editDo,
      content_json: updatedContent,
    });

    if (res) {
      setActiveWeek(res);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    }
  };

  const handleSaveSupabaseConfig = () => {
    db.setSupabaseConfig(supabaseUrl, supabaseKey);
    setConfigSaveMsg(true);
    setTimeout(() => setConfigSaveMsg(false), 3000);
    loadData();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all schools, classes, and weeks back to default seed data?')) {
      db.resetToDefaultSeed();
      loadData();
    }
  };

  // Total rollup counts
  const totalSchools = hierarchy.length;
  const totalClasses = hierarchy.reduce((acc, s) => acc + s.classes.length, 0);
  const totalStudents = hierarchy.reduce(
    (acc, s) => acc + s.classes.reduce((cAcc, c) => cAcc + c.students.length, 0),
    0
  );
  const totalSubmissions = hierarchy.reduce(
    (acc, s) => acc + s.classes.reduce((cAcc, c) => cAcc + c.students.reduce((stAcc, st) => stAcc + st.progressCount, 0), 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-[#17182B] text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#8CF2C7]/20 text-[#8CF2C7] border border-[#8CF2C7]/30 uppercase">
              Master Administration
            </span>
            <span className="text-xs text-slate-400">Fortune's TP &amp; ESGMC Hublets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Code &amp; AI Lab Master Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Live oversight across all schools and tiers. Live-edit weekly scheme of work content, audit student booklets, and sync with Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSignOut}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Exit Master Mode
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          id="tab-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#17182B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Rollup Overview</span>
        </button>

        <button
          id="tab-classes"
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'classes'
              ? 'bg-[#17182B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Schools &amp; Students ({totalStudents})</span>
        </button>

        <button
          id="tab-curriculum"
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'curriculum'
              ? 'bg-[#17182B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Curriculum Editor (Weeks 1–13)</span>
        </button>

        <button
          id="tab-supabase"
          onClick={() => setActiveTab('supabase')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'supabase'
              ? 'bg-[#17182B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase &amp; SQL Schema</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Participating Schools</span>
              <span className="text-3xl font-black text-[#17182B] mt-1 block">
                {totalSchools}
              </span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Active Classes</span>
              <span className="text-3xl font-black text-[#0F6B63] mt-1 block">
                {totalClasses}
              </span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Enrolled Students</span>
              <span className="text-3xl font-black text-[#F5A623] mt-1 block">
                {totalStudents}
              </span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Booklet Submissions</span>
              <span className="text-3xl font-black text-emerald-600 mt-1 block">
                {totalSubmissions}
              </span>
            </div>
          </div>

          {/* School Rollup Table (cai_master_overview) */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-sm text-[#17182B]">
                School Rollup Breakdown (cai_master_overview)
              </h3>
              <button
                onClick={loadData}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3">School Name</th>
                    <th className="px-5 py-3">Classes</th>
                    <th className="px-5 py-3">Students</th>
                    <th className="px-5 py-3">Submissions</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {overviewData.map((row) => (
                    <tr key={row.school_id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {row.school_name}
                      </td>
                      <td className="px-5 py-3.5 text-slate-700">{row.class_count} classes</td>
                      <td className="px-5 py-3.5 text-slate-700">{row.student_count} students</td>
                      <td className="px-5 py-3.5 font-bold text-emerald-700">
                        {row.total_submissions} completed
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setActiveTab('classes')}
                          className="text-[#0F6B63] hover:underline font-semibold cursor-pointer"
                        >
                          View Classes →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSES & ROSTERS */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by student name, class, or PIN..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#F5A623] focus:bg-white"
              />
            </div>
            <span className="text-xs text-slate-500">
              Click any student to inspect their full Booklet record
            </span>
          </div>

          <div className="space-y-6">
            {hierarchy.map((school) => (
              <div key={school.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Building2 className="w-5 h-5 text-slate-500" />
                  <h2 className="font-extrabold text-base text-[#17182B]">{school.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {school.classes.map((cls) => {
                    const filteredStudents = cls.students.filter(
                      (st) =>
                        st.full_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        cls.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        cls.class_pin.toLowerCase().includes(searchFilter.toLowerCase())
                    );

                    if (searchFilter && filteredStudents.length === 0) return null;

                    return (
                      <div
                        key={cls.id}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-slate-900">{cls.name}</span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                cls.tier === 'primary'
                                  ? 'bg-amber-100 text-amber-800'
                                  : cls.tier === 'jss'
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-slate-800 text-emerald-300'
                              }`}
                            >
                              {cls.tier}
                            </span>
                          </div>

                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="text-slate-500">PIN:</span>
                            <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono font-bold text-slate-800">
                              {cls.class_pin}
                            </code>
                          </div>
                        </div>

                        {/* Student list in this class */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-200">
                          <span className="text-[11px] font-semibold text-slate-500 block">
                            Students ({cls.students.length}):
                          </span>
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {filteredStudents.map((st) => (
                              <button
                                key={st.id}
                                onClick={() => onInspectStudent(school, cls, st)}
                                className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 flex items-center justify-between transition-colors cursor-pointer group"
                              >
                                <span className="font-medium text-slate-800 group-hover:text-amber-900">
                                  {st.full_name}
                                </span>
                                <span className="text-[11px] text-slate-400 group-hover:text-amber-700 flex items-center gap-1">
                                  <span>{st.progressCount} wks</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE CURRICULUM EDITOR (cai_weeks) */}
      {activeTab === 'curriculum' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="font-extrabold text-lg text-[#17182B] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#F5A623]" />
                <span>Live Curriculum Editor (cai_weeks)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fortune can adjust wording, weekly instructions, and starter snippets per tier without rebuilding the app!
              </p>
            </div>

            {saveSuccessMsg && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Changes Saved to Database!
              </span>
            )}
          </div>

          {/* Tier & Week Selector Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Select Curriculum Tier:
              </label>
              <div className="flex gap-2">
                {(['primary', 'jss', 'ss'] as Tier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTier(t)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedTier === t
                        ? 'bg-[#17182B] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Select Week (1 to 13):
              </label>
              <select
                value={selectedWeekNum}
                onChange={(e) => setSelectedWeekNum(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#F5A623]"
              >
                {Array.from({ length: 13 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Week {w}: {curriculumWeeks.find((cw) => cw.week_number === w)?.title || `Week ${w}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Edit Form */}
          {activeWeek && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Week Title:
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63] focus:bg-white font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  "What we're learning" blurb (learn_text):
                </label>
                <textarea
                  rows={2}
                  value={editLearn}
                  onChange={(e) => setEditLearn(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63] focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  "What to try this week" instructions (do_instructions):
                </label>
                <textarea
                  rows={2}
                  value={editDo}
                  onChange={(e) => setEditDo(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63] focus:bg-white text-slate-900"
                />
              </div>

              {selectedTier !== 'primary' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Starter Code Snippet (Python):
                  </label>
                  <textarea
                    rows={6}
                    value={editStarterCode}
                    onChange={(e) => setEditStarterCode(e.target.value)}
                    className="w-full p-3 font-mono text-xs bg-[#17182B] text-[#8CF2C7] border border-slate-800 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8CF2C7]"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  id="save-week-curriculum-btn"
                  onClick={handleSaveWeek}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0F6B63] hover:bg-[#0d5852] shadow-xs transition-colors cursor-pointer"
                >
                  Save Curriculum Updates
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SUPABASE & SQL SCHEMA */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          {/* Connection configuration */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#17182B] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#0F6B63]" />
                  <span>Supabase Live Connection Settings</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Connect your live Supabase project. If left blank, the app operates using local database sync.
                </p>
              </div>

              {configSaveMsg && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Settings Updated!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  VITE_SUPABASE_URL:
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  VITE_SUPABASE_ANON_KEY:
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleResetData}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                Reset to Default Demo Seed
              </button>

              <button
                onClick={handleSaveSupabaseConfig}
                className="px-5 py-2 text-xs font-bold text-white bg-[#17182B] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Save Supabase Credentials
              </button>
            </div>
          </div>

          {/* SQL Schema Display */}
          <div className="bg-[#17182B] text-white border border-slate-800 rounded-xl p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#8CF2C7] flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Exact Supabase SQL Schema (Section 5)</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Ready to copy and paste into the Supabase SQL Editor:
                </p>
              </div>

              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8CF2C7] text-[#17182B] hover:bg-[#7ce2b8] transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-lg font-mono text-[11px] text-slate-300 overflow-x-auto max-h-[280px]">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
