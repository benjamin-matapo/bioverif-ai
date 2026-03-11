"use client";

import { useEffect, useState } from "react";
import { AccuracyBar } from "./AccuracyBar";
import { ScoreBadge } from "./ScoreBadge";

export interface EvaluationResultPayload {
  questionId: string;
  question: string;
  aiName: string;
  aiResponse: string;
  groundTruth: string;
  similarityScore: number;
  keyTermsFound: string[];
  keyTermsMissed: string[];
  keyTermScore: number;
  verdict: "Excellent" | "Good" | "Partial" | "Poor";
  category: string;
  difficulty: string;
  timestamp: string;
}

interface ResultCardProps {
  result: EvaluationResultPayload;
}

const verdictClasses: Record<EvaluationResultPayload["verdict"], string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  Good: "bg-blue-100 text-blue-700",
  Partial: "bg-amber-100 text-amber-700",
  Poor: "bg-red-100 text-red-700",
};

export function ResultCard({ result }: ResultCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    aiName,
    category,
    difficulty,
    question,
    aiResponse,
    groundTruth,
    similarityScore,
    keyTermsFound,
    keyTermsMissed,
    keyTermScore,
    verdict,
    timestamp,
  } = result;

  const diffClass =
    difficulty === "Undergraduate"
      ? "bg-blue-100 text-blue-700"
      : difficulty === "Postgraduate"
        ? "bg-amber-100 text-amber-700"
        : "bg-rose-100 text-rose-700";

  return (
    <article
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 ease-out ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">{aiName}</h3>
          <span className="rounded-full bg-[#002244] px-3 py-1 text-xs font-medium text-white">
            {category}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${diffClass}`}
          >
            {difficulty}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${verdictClasses[verdict]}`}
          >
            {verdict}
          </span>
        </div>
      </header>

      <div className="mt-4 flex justify-center">
        <ScoreBadge score={similarityScore} size="lg" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            AI Response
          </p>
          <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">
            {aiResponse}
          </p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Expert Ground Truth
          </p>
          <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">
            {groundTruth}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AccuracyBar score={similarityScore} label="Similarity Score" />
        <AccuracyBar score={keyTermScore} label="Key Term Score" />
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Terms Found
        </p>
        <div className="flex flex-wrap gap-2">
          {keyTermsFound.length === 0 ? (
            <span className="text-sm text-slate-500">None</span>
          ) : (
            keyTermsFound.map((term) => (
              <span
                key={term}
                className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"
              >
                {term}
              </span>
            ))
          )}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Terms Missed
        </p>
        <div className="flex flex-wrap gap-2">
          {keyTermsMissed.length === 0 ? (
            <span className="text-sm text-slate-500">None</span>
          ) : (
            keyTermsMissed.map((term) => (
              <span
                key={term}
                className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700"
              >
                {term}
              </span>
            ))
          )}
        </div>
      </div>

      <p className="mt-4 text-right text-xs text-slate-400">
        {new Date(timestamp).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
    </article>
  );
}
