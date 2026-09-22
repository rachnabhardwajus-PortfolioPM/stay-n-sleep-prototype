import type { Property, PropertyType } from '../types'

interface PropertyTemplate {
  name: string
  type: PropertyType
  hostName: string
  seed: string
  loyaltyEligible: boolean
  baseRate: number
  starRating: number
  reviewCount: number
  amenities: string[]
  description: string
}

const TEMPLATES: PropertyTemplate[] = [
  {
    name: 'Marriott Downtown',
    type: 'Hotel',
    hostName: 'Marriott Hotels',
    seed: 'marriott-downtown',
    loyaltyEligible: true,
    baseRate: 235,
    starRating: 4.8,
    reviewCount: 342,
    amenities: ['High-speed WiFi', 'Valet parking', 'Fitness center', 'Rooftop pool', '24/7 room service', 'Business center', 'Express laundry', 'Restaurant on-site', 'ADA accessible'],
    description:
      'A full-service hotel in the heart of downtown, offering modern rooms with high-speed WiFi, a business center, and meeting facilities. Walking distance to the convention center and main entertainment district. Dedicated corporate amenities include express check-in for business guests, same-day laundry, 24/7 room service, and a rooftop pool with city views.',
  },
  {
    name: 'Hyatt Place Downtown',
    type: 'Hotel',
    hostName: 'Hyatt Hotels',
    seed: 'hyatt-place',
    loyaltyEligible: true,
    baseRate: 198,
    starRating: 4.6,
    reviewCount: 218,
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Business center'],
    description:
      'A modern, efficient hotel built for business travelers, featuring free breakfast, a 24-hour fitness center, and spacious work desks in every room. Steps from major office corridors and public transit.',
  },
  {
    name: 'The Ledger Boutique Hotel',
    type: 'Boutique Hotel',
    hostName: 'Independent Host',
    seed: 'ledger-boutique',
    loyaltyEligible: true,
    baseRate: 290,
    starRating: 4.9,
    reviewCount: 156,
    amenities: ['WiFi', 'Rooftop bar', 'Gym', 'Concierge', 'Pet friendly'],
    description:
      'A design-forward boutique property with locally inspired interiors, a rooftop bar, and personalized concierge service. Popular with executives who want a distinctive stay without sacrificing business amenities.',
  },
  {
    name: 'Urban Stay Serviced Apartments',
    type: 'Serviced Apartment',
    hostName: 'Individual Host',
    seed: 'urban-stay-apartments',
    loyaltyEligible: false,
    baseRate: 165,
    starRating: 4.5,
    reviewCount: 89,
    amenities: ['WiFi', 'Full kitchen', 'Laundry in-unit', 'Parking'],
    description:
      'Fully furnished apartment-style accommodations with full kitchens and in-unit laundry — ideal for longer team stays. Managed by a local individual host on the Stay-N-Sleep marketplace.',
  },
  {
    name: 'Extended Suites',
    type: 'Extended Stay',
    hostName: 'Extended Suites Co.',
    seed: 'extended-suites',
    loyaltyEligible: true,
    baseRate: 179,
    starRating: 4.4,
    reviewCount: 201,
    amenities: ['WiFi', 'Kitchenette', 'Gym', 'Breakfast', 'Parking'],
    description:
      'Spacious suites with kitchenettes and weekly housekeeping, designed for teams on multi-day project assignments. Includes complimentary breakfast and on-site parking.',
  },
]

function imageUrl(seed: string, index: number, width = 800, height = 600) {
  return `https://picsum.photos/seed/${seed}-${index}/${width}/${height}`
}

const REVIEW_POOL = [
  { reviewerName: 'Marcus T.', company: 'Deloitte' },
  { reviewerName: 'Priya N.', company: 'Salesforce' },
  { reviewerName: 'Jordan K.', company: 'Accenture' },
  { reviewerName: 'Elena R.', company: 'Northstar Consulting' },
]

const REVIEW_TEXTS = [
  'Perfect for corporate travel. The business center was well-equipped and the staff understood the needs of business guests immediately. Check-in was seamless.',
  'Great location for meetings downtown. Rooms are quiet, have proper work desks with good lighting, and the WiFi was fast and reliable throughout.',
  'Consistently reliable for our team trips. Booking through the corporate portal made expense tracking effortless.',
]

export function generatePropertiesForSearch(destination: string): Property[] {
  return TEMPLATES.map((template, i) => {
    const rate = template.baseRate
    return {
      id: `${template.seed}`,
      name: `${template.name}${destination ? ` ${destination.split(',')[0]}` : ''}`,
      type: template.type,
      imageUrl: imageUrl(template.seed, 0),
      galleryUrls: [imageUrl(template.seed, 1, 1000, 700), imageUrl(template.seed, 2, 1000, 340), imageUrl(template.seed, 3, 1000, 340)],
      location: destination || 'Austin, TX',
      city: destination || 'Austin, TX',
      starRating: template.starRating,
      reviewCount: template.reviewCount,
      hostName: template.hostName,
      standardRatePerNight: rate,
      loyaltyEligible: template.loyaltyEligible,
      amenities: template.amenities,
      description: template.description,
      reviews: [0, 1].map((r) => ({
        reviewerName: REVIEW_POOL[(i + r) % REVIEW_POOL.length].reviewerName,
        company: REVIEW_POOL[(i + r) % REVIEW_POOL.length].company,
        date: r === 0 ? 'October 2024' : 'September 2024',
        rating: 5,
        text: REVIEW_TEXTS[(i + r) % REVIEW_TEXTS.length],
      })),
    }
  })
}
