import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: 'ur' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t border-neutral-200/80 bg-white/70 backdrop-blur-md pt-12 pb-16 mt-16"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-200/60">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                AI Master<span className="text-emerald-600">.pk</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              {isUrdu
                ? 'پاکستان کا سب سے بڑا اور مستند ترین اردو AI پورٹل۔ ہمارا مشن ملک کے ہر طالبعلم، فری لانسر اور بزنس مین کو جدید ترین ٹیکنالوجی سے بااختیار بنانا ہے۔'
                : "Pakistan's leading AI directory & clinic. Empowering freelancers, students, and businesses with verified AI tools, Pakistani PKR pricing, and master prompts."}
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <span>🇵🇰 Lahore · Karachi · Islamabad · Peshawar · Quetta</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-3">
              {isUrdu ? 'مقبول کیٹیگریز' : 'Popular Categories'}
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#categories-section" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'لکھائی و مضامین (Writing)' : 'Writing & Content'}</a></li>
              <li><a href="#categories-section" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'تصویر و آرٹ جنریشن (Image)' : 'Image & Art Generation'}</a></li>
              <li><a href="#categories-section" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'ویڈیو ایڈیٹنگ و ریلز (Video)' : 'Video & Reels Automation'}</a></li>
              <li><a href="#categories-section" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'آواز و وائس اوور (Voice)' : 'Voiceover & Audio Studio'}</a></li>
              <li><a href="#categories-section" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'ایکسل و شیٹس (Excel)' : 'Excel & Sheet Formulas'}</a></li>
            </ul>
          </div>

          {/* Contact & Community */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-3">
              {isUrdu ? 'کمیونٹی اور رابطہ' : 'Community & Support'}
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition-colors">{isUrdu ? 'واٹس ایپ ہیلپ لائن' : 'WhatsApp Helpline'}</a></li>
              <li><span className="text-slate-500">{isUrdu ? 'روزانہ فری ٹول الرٹ' : 'Daily Free Tool Alerts'}</span></li>
              <li><span className="text-slate-500">{isUrdu ? 'پاکستانی فری لانسنگ گائیڈ' : 'Pakistani Freelance Guide'}</span></li>
              <li><span className="text-slate-500">{isUrdu ? 'پرائیویسی پالیسی و شرائط' : 'Privacy Policy & Terms'}</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Master.pk — {isUrdu ? 'جملہ حقوق محفوظ ہیں۔' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              {isUrdu ? 'پاکستانی نوجوانوں کے لیے پیار سے تیار کردہ' : 'Crafted with passion for Pakistan'} <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title={isUrdu ? 'اوپر جائیں' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'اوپر جائیں' : 'Top'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
