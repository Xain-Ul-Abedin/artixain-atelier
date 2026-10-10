'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDesigner } from '../../context/DesignerContext';
import {
  ChevronLeft,
  Sparkles,
  BookOpen,
  Ruler,
  ShoppingBag,
  Check,
  Edit2,
  Tag,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import GuideModal from './GuideModal';
import InspirationModal from './InspirationModal';
import SavePreviewModal from './SavePreviewModal';

interface StudioHeaderProps {
  onOpenSizingModal: () => void;
}

export default function StudioHeader({ onOpenSizingModal }: StudioHeaderProps) {
  const router = useRouter();
  const {
    beads,
    designTitle,
    setDesignTitle,
    totalPrice,
    designToken,
    targetWristSizeCm,
    calculatedCircumferenceCm,
    fitRating,
    loadFromToken
  } = useDesigner();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState('');
  const [codeFeedback, setCodeFeedback] = useState<string | null>(null);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);
  const [isSavePreviewOpen, setIsSavePreviewOpen] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const handleBackClick = (e: React.MouseEvent) => {
    if (beads.length > 0) {
      e.preventDefault();
      setShowLeaveConfirm(true);
    }
  };

  const handlePasteCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInputValue.trim()) return;
    const success = loadFromToken(codeInputValue.trim());
    if (success) {
      setCodeFeedback('Design loaded!');
      setCodeInputValue('');
      setTimeout(() => setCodeFeedback(null), 2500);
    } else {
      setCodeFeedback('Invalid design code');
      setTimeout(() => setCodeFeedback(null), 2500);
    }
  };

  const handleSavePreviewClick = () => {
    if (beads.length === 0) {
      alert('Please add beads to your strand before saving.');
      return;
    }
    if (calculatedCircumferenceCm < 13.0) {
      alert('Strand must be at least 13cm before saving. Please add more beads.');
      return;
    }
    setIsSavePreviewOpen(true);
  };

  const fitBadgeConfig = {
    good: { label: 'Good', bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    snug: { label: 'Snug', bg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
    loose: { label: 'Loose', bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    too_tight: { label: 'Too Tight', bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    too_loose: { label: 'Too Loose', bg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' }
  }[fitRating];

  return (
    <>
      <div className="flex flex-col gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/10">
        {/* Top Floating Row: Back Button, Title, Guide, Inspire, Code Loader, Save & Preview */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Left: Back & Editable Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={handleBackClick}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shrink-0 shadow-2xs"
              aria-label="Go back to atelier home"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <input
                  type="text"
                  autoFocus
                  value={designTitle}
                  onChange={(e) => setDesignTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingTitle(false);
                  }}
                  className="font-serif font-bold text-xl md:text-2xl text-zinc-900 dark:text-white bg-transparent border-b border-zinc-400 outline-none pb-0.5"
                />
              ) : (
                <div
                  onClick={() => setIsEditingTitle(true)}
                  className="group flex items-center gap-2 cursor-pointer"
                  title="Click to edit design name"
                >
                  <h1 className="font-serif font-bold text-xl md:text-2xl text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {designTitle || 'untitled'}
                  </h1>
                  <Edit2 className="w-3.5 h-3.5 text-zinc-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <span className="hidden sm:inline-block text-xs font-mono text-zinc-400">
                &bull; {beads.length} beads ({calculatedCircumferenceCm}cm)
              </span>
            </div>
          </div>

          {/* Right Action Controls: Guide, Inspire, Paste Code, Save & Preview */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
            {/* Guide Button */}
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all active:scale-95 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Guide</span>
            </button>

            {/* Inspire Button */}
            <button
              type="button"
              onClick={() => setIsInspirationOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all active:scale-95 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Inspire</span>
            </button>

            {/* Paste Code Form */}
            <form onSubmit={handlePasteCodeSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                value={codeInputValue}
                onChange={(e) => setCodeInputValue(e.target.value)}
                placeholder="Paste design code..."
                className="h-9 w-44 px-3.5 pr-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 outline-none focus:w-56 transition-all"
              />
              <button
                type="submit"
                aria-label="Load pasted design code"
                className="absolute right-1.5 p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
              {codeFeedback && (
                <span className="absolute -bottom-5 left-2 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  {codeFeedback}
                </span>
              )}
            </form>

            {/* Save & Preview CTA Button */}
            <button
              type="button"
              onClick={handleSavePreviewClick}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Save & Preview</span>
            </button>
          </div>
        </div>

        {/* Floating Parameter Stats Bar (Mimicking Astris Live Parameter Bar) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 text-xs">
          {/* Left Parameter Group: Wrist Size & Fit Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 dark:text-zinc-400">Your Wrist:</span>
              <button
                type="button"
                onClick={onOpenSizingModal}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold hover:border-zinc-400 transition-colors"
              >
                <Ruler className="w-3 h-3 text-zinc-500" />
                <span>{targetWristSizeCm} cm</span>
                <span className="text-[10px] text-zinc-400 ml-0.5 underline">Measure</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 dark:text-zinc-400">Fits Wrist (Elastic):</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${fitBadgeConfig.bg}`}>
                {fitBadgeConfig.label}
              </span>
            </div>
          </div>

          {/* Right Parameter Group: Tier Pricing & Total */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Live Tier Discount Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              <Tag className="w-3 h-3 text-amber-500" />
              <span>1 for ${(totalPrice).toFixed(0)} &bull; 2 for ${(totalPrice * 1.7).toFixed(0)} &bull; 3 for ${(totalPrice * 2.3).toFixed(0)}</span>
            </div>

            {/* Total Price Capsule */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-2xs">
              <span className="text-[11px] opacity-80">Total:</span>
              <span className="text-sm font-serif">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discard Leave Confirm Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white mb-2">
              Discard Current Design?
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              You have {beads.length} beads strung on canvas. Leaving now will reset unsaved changes.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex-1 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 transition-colors"
              >
                Stay Here
              </button>
              <button
                onClick={() => {
                  setShowLeaveConfirm(false);
                  router.push('/');
                }}
                className="flex-1 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-colors"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <InspirationModal isOpen={isInspirationOpen} onClose={() => setIsInspirationOpen(false)} />
      <SavePreviewModal isOpen={isSavePreviewOpen} onClose={() => setIsSavePreviewOpen(false)} />
    </>
  );
}
