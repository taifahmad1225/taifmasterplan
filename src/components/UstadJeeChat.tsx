import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  Coins,
  ShieldCheck,
  RefreshCw,
  Maximize2,
  Minimize2,
  Mic,
  Loader2
} from 'lucide-react';
import { startVoiceListening } from '../utils/voiceRecognition';

interface UstadJeeChatProps {
  lang: 'ur' | 'en';
  onToast?: (msg: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ustad';
  text: string;
  timestamp: string;
  isVoice?: boolean;
  quickActionPrompt?: string;
}

export const UstadJeeChat: React.FC<UstadJeeChatProps> = ({ lang, onToast }) => {
  const isUrdu = lang === 'ur';
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreetingUrdu =
    'السلام علیکم بیٹا! میں ہوں آپ کا استاد جی 👨‍🏫۔ آپ مجھ سے کسی بھی AI ٹول، فری لانسنگ یا آن لائن پیسے کمانے کے بارے میں بلا جھجھک کچھ بھی پوچھ سکتے ہیں۔ بتائیں آج کیا سیکھنا ہے؟';
  const initialGreetingEnglish =
    "Assalam-o-Alaikum! I am Ustad Jee 👨‍🏫, your friendly Pakistani AI teacher. Ask me anything about any AI tool, freelancing, or earning in PKR step-by-step!";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ustad',
      text: isUrdu ? initialGreetingUrdu : initialGreetingEnglish,
      timestamp: '10:00 AM'
    }
  ]);

  // Update greeting if language changes and only initial message is there
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1) {
        return [
          {
            id: 'welcome-1',
            sender: 'ustad',
            text: isUrdu ? initialGreetingUrdu : initialGreetingEnglish,
            timestamp: '10:00 AM'
          }
        ];
      }
      return prev;
    });
  }, [isUrdu]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // 3 Quick Questions specified in prompt:
  // "یہ ٹول کیسے کام کرتا ہے؟ | اس سے پیسے کیسے کماؤں؟ | فری متبادل کونسا ہے؟"
  const quickQuestionsUrdu = [
    'یہ ٹول کیسے کام کرتا ہے؟',
    'اس سے پیسے کیسے کماؤں؟',
    'فری متبادل کونسا ہے؟'
  ];

  const quickQuestionsEnglish = [
    'How does this tool work?',
    'How can I earn money from this?',
    'What is the free alternative?'
  ];

  const quickQuestions = isUrdu ? quickQuestionsUrdu : quickQuestionsEnglish;

  // Voice Recognition for Ustad Jee directly called on click
  const handleVoiceClick = () => {
    startVoiceListening(
      inputRef.current,
      (transcript) => {
        if (transcript && transcript.trim()) {
          handleVoiceSend(transcript.trim());
        }
      },
      {
        onStart: () => setIsListening(true),
        onEnd: () => setIsListening(false),
        onError: () => setIsListening(false),
        onToast: onToast,
      }
    );
  };

  const handleVoiceSend = async (transcript: string) => {
    // Show in chat: User ka message as voice transcript with icon "🎤 آپ نے بولا:"
    const userVoiceMsg: ChatMessage = {
      id: `user-voice-${Date.now()}`,
      sender: 'user',
      text: `🎤 آپ نے بولا: "${transcript}"`,
      isVoice: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userVoiceMsg];
    setMessages(updatedHistory);
    setIsTyping(true);

    const minTypingPromise = new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const fetchPromise = fetch('/api/ustad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: transcript,
          history: updatedHistory.slice(-8)
        })
      }).then(res => {
        if (!res.ok) throw new Error('استاد جی کا سرور مصروف ہے');
        return res.json();
      });

      const [, data] = await Promise.all([minTypingPromise, fetchPromise]);
      const replyText = data.reply || 'بیٹا! آپ کا سوال بہت اچھا ہے۔ اس ٹول سے آپ فائور پر 1,000 روپے فی آرڈر کما سکتے ہیں!';

      const ustadMsg: ChatMessage = {
        id: `ustad-${Date.now()}`,
        sender: 'ustad',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, ustadMsg]);
    } catch (err) {
      await minTypingPromise;
      console.warn('Ustad Jee live call failed, using fallback:', err);
      const fallbackMsg: ChatMessage = {
        id: `ustad-${Date.now()}`,
        sender: 'ustad',
        text: 'بیٹا! انٹرنیٹ میں ہلکی سی رکاوٹ آئی ہے۔ آپ اس ٹول کے ذریعے پاکستانی کلائنٹس اور فائور پر باآسانی 1,500 روپے فی ٹاسک کما سکتے ہیں۔ کوئی اور سوال ہو تو بلا جھجھک پوچھیں!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    const minTypingPromise = new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const fetchPromise = fetch('/api/ustad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: updatedHistory.slice(-8)
        })
      }).then(res => {
        if (!res.ok) throw new Error('استاد جی کا سرور مصروف ہے');
        return res.json();
      });

      const [, data] = await Promise.all([minTypingPromise, fetchPromise]);
      const replyText = data.reply || 'بیٹا! آپ کا سوال بہت اچھا ہے۔ اس ٹول سے آپ فائور پر 1,000 روپے فی آرڈر کما سکتے ہیں!';

      const ustadMsg: ChatMessage = {
        id: `ustad-${Date.now()}`,
        sender: 'ustad',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, ustadMsg]);
    } catch (err) {
      await minTypingPromise;
      console.warn('Ustad Jee live call failed, using fallback:', err);
      const fallbackMsg: ChatMessage = {
        id: `ustad-${Date.now()}`,
        sender: 'ustad',
        text: 'بیٹا! انٹرنیٹ میں ہلکی سی رکاوٹ آئی ہے۔ آپ اس ٹول کے ذریعے پاکستانی کلائنٹس اور فائور پر باآسانی 1,500 روپے فی ٹاسک کما سکتے ہیں۔ کوئی اور سوال ہو تو بلا جھجھک پوچھیں!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 
        FLOATING USTAD JEE BUTTON:
        Bottom Left (opposite of WhatsApp which is at Bottom Right)
        Green circular button with 👨‍🏫 icon as requested!
      */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/90 group cursor-pointer"
        aria-label="استاد جی سے پوچھیں"
        title={isUrdu ? 'استاد جی سے پوچھیں' : 'Ask Ustad Jee'}
      >
        <span className="text-2xl sm:text-3xl filter drop-shadow-sm group-hover:rotate-12 transition-transform">
          👨‍🏫
        </span>
        {/* Pulsing Green Ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 left-4 sm:left-6 z-50 w-[92vw] sm:w-[410px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 flex flex-col overflow-hidden animate-fade-in ${
            isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
          }`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-emerald-700 via-[#25D366] to-teal-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/30">
                👨‍🏫
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                    {isUrdu ? 'استاد جی سے پوچھیں' : 'Ask Ustad Jee'}
                  </h3>
                  <span className="text-[10px] font-bold bg-white/25 px-2 py-0.5 rounded-full">
                    آن لائن
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 font-medium">
                  {isUrdu
                    ? 'آپ کے دوستانہ اور تجربہ کار پاکستانی AI استاد'
                    : 'Your friendly Pakistani AI Mentor'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2.5 bg-emerald-50/70 border-b border-emerald-100 flex flex-wrap gap-1.5 text-xs">
            <span className="text-[11px] text-emerald-800 font-bold self-center">
              {isUrdu ? 'فوری سوالات:' : 'Quick Questions:'}
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] font-semibold bg-white hover:bg-emerald-100/80 text-emerald-900 px-2.5 py-1 rounded-xl border border-emerald-200 transition-all shadow-2xs active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[380px] bg-[#FBFBFD]">
            {messages.map(msg => {
              const isUstad = msg.sender === 'ustad';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUstad ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isUstad && (
                    <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm shrink-0 mt-1 shadow-xs">
                      👨‍🏫
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUstad
                        ? 'bg-white border border-neutral-200/90 text-slate-800 rounded-tr-xs'
                        : 'bg-slate-900 text-white rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div
                      className={`text-[10px] mt-1.5 ${
                        isUstad ? 'text-slate-400' : 'text-slate-400 text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-600 font-bold italic pr-2 font-urdu">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span>{isUrdu ? 'استاد جی سوچ رہے ہیں...' : 'Ustad Jee is thinking...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 2 - INPUT FOOTER WITH 2 BUTTONS: 🎤 Voice + 📤 Send */}
          {/* ========================================================================= */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-neutral-200/70"
          >
            <div
              className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${
                isListening
                  ? 'border-red-400 bg-red-50/50 ring-2 ring-red-100'
                  : 'border-neutral-200 bg-neutral-50 focus-within:border-[#25D366] focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100'
              }`}
            >
              {/* If listening: show animation inside input area */}
              {isListening ? (
                <div className="flex-1 flex items-center gap-2 px-3 py-2 text-red-600 font-bold text-xs sm:text-sm animate-pulse font-urdu">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
                  <span>🎤 سن رہا ہوں... بولیں</span>
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder={isUrdu ? 'استاد جی سے کچھ بھی پوچھیں...' : 'Ask Ustad Jee anything...'}
                  className="flex-1 py-1.5 px-3 bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden font-urdu"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                />
              )}

              {/* 2 Buttons grouped together inside the type box */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Button 1: 🎤 Voice Button - green #25D366 */}
                <button
                  type="button"
                  onClick={handleVoiceClick}
                  style={{
                    backgroundColor: isListening ? '#EF4444' : '#25D366',
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-sm ${
                    isListening
                      ? 'ring-4 ring-red-200 animate-pulse scale-105'
                      : 'hover:bg-[#1EBE5D] hover:scale-105 active:scale-95'
                  }`}
                  title="🎤 بول کر پوچھیں"
                  aria-label="Voice Input"
                >
                  <Mic className={`w-4 h-4 text-white ${isListening ? 'animate-bounce' : ''}`} />
                </button>

                {/* Button 2: 📤 Send Button - existing */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isListening || isTyping}
                  style={{ backgroundColor: '#25D366' }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-[#1EBE5D] disabled:opacity-40 text-white transition-all active:scale-95 cursor-pointer shadow-sm flex items-center justify-center hover:scale-105"
                  aria-label="Send"
                  title={isUrdu ? 'بھیجیں' : 'Send'}
                >
                  <Send className={`w-4 h-4 text-white ${isUrdu ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
