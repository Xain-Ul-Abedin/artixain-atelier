import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'studio_screen.dart';
import 'shop_screen.dart';
import 'encyclopedia_screen.dart';
import 'cart_screen.dart';
import '../providers/cart_provider.dart';

class MainNavigationScreen extends ConsumerStatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  ConsumerState<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends ConsumerState<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    StudioScreen(),
    ShopScreen(),
    EncyclopediaScreen(),
    CartScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final cartItemCount = ref.watch(cartProvider).totalItemCount;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF14161C) : Colors.white,
          border: Border(
            top: BorderSide(
              color: isDark ? Colors.white10 : const Color(0xFFE5E5E0),
            ),
          ),
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          backgroundColor: Colors.transparent,
          elevation: 0,
          indicatorColor: const Color(0xFFC5A059).withOpacity(0.18),
          onDestinationSelected: (index) {
            setState(() => _currentIndex = index);
          },
          destinations: [
            const NavigationDestination(
              icon: Icon(LucideIcons.sparkles, size: 20),
              label: 'Studio',
            ),
            const NavigationDestination(
              icon: Icon(LucideIcons.compass, size: 20),
              label: 'Premades',
            ),
            const NavigationDestination(
              icon: Icon(LucideIcons.gem, size: 20),
              label: 'Encyclopedia',
            ),
            NavigationDestination(
              icon: Badge(
                isLabelVisible: cartItemCount > 0,
                label: Text('$cartItemCount'),
                backgroundColor: const Color(0xFFC5A059),
                child: const Icon(LucideIcons.shoppingBag, size: 20),
              ),
              label: 'Bag',
            ),
          ],
        ),
      ),
    );
  }
}
