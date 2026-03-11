export const runtime = "nodejs";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { BIOMED_QUESTIONS } from "@/lib/biomed-data";
import { evaluateResponse } from "@/lib/evaluate";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured. Add it to .env.local and restart the dev server.",
        },
        { status: 500 },
      );
    }

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
        { error: `Question with id "${questionId}" not found.` },
        { status: 404 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert biomedical scientist with a PhD-level understanding of molecular biology, biochemistry, genetics, and physiology. Answer the following question with scientific precision, using correct terminology. Provide a comprehensive answer in 150-200 words: ${question.question}`;

    const result = await model.generateContent(prompt);
    const geminiAnswer = (result.response?.text() ?? "").trim();

    if (!geminiAnswer) {
      return NextResponse.json(
        { error: "No answer returned from Gemini. Please try again." },
        { status: 502 },
      );
    }

    const {
      similarityScore,
      keyTermsFound,
      keyTermsMissed,
      keyTermScore,
    } = evaluateResponse(
      geminiAnswer,
      question.groundTruth,
      question.keyTerms,
    );

    return NextResponse.json(
      {
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
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/benchmark:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
