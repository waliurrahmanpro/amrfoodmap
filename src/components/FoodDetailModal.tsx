'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Award, 
  MapPin, 
  AlertCircle, 
  Utensils, 
  Sparkles, 
  ExternalLink,
  Share2,
  Calendar,
  Compass
} from 'lucide-react';
import { Food, District } from '@/types';
import { DISTRICT_MAP } from '@/data/districts';

interface FoodDetailModalProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
  isTried: boolean;
  onToggleTried: (foodId: string) => void;
  onSelectDistrict?: (districtId: string) => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  isOpen,
  onClose,
  isTried,
  onToggleTried,
  onSelectDistrict,
  onToast
}) => {
  const [failedFoodId, setFailedFoodId] = React.useState<string | null>(null);
  const imageError = failedFoodId === food?.id;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !food) return null;

  const district: District | undefined = DISTRICT_MAP.get(food.districtId);

  const getVerificationBadge = () => {
    switch (food.verificationStatus) {
      case 'gi-certified':
        return {
          title: 'GI সনদপ্রাপ্ত পণ্য (GI Certified)',
          badgeClass: 'bg-[#ECFCCB] text-[#166534] border-[#84CC16]/50',
          icon: <ShieldCheck className="w-4 h-4 text-[#65A30D]" />,
          desc: 'বাংলাদেশ সরকারের ডিপার্টমেন্ট অব পেটেন্টস, ডিজাইনস অ্যান্ড ট্রেডমার্কস (DPDT) কর্তৃক জাতীয় ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত।'
        };
      case 'heritage-verified':
        return {
          title: 'ঐতিহ্যবাহী যাচাইকৃত (Heritage Verified)',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <Award className="w-4 h-4 text-emerald-600" />,
          desc: 'জাতীয় রন্ধন ঐতিহ্য রেজিস্ট্রি, ঐতিহাসিক নথিপত্র এবং শতবর্ষী পরম্পরা অনুযায়ী সরকারি বা প্রাতিষ্ঠানিক উৎসে স্বীকৃত।'
        };
      case 'locally-verified':
        return {
          title: 'আঞ্চলিক বিশিষ্টতা (Locally Verified)',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <MapPin className="w-4 h-4 text-amber-600" />,
          desc: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন ও আঞ্চলিক প্রশাসন কর্তৃক চিহ্নিত স্থানীয় ঐতিহ্যবাহী বিশিষ্ট পদ।'
        };
      default:
        return {
          title: 'তথ্য যাচাই প্রক্রিয়াধীন (Verification Pending / Missing)',
          badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
          desc: 'এই খাদ্য পদের বিস্তারিত প্রামাণ্য তথ্য সংগ্রহ ও যাচাই প্রক্রিয়াধীন রয়েছে। কাল্পনিক বা বিভ্রান্তিকর তথ্য এড়াতে এটি প্রক্রিয়াধীন হিসেবে প্রদর্শিত হচ্ছে।'
        };
    }
  };

  const getCategoryLabel = () => {
    const catMap: Record<string, { bn: string; en: string }> = {
      sweet: { bn: 'মিষ্টি', en: 'Sweet' },
      curry: { bn: 'তরকারি ও মাংস', en: 'Curry' },
      rice: { bn: 'চাল ও বিরিয়ানি', en: 'Rice' },
      fish: { bn: 'মাছ ও জলজ', en: 'Fish' },
      bakery: { bn: 'রুটি ও বেকারি', en: 'Bakery' },
      fruit: { bn: 'ফলমূল', en: 'Fruit' },
      beverage: { bn: 'চা ও পানীয়', en: 'Beverage' },
      snack: { bn: 'পিঠা ও নাস্তা', en: 'Snack' },
      other: { bn: 'অন্যান্য পদ', en: 'Other' }
    };
    return catMap[food.category] || { bn: food.category, en: food.category };
  };

  const badgeInfo = getVerificationBadge();
  const categoryInfo = getCategoryLabel();

  const handleDistrictJump = () => {
    if (onSelectDistrict && district) {
      onSelectDistrict(district.id);
      onClose();
      if (onToast) {
        onToast('info', `${district.bnName} জেলা মানচিত্রে প্রদর্শিত হচ্ছে`);
      }
    }
  };

  const handleShareFood = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amarfoodmap.bd';
    const text = `🍽️ ${food.bnName} (${food.englishTitle}) - ${district?.bnName || ''} জেলার ঐতিহ্যবাহী খাবার!\n\nআমার ফুড ম্যাপ-এ বাংলাদেশের ৬৪ জেলার খাবার ঘুরে দেখুন: ${origin}`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${food.bnName} - Amar Food Map`,
          text: text,
          url: origin
        });
        if (onToast) onToast('success', 'খাবারের তথ্য শেয়ার করা হয়েছে!');
      } catch {
        // User cancelled or unsupported
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      if (onToast) onToast('success', 'খাবারের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E6E1D6] shadow-2xl cursor-default my-6 max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Top Navigation Bar with Back & Close */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E6E1D6] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#0C382E] hover:bg-[#EAE5DC] transition cursor-pointer"
            title="ফিরে যান (Back)"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-800" />
            <span>← ফিরে যান (Back)</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
            খাদ্য পরিচিতি ও উৎস বিবরণী (Food Details)
          </span>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#EAE5DC] transition cursor-pointer"
            title="বন্ধ করুন (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Header Image Section */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl bg-[#F1EDE4] overflow-hidden border border-[#E6E1D6]">
            {food.imageUrl && !imageError ? (
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover"
                onError={() => setFailedFoodId(food.id)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0C382E]/10 to-[#84CC16]/10 text-emerald-800 p-6 text-center">
                <Utensils className="w-14 h-14 mb-3 opacity-40 text-[#0C382E]" />
                <span className="font-bold text-lg text-[#0C382E]">{food.bnName}</span>
                <span className="text-sm text-slate-500">{food.name}</span>
              </div>
            )}

            {/* Category Badge on Image */}
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0C382E]/90 text-[#A3E635] backdrop-blur-xs border border-[#84CC16]/50 shadow-md">
                <Utensils className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>{categoryInfo.bn} ({categoryInfo.en})</span>
              </span>
            </div>

            {/* Tried Status Pill on Image */}
            {isTried && (
              <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#84CC16] text-[#06241D] text-xs font-black shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>চেখে দেখা সম্পন্ন ✓</span>
              </div>
            )}
          </div>

          {/* Titles & District Association */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {/* Verification status pill */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeInfo.badgeClass}`}>
                {badgeInfo.icon}
                <span>{badgeInfo.title}</span>
              </span>

              {/* District association badge */}
              {district && (
                <button
                  type="button"
                  onClick={handleDistrictJump}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#13463B] hover:bg-[#1A5C4E] text-white transition cursor-pointer shadow-xs"
                  title={`${district.bnName} জেলা মানচিত্রে নির্বাচন করুন`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>{district.bnName} জেলা ({district.divisionBn} বিভাগ)</span>
                  <Compass className="w-3.5 h-3.5 text-[#A3E635] ml-0.5" />
                </button>
              )}
            </div>

            <h2 id="food-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0C382E] tracking-tight">
              {food.bnName}
            </h2>

            <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-1">
              {food.englishTitle} <span className="text-slate-400 font-normal">({food.name})</span>
            </p>
          </div>

          {/* Description */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6]">
            <h4 className="text-xs font-bold text-[#0C382E] uppercase tracking-wider mb-2">
              ঐতিহ্যিক ও রন্ধন বিবরণ (Culinary Profile)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* Reliable Source & Verification Details */}
          <div className="p-4 sm:p-5 rounded-2xl border bg-white border-[#E6E1D6] shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-[#0C382E] uppercase tracking-wider flex items-center justify-between">
              <span>যাচাইকরণ ও তথ্যসূত্র (Reliable Source & Verification)</span>
              {food.verificationStatus !== 'coming-soon' ? (
                <span className="text-[11px] font-semibold text-emerald-700">যাচাইকৃত নথি ✓</span>
              ) : (
                <span className="text-[11px] font-semibold text-rose-600">যাচাই প্রক্রিয়াধীন ⚠️</span>
              )}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {badgeInfo.desc}
            </p>

            {/* Source Citation with External Link */}
            {food.source && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium">
                  <strong>তথ্যসূত্র:</strong> {food.source}
                </span>

                {food.sourceUrl && (
                  <a
                    href={food.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                  >
                    <span>তথ্যসূত্র যাচাই করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* If missing/unverified, show explicit contribution placeholder notice */}
            {food.verificationStatus === 'coming-soon' && (
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>লক্ষ্য করুন:</strong> এই পদের জন্য এখনো সরকারি গ্যাজেট বা প্রাতিষ্ঠানিক রেফারেন্স সম্পূর্ণ নিশ্চিত করা হয়নি। সঠিক ইতিহাস থাকলে পরবর্তীতে ডাটাবেজ হালনাগাদ করা হবে।
              </div>
            )}
          </div>

          {/* Tags */}
          {food.tags && food.tags.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2">সম্পর্কিত ট্যাগ (Tags):</span>
              <div className="flex flex-wrap gap-1.5">
                {food.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF8F5] text-slate-700 border border-[#CBD5CD]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-5 py-4 bg-[#FAF8F5] border-t border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShareFood}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0C382E] bg-white hover:bg-slate-100 border border-[#CBD5CD] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-emerald-800" />
            <span>শেয়ার করুন (Share)</span>
          </button>

          {/* Large Mark as Tried Button */}
          <button
            type="button"
            onClick={() => onToggleTried(food.id)}
            className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              isTried
                ? 'bg-[#0C382E] text-white hover:bg-[#13463B] border border-[#84CC16]/50'
                : 'bg-[#84CC16] hover:bg-[#72B313] text-[#06241D]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                isTried
                  ? 'bg-[#84CC16] border-[#84CC16] text-[#06241D]'
                  : 'border-slate-800 bg-white text-slate-800'
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
    </div>
  );
};
