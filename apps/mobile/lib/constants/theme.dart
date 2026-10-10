import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ArtixainTheme {
  // Brand Color Palette
  static const Color obsidian900 = Color(0xFF0F1115);
  static const Color obsidian800 = Color(0xFF1A1D24);
  static const Color champagneGold = Color(0xFFC5A059);
  static const Color champagneLight = Color(0xFFE8D7A5);
  static const Color ivoryBg = Color(0xFFFBFBF9);
  static const Color darkBg = Color(0xFF0D0D10);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color surfaceDark = Color(0xFF18181B);
  static const Color zinc400 = Color(0xFFA1A1AA);
  static const Color zinc500 = Color(0xFF71717A);
  static const Color zinc600 = Color(0xFF52525B);
  static const Color emeraldGreen = Color(0xFF059669);
  static const Color amberWarning = Color(0xFFD97706);
  static const Color roseDanger = Color(0xFFE11D48);

  // Light Theme
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: ivoryBg,
    primaryColor: obsidian900,
    colorScheme: const ColorScheme.light(
      primary: obsidian900,
      secondary: champagneGold,
      surface: surfaceLight,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: obsidian900,
    ),
    textTheme: TextTheme(
      displayLarge: GoogleFonts.cormorantGaramond(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: obsidian900,
      ),
      displayMedium: GoogleFonts.cormorantGaramond(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: obsidian900,
      ),
      titleLarge: GoogleFonts.cormorantGaramond(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: obsidian900,
      ),
      titleMedium: GoogleFonts.lexend(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: obsidian900,
      ),
      bodyLarge: GoogleFonts.lexend(
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: obsidian900,
      ),
      bodyMedium: GoogleFonts.lexend(
        fontSize: 12,
        fontWeight: FontWeight.normal,
        color: zinc600,
      ),
      labelSmall: GoogleFonts.lexend(
        fontSize: 10,
        fontWeight: FontWeight.bold,
        letterSpacing: 1.5,
        color: zinc500,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(), // 50% boundary radius pill
        backgroundColor: obsidian900,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        elevation: 2,
      ),
    ),
  );

  // Dark Theme
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: darkBg,
    primaryColor: Colors.white,
    colorScheme: const ColorScheme.dark(
      primary: Colors.white,
      secondary: champagneGold,
      surface: surfaceDark,
      onPrimary: obsidian900,
      onSecondary: Colors.white,
      onSurface: Colors.white,
    ),
    textTheme: TextTheme(
      displayLarge: GoogleFonts.cormorantGaramond(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      displayMedium: GoogleFonts.cormorantGaramond(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      titleLarge: GoogleFonts.cormorantGaramond(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      titleMedium: GoogleFonts.lexend(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
      bodyLarge: GoogleFonts.lexend(
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: Colors.white,
      ),
      bodyMedium: GoogleFonts.lexend(
        fontSize: 12,
        fontWeight: FontWeight.normal,
        color: zinc400,
      ),
      labelSmall: GoogleFonts.lexend(
        fontSize: 10,
        fontWeight: FontWeight.bold,
        letterSpacing: 1.5,
        color: zinc400,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        backgroundColor: Colors.white,
        foregroundColor: obsidian900,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        elevation: 2,
      ),
    ),
  );
}
