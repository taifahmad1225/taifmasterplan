import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Send, ExternalLink } from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface PromptModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onOpenVoicePrompt?: (tool: ToolItem) => void;
  onToast: (msg: string) => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ tool, onClose, onOpenVoicePrompt, onToast }) => {
  const [copied, setCopied] = useState(false);

  if (!tool) return null;

  const handleCopy = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200/80 text-right p-6 sm:p-7 space-y-5"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                تیار شدہ اردو پرامپٹ ({tool.urduName})
              </h3>
              <p className="text-xs text-slate-500">
                100% ٹیسٹ شدہ پرامپٹ برائے بہترین نتائج
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>نیچے دیے گئے پرامپٹ کو کاپی کریں:</span>
            <span className="text-emerald-700 font-medium">اردو و انگلش کمپیٹیبل</span>
          </div>

          <div className="p-4 sm:p-5 bg-slate-900 text-slate-100 rounded-2xl text-sm sm:text-base font-mono relative leading-relaxed border border-slate-800 selection:bg-emerald-600 selection:text-white">
            <p className="whitespace-pre-wrap select-all font-sans">
              {tool.promptTemplate}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            💡 پرامپٹ استعمال کرنے کا طریقہ:
          </p>
          <p>
            1. نیچے کاپی کا بٹن دبائیں۔
          </p>
          <p>
            2. بریکٹ <span className="font-mono font-semibold">[ ... ]</span> میں اپنی تفصیل یا برانڈ کا نام لکھیں۔
          </p>
          <p>
            3. ChatGPT، Claude یا Midjourney میں پیسٹ کر کے Enter دبا دیں۔
          </p>
        </div>

        {/* Action Buttons: Button 1 and Button 2 */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {/* Button 1: Style: background #25D366 green, color white, padding 12px 20px, border-radius 8px, font Noto Nastaliq Urdu */}
          <button
            type="button"
            onClick={handleCopy}
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
    </div>
  );
};
