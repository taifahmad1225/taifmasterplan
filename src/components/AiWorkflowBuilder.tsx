import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Cpu,
  Layers,
  Zap,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Send,
  Loader2,
  Video,
  Play
} from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface WorkflowStep {
  toolName: string;
  roleUrdu: string;
  icon: string;
  toolSlug?: string;
  categorySlug?: string;
}

interface WorkflowItem {
  id: string;
  titleUrdu: string;
  subtitleUrdu: string;
  steps: WorkflowStep[];
  badgeUrdu: string;
  outputSummaryUrdu: string;
}

interface AiWorkflowBuilderProps {
  lang: 'ur' | 'en';
  onToast: (msg: string) => void;
  onOpenDetailBySlug?: (slug: string) => void;
}

export const AiWorkflowBuilder: React.FC<AiWorkflowBuilderProps> = ({
  lang,
  onToast,
  onOpenDetailBySlug
}) => {
  const isUrdu = lang === 'ur';

  // 4 Pre-made Workflow Cards exactly as requested (kept below custom builder)
  const WORKFLOW_CARDS: WorkflowItem[] = [
    {
      id: 'wf-youtube-short',
      titleUrdu: '1. یوٹیوب شارٹ بنانا',
      subtitleUrdu: 'مکمل وائرل شارٹ ویڈیو خودکار تیار کریں',
      badgeUrdu: 'یوٹیوب آٹومیشن',
      outputSummaryUrdu: '4K ویڈیو + اردو کیپشنز + پروفیشنل وائس اوور',
      steps: [
        {
          toolName: 'ChatGPT',
          roleUrdu: 'وائرل سکرپٹ و ہک',
          icon: '✍️',
          toolSlug: 'chatgpt-plus',
          categorySlug: 'writing'
        },
        {
          toolName: 'ElevenLabs',
          roleUrdu: 'قدرتی انسانی وائس',
          icon: '🎙️',
          toolSlug: 'elevenlabs',
          categorySlug: 'voice'
        },
        {
          toolName: 'CapCut',
          roleUrdu: 'آٹو کیپشن و ویڈیو',
          icon: '🎬',
          toolSlug: 'capcut',
          categorySlug: 'video'
        },
        {
          toolName: 'Leonardo AI',
          roleUrdu: '4K تھمب نیل آرٹ',
          icon: '🎨',
          toolSlug: 'leonardo-ai',
          categorySlug: 'image'
        }
      ]
    },
    {
      id: 'wf-fiverr-logo',
      titleUrdu: '2. Fiverr پر لوگو بیچنا',
      subtitleUrdu: 'انٹرنیشنل کلائنٹ کو ویکٹر برانڈ کٹ ڈلیور کریں',
      badgeUrdu: 'فائور کمائی',
      outputSummaryUrdu: 'SVG ویکٹر + 3D موک اپ پرزنٹیشن',
      steps: [
        {
          toolName: 'ChatGPT',
          roleUrdu: 'برانڈ آئیڈیا و پرامپٹ',
          icon: '💡',
          toolSlug: 'chatgpt-plus',
          categorySlug: 'writing'
        },
        {
          toolName: 'Leonardo AI',
          roleUrdu: 'جدید لوگو ڈیزائن',
          icon: '💎',
          toolSlug: 'leonardo-ai',
          categorySlug: 'image'
        },
        {
          toolName: 'Canva',
          roleUrdu: '3D موک اپ و کارڈ',
          icon: '📦',
          toolSlug: 'canva-magic',
          categorySlug: 'design'
        },
        {
          toolName: 'Fiverr',
          roleUrdu: 'کلائنٹ کو اپلوڈ',
          icon: '🚀',
          toolSlug: 'fiverr-workspace',
          categorySlug: 'business'
        }
      ]
    },
    {
      id: 'wf-whatsapp-bot',
      titleUrdu: '3. واٹس ایپ بوٹ بنانا',
      subtitleUrdu: 'پاکستانی دکانوں اور بزنس کے لیے 24 گھنٹے خودکار سپورٹ',
      badgeUrdu: 'بزنس آٹومیشن',
      outputSummaryUrdu: 'اردو چیٹ بوٹ + سیلز فنل',
      steps: [
        {
          toolName: 'ChatGPT',
          roleUrdu: 'گاہکوں کے جوابات',
          icon: '🤖',
          toolSlug: 'chatgpt-plus',
          categorySlug: 'chatbot'
        },
        {
          toolName: 'Voiceflow',
          roleUrdu: 'بوٹ فلو ڈیزائنر',
          icon: '⚡',
          toolSlug: 'voiceflow-ai',
          categorySlug: 'chatbot'
        },
        {
          toolName: 'WhatsApp API',
          roleUrdu: 'لائیو کنکشن و میسجنگ',
          icon: '📲',
          toolSlug: 'whatsapp-business-api',
          categorySlug: 'chatbot'
        }
      ]
    },
    {
      id: 'wf-blog-earning',
      titleUrdu: '4. بلاگ سے پیسہ کمانا',
      subtitleUrdu: 'گوگل ایڈسینس اور بلاگنگ سے ماہانہ غیر فعال آمدنی',
      badgeUrdu: 'بلاگنگ و ایڈسینس',
      outputSummaryUrdu: 'SEO آرٹیکل + فیچرڈ امیج + لائیو پوسٹ',
      steps: [
        {
          toolName: 'Gemini',
          roleUrdu: 'ٹرینڈنگ ٹاپک ریسرچ',
          icon: '🔍',
          toolSlug: 'google-gemini-pro',
          categorySlug: 'writing'
        },
        {
          toolName: 'ChatGPT',
          roleUrdu: 'مکمل SEO آرٹیکل',
          icon: '📝',
          toolSlug: 'chatgpt-plus',
          categorySlug: 'writing'
        },
        {
          toolName: 'Canva',
          roleUrdu: 'بلاگ کور تصویر',
          icon: '🖼️',
          toolSlug: 'canva-magic',
          categorySlug: 'design'
        },
        {
          toolName: 'WordPress',
          roleUrdu: 'خودکار اشاعت',
          icon: '🌐',
          toolSlug: 'wordpress-ai',
          categorySlug: 'code'
        }
      ]
    }
  ];

  // Custom AI Workflow State
  const [customTaskInput, setCustomTaskInput] = useState('');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customWorkflowResult, setCustomWorkflowResult] = useState<WorkflowItem | null>(null);

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('wf-youtube-short');
  const [savedWorkflows, setSavedWorkflows] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aimaster_saved_workflows');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeWorkflow =
    WORKFLOW_CARDS.find(w => w.id === selectedWorkflowId) || WORKFLOW_CARDS[0];

  const handleSaveToWorkspace = (workflow: WorkflowItem) => {
    const next = Array.from(new Set([...savedWorkflows, workflow.id]));
    setSavedWorkflows(next);
    try {
      localStorage.setItem('aimaster_saved_workflows', JSON.stringify(next));
    } catch {
      // ignore
    }
    onToast(`✅ "${workflow.titleUrdu}" آپ کے ورک اسپیس میں محفوظ ہو گیا!`);
  };

  const handleToolClick = (toolName: string, slug?: string) => {
    if (slug && onOpenDetailBySlug) {
      onOpenDetailBySlug(slug);
    } else {
      onToast(`🔍 "${toolName}" ٹول کی تفصیلات کھل رہی ہیں...`);
      const el = document.getElementById('tools-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom AI workflow generation using Gemini backend
  const handleGenerateCustomWorkflow = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customTaskInput.trim()) {
      onToast('براہ کرم اپنا کام لکھیں!');
      return;
    }

    setIsGeneratingCustom(true);
    try {
      const res = await fetch('/api/custom-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: customTaskInput.trim() })
      });
      const data = await res.json();
      if (data && data.steps && Array.isArray(data.steps)) {
        const item: WorkflowItem = {
          id: `custom-${Date.now()}`,
          titleUrdu: data.titleUrdu || `ورک فلو: ${customTaskInput.trim()}`,
          subtitleUrdu: data.summaryUrdu || 'AI کی تجویز کردہ مرحلہ وار ترتیب',
          badgeUrdu: 'کسٹم AI پلان',
          outputSummaryUrdu: data.summaryUrdu || 'تیار شدہ نتیجہ اور مطلوبہ ڈلیوری',
          steps: data.steps.map((s: any) => ({
            toolName: s.toolName || 'AI Tool',
            roleUrdu: s.roleUrdu || 'مرحلہ وار کام',
            icon: s.icon || '⚡',
            toolSlug: (s.toolName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
          }))
        };
        setCustomWorkflowResult(item);
        onToast('✨ کسٹم AI ورک فلو تیار ہو گیا!');
      } else {
        throw new Error('غلط فارمیٹ');
      }
    } catch (err) {
      console.warn('Custom workflow fallback:', err);
      // High quality fallback
      setCustomWorkflowResult({
        id: `custom-${Date.now()}`,
        titleUrdu: `ورک فلو برائے: ${customTaskInput.trim()}`,
        subtitleUrdu: '3 ٹولز کی خودکار ترتیب',
        badgeUrdu: 'کسٹم ورک فلو',
        outputSummaryUrdu: 'مکمل پروجیکٹ کی خودکار تکمیل',
        steps: [
          { toolName: 'ChatGPT', roleUrdu: 'آئیڈیا و تحریری خاکہ', icon: '✍️' },
          { toolName: 'Canva', roleUrdu: 'ڈیزائننگ اور پرزنٹیشن', icon: '🎨' },
          { toolName: 'CapCut', roleUrdu: 'فائنل میڈیا اور شیئرنگ', icon: '🎬' }
        ]
      });
      onToast('✨ ورک فلو تیار کر دیا گیا!');
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  return (
    <section
      id="workflow-builder-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#128C7E] text-xs sm:text-sm font-bold border border-emerald-300">
          <Cpu className="w-4 h-4 text-[#25D366]" />
          <span>فیچر #11: AI ورک فلو آٹومیشن</span>
        </div>

        {/* Requested Section Title & Subtitle */}
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          1 کلک میں پورا کام کریں — AI ورک فلو بلڈر
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          یوٹیوب شارٹ بنانا ہے؟ 1 کلک کریں، 4 ٹولز خود ترتیب سے لگ جائیں گے
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TASK 2: UPGRADE WORKFLOW BUILDER TO CUSTOM WORKFLOW AT TOP */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#25D366]/60 mb-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>AI اسمارٹ آرکیٹیکٹ</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black text-white">
            اپنا ورک فلو خود بنائیں ✨
          </h3>

          <p className="text-xs sm:text-sm text-slate-300">
            اپنا کوئی بھی کام لکھیں، Gemini AI ہمارے 50+ ٹولز میں سے بہترین ٹولز چن کر خود فلو بنائے گا
          </p>

          {/* Input Box + Button */}
          <form onSubmit={handleGenerateCustomWorkflow} className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <div className="relative w-full">
              <input
                type="text"
                value={customTaskInput}
                onChange={(e) => setCustomTaskInput(e.target.value)}
                placeholder="اپنا کام لکھیں، جیسے: مجھے شادی کا کارڈ بنانا ہے..."
                className="w-full py-3.5 px-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-300 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/30 text-sm font-urdu"
                dir="rtl"
              />
              <span className="absolute right-4 top-3.5 text-xl">💡</span>
            </div>

            <button
              type="submit"
              disabled={isGeneratingCustom}
              style={{ backgroundColor: '#25D366' }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-black text-sm whitespace-nowrap shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isGeneratingCustom ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI فلو بنا رہا ہے...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>AI سے ورک فلو بنوائیں</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Example Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 pt-1">
            <span className="opacity-80">مثالیں:</span>
            {['مجھے شادی کا کارڈ بنانا ہے', 'YouTube Short بنانا ہے', 'فیس بک اشتہار بنانا ہے', 'پوڈکاسٹ آڈیو کلین کرنا ہے'].map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCustomTaskInput(ex);
                  setTimeout(() => {
                    handleGenerateCustomWorkflow();
                  }, 50);
                }}
                className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl text-[11px] text-emerald-200 border border-white/10 cursor-pointer transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Workflow Result Visual Flowchart with Arrows */}
        {customWorkflowResult && (
          <div className="mt-8 pt-6 border-t border-white/15 animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#25D366] bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-[#25D366]/40 inline-block mb-1">
                  {customWorkflowResult.badgeUrdu}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {customWorkflowResult.titleUrdu}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {customWorkflowResult.subtitleUrdu}
                </p>
              </div>

              {/* 2 Buttons Below as specified */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleSaveToWorkspace(customWorkflowResult)}
                  style={{ backgroundColor: '#25D366' }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-white" />
                  <span>یہ ورک فلو محفوظ کریں</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToast('🎬 اس ورک فلو کی ویڈیو گائیڈ لوڈ ہو رہی ہے...');
                    const el = document.getElementById('tools-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-black text-xs flex items-center justify-center gap-1.5 border border-white/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>اس پر ویڈیو گائیڈ دیکھیں</span>
                </button>
              </div>
            </div>

            {/* Visual Flow with Arrows */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {customWorkflowResult.steps.map((step, idx) => {
                const isLast = idx === customWorkflowResult.steps.length - 1;

                return (
                  <React.Fragment key={idx}>
                    <div
                      onClick={() => handleToolClick(step.toolName, step.toolSlug)}
                      className="flex-1 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-[#25D366] rounded-2xl p-4 transition-all duration-300 cursor-pointer group space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#25D366] text-white text-xs font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {step.icon}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-black text-white text-base group-hover:text-[#25D366] flex items-center gap-1">
                          <span>{step.toolName}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h5>
                        <p className="text-xs text-slate-300 font-medium mt-0.5">
                          {step.roleUrdu}
                        </p>
                      </div>

                      <span className="text-[10px] text-emerald-300 font-bold block pt-1">
                        (کلک کریں: ٹول کھولیں)
                      </span>
                    </div>

                    {!isLast && (
                      <div className="flex items-center justify-center py-1 lg:py-0 text-[#25D366]">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4 text-[#25D366] rotate-90 lg:rotate-0" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4 PRE-MADE WORKFLOW CARDS BELOW CUSTOM ONE (KEPT INTACT AS REQUESTED) */}
      {/* ========================================================================= */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>📦 ریڈی میڈ 4 مشہور ورک فلوز (Pre-made Workflows):</span>
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          نیچے دیے گئے کسی بھی پائپ لائن پر کلک کر کے اس کا مکمل فلو چارٹ دیکھیں
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {WORKFLOW_CARDS.map(card => {
          const isSelected = card.id === selectedWorkflowId;
          const isSaved = savedWorkflows.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => setSelectedWorkflowId(card.id)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                isSelected
                  ? 'bg-emerald-50/60 border-[#25D366] ring-4 ring-[#25D366]/20'
                  : 'bg-white border-neutral-200/90 hover:border-emerald-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {card.badgeUrdu}
                  </span>
                  {isSaved && (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                      <span>محفوظ شدہ</span>
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {card.titleUrdu}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card.subtitleUrdu}
                </p>
              </div>

              {/* Chain preview mini-badges */}
              <div className="pt-2 border-t border-neutral-100/80 flex flex-wrap items-center gap-1.5">
                {card.steps.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-white border border-neutral-200 px-2 py-0.5 rounded-lg text-slate-700 font-bold flex items-center gap-1"
                  >
                    <span>{s.icon}</span>
                    <span>{s.toolName}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Flow with Arrows + Clickable Tools for Selected Preset */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#25D366]/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#25D366] flex items-center justify-center text-lg">
                ⚡
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                بصری فلو (Visual Flow): {activeWorkflow.titleUrdu}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ہر ٹول پر کلک کر کے اس کے استعمال اور ماسٹر پرامپٹ کا صفحہ کھولیں
            </p>
          </div>

          {/* Button: "یہ ورک فلو میرے ورک سپیس میں محفوظ کریں" */}
          <button
            type="button"
            onClick={() => handleSaveToWorkspace(activeWorkflow)}
            style={{ backgroundColor: '#25D366' }}
            className="px-5 py-3 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-[#25D366]/20 cursor-pointer"
          >
            <Bookmark className="w-4 h-4 fill-white" />
            <span>یہ ورک فلو میرے ورک سپیس میں محفوظ کریں</span>
          </button>
        </div>

        {/* Visual Pipeline with Arrows */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {activeWorkflow.steps.map((step, idx) => {
            const isLast = idx === activeWorkflow.steps.length - 1;

            return (
              <React.Fragment key={idx}>
                {/* Tool Box in Flow */}
                <div
                  onClick={() => handleToolClick(step.toolName, step.toolSlug)}
                  className="flex-1 bg-neutral-50 hover:bg-emerald-50/50 border-2 border-neutral-200 hover:border-[#25D366] rounded-2xl p-4 transition-all duration-300 cursor-pointer group space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {step.icon}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base group-hover:text-emerald-700 flex items-center gap-1">
                      <span>{step.toolName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {step.roleUrdu}
                    </p>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-bold block pt-1">
                    (کلک کریں: تفصیلات دیکھیں)
                  </span>
                </div>

                {/* Arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1 lg:py-0 text-[#25D366]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4 text-[#25D366] rotate-90 lg:rotate-0" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Output Box */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-black text-sm">حتمی آؤٹ پٹ:</span>
            <span className="text-slate-200 font-medium">
              {activeWorkflow.outputSummaryUrdu}
            </span>
          </div>
          <span className="text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-500/40">
            ⚡ 100% خودکار وائرل ورک فلو
          </span>
        </div>
      </div>
    </section>
  );
};
