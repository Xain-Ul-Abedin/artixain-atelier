import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/cart_item_model.dart';

class CartState {
  final List<CartItemModel> items;
  final CartPricingModel pricing;

  const CartState({
    required this.items,
    required this.pricing,
  });

  factory CartState.empty() {
    return CartState(
      items: [],
      pricing: CartPricingModel.empty(),
    );
  }

  int get totalItemCount {
    return items.fold<int>(0, (sum, it) => sum + it.quantity);
  }

  CartState copyWith({
    List<CartItemModel>? items,
  }) {
    final updatedItems = items ?? this.items;
    final updatedPricing = calculateMobileCartPricing(updatedItems);
    return CartState(
      items: updatedItems,
      pricing: updatedPricing,
    );
  }
}

class CartNotifier extends StateNotifier<CartState> {
  CartNotifier() : super(CartState.empty());

  void addItem(CartItemModel newItem) {
    final existingIndex = state.items.indexWhere(
      (it) => it.token != null && it.token == newItem.token && it.wristSizeCm == newItem.wristSizeCm,
    );

    if (existingIndex > -1) {
      final updated = [...state.items];
      final current = updated[existingIndex];
      updated[existingIndex] = current.copyWith(quantity: current.quantity + newItem.quantity);
      state = state.copyWith(items: updated);
    } else {
      state = state.copyWith(items: [...state.items, newItem]);
    }
  }

  void removeItem(String id) {
    final updated = state.items.where((it) => it.id != id).toList();
    state = state.copyWith(items: updated);
  }

  void updateQuantity(String id, int delta) {
    final updated = <CartItemModel>[];
    for (var it in state.items) {
      if (it.id == id) {
        final newQty = it.quantity + delta;
        if (newQty > 0) {
          updated.add(it.copyWith(quantity: newQty));
        }
      } else {
        updated.add(it);
      }
    }
    state = state.copyWith(items: updated);
  }

  void clearCart() {
    state = CartState.empty();
  }
}

final cartProvider = StateNotifierProvider<CartNotifier, CartState>((ref) {
  return CartNotifier();
});
