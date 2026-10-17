'use client';

import React, { useEffect, useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Clock, 
  Tag, 
  Star, 
  Store, 
  Calendar, 
  Check, 
  ExternalLink, 
  Copy, 
  Share2, 
  ShieldCheck,
  Award,
  Utensils
} from 'lucide-react';
import { FoodPlace, Food } from '@/types';
import { DISTRICT_MAP } from '@/data/districts';
import { FOODS } from '@/data/foods';

interface FoodPlaceDetailModalProps {
  place: FoodPlace | null;
  isOpen: boolean;
  onClose: () => void;
  triedFoodIds: string[];
  onToggleFood?: (foodId: string) => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const FoodPlaceDetailModal: React.FC<FoodPlaceDetailModalProps> = ({
  place,
  isOpen,
  onClose,
  triedFoodIds,
  onToggleFood,
  onToast
}) => {
  const [failedPlaceId, setFailedPlaceId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const imageError = failedPlaceId === place?.id;

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

  if (!isOpen || !place) return null;

  const district = DISTRICT_MAP.get(place.districtId);
  const connectedFoods: Food[] = place.famousFoodIds
    .map((id) => FOODS.find((f) => f.id === id))
    .filter((f): f is Food => !!f);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${place.name}, ${place.address}`
  )}`;

  const handleCopyAddress = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${place.bnName}\n${place.addressBn}`);
        setCopiedAddress(true);
        if (onToast) onToast('success', 'ঠিকানা ক্লিপবোর্ডে কপি করা হয়েছে!');
        setTimeout(() => setCopiedAddress(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  const handleSharePlace = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amarfoodmap.bd';
    const text = `🍽️ ${place.bnName} (${place.name}) - ${district?.bnName || ''} জেলার ঐতিহ্যবাহী খাদ্য গন্তব্য!\nঠিকানা: ${place.addressBn}\nদিকনির্দেশনা: ${googleMapsDirectionsUrl}\n\nআমার ফুড ম্যাপ-এ আরও অন্বেষণ করুন: ${origin}/places`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${place.bnName} - Amar Food Map`,
          text: text,
          url: googleMapsDirectionsUrl
        });
        if (onToast) onToast('success', 'স্থানটি শেয়ার করা হয়েছে!');
      } catch {
        // user cancelled
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      if (onToast) onToast('success', 'লিংক ও বিবরণ ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  const getVerificationBadge = () => {
    switch (place.verificationStatus) {
      case 'gi-certified':
        return {
          title: 'GI সনদপ্রাপ্ত খাদ্য স্থান (GI Certified Place)',
          badgeClass: 'bg-[#ECFCCB] text-[#166534] border-[#84CC16]/50',
          icon: <ShieldCheck className="w-4 h-4 text-[#65A30D]" />,
          desc: 'এই স্থানটি জাতীয় ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত খাদ্য প্রস্তুতকারক হিসেবে জেলা প্রশাসন ও রেজিস্ট্রি কর্তৃক স্বীকৃত।'
        };
      case 'heritage-verified':
        return {
          title: 'শতবর্ষী ঐতিহ্যবাহী প্রতিষ্ঠান (Heritage Verified)',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <Award className="w-4 h-4 text-emerald-600" />,
          desc: 'স্থানীয় ও জাতীয় ইতিহাস, গ্যাজেট এবং ঐতিহ্যিক নথিপত্রে শতবর্ষী পরম্পরায় প্রামাণ্যভাবে নথিভুক্ত প্রতিষ্ঠান।'
        };
      default:
        return {
          title: 'আঞ্চলিক বিশিষ্ট খাদ্য স্থান (Locally Verified)',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <MapPin className="w-4 h-4 text-amber-600" />,
          desc: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন ও আঞ্চলিক প্রশাসন কর্তৃক চিহ্নিত স্থানীয় ঐতিহ্যবাহী বিশিষ্ট খাদ্য কেন্দ্র।'
        };
    }
  };

  const badgeInfo = getVerificationBadge();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="place-modal-title"
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
            ঐতিহ্যবাহী খাদ্য গন্তব্য (Place Details)
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Hero Image Section */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl bg-[#F1EDE4] overflow-hidden border border-[#E6E1D6]">
            {place.imageUrl && !imageError ? (
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover"
                onError={() => setFailedPlaceId(place.id)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0C382E]/10 to-[#84CC16]/10 text-emerald-800 p-6 text-center">
                <Store className="w-14 h-14 mb-3 opacity-40 text-[#0C382E]" />
                <span className="font-bold text-lg text-[#0C382E]">{place.bnName}</span>
                <span className="text-sm text-slate-500">{place.name}</span>
              </div>
            )}

            {/* Badges on Image */}
            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
              {district && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0C382E]/90 text-[#A3E635] backdrop-blur-xs border border-[#84CC16]/50 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>{district.bnName} ({district.divisionBn})</span>
                </span>
              )}
            </div>

            {/* Verified Rating Pill on Image */}
            {place.ratingVerified && place.rating !== undefined && (
              <div className="absolute top-3.5 right-3.5 flex items-center space-x-1 px-3 py-1.5 rounded-full bg-amber-400 text-[#06241D] text-xs font-black shadow-md border border-amber-300">
                <Star className="w-3.5 h-3.5 fill-current text-[#06241D]" />
                <span>{place.rating.toFixed(1)} রেটিং</span>
                {place.ratingCount && (
                  <span className="text-[10px] font-semibold opacity-80">({place.ratingCount}+ রিভিউ)</span>
                )}
              </div>
            )}
          </div>

          {/* Titles & Heritage Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeInfo.badgeClass}`}>
                {badgeInfo.icon}
                <span>{badgeInfo.title}</span>
              </span>

              {place.establishedYear && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-[#CBD5CD] shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>ঐতিহাসিক প্রতিষ্ঠাকাল: {place.establishedYear}</span>
                </span>
              )}
            </div>

            <h2 id="place-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0C382E] tracking-tight">
              {place.bnName}
            </h2>
            <p className="text-sm font-semibold text-emerald-800 mt-1">
              {place.name}
            </p>
          </div>

          {/* Place Description */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6]">
            <h4 className="text-xs font-bold text-[#0C382E] uppercase tracking-wider mb-2">
              ঐতিহাসিক পটভূমি ও বিশিষ্টতা (Heritage & Profile)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Practical Info: Address, Hours, Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Address Box */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0C382E] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>যাচাইকৃত ঠিকানা (Address):</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-[#65A30D]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAddress ? 'কপি হয়েছে' : 'ঠিকানা কপি'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {place.addressBn}
              </p>
              <p className="text-[11px] text-slate-500">
                {place.address}
              </p>
            </div>

            {/* Opening Hours */}
            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs space-y-1">
              <span className="text-xs font-bold text-[#0C382E] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-800" />
                <span>খোলার সময় (Hours):</span>
              </span>
              {place.openingHoursVerified && place.openingHours ? (
                <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                  {place.openingHours}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  সময়সূচি পরিবর্তনশীল বা আনুষ্ঠানিক যাচাই চলমান
                </p>
              )}
            </div>

            {/* Price Range */}
            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs space-y-1">
              <span className="text-xs font-bold text-[#0C382E] uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-800" />
                <span>মূল্য পরিসীমা (Price Range):</span>
              </span>
              {place.priceRangeVerified && place.priceRange ? (
                <p className="text-xs sm:text-sm text-emerald-900 font-bold">
                  {place.priceRange}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  মৌসুম ও আকারভেদে বাজারমূল্য পরিবর্তনশীল
                </p>
              )}
            </div>
          </div>

          {/* Connected Foods Section with "Mark as Tried" checklist */}
          {connectedFoods.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-3">
              <h4 className="text-xs font-bold text-[#0C382E] uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-800" />
                <span>এই স্থানের ঐতিহ্যবাহী বিখ্যাত খাবার (Signature Delicacies):</span>
              </h4>

              <div className="space-y-2">
                {connectedFoods.map((food) => {
                  const isTried = triedFoodIds.includes(food.id);
                  return (
                    <div
                      key={food.id}
                      className="p-3 bg-white rounded-xl border border-[#CBD5CD] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-extrabold text-[#0C382E] block truncate">
                          {food.bnName}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {food.englishTitle}
                        </span>
                      </div>

                      {onToggleFood && (
                        <button
                          type="button"
                          onClick={() => onToggleFood(food.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0 ${
                            isTried
                              ? 'bg-[#0C382E] text-white hover:bg-[#13463B] border border-[#84CC16]/60'
                              : 'bg-[#84CC16] hover:bg-[#72B313] text-[#06241D]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                              isTried ? 'bg-[#84CC16] border-[#84CC16] text-[#06241D]' : 'border-slate-700 bg-white'
                            }`}
                          >
                            {isTried && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{isTried ? 'খেয়েছি ✓' : 'খেয়েছি (Mark as tried)'}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Verification & Source Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#E6E1D6] space-y-2 text-xs">
            <span className="font-bold text-[#0C382E] block uppercase tracking-wider">
              তথ্যসূত্র ও অনুমোদন (Reliable Source & Verification)
            </span>
            <p className="text-slate-600 leading-relaxed">
              {badgeInfo.desc}
            </p>
            {place.source && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-500">
                  <strong>উৎস:</strong> {place.source}
                </span>
                {place.sourceUrl && (
                  <a
                    href={place.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-semibold underline"
                  >
                    <span>অফিসিয়াল তথ্য দেখুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-5 py-4 bg-[#FAF8F5] border-t border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSharePlace}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0C382E] bg-white hover:bg-slate-100 border border-[#CBD5CD] flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-800" />
              <span>শেয়ার করুন</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Google Maps Directions */}
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm bg-[#0C382E] hover:bg-[#13463B] text-white border border-[#84CC16]/50 flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
            >
              <Navigation className="w-4 h-4 text-[#A3E635]" />
              <span>গুগল ম্যাপে দিকনির্দেশনা (Get Directions)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
