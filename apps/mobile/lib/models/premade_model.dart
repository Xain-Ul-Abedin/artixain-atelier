class PremadeRecipe {
  final String id;
  final String name;
  final String category;
  final String description;
  final double basePrice;
  final double defaultWristSizeCm;
  final String cordType;
  final List<String> beadCodes;
  final String designToken;

  const PremadeRecipe({
    required this.id,
    required this.name,
    required this.category,
    required this.description,
    required this.basePrice,
    this.defaultWristSizeCm = 16.5,
    this.cordType = 'silicone_stretch',
    required this.beadCodes,
    required this.designToken,
  });
}

final List<PremadeRecipe> curatedPremadeCatalog = [
  const PremadeRecipe(
    id: 'pm_celestial_shield',
    name: 'Celestial Obsidian Shield',
    category: 'Protection',
    description: 'Black Obsidian and golden Tigers Eye harmonized with 14K gold spacers for unwavering energetic protection.',
    basePrice: 58.00,
    beadCodes: ['OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP'],
    designToken: 'artx.v1.165.sil.OBS8-OBS8-TIG8-GSP6-OBS8-OBS8-TIG8-GSP6-OBS8-OBS8-TIG8-GSP6-OBS8-OBS8-TIG8-GSP6',
  ),
  const PremadeRecipe(
    id: 'pm_solar_sovereign',
    name: 'Solar Sovereign Wealth',
    category: 'Abundance',
    description: 'Radiant Citrine, Pyrite, and Tigers Eye anchored by 14K gold accents to ignite clarity and wealth attraction.',
    basePrice: 64.00,
    beadCodes: ['TIG', 'TIG', 'GSP', 'TIG', 'TIG', 'GSP', 'TIG', 'TIG', 'GSP', 'TIG', 'TIG', 'GSP', 'TIG', 'TIG', 'GSP'],
    designToken: 'artx.v1.165.sil.TIG8-TIG8-GSP6-TIG8-TIG8-GSP6-TIG8-TIG8-GSP6-TIG8-TIG8-GSP6-TIG8-TIG8-GSP6',
  ),
  const PremadeRecipe(
    id: 'pm_astral_intuition',
    name: 'Astral Peacock Intuition',
    category: 'Intuition',
    description: 'Spectacular rainbow-sheen Labradorite and royal Lapis Lazuli with sterling silver accents.',
    basePrice: 68.00,
    beadCodes: ['LAB', 'LAB', 'SSP', 'LAP', 'LAB', 'LAB', 'SSP', 'LAP', 'LAB', 'LAB', 'SSP', 'LAP'],
    designToken: 'artx.v1.165.sil.LAB8-LAB8-SSP6-LAP8-LAB8-LAB8-SSP6-LAP8-LAB8-LAB8-SSP6-LAP8',
  ),
  const PremadeRecipe(
    id: 'pm_rose_harmony',
    name: 'Sovereign Heart Harmony',
    category: 'Love',
    description: 'Gentle Rose Quartz and vibrant Malachite banded spheres framed by 14K gold spacers for compassionate renewal.',
    basePrice: 62.00,
    beadCodes: ['RSQ', 'RSQ', 'GSP', 'MAL', 'RSQ', 'RSQ', 'GSP', 'MAL', 'RSQ', 'RSQ', 'GSP', 'MAL'],
    designToken: 'artx.v1.165.sil.RSQ8-RSQ8-GSP6-MAL8-RSQ8-RSQ8-GSP6-MAL8-RSQ8-RSQ8-GSP6-MAL8',
  ),
  const PremadeRecipe(
    id: 'pm_violet_clarity',
    name: 'Crown Violet Tranquility',
    category: 'Intuition',
    description: 'Deep royal Amethyst paired with Clear Quartz and 925 silver spacers for deep meditation and restful sleep.',
    basePrice: 56.00,
    beadCodes: ['AME', 'AME', 'SSP', 'AME', 'AME', 'SSP', 'AME', 'AME', 'SSP', 'AME', 'AME', 'SSP'],
    designToken: 'artx.v1.165.sil.AME8-AME8-SSP6-AME8-AME8-SSP6-AME8-AME8-SSP6-AME8-AME8-SSP6',
  ),
];
