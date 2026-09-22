import { Navigate, Route, Routes } from 'react-router-dom'
import { BookingProvider, useBooking } from './state/BookingContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { TripDetailsPage } from './pages/booking/TripDetailsPage'
import { AddEmployeesPage } from './pages/booking/AddEmployeesPage'
import { SearchAccommodationsPage } from './pages/booking/SearchAccommodationsPage'
import { PropertyDetailsPage } from './pages/booking/PropertyDetailsPage'
import { BookingReviewPage } from './pages/booking/BookingReviewPage'
import { BookingConfirmationPage } from './pages/booking/BookingConfirmationPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loggedIn } = useBooking()
  if (!loggedIn) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/trip-details"
        element={
          <RequireAuth>
            <TripDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/employees"
        element={
          <RequireAuth>
            <AddEmployeesPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/search"
        element={
          <RequireAuth>
            <SearchAccommodationsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/property/:propertyId"
        element={
          <RequireAuth>
            <PropertyDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/review"
        element={
          <RequireAuth>
            <BookingReviewPage />
          </RequireAuth>
        }
      />
      <Route
        path="/booking/confirmation"
        element={
          <RequireAuth>
            <BookingConfirmationPage />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BookingProvider>
      <AppRoutes />
    </BookingProvider>
  )
}

export default App
