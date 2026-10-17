'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DashboardStats } from '@/components/DashboardStats';
import { InteractiveMap } from '@/components/InteractiveMap';
import { DistrictFoodPanel } from '@/components/DistrictFoodPanel';
import { DistrictList } from '@/components/DistrictList';
import { FoodExplorer } from '@/components/FoodExplorer';
import { FoodDetailModal } from '@/components/FoodDetailModal';
import { ResetConfirmModal } from '@/components/ResetConfirmModal';
import { ShareModal } from '@/components/ShareModal';
import { Footer } from '@/components/Footer';
import { ToastContainer, ToastMessage } from '@/components/Toast';

import { District, Division, DistrictFilter, Food } from '@/types';
import { DISTRICTS, DISTRICT_MAP } from '@/data/districts';
import { FOODS, FOODS_BY_DISTRICT } from '@/data/foods';
import { storageService } from '@/lib/storage';
import { calculateOverallStats } from '@/lib/stats';
import { fireCelebrationConfetti, fireDistrictCompletedConfetti } from '@/lib/confetti';
import Link from 'next/link';
import { List, Compass, Utensils, Store } from 'lucide-react';

export default function HomePage() {
  const [triedFoodIds, setTriedFoodIds] = useState<string[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>('bogura'); // Default to iconic Bogura
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDivision, setActiveDivision] = useState<Division | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<DistrictFilter>('all');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'map' | 'foods' | 'directory'>('map');
  const [selectedFoodForDetail, setSelectedFoodForDetail] = useState<Food | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast notification helper
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

  // Initialize and load saved progress from localStorage safely
  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = storageService.getStoredProgress();
      setTriedFoodIds(stored.triedFoodIds);
    }, 0);

    // Sync across tabs/windows
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

  // Compute overall stats
  const overallStats = useMemo(() => {
    return calculateOverallStats(triedFoodIds);
  }, [triedFoodIds]);

  // Selected district object
  const selectedDistrict = useMemo(() => {
    return selectedDistrictId ? DISTRICT_MAP.get(selectedDistrictId) || null : null;
  }, [selectedDistrictId]);

  // Toggle food tried status with confetti & district completion detection
  const handleToggleFood = useCallback(
    (foodId: string) => {
      const isCurrentlyTried = triedFoodIds.includes(foodId);
      const updated = storageService.toggleFood(foodId);
      setTriedFoodIds(updated.triedFoodIds);

      const targetFood = FOODS.find((f) => f.id === foodId);
      const foodName = targetFood ? `${targetFood.bnName} (${targetFood.name})` : 'খাবার';

      // If marked as tried (not unchecked), trigger celebration
      if (!isCurrentlyTried) {
        showToast('success', `${foodName}`, 'আপনার স্বাদ গ্রহণ তালিকায় যুক্ত হয়েছে! 🎉');
        fireCelebrationConfetti();

        // Check if this action completed all foods in the district
        if (targetFood) {
          const districtFoods = FOODS_BY_DISTRICT[targetFood.districtId] || [];
          const isDistrictNowComplete = districtFoods.every(
            (f) => f.id === foodId || updated.triedFoodIds.includes(f.id)
          );

          if (isDistrictNowComplete && districtFoods.length > 0) {
            const d = DISTRICT_MAP.get(targetFood.districtId);
            setTimeout(() => {
              fireDistrictCompletedConfetti();
              showToast('success', `🏆 অভিনন্দন! ${d?.bnName || ''} জেলার ১০০% খাবার সম্পন্ন!`, 'আপনি এই জেলার সকল ঐতিহ্যবাহী পদের স্বাদ নিয়েছেন');
            }, 450);
          }
        }
      } else {
        showToast('info', `${foodName}`, 'তালিকা থেকে বাদ দেওয়া হয়েছে।');
      }
    },
    [triedFoodIds, showToast]
  );

  // Select a district and smoothly scroll to the food details panel
  const handleSelectDistrict = useCallback(
    (districtId: string, shouldScroll = true) => {
      setSelectedDistrictId(districtId);
      setActiveTab('map');

      const d = DISTRICT_MAP.get(districtId);
      if (d) {
        showToast('success', `${d.bnName} (${d.name}) নির্বাচিত হয়েছে`, 'খাবার তালিকা নিচে প্রদর্শিত হচ্ছে');
      }

      if (shouldScroll && typeof window !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById('district-food-panel');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 70);
      }
    },
    [showToast]
  );

  const handleResetConfirm = useCallback(() => {
    const reset = storageService.resetProgress();
    setTriedFoodIds(reset.triedFoodIds);
    showToast('success', 'সকল অগ্রগতি সফলভাবে রিসেট করা হয়েছে!');
  }, [showToast]);

  const handleExploreMapClick = useCallback(() => {
    setActiveTab('map');
    showToast('info', 'মানচিত্র বিভাগে স্থানান্তর করা হয়েছে');
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('map-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [showToast]);

  const handleExploreFoodsClick = useCallback(() => {
    setActiveTab('foods');
    showToast('info', 'খাদ্য এক্সপ্লোরার বিভাগে স্থানান্তর করা হয়েছে');
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('food-explorer-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [showToast]);

  // Handle Share click in Header: attempt Web Share API if supported, or open modal
  const handleShareClick = useCallback(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amarfoodmap.bd';
    const shareText = `🍽️ আমি 'আমার ফুড ম্যাপ' (Amar Food Map)-এ বাংলাদেশের ৬৪ জেলার মধ্যে ${overallStats.exploredDistrictsCount}টি জেলার ${overallStats.triedFoodsCount}টি ঐতিহ্যবাহী খাবারের স্বাদ নিয়েছি (${overallStats.overallPercentage}% সম্পন্ন)! আমার পদবি: ${overallStats.explorerLevel.titleBn}।\n\nআপনি কতগুলো খেয়েছেন? আপনার খাদ্য সফর ট্র্যাক করুন: ${origin}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: 'আমার ফুড ম্যাপ • Bangladesh 64 Food Map',
          text: shareText,
          url: origin
        })
        .then(() => {
          showToast('success', 'সফলভাবে শেয়ার করা হয়েছে!');
        })
        .catch((err: unknown) => {
          const error = err as Error;
          if (error.name !== 'AbortError') {
            setIsShareModalOpen(true);
          }
        });
    } else {
      setIsShareModalOpen(true);
    }
  }, [overallStats, showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2723]">
      {/* Sticky Header */}
      <Header
        stats={overallStats}
        onResetClick={() => setIsResetModalOpen(true)}
        onShareClick={handleShareClick}
        onExploreClick={handleExploreMapClick}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExploreMapClick={handleExploreMapClick}
        onExploreFoodsClick={handleExploreFoodsClick}
        totalDistricts={DISTRICTS.length}
        totalFoods={FOODS.length}
      />

      {/* Dashboard Progress Stats */}
      <DashboardStats
        stats={overallStats}
        onFilterSelect={(filter) => {
          setStatusFilter(filter);
        }}
        onToast={showToast}
      />

      {/* Main Interactive Work Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Responsive Primary Navigation Tabs (Desktop & Mobile) */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center bg-[#EAE5DC] p-1.5 rounded-2xl border border-[#E6E1D6] shadow-xs gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('map');
                showToast('info', 'মানচিত্র ও জেলা খাবার মোড সক্রিয়');
              }}
              className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#0C382E] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FAF8F5]'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'map' ? 'text-[#A3E635]' : 'text-emerald-800'}`} />
              <span>মানচিত্র ও জেলা (Map & Districts)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('foods');
                showToast('info', 'খাদ্য এক্সপ্লোরার মোড সক্রিয়');
              }}
              className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'foods'
                  ? 'bg-[#0C382E] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FAF8F5]'
              }`}
            >
              <Utensils className={`w-4 h-4 ${activeTab === 'foods' ? 'text-[#A3E635]' : 'text-emerald-800'}`} />
              <span>খাদ্য এক্সপ্লোরার (Food Explorer)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('directory');
                showToast('info', '৬৪ জেলা ডিরেক্টরি মোড সক্রিয়');
              }}
              className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-[#0C382E] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FAF8F5]'
              }`}
            >
              <List className={`w-4 h-4 ${activeTab === 'directory' ? 'text-[#A3E635]' : 'text-emerald-800'}`} />
              <span>জেলা ডিরেক্টরি (Directory)</span>
            </button>

            <Link
              href="/places"
              className="flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-[#FAF8F5] transition cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-800" />
              <span>খাবারের দোকান (Places) →</span>
            </Link>
          </div>
        </div>

        {/* 1. Map & Selected District Foods View */}
        {activeTab === 'map' && (
          <div id="map-section" className="space-y-8 scroll-mt-24 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Map */}
              <div className="lg:col-span-6 xl:col-span-6">
                <InteractiveMap
                  selectedDistrictId={selectedDistrictId}
                  onSelectDistrict={handleSelectDistrict}
                  triedFoodIds={triedFoodIds}
                  activeDivision={activeDivision}
                  onToast={showToast}
                />
              </div>

              {/* Right Column: Selected District Food Checklist */}
              <div className="lg:col-span-6 xl:col-span-6">
                <DistrictFoodPanel
                  district={selectedDistrict}
                  triedFoodIds={triedFoodIds}
                  onToggleFood={handleToggleFood}
                  onFoodClick={(food) => setSelectedFoodForDetail(food)}
                  onClose={() => {
                    setSelectedDistrictId(null);
                    showToast('info', 'জেলা নির্বাচন বাতিল করা হয়েছে');
                  }}
                />
              </div>
            </div>

            {/* Quick jump to full explorer banner */}
            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0C382E] flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  সকল জেলার ঐতিহ্যবাহী খাবার একসাথে অনুসন্ধান, ফিল্টার ও ব্রাউজ করতে চান?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('foods')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0C382E] hover:bg-[#13463B] text-white flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
              >
                <span>খাদ্য এক্সপ্লোরার খুলুন →</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Full Food Explorer View */}
        {activeTab === 'foods' && (
          <div className="animate-in fade-in duration-200">
            <FoodExplorer
              triedFoodIds={triedFoodIds}
              onToggleFood={handleToggleFood}
              onFoodClick={(food) => setSelectedFoodForDetail(food)}
              onSelectDistrict={(id) => handleSelectDistrict(id, true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onToast={showToast}
            />
          </div>
        )}

        {/* 3. District Directory View */}
        {activeTab === 'directory' && (
          <div id="district-directory" className="scroll-mt-24 animate-in fade-in duration-200">
            <DistrictList
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={(id) => {
                handleSelectDistrict(id, true);
              }}
              triedFoodIds={triedFoodIds}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeDivision={activeDivision}
              onDivisionChange={setActiveDivision}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onToast={showToast}
            />
          </div>
        )}
      </main>

      {/* Food Detail Modal */}
      <FoodDetailModal
        food={selectedFoodForDetail}
        isOpen={!!selectedFoodForDetail}
        onClose={() => setSelectedFoodForDetail(null)}
        isTried={selectedFoodForDetail ? triedFoodIds.includes(selectedFoodForDetail.id) : false}
        onToggleTried={handleToggleFood}
        onSelectDistrict={(distId) => {
          setSelectedFoodForDetail(null);
          handleSelectDistrict(distId, true);
        }}
        onToast={showToast}
      />

      {/* Confirmation & Sharing Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        triedCount={triedFoodIds.length}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        stats={overallStats}
        onImportSuccess={() => {
          const fresh = storageService.getStoredProgress();
          setTriedFoodIds(fresh.triedFoodIds);
          showToast('success', 'অগ্রগতি সফলভাবে লোড করা হয়েছে!');
        }}
        onToast={showToast}
      />

      {/* Global Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
