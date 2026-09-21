import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Sparkles, Check, Trash2, Heart, Lightbulb, Volume2 } from 'lucide-react';
import { CaiProgress, CaiStudent, CaiWeek, MiniAIResult, PrimaryBlock } from '../types';
import { PRIMARY_AVAILABLE_BLOCKS } from '../lib/seedData';
import { runMiniPython } from '../lib/interpreter';
import { MiniAIPanel } from './MiniAIPanel';

interface PrimaryPlaygroundProps {
  week: CaiWeek;
  student: CaiStudent;
  existingProgress?: CaiProgress | null;
  onSaveProgress: (submission: CaiProgress['submission'], output: string, aiInput?: string, aiResult?: MiniAIResult) => void;
}

export const PrimaryPlayground: React.FC<PrimaryPlaygroundProps> = ({
  week,
  student,
  existingProgress,
  onSaveProgress,
}) => {
  // Initial blocks from week starter content or existing progress
  const initialBlocks =
    existingProgress?.submission.blocks ||
    week.content_json.starterBlocks || [
      { id: 'b_say', type: 'print_start', value: 'print("', display: 'Say 💬', category: 'say' },
      { id: 'b_hello', type: 'text', value: 'Hello world!', display: 'Hello world!', category: 'words' },
      { id: 'b_rocket', type: 'emoji', value: ' 🚀', display: '🚀 Rocket', category: 'emojis' },
    ];

  const [activeBlocks, setActiveBlocks] = useState<PrimaryBlock[]>(initialBlocks);
  const [output, setOutput] = useState<string[]>(
    existingProgress ? [existingProgress.output_captured] : ['Hello world! 🚀']
  );
  const [hasRun, setHasRun] = useState(false);
  const [lastAiInput, setLastAiInput] = useState<string>(existingProgress?.ai_demo_input || '');
  const [lastAiResult, setLastAiResult] = useState<MiniAIResult | undefined>(existingProgress?.ai_demo_result);

  // Filter available block chips
  const availableBlocks = week.content_json.availableBlocks || PRIMARY_AVAILABLE_BLOCKS;

  // Assemble Python code from blocks:
  // Combines text & emoji blocks inside a print("...")
  const assemblePythonCode = (blocks: PrimaryBlock[]): string => {
    // If no blocks, print empty message
    if (blocks.length === 0) return 'print("...")';

    // Extract inside text
    const innerPieces = blocks.map((b) => b.value.replace(/^print\("/, '').replace(/"\)$/, ''));
    const combined = innerPieces.join(' ').replace(/\s+/g, ' ').trim();
    // Safe escape quotes
    const safeString = combined.replace(/"/g, "'");
    return `print("${safeString}")`;
  };

  const handleAddBlock = (block: PrimaryBlock) => {
    // Clone with unique instance id
    const newBlock: PrimaryBlock = {
      ...block,
      id: `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setActiveBlocks((prev) => [...prev, newBlock]);
  };

  const handleRemoveBlock = (index: number) => {
    setActiveBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResetBlocks = () => {
    setActiveBlocks([
      { id: `blk-${Date.now()}-1`, type: 'print_start', value: 'print("', display: 'Say 💬', category: 'say' },
    ]);
    setOutput([]);
    setHasRun(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5A623', '#8CF2C7', '#0F6B63', '#FF6B6B', '#4D96FF'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleRunCode = () => {
    const pythonCode = assemblePythonCode(activeBlocks);
    const res = runMiniPython(pythonCode);
    const captured = res.output.join('\n') || (res.error ? `Error: ${res.error}` : 'No output');

    setOutput(res.output.length > 0 ? res.output : [captured]);
    setHasRun(true);

    if (!res.error) {
      triggerConfetti();
    }

    // Save attempt to student progress
    onSaveProgress(
      {
        type: 'blocks',
        code: pythonCode,
        blocks: activeBlocks,
      },
      captured,
      lastAiInput,
      lastAiResult
    );
  };

  const handleAiDetection = (input: string, result: MiniAIResult) => {
    setLastAiInput(input);
    setLastAiResult(result);
    // Update progress with new AI attempt
    const pythonCode = assemblePythonCode(activeBlocks);
    onSaveProgress(
      {
        type: 'blocks',
        code: pythonCode,
        blocks: activeBlocks,
      },
      output.join('\n'),
      input,
      result
    );
  };

  const currentPythonCode = assemblePythonCode(activeBlocks);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Week Header Banner - Big, Bold, Friendly */}
      <div className="bg-gradient-to-br from-[#F5A623]/20 via-amber-50 to-white border-2 border-[#F5A623]/40 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 bg-[#F5A623] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xs">
                Primary Tier • Week {week.week_number}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Student: {student.full_name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17182B] tracking-tight">
              {week.title}
            </h1>
            <p className="mt-1.5 text-base text-slate-700 leading-relaxed font-medium">
              {week.learn_text}
            </p>
          </div>

          <div className="shrink-0 bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs flex items-center gap-3">
            <span className="text-3xl">🌟</span>
            <div className="text-xs">
              <div className="font-bold text-slate-900">Your Goal:</div>
              <div className="text-slate-600 font-medium">Tap blocks → Click Run → See words!</div>
            </div>
          </div>
        </div>

        {week.do_instructions && (
          <div className="mt-4 pt-4 border-t border-amber-200/80 flex items-start gap-2.5 text-sm text-amber-900">
            <Lightbulb className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
            <span className="font-semibold">{week.do_instructions}</span>
          </div>
        )}
      </div>

      {/* Block Builder Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Assembled Instruction Track */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧩</span>
                <h2 className="font-extrabold text-lg text-[#17182B]">Your Message Blocks</h2>
              </div>
              <button
                onClick={handleResetBlocks}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Fresh</span>
              </button>
            </div>

            {/* Assembled Blocks Container */}
            <div className="min-h-[140px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-wrap items-center gap-2.5 content-start">
              {activeBlocks.length === 0 ? (
                <div className="w-full text-center py-8 text-slate-400 font-medium text-sm">
                  Tap blocks below to build your computer instruction!
                </div>
              ) : (
                activeBlocks.map((block, idx) => (
                  <button
                    key={block.id}
                    id={`active-block-${idx}`}
                    onClick={() => handleRemoveBlock(idx)}
                    title="Tap to remove"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-sm shadow-xs transition-all transform hover:scale-105 active:scale-95 cursor-pointer bg-white border-2 border-[#F5A623] text-[#17182B] hover:border-rose-400 hover:bg-rose-50"
                  >
                    <span>{block.display}</span>
                    <span className="text-xs text-slate-400 group-hover:text-rose-500 font-normal">
                      ✕
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Live Python Preview Underneath */}
            <div className="mt-4 p-3 bg-[#17182B] rounded-2xl flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2 font-mono overflow-x-auto py-1">
                <span className="text-slate-400">Computer code:</span>
                <code className="text-[#8CF2C7] font-bold">{currentPythonCode}</code>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold ml-2 shrink-0">
                Python Syntax
              </span>
            </div>

            {/* Big 48px Action Button */}
            <div className="mt-5">
              <button
                id="primary-run-btn"
                onClick={handleRunCode}
                className="w-full py-4 px-6 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-[#F5A623] to-[#e69512] hover:from-[#e69512] hover:to-[#d8890d] shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white" />
                <span>RUN MY CODE! 🚀</span>
              </button>
            </div>
          </div>

          {/* Block Selection Palette */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-sm">
            <h3 className="font-extrabold text-sm text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              Tap to add words &amp; emojis:
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {availableBlocks.map((block) => (
                <button
                  key={block.id}
                  id={`palette-block-${block.id}`}
                  onClick={() => handleAddBlock(block)}
                  className="min-h-[48px] px-4 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#F5A623] bg-slate-50 hover:bg-amber-50 font-bold text-sm text-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>{block.display}</span>
                  <span className="text-xs text-[#F5A623] font-extrabold">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Speech Output Balloon */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#17182B] rounded-3xl p-6 text-white shadow-md border-2 border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8CF2C7]/20 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-[#8CF2C7]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">What the Computer Says:</h3>
                  <span className="text-[10px] text-slate-400">Instant Screen Output</span>
                </div>
              </div>

              {hasRun && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#8CF2C7] text-[#17182B] animate-bounce">
                  🎉 You did it!
                </span>
              )}
            </div>

            {/* Big Friendly Output Balloon */}
            <div className="bg-slate-900/90 border-2 border-[#8CF2C7]/40 rounded-2xl p-6 min-h-[160px] flex items-center justify-center text-center">
              {output.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-4xl block mb-2">💬</span>
                  <div className="text-xl sm:text-2xl font-black text-[#8CF2C7] break-words">
                    {output.join(' ')}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    The computer followed your instructions word-for-word!
                  </p>
                </div>
              ) : (
                <div className="text-slate-500 text-sm font-medium">
                  Press the big <strong className="text-amber-400">RUN MY CODE</strong> button to see your output!
                </div>
              )}
            </div>

            {/* Achievement Badge */}
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <span className="font-semibold text-slate-200">
                  Week {week.week_number} Booklet Saved
                </span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Auto-tracked
              </span>
            </div>
          </div>

          {/* Quick Tip for Primary */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-xs text-amber-900 space-y-1">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
              <span>💡</span>
              <span>Young Coder Fact:</span>
            </h4>
            <p className="leading-relaxed">
              Every video game, robot, and phone app in the world started with simple commands just like these!
            </p>
          </div>
        </div>
      </div>

      {/* Shared Mini AI Mood Detector for Primary */}
      <MiniAIPanel
        tier="primary"
        examplePrompts={week.content_json.aiExamplePrompts}
        lastInput={lastAiInput}
        lastResult={lastAiResult}
        onRunDetection={handleAiDetection}
      />
    </div>
  );
};
