'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, CheckCircle, Search, Filter, Sparkles, ChevronRight, AlertCircle, X, Utensils, RotateCcw } from 'lucide-react';
import { District, Division, DistrictFilter, FoodCategory } from '@/types';
import { DISTRICTS } from '@/data/districts';
import { FOODS_BY_DISTRICT } from '@/data/foods';
import { calculateDistrictStats } from '@/lib/stats';

const DIVISIONS: { id: Division | 'all'; nameBn: string; nameEn: string }[] = [
  { id: 'all', nameBn: 'সব বিভাগ', nameEn: 'All' },
  { id: 'Dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'Chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { id: 'Rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'Khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
  { id: 'Barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
  { id: 'Sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'Rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur' },
  { id: 'Mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh' }
];

const FOOD_CATEGORIES: { id: FoodCategory | 'all'; labelBn: string; labelEn: string }[] = [
  { id: 'all', labelBn: 'সব খাবার', labelEn: 'All Foods' },
  { id: 'sweet', labelBn: 'মিষ্টি', labelEn: 'Sweets' },
  { id: 'curry', labelBn: 'মাংস ও তরকারি', labelEn: 'Curry' },
  { id: 'rice', labelBn: 'ভাত ও বিরিয়ানি', labelEn: 'Rice & Biryani' },
  { id: 'fish', labelBn: 'মাছ', labelEn: 'Fish' },
  { id: 'fruit', labelBn: 'ফলমূল', labelEn: 'Fruits' },
  { id: 'snack', labelBn: 'নাস্তা ও পিঠা', labelEn: 'Snacks' },
  { id: 'bakery', labelBn: 'রুটি ও বেকারি', labelEn: 'Bakery' },
  { id: 'beverage', labelBn: 'চা ও পানীয়', labelEn: 'Beverages' }
];

interface DistrictListProps {
  selectedDistrictId: string | null;
  onSelectDistrict: (districtId: string) => void;
  triedFoodIds: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeDivision: Division | 'all';
  onDivisionChange: (division: Division | 'all') => void;
  statusFilter: DistrictFilter;
  onStatusFilterChange: (filter: DistrictFilter) => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const DistrictList: React.FC<DistrictListProps> = ({
  selectedDistrictId,
  onSelectDistrict,
  triedFoodIds,
  searchQuery,
  onSearchChange,
  activeDivision,
  onDivisionChange,
  statusFilter,
  onStatusFilterChange,
  onToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');

  // Compute stats for all districts
  const districtStatsList = useMemo(() => {
    return DISTRICTS.map((d) => calculateDistrictStats(d, triedFoodIds));
  }, [triedFoodIds]);

  // Counts for tabs
  const counts = useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let unexplored = 0;

    for (const stat of districtStatsList) {
      if (stat.status === 'completed') completed++;
      else if (stat.status === 'in-progress') inProgress++;
      else unexplored++;
    }

    return {
      all: DISTRICTS.length,
      completed,
      inProgress,
      unexplored
    };
  }, [districtStatsList]);

  // Filter districts based on query, division, status, and food category
  const filteredDistricts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return districtStatsList.filter((stat) => {
      const d = stat.district;
      const districtFoods = FOODS_BY_DISTRICT[d.id] || [];

      // Division filter
      if (activeDivision !== 'all' && d.division !== activeDivision) {
        return false;
      }

      // Status filter
      if (statusFilter === 'explored') {
        if (stat.triedFoods === 0) return false;
      } else if (statusFilter === 'in-progress') {
        if (stat.status !== 'in-progress') return false;
      } else if (statusFilter === 'unexplored') {
        if (stat.status !== 'unexplored') return false;
      }

      // Food category filter
      if (selectedCategory !== 'all') {
        const matchesCat = districtFoods.some((f) => f.category === selectedCategory);
        if (!matchesCat) return false;
      }

      // Search query filter: matches district name, bangla name, division, aliases, food names, titles, categories, and tags
      if (q) {
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesBnName = d.bnName.toLowerCase().includes(q);
        const matchesDivision = d.division.toLowerCase().includes(q) || d.divisionBn.toLowerCase().includes(q);
        const matchesAlias = d.aliases?.some((a) => a.toLowerCase().includes(q));

        const matchesFood = districtFoods.some(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.bnName.toLowerCase().includes(q) ||
            f.englishTitle.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q) ||
            f.tags.some((t) => t.toLowerCase().includes(q))
        );

        if (!matchesName && !matchesBnName && !matchesDivision && !matchesAlias && !matchesFood) {
          return false;
        }
      }

      return true;
    });
  }, [districtStatsList, activeDivision, statusFilter, selectedCategory, searchQuery]);

  return (
    <div className="bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-sm scroll-mt-24">
      {/* Directory Title & Status Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6E1D6]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0C382E] flex items-center gap-2">
            <span>সকল ৬৪ জেলার তালিকা</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#FAF8F5] text-slate-700 border border-[#E6E1D6]">
              {filteredDistricts.length}টি প্রদর্শিত
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            যে কোনো জেলায় ক্লিক করে এর বিস্তারিত ও খাবারের চেকলিস্ট দেখুন
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#E6E1D6]">
          <button
            type="button"
            onClick={() => {
              onStatusFilterChange('all');
              if (onToast) onToast('info', 'সকল জেলার তালিকা প্রদর্শিত হচ্ছে');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0C382E] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            সকল ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => {
              onStatusFilterChange('explored');
              if (onToast) onToast('info', 'অন্বেষিত জেলার ফিল্টার প্রয়োগ করা হয়েছে');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              statusFilter === 'explored'
                ? 'bg-[#0C382E] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            অন্বেষিত ({counts.completed + counts.inProgress})
          </button>
          <button
            type="button"
            onClick={() => {
              onStatusFilterChange('in-progress');
              if (onToast) onToast('info', 'চলমান জেলার ফিল্টার প্রয়োগ করা হয়েছে');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              statusFilter === 'in-progress'
                ? 'bg-[#0C382E] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            চলমান ({counts.inProgress})
          </button>
          <button
            type="button"
            onClick={() => {
              onStatusFilterChange('unexplored');
              if (onToast) onToast('info', 'অনাঘ্রাত জেলার ফিল্টার প্রয়োগ করা হয়েছে');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              statusFilter === 'unexplored'
                ? 'bg-[#0C382E] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            অনাঘ্রাত ({counts.unexplored})
          </button>
        </div>
      </div>

      {/* Directory Search & Division Filters */}
      <div className="py-4 space-y-4 border-b border-[#F1EDE4]">
        {/* Real-time search bar */}
        <div className="relative flex items-center rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] p-1.5 focus-within:ring-2 focus-within:ring-[#84CC16] transition">
          <div className="pl-3 text-emerald-800">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="জেলার নাম বা বিখ্যাত খাবারের পদ দিয়ে খুঁজুন (যেমন: বগুড়া, নাটোর, দই, কালা ভুনা)..."
            className="w-full pl-2.5 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="pr-3 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Division Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-bold text-slate-400 shrink-0 pl-1">বিভাগ:</span>
          {DIVISIONS.map((div) => {
            const isActive = activeDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => {
                  onDivisionChange(div.id);
                  if (onToast) {
                    onToast('info', div.id === 'all' ? 'সকল বিভাগ প্রদর্শিত হচ্ছে' : `${div.nameBn} বিভাগ ফিল্টার করা হয়েছে`);
                  }
                }}
                className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#13463B] text-[#A3E635] shadow-xs ring-1 ring-[#84CC16]'
                    : 'bg-[#FAF8F5] text-slate-600 hover:bg-[#F1EDE4] border border-[#E6E1D6]'
                }`}
              >
                {div.nameBn} ({div.nameEn})
              </button>
            );
          })}
        </div>

        {/* Food Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-bold text-slate-400 shrink-0 pl-1 flex items-center gap-1">
            <Utensils className="w-3 h-3 text-emerald-700" />
            <span>খাবার:</span>
          </span>
          {FOOD_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (onToast) {
                    onToast('info', cat.id === 'all' ? 'সকল খাবারের পদ প্রদর্শিত হচ্ছে' : `${cat.labelBn} পদের জেলা ফিল্টার করা হয়েছে`);
                  }
                }}
                className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0C382E] text-[#A3E635] shadow-xs ring-1 ring-[#84CC16]'
                    : 'bg-[#FAF8F5] text-slate-600 hover:bg-[#F1EDE4] border border-[#E6E1D6]'
                }`}
              >
                {cat.labelBn} ({cat.labelEn})
              </button>
            );
          })}
        </div>

        {/* Active Filters Clear Bar (when any filter is active) */}
        {(searchQuery || activeDivision !== 'all' || statusFilter !== 'all' || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between pt-1 text-xs border-t border-[#F1EDE4]">
            <span className="text-slate-500 font-medium">
              সক্রিয় ফিল্টার: <strong className="text-[#0C382E]">{filteredDistricts.length}টি জেলা</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onDivisionChange('all');
                onStatusFilterChange('all');
                setSelectedCategory('all');
                if (onToast) onToast('info', 'সকল ফিল্টার রিসেট করা হয়েছে');
              }}
              className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার রিসেট (Reset Filters)</span>
            </button>
          </div>
        )}
      </div>

      {/* District Cards Grid */}
      <div className="mt-6">
        {filteredDistricts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDistricts.map((stat) => {
              const d = stat.district;
              const isSelected = selectedDistrictId === d.id;
              const foods = FOODS_BY_DISTRICT[d.id] || [];

              return (
                <div
                  key={d.id}
                  onClick={() => onSelectDistrict(d.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectDistrict(d.id);
                    }
                  }}
                  className={`group rounded-2xl p-4 border cursor-pointer transition-all duration-200 flex flex-col justify-between text-left ${
                    isSelected
                      ? 'bg-[#FAFDF9] border-[#84CC16] ring-2 ring-[#84CC16]/50 shadow-md'
                      : stat.status === 'completed'
                      ? 'bg-[#F9FCF8] border-emerald-300 hover:border-emerald-500 hover:shadow-sm'
                      : 'bg-[#FAF8F5] hover:bg-white border-[#E6E1D6] hover:border-[#CBD5CD] hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Header with Division & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {d.divisionBn}
                      </span>

                      {stat.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#ECFCCB] px-2 py-0.5 rounded-full border border-[#84CC16]/40">
                          <CheckCircle className="w-3 h-3 text-[#65A30D]" />
                          সম্পন্ন
                        </span>
                      ) : stat.status === 'in-progress' ? (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {stat.triedFoods}/{stat.totalFoods} চেখেছেন
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          অনাঘ্রাত
                        </span>
                      )}
                    </div>

                    {/* District Name */}
                    <h3 className="text-base font-bold text-[#0C382E] group-hover:text-[#13463B] flex items-center justify-between">
                      <span>{d.bnName}</span>
                      <span className="text-xs font-normal text-slate-500">({d.name})</span>
                    </h3>

                    {/* Featured Food Names Preview */}
                    <div className="mt-2 text-xs text-slate-600 line-clamp-1">
                      {foods.length > 0 ? (
                        <span>
                          <strong>খাবার:</strong> {foods.map((f) => f.bnName).join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">তথ্য সংকলন প্রক্রিয়াধীন</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar & Select Action Button */}
                  <div className="mt-4 pt-3 border-t border-[#E6E1D6]/70">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                      <span>অগ্রগতি: {stat.percentage}%</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDistrict(d.id);
                        }}
                        className="inline-flex items-center text-[#0C382E] font-bold group-hover:text-[#84CC16] group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        খাবার দেখুন <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>

                    <div className="w-full h-1.5 bg-[#E6E1D6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0C382E] to-[#84CC16] rounded-full transition-all duration-300"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-12 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#CBD5CD] p-6">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-[#0C382E]">কোনো জেলা খুঁজে পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              &quot;{searchQuery}&quot; দিয়ে কোনো ফলাফল মেলেনি। বানান পরীক্ষা করুন অথবা ফিল্টার পরিবর্তন করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onDivisionChange('all');
                onStatusFilterChange('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0C382E] text-white hover:bg-[#13463B] transition cursor-pointer"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
