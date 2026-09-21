import React from 'react';
import { BookOpen, CheckCircle2, Circle, ArrowRight, Play, Award } from 'lucide-react';
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

  return (
    <div id="scheme-of-work-room" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">
              Curriculum Roadmap
            </span>
          </div>
          <h1 className="text-xl font-black text-[#17182B] tracking-tight">
            Scheme of Work — {cls.name} ({cls.tier.toUpperCase()} Tier)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            A full 13-week structured term crafted by Fortune's TP. Each week balances theoretical concepts with interactive hands-on code challenges and Mini AI experiments.
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

      {/* Week-by-Week Accordion/Grid */}
      <div className="space-y-4">
        {weeks.map((w) => {
          const isCompleted = completedWeekNumbers.has(w.week_number);
          const studentAttempt = progress.find((p) => p.week_number === w.week_number);

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
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    W{w.week_number}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-[#17182B]">{w.title}</h3>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed in Booklet</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          <Circle className="w-2.5 h-2.5 text-slate-400" />
                          <span>Upcoming / Open</span>
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
                          📖 Learn Concept:
                        </span>
                        <p className="text-slate-600 leading-relaxed">{w.learn_text}</p>
                      </div>

                      <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 text-xs">
                        <span className="font-bold text-amber-900 block mb-1">
                          💻 Hands-on Challenge:
                        </span>
                        <p className="text-amber-800/90 leading-relaxed">{w.do_instructions}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="md:self-center shrink-0">
                  <button
                    onClick={() => onSelectWeekForLab(w.week_number)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs w-full md:w-auto justify-center"
                  >
                    <Play className="w-3.5 h-3.5 text-[#F5A623] fill-current" />
                    <span>{isCompleted ? 'Review Lab' : 'Start Week ' + w.week_number}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
