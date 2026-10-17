'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Compass, Sparkles, CheckCircle2, ShieldCheck, Utensils, Store } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreMapClick: () => void;
  onExploreFoodsClick?: () => void;
  totalDistricts: number;
  totalFoods: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onExploreMapClick,
  onExploreFoodsClick,
  totalDistricts,
  totalFoods
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0C382E] via-[#0E4337] to-[#124E40] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 shadow-lg">
      {/* Decorative ambient background rings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#84CC16] blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#13463B]/90 border border-[#84CC16]/40 text-xs font-semibold text-emerald-100 shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>বাংলার খাদ্য সংস্কৃতি ও ঐতিহ্য অন্বেষণ করুন</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          বাংলার <span className="text-[#A3E635] underline decoration-[#84CC16]/50 decoration-wavy decoration-2">৬৪ জেলার</span> বিখ্যাত খাবার ঘুরে দেখুন
        </h1>

        <p className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          বগুড়ার দই থেকে মেজবানি মাংস, নাটোরের কাঁচাগোল্লা থেকে সাতকড়া বিফ — মানচিত্রে জেলা ক্লিক করুন, আপনার খাওয়া খাবার চেক করুন এবং আপনার স্বাদের অভিযাত্রা ট্র্যাক করুন।
        </p>

        {/* Integrated Quick Search Box */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative flex items-center shadow-xl rounded-2xl bg-white/95 backdrop-blur-md border border-[#E6E1D6] p-1.5 focus-within:ring-4 focus-within:ring-[#84CC16]/40 transition-all">
            <div className="pl-3 text-emerald-800">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="জেলা বা খাবারের নাম খুঁজুন (যেমন: বগুড়া, দই, Chittagong, Rasmalai)..."
              className="w-full pl-3 pr-4 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="pr-3 text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Button & Key Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onExploreMapClick}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold bg-[#84CC16] hover:bg-[#72B313] text-[#06241D] shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>ইন্টারেক্টিভ মানচিত্র</span>
          </button>

          {onExploreFoodsClick && (
            <button
              type="button"
              onClick={onExploreFoodsClick}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold bg-[#06241D]/90 hover:bg-[#0C382E] text-white border border-[#84CC16]/50 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#A3E635]" />
              <span>খাদ্য এক্সপ্লোরার</span>
            </button>
          )}

          <Link
            href="/places"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold bg-[#13463B] hover:bg-[#1A5C4E] text-[#A3E635] border border-[#84CC16]/40 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>প্রসিদ্ধ দোকান (Food Places)</span>
          </Link>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#06241D]/60 border border-[#185343] text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span><strong>{totalDistricts}</strong> জেলা তালিকাভুক্ত</span>
          </div>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#06241D]/60 border border-[#185343] text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
            <span><strong>{totalFoods}</strong> ঐতিহ্যবাহী খাবার</span>
          </div>
        </div>
      </div>
    </section>
  );
};
