interface EmployeeFormRowProps {
  index: number
  fullName: string
  workEmail: string
  onChange: (field: 'fullName' | 'workEmail', value: string) => void
  onRemove?: () => void
}

export function EmployeeFormRow({ index, fullName, workEmail, onChange, onRemove }: EmployeeFormRowProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
            {index + 1}
          </span>
          Employee {index + 1}
        </p>
        {onRemove && (
          <button onClick={onRemove} className="text-sm font-medium text-slate-400 hover:text-red-600">
            Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Work Email</label>
          <input
            type="email"
            value={workEmail}
            onChange={(e) => onChange('workEmail', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="jane.doe@company.com"
          />
        </div>
      </div>
    </div>
  )
}
