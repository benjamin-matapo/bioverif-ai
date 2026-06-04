# BioVerif-AI — Full Application Overview

**A biomedical AI evaluation and benchmarking tool** that scores LLM responses against expert-curated ground truth answers using semantic similarity and key term coverage.

> Academic research tool — not for clinical use.

---

## What It Does

BioVerif-AI lets you evaluate how well AI models answer biomedical questions. You pick a question from a curated set, ask an AI (ChatGPT, Claude, etc.), paste the response back in, and get a structured score. It also has a one-click benchmark mode that runs all models against pre-stored responses for side-by-side comparison.

The scoring is fully offline and deterministic — no external API calls are made during evaluation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Linting | ESLint 9 with eslint-config-next |
| Compiler | Next.js React Compiler enabled |

---

## Pages

### `/` — Evaluator (main page)
The primary hands-on evaluation interface. Flow:

1. **Pick a question** from the built-in scenarios (or add custom ones via the slide-out manager)
2. **Ask any AI** by copying the question and opening the AI in a new tab
3. **Paste the response** into the textarea
4. **Click "Evaluate Response"** — sends a POST to `/api/evaluate` which runs the scoring engine
5. **View results** — a scored card shows similarity, key term coverage, final score, and verdict

Supports:
- Running 3x for a **consistency check** (averages pairwise bigram similarity across 3 evaluations)
- **Manual ratings** (1–5) for pedagogical quality, structural clarity, and terminology precision
- **Export** the session as JSON
- **Comparison table** when multiple AIs are evaluated on the same question
- **Session leaderboard** sidebar ranking all evaluations by final score

### `/benchmark` — Auto-Benchmark
One-click evaluation of pre-stored AI responses. Select a scenario, hit "Run Benchmark", and see all 6 models scored against the expert ground truth in a grid. Includes a "Try These Questions Yourself" section with launch buttons for each AI.

---

## Scoring Engine

Located in `src/lib/evaluate.ts` (and `src/lib/benchmarkEvaluation.ts` for the benchmark page).

### Semantic Similarity (60% of final score)
- Character bigram overlap using the Dice coefficient
- Both the AI response and the expert ground truth are split into sliding windows of 2 characters
- Similarity = `(2 × sum of min counts) / (total bigrams in A + total bigrams in B)`

### Key Term Coverage (40% of final score)
- Each question has a curated list of domain-specific key terms (e.g. "obligate intracellular parasite", "capsid", "virion")
- The engine does a case-insensitive substring check for each term in the AI response
- Score = `(found terms / total terms) × 100`

### Final Score
`finalScore = round(0.6 × similarityScore + 0.4 × keyTermScore)`

### Verdict Thresholds
| Score | Verdict |
|---|---|
| ≥ 75 | Excellent |
| ≥ 55 | Good |
| ≥ 35 | Partial |
| < 35 | Poor |

---

## API

### `POST /api/evaluate`
**Request body:**
```json
{
  "questionId": "string",
  "aiResponse": "string",
  "aiName": "string",
  "pedagogicalRating": "number|null",
  "clarityRating": "number|null",
  "terminologyRating": "number|null",
  "consistencyScore": "number|null"
}
```

**Response:** `EvaluationResultPayload` with scores, found/missed key terms, verdict, timestamps, and manual ratings.

---

## Data

### Built-in Questions (6 scenarios)
All are undergraduate-level across different biomedical modules:

| ID | Module | Topic |
|---|---|---|
| viruses-replication | BMD1001 — Viruses I | Virus structure, replication, classification |
| coding-biosciences | BMD1002 — Intro to Coding | The genetic code, codons, translation |
| drug-action-quantification | BMD1004 — Quantification of Drug Action | Dose-response, EC50, affinity |
| cell-signalling | BMD1003 — Cell Signalling | Signal transduction, receptors, second messengers |
| protein-separation | BMD1000 — Separation Techniques | Chromatography, electrophoresis |
| membrane-action-potential | BMD1005 — Principles of Excitability | Resting potential, ion channels, action potentials |

Each question has:
- A detailed multi-paragraph **groundTruth**
- An array of 8–14 **keyTerms** for coverage scoring
- A **category**, **module**, **topic**, and **difficulty** label

### Pre-stored AI Responses
`src/lib/dataset.ts` contains pre-written responses from **6 models** (ChatGPT, Gemini, Claude, Copilot, DeepSeek, Grok) for all 6 questions, used by the benchmark page.

### Custom Scenarios
Users can add their own scenarios via the Scenario Manager slide-out panel. These are stored in `localStorage` under the key `bioverif_custom_scenarios`.

### AI Model Configurations
`src/lib/aiModels.ts` defines 6 models with display name, base URL, prompt URL builder, and colour styling. DeepSeek is the only model without prompt URL support (opens homepage only).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with Inter font
│   ├── page.tsx                    # Main evaluator page
│   ├── globals.css                 # Tailwind v4 + custom theme
│   ├── api/evaluate/route.ts       # POST /api/evaluate endpoint
│   └── benchmark/page.tsx          # Auto-benchmark page
├── components/
│   ├── EvaluatorPanel.tsx          # Main evaluator UI (question list, AI pills, input, ratings)
│   ├── ResultCard.tsx              # Single evaluation result card
│   ├── ComparisonTable.tsx         # Side-by-side AI comparison
│   ├── AccuracyBar.tsx             # Score progress bar
│   ├── ScoreBadge.tsx              # Circular score badge
│   ├── BenchmarkResultCard.tsx     # Benchmark result display card
│   ├── BenchmarkCard.tsx           # Legacy component (unused)
│   ├── ScenarioManager.tsx         # Custom scenario CRUD slide-out panel
│   └── Navbar.tsx                  # Top navigation bar
├── lib/
│   ├── biomed-data.ts              # Expert questions, ground truths, key terms
│   ├── dataset.ts                  # Pre-stored AI responses (6 models × 6 questions)
│   ├── evaluate.ts                 # Core evaluation/scoring engine
│   ├── benchmarkEvaluation.ts      # Benchmark scoring (same logic, different shape)
│   ├── aiModels.ts                 # Model configs (display name, URL, colour)
│   └── customScenarios.ts          # localStorage CRUD for custom scenarios
└── types/
    └── benchmark.ts                # Legacy type (unused)
```

---

## Key Architecture Decisions

- **Fully offline scoring** — No external API calls during evaluation. The AI model comparison is entirely local.
- **Pre-stored responses for benchmark** — Ensures reproducible, deterministic results.
- **Tailwind CSS v4** — Uses the `@import "tailwindcss"` directive and `@theme` blocks (no config file).
- **React Compiler** — Enabled in `next.config.ts` for automatic memoization.
- **localStorage persistence** — Custom scenarios survive page reloads but are browser-only.
- **Path alias `@/*`** — Maps to `./src/*` for clean imports.
- **Colour scheme** — Dark navy `#002244` with amber accents throughout.

---

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Notes

- The README states 5 questions — there are actually 6 built-in questions.
- `BenchmarkCard.tsx` and `src/types/benchmark.ts` are legacy remnants from an earlier version (Gemini-only) and are not used by any current page.
- DeepSeek is the only model whose "Open in AI" button links to the homepage rather than a pre-filled chat URL.
