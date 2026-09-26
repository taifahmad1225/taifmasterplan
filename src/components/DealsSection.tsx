import React, { useRef, useState } from 'react';
import { Tag, Sparkles, Copy, Check, Clock, ChevronRight, ChevronLeft, ExternalLink, Flame } from 'lucide-react';

interface DealItem {
  id: string;
  name: string;
  urduName: string;
  logoEmoji: string;
  discountBadge: string;
  originalPricePKR: string;
  discountedPricePKR: string;
  couponCode: string;
  categoryUrdu: string;
  url: string;
  descriptionUrdu: string;
}

const DEALS_DATA: DealItem[] = [
  {
    id: 'deal-1',
    name: 'Midjourney Pro',
    urduName: 'مڈجرنی پرو (الٹرا ایچ ڈی)',
    logoEmoji: '🎨',
    discountBadge: '50% OFF',
    originalPricePKR: 'PKR 8,500',
    discountedPricePKR: 'PKR 4,250',
    couponCode: 'AIMASTER50',
    categoryUrdu: 'امیج جنریٹر',
    url: 'https://midjourney.com',
    descriptionUrdu: 'لامحدود 8K سنیماٹک امیج جنریشن اور فاسٹ جی پی یو آورز'
  },
  {
    id: 'deal-2',
    name: 'Canva Pro Annual',
    urduName: 'کینوا پرو سالانہ پلان',
    logoEmoji: '✨',
    discountBadge: '45% OFF',
    originalPricePKR: 'PKR 3,200',
    discountedPricePKR: 'PKR 1,760',
    couponCode: 'AIMASTER45',
    categoryUrdu: 'گرافک ڈیزائن',
    url: 'https://canva.com',
    descriptionUrdu: 'تمام پریمیم ٹیمپلیٹس، بیک گراؤنڈ ریموور اور برانڈ کٹس'
  },
  {
    id: 'deal-3',
    name: 'ElevenLabs Voice AI',
    urduName: 'الیون لیبز وائس اسٹوڈیو',
    logoEmoji: '🎙️',
    discountBadge: '40% OFF',
    originalPricePKR: 'PKR 6,000',
    discountedPricePKR: 'PKR 3,600',
    couponCode: 'AIMASTER40',
    categoryUrdu: 'وائس اوور',
    url: 'https://elevenlabs.io',
    descriptionUrdu: 'انتہائی حقیقت پسندانہ اردو اور انگریزی آوازیں، آواز کی کلوننگ'
  },
  {
    id: 'deal-4',
    name: 'ChatGPT Plus (GPT-4o)',
    urduName: 'چیٹ جی پی ٹی پلس',
    logoEmoji: '🤖',
    discountBadge: '30% OFF',
    originalPricePKR: 'PKR 5,800',
    discountedPricePKR: 'PKR 4,060',
    couponCode: 'AIMASTER30',
    categoryUrdu: 'رائٹنگ و کوڈنگ',
    url: 'https://chatgpt.com',
    descriptionUrdu: 'تیز ترین جوابات، ڈیپ ریسرچ، لائیو کینوس اور امیج اینالیسس'
  },
  {
    id: 'deal-5',
    name: 'CapCut Pro Video',
    urduName: 'کیپ کٹ پرو ویڈیو ایڈیٹر',
    logoEmoji: '🎬',
    discountBadge: '50% OFF',
    originalPricePKR: 'PKR 2,800',
    discountedPricePKR: 'PKR 1,400',
    couponCode: 'AIMASTER50',
    categoryUrdu: 'ویڈیو ایڈیٹنگ',
    url: 'https://capcut.com',
    descriptionUrdu: 'آٹو کیپشنز، 4K 60fps ایکسپورٹ اور پریمیم ٹرانزیشنز'
  },
  {
    id: 'deal-6',
    name: 'Runway Gen-3 AI',
    urduName: 'رن وے ویڈیو جنریٹر',
    logoEmoji: '⚡',
    discountBadge: '35% OFF',
    originalPricePKR: 'PKR 9,500',
    discountedPricePKR: 'PKR 6,175',
    couponCode: 'AIMASTER35',
    categoryUrdu: 'ویڈیو AI',
    url: 'https://runwayml.com',
    descriptionUrdu: 'ٹیکسٹ اور امیج سے حقیقت پسندانہ ویڈیوز بنانے کا بہترین ماڈل'
  }
];

interface DealsSectionProps {
  lang: 'ur' | 'en';
  onToast: (msg: string) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ lang, onToast }) => {
  const isUrdu = lang === 'ur';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onToast(`✅ کوڈ کاپی ہو گیا: ${code}`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-r from-amber-50/70 via-white to-emerald-50/70 border-2 border-amber-200/80 rounded-3xl p-5 sm:p-7 shadow-lg shadow-amber-100/30 font-urdu">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-amber-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Tag className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                🏷️ آج کی بہترین ڈیلز — پیسے بچائیں
              </h2>
              <span className="text-[11px] font-black bg-rose-500 text-white px-2.5 py-0.5 rounded-md animate-pulse">
                محدود وقت
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              پیڈ ٹولز پر خصوصی ڈسکاؤنٹ — پاکستانی کریٹرز اور فری لانسرز کے لیے
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer Badge: "⏰ صرف 2 دن باقی" */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-rose-600 animate-spin" />
              <span>⏰ صرف 2 دن باقی</span>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-slate-600 shadow-2xs cursor-pointer active:scale-95 transition-all"
                title="آگے"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-slate-600 shadow-2xs cursor-pointer active:scale-95 transition-all"
                title="پیچھے"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Cards (4 visible on desktop, swipeable on mobile) */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto pt-5 pb-2 no-scrollbar scroll-smooth"
        >
          {DEALS_DATA.map(deal => {
            const isCopied = copiedCode === deal.couponCode;

            return (
              <div
                key={deal.id}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top: Logo + Discount Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl shadow-2xs">
                        {deal.logoEmoji}
                      </span>
                      <div>
                        <h3 className="font-black text-slate-900 text-sm leading-tight group-hover:text-amber-700 transition-colors">
                          {deal.urduName}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-sans font-medium">
                          {deal.name}
                        </span>
                      </div>
                    </div>

                    {/* Red Badge: "50% OFF" */}
                    <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow-xs tracking-wider">
                      {deal.discountBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {deal.descriptionUrdu}
                  </p>

                  {/* Pricing: Cut Original Price + New Price */}
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/50 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 line-through font-mono block">
                        {deal.originalPricePKR}
                      </span>
                      <span className="text-sm font-black text-emerald-700 font-mono">
                        {deal.discountedPricePKR}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      بچت: 50%
                    </span>
                  </div>
                </div>

                {/* Bottom: Coupon Code + Button "🎁 کوڈ کاپی کرو" */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between bg-neutral-100 p-1.5 rounded-xl border border-dashed border-neutral-300">
                    <span className="text-xs font-mono font-black text-slate-800 px-2">
                      کوڈ: {deal.couponCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(deal.couponCode)}
                      style={{ backgroundColor: isCopied ? '#10B981' : '#25D366' }}
                      className="px-3 py-1.5 rounded-lg text-white font-bold text-[11px] flex items-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-2xs"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>کاپی ہو گیا!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-white" />
                          <span>🎁 کوڈ کاپی کرو</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={deal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>ڈیل حاصل کریں</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
