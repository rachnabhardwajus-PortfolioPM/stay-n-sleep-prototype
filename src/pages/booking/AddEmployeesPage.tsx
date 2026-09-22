import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../state/BookingContext'
import type { Employee } from '../../types'
import { TopNav } from '../../components/layout/TopNav'
import { StepIndicator } from '../../components/layout/StepIndicator'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { EmployeeFormRow } from '../../components/booking/EmployeeFormRow'

const STEPS = ['Trip Details', 'Add Employees', 'Review Booking']

function emptyEmployee(): Employee {
  return { id: `emp-${Math.random().toString(36).slice(2, 9)}`, fullName: '', workEmail: '' }
}

export function AddEmployeesPage() {
  const { wizard, setEmployees } = useBooking()
  const navigate = useNavigate()

  const [employees, setLocalEmployees] = useState<Employee[]>(
    wizard.employees.length > 0 ? wizard.employees : [emptyEmployee()],
  )

  useEffect(() => {
    if (!wizard.tripDetails) navigate('/booking/trip-details')
  }, [wizard.tripDetails, navigate])

  if (!wizard.tripDetails) return null

  const updateEmployee = (id: string, field: 'fullName' | 'workEmail', value: string) => {
    setLocalEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const removeEmployee = (id: string) => {
    setLocalEmployees((prev) => prev.filter((e) => e.id !== id))
  }

  const canContinue = employees.length > 0 && employees.every((e) => e.fullName.trim() && e.workEmail.trim())

  const handleContinue = () => {
    setEmployees(employees)
    navigate('/booking/search')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <StepIndicator steps={STEPS} currentStep={1} />

        <Card className="mt-8 p-8">
          <h1 className="text-2xl font-bold text-slate-900">Who's traveling?</h1>
          <p className="mt-1 text-slate-500">Enter employee details for each room. Confirmation emails will be sent automatically.</p>

          <div className="mt-8 space-y-4">
            {employees.map((emp, i) => (
              <EmployeeFormRow
                key={emp.id}
                index={i}
                fullName={emp.fullName}
                workEmail={emp.workEmail}
                onChange={(field, value) => updateEmployee(emp.id, field, value)}
                onRemove={employees.length > 1 ? () => removeEmployee(emp.id) : undefined}
              />
            ))}

            <button
              onClick={() => setLocalEmployees((prev) => [...prev, emptyEmployee()])}
              className="w-full rounded-lg border-2 border-dashed border-slate-300 py-4 text-sm font-semibold text-slate-500 hover:border-slate-400 hover:text-slate-700"
            >
              + Add Another Employee
            </button>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={() => navigate('/booking/trip-details')}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back
            </button>
            <Button onClick={handleContinue} disabled={!canContinue}>
              Find Accommodations →
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
