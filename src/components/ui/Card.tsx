import type { HTMLAttributes, ReactNode } from 'react'

export function Card({ children, className = '', ...rest }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...rest}>
      {children}
    </div>
  )
}
