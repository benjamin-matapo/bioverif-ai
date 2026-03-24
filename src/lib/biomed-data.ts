export interface BiomedQuestion {
  id: string;
  category: string;
  difficulty: "Undergraduate" | "Postgraduate" | "Expert";
  question: string;
  groundTruth: string;
  keyTerms: string[];
  citation: {
    text: string;
    url: string;
  };
}

export const BIOMED_QUESTIONS: BiomedQuestion[] = [
  {
    id: "dna-replication",
    category: "Molecular Biology",
    difficulty: "Postgraduate",
    question:
      "Explain the molecular mechanisms that ensure high-fidelity DNA replication, including the role of DNA polymerase proofreading and mismatch repair pathways.",
    groundTruth:
      "DNA replication fidelity is maintained through three sequential mechanisms. First, DNA polymerase actively discriminates against incorrect nucleotides during synthesis, selecting against mismatched bases through recognition of correct Watson-Crick base pair geometry, which reduces errors to approximately 1 in 10^6 nucleotides. Second, 3' to 5' exonuclease (proofreading) activity intrinsic to replicative DNA polymerases excises misincorporated nucleotides at 3' end of growing chain immediately after misincorporation, improving fidelity by a further 100- to 1000-fold. Third, post-replicative mismatch repair (MMR) system scans newly synthesised DNA for remaining errors. In bacteria, MutS recognises mismatch, recruits MutL, and MutH identifies newly synthesised strand by nicking unmethylated GATC sequences, since parental DNA is methylated on adenine residues within GATC sequences while daughter strand is not yet methylated. The erroneous segment is excised, resynthesised, and ligated. Together, these mechanisms reduce final error frequency to approximately 1 in 10^9 to 10^10 base pairs per cell division.",
    keyTerms: [
      "DNA polymerase",
      "3' to 5' exonuclease",
      "proofreading",
      "mismatch repair",
      "MutS",
      "MutL",
      "MutH",
      "GATC methylation",
      "error rate",
    ],
    citation: {
      text: "Cooper GM. The Cell: A Molecular Approach. 2nd edition. Sunderland (MA): Sinauer Associates; 2000. Chapter 5: DNA Replication and Repair. Available from: https://www.ncbi.nlm.nih.gov/books/NBK9940/",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK9940/",
    },
  },
  {
    id: "krebs-cycle",
    category: "Biochemistry",
    difficulty: "Undergraduate",
    question:
      "Describe the key regulatory enzymes of the Krebs cycle and explain how cellular energy status controls their activity through allosteric mechanisms.",
    groundTruth:
      "The Krebs cycle is regulated at three irreversible enzymatic steps that respond to cell's energy status through allosteric mechanisms. Citrate synthase, which condenses acetyl-CoA with oxaloacetate to form citrate, is inhibited by high concentrations of ATP, NADH, and succinyl-CoA, reflecting excess energy supply, and is activated by AMP and free CoA when energy demand rises. Isocitrate dehydrogenase catalyses rate-limiting oxidative decarboxylation of isocitrate to alpha-ketoglutarate and is inhibited by ATP and NADH while being allosterically activated by ADP and calcium ions, which signal increased metabolic demand such as during muscle contraction. Alpha-ketoglutarate dehydrogenase, which converts alpha-ketoglutarate to succinyl-CoA, is similarly inhibited by its products succinyl-CoA and NADH, and is activated by calcium ions. When ATP to AMP ratio is high, these inhibitory signals collectively slow the cycle and conserve substrates. Conversely, low energy charge relieves inhibition and accelerates flux to restore ATP production.",
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
    citation: {
      text: "Dash S, Bhatt DL. Physiology, Krebs Cycle. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2022. Available from: https://www.ncbi.nlm.nih.gov/books/NBK556032/",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK556032/",
    },
  },
  {
    id: "crispr-cas9",
    category: "Genomics & Gene Editing",
    difficulty: "Expert",
    question:
      "Describe the molecular mechanism of CRISPR-Cas9 gene editing, including PAM sequence recognition, R-loop formation, and the DNA double-strand break repair pathways that determine editing outcomes.",
    groundTruth:
      "CRISPR-Cas9 gene editing uses a ribonucleoprotein complex of Cas9 endonuclease and a single guide RNA (sgRNA). The Cas9 protein contains a PAM-interacting domain, a recognition lobe for sgRNA binding, and two nuclease domains: HNH and RuvC. The complex searches DNA by binding to protospacer adjacent motif (PAM) sequences, typically 5'-NGG-3', which triggers local unwinding of adjacent DNA. The sgRNA then undergoes strand invasion, forming an RNA-DNA hybrid with the complementary strand and displacing the non-complementary strand, a structure known as an R-loop. Complete R-loop formation activates Cas9 for cleavage: the HNH domain cleaves the strand complementary to the sgRNA, while the RuvC domain cleaves the non-complementary strand, generating a double-strand break (DSB) approximately 3 base pairs upstream of the PAM. The cell then repairs the DSB via one of two major pathways: non-homologous end joining (NHEJ), which is error-prone and introduces insertions or deletions (indels) causing gene disruption, or homology-directed repair (HDR), which uses an exogenous donor template to introduce precise sequence edits.",
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
    citation: {
      text: "Xia Y, et al. DNA repair pathway choices in CRISPR-Cas9 mediated genome editing. Frontiers in Genetics. 2021;12:prioritized. PMC8187289. Available from: https://pmc.ncbi.nlm.nih.gov/articles/PMC8187289/",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8187289/",
    },
  },
  {
    id: "blood-brain-barrier",
    category: "Neuroscience",
    difficulty: "Postgraduate",
    question:
      "Explain the cellular and molecular composition of the blood-brain barrier and describe three distinct transport mechanisms that regulate molecular entry into the CNS.",
    groundTruth:
      "The blood-brain barrier (BBB) is formed by specialised brain microvascular endothelial cells linked by tight junctions, resting on a basement membrane and closely associated with pericytes and astrocytic endfeet, together constituting the neurovascular unit. Tight junctions, composed of proteins including claudin-5 and occludin, create a highly selective physical barrier that prevents paracellular diffusion of most blood-borne solutes. Three major transport mechanisms regulate molecular entry into the CNS. First, transcellular diffusion allows small lipophilic molecules such as oxygen, carbon dioxide, and ethanol to cross the endothelial plasma membrane passively, provided their molecular weight is below approximately 400 Da. Second, carrier-mediated transport uses specific solute carriers, including GLUT1 for glucose and LAT1 for large neutral amino acids, to move essential hydrophilic nutrients selectively into the brain. Third, receptor-mediated transcytosis allows specific macromolecules to cross via receptor binding - the transferrin receptor and lipoprotein receptor-related protein 1 (LRP1) mediate uptake of transferrin and larger proteins respectively. Additionally, efflux pumps such as P-glycoprotein actively export drugs and xenobiotics back into the circulation, limiting CNS drug delivery.",
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
    citation: {
      text: "Rehman A, Bhatt DL. Physiology, Blood Brain Barrier. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023. Available from: https://www.ncbi.nlm.nih.gov/books/NBK557721/",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK557721/",
    },
  },
  {
    id: "antibody-diversity",
    category: "Immunology",
    difficulty: "Expert",
    question:
      "Describe the structural basis of antibody diversity and specificity, explaining how VDJ recombination and somatic hypermutation contribute to the adaptive immune response.",
    groundTruth:
      "Antibody diversity arises from two main processes operating at different stages of B cell development. During early B cell development in the bone marrow, V(D)J recombination assembles functional immunoglobulin genes from discrete gene segments. The lymphocyte-specific proteins RAG-1 and RAG-2 catalyse somatic recombination, joining variable (V), diversity (D), and joining (J) gene segments in the heavy chain locus and V and J segments in the light chain locus. Additional junctional diversity is generated by the enzyme terminal deoxynucleotidyl transferase (TdT), which inserts random non-templated nucleotides at the junctions between segments, and by P-nucleotide addition during hairpin opening. Combinatorial diversity from segment selection and junctional diversity together generate an estimated repertoire of at least 10^11 unique antibody specificities in naive B cells. Following antigen stimulation, activated B cells in germinal centres undergo somatic hypermutation, in which point mutations are introduced at a high rate into the variable regions of rearranged immunoglobulin genes. B cells expressing mutant receptors with higher affinity for antigen are preferentially selected to survive - a process called affinity maturation - progressively increasing the quality of the antibody response.",
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
    citation: {
      text: "Janeway CA Jr, Travers P, Walport M, et al. Immunobiology: The Immune System in Health and Disease. 5th edition. New York: Garland Science; 2001. Chapter 4: The Generation of Diversity in Immunoglobulins. Available from: https://www.ncbi.nlm.nih.gov/books/NBK27140/",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK27140/",
    },
  },
];

