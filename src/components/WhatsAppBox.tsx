import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Send, ShieldCheck } from 'lucide-react';

interface WhatsAppBoxProps {
  lang: 'ur' | 'en';
  onJoinSuccess: (phone: string) => void;
  onToast: (msg: string) => void;
}

export const WhatsAppBox: React.FC<WhatsAppBoxProps> = ({ lang, onJoinSuccess, onToast }) => {
  const isUrdu = lang === 'ur';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Backend: Connect this to WhatsApp Channel API - AI Master - روز 1 نیا AI
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.trim();

    if (!cleanNumber) {
      setErrorMsg('براہ کرم اپنا درست واٹس ایپ نمبر درج کریں (03XX-XXXXXXX)');
      setSuccessMsg('');
      return;
    }

    // Pakistani numbers check
    const digitsOnly = cleanNumber.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setErrorMsg('نمبر کے ہندسے نامکمل ہیں (مثال: 0300-1234567)');
      setSuccessMsg('');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Save number in localStorage as required by Feature #17
      try {
        const existing = JSON.parse(localStorage.getItem('aimaster_whatsapp_subscribers') || '[]');
        if (!existing.includes(cleanNumber)) {
          existing.push(cleanNumber);
          localStorage.setItem('aimaster_whatsapp_subscribers', JSON.stringify(existing));
        }
      } catch (err) {
        console.error('LocalStorage write error', err);
      }

      // Exact success toast as requested:
      const toastText = 'مبارک ہو! آپ AI Master خاندان میں شامل ہو گئے۔ روز صبح 9 بجے ٹول ملے گا۔';
      setSuccessMsg(toastText);
      onToast(toastText);
      onJoinSuccess(cleanNumber);
      setPhoneNumber('');
    }, 300);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-6" dir="rtl">
      {/* 
        Exact requested colors:
        Box color #25D366
      */}
      <div 
        className="rounded-3xl p-5 sm:p-7 transition-all shadow-md hover:shadow-lg relative overflow-hidden"
        style={{
          backgroundColor: '#E6F4EA',
          borderColor: '#25D366',
          borderWidth: '2.5px',
          borderStyle: 'solid'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          
          {/* Right Column: Text: "📱 روزانہ 1 نیا AI ٹول واٹس ایپ پر حاصل کریں" */}
          <div className="text-right space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </span>
              <span className="text-xs font-bold text-[#075E54] bg-white/80 px-2.5 py-0.5 rounded-full">
                50,000+ پاکستانی طلباء و فری لانسرز
              </span>
            </div>

            {/* Exactly requested Title */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              📱 روزانہ 1 نیا AI ٹول واٹس ایپ پر حاصل کریں
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              روزانہ صبح 9 بجے مفت AI ٹول، اردو ویڈیو ٹیوٹوریل اور ماسٹر پرامپٹ سیدھا آپ کے واٹس ایپ پر۔
            </p>
          </div>

          {/* Left Column: Input [ اپنا واٹس ایپ نمبر لکھیں - 03XX-XXXXXXX ] [ جوائن کریں - مفت ] */}
          <div className="w-full md:w-auto shrink-0 max-w-md">
            <form onSubmit={handleJoin} className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full sm:w-72">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errorMsg) setErrorMsg('');
                    if (successMsg) setSuccessMsg('');
                  }}
                  placeholder="اپنا واٹس ایپ نمبر لکھیں - 03XX-XXXXXXX"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-neutral-300 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#25D366] shadow-xs text-right"
                  dir="rtl"
                />
              </div>

              {/* Button: [ جوائن کریں - مفت ] */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: '#25D366'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1EBE5D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
              >
                {isLoading ? (
                  <span>شامل ہو رہے ہیں...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 rotate-180" />
                    <span>جوائن کریں - مفت</span>
                  </>
                )}
              </button>
            </form>

            {/* Validation Error */}
            {errorMsg && (
              <p className="text-xs text-rose-600 font-semibold mt-1.5 text-right">
                {errorMsg}
              </p>
            )}

            {/* Success Message in Green */}
            {successMsg && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 rounded-xl px-3 py-2 mt-2 shadow-xs text-right justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-600 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>100% پرائیویسی تحفظ · کوئی فالتو اسپیم نہیں</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
