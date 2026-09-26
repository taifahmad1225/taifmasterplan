import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Share2,
  Trash2,
  Play,
  Sparkles,
  ExternalLink,
  Plus,
  Layers,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { ToolItem } from '../data/toolsData';

interface MyStack {
  id: string;
  name: string;
  author: string;
  toolIds: string[];
  createdAt: string;
}

interface BookmarksModalProps {
  tools: ToolItem[];
  allAvailableTools: ToolItem[];
  onClose: () => void;
  onRemove: (toolId: string) => void;
  onClearAll: () => void;
  onOpenVideo: (tool: ToolItem) => void;
  onOpenPrompt: (tool: ToolItem) => void;
  onOpenDetail: (tool: ToolItem) => void;
  onToast: (msg: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  tools,
  allAvailableTools,
  onClose,
  onRemove,
  onClearAll,
  onOpenVideo,
  onOpenPrompt,
  onOpenDetail,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'stacks'>('favorites');
  const [isCreatingStack, setIsCreatingStack] = useState(false);
  const [stackName, setStackName] = useState('');
  const [stackAuthor, setStackAuthor] = useState('');
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [myStacks, setMyStacks] = useState<MyStack[]>([]);

  // Load stacks from localStorage key "myStacks"
  useEffect(() => {
    try {
      const stored = localStorage.getItem('myStacks');
      if (stored) {
        setMyStacks(JSON.parse(stored));
      } else {
        // Sample starter stack
        const sample: MyStack[] = [
          {
            id: 'stack-sample-1',
            name: 'یوٹیوب ویڈیو کریشن اسٹیک',
            author: 'طائف احمد',
            toolIds: tools.slice(0, 4).map(t => t.id),
            createdAt: 'آج'
          }
        ];
        setMyStacks(sample);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveStacksToStorage = (updated: MyStack[]) => {
    setMyStacks(updated);
    try {
      localStorage.setItem('myStacks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCreateStack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stackName.trim()) {
      onToast('براہ کرم مجموعہ کا نام درج کریں');
      return;
    }
    if (selectedToolIds.length === 0) {
      onToast('کم از کم 1 اور زیادہ سے زیادہ 5 ٹولز منتخب کریں');
      return;
    }

    const newStack: MyStack = {
      id: `stack-${Date.now()}`,
      name: stackName.trim(),
      author: stackAuthor.trim() || 'صارف',
      toolIds: selectedToolIds.slice(0, 5),
      createdAt: 'ابھی'
    };

    const next = [newStack, ...myStacks];
    saveStacksToStorage(next);
    setIsCreatingStack(false);
    setStackName('');
    setSelectedToolIds([]);
    onToast('✅ نیا AI اسٹیک کامیابی سے بن گیا!');
    setActiveTab('stacks');
  };

  const handleDeleteStack = (stackId: string) => {
    const next = myStacks.filter(s => s.id !== stackId);
    saveStacksToStorage(next);
    onToast('اسٹیک ڈیلیٹ ہو گیا');
  };

  const handleShareAllFavoritesWhatsApp = () => {
    if (tools.length === 0) {
      onToast('شیئر کرنے کے لیے کوئی ٹول محفوظ نہیں ہے');
      return;
    }
    const toolsList = tools.map((t, idx) => `${idx + 1}. ${t.urduName} (${t.name}) - ${t.pricePKR}`).join('\n');
    const text = `میرے پسندیدہ AI ٹولز AI Master.pk سے:\n\n${toolsList}\n\nپورٹل کا لنک: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareStackWhatsApp = (stack: MyStack) => {
    const stackTools = allAvailableTools.filter(t => stack.toolIds.includes(t.id));
    const list = stackTools
      .map((t, idx) => `${idx + 1}. ${t.urduName} - بہترین برائے: ${t.categoryUrdu || 'AI کام'}`)
      .join('\n');

    const text = `میرا AI اسٹیک AI Master سے: [${stack.name}] (بذریعہ ${stack.author})\n\n${list}\n\nدیکھو پورٹل: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleToolSelectionForStack = (toolId: string) => {
    if (selectedToolIds.includes(toolId)) {
      setSelectedToolIds(prev => prev.filter(id => id !== toolId));
    } else {
      if (selectedToolIds.length >= 5) {
        onToast('ایک اسٹیک میں زیادہ سے زیادہ 5 ٹولز منتخب کیے جا سکتے ہیں');
        return;
      }
      setSelectedToolIds(prev => [...prev, toolId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in font-urdu" dir="rtl">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 text-right p-6 sm:p-7 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                ❤️ میرے پسندیدہ ٹولز و AI اسٹیکس ({tools.length})
              </h3>
              <p className="text-xs text-slate-500">
                آپ کے منتخب کردہ ٹولز اور کسٹم ورک فلو اسٹیکس
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Tab Toggles: Favorites vs Stacks */}
            <div className="flex items-center p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('favorites')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                پسندیدہ ٹولز ({tools.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('stacks')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'stacks'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                🧩 میرے اسٹیکس ({myStacks.length})
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200/70 text-xs">
          <div className="flex items-center gap-2">
            {/* Button "📤 میرا مجموعہ واٹس ایپ پر شیئر کرو" */}
            <button
              type="button"
              onClick={handleShareAllFavoritesWhatsApp}
              style={{ backgroundColor: '#25D366' }}
              className="px-4 py-2 rounded-xl text-white font-bold flex items-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>📤 میرا مجموعہ واٹس ایپ پر شیئر کرو</span>
            </button>

            {/* Feature 8: Button "➕ نیا مجموعہ بنائیں (My Stack)" */}
            <button
              type="button"
              onClick={() => setIsCreatingStack(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>🧩 نیا مجموعہ بنائیں (My Stack)</span>
            </button>
          </div>

          {/* Button "🗑️ سب ختم کرو" */}
          {tools.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>🗑️ سب ختم کرو</span>
            </button>
          )}
        </div>

        {/* Create Stack Popup / Form */}
        {isCreatingStack && (
          <form
            onSubmit={handleCreateStack}
            className="p-5 bg-purple-50/70 border-2 border-purple-200 rounded-3xl space-y-4 animate-scale-up"
          >
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <h4 className="font-black text-purple-950 text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>🧩 نیا AI مجموعہ (My Stack) بنائیں</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsCreatingStack(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                منسوخ کریں
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  مجموعہ کا نام (Stack Name) *
                </label>
                <input
                  type="text"
                  required
                  value={stackName}
                  onChange={e => setStackName(e.target.value)}
                  placeholder="مثلاً: میرا یوٹیوب اسٹیک، میری دکان کا اسٹیک"
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  آپ کا نام (Creator Name)
                </label>
                <input
                  type="text"
                  value={stackAuthor}
                  onChange={e => setStackAuthor(e.target.value)}
                  placeholder="مثلاً: طائف احمد"
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-purple-500"
                />
              </div>
            </div>

            {/* Select tools for stack */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>پسندیدہ ٹولز میں سے 1 تا 5 ٹولز منتخب کریں:</span>
                <span className="text-purple-700 font-mono">
                  منتخب: {selectedToolIds.length}/5
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {(tools.length > 0 ? tools : allAvailableTools.slice(0, 10)).map(tool => {
                  const isSelected = selectedToolIds.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => toggleToolSelectionForStack(tool.id)}
                      className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-white text-slate-800 border-neutral-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-xs truncate">
                          {tool.urduName}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                          {tool.name}
                        </div>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                type="submit"
                style={{ backgroundColor: '#25D366' }}
                className="px-6 py-2.5 rounded-xl text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer shadow-xs"
              >
                ✅ اسٹیک محفوظ کریں
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingStack(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-slate-700 text-xs font-bold"
              >
                منسوخ کریں
              </button>
            </div>
          </form>
        )}

        {/* Tab 1: Favorites List */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            {tools.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Heart className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                <p className="text-sm font-bold text-slate-600">
                  آپ نے ابھی تک کوئی ٹول پسندیدہ میں شامل نہیں کیا۔
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  کسی بھی ٹول کارڈ کے اوپر دائیں کونے میں موجود دل کے آئیکن ❤️ پر کلک کریں تاکہ وہ یہاں محفوظ ہو جائے۔
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {tools.map(tool => (
                  <div
                    key={tool.id}
                    className="p-4 rounded-2xl border border-neutral-200 hover:border-emerald-300 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-black text-slate-900 text-sm">
                            {tool.urduName}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-sans block">
                            {tool.name}
                          </span>
                        </div>

                        {/* Remove favorite button */}
                        <button
                          type="button"
                          onClick={() => onRemove(tool.id)}
                          className="w-7 h-7 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="پسندیدہ سے ہٹائیں"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {tool.descriptionUrdu}
                      </p>

                      <div className="mt-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                        {tool.pricePKR}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(tool)}
                        className="flex-1 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>تفصیل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenPrompt(tool)}
                        className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>پرامپٹ</span>
                      </button>

                      <a
                        href={tool.toolUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: '#25D366' }}
                        className="py-1.5 px-3 rounded-lg text-white font-bold text-xs flex items-center justify-center hover:brightness-105 cursor-pointer shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Feature 8 My Stacks / Collection Builder */}
        {activeTab === 'stacks' && (
          <div className="space-y-4">
            {myStacks.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Layers className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                <p className="text-sm font-bold text-slate-600">
                  ابھی تک کوئی کسٹم AI مجموعہ نہیں بنایا گیا۔
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreatingStack(true)}
                  style={{ backgroundColor: '#25D366' }}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs inline-flex items-center gap-1.5 hover:brightness-105 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>پہلا AI مجموعہ بنائیں</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myStacks.map(stack => {
                  const stackTools = allAvailableTools.filter(t => stack.toolIds.includes(t.id));

                  return (
                    <div
                      key={stack.id}
                      className="p-5 rounded-3xl border-2 border-purple-200/80 bg-gradient-to-r from-purple-50/50 via-white to-emerald-50/40 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3 border-b border-purple-100 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                              AI STACK
                            </span>
                            <h4 className="font-black text-slate-900 text-base">
                              {stack.name}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            بذریعہ: <strong className="text-slate-700">{stack.author}</strong> · شامل ٹولز: {stackTools.length}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteStack(stack.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="اسٹیک ڈیلیٹ کریں"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 5 Tool Logos in row */}
                      <div className="flex flex-wrap items-center gap-2 py-1">
                        {stackTools.map((t, idx) => (
                          <div
                            key={t.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl shadow-2xs"
                          >
                            <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-800">
                              {t.urduName}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Button "📤 یہ مجموعہ واٹس ایپ پر شیئر کرو" */}
                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => handleShareStackWhatsApp(stack)}
                          style={{ backgroundColor: '#25D366' }}
                          className="px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5 text-white" />
                          <span>📤 یہ مجموعہ واٹس ایپ پر شیئر کرو</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
