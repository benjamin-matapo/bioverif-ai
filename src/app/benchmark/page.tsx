"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BeakerIcon, FlaskConicalIcon, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BIOMED_QUESTIONS } from "@/lib/biomed-data";
import type { BenchmarkResult } from "@/types/benchmark";
import { BenchmarkCard } from "@/components/BenchmarkCard";

type ApiErrorResponse = { error: string };

async function runBenchmark(
  questionId: string,
): Promise<BenchmarkResult> {
  const res = await fetch("/api/benchmark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export default function BenchmarkPage() {
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
        const result = await runBenchmark(id);
        setResults((prev) => {
          const filtered = prev.filter(
            (existing) => existing.questionId !== result.questionId,
          );
          return [...filtered, result];
        });
        await new Promise((r) => setTimeout(r, 500));
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
    link.href = url;
    link.download = `bioverif-benchmark-results-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Auto-Benchmark Beta - This page calls Gemini directly via API. For
              manual multi-AI comparison, use the Evaluator.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold text-amber-800 underline hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Go to Evaluator
          </Link>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="flex-1">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Select Benchmark Test
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose a biomedical domain and run Gemini against expert
              ground-truth explanations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {BIOMED_QUESTIONS.map((q) => {
                const isSelected = q.id === selectedQuestionId;
                const diffClass =
                  q.difficulty === "Undergraduate"
                    ? "bg-blue-100 text-blue-700"
                    : q.difficulty === "Postgraduate"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700";
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2 ${
                      isSelected
                        ? "border-2 border-[#002244] bg-blue-50 ring-2 ring-[#002244]"
                        : "border-slate-200 bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-[#002244]">
                      {q.category}
                    </span>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${diffClass}`}
                    >
                      {q.difficulty}
                    </span>
                    <p className="mt-2 text-sm text-slate-700">{q.question}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRunAll}
                disabled={isLoading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#002244] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Running...
                  </>
                ) : (
                  <>
                    <BeakerIcon className="h-4 w-4" />
                    Run All Benchmarks
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleRunSelected}
                disabled={isLoading || !selectedQuestionId}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#002244] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Running...
                  </>
                ) : (
                  "Run Selected"
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 space-y-4">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <FlaskConicalIcon className="h-12 w-12 text-slate-400" />
              <p className="mt-4 text-slate-500">
                Select a scenario and run a benchmark to see results
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Average Similarity
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.averageSimilarity}%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Avg Key Term Coverage
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.averageKeyTerms}%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Tests Run
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.testsRun}
                  </p>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="mt-3 w-full rounded-lg border border-slate-300 bg-white py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
                  >
                    Export Results as JSON
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

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        Built with Next.js and Google Gemini | Academic Research Tool | Not for
        Clinical Use
      </footer>
    </div>
  );
}
