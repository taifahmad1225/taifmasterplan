import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { DOCTOR_PROBLEMS_20, DoctorSeoProblem } from '../data/doctorSeoData';

interface DoctorListPageProps {
  onSelectProblem: (slug: string) => void;
  onNavigateHome: () => void;
}

export const DoctorListPage: React.FC<DoctorListPageProps> = ({
  onSelectProblem,
  onNavigateHome
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProblems = DOCTOR_PROBLEMS_20.filter(p =>
    p.titleUrdu.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.queryKeyword.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.categoryUrdu.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu" dir="rtl">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 cursor-pointer"
        >
          <span>← ہوم پیج پر واپس جائیں</span>
        </button>

        <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          20 کلیدی مسائل کی مکمل لائبریری
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#128C7E] text-xs sm:text-sm font-bold border border-emerald-300">
          <Stethoscope className="w-4 h-4 text-[#25D366]" />
          <span>AI ڈاکٹر کلینک — تمام نسخہ جات</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          آپ کا مسئلہ کیا ہے؟ AI ڈاکٹر کے پاس ہر بیماری کا علاج ہے
        </h1>

        <p className="text-xs sm:text-base text-slate-600 font-medium">
          فری لانسنگ، ویوز نہ آنا، سی وی، لوگو، ایکسل یا ویب سائٹ — کسی بھی کارڈ پر کلک کریں اور مکمل نسخہ و ٹولز گائیڈ حاصل کریں۔
        </p>

        {/* Search bar inside list */}
        <div className="relative max-w-md mx-auto pt-3">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="مسئلہ سرچ کریں: جیسے ویوز، لوگو، سی وی، فائور..."
            className="w-full py-3 pr-11 pl-4 rounded-2xl bg-white border-2 border-neutral-300 focus:outline-hidden focus:border-[#25D366] text-xs sm:text-sm font-bold shadow-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-6" />
        </div>
      </div>

      {/* Grid of 20 Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProblems.map((prob, idx) => (
          <div
            key={prob.slug}
            onClick={() => onSelectProblem(prob.slug)}
            className="p-5 rounded-3xl bg-white hover:bg-emerald-50/40 border-2 border-neutral-200/90 hover:border-[#25D366] transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group relative"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {prob.categoryUrdu}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  #{idx + 1}
                </span>
              </div>

              <h2 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                {prob.titleUrdu}
              </h2>

              <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                {prob.problemSummaryUrdu}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <span>3 تجویز کردہ ٹولز</span>
              </div>

              <span className="font-bold text-[#128C7E] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                <span>مکمل حل دیکھیں</span>
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
