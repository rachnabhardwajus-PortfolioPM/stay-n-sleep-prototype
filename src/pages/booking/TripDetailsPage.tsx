import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import { TopNav } from '../../components/layout/TopNav'
import { StepIndicator } from '../../components/layout/StepIndicator'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const STEPS = ['Trip Details', 'Add Employees', 'Review Booking']

export function TripDetailsPage() {
  const { wizard, setTripDetails } = useBooking()
  const navigate = useNavigate()

  const [destination, setDestination] = useState(wizard.tripDetails?.destination ?? '')
  const [checkIn, setCheckIn] = useState(wizard.tripDetails?.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(wizard.tripDetails?.checkOut ?? '')
  const [rooms, setRooms] = useState(wizard.tripDetails?.rooms ?? 1)

  const canContinue = destination.trim() !== '' && checkIn !== '' && checkOut !== '' && checkOut > checkIn

  const handleContinue = () => {
    setTripDetails({ destination, checkIn, checkOut, rooms })
    navigate('/booking/employees')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <StepIndicator steps={STEPS} currentStep={0} />

        <Card className="mt-8 p-8">
          <h1 className="text-2xl font-bold text-slate-900">Where are you traveling?</h1>
          <p className="mt-1 text-slate-500">Enter trip details to begin your group booking</p>

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Austin, TX"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Number of Rooms</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                  <button
                    onClick={() => setRooms((r) => Math.max(1, r - 1))}
                    className="px-4 py-2 text-lg text-slate-500 hover:bg-slate-50"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-lg font-bold text-slate-900">{rooms}</span>
                  <button onClick={() => setRooms((r) => r + 1)} className="px-4 py-2 text-lg text-slate-500 hover:bg-slate-50">
                    +
                  </button>
                </div>
                <div>
                  <p className="font-medium text-slate-800">
                    {rooms} room{rooms > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-slate-400">1 employee per room</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button onClick={() => navigate('/dashboard')} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
              ← Back to Dashboard
            </button>
            <Button onClick={handleContinue} disabled={!canContinue}>
              Continue →
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
