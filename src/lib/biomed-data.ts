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
    id: "dna-replication",
    category: "Molecular Biology",
    difficulty: "Postgraduate",
    question:
      "Explain the molecular mechanisms that ensure high-fidelity DNA replication, including the role of DNA polymerase proofreading and mismatch repair pathways.",
    groundTruth:
      "High-fidelity DNA replication is achieved through the combined actions of nucleotide selectivity, DNA polymerase proofreading, and post-replicative mismatch repair. DNA polymerase III incorporates nucleotides based on accurate Watson-Crick base pairing and possesses an intrinsic 3' to 5' exonuclease activity that excises misincorporated bases immediately after they are added, reducing the error rate to approximately 1 in 10^7 nucleotides. Residual mismatches that escape proofreading are corrected by the mismatch repair (MMR) system. MutS scans newly synthesized DNA and recognizes base-base mismatches or small insertion-deletion loops, then recruits MutL to form a repair complex. MutH identifies the nascent strand by recognizing hemimethylated GATC sequences and introduces a nick specifically in the unmethylated daughter strand. The erroneous DNA segment is excised, resynthesized by DNA polymerase, and ligated, further lowering the overall error frequency to about 1 in 10^9 to 10^10 base pairs per cell division.",
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
    id: "krebs-cycle",
    category: "Biochemistry",
    difficulty: "Undergraduate",
    question:
      "Describe the key regulatory enzymes of the Krebs cycle and explain how cellular energy status controls their activity through allosteric mechanisms.",
    groundTruth:
      "Regulation of the Krebs cycle is centered on three key irreversible enzymes that sense cellular energy status through allosteric effectors. Citrate synthase catalyzes the condensation of oxaloacetate and acetyl-CoA and is inhibited by high concentrations of ATP, NADH, and succinyl-CoA, while it is stimulated by AMP and free CoA, linking flux to substrate availability and energy demand. Isocitrate dehydrogenase is a major rate-limiting step and is inhibited by ATP and NADH, whereas ADP and Ca2+ act as positive allosteric regulators that enhance its affinity for substrates and promote oxidative metabolism during muscle contraction and other energy-intensive states. Alpha-ketoglutarate dehydrogenase is similarly inhibited by its products, succinyl-CoA and NADH, and is activated by Ca2+, providing additional control during increased workload. When the ATP to AMP ratio is high, these inhibitory signals slow the cycle and conserve substrates, whereas low energy charge relieves inhibition and accelerates flux to support ATP production.",
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
    id: "crispr-cas9",
    category: "Genomics & Gene Editing",
    difficulty: "Expert",
    question:
      "Describe the molecular mechanism of CRISPR-Cas9 gene editing, including PAM sequence recognition, R-loop formation, and the DNA double-strand break repair pathways that determine editing outcomes.",
    groundTruth:
      "CRISPR-Cas9 gene editing relies on a ribonucleoprotein complex between Cas9 and a single guide RNA (sgRNA) that directs cleavage to a complementary genomic target. Cas9 first scans DNA for a protospacer adjacent motif, typically the 5'-NGG-3' sequence, which is recognized by its PAM-interacting domain and triggers local DNA unwinding. The exposed strand then base pairs with the 20-nucleotide spacer region of the sgRNA, forming an R-loop in which the RNA-DNA hybrid displaces the non-complementary strand. Proper R-loop formation allosterically activates the HNH nuclease domain, which cleaves the DNA strand complementary to the sgRNA, and the RuvC domain, which cleaves the non-complementary strand, producing a blunt double-strand break approximately three base pairs upstream of the PAM. Cellular repair pathways determine editing outcomes: non-homologous end joining introduces small insertions or deletions that disrupt gene function, whereas homology-directed repair uses an exogenous donor template to install precise sequence changes.",
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
      "The blood-brain barrier is formed primarily by specialized brain microvascular endothelial cells that are linked by continuous tight junctions composed of proteins such as claudin-5, occludin, and ZO-1. These endothelial cells rest on a basement membrane and are closely associated with pericytes and astrocytic endfeet, together constituting the neurovascular unit that structurally and functionally supports barrier integrity. Paracellular diffusion is effectively blocked by the tight junction network, so most solutes cannot pass between cells. Instead, small lipophilic molecules such as oxygen, carbon dioxide, and ethanol cross the barrier by passive transcellular diffusion through the endothelial plasma membrane. Essential hydrophilic molecules rely on carrier-mediated transporters, including GLUT1 for glucose and LAT1 for large neutral amino acids, which enable highly selective influx. In addition, receptor-mediated transcytosis via receptors such as the transferrin receptor and LRP1 transports specific peptides and proteins. Efflux pumps like P-glycoprotein actively export xenobiotics and many drugs back into the circulation.",
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
    id: "antibody-diversity",
    category: "Immunology",
    difficulty: "Expert",
    question:
      "Describe the structural basis of antibody diversity and specificity, explaining how VDJ recombination and somatic hypermutation contribute to the adaptive immune response.",
    groundTruth:
      "Antibodies are Y-shaped glycoproteins composed of two identical heavy chains and two identical light chains linked by disulfide bonds, forming variable antigen-binding Fab arms and a constant Fc region. The variable domains of the heavy (VH) and light (VL) chains contain three complementarity-determining region loops that create the antigen-binding site and determine specificity. Diversity arises first through VDJ recombination, in which RAG1 and RAG2 recombinases catalyze the somatic joining of variable (V), diversity (D), and joining (J) gene segments in the heavy chain locus and V and J segments in the light chain locus. Junctional diversity is further increased by P-nucleotide addition at hairpin openings and random N-nucleotide insertion by terminal deoxynucleotidyl transferase. After antigen stimulation, activation-induced cytidine deaminase drives somatic hypermutation in germinal center B cells, introducing point mutations at a rate of approximately 10^-3 per base pair per division. Affinity maturation selects B cell clones with higher affinity receptors, generating an estimated combinatorial repertoire on the order of 3×10^11 unique antibodies.",
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

