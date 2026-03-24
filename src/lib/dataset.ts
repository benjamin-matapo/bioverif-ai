import { BIOMED_QUESTIONS, BiomedQuestion } from "@/lib/biomed-data";

export interface BenchmarkScenario extends BiomedQuestion {
  modelResponses: {
    chatgpt: string;
    gemini: string;
    claude: string;
  };
  citation: {
    text: string;
    url: string;
  };
}

export const BENCHMARK_DATASET: BenchmarkScenario[] = BIOMED_QUESTIONS.map((question) => {
  switch (question.id) {
    case "dna-replication":
      return {
        ...question,
        citation: question.citation,
        modelResponses: {
          chatgpt: "DNA replication maintains high fidelity through multiple error-correction mechanisms. DNA polymerase III incorporates nucleotides with high specificity and possesses 3' to 5' exonuclease proofreading activity that removes misincorporated bases. The mismatch repair system provides additional quality control where MutS recognizes base mismatches, MutL acts as a mediator, and MutH creates nicks in the newly synthesized strand at hemimethylated GATC sites. This combination reduces error rates from 1 in 10^7 after proofreading to approximately 1 in 10^9 after mismatch repair, ensuring genomic stability during cell division.",
          gemini: "During DNA replication, accuracy is achieved through several mechanisms. DNA polymerase selects correct nucleotides and can proofread by removing incorrect bases using its exonuclease function. After replication, the mismatch repair system detects and fixes remaining errors. Proteins like MutS scan for mismatches, while MutH identifies the new DNA strand through methylation patterns and cuts it. The error is then removed and the correct sequence is restored. This multi-layered approach ensures very low mutation rates in replicated DNA.",
          claude: "High-fidelity DNA replication involves coordinated quality control mechanisms. DNA polymerase III initially incorporates nucleotides with high selectivity and immediately proofreads using its intrinsic 3' to 5' exonuclease activity to excise mispaired bases. The mismatch repair pathway provides a second line of defense where MutS detects base-base mismatches and small loops, MutL facilitates repair complex formation, and MutH introduces strand-specific nicks at hemimethylated GATC sequences. This dual system achieves an overall error frequency of approximately 1 in 10^9 to 10^10 nucleotides per cell division, maintaining genomic integrity across generations."
        }
      };

    case "krebs-cycle":
      return {
        ...question,
        citation: question.citation,
        modelResponses: {
          chatgpt: "The Krebs cycle is primarily regulated at three irreversible steps that respond to cellular energy status. Citrate synthase, which condenses oxaloacetate and acetyl-CoA, is inhibited by high levels of ATP, NADH, and succinyl-CoA but activated by AMP and CoA. Isocitrate dehydrogenase is a key rate-limiting enzyme and is inhibited by ATP and NADH while being stimulated by ADP and calcium ions. Alpha-ketoglutarate dehydrogenase follows similar regulation patterns, inhibited by its products NADH and succinyl-CoA but activated by calcium. These allosteric mechanisms ensure the cycle slows when energy is abundant and accelerates when ATP demand increases.",
          gemini: "Key enzymes control the Krebs cycle based on energy levels. Citrate synthase starts the cycle and is inhibited when energy molecules like ATP are high. Isocitrate dehydrogenase is another important control point that slows down when ATP and NADH accumulate but speeds up with ADP and calcium. Alpha-ketoglutarate dehydrogenase also responds to energy signals. This regulation helps match the cycle's activity to the cell's energy needs, conserving resources when energy is plentiful and increasing production when it's needed.",
          claude: "Regulation of the Krebs cycle centers on three strategically placed irreversible enzymes that sense cellular energy charge through allosteric effectors. Citrate synthase catalyzes the initial condensation and is inhibited by ATP, NADH, and succinyl-CoA while being stimulated by AMP and free CoA. Isocitrate dehydrogenase serves as the primary rate-limiting step, inhibited by high-energy molecules but activated by ADP and Ca2+ during increased metabolic demand. Alpha-ketoglutarate dehydrogenase completes the regulatory triad, inhibited by NADH and succinyl-CoA but enhanced by calcium. This integrated control system modulates cycle flux according to the ATP/AMP ratio, ensuring efficient energy production."
        }
      };

    case "crispr-cas9":
      return {
        ...question,
        citation: question.citation,
        modelResponses: {
          chatgpt: "CRISPR-Cas9 gene editing operates through a ribonucleoprotein complex that targets specific DNA sequences. The Cas9 protein first recognizes a PAM sequence (typically NGG) using its PAM-interacting domain, which triggers local DNA unwinding. The single guide RNA then base pairs with the complementary DNA strand, forming an R-loop structure. This conformational change activates the HNH nuclease domain to cleave the complementary strand and the RuvC domain to cut the non-complementary strand, creating a blunt double-strand break. Cellular repair mechanisms determine the outcome: non-homologous end joining introduces indels for gene knockout, while homology-directed repair enables precise editing using donor templates.",
          gemini: "The CRISPR-Cas9 system works by combining the Cas9 protein with a guide RNA to cut DNA at specific locations. Cas9 first looks for a PAM sequence next to the target site. When found, the DNA unwinds and the guide RNA pairs with the target DNA. This activates two cutting domains in Cas9 that make a double-strand break. The cell then repairs this break either through NHEJ, which creates small insertions or deletions, or through HDR, which can make precise changes if a donor template is provided. This mechanism allows for targeted genome editing.",
          claude: "CRISPR-Cas9 gene editing relies on precise molecular recognition and cleavage mechanisms. The Cas9-sgRNA ribonucleoprotein complex initiates editing by scanning genomic DNA for the protospacer adjacent motif (PAM), typically 5'-NGG-3', which is recognized by the PAM-interacting domain. PAM binding triggers local DNA melting, allowing the 20-nucleotide sgRNA spacer to hybridize with the complementary strand and form an R-loop. This RNA-DNA interaction allosterically activates the HNH domain to cleave the target strand and the RuvC domain to cut the non-target strand, generating a blunt DSB three base pairs upstream of the PAM. The repair pathway choice determines editing outcomes: NHEJ creates disruptive indels while HDR enables precise sequence modifications."
        }
      };

    case "blood-brain-barrier":
      return {
        ...question,
        citation: question.citation,
        modelResponses: {
          chatgpt: "The blood-brain barrier consists of specialized brain microvascular endothelial cells connected by continuous tight junctions containing claudin-5, occludin, and ZO-1 proteins. These cells form the core of the neurovascular unit, supported by pericytes and astrocytic endfeet. Three main transport mechanisms regulate molecular entry: passive transcellular diffusion allows small lipophilic molecules like oxygen to cross directly through membranes; carrier-mediated transport uses specific proteins like GLUT1 for glucose and LAT1 for amino acids; and receptor-mediated transcytosis transports larger molecules via receptors such as the transferrin receptor. Additionally, efflux pumps like P-glycoprotein actively remove potentially harmful substances from the brain.",
          gemini: "The blood-brain barrier is made up of specialized endothelial cells with tight connections that prevent substances from passing between cells. These cells work with pericytes and astrocytes to form a protective barrier. Transport across this barrier occurs through several mechanisms. Small fat-soluble molecules can pass directly through the cell membranes. Essential nutrients like glucose require specific transport proteins such as GLUT1. Larger molecules may use receptor-mediated systems. The barrier also includes pumps that remove foreign substances, helping protect the brain from potentially harmful compounds.",
          claude: "The blood-brain barrier is a highly selective interface formed primarily by brain microvascular endothelial cells linked by continuous tight junctions composed of claudin-5, occludin, and ZO-1. This cellular barrier, integrated with pericytes and astrocytic endfeet within the neurovascular unit, effectively blocks paracellular diffusion. Molecular entry is regulated through distinct transport mechanisms: passive transcellular diffusion permits small lipophilic compounds like oxygen and carbon dioxide; carrier-mediated transport facilitates essential nutrient influx via GLUT1 for glucose and LAT1 for large neutral amino acids; and receptor-mediated transcytosis enables selective peptide and protein transport through transferrin and LRP1 receptors. Efflux transporters like P-glycoprotein actively export xenobiotics to maintain CNS homeostasis."
        }
      };

    case "antibody-diversity":
      return {
        ...question,
        citation: question.citation,
        modelResponses: {
          chatgpt: "Antibody diversity arises through sophisticated genetic mechanisms that generate enormous receptor variability. The basic antibody structure consists of two heavy and two light chains forming Y-shaped molecules with variable Fab regions for antigen binding and constant Fc regions for effector functions. VDJ recombination initiates diversity by randomly joining variable (V), diversity (D), and joining (J) gene segments through RAG1 and RAG2 recombinase activity, with junctional diversity enhanced by P-nucleotide addition and TdT-mediated N-nucleotide insertion. Following antigen exposure, somatic hypermutation driven by activation-induced cytidine deaminase introduces point mutations in germinal center B cells, enabling affinity maturation through selection of higher-affinity clones. This combinatorial process generates an estimated repertoire of 3×10^11 unique antibodies.",
          gemini: "Antibodies achieve remarkable diversity through genetic recombination and mutation processes. Each antibody has two heavy and two light chains that form a Y shape, with variable regions that bind antigens. During B cell development, VDJ recombination randomly combines different gene segments to create unique variable regions. This process is carried out by RAG enzymes and further diversified by adding random nucleotides. After encountering antigen, B cells undergo somatic hypermutation in their germinal centers, introducing additional mutations that can improve binding. Through selection of the best-binding variants, the immune system generates an enormous variety of antibodies capable of recognizing countless different targets.",
          claude: "Antibody diversity and specificity emerge from elegant genetic mechanisms operating at multiple levels. The fundamental Y-shaped structure comprises two identical heavy and light chains linked by disulfide bonds, featuring variable antigen-binding Fab domains and constant Fc regions. Initial diversity generation occurs through VDJ recombination, where RAG1 and RAG2 recombinases mediate somatic joining of variable, diversity, and joining gene segments in heavy chains and variable-joining segments in light chains. Junctional diversity is amplified through P-nucleotide addition at hairpin openings and TdT-mediated N-nucleotide insertion. Subsequent antigen stimulation triggers somatic hypermutation via activation-induced cytidine deaminase in germinal center B cells, introducing point mutations at approximately 10^-3 per base pair. Affinity maturation selects clones with enhanced receptor binding, yielding a combinatorial repertoire estimated at 3×10^11 unique specificities."
        }
      };

    default:
      throw new Error(`Unknown question ID: ${question.id}`);
  }
});
