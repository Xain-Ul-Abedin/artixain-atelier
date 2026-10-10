'use client';

import React, { useState } from 'react';
import { useDesigner, CURATED_RECIPES, CuratedRecipe } from '../../context/DesignerContext';
import { X, Sparkles, Check, ArrowRight, Shield, Heart, Zap, Compass, AlertCircle } from 'lucide-react';
import ShimmerImage from '../ui/ShimmerImage';

interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InspirationModal({ isOpen, onClose }: InspirationModalProps) {
  const { beads, loadCuratedRecipe } = useDesigner();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recipeToLoad, setRecipeToLoad] = useState<CuratedRecipe | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Protection', 'Love', 'Abundance', 'Intuition', 'Balance'];

  const filteredRecipes = selectedCategory === 'All'
    ? CURATED_RECIPES
    : CURATED_RECIPES.filter((r) => r.category === selectedCategory);

  const handleSelectRecipe = (recipe: CuratedRecipe) => {
    if (beads.length > 0) {
      // Prompt confirmation
      setRecipeToLoad(recipe);
    } else {
      loadCuratedRecipe(recipe.beadCodes, recipe.wristSizeCm, recipe.name);
      onClose();
    }
  };

  const confirmOverwrite = () => {
    if (recipeToLoad) {
      loadCuratedRecipe(recipeToLoad.beadCodes, recipeToLoad.wristSizeCm, recipeToLoad.name);
      setRecipeToLoad(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Atelier Curations</p>
              <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                Get Design Inspiration
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              setRecipeToLoad(null);
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
            aria-label="Close inspiration modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Overwrite Confirmation Alert if active */}
        {recipeToLoad && (
          <div className="my-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Overwrite canvas with &quot;{recipeToLoad.name}&quot;?
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  You currently have {beads.length} beads on your strand. Loading this will replace them.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setRecipeToLoad(null)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmOverwrite}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
              >
                Confirm Load
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 my-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="overflow-y-auto space-y-3.5 pr-1">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 border border-zinc-200/70 dark:border-white/5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {recipe.image && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <ShimmerImage
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      containerClassName="w-full h-full"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                      {recipe.category}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {recipe.beadCodes.length} beads &bull; {recipe.wristSizeCm}cm
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                    {recipe.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60 dark:border-white/5">
                <span className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                  ${recipe.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleSelectRecipe(recipe)}
                  className="px-5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>Load Design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-zinc-200/80 dark:border-white/10 flex justify-between items-center text-xs text-zinc-400">
          <span>Loading a design replaces current strand sequence.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
