import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../models/gemstone_model.dart';
import '../providers/catalog_provider.dart';
import '../providers/strand_provider.dart';
import '../widgets/common/pill_button.dart';

class EncyclopediaScreen extends ConsumerWidget {
  const EncyclopediaScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filteredGems = ref.watch(filteredGemstonesProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Gemstone Encyclopedia',
          style: TextStyle(fontFamily: 'CormorantGaramond', fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Search Input
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              onChanged: (val) => ref.read(gemstoneSearchQueryProvider.notifier).state = val,
              decoration: InputDecoration(
                hintText: 'Search minerals by name or meaning...',
                hintStyle: const TextStyle(fontSize: 12, color: Color(0xFF71717A)),
                prefixIcon: const Icon(LucideIcons.search, size: 16),
                filled: true,
                fillColor: isDark ? const Color(0xFF1E2028) : const Color(0xFFF0F0EC),
                contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),

          // Gemstones List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemCount: filteredGems.length,
              itemBuilder: (context, index) {
                final gem = filteredGems[index];
                final cleanColor = Color(int.parse('FF${gem.colorHex.replaceAll('#', '')}', radix: 16));

                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF1E2028) : Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isDark ? Colors.white10 : const Color(0xFFE5E5E0),
                    ),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Gem Swatch
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: cleanColor,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.12),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 14),

                      // Gem Details
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.between,
                              children: [
                                Text(
                                  gem.name,
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                ),
                                Text(
                                  'Mohs ${gem.hardness}',
                                  style: const TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFFC5A059),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              gem.meaning,
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: Color(0xFFC5A059),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              gem.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 11, color: Color(0xFF71717A)),
                            ),
                            const SizedBox(height: 8),
                            PillButton(
                              label: 'Add to Studio',
                              icon: LucideIcons.sparkles,
                              height: 32,
                              variant: PillButtonVariant.tonal,
                              onPressed: () {
                                ref.read(strandProvider.notifier).addBead(gem);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('Added ${gem.name} to Customizer Studio!')),
                                );
                              },
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
        ],
      ),
    );
  }
}
