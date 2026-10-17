'use client';

import React from 'react';
import { MapPin, Utensils, CheckCircle2, Trophy, Flame } from 'lucide-react';
import { OverallStats } from '@/lib/stats';

interface DashboardStatsProps {
  stats: OverallStats;
  onFilterSelect?: (filter: 'all' | 'explored' | 'in-progress' | 'unexplored') => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, onFilterSelect, onToast }) => {
  const handleCardClick = (filter: 'all' | 'explored' | 'in-progress' | 'unexplored') => {
    if (onFilterSelect) {
      onFilterSelect(filter);
    }
    if (onToast) {
      const labels = {
        all: 'সকল জেলা',
        explored: 'অন্বেষিত জেলা',
        'in-progress': 'চলমান জেলা',
        unexplored: 'অনাঘ্রাত জেলা'
      };
      onToast('info', `${labels[filter]} তালিকায় স্ক্রল করা হয়েছে`);
    }
    if (typeof window !== 'undefined') {
      const el = document.getElementById('district-directory');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white border-y border-[#E6E1D6] py-6 sm:py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar & Explorer Level Banner */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-6 border border-[#E6E1D6] mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0C382E] text-[#A3E635] flex items-center justify-center font-bold shadow-sm">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0C382E]">
                    আপনার খাদ্যাভিযাত্রার অগ্রগতি • Taste Journey
                  </h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${stats.explorerLevel.badgeColor}`}>
                    {stats.explorerLevel.titleBn} ({stats.explorerLevel.titleEn})
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {stats.triedFoodsCount === 0
                    ? 'যেকোনো জেলার খাবারে টিক চিহ্ন দিয়ে আপনার যাত্রা শুরু করুন!'
                    : `আপনি ইতিমধ্যে ${stats.triedFoodsCount}টি ঐতিহ্যবাহী খাবারের স্বাদ গ্রহণ করেছেন!`}
                </p>
              </div>
            </div>

            <div className="flex items-baseline space-x-1.5 self-end sm:self-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0C382E]">
                {stats.overallPercentage}%
              </span>
              <span className="text-xs font-semibold text-slate-500">সম্পন্ন</span>
            </div>
          </div>

          {/* Animated gradient progress bar */}
          <div className="relative w-full h-3.5 bg-[#E6E1D6] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#0C382E] via-[#155E4A] to-[#84CC16] rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${Math.max(stats.overallPercentage, 1)}%` }}
            />
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Explored Districts */}
          <div
            onClick={() => handleCardClick('explored')}
            role="button"
            tabIndex={0}
            className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 border border-[#E6E1D6] transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                অন্বেষিত জেলা
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0C382E]">
                {stats.exploredDistrictsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 64 জেলা</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              অন্তত ১টি খাবার পরখ করেছেন (ফিল্টার)
            </p>
          </div>

          {/* Foods Tried */}
          <div
            onClick={() => handleCardClick('explored')}
            role="button"
            tabIndex={0}
            className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 border border-[#E6E1D6] transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                চেখে দেখা খাবার
              </span>
              <div className="w-8 h-8 rounded-lg bg-lime-100 text-lime-800 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0C382E]">
                {stats.triedFoodsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ {stats.totalFoods} পদ</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              চেকলিস্টে টিক দেওয়া পদ
            </p>
          </div>

          {/* Completed Districts */}
          <div
            onClick={() => handleCardClick('explored')}
            role="button"
            tabIndex={0}
            className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 border border-[#E6E1D6] transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                সম্পূর্ণ বিজিত জেলা
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0C382E]">
                {stats.completedDistrictsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 64 জেলা</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              সব খাবার খাওয়া সম্পন্ন
            </p>
          </div>

          {/* Unexplored Districts */}
          <div
            onClick={() => handleCardClick('unexplored')}
            role="button"
            tabIndex={0}
            className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 border border-[#E6E1D6] transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                বাকি জেলা
              </span>
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0C382E]">
                {stats.totalDistricts - stats.exploredDistrictsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">জেলা বাকি</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              অভিযাত্রার অপেক্ষায় (ফিল্টার)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
