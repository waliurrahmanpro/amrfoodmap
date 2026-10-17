'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  subMessage?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((toast) => {
        return (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        );
      })}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#84CC16] shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-emerald-300 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[#84CC16]/60';
      case 'warning':
        return 'border-amber-400/60';
      case 'error':
        return 'border-red-400/60';
      default:
        return 'border-[#185343]';
    }
  };

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#06241D]/95 text-white backdrop-blur-md border ${getBorderColor()} shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="text-left">
          <p className="text-xs sm:text-sm font-bold text-white leading-snug">
            {toast.message}
          </p>
          {toast.subMessage && (
            <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-snug">
              {toast.subMessage}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="p-1 rounded-lg text-emerald-300/70 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
