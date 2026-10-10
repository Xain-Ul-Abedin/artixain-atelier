// Artixain Domain Calculus & Invariant Verification Suite
// Strict Zero-Emoji ASCII Protocol

import assert from 'node:assert';

console.log('[INFO] Starting Artixain Pure Mathematical Invariant Verification...');

// 1. Deterministic Volume Discount Calculus Tests
function calculateVolumeDiscounts(items) {
  if (!items || items.length === 0) {
    return {
      subtotalCents: 0,
      discountCents: 0,
      totalCents: 0,
      shippingCents: 0,
      itemBreakdown: [],
    };
  }

  // Sort descending by base price
  const sorted = [...items].sort((a, b) => b.basePriceCents - a.basePriceCents);
  let subtotal = 0;
  let total = 0;

  const itemBreakdown = sorted.map((item, index) => {
    const base = item.basePriceCents;
    subtotal += base;
    let finalPrice = base;
    let discountPct = 0;

    if (index === 0) {
      finalPrice = base;
      discountPct = 0;
    } else if (index === 1) {
      finalPrice = Math.floor(base * 0.75);
      discountPct = 25;
    } else if (index === 2) {
      finalPrice = Math.floor(base * 0.65);
      discountPct = 35;
    } else {
      finalPrice = 1900; // $19.00 flat
      discountPct = base > 1900 ? Math.round(((base - 1900) / base) * 100) : 0;
    }

    total += finalPrice;
    return {
      id: item.id,
      name: item.name,
      basePriceCents: base,
      finalPriceCents: finalPrice,
      discountPct,
    };
  });

  const discountTotal = subtotal - total;
  const shippingCents = total >= 5000 ? 0 : 700;

  return {
    subtotalCents: subtotal,
    discountCents: discountTotal,
    totalCents: total + shippingCents,
    shippingCents,
    itemBreakdown,
  };
}

// Test 1: Single item ($48.00)
const cart1 = calculateVolumeDiscounts([{ id: '1', name: 'Obsidian Flow', basePriceCents: 4800 }]);
assert.strictEqual(cart1.subtotalCents, 4800, 'Subtotal should be $48.00');
assert.strictEqual(cart1.discountCents, 0, 'Discount should be $0.00');
assert.strictEqual(cart1.shippingCents, 700, 'Shipping should be $7.00 (< $50)');
assert.strictEqual(cart1.totalCents, 5500, 'Total should be $55.00');
console.log('[PASS] Invariant 1: Single item standard pricing and shipping verified.');

// Test 2: Two items ($48.00 and $40.00)
const cart2 = calculateVolumeDiscounts([
  { id: '1', name: 'Obsidian Flow', basePriceCents: 4800 },
  { id: '2', name: 'Amethyst Aura', basePriceCents: 4000 },
]);
assert.strictEqual(cart2.subtotalCents, 8800, 'Subtotal should be $88.00');
assert.strictEqual(cart2.discountCents, 1000, 'Discount should be $10.00 (25% off 2nd)');
assert.strictEqual(cart2.shippingCents, 0, 'Shipping should be free (>= $50)');
assert.strictEqual(cart2.totalCents, 7800, 'Total should be $78.00');
console.log('[PASS] Invariant 2: Two-item 25% discount and free shipping verified.');

// Test 3: Four items ($50, $40, $30, $25)
const cart4 = calculateVolumeDiscounts([
  { id: '1', name: 'A', basePriceCents: 5000 },
  { id: '2', name: 'B', basePriceCents: 4000 },
  { id: '3', name: 'C', basePriceCents: 3000 },
  { id: '4', name: 'D', basePriceCents: 2500 },
]);
assert.strictEqual(cart4.subtotalCents, 14500, 'Subtotal should be $145.00');
assert.strictEqual(cart4.totalCents, 11850, 'Total should be $118.50');
assert.strictEqual(cart4.discountCents, 2650, 'Discount should be $26.50');
console.log('[PASS] Invariant 3: Multi-item volume discount & $19 flat tier verified.');

// 2. Anthropometric Wrist Regression Invariant Tests
function calculateWristCircumference(heightCm, weightKg) {
  const raw = 0.082 * heightCm + 0.045 * weightKg - 0.5;
  return Math.round(raw * 10) / 10;
}

function calculateCordCutLengthCm(wristCircumferenceCm) {
  return Math.round((wristCircumferenceCm + 4.5) * 10) / 10;
}

const wrist = calculateWristCircumference(175, 70);
assert.strictEqual(wrist, 17.0, 'Wrist circumference should be 17.0 cm');
const cordCut = calculateCordCutLengthCm(wrist);
assert.strictEqual(cordCut, 21.5, 'Cord cut length should be 21.5 cm (17.0 + 4.5cm knot allowance)');
console.log('[PASS] Invariant 4: Anthropometric sizing and +4.5cm cord cut calculus verified.');

// 3. Compact Design Token Codec Invariant Tests
function encodeDesignToken(wristSizeCm, cordType, beads) {
  const wristMm = Math.round(wristSizeCm * 10);
  const cordCode = cordType === 'braided_silk' ? 'slk' : cordType === 'gold_wire' ? 'wir' : 'sil';
  const beadString = beads.map((b) => `${b.gemstoneCode}${b.diameterMm}`).join('-');
  return `artx.v1.${wristMm}.${cordCode}.${beadString}`;
}

function decodeDesignToken(token) {
  let cleanToken = token.trim();
  if (cleanToken.startsWith('artx.')) {
    cleanToken = cleanToken.slice(5);
  }
  const parts = cleanToken.split('.');
  if (parts.length < 4 || parts[0] !== 'v1') return null;

  const wristMm = parseInt(parts[1], 10);
  const targetWristSizeCm = !isNaN(wristMm) ? Number((wristMm / 10).toFixed(1)) : 16.5;

  let cordType = 'silicone_stretch';
  if (parts[2] === 'slk') cordType = 'braided_silk';
  else if (parts[2] === 'wir') cordType = 'gold_wire';

  const beadSegments = parts[3].split('-').filter((s) => s.length >= 3);
  const beads = beadSegments.map((segment, index) => {
    const match = segment.match(/^([A-Z0-9]+?)(\d{1,2})$/);
    const code = match ? match[1] : 'CQ';
    const diameter = match ? parseInt(match[2], 10) : 8;
    return {
      position: index + 1,
      code,
      diameterMm: diameter,
    };
  });

  return {
    version: parts[0],
    targetWristSizeCm,
    cordType,
    beads,
    totalBeadCount: beads.length,
  };
}

const sampleBeadEntries = [
  { gemstoneCode: 'OB', diameterMm: 8 },
  { gemstoneCode: 'GD', diameterMm: 6 },
  { gemstoneCode: 'AM', diameterMm: 8 },
];
const token = encodeDesignToken(17.0, 'silicone_stretch', sampleBeadEntries);
assert.strictEqual(token, 'artx.v1.170.sil.OB8-GD6-AM8');
const decoded = decodeDesignToken(token);
assert.strictEqual(decoded.targetWristSizeCm, 17.0);
assert.strictEqual(decoded.cordType, 'silicone_stretch');
assert.strictEqual(decoded.beads.length, 3);
assert.strictEqual(decoded.beads[0].code, 'OB');
assert.strictEqual(decoded.beads[0].diameterMm, 8);
console.log('[PASS] Invariant 5: Lossless URL-safe token serialization and deserialization verified.');

console.log('\n[SUMMARY] All 5 mathematical invariants passed flawlessly.');
