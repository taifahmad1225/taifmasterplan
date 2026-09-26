import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Share2, CheckCircle, ArrowRight, Stethoscope } from 'lucide-react';
import { DoctorDiagnosis } from '../data/aiDoctorData';

interface AiDoctorModalProps {
  diagnosis: DoctorDiagnosis | null;
  lang?: 'ur' | 'en';
  onClose: () => void;
  onToast: (msg: string) => void;
  onSelectToolName?: (toolName: string) => void;
}

export const AiDoctorModal: React.FC<AiDoctorModalProps> = ({
  diagnosis,
  lang = 'ur',
  onClose,
  onToast,
  onSelectToolName
}) => {
  const isUrdu = lang === 'ur';
  const [copied, setCopied] = useState(false);

  if (!diagnosis) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(diagnosis.masterPromptUrdu);
    setCopied(true);
    onToast(isUrdu ? 'AI ڈاکٹر کا نسخہ پرامپٹ کاپی ہو گیا! 📋' : 'Doctor prescription prompt copied! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🏥 AI ڈاکٹر کا نسخہ: ${diagnosis.problemTitleUrdu}\n\n تجویز کردہ AI ٹولز: ${diagnosis.recommendedToolNames.join(', ')}\n متوقع خرچ: ${diagnosis.estimatedCostPKR}\n\nمزید معلومات دیکھیں: https://aimaster.pk`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200/90 p-6 sm:p-8 space-y-6 ${
          isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
        }`}
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        {/* Top Header - Prescription Style */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl">
                  {isUrdu ? 'AI ڈاکٹر کا نسخہ' : 'AI Doctor Prescription'}
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                  {diagnosis.urgencyLevelUrdu}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isUrdu ? 'مریض کا مسئلہ:' : 'Diagnosed Challenge:'}{' '}
                <strong className="text-slate-800">{diagnosis.problemTitleUrdu}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Diagnosis Body */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-2 text-slate-800">
          <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {isUrdu ? 'ڈاکٹر کی باقاعدہ تشخیص اور خلاصہ:' : 'Doctor Official Diagnosis:'}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
            {diagnosis.doctorPrescriptionUrdu}
          </p>
          <div className="pt-2 text-xs text-emerald-800 font-semibold">
            {isUrdu ? 'متوقع لاگت:' : 'Estimated Cost:'}{' '}
            <span className="text-slate-900 font-bold">{diagnosis.estimatedCostPKR}</span>
          </div>
        </div>

        {/* Recommended Tools Badges */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3">
            {isUrdu ? 'تجویز کردہ ٹاپ 3 ادویات (AI ٹولز):' : 'Recommended Top 3 Remedies (AI Tools):'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {diagnosis.recommendedToolNames.map((toolName, idx) => (
              <div
                key={idx}
                className={`p-3 bg-neutral-50 hover:bg-emerald-50/50 border border-neutral-200 hover:border-emerald-300 rounded-xl transition-all flex flex-col justify-between ${
                  isUrdu ? 'text-right' : 'text-left'
                }`}
              >
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  {idx + 1}. {toolName}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  {isUrdu ? '100% تجویز شدہ' : '100% Recommended'}
                </div>
                {onSelectToolName && (
                  <button
                    onClick={() => {
                      onSelectToolName(toolName);
                      onClose();
                    }}
                    className="mt-2 text-[11px] text-slate-600 hover:text-slate-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isUrdu ? 'تفصیلات دیکھیں' : 'View Tool'}</span>
                    <ArrowRight className={`w-3 h-3 ${isUrdu ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Master Prompt Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">
              {isUrdu ? 'نسخہ پرامپٹ (Master Prompt):' : 'Prescription Master Prompt:'}
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (isUrdu ? 'کاپی ہو گیا' : 'Copied') : (isUrdu ? 'پرامپٹ کاپی کریں' : 'Copy Prompt')}
            </button>
          </div>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed selection:bg-emerald-600 selection:text-white">
            {diagnosis.masterPromptUrdu}
          </div>
        </div>

        {/* 4 Action Steps */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-2.5">
            {isUrdu ? 'مرحلہ وار علاج اور عملدرآمد:' : 'Action Plan & Execution Steps:'}
          </h4>
          <div className="space-y-2">
            {diagnosis.actionStepsUrdu.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-neutral-50/80 p-2.5 rounded-xl border border-neutral-200/60"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-neutral-100">
          <button
            onClick={handleCopyPrompt}
            className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{isUrdu ? 'پرامپٹ کاپی ہو چکا ہے' : 'Prompt Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isUrdu ? 'نسخہ پرامپٹ کاپی کریں' : 'Copy Prescription Prompt'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#25D366]/20 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'واٹس ایپ پر نسخہ شیئر کریں' : 'Share on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
