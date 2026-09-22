import type { BookingTraveler } from '../../types'

export function TravelerRow({ traveler }: { traveler: BookingTraveler }) {
  const initials = traveler.fullName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {initials}
        </span>
        <div>
          <p className="font-semibold text-slate-900">{traveler.fullName}</p>
          <p className="text-sm text-slate-500">{traveler.workEmail}</p>
        </div>
      </div>
      {traveler.roomNumber && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">Room {traveler.roomNumber}</span>
      )}
    </div>
  )
}
