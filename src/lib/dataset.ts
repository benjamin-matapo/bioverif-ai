import { BIOMED_QUESTIONS, BiomedQuestion } from "@/lib/biomed-data";

export interface BenchmarkScenario extends BiomedQuestion {
  modelResponses: {
    chatgpt: string;
    gemini: string;
    claude: string;
    copilot: string;
    deepseek: string;
    grok: string;
  };
}

export const BENCHMARK_DATASET: BenchmarkScenario[] = BIOMED_QUESTIONS.map((question) => {
  switch (question.id) {
    case "bmd1001-viruses":
      return {
        ...question,
        modelResponses: {
          chatgpt: `Viruses are microscopic infectious agents that can only reproduce inside the cells of a living organism. Unlike bacteria, they are not cells, do not generate their own energy, and cannot reproduce independently.
You can think of a virus as a package of genetic instructions wrapped in protective material that hijacks a host cell's machinery to make more copies of itself.
What is a virus?
A virus contains:
Genetic material → instructions for making new viruses
Protective coating → shields the genetic material
Sometimes an outer membrane that helps infect cells
Viruses infect many organisms:
Humans
Animals
Plants
Fungi
Bacteria (these are called bacteriophages)
Examples:
COVID-19
Influenza
Human Immunodeficiency Virus Infection (caused by HIV)

Structure of a virus

Most viruses contain these parts:
1. Genetic material (Genome)
The viral genome stores instructions for replication.
This can be:
DNA or RNA
Single-stranded (ss) or double-stranded (ds)
Examples:
Human cells → double-stranded DNA
Many viruses → RNA genomes

2. Capsid
A protein coat surrounding the genome.
Functions:
Protects viral genetic material
Helps bind to host cells
Gives shape to the virus
Capsids are made from protein units called capsomeres.
Common shapes:
Helical → spiral
Icosahedral → roughly spherical with many faces
Complex → mixed structure (common in bacteriophages)

3. Envelope (present in some viruses)
Some viruses have an extra lipid membrane stolen from the host cell.
Embedded in the envelope are surface proteins (spikes).
Functions:
Recognition of host cells
Entry into cells
Immune system interactions
Examples:
COVID-19 virus is enveloped
Flu viruses are enveloped
Non-enveloped viruses rely only on their capsid.

How viruses replicate inside a host cell
Viruses follow a general infection cycle:

1. Attachment (Adsorption)
The virus attaches to specific receptors on the host cell surface.
This step determines which cells can be infected.
Example:
Some respiratory viruses attach mainly to cells lining the airways.

2. Entry (Penetration)
The virus enters the host cell.
Methods include:
Fusion with the cell membrane
Endocytosis (cell engulfs virus)
Injection of genetic material

3. Uncoating
The capsid breaks apart.
The viral genome is released into the cell.

4. Replication and Protein Synthesis
The virus takes control of the host cell.
The host machinery:
Copies viral genetic material
Produces viral proteins
DNA and RNA viruses may replicate differently.

5. Assembly (Maturation)
New viral genomes and proteins assemble into complete viruses.

6. Release
New viruses leave the cell by:
Lysis → bursting the cell
Budding → viruses pinch off while taking part of the membrane
Released viruses infect nearby cells.

Why viruses are difficult to treat
They reproduce inside human cells
Antiviral drugs must target viruses without damaging host cells
Viruses can mutate rapidly
Prevention methods include:
Vaccination
Hygiene
Limiting transmission routes
In short: a virus is genetic material enclosed in a protein shell (sometimes with an envelope) that survives by entering host cells and using those cells to produce more viruses.`,
          gemini: `Viruses are microscopic infectious agents that can only reproduce inside the cells of a living organism. Unlike bacteria, they are not cells, do not generate their own energy, and cannot reproduce independently.
You can think of a virus as a package of genetic instructions wrapped in protective material that hijacks a host cell's machinery to make more copies of itself.
What is a virus?
A virus contains:
Genetic material → instructions for making new viruses
Protective coating → shields the genetic material
Sometimes an outer membrane that helps infect cells
Viruses infect many organisms:
Humans
Animals
Plants
Fungi
Bacteria (these are called bacteriophages)
Examples:
COVID-19
Influenza
Human Immunodeficiency Virus Infection (caused by HIV)

Structure of a virus

Most viruses contain these parts:
1. Genetic material (Genome)
The viral genome stores instructions for replication.
This can be:
DNA or RNA
Single-stranded (ss) or double-stranded (ds)
Examples:
Human cells → double-stranded DNA
Many viruses → RNA genomes

2. Capsid
A protein coat surrounding the genome.
Functions:
Protects viral genetic material
Helps bind to host cells
Gives shape to the virus
Capsids are made from protein units called capsomeres.
Common shapes:
Helical → spiral
Icosahedral → roughly spherical with many faces
Complex → mixed structure (common in bacteriophages)

3. Envelope (present in some viruses)
Some viruses have an extra lipid membrane stolen from the host cell.
Embedded in the envelope are surface proteins (spikes).
Functions:
Recognition of host cells
Entry into cells
Immune system interactions
Examples:
COVID-19 virus is enveloped
Flu viruses are enveloped
Non-enveloped viruses rely only on their capsid.

How viruses replicate inside a host cell
Viruses follow a general infection cycle:

1. Attachment (Adsorption)
The virus attaches to specific receptors on the host cell surface.
This step determines which cells can be infected.
Example:
Some respiratory viruses attach mainly to cells lining the airways.

2. Entry (Penetration)
The virus enters the host cell.
Methods include:
Fusion with the cell membrane
Endocytosis (cell engulfs virus)
Injection of genetic material

3. Uncoating
The capsid breaks apart.
The viral genome is released into the cell.

4. Replication and Protein Synthesis
The virus takes control of the host cell.
The host machinery:
Copies viral genetic material
Produces viral proteins
DNA and RNA viruses may replicate differently.

5. Assembly (Maturation)
New viral genomes and proteins assemble into complete viruses.

6. Release
New viruses leave the cell by:
Lysis → bursting the cell
Budding → viruses pinch off while taking part of the membrane
Released viruses infect nearby cells.

Why viruses are difficult to treat
They reproduce inside human cells
Antiviral drugs must target viruses without damaging host cells
Viruses can mutate rapidly
Prevention methods include:
Vaccination
Hygiene
Limiting transmission routes
In short: a virus is genetic material enclosed in a protein shell (sometimes with an envelope) that survives by entering host cells and using those cells to produce more viruses.`,
          claude: `Viruses are fascinating — they sit right on the boundary of living and non-living. Here's a breakdown of what they are, how they're built, and how they hijack cells to reproduce.
What are viruses?
Viruses are obligate intracellular parasites — submicroscopic infectious agents that can only replicate inside a living host cell. They're not considered fully "alive" because they have no metabolism, no ribosomes, and cannot reproduce independently. They carry genetic information (DNA or RNA) and use the host cell's machinery to copy themselves.
Structure
At their core, all viruses share a few basic components. The genome is either DNA or RNA (never both), and can be single- or double-stranded. It's wrapped in a protein shell called the capsid, made of repeating units called capsomeres. Together, the genome + capsid is the nucleocapsid. Many (but not all) viruses are then wrapped in a lipid bilayer envelope, derived from the host cell membrane, which contains viral glycoproteins used for attachment. Viruses without this envelope are called "naked" viruses (e.g. adenovirus).
Now here's a structural diagram showing the anatomy, followed by a diagram of the replication cycle:

Replication cycle
The replication cycle varies by virus type, but the general steps are consistent:
Attachment — Viral surface proteins (glycoproteins or capsid proteins) bind to specific receptor molecules on the host cell surface. This is highly specific — it's why certain viruses only infect certain cell types or species.
Entry — The virus enters either by membrane fusion (enveloped viruses merging their lipid bilayer with the cell membrane) or by endocytosis (the cell engulfs the viral particle).
Uncoating — Once inside, the capsid is broken down and the viral genome is released into the cytoplasm or nucleus.
Replication & transcription — The viral genome hijacks the cell's ribosomes and polymerases to copy its genome and produce viral mRNA, which is then translated into viral proteins.
Assembly — New viral genomes and structural proteins are assembled into new virion particles.
Release — New virions exit the cell either by budding (taking a piece of the host membrane as their envelope) or by lysing (bursting) the cell.You can tap any step in the cycle to ask a follow-up question about it.

A few things worth noting about variation in the replication process. DNA viruses (like herpesviruses) typically replicate inside the nucleus, using host DNA polymerases. RNA viruses (like influenza or coronaviruses) replicate in the cytoplasm, often using their own RNA-dependent RNA polymerase. Retroviruses (like HIV) are a special case — they carry an enzyme called reverse transcriptase that converts their RNA genome into DNA, which is then integrated permanently into the host's chromosomes as a provirus.
The specificity of attachment in step 1 is also what determines tissue tropism — for instance, SARS-CoV-2 binds the ACE2 receptor, which is highly expressed in lung and airway epithelium, explaining why COVID-19 primarily affects the respiratory tract.`,
          copilot: `Viruses are obligate intracellular parasites—they cannot reproduce on their own and must enter a living host cell to make new copies of themselves. They consist of genetic material (DNA or RNA) enclosed in a protein capsid, and many also have a lipid envelope. Once inside a host cell, they replicate through a multi‑stage cycle involving attachment, entry, uncoating, replication, assembly, and release.

What viruses are
Viruses are microscopic infectious agents made of:
Genetic material — either DNA or RNA, never both.
Capsid — a protective protein shell built from capsomeres.
Envelope (optional) — a lipid membrane stolen from the host cell, often containing spike glycoproteins used for attachment.
They are acellular (not made of cells) and non‑living outside a host because they lack ribosomes, enzymes, and metabolic machinery.

Viral structure in more detail
Nucleic acid — can be single‑ or double‑stranded DNA or RNA.
Capsid — helical, icosahedral, or complex in shape.
Envelope (in enveloped viruses) — derived from host membrane; contains viral proteins for host recognition.
Nucleocapsid — genome + capsid together.
Surface proteins — determine which cells a virus can infect (tropism).
These structural features determine how a virus enters cells and how it replicates.

How viruses replicate inside a host cell
Although details vary among DNA, RNA, and retroviruses, all follow the same core stages:
1. Attachment
Viral surface proteins bind to specific receptors on the host cell membrane—like a lock‑and‑key mechanism.
2. Entry (Penetration)
Depending on the virus:
Endocytosis (cell engulfs the virus)
Membrane fusion (enveloped viruses)
Genome injection (bacteriophages)
3. Uncoating
Capsid is removed by host or viral enzymes, releasing the genome into the cytoplasm.
4. Replication (Synthesis)
The virus hijacks host ribosomes and enzymes to:
Copy its genome
Produce viral proteins
DNA and RNA viruses differ in how they replicate, but the principle is the same: host machinery is redirected to make viral components.
5. Assembly
New virions self‑assemble as capsids form around newly replicated genomes.
6. Release
Two main methods:
Lysis — cell bursts, releasing many virions (common in non‑enveloped viruses).
Budding — virions exit one‑by‑one, taking part of the host membrane as an envelope (common in enveloped viruses).

Why this matters
Understanding viral structure and replication explains:
Why antibiotics don't work on viruses
How vaccines train the immune system to recognize viral proteins
Why some viruses cause latent infections (e.g., herpes)
How antiviral drugs target specific replication steps

If you want, I can also explain differences between DNA and RNA virus replication, how retroviruses like HIV work, or how the immune system fights viruses.`,
          deepseek: `This is an excellent set of foundational questions in virology. Here's a detailed breakdown.

What are Viruses?

In short, viruses are tiny, non-living infectious agents that can only replicate inside the living cells of a host organism (bacteria, plants, animals, etc.).

They exist in a gray area between living and non-living:
- Why they are considered NON-living: They are not cells. They have no metabolism, cannot generate energy, cannot grow, cannot respond to their environment, and cannot reproduce on their own. Outside a host cell, they exist as inert particles called virions.
- Why they are considered living (by some): They possess genetic material (DNA or RNA) and can evolve through natural selection. Once inside a host cell, they hijack the cellular machinery to direct the synthesis of new viruses, effectively replicating.

Key characteristics:
- Extremely small (typically 20-300 nanometers). Most are invisible to light microscopes.
- Obligate intracellular parasites (they must be inside a cell to replicate).
- Highly specific for their host cells (e.g., a cold virus infects nose/lung cells, not gut cells).

Viral Structure (The Virion)

A complete virus particle, or virion, is a package designed to deliver its genetic material into a host cell. It has a relatively simple structure composed of a few core components:

1. The Core (Inside)
- Nucleic Acid Genome: The virus's genetic blueprint. This can be DNA or RNA, but never both. It can be single-stranded (ss) or double-stranded (ds). This is one of the main ways viruses are classified.
- Capsid: A protein coat that surrounds and protects the fragile genome. It's made of many identical protein subunits called capsomeres. The capsid can have different shapes:
    - Helical: Rod-shaped (e.g., Tobacco mosaic virus).
    - Icosahedral: 20-sided, roughly spherical (e.g., Adenovirus, Herpesvirus).
    - Complex: Neither helical nor icosahedral, like the head-tail structure of bacteriophages (viruses that infect bacteria).

2. The Envelope (Sometimes Present)
- Definition: A lipid membrane that surrounds the capsid in some viruses (called enveloped viruses).
- Origin: The virus steals a piece of the host cell's own membrane (e.g., from the nucleus or cell surface) as it exits the cell.
- Components: Contains lipids and proteins, including viral glycoproteins (spikes) that stick out from the envelope.
- Function: The glycoproteins are crucial for recognizing and binding to receptors on a new host cell. The envelope is fragile, making these viruses easier to kill with soap, alcohol, or detergents (e.g., Influenza, HIV, SARS-CoV-2).
- Non-enveloped viruses (e.g., Rhinovirus - common cold, Poliovirus) have only a capsid. They are generally tougher and can survive harsher conditions (like stomach acid).

How Do They Replicate Inside a Host Cell?

Viruses cannot replicate by themselves. They must enter a host cell and take over its machinery (ribosomes, enzymes, energy) to produce new viral parts. The process is typically broken down into five (or six) steps:

Step 1: Attachment (Adsorption)
The virus binds to specific receptor molecules on the surface of a susceptible host cell. This is like a "lock and key" mechanism and explains why viruses are specific to certain cell types (e.g., HIV binds to CD4 receptors on T-helper immune cells).

Step 2: Entry (Penetration)
The virus enters the cell.
- Non-enveloped: Often taken in via endocytosis, where the cell membrane engulfs the virus, pulling it inside a vesicle.
- Enveloped: Can enter by endocytosis or direct fusion of the viral envelope with the cell membrane, releasing the capsid directly into the cytoplasm.

Step 3: Uncoating
Once inside, the viral capsid is broken down by cellular enzymes, releasing the viral genome (DNA or RNA) into the cell's interior. Now the virus is just "naked" genetic material ready to be used.

Step 4: Replication & Gene Expression (The "Eclipse" Phase)
This is the most complex step and differs dramatically between DNA and RNA viruses. The virus uses the host's machinery to:
- Replicate its genome (make many copies of the viral DNA or RNA).
- Produce viral proteins (using host ribosomes to translate viral mRNA).

Key Differences:
- DNA viruses (e.g., Herpes, Smallpox) generally replicate in the nucleus and use the host cell's RNA polymerase to make mRNA.
- RNA viruses (e.g., Flu, COVID-19, Polio) have to carry or encode their own special enzyme called RNA-dependent RNA polymerase because host cells do not normally make RNA from an RNA template. Most replicate in the cytoplasm.
- Retroviruses (e.g., HIV) have an RNA genome but are a special case. They carry the enzyme reverse transcriptase to convert their RNA genome into DNA, which then inserts into the host's own genome.

Step 5: Assembly (Maturation)
New viral genomes and capsid proteins assemble into hundreds of new viral particles. Enveloped viruses acquire their envelope at this stage by "budding" through a cellular membrane (e.g., the cell's outer membrane or the Golgi apparatus), which places the viral spikes on the surface.

Step 6: Release
The newly formed viruses exit the cell to go infect other cells.
- Lysis (Non-enveloped): The cell swells with new viruses and bursts open (lyses), killing the host cell. This is common for simpler viruses like Polio and Adenovirus.
- Budding (Enveloped): The virus pushes out through the cell membrane, wrapping itself in a piece of it. The cell can survive this for a while, releasing viruses over time without immediately dying (e.g., HIV, Influenza).

Simple Analogy: Think of a virus as a criminal with a fake ID (the capsid/envelope). It hands the ID to a bank guard (host cell receptor - Step 1), gets inside the bank (cell - Step 2), breaks open its briefcase (uncoating - Step 3), and hands the fake blueprint (viral genome) to the bank's own printers (host ribosomes/enzymes). The printers then follow the fake instructions to print millions of counterfeit bills (new viral genomes) and counterfeit plates (capsid proteins). Finally, the counterfeiters pack the bills in bags (assembly - Step 5) and either blow up the bank from the inside (lysis) or slip out the back door one by one (budding - Step 6) to rob other banks.`,
          grok: `Viruses are microscopic infectious agents that exist at the boundary between living and non-living things. They are obligate intracellular parasites, meaning they can only replicate inside the living cells of a host organism (bacteria, archaea, plants, animals, or fungi). Outside a host cell, viruses are inert particles — they do not carry out metabolism, grow, or reproduce on their own.

Key Characteristics
- They are much smaller than cells (typically 20-300 nanometers).
- They contain genetic material but lack the cellular machinery (ribosomes, enzymes for energy production, etc.) needed to make proteins or replicate independently.
- They are not considered truly "alive" by most biologists because they do not meet all criteria for life (e.g., independent metabolism and reproduction).

Structure of Viruses

Viruses have a simple but highly efficient architecture:

1. Genetic Material (Genome)
   - Either DNA or RNA (never both in the same virus).
   - Can be single-stranded (ss) or double-stranded (ds).
   - Can be linear or circular.
   - RNA viruses are more prone to mutation because RNA replication is less accurate than DNA replication.

2. Capsid
   - A protein shell made of repeating subunits called capsomeres.
   - Protects the genome and helps the virus attach to host cells.
   - Common shapes:
     - Icosahedral (spherical/20-faced, e.g., adenovirus, poliovirus).
     - Helical (rod-shaped, e.g., tobacco mosaic virus, influenza).
     - Complex (neither purely icosahedral nor helical, e.g., bacteriophages with tails).

3. Envelope (in some viruses)
   - A lipid bilayer derived from the host cell membrane.
   - Studded with viral glycoproteins (spikes) that help with attachment and entry.
   - Enveloped viruses are generally more fragile (sensitive to detergents, drying, etc.).
   - Examples: HIV, influenza, SARS-CoV-2, herpesviruses.
   - Non-enveloped ("naked") viruses are hardier: norovirus, adenovirus, poliovirus.

4. Additional Structures (in some viruses)
   - Enzymes (e.g., reverse transcriptase in retroviruses like HIV).
   - Tail structures in bacteriophages for injecting DNA into bacteria.

The complete infectious particle is called a virion.

How Viruses Replicate Inside a Host Cell

The viral replication cycle generally follows these main steps (though details vary by virus type):

1. Attachment (Adsorption)
   - The virus binds to specific receptor molecules on the surface of the host cell.
   - This is highly specific (e.g., HIV binds to CD4 on T-cells; SARS-CoV-2 binds to ACE2 receptors).

2. Entry (Penetration)
   - Enveloped viruses: Often enter by membrane fusion or endocytosis.
   - Non-enveloped viruses: May inject nucleic acid (like bacteriophages) or be taken in by endocytosis and then disrupt the vesicle.
   - The virus (or at least its genome) gets inside the cell.

3. Uncoating
   - The capsid is removed, releasing the viral genome into the host cell's cytoplasm or nucleus.

4. Biosynthesis (Replication and Gene Expression)
   This is the core "hijacking" phase:
   - The virus uses the host's ribosomes, enzymes, and energy to:
     - Replicate its genome (DNA or RNA).
     - Produce viral mRNA and then viral proteins (capsid proteins, enzymes, envelope proteins, etc.).
   - Different strategies exist:
     - DNA viruses: Often replicate in the nucleus using host DNA polymerase (or their own).
     - RNA viruses: Usually replicate in the cytoplasm using their own RNA-dependent RNA polymerase.
     - Retroviruses (e.g., HIV): Use reverse transcriptase to convert RNA into DNA, which then integrates into the host genome (provirus).

5. Assembly (Maturation)
   - Newly synthesized viral genomes and proteins self-assemble into new virions.
   - This can happen in the cytoplasm, nucleus, or at the cell membrane.

6. Release
   - Lytic release: The host cell bursts (lysis), releasing many new viruses (common in many bacteriophages and some animal viruses).
   - Budding: Enveloped viruses push out through the host membrane, acquiring their envelope (host cell often survives longer).
   - Some viruses (e.g., herpes) can remain latent for long periods.

Lytic vs. Lysogenic Cycles (Especially in Bacteriophages)
- Lytic cycle: Immediate replication and cell destruction.
- Lysogenic cycle: Viral DNA integrates into host genome as a prophage and replicates passively with the host cell until triggered to switch to lytic cycle (e.g., by stress).

Summary: Viruses are elegant genetic parasites that evolved to efficiently deliver their genome into a host cell and redirect the cell's machinery to produce more viruses. Their simplicity allows rapid evolution and high mutation rates (especially in RNA viruses), which is why they can cause pandemics and evade immune systems or drugs so effectively.`
        }
      };

    case "bmd1002-coding":
      return {
        ...question,
        modelResponses: {
          chatgpt: `In biosciences, coding (programming) means writing instructions that tell a computer how to process biological data, automate analysis, model biological systems, and solve scientific problems.
Biomedical scientists use coding to work with the enormous amounts of data generated in modern biology and healthcare—far more than could realistically be analysed manually.
What does coding look like in biosciences?
Instead of building apps or websites, coding in biosciences is often used to:
Analyse experimental data
Example: processing results from gene expression experiments or clinical studies.
Work with large biological datasets (bioinformatics)
Example: comparing DNA sequences to identify mutations.
Visualise scientific results
Creating graphs, heatmaps, dashboards, and statistical summaries.
Automate repetitive laboratory tasks
Such as cleaning datasets, formatting reports, or processing instrument outputs.
Model biological systems
Simulating disease spread, protein interactions, or population genetics.
Apply machine learning and AI to healthcare
For pattern detection in medical images or predicting outcomes from data.

Common coding languages used in biosciences
Python → one of the most popular languages for scientific computing, data analysis, machine learning, and bioinformatics.
R → heavily used for statistics, genomics, and biological data visualisation.
SQL → used to query and manage biological and clinical databases.
MATLAB → sometimes used for modelling and computational biology.
Bash/Linux scripting → useful for automating analysis pipelines and working on research servers.

Why is coding valuable for biomedical scientists?
1. Biomedical research produces huge amounts of data
Modern technologies generate millions or billions of data points.
Examples:
DNA sequencing
Microscopy imaging
Clinical datasets
Proteomics and genomics
Coding allows scientists to analyse this efficiently.

2. Improves accuracy and reproducibility
Manual spreadsheet work can introduce mistakes.
A script:
performs the same process every time,
documents methods clearly,
makes results easier to reproduce.

3. Enables advanced scientific discovery
Coding supports fields such as:
Bioinformatics
Computational Biology
Genomics
Machine Learning
These areas are becoming increasingly important in medicine and biomedical research.

4. Expands career opportunities
Coding can open pathways into:
Biomedical research
Clinical data science
Bioinformatics
Pharmaceutical development
Health technology
AI in healthcare

Simple example
Imagine a biomedical scientist has blood test results from 10,000 patients.
Without coding:
Open spreadsheets
Filter manually
Calculate averages individually
With coding:
Load data automatically
Clean missing values
Generate statistics
Create charts
Produce a report in seconds
So, in biosciences, coding is less about software development and more about using computers as scientific tools to analyse, automate, model, and discover patterns in biological and medical data.`,
          gemini: `In the context of biosciences, coding (or computer programming) is the practice of writing instructions for computers to store, organize, analyze, and visualize massive amounts of biological data.
For decades, biology was primarily a wet-lab science—focused on test tubes, petri dishes, and manual observations. However, the explosion of modern genomic sequencing, high-resolution imaging, and molecular modeling has transformed biology into a deeply data-driven discipline. Biosciences coding acts as the bridge between raw biological data and meaningful scientific discovery.
What Does "Coding in Biosciences" Actually Look Like?
When a biomedical scientist codes, they aren't building mobile apps or video games; they are usually focused on three core areas:
1. Bioinformatics and Data Processing
Modern lab equipment can sequence billions of DNA base pairs or track the expression of thousands of genes simultaneously. Standard software like Excel completely crashes under this scale of data. Scientists write scripts to clean this "noisy" data, filter out errors, and map genetic sequences.
2. Statistical Analysis and Data Visualization
Biomedical research requires rigorous proof that a result isn't just a fluke. Coding allows scientists to run complex statistical tests and generate publication-quality figures—such as heatmaps of gene expression or volcanic plots of drug interactions—that make complex trends immediately clear.
3. Modeling and Simulation
Before testing a drug on animals or humans, scientists can use code to simulate how a molecule interacts with a disease receptor in a virtual environment (in silico). This accelerates drug discovery and reduces lab costs.
The Common Languages:
Python: The undisputed king of scientific computing due to its simplicity and powerful libraries (like Pandas for data manipulation, and Biopython for biological computation).
R: The gold standard for statistical analysis, data visualization, and bioinformatics packages (especially via Bioconductor).
Why Coding is a Vital Skill for Biomedical Scientists
As the field evolves, computational literacy is transitioning from a "nice-to-have" bonus to an absolute necessity. Here is why it is so valuable:
1. Handling the "Big Data" Explosion
The cost of sequencing a human genome has plummeted from billions of dollars to under $100. This has created a massive bottleneck: we can generate data faster than we can analyze it. A biomedical scientist who can code can independently parse through huge public repositories (like GenBank or the UK Biobank) to find patterns without relying on an external programmer.
2. Automation and Efficiency
If you need to analyze the cell images of 500 different patients, doing it manually could take months and introduce human error. Writing a simple script can automate image processing, running the analysis on all 500 files in a matter of minutes with flawless consistency.
3. Enhancing Reproducibility
A cornerstone of the scientific method is that other scientists must be able to replicate your results. If your analysis involves dragging, dropping, and clicking through software menus, it's easy to forget a step. If you code your analysis, your script is your exact methodology. Sharing your code means any scientist in the world can run it on their own data to verify your findings.
4. Career Versatility and High Demand
The intersection of tech and biology is booming. Companies in pharmaceuticals, personalized medicine, agricultural tech, and public health are aggressively hunting for "bilingual" professionals—people who deeply understand human pathology and biology, but can also speak the language of data science.`,
          claude: `What coding means in biosciences
In biosciences, "coding" refers to writing instructions in a programming language to automate tasks, analyse data, build models, or create tools — all applied to biological or biomedical problems. It is not just a technical add-on; it has become part of the scientific method itself for many researchers. The most common languages are Python (dominant in data science and ML), R (statistical analysis and visualisation), and Bash (managing files and running pipelines on computing clusters).
The biological context is important here. Modern experiments routinely generate data at a scale that is simply impossible to handle manually. A single RNA sequencing run might produce expression measurements for 20,000 genes across hundreds of samples. A genomics study might involve terabytes of sequencing reads. Drug screening assays can produce millions of data points. Without code, most of this data would be unworkable.
Where coding shows up in biomedical science
The diagram below maps the core application areas:`,
          copilot: `Coding in the biosciences means using programming to analyse biological data, model biological systems, and automate scientific workflows. For a modern biomedical scientist, it's not just a bonus skill — it's becoming as fundamental as knowing how to use a pipette.
Takeaway: Coding lets biomedical scientists handle massive datasets, uncover patterns impossible to see by eye, and accelerate discoveries in genomics, disease research, and drug development.

What "coding" means in biosciences
In this context, coding refers to writing instructions in languages like Python, R, MATLAB, or SQL to perform tasks such as:
Data analysis — processing gene expression data, sequencing reads, proteomics datasets
Bioinformatics workflows — aligning DNA sequences, annotating genomes, identifying mutations
Modelling biological systems — simulating epidemics, metabolic pathways, protein folding
Automation — controlling lab instruments, analysing images, running pipelines
Machine learning — predicting disease risk, classifying cells, analysing medical images
It's essentially the digital extension of laboratory science.

Why coding is valuable for biomedical scientists
Here are the most important reasons, each tied to real scientific needs:
1. Handling big biological data
Modern biology generates huge datasets:
Whole-genome sequencing
Single-cell RNA-seq
High-throughput screening
Medical imaging
Coding allows you to clean, analyse, and interpret this data efficiently.
2. Reproducibility
Scripts can be rerun, shared, and version-controlled — something manual analysis can't match. This is essential for trustworthy science.
3. Speed and automation
Tasks that take hours manually (e.g., counting cells, analysing gels, processing FASTQ files) can be automated to run in seconds.
4. Better experimental design
Coding helps you simulate experiments, estimate sample sizes, and test hypotheses before going to the bench.
5. Interdisciplinary collaboration
Biomedical research increasingly involves:
Computer scientists
Statisticians
Clinicians
Data engineers
Coding lets you speak the same "language" and contribute meaningfully.
6. Career advantage
Roles that now expect coding skills include:
Bioinformatician
Computational biologist
Genomics analyst
Data scientist in pharma
AI/ML in healthcare
Even wet-lab roles increasingly value computational literacy.

A non-obvious insight
Coding doesn't replace wet-lab skills — it amplifies them.
The most impactful biomedical scientists today are "hybrid" researchers who can:
design experiments at the bench
analyse the results computationally
integrate findings with large public datasets
This combination dramatically accelerates discovery.`,
          deepseek: `This is an excellent question, as the role of coding is rapidly transforming biomedical research and clinical practice.

In the context of biosciences, coding (or programming) refers to writing precise, step-by-step instructions in a specialized language (like Python, R, or SQL) that a computer can follow to analyze biological data, automate tasks, build models, or manage information.

It is not about software engineering for its own sake. Instead, it's a powerful research and problem-solving tool, much like a pipette or a microscope, but for the vast, complex, and increasingly digital world of biological data.

What Does Coding Enable in Biosciences?

A biomedical scientist who codes can move beyond using standard, "point-and-click" software with fixed functions. They can perform custom, reproducible, large-scale analyses. Key applications include:

1. Analyzing Massive Datasets ("Omics" Data): Genomics (DNA sequences), transcriptomics (RNA expression), proteomics (proteins). A single DNA sequencing run can produce terabytes of data, impossible to analyze by hand. Code aligns sequences, identifies mutations, and quantifies gene expression.
2. Image Analysis: Automatically counting cells in a microscope image, measuring tumor volume in an MRI, or tracking the movement of a protein in a live-cell movie.
3. Modeling Biological Systems: Simulating how a heart valve experiences stress, how a drug spreads through the body (pharmacokinetics), or how a neural network in the brain fires.
4. Automating Repetitive Tasks: Instead of manually renaming 10,000 files or reformatting an Excel sheet daily, a short script can do it in seconds, eliminating human error.
5. Creating Reproducible Research: A coded analysis pipeline is a perfect record. Another scientist can run the exact same code on the same raw data to verify the results, solving the "reproducibility crisis" in science.
6. Designing and Managing Databases: For clinical trials or longitudinal studies, code (especially SQL) is essential for storing, querying, and linking patient data, lab results, and treatment outcomes securely and efficiently.

Why is Coding a Valuable Skill for Biomedical Scientists?

In the modern landscape, coding is shifting from a "nice-to-have" to a core competency. Here's why:

Traditional Challenge vs Solution with Coding:
"I have too much data to handle." (e.g., 5,000 patient genomes) → Code can process and analyze millions of data points in minutes, scaling effortlessly.
"I can't reproduce my analysis." (Used a GUI like Excel, clicked 30 steps, forgot two) → Code provides a complete, exact, and shareable record of every step.
"This analysis is impossible with standard tools." (Need a unique statistical test or image processing filter) → Code allows you to build exactly what you need, from scratch or by combining existing libraries.
"This took me 3 hours in a spreadsheet." (A task that will be repeated weekly) → Code automates the task, turning 3 hours into 3 seconds of execution time.
"I'm not sure if my results are an artifact." (Need to test robustness or run 10,000 simulations) → Code makes it trivial to re-run analyses with different parameters or to perform powerful resampling statistics.

The Two Most Important Languages for Biomedical Scientists

1. Python: The general-purpose powerhouse. Easy to learn, incredibly versatile, has dominant libraries for AI/machine learning (TensorFlow, PyTorch), image processing (scikit-image, OpenCV), and general data science. Best for: Omics data analysis, machine learning, deep learning, image analysis, automation, and integrating complex systems.
2. R: The statistical specialist. Unparalleled ecosystem of packages for statistical modeling and graphing. The tidyverse set of packages makes data manipulation intuitive, and ggplot2 is the gold standard for publication-quality figures. Best for: Statistical analysis, clinical trial data analysis, bioinformatics (via Bioconductor), creating complex data visualizations.

Coding is the literacy of the 21st-century bioscientist. It transforms you from a consumer of data into a powerful investigator who can ask any question and go find the answer in the digital haystack of modern biology.`,
          grok: `Coding in the context of biosciences refers to the use of programming languages and computational tools to analyze, model, visualize, and interpret biological data. It is a core component of bioinformatics, computational biology, and data-driven biomedical research.

Unlike traditional "wet lab" work (pipettes, cell cultures, etc.), coding enables "dry lab" approaches that handle the massive, complex datasets generated by modern technologies like next-generation sequencing (NGS), single-cell omics, medical imaging, proteomics, and high-throughput screening.

Common Programming Languages and Tools
- Python: The most popular general-purpose language. Versatile for data analysis, machine learning, automation, and building pipelines. Key libraries: Biopython, Pandas, NumPy, SciPy, Matplotlib/Seaborn, scikit-learn, TensorFlow/PyTorch.
- R: Excellent for statistical analysis, visualization, and bioinformatics-specific packages. Key ecosystem: Bioconductor (for genomics, RNA-seq, etc.).
- Others: Bash/UNIX for pipelines, SQL for databases, MATLAB (less common now), and occasionally Julia or C++ for performance-critical tasks.

Coding here often involves scripting to process data, run statistical tests, create reproducible workflows, and integrate with biological databases (e.g., NCBI, UniProt, Ensembl).

Key Applications in Biosciences and Biomedicine
- Genomics and Omics Analysis: Processing DNA/RNA sequences, variant calling, differential gene expression, metagenomics.
- Data Visualization and Statistics: Creating publication-quality plots, performing hypothesis testing, and handling big data that would be impossible manually.
- Machine Learning and AI: Predicting protein structures (e.g., AlphaFold), drug discovery, disease diagnostics, image analysis (microscopy, MRI/CT scans).
- Modeling and Simulation: Systems biology models of pathways, pharmacokinetics, or epidemic spread.
- Automation: Lab protocols, data pipelines, robotic liquid handlers, or literature mining.
- Synthetic Biology and Engineering: Designing genetic circuits or engineering microbes.

Why Is Coding a Valuable Skill for Biomedical Scientists?

1. Explosion of Biological Data ("Big Data")
Modern experiments generate terabytes of data. Coding skills allow scientists to analyze it efficiently, extract meaningful insights, and avoid bottlenecks with commercial software.

2. Reproducibility and Rigor
Code-based workflows (e.g., using Jupyter notebooks or R Markdown) make analyses transparent, shareable, and reproducible — a major requirement in high-quality research and publications.

3. Independence and Collaboration
Biomedical researchers who can code perform their own data analysis instead of relying entirely on bioinformaticians. They also become better collaborators in interdisciplinary teams.

4. Career and Research Advantages
- Enhances employability in academia, pharma, biotech, and healthcare tech. Many positions now expect or prefer coding skills.
- Opens doors to specialized fields like bioinformatics, computational biology, data science in biomedicine, and AI-driven drug development.
- Enables innovation: faster hypothesis testing, custom tools, and integration of AI.

5. Efficiency and Scalability
Automate repetitive tasks, scale analyses to thousands of samples, and build models that simulate complex biological systems.

6. Future-Proofing
With advances in personalized medicine, genomics, and AI, coding is becoming essential rather than optional. Biomedical science graduates with these skills have a clear edge in research higher degrees and the workforce.

In short, coding transforms biomedical scientists from data consumers into data creators and innovators. While you don't need to become a full software engineer, foundational skills in Python or R (plus understanding of statistics and biology) are highly practical and increasingly expected in the field.`
        }
      };

    case "bmd1004-pharmacology":
      return {
        ...question,
        modelResponses: {
          chatgpt: `When describing how agonist drugs work, three important ideas are affinity, potency, and efficacy. These terms describe different aspects of the interaction between a drug and its receptor.
An agonist is a drug that binds to a receptor and activates it, producing a biological response.

1. Affinity – how strongly a drug binds to a receptor
Affinity is the tendency of a drug to attach to its target receptor.
A drug with:
High affinity → binds easily and remains attached more strongly
Low affinity → binds less readily
Affinity tells us about binding, not necessarily the size of the response.
Example
Imagine receptors as locks and drugs as keys:
A key that fits very well → high affinity
A key that fits poorly → low affinity
A drug may bind extremely well but still not strongly activate the receptor.

2. Potency – how much drug is needed to produce an effect
Potency describes the amount (dose or concentration) of drug required to produce a given effect.
A more potent drug:
Produces the same effect at a lower concentration
A less potent drug:
Requires a higher concentration
Potency is commonly measured using:
EC50 → concentration that produces 50% of the maximum response
Lower EC50 → greater potency.
Example
If:
Drug A produces pain relief at 5 mg
Drug B requires 50 mg
Drug A is more potent.
Potency does not mean stronger maximum effect.

3. Efficacy – the maximum effect a drug can produce
Efficacy (sometimes called intrinsic activity) describes the greatest biological response achievable once the drug binds.
A drug with:
High efficacy → produces a large maximal response
Low efficacy → produces a smaller maximal response
Types of agonists
Full agonist → produces the maximum possible response
Partial agonist → activates receptors but cannot produce the full response even at high doses
Example concept:
A partial agonist may occupy all receptors but still never reach the maximum effect of a full agonist.

Putting them together
Imagine turning on a light:
Affinity → how well your hand grips the switch
Potency → how little effort is needed to turn it on
Efficacy → how bright the light can ultimately become

How these describe agonist action
Agonist drugs are described using all three because they answer different questions:
Property: Affinity
Question answered: Does the drug bind well to the receptor?
Property: Potency
Question answered: How much drug is needed?
Property: Efficacy
Question answered: How large is the maximum response?

So an agonist could:
bind strongly (high affinity),
work at low doses (high potency),
and produce a large effect (high efficacy)—
or it may have only some of these properties.
Together, these concepts help pharmacologists predict and compare how drugs behave in the body.`,
          gemini: `In pharmacology, affinity, potency, and efficacy are the three core properties used to describe how a drug interacts with a receptor and produces a biological response.
When talking about agonists (drugs that bind to a receptor and actively trigger a cellular response), these three terms have very distinct, precise meanings. Understanding the difference between them is fundamental to predicting how a drug will behave in the body.
1. Defining the Core Concepts
Affinity: The "Sticky" Factor
What it is: The ability of a drug to bind to its target receptor. It describes the chemical attraction or "tightness" of the bond between the drug molecule and the receptor site.
How it's measured: By the equilibrium dissociation constant (KD). A lower KD value means higher affinity, because it takes a smaller concentration of the drug to occupy 50% of the receptors.
Key takeaway: Affinity is purely about binding, not the action that follows. A drug can have incredibly high affinity but cause zero cellular response (which is how antagonists work).
Efficacy: The "Power" Factor
What it is: The ability of a drug, once bound, to activate the receptor and produce a functional biological response. It measures the intrinsic activity of the drug-receptor complex.
How it's measured: By looking at the maximum possible effect (Emax) the drug can achieve at a high enough dose.
Key takeaway: Efficacy determines whether an agonist is a Full Agonist (produces a 100% maximal tissue response) or a Partial Agonist (produces a sub-maximal response, even when 100% of the receptors are occupied).
Potency: The "Amount" Factor
What it is: The amount or concentration of a drug required to produce a specific magnitude of effect (typically 50% of its own maximal response).
How it's measured: By the EC50 value (Effective Concentration 50%). A lower EC50 means a drug is more potent, because you need less of it to get the job done.
Key takeaway: Potency depends on both affinity (how well it binds) and efficacy (how well it activates). A highly potent drug isn't necessarily more dangerous or more effective overall; it just means the required dose is physically smaller (e.g., milligrams vs. grams).
2. Visualizing Agonist Action
Pharmacologists map these concepts using concentration-response curves (log dose-response curves). These visual tools make it easy to compare different drugs.
Comparing Efficacy vs. Potency
Metric: Potency Comparison
Visual Shift on a Graph: Left/Right Shift: A curve shifted to the left represents a more potent drug (EC50 is reached at a lower concentration).
Biological Meaning: Drug A (left) requires a smaller dose than Drug B (right) to achieve the exact same partial effect.
Metric: Efficacy Comparison
Visual Shift on a Graph: Up/Down Shift: A curve with a higher peak represents a drug with higher efficacy (Emax is greater).
Biological Meaning: Drug A (high peak) is a Full Agonist. Drug C (low peak) is a Partial Agonist; it can never match the maximum effect of Drug A, no matter how much you give.`,
          claude: `Key Pharmacological Terms for Agonist Drugs
These three terms describe different aspects of how agonist drugs interact with receptors and produce biological effects:
Affinity
Definition: The strength of binding between a drug and its receptor
What it measures: How tightly a drug binds to a receptor
Determined by: The equilibrium dissociation constant (Kd) - lower Kd = higher affinity
Clinical relevance: High affinity drugs can achieve effects at lower concentrations
Potency
Definition: The amount of drug needed to produce a given effect
What it measures: Drug concentration or dose required to achieve a specific response (often 50% of maximum, or EC50)
Factors affecting potency: Affinity, efficacy, and pharmacokinetic properties
Clinical relevance: More potent drugs require smaller doses (e.g., fentanyl vs. morphine)
Efficacy
Definition: The maximum response a drug can produce
What it measures: The ability of a drug-receptor complex to activate cellular responses
Types of agonists:
Full agonist: Maximum efficacy (100% response)
Partial agonist: Submaximal efficacy even at full receptor occupancy
Clinical relevance: Determines the ceiling effect of a drug
Key Relationships
A drug can have high affinity but low efficacy (partial agonist)
Potency depends on both affinity and efficacy
Efficacy is generally more clinically important than potency - what matters most is whether the drug can achieve the desired therapeutic effect`,
          copilot: `Affinity, potency, and efficacy are three core pharmacological concepts used to describe how agonist drugs interact with receptors and produce biological effects. They each capture a different aspect of drug action — how well a drug binds, how much drug is needed, and how strongly it activates a receptor.
Takeaway:
Affinity = how tightly a drug binds
Potency = how much drug is needed
Efficacy = how well the drug activates the receptor
Together, they explain why some agonists are stronger, faster, or more effective than others.

Affinity — how well a drug binds to its receptor
Affinity describes the strength of the interaction between an agonist and its receptor.
High-affinity agonists bind tightly and stay bound longer.
Low-affinity agonists bind loosely and dissociate quickly.
It is often quantified by the dissociation constant (Kd) — lower Kd means higher affinity.
Why it matters:
Affinity determines how easily a drug can occupy receptors, which influences its potency.

Potency — how much drug is needed to produce an effect
Potency refers to the amount of drug required to produce a given effect (often 50% of the maximal effect, EC50).
A more potent agonist needs a lower dose to achieve the same effect.
A less potent agonist needs a higher dose.
Potency depends on both:
Affinity (how well it binds)
Efficacy (how well it activates the receptor)
Why it matters:
Potency helps determine clinical dosing — how much drug a patient needs.

Efficacy — how strongly a drug activates the receptor
Efficacy describes the ability of a bound agonist to activate the receptor and produce a biological response.
Full agonists → high efficacy (produce maximal response)
Partial agonists → lower efficacy (cannot produce full response even at full receptor occupancy)
Inverse agonists → negative efficacy (reduce baseline receptor activity)
Efficacy is independent of affinity — a drug can bind tightly but activate poorly.
Why it matters:
Efficacy determines the maximum effect a drug can produce, regardless of dose.

How these three concepts describe agonist drug action
They work together to explain the full pharmacological profile:
Concept: Affinity
What it describes: Binding strength
Why it matters for agonists: Determines receptor occupancy
Concept: Potency
What it describes: Dose required
Why it matters for agonists: Determines how much drug is needed
Concept: Efficacy
What it describes: Activation strength
Why it matters for agonists: Determines maximal possible effect

A drug with:
High affinity + high efficacy → very potent full agonist
High affinity + low efficacy → potent partial agonist
Low affinity + high efficacy → effective but requires higher doses

A non-obvious insight
Potency is not the same as efficacy.
A partial agonist can be more potent than a full agonist if it has higher affinity — but it will never produce the same maximal effect.
This is why partial agonists (like buprenorphine) can act as both agonists and functional antagonists depending on the context.`,
          deepseek: `This is a fundamental concept in pharmacology. These three terms—affinity, potency, and efficacy—describe the relationship between a drug (an agonist) and its receptor, and they explain the resulting biological response.

Here is the breakdown of each term and how they work together to describe an agonist's action.

The Core Analogy

Imagine a lock (the receptor) and a key (the agonist drug).
- Affinity is how well the key fits into the lock.
- Efficacy is what the key does once inside the lock (e.g., opens the door, unlocks a deadbolt).
- Potency is how little of the key you need to open the door a little bit.

Now, let's define each term precisely.

1. Affinity: The "Stickiness"
Definition: Affinity is the strength of binding between a drug and its receptor. It describes how well the drug "sticks" to the receptor's binding site.
- High affinity: The drug binds tightly and does not easily let go. It will occupy the receptor even at very low concentrations.
- Low affinity: The drug binds weakly and quickly detaches. You need a much higher concentration to keep the receptor occupied.
How it's measured: Affinity is typically represented by the Kd (dissociation constant). A smaller Kd value means higher affinity (because you need less drug to keep half the receptors bound).
Key point for agonists: High affinity is necessary but not sufficient. A drug can bind very tightly (high affinity) but do nothing to the receptor—that would be an antagonist, not an agonist.

2. Efficacy (Intrinsic Activity): The "Action"
Definition: Efficacy is the ability of a drug to activate a receptor once it is bound. This is the most important property of an agonist. It measures the size of the biological effect produced per receptor bound.
- Full agonist (High efficacy): Produces the maximum possible biological response the receptor system is capable of (e.g., natural neurotransmitter like adrenaline).
- Partial agonist (Moderate efficacy): Binds to the receptor but produces a sub-maximal response, even when all receptors are occupied.
- Antagonist (Zero efficacy): Binds (has affinity) but produces no response. It just blocks the receptor.
Key point: Efficacy is independent of affinity. A partial agonist could have very high affinity (sticks tightly) but still produce only a weak response.

3. Potency: The "Power per Dose"
Definition: Potency is a measure of how much drug you need to produce a given effect. It is a function of both affinity and efficacy.
Specifically, potency is usually defined as the concentration of a drug required to produce 50% of its maximum possible effect. This value is called the EC50 (Half Maximal Effective Concentration).
- High potency: A low dose (small EC50) produces the effect.
- Low potency: A high dose (large EC50) is needed.
Key point: Potency is not the same as maximum effect (efficacy). A very potent drug can be a partial agonist (low max effect), and a less potent drug can be a full agonist (high max effect).

How They Work Together to Describe Agonist Action

Imagine two drugs, Drug A and Drug B, that act on the same receptor. You measure their effects by plotting Dose (concentration) on the x-axis and Response on the y-axis, generating a dose-response curve.

Potency: The dose needed for 50% of the max effect (EC50) → Position of the curve along the x-axis (dose). Left curve = higher potency.
Efficacy: The maximum possible effect the drug can produce (Emax) → Height of the curve's plateau on the y-axis. Higher plateau = higher efficacy.
Affinity: Contributes to potency, but also determines receptor occupancy → Inferred from binding studies, but not directly from the effect curve for agonists.

The Most Important Distinction for Agonists
Efficacy (max effect) is more clinically important than potency.
Why? Because you can always give more of a low-potency drug to reach the desired effect (up to the maximum efficacy). However, you cannot overcome low efficacy—a partial agonist will never produce a full response, no matter how much you give.`,
          grok: `Affinity, potency, and efficacy are three fundamental concepts in pharmacology used to describe and compare how drugs interact with their targets (usually receptors) and produce biological effects. They are particularly important for understanding agonist drugs, which bind to receptors and activate them to produce a response.

1. Affinity
Definition: Affinity is a measure of the strength of binding between a drug and its receptor.
It reflects how tightly the drug attaches to the receptor.
Key measure: Usually expressed as the dissociation constant (Kd) or inhibition constant (Ki). A lower Kd/Ki means higher affinity.
High-affinity drugs bind effectively even at low concentrations.
Affinity is a property of the drug-receptor interaction and is independent of the drug's ability to activate the receptor.
Example: A drug with high affinity can occupy receptors at nanomolar concentrations, while a low-affinity drug might need micromolar concentrations for the same receptor occupancy.

2. Potency
Definition: Potency refers to the amount (dose or concentration) of drug required to produce a specific level of effect (often 50% of the maximum response).
Key measure: EC50 (Effective Concentration for 50% of maximal response) on a dose-response curve. A lower EC50 means higher potency.
Potency depends on both affinity (binding) and efficacy (ability to activate).
More potent drugs produce the same effect at lower doses.
Note: Potency is relative. A drug can be very potent but still have low efficacy (limited maximum effect).

3. Efficacy (Intrinsic Efficacy or Intrinsic Activity)
Definition: Efficacy is the maximum response (effect) a drug can produce when it occupies all available receptors, regardless of the dose.
It measures how effectively a drug activates the receptor and triggers the downstream signaling once bound.
Key measure: Emax (maximum effect) on a dose-response curve.
Full agonists have high (or full) efficacy — they can produce the maximum possible response the system can achieve.
Partial agonists have lower efficacy — they produce a submaximal response even when all receptors are occupied.

How These Concepts Describe Agonist Drugs

Agonists mimic the action of endogenous ligands (natural substances like hormones or neurotransmitters) by binding and activating receptors.

Relationship between the three:
- Affinity determines how well the drug binds.
- Efficacy determines how strongly it activates the receptor after binding.
- Potency is a combined result of affinity + efficacy (plus factors like tissue distribution and receptor density).

Visualizing with Dose-Response Curves
Imagine plotting log(dose) on the x-axis and % of maximum response on the y-axis:
- High potency agonist: Curve shifted to the left (low EC50).
- Low potency agonist: Curve shifted to the right (high EC50).
- High efficacy (full agonist): Curve reaches 100% maximum response.
- Low efficacy (partial agonist): Curve plateaus at a lower maximum (e.g., 40-60%).

Example:
- Morphine (full agonist at mu-opioid receptors): High efficacy, can produce full pain relief and respiratory depression.
- Buprenorphine (partial agonist at mu-opioid receptors): High affinity and good potency, but lower efficacy → ceiling effect on respiratory depression (safer in overdose) but may not provide as strong analgesia in severe pain.`
        }
      };

    case "bmd1003-cell-signalling":
      return {
        ...question,
        modelResponses: {
          chatgpt: `Cell signalling (cell communication) is the process by which cells detect, transmit, and respond to information from their environment or from other cells.
It allows cells to coordinate activities such as:
Growth and development
Immune responses
Metabolism
Movement
Gene expression
Tissue repair
Maintaining stable internal conditions (homeostasis)
Cells communicate using chemical signalling molecules (often called ligands) such as hormones, neurotransmitters, and growth factors.
The general process is:
Signal reception → a signalling molecule binds to a receptor
Signal transduction → the receptor converts the external signal into intracellular events
Cellular response → the cell changes behaviour (e.g., activates genes, releases molecules, divides)

What are cell surface receptors?
Cell surface receptors are proteins embedded in the cell membrane.
Their job is to:
Detect extracellular signals
Convert them into intracellular responses
These receptors are essential because many signalling molecules cannot pass directly through the membrane.
The three main classes are:

1. Ligand-gated ion channels (Ion channel-linked receptors)
These receptors open or close an ion channel when a signalling molecule binds.
Mechanism:
Ligand binds receptor
Channel changes shape
Ions move across membrane
Electrical or chemical changes occur
Common ions:
Sodium (Na+)
Potassium (K+)
Calcium (Ca2+)
Chloride (Cl-)
Characteristics:
Extremely fast responses (milliseconds)
Important in nervous system signalling
Example:
Nicotinic acetylcholine receptor
Function:
Transmission of nerve impulses
Muscle contraction

2. G protein-coupled receptors (GPCRs)
GPCRs are the largest receptor family in humans.
They span the membrane seven times and activate intracellular G proteins.
Mechanism:
Ligand binds receptor
G protein becomes activated
Intracellular signalling pathways begin
Second messengers are produced
Common second messengers:
cAMP
IP3
DAG
Calcium
Characteristics:
Responses occur in seconds
Can amplify signals greatly
Examples:
Adrenaline receptors
Odour receptors
Many hormone receptors
Functions:
Heart rate regulation
Vision
Smell
Metabolism

3. Enzyme-linked receptors (Catalytic receptors)
These receptors either:
Have enzyme activity themselves, or
Activate associated enzymes.
The most important group is receptor tyrosine kinases (RTKs).
Mechanism:
Ligand binds receptor
Receptors pair together (dimerisation)
Enzyme activity activates
Intracellular proteins become phosphorylated
Cellular responses occur
Characteristics:
Responses are slower than ion channels
Often regulate long-term changes
Examples:
Epidermal Growth Factor Receptor
Insulin receptor
Functions:
Cell growth
Cell division
Differentiation
Survival

Summary table:
Receptor class: Ligand-gated ion channels
Main mechanism: Open ion channels
Speed: Very fast
Typical function: Nerve signalling
Receptor class: GPCRs
Main mechanism: Activate G proteins and second messengers
Speed: Fast-moderate
Typical function: Hormones, senses
Receptor class: Enzyme-linked receptors
Main mechanism: Trigger enzyme pathways
Speed: Slower
Typical function: Growth and metabolism

So, cell signalling is the process of cells receiving and responding to information, and cell surface receptors act as the communication gateways that translate external signals into cellular actions.`,
          gemini: `Cell signalling (cell communication) is the process by which cells detect, transmit, and respond to information from their environment or from other cells.
It allows cells to coordinate activities such as:
Growth and development
Immune responses
Metabolism
Movement
Gene expression
Tissue repair
Maintaining stable internal conditions (homeostasis)
Cells communicate using chemical signalling molecules (often called ligands) such as hormones, neurotransmitters, and growth factors.
The general process is:
Signal reception → a signalling molecule binds to a receptor
Signal transduction → the receptor converts the external signal into intracellular events
Cellular response → the cell changes behaviour (e.g., activates genes, releases molecules, divides)

What are cell surface receptors?
Cell surface receptors are proteins embedded in the cell membrane.
Their job is to:
Detect extracellular signals
Convert them into intracellular responses
These receptors are essential because many signalling molecules cannot pass directly through the membrane.
The three main classes are:

1. Ligand-gated ion channels (Ion channel-linked receptors)
These receptors open or close an ion channel when a signalling molecule binds.
Mechanism:
Ligand binds receptor
Channel changes shape
Ions move across membrane
Electrical or chemical changes occur
Common ions:
Sodium (Na+)
Potassium (K+)
Calcium (Ca2+)
Chloride (Cl-)
Characteristics:
Extremely fast responses (milliseconds)
Important in nervous system signalling
Example:
Nicotinic acetylcholine receptor
Function:
Transmission of nerve impulses
Muscle contraction

2. G protein-coupled receptors (GPCRs)
GPCRs are the largest receptor family in humans.
They span the membrane seven times and activate intracellular G proteins.
Mechanism:
Ligand binds receptor
G protein becomes activated
Intracellular signalling pathways begin
Second messengers are produced
Common second messengers:
cAMP
IP3
DAG
Calcium
Characteristics:
Responses occur in seconds
Can amplify signals greatly
Examples:
Adrenaline receptors
Odour receptors
Many hormone receptors
Functions:
Heart rate regulation
Vision
Smell
Metabolism

3. Enzyme-linked receptors (Catalytic receptors)
These receptors either:
Have enzyme activity themselves, or
Activate associated enzymes.
The most important group is receptor tyrosine kinases (RTKs).
Mechanism:
Ligand binds receptor
Receptors pair together (dimerisation)
Enzyme activity activates
Intracellular proteins become phosphorylated
Cellular responses occur
Characteristics:
Responses are slower than ion channels
Often regulate long-term changes
Examples:
Epidermal Growth Factor Receptor
Insulin receptor
Functions:
Cell growth
Cell division
Differentiation
Survival

Summary table:
Receptor class: Ligand-gated ion channels
Main mechanism: Open ion channels
Speed: Very fast
Typical function: Nerve signalling
Receptor class: GPCRs
Main mechanism: Activate G proteins and second messengers
Speed: Fast-moderate
Typical function: Hormones, senses
Receptor class: Enzyme-linked receptors
Main mechanism: Trigger enzyme pathways
Speed: Slower
Typical function: Growth and metabolism

So, cell signalling is the process of cells receiving and responding to information, and cell surface receptors act as the communication gateways that translate external signals into cellular actions.`,
          claude: `Cell Signalling
What is Cell Signalling?
Cell signalling is the process by which cells communicate with each other and respond to their environment. It involves:
Extracellular signals (ligands): hormones, neurotransmitters, growth factors, cytokines
Reception: Detection of signals by specific receptors
Transduction: Conversion of the signal into intracellular biochemical changes
Response: Altered cell function (gene expression, metabolism, movement, etc.)
This allows cells to coordinate activities, respond to stimuli, and maintain homeostasis.
Main Classes of Cell Surface Receptors
1. Ligand-Gated Ion Channels (Ionotropic Receptors)

Mechanism: Ligand binding directly opens an ion channel
Speed: Very fast (milliseconds)
Examples:
Nicotinic acetylcholine receptors
GABA-A receptors
Glutamate receptors (NMDA, AMPA)
Function: Rapid neurotransmission
2. G Protein-Coupled Receptors (GPCRs)

Mechanism: Ligand binding activates intracellular G proteins, which modulate second messengers (cAMP, IP3, DAG, Ca²⁺)
Speed: Seconds to minutes
Structure: 7 transmembrane domains
Examples:
Adrenergic receptors (α, β)
Muscarinic acetylcholine receptors
Opioid receptors
Dopamine receptors
Function: Most common drug targets (~30% of all medications)
3. Enzyme-Linked Receptors

Mechanism: Ligand binding activates intrinsic or associated enzyme activity
Speed: Minutes to hours
Main types:
Receptor tyrosine kinases (RTKs): Insulin receptor, growth factor receptors (EGF, PDGF)
Receptor serine/threonine kinases: TGF-β receptors
Cytokine receptors: Associated with JAK-STAT pathway
Function: Cell growth, differentiation, metabolism
4. Nuclear Receptors (Intracellular)

Mechanism: Lipophilic ligands cross membrane and bind intracellular receptors that act as transcription factors
Speed: Hours to days
Examples:
Steroid hormone receptors (glucocorticoids, estrogen, testosterone)
Thyroid hormone receptors
Vitamin D receptors
Function: Gene transcription and long-term cellular changes
Summary Table
Receptor Type	Speed	Examples	Primary Mechanism
Ion channels	Milliseconds	Nicotinic, GABA-A	Ion flux
GPCRs	Seconds	Adrenergic, muscarinic	G proteins → second messengers
Enzyme-linked	Minutes-hours	Insulin, growth factors	Protein phosphorylation
Nuclear	Hours-days	Steroids, thyroid	Gene transcription`,
          copilot: `Cell signalling is the process by which cells detect, interpret, and respond to external signals such as hormones, neurotransmitters, growth factors, or environmental cues. It allows cells to coordinate behaviour, regulate growth, maintain homeostasis, and respond to changes in their surroundings. At its core, signalling begins when an extracellular ligand binds to a cell-surface receptor, triggering intracellular changes through signal transduction pathways.

What cell signalling is
Cell signalling involves:
A ligand (the signalling molecule)
A receptor (usually on the cell surface)
Intracellular signalling cascades that amplify and transmit the message
A cellular response (e.g., gene expression, ion flux, metabolism changes)
Because many signalling molecules are hydrophilic or large, they cannot cross the plasma membrane and must bind to cell-surface receptors to relay their message.

Main classes of cell-surface receptors
Cell-surface receptors are transmembrane proteins with an extracellular ligand-binding domain, a membrane-spanning region, and an intracellular domain that initiates signalling. They fall into three major classes:

1. Ion channel-linked receptors (Ligand-gated ion channels)
These receptors act as gates that open or close when a ligand binds.
Allow rapid flow of ions such as Na+, K+, Ca2+
Change the cell's membrane potential
Crucial in neuronal signalling and muscle contraction
Example: Nicotinic acetylcholine receptor.

2. G-protein-coupled receptors (GPCRs)
GPCRs are the largest family of cell-surface receptors and have a characteristic seven-transmembrane-helix structure.
Ligand binding activates an associated G protein
G proteins trigger downstream enzymes or ion channels
Involved in vision, smell, neurotransmission, hormone responses
Example: Beta-adrenergic receptor.

3. Enzyme-linked receptors (e.g., receptor tyrosine kinases)
These receptors have an intrinsic enzymatic activity or are directly associated with enzymes.
Ligand binding often causes dimerization
Activates intracellular kinase domains
Initiates phosphorylation cascades controlling growth, survival, and differentiation
Example: Insulin receptor.

Why these receptor classes matter
Each receptor type converts an extracellular signal into a distinct intracellular response:
Ion channels → rapid electrical changes
GPCRs → versatile second-messenger pathways
Enzyme-linked receptors → long-term changes like gene expression and cell growth
Together, they allow cells to respond precisely and appropriately to a wide range of signals.`,
          deepseek: `This is a fantastic follow-up question that connects pharmacology (drugs/receptors) to fundamental cell biology.

Here is a breakdown of cell signalling and the major receptor classes involved.

What is Cell Signalling?
Cell signalling is the complex system of communication that governs basic cellular activities and coordinates cell actions. It is the process by which a cell detects, interprets, and responds to signals in its external environment.

Think of it like a relay race with three essential stages:
1. Reception: A chemical signal (e.g., hormone, neurotransmitter, growth factor) binds to a specific receptor protein on the target cell's surface (or inside it).
2. Transduction: The receptor changes shape and activates a series of intracellular messenger molecules (often called a signalling cascade or signal transduction pathway). This amplifies the signal.
3. Response: The final messengers trigger a specific cellular action, such as changing gene expression, altering metabolism, moving the cell, or undergoing cell division or apoptosis.

Why is this important? Virtually every physiological process—from your heartbeat and digestion to learning, memory, and immune defence—depends on precise cell signalling.

The Crucial Location Problem: Water vs. Fat
Most signalling molecules (like hormones and neurotransmitters) are water-soluble. They cannot cross the fatty (lipid) membrane of the cell. Therefore, they must bind to cell surface receptors (also called transmembrane receptors). These receptors span the cell membrane and act as a gatekeeper, detecting the external signal and transmitting a message to the inside.

The Main Classes of Cell Surface Receptor

There are three major classes of cell surface receptor:

1. Ion Channel-Linked Receptors (Ionotropic Receptors)
- How they work: The receptor is the channel. When the signal (e.g., acetylcholine) binds, the receptor changes shape and opens a pore in the membrane. Ions rush in or out, changing the cell's electrical charge almost instantly.
- Biological role: Fast synaptic transmission in the nervous system (e.g., muscle contraction, sensory perception).
- Analogy: A key turning a lock that is also a door, which immediately opens to let people (ions) through.

2. G-Protein-Coupled Receptors (GPCRs) - Metabotropic
- How they work: The receptor itself does not have an internal enzyme. Instead, it is coupled to a G-protein on the inner side of the membrane. When the ligand binds, the receptor activates the G-protein, which then turns on an effector protein (often an enzyme that makes a second messenger like cAMP or IP3). This second messenger spreads the signal throughout the cell.
- Biological role: Sensing light, odours, flavours, and responding to most hormones and neurotransmitters (e.g., adrenaline, dopamine, serotonin). Over 30% of all prescription drugs target GPCRs.
- Analogy: The receptor is a doorbell button. Pushing it sends a signal via a wire (G-protein) to a bell (effector) which alerts the whole house (second messenger).

3. Enzyme-Linked Receptors (Catalytic Receptors)
- How they work: These receptors have an extracellular ligand-binding domain, a single transmembrane helix, and an intracellular domain that is an enzyme (or directly binds an enzyme). Most commonly, this enzyme is a protein tyrosine kinase. When the ligand binds (e.g., growth factor), the receptors often pair up (dimerize) and activate each other's kinase activity. They then add phosphate groups to tyrosine amino acids on target proteins, setting off a kinase cascade that ultimately changes gene expression.
- Biological role: Regulating cell growth, proliferation, differentiation, and survival. Defects here are a major cause of cancer.
- Analogy: The receptor is a light switch connected to a generator. Flipping the switch turns on the generator (kinase), which sends power (phosphate groups) down a line of transmission towers (kinase cascade) to turn on a factory (the nucleus).`,
          grok: `Cell signalling (or signal transduction) is the process by which cells detect, interpret, and respond to signals from their external environment or from other cells. It allows cells to coordinate their behavior, maintain homeostasis, respond to environmental changes, grow, divide, move, or undergo programmed cell death.

Why Cell Signalling Matters
- It is fundamental to almost every physiological process: hormone action, neurotransmission, immune responses, embryonic development, and responses to drugs.
- Dysregulated signalling is a major cause of diseases such as cancer, diabetes, autoimmune disorders, and neurodegenerative conditions.

Basic Steps in Cell Signalling
1. Signal Release: A signalling molecule (ligand) such as a hormone, neurotransmitter, growth factor, or cytokine is released.
2. Reception: The ligand binds to a specific receptor (usually on the cell surface).
3. Transduction: Binding triggers a cascade of intracellular events (often involving second messengers, protein phosphorylation, or ion fluxes) that amplify and relay the signal inside the cell.
4. Response: The cell produces a biological effect — e.g., altered gene expression, protein synthesis, metabolic change, secretion, or movement.

Main Classes of Cell Surface Receptors

Most extracellular signals cannot cross the plasma membrane, so they bind to cell surface receptors. Here are the major classes:

| Receptor Class | Structure | Mechanism of Action | Speed of Response | Key Examples | Common Ligands |
|---|---|---|---|---|---|
| G Protein-Coupled Receptors (GPCRs) | 7 transmembrane alpha-helices | Activate G proteins → modulate second messengers (cAMP, IP3, Ca2+, DAG) | Seconds to minutes | Adrenergic, muscarinic, opioid, sensory receptors | Hormones, neurotransmitters, light, odors |
| Ligand-Gated Ion Channels | Multi-subunit ion channel | Direct opening/closing of ion channel upon ligand binding | Milliseconds | Nicotinic acetylcholine, GABA_A, glutamate | Neurotransmitters |
| Receptor Tyrosine Kinases (RTKs) | Single transmembrane domain + intracellular kinase domain | Dimerization → autophosphorylation → activation of kinase cascades | Minutes | Insulin receptor, EGFR, VEGFR, PDGFR | Growth factors, insulin |
| Cytokine Receptors | Multi-subunit, no intrinsic kinase | Associate with JAK kinases → JAK-STAT pathway | Minutes | Interleukin receptors, interferon receptors | Cytokines, interferons |

Additional Important Notes
- Enzyme-Linked Receptors: A broad category that includes RTKs and receptor serine/threonine kinases.
- GPCRs are the largest and most drugged class of receptors — roughly 30-40% of all approved drugs target GPCRs.
- Signal Amplification: One receptor can activate many downstream molecules, allowing tiny concentrations of ligand to produce large cellular responses.`
        }
      };

    case "bmd1000-separation":
      return {
        ...question,
        modelResponses: {
          chatgpt: `Proteins are often separated and purified so scientists can identify them, measure them, study their function, or prepare them for experiments and medical applications.
Protein separation techniques work because proteins differ in properties such as:
Size (molecular mass)
Charge
Shape
Binding interactions
Solubility
Hydrophobicity
Three important protein separation methods are affinity chromatography, size-exclusion chromatography, and polyacrylamide gel electrophoresis (PAGE).

Overview:
Technique: Affinity chromatography
Separates based on: Specific molecular binding
Technique: Size-exclusion chromatography
Separates based on: Molecular size
Technique: PAGE
Separates based on: Size and/or electrical charge

1. Affinity Chromatography
Principle: Specific molecular recognition (binding affinity)
Affinity chromatography separates proteins according to their ability to bind specifically to another molecule (ligand).
A column contains beads coated with a ligand that selectively binds the target protein.
Process:
Protein mixture enters the column.
Target protein binds to the immobilised ligand.
Other proteins pass through.
Conditions are changed to release (elute) the target protein.
Methods of elution may involve:
Changing pH
Increasing salt concentration
Adding competing molecules
Biophysical basis:
This relies on non-covalent molecular interactions, including:
Hydrogen bonding
Ionic interactions
Hydrophobic interactions
Van der Waals forces
Example:
Purifying antibodies using antigen-coated columns.
Advantages:
Very selective
Produces highly purified protein
Limitation:
Requires knowledge of a suitable binding partner

2. Size-exclusion chromatography (SEC)
(Also called gel filtration chromatography.)
Principle: Molecular size and hydrodynamic volume
The column contains porous beads.
Process:
Protein mixture enters column.
Small proteins enter bead pores and travel more slowly.
Large proteins cannot enter pores and move faster.
Large proteins leave first.
Biophysical basis:
Separation depends on:
Diffusion
Accessible pore volume
Hydrodynamic radius (effective molecular size in solution)
Result:
Larger proteins → elute earlier
Smaller proteins → elute later
Applications:
Protein purification
Determining approximate molecular mass
Removing salts from samples
Advantages:
Gentle method
Preserves protein structure
Limitation:
Lower resolution than affinity methods

3. Polyacrylamide Gel Electrophoresis (PAGE)
Principle: Migration in an electric field
PAGE separates proteins as they move through a polyacrylamide gel matrix.
Movement depends on:
Protein size
Charge
Shape
The gel acts like a molecular sieve.
Two major forms:
Native PAGE
Proteins remain folded.
Separation depends on: Size, Charge, Shape
Useful for studying functional protein complexes.

SDS-PAGE
Proteins are treated with sodium dodecyl sulfate (SDS).
SDS:
Denatures proteins
Gives proteins a similar negative charge
This means separation occurs mainly by molecular mass.
Process:
Proteins are denatured.
Electric current applied.
Smaller proteins move faster through gel.
Biophysical basis:
Movement is governed by:
Electrophoretic force
Frictional resistance from gel pores
Applications:
Estimating protein molecular weight
Checking purity
Comparing protein expression
Advantages:
High resolution
Widely used
Limitation:
SDS-PAGE destroys protein structure

Summary:
Affinity chromatography: Specific binding interactions, Molecular recognition and binding forces
Size-exclusion chromatography: Molecular size, Diffusion and pore accessibility
PAGE: Migration in electric field, Charge, size, and gel resistance

Together, these methods allow biomedical scientists to isolate proteins, analyse their properties, and investigate how proteins function in biological systems.`,
          gemini: `Separating proteins from a complex cellular mixture is a cornerstone of biomedical research and biotechnology. Because proteins vary immensely in their physical and chemical properties, scientists exploit these differences to isolate a specific protein of interest.
The key separation techniques can be grouped by the specific physical property they target:
Size/Mass: Size-Exclusion Chromatography (SEC), Polyacrylamide Gel Electrophoresis (PAGE), and Ultracentrifugation.
Charge: Ion-Exchange Chromatography (IEX) and Isoelectric Focusing (IEF).
Hydrophobicity: Hydrophobic Interaction Chromatography (HIC) and Reverse-Phase Chromatography (RPC).
Biological Affinity: Affinity Chromatography.
Here is a detailed look at the biophysical principles underlying three of the most widely used techniques.
1. Affinity Chromatography
Affinity chromatography is a highly specific, powerful purification technique that can isolate a single target protein from a crude mixture in a single step, often achieving greater than 95% purity.
Underlying Biophysical Principle: Molecular Recognition
This technique exploits the specific reversible biological affinity (non-covalent binding) between a protein and a specific ligand attached to an insoluble matrix (like agarose beads) inside a chromatography column.
The Matrix & Ligand: The column is packed with beads covalently linked to a ligand that the target protein naturally recognizes. Examples include:
An antigen to capture a specific antibody.
A substrate analogue or cofactor to capture a specific enzyme.
An engineered tag (like a His-tag binding to Ni2+ ions).
The Process: When the mixture passes through the column, only the target protein binds to the immobilized ligands due to complementary electrostatic, hydrophobic, and hydrogen-bonding interactions. Unwanted proteins lack this affinity and wash straight through.
Elution: To recover the bound protein, the biophysical equilibrium must be disrupted. This is achieved by changing the pH or salt concentration or by adding a high concentration of a free ligand that competes with the matrix-bound ligand for the protein's binding sites.
2. Size-Exclusion Chromatography (SEC)
Also known as gel filtration, SEC separates proteins in their native (folded) state based purely on their size and shape.
Underlying Biophysical Principle: Molecular Sieving and Hydrodynamic Volume
Separation depends on the ability of protein molecules to enter the internal pores of a porous polymer gel matrix packed into a column.
Large Proteins (Total Exclusion): Proteins that are physically larger than the pore sizes cannot enter the beads. They are restricted to the space outside the beads (the void volume) and take the shortest, fastest path down the column. Therefore, large proteins elute first.
Small Proteins (Inclusion): Small proteins can freely diffuse into and out of the matrix pores. This significantly increases the total volume of liquid they must travel through, delaying their journey. Thus, small proteins elute last.
Shape Factor: SEC actually measures a protein's hydrodynamic radius (Rh), which is the apparent size of the molecule as it tumbles through space. A highly elongated, fibrous protein will behave as though it is much larger than a tightly packed, spherical globular protein of the exact same molecular weight, causing it to elute earlier.
3. Polyacrylamide Gel Electrophoresis (PAGE)
PAGE is an analytical technique used to separate charged biological molecules as they migrate through a gel matrix under the influence of an electric field.
Underlying Biophysical Principle: Electrophoretic Mobility and Molecular Friction
The migration speed (v) of a protein through an electric field (E) is determined by its electrophoretic mobility, governed by the classic biophysical equation: mobility = q/f where q is the net electrical charge of the molecule and f is the frictional coefficient.
Native PAGE: Proteins are kept in their naturally folded state. Separation is determined by a combination of the protein's intrinsic net charge and its native size/shape.
SDS-PAGE (Denaturing): To separate proteins strictly by their molecular weight, the detergent SDS is added. SDS breaks down non-covalent bonds, unfolding the protein. SDS molecules bind tightly to the protein backbone at a constant ratio (roughly 1.4 grams of SDS per gram of protein). Because SDS is highly negatively charged, it completely overwhelms the protein's intrinsic charge. Every protein ends up with an identical negative charge-to-mass ratio and a uniform linear shape. Separation becomes entirely dependent on the frictional coefficient—smaller chains easily slip through the polyacrylamide mesh and migrate faster toward the positive anode, while larger chains are held back.`,
          claude: `Key Techniques for Protein Separation
Overview of Main Separation Techniques
Proteins can be separated based on different properties:
Charge: Ion exchange chromatography, isoelectric focusing
Size: Size-exclusion chromatography (SEC), PAGE
Hydrophobicity: Hydrophobic interaction chromatography, reverse-phase chromatography
Specific binding: Affinity chromatography
Mass: Mass spectrometry
1. Affinity Chromatography
Principle

Exploits specific, reversible binding between a protein and a ligand immobilized on a solid matrix.
Biophysical Basis

Based on molecular recognition (lock-and-key or induced fit)
Binding interactions: hydrogen bonds, electrostatic interactions, van der Waals forces, hydrophobic effects
High specificity: Only proteins with affinity for the ligand bind
Process

Loading: Sample applied; target protein binds to ligand
Washing: Non-binding proteins removed
Elution: Target protein released by:
Competitive displacement (free ligand)
pH change
Ionic strength change
Denaturing conditions
Examples

His-tag purification: Ni²⁺ or Co²⁺ beads bind polyhistidine tags
Antibody affinity: Protein A/G binds antibodies
Enzyme-substrate: Immobilized substrate binds specific enzyme
Receptor-ligand: Hormone receptor binds specific hormone
Advantages

Very high selectivity
Single-step purification possible
High yield and purity
2. Size-Exclusion Chromatography (SEC/Gel Filtration)
Principle

Separates proteins based on molecular size and shape (hydrodynamic radius).
Biophysical Basis

Porous beads (cross-linked dextran, agarose, or polyacrylamide) with defined pore sizes
Differential diffusion:
Large proteins: Excluded from pores, travel in void volume → elute first
Small proteins: Enter pores, longer path → elute later
Medium proteins: Partial pore access → intermediate elution
Partition Coefficient (Kav)

Describes distribution between mobile and stationary phases
Determines elution volume relative to molecular size
Process

Isocratic elution (constant buffer)
No binding to matrix
Separation order: Large → Small
Applications

Determining molecular weight
Protein desalting/buffer exchange
Separating monomers from aggregates
Analyzing protein complexes
Advantages

Gentle, native conditions
Predictable elution
Good for removing salts/small molecules
Limitations

Limited resolution
Separation based on shape, not just mass
Dilutes sample
3. Polyacrylamide Gel Electrophoresis (PAGE)
Principle

Separates proteins by charge and size in an electric field through a polymer gel matrix.
Biophysical Basis

Electric Field

Charged proteins migrate toward opposite electrode
Migration rate depends on charge-to-mass ratio
Gel Matrix (Molecular Sieving)

Polyacrylamide: Cross-linked polymer creates porous network
Pore size controlled by acrylamide concentration (4-20%)
Acts as molecular sieve - smaller proteins migrate faster through pores
Two Main Types

A. Native PAGE

Proteins in native state
Separation by charge and size
Maintains protein function
Migration = f(charge, size, shape)
B. SDS-PAGE (Most Common)

Principle:
SDS (sodium dodecyl sulfate): Anionic detergent
Denatures proteins and coats them uniformly with negative charge
Charge becomes proportional to mass
All proteins have similar charge-to-mass ratio`,
          copilot: `Protein separation relies on differences in biophysical properties such as charge, size, shape, and binding interactions. The three techniques you mention — affinity chromatography, size-exclusion chromatography, and polyacrylamide gel electrophoresis (PAGE) — are foundational because each isolates proteins based on a different physical principle.
Takeaway:
Affinity chromatography separates by specific binding interactions.
Size-exclusion chromatography (SEC) separates by molecular size and shape.
PAGE separates by charge-to-mass ratio (native PAGE) or mass alone (SDS-PAGE).

The key techniques used to separate proteins
Below are the major classes of protein-separation methods:
Affinity chromatography — separates proteins by specific ligand binding.
Size-exclusion chromatography — separates by molecular size.
Ion-exchange chromatography — separates by charge.
Hydrophobic interaction chromatography — separates by surface hydrophobicity.
PAGE — separates by charge/mass (native) or mass alone (SDS-PAGE).
Isoelectric focusing — separates by isoelectric point (pI).
These techniques are often combined in purification workflows.

Affinity chromatography
Principle: Affinity chromatography exploits specific, reversible interactions between a protein and a ligand immobilised on a resin.
Examples of ligand-protein pairs:
Antibody ↔ antigen
Enzyme ↔ substrate analogue
His-tag ↔ Ni2+-NTA resin
Biophysical basis: Binding is governed by non-covalent interactions: hydrogen bonds, ionic interactions, van der Waals forces, hydrophobic interactions.
Only proteins with the correct binding affinity remain on the column; others wash through.
Elution occurs by disrupting the interaction (e.g., imidazole for His-tags, pH shift, salt).
Why it's powerful: It provides high specificity and often yields near-pure protein in one step.

Size-exclusion chromatography (SEC)
Principle: SEC separates proteins based on hydrodynamic radius (effective size in solution), not molecular weight alone.
Biophysical basis: The column contains porous beads.
Large proteins cannot enter the pores → elute first.
Small proteins enter many pores → elute later.
Separation is purely physical; no binding occurs.
What SEC reveals: Protein purity, oligomeric state (monomer vs dimer vs aggregate), protein folding/shape differences. It's gentle and preserves protein activity.

Polyacrylamide gel electrophoresis (PAGE)
PAGE separates proteins by how they move through a polyacrylamide mesh under an electric field.
Native PAGE: Proteins retain their native charge and shape. Migration depends on charge, size, and shape. Useful for studying protein complexes and activity.
SDS-PAGE: Proteins are denatured and coated with SDS, giving them a uniform negative charge-to-mass ratio. SDS disrupts tertiary structure → proteins become linear. Because charge is normalised, separation depends almost entirely on molecular mass. Smaller proteins migrate faster through the gel.

How these techniques complement each other:
Affinity chromatography: Specific ligand binding, High-purity isolation
SEC: Size/hydrodynamic radius, Removing aggregates, determining oligomeric state
SDS-PAGE: Mass-dependent migration, Checking purity and molecular weight

Together, they form the backbone of modern protein purification and analysis.`,
          deepseek: `This is a core topic in biochemistry and molecular biology. Separating proteins is essential for studying their structure, function, and interactions.

The key techniques exploit fundamental biophysical properties of proteins: size, shape, charge, and binding specificity.

Brief Overview of Key Protein Separation Techniques:
Affinity Chromatography: Specific biological binding, Purifying a specific protein from a complex mixture (highest purity).
Ion-Exchange Chromatography: Net surface charge, Separating proteins with different charges.
Size-Exclusion Chromatography (SEC): Hydrodynamic volume, Estimating molecular weight, desalting, separating protein complexes.
Polyacrylamide Gel Electrophoresis (PAGE): Charge-to-mass ratio or apparent molecular weight (SDS-PAGE), Analyzing protein purity and size.
Isoelectric Focusing (IEF): Isoelectric point (pI), Separating proteins by their intrinsic charge.

Now, let's examine the biophysical principles of the three techniques you specifically asked about.

1. Affinity Chromatography
Biophysical Principle: Molecular recognition and reversible, non-covalent binding. This technique uses the lock-and-key or induced-fit interaction between a protein and a specific ligand.
How it works:
1. Stationary Phase: A specific ligand is covalently attached to inert beads packed into a column.
2. Load: A crude protein mixture is passed through the column. Only the target protein that specifically binds to the ligand is retained.
3. Wash: Buffer flows through to remove unbound contaminants.
4. Elution: The bound protein is released by altering buffer conditions (changing pH, adding free ligand, adding a chelator).
Classic Example: His-Tag Affinity Chromatography (IMAC). A polyhistidine tag on a recombinant protein binds with high affinity to immobilized nickel (Ni2+) or cobalt ions. Elution uses imidazole which competes with the His-tag for binding.

2. Size-Exclusion Chromatography (SEC)
Biophysical Principle: Hydrodynamic volume (Stokes radius). This is a function of the protein's molecular weight, shape (globular vs. fibrous), and hydration.
How it works:
1. Stationary Phase: Porous beads with a specific exclusion limit are packed into a column.
2. Load & Flow: A protein mixture is added, and buffer flows continuously.
3. Separation: Larger proteins cannot enter pores and travel only in the void volume, eluting first. Smaller proteins enter pores, travel longer paths, and elute later.
4. Detection: A UV detector plots elution volume vs. absorbance.

3. Polyacrylamide Gel Electrophoresis (PAGE)
A. SDS-PAGE (Denaturing): Separation by apparent molecular weight. SDS binds to hydrophobic regions, coating proteins with a uniform negative charge and denaturing them into rod-like shapes. A reducing agent breaks disulfide bonds. All proteins become negatively charged with a constant charge-to-mass ratio. Smaller proteins migrate faster through the gel's pores.
B. Native PAGE (Non-denaturing): Separation by charge AND size/shape in native folded state. No SDS or reducing agents. Proteins retain biological activity and quaternary structure.

Summary of Biophysical Principles:
Affinity Chromatography: Specific binding, Target protein binds, others flow through, Elution by competing ligand or pH change.
Size-Exclusion: Hydrodynamic volume, All proteins flow through porous bed, Larger excluded (fast), smaller enter (slow).
SDS-PAGE: Molecular weight, Negatively charged SDS-protein complexes, Smaller migrate faster through pores.

Understanding these principles allows you to rationally design a purification strategy, often using chromatography techniques in sequence to achieve near-homogeneous protein from a crude cell lysate.`,
          grok: `Key techniques used to separate proteins exploit differences in their physical and chemical properties such as size, charge, hydrophobicity, solubility, and specific binding affinity. Protein separation is fundamental in biochemistry, proteomics, and biomedical research for purification, characterization, and analysis.

Major Protein Separation Techniques:
Affinity Chromatography: Specific ligand binding, High-purity isolation of tagged or native proteins
Size-Exclusion Chromatography (SEC): Molecular size / hydrodynamic volume, Desalting, oligomerization studies, polishing
Ion-Exchange Chromatography: Net surface charge, Initial fractionation
Polyacrylamide Gel Electrophoresis (PAGE): Size + charge (often size only in SDS-PAGE), Analytical separation, purity check, MW estimation

Biophysical Principles of the Three Specified Techniques

1. Affinity Chromatography
Principle: Separation is based on highly specific, reversible molecular recognition between a protein and an immobilized ligand.
Biophysical basis: Relies on the dissociation constant (Kd) of the protein-ligand interaction. Binding is governed by non-covalent forces: hydrogen bonds, van der Waals interactions, electrostatic forces, and hydrophobic effects. High specificity comes from complementary shape, charge distribution, and hydrophobic patches (lock-and-key or induced-fit model).
How it works: Protein mixture is loaded → target protein binds strongly while others flow through. Washing removes unbound material. Elution by changing conditions (pH, salt, competitive ligand) that weaken the affinity.
Strength: Extremely high purification in a single step (often >95% purity).

2. Size-Exclusion Chromatography (SEC) / Gel Filtration
Principle: Separation based purely on molecular size (hydrodynamic radius), not on charge or hydrophobicity.
Biophysical basis: The column is packed with porous beads having defined pore sizes. Molecules larger than the pore size are excluded and travel only through the interstitial space → elute first (shortest path). Smaller molecules can diffuse into the pores → take a longer, more tortuous path → elute later. This is an entropic separation process: larger molecules have fewer accessible microstates (lower entropy) in the column.
Applications: Determines native molecular weight, detects oligomers/aggregates, and acts as a final "polishing" step.

3. Polyacrylamide Gel Electrophoresis (PAGE)
Principle: Separation of proteins under an electric field in a porous polymer matrix.
Biophysical basis: Proteins migrate based on their electrophoretic mobility, which depends on charge (net charge and charge-to-mass ratio), size (frictional drag through the gel pores), and shape (to a lesser extent).
Main variants:
SDS-PAGE: SDS denatures proteins and coats them with uniform negative charge proportional to length. Charge-to-mass ratio becomes nearly constant → separation occurs almost exclusively by size (sieving effect of the polyacrylamide mesh). Mobility is inversely proportional to the logarithm of molecular weight.
Native PAGE: Proteins remain in native conformation → separation by both charge and size.
Reducing vs Non-reducing: Use of DTT or beta-mercaptoethanol to break disulfide bonds.

These techniques are often used in combination (e.g., affinity → ion-exchange → SEC) for high-purity protein isolation. Modern workflows frequently integrate them with mass spectrometry for identification.`
        }
      };

    case "bmd1005-excitability":
      return {
        ...question,
        modelResponses: {
          chatgpt: `Excitable cells including neurons and muscle cells generate electrical signals through controlled ion movement across the plasma membrane. At rest, the neuronal interior maintains approximately -70 mV relative to the exterior, termed the resting membrane potential. This potential arises from selective membrane permeability to ions and active maintenance of unequal ion concentrations by the sodium-potassium ATPase pump, which transports three sodium ions outward and two potassium ions inward per ATP-consuming cycle. The Nernst equation calculates the equilibrium potential for individual ion species, representing the membrane voltage at which electrical and concentration driving forces balance, yielding zero net flux. For potassium, this approximates -90 mV. The Goldman equation extends this calculation to multiple ions simultaneously, weighting each by membrane permeability. At rest, the membrane exhibits highest potassium permeability, explaining why the resting potential approximates but does not equal the potassium Nernst potential. An action potential constitutes a rapid all-or-nothing membrane potential reversal. Voltage-gated sodium channels open first, causing sodium influx and depolarization to approximately +40 mV. Voltage-gated potassium channels subsequently open, permitting potassium efflux and repolarization. The sodium-potassium pump restores ion gradients.

Membrane potential = resting voltage created by ion gradients and selective permeability
Action potential = rapid, temporary change in membrane voltage used for signalling
Nernst equation = equilibrium voltage for a single ion
Goldman equation = real membrane voltage from multiple ions + permeability
Together, they explain how ion movement is converted into electrical signals in excitable cells like neurons and muscles.`,
          gemini: `Excitable cells like neurons and muscle cells create electrical signals by controlling ion movement across their membrane. At rest, the inside of a neuron is about -70 mV compared to the outside, called the resting membrane potential. This happens because the membrane lets some ions through more easily than others, and the sodium-potassium pump actively moves ions to keep different concentrations inside and outside. The pump moves three sodium ions out and two potassium ions in using ATP. The Nernst equation calculates the balance point for a single ion type, where electrical and concentration forces cancel out. For potassium this is around -90 mV. The Goldman equation does this for multiple ions at once, considering how easily each passes through the membrane. At rest, potassium can pass through most easily, which is why the resting potential is close to but not exactly the potassium Nernst potential. An action potential is a quick, complete reversal of the membrane potential. Sodium channels open first, letting sodium in and depolarizing the cell to about +40 mV. Then potassium channels open, letting potassium out to repolarize the cell. The sodium-potassium pump then restores the ion balance.

The Resting Membrane Potential (RMP)
When a neuron is at rest, the inside of the cell is negatively charged relative to the outside, typically sitting around -70 mV. This baseline electrical separation is maintained by two primary factors:
1. Ion Concentration Gradients: Active transport proteins, primarily the Na+/K+ ATPase pump, continuously pump 3 Na+ ions out of the cell for every 2 K+ ions pumped in. This establishes a high concentration of sodium outside and a high concentration of potassium inside.
2. Selective Membrane Permeability: At rest, the membrane has many open "leak" channels for K+, but very few for Na+. Because K+ is highly concentrated inside, it naturally diffuses out, leaving behind uncompensated negative charges.

The Action Potential
An action potential is a rapid, temporary reversal of this resting potential, propagating down an axon like a wave. It follows an "all-or-nothing" principle:
Depolarization: A stimulus triggers voltage-gated Na+ channels to open. Na+ rushes into the cell, causing the interior voltage to rapidly spike to about +40 mV.
Repolarization: Na+ channels inactivate. Voltage-gated K+ channels open slowly. K+ rushes out, driving the potential back down.
Hyperpolarization: K+ channels are slow to close, so potential temporarily drops below resting.
Return to Rest: The Na+/K+ pump restores the original equilibrium.`,
          claude: `Membrane Potentials and Action Potentials
Membrane Potential
Definition

The electrical potential difference across the cell membrane, typically -70 mV (inside negative) in resting neurons.
Origin

Generated by:
Unequal ion distribution across the membrane (maintained by Na⁺/K⁺-ATPase)
Selective membrane permeability to different ions
Concentration gradients of key ions
Key Ion Distributions (Typical Neuron)

Ion	Intracellular	Extracellular	Gradient
K⁺	~140 mM	~5 mM	High inside
Na⁺	~12 mM	~145 mM	High outside
Cl⁻	~4 mM	~110 mM	High outside
Ca²⁺	~0.0001 mM	~2 mM	High outside
The Nernst Equation
What It Describes

The equilibrium potential for a single ion - the membrane potential at which electrical and chemical forces balance for that ion.
The Equation

E_ion = (RT/zF) × ln([ion]_out/[ion]_in)
Or at 37°C (simplified):
E_ion = (61/z) × log₁₀([ion]_out/[ion]_in) mV
Where:
E_ion = equilibrium potential for the ion
R = gas constant
T = absolute temperature
z = valence of ion (+1 for K⁺, Na⁺; +2 for Ca²⁺; -1 for Cl⁻)
F = Faraday constant
[ion]_out/in = ion concentrations
Calculated Equilibrium Potentials

E_K ≈ -90 mV (potassium)
E_Na ≈ +60 mV (sodium)
E_Ca ≈ +120 mV (calcium)
E_Cl ≈ -70 mV (chloride)
Key Concept

If membrane were permeable to only K⁺, the resting potential would be -90 mV
If membrane were permeable to only Na⁺, it would be +60 mV
The actual resting potential (-70 mV) reflects mixed permeability
The Goldman-Hodgkin-Katz (GHK) Equation
What It Describes

The actual membrane potential when the membrane is permeable to multiple ions simultaneously.
The Equation

V_m = (RT/F) × ln[(P_K[K⁺]_out + P_Na[Na⁺]_out + P_Cl[Cl⁻]_in) / (P_K[K⁺]_in + P_Na[Na⁺]_in + P_Cl[Cl⁻]_out)]
Where:
V_m = membrane potential
P_K, P_Na, P_Cl = relative permeabilities of each ion
Key Concept

Membrane potential is a weighted average of equilibrium potentials
Weighting depends on relative permeability of each ion
The ion with highest permeability has greatest influence
At Rest

P_K : P_Na : P_Cl ≈ 1 : 0.04 : 0.45
K⁺ permeability dominates → V_m ≈ -70 mV (closer to E_K than E_Na)
Action Potentials
Definition

Rapid, transient, self-propagating electrical signals in excitable cells (neurons, muscle).
Phases of Action Potential

1. Resting State (-70 mV)`,
          copilot: `Membrane potentials and action potentials are the electrical signals that allow excitable cells—such as neurons and muscle cells—to communicate. They arise from ion concentration gradients and selective membrane permeability, and the Nernst and Goldman-Hodgkin-Katz (GHK) equations describe how individual ions contribute to these voltages.
Takeaway:
Membrane potential = voltage difference across the cell membrane created by unequal ion distributions.
Action potential = rapid, transient reversal of membrane potential triggered by changes in ion permeability.
Nernst equation = equilibrium potential for a single ion.
Goldman equation = membrane potential considering multiple ions and their permeabilities.

What membrane potentials are
A membrane potential is the difference in electrical charge between the inside and outside of a cell. It exists because:
Ion concentrations differ across the membrane (e.g., high K+ inside, high Na+ outside).
The membrane is selectively permeable, especially to K+ at rest.
Neurons typically have a resting membrane potential of about -70 mV, meaning the inside is more negative than the outside. This potential forms when K+ diffuses out through leak channels, leaving behind unbalanced negative charge until an electrical gradient develops that opposes further K+ movement.

What action potentials are
An action potential is a brief, all-or-nothing electrical signal generated when the membrane potential becomes sufficiently depolarised to reach threshold (approx -55 mV).
Key steps:
Depolarisation — voltage-gated Na+ channels open → Na+ rushes in → membrane potential becomes positive.
Repolarisation — Na+ channels inactivate; voltage-gated K+ channels open → K+ exits.
Hyperpolarisation — excess K+ efflux makes the membrane temporarily more negative than resting.
Action potentials propagate rapidly along neurons, enabling fast communication.

How the Nernst equation explains ion equilibrium
The Nernst equation calculates the equilibrium potential for a single ion—the membrane voltage at which that ion's electrical and chemical gradients balance exactly.
E_ion = (RT/zF) * ln([ion]outside/[ion]inside)
Interpretation: A larger concentration gradient leads to a larger equilibrium potential. The sign depends on ion charge and gradient direction. It assumes the membrane is permeable to only that ion.

How the Goldman-Hodgkin-Katz equation explains membrane potential
Real cells are permeable to multiple ions, not just one. The GHK equation calculates the membrane potential by weighting each ion's equilibrium potential by its relative permeability.
Key idea: If permeability to an ion increases (e.g., Na+ during an action potential), the membrane potential shifts toward that ion's Nernst potential. This explains why resting potential is close to E_K (high K+ permeability) and depolarisation during an action potential approaches E_Na (high Na+ permeability).

These equations quantitatively link ion gradients, membrane permeability, and electrical signalling in excitable cells.`,
          deepseek: `This is a superb question that lies at the heart of neurobiology and cardiac physiology. Understanding these concepts explains how neurons communicate, muscles contract, and the heart beats.

Let's build the answer from the ground up: starting with the basic electrical difference across a cell membrane, then the explosive event of an action potential, and finally the equations that quantitatively describe the ionic basis of both.

Part 1: What is a Membrane Potential (Resting)?
Definition: The membrane potential is the electrical voltage difference across a cell's plasma membrane. The inside of the cell is typically negative relative to the outside.
Typical resting value: -70 mV for a neuron.
Origin: This voltage is generated by an unequal distribution of ions (primarily K+, Na+, and Cl-) across the membrane, combined with the membrane's selective permeability to those ions.
Why is the inside negative at rest?
1. The Sodium-Potassium Pump (Na+/K+ ATPase): Pumps 3 Na+ out and 2 K+ in for each ATP molecule. Creates concentration gradients: high K+ inside, high Na+ outside.
2. Leak Channels: At rest, the membrane is far more permeable to K+ than to Na+. K+ flows down its concentration gradient (inside to outside), carrying positive charge out. This leaves behind negative charges on the inside, creating the negative resting potential.

Part 2: What is an Action Potential?
Definition: An action potential is a rapid, temporary, and self-propagating reversal of the membrane potential that travels along the membrane of an excitable cell. It is an "all-or-nothing" event.
The 5 Phases:
1. Resting State (-70 mV): K+ leak channels open; Na+ channels closed.
2. Depolarization (-70 mV → +30 mV): A stimulus opens voltage-gated Na+ channels. Na+ rushes into the cell, making the inside positive.
3. Repolarization (+30 mV → -70 mV): Na+ channels inactivate. Voltage-gated K+ channels open. K+ rushes out, restoring negative inside.
4. Hyperpolarization (below -70 mV): K+ channels are slow to close, so too much K+ leaves.
5. Refractory Period: Na+ channels reset. Cell cannot fire another AP immediately.

Part 3: The Nernst Equation
The Nernst equation calculates the equilibrium potential for a single ion: E_ion = (61/z) * log10([ion]outside/[ion]inside) mV (at 37C).
For K+: [out] ~5 mM, [in] ~140 mM. E_K = 61 * log(5/140) = -88 mV.
For Na+: [out] ~145 mM, [in] ~15 mM. E_Na = 61 * log(145/15) = +60 mV.

Part 4: The Goldman-Hodgkin-Katz (GHK) Equation
The GHK equation calculates the actual membrane potential by considering concentration gradients and relative permeabilities of all contributing ions.
V_m = 61 * log10((P_K[K+]out + P_Na[Na+]out + P_Cl[Cl-]in) / (P_K[K+]in + P_Na[Na+]in + P_Cl[Cl-]out))

Applying GHK:
At Rest: P_K >> P_Na → V_m pulled toward E_K (-88 mV) → actual V_m ≈ -70 mV.
Peak of AP: P_Na >> P_K → V_m pulled toward E_Na (+60 mV) → actual V_m ≈ +30 mV.
Repolarization: P_K >> P_Na again → V_m returns toward E_K.

Final Takeaway: The Nernst equation provides the target voltages, while the Goldman equation provides the actual voltage by integrating the dynamic interplay of ion channels that open and close during electrical signalling.`,
          grok: `Membrane potentials and action potentials are fundamental electrical phenomena in excitable cells (neurons, muscle cells, and some endocrine cells). They enable rapid communication and coordination within the nervous and muscular systems.

1. Membrane Potential
The membrane potential is the voltage difference across the plasma membrane, caused by unequal distribution of ions inside and outside the cell.
- It is measured in millivolts (mV).
- The inside of the cell is usually negative relative to the outside.
- Resting Membrane Potential (RMP): The stable membrane potential when the cell is not actively transmitting signals (typically -60 to -90 mV, around -70 mV in many neurons).

Causes of membrane potential:
- Unequal ion concentrations maintained by pumps (especially the Na+/K+-ATPase pump: 3 Na+ out, 2 K+ in).
- Selective permeability of the membrane (more permeable to K+ than Na+ at rest via leak channels).
- Large negatively charged intracellular proteins that cannot cross the membrane.

Typical ion concentrations (mammalian neurons):
K+: Intracellular 140 mM, Extracellular 5 mM, Equilibrium approx -90 mV
Na+: Intracellular 15 mM, Extracellular 145 mM, Equilibrium approx +60 mV
Cl-: Intracellular 5-30 mM, Extracellular 110 mM, Equilibrium approx -70 mV

2. Action Potential
An action potential is a rapid, self-propagating reversal of the membrane potential that travels along the cell membrane.
Key phases (typical neuronal action potential):
1. Resting (~ -70 mV)
2. Depolarization: Stimulus opens voltage-gated Na+ channels → Na+ rushes in → membrane potential rises rapidly to +30-40 mV.
3. Peak (overshoot)
4. Repolarization: Na+ channels inactivate, voltage-gated K+ channels open → K+ exits → membrane returns toward -90 mV.
5. After-hyperpolarization (undershoot): Temporarily more negative than resting.
6. Refractory period: Brief time when another action potential is difficult or impossible.
Action potentials are all-or-none events: once threshold (~ -55 mV) is reached, they occur with full amplitude regardless of stimulus strength.

The Nernst Equation: Equilibrium Potential for a Single Ion
The Nernst equation calculates the equilibrium potential (E_ion) — the membrane voltage at which the electrical and chemical gradients for a particular ion are exactly balanced (no net flow).
E_ion = (RT/zF) * ln([ion]out/[ion]in)
Simplified at body temperature (37C) using log base 10:
E_ion = (61.5/z) * log10([ion]out/[ion]in) (in mV)
Role: It tells us the driving force for each ion. At resting potential, K+ is close to its equilibrium, while Na+ is far from it (strong inward drive).

The Goldman Equation (Goldman-Hodgkin-Katz Equation): Resting Membrane Potential with Multiple Ions
Real cells are permeable to several ions simultaneously. The Goldman equation calculates the membrane potential by weighting each ion's equilibrium potential according to its relative permeability (P).
V_m = 61.5 * log10((P_K[K+]out + P_Na[Na+]out + P_Cl[Cl-]in) / (P_K[K+]in + P_Na[Na+]in + P_Cl[Cl-]out))
Key insights:
- At rest, P_K >> P_Na (membrane ~50-100 times more permeable to K+) → resting potential is close to E_K (around -70 to -90 mV).
- During an action potential, a large transient increase in P_Na (Na+ channels open) drives the membrane toward E_Na (+60 mV).
- Later, increased P_K drives it back toward E_K.

These equations show that ion concentration gradients (maintained by pumps) and selective changes in permeability (via ion channels) are the biophysical foundations of all electrical signaling in cells.`
        }
      };

    default:
      throw new Error(`Unknown question ID: ${question.id}`);
  }
});
