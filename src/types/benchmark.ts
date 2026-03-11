import type { BiomedQuestion } from "@/lib/biomed-data";

export interface BenchmarkResult {
  questionId: string;
  question: string;
  geminiAnswer: string;
  groundTruth: string;
  similarityScore: number;
  keyTermsFound: string[];
  keyTermsMissed: string[];
  keyTermScore: number;
  category: string;
  difficulty: BiomedQuestion["difficulty"];
  timestamp: string;
}

