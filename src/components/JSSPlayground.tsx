import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Terminal, Code2, Sparkles, BookOpen } from 'lucide-react';
import { CaiProgress, CaiStudent, CaiWeek, MiniAIResult } from '../types';
import { runMiniPython } from '../lib/interpreter';
import { MiniAIPanel } from './MiniAIPanel';

interface JSSPlaygroundProps {
  week: CaiWeek;
  student: CaiStudent;
  existingProgress?: CaiProgress | null;
  onSaveProgress: (submission: CaiProgress['submission'], output: string, aiInput?: string, aiResult?: MiniAIResult) => void;
}

export const JSSPlayground: React.FC<JSSPlaygroundProps> = ({
  week,
  student,
  existingProgress,
  onSaveProgress,
}) => {
  const defaultStarter =
    week.content_json.starterCode ||
    `# Week ${week.week_number}: ${week.title}\nprint("Hello, JSS Coding Lab!")\nstudent = "${student.full_name}"\nprint("Active Student:", student)`;

  const [code, setCode] = useState<string>(
    existingProgress?.submission.code || defaultStarter
  );

  const [output, setOutput] = useState<string[]>(
    existingProgress?.output_captured ? existingProgress.output_captured.split('\n') : []
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasRunSuccessfully, setHasRunSuccessfully] = useState(false);
  const [lastAiInput, setLastAiInput] = useState<string>(existingProgress?.ai_demo_input || '');
  const [lastAiResult, setLastAiResult] = useState<MiniAIResult | undefined>(existingProgress?.ai_demo_result);

  // Sync if week changes
  useEffect(() => {
    if (!existingProgress) {
      setCode(week.content_json.starterCode || defaultStarter);
      setOutput([]);
      setErrorMsg(null);
      setHasRunSuccessfully(false);
    }
  }, [week.id]);

  const handleRun = () => {
    const res = runMiniPython(code);
    if (res.error) {
      setErrorMsg(res.error);
      setOutput(res.output);
      setHasRunSuccessfully(false);
    } else {
      setErrorMsg(null);
      setOutput(res.output);
      setHasRunSuccessfully(true);
    }

    const capturedText = res.output.join('\n') || (res.error ? `Error: ${res.error}` : '');

    onSaveProgress(
      {
        type: 'typed_code',
        code: code,
      },
      capturedText,
      lastAiInput,
      lastAiResult
    );
  };

  const handleReset = () => {
    const fresh = week.content_json.starterCode || defaultStarter;
    setCode(fresh);
    setOutput([]);
    setErrorMsg(null);
    setHasRunSuccessfully(false);
  };

  const insertSnippet = (snippet: string) => {
    setCode((prev) => prev + '\n' + snippet);
  };

  const handleAiDetection = (input: string, result: MiniAIResult) => {
    setLastAiInput(input);
    setLastAiResult(result);
    onSaveProgress(
      {
        type: 'typed_code',
        code: code,
      },
      output.join('\n'),
      input,
      result
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Week Header Banner - JSS Calm Proportions (10-12px radius) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#0F6B63]/15 text-[#0F6B63] border border-[#0F6B63]/30">
                JSS Tier (Junior Secondary) • Week {week.week_number}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Student: {student.full_name}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#17182B] tracking-tight">
              {week.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed max-w-3xl">
              {week.learn_text}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasRunSuccessfully && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Code Executed Successfully
              </span>
            )}
          </div>
        </div>

        {week.do_instructions && (
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
            <BookOpen className="w-4 h-4 text-[#0F6B63] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Weekly Task: </strong>
              <span>{week.do_instructions}</span>
            </div>
          </div>
        )}
      </div>

      {/* Editor & Output Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-[#17182B] border border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col">
            {/* Editor Bar */}
            <div className="bg-[#111222] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-400 font-mono text-[11px] ml-2">
                  main.py (Python 3.x subset)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="jss-reset-code-btn"
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset to starter snippet"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-3 bg-[#17182B] font-mono text-sm leading-relaxed text-slate-100">
              <textarea
                id="jss-code-textarea"
                rows={12}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent text-[#8CF2C7] focus:outline-hidden font-mono resize-y selection:bg-[#F5A623]/30"
                placeholder="# Write your Python code here..."
              />
            </div>

            {/* Editor Footer with Run Button */}
            <div className="bg-[#111222] px-4 py-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>{code.split('\n').length} lines</span>
                <span>•</span>
                <span className="text-slate-500">Variables, arithmetic &amp; if/else allowed</span>
              </div>

              <button
                id="jss-run-btn"
                onClick={handleRun}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-[#17182B] bg-[#8CF2C7] hover:bg-[#79e5b8] active:scale-98 transition-all shadow-xs cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          {/* Quick Syntax Chips */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-xs">
            <span className="font-semibold text-slate-700 mr-2">Quick Inserts:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
              <button
                onClick={() => insertSnippet('print("New output line")')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[11px] transition-colors cursor-pointer"
              >
                + print()
              </button>
              <button
                onClick={() => insertSnippet('score = 80')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[11px] transition-colors cursor-pointer"
              >
                + variable = value
              </button>
              <button
                onClick={() => insertSnippet('if score >= 50:\n    print("Passed!")\nelse:\n    print("Try again")')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[11px] transition-colors cursor-pointer"
              >
                + if / else
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#17182B] border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[320px]">
            {/* Terminal Header */}
            <div className="bg-[#111222] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#8CF2C7]" />
                <span className="font-mono text-slate-300 font-medium text-[11px]">
                  Output Terminal
                </span>
              </div>
              <span className="text-[10px] text-slate-400">stdout</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 flex-1 font-mono text-xs text-slate-200 overflow-y-auto space-y-1">
              {output.length === 0 && !errorMsg ? (
                <div className="text-slate-500 italic py-10 text-center">
                  Press <strong className="text-[#8CF2C7]">Run Code</strong> to see program output.
                </div>
              ) : (
                <>
                  {output.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#8CF2C7]">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  ))}
                  {errorMsg && (
                    <div className="mt-3 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-xs">{errorMsg}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Terminal Status Footer */}
            <div className="bg-[#111222] px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Exit Code: {errorMsg ? '1 (Error)' : output.length > 0 ? '0 (Success)' : '—'}</span>
              <span className="text-emerald-400 font-medium">Logged in Booklet</span>
            </div>
          </div>

          {/* JSS Learning Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span>📌</span>
              <span>Python Indentation Rule:</span>
            </h4>
            <p className="leading-relaxed">
              Always indent code inside <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">if:</code> and <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">else:</code> blocks by 4 spaces. The computer uses indentation to understand which lines belong together.
            </p>
          </div>
        </div>
      </div>

      {/* Shared Mini AI Mood Detector for JSS */}
      <MiniAIPanel
        tier="jss"
        examplePrompts={week.content_json.aiExamplePrompts}
        lastInput={lastAiInput}
        lastResult={lastAiResult}
        onRunDetection={handleAiDetection}
      />
    </div>
  );
};
