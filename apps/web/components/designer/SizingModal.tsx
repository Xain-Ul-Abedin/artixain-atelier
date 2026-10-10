'use client';

import React, { useState } from 'react';
import { useDesigner } from '../../context/DesignerContext';
import { estimateWristCircumferenceCm, WRIST_SIZE_CATEGORIES } from '@artixain/shared';
import { X, Ruler, CreditCard, Sparkles, UserCheck, Check, Sliders } from 'lucide-react';

interface SizingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizingModal({ isOpen, onClose }: SizingModalProps) {
  const { targetWristSizeCm, setTargetWristSizeCm } = useDesigner();

  const [activeTab, setActiveTab] = useState<'presets' | 'anthropometric' | 'screen_caliper'>('presets');

  // Manual input state
  const [manualCm, setManualCm] = useState<number>(targetWristSizeCm);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  // Anthropometric state
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [gender, setGender] = useState<'female' | 'male' | 'unisex'>('unisex');

  // Screen Caliper state (DPR visual calibration)
  const [cardWidthPx, setCardWidthPx] = useState<number>(300);
  const [caliperMm, setCaliperMm] = useState<number>(165);

  if (!isOpen) return null;

  const calculatedAnthropometricSize = estimateWristCircumferenceCm({
    heightCm,
    weightKg,
    gender
  });

  const handleApplySize = (size: number) => {
    setTargetWristSizeCm(Math.max(12.0, Math.min(24.0, size)));
    onClose();
  };

  const handleManualSliderChange = (val: number) => {
    setManualCm(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Row */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Atelier Calibration</p>
              <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white">
                Choose Wrist Measuring Method
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
            aria-label="Close sizing modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 my-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'presets'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            Presets & Manual
          </button>
          <button
            onClick={() => setActiveTab('anthropometric')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'anthropometric'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            Body Ratio AI
          </button>
          <button
            onClick={() => setActiveTab('screen_caliper')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'screen_caliper'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            Card Caliper
          </button>
        </div>

        {/* Tab 1: Standard Presets & Direct Manual Entry */}
        {activeTab === 'presets' && (
          <div className="space-y-4 overflow-y-auto py-2 text-xs">
            {/* Direct Slider & Input */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white block">Manual Sizing</span>
                  <span className="text-[11px] text-zinc-400">Drag slider or enter exact measured circumference</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                    {manualCm} cm
                  </span>
                  <span className="text-zinc-400 font-mono text-[11px]">
                    ({(manualCm / 2.54).toFixed(1)} in)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={13.0}
                max={22.0}
                step={0.5}
                value={manualCm}
                onChange={(e) => handleManualSliderChange(parseFloat(e.target.value))}
                className="w-full accent-zinc-900 dark:accent-white"
              />

              <div className="flex justify-end">
                <button
                  onClick={() => handleApplySize(manualCm)}
                  className="px-5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply {manualCm} cm</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider pt-1">
              Universal Atelier Presets:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {WRIST_SIZE_CATEGORIES.map((cat) => {
                const isSelected = targetWristSizeCm === cat.exactCm;
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleApplySize(cat.exactCm)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 shadow-sm'
                        : 'bg-zinc-50/70 dark:bg-zinc-800/40 border-zinc-200/80 dark:border-white/5 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold block">
                        {cat.label}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'text-zinc-400'}`}>
                        {cat.recommendedFor}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono">
                      {cat.exactCm} cm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Anthropometric Regression */}
        {activeTab === 'anthropometric' && (
          <div className="space-y-4 overflow-y-auto py-2 text-xs">
            <p className="text-zinc-500">
              Estimate your wrist circumference from body height and weight equations calibrated against ergonomic skeletal anthropometrics.
            </p>

            {/* Height Slider */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">Height</span>
                <span className="font-bold text-zinc-900 dark:text-white">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min={140}
                max={210}
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
                className="w-full accent-zinc-900 dark:accent-white"
              />
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">Body Weight</span>
                <span className="font-bold text-zinc-900 dark:text-white">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={40}
                max={130}
                value={weightKg}
                onChange={(e) => setWeightKg(parseInt(e.target.value, 10))}
                className="w-full accent-zinc-900 dark:accent-white"
              />
            </div>

            {/* Result Display & Apply */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400 block tracking-wider">
                  Estimated Result
                </span>
                <span className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                  {calculatedAnthropometricSize} cm
                </span>
              </div>
              <button
                onClick={() => handleApplySize(calculatedAnthropometricSize)}
                className="px-5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Size</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Credit Card Caliper */}
        {activeTab === 'screen_caliper' && (
          <div className="space-y-4 overflow-y-auto py-2 text-xs">
            <p className="text-zinc-500">
              Hold any physical bank card (85.6 mm) against the card outline below and adjust the slider until they match exactly. Then drag the ruler line to match your wrist diameter.
            </p>

            {/* Simulated Card Outline */}
            <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-white/10">
              <div
                style={{ width: `${cardWidthPx}px`, height: `${cardWidthPx * 0.63}px` }}
                className="rounded-xl border-2 border-dashed border-zinc-400 dark:border-zinc-600 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 transition-all"
              >
                <CreditCard className="w-8 h-8 text-zinc-400 mb-1" />
                <span className="text-[10px] font-semibold text-zinc-500">
                  Standard Bank Card (85.6mm)
                </span>
              </div>

              {/* Slider to match physical card */}
              <div className="w-full max-w-xs mt-3">
                <label className="text-[10px] text-zinc-400 block mb-1 text-center">Card Width Adjustment</label>
                <input
                  type="range"
                  min={220}
                  max={380}
                  value={cardWidthPx}
                  onChange={(e) => setCardWidthPx(parseInt(e.target.value, 10))}
                  className="w-full accent-zinc-900 dark:accent-white"
                />
              </div>
            </div>

            {/* Caliper Wrist Input */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400 block tracking-wider">
                  Calibrated Wrist Size
                </span>
                <span className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                  {(caliperMm / 10).toFixed(1)} cm
                </span>
              </div>
              <button
                onClick={() => handleApplySize(Number((caliperMm / 10).toFixed(1)))}
                className="px-5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Size</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
