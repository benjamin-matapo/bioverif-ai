"use client";

import { List, ExternalLink, BarChart3, Check } from "lucide-react";
import { BIOMED_QUESTIONS } from "@/lib/biomed-data";

const AI_PILLS = ["ChatGPT", "Claude", "Gemini", "Grok", "Copilot"] as const;

interface EvaluatorPanelProps {
  selectedId: string | null;
  onSelectQuestion: (id: string) => void;
  pastedResponse: string;
  onPasteResponse: (value: string) => void;
  aiName: string;
  onAiNameChange: (value: string) => void;
  selectedAiPill: string | null;
  onSelectPill: (pill: string | null) => void;
  loading: boolean;
  onEvaluate: () => void;
  copySuccess: boolean;
  onCopyQuestion: () => void;
  inputPanelRef: React.RefObject<HTMLDivElement | null>;
}

export function EvaluatorPanel({
  selectedId,
  onSelectQuestion,
  pastedResponse,
  onPasteResponse,
  aiName,
  onAiNameChange,
  selectedAiPill,
  onSelectPill,
  loading,
  onEvaluate,
  copySuccess,
  onCopyQuestion,
  inputPanelRef,
}: EvaluatorPanelProps) {
  const selectedQuestion = selectedId
    ? BIOMED_QUESTIONS.find((q) => q.id === selectedId)
    : null;

  const canEvaluate =
    selectedId &&
    aiName.trim() &&
    pastedResponse.trim().length >= 50;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#002244]">
          Step 1: Choose a Question
        </h2>
        <p className="text-sm font-semibold text-[#002244]">
          Choose a Scenario
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
          {BIOMED_QUESTIONS.map((q) => {
            const isSelected = q.id === selectedId;
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
                onClick={() => onSelectQuestion(q.id)}
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
        {selectedQuestion && (
          <button
            type="button"
            onClick={onCopyQuestion}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#002244] bg-white py-2.5 text-sm font-medium text-[#002244] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
          >
            {copySuccess ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              "Copy Question"
            )}
          </button>
        )}
      </div>

      <div ref={inputPanelRef} className="space-y-4">
        <h2 className="text-lg font-bold text-[#002244]">
          Step 2 and 3: Paste Response and Evaluate
        </h2>
        <p className="text-sm font-semibold text-[#002244]">
          Paste AI Response
        </p>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Which AI did you use?
          </label>
          <div className="mb-2 flex flex-wrap gap-2">
            {AI_PILLS.map((pill) => {
              const selected = selectedAiPill === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => {
                    onSelectPill(selected ? null : pill);
                    onAiNameChange(selected ? "" : pill);
                  }}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2 ${
                    selected
                      ? "bg-[#002244] text-white"
                      : "border border-slate-300 text-slate-600 hover:border-[#002244]"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={aiName}
            onChange={(e) => {
              onAiNameChange(e.target.value);
              onSelectPill(null);
            }}
            placeholder="Or type a custom name..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#002244] focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-0"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            AI Response
          </label>
          <textarea
            value={pastedResponse}
            onChange={(e) => onPasteResponse(e.target.value)}
            placeholder="Paste the AI's response here..."
            rows={10}
            className={`min-h-48 w-full resize-y rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-0 ${
              pastedResponse.length > 100
                ? "border-green-500"
                : "border-slate-300"
            }`}
          />
          <p className="mt-1 text-right text-xs text-slate-500">
            {pastedResponse.length} characters
          </p>
        </div>

        <button
          type="button"
          onClick={onEvaluate}
          disabled={!canEvaluate || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002244] py-3 text-sm font-semibold text-white hover:bg-[#003366] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-offset-2"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Evaluating...
            </>
          ) : (
            "Evaluate Response"
          )}
        </button>
      </div>
    </div>
  );
}

export function HeroSteps() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 pt-12 pb-8 sm:grid-cols-3">
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center text-sm shadow-sm">
        <List className="mx-auto mb-1 h-5 w-5 text-[#002244]" />
        <span className="font-medium text-slate-700">Step 1: Pick a Question</span>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center text-sm shadow-sm">
        <ExternalLink className="mx-auto mb-1 h-5 w-5 text-[#002244]" />
        <span className="font-medium text-slate-700">Step 2: Ask Any AI</span>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center text-sm shadow-sm">
        <BarChart3 className="mx-auto mb-1 h-5 w-5 text-[#002244]" />
        <span className="font-medium text-slate-700">Step 3: Paste and Score</span>
      </div>
    </div>
  );
}
