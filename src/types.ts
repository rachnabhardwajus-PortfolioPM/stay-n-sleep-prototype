export type LoyaltyTier = 'Silver' | 'Gold' | 'Platinum'

export const TIER_DISCOUNTS: Record<LoyaltyTier, number> = {
  Silver: 0.1,
  Gold: 0.15,
  Platinum: 0.2,
}

export interface Company {
  id: string
  name: string
  tier: LoyaltyTier
  ytdSpend: number
  ytdSpendChangePct: number
  totalLoyaltySavings: number
  avgSavingsPct: number
  activeBookingsCount: number
  teamMembersCount: number
  pendingInvites: number
  loyaltyPointsCurrent: number
  loyaltyPointsToNextTier: number
  nextTier: LoyaltyTier | null
}

export interface User {
  id: string
  name: string
  role: 'Corporate Travel Manager'
  companyId: string
  initials: string
}

export interface Employee {
  id: string
  fullName: string
  workEmail: string
}

export type PropertyType = 'Hotel' | 'Serviced Apartment' | 'Boutique Hotel' | 'Extended Stay'

export interface Review {
  reviewerName: string
  company: string
  date: string
  rating: number
  text: string
}

export interface Property {
  id: string
  name: string
  type: PropertyType
  imageUrl: string
  galleryUrls: string[]
  location: string
  city: string
  starRating: number
  reviewCount: number
  hostName: string
  standardRatePerNight: number
  loyaltyEligible: boolean
  amenities: string[]
  description: string
  reviews: Review[]
}

export interface TripDetails {
  destination: string
  checkIn: string
  checkOut: string
  rooms: number
}

export interface BookingTraveler extends Employee {
  roomNumber?: string
}

export type TripStatus = 'Upcoming' | 'Completed'

export interface Trip {
  id: string
  confirmationNumber: string
  companyId: string
  destination: string
  checkIn: string
  checkOut: string
  nights: number
  rooms: number
  travelers: BookingTraveler[]
  property: Property
  status: TripStatus
  standardTotal: number
  corporateTotal: number
  taxesAndFees: number
  loyaltySavings: number
  totalCharged: number
  createdAt: string
}
