import React, { useRef, useEffect, useState } from 'react';
import {
  Sparkles,
  Share2,
  Download,
  Award,
  TrendingUp,
  Bookmark,
  Zap,
  CheckCircle2,
  ArrowRight,
  Instagram,
  X
} from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface ReportCardPageProps {
  savedToolsCount: number;
  bookmarkedTools: ToolItem[];
  userName?: string;
  onToast: (msg: string) => void;
  onNavigateHome: () => void;
  onNavigateWorkspace: () => void;
}

export const ReportCardPage: React.FC<ReportCardPageProps> = ({
  savedToolsCount,
  bookmarkedTools,
  userName = 'پاکستانی AI ایکسپرٹ',
  onToast,
  onNavigateHome,
  onNavigateWorkspace
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inputName, setInputName] = useState(userName);

  // Logic: Calculate % based on how many tools user saved/clicked
  // Example: 1-2 tools = 15%, 5 tools = 35%, 10 tools = 55%, 20 tools = 70%, 25+ = 95%
  const calculatePercentage = (count: number): number => {
    if (count <= 0) return 15;
    if (count <= 3) return 25;
    if (count <= 5) return 40;
    if (count <= 10) return 55;
    if (count <= 15) return 70;
    if (count <= 25) return 85;
    return 95;
  };

  const aiPercentage = calculatePercentage(savedToolsCount);

  // Determine Level badge
  const getLevelInfo = (pct: number) => {
    if (pct < 30) return { titleUrdu: 'مبتدی (AI Learner)', emoji: '🌱', descUrdu: 'ابتدائی سفر کا شاندار آغاز' };
    if (pct < 60) return { titleUrdu: 'درمیانہ (AI Practitioner)', emoji: '⚡', descUrdu: 'ٹولز پر قابلِ قدر مہارت' };
    if (pct < 85) return { titleUrdu: 'ماہر (AI Specialist)', emoji: '🚀', descUrdu: 'کلائنٹ ورک اور آٹومیشن ایکسپرٹ' };
    return { titleUrdu: 'سپر ماسٹر (AI Master Grandmaster)', emoji: '👑', descUrdu: 'پاکستان کا ٹاپ 1% جنریٹو AI لیڈر' };
  };

  const levelInfo = getLevelInfo(aiPercentage);

  // Draw on Canvas using Canvas API (Green gradient background, white text, logo, progress)
  const drawCardOnCanvas = (name: string, pct: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1080 x 1080 Square (Ideal for Instagram / WhatsApp Stories)
    canvas.width = 1080;
    canvas.height = 1080;

    // 1. Luxury Green Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#064e3b'); // emerald-900
    grad.addColorStop(0.4, '#022c22'); // emerald-950
    grad.addColorStop(1, '#065f46'); // emerald-800
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative circular glow
    ctx.beginPath();
    ctx.arc(540, 480, 380, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(37, 211, 102, 0.08)';
    ctx.fill();

    // 2. Borders & Ornaments
    ctx.strokeStyle = '#25D366';
    ctx.lineWidth = 10;
    ctx.strokeRect(35, 35, 1010, 1010);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 970, 970);

    // 3. Top Header: AIMaster.pk Logo
    ctx.fillStyle = '#25D366';
    ctx.font = 'bold 52px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AIMASTER.PK', 540, 130);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px system-ui, sans-serif';
    ctx.fillText("Pakistan's #1 National AI Learning Portal", 540, 170);

    // 4. User Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(name, 540, 260);

    // 5. Big Punchline: "میں 70% AI Expert بن گیا - AIMaster.pk"
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 58px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(`میں ${pct}% AI Expert بن گیا!`, 540, 360);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = '26px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(`سطح: ${levelInfo.titleUrdu} ${levelInfo.emoji}`, 540, 430);

    // 6. Circular Progress Dial in Center
    const centerX = 540;
    const centerY = 600;
    const radius = 130;

    // Track
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 24;
    ctx.stroke();

    // Progress Arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (pct / 100));
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#25D366';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Dial text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 84px "Plus Jakarta Sans", monospace';
    ctx.fillText(`${pct}%`, centerX, centerY + 28);

    // 7. Stat Box Highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(140, 780, 800, 130);
    ctx.strokeStyle = 'rgba(37, 211, 102, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(140, 780, 800, 130);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText(`محفوظ شدہ ٹولز: ${savedToolsCount} AI ٹولز`, 340, 845);
    ctx.fillText(`حالت: تصدیق شدہ اسٹوڈنٹ ✅`, 740, 845);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px "Noto Nastaliq Urdu", system-ui, serif';
    ctx.fillText('یہ رپورٹ صارف کی حقیقی AI سرگرمی اور کورس کے مراحل پر مبنی ہے', 540, 885);

    // 8. Footer Call to Action
    ctx.fillStyle = '#25D366';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText('آپ بھی اپنی AI رپورٹ جانچیں: https://aimaster.pk', 540, 990);
  };

  useEffect(() => {
    drawCardOnCanvas(inputName, aiPercentage);
  }, [inputName, aiPercentage, savedToolsCount]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `AIMaster-ReportCard-${aiPercentage}pct.png`;
      a.click();
      onToast('✅ رپورٹ کارڈ تصویر ڈاؤنلوڈ ہو گئی!');
    } catch {
      onToast('براہ کرم اسکرین شاٹ محفوظ کریں۔');
    }
  };

  const handleShareWhatsApp = () => {
    const text = `🎉 میں ${aiPercentage}% AI Expert بن گیا ہوں! - AIMaster.pk 🚀\nمیرے پاس ${savedToolsCount} ٹولز اور ورک فلوز کی مکمل مہارت ہے۔\nآپ بھی اپنا AI رپورٹ کارڈ بنائیں: https://aimaster.pk/my-report-card`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareInstagram = () => {
    handleDownload();
    onToast('📸 تصویر ڈاؤنلوڈ ہو گئی ہے، اب اسے انسٹاگرام اسٹوری پر لگائیں!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-urdu" dir="rtl">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <span>← ہوم پیج پر واپس جائیں</span>
        </button>

        <button
          onClick={onNavigateWorkspace}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
        >
          <span>میرا ورک اسپیس کھولیں ❤️</span>
        </button>
      </div>

      {/* Main Report Card View */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-emerald-300 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#128C7E] text-xs sm:text-sm font-bold border border-emerald-300">
            <Sparkles className="w-4 h-4 text-[#25D366]" />
            <span>فیچر #2: تصدیق شدہ AI رپورٹ کارڈ</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            میں {aiPercentage}% AI Expert بن گیا — AIMaster.pk
          </h1>

          <p className="text-sm text-slate-600 font-medium">
            آپ کے محفوظ کردہ ٹولز، ورک فلوز اور سیکھنے کی رفتار کے مطابق لائیو اسکور
          </p>
        </div>

        {/* Name input */}
        <div className="max-w-md mx-auto flex items-center gap-2 p-2 rounded-2xl bg-neutral-50 border border-neutral-200">
          <span className="text-xs font-bold text-slate-500 pr-2">رپورٹ پر نام:</span>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="اپنا نام درج کریں..."
            className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-neutral-300 text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:border-[#25D366]"
          />
        </div>

        {/* Real Live Canvas Card */}
        <div className="rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-slate-950 max-w-lg mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block select-none"
          />
        </div>

        {/* 3 Action Buttons as specifically requested */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Button 1: [ واٹس ایپ پر شیئر کریں ] */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            style={{ backgroundColor: '#25D366' }}
            className="py-3 px-4 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-[#25D366]/20"
          >
            <Share2 className="w-4 h-4" />
            <span>واٹس ایپ پر شیئر کریں</span>
          </button>

          {/* Button 2: [ تصویر ڈاؤن لوڈ کریں ] */}
          <button
            type="button"
            onClick={handleDownload}
            className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>تصویر ڈاؤن لوڈ کریں</span>
          </button>

          {/* Button 3: [ Instagram Story پر لگائیں ] */}
          <button
            type="button"
            onClick={handleShareInstagram}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram Story پر لگائیں</span>
          </button>

        </div>

        {/* Progress Breakdown */}
        <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>آپ کا موجودہ اسکور لیول:</span>
            <span className="text-emerald-700 font-mono">{aiPercentage}% مکمل</span>
          </div>

          <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#25D366] h-full rounded-full transition-all duration-700"
              style={{ width: `${aiPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2 text-xs">
            <div className="p-2 bg-white rounded-xl border border-neutral-200">
              <span className="text-slate-400 block text-[10px]">محفوظ ٹولز</span>
              <strong className="text-slate-900 font-mono text-sm">{savedToolsCount}</strong>
            </div>
            <div className="p-2 bg-white rounded-xl border border-neutral-200">
              <span className="text-slate-400 block text-[10px]">موجودہ رینک</span>
              <strong className="text-emerald-700 text-xs">{levelInfo.titleUrdu}</strong>
            </div>
            <div className="p-2 bg-white rounded-xl border border-neutral-200">
              <span className="text-slate-400 block text-[10px]">اگلا ہدف</span>
              <strong className="text-amber-700 text-xs font-mono">{Math.min(100, aiPercentage + 15)}%</strong>
            </div>
            <div className="p-2 bg-white rounded-xl border border-neutral-200">
              <span className="text-slate-400 block text-[10px]">سرٹیفکیٹ اسٹیٹس</span>
              <strong className="text-emerald-700 text-xs">اہل ✅</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
