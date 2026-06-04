import { matchKeyTerm, tokenize, computeTF, computeIDF, cosineSimilarity } from "./evaluate";

function tfidfSimilarity(textA: string, textB: string): number {
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);
  const tfA = computeTF(tokensA);
  const tfB = computeTF(tokensB);
  const idf = computeIDF([tokensA, tokensB]);
  const tfidfA = new Map<string, number>();
  const tfidfB = new Map<string, number>();
  for (const [token, val] of tfA) {
    tfidfA.set(token, val * (idf.get(token) ?? 1));
  }
  for (const [token, val] of tfB) {
    tfidfB.set(token, val * (idf.get(token) ?? 1));
  }
  return cosineSimilarity(tfidfA, tfidfB);
}

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
  const semanticScore = Math.round(
    tfidfSimilarity(modelResponse, groundTruth) * 100
  );

  const matchedKeyTerms = keyTerms.filter(term =>
    matchKeyTerm(modelResponse, term)
  );
  const keyTermScore = Math.round(
    (matchedKeyTerms.length / keyTerms.length) * 100
  );

  const missingConcepts = keyTerms.filter(term =>
    !matchKeyTerm(modelResponse, term)
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
