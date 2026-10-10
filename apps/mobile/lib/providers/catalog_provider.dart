import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/gemstone_model.dart';
import '../models/premade_model.dart';

final gemstonesProvider = Provider<List<GemstoneModel>>((ref) {
  return masterGemstones;
});

final premadesProvider = Provider<List<PremadeRecipe>>((ref) {
  return curatedPremadeCatalog;
});

final gemstoneSearchQueryProvider = StateProvider<String>((ref) => '');
final gemstoneChakraFilterProvider = StateProvider<String>((ref) => 'all');

final filteredGemstonesProvider = Provider<List<GemstoneModel>>((ref) {
  final gems = ref.watch(gemstonesProvider);
  final query = ref.watch(gemstoneSearchQueryProvider).toLowerCase();
  final chakra = ref.watch(gemstoneChakraFilterProvider);

  return gems.where((gem) {
    final matchesSearch = gem.name.toLowerCase().contains(query) ||
        gem.code.toLowerCase().contains(query) ||
        gem.meaning.toLowerCase().contains(query);

    if (!matchesSearch) return false;
    if (chakra != 'all' && !gem.chakra.toLowerCase().contains(chakra.toLowerCase())) {
      return false;
    }
    return true;
  }).toList();
});
