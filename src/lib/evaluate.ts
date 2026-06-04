const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "by", "with", "from", "as", "is", "was", "are", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did", "will",
  "would", "could", "should", "may", "might", "shall", "can", "need",
  "this", "that", "these", "those", "it", "its", "they", "them", "their",
  "we", "our", "you", "your", "he", "she", "him", "his", "her",
  "not", "no", "nor", "so", "if", "than", "then", "else", "also",
  "very", "just", "about", "more", "most", "some", "any", "each", "every",
  "both", "all", "other", "such", "only", "own", "same", "too", "very",
  "because", "into", "over", "between", "through", "during", "before", "after",
  "above", "below", "up", "down", "out", "off", "under", "again",
  "further", "once", "here", "there", "when", "where", "why", "how",
  "which", "who", "whom", "what", "whose", "much", "many"
]);

const STEM_SUFFIXES = [
  { suffix: "isation", replacement: "ise" },
  { suffix: "ization", replacement: "ize" },
  { suffix: "isation", replacement: "ise" },
  { suffix: "ationally", replacement: "ate" },
  { suffix: "iveness", replacement: "ive" },
  { suffix: "ability", replacement: "able" },
  { suffix: "ication", replacement: "ify" },
  { suffix: "isation", replacement: "ise" },
  { suffix: "isation", replacement: "ise" },
];

function simpleStem(word: string): string {
  if (word.length < 4) return word;
  // Basic English stemming rules
  let stem = word;
  if (stem.endsWith("isation")) stem = stem.slice(0, -7) + "ise";
  else if (stem.endsWith("ization")) stem = stem.slice(0, -7) + "ize";
  else if (stem.endsWith("isation")) stem = stem.slice(0, -7) + "ise";
  else if (stem.endsWith("ationally")) stem = stem.slice(0, -9) + "ate";
  else if (stem.endsWith("iveness")) stem = stem.slice(0, -7) + "ive";
  else if (stem.endsWith("ability")) stem = stem.slice(0, -7) + "able";
  else if (stem.endsWith("ication")) stem = stem.slice(0, -7) + "ify";
  else if (stem.endsWith("ations")) stem = stem.slice(0, -6) + "ate";
  else if (stem.endsWith("sses")) stem = stem.slice(0, -4) + "ss";
  else if (stem.endsWith("ies") && stem.length > 4) stem = stem.slice(0, -3) + "y";
  else if (stem.endsWith("es") && stem.length > 4) stem = stem.slice(0, -2);
  else if (stem.endsWith("s") && !stem.endsWith("ss") && stem.length > 3) stem = stem.slice(0, -1);
  else if (stem.endsWith("ed") && stem.length > 4) stem = stem.slice(0, -2);
  else if (stem.endsWith("ing") && stem.length > 5) stem = stem.slice(0, -3);
  else if (stem.endsWith("ly") && stem.length > 4) stem = stem.slice(0, -2);
  else if (stem.endsWith("ment") && stem.length > 6) stem = stem.slice(0, -4);
  return stem;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
    .map(simpleStem);
}

export function computeTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }
  const maxFreq = Math.max(...tf.values(), 1);
  for (const [key, val] of tf) {
    tf.set(key, val / maxFreq);
  }
  return tf;
}

export function computeIDF(docs: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const N = docs.length;
  const df = new Map<string, number>();
  for (const doc of docs) {
    const seen = new Set(doc);
    for (const token of seen) {
      df.set(token, (df.get(token) ?? 0) + 1);
    }
  }
  for (const [token, count] of df) {
    idf.set(token, Math.log((N + 1) / (count + 1)) + 1);
  }
  return idf;
}

export function cosineSimilarity(
  vecA: Map<string, number>,
  vecB: Map<string, number>,
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (const [key, val] of vecA) {
    normA += val * val;
    const bVal = vecB.get(key) ?? 0;
    dotProduct += val * bVal;
  }
  for (const val of vecB.values()) {
    normB += val * val;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dotProduct / denom;
}

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

function normalizeKeyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchKeyTerm(response: string, term: string): boolean {
  const resp = response.toLowerCase();
  const normalized = normalizeKeyTerm(term);
  if (resp.includes(normalized)) return true;
  const words = normalized.split(/\s+/);
  if (words.length <= 1) return false;
  return words.every((w) => resp.includes(w));
}

export interface EvaluationResult {
  similarityScore: number;
  keyTermsFound: string[];
  keyTermsMissed: string[];
  keyTermScore: number;
  finalScore: number;
  verdict: "Excellent" | "Good" | "Partial" | "Poor";
}

export function evaluateResponse(
  aiResponse: string,
  groundTruth: string,
  keyTerms: string[],
): EvaluationResult {
  const similarityScore = Math.round(tfidfSimilarity(aiResponse, groundTruth) * 100);

  const keyTermsFound: string[] = [];
  const keyTermsMissed: string[] = [];

  for (const term of keyTerms) {
    if (matchKeyTerm(aiResponse, term)) {
      keyTermsFound.push(term);
    } else {
      keyTermsMissed.push(term);
    }
  }

  const keyTermScore =
    keyTerms.length === 0
      ? 0
      : Math.round((keyTermsFound.length / keyTerms.length) * 100);

  const combined = 0.6 * similarityScore + 0.4 * keyTermScore;
  const finalScore = Math.round(combined);
  let verdict: EvaluationResult["verdict"];
  if (finalScore >= 75) verdict = "Excellent";
  else if (finalScore >= 55) verdict = "Good";
  else if (finalScore >= 35) verdict = "Partial";
  else verdict = "Poor";

  return {
    similarityScore,
    keyTermsFound,
    keyTermsMissed,
    keyTermScore,
    finalScore,
    verdict,
  };
}
