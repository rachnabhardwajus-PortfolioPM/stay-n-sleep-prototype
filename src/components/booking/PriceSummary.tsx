import { formatCurrency } from '../../utils/format'

interface PriceSummaryProps {
  ratePerNight: number
  nights: number
  rooms: number
  standardTotal: number
  corporateTotal: number
  taxesAndFees: number
  savings: number
  total: number
  tier: string
}

export function PriceSummary({ ratePerNight, nights, rooms, standardTotal, corporateTotal, taxesAndFees, savings, total, tier }: PriceSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-slate-600">
        <span>
          {formatCurrency(ratePerNight)} × {nights} nights × {rooms} rooms
        </span>
        <span className="font-medium text-slate-900">{formatCurrency(corporateTotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-slate-400">
        <span>Standard total (before loyalty)</span>
        <span className="line-through">{formatCurrency(standardTotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">Taxes &amp; fees</span>
        <span className="font-medium text-slate-900">{formatCurrency(taxesAndFees)}</span>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-green-700">★ Corporate Loyalty Savings</p>
          <p className="text-xs text-green-600">{tier} status</p>
        </div>
        <span className="text-lg font-bold text-green-700">−{formatCurrency(savings)}</span>
      </div>

      <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-900">
        <span>Total {taxesAndFees > 0 ? '(incl. taxes)' : 'due'}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
