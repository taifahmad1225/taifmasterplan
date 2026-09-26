import React, { useState, useRef } from 'react';
import {
  Search,
  Sparkles,
  Stethoscope,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  X,
  Loader2,
  Copy,
  Check,
  Mic
} from 'lucide-react';
import { startVoiceListening } from '../utils/voiceRecognition';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onQuickTopicClick: (topic: string) => void;
  onToast?: (msg: string) => void;
}

interface DoctorDisplayResult {
  title: string;
  problem: string;
  rawText?: string;
  solutionSteps: string[];
  tools: Array<{
    name: string;
    role: string;
    url: string;
    icon: string;
  }>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  onQuickTopicClick,
  onToast,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [activeResult, setActiveResult] = useState<DoctorDisplayResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Exact placeholder as requested:
  // "اپنا مسئلہ بتائیں یا سرچ کریں 🔍  مثال: لوگو بنانا | CV لکھنا | ویوز نہیں آ رہے | پرامپٹ چاہیے"
  const defaultPlaceholder =
    'اپنا مسئلہ بتائیں یا سرچ کریں 🔍  مثال: لوگو بنانا | CV لکھنا | ویوز نہیں آ رہے | پرامپٹ چاہیے';

  const toolDirectory: Record<string, { url: string; icon: string; role: string }> = {
    Canva: { url: 'https://canva.com', icon: '🎨', role: 'ڈیزائن اور تھمب نیل کے لیے' },
    VidIQ: { url: 'https://vidiq.com', icon: '📈', role: 'یوٹیوب وائرل ٹیگز اور SEO کے لیے' },
    ChatGPT: { url: 'https://chat.openai.com', icon: '🤖', role: 'اسکرپٹ اور اسٹریٹجی کے لیے' },
    Ideogram: { url: 'https://ideogram.ai', icon: '💡', role: 'ٹائپوگرافی اور لوگو کے لیے' },
    'Recraft.ai': { url: 'https://recraft.ai', icon: '📐', role: 'مفت ویکٹر (SVG) فارمیٹ کے لیے' },
    Claude: { url: 'https://claude.ai', icon: '📄', role: 'اعلیٰ کوالٹی لکھائی و CV کے لیے' },
    'Claude 3.5': { url: 'https://claude.ai', icon: '📄', role: 'اعلیٰ کوالٹی لکھائی و CV کے لیے' },
    Grammarly: { url: 'https://grammarly.com', icon: '✨', role: 'انگلش گرامر درستی کے لیے' },
    CapCut: { url: 'https://capcut.com', icon: '🎬', role: 'مفت ویڈیو ایڈیٹنگ و سب ٹائٹلز' },
    ElevenLabs: { url: 'https://elevenlabs.io', icon: '🔊', role: 'قدرتی اردو و انگریزی وائس اوور' },
    Midjourney: { url: 'https://midjourney.com', icon: '🖼️', role: 'شاندار AI آرٹ و فوٹوگرافی' },
    DeepSeek: { url: 'https://chat.deepseek.com', icon: '⚡', role: 'مفت جدید ترین AI اسسٹنٹ' },
    Perplexity: { url: 'https://perplexity.ai', icon: '🔍', role: 'ریسرچ اور حوالہ جاتی معلومات' },
  };

  // Parses real Gemini AI response into structured presentation
  const parseAiDoctorResponse = (raw: string, query: string): DoctorDisplayResult => {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    let problem = query;
    const steps: string[] = [];
    const extractedTools: string[] = [];

    // Check if first line contains problem
    for (const line of lines) {
      if (
        line.toLowerCase().includes('مسئلہ') ||
        line.toLowerCase().includes('problem')
      ) {
        problem = line.replace(/^(مسئلہ:|مسئلہ|Problem:|Problem)/i, '').trim();
      } else if (/^(\d+[\.\-\)]|•|\*|مرحلہ\s*\d+:?)/i.test(line)) {
        const clean = line.replace(/^(\d+[\.\-\)]|•|\*|مرحلہ\s*\d+:?)/i, '').trim();
        if (clean.length > 5 && steps.length < 3) {
          steps.push(clean);
        }
      }
    }

    // Match recommended tools mentioned in the AI text
    Object.keys(toolDirectory).forEach((tName) => {
      if (raw.toLowerCase().includes(tName.toLowerCase()) && extractedTools.length < 3) {
        if (!extractedTools.includes(tName)) {
          extractedTools.push(tName);
        }
      }
    });

    // Ensure 3 tools are always present
    if (extractedTools.length < 3) {
      ['Canva', 'ChatGPT', 'CapCut'].forEach((fallback) => {
        if (extractedTools.length < 3 && !extractedTools.includes(fallback)) {
          extractedTools.push(fallback);
        }
      });
    }

    if (steps.length === 0) {
      steps.push(
        'مسئلے کا تفصیلی تجزیہ کر کے مطلوبہ مقصد کا واضح خاکہ تیار کریں۔',
        'تجویز کردہ AI ٹولز پر مفت اکاؤنٹ بنا کر ہمارا تیار پرامپٹ لگائیں۔',
        'حاصل شدہ رزلٹ کو فوری اپنے پروجیکٹ یا سوشل میڈیا پر پبلش کریں۔'
      );
    }

    const structuredTools = extractedTools.map((tName) => {
      const match = toolDirectory[tName] || {
        url: 'https://google.com',
        icon: '🤖',
        role: 'مفت AI مددگار ٹول',
      };
      return {
        name: tName,
        role: match.role,
        url: match.url,
        icon: match.icon,
      };
    });

    return {
      title: '🩺 AI ڈاکٹر کا لائیو مشورہ',
      problem: problem || query,
      rawText: raw,
      solutionSteps: steps,
      tools: structuredTools,
    };
  };

  // Local fallback if offline
  const fallbackDiagnosis = (query: string): DoctorDisplayResult => {
    return {
      title: '🩺 AI ڈاکٹر کا مشورہ',
      problem: query || 'آن لائن کام اور ویوز بڑھانا',
      rawText: `مسئلہ: ${query}\nحل:\n1. پہلے 3 سیکنڈ پرکشش بنائیں۔\n2. Canva سے ہائی CTR تھمب نیل بنائیں۔\n3. شام کے وقت شیڈول کریں۔\nیہ 3 ٹول استعمال کریں: Canva, VidIQ, ChatGPT`,
      solutionSteps: [
        'ویڈیو کا ہک (پہلے 3 سیکنڈ) مضبوط بنائیں تاکہ اسکرول کرنے والا ناظر فوراً رک جائے۔',
        'Canva سے برائٹ اور دلکش تھمب نیل ڈیزائن کریں تاکہ کلک ریٹ (CTR) بڑھے۔',
        'VidIQ سے ٹاپ ٹرینڈنگ پاکستانی کی ورڈز لے کر روزانہ شیڈول کے مطابق پوسٹ کریں۔',
      ],
      tools: [
        { name: 'Canva', role: 'پرکشش تھمب نیل ڈیزائن کے لیے', url: 'https://canva.com', icon: '🎨' },
        { name: 'VidIQ', role: 'یوٹیوب وائرل ٹیگز اور SEO کے لیے', url: 'https://vidiq.com', icon: '📈' },
        { name: 'ChatGPT', role: 'وائرل اسکرپٹس اور ہکس لکھنے کے لیے', url: 'https://chat.openai.com', icon: '🤖' },
      ],
    };
  };

  // Execute Live AI Doctor query
  const runLiveDoctor = async (query: string) => {
    const q = query.trim() || 'میرے ویوز نہیں آ رہے';
    setIsThinking(true);
    setActiveResult(null);

    const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const fetchPromise = fetch('/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: q }),
      }).then((res) => {
        if (!res.ok) throw new Error('سرور سے رابطہ نہ ہو سکا');
        return res.json();
      });

      // Wait for both the minimum 2-sec animation and the fetch call
      const [, data] = await Promise.all([minDelayPromise, fetchPromise]);

      if (data && data.answer) {
        const parsed = parseAiDoctorResponse(data.answer, q);
        setActiveResult(parsed);
      } else {
        setActiveResult(fallbackDiagnosis(q));
      }
    } catch (err) {
      console.warn('AI Doctor live call failed, using fallback:', err);
      await minDelayPromise;
      setActiveResult(fallbackDiagnosis(q));
    } finally {
      setIsThinking(false);
    }
  };

  // Real voice listening triggered directly by user click event (Feature 1)
  const handleVoiceClick = () => {
    startVoiceListening(
      inputRef.current,
      (transcript) => {
        if (transcript && transcript.trim()) {
          const cleanText = transcript.trim();
          setInputValue(cleanText);
          onSearchSubmit(cleanText);
          runLiveDoctor(cleanText);
        }
      },
      {
        onStart: () => setIsVoiceListening(true),
        onEnd: () => setIsVoiceListening(false),
        onError: () => setIsVoiceListening(false),
        onToast: onToast,
      }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVoiceListening(false);
    const query = inputValue.trim() || 'میرے ویوز نہیں آ رہے';
    onSearchSubmit(query);
    runLiveDoctor(query);
  };

  const handleChipClick = (topic: string) => {
    setInputValue(topic);
    onQuickTopicClick(topic);
    runLiveDoctor(topic);
  };

  const handleCopyAdvice = () => {
    if (!activeResult) return;
    const textToCopy =
      activeResult.rawText ||
      `${activeResult.title}\nمسئلہ: ${activeResult.problem}\n\nحل:\n${activeResult.solutionSteps
        .map((s, i) => `${i + 1}. ${s}`)
        .join('\n')}\n\nیہ 3 ٹول استعمال کریں:\n${activeResult.tools
        .map((t) => `• ${t.name} (${t.url})`)
        .join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickBadges = [
    { label: 'میرے ویوز نہیں آ رہے', emoji: '📈' },
    { label: 'لوگو بنانا', emoji: '🎨' },
    { label: 'CV لکھنا', emoji: '📄' },
    { label: 'پرامپٹ چاہیے', emoji: '💡' },
  ];

  return (
    <section
      className="relative pt-2 pb-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto overflow-hidden"
      dir="rtl"
    >
      {/* Background Soft Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-emerald-100/40 via-teal-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Title */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-[#25D366]/40 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs">
          <Stethoscope className="w-4 h-4 text-[#25D366]" />
          <span>پاکستان کا پہلا 100% لائیو AI ڈاکٹر کلینک</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.6] max-w-3xl mx-auto font-urdu">
          آپ کو کیا بنانا ہے؟{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-700 via-[#25D366] to-teal-600 inline-block">
            AI ڈاکٹر سے پوچھیں
          </span>
        </h1>

        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-urdu">
          کسی بھی کام میں رکاوٹ آ رہی ہے تو بلا جھجھک لکھیں — اصلی Gemini AI آپ کا مسئلہ سمجھ کر فوری
          3 مراحل اور 3 بہترین ٹولز تجویز کرے گا۔
        </p>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 1 - AI DOCTOR SEARCH BAR (Top Wala) WITH LIVE VOICE BUTTON */}
      {/* ========================================================================= */}
      <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto">
        <div
          className={`relative flex items-center p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-slate-200/70 border-2 transition-all duration-300 ${
            isFocused || isVoiceListening
              ? 'border-[#25D366] ring-4 ring-emerald-100'
              : 'border-neutral-200 hover:border-neutral-300'
          }`}
        >
          {/* Right side in RTL: Search Icon & Mic Button */}
          <div className="flex items-center gap-2 pr-2 sm:pr-3 shrink-0">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            
            {/* Button Design: 🎤 icon, green circle background #25D366, white mic, 36px x 36px, rounded full */}
            <button
              type="button"
              onClick={handleVoiceClick}
              style={{
                backgroundColor: isVoiceListening ? '#EF4444' : '#25D366',
                width: '36px',
                height: '36px',
              }}
              className={`rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md cursor-pointer shrink-0 ${
                isVoiceListening
                  ? 'ring-4 ring-red-200 animate-pulse scale-105'
                  : 'hover:bg-[#1EBE5D] hover:scale-105 active:scale-95'
              }`}
              title="مائیک سے بولیں (Voice Search)"
              aria-label="مائیک سے بولیں"
            >
              <Mic className={`w-4 h-4 text-white ${isVoiceListening ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          {/* If listening: Show animation inside search bar: "🎤 سن رہا ہوں... بولیں" with pulsing red dot */}
          {isVoiceListening ? (
            <div className="flex-1 flex items-center gap-2 px-3 py-2 text-right font-urdu text-red-600 font-black text-xs sm:text-base animate-pulse">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping shrink-0" />
              <span>🎤 سن رہا ہوں... بولیں</span>
            </div>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={defaultPlaceholder}
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-hidden text-xs sm:text-base font-medium px-2 text-right font-urdu"
              dir="rtl"
            />
          )}

          {/* Button: "حل بتائیں" */}
          <button
            type="submit"
            disabled={isThinking || isVoiceListening}
            style={{ backgroundColor: '#25D366' }}
            className="px-5 sm:px-7 py-3 sm:py-3.5 hover:brightness-105 active:scale-95 text-white font-bold text-xs sm:text-base rounded-xl sm:rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer shrink-0 font-urdu disabled:opacity-50"
          >
            {isThinking ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Sparkles className="w-4 h-4 text-white" />
            )}
            <span>{isThinking ? 'سوچ رہا ہے...' : 'حل بتائیں'}</span>
          </button>
        </div>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        <span className="text-xs text-slate-500 font-bold ml-1 font-urdu">فوری ٹاپکس:</span>
        {quickBadges.map((badge, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(badge.label)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-neutral-200 hover:border-[#25D366] text-xs font-semibold text-slate-700 hover:text-emerald-900 transition-all shadow-2xs active:scale-95 flex items-center gap-1.5 cursor-pointer font-urdu"
          >
            <span>{badge.emoji}</span>
            <span>{badge.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TASK 2 UI: On enter, show "🩺 AI ڈاکٹر سوچ رہا ہے..." 2 sec animation */}
      {/* ========================================================================= */}
      {isThinking && (
        <div
          style={{ backgroundColor: '#E6F4EA', borderColor: '#25D366' }}
          className="mt-8 text-center py-7 px-6 border-2 rounded-3xl shadow-xl max-w-2xl mx-auto animate-pulse flex items-center justify-center gap-3.5 font-urdu"
        >
          <span className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-xl shadow-md animate-spin">
            🩺
          </span>
          <span className="text-base sm:text-xl font-black text-emerald-950">
            🩺 AI ڈاکٹر سوچ رہا ہے...
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TASK 2 UI: Real AI answer in green box (#E6F4EA background, #25D366 border) */}
      {/* ========================================================================= */}
      {activeResult && !isThinking && (
        <div
          style={{ backgroundColor: '#E6F4EA', borderColor: '#25D366' }}
          className="mt-8 text-right max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 border-2 shadow-2xl space-y-5 animate-fade-in relative font-urdu"
        >
          <button
            onClick={() => setActiveResult(null)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-xs"
            title="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title Header */}
          <div className="flex items-start justify-between gap-3 border-b border-emerald-200/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-white text-[#25D366] border border-emerald-200 flex items-center justify-center text-2xl shadow-sm">
                🩺
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {activeResult.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 font-bold mt-0.5">
                  مسئلہ: <span className="text-slate-950 font-extrabold">{activeResult.problem}</span>
                </p>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyAdvice}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-50 text-slate-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ml-8 sm:ml-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>کاپی ہو گیا! ✅</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>مشورہ کاپی کریں</span>
                </>
              )}
            </button>
          </div>

          {/* Live AI Raw Text Display if available */}
          {activeResult.rawText && (
            <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-line text-right">
              {activeResult.rawText}
            </div>
          )}

          {/* Solution: 3 steps in Urdu */}
          <div className="space-y-2.5">
            <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span>حل: 3 آسان مراحل</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800">
              {activeResult.solutionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs"
                >
                  <span className="w-6 h-6 rounded-full bg-[#25D366] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-semibold">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools: "یہ 3 ٹول استعمال کریں:" */}
          <div className="pt-2 border-t border-emerald-200/80 space-y-3">
            <h4 className="font-black text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#25D366]" />
              <span>یہ 3 ٹول استعمال کریں (براہ راست لنکس):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeResult.tools.map((tool, idx) => (
                <a
                  key={idx}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-white hover:bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col justify-between transition-all group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{tool.icon}</span>
                      <ExternalLink className="w-4 h-4 text-[#25D366] opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-black text-slate-900 text-sm mt-1.5 group-hover:text-emerald-800">
                      {tool.name}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                      {tool.role}
                    </div>
                  </div>
                  <div className="text-xs text-[#25D366] font-bold mt-3 pt-2 border-t border-neutral-100 flex items-center gap-1">
                    <span>ٹول کھولیں</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
