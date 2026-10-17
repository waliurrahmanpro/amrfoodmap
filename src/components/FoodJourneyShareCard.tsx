'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Download, Share2, Sparkles, User, Check, Trophy, MapPin, Utensils, CheckCircle2, Copy } from 'lucide-react';
import { OverallStats } from '@/lib/stats';

interface FoodJourneyShareCardProps {
  stats: OverallStats;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const FoodJourneyShareCard: React.FC<FoodJourneyShareCardProps> = ({ stats, onToast }) => {
  const [userName, setUserName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [canShareFiles, setCanShareFiles] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load saved display name from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('amar_food_map_username');
      if (savedName) {
        setTimeout(() => setUserName(savedName), 0);
      }

      // Check if browser supports Web Share API with files
      if (typeof navigator !== 'undefined' && typeof navigator.canShare === 'function') {
        try {
          const testFile = new File(['test'], 'test.png', { type: 'image/png' });
          if (navigator.canShare({ files: [testFile] })) {
            setTimeout(() => setCanShareFiles(true), 0);
          }
        } catch {
          // Web share not supported
        }
      }
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 30);
    setUserName(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amar_food_map_username', val);
    }
  };

  // Render high-resolution PNG on Canvas (1200x630)
  const drawCanvas = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      const width = 1200;
      const height = 630;
      canvas.width = width;
      canvas.height = height;

      // 1. Background gradient (Deep forest green)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#041B15');
      bgGrad.addColorStop(0.45, '#0C382E');
      bgGrad.addColorStop(1, '#13463B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative ambient circles
      ctx.save();
      // Top-right radial glow
      const trGlow = ctx.createRadialGradient(1080, 80, 10, 1080, 80, 380);
      trGlow.addColorStop(0, 'rgba(132, 204, 22, 0.18)');
      trGlow.addColorStop(1, 'rgba(132, 204, 22, 0)');
      ctx.fillStyle = trGlow;
      ctx.beginPath();
      ctx.arc(1080, 80, 380, 0, Math.PI * 2);
      ctx.fill();

      // Bottom-left radial glow
      const blGlow = ctx.createRadialGradient(120, 550, 10, 120, 550, 320);
      blGlow.addColorStop(0, 'rgba(16, 185, 129, 0.14)');
      blGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = blGlow;
      ctx.beginPath();
      ctx.arc(120, 550, 320, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Card Outer Border with rounded corners
      ctx.save();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#84CC16';
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(24, 24, width - 48, height - 48, 28);
        ctx.stroke();
      } else {
        ctx.strokeRect(24, 24, width - 48, height - 48);
      }
      ctx.restore();

      // Inner subtle border
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(32, 32, width - 64, height - 64, 22);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Header Top Pill: "আমার Food Map • Bangladesh 64"
      ctx.save();
      ctx.fillStyle = '#06241D';
      ctx.strokeStyle = 'rgba(132, 204, 22, 0.5)';
      ctx.lineWidth = 1.5;
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(60, 56, 320, 38, 19);
        ctx.fill();
        ctx.stroke();
      }
      ctx.font = 'bold 16px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#A3E635';
      ctx.fillText('✦ আমার Food Map • Bangladesh 64', 80, 81);
      ctx.restore();

      // Header Top-Right Pill: Percentage
      ctx.save();
      ctx.fillStyle = '#84CC16';
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(960, 56, 180, 38, 19);
        ctx.fill();
      }
      ctx.font = '900 17px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#06241D';
      ctx.textAlign = 'center';
      ctx.fillText(`${stats.overallPercentage}% সম্পন্ন`, 1050, 81);
      ctx.restore();

      // 5. Main Title & Subtitle
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Segoe UI", system-ui, "Noto Sans Bengali", sans-serif';
      ctx.fillText('My Bangladesh Food Journey', 60, 145);

      ctx.fillStyle = '#A3E635';
      ctx.font = 'bold 20px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillText('আমার বাংলাদেশ খাদ্য সফর • ৬৪ জেলার ঐতিহ্যবাহী স্বাদের মানচিত্র', 60, 180);
      ctx.restore();

      // 6. User Display Name & Explorer Rank
      ctx.save();
      const displayName = userName.trim() ? userName.trim() : 'খাদ্যরসিক পরিব্রাজক (Taste Explorer)';
      ctx.fillStyle = '#ECFCCB';
      ctx.font = 'bold 22px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillText(`অভিযাত্রী: ${displayName}`, 60, 225);

      // Rank Pill
      const rankText = `পদবি: ${stats.explorerLevel.titleBn} (${stats.explorerLevel.titleEn})`;
      ctx.font = '600 15px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      const rankWidth = ctx.measureText(rankText).width + 28;
      ctx.fillStyle = 'rgba(6, 36, 29, 0.9)';
      ctx.strokeStyle = '#84CC16';
      ctx.lineWidth = 1;
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(60, 240, rankWidth, 30, 8);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = '#A3E635';
      ctx.fillText(rankText, 74, 260);
      ctx.restore();

      // 7. Three Key Metric Cards
      const cardY = 295;
      const cardH = 130;
      const cardW = 340;
      const cards = [
        {
          label: 'চেখে দেখা খাবার',
          labelEn: 'Foods Tried',
          val: `${stats.triedFoodsCount} / ${stats.totalFoods}`,
          sub: 'যাচাইকৃত ঐতিহ্যবাহী পদ',
          color: '#84CC16'
        },
        {
          label: 'অন্বেষিত জেলা',
          labelEn: 'Districts Explored',
          val: `${stats.exploredDistrictsCount} / 64`,
          sub: 'অন্তত ১টি খাবার পরখকৃত',
          color: '#A3E635'
        },
        {
          label: 'সম্পূর্ণ বিজিত জেলা',
          labelEn: 'Completed Districts',
          val: `${stats.completedDistrictsCount} / 64`,
          sub: '১০০% খাবার সম্পন্ন',
          color: '#FACC15'
        }
      ];

      cards.forEach((c, idx) => {
        const x = 60 + idx * (cardW + 30);
        ctx.save();
        // Card bg
        ctx.fillStyle = 'rgba(6, 36, 29, 0.85)';
        ctx.strokeStyle = 'rgba(132, 204, 22, 0.35)';
        ctx.lineWidth = 1.5;
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(x, cardY, cardW, cardH, 18);
          ctx.fill();
          ctx.stroke();
        }

        // Card header
        ctx.font = 'bold 14px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
        ctx.fillStyle = '#CBD5CD';
        ctx.fillText(`${c.label} (${c.labelEn})`, x + 20, cardY + 34);

        // Card main value
        ctx.font = '900 36px "Segoe UI", "Noto Sans Bengali", system-ui, sans-serif';
        ctx.fillStyle = c.color;
        ctx.fillText(c.val, x + 20, cardY + 80);

        // Card subtext
        ctx.font = '13px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(c.sub, x + 20, cardY + 110);
        ctx.restore();
      });

      // 8. Visual Progress Bar
      const pY = 450;
      const pW = 1080;
      const pH = 18;
      ctx.save();
      // Track
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(60, pY, pW, pH, 9);
        ctx.fill();
      }

      // Filled portion
      const fillW = Math.max((pW * stats.overallPercentage) / 100, stats.overallPercentage > 0 ? 18 : 0);
      if (fillW > 0) {
        const fillGrad = ctx.createLinearGradient(60, pY, 60 + fillW, pY);
        fillGrad.addColorStop(0, '#0C382E');
        fillGrad.addColorStop(0.5, '#10B981');
        fillGrad.addColorStop(1, '#84CC16');
        ctx.fillStyle = fillGrad;
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(60, pY, fillW, pH, 9);
          ctx.fill();
        }
      }
      ctx.restore();

      // 9. Footer Divider & Watermark Branding
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(60, 495);
      ctx.lineTo(1140, 495);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Footer text left
      ctx.font = 'bold 15px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText('আপনার জেলার খাবার অন্বেষণ ও ট্র্যাক করুন: www.amarfoodmap.bd', 60, 540);

      // Footer subtext left
      ctx.font = '13px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(
        stats.triedFoodsCount === 0
          ? 'স্বাদের অভিযান শুরু করতে প্রস্তুত! মানচিত্র থেকে যেকোনো জেলায় ক্লিক করুন।'
          : `বাংলাদেশের ৬৪ জেলার মধ্যে ${stats.exploredDistrictsCount}টি জেলার ঐতিহ্যবাহী স্বাদ পরখ করা হয়েছে।`,
        60,
        568
      );

      // Footer badge right
      ctx.font = 'bold 15px "Noto Sans Bengali", "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#A3E635';
      ctx.textAlign = 'right';
      ctx.fillText('✦ বাংলাদেশ খাদ্য ঐতিহ্য সংরক্ষণ প্রকল্প', 1140, 540);

      ctx.font = '13px "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Verified BBS & GI Registry Data', 1140, 568);
      ctx.restore();

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }, [stats, userName]);

  // Handle Download PNG
  const handleDownloadPng = async () => {
    try {
      setIsGenerating(true);
      const blob = await drawCanvas();
      if (!blob) throw new Error('Could not generate image');

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const sanitizedName = userName.trim() ? userName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-') : 'journey';
      a.href = url;
      a.download = `my-bangladesh-food-journey-${sanitizedName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (onToast) {
        onToast('success', 'শেয়ার কার্ড (PNG) সফলভাবে ডাউনলোড হয়েছে!', 'আপনার ডিভাইসে ইমেজটি সংরক্ষণ করা হয়েছে');
      }
    } catch {
      if (onToast) {
        onToast('error', 'ইমেজ তৈরিতে সমস্যা হয়েছে', 'অনুগ্রহ করে পুনরায় চেষ্টা করুন');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Share My Journey (Web Share API with image file or fallback text + download)
  const handleShareJourney = async () => {
    try {
      setIsGenerating(true);
      const blob = await drawCanvas();
      if (!blob) throw new Error('Could not generate image');

      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amarfoodmap.bd';
      const displayName = userName.trim() ? `${userName.trim()}-এর` : 'আমার';
      const shareTitle = `My Bangladesh Food Journey • ${displayName} খাদ্য সফর`;
      const shareText = `🍽️ ${displayName} 'আমার ফুড ম্যাপ'-এ বাংলাদেশের ৬৪ জেলার মধ্যে ${stats.exploredDistrictsCount}টি জেলার ${stats.triedFoodsCount}টি ঐতিহ্যবাহী খাবারের স্বাদ গ্রহণ সম্পন্ন (${stats.overallPercentage}%)! অর্জিত পদবি: ${stats.explorerLevel.titleBn}।\n\nআপনার খাদ্য সফর ট্র্যাক করুন: ${origin}`;

      const file = new File([blob], 'my-bangladesh-food-journey.png', { type: 'image/png' });

      // If browser can share image files directly
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          files: [file]
        });
        if (onToast) {
          onToast('success', 'খাদ্যাভিযাত্রা সফলভাবে শেয়ার করা হয়েছে!');
        }
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        // Share text via Web Share API and download the image
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: origin
        });
        handleDownloadPng();
      } else {
        // Fallback: Copy share text to clipboard and trigger PNG download
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
        }
        handleDownloadPng();
        if (onToast) {
          onToast('success', 'ইমেজ ডাউনলোড হয়েছে ও টেক্সট কপি হয়েছে!', 'সোশ্যাল মিডিয়ায় শেয়ার করার জন্য প্রস্তুত');
        }
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name !== 'AbortError') {
        // Fallback to manual download
        handleDownloadPng();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden high-res canvas used for generating the PNG */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* User Display Name Customization Input */}
      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6]">
        <label className="block text-xs font-bold text-[#0C382E] mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-800" />
            <span>কার্ডে প্রদর্শনের জন্য আপনার নাম (ঐচ্ছিক):</span>
          </span>
          <span className="text-[11px] font-normal text-slate-500">Your Name on Card</span>
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            maxLength={30}
            placeholder="আপনার নাম লিখুন (যেমন: সিয়াম আহমেদ, Rahim)..."
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white px-3 py-2 rounded-xl border border-[#CBD5CD] focus:outline-none focus:ring-2 focus:ring-[#84CC16] font-medium"
          />
          {userName && (
            <button
              type="button"
              onClick={() => {
                setUserName('');
                if (typeof window !== 'undefined') localStorage.removeItem('amar_food_map_username');
              }}
              className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              title="Clear Name"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Visual Share Card Interactive Preview (Responsive & Styled) */}
      <div
        id="share-card-preview"
        className="relative overflow-hidden rounded-3xl p-5 sm:p-6 text-white shadow-xl border-2 border-[#84CC16]/60 bg-gradient-to-br from-[#041B15] via-[#0C382E] to-[#13463B] select-none"
      >
        {/* Decorative ambient background rings */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#84CC16]/15 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#06241D]/90 text-[#A3E635] border border-[#84CC16]/40 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#A3E635]" />
            <span>আমার Food Map • Bangladesh 64</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#84CC16] text-[#06241D] shadow-xs">
            {stats.overallPercentage}% সম্পন্ন
          </span>
        </div>

        {/* Card Title */}
        <div className="relative mb-3">
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
            My Bangladesh Food Journey
          </h3>
          <p className="text-xs text-[#A3E635] font-semibold mt-0.5">
            আমার বাংলাদেশ খাদ্য সফর • ৬৪ জেলার ঐতিহ্যবাহী স্বাদ
          </p>
        </div>

        {/* User Name & Rank Banner */}
        <div className="relative mb-4 pb-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#ECFCCB] block">
              অভিযাত্রী: {userName.trim() ? userName.trim() : 'খাদ্যরসিক পরিব্রাজক (Taste Explorer)'}
            </span>
            <span className="text-[11px] text-emerald-200/90 font-medium mt-0.5 inline-block">
              পদবি: <strong>{stats.explorerLevel.titleBn}</strong> ({stats.explorerLevel.titleEn})
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#06241D]/80 border border-[#84CC16]/40 flex items-center justify-center text-[#A3E635]">
            <Trophy className="w-4 h-4" />
          </div>
        </div>

        {/* 3 Metric Preview Grid */}
        <div className="relative grid grid-cols-3 gap-2 text-left mb-4">
          {/* Stat 1 */}
          <div className="p-2.5 rounded-xl bg-[#06241D]/80 border border-[#84CC16]/20">
            <span className="text-[10px] text-slate-300 block font-medium">চেখে দেখা খাবার</span>
            <span className="text-base sm:text-lg font-black text-[#84CC16]">
              {stats.triedFoodsCount} <span className="text-xs font-normal text-slate-400">/ {stats.totalFoods}</span>
            </span>
          </div>

          {/* Stat 2 */}
          <div className="p-2.5 rounded-xl bg-[#06241D]/80 border border-[#84CC16]/20">
            <span className="text-[10px] text-slate-300 block font-medium">অন্বেষিত জেলা</span>
            <span className="text-base sm:text-lg font-black text-[#A3E635]">
              {stats.exploredDistrictsCount} <span className="text-xs font-normal text-slate-400">/ 64</span>
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-2.5 rounded-xl bg-[#06241D]/80 border border-[#84CC16]/20">
            <span className="text-[10px] text-slate-300 block font-medium">সম্পূর্ণ জেলা</span>
            <span className="text-base sm:text-lg font-black text-amber-300">
              {stats.completedDistrictsCount} <span className="text-xs font-normal text-slate-400">/ 64</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-white/15 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#0C382E] via-[#10B981] to-[#84CC16] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(stats.overallPercentage, stats.overallPercentage > 0 ? 3 : 0)}%` }}
          />
        </div>

        {/* Card Footer Branding */}
        <div className="relative flex items-center justify-between text-[10px] text-slate-300/80 pt-1">
          <span>www.amarfoodmap.bd</span>
          <span className="text-[#A3E635] font-semibold">🇧🇩 বাংলাদেশ খাদ্য ঐতিহ্য</span>
        </div>
      </div>

      {/* Main Two Action Buttons: "Share My Journey" and "Download PNG" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Share My Journey Button */}
        <button
          type="button"
          onClick={handleShareJourney}
          disabled={isGenerating}
          className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#84CC16] hover:bg-[#72B313] text-[#06241D] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Share2 className="w-4 h-4 stroke-[2.5]" />
          <span>{isGenerating ? 'কার্ড তৈরি হচ্ছে...' : 'Share My Journey'}</span>
        </button>

        {/* Download PNG Button */}
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={isGenerating}
          className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#0C382E] hover:bg-[#13463B] text-white border border-[#84CC16]/60 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-[#A3E635] stroke-[2.5]" />
          <span>{isGenerating ? 'ডাউনলোড হচ্ছে...' : 'Download PNG'}</span>
        </button>
      </div>
    </div>
  );
};
