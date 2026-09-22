import { useNavigate } from 'react-router-dom'
import { useBooking } from '../state/BookingContext'
import { TopNav } from '../components/layout/TopNav'
import { StatCard } from '../components/ui/StatCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { TripCard } from '../components/dashboard/TripCard'
import { ProgressCard } from '../components/dashboard/ProgressCard'
import { formatCurrency } from '../utils/format'

const QUICK_ACTIONS: { icon: string; label: string; primary?: boolean; to?: string }[] = [
  { icon: '+', label: 'Create Group Booking', primary: true, to: '/booking/trip-details' },
  { icon: '📋', label: 'View All Bookings' },
  { icon: '★', label: 'Loyalty Dashboard' },
  { icon: '👥', label: 'Manage Team' },
  { icon: '📊', label: 'Spend Reports' },
]

export function DashboardPage() {
  const { company, user, trips, resetWizard } = useBooking()
  const navigate = useNavigate()

  const startBooking = () => {
    resetWizard()
    navigate('/booking/trip-details')
  }

  const upcoming = trips.filter((t) => t.status === 'Upcoming')
  const completed = trips.filter((t) => t.status === 'Completed')

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Good morning, {user.name.split(' ')[0]}.</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600">
              {company.name} <Badge variant="gold">★ {company.tier} Status</Badge> · {user.role}
            </p>
          </div>
          <Button onClick={startBooking} className="px-6 py-3">
            + Create Group Booking
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="YTD Booking Spend"
            value={formatCurrency(company.ytdSpend)}
            caption={`↑ ${company.ytdSpendChangePct}% vs last year`}
          />
          <StatCard
            label="Total Loyalty Savings"
            value={formatCurrency(company.totalLoyaltySavings)}
            caption={`↓ ${company.avgSavingsPct}% avg off standard`}
          />
          <StatCard label="Active Bookings" value={String(company.activeBookingsCount)} caption="See upcoming trips below" />
          <StatCard
            label="Team Members"
            value={String(company.teamMembersCount)}
            caption={`${company.pendingInvites} pending invite${company.pendingInvites === 1 ? '' : 's'}`}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Trips</h2>
            </div>
            <Card className="mt-3 overflow-hidden">
              {[...upcoming, ...completed].length === 0 ? (
                <p className="p-6 text-sm text-slate-500">No trips yet. Create a group booking to get started.</p>
              ) : (
                [...upcoming, ...completed].map((trip) => <TripCard key={trip.id} trip={trip} />)
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5">
              <h3 className="font-bold text-slate-900">Quick Actions</h3>
              <div className="mt-3 flex flex-col gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.primary ? 'primary' : 'disabled'}
                    className="justify-start"
                    onClick={action.to ? startBooking : undefined}
                    disabled={!action.to}
                    title={action.to ? undefined : 'Not functional in this prototype'}
                  >
                    <span aria-hidden>{action.icon}</span> {action.label}
                  </Button>
                ))}
              </div>
            </Card>

            <ProgressCard company={company} />
          </div>
        </div>
      </main>
    </div>
  )
}
