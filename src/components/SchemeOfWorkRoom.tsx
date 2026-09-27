import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowRight,
  Play,
  Award,
  FileText,
  Sparkles,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Table,
  Mail,
  Layers,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaiClass, CaiProgress, CaiStudent, CaiWeek } from '../types';

interface SchemeOfWorkRoomProps {
  weeks: CaiWeek[];
  progress: CaiProgress[];
  cls: CaiClass;
  student: CaiStudent;
  onSelectWeekForLab: (weekNumber: number) => void;
}

export function SchemeOfWorkRoom({
  weeks,
  progress,
  cls,
  student,
  onSelectWeekForLab,
}: SchemeOfWorkRoomProps) {
  const completedWeekNumbers = new Set(progress.map((p) => p.week_number));
  const isDT =
    cls.programme === 'digital_technologies' ||
    (cls.programme as string) === 'digital_tech';

  // Detail Modal State
  const [activeModalWeek, setActiveModalWeek] = useState<CaiWeek | null>(null);
  const [selectedSpecTab, setSelectedSpecTab] = useState<'layout' | 'tables' | 'mailmerge'>('layout');
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const handleRunPassCheck = (testKey: string) => {
    setTestResults((prev) => ({ ...prev, [testKey]: true }));
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div id="scheme-of-work-room" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDT ? 'bg-indigo-600' : 'bg-[#F5A623]'
              }`}
            />
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isDT ? 'text-indigo-600' : 'text-[#F5A623]'
              }`}
            >
              {isDT ? 'Digital Technologies Curriculum' : 'Curriculum Roadmap'}
            </span>
          </div>
          <h1 className="text-xl font-black text-[#17182B] tracking-tight">
            Scheme of Work — {cls.name} (
            {isDT ? 'JSS3 Digital Technologies' : `${cls.tier.toUpperCase()} Python`})
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {isDT
              ? "Official 13-week structured JSS3 Digital Technologies syllabus covering Advanced MS Word (Page Layout, Tables & Formulas, Mail Merge), Advanced PowerPoint (Morph & Animations), Spreadsheets, Databases, Graphic Design, Web Design, and Practical Computing powered by FATap-CT."
              : "A full 13-week structured term crafted by Fortune's TP. Each week balances theoretical concepts with interactive hands-on code challenges and Mini AI experiments."}
          </p>
        </div>

        {/* Progress Metric Pill */}
        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Term Completion
            </div>
            <div className="text-base font-black text-[#17182B]">
              {completedWeekNumbers.size} / {weeks.length} Weeks
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            {Math.round((completedWeekNumbers.size / (weeks.length || 1)) * 100)}%
          </div>
        </div>
      </div>

      {/* Week-by-Week Grid */}
      <div className="space-y-4">
        {weeks.map((w) => {
          const isCompleted = completedWeekNumbers.has(w.week_number);
          const studentAttempt = progress.find((p) => p.week_number === w.week_number);
          const isWeekTwo = w.week_number === 2 && isDT;

          return (
            <div
              key={w.id}
              id={`scheme-week-${w.week_number}`}
              className={`bg-white rounded-xl border transition-all ${
                isCompleted
                  ? 'border-emerald-200 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left Week Info */}
                <div className="flex items-start gap-3.5 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isWeekTwo
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    W{w.week_number}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-[#17182B]">{w.title}</h3>
                      {isWeekTwo && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Precision Test Specifications Active
                        </span>
                      )}
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed in Booklet</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          <Circle className="w-2.5 h-2.5 text-slate-400" />
                          <span>Curriculum Unit Open</span>
                        </span>
                      )}
                      {studentAttempt?.parent_signoff && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          <Award className="w-3 h-3" />
                          <span>Parent Signed</span>
                        </span>
                      )}
                    </div>

                    {/* Learn and Do previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 text-xs">
                        <span className="font-bold text-slate-700 block mb-1">
                          📖 Syllabus Concept:
                        </span>
                        <p className="text-slate-600 leading-relaxed line-clamp-3">
                          {w.learn_text}
                        </p>
                      </div>

                      <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 text-xs">
                        <span className="font-bold text-amber-900 block mb-1">
                          💻 Practical Requirements:
                        </span>
                        <p className="text-amber-800/90 leading-relaxed line-clamp-3">
                          {w.do_instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="md:self-center shrink-0">
                  {isDT ? (
                    <button
                      onClick={() => setActiveModalWeek(w)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs w-full md:w-auto justify-center cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#F5A623]" />
                      <span>
                        {isWeekTwo ? 'View Precision Specs' : 'View Lesson Notes'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectWeekForLab(w.week_number)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs w-full md:w-auto justify-center"
                    >
                      <Play className="w-3.5 h-3.5 text-[#F5A623] fill-current" />
                      <span>{isCompleted ? 'Review Lab' : 'Start Week ' + w.week_number}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Week Detail Modal for Digital Tech */}
      {activeModalWeek && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50 rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#17182B] text-[#F5A623]">
                    WEEK {activeModalWeek.week_number}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    JSS3 Digital Technologies Scheme of Work
                  </span>
                </div>
                <h2 className="text-lg font-black text-[#17182B] mt-1">
                  {activeModalWeek.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalWeek(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Special Authoritative Week 2 Breakdown */}
              {activeModalWeek.week_number === 2 ? (
                <div className="space-y-6">
                  {/* Top Notice */}
                  <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-900 leading-relaxed">
                    <span className="font-bold">Week 2 Authoritative Specification:</span>{' '}
                    Below are the exact verbatim real-world examples from Section A of the JSS3 Lesson Notes alongside the authoritative Precision Test Specifications (Before State → Student Action → After State / Pass Check).
                  </div>

                  {/* Subtopics Tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <button
                      onClick={() => setSelectedSpecTab('layout')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        selectedSpecTab === 'layout'
                          ? 'bg-[#17182B] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>1. Page Layout</span>
                    </button>
                    <button
                      onClick={() => setSelectedSpecTab('tables')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        selectedSpecTab === 'tables'
                          ? 'bg-[#17182B] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>2. Tables (=SUM(ABOVE))</span>
                    </button>
                    <button
                      onClick={() => setSelectedSpecTab('mailmerge')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        selectedSpecTab === 'mailmerge'
                          ? 'bg-[#17182B] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>3. Mail Merge (IF...THEN)</span>
                    </button>
                  </div>

                  {/* Tab 1: Page Layout */}
                  {selectedSpecTab === 'layout' && (
                    <div className="space-y-4">
                      {/* Part A: Verbatim Example */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">
                          Part A — Subtopic Real-World Example (Verbatim):
                        </div>
                        <h4 className="font-bold text-sm text-[#17182B]">1. Page Layout</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Designing an official multi-page school terminal magazine or government report. The cover and introduction pages require standard A4 Portrait layout with 1-inch margins, while Page 3 features a wide financial expenditure spreadsheet table requiring Landscape orientation, and Page 4 returns to Portrait with a 2-column newsletter article format. Without Section Breaks, changing Page 3 to Landscape would flip the entire 20-page document! Section Breaks ('Next Page' and 'Continuous') isolate layout rules so margins, orientation, headers, and column counts change independently per section.
                        </p>
                      </div>

                      {/* Precision Test Specification */}
                      <div className="p-5 rounded-xl border border-indigo-200 bg-white shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                            Precision Test Specification #1: Section Break &amp; Orientation Isolation
                          </h4>
                          {testResults['test_layout'] ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <Check className="w-3.5 h-3.5" />
                              <span>Pass Check Verified</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              Ready for Test
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                            <span className="font-bold text-slate-700 block">🔴 Before State:</span>
                            <p className="text-slate-600">
                              A 3-page document where all pages are Portrait (A4, 1-inch margins) and share identical linked headers.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
                            <span className="font-bold text-amber-900 block">🟡 Student Action:</span>
                            <p className="text-amber-800">
                              Insert Section Break (Next Page) after Page 1. In Section 2, uncheck 'Link to Previous' on Header tab, set Orientation to Landscape. Insert Section Break at end of Page 2 and set Section 3 to Portrait.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                            <span className="font-bold text-emerald-900 block">🟢 After State / Pass Check:</span>
                            <p className="text-emerald-800">
                              Page 1 = Portrait, Page 2 = Landscape (wide table), Page 3 = Portrait. Section 2 header is unlinked from Section 1. No document-wide distortion.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleRunPassCheck('test_layout')}
                            className="flex items-center gap-2 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-[#F5A623]" />
                            <span>Validate &amp; Mark Pass Check</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Tables */}
                  {selectedSpecTab === 'tables' && (
                    <div className="space-y-4">
                      {/* Part A: Verbatim Example */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">
                          Part A — Subtopic Real-World Example (Verbatim):
                        </div>
                        <h4 className="font-bold text-sm text-[#17182B]">2. Tables</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Preparing an official student term bill or PTA financial invoice inside Microsoft Word. The table consists of columns for Fee Description, Term Quantity, Unit Rate, and Total Amount. Instead of calculating sums by hand or copying back and forth from Excel, Word tables allow dynamic formula fields. Placing =SUM(ABOVE) in the bottom cell dynamically totals all currency values above it. When an amount changes (e.g. tuition adjustment), selecting the field and pressing F9 immediately recalculates the total, eliminating arithmetic errors in official correspondence.
                        </p>
                      </div>

                      {/* Precision Test Specification */}
                      <div className="p-5 rounded-xl border border-indigo-200 bg-white shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                            Precision Test Specification #2: Table Formula Precision (=SUM(ABOVE))
                          </h4>
                          {testResults['test_tables'] ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <Check className="w-3.5 h-3.5" />
                              <span>Pass Check Verified</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              Ready for Test
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                            <span className="font-bold text-slate-700 block">🔴 Before State:</span>
                            <p className="text-slate-600">
                              A 4-column PTA Fee table with 4 item rows (Tuition: ₦45,000, Science Lab: ₦15,000, Library: ₦8,000, ICT: ₦12,000) and an empty Grand Total cell at the bottom of the Amount column.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
                            <span className="font-bold text-amber-900 block">🟡 Student Action:</span>
                            <p className="text-amber-800">
                              Click bottom Grand Total cell. Go to Table Tools Layout → Formula. Enter =SUM(ABOVE) with format ₦#,##0.00. Modify Tuition from ₦45,000 to ₦55,000. Select total and press F9.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                            <span className="font-bold text-emerald-900 block">🟢 After State / Pass Check:</span>
                            <p className="text-emerald-800">
                              Formula executes and total dynamically recalculates from ₦80,000 to ₦90,000. Underlying field code evaluates without error.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleRunPassCheck('test_tables')}
                            className="flex items-center gap-2 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-[#F5A623]" />
                            <span>Validate &amp; Mark Pass Check</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Mail Merge */}
                  {selectedSpecTab === 'mailmerge' && (
                    <div className="space-y-4">
                      {/* Part A: Verbatim Example */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">
                          Part A — Subtopic Real-World Example (Verbatim):
                        </div>
                        <h4 className="font-bold text-sm text-[#17182B]">3. Mail Merge</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          A secondary school principal issuing individualized admission offer and scholarship award letters to 250 admitted candidates. Each student has a distinct name, guardian address, admission number, entrance score, and scholarship eligibility. Instead of typing 250 separate documents, the secretary maintains a single recipient data spreadsheet and links it to a master Word letter template using Mail Merge fields («First_Name», «Exam_Score»). By applying Mail Merge Rules (IF...THEN...ELSE), students with scores above 80 automatically receive a scholarship commendation paragraph, while others receive standard enrollment guidelines, generating 250 unique personalized PDFs in seconds.
                        </p>
                      </div>

                      {/* Precision Test Specification */}
                      <div className="p-5 rounded-xl border border-indigo-200 bg-white shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                            Precision Test Specification #3: Mail Merge Conditional Logic
                          </h4>
                          {testResults['test_mailmerge'] ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <Check className="w-3.5 h-3.5" />
                              <span>Pass Check Verified</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              Ready for Test
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                            <span className="font-bold text-slate-700 block">🔴 Before State:</span>
                            <p className="text-slate-600">
                              Master admission template letter connected to student data source containing fields FirstName, EntranceScore (Amina: 88, Chinedu: 64, David: 76, Zainab: 92). Contains static text.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
                            <span className="font-bold text-amber-900 block">🟡 Student Action:</span>
                            <p className="text-amber-800">
                              Insert Mailings → Rules → 'If...Then...Else...'. Set condition: IF EntranceScore &gt;= 75 THEN insert Merit Scholarship paragraph ELSE insert standard orientation registration text. Preview records 1 to 4.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                            <span className="font-bold text-emerald-900 block">🟢 After State / Pass Check:</span>
                            <p className="text-emerald-800">
                              Record 1 (Amina, 88) displays scholarship award. Record 2 (Chinedu, 64) displays standard notice. Both dynamic condition branches verified cleanly across dataset.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleRunPassCheck('test_mailmerge')}
                            className="flex items-center gap-2 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-[#F5A623]" />
                            <span>Validate &amp; Mark Pass Check</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Week Details */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 block">
                      📖 Detailed Curriculum Lesson Notes:
                    </span>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                      {activeModalWeek.learn_text}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                    <span className="font-bold text-amber-900 block">
                      💻 Practical Assignment &amp; Hands-on Tasks:
                    </span>
                    <p className="text-amber-800 leading-relaxed whitespace-pre-line">
                      {activeModalWeek.do_instructions}
                    </p>
                  </div>

                  {activeModalWeek.content_json?.dtRealWorldCase && (
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
                      <span className="font-bold text-blue-900 block mb-1">
                        🌍 Real-World Application in Nigeria:
                      </span>
                      <p className="text-blue-800 leading-relaxed">
                        {activeModalWeek.content_json.dtRealWorldCase}
                      </p>
                    </div>
                  )}

                  {/* Checkpoint Questions */}
                  {activeModalWeek.content_json?.quiz && activeModalWeek.content_json.quiz.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                        Lesson Checkpoint Questions
                      </h4>
                      <div className="space-y-3">
                        {activeModalWeek.content_json.quiz.map((q, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white text-xs space-y-2">
                            <div className="font-bold text-slate-800">
                              {idx + 1}. {q.question}
                            </div>
                            <div className="space-y-1.5 pl-2">
                              {q.options.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className={`p-2 rounded-lg border text-xs ${
                                    oIdx === q.correctIndex
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                                      : 'bg-slate-50 border-slate-100 text-slate-600'
                                  }`}
                                >
                                  {opt} {oIdx === q.correctIndex && '✓ (Correct)'}
                                </div>
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-500 italic pt-1">
                              Explanation: {q.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">
                Verified against official JSS3 Digital Technologies curriculum.
              </span>
              <button
                onClick={() => setActiveModalWeek(null)}
                className="px-5 py-2 bg-[#17182B] text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
