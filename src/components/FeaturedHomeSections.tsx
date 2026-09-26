import React, { useRef } from 'react';
import { ToolItem } from '../data/toolsData';
import {
  Sparkles,
  Heart,
  Flame,
  Clock,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Star,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface FeaturedHomeSectionsProps {
  tools: ToolItem[];
  lang: 'ur' | 'en';
  bookmarkedIds: string[];
  onToggleBookmark: (toolId: string) => void;
  onOpenDetail: (tool: ToolItem) => void;
  onOpenPrompt: (tool: ToolItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onToast: (msg: string) => void;
}

export const FeaturedHomeSections: React.FC<FeaturedHomeSectionsProps> = ({
  tools,
  lang,
  bookmarkedIds,
  onToggleBookmark,
  onOpenDetail,
  onOpenPrompt,
  onSelectCategory,
  onToast
}) => {
  const isUrdu = lang === 'ur';

  // Section A: "🆕 آج شامل ہوئے - Just Added" - Last 8 tools added with "نیا" green badge
  const justAddedTools = tools.slice(-8).reverse();

  // Section B: "❤️ لوگ سب سے زیادہ یہ محفوظ کر رہے ہیں - Most Saved" - Tools sorted by favorites or rating
  const mostSavedTools = [...tools]
    .sort((a, b) => (bookmarkedIds.includes(b.id) ? 1 : 0) - (bookmarkedIds.includes(a.id) ? 1 : 0) || b.rating - a.rating)
    .slice(0, 8);

  // Section C: "🔥 اس ہفتے ٹرینڈ میں - Trending This Week" - Tools with high traffic badge
  const trendingTools = [...tools]
    .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
    .slice(2, 10);

  const HorizontalSection = ({
    title,
    subtitle,
    badge,
    badgeColor,
    toolList,
    targetCategoryId,
    type
  }: {
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
    toolList: ToolItem[];
    targetCategoryId: string;
    type: 'just_added' | 'most_saved' | 'trending';
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const amount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      }
    };

    return (
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black ${badgeColor}`}>
                {badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-urdu">
                {title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-urdu">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Scroll buttons */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-7 h-7 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-slate-600 shadow-2xs cursor-pointer active:scale-95"
                title="آگے"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-7 h-7 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-slate-600 shadow-2xs cursor-pointer active:scale-95"
                title="پیچھے"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Button "➡️ سب دیکھیں" */}
            <button
              type="button"
              onClick={() => onSelectCategory(targetCategoryId)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer font-urdu shrink-0"
            >
              <span>سب دیکھیں</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Tools Cards */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
        >
          {toolList.map((tool, idx) => {
            const isFav = bookmarkedIds.includes(tool.id);
            const traffic = `${120 + ((idx * 37) % 280)}k استعمال`;

            return (
              <div
                key={`${type}-${tool.id}`}
                className="w-64 sm:w-72 shrink-0 bg-white rounded-2xl p-4 border border-neutral-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 group font-urdu relative"
              >
                {/* Heart Button top-right */}
                <button
                  type="button"
                  onClick={() => onToggleBookmark(tool.id)}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-10 cursor-pointer active:scale-90"
                  title={isFav ? 'پسندیدہ سے ہٹائیں' : 'پسندیدہ میں شامل کریں'}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'
                    }`}
                  />
                </button>

                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      {type === 'just_added' && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black inline-block mb-1">
                          🆕 نیا ٹول
                        </span>
                      )}
                      {type === 'trending' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black inline-flex items-center gap-1 mb-1">
                          <Flame className="w-3 h-3 text-amber-600" />
                          <span>🔥 {traffic}</span>
                        </span>
                      )}
                      {type === 'most_saved' && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black inline-flex items-center gap-1 mb-1">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>سب سے زیادہ محفوظ</span>
                        </span>
                      )}

                      <h4 className="font-black text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {tool.urduName}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-sans block">
                        {tool.name}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {tool.descriptionUrdu}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {tool.pricePKR}
                    </span>
                    <div className="flex items-center gap-1 text-amber-600 font-bold font-mono">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{tool.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(tool)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>تفصیل</span>
                  </button>

                  <a
                    href={tool.toolUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: '#25D366' }}
                    className="flex-1 py-1.5 px-2 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>کھولیں</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Section A: "🆕 آج شامل ہوئے - Just Added" */}
      <HorizontalSection
        title="🆕 آج شامل ہوئے — Just Added"
        subtitle="حالیہ گھنٹوں میں شامل کیے گئے تازہ ترین طاقتور AI ٹولز"
        badge="تازہ ترین"
        badgeColor="bg-emerald-500 text-white"
        toolList={justAddedTools}
        targetCategoryId="writing"
        type="just_added"
      />

      {/* Section B: "❤️ لوگ سب سے زیادہ یہ محفوظ کر رہے ہیں - Most Saved" */}
      <HorizontalSection
        title="❤️ لوگ سب سے زیادہ یہ محفوظ کر رہے ہیں — Most Saved"
        subtitle="پاکستانی فری لانسرز کے فیورٹ ٹولز کی لسٹ"
        badge="سب سے مقبول"
        badgeColor="bg-rose-500 text-white"
        toolList={mostSavedTools}
        targetCategoryId="image"
        type="most_saved"
      />

      {/* Section C: "🔥 اس ہفتے ٹرینڈ میں - Trending This Week" */}
      <HorizontalSection
        title="🔥 اس ہفتے ٹرینڈ میں — Trending This Week"
        subtitle="سب سے زیادہ استعمال اور ٹریفک حاصل کرنے والے ٹولز"
        badge="وائرل"
        badgeColor="bg-amber-500 text-white"
        toolList={trendingTools}
        targetCategoryId="youtube"
        type="trending"
      />
    </section>
  );
};
