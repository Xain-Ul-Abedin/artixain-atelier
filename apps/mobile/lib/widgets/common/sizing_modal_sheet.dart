import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../providers/strand_provider.dart';
import 'pill_button.dart';

class SizingModalSheet extends ConsumerStatefulWidget {
  const SizingModalSheet({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const SizingModalSheet(),
    );
  }

  @override
  ConsumerState<SizingModalSheet> createState() => _SizingModalSheetState();
}

class _SizingModalSheetState extends ConsumerState<SizingModalSheet> {
  int _activeTab = 0; // 0: Presets, 1: Body Ratio AI, 2: Screen Caliper
  double _heightCm = 170.0;
  double _weightKg = 68.0;
  double _cardSliderWidth = 280.0;

  double get _estimatedWristSize {
    final raw = 12.5 + 0.035 * (_heightCm - 150.0) + 0.05 * (_weightKg - 50.0);
    return double.parse(raw.clamp(13.0, 25.0).toStringAsFixed(1));
  }

  @override
  Widget build(BuildContext context) {
    final strandNotifier = ref.read(strandProvider.notifier);
    final currentWristSize = ref.watch(strandProvider).targetWristSizeCm;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF161820) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Drag Handle
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: isDark ? Colors.white24 : Colors.black12,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Wrist Sizing & Atelier Calibration',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'CormorantGaramond',
                    ),
                  ),
                  Text(
                    'Calibrate your wrist measurement for zero-slip ergonomics',
                    style: TextStyle(fontSize: 11, color: Color(0xFF71717A)),
                  ),
                ],
              ),
              IconButton(
                icon: const Icon(LucideIcons.x, size: 20),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Segmented Tabs Pill
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF222630) : const Color(0xFFF0F0EC),
              borderRadius: BorderRadius.circular(30),
            ),
            child: Row(
              children: [
                _buildTabButton('Standard Sizes', 0),
                _buildTabButton('Body Ratio AI', 1),
                _buildTabButton('Card Caliper', 2),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Tab Content
          Expanded(
            child: SingleChildScrollView(
              child: _activeTab == 0
                  ? _buildPresetsTab(currentWristSize, strandNotifier)
                  : _activeTab == 1
                      ? _buildAnthropometricTab(strandNotifier)
                      : _buildCaliperTab(strandNotifier),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabButton(String label, int index) {
    final isSelected = _activeTab == index;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _activeTab = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? (isDark ? Colors.white : const Color(0xFF0F1115))
                : Colors.transparent,
            borderRadius: BorderRadius.circular(24),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: isSelected
                  ? (isDark ? const Color(0xFF0F1115) : Colors.white)
                  : (isDark ? const Color(0xFFA1A1AA) : const Color(0xFF71717A)),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPresetsTab(double currentWristSize, StrandNotifier notifier) {
    final presets = [
      {'label': 'Petite (XS)', 'size': 15.0, 'sub': 'Very Slender Wrists (~19 beads)'},
      {'label': 'Small (S)', 'size': 16.0, 'sub': 'Slender Women / Youth (~20 beads)'},
      {'label': 'Standard (M)', 'size': 16.5, 'sub': 'Universal Standard Women (~21 beads)'},
      {'label': 'Medium-Large (L)', 'size': 17.5, 'sub': 'Standard Men / Relaxed (~22 beads)'},
      {'label': 'Large (XL)', 'size': 18.5, 'sub': 'Broad Men / Generous (~23 beads)'},
    ];

    return Column(
      children: presets.map((p) {
        final isSelected = currentWristSize == (p['size'] as double);

        return Container(
          margin: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
            color: isSelected
                ? const Color(0xFFC5A059).withOpacity(0.12)
                : (Theme.of(context).brightness == Brightness.dark
                    ? const Color(0xFF1F222A)
                    : const Color(0xFFFBFBF9)),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: isSelected
                  ? const Color(0xFFC5A059)
                  : (Theme.of(context).brightness == Brightness.dark
                      ? Colors.white.withOpacity(0.08)
                      : const Color(0xFFE5E5E0)),
            ),
          ),
          child: ListTile(
            title: Text(
              p['label'] as String,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            ),
            subtitle: Text(
              p['sub'] as String,
              style: const TextStyle(fontSize: 11, color: Color(0xFF71717A)),
            ),
            trailing: Text(
              '${p['size']} cm',
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
                color: Color(0xFFC5A059),
              ),
            ),
            onTap: () {
              notifier.setTargetWristSize(p['size'] as double);
              Navigator.pop(context);
            },
          ),
        );
      }).toList(),
    );
  }

  Widget _buildAnthropometricTab(StrandNotifier notifier) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Estimate your wrist size based on body skeletal regression equations (\$W = 0.082H + 0.045M - 0.5\$).',
          style: TextStyle(fontSize: 12, color: Color(0xFF71717A)),
        ),
        const SizedBox(height: 16),

        // Height Slider
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Height', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            Text('${_heightCm.toInt()} cm', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFC5A059))),
          ],
        ),
        Slider(
          value: _heightCm,
          min: 140,
          max: 210,
          activeColor: const Color(0xFFC5A059),
          onChanged: (val) => setState(() => _heightCm = val),
        ),
        const SizedBox(height: 12),

        // Weight Slider
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Weight', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            Text('${_weightKg.toInt()} kg', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFC5A059))),
          ],
        ),
        Slider(
          value: _weightKg,
          min: 40,
          max: 130,
          activeColor: const Color(0xFFC5A059),
          onChanged: (val) => setState(() => _weightKg = val),
        ),
        const SizedBox(height: 20),

        // Result Card & Apply Button
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFC5A059).withOpacity(0.1),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFC5A059).withOpacity(0.3)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('ESTIMATED WRIST', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                  Text(
                    '$_estimatedWristSize cm',
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, fontFamily: 'CormorantGaramond'),
                  ),
                ],
              ),
              PillButton(
                label: 'Apply Size',
                icon: LucideIcons.check,
                onPressed: () {
                  notifier.setTargetWristSize(_estimatedWristSize);
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCaliperTab(StrandNotifier notifier) {
    return Column(
      children: [
        const Text(
          'Hold a standard physical credit card (85.6mm) against your screen and adjust the slider until the outline matches precisely.',
          style: TextStyle(fontSize: 12, color: Color(0xFF71717A)),
        ),
        const SizedBox(height: 16),

        // Card Outline Container
        Center(
          child: Container(
            width: _cardSliderWidth,
            height: _cardSliderWidth * 0.63,
            decoration: BoxDecoration(
              color: const Color(0xFFC5A059).withOpacity(0.08),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFFC5A059), width: 2, style: BorderStyle.solid),
            ),
            child: const Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(LucideIcons.creditCard, color: Color(0xFFC5A059), size: 32),
                SizedBox(height: 6),
                Text(
                  'Standard Bank Card (85.6mm)',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),

        Slider(
          value: _cardSliderWidth,
          min: 220,
          max: 340,
          activeColor: const Color(0xFFC5A059),
          onChanged: (val) => setState(() => _cardSliderWidth = val),
        ),
        const SizedBox(height: 16),

        PillButton(
          label: 'Calibrate & Set 16.5cm',
          icon: LucideIcons.check,
          isFullWidth: true,
          onPressed: () {
            notifier.setTargetWristSize(16.5);
            Navigator.pop(context);
          },
        ),
      ],
    );
  }
}
