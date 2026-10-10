import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../providers/cart_provider.dart';
import '../models/gemstone_model.dart';
import '../widgets/common/pill_button.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);
    final cartNotifier = ref.read(cartProvider.notifier);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Atelier Bag (${cart.totalItemCount})',
          style: const TextStyle(fontFamily: 'CormorantGaramond', fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: cart.items.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(LucideIcons.shoppingBag, size: 64, color: isDark ? Colors.white24 : Colors.black12),
                  const SizedBox(height: 16),
                  const Text(
                    'Your Atelier Bag is Empty',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'CormorantGaramond'),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Design bespoke strands or explore curated sets',
                    style: TextStyle(fontSize: 12, color: Color(0xFF71717A)),
                  ),
                ],
              ),
            )
          : Column(
              children: [
                // Volume Discount Tier Banner
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFC5A059).withOpacity(0.12),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFC5A059).withOpacity(0.25)),
                  ),
                  child: Row(
                    children: [
                      const Icon(LucideIcons.tag, size: 16, color: Color(0xFFC5A059)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          cart.pricing.volumeTierMessage,
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFC5A059),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Items List
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    itemCount: cart.items.length,
                    itemBuilder: (context, index) {
                      final item = cart.items[index];
                      final gem = getGemstoneByCode(item.primaryGemCode);
                      final cleanColor = Color(int.parse('FF${gem.colorHex.replaceAll('#', '')}', radix: 16));

                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1E2028) : Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isDark ? Colors.white10 : const Color(0xFFE5E5E0),
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: cleanColor,
                              ),
                            ),
                            const SizedBox(width: 12),

                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.name,
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                  ),
                                  Text(
                                    '${item.wristSizeCm}cm • ${item.beadCount} beads',
                                    style: const TextStyle(fontSize: 11, color: Color(0xFF71717A)),
                                  ),
                                  const SizedBox(height: 6),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      // Quantity stepper
                                      Row(
                                        children: [
                                          InkWell(
                                            onTap: () => cartNotifier.updateQuantity(item.id, -1),
                                            child: const Icon(LucideIcons.minusCircle, size: 18),
                                          ),
                                          Padding(
                                            padding: const EdgeInsets.symmetric(horizontal: 8),
                                            child: Text(
                                              '${item.quantity}',
                                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                                            ),
                                          ),
                                          InkWell(
                                            onTap: () => cartNotifier.updateQuantity(item.id, 1),
                                            child: const Icon(LucideIcons.plusCircle, size: 18),
                                          ),
                                        ],
                                      ),

                                      Text(
                                        '\$${(item.unitPrice * item.quantity).toStringAsFixed(2)}',
                                        style: const TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFC5A059),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),

                // Order Checkout Card
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF161820) : Colors.white,
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 16,
                        offset: const Offset(0, -4),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Subtotal', style: TextStyle(fontSize: 12, color: Color(0xFF71717A))),
                          Text('\$${cart.pricing.subtotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                      if (cart.pricing.discountAmount > 0) ...[
                        const SizedBox(height: 4),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.between,
                          children: [
                            const Text('Volume Savings', style: TextStyle(fontSize: 12, color: Color(0xFF059669), fontWeight: FontWeight.bold)),
                            Text('-\$${cart.pricing.discountAmount.toStringAsFixed(2)}', style: const TextStyle(fontSize: 12, color: Color(0xFF059669), fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                      const SizedBox(height: 4),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Shipping', style: TextStyle(fontSize: 12, color: Color(0xFF71717A))),
                          Text(cart.pricing.isFreeShipping ? 'FREE' : '\$${cart.pricing.shippingFee.toStringAsFixed(2)}', style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                      const Divider(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Total Due', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                          Text(
                            '\$${cart.pricing.finalTotal.toStringAsFixed(2)}',
                            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, fontFamily: 'CormorantGaramond', color: Color(0xFFC5A059)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      PillButton(
                        label: 'Complete Atelier Order',
                        icon: LucideIcons.lock,
                        isFullWidth: true,
                        onPressed: () {
                          cartNotifier.clearCart();
                          showDialog(
                            context: context,
                            builder: (ctx) => AlertDialog(
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                              title: const Text('Order Placed!'),
                              content: const Text('Your bespoke work order has been routed to our physical atelier for hand-stringing.'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.pop(ctx),
                                  child: const Text('Continue'),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
