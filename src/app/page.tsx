"use client";

import { useMemo, useState } from "react";
import {
  BeakerIcon,
  BrainIcon,
  DnaIcon,
  FlaskConicalIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { BIOMED_QUESTIONS } from "@/lib/biomed-data";
import type { BenchmarkResult } from "@/types/benchmark";
import { BenchmarkCard } from "@/components/BenchmarkCard";

type ApiErrorResponse = { error: string };

async function runBenchmark(questionId: string): Promise<BenchmarkResult> {
  const res = await fetch("/api/benchmark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId }),
  });

  const data = (await res.json()) as BenchmarkResult | ApiErrorResponse;

  if (!res.ok) {
    const message =
      "error" in data && typeof data.error === "string"
        ? data.error
        : "Failed to run benchmark. Please try again.";
    throw new Error(message);
  }

  return data as BenchmarkResult;
}

export default function Home() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (results.length === 0) {
      return {
        averageSimilarity: 0,
        averageKeyTerms: 0,
        testsRun: 0,
      };
    }

    const totalSimilarity = results.reduce(
      (acc, r) => acc + r.similarityScore,
      0,
    );
    const totalKeyTerms = results.reduce((acc, r) => acc + r.keyTermScore, 0);

    return {
      averageSimilarity: Math.round(totalSimilarity / results.length),
      averageKeyTerms: Math.round(totalKeyTerms / results.length),
      testsRun: results.length,
    };
  }, [results]);

  const handleRunSelected = async () => {
    if (!selectedQuestionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await runBenchmark(selectedQuestionId);
      setResults((prev) => {
        const filtered = prev.filter(
          (r) => r.questionId !== result.questionId,
        );
        return [result, ...filtered];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allIds = BIOMED_QUESTIONS.map((q) => q.id);

      for (const id of allIds) {
        // Run sequentially with a short delay to avoid rate limiting.
        // eslint-disable-next-line no-await-in-loop
        const result = await runBenchmark(id);
        setResults((prev) => {
          const filtered = prev.filter(
            (existing) => existing.questionId !== result.questionId,
          );
          return [...filtered, result];
        });
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJson = () => {
    if (results.length === 0) return;

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.href = url;
    link.download = `bioverif-benchmark-results-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-[#002244] text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-2 ring-emerald-400/70">
              <FlaskConicalIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  BioVerif-AI
                </h1>
                <ShieldCheckIcon className="h-5 w-5 text-emerald-300" />
              </div>
              <p className="mt-1 text-xs text-slate-200">
                Benchmarking Gemini 1.5 Flash Against Expert Biomedical
                Knowledge
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200 sm:text-right">
            <BrainIcon className="hidden h-4 w-4 text-emerald-300 sm:block" />
            <div>
              <p className="font-medium">
                Newcastle University | Biomedical AI Research
              </p>
              <p className="text-[11px] text-slate-300">
                Experimental benchmarking dashboard - not for clinical use
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Error banner */}
        {error && (
          <div className="mx-auto flex w-full max-w-3xl items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
            <div className="flex-1">
              <p className="font-semibold">Benchmark Error</p>
              <p className="mt-0.5">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-2 text-xs font-medium text-red-700 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Control panel */}
        <section className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Select Benchmark Test
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Choose a biomedical domain and run Gemini against expert
                ground-truth explanations.
              </p>
            </div>
            <DnaIcon className="hidden h-8 w-8 text-emerald-500 sm:block" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Benchmark Scenario
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {BIOMED_QUESTIONS.map((q) => {
                  const isSelected = q.id === selectedQuestionId;
                  const baseClasses =
                    "flex h-full flex-col items-start justify-start rounded-xl border p-4 text-left text-sm transition-all duration-150 cursor-pointer";
                  const selectedClasses =
                    "border-2 border-[#002244] bg-blue-50 ring-2 ring-[#002244]";
                  const unselectedClasses =
                    "border-slate-200 bg-white hover:shadow-md";

                  let difficultyColor =
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold";
                  if (q.difficulty === "Undergraduate") {
                    difficultyColor +=
                      " bg-blue-50 text-blue-700 border border-blue-200";
                  } else if (q.difficulty === "Postgraduate") {
                    difficultyColor +=
                      " bg-amber-50 text-amber-800 border border-amber-200";
                  } else {
                    difficultyColor +=
                      " bg-rose-50 text-rose-800 border border-rose-200";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`${baseClasses} ${
                        isSelected ? selectedClasses : unselectedClasses
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002244]">
                        {q.category}
                      </span>
                      <span className={`mt-2 ${difficultyColor}`}>
                        {q.difficulty}
                      </span>
                      <p className="mt-2 text-sm text-slate-700">
                        {q.question}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRunAll}
                disabled={isLoading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#002244] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#022e5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-500"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <BeakerIcon className="h-4 w-4" />
                    <span>Run All Benchmarks</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleRunSelected}
                disabled={isLoading || !selectedQuestionId}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#002244] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#022e5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-500"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                    <span>Running...</span>
                  </>
                ) : (
                  <span>Run Selected</span>
                )}
              </button>
            </div>

            {isLoading && (
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                <div className="flex h-4 w-10 items-center justify-between">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 [animation-delay:300ms]" />
                </div>
                <p className="font-medium">
                  Querying Gemini... Please wait. Each benchmark may take a few
                  seconds.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="mb-6 space-y-4">
          {results.length === 0 ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner">
                <DnaIcon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                Select a scenario and run a benchmark to see results
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Select a biomedical scenario and compare Gemini&apos;s answer
                against expert ground-truth explanations with similarity and
                key-term coverage metrics.
              </p>
            </div>
          ) : (
            <>
              {/* Summary stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Average Similarity
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.averageSimilarity}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Aggregated string similarity across all tests.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Avg Key Term Coverage
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.averageKeyTerms}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Percentage of expert key terms mentioned by Gemini.
                  </p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-md">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Tests Run
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {summary.testsRun}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Across molecular biology, biochemistry, genomics,
                      neuroscience, and immunology.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-[#002244] hover:bg-white hover:text-[#002244]"
                  >
                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                    <span>Export Results as JSON</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {results.map((result) => (
                  <BenchmarkCard key={result.questionId} result={result} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built with Next.js &amp; Google Gemini | Academic Research Tool | Not for Clinical Use
          </p>
          <p className="text-[11px]">
            Outputs are for educational and research purposes only and must not
            be used to make clinical, diagnostic, or treatment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}

