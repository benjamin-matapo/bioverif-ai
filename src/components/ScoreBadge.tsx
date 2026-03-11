interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "lg";
}

export function ScoreBadge({ score, size = "sm" }: ScoreBadgeProps) {
  const clampedScore = Math.min(100, Math.max(0, score));

  let colorClass = "bg-red-500";
  if (clampedScore >= 75) {
    colorClass = "bg-emerald-500";
  } else if (clampedScore >= 50) {
    colorClass = "bg-amber-500";
  }

  const baseCircleClasses =
    "flex items-center justify-center rounded-full text-white font-semibold";

  const circleClasses =
    size === "lg"
      ? `${baseCircleClasses} h-20 w-20 text-2xl shadow-lg`
      : `${baseCircleClasses} h-10 w-10 text-sm shadow`;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${circleClasses} ${colorClass}`}>
        <span>{clampedScore}%</span>
      </div>
      {size === "lg" && (
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Similarity
        </span>
      )}
    </div>
  );
}

