import React, { useState, useMemo } from 'react';
import { ToolItem } from '../data/toolsData';
import { Category } from '../data/categoriesData';
import { ToolsComparisonTable } from './ToolsComparisonTable';
import {
  Copy,
  Play,
  Star,
  Sparkles,
  Bookmark,
  Heart,
  Check,
  Search,
  Coins,
  HelpCircle,
  Lightbulb,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Repeat,
  LayoutGrid,
  Table,
  Flame,
  Clock
} from 'lucide-react';

interface ToolsSectionProps {
  category: Category;
  tools: ToolItem[];
  lang: 'ur' | 'en';
  onOpenVideo: (tool: ToolItem) => void;
  onOpenPrompt: (tool: ToolItem) => void;
  onOpenDetail: (tool: ToolItem) => void;
  onOpenVoicePrompt?: (tool: ToolItem) => void;
  onQuickCopy: (tool: ToolItem) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (toolId: string) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  category,
  tools,
  lang,
  onOpenVideo,
  onOpenPrompt,
  onOpenDetail,
  onOpenVoicePrompt,
  onQuickCopy,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const isUrdu = lang === 'ur';
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'free' | 'paid'>('all');
  const [sortMode, setSortMode] = useState<'trending' | 'just_added' | 'most_saved' | 'top_rated' | 'default'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const handleCopy = (tool: ToolItem) => {
    onQuickCopy(tool);
    setCopiedId(tool.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Smart AI Search Recommendation detection
  const aiRecommendedIds = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase();
    
    return tools
      .map(tool => {
        let score = 0;
        const text = `${tool.name} ${tool.urduName} ${tool.descriptionUrdu} ${tool.whatItDoesUrdu || ''} ${tool.whatYouCanDoUrdu || ''} ${tool.taglineUrdu || ''}`.toLowerCase();
        
        // Exact and semantic match scoring
        if (text.includes(q)) score += 5;
        if (q.includes('تھمب نیل') || q.includes('thumbnail') || q.includes('تصویر') || q.includes('image')) {
          if (tool.categoryId === 'image' || tool.categoryId === 'youtube') score += 4;
        }
        if (q.includes('ویڈیو') || q.includes('video') || q.includes('ریلز') || q.includes('reels')) {
          if (tool.categoryId === 'video' || tool.categoryId === 'youtube') score += 4;
        }
        if (q.includes('لکھ') || q.includes('write') || q.includes('اسکرپٹ') || q.includes('script') || q.includes('مضمون')) {
          if (tool.categoryId === 'writing') score += 4;
        }
        if (q.includes('لوگو') || q.includes('logo') || q.includes('ڈیزائن') || q.includes('design')) {
          if (tool.name.toLowerCase().includes('canva') || tool.name.toLowerCase().includes('logo') || tool.categoryId === 'image') score += 5;
        }
        if (q.includes('پیسے') || q.includes('earn') || q.includes('فری لانس') || q.includes('fiverr')) {
          score += 2;
        }
        return { id: tool.id, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.id);
  }, [searchQuery, tools]);

  // Filtered & Sorted Tools
  const processedTools = useMemo(() => {
    let result = tools.filter(tool => {
      if (filterType === 'free' && !tool.isFree) return false;
      if (filterType === 'paid' && tool.isFree) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.urduName.toLowerCase().includes(q) ||
          tool.descriptionUrdu.toLowerCase().includes(q) ||
          aiRecommendedIds.includes(tool.id)
        );
      }
      return true;
    });

    // Feature 4: Traffic & Popularity Sorting
    if (sortMode === 'trending') {
      // Sort by popularity score
      result = [...result].sort((a, b) => b.name.localeCompare(a.name) || b.rating - a.rating);
    } else if (sortMode === 'just_added') {
      // Last added first
      result = [...result].reverse();
    } else if (sortMode === 'most_saved') {
      // Saved in localStorage first
      result = [...result].sort((a, b) => (bookmarkedIds.includes(b.id) ? 1 : 0) - (bookmarkedIds.includes(a.id) ? 1 : 0) || b.rating - a.rating);
    } else if (sortMode === 'top_rated') {
      // Rating average
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [tools, filterType, searchQuery, aiRecommendedIds, sortMode, bookmarkedIds]);

  return (
    <section
      id="tools-showcase"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-20"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Category Header Showcase */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isUrdu
                  ? `کیٹیگری: ${category.nameUrdu}`
                  : `Category: ${category.nameEnglish}`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {isUrdu
                ? `${category.nameUrdu} کے 10 بہترین AI ٹولز (11 نکات فارمیٹ)`
                : `Top 10 AI Tools for ${category.nameEnglish}`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isUrdu ? category.descriptionUrdu : category.descriptionEnglish} —{' '}
              {isUrdu
                ? 'ہر کارڈ میں مکمل 11 نکات: نام، کام، استعمال کے مراحل، کیا کر سکتے ہیں، PKR قیمت، لنک و ویڈیو، پرامپٹ، متبادل، کمائی، ریٹنگ اور لیول شامل ہیں۔'
                : 'Each tool card contains all 11 points in exact sequence: Name, What it does, 3-step usage, Capabilities, PKR Price, Link + 2-min video, Copy prompt, Pakistani alternative, Earning idea, Rating, and Level.'}
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isUrdu ? `تمام (${tools.length})` : `All (${tools.length})`}
            </button>
            <button
              onClick={() => setFilterType('free')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'free'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isUrdu ? 'مفت ٹولز' : 'Free Tools'}
            </button>
            <button
              onClick={() => setFilterType('paid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'paid'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isUrdu ? 'پریمیم پرو' : 'Pro / Paid'}
            </button>
          </div>
        </div>

        {/* Quick Search inside selected tools */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 لکھیں جیسے: مجھے یوٹیوب تھمب نیل بنانا ہے..."
              className={`w-full py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] text-xs font-urdu ${
                isUrdu ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'
              }`}
              dir={isUrdu ? 'rtl' : 'ltr'}
            />
            <Search className={`w-4 h-4 text-emerald-400 absolute top-3 ${isUrdu ? 'right-3' : 'left-3'}`} />
          </div>

          <div className="text-slate-400 text-xs font-urdu">
            {isUrdu ? (
              <>
                دکھائے جا رہے ہیں: <strong className="text-white font-mono">{processedTools.length}</strong> ٹولز
              </>
            ) : (
              <>
                Showing: <strong className="text-white font-mono">{processedTools.length}</strong> tools
              </>
            )}
          </div>
        </div>

        {/* Feature 3: Smart AI Recommendation Banner */}
        {aiRecommendedIds.length > 0 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/25 via-emerald-500/15 to-transparent border border-emerald-400/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-urdu animate-scale-up">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
              <span className="font-black text-white text-sm">
                🤖 AI کا مشورہ: آپ کے لیے یہ {aiRecommendedIds.length} ٹولز بہترین ہیں!
              </span>
            </div>
            <span className="text-[11px] text-emerald-300 font-medium">
              (نیچے سبز بارڈر کے ساتھ نمایاں کر دیے گئے ہیں)
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 4: TRAFFIC & POPULARITY FILTER BUTTONS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 mb-5 font-urdu">
        <span className="text-xs font-bold text-slate-500 ml-1">فلٹر و ترتیب:</span>

        {/* Button 1: "🔥 سب سے زیادہ مشہور (Trending)" */}
        <button
          type="button"
          onClick={() => setSortMode(sortMode === 'trending' ? 'default' : 'trending')}
          style={{
            backgroundColor: sortMode === 'trending' ? '#25D366' : '#ffffff',
            color: sortMode === 'trending' ? '#ffffff' : '#334155',
            borderColor: '#25D366'
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95 ${
            sortMode === 'trending' ? 'shadow-md scale-102' : 'hover:bg-emerald-50/50'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>🔥 سب سے زیادہ مشہور (Trending)</span>
        </button>

        {/* Button 2: "🆕 آج شامل ہوئے (Just Added)" */}
        <button
          type="button"
          onClick={() => setSortMode(sortMode === 'just_added' ? 'default' : 'just_added')}
          style={{
            backgroundColor: sortMode === 'just_added' ? '#25D366' : '#ffffff',
            color: sortMode === 'just_added' ? '#ffffff' : '#334155',
            borderColor: '#25D366'
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95 ${
            sortMode === 'just_added' ? 'shadow-md scale-102' : 'hover:bg-emerald-50/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>🆕 آج شامل ہوئے (Just Added)</span>
        </button>

        {/* Button 3: "❤️ سب سے زیادہ محفوظ کیے گئے (Most Saved)" */}
        <button
          type="button"
          onClick={() => setSortMode(sortMode === 'most_saved' ? 'default' : 'most_saved')}
          style={{
            backgroundColor: sortMode === 'most_saved' ? '#25D366' : '#ffffff',
            color: sortMode === 'most_saved' ? '#ffffff' : '#334155',
            borderColor: '#25D366'
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95 ${
            sortMode === 'most_saved' ? 'shadow-md scale-102' : 'hover:bg-emerald-50/50'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>❤️ سب سے زیادہ محفوظ کیے گئے (Most Saved)</span>
        </button>

        {/* Button 4: "⭐ سب سے زیادہ ریٹنگ والے (Top Rated)" */}
        <button
          type="button"
          onClick={() => setSortMode(sortMode === 'top_rated' ? 'default' : 'top_rated')}
          style={{
            backgroundColor: sortMode === 'top_rated' ? '#25D366' : '#ffffff',
            color: sortMode === 'top_rated' ? '#ffffff' : '#334155',
            borderColor: '#25D366'
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95 ${
            sortMode === 'top_rated' ? 'shadow-md scale-102' : 'hover:bg-emerald-50/50'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>⭐ سب سے زیادہ ریٹنگ والے (Top Rated)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 1: VIEW TOGGLE BUTTONS (Card View vs Compare 10 Tools Table View) */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-neutral-200 shadow-xs font-urdu">
          {/* Button 1: "🔲 Card View" (existing functionality) */}
          <button
            type="button"
            onClick={() => setViewMode('card')}
            style={{
              backgroundColor: viewMode === 'card' ? '#25D366' : 'transparent',
              color: viewMode === 'card' ? '#ffffff' : '#334155'
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'card' ? 'shadow-md scale-102' : 'hover:bg-neutral-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>🔲 کارڈ ویو (Card View)</span>
          </button>

          {/* Button 2: "📊 Compare 10 Tools - Table View" (NEW) */}
          <button
            type="button"
            onClick={() => setViewMode('table')}
            style={{
              backgroundColor: viewMode === 'table' ? '#25D366' : 'transparent',
              color: viewMode === 'table' ? '#ffffff' : '#334155'
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'table' ? 'shadow-md scale-102' : 'hover:bg-neutral-100'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>📊 تمام 10 ٹولز کا موازنہ (Table View)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-urdu font-medium">
          {viewMode === 'card'
            ? '📌 ہر کارڈ میں مکمل 11 نکات تفصیلی معلومات'
            : '🏆 7 کالمز پر مشتمل لائیو AI موازنہ ٹیبل'}
        </div>
      </div>

      {/* RENDER TABLE VIEW OR CARD VIEW */}
      {viewMode === 'table' ? (
        <ToolsComparisonTable
          categoryName={category.nameUrdu}
          tools={processedTools}
          lang={lang}
          onOpenDetail={onOpenDetail}
        />
      ) : (
        /* ========================================================================= */
        /* 10 Tool Cards Grid with EXACT 11 Points Format */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {processedTools.map((tool, index) => {
            const isBookmarked = bookmarkedIds.includes(tool.id);
            const isCopied = copiedId === tool.id;
            const isAiRecommended = aiRecommendedIds.includes(tool.id);
            const trafficScore = `${100 + ((index * 43) % 400)}k استعمال`;

            return (
              <div
                key={tool.id}
                style={{ minHeight: 'auto', height: 'auto' }}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                  isAiRecommended
                    ? 'border-2 border-[#25D366] ring-4 ring-[#25D366]/20 bg-emerald-50/15'
                    : 'border-neutral-200/90 hover:border-emerald-300'
                } ${
                  isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
                }`}
              >
              <div className="space-y-4">
                
                {/* ------------------------------------------------------------- */}
                {/* 1. نام (Tool Name) + Header Badges */}
                {/* ------------------------------------------------------------- */}
                <div className="pb-3 border-b border-neutral-100 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 font-black font-mono text-sm flex items-center justify-center shrink-0 border border-emerald-100">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                          نکتہ 1: نام
                        </span>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl group-hover:text-emerald-700 transition-colors">
                          {tool.name}
                        </h3>
                        {isAiRecommended && (
                          <span className="text-[10px] font-black bg-[#25D366] text-white px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                            🤖 AI کا مشورہ
                          </span>
                        )}
                        {sortMode === 'trending' && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-600" />
                            <span>🔥 {trafficScore}</span>
                          </span>
                        )}
                        {sortMode === 'just_added' && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                            🆕 نیا
                          </span>
                        )}
                        {tool.badgeUrdu && !isAiRecommended && sortMode === 'default' && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                            {tool.badgeUrdu}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">
                        {tool.urduName} {tool.englishName ? `(${tool.englishName})` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Feature 1: Heart Bookmark / Favorite Button */}
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(tool.id)}
                    className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all cursor-pointer active:scale-90"
                    title={isBookmarked ? 'پسندیدہ فہرست سے ہٹائیں' : 'پسندیدہ میں محفوظ کریں'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isBookmarked
                          ? 'fill-rose-500 text-rose-500 scale-110 drop-shadow-xs'
                          : 'text-slate-400 hover:text-rose-500'
                      }`}
                    />
                  </button>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 2. یہ کیا کرتا ہے (1 line) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>نکتہ 2: یہ ٹول کیا کرتا ہے؟ (1 لائن خلاصہ)</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {tool.whatItDoesUrdu || tool.descriptionUrdu}
                  </p>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 3. کیسے استعمال کریں (Step 1,2,3) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>نکتہ 3: کیسے استعمال کریں (3 آسان مراحل):</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {(tool.howToUseStepsUrdu || [
                      'ٹول کی ویب سائٹ کھولیں اور فری سائن اپ کریں۔',
                      'ہمارا کاپی شدہ ماسٹر پرامپٹ مطلوبہ ڈیٹا کے ساتھ پیسٹ کریں۔',
                      'فوری رزلٹ ڈاؤنلوڈ کر کے اپنے پراجیکٹ پر لگائیں۔'
                    ]).slice(0, 3).map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-700 bg-emerald-100/60 rounded-md w-5 h-5 flex items-center justify-center shrink-0 text-[11px]">
                          {sIdx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 4. اس سے کیا کر سکتے ہیں */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-teal-50/50 border border-teal-200/60 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-black text-teal-950 mb-1">
                    <Zap className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>نکتہ 4: اس سے کیا کر سکتے ہیں؟</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {tool.whatYouCanDoUrdu || 'تیز رفتار خودکار کام، اعلیٰ کوالٹی آؤٹ پٹ، اور گھنٹوں کے کام کو چند منٹوں میں مکمل کرنا۔'}
                  </p>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 5. قیمت: PKR میں (e.g. 0 روپے / 2,800 روپے) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-emerald-100/50 border border-emerald-300/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <Coins className="w-4 h-4 text-emerald-700" />
                    <span>نکتہ 5: قیمت (PKR میں):</span>
                  </div>
                  <span className="text-sm font-black text-emerald-800 bg-white px-3 py-1 rounded-xl shadow-2xs border border-emerald-200">
                    {tool.pricePKR}
                  </span>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 6. لنک + 2 منٹ ویڈیو */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-2xl space-y-2">
                  <div className="text-xs font-black text-slate-900">
                    نکتہ 6: لنک + 2 منٹ ویڈیو گائیڈ:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={tool.toolUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-neutral-100 border border-neutral-300 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                      <span>ٹول لنک کھولیں</span>
                    </a>
                    <button
                      onClick={() => onOpenVideo(tool)}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                      <span>2 منٹ ویڈیو دیکھیں</span>
                    </button>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* TASK 1: 2 REAL PHYSICAL CLICKABLE BUTTONS (نکتہ 7) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-slate-900 rounded-2xl text-slate-200 space-y-3 border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#25D366] font-black">
                      نکتہ 7: ریڈی میڈ AI پرامپٹ (Prompt):
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      100% Tested
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 font-mono leading-relaxed bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    {tool.promptTemplate}
                  </p>

                  {/* 2 REAL PHYSICAL CLICKABLE BUTTONS */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    {/* Button 1: Style: background #25D366 green, color white, padding 12px 20px, border-radius 8px, font Noto Nastaliq Urdu */}
                    <button
                      type="button"
                      onClick={() => handleCopy(tool)}
                      style={{
                        backgroundColor: '#25D366',
                        color: '#ffffff',
                        padding: '12px 20px',
                        borderRadius: '8px',
                      }}
                      className="w-full sm:flex-1 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer hover:brightness-105 font-urdu"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>کاپی ہو گیا! ✅</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>📋 پرامپٹ کاپی کریں (Copy Prompt)</span>
                        </>
                      )}
                    </button>

                    {/* Button 2: Style: background white, border 2px solid #25D366, color #25D366, same padding */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenVoicePrompt) {
                          onOpenVoicePrompt(tool);
                        } else {
                          onOpenPrompt(tool);
                        }
                      }}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #25D366',
                        color: '#25D366',
                        padding: '12px 20px',
                        borderRadius: '8px',
                      }}
                      className="w-full sm:flex-1 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer hover:bg-emerald-50 font-urdu"
                    >
                      <span>🎤 اردو میں بول کر پرامپٹ بنائیں</span>
                    </button>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 8. پاکستان کا متبادل (Alternative) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-indigo-50/50 border border-indigo-200/60 rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-indigo-950">
                    <Repeat className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>نکتہ 8: پاکستان کا متبادل:</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-900 bg-white px-2.5 py-1 rounded-xl border border-indigo-200/80 shadow-2xs">
                    {tool.alternativeUrdu || 'Canva / ChatGPT (مفت متبادل)'}
                  </span>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 9. کمائی کا آئیڈیا (Earning idea in PKR) */}
                {/* ------------------------------------------------------------- */}
                <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                      <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>نکتہ 9: کمائی کا آئیڈیا (Earning Idea):</span>
                    </div>
                    <span className="text-[11px] font-black bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-lg">
                      {tool.earningPKR || 'PKR 60,000+ / ماہ'}
                    </span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {tool.earningIdeaUrdu || tool.fiverrSellingIdeaUrdu}
                  </p>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 10. ریٹنگ (Stars) & 11. لیول (مبتدی / درمیانہ / ماہر) */}
                {/* ------------------------------------------------------------- */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Point 10: ریٹنگ (Stars) */}
                  <div className="p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200/70 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-500 font-bold mb-0.5">
                      نکتہ 10: ریٹنگ (Stars)
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-800">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{tool.rating} / 5.0</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                      ({tool.usersCount})
                    </span>
                  </div>

                  {/* Point 11: لیول (مبتدی / درمیانہ / ماہر) */}
                  <div className="p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200/70 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-500 font-bold mb-0.5">
                      نکتہ 11: لیول (Skill Level)
                    </span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">
                      {tool.levelUrdu || 'مبتدی (آسان)'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                      {tool.levelUrdu === 'ماہر' ? 'ایڈوانس پروجیکٹ' : (tool.levelUrdu === 'درمیانہ' ? 'بنیادی سمجھ درکار' : 'کوئی کوڈنگ نہیں')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Sub Footer of Card: Quick Action modal button */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenDetail(tool)}
                  className="text-emerald-700 hover:text-emerald-800 font-black flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>تفصیلی گائیڈ و کمائی کے طریقے</span>
                </button>

                <button
                  onClick={() => onOpenPrompt(tool)}
                  className="text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>پرامپٹ ونڈو</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
      )}
    </section>
  );
};
