// PATKAAR VIBESS - TOAST NOTIFICATION COMPONENT

'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-toast">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-slate-100 shadow-2xl shadow-emerald-950/40 backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-sm font-medium pr-2">{toastMessage}</p>
      </div>
    </div>
  );
};
