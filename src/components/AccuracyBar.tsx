interface AccuracyBarProps {
  score: number;
  label: string;
  color?: string;
}

export function AccuracyBar({ score, label, color }: AccuracyBarProps) {
  const clampedScore = Math.min(100, Math.max(0, score));

  let barColor = "#ef4444"; // red
  if (clampedScore >= 75) {
    barColor = "#10b981"; // green
  } else if (clampedScore >= 50) {
    barColor = "#f59e0b"; // amber
  }

  if (color) {
    barColor = color;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span>{clampedScore}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clampedScore}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}

