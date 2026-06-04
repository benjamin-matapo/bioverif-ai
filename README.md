# 🧬 BioVerif-AI

**A biomedical AI evaluation tool that benchmarks large language model responses against expert-curated ground truth answers.**

Built as part of a research project exploring the accuracy and reliability of generative AI in biomedical science contexts. Developed using Next.js, TypeScript, and Tailwind CSS with a fully offline data store system.

> Academic research tool - not for clinical use.

---

## What is BioVerif-AI?

Large language models are increasingly being used to answer complex scientific questions. But how accurate are they really?

BioVerif-AI demonstrates a structured approach to evaluating AI responses using pre-stored biomedical scenarios. It scores each response on two dimensions: semantic similarity to ground truth, and coverage of domain-specific key terms. The result is a structured, repeatable evaluation that shows how different AI models perform on the same biomedical questions.

**Important:** This is a demonstration tool that showcases comparison technology using a fixed dataset of 6 expert-curated questions. It is not a comprehensive platform for evaluating arbitrary biomedical questions, but rather a proof-of-concept for how AI responses can be systematically compared and scored.

---

## 📋 How to Use (For Users)

### Quick Start
1. **Open the app** - Navigate to the main page
2. **Choose your evaluation mode:**
   - **Evaluator** - Test any AI model manually
   - **Auto-Benchmark** - View pre-stored AI responses for comparison
3. **Evaluator Mode:**
   - Select a biomedical question from the 6 available scenarios
   - Copy the question and ask any AI (ChatGPT, Claude, Gemini, etc.)
   - Paste the AI response back into the evaluator
   - Get instant scoring: semantic similarity, key term coverage, and final score
   - Compare multiple AI responses in a side-by-side leaderboard with visual rankings
4. **Auto-Benchmark Mode:**
   - View pre-stored responses from 6 AI models (ChatGPT, Gemini, Claude, Copilot, DeepSeek, Grok)
   - See ground truth with clickable citation links
   - Compare scores across models instantly with visual leaderboard
   - Explore thematic analysis by question category
   - All data is pre-stored for reproducible, offline testing

### Understanding Your Results
- **Semantic Similarity (60%)**: How closely the AI response matches the expert ground truth (TF-IDF cosine similarity)
- **Key Term Coverage (40%)**: Percentage of important biomedical terms included (fuzzy matching with synonyms)
- **Final Score**: Weighted combination showing overall response quality
- **Final Score**: Weighted combination showing overall response quality
- **Verdict**: Performance rating (Excellent/Good/Partial/Poor)

---

## 🛠️ For Developers

### Quick Start
```bash
git clone https://github.com/your-username/bioverif-ai.git
cd bioverif-ai
npm install
npm run dev
```

### Project Structure
```
src/
├── lib/
│   ├── biomed-data.ts      # Expert questions and ground truth
│   ├── dataset.ts          # Pre-stored AI responses
│   ├── evaluate.ts         # Scoring logic for evaluator
│   └── benchmarkEvaluation.ts # Scoring logic for auto-benchmark
├── components/
│   ├── BenchmarkResultCard.tsx  # Auto-benchmark result display
│   ├── ResultCard.tsx          # Evaluator result display
│   ├── AccuracyBar.tsx         # Score visualization
│   ├── ScoreBadge.tsx          # Score badge component
│   ├── AILeaderboard.tsx       # Visual ranked model leaderboard
│   └── ThematicAnalysis.tsx    # Category-wise performance breakdown
├── app/
│   ├── page.tsx               # Main evaluator page
│   ├── benchmark/page.tsx      # Auto-benchmark page
│   └── api/evaluate/route.ts  # Evaluator API endpoint
└── components/Navbar.tsx        # Navigation
```

### Key Architecture Decisions
- **Offline Data Store**: No external API calls during evaluation
- **Pre-stored Responses**: Reproducible benchmarking results
- **TF-IDF Scoring**: Semantic similarity using term frequency-inverse document frequency
- **Separate Scoring Logic**: Independent evaluation for both modes
- **Responsive Design**: Mobile-first Tailwind CSS implementation
- **TypeScript**: Full type safety across the application

### Adding New Questions
1. Update `src/lib/biomed-data.ts` with new question data
2. Add corresponding AI responses in `src/lib/dataset.ts`
3. Include proper citations for ground truth sources
4. Test both evaluator and auto-benchmark modes

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

---

## 📊 Benchmark Scenarios

The app includes six expert-curated questions across core biomedical disciplines:

| ID | Question | Category | Difficulty | Focus |
|----|----------|----------|------------|--------|
| BMD1001 | Viruses & Replication | Virology | Postgraduate | Baltimore classification, replication cycles |
| BMD1002 | Coding in Biosciences | Computational Biology | Postgraduate | Bioinformatics, programming in biomedical research |
| BMD1003 | Cell Signalling | Molecular Biology | Postgraduate | Signalling cascades, kinase cascades, second messengers |
| BMD1004 | Pharmacology | Pharmacology | Postgraduate | Agonist-binding, affinity, potency, efficacy |
| BMD1005 | Excitability | Neuroscience | Postgraduate | Action potentials, ion channels, membrane potential |
| BMD1000 | Separation Science | Analytical Chemistry | Postgraduate | Chromatography, electrophoresis, mass spectrometry |

Each question includes:
- Expert-written ground truth from peer-reviewed sources
- Citations to authoritative biomedical literature (NCBI, PMC, etc.)
- 17-22 key biomedical terms for coverage scoring
- Pre-stored AI responses from ChatGPT, Gemini, Claude, Copilot, DeepSeek, and Grok

---

## 🎯 What This Demonstrates

This tool showcases how AI responses can be systematically evaluated and compared:

1. **Structured Evaluation**: Consistent scoring methodology across different AI models
2. **Reproducible Results**: Pre-stored data ensures identical comparisons
3. **Multi-dimensional Scoring**: Combines semantic similarity with domain knowledge
4. **User-friendly Interface**: Clear visualization of comparative performance
5. **Academic Rigor**: Ground truth sourced from peer-reviewed biomedical literature

### Limitations
- Fixed dataset of 6 questions (not expandable by users)
- Pre-stored AI responses (no live API calls)
- Biomedical focus (not general-purpose evaluation)
- Educational demonstration purpose (not production assessment tool)

---

## 🤝 Contributing

We welcome contributions to improve the evaluation methodology, add new benchmark scenarios, or enhance the user interface. See the "For Developers" section above to get started.

---

## 📄 License

This project is open source and available under the MIT License.
