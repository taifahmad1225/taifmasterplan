import React, { useState } from 'react';
import { Coins, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

interface EarningCalculatorProps {
  lang: 'ur' | 'en';
}

export const EarningCalculator: React.FC<EarningCalculatorProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // Label 1: "Fiverr پر 1 آرڈر کا ریٹ (PKR)" -> Default 5000
  const [ratePerOrder, setRatePerOrder] = useState<number>(5000);

  // Label 2: "مہینے میں کتنے آرڈر لیں گے؟" -> Default 10, with slider 1-30
  const [ordersPerMonth, setOrdersPerMonth] = useState<number>(10);

  // Output: مہینے کی متوقع کمائی: PKR 50,000
  const expectedMonthlyEarning = ratePerOrder * ordersPerMonth;

  return (
    <section
      id="earning-calculator-section"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 my-8 font-urdu"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#25D366]/40 relative overflow-hidden space-y-8">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#128C7E]" />

        {/* Section Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#128C7E] text-xs font-bold border border-emerald-300">
            <Coins className="w-4 h-4 text-[#25D366]" />
            <span>Fiverr کمائی کیلکولیٹر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            💰 اس ٹول سے آپ کتنا کما سکتے ہیں؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Fiverr اور لوکل کلائنٹس سے آمدنی کا آسان اور شفاف تخمینہ
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90">
          
          {/* Label 1: "Fiverr پر 1 آرڈر کا ریٹ (PKR)" -> Default 5000 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 text-sm">
                Fiverr پر 1 آرڈر کا ریٹ (PKR)
              </label>
              <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                ڈیفالٹ: 5,000
              </span>
            </div>

            <div className="relative">
              <span className="absolute right-3.5 top-3 text-slate-400 font-bold text-xs">
                PKR
              </span>
              <input
                type="number"
                min="500"
                max="50000"
                step="500"
                value={ratePerOrder}
                onChange={(e) => setRatePerOrder(Math.max(0, Number(e.target.value)))}
                className="w-full py-2.5 pr-14 pl-4 rounded-xl bg-white border border-neutral-300 font-mono font-black text-slate-900 text-base focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 shadow-2xs"
                dir="ltr"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              لوگو، تھمب نیل یا وائس اوور کا اوسط مارکیٹ ریٹ 5,000 روپے ہے
            </p>
          </div>

          {/* Label 2: "مہینے میں کتنے آرڈر لیں گے؟" -> Default 10, with slider 1-30 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 text-sm">
                مہینے میں کتنے آرڈر لیں گے؟
              </label>
              <span className="font-mono font-black text-sm text-[#128C7E] bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                {ordersPerMonth} آرڈرز
              </span>
            </div>

            <div className="pt-2">
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={ordersPerMonth}
                onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
                className="w-full accent-[#25D366] cursor-pointer h-2.5 bg-neutral-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 font-bold mt-1">
                <span>1 آرڈر</span>
                <span>10 آرڈرز</span>
                <span>20 آرڈرز</span>
                <span>30 آرڈرز</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              سلائیڈر کو آگے پیچھے کر کے اپنا ماہانہ ہدف سیٹ کریں
            </p>
          </div>

        </div>

        {/* Output big: "مہینے کی متوقع کمائی: PKR 50,000" */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 sm:p-8 border-2 border-[#25D366] text-center space-y-3 shadow-md">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#128C7E] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#25D366]" />
            <span>حتمی تخمینہ</span>
          </div>

          <div className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            مہینے کی متوقع کمائی:{' '}
            <span className="text-[#128C7E] font-mono font-black">
              PKR {expectedMonthlyEarning.toLocaleString()}
            </span>
          </div>

          {/* Below show small text */}
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto leading-relaxed pt-1">
            یہ حساب Fiverr کے اوسط ریٹ کے مطابق ہے، آپ زیادہ بھی کما سکتے ہیں
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-emerald-100 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              <span>فائور، اپ ورک اور لوکل دکانوں کے لیے یکساں مؤثر</span>
            </span>
            <span>·</span>
            <span className="text-slate-700 font-bold font-mono">
              حساب: {ratePerOrder.toLocaleString()} ریٹ × {ordersPerMonth} آرڈر
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
