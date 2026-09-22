import { useNavigate } from 'react-router-dom'
import type { Property } from '../../types'
import { computeBookingPricing } from '../../utils/loyalty'
import { formatCurrency } from '../../utils/format'
import { useBooking } from '../../state/BookingContext'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate()
  const { company } = useBooking()
  const pricing = computeBookingPricing(property.standardRatePerNight, 1, 1, company.tier, property.loyaltyEligible)
  const corporateAmount = pricing.corporateRatePerNight
  const savings = pricing.savings

  return (
    <Card className="flex flex-col overflow-hidden sm:flex-row">
      <div className="relative h-56 w-full flex-shrink-0 sm:h-auto sm:w-64">
        <img src={property.imageUrl} alt={property.name} className="h-full w-full object-cover" />
        {property.loyaltyEligible && (
          <div className="absolute left-3 top-3">
            <Badge variant="gold">★ Loyalty Eligible</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{property.type}</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{property.name}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <span aria-hidden>📍</span> {property.location}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-amber-600">★ {property.starRating}</span>{' '}
            <span className="text-slate-400">({property.reviewCount} reviews)</span> · {property.hostName}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {property.amenities.slice(0, 4).map((a) => (
              <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end justify-between text-right">
          <div>
            {property.loyaltyEligible && (
              <p className="text-sm text-slate-400 line-through">{formatCurrency(property.standardRatePerNight)}/night</p>
            )}
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(corporateAmount)}</p>
            <p className="text-sm text-slate-500">/night · corporate rate</p>
            {property.loyaltyEligible && <p className="text-sm font-semibold text-green-600">Save {formatCurrency(savings)}/night</p>}
          </div>
          <Button className="mt-3" onClick={() => navigate(`/booking/property/${property.id}`, { state: { property } })}>
            Select →
          </Button>
        </div>
      </div>
    </Card>
  )
}
