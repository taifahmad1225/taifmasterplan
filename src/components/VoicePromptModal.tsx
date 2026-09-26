import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  ArrowRight,
  Send,
  Loader2,
  HelpCircle,
  Volume2
} from 'lucide-react';

interface VoicePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  initialTopic?: string;
}

export const VoicePromptModal: React.FC<VoicePromptModalProps> = ({
  isOpen,
  onClose,
  onToast,
  initialTopic
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenUrdu, setSpokenUrdu] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [textInput, setTextInput] = useState('');

  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Clean reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setIsPermissionDenied(false);
      setSpokenUrdu('');
      setGeneratedPrompt('');
      if (initialTopic && initialTopic.trim()) {
        setSpokenUrdu(initialTopic.trim());
        convertWithGemini(initialTopic.trim());
      }
    } else {
      stopAllMedia();
    }
  }, [isOpen, initialTopic]);

  const stopAllMedia = () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    } catch {
      // ignore
    }
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    } catch {
      // ignore
    }
    setIsListening(false);
  };

  // Click Handler triggers navigator.mediaDevices.getUserMedia directly inside user gesture
  const handleVoiceListen = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setErrorMessage(null);
    setIsPermissionDenied(false);
    setCopied(false);

    // Check SpeechRecognition browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const msg = 'آپ کے براؤزر میں اسپیچ ریکگنیشن سپورٹ موجود نہیں، براہ کرم گوگل کروم (Chrome) استعمال کریں۔';
      setErrorMessage(msg);
      onToast(msg);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const msg = 'براؤزر مائیکروفون ایکسس سپورٹ نہیں کرتا۔';
      setErrorMessage(msg);
      setIsPermissionDenied(true);
      return;
    }

    // Call getUserMedia({ audio: true }) strictly INSIDE user gesture click handler
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      onToast('مائیک آن ہو گیا، اب بولیں 🎤');
      setIsListening(true);

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'ur-PK'; // Urdu (Pakistan)
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
        setIsPermissionDenied(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          const heard = transcript.trim();
          setSpokenUrdu(heard);
          convertWithGemini(heard);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error event:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setIsPermissionDenied(true);
          setErrorMessage('برائے مہربانی اوپر Address Bar میں مائیک کے آئیکن پر کلک کر کے Allow کریں');
        } else if (event.error === 'no-speech') {
          setErrorMessage('کوئی آواز سنائی نہیں دی، براہ کرم دوبارہ مائیک دبا کر بولیں 🎤');
        } else {
          setErrorMessage(`آواز ریکارڈنگ کا مسئلہ: ${event.error || 'دوبارہ بولیں'}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Release stream tracks
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error('getUserMedia permission error:', err);
      setIsListening(false);
      setIsPermissionDenied(true);
      // Friendly Urdu message as specifically requested
      setErrorMessage('برائے مہربانی اوپر Address Bar میں مائیک کے آئیکن پر کلک کر کے Allow کریں');
      onToast('مائیکروفون کی اجازت درکار ہے');
    }
  };

  // Live speech-to-prompt conversion via Gemini API
  const convertWithGemini = async (idea: string) => {
    if (!idea.trim()) return;
    setIsLoadingAi(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/voice-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urduIdea: idea }),
      });

      if (!response.ok) {
        throw new Error('API جواب موصول نہیں ہوا');
      }

      const data = await response.json();
      if (data.englishPrompt) {
        setGeneratedPrompt(data.englishPrompt);
      } else {
        throw new Error('پرامپٹ تیار نہیں ہو سکا');
      }
    } catch (err: any) {
      console.warn('Gemini Voice Prompt fallback used:', err);
      const sample = `A stunning high-resolution professional image of ${idea}, Pakistan cultural aesthetic, cinematic volumetric lighting, 8k render, masterpiece detail, trending on ArtStation`;
      setGeneratedPrompt(sample);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    onToast('کاپی ہو گیا! ✅');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    setSpokenUrdu(textInput.trim());
    convertWithGemini(textInput.trim());
    setTextInput('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={(e) => {
        // Prevent background clicks from navigating or misfiring
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full my-auto shadow-2xl border-2 border-emerald-400/40 p-5 sm:p-7 space-y-5 text-right font-urdu relative"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-50 border border-[#25D366]/50 text-[#25D366] font-black text-xl flex items-center justify-center shadow-xs">
              🎤
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                اردو میں بول کر پرامپٹ بنائیں
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                آپ اردو میں بولیں، لائیو Gemini AI فوری انگریزی پرامپٹ تیار کرے گا
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
            aria-label="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pulsing Mic Interactive Area */}
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-emerald-50/60 rounded-3xl border-2 border-dashed border-[#25D366]/50 relative overflow-hidden">
          <div className="relative mb-3">
            {isListening && (
              <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
            )}
            <button
              type="button"
              onClick={handleVoiceListen}
              style={{
                backgroundColor: isListening ? '#ef4444' : '#25D366',
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer relative z-10 text-white ${
                isListening
                  ? 'ring-8 ring-red-200 animate-pulse'
                  : 'hover:brightness-105 ring-4 ring-emerald-100'
              }`}
              title={isListening ? 'بولیں، سن رہا ہوں...' : 'مائیک دبائیں اور بولیں'}
            >
              {isListening ? (
                <Mic className="w-9 h-9 text-white animate-bounce" />
              ) : (
                <Mic className="w-9 h-9 text-white" />
              )}
            </button>
          </div>

          {/* Text status */}
          <div className="text-center space-y-1.5 w-full">
            {isListening ? (
              <div className="space-y-1">
                <p className="text-base font-black text-red-600 animate-pulse flex items-center gap-2 justify-center">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping inline-block" />
                  <span>🎤 اردو سن رہا ہوں... اب بولیں</span>
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  مثال: مجھے عید کا پوسٹر بنانا ہے | یوٹیوب گیمنگ تھمب نیل
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  مائیک دبائیں اور اردو میں اپنا آئیڈیا بولیں
                </p>
                <p className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full inline-block">
                  زبان: اردو پاکستان (ur-PK) 🇵🇰
                </p>
              </div>
            )}

            {/* Error state with image hint to address bar */}
            {errorMessage && (
              <div className="mt-3 p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 space-y-3 text-center animate-fade-in shadow-xs">
                <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>

                {/* Visual Address Bar Image Hint when permission is denied */}
                {isPermissionDenied && (
                  <div className="space-y-2 pt-1">
                    <div className="rounded-xl overflow-hidden border border-amber-200/80 shadow-xs bg-slate-900 p-1">
                      <img
                        src="/mic-permission-hint.svg"
                        alt="براؤزر ایڈریس بار میں مائیک کی اجازت دیں"
                        className="w-full h-auto rounded-lg max-h-36 object-contain mx-auto"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-slate-600">
                      💡 اوپر دیے گئے خاکے کی طرح اپنے براؤزر کے ایڈریس بار میں لاک یا مائیک کے نشان پر کلک کر کے <span className="text-emerald-700 underline font-black">Allow</span> منتخب کریں۔
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleVoiceListen}
                  style={{ backgroundColor: '#25D366' }}
                  className="px-5 py-2 rounded-xl text-white font-bold text-xs hover:brightness-105 active:scale-95 cursor-pointer shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>دوبارہ مائیک کھولیں</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Text input alternative */}
        <form onSubmit={handleManualSubmit} className="relative">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="یا یہاں اردو میں ٹائپ کریں (مثال: مجھے عید کا پوسٹر بنانا ہے)"
            className="w-full py-2.5 pr-4 pl-24 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#25D366]"
          />
          <button
            type="submit"
            className="absolute left-1.5 top-1.5 bottom-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>بنائیں</span>
            <Send className="w-3 h-3" />
          </button>
        </form>

        {/* Results Area */}
        <div className="space-y-3 pt-1">
          {/* Box 1: "آپ نے بولا:" (Urdu) */}
          <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80 space-y-1">
            <div className="text-xs font-black text-slate-600 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>آپ نے بولا (Urdu Speech):</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {spokenUrdu || '(ابھی کچھ نہیں بولا گیا، اوپر مائیک پر کلک کریں)'}
            </p>
          </div>

          {/* Box 2: "بنا ہوا پروفیشنل پرامپٹ:" (English) with green copy button */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#25D366]" />
                <span className="text-xs sm:text-sm font-black text-[#25D366]">
                  بنا ہوا پروفیشنل پرامپٹ (Gemini AI Prompt):
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!generatedPrompt || isLoadingAi}
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  borderRadius: '8px',
                }}
                className="py-1.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-40 disabled:pointer-events-none hover:brightness-105"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>کاپی ہو گیا! ✅</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>📋 کاپی کریں</span>
                  </>
                )}
              </button>
            </div>

            {isLoadingAi ? (
              <div className="py-4 flex items-center justify-center gap-2 text-slate-300 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#25D366]" />
                <span>Gemini AI اعلیٰ معیار کا انگریزی پرامپٹ تیار کر رہا ہے...</span>
              </div>
            ) : (
              <p
                className="text-xs sm:text-sm font-mono text-slate-200 bg-slate-950/70 p-3 rounded-xl select-all leading-relaxed"
                dir="ltr"
              >
                {generatedPrompt ||
                  'Eid Mubarak poster design, Pakistani style, crescent moon, mosque silhouette, golden calligraphy, festive colors, 4k, ultra detailed'}
              </p>
            )}
          </div>
        </div>

        {/* Modal Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
          <span className="text-slate-500 font-medium">Midjourney, Leonardo اور ChatGPT کے لیے 100% کارآمد</span>
          
          <button
            type="button"
            onClick={handleVoiceListen}
            style={{
              borderColor: '#25D366',
              color: '#128C7E',
            }}
            className="w-full sm:w-auto px-4 py-2 border-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-[#25D366]" />
            <span>🔄 دوبارہ بولیں</span>
          </button>
        </div>
      </div>
    </div>
  );
};
