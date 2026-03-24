"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Play, RotateCcw, AlertTriangle } from "lucide-react";
import { BENCHMARK_DATASET } from "@/lib/dataset";
import { runBenchmark, BenchmarkResult } from "@/lib/benchmarkEvaluation";
import BenchmarkResultCard from "@/components/BenchmarkResultCard";
import { Navbar } from "@/components/Navbar";

export default function BenchmarkPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    BENCHMARK_DATASET[0].id
  );
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const selectedScenario = BENCHMARK_DATASET.find(
    (scenario) => scenario.id === selectedScenarioId
  );

  const handleRunBenchmark = async () => {
    if (!selectedScenario) return;

    setIsRunning(true);
    setHasRun(false);
    setResults([]);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const benchmarkResults: BenchmarkResult[] = [
      runBenchmark(
        "ChatGPT",
        selectedScenario.modelResponses.chatgpt,
        selectedScenario.groundTruth,
        selectedScenario.keyTerms
      ),
      runBenchmark(
        "Gemini",
        selectedScenario.modelResponses.gemini,
        selectedScenario.groundTruth,
        selectedScenario.keyTerms
      ),
      runBenchmark(
        "Claude",
        selectedScenario.modelResponses.claude,
        selectedScenario.groundTruth,
        selectedScenario.keyTerms
      ),
    ];

    setResults(benchmarkResults);
    setIsRunning(false);
    setHasRun(true);
  };

  const handleReset = () => {
    setResults([]);
    setHasRun(false);
  };

  const highestScore = results.length > 0 
    ? Math.max(...results.map(r => r.finalScore))
    : 0;

  const highestScoreModel = results.length > 0
    ? results.find(r => r.finalScore === highestScore)?.modelName
    : "";

  const averageScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.finalScore, 0) / results.length)
    : 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      {/* Warning Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Auto-Benchmark Mode - All responses are pre-stored for reproducibility. No AI APIs are called.
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

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* Section 1 - Scenario Selector */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#002244] mb-4">
            Select Benchmark Scenario
          </h2>
          
          {/* Horizontal scrollable row of scenario pills */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
            {BENCHMARK_DATASET.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`rounded-full px-4 py-2 text-sm cursor-pointer transition-all whitespace-nowrap ${
                  selectedScenarioId === scenario.id
                    ? "bg-[#002244] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-[#002244]"
                }`}
              >
                {scenario.category}
              </button>
            ))}
          </div>

          {/* Selected scenario question card */}
          {selectedScenario && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">
                Question
              </div>
              <div className="text-slate-800">
                {selectedScenario.question}
              </div>
            </div>
          )}
        </section>

        {/* Section 2 - Run Controls */}
        <section className="mb-8">
          <button
            onClick={handleRunBenchmark}
            disabled={isRunning}
            className="bg-[#002244] text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#001a33] transition-colors"
          >
            {isRunning ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Benchmark
              </>
            )}
          </button>

          {hasRun && (
            <button
              onClick={handleReset}
              className="ml-3 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </section>

        {/* Section 3 - Results */}
        {hasRun && results.length > 0 && (
          <section>
            {/* Summary row */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                  Highest Score
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {highestScore}
                </div>
                <div className="text-sm text-slate-600">
                  {highestScoreModel}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                  Average Score
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {averageScore}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                  Scenarios Tested
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {results.length}/3
                </div>
              </div>
            </div>

            {/* Results grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {results.map((result, index) => {
                if (!selectedScenario) return null;
                const modelKey = result.modelName.toLowerCase() as keyof typeof selectedScenario.modelResponses;
                return (
                  <div
                    key={result.modelName}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <BenchmarkResultCard 
                      result={result} 
                      groundTruth={selectedScenario.groundTruth}
                      aiResponse={selectedScenario.modelResponses[modelKey]}
                      citation={selectedScenario.citation}
                    />
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-slate-400 text-center">
              Scores reflect pre-stored responses evaluated against expert ground truth. Results are fully deterministic and reproducible.
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
