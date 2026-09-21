import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { detectMood } from '../lib/interpreter';
import { MiniAIResult, Tier } from '../types';

interface MiniAIPanelProps {
  tier: Tier;
  examplePrompts?: string[];
  lastResult?: MiniAIResult | null;
  lastInput?: string;
  onRunDetection: (input: string, result: MiniAIResult) => void;
}

export const MiniAIPanel: React.FC<MiniAIPanelProps> = ({
  tier,
  examplePrompts = [],
  lastResult,
  lastInput = '',
  onRunDetection,
}) => {
  const [inputText, setInputText] = useState(lastInput);
  const [currentResult, setCurrentResult] = useState<MiniAIResult | null>(lastResult || null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Default prompts by tier if none passed in
  const defaultPrompts: Record<Tier, string[]> = {
    primary: [
      'I am super happy and excited to code today! 🎉',
      'Today was fun and awesome with my friends! 😊',
      'I felt a bit worried, but now I feel glad! ❤️',
    ],
    jss: [
      'I feel very confident and excited about writing clean Python code.',
      'Debugging syntax errors can be annoying, but fixing them is wonderful.',
      'Today was productive and our team did great work.',
    ],
    ss: [
      'Writing production algorithms gives our engineering team immense joy and pride.',
      'Encountering unexpected runtime exceptions was stressful and tiring.',
      'Our sentiment classification model achieved optimal convergence and reliability.',
    ],
  };

  const prompts = examplePrompts.length > 0 ? examplePrompts : defaultPrompts[tier];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    const res = detectMood(inputText);
    setCurrentResult(res);
    setHasAnalyzed(true);
    onRunDetection(inputText, res);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputText(prompt);
    const res = detectMood(prompt);
    setCurrentResult(res);
    setHasAnalyzed(true);
    onRunDetection(prompt, res);
  };

  // Styling based on tier
  const isPrimary = tier === 'primary';
  const isSS = tier === 'ss';

  const containerRadius = isPrimary ? 'rounded-3xl' : isSS ? 'rounded-xl' : 'rounded-2xl';
  const btnRadius = isPrimary ? 'rounded-2xl py-3 text-base' : isSS ? 'rounded-lg py-2.5 text-sm' : 'rounded-xl py-2.5 text-sm';

  return (
    <div
      id="mini-ai-panel"
      className={`bg-white border border-teal-200/80 ${containerRadius} shadow-sm overflow-hidden flex flex-col`}
    >
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-[#0F6B63] to-[#124e49] text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
            <Bot className="w-6 h-6 text-[#8CF2C7]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base tracking-tight">Mini AI: Mood Detector</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#8CF2C7]/20 text-[#8CF2C7] border border-[#8CF2C7]/30">
                Natural Language Pattern Match
              </span>
            </div>
            <p className="text-xs text-teal-100/90">
              {isPrimary
                ? 'Type how you feel, and watch the AI guess your mood!'
                : 'Sentiment analysis engine comparing linguistic tokens against polarity dictionaries.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-xs text-teal-200 border border-teal-400/20">
          <Sparkles className="w-3.5 h-3.5 text-[#8CF2C7]" />
          <span>Shared Lab AI</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Sample Prompt Chips */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            {isPrimary ? '💡 Tap an example to try:' : 'Select an experimental prompt or type your own:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                id={`ai-prompt-btn-${idx}`}
                onClick={() => handleSelectPrompt(p)}
                className={`text-left text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  inputText === p
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                "{p.length > 55 ? p.slice(0, 52) + '...' : p}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Text Area */}
        <div>
          <div className="relative">
            <textarea
              id="ai-mood-input"
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isPrimary
                  ? 'Tell the computer how your day is going...'
                  : 'Enter text to evaluate for positive or negative sentiment...'
              }
              className={`w-full p-3.5 text-sm bg-slate-50 border border-slate-300 ${isPrimary ? 'rounded-2xl' : 'rounded-xl'} focus:outline-hidden focus:ring-2 focus:ring-[#0F6B63] focus:bg-white text-slate-900 placeholder:text-slate-400`}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              {inputText.trim().split(/\s+/).filter(Boolean).length} words entered
            </span>
            <button
              id="ai-analyze-btn"
              onClick={handleAnalyze}
              disabled={!inputText.trim()}
              className={`inline-flex items-center gap-2 px-5 font-bold text-white bg-[#0F6B63] hover:bg-[#0d5952] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer ${btnRadius}`}
            >
              <span>{isPrimary ? 'Guess My Mood! 🔍' : 'Run Sentiment Analysis'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analysis Result Card */}
        {currentResult && (
          <div
            id="ai-result-box"
            className={`p-4 border ${
              currentResult.verdict === 'Positive'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : currentResult.verdict === 'Negative'
                ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            } ${containerRadius} transition-all`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl leading-none" role="img" aria-label="mood emoji">
                  {currentResult.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                      Detected Sentiment:
                    </span>
                    <span className="text-base font-extrabold">{currentResult.verdict}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {currentResult.verdict === 'Positive'
                      ? 'The AI detected uplifting, positive emotional markers in your words.'
                      : currentResult.verdict === 'Negative'
                      ? 'The AI noticed expressions of frustration, worry, or difficulty.'
                      : currentResult.verdict === 'Mixed'
                      ? 'Balanced mix of both positive and negative keywords detected.'
                      : 'No clear sentiment indicators detected; classified as neutral.'}
                  </p>
                </div>
              </div>

              {hasAnalyzed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Logged in Booklet
                </span>
              )}
            </div>

            {/* Keyword breakdown */}
            <div className="mt-3 pt-3 border-t border-black/10 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Positive words noticed:</span>
                {currentResult.posHits.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {currentResult.posHits.map((w, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-medium text-[11px]"
                      >
                        +{w}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">None</span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Negative words noticed:</span>
                {currentResult.negHits.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {currentResult.negHits.map((w, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-medium text-[11px]"
                      >
                        -{w}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">None</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Required Educational Disclosure */}
        <div className="flex items-start gap-2.5 text-[11px] text-slate-600 bg-slate-100/80 p-3 rounded-xl border border-slate-200">
          <AlertCircle className="w-4 h-4 text-[#0F6B63] shrink-0 mt-0.5" />
          <span>
            <strong>How this works:</strong> This Mini AI uses deterministic word tokenization and pattern matching against emotional dictionaries — not a deep neural network. Real AI starts with understanding how computers recognize human patterns!
          </span>
        </div>
      </div>
    </div>
  );
};
