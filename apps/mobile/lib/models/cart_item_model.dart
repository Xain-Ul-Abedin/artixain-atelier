class CartItemModel {
  final String id;
  final String name;
  final String type; // 'custom' or 'premade'
  final String? token;
  final double wristSizeCm;
  final String cordType;
  final int beadCount;
  final String beadSummary;
  final double unitPrice;
  final int quantity;
  final String primaryGemCode;

  const CartItemModel({
    required this.id,
    required this.name,
    this.type = 'custom',
    this.token,
    required this.wristSizeCm,
    this.cordType = 'silicone_stretch',
    required this.beadCount,
    required this.beadSummary,
    required this.unitPrice,
    this.quantity = 1,
    required this.primaryGemCode,
  });

  CartItemModel copyWith({
    String? id,
    String? name,
    String? type,
    String? token,
    double? wristSizeCm,
    String? cordType,
    int? beadCount,
    String? beadSummary,
    double? unitPrice,
    int? quantity,
    String? primaryGemCode,
  }) {
    return CartItemModel(
      id: id ?? this.id,
      name: name ?? this.name,
      type: type ?? this.type,
      token: token ?? this.token,
      wristSizeCm: wristSizeCm ?? this.wristSizeCm,
      cordType: cordType ?? this.cordType,
      beadCount: beadCount ?? this.beadCount,
      beadSummary: beadSummary ?? this.beadSummary,
      unitPrice: unitPrice ?? this.unitPrice,
      quantity: quantity ?? this.quantity,
      primaryGemCode: primaryGemCode ?? this.primaryGemCode,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'type': type,
      'token': token,
      'wristSizeCm': wristSizeCm,
      'cordType': cordType,
      'beadCount': beadCount,
      'beadSummary': beadSummary,
      'unitPrice': unitPrice,
      'quantity': quantity,
      'primaryGemCode': primaryGemCode,
    };
  }

  factory CartItemModel.fromMap(Map<String, dynamic> map) {
    return CartItemModel(
      id: map['id']?.toString() ?? '',
      name: map['name']?.toString() ?? 'Artixain Strand',
      type: map['type']?.toString() ?? 'custom',
      token: map['token']?.toString(),
      wristSizeCm: (map['wristSizeCm'] as num?)?.toDouble() ?? 16.5,
      cordType: map['cordType']?.toString() ?? 'silicone_stretch',
      beadCount: (map['beadCount'] as num?)?.toInt() ?? 20,
      beadSummary: map['beadSummary']?.toString() ?? '',
      unitPrice: (map['unitPrice'] as num?)?.toDouble() ?? 0.0,
      quantity: (map['quantity'] as num?)?.toInt() ?? 1,
      primaryGemCode: map['primaryGemCode']?.toString() ?? 'OBS',
    );
  }
}

class CartPricingModel {
  final double subtotal;
  final double discountAmount;
  final double shippingFee;
  final bool isFreeShipping;
  final double amountNeededForFreeShipping;
  final double finalTotal;
  final int appliedTierCount;
  final String volumeTierMessage;

  const CartPricingModel({
    required this.subtotal,
    required this.discountAmount,
    required this.shippingFee,
    required this.isFreeShipping,
    required this.amountNeededForFreeShipping,
    required this.finalTotal,
    required this.appliedTierCount,
    required this.volumeTierMessage,
  });

  factory CartPricingModel.empty() {
    return const CartPricingModel(
      subtotal: 0.0,
      discountAmount: 0.0,
      shippingFee: 6.50,
      isFreeShipping: false,
      amountNeededForFreeShipping: 50.0,
      finalTotal: 0.0,
      appliedTierCount: 0,
      volumeTierMessage: 'Add a 2nd bracelet to unlock 25% OFF',
    );
  }
}

CartPricingModel calculateMobileCartPricing(List<CartItemModel> items) {
  if (items.isEmpty) return CartPricingModel.empty();

  // Flatten items by quantity
  List<double> flattenedPrices = [];
  for (var it in items) {
    for (int i = 0; i < it.quantity; i++) {
      flattenedPrices.add(it.unitPrice);
    }
  }

  // Sort descending to maximize customer savings
  flattenedPrices.sort((a, b) => b.compareTo(a));

  double originalSubtotal = 0.0;
  double discountedSubtotal = 0.0;

  for (int i = 0; i < flattenedPrices.length; i++) {
    double price = flattenedPrices[i];
    originalSubtotal += price;

    if (i == 0) {
      discountedSubtotal += price;
    } else if (i == 1) {
      discountedSubtotal += price * 0.75; // 25% off
    } else if (i == 2) {
      discountedSubtotal += price * 0.65; // 35% off
    } else {
      discountedSubtotal += price < 19.00 ? price : 19.00; // $19 flat
    }
  }

  double totalDiscount = originalSubtotal - discountedSubtotal;
  bool isFreeShipping = discountedSubtotal >= 50.00;
  double shippingFee = isFreeShipping ? 0.00 : 6.50;
  double amountNeeded = (50.00 - discountedSubtotal).clamp(0.0, 50.0);
  double finalTotal = discountedSubtotal + shippingFee;

  String tierMessage = 'Add a 2nd bracelet to unlock 25% OFF!';
  if (flattenedPrices.length == 1) {
    tierMessage = 'Add 1 more bracelet to unlock 25% OFF on design #2!';
  } else if (flattenedPrices.length == 2) {
    tierMessage = '25% OFF unlocked on 2nd strand! Add 1 more for 35% OFF!';
  } else if (flattenedPrices.length == 3) {
    tierMessage = '35% OFF unlocked! Add 4th+ for \$19.00 flat!';
  } else if (flattenedPrices.length >= 4) {
    tierMessage = 'VIP Atelier Tier: 4th+ bracelets at \$19.00 flat!';
  }

  return CartPricingModel(
    subtotal: double.parse(originalSubtotal.toStringAsFixed(2)),
    discountAmount: double.parse(totalDiscount.toStringAsFixed(2)),
    shippingFee: shippingFee,
    isFreeShipping: isFreeShipping,
    amountNeededForFreeShipping: double.parse(amountNeeded.toStringAsFixed(2)),
    finalTotal: double.parse(finalTotal.toStringAsFixed(2)),
    appliedTierCount: flattenedPrices.length,
    volumeTierMessage: tierMessage,
  );
}
