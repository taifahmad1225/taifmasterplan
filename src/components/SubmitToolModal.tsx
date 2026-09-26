import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Share2, Globe, Tag, Phone, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/categoriesData';

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

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen,
  onClose,
  onToast
}) => {
  const [toolName, setToolName] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0]?.id || 'writing');
  const [descriptionUrdu, setDescriptionUrdu] = useState('');
  const [pricing, setPricing] = useState<'Free' | 'Paid' | 'Freemium'>('Free');
  const [logoUrl, setLogoUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!toolName.trim() || !toolUrl.trim() || !descriptionUrdu.trim() || !whatsappNumber.trim()) {
      onToast('براہ کرم تمام لازمی خانے پر کریں');
      return;
    }

    const selectedCategory = CATEGORIES.find(c => c.id === categoryId);

    const newSubmission: SubmittedTool = {
      id: `sub-${Date.now()}`,
      name: toolName.trim(),
      url: toolUrl.trim(),
      categoryId,
      categoryName: selectedCategory?.nameUrdu || categoryId,
      descriptionUrdu: descriptionUrdu.trim(),
      pricing,
      logoUrl: logoUrl.trim() || undefined,
      whatsappNumber: whatsappNumber.trim(),
      submittedAt: new Date().toLocaleString('ur-PK')
    };

    try {
      const existing = localStorage.getItem('submittedTools');
      const list: SubmittedTool[] = existing ? JSON.parse(existing) : [];
      list.unshift(newSubmission);
      localStorage.setItem('submittedTools', JSON.stringify(list));
    } catch {
      // ignore
    }

    setIsSuccess(true);
    onToast('ٹول کامیابی سے جمع ہو گیا! 🚀');
  };

  const handleShareOnWhatsApp = () => {
    const text = `السلام علیکم طائف بھائی! میں نے AI Master.pk پر اپنا نیا AI ٹول جمع کروایا ہے:\n\nنام: ${toolName}\nلنک: ${toolUrl}\nکیٹیگری: ${CATEGORIES.find(c => c.id === categoryId)?.nameUrdu}\nقیمت: ${pricing}\nتفصیل: ${descriptionUrdu}\nمیرا واٹس ایپ: ${whatsappNumber}\n\nبراہ کرم اس کا جائزہ لے کر شامل فرمائیں۔`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setToolName('');
    setToolUrl('');
    setDescriptionUrdu('');
    setLogoUrl('');
    setWhatsappNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 text-right p-6 sm:p-7 space-y-5 font-urdu"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                ➕ اپنا AI ٹول جمع کروائیں
              </h3>
              <p className="text-xs text-slate-500">
                اپنا ٹول پاکستان کے سب سے بڑے AI پورٹل پر 24 گھنٹے میں لائیو کروائیں
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900">
                شکریہ طائف بھائی! 🙏
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed max-w-md mx-auto font-medium">
                ہم آپ کے ٹول کا جائزہ لے کر 24 گھنٹے میں شامل کر دیں گے۔ آپ کو واٹس ایپ پر اطلاع مل جائے گی۔
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-right text-xs space-y-1">
              <p className="font-bold text-emerald-950">ٹول کی تفصیلات:</p>
              <p className="text-slate-700">نام: <strong className="text-slate-900">{toolName}</strong></p>
              <p className="text-slate-700">لنک: <span className="font-mono text-emerald-800">{toolUrl}</span></p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleShareOnWhatsApp}
                style={{ backgroundColor: '#25D366' }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>واٹس ایپ پر مطلع کریں (Send on WhatsApp)</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        ) : (
          /* Tool Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Tool Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>ٹول کا نام (Tool Name) *</span>
              </label>
              <input
                type="text"
                required
                value={toolName}
                onChange={e => setToolName(e.target.value)}
                placeholder="مثلاً: اردو رائٹر AI یا ThumbnailPro"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
              />
            </div>

            {/* Field 2: Tool Website Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>ویب سائٹ لنک (Tool Website URL) *</span>
              </label>
              <input
                type="url"
                required
                value={toolUrl}
                onChange={e => setToolUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-mono text-left"
                dir="ltr"
              />
            </div>

            {/* Field 3: Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>کیٹیگری منتخب کریں (Category) *</span>
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm text-slate-900 focus:outline-hidden bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameUrdu} ({cat.nameEnglish})
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Tool کیا کرتا ہے؟ */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>ٹول کیا کرتا ہے؟ (1 لائن اردو میں) *</span>
              </label>
              <textarea
                required
                rows={2}
                value={descriptionUrdu}
                onChange={e => setDescriptionUrdu(e.target.value)}
                placeholder="مثلاً: یہ ٹول چند سیکنڈز میں وائرل یوٹیوب تھمب نیلز اور پوسٹرز ڈیزائن کرتا ہے۔"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
              />
            </div>

            {/* Field 5: Pricing */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>قیمت کا ماڈل (Pricing) *</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Free', 'Freemium', 'Paid'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPricing(p)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      pricing === p
                        ? 'bg-[#25D366] text-white border-[#25D366] shadow-xs'
                        : 'bg-neutral-50 text-slate-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {p === 'Free' ? 'مفت (Free)' : p === 'Freemium' ? 'فری میم (Freemium)' : 'پیڈ (Paid)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 6: Logo URL (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>ٹول کا لوگو یا تصویر کا لنک (اختیاری)</span>
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={e => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-mono text-left"
                dir="ltr"
              />
            </div>

            {/* Field 7: WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>آپ کا واٹس ایپ نمبر (WhatsApp Number) *</span>
              </label>
              <input
                type="tel"
                required
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="03001234567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-mono text-left"
                dir="ltr"
              />
              <p className="text-[11px] text-slate-400">
                ہم آپ کو ٹول لائیو ہونے پر اسی نمبر پر مطلع کریں گے۔
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                style={{ backgroundColor: '#25D366' }}
                className="w-full py-3.5 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-98 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>🚀 ٹول جمع کروائیں (Submit Tool)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
