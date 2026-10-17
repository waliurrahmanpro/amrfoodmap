'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Store, 
  Filter, 
  Sparkles, 
  RotateCcw, 
  Utensils, 
  Navigation, 
  Star, 
  ArrowUpDown, 
  Compass, 
  LayoutGrid, 
  Map as MapIcon,
  X,
  ShieldCheck,
  Award
} from 'lucide-react';
import { FoodPlace, District, Division, FoodCategory, VerificationStatus } from '@/types';
import { FOOD_PLACES } from '@/data/foodPlaces';
import { DISTRICTS, DISTRICT_MAP } from '@/data/districts';
import { FOODS } from '@/data/foods';
import { FoodPlaceCard } from './FoodPlaceCard';
import { InteractiveMap } from './InteractiveMap';

interface FoodPlacesDirectoryProps {
  triedFoodIds: string[];
  onToggleFood?: (foodId: string) => void;
  onViewPlaceDetails: (place: FoodPlace) => void;
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
  { id: 'all', labelBn: 'সব খাবার', labelEn: 'All Foods' },
  { id: 'sweet', labelBn: 'মিষ্টি', labelEn: 'Sweets' },
  { id: 'curry', labelBn: 'তরকারি ও মাংস', labelEn: 'Curry' },
  { id: 'rice', labelBn: 'চাল ও বিরিয়ানি', labelEn: 'Rice' },
  { id: 'bakery', labelBn: 'রুটি ও বেকারি', labelEn: 'Bakery' },
  { id: 'fish', labelBn: 'মাছ', labelEn: 'Fish' },
  { id: 'fruit', labelBn: 'ফলমূল', labelEn: 'Fruit' },
  { id: 'beverage', labelBn: 'চা ও পানীয়', labelEn: 'Beverage' }
];

type SortOption = 'recommended' | 'rating' | 'oldest' | 'name';

export const FoodPlacesDirectory: React.FC<FoodPlacesDirectoryProps> = ({
  triedFoodIds,
  onToggleFood,
  onViewPlaceDetails,
  onToast
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<Division | 'all'>('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const [mapSelectedDistrictId, setMapSelectedDistrictId] = useState<string | null>(null);

  // Filtered districts dropdown options based on selected division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'all') return DISTRICTS;
    return DISTRICTS.filter((d) => d.division === selectedDivision);
  }, [selectedDivision]);

  const handleDivisionChange = (div: Division | 'all') => {
    setSelectedDivision(div);
    if (selectedDistrictId !== 'all') {
      const d = DISTRICT_MAP.get(selectedDistrictId);
      if (div !== 'all' && d && d.division !== div) {
        setSelectedDistrictId('all');
      }
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('all');
    setSelectedDistrictId('all');
    setSelectedCategory('all');
    setSelectedVerification('all');
    setSortBy('recommended');
    setMapSelectedDistrictId(null);
    if (onToast) {
      onToast('info', 'সকল ফিল্টার রিসেট করা হয়েছে');
    }
  };

  const isAnyFilterActive = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedDivision !== 'all' ||
      selectedDistrictId !== 'all' ||
      selectedCategory !== 'all' ||
      selectedVerification !== 'all' ||
      sortBy !== 'recommended' ||
      mapSelectedDistrictId !== null
    );
  }, [searchQuery, selectedDivision, selectedDistrictId, selectedCategory, selectedVerification, sortBy, mapSelectedDistrictId]);

  // Filtered and sorted places computation
  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const result = FOOD_PLACES.filter((place) => {
      const district = DISTRICT_MAP.get(place.districtId);

      // 1. Division filter
      if (selectedDivision !== 'all' && place.division !== selectedDivision) {
        return false;
      }

      // 2. District filter
      if (selectedDistrictId !== 'all' && place.districtId !== selectedDistrictId) {
        return false;
      }

      // 3. Map selected district filter (when in map view or set via map)
      if (mapSelectedDistrictId && place.districtId !== mapSelectedDistrictId) {
        return false;
      }

      // 4. Category filter
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }

      // 5. Verification status
      if (selectedVerification !== 'all' && place.verificationStatus !== selectedVerification) {
        return false;
      }

      // 6. Search query
      if (q) {
        const matchName = place.name.toLowerCase().includes(q);
        const matchBnName = place.bnName.toLowerCase().includes(q);
        const matchAddress = place.address.toLowerCase().includes(q);
        const matchAddressBn = place.addressBn.toLowerCase().includes(q);
        const matchTags = place.tags.some((t) => t.toLowerCase().includes(q));
        const matchDistrictBn = district ? district.bnName.toLowerCase().includes(q) : false;
        const matchDistrictEn = district ? district.name.toLowerCase().includes(q) : false;

        // Check connected foods
        const matchConnectedFoods = place.famousFoodIds.some((id) => {
          const f = FOODS.find((food) => food.id === id);
          if (!f) return false;
          return f.bnName.toLowerCase().includes(q) || f.name.toLowerCase().includes(q);
        });

        if (
          !matchName &&
          !matchBnName &&
          !matchAddress &&
          !matchAddressBn &&
          !matchTags &&
          !matchDistrictBn &&
          !matchDistrictEn &&
          !matchConnectedFoods
        ) {
          return false;
        }
      }

      return true;
    });

    // Sort result
    return result.sort((a, b) => {
      if (sortBy === 'rating') {
        const rA = a.ratingVerified && a.rating ? a.rating : 0;
        const rB = b.ratingVerified && b.rating ? b.rating : 0;
        return rB - rA;
      }
      if (sortBy === 'oldest') {
        const yA = a.establishedYear || 9999;
        const yB = b.establishedYear || 9999;
        return yA - yB;
      }
      if (sortBy === 'name') {
        return a.bnName.localeCompare(b.bnName, 'bn');
      }
      // 'recommended' default: heritage & gi first, then rating
      const score = (p: FoodPlace) => {
        let s = 0;
        if (p.verificationStatus === 'gi-certified') s += 30;
        if (p.verificationStatus === 'heritage-verified') s += 20;
        if (p.ratingVerified && p.rating) s += p.rating * 2;
        return s;
      };
      return score(b) - score(a);
    });
  }, [
    searchQuery,
    selectedDivision,
    selectedDistrictId,
    mapSelectedDistrictId,
    selectedCategory,
    selectedVerification,
    sortBy
  ]);

  // Count of places per district for the map indicator
  const placesCountByDistrict = useMemo(() => {
    const counts: Record<string, number> = {};
    FOOD_PLACES.forEach((p) => {
      counts[p.districtId] = (counts[p.districtId] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div id="food-places-container" className="space-y-6">
      {/* Control Panel Card: Search & Filters */}
      <div className="bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#13463B] text-[#A3E635] mb-2">
              <Store className="w-3.5 h-3.5" />
              <span>ঐতিহ্যবাহী দোকান ও খাবারের ঠিকানা • Food Places Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C382E]">
              প্রসিদ্ধ দোকান ও ভোজনস্থান খুঁজুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বাংলাদেশের ৬৪ জেলার আসল ও শতবর্ষী মিষ্টির দোকান, ঐতিহ্যবাহী রেস্তোরাঁ ও খাদ্য গন্তব্য
            </p>
          </div>

          {/* View Mode Switcher (Grid Cards vs Map Locator) */}
          <div className="inline-flex bg-[#EAE5DC] p-1 rounded-2xl border border-[#E6E1D6] self-start md:self-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#0C382E] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>কার্ড ভিউ (Grid)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#0C382E] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>মানচিত্র ভিউ (Map)</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-5">
          <div className="relative flex items-center shadow-xs rounded-2xl bg-[#FAF8F5] border border-[#CBD5CD] focus-within:border-[#84CC16] focus-within:ring-2 focus-within:ring-[#84CC16]/30 transition-all">
            <div className="pl-4 text-emerald-800">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দোকানের নাম, ঠিকানা, খাবার বা জেলা খুঁজুন (যেমন: আকবরিয়া, এশিয়া সুইটস, হাজী বিরিয়ানি, দই, Nazira Bazar)..."
              className="w-full pl-3 pr-10 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                title="মুছে ফেলুন"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dropdowns Row: District, Category & Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {/* District Dropdown */}
          <div>
            <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>জেলা ফিল্টার (District):</span>
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
                setMapSelectedDistrictId(null);
              }}
              className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-[#FAF8F5] border border-[#CBD5CD] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84CC16] cursor-pointer"
            >
              <option value="all">সকল ৬৪ জেলা (All 64 Districts)</option>
              {availableDistricts.map((d) => {
                const count = placesCountByDistrict[d.id] || 0;
                return (
                  <option key={d.id} value={d.id}>
                    {d.bnName} ({d.name}) {count > 0 ? `— ${count}টি স্থান` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Verification Dropdown */}
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
              <option value="all">সকল অনুমোদন স্ট্যাটাস (All)</option>
              <option value="gi-certified">GI সনদপ্রাপ্ত খাদ্য প্রতিষ্ঠান (GI Certified)</option>
              <option value="heritage-verified">শতবর্ষী ঐতিহ্যবাহী প্রতিষ্ঠান (Heritage)</option>
              <option value="locally-verified">আঞ্চলিক বিশিষ্ট প্রতিষ্ঠান (Locally Verified)</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-800" />
              <span>সাজান (Sort Places):</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-[#FAF8F5] border border-[#CBD5CD] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84CC16] cursor-pointer"
            >
              <option value="recommended">জনপ্রিয় ও ঐতিহ্যবাহী (Recommended)</option>
              <option value="rating">সর্বোচ্চ নির্ভরযোগ্য রেটিং (Highest Rated)</option>
              <option value="oldest">প্রাচীনতম প্রতিষ্ঠিত (Oldest Established First)</option>
              <option value="name">দোকানের নাম অনুসারে (A-Z)</option>
            </select>
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
                  onClick={() => handleDivisionChange(div.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
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
            <span>খাবারের ধরন (Category):</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
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

      {/* Results Count & Reset Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-[#0C382E]">
            {FOOD_PLACES.length}টি খাদ্য স্থানের মধ্যে {filteredPlaces.length}টি প্রদর্শিত হচ্ছে
          </span>
          {isAnyFilterActive && (
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              ফিল্টার প্রয়োগকৃত
            </span>
          )}
          {mapSelectedDistrictId && (
            <span className="text-[11px] font-bold text-white bg-[#0C382E] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span>{DISTRICT_MAP.get(mapSelectedDistrictId)?.bnName} জেলা</span>
              <button
                type="button"
                onClick={() => setMapSelectedDistrictId(null)}
                className="hover:text-red-300 ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}
        </div>

        {isAnyFilterActive && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ফিল্টার রিসেট (Reset All)</span>
          </button>
        )}
      </div>

      {/* MAP VIEW: Bangladesh Interactive District Locator for Places */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E1D6] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0C382E] flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#84CC16]" />
                <span>বাংলাদেশের জেলাভিত্তিক খাদ্য স্থান মানচিত্র (Places Map)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                মানচিত্রে যেকোনো জেলা নির্বাচন করুন সেই জেলার ঐতিহাসিক রেস্তোরাঁ ও মিষ্টির দোকানগুলো দেখতে
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#CBD5CD]">
              <Navigation className="w-3.5 h-3.5 text-emerald-800" />
              <span>সরাসরি দিকনির্দেশনা: গুগল ম্যাপস ইন্টিগ্রেটেড</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Map column */}
            <div className="lg:col-span-7">
              <InteractiveMap
                selectedDistrictId={mapSelectedDistrictId || (selectedDistrictId !== 'all' ? selectedDistrictId : null)}
                onSelectDistrict={(id) => {
                  setMapSelectedDistrictId(id);
                  const d = DISTRICT_MAP.get(id);
                  if (d && onToast) {
                    const count = placesCountByDistrict[id] || 0;
                    onToast('info', `${d.bnName} জেলা নির্বাচিত`, `${count}টি খাবার দোকান তালিকাভুক্ত`);
                  }
                }}
                triedFoodIds={triedFoodIds}
                activeDivision={selectedDivision}
                onToast={onToast}
              />
            </div>

            {/* Places matching selected district */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#CBD5CD]">
                <span className="text-xs font-bold text-[#0C382E] block mb-1">
                  {mapSelectedDistrictId
                    ? `${DISTRICT_MAP.get(mapSelectedDistrictId)?.bnName || ''} জেলার খাদ্য স্থান (${filteredPlaces.length}টি)`
                    : 'মানচিত্রে কোনো জেলা ক্লিক করুন'}
                </span>
                <p className="text-xs text-slate-500">
                  নিচের তালিকায় নির্বাচিত জেলার দোকানগুলো প্রদর্শিত হচ্ছে। বিস্তারিত দেখতে কার্ডে ক্লিক করুন।
                </p>
              </div>

              {filteredPlaces.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {filteredPlaces.map((place) => (
                    <FoodPlaceCard
                      key={place.id}
                      place={place}
                      triedFoodIds={triedFoodIds}
                      onToggleFood={onToggleFood}
                      onViewDetails={onViewPlaceDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#CBD5CD]">
                  <p className="text-xs font-semibold text-slate-600">
                    এই জেলায় বর্তমানে কোনো ঐতিহ্যবাহী দোকান তালিকাভুক্ত নেই।
                  </p>
                  <button
                    type="button"
                    onClick={() => setMapSelectedDistrictId(null)}
                    className="mt-2 text-xs text-emerald-800 hover:underline font-bold"
                  >
                    সকল জেলার দোকান দেখুন →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CARDS GRID VIEW */}
      {viewMode === 'cards' && (
        <>
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-in fade-in duration-200">
              {filteredPlaces.map((place) => (
                <FoodPlaceCard
                  key={place.id}
                  place={place}
                  triedFoodIds={triedFoodIds}
                  onToggleFood={onToggleFood}
                  onViewDetails={onViewPlaceDetails}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-dashed border-[#CBD5CD] p-10 sm:p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-[#CBD5CD]">
                <Store className="w-8 h-8 opacity-40 text-[#0C382E]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0C382E]">
                কোনো খাদ্য স্থান পাওয়া যায়নি
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                আপনার নির্বাচিত ফিল্টারের সাথে মিলিয়ে কোনো ঐতিহ্যবাহী দোকান বা রেস্তোরাঁ পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন বা রিসেট করুন।
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0C382E] text-white hover:bg-[#13463B] transition shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#A3E635]" />
                <span>সকল ফিল্টার রিসেট করুন (Reset Filters)</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
