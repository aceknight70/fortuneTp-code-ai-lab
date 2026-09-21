import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
} from 'lucide-react';
import { CaiClass, CaiQuestion, CaiStudent } from '../types';
import { db } from '../lib/db';

interface AskQuestionRoomProps {
  cls: CaiClass;
  student: CaiStudent;
}

export function AskQuestionRoom({ cls, student }: AskQuestionRoomProps) {
  const [questions, setQuestions] = useState<CaiQuestion[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, [student.id]);

  const loadQuestions = async () => {
    const data = await db.getQuestions();
    setQuestions(data);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setIsSubmitting(true);
    const created = await db.askQuestion(
      student.id,
      newQuestionText.trim(),
      student.full_name,
      cls.name
    );
    setIsSubmitting(false);

    setQuestions((prev) => [created, ...prev]);
    setNewQuestionText('');
    setSuccessNotice('Your question has been sent to Fortune and the teaching staff!');
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  return (
    <div id="ask-question-room" className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">
            Student Helpdesk
          </span>
        </div>
        <h1 className="text-xl font-black text-[#17182B] tracking-tight">
          Ask a Question — Direct to Fortune &amp; Teaching Staff
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Stuck on a syntax concept, loop boundary, or AI pattern? Ask your question here. Fortune reviews every inquiry and posts clear explanations that benefit everyone in the cohort.
        </p>
      </div>

      {/* Question Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#17182B] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#F5A623]" />
          <span>Ask Fortune a New Question</span>
        </h2>

        {successNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        <form onSubmit={handleAsk} className="space-y-3">
          <textarea
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Type your question clearly... e.g. Why does range(1, 5) only print up to 4?"
            rows={3}
            required
            className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] resize-none"
          />

          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              Asking as: <strong>{student.full_name}</strong> ({cls.name})
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newQuestionText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#17182B] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{isSubmitting ? 'Sending...' : 'Send Question'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Feed of Questions & Answers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
            Community Knowledge Feed ({questions.length})
          </h2>
          <span className="text-xs text-slate-500">Live Q&amp;A Archive</span>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No questions posted yet</p>
            <p className="text-xs text-slate-500">Be the first to submit a question to Fortune!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => {
              const date = new Date(q.created_at);
              const isOwn = q.student_id === student.id;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl border p-5 space-y-3 transition ${
                    isOwn ? 'border-amber-200 shadow-2xs' : 'border-slate-200'
                  }`}
                >
                  {/* Student Question */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 text-xs font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            {q.student_name || 'Student'}
                          </span>
                          {q.class_name && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              • {q.class_name}
                            </span>
                          )}
                          {isOwn && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 mt-1 font-medium">
                          {q.question_text}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {q.answered ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Answered</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Awaiting Answer</span>
                        </span>
                      )}
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Teacher Answer if present */}
                  {q.answer_text ? (
                    <div className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl ml-9 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fortune's Answer:</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed whitespace-pre-wrap">
                        {q.answer_text}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic ml-9">
                      Fortune is reviewing this question and will post an answer shortly.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
