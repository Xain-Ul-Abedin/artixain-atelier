'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DesignerProvider, useDesigner } from '../../context/DesignerContext';
import StudioTopBar from '../../components/designer/StudioTopBar';
import StudioBeadSidebar from '../../components/designer/StudioBeadSidebar';
import StudioCanvasViewport from '../../components/designer/StudioCanvasViewport';
import StudioParametersSidebar from '../../components/designer/StudioParametersSidebar';
import StudioMobileDrawer from '../../components/designer/StudioMobileDrawer';
import GuideModal from '../../components/designer/GuideModal';
import InspirationModal from '../../components/designer/InspirationModal';
import SavePreviewModal from '../../components/designer/SavePreviewModal';
import SizingModal from '../../components/designer/SizingModal';

function DesignerWorkbench() {
  const searchParams = useSearchParams();
  const { loadFromToken, beads, calculatedCircumferenceCm } = useDesigner();

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [isSavePreviewOpen, setIsSavePreviewOpen] = useState(false);
  const [isMobileBeadDrawerOpen, setIsMobileBeadDrawerOpen] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('design');
    if (token) {
      loadFromToken(token);
    }
  }, [searchParams, loadFromToken]);

  const handleOpenSavePreview = () => {
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

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#FAFAFA] dark:bg-[#0E0E10] text-zinc-900 dark:text-zinc-100 font-sans select-none">
      {/* 1. Top Edge-to-Edge Studio Bar */}
      <StudioTopBar
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenInspiration={() => setIsInspirationOpen(true)}
        onOpenSizingModal={() => setIsSizingModalOpen(true)}
        onOpenSavePreview={handleOpenSavePreview}
      />

      {/* 2. Main 3-Column Studio Body */}
      <main className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Left Column: Bead Library (Hidden on < xl, opens via mobile drawer) */}
        <div className="hidden xl:flex h-full">
          <StudioBeadSidebar />
        </div>

        {/* Center Column: Circular Bracelet Canvas Viewport */}
        <StudioCanvasViewport
          onOpenMobileBeadDrawer={() => setIsMobileBeadDrawerOpen(true)}
          onOpenSavePreview={handleOpenSavePreview}
        />

        {/* Right Column: Live Design Parameters (Desktop xl:flex) */}
        <StudioParametersSidebar
          onOpenSizingModal={() => setIsSizingModalOpen(true)}
          onOpenInspiration={() => setIsInspirationOpen(true)}
          onOpenSavePreview={handleOpenSavePreview}
        />
      </main>

      {/* Mobile Bead Library Drawer (< xl) */}
      <StudioMobileDrawer
        isOpen={isMobileBeadDrawerOpen}
        onClose={() => setIsMobileBeadDrawerOpen(false)}
      />

      {/* Modals */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <InspirationModal isOpen={isInspirationOpen} onClose={() => setIsInspirationOpen(false)} />
      <SavePreviewModal isOpen={isSavePreviewOpen} onClose={() => setIsSavePreviewOpen(false)} />
      <SizingModal isOpen={isSizingModalOpen} onClose={() => setIsSizingModalOpen(false)} />
    </div>
  );
}

export default function DesignerPage() {
  return (
    <DesignerProvider>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center text-zinc-500 font-sans">
            Loading Atelier Studio...
          </div>
        }
      >
        <DesignerWorkbench />
      </Suspense>
    </DesignerProvider>
  );
}
