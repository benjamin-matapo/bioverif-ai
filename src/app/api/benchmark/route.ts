import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import stringSimilarity from "string-similarity";

import { BIOMED_QUESTIONS } from "@/lib/biomed-data";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.questionId !== "string") {
      return NextResponse.json(
        { error: "Invalid request body. Expected { questionId: string }." },
        { status: 400 },
      );
    }

    const { questionId } = body;
    const question = BIOMED_QUESTIONS.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        { error: `Question with id '${questionId}' not found.` },
        { status: 404 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured. Please add it to your environment.",
        },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt =
      "You are an expert biomedical scientist with a PhD-level understanding of molecular biology, biochemistry, genetics, and physiology. Answer the following question with scientific precision, using correct terminology. Provide a comprehensive answer in 150-200 words:";

    const prompt = `${systemPrompt} ${question.question}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const geminiAnswer = (response?.text() ?? "").trim();

    if (!geminiAnswer) {
      return NextResponse.json(
        { error: "No answer returned from Gemini model." },
        { status: 502 },
      );
    }

    const groundTruthLower = question.groundTruth.toLowerCase();
    const geminiLower = geminiAnswer.toLowerCase();

    const similarityRaw = stringSimilarity.compareTwoStrings(
      geminiLower,
      groundTruthLower,
    );
    const similarityScore = Math.round(similarityRaw * 100);

    const keyTermsFound: string[] = [];
    const keyTermsMissed: string[] = [];

    for (const term of question.keyTerms) {
      const termLower = term.toLowerCase();
      if (geminiLower.includes(termLower)) {
        keyTermsFound.push(term);
      } else {
        keyTermsMissed.push(term);
      }
    }

    const keyTermScore =
      question.keyTerms.length === 0
        ? 0
        : Math.round((keyTermsFound.length / question.keyTerms.length) * 100);

    const payload = {
      questionId: question.id,
      question: question.question,
      geminiAnswer,
      groundTruth: question.groundTruth,
      similarityScore,
      keyTermsFound,
      keyTermsMissed,
      keyTermScore,
      category: question.category,
      difficulty: question.difficulty,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error in /api/benchmark:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while running the benchmark. Please try again.",
      },
      { status: 500 },
    );
  }
}

