import type { ReactNode } from 'react'

type BadgeVariant = 'gold' | 'success' | 'neutral' | 'info'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  gold: 'bg-amber-100 text-amber-800',
  success: 'bg-green-100 text-green-700',
  neutral: 'bg-slate-100 text-slate-700',
  info: 'bg-blue-100 text-blue-700',
}

export function Badge({ children, variant = 'neutral' }: { children: ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${VARIANT_CLASSES[variant]}`}>
      {children}
    </span>
  )
}
