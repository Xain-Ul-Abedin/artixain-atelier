'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DesignerProvider, useDesigner } from '../../context/DesignerContext';
import BraceletCanvas from '../../components/designer/BraceletCanvas';
import BeadPalette from '../../components/designer/BeadPalette';
import SizingModal from '../../components/designer/SizingModal';
import SymmetryTools from '../../components/designer/SymmetryTools';
import StudioHeader from '../../components/designer/StudioHeader';

function DesignerInner() {
  const searchParams = useSearchParams();
  const { loadFromToken } = useDesigner();
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('design');
    if (token) {
      loadFromToken(token);
    }
  }, [searchParams, loadFromToken]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1720px] pt-28 md:pt-32">
      {/* Studio Header Row */}
      <StudioHeader onOpenSizingModal={() => setIsSizingModalOpen(true)} />

      {/* Main Studio Grid (Floating Tri-Capsule Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left / Center Column: 2D Canvas & Symmetry Tools (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <BraceletCanvas />
          <SymmetryTools />
        </div>

        {/* Right Column: Bead Palette & Inventory Drawer (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-[520px] sm:h-[560px] lg:h-[640px]">
          <BeadPalette />
        </div>
      </div>

      {/* Sizing & Calibration Modal */}
      <SizingModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
      />
    </div>
  );
}

export default function DesignerPage() {
  return (
    <DesignerProvider>
      <Suspense fallback={<div className="p-12 text-center text-zinc-500 pt-32">Preparing Atelier Studio...</div>}>
        <DesignerInner />
      </Suspense>
    </DesignerProvider>
  );
}
