import React from 'react';
import {
  Info,
  Award,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export function AboutUsRoom() {
  return (
    <div id="about-us-room" className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#17182B] via-slate-900 to-[#17182B] text-white p-8 rounded-3xl shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ESGMC &amp; Fortune's TP</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Empowering Young Minds Across Nigeria with Code &amp; Artificial Intelligence
        </h1>

        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">
          Code &amp; AI Lab is an interactive educational hublet created to give students in Primary, Junior Secondary (JSS), and Senior Secondary (SS) hands-on experience with real computing principles, algorithmic thinking, and modern AI concepts without installation hurdles.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-sm text-[#17182B]">13-Week Progressive Mastery</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            From basic block-tap logic in Primary to structured Python algorithms in JSS and iterative data processing in SS.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-sm text-[#17182B]">Verified Student Booklet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every submission records captured terminal outputs and AI reflections into a persistent booklet that parents and teachers inspect.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-sm text-[#17182B]">Real AI Education</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Students learn the transparent difference between rule-based token pattern matching and advanced foundation models like Gemini.
          </p>
        </div>
      </div>

      {/* Founder & Teaching Leadership Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#17182B]">Programme Leadership &amp; Pedagogy</h2>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#17182B] text-[#F5A623] flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
            FTP
          </div>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              Under the direct guidance of <strong>Fortune (Master)</strong> and the <strong>ESGMC Educational Technology Board</strong>, this hublet operates across multiple participating partner schools. The curriculum is tailored specifically for the Nigerian basic education and secondary educational standards while maintaining international rigor.
            </p>
            <p>
              Students do not memorize dry syntax—they build working calculators, text generators, logic evaluators, and AI sentiment classifiers.
            </p>
          </div>
        </div>
      </div>

      {/* Support & Contacts */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#17182B]">Need Direct Assistance?</div>
          <div className="text-xs text-slate-500">
            For school onboarding, teacher access credentials, or parent inquiries.
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>lab@fortune-tp.org</span>
          </span>
          <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Lagos, Nigeria</span>
          </span>
        </div>
      </div>
    </div>
  );
}
