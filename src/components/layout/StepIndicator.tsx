interface StepIndicatorProps {
  steps: string[]
  currentStep: number // 0-indexed
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((step, i) => {
        const isComplete = i < currentStep
        const isCurrent = i === currentStep
        return (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  isComplete
                    ? 'bg-blue-600 text-white'
                    : isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isComplete ? '✓' : i + 1}
              </span>
              <span className={`text-sm font-semibold ${isCurrent || isComplete ? 'text-slate-900' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && <span className="h-px w-10 bg-slate-300" />}
          </div>
        )
      })}
    </div>
  )
}
