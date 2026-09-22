import type { Company } from '../../types'

export function ProgressCard({ company }: { company: Company }) {
  if (!company.nextTier) return null

  const totalNeeded = company.loyaltyPointsCurrent + company.loyaltyPointsToNextTier
  const progressPct = Math.round((company.loyaltyPointsCurrent / totalNeeded) * 100)

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-bold text-amber-900">
          <span aria-hidden>★</span> {company.tier} Status
        </p>
        <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-amber-900">
          {company.loyaltyPointsCurrent.toLocaleString()} pts
        </span>
      </div>
      <p className="mt-3 text-sm text-amber-900">
        <strong>{company.loyaltyPointsToNextTier.toLocaleString()} points</strong> until {company.nextTier} status. Keep
        booking to unlock exclusive corporate rates.
      </p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-amber-200">
        <div className="h-full rounded-full bg-amber-600" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-amber-800">
        <span>{company.loyaltyPointsCurrent.toLocaleString()} pts</span>
        <span>
          {company.nextTier} at {totalNeeded.toLocaleString()} pts
        </span>
      </div>
    </div>
  )
}
