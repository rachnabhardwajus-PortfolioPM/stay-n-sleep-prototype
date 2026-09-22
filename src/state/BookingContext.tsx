import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { mockCompany, mockUser, seedTrips } from '../data/mockData'
import type { BookingTraveler, Employee, Property, Trip, TripDetails } from '../types'
import { computeBookingPricing } from '../utils/loyalty'
import { nightsBetween } from '../utils/format'

interface WizardState {
  tripDetails: TripDetails | null
  employees: Employee[]
  selectedProperty: Property | null
}

const emptyWizard: WizardState = {
  tripDetails: null,
  employees: [],
  selectedProperty: null,
}

interface BookingContextValue {
  loggedIn: boolean
  login: () => void
  logout: () => void
  company: typeof mockCompany
  user: typeof mockUser
  trips: Trip[]
  wizard: WizardState
  setTripDetails: (details: TripDetails) => void
  setEmployees: (employees: Employee[]) => void
  selectProperty: (property: Property) => void
  confirmBooking: () => Trip
  resetWizard: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

const TRIPS_STORAGE_KEY = 'stay-n-sleep-trips'
const SESSION_STORAGE_KEY = 'stay-n-sleep-session'

function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(TRIPS_STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Trip[]
  } catch {
    // ignore malformed storage
  }
  return seedTrips
}

function loadSession(): boolean {
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(loadSession)
  const [trips, setTrips] = useState<Trip[]>(loadTrips)
  const [wizard, setWizard] = useState<WizardState>(emptyWizard)

  useEffect(() => {
    try {
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips))
    } catch {
      // ignore storage quota / privacy mode errors
    }
  }, [trips])

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, String(loggedIn))
    } catch {
      // ignore storage errors
    }
  }, [loggedIn])

  const value = useMemo<BookingContextValue>(
    () => ({
      loggedIn,
      login: () => setLoggedIn(true),
      logout: () => setLoggedIn(false),
      company: mockCompany,
      user: mockUser,
      trips,
      wizard,
      setTripDetails: (details) => setWizard((w) => ({ ...w, tripDetails: details })),
      setEmployees: (employees) => setWizard((w) => ({ ...w, employees })),
      selectProperty: (property) => setWizard((w) => ({ ...w, selectedProperty: property })),
      confirmBooking: () => {
        const { tripDetails, employees, selectedProperty } = wizard
        if (!tripDetails || !selectedProperty || employees.length === 0) {
          throw new Error('Cannot confirm booking: wizard state incomplete')
        }
        const nights = nightsBetween(tripDetails.checkIn, tripDetails.checkOut)
        const { standardTotal, corporateTotal, savings, taxesAndFees, total: totalCharged } = computeBookingPricing(
          selectedProperty.standardRatePerNight,
          nights,
          tripDetails.rooms,
          mockCompany.tier,
          selectedProperty.loyaltyEligible,
        )

        const travelers: BookingTraveler[] = employees.map((emp, i) => ({
          ...emp,
          roomNumber: String(300 + i + 1),
        }))

        const newTrip: Trip = {
          id: `trip-${Date.now()}`,
          confirmationNumber: `SNS-2024-${Math.floor(1000 + Math.random() * 9000)}`,
          companyId: mockCompany.id,
          destination: tripDetails.destination,
          checkIn: tripDetails.checkIn,
          checkOut: tripDetails.checkOut,
          nights,
          rooms: tripDetails.rooms,
          travelers,
          property: selectedProperty,
          status: 'Upcoming',
          standardTotal,
          corporateTotal,
          taxesAndFees,
          loyaltySavings: savings,
          totalCharged,
          createdAt: new Date().toISOString(),
        }

        setTrips((prev) => [newTrip, ...prev])
        return newTrip
      },
      resetWizard: () => setWizard(emptyWizard),
    }),
    [loggedIn, trips, wizard],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
