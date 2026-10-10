import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../providers/strand_provider.dart';
import '../providers/cart_provider.dart';
import '../models/gemstone_model.dart';
import '../models/cart_item_model.dart';
import '../widgets/canvas/interactive_strand_canvas.dart';
import '../widgets/common/pill_button.dart';
import '../widgets/common/sizing_modal_sheet.dart';

class StudioScreen extends ConsumerStatefulWidget {
  const StudioScreen({super.key});

  @override
  ConsumerState<StudioScreen> createState() => _StudioScreenState();
}

class _StudioScreenState extends ConsumerState<StudioScreen> {
  String _selectedCategory = 'all';
  String _selectedChakra = 'all';

  @override
  Widget build(BuildContext context) {
    final strand = ref.watch(strandProvider);
    final strandNotifier = ref.read(strandProvider.notifier);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                // Top Header Capsule
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      // Studio Title
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'ATELIER CUSTOMIZER',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.5,
                              color: Color(0xFFC5A059),
                            ),
                          ),
                          Text(
                            '${strand.beads.length} Beads (${strand.calculatedCircumferenceCm}cm)',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF71717A),
                            ),
                          ),
                        ],
                      ),

                      // Actions: Size Pill & Live Price Pill
                      Row(
                        children: [
                          // Sizing Calibration Pill
                          InkWell(
                            onTap: () => SizingModalSheet.show(context),
                            borderRadius: BorderRadius.circular(20),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              decoration: BoxDecoration(
                                color: isDark ? const Color(0xFF1F222A) : const Color(0xFFF0F0EC),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                children: [
                                  const Icon(LucideIcons.ruler, size: 14, color: Color(0xFFC5A059)),
                                  const SizedBox(width: 4),
                                  Text(
                                    '${strand.targetWristSizeCm}cm',
                                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),

                          // Live Price & Add to Cart Pill
                          PillButton(
                            label: '\$${strand.totalPrice.toStringAsFixed(2)}',
                            icon: LucideIcons.shoppingBag,
                            height: 38,
                            variant: PillButtonVariant.primary,
                            onPressed: strand.beads.isEmpty
                                ? null
                                : () {
                                    final cartItem = CartItemModel(
                                      id: 'custom_${DateTime.now().millisecondsSinceEpoch}',
                                      name: 'Bespoke Custom Bracelet',
                                      type: 'custom',
                                      token: strand.designToken,
                                      wristSizeCm: strand.targetWristSizeCm,
                                      cordType: strand.cordType,
                                      beadCount: strand.beads.length,
                                      beadSummary: '${strand.beads.length} Gemstones',
                                      unitPrice: strand.totalPrice,
                                      primaryGemCode: strand.beads.first.code,
                                    );
                                    ref.read(cartProvider.notifier).addItem(cartItem);

                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: const Text('Bespoke strand added to Atelier Bag!'),
                                        behavior: SnackBarBehavior.floating,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                                      ),
                                    );
                                  },
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Center 120 FPS Interactive Canvas
                const Expanded(
                  flex: 5,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: InteractiveStrandCanvas(),
                  ),
                ),

                // Symmetry Quick Actions Bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Bilateral Mirror
                      _buildSymmetryChip('Mirror', LucideIcons.split, () {
                        strandNotifier.applyBilateralSymmetry();
                      }),
                      // 4-Quadrant
                      _buildSymmetryChip('Quadrant', LucideIcons.grid2X2, () {
                        strandNotifier.applyQuadrantSymmetry();
                      }),
                      // Gold Spacers
                      _buildSymmetryChip('Gold Spacers', LucideIcons.sparkles, () {
                        final gsp = getGemstoneByCode('GSP');
                        strandNotifier.applyAlternatingSpacers(gsp);
                      }),
                      // Clear
                      _buildSymmetryChip('Clear', LucideIcons.trash2, () {
                        strandNotifier.clearStrand();
                      }),
                    ],
                  ),
                ),

                // Bottom Bead Palette Shelf (Flex 4)
                Expanded(
                  flex: 4,
                  child: Container(
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF14161C) : Colors.white,
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.06),
                          blurRadius: 16,
                          offset: const Offset(0, -4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Diameter Selector Row & Palette Title
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.between,
                            children: [
                              const Text(
                                'Gemstone & Spacer Palette',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'CormorantGaramond',
                                ),
                              ),
                              // Diameter Selector
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                decoration: BoxDecoration(
                                  color: isDark ? const Color(0xFF1F222A) : const Color(0xFFF0F0EC),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Row(
                                  children: [6, 8, 10, 12].map((d) {
                                    final isSelected = strand.selectedDiameter == d;
                                    return GestureDetector(
                                      onTap: () => strandNotifier.setSelectedDiameter(d),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: isSelected
                                              ? (isDark ? Colors.white : const Color(0xFF0F1115))
                                              : Colors.transparent,
                                          borderRadius: BorderRadius.circular(16),
                                        ),
                                        child: Text(
                                          '${d}mm',
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                            color: isSelected
                                                ? (isDark ? const Color(0xFF0F1115) : Colors.white)
                                                : const Color(0xFF71717A),
                                          ),
                                        ),
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ],
                          ),
                        ),

                        // Horizontal Gemstone Cards Carousel
                        Expanded(
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            itemCount: masterGemstones.length,
                            itemBuilder: (context, index) {
                              final gem = masterGemstones[index];
                              final diam = gem.isSpacer ? 6 : strand.selectedDiameter;
                              final price = gem.getPrice(diam);
                              final cleanColor = Color(int.parse('FF${gem.colorHex.replaceAll('#', '')}', radix: 16));

                              return GestureDetector(
                                onTap: () {
                                  if (strand.selectedIndex != null) {
                                    strandNotifier.replaceBeadAt(strand.selectedIndex!, gem);
                                  } else {
                                    strandNotifier.addBead(gem);
                                  }
                                },
                                child: Container(
                                  width: 100,
                                  margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF1E2028) : const Color(0xFFFBFBF9),
                                    borderRadius: BorderRadius.circular(20),
                                    border: Border.all(
                                      color: isDark ? Colors.white10 : const Color(0xFFE5E5E0),
                                    ),
                                  ),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      // Gem Orb Swatch
                                      Container(
                                        width: 38,
                                        height: 38,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: cleanColor,
                                          boxShadow: [
                                            BoxShadow(
                                              color: Colors.black.withOpacity(0.15),
                                              blurRadius: 4,
                                              offset: const Offset(0, 2),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        gem.name,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.center,
                                        style: const TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        '\$${price.toStringAsFixed(2)}',
                                        style: const TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFC5A059),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSymmetryChip(String label, IconData icon, VoidCallback onTap) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1E2028) : const Color(0xFFF0F0EC),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 12, color: const Color(0xFFC5A059)),
            const SizedBox(width: 4),
            Text(
              label,
              style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}
