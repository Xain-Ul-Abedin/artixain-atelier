import { Gemstone, MASTER_GEMSTONES, getGemstoneByCode } from './gems-data';

export interface DecodedDesign {
  version: string;
  targetWristSizeCm: number;
  cordType: 'silicone_stretch' | 'braided_silk' | 'gold_wire';
  beads: Array<{
    position: number;
    gemstoneId: string;
    gemstoneName: string;
    code: string;
    diameterMm: 6 | 8 | 10 | 12;
    price: number;
    isAvailable: boolean;
  }>;
  totalBeadCount: number;
  calculatedCircumferenceCm: number;
  estimatedPrice: number;
}

export interface EncodedBeadEntry {
  gemstoneCode: string;
  diameterMm: 6 | 8 | 10 | 12;
}

/**
 * Encodes a custom bracelet strand into a compact URL-safe token.
 * Example format: "artx.v1.165.sil.AM8-MO8-SS6-LA10-AM8-MO8-SS6"
 */
export function encodeDesignToken(
  wristSizeCm: number,
  cordType: 'silicone_stretch' | 'braided_silk' | 'gold_wire',
  beads: EncodedBeadEntry[]
): string {
  const wristMm = Math.round(wristSizeCm * 10);
  const cordCode = cordType === 'braided_silk' ? 'slk' : cordType === 'gold_wire' ? 'wir' : 'sil';
  const beadString = beads.map((b) => `${b.gemstoneCode}${b.diameterMm}`).join('-');
  return `artx.v1.${wristMm}.${cordCode}.${beadString}`;
}

/**
 * Decodes a URL-safe design token back into structured bead objects.
 */
export function decodeDesignToken(token: string): DecodedDesign | null {
  if (!token || typeof token !== 'string') return null;

  let cleanToken = token.trim();
  if (cleanToken.startsWith('artx.')) {
    cleanToken = cleanToken.slice(5);
  }

  const parts = cleanToken.split('.');
  if (parts.length < 4 || parts[0] !== 'v1') return null;

  const wristMm = parseInt(parts[1], 10);
  const targetWristSizeCm = !isNaN(wristMm) ? Number((wristMm / 10).toFixed(1)) : 16.5;

  let cordType: 'silicone_stretch' | 'braided_silk' | 'gold_wire' = 'silicone_stretch';
  if (parts[2] === 'slk') cordType = 'braided_silk';
  else if (parts[2] === 'wir') cordType = 'gold_wire';

  const beadSegments = parts[3].split('-').filter((s) => s.length >= 3);
  if (beadSegments.length === 0) return null;

  let calculatedCircumferenceMm = 0;
  let estimatedPrice = 0;

  const beads = beadSegments.map((segment, index) => {
    // Last 1-2 chars are diameter (e.g. AM8 -> AM, 8; LA10 -> LA, 10; SS12 -> SS, 12)
    const match = segment.match(/^([A-Z0-9]+?)(\d{1,2})$/);
    if (!match) {
      // Fallback: default to Clear Quartz 8mm
      const fallbackGem = MASTER_GEMSTONES[6];
      calculatedCircumferenceMm += 8;
      estimatedPrice += fallbackGem.pricesByDiameter[8];
      return {
        position: index + 1,
        gemstoneId: fallbackGem.id,
        gemstoneName: fallbackGem.name,
        code: fallbackGem.code,
        diameterMm: 8 as 6 | 8 | 10 | 12,
        price: fallbackGem.pricesByDiameter[8],
        isAvailable: fallbackGem.isAvailable
      };
    }

    const code = match[1];
    let diameter = parseInt(match[2], 10) as 6 | 8 | 10 | 12;
    if (![6, 8, 10, 12].includes(diameter)) {
      diameter = 8;
    }

    const matchedGem = getGemstoneByCode(code) || MASTER_GEMSTONES[6]; // Fallback to Clear Quartz
    const beadPrice = matchedGem.pricesByDiameter[diameter] || 1.80;

    calculatedCircumferenceMm += diameter;
    estimatedPrice += beadPrice;

    return {
      position: index + 1,
      gemstoneId: matchedGem.id,
      gemstoneName: matchedGem.name,
      code: matchedGem.code,
      diameterMm: diameter,
      price: beadPrice,
      isAvailable: matchedGem.isAvailable
    };
  });

  return {
    version: parts[0],
    targetWristSizeCm,
    cordType,
    beads,
    totalBeadCount: beads.length,
    calculatedCircumferenceCm: Number((calculatedCircumferenceMm / 10).toFixed(2)),
    estimatedPrice: Number(estimatedPrice.toFixed(2))
  };
}
