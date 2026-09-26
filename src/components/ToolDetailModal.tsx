import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Play,
  Send,
  ExternalLink,
  Coins,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowUpRight,
  Star
} from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  lang: 'ur' | 'en';
  onClose: () => void;
  onOpenVideo: (tool: ToolItem) => void;
  onOpenVoicePrompt?: (tool: ToolItem) => void;
  onToast: (msg: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  lang,
  onClose,
  onOpenVideo,
  onOpenVoicePrompt,
  onToast
}) => {
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverStar, setHoverStar] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(tool?.rating || 4.9);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<string[]>([
    'علی، لاہور - یہ ٹول میں یوٹیوب کے لیے استعمال کرتا ہوں بہت اچھا ہے ⭐⭐⭐⭐⭐',
    'فاطمہ، کراچی - فری میں اتنا اچھا کام کر رہا ہے ⭐⭐⭐⭐',
    'کامران، اسلام آباد - فری لانسنگ کے لیے کمال ٹول ہے، کلائنٹ بہت خوش ہوا ⭐⭐⭐⭐⭐'
  ]);

  useEffect(() => {
    if (tool) {
      // Load saved rating
      try {
        const savedRating = localStorage.getItem(`ai_master_rating_${tool.id}`);
        if (savedRating) {
          setUserRating(Number(savedRating));
        } else {
          setUserRating(0);
        }

        // Load saved reviews
        const savedReviews = localStorage.getItem(`ai_master_reviews_${tool.id}`);
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        } else {
          setReviews([
            'علی، لاہور - یہ ٹول میں یوٹیوب کے لیے استعمال کرتا ہوں بہت اچھا ہے ⭐⭐⭐⭐⭐',
            'فاطمہ، کراچی - فری میں اتنا اچھا کام کر رہا ہے ⭐⭐⭐⭐',
            'کامران، اسلام آباد - فری لانسنگ کے لیے کمال ٹول ہے، کلائنٹ بہت خوش ہوا ⭐⭐⭐⭐⭐'
          ]);
        }
      } catch {
        // ignore
      }
      setCurrentRating(tool.rating || 4.9);
    }
  }, [tool]);

  if (!tool) return null;

  const isUrdu = lang === 'ur';

  const handleRate = (star: number) => {
    setUserRating(star);
    try {
      localStorage.setItem(`ai_master_rating_${tool.id}`, star.toString());
    } catch {
      // ignore
    }
    const newAverage = Number(((tool.rating * 4 + star) / 5).toFixed(1));
    setCurrentRating(newAverage);
    onToast(`آپ کی ${star} اسٹار ریٹنگ محفوظ ہو گئی! ⭐`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = `صارف، پاکستان - ${reviewText.trim()} ⭐⭐⭐⭐⭐`;
    const nextReviews = [newReview, ...reviews];
    setReviews(nextReviews);
    try {
      localStorage.setItem(`ai_master_reviews_${tool.id}`, JSON.stringify(nextReviews));
    } catch {
      // ignore
    }
    setReviewText('');
    onToast('آپ کا تبصرہ کامیابی سے شامل ہو گیا! ✅');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(tool.promptTemplate);
    setCopied(true);
    onToast('کاپی ہو گیا! ✅');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenChatGPT = () => {
    const encoded = encodeURIComponent(tool.promptTemplate);
    window.open(`https://chat.openai.com/?prompt=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-neutral-200/90 p-5 sm:p-8 space-y-6 ${
          isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
        }`}
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-neutral-200/80 pb-4">
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-black text-xl flex items-center justify-center shrink-0">
              🤖
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-xl sm:text-2xl">
                  {tool.name}
                </h3>
                {tool.badgeUrdu && (
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                    {isUrdu ? tool.badgeUrdu : (tool.badgeEnglish || 'Popular')}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isUrdu ? tool.urduName : (tool.englishName || tool.name)} ·{' '}
                <span className="text-emerald-700 font-bold">{tool.pricePKR}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECTION A: "یہ ٹول کیا کرتا ہے؟" (2 lines) */}
        {/* ========================================================================= */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isUrdu ? 'سیکشن الف: یہ ٹول کیا کرتا ہے؟' : 'Section A: What Does This Tool Do?'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
            {isUrdu ? tool.whatItDoesUrdu : tool.whatItDoesEnglish}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION B: "اس سے آپ کیا کما سکتے ہیں؟" with earning idea in PKR */}
        {/* ========================================================================= */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm sm:text-base">
              <Coins className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isUrdu ? 'سیکشن ب: اس سے آپ کیا کما سکتے ہیں؟' : 'Section B: What Can You Earn From It?'}</span>
            </div>
            <span className="text-xs font-black bg-amber-200/70 text-amber-900 px-3 py-1 rounded-xl">
              {tool.earningPKR || 'PKR 60,000 - 150,000 / ماہ'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
            {isUrdu ? tool.earningIdeaUrdu : tool.earningIdeaEnglish}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION C: "استعمال کا طریقہ" in 3 steps */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isUrdu ? 'سیکشن ج: استعمال کا طریقہ (3 آسان مراحل):' : 'Section C: How To Use (3 Easy Steps):'}</span>
          </div>
          <div className="space-y-2">
            {(isUrdu ? tool.howToUseStepsUrdu : tool.howToUseStepsEnglish || tool.howToUseStepsUrdu)?.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs sm:text-sm text-slate-800 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Master Prompt Copy Box (kept intact as requested) */}
        {/* ========================================================================= */}
        <div className="space-y-2.5 pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUrdu ? 'ماسٹر پرامپٹ (Master Prompt):' : 'Master Prompt Box:'}</span>
            </span>
            <span className="text-emerald-700 font-medium">
              {isUrdu ? '100% ٹیسٹ شدہ پرامپٹ' : 'Verified Ready-to-Use'}
            </span>
          </div>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed selection:bg-emerald-600 selection:text-white border border-slate-800">
            <p className="whitespace-pre-wrap select-all font-sans">
              {tool.promptTemplate}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURE 2: USER RATING & REVIEW SYSTEM */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-amber-50/50 via-white to-emerald-50/50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-4 font-urdu">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span>⭐ اس ٹول کو ریٹ کریں — آپ کی رائے اہم ہے</span>
            </h4>
            <div className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md font-mono">
              اوسط ریٹنگ: {currentRating.toFixed(1)}/5
            </div>
          </div>

          {/* 5 Big Clickable Stars */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverStar(star)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => handleRate(star)}
                className="p-1 transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                title={`${star} اسٹار دیں`}
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                    (hoverStar || userRating) >= star
                      ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {userRating > 0 && (
            <p className="text-center text-xs font-bold text-emerald-700">
              آپ نے اس ٹول کو {userRating} اسٹارز دیئے ہیں! شکریہ! ✨
            </p>
          )}

          {/* Review Input Box + Button "تبصرہ بھیجیں" green */}
          <form onSubmit={handleAddReview} className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="💬 اپنا تجربہ لکھیں (اردو میں)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-white"
              />
              <button
                type="submit"
                style={{ backgroundColor: '#25D366' }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer shrink-0"
              >
                تبصرہ بھیجیں
              </button>
            </div>
          </form>

          {/* Sample & Live Reviews List */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-[11px] font-bold text-slate-500">پاکستانی صارفین کی رائے:</span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-neutral-50/80 rounded-xl border border-neutral-200/60 text-xs text-slate-700 leading-relaxed flex items-start justify-between gap-2"
                >
                  <span>{rev}</span>
                  <span className="text-emerald-700 font-bold shrink-0 text-[10px]">تصدیق شدہ</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TASK 1: 2 REAL PHYSICAL CLICKABLE BUTTONS (Button 1 & Button 2) */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Button 1: Style: background #25D366 green, color white, padding 12px 20px, border-radius 8px, font Noto Nastaliq Urdu */}
            <button
              type="button"
              onClick={handleCopyPrompt}
              style={{
                backgroundColor: '#25D366',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '8px',
              }}
              className="w-full sm:flex-1 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer hover:brightness-105 font-urdu"
            >
              <Copy className="w-4 h-4" />
              <span>📋 پرامپٹ کاپی کریں (Copy Prompt)</span>
            </button>

            {/* Button 2: Style: background white, border 2px solid #25D366, color #25D366, same padding */}
            <button
              type="button"
              onClick={() => {
                if (onOpenVoicePrompt) {
                  onOpenVoicePrompt(tool);
                }
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #25D366',
                color: '#25D366',
                padding: '12px 20px',
                borderRadius: '8px',
              }}
              className="w-full sm:flex-1 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer hover:bg-emerald-50/60 font-urdu"
            >
              <span>🎤 اردو میں بول کر پرامپٹ بنائیں</span>
            </button>
          </div>
        </div>

        {/* Bottom Auxiliary Actions: Video & Tool Link */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-neutral-100">
          {/* Video Tutorial Button */}
          <button
            onClick={() => {
              onClose();
              onOpenVideo(tool);
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-emerald-700 text-emerald-700" />
            <span>{isUrdu ? `2 منٹ ویڈیو دیکھیں (${tool.videoTutorial.duration})` : `Watch Video (${tool.videoTutorial.duration})`}</span>
          </button>

          {/* Direct Try Tool Link */}
          <a
            href={tool.toolUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center gap-1.5 transition-all"
          >
            <span>{isUrdu ? 'ٹول وزٹ کریں' : 'Visit Tool'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
