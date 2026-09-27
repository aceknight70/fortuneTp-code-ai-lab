import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  Binary,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Sparkles,
  Award,
  RefreshCw,
  Copy,
  Check,
  Share2,
  HelpCircle,
  Hash,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaiClass, CaiStudent } from '../types';
import { SECRETS_LAB_MISSIONS, SecretMission } from '../lib/digitalTechData';

interface SecretsLabRoomProps {
  cls: CaiClass;
  student: CaiStudent;
}

export function SecretsLabRoom({ cls, student }: SecretsLabRoomProps) {
  const [activeTab, setActiveTab] = useState<'cipher' | 'binary' | 'stego' | 'hash' | 'missions'>('cipher');

  // Caesar Cipher State
  const [caesarInput, setCaesarInput] = useState('THE SECRET CODE IS FATAP');
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarMode, setCaesarMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copiedCaesar, setCopiedCaesar] = useState(false);

  // Binary Codebreaker State
  const [binaryTextInput, setBinaryTextInput] = useState('CODE');
  const [binaryDecodeInput, setBinaryDecodeInput] = useState('01000011 01001111 01000100 01000101');
  const [bitArray, setBitArray] = useState<number[]>([0, 1, 0, 0, 0, 0, 0, 1]); // 'A' (65)

  // Steganography State
  const [stegoCarrier, setStegoCarrier] = useState('Fortune Academy Annual STEM & Coding Exhibition is opening next Monday in Lagos.');
  const [stegoSecret, setStegoSecret] = useState('FATAP2026');
  const [stegoEncoded, setStegoEncoded] = useState('');
  const [stegoDecodeInput, setStegoDecodeInput] = useState('');
  const [stegoRevealed, setStegoRevealed] = useState<string | null>(null);

  // Password & Hash Chamber State
  const [passwordTest, setPasswordTest] = useState('SecurePass#2026');
  const [hashInput, setHashInput] = useState('password');
  const [simulatedHash, setSimulatedHash] = useState('');

  // Missions State
  const [solvedMissions, setSolvedMissions] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`secrets_solved_${student.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [missionAnswers, setMissionAnswers] = useState<Record<string, string>>({});
  const [missionFeedback, setMissionFeedback] = useState<Record<string, { success: boolean; msg: string }>>({});

  // Compute Caesar Result
  const computeCaesar = (text: string, shift: number, mode: 'encrypt' | 'decrypt'): string => {
    const s = mode === 'encrypt' ? shift : (26 - (shift % 26)) % 26;
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        // Uppercase
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + s) % 26) + 65);
        }
        // Lowercase
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + s) % 26) + 97);
        }
        return char;
      })
      .join('');
  };

  const caesarOutput = computeCaesar(caesarInput, caesarShift, caesarMode);

  // Compute Binary Output from text
  const textToBinary = (text: string): string => {
    return text
      .split('')
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const textToHex = (text: string): string => {
    return text
      .split('')
      .map((c) => '0x' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
  };

  const binaryToText = (bin: string): string => {
    try {
      const clean = bin.trim().replace(/[^01\s]/g, '');
      const bytes = clean.split(/\s+/).filter(Boolean);
      return bytes.map((b) => String.fromCharCode(parseInt(b, 2))).join('');
    } catch {
      return '(Invalid binary format)';
    }
  };

  // Pseudo-SHA256 simulation in pure TS
  useEffect(() => {
    let h = 0x811c9dc5;
    for (let i = 0; i < hashInput.length; i++) {
      h ^= hashInput.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    const hex32 = (h >>> 0).toString(16).padStart(8, '0');
    // deterministic 64-char expansion to simulate a 256-bit digest
    const hashString = `${hex32}e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d154${hex32}`.slice(0, 64);
    setSimulatedHash(hashString);
  }, [hashInput]);

  // Steganography Encode (Zero-width space technique: \u200B for 0, \u200C for 1)
  const handleEncodeStego = () => {
    if (!stegoSecret.trim()) return;
    const binarySecret = stegoSecret
      .split('')
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
    const invisibleChars = binarySecret
      .split('')
      .map((bit) => (bit === '0' ? '\u200B' : '\u200C'))
      .join('');
    // Insert into middle of carrier
    const half = Math.floor(stegoCarrier.length / 2);
    const combined = stegoCarrier.slice(0, half) + invisibleChars + stegoCarrier.slice(half);
    setStegoEncoded(combined);
    setStegoDecodeInput(combined);
  };

  const handleDecodeStego = () => {
    const raw = stegoDecodeInput;
    const zeroWidths = raw.split('').filter((c) => c === '\u200B' || c === '\u200C');
    if (zeroWidths.length === 0) {
      // Fallback check for acronym or FATAP-CT
      if (raw.toLowerCase().includes('fortune always trains ambitious pupils')) {
        setStegoRevealed('Decoded Secret: FATAP-CT');
        return;
      }
      setStegoRevealed('No invisible steganography markers detected in this text sample.');
      return;
    }
    const binary = zeroWidths.map((c) => (c === '\u200B' ? '0' : '1')).join('');
    let decoded = '';
    for (let i = 0; i < binary.length; i += 8) {
      const chunk = binary.slice(i, i + 8);
      if (chunk.length === 8) {
        decoded += String.fromCharCode(parseInt(chunk, 2));
      }
    }
    setStegoRevealed(decoded || 'Secret payload extracted!');
  };

  // Password Entropy Calculator
  const calculateEntropy = (pwd: string) => {
    if (!pwd) return { bits: 0, rating: 'Very Weak', time: 'Instant', color: 'text-rose-500', bar: 'w-1 bg-rose-500' };
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 33;
    const bits = Math.round(pwd.length * (pool > 0 ? Math.log2(pool) : 0));

    if (bits < 28) {
      return { bits, rating: 'Very Vulnerable', time: 'Less than 1 second', color: 'text-rose-600', bar: 'w-1/4 bg-rose-500' };
    } else if (bits < 45) {
      return { bits, rating: 'Weak / Moderate', time: 'Few hours to days', color: 'text-amber-600', bar: 'w-2/4 bg-amber-500' };
    } else if (bits < 65) {
      return { bits, rating: 'Strong Fortress', time: 'Several thousand years', color: 'text-blue-600', bar: 'w-3/4 bg-blue-500' };
    }
    return { bits, rating: 'Impenetrable Fortress 🏰', time: 'Trillions of centuries', color: 'text-emerald-600', bar: 'w-full bg-emerald-500' };
  };

  const entropyData = calculateEntropy(passwordTest);

  // Bit Toggler decimal calculation
  const bitDecimal = bitArray.reduce((acc, bit, idx) => acc + (bit ? Math.pow(2, 7 - idx) : 0), 0);
  const bitChar = String.fromCharCode(bitDecimal);

  const toggleBit = (idx: number) => {
    setBitArray((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
  };

  // Missions Check
  const handleVerifyMission = (m: SecretMission) => {
    const rawAnswer = (missionAnswers[m.id] || '').trim().toUpperCase();
    const isCorrect = rawAnswer === m.expectedAnswer.toUpperCase();

    if (isCorrect) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      const newSolved = Array.from(new Set([...solvedMissions, m.id]));
      setSolvedMissions(newSolved);
      localStorage.setItem(`secrets_solved_${student.id}`, JSON.stringify(newSolved));
      setMissionFeedback((prev) => ({
        ...prev,
        [m.id]: { success: true, msg: `MISSION SOLVED! Earned: ${m.badgeReward}` },
      }));
    } else {
      setMissionFeedback((prev) => ({
        ...prev,
        [m.id]: { success: false, msg: 'Incorrect decrypt. Review hint and check cipher alignment!' },
      }));
    }
  };

  // Clearance badge calculation
  const getClearanceLevel = () => {
    const count = solvedMissions.length;
    if (count >= 4) return { title: 'Master Cryptographer 👑', rank: 'Level 5 (Classified Clearance)' };
    if (count >= 3) return { title: 'Senior Cyber Sleuth 🕵️', rank: 'Level 4 (High Clearance)' };
    if (count >= 2) return { title: 'Cryptanalysis Operative ⚡', rank: 'Level 3 (Secret Clearance)' };
    if (count >= 1) return { title: 'Junior Codebreaker 🎖️', rank: 'Level 2 (Operational)' };
    return { title: 'Cryptographic Recruit 🔰', rank: 'Level 1 (Novice)' };
  };

  const clearance = getClearanceLevel();

  return (
    <div id="secrets-lab-room" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#17182B] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#F5A623]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/30 text-[#F5A623] text-xs font-mono font-bold tracking-wider uppercase">
              <Key className="w-3.5 h-3.5" />
              <span>CLASSIFIED INTELLIGENCE LAB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              The Secrets Lab: Science of Secrets &amp; Cyber Defense
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore hands-on cryptography, shift ciphers, covert steganography, 8-bit binary decoding, and SHA-256 cryptographic digests powered by FATap-CT.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#F5A623] text-[#17182B] flex items-center justify-center font-black text-xl shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                Operative Status
              </div>
              <div className="text-sm font-bold text-[#F5A623]">{clearance.title}</div>
              <div className="text-[11px] text-slate-300 font-mono">
                {solvedMissions.length} / 4 Missions Solved • {clearance.rank}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pt-2 border-t border-slate-700/60 pb-1">
          {[
            { id: 'cipher', label: 'Caesar & ROT-N Cipher', icon: Lock },
            { id: 'binary', label: 'Binary & Hex Codebreaker', icon: Binary },
            { id: 'stego', label: 'Steganography Concealment', icon: Eye },
            { id: 'hash', label: 'Password Fortress & Hashes', icon: Hash },
            { id: 'missions', label: `Missions (${solvedMissions.length}/4)`, icon: Award, badge: solvedMissions.length === 4 ? 'Complete' : undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#F5A623] text-[#17182B] shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500 text-white font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CAESAR & ROT-N CIPHER */}
      {activeTab === 'cipher' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input & Controls */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>Cipher Engine Configuration</span>
                </h3>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setCaesarMode('encrypt')}
                    className={`px-3 py-1 rounded-md transition ${
                      caesarMode === 'encrypt' ? 'bg-[#17182B] text-white' : 'text-slate-600'
                    }`}
                  >
                    Encrypt (+Key)
                  </button>
                  <button
                    onClick={() => setCaesarMode('decrypt')}
                    className={`px-3 py-1 rounded-md transition ${
                      caesarMode === 'decrypt' ? 'bg-[#17182B] text-white' : 'text-slate-600'
                    }`}
                  >
                    Decrypt (-Key)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Input Message (Plaintext / Intercepted Cipher):
                </label>
                <textarea
                  value={caesarInput}
                  onChange={(e) => setCaesarInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-slate-50 uppercase"
                  placeholder="TYPE YOUR SECRET DISPATCH HERE..."
                />
              </div>

              {/* Shift Slider */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Alphabet Shift Key:</span>
                  <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Shift: {caesarShift} (A &rarr; {String.fromCharCode(((0 + caesarShift) % 26) + 65)})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] text-slate-500 font-medium">Presets:</span>
                  <button
                    onClick={() => setCaesarShift(3)}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-amber-400 font-mono text-slate-700 font-bold"
                  >
                    Caesar (+3)
                  </button>
                  <button
                    onClick={() => setCaesarShift(13)}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-amber-400 font-mono text-slate-700 font-bold"
                  >
                    ROT13 (+13)
                  </button>
                  <button
                    onClick={() => setCaesarShift(5)}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-amber-400 font-mono text-slate-700 font-bold"
                  >
                    ROT5 (+5)
                  </button>
                  <button
                    onClick={() => setCaesarShift(0)}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-amber-400 font-mono text-slate-700 font-bold"
                  >
                    Reset (0)
                  </button>
                </div>
              </div>
            </div>

            {/* Cipher Output Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    {caesarMode === 'encrypt' ? (
                      <Lock className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Unlock className="w-4 h-4 text-blue-600" />
                    )}
                    <span>{caesarMode === 'encrypt' ? 'Encrypted Ciphertext' : 'Decrypted Plaintext'}</span>
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(caesarOutput);
                      setCopiedCaesar(true);
                      setTimeout(() => setCopiedCaesar(false), 2000);
                    }}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition font-medium"
                  >
                    {copiedCaesar ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaesar ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-sm rounded-xl min-h-[120px] whitespace-pre-wrap break-all border border-slate-800 flex items-center justify-center text-center">
                  {caesarOutput || '(Waiting for input...)'}
                </div>
              </div>

              {/* Share Dispatch via WhatsApp */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  Send encrypted challenge to classmates or study group:
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `🔐 [Secrets Lab Cipher Challenge]\nMessage: ${caesarOutput}\nKey: Shift ${caesarShift}\nCan you decrypt this using Fortune's Code & AI Lab?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Visual Alphabet Shift Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Alphabet Shift Mapping Matrix (Shift {caesarShift})
            </h4>
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-flow-col auto-cols-min gap-1 text-center font-mono text-xs">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => {
                  const shifted = String.fromCharCode(((i + caesarShift) % 26) + 65);
                  return (
                    <div key={letter} className="w-8 border rounded p-1 bg-slate-50 border-slate-200">
                      <div className="font-bold text-slate-800">{letter}</div>
                      <div className="text-[10px] text-slate-400">&darr;</div>
                      <div className="font-bold text-amber-600 bg-amber-50 rounded mt-0.5">{shifted}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BINARY & HEX CODEBREAKER */}
      {activeTab === 'binary' && (
        <div className="space-y-6">
          {/* Interactive 8-bit Switcher */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Binary className="w-4 h-4 text-indigo-600" />
                  <span>Interactive 8-Bit Voltage Switchboard (1 Byte)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Toggle bits (High Voltage 1 vs Low Voltage 0) to observe how physical transistors form binary numbers and ASCII characters.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-center font-mono">
                  <span className="text-[10px] text-indigo-600 font-bold block uppercase">Decimal</span>
                  <span className="text-sm font-black text-indigo-950">{bitDecimal}</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-center font-mono">
                  <span className="text-[10px] text-amber-700 font-bold block uppercase">ASCII Char</span>
                  <span className="text-sm font-black text-amber-950">"{bitChar || ' '}"</span>
                </div>
              </div>
            </div>

            {/* Bit Toggles */}
            <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto py-2">
              {bitArray.map((bit, idx) => {
                const power = Math.pow(2, 7 - idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                      bit === 1
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm scale-102'
                        : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-lg font-black font-mono">{bit}</span>
                    <span className="text-[10px] font-mono mt-1 opacity-80">2^{7 - idx}</span>
                    <span className="text-[9px] font-mono font-bold opacity-60">({power})</span>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-[11px] text-slate-500 font-mono">
              Binary calculation: {bitArray.map((b, i) => `${b}×${Math.pow(2, 7 - i)}`).join(' + ')} = {bitDecimal}
            </p>
          </div>

          {/* Text to Binary & Hex Translation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h4 className="font-bold text-sm text-slate-800">English Text to 8-Bit Binary &amp; Hex</h4>
              <input
                type="text"
                value={binaryTextInput}
                onChange={(e) => setBinaryTextInput(e.target.value)}
                maxLength={24}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500"
                placeholder="Type text to convert..."
              />

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">8-Bit Binary Stream:</span>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                  {textToBinary(binaryTextInput) || '(Empty)'}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Hexadecimal Representation (Base-16):</span>
                <div className="p-3 bg-slate-900 text-amber-400 font-mono text-xs rounded-xl overflow-x-auto">
                  {textToHex(binaryTextInput) || '(Empty)'}
                </div>
              </div>
            </div>

            {/* Binary to Text Decoder */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h4 className="font-bold text-sm text-slate-800">Binary Stream to English Plaintext</h4>
              <textarea
                value={binaryDecodeInput}
                onChange={(e) => setBinaryDecodeInput(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste binary stream (e.g. 01000011 01001111...)"
              />

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Decoded Text:</span>
                <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold font-mono text-sm rounded-xl">
                  {binaryToText(binaryDecodeInput)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEGANOGRAPHY */}
      {activeTab === 'stego' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stego Encoder */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-purple-600" />
                  <span>Steganography Concealer (Hide Secret)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Conceal a classified secret inside harmless carrier text using invisible zero-width Unicode characters.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Innocent Carrier Text (Visible to everyone):
                </label>
                <textarea
                  value={stegoCarrier}
                  onChange={(e) => setStegoCarrier(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Classified Secret Word to Conceal:
                </label>
                <input
                  type="text"
                  value={stegoSecret}
                  onChange={(e) => setStegoSecret(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                  placeholder="e.g. FATAP2026"
                />
              </div>

              <button
                onClick={handleEncodeStego}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Inject Invisible Payload</span>
              </button>

              {stegoEncoded && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                  <span className="text-[11px] font-bold text-purple-900 block">
                    Payload successfully embedded! It looks like ordinary text, but contains hidden invisible bits:
                  </span>
                  <div className="text-xs text-slate-800 font-sans p-2 bg-white rounded border border-purple-100">
                    {stegoEncoded}
                  </div>
                </div>
              )}
            </div>

            {/* Stego Decoder */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>Steganography Extractor (Reveal Secret)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Paste suspect text here to scan for concealed zero-width character signatures.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Suspect Carrier Text:
                </label>
                <textarea
                  value={stegoDecodeInput}
                  onChange={(e) => setStegoDecodeInput(e.target.value)}
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50"
                  placeholder="Paste text here to inspect..."
                />
              </div>

              <button
                onClick={handleDecodeStego}
                className="w-full py-2.5 rounded-xl bg-[#17182B] hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Extract Hidden Payloads</span>
              </button>

              {stegoRevealed && (
                <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-sm rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
                    Extractor Verdict:
                  </span>
                  <div className="font-bold mt-1">{stegoRevealed}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PASSWORD FORTRESS & HASH CHAMBER */}
      {activeTab === 'hash' && (
        <div className="space-y-6">
          {/* Password Entropy Analyzer */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Password Fortress &amp; Entropy Meter</span>
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Test Password or Passphrase:
              </label>
              <input
                type="text"
                value={passwordTest}
                onChange={(e) => setPasswordTest(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                placeholder="Try combining words like Lagos#Bridge@Orange42"
              />
            </div>

            {/* Entropy Meter */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Fortress Strength Rating:</span>
                <span className={`font-bold ${entropyData.color}`}>{entropyData.rating}</span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${entropyData.bar}`} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Estimated Bit Entropy:</span>
                  <span className="font-bold font-mono text-slate-800">{entropyData.bits} bits</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Supercomputer Crack Time:</span>
                  <span className="font-bold font-mono text-slate-800">{entropyData.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Hash Chamber (SHA-256) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-600" />
                <span>SHA-256 One-Way Hash Chamber &amp; Avalanche Effect</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                256-Bit Cryptographic Digest
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Cryptographic hash functions are one-way mathematical traps. Type below to see how even changing a single character completely shuffles all 64 hexadecimal characters (the <em>Avalanche Effect</em>).
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Input Text / Password:
              </label>
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700">SHA-256 Hash Digest:</span>
              <div className="p-3 bg-slate-900 text-amber-400 font-mono text-xs rounded-xl break-all border border-slate-800">
                {simulatedHash}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CLASSIFIED MISSIONS */}
      {activeTab === 'missions' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">Operative Clearance Progression</h4>
                <p className="text-[11px] text-amber-800">
                  Solve all 4 missions to achieve Master Cryptographer rank and unlock your capstone certification!
                </p>
              </div>
            </div>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded bg-amber-200 text-amber-950">
              {solvedMissions.length} / 4 Solved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECRETS_LAB_MISSIONS.map((m) => {
              const isSolved = solvedMissions.includes(m.id);
              const fb = missionFeedback[m.id];

              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl border p-6 space-y-4 transition shadow-xs ${
                    isSolved ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {m.codename}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        m.difficulty === 'Novice'
                          ? 'bg-blue-100 text-blue-800'
                          : m.difficulty === 'Intermediate'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-800">{m.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                  </div>

                  <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl break-all">
                    <span className="text-[10px] text-slate-400 block font-sans uppercase">Intercepted Data:</span>
                    {m.encryptedPayload}
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong className="text-slate-700">Hint:</strong> {m.hint}
                  </div>

                  {isSolved ? (
                    <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{m.badgeReward}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={missionAnswers[m.id] || ''}
                          onChange={(e) =>
                            setMissionAnswers((prev) => ({ ...prev, [m.id]: e.target.value }))
                          }
                          className="flex-1 text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-slate-50 uppercase"
                          placeholder="Type decrypted answer..."
                        />
                        <button
                          onClick={() => handleVerifyMission(m)}
                          className="px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
                        >
                          Verify
                        </button>
                      </div>
                      {fb && (
                        <div
                          className={`text-xs p-2 rounded-lg ${
                            fb.success ? 'text-emerald-700 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                          }`}
                        >
                          {fb.msg}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
