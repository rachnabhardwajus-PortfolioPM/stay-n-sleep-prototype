import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../state/BookingContext'
import { Button } from '../components/ui/Button'

export function LoginPage() {
  const { login } = useBooking()
  const navigate = useNavigate()
  const [email, setEmail] = useState('derek.morris@apextech.com')
  const [password, setPassword] = useState('••••••••')

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault()
    login()
    navigate('/dashboard')
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span aria-hidden>🏠</span> Stay-N-Sleep
        </div>

        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Corporate travel,
            <br />
            <span className="text-blue-400">simplified.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-slate-300">
            Book and manage accommodations for your entire team with corporate rates, Gold loyalty rewards, and full spend
            visibility.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ['23%', 'Avg. cost savings'],
              ['12,400+', 'Corporate properties'],
              ['3,800+', 'Companies served'],
            ].map(([stat, label]) => (
              <div key={label} className="rounded-xl bg-white/5 p-4">
                <p className="text-2xl font-bold">{stat}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-500">© 2024 Stay-N-Sleep, Inc. · Privacy Policy · Terms of Service</p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900">Sign in</h2>
          <p className="mt-1 text-slate-500">Access your corporate travel portal</p>

          <Button onClick={() => handleLogin()} className="mt-8 w-full py-4 text-base">
            🔒 Continue with Company SSO
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs font-medium text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or sign in with email
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Password</label>
                <span className="text-xs font-medium text-blue-600">Forgot password?</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />
            </div>
            <Button type="submit" variant="dark" className="w-full py-4 text-base">
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Protected by enterprise SSO · SOC 2 Type II certified
            <br />
            Your identity provider manages access
          </p>
        </div>
      </div>
    </div>
  )
}
