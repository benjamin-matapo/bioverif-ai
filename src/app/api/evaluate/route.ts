import { NextResponse } from "next/server";
import { BIOMED_QUESTIONS } from "@/lib/biomed-data";
import { evaluateResponse } from "@/lib/evaluate";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const { questionId, aiResponse, aiName } = body;

    if (
      typeof questionId !== "string" ||
      !questionId.trim() ||
      typeof aiResponse !== "string" ||
      !aiResponse.trim() ||
      typeof aiName !== "string" ||
      !aiName.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid fields. Send questionId, aiResponse, and aiName as non-empty strings.",
        },
        { status: 400 },
      );
    }

    const question = BIOMED_QUESTIONS.find((q) => q.id === questionId.trim());
    if (!question) {
      return NextResponse.json(
        { error: `Question with id "${questionId}" not found.` },
        { status: 404 },
      );
    }

    const trimmedResponse = aiResponse.trim();
    const trimmedAiName = aiName.trim();

    const {
      similarityScore,
      keyTermsFound,
      keyTermsMissed,
      keyTermScore,
      verdict,
    } = evaluateResponse(
      trimmedResponse,
      question.groundTruth,
      question.keyTerms,
    );

    return NextResponse.json(
      {
        questionId: question.id,
        question: question.question,
        aiName: trimmedAiName,
        aiResponse: trimmedResponse,
        groundTruth: question.groundTruth,
        similarityScore,
        keyTermsFound,
        keyTermsMissed,
        keyTermScore,
        verdict,
        category: question.category,
        difficulty: question.difficulty,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/evaluate:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
