import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  Code,
  Bot,
  Printer,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { CaiClass, CaiProgress, CaiSchool, CaiStudent, CaiWeek } from '../types';

interface ParentBookletViewProps {
  school: CaiSchool;
  cls: CaiClass;
  student: CaiStudent;
  weeks: CaiWeek[];
  progress: CaiProgress[];
  onToggleSignoff: (progressId: string, signed: boolean) => void;
  onSwitchChild: () => void;
}

export const ParentBookletView: React.FC<ParentBookletViewProps> = ({
  school,
  cls,
  student,
  weeks,
  progress,
  onToggleSignoff,
  onSwitchChild,
}) => {
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
  });

  const toggleExpand = (wNum: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [wNum]: !prev[wNum] }));
  };

  const progressByWeek = new Map<number, CaiProgress>();
  progress.forEach((p) => {
    progressByWeek.set(p.week_number, p);
  });

  const completedCount = progress.length;
  const signedCount = progress.filter((p) => p.parent_signoff).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Printable Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                Official Student Booklet
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {school.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17182B] tracking-tight">
              {student.full_name}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Class: <strong className="text-slate-900">{cls.name}</strong> • Tier:{' '}
              <strong className="uppercase text-[#0F6B63]">{cls.tier}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onSwitchChild}
              className="text-xs text-amber-700 hover:underline font-semibold cursor-pointer"
            >
              ← Choose another child
            </button>
          </div>
        </div>

        {/* Progress Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Total Completed</span>
            <span className="text-2xl font-black text-[#17182B] mt-1 block">
              {completedCount} <span className="text-xs text-slate-400 font-normal">/ 13 Weeks</span>
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Parent Verified</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {signedCount} <span className="text-xs text-slate-400 font-normal">Signed off</span>
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Curriculum Tier</span>
            <span className="text-2xl font-black text-[#0F6B63] mt-1 block uppercase">
              {cls.tier}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Course Status</span>
            <span className="text-sm font-bold text-amber-600 mt-2 block flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Active Term</span>
            </span>
          </div>
        </div>
      </div>

      {/* Graduation / Capstone Card if Week 13 Completed */}
      {progressByWeek.has(13) && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-[#F5A623] text-slate-950 p-6 rounded-2xl shadow-sm border border-amber-300 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-slate-900" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider bg-white/40 px-2 py-0.5 rounded-md">
              Graduation Milestone Achieved!
            </span>
            <h3 className="text-lg font-black mt-1">
              Week 13 Capstone Successfully Completed
            </h3>
            <p className="text-xs text-slate-900/90 font-medium mt-0.5">
              {student.full_name} has completed the full 13-week curriculum for {cls.tier.toUpperCase()} tier!
            </p>
          </div>
        </div>
      )}

      {/* Week by Week Accordion Booklet */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[#17182B] flex items-center gap-2 px-1">
          <Calendar className="w-5 h-5 text-[#F5A623]" />
          <span>Curriculum History &amp; Work Records (Weeks 1–13)</span>
        </h2>

        {weeks.map((week) => {
          const attempt = progressByWeek.get(week.week_number);
          const isCompleted = !!attempt;
          const isExpanded = expandedWeeks[week.week_number] ?? isCompleted;

          return (
            <div
              key={week.id}
              className={`bg-white border transition-all rounded-xl overflow-hidden ${
                isCompleted ? 'border-slate-200 shadow-2xs' : 'border-slate-200/60 opacity-80'
              }`}
            >
              {/* Week Accordion Header */}
              <button
                onClick={() => toggleExpand(week.week_number)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : week.week_number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#17182B]">
                        Week {week.week_number}: {week.title}
                      </span>
                      {attempt?.parent_signoff && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          Signed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {week.learn_text}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Upcoming'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Week Accordion Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  {isCompleted ? (
                    <>
                      {/* What was written / assembled */}
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-slate-500" />
                          <span>Code Submitted by {student.full_name}:</span>
                        </div>
                        <div className="bg-[#17182B] text-[#8CF2C7] p-3.5 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                          {attempt.submission.code || 'print("...")'}
                        </div>
                      </div>

                      {/* Output produced */}
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-1">
                          Computer Output Result:
                        </div>
                        <div className="bg-slate-100 text-slate-900 p-3 rounded-lg font-mono text-xs border border-slate-200 whitespace-pre-wrap">
                          {attempt.output_captured || 'No output recorded'}
                        </div>
                      </div>

                      {/* Mini AI Activity if recorded */}
                      {attempt.ai_demo_input && (
                        <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3.5 text-xs text-teal-950 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-bold flex items-center gap-1.5 text-teal-900">
                              <Bot className="w-4 h-4 text-[#0F6B63]" />
                              <span>Mini AI Experiment</span>
                            </div>
                            {attempt.ai_demo_result && (
                              <span className="font-bold text-sm flex items-center gap-1">
                                <span>{attempt.ai_demo_result.emoji}</span>
                                <span>{attempt.ai_demo_result.verdict}</span>
                              </span>
                            )}
                          </div>
                          <div className="bg-white/90 p-2.5 rounded-lg border border-teal-200 text-slate-800 italic">
                            "{attempt.ai_demo_input}"
                          </div>
                        </div>
                      )}

                      {/* Completion Date & Parent Signoff Button */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            Completed on{' '}
                            {new Date(attempt.completed_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div>
                          <button
                            id={`signoff-btn-w${week.week_number}`}
                            onClick={() => onToggleSignoff(attempt.id, !attempt.parent_signoff)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                              attempt.parent_signoff
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                                : 'bg-[#F5A623] hover:bg-[#e09315] text-white shadow-2xs'
                            }`}
                          >
                            <FileCheck className="w-4 h-4" />
                            <span>
                              {attempt.parent_signoff
                                ? 'Verified by Parent ✓ (Click to undo)'
                                : 'Sign Off on This Week'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-4 text-center text-xs text-slate-400 italic">
                      This week has not been completed yet by the student.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
