import React, { useState } from 'react';
import {
  Play,
  Clock,
  Award,
  Copy,
  Check,
  Share2,
  Sparkles,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { MicroCourse } from '../data/coursesData';

interface CourseDetailPageProps {
  course: MicroCourse;
  onOpenCertificate: (titleUrdu: string) => void;
  onNavigateHome: () => void;
  onToast: (msg: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onOpenCertificate,
  onNavigateHome,
  onToast
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [taskSubmitted, setTaskSubmitted] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(course.masterPromptUrdu);
    setCopiedPrompt(true);
    onToast('ماسٹر پرامپٹ کاپی ہو گیا! 📋');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTaskSubmitted(true);
    onToast('🎉 مبارک ہو! آپ کا پروجیکٹ کامیابی سے جمع ہو گیا۔ اب اپنی سند حاصل کریں!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu" dir="rtl">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 cursor-pointer"
        >
          <span>← کورسز لسٹ پر واپس جائیں</span>
        </button>

        <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          مائیکرو کورس: {course.durationUrdu}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-300 space-y-8">
        
        {/* Title */}
        <div className="space-y-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {course.categoryUrdu}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              /course/{course.slug}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {course.titleUrdu}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span>استاد: {course.instructorUrdu}</span>
            <span>·</span>
            <span>دورانیہ: {course.durationUrdu}</span>
            <span>·</span>
            <span>ویوز: {course.viewsUrdu}</span>
          </div>
        </div>

        {/* 1. Video Player Container */}
        <div className="rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black aspect-video relative">
          <iframe
            src={course.youtubeEmbedUrl}
            title={course.titleUrdu}
            className="w-full h-full block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Summary */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
          <h3 className="font-black text-emerald-950 text-sm sm:text-base">
            کورس کا خلاصہ اور ہدف:
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {course.summaryUrdu}
          </p>
        </div>

        {/* 2. Steps Guide */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">
            عملی مراحل (Course Execution Steps):
          </h3>

          <div className="space-y-2.5">
            {course.stepsUrdu.map((st, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                <span className="w-7 h-7 rounded-full bg-[#25D366] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Prompt Copy */}
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#25D366] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#25D366]" />
              <span>کورس کا ماسٹر پرامپٹ (Prompt Template):</span>
            </span>

            <button
              type="button"
              onClick={handleCopyPrompt}
              style={{ backgroundColor: '#25D366' }}
              className="px-3.5 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-105 active:scale-95 cursor-pointer shadow-md"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'کاپی ہو گیا!' : 'پرامپٹ کاپی کریں'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm font-mono text-slate-200 bg-slate-950 p-3.5 rounded-2xl select-all leading-relaxed" dir="ltr">
            {course.masterPromptUrdu}
          </p>
        </div>

        {/* 4. Project Task */}
        <div className="p-6 rounded-3xl bg-neutral-50 border-2 border-neutral-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
            <FileCheck className="w-5 h-5 text-[#25D366]" />
            <span>عملی پروجیکٹ ٹاسک (Project Assignment):</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-white p-4 rounded-2xl border border-neutral-200">
            {course.projectTaskUrdu}
          </p>

          <form onSubmit={handleTaskSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="اپنے مکمل کیے گئے پروجیکٹ کا لنک یا تصویر کا یو آر ایل یہاں پیسٹ کریں..."
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-neutral-300 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              پروجیکٹ جمع کروائیں ✅
            </button>
          </form>
        </div>

        {/* 5. Certificate Button */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            تمام اسباق اور پروجیکٹ مکمل کرنے کے بعد اپنی آفیشل سند حاصل کریں
          </div>

          <button
            type="button"
            onClick={() => onOpenCertificate(course.titleUrdu)}
            style={{ backgroundColor: '#25D366' }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#25D366]/20"
          >
            <Award className="w-5 h-5" />
            <span>آفیشل کورس سرٹیفکیٹ حاصل کریں 🎓</span>
          </button>
        </div>

      </div>

    </div>
  );
};
