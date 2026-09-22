import { Link } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'

export function TopNav() {
  const { user, company } = useBooking()

  return (
    <header className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center gap-2 text-lg font-bold">
            <span aria-hidden>🏠</span> Stay-N-Sleep
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-slate-300 sm:flex">
            <Link to="/dashboard" className="text-white">
              Trips
            </Link>
            <span className="cursor-default">Reporting</span>
            <span className="cursor-default">Settings</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span aria-hidden className="text-lg">
            🔔
          </span>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
              {user.initials}
            </span>
            <div className="hidden text-left text-sm sm:block">
              <p className="font-semibold leading-tight">{user.name}</p>
              <p className="text-xs font-medium text-amber-400">★ {company.tier} Status</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
