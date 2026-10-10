'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { estimateWristCircumferenceCm, WRIST_SIZE_CATEGORIES } from '@artixain/shared';
import { X, Ruler, CreditCard, Sparkles, UserCheck, Check } from 'lucide-react';

interface SizingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizingModal({ isOpen, onClose }: SizingModalProps) {
  const { targetWristSizeCm, setTargetWristSizeCm } = useDesigner();

  const [activeTab, setActiveTab] = useState<'presets' | 'anthropometric' | 'screen_caliper'>('presets');

  // Anthropometric state
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [gender, setGender] = useState<'female' | 'male' | 'unisex'>('unisex');

  // Screen Caliper state (DPR visual calibration)
  const [cardWidthPx, setCardWidthPx] = useState<number>(320);
  const [caliperMm, setCaliperMm] = useState<number>(165);

  if (!isOpen) return null;

  const calculatedAnthropometricSize = estimateWristCircumferenceCm({
    heightCm,
    weightKg,
    gender
  });

  const handleApplySize = (size: number) => {
    setTargetWristSizeCm(size);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-obsidian-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Row */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="icon-orb w-9 h-9 bg-champagne-500/10 text-champagne-600 dark:text-champagne-400">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-obsidian-900 dark:text-white">
                Wrist Sizing & Atelier Calibration
              </h3>
              <p className="text-xs text-zinc-500">
                Calibrate your wrist measurement for zero-slip ergonomics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 my-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pill-chip flex-1 py-1.5 justify-center ${
              activeTab === 'presets' ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            Standard Sizes
          </button>
          <button
            onClick={() => setActiveTab('anthropometric')}
            className={`pill-chip flex-1 py-1.5 justify-center ${
              activeTab === 'anthropometric' ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            Body Ratio AI
          </button>
          <button
            onClick={() => setActiveTab('screen_caliper')}
            className={`pill-chip flex-1 py-1.5 justify-center ${
              activeTab === 'screen_caliper' ? 'pill-chip-active' : 'pill-chip-inactive'
            }`}
          >
            Credit Card Caliper
          </button>
        </div>

        {/* Tab 1: Standard Preset Sizes */}
        {activeTab === 'presets' && (
          <div className="space-y-3 overflow-y-auto py-2">
            <p className="text-xs text-zinc-500 mb-2">
              Select an international atelier benchmark size. 16.5 cm is the universal standard for women, and 18.0 cm for men.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WRIST_SIZE_CATEGORIES.map((cat) => {
                const isSelected = targetWristSizeCm === cat.exactCm;
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleApplySize(cat.exactCm)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'bg-champagne-500/10 dark:bg-champagne-500/20 border-champagne-500 dark:border-champagne-400 shadow-sm'
                        : 'bg-zinc-50/70 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-white/10 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-semibold text-obsidian-900 dark:text-white block">
                        {cat.label}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {cat.recommendedFor} • ~{cat.estimatedBeads8mm} beads
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-champagne-600 dark:text-champagne-400">
                        {cat.exactCm} cm
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Anthropometric Regression */}
        {activeTab === 'anthropometric' && (
          <div className="space-y-4 overflow-y-auto py-2">
            <p className="text-xs text-zinc-500">
              Calculate your wrist circumference based on your height, body weight, and skeletal build equations ($W = 0.082H + 0.045M - 0.5$).
            </p>

            {/* Height Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">Height</span>
                <span className="text-champagne-600 dark:text-champagne-400 font-bold">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min={140}
                max={210}
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
                className="w-full accent-champagne-500"
              />
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">Body Weight</span>
                <span className="text-champagne-600 dark:text-champagne-400 font-bold">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={40}
                max={130}
                value={weightKg}
                onChange={(e) => setWeightKg(parseInt(e.target.value, 10))}
                className="w-full accent-champagne-500"
              />
            </div>

            {/* Result Display & Apply */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-semibold text-zinc-400 block tracking-wider">
                  Estimated Circumference
                </span>
                <span className="text-xl font-serif font-bold text-obsidian-900 dark:text-white">
                  {calculatedAnthropometricSize} cm
                </span>
              </div>
              <button
                onClick={() => handleApplySize(calculatedAnthropometricSize)}
                className="btn-pill-primary text-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Size</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Credit Card Caliper */}
        {activeTab === 'screen_caliper' && (
          <div className="space-y-4 overflow-y-auto py-2">
            <p className="text-xs text-zinc-500">
              Hold a physical standard card (85.6 mm) against the card outline below and adjust the slider until they match exactly. Then wrap a paper strip around your wrist and measure it against the calibrated ruler.
            </p>

            {/* Simulated Card Outline */}
            <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-white/10">
              <div
                style={{ width: `${cardWidthPx}px`, height: `${cardWidthPx * 0.63}px` }}
                className="rounded-xl border-2 border-dashed border-champagne-500 flex flex-col items-center justify-center bg-champagne-500/5 transition-all"
              >
                <CreditCard className="w-8 h-8 text-champagne-500 mb-1" />
                <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                  Standard Bank Card (85.6mm)
                </span>
              </div>

              {/* Slider to match physical card */}
              <div className="w-full max-w-xs mt-3">
                <input
                  type="range"
                  min={240}
                  max={420}
                  value={cardWidthPx}
                  onChange={(e) => setCardWidthPx(parseInt(e.target.value, 10))}
                  className="w-full accent-champagne-500"
                />
              </div>
            </div>

            {/* Caliper Wrist Input */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-semibold text-zinc-400 block tracking-wider">
                  Calibrated Wrist Size
                </span>
                <span className="text-xl font-serif font-bold text-obsidian-900 dark:text-white">
                  {(caliperMm / 10).toFixed(1)} cm
                </span>
              </div>
              <button
                onClick={() => handleApplySize(Number((caliperMm / 10).toFixed(1)))}
                className="btn-pill-primary text-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Calibrated Size</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
