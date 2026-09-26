import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Trash2, CheckCircle2, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';

interface SubmittedTool {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  categoryName: string;
  descriptionUrdu: string;
  pricing: 'Free' | 'Paid' | 'Freemium';
  logoUrl?: string;
  whatsappNumber: string;
  submittedAt: string;
}

interface AdminSubmittedToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const AdminSubmittedToolsModal: React.FC<AdminSubmittedToolsModalProps> = ({
  isOpen,
  onClose,
  onToast
}) => {
  const [tools, setTools] = useState<SubmittedTool[]>([]);

  const loadTools = () => {
    try {
      const stored = localStorage.getItem('submittedTools');
      if (stored) {
        setTools(JSON.parse(stored));
      } else {
        setTools([]);
      }
    } catch {
      setTools([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTools();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    const next = tools.filter(t => t.id !== id);
    setTools(next);
    localStorage.setItem('submittedTools', JSON.stringify(next));
    onToast('ٹول لسٹ سے ہٹا دیا گیا');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in font-urdu" dir="rtl">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 space-y-4 text-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              👑
            </span>
            <div>
              <h3 className="font-black text-slate-900 text-lg">
                ایڈمن ویو: جمع کروائے گئے AI ٹولز ({tools.length})
              </h3>
              <p className="text-xs text-slate-500">
                طائف بھائی، یہاں آپ کو صارفین کے بھیجے ہوئے تمام نئے ٹولز نظر آئیں گے
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {tools.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <p className="text-sm font-bold">ابھی تک کوئی نیا ٹول جمع نہیں کروایا گیا۔</p>
            <p className="text-xs">صارفین کے ٹول جمع کرواتے ہی وہ یہاں خودکار طور پر آ جائیں گے۔</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tools.map(tool => (
              <div
                key={tool.id}
                className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50 space-y-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-base">
                        {tool.name}
                      </h4>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {tool.pricing}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                        {tool.categoryName}
                      </span>
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-0.5 font-mono"
                      dir="ltr"
                    >
                      <span>{tool.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(tool.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="ڈیلیٹ کریں"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {tool.descriptionUrdu}
                </p>

                <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="font-mono font-bold text-slate-800">{tool.whatsappNumber}</span>
                    <a
                      href={`https://wa.me/${tool.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-700 hover:underline font-bold"
                    >
                      (چیٹ کھولیں)
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400">{tool.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
