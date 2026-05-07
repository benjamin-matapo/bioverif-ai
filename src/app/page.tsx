"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EvaluatorPanel, HeroSteps } from "@/components/EvaluatorPanel";
import { ResultCard, type EvaluationResultPayload } from "@/components/ResultCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ScenarioManager } from "@/components/ScenarioManager";
import { BIOMED_QUESTIONS, BiomedQuestion } from "@/lib/biomed-data";
import { loadCustomScenarios } from "@/lib/customScenarios";
import { AI_MODELS } from "@/lib/aiModels";

type ApiError = { error: string };

export default function EvaluatorPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pastedResponse, setPastedResponse] = useState("");
  const [aiName, setAiName] = useState("");
  const [selectedAiPill, setSelectedAiPill] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionResults, setSessionResults] = useState<
    EvaluationResultPayload[]
  >([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const inputPanelRef = useRef<HTMLDivElement | null>(null);
  const [customScenarios, setCustomScenarios] = useState<BiomedQuestion[]>([]);
  const [showScenarioManager, setShowScenarioManager] = useState(false);
  const [runConsistencyCheck, setRunConsistencyCheck] = useState(false);
  const [pedagogicalRating, setPedagogicalRating] = useState<number | null>(null);
  const [clarityRating, setClarityRating] = useState<number | null>(null);
  const [terminologyRating, setTerminologyRating] = useState<number | null>(null);

  useEffect(() => {
    setCustomScenarios(loadCustomScenarios());
  }, []);

  const allScenarios = [...BIOMED_QUESTIONS, ...customScenarios];
  const selectedQuestion = selectedId
    ? allScenarios.find((q) => q.id === selectedId)
    : null;

  const handleCopyQuestion = useCallback(() => {
    if (!selectedQuestion) return;
    navigator.clipboard.writeText(selectedQuestion.question).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [selectedQuestion]);

  const scrollToInput = useCallback(() => {
    inputPanelRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEvaluate = useCallback(async () => {
    if (!selectedId || !aiName.trim() || pastedResponse.trim().length < 50)
      return;
    setLoading(true);
    setError(null);

    try {
      let consistencyScore: number | null = null;

      if (runConsistencyCheck) {
        const responses: string[] = [];
        for (let i = 0; i < 3; i++) {
          const res = await fetch("/api/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questionId: selectedId,
              aiResponse: pastedResponse.trim(),
              aiName: aiName.trim(),
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError("error" in data ? data.error : "Evaluation failed.");
            setLoading(false);
            return;
          }
          responses.push(data.aiResponse);
        }

        const bigramSimilarity = (s1: string, s2: string): number => {
          const getBigrams = (str: string) => {
            const bigrams = new Set<string>();
            for (let i = 0; i < str.length - 1; i++) {
              bigrams.add(str.slice(i, i + 2).toLowerCase());
            }
            return bigrams;
          };
          const bigrams1 = getBigrams(s1);
          const bigrams2 = getBigrams(s2);
          const intersection = new Set([...bigrams1].filter((x) => bigrams2.has(x)));
          const union = new Set([...bigrams1, ...bigrams2]);
          return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
        };

        const sim12 = bigramSimilarity(responses[0], responses[1]);
        const sim13 = bigramSimilarity(responses[0], responses[2]);
        const sim23 = bigramSimilarity(responses[1], responses[2]);
        consistencyScore = Math.round((sim12 + sim13 + sim23) / 3);
      }

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: selectedId,
          aiResponse: pastedResponse.trim(),
          aiName: aiName.trim(),
          pedagogicalRating,
          clarityRating,
          terminologyRating,
          consistencyScore,
        }),
      });
      const data = (await res.json()) as EvaluationResultPayload | ApiError;
      if (!res.ok) {
        setError("error" in data ? data.error : "Evaluation failed.");
        return;
      }
      setSessionResults((prev) => [...prev, data as EvaluationResultPayload]);
      setPastedResponse("");
      setPedagogicalRating(null);
      setClarityRating(null);
      setTerminologyRating(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [selectedId, aiName, pastedResponse, runConsistencyCheck, pedagogicalRating, clarityRating, terminologyRating]);

  const resultsForQuestion = selectedId
    ? sessionResults.filter((r) => r.questionId === selectedId)
    : [];

  const handleScenariosChange = (scenarios: BiomedQuestion[]) => {
    setCustomScenarios(scenarios);
  };

  const leaderboard = [...sessionResults].sort(
    (a, b) =>
      (b.similarityScore + b.keyTermScore) / 2 -
      (a.similarityScore + a.keyTermScore) / 2,
  );

  const handleExportSession = useCallback(() => {
    if (sessionResults.length === 0) return;
    const blob = new Blob([JSON.stringify(sessionResults, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bioverif-results-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sessionResults]);

  const handleClearSession = useCallback(() => {
    setSessionResults([]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Test Any AI on Biomedical Knowledge
          </h1>
          <p className="mt-3 text-slate-600">
            Pick a question, ask any AI, paste the response. We score it against
            expert ground truth.
          </p>
          <HeroSteps />
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <EvaluatorPanel
            selectedId={selectedId}
            onSelectQuestion={setSelectedId}
            pastedResponse={pastedResponse}
            onPasteResponse={setPastedResponse}
            aiName={aiName}
            onAiNameChange={setAiName}
            selectedAiPill={selectedAiPill}
            onSelectPill={setSelectedAiPill}
            loading={loading}
            onEvaluate={handleEvaluate}
            copySuccess={copySuccess}
            onCopyQuestion={handleCopyQuestion}
            inputPanelRef={inputPanelRef}
            customScenarios={customScenarios}
            onManageScenarios={() => setShowScenarioManager(true)}
            runConsistencyCheck={runConsistencyCheck}
            onConsistencyCheckChange={setRunConsistencyCheck}
            pedagogicalRating={pedagogicalRating}
            onPedagogicalRatingChange={setPedagogicalRating}
            clarityRating={clarityRating}
            onClarityRatingChange={setClarityRating}
            terminologyRating={terminologyRating}
            onTerminologyRatingChange={setTerminologyRating}
          />
        </section>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="flex-1">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {sessionResults.length > 0 && (
          <div className="mt-10 flex flex-col gap-8 xl:flex-row">
            <div className="flex-1">
              <h2 className="border-b-2 border-[#002244] pb-2 text-lg font-bold text-slate-900">
                Evaluation Results
              </h2>

              {resultsForQuestion.length === 1 && (
                <div className="mt-6">
                  <ResultCard result={resultsForQuestion[0]} />
                </div>
              )}

              {resultsForQuestion.length >= 2 && selectedId && (
                <div className="mt-6">
                  <ComparisonTable
                    results={resultsForQuestion}
                    question={
                      allScenarios.find((q) => q.id === selectedId)
                        ?.question ?? ""
                    }
                    onAddAnother={scrollToInput}
                  />
                </div>
              )}

              {!selectedId && (
                <p className="mt-4 text-slate-500">
                  Select a question above to see evaluation results for that
                  question.
                </p>
              )}
              {selectedId && resultsForQuestion.length === 0 && (
                <p className="mt-4 text-slate-500">
                  No evaluations yet for this question. Paste a response and
                  click Evaluate.
                </p>
              )}

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleExportSession}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
                >
                  Export Session Results
                </button>
              </div>
            </div>

            <aside className="xl:w-80 xl:shrink-0">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">
                  Session Leaderboard
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Scores across all evaluations this session
                </p>
                <ol className="mt-4 space-y-2">
                  {leaderboard.map((r, i) => {
                    const combined = Math.round(
                      (r.similarityScore + r.keyTermScore) / 2,
                    );
                    const badgeClass =
                      combined >= 75
                        ? "bg-emerald-100 text-emerald-700"
                        : combined >= 55
                          ? "bg-blue-100 text-blue-700"
                          : combined >= 35
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700";
                    return (
                      <li
                        key={`${r.aiName}-${r.questionId}-${r.timestamp}`}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className="font-medium text-slate-700">
                          {i + 1}. {r.aiName}
                        </span>
                        <span className="text-xs text-slate-500">
                          {r.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}
                        >
                          {combined}%
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <button
                  type="button"
                  onClick={handleClearSession}
                  className="mt-4 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
                >
                  Clear Session
                </button>
              </div>
            </aside>
          </div>
        )}

        <ScenarioManager
          isOpen={showScenarioManager}
          onClose={() => setShowScenarioManager(false)}
          onScenariosChange={handleScenariosChange}
          customScenarios={customScenarios}
        />
      </main>
    </div>
  );
}
