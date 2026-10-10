import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../providers/strand_provider.dart';
import 'bracelet_custom_painter.dart';

class InteractiveStrandCanvas extends ConsumerStatefulWidget {
  const InteractiveStrandCanvas({super.key});

  @override
  ConsumerState<InteractiveStrandCanvas> createState() => _InteractiveStrandCanvasState();
}

class _InteractiveStrandCanvasState extends ConsumerState<InteractiveStrandCanvas> {
  double _zoomScale = 1.0;
  double _baseZoom = 1.0;
  double _baseRotation = 0.0;
  Offset? _lightOffset;
  double _lastTouchAngle = 0.0;
  int? _draggedIndex;

  @override
  Widget build(BuildContext context) {
    final strand = ref.watch(strandProvider);
    final strandNotifier = ref.read(strandProvider.notifier);

    return LayoutBuilder(
      builder: (context, constraints) {
        final painter = BraceletCustomPainter(
          beads: strand.beads,
          selectedIndex: strand.selectedIndex,
          rotationAngle: strand.rotationAngle,
          zoomScale: _zoomScale,
          lightOffset: _lightOffset,
        );

        return Container(
          width: constraints.maxWidth,
          height: constraints.maxHeight,
          decoration: BoxDecoration(
            color: Theme.of(context).brightness == Brightness.dark
                ? const Color(0xFF14161C)
                : const Color(0xFFF6F6F2),
            borderRadius: BorderRadius.circular(32),
            border: Border.all(
              color: Theme.of(context).brightness == Brightness.dark
                  ? Colors.white.withOpacity(0.08)
                  : const Color(0xFFE5E5E0),
            ),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Interactive 120 FPS Canvas & Tactile Multi-Touch Recognizer
              GestureDetector(
                onScaleStart: (details) {
                  _baseZoom = _zoomScale;
                  _baseRotation = strand.rotationAngle;
                  final local = details.localFocalPoint;
                  _lightOffset = local;
                  final center = Offset(constraints.maxWidth / 2, constraints.maxHeight / 2);
                  _lastTouchAngle = math.atan2(local.dy - center.dy, local.dx - center.dx);

                  if (details.pointerCount == 1) {
                    final positions = painter.calculateBeadPositions(Size(constraints.maxWidth, constraints.maxHeight));
                    int? hitIndex;
                    for (var p in positions) {
                      final dist = (p.center - local).distance;
                      if (dist <= p.radius + 10.0) {
                        hitIndex = p.index;
                        break;
                      }
                    }

                    if (hitIndex != null) {
                      strandNotifier.setSelectedIndex(hitIndex);
                      _draggedIndex = hitIndex;
                      HapticFeedback.selectionClick();
                    } else {
                      strandNotifier.setSelectedIndex(null);
                      _draggedIndex = null;
                    }
                  }
                },
                onScaleUpdate: (details) {
                  final local = details.localFocalPoint;
                  _lightOffset = local;
                  final center = Offset(constraints.maxWidth / 2, constraints.maxHeight / 2);

                  if (details.pointerCount >= 2) {
                    setState(() {
                      _zoomScale = (_baseZoom * details.scale).clamp(0.7, 2.2);
                    });
                    final rotationDelta = details.rotation * 180.0 / math.pi;
                    strandNotifier.setRotationAngle((_baseRotation + rotationDelta) % 360);
                  } else {
                    final currentAngle = math.atan2(local.dy - center.dy, local.dx - center.dx);
                    final deltaAngle = (currentAngle - _lastTouchAngle) * 180.0 / math.pi;

                    if (_draggedIndex != null) {
                      final positions = painter.calculateBeadPositions(Size(constraints.maxWidth, constraints.maxHeight));
                      int? targetIndex;
                      double minDistance = double.infinity;
                      for (var p in positions) {
                        final dist = (p.center - local).distance;
                        if (dist < minDistance) {
                          minDistance = dist;
                          targetIndex = p.index;
                        }
                      }

                      if (targetIndex != null && targetIndex != _draggedIndex && minDistance < 36.0) {
                        strandNotifier.reorderBeads(_draggedIndex!, targetIndex);
                        _draggedIndex = targetIndex;
                        HapticFeedback.selectionClick();
                      }
                    } else {
                      strandNotifier.setRotationAngle((strand.rotationAngle + deltaAngle) % 360);
                    }

                    _lastTouchAngle = currentAngle;
                  }
                },
                onScaleEnd: (_) {
                  _draggedIndex = null;
                },
                child: CustomPaint(
                  size: Size(constraints.maxWidth, constraints.maxHeight),
                  painter: painter,
                ),
              ),

              // Center Telemetry & Fit Badge
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'CIRCUMFERENCE',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2.0,
                      color: Theme.of(context).brightness == Brightness.dark
                          ? const Color(0xFFA1A1AA)
                          : const Color(0xFF71717A),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${strand.calculatedCircumferenceCm} cm',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'CormorantGaramond',
                      color: Theme.of(context).brightness == Brightness.dark
                          ? Colors.white
                          : const Color(0xFF0F1115),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: strand.fitStatus == 'perfect'
                          ? const Color(0xFF10B981).withOpacity(0.15)
                          : const Color(0xFFF59E0B).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: strand.fitStatus == 'perfect'
                            ? const Color(0xFF10B981)
                            : const Color(0xFFF59E0B),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      'Target: ${strand.targetWristSizeCm}cm (${strand.fitStatus.toUpperCase()})',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: strand.fitStatus == 'perfect'
                            ? const Color(0xFF059669)
                            : const Color(0xFFD97706),
                      ),
                    ),
                  ),
                ],
              ),

              // Canvas Floating Controls (Top Right Capsule)
              Positioned(
                top: 16,
                right: 16,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                  decoration: BoxDecoration(
                    color: Theme.of(context).brightness == Brightness.dark
                        ? const Color(0xFF1F222A)
                        : Colors.white,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(LucideIcons.zoomIn, size: 16),
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                        onPressed: () {
                          setState(() {
                            _zoomScale = (_zoomScale + 0.1).clamp(0.7, 1.4);
                          });
                        },
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.zoomOut, size: 16),
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                        onPressed: () {
                          setState(() {
                            _zoomScale = (_zoomScale - 0.1).clamp(0.7, 1.4);
                          });
                        },
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.rotateCw, size: 16),
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                        onPressed: () {
                          strandNotifier.setRotationAngle((strand.rotationAngle + 30) % 360);
                        },
                      ),
                    ],
                  ),
                ),
              ),

              // Selected Bead Inspection & Remove Pill (Bottom Center)
              if (strand.selectedIndex != null &&
                  strand.selectedIndex! < strand.beads.length)
                Positioned(
                  bottom: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? const Color(0xFF1F222A)
                          : Colors.white,
                      borderRadius: BorderRadius.circular(30),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.12),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'Slot ${strand.selectedIndex! + 1}: ${strand.beads[strand.selectedIndex!].name}',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(width: 10),
                        GestureDetector(
                          onTap: () {
                            strandNotifier.removeBeadAt(strand.selectedIndex!);
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xFFFEE2E2),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Row(
                              children: [
                                Icon(LucideIcons.trash2, size: 12, color: Color(0xFFDC2626)),
                                SizedBox(width: 4),
                                Text(
                                  'Remove',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFFDC2626),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
