import React from 'react';
import { Heart, Sparkles, Plus, Crown, GraduationCap, Stethoscope, Award } from 'lucide-react';

interface HeaderProps {
  currentLanguage: 'ur' | 'en';
  onLanguageChange: (lang: 'ur' | 'en') => void;
  savedCount?: number;
  onOpenBookmarks?: () => void;
  onOpenSubmitTool?: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onNavigateWorkspace?: () => void;
  onNavigateDoctorList?: () => void;
  onNavigateReportCard?: () => void;
  onScrollToCourse?: () => void;
  currentRoute?: string;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  savedCount = 0,
  onOpenBookmarks,
  onOpenSubmitTool,
  isAdmin = false,
  onOpenAdmin,
  onNavigateWorkspace,
  onNavigateDoctorList,
  onNavigateReportCard,
  onScrollToCourse,
  currentRoute = 'home',
  onNavigateHome
}) => {
  const isUrdu = currentLanguage === 'ur';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl transition-all font-urdu" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo Zone */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 group transition-transform active:scale-98 cursor-pointer text-right"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
              🤖
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center gap-1 font-sans">
                <span>AI Master</span>
                <span className="text-emerald-600 font-black text-lg sm:text-xl">.pk</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:inline font-urdu">
                {isUrdu ? 'پاکستان کا سب سے بڑا اردو AI پورٹل' : "Pakistan's #1 AI Portal"}
              </span>
            </div>
          </button>
        </div>

        {/* Center Zone: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs text-slate-600 font-bold">
          {/* AI Doctor Link */}
          <button
            type="button"
            onClick={onNavigateDoctorList}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer py-1"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#25D366]" />
            <span>AI ڈاکٹر کلینک</span>
          </button>

          <span className="text-slate-200">·</span>

          {/* Course Menu Item */}
          <button
            type="button"
            onClick={onScrollToCourse}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer py-1"
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>AI سیکھو، کماؤ کورس 🎓</span>
          </button>

          <span className="text-slate-200">·</span>

          {/* Report Card link */}
          <button
            type="button"
            onClick={onNavigateReportCard}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer py-1"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>رپورٹ کارڈ 📊</span>
          </button>

          <span className="text-slate-200">·</span>

          <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
            PKR قیمتیں
          </span>
        </nav>

        {/* Action Zone: Workspace Link + Submit Tool Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* FEATURE 4 Link in header: "میرا ورک سپیس ❤️" */}
          {onNavigateWorkspace && (
            <button
              type="button"
              onClick={onNavigateWorkspace}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-xs active:scale-95 border ${
                currentRoute === 'workspace'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-200'
                  : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800'
              }`}
              title="میرا ورک سپیس کھولیں"
            >
              <Heart className={`w-4 h-4 ${currentRoute === 'workspace' ? 'fill-white text-white' : 'fill-rose-500 text-rose-500 animate-pulse'}`} />
              <span>میرا ورک سپیس ❤️</span>
              {savedCount > 0 && (
                <span className="font-mono bg-rose-200/80 text-rose-900 px-1.5 py-0.2 rounded-full text-xs">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Button if ?admin=taif */}
          {isAdmin && onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all font-urdu"
              title="ایڈمن ویو کھولیں"
            >
              <Crown className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden sm:inline">ایڈمن</span>
            </button>
          )}

          {/* Feature 7: Button "➕ اپنا AI ٹول جمع کروائیں" */}
          {onOpenSubmitTool && (
            <button
              type="button"
              onClick={onOpenSubmitTool}
              style={{ backgroundColor: '#25D366' }}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer font-urdu"
              title="اپنا AI ٹول پورٹل پر شامل کروائیں"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">➕ اپنا AI ٹول شامل کریں</span>
              <span className="sm:hidden">➕ ٹول</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
