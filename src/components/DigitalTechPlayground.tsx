import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Key,
  Binary,
  Layers,
  Award,
  Lock,
  Globe,
  Save,
  Check,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaiProgress, CaiStudent, CaiWeek } from '../types';

interface DigitalTechPlaygroundProps {
  week: CaiWeek;
  student: CaiStudent;
  existingProgress: CaiProgress | null;
  onSaveProgress: (
    submission: CaiProgress['submission'],
    output: string,
    aiInput?: string,
    aiResult?: CaiProgress['ai_demo_result']
  ) => void;
  onNavigateToSecretsLab?: () => void;
}

export function DigitalTechPlayground({
  week,
  student,
  existingProgress,
  onSaveProgress,
  onNavigateToSecretsLab,
}: DigitalTechPlaygroundProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [studentNotes, setStudentNotes] = useState('');

  // Load existing progress if available
  useEffect(() => {
    if (existingProgress && existingProgress.submission) {
      if (existingProgress.submission.dtScore !== undefined) {
        setQuizScore(existingProgress.submission.dtScore);
        setQuizSubmitted(true);
      }
      if (existingProgress.submission.code) {
        setStudentNotes(existingProgress.submission.code);
      }
    } else {
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
      setStudentNotes('');
    }
  }, [week.id, existingProgress]);

  const quizList = week.content_json?.quiz || [];

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleEvaluateQuiz = () => {
    let score = 0;
    quizList.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    if (score === quizList.length && score > 0) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleSaveLab = () => {
    const finalScore = quizScore !== null ? quizScore : 0;
    const outputSummary = `JSS3 Digital Technologies Lab Completed — Week ${week.week_number}: ${week.title}
Quiz Score: ${finalScore} / ${quizList.length}
Student Notes: ${studentNotes || 'Reviewed theoretical principles and practical real-world applications.'}`;

    onSaveProgress(
      {
        type: 'dt_lab',
        code: studentNotes,
        dtAnswers: selectedAnswers,
        dtScore: finalScore,
      },
      outputSummary
    );

    setSaveSuccess(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const allQuestionsAnswered = quizList.length > 0 && Object.keys(selectedAnswers).length === quizList.length;

  return (
    <div id="digital-tech-playground" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              JSS3 Digital Technologies Track • Powered by FATap-CT
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-bold">
              Week {week.week_number}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#17182B] tracking-tight">
            {week.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {week.content_json?.dtConcept || week.learn_text.slice(0, 150) + '...'}
          </p>
        </div>

        {existingProgress ? (
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Completed &amp; Saved</span>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl flex items-center gap-2 text-amber-800 text-xs font-bold shrink-0">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>In Progress</span>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">
            Lab progress saved! Your work and score are recorded in your term booklet for parent review.
          </span>
        </div>
      )}

      {/* Section 1: Lesson Notes & Real-World Case Study */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-[#17182B] uppercase tracking-wider">
            1. Core Lesson Notes &amp; Technical Framework
          </h2>
        </div>

        <div className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-5 rounded-xl border border-slate-100 whitespace-pre-wrap">
          {week.learn_text}
        </div>

        {week.content_json?.dtRealWorldCase && (
          <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>Real-World Application &amp; Nigerian Tech Case Study</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              {week.content_json.dtRealWorldCase}
            </p>
          </div>
        )}
      </div>

      {/* Section 2: Interactive Mission & Secrets Lab Shortcut */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-[#17182B] uppercase tracking-wider">
              2. Weekly Lab Mission &amp; Practical Activity
            </h2>
          </div>
          {onNavigateToSecretsLab && (
            <button
              onClick={onNavigateToSecretsLab}
              className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 hover:underline"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Open Secrets Lab &rarr;</span>
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-2 border border-slate-800">
          <div className="text-[11px] font-mono text-[#F5A623] uppercase tracking-wider font-bold">
            Mission Instructions:
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {week.do_instructions}
          </p>
          {week.content_json?.challenge && (
            <div className="pt-2 text-xs text-emerald-400 font-mono border-t border-slate-800">
              <strong>Challenge:</strong> {week.content_json.challenge}
            </div>
          )}
        </div>

        {/* Student Lab Reflection Notes */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Your Lab Findings &amp; Reflection Summary:
          </label>
          <textarea
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 font-sans"
            placeholder="Document what you learned, any cipher/binary calculations, or defense steps observed..."
          />
        </div>
      </div>

      {/* Section 3: Check Your Understanding (Quiz) */}
      {quizList.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-[#17182B] uppercase tracking-wider">
                3. Check Your Understanding ({quizList.length} Questions)
              </h2>
            </div>
            {quizScore !== null && (
              <span className="text-xs font-bold font-mono px-3 py-1 rounded bg-indigo-100 text-indigo-900">
                Score: {quizScore} / {quizList.length}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {quizList.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={qIdx}
                  className={`p-4 rounded-xl border transition ${
                    quizSubmitted
                      ? isCorrect
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-rose-200 bg-rose-50/20'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800 mb-2.5">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let optClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optClass = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optClass = 'bg-rose-100 border-rose-400 text-rose-950 font-medium';
                        }
                      } else if (isOptionSelected) {
                        optClass = 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between cursor-pointer ${optClass}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-2.5 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      <strong className="text-slate-700">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleEvaluateQuiz}
              disabled={!allQuestionsAnswered}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit &amp; Check Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-600">
                Quiz completed with {quizScore} / {quizList.length} correct answers.
              </span>
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizScore(null);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Section 4: Save & Complete Lab */}
      <div className="bg-[#17182B] text-white p-6 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-white">Save Completed Lab Session</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Saves your lab score and answers to your booklet so your parents and teacher can inspect your progress.
          </p>
        </div>

        <button
          onClick={handleSaveLab}
          className="px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#e0961b] text-[#17182B] font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Lab &amp; Update Booklet</span>
        </button>
      </div>
    </div>
  );
}
