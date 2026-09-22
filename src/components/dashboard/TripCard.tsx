import type { Trip } from '../../types'
import { formatCurrency, formatDateShort } from '../../utils/format'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function TripCard({ trip }: { trip: Trip }) {
  const initials = (name: string) =>
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  const shortName = (name: string) => {
    const [first, last] = name.split(' ')
    return last ? `${first} ${last[0]}.` : first
  }

  return (
    <div className="border-b border-slate-100 p-5 last:border-b-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="font-medium text-slate-700">
            {formatDateShort(trip.checkIn)} – {formatDateShort(trip.checkOut)}, {new Date(trip.checkIn).getFullYear()}
          </span>
          <span>
            {trip.nights} nights · {trip.rooms} rooms
          </span>
          <Badge variant={trip.status === 'Upcoming' ? 'success' : 'neutral'}>{trip.status}</Badge>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">{formatCurrency(trip.totalCharged)}</p>
          <p className="text-sm font-medium text-green-600">Saved {formatCurrency(trip.loyaltySavings)}</p>
        </div>
      </div>

      <p className="mt-2 text-lg font-semibold text-slate-900">{trip.destination}</p>
      <p className="text-sm text-slate-500">
        {trip.property.name} · {trip.property.location}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex -space-x-2">
          {trip.travelers.slice(0, 3).map((t, i) => (
            <span
              key={t.id}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white ${
                ['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-amber-600'][i % 4]
              }`}
              title={t.fullName}
            >
              {initials(t.fullName)}
            </span>
          ))}
          {trip.travelers.length > 3 && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-xs font-semibold text-slate-700">
              +{trip.travelers.length - 3}
            </span>
          )}
          <span className="ml-3 self-center text-sm text-slate-500">
            {trip.travelers
              .slice(0, 3)
              .map((t) => shortName(t.fullName))
              .join(', ')}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="disabled" className="px-4 py-2" disabled title="Not functional in this prototype">
            Edit
          </Button>
          <Button variant="disabled" className="px-4 py-2" disabled title="Not functional in this prototype">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
