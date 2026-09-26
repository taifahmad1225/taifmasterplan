import React, { useState } from 'react';
import { X, Play, Pause, CheckCircle2, Share2, Volume2, Maximize2, Sparkles, Clock, Eye } from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface VideoModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onOpenPrompt: (tool: ToolItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ tool, onClose, onOpenPrompt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!tool) return null;

  const toggleStep = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200/80 text-right overflow-hidden flex flex-col"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Play className="w-4 h-4 fill-emerald-600" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-relaxed">
                {tool.videoTutorial.title}
              </h3>
              <p className="text-xs text-slate-500">
                {tool.urduName} · {tool.videoTutorial.instructorUrdu}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div className="relative bg-slate-950 aspect-video flex items-center justify-center overflow-hidden group">
          {/* Simulated Video Screen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/40" />

          {/* Animated Glow/Elements */}
          <div className="relative z-10 text-center p-6 max-w-md">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
              )}
            </button>
            <p className="text-white font-medium text-sm sm:text-base">
              {isPlaying ? 'ویڈیو ٹیوٹوریل چل رہا ہے...' : 'اردو میں ویڈیو گائیڈ دیکھنے کے لیے کلک کریں'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              اسپیشل پاکستانی رہنمائی · فری لانسنگ اور سائیڈ انکم ٹپس
            </p>
          </div>

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                {tool.videoTutorial.duration}
              </span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Eye className="w-3.5 h-3.5" />
                {tool.videoTutorial.views}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-slate-300" />
              <Maximize2 className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1">
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-800 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>قیمت: {tool.pricePKR}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenPrompt(tool)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm"
              >
                کاپی ماسٹر پرامپٹ 📋
              </button>
              <a
                href={tool.toolUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-white hover:bg-emerald-100/70 border border-emerald-300 rounded-xl transition-all"
              >
                ٹول کھولیں ↗
              </a>
            </div>
          </div>

          {/* Video Chapters / Steps */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">
              ویڈیو کے اہم مراحل اور اسباق (کلک کر کے ٹک کریں):
            </h4>
            <div className="space-y-2.5">
              {tool.videoTutorial.stepsUrdu.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full flex items-start gap-3 p-3 text-right rounded-xl border transition-all text-xs sm:text-sm ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                        : 'bg-neutral-50/60 border-neutral-200/80 hover:bg-white text-slate-800'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                        isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                      }`}
                    />
                    <span className={isDone ? 'line-through text-slate-400' : ''}>
                      {idx + 1}. {step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructor & Share */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-slate-500">
            <span>اردو استاد: {tool.videoTutorial.instructorUrdu}</span>
            <button
              onClick={() => {
                const shareText = `AI Master.pk پر ${tool.urduName} کا اردو ویڈیو ٹیوٹوریل دیکھیں: https://aimaster.pk`;
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
              }}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              واٹس ایپ پر شیئر کریں
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
