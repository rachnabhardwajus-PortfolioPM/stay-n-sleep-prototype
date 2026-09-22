import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import { computeBookingPricing } from '../../utils/loyalty'
import { formatDate, nightsBetween } from '../../utils/format'
import { TopNav } from '../../components/layout/TopNav'
import { StepIndicator } from '../../components/layout/StepIndicator'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PriceSummary } from '../../components/booking/PriceSummary'

const STEPS = ['Trip Details', 'Add Employees', 'Review Booking']

export function BookingReviewPage() {
  const { wizard, company, confirmBooking } = useBooking()
  const navigate = useNavigate()

  const ready = Boolean(wizard.tripDetails && wizard.selectedProperty && wizard.employees.length > 0)

  useEffect(() => {
    if (!ready) navigate('/booking/trip-details')
  }, [ready, navigate])

  const pricing = useMemo(() => {
    if (!ready || !wizard.tripDetails || !wizard.selectedProperty) return null
    const nights = nightsBetween(wizard.tripDetails.checkIn, wizard.tripDetails.checkOut)
    return computeBookingPricing(
      wizard.selectedProperty.standardRatePerNight,
      nights,
      wizard.tripDetails.rooms,
      company.tier,
      wizard.selectedProperty.loyaltyEligible,
    )
  }, [ready, wizard.tripDetails, wizard.selectedProperty, company.tier])

  if (!ready || !wizard.tripDetails || !wizard.selectedProperty || !pricing) return null

  const { tripDetails, selectedProperty: property, employees } = wizard

  const handleConfirm = () => {
    confirmBooking()
    navigate('/booking/confirmation')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <StepIndicator steps={STEPS} currentStep={2} />

        <h1 className="mt-8 text-2xl font-bold text-slate-900">Review your booking</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <img src={property.imageUrl} alt={property.name} className="h-20 w-20 rounded-lg object-cover" />
                <div>
                  {property.loyaltyEligible && <Badge variant="gold">★ Corporate Loyalty Eligible</Badge>}
                  <p className="mt-1 text-lg font-bold text-slate-900">{property.name}</p>
                  <p className="text-sm text-slate-500">{property.location}</p>
                  <p className="text-sm text-slate-500">
                    ★ {property.starRating} · {property.type} · {property.hostName}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Check-in</p>
                  <p className="font-semibold text-slate-800">{formatDate(tripDetails.checkIn)}</p>
                </div>
                <div className="pl-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Check-out</p>
                  <p className="font-semibold text-slate-800">{formatDate(tripDetails.checkOut)}</p>
                </div>
                <div className="pl-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Duration</p>
                  <p className="font-semibold text-slate-800">{pricing.nights} nights</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">Travelers — {tripDetails.rooms} rooms booked</h2>
              <div className="mt-3 divide-y divide-slate-100">
                {employees.map((emp, i) => (
                  <div key={emp.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{emp.fullName}</p>
                      <p className="text-sm text-slate-500">{emp.workEmail}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                      Room {300 + i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">Cancellation Policy</h2>
              <p className="mt-2 text-sm text-slate-600">
                Free cancellation until <strong>{formatDate(tripDetails.checkIn)} at 11:59 PM local time</strong>. After that,
                cancellation is subject to the property's standard policy.
              </p>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Price Summary</h2>
            <div className="mt-4">
              <PriceSummary
                ratePerNight={pricing.corporateRatePerNight}
                nights={pricing.nights}
                rooms={tripDetails.rooms}
                standardTotal={pricing.standardTotal}
                corporateTotal={pricing.corporateTotal}
                taxesAndFees={pricing.taxesAndFees}
                savings={pricing.savings}
                total={pricing.total}
                tier={company.tier}
              />
            </div>
            <p className="mt-3 text-xs text-slate-400">Charged to {company.name} corporate card</p>
            <Button onClick={handleConfirm} className="mt-5 w-full py-4 text-base">
              Confirm Group Booking
            </Button>
            <p className="mt-3 text-center text-xs text-slate-400">
              🔒 Secure booking · Confirmation sent to all {employees.length} travelers instantly
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
