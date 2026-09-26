import React, { useRef, useEffect } from 'react';
import {
  X,
  Award,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitleUrdu: string;
  userName?: string;
  onToast: (msg: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  courseTitleUrdu,
  userName = 'محمد بلال',
  onToast
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCertificate = (name: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 900 x 600
    canvas.width = 900;
    canvas.height = 600;

    // Background gradient (Luxury Cream / Gold & Emerald)
    const bgGrad = ctx.createLinearGradient(0, 0, 900, 600);
    bgGrad.addColorStop(0, '#064e3b'); // emerald-900
    bgGrad.addColorStop(0.5, '#022c22'); // emerald-950
    bgGrad.addColorStop(1, '#0f172a'); // slate-900
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 900, 600);

    // Decorative Borders
    ctx.strokeStyle = '#25D366';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 860, 560);

    ctx.strokeStyle = '#f59e0b'; // Gold
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, 844, 544);

    // Corner Ornaments
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(20, 20, 16, 16);
    ctx.fillRect(864, 20, 16, 16);
    ctx.fillRect(20, 564, 16, 16);
    ctx.fillRect(864, 564, 16, 16);

    // Header Logo & Badge
    ctx.fillStyle = '#25D366';
    ctx.font = 'bold 36px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AIMASTER.PK', 450, 85);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText("Pakistan's #1 National AI Learning Academy", 450, 112);

    // Certificate Title
    ctx.fillStyle = '#fef08a'; // goldish
    ctx.font = 'bold 32px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText('سندِ فراغت و مہارت (Certificate of Completion)', 450, 175);

    // Subtext
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText('یہ سند باضابطہ طور پر تصدیق کرتی ہے کہ', 450, 225);

    // Recipient Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(name, 450, 290);

    // Underline for name
    ctx.strokeStyle = '#25D366';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 310);
    ctx.lineTo(650, 310);
    ctx.stroke();

    // Body
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(`نے کامیابی کے ساتھ کورس برائے "${courseTitleUrdu}" مکمل کیا ہے`, 450, 360);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = '16px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText('اور وہ جدید ترین AI ٹولز سے عملی پروجیکٹ مکمل کرنے کی مکمل صلاحیت رکھتے ہیں۔', 450, 400);

    // Seal Badge Left
    ctx.beginPath();
    ctx.arc(160, 485, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('VERIFIED', 160, 482);
    ctx.fillText('OFFICIAL', 160, 498);

    // Signature Right
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(680, 500);
    ctx.lineTo(800, 500);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText('ڈائریکٹر اکیڈمی - AI Master.pk', 740, 525);

    // Date
    const today = new Date().toLocaleDateString('ur-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(`Date: ${today}`, 450, 515);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        drawCertificate(userName);
      }, 50);
    }
  }, [isOpen, userName, courseTitleUrdu]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `AIMaster-Certificate-${Date.now()}.png`;
      a.click();
      onToast('✅ سند تصویر کی شکل میں ڈاؤنلوڈ ہو گئی!');
    } catch {
      onToast('ڈاؤنلوڈ میں مسئلہ آیا، براہ کرم اسکرین شاٹ لیں۔');
    }
  };

  const handleShareWhatsApp = () => {
    const text = `🎉 مبارک ہو! میں نے AIMaster.pk پر کورس "${courseTitleUrdu}" مکمل کر کے آفیشل سرٹیفکیٹ حاصل کر لیا ہے! 🎓🚀\nآپ بھی 100% مفت اردو کورسز دیکھیں: https://aimaster.pk`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border-2 border-[#25D366]/40 p-5 sm:p-7 space-y-5 text-right font-urdu relative"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 font-black text-xl flex items-center justify-center">
              🎓
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                مبارک ہو! آپ نے کورس مکمل کر لیا ہے
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                آپ کی تصدیق شدہ سندِ فراغت (Certificate of Completion) تیار ہے
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Canvas / Image Preview */}
        <div className="rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-lg bg-slate-900">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block max-h-[50vh] object-contain mx-auto"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>آفیشل ڈیجیٹل سرٹیفکیٹ برائے پورٹ فولیو اور لنکڈ ان</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownload}
              style={{ backgroundColor: '#25D366' }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>سرٹیفکیٹ ڈاؤنلوڈ کریں</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>واٹس ایپ پر شیئر کریں</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
