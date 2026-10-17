'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Tag, 
  Star, 
  Store, 
  ExternalLink, 
  Check, 
  Info, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { FoodPlace, Food } from '@/types';
import { DISTRICT_MAP } from '@/data/districts';
import { FOODS } from '@/data/foods';

interface FoodPlaceCardProps {
  place: FoodPlace;
  triedFoodIds: string[];
  onToggleFood?: (foodId: string) => void;
  onViewDetails: (place: FoodPlace) => void;
}

export const FoodPlaceCard: React.FC<FoodPlaceCardProps> = ({
  place,
  triedFoodIds,
  onToggleFood,
  onViewDetails
}) => {
  const [imageError, setImageError] = useState(false);
  const district = DISTRICT_MAP.get(place.districtId);

  // Look up famous foods connected to this place
  const connectedFoods: Food[] = place.famousFoodIds
    .map((id) => FOODS.find((f) => f.id === id))
    .filter((f): f is Food => !!f);

  const primaryFood = connectedFoods[0];
  const isPrimaryTried = primaryFood ? triedFoodIds.includes(primaryFood.id) : false;

  // Directions URL via Google Maps
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${place.name}, ${place.address}`
  )}`;

  const getVerificationBadge = () => {
    switch (place.verificationStatus) {
      case 'gi-certified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFCCB] text-[#166534] border border-[#84CC16]/40 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-[#65A30D]" />
            <span>GI সনদপ্রাপ্ত পদ</span>
          </span>
        );
      case 'heritage-verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Award className="w-3 h-3 text-emerald-600" />
            <span>ঐতিহ্যবাহী প্রতিষ্ঠান</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <MapPin className="w-3 h-3 text-amber-600" />
            <span>আঞ্চলিক বিশিষ্টতা</span>
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onViewDetails(place)}
      className="group relative rounded-2xl bg-white border border-[#E6E1D6] hover:border-emerald-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Header Image */}
        <div className="relative w-full h-48 bg-[#F1EDE4] overflow-hidden">
          {place.imageUrl && !imageError ? (
            <img
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0C382E]/10 to-[#84CC16]/10 text-emerald-800 p-4 text-center">
              <Store className="w-10 h-10 mb-2 opacity-50 text-[#0C382E]" />
              <span className="font-bold text-sm text-[#0C382E]">{place.bnName}</span>
              <span className="text-xs text-slate-500">{place.name}</span>
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {district && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#0C382E]/90 text-white backdrop-blur-xs border border-[#84CC16]/40 shadow-xs">
                <MapPin className="w-3 h-3 text-[#A3E635]" />
                <span>{district.bnName}</span>
              </span>
            )}
            {place.establishedYear && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-700 shadow-xs border border-slate-200">
                <Calendar className="w-3 h-3 text-emerald-700" />
                <span>স্থাপিত: {place.establishedYear}</span>
              </span>
            )}
          </div>

          {/* Rating Badge (only when verified) */}
          {place.ratingVerified && place.rating !== undefined && (
            <div className="absolute top-3 right-3 z-10 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-400 text-[#06241D] text-xs font-black shadow-md border border-amber-300">
              <Star className="w-3.5 h-3.5 fill-current text-[#06241D]" />
              <span>{place.rating.toFixed(1)}</span>
              {place.ratingCount && (
                <span className="text-[10px] font-medium opacity-80">({place.ratingCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            {getVerificationBadge()}
          </div>

          {/* Place & Shop Name */}
          <h3 className="text-lg font-bold text-[#0C382E] group-hover:text-emerald-900 transition-colors leading-snug">
            {place.bnName}
          </h3>
          <p className="text-xs font-medium text-slate-500 mb-2">
            {place.name}
          </p>

          {/* Connected Food Delicacy */}
          {primaryFood && (
            <div className="mb-3 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  বিখ্যাত খাদ্য পদ (Famous Delicacy):
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-900 truncate block">
                  {primaryFood.bnName}
                </span>
              </div>

              {/* Mark as tried quick action */}
              {onToggleFood && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFood(primaryFood.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                    isPrimaryTried
                      ? 'bg-[#0C382E] text-[#A3E635] border border-[#84CC16]/60'
                      : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-[#CBD5CD]'
                  }`}
                  title={`${primaryFood.bnName} চেখে দেখা হিসেবে চিহ্নিত করুন`}
                >
                  <Check className={`w-3 h-3 ${isPrimaryTried ? 'text-[#84CC16] stroke-[3]' : 'text-slate-400'}`} />
                  <span>{isPrimaryTried ? 'খেয়েছি ✓' : 'খেয়েছি?'}</span>
                </button>
              )}
            </div>
          )}

          {/* Address */}
          <p className="text-xs text-slate-600 flex items-start gap-1.5 mb-3 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{place.addressBn}</span>
          </p>

          {/* Opening Hours & Price Range (Only when verified) */}
          <div className="space-y-1.5 pt-2 border-t border-[#F1EDE4] text-[11px] text-slate-600">
            {place.openingHoursVerified && place.openingHours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{place.openingHours}</span>
              </div>
            )}

            {place.priceRangeVerified && place.priceRange ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>মূল্য পরিসীমা: {place.priceRange}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-400 italic">
                <Tag className="w-3.5 h-3.5 opacity-40 shrink-0" />
                <span>মূল্য ঋতু ও পদভেদে পরিবর্তনশীল</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        {/* View Details */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(place);
          }}
          className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#0C382E] border border-[#CBD5CD] flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-emerald-800" />
          <span>বিস্তারিত দেখুন</span>
        </button>

        {/* Get Directions (Google Maps) */}
        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-[#0C382E] hover:bg-[#13463B] text-white border border-[#84CC16]/40 flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs"
          title="গুগল ম্যাপে লোকেশন ও দিকনির্দেশনা দেখুন (Google Maps Directions)"
        >
          <Navigation className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>দিকনির্দেশনা</span>
        </a>
      </div>
    </div>
  );
};
