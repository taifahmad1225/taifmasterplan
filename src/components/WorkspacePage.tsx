import React, { useState } from 'react';
import {
  Heart,
  Layers,
  Award,
  Download,
  Trash2,
  ExternalLink,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface WorkspacePageProps {
  savedTools: ToolItem[];
  savedWorkflows: Array<{
    id: string;
    titleUrdu: string;
    subtitleUrdu: string;
    stepsCount: number;
    date: string;
  }>;
  onRemoveTool: (toolId: string) => void;
  onOpenToolDetail: (tool: ToolItem) => void;
  onOpenReportCard: () => void;
  onNavigateHome: () => void;
  onToast: (msg: string) => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  savedTools,
  savedWorkflows,
  onRemoveTool,
  onOpenToolDetail,
  onOpenReportCard,
  onNavigateHome,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'workflows' | 'report'>('tools');

  // Export all saved data to JSON/CSV text file
  const handleExportAll = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      savedToolsCount: savedTools.length,
      savedTools: savedTools.map(t => ({
        id: t.id,
        name: t.name,
        category: t.categoryUrdu,
        pricePKR: t.pricePKR,
        toolUrl: t.toolUrl,
        promptTemplate: t.promptTemplate
      })),
      savedWorkflows: savedWorkflows
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIMaster-Workspace-Export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onToast('✅ تمام محفوظ ڈیٹا JSON فائل میں ایکسپورٹ ہو گیا!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu" dir="rtl">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 cursor-pointer"
        >
          <span>← ہوم پیج پر واپس جائیں</span>
        </button>

        <button
          onClick={handleExportAll}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-xl border border-neutral-300 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>سب کو ایکسپورٹ کریں (JSON)</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-bold border border-rose-300">
          <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
          <span>میرا ورک اسپیس ❤️</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          میرا ذاتی AI ڈیش بورڈ اور ورک اسپیس
        </h1>

        <p className="text-xs sm:text-base text-slate-600 font-medium">
          آپ کے تمام بک مارک کیے گئے ٹولز، کسٹم ورک فلوز اور سیکھنے کی رپورٹ ایک جگہ
        </p>

        {/* 3 Tabs: [محفوظ شدہ ٹولز] [میرے ورک فلوز] [میری رپورٹ] */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('tools')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'tools'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            ❤️ محفوظ شدہ ٹولز ({savedTools.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('workflows')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'workflows'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            ⚡ میرے ورک فلوز ({savedWorkflows.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === 'report'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#25D366]/40'
                : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            📊 میری رپورٹ اور پروگریس
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SAVED TOOLS */}
      {/* ========================================================================= */}
      {activeTab === 'tools' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center justify-between">
            <span>آپ نے {savedTools.length} ٹولز محفوظ کیے ہیں</span>
            <span className="text-xs text-slate-500 font-normal">تمام ڈیٹا آپ کے براؤزر کے لوکل اسٹوریج میں محفوظ ہے</span>
          </div>

          {savedTools.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-neutral-200 space-y-3">
              <span className="text-4xl">💔</span>
              <h3 className="font-black text-slate-800 text-lg">
                ابھی تک کوئی ٹول محفوظ نہیں کیا گیا
              </h3>
              <p className="text-xs text-slate-500">
                پورٹل پر کسی بھی ٹول کے دل (❤️) کے نشان پر کلک کر کے اسے اپنے ورک اسپیس میں لائیں
              </p>
              <button
                onClick={onNavigateHome}
                style={{ backgroundColor: '#25D366' }}
                className="px-5 py-2.5 rounded-xl text-white font-black text-xs cursor-pointer shadow-md inline-block mt-2"
              >
                ٹولز دیکھیں
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTools.map(tool => (
                <div
                  key={tool.id}
                  className="p-5 rounded-3xl bg-white border-2 border-neutral-200 hover:border-[#25D366] transition-all flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        {tool.categoryUrdu}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveTool(tool.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="ورک اسپیس سے ہٹائیں"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-black text-slate-900 text-lg">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {tool.urduName} · <strong className="text-emerald-700">{tool.pricePKR}</strong>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {tool.taglineUrdu}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onOpenToolDetail(tool)}
                      className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>تفصیلات دیکھیں</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={tool.toolUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ backgroundColor: '#25D366' }}
                      className="px-3 py-1.5 rounded-xl text-white font-bold text-xs hover:brightness-105 cursor-pointer shadow-xs"
                    >
                      ٹول کھولیں ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MY WORKFLOWS */}
      {/* ========================================================================= */}
      {activeTab === 'workflows' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold text-sm flex items-center justify-between">
            <span>آپ نے {savedWorkflows.length} ورک فلوز اپنے پاس محفوظ کیے ہیں</span>
            <span className="text-xs text-slate-500">خودکار ترتیب اور ٹولز چین</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedWorkflows.map(wf => (
              <div
                key={wf.id}
                className="p-5 rounded-3xl bg-white border-2 border-neutral-200 flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                      محفوظ شدہ ورک فلو
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {wf.date}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg">
                    {wf.titleUrdu}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {wf.subtitleUrdu}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold">
                    {wf.stepsCount} خودکار مراحل
                  </span>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                  >
                    بلڈر میں کھولیں ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MY REPORT */}
      {/* ========================================================================= */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                میری AI لرننگ اور ایکسپرٹ رپورٹ
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                رپورٹ کارڈ جنریٹر کے ذریعے سوشل میڈیا شیئر ایبل امیج حاصل کریں
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenReportCard}
              style={{ backgroundColor: '#25D366' }}
              className="px-5 py-2.5 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>مکمل رپورٹ کارڈ دیکھیں اور ڈاؤنلوڈ کریں</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1">
              <span className="text-slate-500 text-xs">محفوظ ٹولز کی تعداد</span>
              <div className="text-3xl font-black text-emerald-700 font-mono">
                {savedTools.length}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1">
              <span className="text-slate-500 text-xs">AI ایکسپرٹ پروگریس</span>
              <div className="text-3xl font-black text-[#128C7E] font-mono">
                {Math.min(95, Math.max(15, savedTools.length * 10))}%
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1">
              <span className="text-slate-500 text-xs">سرٹیفکیٹ کی اہلیت</span>
              <div className="text-lg font-black text-emerald-800 pt-1">
                اہل (Eligible) ✅
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
