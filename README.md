# 🧬 BioVerif-AI

**A biomedical AI evaluation tool that benchmarks large language model responses against expert-curated ground truth answers.**

Built as part of a research project exploring the accuracy and reliability of generative AI in biomedical science contexts. Developed using Next.js, TypeScript, Tailwind CSS, and Google Gemini 1.5 Flash.

> Academic research tool - not for clinical use.

---

## What is BioVerif-AI?

Large language models are increasingly being used to answer complex scientific questions. But how accurate are they really?

BioVerif-AI lets you test any AI - ChatGPT, Claude, Gemini, Grok, Copilot, or anything else - against a set of expert-written biomedical reference answers. It scores each response on two dimensions: semantic similarity to the ground truth, and coverage of domain-specific key terms. The result is a structured, repeatable evaluation you can run on any model, any time.

The app has two modes:

**Evaluator (main page)** - The primary experience. You pick a benchmark scenario, copy the question, ask any AI you want, paste the response back, and get a scored evaluation. You can run multiple AIs on the same question and compare them side by side in a session leaderboard.

**Auto-Benchmark (beta)** - Calls Google Gemini 1.5 Flash directly via API and runs the full benchmark automatically. Useful for quick testing but limited to Gemini only.

---

## Benchmark Scenarios

The app includes five expert-curated questions across core biomedical disciplines:

| Scenario | Category | Difficulty |
|---|---|---|
| DNA Replication Fidelity | Molecular Biology | Postgraduate |
| Krebs Cycle Regulation | Biochemistry | Undergraduate |
| CRISPR-Cas9 Mechanism | Genomics & Gene Editing | Expert |
| Blood-Brain Barrier Transport | Neuroscience | Postgraduate |
| Antibody Diversity & VDJ Recombination | Immunology | Expert |

Each question has a reference answer written to PhD level, a set of key terms the evaluator checks for, and a difficulty rating. Scores are calculated using bigram similarity against the ground truth and key term coverage percentage.

---

## How to Use It

### Evaluator (recommended)

1. Open the app and go to the **Evaluator** page
2. Click a scenario tile to select a question
3. Hit **Copy Question** and paste it into any AI (ChatGPT, Claude, Gemini, etc.)
4. Come back, select which AI you used, and paste its response into the text box
5. Hit **Evaluate Response**
6. Repeat with a different AI on the same question to get a side-by-side comparison

### Auto-Benchmark (beta)

1. Navigate to the **Auto-Benchmark** tab
2. Select one or more scenario tiles
3. Hit **Run Selected** or **Run All Benchmarks**
4. The app calls Gemini directly and scores the response automatically

---

## Running Locally

### Prerequisites

- Node.js 18 or later
- A Google Gemini API key (free tier works - get one at [aistudio.google.com](https://aistudio.google.com))

### Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bioverif-ai.git
cd bioverif-ai

# Install dependencies
npm install

# Create your environment file
touch .env.local
```

Add your API key to `.env.local`:
```
GEMINI_API_KEY=your_key_here
```
```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The Evaluator page works without an API key. The Auto-Benchmark page requires one.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| AI Model | Google Gemini 1.5 Flash |
| Scoring | Custom bigram similarity algorithm |
| Deployment | Vercel |

---

## Project Structure
```
src/
├── app/
│   ├── page.tsx              - Evaluator (main page)
│   ├── benchmark/page.tsx    - Auto-Benchmark (beta)
│   └── api/
│       ├── evaluate/         - Manual scoring endpoint
│       └── benchmark/        - Gemini API endpoint
├── components/
│   ├── EvaluatorPanel.tsx
│   ├── ComparisonTable.tsx
│   ├── ResultCard.tsx
│   ├── BenchmarkCard.tsx
│   ├── AccuracyBar.tsx
│   └── Navbar.tsx
└── lib/
    ├── biomed-data.ts        - Questions and ground truth answers
    └── evaluate.ts           - Shared scoring logic
```

---

## Deployment

The live version is deployed on Vercel. To deploy your own:

1. Push this repo to GitHub
2. Import it at [vercel.com](https://vercel.com)
3. Add `GEMINI_API_KEY` under Settings - Environment Variables
4. Deploy

---

## Limitations

- Similarity scoring is based on bigram overlap, not semantic understanding - two answers can be factually equivalent but score differently if phrased very differently
- The ground truth answers reflect a specific level of detail; more detailed or differently structured answers may score lower despite being correct
- The Auto-Benchmark beta is rate-limited by the Gemini free tier

---

## License

MIT - free to use, modify, and build on.

---

*Built with Next.js and Google Gemini - Newcastle University Biomedical AI Research*