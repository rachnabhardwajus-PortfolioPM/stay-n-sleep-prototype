import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import type { Property } from '../../types'
import { computeBookingPricing } from '../../utils/loyalty'
import { formatCurrency, nightsBetween } from '../../utils/format'
import { TopNav } from '../../components/layout/TopNav'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PriceSummary } from '../../components/booking/PriceSummary'

export function PropertyDetailsPage() {
  const { wizard, company, selectProperty } = useBooking()
  const navigate = useNavigate()
  const location = useLocation()
  const property = (location.state as { property?: Property } | null)?.property

  useEffect(() => {
    if (!wizard.tripDetails || wizard.employees.length === 0 || !property) navigate('/booking/search')
  }, [wizard.tripDetails, wizard.employees, property, navigate])

  if (!wizard.tripDetails || !property) return null

  const nights = nightsBetween(wizard.tripDetails.checkIn, wizard.tripDetails.checkOut)
  const rooms = wizard.tripDetails.rooms
  const pricing = computeBookingPricing(property.standardRatePerNight, nights, rooms, company.tier, property.loyaltyEligible)
  const { standardTotal, corporateTotal: corporateAmount, savings, taxesAndFees, total, corporateRatePerNight } = pricing

  const handleReserve = () => {
    selectProperty(property)
    navigate('/booking/review')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <button onClick={() => navigate('/booking/search')} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
          ← Back to search results
        </button>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <img src={property.galleryUrls[0]} alt={property.name} className="h-72 w-full rounded-xl object-cover sm:h-full" />
          <div className="grid grid-rows-2 gap-2">
            <img src={property.galleryUrls[1]} alt={property.name} className="h-full w-full rounded-xl object-cover" />
            <img src={property.galleryUrls[2]} alt={property.name} className="h-full w-full rounded-xl object-cover" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-2">
              {property.loyaltyEligible && <Badge variant="gold">★ Corporate Loyalty Eligible</Badge>}
              <Badge variant="neutral">{property.type}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{property.name}</h1>
            <p className="mt-2 text-slate-600">
              📍 {property.location} · <span className="font-semibold text-amber-600">★ {property.starRating}</span> (
              {property.reviewCount} reviews) · Hosted by {property.hostName}
            </p>

            <h2 className="mt-8 text-lg font-bold text-slate-900">About this property</h2>
            <p className="mt-2 leading-relaxed text-slate-600">{property.description}</p>

            <h2 className="mt-8 text-lg font-bold text-slate-900">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <p key={a} className="flex items-center gap-2 text-sm text-slate-700">
                  <span aria-hidden>✓</span> {a}
                </p>
              ))}
            </div>

            {property.reviews.length > 0 && (
              <>
                <h2 className="mt-8 text-lg font-bold text-slate-900">Recent Reviews</h2>
                <div className="mt-3 space-y-4">
                  {property.reviews.map((r, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                        {r.reviewerName
                          .split(' ')
                          .map((p) => p[0])
                          .join('')}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {r.reviewerName} <span className="font-normal text-slate-400">{r.company} · {r.date}</span>
                        </p>
                        <p className="text-amber-500">{'★'.repeat(r.rating)}</p>
                        <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            {property.loyaltyEligible && (
              <p className="text-sm text-slate-400 line-through">{formatCurrency(property.standardRatePerNight)}/night</p>
            )}
            <p className="text-3xl font-bold text-slate-900">
              {formatCurrency(corporateRatePerNight)}
              <span className="text-base font-normal text-slate-500">/night</span>
            </p>
            {property.loyaltyEligible && (
              <p className="text-sm font-semibold text-green-600">
                ★ Corporate loyalty rate — save {formatCurrency(property.standardRatePerNight - corporateRatePerNight)}/night
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Check-in</p>
                <p className="font-semibold text-slate-800">{wizard.tripDetails.checkIn}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Check-out</p>
                <p className="font-semibold text-slate-800">{wizard.tripDetails.checkOut}</p>
              </div>
              <div className="col-span-2 border-t border-slate-100 pt-2">
                <p className="text-xs font-semibold uppercase text-slate-400">Rooms</p>
                <p className="font-semibold text-slate-800">
                  {rooms} rooms · {wizard.employees.length} employees
                </p>
              </div>
            </div>

            <div className="mt-4">
              <PriceSummary
                ratePerNight={corporateRatePerNight}
                nights={nights}
                rooms={rooms}
                standardTotal={standardTotal}
                corporateTotal={corporateAmount}
                taxesAndFees={taxesAndFees}
                savings={savings}
                total={total}
                tier={company.tier}
              />
            </div>

            <Button onClick={handleReserve} className="mt-5 w-full py-4 text-base">
              Reserve — {formatCurrency(total)} total
            </Button>
            <p className="mt-3 text-center text-xs text-slate-400">
              You won't be charged until the booking is confirmed by all employees
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
