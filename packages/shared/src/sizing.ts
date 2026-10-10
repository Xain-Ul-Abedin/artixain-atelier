export type FitStatus = 'too_tight' | 'snug' | 'perfect' | 'loose' | 'too_loose' | 'insufficient_beads';

export interface FitAssessment {
  status: FitStatus;
  statusLabel: string;
  slackDifferenceCm: number;
  circumferenceCm: number;
  wristSizeCm: number;
  beadCount: number;
  statusColorHex: string;
}

export interface BeadPosition {
  index: number;
  gemstoneId: string;
  diameterMm: number;
  angleRadians: number;
  x: number;
  y: number;
}

export const MIN_WRIST_SIZE_CM = 13.0;
export const MAX_WRIST_SIZE_CM = 25.0;
export const DEFAULT_WRIST_SIZE_CM = 16.5;
export const STANDARD_CREDIT_CARD_WIDTH_MM = 85.60;
export const KNOT_ALLOWANCE_CM = 3.5;
export const SLACK_FACTOR_CM = 1.0;

/**
 * Calculates estimated wrist circumference from user height and weight
 * using anthropometric body frame regression.
 */
export function estimateWristSizeFromAnthropometrics(
  heightValue: number,
  weightValue: number,
  isImperial: boolean = false
): number {
  let heightCm = heightValue;
  let weightKg = weightValue;

  if (isImperial) {
    heightCm = heightValue * 2.54;
    weightKg = weightValue * 0.45359237;
  }

  // Regression: 12.5 + 0.035*(H - 150) + 0.05*(W - 50)
  const rawEstimate = 12.5 + 0.035 * (heightCm - 150) + 0.05 * (weightKg - 50);
  const clamped = Math.min(Math.max(rawEstimate, MIN_WRIST_SIZE_CM), MAX_WRIST_SIZE_CM);
  return Number(clamped.toFixed(1));
}

/**
 * Calculates device logical pixel ratio from credit card screen slider calibration.
 */
export function calculateDpiFromCreditCardSlider(sliderWidthPixels: number): number {
  return Number((sliderWidthPixels / STANDARD_CREDIT_CARD_WIDTH_MM).toFixed(3));
}

/**
 * Calculates total bracelet circumference from array of bead diameters in millimeters.
 */
export function calculateStrandCircumferenceMm(beadDiametersMm: number[]): number {
  return beadDiametersMm.reduce((acc, d) => acc + d, 0);
}

/**
 * Calculates total cut cord length for the physical artisan workshop.
 */
export function calculateWorkshopCordCutLengthCm(circumferenceCm: number): number {
  return Number((circumferenceCm + KNOT_ALLOWANCE_CM + SLACK_FACTOR_CM).toFixed(1));
}

/**
 * Evaluates real-time wrist fit physics.
 */
export function evaluateWristFit(
  beadDiametersMm: number[],
  targetWristSizeCm: number = DEFAULT_WRIST_SIZE_CM
): FitAssessment {
  const beadCount = beadDiametersMm.length;
  const circumferenceMm = calculateStrandCircumferenceMm(beadDiametersMm);
  const circumferenceCm = Number((circumferenceMm / 10).toFixed(2));

  if (circumferenceCm < 10.0 || beadCount < 6) {
    return {
      status: 'insufficient_beads',
      statusLabel: 'Add Beads',
      slackDifferenceCm: Number((circumferenceCm - targetWristSizeCm).toFixed(2)),
      circumferenceCm,
      wristSizeCm: targetWristSizeCm,
      beadCount,
      statusColorHex: '#71717A' // Neutral slate
    };
  }

  const slackDifferenceCm = Number((circumferenceCm - targetWristSizeCm).toFixed(2));

  if (slackDifferenceCm < -1.5) {
    return {
      status: 'too_tight',
      statusLabel: 'Too Tight',
      slackDifferenceCm,
      circumferenceCm,
      wristSizeCm: targetWristSizeCm,
      beadCount,
      statusColorHex: '#E11D48' // Rose red
    };
  }

  if (slackDifferenceCm >= -1.5 && slackDifferenceCm < -0.3) {
    return {
      status: 'snug',
      statusLabel: 'Snug Fit',
      slackDifferenceCm,
      circumferenceCm,
      wristSizeCm: targetWristSizeCm,
      beadCount,
      statusColorHex: '#D97706' // Amber
    };
  }

  if (slackDifferenceCm >= -0.3 && slackDifferenceCm <= 1.2) {
    return {
      status: 'perfect',
      statusLabel: 'Perfect Fit',
      slackDifferenceCm,
      circumferenceCm,
      wristSizeCm: targetWristSizeCm,
      beadCount,
      statusColorHex: '#059669' // Emerald green
    };
  }

  if (slackDifferenceCm > 1.2 && slackDifferenceCm <= 2.2) {
    return {
      status: 'loose',
      statusLabel: 'Relaxed / Loose',
      slackDifferenceCm,
      circumferenceCm,
      wristSizeCm: targetWristSizeCm,
      beadCount,
      statusColorHex: '#D97706' // Amber
    };
  }

  return {
    status: 'too_loose',
    statusLabel: 'Too Loose',
    slackDifferenceCm,
    circumferenceCm,
    wristSizeCm: targetWristSizeCm,
    beadCount,
    statusColorHex: '#E11D48' // Rose red
  };
}

/**
 * Computes exact 2D polar coordinates for circular canvas rendering.
 */
export function computeRadialBeadCoordinates(
  beadEntries: Array<{ id: string; gemstoneId: string; diameterMm: number }>,
  centerX: number,
  centerY: number,
  scaleFactor: number = 1.0
): BeadPosition[] {
  const totalCircumferenceMm = beadEntries.reduce((sum, b) => sum + b.diameterMm, 0);
  if (totalCircumferenceMm === 0) return [];

  // Cord radius R in canvas pixels = (C / 2pi) * scaleFactor
  const radiusPx = (totalCircumferenceMm / (2 * Math.PI)) * scaleFactor;

  let currentDistanceMm = 0;

  return beadEntries.map((bead, index) => {
    const beadCenterDistanceMm = currentDistanceMm + bead.diameterMm / 2;
    const angleFraction = beadCenterDistanceMm / totalCircumferenceMm;
    const angleRadians = 2 * Math.PI * angleFraction - Math.PI / 2; // Start from top 12 o'clock

    currentDistanceMm += bead.diameterMm;

    const x = centerX + radiusPx * Math.cos(angleRadians);
    const y = centerY + radiusPx * Math.sin(angleRadians);

    return {
      index,
      gemstoneId: bead.gemstoneId,
      diameterMm: bead.diameterMm,
      angleRadians,
      x,
      y
    };
  });
}

export interface WristCategory {
  label: string;
  exactCm: number;
  recommendedFor: string;
  estimatedBeads8mm: number;
}

export const WRIST_SIZE_CATEGORIES: WristCategory[] = [
  { label: 'Petite (XS)', exactCm: 15.0, recommendedFor: 'Very Slender Wrists', estimatedBeads8mm: 19 },
  { label: 'Small (S)', exactCm: 16.0, recommendedFor: 'Slender Women / Youth', estimatedBeads8mm: 20 },
  { label: 'Standard (M)', exactCm: 16.5, recommendedFor: 'Universal Standard Women', estimatedBeads8mm: 21 },
  { label: 'Medium-Large (L)', exactCm: 17.5, recommendedFor: 'Standard Men / Relaxed', estimatedBeads8mm: 22 },
  { label: 'Large (XL)', exactCm: 18.5, recommendedFor: 'Broad Men / Generous Fit', estimatedBeads8mm: 23 },
  { label: 'Extra Large (XXL)', exactCm: 20.0, recommendedFor: 'Solid / Heavy Build', estimatedBeads8mm: 25 }
];

export function estimateWristCircumferenceCm(params: {
  heightCm: number;
  weightKg: number;
  gender?: 'female' | 'male' | 'unisex';
}): number {
  return estimateWristSizeFromAnthropometrics(params.heightCm, params.weightKg, false);
}

