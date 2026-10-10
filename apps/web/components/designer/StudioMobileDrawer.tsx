'use client';

import React from 'react';
import { X } from 'lucide-react';
import StudioBeadSidebar from './StudioBeadSidebar';

interface StudioMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioMobileDrawer({ isOpen, onClose }: StudioMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative z-10 w-full max-h-[80vh] h-[580px] bg-white dark:bg-zinc-900 rounded-t-3xl border-t border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drawer Header Handle & Close */}
        <div className="flex items-center justify-between px-5 pt-3.5 pb-2 border-b border-zinc-100 dark:border-white/5">
          <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <span className="text-xs font-serif font-bold text-zinc-900 dark:text-white mt-1">
            Gemstone & Mineral Library
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            aria-label="Close bead library"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Bead Sidebar */}
        <div className="flex-1 overflow-hidden">
          <StudioBeadSidebar onCloseMobileDrawer={onClose} />
        </div>
      </div>
    </div>
  );
}
