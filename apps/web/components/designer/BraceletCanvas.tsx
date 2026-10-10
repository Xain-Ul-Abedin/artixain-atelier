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
  CheckCircle2
} from 'lucide-react';
import ClearConfirmModal from './ClearConfirmModal';

interface Point {
  x: number;
  y: number;
}

export default function BraceletCanvas() {
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
    fitRating,
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
    (width: number, height: number): Array<Point & { radius: number; bead: CustomBead; index: number; angle: number }> => {
      if (beads.length === 0) return [];

      const centerX = width / 2;
      const centerY = height / 2;

      // Base radius calculation derived from bead diameters
      const totalDiameterMm = beads.reduce((acc, b) => acc + b.diameterMm, 0);
      const circumferencePx = totalDiameterMm * 14 * zoomLevel;
      const ringRadius = Math.max(90 * zoomLevel, circumferencePx / (2 * Math.PI));

      let currentAngle = (rotationAngle * Math.PI) / 180;
      const positions: Array<Point & { radius: number; bead: CustomBead; index: number; angle: number }> = [];

      for (let i = 0; i < beads.length; i++) {
        const bead = beads[i];
        const beadRadiusPx = (bead.diameterMm * 2.2) * zoomLevel;

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
      const shadowGrad = ctx.createRadialGradient(x + radius * 0.25, y + radius * 0.35, radius * 0.5, x, y, radius * 1.3);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(x + radius * 0.15, y + radius * 0.2, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Layer 2: Selection / Hover Aura
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, radius + (isSelected ? 5 : 3), 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? '#C5A059' : 'rgba(197, 160, 89, 0.6)';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();
      }

      // Layer 3: Base Mineral Sphere with Texture Variations
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();

      const baseGrad = ctx.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.35,
        radius * 0.1,
        x,
        y,
        radius
      );

      if (bead.isSpacer) {
        baseGrad.addColorStop(0, '#FFF6D6');
        baseGrad.addColorStop(0.3, bead.colorHex);
        baseGrad.addColorStop(0.8, bead.secondaryColorHex || '#785A1D');
        baseGrad.addColorStop(1, '#3B2A08');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (bead.textureType === 'chatoyant') {
        baseGrad.addColorStop(0, '#E5A93C');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.85, '#2A1704');
        baseGrad.addColorStop(1, '#120801');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        const slitGrad = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
        slitGrad.addColorStop(0, 'rgba(255, 215, 120, 0)');
        slitGrad.addColorStop(0.45, 'rgba(255, 225, 140, 0.7)');
        slitGrad.addColorStop(0.55, 'rgba(255, 225, 140, 0.7)');
        slitGrad.addColorStop(1, 'rgba(255, 215, 120, 0)');
        ctx.fillStyle = slitGrad;
        ctx.fill();
      } else if (bead.textureType === 'iridescent') {
        baseGrad.addColorStop(0, '#3A8E9E');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.8, '#1A2830');
        baseGrad.addColorStop(1, '#0C1318');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        const flashGrad = ctx.createRadialGradient(x + radius * 0.2, y - radius * 0.2, 0, x, y, radius);
        flashGrad.addColorStop(0, 'rgba(74, 222, 128, 0.55)');
        flashGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
        flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flashGrad;
        ctx.fill();
      } else if (bead.textureType === 'pyrite_flecked') {
        baseGrad.addColorStop(0, '#3B5998');
        baseGrad.addColorStop(0.5, bead.colorHex);
        baseGrad.addColorStop(0.9, '#0F1836');
        baseGrad.addColorStop(1, '#080C1D');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        ctx.fillStyle = '#E6CA65';
        ctx.fillRect(x - radius * 0.3, y + radius * 0.2, 1.5, 1.5);
        ctx.fillRect(x + radius * 0.2, y - radius * 0.1, 1.2, 1.2);
        ctx.fillRect(x - radius * 0.1, y - radius * 0.3, 1.8, 1.8);
      } else if (bead.textureType === 'banded') {
        baseGrad.addColorStop(0, '#34D399');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.85, '#064E3B');
        baseGrad.addColorStop(1, '#022C22');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x - radius * 0.2, y - radius * 0.2, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        baseGrad.addColorStop(0, bead.secondaryColorHex || '#E4E4E7');
        baseGrad.addColorStop(0.45, bead.colorHex);
        baseGrad.addColorStop(0.9, '#18181B');
        baseGrad.addColorStop(1, '#09090B');
        ctx.fillStyle = baseGrad;
        ctx.fill();
      }

      // Layer 4: Specular Reflection Highlight
      const specX = x - radius * 0.32;
      const specY = y - radius * 0.32;
      const specGrad = ctx.createRadialGradient(specX, specY, 0, specX, specY, radius * 0.4);
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      specGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(specX, specY, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Secondary micro highlight
      const secX = x + radius * 0.35;
      const secY = y + radius * 0.35;
      const secGrad = ctx.createRadialGradient(secX, secY, 0, secX, secY, radius * 0.25);
      secGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      secGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = secGrad;
      ctx.beginPath();
      ctx.arc(secX, secY, radius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    ctx.restore();
  }, [beads, selectedIndex, hoveredIndex, mousePos, getBeadPositions, zoomLevel]);

  // Mouse Interaction Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const positions = getBeadPositions(rect.width, rect.height);
    const hit = positions.find((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= p.radius + 4;
    });

    setHoveredIndex(hit ? hit.index : null);

    if (isDragging && draggedIndex !== null) {
      if (hit && hit.index !== draggedIndex) {
        reorderBeads(draggedIndex, hit.index);
        setDraggedIndex(hit.index);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const positions = getBeadPositions(rect.width, rect.height);
    const hit = positions.find((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= p.radius + 4;
    });

    if (hit) {
      setSelectedIndex(hit.index);
      setDraggedIndex(hit.index);
      setIsDragging(true);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

  // Touch Event Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePos({ x, y });

    const positions = getBeadPositions(rect.width, rect.height);
    const hit = positions.find((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= p.radius + 8;
    });

    if (hit) {
      setSelectedIndex(hit.index);
      setDraggedIndex(hit.index);
      setIsDragging(true);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePos({ x, y });

    if (isDragging && draggedIndex !== null) {
      const positions = getBeadPositions(rect.width, rect.height);
      const hit = positions.find((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= p.radius + 8;
      });
      if (hit && hit.index !== draggedIndex) {
        reorderBeads(draggedIndex, hit.index);
        setDraggedIndex(hit.index);
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
    <div className="flex flex-col gap-3 w-full">
      {/* Top Bead Diameter Quick Pill */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-white/10 w-max self-start text-xs">
        <span className="text-[10px] uppercase font-bold text-zinc-400 px-2.5">Bead Size:</span>
        {([6, 8, 10, 12] as const).map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiameter(d)}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              selectedDiameter === d
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            {d}mm
          </button>
        ))}
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] sm:h-[460px] md:h-[520px] rounded-3xl bg-radial-vignette border border-zinc-200/80 dark:border-white/10 shadow-luxury overflow-hidden flex items-center justify-center select-none"
      >
        {/* 2D Procedural Gemstone Canvas */}
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

        {/* Viewport Zoom & Rotate Controls (Top-Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-1 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-sm">
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

        {/* Center Inner Circumference & Fit Badge */}
        <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center p-4">
          <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Inner Circumference
          </span>
          <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">
            {calculatedCircumferenceCm} cm
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Target: {targetWristSizeCm} cm
            </span>
          </div>
        </div>

        {/* Selected Bead Action Bar (Floating at bottom inside canvas) */}
        {selectedIndex !== null && beads[selectedIndex] && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-[92%]">
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
      </div>

      {/* Floating Canvas Quick Action Toolbar (Undo, Redo, Invert, Clear, Symmetry) */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 shadow-sm text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Undo Button */}
          <button
            onClick={undo}
            disabled={!canUndo}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
            title="Undo last change"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          {/* Redo Button */}
          <button
            onClick={redo}
            disabled={!canRedo}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
            title="Redo change"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span>Redo</span>
          </button>

          {/* Invert Sequence */}
          <button
            onClick={invertStrand}
            disabled={beads.length < 2}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
            title="Invert bead strand order"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Invert</span>
          </button>

          {/* Bilateral Symmetry */}
          <button
            onClick={applyBilateralSymmetry}
            disabled={beads.length < 2}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
          >
            <Split className="w-3.5 h-3.5" />
            <span>Mirror</span>
          </button>

          {/* Quadrant Symmetry */}
          <button
            onClick={applyQuadrantSymmetry}
            disabled={beads.length < 4}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>4-Quadrant</span>
          </button>

          {/* Gold Spacers */}
          <button
            onClick={handleApplyGoldSpacers}
            disabled={beads.length < 2}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Spacers</span>
          </button>
        </div>

        {/* Clear Canvas Action */}
        <button
          onClick={() => setIsClearModalOpen(true)}
          disabled={beads.length === 0}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 font-semibold disabled:opacity-40 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Canvas</span>
        </button>
      </div>

      {/* Clear Confirm Modal */}
      <ClearConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearStrand}
      />
    </div>
  );
}
