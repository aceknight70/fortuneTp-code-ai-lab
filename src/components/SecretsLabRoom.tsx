import React, { useState, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  FileText,
  Table,
  Mail,
  Paintbrush,
  Play,
  RotateCw,
  CheckCircle2,
  Check,
  Award,
  Layers,
  HelpCircle,
  Copy,
  ChevronRight,
  RefreshCw,
  ArrowRight,
  Maximize2,
  Minimize2,
  Eye,
  Code2,
  Zap,
  Video,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  PlayCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaiClass, CaiStudent } from '../types';
import { MS_OFFICE_SECRETS, OfficeSecret } from '../lib/digitalTechData';

interface SecretsLabRoomProps {
  cls: CaiClass;
  student: CaiStudent;
}

export function SecretsLabRoom({ cls, student }: SecretsLabRoomProps) {
  const [activeSecretId, setActiveSecretId] = useState<string>('secret-01');
  const [solvedSecrets, setSolvedSecrets] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`cai_office_secrets_${student.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const activeSecret =
    MS_OFFICE_SECRETS.find((s) => s.id === activeSecretId) ||
    MS_OFFICE_SECRETS[0];

  const markSecretSolved = (secretId: string) => {
    if (!solvedSecrets.includes(secretId)) {
      const updated = [...solvedSecrets, secretId];
      setSolvedSecrets(updated);
      try {
        localStorage.setItem(
          `cai_office_secrets_${student.id}`,
          JSON.stringify(updated)
        );
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback
      }
    }
  };

  // ===================== SECRET 1: SECTION BREAKS STATE =====================
  const [showWatchFirstVideos, setShowWatchFirstVideos] = useState(true);
  const [sec1HasBreakP1, setSec1HasBreakP1] = useState(false);
  const [sec1HasBreakP2, setSec1HasBreakP2] = useState(false);
  const [sec1Page2Landscape, setSec1Page2Landscape] = useState(false);
  const [sec1UnlinkHeaderP2, setSec1UnlinkHeaderP2] = useState(false);
  const [sec1Feedback, setSec1Feedback] = useState<string>('');

  const isSec1Passed =
    sec1HasBreakP1 && sec1HasBreakP2 && sec1Page2Landscape && sec1UnlinkHeaderP2;

  useEffect(() => {
    if (isSec1Passed) {
      markSecretSolved('secret-01');
    }
  }, [isSec1Passed]);

  // Responsive step handlers that ensure every step works and auto-resolves prerequisites without blocking
  const handleToggleBreakP1 = () => {
    const next = !sec1HasBreakP1;
    setSec1HasBreakP1(next);
    setSec1Feedback(
      next
        ? '✓ Section Break (Next Page) inserted after Page 1. Section 2 is now an isolated partition!'
        : 'Section Break removed after Page 1.'
    );
  };

  const handleToggleUnlinkHeaderP2 = () => {
    if (!sec1HasBreakP1) {
      setSec1HasBreakP1(true);
    }
    const next = !sec1UnlinkHeaderP2;
    setSec1UnlinkHeaderP2(next);
    setSec1Feedback(
      next
        ? "✓ 'Link to Previous' turned OFF on Page 2 header! Header can now display independent title."
        : "'Link to Previous' re-enabled. Header is synced with Page 1."
    );
  };

  const handleToggleLandscapeP2 = () => {
    if (!sec1HasBreakP1) {
      setSec1HasBreakP1(true);
    }
    const next = !sec1Page2Landscape;
    setSec1Page2Landscape(next);
    setSec1Feedback(
      next
        ? '✓ Page 2 switched to Landscape orientation! Wide tables fit cleanly without flipping Page 1.'
        : 'Page 2 returned to Portrait.'
    );
  };

  const handleToggleBreakP2 = () => {
    if (!sec1HasBreakP1) {
      setSec1HasBreakP1(true);
    }
    if (!sec1Page2Landscape) {
      setSec1Page2Landscape(true);
    }
    const next = !sec1HasBreakP2;
    setSec1HasBreakP2(next);
    setSec1Feedback(
      next
        ? '✓ Section Break (Next Page) inserted after Page 2. Page 3 returns to Portrait orientation!'
        : 'Section Break removed after Page 2.'
    );
  };

  const handleAutoSolveSec1 = () => {
    setSec1HasBreakP1(true);
    setSec1UnlinkHeaderP2(true);
    setSec1Page2Landscape(true);
    setSec1HasBreakP2(true);
    setSec1Feedback('🎉 All 4 Section Break steps executed successfully! Pass Check verified.');
  };

  const handleResetSec1 = () => {
    setSec1HasBreakP1(false);
    setSec1UnlinkHeaderP2(false);
    setSec1Page2Landscape(false);
    setSec1HasBreakP2(false);
    setSec1Feedback('Document layout reset to initial 3-page Portrait state.');
  };

  // ===================== SECRET 2: TABLE MATH (=SUM(ABOVE)) STATE =====================
  const [tuitionAmount, setTuitionAmount] = useState<number>(45000);
  const [scienceAmount, setScienceAmount] = useState<number>(15000);
  const [libraryAmount, setLibraryAmount] = useState<number>(8000);
  const [ictAmount, setIctAmount] = useState<number>(12000);
  const [tableFormulaInserted, setTableFormulaInserted] = useState(false);
  const [showFieldCodes, setShowFieldCodes] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(80000);
  const [staleTotal, setStaleTotal] = useState(false);

  const handleUpdateFee = (newTuition: number) => {
    setTuitionAmount(newTuition);
    if (tableFormulaInserted) {
      setStaleTotal(true);
    }
  };

  const handleInsertFormula = () => {
    setTableFormulaInserted(true);
    setCalculatedTotal(tuitionAmount + scienceAmount + libraryAmount + ictAmount);
    setStaleTotal(false);
  };

  const handlePressF9 = () => {
    if (tableFormulaInserted) {
      setCalculatedTotal(tuitionAmount + scienceAmount + libraryAmount + ictAmount);
      setStaleTotal(false);
      markSecretSolved('secret-02');
    }
  };

  // ===================== SECRET 3: MAIL MERGE RULES STATE =====================
  interface StudentRecipient {
    id: number;
    name: string;
    guardian: string;
    score: number;
    status: string;
  }
  const recipients: StudentRecipient[] = [
    { id: 1, name: 'Amina Bello', guardian: 'Alhaji Bello', score: 88, status: 'Admitted' },
    { id: 2, name: 'Chinedu Eze', guardian: 'Chief Eze', score: 64, status: 'Admitted' },
    { id: 3, name: 'David Okafor', guardian: 'Dr. Okafor', score: 76, status: 'Admitted' },
    { id: 4, name: 'Zainab Musa', guardian: 'Mrs. Musa', score: 92, status: 'Admitted' },
  ];
  const [currentRecipientIdx, setCurrentRecipientIdx] = useState(0);
  const [mergeRuleConfigured, setMergeRuleConfigured] = useState(false);
  const [thresholdScore, setThresholdScore] = useState(75);
  const [testedBothBranches, setTestedBothBranches] = useState<{ high: boolean; standard: boolean }>({
    high: false,
    standard: false,
  });

  const currentRecipient = recipients[currentRecipientIdx];
  const isHighScorer = currentRecipient.score >= thresholdScore;

  const handleNavigateRecipient = (delta: number) => {
    const nextIdx = (currentRecipientIdx + delta + recipients.length) % recipients.length;
    setCurrentRecipientIdx(nextIdx);
    const rec = recipients[nextIdx];
    if (mergeRuleConfigured) {
      if (rec.score >= thresholdScore) {
        setTestedBothBranches((prev) => ({ ...prev, high: true }));
      } else {
        setTestedBothBranches((prev) => ({ ...prev, standard: true }));
      }
    }
  };

  useEffect(() => {
    if (mergeRuleConfigured && testedBothBranches.high && testedBothBranches.standard) {
      markSecretSolved('secret-03');
    }
  }, [mergeRuleConfigured, testedBothBranches]);

  // ===================== SECRET 4: ANIMATION PAINTER STATE =====================
  const [brushMode, setBrushMode] = useState<'idle' | 'locked'>('idle');
  const [cardAnimations, setCardAnimations] = useState<{ [key: string]: boolean }>({
    cardA: false,
    cardB: false,
    cardC: false,
  });
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

  const handleCardClick = (cardKey: string) => {
    if (brushMode === 'locked') {
      setCardAnimations((prev) => ({ ...prev, [cardKey]: true }));
    }
  };

  const handlePlaySlidePreview = () => {
    setIsPlayingAnimation(true);
    setTimeout(() => {
      setIsPlayingAnimation(false);
      if (cardAnimations.cardA && cardAnimations.cardB && cardAnimations.cardC) {
        markSecretSolved('secret-04');
      }
    }, 2200);
  };

  // ===================== SECRET 5: MORPH TRANSITION STATE =====================
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1);
  const [slideTransition, setSlideTransition] = useState<'cut' | 'morph'>('cut');
  const [morphDuration, setMorphDuration] = useState<number>(1.5);
  const [isMorphing, setIsMorphing] = useState(false);

  const handleTriggerSlideChange = (targetSlide: 1 | 2) => {
    if (slideTransition === 'morph') {
      setIsMorphing(true);
      setActiveSlide(targetSlide);
      setTimeout(() => {
        setIsMorphing(false);
        markSecretSolved('secret-05');
      }, morphDuration * 1000);
    } else {
      setActiveSlide(targetSlide);
    }
  };

  return (
    <div id="secrets-lab-room" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#17182B] via-slate-900 to-[#17182B] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">
              Classified Laboratory • JSS3 Digital Technologies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <span>Microsoft Office Secrets Lab</span>
            <Sparkles className="w-6 h-6 text-[#F5A623]" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Master the elite hidden tools of Microsoft Word and PowerPoint that 95% of users never discover. Test Section Breaks, live =SUM(ABOVE) formulas, conditional Mail Merge Rules, the Animation Painter, and the Morph transition with real-time pass checks!
          </p>
        </div>

        {/* Master Badges Box */}
        <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-5 py-4 rounded-2xl flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Secrets Mastered
            </div>
            <div className="text-2xl font-black text-[#F5A623]">
              {solvedSecrets.length} / {MS_OFFICE_SECRETS.length}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F5A623] text-[#17182B] flex items-center justify-center font-black text-lg shadow-sm">
            🏆
          </div>
        </div>
      </div>

      {/* Secret Navigator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {MS_OFFICE_SECRETS.map((secret, idx) => {
          const isSelected = activeSecretId === secret.id;
          const isSolved = solvedSecrets.includes(secret.id);

          return (
            <button
              key={secret.id}
              onClick={() => setActiveSecretId(secret.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#17182B] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSolved
                    ? 'bg-emerald-500 text-white'
                    : isSelected
                    ? 'bg-[#F5A623] text-[#17182B]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isSolved ? '✓' : idx + 1}
              </span>
              <div className="text-left">
                <div className="leading-tight">{secret.title.split(':')[0]}</div>
                <div
                  className={`text-[10px] ${
                    isSelected ? 'text-[#F5A623]' : 'text-slate-400'
                  }`}
                >
                  MS {secret.app} • {secret.difficulty}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Secret Showcase Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Secret Header Info */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                MS {activeSecret.app}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {activeSecret.codename}
              </span>
              {solvedSecrets.includes(activeSecret.id) && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Secret Mastered</span>
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#17182B]">
              {activeSecret.title}
            </h2>
            <p className="text-xs text-slate-600 italic">{activeSecret.tagline}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shrink-0 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Reward Badge:
            </span>
            <span className="font-bold text-slate-800">{activeSecret.badgeReward}</span>
          </div>
        </div>

        {/* Secret Explanation & Context */}
        <div className="p-6 border-b border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-800 block">💡 The Technique:</span>
              <p className="text-slate-600 leading-relaxed">{activeSecret.description}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
              <span className="font-bold text-amber-900 block">🤫 Why It's a Hidden Secret:</span>
              <p className="text-amber-800 leading-relaxed">{activeSecret.whyItsASecret}</p>
              <div className="pt-2">
                <span className="font-bold text-slate-700 block mb-1">⌨️ Hotkeys &amp; Menu Path:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSecret.keyboardShortcuts.map((hk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white border border-amber-200 font-mono text-[10px] text-amber-900 font-semibold"
                    >
                      {hk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Precision Specification Row */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <span className="text-[11px] font-bold uppercase text-indigo-900 tracking-wider block">
              Precision Test Specification (Before State → Student Action → After State):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 block">🔴 Before State:</span>
                <p className="text-slate-600">{activeSecret.beforeState}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">🟡 Student Action:</span>
                <p className="text-amber-800">{activeSecret.studentAction}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block">🟢 After State / Pass Check:</span>
                <p className="text-emerald-800">{activeSecret.afterState}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Lab Workstation */}
        <div className="p-6 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Interactive Hands-on Workstation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#17182B] text-white font-mono">
                LIVE SIMULATION
              </span>
            </div>
            {solvedSecrets.includes(activeSecret.id) && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Pass Check Verified
              </span>
            )}
          </div>

          {/* ==================== WORKSTATION 1: SECTION BREAKS ==================== */}
          {activeSecret.interactiveType === 'section_break' && (
            <div className="space-y-6">
              {/* Watch First: Collapsible Video Tutorials Panel */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl border border-indigo-900/60 shadow-md overflow-hidden">
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-indigo-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/50 text-indigo-200 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">Watch First: Video Tutorials</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-200">
                        Page Break vs. Section Break — Understand why orientation cannot change without Section Breaks
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWatchFirstVideos((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer shrink-0"
                  >
                    <span>{showWatchFirstVideos ? 'Hide Videos' : 'Show Videos'}</span>
                    {showWatchFirstVideos ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {showWatchFirstVideos && (
                  <div className="p-4 sm:p-6 bg-slate-950/70 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Video 1: Page Break */}
                    <div className="space-y-2.5 bg-slate-900/90 p-4 rounded-xl border border-indigo-900/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs flex items-center justify-center font-bold">
                            1
                          </span>
                          <span className="text-xs font-bold text-white">
                            Page Break Tutorial
                          </span>
                        </div>
                        <a
                          href="https://youtu.be/6-zsIBUgio0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-indigo-300 hover:text-white flex items-center gap-1 transition"
                        >
                          <span>Open in YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner border border-slate-800">
                        <iframe
                          src="https://www.youtube.com/embed/6-zsIBUgio0"
                          title="Page Break Tutorial"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Explains how standard Page Breaks (Ctrl+Enter) only flow text to the next page, but leave orientation and margins bound document-wide.
                      </p>
                    </div>

                    {/* Video 2: Section Break */}
                    <div className="space-y-2.5 bg-slate-900/90 p-4 rounded-xl border border-indigo-900/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                            2
                          </span>
                          <span className="text-xs font-bold text-white">
                            Section Break Tutorial
                          </span>
                        </div>
                        <a
                          href="https://youtu.be/axPNUp4IQZI"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-indigo-300 hover:text-white flex items-center gap-1 transition"
                        >
                          <span>Open in YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner border border-slate-800">
                        <iframe
                          src="https://www.youtube.com/embed/axPNUp4IQZI"
                          title="Section Break Tutorial"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Demonstrates how Section Breaks ('Next Page') create isolated layout partitions to unlink headers and switch orientation to Landscape.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 4-Step Interactive Guide Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={handleToggleBreakP1}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                    sec1HasBreakP1
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Step 1
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        sec1HasBreakP1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {sec1HasBreakP1 ? '✓' : '1'}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug">Insert Break (P1 End)</div>
                  <div className="text-[10px] opacity-75">Isolates Section 1</div>
                </button>

                <button
                  type="button"
                  onClick={handleToggleUnlinkHeaderP2}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                    sec1UnlinkHeaderP2
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Step 2
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        sec1UnlinkHeaderP2
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {sec1UnlinkHeaderP2 ? '✓' : '2'}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug">Unlink Header (Sec 2)</div>
                  <div className="text-[10px] opacity-75">'Link to Previous' OFF</div>
                </button>

                <button
                  type="button"
                  onClick={handleToggleLandscapeP2}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                    sec1Page2Landscape
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Step 3
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        sec1Page2Landscape
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {sec1Page2Landscape ? '✓' : '3'}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug">Landscape (Sec 2)</div>
                  <div className="text-[10px] opacity-75">Fits wide table</div>
                </button>

                <button
                  type="button"
                  onClick={handleToggleBreakP2}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                    sec1HasBreakP2
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Step 4
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        sec1HasBreakP2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {sec1HasBreakP2 ? '✓' : '4'}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug">Insert Break (P2 End)</div>
                  <div className="text-[10px] opacity-75">Restores P3 Portrait</div>
                </button>
              </div>

              {/* Toolbar Controls - 100% Responsive & Non-blocking */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleBreakP1}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    sec1HasBreakP1
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {sec1HasBreakP1
                      ? '✓ Section Break (P1 End)'
                      : '+ 1. Insert Section Break (P1)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleUnlinkHeaderP2}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    sec1UnlinkHeaderP2
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>
                    {sec1UnlinkHeaderP2
                      ? '✓ Link to Previous: OFF'
                      : '🔗 2. Unlink Header (Section 2)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleLandscapeP2}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    sec1Page2Landscape
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>
                    {sec1Page2Landscape
                      ? '✓ Orientation: Landscape'
                      : '🔄 3. Set Section 2 Landscape'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleBreakP2}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    sec1HasBreakP2
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {sec1HasBreakP2
                      ? '✓ Section Break (P2 End)'
                      : '+ 4. Insert Section Break (P2)'}
                  </span>
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleAutoSolveSec1}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Run Auto-Sequence</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSec1}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Instant Status / Feedback Toast Banner */}
              {sec1Feedback && (
                <div className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-100 text-xs flex items-center justify-between animate-fade-in shadow-xs">
                  <span className="font-medium">{sec1Feedback}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Active Simulator Feedback
                  </span>
                </div>
              )}

              {/* Interactive Document Pages Visualizer (Clickable Direct Targets) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                {/* Page 1 (Section 1) */}
                <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm aspect-[3/4] flex flex-col justify-between relative group hover:border-slate-400 transition">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1.5 flex justify-between items-center">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        Section 1
                      </span>
                      <span>Page 1 [Portrait]</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      Header: Annual School Magazine
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-3.5 bg-slate-800 rounded w-3/4" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                      <div className="h-2 bg-slate-200 rounded w-5/6" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                      <div className="h-2 bg-slate-200 rounded w-4/6" />
                    </div>
                  </div>

                  {/* Interactive Cut-Line at bottom of Page 1 */}
                  <div
                    onClick={handleToggleBreakP1}
                    className={`mt-4 p-2 rounded-lg border-2 border-dashed cursor-pointer transition text-center ${
                      sec1HasBreakP1
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 hover:border-indigo-400 bg-slate-50 text-slate-600 hover:text-indigo-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold flex items-center justify-center gap-1">
                      <span>✂️</span>
                      <span>
                        {sec1HasBreakP1
                          ? '=== Section Break (Next Page) Active ==='
                          : 'Click here: Insert Section Break (Next Page)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Page 2 (Section 2 - Landscape Target) */}
                <div
                  className={`bg-white p-4 rounded-xl border border-slate-300 shadow-sm flex flex-col justify-between transition-all duration-300 relative group ${
                    sec1Page2Landscape
                      ? 'md:col-span-1 aspect-[4/3] ring-2 ring-indigo-500 bg-indigo-50/20'
                      : 'aspect-[3/4]'
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1.5 flex justify-between items-center">
                      <span
                        className={`font-mono px-1.5 py-0.5 rounded ${
                          sec1HasBreakP1
                            ? 'bg-indigo-100 text-indigo-800 font-black'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sec1HasBreakP1 ? 'Section 2 (Isolated)' : 'Section 1 (Linked)'}
                      </span>
                      <span className="font-mono text-indigo-700 font-bold">
                        Page 2 [{sec1Page2Landscape ? 'LANDSCAPE' : 'Portrait'}]
                      </span>
                    </div>

                    {/* Interactive Header Unlink Button on Page 2 */}
                    <div
                      onClick={handleToggleUnlinkHeaderP2}
                      className={`mt-2 p-1.5 rounded cursor-pointer transition flex items-center justify-between text-[10px] border ${
                        sec1UnlinkHeaderP2
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <span>
                        {sec1UnlinkHeaderP2
                          ? '✓ Header: FINANCIAL APPENDIX (Link to Previous: OFF)'
                          : '⚠️ Header: Same as Section 1 (Click to Unlink)'}
                      </span>
                      <span className="text-[9px] underline">Toggle</span>
                    </div>

                    {/* Table Area with Orientation Toggle */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-3.5 bg-indigo-700 rounded w-1/2" />
                        <button
                          type="button"
                          onClick={handleToggleLandscapeP2}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                        >
                          {sec1Page2Landscape ? 'Set Portrait' : 'Set Landscape'}
                        </button>
                      </div>

                      <div className="border border-slate-300 rounded-lg p-2.5 bg-white shadow-2xs">
                        <div className="text-[10px] font-bold text-slate-700 mb-1">
                          Terminal Financial Expenditure Table
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-[9px] font-mono font-bold text-slate-600 bg-slate-100 p-1 rounded">
                          <div>Item</div>
                          <div>Qty</div>
                          <div>Rate</div>
                          <div>Total</div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded my-1.5" />
                        <div className="h-2 bg-slate-200 rounded my-1.5" />
                        <div className="h-2 bg-slate-200 rounded my-1.5" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Cut-Line at bottom of Page 2 */}
                  <div
                    onClick={handleToggleBreakP2}
                    className={`mt-4 p-2 rounded-lg border-2 border-dashed cursor-pointer transition text-center ${
                      sec1HasBreakP2
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 hover:border-indigo-400 bg-slate-50 text-slate-600 hover:text-indigo-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold flex items-center justify-center gap-1">
                      <span>✂️</span>
                      <span>
                        {sec1HasBreakP2
                          ? '=== Section Break (Next Page) Active ==='
                          : 'Click here: Insert Section Break (Next Page)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Page 3 (Section 3 - Back to Portrait) */}
                <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm aspect-[3/4] flex flex-col justify-between relative group hover:border-slate-400 transition">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1.5 flex justify-between items-center">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {sec1HasBreakP2 ? 'Section 3' : 'Section 2'}
                      </span>
                      <span>Page 3 [Portrait]</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      Header: Conclusion &amp; PTA Votes
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-3.5 bg-slate-800 rounded w-1/2" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                      <div className="h-2 bg-slate-200 rounded w-4/5" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 text-center font-mono py-2 bg-slate-50 rounded">
                    End of Document (Standard Portrait)
                  </div>
                </div>
              </div>

              {/* Pass Check Banner */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isSec1Passed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div>
                  <div className="font-bold text-xs flex items-center gap-2">
                    {isSec1Passed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>🎉 PASS CHECK COMPLETE: Independent Page Layout Verified!</span>
                      </>
                    ) : (
                      <span>Target: Complete all 4 steps to isolate Page 2 in Landscape.</span>
                    )}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    Step Status: P1 Break ({sec1HasBreakP1 ? 'Done ✓' : 'Pending'}) • Header
                    Unlinked ({sec1UnlinkHeaderP2 ? 'Done ✓' : 'Pending'}) • Landscape (
                    {sec1Page2Landscape ? 'Done ✓' : 'Pending'}) • P2 Break (
                    {sec1HasBreakP2 ? 'Done ✓' : 'Pending'})
                  </div>
                </div>
                {isSec1Passed ? (
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold shrink-0">
                    Passed ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleAutoSolveSec1}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
                  >
                    Solve Now
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ==================== WORKSTATION 2: TABLE MATH ==================== */}
          {activeSecret.interactiveType === 'table_math' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
                <button
                  onClick={handleInsertFormula}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    tableFormulaInserted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#17182B] text-white hover:bg-slate-800'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>
                    {tableFormulaInserted
                      ? 'Formula Active: =SUM(ABOVE)'
                      : 'Insert Formula (=SUM(ABOVE))'}
                  </span>
                </button>

                <button
                  onClick={() => setShowFieldCodes(!showFieldCodes)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition border ${
                    showFieldCodes
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 inline mr-1" />
                  <span>Alt + F9: {showFieldCodes ? 'Hide Field Code' : 'Toggle Field Code'}</span>
                </button>

                <button
                  onClick={handlePressF9}
                  disabled={!tableFormulaInserted}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    !tableFormulaInserted
                      ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                      : staleTotal
                      ? 'bg-amber-500 hover:bg-amber-600 text-[#17182B] animate-bounce shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Press F9 (Recalculate Table)</span>
                </button>
              </div>

              {/* Live Interactive Word Table */}
              <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-serif font-bold text-sm text-[#17182B]">
                    FORTUNE ACADEMY PTA INVOICE SCHEDULE
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">TABLE TOOLS LAYOUT</span>
                </div>

                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-slate-700">
                      <th className="border border-slate-300 p-2">Item Description</th>
                      <th className="border border-slate-300 p-2 text-right">Term Amount (₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2">Term Tuition &amp; Instruction</td>
                      <td className="border border-slate-300 p-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>₦</span>
                          <input
                            type="number"
                            value={tuitionAmount}
                            onChange={(e) => handleUpdateFee(Number(e.target.value) || 0)}
                            className="w-24 text-right border border-amber-300 rounded px-1.5 py-0.5 font-mono bg-amber-50/50 font-bold"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2">Science Lab &amp; Chemicals</td>
                      <td className="border border-slate-300 p-2 text-right font-mono">
                        ₦{scienceAmount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2">Digital Library &amp; LMS</td>
                      <td className="border border-slate-300 p-2 text-right font-mono">
                        ₦{libraryAmount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2">ICT Systems &amp; Internet</td>
                      <td className="border border-slate-300 p-2 text-right font-mono">
                        ₦{ictAmount.toLocaleString()}
                      </td>
                    </tr>
                    {/* Total Row with Formula */}
                    <tr className="bg-slate-50 font-bold">
                      <td className="border border-slate-300 p-2.5 text-slate-800">
                        Grand Total (Payable):
                      </td>
                      <td
                        onClick={handlePressF9}
                        className={`border border-slate-300 p-2.5 text-right font-mono text-sm cursor-pointer transition ${
                          showFieldCodes
                            ? 'bg-amber-100 text-amber-900 font-mono text-xs'
                            : staleTotal
                            ? 'bg-amber-100 text-amber-800 underline'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {!tableFormulaInserted ? (
                          <span className="text-slate-400 font-normal italic text-xs">
                            [Click 'Insert Formula' above]
                          </span>
                        ) : showFieldCodes ? (
                          `{ =SUM(ABOVE) \\# "₦#,##0.00" }`
                        ) : (
                          `₦${calculatedTotal.toLocaleString()}.00`
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {staleTotal && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
                    <span>
                      ⚠️ Fee modified! In MS Word, formulas do not update until you tap <b>F9</b>.
                    </span>
                    <button
                      onClick={handlePressF9}
                      className="px-2.5 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700"
                    >
                      Press F9
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== WORKSTATION 3: MAIL MERGE RULES ==================== */}
          {activeSecret.interactiveType === 'mail_merge' && (
            <div className="space-y-6">
              {/* Configuration Ribbon */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">
                      Mailings Ribbon &gt; Rules &gt; 'If...Then...Else...'
                    </span>
                  </div>

                  {/* Recipient Cycler */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-semibold">Recipient Record:</span>
                    <button
                      onClick={() => handleNavigateRecipient(-1)}
                      className="px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 font-bold"
                    >
                      ◀
                    </button>
                    <span className="font-mono font-bold px-2 py-0.5 bg-slate-100 rounded">
                      {currentRecipientIdx + 1} of {recipients.length}
                    </span>
                    <button
                      onClick={() => handleNavigateRecipient(1)}
                      className="px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 font-bold"
                    >
                      ▶
                    </button>
                  </div>
                </div>

                {/* Rule Builder Controls */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">IF Field:</span>
                  <span className="px-2 py-1 bg-slate-100 rounded font-mono font-bold">
                    EntranceScore
                  </span>

                  <span className="font-bold text-slate-700">Comparison:</span>
                  <span className="px-2 py-1 bg-slate-100 rounded font-mono">&gt;=</span>

                  <span className="font-bold text-slate-700">Compare to:</span>
                  <input
                    type="number"
                    value={thresholdScore}
                    onChange={(e) => setThresholdScore(Number(e.target.value) || 75)}
                    className="w-16 px-2 py-1 border border-slate-300 rounded font-mono font-bold text-center"
                  />

                  <button
                    onClick={() => {
                      setMergeRuleConfigured(true);
                      if (currentRecipient.score >= thresholdScore) {
                        setTestedBothBranches((prev) => ({ ...prev, high: true }));
                      } else {
                        setTestedBothBranches((prev) => ({ ...prev, standard: true }));
                      }
                    }}
                    className={`ml-auto px-4 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      mergeRuleConfigured
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#17182B] text-white hover:bg-slate-800'
                    }`}
                  >
                    {mergeRuleConfigured ? '✓ Rule Applied' : 'Apply If...Then Rule'}
                  </button>
                </div>
              </div>

              {/* Letter Preview Canvas */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-sm max-w-2xl mx-auto space-y-4 font-serif text-slate-800 text-xs sm:text-sm">
                <div className="border-b pb-3 text-center space-y-1">
                  <div className="font-bold text-base tracking-wide uppercase text-[#17182B]">
                    Fortune International Academy
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    Lagos Campus • Office of the Registrar
                  </div>
                </div>

                <div className="space-y-1 font-sans text-xs">
                  <div>Date: 27 September 2026</div>
                  <div>To: {currentRecipient.guardian}</div>
                  <div>Candidate: {currentRecipient.name} (PIN: DT-30{currentRecipient.id})</div>
                  <div>Entrance Assessment Score: <b>{currentRecipient.score}/100</b></div>
                </div>

                <div className="pt-2 leading-relaxed space-y-3 font-sans text-xs">
                  <p>
                    Dear {currentRecipient.guardian},
                  </p>
                  <p>
                    We are pleased to inform you that your ward, <b>{currentRecipient.name}</b>, has satisfied the primary admission criteria for enrollment into JSS3.
                  </p>

                  {/* Dynamic Conditional Sentence */}
                  <div
                    className={`p-3.5 rounded-xl border transition-all ${
                      !mergeRuleConfigured
                        ? 'bg-slate-100 text-slate-400 italic font-mono'
                        : isHighScorer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                        : 'bg-amber-50 border-amber-300 text-amber-900 font-medium'
                    }`}
                  >
                    {!mergeRuleConfigured ? (
                      '[Click "Apply If...Then Rule" above to activate conditional logic]'
                    ) : isHighScorer ? (
                      '🌟 "Congratulations! In recognition of an Entrance Assessment score exceeding 75%, your ward has been granted the Principal’s Academic Merit Scholarship."'
                    ) : (
                      'ℹ️ "Please be advised that standard enrollment orientation and introductory tutorials commence on the first Monday of term."'
                    )}
                  </div>

                  <p>
                    Yours faithfully,<br />
                    <b>Fortune TP</b><br />
                    Director of Digital Learning
                  </p>
                </div>
              </div>

              {/* Testing Guidance */}
              <div className="p-3 bg-slate-100 rounded-xl text-xs flex items-center justify-between text-slate-600">
                <span>
                  Verification Status: High Scorer Tested: ({testedBothBranches.high ? '✓' : 'Pending'}) • Standard Scorer Tested: ({testedBothBranches.standard ? '✓' : 'Pending'})
                </span>
                <span className="font-semibold text-slate-800">
                  {testedBothBranches.high && testedBothBranches.standard
                    ? 'All Branches Verified ✓'
                    : 'Cycle records to test both condition paths'}
                </span>
              </div>
            </div>
          )}

          {/* ==================== WORKSTATION 4: ANIMATION PAINTER ==================== */}
          {activeSecret.interactiveType === 'animation_painter' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setBrushMode(brushMode === 'locked' ? 'idle' : 'locked')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    brushMode === 'locked'
                      ? 'bg-amber-500 text-[#17182B] ring-2 ring-amber-400 font-black'
                      : 'bg-[#17182B] text-white hover:bg-slate-800'
                  }`}
                >
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>
                    {brushMode === 'locked'
                      ? 'Brush Locked (Click Cards Below)'
                      : 'Double-Click Animation Painter'}
                  </span>
                </button>

                <button
                  onClick={handlePlaySlidePreview}
                  disabled={isPlayingAnimation}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ml-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPlayingAnimation ? 'Playing Slide...' : 'Play Slide Show Preview'}</span>
                </button>
              </div>

              {/* PowerPoint Slide Canvas */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 aspect-[16/9] max-w-3xl mx-auto flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex justify-between items-center text-xs opacity-60 font-mono">
                  <span>SLIDE 3: OUR 4 CORE INNOVATIONS</span>
                  <span>16:9 Widescreen</span>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-4 gap-3 my-auto">
                  {/* Master Card (Source) */}
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 text-[#17182B] rounded-xl font-bold text-center border-2 border-amber-300 shadow-lg space-y-1">
                    <div className="text-[10px] uppercase font-black bg-[#17182B] text-[#F5A623] px-1.5 py-0.5 rounded">
                      SOURCE
                    </div>
                    <div className="text-xs">Solar Storage</div>
                    <div className="text-[9px] font-mono opacity-80">3-layer stack</div>
                  </div>

                  {/* Target Card A */}
                  <div
                    onClick={() => handleCardClick('cardA')}
                    className={`p-3 rounded-xl text-center border transition-all cursor-pointer space-y-1 ${
                      cardAnimations.cardA
                        ? 'bg-slate-800 border-amber-400 text-amber-300'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                    } ${
                      isPlayingAnimation && cardAnimations.cardA
                        ? 'animate-bounce ring-2 ring-amber-400'
                        : ''
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold">
                      {cardAnimations.cardA ? '✓ Painted' : 'Card A'}
                    </div>
                    <div className="text-xs">IoT Sensors</div>
                    <div className="text-[9px] font-mono opacity-70">
                      {cardAnimations.cardA ? 'Zoom + Pulse' : 'No animation'}
                    </div>
                  </div>

                  {/* Target Card B */}
                  <div
                    onClick={() => handleCardClick('cardB')}
                    className={`p-3 rounded-xl text-center border transition-all cursor-pointer space-y-1 ${
                      cardAnimations.cardB
                        ? 'bg-slate-800 border-amber-400 text-amber-300'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                    } ${
                      isPlayingAnimation && cardAnimations.cardB
                        ? 'animate-bounce ring-2 ring-amber-400 delay-150'
                        : ''
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold">
                      {cardAnimations.cardB ? '✓ Painted' : 'Card B'}
                    </div>
                    <div className="text-xs">Smart Irrigation</div>
                    <div className="text-[9px] font-mono opacity-70">
                      {cardAnimations.cardB ? 'Zoom + Pulse' : 'No animation'}
                    </div>
                  </div>

                  {/* Target Card C */}
                  <div
                    onClick={() => handleCardClick('cardC')}
                    className={`p-3 rounded-xl text-center border transition-all cursor-pointer space-y-1 ${
                      cardAnimations.cardC
                        ? 'bg-slate-800 border-amber-400 text-amber-300'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                    } ${
                      isPlayingAnimation && cardAnimations.cardC
                        ? 'animate-bounce ring-2 ring-amber-400 delay-300'
                        : ''
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold">
                      {cardAnimations.cardC ? '✓ Painted' : 'Card C'}
                    </div>
                    <div className="text-xs">Drone Scouting</div>
                    <div className="text-[9px] font-mono opacity-70">
                      {cardAnimations.cardC ? 'Zoom + Pulse' : 'No animation'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-center text-slate-400 font-sans">
                  {brushMode === 'locked'
                    ? '🖌️ Brush active: Click Card A, Card B, and Card C to clone the animation stack!'
                    : 'Click "Play Slide Show Preview" once all cards have been painted.'}
                </div>
              </div>
            </div>
          )}

          {/* ==================== WORKSTATION 5: MORPH TRANSITION ==================== */}
          {activeSecret.interactiveType === 'morph' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">Transitions Ribbon:</span>
                  <button
                    onClick={() => setSlideTransition('cut')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      slideTransition === 'cut'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Standard Cut
                  </button>
                  <button
                    onClick={() => setSlideTransition('morph')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                      slideTransition === 'morph'
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#F5A623]" />
                    <span>Morph Transition ✨</span>
                  </button>
                </div>

                {/* Slide Switchers */}
                <div className="flex items-center gap-2 ml-auto text-xs">
                  <button
                    onClick={() => handleTriggerSlideChange(1)}
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      activeSlide === 1 ? 'bg-[#17182B] text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Slide 1 (Overview)
                  </button>
                  <button
                    onClick={() => handleTriggerSlideChange(2)}
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      activeSlide === 2 ? 'bg-[#17182B] text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Slide 2 (Detail Zoom)
                  </button>
                </div>
              </div>

              {/* Animated Slide Canvas */}
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 aspect-[16/9] max-w-3xl mx-auto flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex justify-between items-center text-xs opacity-60 font-mono">
                  <span>
                    PRESENTATION VIEW • SLIDE {activeSlide} ({slideTransition.toUpperCase()})
                  </span>
                  <span>Duration: {morphDuration}s</span>
                </div>

                {/* The Morphing Object */}
                <div className="relative flex-1 flex items-center">
                  <div
                    style={{
                      transition:
                        slideTransition === 'morph'
                          ? `all ${morphDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
                          : 'none',
                    }}
                    className={`absolute rounded-full flex items-center justify-center font-bold text-center shadow-2xl ${
                      activeSlide === 1
                        ? 'w-20 h-20 left-10 top-12 bg-blue-500 text-white text-xs'
                        : 'w-48 h-48 left-1/2 -translate-x-1/2 top-4 bg-gradient-to-br from-amber-400 to-[#F5A623] text-[#17182B] text-base ring-4 ring-amber-300'
                    }`}
                  >
                    <span>{activeSlide === 1 ? 'Jupiter' : 'JUPITER SYSTEM'}</span>
                  </div>

                  {activeSlide === 2 && (
                    <div
                      style={{
                        transition:
                          slideTransition === 'morph' ? `opacity ${morphDuration}s ease-in` : 'none',
                      }}
                      className="absolute bottom-4 left-0 right-0 text-center space-y-1"
                    >
                      <h3 className="font-bold text-lg text-white">Gas Giant Atmospheric Analysis</h3>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Notice how the planet sphere enlarged, rotated, shifted coordinates, and recolored without a single jerky jump!
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-slate-400">
                  Switch between Slide 1 and Slide 2 to experience fluid cinematic interpolation.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Universal MS Office Power Hotkeys Deck */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#F5A623]" />
          <h3 className="font-black text-sm text-[#17182B] uppercase tracking-wide">
            Fortune's Top 8 Microsoft Office Power Shortcuts
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Ctrl + Shift + Enter</span>
            <p className="text-slate-600 text-[11px]">Insert Column Break in multi-column Word newsletters</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Alt + F9</span>
            <p className="text-slate-600 text-[11px]">Toggle Field Codes to inspect Word =SUM formulas</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">F9</span>
            <p className="text-slate-600 text-[11px]">Recalculate formulas and update Table of Contents</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Alt + Shift + D</span>
            <p className="text-slate-600 text-[11px]">Insert dynamic auto-updating current date field</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Ctrl + Shift + C / V</span>
            <p className="text-slate-600 text-[11px]">Copy and paste text formatting attributes only</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Alt + F10</span>
            <p className="text-slate-600 text-[11px]">Open PowerPoint Selection Pane for the !! Morph trick</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Shift + F3</span>
            <p className="text-slate-600 text-[11px]">Cycle text case: lowercase → UPPERCASE → Capitalize Each Word</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-mono font-bold text-indigo-700 block">Ctrl + D</span>
            <p className="text-slate-600 text-[11px]">Duplicate PowerPoint slide or shape in exact alignment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
