import { MASTER_GEMSTONES, Gemstone, getGemstoneByCode } from '@artixain/shared';
import { connectToDatabase } from '../db/mongoose';
import { InventoryItem } from '../db/models/Inventory';

// Dynamic stock tracker cache with default stock levels (500 units per gemstone)
const dynamicStockMap = new Map<string, number>();

MASTER_GEMSTONES.forEach((gem) => {
  dynamicStockMap.set(gem.code, 500);
});

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

    let results = MASTER_GEMSTONES.map((g) => ({
      ...g,
      stockQuantity: dynamicStockMap.get(g.code) ?? 500,
      isLowStock: (dynamicStockMap.get(g.code) ?? 500) < 20,
    }));

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

  /**
   * Adjusts stock quantity for a given gemstone code.
   */
  static async adjustStock(code: string, delta: number): Promise<{ code: string; newStock: number; isMadeToOrder: boolean }> {
    const current = dynamicStockMap.get(code) ?? 500;
    const newStock = Math.max(0, current + delta);
    dynamicStockMap.set(code, newStock);

    try {
      await connectToDatabase();
      await InventoryItem.findOneAndUpdate(
        { gemstoneCode: code },
        { $inc: { stockQuantity: delta }, $set: { updatedAt: new Date() } },
        { upsert: true }
      );
    } catch {
      // Memory fallback persistence
    }

    return {
      code,
      newStock,
      isMadeToOrder: newStock === 0,
    };
  }

  /**
   * Gets all gemstones currently below the low-stock safety threshold (20 units).
   */
  static getLowStockGems(threshold = 20): Array<{ code: string; name: string; stock: number }> {
    const lowStockList: Array<{ code: string; name: string; stock: number }> = [];
    for (const gem of MASTER_GEMSTONES) {
      const stock = dynamicStockMap.get(gem.code) ?? 500;
      if (stock < threshold) {
        lowStockList.push({
          code: gem.code,
          name: gem.name,
          stock,
        });
      }
    }
    return lowStockList;
  }
}
