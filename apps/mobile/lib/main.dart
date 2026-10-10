import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'constants/theme.dart';
import 'screens/main_navigation_screen.dart';
import 'services/hive_storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Supabase.initialize(
      url: 'https://edkzukrfzubfuzsejmvr.supabase.co',
      anonKey: 'sb_publishable_19rdRC1Bqjxl2xZDaiLZ-w_h9JCt4LD',
    );
  } catch (_) {
    // Offline resilience fallback
  }
  await HiveStorageService.init();
  runApp(
    const ProviderScope(
      child: ArtixainMobileApp(),
    ),
  );
}

class ArtixainMobileApp extends StatelessWidget {
  const ArtixainMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Artixain Atelier',
      debugShowCheckedModeBanner: false,
      theme: ArtixainTheme.lightTheme,
      darkTheme: ArtixainTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const MainNavigationScreen(),
    );
  }
}
