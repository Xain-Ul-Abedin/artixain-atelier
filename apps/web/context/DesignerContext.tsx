'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Gemstone,
  MASTER_GEMSTONES,
  getGemstoneByCode,
  encodeDesignToken,
  decodeDesignToken,
  EncodedBeadEntry
} from '@artixain/shared';

export interface CustomBead {
  id: string;
  gemstoneId: string;
  code: string;
  name: string;
  diameterMm: 6 | 8 | 10 | 12;
  colorHex: string;
  secondaryColorHex?: string;
  textureType: string;
  isSpacer: boolean;
  price: number;
}

interface DesignerContextType {
  beads: CustomBead[];
  targetWristSizeCm: number;
  selectedDiameter: 6 | 8 | 10 | 12;
  cordType: 'silicone_stretch' | 'braided_silk' | 'gold_wire';
  selectedIndex: number | null;
  rotationAngle: number;
  calculatedCircumferenceCm: number;
  fitDifferenceMm: number;
  fitStatus: 'perfect' | 'loose' | 'tight';
  totalPrice: number;
  designToken: string;
  setTargetWristSizeCm: (size: number) => void;
  setSelectedDiameter: (d: 6 | 8 | 10 | 12) => void;
  setCordType: (t: 'silicone_stretch' | 'braided_silk' | 'gold_wire') => void;
  setSelectedIndex: (idx: number | null) => void;
  setRotationAngle: (angle: number) => void;
  addBead: (gem: Gemstone, customDiameter?: 6 | 8 | 10 | 12) => void;
  insertBeadAt: (index: number, gem: Gemstone, customDiameter?: 6 | 8 | 10 | 12) => void;
  removeBeadAt: (index: number) => void;
  replaceBeadAt: (index: number, gem: Gemstone) => void;
  reorderBeads: (fromIndex: number, toIndex: number) => void;
  applyBilateralSymmetry: () => void;
  applyQuadrantSymmetry: () => void;
  applyAlternatingSpacers: (spacerGem: Gemstone) => void;
  clearStrand: () => void;
  loadFromToken: (token: string) => boolean;
  loadCuratedRecipe: (gemCodes: string[], wristSize?: number) => void;
}

const DesignerContext = createContext<DesignerContextType | undefined>(undefined);

// Default starter bracelet preset (Black Obsidian & Tigers Eye with Gold Spacers)
const STARTER_BEAD_CODES = [
  'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
  'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
  'OBS', 'OBS', 'TIG', 'GSP'
];

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  const [targetWristSizeCm, setTargetWristSizeCm] = useState<number>(16.5);
  const [selectedDiameter, setSelectedDiameter] = useState<6 | 8 | 10 | 12>(8);
  const [cordType, setCordType] = useState<'silicone_stretch' | 'braided_silk' | 'gold_wire'>('silicone_stretch');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Initialize beads from starter recipe
  const [beads, setBeads] = useState<CustomBead[]>(() => {
    return STARTER_BEAD_CODES.map((code, idx) => {
      const gem = getGemstoneByCode(code) || MASTER_GEMSTONES[0];
      const diameter: 6 | 8 | 10 | 12 = gem.isSpacer ? 6 : 8;
      return {
        id: `bead_${idx}_${Math.random().toString(36).substr(2, 6)}`,
        gemstoneId: gem.id,
        code: gem.code,
        name: gem.name,
        diameterMm: diameter,
        colorHex: gem.colorHex,
        secondaryColorHex: gem.secondaryColorHex,
        textureType: gem.textureType,
        isSpacer: !!gem.isSpacer,
        price: gem.pricesByDiameter[diameter] || 2.0
      };
    });
  });

  // Calculate inner circumference (Sum of bead diameters in cm)
  const calculatedCircumferenceCm = useMemo(() => {
    const totalMm = beads.reduce((acc, b) => acc + b.diameterMm, 0);
    return Number((totalMm / 10).toFixed(2));
  }, [beads]);

  // Fit physics difference compared to wrist circumference
  const fitDifferenceMm = useMemo(() => {
    const targetMm = targetWristSizeCm * 10;
    const strandMm = calculatedCircumferenceCm * 10;
    return Number((strandMm - targetMm).toFixed(1));
  }, [targetWristSizeCm, calculatedCircumferenceCm]);

  const fitStatus: 'perfect' | 'loose' | 'tight' = useMemo(() => {
    if (Math.abs(fitDifferenceMm) <= 6) return 'perfect';
    if (fitDifferenceMm > 6) return 'loose';
    return 'tight';
  }, [fitDifferenceMm]);

  // Total price calculus
  const totalPrice = useMemo(() => {
    const sum = beads.reduce((acc, b) => acc + b.price, 0);
    return Number(sum.toFixed(2));
  }, [beads]);

  // Design Token encoder
  const designToken = useMemo(() => {
    const beadEntries: EncodedBeadEntry[] = beads.map((b) => ({
      gemstoneCode: b.code,
      diameterMm: b.diameterMm
    }));
    return encodeDesignToken(targetWristSizeCm, cordType, beadEntries);
  }, [beads, targetWristSizeCm, cordType]);

  const addBead = useCallback((gem: Gemstone, customDiameter?: 6 | 8 | 10 | 12) => {
    const diam = customDiameter || (gem.isSpacer ? 6 : selectedDiameter);
    const newBead: CustomBead = {
      id: `bead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      gemstoneId: gem.id,
      code: gem.code,
      name: gem.name,
      diameterMm: diam,
      colorHex: gem.colorHex,
      secondaryColorHex: gem.secondaryColorHex,
      textureType: gem.textureType,
      isSpacer: !!gem.isSpacer,
      price: gem.pricesByDiameter[diam] || 2.0
    };
    setBeads((prev) => [...prev, newBead]);
  }, [selectedDiameter]);

  const insertBeadAt = useCallback((index: number, gem: Gemstone, customDiameter?: 6 | 8 | 10 | 12) => {
    const diam = customDiameter || (gem.isSpacer ? 6 : selectedDiameter);
    const newBead: CustomBead = {
      id: `bead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      gemstoneId: gem.id,
      code: gem.code,
      name: gem.name,
      diameterMm: diam,
      colorHex: gem.colorHex,
      secondaryColorHex: gem.secondaryColorHex,
      textureType: gem.textureType,
      isSpacer: !!gem.isSpacer,
      price: gem.pricesByDiameter[diam] || 2.0
    };
    setBeads((prev) => {
      const next = [...prev];
      next.splice(index, 0, newBead);
      return next;
    });
  }, [selectedDiameter]);

  const removeBeadAt = useCallback((index: number) => {
    setBeads((prev) => prev.filter((_, idx) => idx !== index));
    setSelectedIndex(null);
  }, []);

  const replaceBeadAt = useCallback((index: number, gem: Gemstone) => {
    setBeads((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const targetDiam = gem.isSpacer ? 6 : prev[index].diameterMm;
      const updated: CustomBead = {
        id: prev[index].id,
        gemstoneId: gem.id,
        code: gem.code,
        name: gem.name,
        diameterMm: targetDiam,
        colorHex: gem.colorHex,
        secondaryColorHex: gem.secondaryColorHex,
        textureType: gem.textureType,
        isSpacer: !!gem.isSpacer,
        price: gem.pricesByDiameter[targetDiam] || 2.0
      };
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  }, []);

  const reorderBeads = useCallback((fromIndex: number, toIndex: number) => {
    setBeads((prev) => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const applyBilateralSymmetry = useCallback(() => {
    setBeads((prev) => {
      if (prev.length < 2) return prev;
      const halfLen = Math.floor(prev.length / 2);
      const firstHalf = prev.slice(0, halfLen);
      const mirroredHalf = [...firstHalf].reverse().map((b, i) => ({
        ...b,
        id: `bead_mir_${i}_${Date.now()}`
      }));
      if (prev.length % 2 === 1) {
        const centerBead = prev[halfLen];
        return [...firstHalf, centerBead, ...mirroredHalf];
      }
      return [...firstHalf, ...mirroredHalf];
    });
  }, []);

  const applyQuadrantSymmetry = useCallback(() => {
    setBeads((prev) => {
      if (prev.length < 4) return prev;
      const quarterLen = Math.max(1, Math.floor(prev.length / 4));
      const unit = prev.slice(0, quarterLen);
      const next: CustomBead[] = [];
      for (let q = 0; q < 4; q++) {
        unit.forEach((b, idx) => {
          next.push({
            ...b,
            id: `bead_q${q}_${idx}_${Date.now()}`
          });
        });
      }
      return next;
    });
  }, []);

  const applyAlternatingSpacers = useCallback((spacerGem: Gemstone) => {
    setBeads((prev) => {
      const nonSpacers = prev.filter((b) => !b.isSpacer);
      const next: CustomBead[] = [];
      nonSpacers.forEach((gemBead, idx) => {
        next.push(gemBead);
        next.push({
          id: `spacer_${idx}_${Date.now()}`,
          gemstoneId: spacerGem.id,
          code: spacerGem.code,
          name: spacerGem.name,
          diameterMm: 6,
          colorHex: spacerGem.colorHex,
          secondaryColorHex: spacerGem.secondaryColorHex,
          textureType: spacerGem.textureType,
          isSpacer: true,
          price: spacerGem.pricesByDiameter[6] || 1.2
        });
      });
      return next;
    });
  }, []);

  const clearStrand = useCallback(() => {
    setBeads([]);
    setSelectedIndex(null);
  }, []);

  const loadFromToken = useCallback((token: string): boolean => {
    const decoded = decodeDesignToken(token);
    if (!decoded || decoded.beads.length === 0) return false;

    setTargetWristSizeCm(decoded.targetWristSizeCm);
    setCordType(decoded.cordType);

    const loadedBeads: CustomBead[] = decoded.beads.map((b, idx) => {
      const matchedGem = getGemstoneByCode(b.code) || MASTER_GEMSTONES[0];
      return {
        id: `bead_token_${idx}_${Date.now()}`,
        gemstoneId: matchedGem.id,
        code: matchedGem.code,
        name: matchedGem.name,
        diameterMm: b.diameterMm,
        colorHex: matchedGem.colorHex,
        secondaryColorHex: matchedGem.secondaryColorHex,
        textureType: matchedGem.textureType,
        isSpacer: !!matchedGem.isSpacer,
        price: b.price
      };
    });

    setBeads(loadedBeads);
    setSelectedIndex(null);
    return true;
  }, []);

  const loadCuratedRecipe = useCallback((gemCodes: string[], wristSize: number = 16.5) => {
    setTargetWristSizeCm(wristSize);
    const newBeads: CustomBead[] = gemCodes.map((code, idx) => {
      const gem = getGemstoneByCode(code) || MASTER_GEMSTONES[0];
      const diam: 6 | 8 | 10 | 12 = gem.isSpacer ? 6 : 8;
      return {
        id: `bead_recipe_${idx}_${Date.now()}`,
        gemstoneId: gem.id,
        code: gem.code,
        name: gem.name,
        diameterMm: diam,
        colorHex: gem.colorHex,
        secondaryColorHex: gem.secondaryColorHex,
        textureType: gem.textureType,
        isSpacer: !!gem.isSpacer,
        price: gem.pricesByDiameter[diam] || 2.0
      };
    });
    setBeads(newBeads);
    setSelectedIndex(null);
  }, []);

  return (
    <DesignerContext.Provider
      value={{
        beads,
        targetWristSizeCm,
        selectedDiameter,
        cordType,
        selectedIndex,
        rotationAngle,
        calculatedCircumferenceCm,
        fitDifferenceMm,
        fitStatus,
        totalPrice,
        designToken,
        setTargetWristSizeCm,
        setSelectedDiameter,
        setCordType,
        setSelectedIndex,
        setRotationAngle,
        addBead,
        insertBeadAt,
        removeBeadAt,
        replaceBeadAt,
        reorderBeads,
        applyBilateralSymmetry,
        applyQuadrantSymmetry,
        applyAlternatingSpacers,
        clearStrand,
        loadFromToken,
        loadCuratedRecipe
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesigner must be used within a DesignerProvider');
  }
  return context;
}
