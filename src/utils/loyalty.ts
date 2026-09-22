import { TIER_DISCOUNTS, type LoyaltyTier } from '../types'

export function tierDiscountRate(tier: LoyaltyTier): number {
  return TIER_DISCOUNTS[tier]
}

export function applyLoyaltyDiscount(standardAmount: number, tier: LoyaltyTier) {
  const rate = tierDiscountRate(tier)
  const savings = Math.round(standardAmount * rate)
  const corporateAmount = standardAmount - savings
  return { corporateAmount, savings }
}

export interface BookingPricing {
  standardRatePerNight: number
  corporateRatePerNight: number
  nights: number
  rooms: number
  standardTotal: number
  corporateTotal: number
  savings: number
  taxesAndFees: number
  total: number
}

/**
 * Rounds the discounted per-night rate first, then derives every other
 * figure from it, so "$rate × nights × rooms" always equals the subtotal
 * shown on screen (rather than rounding the aggregate separately).
 */
export function computeBookingPricing(
  standardRatePerNight: number,
  nights: number,
  rooms: number,
  tier: LoyaltyTier,
  loyaltyEligible: boolean,
): BookingPricing {
  const corporateRatePerNight = loyaltyEligible
    ? Math.round(standardRatePerNight * (1 - tierDiscountRate(tier)))
    : standardRatePerNight
  const standardTotal = standardRatePerNight * nights * rooms
  const corporateTotal = corporateRatePerNight * nights * rooms
  const savings = standardTotal - corporateTotal
  const taxesAndFees = Math.round(corporateTotal * 0.15)
  const total = corporateTotal + taxesAndFees

  return {
    standardRatePerNight,
    corporateRatePerNight,
    nights,
    rooms,
    standardTotal,
    corporateTotal,
    savings,
    taxesAndFees,
    total,
  }
}
