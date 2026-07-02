interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-xl">
      <div
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-slate-500">
        <span>
          Pregunta {currentStep} de {totalSteps}
        </span>
        <span>{progressPercentage}%</span>
      </div>
    </div>
  );
}