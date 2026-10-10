import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'constants/theme.dart';
import 'screens/main_navigation_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
