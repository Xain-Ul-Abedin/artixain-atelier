class GemstoneModel {
  final String id;
  final String name;
  final String code;
  final String chakra;
  final double hardness;
  final List<String> zodiac;
  final String colorHex;
  final String? secondaryColorHex;
  final String textureType; // chatoyant, iridescent, pyrite_flecked, banded, translucent, metallic
  final String meaning;
  final String description;
  final Map<int, double> pricesByDiameter;
  final bool isSpacer;

  const GemstoneModel({
    required this.id,
    required this.name,
    required this.code,
    required this.chakra,
    required this.hardness,
    required this.zodiac,
    required this.colorHex,
    this.secondaryColorHex,
    required this.textureType,
    required this.meaning,
    required this.description,
    required this.pricesByDiameter,
    this.isSpacer = false,
  });

  double getPrice(int diameterMm) {
    return pricesByDiameter[diameterMm] ?? 2.00;
  }
}

// 32 Master Gemstones Dataset
final List<GemstoneModel> masterGemstones = [
  const GemstoneModel(
    id: 'gem_obsidian',
    name: 'Black Obsidian',
    code: 'OBS',
    chakra: 'Root',
    hardness: 5.5,
    zodiac: ['Scorpio', 'Sagittarius'],
    colorHex: '#0F1115',
    secondaryColorHex: '#272A30',
    textureType: 'translucent',
    meaning: 'Psychic Shield & Deep Grounding',
    description: 'Volcanic glass forged in high heat, forming an impenetrable psychic shield against negative vibrations.',
    pricesByDiameter: {6: 1.80, 8: 2.40, 10: 3.20, 12: 4.50},
  ),
  const GemstoneModel(
    id: 'gem_tigers_eye',
    name: "Tiger's Eye",
    code: 'TIG',
    chakra: 'Solar Plexus',
    hardness: 7.0,
    zodiac: ['Leo', 'Capricorn'],
    colorHex: '#B46E14',
    secondaryColorHex: '#422405',
    textureType: 'chatoyant',
    meaning: 'Courage, Focus & Prosperity',
    description: 'Golden-brown quartz featuring dynamic chatoyant light bands that shift with movement.',
    pricesByDiameter: {6: 2.00, 8: 2.80, 10: 3.80, 12: 5.20},
  ),
  const GemstoneModel(
    id: 'gem_labradorite',
    name: 'Labradorite',
    code: 'LAB',
    chakra: 'Third Eye',
    hardness: 6.5,
    zodiac: ['Sagittarius', 'Scorpio', 'Leo'],
    colorHex: '#2C444E',
    secondaryColorHex: '#132128',
    textureType: 'iridescent',
    meaning: 'Magic, Transformation & Intuition',
    description: 'Feldspar mineral showcasing spectacular peacock blue and green labradorescent light refraction.',
    pricesByDiameter: {6: 2.50, 8: 3.60, 10: 4.80, 12: 6.50},
  ),
  const GemstoneModel(
    id: 'gem_lapis',
    name: 'Lapis Lazuli',
    code: 'LAP',
    chakra: 'Throat',
    hardness: 5.5,
    zodiac: ['Sagittarius', 'Libra'],
    colorHex: '#1B357A',
    secondaryColorHex: '#0B1842',
    textureType: 'pyrite_flecked',
    meaning: 'Universal Truth & Royal Wisdom',
    description: 'Celestial deep ultramarine rock flecked with golden pyrite and white calcite matrix.',
    pricesByDiameter: {6: 2.80, 8: 3.90, 10: 5.20, 12: 7.00},
  ),
  const GemstoneModel(
    id: 'gem_amethyst',
    name: 'Amethyst',
    code: 'AME',
    chakra: 'Crown',
    hardness: 7.0,
    zodiac: ['Aquarius', 'Pisces'],
    colorHex: '#6B3FA0',
    secondaryColorHex: '#351859',
    textureType: 'translucent',
    meaning: 'Spiritual Peace & Clarity',
    description: 'Royal violet crystalline quartz that soothes mental restlessness and awakens high perception.',
    pricesByDiameter: {6: 2.20, 8: 3.00, 10: 4.20, 12: 5.80},
  ),
  const GemstoneModel(
    id: 'gem_rose_quartz',
    name: 'Rose Quartz',
    code: 'RSQ',
    chakra: 'Heart',
    hardness: 7.0,
    zodiac: ['Taurus', 'Libra'],
    colorHex: '#E8B4B8',
    secondaryColorHex: '#C48A90',
    textureType: 'translucent',
    meaning: 'Unconditional Love & Compassion',
    description: 'Delicate translucent pink mineral vibrating with unconditional tenderness and gentle self-love.',
    pricesByDiameter: {6: 1.90, 8: 2.60, 10: 3.50, 12: 4.80},
  ),
  const GemstoneModel(
    id: 'gem_malachite',
    name: 'Malachite',
    code: 'MAL',
    chakra: 'Heart',
    hardness: 4.0,
    zodiac: ['Capricorn', 'Scorpio'],
    colorHex: '#1B6B4A',
    secondaryColorHex: '#083321',
    textureType: 'banded',
    meaning: 'Transformation & Heart Cleansing',
    description: 'Vibrant emerald-green copper carbonate mineral characterized by rich concentric rings and hypnotic banding.',
    pricesByDiameter: {6: 3.20, 8: 4.80, 10: 6.40, 12: 8.50},
  ),
  const GemstoneModel(
    id: 'gem_gold_spacer',
    name: '14K Gold Spacer',
    code: 'GSP',
    chakra: 'Solar Plexus',
    hardness: 3.5,
    zodiac: ['Leo'],
    colorHex: '#C5A059',
    secondaryColorHex: '#8C6824',
    textureType: 'metallic',
    meaning: 'Solar Radiance & Luxury Balance',
    description: 'Micro-beveled 14K gold-plated spacer ring engineered to separate and illuminate gemstone spheres.',
    pricesByDiameter: {6: 1.20, 8: 1.50, 10: 1.80, 12: 2.20},
    isSpacer: true,
  ),
  const GemstoneModel(
    id: 'gem_silver_spacer',
    name: '925 Silver Spacer',
    code: 'SSP',
    chakra: 'Crown',
    hardness: 3.0,
    zodiac: ['Cancer'],
    colorHex: '#D1D5DB',
    secondaryColorHex: '#9CA3AF',
    textureType: 'metallic',
    meaning: 'Lunar Harmony & Pure Reflection',
    description: 'Precision-machined sterling silver faceted spacer accent providing crisp geometric relief.',
    pricesByDiameter: {6: 1.20, 8: 1.50, 10: 1.80, 12: 2.20},
    isSpacer: true,
  ),
];

GemstoneModel getGemstoneByCode(String code) {
  return masterGemstones.firstWhere(
    (g) => g.code == code,
    orElse: () => masterGemstones[0],
  );
}
