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
    id: "viruses-replication",
    category: "Immunology",
    difficulty: "Undergraduate",
    question: "What are viruses, and how do they replicate inside a host cell?",
    groundTruth: "Viruses are submicroscopic infectious agents that are not considered truly living organisms because they cannot generate their own energy or reproduce independently. Every virus consists of at minimum two components: a nucleic acid genome, which can be either DNA or RNA and may be single-stranded or double-stranded, and a surrounding protein shell called a capsid. Together these form the infectious particle known as a virion. Some viruses also carry an outer lipid membrane called an envelope, derived from the host cell membrane during release. Because viruses lack their own metabolism, they must infect a suitable host cell to reproduce. Viral replication follows defined steps: attachment to specific receptor proteins on the host cell surface, entry by membrane fusion or endocytosis, uncoating to release the genome, hijacking of the host cell ribosomes and enzymes to synthesise viral proteins and replicate the genome, assembly of new virions, and finally release by lysis or budding. Receptor specificity at the attachment stage determines which species and cell types a virus can infect.",
    keyTerms: ["capsid", "virion", "nucleic acid", "envelope", "receptor", "endocytosis", "uncoating", "lysis", "budding", "replication"]
  },
  {
    id: "coding-biosciences",
    category: "Core Skills in Biosciences",
    difficulty: "Undergraduate",
    question: "What is coding in the context of biosciences, and why is it a valuable skill for biomedical scientists?",
    groundTruth: "In the context of biosciences, coding means writing instructions in a programming language that a computer can execute automatically. Rather than performing calculations manually or using fixed menu-driven software, a scientist writes a script that imports data, applies analyses, and outputs results in a fully reproducible sequence. Programming languages most commonly used in biosciences include Python and R, both free and widely supported by tutorials aimed at biology students. Modern biomedical research produces data at a scale that makes manual analysis impossible: a single genomics experiment can generate millions of data points and a clinical study may contain thousands of patient records. Coding allows a researcher to clean and filter raw data, apply statistical tests, and produce publication-quality visualisations within a single reusable script. Because the script records every analytical step, another scientist can run it on the same data and obtain identical results, satisfying the reproducibility requirement of good scientific practice. Practical applications include downloading sequences from databases such as GenBank, running bioinformatics pipelines, and working with large clinical datasets beyond the capacity of spreadsheet tools.",
    keyTerms: ["Python", "R", "script", "reproducibility", "bioinformatics", "data analysis", "GenBank", "pipeline", "statistical", "automation"]
  },
  {
    id: "drug-action-quantification",
    category: "Pharmacology",
    difficulty: "Undergraduate",
    question: "What are affinity, potency and efficacy, and how are they used to describe the action of agonist drugs?",
    groundTruth: "An agonist is a drug that binds to a receptor and activates it to produce a biological response. Three properties characterise how different agonists behave. Affinity describes how strongly a drug binds to its receptor; a high-affinity drug occupies receptors at very low concentrations. Affinity is expressed as the dissociation constant KD: the lower the KD, the higher the affinity. Potency describes how much drug is needed to produce a given level of response, measured by the EC50, which is the concentration producing 50% of the maximum effect. A drug with a lower EC50 is more potent. Importantly, high potency does not imply a large overall effect. Efficacy refers to the maximum response a drug can produce regardless of dose. A full agonist produces the maximum possible tissue response. A partial agonist activates the receptor but achieves only a submaximal response even when all receptors are occupied, reflecting lower intrinsic efficacy. An antagonist has affinity but zero efficacy: it occupies the receptor without activating it, thereby preventing agonist binding. Together, affinity, potency, and efficacy allow pharmacologists to compare drugs and predict clinical behaviour.",
    keyTerms: ["agonist", "affinity", "potency", "efficacy", "EC50", "KD", "dissociation constant", "full agonist", "partial agonist", "antagonist"]
  },
  {
    id: "cell-signalling",
    category: "Core Concepts",
    difficulty: "Undergraduate",
    question: "What is cell signalling, and what are the main classes of cell surface receptor involved in transmitting extracellular signals into the cell?",
    groundTruth: "Cell signalling is the process by which cells detect and respond to signals from their environment or from neighbouring cells. Most signalling molecules such as hormones and neurotransmitters cannot cross the plasma membrane because they are too large or too charged, so cells use receptor proteins on their surface to detect these molecules and convert the extracellular signal into an intracellular response through a process called signal transduction. Signalling can occur over short distances via locally released molecules or over long distances when hormones travel through the bloodstream to distant target organs. There are three principal classes of cell surface receptor. Ligand-gated ion channels open or close an ion channel directly when a ligand binds, producing a rapid electrical response. G protein-coupled receptors are the most abundant receptor family; when activated they stimulate intracellular G proteins which regulate production of second messengers such as cyclic AMP, amplifying the original signal. Enzyme-linked receptors, including receptor tyrosine kinases, act directly as enzymes when activated and initiate phosphorylation cascades inside the cell that alter gene expression or metabolism.",
    keyTerms: ["signal transduction", "ligand", "receptor", "G protein-coupled receptor", "ligand-gated ion channel", "receptor tyrosine kinase", "second messenger", "cyclic AMP", "phosphorylation", "hormone"]
  },
  {
    id: "protein-separation",
    category: "Molecules of Life",
    difficulty: "Undergraduate",
    question: "What biophysical principles underlie affinity chromatography, size-exclusion chromatography, and polyacrylamide gel electrophoresis (PAGE), and how are these techniques used to separate proteins?",
    groundTruth: "Separating proteins from complex biological mixtures is a core task in biomedical research. Three widely used techniques each exploit a different property of proteins. Affinity chromatography is based on specific reversible binding: a ligand that recognises the target protein is attached to a solid support inside a column. When the mixture is applied, only the target protein binds; all others wash through, and the target is recovered by changing the buffer to disrupt binding. This can achieve near-homogeneous purity in a single step. Size-exclusion chromatography, also called gel filtration, separates proteins by molecular size. The column contains porous beads: small proteins enter the pores and travel a longer path, exiting later, while large proteins are excluded and elute first. This technique can also be used to estimate molecular weight and exchange buffer conditions. SDS-polyacrylamide gel electrophoresis denatures proteins with sodium dodecyl sulphate, which unfolds all proteins and coats them with a uniform negative charge proportional to mass. When an electric field is applied, proteins migrate toward the positive electrode, with smaller proteins moving faster through the polyacrylamide mesh. Bands are visualised with a stain and compared to a molecular weight ladder.",
    keyTerms: ["affinity chromatography", "size-exclusion chromatography", "SDS-PAGE", "sodium dodecyl sulphate", "polyacrylamide", "molecular weight", "elution", "ligand", "denaturation", "electrophoresis"]
  },
  {
    id: "membrane-action-potential",
    category: "Cells to Systems",
    difficulty: "Undergraduate",
    question: "What are membrane potentials and action potentials, and how do the Nernst and Goldman equations describe the role of ions in generating electrical signals in excitable cells?",
    groundTruth: "Excitable cells such as neurons and muscle cells generate electrical signals by controlling ion movement across their plasma membrane. At rest, the inside of a neuron is approximately minus 70 millivolts relative to the outside, known as the resting membrane potential. This arises because the plasma membrane is selectively permeable to ions and because the sodium-potassium ATPase pump actively maintains unequal ion concentrations, moving three sodium ions out and two potassium ions in per cycle using ATP. The Nernst equation calculates the equilibrium potential for a single ion species: the membrane voltage at which the electrical driving force on that ion exactly balances its concentration gradient so there is no net movement. For potassium this is approximately minus 90 millivolts. The Goldman equation extends this to multiple ions simultaneously, weighting each by its membrane permeability. At rest the membrane is most permeable to potassium, which is why the resting potential approximates but does not equal the potassium Nernst potential. An action potential is a rapid all-or-nothing reversal of membrane potential. Voltage-gated sodium channels open first, causing sodium influx and depolarisation to approximately plus 40 millivolts. Voltage-gated potassium channels then open, allowing potassium efflux and repolarisation. The sodium-potassium pump restores ion gradients.",
    keyTerms: ["resting membrane potential", "action potential", "Nernst equation", "Goldman equation", "sodium-potassium ATPase", "voltage-gated", "depolarisation", "repolarisation", "ion channel", "permeability"]
  }
];

export const EMPTY_QUESTION_TEMPLATE: BiomedQuestion = {
  id: "",
  category: "",
  difficulty: "Undergraduate",
  question: "",
  groundTruth: "",
  keyTerms: []
}

export type QuestionBank = BiomedQuestion[]
