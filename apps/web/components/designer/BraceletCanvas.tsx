'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDesigner, CustomBead } from '../../context/DesignerContext';
import { RotateCw, ZoomIn, ZoomOut, Trash2, Sparkles, RefreshCw } from 'lucide-react';

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
    fitStatus,
    targetWristSizeCm,
    calculatedCircumferenceCm
  } = useDesigner();

  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

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

      // Procedural Texture Shading based on textureType
      const baseGrad = ctx.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.35,
        radius * 0.1,
        x,
        y,
        radius
      );

      if (bead.isSpacer) {
        // Metallic spacer gradient (Gold, Silver, Gunmetal)
        baseGrad.addColorStop(0, '#FFF6D6');
        baseGrad.addColorStop(0.3, bead.colorHex);
        baseGrad.addColorStop(0.8, bead.secondaryColorHex || '#785A1D');
        baseGrad.addColorStop(1, '#3B2A08');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Spacer micro-beveled grooves
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (bead.textureType === 'chatoyant') {
        // Tigers Eye Chatoyancy Slit
        baseGrad.addColorStop(0, '#E5A93C');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.85, '#2A1704');
        baseGrad.addColorStop(1, '#120801');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Chatoyant bright light band
        const slitGrad = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
        slitGrad.addColorStop(0, 'rgba(255, 215, 120, 0)');
        slitGrad.addColorStop(0.45, 'rgba(255, 225, 140, 0.7)');
        slitGrad.addColorStop(0.55, 'rgba(255, 225, 140, 0.7)');
        slitGrad.addColorStop(1, 'rgba(255, 215, 120, 0)');
        ctx.fillStyle = slitGrad;
        ctx.fill();
      } else if (bead.textureType === 'iridescent') {
        // Labradorite Peacock Iridescence
        baseGrad.addColorStop(0, '#3A8E9E');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.8, '#1A2830');
        baseGrad.addColorStop(1, '#0C1318');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Labradorite flash angle
        const flashGrad = ctx.createRadialGradient(x + radius * 0.2, y - radius * 0.2, 0, x, y, radius);
        flashGrad.addColorStop(0, 'rgba(74, 222, 128, 0.55)');
        flashGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
        flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flashGrad;
        ctx.fill();
      } else if (bead.textureType === 'pyrite_flecked') {
        // Lapis Lazuli with golden pyrite flecks
        baseGrad.addColorStop(0, '#3B5998');
        baseGrad.addColorStop(0.5, bead.colorHex);
        baseGrad.addColorStop(0.9, '#0F1836');
        baseGrad.addColorStop(1, '#080C1D');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Scattered pyrite speckles
        ctx.fillStyle = '#E6CA65';
        ctx.fillRect(x - radius * 0.3, y + radius * 0.2, 1.5, 1.5);
        ctx.fillRect(x + radius * 0.2, y - radius * 0.1, 1.2, 1.2);
        ctx.fillRect(x - radius * 0.1, y - radius * 0.3, 1.8, 1.8);
      } else if (bead.textureType === 'banded') {
        // Malachite / Agate Concentric Bands
        baseGrad.addColorStop(0, '#34D399');
        baseGrad.addColorStop(0.4, bead.colorHex);
        baseGrad.addColorStop(0.85, '#064E3B');
        baseGrad.addColorStop(1, '#022C22');
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Band rings
        ctx.beginPath();
        ctx.arc(x - radius * 0.2, y - radius * 0.2, radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Standard Translucent / Vitreous Gemstone
        baseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        baseGrad.addColorStop(0.25, bead.colorHex);
        baseGrad.addColorStop(0.8, bead.secondaryColorHex || '#18181B');
        baseGrad.addColorStop(1, '#09090B');
        ctx.fillStyle = baseGrad;
        ctx.fill();
      }

      // Layer 4: Subsurface Scattering Inner Halo
      const innerGlow = ctx.createRadialGradient(x, y, radius * 0.65, x, y, radius);
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
      innerGlow.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Layer 5: Dynamic Specular Highlight reacting to Light/Mouse
      const dx = lightX - x;
      const dy = lightY - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const specOffsetX = -(dx / dist) * (radius * 0.38);
      const specOffsetY = -(dy / dist) * (radius * 0.38);

      const specGrad = ctx.createRadialGradient(
        x + specOffsetX,
        y + specOffsetY,
        0,
        x + specOffsetX,
        y + specOffsetY,
        radius * 0.35
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
      specGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(x + specOffsetX, y + specOffsetY, radius * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Layer 6: Drill Hole Indicator
      ctx.beginPath();
      ctx.arc(x, y, 1.2 * zoomLevel, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fill();
    });

    ctx.restore();
  }, [beads, selectedIndex, hoveredIndex, rotationAngle, zoomLevel, mousePos, getBeadPositions]);

  // Handle Mouse & Touch Interactions
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[520px] rounded-3xl bg-radial-vignette border border-zinc-200/80 dark:border-white/10 shadow-luxury overflow-hidden flex items-center justify-center select-none"
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
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Canvas Quick Controls (Top-Right) */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1.5 floating-capsule">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
          className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
          className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setRotationAngle((a) => (a + 30) % 360)}
          className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Rotate 30 Deg"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setZoomLevel(1.0);
            setRotationAngle(0);
          }}
          className="icon-orb-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Reset Viewport"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Center Wrist Sizing & Fit Badge */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center p-4">
        <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Inner Circumference
        </span>
        <span className="text-2xl font-serif font-bold text-obsidian-900 dark:text-white">
          {calculatedCircumferenceCm} cm
        </span>
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
              fitStatus === 'perfect'
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : fitStatus === 'loose'
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
            }`}
          >
            Target: {targetWristSizeCm} cm ({fitStatus.toUpperCase()})
          </span>
        </div>
      </div>

      {/* Selected Bead Action Bar (Bottom Floating Capsule) */}
      {selectedIndex !== null && beads[selectedIndex] && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 floating-capsule animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div
            className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: beads[selectedIndex].colorHex }}
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-obsidian-900 dark:text-white">
              Slot {selectedIndex + 1}: {beads[selectedIndex].name}
            </span>
            <span className="text-[10px] text-zinc-500">
              {beads[selectedIndex].diameterMm}mm • ${beads[selectedIndex].price.toFixed(2)}
            </span>
          </div>
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700 mx-1" />
          <button
            onClick={() => removeBeadAt(selectedIndex)}
            className="btn-pill px-3 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 text-[11px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
}
