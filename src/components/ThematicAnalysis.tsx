"use client";

import { EvaluationResultPayload } from "./ResultCard";

interface ThematicAnalysisProps {
  results: EvaluationResultPayload[];
}

interface ThemeSummary {
  category: string;
  total: number;
  avgScore: number;
  avgSim: number;
  avgKT: number;
  topModel: string;
  topScore: number;
}

export function ThematicAnalysis({ results }: ThematicAnalysisProps) {
  if (results.length === 0) return null;

  const byCategory = new Map<string, EvaluationResultPayload[]>();
  for (const r of results) {
    const cat = r.category || "Uncategorised";
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(r);
  }

  const themes: ThemeSummary[] = [];
  for (const [category, items] of byCategory) {
    const scores = items.map((i) => i.finalScore);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const avgSim = Math.round(
      items.reduce((a, i) => a + i.similarityScore, 0) / items.length,
    );
    const avgKT = Math.round(
      items.reduce((a, i) => a + i.keyTermScore, 0) / items.length,
    );
    const byModel = new Map<string, number[]>();
    for (const i of items) {
      if (!byModel.has(i.aiName)) byModel.set(i.aiName, []);
      byModel.get(i.aiName)!.push(i.finalScore);
    }
    let topModel = "";
    let topScore = 0;
    for (const [model, modelScores] of byModel) {
      const avg = Math.round(
        modelScores.reduce((a, b) => a + b, 0) / modelScores.length,
      );
      if (avg > topScore) {
        topScore = avg;
        topModel = model;
      }
    }
    themes.push({
      category,
      total: items.length,
      avgScore,
      avgSim,
      avgKT,
      topModel,
      topScore,
    });
  }

  themes.sort((a, b) => b.avgScore - a.avgScore);

  const totalResults = results.length;
  const overallAvg = Math.round(
    results.reduce((a, r) => a + r.finalScore, 0) / totalResults,
  );

  const verdictCounts = { Excellent: 0, Good: 0, Partial: 0, Poor: 0 };
  for (const r of results) {
    verdictCounts[r.verdict]++;
  }

  return (
    <div className="space-y-6">
      <h3 className="border-b-2 border-[#002244] pb-2 text-base font-bold text-slate-900">
        Thematic Analysis
      </h3>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Evaluations
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">{totalResults}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Average Score
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">{overallAvg}%</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Categories
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">{themes.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Top Category
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900 truncate">
            {themes[0]?.category ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Verdict Distribution */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Verdict Distribution
        </p>
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
          {verdictCounts.Excellent > 0 && (
            <div
              className="bg-emerald-500 transition-all"
              style={{
                width: `${(verdictCounts.Excellent / totalResults) * 100}%`,
              }}
              title={`Excellent: ${verdictCounts.Excellent}`}
            />
          )}
          {verdictCounts.Good > 0 && (
            <div
              className="bg-blue-500 transition-all"
              style={{
                width: `${(verdictCounts.Good / totalResults) * 100}%`,
              }}
              title={`Good: ${verdictCounts.Good}`}
            />
          )}
          {verdictCounts.Partial > 0 && (
            <div
              className="bg-amber-500 transition-all"
              style={{
                width: `${(verdictCounts.Partial / totalResults) * 100}%`,
              }}
              title={`Partial: ${verdictCounts.Partial}`}
            />
          )}
          {verdictCounts.Poor > 0 && (
            <div
              className="bg-red-500 transition-all"
              style={{
                width: `${(verdictCounts.Poor / totalResults) * 100}%`,
              }}
              title={`Poor: ${verdictCounts.Poor}`}
            />
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Excellent{" "}
            {verdictCounts.Excellent}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Good{" "}
            {verdictCounts.Good}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Partial{" "}
            {verdictCounts.Partial}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Poor{" "}
            {verdictCounts.Poor}
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#002244] text-white">
              <th className="px-3 py-2.5 text-left text-xs font-semibold">
                Category
              </th>
              <th className="px-3 py-2.5 text-center text-xs font-semibold">
                N
              </th>
              <th className="px-3 py-2.5 text-center text-xs font-semibold">
                Avg Score
              </th>
              <th className="px-3 py-2.5 text-center text-xs font-semibold">
                Avg Sim
              </th>
              <th className="px-3 py-2.5 text-center text-xs font-semibold">
                Avg KT
              </th>
              <th className="px-3 py-2.5 text-center text-xs font-semibold">
                Top Model
              </th>
            </tr>
          </thead>
          <tbody>
            {themes.map((t, i) => {
              const barColor =
                t.avgScore >= 75
                  ? "bg-emerald-500"
                  : t.avgScore >= 55
                    ? "bg-blue-500"
                    : t.avgScore >= 35
                      ? "bg-amber-500"
                      : "bg-red-500";
              return (
                <tr
                  key={t.category}
                  className={
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }
                >
                  <td className="px-3 py-2.5 font-medium text-slate-900">
                    {t.category}
                  </td>
                  <td className="px-3 py-2.5 text-center text-slate-600">
                    {t.total}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{ width: `${t.avgScore}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-semibold text-slate-700">
                        {t.avgScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs text-slate-600">
                    {t.avgSim}%
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs text-slate-600">
                    {t.avgKT}%
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs font-medium text-slate-800">
                    {t.topModel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
