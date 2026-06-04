"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Play, RotateCcw, Info, ExternalLink } from "lucide-react";
import { BENCHMARK_DATASET } from "@/lib/dataset";
import { runBenchmark, BenchmarkResult } from "@/lib/benchmarkEvaluation";
import BenchmarkResultCard from "@/components/BenchmarkResultCard";
import { AILeaderboard, ModelColorKey } from "@/components/AILeaderboard";
import { Navbar } from "@/components/Navbar";
import { AI_MODELS } from "@/lib/aiModels";

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

    await new Promise((resolve) => setTimeout(resolve, 800));

    const benchmarkResults: BenchmarkResult[] = [
      runBenchmark("ChatGPT", selectedScenario.modelResponses.chatgpt, selectedScenario.groundTruth, selectedScenario.keyTerms),
      runBenchmark("Gemini", selectedScenario.modelResponses.gemini, selectedScenario.groundTruth, selectedScenario.keyTerms),
      runBenchmark("Claude", selectedScenario.modelResponses.claude, selectedScenario.groundTruth, selectedScenario.keyTerms),
      runBenchmark("Copilot", selectedScenario.modelResponses.copilot, selectedScenario.groundTruth, selectedScenario.keyTerms),
      runBenchmark("DeepSeek", selectedScenario.modelResponses.deepseek, selectedScenario.groundTruth, selectedScenario.keyTerms),
      runBenchmark("Grok", selectedScenario.modelResponses.grok, selectedScenario.groundTruth, selectedScenario.keyTerms),
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

  const lowestScore = results.length > 0
    ? Math.min(...results.map(r => r.finalScore))
    : 0;

  const lowestScoreModel = results.length > 0
    ? results.find(r => r.finalScore === lowestScore)?.modelName
    : "";

  const averageScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.finalScore, 0) / results.length)
    : 0;

  const leaderboardEntries = results.map((r) => ({
    modelName: r.modelName,
    finalScore: r.finalScore,
    similarityScore: r.semanticScore,
    keyTermScore: r.keyTermScore,
    verdict: r.verdict,
  }));

  const modelNames = results.map((r) => r.modelName);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700">
            <Info className="h-4 w-4 shrink-0 text-slate-500" />
            <p className="text-sm font-medium">
              Pre-stored Responses Mode - Results shown are based on pre-collected AI responses evaluated against expert ground truth using TF-IDF semantic similarity scoring. No external APIs are called and all scoring is fully deterministic.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold text-slate-600 underline hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Go to Evaluator
          </Link>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#002244] mb-4">
            Select Benchmark Scenario
          </h2>

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
                {scenario.module ? `[${scenario.module}] ${scenario.topic || scenario.category}` : scenario.category}
              </button>
            ))}
          </div>

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

        {hasRun && results.length > 0 && (
          <section>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
                <AILeaderboard entries={leaderboardEntries} title="Model Rankings" />
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                    Highest Scoring Model
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {highestScore}
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {highestScoreModel}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                    Lowest Scoring Model
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {lowestScore}
                  </div>
                  <div className="text-sm text-slate-600">
                    {lowestScoreModel}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                    Average Score
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {averageScore}
                  </div>
                  <div className="text-sm text-slate-500">
                    Across all models
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <ModelColorKey models={modelNames} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    />
                  </div>
                );
              })}
            </div>

            {hasRun && selectedScenario && (
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#002244] mb-2">Try These Questions Yourself</h3>
                  <p className="text-sm text-slate-600 mb-4">Open any AI model with the selected question pre-loaded</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">
                    Question
                  </div>
                  <p className="text-sm text-slate-700">{selectedScenario.question}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AI_MODELS.map((model) => (
                    <div key={model.id}>
                      <button
                        type="button"
                        onClick={() => window.open(model.promptUrl(selectedScenario.question), '_blank')}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all border-slate-200 bg-white hover:shadow-sm hover:border-slate-400 w-full"
                      >
                        <div className={`h-2 w-2 rounded-full ${model.dotColor}`} />
                        <span className="text-xs">{model.displayName}</span>
                        <ExternalLink size={12} className="ml-auto" />
                      </button>
                      <p className="text-xs text-slate-500 mt-1">
                        {model.supportsPromptUrl ? "Pre-filled" : "Homepage only"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-slate-400 text-center">
              Scores reflect pre-stored responses evaluated against expert ground truth using TF-IDF semantic similarity. Results are fully deterministic and reproducible.
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
