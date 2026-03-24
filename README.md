# 🧬 BioVerif-AI

**A biomedical AI evaluation tool that benchmarks large language model responses against expert-curated ground truth answers.**

Built as part of a research project exploring the accuracy and reliability of generative AI in biomedical science contexts. Developed using Next.js, TypeScript, and Tailwind CSS with a fully offline data store system.

> Academic research tool - not for clinical use.

---

## What is BioVerif-AI?

Large language models are increasingly being used to answer complex scientific questions. But how accurate are they really?

BioVerif-AI demonstrates a structured approach to evaluating AI responses using pre-stored biomedical scenarios. It scores each response on two dimensions: semantic similarity to ground truth, and coverage of domain-specific key terms. The result is a structured, repeatable evaluation that shows how different AI models perform on the same biomedical questions.

**Important:** This is a demonstration tool that showcases comparison technology using a fixed dataset of 5 expert-curated questions. It is not a comprehensive platform for evaluating arbitrary biomedical questions, but rather a proof-of-concept for how AI responses can be systematically compared and scored.

---

## 📋 How to Use (For Users)

### Quick Start
1. **Open the app** - Navigate to the main page
2. **Choose your evaluation mode:**
   - **Evaluator** - Test any AI model manually
   - **Auto-Benchmark** - View pre-stored AI responses for comparison
3. **Evaluator Mode:**
   - Select a biomedical question from the 5 available scenarios
   - Copy the question and ask any AI (ChatGPT, Claude, Gemini, etc.)
   - Paste the AI response back into the evaluator
   - Get instant scoring: semantic similarity, key term coverage, and final score
   - Compare multiple AI responses in a side-by-side leaderboard
4. **Auto-Benchmark Mode:**
   - View pre-stored responses from 3 AI models (ChatGPT, Gemini, Claude)
   - See ground truth with clickable citation links
   - Compare scores across models instantly
   - All data is pre-stored for reproducible, offline testing

### Understanding Your Results
- **Semantic Similarity (60%)**: How closely the AI response matches the expert ground truth
- **Key Term Coverage (40%)**: Percentage of important biomedical terms included
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
│   └── ScoreBadge.tsx          # Score badge component
├── app/
│   ├── page.tsx               # Main evaluator page
│   ├── benchmark/page.tsx      # Auto-benchmark page
│   └── api/evaluate/route.ts  # Evaluator API endpoint
└── components/Navbar.tsx        # Navigation
```

### Key Architecture Decisions
- **Offline Data Store**: No external API calls during evaluation
- **Pre-stored Responses**: Reproducible benchmarking results
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

The app includes five expert-curated questions across core biomedical disciplines:

| Question | Category | Difficulty | Focus |
|-----------|----------|------------|--------|
| DNA Replication | Molecular Biology | Postgraduate | Fidelity mechanisms and repair pathways |
| Krebs Cycle | Biochemistry | Undergraduate | Metabolic regulation and allosteric control |
| CRISPR-Cas9 | Genomics | Expert | Gene editing mechanisms and repair pathways |
| Blood-Brain Barrier | Neuroscience | Postgraduate | Transport mechanisms and neurovascular unit |
| Antibody Diversity | Immunology | Expert | VDJ recombination and affinity maturation |

Each question includes:
- Expert-written ground truth from peer-reviewed sources
- Citations to authoritative biomedical literature (NCBI, PMC, etc.)
- 15-20 key biomedical terms for coverage scoring
- Pre-stored AI responses from ChatGPT, Gemini, and Claude

---

## 🎯 What This Demonstrates

This tool showcases how AI responses can be systematically evaluated and compared:

1. **Structured Evaluation**: Consistent scoring methodology across different AI models
2. **Reproducible Results**: Pre-stored data ensures identical comparisons
3. **Multi-dimensional Scoring**: Combines semantic similarity with domain knowledge
4. **User-friendly Interface**: Clear visualization of comparative performance
5. **Academic Rigor**: Ground truth sourced from peer-reviewed biomedical literature

### Limitations
- Fixed dataset of 5 questions (not expandable by users)
- Pre-stored AI responses (no live API calls)
- Biomedical focus (not general-purpose evaluation)
- Educational demonstration purpose (not production assessment tool)

---

## 🤝 Contributing

We welcome contributions to improve the evaluation methodology, add new benchmark scenarios, or enhance the user interface. See the "For Developers" section above to get started.

---

## 📄 License

This project is open source and available under the MIT License.
