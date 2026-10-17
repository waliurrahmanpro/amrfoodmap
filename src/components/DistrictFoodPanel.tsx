'use client';

import React from 'react';
import { MapPin, Trophy, Sparkles, CheckCircle, ChevronRight, X } from 'lucide-react';
import { District, Food } from '@/types';
import { FOODS_BY_DISTRICT } from '@/data/foods';
import { calculateDistrictStats } from '@/lib/stats';
import { FoodCard } from './FoodCard';

interface DistrictFoodPanelProps {
  district: District | null;
  triedFoodIds: string[];
  onToggleFood: (foodId: string) => void;
  onClose?: () => void;
  onFoodClick?: (food: Food) => void;
}

export const DistrictFoodPanel: React.FC<DistrictFoodPanelProps> = ({
  district,
  triedFoodIds,
  onToggleFood,
  onClose,
  onFoodClick
}) => {
  if (!district) {
    return (
      <div className="bg-white rounded-3xl border border-[#E6E1D6] p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-[#E6E1D6]">
          <MapPin className="w-8 h-8 opacity-40 text-[#0C382E]" />
        </div>
        <h3 className="text-lg font-bold text-[#0C382E]">কোনো জেলা নির্বাচন করা হয়নি</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          উপরের মানচিত্রে যেকোনো জেলার ওপর ক্লিক করুন বা নিচের জেলা তালিকা থেকে একটি জেলা নির্বাচন করুন।
        </p>
      </div>
    );
  }

  const foods = FOODS_BY_DISTRICT[district.id] || [];
  const stats = calculateDistrictStats(district, triedFoodIds);
  const isAllCompleted = stats.status === 'completed';

  return (
    <div id="district-food-panel" className="bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-md scroll-mt-24">
      {/* District Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E6E1D6]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#13463B] text-[#A3E635]">
              <MapPin className="w-3.5 h-3.5" />
              {district.divisionBn} বিভাগ ({district.division} Division)
            </span>

            {isAllCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#84CC16] text-[#06241D] shadow-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                বিজিত জেলা • 100% Completed
              </span>
            ) : stats.triedFoods > 0 ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                চলমান • {stats.triedFoods}/{stats.totalFoods} খাবার চেখেছেন
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                অনাঘ্রাত জেলা (0/{stats.totalFoods})
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C382E]">
            {district.bnName} ({district.name})
          </h2>

          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {district.description}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="self-end sm:self-start p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#FAF8F5] transition cursor-pointer"
            title="Deselect district"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress banner for district */}
      <div className="my-5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6]">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
          <span className="font-bold text-[#0C382E]">
            {district.bnName} জেলার অগ্রগতি: {stats.triedFoods} / {stats.totalFoods} খাবার খাওয়া হয়েছে
          </span>
          <span className="font-extrabold text-[#0C382E]">{stats.percentage}%</span>
        </div>
        <div className="w-full h-2.5 bg-[#E6E1D6] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0C382E] to-[#84CC16] rounded-full transition-all duration-500"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {/* Celebratory Banner if 100% completed */}
      {isAllCompleted && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#ECFCCB] via-[#D9F99D] to-[#ECFCCB] border border-[#84CC16] flex items-center gap-3 text-[#166534] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#65A30D] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
              অভিনন্দন! আপনি {district.bnName} জেলার সব ঐতিহ্যবাহী খাবারের স্বাদ গ্রহণ করেছেন!
              <Sparkles className="w-4 h-4 text-[#4D7C0F]" />
            </h4>
            <p className="text-xs text-[#166534]/90 mt-0.5">
              এই জেলার খাঁটি স্বাদ আপনার চেনা। পরবর্তী জেলা অন্বেষণ করতে মানচিত্রে অন্য কোনো জেলা বেছে নিন।
            </p>
          </div>
        </div>
      )}

      {/* Food Cards Grid */}
      {foods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              isTried={triedFoodIds.includes(food.id)}
              onToggle={onToggleFood}
              onClick={onFoodClick}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#CBD5CD]">
          <p className="text-sm font-semibold text-slate-600">
            এই জেলার জন্য খাদ্য তথ্য সংকলন ও যাচাই প্রক্রিয়াধীন (Food data coming soon)
          </p>
          <p className="text-xs text-slate-400 mt-1">
            শীঘ্রই আরও নতুন তথ্য যুক্ত করা হবে।
          </p>
        </div>
      )}
    </div>
  );
};
