export interface BiomedQuestion {
  id: string;
  category: string;
  difficulty: "Undergraduate" | "Postgraduate" | "Expert";
  module?: string;
  topic?: string;
  question: string;
  groundTruth: string;
  keyTerms: string[];
}

export const BIOMED_QUESTIONS: BiomedQuestion[] = [
  {
    id: "viruses-replication",
    category: "Immunology",
    difficulty: "Undergraduate",
    module: "BMD1001",
    topic: "Viruses I",
    question: "What are viruses, what are their structure, and how do they replicate inside a host cell?",
    groundTruth: "Viruses are obligate intracellular parasites; they are submicroscopic infectious agents that are not considered truly living organisms because they cannot generate their own energy or reproduce independently of a host cell. Every virus consists of at minimum two components: a nucleic acid genome, which can be either DNA or RNA and may be single-stranded or double-stranded, and a surrounding protein shell called a capsid (or a nucleocapsid). Together these form the infectious particle known as a virion. Capsid structures are typically icosahedral, helical or complex. Some viruses also carry an outer lipid membrane called an envelope, which is derived from the host cell membrane during release, while those without are termed naked viruses. The type of nucleic acid and the presence or absence of an envelope are key features used to classify viruses. Because viruses lack their own metabolism, they must infect a suitable host cell to reproduce. This process is governed by tropism, which is the specificity of a virus for a particular host species, tissue, or cell type. Viral replication follows a series of defined steps. First, the virus attaches to specific protein receptors on the surface of a compatible host cell; this receptor specificity determines which species and cell types the virus can infect. The virus then enters the cell, either by fusing its envelope directly with the plasma membrane or by being engulfed in a vesicle through endocytosis. Once inside, the viral capsid breaks down and releases the genome, a process called uncoating. The replication process varies by genome type: DNA viruses typically enter the host nucleus to use host DNA polymerase for replication, whereas RNA viruses usually remain in the cytoplasm, utilising their own viral-encoded RNA polymerase to produce new genomes. With the genome free inside the host cell, viral genes are expressed using the host cell's own ribosomes, enzymes, and energy supply. New viral proteins are synthesised, and copies of the viral genome are produced. These components are then assembled into new virions. Finally, new virions are released from the cell either by bursting it open (lysis) or by gradually budding out through the membrane.",
    keyTerms: ["obligate intracellular parasite", "capsid", "virion", "envelope", "naked", "icosahedral", "helical", "tropism", "attachment", "receptor", "uncoating", "RdRp", "budding", "lysis"]
  },
  {
    id: "coding-biosciences",
    category: "Core Skills in Biosciences",
    difficulty: "Undergraduate",
    module: "BMD1002",
    topic: "Introduction to Coding",
    question: "What is coding in the context of biosciences, and why is it a valuable skill for biomedical scientists?",
    groundTruth: "In the context of biosciences, coding means writing instructions in a programming language that a computer can follow. Rather than doing calculations by hand or using fixed menu-driven software, a scientist writes a script - a short text file of commands - that the computer runs automatically. Programming languages most used in biosciences include Python and R, both of which are free to download and have large communities producing tutorials aimed specifically at biology students. Modern biomedical research produces data at a scale that makes manual analysis impossible. A single genomics experiment can generate millions of data points; a clinical study may contain thousands of patient records. Coding allows a researcher to import those raw files, clean and filter the data, apply statistical tests, and draw graphs, all within a single reusable script. Because the script records every step taken, another scientist can run it on the same data and obtain identical results. This reproducibility is a fundamental requirement of good scientific practice. Even a basic ability to code is increasingly expected of biomedical graduates. Practical applications include downloading sequence data from databases such as GenBank or PubMed, running bioinformatics pipelines to compare DNA sequences, and working with large spreadsheets of clinical data far beyond what tools such as Excel can handle comfortably. Coding should therefore be thought of not as a purely technical skill but as a tool for asking better scientific questions and sharing findings transparently.",
    keyTerms: ["programming language", "script", "Python", "R", "automation", "reproducibility", "bioinformatics", "data analysis"]
  },
  {
    id: "drug-action-quantification",
    category: "Pharmacology",
    difficulty: "Undergraduate",
    module: "BMD1004",
    topic: "Quantification of Drug Action",
    question: "What are affinity, potency and efficacy, and how are they used to describe the action of agonist drugs?",
    groundTruth: "An agonist is a drug that binds to a receptor and activates it to produce a biological response. Three properties are used to describe and compare how different agonists behave: affinity, potency, and efficacy. Affinity describes how strongly a drug binds to its receptor. A drug with high affinity binds tightly and occupies receptors even at very low concentrations. Affinity is expressed as a dissociation constant (KD): the lower the KD value, the higher the affinity. The formula for calculating KD is: KD = ([D] x [R]) / [DR] where [D] is drug concentration, [R] is free receptor, and [DR] is the drug-receptor complex. Potency is related but distinct: it describes how much drug is needed to produce a given level of response. Potency is measured using the EC50, the concentration at which 50% of the maximum effect is achieved. It can be derived from the Hill equation: E = (Emax x [C]) / (EC50 + [C]), where [C] is the drug concentration. A drug with a lower EC50 is more potent. Efficacy (Emax) is determined by the peak response observed on a dose-response curve when all receptor sites are saturated. A full agonist produces the maximum possible tissue response. A partial agonist also activates the receptor but can only produce a submaximal response even when every receptor is occupied; it has lower efficacy than a full agonist. An antagonist has affinity for the receptor but zero efficacy: it binds without activating, and by occupying the receptor it prevents agonists from binding. Antagonists can be competitive (competing for the agonist binding site) or non-competitive (binding elsewhere), and their effects can be reversible or irreversible.",
    keyTerms: ["agonist", "affinity", "dissociation constant", "KD", "potency", "EC50", "efficacy", "Emax", "full agonist", "partial agonist", "antagonist"]
  },
  {
    id: "cell-signalling",
    category: "Core Concepts",
    difficulty: "Undergraduate",
    module: "BMD1003",
    topic: "Cell Signalling",
    question: "What is cell signalling, and what are the main classes of cell surface receptor involved in transmitting signals into the cell?",
    groundTruth: "Cell signalling is the process by which cells detect and respond to signals from their environment or from neighbouring cells. These signalling molecules, often called first messengers, are typically hydrophilic (polar) and cannot cross the membrane, or hydrophobic (lipophilic), which allows them to penetrate the membrane and bind to intracellular or nuclear receptors. Most signalling molecules such as hormones and neurotransmitters cannot cross the plasma membrane because they are too large or too charged. Cells therefore use receptor proteins located on their surface to detect these molecules and convert the extracellular signal into an intracellular response, a process called signal transduction. Cell-to-cell communication can occur over short distances via locally released molecules that act on nearby cells, or over long distances when hormones are secreted into the bloodstream and travel to distant target organs. A signalling molecule (the ligand) binds to a specific receptor, triggering a cascade of events inside the cell that ultimately generates a biological response. There are three principal classes of cell surface receptor. Ligand-gated ion channels open or close an ion channel directly when a ligand binds, producing a rapid electrical response by altering the membrane potential through the controlled flow of ions. G protein-coupled receptors (GPCRs) are the most abundant receptor family in the body. When activated, they stimulate intracellular G proteins which regulate the production of second messengers such as cyclic AMP (cAMP). cAMP then activates downstream enzymes, amplifying the original signal many times over. Enzyme-linked receptors, including receptor tyrosine kinases, act as enzymes themselves when activated and initiate phosphorylation cascades inside the cell. For example, the insulin receptor is a well-known enzyme-linked receptor that activates pathways to regulate and reduce blood glucose levels.",
    keyTerms: ["signal transduction", "ligand", "receptor", "ligand-gated ion channel", "GPCR", "second messenger", "cAMP", "phosphorylation", "amplification", "cellular response"]
  },
  {
    id: "protein-separation",
    category: "Molecules of Life",
    difficulty: "Undergraduate",
    module: "BMD1000",
    topic: "Separation Techniques",
    question: "What are the key techniques used to separate proteins, and what biophysical principles underlie affinity chromatography, size-exclusion chromatography, and polyacrylamide gel electrophoresis (PAGE)?",
    groundTruth: "Proteins can be separated and purified using techniques that exploit differences in their physical and chemical properties such as size, charge, and binding specificity. Three key techniques are affinity chromatography, size-exclusion chromatography, and polyacrylamide gel electrophoresis (PAGE), each based on distinct biophysical principles. Affinity chromatography separates proteins based on their specific binding interactions with a ligand that is immobilised on a stationary phase. The target protein binds selectively to the ligand, while other proteins pass through the column. The bound protein is then eluted by changing conditions such as pH or ionic strength. This technique relies on highly specific molecular recognition and reversible binding interactions. Size-exclusion chromatography, also known as gel filtration, separates proteins according to their size and shape. The column contains porous beads: large molecules cannot enter the pores and travel more quickly through the column, while smaller molecules enter the pores and are delayed. Larger proteins elute first and smaller ones later. This method is based on the principle of molecular sieving, where separation depends on the hydrodynamic volume of the proteins. Polyacrylamide gel electrophoresis (PAGE) separates proteins based on their size and charge by applying an electric field across a gel matrix. Proteins migrate through the gel toward the electrode of opposite charge, with smaller proteins moving more rapidly. In SDS-PAGE, sodium dodecyl sulfate denatures proteins and gives them a uniform negative charge, ensuring separation is based almost entirely on size. Together, affinity chromatography exploits binding specificity, size-exclusion chromatography separates by molecular size, and PAGE resolves protein mixtures by electrophoretic mobility.",
    keyTerms: ["affinity chromatography", "ligand", "size-exclusion chromatography", "gel filtration", "molecular sieving", "PAGE", "SDS-PAGE", "denaturation", "molecular weight", "elution", "charge", "binding"]
  },
  {
    id: "membrane-action-potential",
    category: "Cells to Systems",
    difficulty: "Undergraduate",
    module: "BMD1005",
    topic: "Principles of Excitability",
    question: "What are membrane potentials and action potentials, and how do the Nernst and Goldman equations describe the role of ions in generating electrical signals in excitable cells?",
    groundTruth: "Excitable cells such as neurons and muscle cells generate electrical signals by controlling the movement of ions across their plasma membrane. At rest, the inside of a cell is approximately -70 millivolts (mV) relative to the outside, known as the resting membrane potential. This arises because the plasma membrane is not equally permeable to all ions, and because active ion pumps maintain unequal concentrations of ions on either side. The sodium-potassium ATPase pump continuously moves three sodium ions out of the cell and two potassium ions in, using ATP, helping to keep sodium concentrated outside and potassium concentrated inside. This active transport helps establish the ionic gradients necessary to maintain a negative resting membrane potential. The Nernst equation calculates the equilibrium potential for a single ion species: the membrane voltage at which the electrical force on that ion exactly balances its concentration gradient so there is no net movement. Formula: E_ion = (61.5 / z) x log10([Ion]_out / [Ion]_in). For potassium, the Nernst potential is approximately -90 mV. The Goldman equation extends this to cover several ions simultaneously, weighting each by its relative permeability. Formula: Vm = 61.5 x log10((Pk[K]out + Pna[Na]out + Pcl[Cl]in) / (Pk[K]in + Pna[Na]in + Pcl[Cl]out)). At rest the membrane is most permeable to potassium, which is why the resting potential approximates but does not equal the potassium Nernst potential. An action potential is a rapid all-or-nothing reversal of membrane potential triggered when the membrane is depolarised beyond a threshold. Voltage-gated sodium channels open rapidly, causing sodium influx and depolarisation to approximately +40 mV. The delayed opening of voltage-gated potassium channels allows K+ to exit the cell, restoring the negative membrane potential (repolarisation). The sodium-potassium pump then restores the original ion gradients.",
    keyTerms: ["resting membrane potential", "sodium-potassium ATPase", "permeability", "Nernst equation", "Goldman equation", "equilibrium potential", "depolarisation", "repolarisation", "voltage-gated channels", "threshold", "action potential", "potassium channels"]
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
