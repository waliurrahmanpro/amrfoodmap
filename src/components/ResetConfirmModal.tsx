'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  triedCount: number;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  triedCount
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl border border-[#E6E1D6] p-6 shadow-2xl overflow-hidden cursor-default"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-[#FAF8F5] rounded-xl transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          অগ্রগতি রিসেট নিশ্চিতকরণ
        </h3>

        <p className="text-xs text-slate-500 mt-1">
          Reset Exploration Checklist
        </p>

        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          আপনি কি নিশ্চিত যে আপনার সংরক্ষিত খাদ্যাভিযাত্রা রিসেট করতে চান? আপনার চেক করা{' '}
          <strong className="text-red-700 font-bold">{triedCount}টি খাবারের তথ্য</strong> স্থায়ীভাবে
          মুছে যাবে। এই কাজটি আর পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-[#FAF8F5] hover:bg-[#F1EDE4] border border-[#E6E1D6] transition cursor-pointer"
          >
            বাতিল করুন (Cancel)
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition active:scale-95 cursor-pointer"
          >
            হ্যাঁ, রিসেট করুন (Reset)
          </button>
        </div>
      </div>
    </div>
  );
};
