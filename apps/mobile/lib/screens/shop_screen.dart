import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../models/premade_model.dart';
import '../models/cart_item_model.dart';
import '../providers/cart_provider.dart';
import '../providers/strand_provider.dart';
import '../widgets/common/pill_button.dart';

class ShopScreen extends ConsumerWidget {
  const ShopScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Curated Premades',
          style: TextStyle(fontFamily: 'CormorantGaramond', fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: curatedPremadeCatalog.length,
        itemBuilder: (context, index) {
          final item = curatedPremadeCatalog[index];

          return Container(
            margin: const EdgeInsets.only(bottom: 16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1E2028) : Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(
                color: isDark ? Colors.white10 : const Color(0xFFE5E5E0),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFFC5A059).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        item.category.toUpperCase(),
                        style: const TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.2,
                          color: Color(0xFFC5A059),
                        ),
                      ),
                    ),
                    Text(
                      '\$${item.basePrice.toStringAsFixed(2)}',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'CormorantGaramond',
                        color: Color(0xFFC5A059),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  item.name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  item.description,
                  style: const TextStyle(fontSize: 12, color: Color(0xFF71717A)),
                ),
                const SizedBox(height: 16),

                // Action Row: Remix in Studio & Add to Bag
                Row(
                  children: [
                    Expanded(
                      child: PillButton(
                        label: 'Remix in Studio',
                        icon: LucideIcons.sparkles,
                        variant: PillButtonVariant.secondary,
                        height: 38,
                        onPressed: () {
                          ref.read(strandProvider.notifier).loadFromToken(item.designToken);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Loaded design into Customizer Studio!')),
                          );
                        },
                      ),
                    ),
                    const SizedBox(width: 8),
                    PillButton(
                      label: 'Add',
                      icon: LucideIcons.shoppingBag,
                      variant: PillButtonVariant.primary,
                      height: 38,
                      onPressed: () {
                        final cartItem = CartItemModel(
                          id: 'premade_${item.id}_${DateTime.now().millisecondsSinceEpoch}',
                          name: item.name,
                          type: 'premade',
                          token: item.designToken,
                          wristSizeCm: item.defaultWristSizeCm,
                          cordType: item.cordType,
                          beadCount: item.beadCodes.length,
                          beadSummary: '${item.beadCodes.length} Gemstones',
                          unitPrice: item.basePrice,
                          primaryGemCode: item.beadCodes.first,
                        );
                        ref.read(cartProvider.notifier).addItem(cartItem);

                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('${item.name} added to Bag!'),
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
          );
        },
      ),
    );
  }
}
