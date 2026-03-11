"use client";

import type { EvaluationResultPayload } from "./ResultCard";
import { AccuracyBar } from "./AccuracyBar";

interface ComparisonTableProps {
  results: EvaluationResultPayload[];
  question: string;
  onAddAnother?: () => void;
}

const verdictClasses: Record<EvaluationResultPayload["verdict"], string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  Good: "bg-blue-100 text-blue-700",
  Partial: "bg-amber-100 text-amber-700",
  Poor: "bg-red-100 text-red-700",
};

export function ComparisonTable({
  results,
  question,
  onAddAnother,
}: ComparisonTableProps) {
  const displayQuestion =
    question.length > 120 ? question.slice(0, 120) + "..." : question;

  return (
    <div className="space-y-4">
      <h3 className="max-w-3xl border-b-2 border-[#002244] pb-2 text-base font-semibold italic text-slate-700 line-clamp-2">
        {displayQuestion}
      </h3>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="block lg:hidden">
          {results.map((r) => (
            <div
              key={`${r.aiName}-${r.timestamp}`}
              className="border-b border-slate-200 p-4 last:border-b-0"
            >
              <p className="font-semibold text-slate-900">{r.aiName}</p>
              <div className="mt-2">
                <AccuracyBar score={r.similarityScore} label="Similarity" />
              </div>
              <div className="mt-2">
                <AccuracyBar score={r.keyTermScore} label="Key Terms" />
              </div>
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${verdictClasses[r.verdict]}`}
              >
                {r.verdict}
              </span>
              <div className="mt-2 flex flex-wrap gap-1">
                {r.keyTermsMissed.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700"
                  >
                    {t}
                  </span>
                ))}
                {r.keyTermsMissed.length > 3 && (
                  <span className="text-xs text-slate-500">
                    +{r.keyTermsMissed.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <table className="hidden w-full lg:table">
          <thead>
            <tr className="bg-[#002244] text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                AI Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Similarity
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Key Terms
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Verdict
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Top Missing Terms
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={`${r.aiName}-${r.timestamp}`}
                className={
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {r.aiName}
                </td>
                <td className="px-4 py-3">
                  <AccuracyBar score={r.similarityScore} label="" />
                </td>
                <td className="px-4 py-3">
                  <AccuracyBar score={r.keyTermScore} label="" />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${verdictClasses[r.verdict]}`}
                  >
                    {r.verdict}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.keyTermsMissed.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700"
                      >
                        {t}
                      </span>
                    ))}
                    {r.keyTermsMissed.length > 3 && (
                      <span className="text-xs text-slate-500">
                        +{r.keyTermsMissed.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onAddAnother && (
        <button
          type="button"
          onClick={onAddAnother}
          className="rounded-lg border-2 border-[#002244] bg-white px-4 py-2 text-sm font-medium text-[#002244] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
        >
          Add Another AI
        </button>
      )}
    </div>
  );
}
