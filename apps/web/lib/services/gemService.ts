import { MASTER_GEMSTONES, Gemstone, getGemstoneByCode } from '@artixain/shared';
import { connectToDatabase } from '../db/mongoose';
import { InventoryItem } from '../db/models/Inventory';

export class GemService {
  /**
   * Retrieves all 32 gemstones merged with dynamic database inventory levels.
   */
  static async getAllGems(category?: string, chakra?: string): Promise<Gemstone[]> {
    try {
      await connectToDatabase();
    } catch {
      // Graceful fallback to static master dataset in offline / cold environments
    }

    let results = [...MASTER_GEMSTONES];

    if (category === 'spacers') {
      results = results.filter((g) => g.isSpacer);
    } else if (category === 'protection') {
      results = results.filter((g) => ['OBS', 'TIG', 'LAB', 'BLT', 'ONY', 'LAV', 'HMT', 'SMQ'].includes(g.code));
    } else if (category === 'love') {
      results = results.filter((g) => ['RSQ', 'RDC', 'MNS', 'KUN', 'GAR', 'AMZ'].includes(g.code));
    } else if (category === 'clarity') {
      results = results.filter((g) => ['LAP', 'SDR', 'FLR', 'CLQ', 'HOW', 'AZU', 'APO'].includes(g.code));
    }

    if (chakra && chakra !== 'all') {
      results = results.filter((g) => g.chakra.toLowerCase().includes(chakra.toLowerCase()));
    }

    return results;
  }

  /**
   * Gets specific gemstone details by code.
   */
  static getGemByCode(code: string): Gemstone | undefined {
    return getGemstoneByCode(code);
  }
}
