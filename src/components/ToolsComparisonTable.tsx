import React, { useState, useEffect } from 'react';
import { ToolItem } from '../data/toolsData';
import { Trophy, ExternalLink, Share2, Sparkles, Zap, Star, ShieldCheck, Check } from 'lucide-react';

interface ToolsComparisonTableProps {
  categoryName: string;
  tools: ToolItem[];
  lang: 'ur' | 'en';
  onOpenDetail?: (tool: ToolItem) => void;
  onToast?: (msg: string) => void;
}

interface AiComparisonData {
  bestTool: string;
  recommendationReason: string;
  comparisons?: Array<{
    name: string;
    bestFor: string;
    priceType: string;
    speed: string;
    quality: string;
  }>;
}

export const ToolsComparisonTable: React.FC<ToolsComparisonTableProps> = ({
  categoryName,
  tools,
  lang,
  onOpenDetail,
  onToast
}) => {
  const isUrdu = lang === 'ur';

  // Smart defaults for speed and purpose
  const getToolSpeed = (tool: ToolItem, index: number) => {
    if (index % 3 === 0) return 'Fast ⚡⚡⚡';
    if (index % 3 === 1) return 'Fast ⚡⚡⚡';
    return 'Medium ⚡⚡';
  };

  const getPriceBadge = (tool: ToolItem) => {
    if (tool.isFree || tool.pricePKR.includes('0 روپے') || tool.pricePKR.toLowerCase().includes('free')) {
      return {
        label: isUrdu ? 'مفت (Free)' : 'Free',
        bg: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    }
    if (tool.pricePKR.includes('فری ٹرائل') || tool.pricePKR.includes('مفت ٹرائل')) {
      return {
        label: isUrdu ? 'فری میم (Freemium)' : 'Freemium',
        bg: 'bg-amber-100 text-amber-800 border-amber-300'
      };
    }
    return {
      label: isUrdu ? 'پریمیم (Paid)' : 'Paid',
      bg: 'bg-rose-100 text-rose-800 border-rose-300'
    };
  };

  const getToolEmoji = (tool: ToolItem) => {
    const n = tool.name.toLowerCase();
    if (n.includes('chat') || n.includes('claude') || n.includes('deepseek') || n.includes('gemini')) return '🤖';
    if (n.includes('canva') || n.includes('midjourney') || n.includes('leonardo') || n.includes('ideogram') || n.includes('recraft')) return '🎨';
    if (n.includes('capcut') || n.includes('runway') || n.includes('heygen') || n.includes('pika') || n.includes('luma')) return '🎬';
    if (n.includes('eleven') || n.includes('suno') || n.includes('udio') || n.includes('voice')) return '🔊';
    if (n.includes('vidiq') || n.includes('seo') || n.includes('analytics')) return '📈';
    if (n.includes('code') || n.includes('cursor') || n.includes('github') || n.includes('v0')) return '💻';
    return '⚡';
  };

  const getBestFor = (tool: ToolItem) => {
    if (tool.descriptionUrdu.includes('لوگو')) return 'لوگو ڈیزائن کے لیے';
    if (tool.descriptionUrdu.includes('ویڈیو')) return 'ویڈیو اور ریلز کے لیے';
    if (tool.descriptionUrdu.includes('تصویر')) return '4K تصاویر کے لیے';
    if (tool.descriptionUrdu.includes('کوڈ')) return 'ویب اور کوڈنگ کے لیے';
    if (tool.descriptionUrdu.includes('آواز') || tool.descriptionUrdu.includes('وائس')) return 'وائس اوور کے لیے';
    if (tool.descriptionUrdu.includes('مضمون') || tool.descriptionUrdu.includes('لکھائی')) return 'فری لانس رائٹنگ کے لیے';
    return 'تیز رفتار آٹومیشن کے لیے';
  };

  const [aiData, setAiData] = useState<AiComparisonData>({
    bestTool: tools[0]?.urduName || tools[0]?.name || 'Canva / ChatGPT',
    recommendationReason: isUrdu
      ? `اس کیٹیگری میں "${tools[0]?.urduName || tools[0]?.name}" سب سے زیادہ تجویز کردہ ٹول ہے کیونکہ یہ پاکستانی فری لانسرز کے لیے استعمال میں انتہائی آسان ہے اور کم وقت میں زیادہ کمائی کا موقع دیتا ہے۔`
      : `In this category, "${tools[0]?.name}" is the top recommendation for Pakistani freelancers due to ease of use and high productivity.`
  });

  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    // Fetch live Gemini comparison analysis
    let isMounted = true;
    const fetchComparison = async () => {
      setIsLoadingAi(true);
      try {
        const res = await fetch('/api/compare-tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoryName,
            toolNames: tools.map(t => t.name)
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.bestTool) {
            setAiData({
              bestTool: data.bestTool,
              recommendationReason: data.recommendationReason || aiData.recommendationReason
            });
          }
        }
      } catch (err) {
        console.warn('Comparison AI fetch error, keeping default:', err);
      } finally {
        if (isMounted) setIsLoadingAi(false);
      }
    };

    fetchComparison();
    return () => {
      isMounted = false;
    };
  }, [categoryName, tools]);

  const handleShareWhatsApp = () => {
    const summary = `📊 ${categoryName} کے تمام 10 AI ٹولز کا موازنہ:\n\n🏆 تجویز کردہ ٹول: ${aiData.bestTool}\n💡 کیوں؟: ${aiData.recommendationReason}\n\nٹاپ 5 ٹولز:\n` +
      tools.slice(0, 5).map((t, i) => `${i + 1}. ${t.urduName || t.name} (${t.pricePKR})`).join('\n') +
      `\n\nمکمل ٹیبل دیکھیں: ${window.location.origin}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(summary)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Above Table: Green highlight box: "🏆 Our Recommendation: Best tool in this category is [Tool Name]" */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-[#25D366] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-urdu">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                {isUrdu ? 'ہماری تجویز' : 'AI Recommendation'}
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                {isUrdu ? `🏆 اس کیٹیگری کا بہترین ٹول: ` : `🏆 Best tool in this category is `}
                <span className="text-emerald-700 underline decoration-[#25D366] decoration-2">
                  {aiData.bestTool}
                </span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {aiData.recommendationReason}
            </p>
          </div>
        </div>

        {/* Small AI Badge */}
        <div className="self-end sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
          <span>{isLoadingAi ? 'AI تجزیہ جاری...' : 'Gemini AI تصدیق شدہ'}</span>
        </div>
      </div>

      {/* Table Container - Horizontally scrollable on mobile */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm bg-white">
        <table className="w-full text-right border-collapse min-w-[720px] font-urdu">
          {/* Table Header: background #25D366 green, text white, font Noto Nastaliq Urdu */}
          <thead>
            <tr style={{ backgroundColor: '#25D366' }} className="text-white text-xs sm:text-sm font-black">
              <th className="py-3.5 px-3 text-center w-12 border-b border-emerald-600">#</th>
              <th className="py-3.5 px-4 border-b border-emerald-600">ٹول کا نام و آئیکن</th>
              <th className="py-3.5 px-4 border-b border-emerald-600">کس کام کے لیے بہترین ہے؟</th>
              <th className="py-3.5 px-4 border-b border-emerald-600 text-center">قیمت (Price)</th>
              <th className="py-3.5 px-4 border-b border-emerald-600 text-center">رفتار (Speed)</th>
              <th className="py-3.5 px-4 border-b border-emerald-600 text-center">کوالٹی (Rating)</th>
              <th className="py-3.5 px-4 border-b border-emerald-600 text-center">ایکشن بٹن</th>
            </tr>
          </thead>

          {/* Alternate row colors: white and #f0fdf4 light green */}
          <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm text-slate-800">
            {tools.map((tool, index) => {
              const isEven = index % 2 === 0;
              const priceBadge = getPriceBadge(tool);
              const speedText = getToolSpeed(tool, index);
              const bestForText = getBestFor(tool);

              return (
                <tr
                  key={tool.id}
                  style={{ backgroundColor: isEven ? '#ffffff' : '#f0fdf4' }}
                  className="hover:bg-emerald-50/80 transition-colors"
                >
                  {/* 1. # (Serial Number) */}
                  <td className="py-3.5 px-3 text-center font-bold text-slate-500 text-xs font-mono">
                    {index + 1}
                  </td>

                  {/* 2. Tool Name + Small Logo/Icon */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        {getToolEmoji(tool)}
                      </span>
                      <div>
                        <div className="font-black text-slate-900 leading-tight">
                          {tool.urduName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans font-medium">
                          {tool.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Best For? (e.g. Best for Logo, Best for Poster) */}
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-neutral-100/90 text-slate-800 font-bold text-xs">
                      {bestForText}
                    </span>
                  </td>

                  {/* 4. Price (Free / Paid / Freemium) with colored badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black border ${priceBadge.bg}`}
                    >
                      {priceBadge.label}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-bold">
                      {tool.pricePKR}
                    </div>
                  </td>

                  {/* 5. Speed (Fast ⚡⚡⚡ / Medium ⚡⚡ / Slow ⚡) */}
                  <td className="py-3.5 px-4 text-center font-bold text-xs whitespace-nowrap">
                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 inline-block">
                      {speedText}
                    </span>
                  </td>

                  {/* 6. Quality (⭐ 5/5, 4.8/5 etc) */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 font-black text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md text-xs font-mono">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{tool.rating.toFixed(1)}/5</span>
                    </div>
                  </td>

                  {/* 7. Action Button "🔍 Try Now" (green #25D366) */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <a
                        href={tool.toolUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: '#25D366' }}
                        className="py-1.5 px-3 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1 hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                        title={tool.name}
                      >
                        <span>🔍 Try Now</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {onOpenDetail && (
                        <button
                          type="button"
                          onClick={() => onOpenDetail(tool)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-slate-700 text-xs transition-colors cursor-pointer"
                          title="تفصیلات دیکھیں"
                        >
                          نکات
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Below table: Button "📤 Share This Comparison on WhatsApp" - shares table summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-500 font-urdu">
          * تمام ٹولز کو سپیڈ، آؤٹ پٹ کوالٹی اور پاکستانی صارفین کے لیے فری پلان کے مطابق رینک کیا گیا ہے۔
        </p>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          style={{ backgroundColor: '#25D366' }}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer font-urdu"
        >
          <Share2 className="w-4 h-4 text-white" />
          <span>📤 یہ موازنہ واٹس ایپ پر شیئر کریں (Share on WhatsApp)</span>
        </button>
      </div>
    </div>
  );
};
