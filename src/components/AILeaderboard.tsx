"use client";

const MODEL_COLORS: Record<string, string> = {
  ChatGPT: "bg-emerald-500",
  Gemini: "bg-blue-500",
  Claude: "bg-violet-500",
  Copilot: "bg-sky-500",
  DeepSeek: "bg-rose-500",
  Grok: "bg-amber-500",
};

const MODEL_DOT_COLORS: Record<string, string> = {
  ChatGPT: "bg-emerald-500",
  Gemini: "bg-blue-500",
  Claude: "bg-violet-500",
  Copilot: "bg-sky-500",
  DeepSeek: "bg-rose-500",
  Grok: "bg-amber-500",
};

interface LeaderboardEntry {
  modelName: string;
  finalScore: number;
  similarityScore: number;
  keyTermScore: number;
  verdict: string;
}

interface AILeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
}

export function AILeaderboard({ entries, title = "AI Model Leaderboard" }: AILeaderboardProps) {
  const sorted = [...entries].sort((a, b) => b.finalScore - a.finalScore);

  if (entries.length === 0) return null;

  const maxScore = Math.max(...sorted.map((e) => e.finalScore), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">
        Models ranked by final score
      </p>
      <div className="mt-5 space-y-3">
        {sorted.map((entry, i) => {
          const barWidth = Math.round((entry.finalScore / maxScore) * 100);
          const dotColor = MODEL_DOT_COLORS[entry.modelName] ?? "bg-slate-400";
          const barColor = MODEL_COLORS[entry.modelName] ?? "bg-slate-400";
          const rank = i + 1;

          let badgeClass = "bg-slate-100 text-slate-600";
          if (rank === 1) badgeClass = "bg-amber-100 text-amber-700";
          else if (rank === 2) badgeClass = "bg-slate-200 text-slate-600";
          else if (rank === 3) badgeClass = "bg-orange-100 text-orange-700";

          return (
            <div key={entry.modelName}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${badgeClass}`}>
                    {rank}
                  </span>
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
                  <span className="truncate text-sm font-medium text-slate-800">
                    {entry.modelName}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-bold text-slate-900">
                  {entry.finalScore}%
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="mt-0.5 flex justify-between text-[10px] text-slate-400">
                <span>Sim: {entry.similarityScore}%</span>
                <span>KT: {entry.keyTermScore}%</span>
                <span>{entry.verdict}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ModelColorKeyProps {
  models: string[];
}

export function ModelColorKey({ models }: ModelColorKeyProps) {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
      {models.map((m) => (
        <div key={m} className="flex items-center gap-1.5">
          <div className={`h-2.5 w-2.5 rounded-full ${MODEL_DOT_COLORS[m] ?? "bg-slate-400"}`} />
          <span>{m}</span>
        </div>
      ))}
    </div>
  );
}
