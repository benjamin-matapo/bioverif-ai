export interface BiomedQuestion {
  id: string;
  category: string;
  difficulty: "Undergraduate" | "Postgraduate" | "Expert";
  question: string;
  groundTruth: string;
  keyTerms: string[];
}

export const BIOMED_QUESTIONS: BiomedQuestion[] = [
  {
    id: "dna-replication-fidelity",
    category: "Molecular Biology",
    difficulty: "Postgraduate",
    question:
      "Explain the molecular mechanisms that ensure high-fidelity DNA replication, including the role of DNA polymerase proofreading and mismatch repair pathways.",
    groundTruth:
      "A comprehensive answer covering: DNA Pol III 3'→5' exonuclease proofreading activity (reduces errors to 1 in 10^7), post-replication mismatch repair (MMR) system involving MutS recognition of mismatches, MutL recruitment, and MutH-mediated strand discrimination via hemimethylation of GATC sequences, collectively achieving a final error rate of ~1 in 10^9-10^10 base pairs.",
    keyTerms: [
      "DNA polymerase III",
      "3' to 5' exonuclease",
      "proofreading",
      "mismatch repair",
      "MutS",
      "MutL",
      "MutH",
      "GATC methylation",
      "error rate",
    ],
  },
  {
    id: "krebs-cycle-regulation",
    category: "Biochemistry",
    difficulty: "Undergraduate",
    question:
      "Describe the key regulatory enzymes of the Krebs cycle and explain how cellular energy status controls their activity through allosteric mechanisms.",
    groundTruth:
      "Covers the three key regulated steps: Citrate synthase (inhibited by ATP, NADH, succinyl-CoA; activated by AMP, CoA), Isocitrate dehydrogenase (inhibited by ATP, NADH; activated by ADP, Ca2+), and Alpha-ketoglutarate dehydrogenase (inhibited by succinyl-CoA, NADH; activated by Ca2+). Explains that high energy charge (high ATP/AMP ratio) suppresses the cycle while low energy status promotes it.",
    keyTerms: [
      "citrate synthase",
      "isocitrate dehydrogenase",
      "alpha-ketoglutarate dehydrogenase",
      "allosteric",
      "ATP",
      "NADH",
      "AMP",
      "energy charge",
    ],
  },
  {
    id: "crispr-cas9-mechanism",
    category: "Genomics & Gene Editing",
    difficulty: "Expert",
    question:
      "Describe the molecular mechanism of CRISPR-Cas9 gene editing, including PAM sequence recognition, R-loop formation, and the DNA double-strand break repair pathways that determine editing outcomes.",
    groundTruth:
      "Covers Cas9-sgRNA complex formation, PAM (5'-NGG-3') recognition by Cas9's PAM-interacting domain triggering DNA unwinding, R-loop formation through sgRNA:DNA complementary strand hybridization (20nt spacer), HNH domain cleaving the complementary strand and RuvC domain cleaving the non-complementary strand creating a blunt DSB 3bp upstream of PAM. Repair via NHEJ causes indels (gene knockout) while HDR with a donor template enables precise edits.",
    keyTerms: [
      "Cas9",
      "sgRNA",
      "PAM sequence",
      "NGG",
      "R-loop",
      "HNH domain",
      "RuvC domain",
      "DSB",
      "NHEJ",
      "HDR",
      "indels",
    ],
  },
  {
    id: "blood-brain-barrier",
    category: "Neuroscience",
    difficulty: "Postgraduate",
    question:
      "Explain the cellular and molecular composition of the blood-brain barrier and describe three distinct transport mechanisms that regulate molecular entry into the CNS.",
    groundTruth:
      "BBB is formed by brain microvascular endothelial cells (BMECs) with tight junctions (claudin-5, occludin, ZO-1), supported by pericytes and astrocytic endfeet (neurovascular unit). Three transport mechanisms: 1) Paracellular diffusion blocked by tight junctions; 2) Transcellular lipid diffusion for small lipophilic molecules (O2, CO2, ethanol); 3) Carrier-mediated transport (GLUT1 for glucose, LAT1 for amino acids); 4) Receptor-mediated transcytosis (transferrin receptor for iron, LRP1 for larger proteins); P-gp efflux pumps actively remove xenobiotics.",
    keyTerms: [
      "endothelial cells",
      "tight junctions",
      "claudin-5",
      "occludin",
      "pericytes",
      "astrocytes",
      "GLUT1",
      "transcytosis",
      "P-glycoprotein",
      "neurovascular unit",
    ],
  },
  {
    id: "antibody-structure-function",
    category: "Immunology",
    difficulty: "Expert",
    question:
      "Describe the structural basis of antibody diversity and specificity, explaining how VDJ recombination and somatic hypermutation contribute to the adaptive immune response.",
    groundTruth:
      "Antibodies are Y-shaped glycoproteins with two heavy and two light chains linked by disulfide bonds. Variable regions (VH, VL) contain CDR loops (CDR1-3) determining antigen specificity. VDJ recombination: RAG1/RAG2 recombinases catalyze combinatorial joining of V, D, J gene segments (heavy chain) and V, J (light chain) with junctional diversity from P-nucleotide addition and N-nucleotide insertion by TdT. Somatic hypermutation (AID-catalyzed) in germinal centers introduces point mutations at ~10^-3/bp/division, with affinity maturation selecting high-affinity clones. Combinatorial diversity ~3×10^11 unique antibodies.",
    keyTerms: [
      "VDJ recombination",
      "RAG1",
      "RAG2",
      "CDR loops",
      "somatic hypermutation",
      "AID",
      "affinity maturation",
      "germinal center",
      "TdT",
      "combinatorial diversity",
    ],
  },
];

