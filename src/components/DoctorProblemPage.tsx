import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  ChevronLeft,
  Repeat
} from 'lucide-react';
import { DoctorSeoProblem, DOCTOR_PROBLEMS_20 } from '../data/doctorSeoData';

interface DoctorProblemPageProps {
  problem: DoctorSeoProblem;
  onSelectProblem: (slug: string) => void;
  onNavigateAllProblems: () => void;
  onNavigateHome: () => void;
  onToast: (msg: string) => void;
  onOpenToolDetailByName?: (toolName: string) => void;
}

export const DoctorProblemPage: React.FC<DoctorProblemPageProps> = ({
  problem,
  onSelectProblem,
  onNavigateAllProblems,
  onNavigateHome,
  onToast,
  onOpenToolDetailByName
}) => {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(problem.masterPromptUrdu);
    onToast('پرامپٹ کاپی ہو گیا! 📋');
  };

  const handleShareWhatsApp = () => {
    const text = `🏥 AI ڈاکٹر کا نسخہ:\n${problem.titleUrdu}\n\nمکمل حل دیکھیں: https://aimaster.pk/doctor/${problem.slug}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu" dir="rtl">
      
      {/* Top Breadcrumbs */}
      <nav className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="text-slate-500 hover:text-emerald-700 cursor-pointer font-bold"
          >
            ہوم
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={onNavigateAllProblems}
            className="text-slate-500 hover:text-emerald-700 cursor-pointer font-bold"
          >
            AI ڈاکٹر کلینک
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-emerald-800 font-black truncate max-w-xs">{problem.queryKeyword}</span>
        </div>

        <button
          onClick={onNavigateAllProblems}
          className="text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 cursor-pointer"
        >
          تمام 20 مسائل دیکھیں ←
        </button>
      </nav>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-300/80 space-y-8">
        
        {/* Title Header: [Problem] کا حل - AI ڈاکٹر */}
        <header className="space-y-3 pb-6 border-b border-neutral-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold bg-emerald-100 text-[#128C7E] px-3 py-1 rounded-full border border-emerald-300">
              {problem.categoryUrdu}
            </span>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              {problem.urgencyLevelUrdu}
            </span>
            <span className="text-xs font-mono text-slate-400 mr-auto">
              /doctor/{problem.slug}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {problem.titleUrdu}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            AI ڈاکٹر تشخیص اور ثابت شدہ گائیڈ برائے پاکستانی صارفین
          </p>
        </header>

        {/* 1. مسئلہ کیا ہے (2 lines) */}
        <section className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-black text-sm sm:text-base">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>1. مسئلہ کیا ہے؟ (Problem Statement)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {problem.problemSummaryUrdu}
          </p>
        </section>

        {/* 2. کیوں ہو رہا ہے (Root Cause) */}
        <section className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
            <Repeat className="w-5 h-5 text-amber-700 shrink-0" />
            <span>2. یہ مسئلہ کیوں پیش آ رہا ہے؟ (Root Cause Analysis)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {problem.causeAnalysisUrdu}
          </p>
        </section>

        {/* 3. حل کے لیے 3 بہترین AI ٹولز (from our DB) with links */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600">3.</span>
              <span>حل کے لیے 3 بہترین AI ٹولز (Recommended AI Tools)</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">ڈیٹا بیس سے منتخب شدہ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problem.recommendedTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-50 hover:bg-emerald-50/60 border-2 border-neutral-200 hover:border-[#25D366] transition-all flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-md border border-neutral-200">
                      ٹول #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                      {tool.badgeUrdu}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {tool.roleUrdu}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">{tool.pricingUrdu}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenToolDetailByName) {
                        onOpenToolDetailByName(tool.name);
                      }
                    }}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>تفصیلات دیکھیں</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. سٹیپ بائی سٹیپ گائیڈ */}
        <section className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600">4.</span>
            <span>سٹیپ بائی سٹیپ گائیڈ (مرحلہ وار طریقہ کار)</span>
          </h2>

          <div className="space-y-3">
            {problem.stepByStepGuideUrdu.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-neutral-200">
                <span className="w-6 h-6 rounded-full bg-[#25D366] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Master Prompt Box */}
          <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#25D366] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#25D366]" />
                <span>AI ڈاکٹر کا تیار شدہ ماسٹر پرامپٹ (Copy & Paste):</span>
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                style={{ backgroundColor: '#25D366' }}
                className="px-3 py-1 rounded-lg text-white font-bold text-xs flex items-center gap-1 hover:brightness-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>پرامپٹ کاپی کریں</span>
              </button>
            </div>
            <p className="text-xs font-mono text-slate-200 bg-slate-950 p-3 rounded-xl select-all leading-relaxed" dir="ltr">
              {problem.masterPromptUrdu}
            </p>
          </div>
        </section>

        {/* Share & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-100">
          <span className="text-xs text-slate-500 font-medium">کیا اس نسخے سے آپ کو فائدہ ہوا؟ دوستوں کے ساتھ شیئر کریں</span>
          <button
            type="button"
            onClick={handleShareWhatsApp}
            style={{ backgroundColor: '#25D366' }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>یہ نسخہ واٹس ایپ پر شیئر کریں</span>
          </button>
        </div>

        {/* 5. متعلقہ مسائل کے لنکس (Related Problems) */}
        <section className="space-y-3 pt-4 border-t border-neutral-100">
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            5. متعلقہ مسائل اور حل (Related Problems):
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {problem.relatedProblemSlugs.map((relSlug, i) => {
              const rel = DOCTOR_PROBLEMS_20.find(p => p.slug === relSlug);
              if (!rel) return null;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectProblem(rel.slug)}
                  className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-[#25D366] text-right transition-all cursor-pointer group"
                >
                  <span className="text-[11px] font-bold text-emerald-800 block truncate group-hover:text-emerald-900">
                    🔗 {rel.titleUrdu}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    حل دیکھیں ←
                  </span>
                </button>
              );
            })}
          </div>
        </section>

      </div>
    </article>
  );
};
