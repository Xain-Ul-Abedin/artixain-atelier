import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/cart_item_model.dart';
import '../services/hive_storage_service.dart';

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
  CartNotifier() : super(CartState.empty()) {
    _loadFromHive();
  }

  void _loadFromHive() {
    try {
      final cached = HiveStorageService.getCartItems();
      if (cached.isNotEmpty) {
        final loaded = cached.map((m) => CartItemModel.fromMap(m)).toList();
        state = state.copyWith(items: loaded);
      }
    } catch (_) {}
  }

  void _persistToHive() {
    try {
      HiveStorageService.clearCart();
      for (var item in state.items) {
        HiveStorageService.saveCartItem(item.toMap());
      }
    } catch (_) {}
  }

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
    _persistToHive();
  }

  void removeItem(String id) {
    final updated = state.items.where((it) => it.id != id).toList();
    state = state.copyWith(items: updated);
    _persistToHive();
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
    _persistToHive();
  }

  void clearCart() {
    state = CartState.empty();
    HiveStorageService.clearCart();
  }
}

final cartProvider = StateNotifierProvider<CartNotifier, CartState>((ref) {
  return CartNotifier();
});
