import { Card } from './Card'

export function StatCard({ label, value, caption }: { label: string; value: string; caption?: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {caption && <p className="mt-1 text-sm text-slate-500">{caption}</p>}
    </Card>
  )
}
