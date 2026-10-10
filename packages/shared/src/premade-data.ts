export interface PremadeBracelet {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Celestial' | 'Serenity' | 'Protection' | 'Abundance' | 'Love' | 'Clarity';
  zodiacSigns: string[];
  primaryChakra: string;
  defaultWristSizeCm: number;
  basePrice: number;
  featuredImageUrl: string;
  galleryImageUrls: string[];
  beadRecipe: Array<{
    gemstoneId: string;
    gemstoneName: string;
    diameterMm: 6 | 8 | 10 | 12;
    count: number;
  }>;
  totalBeads: number;
  calculatedLengthCm: number;
  isBestseller: boolean;
  isStaffPick: boolean;
  remixCount: number;
  viewCount: number;
}

export const MASTER_PREMADE_COLLECTION: PremadeBracelet[] = [
  {
    id: 'premade_moonlit_calm',
    slug: 'moonlit-calm',
    title: 'Moonlit Calm',
    tagline: 'Cool quartz, luminous moonstone, and grounding smoky anchor.',
    description: 'A harmonious celestial formulation blending adularescent Rainbow Moonstone with crystalline Clear Quartz, flanked by 925 Sterling Silver rondelles and an Alpine Smoky Quartz grounding anchor.',
    category: 'Serenity',
    zodiacSigns: ['Cancer', 'Pisces', 'Libra'],
    primaryChakra: 'Third Eye & Crown',
    defaultWristSizeCm: 16.5,
    basePrice: 42.00,
    featuredImageUrl: '/images/premade/moonlit-calm-hero.webp',
    galleryImageUrls: ['/images/premade/moonlit-calm-1.webp', '/images/premade/moonlit-calm-2.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_moonstone', gemstoneName: 'Rainbow Moonstone', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_clear_quartz', gemstoneName: 'Clear Quartz', diameterMm: 8, count: 6 },
      { gemstoneId: 'spacer_silver_925', gemstoneName: '925 Sterling Silver Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'gem_smoky_quartz', gemstoneName: 'Alpine Smoky Quartz', diameterMm: 10, count: 2 },
      { gemstoneId: 'charm_celestial_star', gemstoneName: '925 Silver North Star Focal Charm', diameterMm: 8, count: 1 }
    ],
    totalBeads: 21,
    calculatedLengthCm: 16.8,
    isBestseller: true,
    isStaffPick: true,
    remixCount: 489,
    viewCount: 12400
  },
  {
    id: 'premade_gilded_ash',
    slug: 'gilded-ash',
    title: 'Gilded Ash',
    tagline: 'Volcanic glass, metallic hematite, and 18K gold luster.',
    description: 'Striking monochrome power piece pairing glassy Black Obsidian with mirror-polished Magnetic Hematite and warm 18K Gold Vermeil spacer beads.',
    category: 'Protection',
    zodiacSigns: ['Scorpio', 'Capricorn', 'Aries'],
    primaryChakra: 'Root & Solar Plexus',
    defaultWristSizeCm: 16.5,
    basePrice: 38.00,
    featuredImageUrl: '/images/premade/gilded-ash-hero.webp',
    galleryImageUrls: ['/images/premade/gilded-ash-1.webp', '/images/premade/gilded-ash-2.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_black_obsidian', gemstoneName: 'Black Obsidian', diameterMm: 8, count: 10 },
      { gemstoneId: 'gem_hematite', gemstoneName: 'Magnetic Hematite', diameterMm: 8, count: 6 },
      { gemstoneId: 'spacer_gold_18k', gemstoneName: '18K Gold Vermeil Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'gem_pyrite', gemstoneName: 'Golden Pyrite', diameterMm: 10, count: 1 }
    ],
    totalBeads: 21,
    calculatedLengthCm: 16.6,
    isBestseller: true,
    isStaffPick: false,
    remixCount: 312,
    viewCount: 8900
  },
  {
    id: 'premade_golden_dawn',
    slug: 'golden-dawn',
    title: 'Golden Dawn',
    tagline: 'Radiant citrine fire, sunstone copper shimmer, and solar vitality.',
    description: 'Infused with the warmth of morning light, Golden Dawn pairs high-frequency Golden Citrine with glittering Oregon Sunstone and warm fluted Rose Gold accents.',
    category: 'Abundance',
    zodiacSigns: ['Leo', 'Gemini', 'Taurus'],
    primaryChakra: 'Solar Plexus & Sacral',
    defaultWristSizeCm: 16.5,
    basePrice: 46.00,
    featuredImageUrl: '/images/premade/golden-dawn-hero.webp',
    galleryImageUrls: ['/images/premade/golden-dawn-1.webp', '/images/premade/golden-dawn-2.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_citrine', gemstoneName: 'Golden Citrine', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_sunstone', gemstoneName: 'Oregon Sunstone', diameterMm: 8, count: 6 },
      { gemstoneId: 'spacer_rose_gold', gemstoneName: 'Rose Gold Fluted Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'gem_clear_quartz', gemstoneName: 'Clear Quartz', diameterMm: 8, count: 3 }
    ],
    totalBeads: 21,
    calculatedLengthCm: 16.6,
    isBestseller: false,
    isStaffPick: true,
    remixCount: 275,
    viewCount: 7100
  },
  {
    id: 'premade_ethereal_serenity',
    slug: 'ethereal-serenity',
    title: 'Ethereal Serenity',
    tagline: 'Pastel lilac kunzite, rose quartz tenderness, and pure heart healing.',
    description: 'A deeply soothing romantic composition of rare Lilac Kunzite, Madagascan Rose Quartz, and delicate 925 Silver spacers, designed for gentle emotional restoration.',
    category: 'Love',
    zodiacSigns: ['Taurus', 'Libra', 'Cancer'],
    primaryChakra: 'Heart',
    defaultWristSizeCm: 16.0,
    basePrice: 48.00,
    featuredImageUrl: '/images/premade/ethereal-serenity-hero.webp',
    galleryImageUrls: ['/images/premade/ethereal-serenity-1.webp', '/images/premade/ethereal-serenity-2.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_kunzite', gemstoneName: 'Lilac Kunzite', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_rose_quartz', gemstoneName: 'Rose Quartz', diameterMm: 8, count: 8 },
      { gemstoneId: 'spacer_silver_925', gemstoneName: '925 Sterling Silver Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'gem_moonstone', gemstoneName: 'Rainbow Moonstone', diameterMm: 10, count: 1 }
    ],
    totalBeads: 21,
    calculatedLengthCm: 16.2,
    isBestseller: true,
    isStaffPick: true,
    remixCount: 520,
    viewCount: 14800
  },
  {
    id: 'premade_astral_truth',
    slug: 'astral-truth',
    title: 'Astral Truth',
    tagline: 'Ultramarine lapis lazuli with pyrite stars and bladed blue kyanite.',
    description: 'A regal intellectual alignment featuring ancient Afghan Lapis Lazuli with sparkling pyrite stars, bladed Deep Blue Kyanite, and Royal Sodalite.',
    category: 'Clarity',
    zodiacSigns: ['Sagittarius', 'Capricorn', 'Aquarius'],
    primaryChakra: 'Throat & Third Eye',
    defaultWristSizeCm: 17.0,
    basePrice: 52.00,
    featuredImageUrl: '/images/premade/astral-truth-hero.webp',
    galleryImageUrls: ['/images/premade/astral-truth-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_lapis_lazuli', gemstoneName: 'Lapis Lazuli', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_kyanite', gemstoneName: 'Deep Blue Kyanite', diameterMm: 8, count: 6 },
      { gemstoneId: 'gem_sodalite', gemstoneName: 'Royal Sodalite', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_gold_18k', gemstoneName: '18K Gold Vermeil Spacer', diameterMm: 6, count: 4 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 16.8,
    isBestseller: false,
    isStaffPick: true,
    remixCount: 190,
    viewCount: 6400
  },
  {
    id: 'premade_emerald_transformation',
    slug: 'emerald-transformation',
    title: 'Emerald Transformation',
    tagline: 'Banded malachite, prehnite epidote, and green aventurine luck.',
    description: 'Deep verdant botanical energy blending concentric banded Malachite with luminous Epidote Prehnite and sparkling Green Aventurine.',
    category: 'Abundance',
    zodiacSigns: ['Scorpio', 'Virgo', 'Taurus'],
    primaryChakra: 'Heart',
    defaultWristSizeCm: 16.5,
    basePrice: 44.00,
    featuredImageUrl: '/images/premade/emerald-transformation-hero.webp',
    galleryImageUrls: ['/images/premade/emerald-transformation-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_malachite', gemstoneName: 'Malachite', diameterMm: 8, count: 6 },
      { gemstoneId: 'gem_prehnite', gemstoneName: 'Epidote Prehnite', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_green_aventurine', gemstoneName: 'Green Aventurine', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_gold_18k', gemstoneName: '18K Gold Vermeil Spacer', diameterMm: 6, count: 4 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 16.8,
    isBestseller: false,
    isStaffPick: false,
    remixCount: 165,
    viewCount: 5200
  },
  {
    id: 'premade_northern_aurora',
    slug: 'northern-aurora',
    title: 'Northern Aurora',
    tagline: 'Iridescent spectrolite labradorite with violet amethyst and silver light.',
    description: 'Captures the ethereal beauty of the polar night with peacock-blue flashing Labradorite, deep violet Amethyst, and pure 925 Sterling Silver.',
    category: 'Celestial',
    zodiacSigns: ['Scorpio', 'Pisces', 'Aquarius'],
    primaryChakra: 'Third Eye & Crown',
    defaultWristSizeCm: 16.5,
    basePrice: 45.00,
    featuredImageUrl: '/images/premade/northern-aurora-hero.webp',
    galleryImageUrls: ['/images/premade/northern-aurora-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_labradorite', gemstoneName: 'Spectrolite Labradorite', diameterMm: 8, count: 10 },
      { gemstoneId: 'gem_amethyst', gemstoneName: 'Amethyst', diameterMm: 8, count: 6 },
      { gemstoneId: 'spacer_silver_925', gemstoneName: '925 Sterling Silver Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'charm_celestial_star', gemstoneName: '925 Silver North Star Focal Charm', diameterMm: 8, count: 1 }
    ],
    totalBeads: 21,
    calculatedLengthCm: 16.8,
    isBestseller: true,
    isStaffPick: true,
    remixCount: 380,
    viewCount: 11200
  },
  {
    id: 'premade_oceanic_breath',
    slug: 'oceanic-breath',
    title: 'Oceanic Breath',
    tagline: 'Pastel aquamarine beryl, mint amazonite, and white howlite calm.',
    description: 'Refreshing tropical oceanic harmony combining gemstone-grade Aquamarine, Peruvian Amazonite, and porcelain White Howlite.',
    category: 'Serenity',
    zodiacSigns: ['Pisces', 'Aries', 'Virgo'],
    primaryChakra: 'Throat & Heart',
    defaultWristSizeCm: 16.5,
    basePrice: 49.00,
    featuredImageUrl: '/images/premade/oceanic-breath-hero.webp',
    galleryImageUrls: ['/images/premade/oceanic-breath-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_aquamarine', gemstoneName: 'Aquamarine', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_amazonite', gemstoneName: 'Peruvian Amazonite', diameterMm: 8, count: 6 },
      { gemstoneId: 'gem_howlite', gemstoneName: 'White Howlite', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_silver_925', gemstoneName: '925 Sterling Silver Spacer', diameterMm: 6, count: 4 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 16.8,
    isBestseller: false,
    isStaffPick: false,
    remixCount: 210,
    viewCount: 6800
  },
  {
    id: 'premade_warrior_shield',
    slug: 'warrior-shield',
    title: 'Warrior Shield',
    tagline: 'Golden tiger eye, red jasper stamina, and magnetic hematite armor.',
    description: 'Uncompromising grounding strength uniting chatoyant Golden Tiger’s Eye, earthen Brecciated Red Jasper, and dense gunmetal Hematite.',
    category: 'Protection',
    zodiacSigns: ['Aries', 'Leo', 'Scorpio'],
    primaryChakra: 'Root & Solar Plexus',
    defaultWristSizeCm: 17.0,
    basePrice: 39.00,
    featuredImageUrl: '/images/premade/warrior-shield-hero.webp',
    galleryImageUrls: ['/images/premade/warrior-shield-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_tigers_eye', gemstoneName: "Golden Tiger's Eye", diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_red_jasper', gemstoneName: 'Brecciated Red Jasper', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_hematite', gemstoneName: 'Magnetic Hematite', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_gold_18k', gemstoneName: '18K Gold Vermeil Spacer', diameterMm: 6, count: 2 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 17.2,
    isBestseller: false,
    isStaffPick: false,
    remixCount: 145,
    viewCount: 4900
  },
  {
    id: 'premade_inca_passion',
    slug: 'inca-passion',
    title: 'Inca Passion',
    tagline: 'Raspberry rhodochrosite, sunset carnelian fire, and almandine garnet.',
    description: 'A warm, passionate talisman combining rare Argentine Rhodochrosite lace with glowing Sunset Carnelian and wine-red Garnet.',
    category: 'Love',
    zodiacSigns: ['Scorpio', 'Leo', 'Taurus'],
    primaryChakra: 'Sacral & Heart',
    defaultWristSizeCm: 16.0,
    basePrice: 54.00,
    featuredImageUrl: '/images/premade/inca-passion-hero.webp',
    galleryImageUrls: ['/images/premade/inca-passion-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_rhodochrosite', gemstoneName: 'Sweet Home Rhodochrosite', diameterMm: 8, count: 6 },
      { gemstoneId: 'gem_carnelian', gemstoneName: 'Sunset Carnelian', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_garnet', gemstoneName: 'Almandine Garnet', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_rose_gold', gemstoneName: 'Rose Gold Fluted Spacer', diameterMm: 6, count: 4 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 16.8,
    isBestseller: false,
    isStaffPick: true,
    remixCount: 185,
    viewCount: 5900
  },
  {
    id: 'premade_siberian_mystic',
    slug: 'siberian-mystic',
    title: 'Siberian Mystic',
    tagline: 'Swirling charoite purple, rainbow fluorite, and clear quartz high-light.',
    description: 'An esoteric crown chakra masterpiece featuring rare Siberian Charoite with banded Rainbow Fluorite and light-refracting Clear Quartz.',
    category: 'Clarity',
    zodiacSigns: ['Scorpio', 'Sagittarius', 'Pisces'],
    primaryChakra: 'Crown & Third Eye',
    defaultWristSizeCm: 16.5,
    basePrice: 56.00,
    featuredImageUrl: '/images/premade/siberian-mystic-hero.webp',
    galleryImageUrls: ['/images/premade/siberian-mystic-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_charoite', gemstoneName: 'Siberian Charoite', diameterMm: 8, count: 6 },
      { gemstoneId: 'gem_flourite', gemstoneName: 'Rainbow Fluorite', diameterMm: 8, count: 8 },
      { gemstoneId: 'gem_clear_quartz', gemstoneName: 'Clear Quartz', diameterMm: 8, count: 4 },
      { gemstoneId: 'spacer_silver_925', gemstoneName: '925 Sterling Silver Spacer', diameterMm: 6, count: 4 }
    ],
    totalBeads: 22,
    calculatedLengthCm: 16.8,
    isBestseller: false,
    isStaffPick: true,
    remixCount: 230,
    viewCount: 7800
  },
  {
    id: 'premade_celestial_balance',
    slug: 'celestial-balance',
    title: 'Celestial Balance',
    tagline: 'Rainbow moonstone, black obsidian duality, and 18K gold center.',
    description: 'The definitive Yin-Yang talisman uniting lunar Rainbow Moonstone with solar Black Obsidian, balanced by 18K Gold Vermeil and a central North Star charm.',
    category: 'Celestial',
    zodiacSigns: ['Cancer', 'Leo', 'Libra', 'Scorpio'],
    primaryChakra: 'All Chakras',
    defaultWristSizeCm: 16.5,
    basePrice: 48.00,
    featuredImageUrl: '/images/premade/celestial-balance-hero.webp',
    galleryImageUrls: ['/images/premade/celestial-balance-1.webp'],
    beadRecipe: [
      { gemstoneId: 'gem_moonstone', gemstoneName: 'Rainbow Moonstone', diameterMm: 8, count: 9 },
      { gemstoneId: 'gem_black_obsidian', gemstoneName: 'Black Obsidian', diameterMm: 8, count: 9 },
      { gemstoneId: 'spacer_gold_18k', gemstoneName: '18K Gold Vermeil Spacer', diameterMm: 6, count: 4 },
      { gemstoneId: 'charm_celestial_star', gemstoneName: '925 Silver North Star Focal Charm', diameterMm: 8, count: 1 }
    ],
    totalBeads: 23,
    calculatedLengthCm: 17.6,
    isBestseller: true,
    isStaffPick: true,
    remixCount: 610,
    viewCount: 18500
  }
];

export function getPremadeById(id: string): PremadeBracelet | undefined {
  return MASTER_PREMADE_COLLECTION.find((p) => p.id === id);
}

export function getPremadeBySlug(slug: string): PremadeBracelet | undefined {
  return MASTER_PREMADE_COLLECTION.find((p) => p.slug === slug);
}

export const CURATED_PREMADES = MASTER_PREMADE_COLLECTION;
