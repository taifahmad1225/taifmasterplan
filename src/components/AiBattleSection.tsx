import React, { useState } from 'react';
import { Swords, Sparkles, Trophy, Share2, Flame, Loader2, RefreshCw } from 'lucide-react';

interface AiBattleSectionProps {
  lang: 'ur' | 'en';
  onToast?: (msg: string) => void;
}

const AI_MODELS_1 = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'DeepSeek'];
const AI_MODELS_2 = ['Midjourney', 'Leonardo AI', 'Canva AI', 'Gemini', 'ChatGPT'];

const QUICK_TOPICS = [
  'یوٹیوب تھمب نیل کون بہتر بناتا ہے؟',
  'فری لانسنگ کے لیے کون سا AI بیسٹ ہے؟',
  'وائرل ریلز اسکرپٹ کون لکھ سکتا ہے؟',
  'بغیر کوڈنگ کے ویب سائٹ کون بناتا ہے؟',
  'لوگو اور برانڈنگ ڈیزائن میں کون آگے ہے؟'
];

export const AiBattleSection: React.FC<AiBattleSectionProps> = ({ lang, onToast }) => {
  const isUrdu = lang === 'ur';

  const [ai1, setAi1] = useState('ChatGPT');
  const [ai2, setAi2] = useState('Midjourney');
  const [topic, setTopic] = useState('یوٹیوب تھمب نیل کون بہتر بناتا ہے؟');
  const [isBattling, setIsBattling] = useState(false);
  const [battleResult, setBattleResult] = useState<{
    ai1Arg: string;
    ai2Arg: string;
    verdict: string;
    winner: string;
  } | null>({
    ai1Arg: 'ارے Midjourney بھائی! مجھ (ChatGPT) سے مقابلہ کرنا ناممکن ہے! میں وائرل آئیڈیاز، کلک بیٹ ہکس اور مکھن جیسی اردو/انگریزی اسکرپٹس چند لمحوں میں تیار کر دیتا ہوں۔ بغیر اسکرپٹ کے تمہارا ڈیزائن صرف ایک خالی تصویر ہے! 🚀🔥',
    ai2Arg: 'سنو ChatGPT میاں! باتیں تو سب بناتے ہیں، اصل وژول جادو تو میرا یعنی Midjourney کا ہے! 8K سنیماٹک تھمب نیلز، الٹرا ریئلسٹک چہرے اور سنسنی خیز کلرز جو میں دیتا ہوں وہ ناظرین کو کلک کرنے پر مجبور کرتے ہیں! 😎🎨',
    verdict: 'استاد جی کا لائیو فیصلہ: دونوں نے میدان مار لیا! اصل راز یہ ہے کہ ChatGPT سے کلک ایبل ہک اور پرامپٹ لکھوائیں اور Midjourney سے تصویر بنوائیں۔ فائور پر 2,500 روپے فی تھمب نیل پاکستانی فری لانسرز کے ہاتھ میں ہوگا! 🏆',
    winner: 'ChatGPT اور Midjourney کی جوڑی'
  });

  const handleStartBattle = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      if (onToast) onToast('براہ کرم لڑائی کا موضوع لکھیں');
      return;
    }

    setIsBattling(true);
    setBattleResult(null);

    const minDelay = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const fetchPromise = fetch('/api/ai-battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai1, ai2, topic: topic.trim() })
      }).then(res => {
        if (!res.ok) throw new Error('Battle server busy');
        return res.json();
      });

      const [, data] = await Promise.all([minDelay, fetchPromise]);
      if (data && data.ai1Arg) {
        setBattleResult(data);
        if (onToast) onToast('لڑائی کا فیصلہ آ گیا! 🏆');
      }
    } catch (err) {
      console.warn('Battle fallback triggered:', err);
      await minDelay;
      setBattleResult({
        ai1Arg: `ارے ${ai2}! مجھ (${ai1}) سے مقابلہ مت کرو بھائی! میں "${topic}" کو چٹکی بجا کر مکھن جیسا صاف تیار کرتا ہوں۔ میرے پاس ایسی اسپیڈ ہے کہ تمہارا سرور ہینگ ہو جائے گا! 🚀🔥`,
        ai2Arg: `سنو ${ai1} میاں! باتیں بنانا آسان ہے، اصل کوالٹی تو میری یعنی ${ai2} کی ہے! "${topic}" میں جو ڈیٹیل اور خوبصورتی میں دیتا ہوں وہ تم خواب میں بھی نہیں سوچ سکتے! 😎⚡`,
        verdict: `استاد جی کا فیصلہ: بیٹا دونوں نے مقابلہ خوب کیا! لیکن اگر آپ نے پاکستانی کلائنٹ یا فائور پر تیز ترین کام دینا ہے تو دونوں کا کمبینیشن استعمال کریں۔ پہلے اسکرپٹ لیں اور پھر ڈیزائن بنائیں، 2,000 روپے فی آرڈر آپ کے ہاتھ میں ہوگا! 🏆`,
        winner: `${ai1} اور ${ai2} دونوں چیمپئن ہیں`
      });
    } finally {
      setIsBattling(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!battleResult) return;
    const shareText = `⚔️ AI vs AI لڑائی (${ai1} vs ${ai2})\nموضوع: ${topic}\n\n🤖 ${ai1} کا دعویٰ: ${battleResult.ai1Arg}\n\n🎨 ${ai2} کا دعویٰ: ${battleResult.ai2Arg}\n\n🏆 استاد جی کا فیصلہ: ${battleResult.verdict}\n\nدیکھیں AI Master.pk پر: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-br from-slate-900 via-neutral-900 to-emerald-950 rounded-3xl p-5 sm:p-8 text-white border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        {/* Soft Ambience */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold">
            <Swords className="w-3.5 h-3.5 text-red-400" />
            <span>وائرل AI مقابلہ (Viral Feature)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-urdu text-white tracking-tight">
            ⚔️ AI vs AI لڑائی — دیکھو کون جیتا؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-urdu max-w-xl mx-auto">
            دو بڑے AI ماڈلز آپس میں اپنے دلائل پیش کریں گے اور استاد جی ان کی پرفارمنس کا منصفانہ فیصلہ سنائیں گے۔
          </p>
        </div>

        {/* Battle Configuration Form */}
        <form onSubmit={handleStartBattle} className="space-y-4 max-w-3xl mx-auto relative z-10">
          {/* Top: 2 dropdown selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI 1 Dropdown */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-blue-400/40 space-y-1.5">
              <label className="text-xs font-bold text-blue-300 flex items-center gap-1.5 font-urdu">
                <span>🤖 پہلا AI منتخب کریں (AI 1):</span>
              </label>
              <select
                value={ai1}
                onChange={e => setAi1(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-hidden focus:border-blue-400"
              >
                {AI_MODELS_1.map(m => (
                  <option key={m} value={m} className="bg-slate-900 text-white">
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* AI 2 Dropdown */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-emerald-400/40 space-y-1.5">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-urdu">
                <span>🎨 دوسرا AI منتخب کریں (AI 2):</span>
              </label>
              <select
                value={ai2}
                onChange={e => setAi2(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-hidden focus:border-emerald-400"
              >
                {AI_MODELS_2.map(m => (
                  <option key={m} value={m} className="bg-slate-900 text-white">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Middle: Text input for topic */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-urdu">
              <span>🎯 لڑائی کا موضوع (Topic):</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="موضوع لکھیں: مثلاً یوٹیوب تھمب نیل کون بہتر بناتا ہے؟"
              className="w-full bg-slate-950/80 border border-neutral-700 focus:border-[#25D366] rounded-2xl p-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-hidden font-urdu text-right"
              dir="rtl"
            />

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 font-urdu ml-1">مشہور موضوعات:</span>
              {QUICK_TOPICS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(t)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-[11px] text-slate-300 transition-all font-urdu cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Big Button: "⚔️ Ladai Shuru Karo" - background #25D366 green, large size, hover animation */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={isBattling}
              style={{ backgroundColor: '#25D366' }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-950/60 cursor-pointer font-urdu mx-auto disabled:opacity-50"
            >
              {isBattling ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>⚔️ AI آپس میں بحث کر رہے ہیں...</span>
                </>
              ) : (
                <>
                  <Swords className="w-6 h-6 text-white animate-bounce" />
                  <span>⚔️ لڑائی شروع کرو (Start AI Battle)</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading Animation during battle */}
        {isBattling && (
          <div className="mt-8 p-8 rounded-3xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-3 animate-pulse">
            <div className="text-4xl animate-bounce">⚔️ 💥 🔥</div>
            <p className="text-base font-bold text-emerald-400 font-urdu">
              {ai1} اور {ai2} زبردست دلائل تیار کر رہے ہیں... استاد جی معائنہ کر رہے ہیں!
            </p>
          </div>
        )}

        {/* Battle Results Split Screen Layout */}
        {battleResult && !isBattling && (
          <div className="mt-8 space-y-5 animate-fade-in relative z-10">
            {/* Split Screen Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side: Blue background #dbeafe, Title "ChatGPT Kehta Hai:" + argument */}
              <div
                style={{ backgroundColor: '#dbeafe' }}
                className="p-5 sm:p-6 rounded-3xl text-slate-900 border-2 border-blue-300 shadow-md space-y-2.5 font-urdu"
              >
                <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <span className="text-base sm:text-lg font-black text-blue-900">
                      {ai1} کہتا ہے:
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                    AI 1
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium whitespace-pre-line">
                  {battleResult.ai1Arg}
                </p>
              </div>

              {/* Right Side: Green background #dcfce7, Title "Gemini Kehta Hai:" + argument */}
              <div
                style={{ backgroundColor: '#dcfce7' }}
                className="p-5 sm:p-6 rounded-3xl text-slate-900 border-2 border-emerald-300 shadow-md space-y-2.5 font-urdu"
              >
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎨</span>
                    <span className="text-base sm:text-lg font-black text-emerald-950">
                      {ai2} کہتا ہے:
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    AI 2
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium whitespace-pre-line">
                  {battleResult.ai2Arg}
                </p>
              </div>
            </div>

            {/* Verdict Box: Ustad Jee ka Faisla */}
            <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border-2 border-amber-400/80 p-5 sm:p-6 rounded-3xl space-y-3 font-urdu text-center sm:text-right">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-amber-300/30 pb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-base sm:text-lg font-black text-amber-300">
                    👨‍🏫 استاد جی کا حتمی فیصلہ (Verdict):
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                  فاتح: {battleResult.winner}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                {battleResult.verdict}
              </p>

              {/* Action Buttons: WhatsApp Share */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  style={{ backgroundColor: '#25D366' }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-white" />
                  <span>یہ لڑائی واٹس ایپ پر شیئر کریں</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
