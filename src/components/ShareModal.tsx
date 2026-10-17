'use client';

import React, { useState, useRef } from 'react';
import { Share2, Copy, Download, Upload, Check, X, Smartphone, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { OverallStats } from '@/lib/stats';
import { storageService } from '@/lib/storage';
import { FoodJourneyShareCard } from './FoodJourneyShareCard';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: OverallStats;
  onImportSuccess: () => void;
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  stats,
  onImportSuccess,
  onToast
}) => {
  const [copied, setCopied] = useState(false);
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [showBackupSection, setShowBackupSection] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://amarfoodmap.bd';
  const shareText = `🍽️ আমি 'আমার ফুড ম্যাপ' (Amar Food Map)-এ বাংলাদেশের ৬৪ জেলার মধ্যে ${stats.exploredDistrictsCount}টি জেলার ${stats.triedFoodsCount}টি ঐতিহ্যবাহী খাবারের স্বাদ নিয়েছি (${stats.overallPercentage}% সম্পন্ন)! আমার পদবি: ${stats.explorerLevel.titleBn}।\n\nআপনি কতগুলো খেয়েছেন? আপনার খাদ্য সফর ট্র্যাক করুন: ${currentOrigin}`;

  const handleCopyText = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        if (onToast) {
          onToast('success', 'শেয়ার বার্তা ক্লিপবোর্ডে কপি করা হয়েছে!');
        }
        setTimeout(() => setCopied(false), 3000);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      setShowManualCopy(true);
      if (onToast) {
        onToast('warning', 'সরাসরি ক্লিপবোর্ড অ্যাক্সেস মেলেনি', 'নিচের টেক্সট বক্স থেকে বার্তাটি কপি করে নিন');
      }
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.select();
        }
      }, 100);
    }
  };

  const handleSelectAllText = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        if (onToast) {
          onToast('success', 'টেক্সট কপি হয়েছে!');
        }
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // fallback
      }
    }
  };

  const handleDownloadBackup = () => {
    try {
      const jsonStr = storageService.exportBackup();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amar-food-map-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (onToast) {
        onToast('success', 'ব্যাকআপ ফাইল ডাউনলোড হয়েছে', 'JSON ফাইলটি নিরাপদে সংরক্ষণ করুন');
      }
    } catch {
      if (onToast) {
        onToast('error', 'ব্যাকআপ ডাউনলোড ব্যর্থ হয়েছে');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.importBackup(content);
      if (success) {
        setImportError(null);
        if (onToast) {
          onToast('success', 'ব্যাকআপ সফলভাবে পুনরুদ্ধার করা হয়েছে!');
        }
        onImportSuccess();
        onClose();
      } else {
        setImportError('ব্যাকআপ ফাইলটি সঠিক নয়। অনুগ্রহ করে একটি বৈধ JSON ফাইল নির্বাচন করুন।');
        if (onToast) {
          onToast('error', 'ব্যাকআপ ফাইলটি সঠিক নয়');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E6E1D6] p-5 sm:p-7 shadow-2xl cursor-default my-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-[#FAF8F5] rounded-xl transition cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4 pr-8">
          <div className="w-10 h-10 rounded-2xl bg-[#0C382E] text-[#A3E635] flex items-center justify-center shadow-xs shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0C382E]">
              ফুড জার্নি শেয়ার কার্ড (Food Journey Share Card)
            </h3>
            <p className="text-xs text-slate-500">
              Download PNG & Share Your Culinary Journey
            </p>
          </div>
        </div>

        {/* 1. Food Journey Share Card (Preview, Name Customization & Download/Share Buttons) */}
        <FoodJourneyShareCard stats={stats} onToast={onToast} />

        {/* 2. Text Summary Copy Fallback Option */}
        <div className="mt-5 pt-4 border-t border-[#E6E1D6]">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C382E] hover:text-[#84CC16] transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'টেক্সট কপি হয়েছে ✓' : 'শেয়ার করার টেক্সট কপি করুন (Copy Text)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowManualCopy(!showManualCopy)}
              className="text-[11px] text-slate-500 hover:text-slate-700 underline cursor-pointer"
            >
              {showManualCopy ? 'টেক্সট লুকান' : 'টেক্সট দেখুন'}
            </button>
          </div>

          {/* Visible Fallback Textarea if clipboard unavailable or requested */}
          {showManualCopy && (
            <div className="mb-4 p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] animate-in fade-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  শেয়ার বিবরণী:
                </span>
                <button
                  type="button"
                  onClick={handleSelectAllText}
                  className="text-xs font-bold text-[#0C382E] hover:text-[#84CC16] underline cursor-pointer"
                >
                  সব টেক্সট নির্বাচন ও কপি
                </button>
              </div>
              <textarea
                ref={textareaRef}
                readOnly
                value={shareText}
                rows={3}
                className="w-full text-xs text-slate-700 bg-white p-2 rounded-lg border border-[#E6E1D6] focus:outline-none focus:ring-1 focus:ring-[#84CC16] resize-none"
              />
            </div>
          )}
        </div>

        {/* 3. Collapsible Data Backup & Restore Section */}
        <div className="mt-3 pt-3 border-t border-[#E6E1D6]">
          <button
            type="button"
            onClick={() => setShowBackupSection(!showBackupSection)}
            className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer py-1"
          >
            <span>ডেটা ব্যাকআপ ও রিস্টোর (JSON Backup & Restore)</span>
            {showBackupSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showBackupSection && (
            <div className="mt-3 space-y-3 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-[#FAF8F5] hover:bg-[#F1EDE4] border border-[#E6E1D6] flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-800" />
                  <span>ব্যাকআপ ডাউনলোড (JSON)</span>
                </button>

                <label className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-[#FAF8F5] hover:bg-[#F1EDE4] border border-[#E6E1D6] flex items-center justify-center gap-1.5 cursor-pointer transition">
                  <Upload className="w-4 h-4 text-emerald-800" />
                  <span>ব্যাকআপ লোড করুন</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {importError && (
                <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <p className="text-[11px] text-slate-400">
                * ব্রাউজার পরিবর্তন করলেও এই JSON ফাইল দিয়ে আপনার অগ্রগতি ফিরিয়ে আনতে পারবেন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
