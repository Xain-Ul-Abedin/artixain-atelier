'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDesigner, CustomBead } from '../../context/DesignerContext';
import { getGemstoneByCode } from '@artixain/shared';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Trash2,
  Sparkles,
  RefreshCw,
  Undo2,
  Redo2,
  ArrowLeftRight,
  Split,
  Grid2X2,
  Layers,
  ShoppingBag
} from 'lucide-react';
import ClearConfirmModal from './ClearConfirmModal';

interface Point {
  x: number;
  y: number;
}

interface StudioCanvasViewportProps {
  onOpenMobileBeadDrawer: () => void;
  onOpenSavePreview: () => void;
}

export default function StudioCanvasViewport({
  onOpenMobileBeadDrawer,
  onOpenSavePreview
}: StudioCanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    beads,
    selectedIndex,
    setSelectedIndex,
    removeBeadAt,
    reorderBeads,
    rotationAngle,
    setRotationAngle,
    targetWristSizeCm,
    calculatedCircumferenceCm,
    selectedDiameter,
    setSelectedDiameter,
    canUndo,
    canRedo,
    undo,
    redo,
    invertStrand,
    applyBilateralSymmetry,
    applyQuadrantSymmetry,
    applyAlternatingSpacers,
    clearStrand
  } = useDesigner();

  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Calculate bead positions on radial path
  const getBeadPositions = useCallback(
    (
      width: number,
      height: number
    ): Array<Point & { radius: number; bead: CustomBead; index: number; angle: number }> => {
      if (beads.length === 0) return [];

      const centerX = width / 2;
      const centerY = height / 2;

      // Base radius calculation derived from bead diameters
      const totalDiameterMm = beads.reduce((acc, b) => acc + b.diameterMm, 0);
      const circumferencePx = totalDiameterMm * 14 * zoomLevel;
      const ringRadius = Math.max(85 * zoomLevel, circumferencePx / (2 * Math.PI));

      let currentAngle = (rotationAngle * Math.PI) / 180;
      const positions: Array<Point & { radius: number; bead: CustomBead; index: number; angle: number }> =
        [];

      for (let i = 0; i < beads.length; i++) {
        const bead = beads[i];
        const beadRadiusPx = bead.diameterMm * 2.2 * zoomLevel;

        const beadAngleSpan = (bead.diameterMm / totalDiameterMm) * (2 * Math.PI);
        const centerAngle = currentAngle + beadAngleSpan / 2;

        const bx = centerX + ringRadius * Math.cos(centerAngle);
        const by = centerY + ringRadius * Math.sin(centerAngle);

        positions.push({
          x: bx,
          y: by,
          radius: beadRadiusPx,
          bead,
          index: i,
          angle: centerAngle
        });

        currentAngle += beadAngleSpan;
      }

      return positions;
    },
    [beads, rotationAngle, zoomLevel]
  );

  // Render 6-Layer Procedural Mineral Shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const positions = getBeadPositions(rect.width, rect.height);

    // Layer 1: Draw Elastic Cord / Core Path
    if (positions.length > 1) {
      ctx.beginPath();
      positions.forEach((pos, idx) => {
        if (idx === 0) ctx.moveTo(pos.x, pos.y);
        else ctx.lineTo(pos.x, pos.y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(161, 161, 170, 0.45)';
      ctx.lineWidth = 3 * zoomLevel;
      ctx.stroke();
    }

    // Light source vector relative to center
    const lightX = mousePos.x || rect.width / 2 - 80;
    const lightY = mousePos.y || rect.height / 2 - 80;

    // Render Each Bead with 6-Layer Shader
    positions.forEach((pos) => {
      const { x, y, radius, bead, index } = pos;
      const isSelected = selectedIndex === index;
      const isHovered = hoveredIndex === index;

      // Layer 1: Ambient Contact Shadow
      const shadowGrad = ctx.createRadialGradient(
        x + radius * 0.25,
        y + radius * 0.35,
        radius * 0.5,
        x,
        y,
        radius * 1.35
      );
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Layer 2: Base Mineral Body with Curvature Radial Gradient
      const baseGrad = ctx.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.35,
        radius * 0.1,
        x,
        y,
        radius
      );
      baseGrad.addColorStop(0, bead.colorHex);
      baseGrad.addColorStop(0.7, bead.secondaryColorHex || bead.colorHex);
      baseGrad.addColorStop(1, '#09090b');
      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Layer 3: Procedural Texture & Mineral Chatoyancy/Fleck Physics
      if (bead.textureType === 'chatoyant') {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.translate(x, y);
        ctx.rotate(pos.angle + Math.PI / 4);

        const streakGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
        streakGrad.addColorStop(0, 'rgba(255,215,0,0)');
        streakGrad.addColorStop(0.5, 'rgba(255,235,140,0.65)');
        streakGrad.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = streakGrad;
        ctx.fillRect(-radius, -radius * 0.35, radius * 2, radius * 0.7);
        ctx.restore();
      } else if (bead.textureType === 'pyrite_flecks') {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();
        for (let f = 0; f < 5; f++) {
          const fx = x + ((f * 17) % (radius * 1.4)) - radius * 0.7;
          const fy = y + ((f * 29) % (radius * 1.4)) - radius * 0.7;
          ctx.fillStyle = 'rgba(255, 223, 128, 0.75)';
          ctx.fillRect(fx, fy, 2.5 * zoomLevel, 2.5 * zoomLevel);
        }
        ctx.restore();
      } else if (bead.textureType === 'labradorescent') {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();
        const labGrad = ctx.createLinearGradient(
          x - radius,
          y - radius,
          x + radius,
          y + radius
        );
        labGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        labGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.55)');
        labGrad.addColorStop(0.7, 'rgba(250, 204, 21, 0.45)');
        labGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = labGrad;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        ctx.restore();
      }

      // Layer 4: Specular Reflection Highlight (Spherical Glint)
      const specGrad = ctx.createRadialGradient(
        x - radius * 0.4,
        y - radius * 0.4,
        0,
        x - radius * 0.4,
        y - radius * 0.4,
        radius * 0.6
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      specGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.35)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Layer 5: Secondary Rim Light Bounce
      const rimGrad = ctx.createRadialGradient(
        x + radius * 0.35,
        y + radius * 0.35,
        radius * 0.65,
        x,
        y,
        radius
      );
      rimGrad.addColorStop(0, 'rgba(255,255,255,0)');
      rimGrad.addColorStop(1, 'rgba(255,255,255,0.22)');
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Layer 6: Selection / Hover Aura Indicator
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, radius + 4 * zoomLevel, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected
          ? 'rgba(245, 158, 11, 0.95)'
          : 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 2.5 * zoomLevel;
        ctx.stroke();
      }
    });

    ctx.restore();
  }, [beads, getBeadPositions, mousePos, selectedIndex, hoveredIndex, zoomLevel]);

  // Handle Drag & Drop / Reordering Events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const positions = getBeadPositions(rect.width, rect.height);
    const clicked = positions.find((p) => {
      const dist = Math.hypot(p.x - x, p.y - y);
      return dist <= p.radius;
    });

    if (clicked) {
      setSelectedIndex(clicked.index);
      setDraggedIndex(clicked.index);
      setIsDragging(true);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    const positions = getBeadPositions(rect.width, rect.height);
    const hovered = positions.find((p) => {
      const dist = Math.hypot(p.x - x, p.y - y);
      return dist <= p.radius;
    });

    setHoveredIndex(hovered ? hovered.index : null);

    // If dragging a bead around the circular strand
    if (isDragging && draggedIndex !== null) {
      const targetBead = positions.find((p) => {
        const dist = Math.hypot(p.x - x, p.y - y);
        return dist <= p.radius && p.index !== draggedIndex;
      });

      if (targetBead) {
        reorderBeads(draggedIndex, targetBead.index);
        setDraggedIndex(targetBead.index);
        setSelectedIndex(targetBead.index);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

  // Touch Handling for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const positions = getBeadPositions(rect.width, rect.height);
      const clicked = positions.find((p) => Math.hypot(p.x - x, p.y - y) <= p.radius);

      if (clicked) {
        setSelectedIndex(clicked.index);
        setDraggedIndex(clicked.index);
        setIsDragging(true);
      } else {
        setSelectedIndex(null);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDragging && draggedIndex !== null) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const positions = getBeadPositions(rect.width, rect.height);
      const targetBead = positions.find(
        (p) => Math.hypot(p.x - x, p.y - y) <= p.radius && p.index !== draggedIndex
      );

      if (targetBead) {
        reorderBeads(draggedIndex, targetBead.index);
        setDraggedIndex(targetBead.index);
        setSelectedIndex(targetBead.index);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

  const handleApplyGoldSpacers = () => {
    const goldSpacer = getGemstoneByCode('GSP');
    if (goldSpacer) applyAlternatingSpacers(goldSpacer);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex-1 h-full min-h-0 flex flex-col items-center justify-center bg-[#F8F9FA] dark:bg-[#0B0B0D] overflow-hidden select-none transition-colors"
    >
      {/* Top Floating Bead Diameter Quick Pill */}
      <div className="absolute top-3.5 z-20 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-white/92 dark:bg-zinc-900/92 backdrop-blur-xl rounded-full border border-zinc-200/80 dark:border-white/10 shadow-lg text-xs">
        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 px-2.5">
          Size:
        </span>
        {([6, 8, 10, 12] as const).map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiameter(d)}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              selectedDiameter === d
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            {d}mm
          </button>
        ))}
      </div>

      {/* Main 2D Procedural Gemstone Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setHoveredIndex(null);
          setIsDragging(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Center Inner Circumference & Fit Status Overlay */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center p-4">
        <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Inner Circumference
        </span>
        <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">
          {calculatedCircumferenceCm} cm
        </span>
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
          Target: {targetWristSizeCm} cm
        </span>
      </div>

      {/* Selected Bead Action Bar (Floating at bottom inside canvas) */}
      {selectedIndex !== null && beads[selectedIndex] && (
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-[92%]">
          <div
            className="w-4 h-4 rounded-full border border-white/40 shadow-2xs shrink-0"
            style={{ backgroundColor: beads[selectedIndex].colorHex }}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
              Slot {selectedIndex + 1}: {beads[selectedIndex].name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {beads[selectedIndex].diameterMm}mm &bull; ${beads[selectedIndex].price.toFixed(2)}
            </span>
          </div>
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700 mx-1 shrink-0" />
          <button
            onClick={() => removeBeadAt(selectedIndex)}
            className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 text-[11px] font-semibold flex items-center gap-1 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      )}

      {/* Viewport Zoom & Rotate Controls Dock (Bottom Left) */}
      <div className="absolute bottom-20 left-4 sm:bottom-24 sm:left-6 z-20 flex flex-col gap-1 p-1 rounded-full bg-white/92 dark:bg-zinc-900/92 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setRotationAngle((a) => (a + 30) % 360)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          title="Rotate 30 Deg"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setZoomLevel(1.0);
            setRotationAngle(0);
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          title="Reset Viewport"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Canvas Quick Action Toolbar (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-[96%] flex items-center gap-1.5 p-1.5 rounded-full bg-white/92 dark:bg-zinc-900/92 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 shadow-xl overflow-x-auto scrollbar-none text-xs">
        {/* Undo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>Undo</span>
        </button>

        {/* Redo */}
        <button
          onClick={redo}
          disabled={!canRedo}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
          <span>Redo</span>
        </button>

        {/* Invert */}
        <button
          onClick={invertStrand}
          disabled={beads.length < 2}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Invert bead sequence"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Invert</span>
        </button>

        {/* Bilateral Mirror */}
        <button
          onClick={applyBilateralSymmetry}
          disabled={beads.length < 2}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Bilateral mirror symmetry"
        >
          <Split className="w-3.5 h-3.5" />
          <span>Mirror</span>
        </button>

        {/* Quadrant Symmetry */}
        <button
          onClick={applyQuadrantSymmetry}
          disabled={beads.length < 4}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="4-Quadrant symmetry"
        >
          <Grid2X2 className="w-3.5 h-3.5" />
          <span>Quadrant</span>
        </button>

        {/* Spacers */}
        <button
          onClick={handleApplyGoldSpacers}
          disabled={beads.length < 2}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Alternating spacers"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Spacers</span>
        </button>

        {/* Clear */}
        <button
          onClick={() => setIsClearModalOpen(true)}
          disabled={beads.length === 0}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 font-semibold disabled:opacity-40 transition-colors shrink-0"
          title="Clear canvas"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Mobile-Only Floating Beads Drawer Trigger */}
      <button
        type="button"
        onClick={onOpenMobileBeadDrawer}
        className="xl:hidden absolute bottom-20 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs shadow-xl active:scale-95 transition-all"
      >
        <Layers className="w-3.5 h-3.5" />
        <span>Beads</span>
      </button>

      {/* Clear Confirm Modal */}
      <ClearConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearStrand}
      />
    </section>
  );
}
