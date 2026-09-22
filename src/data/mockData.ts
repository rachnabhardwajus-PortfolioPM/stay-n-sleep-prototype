import type { Company, Property, Trip, User } from '../types'

export const mockCompany: Company = {
  id: 'apex-technologies',
  name: 'Apex Technologies, Inc.',
  tier: 'Gold',
  ytdSpend: 47320,
  ytdSpendChangePct: 12,
  totalLoyaltySavings: 8240,
  avgSavingsPct: 23,
  activeBookingsCount: 3,
  teamMembersCount: 24,
  pendingInvites: 4,
  loyaltyPointsCurrent: 2340,
  loyaltyPointsToNextTier: 660,
  nextTier: 'Platinum',
}

export const mockUser: User = {
  id: 'derek-morris',
  name: 'Derek Morris',
  role: 'Corporate Travel Manager',
  companyId: mockCompany.id,
  initials: 'DM',
}

const marriottAustin: Property = {
  id: 'marriott-downtown-austin-seed',
  name: 'Marriott Downtown Austin',
  type: 'Hotel',
  imageUrl: 'https://picsum.photos/seed/marriott-downtown-0/800/600',
  galleryUrls: [
    'https://picsum.photos/seed/marriott-downtown-1/1000/700',
    'https://picsum.photos/seed/marriott-downtown-2/1000/340',
    'https://picsum.photos/seed/marriott-downtown-3/1000/340',
  ],
  location: '300 E 4th St, Austin, TX',
  city: 'Austin, TX',
  starRating: 4.8,
  reviewCount: 342,
  hostName: 'Marriott Hotels',
  standardRatePerNight: 235,
  loyaltyEligible: true,
  amenities: ['High-speed WiFi', 'Valet parking', 'Fitness center', 'Rooftop pool', '24/7 room service', 'Business center'],
  description: 'A full-service Marriott in the heart of downtown Austin, walking distance to the convention center and 6th Street.',
  reviews: [],
}

const hyattTimesSquare: Property = {
  ...marriottAustin,
  id: 'hyatt-centric-times-square-seed',
  name: 'Hyatt Centric Times Square',
  hostName: 'Hyatt Hotels',
  location: 'Times Square, New York, NY',
  city: 'New York, NY',
  standardRatePerNight: 233,
}

export const seedTrips: Trip[] = [
  {
    id: 'trip-austin-nov',
    confirmationNumber: 'SNS-2024-6621',
    companyId: mockCompany.id,
    destination: 'Austin, TX',
    checkIn: '2024-11-14',
    checkOut: '2024-11-17',
    nights: 3,
    rooms: 3,
    travelers: [
      { id: 'emp-sarah', fullName: 'Sarah Reyes', workEmail: 'sarah.reyes@apextech.com', roomNumber: '301' },
      { id: 'emp-alex', fullName: 'Alex Liu', workEmail: 'alex.liu@apextech.com', roomNumber: '302' },
      { id: 'emp-james', fullName: 'James Kim', workEmail: 'james.kim@apextech.com', roomNumber: '303' },
    ],
    property: marriottAustin,
    status: 'Upcoming',
    standardTotal: 2115,
    corporateTotal: 1701,
    taxesAndFees: 255,
    loyaltySavings: 414,
    totalCharged: 1956,
    createdAt: '2024-10-20T09:00:00.000Z',
  },
  {
    id: 'trip-nyc-oct',
    confirmationNumber: 'SNS-2024-5187',
    companyId: mockCompany.id,
    destination: 'New York, NY',
    checkIn: '2024-10-03',
    checkOut: '2024-10-06',
    nights: 3,
    rooms: 5,
    travelers: [
      { id: 'emp-priya', fullName: 'Priya Nair', workEmail: 'priya.nair@apextech.com', roomNumber: '401' },
      { id: 'emp-marcus', fullName: 'Marcus Torres', workEmail: 'marcus.torres@apextech.com', roomNumber: '402' },
      { id: 'emp-lena', fullName: 'Lena Ortiz', workEmail: 'lena.ortiz@apextech.com', roomNumber: '403' },
      { id: 'emp-omar', fullName: 'Omar Haddad', workEmail: 'omar.haddad@apextech.com', roomNumber: '404' },
      { id: 'emp-grace', fullName: 'Grace Chen', workEmail: 'grace.chen@apextech.com', roomNumber: '405' },
    ],
    property: hyattTimesSquare,
    status: 'Completed',
    standardTotal: 4980,
    corporateTotal: 4200,
    taxesAndFees: 0,
    loyaltySavings: 780,
    totalCharged: 4200,
    createdAt: '2024-09-12T09:00:00.000Z',
  },
]
