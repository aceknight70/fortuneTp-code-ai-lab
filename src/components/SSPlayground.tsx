import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, Terminal, Cpu, Clock, Layers, AlertCircle } from 'lucide-react';
import { CaiProgress, CaiStudent, CaiWeek, MiniAIResult } from '../types';
import { runMiniPython } from '../lib/interpreter';
import { MiniAIPanel } from './MiniAIPanel';

interface SSPlaygroundProps {
  week: CaiWeek;
  student: CaiStudent;
  existingProgress?: CaiProgress | null;
  onSaveProgress: (submission: CaiProgress['submission'], output: string, aiInput?: string, aiResult?: MiniAIResult) => void;
}

export const SSPlayground: React.FC<SSPlaygroundProps> = ({
  week,
  student,
  existingProgress,
  onSaveProgress,
}) => {
  const defaultStarter =
    week.content_json.starterCode ||
    `# SS1-2 Senior Developer Module: ${week.title}\nschool = "Fortune's TP Academy"\nstudent = "${student.full_name}"\nprint("Target: Senior Python Certification")\nprint("Active Student:", student)\n\n# Iteration Engine\nfor i in range(1, 6):\n    print("Processing checkpoint", i, "-> Status OK")`;

  const [code, setCode] = useState<string>(
    existingProgress?.submission.code || defaultStarter
  );

  const [output, setOutput] = useState<string[]>(
    existingProgress?.output_captured ? existingProgress.output_captured.split('\n') : []
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [execTimestamp, setExecTimestamp] = useState<string | null>(null);
  const [lastAiInput, setLastAiInput] = useState<string>(existingProgress?.ai_demo_input || '');
  const [lastAiResult, setLastAiResult] = useState<MiniAIResult | undefined>(existingProgress?.ai_demo_result);

  useEffect(() => {
    if (!existingProgress) {
      setCode(week.content_json.starterCode || defaultStarter);
      setOutput([]);
      setErrorMsg(null);
      setExecTimestamp(null);
    }
  }, [week.id]);

  const handleRun = () => {
    const startTime = performance.now();
    const res = runMiniPython(code);
    const duration = (performance.now() - startTime).toFixed(2);

    if (res.error) {
      setErrorMsg(res.error);
      setOutput(res.output);
    } else {
      setErrorMsg(null);
      setOutput(res.output);
    }

    const timeString = `${new Date().toLocaleTimeString()} (${duration}ms)`;
    setExecTimestamp(timeString);

    const captured = res.output.join('\n') || (res.error ? `Error: ${res.error}` : '');

    onSaveProgress(
      {
        type: 'typed_code',
        code: code,
      },
      captured,
      lastAiInput,
      lastAiResult
    );
  };

  const handleReset = () => {
    setCode(week.content_json.starterCode || defaultStarter);
    setOutput([]);
    setErrorMsg(null);
    setExecTimestamp(null);
  };

  const insertCodeSnippet = (snippet: string) => {
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

  const lines = code.split('\n');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner - SS Professional Visuals (Less rounding, dark theme presence) */}
      <div className="bg-[#17182B] text-white border border-slate-800 rounded-lg p-5 sm:p-6 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#8CF2C7]/20 text-[#8CF2C7] border border-[#8CF2C7]/30 uppercase">
                Senior Secondary (SS1–2) • Module {week.week_number}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Student ID: {student.id.slice(0, 8)} • {student.full_name}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{week.title}</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-300 max-w-4xl leading-relaxed">
              {week.learn_text}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8CF2C7]" />
              <span>Python 3.12 Engine (ESM)</span>
            </div>
          </div>
        </div>

        {week.do_instructions && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 font-mono">
            <span className="text-[#8CF2C7] font-bold">&gt;&gt;&gt; TASK:</span>
            <span>{week.do_instructions}</span>
          </div>
        )}
      </div>

      {/* Main IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Code Editor Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-[#111222] border border-slate-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
            {/* Editor Header Bar */}
            <div className="bg-[#17182B] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-slate-300 font-medium text-xs">
                  script_week_{week.week_number}.py
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded font-mono">
                  UTF-8
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="ss-reset-code-btn"
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Editor Textarea with Line Numbers gutter */}
            <div className="flex bg-[#111222] p-2 min-h-[380px]">
              {/* Line Numbers */}
              <div className="select-none text-right pr-3 font-mono text-xs text-slate-600 leading-6 border-r border-slate-800/80 w-10 shrink-0">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code text input */}
              <textarea
                id="ss-code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full pl-3 bg-transparent text-[#8CF2C7] focus:outline-hidden font-mono text-xs leading-6 resize-y selection:bg-[#F5A623]/30"
                placeholder="# Enter Python algorithm..."
              />
            </div>

            {/* Editor Footer Status */}
            <div className="bg-[#17182B] px-4 py-2.5 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3">
                <span>Lines: {lines.length}</span>
                <span>•</span>
                <span>Full Feature Set (Loops + Conditionals)</span>
              </div>

              <button
                id="ss-run-btn"
                onClick={handleRun}
                className="inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-bold text-[#17182B] bg-[#8CF2C7] hover:bg-[#7ce2b8] active:scale-98 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Script</span>
              </button>
            </div>
          </div>

          {/* Quick Syntax Snippets for SS Level */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[#8CF2C7] text-xs font-semibold">Snippets:</span>
            <button
              onClick={() => insertCodeSnippet('for i in range(5):\n    print("Iteration:", i)')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 cursor-pointer"
            >
              + range(stop)
            </button>
            <button
              onClick={() => insertCodeSnippet('for i in range(1, 10):\n    print("Count:", i)')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 cursor-pointer"
            >
              + range(start, stop)
            </button>
            <button
              onClick={() => insertCodeSnippet('for i in range(10, 50, 5):\n    print("Step:", i)')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 cursor-pointer"
            >
              + range(start, stop, step)
            </button>
            <button
              onClick={() => insertCodeSnippet('total = 0\nfor n in range(1, 11):\n    total += n\nprint("Total:", total)')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 cursor-pointer"
            >
              + accumulator sum
            </button>
          </div>
        </div>

        {/* Console / Output Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-[#111222] border border-slate-800 rounded-lg overflow-hidden shadow-lg flex flex-col min-h-[380px]">
            {/* Terminal Header */}
            <div className="bg-[#17182B] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#8CF2C7]" />
                <span className="font-mono text-slate-300 font-semibold text-xs">
                  Process Output Console
                </span>
              </div>
              {execTimestamp && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{execTimestamp}</span>
                </div>
              )}
            </div>

            {/* Console Output Body */}
            <div className="p-4 flex-1 font-mono text-xs text-slate-200 overflow-y-auto space-y-1 bg-[#0d0e1b]">
              {output.length === 0 && !errorMsg ? (
                <div className="text-slate-600 italic py-16 text-center">
                  Terminal standby. Click <strong className="text-[#8CF2C7]">Execute Script</strong> to run.
                </div>
              ) : (
                <>
                  <div className="text-slate-500 text-[10px] pb-1 border-b border-slate-800/80 mb-2">
                    [Execution session initialized • Transpiled to ECMAScript runtime]
                  </div>
                  {output.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#8CF2C7] font-mono leading-5">
                      <span className="text-slate-600 select-none">$</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  ))}
                  {errorMsg && (
                    <div className="mt-3 p-3 rounded bg-rose-950/70 border border-rose-800 text-rose-300 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <div className="font-bold">Syntax/Runtime Exception:</div>
                        <div>{errorMsg}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Console Status */}
            <div className="bg-[#17182B] px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Lines Output: {output.length}</span>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                Logged in Student Booklet
              </span>
            </div>
          </div>

          {/* SS Senior Engineering Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs text-slate-400 space-y-1.5 font-mono">
            <div className="text-slate-200 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F5A623]" />
              <span>Senior Curriculum Notes:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              In Python, <code className="text-[#8CF2C7]">range(a, b)</code> is half-open: it includes <code className="text-[#8CF2C7]">a</code> but stops strictly before <code className="text-[#8CF2C7]">b</code>. Combine iteration with accumulators to build algorithms that scale!
            </p>
          </div>
        </div>
      </div>

      {/* Shared Mini AI Mood Detector for SS */}
      <MiniAIPanel
        tier="ss"
        examplePrompts={week.content_json.aiExamplePrompts}
        lastInput={lastAiInput}
        lastResult={lastAiResult}
        onRunDetection={handleAiDetection}
      />
    </div>
  );
};
