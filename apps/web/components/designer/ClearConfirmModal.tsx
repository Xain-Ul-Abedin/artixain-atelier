'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ClearConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearConfirmModal({ isOpen, onClose, onConfirm }: ClearConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 shadow-2xl overflow-hidden flex flex-col text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4 border border-rose-200 dark:border-rose-900/40">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white mb-2">
          Confirm Clear Canvas?
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          This action will remove all strung gemstone beads and reset your current strand. You can still undo this action immediately afterwards.
        </p>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Confirm Clear
          </button>
        </div>
      </div>
    </div>
  );
}
