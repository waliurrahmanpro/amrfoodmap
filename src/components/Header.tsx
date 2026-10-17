'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, RotateCcw, Share2, Award, MapPin, Store, Compass } from 'lucide-react';
import { OverallStats } from '@/lib/stats';

interface HeaderProps {
  stats: OverallStats;
  onResetClick: () => void;
  onShareClick: () => void;
  onExploreClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onResetClick,
  onShareClick,
  onExploreClick
}) => {
  const pathname = usePathname();
  const isPlacesPage = pathname === '/places';

  return (
    <header className="sticky top-0 z-40 bg-[#0C382E] text-white border-b border-[#185343] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer select-none"
            onClick={onExploreClick}
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#13463B] to-[#06241D] border border-[#84CC16]/40 shadow-inner">
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-[#A3E635]" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#84CC16]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span className="text-[#A3E635]">আমার</span> Food Map
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#13463B] text-[#A3E635] border border-[#84CC16]/30">
                  Bangladesh 64
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium">
                ৬৪ জেলার বিখ্যাত স্বাদের মানচিত্র
              </p>
            </div>
          </Link>

          {/* Navigation Links between Home Map and Food Places */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#06241D]/80 p-1 rounded-2xl border border-[#185343]">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                !isPlacesPage
                  ? 'bg-[#13463B] text-[#A3E635] border border-[#84CC16]/40 shadow-xs'
                  : 'text-emerald-200/80 hover:text-white hover:bg-[#13463B]/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>মানচিত্র ও খাবার (Foods)</span>
            </Link>

            <Link
              href="/places"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                isPlacesPage
                  ? 'bg-[#13463B] text-[#A3E635] border border-[#84CC16]/40 shadow-xs'
                  : 'text-emerald-200/80 hover:text-white hover:bg-[#13463B]/50'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>খাবারের দোকান ও স্থান (Places)</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Link to Places on Mobile if on homepage */}
            <Link
              href={isPlacesPage ? '/' : '/places'}
              className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#13463B] text-[#A3E635] border border-[#84CC16]/40"
            >
              {isPlacesPage ? <Compass className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
              <span>{isPlacesPage ? 'মানচিত্র' : 'দোকান'}</span>
            </Link>

            {/* Explorer Level Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#07251E] border border-[#185343]">
              <Award className="w-4 h-4 text-[#A3E635]" />
              <div className="text-left text-xs">
                <span className="text-emerald-300/80 block leading-tight">পদবি:</span>
                <span className="font-semibold text-white">{stats.explorerLevel.titleBn}</span>
              </div>
            </div>

            {/* Quick stats indicator */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#13463B] text-xs font-semibold text-emerald-100 border border-emerald-700/50">
              <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{stats.exploredDistrictsCount}/64 জেলা</span>
            </div>

            {/* Share / Export */}
            <button
              type="button"
              onClick={onShareClick}
              title="Share or backup progress"
              className="inline-flex items-center justify-center px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-[#13463B] hover:bg-[#1A5C4E] text-white border border-[#276F5E] transition-all focus:outline-none focus:ring-2 focus:ring-[#84CC16] active:scale-95 cursor-pointer shadow-xs gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3E635]" />
              <span className="text-xs">শেয়ার</span>
            </button>

            {/* Reset Progress */}
            <button
              type="button"
              onClick={onResetClick}
              title="Reset checklist progress"
              className="inline-flex items-center justify-center px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-[#06241D] hover:bg-red-950/70 text-emerald-200 hover:text-red-300 border border-[#185343] hover:border-red-800 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95 cursor-pointer shadow-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-xs">রিসেট</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
