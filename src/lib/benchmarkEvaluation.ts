function bigramSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const getBigrams = (str: string): Map<string, number> => {
    const bigrams = new Map<string, number>();
    for (let i = 0; i < str.length - 1; i++) {
      const bigram = str.slice(i, i + 2);
      bigrams.set(bigram, (bigrams.get(bigram) ?? 0) + 1);
    }
    return bigrams;
  };
  const bigramsA = getBigrams(a);
  const bigramsB = getBigrams(b);
  let intersection = 0;
  for (const [bigram, countA] of bigramsA) {
    intersection += Math.min(countA, bigramsB.get(bigram) ?? 0);
  }
  return (2.0 * intersection) / (a.length + b.length - 2);
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
