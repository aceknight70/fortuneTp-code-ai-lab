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
  const [showTableVideos, setShowTableVideos] = useState(true);
  const [repeatHeaderRows, setRepeatHeaderRows] = useState(false);
  const [tableFeedback, setTableFeedback] = useState<string>('');
  const [tuitionAmount, setTuitionAmount] = useState<number>(45000);
  const [scienceAmount, setScienceAmount] = useState<number>(15000);
  const [libraryAmount, setLibraryAmount] = useState<number>(8000);
  const [ictAmount, setIctAmount] = useState<number>(12000);
  const [tableFormulaInserted, setTableFormulaInserted] = useState(false);
  const [showFieldCodes, setShowFieldCodes] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(80000);
  const [staleTotal, setStaleTotal] = useState(false);

  // Real Microsoft Word Table & Ribbon Selection State
  const [selectedTableCell, setSelectedTableCell] = useState<
    'tuition' | 'science' | 'library' | 'ict' | 'total' | null
  >('total');
  const [showFormulaDialog, setShowFormulaDialog] = useState(false);
  const [formulaInputValue] = useState('=SUM(ABOVE)');
  const [formulaNumberFormat, setFormulaNumberFormat] = useState('₦#,##0.00');
  const [hasTestedF9Update, setHasTestedF9Update] = useState(false);
  const [f9Pulse, setF9Pulse] = useState(false);
  const [activeRibbonTab, setActiveRibbonTab] = useState<'layout' | 'design' | 'home'>('layout');
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Dynamic sum calculation of all four rows
  const actualCurrentSum = tuitionAmount + scienceAmount + libraryAmount + ictAmount;

  // Multi-cell editing handler for any row in the table
  const handleUpdateFee = (
    cellId: 'tuition' | 'science' | 'library' | 'ict',
    newAmount: number
  ) => {
    if (cellId === 'tuition') setTuitionAmount(newAmount);
    if (cellId === 'science') setScienceAmount(newAmount);
    if (cellId === 'library') setLibraryAmount(newAmount);
    if (cellId === 'ict') setIctAmount(newAmount);

    setSelectedTableCell(cellId);

    if (tableFormulaInserted) {
      setStaleTotal(true);
      setTableFeedback(
        `✏️ Amount changed to ₦${newAmount.toLocaleString()}! In Microsoft Word, tables do NOT auto-recalculate like Excel. The total is now stale at ₦${calculatedTotal.toLocaleString()} until you press F9.`
      );
    } else {
      setTableFeedback(
        `✏️ Amount updated to ₦${newAmount.toLocaleString()}. Now select the Grand Total cell to insert =SUM(ABOVE).`
      );
    }
  };

  const handleOpenFormulaDialog = () => {
    setSelectedTableCell('total');
    setShowFormulaDialog(true);
    setTableFeedback(
      "Word Ribbon: Opened Table Tools > Layout tab > Data group > Formula (fx) dialog box."
    );
  };

  const handleConfirmFormula = () => {
    setTableFormulaInserted(true);
    setShowFormulaDialog(false);
    setCalculatedTotal(actualCurrentSum);
    setStaleTotal(false);
    setSelectedTableCell('total');
    setTableFeedback(
      `✓ Formula =SUM(ABOVE) inserted into Word Field Code! Calculated initial sum: ₦${actualCurrentSum.toLocaleString()}.00.`
    );
  };

  const handlePressF9 = () => {
    if (!tableFormulaInserted) {
      setTableFeedback(
        "⚠️ No formula field found! First click 'Formula (fx)' on the Layout ribbon above to insert =SUM(ABOVE)."
      );
      return;
    }
    setCalculatedTotal(actualCurrentSum);
    setStaleTotal(false);
    setHasTestedF9Update(true);
    setF9Pulse(true);
    setTimeout(() => setF9Pulse(false), 800);
    setShowContextMenu(false);
    setTableFeedback(
      `⚡ F9 (Update Field) Executed! Microsoft Word recalculated all cells above. Grand Total updated to ₦${actualCurrentSum.toLocaleString()}.00.`
    );
    if (repeatHeaderRows) {
      markSecretSolved('secret-02');
    }
  };

  // Keyboard shortcut listener for F9 and Alt+F9 keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSecret.interactiveType === 'table_math') {
        if (e.key === 'F9' || e.code === 'F9') {
          e.preventDefault();
          handlePressF9();
        } else if (e.altKey && (e.key === 'F9' || e.code === 'F9')) {
          e.preventDefault();
          setShowFieldCodes((prev) => !prev);
          setTableFeedback('⌨️ Alt + F9 detected: Toggled Word Field Codes view.');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeSecret.interactiveType,
    tableFormulaInserted,
    actualCurrentSum,
    repeatHeaderRows,
  ]);

  // Check if Secret 2 is mastered
  useEffect(() => {
    if (tableFormulaInserted && !staleTotal && (hasTestedF9Update || repeatHeaderRows)) {
      markSecretSolved('secret-02');
    }
  }, [tableFormulaInserted, staleTotal, hasTestedF9Update, repeatHeaderRows]);

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

          {/* ==================== WORKSTATION 2: TABLE MATH & REPEAT HEADERS ==================== */}
          {activeSecret.interactiveType === 'table_math' && (
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
                        <h3 className="text-sm font-bold text-white">Watch First: Word Tables Tutorials</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-200">
                        Erin Wright Writing guides — Inserting tables &amp; repeating headers across multi-page documents
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTableVideos((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer shrink-0"
                  >
                    <span>{showTableVideos ? 'Hide Videos' : 'Show Videos'}</span>
                    {showTableVideos ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {showTableVideos && (
                  <div className="p-4 sm:p-6 bg-slate-950/70 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Video 1: How to Insert a Table */}
                    <div className="space-y-2.5 bg-slate-900/90 p-4 rounded-xl border border-indigo-900/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs flex items-center justify-center font-bold">
                            1
                          </span>
                          <span className="text-xs font-bold text-white">
                            How to Insert a Table
                          </span>
                        </div>
                        <a
                          href="https://www.youtube.com/watch?v=J_H0LEPz2gQ"
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
                          src="https://www.youtube.com/embed/J_H0LEPz2gQ"
                          title="How to Insert a Table in Microsoft Word"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Learn how to insert grid tables, define rows and columns, and configure table dimensions in Microsoft Word.
                      </p>
                    </div>

                    {/* Video 2: How to Repeat Table Headers Across Pages */}
                    <div className="space-y-2.5 bg-slate-900/90 p-4 rounded-xl border border-indigo-900/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                            2
                          </span>
                          <span className="text-xs font-bold text-white">
                            How to Repeat Table Headers Across Pages
                          </span>
                        </div>
                        <a
                          href="https://www.youtube.com/watch?v=NKPjF1j4Q1M"
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
                          src="https://www.youtube.com/embed/NKPjF1j4Q1M"
                          title="How to Repeat Table Headers Across Pages in Microsoft Word"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Matches this exercise directly: how to select your header row and enable 'Repeat Header Rows' so tables spanning multiple pages automatically duplicate column titles!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Formula Dialog Modal (Authentic Microsoft Word Dialog) */}
              {showFormulaDialog && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    {/* Dialog Titlebar */}
                    <div className="bg-[#2B579A] text-white px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-xs tracking-wide">
                        <span className="font-serif italic font-bold">fx</span>
                        <span>Formula — Microsoft Word</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowFormulaDialog(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded p-1 transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Dialog Body */}
                    <div className="p-5 space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">
                          Formula:
                        </label>
                        <input
                          type="text"
                          value={formulaInputValue}
                          readOnly
                          className="w-full border border-slate-300 rounded px-3 py-1.5 font-mono text-sm bg-slate-50 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#2B579A]"
                        />
                        <p className="text-[11px] text-slate-500">
                          💡 Word automatically populated <b>=SUM(ABOVE)</b> because numeric cells were detected directly above this row.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">
                          Number format:
                        </label>
                        <select
                          value={formulaNumberFormat}
                          onChange={(e) => setFormulaNumberFormat(e.target.value)}
                          className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#2B579A]"
                        >
                          <option value="₦#,##0.00">₦#,##0.00 (Nigerian Naira)</option>
                          <option value="#,##0.00">#,##0.00 (Standard Decimal)</option>
                          <option value="0.00%">0.00% (Percentage)</option>
                          <option value="$#,##0.00">$#,##0.00 (US Dollar)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">
                          Paste function:
                        </label>
                        <select
                          disabled
                          className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-slate-100 text-slate-500 font-mono text-xs cursor-not-allowed"
                        >
                          <option>SUM (Built-in Addition)</option>
                        </select>
                      </div>

                      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-950 text-[11px] leading-relaxed">
                        <b>How Word Evaluates =SUM(ABOVE):</b> Word sums all consecutive number cells moving upward from the active cell until it encounters a blank cell or column header row.
                      </div>
                    </div>

                    {/* Dialog Buttons */}
                    <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={handleConfirmFormula}
                        className="px-5 py-1.5 bg-[#2B579A] hover:bg-[#1E3F72] text-white rounded text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFormulaDialog(false)}
                        className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Educational Ribbon Explanation Banner */}
              <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    💡
                  </span>
                  <h4 className="font-bold text-sm text-[#17182B]">
                    How Real Microsoft Word Tables Work (And Why F9 is Essential)
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block">
                      1. Where is the Formula Button in Word?
                    </span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      In real Word, you do <b>not</b> type formulas directly into cells like Excel. You click the target cell, then navigate to the top Ribbon: <b>Table Tools → Layout tab → Data group → Formula (fx)</b>.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-900 block">
                      2. What is F9 &amp; Why Doesn't Word Auto-Update?
                    </span>
                    <p className="text-amber-800 leading-relaxed text-[11px]">
                      Word is a word processor, <i>not a spreadsheet</i>. Formulas are stored as static <b>Field Codes</b> ({'{ =SUM(ABOVE) }'}). When you change a number, Word leaves the total stale until you press <b>F9</b> (the universal <b>Update Field</b> key)!
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">
                      3. Every Cell is Selectable &amp; Editable
                    </span>
                    <p className="text-emerald-800 leading-relaxed text-[11px]">
                      Tap <b>any row</b> in the table below (Tuition, Science, Library, ICT) to select it, change its value, and watch Word's stale-state prompt guide you to press F9.
                    </p>
                  </div>
                </div>
              </div>

              {/* Realistic Microsoft Word Window & Ribbon Frame */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-md overflow-hidden">
                {/* Word Blue Title Bar */}
                <div className="bg-[#2B579A] text-white px-4 py-2 flex items-center justify-between text-xs select-none">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 opacity-90">
                      <span className="hover:bg-white/20 p-1 rounded cursor-pointer">💾</span>
                      <span className="hover:bg-white/20 p-1 rounded cursor-pointer">↩️</span>
                      <span className="hover:bg-white/20 p-1 rounded cursor-pointer">↪️</span>
                    </div>
                    <span className="font-bold tracking-wide">
                      PTA_Terminal_Invoice_2026.docx — Microsoft Word
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-white/80">
                    <span>Office 365 Pro</span>
                  </div>
                </div>

                {/* Word Ribbon Tabs */}
                <div className="bg-slate-100 border-b border-slate-200 px-3 pt-1.5 flex items-center gap-1 text-xs select-none overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActiveRibbonTab('home')}
                    className={`px-3 py-1.5 font-medium rounded-t transition cursor-pointer ${
                      activeRibbonTab === 'home'
                        ? 'bg-white text-[#2B579A] font-bold border-t-2 border-[#2B579A]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    Home
                  </button>
                  <span className="px-3 py-1.5 font-medium text-slate-400 cursor-not-allowed">
                    Insert
                  </span>
                  <span className="px-3 py-1.5 font-medium text-slate-400 cursor-not-allowed">
                    Design
                  </span>
                  <span className="px-3 py-1.5 font-medium text-slate-400 cursor-not-allowed">
                    Page Layout
                  </span>
                  <span className="px-3 py-1.5 font-medium text-slate-400 cursor-not-allowed">
                    References
                  </span>
                  <span className="px-3 py-1.5 font-medium text-slate-400 cursor-not-allowed">
                    Mailings
                  </span>

                  {/* Contextual Table Tools Tabs */}
                  <div className="ml-2 pl-2 border-l border-slate-300 flex items-center gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 hidden sm:inline">
                      Table Tools:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveRibbonTab('design')}
                      className={`px-3 py-1.5 font-medium rounded-t transition cursor-pointer ${
                        activeRibbonTab === 'design'
                          ? 'bg-white text-[#2B579A] font-bold border-t-2 border-[#2B579A]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      Table Design
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRibbonTab('layout')}
                      className={`px-3 py-1.5 font-medium rounded-t transition cursor-pointer relative ${
                        activeRibbonTab === 'layout'
                          ? 'bg-white text-[#2B579A] font-bold border-t-2 border-[#2B579A]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      <span>Layout</span>
                      <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold uppercase">
                        ACTIVE
                      </span>
                    </button>
                  </div>
                </div>

                {/* Word Ribbon Action Toolbar (Table Tools > Layout) */}
                <div className="bg-white p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  {/* Left Groups: Standard Table Editing */}
                  <div className="flex items-center gap-3 divide-x divide-slate-200 overflow-x-auto py-1">
                    {/* Rows & Columns Group */}
                    <div className="pr-3 flex items-center gap-1 text-[11px] text-slate-600">
                      <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer text-slate-500">
                        + Row Above
                      </span>
                      <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer text-slate-500">
                        + Row Below
                      </span>
                    </div>

                    {/* Alignment Group */}
                    <div className="px-3 flex items-center gap-1 text-[11px] text-slate-600">
                      <span className="px-2 py-1 rounded bg-slate-100 font-bold text-slate-800">
                        Align Left
                      </span>
                      <span className="px-2 py-1 rounded hover:bg-slate-100 text-slate-500">
                        Align Right
                      </span>
                    </div>
                  </div>

                  {/* Far Right: Word DATA GROUP (Formula, Repeat Headers, F9) */}
                  <div className="flex items-center gap-2 p-1.5 bg-indigo-50/70 border-2 border-indigo-400/80 rounded-xl shadow-xs">
                    <div className="text-[10px] font-black uppercase text-indigo-900 px-2 hidden sm:block">
                      Data Group:
                    </div>

                    {/* Button 1: fx Formula Button */}
                    <button
                      type="button"
                      onClick={handleOpenFormulaDialog}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        tableFormulaInserted
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#2B579A] hover:bg-[#1E3F72] text-white animate-pulse'
                      }`}
                    >
                      <span className="font-serif italic font-black text-sm">fx</span>
                      <span>
                        {tableFormulaInserted ? 'Formula (=SUM)' : 'Formula (fx)'}
                      </span>
                    </button>

                    {/* Button 2: Repeat Header Rows Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !repeatHeaderRows;
                        setRepeatHeaderRows(next);
                        setTableFeedback(
                          next
                            ? "✓ Repeat Header Rows enabled! Preview Page 2 below: Column headers now repeat automatically at the top."
                            : "Repeat Header Rows disabled. Page 2 has no header row."
                        );
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                        repeatHeaderRows
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{repeatHeaderRows ? 'Headers Repeated ✓' : 'Repeat Headers'}</span>
                    </button>

                    {/* Button 3: Alt + F9 Field Codes */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !showFieldCodes;
                        setShowFieldCodes(next);
                        setTableFeedback(
                          next
                            ? 'Alt + F9 toggled: Underlying field code { =SUM(ABOVE) } is now visible!'
                            : 'Alt + F9 toggled: Formatting field code hidden, displaying formatted value.'
                        );
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                        showFieldCodes
                          ? 'bg-amber-200 border-amber-400 text-amber-950'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5 inline mr-1" />
                      <span>{showFieldCodes ? '{ Field Code }' : 'Alt+F9'}</span>
                    </button>

                    {/* Button 4: F9 Key Update Field */}
                    <button
                      type="button"
                      onClick={handlePressF9}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                        staleTotal
                          ? 'bg-amber-500 hover:bg-amber-600 text-[#17182B] animate-bounce shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${f9Pulse ? 'animate-spin' : ''}`} />
                      <span>F9 (Update Field)</span>
                    </button>
                  </div>
                </div>

                {/* Instant Feedback Toast */}
                {tableFeedback && (
                  <div className="bg-slate-900 text-slate-100 px-4 py-2.5 text-xs flex items-center justify-between border-t border-slate-800 animate-in fade-in">
                    <span className="font-medium">{tableFeedback}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Microsoft Word Ribbon Simulator
                    </span>
                  </div>
                )}

                {/* Document Workspace Area */}
                <div className="p-6 bg-slate-100 space-y-6">
                  {/* PAGE 1: PTA Fee Assessment Table */}
                  <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-4 max-w-3xl mx-auto">
                    {/* Document Header */}
                    <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                          Page 1 of 2 • Microsoft Word Table
                        </span>
                        <h3 className="font-serif font-bold text-sm text-[#17182B] mt-1">
                          FORTUNE SECONDARY ACADEMY — JSS3 TERMINAL INVOICE
                        </h3>
                      </div>
                      <div className="text-right text-[10px] text-slate-400 font-mono">
                        <div>Word Table Tools</div>
                        <div>Formula Mode: =SUM(ABOVE)</div>
                      </div>
                    </div>

                    {/* Step-by-Step Guidance Banner */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">👉 Active Cell Selection:</span>
                        <span className="font-mono font-bold text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {selectedTableCell === 'total'
                            ? 'Grand Total (Formula Destination Cell)'
                            : selectedTableCell
                            ? `${selectedTableCell.toUpperCase()} ROW (Selected for Editing)`
                            : 'None (Click any cell below)'}
                        </span>
                      </div>
                      {selectedTableCell !== 'total' && (
                        <button
                          type="button"
                          onClick={() => setSelectedTableCell('total')}
                          className="text-[11px] font-bold text-[#2B579A] hover:underline cursor-pointer"
                        >
                          Select Grand Total Cell →
                        </button>
                      )}
                    </div>

                    {/* Authentic Microsoft Word Multi-Row Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-slate-300">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                            <th className="border border-slate-300 p-2.5 w-12 text-center text-slate-500 font-mono">
                              #
                            </th>
                            <th className="border border-slate-300 p-2.5">
                              Fee Description (Item Name)
                            </th>
                            <th className="border border-slate-300 p-2.5 w-32 text-slate-600">
                              Category
                            </th>
                            <th className="border border-slate-300 p-2.5 text-right w-44">
                              Term Amount (₦)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Row 1: Tuition */}
                          <tr
                            onClick={() => setSelectedTableCell('tuition')}
                            className={`transition cursor-pointer ${
                              selectedTableCell === 'tuition'
                                ? 'bg-indigo-50/80 ring-2 ring-inset ring-indigo-500'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                              1
                            </td>
                            <td className="border border-slate-300 p-2.5 font-medium text-slate-800">
                              Term Tuition &amp; Academic Instruction
                            </td>
                            <td className="border border-slate-300 p-2.5 text-slate-500">
                              Core Academic
                            </td>
                            <td className="border border-slate-300 p-2.5 text-right">
                              {selectedTableCell === 'tuition' ? (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="font-bold text-slate-500">₦</span>
                                    <input
                                      type="number"
                                      value={tuitionAmount}
                                      onChange={(e) =>
                                        handleUpdateFee('tuition', Number(e.target.value) || 0)
                                      }
                                      className="w-28 text-right border-2 border-indigo-500 rounded px-1.5 py-0.5 font-mono bg-white font-bold text-indigo-900 focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center justify-end gap-1 text-[10px]">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('tuition', 55000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold"
                                    >
                                      Set ₦55k
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('tuition', 45000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
                                    >
                                      Reset ₦45k
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-slate-800">
                                  ₦{tuitionAmount.toLocaleString()}.00
                                </span>
                              )}
                            </td>
                          </tr>

                          {/* Row 2: Science */}
                          <tr
                            onClick={() => setSelectedTableCell('science')}
                            className={`transition cursor-pointer ${
                              selectedTableCell === 'science'
                                ? 'bg-indigo-50/80 ring-2 ring-inset ring-indigo-500'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                              2
                            </td>
                            <td className="border border-slate-300 p-2.5 font-medium text-slate-800">
                              Science Laboratory &amp; Chemicals Practical
                            </td>
                            <td className="border border-slate-300 p-2.5 text-slate-500">
                              STEM Facility
                            </td>
                            <td className="border border-slate-300 p-2.5 text-right">
                              {selectedTableCell === 'science' ? (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="font-bold text-slate-500">₦</span>
                                    <input
                                      type="number"
                                      value={scienceAmount}
                                      onChange={(e) =>
                                        handleUpdateFee('science', Number(e.target.value) || 0)
                                      }
                                      className="w-28 text-right border-2 border-indigo-500 rounded px-1.5 py-0.5 font-mono bg-white font-bold text-indigo-900 focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center justify-end gap-1 text-[10px]">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('science', 20000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold"
                                    >
                                      Set ₦20k
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('science', 15000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
                                    >
                                      Reset ₦15k
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-slate-800">
                                  ₦{scienceAmount.toLocaleString()}.00
                                </span>
                              )}
                            </td>
                          </tr>

                          {/* Row 3: Library */}
                          <tr
                            onClick={() => setSelectedTableCell('library')}
                            className={`transition cursor-pointer ${
                              selectedTableCell === 'library'
                                ? 'bg-indigo-50/80 ring-2 ring-inset ring-indigo-500'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                              3
                            </td>
                            <td className="border border-slate-300 p-2.5 font-medium text-slate-800">
                              Digital Library &amp; Online LMS Subscription
                            </td>
                            <td className="border border-slate-300 p-2.5 text-slate-500">
                              Learning Media
                            </td>
                            <td className="border border-slate-300 p-2.5 text-right">
                              {selectedTableCell === 'library' ? (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="font-bold text-slate-500">₦</span>
                                    <input
                                      type="number"
                                      value={libraryAmount}
                                      onChange={(e) =>
                                        handleUpdateFee('library', Number(e.target.value) || 0)
                                      }
                                      className="w-28 text-right border-2 border-indigo-500 rounded px-1.5 py-0.5 font-mono bg-white font-bold text-indigo-900 focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center justify-end gap-1 text-[10px]">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('library', 12000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold"
                                    >
                                      Set ₦12k
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('library', 8000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
                                    >
                                      Reset ₦8k
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-slate-800">
                                  ₦{libraryAmount.toLocaleString()}.00
                                </span>
                              )}
                            </td>
                          </tr>

                          {/* Row 4: ICT */}
                          <tr
                            onClick={() => setSelectedTableCell('ict')}
                            className={`transition cursor-pointer ${
                              selectedTableCell === 'ict'
                                ? 'bg-indigo-50/80 ring-2 ring-inset ring-indigo-500'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                              4
                            </td>
                            <td className="border border-slate-300 p-2.5 font-medium text-slate-800">
                              ICT Computing Labs &amp; High-Speed Internet
                            </td>
                            <td className="border border-slate-300 p-2.5 text-slate-500">
                              Technology
                            </td>
                            <td className="border border-slate-300 p-2.5 text-right">
                              {selectedTableCell === 'ict' ? (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="font-bold text-slate-500">₦</span>
                                    <input
                                      type="number"
                                      value={ictAmount}
                                      onChange={(e) =>
                                        handleUpdateFee('ict', Number(e.target.value) || 0)
                                      }
                                      className="w-28 text-right border-2 border-indigo-500 rounded px-1.5 py-0.5 font-mono bg-white font-bold text-indigo-900 focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center justify-end gap-1 text-[10px]">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('ict', 18000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold"
                                    >
                                      Set ₦18k
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateFee('ict', 12000);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
                                    >
                                      Reset ₦12k
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-slate-800">
                                  ₦{ictAmount.toLocaleString()}.00
                                </span>
                              )}
                            </td>
                          </tr>

                          {/* Grand Total Row (Formula Destination) */}
                          <tr
                            onClick={() => setSelectedTableCell('total')}
                            className={`font-bold transition cursor-pointer ${
                              selectedTableCell === 'total'
                                ? 'bg-indigo-100/90 ring-2 ring-indigo-600'
                                : 'bg-slate-50 hover:bg-slate-100'
                            }`}
                          >
                            <td className="border border-slate-300 p-2.5 text-center font-mono text-indigo-800">
                              ∑
                            </td>
                            <td className="border border-slate-300 p-2.5 text-[#17182B] flex items-center justify-between">
                              <span className="text-sm">Grand Total (Payable Term Balance):</span>
                              <span className="text-[10px] font-mono text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                                Formula Target Cell
                              </span>
                            </td>
                            <td className="border border-slate-300 p-2.5 text-slate-500 text-[11px]">
                              {tableFormulaInserted
                                ? showFieldCodes
                                  ? '{ Field Code }'
                                  : '=SUM(ABOVE)'
                                : 'No formula yet'}
                            </td>
                            <td
                              className={`border border-slate-300 p-2.5 text-right font-mono transition ${
                                !tableFormulaInserted
                                  ? 'bg-amber-50 text-amber-800'
                                  : showFieldCodes
                                  ? 'bg-amber-100 text-amber-900 text-xs font-mono'
                                  : staleTotal
                                  ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-400'
                                  : 'bg-emerald-50 text-emerald-900'
                              }`}
                            >
                              {!tableFormulaInserted ? (
                                <div className="space-y-1">
                                  <div className="text-[11px] text-amber-800 font-normal italic">
                                    [Empty — Formula Not Inserted]
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenFormulaDialog();
                                    }}
                                    className="px-2 py-1 bg-[#2B579A] hover:bg-[#1E3F72] text-white rounded text-[11px] font-bold shadow-xs cursor-pointer inline-flex items-center gap-1"
                                  >
                                    <span>+ Open Formula (fx)</span>
                                  </button>
                                </div>
                              ) : showFieldCodes ? (
                                <span className="font-mono text-xs font-bold text-amber-950">
                                  {`{ =SUM(ABOVE) \\# "₦#,##0.00" }`}
                                </span>
                              ) : (
                                <div className="space-y-1">
                                  <div
                                    className={`text-sm font-black ${
                                      f9Pulse ? 'scale-105 text-emerald-600 transition' : ''
                                    }`}
                                  >
                                    ₦{calculatedTotal.toLocaleString()}.00
                                  </div>
                                  {staleTotal && (
                                    <div className="text-[10px] text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded font-bold animate-pulse inline-flex items-center gap-1">
                                      <span>⚠️ Stale: Press F9</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* F9 Stale-State Callout Action */}
                    {staleTotal && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                        <div className="space-y-0.5">
                          <div className="font-bold flex items-center gap-1.5 text-amber-900">
                            <span>⚠️ A Table Figure Was Modified!</span>
                          </div>
                          <p className="text-[11px] text-amber-800 leading-relaxed">
                            In Microsoft Word, the Grand Total stays at <b>₦{calculatedTotal.toLocaleString()}</b> until you press <b>F9</b> to recalculate all rows above.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handlePressF9}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-black text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Press F9 (Recalculate Now)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* F9 Universal Keypad & Explanation Widget */}
                  <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-slate-800 uppercase tracking-wider">
                          Universal Keyboard Shortcut:
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                          Active Listener Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Tap the physical <b>F9</b> key on your computer keyboard, or click the on-screen button to trigger Word's field calculation.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handlePressF9}
                        className={`px-6 py-3 rounded-xl font-mono font-black text-sm transition flex items-center gap-2 cursor-pointer shadow-md ${
                          staleTotal
                            ? 'bg-amber-500 hover:bg-amber-600 text-[#17182B] ring-4 ring-amber-300/60 animate-bounce'
                            : 'bg-slate-900 hover:bg-slate-800 text-white border-b-4 border-slate-950 active:translate-y-1'
                        }`}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>F9</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTuitionAmount(45000);
                          setScienceAmount(15000);
                          setLibraryAmount(8000);
                          setIctAmount(12000);
                          setTableFormulaInserted(false);
                          setShowFieldCodes(false);
                          setStaleTotal(false);
                          setRepeatHeaderRows(false);
                          setCalculatedTotal(80000);
                          setSelectedTableCell('total');
                          setTableFeedback('Table reset to initial default PTA assessment.');
                        }}
                        className="px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                      >
                        Reset All
                      </button>
                    </div>
                  </div>

                  {/* PAGE 2: Multi-Page Continuation Preview (Repeat Header Rows) */}
                  <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          PAGE 2 OF 2
                        </span>
                        <span className="font-serif font-bold text-xs text-[#17182B]">
                          INVOICE CONTINUATION (MULTI-PAGE TABLE)
                        </span>
                      </div>
                      {repeatHeaderRows ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Header Rows Repeated
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          ⚠️ Headers Missing on Page 2
                        </span>
                      )}
                    </div>

                    <table className="w-full text-xs text-left border-collapse border border-slate-300">
                      {repeatHeaderRows ? (
                        <thead>
                          <tr className="bg-indigo-50 font-bold text-indigo-900 border-b-2 border-indigo-400">
                            <th className="border border-slate-300 p-2.5 w-12 text-center text-indigo-700 font-mono">
                              #
                            </th>
                            <th className="border border-slate-300 p-2.5">
                              <div className="flex items-center justify-between">
                                <span>Item Description</span>
                                <span className="text-[9px] font-mono text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                                  🔁 Auto-Repeated
                                </span>
                              </div>
                            </th>
                            <th className="border border-slate-300 p-2.5 w-32 text-indigo-700">
                              Category
                            </th>
                            <th className="border border-slate-300 p-2.5 text-right w-44">
                              Term Amount (₦)
                            </th>
                          </tr>
                        </thead>
                      ) : (
                        <thead>
                          <tr className="bg-slate-100 text-slate-400 italic text-[11px]">
                            <th colSpan={4} className="border border-slate-300 p-2 text-center">
                              [No column headers on Page 2 — Reader must flip back to Page 1 to know columns]
                            </th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                            5
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-700 font-medium">
                            Boarding &amp; Housekeeping Levy
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-500">
                            Residential
                          </td>
                          <td className="border border-slate-300 p-2.5 text-right font-mono font-bold text-slate-800">
                            ₦30,000.00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                            6
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-700 font-medium">
                            Medical Clinic &amp; Insurance Levy
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-500">
                            Healthcare
                          </td>
                          <td className="border border-slate-300 p-2.5 text-right font-mono font-bold text-slate-800">
                            ₦6,500.00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-2.5 text-center font-mono text-slate-400">
                            7
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-700 font-medium">
                            Sports &amp; Extracurricular Activities
                          </td>
                          <td className="border border-slate-300 p-2.5 text-slate-500">
                            Co-Curricular
                          </td>
                          <td className="border border-slate-300 p-2.5 text-right font-mono font-bold text-slate-800">
                            ₦4,500.00
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div
                      className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        repeatHeaderRows
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      {repeatHeaderRows ? (
                        <div className="space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Secret in Action: Table Headers Repeat Cleanly!</span>
                          </div>
                          <p className="text-[11px] opacity-90">
                            By enabling <b>Table Tools Layout → Repeat Header Rows</b>, Word automatically duplicates the column title row across page breaks without manual re-typing.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-bold">⚠️ Notice the Missing Header Rows on Page 2:</div>
                          <p className="text-[11px] opacity-90">
                            When tables break across pages, readers lose context. Click <b>"Repeat Headers"</b> on the Layout ribbon above to enable Erin Wright's multi-page table secret!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pass Check Banner */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  tableFormulaInserted && !staleTotal && repeatHeaderRows
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div>
                  <div className="font-bold text-xs flex items-center gap-2">
                    {tableFormulaInserted && !staleTotal && repeatHeaderRows ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>🎉 PASS CHECK COMPLETE: Word Table Math &amp; Repeat Headers Mastered!</span>
                      </>
                    ) : (
                      <span>
                        Target: Insert formula (=SUM(ABOVE)) via Ribbon, modify any row &amp; recalculate with F9, and enable Repeat Header Rows.
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    Status: Formula Active ({tableFormulaInserted ? 'Done ✓' : 'Pending'}) • Recalculated via F9 (
                    {!staleTotal && tableFormulaInserted ? 'Done ✓' : 'Pending'}) • Repeat Header Rows (
                    {repeatHeaderRows ? 'Active ✓' : 'Pending'})
                  </div>
                </div>
                {tableFormulaInserted && !staleTotal && repeatHeaderRows ? (
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold shrink-0">
                    Passed ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      handleConfirmFormula();
                      setRepeatHeaderRows(true);
                      handlePressF9();
                    }}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
                  >
                    Solve Now
                  </button>
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
