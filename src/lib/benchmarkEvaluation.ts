import { bigramSimilarity } from "./evaluate";

export interface BenchmarkResult {
  modelName: string;
  semanticScore: number;
  keyTermScore: number;
  finalScore: number;
  missingConcepts: string[];
  responsePreview: string;
  verdict: "Excellent" | "Good" | "Partial" | "Poor";
}

export function runBenchmark(
  modelName: string,
  modelResponse: string,
  groundTruth: string,
  keyTerms: string[]
): BenchmarkResult {
  const responseLower = modelResponse.toLowerCase();
  const truthLower = groundTruth.toLowerCase();

  const semanticScore = Math.round(
    bigramSimilarity(responseLower, truthLower) * 100
  );

  const matchedKeyTerms = keyTerms.filter(term =>
    responseLower.includes(term.toLowerCase())
  );
  const keyTermScore = Math.round(
    (matchedKeyTerms.length / keyTerms.length) * 100
  );

  const missingConcepts = keyTerms.filter(term =>
    !responseLower.includes(term.toLowerCase())
  );

  const finalScore = Math.round(0.6 * semanticScore + 0.4 * keyTermScore);

  const responsePreview = modelResponse.length > 120
    ? modelResponse.substring(0, 120) + "..."
    : modelResponse;

  let verdict: BenchmarkResult["verdict"];
  if (finalScore >= 75) verdict = "Excellent";
  else if (finalScore >= 55) verdict = "Good";
  else if (finalScore >= 35) verdict = "Partial";
  else verdict = "Poor";

  return {
    modelName,
    semanticScore,
    keyTermScore,
    finalScore,
    missingConcepts,
    responsePreview,
    verdict,
  };
}
