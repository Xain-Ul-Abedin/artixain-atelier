import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../models/strand_item_model.dart';

class BeadRenderPosition {
  final int index;
  final StrandItemModel bead;
  final Offset center;
  final double radius;
  final double angle;

  BeadRenderPosition({
    required this.index,
    required this.bead,
    required this.center,
    required this.radius,
    required this.angle,
  });
}

class BraceletCustomPainter extends CustomPainter {
  final List<StrandItemModel> beads;
  final int? selectedIndex;
  final double rotationAngle;
  final double zoomScale;
  final Offset? lightOffset;

  BraceletCustomPainter({
    required this.beads,
    this.selectedIndex,
    required this.rotationAngle,
    this.zoomScale = 1.0,
    this.lightOffset,
  });

  List<BeadRenderPosition> calculateBeadPositions(Size size) {
    if (beads.isEmpty) return [];

    final center = Offset(size.width / 2, size.height / 2);
    final totalDiameterMm = beads.fold<int>(0, (sum, b) => sum + b.diameterMm);
    final circumferencePx = totalDiameterMm * 14.0 * zoomScale;
    final ringRadius = math.max(80.0 * zoomScale, circumferencePx / (2 * math.pi));

    double currentAngle = (rotationAngle * math.pi) / 180.0;
    final positions = <BeadRenderPosition>[];

    for (int i = 0; i < beads.length; i++) {
      final bead = beads[i];
      final beadRadiusPx = (bead.diameterMm * 2.2) * zoomScale;
      final beadAngleSpan = (bead.diameterMm / totalDiameterMm) * (2 * math.pi);
      final centerAngle = currentAngle + beadAngleSpan / 2;

      final bx = center.dx + ringRadius * math.cos(centerAngle);
      final by = center.dy + ringRadius * math.sin(centerAngle);

      positions.add(
        BeadRenderPosition(
          index: i,
          bead: bead,
          center: Offset(bx, by),
          radius: beadRadiusPx,
          angle: centerAngle,
        ),
      );

      currentAngle += beadAngleSpan;
    }

    return positions;
  }

  Color _parseHex(String hex) {
    final clean = hex.replaceAll('#', '');
    return Color(int.parse('FF$clean', radix: 16));
  }

  @override
  void paint(Canvas canvas, Size size) {
    final positions = calculateBeadPositions(size);
    if (positions.isEmpty) return;

    // Layer 1: Draw Elastic Silicone Cord Core
    if (positions.length > 1) {
      final cordPath = Path();
      cordPath.moveTo(positions.first.center.dx, positions.first.center.dy);
      for (int i = 1; i < positions.length; i++) {
        cordPath.lineTo(positions[i].center.dx, positions[i].center.dy);
      }
      cordPath.close();

      final cordPaint = Paint()
        ..color = const Color(0x70A1A1AA)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5 * zoomScale;
      canvas.drawPath(cordPath, cordPaint);
    }

    final lightCenter = lightOffset ?? Offset(size.width * 0.3, size.height * 0.3);

    // Render Each Bead using 6-Layer Procedural Mineral Shader
    for (var pos in positions) {
      final center = pos.center;
      final radius = pos.radius;
      final bead = pos.bead;
      final isSelected = selectedIndex == pos.index;
      final baseColor = _parseHex(bead.colorHex);
      final secondaryColor = bead.secondaryColorHex != null ? _parseHex(bead.secondaryColorHex!) : const Color(0xFF18181B);

      // Layer 1: Ambient Contact Shadow
      final shadowPaint = Paint()
        ..shader = RadialGradient(
          colors: [
            Colors.black.withOpacity(0.35),
            Colors.transparent,
          ],
        ).createShader(
          Rect.fromCircle(
            center: Offset(center.dx + radius * 0.2, center.dy + radius * 0.25),
            radius: radius * 1.3,
          ),
        );
      canvas.drawCircle(Offset(center.dx + radius * 0.15, center.dy + radius * 0.2), radius * 1.15, shadowPaint);

      // Selection Halo
      if (isSelected) {
        final selectPaint = Paint()
          ..color = const Color(0xFFC5A059)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.5;
        canvas.drawCircle(center, radius + 4.0, selectPaint);
      }

      // Clip canvas to sphere
      canvas.save();
      final beadPath = Path()..addOval(Rect.fromCircle(center: center, radius: radius));
      canvas.clipPath(beadPath);

      // Layer 3: Procedural Mineral Sphere Shader
      if (bead.isSpacer) {
        // Metallic Spacer
        final metalShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            const Color(0xFFFFF6D6),
            baseColor,
            secondaryColor,
            const Color(0xFF3B2A08),
          ],
          stops: const [0.0, 0.35, 0.8, 1.0],
        ).createShader(Rect.fromCircle(center: center, radius: radius));

        canvas.drawCircle(center, radius, Paint()..shader = metalShader);

        // Metallic relief line
        final linePaint = Paint()
          ..color = Colors.white.withOpacity(0.3)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.0;
        canvas.drawCircle(center, radius * 0.6, linePaint);
      } else if (bead.textureType == 'chatoyant') {
        // Tiger's Eye Chatoyancy Slit
        final chatoyantShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            const Color(0xFFE5A93C),
            baseColor,
            const Color(0xFF2A1704),
            const Color(0xFF120801),
          ],
          stops: const [0.0, 0.4, 0.85, 1.0],
        ).createShader(Rect.fromCircle(center: center, radius: radius));

        canvas.drawCircle(center, radius, Paint()..shader = chatoyantShader);

        // Bright optical chatoyant slit
        final slitPaint = Paint()
          ..shader = const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Colors.transparent,
              Color(0xB0FFE18C),
              Color(0xB0FFE18C),
              Colors.transparent,
            ],
            stops: [0.0, 0.45, 0.55, 1.0],
          ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, slitPaint);
      } else if (bead.textureType == 'iridescent') {
        // Labradorite Flash
        final iridescentShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            const Color(0xFF3A8E9E),
            baseColor,
            const Color(0xFF1A2830),
            const Color(0xFF0C1318),
          ],
        ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, Paint()..shader = iridescentShader);

        // Peacock Iridescent Sheen
        final flashPaint = Paint()
          ..shader = const RadialGradient(
            center: Alignment(0.2, -0.2),
            colors: [
              Color(0x904ADE80),
              Color(0x6038BDF8),
              Colors.transparent,
            ],
          ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, flashPaint);
      } else if (bead.textureType == 'pyrite_flecked') {
        // Lapis Lazuli with golden pyrite
        final lapisShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            const Color(0xFF3B5998),
            baseColor,
            const Color(0xFF0F1836),
            const Color(0xFF080C1D),
          ],
        ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, Paint()..shader = lapisShader);

        // Pyrite flecks
        final pyritePaint = Paint()..color = const Color(0xFFE6CA65);
        canvas.drawRect(Rect.fromLTWH(center.dx - radius * 0.3, center.dy + radius * 0.2, 1.5, 1.5), pyritePaint);
        canvas.drawRect(Rect.fromLTWH(center.dx + radius * 0.2, center.dy - radius * 0.1, 1.2, 1.2), pyritePaint);
        canvas.drawRect(Rect.fromLTWH(center.dx - radius * 0.1, center.dy - radius * 0.3, 1.8, 1.8), pyritePaint);
      } else if (bead.textureType == 'banded') {
        // Malachite Banding
        final malachiteShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            const Color(0xFF34D399),
            baseColor,
            const Color(0xFF064E3B),
            const Color(0xFF022C22),
          ],
        ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, Paint()..shader = malachiteShader);

        final bandPaint = Paint()
          ..color = const Color(0x6010B981)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.0;
        canvas.drawCircle(Offset(center.dx - radius * 0.2, center.dy - radius * 0.2), radius * 0.5, bandPaint);
      } else {
        // Standard Translucent Gemstone
        final defaultShader = RadialGradient(
          center: const Alignment(-0.35, -0.35),
          colors: [
            Colors.white.withOpacity(0.6),
            baseColor,
            secondaryColor,
            const Color(0xFF09090B),
          ],
          stops: const [0.0, 0.25, 0.8, 1.0],
        ).createShader(Rect.fromCircle(center: center, radius: radius));
        canvas.drawCircle(center, radius, Paint()..shader = defaultShader);
      }

      // Layer 4: Subsurface Scattering Inner Halo
      final innerGlowPaint = Paint()
        ..shader = RadialGradient(
          colors: [
            Colors.transparent,
            Colors.black.withOpacity(0.4),
          ],
          stops: const [0.65, 1.0],
        ).createShader(Rect.fromCircle(center: center, radius: radius));
      canvas.drawCircle(center, radius, innerGlowPaint);

      // Layer 5: Dynamic Specular Highlight Point
      final dx = lightCenter.dx - center.dx;
      final dy = lightCenter.dy - center.dy;
      final dist = math.sqrt(dx * dx + dy * dy).clamp(1.0, 999.0);
      final specOffsetX = -(dx / dist) * (radius * 0.38);
      final specOffsetY = -(dy / dist) * (radius * 0.38);
      final specCenter = Offset(center.dx + specOffsetX, center.dy + specOffsetY);

      final specPaint = Paint()
        ..shader = RadialGradient(
          colors: [
            Colors.white.withOpacity(0.88),
            Colors.white.withOpacity(0.3),
            Colors.transparent,
          ],
          stops: const [0.0, 0.4, 1.0],
        ).createShader(Rect.fromCircle(center: specCenter, radius: radius * 0.35));
      canvas.drawCircle(specCenter, radius * 0.35, specPaint);

      canvas.restore();

      // Layer 6: Drill Hole Indicator
      canvas.drawCircle(center, 1.2 * zoomScale, Paint()..color = const Color(0x70000000));
    }
  }

  @override
  bool shouldRepaint(covariant BraceletCustomPainter oldDelegate) {
    return oldDelegate.beads != beads ||
        oldDelegate.selectedIndex != selectedIndex ||
        oldDelegate.rotationAngle != rotationAngle ||
        oldDelegate.zoomScale != zoomScale ||
        oldDelegate.lightOffset != lightOffset;
  }
}
