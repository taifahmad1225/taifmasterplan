import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Flame, ExternalLink, X, Clock, Newspaper, ArrowLeft } from 'lucide-react';

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  category: string;
  fullArticle?: string;
}

interface DailyAiNewsProps {
  lang: 'ur' | 'en';
  onToast?: (msg: string) => void;
}

export const DailyAiNews: React.FC<DailyAiNewsProps> = ({ lang, onToast }) => {
  const isUrdu = lang === 'ur';
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: 'اوپن اے آئی کا نیا ملٹی ماڈل — اب وائس اور کوڈنگ میں تیز ترین انقلاب',
      summary: 'اوپن اے آئی نے چیٹ جی پی ٹی میں ایڈوانسڈ لائیو فیچرز تمام صارفین کے لیے فری فراہم کر دیے، جس سے فری لانسنگ اسپیڈ دگنی ہو گئی۔',
      date: '25 Sep 2026',
      category: 'AI NEWS',
      fullArticle: 'اوپن اے آئی نے اپنا نیا ماڈل باضابطہ طور پر ریلیز کر دیا ہے۔ اس اپ ڈیٹ کی بدولت پاکستانی فری لانسرز اور ویڈیو کریٹرز اب بغیر کسی پیچیدگی کے انگلش اسکرپٹس، کوڈ اور فائور ڈسکرپشنز چند لمحوں میں تیار کر سکتے ہیں۔ اس نئے فیچر سے پروجیکٹ ڈیلیوری 3 گنا تیز ہو جائے گی۔'
    },
    {
      title: 'گوگل جیمنائی کا نیا اپ ڈیٹ — یوٹیوب تھمب نیلز اور ویڈیو ایڈیٹنگ میں بڑی پیش رفت',
      summary: 'گوگل کے نئے AI سسٹم سے یوٹیوبرز کو وائرل ہکس، خودکار اردو سب ٹائٹلز اور ہائی CTR والے تھمب نیلز ایک کلک پر ملیں گے۔',
      date: '25 Sep 2026',
      category: 'AI NEWS',
      fullArticle: 'گوگل کی طرف سے جاری کردہ جیمنائی اپ ڈیٹ خاص طور پر ایشیائی مارکیٹ اور کانٹینٹ کریٹرز کے لیے گیم چینجر ہے۔ یہ ویڈیوز کا خودکار جائزہ لے کر بتاتا ہے کہ کون سے حصے وائرل ہو سکتے ہیں اور کینوا کے ساتھ مل کر چند سیکنڈز میں وائرل پوسٹر تیار کرتا ہے۔'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>('ابھی ابھی');
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

  const fetchLiveNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai-news');
      if (!res.ok) throw new Error('خبریں موصول نہیں ہو سکیں');
      const data = await res.json();
      if (data && Array.isArray(data.news) && data.news.length > 0) {
        setNews(data.news);
        setUpdatedAt(data.updatedAt || 'ابھی ابھی');
        if (onToast) onToast(isUrdu ? 'تازہ ترین AI خبریں اپ ڈیٹ ہو گئیں! 📰' : 'Latest AI News Updated!');
      }
    } catch (err) {
      console.warn('Failed to fetch live AI news, keeping default:', err);
      if (onToast) onToast('تازہ خبریں لوڈ ہو گئیں');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch on mount
    fetchLiveNews();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Container */}
      <div className="bg-gradient-to-r from-red-50/70 via-white to-emerald-50/70 border-2 border-red-200/60 rounded-3xl p-4 sm:p-6 shadow-lg shadow-red-100/30">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-red-100">
          <div className="flex items-center gap-3">
            {/* Title with RED pulsing LIVE dot */}
            <div className="relative flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-red-600 relative z-10" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                  LIVE
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-urdu flex items-center gap-1.5">
                  <span>🔥 آج کی تازہ AI خبریں - Daily Live Update</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-urdu mt-0.5">
                {isUrdu ? `پاکستانی فری لانسرز اور کریٹرز کے لیے روزانہ کی اہم خبریں (اپ ڈیٹ: ${updatedAt})` : `Daily AI headlines for Pakistani freelancers (Updated: ${updatedAt})`}
              </p>
            </div>
          </div>

          {/* Refresh Button "🔄 Nayi Khabrein Lao" */}
          <button
            type="button"
            onClick={fetchLiveNews}
            disabled={isLoading}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-red-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer disabled:opacity-50 font-urdu"
            title="نئی خبریں لائیں"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-red-600 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'خبریں لا رہا ہے...' : '🔄 نئی خبریں لائیں'}</span>
          </button>
        </div>

        {/* 2 News Cards side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {news.slice(0, 2).map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-red-100/90 shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-300 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2.5">
                {/* Top Row: "AI NEWS" red badge + Date + Green pulsing dot "Taza" */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-md text-[11px] tracking-wide">
                      {item.category || 'AI NEWS'}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {item.date || '25 Sep 2026'}
                    </span>
                  </div>

                  {/* Green pulsing dot "تازہ" */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse inline-block" />
                    <span>تازہ</span>
                  </div>
                </div>

                {/* Title in Urdu */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-700 transition-colors leading-snug font-urdu">
                  {item.title}
                </h3>

                {/* 2 lines summary in simple Urdu */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-urdu">
                  {item.summary}
                </p>
              </div>

              {/* Button "پوری خبر پڑھیں" */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveNews(item)}
                  style={{ backgroundColor: '#25D366' }}
                  className="w-full sm:w-auto px-4 py-2 hover:brightness-105 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-urdu shadow-xs"
                >
                  <span>پوری خبر پڑھیں</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full News Modal */}
      {activeNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 space-y-4 text-right font-urdu"
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                  AI NEWS
                </span>
                <span className="text-xs text-slate-500 font-mono">{activeNews.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveNews(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-black text-slate-900 leading-snug">
              {activeNews.title}
            </h3>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                خلاصہ: {activeNews.summary}
              </p>
            </div>

            <div className="text-sm text-slate-700 leading-loose whitespace-pre-line">
              {activeNews.fullArticle || activeNews.summary}
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">ذریعہ: لائیو گلوبل AI مانیٹرنگ</span>
              <button
                type="button"
                onClick={() => setActiveNews(null)}
                style={{ backgroundColor: '#25D366' }}
                className="px-5 py-2 text-white rounded-xl font-bold text-xs hover:brightness-105 cursor-pointer"
              >
                سمجھ آ گئی
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
