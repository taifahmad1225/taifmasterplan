import React from 'react';
import { X, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WhatsAppSuccessModalProps {
  phoneNumber: string;
  onClose: () => void;
}

export const WhatsAppSuccessModal: React.FC<WhatsAppSuccessModalProps> = ({
  phoneNumber,
  onClose,
}) => {
  const handleOpenWhatsAppGroup = () => {
    // Open simulated community link
    window.open('https://chat.whatsapp.com/invite/aimasterpk-official-daily', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-200 text-right p-6 sm:p-7 space-y-5"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <span className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#25D366] flex items-center justify-center">
            <MessageCircle className="w-7 h-7 fill-[#25D366] text-white" />
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>مبارک ہو! آپ کا نمبر رجسٹر ہو گیا ہے</span>
          </div>
          <h3 className="font-bold text-slate-900 text-xl">
            AI Master واٹس ایپ براڈکاسٹ لسٹ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            آپ کے نمبر <strong className="text-slate-900 font-mono dir-ltr inline-block">{phoneNumber}</strong> پر روزانہ صبح 10 بجے ایک نیا 100% مفید AI ٹول، ڈاؤنلوڈ لنک اور ماسٹر پرامپٹ بھیجا جائے گا۔
          </p>
        </div>

        <div className="bg-[#E6F4EA] border border-[#25D366]/40 rounded-2xl p-4 space-y-2 text-xs text-slate-800">
          <div className="font-bold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            VIP فوری رسائی:
          </div>
          <p>
            انتظار نہ کریں! آپ ابھی ہمارے آفیشل واٹس ایپ چینل یا گروپ میں شامل ہو سکتے ہیں جہاں 50,000+ پاکستانی پہلے سے موجود ہیں۔
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>آپ کا ڈیٹا 100% محفوظ ہے۔ کوئی فالتو اسپیم پیغامات نہیں بھیجے جائیں گے۔</span>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleOpenWhatsAppGroup}
            className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>ابھی واٹس ایپ گروپ جوائن کریں</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            ٹھیک ہے، شکریہ!
          </button>
        </div>
      </div>
    </div>
  );
};
