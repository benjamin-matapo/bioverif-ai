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

export interface EvaluationResult {
  similarityScore: number;
  keyTermsFound: string[];
  keyTermsMissed: string[];
  keyTermScore: number;
  verdict: "Excellent" | "Good" | "Partial" | "Poor";
}

export function evaluateResponse(
  aiResponse: string,
  groundTruth: string,
  keyTerms: string[],
): EvaluationResult {
  const aiLower = aiResponse.toLowerCase();
  const truthLower = groundTruth.toLowerCase();

  const similarityScore = Math.min(
    100,
    Math.round(Math.min(1, bigramSimilarity(aiLower, truthLower)) * 100),
  );

  const keyTermsFound: string[] = [];
  const keyTermsMissed: string[] = [];

  for (const term of keyTerms) {
    if (aiLower.includes(term.toLowerCase())) {
      keyTermsFound.push(term);
    } else {
      keyTermsMissed.push(term);
    }
  }

  const keyTermScore =
    keyTerms.length === 0
      ? 0
      : Math.round((keyTermsFound.length / keyTerms.length) * 100);

  const combined = (similarityScore + keyTermScore) / 2;
  let verdict: EvaluationResult["verdict"];
  if (combined >= 75) verdict = "Excellent";
  else if (combined >= 55) verdict = "Good";
  else if (combined >= 35) verdict = "Partial";
  else verdict = "Poor";

  return {
    similarityScore,
    keyTermsFound,
    keyTermsMissed,
    keyTermScore,
    verdict,
  };
}
