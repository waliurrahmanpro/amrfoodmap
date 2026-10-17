'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FoodPlacesDirectory } from '@/components/FoodPlacesDirectory';
import { FoodPlaceDetailModal } from '@/components/FoodPlaceDetailModal';
import { ResetConfirmModal } from '@/components/ResetConfirmModal';
import { ShareModal } from '@/components/ShareModal';
import { ToastContainer, ToastMessage } from '@/components/Toast';

import { FoodPlace } from '@/types';
import { FOOD_PLACES } from '@/data/foodPlaces';
import { FOODS, FOODS_BY_DISTRICT } from '@/data/foods';
import { DISTRICT_MAP } from '@/data/districts';
import { storageService } from '@/lib/storage';
import { calculateOverallStats } from '@/lib/stats';
import { fireCelebrationConfetti, fireDistrictCompletedConfetti } from '@/lib/confetti';
import { Store, Navigation, MapPin, Sparkles, ArrowLeft, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';

export default function FoodPlacesPage() {
  const [triedFoodIds, setTriedFoodIds] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<FoodPlace | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast helper
  const showToast = useCallback(
    (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => {
      const id = Date.now().toString() + Math.random().toString().slice(2, 6);
      setToasts((prev) => [...prev.slice(-3), { id, type, message, subMessage }]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load progress from localStorage safely
  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = storageService.getStoredProgress();
      setTriedFoodIds(stored.triedFoodIds);
    }, 0);

    const handleProgressUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && Array.isArray(customEvent.detail.triedFoodIds)) {
        setTriedFoodIds(customEvent.detail.triedFoodIds);
      }
    };

    window.addEventListener('amar-food-map:progress-updated', handleProgressUpdate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('amar-food-map:progress-updated', handleProgressUpdate);
    };
  }, []);

  // Compute stats
  const overallStats = useMemo(() => {
    return calculateOverallStats(triedFoodIds);
  }, [triedFoodIds]);

  // Handle Mark as Tried toggle from places
  const handleToggleFood = useCallback(
    (foodId: string) => {
      const isCurrentlyTried = triedFoodIds.includes(foodId);
      const updated = storageService.toggleFood(foodId);
      setTriedFoodIds(updated.triedFoodIds);

      const targetFood = FOODS.find((f) => f.id === foodId);
      const foodName = targetFood ? `${targetFood.bnName} (${targetFood.name})` : 'খাবার';

      if (!isCurrentlyTried) {
        showToast('success', `${foodName}`, 'স্বাদ গ্রহণ তালিকায় যুক্ত হয়েছে! 🎉');
        fireCelebrationConfetti();

        if (targetFood) {
          const districtFoods = FOODS_BY_DISTRICT[targetFood.districtId] || [];
          const isDistrictNowComplete = districtFoods.every(
            (f) => f.id === foodId || updated.triedFoodIds.includes(f.id)
          );

          if (isDistrictNowComplete && districtFoods.length > 0) {
            const d = DISTRICT_MAP.get(targetFood.districtId);
            setTimeout(() => {
              fireDistrictCompletedConfetti();
              showToast('success', `🏆 অভিনন্দন! ${d?.bnName || ''} জেলার ১০০% খাবার সম্পন্ন!`);
            }, 450);
          }
        }
      } else {
        showToast('info', `${foodName}`, 'তালিকা থেকে বাদ দেওয়া হয়েছে।');
      }
    },
    [triedFoodIds, showToast]
  );

  const handleResetConfirm = useCallback(() => {
    const reset = storageService.resetProgress();
    setTriedFoodIds(reset.triedFoodIds);
    showToast('success', 'সকল অগ্রগতি সফলভাবে রিসেট করা হয়েছে!');
  }, [showToast]);

  const handleShareClick = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2723]">
      {/* Sticky Header */}
      <Header
        stats={overallStats}
        onResetClick={() => setIsResetModalOpen(true)}
        onShareClick={handleShareClick}
        onExploreClick={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }}
      />

      {/* Hero Banner for Food Places */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0C382E] via-[#0E4337] to-[#124E40] text-white pt-8 pb-10 sm:pt-12 sm:pb-14 shadow-lg">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb / Back to Map link */}
          <div className="mb-4 flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#13463B]/90 hover:bg-[#1A5C4E] text-[#A3E635] border border-[#84CC16]/40 transition shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← মূল মানচিত্রে ফিরে যান (Back to Map)</span>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            বাংলাদেশের <span className="text-[#A3E635] underline decoration-[#84CC16]/50 decoration-wavy decoration-2">ঐতিহ্যবাহী দোকান</span> ও খাবারের ঠিকানা
          </h1>

          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            বগুড়ার আকবরিয়া থেকে নাজিরা বাজারের হাজী বিরিয়ানি, কুমিল্লার মনোহরপুরের আদি মাতৃভাণ্ডার থেকে খুলনার চুকনগর চুইঝাল — ৬৪ জেলার ঐতিহাসিক ভোজনকেন্দ্রের যাচাইকৃত বিবরণ ও গুগল ম্যাপস দিকনির্দেশনা।
          </p>

          {/* Quick Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#06241D]/70 border border-[#185343] text-emerald-200">
              <Store className="w-4 h-4 text-[#A3E635]" />
              <span><strong>{FOOD_PLACES.length}টি</strong> ঐতিহ্যবাহী খাদ্য স্থান</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#06241D]/70 border border-[#185343] text-emerald-200">
              <Navigation className="w-4 h-4 text-[#A3E635]" />
              <span>সরাসরি <strong>Google Maps</strong> দিকনির্দেশনা যুক্ত</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#06241D]/70 border border-[#185343] text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
              <span>শতভাগ <strong>যাচাইকৃত তথ্য</strong> (কোনো কাল্পনিক দোকান নেই)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Directory */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <FoodPlacesDirectory
          triedFoodIds={triedFoodIds}
          onToggleFood={handleToggleFood}
          onViewPlaceDetails={(place) => setSelectedPlace(place)}
          onToast={showToast}
        />
      </main>

      {/* Place Detail Modal */}
      <FoodPlaceDetailModal
        place={selectedPlace}
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
        triedFoodIds={triedFoodIds}
        onToggleFood={handleToggleFood}
        onToast={showToast}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        triedCount={triedFoodIds.length}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        stats={overallStats}
        onImportSuccess={() => {
          const fresh = storageService.getStoredProgress();
          setTriedFoodIds(fresh.triedFoodIds);
          showToast('success', 'অগ্রগতি সফলভাবে পুনরুদ্ধার হয়েছে!');
        }}
        onToast={showToast}
      />

      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
