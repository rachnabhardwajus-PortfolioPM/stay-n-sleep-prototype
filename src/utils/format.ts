export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function formatDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const inDate = new Date(checkIn + 'T00:00:00')
  const outDate = new Date(checkOut + 'T00:00:00')
  const ms = outDate.getTime() - inDate.getTime()
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)))
}
