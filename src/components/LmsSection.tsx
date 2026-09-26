import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Lock,
  Unlock,
  Play,
  Clock,
  Award,
  Video,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import {
  MAIN_COURSE_LEVELS,
  MICRO_COURSES,
  CURATED_COURSES,
  MicroCourse,
  CourseLevel,
  CuratedCourse
} from '../data/coursesData';

interface LmsSectionProps {
  onOpenMicroCourse: (course: MicroCourse) => void;
  onOpenCertificate: (titleUrdu: string) => void;
  onToast: (msg: string) => void;
}

export const LmsSection: React.FC<LmsSectionProps> = ({
  onOpenMicroCourse,
  onOpenCertificate,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'micro' | 'curated'>('main');

  return (
    <section
      id="lms-course-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-urdu"
      dir="rtl"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#128C7E] text-xs sm:text-sm font-bold border border-emerald-300">
          <GraduationCap className="w-4 h-4 text-[#25D366]" />
          <span>فیچر #20: قومی AI اکیڈمی</span>
        </div>

        {/* Title: "AI سیکھو، کماؤ - 100% اردو کورس" */}
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI سیکھو، کماؤ — 100% اردو کورس
        </h2>

        <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed">
          بنیاد سے لے کر آن لائن کمائی اور آٹومیشن تک — مفت پاکستانی ویڈیو اسباق، لائیو پرامپٹس اور آفیشل سرٹیفکیٹ
        </p>

        {/* 3 Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('main')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'main'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            📚 مرکزی کورس (4 مراحل)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('micro')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'micro'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            ⚡ مائیکرو کورسز (5 منٹ والے)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('curated')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'curated'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            🌟 فری Curated کورسز (یوٹیوب بیسٹ)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MAIN COURSE - 4 LEVELS (Foundation, Tools, Automation, Paisa Kamana) */}
      {/* ========================================================================= */}
      {activeTab === 'main' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in">
          {MAIN_COURSE_LEVELS.map((lvl) => (
            <div
              key={lvl.levelNumber}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-sm relative ${
                lvl.isLocked
                  ? 'bg-neutral-50/80 border-neutral-200/90 opacity-90'
                  : 'bg-white border-[#25D366] ring-4 ring-[#25D366]/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      lvl.isLocked
                        ? 'bg-neutral-200 text-slate-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    لیول {lvl.levelNumber}
                  </span>

                  {lvl.isLocked ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>لاک ہے</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>کھلا ہے</span>
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-lg leading-snug">
                  {lvl.titleUrdu}
                </h3>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {lvl.subtitleUrdu}
                </p>

                {/* Topics list */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                  {lvl.topicsUrdu.map((top, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium">
                      <span className="text-[#25D366] font-bold">•</span>
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  دورانیہ: {lvl.durationUrdu}
                </div>

                {lvl.isLocked ? (
                  <button
                    type="button"
                    onClick={() => onToast('پچھلا مرحلہ مکمل کریں یا واٹس ایپ پر مفت رسائی لیں!')}
                    className="w-full py-2.5 rounded-xl bg-neutral-200 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>مرحلہ 1 کے بعد کھلے گا</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const firstMicro = MICRO_COURSES[0];
                      onOpenMicroCourse(firstMicro);
                    }}
                    style={{ backgroundColor: '#25D366' }}
                    className="w-full py-2.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>کورس شروع کریں (مفت)</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: مائیکرو کورسز (5 منٹ والے) - 6 Cards */}
      {/* ========================================================================= */}
      {activeTab === 'micro' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {MICRO_COURSES.map((mc) => (
            <div
              key={mc.id}
              className="p-5 rounded-3xl bg-white hover:bg-emerald-50/30 border-2 border-neutral-200 hover:border-[#25D366] transition-all flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-3">
                {/* Thumbnail banner */}
                <div className="h-36 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden text-white">
                  <span className="text-4xl group-hover:scale-125 transition-transform mb-1">
                    {mc.thumbnailEmoji}
                  </span>
                  <span className="text-xs font-black text-emerald-300">
                    {mc.categoryUrdu}
                  </span>
                  <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded-md text-[10px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#25D366]" />
                    <span>{mc.durationUrdu}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{mc.instructorUrdu}</span>
                  <span>{mc.viewsUrdu}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                  {mc.titleUrdu}
                </h3>

                <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {mc.summaryUrdu}
                </p>
              </div>

              {/* [مفت دیکھیں] button */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenMicroCourse(mc)}
                  style={{ backgroundColor: '#25D366' }}
                  className="w-full py-2.5 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>مفت دیکھیں</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: فری Curated کورسز (یوٹیوب بیسٹ اردو سمریاں) */}
      {/* ========================================================================= */}
      {activeTab === 'curated' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
          {CURATED_COURSES.map((cur) => (
            <div
              key={cur.id}
              className="p-6 rounded-3xl bg-white border-2 border-neutral-200 hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {cur.badgeUrdu}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    دورانیہ: {cur.durationUrdu}
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-lg leading-snug">
                  {cur.titleUrdu}
                </h3>

                <div className="text-xs font-bold text-[#128C7E]">
                  چینل: {cur.channelName}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  {cur.urduSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenCertificate(cur.titleUrdu)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>مکمل کر کے سند لیں</span>
                </button>

                <a
                  href={cur.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  <span>یوٹیوب پر دیکھیں</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
