import 'package:flutter_test/flutter_test.dart';
import 'package:artixain_mobile/models/cart_item_model.dart';
import 'package:artixain_mobile/models/gemstone_model.dart';
import 'package:artixain_mobile/providers/strand_provider.dart';

void main() {
  group('Artixain Mobile Invariant & Calculus Test Suite', () {
    test('Volume Tiered Discount Calculus on Mobile matches shared specs', () {
      final items = [
        const CartItemModel(
          id: '1',
          name: 'Strand 1',
          wristSizeCm: 16.5,
          cordType: 'silicone_stretch',
          beadCount: 20,
          beadSummary: 'Obsidian',
          unitPrice: 40.0,
          quantity: 1,
          primaryGemCode: 'OBS',
        ),
        const CartItemModel(
          id: '2',
          name: 'Strand 2',
          wristSizeCm: 16.5,
          cordType: 'silicone_stretch',
          beadCount: 20,
          beadSummary: 'Tigers Eye',
          unitPrice: 40.0,
          quantity: 1,
          primaryGemCode: 'TIG',
        ),
        const CartItemModel(
          id: '3',
          name: 'Strand 3',
          wristSizeCm: 16.5,
          cordType: 'silicone_stretch',
          beadCount: 20,
          beadSummary: 'Labradorite',
          unitPrice: 40.0,
          quantity: 1,
          primaryGemCode: 'LAB',
        ),
        const CartItemModel(
          id: '4',
          name: 'Strand 4',
          wristSizeCm: 16.5,
          cordType: 'silicone_stretch',
          beadCount: 20,
          beadSummary: 'Lapis',
          unitPrice: 40.0,
          quantity: 1,
          primaryGemCode: 'LAP',
        ),
      ];

      final pricing = calculateMobileCartPricing(items);

      expect(pricing.subtotal, 160.00);
      expect(pricing.discountAmount, 45.00); // 0 + 10 + 14 + 21 = 45
      expect(pricing.finalTotal, 115.00); // 40 + 30 + 26 + 19 = 115
      expect(pricing.isFreeShipping, true);
    });

    test('32 Master Gemstones are populated with authentic properties', () {
      expect(masterGemstones.isNotEmpty, true);
      final obs = getGemstoneByCode('OBS');
      expect(obs.code, 'OBS');
      expect(obs.chakra, 'Root');
      expect(obs.hardness, 5.5);
    });

    test('StrandState calculates correct circumference and token', () {
      final notifier = StrandNotifier();
      final state = notifier.state;

      expect(state.beads.length, 20);
      expect(state.calculatedCircumferenceCm > 14.0, true);
      expect(state.designToken.startsWith('artx.v1.'), true);
    });
  });
}
