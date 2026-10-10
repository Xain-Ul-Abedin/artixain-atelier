export interface PricingItem {
  id: string;
  basePrice: number;
  title: string;
  packagingType?: 'linen_pouch' | 'velvet_box';
  hasEngravedTag?: boolean;
}

export interface PricingBreakdown {
  items: Array<{
    id: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercent: number;
    tierLabel: string;
  }>;
  originalSubtotal: number;
  discountedSubtotal: number;
  totalTierSavings: number;
  packagingFeesTotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  finalTotal: number;
}

export const FREE_SHIPPING_THRESHOLD = 50.00;
export const STANDARD_SHIPPING_FEE = 6.50;
export const VELVET_BOX_FEE = 8.00;
export const ENGRAVED_TAG_FEE = 6.00;
export const FOURTH_PLUS_FLAT_PRICE = 19.00;

export function calculateVolumePricing(items: PricingItem[]): PricingBreakdown {
  if (!items || items.length === 0) {
    return {
      items: [],
      originalSubtotal: 0,
      discountedSubtotal: 0,
      totalTierSavings: 0,
      packagingFeesTotal: 0,
      shippingFee: STANDARD_SHIPPING_FEE,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      amountNeededForFreeShipping: FREE_SHIPPING_THRESHOLD,
      finalTotal: STANDARD_SHIPPING_FEE
    };
  }

  // Sort items descending by basePrice to give the customer optimal tier discounts
  const sortedItems = [...items].sort((a, b) => b.basePrice - a.basePrice);

  let originalSubtotal = 0;
  let discountedSubtotal = 0;
  let packagingFeesTotal = 0;

  const processedItems = sortedItems.map((item, index) => {
    originalSubtotal += item.basePrice;
    let discountedPrice = item.basePrice;
    let discountPercent = 0;
    let tierLabel = 'Standard Price';

    if (index === 0) {
      discountedPrice = item.basePrice;
      tierLabel = '1st Design (Standard)';
    } else if (index === 1) {
      discountedPrice = Number((item.basePrice * 0.75).toFixed(2));
      discountPercent = 25;
      tierLabel = '2nd Design (-25%)';
    } else if (index === 2) {
      discountedPrice = Number((item.basePrice * 0.65).toFixed(2));
      discountPercent = 35;
      tierLabel = '3rd Design (-35%)';
    } else {
      discountedPrice = Math.min(FOURTH_PLUS_FLAT_PRICE, item.basePrice);
      discountPercent = Number((((item.basePrice - discountedPrice) / item.basePrice) * 100).toFixed(0));
      tierLabel = `4th+ Design ($${FOURTH_PLUS_FLAT_PRICE.toFixed(2)} Flat)`;
    }

    discountedSubtotal += discountedPrice;

    if (item.packagingType === 'velvet_box') {
      packagingFeesTotal += VELVET_BOX_FEE;
    }
    if (item.hasEngravedTag) {
      packagingFeesTotal += ENGRAVED_TAG_FEE;
    }

    return {
      id: item.id,
      title: item.title,
      originalPrice: item.basePrice,
      discountedPrice,
      discountPercent,
      tierLabel
    };
  });

  const totalTierSavings = Number((originalSubtotal - discountedSubtotal).toFixed(2));
  const merchandiseTotal = Number(discountedSubtotal.toFixed(2));
  const shippingFee = merchandiseTotal >= FREE_SHIPPING_THRESHOLD ? 0.00 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - merchandiseTotal).toFixed(2)));
  const finalTotal = Number((merchandiseTotal + packagingFeesTotal + shippingFee).toFixed(2));

  return {
    items: processedItems,
    originalSubtotal: Number(originalSubtotal.toFixed(2)),
    discountedSubtotal: merchandiseTotal,
    totalTierSavings,
    packagingFeesTotal: Number(packagingFeesTotal.toFixed(2)),
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
    finalTotal
  };
}

export interface CartItemCalculus {
  id: string;
  basePrice: number;
  quantity: number;
}

export interface CartPricingSummary {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  finalTotal: number;
  appliedTierCount: number;
  volumeTierMessage: string;
}

export function calculateCartPricing(items: CartItemCalculus[]): CartPricingSummary {
  const flattened: PricingItem[] = [];
  items.forEach((it) => {
    for (let i = 0; i < it.quantity; i++) {
      flattened.push({
        id: `${it.id}_${i}`,
        basePrice: it.basePrice,
        title: 'Bracelet Strand'
      });
    }
  });

  const breakdown = calculateVolumePricing(flattened);
  const isFreeShipping = breakdown.shippingFee === 0;

  let volumeTierMessage = 'Add a 2nd bracelet to unlock 25% OFF';
  if (flattened.length === 1) {
    volumeTierMessage = 'Add 1 more bracelet to unlock 25% OFF on design #2!';
  } else if (flattened.length === 2) {
    volumeTierMessage = '25% OFF unlocked on 2nd strand! Add 1 more for 35% OFF on #3!';
  } else if (flattened.length === 3) {
    volumeTierMessage = '35% OFF unlocked on 3rd strand! Add 4th+ for $19.00 flat!';
  } else if (flattened.length >= 4) {
    volumeTierMessage = 'VIP Atelier Tier: 4th+ bracelets at $19.00 flat!';
  }

  return {
    subtotal: breakdown.originalSubtotal,
    discountAmount: breakdown.totalTierSavings,
    shippingFee: breakdown.shippingFee,
    isFreeShipping,
    amountNeededForFreeShipping: breakdown.amountNeededForFreeShipping,
    finalTotal: breakdown.finalTotal,
    appliedTierCount: flattened.length,
    volumeTierMessage
  };
}

