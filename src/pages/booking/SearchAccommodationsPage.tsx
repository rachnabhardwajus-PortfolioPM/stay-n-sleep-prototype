import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import { generatePropertiesForSearch } from '../../data/properties'
import { TopNav } from '../../components/layout/TopNav'
import { PropertyCard } from '../../components/booking/PropertyCard'
import { FilterSidebar, defaultFilters, type Filters } from '../../components/booking/FilterSidebar'
import { formatDateShort } from '../../utils/format'

export function SearchAccommodationsPage() {
  const { wizard } = useBooking()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<Filters>(defaultFilters())

  useEffect(() => {
    if (!wizard.tripDetails || wizard.employees.length === 0) navigate('/booking/trip-details')
  }, [wizard.tripDetails, wizard.employees, navigate])

  const properties = useMemo(
    () => generatePropertiesForSearch(wizard.tripDetails?.destination ?? ''),
    [wizard.tripDetails?.destination],
  )

  const filtered = properties.filter((p) => {
    if (filters.loyaltyEligibleOnly && !p.loyaltyEligible) return false
    if (p.standardRatePerNight < filters.minPrice || p.standardRatePerNight > filters.maxPrice) return false
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.type)) return false
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) => p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase())))
      if (!hasAll) return false
    }
    return true
  })

  if (!wizard.tripDetails) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400">Destination</p>
            <p className="flex items-center gap-1 font-semibold text-slate-800">📍 {wizard.tripDetails.destination}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400">Dates</p>
            <p className="font-semibold text-slate-800">
              {formatDateShort(wizard.tripDetails.checkIn)} – {formatDateShort(wizard.tripDetails.checkOut)}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400">Rooms</p>
            <p className="font-semibold text-slate-800">{wizard.tripDetails.rooms} rooms</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-slate-700">
                <span className="font-bold text-slate-900">{filtered.length} properties</span> in {wizard.tripDetails.destination}{' '}
                · {formatDateShort(wizard.tripDetails.checkIn)}–{formatDateShort(wizard.tripDetails.checkOut)} ·{' '}
                {wizard.tripDetails.rooms} rooms
              </p>
            </div>

            <div className="space-y-4">
              {filtered.length === 0 ? (
                <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                  No properties match your filters. Try adjusting them.
                </p>
              ) : (
                filtered.map((property) => <PropertyCard key={property.id} property={property} />)
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
