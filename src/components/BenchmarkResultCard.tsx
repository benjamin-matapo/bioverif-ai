"use client";

import { useEffect, useState } from "react";
import { BenchmarkResult } from "@/lib/benchmarkEvaluation";
import { AccuracyBar } from "@/components/AccuracyBar";

interface BenchmarkResultCardProps {
  result: BenchmarkResult;
}

export default function BenchmarkResultCard({ result }: BenchmarkResultCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getVerdictColor = (verdict: BenchmarkResult["verdict"]) => {
    switch (verdict) {
      case "Excellent":
        return "bg-emerald-100 text-emerald-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Partial":
        return "bg-amber-100 text-amber-700";
      case "Poor":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 55) return "text-blue-600";
    if (score >= 35) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return "bg-emerald-50";
    if (score >= 55) return "bg-blue-50";
    if (score >= 35) return "bg-amber-50";
    return "bg-red-50";
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">{result.modelName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getVerdictColor(
            result.verdict
          )}`}
        >
          {result.verdict}
        </span>
      </div>

      <div className="text-center mb-6">
        <div
          className={`text-4xl font-bold ${getScoreColor(
            result.finalScore
          )} ${getScoreBgColor(result.finalScore)} rounded-lg py-4`}
        >
          {result.finalScore}
        </div>
        <div className="text-sm text-slate-500 mt-2">Final Score</div>
      </div>

      <div className="space-y-4 mb-6">
        <AccuracyBar
          score={result.semanticScore}
          label="Semantic Similarity"
        />
        <AccuracyBar
          score={result.keyTermScore}
          label="Key Term Coverage"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-500 mb-2">Response Preview</div>
        <div className="italic text-slate-600 text-sm bg-slate-50 rounded-lg p-3">
          {result.responsePreview}
        </div>
      </div>

      {result.missingConcepts.length > 0 && (
        <div>
          <div className="text-sm text-red-600 font-medium mb-2">
            Missing Key Terms
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingConcepts.map((concept, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-600 border border-red-200 rounded-full px-2 py-0.5 text-xs"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
