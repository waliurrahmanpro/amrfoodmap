'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, Award, MapPin, AlertCircle, Utensils, Sparkles, ExternalLink, Info } from 'lucide-react';
import { Food } from '@/types';
import { DISTRICT_MAP } from '@/data/districts';

interface FoodCardProps {
  food: Food;
  isTried: boolean;
  onToggle: (foodId: string) => void;
  onClick?: (food: Food) => void;
  showDistrictBadge?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  isTried, 
  onToggle,
  onClick,
  showDistrictBadge = false
}) => {
  const [imageError, setImageError] = useState(false);
  const district = DISTRICT_MAP.get(food.districtId);

  const getVerificationBadge = () => {
    switch (food.verificationStatus) {
      case 'gi-certified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ECFCCB] text-[#166534] border border-[#84CC16]/40 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#65A30D]" />
            <span>GI সনদপ্রাপ্ত পণ্য (GI Certified)</span>
          </span>
        );
      case 'heritage-verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>ঐতিহ্যবাহী যাচাইকৃত (Heritage Verified)</span>
          </span>
        );
      case 'locally-verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>আঞ্চলিক বিশিষ্টতা (Locally Verified)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>তথ্য যাচাই চলমান (Coming Soon)</span>
          </span>
        );
    }
  };

  const getCategoryBadge = () => {
    const catMap: Record<string, { label: string; bg: string; text: string }> = {
      sweet: { label: 'মিষ্টি (Sweet)', bg: 'bg-rose-50', text: 'text-rose-700' },
      curry: { label: 'তরকারি ও মাংস (Curry)', bg: 'bg-orange-50', text: 'text-orange-700' },
      rice: { label: 'চাল ও বিরিয়ানি (Rice)', bg: 'bg-amber-50', text: 'text-amber-700' },
      fish: { label: 'মাছ ও জলজ (Fish)', bg: 'bg-blue-50', text: 'text-blue-700' },
      bakery: { label: 'রুটি ও বেকারি (Bakery)', bg: 'bg-yellow-50', text: 'text-yellow-800' },
      fruit: { label: 'ফলমূল (Fruit)', bg: 'bg-lime-50', text: 'text-lime-700' },
      beverage: { label: 'পানীয় ও চা (Beverage)', bg: 'bg-teal-50', text: 'text-teal-700' },
      snack: { label: 'পিঠা ও নাস্তা (Snack)', bg: 'bg-purple-50', text: 'text-purple-700' }
    };

    const c = catMap[food.category] || { label: food.category, bg: 'bg-slate-100', text: 'text-slate-700' };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(food);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${
        isTried
          ? 'bg-[#F9FCF8] border-[#84CC16] shadow-sm ring-1 ring-[#84CC16]/30'
          : 'bg-white border-[#E6E1D6] hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Food Card Image Header */}
        <div className="relative w-full h-44 sm:h-48 bg-[#F1EDE4] overflow-hidden">
          {food.imageUrl && !imageError ? (
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0C382E]/10 to-[#84CC16]/10 text-emerald-800 p-4 text-center">
              <Utensils className="w-10 h-10 mb-2 opacity-50 text-[#0C382E]" />
              <span className="font-bold text-sm text-[#0C382E]">{food.bnName}</span>
              <span className="text-xs text-slate-500">{food.name}</span>
            </div>
          )}

          {/* Floating Category Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {getCategoryBadge()}
          </div>

          {/* Tried status indicator pill */}
          {isTried && (
            <div className="absolute top-3 right-3 z-10 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#0C382E] text-[#A3E635] text-xs font-bold shadow-md border border-[#84CC16]/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>চেখেছেন ✓</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {getVerificationBadge()}

            {showDistrictBadge && district && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#13463B] text-white">
                <MapPin className="w-3 h-3 text-[#A3E635]" />
                <span>{district.bnName}</span>
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#0C382E] flex items-baseline gap-1.5 group-hover:text-emerald-900 transition-colors">
            <span>{food.bnName}</span>
            <span className="text-xs font-medium text-slate-500">({food.name})</span>
          </h3>

          <p className="text-xs font-semibold text-emerald-800 mb-2">
            {food.englishTitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {food.description}
          </p>

          {/* Source attribution with clickable reference URL */}
          {food.source && (
            <div className="mb-4 pt-2.5 border-t border-[#F1EDE4] text-[11px] text-slate-500 flex items-start justify-between gap-1">
              <div className="flex items-start gap-1">
                <span className="font-semibold text-slate-700 shrink-0">উৎস:</span>
                {food.sourceUrl ? (
                  <a
                    href={food.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="italic underline text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1 transition-colors"
                    title="যাচাইকৃত তথ্যসূত্র দেখুন (External Source)"
                  >
                    <span>{food.source}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600 shrink-0 inline" />
                  </a>
                ) : (
                  <span className="italic">{food.source}</span>
                )}
              </div>

              {onClick && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(food);
                  }}
                  className="text-[11px] font-bold text-emerald-800 hover:text-[#84CC16] inline-flex items-center gap-0.5 shrink-0 transition"
                >
                  <span>বিস্তারিত</span>
                  <Info className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Tags */}
          {food.tags && food.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {food.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAF8F5] text-slate-600 border border-[#E6E1D6]"
                >
                  #{tag}
                </span>
              ))}
              {food.tags.length > 3 && (
                <span className="text-[10px] text-slate-400 font-medium self-center">
                  +{food.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Checklist Checkbox Button */}
      <div className="p-4 pt-0">
        <button
          type="button"
          role="checkbox"
          aria-checked={isTried}
          aria-label={`${food.bnName} (${food.name}) - ${isTried ? 'স্বাদ নেওয়া সম্পন্ন' : 'স্বাদ গ্রহণ তালিকায় যুক্ত করুন'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(food.id);
          }}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xs active:scale-95 cursor-pointer ${
            isTried
              ? 'bg-[#0C382E] text-white hover:bg-[#13463B] border border-[#84CC16]/50 ring-1 ring-[#84CC16]/30'
              : 'bg-[#FAF8F5] hover:bg-[#84CC16] text-[#0C382E] hover:text-[#06241D] border border-[#CBD5CD] hover:border-[#84CC16]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
              isTried
                ? 'bg-[#84CC16] border-[#84CC16] text-[#06241D]'
                : 'border-slate-400 bg-white'
            }`}
          >
            {isTried && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <span>
            {isTried ? 'খেয়েছি ✓ (I have tried this!)' : 'খেয়েছি (Mark as tried)'}
          </span>
        </button>
      </div>
    </div>
  );
};
