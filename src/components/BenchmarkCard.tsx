import { type BenchmarkResult } from "@/types/benchmark";
import { AccuracyBar } from "./AccuracyBar";
import { ScoreBadge } from "./ScoreBadge";

const difficultyColors: Record<
  BenchmarkResult["difficulty"],
  string
> = {
  Undergraduate: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Postgraduate: "bg-sky-50 text-sky-700 border-sky-200",
  Expert: "bg-purple-50 text-purple-700 border-purple-200",
};

interface BenchmarkCardProps {
  result: BenchmarkResult;
}

export function BenchmarkCard({ result }: BenchmarkCardProps) {
  const {
    category,
    difficulty,
    question,
    geminiAnswer,
    groundTruth,
    similarityScore,
    keyTermsFound,
    keyTermsMissed,
    keyTermScore,
    timestamp,
  } = result;

  const difficultyClass = difficultyColors[difficulty];

  return (
    <article className="group relative transform rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40 group-hover:bg-emerald-100" />

      <div className="flex flex-col gap-4 p-6 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#002244] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {category}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${difficultyClass}`}
            >
              {difficulty}
            </span>
          </div>
          <ScoreBadge score={similarityScore} size="lg" />
        </header>

        <h3 className="text-base font-semibold leading-snug text-slate-900">
          {question}
        </h3>

        {/* Comparison panel */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span role="img" aria-label="robot">
                🤖
              </span>
              Gemini Response
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {geminiAnswer}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-emerald-300 bg-emerald-50/60 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <span role="img" aria-label="books">
                📚
              </span>
              Expert Ground Truth
            </h4>
            <p className="text-sm leading-relaxed text-emerald-900 whitespace-pre-wrap">
              {groundTruth}
            </p>
          </div>
        </section>

        {/* Scores */}
        <section className="grid gap-4 md:grid-cols-2">
          <AccuracyBar
            score={similarityScore}
            label="Similarity Score (string similarity)"
          />
          <AccuracyBar
            score={keyTermScore}
            label="Key Term Coverage"
          />
        </section>

        {/* Key terms */}
        <section className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-800">
              Key Term Analysis
            </h4>
            <p className="text-xs text-slate-500">
              {keyTermsFound.length} of{" "}
              {keyTermsFound.length + keyTermsMissed.length} expert key terms
              mentioned
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {keyTermsFound.map((term) => (
              <span
                key={term}
                className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
              >
                {term}
              </span>
            ))}
            {keyTermsFound.length === 0 && (
              <span className="text-xs text-slate-500">
                No key terms detected in the Gemini answer.
              </span>
            )}
          </div>

          {keyTermsMissed.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keyTermsMissed.map((term) => (
                <span
                  key={term}
                  className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200"
                >
                  {term}
                </span>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>
            Timestamp: {new Date(timestamp).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </footer>
      </div>
    </article>
  );
}

declare global {
  // Tailwind keyframes helper for the fade-in animation
  // This is purely for type safety when using the custom animation string.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface HTMLElementTagNameMap {}
}

