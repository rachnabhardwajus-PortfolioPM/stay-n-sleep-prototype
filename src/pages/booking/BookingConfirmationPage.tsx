import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import { formatCurrency, formatDate } from '../../utils/format'
import { TopNav } from '../../components/layout/TopNav'
import { Button } from '../../components/ui/Button'

export function BookingConfirmationPage() {
  const { trips, resetWizard } = useBooking()
  const navigate = useNavigate()
  const confirmedTrip = trips[0]
  const hasReset = useRef(false)

  useEffect(() => {
    if (!confirmedTrip) {
      navigate('/dashboard')
      return
    }
    if (!hasReset.current) {
      hasReset.current = true
      resetWizard()
    }
  }, [confirmedTrip, navigate, resetWizard])

  if (!confirmedTrip) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Booking Confirmed!</h1>
          <p className="mt-1 text-slate-500">Your group booking has been confirmed and all travelers have been notified.</p>

          <div className="mx-auto mt-5 inline-block rounded-lg bg-slate-100 px-4 py-2 font-mono text-sm text-slate-700">
            Ref: {confirmedTrip.confirmationNumber}
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 p-4 text-left">
            <div className="flex items-center gap-3">
              <img src={confirmedTrip.property.imageUrl} alt={confirmedTrip.property.name} className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <p className="font-bold text-slate-900">{confirmedTrip.property.name}</p>
                <p className="text-sm text-slate-500">{confirmedTrip.property.location}</p>
                <p className="text-sm text-slate-500">
                  {formatDate(confirmedTrip.checkIn)} – {formatDate(confirmedTrip.checkOut)} · {confirmedTrip.rooms} rooms ·{' '}
                  {confirmedTrip.nights} nights
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Total Charged</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(confirmedTrip.totalCharged)}</p>
                <p className="text-sm font-semibold text-green-600">Saved {formatCurrency(confirmedTrip.loyaltySavings)} with Gold status</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Confirmations Sent</p>
                <p className="text-lg font-bold text-slate-900">
                  {confirmedTrip.travelers.length} employee{confirmedTrip.travelers.length === 1 ? '' : 's'}
                </p>
                <p className="text-sm text-slate-400">via work email</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Travelers Notified</p>
            <div className="mt-2 space-y-1">
              {confirmedTrip.travelers.map((t) => (
                <p key={t.id} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-green-600">✓</span> {t.fullName} · {t.workEmail}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button onClick={() => navigate('/dashboard')} className="w-full py-4 text-base">
              View Trip in Dashboard
            </Button>
            <Button
              variant="secondary"
              className="w-full py-4 text-base"
              onClick={() => {
                resetWizard()
                navigate('/booking/trip-details')
              }}
            >
              Create Another Booking
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
