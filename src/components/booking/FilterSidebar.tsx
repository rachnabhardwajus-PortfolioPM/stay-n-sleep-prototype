import type { PropertyType } from '../../types'

export interface Filters {
  loyaltyEligibleOnly: boolean
  minPrice: number
  maxPrice: number
  propertyTypes: PropertyType[]
  amenities: string[]
}

const ALL_PROPERTY_TYPES: PropertyType[] = ['Hotel', 'Serviced Apartment', 'Boutique Hotel', 'Extended Stay']
const ALL_AMENITIES = ['WiFi', 'Parking', 'Gym', 'Pool', 'Breakfast']

export function FilterSidebar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const toggleType = (type: PropertyType) => {
    const has = filters.propertyTypes.includes(type)
    onChange({
      ...filters,
      propertyTypes: has ? filters.propertyTypes.filter((t) => t !== type) : [...filters.propertyTypes, type],
    })
  }

  const toggleAmenity = (amenity: string) => {
    const has = filters.amenities.includes(amenity)
    onChange({
      ...filters,
      amenities: has ? filters.amenities.filter((a) => a !== amenity) : [...filters.amenities, amenity],
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">Filters</h3>

      <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">Loyalty Eligible Only</p>
          <p className="text-xs text-slate-500">Only show Corporate Loyalty Eligible properties</p>
        </div>
        <button
          role="switch"
          aria-checked={filters.loyaltyEligibleOnly}
          onClick={() => onChange({ ...filters, loyaltyEligibleOnly: !filters.loyaltyEligibleOnly })}
          className={`h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
            filters.loyaltyEligibleOnly ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white transition-transform ${
              filters.loyaltyEligibleOnly ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className="border-b border-slate-100 py-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Price Per Night</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="border-b border-slate-100 py-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Property Type</p>
        <div className="flex flex-col gap-2">
          {ALL_PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={filters.propertyTypes.includes(type)} onChange={() => toggleType(type)} />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Amenities</p>
        <div className="flex flex-col gap-2">
          {ALL_AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export function defaultFilters(): Filters {
  return {
    loyaltyEligibleOnly: false,
    minPrice: 100,
    maxPrice: 300,
    propertyTypes: [...ALL_PROPERTY_TYPES],
    amenities: [],
  }
}
