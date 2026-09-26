import React from 'react';
import { Category } from '../data/categoriesData';
import { CategoryIcon } from './CategoryIcon';
import { Sparkles } from 'lucide-react';

interface CategoriesGridProps {
  categories: Category[];
  selectedCategoryId: string;
  lang: 'ur' | 'en';
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  selectedCategoryId,
  lang,
  onSelectCategory
}) => {
  const isUrdu = lang === 'ur';

  return (
    <section
      id="categories-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs sm:text-sm font-bold mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              {isUrdu ? '25 کیٹیگریز کا جامع ذخیرہ' : '25 Curated AI Categories'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isUrdu ? 'اپنی پسندیدہ کیٹیگری منتخب کریں' : 'Choose Your AI Category'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'کسی بھی شعبے پر کلک کریں اور اس کے 10 بہترین AI ٹولز، PKR ریٹس اور پرامپٹس حاصل کریں۔'
              : 'Click any category to explore 10 top AI tools with PKR pricing and instant prompts.'}
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {isUrdu ? 'کل 250 تصدیق شدہ AI ٹولز' : '250 Verified AI Tools'}
        </div>
      </div>

      {/* Grid of 25 Categories in 4 Columns (Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {categories.map((cat, index) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{ minHeight: 'auto', height: 'auto' }}
              className={`group relative p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                isUrdu ? 'text-right' : 'text-left'
              } ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02] ring-2 ring-emerald-500/50'
                  : 'bg-white hover:bg-neutral-50/90 text-slate-800 border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <CategoryIcon name={cat.icon} className="w-5 h-5" />
                </div>

                {/* Category Details - no truncate to prevent Nastaliq overlap */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono opacity-50">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3
                      className={`font-bold text-base leading-snug ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {isUrdu ? cat.nameUrdu : cat.nameEnglish}
                    </h3>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed mt-0.5 line-clamp-2 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {isUrdu ? cat.descriptionUrdu : cat.descriptionEnglish}
                  </p>
                </div>
              </div>

              {/* Tool Count Badge */}
              <div className={`shrink-0 ${isUrdu ? 'mr-2' : 'ml-2'}`}>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-500/25 text-emerald-300'
                      : 'bg-neutral-100 text-slate-600'
                  }`}
                >
                  {isUrdu ? '10 ٹولز' : '10 Tools'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
