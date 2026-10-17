'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Award, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  Utensils, 
  Check, 
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Food, District, Division, FoodCategory, VerificationStatus } from '@/types';
import { FOODS } from '@/data/foods';
import { DISTRICTS, DISTRICT_MAP } from '@/data/districts';
import { FoodCard } from './FoodCard';

interface FoodExplorerProps {
  triedFoodIds: string[];
  onToggleFood: (foodId: string) => void;
  onFoodClick: (food: Food) => void;
  onSelectDistrict: (districtId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

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

const CATEGORIES: { id: FoodCategory | 'all'; labelBn: string; labelEn: string }[] = [
  { id: 'all', labelBn: 'সব ক্যাটাগরি', labelEn: 'All' },
  { id: 'sweet', labelBn: 'মিষ্টি', labelEn: 'Sweet' },
  { id: 'curry', labelBn: 'তরকারি ও মাংস', labelEn: 'Curry' },
  { id: 'rice', labelBn: 'চাল ও বিরিয়ানি', labelEn: 'Rice' },
  { id: 'fish', labelBn: 'মাছ', labelEn: 'Fish' },
  { id: 'fruit', labelBn: 'ফলমূল', labelEn: 'Fruit' },
  { id: 'snack', labelBn: 'নাস্তা ও পিঠা', labelEn: 'Snack' },
  { id: 'bakery', labelBn: 'রুটি ও বেকারি', labelEn: 'Bakery' },
  { id: 'beverage', labelBn: 'চা ও পানীয়', labelEn: 'Beverage' }
];

const VERIFICATION_OPTIONS: { id: VerificationStatus | 'all'; labelBn: string; labelEn: string; icon: string }[] = [
  { id: 'all', labelBn: 'সব স্ট্যাটাস', labelEn: 'All Statuses', icon: '✦' },
  { id: 'gi-certified', labelBn: 'GI সনদপ্রাপ্ত', labelEn: 'GI Certified', icon: '🛡️' },
  { id: 'heritage-verified', labelBn: 'ঐতিহ্যবাহী', labelEn: 'Heritage', icon: '🏆' },
  { id: 'locally-verified', labelBn: 'আঞ্চলিক বিশিষ্টতা', labelEn: 'Locally Verified', icon: '📍' },
  { id: 'coming-soon', labelBn: 'যাচাই প্রক্রিয়াধীন', labelEn: 'Unverified / Pending', icon: '⏳' }
];

type TriedFilter = 'all' | 'tried' | 'untried';

export const FoodExplorer: React.FC<FoodExplorerProps> = ({
  triedFoodIds,
  onToggleFood,
  onFoodClick,
  onSelectDistrict,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  onToast
}) => {
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<Division | 'all'>('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | 'all'>('all');
  const [selectedTriedFilter, setSelectedTriedFilter] = useState<TriedFilter>('all');

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearch;
  const handleSearchChange = (val: string) => {
    if (externalOnSearchChange) {
      externalOnSearchChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  // Filtered districts dropdown options based on selected division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'all') return DISTRICTS;
    return DISTRICTS.filter((d) => d.division === selectedDivision);
  }, [selectedDivision]);

  // If division changes and current district isn't in it, reset district
  const handleDivisionSelect = (div: Division | 'all') => {
    setSelectedDivision(div);
    if (selectedDistrictId !== 'all') {
      const d = DISTRICT_MAP.get(selectedDistrictId);
      if (div !== 'all' && d && d.division !== div) {
        setSelectedDistrictId('all');
      }
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    handleSearchChange('');
    setSelectedDivision('all');
    setSelectedDistrictId('all');
    setSelectedCategory('all');
    setSelectedVerification('all');
    setSelectedTriedFilter('all');
    if (onToast) {
      onToast('info', 'সকল খাদ্য ফিল্টার রিসেট করা হয়েছে');
    }
  };

  const isAnyFilterActive = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedDivision !== 'all' ||
      selectedDistrictId !== 'all' ||
      selectedCategory !== 'all' ||
      selectedVerification !== 'all' ||
      selectedTriedFilter !== 'all'
    );
  }, [searchQuery, selectedDivision, selectedDistrictId, selectedCategory, selectedVerification, selectedTriedFilter]);

  // Main filtered foods computation
  const filteredFoods = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FOODS.filter((food) => {
      const district = DISTRICT_MAP.get(food.districtId);

      // 1. Division filter
      if (selectedDivision !== 'all' && district && district.division !== selectedDivision) {
        return false;
      }

      // 2. District filter
      if (selectedDistrictId !== 'all' && food.districtId !== selectedDistrictId) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory !== 'all' && food.category !== selectedCategory) {
        return false;
      }

      // 4. Verification status filter
      if (selectedVerification !== 'all' && food.verificationStatus !== selectedVerification) {
        return false;
      }

      // 5. Tried checklist filter
      const isTried = triedFoodIds.includes(food.id);
      if (selectedTriedFilter === 'tried' && !isTried) return false;
      if (selectedTriedFilter === 'untried' && isTried) return false;

      // 6. Search query filter
      if (q) {
        const matchBnName = food.bnName.toLowerCase().includes(q);
        const matchName = food.name.toLowerCase().includes(q);
        const matchEnglishTitle = food.englishTitle.toLowerCase().includes(q);
        const matchDesc = food.description.toLowerCase().includes(q);
        const matchTags = food.tags.some((t) => t.toLowerCase().includes(q));
        const matchDistrictBn = district ? district.bnName.toLowerCase().includes(q) : false;
        const matchDistrictEn = district ? district.name.toLowerCase().includes(q) : false;

        if (
          !matchBnName &&
          !matchName &&
          !matchEnglishTitle &&
          !matchDesc &&
          !matchTags &&
          !matchDistrictBn &&
          !matchDistrictEn
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    searchQuery,
    selectedDivision,
    selectedDistrictId,
    selectedCategory,
    selectedVerification,
    selectedTriedFilter,
    triedFoodIds
  ]);

  return (
    <div id="food-explorer-section" className="space-y-6">
      {/* Explorer Header & Search Bar */}
      <div className="bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#13463B] text-[#A3E635] mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>৬৪ জেলার খাদ্য এক্সপ্লোরার • Bangladesh Food Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C382E]">
              বাংলাদেশের ঐতিহ্যবাহী খাবার খুঁজুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              যেকোনো খাবার, জেলা, ক্যাটাগরি বা সনদ স্ট্যাটাস অনুযায়ী অনুসন্ধান ও ফিল্টার করুন
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FAF8F5] text-[#0C382E] border border-[#CBD5CD] shadow-xs">
              মোট খাবার: <strong>{FOODS.length}</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#84CC16] text-[#06241D] shadow-xs">
              চেখে দেখেছেন: <strong>{triedFoodIds.length}</strong>
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-5">
          <div className="relative flex items-center shadow-xs rounded-2xl bg-[#FAF8F5] border border-[#CBD5CD] focus-within:border-[#84CC16] focus-within:ring-2 focus-within:ring-[#84CC16]/30 transition-all">
            <div className="pl-4 text-emerald-800">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="খাবারের নাম, বিবরণ বা জেলার নাম লিখুন (যেমন: চমচম, কাঁচাগোল্লা, বাকরখানি, ইলিশ, Tangail)..."
              className="w-full pl-3 pr-10 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                title="মুছে ফেলুন"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row: District Selector & Tried Status Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {/* 1. District Selector */}
          <div>
            <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>জেলা ফিল্টার (District):</span>
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-[#FAF8F5] border border-[#CBD5CD] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84CC16] cursor-pointer"
            >
              <option value="all">সকল জেলা (All 64 Districts)</option>
              {availableDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.bnName} ({d.name}) — {d.divisionBn}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Verification Status Dropdown */}
          <div>
            <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>যাচাইকরণ স্ট্যাটাস (Verification):</span>
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value as VerificationStatus | 'all')}
              className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-[#FAF8F5] border border-[#CBD5CD] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84CC16] cursor-pointer"
            >
              {VERIFICATION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.labelBn} ({opt.labelEn})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Tried Status Selector */}
          <div>
            <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
              <span>স্বাদ গ্রহণের অবস্থা (Tried Status):</span>
            </label>
            <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#CBD5CD]">
              <button
                type="button"
                onClick={() => setSelectedTriedFilter('all')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  selectedTriedFilter === 'all'
                    ? 'bg-[#0C382E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                সব
              </button>
              <button
                type="button"
                onClick={() => setSelectedTriedFilter('tried')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  selectedTriedFilter === 'tried'
                    ? 'bg-[#84CC16] text-[#06241D] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                চেখেছি ✓
              </button>
              <button
                type="button"
                onClick={() => setSelectedTriedFilter('untried')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  selectedTriedFilter === 'untried'
                    ? 'bg-[#0C382E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                চেখে দেখিনি
              </button>
            </div>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#0C382E] mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>বিভাগ ফিল্টার (Division):</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {DIVISIONS.map((div) => {
              const active = selectedDivision === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleDivisionSelect(div.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                    active
                      ? 'bg-[#0C382E] text-white border border-[#0C382E]'
                      : 'bg-[#FAF8F5] text-slate-700 hover:bg-[#EAE5DC] border border-[#CBD5CD]'
                  }`}
                >
                  {div.nameBn} <span className="text-[10px] font-normal opacity-80">({div.nameEn})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div>
          <label className="block text-xs font-bold text-[#0C382E] mb-2 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-emerald-800" />
            <span>খাবারের ধরন (Food Category):</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                    active
                      ? 'bg-[#84CC16] text-[#06241D] border border-[#84CC16]'
                      : 'bg-[#FAF8F5] text-slate-700 hover:bg-[#EAE5DC] border border-[#CBD5CD]'
                  }`}
                >
                  {cat.labelBn} <span className="text-[10px] font-normal opacity-80">({cat.labelEn})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Status & Active Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-[#0C382E]">
            {FOODS.length}টি খাবারের মধ্যে {filteredFoods.length}টি খাবার প্রদর্শিত হচ্ছে
          </span>
          {isAnyFilterActive && (
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              ফিল্টার প্রয়োগকৃত
            </span>
          )}
        </div>

        {isAnyFilterActive && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সকল ফিল্টার রিসেট করুন (Reset All)</span>
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              isTried={triedFoodIds.includes(food.id)}
              onToggle={onToggleFood}
              onClick={onFoodClick}
              showDistrictBadge={true}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-dashed border-[#CBD5CD] p-10 sm:p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-[#CBD5CD]">
            <Utensils className="w-8 h-8 opacity-40 text-[#0C382E]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0C382E]">
            কোনো খাবার খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            আপনার বর্তমান ফিল্টারের সাথে মিলে এমন কোনো খাদ্য আইটেম পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা রিসেট করুন।
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0C382E] text-white hover:bg-[#13463B] transition shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#A3E635]" />
            <span>ফিল্টার রিসেট করুন (Reset Filters)</span>
          </button>
        </div>
      )}
    </div>
  );
};
