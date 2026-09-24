/* OnSiteSeq i18n Engine — English / Russian switcher */
'use strict';
(function () {

  var KEY = 'onsiteseq_lang';
  function getLang() { return localStorage.getItem(KEY) || 'ru'; }
  function setLang(l) { localStorage.setItem(KEY, l); }

  /* ── HTML TABLE BUILDER ── */
  function tbl(hdrs, rows) {
    var h = hdrs.map(function (h) { return '<th style="text-align:left">' + h + '</th>'; }).join('');
    var b = rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    }).join('');
    return '<table><thead><tr>' + h + '</tr></thead><tbody>' + b + '</tbody></table>';
  }

  /* ── AVAILABILITY TABLE ── */
  function av(e, d, c) {
    function ic(s) {
      return s === 'ok' ? '🟢 <strong>Available</strong>'
           : s === 'dev' ? '🟡 <strong>In development</strong>'
           : '🔴 Not available';
    }
    return '<h2>📊 Product Availability</h2>' +
      tbl(['Platform', 'Availability Status'], [
        ['<strong>OnSiteSeq Cockpit Edge</strong>', ic(e)],
        ['<strong>OnSiteSeq Cockpit Desktop</strong>', ic(d)],
        ['<strong>OnSiteSeq Cockpit Cloud</strong>', ic(c)]
      ]);
  }

  /* ════════════════════════════════════════════════════
     ENGLISH CONTENT MAP  (keyed by window.location.pathname)
  ════════════════════════════════════════════════════ */
  var EN = {};

  /* ── HIV ── */
  EN['/hiv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/hiv.png" alt="HIV-1" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>HIV-1 Drug Resistance and Subtype Determination</h1>' +
    '<p style="font-size:1.2em;color:#555">Resistance profiling across all ART classes and subtyping — models trained on Russian subtype A6 isolates</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Our algorithm delivers a complete sequencing data processing cycle for identifying drug resistance mutations and accurately determining the HIV-1 subtype.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data (after the Dorado ML base-caller converts nanopore electrical signals to nucleotide data; POD5/FAST5 → FASTQ).</li>' +
    '<li><strong>📤 Output:</strong> Detailed HTML report for the clinician and an extended report for the bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: VI — (+)ssRNA-RT (retroviruses)</h2>' +
    '<p>Class VI unites the retroviruses: their genome is positive-sense single-stranded RNA, yet it does not serve directly as mRNA — first the viral <strong>reverse transcriptase</strong> (RT, <em>pol</em> gene) copies the RNA into DNA, and <strong>integrase</strong> inserts this DNA copy into the host genome, forming a <strong>provirus</strong>. HIV-1 is the canonical member of the class: the provirus becomes a permanent part of the cell and a lifelong source of new virions — which is exactly why modern therapy cannot eliminate the infection. Reverse transcriptase lacks proofreading (3\'→5\' exonuclease) activity, so copying errors accumulate orders of magnitude faster than with cellular DNA polymerases — hence the quasispecies diversity of HIV in every patient and the rapid selection of resistant variants under drug pressure. That is why HIV drug resistance means mutations in the <em>pol</em> gene (reverse transcriptase, protease, integrase) — the very ones our pipeline reads against Stanford HIVdb rules.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['I', 'dsDNA', 'DNA → mRNA (like the host cell)', 'Herpesviruses, adenoviruses, smallpox, ASFV'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['<strong>VI</strong>', '<strong>(+)ssRNA-RT</strong>', '<strong>Reverse transcriptase: RNA → DNA</strong>', '<strong>HIV, retroviruses</strong>'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('ok', 'ok', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    '<p>The pipeline analyses the entire <em>pol</em> gene — all three enzyme targets of antiretroviral therapy. Mutation interpretation follows <strong>Stanford HIVdb</strong> rules — the global standard for genotypic HIV drug resistance interpretation.</p>' +
    tbl(['Drug Class', 'Gene', 'Key Mutations', 'Drugs'], [
      ['<strong>NRTI</strong> (nucleoside RT inhibitors)', 'RT', 'M184V/I, K65R, thymidine analogues (M41L, D67N, T215Y/F, K219Q/E)', 'Tenofovir, Lamivudine, Abacavir'],
      ['<strong>NNRTI</strong> (non-nucleoside RT inhibitors)', 'RT', 'K103N, Y181C, G190A, E138K', 'Efavirenz, Nevirapine, Rilpivirine, Doravirine'],
      ['<strong>PI</strong> (protease inhibitors)', 'PR', 'D30N, M46I/L, I50V, I54V/M, V82A/F/T, L90M', 'Atazanavir, Darunavir, Lopinavir'],
      ['<strong>INSTI</strong> (integrase inhibitors)', 'IN', 'Q148H/R/K, G118R, R263K, N155H', 'Dolutegravir, Bictegravir, Raltegravir']
    ]) +
    '<p>Integrase inhibitors are the first line of modern ART (dolutegravir is included in Russian clinical guidelines), so monitoring integrase mutations (Q148 + secondary) is of particular importance.</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<p>We continuously improve our pipeline and machine learning models.</p>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Current Version'], [['<strong>OnSiteSeq HIV Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>ML Models</h3>' +
    tbl(['Model', 'Version', 'Description &amp; Changelog'], [
      ['<strong>HIV-1-M-Env-Rus</strong>', '<code>1.0</code>', '<a href="/ml/hiv/">Changelog</a>'],
      ['<strong>HIV-1-Resist-Rus</strong>', '<code>3</code>', '<a href="/ml/hiv/">Changelog</a>']
    ]) + '<hr>' +
    '<h2>📚 Publications &amp; Conferences</h2>' +
    '<p>Our tool was validated and presented at the following scientific venues:</p>' +
    '<ul><li><strong>MNSK-2026</strong> — <a href="/conferences/mnsk-2026/">Conference page</a></li>' +
    '<li><strong>MFTI-2026</strong> — <a href="/conferences/mfti-2026/">Conference page</a></li>' +
    '<li><strong>MSIT-2026</strong> — <a href="/conferences/msit-2026/">Conference page</a></li></ul><hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>Managed via Snakemake with isolated Conda environments for maximum reproducibility.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>Python 3.10</code>, <code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment</strong>', '<code>minimap2</code>, <code>samtools</code>'],
      ['<strong>3. Consensus Assembly</strong>', '<code>medaka 1.11.*</code>, <code>bcftools</code>, <code>htslib</code>'],
      ['<strong>4. ML Prediction</strong>', '<code>PyTorch ≥2.0</code>, <code>BioPython</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🖥 Sample Pipeline Card in OnSiteSeq Cockpit</h2>' +
    '<p><img src="/assets/images/cockpit/cockpit_hiv.JPG" alt="OnSiteSeq HIV pipeline card in Cockpit"></p><hr>' +
    '<h2>📋 Sample Reports</h2>' +
    '<ul><li>📄 <strong><a href="/reports/hiv/">Sample HTML Report for Clinician</a></strong></li>' +
    '<li>💻 <strong><a href="/reports/hiv/">Detailed Bioinformatics Report</a></strong></li></ul><hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Russia</strong> — over 1 million people live with HIV; <strong>subtype A6</strong> (formerly A-FSU) dominates in Russia and Eastern Europe but is rare in the West. Our <code>HIV-1-M-Env-Rus</code> and <code>HIV-1-Resist-Rus</code> models are trained specifically on Russian isolates — the key difference from Western counterparts tuned to subtype B.</li>' +
    '<li><strong>WHO</strong> — genotypic drug resistance testing is recommended before ART initiation: transmitted NNRTI resistance exceeds the 10% threshold in several regions.</li>' +
    '<li><strong>INSTI era</strong> — the shift of first-line therapy to dolutegravir makes integrase mutation surveillance an HIV-DR priority.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://hivdb.stanford.edu/">Stanford HIV Drug Resistance Database (HIVdb)</a></li>' +
    '<li>📄 <a href="https://www.genomedetective.com/app/typingtool/hiv">REGA HIV-1 Subtyping Tool</a></li>' +
    '<li>📄 <a href="https://www.who.int/teams/global-hiv-hepatitis-and-stis-programmes/hiv/treatment/hiv-drug-resistance">WHO — HIV Drug Resistance Report</a></li></ul><hr>' +
    '<h2>🔬 Related OnSiteSeq Research</h2>' +
    '<p><strong>Academic research:</strong></p>' +
    '<ul><li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_HIV_Demography.pdf">HIV and Russia\'s Demographics. Impact Analysis (PDF)</a></li></ul>' +
    '<p><strong>Science communication, videos (Dzen):</strong></p>' +
    '<ul><li>🔗 <a href="https://dzen.ru/a/aLys7YzNdXMJdGp8">From a Bioinformatics Perspective: HIV. Part 1. History of HIV in Russia and worldwide</a></li>' +
    '<li>🔗 <a href="https://dzen.ru/a/aMgkOlvWQkzOyCcz">From a Bioinformatics Perspective: HIV. Part 2. Molecular biology of the virus</a></li>' +
    '<li>🔗 <a href="https://dzen.ru/a/ah6QlqOOiE17QuWX">From a Bioinformatics Perspective: HIV. Part 3. Drug Resistance (HIV-DR)</a></li></ul>';

  /* ── TUBERCULOSIS ── */
  EN['/tuberculosis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/tub.png" alt="Mycobacterium tuberculosis" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance and Lineage Determination of Mycobacterium tuberculosis</h1>' +
    '<p style="font-size:1.2em;color:#555">Comprehensive bioinformatics solution for nanopore sequencing analysis of M. tuberculosis</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Our algorithm provides a complete nanopore sequencing data processing cycle for detecting drug resistance mutations and accurately determining the genetic lineage of the tuberculosis pathogen.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data. Optimised for nanopore reads (R10.4.1 chemistry, High Accuracy basecalling).</li>' +
    '<li><strong>📤 Output:</strong> Detailed clinical HTML report with sensitivity profile for 13 key anti-tuberculosis drugs (RIF, INH, EMB, PZA, BDQ, LZD, etc.) and a QC report for the bioinformatician.</li></ul><hr>' +
    av('ok', 'ok', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    '<p>Mutation annotation follows the <strong>WHO catalogue of mutations</strong> in the M. tuberculosis complex (2021; 2023 update) — the international standard for genotypic MTB drug resistance interpretation.</p>' +
    tbl(['Drug', 'Genes', 'Key Mutations'], [
      ['<strong>Rifampicin</strong>', '<em>rpoB</em>', 'RRDR cluster, S450L — MDR-TB marker'],
      ['<strong>Isoniazid</strong>', '<em>katG</em>, <em>inhA</em> promoter, <em>fabG1</em>', 'S315T (katG), C-15T (inhA)'],
      ['<strong>Ethambutol</strong>', '<em>embB</em>', 'M306V/I, Q497R'],
      ['<strong>Pyrazinamide</strong>', '<em>pncA</em> (+ promoter)', 'Diverse loss-of-function variants across the gene'],
      ['<strong>Fluoroquinolones</strong> (levo-/moxifloxacin)', '<em>gyrA</em>, <em>gyrB</em>', 'A90V, D94G/N/Y/A — pre-XDR marker'],
      ['<strong>Aminoglycosides / Capreomycin</strong>', '<em>rrs</em>, <em>eis</em> promoter, <em>tlyA</em>', 'A1401G (rrs), C-14T (eis)'],
      ['<strong>Bedaquiline / Clofazimine</strong>', '<em>Rv0678</em>, <em>atpE</em>, <em>pepQ</em>', 'Rv0678 inactivation → BDQ/CFZ cross-resistance'],
      ['<strong>Linezolid</strong>', '<em>rrl</em>, <em>rplC</em>', 'C154R (rplC)'],
      ['<strong>Delamanid / Pretomanid</strong>', '<em>ddn</em>, <em>fgd1</em>, <em>fbiA/B/C</em>', 'Loss of prodrug-activation function']
    ]) +
    '<p>Special attention goes to <em><strong>Rv0678</strong></em> mutations: new-generation drugs (bedaquiline, clofazimine) are part of modern MDR-TB regimens, and cross-resistance between them via Rv0678 regulator inactivation is a rapidly growing problem.</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<p>The pipeline integrates advanced ML architectures including graph neural networks (GNN) and Self-Attention mechanisms.</p>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Current Version'], [['<strong>OnSiteSeq Tuberculosis Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>ML Models</h3>' +
    tbl(['Model', 'Version', 'Description &amp; Changelog'], [
      ['<strong>TB-Lineage-Detector</strong>', '<code>v2</code>', '<a href="/ml/tb-lineage-detector/">Vector-based lineage classification</a>'],
      ['<strong>TB-Res-Detector</strong>', '<code>v2</code>', '<a href="/ml/tb-res-detector/">Graph neural network for resistance prediction</a>']
    ]) + '<hr>' +
    '<h2>📚 Publications &amp; Conferences</h2>' +
    '<ul><li><strong>NGS-2026</strong> — <a href="/conferences/ngs-2026/">Conference page</a></li></ul><hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Alignment (Mapping)</strong>', '<code>minimap2 2.26</code>, <code>samtools ≥1.17</code> (Reference: H37Rv)'],
      ['<strong>2. Variant Calling</strong>', 'Neural network <code>clair3 ≥1.0.4</code>'],
      ['<strong>3. Annotation</strong>', '<code>snpEff 5.1</code> + WHO mutation catalogue (2023)'],
      ['<strong>4. ML Inference (Lineage &amp; Resistance)</strong>', '<code>PyTorch</code>, <code>torch-geometric</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🖥 Sample Pipeline Card in OnSiteSeq Cockpit</h2>' +
    '<p><img src="/assets/images/cockpit/cockpit_tub.JPG" alt="OnSiteSeq TUB pipeline card in Cockpit"></p><hr>' +
    '<h2>📋 Sample Reports</h2>' +
    '<ul><li>📄 <strong><a href="/reports/tub">Sample HTML Report for Clinician (Tuberculosis)</a></strong></li>' +
    '<li>💻 <strong><a href="/reports/tub/">Detailed Bioinformatics Report (Tuberculosis)</a></strong></li></ul><hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, Global TB Report</strong> — ~10.6 million new TB cases annually; Russia is on the list of 30 high <strong>MDR/RR-TB</strong> burden countries.</li>' +
    '<li><strong>Beijing lineage (L2)</strong> — dominates in Russia and Eurasia and is associated with multidrug resistance and increased transmissibility. Accurate lineage determination (TB-Lineage-Detector) is an epidemiologically significant result, not an academic exercise.</li>' +
    '<li><strong>New drugs</strong> (bedaquiline, pretomanid, linezolid — BPaL/BPaLM regimens) are rapidly changing the resistance landscape; genotypic surveillance of Rv0678/rrl is a priority for the coming years.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240082410">WHO — Catalogue of mutations in the M. tuberculosis complex (2023)</a></li>' +
    '<li>📄 <a href="https://www.who.int/teams/global-tuberculosis-programme/tb-reports">WHO — Global Tuberculosis Report</a></li>' +
    '<li>📄 <a href="https://tbdr.lshtm.ac.uk/">TBProfiler — MTB resistance marker database</a></li></ul><hr>' +
    '<h2>🔬 Related OnSiteSeq Research</h2>' +
    '<p><strong>Research:</strong></p>' +
    '<ul><li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_Tub_Demography.pdf">Tuberculosis and Russia\'s Demographics. Impact Analysis (PDF)</a></li>' +
    '<li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_Tub_Multy_Drug_Resistance.pdf">Analysis of Multidrug Resistance in M. tuberculosis (PDF)</a></li></ul>';

  /* ── COCKPIT ── */
  EN['/cockpit/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Cockpit</h1>' +
    '<p style="font-size:1.2em;color:#555">Web application for managing Snakemake bioinformatics pipelines</p></div><hr>' +
    '<h2>📋 Description</h2>' +
    '<p>OnSiteSeq Cockpit is a web application for managing containerised bioinformatics Snakemake pipelines. Launch analyses from a browser: select a pipeline from the Harbor catalogue, specify the input <code>.fastq.gz</code> sample, and receive clinical and QC reports — no command-line required.</p><hr>' +
    '<h2>🖥 Deployment Variants</h2>' +
    '<h3>Edge</h3><p>Version for the OnSiteSeq Edge hardware-software complex. Interface adapted for touchscreen use. Pipelines distributed as <strong>arm64</strong> Docker containers via <code>harbor.onsiteseq.io</code>.</p>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'arm64'],
      ['<strong>Target device</strong>', 'Nvidia Jetson AGX'],
      ['<strong>Containers</strong>', 'arm64 Docker images']
    ]) +
    '<h3>Desktop</h3><p>Version for the physician\'s or researcher\'s workstation. Runs standalone or paired with OnSiteSeq Edge.</p>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'x86'],
      ['<strong>Target device</strong>', 'Workstation'],
      ['<strong>Containers</strong>', 'x86 Docker images']
    ]) +
    '<h3>Cloud</h3><p>Version adapted for cloud providers. Available at <a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a>.</p>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'x86'],
      ['<strong>Address</strong>', 'cloud.onsiteseq.io'],
      ['<strong>Containers</strong>', 'x86 Docker images']
    ]) + '<hr>' +
    '<h2>⚙️ Technology Stack</h2>' +
    tbl(['Layer', 'Technology'], [
      ['<strong>Frontend</strong>', 'Vue 3 + Vite + Pinia + Axios'],
      ['<strong>Backend</strong>', 'Python 3.12 + FastAPI + SQLAlchemy async'],
      ['<strong>Database</strong>', 'PostgreSQL 16 (asyncpg driver)'],
      ['<strong>Migrations</strong>', 'Alembic (async)'],
      ['<strong>Image Registry</strong>', 'Harbor Registry (harbor.onsiteseq.io)'],
      ['<strong>Orchestration</strong>', 'Docker Compose v2'],
      ['<strong>Frontend web server</strong>', 'Nginx (static from Vite build)']
    ]) + '<hr>' +
    '<h2>📸 Screenshots</h2>' +
    '<h3>Pipeline Catalogue</h3><p>Available pipeline cards with tags, compatibility status (Edge / Cockpit / Cloud) and a launch button. Catalogue sync with <code>harbor.onsiteseq.io</code> in one click.</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_view.jpg" alt="OnSiteSeq Cockpit pipeline catalogue"></p><hr>' +
    '<h3>Launching an Analysis</h3><p>Select pipeline, run name, and input <code>.fastq.gz</code> sample. Files are detected automatically from the data folder.</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_run2.jpg" alt="Pipeline run form"></p><hr>' +
    '<h3>Results: Clinical and QC Reports</h3><p>After completion, Cockpit displays Snakemake step progress and a list of ready reports: clinical (for the physician) and QC report (for the bioinformatician).</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_run6.jpg" alt="Run results with reports"></p><hr>' +
    '<h2>🔗 Related Components</h2>' +
    '<ul><li><a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> — Docker image registry</li>' +
    '<li><a href="/aboutonsiteseq/">OnSiteSeq Edge</a> — hardware-software complex</li>' +
    '<li><a href="/tuberculosis/">OnSiteSeq TUB — Tuberculosis pipeline</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1 pipeline</a></li></ul>';

  /* ── EDGE ── */
  EN['/edge/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Edge</h1>' +
    '<p style="font-size:1.2em;color:#555">Autonomous hardware-software complex for point-of-care sequencing</p></div><hr>' +
    '<h2>📋 Description</h2>' +
    '<p>OnSiteSeq Edge is an autonomous hardware-software complex (HSC) for point-of-care sequencing. From FASTQ to clinical conclusion right at the patient\'s bedside or physician\'s desk. Can be used in the field, in remote arctic regions, and anywhere without permanent access to laboratory equipment or server infrastructure.</p><hr>' +
    '<h2>🔧 Key Specifications</h2>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'arm64'],
      ['<strong>GPU Module</strong>', 'Nvidia Jetson AGX'],
      ['<strong>Sequencer</strong>', 'Nanoporus, Russia'],
      ['<strong>Interface</strong>', 'Touchscreen'],
      ['<strong>Printing</strong>', 'Built-in thermal printer'],
      ['<strong>Connectivity</strong>', 'Built-in Wi-Fi/4G communication module'],
      ['<strong>Storage</strong>', 'Built-in high-capacity NVMe SSD'],
      ['<strong>Container Registry</strong>', 'harbor.onsiteseq.io (arm64 Docker images)']
    ]) + '<hr>' +
    '<h2>⚙️ Capabilities</h2>' +
    '<ul><li>Built-in sample preparation tools</li>' +
    '<li>Data acquisition from built-in Nanoporus sequencer</li>' +
    '<li>Data processing by Nvidia Jetson AGX GPU module</li>' +
    '<li>Printing clinical and bioinformatics reports on built-in thermal printer</li>' +
    '<li>OnSiteSeq Cockpit pipeline management system — Edge version, adapted for touchscreen</li>' +
    '<li>Open architecture — continuously updated marketplace of arm64 containers</li></ul><hr>' +
    '<h2>📷 Hardware Components</h2>' +
    '<p><img src="/assets/images/photo/nvidia_xavier_agx/view.png" alt="OnSiteSeq Edge — hardware"></p>' +
    '<p><strong>(A)</strong> Flongle cassette &nbsp; <strong>(B)</strong> Nanoporus nanopore NGS sequencer &nbsp; <strong>(C)</strong> Touchscreen &nbsp; <strong>(D)</strong> Syringe dispenser &nbsp; <strong>(E)</strong> Wi-Fi/4G communication module &nbsp; <strong>(F)</strong> CPU/GPU on Nvidia Jetson AGX &nbsp; <strong>(G)</strong> Amplifier &nbsp; <strong>(H)</strong> Thermal printer</p><hr>' +
    '<h2>🔬 Workflow</h2>' +
    '<p><img src="/assets/images/photo/nvidia_xavier_agx/onsiteseq_diagramm.png" alt="OnSiteSeq Edge workflow diagram"></p>' +
    '<ol><li><strong>Sample preparation</strong></li>' +
    '<li><strong>Amplification</strong> using the MIPT YourPCR amplifier <strong>(G)</strong></li>' +
    '<li><strong>Sample loading</strong> via dispenser <strong>(D)</strong> into Flongle Flow Cell <strong>(A)</strong> connected to Nanoporus sequencer <strong>(B)</strong></li>' +
    '<li><strong>Run launch</strong> in MinKNOW</li>' +
    '<li><strong>Basecalling</strong> in Dorado — generates raw reads file (<code>fastq.gz</code>)</li>' +
    '<li><strong>Pipeline launch</strong> in OnSiteSeq Cockpit with GPGPU computing on Nvidia Jetson AGX <strong>(F)</strong></li>' +
    '<li><strong>Review</strong> clinical and bioinformatics report on the built-in screen <strong>(C)</strong></li>' +
    '<li><strong>Print</strong> report on built-in thermal printer <strong>(H)</strong></li></ol><hr>' +
    '<h2>📦 Pipelines</h2>' +
    '<p>Bioinformatics tools are distributed via <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> as arm64 Docker containers. Currently available:</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — Tuberculosis</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>More solutions will be added.</p>';

  /* ── DESKTOP ── */
  EN['/desktop/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Desktop</h1>' +
    '<p style="font-size:1.2em;color:#555">Bioinformatics pipeline management system for the workstation</p></div><hr>' +
    '<h2>📋 Description</h2>' +
    '<p>OnSiteSeq Desktop is the workstation variant of the OnSiteSeq Cockpit bioinformatics pipeline management system, adapted for the physician\'s or researcher\'s computer. Can work paired with OnSiteSeq Edge or use data from other equipment.</p><hr>' +
    '<h2>🔧 Key Specifications</h2>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'x86'],
      ['<strong>Target device</strong>', 'Workstation'],
      ['<strong>Container Registry</strong>', 'harbor.onsiteseq.io (x86 Docker images)']
    ]) + '<hr>' +
    '<h2>⚙️ Capabilities</h2>' +
    '<ul><li>Pipeline management via Cockpit web interface</li>' +
    '<li>Works paired with OnSiteSeq Edge or standalone</li>' +
    '<li>Continuously updated marketplace of x86 containers</li>' +
    '<li>Supports FASTQ data from any sequencing equipment</li></ul><hr>' +
    '<h2>📦 Pipelines</h2>' +
    '<p>Bioinformatics tools distributed via <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> as x86 Docker containers.</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — Tuberculosis</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>More solutions will be added.</p>';

  /* ── CLOUD ── */
  EN['/cloud/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Cloud</h1>' +
    '<p style="font-size:1.2em;color:#555">Cloud-based bioinformatics pipeline management system</p></div><hr>' +
    '<h2>📋 Description</h2>' +
    '<p>OnSiteSeq Cloud is the cloud variant of the OnSiteSeq Cockpit pipeline management system, adapted for cloud providers. Available at <a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a>.</p><hr>' +
    '<h2>🔧 Key Specifications</h2>' +
    tbl(['Parameter', 'Value'], [
      ['<strong>Architecture</strong>', 'x86'],
      ['<strong>Address</strong>', 'cloud.onsiteseq.io'],
      ['<strong>Container Registry</strong>', 'harbor.onsiteseq.io (x86 Docker images)']
    ]) + '<hr>' +
    '<h2>⚙️ Capabilities</h2>' +
    '<ul><li>Launch analyses via browser — no software installation required</li>' +
    '<li>Scalable for cloud providers</li>' +
    '<li>Continuously updated marketplace of x86 containers</li>' +
    '<li>Supports FASTQ data from any equipment</li></ul><hr>' +
    '<h2>🔗 Go to Cloud</h2>' +
    '<p><a href="https://cloud.onsiteseq.io">→ cloud.onsiteseq.io</a></p><hr>' +
    '<h2>📦 Pipelines</h2>' +
    '<p>Bioinformatics tools distributed via <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> as x86 Docker containers.</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — Tuberculosis</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>More solutions will be added.</p>';

  /* ── CONTACT ── */
  EN['/contact/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem"><h1>Contacts</h1></div><hr>' +
    '<h2>📬 Get in Touch</h2>' +
    '<ul><li><strong>Telegram:</strong> <a href="https://t.me/gorbenkoteh">t.me/gorbenkoteh</a></li>' +
    '<li><strong>e-mail:</strong> gorbenko.ra@phystech.edu</li></ul>' +
    '<h2>📬 Additional Information</h2>' +
    '<ul><li><strong>Dzen (blog, videos, news):</strong> <a href="https://dzen.ru/intermsofbioinformatics">dzen.ru/intermsofbioinformatics</a></li>' +
    '<li><strong>Cloud version:</strong> <a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a></li>' +
    '<li><strong>Containerised pipeline registry:</strong> <a href="https://harbor.onsiteseq.io">harbor.onsiteseq.io</a></li></ul><hr>';

  /* ── ML / HIV ── */
  EN['/ml/hiv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>Machine Learning Models: OnSiteSeq HIV</h1>' +
    '<p style="font-size:1.2em;color:#555">Deep learning for high-precision HIV-1 genomic surveillance and resistance prediction</p></div><hr>' +
    '<h2>🧠 Innovative Approach to the HIV-1 Genome</h2>' +
    '<p>Standard foreign algorithms (including those developed in the US) are often trained on databases that do not reflect the epidemiological specifics of the Russian Federation. The HIV-1 epidemic in Russia has a pronounced monophyletic character.</p>' +
    '<p>Our proprietary neural network models are developed with the domestic epidemiology in mind and use advanced ML architectures to deliver unprecedented diagnostic accuracy.</p><hr>' +
    '<h2>🧬 HIV-1-M-Env-Rus (Version 1.0)</h2>' +
    '<p>Specialised neural network model for classifying genetic variants of HIV-1. Solves the critical task of detecting dominant and recombinant forms of the virus circulating in the Russian Federation.</p>' +
    '<ul><li><strong>Target region:</strong> Nucleotide sequence analysis of the <strong>Env</strong> gene.</li>' +
    '<li><strong>Russia-specific:</strong> Optimised for ultra-precise detection of subtype <strong>A6</strong> (>80% of cases in Russia) and complex circulating recombinant forms such as <strong>CRF63_02A6</strong>.</li>' +
    '<li><strong>Architecture:</strong> Deep learning on PyTorch with integration into an automated Snakemake data preparation pipeline.</li>' +
    '<li><strong>Output:</strong> Percentage probability of isolate belonging to a specific subtype.</li></ul><hr>' +
    '<h2>🛡️ HIV-1-Resist-Rus (Version 1.0)</h2>' +
    '<p>Flagship model for predicting viral resistance to the major classes of antiretroviral therapy (ART).</p>' +
    '<ul><li><strong>Target genes:</strong> Key genome regions responsible for viral survival — <strong>PR</strong> (protease), <strong>RT</strong> (reverse transcriptase), <strong>IN</strong> (integrase).</li>' +
    '<li><strong>ID-CNN + Self-Attention architecture:</strong> 1D convolutional networks combined with attention mechanism enable the model to detect <strong>epistasis</strong> — complex interactions where one mutation can amplify or suppress the effect of another.</li>' +
    '<li><strong>Database integration:</strong> Model calibrated using current global (Stanford HIVDB) and Russian resistance databases.</li></ul><hr>' +
    '<h2>🚀 HIV-1-Resist-Rus (Version 3.0)</h2>' +
    '<p><strong>A major update transitioning the system from research prototype to clinically applicable tool.</strong> Repository: <a href="https://gitverse.ru/onsiteseq/HIV-1-Resist-Rus">gitverse.ru/onsiteseq/HIV-1-Resist-Rus</a></p>' +
    '<h3>What changed in v3</h3>' +
    tbl(['Component', 'v1 / v2', '<strong>v3</strong>'], [
      ['Drugs', '1 (DTG) / 14', '<strong>14 (all ART classes)</strong>'],
      ['Training dataset', 'Stanford interim CSVs + synthetic', '<strong>37,641 LANL sequences</strong>'],
      ['Labelling', 'Fold-change ≥3.5', '<strong>Stanford Sierra API (gold standard)</strong>'],
      ['Class distribution', '60–92% resistant (synthetic)', '<strong>0.8–10.8% (real-world)</strong>'],
      ['Validation', 'Internal (val split)', '<strong>356 patients — CRIFEM Rospotrebnadzor</strong>'],
      ['Mean AUC (external)', '~0.727', '<strong>0.990</strong>']
    ]) +
    '<h3>HybridResistanceCNN Architecture</h3>' +
    '<p>Three parallel branches:</p>' +
    '<ul><li><strong>Embedding + CNN ×3</strong> — local patterns in amino acid sequence (RT: 240 positions / PR: 99 / IN: 288)</li>' +
    '<li><strong>Self-Attention</strong> — long-range epistasis between distant positions</li>' +
    '<li><strong>MutationMLP</strong> — two-layer perceptron on key positions (K65R, M184V, K103N, G140S, etc.)</li></ul>' +
    '<p>Three branches merged via Fusion layer → Dropout → Linear → P(resistant) ∈ [0, 1].</p>' +
    '<p><strong>Key engineering decisions:</strong> Focal Loss (α=0.75, γ=2.0) for class imbalance (≤1% resistant), WeightedRandomSampler, OneCycleLR (80 epochs), threshold calibration via Youden index.</p>' +
    '<h3>External Validation Results — v3</h3>' +
    '<p>Validated on <strong>356 de-identified patients from CRIFEM Rospotrebnadzor</strong> (EpidRuSeq cohort). Gold standard: Stanford HivDB conclusions per drug.</p>' +
    '<blockquote><strong>Mean AUC = 0.990</strong> — matches Stanford HIV Drug Resistance Database accuracy in fully offline mode, with no data transmission to foreign servers.</blockquote>' +
    tbl(['Drug', 'Class', 'AUC', 'F1', 'Sensitivity', 'Specificity', 'ΔAUC vs v2'], [
      ['<strong>DRV</strong>', 'PI', '<strong>1.000</strong>', '<strong>1.000</strong>', '<strong>1.000</strong>', '<strong>1.000</strong>', '+0.017'],
      ['<strong>DTG</strong>', 'INSTI', '<strong>1.000</strong>', '0.800', '<strong>1.000</strong>', '0.994', '+0.272'],
      ['3TC', 'NRTI', '0.999', '0.964', '0.982', '0.990', '+0.019'],
      ['RAL', 'INSTI', '0.999', '0.898', '0.957', '0.988', '+0.670'],
      ['EVG', 'INSTI', '0.999', '0.898', '0.957', '0.988', '+0.178'],
      ['ABC', 'NRTI', '0.997', '0.957', '0.965', '0.990', '+0.549'],
      ['ATV/r', 'PI', '0.997', '0.811', '0.938', '0.982', '+0.141'],
      ['LPV/r', 'PI', '0.997', '0.762', '0.889', '0.988', '+0.210'],
      ['BIC', 'INSTI', '0.996', '0.500', '0.750', '0.986', '+0.319'],
      ['TDF', 'NRTI', '0.989', '0.809', '0.826', '0.985', '+0.222'],
      ['AZT', 'NRTI', '0.987', '0.933', '0.913', '0.997', '+0.161'],
      ['ETR', 'NNRTI', '0.981', '0.889', '0.941', '0.970', '+0.171'],
      ['EFV', 'NNRTI', '0.972', '0.879', '0.954', '0.952', '+0.070'],
      ['NVP', 'NNRTI', '0.949', '0.857', '0.882', '0.958', '+0.041'],
      ['<strong>Mean</strong>', '', '<strong>0.990</strong>', '<strong>0.854</strong>', '<strong>0.925</strong>', '<strong>0.984</strong>', '']
    ]) +
    '<p><em>12 of 14 drugs exceed the clinical threshold AUC ≥ 0.90 and sensitivity ≥ 0.85.</em></p><hr>' +
    '<h2>⚙️ Technologies and BioMLOps</h2>' +
    '<ul><li><strong>Data Management (DVC):</strong> Versioning of training datasets, model weights, and feature extraction pipelines. Guarantees 100% experiment traceability.</li>' +
    '<li><strong>Continuous Training:</strong> Automated retraining pipeline triggered by updates to external databases (Stanford HIVDB), with early model degradation detection on hold-out set.</li>' +
    '<li><strong>Technology Stack:</strong> <code>PyTorch (≥2.0)</code>, <code>Snakemake</code>, <code>DVC</code>, <code>BioPython</code>.</li></ul><hr>' +
    '<blockquote>💡 <strong>Scientific Validation</strong> — Effectiveness of our models and BioMLOps methodology has been recognised by the academic community. Results presented at leading conferences:<br>' +
    '• Subtype classification (HIV-1-M-Env-Rus) — <strong><a href="/conferences/mnsk-2026/">MNSK-2026</a></strong><br>' +
    '• Resistance prediction and BioMLOps (HIV-1-Resist-Rus) — <strong><a href="/conferences/msit-2026/">MSIT-2026</a></strong></blockquote>';

  /* ── HPV (ONCOLOGY) ── */
  EN['/hpv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hpv.svg" alt="Human Papillomavirus" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Human Papillomavirus Genotyping and Molecular Triage for Cervical Cancer</h1>' +
    '<p style="font-size:1.2em;color:#555">Our first oncology pipeline — from the root cause (HPV) to the key element of prevention: point-of-care screening</p></div><hr>' +
    '<h2>🧬 Why HPV Is the Entry Point into Oncology</h2>' +
    '<p>Human papillomavirus (HPV) is the <strong>necessary cause</strong> of virtually 100% of cervical cancer cases, as well as a significant share of anal, oropharyngeal, vulvar, vaginal and penile cancers. This is a rare case in oncology where a cancer has a single established infectious driver — meaning it can be <strong>prevented</strong> by detecting the virus and assessing risk long before a tumour appears.</p>' +
    '<p>The WHO has set the goal of <strong>eliminating cervical cancer</strong> through the <strong>90–70–90</strong> strategy:</p>' +
    '<ul><li><strong>90%</strong> of girls fully vaccinated against HPV by age 15;</li>' +
    '<li><strong>70%</strong> of women screened with a high-performance HPV test (by ages 35 and 45);</li>' +
    '<li><strong>90%</strong> of women with identified disease receive treatment.</li></ul>' +
    '<p>The second pillar — the "high-performance HPV test" — is the niche where sequencing delivers what classic qPCR screening cannot. This is where OnSiteSeq kicks the door into oncology.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: cervical swab or self-collected vaginal sample.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — HPV genotype(s), integration status, methylation triage with risk category (low / moderate / high CIN2+ risk); QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: I — dsDNA</h2>' +
    '<p>Class I comprises double-stranded DNA viruses: their genome is transcribed into mRNA by cellular RNA polymerase II, following the same logic as the host cell\'s own genes. HPV carries a small circular dsDNA genome (~8 kb) that is usually maintained in epithelial cells as an <strong>episome</strong> — an autonomous circular molecule in the nucleus, without integration into chromosomes. The clinical turning point comes with <strong>integration</strong>: the circular viral DNA breaks (most often near the <em>E2</em> gene) and inserts into the host genome — losing E2 control releases the brake on the <em>E6/E7</em> oncogenes and launches carcinogenesis. It is precisely this episome → integration transition that our pipeline detects from chimeric "virus–human" reads (see the "What the Pipeline Determines" section below), while the dsDNA nature of the genome allows native DNA to be read directly by the nanopore — including direct methylation calling without bisulfite conversion.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    '<h2>🎯 What the Pipeline Determines: Three Levels of Analysis</h2>' +
    '<p>Unlike qPCR panels that only give a "yes/no" for a few genotypes, nanopore sequencing solves three tasks of differing clinical weight in a single run.</p>' +
    tbl(['Level', 'Task', 'Clinical Significance'], [
      ['<strong>1. Genotyping</strong>', 'All 14 high-risk genotypes (16, 18, 31, 33, 35, 39, 45, 51, 52, 56, 58, 59, 66, 68), co-infections and rare types in one test', 'HPV-16/18 cause ~70% of cervical cancer'],
      ['<strong>2. Integration status</strong>', 'Detection of HPV genome integration into the host genome via chimeric "virus–human" reads', 'Integration disrupting <em>E2</em> → overexpression of oncogenes <em>E6/E7</em> — a driver of carcinogenesis'],
      ['<strong>3. Methylation (triage)</strong>', 'Direct native-DNA methylation calling: host genes <em>CADM1, MAL, FAM19A4/miR124-2</em> and viral <em>L1/L2</em>', 'Molecular triage: separate transient infection from precancer (CIN2+) without colposcopy']
    ]) +
    '<p><strong>The key nanopore advantage:</strong> long reads span the "virus–host" insertion junction in full, and native DNA reading enables methylation calling <strong>without bisulfite conversion and without a separate test</strong>. Illumina and qPCR cannot deliver this in a single run.</p>' +
    '<blockquote>This is not merely a "positive/negative" test, but <strong>risk stratification</strong>: the very transition "from the root cause to the key element of prevention".</blockquote><hr>' +
    '<h2>💉 HPV and Vaccines: Why Screening Remains Mandatory</h2>' +
    tbl(['Vaccine', 'Genotypes', 'Share of cervical cancer covered'], [
      ['<strong>Bivalent</strong> (Cervarix)', '16, 18', '~70%'],
      ['<strong>Quadrivalent</strong> (Gardasil)', '6, 11, 16, 18', '~70% + genital warts'],
      ['<strong>Nine-valent</strong> (Gardasil-9)', '6, 11, 16, 18, 31, 33, 45, 52, 58', '~90%']
    ]) +
    '<ul><li><strong>Vaccination does not replace screening</strong> — non-vaccine oncogenic types (35, 39, 51, 56, 59, 66, 68) continue to circulate.</li>' +
    '<li><strong>Sequencing tracks type replacement</strong> — genotype distribution shifts in vaccinated populations, and only a full-type test monitors this dynamic.</li>' +
    '<li><strong>Co-infections</strong> — qPCR panels often miss multiple infections; nanopore reading sees the full spectrum of types in a sample at once.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq HPV Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML Models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>HPV-Genotyper</strong>', 'HPV genotype classification from L1 (mirrors the HIV-1-M subtype architecture: CNN + Self-Attention)'],
      ['<strong>HPV-Integration-Caller</strong>', 'Detection and localisation of integration sites from chimeric reads'],
      ['<strong>HPV-Methyl-Triage</strong>', 'CIN2+ risk scoring from host and viral methylation patterns']
    ]) +
    '<p>Training is planned on the open <strong>PaVE (Papillomavirus Episteme, NCBI)</strong> and <strong>TCGA-CESC</strong> (methylation and integration) databases, with validation on Russian clinical samples.</p><hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (PaVE references: HPV16 NC_001526 et al. + <code>GRCh38</code> for integration)'],
      ['<strong>3. Genotyping / consensus</strong>', '<code>medaka</code>, <code>samtools</code>, custom L1 genotype database'],
      ['<strong>4. Integration detection</strong>', 'Split/chimeric "virus–host" read search (<code>pysam</code>, custom caller)'],
      ['<strong>5. Methylation</strong>', '<code>Dorado</code> (5mC/5hmC modifications), <code>modkit</code>'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>BioPython</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Why It Matters: Screening Where There Is None</h2>' +
    '<ul><li><strong>GLOBOCAN 2020</strong> — about <strong>604,000 new cases</strong> and <strong>342,000 deaths</strong> from cervical cancer worldwide each year; 4th most common cancer in women. Yet it is one of the few fully preventable cancers.</li>' +
    '<li><strong>Russia</strong> — thousands of new cases annually; incidence is rising in women under 45, where screening coverage is lowest.</li></ul>' +
    '<p>The main barrier to the 90–70–90 strategy is <strong>coverage</strong> (the "70%" pillar). Centralised qPCR laboratories are unavailable in remote regions, and women do not always reach colposcopy.</p>' +
    '<p>This is where the OnSiteSeq <strong>Edge</strong> architecture works:</p>' +
    '<ul><li><strong>Self-sampling</strong> + on-site analysis — WHO recommends self-collection to increase screening coverage;</li>' +
    '<li><strong>Far North regions and mobile teams</strong> — same-day result, no cold chain to a central laboratory;</li>' +
    '<li><strong>Data sovereignty</strong> — the patient\'s genomic data never leaves the medical facility perimeter.</li></ul>' +
    '<ul><li><strong>WHO, 2020</strong> — <a href="https://www.who.int/publications/i/item/9789240014107">Global strategy to eliminate cervical cancer</a>.</li>' +
    '<li><strong>WHO, 2021</strong> — HPV DNA testing recommended as the <strong>primary</strong> screening method (replacing cytology/Pap test).</li>' +
    '<li><strong>IARC</strong> — HPV classified as a Group 1 carcinogen.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://pave.niaid.nih.gov/">PaVE — Papillomavirus Episteme (NIAID/NCBI)</a></li>' +
    '<li>📄 <a href="https://www.who.int/initiatives/cervical-cancer-elimination-initiative">WHO: Cervical cancer elimination initiative</a></li>' +
    '<li>📄 <a href="https://portal.gdc.cancer.gov/projects/TCGA-CESC">TCGA-CESC — Cervical Squamous Cell Carcinoma (GDC)</a></li></ul>';

  /* ── GONORRHOEAE ── */
  EN['/gonorrhoeae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_gonorrhoeae.svg" alt="Neisseria gonorrhoeae" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Neisseria gonorrhoeae</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic surveillance of gonococci — a WHO priority AMR pathogen</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Neisseria gonorrhoeae</em> (gonococcus) is the causative agent of gonorrhoea, the second most prevalent bacterial sexually transmitted infection. WHO has included it in the <strong>Priority AMR Pathogen list</strong> (high-priority category): strains resistant to ceftriaxone — the last reliable antibiotic — have been detected worldwide, including in Russia.</p>' +
    '<p>Our pipeline delivers a complete nanopore data analysis cycle to detect resistance mutations directly at the bedside or in the laboratory, without transmitting data to foreign servers.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (R10.4.1 chemistry, Dorado SUP). Optimal: amplicon sequencing of <em>penA</em>, <em>gyrA</em>, <em>parC</em>, <em>mtrR</em>, <em>23S rRNA</em> genes <strong>or</strong> whole-genome sequencing (WGS).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician with susceptibility profile for 6 antibiotic classes, and QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    '<p>The pipeline analyses nine key genetic determinants of gonococcal resistance. Ceftriaxone resistance is <strong>cumulative</strong>: mosaic <em>penA</em> + <em>mtrR</em> + <em>penB</em> + <em>ponA</em> each add to MIC elevation, so the full profile matters, not a single gene:</p>' +
    tbl(['Gene / Locus', 'Key Mutations', 'Antibiotic Class'], [
      ['<strong>penA</strong>', 'A501V/T/P/G; mosaic penA (incl. penA-60 of clone FC428)', 'Cephalosporins (ceftriaxone, cefixime) — <strong>last-resort antibiotics</strong>'],
      ['<strong>penB</strong> (porin PorB)', 'G101K, A102D/N', 'Cephalosporins, penicillins (reduced permeability)'],
      ['<strong>ponA</strong> (PBP1)', 'L421P', 'Cephalosporins, penicillins (MIC contribution)'],
      ['<strong>gyrA</strong>', 'S91F, D95G/A/N', 'Fluoroquinolones (ciprofloxacin)'],
      ['<strong>parC</strong>', 'S87R, D86N, E91K', 'Fluoroquinolones (ciprofloxacin, ampicillin)'],
      ['<strong>23S rRNA</strong>', 'A2059G, C2611T', 'Macrolides (azithromycin) — <strong>frequent co-resistance</strong>'],
      ['<strong>mtrR</strong>', 'A39T, G45D (promoter del -35)', 'Multiple classes — efflux pump overexpression'],
      ['<strong>rpsJ</strong>', 'V57M', 'Tetracyclines (doxycycline)'],
      ['<strong>blaTEM-1</strong>', 'Presence/absence (PPNG)', 'Penicillins — plasmid-mediated resistance']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq GC Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>GC-Res-Detector</strong>', 'AMR phenotype prediction from WGS (all antibiotic classes)'],
      ['<strong>GC-Typer</strong>', 'In silico MLST (PubMLST NG-MAST / MLST scheme) + GASP typing'],
      ['<strong>GC-NG-STAR</strong>', 'NG-STAR typing — the GASP AMR surveillance standard (penA/mtrR/porB/ponA/gyrA/parC/23S profile)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2 2.26</code>, <code>samtools</code> (Reference: N. gonorrhoeae FA1090)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3 ≥1.0.4</code>, <code>medaka</code>'],
      ['<strong>4. AMR gene detection</strong>', '<code>AMRFinderPlus</code> (NCBI), <code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. MLST typing</strong>', '<code>mlst</code> (PubMLST N. gonorrhoeae scheme) + <strong>NG-STAR</strong> typing (GASP standard)'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO GASP</strong> — Global Antimicrobial Surveillance Programme for gonorrhoea monitors resistance trends in >70 countries; ceftriaxone MIC elevation is the critical signal.</li>' +
    '<li><strong>Russia</strong> — Data from NICD suggest fluoroquinolone resistance exceeds 50% in many regions; azithromycin co-resistance is rising.</li>' +
    '<li><strong>XDR gonorrhoea</strong> — Extensively drug-resistant strains (resistant to ceftriaxone + azithromycin) detected in Japan, UK, Australia — a global public health emergency.</li>' +
    '<li><strong>Clone FC428</strong> — a globally spreading ceftriaxone-resistant clone carrying mosaic <em>penA-60</em>; its detection is flagged in the report as an epidemiological alarm marker.</li>' +
    '<li><strong>Treatment shift</strong> — since 2020 (CDC) first-line therapy is ceftriaxone 500 mg IM monotherapy; azithromycin was dropped from dual regimens due to rising macrolide resistance. Zoliflodacin — the first new antigonococcal class in decades — has completed a successful phase III trial, and the pipeline resistance profile is ready to extend to it.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<p>Related STI pipelines: 🧬 <a href="/syphilis/">Syphilis (T. pallidum)</a> · 🧬 <a href="/mycoplasma/">Mycoplasma genitalium</a></p>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240041530">WHO — Global AMR surveillance of Neisseria gonorrhoeae</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — Comprehensive Antibiotic Resistance Database</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/neisseria-gonorrhoeae">PubMLST N. gonorrhoeae Database</a></li></ul>';

  /* ── H. PYLORI ── */
  EN['/helicobacter/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_helicobacter.png" alt="Helicobacter pylori" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Helicobacter pylori</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic resistance and virulence profiling for personalized eradication therapy</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Helicobacter pylori</em> is a Gram-negative bacterium colonizing the gastric mucosa — the leading cause of chronic gastritis and peptic ulcer disease, and a risk factor for gastric cancer (IARC Group 1 carcinogen). Eradication success depends directly on strain susceptibility — above all to clarithromycin and levofloxacin.</p>' +
    '<p>From nanopore sequencing data our pipeline determines the complete resistance profile and key virulence factors (<em>cagA</em>, <em>vacA</em>) directly from biopsy material, without culture — <em>H. pylori</em> is fastidious and slow-growing, so classical bacteriology takes 7–14 days.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (R10.4.1 chemistry, Dorado SUP). Material: antrum or gastric body biopsy. Optimal: amplicon sequencing of <em>23S rRNA</em> and <em>gyrA</em> loci <strong>or</strong> whole-genome sequencing (WGS) of culture/enriched sample.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the clinician with susceptibility profile for eradication regimens and virulence factor status; QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    tbl(['Gene / Locus', 'Key Mutations', 'Antibiotic Class'], [
      ['<strong>23S rRNA</strong>', 'A2142G, A2143G, A2142C', '<strong>Clarithromycin</strong> (macrolides) — key first-line drug'],
      ['<strong>gyrA</strong>', 'N87K, D91G/N/Y', '<strong>Levofloxacin</strong> (fluoroquinolones) — rescue therapy'],
      ['<strong>pbp1A</strong>', 'Multiple amino acid substitutions', '<strong>Amoxicillin</strong> (resistance rare but rising)'],
      ['<strong>rdxA, frxA</strong>', 'Deletions, nonsense mutations (inactivation)', '<strong>Metronidazole</strong>'],
      ['<strong>16S rRNA</strong>', 'A926G, A928C', '<strong>Tetracycline</strong>'],
      ['<strong>rpoB</strong>', 'Point mutations (rif-region cluster)', '<strong>Rifabutin</strong> — third-line therapy'],
      ['<strong>porD, oorD</strong>', 'Inactivating mutations', '<strong>Furazolidone</strong>']
    ]) +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Place in regimens (Maastricht VI)', 'Clinical Significance'], [
      ['<strong>Clarithromycin</strong>', 'First-line triple therapy', 'Empirical use not recommended where regional resistance &gt;15% — genotype needed'],
      ['<strong>Amoxicillin</strong>', 'Component of all regimens', 'Resistance rare; backbone of eradication'],
      ['<strong>Metronidazole</strong>', 'Triple/quadruple therapy component', 'High background resistance; partly overcome by dose and duration'],
      ['<strong>Levofloxacin</strong>', 'Second-line (rescue) therapy', 'Resistance rises fast with unjustified fluoroquinolone use'],
      ['<strong>Tetracycline</strong>', 'Bismuth quadruple therapy', 'Resistance still rare'],
      ['<strong>Rifabutin</strong>', 'Third-line therapy', 'Reserve after multiple eradication failures']
    ]) + '<hr>' +
    '<h2>🧫 Virulence Factors</h2>' +
    '<p>Beyond resistance, the report includes key virulence factor status — prognostically valuable information for the physician:</p>' +
    tbl(['Factor', 'Variants', 'Clinical Significance'], [
      ['<strong>cagA</strong> (cagPAI island)', 'Present / absent', 'cagA+ strains — increased risk of peptic ulcer and gastric cancer'],
      ['<strong>vacA</strong>', 's1/s2, m1/m2 alleles', 's1/m1 — the most toxigenic variant, associated with severe disease']
    ]) +
    '<p>This is where <strong>locus-level graph alignment (OnSiteSeq-PanG)</strong> is truly justified: cagPAI and <em>vacA</em> are hypervariable regions with frequent recombination and deletions, where a single linear reference fails. The graph encodes all known allelic variants of the locus and improves read-mapping completeness in these regions. For conserved resistance genes (23S rRNA, <em>gyrA</em>) standard alignment is used — it is reliable there.</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq HP Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>HP-Res-Detector</strong>', 'Clarithromycin/levofloxacin resistance prediction from genotype'],
      ['<strong>HP-Vir-Typer</strong>', 'cagA/vacA typing (including PanG graph alignment)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (references: 26695 / J99); <strong>OnSiteSeq-PanG</strong> locus pangenome graphs for cagPAI/vacA'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. AMR annotation</strong>', 'Custom mutation database 23S/gyrA/pbp1A/rdxA/frxA/16S/rpoB + <code>AMRFinderPlus</code>'],
      ['<strong>5. Virulence typing</strong>', 'cagPAI detection, <em>vacA</em> allele typing (s/m regions)'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, 2017</strong> — clarithromycin-resistant <em>H. pylori</em> is on the WHO Priority Pathogens List (high priority).</li>' +
    '<li><strong>Russia</strong> — clarithromycin resistance is estimated at 20–30%, above the Maastricht VI threshold (15%): empirical triple therapy without genotyping increasingly fails.</li>' +
    '<li><strong>Gastric cancer</strong> — <em>H. pylori</em> is an IARC Group 1 carcinogen; cagA/vacA status refines individual risk.</li>' +
    '<li>The current standard — culture with antibiogram — takes 7–14 days with low isolation success. Our pipeline delivers a <strong>same-day result</strong> directly from biopsy.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://gut.bmj.com/content/71/9/1724">Maastricht VI / Florence Consensus Report (Gut, 2022)</a></li>' +
    '<li>📄 <a href="https://www.who.int/publications/i/item/WHO-EMP-IAU-2017.12">WHO Priority Pathogens List (2017)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/helicobacter-pylori">PubMLST Helicobacter pylori Database</a></li></ul>';

  /* ── INFLUENZA (штаммовый мониторинг) ── */
  EN['/influenza/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_influenza.png" alt="Influenza virus" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Influenza Strain Monitoring and Antigenic Shift Detection</h1>' +
    '<p style="font-size:1.2em;color:#555">Subtyping, segment reassortment tracking and antiviral resistance profiling</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Influenza virus</strong> combines a high point-mutation rate (antigenic drift) with the ability to swap whole genome segments during co-infection — <strong>reassortment</strong>, whose consequence is antigenic shift and the emergence of new pandemic strains. Subtyping alone is not enough: the origin of each of the 8 segments matters.</p>' +
    '<p>The pipeline performs whole-genome influenza analysis: HA/NA subtyping, reconstruction of all segments, reassortant detection and antiviral resistance profiling. Segment ancestry is tracked with <strong>locus-level graph alignment (OnSiteSeq-PanG)</strong>: the graph encodes the history of known segments and shows which "historical pieces" the patient\'s virus is assembled from. Subtyping and segment assembly use mature standard tools (IRMA, CDC).</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: naso-/oropharyngeal swab, virus culture. Optimal: WGS of all 8 segments (multiplex PCR).</li>' +
    '<li><strong>📤 Output:</strong> HTML report with subtype (H1N1pdm09, H3N2, Victoria/Yamagata), Nextclade assignment, reassortant segment information and resistance profile.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: V — (−)ssRNA, negative-sense single-stranded RNA</h2>' +
    '<p>In Class V viruses the genome is negative-sense single-stranded RNA: such a strand cannot be translated directly by cellular ribosomes, so the virus first synthesises a complementary (+)strand from which proteins are then translated. The required enzyme — RNA-dependent RNA polymerase (RdRp) — is carried inside the virion: the cell has none to offer. The influenza genome is divided into <strong>8 separate (−)ssRNA segments</strong>, and it is precisely this segmentation that enables <strong>reassortment</strong> — the exchange of whole segments when two strains co-infect a single cell, the mechanism of antigenic shift and the birth of pandemic variants. That is why the pipeline analyses the origin of each segment separately (OnSiteSeq-PanG), rather than reporting only the averaged virus subtype.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['I', 'dsDNA', 'DNA → mRNA (like the host cell)', 'Herpesviruses, adenoviruses, smallpox, ASFV'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['<strong>V</strong>', '<strong>(−)ssRNA</strong>', '<strong>First the (+)strand is synthesised (RdRp)</strong>', '<strong>Influenza, SFTS, rabies</strong>'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Key Markers and Resistance</h2>' +
    tbl(['Marker', 'Significance', 'Drug Class'], [
      ['<strong>Hemagglutinin (HA)</strong>', 'H-antigen typing (H1, H3, H5...). Primary vaccine target; matched against the season\'s vaccine strains', '—'],
      ['<strong>Neuraminidase (NA)</strong>', 'N-antigen typing (N1, N2). Mutations H275Y, E119V, R292K', '<strong>Oseltamivir, Zanamivir</strong> (neuraminidase inhibitors)'],
      ['<strong>Polymerase (PA)</strong>', 'Mutations I38T/F/M', '<strong>Baloxavir</strong> (PA endonuclease inhibitor)'],
      ['<strong>M2 protein</strong>', 'S31N mutation (>99% of H3N2 and pH1N1 resistant)', '<strong>Amantadine, Rimantadine</strong> — reference only']
    ]) + '<hr>' +
    '<h2>💉 Vaccinology and Surveillance</h2>' +
    '<p>Subtyping and antigenic analysis data feed directly into <strong>WHO GISRS</strong> (>150 national centres) for seasonal vaccine strain selection. Local monitoring of circulating strains contributes to the global system and provides early warning of vaccine-epidemic strain mismatch. A separate track is <strong>highly pathogenic avian influenza (H5N1, H5N8) monitoring</strong>: detection of reassortants with avian-origin segments in humans is an epidemiological alarm signal.</p>' +
    '<p>For metagenomic differential diagnosis of influenza vs other respiratory viruses (RSV, rhinovirus, SARS-CoV-2) see the <a href="/flu/">OnSiteSeq ARVI pipeline</a>.</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Flu-Track Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>Flu-Subtyper</strong>', 'HA/NA subtyping from WGS (H1N1pdm09/H3N2, B Victoria/Yamagata)'],
      ['<strong>Flu-Reassort-Detector</strong>', 'Reassortant segment detection (PanG graph alignment)'],
      ['<strong>Flu-Res-Detector</strong>', 'Oseltamivir and baloxavir resistance prediction']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Assembly and subtyping</strong>', '<code>IRMA</code> (Iterative Refinement Meta-Assembler, CDC)'],
      ['<strong>3. Alignment (Mapping)</strong>', '<code>minimap2</code> to segment references; <strong>OnSiteSeq-PanG</strong> for segment ancestry analysis'],
      ['<strong>4. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>5. Clade classification</strong>', '<code>Nextclade</code> (Influenza A/B clades, antigenic match assessment)'],
      ['<strong>6. Resistance annotation</strong>', 'Custom NA/PA/M2 mutation database + <code>snpEff</code>'],
      ['<strong>7. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO GISRS</strong> — defines annual vaccine composition from circulating strain data; genomic surveillance is the system\'s foundation.</li>' +
    '<li><strong>H5N1</strong> — the expanding host range of highly pathogenic avian influenza (birds → mammals → sporadic human cases) makes reassortant monitoring a surveillance priority.</li>' +
    '<li><strong>Oseltamivir resistance</strong> — the H275Y mutation once drove global fixation of resistant H1N1 (2008–2009 season); continuous monitoring is mandatory.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/initiatives/global-influenza-surveillance-and-response-system">WHO — Global Influenza Surveillance and Response System (GISRS)</a></li>' +
    '<li>📄 <a href="https://wonder.cdc.gov/amd/flu/irma/">CDC IRMA — Iterative Refinement Meta-Assembler</a></li>' +
    '<li>📄 <a href="https://nextstrain.org/flu">Nextstrain / Nextclade — Influenza clades</a></li>' +
    '<li>📄 <a href="https://gisaid.org/">GISAID — global influenza genome database</a></li></ul>';

  /* ── PLASMODIUM ── */
  EN['/plasmodium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_plasmodium.png" alt="Plasmodium falciparum" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Plasmodium falciparum</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic resistance profiling, species identification and verification of imported malaria cases</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Plasmodium falciparum</em> causes the most severe form of malaria. The major threat of recent years is the spread of partial <strong>artemisinin</strong> resistance (first-line therapy) from Southeast Asia into Africa. For Russia malaria is an imported infection: the pipeline\'s task here is <strong>verification of imported cases</strong>, species identification and resistance assessment of the imported strain within hours instead of reference laboratories.</p>' +
    '<p>The pipeline analyses WHO-validated resistance markers (<em>kelch13</em>, <em>pfcrt</em>, <em>pfmdr1</em>, <em>dhfr</em>, <em>dhps</em>, <em>plasmepsin2/3</em> amplification) and deletions of the diagnostic genes <em>hrp2/hrp3</em>. For hypervariable loci, <strong>locus-level graph alignment (OnSiteSeq-PanG)</strong> reduces reference bias; conserved markers are analysed with standard alignment.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: whole blood (with parasite DNA enrichment or amplicon enrichment of target loci).</li>' +
    '<li><strong>📤 Output:</strong> HTML report with Plasmodium species, susceptibility profile, <em>hrp2/hrp3</em> status and detected mutations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    tbl(['Gene', 'Key Mutations', 'Drug Class / Significance'], [
      ['<strong>kelch13</strong> (K13)', 'C580Y, R539T, Y493H, M476I (Asia); <strong>R561H</strong> (validated in Africa — Rwanda, Uganda)', '<strong>Artemisinin</strong> — delayed parasite clearance'],
      ['<strong>pfcrt</strong>', 'K76T', '<strong>Chloroquine</strong>'],
      ['<strong>pfmdr1</strong>', 'N86Y, Y184F, D1246Y; copy-number amplification', '<strong>Mefloquine, Lumefantrine</strong> (susceptibility modulation)'],
      ['<strong>dhfr</strong>', 'N51I, C59R, S108N', '<strong>Pyrimethamine</strong>'],
      ['<strong>dhps</strong>', 'A437G, K540E', '<strong>Sulfadoxine</strong>'],
      ['<strong>plasmepsin2/3</strong>', 'Copy-number amplification', '<strong>Piperaquine</strong> — ACT partner drug']
    ]) +
    '<h3>hrp2/hrp3 deletions — a threat to rapid diagnostics</h3>' +
    '<p>Deletions of <em>hrp2</em> and <em>hrp3</em> make the parasite "invisible" to HRP2-based rapid diagnostic tests (RDT) — a false-negative result despite real infection. Long nanopore reads detect these deletions directly, without genome assembly. The report includes <em>hrp2/hrp3</em> status with clinical interpretation: when deleted, a negative RDT does not rule out malaria — PCR/microscopy is indicated.</p>' +
    '<h3>Species identification</h3>' +
    '<p>Beyond <em>P. falciparum</em>, the pipeline distinguishes <em>P. vivax</em>, <em>P. ovale</em>, <em>P. malariae</em> and the zoonotic <em>P. knowlesi</em> by the 18S rRNA locus — species determines management (for <em>P. vivax/ovale</em>, anti-relapse primaquine therapy with G6PD status is mandatory).</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Malaria Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>Malaria-Res-Detector</strong>', 'Resistance prediction from WHO-validated markers (k13 et al.)'],
      ['<strong>Malaria-Species-Typer</strong>', 'Plasmodium species identification by 18S rRNA']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (reference: 3D7); <strong>OnSiteSeq-PanG</strong> for hypervariable loci'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Resistance annotation</strong>', 'Custom WHO-validated marker database (k13/pfcrt/pfmdr1/dhfr/dhps)'],
      ['<strong>5. Deletion detection</strong>', 'Coverage analysis of <em>hrp2/hrp3</em> loci from long reads'],
      ['<strong>6. Species identification</strong>', '<code>minimap2</code> + classification against an 18S rRNA panel'],
      ['<strong>7. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, World Malaria Report</strong> — ~250 million cases and ~600 thousand deaths annually; genomic resistance surveillance is named a priority.</li>' +
    '<li><strong>Africa</strong> — partial artemisinin resistance (marker R561H) confirmed in Rwanda and Uganda: risk of repeating the chloroquine loss scenario.</li>' +
    '<li><strong>Russia</strong> — malaria is eliminated, but imported cases are registered annually; rapid verification of species and resistance is critical for treatment and containment.</li>' +
    '<li><strong>hrp2/hrp3 deletions</strong> — the spread of RDT-negative strains undermines confidence in rapid tests in endemic regions.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/teams/global-malaria-programme/reports">WHO — World Malaria Report</a></li>' +
    '<li>📄 <a href="https://www.who.int/publications/i/item/9789240021068">WHO — K13 molecular markers of artemisinin resistance</a></li>' +
    '<li>📄 <a href="https://www.wwarn.org/">WWARN — Worldwide Antimalarial Resistance Network</a></li>' +
    '<li>📄 <a href="https://plasmodb.org/">PlasmoDB — Plasmodium genomics resource</a></li></ul>';

  /* ── ASFV (Африканская чума свиней) ── */
  EN['/asfv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_asfv.svg" alt="African swine fever virus (ASFV)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>African Swine Fever — ASFV</h1>' +
    '<p style="font-size:1.2em;color:#555">Point-of-care detection at the farm gate: genotyping, low-virulence deletion variants, differentiation from classical swine fever</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>African swine fever virus (ASFV)</strong> is a large enveloped DNA virus of the <em>Asfarviridae</em> family (genome 170–190 kb) causing acute haemorrhagic fever in domestic pigs with lethality up to <strong>100%</strong>. It does not infect humans, but economically it is the most devastating veterinary pathogen of the decade: the 2018–2019 epizootic in China wiped out roughly 40% of the world\'s largest pig herd. With no widely available vaccine, protection rests entirely on early detection and farm biosecurity.</p>' +
    '<p>Our pipeline performs nanopore sequencing right on the farm or in a veterinary laboratory: confirmation of ASFV DNA, genotyping by the <em>p72</em> gene (<em>B646L</em>) and — critical for the current epizootic situation — <strong>detection of low-virulence deletion variants</strong> (Δ<em>CD2v</em>, Δ<em>MGF360/505</em>) that spread across China in 2020–2021 and mimic chronic infections, defeating routine monitoring approaches.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: EDTA blood, spleen, lymph nodes, tonsils; equipment swabs, feed, drinking water.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the veterinarian — ASFV DNA detection, <em>p72</em> genotype, <em>CD2v</em>/<em>MGF</em>/<em>I177L</em> deletion status, differentiation from classical swine fever (CSF).</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: I — dsDNA, double-stranded DNA</h2>' +
    '<p>Class I comprises double-stranded DNA viruses: transcription follows the cellular path familiar to the cell — DNA → mRNA. ASFV is one of the giants of this class: its <strong>170–190 kb</strong> genome encodes 150–200 of its own proteins, including its own DNA polymerase, repair enzymes and RNA polymerase. Unlike most DNA viruses, ASFV replicates <strong>in the cytoplasm</strong> of the infected cell — the virus builds "viral factories" there that barely depend on the host nuclear machinery. A large DNA genome with its own replication apparatus tolerates deletions of entire gene blocks: this is exactly how <strong>low-virulence deletion variants</strong> arise (Δ<em>CD2v</em>, Δ<em>MGF360/505</em>), whose detection is a key task of the pipeline.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Key Markers</h2>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>B646L (p72)</strong>', 'Major capsid protein — ASFV genotyping (24 known genotypes; <strong>genotype II</strong> circulates in Eurasia)'],
      ['<strong>E402R (CD2v)</strong>', 'Deletion → loss of hemadsorption; marker of low-virulence "vaccine-like" variants (China, 2020–2021)'],
      ['<strong>MGF360 / MGF505</strong>', 'Multigene-family deletions → attenuation, chronic course, evasion of monitoring'],
      ['<strong>I177L</strong>', 'Deletion in the ASFV-G-ΔI177L vaccine strain — marker of vaccine-like origin of an isolate'],
      ['<strong>CSFV (E2, 5\'UTR)</strong>', 'Differential diagnosis with classical swine fever — clinically indistinguishable at early stages']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>China, 2018–2019</strong> — the epizootic destroyed ~40% of the herd (over 100 million pigs) in the country producing about half of the world\'s pork; the largest livestock catastrophe in history. The virus continues to circulate in the region.</li>' +
    '<li><strong>Low-virulence variants (2020–2021)</strong> — isolates with <em>CD2v</em>/<em>MGF</em> deletions cause chronic, low-symptom disease; some are linked to unlicensed "vaccine" strains. Their detection requires genomic methods, not single-locus PCR alone.</li>' +
    '<li><strong>Vaccines</strong> — Vietnam licensed live attenuated vaccines (2022–2023) with restricted use; no globally available vaccine exists, so early detection and quarantine remain the basis of control.</li>' +
    '<li><strong>Russia</strong> — regular outbreaks in backyard farms and industrial complexes; official surveillance by Rosselkhoznadzor and FGBI "ARRIAH".</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.woah.org/en/disease/african-swine-fever/">WOAH — African Swine Fever</a></li>' +
    '<li>📄 <a href="https://www.fao.org/animal-health/situation-updates/ASF/en">FAO — EMPRES: global ASF situation updates</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/datasets/taxonomy/10497/">NCBI — African swine fever virus genomes</a></li></ul>';

  /* ── phytophthora-infestans ── */
  EN['/phytophthora-infestans/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_phytophthora_infestans.svg" alt="Phytophthora infestans" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Late Blight — Phytophthora infestans</h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnosis of potato and tomato late blight with a fungicide resistance profile — within hours, right in the field</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Phytophthora infestans</em> is an oomycete (not a true fungus), the causal agent of late blight — the most destructive disease of potato and tomato worldwide. The pathogen exists as two mating types (A1 and A2); their co-occurrence in a population enables the formation of persistent oospores and accelerates the evolution of resistance. In rainy seasons, late blight affects up to 50% of potato plantings in Russia.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of infected tissue directly at the field site. Within a few hours, the agronomist receives confirmation of the pathogen species and — critically for crop protection — a <strong>fungicide resistance profile</strong>: resistance to metalaxyl/mefenoxam is widespread among <em>P. infestans</em> populations in Russia, and spraying an ineffective product is equivalent to losing the crop.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: potato leaf/tuber homogenate, tomato leaves and fruits.</li>' +
    '<li><strong>📤 Output:</strong> An HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>CesA3</strong> (cellulose synthase)', 'G1105S, G1105V', 'Mandipropamid, dimethomorph (CAA fungicides)'],
      ['<strong>RPA70</strong>', 'V799A', 'CAA fungicides'],
      ['<strong>—</strong> (polygenic resistance)', 'Population polymorphisms', 'Metalaxyl / Mefenoxam (phenylamides)'],
      ['<strong>Cytb</strong> (cytochrome b)', 'G143A, F129L', 'Strobilurins / QoI (azoxystrobin, kresoxim-methyl)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Irish Famine (1845–1852)</strong> — <em>P. infestans</em> destroyed nearly the entire potato crop in Ireland, claiming more than 1 million lives.</li>' +
    '<li><strong>Economics</strong> — global crop losses from late blight are estimated at <strong>$6–7 billion annually</strong>.</li>' +
    '<li><strong>Metalaxyl resistance</strong> — resistant populations have been recorded in all potato-producing regions of Russia.</li>' +
    '<li><strong>EUROBLIGHT</strong> — a European network monitoring <em>P. infestans</em> populations, tracking the spread of new clonal lineages and resistant genotypes.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="https://euroblight.net/">EUROBLIGHT — European P. infestans monitoring network</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — pathogen-host interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li></ul>';

  /* ── phytophthora-sojae ── */
  EN['/phytophthora-sojae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_phytophthora_sojae.svg" alt="Phytophthora sojae" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Soybean Root and Stem Rot — <em>Phytophthora sojae</em></h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of soybean Phytophthora rot with pathotype determination and a fungicide resistance profile</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Phytophthora sojae</em> is an oomycete, the causal agent of soybean root and stem rot. Pathogen populations exhibit a pronounced <strong>race structure</strong>: pathotypes differ in their ability to overcome soybean <em>Rps</em> resistance genes, so the race composition directly determines which varieties will be infected. Oospores persist in the soil for years, making infested fields a long-term source of infection.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of root tissue and soil wash. Within a few hours, the agronomist receives confirmation of the pathogen species, an estimate of its abundance in the sample, and a <strong>fungicide resistance profile</strong> — for selecting effective seed treatment and seedling protection.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: homogenate of soybean roots and lower stem, soil wash.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>—</strong> (polygenic resistance)', 'Population polymorphisms', 'Metalaxyl / Mefenoxam (phenylamides)'],
      ['<strong>CesA3</strong> (cellulose synthase)', 'Point substitutions', 'Mandipropamid (CAA fungicides)'],
      ['<strong>β-tubulin</strong>', 'Point substitutions', 'Ethaboxam (benzamides)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Economics</strong> — global soybean yield losses from <em>P. sojae</em> are estimated at <strong>$1–2 billion annually</strong>.</li>' +
    '<li><strong>Race evolution</strong> — the widespread use of a limited set of <em>Rps</em> genes in breeding has led to the rapid accumulation of pathotypes that overcome varietal resistance.</li>' +
    '<li><strong>Russia</strong> — the expansion of soybean acreage in the Amur region and the Far East increases the relevance of soybean Phytophthora rot monitoring.</li>' +
    '<li><strong>Diagnostics</strong> — metagenomics makes it possible to simultaneously identify the pathogen and assess the race composition of the population without weeks of culturing.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — pathogen-host interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Phytophthora sojae</a></li></ul>';

  /* ── fusarium-oxysporum ── */
  EN['/fusarium-oxysporum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_fusarium_oxysporum.svg" alt="Fusarium oxysporum" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Fusarium Wilt — <em>Fusarium oxysporum</em></h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of the soil-borne <em>Fusarium oxysporum</em> complex with forma specialis determination and a fungicide resistance profile</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Fusarium oxysporum</em> is a soil-borne fungus existing as numerous specialized forms (<strong>formae speciales</strong>), each attacking its own crop: <em>f. sp. lycopersici</em> — tomato, <em>f. sp. cucumerinum</em> — cucumber, <em>f. sp. cubense</em> (tropical race TR4) — banana. Thick-walled <strong>chlamydospores</strong> persist in soil for years, and chemical protection is largely ineffective against vascular wilt — which is why early diagnosis of soil and planting material contamination is decisive.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of stem vascular tissue, roots, and soil wash. The metagenomic approach not only confirms the presence of <em>F. oxysporum</em> but also distinguishes it from closely related species in the complex, and yields a <strong>fungicide resistance profile</strong> for seed treatment and spraying.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: homogenate of stem and root vascular tissue (tomato, cucumber, cereals), soil wash.</li>' +
    '<li><strong>📤 Output:</strong> An HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>β-tubulin</strong>', 'E198A, E198K', 'Benzimidazoles (carbendazim, benomyl)'],
      ['<strong>CYP51</strong> (lanosterol 14α-demethylase)', 'Point substitutions', 'Azoles / DMI (tebuconazole)'],
      ['<strong>Cytb</strong> (cytochrome b)', 'Native binding-site structure', 'Strobilurins / QoI — intrinsically low sensitivity']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Banana "Panama disease"</strong> — tropical race <em>f. sp. cubense</em> TR4 is devastating banana plantations across Asia, Africa, and Latin America and is considered a global threat to the banana industry.</li>' +
    '<li><strong>Soil-persistent pathogen</strong> — chlamydospores remain viable in soil for decades; crop rotation does not solve the problem.</li>' +
    '<li><strong>Chemical protection is largely ineffective</strong> — with vascular wilt, fungicides barely reach the pathogen; early diagnosis and healthy planting material are key.</li>' +
    '<li><strong>Complex of closely related species</strong> — visual and culture-based diagnostics cannot discriminate pathogen forms; metagenomics provides the answer in a single assay.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — Pathogen-Host Interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Fusarium oxysporum</a></li></ul>';

  /* ── fusarium-graminearum ── */
  EN['/fusarium-graminearum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_fusarium_graminearum.svg" alt="Fusarium graminearum" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Fusarium Head Blight (FHB) — <em>Fusarium graminearum</em></h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of Fusarium head blight in wheat and barley with mycotoxin risk assessment and a fungicide resistance profile</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Fusarium graminearum</em> is the causal agent of Fusarium head blight (FHB) in wheat and barley. The threat is twofold: beyond direct yield losses, the fungus <strong>produces mycotoxins</strong> — deoxynivalenol (DON, vomitoxin) and zearalenone, synthesized by the <em>TRI</em> gene cluster. Contaminated grain becomes unfit for food and feed purposes, so diagnostics matters not only for plant protection but also for toxicological control of grain lots.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of kernels and spike tissue. Within a few hours, the agronomist receives confirmation of the pathogen species, an assessment of lot contamination, and a <strong>fungicide resistance profile</strong> — triazoles remain the backbone of head protection, and monitoring their efficacy is critical for planning treatments during flowering.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: homogenate of wheat/barley kernels and spikes.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist — identified pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<code>CYP51</code> (paralogs <code>FgCYP51A/B/C</code>)', 'Point substitutions, deletions', 'Azoles / DMI (tebuconazole, prothioconazole)'],
      ['<code>β-tubulin</code>', 'F167Y, E198L, E198Q', 'Benzimidazoles (carbendazim)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>FHB epidemics</strong> — regularly recorded in North America, Europe, and Asia; wet weather during flowering sharply increases infection risk.</li>' +
    '<li><strong>Mycotoxins</strong> — DON and zearalenone levels in grain are regulated; contaminated lots are rejected regardless of the magnitude of yield losses.</li>' +
    '<li><strong>Carbendazim resistance</strong> — mass resistance to benzimidazoles has been documented in <em>F. graminearum</em> populations in China.</li>' +
    '<li><strong>Narrow protection window</strong> — fungicide treatments are effective only during flowering, so rapid diagnostics directly determines the success of head protection.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — Pathogen-Host Interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Fusarium graminearum</a></li></ul>';

  /* ── alternaria-solani ── */
  EN['/alternaria-solani/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_alternaria_solani.svg" alt="Alternaria solani" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Early Blight — Alternaria solani</h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of early blight in potato and tomato with monitoring of rapidly evolving fungicide resistance</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Alternaria solani</em> is the causal agent of early blight (alternariosis) of potato and tomato. The pathogen infects leaves, stems and tubers, forming characteristic concentric lesions, and reduces yields of solanaceous crops every year. <em>A. solani</em> is a <strong>classic example of rapid evolution of fungicide resistance</strong>: resistance to strobilurins (QoI) spread through populations within just a few years after this class of products was introduced in the 2000s.</p>' +
    '<p>Our pipeline performs <strong>nanopore metagenomic sequencing</strong> (mNGS) of affected leaf tissue and tubers. Within a few hours the agronomist receives confirmation of the pathogen species and a <strong>fungicide resistance profile</strong> — which is especially important for early blight, where applying strobilurins against a resistant population is useless and only accelerates the selection of resistant genotypes.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: potato leaf/tuber homogenate, tomato leaves and fruits.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist — identified pathogen, quantitative abundance, fungicide resistance profile and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>Cytb</strong> (cytochrome b)', 'F129L', 'Strobilurins / QoI (azoxystrobin, pyraclostrobin)'],
      ['<strong>SdhB</strong>', 'H278R, H278Y', 'SDHI (boscalid, fluxapyroxad)'],
      ['<strong>SdhC</strong>', 'H134R', 'SDHI (boscalid, fluxapyroxad)'],
      ['<strong>SdhD</strong>', 'D123E', 'SDHI (boscalid, fluxapyroxad)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Speed of evolution</strong> — the F129L mutation in cytochrome b spread through <em>A. solani</em> populations within a few years after the introduction of QoI fungicides in the 2000s.</li>' +
    '<li><strong>Dual threat</strong> — following strobilurins, resistance to SDHI fungicides (boscalid, fluxapyroxad) is emerging under selection pressure.</li>' +
    '<li><strong>Hosts</strong> — potato and tomato, key food crops; early blight is recorded annually in all growing regions.</li>' +
    '<li><strong>Anti-resistance strategy</strong> — monitoring resistance markers makes it possible to rotate fungicide classes and preserve the effectiveness of the products.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — pathogen-host interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Alternaria solani</a></li></ul>';

  /* ── botrytis-cinerea ── */
  EN['/botrytis-cinerea/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_botrytis_cinerea.svg" alt="Botrytis cinerea" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Gray Mold — Botrytis cinerea</h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnosis of gray mold in grape, strawberry, and vegetables with a comprehensive multidrug-resistance profile</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Botrytis cinerea</em> is the causal agent of gray mold, affecting <strong>more than 200 plant species</strong> and the main pathogen of grape and strawberry both in the field and during storage. FRAC classifies <em>B. cinerea</em> as a <strong>highest-risk resistance pathogen</strong>: multidrug resistance — simultaneous resistance to several fungicide classes — is the norm rather than the exception in field populations.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of infected berries and plant tissue. Within a few hours, the agronomist receives confirmation of the pathogen species and a detailed <strong>fungicide resistance profile</strong> covering both target-gene mutations and activation of efflux systems (BcMrr1) that drive multidrug resistance. Without such a profile, choosing a working gray mold protection program turns into trial-and-error spraying.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw data in <code>FASTQ</code> format after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Sample material: homogenate of grape/strawberry berries, infected vegetable tissue.</li>' +
    '<li><strong>📤 Output:</strong> An HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>BcCYP51</strong>', 'Multiple mutations + tandem repeats in the promoter', 'Azoles / DMI (tebuconazole)'],
      ['<strong>BcMrr1</strong>', 'Activating mutations (efflux)', 'Multidrug resistance, including SDHI'],
      ['<strong>BcSdhB/C/D</strong>', 'H272R, P225L', 'SDHI (boscalid)'],
      ['<strong>β-tubulin</strong>', 'E198A, F200Y', 'Benzimidazoles (carbendazim, benomyl)'],
      ['<strong>Cytb</strong> (cytochrome b)', 'G143A', 'Strobilurins / QoI (azoxystrobin)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Extremely broad host range</strong> — more than 200 plant species, from grape and strawberry to tomatoes and ornamental crops.</li>' +
    '<li><strong>Highest resistance risk</strong> — FRAC classifies <em>B. cinerea</em> as a highest-risk pathogen; strains resistant to 5 or more fungicide classes have been known for a long time.</li>' +
    '<li><strong>Storage losses</strong> — gray mold remains the leading cause of post-harvest losses of grapes and berries.</li>' +
    '<li><strong>Efflux-mediated multidrug resistance</strong> — activation of the BcMrr1 transporter confers resistance to several fungicide classes at once, which cannot be predicted from a single target gene.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — pathogen-host interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Botrytis cinerea</a></li></ul>';

  /* ── pythium ── */
  EN['/pythium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pythium.svg" alt="Pythium spp." style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Root Rots and Damping-Off — Pythium spp.</h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic differential diagnosis of seedling root rots — <em>Pythium</em> versus <em>Rhizoctonia</em> and <em>Fusarium</em></p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Pythium spp.</em> are oomycetes (not true fungi) — the causal agents of root rots and damping-off of seedlings and young plants, the main cause of losses in greenhouse and nursery production. Like all oomycetes, <em>Pythium</em> is <strong>insensitive to azoles and most "antifungal" fungicides</strong>: only oomycete-specific compounds work — mefenoxam/metalaxyl, ethaboxam, propamocarb, cyazofamid. A wrong diagnosis means treating with a product that is guaranteed to be ineffective.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of seedling roots and substrate. With the similar symptoms of root rots, substrate metagenomics is the only way to reliably distinguish <em>Pythium</em> from <em>Rhizoctonia</em> and <em>Fusarium</em> in a single assay, without multi-day culturing. Along with species identification, the agronomist receives a <strong>fungicide resistance profile</strong>.</p>' +
    '<ul><li><strong>📥 Input:</strong> raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: seedling and young-plant root homogenate, substrate, soil wash.</li>' +
    '<li><strong>📤 Output:</strong> an HTML report for the agronomist — detected pathogens, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>—</strong> (polygenic resistance)', 'Population polymorphisms', 'Mefenoxam / Metalaxyl (phenylamides)'],
      ['<strong>CesA3</strong> (cellulose synthase)', 'Point substitutions', 'CAA fungicides'],
      ['<strong>—</strong> (intrinsic insensitivity)', 'Absence of the target (ergosterol)', 'Azoles / DMI — ineffective against oomycetes']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Greenhouses and nurseries</strong> — damping-off can destroy up to 100% of seedlings in an outbreak within a few days.</li>' +
    '<li><strong>Mefenoxam resistance</strong> — resistant populations of <em>P. irregulare</em> and <em>P. ultimum</em> are widespread in operations with regular phenylamide use.</li>' +
    '<li><strong>Similar symptoms</strong> — root rots caused by <em>Pythium</em>, <em>Rhizoctonia</em>, and <em>Fusarium</em> are visually indistinguishable yet require different protection.</li>' +
    '<li><strong>Oomycetes ≠ fungi</strong> — standard "antifungal" products (azoles) do not work against <em>Pythium</em>; correct diagnosis saves treatments.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — Pathogen-Host Interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Pythium</a></li></ul>';

  /* ── plasmopara-viticola ── */
  EN['/plasmopara-viticola/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_plasmopara_viticola.svg" alt="Plasmopara viticola" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Grapevine Downy Mildew — <em>Plasmopara viticola</em></h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of grapevine downy mildew with monitoring of resistance to QoI and CAA fungicides</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Plasmopara viticola</em> is an oomycete, an obligate biotroph, and the causal agent of grapevine downy mildew — the principal disease of viticulture in temperate climates. The pathogen was introduced into Europe from North America in 1878; the fight against downy mildew led to the invention of Bordeaux mixture, the first fungicide in history. As an obligate parasite, <em>P. viticola</em> cannot be cultured on artificial media, which makes molecular diagnostics the primary tool for its study and monitoring.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of leaves with oil-spot lesions. Within a few hours, the agronomist receives confirmation of the pathogen and a <strong>fungicide resistance profile</strong>: resistance to strobilurins (QoI) is widespread in European populations, and resistance to CAA fungicides has been emerging since 2007 — without molecular monitoring, a vineyard protection program quickly loses its effectiveness.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Sample material: homogenate of a grapevine leaf with oil-spot lesions.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>Cytb</strong> (cytochrome b)', 'G143A', 'Strobilurins / QoI (azoxystrobin)'],
      ['<strong>PvCesA3</strong> (cellulose synthase)', 'G1105S, G1105V', 'CAA fungicides (mandipropamid, dimethomorph)'],
      ['<strong>—</strong> (polygenic resistance)', 'Population polymorphisms', 'Metalaxyl (phenylamides)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>1878</strong> — downy mildew was introduced into Europe from North America and within a few decades became the principal threat to European viticulture.</li>' +
    '<li><strong>Bordeaux mixture</strong> — the fight against downy mildew led to the creation of the first fungicide in the history of agriculture.</li>' +
    '<li><strong>QoI resistance</strong> — the G143A mutation is widespread in European populations; strobilurins are ineffective without resistance monitoring.</li>' +
    '<li><strong>CAA resistance</strong> — mutations in <em>PvCesA3</em> were first detected around 2007 and have since been tracked by FRAC as a priority marker.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — Pathogen-Host Interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Plasmopara viticola</a></li></ul>';

  /* ── peronospora ── */
  EN['/peronospora/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_peronospora.svg" alt="Peronospora spp." style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Downy Mildew — Peronospora spp.</h1>' +
    '<p style="font-size:1.2em;color:#555">Metagenomic diagnostics of onion and sunflower downy mildew with race and fungicide-resistance monitoring</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Peronospora spp.</em> are oomycetes — obligate plant parasites and the causal agents of downy mildew. This group includes <em>P. destructor</em> (onion downy mildew) and <em>Plasmopara halstedii</em> (sunflower downy mildew), a related oomycete from the same family Peronosporaceae. Pathogen populations have a pronounced <strong>race structure</strong>: the composition of circulating races determines which hybrids and varieties will be resistant and which will succumb. Sunflower downy mildew is an important quarantine-significant pathogen in Russia.</p>' +
    '<p>Our pipeline performs <strong>metagenomic nanopore sequencing</strong> (mNGS) of infected leaf tissue. Within a few hours, the agronomist receives confirmation of the pathogen, an estimate of the population\'s race composition, and a <strong>fungicide-resistance profile</strong> — data needed both for protecting the current crop and for breeding resistant hybrids.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Sample material: sunflower/onion leaf homogenate.</li>' +
    '<li><strong>📤 Output:</strong> An HTML report for the agronomist — detected pathogen, quantitative abundance, fungicide-resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Mutations', 'Fungicide (class)'], [
      ['<strong>—</strong> (polygenic resistance)', 'Population polymorphisms', 'Metalaxyl / Mefenoxam (phenylamides)'],
      ['<strong>CesA3</strong> (cellulose synthase)', 'Point substitutions', 'CAA fungicides (mandipropamid)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Quarantine significance</strong> — sunflower downy mildew (<em>P. halstedii</em>) is a quarantine-significant pathogen in Russia; infected seed lots are subject to control.</li>' +
    '<li><strong>Race structure</strong> — metalaxyl-resistant races of <em>P. halstedii</em> have long been known; race monitoring is essential for breeding resistant sunflower hybrids.</li>' +
    '<li><strong>Obligate parasites</strong> — these pathogens cannot be cultured on artificial media; metagenomics is the primary method for their identification and typing.</li>' +
    '<li><strong>Onion crops</strong> — <em>P. destructor</em> causes systemic infection of onion and long-term persistence of the infection in planting material.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — Pathogen-Host Interactions database</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS barcoding database for fungi and oomycetes</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Peronospora</a></li></ul>';

  /* ── HBV (гепатит B) ── */
  EN['/hbv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hbv.svg" alt="Hepatitis B virus (HBV)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Genotyping and Drug Resistance of Hepatitis B Virus</h1>' +
    '<p style="font-size:1.2em;color:#555">HBV genotype, polymerase resistance mutations, HBeAg status and hepatocellular carcinoma risk markers — from a single assay</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Hepatitis B virus (HBV)</strong> is a hepadnavirus with a partially double-stranded DNA genome (~3.2 kb). Chronic hepatitis B is the leading cause of cirrhosis and hepatocellular carcinoma (HCC) worldwide: WHO estimates ~254 million people live with HBV, and roughly a third of the global burden is in China. Modern nucleos(t)ide analogues (entecavir, tenofovir) have a high resistance barrier, but millions of patients in Asia received lamivudine and adefovir for years — and carry accumulated resistance mutations.</p>' +
    '<p>From nanopore sequencing data our pipeline determines the <strong>virus genotype (A–J)</strong>, the <strong>reverse transcriptase (polymerase) resistance profile</strong>, preC/BCP mutations driving HBeAg-negative disease, and HBsAg escape mutations — a complete genomic passport of the virus for therapy selection and adjustment.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: blood plasma/serum. Optimal: amplicon sequencing of <em>pol</em> and preS/S <strong>or</strong> target enrichment with whole-genome coverage.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — HBV genotype, nucleos(t)ide analogue susceptibility profile, preC/BCP and HBsAg-escape status, therapy interpretation.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: VII — dsDNA-RT (pararetroviruses)</h2>' +
    '<p>Class VII — the pararetroviruses: their genome is DNA, but it replicates via reverse transcription — the mirror image of Class VI retroviruses. HBV virions package a partially double-stranded circular DNA (rcDNA, ~3.2 kb), which in the hepatocyte nucleus is repaired into covalently closed circular DNA (<strong>cccDNA</strong>) — cccDNA is the very reservoir of chronicity that modern nucleos(t)ide analogues cannot eliminate. From cccDNA the pregenomic RNA (<strong>pgRNA</strong>) is transcribed, which the viral polymerase (<em>pol</em> gene) reverse-transcribes back into DNA during the assembly of new particles. That is why HBV resistance mutations are mutations in the rt domain of the <em>pol</em> gene: the classic YMDD substitution <strong>rtM204V</strong> alters the catalytic motif of the reverse transcriptase and abolishes lamivudine sensitivity (see the mutation table below).</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['I', 'dsDNA', 'DNA → mRNA (like the host cell)', 'Herpesviruses, adenoviruses, smallpox, ASFV'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['<strong>VII</strong>', '<strong>dsDNA-RT</strong>', '<strong>Reverse transcription via an RNA intermediate</strong>', '<strong>Hepatitis B</strong>']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Mutations and Clinical Markers</h2>' +
    '<h3>Polymerase (rt domain) resistance</h3>' +
    tbl(['Mutations', 'Drug', 'Significance'], [
      ['<strong>rtM204V/I</strong> (YMDD) + rtL180M', '<strong>Lamivudine</strong>, Telbivudine', 'Classic YMDD mutation; also reduces entecavir susceptibility'],
      ['<strong>rtA181T/V</strong>', 'Lamivudine, <strong>Adefovir</strong>', 'Shared resistance pathway; rtA181T also impairs HBsAg secretion'],
      ['<strong>rtN236T</strong>', '<strong>Adefovir</strong>', 'Specific marker'],
      ['<strong>rtI169T + rtT184G + rtS202I/G</strong> or <strong>rtM250V</strong> (on rtL180M+rtM204V background)', '<strong>Entecavir</strong>', 'Resistance develops stepwise in patients with prior lamivudine resistance'],
      ['<strong>rtA194T</strong>', '<strong>Tenofovir</strong>', 'Rare marker; significance still being clarified']
    ]) +
    '<h3>HBeAg status and HCC risk</h3>' +
    tbl(['Locus', 'Mutations', 'Significance'], [
      ['<strong>preC</strong> (precore)', '<strong>G1896A</strong> (stop codon)', 'HBeAg-negative chronic hepatitis — a common form in Asia'],
      ['<strong>BCP</strong> (basal core promoter)', '<strong>A1762T/G1764A</strong>', 'HBeAg-negative disease; associated with increased HCC risk'],
      ['<strong>S (HBsAg)</strong>', '<strong>G145R</strong> and others in the "a" determinant', 'Vaccine and diagnostic escape — false-negative HBsAg tests'],
      ['<strong>Genotype</strong>', 'A–J', 'Genotype <strong>C</strong> (dominant in China) — higher HCC risk and slower HBeAg seroconversion than genotype B']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq HBV Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>HBV-Genotyper</strong>', 'HBV genotyping (A–J) from whole-genome data'],
      ['<strong>HBV-Res-Detector</strong>', 'rt-domain resistance profile interpretation']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (genotype A–J reference panel)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — accounting for within-host quasispecies diversity'],
      ['<strong>4. Genotyping</strong>', 'Classification against a reference panel + NCBI HBV genotyping tool (verification)'],
      ['<strong>5. Resistance annotation</strong>', 'Custom rt/preC/BCP/S mutation database (consensus data and HBVdb)'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, Global Hepatitis Report 2024</strong> — ~254 million people live with HBV; viral hepatitis claims ~1.3 million lives annually, and mortality is rising. WHO has set the goal of eliminating hepatitis as a public health threat by 2030.</li>' +
    '<li><strong>China</strong> — carries about a third of the global HBV burden (~70–90 million HBsAg-positive); HBV causes roughly half of the world\'s liver cancer cases. Mass newborn vaccination sharply reduced childhood carriage, but the adult chronic hepatitis cohort is enormous and needs therapy monitoring.</li>' +
    '<li><strong>The lamivudine legacy</strong> — years of mass use of low-resistance-barrier drugs left millions of patients with accumulated mutations; genotyping before regimen changes prevents sequential therapy failure.</li>' +
    '<li><strong>HIV/HBV co-infection</strong> — tenofovir is part of ART regimens; see our <a href="/hiv/">OnSiteSeq HIV pipeline</a>.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240091672">WHO — Global Hepatitis Report 2024</a></li>' +
    '<li>📄 <a href="https://hbvdb.ibcp.fr/">HBVdb — Hepatitis B Virus Database</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/projects/genotyping/formpage.cgi">NCBI HBV Genotyping Tool</a></li></ul>';

  /* ── MENINGOCOCCUS (N. meningitidis) ── */
  EN['/meningitidis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_meningitidis.svg" alt="Neisseria meningitidis" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Serogrouping and Drug Resistance of Neisseria meningitidis</h1>' +
    '<p style="font-size:1.2em;color:#555">Point-of-care diagnostics at the patient\'s bedside when meningococcal infection is suspected — the fulminant form, where every hour counts</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Neisseria meningitidis</em> (meningococcus) is the causative agent of meningococcal disease: from nasopharyngeal carriage to fulminant meningococcemia, in which only a few hours may pass from the first symptoms to death. <strong>Every hour of delay in diagnosis and therapy increases mortality.</strong> Standard diagnostics — CSF or blood culture — take 1–3 days and are often negative because antibiotic therapy has already been started.</p>' +
    '<p>The meningococcal genotype determines all further case management: the <strong>serogroup</strong> (A, B, C, W, Y, X) defines the vaccination strategy for contacts, while the <strong>resistance profile</strong> guides the choice of chemoprophylaxis for the outbreak (ciprofloxacin-resistant strains are increasingly reported).</p>' +
    '<p>Our pipeline provides the complete nanopore data analysis cycle <strong>at the patient\'s bedside</strong>: serogroup determination, drug resistance profile and clonal assignment of the strain — on the same day, without transferring data to external servers.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: CSF, blood, throat swab; optimal — amplicon sequencing of capsular loci and resistance genes or WGS.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the clinician — serogroup, susceptibility profile, chemoprophylaxis recommendation for contacts; QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Serogroups and Resistance Markers</h2>' +
    '<h3>Capsular loci (serogrouping)</h3>' +
    tbl(['Locus', 'Serogroup', 'Significance'], [
      ['<strong>ctrA</strong>', 'All capsulated', 'Universal capsular locus marker, species confirmation'],
      ['<strong>sacB</strong>', 'A', 'Rare in Russia; dominates the African "meningitis belt"'],
      ['<strong>synD (siaD-B)</strong>', 'B', 'Predominant serogroup in Russia and Europe; vaccines 4CMenB, MenB-fHbp'],
      ['<strong>siaD-C</strong>', 'C', 'Second most frequent; conjugate MenC/ACWY vaccines'],
      ['<strong>synG</strong>', 'W', 'Growing share in Russia and Europe since the 2010s (clone W:cc11)'],
      ['<strong>synF</strong>', 'Y', 'Growing share, especially in the elderly'],
      ['<strong>csb</strong>', 'X', 'African "meningitis belt"; no vaccines available']
    ]) +
    '<h3>Resistance genes</h3>' +
    tbl(['Gene / locus', 'Key mutations', 'Antibiotic class'], [
      ['<strong>penA</strong> (PBP2)', 'Mosaic alleles, F504L, A510V', 'Penicillin (reduced susceptibility)'],
      ['<strong>gyrA</strong>', 'T91I', 'Ciprofloxacin (contact chemoprophylaxis)'],
      ['<strong>rpoB</strong>', 'H552Y', 'Rifampicin (contact chemoprophylaxis)'],
      ['<strong>23S rRNA</strong>', 'C2611T', 'Azithromycin (prophylaxis alternative)']
    ]) +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Use', 'Clinical significance'], [
      ['<strong>Ceftriaxone</strong>', 'Empirical therapy', 'First-line drug for suspected bacterial meningitis'],
      ['<strong>Penicillin G</strong>', 'Targeted therapy', 'Drug of choice once a susceptible meningococcus is confirmed'],
      ['<strong>Ciprofloxacin</strong>', 'Chemoprophylaxis', 'Main drug for contacts; gyrA T91I mutation → switch'],
      ['<strong>Rifampicin</strong>', 'Chemoprophylaxis', 'Alternative for contacts'],
      ['<strong>Azithromycin</strong>', 'Chemoprophylaxis', 'Alternative in case of quinolone resistance']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Meningo Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>Meningo-Serogroup</strong>', 'Serogroup determination from the capsular locus directly in raw reads'],
      ['<strong>Meningo-Res-Detector</strong>', 'Prediction of penicillin and ciprofloxacin resistance'],
      ['<strong>Meningo-MLST</strong>', 'Clonal complex (cc) determination under the PubMLST scheme for surveillance']
    ]) +
    '<p>Training is planned on the <strong>PubMLST Neisseria Database</strong> (>50,000 genomes) and national collections of meningococcal isolates.</p><hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code>, <code>samtools</code> (reference: MC58 / Z2491)'],
      ['<strong>3. Serogrouping</strong>', 'Custom capsular locus database ctrA/sacB/synD/siaD/synG/synF/csb'],
      ['<strong>4. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>5. Resistance annotation</strong>', 'Custom mutation database penA/gyrA/rpoB/23S rRNA'],
      ['<strong>6. MLST typing</strong>', '<code>mlst</code> (Neisseria scheme, PubMLST)']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Fulminant form</strong> — in fulminant meningococcemia death occurs within 6–24 hours of the first symptoms; case fatality reaches 10–15% even with treatment, and up to 50% without.</li>' +
    '<li><strong>Every hour counts</strong> — each hour of delay in starting adequate therapy statistically increases mortality and the share of severe outcomes (amputations, necrosis, Waterhouse–Friderichsen syndrome).</li>' +
    '<li><strong>Outbreaks</strong> — outbreaks in closed communities (barracks, dormitories, kindergartens) require urgent chemoprophylaxis of contacts; drug choice depends on strain resistance.</li>' +
    '<li><strong>Epidemiology in Russia</strong> — serogroups B, C and a growing W dominate; clonal complexes cc11 and cc41/44 circulate.</li>' +
    '<li><strong>Ciprofloxacin resistance</strong> — resistant strains (gyrA T91I) have been reported in Europe, the USA and Asia, changing outbreak prophylaxis tactics.</li></ul>' +
    '<p>Standard microbiology gives an answer in 1–3 days, when the question of outbreak chemoprophylaxis has already been decided "blind". Our pipeline returns the serogroup and resistance profile <strong>on the same day</strong> — while it can still change the outcome.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/meningococcal-meningitis">WHO — Meningococcal meningitis (Fact sheet)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/meningococcal/">CDC — Meningococcal Disease</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/neisseria-spp">PubMLST Neisseria Database</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=ciprofloxacin-resistant+Neisseria+meningitidis">PubMed — ciprofloxacin-resistant Neisseria meningitidis</a></li></ul>';

  /* ── MYCOPLASMA GENITALIUM ── */
  EN['/mycoplasma/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_mycoplasma.svg" alt="Mycoplasma genitalium" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Mycoplasma genitalium</h1>' +
    '<p style="font-size:1.2em;color:#555">Macrolide and fluoroquinolone resistance testing before prescribing therapy — rapidly emerging multidrug resistance of a frequently missed STI pathogen</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Mycoplasma genitalium</em> is the smallest self-replicating bacterium and an underestimated sexually transmitted pathogen: it causes non-gonococcal urethritis in men, cervicitis and pelvic inflammatory disease in women. The bacterium <strong>has no cell wall</strong>, so it is intrinsically resistant to all β-lactams, and standard culture is virtually impossible — in routine STI diagnostics the pathogen is <strong>frequently missed</strong>.</p>' +
    '<p>The main problem is the speed of resistance growth. Resistance to <strong>azithromycin</strong> already exceeds 50% in a number of countries, yet azithromycin continues to be prescribed "blind" in empirical urethritis regimens. Resistance to <strong>moxifloxacin</strong> — the reserve drug — is spreading in the wake of macrolides. International guidelines (BASHH, Australian STI guidelines) require <strong>resistance testing before therapy</strong> (resistance-guided therapy): a drug can be prescribed only knowing the genotype of the specific strain.</p>' +
    '<p>Our pipeline analyses nanopore data from amplicon sequencing of key resistance loci (<em>23S rRNA</em>, <em>gyrA</em>, <em>parC</em>) or metagenomic sequencing of a clinical sample and outputs a ready-made therapy regimen.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Optimal: amplicon sequencing of <em>23S rRNA</em>, <em>gyrA</em>, <em>parC</em> loci <strong>or</strong> microbiome sequencing of a swab.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the clinician — macrolide and fluoroquinolone susceptibility profile with a recommended therapy regimen, and a QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    '<p>The pipeline analyses the key genetic determinants of <em>M. genitalium</em> resistance:</p>' +
    tbl(['Gene / locus', 'Key mutations', 'Antibiotic class'], [
      ['<strong>23S rRNA</strong>', 'A2058G, A2059G', 'Azithromycin (macrolides)'],
      ['<strong>gyrA</strong>', 'S83I, D87N/Y (E. coli numbering)', 'Moxifloxacin (fluoroquinolones)'],
      ['<strong>parC</strong>', 'S80I/R, D84N (E. coli numbering)', 'Moxifloxacin (fluoroquinolones)']
    ]) +
    '<p>The combination of mutations in <em>gyrA</em> and <em>parC</em> determines the resistance level: a single <em>parC</em> mutation reduces susceptibility, while paired <em>gyrA</em> + <em>parC</em> mutations lead to complete moxifloxacin failure.</p>' +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Class', 'Clinical significance'], [
      ['<strong>Doxycycline</strong>', 'Tetracycline', 'First stage of resistance-guided therapy — reduces bacterial load'],
      ['<strong>Azithromycin</strong>', 'Macrolide', 'Effective only in the absence of 23S rRNA mutations'],
      ['<strong>Moxifloxacin</strong>', 'Fluoroquinolone', 'Reserve drug for macrolide resistance; <em>gyrA/parC</em> are checked'],
      ['<strong>Pristinamycin</strong>', 'Streptogramin', 'Fallback option for multidrug resistance (not available in all countries)'],
      ['<strong>Minocycline</strong>', 'Tetracycline', 'Alternative for multidrug resistance']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Mgen Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>Mgen-Res-Detector</strong>', 'Prediction of macrolide and fluoroquinolone resistance from the mutation profile'],
      ['<strong>Mgen-Typing</strong>', 'Strain genotyping and tracking of clonal spread of resistant lineages']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (reference: M. genitalium G37)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Resistance annotation</strong>', 'Custom mutation database 23S rRNA/gyrA/parC'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Resistance >50%</strong> — the share of macrolide-resistant <em>M. genitalium</em> strains exceeds 50% in Australia, Western Europe and Japan; dual resistance (macrolides + fluoroquinolones) is rising.</li>' +
    '<li><strong>Resistance-guided therapy</strong> — prescribing an antibiotic based on a molecular resistance test is recommended by the Australian STI guidelines and BASHH as the standard of care for <em>M. genitalium</em>.</li>' +
    '<li><strong>Invisible pathogen</strong> — due to the lack of culture and rare inclusion in standard PCR panels, the infection goes undiagnosed for years, leading to chronic urethritis, cervicitis and infertility.</li>' +
    '<li><strong>Empirical therapy fails</strong> — prescribing azithromycin without a resistance test leads to persistent infection and selection of resistant strains.</li></ul>' +
    '<p>The current standard is PCR tests detecting individual mutations. Our pipeline delivers the complete genotype of resistance loci within a few hours, right at the point of care.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/std/treatment-guidelines/default.htm">CDC — STI Treatment Guidelines, 2021</a></li>' +
    '<li>📄 <a href="https://www.bashhguidelines.org/">BASHH Guidelines — UK national guideline on the management of Mycoplasma genitalium</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Mycoplasma+genitalium+resistance+guided+therapy">PubMed — Mycoplasma genitalium resistance-guided therapy</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Mycoplasma genitalium</a></li></ul>';

  /* ── SYPHILIS (Treponema pallidum) ── */
  EN['/syphilis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/syphilis.png" alt="Treponema pallidum" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Macrolide Resistance Determination and Genotyping of Treponema pallidum</h1>' +
    '<p style="font-size:1.2em;color:#555">Detection of azithromycin resistance mutations for the safe selection of alternative therapy in penicillin intolerance</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Treponema pallidum</em> is the causative agent of syphilis, one of the most socially significant sexually transmitted infections. Syphilis incidence is rising worldwide, including in Russia.</p>' +
    '<p>A unique medical phenomenon: since the 1940s <em>T. pallidum</em> has <strong>not developed resistance to penicillin</strong> — it remains the gold standard of treatment. However, about <strong>10% of patients</strong> are allergic to penicillin. Such patients were previously prescribed <strong>macrolides (azithromycin)</strong> — a convenient oral alternative. But due to point mutations in the <strong>23S rRNA</strong> gene (A2058G, A2059G) the treponeme has become <strong>completely non-susceptible</strong> to azithromycin: in several regions (the USA, China, European countries) <strong>80% to 100%</strong> of circulating strains carry these mutations.</p>' +
    '<p>Our pipeline provides the complete nanopore data analysis cycle for <strong>rapid confirmation of macrolide resistance</strong> in a specific strain and <strong>accurate genotyping</strong> of the pathogen — right at the patient\'s bedside or in the laboratory, without transferring data to external servers.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data (after the Dorado base-caller converts POD5/FAST5 to FASTQ).</li>' +
    '<li><strong>📤 Output:</strong> Detailed HTML report for the clinician and an extended report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mutations</h2>' +
    '<p>The pipeline analyses the key genetic determinants of <em>Treponema pallidum</em> resistance:</p>' +
    tbl(['Gene / locus', 'Key mutations', 'Antibiotic class', 'Clinical significance'], [
      ['<strong>23S rRNA</strong>', 'A2058G', '<strong>Azithromycin</strong> (macrolides)', 'Complete resistance — the drug is ineffective'],
      ['<strong>23S rRNA</strong>', 'A2059G', '<strong>Azithromycin</strong> (macrolides)', 'Complete resistance — the drug is ineffective']
    ]) +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Class', 'Clinical significance'], [
      ['<strong>Benzathine benzylpenicillin</strong>', 'β-lactam (penicillin)', 'Gold standard; no resistance recorded since the 1940s'],
      ['<strong>Azithromycin</strong>', 'Macrolide', 'Alternative in penicillin allergy; 80–100% of strains are resistant'],
      ['<strong>Doxycycline</strong>', 'Tetracycline', 'Second-line alternative in penicillin allergy'],
      ['<strong>Ceftriaxone</strong>', 'Cephalosporin III', 'Alternative in neurosyphilis']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<p>We continuously improve our pipeline and machine learning models to ensure the highest accuracy.</p>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Current Version'], [['<strong>OnSiteSeq Syphilis Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>Analysis Modules</h3>' +
    tbl(['Module', 'Version', 'Description'], [
      ['<strong>T. pallidum MLST &amp; Genotyping</strong>', '<code>1.0</code>', 'Determination of the molecular type of the pathogen'],
      ['<strong>Macrolide Resistance Detection (23S rRNA)</strong>', '<code>1.1</code>', 'Detection of A2058G and A2059G mutations associated with azithromycin resistance']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework and split into isolated Conda environments for maximum reproducibility.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>Python 3.10</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment</strong>', '<code>minimap2</code>, <code>samtools</code>'],
      ['<strong>3. Variant Calling</strong>', '<code>bcftools</code>, <code>htslib</code>'],
      ['<strong>4. Annotation and Reporting</strong>', '<code>Python</code>, <code>pandas</code>, <code>jinja2</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Penicillin always works.</strong> Over more than 80 years of use, <em>T. pallidum</em> has not developed a single resistance mechanism against it. Benzathine benzylpenicillin remains the number one drug.</li>' +
    '<li><strong>~10% of patients</strong> are allergic to penicillin and need alternative therapy.</li>' +
    '<li><strong>Macrolides are virtually written off</strong> from recommendations: A2058G/A2059G mutations in 23S rRNA make azithromycin completely ineffective. Without genetic confirmation, prescribing azithromycin to an allergic patient will lead to treatment failure and progression of the infection to a more severe stage.</li>' +
    '<li><strong>WHO</strong> — syphilis remains a global health problem, especially in the context of congenital syphilis and HIV co-infection.</li>' +
    '<li><strong>Russia</strong> — despite declining incidence, syphilis remains one of the key STIs requiring genomic surveillance.</li></ul>' +
    '<p>Our pipeline makes it possible to determine <strong>in hours, not days</strong> whether an alternative macrolide can be prescribed to a patient with penicillin allergy, or whether another treatment regimen is required.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/syphilis/treatment/index.html">CDC — Syphilis Treatment and Care</a></li>' +
    '<li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)">WHO — Sexually Transmitted Infections (STIs)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/treponema-pallidum">PubMLST — Treponema pallidum typing</a></li></ul>';

  /* ── ACINETOBACTER BAUMANNII (CRAB) ── */
  EN['/acinetobacter/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/acinetobacter.png" alt="Acinetobacter baumannii" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Acinetobacter baumannii</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic surveillance of the "last bastion" of nosocomial infections — a WHO priority pathogen of the "critical" category</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Acinetobacter baumannii</em> is a Gram-negative coccobacillus causing severe hospital-acquired (nosocomial) infections: pneumonia, bacteremia, meningitis, urinary tract and surgical wound infections. In 2024 the WHO included it in the updated list of <strong>AMR priority pathogens in the "critical" category (Priority 1: Critical)</strong> — the highest level of threat to human health.</p>' +
    '<p>The main danger of <em>A. baumannii</em> is its phenomenal ability to <strong>accumulate multidrug resistance (MDR) mechanisms</strong>: horizontal gene transfer, carbapenemase production (OXA-23, OXA-40, NDM), active efflux pumps (AdeABC) and modification of porin proteins. The result is the emergence of <strong>CRAB</strong> (Carbapenem-Resistant <em>A. baumannii</em>) and <strong>PDRAB</strong> (Pandrug-Resistant) strains resistant to literally all classes of antibiotics.</p>' +
    '<p>The current standard of AMR diagnostics — culture plus disk diffusion — takes 3–5 days. This is critically long in the ICU, where <strong>every hour of delay in appropriate therapy</strong> increases mortality. Our pipeline cuts the time to a complete AMR profile to <strong>a single working day</strong>, right in the hospital.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data (after the Dorado base-caller converts POD5/FAST5 to FASTQ). Both amplicon sequencing of key genes and whole-genome sequencing (WGS) are supported.</li>' +
    '<li><strong>📤 Output:</strong> Clinical HTML report with a complete AMR profile for the infectious disease physician and a technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mechanisms</h2>' +
    '<p><em>Acinetobacter baumannii</em> is one of the most genetically plastic pathogens. The pipeline analyses the full spectrum of key resistance determinants:</p>' +
    '<h3>Carbapenemases (the most critical class)</h3>' +
    tbl(['Gene / determinant', 'Mechanism', 'Antibiotic class'], [
      ['<strong>OXA-23, OXA-40, OXA-58</strong>', 'Class D serine β-lactamase', 'Carbapenems (Imipenem, Meropenem)'],
      ['<strong>OXA-51-like</strong> (chromosomal)', 'Constitutive β-lactamase', 'Carbapenems (species marker)'],
      ['<strong>NDM-1, NDM-2</strong>', 'Class B metallo-β-lactamase', 'Carbapenems, most β-lactams'],
      ['<strong>VIM, IMP</strong>', 'Metallo-β-lactamase', 'Carbapenems']
    ]) +
    '<h3>Resistance to other antibiotic classes</h3>' +
    tbl(['Gene / determinant', 'Mechanism', 'Antibiotic class'], [
      ['<strong>AdeABC</strong> (efflux pump)', 'Active efflux', 'Tetracyclines, quinolones, β-lactams'],
      ['<strong>AdeIJK</strong> (efflux pump)', 'Active efflux', 'Ticarcillin, chloramphenicol, trimethoprim'],
      ['<strong>armA, rmtB</strong>', '16S rRNA methylation', 'Aminoglycosides (high level)'],
      ['<strong>aac(6\')-Ib, aph(3\')-Ia</strong>', 'Enzymatic inactivation', 'Aminoglycosides'],
      ['<strong>gyrA</strong> Ser83Leu/Trp', 'Target modification', 'Fluoroquinolones (Ciprofloxacin)'],
      ['<strong>parC</strong> Ser80Leu', 'Target modification', 'Fluoroquinolones'],
      ['<strong>sul1, sul2</strong>', 'Alternative enzyme', 'Sulfonamides, co-trimoxazole'],
      ['<strong>tet(A), tet(B)</strong>', 'Efflux pump', 'Tetracyclines'],
      ['<strong>mcr-1</strong>', 'Lipid A modification', 'Colistin ("last-resort" drug)']
    ]) +
    '<h3>Antibiotic profile in the clinical report</h3>' +
    tbl(['Antibiotic', 'Class', 'Clinical significance'], [
      ['<strong>Meropenem / Imipenem</strong>', 'Carbapenem', 'First line in severe infections; CRAB is a global threat'],
      ['<strong>Colistin / Polymyxin B</strong>', 'Polymyxin', '"Last-resort" drug; nephrotoxic; mcr genes are a threat'],
      ['<strong>Sulbactam</strong>', 'β-lactamase inhibitor', 'Active on its own against AB; combination therapy'],
      ['<strong>Cefiderocol</strong>', 'Siderophore cephalosporin', 'Newest drug; active against CRAB and PDRAB'],
      ['<strong>Tigecycline</strong>', 'Glycylcycline', 'Alternative in MDR; no activity in bacteremia'],
      ['<strong>Ciprofloxacin</strong>', 'Fluoroquinolone', 'Frequently resistant; control marker'],
      ['<strong>Gentamicin / Amikacin</strong>', 'Aminoglycoside', 'Activity possible in the absence of armA/rmt']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq AB Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned Analysis Modules</h3>' +
    tbl(['Module', 'Version', 'Description'], [
      ['<strong>AB-Carbapenemase-Detector</strong>', '<code>1.0</code>', 'Detection of OXA-23/40/58, NDM, VIM, IMP — carbapenemases of all classes'],
      ['<strong>AB-AMR-Profiler</strong>', '<code>1.0</code>', 'Complete resistance profile across 7 antibiotic classes'],
      ['<strong>AB-MLST</strong>', '<code>1.0</code>', 'Molecular typing under the Pasteur scheme (Institut Pasteur) for epidemiological surveillance'],
      ['<strong>AB-cgMLST</strong>', '<code>1.0</code>', 'High-resolution typing for ICU outbreak investigation']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework and split into isolated Conda environments for maximum reproducibility.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>Python 3.10</code>, <code>NanoFilt</code>, <code>porechop_abi</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code>, <code>samtools</code> (reference: ATCC 19606 / CP000521)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3 ≥1.0.4</code>, <code>bcftools</code>, <code>htslib</code>'],
      ['<strong>4. Resistance gene detection</strong>', '<code>AMRFinderPlus</code> (NCBI), <code>ResFinder</code>, custom OXA-type database'],
      ['<strong>5. MLST typing</strong>', '<code>mlst</code> (Pasteur/Acinetobacter scheme, PubMLST)'],
      ['<strong>6. Annotation and reporting</strong>', '<code>Python</code>, <code>pandas</code>, <code>jinja2</code>, <code>snpEff</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, 2024 — Priority 1: Critical.</strong> <em>A. baumannii</em> topped the updated AMR priority pathogens list. No other bacterium received such an unambiguous threat assessment.</li>' +
    '<li><strong>CRAB infection mortality</strong> in the ICU reaches <strong>40–70%</strong> — comparable to severe sepsis.</li>' +
    '<li><strong>Military conflicts</strong> — <em>A. baumannii</em> earned the informal name "Iraqibacter" after mass nosocomial outbreaks among wounded service members in Iraq and Afghanistan.</li>' +
    '<li><strong>Resistance to disinfectants</strong>: the bacterium survives on dry surfaces for up to <strong>25 days</strong>, driving rapid spread within hospitals.</li>' +
    '<li><strong>Russia</strong>: CRAB circulates widely in Russian ICUs; the share of carbapenem-resistant isolates in some regions exceeds <strong>60%</strong>.</li>' +
    '<li><strong>New drugs</strong>: Cefiderocol (2019) and Sulbactam-Durlobactam (2023) are the only new options for PDRAB; appropriate therapy cannot be selected without an AMR profile.</li></ul>' +
    '<p>Rapid molecular AMR diagnostics at the bedside allows immediate <strong>de-escalation</strong> (switching from broad- to narrow-spectrum drugs) or <strong>escalation</strong> of therapy in CRAB/PDRAB — directly affecting ICU survival.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240093461">WHO — Bacterial Priority Pathogens List 2024</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/AMRFinder/">AMRFinderPlus (NCBI) — resistance gene database</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/acinetobacter-baumannii">PubMLST — Acinetobacter typing (Pasteur scheme)</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/clinical_breakpoints/">EUCAST — Breakpoints for A. baumannii</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/drugresistance/biggest-threats.html">CDC — Carbapenem-resistant Acinetobacter</a></li></ul>';

  /* ── PSEUDOMONAS AERUGINOSA (CRPA) ── */
  EN['/pseudomonas/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/pseudomonas.png" alt="Pseudomonas aeruginosa" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Drug Resistance Determination of Pseudomonas aeruginosa</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic surveillance of P. aeruginosa — a master of adaptation and chronic infections in cystic fibrosis, burns and the ICU</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Pseudomonas aeruginosa</em> is a Gram-negative non-fermenting bacterium, one of the most clinically dangerous opportunistic pathogens. In 2024 the WHO again included it in the <strong>priority pathogens list of the "critical" category</strong>, highlighting the rapid growth of carbapenem-resistant strains (CRPA).</p>' +
    '<p><em>P. aeruginosa</em> is unique in its adaptive capabilities. It has <strong>one of the largest bacterial genomes</strong> (~6.3 Mb), encoding a rich arsenal of resistance and virulence mechanisms. The bacterium can <strong>simultaneously</strong> engage multiple resistance mechanisms: porin loss (OprD), hyperexpression of efflux pumps (MexAB-OprM and others), β-lactamase production (AmpC, MBLs), and mutations in antibiotic target genes.</p>' +
    '<p>A particular problem is the role of <em>P. aeruginosa</em> in <strong>chronic infections in cystic fibrosis</strong>: the bacterium forms a biofilm and switches to a mucoid phenotype, becoming unreachable for antibiotics and the immune system. For these patients, monitoring the AMR profile of each strain is a matter of survival.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data (after the Dorado base-caller converts POD5/FAST5 to FASTQ). Both whole-genome (WGS) and amplicon sequencing are supported.</li>' +
    '<li><strong>📤 Output:</strong> Clinical HTML report with an AMR profile for the infectious disease physician / pulmonologist and a technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Mechanisms</h2>' +
    '<p><em>Pseudomonas aeruginosa</em> is one of the most difficult pathogens to treat: its resistance develops along several independent pathways at once. The pipeline analyses the full spectrum of determinants:</p>' +
    '<h3>Carbapenemases and β-lactamases</h3>' +
    tbl(['Gene / determinant', 'Mechanism', 'Antibiotic class'], [
      ['<strong>NDM-1, NDM-2</strong>', 'Class B metallo-β-lactamase (MBL)', 'Carbapenems, most β-lactams'],
      ['<strong>VIM-1, VIM-2</strong>', 'Class B MBL — the most frequent in PA', 'Carbapenems'],
      ['<strong>IMP types</strong>', 'Class B MBL', 'Carbapenems'],
      ['<strong>KPC-2, KPC-3</strong>', 'Class A serine carbapenemase', 'Carbapenems, all β-lactams'],
      ['<strong>AmpC</strong> (chromosomal, derepressed)', 'Class C cephalosporinase', 'Cephalosporins I–III, aztreonam'],
      ['<strong>OXA-10, OXA-14</strong>', 'Class D oxacillinase', 'Carbapenems (moderate), penicillins']
    ]) +
    '<h3>Efflux pumps (the main MDR mechanism in PA)</h3>' +
    tbl(['Pump', 'Regulator', 'Antibiotic class'], [
      ['<strong>MexAB-OprM</strong>', 'MexR (disruption)', 'β-lactams, fluoroquinolones, tetracyclines'],
      ['<strong>MexCD-OprJ</strong>', 'NfxB (disruption)', 'Fluoroquinolones, cefepime'],
      ['<strong>MexEF-OprN</strong>', 'MexT (activation)', 'Fluoroquinolones, carbapenems, chloramphenicol'],
      ['<strong>MexXY-OprM</strong>', 'MexZ (disruption)', 'Aminoglycosides, fluoroquinolones']
    ]) +
    '<h3>OprD porin loss and target mutations</h3>' +
    tbl(['Gene / change', 'Mechanism', 'Antibiotic class'], [
      ['<strong>oprD</strong> (mutation / deletion)', 'Loss of the specific porin', 'Carbapenems (Imipenem >> Meropenem)'],
      ['<strong>gyrA</strong> Thr83Ile, Asp87Gly/Asn', 'DNA gyrase modification', 'Fluoroquinolones (Ciprofloxacin)'],
      ['<strong>parC</strong> Ser87Trp', 'Topoisomerase IV modification', 'Fluoroquinolones'],
      ['<strong>armA, rmtB, rmtC</strong>', '16S rRNA methylation', 'Aminoglycosides (high level)'],
      ['<strong>aac(6\')-II, aph(3\')-IIb</strong>', 'Enzymatic inactivation', 'Aminoglycosides'],
      ['<strong>fosA</strong> (chromosomal)', 'Fosfomycin inactivation', 'Fosfomycin']
    ]) +
    '<h3>Antibiotic profile in the clinical report</h3>' +
    tbl(['Antibiotic', 'Class', 'Clinical significance'], [
      ['<strong>Piperacillin/tazobactam</strong>', 'β-lactam + inhibitor', 'First line for susceptible strains'],
      ['<strong>Ceftazidime</strong>', 'Cephalosporin III (antipseudomonal)', 'First line; susceptible in the absence of AmpC'],
      ['<strong>Cefepime</strong>', 'Cephalosporin IV', 'Active against derepressed AmpC'],
      ['<strong>Ceftolozane/tazobactam</strong>', 'New cephalosporin + inhibitor', 'Active against MDR strains with AmpC'],
      ['<strong>Meropenem / Imipenem</strong>', 'Carbapenem', 'First line in severe infections; CRPA is a global threat'],
      ['<strong>Cefiderocol</strong>', 'Siderophore cephalosporin', 'Newest drug against CRPA and PDR strains'],
      ['<strong>Ciprofloxacin</strong>', 'Fluoroquinolone', 'Frequently resistant; controlled via gyrA/parC'],
      ['<strong>Amikacin / Tobramycin</strong>', 'Aminoglycoside', 'Inhaled use in cystic fibrosis; armA = resistance'],
      ['<strong>Colistin / Polymyxin B</strong>', 'Polymyxin', 'Last resort in PDR'],
      ['<strong>Aztreonam/avibactam</strong>', 'Monobactam + inhibitor', 'Active against MBL producers']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq PA Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned Analysis Modules</h3>' +
    tbl(['Module', 'Version', 'Description'], [
      ['<strong>PA-Carbapenemase-Detector</strong>', '<code>1.0</code>', 'Detection of NDM, VIM, IMP, KPC, OXA — all classes of MBLs and serine carbapenemases'],
      ['<strong>PA-Efflux-Profiler</strong>', '<code>1.0</code>', 'Analysis of mutations in the pump regulators MexR, NfxB, MexT, MexZ'],
      ['<strong>PA-AMR-Profiler</strong>', '<code>1.0</code>', 'Complete AMR profile across 8 antibiotic classes'],
      ['<strong>PA-MLST</strong>', '<code>1.0</code>', 'Molecular typing (PubMLST/Pseudomonas scheme) for outbreak surveillance'],
      ['<strong>PA-Biofilm-Predictor</strong>', '<code>1.0</code>', 'Detection of biofilm genes (<em>pelB</em>, <em>pslA</em>, <em>algD</em>, <em>mucA</em>) — critical in cystic fibrosis']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework and split into isolated Conda environments for maximum reproducibility.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>Python 3.10</code>, <code>NanoFilt</code>, <code>porechop_abi</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code>, <code>samtools</code> (reference: PAO1 / AE004091)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3 ≥1.0.4</code>, <code>bcftools</code>, <code>htslib</code>'],
      ['<strong>4. Resistance gene detection</strong>', '<code>AMRFinderPlus</code>, <code>ResFinder</code>, custom MBL and efflux pump database'],
      ['<strong>5. MLST typing</strong>', '<code>mlst</code> (PubMLST/Pseudomonas aeruginosa scheme)'],
      ['<strong>6. Virulence gene annotation</strong>', '<code>VFDB</code> (virulence factor database)'],
      ['<strong>7. Reporting</strong>', '<code>Python</code>, <code>pandas</code>, <code>jinja2</code>, <code>snpEff</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, 2024 — Priority 1: Critical.</strong> CRPA (carbapenem-resistant <em>P. aeruginosa</em>), together with CRAB, is at the absolute top of global health threats.</li>' +
    '<li><strong>Mortality</strong>: CRPA infections in the ICU carry a case fatality of <strong>30–50%</strong>; in bacteremia — up to <strong>60%</strong>.</li>' +
    '<li><strong>Cystic fibrosis</strong>: <em>P. aeruginosa</em> chronically infects <strong>~80% of adult patients</strong> with cystic fibrosis. Switching to the mucoid phenotype makes the bacterium unreachable for standard therapy — AMR monitoring of each strain is <strong>vital</strong>.</li>' +
    '<li><strong>Burn centres</strong>: <em>P. aeruginosa</em> is the leading pathogen in burn patients; CRPA outbreaks devastate entire wards.</li>' +
    '<li><strong>Resistance accumulation "on the fly"</strong>: <em>P. aeruginosa</em> can acquire new resistance mechanisms <strong>during the treatment of a single patient</strong> — repeat AMR analysis over time is critically important.</li>' +
    '<li><strong>Russia</strong>: the share of CRPA in Russian hospitals exceeds <strong>30%</strong> on average and reaches <strong>50–60%</strong> in large ICUs.</li>' +
    '<li><strong>Biofilm</strong>: within a biofilm <em>P. aeruginosa</em> is <strong>1000 times</strong> more resistant to antibiotics — molecular detection of biofilm genes (<em>pelB</em>, <em>algD</em>) predicts therapeutic failure.</li></ul>' +
    '<p>Rapid molecular typing of the strain at the bedside allows the physician to switch immediately to an active drug (ceftolozane/tazobactam, cefiderocol) and <strong>not waste critical hours</strong> on "trial" regimens of ineffective therapy.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240093461">WHO — Bacterial Priority Pathogens List 2024</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/AMRFinder/">AMRFinderPlus (NCBI)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/pseudomonas-aeruginosa">PubMLST — Pseudomonas aeruginosa typing</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/clinical_breakpoints/">EUCAST — Breakpoints for P. aeruginosa</a></li>' +
    '<li>📄 <a href="http://www.mgc.ac.cn/VFs/">VFDB — Virulence Factor Database</a></li>' +
    '<li>📄 <a href="https://www.cff.org/managing-cf/treatments-and-therapies/infection-management/pseudomonas-aeruginosa">Cystic Fibrosis Foundation — PA in cystic fibrosis</a></li></ul>';

  /* ── CHLAMYDIA TRACHOMATIS ── */
  EN['/chlamydia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/chlamydia.png" alt="Chlamydia trachomatis" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Resistance Determination and Genotyping of Chlamydia trachomatis</h1>' +
    '<p style="font-size:1.2em;color:#555">Molecular diagnostics of the most common bacterial STI — from serovar determination to the detection of macrolide and fluoroquinolone resistance mutations</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Chlamydia trachomatis</em> is an obligate intracellular parasite causing chlamydia: the <strong>most common bacterial sexually transmitted infection</strong> in the world. According to the WHO, more than <strong>127 million new cases</strong> are registered annually. In Russia, chlamydia ranks first among STIs.</p>' +
    '<p>The unique biology of the pathogen creates serious diagnostic and therapeutic problems: chlamydia exists in <strong>two forms</strong> — the infectious elementary body (EB) and the intracellular reticulate body (RB). This makes the bacterium <strong>inaccessible to most antibiotics</strong> that disrupt cell wall synthesis (β-lactams are completely ineffective).</p>' +
    '<p>For a long time the drug of choice remained <strong>azithromycin</strong> (single dose). However, due to uncontrolled use, growing <strong>macrolide resistance</strong> via 23S rRNA gene mutations is being recorded, as well as resistance to <strong>fluoroquinolones</strong> (<em>gyrA</em>, <em>parC</em> genes). Incorrectly chosen therapy leads to chronic infection, infertility and the risk of ectopic pregnancy.</p>' +
    '<p>Our pipeline provides the complete nanopore data analysis cycle for <strong>serovar/genotype determination</strong> of the pathogen and <strong>detection of resistance mutations</strong> — right at the point of care, without transferring data to external servers.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data (after the Dorado base-caller converts POD5/FAST5 to FASTQ).</li>' +
    '<li><strong>📤 Output:</strong> Detailed HTML report for the clinician with the serovar and antibiotic susceptibility profile, and an extended QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Serovar Typing and Clinical Nosologies</h2>' +
    '<p><em>Chlamydia trachomatis</em> comprises <strong>19 serovars (A–L)</strong>, each associated with a specific clinical picture:</p>' +
    tbl(['Serovars', 'Clinical nosology', 'Significance'], [
      ['<strong>A, B, Ba, C</strong>', 'Trachoma (infectious keratoconjunctivitis)', 'Leading infectious cause of blindness in the world'],
      ['<strong>D–K</strong>', 'Urogenital chlamydia', 'The most common STI: urethritis, cervicitis, PID, infertility'],
      ['<strong>L1, L2, L2a, L2b, L3</strong>', 'Lymphogranuloma venereum (LGV)', 'Invasive form, severe systemic complications']
    ]) + '<hr>' +
    '<h2>🔬 Resistance Genes and Mutations</h2>' +
    '<p>The pipeline analyses the key genetic determinants of <em>Chlamydia trachomatis</em> resistance:</p>' +
    tbl(['Gene / locus', 'Key mutations', 'Antibiotic class', 'Clinical significance'], [
      ['<strong>23S rRNA</strong>', 'A2058G, A2059G', '<strong>Azithromycin</strong> (macrolides)', 'Resistance to the first-line drug'],
      ['<strong>23S rRNA</strong>', 'G2057A, C2611T', '<strong>Clarithromycin, Erythromycin</strong>', 'Cross-resistance to macrolides'],
      ['<strong>gyrA</strong>', 'Ser83Leu, Asp87Asn', '<strong>Ofloxacin, Levofloxacin</strong> (fluoroquinolones)', 'Resistance to alternative therapy'],
      ['<strong>parC</strong>', 'Ser87Ile', '<strong>Fluoroquinolones</strong>', 'Increased resistance level']
    ]) +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Class', 'Clinical significance'], [
      ['<strong>Azithromycin</strong>', 'Macrolide', 'First line — single 1 g dose; growing resistance'],
      ['<strong>Doxycycline</strong>', 'Tetracycline', 'First line (7 days) — preferred when resistance is a risk'],
      ['<strong>Ofloxacin / Levofloxacin</strong>', 'Fluoroquinolone', 'Alternative therapy'],
      ['<strong>Clarithromycin</strong>', 'Macrolide', 'Cross-resistance with azithromycin'],
      ['<strong>Amoxicillin</strong>', 'β-lactam', 'Only in pregnancy (limited efficacy)']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<p>We continuously improve our pipeline and machine learning models to ensure the highest accuracy.</p>' +
    '<h3>Core Tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Chlamydia Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned Analysis Modules</h3>' +
    tbl(['Module', 'Version', 'Description'], [
      ['<strong>CT-Serovar-Typer</strong>', '<code>1.0</code>', 'Serovar determination (A–L3) by the <em>ompA</em> gene (major outer membrane protein)'],
      ['<strong>CT-Resistance-Detector</strong>', '<code>1.0</code>', 'Detection of macrolide (23S rRNA) and fluoroquinolone (<em>gyrA</em>, <em>parC</em>) resistance mutations'],
      ['<strong>CT-MLST</strong>', '<code>1.0</code>', 'Molecular typing under the PubMLST/Chlamydiales scheme']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework and split into isolated Conda environments for maximum reproducibility.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>Python 3.10</code>, <code>NanoFilt</code>, <code>porechop_abi</code>, <code>pigz</code>'],
      ['<strong>2. Alignment</strong>', '<code>minimap2</code>, <code>samtools</code> (reference: D/UW-3/CX, NZ_CP001713)'],
      ['<strong>3. Variant Calling</strong>', '<code>bcftools</code>, <code>htslib</code>, <code>clair3</code>'],
      ['<strong>4. Serovar typing</strong>', 'Custom <em>ompA</em> allele database + <code>mlst</code> (PubMLST/Chlamydiales)'],
      ['<strong>5. Annotation and reporting</strong>', '<code>Python</code>, <code>pandas</code>, <code>jinja2</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>127 million new cases per year</strong> — chlamydia leads among bacterial STIs (WHO, 2020).</li>' +
    '<li><strong>"Silent epidemic"</strong> — in <strong>70–80% of women and 50% of men</strong> the infection is asymptomatic, ensuring unnoticed spread.</li>' +
    '<li><strong>Growing azithromycin resistance</strong> — A2058G and A2059G mutations in 23S rRNA were once described as rare, but their detection frequency is rising in Europe and the USA; doxycycline is coming to the fore.</li>' +
    '<li><strong>Complications</strong>: chronic salpingitis → tubal obstruction → <strong>infertility</strong> (in 10–15% of untreated women); LGV serovars cause severe destructive lymphadenopathies.</li>' +
    '<li><strong>Co-infection</strong>: chlamydia increases the risk of HIV acquisition during sexual contact <strong>3–5-fold</strong>, making its diagnosis critically important in conjunction with other STIs.</li>' +
    '<li><strong>Russia</strong> — chlamydia remains the most frequently registered STI; real incidence exceeds official figures 5–10-fold due to the asymptomatic course.</li></ul>' +
    '<p>The current standard is PCR diagnostics (presence/absence without resistance information). Our pipeline adds a <strong>critically important level</strong>: <strong>which serovar</strong> and <strong>whether it is susceptible to azithromycin</strong>, allowing the right therapy to be prescribed immediately without the risk of treatment failure.</p><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/chlamydia">WHO — Chlamydia Fact Sheet</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/std/treatment-guidelines/chlamydia.htm">CDC — Chlamydia Treatment Guidelines</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/chlamydiales-spp">PubMLST — Chlamydiales typing</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/en/chlamydia">ECDC — Chlamydia in Europe</a></li></ul>';

  /* ── CANDIDA ALBICANS ── */
  EN['/albicans/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_albicans.svg" alt="Candida albicans — yeast cell with blastoconidia and pseudohyphae" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Candida albicans: Resistance to Azoles and Echinocandins, Aneuploidies and Structural Rearrangements</h1>' +
    '<p style="font-size:1.2em;color:#555">SNV + CNV + aneuploidies in a single run — long reads see what short reads miss</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Candida albicans</em> is the leading agent of invasive candidiasis in humans: <strong>candidaemia in intensive care units</strong> (one of the main causes of bloodstream infections in hospitals), mucosal and cutaneous candidiasis, and <strong>biofilms on catheters and implants</strong> — azole tolerance within a biofilm is many times higher than in planktonic cells. The hallmark of the species is <strong>yeast ↔ hypha dimorphism</strong>: morphology switching is a key factor of virulence, tissue invasion and biofilm formation.</p>' +
    '<p>The key molecular feature that shapes the pipeline architecture: <em>C. albicans</em> is a <strong>diploid</strong> organism without a full sexual cycle, and in it resistance often develops not through point mutations but through <strong>aneuploidies and structural rearrangements</strong> — the classic example is <strong>isochromosome 5L</strong>, which carries both <em>ERG11</em> (the fluconazole target) and the regulator <em>TAC1</em>. Short reads resolve such rearrangements poorly; nanopore sequencing sees structural variants, copy number changes (CNV) and allows <strong>allele phasing</strong> in a diploid genome. Our pipeline combines <strong>SNV + CNV + aneuploidies in a single run</strong>.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: pure isolate or blood culture. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the near-bedside scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — species identification (ITS), AMR profile (azoles, echinocandins), CNV/aneuploidies (including isochromosome 5L), biofilm markers; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Resistance, Structural Variants</h2>' +
    '<h3>Species identification</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS</strong> (internal transcribed spacer of rDNA)', 'Species identification of <em>C. albicans</em> and differentiation from non-albicans species (<em>C. glabrata</em>, <em>C. parapsilosis</em>, <em>C. tropicalis</em>, <em>C. auris</em>)']
    ]) +
    '<h3>Azole resistance (fluconazole and others)</h3>' +
    tbl(['Marker', 'Mechanism', 'Clinical Significance'], [
      ['<strong>ERG11</strong>', 'Point mutations in the fluconazole target (lanosterol 14α-demethylase)', 'Reduced affinity of the azole for the enzyme — the main resistance mechanism'],
      ['<strong>UPC2</strong> (gain-of-function)', 'Overexpression of <strong>ERG11</strong>', 'Overproduction of the target compensates for the action of the azole'],
      ['<strong>TAC1</strong> (gain-of-function)', 'Overexpression of the <strong>CDR1/CDR2</strong> efflux pumps (ABC transporters)', 'Pumping the azole out of the cell'],
      ['<strong>MRR1</strong> (gain-of-function)', 'Overexpression of the <strong>MDR1</strong> pump (MFS transporter)', 'Pumping the azole out of the cell']
    ]) +
    '<h3>Echinocandins and amphotericin B</h3>' +
    tbl(['Marker', 'Drugs', 'Clinical Significance'], [
      ['<strong>FKS1</strong>, hot spots <strong>HS1/HS2</strong> (e.g. S645P)', 'Caspofungin, micafungin', 'Mutations in the echinocandin target (glucan synthase) — the key resistance given widespread echinocandin use in ICUs'],
      ['<strong>ERG3</strong> and ERG-related changes', 'Amphotericin B', 'Resistance is rare but described; altered membrane sterol composition']
    ]) +
    '<h3>Structural variants, CNV and aneuploidies — the long-read advantage</h3>' +
    tbl(['Variant', 'Content', 'Significance'], [
      ['<strong>Isochromosome 5L</strong>', 'Carries <strong>ERG11</strong> and <strong>TAC1</strong> simultaneously', 'A classic route to azole resistance: doubling the target and the efflux regulator with a single rearrangement'],
      ['<strong>Chromosome duplications / aneuploidies</strong>', 'Altered gene dosage', 'A frequent mechanism of adaptation to antifungals in diploid Candida'],
      ['<strong>CNV in AMR gene loci</strong>', 'Amplification of ERG11, CDR1/CDR2, MDR1', 'Overexpression without point mutations — invisible to SNV-oriented pipelines']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Albicans Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CAL-Azole-Profiler</strong>', 'Prediction of azole resistance from the ERG11/UPC2/TAC1/MRR1 profile and CNV'],
      ['<strong>CAL-FKS-Detector</strong>', 'Detection of FKS1 hot-spot mutations (HS1/HS2) — echinocandin resistance risk'],
      ['<strong>CAL-Aneuploidy-Scanner</strong>', 'Recognition of aneuploidies and isochromosome 5L from coverage and structural variants']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>C. albicans</em> reference (diploid genome)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — SNV/indels with allele phasing'],
      ['<strong>4. Structural variants and CNV</strong>', '<code>sniffles2</code>, <code>cuteSV</code> — SV, aneuploidies, per-chromosome coverage analysis (isochromosome 5L)'],
      ['<strong>5. AMR marker detection</strong>', 'Custom target database: ERG11, FKS1 HS1/HS2, UPC2/TAC1/MRR1 GoF, biofilm markers'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Candidaemia in the ICU</strong> — bloodstream infections caused by Candida occupy a growing share among nosocomial ICU infections; candidaemia is associated with high mortality, and delaying adequate antifungal therapy worsens the outcome. A genomic answer in hours changes tactics before irreversible empirical errors accumulate.</li>' +
    '<li><strong>Rising echinocandin resistance</strong> — echinocandins have become first-line drugs for candidaemia, and their widespread use is accompanied by the emergence of FKS1 mutants; monitoring of HS1/HS2 hot spots is becoming part of therapy routing.</li>' +
    '<li><strong>Species shift towards non-albicans</strong> — the share of <em>C. glabrata</em>, <em>C. parapsilosis</em> and <em>C. auris</em> is growing; ITS species identification determines the starting regimen even before susceptibility data. See the other cards of the candidiasis universe: <a href="/auris/">Candida auris</a> and <a href="/glabrata/">Candida glabrata</a>.</li>' +
    '<li><strong>Biofilms on devices</strong> — catheters and implants are colonised by biofilms with manifold increased azole tolerance; a genomic profile helps distinguish a "purely biofilm" problem (the solution is device removal) from heritable resistance of the strain.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Candidiasis</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — PubMed / Bookshelf</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Candidiasis</a></li></ul>';

  /* ── CANDIDA AURIS ── */
  EN['/auris/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_auris.svg" alt="Candida auris — budding yeast cell and global outbreaks" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Identification, Clade Typing and Outbreak Tracking of Candida auris</h1>' +
    '<p style="font-size:1.2em;color:#555">Molecular identification of the "super fungus", clade (I–VI) and AMR profile — an answer for hospital infection control in hours</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Candida auris</em> is a yeast-like fungus first described in <strong>2009</strong> (an isolate from the ear discharge of a patient in Japan — hence the name <em>auris</em>, "ear"). It soon turned out that something unprecedented had happened: several genetic clades (I–V; a sixth is now being described) emerged <strong>independently and almost simultaneously on different continents</strong> — the puzzle of simultaneous global emergence. One of the hypotheses under discussion links this to climate warming as a selection factor for thermotolerant fungi able to overcome the temperature barrier of the mammalian body; this is a hypothesis, not a proven mechanism.</p>' +
    '<p>The CDC has placed <em>C. auris</em> in the <strong>"Urgent Threat"</strong> category — the highest level of antimicrobial resistance threat. Three reasons why the fungus is called a "super fungus":</p>' +
    '<ul><li><strong>Multidrug resistance</strong> — about <strong>90% of isolates are resistant to fluconazole</strong>, amphotericin B resistance varies, echinocandin resistance is rising (mutations in <strong>FKS1</strong>, e.g. S639F); <strong>pan-resistant</strong> strains insensitive to all three main classes of antifungals have been described.</li>' +
    '<li><strong>Nosocomial outbreaks</strong> — persistent survival on surfaces and patient skin, transmission in ICUs; resistance to a number of disinfectants requires agents with proven activity against <em>C. auris</em>.</li>' +
    '<li><strong>Misidentification</strong> — phenotypic systems confuse it with <em>C. haemulonii</em> and other yeasts; reliable identification is only <strong>molecular</strong> (ITS/D1–D2) or MALDI-TOF with updated databases.</li></ul>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>molecular species identification</strong>, <strong>clade determination (I–VI)</strong> from a SNP panel/whole genome, the <strong>AMR profile</strong> (ERG11, FKS1) and <strong>outbreak tracking</strong>: SNP analysis of isolate relatedness answers the infection control question "who infected whom" and documents nosocomial transmission.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: isolate or screening swabs (axilla/groin). Optimal: rapid library preparation and a <strong>Flongle</strong> run for the hospital scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> Report for the hospital infection control service — species identification, clade, AMR profile, SNP clustering of outbreak isolates; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Clades, Resistance</h2>' +
    '<h3>Molecular identification and differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS / D1–D2</strong>', 'Species-specific identification of <em>C. auris</em> — the gold standard replacing error-prone phenotypic diagnostics'],
      ['<strong>Whole-genome SNP analysis</strong>', 'Differentiation from <em>C. haemulonii</em>, <em>C. pseudohaemulonii</em>, <em>C. duobushaemulonii</em> and other morphologically similar yeasts']
    ]) +
    '<h3>Clades (geographic phylogeography)</h3>' +
    tbl(['Clade', 'Typical Region', 'Note'], [
      ['<strong>I</strong>', 'South Asia', 'The most widespread in clinical outbreaks'],
      ['<strong>II</strong>', 'East Asia', 'The clade of the original 2009 Japanese isolate'],
      ['<strong>III</strong>', 'Africa', 'Outbreaks in South Africa and elsewhere'],
      ['<strong>IV</strong>', 'South America', 'Outbreaks in Venezuela, Colombia'],
      ['<strong>V</strong>', 'Iran', 'Described later, sporadic isolates'],
      ['<strong>VI</strong>', '—', 'A recently described clade; classification is being refined']
    ]) +
    '<h3>Resistance genes</h3>' +
    tbl(['Gene', 'Drug Class', 'Clinical Significance'], [
      ['<strong>ERG11</strong>', 'Azoles (fluconazole)', 'Mutations (Y132F, K143R and others) — the main mechanism of azole resistance; ~90% of isolates are resistant to fluconazole'],
      ['<strong>FKS1</strong>', 'Echinocandins (caspofungin and others)', 'Hot-spot mutations (e.g. <strong>S639F</strong>) — the last-line drug loses efficacy'],
      ['<strong>Additional loci</strong>', 'Amphotericin B', 'Mechanisms vary; pan-resistant strains deprive all three classes']
    ]) +
    '<h3>Output for infection control</h3>' +
    tbl(['Task', 'What the Pipeline Provides'], [
      ['<strong>Species confirmation</strong>', 'Molecular identification of <em>C. auris</em> without the risk of confusion with <em>C. haemulonii</em>'],
      ['<strong>Outbreak investigation</strong>', 'SNP clustering of isolates: who infected whom, common source, nosocomial transmission'],
      ['<strong>Therapy selection</strong>', 'AMR profile (ERG11, FKS1) — fluconazole is excluded by default, echinocandin risk is checked'],
      ['<strong>Surveillance</strong>', 'Clade determination (I–VI) — imported isolate or local circulation']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Auris Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CAU-Clade-Typer</strong>', 'Clade determination (I–VI) from the SNP profile'],
      ['<strong>CAU-Res-Detector</strong>', 'Antifungal resistance prediction from genomic data (ERG11, FKS1)'],
      ['<strong>CAU-Outbreak-Tracker</strong>', 'Clustering of outbreak isolates by SNP relatedness for epidemiological investigation']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — references of <em>C. auris</em> clades (I–VI) and related species for differentiation'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Phylogenetics and clustering</strong>', 'SNP analysis of isolate relatedness, tree building, custom clade database'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) +
    '<p>Long Oxford Nanopore reads additionally enable <strong>complete isolate assembly</strong> and detection of <strong>structural variants</strong> inaccessible to short-read technologies.</p><hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Global outbreaks</strong> — <em>C. auris</em> has been recorded on all inhabited continents; according to the CDC and ECDC, case numbers in the USA and Europe are steadily rising; cases have also been reported from Russia. Every new outbreak requires a rapid answer: species, clade, resistance, transmission chain.</li>' +
    '<li><strong>Urgent Threat</strong> — the CDC has assigned <em>C. auris</em> to the highest AMR threat category. Multidrug resistance (up to pan-resistant strains) makes the empirical choice of antifungal therapy virtually impossible without genomic data.</li>' +
    '<li><strong>High candidaemia mortality</strong> — in invasive forms, lethality in clinical series reaches <strong>30–60%</strong>; attribution of mortality is complex — patients usually have severe comorbid conditions (ICU, catheters, immunosuppression).</li>' +
    '<li><strong>Hospital infection control</strong> — <em>C. auris</em> persists on surfaces and skin for months; treatment requires disinfectants with proven activity against this fungus. Rapid SNP outbreak tracking allows the source to be localised and the transmission chain to be broken before spread across wards.</li>' +
    '<li><strong>The emergence puzzle</strong> — the simultaneous independent appearance of clades on different continents (hypothesis: selection of thermotolerant fungi against a background of warming) makes <em>C. auris</em> a model example of a new wave of fungal pathogens for which surveillance systems must be ready.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Candida auris</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — European Centre for Disease Prevention and Control</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — National Center for Biotechnology Information</a></li></ul>';

  /* ── CANDIDA GLABRATA ── */
  EN['/glabrata/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_glabrata.svg" alt="Candida glabrata — budding yeast cells and a spiral of resistance evolution" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>The Evolution of Drug Resistance in Candida glabrata — Under Genome Surveillance</h1>' +
    '<p style="font-size:1.2em;color:#555">PDR1 / FKS1 / FKS2 / MSH2 profile and microevolution of serial patient isolates — while therapy can still work</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Candida glabrata</em> (modern name — <em>Nakaseomyces glabratus</em>) is the <strong>second most frequent cause of candidaemia</strong> in adults in developed countries and the headliner of the new "Candidiasis Universe" section. Unlike <em>C. albicans</em>, this pathogen is <strong>haploid</strong> and <strong>forms neither true hyphae nor pseudohyphae</strong> — only small budding yeast cells. Persistence in the host is provided by adhesins of the <strong>EPA family</strong>, and its main clinical weapon is a striking ability to evolve resistance right in the course of therapy.</p>' +
    '<p>The core of the problem is <strong>resistance evolving "in front of the eyes of the physician"</strong>. <em>C. glabrata</em> is intrinsically <strong>less susceptible to fluconazole</strong> (SDD category — susceptible, dose-dependent), and under therapeutic pressure rapidly acquires full resistance: <strong>gain-of-function PDR1 mutations</strong> lead to overexpression of the <strong>CDR1/CDR2</strong> efflux pumps (azole resistance), while <strong>FKS1 and FKS2 hot-spot mutations</strong> (e.g. S629P in FKS1, S663P in FKS2) confer resistance to echinocandins. The classic scenario: an ICU patient on micafungin, a few weeks later — <strong>breakthrough candidaemia with a resistant strain</strong>. A separate feature of the species is <strong>MSH2</strong> mutations (mismatch repair system) producing a <strong>mutator (hypermutable) phenotype</strong> that accelerates this whole evolution. Isolates resistant <strong>to both azoles and echinocandins simultaneously</strong> have been described — in such cases practically only amphotericin B remains among the treatment options.</p>' +
    '<p>From nanopore sequencing data of <strong>serial isolates from a single patient</strong> (before and during therapy) our pipeline builds the profile of key resistance genes, performs ITS species identification and <strong>compares the serial isolates with each other</strong> — tracking microevolution within the patient. Long reads give complete coverage of the target genes and <strong>CNV</strong> control (copy number of pumps and targets).</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: culture of serial isolates from blood and other sterile sites. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the ICU bedside scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the clinician — species identification, PDR1/FKS1/FKS2/MSH2 profile, mutation dynamics across serial isolates and a <strong>therapy adjustment recommendation</strong>; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Resistance, Identification, Microevolution</h2>' +
    '<h3>Resistance marker genes</h3>' +
    tbl(['Gene', 'Mechanism', 'Clinical Significance'], [
      ['<strong>PDR1</strong>', 'Gain-of-function mutations of the regulator → pump overexpression', 'The main driver of acquired resistance to <strong>azoles</strong> (fluconazole, voriconazole)'],
      ['<strong>CDR1 / CDR2</strong>', 'Efflux pumps (ABC transporters)', 'Effectors of PDR1-dependent resistance; increased expression and copy number'],
      ['<strong>FKS1</strong>', 'Hot-spot mutations (e.g. <strong>S629P</strong>) — echinocandin target', 'Resistance to <strong>echinocandins</strong> (micafungin, caspofungin, anidulafungin)'],
      ['<strong>FKS2</strong>', 'Hot-spot mutations (e.g. <strong>S663P</strong>) — the second glucan synthase subunit', 'In <em>glabrata</em> no less significant than FKS1 — both must be monitored'],
      ['<strong>MSH2</strong>', 'Mismatch repair (MMR) system defect', '<strong>Hypermutable phenotype</strong> → accelerated evolution of resistance to any drugs']
    ]) +
    '<h3>Species identification and differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS</strong> (internal transcribed spacer of rDNA)', 'Species identification of <em>C. glabrata</em> / <em>Nakaseomyces glabratus</em>'],
      ['<strong>Non-albicans Candida panel</strong>', 'Differentiation from <em>C. albicans</em>, <em>C. parapsilosis</em>, <em>C. tropicalis</em> and <em>C. auris</em> — they have different susceptibility profiles and therapy tactics']
    ]) +
    '<h3>Serial isolates: microevolution within the patient</h3>' +
    tbl(['Analysis', 'Significance'], [
      ['<strong>Comparison of "before / during therapy" isolates</strong>', 'Detection of new PDR1/FKS1/FKS2 mutations during treatment — resistance is recorded at the moment of emergence, not after the fact'],
      ['<strong>CNV from long reads</strong>', 'Copy number control of CDR1/CDR2 and targets — amplifications intensify the resistance phenotype'],
      ['<strong>Signs of hypermutability (MSH2)</strong>', 'Prognosis: a strain with defective MMR will acquire resistance faster — backup regimens must be prepared in advance']
    ]) +
    '<h3>Clinical scenarios in the report</h3>' +
    tbl(['Scenario', 'Problem', 'Role of Genomics'], [
      ['<strong>Empirical fluconazole</strong>', 'Intrinsic SDD susceptibility of <em>glabrata</em> — risk of standard-dose failure', 'ITS species confirmation → timely switch to an adequate regimen'],
      ['<strong>Breakthrough candidaemia on an echinocandin</strong>', 'Patient on micafungin for weeks, cultures keep growing', 'Search for FKS1/FKS2 mutations in serial isolates → proof of resistance and a drug change'],
      ['<strong>Multidrug-resistant isolate</strong>', 'Simultaneous resistance to azoles + echinocandins', 'PDR1 + FKS profile → rationale for switching to <strong>amphotericin B</strong>'],
      ['<strong>Recurrent candidaemia</strong>', 'Strain persistence vs reinfection', 'Genome comparison of serial isolates: are the strains related']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Glabrata Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CGL-FKS-Caller</strong>', 'Detection of FKS1/FKS2 hot-spot mutations and prediction of echinocandin resistance'],
      ['<strong>CGL-Res-Evolution</strong>', 'Prediction of resistance evolution risk from the PDR1/MSH2 profile and serial isolate dynamics'],
      ['<strong>CGL-Species-ID</strong>', 'Species identification of non-albicans Candida from ITS and genomic features']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>C. glabrata</em> reference + non-albicans Candida species panel'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — SNPs in PDR1/FKS1/FKS2/MSH2, CNV control from long-read coverage'],
      ['<strong>4. Resistance target detection</strong>', 'Custom target database (PDR1, CDR1/CDR2, FKS1/FKS2, MSH2) + ITS for species identification'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Shift towards non-albicans</strong> — the share of candidaemias caused by species other than <em>C. albicans</em> is steadily growing in developed countries, and <em>C. glabrata</em> is the leader of this shift: empirical regimens designed for albicans increasingly prove inadequate.</li>' +
    '<li><strong>CDC and ECDC alarm signal</strong> — the rise of echinocandin-resistant <em>C. glabrata</em> is recognised as an epidemiological threat: echinocandins are first-line drugs for candidaemia, and their failure leaves the clinician practically without safe options.</li>' +
    '<li><strong>ICU practice fuels the problem</strong> — routine empirical echinocandin prescribing in severe patients creates constant selective pressure: it is in intensive care units that breakthrough resistant strains arise and are selected.</li>' +
    '<li><strong>Microevolution is clinically measurable</strong> — serial isolates from a single patient show resistance emerging over weeks, not years. Nanopore sequencing on an Edge unit allows this process to be tracked in real time and therapy to be adjusted before the clinical breakthrough, not after.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Invasive Candidiasis and Candida glabrata</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — Candidaemia and resistance surveillance</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — Candida glabrata (Taxonomy, Bookshelf, PubMed)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Candidiasis</a></li></ul>';

  /* ── CANDIDA PARAPSILOSIS ── */
  EN['/parapsilosis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_parapsilosis.svg" alt="Candida parapsilosis — yeast cells and a catheter" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Identification, Fluconazole Resistance and Outbreak Tracking of Candida parapsilosis</h1>' +
    '<p style="font-size:1.2em;color:#555">ERG11 Y132F, SNP clustering of outbreak isolates and species complex differentiation — in the neonatal ICU every hour counts</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Candida parapsilosis</em> is a yeast-like fungus and a classic agent of <strong>outbreaks in neonatal intensive care units (NICUs)</strong>. The key mechanism is transmission via the <strong>hands of medical staff</strong> and <strong>invasive devices</strong>: the fungus has a pronounced tropism for biofilms on polymers, so central venous catheters and parenteral nutrition systems become the gateway of <strong>catheter-associated candidaemia</strong>. Historically <em>C. parapsilosis</em> was considered less virulent than <em>C. albicans</em>, but its outbreak potential, persistence in the ward and growing resistance have made it one of the main infection control problems in neonatology.</p>' +
    '<p>From nanopore sequencing data of outbreak isolates our pipeline performs <strong>species identification</strong> (ITS, with differentiation from <em>C. orthopsilosis</em> and <em>C. metapsilosis</em> — a complex of related species with different epidemiology), the <strong>AMR profile</strong> (ERG11 Y132F, TAC1, FKS1) and <strong>SNP-based outbreak tracking</strong> — a genomic answer for infection control: is it a single clone, and where is its source — staff hands or equipment.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: isolates from blood, swabs from staff hands and surfaces, catheter biofilm. Optimal: a <strong>Flongle</strong> run right in the ward for the point-of-care scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for infection control and the clinician — species identification, AMR profile with a therapy recommendation (<strong>echinocandins in case of ERG11 Y132F</strong>), SNP clustering of outbreak isolates; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Resistance, Outbreak</h2>' +
    '<h3>Species identification: a species complex</h3>' +
    '<p><em>C. parapsilosis</em> is a complex of closely related species that differ in epidemiology and azole susceptibility; ITS sequencing reliably separates them:</p>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS</strong> (ITS1–5.8S–ITS2)', 'Species-specific identification of <em>C. parapsilosis</em> sensu stricto'],
      ['<strong>ITS vs ortho/metapsilosis</strong>', 'Differentiation from <em>C. orthopsilosis</em> and <em>C. metapsilosis</em> — complex species with a different resistance frequency']
    ]) +
    '<h3>Resistance genes: the core is fluconazole</h3>' +
    '<p>The main emerging problem is <strong>fluconazole resistance via the ERG11 Y132F mutation</strong> (the same mutation as in <em>C. tropicalis</em>). Outbreaks of fluconazole-resistant <em>C. parapsilosis</em> with Y132F have been described in different countries — Europe, Asia, Latin America; resistant clones spread within hospitals and change empirical regimens.</p>' +
    tbl(['Marker', 'Mechanism', 'Clinical Significance'], [
      ['<strong>ERG11 Y132F</strong>', 'Substitution in the azole target (lanosterol 14α-demethylase)', '<strong>The key mutation</strong>: fluconazole resistance; with Y132F the report recommends echinocandins'],
      ['<strong>TAC1</strong> (polymorphisms)', 'Overexpression of CDR efflux pumps', 'Enhancement of azole resistance, phenotype modifier'],
      ['<strong>FKS1</strong>', 'Echinocandin target (β-1,3-glucan synthase)', 'Control of echinocandin resistance — the drugs of choice in case of Y132F']
    ]) +
    '<h3>Outbreak tracking</h3>' +
    tbl(['Task', 'Approach', 'Result in the Report'], [
      ['<strong>Isolate relatedness</strong>', 'SNP clustering from clair3/medaka variants', 'One clone or several introductions into the ward'],
      ['<strong>Source</strong>', 'Comparison of patient isolates with swabs from staff hands and equipment', 'Localisation of the reservoir: staff hands / catheters / parenteral nutrition systems'],
      ['<strong>Therapy</strong>', 'AMR profile (ERG11, TAC1, FKS1)', 'Recommendation: echinocandins with Y132F; fluconazole with wild-type ERG11']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Parapsilosis Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CPAR-Species-ID</strong>', 'Differentiation of the <em>C. parapsilosis</em> / <em>C. orthopsilosis</em> / <em>C. metapsilosis</em> complex from ITS'],
      ['<strong>CPAR-Res-Detector</strong>', 'Resistance profile prediction from genomic data (ERG11 Y132F, TAC1, FKS1)'],
      ['<strong>CPAR-Outbreak-Tracker</strong>', 'SNP clustering of outbreak isolates and source finding']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — reference panel of the species complex (<em>C. parapsilosis</em>, <em>C. orthopsilosis</em>, <em>C. metapsilosis</em>)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — complete genes and isolate assembly on long reads'],
      ['<strong>4. AMR marker detection and SNP clustering</strong>', 'Custom marker database (ERG11, TAC1, FKS1) and SNP clustering of outbreak isolates'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Neonatal ICUs</strong> — <em>C. parapsilosis</em> outbreaks in neonatology are a regular publication topic: premature infants with central catheters and parenteral nutrition are the highest-risk group. SNP clone tracking allows the source (staff hands, equipment) to be found quickly and the outbreak to be stopped.</li>' +
    '<li><strong>Geography</strong> — the share of <em>C. parapsilosis</em> in the candidaemia structure is higher in Southern Europe, Latin America and Asia, where it often ranks among the leading candidaemia agents alongside <em>C. albicans</em>.</li>' +
    '<li><strong>Emerging resistance</strong> — outbreaks of fluconazole-resistant <em>C. parapsilosis</em> with the ERG11 Y132F mutation have been described in various countries; resistant clones spread within hospitals and shift empirical therapy towards echinocandins.</li>' +
    '<li><strong>Infection control</strong> — fungal persistence on surfaces and biofilms makes traditional culture-based monitoring slow; genomic typing of outbreak isolates in hours turns an investigation from retrospective analysis into an operational tool.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Invasive Candidiasis</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — Candida parapsilosis (Taxonomy and literature)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Candidiasis</a></li></ul>';

  /* ── CANDIDA TROPICALIS & C. KRUSEI ── */
  EN['/tropicalis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_tropicalis.svg" alt="Candida tropicalis and Candida krusei — a duet of non-albicans yeasts" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Identification and Antifungal Resistance of Candida tropicalis and C. krusei</h1>' +
    '<p style="font-size:1.2em;color:#555">Asian and intrinsically resistant Candida: species identification, ERG11/FKS1 profile and tracking of resistant clones</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>The "Candidiasis Universe" section opens with a duet of <strong>non-albicans</strong> species with special resistance profiles — <em>Candida tropicalis</em> and <em>Candida krusei</em> (teleomorph <em>Pichia kudriavzevii</em>). Both species are increasingly causing candidaemia, and both break the standard empirical tactics designed for <em>C. albicans</em>.</p>' +
    '<p><em>Candida tropicalis</em> is one of the leading causes of candidaemia in the <strong>Asia-Pacific region</strong> and in haematological/oncological patients against a background of <strong>neutropenia</strong>. The key problem of recent years is the wide spread (first and foremost described for <strong>China</strong>) of clones with <strong>azole cross-resistance</strong> caused by mutations in the <strong>ERG11</strong> gene (primarily <strong>Y132F</strong> and <strong>A395T</strong>, often in combination). Such clones are resistant to <strong>fluconazole and voriconazole</strong> and are detected, among others, in patients <strong>without prior azole exposure</strong>. This gave rise to the discussed hypothesis of an <strong>environmental reservoir</strong> of resistance and its possible link to the use of azole fungicides in agriculture — a classic <strong>One Health</strong> storyline.</p>' +
    '<p><em>Candida krusei</em> (<em>Pichia kudriavzevii</em>) is a species with <strong>intrinsic fluconazole resistance</strong>: this antifungal must not be prescribed empirically, even without waiting for the susceptibility test. Under the selective pressure of <strong>echinocandins</strong> the species acquires <strong>FKS1</strong> mutations, narrowing an already narrow arsenal. A historical fact: the species is named after the Russian microbiologist <strong>V. I. Kudryavtsev</strong>, a researcher of yeast taxonomy.</p>' +
    '<p>From nanopore sequencing data of an isolate our pipeline performs <strong>ITS species identification</strong> (krusei vs tropicalis differentiation is critical: the species have different starting therapy), determines the <strong>AMR profile</strong> (ERG11 Y132F/A395T, TAC1, FKS1) and <strong>tracks the spread of resistant clones</strong> by SNP distances.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: pure isolate culture (blood culture, sterile sites). Optimal: rapid library preparation and a <strong>Flongle</strong> run for the "isolate → report within a shift" scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the clinician/microbiologist — species identification, AMR profile explicitly stating that for <em>C. krusei</em> <strong>fluconazole is excluded</strong>, a starting therapy recommendation; SNP clustering for the epidemiologist; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Resistance, Clones</h2>' +
    '<h3>Species identification</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS (ITS1–5.8S–ITS2)</strong>', 'Species-specific identification: <em>C. tropicalis</em> vs <em>C. krusei</em> — fundamentally different starting therapy'],
      ['<strong>Non-albicans panel</strong>', 'Differentiation from <em>C. albicans</em>, <em>C. glabrata</em>, <em>C. parapsilosis</em> and other complex species']
    ]) +
    '<h3>Azole resistance genes</h3>' +
    tbl(['Gene / Mutation', 'Species', 'Clinical Significance'], [
      ['<strong>ERG11 Y132F</strong>', '<em>C. tropicalis</em>', 'Key mutation of azole cross-resistance (fluconazole + voriconazole) in Asian clones'],
      ['<strong>ERG11 A395T</strong>', '<em>C. tropicalis</em>', 'Often combined with Y132F — high-level azole resistance'],
      ['<strong>TAC1</strong>', '<em>C. tropicalis</em>', 'ABC transporter regulator; overexpression enhances azole efflux'],
      ['<strong>ERG11 (wild type)</strong>', '<em>C. krusei</em>', 'Structural features of the target → <strong>intrinsic fluconazole resistance</strong> (not acquired!)']
    ]) +
    '<h3>Echinocandin resistance</h3>' +
    tbl(['Gene', 'Species', 'Clinical Significance'], [
      ['<strong>FKS1 (hot spots)</strong>', 'both species', 'Mutations under echinocandin pressure (caspofungin, micafungin, anidulafungin) — critical for <em>C. krusei</em>, whose arsenal is already narrow']
    ]) +
    '<h3>Empirical therapy in the report</h3>' +
    tbl(['Scenario', 'Approach', 'Role of Genomics'], [
      ['<strong>ITS → <em>C. krusei</em></strong>', 'Fluconazole is <strong>excluded</strong> (intrinsic resistance) — start with an echinocandin or amphotericin B', 'FKS1 profile → preserve echinocandins in the absence of hot-spot mutations'],
      ['<strong>ITS → <em>C. tropicalis</em>, ERG11 Y132F/A395T+</strong>', 'Azole cross-resistance is likely — an echinocandin is preferred', 'FKS1 profile + SNP clustering of the resistant clone'],
      ['<strong>ITS → <em>C. tropicalis</em>, wild-type ERG11</strong>', 'Azoles remain an option', 'Confirmation of a susceptible background, absence of TAC1 overexpression']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Tropicalis Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CTR-Species-ID</strong>', 'ITS species identification: krusei vs tropicalis and differentiation from other non-albicans'],
      ['<strong>CTR-Azole-Res</strong>', 'Prediction of azole cross-resistance from the ERG11 (Y132F/A395T) and TAC1 profile'],
      ['<strong>CTR-Clone-Tracker</strong>', 'SNP clustering and tracking of resistant clone spread']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — reference panel of <em>C. tropicalis</em>, <em>C. krusei</em> (<em>P. kudriavzevii</em>) and other non-albicans'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. AMR gene detection</strong>', 'Custom database of ERG11/TAC1/FKS1 alleles and ITS markers, compatible with CARD/ResFinder formats'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Species spectrum shift of candidaemias</strong> — the share of non-albicans species is steadily growing; in the Asia-Pacific region <em>C. tropicalis</em> is among the candidaemia leaders, and empirical fluconazole designed for <em>C. albicans</em> increasingly misses the target.</li>' +
    '<li><strong>Azole-resistant <em>C. tropicalis</em> clones from Asia</strong> — wide spread of ERG11 Y132F/A395T clones (first and foremost in China), including isolates from patients without prior azole exposure. This turns species identification without an AMR profile into half an answer.</li>' +
    '<li><strong>Intrinsic resistance of <em>C. krusei</em></strong> — the only widespread Candida species for which fluconazole is unacceptable in principle. An empirical prescribing error here is not a matter of probability but a rule.</li>' +
    '<li><strong>One Health bridge</strong> — the discussed link between azole fungicides in agriculture and azole resistance of clinical isolates points to a possible environmental reservoir of resistant clones. The same "fungicides in the field → resistance in the clinic" logic works in phytopathology too — see the farming section on <a href="/phytophthora/">late blight</a>.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Candidemia and Invasive Candidiasis</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — Candida tropicalis / Candida krusei (Taxonomy, PubMed)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Candidiasis (invasive)</a></li></ul>';

  /* ── MALASSEZIA ── */
  EN['/malassezia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_malassezia.svg" alt="Malassezia — budding yeasts with a lipid droplet" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Malassezia: NICU Fungaemia and Zoonotic Outbreaks</h1>' +
    '<p style="font-size:1.2em;color:#555">Species identification of lipophilic yeasts, SNP tracing of the outbreak source and azole resistance — where culture is powerless</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Malassezia</em> is a genus of <strong>lipophilic basidiomycete yeasts</strong> (this is fundamental: not <em>Candida</em> and not ascomycetes, but the class Exobasidiomycetes), dominants of the skin mycobiome of humans and warm-blooded animals. The genus comprises <strong>~18 species</strong>; <em>M. globosa</em> and <em>M. restricta</em> are associated with dandruff and seborrhoeic dermatitis, <em>M. furfur</em> with pityriasis versicolor and Malassezia folliculitis. To be honest: <strong>cutaneous forms are a clinical diagnosis</strong> — microscopy of a scraping is sufficient, and sequencing there is excessive. Our pipeline targets the territory where culture and phenotype systematically lose — invasive infection and outbreak epidemiology.</p>' +
    '<p><strong>Core #1 — NICU fungaemia.</strong> Preterm infants on prolonged parenteral nutrition with <strong>lipid emulsions (Intralipid)</strong> are the classic population for Malassezia fungaemia: the fungus is lipid-dependent and literally feeds on the lipids of the infusate, forming <strong>catheter-associated fungaemia</strong> of central venous catheters. The clinical picture is nonspecific (fever, thrombocytopenia, respiratory distress in a catheterised child), and <em>Malassezia</em> <strong>does not grow</strong> in standard blood culture media — without lipid supplementation the culture remains sterile, and the diagnosis is systematically delayed or never made at all.</p>' +
    '<p><strong>Core #2 — culture is laborious, molecular identification is faster and more reliable.</strong> Lipid dependence requires special media (Dixon agar with a lipid supplement), growth is slow (days), and phenotypic methods <strong>do not differentiate the ~18 species of the genus</strong>. Direct molecular identification from blood, a catheter tip or skin by ITS/LSU gives a species-level answer within hours — without waiting for a culture that may never grow.</p>' +
    '<p><strong>Core #3 — zoonotic outbreaks and One Health.</strong> <em>M. pachydermatis</em> is the only <strong>lipid-independent</strong> species of the genus, a permanent inhabitant of canine skin and ears. NICU outbreaks have been documented in which staff <strong>brought the fungus on their hands from household pets</strong>, infecting preterm infants through catheters. <strong>SNP tracing</strong> of genomic data links clinical isolates to the source (the pet of a specific staff member) — this changes infection-control measures from "sterilise everything" to targeted elimination of the source. The One Health loop is closed by resistance: dogs with Malassezia otitis and dermatitis are massively treated with <strong>azoles in veterinary medicine</strong>, and azole-resistant <em>M. pachydermatis</em> strains have already been described — a potential reservoir of resistance next door to the preterm unit. A related topic is catheter-associated outbreaks of <em>Candida parapsilosis</em> in the same NICUs: see the <a href="/parapsilosis/">Candida parapsilosis page</a>.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>species identification</strong> (full-length ITS + D1/D2 LSU), <strong>SNP typing</strong> for outbreak tracing and <strong>detection of azole resistance</strong> via ERG11 and efflux mechanisms.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: blood, catheter tip, skin scraping, canine external ear discharge (veterinary sample). Skin samples are <strong>low biomass</strong>, so the amplicon approach (ITS/D1D2) is optimal, together with a rapid <strong>Flongle</strong> run (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the NICU microbiologist/epidemiologist — species identification, ERG11/efflux profile, SNP clustering of outbreak isolates with an indication of the probable source; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Resistance, Tracing</h2>' +
    '<h3>Species identification</h3>' +
    '<p>Phenotypic methods do not differentiate species of the genus <em>Malassezia</em>; the gold standard is molecular loci:</p>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS1 / ITS2 (full-length ITS)</strong>', 'The primary barcode of the genus; nanopore sequencing covers the entire ITS in a single read — species-level resolution without assembly'],
      ['<strong>D1/D2 (LSU, 26S rRNA)</strong>', 'The classic yeast identification locus; duplicates ITS and resolves ambiguous cases'],
      ['<strong>Species targets</strong>', '<em>M. furfur</em> (NICU fungaemia, pityriasis versicolor), <em>M. pachydermatis</em> (canine zoonosis), <em>M. globosa</em> and <em>M. restricta</em> (dominants of the skin mycobiome, seborrhoeic dermatitis)']
    ]) +
    '<h3>Resistance genes</h3>' +
    '<p>Azoles are the backbone of therapy (fluconazole, itraconazole) and veterinary practice, but resistance is growing:</p>' +
    tbl(['Mechanism', 'Marker', 'Clinical Significance'], [
      ['<strong>Target mutations</strong>', '<strong>ERG11</strong> (lanosterol 14α-demethylase)', 'Point mutations reduce azole binding — the main mechanism of fluconazole resistance'],
      ['<strong>Efflux pumps</strong>', 'ABC transporters (MDR pumps)', 'Pumping azoles out of the cell; overexpression and hypermorphic alleles of regulators'],
      ['<strong>Veterinary reservoir</strong>', 'ERG11 + efflux in <em>M. pachydermatis</em>', 'Azole selection in dogs → resistant strains within reach of the NICU']
    ]) +
    '<h3>Epidemiological tracing</h3>' +
    tbl(['Method', 'Task'], [
      ['<strong>SNP typing</strong> (clonal core genome)', 'Clustering of NICU outbreak isolates: a single source vs independent introductions'],
      ['<strong>Human–pet matching</strong>', 'Proof of zoonotic introduction of <em>M. pachydermatis</em> from the dog of a specific staff member — grounds for targeted measures instead of closing the unit'],
      ['<strong>Catheter link</strong>', 'Identity of the blood isolate and the catheter-tip isolate confirms catheter-associated fungaemia']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Malassezia Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>MAL-Species-ID</strong>', 'Species identification from full-length ITS + D1/D2 (all ~18 species of the genus)'],
      ['<strong>MAL-Azole-Res</strong>', 'Prediction of azole resistance from ERG11 mutations and the efflux-pump signature'],
      ['<strong>MAL-Outbreak-Tracer</strong>', 'SNP clustering of outbreak isolates with source estimation (patient/staff/pet)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>; control of low biomass and host DNA admixture'],
      ['<strong>2. Amplicon targeting (ITS/D1D2)</strong>', 'ITS1/ITS2 and D1/D2 LSU primers; full-amplicon read consensus'],
      ['<strong>3. Alignment (Mapping)</strong>', '<code>minimap2</code> — reference panel of the genus <em>Malassezia</em> (<em>M. furfur</em>, <em>M. pachydermatis</em>, <em>M. globosa</em>, <em>M. restricta</em> and others)'],
      ['<strong>4. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — ERG11 and the SNP core for tracing'],
      ['<strong>5. Isolate clustering</strong>', 'SNP matrix, outbreak phylogenetics, matching with veterinary isolates'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>The invisible NICU fungaemia</strong> — <em>Malassezia</em> does not grow in standard blood cultures: without a lipid supplement and without laboratory suspicion the culture is sterile, while the catheterised child on parenteral lipid emulsions keeps receiving the infusate that feeds the fungus. Direct molecular diagnostics from blood removes the dependence on culture and cuts time-to-answer from days to hours.</li>' +
    '<li><strong>Documented zoonotic outbreaks</strong> — carriage of <em>M. pachydermatis</em> by NICU staff from their household dogs has been described repeatedly in the literature; for the first time SNP tracing makes the investigation evidence-based rather than presumptive, allowing the specific source to be eliminated instead of closing the unit.</li>' +
    '<li><strong>One Health and azole selection</strong> — veterinary use of azoles for Malassezia otitis and dermatitis in dogs creates a reservoir of resistant strains in immediate proximity to the most vulnerable patient cohort; monitoring of ERG11/efflux profiles is needed on both sides of the human–animal barrier.</li>' +
    '<li><strong>The skin mycobiome under control</strong> — <em>M. globosa</em> and <em>M. restricta</em> dominate the skin of healthy people, and their imbalance is linked to dandruff, seborrhoeic dermatitis and atopic dermatitis; precise species-level resolution (ITS/D1D2) opens the way to mycobiome studies inaccessible to phenotypic mycology.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Tinea Versicolor (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Overview of Fungal Infections</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Invasive Candidiasis and Neonatal Fungal Infections</a></li></ul>';

  /* ── CRYPTOCOCCUS ── */
  EN['/cryptococcus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cryptococcus.svg" alt="Cryptococcus neoformans — a yeast cell with a huge polysaccharide capsule" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Cryptococcus neoformans / gattii: Species Identification, Molecular Types and Azole Resistance</h1>' +
    '<p style="font-size:1.2em;color:#555">Species differentiation, CNVs and chromosome 1 disomy within hours — something neither CrAg nor culture can deliver</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Cryptococcus neoformans</em> is an encapsulated basidiomycete yeast; <strong>cryptococcal meningitis is the leading cause of adult meningitis</strong> in countries with high HIV prevalence: an estimated <strong>~112,000–152,000 deaths every year</strong>, up to <strong>19% of all HIV-related mortality</strong>. In 2022 the <strong>WHO included Cryptococcus in the fungal priority pathogens list — in the critical group</strong>. The infection is also gaining importance in China — including in patients <strong>without HIV</strong>, which blurs the familiar clinical picture.</p>' +
    '<p>A separate problem is <em>C. gattii</em>: historically a "tropical" species, it infects <strong>immunocompetent</strong> people (the famous Vancouver Island and Pacific Northwest outbreak, with the range expanding together with the climate), causes a more severe course with neuro-obstructions and responds worse to fluconazole. The signature of the genus is the <strong>enormous polysaccharide capsule</strong>: the main virulence factor and at the same time an obstacle to classical PCR DNA extraction (but not to nanopore library preparation).</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>species identification</strong> (<em>neoformans</em> vs <em>gattii</em> — prognostically these are different diseases), determines <strong>molecular types</strong> VNI–VNIV (<em>neoformans</em>) and VGI–VGIV (<em>gattii</em>) and builds an <strong>azole resistance profile</strong> — including <strong>aneuploidies and CNVs</strong> that short reads cannot see.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: pure isolate, CSF. Optimal — <strong>ITS / D1–D2</strong> amplicons on <strong>Flongle</strong> for rapid species identification (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — species, molecular type, fluconazole susceptibility profile (ERG11, AFR1, chromosome 1 disomy), virulence markers; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Typing, Resistance</h2>' +
    '<h3>Species identification and molecular types</h3>' +
    '<p>CrAg (latex / lateral flow) is a fast and cheap screen, but it <strong>does not distinguish species and molecular types</strong> and says nothing about resistance; culture takes days. Molecular diagnostics answers both questions:</p>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ITS</strong> (internal transcribed spacer of rDNA)', 'Species identification: <em>C. neoformans</em> vs <em>C. gattii</em> and differentiation from other yeasts'],
      ['<strong>D1/D2 LSU</strong> (large-subunit rDNA domain)', 'Species confirmation, phylogenetic resolution within the species complex'],
      ['<strong>Molecular types VNI–VNIV</strong>', 'Genotypes of <em>C. neoformans</em>: VNI dominates in the clinic; VNIV — hybrids, rarer'],
      ['<strong>Molecular types VGI–VGIV</strong>', 'Genotypes of <em>C. gattii</em>: VGII — the Pacific Northwest outbreak; the type affects prognosis and the response to fluconazole']
    ]) +
    '<h3>Azole resistance — critical in resource-limited settings</h3>' +
    '<p>Fluconazole is the backbone of therapy where amphotericin B is unavailable (most HIV-endemic regions), so azole resistance directly decides the outcome:</p>' +
    tbl(['Marker', 'Mechanism', 'Clinical Significance'], [
      ['<strong>ERG11</strong>', 'Point mutations in the fluconazole target (lanosterol 14α-demethylase)', 'Classic target-mediated resistance'],
      ['<strong>AFR1</strong>', 'Efflux pump (ABC transporter)', 'Pumping the azole out of the cell'],
      ['<strong>Chromosome 1 disomy</strong>', 'Aneuploidy: <strong>ERG11 and AFR1 lie on the same chromosome</strong> — an extra copy doubles both the target and the pump', 'The main mechanism of <strong>heteroresistance</strong>: a disomic subpopulation survives on fluconazole'],
      ['<strong>CNVs in the ERG11/AFR1 loci</strong>', 'Amplification without point mutations', 'Invisible to SNV-oriented tests; long reads + coverage analysis detect it directly']
    ]) +
    '<p>Heteroresistance via chromosome 1 disomy is the same class of mechanism as <strong>isochromosome 5L in Candida albicans</strong> (see the neighbouring <a href="/albicans/">Candida albicans card</a>): aneuploidies and CNVs are read by nanopore in the same run as SNVs.</p>' +
    '<h3>Virulence factors</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>CAP59 / CAP64</strong>', 'Genes of polysaccharide capsule synthesis — the main virulence factor; acapsular mutants are avirulent'],
      ['<strong>LAC1</strong>', 'Laccase, melanin synthesis — protection from oxidative stress inside macrophages, a virulence marker']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Cryptococcus Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CRY-Species-Typer</strong>', 'Differentiation of <em>C. neoformans</em> / <em>C. gattii</em> and molecular types VNI–VNIV / VGI–VGIV from ITS and D1/D2'],
      ['<strong>CRY-Azole-Profiler</strong>', 'Prediction of fluconazole resistance from ERG11, AFR1 and CNVs'],
      ['<strong>CRY-Heterores-Scanner</strong>', 'Detection of heteroresistant subpopulations: chromosome 1 disomy and aneuploidies from the coverage profile']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>C. neoformans</em> (H99) and <em>C. gattii</em> (WM276) references'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. CNVs and aneuploidies</strong>', '<code>sniffles2</code>, per-chromosome coverage analysis — chr1 disomy, heteroresistant subpopulations at deep coverage'],
      ['<strong>5. Marker detection</strong>', 'In-house database: ITS, D1/D2, ERG11, AFR1, CAP59/CAP64, LAC1, molecular-type markers'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>Critical WHO priority</strong> — cryptococcal meningitis kills 112,000–152,000 people a year and accounts for up to 19% of HIV-related mortality; in 2022 the WHO placed Cryptococcus in the critical group of fungal priority pathogens.</li>' +
    '<li><strong>CrAg is not enough</strong> — the antigen test answers "yes/no" but does not distinguish species and molecular types and is silent on resistance; molecular diagnostics turns screening into prognosis.</li>' +
    '<li><strong>C. gattii is redrawing the map</strong> — infection of immunocompetent hosts with a severe course and a poorer response to fluconazole is expanding its range together with the climate; species differentiation is becoming necessary outside the tropics as well, including a growing number of non-HIV cases in China.</li>' +
    '<li><strong>Heteroresistance is invisible to short reads</strong> — chromosome 1 disomy with ERG11+AFR1 is an aneuploid mechanism reliably seen only by long reads with CNV analysis; the same logic as in <a href="/albicans/">Candida albicans</a>.</li>' +
    '<li><strong>The capsule is no obstacle</strong> — the polysaccharide capsule complicates PCR extraction but not nanopore library preparation; ITS/D1–D2 amplicons on Flongle deliver species identification in a point-of-care scenario.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240060241">WHO — Fungal priority pathogens list (2022)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — C. neoformans and C. gattii Infection</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — PubMed / Bookshelf</a></li></ul>';

  /* ── PNEUMOCOCCUS (S. pneumoniae) ── */
  EN['/pneumoniae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pneumoniae.svg" alt="Streptococcus pneumoniae — lancet-shaped diplococci" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Serotyping and Penicillin Resistance of Streptococcus pneumoniae</h1>' +
    '<p style="font-size:1.2em;color:#555">Mosaic pbp genes, capsular serotype and AMR profile — long reads see what the phenotype cannot predict</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Streptococcus pneumoniae</em> (pneumococcus) is a Gram-positive <strong>lancet-shaped diplococcus</strong> with <strong>α-haemolysis</strong> on blood agar and a prominent polysaccharide capsule. It is the leading cause of <strong>community-acquired pneumonia</strong>, bacterial <strong>meningitis</strong> and <strong>acute otitis media in children</strong>, as well as sinusitis and bacteraemia in the elderly. Airborne transmission and nasopharyngeal carriage (up to 20–40% of healthy children) make the pneumococcus a permanent resident of the population — and a permanent source of invasive infections.</p>' +
    '<p>The key genomic theme of the pneumococcus is <strong>penicillin resistance through mosaic pbp2x, pbp2b and pbp1a genes</strong>. The pneumococcus is naturally competent: it takes up DNA from commensal streptococci of the mitis group (<em>S. mitis</em>, <em>S. oralis</em>) and integrates their fragments into its own penicillin-binding protein genes. The resulting <strong>mosaic PBPs</strong> have reduced affinity for β-lactams, with MIC rising stepwise as foreign blocks accumulate. Phenotypic testing cannot predict such a mosaic — whereas <strong>sequencing sees it directly</strong>, block by block.</p>' +
    '<p>The second theme is <strong>serotyping from the capsular cps locus</strong>: <strong>more than 90 serotypes</strong> are known, and the capsule is precisely the target of conjugate vaccines. After the introduction of PCV13 the population structure shifted: <strong>non-vaccine serotypes (19A, 22F, 33F, 8 and others)</strong> are on the rise — a classic vaccine escape that requires continuous genomic surveillance. WGS serotyping (the SeroBA approach) is more accurate than the Quellung reaction and requires no panel of antisera.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: sputum, CSF, blood, nasopharyngeal swab. The mosaic pbp genes of <strong>2–3 kb</strong> and the capsular locus of <strong>~10–20 kb</strong> fit entirely within long nanopore reads — an ideal scenario for a <strong>MinION with Flongle</strong> in point-of-care format (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — species identification, capsular serotype, susceptibility profile (β-lactams, macrolides, fluoroquinolones) with interpretation of mosaic pbp; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Resistance, Serotype</h2>' +
    '<h3>Species identification</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>lytA</strong> (autolysin)', 'Gold standard of pneumococcal species identification'],
      ['<strong>cpsA</strong> (wzg)', 'Conserved gene of the capsular locus; species confirmation and entry point for serotyping'],
      ['<strong>16S rRNA</strong>', 'Differentiation from commensal streptococci of the mitis group (<em>S. mitis</em>, <em>S. oralis</em>, <em>S. pseudopneumoniae</em>)']
    ]) +
    '<h3>β-lactams: mosaic PBP genes</h3>' +
    '<p>Penicillin resistance in the pneumococcus is neither a point mutation nor a plasmid, but a <strong>mosaic of foreign fragments</strong> assembled by recombination with commensal streptococci. Long ONT reads span such genes end to end, without breaking the mosaic into short fragments.</p>' +
    tbl(['Gene', 'Target', 'Clinical Significance'], [
      ['<strong>pbp2x</strong>', 'PBP2x', 'Primary determinant of resistance to penicillin and third-generation cephalosporins'],
      ['<strong>pbp2b</strong>', 'PBP2b', 'Second key determinant; mosaic pbp2x + pbp2b is the minimum for clinical penicillin resistance'],
      ['<strong>pbp1a</strong>', 'PBP1a', 'Raises MIC to high levels, including ceftriaxone resistance in meningitis']
    ]) +
    '<h3>Macrolides and fluoroquinolones</h3>' +
    tbl(['Marker', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>ermB</strong>', 'Macrolides (MLSB)', 'Methylation of 23S rRNA — high-level resistance to azithromycin and clarithromycin'],
      ['<strong>mefA</strong>', 'Macrolides', 'Efflux pump; moderate resistance, often carried on the Tn1207.3 element'],
      ['<strong>gyrA / parC</strong>', 'Fluoroquinolones', 'QRDR point mutations (Ser81, Asp83 and others) — resistance to levofloxacin and moxifloxacin']
    ]) +
    '<h3>Capsular locus and serotypes</h3>' +
    tbl(['Element', 'Significance'], [
      ['<strong>cps locus (~10–20 kb)</strong>', 'Complete biosynthetic pathway of the capsular polysaccharide; the locus structure defines the serotype (SeroBA approach)'],
      ['<strong>PCV13 vaccine serotypes</strong>', '1, 3, 4, 5, 6A, 6B, 7F, 9V, 14, 18C, 19F, 23F — monitoring their share after vaccination'],
      ['<strong>Non-vaccine ("escape") serotypes</strong>', '<strong>19A, 22F, 33F, 8</strong>, 15A, 35B and others — rising after PCV13 introduction; require surveillance and revision of vaccine panels']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Pneumoniae Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>SPN-PBP-Mosaic</strong>', 'Reconstruction of the mosaic structure of pbp2x/pbp2b/pbp1a and prediction of penicillin and ceftriaxone MIC'],
      ['<strong>SPN-SeroTyper</strong>', 'WGS serotyping from the cps locus (SeroBA approach) with detection of non-vaccine serotypes'],
      ['<strong>SPN-Res-Detector</strong>', 'Prediction of the complete AMR profile (β-lactams, macrolides, fluoroquinolones) from genomic data']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — pneumococcal and mitis-group streptococci references'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. AMR gene and pbp mosaic detection</strong>', 'Custom database of pbp alleles and resistance genes, compatible with CARD/ResFinder'],
      ['<strong>5. Serotyping from the cps locus</strong>', 'Capsular locus database (SeroBA approach), long-read assembly of the locus'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Disease burden</strong> — the pneumococcus remains the leading bacterial cause of mortality from lower respiratory tract infections: by WHO estimates, hundreds of thousands of deaths annually, predominantly children under 5 and the elderly. Meningitis and bacteraemia demand immediately adequate therapy.</li>' +
    '<li><strong>A mosaic instead of a mutation</strong> — pneumococcal penicillin resistance evolves through horizontal transfer from commensal streptococci. Phenotypic microbiology sees only the resulting MIC; sequencing reveals the pbp mosaic itself and makes it possible to predict it before the culture result — critical in meningitis, where hours count.</li>' +
    '<li><strong>Vaccine escape</strong> — conjugate vaccines sharply reduced the incidence of vaccine serotypes, but the niche was taken over by non-vaccine ones (19A, 22F, 33F, 8). Genomic serotype surveillance is a mandatory component of modern pneumococcal epidemiology and the basis for updating vaccine panels (PCV15/PCV20).</li>' +
    '<li><strong>Long reads solve the problem</strong> — mosaic pbp (2–3 kb) and the capsular locus (10–20 kb) are spanned by nanopore reads in full, without assembly gaps; the compact MinION + Flongle combination makes such analysis available in Edge format next to the clinical laboratory.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Streptococcus pneumoniae (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Pneumococcal Disease</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Pneumococcal vaccines</a></li>' +
    '<li>📄 <a href="https://www.microbiologyresearch.org/">SeroBA: rapid serotyping of Streptococcus pneumoniae from WGS (Microbial Genomics)</a></li></ul>';

  /* ── GAS (S. pyogenes) ── */
  EN['/pyogenes/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pyogenes.svg" alt="Streptococcus pyogenes — chains of cocci" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>emm Typing and Antimicrobial Resistance of Streptococcus pyogenes</h1>' +
    '<p style="font-size:1.2em;color:#555">emm type, superantigen toxins and macrolide resistance — in hours, when invasive GAS is suspected</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Streptococcus pyogenes</em> (group A β-haemolytic streptococcus, <strong>GAS</strong>) is a Gram-positive coccus forming chains (hence "strepto-") and one of the most strictly human-adapted pathogens: it colonises and infects humans only. The spectrum of disease is unusually wide: from <strong>streptococcal pharyngitis, scarlet fever and erysipelas</strong> to <strong>invasive forms</strong> — necrotising fasciitis and streptococcal toxic shock syndrome (STSS) with a case fatality of <strong>30–70%</strong>. A separate cluster is the <strong>non-suppurative sequelae</strong>: rheumatic fever and post-streptococcal glomerulonephritis, which define the long-term burden on cardiology and nephrology.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>emm typing</strong> (from the 5\'-end of the <em>emm</em> gene encoding the M protein) — the gold standard of GAS epidemiology with <strong>250+ known types</strong>; determines the <strong>superantigen toxin profile</strong> (speA, speC, ssa) and <strong>macrolide resistance genes</strong> (ermB, mefA). Sequencing replaces Sanger in emm typing and simultaneously answers virulence and susceptibility — from a single run.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: throat swab, wound discharge, aspirate from the lesion, blood. The genome is small (~1.9 Mb): an amplicon emm assay on <strong>Flongle</strong> is optimal for the point-of-care scenario (Edge); whole genome — for invasive forms.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — emm type, toxin profile (STSS risk), macrolide resistance markers with an empirical therapy recommendation; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: emm Typing, Toxins, Resistance</h2>' +
    '<h3>emm typing and epidemiology</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>emm</strong> (5\'-end, hypervariable region of the M protein)', 'Gold standard of GAS typing: 250+ types; an ONT amplicon fully replaces Sanger, including mixed reads difficult for Sanger'],
      ['<strong>emm1 / M1global clone</strong>', 'Dominant clone of invasive infections: global surge of STSS and necrotising fasciitis outbreaks with increased virulence (high speA expression)'],
      ['<strong>emm12</strong>', 'The main type in scarlet fever outbreaks in China and East Asia'],
      ['<strong>hasA</strong> (hyaluronic acid capsule operon)', 'The capsule is a virulence factor; mucoid strains are associated with rheumatic fever and invasive forms'],
      ['<strong>16S rRNA</strong>', 'Differentiation from <em>S. dysgalactiae</em>, <em>S. agalactiae</em> and other β-haemolytic streptococci']
    ]) +
    '<h3>Superantigen toxins</h3>' +
    '<p>Superantigens non-specifically activate up to 20% of T lymphocytes → cytokine storm and STSS. Their profile determines the risk of a severe course and helps investigate clonal outbreaks:</p>' +
    tbl(['Gene', 'Toxin', 'Significance'], [
      ['<strong>speA</strong>', 'Pyrogenic exotoxin A', 'Key marker of the M1global clone (emm1) and severe STSS'],
      ['<strong>speC</strong>', 'Pyrogenic exotoxin C', 'Classic toxin associated with STSS and scarlet fever'],
      ['<strong>ssa</strong>', 'Streptococcal superantigen SSA', 'Marker of invasive strains, a frequent companion of speA/speC in outbreaks']
    ]) +
    '<h3>Resistance genes</h3>' +
    '<p>A unique fact: <strong>penicillin remains universally active</strong> — not a single penicillin-resistant GAS strain has ever been described. But macrolides — the second line in β-lactam allergy — are losing efficacy: <strong>in China GAS resistance to erythromycin exceeds 90%</strong>, which makes genomic control of ermB/mefA clinically mandatory.</p>' +
    tbl(['Gene', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>ermB</strong>', 'Macrolides + lincosamides (MLSB phenotype, constitutive)', 'Resistance to erythromycin, azithromycin and <strong>clindamycin</strong> — dominant in China'],
      ['<strong>mefA</strong>', 'Macrolides (M phenotype, efflux)', 'Resistance to 14- and 15-membered macrolides; clindamycin retains activity']
    ]) +
    '<h3>Empirical therapy in the report</h3>' +
    tbl(['Clinical Form', 'Approach', 'Role of Genomics'], [
      ['<strong>Pharyngitis / scarlet fever</strong>', 'Penicillin (amoxicillin) — 10 days; in allergy — a macrolide', 'ermB/mefA profile → choice of a working macrolide or a cephalosporin'],
      ['<strong>Invasive GAS (fasciitis, STSS)</strong>', 'Emergency surgical debridement + penicillin G + <strong>clindamycin</strong> (suppresses toxin synthesis)', 'Rapid confirmation of GAS and the speA/speC/ssa profile; ermB rules out clindamycin'],
      ['<strong>Carriage / surveillance</strong>', 'Eradication in outbreaks in closed communities', 'emm typing to confirm a clonal link between cases']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Pyogenes Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>SPY-Emm-Typer</strong>', 'emm typing from the amplicon of the 5\'-end of the emm gene, including novel variants'],
      ['<strong>SPY-Res-Detector</strong>', 'Prediction of macrolide resistance (ermB/mefA and point mutations in 23S/L4/L22)'],
      ['<strong>SPY-Invasive-Risk</strong>', 'Assessment of invasive-course risk from the superantigen and capsule profile']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — reference panel of β-haemolytic streptococci (<em>S. pyogenes</em>, <em>S. dysgalactiae</em>, <em>S. agalactiae</em>)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. emm typing and toxin/AMR detection</strong>', 'CDC Blast-type emm database, custom superantigen and resistance gene database, compatible with CARD/ResFinder'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>The return of scarlet fever</strong> — after decades of decline GAS is experiencing a global surge: record scarlet fever incidence in the United Kingdom and East Asia, growing invasive infections of the M1global clone in Europe and Australia. Epidemiological surveillance requires mass emm typing, and Sanger has become the bottleneck.</li>' +
    '<li><strong>China: macrolides do not work</strong> — GAS resistance to erythromycin in China exceeds 90% (predominantly ermB, MLSB phenotype): empirical macrolide prescribing in penicillin allergy there is virtually meaningless without genomic verification. A rapid emm+AMR answer is critical precisely for this region.</li>' +
    '<li><strong>Speed in invasive forms</strong> — necrotising fasciitis and STSS require emergency surgery and correct antibiotic therapy within the first hours; confirmation of GAS and the superantigen profile on an Edge unit cuts the time to answer from days to hours.</li>' +
    '<li><strong>Rheumatic fever</strong> — in low- and middle-income countries rheumatic heart disease remains the leading cause of acquired heart defects in children; complete eradication of GAS in pharyngitis (confirmed susceptibility, emm surveillance) is the foundation of prevention.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Group A Streptococcal Infections (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Group A Strep: emm Typing and Surveillance</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Scarlet Fever and Invasive GAS Updates</a></li></ul>';

  /* ── GBS (S. agalactiae) ── */
  EN['/agalactiae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_agalactiae.svg" alt="Streptococcus agalactiae — paired cocci and short chains" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Serotyping and Resistance of Streptococcus agalactiae (GBS)</h1>' +
    '<p style="font-size:1.2em;color:#555">Group B streptococcus: serotype, CC17 clone and resistance markers — in hours, in the delivery room</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Streptococcus agalactiae</em> is a Gram-positive group B coccus (GBS) that harmlessly colonises the gastrointestinal and urogenital tract of <strong>10–30% of pregnant women</strong>, yet remains the <strong>leading cause of neonatal sepsis and meningitis</strong>. Two clinical forms are distinguished: <strong>early-onset disease (up to 7 days of life)</strong> — vertical transmission during delivery from a colonised mother, and <strong>late-onset (up to 3 months)</strong> — with a predominance of meningitis. Without intrapartum prophylaxis up to half of infected newborns fall ill; with prophylaxis the risk drops dozens-fold. The standard is screening of pregnant women at <strong>35–37 weeks</strong> by swab culture: if colonisation is detected, intrapartum prophylaxis with <strong>penicillin</strong> is prescribed. The problem is that culture takes <strong>18–48 hours</strong> and offers nothing to a woman admitted in labour without screening — that is exactly where a rapid molecular answer is needed.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>species identification</strong> (cfb — CAMP factor), <strong>capsular serotyping</strong> (Ia, Ib, II–IX from cps genes), detection of the <strong>hypervirulent clone CC17 (ST-17)</strong> — the main culprit of neonatal invasive forms, and determination of <strong>resistance markers</strong> — critical for pregnant women with penicillin allergy. The small genome (~<strong>2.2 Mb</strong>) is ideal for a rapid run on <strong>Flongle</strong> right in the delivery unit.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: vaginal-rectal swab, neonatal CSF/blood. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the point-of-care scenario in the labour ward (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the obstetrician/neonatologist — GBS species identification, capsular serotype, clonal affiliation (CC17), susceptibility profile with a recommendation in case of penicillin allergy; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, Serotypes, Resistance</h2>' +
    '<h3>Species identification and virulence</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>cfb</strong> (CAMP factor)', 'Classic species-specific marker of <em>S. agalactiae</em> — the basis of species confirmation'],
      ['<strong>scpB</strong> (C5a peptidase)', 'Virulence factor (complement degradation); auxiliary species identification'],
      ['<strong>16S rRNA</strong>', 'Differentiation from <em>S. pyogenes</em>, <em>S. dysgalactiae</em> and enterococci in the swab']
    ]) +
    '<h3>Capsular serotypes and clonality</h3>' +
    '<p>The capsule is the main virulence factor of GBS; serotypes <strong>Ia, Ib, II–IX</strong> are known. Serotype distribution determines clinical risk and the landscape of future vaccines.</p>' +
    tbl(['Serotype / Clone', 'Clinical Significance'], [
      ['<strong>Serotype III</strong>', 'Dominates in <strong>neonatal meningitis</strong> and late-onset infections; priority vaccine target'],
      ['<strong>CC17 (ST-17)</strong>', '<strong>Hypervirulent clone</strong> — prevails in neonatal invasive forms; detection raises clinical vigilance'],
      ['<strong>Ia, Ib, II, III, V</strong>', 'Cover most invasive isolates from mothers and newborns']
    ]) +
    '<h3>Resistance genes</h3>' +
    '<p><strong>Penicillin remains the drug of choice</strong> — there is no universal resistance to it in GBS. But in penicillin allergy the alternative is <strong>clindamycin</strong>, and resistance to it and to erythromycin is steadily rising — so rapid marker determination in allergy becomes clinically significant.</p>' +
    tbl(['Gene', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>ermB</strong>', 'Macrolides, <strong>clindamycin</strong> (MLSB, constitutive)', 'Main mechanism of resistance to clindamycin — the reserve drug in allergy'],
      ['<strong>mefA / mefE</strong>', 'Macrolides (efflux, M phenotype)', 'Erythromycin resistance without affecting clindamycin — distinguished in the report'],
      ['<strong>lsaB</strong>', 'Lincosamides, streptogramins A, pleuromutilins', 'Emerging mechanism of clindamycin resistance'],
      ['<strong>lnuB</strong>', 'Lincosamides (inactivating nucleotidyltransferase)', 'Additional marker of clindamycin resistance'],
      ['<strong>pbp2x</strong> (penicillin-binding protein)', 'β-lactams', 'Rare mutations with reduced penicillin susceptibility — monitoring']
    ]) +
    '<h3>Intrapartum tactics in the report</h3>' +
    tbl(['Scenario', 'Approach', 'Role of Genomics'], [
      ['<strong>Screening at 35–37 weeks (routine)</strong>', 'Culture; in colonisation — intrapartum penicillin', 'Confirmation of cfb-positive GBS, serotype for surveillance'],
      ['<strong>Admission in labour without screening</strong>', 'Empirical decision based on risk factors', 'PCR/sequencing in hours instead of 18–48 h of culture → justified prophylaxis'],
      ['<strong>Penicillin allergy</strong>', 'Clindamycin if susceptibility is confirmed', 'ermB/mefE/mefA/lsaB/lnuB profile → choice between clindamycin and vancomycin']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Agalactiae Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>GBS-Sero-Typer</strong>', 'Capsular serotyping (Ia, Ib, II–IX) from cps genes'],
      ['<strong>GBS-CC17-Detector</strong>', 'Detection of the hypervirulent clone CC17 (ST-17)'],
      ['<strong>GBS-Res-Predictor</strong>', 'Prediction of macrolide and clindamycin resistance from genomic data']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>S. agalactiae</em> reference (~2.2 Mb) and a panel of related streptococci'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — including <strong>pbp2x</strong> mutations'],
      ['<strong>4. Serotyping and AMR detection</strong>', 'Custom database of cps genes and resistance markers, compatible with CARD/ResFinder'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Neonatal burden</strong> — GBS remains the leading cause of neonatal sepsis and meningitis: hundreds of thousands of invasive infections annually by WHO estimates, including early-onset (vertical transmission during delivery) and late-onset forms with a high share of neurological sequelae.</li>' +
    '<li><strong>The blind spot of screening</strong> — culture takes 18–48 hours, and a woman admitted in labour without screening receives prophylaxis "blindly" based on risk factors; point-of-care sequencing on an Edge unit in the delivery unit gives an answer in hours — before active labour begins.</li>' +
    '<li><strong>Growing resistance in allergy</strong> — penicillin holds its ground, but resistance to clindamycin and erythromycin (ermB, mefA/E, lsaB, lnuB) is rising worldwide; in penicillin allergy the genomic marker profile directly determines the drug choice.</li>' +
    '<li><strong>The vaccine era</strong> — hexavalent conjugate vaccines against GBS are in clinical trials; serotype surveillance (the share of serotype III, the CC17 clone) will become the basis for assessing their effectiveness.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Group B Streptococcal Infections (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/group-b-strep/">CDC — Group B Strep: Clinical Guidance</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Group B Streptococcus Vaccine Development</a></li></ul>';

  /* ── VRE (E. faecium) ── */
  EN['/faecium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_faecium.svg" alt="Enterococcus faecium — pairs and short chains of cocci" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Enterococcus faecium (VRE): Vancomycin Resistance and Hospital Epidemiology</h1>' +
    '<p style="font-size:1.2em;color:#555">vanA/vanB genotype, AMR profile and WGS outbreak tracing in the ICU — in hours, when isolation decides everything</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Enterococcus faecium</em> is a Gram-positive coccus (pairs and short chains) and an <strong>ESKAPE pathogen</strong>, one of the main agents of hospital-acquired infections in the ICU: <strong>bacteraemia, urinary tract infections, intra-abdominal infections</strong>. It becomes especially severe in immunosuppressed patients — in <strong>haemato-oncology and transplantology</strong> vancomycin-resistant (VRE) bacteraemia carries high mortality, and the therapeutic arsenal is running out: the hospital clone <strong>CC17</strong> is already resistant to ampicillin (<em>pbp5</em>) and high-level aminoglycosides (<em>aac(6\')-aph(2\'\')</em>), and resistance to the reserve drugs — <strong>linezolid and daptomycin</strong> — is rising (<em>cfr</em>, <em>optrA</em>).</p>' +
    '<p>The key to therapy and epidemiology is the <strong>vanA/vanB clusters</strong> on plasmids and transposons (Tn1546): <strong>vanA</strong> confers high-level resistance to both vancomycin and teicoplanin, while <strong>vanB</strong> confers variable resistance under which teicoplanin may remain active. Therefore <strong>the genotype matters more than the phenotype</strong> for regimen selection. From nanopore sequencing data our pipeline determines the van genotype, the AMR profile, clonal affiliation and — during outbreaks — WGS tracing of transmission (cgMLST / core-genome SNP), turning rectal screening into a manageable infection-control tool.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: rectal swabs (carriage screening), blood culture, urine, intra-abdominal discharge. Optimal: screening sequencing of the vanA/vanB amplicon on <strong>Flongle</strong> for an answer in hours (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the intensivist/epidemiologist — species identification (<em>ddl</em>), van genotype with interpretation for therapy, AMR profile and, in an outbreak, cluster analysis of isolates; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification, van Clusters, Resistance</h2>' +
    '<h3>Species identification</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>ddl</strong> (D-Ala-D-Ala ligase)', 'Species-specific identification of <em>E. faecium</em>, differentiation from <em>E. faecalis</em> — different resistance spectra and treatment tactics'],
      ['<strong>16S rRNA</strong>', 'Genus-level identification, differentiation from other cocci']
    ]) +
    '<h3>Vancomycin resistance clusters (VRE)</h3>' +
    tbl(['Genotype', 'Location', 'Clinical Significance'], [
      ['<strong>vanA</strong>', 'Transposon <strong>Tn1546</strong> (~10 kb), plasmids', 'High-level resistance to <strong>vancomycin AND teicoplanin</strong>; the most frequent genotype in hospital outbreaks'],
      ['<strong>vanB</strong>', 'Chromosome/plasmids (Tn1549/Tn5382)', 'Variable resistance to vancomycin; <strong>teicoplanin may remain active</strong> — the genotype directly changes the regimen']
    ]) +
    '<h3>Hospital adaptation of CC17 and reserve drugs</h3>' +
    tbl(['Gene', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>pbp5</strong> (mutations)', 'β-lactams (<strong>ampicillin</strong>)', 'Ampicillin resistance — the hallmark of the hospital clone CC17'],
      ['<strong>aac(6\')-aph(2\'\')</strong>', 'Aminoglycosides', 'High-level resistance — rules out synergy with β-lactams in endocarditis'],
      ['<strong>cfr / optrA</strong>', '<strong>Linezolid</strong>', 'Growing resistance to the reserve drug in VRE bacteraemia'],
      ['<strong>Mutations in liaFSR</strong>', '<strong>Daptomycin</strong>', 'Reduced susceptibility to the last reserve']
    ]) +
    '<h3>Epidemiology and WGS tracing</h3>' +
    tbl(['Task', 'Approach', 'Role of the Pipeline'], [
      ['<strong>ICU outbreak</strong>', 'WGS tracing of transmission: cgMLST / core-genome SNP', 'Proof of clonal spread vs independent introductions — in hours, not weeks'],
      ['<strong>Carriage screening</strong>', 'Rectal swabs, vanA/vanB amplicon sequencing on <strong>Flongle</strong>', 'Answer in hours versus days in a send-out PCR laboratory — isolation of the carrier before transmission'],
      ['<strong>Epidemiological risk</strong>', 'Long reads resolve the <strong>plasmid context of vanA</strong> (~10 kb on Tn1546): copy number, mobility', 'Assessment of the horizontal-transfer potential of the cluster — inaccessible to short reads']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Faecium Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>EFM-Van-Typer</strong>', 'vanA/vanB genotyping with interpretation for therapy (teicoplanin in vanB)'],
      ['<strong>EFM-Res-Detector</strong>', 'Prediction of the complete AMR profile, including linezolid (cfr/optrA) and daptomycin'],
      ['<strong>EFM-Outbreak-Tracer</strong>', 'Cluster analysis of isolates (cgMLST/SNP) for outbreak tracing in the ICU']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>E. faecium</em> (CC17) references and an enterococci panel'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — pbp5 and liaFSR mutations'],
      ['<strong>4. van cluster and AMR gene detection</strong>', 'Custom vanA/vanB (Tn1546) and resistance database, compatible with CARD/ResFinder'],
      ['<strong>5. Assembly and plasmid context</strong>', '<code>flye</code> — resolution of Tn1546 ~10 kb: copy number, mobility'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>ESKAPE and the ICU</strong> — VRE bacteraemia in intensive care, haemato-oncology and transplantology has high mortality; every delay of correct therapy worsens the outcome. A vanA/vanB genotype in hours allows choosing teicoplanin immediately in vanB, without losing days on the phenotype.</li>' +
    '<li><strong>A vanishing arsenal</strong> — hospital CC17 is already resistant to ampicillin and aminoglycosides; resistance to linezolid (cfr, optrA) and daptomycin is spreading. Without genomic control, empirical regimens go blind.</li>' +
    '<li><strong>Outbreaks are settled by speed</strong> — rectal swab screening with vanA/vanB sequencing on Flongle gives an answer in hours versus days in a send-out PCR laboratory; WGS tracing proves transmission routes and stops an outbreak instead of merely recording it.</li>' +
    '<li><strong>The unique advantage of long reads</strong> — the ~10 kb vanA cluster on transposon Tn1546 migrates between plasmids and the chromosome; only long ONT reads resolve the plasmid context (copy number, mobility), which is critical for forecasting epidemiological risk.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Vancomycin-Resistant Enterococcus (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Bacterial Priority Pathogens List (ESKAPE)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — VRE in Healthcare Settings</a></li></ul>';

  /* ── HAEMOPHILUS INFLUENZAE (BLNAR) ── */
  EN['/haemophilus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_haemophilus.svg" alt="Haemophilus influenzae — pleomorphic coccobacilli" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Haemophilus influenzae: BLNAR, Serotype and Species Identification</h1>' +
    '<p style="font-size:1.2em;color:#555">ftsI sequencing sees the resistance that a β-lactamase PCR misses — in hours, on a small genome</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Haemophilus influenzae</em> (Pfeiffer\'s bacillus) is a small Gram-negative <strong>pleomorphic coccobacillus</strong>, a commensal of the nasopharynx and a causative agent of otitis, sinusitis, <strong>COPD exacerbations</strong> (the second most frequent bacterial pathogen after the pneumococcus) and pneumonia; in unvaccinated children — epiglottitis and meningitis (historically the capsular type b, Hib). Culture-based diagnostics is slow and demanding: the bacterium is fastidious, grows only on <strong>chocolate agar</strong> and requires growth factors <strong>X (haemin) and V (NAD)</strong>. Genomics bypasses this problem: the answer does not depend on whether the culture grows.</p>' +
    '<p>From nanopore sequencing data our pipeline determines the <strong>AMR profile with mandatory analysis of ftsI mutations</strong> (the key point — below), the <strong>serotype (a–f or non-typeable NTHi)</strong> from the capsular locus and <strong>species identification</strong> with differentiation from the non-pathogenic look-alike <em>H. haemolyticus</em>. The genome is small (<strong>~1.8 Mb</strong>), and the key targets — the ftsI + blaTEM amplicon and the capsular locus — deliver an answer <strong>within hours</strong> in a hospital or an outpatient clinic on an Edge unit with Flongle.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: sputum, nasopharyngeal swab, middle-ear exudate, CSF, blood. Optimal — rapid library preparation and a run on <strong>Flongle</strong> for the point-of-care scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the paediatrician/pulmonologist — species identification, serotype, AMR profile (including BLNAR status) with an empirical regimen recommendation; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Resistance, Serotype, Identification</h2>' +
    '<h3>Core: mechanisms of β-lactam resistance</h3>' +
    '<p>The main clinical question in <em>H. influenzae</em> is susceptibility to aminopenicillins and cephalosporins. There are two mechanisms, and both must be seen:</p>' +
    tbl(['Marker', 'Mechanism', 'Clinical Significance'], [
      ['<strong>blaTEM-1</strong>', 'β-lactamase (plasmid-borne)', 'Resistance to ampicillin/amoxicillin; overcome by inhibitors (clavulanate)'],
      ['<strong>blaROB-1</strong>', 'β-lactamase (rarer)', 'Resistance to ampicillin; often combined resistance'],
      ['<strong>ftsI</strong> (PBP3)', 'Mutations in the penicillin-binding protein 3 gene', '<strong>BLNAR — β-lactamase-negative ampicillin resistance</strong>']
    ]) +
    '<p><strong>BLNAR is the main trap of routine diagnostics.</strong> The strain produces no β-lactamase, but mutations in <strong>ftsI</strong> (the classic substitutions N526K, S385T, R517H and others) reduce the affinity of PBP3 for all aminopenicillins and some cephalosporins. A β-lactamase PCR will call such a strain "susceptible", while the patient will not respond to amoxicillin — only <strong>ftsI sequencing</strong> sees the truth. The proportion of BLNAR is growing worldwide, and the world\'s highest is in <strong>East Asia (Japan, Korea, China)</strong>, where BLNAR and BLPACR (β-lactamase-positive strains with ftsI mutations) account for <strong>tens of percent of clinical isolates</strong>; the share of low-BLNAR (borderline susceptibility) is growing as well.</p>' +
    '<h3>Resistance genes: other classes</h3>' +
    tbl(['Marker', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>gyrA / parC</strong>', 'Fluoroquinolones', 'QRDR mutations → resistance to levofloxacin/moxifloxacin (a reserve option in BLNAR and COPD)']
    ]) +
    '<h3>Serotyping and the capsular locus</h3>' +
    '<p>After Hib vaccination the epidemiology shifted: invasive forms are increasingly caused by <strong>non-typeable strains (NTHi)</strong> and <strong>non-b serotypes</strong> — in particular, <strong>Hia</strong> causes outbreaks of severe invasive infections in Indigenous populations of North America. Genomic serotyping from the capsular locus is <strong>more accurate than serum agglutination</strong> (which produces cross-reactions and errors).</p>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>bexA</strong>', 'Marker of capsule presence as such (capsular polysaccharide export); bexA-negative → NTHi'],
      ['<strong>Capsular locus (regions I–III)</strong>', 'Serotype a–f from the serotype-specific genes of region II']
    ]) +
    '<h3>Species identification: separating from H. haemolyticus</h3>' +
    '<p><em>Haemophilus haemolyticus</em> is a <strong>non-pathogenic commensal look-alike</strong>, phenotypically almost indistinguishable from NTHi (up to MALDI-TOF errors). Misidentification distorts epidemiology and prescribing. Molecular identification resolves this at once:</p>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>iga</strong> (IgA1 protease)', 'Present in <em>H. influenzae</em>, absent in <em>H. haemolyticus</em>'],
      ['<strong>lgtC</strong> (lipooligosaccharide glycosyltransferase)', 'Complementary marker: often absent in <em>H. influenzae</em>, present in <em>H. haemolyticus</em>'],
      ['Composite iga/lgtC profile + MLST loci', 'Definitive species verification from sequence data']
    ]) +
    '<h3>Empirical therapy in the report</h3>' +
    tbl(['Clinical Form', 'Approach', 'Role of Genomics'], [
      ['<strong>COPD exacerbation / pneumonia</strong>', 'Amoxicillin-clavulanate or a cephalosporin', 'ftsI status is critical: BLNAR → an aminopenicillin will fail even with an inhibitor'],
      ['<strong>Otitis, sinusitis</strong>', 'Amoxicillin (first line)', 'blaTEM-1 + ftsI profile → choice between clavulanate and switching class'],
      ['<strong>Invasive infection (epiglottitis, meningitis, sepsis)</strong>', 'Empirical ceftriaxone', 'Serotype (Hib? Hia? NTHi?) + AMR → regimen adjustment and epidemiological assessment']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Haemophilus Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>HI-BLNAR-Detector</strong>', 'Classification of BLNAR / low-BLNAR / susceptible from the ftsI mutation profile'],
      ['<strong>HI-Sero-Typer</strong>', 'Serotyping a–f / NTHi from the capsular locus and bexA'],
      ['<strong>HI-Species-ID</strong>', 'Differentiation of <em>H. influenzae</em> from <em>H. haemolyticus</em> by composite markers (iga, lgtC)']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — reference panel (<em>H. influenzae</em> Rd KW20, 86-028NP, <em>H. haemolyticus</em>)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — ftsI, gyrA/parC mutations'],
      ['<strong>4. AMR and serotype gene detection</strong>', 'Custom database (blaTEM-1/blaROB-1, capsular locus a–f, bexA, iga, lgtC), compatible with CARD/ResFinder'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>The BLNAR trap is scaling up</strong> — the proportion of BLNAR strains is growing worldwide, and in East Asia (Japan, Korea, China) reaches tens of percent of clinical isolates; low-BLNAR is growing as well. A β-lactamase test "does not see" such a strain, and phenotypic susceptibility testing requires growing a capricious culture — only ftsI sequencing gives the right answer immediately.</li>' +
    '<li><strong>COPD is everyday work</strong> — <em>H. influenzae</em> is the second most frequent bacterial cause of COPD exacerbations and a common cause of community-acquired pneumonia; a wrong empirical regimen in a COPD patient means hospitalisation. An answer within hours on an Edge unit in the outpatient clinic changes tactics the same day.</li>' +
    '<li><strong>Post-Hib epidemiology</strong> — the Hib vaccine (one of the most successful in history) shifted invasive infections towards NTHi and non-b serotypes; Hia outbreaks in Indigenous populations of North America show that serotyping remains clinically and epidemiologically significant — and genomic serotyping is more reliable than agglutination.</li>' +
    '<li><strong>Fastidiousness as an argument for sequencing</strong> — culturing <em>H. influenzae</em> (chocolate agar, X and V factors, CO₂ incubation) is slow and often fails after the first antibiotic dose. The small genome (~1.8 Mb) makes direct sequencing from clinical material practical even on Flongle.</li>' +
    '<li><strong>The H. haemolyticus look-alike</strong> — without molecular verification the share of "NTHi" in swabs is overestimated; composite markers (iga/lgtC) in the pipeline close this question automatically.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Haemophilus influenzae (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Haemophilus influenzae Infections</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Haemophilus influenzae Disease (Hib)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Haemophilus influenzae type b (Hib)</a></li></ul>';

  /* ── CYTOMEGALOVIRUS (CMV) ── */
  EN['/cmv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cmv.svg" alt="Cytomegalovirus — an enveloped herpesvirus" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Resistance Genotyping of Cytomegalovirus (CMV/HHV-5) in Transplantation</h1>' +
    '<p style="font-size:1.2em;color:#555">UL97, UL54, UL56 — the answer to the cause of refractory CMV in hours, not in weeks of a reference laboratory</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Cytomegalovirus (CMV, HHV-5) is a β-herpesvirus with a <strong>seroprevalence of 60–90% in the adult population</strong>. In an immunocompetent host it lies dormant in monocytes; after <strong>solid-organ or bone marrow transplantation</strong> it becomes the leading viral pathogen: CMV viraemia, pneumonitis, colitis, retinitis, oesophagitis. Beyond direct organ damage, CMV carries <strong>indirect effects</strong>: it increases the risk of graft rejection and opens the door to fungal and bacterial superinfections — which is exactly why the virus is managed prophylactically (valganciclovir, letermovir) and the viral load is monitored.</p>' +
    '<p>The classic clinical trap is <strong>refractory CMV</strong>: the load does not fall on ganciclovir/valganciclovir for weeks. There are only two causes — insufficient immunity or a <strong>resistant virus</strong> — and the solutions are opposite. A reference laboratory (Sanger) answers within <strong>weeks</strong>; our pipeline, from nanopore sequencing data, genotypes the resistance genes <strong>in hours</strong>, on site, in the transplant centre. Deep sequencing catches <strong>minor resistant subpopulations (5–20%)</strong> that Sanger fundamentally cannot see — yet it is precisely they that are selected under therapy and lead to failure of the treatment line.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: plasma/whole blood of a post-transplant patient (viraemia confirmed by PCR). Optimal — a run on <strong>Flongle/MinION</strong> right in the transplant centre laboratory (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the transplant physician — resistance genotype across UL97/UL54/UL56/UL51/UL89 with subpopulation fractions, drug-level interpretation (ganciclovir / foscarnet / cidofovir / letermovir / maribavir), viral load estimation from the same data; technical QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: I — double-stranded DNA (dsDNA)</h2>' +
    '<p>CMV belongs to <strong>Class I of the Baltimore classification</strong> — double-stranded DNA viruses. Their expression strategy is the most "cellular": the dsDNA genome is transcribed by DNA-dependent RNA polymerase (host and viral) into mRNA, which is immediately translated into protein — the classic <strong>DNA → mRNA → protein</strong> scheme, with no reverse transcription and no RNA intermediates. The CMV genome — <strong>~235 kb</strong>, the largest among human herpesviruses — is riddled with repeats (inverted b\'/c\' repeats flanking the unique UL and US segments), and in monocytes the virus goes latent, persisting as episomal dsDNA. For the pipeline this means two things: dsDNA is a <strong>stable target</strong> that requires no reverse-transcription step and is read directly by the nanopore, including native methylation; and long ONT reads <strong>span the repeats end to end</strong>, where short reads of a dsDNA genome collapse and fail to phase.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Resistance Genes and Viral Load</h2>' +
    '<h3>UL97 — phosphotransferase, the "gateway of ganciclovir"</h3>' +
    '<p>Ganciclovir is a prodrug: it is activated in the target cell by the viral phosphotransferase UL97. Without the first phosphorylation the drug is inert. That is why UL97 mutations are the most frequent cause of resistance to ganciclovir/valganciclovir:</p>' +
    tbl(['Mutation', 'Drug', 'Clinical Significance'], [
      ['<strong>M460V / M460I</strong>', 'Ganciclovir', 'Classic "hot" positions; high-level resistance'],
      ['<strong>H520Q</strong>', 'Ganciclovir', 'Moderate resistance, often in combination with UL54'],
      ['<strong>C592G</strong>', 'Ganciclovir', 'The most frequent mutation in clinical series'],
      ['<strong>A594V</strong>', 'Ganciclovir', 'High-level resistance'],
      ['<strong>L595S</strong>', 'Ganciclovir', 'Moderate resistance, expands under valganciclovir selection'],
      ['<strong>C603W</strong>', 'Ganciclovir', 'Rare, but high-level']
    ]) +
    '<h3>UL54 — DNA polymerase, the target of all "-virs" and foscarnet</h3>' +
    '<p>UL54 is the catalytic subunit of the viral DNA polymerase. Here mutations affect several drugs at once, and the pattern determines cross-resistance: ganciclovir, cidofovir, foscarnet. It is the UL97+UL54 combination that gives the full picture — and it is exactly here that nanopore beats everyone.</p>' +
    '<h3>UL56 / UL51 / UL89 — the terminase complex</h3>' +
    tbl(['Gene', 'Function', 'Drug'], [
      ['<strong>UL56</strong>', 'Terminase subunit', '<strong>Letermovir</strong> (intensively used for prophylaxis after HSCT — resistance has been described and is growing)'],
      ['<strong>UL51</strong>', 'Terminase complex', 'Additional letermovir resistance mutations'],
      ['<strong>UL89</strong>', 'Terminase subunit', 'Letermovir resistance (cross with UL56 lineages)']
    ]) +
    '<h3>Viral load from the same data</h3>' +
    '<p>Viral genome coverage in the same run is a <strong>surrogate of viral load</strong>: load dynamics under therapy can be tracked without a separate PCR reference, synchronised with the dynamics of resistant subpopulation fractions.</p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq CMV Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>CMV-Res-Genotyper</strong>', 'Classification of UL97/UL54/UL56/UL51/UL89 mutations by drug with resistance levels'],
      ['<strong>CMV-Subpop-Phaser</strong>', 'Phasing of mutations on long reads: one chromosome or different subpopulations'],
      ['<strong>CMV-Load-Tracker</strong>', 'Estimation of viral load and its dynamics from coverage']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — CMV references (Merlin/AD169), assembly through the repeats of the ~235 kb genome'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — with depth thresholds for minor variants (5–20%)'],
      ['<strong>4. Resistance genotyping</strong>', 'Custom UL97/UL54/UL56/UL51/UL89 mutation database based on clinical reference catalogues'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>Refractory CMV means weeks of uncertainty.</strong> Today\'s standard is Sanger genotyping at a reference laboratory: logistics, queue, an answer in 1–3 weeks. In that time the virus either keeps growing on useless ganciclovir, or the patient is forcibly switched to foscarnet with its nephrotoxicity. On-site Edge sequencing compresses this cycle to hours.</li>' +
    '<li><strong>Minor subpopulations decide.</strong> Resistant CMV clones start at a fraction of a few percent and are selected under therapy. Sanger with a threshold of ~20–25% does not see them; deep sequencing on ONT does. This changes the prognosis of a therapy line before the load clinically "stalls".</li>' +
    '<li><strong>A ~235 kb genome with repeats is within nanopore\'s reach.</strong> The CMV genome abounds in long repeats (UL/b\' and US/c\' reiterations), where short reads neither assemble nor phase. ONT reads traverse the repeats in full.</li>' +
    '<li><strong>Phasing is the unique trump card of long reads.</strong> UL97 and UL54 mutations sit at opposite ends of the genome: on short reads one cannot tell "two mutations in one genome" from "two different subpopulations with one mutation each". A long read is a single molecule — linkage is read directly. And these are different clinical decisions: a mono-resistant population versus a cumulatively multi-resistant one.</li>' +
    '<li><strong>Letermovir escalates the problem.</strong> Letermovir prophylaxis after HSCT is becoming standard — and UL56 resistance has already been described; rapid control of the terminase genes is in ever greater demand.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Cytomegalovirus (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Cytomegalovirus (CMV) Infection</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Cytomegalovirus (CMV) and Congenital CMV Infection</a></li></ul>';

  /* ── HERPES SIMPLEX VIRUS (HSV) ── */
  EN['/hsv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hsv.svg" alt="Herpes simplex virus — herpesvirion and neuron" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Herpes Simplex Virus (HSV-1/HSV-2): Encephalitis and Acyclovir Resistance</h1>' +
    '<p style="font-size:1.2em;color:#555">CSF mNGS, UL23/UL30 genotyping and whole-genome assembly on long reads — when every hour costs neurons</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Herpes simplex virus type 1 (HSV-1, HHV-1) is the leading cause of <strong>sporadic fatal encephalitis</strong> in adults: the virus strikes the <strong>temporal lobes</strong>, causing haemorrhagic necrosis. Without treatment, mortality is <strong>~70%</strong>; with early intravenous acyclovir it falls to <strong>~20–30%</strong> — but every hour of therapeutic delay irreversibly costs neurons and cognitive functions. HSV-2 accounts for genital infection, <strong>neonatal herpes</strong> (sepsis and encephalitis of newborns with mortality up to 60% without treatment) and recurrent aseptic meningitis.</p>' +
    '<p>CSF PCR is the gold standard of diagnostics, but it has blind spots: in the <strong>first 24–72 hours</strong> of illness PCR can be false-negative, atypical and vaccine-associated cases escape it, and above all — <strong>PCR does not answer the question of resistance</strong>. In immunosuppressed patients (organ and HSCT transplantation, HIV) acyclovir resistance reaches <strong>4–14%</strong>: the phenotypic test requires viral culture and takes <strong>weeks</strong>, whereas the genotype across <strong>UL23</strong> (thymidine kinase, ~95% of resistance cases) and <strong>UL30</strong> (DNA polymerase) delivers the answer in hours and immediately points to a change of therapy (foscarnet, cidofovir).</p>' +
    '<p>From nanopore sequencing data our pipeline combines three tasks in a single run: <strong>CSF mNGS</strong> (detection of HSV together with the differential panel — VZV, enteroviruses, HHV-6, bacterial meningitis), <strong>resistance genotyping</strong> across UL23/UL30 and <strong>whole-genome assembly</strong> for strain epidemiology.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: CSF (priority), vesicular fluid, mucosal swabs, blood in neonatal infection. Optimal — a run on <strong>Flongle</strong> for the emergency scenario (Edge) in intensive care.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the neurologist/infectious disease physician — species and type of virus (HSV-1/HSV-2 by US6), resistance genotype with interpretation of UL23/UL30 mutations and a therapy-change recommendation, differential panel by mNGS; technical QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: I — double-stranded DNA (dsDNA)</h2>' +
    '<p>HSV-1 and HSV-2 belong to <strong>Class I of the Baltimore classification</strong> — double-stranded DNA viruses. Their expression strategy is the most "cellular": the dsDNA genome is transcribed by DNA-dependent RNA polymerase (host and viral) into mRNA, which is immediately translated into protein — the classic <strong>DNA → mRNA → protein</strong> scheme, with no reverse transcription and no RNA intermediates. The HSV genome is <strong>~152 kb</strong> of dsDNA with a characteristic architecture: the unique UL and US segments are surrounded by <strong>terminal and internal inverted repeats</strong> (TRL/IRL/IRS/TRS), and in ganglion neurons the virus establishes lifelong latency. For the pipeline this means two things: dsDNA is a <strong>stable target</strong> that requires no reverse-transcription step and is read directly by the nanopore, including native methylation; and long ONT reads <strong>resolve the inverted repeats in full</strong>, allowing the genome to be assembled into a single contig and indels in the homopolymer tracts of UL23 to be mapped precisely.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Identification and Resistance</h2>' +
    '<h3>Key genes</h3>' +
    tbl(['Gene', 'Protein', 'Clinical Significance'], [
      ['<strong>UL23</strong>', 'Thymidine kinase (TK)', '<strong>~95% of acyclovir resistance cases</strong>: point mutations, deletions and insertions (often in G/C homopolymer tracts); TK-negative phenotype → switch to <strong>foscarnet</strong>'],
      ['<strong>UL30</strong>', 'DNA polymerase (pol)', '~5% of cases; mutations confer cross-resistance to acyclovir and foscarnet — cidofovir is required'],
      ['<strong>US6</strong>', 'Glycoprotein D (gD)', '<strong>HSV-1 / HSV-2 differentiation</strong> — crucial for prognosis: HSV-2 encephalitis recurs more often and responds worse to therapy'],
      ['<strong>UL27</strong>', 'Glycoprotein B (gB)', 'Conserved species-identification marker; target for mNGS classification']
    ]) +
    '<h3>Resistance genotype in the report</h3>' +
    tbl(['Finding', 'Interpretation', 'Action'], [
      ['UL23 mutation (incl. deletions/insertions)', 'TK deficiency: acyclovir is not phosphorylated', 'Discontinue acyclovir → <strong>foscarnet</strong>'],
      ['UL30 mutation', 'Altered DNA polymerase', 'Cross-resistance possible → foscarnet or <strong>cidofovir</strong>'],
      ['Wild-type UL23/UL30 with refractoriness', 'Resistance not confirmed', 'Check dose/adherence, repeat the lumbar puncture']
    ]) +
    '<h3>The mNGS differential panel in suspected encephalitis</h3>' +
    '<p>In a single run the pipeline checks the whole range of causes of acute encephalitis/meningitis — critical when HSV PCR is negative but the clinical picture persists:</p>' +
    '<ul><li><strong>VZV</strong> — the second most frequent cause of viral encephalitis;</li>' +
    '<li><strong>Enteroviruses</strong> — a frequent cause of aseptic meningitis;</li>' +
    '<li><strong>HHV-6</strong> — encephalitis in immunosuppressed patients and reactivation after transplantation;</li>' +
    '<li><strong>Bacterial meningitis</strong> (<em>N. meningitidis</em>, <em>S. pneumoniae</em>, <em>L. monocytogenes</em>) — must not be missed with an atypical CSF profile.</li></ul><hr>' +
    '<h2>🧬 The Technical Trump Card of ONT: a Genome with Repeats</h2>' +
    '<p>The HSV genome is a double-stranded DNA of <strong>~152 kb</strong> with a complex architecture: the unique segments UL and US are surrounded by <strong>terminal and internal inverted repeats</strong> (TRL/IRL/IRS/TRS, 6–9 kb each). Assembly with short reads (Illumina) <strong>breaks at the repeats</strong>: the repeats collapse, the context of mutations in TK and in the homopolymer tracts of UL23 is lost, and the genome assembles in fragments. <strong>Long Oxford Nanopore reads pass straight through the repeats</strong>, yielding a whole-genome assembly as a single contig — this opens up:</p>' +
    '<ul><li>precise mapping of deletions/insertions in UL23, including homopolymer tracts (C₇–C₈, G-stretches), where resistance most often arises;</li>' +
    '<li><strong>whole-genome epidemiology</strong> of HSV-1/HSV-2 strains — phylogenetics of nosocomial and neonatal outbreaks without PCR amplification of individual loci;</li>' +
    '<li>detection of mixed populations (a latent reservoir of resistant quasispecies) by read fraction.</li></ul><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq HSV Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>HSV-Res-Geno</strong>', 'Interpretation of UL23/UL30 mutations: resistance vs polymorphism (against curated genotype databases)'],
      ['<strong>HSV-Typer</strong>', 'HSV-1/HSV-2 differentiation by US6/UL27 and whole-genome signatures'],
      ['<strong>CNS-mNGS-Classifier</strong>', 'Pathogen prioritisation in CSF mNGS: HSV vs VZV vs enteroviruses vs the bacterial panel']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Dehosting and mNGS classification</strong>', 'Removal of human reads (GRCh38 reference), <code>kraken2</code> / <code>minimap2</code> against a neuroinfection panel'],
      ['<strong>3. Alignment (Mapping)</strong>', '<code>minimap2</code> — HSV-1 (strain 17) and HSV-2 (strain HG52) references'],
      ['<strong>4. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code> — including indels in the homopolymer tracts of UL23'],
      ['<strong>5. Whole-genome assembly</strong>', '<code>flye</code> / <code>medaka</code> — through-assembly across the RL/RS repeats'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>Every hour costs neurons</strong> — herpes simplex encephalitis has an annual incidence of ~2–4 cases per million, yet remains the most frequent cause of fatal sporadic encephalitis. Early PCR negativity (the first 24–72 h) provokes withdrawal of acyclovir — and death of the patient; mNGS with data accumulating over sequencing intervals increases sensitivity in the early period.</li>' +
    '<li><strong>Neonatal herpes</strong> — HSV-2 (and increasingly HSV-1) acquired during delivery causes disseminated infection and encephalitis of the newborn: without treatment mortality reaches 60%, and survivors suffer severe neurological disability. The speed of typing determines the outcome.</li>' +
    '<li><strong>Resistance under immunosuppression</strong> — in transplant recipients and HIV patients the proportion of acyclovir-resistant strains reaches 4–14%; the phenotypic test (culture, weeks) is clinically useless, and the UL23/UL30 genotype is the only rapid answer determining the switch to toxic foscarnet.</li>' +
    '<li><strong>Epidemiology</strong> — whole-genome HSV sequencing has revealed global recombination and geographic clustering of strains; long reads make such analysis routine for the first time, including nosocomial and neonatal outbreaks.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/">WHO — Herpes simplex virus (Fact sheet)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Herpes Simplex Encephalitis (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — Herpes simplex virus</a></li></ul>';

  /* ── EPSTEIN–BARR VIRUS (EBV) ── */
  EN['/ebv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_ebv.svg" alt="Epstein–Barr virus — herpesvirion and B lymphocyte" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Epstein–Barr Virus: Nasopharyngeal Cancer and Viral Oncology</h1>' +
    '<p style="font-size:1.2em;color:#555">The first discovered human oncovirus — complete genome, tumour clonality and latency methylation in a single nanopore run</p></div><hr>' +
    '<h2>🧬 Why EBV Is Viral Oncology in Its Purest Form</h2>' +
    '<p>Epstein–Barr virus (EBV, human herpesvirus 4, HHV-4) is the <strong>first virus for which oncogenicity in humans was proven</strong> (1964, Burkitt lymphoma) and an <strong>IARC Group 1 carcinogen</strong>. Virtually the entire adult population of the planet is infected: <strong>~95% of adults are seropositive</strong>. After primary infection the virus persists for life in B lymphocytes in latent form — and in a fraction of carriers becomes the driver of malignant transformation.</p>' +
    '<p>EBV is associated with a whole spectrum of tumours and conditions:</p>' +
    '<ul><li><strong>Nasopharyngeal carcinoma (NPC)</strong> — the undifferentiated form is practically always EBV-associated;</li>' +
    '<li><strong>Burkitt lymphoma</strong> (endemic and sporadic) and <strong>Hodgkin lymphoma</strong>;</li>' +
    '<li><strong>B-cell lymphoproliferations in immunosuppressed patients</strong> — above all post-transplant lymphoproliferative disorder (<strong>PTLD</strong>);</li>' +
    '<li><strong>~9% of gastric carcinomas</strong> (EBV-associated gastric cancer — a distinct molecular subtype per TCGA);</li>' +
    '<li><strong>Infectious mononucleosis</strong> — the classic manifestation of primary infection;</li>' +
    '<li><strong>Multiple sclerosis</strong> — EBV infection is recognised as the leading risk factor (an almost necessary condition according to large cohorts).</li></ul>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: plasma (cell-free EBV DNA), tumour/lymph node biopsy, nasopharyngeal lavage, whole blood (PTLD monitoring).</li>' +
    '<li><strong>📤 Output:</strong> HTML report — viral load, strain type (EBV-1/EBV-2), LMP1 variants, clonality assessment by terminal repeats, methylation profile and latency programme; technical QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>🎯 What the Pipeline Determines: Three Levels of Analysis</h2>' +
    '<p>As on our <a href="/hpv/">HPV page</a>, nanopore sequencing in a single run solves tasks for which qPCR and short reads require three different tests — or do not solve them at all.</p>' +
    tbl(['Level', 'Task', 'Clinical Significance'], [
      ['<strong>1. Detection and load</strong>', 'Quantitative determination of EBV DNA in plasma/material', 'NPC screening and monitoring; PTLD management after transplantation'],
      ['<strong>2. Genomic analysis</strong>', 'Strain typing <strong>EBV-1/EBV-2</strong> (EBNA-2/3 genes), <strong>LMP1</strong> variants (incl. the 30-bp deletion del-LMP1 associated with NPC), <strong>tumour clonality by the number of terminal repeats</strong>', 'Monoclonal episomal EBV = proof that the tumour grew from a single infected cell; deleted LMP1 — a marker of increased oncogenicity'],
      ['<strong>3. Latency epigenetics</strong>', 'Direct reading of <strong>viral genome methylation</strong> from native reads + analysis of the <strong>Cp/Wp</strong> promoters', 'Distinguish the latency programme (I/II/III) from the lytic cycle — the key to understanding tumour state and therapy response']
    ]) +
    '<p><strong>The key advantage of nanopore:</strong> the ~<strong>172 kb</strong> EBV genome is interwoven with large tandem internal repeats (<strong>IR1–IR4</strong>) and terminal repeats (<strong>TR</strong>). Short reads fundamentally cannot resolve these regions — neither count the number of repeats (clonality!) nor assemble the complete genome. A long nanopore read spans a repeat in full, and native DNA reading yields methylation <strong>without bisulfite conversion and without a separate test</strong>.</p>' +
    '<blockquote>This is a direct analogue of the HPV scenario: viral oncology + liquid biopsy + risk stratification in a single run.</blockquote><hr>' +
    '<h2>🇨🇳 "Cantonese Cancer": the Epicentre Is Southern China</h2>' +
    '<p>Nasopharyngeal carcinoma is called the <strong>"Cantonese cancer"</strong>: the epicentre of global incidence is <strong>Southern China</strong> (Guangdong and Guangxi provinces, Hong Kong, the city of Guangzhou), where NPC occurs <strong>20–50 times more often</strong> than the world average. The cause is a combination of circulating oncogenic EBV variants, genetic predisposition (HLA loci) and environmental factors (salted fish, nitrosamines).</p>' +
    '<p>The decisive evidence for screening was obtained precisely there:</p>' +
    '<ul><li><strong>Chan et al., NEJM 2017 (Hong Kong)</strong> — screening of <strong>20,174 asymptomatic men</strong> by cell-free EBV DNA in plasma: NPC was detected in 34 participants, with the share of early stages (I–II) rising from ~20% (population level) to <strong>71%</strong>, and 3-year progression-free survival reaching <strong>97% versus 70%</strong> in a historical cohort. This is the reference study showing that viral-DNA liquid biopsy <strong>shifts stages and survival</strong>.</li>' +
    '<li>Today EBV-DNA screening is being introduced into early NPC detection programmes in Hong Kong, Guangzhou and Guangxi; expansion to the endemic regions of Southeast Asia is under discussion.</li></ul>' +
    '<p><strong>Where OnSiteSeq is needed:</strong> qPCR tests give only "how much virus". A nanopore run in the same plasma or lavage additionally yields the <strong>strain, del-LMP1, clonality and methylation</strong> — that is, not merely screening, but a molecular characterisation of the tumour even before biopsy. The portable Edge architecture allows such screening to be deployed in district clinics of endemic provinces, without sending samples to central laboratories.</p><hr>' +
    '<h2>🧫 PTLD and Transplantation</h2>' +
    '<p>After organ and bone marrow transplantation, immunosuppression lifts control over latent EBV — the risk of <strong>post-transplant lymphoproliferative disorder (PTLD)</strong>. The standard of care is regular monitoring of viral load in blood; our platform adds to it:</p>' +
    '<ul><li><strong>Clonality</strong> by terminal repeats — distinguishing polyclonal reactivation from a monoclonal lymphoproliferative process;</li>' +
    '<li><strong>The latency programme</strong> (Cp/Wp promoters, methylation) — latency III is typical of early PTLD in immunosuppressed patients;</li>' +
    '<li><strong>The strain</strong> — in donor–recipient transmission and outbreaks in transplant centres.</li></ul><hr>' +
    '<h2>🎯 Markers: What We Read in the EBV Genome</h2>' +
    tbl(['Marker', 'Type', 'Significance'], [
      ['<strong>LMP1</strong>', 'Gene (latent membrane protein 1)', 'The principal viral oncogene; the <strong>30-bp deletion (del-LMP1)</strong> is associated with NPC and a more aggressive phenotype'],
      ['<strong>EBNA-1</strong>', 'Gene', 'Episome maintenance; polymorphisms (incl. the V-val variant) are linked to NPC in Southern China'],
      ['<strong>EBNA-2 / EBNA-3</strong>', 'Genes', 'Basis of strain typing <strong>EBV-1 (type A) / EBV-2 (type B)</strong>; type 2 is more frequent in immunosuppressed patients'],
      ['<strong>BART</strong>', 'microRNA locus', 'Cluster of viral miRNAs, highly expressed in NPC and EBV-associated gastric cancer; BART deletions are a hallmark of NPC strains'],
      ['<strong>EBER</strong>', 'Non-coding RNAs (EBER1/2)', 'Classic histological marker of EBV (EBER-ISH); in the pipeline — a control of latent transcription coverage'],
      ['<strong>Terminal repeats (TR)</strong>', 'Repeats of ~500 bp at the genome ends', 'The number of TRs is the "fingerprint" of the cell clone: tumour monoclonality proves EBV aetiology'],
      ['<strong>IR1–IR4</strong>', 'Internal tandem repeats', 'Not resolved by short reads; long reads deliver the complete ~172 kb genome assembly'],
      ['<strong>Cp / Wp</strong>', 'Promoters', 'Switching of latency programmes (0/I/II/III) and the lytic cycle; read together with methylation']
    ]) + '<hr>' +
    '<h2>🧭 Baltimore Class: I — double-stranded DNA (dsDNA)</h2>' +
    '<p>EBV belongs to <strong>Class I of the Baltimore classification</strong> — double-stranded DNA viruses. Their expression strategy is the most "cellular": the dsDNA genome is transcribed by DNA-dependent RNA polymerase (host and viral) into mRNA, which is immediately translated into protein — the classic <strong>DNA → mRNA → protein</strong> scheme, with no reverse transcription and no RNA intermediates. The EBV genome is <strong>~172 kb</strong> of dsDNA, threaded with internal tandem repeats <strong>IR1–IR4</strong> and terminal repeats <strong>TR</strong>, whose copy number serves as a "fingerprint" of tumour clonality; in B lymphocytes the virus persists for life as a circular episome in one of its latency programmes. For the pipeline this means two things: dsDNA is a <strong>stable target</strong> that requires no reverse-transcription step and is read directly by the nanopore, including <strong>native methylation without bisulfite conversion</strong> (the key to latency programmes); and long ONT reads <strong>resolve IR1–IR4 and TR in full</strong> — something fundamentally inaccessible to short reads.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq EBV Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>EBV-Strain-Typer</strong>', 'Strain typing EBV-1/EBV-2 and calling of LMP1/EBNA-1 variants (architecture — an analogue of <a href="/ml/hiv/">HIV-1-M-Env-Rus</a>: CNN + Self-Attention)'],
      ['<strong>EBV-Clonality-Caller</strong>', 'Clonality assessment from the distribution of terminal-repeat counts across reads'],
      ['<strong>EBV-Latency-Methyl</strong>', 'Classification of the latency programme (0/I/II/III vs lytic cycle) from Cp/Wp and BART methylation patterns']
    ]) +
    '<p>Training is planned on the reference genomes <strong>NCBI RefSeq (NC_007605, type 1; AG876, type 2)</strong> and open NPC cohort data with validation on clinical samples.</p><hr>' +
    '<h2>🛠 Under the Hood: Dependencies and Environment (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — EBV reference panel (NC_007605, AG876) + <code>GRCh38</code> for subtracting the host background'],
      ['<strong>3. Assembly and variants</strong>', '<code>medaka</code>, <code>clair3</code>, <code>samtools</code>; de novo assembly at high load (<code>flye</code>)'],
      ['<strong>4. Clonality and repeats</strong>', 'Counting of terminal/internal repeats on spanning reads (<code>pysam</code>, custom caller)'],
      ['<strong>5. Methylation</strong>', '<code>Dorado</code> (5mC/5hmC modifications), <code>modkit</code> — latency vs lytic cycle'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>BioPython</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>~95% of adults are seropositive</strong> — virtually everyone carries EBV; the question is not infection, but in whom the latent infection will turn into an oncological scenario.</li>' +
    '<li><strong>~130,000 new cases of nasopharyngeal cancer per year</strong> (GLOBOCAN), up to 80% in East and Southeast Asia; undifferentiated NPC is practically always EBV-associated.</li>' +
    '<li><strong>Proven screening</strong> — the Hong Kong study (NEJM 2017) showed a shift to early stages and 97% 3-year survival with detection by plasma EBV DNA: one of the very few cases where liquid biopsy has proven population-level benefit.</li>' +
    '<li><strong>Transplantation</strong> — PTLD remains a formidable complication; early differentiation of reactivation from a monoclonal process changes management (reduction of immunosuppression vs rituximab).</li>' +
    '<li><strong>Multiple sclerosis</strong> — a causal link with EBV has been confirmed by large cohorts (Bjornevik et al., Science 2022, US Army cohort, HR ≈ 32); serology and viral load are coming into the focus of neurology.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa1701717">Chan K.C.A. et al. — Analysis of Plasma Epstein–Barr Virus DNA to Screen for Nasopharyngeal Cancer (NEJM, 2017)</a></li>' +
    '<li>📄 <a href="https://monographs.iarc.who.int/list-of-classifications">IARC Monographs — Epstein–Barr virus, Group 1 carcinogen</a></li>' +
    '<li>📄 <a href="https://www.science.org/doi/10.1126/science.abj8222">Bjornevik K. et al. — Longitudinal analysis reveals high prevalence of EBV associated with multiple sclerosis (Science, 2022)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature13480">TCGA — Molecular subtypes of gastric cancer (EBV-positive subtype, Nature 2014)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/nuccore/NC_007605">NCBI RefSeq — Epstein–Barr virus, complete genome (NC_007605)</a></li></ul>';

  /* ── HHV-6 / iciHHV-6 ── */
  EN['/hhv6/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hhv6.svg" alt="HHV-6 herpesvirus integrated into a chromosome" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>HHV-6: Chromosomal Integration (iciHHV-6) and the Trap of False Viral Loads</h1>' +
    '<p style="font-size:1.2em;color:#555">Long reads distinguish a chromosomally integrated virus from active reactivation — and spare the patient months of unnecessary ganciclovir</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Human herpesviruses 6 (HHV-6A and HHV-6B)</strong> are β-herpesviruses with lifelong latency. HHV-6B causes <strong>exanthem subitum (roseola)</strong> in children, and in transplanted patients HHV-6 reactivation produces severe complications: <strong>post-transplant limbic encephalitis</strong> (a classic after haematopoietic stem cell transplantation, HSCT), pneumonitis and suppression of haematopoiesis.</p>' +
    '<p>But HHV-6 has a unique trap that no other herpesvirus possesses: <strong>iciHHV-6</strong> (inherited chromosomally integrated HHV-6). About <strong>~1% of people</strong> carry the complete HHV-6 genome <strong>chromosomally integrated into the germline</strong> — the virus embedded itself into the telomeric regions of an ancestor\'s chromosomes and is now inherited like an ordinary gene. In such a patient, blood PCR (especially of whole blood) shows <strong>enormous "viral loads" — millions of copies/ml</strong> — but this is not an active infection, it is <strong>their own genome</strong>: every cell carries one copy of the virus. The outcome: false diagnoses of "refractory viraemia", months of unnecessary <strong>ganciclovir/foscarnet</strong> with their myelotoxicity and nephrotoxicity — up to withdrawal of life-sustaining immunosuppression.</p>' +
    '<p>Our pipeline settles the question with <strong>long nanopore reads</strong>: they capture <strong>"virus–chromosome" chimeric reads</strong> and junctions with telomeric repeats <strong>(TTAGGG)n</strong> — direct proof of germline integration, while the coverage ratio (<strong>~1 viral copy per cell</strong> in iciHHV-6 versus growth during replication) distinguishes integration from active reactivation.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: whole blood, plasma, CSF (when encephalitis is suspected).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the transplant physician/neurologist — species (HHV-6A/6B), <strong>integration status (iciHHV-6 yes/no)</strong>, copy-number estimate, interpretation of the "viral load"; technical QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: I — double-stranded DNA (dsDNA)</h2>' +
    '<p>HHV-6A and HHV-6B belong to <strong>Class I of the Baltimore classification</strong> — double-stranded DNA viruses. Their expression strategy is the most "cellular": the dsDNA genome is transcribed by DNA-dependent RNA polymerase (host and viral) into mRNA, which is immediately translated into protein — the classic <strong>DNA → mRNA → protein</strong> scheme, with no reverse transcription and no RNA intermediates. The HHV-6 genome is <strong>~160 kb</strong> of dsDNA with telomere-like repeats at its ends, and it is these repeats that enable an ability unique among herpesviruses — <strong>integration into the telomeres of host chromosomes</strong> (iciHHV-6): viral dsDNA embeds into chromosomal dsDNA and is inherited through the germline. For the pipeline this means two things: dsDNA is a <strong>stable target</strong> that requires no reverse-transcription step and is read directly by the nanopore, including native methylation; and long ONT reads <strong>capture the chimeric virus–chromosome junctions in full</strong>, distinguishing integration from replication where qPCR is fundamentally powerless.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['<strong>I</strong>', '<strong>dsDNA</strong>', '<strong>DNA → mRNA (like the host cell)</strong>', '<strong>Herpesviruses, adenoviruses, smallpox, ASFV</strong>'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Core of the Pipeline: iciHHV-6 versus Reactivation</h2>' +
    '<p>The main clinical question in high HHV-6 viraemia is — <strong>is this an active infection or an inherited integration?</strong> qPCR fundamentally cannot distinguish these states: in both there is viral DNA in blood. Long reads settle the question directly.</p>' +
    tbl(['Feature', 'HHV-6 Reactivation', 'iciHHV-6 (integration)'], [
      ['<strong>"Virus–chromosome" chimeric reads</strong>', 'Absent (the virus replicates episomally)', '<strong>Present</strong> — reads that are half viral, half chromosomal'],
      ['<strong>Telomeric junctions (TTAGGG)n</strong>', 'Absent', '<strong>Present</strong> — the viral genome is spliced with the chromosome\'s telomeric repeats'],
      ['<strong>Copy number</strong>', 'Rises during replication, falls on therapy', 'Stably ~1 copy per cell in all cells of the body'],
      ['<strong>Whole-blood PCR</strong>', 'High but variable', 'Stably "off the scale" (millions of copies/ml)'],
      ['<strong>Plasma PCR</strong>', 'Positive (virus in plasma)', 'Usually low/negative — the virus sits inside cells'],
      ['<strong>Clinical picture</strong>', 'Encephalitis, pneumonitis, cytopenias', 'Often absent; the patient is healthy'],
      ['<strong>Correct action</strong>', 'Ganciclovir / foscarnet', '<strong>Observation</strong>; withdrawal of unnecessary antiviral therapy']
    ]) +
    '<p><strong>How sequencing sees it:</strong> a long nanopore read (5–50+ kb) spans the insertion site in full — one part of the read aligns to the HHV-6 genome (U38, U57 and others), the other to the host chromosome, and the telomeric repeats (TTAGGG)n are read at the junction. Such a read is <strong>unambiguous proof</strong> of germline integration: no replication generates chimeric reads.</p>' +
    '<blockquote>This is exactly the same molecular mechanism of <strong>"chimeric reads"</strong> as in our <a href="/hpv/">HPV pipeline</a> — there "virus–human" chimeric reads prove HPV integration into the cervical epithelium as a cancer driver; here — integration of HHV-6 into the germline as the cause of false viral loads.</blockquote><hr>' +
    '<h2>🏥 Clinical Scenarios</h2>' +
    tbl(['Scenario', 'Problem', 'What Sequencing Delivers'], [
      ['<strong>Transplantation (HSCT, solid organs)</strong>', '"Refractory" HHV-6 viraemia not falling on ganciclovir — a frequent reason for escalation to foscarnet', 'Confirmation of iciHHV-6 → withdrawal of toxic therapy, return to standard immunosuppression'],
      ['<strong>Nephrology / HSCT</strong>', 'Suppression of haematopoiesis: HHV-6 reactivation or foscarnet toxicity?', 'Separation of replication and integration by copy number and chimeric reads'],
      ['<strong>Encephalitis differentiation</strong>', 'Limbic encephalitis after HSCT: HHV-6 in CSF — reactivation or iciHHV-6?', 'Absence of chimeric reads in CSF despite high viral DNA = genuine reactivation requiring treatment'],
      ['<strong>Prenatal diagnostics</strong>', 'Rare cases of iciHHV-6 reactivation in the fetus; "viral load" in amniotic fluid', 'Confirmation of inherited integration in parent and fetus → exclusion of active intrauterine infection']
    ]) + '<hr>' +
    '<h2>🎯 Markers</h2>' +
    tbl(['Marker', 'Gene / Locus', 'Significance'], [
      ['<strong>U38</strong>', 'DNA polymerase', 'The main target of qPCR diagnostics; in the pipeline — a reference point for coverage and copy number'],
      ['<strong>U57</strong>', 'Major capsid protein', 'Replication marker; rising U57 coverage over time = active infection'],
      ['<strong>HHV-6A/6B differentiation</strong>', 'Genomic regions with species-specific polymorphisms (U90–U100, terminal DR repeats)', '6B — roseola and transplant reactivations; 6A — more frequent in iciHHV-6 and in the CNS'],
      ['<strong>Telomeric junctions</strong>', 'HHV-6 terminal repeats (DR-L/DR-R) ↔ (TTAGGG)n of the chromosome', 'Direct proof of chromosomal integration; localisation of the insertion site']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq HHV-6 Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>HHV6-Integration-Caller</strong>', 'Detection and localisation of iciHHV-6 by chimeric reads and telomeric junctions (logic — a descendant of <a href="/hpv/">HPV-Integration-Caller</a>)'],
      ['<strong>HHV6-Copy-Estimator</strong>', 'Estimation of viral copies per cell: integration (~1) vs replication (rising)'],
      ['<strong>HHV6-AB-Typer</strong>', 'HHV-6A/HHV-6B differentiation by species-specific SNPs']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — HHV-6A (U1102) and HHV-6B (Z29/HST) references + <code>GRCh38</code> for finding integration sites'],
      ['<strong>3. Chimeric-read detection</strong>', 'Search for "virus–chromosome" split/supplementary alignments (<code>pysam</code>, custom caller), (TTAGGG)n filter at the junction'],
      ['<strong>4. Copy number and coverage</strong>', '<code>samtools</code>, custom virus/chromosome coverage-ratio script'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>~1% of humanity</strong> carries iciHHV-6: these are tens of millions of people whose any HHV-6 blood PCR will be "off the scale". In transplantation, where PCR monitoring of herpesviruses is routine, iciHHV-6 is a systematic source of false alarms and iatrogenesis.</li>' +
    '<li><strong>Toxicity of unnecessary therapy</strong> — ganciclovir causes myelosuppression (especially dangerous after HSCT), foscarnet — nephrotoxicity and electrolyte shifts. Months of such therapy "for a false viraemia" can cost the patient graft engraftment.</li>' +
    '<li><strong>Limbic encephalitis</strong> — a classic complication after HSCT (anterograde amnesia, seizures, hippocampal changes on MRI); HHV-6 is its principal cause, but in an iciHHV-6 carrier a positive CSF PCR requires confirmation of replication specifically, not integration.</li>' +
    '<li><strong>Inheritance</strong> — iciHHV-6 is transmitted in Mendelian fashion: once confirmed in a patient, the donor (in HSCT) and relatives should be tested — a donor with iciHHV-6 will give the recipient a "viral load" from day one after transplantation.</li></ul><hr>' +
    '<h2>🔬 Related OnSiteSeq Pages and Sources</h2>' +
    '<ul><li>🧬 <a href="/hpv/">HPV and cervical cancer</a> — a related page: the same integration-detection mechanism via "virus–host" chimeric reads</li>' +
    '<li>📄 <a href="https://hhv-6foundation.org/">iciHHV-6 Foundation — a resource on chromosomal integration of HHV-6</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed — inherited chromosomally integrated HHV-6 (iciHHV-6)</a></li>' +
    '<li>📄 <a href="https://www.ecil-leukaemia.com/">ASTS/ECIL — guidelines on HHV-6 in transplant recipients</a></li></ul>';

  /* ── GUT MICROBIOME (CDI, FMT, enterotypes) ── */
  EN['/microbiome/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_microbiome.svg" alt="Gut microbiome — a community of diverse bacteria" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Gut Microbiome: CDI, FMT and Enterotypes</h1>' +
    '<p style="font-size:1.2em;color:#555">From genus lists to functions and strains: gut metagenomics on long reads</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>The gut microbiome is an ecosystem of hundreds of species of bacteria, archaea, fungi and viruses whose combined genome is a hundred times richer than the human one. Two flagship international projects defined the modern scientific framework for studying it:</p>' +
    '<ul><li><strong>Human Microbiome Project (HMP, NIH, 2007–2016)</strong> — showed that <strong>microbial genes outnumber human genes roughly 100-fold</strong> and that <strong>there is no single "healthy microbiome"</strong>: the taxonomic composition of healthy people differs radically, whereas the <strong>functional profile (metabolic pathways) is more stable</strong> than the species list.</li>' +
    '<li><strong>MetaHIT (EU, 2008–2012)</strong> — built a catalogue of <strong>3.3 million microbial genes</strong>, described <strong>enterotypes</strong> (stable community configurations dominated by <em>Bacteroides</em>, <em>Prevotella</em> or <em>Ruminococcus</em>) and linked <strong>low microbiome gene richness to obesity, systemic inflammation and inflammatory bowel disease (IBD)</strong>.</li></ul>' +
    '<p>The common conclusion of both projects: <strong>the diagnostic value of metagenomics lies in functions and strains, not in a list of genera</strong>. Our pipeline is built exactly this way: full-length 16S and shotgun metagenomics on long nanopore reads deliver species/strain-level resolution, functional annotation and the resistome in a single run.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: stool, rectal swabs, mucosal biopsies. For the <strong>Edge scenario (Flongle)</strong>, 16S/ITS amplicons and targeted panels are optimal; deep gut shotgun sequencing is a Desktop/Cloud task (MinION and above).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — species-level taxonomic profile, diversity metrics (Shannon index, gene richness), dysbiosis markers, recovery dynamics after FMT, resistome (AMR genes); technical QC report for the bioinformatician.</li></ul><hr>' +
    '<h2>📊 Product Availability</h2>' +
    tbl(['Platform', 'Availability Status'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>In development</strong> — 16S/ITS amplicons and targeted panels on Flongle'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>In development</strong> — medium-coverage shotgun metagenomics (MinION)'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 Not available — deep shotgun sequencing and MAG assembly']
    ]) +
    '<p>An honest caveat about Flongle: the capacity of a Flongle flow cell is sufficient for amplicon approaches (16S/ITS) and targeted panels — this is the <strong>ideal Edge scenario</strong>. A deep gut shotgun metagenome requires tens of millions of reads and goes beyond Edge — that is Desktop and Cloud territory.</p><hr>' +
    '<h2>🎯 Clinical Core #1: CDI and FMT Monitoring</h2>' +
    '<p><strong>Recurrent <em>Clostridioides difficile</em> infection (CDI)</strong> is the principal proven indication for microbiome therapy. <strong>Faecal microbiota transplantation (FMT)</strong> achieves <strong>~90%</strong> efficacy in recurrent CDI, where antibiotics yield only 20–30%. CDI diagnostics itself (tcdA/tcdB, ribotype 027) is covered by our <a href="/cdifficile/">/cdifficile/</a> page — here we discuss the <strong>microbiome profile BEFORE and AFTER FMT</strong>:</p>' +
    tbl(['Parameter', 'Before FMT (dysbiosis in CDI)', 'After successful FMT'], [
      ['<strong>Diversity (Shannon)</strong>', 'Sharply reduced', 'Recovers to the donor level'],
      ['<strong>Proteobacteria</strong>', 'Expansion (a dysbiosis marker)', 'Displaced; their share normalises'],
      ['<strong>SCFA producers</strong> (<em>Faecalibacterium</em>, <em>Roseburia</em>)', 'Depleted — no butyrate for the epithelium', 'Return, restoring the barrier and colonisation resistance'],
      ['<strong>Firmicutes/Bacteroidetes</strong>', 'Balance shifted', 'Ratio normalises']
    ]) +
    '<p>Metagenomic FMT monitoring answers practical questions: <strong>has the donor consortium engrafted</strong> (strain-level donor → recipient tracking), has diversity recovered, and have unwanted resistance genes been transferred together with the graft.</p><hr>' +
    '<h2>🎯 Clinical Core #2: The Gut Resistome</h2>' +
    '<p>The gut is the main <strong>reservoir of antimicrobial resistance genes (the resistome)</strong> in the body: a dense community, horizontal gene transfer, antibiotic pressure. Metagenomic resistome screening is clinically significant in two scenarios:</p>' +
    '<ul><li><strong>ICU patients</strong> — colonisation by multidrug-resistant organisms predicts the aetiology of ventilator-associated pneumonia and sepsis; knowing the resistome narrows the empirical regimen.</li>' +
    '<li><strong>Before transplantation and chemotherapy</strong> — neutropenia turns the gut reservoir into a source of translocation; the resistome profile determines the decontamination and prophylaxis protocol.</li></ul>' +
    tbl(['Gene', 'Class / Mechanism', 'Clinical Significance'], [
      ['<strong>vanA</strong>', 'Glycopeptides (vancomycin)', 'VRE epidemiology, pre-transplant screening'],
      ['<strong>blaNDM</strong>', 'Carbapenems (metallo-β-lactamase)', 'Alarming marker: an intestinal NDM reservoir is a source of untreatable infections'],
      ['<strong>mcr</strong>', 'Colistin (a "last-resort" antibiotic)', 'Plasmid-borne transmission, surveillance']
    ]) +
    '<p>Detection is performed against the <strong>CARD</strong> and <strong>ResFinder</strong> databases, with the genetic context (plasmid/chromosome) reported in shotgun mode.</p><hr>' +
    '<h2>⚙️ The ONT Technical Edge: Long Reads for Metagenomics</h2>' +
    '<ul><li><strong>Full-length 16S (~1500 bp) instead of V3–V4</strong> — short Illumina fragments resolve only to genus and fundamentally cannot distinguish closely related species (the classic example: <strong>short 16S cannot tell <em>E. coli</em> from <em>Shigella</em></strong>). Nanopore reads the entire gene — <strong>species-level resolution</strong>, not genus.</li>' +
    '<li><strong>MAG assembly (metagenome-assembled genomes)</strong> from long reads — chromosomes of dominant species assemble into contigs, opening access to strains absent from reference databases (and the "uncultivable" majority of the gut is exactly where the novelty lies).</li>' +
    '<li><strong>Direct methylation reading</strong> — the nanopore signal carries base-modification information without bisulfite conversion: microbiome epigenetics is an additional data layer from the same run.</li></ul><hr>' +
    '<h2>🧪 Report Markers and Metrics</h2>' +
    tbl(['Marker / Metric', 'What It Measures', 'Interpretation'], [
      ['<strong>Full-length 16S (~1500 bp)</strong>', 'Species-level taxonomy', 'The foundation of the profile; species resolution without genus-level guesswork'],
      ['<strong>Shannon index</strong>', 'α-diversity', 'A decrease = dysbiosis; its dynamics are the main marker of recovery after FMT'],
      ['<strong>Gene richness</strong> (MetaHIT metric)', 'Number of unique microbial genes', 'Low richness ↔ obesity, inflammation, IBD'],
      ['<strong>Firmicutes / Bacteroidetes</strong>', 'Balance of the two dominant phyla', 'A shifted ratio is associated with metabolic disorders'],
      ['<strong>Proteobacteria share</strong>', 'Expansion of opportunists', 'A marker of dysbiosis and inflammation; rises after antibiotics'],
      ['<strong>SCFA producers</strong> (<em>Faecalibacterium</em>, <em>Roseburia</em>)', 'Butyrate production', 'Epithelial health and colonisation resistance'],
      ['<strong>Resistome (CARD / ResFinder)</strong>', 'AMR genes in the community', 'vanA, blaNDM, mcr — screening in the ICU and before transplantation']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>NanoPlot</code>'],
      ['<strong>2. Taxonomy</strong>', 'Full-length 16S classification (SILVA/GTDB databases); for shotgun — <code>Kraken2</code> / <code>minimap2</code> against references'],
      ['<strong>3. Diversity metrics</strong>', 'α- and β-diversity, Shannon index, gene richness, F/B ratio'],
      ['<strong>4. Resistome</strong>', '<code>CARD</code>, <code>ResFinder</code> — detection of vanA, blaNDM, mcr and hundreds of other AMR genes'],
      ['<strong>5. MAG assembly (shotgun)</strong>', '<code>metaFlye</code>, <code>medaka</code> — assembly and polishing of metagenome-assembled genomes'],
      ['<strong>6. Reporting</strong>', 'HTML report for the physician + QC report for the bioinformatician']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>CDI — an in-hospital epidemic</strong> — <em>C. difficile</em> remains the leading cause of nosocomial diarrhoea; post-antibiotic recurrence reaches 30–60%. FMT with ~90% efficacy has become the standard, and metagenomic monitoring of donor consortium engraftment is its necessary scientific companion.</li>' +
    '<li><strong>The AMR pandemic</strong> — the gut resistome (vanA, blaNDM, mcr) is a hidden reservoir from which multidrug-resistant infections arise in the most vulnerable patients. Resistome screening is an emerging component of infection control in ICUs and transplant medicine.</li>' +
    '<li><strong>Long reads change the resolution</strong> — the move from V3–V4 to full-length 16S and shotgun MAG assembly lifts metagenomics from "genus lists" to the level of species, strains and functions — exactly where, according to HMP and MetaHIT, the diagnostic value resides.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://hmpdacc.org/">NIH Human Microbiome Project (HMP)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature08821">MetaHIT — the human gut microbial gene catalogue (Nature, 2010)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature09944">Enterotypes of the human gut microbiome (Nature, 2011)</a></li>' +
    '<li>📄 <a href="/cdifficile/">Our page — Clostridioides difficile</a></li></ul>';

  /* ── VAGINAL MICROBIOME (CST, preterm birth, BV) ── */
  EN['/vaginal/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_vaginal.svg" alt="Vaginal microbiome — lactobacillus rods" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Vaginal Microbiome: Preterm Birth and Dysbiosis</h1>' +
    '<p style="font-size:1.2em;color:#555">CST classification, species-level resolution of lactobacilli and risk assessment — full-length 16S where V3–V4 fails</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>The vaginal microbiome — one of the five key body sites of the <strong>Human Microbiome Project</strong> — is unique among human biomes for its <strong>low diversity</strong>: unlike the gut, health here is defined not by species richness but by the <strong>dominance of lactobacilli</strong>. Vaginal communities are described by five types — <strong>Community State Types (CST I–V)</strong>: <strong>CST I</strong> (dominated by <em>Lactobacillus crispatus</em>) is a protective state with low pH and a stable barrier; <strong>CST IV</strong> (diverse anaerobes — <em>Gardnerella</em>, <em>Prevotella</em>, <em>Atopobium</em>) is dysbiosis, clinically corresponding to bacterial vaginosis. Prognostically it is critical to distinguish both "favourable" and "transitional" states: <em>L. iners</em> is not a protector but a bridge to dysbiosis.</p>' +
    '<p>From nanopore <strong>full-length 16S rRNA gene</strong> sequencing data our pipeline determines the CST, the species composition of lactobacilli and key anaerobes, and risk markers of preterm birth and recurrent bacterial vaginosis — from a self-collected sample, within hours.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: a <strong>self-collected</strong> vaginal swab (low biomass is not an obstacle). Optimal: rapid library preparation and a <strong>Flongle</strong> run for the outpatient screening scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the obstetrician-gynaecologist — CST classification, species-level lactobacillus profile, dysbiosis markers and risk assessment; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: CST, Lactobacilli, Anaerobes</h2>' +
    '<h3>Clinical Core #1 — Preterm Birth</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>CST IV</strong> (anaerobic dysbiosis)', 'Associated with an increased risk of <strong>preterm birth</strong> — the leading cause of neonatal mortality worldwide'],
      ['<strong>Depletion of <em>L. crispatus</em></strong>', 'Loss of dominance of the protective lactobacillus in the <strong>second trimester</strong> is a predictor of adverse pregnancy outcome; microbiome screening in this window is a working prevention tool'],
      ['<strong>Linkage with GBS</strong>', 'The microbiome profile complements <a href="/agalactiae/">Streptococcus agalactiae screening in pregnancy</a>: vaginal dysbiosis and GBS carriage are two arms of a unified assessment of the infectious risk of delivery']
    ]) +
    '<h3>Clinical Core #2 — Bacterial Vaginosis (BV)</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong><em>Gardnerella vaginalis</em> (clades)</strong>', 'Key component of the BV biofilm; clade-level resolution matters — clades differ in virulence and association with recurrence'],
      ['<strong><em>Atopobium vaginae</em></strong>', 'Marker of severe and <strong>recurrent</strong> BV; resistant to metronidazole — its dominance explains the failure of standard therapy'],
      ['<strong><em>Prevotella</em> spp.</strong>', 'Component of the polymicrobial anaerobic consortium of CST IV; associated with an inflammatory background'],
      ['<strong>Recurrence up to 50%</strong>', 'After metronidazole, BV returns in every second patient — molecular profiling (instead of Nugent microscopy) reveals the reason: biofilm, <em>Atopobium</em>, incomplete eradication'],
      ['<strong>STI risk</strong>', 'BV increases the risk of sexually transmitted infections, including <strong>HIV</strong> and <strong>HPV persistence</strong> — the vaginal microbiome directly affects human papillomavirus clearance (see our <a href="/hpv/">HPV page</a>)']
    ]) +
    '<h3>The Technical Edge: Full-Length 16S</h3>' +
    tbl(['Question', 'V3–V4 (Illumina)', 'Full-length 16S (ONT)'], [
      ['<strong>L. crispatus vs L. iners</strong>', 'Cannot distinguish', '<strong>Distinguishes</strong> — and these are prognostically opposite species: crispatus protects, iners is a transitional state towards dysbiosis'],
      ['<strong>Gardnerella clades</strong>', 'Genus-level resolution', 'Species- and subspecies-level'],
      ['<strong>SNV strain tracking of L. crispatus</strong>', 'Impossible', 'Possible — strain tracking over the course of treatment and pregnancy'],
      ['<strong>Format</strong>', 'Stationary laboratory', 'Self-collection → Flongle → answer within hours; low biomass is no obstacle']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    '<h3>Primary tool</h3>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Vaginal Microbiome Pipeline</strong>', '🟡 In development']]) +
    '<h3>Planned ML models</h3>' +
    tbl(['Model', 'Target Task'], [
      ['<strong>VM-CST-Classifier</strong>', 'Automatic CST classification (I–V) from the full-length 16S profile'],
      ['<strong>VM-PTB-Risk</strong>', 'Preterm birth risk assessment from the second-trimester microbiome composition'],
      ['<strong>VM-BV-Relapse</strong>', 'Prediction of BV recurrence after therapy from the <em>Atopobium</em> / <em>Gardnerella</em> clade profile']
    ]) + '<hr>' +
    '<h2>🛠 Technical Architecture (Pipeline Stack)</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Full-length 16S taxonomy</strong>', '<code>minimap2</code> + a curated 16S database of the vaginal biome (species-level resolution of lactobacilli and <em>Gardnerella</em> clades)'],
      ['<strong>3. CST classification</strong>', 'Clustering of profiles against reference CST I–V (a modification of VALENCIA)'],
      ['<strong>4. SNV analysis</strong>', '<code>clair3</code>, <code>medaka</code> — longitudinal strain tracking of <em>L. crispatus</em>'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>Preterm birth</strong> — about 15 million cases per year worldwide and the leading cause of under-five mortality. Vaginal dysbiosis (CST IV, depletion of <em>L. crispatus</em>) is a modifiable risk factor: microbiome screening in the second trimester opens a window for prevention.</li>' +
    '<li><strong>Bacterial vaginosis</strong> — the most common vaginal pathology of women of reproductive age; recurrence after metronidazole reaches 50%. The move from subjective microscopy (Nugent score) to molecular profiling is a need that sequencing fulfils.</li>' +
    '<li><strong>The HIV and HPV link</strong> — vaginal dysbiosis increases susceptibility to HIV and hinders HPV clearance, so microbiome status is not only gynaecology but also cancer and STI prevention.</li>' +
    '<li><strong>Decentralisation of screening</strong> — self-collected samples and rapid analysis on Flongle make microbiome testing available in the outpatient setting, without a stationary sequencing laboratory.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://hmpdacc.org/">Human Microbiome Project — vaginal microbiome (NIH HMP)</a></li>' +
    '<li>📄 <a href="https://www.pnas.org/">Ravel et al. — Vaginal microbiome of reproductive-age women (PNAS, CST I–V)</a></li>' +
    '<li>📄 <a href="https://www.science.org/journal/stm">DiGiulio et al. — Temporal and spatial variation of the human microbiota during pregnancy (Science Translational Medicine)</a></li></ul>';

  /* ── HYPERVIRULENT KLEBSIELLA (hvKP) ── */
  EN['/hvkp/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hvkp.svg" alt="Hypervirulent Klebsiella pneumoniae (hvKP)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Hypervirulent Klebsiella pneumoniae (hvKP)</h1>' +
    '<p style="font-size:1.2em;color:#555">Hypervirulence markers, K1/K2 capsular serotype, MLST and convergence with carbapenem resistance — from a single assay</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Hypervirulent Klebsiella pneumoniae (hvKP)</strong> is a variant of K. pneumoniae that causes primary pyogenic liver abscesses with metastatic spread (endophthalmitis, meningitis, lung and soft-tissue abscesses) in immunocompetent patients. It is characterised by capsular serotypes <strong>K1/K2</strong>, the dominant sequence type <strong>ST23</strong>, and the hypermucoviscous phenotype (positive string test). The key risk factor is diabetes mellitus.</p>' +
    '<p>Virulence is determined by a large <strong>pLVPK-type plasmid</strong> (~200 kb): its markers are the capsule regulators <strong>rmpA/rmpA2</strong>, the aerobactin locus (<strong>iucA/iutA</strong> — the most specific hvKP marker), salmochelin <strong>iroB</strong> and the metabolic marker <strong>peg-344</strong>. The plasmid is rich in repeats and IS elements, so short reads cannot assemble it — this is the main advantage of nanopore sequencing: long reads deliver the complete structure of virulence and resistance plasmids, a hybrid/T2T assembly and, simultaneously, MLST, capsular type (wzi, Kaptive) and the resistome.</p>' +
    '<p>Our pipeline answers the central question of infection control: <strong>convergence of hypervirulence and carbapenem resistance</strong>. Outbreaks of ST11 CR-hvKP (blaKPC-2) with high mortality in Chinese hospitals have shown that tracking such convergent strains is a priority task.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: culture, ascitic/puncture fluid, blood. Optimal: whole-genome sequencing of the isolate or targeted/metagenomic enrichment.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician and epidemiologist — hvKP/cKP verdict, capsular serotype and wzi allele, ST (MLST), pLVPK virulence marker profile, resistome and convergent-risk assessment.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Virulence Markers and Typing</h2>' +
    '<h3>Virulence plasmid (pLVPK type)</h3>' +
    tbl(['Marker', 'Function', 'Significance'], [
      ['<strong>rmpA / rmpA2</strong>', 'Capsule synthesis regulator', 'Hypermucoviscous phenotype; frameshift mutations reduce detection sensitivity'],
      ['<strong>iucA (iutA)</strong>', 'Aerobactin synthesis', '"Gold standard" hvKP definition — the most specific marker'],
      ['<strong>peg-344</strong>', 'Metabolic marker', 'Highly specific plasmid marker of hypervirulence'],
      ['<strong>iroB</strong>', 'Salmochelin cluster', 'Plasmid virulence marker']
    ]) +
    '<h3>Typing and convergence with resistance</h3>' +
    tbl(['Locus', 'Markers', 'Significance'], [
      ['<strong>wzi / capsular locus</strong>', 'K1, K2 (Kaptive)', 'Capsular serotype — K1/K2 are associated with liver abscesses and endophthalmitis'],
      ['<strong>MLST</strong>', '<strong>ST23</strong> — classic hvKP; <strong>ST11</strong> — CR-hvKP', 'ST11 CR-hvKP — cause of nosocomial outbreaks in China'],
      ['<strong>Carbapenemases</strong>', '<strong>blaKPC-2</strong>, <strong>blaNDM</strong>', 'Convergence of hypervirulence and resistance — an infection control priority']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq hvKP Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>hvKP-Classify</strong>', 'Discrimination of hvKP vs classical cKP from the virulence marker panel'],
      ['<strong>Convergence-Detector</strong>', 'Prediction of convergent strains (virulence + carbapenem resistance)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (references: K. pneumoniae chromosome and pLVPK plasmid)'],
      ['<strong>3. Variant Calling</strong>', '<code>medaka</code>, <code>clair3</code>'],
      ['<strong>4. Typing</strong>', '<code>mlst</code> (Pasteur/BIGSdb scheme), <code>Kaptive</code> (capsular locus, wzi)'],
      ['<strong>5. Virulence and resistome annotation</strong>', 'Custom marker database (rmpA/rmpA2, iucA, iroB, peg-344) + carbapenemase database'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Endemic region</strong> — hvKP is endemic to the Asia-Pacific region (China, Taiwan, South Korea), where hvKP liver abscesses are the leading cause of pyogenic liver lesions; the strain is globalising and increasingly detected outside Asia.</li>' +
    '<li><strong>Convergence with resistance</strong> — outbreaks of ST11 CR-hvKP (blaKPC-2) with high mortality in Chinese hospitals have shown that hypervirulence and carbapenem resistance are combining; tracking such strains is an infection control priority.</li>' +
    '<li><strong>The mNGS trend</strong> — metagenomic sequencing (mNGS) is widely used in Chinese clinical practice; our pipeline fits this trend, bringing mNGS data to a strain-level conclusion.</li>' +
    '<li><strong>Clinical significance</strong> — distinguishing hvKP from classical cKP is critical for prognosis: the risk of metastatic endophthalmitis requires urgent ophthalmological care and an active search for metastatic foci.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://pubmlst.org/organisms/klebsiella-spp">PubMLST — Klebsiella spp.</a></li>' +
    '<li>📄 <a href="https://github.com/klebgenomics/Kaptive">Kaptive — capsular locus typing</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=573">NCBI Taxonomy — Klebsiella pneumoniae</a></li></ul>';

  /* ── SFTS (Dabie bandavirus) ── */
  EN['/sfts/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sfts.svg" alt="Dabie bandavirus (SFTSV) and its tick vector" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Diagnosis and Segment Analysis of the Severe Fever with Thrombocytopenia Syndrome Virus (SFTS)</h1>' +
    '<p style="font-size:1.2em;color:#555">Identification of Dabie bandavirus, complete L/M/S segment analysis, phylogenetics and reassortment tracking — from a single metagenomic assay</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Dabie bandavirus</strong> (formerly SFTS virus, SFTSV) is a segmented enveloped virus of the <em>Phenuiviridae</em> family (order <em>Bunyavirales</em>), the causative agent of severe fever with thrombocytopenia syndrome. The genome consists of three negative-sense and ambisense single-stranded RNA segments: <strong>L</strong> (~6.3 kb, RNA-dependent RNA polymerase RdRp), <strong>M</strong> (~3.3 kb, glycoproteins Gn/Gc — the main target of neutralising antibodies) and <strong>S</strong> (~1.7 kb, nucleoprotein N and the non-structural protein NSs — an interferon-response antagonist, encoded in ambisense orientation). The virus is transmitted mainly by the tick <em>Haemaphysalis longicornis</em>; foci are located in eastern and central China (Henan, Shandong, Anhui, Hubei, Jiangsu provinces), as well as Japan and South Korea.</p>' +
    '<p>The clinical picture is fever, thrombocytopenia, leukopenia, gastrointestinal symptoms, haemorrhages and multi-organ failure; case fatality reaches 10–30% in different case series. Human-to-human transmission through contact with the blood and secretions of patients has been described (including among medical staff and family members). There is no specific therapy and no licensed vaccine; ribavirin is ineffective, favipiravir was studied in Japan.</p>' +
    '<p>In the acute phase viraemia is high, and the virus is confidently detected by direct sequencing: it is clinical metagenomic sequencing (mNGS), widely deployed in China, that most often yields the diagnosis of SFTS in cases of unclear fever. Our pipeline implements <strong>point-of-care nanopore mNGS in a district hospital of an endemic region</strong>: long reads cover entire segments almost completely, making it possible not only to identify the virus but also to perform L/M/S segment analysis, phylogenetics and tracking of segment reassortment between lineages, and to differentiate SFTS from other haemorrhagic fevers and rickettsioses. A MinION with a Flongle adapter gives fast time-to-answer and field deployment in a county hospital setting.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: plasma/serum or whole blood in the acute phase. Optimal: metagenomic sequencing with ribosomal RNA/host background depletion <strong>or</strong> targeted enrichment of the L/M/S segments.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — identification of Dabie bandavirus, coverage and consensuses of the L/M/S segments, genetic lineage and signs of reassortment, and a differential panel of other fever pathogens.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: V — (−)ssRNA, negative-sense single-stranded RNA</h2>' +
    '<p>Like influenza, SFTSV belongs to Class V: its genome is negative-sense single-stranded RNA, which cannot be translated directly, so the virus brings its own RdRp into the cell to synthesise (+)strand mRNAs. The genome is divided into <strong>three segments</strong>: <strong>L</strong> encodes the RdRp itself, <strong>M</strong> the envelope glycoproteins Gn/Gc, and <strong>S</strong> the nucleocapsid protein N. A textbook subtlety: the S segment of bunyaviruses uses an <strong>ambisense</strong> strategy — the N protein is encoded on the viral (−)strand, while the non-structural protein NSs is encoded in the opposite (+)orientation, meaning that translating both proteins requires RNAs of both polarities. Segmentation, as in influenza, opens the door to reassortment — the exchange of L/M/S segments between lineages, which the pipeline tracks via discordant segment phylogenies.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['I', 'dsDNA', 'DNA → mRNA (like the host cell)', 'Herpesviruses, adenoviruses, smallpox, ASFV'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['IV', '(+)ssRNA', 'Genome = mRNA, immediate translation', 'SARS-CoV-2, hepatitis C'],
      ['<strong>V</strong>', '<strong>(−)ssRNA</strong>', '<strong>First the (+)strand is synthesised (RdRp)</strong>', '<strong>Influenza, SFTS, rabies</strong>'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Genomic Markers and Clinical Significance</h2>' +
    '<h3>Segment analysis</h3>' +
    tbl(['Segment', 'Proteins', 'Significance'], [
      ['<strong>L</strong> (~6.3 kb)', 'RdRp', 'Basis of phylogenetics and genotyping; the viral replication machinery'],
      ['<strong>M</strong> (~3.3 kb)', 'Gn/Gc', 'Neutralisation and antigenicity; target of vaccine design and serology'],
      ['<strong>S</strong> (~1.7 kb)', 'N', 'Main target of molecular and serological diagnostics'],
      ['<strong>S</strong> (ambisense)', 'NSs', 'Virulence factor: interferon-response antagonist; associated with disease severity']
    ]) +
    '<h3>Evolution and differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>Segment reassortment</strong>', 'Exchange of L/M/S segments between virus lineages — a key evolutionary mechanism of bunyaviruses; discordant segment phylogeny = sign of reassortment'],
      ['<strong>HFRS (hantaviruses)</strong>', 'Haemorrhagic fever with renal syndrome — the most important item of the differential panel in the same area'],
      ['<strong>CCHF</strong>', 'Crimean-Congo haemorrhagic fever — a tick-borne nairovirus with overlapping clinical presentation and epidemiology'],
      ['<strong>Rickettsioses</strong>', 'Tick-borne rickettsioses (including spotted fevers) — a frequent cause of "unclear fever after a tick bite"'],
      ['<strong>Leptospirosis</strong>', 'Fever with thrombocytopenia and multi-organ involvement — considered in the metagenomic report'],
      ['<strong>Haemophagocytic syndrome (HLH)</strong>', 'A severe complication of SFTS; it is important to distinguish virus-associated HLH from primary HLH']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq SFTS Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>SFTS-Classifier</strong>', 'Identification of Dabie bandavirus and assignment of reads to the L/M/S segments'],
      ['<strong>SFTS-Reassort</strong>', 'Reassortment detection from discordance of segment phylogenies'],
      ['<strong>FeverDiff-Panel</strong>', 'Pathogen differentiation in the "unclear fever" panel (hantaviruses, rickettsiae, leptospires)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Host background depletion</strong>', '<code>minimap2</code> against the human genome + filtering'],
      ['<strong>3. Alignment (Mapping)</strong>', '<code>minimap2</code> (reference panel of L/M/S segments + differential panel)'],
      ['<strong>4. Consensus (Variant/Consensus Calling)</strong>', '<code>clair3</code>, <code>medaka</code> — segment consensuses accounting for quasispecies diversity'],
      ['<strong>5. Phylogenetics</strong>', 'Multiple alignment (<code>mafft</code>), phylogenetic analysis (<code>IQ-TREE</code>), Nextclade-like lineage classification; comparison of segment trees for reassortment detection'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>WHO priority</strong> — SFTS is on the WHO R&D Blueprint priority list: diseases with epidemic potential for which no effective countermeasures exist (no specific therapy and no licensed vaccine).</li>' +
    '<li><strong>Endemic foci</strong> — thousands of SFTS cases are registered annually in China; the disease circulates steadily in the eastern and central provinces, as well as in Japan and South Korea, where fatal outbreaks have occurred.</li>' +
    '<li><strong>Vector range expansion</strong> — <em>Haemaphysalis longicornis</em> is capable of parthenogenesis alongside sexual reproduction, which accelerates its spread; the tick has already been introduced into the USA and Australia. The virus itself has not yet become established outside East Asia, but the expanding vector range demands diagnostic readiness.</li>' +
    '<li><strong>Nosocomial risk</strong> — human-to-human transmission through contact with the blood and secretions of patients has been described (cases among medical staff and families), so rapid point-of-care diagnostics directly affects anti-epidemic measures.</li>' +
    '<li><strong>mNGS as a standard</strong> — clinical metagenomic sequencing is widely deployed in China, and it is mNGS that most often detects SFTSV in unclear fever; the nanopore platform makes this approach accessible at the district-hospital level in endemic regions.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/teams/blueprint">WHO — R&D Blueprint for Action to Prevent Epidemics</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/datasets/taxonomy/1936904/">NCBI Taxonomy — Dabie bandavirus</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/vspb/">CDC — Viral Special Pathogens Branch</a></li></ul>';

  /* ── RICE BLAST (Magnaporthe oryzae) ── */
  EN['/magnaporthe/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_magnaporthe.svg" alt="Magnaporthe oryzae" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Rice Blast — Magnaporthe oryzae</h1>' +
    '<p style="font-size:1.2em;color:#555">Field diagnostics of rice blast with Avr-effector and fungicide-sensitivity profiles — in hours, right on the rice field</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Magnaporthe oryzae</em> (syn. <em>Pyricularia oryzae</em>) is an ascomycete, the causative agent of rice blast — the most devastating rice disease in the world. Annual yield losses from blast are estimated at 10–30% — enough grain to feed tens of millions of people. China, the largest rice producer in the world, regards rice blast as threat No. 1 for rice cultivation.</p>' +
    '<p>The species includes several pathotypes: the rice pathotype (<em>Oryza</em>) and the <em>Triticum</em> pathotype — the causative agent of "wheat blast", which emerged in South America and was introduced into Bangladesh (2016) and Africa. Differentiation of pathotypes is critical for quarantine control.</p>' +
    '<p>The pathogen population evolves very fast: resistant rice varieties (with <strong>Pi</strong> genes) are "broken" within a few years. This is why constant monitoring of races and the effector repertoire right in the field is needed. Avirulence genes (<strong>Avr</strong> effectors: <em>Avr-Pita</em>, <em>Avr-Pik</em>, <em>Avr-Piz-t</em>, <em>Avr-Pii</em> and others) determine which Pi genes still work against the local race. Effector genes often lie in subtelomeric regions among repeats and transposons — short reads resolve them poorly, whereas <strong>ONT long reads deliver complete assembly and phasing</strong> of these loci.</p>' +
    '<p>Our pipeline performs <strong>metagenomic and targeted nanopore sequencing</strong> of affected rice leaves and nodes directly in the field (Flongle chips). Within a few hours the agronomist receives species and pathotype identification, the <strong>Avr-effector profile</strong> (a recommendation for choosing a resistant variety), the <strong>fungicide-sensitivity profile</strong> (a recommendation for the fungicide programme) and data for monitoring the migration of pathogen lineages.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: affected rice leaves and nodes, tissue homogenate.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist — species and pathotype of the causative agent, Avr-effector profile, fungicide sensitivity and crop-protection recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🧩 Pipeline Architecture</h2>' +
    '<ol><li><strong>Species and pathotype identification</strong> — classification of reads against reference databases; differentiation of the rice pathotype (<em>Oryza</em>) and the wheat pathotype (<em>Triticum</em>, wheat blast).</li>' +
    '<li><strong>De novo assembly on long reads</strong> — full-length reconstruction of subtelomeric Avr-effector loci inaccessible to short reads.</li>' +
    '<li><strong>Avr-effector profiling</strong> — allelic composition of <em>Avr-Pita</em>, <em>Avr-Pik</em>, <em>Avr-Piz-t</em>, <em>Avr-Pii</em> and other avirulence genes → prediction of the functionality of varietal Pi genes.</li>' +
    '<li><strong>Fungicide target screening</strong> — search for polymorphisms in the target genes of MBI, DMI and kasugamycin.</li>' +
    '<li><strong>Phylogenetics and lineage monitoring</strong> — tracking the migration of races and clonal lineages between regions.</li></ol>' +
    '<p>The entire pipeline is implemented in <strong>Snakemake</strong> and distributed as a Docker container via the <code>harbor.onsiteseq.io</code> registry.</p><hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Target gene', 'Mechanism', 'Fungicide (class)'], [
      ['<strong>Scytalone dehydratase</strong> (melanin biosynthesis)', 'Target polymorphisms', 'Carpropamid and others (MBI-D)'],
      ['<strong>CYP51</strong> (sterol 14α-demethylase)', 'Target polymorphisms', 'Triazoles (DMI: tebuconazole, propiconazole)'],
      ['<strong>Ribosomal targets</strong>', 'Target polymorphisms', 'Kasugamycin (antibiotic, widely used in Asia)'],
      ['<strong>Cytb</strong> (cytochrome b)', 'Sensitivity monitoring', 'Strobilurins / QoI (azoxystrobin)']
    ]) +
    '<p>The pipeline monitors sensitivity to MBI, DMI, kasugamycin and strobilurins from target-gene sequencing data. Please note: the classic QoI mutation <strong>G143A</strong> is atypical for <em>M. oryzae</em> — its cytochrome b carries an intron next to codon 143, so interpretation relies on a complete target analysis rather than a single codon.</p><hr>' +
    '<h2>🌾 Race and Avr-Effector Monitoring</h2>' +
    tbl(['Avirulence gene', 'Corresponding rice resistance gene', 'Practical significance'], [
      ['<strong>Avr-Pita</strong>', 'Pi-ta', 'Loss of the Avr-Pita allele → varieties with Pi-ta lose resistance'],
      ['<strong>Avr-Pik</strong>', 'Pik', 'The Avr-Pik allelic series determines the spectrum of working Pik alleles'],
      ['<strong>Avr-Piz-t</strong>', 'Piz-t', 'Monitoring resistance erosion of varieties with Piz-t'],
      ['<strong>Avr-Pii</strong>', 'Pii', 'Assessment of Pii effectiveness against the local population']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Food security</strong> — rice blast destroys 10–30% of the world rice harvest annually, and rice is the staple food for half of humanity.</li>' +
    '<li><strong>China</strong> — the largest rice producer in the world; rice blast there is threat No. 1 for rice cultivation, and intensive monitoring of pathogen populations is underway.</li>' +
    '<li><strong>Wheat blast</strong> — the <em>Triticum</em> pathotype as a quarantine threat: after South America it was introduced into Bangladesh (2016) and Africa; rapid pathotype differentiation is required at borders.</li>' +
    '<li><strong>Climate-driven range expansion</strong> — warming is shifting the boundaries of rice-blast risk zones into new rice-growing regions.</li>' +
    '<li><strong>Rapid erosion of varietal resistance</strong> — resistant varieties are "broken" within a few years, so field race monitoring must be continuous.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Magnaporthe oryzae</a></li>' +
    '<li>📄 <a href="https://www.fao.org/">FAO — Food and Agriculture Organization of the UN (rice)</a></li>' +
    '<li>📄 <a href="https://www.irri.org/">IRRI — International Rice Research Institute</a></li></ul>';

  /* ── CITRUS HUANGLONGBING (HLB) ── */
  EN['/hlb/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hlb.svg" alt="Citrus Huanglongbing (HLB)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Citrus Huanglongbing — <i>Candidatus</i> Liberibacter asiaticus</h1>' +
    '<p style="font-size:1.2em;color:#555">Field molecular diagnostics of citrus greening with strain typing and prophage profiling — in hours, right in the regional agricultural laboratory</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Candidatus</em> Liberibacter asiaticus (CLas) is a Gram-negative α-proteobacterium, an obligate parasite of citrus phloem and the causative agent of huanglongbing (HLB, citrus greening) — the most devastating disease of world citriculture. The key biological feature of CLas: the pathogen <strong>cannot be cultured on artificial media</strong>, so neither classical microbiology nor rapid microscopic tests work — diagnostics and surveillance are possible <strong>only by molecular methods</strong>.</p>' +
    '<p>The disease is spread by a vector — the Asian citrus psyllid <em>Diaphorina citri</em> (for the African pathogen species — the African psyllid <em>Trioza erytreae</em>). Characteristic symptoms: <strong>asymmetric blotchy mottling of the leaves</strong> (blotchy mottle), asymmetric underdeveloped fruits that remain green at the peduncle (hence "greening", citrus greening), bitter fruits and premature fruit drop. The tree declines and dies within a few years. <strong>No cure exists</strong> — the only working strategy is early detection → removal of infected trees → psyllid control. That is why the speed and accessibility of diagnostics decide everything.</p>' +
    '<p>The CLas genome is compact (~1.2 Mb) with a reduced GC content. Its most important feature is the <strong>prophages</strong> (SC1, SC2, types 1/2/3): their composition is used as an epidemiological marker for strain tracking. Strain typing is based on SNP clusters and MLVA loci. Prophage regions and repeat-rich regions assemble poorly from short reads, whereas <strong>ONT long reads deliver complete prophage regions and reliable phylogenetics</strong>. A practical challenge is the low and unevenly distributed bacterial titre in the phloem, so the pipeline relies on targeted enrichment or metagenomic sequencing with host-material depletion. Samples: petioles and midribs of mottled leaves, as well as psyllids.</p>' +
    '<p>Our pipeline performs <strong>targeted and metagenomic nanopore sequencing</strong> of samples right in the regional agricultural laboratory (Flongle chips). Within a few hours the agronomist receives CLas detection, <strong>species differentiation</strong> of CLas / CLaf (African) / CLam (American) — of direct quarantine significance, <strong>SNP-cluster/lineage determination</strong> and a <strong>prophage profile</strong> (SC1/SC2) for surveillance.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: petioles and midribs of mottled leaves, tissue homogenate, psyllids.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the agronomist and the phytosanitary service — CLas detection, pathogen species (CLas/CLaf/CLam), SNP lineage, prophage profile and recommendations on quarantine measures.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🧩 Pipeline Architecture</h2>' +
    '<ol><li><strong>Pathogen identification</strong> — minimap2 alignment of reads against a reference panel of CLas / CLaf / CLam; species differentiation, quarantine-relevant identification.</li>' +
    '<li><strong>Consensus and variant calling</strong> — construction of consensus sequences (medaka / clair3) across the target panel (16S, rplKAJL, rpoB and prophage targets).</li>' +
    '<li><strong>SNP typing and lineage</strong> — assignment of the sample to a CLas SNP cluster / epidemiological lineage.</li>' +
    '<li><strong>Prophage profile</strong> — reconstruction of complete prophage regions (SC1, SC2, types 1/2/3) on long reads → an epidemiological marker of strain origin.</li>' +
    '<li><strong>Phylogenetics and surveillance</strong> — building a phylogenetic tree, tracking strain migration between farms and regions.</li></ol>' +
    '<p>The entire pipeline is implemented in <strong>Snakemake</strong> and distributed as a Docker container via the <code>harbor.onsiteseq.io</code> registry.</p><hr>' +
    '<h2>🎯 Diagnostic Target Panel</h2>' +
    tbl(['Target', 'Type', 'Practical significance'], [
      ['<strong>16S rRNA</strong>', 'Conserved locus', 'Liberibacter detection at genus and species level'],
      ['<strong>rplKAJL–rpoB</strong> (ribosomal operon)', 'Gene panel', 'Species differentiation of CLas / CLaf / CLam'],
      ['<strong>Prophage targets (SC1, SC2)</strong>', 'Prophage regions', 'Epidemiological marker, strain tracking'],
      ['<strong>SNP panel / MLVA loci</strong>', 'Polymorphisms', 'Strain typing, lineage, outbreak cluster analysis']
    ]) +
    '<p>The pipeline differentiates the three huanglongbing pathogen species: Asian (CLas), African (<em>Candidatus</em> Liberibacter africanus, CLaf) and American (<em>Candidatus</em> Liberibacter americanus, CLam) — species discrimination is critical for quarantine decisions, since their ranges and vectors differ.</p><hr>' +
    '<h2>🦠 Vectors and Monitoring Objects</h2>' +
    tbl(['Object', 'Role', 'What sequencing provides'], [
      ['<strong>Leaves with blotchy mottle</strong>', 'Plant diagnostic sample', 'CLas detection in the phloem, strain typing'],
      ['<strong>Asian psyllid <em>Diaphorina citri</em></strong>', 'Main CLas vector', 'Advance monitoring of vector infection before symptoms appear'],
      ['<strong>African psyllid <em>Trioza erytreae</em></strong>', 'Vector of CLaf (and of CLas in some regions)', 'Pathogen species differentiation in the vector–plant complex']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>China</strong> — the largest citrus producer in the world; huanglongbing is endemic to southern China (Guangxi, Guangdong, Fujian, Jiangxi), and Guangxi is the main mandarin-producing region. HLB monitoring there is a task of national scale.</li>' +
    '<li><strong>Florida</strong> — since the mid-2000s HLB has devastated the state citrus industry: orange production collapsed by tens of percent, and the industry has not recovered to this day.</li>' +
    '<li><strong>Brazil</strong> — the disease pressures the São Paulo citrus belt, the world\'s largest orange-juice export region.</li>' +
    '<li><strong>No cure and no resistant varieties</strong> — no commercial citrus varieties with full HLB resistance exist, so the entire strategy is built on early detection, tree removal and psyllid control.</li>' +
    '<li><strong>Quarantine object</strong> — huanglongbing pathogens are quarantine organisms for a number of countries, including the EU; rapid species differentiation at borders and in new foci has direct phytosanitary significance.</li></ul><hr>' +
    '<h2>🔬 Related Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Candidatus Liberibacter asiaticus</a></li>' +
    '<li>📄 <a href="https://www.aphis.usda.gov/">USDA APHIS — Citrus Greening / Huanglongbing</a></li>' +
    '<li>📄 <a href="https://www.cabidigitallibrary.org/">CABI Invasive Species Compendium — huanglongbing datasheet</a></li></ul>';

  /* ── THALASSEMIA ── */
  EN['/thalassemia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_thalassemia.svg" alt="Thalassemia — inherited haemoglobinopathies" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Diagnosis of Thalassemias and Inherited Haemoglobinopathies</h1>' +
    '<p style="font-size:1.2em;color:#555">HBA cluster deletions, HBB mutations and their phasing — one long-read assay instead of the gap-PCR + MLPA + Sanger combination</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Thalassemias</strong> are inherited disorders of haemoglobin globin-chain synthesis: <strong>α-thalassemia</strong> (the <em>HBA1/HBA2</em> gene cluster on chromosome 16) and <strong>β-thalassemia</strong> (the <em>HBB</em> gene on chromosome 11). Severe forms — Hb H disease, Hb Bart\'s hydrops fetalis (the --/-- state of the α genes) and β-thalassemia major with lifelong transfusion dependence and iron overload — form one of the most significant burdens of inherited disease in the world.</p>' +
    '<p>Thalassemia diagnostics has historically been fragmented: α-deletions are caught by gap-PCR, deletions and duplications by MLPA, and point mutations of <em>HBB</em> by Sanger sequencing. The reason lies in the genetics of the locus itself: in <strong>α-thalassemia</strong>, <strong>large deletions</strong> predominate (--SEA, -α3.7, -α4.2, --MED, --THAI and others), and the <em>HBA</em> cluster contains highly homologous duplicates and pseudogenes, so short-read NGS fundamentally cannot resolve this region. In <strong>β-thalassemia</strong>, point mutations of <em>HBB</em> form the basis — in China most often CD41-42 (-TTCT), IVS-II-654 (C&gt;T), CD17 (A&gt;T), -28 (A&gt;G) and CD71-72.</p>' +
    '<p><strong>Oxford Nanopore long reads</strong> solve the task in a single assay — LR-PCR amplicons across the <em>HBA/HBB</em> loci or targeted enrichment / adaptive sampling allow: (1) direct detection of large deletions and determination of their exact breakpoints, (2) resolution of <em>HBA1/HBA2</em> homology, (3) phasing of mutations (cis/trans), (4) simultaneous detection of <em>HBB</em> point variants. Published studies show complete agreement of the ONT approach with the gap-PCR/MLPA/Sanger combination — while replacing 3–4 separate tests with one.</p>' +
    '<p>Our pipeline delivers a unified genomic passport: α-deletions and non-deletional variants, <em>HBB</em> mutations, haplotype phasing and a ready-made interpretation for genetic counselling.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: genomic DNA from blood (including chorionic villi / amniocentesis for prenatal diagnosis). Optimal: long-read amplicons (LR-PCR) of the <em>HBA</em> and <em>HBB</em> loci <strong>or</strong> targeted enrichment / adaptive sampling.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the physician — genotype at the α and β loci (deletions, point variants, phasing), interpretation of carrier status and risks for the couple, and a conclusion for prenatal / preimplantation (PGT-M) diagnosis.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Detectable Variants and Clinical Markers</h2>' +
    '<h3>α-thalassemia: deletions and non-deletional variants of the HBA cluster</h3>' +
    tbl(['Variant', 'Type', 'Significance'], [
      ['<strong>--SEA</strong>', 'α⁰ deletion', 'The most frequent α⁰ deletion in Southeast Asia and Southern China; carrier status in both partners — risk of Hb Bart\'s hydrops fetalis'],
      ['<strong>-α3.7</strong>', 'α⁺ deletion', 'The most frequent α deletion in the world; the -α3.7/-- combination — Hb H disease'],
      ['<strong>-α4.2</strong>', 'α⁺ deletion', 'A frequent α⁺ deletion; clinically significant in combination with α⁰ deletions'],
      ['<strong>--MED, --THAI</strong> and others', 'α⁰ deletions', 'Regional variants; exact breakpoints are determined by direct reading of long reads'],
      ['<strong>Hb Constant Spring</strong> (HBA2:c.427T&gt;C)', 'Non-deletional', 'An elongated unstable α-globin; a frequent component of non-deletional Hb H disease'],
      ['<strong>Hb Quong Sze</strong> and others', 'Non-deletional', 'Rare non-deletional variants not detectable by gap-PCR']
    ]) +
    '<h3>β-thalassemia and haemoglobinopathies (HBB gene)</h3>' +
    tbl(['Variant', 'Type', 'Significance'], [
      ['<strong>CD41-42 (-TTCT)</strong>', 'β⁰', 'The most frequent β-thalassemia mutation in China'],
      ['<strong>IVS-II-654 (C&gt;T)</strong>', 'β⁺', 'Second most frequent in China; splicing defect'],
      ['<strong>CD17 (A&gt;T)</strong>', 'β⁰', 'A frequent nonsense mutation in Southern China'],
      ['<strong>-28 (A&gt;G)</strong>', 'β⁺', 'Promoter mutation, mild phenotype'],
      ['<strong>CD71-72 (+A)</strong>', 'β⁰', 'A frequent variant in Southeast Asia'],
      ['<strong>Hb E</strong> (HBB:c.79G&gt;A)', 'Structural variant + β⁺', 'A very frequent mutation in Southeast Asia; the Hb E/β-thalassemia combination is a severe disease'],
      ['<strong>HPFH / δβ-thalassemia deletions</strong>', 'Large deletions', 'Hereditary persistence of fetal haemoglobin; compensates the severity of β-thalassemia, important for prognosis']
    ]) +
    '<h3>Phasing (cis/trans)</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>Haplotype phasing of the α/β loci</strong>', 'Long reads determine whether mutations lie on the same or on different chromosomes — critical for prognosis (e.g. cis- vs trans-position of two α⁺ defects)']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Thalassemia Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>THAL-SV-Caller</strong>', 'Classification of HBA-cluster deletions/duplications from the coverage profile and split-reads'],
      ['<strong>THAL-Interpreter</strong>', 'Interpretation of the α+β genotype: carrier status, phenotype severity, risk for the couple']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (homologous HBA/HBB cluster, specialised locus references)'],
      ['<strong>3. Variant Calling (SNV/Indel)</strong>', '<code>clair3</code>, <code>medaka</code> — point variants and small indels of HBB, non-deletional α variants'],
      ['<strong>4. CNV/SV analysis (deletions)</strong>', 'Specialised module: coverage profile + split-reads; <code>Sniffles2</code>, <code>cuteSV</code> — exact deletion breakpoints'],
      ['<strong>5. Phasing</strong>', '<code>WhatsHap</code> — cis/trans configuration of variants from long reads'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context: Why It Matters</h2>' +
    '<ul><li><strong>WHO</strong> — haemoglobinopathies (thalassemias and sickle-cell disease) are classified as a growing global burden of inherited disease: hundreds of thousands of children are born annually with severe forms, and migration of carriers expands the demand for diagnostics beyond the traditional regions.</li>' +
    '<li><strong>The carrier belt</strong> — the Mediterranean, the Middle East, South and Southeast Asia. In Southern China (Guangxi, Guangdong, Yunnan, Hainan) carrier frequency locally reaches ~10–20% — thalassemias are among the leading inherited diseases of the region.</li>' +
    '<li><strong>Prevention programmes</strong> — Cyprus and Sardinia have almost eliminated the birth of children with severe forms through mass couple screening and prenatal diagnosis; China runs state programmes of pre-pregnancy couple screening, and the experience of Guangxi is considered exemplary.</li>' +
    '<li><strong>The diagnostic gap</strong> — routine diagnostics requires the gap-PCR + MLPA + Sanger combination (several different tests per patient); a single long-read assay reduces cost, time and the risk of missing a rare variant, especially in prenatal diagnosis and PGT-M.</li>' +
    '<li><strong>Differential diagnosis</strong> — microcytic anaemia in thalassemia carriers is often mistaken for iron deficiency; molecular confirmation prevents erroneous iron therapy.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/">WHO — facts on haemoglobinopathies and thalassemias</a></li>' +
    '<li>📄 <a href="http://www.ithanet.eu/db/ithagenes">IthaGenes — haemoglobin variant database (IthaNet)</a></li>' +
    '<li>📄 <a href="https://globin.bx.psu.edu/hbvar/">HbVar — database of haemoglobin variants and thalassemias</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/gene/3043">NCBI Gene — HBB</a></li></ul>';

  /* ── C. DIFFICILE ── */
  EN['/cdifficile/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>Drug Resistance and Toxigenicity Determination of Clostridioides difficile</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic surveillance of CDI — the leading cause of antibiotic-associated colitis</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Clostridioides difficile</em> (C. diff) is a Gram-positive spore-forming anaerobe and the leading cause of antibiotic-associated diarrhoea and pseudomembranous colitis. The key clinical question: <strong>toxigenic strain or non-toxigenic</strong> (does it carry <em>tcdA/tcdB</em> genes)?</p>' +
    '<p>Our pipeline simultaneously determines: toxin gene profile (tcdA/B/C + cdtA/B for hypervirulent strains), antibiotic resistance profile, and PCR ribotype for epidemiological classification.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: stool culture or direct WGS from enriched culture.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician — toxigenicity status, full AMR profile, ribotype; QC report for bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Toxin Genes and Resistance Determinants</h2>' +
    '<h3>Toxin genes — key virulence factors</h3>' +
    tbl(['Gene', 'Toxin', 'Clinical Significance'], [
      ['<strong>tcdA</strong>', 'Toxin A (enterotoxin)', 'Classic CDI — intestinal damage, diarrhoea'],
      ['<strong>tcdB</strong>', 'Toxin B (cytotoxin)', 'Primary virulence factor — obligatory for CDI diagnosis'],
      ['<strong>tcdC</strong>', 'Negative regulator of tcdA/B', 'Deletion → hyperproduction of toxins (RT027 characteristic)'],
      ['<strong>cdtA / cdtB</strong>', 'Binary toxin CDT', 'Hypervirulent strains (RT027, RT078) — severe and recurrent CDI']
    ]) +
    '<h3>Antibiotic resistance genes</h3>' +
    tbl(['Gene / Mutation', 'Mechanism', 'Antibiotic'], [
      ['<strong>gyrA / gyrB</strong> (Thr82Ile, Asp426Asn)', 'Altered gyrase', 'Fluoroquinolones (ciprofloxacin) — key selection pressure for epidemic clones'],
      ['<strong>rpoB</strong> (His502Asn, Arg505Lys)', 'Altered RNA polymerase', 'Rifaximin (decontamination regimen)'],
      ['<strong>tetM / tetW</strong>', 'Ribosome protection', 'Tetracyclines'],
      ['<strong>ermB</strong>', '23S rRNA methylase', 'Macrolides, clindamycin'],
      ['<strong>nimB</strong>', 'Metronidazole reductase', 'Metronidazole (first-line CDI treatment)'],
      ['<strong>vanB</strong>', 'Modified cell wall target', 'Vancomycin (also first-line) — rare but critical']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq CDI Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CDI-Toxin-Classifier</strong>', 'Classification of toxin profile (tcdA/B+/-, cdtA/B+/-)'],
      ['<strong>CDI-Res-Detector</strong>', 'AMR phenotype prediction from WGS'],
      ['<strong>CDI-Ribotyper</strong>', 'In silico PCR ribotyping (RT027/RT078/RT014 and others)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code>, <code>samtools</code> (Reference: C. difficile 630)'],
      ['<strong>3. Toxin gene detection</strong>', '<code>abricate</code> (VFDB, custom toxin DB)'],
      ['<strong>4. AMR genes</strong>', '<code>AMRFinderPlus</code> (NCBI), <code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. Ribotyping</strong>', 'In silico PCR + ML classifier (RT027/RT078)'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO</strong> — C. difficile is among the most serious antibiotic-associated infectious threats globally; RT027/NAP1/BI — the pandemic hypervirulent clone.</li>' +
    '<li><strong>Russia</strong> — CDI is underdiagnosed; widespread use of fluoroquinolones and cephalosporins drives selection of epidemic clones.</li>' +
    '<li><strong>Bezlotoxumab (Zinplava)</strong> — monoclonal antibody against toxin B for recurrent CDI prevention; requires confirmed toxin B for indication.</li>' +
    '<li><strong>Other clostridia</strong> — see our pipeline for <a href="/perfringens/">Clostridium perfringens</a>: gas gangrene where every hour counts, toxinotyping (cpa/cpb/etx/cpe/netB) and urgent AMR profiling.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789241509763">WHO — C. difficile surveillance and infection control</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — Comprehensive Antibiotic Resistance Database</a></li>' +
    '<li>📄 <a href="https://www.genomicepidemiology.org/">Center for Genomic Epidemiology — typing tools</a></li></ul>';

  /* ── CLOSTRIDIUM PERFRINGENS (gas gangrene) ── */
  EN['/perfringens/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_perfringens.svg" alt="Clostridium perfringens — spore-forming rod" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Toxinotyping and Antimicrobial Resistance of Clostridium perfringens</h1>' +
    '<p style="font-size:1.2em;color:#555">Toxinotype (A–G), AMR profile and clostridia differentiation — in hours, when every hour counts</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Clostridium perfringens</em> is a Gram-positive anaerobic spore-forming rod (the name <em>perfringens</em> — "bursting through" tissues) and the causative agent of <strong>~95% of gas gangrene cases</strong> (clostridial myonecrosis). It is a fulminant infection: symptoms develop <strong>1–6 hours</strong> after trauma, necrosis spreads through muscle at up to <strong>~15 cm/hour</strong>, untreated lethality is <strong>67–100%</strong>, and most deaths occur within the <strong>first 24 hours</strong>. With such a course there is no time for culture-based diagnostics (days) or for "trial" antibiotic therapy — the result is needed the same day, in the emergency department of a trauma centre.</p>' +
    '<p>From nanopore sequencing data our pipeline determines the <strong>toxinotype (A–G)</strong> from the toxin gene profile, <strong>species identification</strong> with differentiation from <em>C. septicum</em> (the agent of spontaneous gangrene with even higher lethality) and other clostridia, and the <strong>AMR profile</strong> — a genomic answer for the surgeon and intensivist in hours, not days.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: wound discharge, aspirate from the lesion, stool. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the point-of-care scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the surgeon/intensivist — species identification, toxinotype, susceptibility profile with an empirical regimen recommendation; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Toxins, Identification, Resistance</h2>' +
    '<h3>Toxin genes and toxinotypes</h3>' +
    '<p>The toxinotype is defined by the toxin gene profile — the key clinical question in suspected clostridial infection:</p>' +
    tbl(['Gene', 'Toxin', 'Significance'], [
      ['<strong>cpa</strong>', 'α-toxin (phospholipase C)', 'Main factor of myonecrosis in gas gangrene; present in all types'],
      ['<strong>cpb</strong>', 'β-toxin', 'Necrotising enteritis (types B, C)'],
      ['<strong>etx</strong>', 'ε-toxin', 'One of the most toxic bacterial proteins (types B, D)'],
      ['<strong>iap / ibp</strong>', 'ι-toxin (binary)', 'Components of ι-toxin (type E)'],
      ['<strong>cpe</strong>', 'CPE enterotoxin', 'Food poisoning and antibiotic-associated diarrhoea (types A, F)'],
      ['<strong>netB</strong>', 'NetB toxin', 'Necrotic enteritis of poultry (type G)']
    ]) +
    '<h3>Toxinotypes and clinical forms</h3>' +
    tbl(['Type', 'Toxins', 'Clinical Significance'], [
      ['<strong>A</strong>', 'cpa', '<strong>Gas gangrene</strong> and food poisoning — the most common type in humans'],
      ['<strong>C</strong>', 'cpa, cpb', 'Necrotising enteritis ("pigbel")'],
      ['<strong>F</strong>', 'cpa, cpe', 'CPE-associated food poisoning and antibiotic-associated diarrhoea'],
      ['<strong>G</strong>', 'cpa, netB', 'Necrotic enteritis of poultry — veterinary significance']
    ]) +
    '<h3>Species identification and differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>tpi</strong> (triose phosphate isomerase)', 'Species-specific identification of <em>C. perfringens</em>'],
      ['<strong>16S rRNA</strong>', 'Differentiation from <em>C. septicum</em> (spontaneous gangrene, often against a background of neutropenia and GI tumours), <em>C. novyi</em>, <em>C. sordellii</em> and other clostridia']
    ]) +
    '<h3>Resistance genes</h3>' +
    '<p>Traditionally <em>C. perfringens</em> is susceptible to penicillin and clindamycin, but <strong>multidrug-resistant (MDR) strains</strong> have been described; in a fulminant course, urgent susceptibility determination directly affects the outcome, and an MDR profile requires switching to carbapenems.</p>' +
    tbl(['Gene', 'Antibiotic Class', 'Clinical Significance'], [
      ['<strong>tet(A) / tet(W) / tet(M)</strong>', 'Tetracyclines', 'Frequent resistance, especially in isolates of animal origin'],
      ['<strong>ermB</strong>', 'Macrolides, <strong>clindamycin</strong> (MLSB)', 'Critical: clindamycin is a first-line component (suppresses toxin synthesis)'],
      ['<strong>bla</strong>', 'β-lactams', 'Risk of penicillin G failure'],
      ['<strong>cat</strong>', 'Chloramphenicol', 'Epidemiological marker'],
      ['<strong>floR</strong>', 'Florfenicols', 'Marker of veterinary-origin isolates']
    ]) +
    '<h3>Empirical therapy in the report</h3>' +
    tbl(['Clinical Form', 'Approach', 'Role of Genomics'], [
      ['<strong>Gas gangrene</strong>', 'Surgical debridement + penicillin G + <strong>clindamycin</strong> (suppresses toxin synthesis)', 'ermB/bla profile → regimen correction without losing time'],
      ['<strong>Food poisoning</strong>', 'Self-limiting (CPE; meat and meat products, the "danger zone" 5–60 °C)', 'cpe confirmation, outbreak epidemiological typing'],
      ['<strong>Necrotising enteritis</strong>', 'Antibiotics ± surgery', 'Confirmation of cpb-positive type C']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Perfringens Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CPF-Tox-Typer</strong>', 'Toxinotyping (A–G) from the cpa/cpb/etx/iap/cpe/netB gene profile'],
      ['<strong>CPF-Res-Detector</strong>', 'Resistance profile prediction from genomic data'],
      ['<strong>CPF-Species-ID</strong>', 'Differentiation of <em>C. perfringens</em> from <em>C. septicum</em> and other clostridia']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — clostridia reference panel (<em>C. perfringens</em>, <em>C. septicum</em>, <em>C. novyi</em> and others)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Toxin and AMR gene detection</strong>', 'Custom toxin and resistance gene database, compatible with CARD/ResFinder'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Every hour counts</strong> — gas gangrene in trauma and wounds remains a fulminant infection: spread ~15 cm/hour, untreated lethality 67–100%, most deaths within the first 24 hours. Point-of-care sequencing on an Edge unit in the trauma centre emergency department cuts the time to a genomic answer from days to hours.</li>' +
    '<li><strong>Food poisoning</strong> — <em>C. perfringens</em> is one of the most common causes of bacterial foodborne infection: CDC estimates about one million cases per year in the USA alone. Rapid typing of cpe-positive strains is essential for outbreak investigation in catering.</li>' +
    '<li><strong>MDR trend</strong> — multidrug resistance is increasingly described in isolates of animal origin (tet, ermB, floR) and is spilling into the clinic; the empirical "penicillin + clindamycin" regimen is no longer guaranteed.</li>' +
    '<li><strong>Veterinary context</strong> — NetB-associated necrotic enteritis of poultry (type G) and ruminant enterotoxaemias (types B and D) cause significant economic damage to poultry and livestock farming; the same toxinotyping pipeline is applicable in veterinary diagnostics.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Clostridium perfringens (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Gas Gangrene / Clostridial Myonecrosis</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Clostridium perfringens (Food Safety)</a></li></ul>';

  /* ── BOTULINUM (C. botulinum) ── */
  EN['/botulinum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_botulinum.svg" alt="Clostridium botulinum — rod with a spore and a blocked synapse" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Botulinum Neurotoxin Detection and Serotyping of Clostridium botulinum</h1>' +
    '<p style="font-size:1.2em;color:#555">The bont gene, serotype (A–G), toxin cluster and its localisation — in hours, when antitoxin works only in the first hours</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Clostridium botulinum</em> is an anaerobic spore-forming rod producing <strong>botulinum neurotoxin (BoNT) — the most toxic substance known to science</strong>: the lethal dose for humans is estimated at ~1–2 ng/kg. BoNT is a protease that cleaves proteins of the <strong>SNARE complex</strong> of the nerve terminal and blocks acetylcholine release at the neuromuscular junction. Clinically this manifests as a <strong>descending symmetric flaccid paralysis</strong>: diplopia and ptosis → dysphagia and dysarthria → paralysis of the respiratory muscles and respiratory failure. The antidote — heptavalent botulinum antitoxin (BAT) — binds only circulating toxin and is effective <strong>only when given early</strong>: neurons with already internalised toxin recover over weeks. The speed of laboratory confirmation therefore directly determines the outcome.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>direct detection of the bont gene</strong>, <strong>serotyping (A–G)</strong> from the toxin target specificity, <strong>toxin cluster analysis</strong> (the <em>ntnh</em> and <em>ha</em> genes — the "progenitor toxin complex") and <strong>cluster localisation</strong> — chromosome, plasmid or prophage. Long ONT reads give a fundamental advantage here: they resolve the cluster architecture and the epidemiology of its horizontal transfer.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: remnants of the suspect food product, vomit, stool, serum, wound material. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the field/laboratory express-diagnostics scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the treating physician, epidemiologist and food-safety authority — bont detection, serotype, cluster structure (ha/ntnh), localisation (chromosome/plasmid/phage), carrier identification; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Toxin, Serotypes, Cluster, Localisation</h2>' +
    '<h3>The bont gene and serotypes</h3>' +
    '<p>The serotype is defined by the antigenic specificity of BoNT and correlates with the molecular target of the toxin in the SNARE complex:</p>' +
    tbl(['Serotype', 'BoNT Target', 'Significance'], [
      ['<strong>A</strong>', 'SNAP-25', 'The main "human" type; the most severe and protracted course; also the therapeutic BoNT'],
      ['<strong>B</strong>', 'Synaptobrevin/VAMP', 'The main "human" type; foodborne botulism'],
      ['<strong>C</strong>', 'Syntaxin and SNAP-25', 'Mainly birds and animals'],
      ['<strong>D</strong>', 'Synaptobrevin/VAMP', 'Animals'],
      ['<strong>E</strong>', 'SNAP-25', 'The "fish" type; foodborne botulism from fish products and seafood'],
      ['<strong>F</strong>', 'Synaptobrevin/VAMP', 'Rare human cases; also described in <em>C. baratii</em>'],
      ['<strong>G</strong>', 'Synaptobrevin/VAMP', 'Rare; isolated from soil']
    ]) +
    '<h3>Toxin cluster (progenitor complex)</h3>' +
    '<p>bont genes do not exist in isolation in the genome — they form a cluster with regulatory and protective genes:</p>' +
    tbl(['Gene', 'Function', 'Analytical Significance'], [
      ['<strong>bont (A–G)</strong>', 'Botulinum neurotoxin', 'Primary detection and serotyping target'],
      ['<strong>ntnh</strong>', 'Non-toxic non-haemagglutinating protein NTNH', 'Conserved cluster marker; protects the toxin in the GI tract'],
      ['<strong>ha (ha17/33/70)</strong>', 'Haemagglutinins', 'Components of the progenitor toxin complex; ha variability is a cluster-type marker']
    ]) +
    '<h3>Cluster localisation and horizontal transfer</h3>' +
    '<p>Long ONT reads resolve the genomic context of the cluster — the key to understanding its epidemiology:</p>' +
    tbl(['Localisation', 'Examples', 'Epidemiological Significance'], [
      ['<strong>Chromosome</strong>', 'Type A (group I), type E', 'Relatively stable inheritance'],
      ['<strong>Plasmids</strong>', 'Type B (group II), some A', 'Potential for transfer between strains'],
      ['<strong>Prophages</strong>', 'Types C, D (group III)', 'Phage-mediated transfer of toxigenicity']
    ]) +
    '<p><em>C. botulinum</em> is not a single species but <strong>four physiological groups (I–IV)</strong> united only by the ability to produce BoNT. Moreover, bont genes have been found in other clostridia — <em>C. baratii</em> (type F) and <em>C. butyricum</em> (type E): direct evidence of the horizontal transfer that our pipeline tracks.</p>' +
    '<h3>Clinical forms of botulism</h3>' +
    tbl(['Form', 'Source / Mechanism', 'Role of Genomics'], [
      ['<strong>Foodborne</strong>', 'Home preserves, dried/smoked fish, mushrooms — hermetically sealed products without oxygen access', 'bont detection in the product sample and in the patient; serotyping for source tracing'],
      ['<strong>Infant</strong>', 'Intestinal colonisation by spores (the classic factor — honey before 1 year of age); toxin is synthesised in situ', 'Confirmation of the toxigenic strain in the infant\'s stool'],
      ['<strong>Wound</strong>', 'Wound contamination by spores, including in people who inject drugs', 'bont detection from wound material'],
      ['<strong>Iatrogenic</strong>', 'Overdose of therapeutic/cosmetic BoNT', 'Differentiation from infectious botulism'],
      ['<strong>Inhalational</strong>', 'Potential biothreat — CDC category A', 'Detection within biosafety and sanitary surveillance']
    ]) +
    '<h3>Classical and modern diagnostics</h3>' +
    tbl(['Method', 'Limitations', 'Place of the ONT Pipeline'], [
      ['<strong>Mouse bioassay</strong> (historical gold standard)', 'Slow (up to a day), ethically controversial, requires special facilities', 'A genomic alternative in hours'],
      ['<strong>Endopep-MS</strong> (mass spectrometry of toxin activity)', 'Requires a specialised laboratory', 'Complementary methods'],
      ['<strong>PCR for bont</strong>', 'Point-like: provides neither cluster architecture nor localisation', 'Long reads resolve the whole cluster'],
      ['<strong>Culture</strong>', 'Slow, requires anaerobic and BSL conditions', 'Direct detection from the sample without cultivation']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Botulinum Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CBT-Tox-Serotyper</strong>', 'Serotyping (A–G) from the bont gene with target determination (SNAP-25 / VAMP / syntaxin)'],
      ['<strong>CBT-Cluster-Resolver</strong>', 'Reconstruction of the toxin cluster (ha/ntnh) and its localisation (chromosome/plasmid/phage)'],
      ['<strong>CBT-Host-ID</strong>', 'Carrier identification: <em>C. botulinum</em> (groups I–IV), <em>C. baratii</em>, <em>C. butyricum</em>']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — bont A–G reference panel + cluster genes (ntnh, ha) + carrier genomes'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. bont detection and cluster analysis</strong>', 'Custom database of bont serotypes and cluster genes; localisation resolved from long reads'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Antitoxin works only in the first hours</strong> — BAT neutralises only circulating toxin, so every hour of delay in laboratory confirmation worsens the prognosis. Point-of-care ONT sequencing cuts the time from sample to genomic answer from days to hours.</li>' +
    '<li><strong>Home preserves — a persistent risk in Russia and Eastern Europe</strong> — dried and smoked fish (type E), mushrooms and vegetable preserves remain classic sources of foodborne botulism; hermetic packaging without oxygen creates ideal conditions for spores. Rapid typing matters for outbreak tracing by food-safety authorities.</li>' +
    '<li><strong>Infant botulism and honey</strong> — the most frequent form of botulism in a number of countries; honey is not recommended for children under one year. Confirming the toxigenic strain in the infant\'s stool speeds up diagnosis with a non-specific picture (hypotonia, weak cry, constipation).</li>' +
    '<li><strong>Wound botulism in people who inject drugs</strong> — a persistent source of outbreaks in Europe and North America requiring rapid detection from wound material.</li>' +
    '<li><strong>"Poison-medicine"</strong> — type A BoNT (Botox and analogues) is the highest-grossing biopharmaceutical in the world; the dual nature of the toxin (poison, medicine, potential bioweapon — CDC category A) makes diagnostics and toxigenicity control a clinical, sanitary and defence task alike.</li>' +
    '<li><strong>Horizontal transfer as a threat</strong> — the discovery of bont in <em>C. baratii</em> and <em>C. butyricum</em> shows that toxigenicity is not tied to a species; monitoring cluster localisation (plasmid/phage) is a forecast of threat evolution.</li></ul>' +
    '<blockquote><p>⚠️ <strong>Dual use.</strong> This page and the pipeline have a strictly medical-diagnostic and defensive purpose (biosafety, food control). The pipeline solves only detection and typing tasks and contains no protocols for producing or cultivating the toxin.</p></blockquote><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — Botulism</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Botulism (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — Botulism (Fact Sheet)</a></li></ul>';

  /* ── SORDELLII / SEPTICUM ── */
  EN['/sordellii/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sordellii.svg" alt="Paeniclostridium sordellii and Clostridium septicum — two spore-forming rods and a droplet" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Direct Detection of Paeniclostridium sordellii and Clostridium septicum Toxins</h1>' +
    '<p style="font-size:1.2em;color:#555">tcsL/tcsH and csa genes, species identification from blood, tissue and uterine aspirate — in hours, when culture cannot keep up</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>A duet page: two rare but ultra-dramatic clostridial syndromes united by a common scenario — <strong>intensive care, the count is in hours, culture cannot keep up</strong>.</p>' +
    '<p><em><strong>Paeniclostridium sordellii</strong></em> (formerly <em>Clostridium sordellii</em>) is the agent of <strong>toxic shock after childbirth and uterine medical interventions</strong> (including medical abortion). The clinical portrait is specific and differs from sepsis: <strong>shock without fever</strong>, refractory hypotension, marked <strong>haemoconcentration</strong> (haematocrit up to 60–70%), <strong>leukaemoid reaction</strong> (leukocytes 40–80 thousand), cavitary effusions. Death occurs within <strong>2–6 days</strong>; lethality of the TSS form in published series is <strong>70–100%</strong>. The cause is the lethal toxin <strong>TcsL</strong> from the family of large clostridial glucosylating toxins (a relative of TcdB of <em>C. difficile</em>): it glucosylates small GTPases (Rac, Ras subfamily) → collapse of the endothelial cytoskeleton → <strong>total capillary leak</strong>. Additional arsenal: the haemorrhagic toxin <strong>TcsH</strong> and neuraminidase <strong>NanS</strong> (a promising target for inhibitors).</p>' +
    '<p><em><strong>Clostridium septicum</strong></em> is the agent of <strong>atraumatic (spontaneous) gas gangrene</strong> and an important clinical marker: <em>C. septicum</em> bacteraemia often points to <strong>occult colon cancer or neutropenia</strong> (the bacterium penetrates through a defect of the intestinal wall and seeds muscle). Its alpha-toxin (gene <strong>csa</strong>) is <strong>pore-forming</strong>, related to aerolysin, and NOT a phospholipase C as in <em>C. perfringens</em>. Lethality of spontaneous gangrene is higher than that of traumatic gangrene.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>direct detection of the toxin genes tcsL/tcsH</strong> (<em>P. sordellii</em>) and <strong>csa</strong> (<em>C. septicum</em>) together with <strong>species identification</strong> (16S rRNA and species-specific markers) and differentiation from <em>C. perfringens</em> and other clostridia — a genomic answer for the intensivist, obstetrician and surgeon in hours, not days.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: blood, lesion tissue, uterine aspirate. Optimal: rapid library preparation and a <strong>Flongle</strong> run for the point-of-care scenario (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the intensivist/obstetrician/surgeon — species identification, toxin gene profile, clostridial differential series; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Toxins, Identification, Differentiation</h2>' +
    '<h3>Toxin genes</h3>' +
    tbl(['Gene', 'Pathogen', 'Toxin and Mechanism'], [
      ['<strong>tcsL</strong>', '<em>P. sordellii</em>', 'Lethal toxin TcsL — a large clostridial glucosylating toxin; inactivates small GTPases (Rac, Ras) → endothelial cytoskeleton collapse → capillary leak and TSS'],
      ['<strong>tcsH</strong>', '<em>P. sordellii</em>', 'Haemorrhagic toxin TcsH — the haemorrhagic component'],
      ['<strong>nanS</strong>', '<em>P. sordellii</em>', 'Neuraminidase NanS — a virulence factor and a target for inhibitors'],
      ['<strong>csa</strong>', '<em>C. septicum</em>', 'α-toxin — <strong>pore-forming</strong>, related to aerolysin (not a phospholipase!); the key factor of myonecrosis in spontaneous gangrene']
    ]) +
    '<h3>Species identification and differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>16S rRNA</strong>', 'Genus- and species-level identification; differentiation from <em>C. perfringens</em>, <em>C. novyi</em>, <em>C. chauvoei</em> and other clostridia'],
      ['<strong>Species-specific markers</strong>', 'Discrimination of <em>P. sordellii</em> and <em>C. septicum</em> when 16S is too close']
    ]) +
    '<h3>Cross table: three clostridial syndromes</h3>' +
    tbl(['Feature', '<em>C. perfringens</em>', '<em>C. septicum</em>', '<em>P. sordellii</em>'], [
      ['<strong>Syndrome</strong>', 'Traumatic gas gangrene (~95% of cases)', '<strong>Spontaneous</strong> (atraumatic) gangrene', 'Toxic shock after childbirth / uterine interventions'],
      ['<strong>Portal of entry</strong>', 'Wound, trauma', 'Intestinal wall defect (tumour, neutropenia)', 'Endometritis, postpartum/post-abortion infection'],
      ['<strong>Key toxin</strong>', 'α-toxin cpa (phospholipase C)', 'α-toxin csa (<strong>pore-forming</strong>)', 'TcsL (glucosylating) + TcsH'],
      ['<strong>Distinctive feature</strong>', 'Necrosis ~15 cm/hour', 'Marker of occult colon cancer', 'Shock <strong>without fever</strong>, haematocrit 60–70%, leukocytes 40–80 thousand'],
      ['<strong>See also</strong>', '<a href="/perfringens/">Page /perfringens/</a>', '—', '—']
    ]) +
    '<h3>Treatment approaches (in the report)</h3>' +
    tbl(['Pathogen', 'Approach', 'Role of Genomics'], [
      ['<strong>P. sordellii</strong>', 'Early source control (often <strong>hysterectomy</strong>) + clindamycin/penicillin + intensive care; no specific antitoxin exists', 'tcsL/tcsH detection confirms toxin-driven shock → rationale for aggressive source control'],
      ['<strong>C. septicum</strong>', 'Emergency surgery + penicillin/clindamycin; in survivors — <strong>mandatory search for an intestinal tumour</strong>', 'csa detection + species identification → oncological alertness and referral for colonoscopy']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Sordellii/Septicum Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CST-Tox-Detector</strong>', 'Detection of the toxin genes tcsL/tcsH/csa/nanS in raw reads'],
      ['<strong>CST-Species-ID</strong>', 'Differentiation of <em>P. sordellii</em>, <em>C. septicum</em>, <em>C. perfringens</em> and other clostridia'],
      ['<strong>CST-Syndrome-Classifier</strong>', 'Syndrome prioritisation (TSS / spontaneous gangrene) from the findings profile']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — clostridia reference panel (<em>P. sordellii</em>, <em>C. septicum</em>, <em>C. perfringens</em>, <em>C. novyi</em> and others)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Toxin gene detection</strong>', 'Custom database of toxin genes (tcsL, tcsH, nanS, csa) and species-specific markers'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Rarity → low alertness</strong> — both syndromes are rare, so the diagnosis is often made <strong>post-mortem</strong>: culture cannot keep up, and the clinical picture (shock without fever in <em>P. sordellii</em>) does not fit the familiar image of sepsis. Direct molecular detection from blood/tissue in hours changes this equation.</li>' +
    '<li><strong>The mifepristone story of 2005</strong> — a series of deaths after medical abortions (mifepristone) in the USA and Canada led to an FDA alert and a joint CDC/FDA/NIH workshop (2006), after which the misoprostol administration scheme was changed. The case showed how a rare pathogen changes the regulation of an entire class of medical interventions.</li>' +
    '<li><strong>C. septicum as a paraclinical marker</strong> — <em>C. septicum</em> bacteraemia is associated with occult colorectal cancer and neutropenia; identifying the pathogen is not only a diagnosis of gangrene but also a signal for an oncological search. An argument for oncological alertness and interdisciplinarity (One Health).</li>' +
    '<li><strong>The family of large clostridial toxins</strong> — TcsL is related to TcdB of <em>C. difficile</em>: a unified pipeline for detecting glucosylating toxins creates the basis for the whole "clostridia universe" — from the anthrax-like syndromes of <em>C. novyi</em> to <em>C. difficile</em> infection.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — Clostridium septicum / Gas Gangrene (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — Clostridial Infections</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — Clostridium sordellii (Toxic Shock after Medical Abortion)</a></li></ul>';

  /* ── NOVYI-NT (oncolytic) ── */
  EN['/novyi/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_novyi.svg" alt="Clostridium novyi-NT — a spore germinating in the hypoxic tumour core" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Genomic Control of Clostridium novyi-NT — an Oncolytic Bacterium</h1>' +
    '<p style="font-size:1.2em;color:#555">Therapeutic strain passport from complete assembly and biodistribution monitoring — long reads for experimental bacteriotherapy of solid tumours</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Clostridium novyi</em> type A is an anaerobic spore-forming clostridium, one of the agents of <strong>gas gangrene</strong> (notably known from outbreaks among people who inject drugs in the UK in the 2000s). Its main virulence factor is the <strong>α-toxin</strong>, a phospholipase related to the α-toxin (CPA) of <em>C. perfringens</em>. The <strong>C. novyi-NT</strong> strain (NT = non-toxic) was obtained by <strong>deleting the α-toxin gene</strong> — and it is precisely this that turned a dangerous pathogen into a candidate oncolytic agent.</p>' +
    '<p>The key idea of the therapy: <strong>spores</strong> are injected intratumourally or systemically and germinate <strong>exclusively in the hypoxic (oxygen-free) core of a solid tumour</strong> — a zone poorly reached by chemo- and radiotherapy. Vegetative bacteria destroy the tumour from within: direct oncolysis plus release of tumour antigens with secondary activation of the immune response. The evidence base is still early: preclinical work on spontaneous canine tumours and a first-in-human phase I trial in patients with refractory solid tumours showed cases of objective destruction of injected lesions; combinations with immune checkpoint inhibitors are being studied. <strong>This is investigational therapy, not a standard of care.</strong></p>' +
    '<p>Our role is <strong>genomic control and monitoring</strong> based on nanopore sequencing:</p>' +
    '<ul><li><strong>🧪 Genomic QC of the therapeutic strain</strong> — confirmation of the absence of the α-toxin gene and unwanted insertions; a strain passport from complete assembly: long reads resolve the repeats and plasmids critical for clostridial genomes.</li>' +
    '<li><strong>📍 Biodistribution monitoring</strong> — detection of <em>C. novyi-NT</em> DNA in tumour biopsies and in blood (metagenomics and targeted panels): confirmation that germination occurs precisely in the tumour and not in normal tissues.</li>' +
    '<li><strong>🔗 Oncogenomic context</strong> — prospectively, integration with our oncology pipelines: the tumour mutational landscape as a background for interpreting the response to bacteriotherapy.</li></ul>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: culture of the therapeutic strain, tumour biopsies, blood samples.</li>' +
    '<li><strong>📤 Output:</strong> Strain genomic passport report (complete assembly, α-toxin locus status, plasmids); biodistribution report (fraction of <em>C. novyi-NT</em> reads per sample); technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Genomic Passport and Biodistribution</h2>' +
    '<h3>Genomic QC of the therapeutic strain</h3>' +
    tbl(['Locus / Feature', 'Significance for Control'], [
      ['<strong>α-toxin gene</strong>', 'The targeted deletion — the main genomic hallmark of the NT strain; control of the absence of a functional copy and of reversions'],
      ['<strong>Plasmids</strong>', 'Clostridial toxins are often plasmid-borne; complete long-read assembly fixes the plasmid composition of the production batch'],
      ['<strong>Repeats and mobile elements</strong>', 'Long reads resolve repeats inaccessible to short-read platforms — control of unwanted insertions and rearrangements'],
      ['<strong>Assembly completeness</strong>', 'One closed chromosome + plasmids — the reference passport of the strain production batch']
    ]) +
    '<h3>Differential identification</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>NT strain-specific markers</strong>', 'Unique deletion junctions and strain signatures — distinguishing the therapeutic strain from wild <em>C. novyi</em>'],
      ['<strong>16S rRNA + species markers</strong>', 'Differentiation from <em>C. perfringens</em>, <em>C. septicum</em> and other clostridia in the metagenomic background of a biopsy']
    ]) +
    '<h3>Biodistribution monitoring</h3>' +
    tbl(['Sample', 'Question', 'Method'], [
      ['<strong>Tumour biopsy</strong>', 'Does the strain germinate in the hypoxic core?', 'Metagenomics / targeted detection of <em>C. novyi-NT</em> DNA'],
      ['<strong>Blood</strong>', 'Is there systemic dissemination beyond the tumour?', 'Targeted detection of strain-specific markers'],
      ['<strong>Time series</strong>', 'Dynamics of the bacterial load after injection', 'Quantitative estimate of the strain read fraction']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Novyi Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CNV-Strain-Passport</strong>', 'Verification of the strain genomic passport: α-toxin locus status, plasmids, rearrangements'],
      ['<strong>CNV-Biodistribution</strong>', 'Detection and quantification of <em>C. novyi-NT</em> DNA in the metagenomic background of biopsies and blood'],
      ['<strong>CNV-Contaminant-Guard</strong>', 'Control of wild clostridia contaminants and foreign microflora in the therapeutic strain batch']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — <em>C. novyi-NT</em> reference and a panel of related clostridia'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Complete strain assembly</strong>', '<code>flye</code> — closed chromosome and plasmids from long reads for the genomic passport'],
      ['<strong>5. Strain marker detection</strong>', 'Custom database of strain-specific markers and α-toxin deletion junctions'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>A long history of cancer bacteriotherapy</strong> — the idea of using bacteria against tumours goes back to "Coley\'s toxins" of the late 19th century; today the field is being reborn at a new genomic level: strains are engineered purposefully (like the α-toxin deletion in <em>C. novyi-NT</em>) rather than taken "as is".</li>' +
    '<li><strong>Hypoxia — an Achilles\' heel and a target at once</strong> — the hypoxic core of a solid tumour is resistant to chemo- and radiotherapy, but for obligate anaerobes it is the only place where they can germinate: the tumour itself creates the niche for its own destruction.</li>' +
    '<li><strong>Combinations with immunotherapy — a hot niche</strong> — oncolysis releases tumour antigens and inflammatory signals; combining bacteriotherapy with immune checkpoint inhibitors is actively studied as a way to turn a local effect into a systemic one.</li>' +
    '<li><strong>Genomic control is a mandatory component</strong> — for a live therapeutic agent, confirmed strain stability (no reversions of the toxin locus) and proven biodistribution are critical; long reads close both tasks where short platforms cannot resolve repeats and plasmids.</li>' +
    '<li><strong>A restrained frame</strong> — <em>C. novyi-NT</em> bacteriotherapy remains an early experimental strategy with a limited evidence base; our pipeline is a research quality-control tool, not a clinical standard.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed / NCBI — publications on Clostridium novyi-NT</a></li>' +
    '<li>📄 <a href="https://clinicaltrials.gov/">ClinicalTrials.gov — clinical trials of tumour bacteriotherapy</a></li>' +
    '<li>📄 <a href="https://www.cancer.gov/">NCI (cancer.gov) — US National Cancer Institute</a></li></ul>';

  /* ── CHAUVOEI (blackleg, veterinary) ── */
  EN['/chauvoei/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_chauvoei.svg" alt="Clostridium chauvoei — spore-forming rod and bull silhouette" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Differential Diagnosis of Blackleg (Emphysematous Carbuncle) in Cattle</h1>' +
    '<p style="font-size:1.2em;color:#555">A veterinary card of the "Clostridia Universe" section: sudden cattle death — blackleg or anthrax? A molecular answer on site, before the carcass is opened</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Clostridium chauvoei</em> is a Gram-positive anaerobic spore-forming rod, the agent of <strong>blackleg (emphysematous carbuncle)</strong> — a fulminant necrotising infection of cattle. The outdated name of the disease — "symptomatic anthrax" — <strong>must not mislead: blackleg has nothing to do with true anthrax (<em>Bacillus anthracis</em>)</strong>, yet the clinical picture of sudden death requires ruling anthrax out first. Spores persist in soil for years; mainly <strong>young cattle aged 6 months to 2 years</strong> are affected — typically well-fed young bulls on pasture. Spores penetrate the muscles (including via microtraumas), where under anaerobic conditions they germinate and cause <strong>crepitant myositis</strong>: gas in the muscles, lameness, high fever, swelling and crackling of the affected area. The disease is lightning-fast — <strong>the animal is often found already dead</strong>, without warning signs.</p>' +
    '<p>From nanopore sequencing data our pipeline performs <strong>species identification</strong> (16S rRNA + species-specific markers) with differentiation from the closest relative <em>C. septicum</em> (with which <em>C. chauvoei</em> is easily confused; see our page <a href="/sordellii/">P. sordellii and C. septicum</a>), <strong>detection of the main virulence factor cctA</strong> and — the key task for the veterinary service — <strong>molecular exclusion of anthrax</strong> (<em>B. anthracis</em>: pagA/cap markers). In sudden cattle death the carcass must not be opened until anthrax is excluded: a rapid on-site answer decides whether to declare quarantine. Additionally the pipeline builds a <strong>molecular-epidemiological picture of the outbreak</strong> (outbreak map).</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1 chemistry). Material: muscle tissue from the affected area, exudate, impression smear. Optimal: rapid library preparation and a <strong>Flongle</strong> run in a regional veterinary laboratory (Edge).</li>' +
    '<li><strong>📤 Output:</strong> HTML report for the veterinarian and veterinary surveillance — species identification, cctA detection, the <em>B. anthracis</em> exclusion result, epidemiological typing of the outbreak; technical QC report for the bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Markers: Virulence, Identification, Anthrax Exclusion</h2>' +
    '<h3>Virulence factors</h3>' +
    tbl(['Marker', 'Product', 'Significance'], [
      ['<strong>cctA</strong>', 'CctA (chauvoei toxin A)', 'The main virulence factor: a pore-forming cytolysin of the β-pore-forming toxin family, identified as the key one in the 2010s'],
      ['<strong>Hyaluronidase</strong>', 'Spreading enzyme', 'Destruction of the intercellular matrix, spread through the muscle'],
      ['<strong>DNase</strong>', 'Nuclease', 'Degradation of tissue DNA and neutrophil extracellular traps'],
      ['<strong>Neuraminidase</strong>', 'Sialidase', 'Damage to cell membranes, an additional pathogenicity factor'],
      ['<strong>Flagella (fla locus)</strong>', 'Motility proteins', 'Motility in tissues; a marker of species identification']
    ]) +
    '<h3>Species identification and clostridial differential diagnosis</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>16S rRNA</strong>', 'Genus/species identification; differentiation from <em>C. septicum</em> (malignant oedema — the closest relative, easily confused with <em>C. chauvoei</em>), <em>C. perfringens</em>, <em>C. novyi</em>'],
      ['<strong><em>C. chauvoei</em> species-specific markers</strong>', 'Unambiguous species identification despite close relatedness to <em>C. septicum</em>'],
      ['<strong>Clostridia panel</strong>', 'Discrimination of blackleg, malignant oedema and other cattle clostridioses in a single run']
    ]) +
    '<h3>Anthrax exclusion (the core value for the veterinary service)</h3>' +
    tbl(['Marker', 'Significance'], [
      ['<strong>pagA</strong> (protective antigen)', 'A <em>Bacillus anthracis</em> marker — detected <strong>to exclude</strong> anthrax'],
      ['<strong>cap</strong> (capsular polyglutamate)', 'A <em>B. anthracis</em> capsule marker — the second independent exclusion target'],
      ['<strong>Decision in the report</strong>', '"Anthrax excluded / not excluded" → carcass opening, quarantine measures or routine disposal']
    ]) +
    '<h3>Molecular epidemiology of the outbreak</h3>' +
    tbl(['Task', 'Pipeline Role'], [
      ['<strong>Isolate typing</strong>', 'Comparison of the strain with the reference panel, relatedness assessment with previous outbreaks'],
      ['<strong>Outbreak map</strong>', 'Linking the result to the farm/pasture: spores rise from the soil after floods and earthworks']
    ]) +
    '<h3>Control and prevention (reference in the report)</h3>' +
    tbl(['Measure', 'Comment'], [
      ['<strong>Vaccination of young stock</strong>', 'Toxoid and culture vaccines are effective; outbreaks continue where vaccinations are missed'],
      ['<strong>After floods/droughts</strong>', 'Abnormal floods raise spores from the soil — elevated risk on new pastures'],
      ['<strong>Carcass disposal</strong>', 'Burning or burial with lime; opening only after anthrax is excluded'],
      ['<strong>Herd movement</strong>', 'Removal from the affected pasture, grazing restriction in the outbreak area']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Chauvoei Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CCV-Species-ID</strong>', 'Differentiation of <em>C. chauvoei</em> from <em>C. septicum</em>, <em>C. perfringens</em> and other clostridia'],
      ['<strong>CCV-Anthrax-RuleOut</strong>', '"blackleg / anthrax / other" classifier from cctA and pagA/cap markers'],
      ['<strong>CCV-Epi-Map</strong>', 'Molecular-epidemiological clustering of isolates and outbreak map']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    '<p>The pipeline is managed by the Snakemake framework in isolated Conda environments.</p>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> — clostridia reference panel (<em>C. chauvoei</em>, <em>C. septicum</em>, <em>C. perfringens</em> and others) + <em>Bacillus anthracis</em>'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3</code>, <code>medaka</code>'],
      ['<strong>4. Marker detection</strong>', 'In-house database of species-specific markers, the cctA gene and anthrax exclusion markers (pagA/cap)'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Decision before opening the carcass</strong> — in sudden cattle death the first question of the veterinary service is always the same: anthrax or not. An error in either direction is costly: a false alarm means quarantine and farm shutdown, a miss means spread of a particularly dangerous infection. Rapid molecular differentiation on site (Flongle in a regional veterinary laboratory) cuts the answer from days to hours.</li>' +
    '<li><strong>Worldwide distribution and economics</strong> — blackleg is registered all over the world and causes tangible losses to cattle farming: the best-fed young animals die, and vaccination requires annual discipline. In Russia, outbreaks are regularly registered (Rosselkhoznadzor monitoring), including in Siberia, Altai and the Caucasus.</li>' +
    '<li><strong>The climate factor</strong> — outbreaks are linked to abnormal floods and droughts: flood waters raise soil spores onto new pastures, droughts concentrate herds on limited areas. Climate change makes epizootiological monitoring in demand.</li>' +
    '<li><strong>Vaccination gaps</strong> — the vaccine is effective, but outbreaks keep occurring where vaccinations are missed; rapid laboratory-confirmed outbreak diagnostics help veterinary surveillance localise the problem before it spreads.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.woah.org/">WOAH (formerly OIE) — World Organisation for Animal Health</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — Clostridium chauvoei (Taxonomy, Genome, Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckvetmanual.com/">Merck Veterinary Manual — Blackleg (Emphysematous Carbuncle)</a></li></ul>';

  /* ── SARS-CoV-2 ── */
  EN['/sarscov2/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sarscov2.svg" alt="SARS-CoV-2" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>SARS-CoV-2 Variant and Antiviral Drug Resistance Determination</h1>' +
    '<p style="font-size:1.2em;color:#555">Nanopore whole-genome sequencing for coronavirus genomic surveillance and personalised treatment selection</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>SARS-CoV-2</em> is an RNA virus of the <em>Coronaviridae</em> family, causative agent of COVID-19. Since 2020 the virus has continuously evolved: successive variants (Alpha → Delta → Omicron and sub-variants) show increasing immune escape and altered antiviral drug susceptibility. <strong>Clinically significant resistance to nirmatrelvir (Paxlovid)</strong> has been documented — mutations in the <em>nsp5</em> gene (3CL protease).</p>' +
    '<p>Our pipeline performs whole-genome sequencing using the <strong>ARTIC</strong> protocol (amplicon, nanopore) and automatically delivers: genomic variant/lineage, spike protein mutation profile, and susceptibility assessment for four antiviral drugs.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after basecalling (Dorado, R10.4.1 chemistry). Amplicon sequencing with ARTIC V4.1 / V5.3 primer schemes.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician (variant, S-protein mutations, drug resistance profile) and QC report for bioinformatician.</li></ul><hr>' +
    '<h2>🧭 Baltimore Class: IV — (+)ssRNA</h2>' +
    '<p>Class IV comprises positive-sense single-stranded RNA viruses: the genome is itself an mRNA and is translated by ribosomes into the replicase polyprotein immediately upon entering the cell. In SARS-CoV-2 this is one of the largest known RNA genomes (~30 kb): the replicase complex assembles an RNA-dependent RNA polymerase (<strong>RdRp, nsp12</strong>) that synthesises new genomic RNAs and a set of <strong>subgenomic RNAs</strong> — from which the structural proteins (S, M, N, E) are translated. A unique feature of coronaviruses is the proofreading 3\'→5\' exonuclease <strong>nsp14 (ExoN)</strong>: it corrects RdRp errors, so coronaviruses mutate more slowly than other RNA viruses (though faster than DNA viruses). All clinical genomics of COVID-19 works with the products of this strategy: variant mutations accumulate in the subgenomically encoded S protein, and the resistance targets — <em>nsp5</em> (protease) and <em>nsp12</em> (RdRp) — are the very enzymes of that replicase complex, which our pipeline annotates.</p>' +
    tbl(['Class', 'Genome', 'Replication Strategy', 'Examples'], [
      ['I', 'dsDNA', 'DNA → mRNA (like the host cell)', 'Herpesviruses, adenoviruses, smallpox, ASFV'],
      ['II', 'ssDNA (+)', 'Via a dsDNA intermediate', 'Parvoviruses'],
      ['III', 'dsRNA', 'RdRp transcribes from dsRNA', 'Rotaviruses'],
      ['<strong>IV</strong>', '<strong>(+)ssRNA</strong>', '<strong>Genome = mRNA, immediate translation</strong>', '<strong>SARS-CoV-2, hepatitis C</strong>'],
      ['V', '(−)ssRNA', 'First the (+)strand is synthesised (RdRp)', 'Influenza, SFTS, rabies'],
      ['VI', '(+)ssRNA-RT', 'Reverse transcriptase: RNA → DNA', 'HIV, retroviruses'],
      ['VII', 'dsDNA-RT', 'Reverse transcription via an RNA intermediate', 'Hepatitis B']
    ]) + '<hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Key Mutations and Genes</h2>' +
    '<h3>Variant Determination — S Gene (Spike)</h3>' +
    tbl(['Mutation', 'Significance'], [
      ['<strong>D614G</strong>', 'Baseline mutation in all modern variants (increased transmissibility)'],
      ['<strong>N501Y</strong>', 'Alpha, Beta, Gamma, Omicron — increased ACE2 affinity'],
      ['<strong>E484K/A</strong>', 'Beta, Gamma, some Omicron — immune escape from neutralising antibodies'],
      ['<strong>L452R</strong>', 'Delta — increased transmissibility and escape from neutralising antibodies'],
      ['<strong>P681H/R</strong>', 'Alpha/Delta — efficient furin cleavage'],
      ['<strong>K417N/T</strong>', 'Beta, Gamma, Omicron BA.1 — immune escape'],
      ['<strong>F486P/V/S</strong>', 'Omicron XBB, JN.1 subvariants — neutralisation escape']
    ]) +
    '<p>WHO classifies variants by risk level: <strong>VOC</strong> (Variant of Concern — confirmed impact on transmissibility/severity/immune escape), <strong>VOI</strong> (Variant of Interest — potential risk) and <strong>VUM</strong> (Variant Under Monitoring). The pipeline assigns the Pango lineage and automatically maps it to the current WHO category.</p>' +
    '<h3>Antiviral Drug Resistance</h3>' +
    tbl(['Gene', 'Mutations', 'Drug'], [
      ['<strong>nsp5</strong> (3CLpro)', 'E166V, L50F, A173V (L50F+E166V combination — strongest)', 'Nirmatrelvir (Paxlovid)'],
      ['<strong>nsp12</strong> (RdRp)', 'V792I, S759A, E802D (in vitro and in immunocompromised patients)', 'Remdesivir'],
      ['—', 'No clinically significant markers established', 'Molnupiravir / Favipiravir']
    ]) + '<hr>' +
    '<h2>⚠️ Limitations and Boundaries</h2>' +
    '<ul><li><strong>Low viral load</strong> — at Ct > 30–33 the amplicon scheme yields an incomplete genome; the Pango lineage may not resolve. Genome coverage percentage is stated in the report.</li>' +
    '<li><strong>Classification threshold</strong> — reliable lineage assignment requires ≥80% genome coverage (Nextclade QC standard).</li>' +
    '<li><strong>Resistance ≠ clinical failure</strong> — carriage of a resistance marker is interpreted in the context of the patient\'s immune status and prior therapy.</li>' +
    '<li><strong>Rapid database ageing</strong> — variant classification and the resistance mutation database require regular updates (Pango lineages are revised weekly).</li></ul><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq SARS-CoV-2 Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>CoV2-Variant-Classifier</strong>', 'Pango variant/lineage classification from WGS (Nextclade analogue, offline)'],
      ['<strong>CoV2-Res-Detector</strong>', 'Antiviral drug resistance prediction']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Primer trimming (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code> (ARTIC primers V4.1/V5.3)'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2 2.26</code>, <code>samtools ≥1.17</code> (Reference: NC_045512.2)'],
      ['<strong>3. Consensus Assembly</strong>', '<code>medaka</code>, <code>bcftools</code>, <code>htslib</code>'],
      ['<strong>4. Variant/Lineage Determination</strong>', '<code>nextclade</code>, <code>pangolin</code> (local, updated databases)'],
      ['<strong>5. Resistance annotation</strong>', 'Custom nsp5/nsp12/S mutation database + <code>snpEff</code>'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO</strong> — SARS-CoV-2 genomic epidemiological surveillance is recognised as a mandatory element of pandemic preparedness.</li>' +
    '<li><strong>China</strong> — the first viral genome was published by Chinese scientists in January 2020 (Shanghai, Fudan University), enabling the first PCR tests and vaccines. During the "zero-COVID" era, mass testing and genomic surveillance became a state-scale tool in China — an experience that showed the world the value of rapid genomic diagnostics.</li>' +
    '<li><strong>Nirmatrelvir resistance</strong> — E166V mutation documented in clinical cases; with widespread Paxlovid use, resistance monitoring becomes critical.</li>' +
    '<li><strong>Nanopore advantage</strong> — the complete SARS-CoV-2 genome (~30 kb) is sequenced in <strong>4–6 hours</strong> from sample to result, enabling same-day clinical decision-making.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://artic.network/ncov-2019">ARTIC Network — SARS-CoV-2 nanopore sequencing protocols</a></li>' +
    '<li>📄 <a href="https://clades.nextstrain.org/">Nextclade — SARS-CoV-2 variant classification</a></li>' +
    '<li>📄 <a href="https://covdb.stanford.edu/">Stanford CoVDB — antiviral resistance mutation database</a></li></ul>';

  /* ── FLU (ОРВИ) ── */
  EN['/flu/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_flu.svg" alt="OnSiteSeq ARVI panel" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Metagenomic Identification of Viral Respiratory Pathogens</h1>' +
    '<p style="font-size:1.2em;color:#555">Differential diagnosis of influenza A/B, RSV, rhinovirus, coronaviruses and other respiratory viruses — at the bedside</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Acute respiratory viral infections (ARVI) are caused by dozens of different viruses with clinically indistinguishable presentations. Rapid accurate pathogen identification is critical for three clinical tasks: <strong>antiviral therapy prescription</strong> (oseltamivir for influenza, nirmatrelvir for COVID-19), <strong>infection control</strong> (RSV patient isolation in paediatrics), and <strong>epidemiological surveillance</strong> (monitoring circulating influenza strains).</p>' +
    '<p>Our pipeline uses <strong>metagenomic nanopore sequencing (mNGS)</strong>: the sample (nasopharyngeal swab, BAL) is sequenced without prior knowledge of the pathogen — all viruses are detected simultaneously. For detected influenza A/B, subtype and antiviral resistance profile are additionally determined.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: nasopharyngeal swab / nasopharyngeal aspirate / BAL.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician with identified pathogens, relative abundance, and (for influenza) antiviral resistance profile.</li></ul><hr>' +
    '<h2>🧭 Baltimore Classes as a Map of ARI</h2>' +
    '<p>The Baltimore classification divides viruses into seven classes by genome type and mRNA synthesis strategy. Respiratory viruses are scattered across several classes at once — and metagenomic screening sees them all <strong>simultaneously, with a single method</strong>, because it works with nucleic acid directly: the sequencer does not care which replication strategy a virus uses. This is exactly what distinguishes mNGS from PCR panels, where each genome class requires its own amplification scheme.</p>' +
    tbl(['Baltimore Class', 'Genome', 'Pathogens in the ARI Panel'], [
      ['<strong>I</strong>', 'dsDNA', 'Adenovirus (serotypes B, C, E)'],
      ['<strong>II</strong>', 'ssDNA (+)', 'Bocavirus (HBoV)'],
      ['<strong>IV</strong>', '(+)ssRNA', 'Rhinoviruses A/B/C; coronaviruses (SARS-CoV-2, seasonal HCoV)'],
      ['<strong>V</strong>', '(−)ssRNA', 'Influenza A/B, RSV, parainfluenza virus, metapneumovirus']
    ]) +
    '<p>Note: one and the same clinical picture — the "common cold" — is caused by viruses with fundamentally different molecular biology, from the single-stranded DNA of bocavirus to the segmented (−)ssRNA of influenza. For diagnostics this difference is levelled out: during library preparation RNA is converted into cDNA, and from then on all classes are analysed by a single pipeline.</p><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🦠 Detectable Pathogens</h2>' +
    tbl(['Pathogen', 'Clinical Significance'], [
      ['<strong>Influenza A (H1N1pdm09, H3N2)</strong>', 'Leading seasonal pathogen; antiviral therapy — oseltamivir, baloxavir'],
      ['<strong>Influenza B (Victoria / Yamagata)</strong>', 'Second most significant; subtyping important for treatment strategy'],
      ['<strong>RSV A / RSV B</strong>', 'Leading cause of bronchiolitis in children; infant prophylaxis — nirsevimab; diagnosis guides isolation in paediatric wards'],
      ['<strong>Rhinovirus A / B / C</strong>', 'Most frequent ARVI pathogen; no specific therapy'],
      ['<strong>SARS-CoV-2</strong>', 'COVID-19; if detected — automatic extension to <a href="/sarscov2/">full CoV-2 pipeline</a>'],
      ['<strong>Seasonal coronaviruses (HCoV-OC43, -229E, -NL63, -HKU1)</strong>', 'COVID-19 differential diagnosis'],
      ['<strong>Adenovirus (serotypes B, C, E)</strong>', 'Outbreaks in communities; serious in immunocompromised patients'],
      ['<strong>Parainfluenza virus (PIV 1–4)</strong>', 'Laryngotracheitis ("croup") in children'],
      ['<strong>Metapneumovirus (hMPV A/B)</strong>', 'Clinically similar to RSV; important in paediatrics and elderly'],
      ['<strong>Bocavirus (HBoV)</strong>', 'Co-pathogen; frequent co-infection']
    ]) + '<hr>' +
    '<h2>🎯 Influenza Subtyping and Resistance</h2>' +
    tbl(['Gene', 'Key Mutations', 'Drug'], [
      ['<strong>NA</strong> (neuraminidase)', 'H275Y (N1), E119V (N2), R292K', 'Oseltamivir (Tamiflu), Zanamivir'],
      ['<strong>PA</strong> (polymerase)', 'I38T / I38F / I38M', 'Baloxavir (Xofluza)'],
      ['<strong>M2</strong> (ion channel)', 'S31N, V27A, A30T', 'Amantadine / Rimantadine (>99% H3N2 and pH1N1 resistant)']
    ]) + '<hr>' +
    '<h2>🧪 Optimized for the Flongle Flow Cell</h2>' +
    '<p>The Flongle adapter yields roughly <strong>1 Gb per run</strong> — an order of magnitude less than a full R9.4.1/R10.4.1 cell. For viral metagenomics this is usually sufficient (viral genomes are small), but the protocol must be tuned:</p>' +
    '<ul><li><strong>Reverse transcription</strong> — all target pathogens are RNA viruses; the library is prepared via an RT step (e.g. Ligation Sequencing Kit with cDNA), which adds 1–2 hours to the protocol.</li>' +
    '<li><strong>Adaptive sampling (Read Until)</strong> — on-the-fly rejection of human reads raises the viral fraction 3–10×; at typical viral loads (Ct &lt; 30) this is enough for full genomes of influenza (~13.5 kb) or RSV (~15 kb).</li>' +
    '<li><strong>Host depletion</strong> — saponin treatment of the sample before extraction removes 90–99% of human material.</li>' +
    '<li><strong>Sensitivity threshold</strong> — reliable detection and subtyping require the virus at ≥ 0.1% of reads (roughly Ct ≤ 30–32); a negative result does not rule out a low-titer infection.</li>' +
    '<li><strong>Multiplexing</strong> — 2–4 barcoded samples per Flongle keeps per-sample cost at a few thousand rubles.</li></ul>' +
    '<p><em>As flow-cell output and ONT chemistry accuracy improve, the same pipelines move to deeper coverage unchanged — sensitivity thresholds are set by run configuration, not hard-coded.</em></p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq ARVI Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>RespiVirus-Classifier</strong>', 'Metagenomic classification of viral pathogens (CNN on k-mers)'],
      ['<strong>Flu-Subtyper</strong>', 'Influenza A subtyping (H1N1/H3N2) and B (Victoria/Yamagata) from WGS'],
      ['<strong>Flu-Res-Detector</strong>', 'Oseltamivir and baloxavir resistance prediction']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Host read depletion</strong>', '<code>minimap2</code> (ref: GRCh38) → removal of human reads'],
      ['<strong>3. Metagenomic classification</strong>', '<code>Kraken2</code> + <code>Bracken</code> (RefSeq viral DB + custom genomes)'],
      ['<strong>4. Targeted alignment</strong>', '<code>minimap2</code> on references of detected pathogens'],
      ['<strong>5. Influenza subtyping</strong>', '<code>IRMA</code> (Iterative Refinement Meta-Assembler, CDC)'],
      ['<strong>6. Resistance annotation</strong>', 'Custom NA/PA/M2 mutation database + <code>snpEff</code>'],
      ['<strong>7. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO</strong> — Global Influenza Surveillance and Response System (GISRS) includes >150 national centres; data on circulating strains determine annual vaccine composition.</li>' +
    '<li><strong>"Blind" antibiotic therapy problem</strong> — antibiotics are prescribed in ~40–60% of ARVI cases in Russia despite viral aetiology. Accurate bedside pathogen identification prevents unnecessary antibiotic use.</li>' +
    '<li><strong>RSV season</strong> — annual outbreaks overload paediatric hospitals; nirsevimab (Beyfortus) is given prophylactically to infants before the season, while fast bedside RSV confirmation drives isolation and cohorting on paediatric wards.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/initiatives/global-influenza-surveillance-and-response-system">WHO — Global Influenza Surveillance and Response System (GISRS)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/genomes/FLU/">NCBI Influenza Virus Database</a></li>' +
    '<li>📄 <a href="https://wonder.cdc.gov/amd/flu/irma/">CDC IRMA — Iterative Refinement Meta-Assembler</a></li></ul>';

  /* ── COLD (ОРЗ бактериальные) ── */
  EN['/cold/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cold.svg" alt="OnSiteSeq ARI panel" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Metagenomic Identification of Bacterial Respiratory Pathogens and Their AMR</h1>' +
    '<p style="font-size:1.2em;color:#555">Differential diagnosis of community-acquired pneumonia and bacterial ARI — at the bedside</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Bacterial respiratory infections require accurate identification of the causative agent and its antibiotic susceptibility profile for rational empirical therapy. Our pipeline uses metagenomic nanopore sequencing to simultaneously identify the pathogen and determine its AMR profile.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling. Material: sputum, nasopharyngeal swab, BAL, blood culture.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician with identified pathogens and antibiotic susceptibility profile.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🦠 Detectable Pathogens</h2>' +
    tbl(['Pathogen', 'Clinical Significance'], [
      ['<strong>Streptococcus pneumoniae</strong>', 'Leading cause of community-acquired pneumonia; penicillin resistance via PBP2b/2x mutations'],
      ['<strong>Haemophilus influenzae</strong>', 'ARI, otitis, sinusitis, meningitis; β-lactamase BLNAR strains'],
      ['<strong>Klebsiella pneumoniae</strong>', 'Hospital pneumonia; carbapenem resistance (KPC, NDM, OXA-48)'],
      ['<strong>Mycoplasma pneumoniae</strong>', 'Atypical pneumonia; macrolide resistance (23S rRNA A2063G)'],
      ['<strong>Chlamydophila pneumoniae</strong>', 'Atypical pneumonia; difficult to detect by culture'],
      ['<strong>Moraxella catarrhalis</strong>', 'AECB, otitis; BRO-type β-lactamase'],
      ['<strong>Staphylococcus aureus</strong>', 'Post-influenza pneumonia; MRSA (mecA)'],
      ['<strong>Pseudomonas aeruginosa</strong>', 'Hospital pneumonia in cystic fibrosis; multi-resistance (MBL)'],
      ['<strong>Legionella pneumophila</strong>', 'Legionnaires\' disease — severe pneumonia; specific fluoroquinolone therapy']
    ]) + '<hr>' +
    '<h2>🎯 Key AMR Genes</h2>' +
    tbl(['Gene / Mutation', 'Mechanism', 'Antibiotic Class'], [
      ['<strong>pbp1a/2b/2x</strong> (mutations)', 'Altered PBP binding sites', 'Penicillins, cephalosporins (S. pneumoniae)'],
      ['<strong>mecA</strong>', 'Modified PBP2a', 'All β-lactams (MRSA)'],
      ['<strong>blaKPC / blaNDM / blaOXA-48</strong>', 'Carbapenem-hydrolyzing β-lactamases', 'Carbapenems (K. pneumoniae, P. aeruginosa)'],
      ['<strong>ermB / erm(C)</strong>', '23S rRNA methylase', 'Macrolides (azithromycin, clarithromycin)'],
      ['<strong>gyrA / parC</strong> (mutations)', 'Altered DNA gyrase/topoisomerase IV', 'Fluoroquinolones (levofloxacin, moxifloxacin)'],
      ['<strong>cat / cmr</strong>', 'Chloramphenicol acetyltransferase', 'Chloramphenicol']
    ]) + '<hr>' +
    '<h2>🧪 Optimized for the Flongle Flow Cell</h2>' +
    '<p>The Flongle adapter yields roughly <strong>1 Gb per run</strong> — an order of magnitude less than a full R9.4.1/R10.4.1 cell. Bacterial genomes (2–6 Mb) are much larger than viral ones, so host depletion is critical here:</p>' +
    '<ul><li><strong>Adaptive sampling (Read Until)</strong> — on-the-fly rejection of human reads raises the bacterial fraction 3–10×; the key technology for clinical metagenomics on Flongle.</li>' +
    '<li><strong>Host depletion</strong> — saponin lysis or differential centrifugation remove 90–99% of human DNA before loading, lifting the pathogen share from ~1% to 50–80% of reads.</li>' +
    '<li><strong>Sensitivity threshold</strong> — at ~1 Gb, reliable bacterial detection requires the pathogen at ≥ 0.1–1% of the sample; a negative result does not rule out low-titer infection.</li>' +
    '<li><strong>AMR markers</strong> — resistance genes are reported only at sufficient coverage: a "not detected" call means the sensitivity limit, not confirmed susceptibility; the report states "AMR profile not established" accordingly.</li>' +
    '<li><strong>Multiplexing</strong> — 2–4 barcoded samples per Flongle keeps per-sample cost at a few thousand rubles.</li></ul>' +
    '<p><em>As flow-cell output and ONT chemistry accuracy improve, the same pipelines move to deeper coverage unchanged — sensitivity thresholds are set by run configuration, not hard-coded.</em></p><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq ARI Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>BactResp-Classifier</strong>', 'Metagenomic classification of bacterial pathogens (k-mer based)'],
      ['<strong>BactResp-Res-Detector</strong>', 'AMR phenotype prediction from metagenomic data']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Host read depletion</strong>', '<code>minimap2</code> (ref: GRCh38)'],
      ['<strong>3. Metagenomic classification</strong>', '<code>Kraken2</code> + <code>Bracken</code> (RefSeq bacterial DB)'],
      ['<strong>4. AMR gene detection</strong>', '<code>AMRFinderPlus</code> (NCBI), <code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. MLST typing</strong>', '<code>mlst</code> (PubMLST schemes for detected species)'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO AMR action plan</strong> — community-acquired pneumonia is one of the leading causes of AMR-related mortality globally.</li>' +
    '<li><strong>Russia</strong> — empirical antibiotic therapy for ARI is often prescribed without pathogen identification; point-of-care mNGS can target therapy and reduce excessive antibiotic use.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://card.mcmaster.ca/">CARD — Comprehensive Antibiotic Resistance Database</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/">NCBI AMRFinderPlus</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/">PubMLST — Multi-Locus Sequence Typing databases</a></li></ul>';

  /* ── STAPHYLOCOCCUS ── */
  EN['/staphylococcus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_staphylococcus.svg" alt="Staphylococcus aureus" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>MRSA/VRSA and Full AMR Profile Determination of Staphylococcus aureus</h1>' +
    '<p style="font-size:1.2em;color:#555">Genomic surveillance of S. aureus — a leading nosocomial pathogen and WHO priority AMR organism</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><em>Staphylococcus aureus</em> — a Gram-positive coccus forming characteristic grape-like clusters. Leading causative agent of a broad spectrum of infections: from skin and soft tissue (furuncles, abscesses) to life-threatening — <strong>bacteraemia, infective endocarditis, osteomyelitis, VAP</strong>. WHO has listed MRSA as a priority AMR pathogen (high priority category).</p>' +
    '<p>The key clinical question for any S. aureus: <strong>MRSA or MSSA</strong>. The answer determines the entire treatment strategy. Our pipeline provides a complete genomic answer: mecA/mecC status, full AMR profile across all antibiotic classes, virulence factors (PVL, TSST-1, biofilm), and molecular strain type.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP, R10.4.1). Material: blood, pus, sputum, biopsy, wound swab.</li>' +
    '<li><strong>📤 Output:</strong> HTML report for clinician — MRSA/MSSA status, full AMR profile, key virulence factors, SCCmec type; QC report for bioinformatician.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🎯 Resistance Genes and Clinical Phenotypes</h2>' +
    '<h3>Beta-lactams — key question: MRSA or MSSA</h3>' +
    tbl(['Gene', 'Mechanism', 'Phenotype'], [
      ['<strong>mecA</strong>', 'Modified PBP2a — insensitive to β-lactams', '<strong>MRSA</strong> — resistance to all β-lactams'],
      ['<strong>mecC</strong>', 'Divergent mecA variant (LA-MRSA CC130)', '<strong>MRSA</strong> — detected less well by standard tests'],
      ['<strong>blaZ</strong>', 'β-lactamase', 'Penicillin resistance (>95% of isolates)']
    ]) +
    '<h3>SCCmec types and epidemiological MRSA categories</h3>' +
    '<p>The SCCmec cassette is a genomic island carrying mecA/mecC. Its type indicates the strain\'s origin and informs the response:</p>' +
    tbl(['Category', 'SCCmec', 'Typical clones', 'Features'], [
      ['<strong>HA-MRSA</strong> (hospital)', 'I, II, III', 'CC5, CC8 (ST239)', 'Multidrug resistance, ICU, prolonged hospital outbreaks'],
      ['<strong>CA-MRSA</strong> (community)', 'IV, V', 'CC8/USA300, CC80', 'Often PVL+, severe skin infections in healthy people'],
      ['<strong>LA-MRSA</strong> (livestock)', 'V, XI (mecC)', 'CC398, CC130', 'Animal contact; mecC is missed by mecA rapid tests']
    ]) +
    '<h3>Glycopeptides — last resort for MRSA</h3>' +
    tbl(['Gene', 'Phenotype', 'Significance'], [
      ['<strong>vanA</strong>', '<strong>VRSA</strong> (MIC ≥16 μg/mL)', 'Rare but lethal — absolute emergency'],
      ['<strong>vanB</strong>', 'VRSA (moderate)', 'Rare'],
      ['<strong>No vanA/B + thickened cell wall</strong>', '<strong>hVISA/VISA</strong>', 'Vancomycin heteroresistance (critical in treatment failure)']
    ]) +
    '<h3>Other antibiotic classes</h3>' +
    tbl(['Gene', 'Mutation / Mechanism', 'Antibiotic Class'], [
      ['<strong>ermA / ermB / ermC</strong>', '23S rRNA methylase', 'Macrolides, lincosamides (clindamycin) — MLSB'],
      ['<strong>tetM / tetK</strong>', 'Ribosome protection / efflux', 'Tetracyclines'],
      ['<strong>aac(6\')/aph(2")</strong>', 'Aminoglycoside modification', 'Gentamicin, tobramycin'],
      ['<strong>grlA / gyrA</strong> (mutations)', 'Altered target', 'Fluoroquinolones (ciprofloxacin)'],
      ['<strong>rpoB</strong> (mutations)', 'Altered RNA polymerase', 'Rifampicin'],
      ['<strong>mupA</strong>', 'Altered isoleucyl-tRNA synthetase', 'Mupirocin (high-level) — decolonisation failure'],
      ['<strong>cfr</strong>', '23S rRNA methylase', 'Linezolid, chloramphenicol']
    ]) +
    '<h3>Antibiotic profile in the report</h3>' +
    tbl(['Antibiotic', 'Class', 'Role in S. aureus'], [
      ['<strong>Oxacillin</strong>', 'Penicillinase-stable β-lactam', 'Surrogate MRSA marker (R → MRSA)'],
      ['<strong>Vancomycin</strong>', 'Glycopeptide', 'Gold standard for MRSA treatment'],
      ['<strong>Ceftaroline / Ceftobiprole</strong>', '5th-generation cephalosporin', 'The only β-lactams active against MRSA (PBP2a affinity)'],
      ['<strong>Linezolid</strong>', 'Oxazolidinone', 'Alternative in vancomycin intolerance'],
      ['<strong>Daptomycin</strong>', 'Lipopeptide', 'MRSA bacteraemia and endocarditis'],
      ['<strong>Clindamycin</strong>', 'Lincosamide', 'MRSA SSTI (D-test for inducible resistance)'],
      ['<strong>Rifampicin</strong>', 'Ansamycin', 'Biofilm, combination therapy'],
      ['<strong>Mupirocin</strong>', 'Topical antibiotic', 'Decolonisation of MRSA carriers']
    ]) + '<hr>' +
    '<h2>☣️ Virulence Factors</h2>' +
    tbl(['Gene', 'Factor', 'Clinical Significance'], [
      ['<strong>pvl</strong> (lukSF-PV)', 'PVL (Panton-Valentine Leukocidin)', 'Necrotising pneumonia, recurrent skin abscesses'],
      ['<strong>tst</strong>', 'TSST-1 (Toxic Shock Syndrome Toxin-1)', 'Toxic shock syndrome'],
      ['<strong>hla</strong>', 'α-toxin (haemolysin)', 'Tissue necrosis, erythrocyte destruction'],
      ['<strong>icaADBC</strong>', 'Biofilm (polysaccharide PIA/PNAG)', 'Implant and catheter-associated infections'],
      ['<strong>sdrCDE, fnbAB</strong>', 'Fibronectin-binding proteins', 'Endothelial adhesion → endocarditis']
    ]) + '<hr>' +
    '<h2>🏥 Clinical Use Cases</h2>' +
    tbl(['Scenario', 'What the pipeline resolves'], [
      ['<strong>Bacteraemia / ICU sepsis</strong>', 'MRSA/MSSA within hours — vancomycin vs oxacillin chosen knowingly'],
      ['<strong>Pre-operative screening</strong>', 'Nasal S. aureus carriage → mupirocin + chlorhexidine decolonisation before surgery'],
      ['<strong>Necrotising pneumonia</strong>', 'PVL+ CA-MRSA detection — urgent therapy escalation'],
      ['<strong>Implant / catheter infection</strong>', 'Biofilm (ica+) → rifampicin combination, implant replacement decision'],
      ['<strong>Vancomycin failure</strong>', 'Suspected hVISA/VISA — timely switch to linezolid or daptomycin'],
      ['<strong>Decolonisation failure</strong>', 'mupA → high-level mupirocin resistance, regimen change']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq SA Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>SA-Res-Detector</strong>', 'AMR phenotype prediction from WGS (all antibiotic classes)'],
      ['<strong>SA-Virulence-Classifier</strong>', 'Virulence profile classification (PVL+/-, biofilm+/-)'],
      ['<strong>SA-Typer</strong>', 'In silico MLST and SCCmec typing (CC8/USA300, CC5, CC22, CC398)']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>, <code>pigz</code>'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2 2.26</code>, <code>samtools</code> (Reference: S. aureus MRSA252 / USA300)'],
      ['<strong>3. Variant Calling</strong>', '<code>clair3 ≥1.0.4</code>, <code>medaka</code>'],
      ['<strong>4. AMR and virulence gene detection</strong>', '<code>AMRFinderPlus</code> (NCBI), <code>abricate</code> (CARD, Resfinder, VFDB)'],
      ['<strong>5. SCCmec, MLST and spa typing</strong>', '<code>sccmec</code> (SCCmecFinder), <code>mlst</code> (PubMLST S. aureus), <code>spaTyper</code>'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>WHO, 2017</strong> — MRSA listed as a priority pathogen (high priority category).</li>' +
    '<li><strong>Russia</strong> — MRSA accounts for 30–60% of nosocomial S. aureus in ICUs depending on the hospital.</li>' +
    '<li><strong>PVL-MRSA</strong> — CC8/USA300 strains with the <em>pvl</em> gene cause outbreaks of necrotising pneumonia in young, previously healthy patients; documented in Russia.</li>' +
    '<li><strong>LA-MRSA CC398</strong> — Livestock-Associated MRSA; mecC-MRSA is not detected by standard mecA rapid tests.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/WHO-EMP-IAU-2017.12">WHO — Global Priority Pathogen List for AMR</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — Comprehensive Antibiotic Resistance Database</a></li>' +
    '<li>📄 <a href="https://www.bv-brc.org/">BV-BRC — Bacterial and Viral Bioinformatics Resource Center (>10,000 S. aureus genomes)</a></li>' +
    '<li>📄 <a href="https://www.genomicepidemiology.org/services/">SCCmecFinder — SCCmec cassette typing</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/staphylococcus-aureus">PubMLST S. aureus MLST Database</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/">EUCAST — clinical breakpoints for S. aureus</a></li></ul>';

  /* ── PHYTOPHTHORA ── */
  EN['/phytophthora/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>Metagenomic Identification of Plant Pathogens and Fungicide Resistance</h1>' +
    '<p style="font-size:1.2em;color:#555">Nanopore sequencing for plant protection — P. infestans, Fusarium, Botrytis and others. Right in the field.</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p>Plant diseases caused by oomycetes (Phytophthora), fungi (Fusarium, Botrytis, Alternaria) and bacteria (Pseudomonas, Pectobacterium) cause enormous economic losses in agriculture. Our pipeline provides rapid identification of plant pathogens and their fungicide resistance profile directly in the field — from sample collection to result in hours.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data from ITS amplicon sequencing (ITS1/ITS2) or whole-metagenome. Material: infected leaf, root, fruit tissue.</li>' +
    '<li><strong>📤 Output:</strong> Report for agronomist with identified pathogens, fungicide resistance profile, and treatment recommendations.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🌿 Detectable Plant Pathogens</h2>' +
    tbl(['Pathogen', 'Disease', 'Economic Significance'], [
      ['<strong>Phytophthora infestans</strong>', 'Late blight of potato and tomato', 'Most damaging pathogen of potatoes; caused the Irish famine'],
      ['<strong>Fusarium oxysporum / graminearum</strong>', 'Fusarium wilt, ear blight', 'Mycotoxin contamination (DON, ZEN) — food safety threat'],
      ['<strong>Botrytis cinerea</strong>', 'Grey mould', 'Affects >200 plant species; serious post-harvest losses'],
      ['<strong>Alternaria alternata / solani</strong>', 'Early blight, leaf spot', 'Potato, tomato, grain crops'],
      ['<strong>Plasmopara viticola</strong>', 'Grapevine downy mildew', 'Key pathogen of viticulture'],
      ['<strong>Peronospora / Bremia</strong>', 'Downy mildew of vegetables', 'Spinach, lettuce, onion'],
      ['<strong>Pythium ultimum</strong>', 'Root rot, damping-off of seedlings', 'Greenhouse and field crops'],
      ['<strong>Rhizoctonia solani</strong>', 'Root and stem rot', 'Potato, grain crops, sugar beet'],
      ['<strong>Sclerotinia sclerotiorum</strong>', 'White mould', 'Rapeseed, sunflower, vegetables']
    ]) + '<hr>' +
    '<h2>🎯 Fungicide Resistance Markers</h2>' +
    tbl(['Gene', 'Key Mutations', 'Fungicide Class (FRAC)'], [
      ['<strong>CesA3</strong> (cellulose synthase)', 'G1105S, V1109L', 'CAA — mandipropamid, dimethomorph (FRAC 40)'],
      ['<strong>CYP51</strong> (sterol 14α-demethylase)', 'Y137F, G460S, L50S', 'DMI — tebuconazole, propiconazole (FRAC 3)'],
      ['<strong>BcSdhB / BcSdhC / BcSdhD</strong>', 'H272Y/R/L, N230I', 'SDHI — boscalid, fluxapyroxad (FRAC 7)'],
      ['<strong>Cytb</strong> (cytochrome b)', 'G143A, F129L', 'QoI — azoxystrobin, trifloxystrobin (FRAC 11)'],
      ['<strong>β-Tubulin</strong>', 'E198A/K/G, F200Y', 'MBC — carbendazim, thiophanate-methyl (FRAC 1)'],
      ['<strong>PiORP1</strong> (P. infestans oxysterol receptor)', 'V1109L, G1105S', 'Resistance to carboxylic acid amides']
    ]) + '<hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq Phyto Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>PlantPath-Classifier</strong>', 'ITS-based metagenomic classification of plant pathogens'],
      ['<strong>FungRes-Detector</strong>', 'Fungicide resistance prediction (CYP51, SDHI, QoI targets)'],
      ['<strong>Phyto-Subtyper</strong>', 'Molecular typing of Phytophthora infestans genotypes']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code>'],
      ['<strong>2. ITS amplicon processing</strong>', '<code>minimap2</code>, custom ITS1/ITS2 primer trimming'],
      ['<strong>3. Taxonomic classification</strong>', '<code>Kraken2</code> + <code>Bracken</code> (UNITE ITS database + custom oomycetes)'],
      ['<strong>4. Fungicide resistance mutation detection</strong>', '<code>clair3</code> / <code>medaka</code> + custom FRAC mutation database'],
      ['<strong>5. ML inference</strong>', '<code>PyTorch</code>, <code>pandas</code>, <code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>FRAC (Fungicide Resistance Action Committee)</strong> — international working group monitoring fungicide resistance; MoA classification and cross-resistance groups are the global standard.</li>' +
    '<li><strong>UNITE ITS database</strong> — the global reference database for fungal ITS barcoding (>400,000 fungal sequences).</li>' +
    '<li><strong>Russia</strong> — late blight of potato (P. infestans) causes annual losses of 20–30% of the harvest in unfavourable years; rapid resistance genotyping enables targeted fungicide application.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — Fungicide Resistance Action Committee</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — ITS Database for Fungi Identification</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/">NCBI Pathogen Detection</a></li></ul>';

  /* ── IDENTIKIT ── */
  EN['/identikit/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_identikit.svg" alt="Forensic DNA Phenotyping" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>Forensic DNA Phenotyping — DNA Portrait from a Crime Scene</h1>' +
    '<p style="font-size:1.2em;color:#555">Predicting eye, hair, skin colour, biogeographic ancestry, and age from trace DNA amounts — right at the crime scene</p></div><hr>' +
    '<h2>🧬 Pipeline Description</h2>' +
    '<p><strong>Forensic DNA Phenotyping (FDP)</strong> is a branch of forensic genomics that generates an appearance description of an unknown individual from biological traces (blood, saliva, hair root, epithelium) — without a DNA profile in a database.</p>' +
    '<p>Unlike traditional DNA profiling (STR analysis for database comparison), FDP <strong>creates a description from nothing</strong>: the investigator receives a probabilistic phenotypic portrait even with no suspects present. Our pipeline, running on OnSiteSeq Edge, performs analysis on-site or in a mobile laboratory without transmitting genetic data to the cloud.</p>' +
    '<ul><li><strong>📥 Input:</strong> Raw <code>FASTQ</code> data after High Accuracy basecalling (Dorado SUP). Material: blood, saliva, hair root, epithelium from objects.</li>' +
    '<li><strong>📤 Output:</strong> PDF/HTML report for the investigator — probabilistic phenotypic portrait with confidence intervals for each characteristic; technical QC report with marker coverage data.</li></ul><hr>' +
    av('dev', 'dev', 'none') + '<hr>' +
    '<h2>🔍 Determinable Characteristics</h2>' +
    tbl(['Characteristic', 'Method', 'Accuracy'], [
      ['<strong>Eye colour</strong>', 'HIrisPlex-S (41 SNPs)', 'AUC >0.95 (blue vs brown)'],
      ['<strong>Hair colour</strong>', 'HIrisPlex-S', 'AUC ~0.89 (black/dark vs light vs red)'],
      ['<strong>Skin colour</strong>', 'HIrisPlex-S (FST 1–6 scale)', 'Sensitivity ~80%'],
      ['<strong>Biogeographic ancestry</strong>', 'AIMs panel + PCA', 'Continent >95% accuracy; sub-population ~80%'],
      ['<strong>Biological age</strong>', 'Epigenetic clocks (DNA methylation)', 'Error ±3–5 years'],
      ['<strong>Biological sex</strong>', 'Amelogenin (AMEL X/Y)', '100% with sufficient coverage'],
      ['<strong>Kinship</strong>', 'IBD segment analysis (low-pass WGS + imputation of ~600k SNPs)', '1st–3rd degree (investigative genealogy)']
    ]) + '<hr>' +
    '<h2>🎯 Key SNP Markers and Genes</h2>' +
    '<h3>HIrisPlex-S System (eye, hair, skin colour)</h3>' +
    tbl(['Gene', 'Key SNPs', 'Trait'], [
      ['<strong>HERC2 / OCA2</strong>', 'rs12913832', 'Main blue/brown eye switch'],
      ['<strong>SLC45A2</strong>', 'rs16891982', 'Skin and hair colour (European light skin)'],
      ['<strong>SLC24A4</strong>', 'rs12896399', 'Blue/green eye shade'],
      ['<strong>MC1R</strong>', 'rs1805007, rs1805008', 'Red hair, freckles'],
      ['<strong>IRF4</strong>', 'rs12203592', 'Light hair, blue eyes'],
      ['<strong>TYR</strong>', 'rs1042602', 'Skin pigmentation'],
      ['<strong>KITLG</strong>', 'rs12821256', 'Light hair']
    ]) +
    '<h3>mtDNA and Y-chromosome Haplogroups</h3>' +
    '<p>Long nanopore reads cover the entire mitochondrial genome and deterministic regions of the Y chromosome, enabling uniparental lineage assignment:</p>' +
    tbl(['Marker', 'Lineage', 'Investigative value'], [
      ['<strong>Mitochondrial DNA (mtDNA)</strong>', 'Maternal', 'Haplogroup (H, U, T, J, K, etc.) — narrows the search; useful for degraded samples with little nuclear DNA'],
      ['<strong>Y chromosome (Y-SNP)</strong>', 'Paternal', 'Haplogroup (R1a, R1b, N, I, etc.) — narrows the search to a male lineage'],
      ['<strong>Y-STR</strong>', 'Paternal', 'Compatibility with classical Y-STR databases']
    ]) +
    '<p>Haplogroups do not identify a person directly, but drastically reduce the search space and are used to exclude lineages in investigative genealogy.</p>' +
    '<h3>Epigenetic Age</h3>' +
    tbl(['Model', 'Markers', 'Applicability'], [
      ['<strong>Horvath clock</strong>', '353 CpG sites', 'Universal — all tissues'],
      ['<strong>Hannum clock</strong>', '71 CpG sites', 'Blood'],
      ['<strong>DNAmAge (blood/saliva)</strong>', '>800 CpG', 'Most accurate for forensics']
    ]) + '<hr>' +
    '<h2>🆚 FDP Among Forensic Methods</h2>' +
    tbl(['Method', 'What it provides', 'When to use'], [
      ['<strong>STR profiling (CODIS/national DB)</strong>', 'Database identification', 'A suspect exists or the profile is already in a database; FDP does not replace STR'],
      ['<strong>FDP (HIrisPlex-S + AIMs)</strong>', 'Probabilistic appearance portrait', 'Database is silent, no suspects — a description is needed to guide the search'],
      ['<strong>Nanopore WGS (low coverage)</strong>', 'Haplogroups, kinship, full SNP profile', 'Investigative genealogy, complex mixtures, unidentified remains']
    ]) +
    '<p>FDP complements classical STR analysis rather than replacing it: the portrait guides the investigation, but legal identification still comes from STR profile matching.</p><hr>' +
    '<h2>⚠️ Limitations and Boundaries</h2>' +
    '<ul><li><strong>DNA mixtures</strong> — with traces from 2+ donors, a portrait is built only after mixture deconvolution; at donor ratios worse than 1:10, interpretation of the minor component is unreliable.</li>' +
    '<li><strong>Low template DNA (LT-DNA)</strong> — below ~100 pg of DNA, allele drop-out is possible; the report must state coverage for every marker.</li>' +
    '<li><strong>Degraded DNA</strong> — fragmentation below 150 bp is critical for amplicon schemes; long nanopore reads partially compensate via a WGS approach.</li>' +
    '<li><strong>Probabilistic nature</strong> — FDP outputs categories with probabilities ("brown eyes, P=0.87"), not a photograph; the result is intelligence, not evidence.</li>' +
    '<li><strong>Population calibration</strong> — models are trained on specific cohorts; error is higher for admixed populations, which is stated in the report.</li></ul><hr>' +
    '<h2>⚙️ Versions and ML Models</h2>' +
    tbl(['Component', 'Status'], [['<strong>OnSiteSeq FDP Pipeline</strong>', '🟡 In development']]) +
    tbl(['Model', 'Target Task'], [
      ['<strong>HIrisPlex-Nano</strong>', 'EVC prediction from nanopore reads of HIrisPlex-S markers'],
      ['<strong>AIM-Classifier</strong>', 'Biogeographic ancestry classification (RF + NN ensemble)'],
      ['<strong>EpiAge-Nano</strong>', 'Biological age estimation from CpG methylation in nanopore data']
    ]) + '<hr>' +
    '<h2>🛠 Under the Hood: Pipeline Stack</h2>' +
    tbl(['Pipeline Stage', 'Libraries and Tools'], [
      ['<strong>1. Quality Control (QC)</strong>', '<code>porechop_abi</code>, <code>NanoFilt</code> (settings for degraded DNA)'],
      ['<strong>2. Alignment (Mapping)</strong>', '<code>minimap2</code> (ref: GRCh38/hg38)'],
      ['<strong>3. SNP Genotyping</strong>', '<code>clair3</code>, <code>medaka</code> (target: HIrisPlex-S and AIMs positions)'],
      ['<strong>4. Methylation detection</strong>', '<code>modkit</code> (Nanopore 5mC-modes from native DNA)'],
      ['<strong>5. Sex (Amelogenin)</strong>', 'Custom AMEL X/Y coverage script'],
      ['<strong>6. ML inference</strong>', '<code>PyTorch</code>, <code>scikit-learn</code> (HIrisPlex-S models + AIM classifier)']
    ]) + '<hr>' +
    '<h2>⚖️ Legal and Ethical Context</h2>' +
    tbl(['Aspect', 'Regulatory Framework'], [
      ['<strong>Legal basis (Russia)</strong>', 'Federal Law-73 "On State Forensic Expert Activity"; Federal Law-144 "On Operational Investigation Activity"'],
      ['<strong>Genomic database</strong>', 'Federal DNA Database (FDBD) — maintained by the MVD of Russia (Forensic Centre)'],
      ['<strong>Personal data</strong>', 'Federal Law-152; biometric data — special category'],
      ['<strong>International standards</strong>', 'ENFSI DNA Working Group; ISO/IEC 17025'],
      ['<strong>Probabilistic interpretation</strong>', 'All FDP results are <strong>probabilistic</strong>, not deterministic. Used to guide investigation — not as evidence']
    ]) + '<hr>' +
    '<h2>🌍 Global Context</h2>' +
    '<ul><li><strong>Netherlands (Erasmus MC)</strong> — developers of the HIrisPlex-S system; FDP already applied in criminal investigations in Europe, Australia, USA.</li>' +
    '<li><strong>Russia</strong> — the Federal DNA Database (FDBD) operated by the MVD is in place; mobile DNA laboratories and point-of-care trace analysis are an area of active interest for law enforcement.</li>' +
    '<li><strong>Investigative genealogy</strong> — methodology for finding relatives of an unknown person via genomic databases (as in the Golden State Killer case, USA). Requires separate legal regulation in Russia.</li></ul><hr>' +
    '<h2>🗺 Roadmap</h2>' +
    '<ul><li><strong>Generative facial reconstruction</strong> — moving from categorical traits to a composite facial image (Parabon Snapshot-class solutions) from whole-genome data.</li>' +
    '<li><strong>ML-based mixture deconvolution</strong> — automatic separation of 2–3 donor profiles from a metagenomic trace.</li>' +
    '<li><strong>FDBD integration</strong> — automatic matching of STR profiles obtained from nanopore data against the federal database.</li>' +
    '<li><strong>ISO/IEC 17025 validation</strong> — interlaboratory comparisons and method accreditation for forensic use.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://hirisplex.erasmusmc.nl/">HIrisPlex-S — online EVC prediction system (Erasmus MC)</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=HIrisPlex-S+system+eye+hair+skin">HIrisPlex-S — original publication (PubMed)</a></li>' +
    '<li>📄 <a href="https://www.visage-h2020.eu/">VISAGE — EU consortium for genomic appearance reconstruction</a></li>' +
    '<li>📄 <a href="https://enfsi.eu/working-groups/dna/">ENFSI DNA Working Group — forensic genomics standards</a></li>' +
    '<li>📄 <a href="https://www.internationalgenome.org/">1000 Genomes Project</a></li>' +
    '<li>📄 <a href="https://www.hagsc.org/hgdp/">HGDP — Human Genome Diversity Project</a></li></ul>';

  /* ── POST PAGES (layout: post — title handled by i18n-post-title) ── */

  /* ── ABOUT ── */
  EN['/aboutonsiteseq'] =
    '<h1>About the Complex</h1><hr>' +
    '<h2>OnSiteSeq Edge</h2>' +
    '<p>Autonomous hardware-software complex (HSC). From FASTQ to clinical conclusion right at the patient\'s bedside or physician\'s desk. Can be used in the field, in remote arctic regions, etc.</p>' +
    '<p>Built-in sample preparation tools. Data acquired from the built-in Nanoporus sequencer, processed by the Nvidia Jetson AGX GPU module. Ability to print clinical and bioinformatics reports on the built-in thermal printer.</p>' +
    '<p>OnSiteSeq Cockpit bioinformatics container management system is adapted for touchscreen use. Bioinformatics tools distributed via OnSiteSeq Harbor as arm64 Docker containers. Tools adapted for arm64 architecture and GPGPU computing. Open architecture. Continuously updated marketplace of arm64 containers.</p>' +
    '<p><a href="/edge/">More information — OnSiteSeq Edge →</a></p><hr>' +
    '<h2>OnSiteSeq Desktop</h2>' +
    '<p>OnSiteSeq Cockpit bioinformatics container management system variant adapted for the physician\'s or researcher\'s workstation. Can work paired with OnSiteSeq Edge or use data from other equipment. Bioinformatics tools distributed via OnSiteSeq Harbor as x86 Docker containers. Continuously updated marketplace of x86 containers.</p>' +
    '<p><a href="/desktop/">More information — OnSiteSeq Desktop →</a></p><hr>' +
    '<h2>OnSiteSeq Cloud</h2>' +
    '<p>OnSiteSeq Cockpit bioinformatics container management system variant adapted for cloud providers. Can work paired with OnSiteSeq Edge or use data from other equipment. Bioinformatics tools distributed via OnSiteSeq Harbor as x86 Docker containers. Continuously updated marketplace of x86 containers.</p>' +
    '<p><a href="/cloud/">More information — OnSiteSeq Cloud →</a></p>';

  /* ── MFTI ── */
  EN['/mfti'] =
    '<h1>MIPT — Forge of Innovation</h1>' +
    '<div style="text-align:center;margin-bottom:2rem"><img src="/assets/images/mfti/mfti.png" alt="Moscow Institute of Physics and Technology" style="max-width:100%;border-radius:8px;"></div>' +
    '<h2>The Project Was Born at MIPT</h2>' +
    '<p><strong>OnSiteSeq</strong> is a medtech startup developed at the Moscow Institute of Physics and Technology (MIPT, Phystech). The hardware-software complex for genomic surveillance of infectious diseases, operating on the basis of nanopore sequencing and proprietary containerised pipelines and ML models, was created with the support of the "Pusk" Centre and scientific supervisor <strong>Nikita Sergeyevich Radchenko</strong>.</p><hr>' +
    '<h2>📰 OnSiteSeq Press Release</h2>' +
    '<h3>MIPT Researchers Developed Domestic ML Models for HIV-1 Drug Resistance and Subtype Diagnostics</h3>' +
    '<p>Student-researcher <strong>Roman Gorbenko</strong> (<a href="https://habr.com/ru/users/romangorbenko/articles/">Habr profile</a>) and his scientific supervisor <strong>Nikita Radchenko</strong> developed domestic ML models for HIV-1 drug resistance and subtype diagnostics.</p>' +
    '<p>The key achievement is a functional domestic analogue of two foreign platforms: the American <strong>Stanford HIV Drug Resistance Database (HIVDB)</strong> and the European web service <strong>COMET</strong> (Luxembourg Institute of Health), which had been used without alternative by Russian researchers until recently.</p>' +
    '<p>External validation on a dataset provided by <strong>CRIFEM Rospotrebnadzor</strong> showed a mean <strong>AUC = 0.990</strong> — a clinically significant level of accuracy for diagnostic applications. The developed ML models were tested within full-cycle bioinformatics pipelines — from raw genomic reads to clinically significant reports — and deployed on the specially developed hardware-software complex <strong><a href="https://onsiteseq.io/edge/">OnSiteSeq Edge</a></strong>.</p><hr>' +
    '<h2>🔬 Other MIPT Innovations</h2>' +
    '<p>Phystech actively conducts research at the cutting edge of science and technology. Some recent achievements:</p>' +
    '<p><strong><a href="https://mipt.ru/news/v-mfti-uskorili-modelirovanie-vzryva-atomnogo-yadra-">MIPT Accelerated Nuclear Explosion Modelling</a></strong><br>New approach to numerical modelling of nuclear processes with significant computation acceleration.</p>' +
    '<p><strong><a href="https://www.cnews.ru/news/line/2025-07-30_inzhenery_mfti_podgotovili">MIPT Engineers Prepared Import-Substituting Control System for Marine Seismic Survey</a></strong><br>Domestic replacement for foreign control systems for offshore geological exploration.</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855092/">MIPT Developed Import-Independent Software for Oil and Gold Prospectors</a></strong><br>Software for geological data interpretation without dependence on foreign vendors.</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855038/">Neuromorphic Computer Creation Advances: Russian Scientists Created a Flexible Artificial Synapse</a></strong><br>Breakthrough in neuromorphic computing — flexible synapse based on new materials.</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855084/">5G Radio Module Node Created at MIPT Successfully Passed Tests</a></strong><br>Domestic 5G radio module completed full testing cycle and confirmed compliance with standards.</p>';

  /* ── CITATION ── */
  EN['/citation'] =
    '<h2>Citing OnSiteSeq</h2>' +
    '<h3>📕 RSCI-indexed paper — the term BioMLOps enters science</h3>' +
    '<p><strong>Gorbenko R. A.</strong> "Lifecycle Management Methodology for Machine-Learning Models in Biomedical Applications: A Study on HIV-1 Resistance Data" // Youth and Modern Information Technologies: Proceedings of the XXIII International Scientific and Practical Conference of Students, Postgraduates and Young Scientists (Tomsk, February 18–20, 2026). — Tomsk: Tomsk Polytechnic University, 2026. — P. 370–375.</p>' +
    '<p>✅ <strong>The paper is indexed in RSCI</strong> (eLIBRARY ID: 91848892, EDN: WETXLG).</p>' +
    '<p>This article <strong>introduces the term BioMLOps</strong> — an adaptation of MLOps methodologies to computational biology: a managed model lifecycle (from CNN + Self-Attention architecture selection to continuous metric monitoring on reference data), automatic experiment versioning with regression testing, and a retraining pipeline triggered by external database updates (Stanford HIVDB) with automatic model degradation detection. The approach is demonstrated on the HIV-1-Resist-Rus system; code and model weights are open on GitVerse.</p>' +
    '<p>🔗 <a href="https://www.elibrary.ru/item.asp?id=91848892&pff=1">https://www.elibrary.ru/item.asp?id=91848892</a></p>' +
    '<hr>' +
    '<img src="/assets/images/publication/mnsk_1.JPG" alt="MNSK-2026 Proceedings Cover" style="max-width:260px; float:right; margin:0 0 1.5rem 2rem; border-radius:6px; box-shadow:0 2px 14px rgba(0,0,0,0.18);">' +
    '<p>The HIV-1-M-Env-Rus method is published in the proceedings of the 64th International Scientific Student Conference (ISSC-2026), NSU, 2026, p. 155.</p>' +
    '<p>🔗 <a href="https://www.nsu.ru/n/issc/collection/">https://www.nsu.ru/n/issc/collection/</a></p>' +
    '<hr>' +
    '<p>Gorbenko R. A. "Drug Resistance Determination and HIV-1 Subtype Classification on the OnSiteSeq HSC" // 68th All-Russian Scientific Conference of MIPT (section "Biological and Medical Physics"), 2026.</p>' +
    '<p>🔗 <a href="https://conf.mipt.ru/page/conference-materials">https://conf.mipt.ru/page/conference-materials</a></p>';

  /* ── RUWIKI ── */
  EN['/ruwiki'] =
    '<h1>RuWiki</h1>' +
    '<h2>Website Content = Article for RuWiki</h2>' +
    '<p>We believe it is important to develop the Russian-language encyclopaedia RuWiki and actively contribute to its content.</p>';

  /* ── NORMATIV ── */
  EN['/normativ'] =
    '<h1>Legislation Supporting Innovation and Personalised Medicine</h1>' +
    '<h2>Regulatory Framework</h2>' +
    '<p><strong>Russia:</strong> <a href="http://www.kremlin.ru/acts/bank/50358">Presidential Decree No. 145. On the Strategy for Scientific and Technological Development of the Russian Federation</a></p>' +
    '<p><strong>International community:</strong> <a href="https://news.un.org/en/story/2024/09/1154891">UN Strategy. Invisible killer: What is antimicrobial resistance?</a></p>';

  /* ── GxP ── */
  EN['/gxp'] =
    '<h1>GxP: Good Practice Standards for Quality Assurance</h1>' +
    '<p>In developing OnSiteSeq, we strictly follow international GxP standards to ensure quality and data integrity at all stages — from sample collection to clinical conclusion.</p><hr>' +
    '<h2>What is GxP</h2>' +
    '<p><strong>GxP</strong> — a general term for the family of "Good X Practice" standards regulating quality in medical and pharmaceutical industries:</p>' +
    tbl(['Standard', 'Full Name', 'Application Area'], [
      ['<strong>GMP</strong>', 'Good Manufacturing Practice', 'Medical device manufacturing'],
      ['<strong>GLP</strong>', 'Good Laboratory Practice', 'Laboratory research'],
      ['<strong>GCP</strong>', 'Good Clinical Practice', 'Clinical trials'],
      ['<strong>GDP</strong>', 'Good Distribution Practice', 'Distribution']
    ]) + '<hr>' +
    '<h2>ALCOA+ and OnSiteSeq</h2>' +
    '<p><strong>ALCOA+</strong> — a set of data integrity principles adopted in the pharmaceutical and medical industries. It ensures that data is reliable, authentic, and verifiable at any stage of its lifecycle.</p>' +
    '<h3>A — Attributable</h3><p><em>Who performed the analysis and which algorithm produced the result?</em></p>' +
    '<ul><li><strong>Device authorisation.</strong> When using the touchscreen, the healthcare worker authorises before launching, so logs record exactly who initiated the processes.</li>' +
    '<li><strong>Pipeline, tool, and model versioning.</strong> OnSiteSeq bioinformatics reports contain versions of all components: proprietary pipelines, ML models, and dependency tools — strictly in accordance with the attributability principle.</li></ul>' +
    '<h3>L — Legible</h3><p><em>Is the data understandable to a physician and auditor years later?</em></p>' +
    '<ul><li><strong>Dual reporting.</strong> Results split into <strong>Clinical Report</strong> for the clinician and <strong>Bioinformatics QC Report</strong> for the specialist.</li>' +
    '<li><strong>Physical and digital copies.</strong> Built-in thermal printer provides instant on-site readability. Digital PDF copies saved on SSD with clear file nomenclature.</li></ul>' +
    '<h3>C — Contemporaneous</h3><p><em>Is data recorded at the moment it is generated?</em></p>' +
    '<ul><li><strong>Timestamps.</strong> All stages — from GPU base-calling to report output — are logged in real time.</li>' +
    '<li><strong>Time synchronisation.</strong> Since OnSiteSeq Edge can operate autonomously in the field, the internal clock cannot be manually changed by the user. Synchronisation occurs via the Wi-Fi/4G module on network connection.</li></ul>' +
    '<h3>O — Original</h3><p><em>Are primary "raw" data preserved?</em></p>' +
    '<ul><li><strong>Signal storage.</strong> Before the Dorado ML model converts nanopore electrical signals to nucleotides, the system saves primary raw data (POD5/FAST5 formats) to SSD.</li>' +
    '<li><strong>Immutability.</strong> Source reads are never overwritten during genome assembly and analysis.</li></ul>' +
    '<h3>A — Accurate</h3><p><em>Are the data reliable and is there quality control?</em></p>' +
    '<ul><li><strong>QC metrics.</strong> The bioinformatics report contains key metrics: genome coverage percentage, mean depth, and blind zones.</li>' +
    '<li><strong>AI confidence.</strong> The clinical report displays neural network confidence as a percentage (e.g., 99.98% for subtype B), so the physician can assess prediction reliability.</li></ul>' +
    '<h3>+ (Plus)</h3>' +
    tbl(['Principle', 'Implementation in OnSiteSeq'], [
      ['<strong>Complete</strong>', 'OnSiteSeq Cockpit saves logs of even interrupted or failed runs (status "FAIL" if coverage <80%)'],
      ['<strong>Consistent</strong>', 'Strict workflow: the analysis pipeline cannot start until amplification and sequencing have hardware-completed']
    ]) + '<hr>' +
    '<h2>Russian and International Standards</h2>' +
    tbl(['Standard', 'Area'], [
      ['<strong>ISO 13485</strong>', 'Quality management systems for medical devices'],
      ['<strong>ISO 14971</strong>', 'Risk management for medical devices'],
      ['<strong>GOST R 52600</strong>', 'Medical devices'],
      ['<strong>Federal Law-61</strong>', 'Circulation of medicinal products']
    ]);

  /* ── SBER / GITVERSE ── */
  EN['/sber'] =
    '<h1>GitVerse — OnSiteSeq Project Repository</h1>' +
    '<h2>What is GitVerse</h2>' +
    '<p><strong>GitVerse</strong> is a Russian platform for code storage and collaborative development from Sber. Functionally analogous to GitHub: supports Git, pull requests, CI/CD, issue tracking, and code review. Data is stored on servers in Russia, complying with Federal Law-152 requirements and data sovereignty for a medical project.</p>' +
    '<p><a href="https://gitverse.ru/onsiteseq"><img src="/assets/images/gitverse/gitverse.png" alt="OnSiteSeq repository on GitVerse"></a></p>' +
    '<p><strong>Project repository:</strong> <a href="https://gitverse.ru/onsiteseq">gitverse.ru/onsiteseq</a></p><hr>' +
    '<h2>CI/CD Pipeline OnSiteSeq</h2>' +
    '<p>The entire cycle from commit to ready Docker container in the registry is automated via GitVerse CI.</p>' +
    '<h3>Pipeline Stages</h3>' +
    tbl(['Stage', 'What Happens'], [
      ['<strong>1. Push to GitVerse</strong>', 'Developer pushes changes to repository'],
      ['<strong>2. Lint &amp; Tests</strong>', 'Automated code checking: linters, pipeline unit tests'],
      ['<strong>3. Build arm64</strong>', 'Docker image build for arm64 architecture (OnSiteSeq Edge)'],
      ['<strong>4. Build x86</strong>', 'Docker image build for x86 architecture (Desktop, Cloud)'],
      ['<strong>5. Push → Harbor</strong>', 'Ready images published to <a href="https://harbor.onsiteseq.io">harbor.onsiteseq.io</a> registry'],
      ['<strong>6. Deploy</strong>', 'Update available to users via OnSiteSeq Cockpit']
    ]) + '<hr>' +
    '<h2>GitVerse Advantages for the Project</h2>' +
    '<ul><li><strong>Data sovereignty</strong> — source code stored in Russia</li>' +
    '<li><strong>Federal Law-152 compliance</strong> — patient personal data protection</li>' +
    '<li><strong>Integration with Russian infrastructure</strong> — Harbor, Cloud.ru</li>' +
    '<li><strong>CI/CD for multi-platform builds</strong> — arm64 and x86 in one pipeline</li>' +
    '<li><strong>Open repository</strong> — code available to the community at <a href="https://gitverse.ru/onsiteseq">gitverse.ru/onsiteseq</a></li></ul>';

  /* ── BPPB-2026 CONFERENCE ── */
  EN['/conferences/bppb-2026/'] =
    '<div class="product-header" style="text-align: center; margin-bottom: 2rem;">' +
    '<h1>II All-Russian Scientific and Practical Conference "Biotechnologies for the Food Industry of the Future: A Platform for Science and Industry"</h1>' +
    '<p style="font-size: 1.2em; color: #555;">OnSiteSeq poster on rapid field diagnostics of rice blast</p></div><hr>' +
    '<h2>🎤 About the Conference</h2>' +
    '<p>On 18 September 2026, the <strong>Engelhardt Institute of Molecular Biology of the Russian Academy of Sciences</strong> (Moscow), with the participation of MIPT, hosted the II All-Russian Scientific and Practical Conference <strong>"Biotechnologies for the Food Industry of the Future: A Platform for Science and Industry" (BPPB-2026)</strong>. The conference brought together teams from Moscow, Saint Petersburg, Voronezh, Barnaul, Koltsovo and Minsk — from academic institutes to industrial laboratories.</p>' +
    '<p>The <strong>OnSiteSeq</strong> team presented a poster:</p>' +
    '<ul><li><strong>Poster:</strong> "OnSiteSeq hardware-software complex for rapid diagnostics of rice blast and fungicide resistance of <em>Pyricularia oryzae</em> in field conditions"</li>' +
    '<li><strong>Author:</strong> Gorbenko R.A. (MIPT)</li>' +
    '<li><strong>Topic:</strong> moving our nanopore diagnostics platform from the clinic to the field — detection of the rice blast pathogen and fungicide resistance markers directly in the field, without a central laboratory. Details — on the pipeline page: <a href="/magnaporthe/">Rice Blast (Magnaporthe oryzae)</a></li></ul>' +
    '<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">' +
    '<div style="flex: 1; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_main.jpg" alt="Roman Gorbenko at the OnSiteSeq poster at BPPB-2026" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Roman Gorbenko at the poster "OnSiteSeq hardware-software complex for rapid diagnostics of rice blast and fungicide resistance of Pyricularia oryzae in field conditions" (Gorbenko R.A., MIPT)</p></div>' +
    '<div style="flex: 1; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_photo.jpg" alt="OnSiteSeq poster at the BPPB-2026 poster session" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">The same OnSiteSeq poster, second shot: the author presents the work in the poster session foyer</p></div></div><hr>' +
    '<h2>📋 Poster Session</h2>' +
    '<p>The poster session was hosted in the bright marble foyer of the Engelhardt Institute of Molecular Biology RAS: stands on mobile racks lined up in rows beneath the historic chandeliers. The topics of the works ranged from recombinant chymosin and multienzyme preparations to oleaginous yeasts, bacterial nanocellulose and rapid field genomics. Against this background, the OnSiteSeq poster on field diagnostics of rice blast fitted naturally into the "science for industry" agenda: fungicide resistance of phytopathogens follows the same AMR logic as the project\'s clinical pipelines — just on the agronomist\'s side.</p>' +
    '<p>Photos of colleagues\' posters — with captions describing their content:</p>' +
    '<div class="gallery" style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_01.jpg" alt="Engelhardt Institute of Molecular Biology RAS building" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">The building that hosted the conference: the main facade of the Engelhardt Institute of Molecular Biology RAS</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_16.jpg" alt="IMB RAS plaque" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">The plaque on the facade: "Federal State Budgetary Scientific Institution Engelhardt Institute of Molecular Biology of the Russian Academy of Sciences" — the conference venue</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_02.jpg" alt="At the entrance to the IMB RAS" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Roman Gorbenko with the rolled-up OnSiteSeq poster at the entrance to the IMB RAS</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_15.jpg" alt="OnSiteSeq poster on the stand" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">The OnSiteSeq poster (Gorbenko R.A., MIPT) on the poster session stand, wide shot next to the neighbouring works</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_03.jpg" alt="Poster on multienzyme biosensors" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Next-generation multienzyme biosensors based on nature-like carriers: from single-analyte detection to combined diagnostics and biocatalytic detoxification" (Kraevskaya A.G.; Plekhanov Russian University of Economics, Sechenov University)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_04.jpg" alt="Poster on bacteriophage lysin" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Expression and characterisation of the virion-associated lysin gp12 of the Curtobacterium bacteriophage AYKA" (Yakimov A.Yu. et al.; IBCh RAS, MSU, ROSBIOTECH, Pirogov RNRMU)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_05.jpg" alt="Poster on takin prochymosin" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Comparison of AOX1- and GAP-mediated expression of takin prochymosin in the yeast Pichia pastoris" (Saventseva E.A., Shcherbakov D.N.; Altai State University, SRC VB \'Vector\')</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_06.jpg" alt="Poster on buttermilk processing" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Processing of buttermilk as a non-traditional raw material source of bioactive peptides" (Stanislavskaya E.B. et al.; Voronezh State University of Engineering Technologies)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_07.jpg" alt="Poster on Debaryomyces hansenii desaturases" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Functional identification of paralogous desaturases of Debaryomyces hansenii" (Melnikova S.A., Polyakova A.N., Karpov D.S.; IMB RAS, MIPT)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_08.jpg" alt="Poster on oat kvass" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Effect of the Bacillus subtilis Ch-13 multienzyme preparation on the quality and antioxidant potential of oat kvass" (Burnysheva T.O. et al.; SPbGTI (TU))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_09.jpg" alt="Poster on oleaginous yeasts" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Isolation of oleaginous yeasts from the milk of farm animals" (Bogdanova A.S. et al.; IMB RAS, Gamaleya NRCEM, HSE University)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_10.jpg" alt="Poster on collagen peptides" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Bioactive collagen peptides from poultry by-products for functional foods in musculoskeletal disorders" (Kodesnikova T.L., Polishchuk E.K.; ROSBIOTECH, Gorbatov Federal Research Center for Food Systems RAS)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_11.jpg" alt="Poster on nanocellulose" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Isolation and characterisation of acetic acid bacteria cultures — producers of nanocellulose" (Bareyko A.A. et al.; Institute of Microbiology of the National Academy of Sciences of Belarus, Minsk)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_12.jpg" alt="Poster on chymosin production scaling" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Principles of successful scaling of food enzyme production under laboratory conditions on the example of a chymosin-producing strain" (Trofimov A.V. et al.; Federal Research Centre of Biotechnology RAS, Mendeleev University of Chemical Technology, MIPT)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_13.jpg" alt="Poster on chymosin purification" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Pilot technology for the purification of food enzymes to obtain a quality product on the example of chymosin" (Borovikova A.O. et al.; Federal Research Centre of Biotechnology RAS)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_14.jpg" alt="Poster on oleaginous yeast strains" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Poster "Search and identification of oleaginous yeast strains on the surfaces of fruits and vegetables" (Nandysheva A.A. et al.; IMB RAS / \'Cloning Facility\')</p></div></div><hr>' +
    '<h2>💡 Why We Were There</h2>' +
    '<p>BPPB-2026 is a food industry conference, and our rice poster was there for good reason. First, fungicide resistance of <em>Pyricularia oryzae</em> is the same molecular AMR problem that we solve for clinical pathogens: markers, mutations, rapid answers. Second, food safety starts in the field: a fungicide-resistant pathogen means harvest losses and excessive chemical treatment. Third, it is precisely at venues like this that "science → industry" connections are born: for OnSiteSeq this is a path to partnerships in the agricultural sector.</p><hr>' +
    '<blockquote>💡 <strong>Open Source initiative:</strong> the project source code is open on <a href="https://gitverse.ru/onsiteseq/">GitVerse</a>.</blockquote>' +
    '<p><strong>Related pages:</strong> <a href="/magnaporthe/">Rice Blast (Magnaporthe oryzae)</a> · <a href="/#i18n-sec-farmer">Farmer\'s Assistants</a> · <a href="/conferences/msit-2026/">Other conferences: MSIT-2026</a></p>';

  /* ════════════════════════════════════════════════════
     CHINESE CONTENT MAP  (keyed by window.location.pathname)
     Fallback: pages without ZH entry show EN, then RU.
  ════════════════════════════════════════════════════ */
  var ZH = {};

  /* ── ASFV 非洲猪瘟 ── */
  ZH['/asfv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_asfv.svg" alt="非洲猪瘟病毒 (ASFV)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>非洲猪瘟 — ASFV</h1>' +
    '<p style="font-size:1.2em;color:#555">猪场门口即时检测:基因分型、低毒力缺失变异株、与经典猪瘟鉴别</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>非洲猪瘟病毒 (ASFV)</strong> 是非洲猪瘟病毒科 (Asfarviridae) 的大型有囊膜 DNA 病毒(基因组 170–190 kb),引起家猪急性出血热,致死率高达 <strong>100%</strong>。该病毒不感染人,但却是近十年来经济破坏力最强的兽医病原体:2018–2019 年中国的疫情摧毁了全球最大养猪业约 40% 的存栏。由于尚无广泛可用的疫苗,防控完全依赖早期检测与猪场生物安全。</p>' +
    '<p>我们的流程在猪场或兽医实验室现场进行纳米孔测序:确认 ASFV DNA、基于 <em>p72</em> 基因 (<em>B646L</em>) 进行基因分型,并——对当前疫情形势至关重要——<strong>检测低毒力缺失变异株</strong> (Δ<em>CD2v</em>、Δ<em>MGF360/505</em>)。这类变异株 2020–2021 年在中国扩散,表现为慢性感染,令常规监测手段失效。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:EDTA 抗凝血、脾脏、淋巴结、扁桃体;设备拭子、饲料、饮水。</li>' +
    '<li><strong>📤 输出:</strong> 面向兽医的 HTML 报告 — ASFV DNA 检测结果、<em>p72</em> 基因型、<em>CD2v</em>/<em>MGF</em>/<em>I177L</em> 缺失状态、与经典猪瘟 (CSF) 的鉴别。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA</h2>' +
    '<p>I 类为双链DNA基因组病毒:转录沿细胞熟悉的路径 DNA → mRNA 进行。ASFV 是该类中的"巨人"之一:170–190 kb 的基因组编码 150–200 种自身蛋白,包括自身的 DNA 聚合酶、修复酶和 RNA 聚合酶。与大多数 DNA 病毒不同,ASFV 在感染细胞的细胞质中复制 —— 病毒在那里构建几乎不依赖宿主细胞核机器的"病毒工厂"。携带自身复制装置的大型 DNA 基因组可以容忍整个基因块的缺失:<strong>低毒力缺失变异株</strong>(Δ<em>CD2v</em>、Δ<em>MGF360/505</em>)正是这样产生的,而检测它们正是流程的关键任务。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 关键分子标志物</h2>' +
    tbl(['标志物', '意义'], [
      ['<strong>B646L (p72)</strong>', '主要衣壳蛋白 — ASFV 基因分型(已知 24 个基因型;欧亚地区流行 <strong>II 型</strong>)'],
      ['<strong>E402R (CD2v)</strong>', '缺失 → 红细胞吸附丧失;低毒力"类疫苗"变异株标志(中国,2020–2021)'],
      ['<strong>MGF360 / MGF505</strong>', '多基因家族缺失 → 毒力减弱、慢性经过、逃避监测'],
      ['<strong>I177L</strong>', '疫苗株 ASFV-G-ΔI177L 的缺失 — 分离株类疫苗来源的标志'],
      ['<strong>CSFV (E2, 5\'UTR)</strong>', '与经典猪瘟的鉴别诊断 — 早期临床症状无法区分']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>中国,2018–2019</strong> — 疫情摧毁了约 40% 的存栏(超过 1 亿头),而该国产量约占全球猪肉一半,是历史上最大的畜牧业灾难。病毒至今仍在该地区流行。</li>' +
    '<li><strong>低毒力变异株 (2020–2021)</strong> — 携带 <em>CD2v</em>/<em>MGF</em> 缺失的分离株引起慢性、低症状病程;部分与非法"疫苗"株有关。检测它们需要基因组方法,而非单一位点 PCR。</li>' +
    '<li><strong>疫苗</strong> — 越南于 2022–2023 年批准了限制性使用的减毒活疫苗;全球尚无广泛可用的疫苗,因此早期检测与隔离仍是防控基础。</li>' +
    '<li><strong>俄罗斯</strong> — 散养户与工业化猪场均有定期疫情暴发;由俄罗斯联邦动植物卫生监督局 (Rosselkhoznadzor) 和全俄动物健康中心 (ARRIAH) 负责官方监测。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.woah.org/en/disease/african-swine-fever/">WOAH — 非洲猪瘟</a></li>' +
    '<li>📄 <a href="https://www.fao.org/animal-health/situation-updates/ASF/en">FAO — EMPRES:全球非洲猪瘟疫情动态</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/datasets/taxonomy/10497/">NCBI — 非洲猪瘟病毒基因组</a></li></ul>';

  /* ── HBV 乙型肝炎 ── */
  ZH['/hbv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hbv.svg" alt="乙型肝炎病毒 (HBV)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>乙型肝炎病毒基因分型与耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">HBV 基因型、聚合酶耐药突变、HBeAg 状态与肝细胞癌风险标志物 — 一次检测完成</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>乙型肝炎病毒 (HBV)</strong> 是一种嗜肝 DNA 病毒,基因组为部分双链 DNA(约 3.2 kb)。慢性乙型肝炎是全球肝硬化和肝细胞癌 (HCC) 的首要病因:据世界卫生组织估计,全球约有 2.54 亿 HBV 感染者,其中约三分之一在中国。现代核苷(酸)类似物(恩替卡韦、替诺福韦)具有较高的耐药屏障,但亚洲有数百万患者曾长期服用拉米夫定和阿德福韦——体内已积累耐药突变。</p>' +
    '<p>我们的流程基于纳米孔测序数据确定<strong>病毒基因型 (A–J)</strong>、<strong>逆转录酶(聚合酶)耐药谱</strong>、导致 HBeAg 阴性病程的 preC/BCP 突变,以及 HBsAg 逃逸突变——为治疗方案的选择与调整提供完整的病毒基因组档案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血浆/血清。最佳方案:<em>pol</em> 与 preS/S 扩增子测序<strong>或</strong>全基因组覆盖的靶向富集。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — HBV 基因型、核苷(酸)类似物敏感性谱、preC/BCP 与 HBsAg 逃逸状态及治疗解读。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:VII — 双链DNA-逆转录(副逆转录病毒)</h2>' +
    '<p>VII 类为副逆转录病毒:基因组是 DNA,但复制需经逆转录 —— 与 VI 类逆转录病毒恰好"镜像"相反。HBV 病毒颗粒中包装的是部分双链环状 DNA(rcDNA,约 3.2 kb),进入肝细胞核后被修复为共价闭合环状 DNA(<strong>cccDNA</strong>)—— cccDNA 正是慢性化的储库,现有核苷(酸)类似物无法将其清除。以 cccDNA 为模板转录出前基因组 RNA(<strong>pgRNA</strong>),病毒聚合酶(<em>pol</em> 基因)在装配新颗粒时将其逆转录回 DNA。因此 HBV 的耐药突变就是 <em>pol</em> 基因 rt 结构域的突变:经典的 YMDD 替换 <strong>rtM204V</strong> 改变逆转录酶的催化基序,使拉米夫定失效(见下方突变表)。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['I', '双链DNA', 'DNA → mRNA(与宿主细胞相同)', '疱疹病毒、腺病毒、天花、非洲猪瘟'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['<strong>VII</strong>', '<strong>双链DNA-逆转录</strong>', '<strong>经RNA中间体逆转录</strong>', '<strong>乙型肝炎</strong>']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药突变与临床标志物</h2>' +
    '<h3>聚合酶 (rt 结构域) 耐药</h3>' +
    tbl(['突变', '药物', '意义'], [
      ['<strong>rtM204V/I</strong> (YMDD) + rtL180M', '<strong>拉米夫定</strong>、替比夫定', '经典 YMDD 突变;同时降低恩替卡韦敏感性'],
      ['<strong>rtA181T/V</strong>', '拉米夫定、<strong>阿德福韦</strong>', '共同耐药通路;rtA181T 还会削弱 HBsAg 分泌'],
      ['<strong>rtN236T</strong>', '<strong>阿德福韦</strong>', '特异性标志物'],
      ['<strong>rtI169T + rtT184G + rtS202I/G</strong> 或 <strong>rtM250V</strong>(在 rtL180M+rtM204V 背景下)', '<strong>恩替卡韦</strong>', '在既往拉米夫定耐药患者中逐步发展'],
      ['<strong>rtA194T</strong>', '<strong>替诺福韦</strong>', '罕见标志物;意义尚在明确中']
    ]) +
    '<h3>HBeAg 状态与肝癌风险</h3>' +
    tbl(['位点', '突变', '意义'], [
      ['<strong>preC</strong>(前核心)', '<strong>G1896A</strong>(终止密码子)', 'HBeAg 阴性慢性肝炎 — 亚洲常见类型'],
      ['<strong>BCP</strong>(基础核心启动子)', '<strong>A1762T/G1764A</strong>', 'HBeAg 阴性病程;与肝细胞癌风险升高相关'],
      ['<strong>S (HBsAg)</strong>', '<strong>G145R</strong> 及 "a" 决定簇其他突变', '疫苗与诊断逃逸 — HBsAg 检测假阴性'],
      ['<strong>基因型</strong>', 'A–J', '<strong>C 型</strong>(中国优势型)— 较 B 型肝癌风险更高、HBeAg 血清学转换更慢']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq HBV Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>HBV-Genotyper</strong>', '基于全基因组数据的 HBV 基因分型 (A–J)'],
      ['<strong>HBV-Res-Detector</strong>', 'rt 结构域耐药谱解读']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(A–J 基因型参考面板)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 考虑宿主内准种多样性'],
      ['<strong>4. 基因分型</strong>', '参考面板分类 + NCBI HBV 分型工具(验证)'],
      ['<strong>5. 耐药注释</strong>', '自建 rt/preC/BCP/S 突变数据库(基于共识数据与 HBVdb)'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>世界卫生组织《2024 年全球肝炎报告》</strong> — 全球约 2.54 亿人感染 HBV;病毒性肝炎每年夺走约 130 万生命,且死亡率仍在上升。世卫组织提出到 2030 年消除病毒性肝炎这一公共卫生威胁的目标。</li>' +
    '<li><strong>中国</strong> — 承载着全球约三分之一的 HBV 负担(约 7000–9000 万 HBsAg 阳性者);HBV 导致全球约一半的肝癌病例。新生儿大规模疫苗接种已大幅降低儿童携带率,但成人慢性肝炎群体庞大,亟需治疗监测。</li>' +
    '<li><strong>拉米夫定的历史遗留</strong> — 低耐药屏障药物的多年广泛使用,使数百万患者积累了耐药突变;调整方案前的基因分型可避免治疗接连失败。</li>' +
    '<li><strong>HIV/HBV 合并感染</strong> — 替诺福韦是抗逆转录病毒治疗方案的组成部分;请参阅我们的 <a href="/hiv/">OnSiteSeq HIV 流程</a>。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240091672">WHO — 《2024 年全球肝炎报告》</a></li>' +
    '<li>📄 <a href="https://hbvdb.ibcp.fr/">HBVdb — 乙型肝炎病毒数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/projects/genotyping/formpage.cgi">NCBI HBV 基因分型工具</a></li></ul>';

  /* ── 结核病 (tuberculosis) ── */
  ZH['/tuberculosis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/tub.png" alt="结核分枝杆菌 (Mycobacterium tuberculosis)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>结核分枝杆菌耐药性与谱系鉴定</h1>' +
    '<p style="font-size:1.2em;color:#555">面向结核分枝杆菌纳米孔测序分析的综合生物信息学解决方案</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>我们的算法提供完整的纳米孔测序数据处理流程,用于检测耐药突变并准确鉴定结核病原体的遗传谱系。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据。针对纳米孔读长优化(R10.4.1 化学体系,高精度碱基识别)。</li>' +
    '<li><strong>📤 输出:</strong> 详细的临床 HTML 报告,涵盖 13 种关键抗结核药物(利福平、异烟肼、乙胺丁醇、吡嗪酰胺、贝达喹啉、利奈唑胺等)的敏感性谱,以及面向生物信息分析师的质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟢 <strong>可用</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟢 <strong>可用</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    '<p>突变注释遵循 <strong>WHO 突变目录</strong>(结核分枝杆菌复合群,2021 年;2023 年更新)— 结核分枝杆菌基因型耐药解读的国际标准。</p>' +
    tbl(['药物', '基因', '关键突变'], [
      ['<strong>利福平</strong>', '<em>rpoB</em>', 'RRDR 簇,S450L — MDR-TB 标志物'],
      ['<strong>异烟肼</strong>', '<em>katG</em>、<em>inhA</em> 启动子、<em>fabG1</em>', 'S315T (katG)、C-15T (inhA)'],
      ['<strong>乙胺丁醇</strong>', '<em>embB</em>', 'M306V/I、Q497R'],
      ['<strong>吡嗪酰胺</strong>', '<em>pncA</em>(+ 启动子)', '遍布全基因的多种功能缺失变异'],
      ['<strong>氟喹诺酮类</strong>(左氧氟沙星/莫西沙星)', '<em>gyrA</em>、<em>gyrB</em>', 'A90V、D94G/N/Y/A — pre-XDR 标志物'],
      ['<strong>氨基糖苷类 / 卷曲霉素</strong>', '<em>rrs</em>、<em>eis</em> 启动子、<em>tlyA</em>', 'A1401G (rrs)、C-14T (eis)'],
      ['<strong>贝达喹啉 / 氯法齐明</strong>', '<em>Rv0678</em>、<em>atpE</em>、<em>pepQ</em>', 'Rv0678 失活 → BDQ/CFZ 交叉耐药'],
      ['<strong>利奈唑胺</strong>', '<em>rrl</em>、<em>rplC</em>', 'C154R (rplC)'],
      ['<strong>德拉马尼 / 普托马尼</strong>', '<em>ddn</em>、<em>fgd1</em>、<em>fbiA/B/C</em>', '前体药物激活功能丧失']
    ]) +
    '<p>特别关注 <em><strong>Rv0678</strong></em> 突变:新一代药物(贝达喹啉、氯法齐明)是现代 MDR-TB 方案的组成部分,通过 Rv0678 调控因子失活产生的交叉耐药是一个快速增长的问题。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<p>流程集成了先进的 ML 架构,包括图神经网络 (GNN) 和自注意力 (Self-Attention) 机制。</p>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '当前版本'], [['<strong>OnSiteSeq Tuberculosis Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>机器学习模型</h3>' +
    tbl(['模型', '版本', '说明与更新日志'], [
      ['<strong>TB-Lineage-Detector</strong>', '<code>v2</code>', '<a href="/ml/tb-lineage-detector/">基于向量的谱系分类</a>'],
      ['<strong>TB-Res-Detector</strong>', '<code>v2</code>', '<a href="/ml/tb-res-detector/">用于耐药预测的图神经网络</a>']
    ]) + '<hr>' +
    '<h2>📚 论文与会议</h2>' +
    '<ul><li><strong>NGS-2026</strong> — <a href="/conferences/ngs-2026/">会议页面</a></li></ul><hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 比对 (Mapping)</strong>', '<code>minimap2 2.26</code>、<code>samtools ≥1.17</code>(参考序列:H37Rv)'],
      ['<strong>2. 变异检测</strong>', '神经网络 <code>clair3 ≥1.0.4</code>'],
      ['<strong>3. 注释</strong>', '<code>snpEff 5.1</code> + WHO 突变目录 (2023)'],
      ['<strong>4. 机器学习推理(谱系与耐药)</strong>', '<code>PyTorch</code>、<code>torch-geometric</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🖥 OnSiteSeq Cockpit 中的流程卡片示例</h2>' +
    '<p><img src="/assets/images/cockpit/cockpit_tub.JPG" alt="Cockpit 中的 OnSiteSeq TUB 流程卡片"></p><hr>' +
    '<h2>📋 报告示例</h2>' +
    '<ul><li>📄 <strong><a href="/reports/tub">临床医生 HTML 报告示例(结核病)</a></strong></li>' +
    '<li>💻 <strong><a href="/reports/tub/">详细生物信息学报告(结核病)</a></strong></li></ul><hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO《全球结核病报告》</strong> — 每年约有 1060 万新发结核病例;俄罗斯位列 30 个 <strong>MDR/RR-TB</strong> 高负担国家名单。</li>' +
    '<li><strong>北京基因型 (L2)</strong> — 在俄罗斯和欧亚地区占主导地位,与多重耐药和更高的传播力相关。准确的谱系鉴定 (TB-Lineage-Detector) 是具有流行病学意义的结果,而非学术练习。</li>' +
    '<li><strong>新药</strong>(贝达喹啉、普托马尼、利奈唑胺 — BPaL/BPaLM 方案)正迅速改变耐药格局;对 Rv0678/rrl 的基因型监测是未来几年的重点。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240082410">WHO — 结核分枝杆菌复合群突变目录 (2023)</a></li>' +
    '<li>📄 <a href="https://www.who.int/teams/global-tuberculosis-programme/tb-reports">WHO — 全球结核病报告</a></li>' +
    '<li>📄 <a href="https://tbdr.lshtm.ac.uk/">TBProfiler — 结核分枝杆菌耐药标志物数据库</a></li></ul><hr>' +
    '<h2>🔬 OnSiteSeq 相关研究</h2>' +
    '<p><strong>研究:</strong></p>' +
    '<ul><li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_Tub_Demography.pdf">结核病与俄罗斯人口状况:影响分析 (PDF)</a></li>' +
    '<li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_Tub_Multy_Drug_Resistance.pdf">结核分枝杆菌多重耐药分析 (PDF)</a></li></ul>';

  /* ── 幽门螺杆菌 (helicobacter) ── */
  ZH['/helicobacter/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_helicobacter.png" alt="幽门螺杆菌 (Helicobacter pylori)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>幽门螺杆菌耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">基于基因组的耐药与毒力谱分析,用于个体化根除治疗</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>幽门螺杆菌 (Helicobacter pylori)</em> 是一种定植于胃黏膜的革兰阴性细菌 — 慢性胃炎和消化性溃疡的首要病因,也是胃癌的危险因素(IARC 1 类致癌物)。根除成功率直接取决于菌株的敏感性 — 尤其是对克拉霉素和左氧氟沙星的敏感性。</p>' +
    '<p>我们的流程基于纳米孔测序数据,直接从活检样本中确定完整的耐药谱和关键毒力因子(<em>cagA</em>、<em>vacA</em>),无需培养 — 幽门螺杆菌生长缓慢且培养条件苛刻,传统细菌学方法需要 7–14 天。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别(R10.4.1 化学体系,Dorado SUP)后的原始 <code>FASTQ</code> 数据。样本:胃窦或胃体活检组织。最佳方案:<em>23S rRNA</em> 与 <em>gyrA</em> 位点扩增子测序<strong>或</strong>培养物/富集样本的全基因组测序 (WGS)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告,包含根除方案的敏感性谱和毒力因子状态;面向生物信息分析师的质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别'], [
      ['<strong>23S rRNA</strong>', 'A2142G、A2143G、A2142C', '<strong>克拉霉素</strong>(大环内酯类)— 一线关键药物'],
      ['<strong>gyrA</strong>', 'N87K、D91G/N/Y', '<strong>左氧氟沙星</strong>(氟喹诺酮类)— 补救治疗'],
      ['<strong>pbp1A</strong>', '多种氨基酸替换', '<strong>阿莫西林</strong>(耐药罕见但在上升)'],
      ['<strong>rdxA、frxA</strong>', '缺失、无义突变(失活)', '<strong>甲硝唑</strong>'],
      ['<strong>16S rRNA</strong>', 'A926G、A928C', '<strong>四环素</strong>'],
      ['<strong>rpoB</strong>', '点突变(rif 区域簇)', '<strong>利福布汀</strong> — 三线治疗'],
      ['<strong>porD、oorD</strong>', '失活突变', '<strong>呋喃唑酮</strong>']
    ]) +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '方案中的地位(马斯特里赫特 VI)', '临床意义'], [
      ['<strong>克拉霉素</strong>', '一线三联疗法', '区域耐药率 &gt;15% 时不推荐经验性使用 — 需要基因分型'],
      ['<strong>阿莫西林</strong>', '所有方案的组成成分', '耐药罕见;根除治疗的基石'],
      ['<strong>甲硝唑</strong>', '三联/四联疗法组成成分', '背景耐药率高;可通过剂量与疗程部分克服'],
      ['<strong>左氧氟沙星</strong>', '二线(补救)治疗', '不合理使用氟喹诺酮会导致耐药快速上升'],
      ['<strong>四环素</strong>', '铋剂四联疗法', '耐药仍罕见'],
      ['<strong>利福布汀</strong>', '三线治疗', '多次根除失败后的储备用药']
    ]) + '<hr>' +
    '<h2>🧫 毒力因子</h2>' +
    '<p>除耐药性外,报告还包含关键毒力因子状态 — 对医生具有预后价值的信息:</p>' +
    tbl(['因子', '变异型', '临床意义'], [
      ['<strong>cagA</strong>(cagPAI 岛)', '存在 / 缺失', 'cagA+ 菌株 — 消化性溃疡和胃癌风险升高'],
      ['<strong>vacA</strong>', 's1/s2、m1/m2 等位基因', 's1/m1 — 毒性最强的变异型,与重症疾病相关']
    ]) +
    '<p>这正是<strong>位点级图比对 (OnSiteSeq-PanG)</strong> 真正发挥价值之处:cagPAI 和 <em>vacA</em> 是高变区域,频繁发生重组和缺失,单一线性参考序列在此失效。图结构编码了该位点所有已知的等位基因变异,提高了这些区域的读段比对完整性。对于保守的耐药基因(23S rRNA、<em>gyrA</em>)则使用标准比对 — 在这些区域标准比对是可靠的。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq HP Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>HP-Res-Detector</strong>', '基于基因型预测克拉霉素/左氧氟沙星耐药性'],
      ['<strong>HP-Vir-Typer</strong>', 'cagA/vacA 分型(包括 PanG 图比对)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(参考序列:26695 / J99);cagPAI/vacA 位点的 <strong>OnSiteSeq-PanG</strong> 泛基因组图'],
      ['<strong>3. 变异检测</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. AMR 注释</strong>', '自建 23S/gyrA/pbp1A/rdxA/frxA/16S/rpoB 突变数据库 + <code>AMRFinderPlus</code>'],
      ['<strong>5. 毒力分型</strong>', 'cagPAI 检测、<em>vacA</em> 等位基因分型(s/m 区域)'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO,2017</strong> — 克拉霉素耐药幽门螺杆菌被列入 WHO 优先病原体清单(高优先级)。</li>' +
    '<li><strong>俄罗斯</strong> — 克拉霉素耐药率估计为 20–30%,超过马斯特里赫特 VI 阈值 (15%):不做基因分型的经验性三联疗法越来越频繁地失败。</li>' +
    '<li><strong>胃癌</strong> — 幽门螺杆菌是 IARC 1 类致癌物;cagA/vacA 状态可细化个体风险评估。</li>' +
    '<li>当前标准方法 — 培养加药敏试验 — 需要 7–14 天且分离成功率低。我们的流程可<strong>当天出具结果</strong>,直接来自活检样本。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://gut.bmj.com/content/71/9/1724">马斯特里赫特 VI / 佛罗伦萨共识报告 (Gut, 2022)</a></li>' +
    '<li>📄 <a href="https://www.who.int/publications/i/item/WHO-EMP-IAU-2017.12">WHO 优先病原体清单 (2017)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/helicobacter-pylori">PubMLST 幽门螺杆菌数据库</a></li></ul>';

  /* ── 新型冠状病毒 SARS-CoV-2 ── */
  ZH['/sarscov2/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sarscov2.svg" alt="SARS-CoV-2" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>SARS-CoV-2 变异株与抗病毒药物耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">用于冠状病毒基因组监测与个体化治疗选择的纳米孔全基因组测序</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>SARS-CoV-2</em> 是冠状病毒科 (<em>Coronaviridae</em>) 的一种 RNA 病毒,为 COVID-19 的病原体。自 2020 年以来,病毒持续进化:接连出现的变异株(Alpha → Delta → Omicron 及其亚型)表现出不断增强的免疫逃逸能力和不断变化的抗病毒药物敏感性。<strong>已记录到具有临床意义的奈玛特韦 (Paxlovid) 耐药性</strong> — <em>nsp5</em> 基因(3CL 蛋白酶)突变。</p>' +
    '<p>我们的流程采用 <strong>ARTIC</strong> 方案(扩增子法,纳米孔)进行全基因组测序,并自动提供:基因组变异株/谱系、刺突蛋白突变谱,以及四种抗病毒药物的敏感性评估。</p>' +
    '<ul><li><strong>📥 输入:</strong> 碱基识别(Dorado,R10.4.1 化学体系)后的原始 <code>FASTQ</code> 数据。采用 ARTIC V4.1 / V5.3 引物方案的扩增子测序。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告(变异株、S 蛋白突变、耐药谱)和面向生物信息分析师的质控报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:IV — 正链ssRNA</h2>' +
    '<p>IV 类为正链单链RNA病毒:基因组本身即是 mRNA,进入细胞后立刻由核糖体翻译为复制酶多聚蛋白。SARS-CoV-2 拥有已知最大的 RNA 基因组之一(约 30 kb):复制酶复合体组装出 RNA 依赖的 RNA 聚合酶(<strong>RdRp,nsp12</strong>),合成新的基因组 RNA 及一组<strong>亚基因组 RNA</strong> —— 结构蛋白(S、M、N、E)即由后者翻译。冠状病毒独有的特征是校正型 3\'→5\' 外切核酸酶 <strong>nsp14(ExoN)</strong>:它纠正 RdRp 的错误,因此冠状病毒的突变速度慢于其他 RNA 病毒(但快于 DNA 病毒)。COVID-19 的临床基因组学全部围绕这一策略的产物展开:变异株突变积累在亚基因组编码的 S 蛋白中,而耐药靶点 —— <em>nsp5</em>(蛋白酶)和 <em>nsp12</em>(RdRp)—— 正是该复制酶复合体的酶,也是我们的流程所注释的对象。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['I', '双链DNA', 'DNA → mRNA(与宿主细胞相同)', '疱疹病毒、腺病毒、天花、非洲猪瘟'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['<strong>IV</strong>', '<strong>正链ssRNA</strong>', '<strong>基因组即 mRNA,直接翻译</strong>', '<strong>SARS-CoV-2、丙型肝炎</strong>'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 关键突变与基因</h2>' +
    '<h3>变异株鉴定 — S 基因(刺突蛋白)</h3>' +
    tbl(['突变', '意义'], [
      ['<strong>D614G</strong>', '所有现代变异株的基础突变(传播力增强)'],
      ['<strong>N501Y</strong>', 'Alpha、Beta、Gamma、Omicron — ACE2 亲和力增强'],
      ['<strong>E484K/A</strong>', 'Beta、Gamma、部分 Omicron — 逃逸中和抗体'],
      ['<strong>L452R</strong>', 'Delta — 传播力增强并逃逸中和抗体'],
      ['<strong>P681H/R</strong>', 'Alpha/Delta — 高效 furin 切割'],
      ['<strong>K417N/T</strong>', 'Beta、Gamma、Omicron BA.1 — 免疫逃逸'],
      ['<strong>F486P/V/S</strong>', 'Omicron XBB、JN.1 亚型 — 逃逸中和作用']
    ]) +
    '<p>WHO 按风险等级对变异株进行分类:<strong>VOC</strong>(需关注的变异株 — 已证实影响传播力/严重程度/免疫逃逸)、<strong>VOI</strong>(感兴趣的变异株 — 潜在风险)和 <strong>VUM</strong>(监测中的变异株)。流程会给出 Pango 谱系,并自动映射到当前的 WHO 类别。</p>' +
    '<h3>抗病毒药物耐药性</h3>' +
    tbl(['基因', '突变', '药物'], [
      ['<strong>nsp5</strong> (3CLpro)', 'E166V、L50F、A173V(L50F+E166V 组合 — 最强)', '奈玛特韦 (Paxlovid)'],
      ['<strong>nsp12</strong> (RdRp)', 'V792I、S759A、E802D(体外及免疫功能低下患者中)', '瑞德西韦'],
      ['—', '尚未确立具有临床意义的标志物', '莫努匹拉韦 / 法匹拉韦']
    ]) + '<hr>' +
    '<h2>⚠️ 局限与边界</h2>' +
    '<ul><li><strong>低病毒载量</strong> — Ct &gt; 30–33 时扩增子方案只能获得不完整的基因组;Pango 谱系可能无法判定。报告中会注明基因组覆盖度百分比。</li>' +
    '<li><strong>分类阈值</strong> — 可靠的谱系判定需要 ≥80% 的基因组覆盖度(Nextclade 质控标准)。</li>' +
    '<li><strong>耐药 ≠ 临床失败</strong> — 携带耐药标志物的解读需结合患者的免疫状态和既往治疗。</li>' +
    '<li><strong>数据库快速老化</strong> — 变异株分类和耐药突变数据库需要定期更新(Pango 谱系每周修订)。</li></ul><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq SARS-CoV-2 Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CoV2-Variant-Classifier</strong>', '基于全基因组测序的 Pango 变异株/谱系分类(类 Nextclade,离线)'],
      ['<strong>CoV2-Res-Detector</strong>', '抗病毒药物耐药性预测']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 引物修剪 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>(ARTIC 引物 V4.1/V5.3)'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2 2.26</code>、<code>samtools ≥1.17</code>(参考序列:NC_045512.2)'],
      ['<strong>3. 一致序列组装</strong>', '<code>medaka</code>、<code>bcftools</code>、<code>htslib</code>'],
      ['<strong>4. 变异株/谱系判定</strong>', '<code>nextclade</code>、<code>pangolin</code>(本地、定期更新的数据库)'],
      ['<strong>5. 耐药注释</strong>', '自建 nsp5/nsp12/S 突变数据库 + <code>snpEff</code>'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO</strong> — SARS-CoV-2 基因组流行病学监测被公认为大流行防范的必要组成部分。</li>' +
    '<li><strong>中国</strong> — 首个病毒基因组由中国科学家于 2020 年 1 月发表(上海,复旦大学),使首批 PCR 检测和疫苗成为可能。在"动态清零"时期,大规模检测与基因组监测在中国成为国家规模的工具 — 这一经验向世界展示了快速基因组诊断的价值。</li>' +
    '<li><strong>奈玛特韦耐药</strong> — E166V 突变已在临床病例中记录;随着 Paxlovid 的广泛使用,耐药监测变得至关重要。</li>' +
    '<li><strong>纳米孔优势</strong> — 完整的 SARS-CoV-2 基因组(约 30 kb)从样本到结果仅需 <strong>4–6 小时</strong>,可实现当天临床决策。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://artic.network/ncov-2019">ARTIC Network — SARS-CoV-2 纳米孔测序方案</a></li>' +
    '<li>📄 <a href="https://clades.nextstrain.org/">Nextclade — SARS-CoV-2 变异株分类</a></li>' +
    '<li>📄 <a href="https://covdb.stanford.edu/">Stanford CoVDB — 抗病毒耐药突变数据库</a></li></ul>';

  /* ── 高毒力肺炎克雷伯菌 (hvKP) ── */
  ZH['/hvkp/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hvkp.svg" alt="高毒力肺炎克雷伯菌 (hvKP)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>高毒力肺炎克雷伯菌 (hvKP)</h1>' +
    '<p style="font-size:1.2em;color:#555">高毒力标志物、K1/K2 荚膜血清型、MLST 分型与碳青霉烯耐药性汇聚 — 一次检测完成</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>高毒力肺炎克雷伯菌 (hvKP)</strong> 是肺炎克雷伯菌的一种变异型,可在免疫功能正常的患者中引起原发性化脓性肝脓肿并发生转移性播散(眼内炎、脑膜炎、肺及软组织脓肿)。其特征为荚膜血清型 <strong>K1/K2</strong>、优势序列型 <strong>ST23</strong> 以及高黏液表型(拉丝试验阳性)。关键危险因素是糖尿病。</p>' +
    '<p>毒力由大型 <strong>pLVPK 型质粒</strong>(约 200 kb)决定:其标志物包括荚膜调控因子 <strong>rmpA/rmpA2</strong>、气杆菌素位点(<strong>iucA/iutA</strong> — hvKP 最具特异性的标志物)、沙门菌素 <strong>iroB</strong> 和代谢标志物 <strong>peg-344</strong>。该质粒富含重复序列与插入序列元件,短读长无法完整组装 — 这正是纳米孔测序的核心优势:长读长可解析毒力与耐药质粒的完整结构,实现混合/T2T 组装,并同时获得 MLST、荚膜分型 (wzi、Kaptive) 和耐药组。</p>' +
    '<p>我们的流程回答感染控制的核心问题:<strong>高毒力与碳青霉烯耐药性的汇聚</strong>。中国医院中高致死率的 ST11 CR-hvKP (blaKPC-2) 暴发表明,追踪此类汇聚型菌株是优先任务。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:培养物、腹水/穿刺液、血液。最佳方案:分离株全基因组测序或靶向/宏基因组富集。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生与流行病学专家的 HTML 报告 — hvKP/cKP 判定、荚膜血清型与 wzi 等位基因、ST (MLST)、pLVPK 质粒毒力标志物谱、耐药组及汇聚风险评估。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 毒力标志物与分型</h2>' +
    '<h3>毒力质粒 (pLVPK 型)</h3>' +
    tbl(['标志物', '功能', '意义'], [
      ['<strong>rmpA / rmpA2</strong>', '荚膜合成调控因子', '高黏液表型;移码突变会降低检测灵敏度'],
      ['<strong>iucA (iutA)</strong>', '气杆菌素合成', 'hvKP 判定的"金标准" — 最具特异性的标志物'],
      ['<strong>peg-344</strong>', '代谢标志物', '高毒力的质粒特异性标志物'],
      ['<strong>iroB</strong>', '沙门菌素簇', '质粒毒力标志物']
    ]) +
    '<h3>分型与耐药性汇聚</h3>' +
    tbl(['位点', '标志物', '意义'], [
      ['<strong>wzi / 荚膜位点</strong>', 'K1、K2 (Kaptive)', '荚膜血清型 — K1/K2 与肝脓肿及眼内炎相关'],
      ['<strong>MLST</strong>', '<strong>ST23</strong> — 经典 hvKP;<strong>ST11</strong> — CR-hvKP', 'ST11 CR-hvKP — 中国院内暴发的原因'],
      ['<strong>碳青霉烯酶</strong>', '<strong>blaKPC-2</strong>、<strong>blaNDM</strong>', '高毒力与耐药性汇聚 — 感染控制的重点']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq hvKP Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>hvKP-Classify</strong>', '基于毒力标志物组合区分 hvKP 与经典 cKP'],
      ['<strong>Convergence-Detector</strong>', '汇聚型菌株预测(毒力 + 碳青霉烯耐药)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(参考序列:肺炎克雷伯菌染色体与 pLVPK 质粒)'],
      ['<strong>3. 变异检测</strong>', '<code>medaka</code>、<code>clair3</code>'],
      ['<strong>4. 分型</strong>', '<code>mlst</code>(Pasteur/BIGSdb 方案)、<code>Kaptive</code>(荚膜位点、wzi)'],
      ['<strong>5. 毒力与耐药组注释</strong>', '自建标志物数据库 (rmpA/rmpA2、iucA、iroB、peg-344) + 碳青霉烯酶数据库'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>流行区域</strong> — hvKP 在亚太地区(中国、台湾、韩国)呈地方性流行,当地 hvKP 肝脓肿是化脓性肝病变的首要病因;该菌株正在全球化,在亚洲以外检出的频率越来越高。</li>' +
    '<li><strong>与耐药性的汇聚</strong> — 中国医院中高致死率的 ST11 CR-hvKP (blaKPC-2) 暴发表明,高毒力与碳青霉烯耐药正在合流;追踪此类菌株是感染控制的重点。</li>' +
    '<li><strong>mNGS 趋势</strong> — 宏基因组测序 (mNGS) 在中国临床实践中广泛应用;我们的流程契合这一趋势,将 mNGS 数据提升到菌株水平的结论。</li>' +
    '<li><strong>临床意义</strong> — 区分 hvKP 与经典 cKP 对预后至关重要:转移性眼内炎风险需要紧急眼科处理并积极寻找转移灶。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://pubmlst.org/organisms/klebsiella-spp">PubMLST — 克雷伯菌属</a></li>' +
    '<li>📄 <a href="https://github.com/klebgenomics/Kaptive">Kaptive — 荚膜位点分型</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=573">NCBI Taxonomy — 肺炎克雷伯菌</a></li></ul>';

  /* ── 发热伴血小板减少综合征 (SFTS) ── */
  ZH['/sfts/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sfts.svg" alt="大别班达病毒 (SFTSV) 及其蜱媒" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>发热伴血小板减少综合征 (SFTS) 病毒的诊断与节段分析</h1>' +
    '<p style="font-size:1.2em;color:#555">大别班达病毒鉴定、L/M/S 节段完整分析、系统发育与节段重配追踪 — 一次宏基因组分析完成</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>大别班达病毒 (Dabie bandavirus)</strong>(旧称 SFTS 病毒,SFTSV)是白纤病毒科 (<em>Phenuiviridae</em>,布尼亚病毒目 <em>Bunyavirales</em>) 的一种分节段有囊膜病毒,为发热伴血小板减少综合征的病原体。基因组由三条负链/双义单链 RNA 节段组成:<strong>L</strong>(约 6.3 kb,RNA 依赖的 RNA 聚合酶 RdRp)、<strong>M</strong>(约 3.3 kb,糖蛋白 Gn/Gc — 中和抗体的主要靶标)和 <strong>S</strong>(约 1.7 kb,核蛋白 N 和非结构蛋白 NSs — 干扰素应答拮抗剂,以双义方向编码)。病毒主要由长角血蜱 (<em>Haemaphysalis longicornis</em>) 传播;疫源地位于中国东部和中部(河南、山东、安徽、湖北、江苏等省)以及日本和韩国。</p>' +
    '<p>临床表现为发热、血小板减少、白细胞减少、胃肠道症状、出血和多器官功能障碍;不同观察系列的病死率可达 10–30%。已有通过接触患者血液和分泌物发生人际传播的报道(包括医务人员和家庭成员)。目前无特异性治疗和获批疫苗;利巴韦林无效,法匹拉韦曾在日本进行研究。</p>' +
    '<p>疾病急性期病毒载量高,病毒可通过直接测序可靠检出:在中国广泛应用的临床宏基因组测序 (mNGS) 最常为不明原因发热带来 SFTS 诊断。我们的流程实现了<strong>流行区县级医院的床旁纳米孔 mNGS</strong>:长读长几乎可以完整覆盖整个节段,不仅能鉴定病毒,还能进行 L/M/S 节段分析、系统发育分析及谱系间节段重配追踪,并将 SFTS 与其他出血热和立克次体病相鉴别。配备 Flongle 适配器的 MinION 可快速给出结果,适合在县级医院现场部署。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:急性期血浆/血清或全血。最佳方案:去除核糖体 RNA/宿主背景的宏基因组测序<strong>或</strong>针对 L/M/S 节段的靶向富集。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — 大别班达病毒鉴定、L/M/S 节段覆盖度与一致序列、遗传谱系与重配迹象,以及与其他发热病原体的鉴别。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:V — 负链ssRNA(负义单链RNA)</h2>' +
    '<p>与流感病毒一样,SFTSV 属于 V 类:基因组为负链单链RNA,无法直接翻译,因此病毒自带 RdRp 进入细胞,合成(+)链 mRNA。基因组分为<strong>三个节段</strong>:<strong>L</strong> 编码 RdRp 本身,<strong>M</strong> 编码囊膜糖蛋白 Gn/Gc,<strong>S</strong> 编码核衣壳蛋白 N。一个教科书式的细节:布尼亚病毒的 S 节段采用<strong>双义(ambisense)</strong>策略 —— N 蛋白由病毒(−)链编码,而非结构蛋白 NSs 以相反的(+)方向编码,即翻译两种蛋白需要两种极性的 RNA。与流感一样,分节段特性为重配打开了大门 —— 不同谱系之间交换 L/M/S 节段,流程正是通过节段系统发育的不一致性来追踪这一现象。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['I', '双链DNA', 'DNA → mRNA(与宿主细胞相同)', '疱疹病毒、腺病毒、天花、非洲猪瘟'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['<strong>V</strong>', '<strong>负链ssRNA</strong>', '<strong>先合成(+)链(RdRp)</strong>', '<strong>流感、SFTS、狂犬病</strong>'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 基因组标志物与临床意义</h2>' +
    '<h3>节段分析</h3>' +
    tbl(['节段', '蛋白', '意义'], [
      ['<strong>L</strong>(约 6.3 kb)', 'RdRp', '系统发育与基因分型的基础;病毒复制装置'],
      ['<strong>M</strong>(约 3.3 kb)', 'Gn/Gc', '中和作用与抗原性;疫苗设计与血清学的靶标'],
      ['<strong>S</strong>(约 1.7 kb)', 'N', '分子与血清学诊断的主要靶标'],
      ['<strong>S</strong>(双义)', 'NSs', '毒力因子:干扰素应答拮抗剂;与疾病严重程度相关']
    ]) +
    '<h3>进化与鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>节段重配</strong>', '病毒谱系间 L/M/S 节段交换 — 布尼亚病毒进化的关键机制;节段系统发育不一致 = 重配信号'],
      ['<strong>HFRS(汉坦病毒)</strong>', '肾综合征出血热 — 同一分布区内最重要的鉴别诊断'],
      ['<strong>CCHF</strong>', '克里米亚-刚果出血热 — 蜱传内罗病毒,临床与流行病学特征重叠'],
      ['<strong>立克次体病</strong>', '蜱传立克次体病(包括斑点热)— "蜱叮咬后不明原因发热"的常见原因'],
      ['<strong>钩端螺旋体病</strong>', '发热伴血小板减少和多器官受累 — 纳入宏基因组报告考量'],
      ['<strong>噬血细胞综合征 (HLH)</strong>', 'SFTS 的严重并发症;需区分病毒相关性 HLH 与原发性 HLH']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq SFTS Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>SFTS-Classifier</strong>', '大别班达病毒鉴定及读段向 L/M/S 节段的归属'],
      ['<strong>SFTS-Reassort</strong>', '基于节段系统发育不一致性检测重配'],
      ['<strong>FeverDiff-Panel</strong>', '"不明原因发热"病原鉴别(汉坦病毒、立克次体、钩端螺旋体)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 宿主背景去除</strong>', '<code>minimap2</code> 比对人类基因组 + 过滤'],
      ['<strong>3. 比对 (Mapping)</strong>', '<code>minimap2</code>(L/M/S 节段参考面板 + 鉴别诊断面板)'],
      ['<strong>4. 一致序列生成</strong>', '<code>clair3</code>、<code>medaka</code> — 考虑准种多样性的节段一致序列'],
      ['<strong>5. 系统发育</strong>', '多序列比对(<code>mafft</code>)、系统发育分析(<code>IQ-TREE</code>)、类 Nextclade 谱系分类;比较各节段树以检测重配'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>世卫组织优先事项</strong> — SFTS 已列入世卫组织 R&D Blueprint 优先清单:具有流行潜力且缺乏有效应对措施的疾病(尚无特异性治疗和获批疫苗)。</li>' +
    '<li><strong>流行区</strong> — 中国每年报告数千例 SFTS;疾病在东部和中部省份以及日本、韩国持续流行,当地曾发生致死性暴发。</li>' +
    '<li><strong>媒介分布区扩张</strong> — 长角血蜱除有性生殖外还能孤雌生殖,加速其扩散;该蜱已传入美国和澳大利亚。病毒本身尚未在东亚以外立足,但媒介分布区的扩张要求诊断能力做好准备。</li>' +
    '<li><strong>院内感染风险</strong> — 已有通过接触患者血液和分泌物发生人际传播的报道(医务人员和家庭成员均有病例),因此快速的床旁诊断直接影响防疫措施。</li>' +
    '<li><strong>mNGS 成为标准</strong> — 中国已广泛应用临床宏基因组测序,mNGS 最常为不明原因发热检出 SFTSV;纳米孔平台使这一方法可在流行区县级医院落地。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/teams/blueprint">WHO — 预防流行病 R&D Blueprint</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/datasets/taxonomy/1936904/">NCBI Taxonomy — 大别班达病毒</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/vspb/">CDC — 特殊病毒病原体部门</a></li></ul>';

  /* ── 稻瘟病 (Magnaporthe oryzae) ── */
  ZH['/magnaporthe/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_magnaporthe.svg" alt="稻瘟病菌 (Magnaporthe oryzae)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>稻瘟病 — Magnaporthe oryzae</h1>' +
    '<p style="font-size:1.2em;color:#555">稻瘟病田间诊断,含 Avr 效应蛋白谱与杀菌剂敏感性分析 — 数小时内完成,就在稻田边</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>Magnaporthe oryzae</em>(异名 <em>Pyricularia oryzae</em>)是一种子囊菌,为稻瘟病 — 全球最具破坏性的水稻病害的病原。稻瘟病每年造成的产量损失估计达 10–30%,这些稻谷本可养活数千万人。中国是全球最大的水稻生产国,将稻瘟病视为水稻生产的头号威胁。</p>' +
    '<p>该种包含多个致病型:水稻致病型 (<em>Oryza</em>) 和 <em>Triticum</em> 致病型 — "小麦瘟病" (wheat blast) 的病原,最早出现于南美洲,后传入孟加拉国 (2016) 和非洲。致病型的鉴别对检疫防控至关重要。</p>' +
    '<p>病原群体进化极快:抗病水稻品种(携带 <strong>Pi</strong> 基因)几年内就会被"突破"。因此需要在田间持续监测生理小种和效应蛋白谱。无毒基因(<strong>Avr</strong> 效应蛋白:<em>Avr-Pita</em>、<em>Avr-Pik</em>、<em>Avr-Piz-t</em>、<em>Avr-Pii</em> 等)决定哪些 Pi 基因对当地小种仍然有效。效应蛋白基因常位于亚端粒区,处于重复序列与转座子之中 — 短读长难以解析,而 <strong>ONT 长读长可实现这些位点的完整组装与定相</strong>。</p>' +
    '<p>我们的流程对感病水稻叶片和节部直接在田间(Flongle 芯片)进行<strong>宏基因组与靶向纳米孔测序</strong>。数小时内,农艺师即可获得病原的种与致病型鉴定、<strong>Avr 效应蛋白谱</strong>(抗病品种选择建议)、<strong>杀菌剂敏感性谱</strong>(杀菌剂方案建议)以及病原谱系迁移监测数据。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:感病水稻叶片与节部、组织匀浆。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 病原的种与致病型、Avr 效应蛋白谱、杀菌剂敏感性与田间防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🧩 流程架构</h2>' +
    '<ol><li><strong>种与致病型鉴定</strong> — 读段与参考数据库比对分类;鉴别水稻致病型 (<em>Oryza</em>) 与小麦致病型 (<em>Triticum</em>,wheat blast)。</li>' +
    '<li><strong>长读长从头组装</strong> — 完整重建短读长无法解析的 Avr 效应蛋白亚端粒位点。</li>' +
    '<li><strong>Avr 效应蛋白分析</strong> — <em>Avr-Pita</em>、<em>Avr-Pik</em>、<em>Avr-Piz-t</em>、<em>Avr-Pii</em> 等无毒基因的等位基因组成 → 预测品种 Pi 基因的有效性。</li>' +
    '<li><strong>杀菌剂靶标筛查</strong> — 检测 MBI、DMI 和春雷霉素靶标基因中的多态性。</li>' +
    '<li><strong>系统发育与谱系监测</strong> — 追踪生理小种与克隆谱系的跨区域迁移。</li></ol>' +
    '<p>整个流程基于 <strong>Snakemake</strong> 实现,以 Docker 容器形式通过 <code>harbor.onsiteseq.io</code> 镜像仓库分发。</p><hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['靶标基因', '机制', '杀菌剂(类别)'], [
      ['<strong>scytalone 脱水酶</strong>(黑色素生物合成)', '靶标多态性', '环丙酰菌胺等 (MBI-D)'],
      ['<strong>CYP51</strong>(甾醇 14α-脱甲基化酶)', '靶标多态性', '三唑类 (DMI:戊唑醇、丙环唑)'],
      ['<strong>核糖体靶标</strong>', '靶标多态性', '春雷霉素(抗生素,在亚洲广泛应用)'],
      ['<strong>Cytb</strong>(细胞色素 b)', '敏感性监测', '甲氧基丙烯酸酯类 / QoI(嘧菌酯)']
    ]) +
    '<p>流程基于靶标基因测序数据对 MBI、DMI、春雷霉素和甲氧基丙烯酸酯类进行敏感性监测。请注意:经典的 QoI 突变 <strong>G143A</strong> 在 <em>M. oryzae</em> 中并不典型 — 其细胞色素 b 在 143 密码子附近含有内含子,因此解读基于对靶标的完整分析,而非单个密码子。</p><hr>' +
    '<h2>🌾 生理小种与 Avr 效应蛋白监测</h2>' +
    tbl(['无毒基因', '对应的水稻抗病基因', '实际意义'], [
      ['<strong>Avr-Pita</strong>', 'Pi-ta', 'Avr-Pita 等位基因丢失 → 携带 Pi-ta 的品种丧失抗性'],
      ['<strong>Avr-Pik</strong>', 'Pik', 'Avr-Pik 等位基因系列决定有效的 Pik 等位基因范围'],
      ['<strong>Avr-Piz-t</strong>', 'Piz-t', '监测携带 Piz-t 品种的抗性侵蚀'],
      ['<strong>Avr-Pii</strong>', 'Pii', '评估 Pii 对当地群体的有效性']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>粮食安全</strong> — 稻瘟病每年摧毁全球 10–30% 的水稻产量,而水稻是世界一半人口的主粮。</li>' +
    '<li><strong>中国</strong> — 全球最大的水稻生产国;稻瘟病是当地水稻生产的头号威胁,正在开展病原群体的密集监测。</li>' +
    '<li><strong>Wheat blast</strong> — <em>Triticum</em> 致病型作为检疫性威胁:继南美洲之后传入孟加拉国 (2016) 和非洲;需要在边境快速鉴别致病型。</li>' +
    '<li><strong>气候驱动的分布区扩张</strong> — 气候变暖正将稻瘟病风险区的边界推向新的水稻种植区。</li>' +
    '<li><strong>品种抗性的快速侵蚀</strong> — 抗病品种几年内即被"突破",因此田间小种监测必须常态化。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Magnaporthe oryzae</a></li>' +
    '<li>📄 <a href="https://www.fao.org/">FAO — 联合国粮食及农业组织(水稻)</a></li>' +
    '<li>📄 <a href="https://www.irri.org/">IRRI — 国际水稻研究所</a></li></ul>';

  /* ── 柑橘黄龙病 (hlb) ── */
  ZH['/hlb/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hlb.svg" alt="柑橘黄龙病 (HLB)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>柑橘黄龙病 — 亚洲韧皮部杆菌 <i>Candidatus</i> Liberibacter asiaticus</h1>' +
    '<p style="font-size:1.2em;color:#555">柑橘"青果病"的田间分子诊断,含菌株分型与前噬菌体谱分析 — 数小时内完成,就在区域农业实验室</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>亚洲韧皮部杆菌(<em>Candidatus</em> Liberibacter asiaticus,CLas)是一种革兰氏阴性 α-变形菌,为柑橘韧皮部的专性寄生菌,也是黄龙病(HLB,柑橘"青果病")的病原 — 全球柑橘种植业最具破坏性的病害。CLas 的关键生物学特性:病原<strong>无法在人工培养基上培养</strong>,因此经典微生物学方法和快速显微检测均无效 — 诊断与流行病学监测<strong>只能依靠分子方法</strong>。</p>' +
    '<p>该病由媒介昆虫传播 — 亚洲柑橘木虱 <em>Diaphorina citri</em>(非洲种病原则由非洲木虱 <em>Trioza erytreae</em> 传播)。典型症状:<strong>叶片不对称的斑驳状黄化</strong>(blotchy mottle)、果实不对称发育不良且在果柄处保持绿色(故称"青果病",citrus greening)、果实味苦、提前落果。病树在数年内衰败死亡。<strong>目前无治疗方法</strong> — 唯一有效的策略是:早期检测 → 清除病树 → 防控木虱。因此,诊断的速度与可及性决定一切。</p>' +
    '<p>CLas 基因组较小(~1.2 Mb),GC 含量偏低。其最重要的特征是<strong>前噬菌体</strong>(SC1、SC2,1/2/3 型):其组成可作为追踪菌株的流行病学标志物。菌株分型基于 SNP 簇和 MLVA 位点。前噬菌体区域和富含重复序列的区域难以用短读长组装,而 <strong>ONT 长读长可获得完整的前噬菌体区域和可靠的系统发育分析</strong>。实际难点在于韧皮部中细菌滴度低且分布不均,因此流程依赖靶向富集或宏基因组测序并去除宿主材料。样本:带斑驳叶片的叶柄与主脉,以及木虱。</p>' +
    '<p>我们的流程在区域农业实验室(Flongle 芯片)直接对样本进行<strong>靶向与宏基因组纳米孔测序</strong>。数小时内,农艺师即可获得 CLas 检测结果、CLas / CLaf(非洲种)/ CLam(美洲种)的<strong>种间鉴别</strong> — 具有直接检疫意义、<strong>SNP 簇/谱系鉴定</strong>以及用于流行病学监测的<strong>前噬菌体谱</strong>(SC1/SC2)。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:带斑驳叶片的叶柄与主脉、组织匀浆、木虱。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师与植检部门的 HTML 报告 — CLas 检测、病原种 (CLas/CLaf/CLam)、SNP 谱系、前噬菌体谱及检疫措施建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🧩 流程架构</h2>' +
    '<ol><li><strong>病原鉴定</strong> — 用 minimap2 将读段比对到 CLas / CLaf / CLam 参考面板;种间鉴别,具有检疫意义的鉴定。</li>' +
    '<li><strong>一致性序列与变异检测</strong> — 基于靶标面板 (16S、rplKAJL、rpoB 及前噬菌体靶标) 构建一致性序列 (medaka / clair3)。</li>' +
    '<li><strong>SNP 分型与谱系</strong> — 将样本归入 CLas 的 SNP 簇 / 流行病学谱系。</li>' +
    '<li><strong>前噬菌体谱</strong> — 在长读长上重建完整的前噬菌体区域 (SC1、SC2,1/2/3 型) → 菌株来源的流行病学标志物。</li>' +
    '<li><strong>系统发育与流行病学监测</strong> — 构建系统发育树,追踪菌株在农场与地区间的迁移。</li></ol>' +
    '<p>整个流程基于 <strong>Snakemake</strong> 实现,以 Docker 容器形式通过 <code>harbor.onsiteseq.io</code> 镜像仓库分发。</p><hr>' +
    '<h2>🎯 诊断靶标面板</h2>' +
    tbl(['靶标', '类型', '实际意义'], [
      ['<strong>16S rRNA</strong>', '保守位点', '在属和种水平检测韧皮部杆菌'],
      ['<strong>rplKAJL–rpoB</strong>(核糖体操纵子)', '基因面板', 'CLas / CLaf / CLam 的种间鉴别'],
      ['<strong>前噬菌体靶标 (SC1、SC2)</strong>', '前噬菌体区域', '流行病学标志物,菌株追踪'],
      ['<strong>SNP 面板 / MLVA 位点</strong>', '多态性', '菌株分型、谱系、暴发聚集性分析']
    ]) +
    '<p>流程可鉴别黄龙病的三种病原:亚洲种 (CLas)、非洲种(<em>Candidatus</em> Liberibacter africanus,CLaf)和美洲种(<em>Candidatus</em> Liberibacter americanus,CLam) — 种间鉴别对检疫决策至关重要,因为它们的分布区和媒介各不相同。</p><hr>' +
    '<h2>🦠 媒介与监测对象</h2>' +
    tbl(['对象', '角色', '测序提供的信息'], [
      ['<strong>带斑驳症状的叶片</strong>', '植物诊断样本', '韧皮部中的 CLas 检测、菌株分型'],
      ['<strong>亚洲柑橘木虱 <em>Diaphorina citri</em></strong>', 'CLas 的主要媒介', '在症状出现前对媒介带毒情况进行超前监测'],
      ['<strong>非洲木虱 <em>Trioza erytreae</em></strong>', 'CLaf 的媒介(部分地区也传播 CLas)', '在"媒介–植物"复合体中鉴别病原种']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>中国</strong> — 全球最大的柑橘生产国;黄龙病在中国南方(广西、广东、福建、江西)为地方性流行病,广西是主要的柑橘(宽皮橘)产区。HLB 监测在中国具有全国性意义。</li>' +
    '<li><strong>佛罗里达</strong> — 自 2000 年代中期以来,HLB 摧毁了该州的柑橘产业:橙子产量下降了数十个百分点,行业至今未能恢复。</li>' +
    '<li><strong>巴西</strong> — 该病侵袭圣保罗柑橘带,全球最大的橙汁出口区。</li>' +
    '<li><strong>无治疗方法、无抗病品种</strong> — 目前不存在对 HLB 完全抗病的商业化柑橘品种,因此整个防控策略都建立在早期检测、清除病树和防控木虱之上。</li>' +
    '<li><strong>检疫性有害生物</strong> — 黄龙病病原是包括欧盟在内多个国家的检疫对象;在边境和新发疫点快速进行种间鉴别具有直接的植物检疫意义。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Candidatus Liberibacter asiaticus</a></li>' +
    '<li>📄 <a href="https://www.aphis.usda.gov/">USDA APHIS — Citrus Greening / Huanglongbing</a></li>' +
    '<li>📄 <a href="https://www.cabidigitallibrary.org/">CABI 入侵物种纲要 — 黄龙病资料页</a></li></ul>';

  /* ── 地中海贫血 (thalassemia) ── */
  ZH['/thalassemia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_thalassemia.svg" alt="地中海贫血 — 遗传性血红蛋白病" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>地中海贫血及遗传性血红蛋白病的诊断</h1>' +
    '<p style="font-size:1.2em;color:#555">HBA 簇缺失、HBB 突变及其定相 — 一项长读长检测替代 gap-PCR + MLPA + Sanger 组合</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>地中海贫血</strong>是血红蛋白珠蛋白链合成的遗传性疾病:<strong>α-地中海贫血</strong>(16 号染色体上的 <em>HBA1/HBA2</em> 基因簇)和 <strong>β-地中海贫血</strong>(11 号染色体上的 <em>HBB</em> 基因)。重型 — Hb H 病、Hb Bart\'s 胎儿水肿(α 基因 --/-- 状态)以及需要终身输血并伴铁过载的重型 β-地中海贫血 — 构成全球最重要的遗传病负担之一。</p>' +
    '<p>地中海贫血的诊断历来是割裂的:α-缺失用 gap-PCR 检测,缺失与重复用 MLPA,<em>HBB</em> 点突变用 Sanger 测序。根源在于该位点本身的遗传学特点:<strong>α-地中海贫血</strong>以<strong>大片段缺失</strong>为主(--SEA、-α3.7、-α4.2、--MED、--THAI 等),且 <em>HBA</em> 簇含有高度同源的重复序列和假基因,短读长 NGS 原则上无法解析该区域。<strong>β-地中海贫血</strong>则以 <em>HBB</em> 点突变为主 — 在中国最常见的是 CD41-42 (-TTCT)、IVS-II-654 (C&gt;T)、CD17 (A&gt;T)、-28 (A&gt;G) 和 CD71-72。</p>' +
    '<p><strong>Oxford Nanopore 长读长</strong>用一项检测解决问题 — 针对 <em>HBA/HBB</em> 位点的 LR-PCR 扩增子或靶向富集 / adaptive sampling 可以:(1) 直接检出大片段缺失并确定精确断裂点;(2) 解析 <em>HBA1/HBA2</em> 同源性;(3) 对突变进行定相 (cis/trans);(4) 同时检出 <em>HBB</em> 点变异。已发表研究显示 ONT 方法与 gap-PCR/MLPA/Sanger 组合完全一致 — 用一项检测替代 3–4 项独立检测。</p>' +
    '<p>我们的流程输出统一的基因组档案:α-缺失与非缺失型变异、<em>HBB</em> 突变、单倍型定相以及面向遗传咨询的现成解读。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血液基因组 DNA(包括用于产前诊断的绒毛膜绒毛/羊水)。最佳方案:<em>HBA</em> 与 <em>HBB</em> 位点长读长扩增子 (LR-PCR)<strong>或</strong>靶向富集 / adaptive sampling。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — α 与 β 位点基因型(缺失、点变异、定相)、携带状态与夫妇风险解读、产前/植入前 (PGT-M) 诊断结论。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 可检测变异与临床标志物</h2>' +
    '<h3>α-地中海贫血:HBA 簇缺失与非缺失型变异</h3>' +
    tbl(['变异', '类型', '意义'], [
      ['<strong>--SEA</strong>', 'α⁰ 缺失', '东南亚和中国南方最常见的 α⁰ 缺失;双方携带者 — Hb Bart\'s 胎儿水肿风险'],
      ['<strong>-α3.7</strong>', 'α⁺ 缺失', '全球最常见的 α 缺失;-α3.7/-- 组合 — Hb H 病'],
      ['<strong>-α4.2</strong>', 'α⁺ 缺失', '常见的 α⁺ 缺失;与 α⁰ 缺失组合时有临床意义'],
      ['<strong>--MED、--THAI</strong> 等', 'α⁰ 缺失', '区域性变异;精确断裂点由长读长直接读取确定'],
      ['<strong>Hb Constant Spring</strong> (HBA2:c.427T&gt;C)', '非缺失型', '延长的异常 α-珠蛋白;非缺失型 Hb H 病的常见成分'],
      ['<strong>Hb Quong Sze</strong> 等', '非缺失型', 'gap-PCR 无法检出的罕见非缺失型变异']
    ]) +
    '<h3>β-地中海贫血与血红蛋白病 (HBB 基因)</h3>' +
    tbl(['变异', '类型', '意义'], [
      ['<strong>CD41-42 (-TTCT)</strong>', 'β⁰', '中国最常见的 β-地中海贫血突变'],
      ['<strong>IVS-II-654 (C&gt;T)</strong>', 'β⁺', '中国第二常见;剪接异常'],
      ['<strong>CD17 (A&gt;T)</strong>', 'β⁰', '中国南方常见无义突变'],
      ['<strong>-28 (A&gt;G)</strong>', 'β⁺', '启动子突变,表型较轻'],
      ['<strong>CD71-72 (+A)</strong>', 'β⁰', '东南亚常见变异'],
      ['<strong>Hb E</strong> (HBB:c.79G&gt;A)', '结构变异 + β⁺', '东南亚极常见突变;Hb E/β-地中海贫血组合为重型疾病'],
      ['<strong>HPFH / δβ-地中海贫血缺失</strong>', '大片段缺失', '遗传性胎儿血红蛋白持续存在;可减轻 β-地中海贫血严重程度,对预后重要']
    ]) +
    '<h3>定相 (cis/trans)</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>α/β 位点单倍型定相</strong>', '长读长确定突变位于同一条还是不同染色体上 — 对预后至关重要(例如两个 α⁺ 缺陷的顺式与反式位置)']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Thalassemia Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>THAL-SV-Caller</strong>', '基于覆盖度谱和 split-reads 对 HBA 簇缺失/重复进行分类'],
      ['<strong>THAL-Interpreter</strong>', 'α+β 基因型解读:携带状态、表型严重程度、夫妇风险']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(同源的 HBA/HBB 簇,位点专用参考序列)'],
      ['<strong>3. 变异检测 (SNV/Indel)</strong>', '<code>clair3</code>、<code>medaka</code> — HBB 点变异与小片段插入缺失、非缺失型 α 变异'],
      ['<strong>4. CNV/SV 分析(缺失)</strong>', '专用模块:覆盖度谱 + split-reads;<code>Sniffles2</code>、<code>cuteSV</code> — 缺失的精确断裂点'],
      ['<strong>5. 定相</strong>', '<code>WhatsHap</code> — 基于长读长确定变异的顺/反式构型'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>世卫组织</strong> — 血红蛋白病(地中海贫血和镰状细胞贫血)被列为日益加重的全球遗传病负担:每年有数十万儿童出生时即患重型,携带者迁移使诊断需求扩展到传统地区之外。</li>' +
    '<li><strong>携带者地带</strong> — 地中海地区、中东、南亚和东南亚。在中国南方(广西、广东、云南、海南),部分地区携带率高达约 10–20% — 地中海贫血是该地区最主要的遗传病之一。</li>' +
    '<li><strong>预防项目</strong> — 塞浦路斯和撒丁岛通过大规模夫妇筛查和产前诊断几乎消除了重型患儿的出生;中国实施孕前夫妇筛查的国家项目,广西的经验被视为典范。</li>' +
    '<li><strong>诊断缺口</strong> — 常规诊断需要 gap-PCR + MLPA + Sanger 组合(每位患者需多项不同检测);单一长读长检测降低成本、缩短时间并减少漏检罕见变异的风险,在产前诊断和 PGT-M 中尤为重要。</li>' +
    '<li><strong>鉴别诊断</strong> — 地中海贫血携带者的小细胞性贫血常被误诊为缺铁性贫血;分子确诊可避免错误的补铁治疗。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/">WHO — 血红蛋白病与地中海贫血资料</a></li>' +
    '<li>📄 <a href="http://www.ithanet.eu/db/ithagenes">IthaGenes — 血红蛋白变异数据库 (IthaNet)</a></li>' +
    '<li>📄 <a href="https://globin.bx.psu.edu/hbvar/">HbVar — 血红蛋白变异与地中海贫血数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/gene/3043">NCBI Gene — HBB</a></li></ul>';

  /* ── 产气荚膜梭菌 (perfringens) ── */
  ZH['/perfringens/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_perfringens.svg" alt="产气荚膜梭菌 — 产孢杆菌" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>产气荚膜梭菌毒素分型与耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">毒素分型 (A–G)、耐药谱与梭菌鉴别 — 分秒必争时数小时出结果</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>产气荚膜梭菌</strong>是一种革兰氏阳性厌氧产孢杆菌(<em>perfringens</em> 意为"穿透"组织),是<strong>约 95% 气性坏疽病例</strong>(梭菌性肌坏死)的病原体。这是一种暴发性感染:创伤后 <strong>1–6 小时</strong>内出现症状,坏死沿肌肉以每小时<strong>约 15 厘米</strong>的速度蔓延,未经治疗的致死率达 <strong>67–100%</strong>,多数死亡发生在<strong>最初 24 小时</strong>内。如此病程下,既没有时间做培养诊断(需数天),也无法"试药"使用抗生素——当天就需要结果,就在创伤中心的急诊室。</p>' +
    '<p>我们的流程基于纳米孔测序数据,根据毒素基因谱确定<strong>毒素分型 (A–G)</strong>,进行<strong>菌种鉴定</strong>并与 <em>C. septicum</em>(致死率更高的自发性坏疽病原体)及其他梭菌鉴别,同时给出 <strong>AMR 耐药谱</strong>——为外科医生和重症医生提供以小时而非天计的基因组学答案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:伤口分泌物、病灶穿刺液、粪便。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于床旁 (point-of-care) 场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向外科/重症医生的 HTML 报告 — 菌种鉴定、毒素分型、含经验性用药建议的药敏谱;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:毒素、鉴定、耐药</h2>' +
    '<h3>毒素基因与毒素分型</h3>' +
    '<p>毒素分型由毒素基因谱决定——疑似梭菌感染时的首要临床问题:</p>' +
    tbl(['基因', '毒素', '意义'], [
      ['<strong>cpa</strong>', 'α-毒素(磷脂酶 C)', '气性坏疽肌坏死的主要因子;各型均有'],
      ['<strong>cpb</strong>', 'β-毒素', '坏死性肠炎(B、C 型)'],
      ['<strong>etx</strong>', 'ε-毒素', '毒性最强的细菌蛋白之一(B、D 型)'],
      ['<strong>iap / ibp</strong>', 'ι-毒素(二元毒素)', 'ι-毒素组分(E 型)'],
      ['<strong>cpe</strong>', 'CPE 肠毒素', '食物中毒与抗生素相关性腹泻(A、F 型)'],
      ['<strong>netB</strong>', 'NetB 毒素', '禽坏死性肠炎(G 型)']
    ]) +
    '<h3>毒素分型与临床类型</h3>' +
    tbl(['型别', '毒素', '临床意义'], [
      ['<strong>A</strong>', 'cpa', '<strong>气性坏疽</strong>与食物中毒 — 人类最常见型别'],
      ['<strong>C</strong>', 'cpa, cpb', '坏死性肠炎("pigbel")'],
      ['<strong>F</strong>', 'cpa, cpe', 'CPE 相关食物中毒与抗生素相关性腹泻'],
      ['<strong>G</strong>', 'cpa, netB', '禽坏死性肠炎 — 兽医意义']
    ]) +
    '<h3>菌种鉴定与鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>tpi</strong>(磷酸丙糖异构酶)', '<em>C. perfringens</em> 种特异性鉴定'],
      ['<strong>16S rRNA</strong>', '与 <em>C. septicum</em>(自发性坏疽,常见于中性粒细胞减少和消化道肿瘤背景)、<em>C. novyi</em>、<em>C. sordellii</em> 及其他梭菌鉴别']
    ]) +
    '<h3>耐药基因</h3>' +
    '<p>传统上 <em>C. perfringens</em> 对青霉素和克林霉素敏感,但已有<strong>多重耐药 (MDR) 菌株</strong>的报道;暴发性病程下,紧急药敏测定直接影响预后,MDR 谱则需改用碳青霉烯类。</p>' +
    tbl(['基因', '抗生素类别', '临床意义'], [
      ['<strong>tet(A) / tet(W) / tet(M)</strong>', '四环素类', '常见耐药,动物源分离株尤甚'],
      ['<strong>ermB</strong>', '大环内酯类、<strong>克林霉素</strong> (MLSB)', '关键:克林霉素是一线用药组分(抑制毒素合成)'],
      ['<strong>bla</strong>', 'β-内酰胺类', '青霉素 G 失效风险'],
      ['<strong>cat</strong>', '氯霉素', '流行病学标志物'],
      ['<strong>floR</strong>', '氟苯尼考类', '兽医源分离株标志物']
    ]) +
    '<h3>报告中的经验性治疗</h3>' +
    tbl(['临床类型', '方案', '基因组学的作用'], [
      ['<strong>气性坏疽</strong>', '外科清创 + 青霉素 G + <strong>克林霉素</strong>(抑制毒素合成)', 'ermB/bla 谱 → 不耽误时间地调整方案'],
      ['<strong>食物中毒</strong>', '自限性(CPE;肉类及肉制品,"危险温度区" 5–60 °C)', 'cpe 确认,暴发流行病学分型'],
      ['<strong>坏死性肠炎</strong>', '抗生素 ± 手术', '确认 cpb 阳性 C 型']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Perfringens Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CPF-Tox-Typer</strong>', '基于 cpa/cpb/etx/iap/cpe/netB 基因谱的毒素分型 (A–G)'],
      ['<strong>CPF-Res-Detector</strong>', '基于基因组数据的耐药谱预测'],
      ['<strong>CPF-Species-ID</strong>', '<em>C. perfringens</em> 与 <em>C. septicum</em> 及其他梭菌的鉴别']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 梭菌参考序列面板(<em>C. perfringens</em>、<em>C. septicum</em>、<em>C. novyi</em> 等)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 毒素与 AMR 基因检出</strong>', '自建毒素与耐药基因数据库,兼容 CARD/ResFinder'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>分秒必争</strong> — 创伤与战伤中的气性坏疽仍是暴发性感染:蔓延速度约 15 厘米/小时,未经治疗致死率 67–100%,多数死亡发生在最初 24 小时内。在创伤中心急诊室用 Edge 设备进行床旁测序,把获得基因组学答案的时间从数天缩短到数小时。</li>' +
    '<li><strong>食物中毒</strong> — <em>C. perfringens</em> 是最常见的细菌性食物中毒病原之一:据美国 CDC 估计,仅美国每年约有一百万病例。对 cpe 阳性菌株的快速分型对餐饮业暴发调查至关重要。</li>' +
    '<li><strong>MDR 趋势</strong> — 动物源分离株(tet、ermB、floR)中多重耐药的报道越来越多,并正向临床传播;"青霉素 + 克林霉素"的经验性方案不再有保障。</li>' +
    '<li><strong>兽医背景</strong> — NetB 相关禽坏死性肠炎(G 型)和反刍动物肠毒血症(B、D 型)给家禽与畜牧业造成重大经济损失;同一套毒素分型流程同样适用于兽医诊断。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 产气荚膜梭菌 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 气性坏疽 / 梭菌性肌坏死</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 产气荚膜梭菌(食品安全)</a></li></ul>';

  /* ── BOTULINUM (肉毒梭菌) ── */
  ZH['/botulinum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_botulinum.svg" alt="肉毒梭菌 — 带孢子的杆菌与被阻断的突触" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>肉毒神经毒素检测与肉毒梭菌血清分型</h1>' +
    '<p style="font-size:1.2em;color:#555">bont 基因、血清型 (A–G)、毒素基因簇及其定位 — 数小时出结果,而抗毒素仅在最初几小时有效</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>肉毒梭菌</em>(Clostridium botulinum)是一种厌氧产孢杆菌,产生<strong>肉毒神经毒素 (BoNT) — 已知毒性最强的物质</strong>:对人的致死剂量估计约为 1–2 纳克/公斤。BoNT 是一种蛋白酶,可切割神经末梢 <strong>SNARE 复合体</strong>的蛋白,阻断神经肌肉接头处乙酰胆碱的释放。临床上表现为<strong>下行性对称性弛缓性麻痹</strong>:复视与上睑下垂 → 吞咽困难与构音障碍 → 呼吸肌麻痹与呼吸衰竭。解毒剂——七价肉毒抗毒素 (BAT)——只能中和循环中的毒素,<strong>仅在早期给药时有效</strong>:已内化毒素的神经元需数周才能恢复。因此,实验室确诊的速度直接决定预后。</p>' +
    '<p>我们的流程基于纳米孔测序数据,执行 <strong>bont 基因直接检测</strong>、根据毒素作用靶点进行<strong>血清分型 (A–G)</strong>、<strong>毒素基因簇分析</strong>(<em>ntnh</em> 与 <em>ha</em> 基因——“前体毒素复合体”)以及<strong>基因簇定位</strong>——染色体、质粒或前噬菌体。ONT 长读长在此具有根本优势:可解析基因簇结构及其水平转移的流行病学。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:可疑食品残留、呕吐物、粪便、血清、伤口材料。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于现场/实验室快速诊断场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向主治医生、流行病学家和食品监管机构的 HTML 报告 — bont 检测、血清型、基因簇结构 (ha/ntnh)、定位(染色体/质粒/噬菌体)、携带者鉴定;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:毒素、血清型、基因簇、定位</h2>' +
    '<h3>bont 基因与血清型</h3>' +
    '<p>血清型由 BoNT 的抗原特异性决定,并与毒素在 SNARE 复合体中的分子靶点相关:</p>' +
    tbl(['血清型', 'BoNT 靶点', '意义'], [
      ['<strong>A</strong>', 'SNAP-25', '主要“人类”型别;病程最重、最迁延;也是治疗用 BoNT'],
      ['<strong>B</strong>', '突触小泡蛋白/VAMP', '主要“人类”型别;食源性肉毒中毒'],
      ['<strong>C</strong>', '突触融合蛋白和 SNAP-25', '主要见于鸟类和动物'],
      ['<strong>D</strong>', '突触小泡蛋白/VAMP', '动物'],
      ['<strong>E</strong>', 'SNAP-25', '“鱼类”型别;鱼制品和海产品引起的食源性肉毒中毒'],
      ['<strong>F</strong>', '突触小泡蛋白/VAMP', '人类罕见病例;也见于 <em>C. baratii</em>'],
      ['<strong>G</strong>', '突触小泡蛋白/VAMP', '罕见;分离自土壤']
    ]) +
    '<h3>毒素基因簇(前体复合体)</h3>' +
    '<p>bont 基因在基因组中并非孤立存在——它们与调控和保护基因组成基因簇:</p>' +
    tbl(['基因', '功能', '分析意义'], [
      ['<strong>bont (A–G)</strong>', '肉毒神经毒素', '检测与血清分型的首要靶标'],
      ['<strong>ntnh</strong>', '无毒非血凝蛋白 NTNH', '基因簇保守标志物,在胃肠道中保护毒素'],
      ['<strong>ha (ha17/33/70)</strong>', '血凝素', '前体毒素复合体组分;ha 变异是基因簇类型标志物']
    ]) +
    '<h3>基因簇定位与水平转移</h3>' +
    '<p>ONT 长读长可解析基因簇的基因组背景——理解其流行病学的关键:</p>' +
    tbl(['定位', '示例', '流行病学意义'], [
      ['<strong>染色体</strong>', 'A 型(I 群)、E 型', '相对稳定的遗传'],
      ['<strong>质粒</strong>', 'B 型(II 群)、部分 A 型', '菌株间传播的潜力'],
      ['<strong>前噬菌体</strong>', 'C、D 型(III 群)', '噬菌体介导的产毒能力转移']
    ]) +
    '<p><em>肉毒梭菌</em>并非单一物种,而是<strong>四个生理群 (I–IV)</strong>,仅因能产生 BoNT 而归为一类。此外,在其他梭菌——<em>C. baratii</em>(F 型)和 <em>C. butyricum</em>(E 型)——中也发现了 bont 基因:这正是我们流程所追踪的水平转移的直接证据。</p>' +
    '<h3>肉毒中毒的临床类型</h3>' +
    tbl(['类型', '来源/机制', '基因组学的作用'], [
      ['<strong>食源性</strong>', '家庭罐头、风干/熏制鱼、蘑菇——无氧密封食品', '在食品样本和患者样本中检测 bont;血清分型用于溯源'],
      ['<strong>婴儿型</strong>', '孢子在肠道定植(经典因素——1 岁前食用蜂蜜);毒素原位合成', '确认婴儿粪便中的产毒菌株'],
      ['<strong>创伤型</strong>', '伤口被孢子污染,包括注射吸毒者', '从伤口材料中检测 bont'],
      ['<strong>医源性</strong>', '治疗/美容用 BoNT 过量', '与感染性肉毒中毒鉴别'],
      ['<strong>吸入性</strong>', '潜在生物威胁——CDC A 类', '生物安全与卫生监督框架内的检测']
    ]) +
    '<h3>经典与现代诊断方法</h3>' +
    tbl(['方法', '局限性', 'ONT 流程的定位'], [
      ['<strong>小鼠生物试验</strong>(历史金标准)', '缓慢(长达一天)、伦理争议、需要特殊条件', '数小时的基因组学替代方案'],
      ['<strong>Endopep-MS</strong>(毒素活性质谱)', '需要专业实验室', '互为补充的方法'],
      ['<strong>bont PCR</strong>', '点状检测:无法给出基因簇结构和定位', '长读长可完整解析基因簇'],
      ['<strong>培养</strong>', '缓慢,需要厌氧和 BSL 条件', '无需培养直接从样本检测']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Botulinum Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CBT-Tox-Serotyper</strong>', '基于 bont 基因的血清分型 (A–G) 并确定作用靶点 (SNAP-25 / VAMP / 突触融合蛋白)'],
      ['<strong>CBT-Cluster-Resolver</strong>', '毒素基因簇 (ha/ntnh) 及其定位(染色体/质粒/噬菌体)的重建'],
      ['<strong>CBT-Host-ID</strong>', '携带者鉴定:<em>C. botulinum</em>(I–IV 群)、<em>C. baratii</em>、<em>C. butyricum</em>']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — bont A–G 参考面板 + 基因簇基因 (ntnh、ha) + 携带者基因组'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. bont 检测与基因簇分析</strong>', '自建 bont 血清型与基因簇基因数据库;基于长读长解析定位'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>抗毒素仅在最初几小时有效</strong> — BAT 只能中和循环中的毒素,实验室确诊每延迟一小时,预后就更差。床旁 ONT 测序把从样本到基因组学答案的时间从数天缩短到数小时。</li>' +
    '<li><strong>家庭罐头——俄罗斯和东欧的持续风险</strong> — 风干与熏制鱼(E 型)、蘑菇和蔬菜罐头仍是食源性肉毒中毒的经典来源;无氧密封包装为孢子创造了理想条件。快速分型对食品监管机构的暴发溯源同样重要。</li>' +
    '<li><strong>婴儿肉毒中毒与蜂蜜</strong> — 在一些国家是最常见的肉毒中毒类型;不建议一岁内婴儿食用蜂蜜。确认婴儿粪便中的产毒菌株,可在非典型表现(肌张力低下、哭声微弱、便秘)时加速诊断。</li>' +
    '<li><strong>注射吸毒者的创伤型肉毒中毒</strong> — 欧洲和北美暴发的持续来源,需要从伤口材料中快速检测。</li>' +
    '<li><strong>“毒药-良药”</strong> — A 型 BoNT(保妥适及类似物)是全球最畅销的生物制药;毒素的双重属性(毒药、药物、潜在生物武器——CDC A 类)使诊断与产毒能力监控同时成为临床、卫生和国防任务。</li>' +
    '<li><strong>水平转移作为威胁</strong> — 在 <em>C. baratii</em> 和 <em>C. butyricum</em> 中发现 bont 表明产毒能力并不绑定于物种;监测基因簇定位(质粒/噬菌体)即是对威胁演化的预测。</li></ul>' +
    '<blockquote><p>⚠️ <strong>双重用途。</strong>本页面与流程仅用于严格的医学诊断和防御目的(生物安全、食品监管)。流程只解决检测与分型任务,不含任何毒素制备或培养方案。</p></blockquote><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 肉毒中毒</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 肉毒中毒 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — 肉毒中毒(实况报道)</a></li></ul>';

  /* ── SORDELLII / SEPTICUM ── */
  ZH['/sordellii/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_sordellii.svg" alt="索氏帕埃尼梭菌与败血梭菌 — 两根产孢杆菌与一滴液体" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>索氏帕埃尼梭菌与败血梭菌毒素直接检测</h1>' +
    '<p style="font-size:1.2em;color:#555">tcsL/tcsH 与 csa 基因,从血液、组织和子宫抽吸物进行菌种鉴定 — 培养来不及的时候,数小时出结果</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>“双人组”页面:两种罕见但极端凶险的梭菌综合征,共同场景是——<strong>重症监护、分秒必争、培养来不及</strong>。</p>' +
    '<p><em><strong>索氏帕埃尼梭菌</strong></em>(Paeniclostridium sordellii,旧称 <em>Clostridium sordellii</em>)是<strong>分娩及子宫医疗操作(包括药物流产)后中毒性休克</strong>的病原体。其临床特征特异、不同于普通脓毒症:<strong>无发热休克</strong>、难治性低血压、显著<strong>血液浓缩</strong>(血细胞比容升至 60–70%)、<strong>类白血病反应</strong>(白细胞 4–8 万)、浆膜腔积液。死亡发生在 <strong>2–6 天</strong>内,已发表病例系列中 TSS 型病死率达 <strong>70–100%</strong>。病因是致死性毒素 <strong>TcsL</strong>——大梭菌糖基化毒素家族成员(与 <em>C. difficile</em> 的 TcdB 同源):使小 GTP 酶(Rac、Ras 亚家族)糖基化 → 内皮细胞骨架崩塌 → <strong>全面毛细血管渗漏</strong>。其他武器:出血性毒素 <strong>TcsH</strong> 和神经氨酸酶 <strong>NanS</strong>(抑制剂的有前景靶点)。</p>' +
    '<p><em><strong>败血梭菌</strong></em>(Clostridium septicum)是<strong>非创伤性(自发性)气性坏疽</strong>的病原体,也是重要的临床标志物:<em>C. septicum</em> 菌血症常提示<strong>隐匿性结肠癌或中性粒细胞减少</strong>(细菌经肠壁缺损侵入并播种于肌肉)。其 α-毒素(基因 <strong>csa</strong>)为<strong>成孔毒素</strong>,与气溶素同源,而并非 <em>C. perfringens</em> 那样的磷脂酶 C。自发性坏疽的病死率高于创伤性坏疽。</p>' +
    '<p>我们的流程基于纳米孔测序数据,执行<strong>毒素基因 tcsL/tcsH</strong>(<em>P. sordellii</em>)与 <strong>csa</strong>(<em>C. septicum</em>)的<strong>直接检测</strong>,同时进行<strong>菌种鉴定</strong>(16S rRNA 与种特异性标志物)并与 <em>C. perfringens</em> 及其他梭菌鉴别——为重症、产科和外科医生提供以小时而非天计的基因组学答案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血液、病灶组织、子宫抽吸物。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于床旁场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向重症/产科/外科医生的 HTML 报告 — 菌种鉴定、毒素基因谱、梭菌鉴别系列;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:毒素、鉴定、鉴别</h2>' +
    '<h3>毒素基因</h3>' +
    tbl(['基因', '病原体', '毒素与机制'], [
      ['<strong>tcsL</strong>', '<em>P. sordellii</em>', '致死性毒素 TcsL——大梭菌糖基化毒素;使小 GTP 酶 (Rac、Ras) 失活 → 内皮细胞骨架崩塌 → 毛细血管渗漏与 TSS'],
      ['<strong>tcsH</strong>', '<em>P. sordellii</em>', '出血性毒素 TcsH——出血组分'],
      ['<strong>nanS</strong>', '<em>P. sordellii</em>', '神经氨酸酶 NanS——毒力因子及抑制剂靶点'],
      ['<strong>csa</strong>', '<em>C. septicum</em>', 'α-毒素——<strong>成孔毒素</strong>,与气溶素同源(不是磷脂酶!);自发性坏疽肌坏死的关键因子']
    ]) +
    '<h3>菌种鉴定与鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>16S rRNA</strong>', '属/种水平鉴定;与 <em>C. perfringens</em>、<em>C. novyi</em>、<em>C. chauvoei</em> 及其他梭菌鉴别'],
      ['<strong>种特异性标志物</strong>', '16S 过于接近时区分 <em>P. sordellii</em> 与 <em>C. septicum</em>']
    ]) +
    '<h3>对照表:三种梭菌综合征</h3>' +
    tbl(['特征', '<em>C. perfringens</em>', '<em>C. septicum</em>', '<em>P. sordellii</em>'], [
      ['<strong>综合征</strong>', '创伤性气性坏疽(约 95% 病例)', '<strong>自发性</strong>(非创伤性)坏疽', '分娩/子宫操作后中毒性休克'],
      ['<strong>入侵门户</strong>', '伤口、创伤', '肠壁缺损(肿瘤、中性粒细胞减少)', '子宫内膜炎、产后/流产后感染'],
      ['<strong>关键毒素</strong>', 'α-毒素 cpa(磷脂酶 C)', 'α-毒素 csa(<strong>成孔毒素</strong>)', 'TcsL(糖基化)+ TcsH'],
      ['<strong>特点</strong>', '坏死约 15 厘米/小时', '隐匿性结肠癌标志物', '<strong>无发热</strong>休克,血细胞比容 60–70%,白细胞 4–8 万'],
      ['<strong>另见</strong>', '<a href="/perfringens/">页面 /perfringens/</a>', '—', '—']
    ]) +
    '<h3>治疗策略(报告内)</h3>' +
    tbl(['病原体', '策略', '基因组学的作用'], [
      ['<strong>P. sordellii</strong>', '早期感染源控制(常需<strong>子宫切除</strong>)+ 克林霉素/青霉素 + 重症支持;无特异性抗毒素', 'tcsL/tcsH 检测证实毒素介导的休克 → 为激进感染源控制提供依据'],
      ['<strong>C. septicum</strong>', '急诊手术 + 青霉素/克林霉素;存活者<strong>必须排查肠道肿瘤</strong>', 'csa 检测 + 菌种鉴定 → 肿瘤警觉并转诊结肠镜']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Sordellii/Septicum Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CST-Tox-Detector</strong>', '在原始读长中检测毒素基因 tcsL/tcsH/csa/nanS'],
      ['<strong>CST-Species-ID</strong>', '<em>P. sordellii</em>、<em>C. septicum</em>、<em>C. perfringens</em> 及其他梭菌的鉴别'],
      ['<strong>CST-Syndrome-Classifier</strong>', '根据检出谱对综合征(TSS/自发性坏疽)进行优先级排序']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 梭菌参考序列面板(<em>P. sordellii</em>、<em>C. septicum</em>、<em>C. perfringens</em>、<em>C. novyi</em> 等)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 毒素基因检出</strong>', '自建毒素基因(tcsL、tcsH、nanS、csa)与种特异性标志物数据库'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>罕见 → 警觉性低</strong> — 两种综合征均罕见,诊断常在<strong>死后</strong>才做出:培养来不及,而临床表现(<em>P. sordellii</em> 的无发热休克)又不符合人们习惯的脓毒症图像。数小时内从血液/组织直接分子检测改变了这一等式。</li>' +
    '<li><strong>2005 年米非司酮事件</strong> — 美国和加拿大药物流产(米非司酮)后的一系列死亡引发 FDA 警示,并促成 CDC/FDA/NIH 联合研讨会(2006),此后米索前列醇给药方案被修改。该案例表明,一种罕见病原体可以改变整类医疗操作的监管。</li>' +
    '<li><strong>C. septicum 作为旁临床标志物</strong> — <em>C. septicum</em> 菌血症与隐匿性结直肠癌和中性粒细胞减少相关;鉴定病原体不仅是坏疽的诊断,也是肿瘤排查的信号。这是肿瘤警觉与多学科协作 (One Health) 的论据。</li>' +
    '<li><strong>大梭菌毒素家族</strong> — TcsL 与 <em>C. difficile</em> 的 TcdB 同源:统一的糖基化毒素检测流程为整个“梭菌宇宙”奠定基础——从 <em>C. novyi</em> 的炭疽样综合征到艰难梭菌感染。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 败血梭菌/气性坏疽 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 梭菌感染</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 索氏梭菌(药物流产后中毒性休克)</a></li></ul>';

  /* ── NOVYI-NT(溶瘤梭菌) ── */
  ZH['/novyi/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_novyi.svg" alt="溶瘤梭菌 C. novyi-NT — 孢子在肿瘤缺氧核心萌发" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>溶瘤细菌 Clostridium novyi-NT 的基因组质控</h1>' +
    '<p style="font-size:1.2em;color:#555">完整组装的治疗菌株基因组护照与生物分布监测 — 长读长服务实体瘤实验性细菌治疗</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>诺维梭菌</em>(Clostridium novyi)A 型是一种厌氧产孢梭菌,<strong>气性坏疽</strong>病原体之一(因 2000 年代英国注射吸毒者中的暴发而为人所知)。其主要毒力因子是 <strong>α-毒素</strong>——一种磷脂酶,与 <em>C. perfringens</em> 的 α-毒素 (CPA) 同源。<strong>C. novyi-NT</strong> 菌株(NT = non-toxic,无毒)通过<strong>删除 α-毒素基因</strong>获得——正是这一改造把危险病原体变成了溶瘤制剂候选。</p>' +
    '<p>治疗的核心理念:<strong>孢子</strong>经瘤内或全身注射后,<strong>仅在实体瘤缺氧(无氧)核心</strong>萌发——这是化疗和放疗难以企及的区域。营养体细菌从内部摧毁肿瘤:直接溶瘤加上释放肿瘤抗原、继发激活免疫应答。证据尚处早期:犬自发性肿瘤的临床前研究和针对难治性实体瘤患者的首次 I 期临床试验均观察到注射病灶的客观破坏;与免疫检查点抑制剂的联合方案正在研究中。<strong>这是研究性治疗,而非标准治疗。</strong></p>' +
    '<p>我们的角色是基于纳米孔测序的<strong>基因组质控与监测</strong>:</p>' +
    '<ul><li><strong>🧪 治疗菌株基因组 QC</strong> — 确认 α-毒素基因缺失及无不良插入;以完整组装出具菌株护照:长读长可解析对梭菌基因组至关重要的重复序列和质粒。</li>' +
    '<li><strong>📍 生物分布监测</strong> — 在肿瘤活检组织和血液中检测 <em>C. novyi-NT</em> DNA(宏基因组学与靶向 panel):确认萌发确实发生在肿瘤而非正常组织。</li>' +
    '<li><strong>🔗 肿瘤基因组背景</strong> — 展望与我们肿瘤流程的联动:肿瘤突变景观作为解读细菌治疗应答的背景。</li></ul>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:治疗菌株培养物、肿瘤活检组织、血液样本。</li>' +
    '<li><strong>📤 输出:</strong> 菌株基因组护照报告(完整组装、α-毒素位点状态、质粒);生物分布报告(各样本中 <em>C. novyi-NT</em> 读长占比);面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:基因组护照与生物分布</h2>' +
    '<h3>治疗菌株基因组 QC</h3>' +
    tbl(['位点/特征', '质控意义'], [
      ['<strong>α-毒素基因</strong>', '目标缺失——NT 菌株的核心基因组特征;监控无功能性拷贝及回复突变'],
      ['<strong>质粒</strong>', '梭菌毒素常为质粒携带;长读长完整组装固定生产批次的质粒组成'],
      ['<strong>重复序列与可移动元件</strong>', '长读长解析短读长平台无法覆盖的重复——监控不良插入与重排'],
      ['<strong>组装完整性</strong>', '一条闭合染色体 + 质粒——菌株生产批次的基准护照']
    ]) +
    '<h3>鉴别鉴定</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>NT 菌株特异性标志物</strong>', '独特的缺失断点与菌株签名——区分治疗菌株与野生型 <em>C. novyi</em>'],
      ['<strong>16S rRNA + 种特异性标志物</strong>', '在活检宏基因组背景中与 <em>C. perfringens</em>、<em>C. septicum</em> 及其他梭菌鉴别']
    ]) +
    '<h3>生物分布监测</h3>' +
    tbl(['样本', '问题', '方法'], [
      ['<strong>肿瘤活检</strong>', '菌株是否在缺氧核心萌发?', '宏基因组学/靶向检测 <em>C. novyi-NT</em> DNA'],
      ['<strong>血液</strong>', '是否存在超出肿瘤的全身播散?', '靶向检测菌株特异性标志物'],
      ['<strong>时间序列</strong>', '注射后细菌载量的动态', '菌株读长占比的定量评估']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Novyi Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CNV-Strain-Passport</strong>', '菌株基因组护照验证:α-毒素位点状态、质粒、重排'],
      ['<strong>CNV-Biodistribution</strong>', '在活检与血液的宏基因组背景中检测并定量 <em>C. novyi-NT</em> DNA'],
      ['<strong>CNV-Contaminant-Guard</strong>', '治疗菌株批次中野生梭菌与杂菌污染的监控']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — <em>C. novyi-NT</em> 参考序列及近缘梭菌面板'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 菌株完整组装</strong>', '<code>flye</code> — 从长读长获得闭合染色体与质粒,用于基因组护照'],
      ['<strong>5. 菌株标志物检出</strong>', '自建菌株特异性标志物与 α-毒素缺失断点数据库'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>肿瘤细菌治疗的悠久历史</strong> — 用细菌对抗肿瘤的设想可追溯到 19 世纪末的“科利毒素”(Coley);如今该方向在新的基因组层面复兴:菌株被定向改造(如 <em>C. novyi-NT</em> 的 α-毒素缺失),而非“拿来即用”。</li>' +
    '<li><strong>缺氧——既是阿喀琉斯之踵,也是靶点</strong> — 实体瘤缺氧核心对化疗和放疗耐受,但对专性厌氧菌而言却是唯一能萌发的场所:肿瘤自己为自身的毁灭创造了生态位。</li>' +
    '<li><strong>与免疫治疗联合——热门方向</strong> — 溶瘤释放肿瘤抗原与炎症信号;细菌治疗与免疫检查点抑制剂的联合正被积极研究,以期把局部效应转化为全身效应。</li>' +
    '<li><strong>基因组质控是必备环节</strong> — 对活体治疗制剂而言,菌株稳定性(毒素位点无回复突变)的确证和生物分布的证明至关重要;长读长在短读长平台无法解析重复与质粒之处补上这两项任务。</li>' +
    '<li><strong>审慎的定位</strong> — <em>C. novyi-NT</em> 细菌治疗仍是证据有限的早期实验策略;我们的流程是研究性质控工具,而非临床标准。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed / NCBI — Clostridium novyi-NT 相关文献</a></li>' +
    '<li>📄 <a href="https://clinicaltrials.gov/">ClinicalTrials.gov — 肿瘤细菌治疗临床试验</a></li>' +
    '<li>📄 <a href="https://www.cancer.gov/">NCI(cancer.gov)— 美国国家癌症研究所</a></li></ul>';

  /* ── CHAUVOEI(气肿疽,兽医) ── */
  ZH['/chauvoei/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_chauvoei.svg" alt="气肿疽梭菌 — 产孢杆菌与牛的剪影" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>牛气肿疽(Emphysematous Carbuncle)鉴别诊断</h1>' +
    '<p style="font-size:1.2em;color:#555">“梭菌宇宙”板块的兽医卡片:牛突然死亡——气肿疽还是炭疽?剖检之前,现场给出分子学答案</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>气肿疽梭菌</em>(Clostridium chauvoei)是一种革兰氏阳性厌氧产孢杆菌,是<strong>气肿疽(blackleg)</strong>——牛急性坏死性感染——的病原体。该病的旧称“类炭疽”<strong>不应引起误解:气肿疽与真正的炭疽(<em>Bacillus anthracis</em>)毫无关系</strong>,但猝死的临床表现要求首先排除炭疽。孢子可在土壤中存活多年;主要感染 <strong>6 月龄至 2 岁的青年牛</strong>——通常是牧场上膘情良好的小公牛。孢子侵入肌肉(包括经微创伤),在厌氧条件下萌发并引起<strong>捻发音性肌炎</strong>:肌肉产气、跛行、高热、患部肿胀与捻发音。病程闪电般迅速——<strong>动物常在无任何前兆时已被发现死亡</strong>。</p>' +
    '<p>我们的流程基于纳米孔测序数据,执行<strong>菌种鉴定</strong>(16S rRNA + 种特异性标志物),并与最近的近缘种 <em>C. septicum</em> 鉴别(两者极易混淆;参见我们的 <a href="/sordellii/">索氏帕埃尼梭菌与败血梭菌</a> 页面),<strong>检测主要毒力因子 cctA</strong>,以及——对兽医部门最关键的任务——<strong>分子学排除炭疽</strong>(<em>B. anthracis</em>:pagA/cap 标志物)。牛猝死时,排除炭疽之前不得剖检尸体:现场快速给出答案,决定是否宣布隔离。此外,流程还构建<strong>暴发的分子流行病学图景</strong>(疫点地图)。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:患部肌肉组织、渗出液、触片。最佳方案:快速建库,在地区兽医实验室用 <strong>Flongle</strong> 运行 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向兽医与兽医监管部门的 HTML 报告 — 菌种鉴定、cctA 检测、<em>B. anthracis</em> 排除结果、疫点流行病学分型;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:毒力、鉴定、排除炭疽</h2>' +
    '<h3>毒力因子</h3>' +
    tbl(['标志物', '产物', '意义'], [
      ['<strong>cctA</strong>', 'CctA(chauvoei toxin A)', '主要毒力因子:β-成孔毒素家族的成孔细胞溶解素,2010 年代被确定为关键因子'],
      ['<strong>透明质酸酶</strong>', '扩散因子', '破坏细胞间基质,沿肌肉扩散'],
      ['<strong>DNA 酶</strong>', '核酸酶', '降解组织 DNA 与中性粒细胞胞外诱捕网'],
      ['<strong>神经氨酸酶</strong>', '唾液酸酶', '损伤细胞膜,附加致病因子'],
      ['<strong>鞭毛(fla 位点)</strong>', '运动蛋白', '组织内运动能力;菌种鉴定标志物']
    ]) +
    '<h3>菌种鉴定与梭菌鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>16S rRNA</strong>', '属/种鉴定;与 <em>C. septicum</em>(恶性水肿——最近近缘种,极易与 <em>C. chauvoei</em> 混淆)、<em>C. perfringens</em>、<em>C. novyi</em> 鉴别'],
      ['<strong><em>C. chauvoei</em> 种特异性标志物</strong>', '与 <em>C. septicum</em> 近缘情况下的一锤定音鉴定'],
      ['<strong>梭菌 panel</strong>', '一次运行区分气肿疽、恶性水肿及其他牛梭菌病']
    ]) +
    '<h3>排除炭疽(兽医部门的核心价值)</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>pagA</strong>(保护性抗原)', '<em>Bacillus anthracis</em> 标志物——检测目的是<strong>排除</strong>炭疽'],
      ['<strong>cap</strong>(荚膜聚谷氨酸)', '<em>B. anthracis</em> 荚膜标志物——第二个独立排除靶点'],
      ['<strong>报告结论</strong>', '“已排除/未排除炭疽” → 剖检、隔离措施或常规无害化处理']
    ]) +
    '<h3>暴发的分子流行病学</h3>' +
    tbl(['任务', '流程的作用'], [
      ['<strong>分离株分型</strong>', '与参考面板比较,评估与既往疫点的亲缘关系'],
      ['<strong>疫点地图</strong>', '将结果关联到养殖场/牧场:洪水和土方工程会把孢子从土壤中带出']
    ]) +
    '<h3>防控要点(报告参考)</h3>' +
    tbl(['措施', '说明'], [
      ['<strong>青年牛疫苗接种</strong>', '类毒素与培养疫苗有效;漏免地区仍不断出现暴发'],
      ['<strong>洪水/干旱之后</strong>', '异常洪水把土壤中的孢子带上新牧场——风险升高'],
      ['<strong>尸体处理</strong>', '焚烧或石灰深埋;排除炭疽后方可剖检'],
      ['<strong>畜群转移</strong>', '撤离受污染牧场,限制疫点内放牧']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Chauvoei Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CCV-Species-ID</strong>', '<em>C. chauvoei</em> 与 <em>C. septicum</em>、<em>C. perfringens</em> 及其他梭菌的鉴别'],
      ['<strong>CCV-Anthrax-RuleOut</strong>', '基于 cctA 与 pagA/cap 标志物的“气肿疽/炭疽/其他”分类器'],
      ['<strong>CCV-Epi-Map</strong>', '分离株分子流行病学聚类与暴发疫点地图']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 梭菌参考序列面板(<em>C. chauvoei</em>、<em>C. septicum</em>、<em>C. perfringens</em> 等)+ <em>Bacillus anthracis</em>'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 标志物检出</strong>', '自建种特异性标志物、cctA 基因与炭疽排除标志物 (pagA/cap) 数据库'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>剖检之前做决定</strong> — 牛猝死时,兽医部门的第一个问题永远是:是不是炭疽。两个方向的错误代价都高:误报意味着隔离与养殖场停摆,漏报意味着特别危险感染的扩散。现场快速分子鉴别(地区兽医实验室的 Flongle)把答案从数天缩短到数小时。</li>' +
    '<li><strong>全球分布与经济损失</strong> — 气肿疽在世界各地均有登记,给养牛业造成明显损失:死亡的往往是最肥壮的青年牛,疫苗接种需要年年坚持。在俄罗斯,疫点由俄联邦动植物卫生监督局持续监测,西伯利亚、阿尔泰和高加索均有报告。</li>' +
    '<li><strong>气候因素</strong> — 暴发与异常洪水和干旱相关:洪水把土壤孢子带上新牧场,干旱则让畜群集中于有限地块。气候变化使流行病学监测愈发重要。</li>' +
    '<li><strong>免疫缺口</strong> — 疫苗有效,但漏免之处仍不断出现暴发;快速的实验室确诊帮助兽医监管部门在扩散前锁定问题。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.woah.org/">WOAH(原 OIE)— 世界动物卫生组织</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — 气肿疽梭菌(分类学、基因组、Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckvetmanual.com/">Merck Veterinary Manual — 气肿疽(Blackleg)</a></li></ul>';

  /* ── GONORRHOEAE (淋病奈瑟菌) ── */
  ZH['/gonorrhoeae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_gonorrhoeae.svg" alt="淋病奈瑟菌 (Neisseria gonorrhoeae)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>淋病奈瑟菌耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">淋球菌基因组监测 — WHO 重点 AMR 病原体</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>淋病奈瑟菌</em>(淋球菌)是淋病的病原体,发病率居细菌性传播感染第二位。WHO 已将其列入<strong>重点 AMR 病原体名单</strong>(高优先级类别):对头孢曲松——最后一种可靠抗生素——耐药的菌株已在世界各地检出,包括俄罗斯。</p>' +
    '<p>我们的流程提供完整的纳米孔数据分析,在床旁或实验室直接检测耐药突变,无需将数据传输至境外服务器。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别(R10.4.1 化学体系,Dorado SUP)后的原始 <code>FASTQ</code> 数据。最佳方案:<em>penA</em>、<em>gyrA</em>、<em>parC</em>、<em>mtrR</em>、<em>23S rRNA</em> 基因扩增子测序<strong>或</strong>全基因组测序 (WGS)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告,涵盖 6 类抗生素的药敏谱,以及面向生物信息分析师的 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    '<p>流程分析淋球菌耐药的九个关键遗传决定因子。头孢曲松耐药是<strong>累积性</strong>的:镶嵌型 <em>penA</em> + <em>mtrR</em> + <em>penB</em> + <em>ponA</em> 各自推高 MIC,因此完整谱比单个基因更重要:</p>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别'], [
      ['<strong>penA</strong>', 'A501V/T/P/G;镶嵌型 penA(含 FC428 克隆株的 penA-60)', '头孢菌素类(头孢曲松、头孢克肟)— <strong>最后手段抗生素</strong>'],
      ['<strong>penB</strong>(孔蛋白 PorB)', 'G101K、A102D/N', '头孢菌素类、青霉素类(通透性降低)'],
      ['<strong>ponA</strong> (PBP1)', 'L421P', '头孢菌素类、青霉素类(影响 MIC)'],
      ['<strong>gyrA</strong>', 'S91F、D95G/A/N', '氟喹诺酮类(环丙沙星)'],
      ['<strong>parC</strong>', 'S87R、D86N、E91K', '氟喹诺酮类(环丙沙星、氨苄西林)'],
      ['<strong>23S rRNA</strong>', 'A2059G、C2611T', '大环内酯类(阿奇霉素)— <strong>常见共同耐药</strong>'],
      ['<strong>mtrR</strong>', 'A39T、G45D(启动子 -35 缺失)', '多类别 — 外排泵过表达'],
      ['<strong>rpsJ</strong>', 'V57M', '四环素类(多西环素)'],
      ['<strong>blaTEM-1</strong>', '存在/缺失 (PPNG)', '青霉素类 — 质粒介导耐药']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq GC Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>GC-Res-Detector</strong>', '基于 WGS 的 AMR 表型预测(全部抗生素类别)'],
      ['<strong>GC-Typer</strong>', '计算机模拟 MLST(PubMLST NG-MAST / MLST 方案)+ GASP 分型'],
      ['<strong>GC-NG-STAR</strong>', 'NG-STAR 分型 — GASP AMR 监测标准(penA/mtrR/porB/ponA/gyrA/parC/23S 谱)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2 2.26</code>、<code>samtools</code>(参考序列:N. gonorrhoeae FA1090)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3 ≥1.0.4</code>、<code>medaka</code>'],
      ['<strong>4. AMR 基因检出</strong>', '<code>AMRFinderPlus</code> (NCBI)、<code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. MLST 分型</strong>', '<code>mlst</code>(PubMLST N. gonorrhoeae 方案)+ <strong>NG-STAR</strong> 分型(GASP 标准)'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO GASP</strong> — 淋病全球抗菌药物监测规划覆盖 70 多个国家的耐药趋势;头孢曲松 MIC 升高是关键信号。</li>' +
    '<li><strong>俄罗斯</strong> — NICD 数据显示许多地区氟喹诺酮耐药率超过 50%;阿奇霉素共同耐药正在上升。</li>' +
    '<li><strong>XDR 淋病</strong> — 广泛耐药菌株(对头孢曲松 + 阿奇霉素耐药)已在日本、英国、澳大利亚检出 — 全球性公共卫生紧急事件。</li>' +
    '<li><strong>FC428 克隆株</strong> — 全球传播的头孢曲松耐药克隆株,携带镶嵌型 <em>penA-60</em>;其检出会在报告中标记为流行病学预警信号。</li>' +
    '<li><strong>治疗方案转变</strong> — 自 2020 年 (CDC) 起,一线治疗为头孢曲松 500 mg 肌注单药;因大环内酯耐药上升,阿奇霉素已退出联合方案。Zoliflodacin——数十年来首个新型抗淋球菌药物类别——已成功完成 III 期临床试验,流程的耐药谱已准备好扩展至该药。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<p>相关性传播感染流程:🧬 <a href="/syphilis/">梅毒 (T. pallidum)</a> · 🧬 <a href="/mycoplasma/">生殖支原体</a></p>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240041530">WHO — 淋病奈瑟菌全球 AMR 监测</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — 综合抗生素耐药数据库</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/neisseria-gonorrhoeae">PubMLST N. gonorrhoeae 数据库</a></li></ul>';

  /* ── HPV (人乳头瘤病毒,肿瘤学) ── */
  ZH['/hpv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hpv.svg" alt="人乳头瘤病毒 (HPV)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>人乳头瘤病毒基因分型与宫颈癌分子分流</h1>' +
    '<p style="font-size:1.2em;color:#555">我们的首个肿瘤学流程 — 从病因 (HPV) 到预防的关键环节:床旁筛查</p></div><hr>' +
    '<h2>🧬 为什么 HPV 是进入肿瘤学的切入点</h2>' +
    '<p>人乳头瘤病毒 (HPV) 是几乎 100% 宫颈癌病例的<strong>必要病因</strong>,也是相当一部分肛门癌、口咽癌、外阴癌、阴道癌和阴茎癌的病因。这是肿瘤学中罕见的情形:一种癌症拥有单一且明确的感染性驱动因素——这意味着可以通过检测病毒并评估风险,在肿瘤出现之前很久就<strong>预防</strong>它。</p>' +
    '<p>WHO 设定了<strong>消除宫颈癌</strong>的目标,采用 <strong>90–70–90</strong> 战略:</p>' +
    '<ul><li><strong>90%</strong> 的女孩在 15 岁前完成 HPV 疫苗全程接种;</li>' +
    '<li><strong>70%</strong> 的女性接受高性能 HPV 检测筛查(35 岁和 45 岁时);</li>' +
    '<li><strong>90%</strong> 确诊疾病的女性获得治疗。</li></ul>' +
    '<p>第二支柱——"高性能 HPV 检测"——正是测序能够提供经典 qPCR 筛查所无法企及之处的领域。OnSiteSeq 由此叩开肿瘤学的大门。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:宫颈拭子或自取阴道样本。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — HPV 基因型、整合状态、甲基化分流及风险类别(CIN2+ 风险:低 / 中 / 高);面向生物信息分析师的 QC 报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA</h2>' +
    '<p>I 类为双链DNA病毒:其基因组由细胞 RNA 聚合酶 II 转录为 mRNA,逻辑与宿主自身基因相同。HPV 携带小型环状双链DNA基因组(约 8 kb),在上皮细胞中通常以<strong>游离体</strong>形式维持 —— 即细胞核内自主的环状分子,不整合入染色体。临床转折点出现在<strong>整合</strong>之时:环状病毒 DNA 断裂(多在 <em>E2</em> 基因附近)并插入宿主基因组 —— 失去 E2 调控会解除对 <em>E6/E7</em> 癌基因的抑制,启动癌变。我们的流程正是通过"病毒–人源"嵌合读长检测这一"游离体 → 整合"转变(见下文"流程检测内容"部分),而基因组的 dsDNA 属性使纳米孔可直接读取天然 DNA —— 包括无需亚硫酸氢盐转化即可直接检测甲基化。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>🎯 流程检测内容:三个分析层级</h2>' +
    '<p>与仅对少数基因型给出"是/否"答案的 qPCR 试剂盒不同,纳米孔测序在一次运行中解决三项临床权重不同的任务。</p>' +
    tbl(['层级', '任务', '临床意义'], [
      ['<strong>1. 基因分型</strong>', '一次检测覆盖全部 14 种高危基因型(16、18、31、33、35、39、45、51、52、56、58、59、66、68)、混合感染与罕见型别', 'HPV-16/18 导致约 70% 的宫颈癌'],
      ['<strong>2. 整合状态</strong>', '通过嵌合"病毒–人源"读长检测 HPV 基因组整合入宿主基因组', '整合破坏 <em>E2</em> → 癌基因 <em>E6/E7</em> 过表达 — 致癌驱动因素'],
      ['<strong>3. 甲基化(分流)</strong>', '天然 DNA 直接甲基化检测:宿主基因 <em>CADM1、MAL、FAM19A4/miR124-2</em> 与病毒 <em>L1/L2</em>', '分子分流:无需阴道镜即可区分一过性感染与癌前病变 (CIN2+)']
    ]) +
    '<p><strong>纳米孔的关键优势:</strong>长读长完整跨越"病毒–宿主"插入接合处,天然 DNA 读取使甲基化检测<strong>无需亚硫酸氢盐转化、无需单独检测</strong>。Illumina 与 qPCR 无法在单次运行中做到这些。</p>' +
    '<blockquote>这不仅是一个"阳性/阴性"检测,而是<strong>风险分层</strong>:正是"从病因到预防关键环节"的跨越。</blockquote><hr>' +
    '<h2>💉 HPV 与疫苗:为何筛查仍然必需</h2>' +
    tbl(['疫苗', '基因型', '覆盖的宫颈癌比例'], [
      ['<strong>二价</strong>(Cervarix)', '16、18', '约 70%'],
      ['<strong>四价</strong>(Gardasil)', '6、11、16、18', '约 70% + 生殖器疣'],
      ['<strong>九价</strong>(Gardasil-9)', '6、11、16、18、31、33、45、52、58', '约 90%']
    ]) +
    '<ul><li><strong>疫苗不能替代筛查</strong> — 非疫苗覆盖的致癌型别(35、39、51、56、59、66、68)仍在流行。</li>' +
    '<li><strong>测序追踪型别替换</strong> — 接种疫苗人群的基因型分布会发生变化,只有全型别检测才能监测这一动态。</li>' +
    '<li><strong>混合感染</strong> — qPCR 试剂盒常漏检多重感染;纳米孔读取一次可见样本中的全部型别谱。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq HPV Pipeline</strong>', '🟡 开发中']]) +
    '<h3>规划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>HPV-Genotyper</strong>', '基于 L1 的 HPV 基因型分类(沿用 HIV-1-M 亚型架构:CNN + Self-Attention)'],
      ['<strong>HPV-Integration-Caller</strong>', '基于嵌合读长的整合位点检测与定位'],
      ['<strong>HPV-Methyl-Triage</strong>', '基于宿主与病毒甲基化模式的 CIN2+ 风险评分']
    ]) +
    '<p>计划在开放的 <strong>PaVE (Papillomavirus Episteme, NCBI)</strong> 与 <strong>TCGA-CESC</strong>(甲基化与整合)数据库上训练,并在俄罗斯临床样本上验证。</p><hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(PaVE 参考序列:HPV16 NC_001526 等 + 用于整合检测的 <code>GRCh38</code>)'],
      ['<strong>3. 基因分型 / 一致性序列</strong>', '<code>medaka</code>、<code>samtools</code>、自建 L1 基因型数据库'],
      ['<strong>4. 整合检测</strong>', '断裂/嵌合"病毒–宿主"读长搜索(<code>pysam</code>,自研 caller)'],
      ['<strong>5. 甲基化</strong>', '<code>Dorado</code>(5mC/5hmC 修饰)、<code>modkit</code>'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>BioPython</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 为何重要:在没有筛查的地方做筛查</h2>' +
    '<ul><li><strong>GLOBOCAN 2020</strong> — 全球每年约 <strong>60.4 万新发</strong>宫颈癌病例和 <strong>34.2 万死亡</strong>;女性第四大常见癌症。然而它是少数可完全预防的癌症之一。</li>' +
    '<li><strong>俄罗斯</strong> — 每年数千新发病例;45 岁以下女性发病率正在上升,而该人群筛查覆盖率最低。</li></ul>' +
    '<p>90–70–90 战略的主要障碍是<strong>覆盖率</strong>("70%" 支柱)。偏远地区没有中心化的 qPCR 实验室,女性也未必能去做阴道镜检查。</p>' +
    '<p>这正是 OnSiteSeq <strong>Edge</strong> 架构发挥作用的地方:</p>' +
    '<ul><li><strong>自取样</strong> + 现场分析 — WHO 推荐自行采样以提高筛查覆盖率;</li>' +
    '<li><strong>极北地区与流动医疗队</strong> — 当天出结果,无需冷链运往中心实验室;</li>' +
    '<li><strong>数据主权</strong> — 患者的基因组数据绝不离开医疗机构边界。</li></ul>' +
    '<ul><li><strong>WHO,2020</strong> — <a href="https://www.who.int/publications/i/item/9789240014107">消除宫颈癌全球战略</a>。</li>' +
    '<li><strong>WHO,2021</strong> — HPV DNA 检测被推荐为<strong>首选</strong>筛查方法(取代细胞学/巴氏涂片)。</li>' +
    '<li><strong>IARC</strong> — HPV 被列为 1 类致癌物。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://pave.niaid.nih.gov/">PaVE — Papillomavirus Episteme (NIAID/NCBI)</a></li>' +
    '<li>📄 <a href="https://www.who.int/initiatives/cervical-cancer-elimination-initiative">WHO:消除宫颈癌倡议</a></li>' +
    '<li>📄 <a href="https://portal.gdc.cancer.gov/projects/TCGA-CESC">TCGA-CESC — 宫颈鳞状细胞癌 (GDC)</a></li></ul>';

  /* ── HIV (艾滋病病毒) ── */
  ZH['/hiv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/hiv.png" alt="HIV-1" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>HIV-1 耐药性与亚型鉴定</h1>' +
    '<p style="font-size:1.2em;color:#555">覆盖全部 ART 药物类别的耐药谱分析与亚型分型 — 基于俄罗斯 A6 亚型分离株训练的模型</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>我们的算法提供完整的测序数据处理流程,用于识别耐药突变并准确鉴定 HIV-1 亚型。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据(Dorado 机器学习碱基识别器将纳米孔电信号转换为核苷酸数据之后;POD5/FAST5 → FASTQ)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的详细 HTML 报告和面向生物信息分析师的扩展报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:VI — 正链ssRNA-逆转录(逆转录病毒)</h2>' +
    '<p>VI 类涵盖逆转录病毒:其基因组为正链单链RNA,但不能直接充当 mRNA —— 首先由病毒<strong>逆转录酶</strong>(RT,<em>pol</em> 基因)将 RNA 逆转录为 DNA,再由<strong>整合酶</strong>将该 DNA 拷贝插入宿主基因组,形成<strong>前病毒</strong>。HIV-1 是该类的典型代表:前病毒成为细胞的永久组成部分和终生产生新病毒颗粒的源头,这正是现代疗法无法根除感染的原因。逆转录酶缺乏校正(3\'→5\' 外切核酸酶)活性,复制错误积累速度比细胞 DNA 聚合酶快几个数量级 —— 因此每位患者体内的 HIV 都呈准种多样性,耐药变异在药物压力下被迅速选择。正因如此,HIV 的耐药性就是 <em>pol</em> 基因(逆转录酶、蛋白酶、整合酶)中的突变,我们的流程依据 Stanford HIVdb 规则对其进行解读。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['I', '双链DNA', 'DNA → mRNA(与宿主细胞相同)', '疱疹病毒、腺病毒、天花、非洲猪瘟'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['<strong>VI</strong>', '<strong>正链ssRNA-逆转录</strong>', '<strong>逆转录酶:RNA → DNA</strong>', '<strong>HIV、逆转录病毒</strong>'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟢 <strong>可用</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟢 <strong>可用</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    '<p>流程分析整个 <em>pol</em> 基因 — 抗逆转录病毒治疗的全部三个酶靶点。突变解读遵循 <strong>Stanford HIVdb</strong> 规则 — HIV 基因型耐药解读的全球标准。</p>' +
    tbl(['药物类别', '基因', '关键突变', '药物'], [
      ['<strong>NRTI</strong>(核苷类逆转录酶抑制剂)', 'RT', 'M184V/I、K65R、胸腺嘧啶类似物突变(M41L、D67N、T215Y/F、K219Q/E)', '替诺福韦、拉米夫定、阿巴卡韦'],
      ['<strong>NNRTI</strong>(非核苷类逆转录酶抑制剂)', 'RT', 'K103N、Y181C、G190A、E138K', '依非韦伦、奈韦拉平、利匹韦林、多拉韦林'],
      ['<strong>PI</strong>(蛋白酶抑制剂)', 'PR', 'D30N、M46I/L、I50V、I54V/M、V82A/F/T、L90M', '阿扎那韦、达芦那韦、洛匹那韦'],
      ['<strong>INSTI</strong>(整合酶抑制剂)', 'IN', 'Q148H/R/K、G118R、R263K、N155H', '多替拉韦、比克替拉韦、拉替拉韦']
    ]) +
    '<p>整合酶抑制剂是现代 ART 的一线用药(多替拉韦已纳入俄罗斯临床指南),因此监测整合酶突变(Q148 + 继发突变)尤为重要。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<p>我们持续改进分析流程与机器学习模型。</p>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '当前版本'], [['<strong>OnSiteSeq HIV Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>机器学习模型</h3>' +
    tbl(['模型', '版本', '说明与更新日志'], [
      ['<strong>HIV-1-M-Env-Rus</strong>', '<code>1.0</code>', '<a href="/ml/hiv/">更新日志</a>'],
      ['<strong>HIV-1-Resist-Rus</strong>', '<code>3</code>', '<a href="/ml/hiv/">更新日志</a>']
    ]) + '<hr>' +
    '<h2>📚 论文与会议</h2>' +
    '<p>我们的工具已在以下学术场所完成验证与展示:</p>' +
    '<ul><li><strong>MNSK-2026</strong> — <a href="/conferences/mnsk-2026/">会议页面</a></li>' +
    '<li><strong>MFTI-2026</strong> — <a href="/conferences/mfti-2026/">会议页面</a></li>' +
    '<li><strong>MSIT-2026</strong> — <a href="/conferences/msit-2026/">会议页面</a></li></ul><hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>由 Snakemake 管理,配合相互隔离的 Conda 环境,确保最大程度可复现。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>Python 3.10</code>、<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对</strong>', '<code>minimap2</code>、<code>samtools</code>'],
      ['<strong>3. 一致性序列组装</strong>', '<code>medaka 1.11.*</code>、<code>bcftools</code>、<code>htslib</code>'],
      ['<strong>4. 机器学习预测</strong>', '<code>PyTorch ≥2.0</code>、<code>BioPython</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🖥 OnSiteSeq Cockpit 中的流程卡片示例</h2>' +
    '<p><img src="/assets/images/cockpit/cockpit_hiv.JPG" alt="Cockpit 中的 OnSiteSeq HIV 流程卡片"></p><hr>' +
    '<h2>📋 报告示例</h2>' +
    '<ul><li>📄 <strong><a href="/reports/hiv/">临床医生 HTML 报告示例</a></strong></li>' +
    '<li>💻 <strong><a href="/reports/hiv/">详细生物信息学报告</a></strong></li></ul><hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>俄罗斯</strong> — 超过 100 万 HIV 感染者;<strong>A6 亚型</strong>(原 A-FSU)在俄罗斯和东欧占主导地位,在西方却很罕见。我们的 <code>HIV-1-M-Env-Rus</code> 与 <code>HIV-1-Resist-Rus</code> 模型专门基于俄罗斯分离株训练 — 这是与针对 B 亚型调优的西方同类产品的关键区别。</li>' +
    '<li><strong>WHO</strong> — 推荐在启动 ART 前进行基因型耐药检测:多个地区的传播性 NNRTI 耐药已超过 10% 阈值。</li>' +
    '<li><strong>INSTI 时代</strong> — 一线治疗转向多替拉韦,使整合酶突变监测成为 HIV 耐药工作的重点。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://hivdb.stanford.edu/">Stanford HIV 耐药数据库 (HIVdb)</a></li>' +
    '<li>📄 <a href="https://www.genomedetective.com/app/typingtool/hiv">REGA HIV-1 亚型分型工具</a></li>' +
    '<li>📄 <a href="https://www.who.int/teams/global-hiv-hepatitis-and-stis-programmes/hiv/treatment/hiv-drug-resistance">WHO — HIV 耐药报告</a></li></ul><hr>' +
    '<h2>🔬 OnSiteSeq 相关研究</h2>' +
    '<p><strong>学术研究:</strong></p>' +
    '<ul><li>📄 <a href="/assets/pdf/research/OnSiteSeq_Research_HIV_Demography.pdf">HIV 与俄罗斯人口状况:影响分析 (PDF)</a></li></ul>' +
    '<p><strong>科普视频 (Dzen):</strong></p>' +
    '<ul><li>🔗 <a href="https://dzen.ru/a/aLys7YzNdXMJdGp8">生物信息学视角:HIV。第 1 部分。俄罗斯及全球 HIV 历史</a></li>' +
    '<li>🔗 <a href="https://dzen.ru/a/aMgkOlvWQkzOyCcz">生物信息学视角:HIV。第 2 部分。病毒的分子生物学</a></li>' +
    '<li>🔗 <a href="https://dzen.ru/a/ah6QlqOOiE17QuWX">生物信息学视角:HIV。第 3 部分。耐药性 (HIV-DR)</a></li></ul>';

  /* ── ML/HIV (HIV 机器学习模型) ── */
  ZH['/ml/hiv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>机器学习模型:OnSiteSeq HIV</h1>' +
    '<p style="font-size:1.2em;color:#555">面向高精度 HIV-1 基因组监测与耐药预测的深度学习</p></div><hr>' +
    '<h2>🧠 HIV-1 基因组的创新方法</h2>' +
    '<p>标准的国外算法(包括美国开发的算法)往往在不反映俄罗斯联邦流行病学特点的数据库上训练。俄罗斯的 HIV-1 流行具有明显的单系起源特征。</p>' +
    '<p>我们自研的神经网络模型针对本国流行病学特点开发,采用先进的 ML 架构,实现前所未有的诊断准确性。</p><hr>' +
    '<h2>🧬 HIV-1-M-Env-Rus(版本 1.0)</h2>' +
    '<p>用于 HIV-1 基因变异分类的专用神经网络模型。解决检测在俄罗斯联邦流行的优势型与重组型病毒这一关键任务。</p>' +
    '<ul><li><strong>目标区域:</strong> <strong>Env</strong> 基因的核苷酸序列分析。</li>' +
    '<li><strong>俄罗斯特异性:</strong> 针对超精准检测 <strong>A6</strong> 亚型(占俄罗斯病例 >80%)及 <strong>CRF63_02A6</strong> 等复杂流行重组型优化。</li>' +
    '<li><strong>架构:</strong> 基于 PyTorch 的深度学习,集成于自动化 Snakemake 数据准备流程。</li>' +
    '<li><strong>输出:</strong> 分离株属于特定亚型的百分比概率。</li></ul><hr>' +
    '<h2>🛡️ HIV-1-Resist-Rus(版本 1.0)</h2>' +
    '<p>预测病毒对主要抗逆转录病毒治疗 (ART) 类别耐药性的旗舰模型。</p>' +
    '<ul><li><strong>目标基因:</strong> 决定病毒存活的关键基因组区域 — <strong>PR</strong>(蛋白酶)、<strong>RT</strong>(逆转录酶)、<strong>IN</strong>(整合酶)。</li>' +
    '<li><strong>ID-CNN + Self-Attention 架构:</strong> 一维卷积网络结合注意力机制,使模型能够检测<strong>上位效应 (epistasis)</strong> — 一个突变可增强或抑制另一个突变效应的复杂相互作用。</li>' +
    '<li><strong>数据库整合:</strong> 模型使用当前全球 (Stanford HIVDB) 与俄罗斯耐药数据库进行校准。</li></ul><hr>' +
    '<h2>🚀 HIV-1-Resist-Rus(版本 3.0)</h2>' +
    '<p><strong>重大更新,使系统从研究原型转变为可临床应用的工具。</strong>仓库:<a href="https://gitverse.ru/onsiteseq/HIV-1-Resist-Rus">gitverse.ru/onsiteseq/HIV-1-Resist-Rus</a></p>' +
    '<h3>v3 的变化</h3>' +
    tbl(['组件', 'v1 / v2', '<strong>v3</strong>'], [
      ['药物', '1 (DTG) / 14', '<strong>14(全部 ART 类别)</strong>'],
      ['训练数据集', 'Stanford 中间 CSV + 合成数据', '<strong>37,641 条 LANL 序列</strong>'],
      ['标注', 'Fold-change ≥3.5', '<strong>Stanford Sierra API(金标准)</strong>'],
      ['类别分布', '60–92% 耐药(合成)', '<strong>0.8–10.8%(真实世界)</strong>'],
      ['验证', '内部(验证集划分)', '<strong>356 名患者 — CRIFEM(Rospotrebnadzor)</strong>'],
      ['平均 AUC(外部)', '约 0.727', '<strong>0.990</strong>']
    ]) +
    '<h3>HybridResistanceCNN 架构</h3>' +
    '<p>三条并行分支:</p>' +
    '<ul><li><strong>Embedding + CNN ×3</strong> — 氨基酸序列局部模式(RT:240 位 / PR:99 / IN:288)</li>' +
    '<li><strong>Self-Attention</strong> — 相距遥远位点间的长程上位效应</li>' +
    '<li><strong>MutationMLP</strong> — 作用于关键位点(K65R、M184V、K103N、G140S 等)的双层感知机</li></ul>' +
    '<p>三条分支经 Fusion 层合并 → Dropout → Linear → P(耐药) ∈ [0, 1]。</p>' +
    '<p><strong>关键工程决策:</strong> 针对类别不平衡(≤1% 耐药)的 Focal Loss(α=0.75,γ=2.0)、WeightedRandomSampler、OneCycleLR(80 个 epoch)、基于约登指数的阈值校准。</p>' +
    '<h3>外部验证结果 — v3</h3>' +
    '<p>在<strong>CRIFEM(Rospotrebnadzor)的 356 名去标识化患者</strong>(EpidRuSeq 队列)上完成验证。金标准:Stanford HivDB 按药物给出的结论。</p>' +
    '<blockquote><strong>平均 AUC = 0.990</strong> — 在完全离线模式、不向境外服务器传输任何数据的情况下,达到 Stanford HIV 耐药数据库的准确度。</blockquote>' +
    tbl(['药物', '类别', 'AUC', 'F1', '灵敏度', '特异度', 'ΔAUC vs v2'], [
      ['<strong>DRV</strong>', 'PI', '<strong>1.000</strong>', '<strong>1.000</strong>', '<strong>1.000</strong>', '<strong>1.000</strong>', '+0.017'],
      ['<strong>DTG</strong>', 'INSTI', '<strong>1.000</strong>', '0.800', '<strong>1.000</strong>', '0.994', '+0.272'],
      ['3TC', 'NRTI', '0.999', '0.964', '0.982', '0.990', '+0.019'],
      ['RAL', 'INSTI', '0.999', '0.898', '0.957', '0.988', '+0.670'],
      ['EVG', 'INSTI', '0.999', '0.898', '0.957', '0.988', '+0.178'],
      ['ABC', 'NRTI', '0.997', '0.957', '0.965', '0.990', '+0.549'],
      ['ATV/r', 'PI', '0.997', '0.811', '0.938', '0.982', '+0.141'],
      ['LPV/r', 'PI', '0.997', '0.762', '0.889', '0.988', '+0.210'],
      ['BIC', 'INSTI', '0.996', '0.500', '0.750', '0.986', '+0.319'],
      ['TDF', 'NRTI', '0.989', '0.809', '0.826', '0.985', '+0.222'],
      ['AZT', 'NRTI', '0.987', '0.933', '0.913', '0.997', '+0.161'],
      ['ETR', 'NNRTI', '0.981', '0.889', '0.941', '0.970', '+0.171'],
      ['EFV', 'NNRTI', '0.972', '0.879', '0.954', '0.952', '+0.070'],
      ['NVP', 'NNRTI', '0.949', '0.857', '0.882', '0.958', '+0.041'],
      ['<strong>平均</strong>', '', '<strong>0.990</strong>', '<strong>0.854</strong>', '<strong>0.925</strong>', '<strong>0.984</strong>', '']
    ]) +
    '<p><em>14 种药物中有 12 种超过临床阈值 AUC ≥ 0.90 且灵敏度 ≥ 0.85。</em></p><hr>' +
    '<h2>⚙️ 技术与 BioMLOps</h2>' +
    '<ul><li><strong>数据管理 (DVC):</strong> 训练数据集、模型权重与特征提取流程的版本管理。保证实验 100% 可追溯。</li>' +
    '<li><strong>持续训练:</strong> 由外部数据库(Stanford HIVDB)更新触发的自动化再训练流程,并在留出集上早期发现模型退化。</li>' +
    '<li><strong>技术栈:</strong> <code>PyTorch (≥2.0)</code>、<code>Snakemake</code>、<code>DVC</code>、<code>BioPython</code>。</li></ul><hr>' +
    '<blockquote>💡 <strong>科学验证</strong> — 我们模型与 BioMLOps 方法学的有效性已获得学术界认可。成果已在主要会议上展示:<br>' +
    '• 亚型分类 (HIV-1-M-Env-Rus) — <strong><a href="/conferences/mnsk-2026/">MNSK-2026</a></strong><br>' +
    '• 耐药预测与 BioMLOps (HIV-1-Resist-Rus) — <strong><a href="/conferences/msit-2026/">MSIT-2026</a></strong></blockquote>';

  /* ── CDIFFICILE (艰难梭菌) ── */
  ZH['/cdifficile/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>艰难梭菌耐药性与产毒能力检测</h1>' +
    '<p style="font-size:1.2em;color:#555">CDI 基因组监测 — 抗生素相关性结肠炎的首要病因</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>艰难梭菌</em>(Clostridioides difficile,C. diff)是一种革兰氏阳性产孢厌氧菌,是抗生素相关性腹泻和假膜性结肠炎的首要病因。关键临床问题:<strong>产毒株还是非产毒株</strong>(是否携带 <em>tcdA/tcdB</em> 基因)?</p>' +
    '<p>我们的流程同时确定:毒素基因谱(tcdA/B/C + 高毒力菌株的 cdtA/B)、抗生素耐药谱,以及用于流行病学分类的 PCR 核糖体分型。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:粪便培养物或富集培养物直接 WGS。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告 — 产毒状态、完整 AMR 谱、核糖体分型;面向生物信息分析师的 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 毒素基因与耐药决定因子</h2>' +
    '<h3>毒素基因 — 关键毒力因子</h3>' +
    tbl(['基因', '毒素', '临床意义'], [
      ['<strong>tcdA</strong>', '毒素 A(肠毒素)', '典型 CDI — 肠道损伤、腹泻'],
      ['<strong>tcdB</strong>', '毒素 B(细胞毒素)', '主要毒力因子 — CDI 诊断必需'],
      ['<strong>tcdC</strong>', 'tcdA/B 的负调控因子', '缺失 → 毒素过量产生(RT027 特征)'],
      ['<strong>cdtA / cdtB</strong>', '二元毒素 CDT', '高毒力菌株(RT027、RT078)— 重症与复发性 CDI']
    ]) +
    '<h3>抗生素耐药基因</h3>' +
    tbl(['基因 / 突变', '机制', '抗生素'], [
      ['<strong>gyrA / gyrB</strong>(Thr82Ile、Asp426Asn)', '促旋酶改变', '氟喹诺酮类(环丙沙星)— 流行克隆株的关键选择压力'],
      ['<strong>rpoB</strong>(His502Asn、Arg505Lys)', 'RNA 聚合酶改变', '利福昔明(去污染方案)'],
      ['<strong>tetM / tetW</strong>', '核糖体保护', '四环素类'],
      ['<strong>ermB</strong>', '23S rRNA 甲基化酶', '大环内酯类、克林霉素'],
      ['<strong>nimB</strong>', '甲硝唑还原酶', '甲硝唑(CDI 一线治疗)'],
      ['<strong>vanB</strong>', '细胞壁靶点修饰', '万古霉素(也是一线用药)— 罕见但关键']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq CDI Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CDI-Toxin-Classifier</strong>', '毒素谱分类(tcdA/B+/-、cdtA/B+/-)'],
      ['<strong>CDI-Res-Detector</strong>', '基于 WGS 的 AMR 表型预测'],
      ['<strong>CDI-Ribotyper</strong>', '计算机模拟 PCR 核糖体分型(RT027/RT078/RT014 等)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>、<code>samtools</code>(参考序列:C. difficile 630)'],
      ['<strong>3. 毒素基因检出</strong>', '<code>abricate</code>(VFDB,自建毒素数据库)'],
      ['<strong>4. AMR 基因</strong>', '<code>AMRFinderPlus</code> (NCBI)、<code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. 核糖体分型</strong>', '计算机模拟 PCR + ML 分类器(RT027/RT078)'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO</strong> — 艰难梭菌是全球最严重的抗生素相关性感染威胁之一;RT027/NAP1/BI — 大流行高毒力克隆株。</li>' +
    '<li><strong>俄罗斯</strong> — CDI 诊断不足;氟喹诺酮类和头孢菌素类的广泛使用推动了流行克隆株的选择。</li>' +
    '<li><strong>贝洛妥珠单抗 (Zinplava)</strong> — 针对毒素 B 的单克隆抗体,用于预防复发性 CDI;用药指征需要确认毒素 B。</li>' +
    '<li><strong>其他梭菌</strong> — 参见我们的 <a href="/perfringens/">产气荚膜梭菌</a>流程:分秒必争的气性坏疽、毒素分型 (cpa/cpb/etx/cpe/netB) 与紧急 AMR 谱分析。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789241509763">WHO — 艰难梭菌监测与感染控制</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — 综合抗生素耐药数据库</a></li>' +
    '<li>📄 <a href="https://www.genomicepidemiology.org/">基因组流行病学中心 — 分型工具</a></li></ul>';

  /* ── STAPHYLOCOCCUS (金黄色葡萄球菌) ── */
  ZH['/staphylococcus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_staphylococcus.svg" alt="金黄色葡萄球菌 (Staphylococcus aureus)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>金黄色葡萄球菌 MRSA/VRSA 鉴定与完整 AMR 谱分析</h1>' +
    '<p style="font-size:1.2em;color:#555">金黄色葡萄球菌基因组监测 — 主要的医院感染病原体,WHO 重点 AMR 病原体</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>金黄色葡萄球菌</em>是一种形成特征性葡萄串状簇的革兰氏阳性球菌。是广谱感染的主要病原体:从皮肤软组织感染(疖、脓肿)到危及生命的<strong>菌血症、感染性心内膜炎、骨髓炎、呼吸机相关性肺炎 (VAP)</strong>。WHO 已将 MRSA 列为重点 AMR 病原体(高优先级类别)。</p>' +
    '<p>任何金黄色葡萄球菌的关键临床问题:<strong>MRSA 还是 MSSA</strong>。答案决定整个治疗策略。我们的流程给出完整的基因组学答案:mecA/mecC 状态、覆盖全部抗生素类别的完整 AMR 谱、毒力因子(PVL、TSST-1、生物膜)以及菌株分子分型。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:血液、脓液、痰、活检组织、伤口拭子。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告 — MRSA/MSSA 状态、完整 AMR 谱、关键毒力因子、SCCmec 型别;面向生物信息分析师的 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与临床表型</h2>' +
    '<h3>β-内酰胺类 — 关键问题:MRSA 还是 MSSA</h3>' +
    tbl(['基因', '机制', '表型'], [
      ['<strong>mecA</strong>', '修饰型 PBP2a — 对 β-内酰胺类不敏感', '<strong>MRSA</strong> — 对所有 β-内酰胺类耐药'],
      ['<strong>mecC</strong>', 'mecA 趋异变体(LA-MRSA CC130)', '<strong>MRSA</strong> — 标准检测不易检出'],
      ['<strong>blaZ</strong>', 'β-内酰胺酶', '青霉素耐药(>95% 分离株)']
    ]) +
    '<h3>SCCmec 型别与 MRSA 流行病学类别</h3>' +
    '<p>SCCmec 盒是携带 mecA/mecC 的基因组岛。其型别指示菌株来源并指导应对措施:</p>' +
    tbl(['类别', 'SCCmec', '典型克隆', '特点'], [
      ['<strong>HA-MRSA</strong>(医院获得性)', 'I、II、III', 'CC5、CC8 (ST239)', '多重耐药、ICU、迁延的医院暴发'],
      ['<strong>CA-MRSA</strong>(社区获得性)', 'IV、V', 'CC8/USA300、CC80', '常为 PVL+,健康人群重症皮肤感染'],
      ['<strong>LA-MRSA</strong>(牲畜相关性)', 'V、XI (mecC)', 'CC398、CC130', '动物接触;mecA 快速检测会漏检 mecC']
    ]) +
    '<h3>糖肽类 — MRSA 的最后手段</h3>' +
    tbl(['基因', '表型', '意义'], [
      ['<strong>vanA</strong>', '<strong>VRSA</strong>(MIC ≥16 μg/mL)', '罕见但致命 — 绝对紧急情况'],
      ['<strong>vanB</strong>', 'VRSA(中等)', '罕见'],
      ['<strong>无 vanA/B + 细胞壁增厚</strong>', '<strong>hVISA/VISA</strong>', '万古霉素异质性耐药(治疗失败时至关重要)']
    ]) +
    '<h3>其他抗生素类别</h3>' +
    tbl(['基因', '突变 / 机制', '抗生素类别'], [
      ['<strong>ermA / ermB / ermC</strong>', '23S rRNA 甲基化酶', '大环内酯类、林可酰胺类(克林霉素)— MLSB'],
      ['<strong>tetM / tetK</strong>', '核糖体保护 / 外排', '四环素类'],
      ['<strong>aac(6\')/aph(2")</strong>', '氨基糖苷修饰', '庆大霉素、妥布霉素'],
      ['<strong>grlA / gyrA</strong>(突变)', '靶点改变', '氟喹诺酮类(环丙沙星)'],
      ['<strong>rpoB</strong>(突变)', 'RNA 聚合酶改变', '利福平'],
      ['<strong>mupA</strong>', '异亮氨酰-tRNA 合成酶改变', '莫匹罗星(高水平)— 去定植失败'],
      ['<strong>cfr</strong>', '23S rRNA 甲基化酶', '利奈唑胺、氯霉素']
    ]) +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '在金黄色葡萄球菌中的作用'], [
      ['<strong>苯唑西林</strong>', '耐青霉素酶 β-内酰胺', 'MRSA 替代标志物(R → MRSA)'],
      ['<strong>万古霉素</strong>', '糖肽类', 'MRSA 治疗金标准'],
      ['<strong>头孢洛林 / 头孢托罗</strong>', '第五代头孢菌素', '唯一对 MRSA 有活性的 β-内酰胺类(PBP2a 亲和力)'],
      ['<strong>利奈唑胺</strong>', '噁唑烷酮类', '万古霉素不耐受时的替代'],
      ['<strong>达托霉素</strong>', '脂肽类', 'MRSA 菌血症与心内膜炎'],
      ['<strong>克林霉素</strong>', '林可酰胺类', 'MRSA 皮肤软组织感染(D 试验检测诱导性耐药)'],
      ['<strong>利福平</strong>', '安沙霉素类', '生物膜、联合治疗'],
      ['<strong>莫匹罗星</strong>', '外用抗生素', 'MRSA 携带者去定植']
    ]) + '<hr>' +
    '<h2>☣️ 毒力因子</h2>' +
    tbl(['基因', '因子', '临床意义'], [
      ['<strong>pvl</strong> (lukSF-PV)', 'PVL(杀白细胞素)', '坏死性肺炎、复发性皮肤脓肿'],
      ['<strong>tst</strong>', 'TSST-1(中毒性休克综合征毒素-1)', '中毒性休克综合征'],
      ['<strong>hla</strong>', 'α-毒素(溶血素)', '组织坏死、红细胞破坏'],
      ['<strong>icaADBC</strong>', '生物膜(多糖 PIA/PNAG)', '植入物与导管相关感染'],
      ['<strong>sdrCDE、fnbAB</strong>', '纤连蛋白结合蛋白', '内皮黏附 → 心内膜炎']
    ]) + '<hr>' +
    '<h2>🏥 临床应用案例</h2>' +
    tbl(['场景', '流程解决的问题'], [
      ['<strong>菌血症 / ICU 脓毒症</strong>', '数小时内确定 MRSA/MSSA — 有据可依地选择万古霉素或苯唑西林'],
      ['<strong>术前筛查</strong>', '鼻腔金黄色葡萄球菌携带 → 术前莫匹罗星 + 氯己定去定植'],
      ['<strong>坏死性肺炎</strong>', '检出 PVL+ CA-MRSA — 紧急升级治疗'],
      ['<strong>植入物 / 导管感染</strong>', '生物膜 (ica+) → 联合利福平、决定是否更换植入物'],
      ['<strong>万古霉素治疗失败</strong>', '疑似 hVISA/VISA — 及时换用利奈唑胺或达托霉素'],
      ['<strong>去定植失败</strong>', 'mupA → 高水平莫匹罗星耐药,更换方案']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq SA Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>SA-Res-Detector</strong>', '基于 WGS 的 AMR 表型预测(全部抗生素类别)'],
      ['<strong>SA-Virulence-Classifier</strong>', '毒力谱分类(PVL+/-、生物膜+/-)'],
      ['<strong>SA-Typer</strong>', '计算机模拟 MLST 与 SCCmec 分型(CC8/USA300、CC5、CC22、CC398)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2 2.26</code>、<code>samtools</code>(参考序列:S. aureus MRSA252 / USA300)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3 ≥1.0.4</code>、<code>medaka</code>'],
      ['<strong>4. AMR 与毒力基因检出</strong>', '<code>AMRFinderPlus</code> (NCBI)、<code>abricate</code> (CARD, Resfinder, VFDB)'],
      ['<strong>5. SCCmec、MLST 与 spa 分型</strong>', '<code>sccmec</code> (SCCmecFinder)、<code>mlst</code> (PubMLST S. aureus)、<code>spaTyper</code>'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO,2017</strong> — MRSA 列入重点病原体名单(高优先级类别)。</li>' +
    '<li><strong>俄罗斯</strong> — 视医院不同,MRSA 占 ICU 医院感染金黄色葡萄球菌的 30–60%。</li>' +
    '<li><strong>PVL-MRSA</strong> — 携带 <em>pvl</em> 基因的 CC8/USA300 菌株在既往健康的年轻患者中引起坏死性肺炎暴发;俄罗斯已有记录。</li>' +
    '<li><strong>LA-MRSA CC398</strong> — 牲畜相关性 MRSA;mecC-MRSA 无法被标准 mecA 快速检测发现。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/WHO-EMP-IAU-2017.12">WHO — AMR 全球重点病原体名单</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — 综合抗生素耐药数据库</a></li>' +
    '<li>📄 <a href="https://www.bv-brc.org/">BV-BRC — 细菌与病毒生物信息资源中心(>10,000 个金黄色葡萄球菌基因组)</a></li>' +
    '<li>📄 <a href="https://www.genomicepidemiology.org/services/">SCCmecFinder — SCCmec 盒分型</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/staphylococcus-aureus">PubMLST S. aureus MLST 数据库</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/">EUCAST — 金黄色葡萄球菌临床折点</a></li></ul>';

  /* ── INFLUENZA (流感病毒) ── */
  ZH['/influenza/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_influenza.png" alt="流感病毒" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>流感毒株监测与抗原转换检测</h1>' +
    '<p style="font-size:1.2em;color:#555">亚型分型、基因节段重配追踪与抗病毒耐药谱分析</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>流感病毒</strong>兼具高点突变率(抗原漂移)和共感染时交换整个基因组节段的能力——<strong>重配 (reassortment)</strong>,其后果是抗原转换和新大流行毒株的出现。仅靠亚型分型不够:8 个节段中每一个的来源都很重要。</p>' +
    '<p>流程执行流感全基因组分析:HA/NA 亚型分型、全部节段重建、重配株检测与抗病毒耐药谱分析。节段来源通过<strong>位点级图比对 (OnSiteSeq-PanG)</strong> 追踪:图编码了已知节段的历史,显示患者病毒由哪些"历史片段"组装而成。亚型分型与节段组装使用成熟的标准工具 (IRMA,CDC)。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:鼻咽/口咽拭子、病毒培养物。最佳方案:全部 8 个节段的 WGS(多重 PCR)。</li>' +
    '<li><strong>📤 输出:</strong> HTML 报告,含亚型(H1N1pdm09、H3N2、Victoria/Yamagata)、Nextclade 归属、重配节段信息与耐药谱。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:V — 负链ssRNA(负义单链RNA)</h2>' +
    '<p>V 类病毒的基因组为负链单链RNA:该链无法被细胞核糖体直接翻译,因此病毒首先合成互补的(+)链,再由此翻译蛋白。所需的酶 —— RNA 依赖的 RNA 聚合酶(RdRp)—— 由病毒颗粒自带:细胞中没有现成的。流感基因组分为 <strong>8 个独立的负链ssRNA 节段</strong>,正是这种分节段特性使<strong>重配</strong>成为可能 —— 当两个毒株同时感染一个细胞时整体交换节段,这是抗原转变和大流行变异株诞生的机制。因此流程逐一分析每个节段的来源(OnSiteSeq-PanG),而非只给出一个平均化的病毒亚型。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['I', '双链DNA', 'DNA → mRNA(与宿主细胞相同)', '疱疹病毒、腺病毒、天花、非洲猪瘟'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['<strong>V</strong>', '<strong>负链ssRNA</strong>', '<strong>先合成(+)链(RdRp)</strong>', '<strong>流感、SFTS、狂犬病</strong>'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 关键标志物与耐药</h2>' +
    tbl(['标志物', '意义', '药物类别'], [
      ['<strong>血凝素 (HA)</strong>', 'H 抗原分型(H1、H3、H5…)。主要疫苗靶点;与当季疫苗株比对', '—'],
      ['<strong>神经氨酸酶 (NA)</strong>', 'N 抗原分型(N1、N2)。突变 H275Y、E119V、R292K', '<strong>奥司他韦、扎那米韦</strong>(神经氨酸酶抑制剂)'],
      ['<strong>聚合酶 (PA)</strong>', '突变 I38T/F/M', '<strong>玛巴洛沙韦</strong>(PA 核酸内切酶抑制剂)'],
      ['<strong>M2 蛋白</strong>', 'S31N 突变(>99% 的 H3N2 与 pH1N1 耐药)', '<strong>金刚烷胺、金刚乙胺</strong> — 仅供参考']
    ]) + '<hr>' +
    '<h2>💉 疫苗学与监测</h2>' +
    '<p>亚型分型与抗原分析数据直接汇入 <strong>WHO GISRS</strong>(>150 个国家中心),用于季节性疫苗株选择。对流行毒株的本地监测既是对全球体系的贡献,也能对疫苗株与流行株不匹配提供早期预警。另一条独立战线是<strong>高致病性禽流感 (H5N1、H5N8) 监测</strong>:在人源样本中检出携带禽源节段的重配株是流行病学预警信号。</p>' +
    '<p>流感与其他呼吸道病毒(RSV、鼻病毒、SARS-CoV-2)的宏基因组鉴别诊断,请参阅 <a href="/flu/">OnSiteSeq 急性呼吸道病毒感染流程</a>。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Flu-Track Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>Flu-Subtyper</strong>', '基于 WGS 的 HA/NA 亚型分型(H1N1pdm09/H3N2,B 型 Victoria/Yamagata)'],
      ['<strong>Flu-Reassort-Detector</strong>', '重配节段检测(PanG 图比对)'],
      ['<strong>Flu-Res-Detector</strong>', '奥司他韦与玛巴洛沙韦耐药预测']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 组装与亚型分型</strong>', '<code>IRMA</code>(迭代优化宏组装器,CDC)'],
      ['<strong>3. 比对 (Mapping)</strong>', '<code>minimap2</code> 比对至节段参考序列;<strong>OnSiteSeq-PanG</strong> 用于节段来源分析'],
      ['<strong>4. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>5. 进化枝分类</strong>', '<code>Nextclade</code>(甲/乙型流感进化枝,抗原匹配评估)'],
      ['<strong>6. 耐药注释</strong>', '自建 NA/PA/M2 突变数据库 + <code>snpEff</code>'],
      ['<strong>7. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO GISRS</strong> — 根据流行毒株数据确定每年的疫苗组成;基因组监测是该体系的基石。</li>' +
    '<li><strong>H5N1</strong> — 高致病性禽流感宿主范围不断扩大(鸟类 → 哺乳动物 → 散发人病例),使重配株监测成为监测工作的重点。</li>' +
    '<li><strong>奥司他韦耐药</strong> — H275Y 突变曾导致耐药性 H1N1 全球固定(2008–2009 季);持续监测必不可少。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/initiatives/global-influenza-surveillance-and-response-system">WHO — 全球流感监测与应对系统 (GISRS)</a></li>' +
    '<li>📄 <a href="https://wonder.cdc.gov/amd/flu/irma/">CDC IRMA — 迭代优化宏组装器</a></li>' +
    '<li>📄 <a href="https://nextstrain.org/flu">Nextstrain / Nextclade — 流感进化枝</a></li>' +
    '<li>📄 <a href="https://gisaid.org/">GISAID — 全球流感基因组数据库</a></li></ul>';

  /* ── PLASMODIUM (疟原虫) ── */
  ZH['/plasmodium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_plasmodium.png" alt="恶性疟原虫 (Plasmodium falciparum)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>恶性疟原虫耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">基因组耐药谱分析、虫种鉴定与输入性疟疾病例核实</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>恶性疟原虫</em>引起最严重形式的疟疾。近年来的最大威胁是<strong>青蒿素</strong>(一线治疗)部分耐药从东南亚向非洲扩散。对俄罗斯而言,疟疾是输入性感染:流程在此的任务是<strong>输入病例核实</strong>、虫种鉴定,以及在数小时内(而非转诊参考实验室)评估输入虫株的耐药性。</p>' +
    '<p>流程分析 WHO 验证的耐药标志物(<em>kelch13</em>、<em>pfcrt</em>、<em>pfmdr1</em>、<em>dhfr</em>、<em>dhps</em>、<em>plasmepsin2/3</em> 扩增)以及诊断基因 <em>hrp2/hrp3</em> 缺失。对高变位点,<strong>位点级图比对 (OnSiteSeq-PanG)</strong> 可降低参考偏倚;保守标志物用标准比对分析。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:全血(经寄生虫 DNA 富集或目标位点扩增子富集)。</li>' +
    '<li><strong>📤 输出:</strong> HTML 报告,含疟原虫虫种、药敏谱、<em>hrp2/hrp3</em> 状态与检出突变。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    tbl(['基因', '关键突变', '药物类别 / 意义'], [
      ['<strong>kelch13</strong> (K13)', 'C580Y、R539T、Y493H、M476I(亚洲);<strong>R561H</strong>(非洲验证 — 卢旺达、乌干达)', '<strong>青蒿素</strong> — 寄生虫清除延迟'],
      ['<strong>pfcrt</strong>', 'K76T', '<strong>氯喹</strong>'],
      ['<strong>pfmdr1</strong>', 'N86Y、Y184F、D1246Y;拷贝数扩增', '<strong>甲氟喹、本芴醇</strong>(敏感性调节)'],
      ['<strong>dhfr</strong>', 'N51I、C59R、S108N', '<strong>乙胺嘧啶</strong>'],
      ['<strong>dhps</strong>', 'A437G、K540E', '<strong>磺胺多辛</strong>'],
      ['<strong>plasmepsin2/3</strong>', '拷贝数扩增', '<strong>哌喹</strong> — ACT 配伍药物']
    ]) +
    '<h3>hrp2/hrp3 缺失 — 对快速诊断的威胁</h3>' +
    '<p><em>hrp2</em> 和 <em>hrp3</em> 缺失会使寄生虫对基于 HRP2 的快速诊断试条 (RDT) "隐形" — 真实感染却出现假阴性结果。纳米孔长读长无需基因组组装即可直接检测这些缺失。报告包含 <em>hrp2/hrp3</em> 状态及临床解读:存在缺失时,RDT 阴性不能排除疟疾 — 应进行 PCR/镜检。</p>' +
    '<h3>虫种鉴定</h3>' +
    '<p>除 <em>恶性疟原虫</em>外,流程还可通过 18S rRNA 位点区分 <em>间日疟原虫</em>、<em>卵形疟原虫</em>、<em>三日疟原虫</em>和人兽共患的 <em>诺氏疟原虫</em> — 虫种决定治疗方案(对间日疟/卵形疟,必须结合 G6PD 状态使用伯氨喹抗复发治疗)。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Malaria Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>Malaria-Res-Detector</strong>', '基于 WHO 验证标志物 (k13 等) 的耐药预测'],
      ['<strong>Malaria-Species-Typer</strong>', '基于 18S rRNA 的疟原虫虫种鉴定']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(参考序列:3D7);<strong>OnSiteSeq-PanG</strong> 用于高变位点'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 耐药注释</strong>', '自建 WHO 验证标志物数据库(k13/pfcrt/pfmdr1/dhfr/dhps)'],
      ['<strong>5. 缺失检测</strong>', '基于长读长的 <em>hrp2/hrp3</em> 位点覆盖度分析'],
      ['<strong>6. 虫种鉴定</strong>', '<code>minimap2</code> + 18S rRNA 面板分类'],
      ['<strong>7. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO《世界疟疾报告》</strong> — 每年约 2.5 亿病例、约 60 万死亡;基因组耐药监测被列为优先事项。</li>' +
    '<li><strong>非洲</strong> — 卢旺达和乌干达已确认青蒿素部分耐药(标志物 R561H):存在重蹈氯喹失效覆辙的风险。</li>' +
    '<li><strong>俄罗斯</strong> — 疟疾已消除,但每年仍有输入病例登记;快速核实虫种与耐药性对治疗与防控至关重要。</li>' +
    '<li><strong>hrp2/hrp3 缺失</strong> — RDT 阴性虫株的传播正在削弱流行区对快速检测的信任。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/teams/global-malaria-programme/reports">WHO — 世界疟疾报告</a></li>' +
    '<li>📄 <a href="https://www.who.int/publications/i/item/9789240021068">WHO — 青蒿素耐药 K13 分子标志物</a></li>' +
    '<li>📄 <a href="https://www.wwarn.org/">WWARN — 世界抗疟药耐药网络</a></li>' +
    '<li>📄 <a href="https://plasmodb.org/">PlasmoDB — 疟原虫基因组学资源</a></li></ul>';

  /* ── FLU (病毒性急性呼吸道感染,宏基因组) ── */
  ZH['/flu/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_flu.svg" alt="OnSiteSeq 急性呼吸道病毒感染 panel" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>病毒性呼吸道病原体的宏基因组鉴定</h1>' +
    '<p style="font-size:1.2em;color:#555">甲/乙型流感、RSV、鼻病毒、冠状病毒及其他呼吸道病毒的鉴别诊断 — 就在床旁</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>急性呼吸道病毒感染 (ARVI) 由数十种临床表现几乎无法区分的病毒引起。快速准确的病原体鉴定对三项临床任务至关重要:<strong>抗病毒治疗处方</strong>(流感用奥司他韦,COVID-19 用奈玛特韦)、<strong>感染控制</strong>(儿科 RSV 患者隔离)和<strong>流行病学监测</strong>(流感流行毒株监测)。</p>' +
    '<p>我们的流程采用<strong>宏基因组纳米孔测序 (mNGS)</strong>:样本(鼻咽拭子、肺泡灌洗液)在事先不知病原体的情况下测序 — 同时检出所有病毒。对检出的甲/乙型流感,还会额外确定亚型与抗病毒耐药谱。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1) 后的原始 <code>FASTQ</code> 数据。样本:鼻咽拭子 / 鼻咽抽吸物 / 肺泡灌洗液 (BAL)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告,含检出的病原体、相对丰度,以及(针对流感)抗病毒耐药谱。</li></ul><hr>' +
    '<h2>🧭 作为急性呼吸道感染地图的巴尔的摩分类</h2>' +
    '<p>巴尔的摩分类法按基因组类型和 mRNA 合成策略将病毒分为七个类别。呼吸道病毒同时散布在多个类别中 —— 而宏基因组筛查能用<strong>同一种方法一次性</strong>看到它们全部,因为它直接作用于核酸:测序仪并不关心病毒采用哪种复制策略。这正是 mNGS 与 PCR 组合检测的区别所在 —— 后者每一类基因组都需要各自的扩增方案。</p>' +
    tbl(['巴尔的摩类别', '基因组', '急性呼吸道感染检测组合中的病原体'], [
      ['<strong>I</strong>', '双链DNA', '腺病毒(血清型 B、C、E)'],
      ['<strong>II</strong>', '单链DNA(+)', '博卡病毒(HBoV)'],
      ['<strong>IV</strong>', '正链ssRNA', '鼻病毒 A/B/C;冠状病毒(SARS-CoV-2、季节性 HCoV)'],
      ['<strong>V</strong>', '负链ssRNA', '甲型/乙型流感、RSV、副流感病毒、偏肺病毒']
    ]) +
    '<p>请注意:相同的临床表现 ——"普通感冒"—— 可由分子生物学特性截然不同的病毒引起,从博卡病毒的单链DNA到流感病毒的分节段负链ssRNA。对诊断而言,这种差异被抹平了:在文库制备阶段 RNA 被转化为 cDNA,此后所有类别都由同一条流程分析。</p><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🦠 可检出的病原体</h2>' +
    tbl(['病原体', '临床意义'], [
      ['<strong>甲型流感 (H1N1pdm09、H3N2)</strong>', '主要季节性病原体;抗病毒治疗 — 奥司他韦、玛巴洛沙韦'],
      ['<strong>乙型流感 (Victoria / Yamagata)</strong>', '第二重要;亚型分型对治疗策略很重要'],
      ['<strong>RSV A / RSV B</strong>', '儿童毛细支气管炎的首要病因;婴儿预防 — 尼塞韦单抗;诊断指导儿科病房隔离'],
      ['<strong>鼻病毒 A / B / C</strong>', '最常见的 ARVI 病原体;无特异性治疗'],
      ['<strong>SARS-CoV-2</strong>', 'COVID-19;检出时自动转入 <a href="/sarscov2/">完整 CoV-2 流程</a>'],
      ['<strong>季节性冠状病毒 (HCoV-OC43、-229E、-NL63、-HKU1)</strong>', 'COVID-19 鉴别诊断'],
      ['<strong>腺病毒(血清型 B、C、E)</strong>', '集体机构暴发;免疫缺陷患者可致重症'],
      ['<strong>副流感病毒 (PIV 1–4)</strong>', '儿童喉气管炎("格鲁布")'],
      ['<strong>偏肺病毒 (hMPV A/B)</strong>', '临床表现类似 RSV;儿科与老年人群重要'],
      ['<strong>博卡病毒 (HBoV)</strong>', '共同病原体;常见混合感染']
    ]) + '<hr>' +
    '<h2>🎯 流感亚型分型与耐药</h2>' +
    tbl(['基因', '关键突变', '药物'], [
      ['<strong>NA</strong>(神经氨酸酶)', 'H275Y (N1)、E119V (N2)、R292K', '奥司他韦(达菲)、扎那米韦'],
      ['<strong>PA</strong>(聚合酶)', 'I38T / I38F / I38M', '玛巴洛沙韦 (Xofluza)'],
      ['<strong>M2</strong>(离子通道)', 'S31N、V27A、A30T', '金刚烷胺 / 金刚乙胺(>99% 的 H3N2 与 pH1N1 耐药)']
    ]) + '<hr>' +
    '<h2>🧪 针对 Flongle 芯片优化</h2>' +
    '<p>Flongle 适配器单次运行产出约 <strong>1 Gb</strong> — 比完整的 R9.4.1/R10.4.1 芯片低一个数量级。对病毒宏基因组学通常足够(病毒基因组很小),但需要调整实验方案:</p>' +
    '<ul><li><strong>逆转录</strong> — 所有目标病原体均为 RNA 病毒;文库需经 RT 步骤制备(如 Ligation Sequencing Kit 配 cDNA),使方案增加 1–2 小时。</li>' +
    '<li><strong>自适应采样 (Read Until)</strong> — 实时剔除人源读长可将病毒比例提高 3–10 倍;在典型病毒载量 (Ct &lt; 30) 下足以获得流感(约 13.5 kb)或 RSV(约 15 kb)的完整基因组。</li>' +
    '<li><strong>宿主去除</strong> — 提取前用皂苷处理样本,可去除 90–99% 的人源物质。</li>' +
    '<li><strong>灵敏度阈值</strong> — 可靠检出与亚型分型要求病毒占读长 ≥ 0.1%(约 Ct ≤ 30–32);阴性结果不能排除低滴度感染。</li>' +
    '<li><strong>多样本混合</strong> — 每张 Flongle 2–4 个条形码样本,可将单样本成本控制在数千卢布。</li></ul>' +
    '<p><em>随着芯片产出和 ONT 化学体系准确度的提升,相同流程无需改动即可迁移到更深覆盖度 — 灵敏度阈值由运行配置决定,而非硬编码。</em></p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq ARVI Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>RespiVirus-Classifier</strong>', '病毒病原体的宏基因组分类(基于 k-mer 的 CNN)'],
      ['<strong>Flu-Subtyper</strong>', '基于 WGS 的甲型 (H1N1/H3N2) 与乙型 (Victoria/Yamagata) 流感亚型分型'],
      ['<strong>Flu-Res-Detector</strong>', '奥司他韦与玛巴洛沙韦耐药预测']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 宿主读长去除</strong>', '<code>minimap2</code>(参考:GRCh38)→ 剔除人源读长'],
      ['<strong>3. 宏基因组分类</strong>', '<code>Kraken2</code> + <code>Bracken</code>(RefSeq 病毒数据库 + 自建基因组)'],
      ['<strong>4. 靶向比对</strong>', '<code>minimap2</code> 比对至已检出病原体的参考序列'],
      ['<strong>5. 流感亚型分型</strong>', '<code>IRMA</code>(迭代优化宏组装器,CDC)'],
      ['<strong>6. 耐药注释</strong>', '自建 NA/PA/M2 突变数据库 + <code>snpEff</code>'],
      ['<strong>7. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO</strong> — 全球流感监测与应对系统 (GISRS) 包含 150 多个国家中心;流行毒株数据决定每年的疫苗组成。</li>' +
    '<li><strong>"盲目"抗生素治疗问题</strong> — 在俄罗斯,约 40–60% 的 ARVI 病例被开了抗生素,尽管病因是病毒。床旁准确鉴定病原体可避免不必要的抗生素使用。</li>' +
    '<li><strong>RSV 流行季</strong> — 每年的暴发使儿科医院不堪重负;尼塞韦单抗 (Beyfortus) 在流行季前为婴儿预防性接种,而床旁快速确诊 RSV 则指导儿科病房的隔离与分组管理。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/initiatives/global-influenza-surveillance-and-response-system">WHO — 全球流感监测与应对系统 (GISRS)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/genomes/FLU/">NCBI 流感病毒数据库</a></li>' +
    '<li>📄 <a href="https://wonder.cdc.gov/amd/flu/irma/">CDC IRMA — 迭代优化宏组装器</a></li></ul>';

  /* ── COLD (细菌性急性呼吸道感染,宏基因组) ── */
  ZH['/cold/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cold.svg" alt="OnSiteSeq 细菌性急性呼吸道感染 panel" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>细菌性呼吸道病原体及其 AMR 的宏基因组鉴定</h1>' +
    '<p style="font-size:1.2em;color:#555">社区获得性肺炎与细菌性急性呼吸道感染的鉴别诊断 — 就在床旁</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>细菌性呼吸道感染需要准确鉴定病原体及其抗生素敏感性谱,以指导合理的经验性治疗。我们的流程采用宏基因组纳米孔测序,同时鉴定病原体并确定其 AMR 谱。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别后的原始 <code>FASTQ</code> 数据。样本:痰、鼻咽拭子、肺泡灌洗液 (BAL)、血培养。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告,含检出的病原体与抗生素敏感性谱。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🦠 可检出的病原体</h2>' +
    tbl(['病原体', '临床意义'], [
      ['<strong>肺炎链球菌</strong>', '社区获得性肺炎的首要病因;经 PBP2b/2x 突变产生青霉素耐药'],
      ['<strong>流感嗜血杆菌</strong>', '急性呼吸道感染、中耳炎、鼻窦炎、脑膜炎;BLNAR 菌株(β-内酰胺酶阴性氨苄西林耐药)'],
      ['<strong>肺炎克雷伯菌</strong>', '医院获得性肺炎;碳青霉烯耐药(KPC、NDM、OXA-48)'],
      ['<strong>肺炎支原体</strong>', '非典型肺炎;大环内酯耐药(23S rRNA A2063G)'],
      ['<strong>肺炎衣原体</strong>', '非典型肺炎;培养难以检出'],
      ['<strong>卡他莫拉菌</strong>', '慢性阻塞性肺病急性加重 (AECB)、中耳炎;BRO 型 β-内酰胺酶'],
      ['<strong>金黄色葡萄球菌</strong>', '流感后肺炎;MRSA (mecA)'],
      ['<strong>铜绿假单胞菌</strong>', '囊性纤维化患者的医院获得性肺炎;多重耐药 (MBL)'],
      ['<strong>嗜肺军团菌</strong>', '军团菌病 — 重症肺炎;需特异性氟喹诺酮治疗']
    ]) + '<hr>' +
    '<h2>🎯 关键 AMR 基因</h2>' +
    tbl(['基因 / 突变', '机制', '抗生素类别'], [
      ['<strong>pbp1a/2b/2x</strong>(突变)', 'PBP 结合位点改变', '青霉素类、头孢菌素类(肺炎链球菌)'],
      ['<strong>mecA</strong>', '修饰型 PBP2a', '所有 β-内酰胺类 (MRSA)'],
      ['<strong>blaKPC / blaNDM / blaOXA-48</strong>', '水解碳青霉烯的 β-内酰胺酶', '碳青霉烯类(肺炎克雷伯菌、铜绿假单胞菌)'],
      ['<strong>ermB / erm(C)</strong>', '23S rRNA 甲基化酶', '大环内酯类(阿奇霉素、克拉霉素)'],
      ['<strong>gyrA / parC</strong>(突变)', 'DNA 促旋酶/拓扑异构酶 IV 改变', '氟喹诺酮类(左氧氟沙星、莫西沙星)'],
      ['<strong>cat / cmr</strong>', '氯霉素乙酰转移酶', '氯霉素']
    ]) + '<hr>' +
    '<h2>🧪 针对 Flongle 芯片优化</h2>' +
    '<p>Flongle 适配器单次运行产出约 <strong>1 Gb</strong> — 比完整的 R9.4.1/R10.4.1 芯片低一个数量级。细菌基因组(2–6 Mb)远大于病毒,因此宿主去除在此至关重要:</p>' +
    '<ul><li><strong>自适应采样 (Read Until)</strong> — 实时剔除人源读长可将细菌比例提高 3–10 倍;是 Flongle 临床宏基因组学的关键技术。</li>' +
    '<li><strong>宿主去除</strong> — 皂苷裂解或差速离心可在上机前去除 90–99% 的人源 DNA,将病原体占比从约 1% 提升至读长的 50–80%。</li>' +
    '<li><strong>灵敏度阈值</strong> — 在约 1 Gb 产出下,可靠检出细菌要求病原体占样本 ≥ 0.1–1%;阴性结果不能排除低滴度感染。</li>' +
    '<li><strong>AMR 标志物</strong> — 耐药基因仅在覆盖度足够时报告:"未检出"意味着灵敏度极限,而非确认敏感;报告中相应注明"AMR 谱未确定"。</li>' +
    '<li><strong>多样本混合</strong> — 每张 Flongle 2–4 个条形码样本,可将单样本成本控制在数千卢布。</li></ul>' +
    '<p><em>随着芯片产出和 ONT 化学体系准确度的提升,相同流程无需改动即可迁移到更深覆盖度 — 灵敏度阈值由运行配置决定,而非硬编码。</em></p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq ARI Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>BactResp-Classifier</strong>', '细菌病原体的宏基因组分类(基于 k-mer)'],
      ['<strong>BactResp-Res-Detector</strong>', '基于宏基因组数据的 AMR 表型预测']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 宿主读长去除</strong>', '<code>minimap2</code>(参考:GRCh38)'],
      ['<strong>3. 宏基因组分类</strong>', '<code>Kraken2</code> + <code>Bracken</code>(RefSeq 细菌数据库)'],
      ['<strong>4. AMR 基因检出</strong>', '<code>AMRFinderPlus</code> (NCBI)、<code>abricate</code> (CARD, Resfinder)'],
      ['<strong>5. MLST 分型</strong>', '<code>mlst</code>(已检出菌种的 PubMLST 方案)'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO AMR 行动计划</strong> — 社区获得性肺炎是全球 AMR 相关死亡的主要原因之一。</li>' +
    '<li><strong>俄罗斯</strong> — 急性呼吸道感染的经验性抗生素治疗常在未鉴定病原体的情况下开具;床旁 mNGS 可实现靶向治疗并减少抗生素滥用。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://card.mcmaster.ca/">CARD — 综合抗生素耐药数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/">NCBI AMRFinderPlus</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/">PubMLST — 多位点序列分型数据库</a></li></ul>';

  /* ── 植物病原体的宏基因组鉴定 (phytophthora, обзорная) ── */
  ZH['/phytophthora/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>植物病原体的宏基因组鉴定与杀菌剂抗性</h1>' +
    '<p style="font-size:1.2em;color:#555">植物保护的纳米孔测序 — 致病疫霉、镰刀菌、灰葡萄孢等。就在田间。</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>由卵菌(疫霉属 Phytophthora)、真菌(镰刀菌属、灰葡萄孢、链格孢属)和细菌(假单胞菌属、果胶杆菌属)引起的植物病害给农业造成巨大的经济损失。我们的流程可在田间直接快速鉴定植物病原体及其杀菌剂抗性谱 — 从采样到结果仅需数小时。</p>' +
    '<ul><li><strong>📥 输入:</strong> ITS 扩增子测序 (ITS1/ITS2) 或全宏基因组的原始 <code>FASTQ</code> 数据。样本:感病叶片、根系、果实组织。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的报告,含鉴定出的病原体、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🌿 可检出的植物病原体</h2>' +
    tbl(['病原体', '病害', '经济意义'], [
      ['<strong>Phytophthora infestans</strong>', '马铃薯和番茄晚疫病', '马铃薯最具破坏性的病原;曾引发爱尔兰大饥荒'],
      ['<strong>Fusarium oxysporum / graminearum</strong>', '镰刀菌枯萎病、穗腐病', '霉菌毒素污染 (DON、ZEN) — 食品安全威胁'],
      ['<strong>Botrytis cinerea</strong>', '灰霉病', '侵染 200 多种植物;严重的采后损失'],
      ['<strong>Alternaria alternata / solani</strong>', '早疫病、叶斑病', '马铃薯、番茄、谷类作物'],
      ['<strong>Plasmopara viticola</strong>', '葡萄霜霉病', '葡萄栽培的关键病原'],
      ['<strong>Peronospora / Bremia</strong>', '蔬菜霜霉病', '菠菜、生菜、洋葱'],
      ['<strong>Pythium ultimum</strong>', '根腐病、幼苗猝倒病', '温室与大田作物'],
      ['<strong>Rhizoctonia solani</strong>', '根腐与茎腐病', '马铃薯、谷类作物、甜菜'],
      ['<strong>Sclerotinia sclerotiorum</strong>', '白霉病(菌核病)', '油菜、向日葵、蔬菜']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '关键突变', '杀菌剂类别 (FRAC)'], [
      ['<strong>CesA3</strong>(纤维素合酶)', 'G1105S、V1109L', 'CAA — 双炔酰菌胺、烯酰吗啉 (FRAC 40)'],
      ['<strong>CYP51</strong>(甾醇 14α-脱甲基化酶)', 'Y137F、G460S、L50S', 'DMI — 戊唑醇、丙环唑 (FRAC 3)'],
      ['<strong>BcSdhB / BcSdhC / BcSdhD</strong>', 'H272Y/R/L、N230I', 'SDHI — 啶酰菌胺、氟唑菌酰胺 (FRAC 7)'],
      ['<strong>Cytb</strong>(细胞色素 b)', 'G143A、F129L', 'QoI — 嘧菌酯、肟菌酯 (FRAC 11)'],
      ['<strong>β-微管蛋白</strong>', 'E198A/K/G、F200Y', 'MBC — 多菌灵、甲基硫菌灵 (FRAC 1)'],
      ['<strong>PiORP1</strong>(致病疫霉氧化固醇受体)', 'V1109L、G1105S', '对羧酸酰胺类杀菌剂的抗性']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Phyto Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>PlantPath-Classifier</strong>', '基于 ITS 的植物病原体宏基因组分类'],
      ['<strong>FungRes-Detector</strong>', '杀菌剂抗性预测 (CYP51、SDHI、QoI 靶标)'],
      ['<strong>Phyto-Subtyper</strong>', '致病疫霉基因型的分子分型']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>'],
      ['<strong>2. ITS 扩增子处理</strong>', '<code>minimap2</code>、自定义 ITS1/ITS2 引物修剪'],
      ['<strong>3. 分类学分类</strong>', '<code>Kraken2</code> + <code>Bracken</code>(UNITE ITS 数据库 + 自定义卵菌数据)'],
      ['<strong>4. 杀菌剂抗性突变检测</strong>', '<code>clair3</code> / <code>medaka</code> + 自定义 FRAC 突变数据库'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>FRAC(杀菌剂抗性行动委员会)</strong> — 监测杀菌剂抗性的国际工作组;作用机制 (MoA) 分类与交互抗性分组是全球标准。</li>' +
    '<li><strong>UNITE ITS 数据库</strong> — 全球真菌 ITS 条形码参考数据库(超过 40 万条真菌序列)。</li>' +
    '<li><strong>俄罗斯</strong> — 马铃薯晚疫病(致病疫霉)在不利年份每年造成 20–30% 的产量损失;快速抗性基因分型可实现靶向杀菌剂施用。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌鉴定 ITS 数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/">NCBI 病原体检测</a></li></ul>';

  /* ── 马铃薯晚疫病 (phytophthora-infestans) ── */
  ZH['/phytophthora-infestans/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_phytophthora_infestans.svg" alt="致病疫霉 (Phytophthora infestans)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>晚疫病 — 致病疫霉 Phytophthora infestans</h1>' +
    '<p style="font-size:1.2em;color:#555">马铃薯与番茄晚疫病的宏基因组诊断,含杀菌剂抗性谱 — 数小时内完成,就在田间</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>致病疫霉(<em>Phytophthora infestans</em>)是一种卵菌(并非真正的真菌),为晚疫病的病原 — 全球马铃薯和番茄最具破坏性的病害。病原存在两种交配型 (A1 和 A2);它们在群体中共存时可形成持久存活的卵孢子,并加速抗性进化。在多雨季节,俄罗斯多达 50% 的马铃薯种植区受晚疫病侵害。</p>' +
    '<p>我们的流程在田间直接对感病组织进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原种的确认,以及对作物保护至关重要的<strong>杀菌剂抗性谱</strong>:俄罗斯致病疫霉群体中对甲霜灵/精甲霜灵的抗性普遍存在,喷施无效药剂等同于损失收成。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:马铃薯叶片/块茎匀浆、番茄叶片与果实。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>CesA3</strong>(纤维素合酶)', 'G1105S、G1105V', '双炔酰菌胺、烯酰吗啉 (CAA 杀菌剂)'],
      ['<strong>RPA70</strong>', 'V799A', 'CAA 杀菌剂'],
      ['<strong>—</strong>(多基因抗性)', '群体多态性', '甲霜灵 / 精甲霜灵(苯基酰胺类)'],
      ['<strong>Cytb</strong>(细胞色素 b)', 'G143A、F129L', '甲氧基丙烯酸酯类 / QoI(嘧菌酯、醚菌酯)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>爱尔兰大饥荒 (1845–1852)</strong> — 致病疫霉摧毁了爱尔兰几乎全部马铃薯收成,夺去超过 100 万人的生命。</li>' +
    '<li><strong>经济</strong> — 晚疫病造成的全球作物损失估计为<strong>每年 60–70 亿美元</strong>。</li>' +
    '<li><strong>甲霜灵抗性</strong> — 在俄罗斯所有马铃薯产区均已记录到抗性群体。</li>' +
    '<li><strong>EUROBLIGHT</strong> — 监测致病疫霉群体的欧洲网络,追踪新克隆谱系与抗性基因型的传播。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="https://euroblight.net/">EUROBLIGHT — 欧洲致病疫霉监测网络</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li></ul>';

  /* ── 大豆根腐病 (phytophthora-sojae) ── */
  ZH['/phytophthora-sojae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_phytophthora_sojae.svg" alt="大豆疫霉 (Phytophthora sojae)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>大豆根腐与茎腐病 — <em>Phytophthora sojae</em></h1>' +
    '<p style="font-size:1.2em;color:#555">大豆疫霉根腐病的宏基因组诊断,含致病型鉴定与杀菌剂抗性谱</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>大豆疫霉(<em>Phytophthora sojae</em>)是一种卵菌,为大豆根腐与茎腐病的病原。病原群体具有明显的<strong>生理小种结构</strong>:各致病型在克服大豆 <em>Rps</em> 抗病基因的能力上各不相同,因此小种组成直接决定哪些品种会被侵染。卵孢子可在土壤中存活多年,使受侵染田块成为长期的侵染源。</p>' +
    '<p>我们的流程对根组织与土壤洗液进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原种的确认、其在样本中的丰度估计以及<strong>杀菌剂抗性谱</strong> — 用于选择有效的种子处理与幼苗保护方案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:大豆根部与茎基部匀浆、土壤洗液。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>—</strong>(多基因抗性)', '群体多态性', '甲霜灵 / 精甲霜灵(苯基酰胺类)'],
      ['<strong>CesA3</strong>(纤维素合酶)', '点突变', '双炔酰菌胺 (CAA 杀菌剂)'],
      ['<strong>β-微管蛋白</strong>', '点突变', 'Ethaboxam(苯甲酰胺类)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>经济</strong> — 大豆疫霉造成的全球大豆产量损失估计为<strong>每年 10–20 亿美元</strong>。</li>' +
    '<li><strong>小种进化</strong> — 育种中广泛使用有限的 <em>Rps</em> 基因组合,导致能够克服品种抗性的致病型迅速积累。</li>' +
    '<li><strong>俄罗斯</strong> — 阿穆尔州和远东地区大豆种植面积的扩大,使大豆疫霉根腐病监测日益重要。</li>' +
    '<li><strong>诊断</strong> — 宏基因组学可在无需数周培养的情况下同时鉴定病原并评估群体的小种组成。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Phytophthora sojae</a></li></ul>';

  /* ── 镰刀菌枯萎病 (fusarium-oxysporum) ── */
  ZH['/fusarium-oxysporum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_fusarium_oxysporum.svg" alt="尖孢镰刀菌 (Fusarium oxysporum)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>镰刀菌枯萎病 — <em>Fusarium oxysporum</em></h1>' +
    '<p style="font-size:1.2em;color:#555">土传尖孢镰刀菌复合体的宏基因组诊断,含专化型鉴定与杀菌剂抗性谱</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>尖孢镰刀菌(<em>Fusarium oxysporum</em>)是一种土传真菌,以众多专化型(<strong>formae speciales</strong>)形式存在,各自侵染特定作物:<em>f. sp. lycopersici</em> — 番茄、<em>f. sp. cucumerinum</em> — 黄瓜、<em>f. sp. cubense</em>(热带小种 TR4)— 香蕉。厚壁<strong>厚垣孢子</strong>可在土壤中存活多年,化学防治对维管束枯萎病基本无效 — 因此土壤和种植材料带菌情况的早期诊断具有决定性意义。</p>' +
    '<p>我们的流程对茎部维管束组织、根系与土壤洗液进行<strong>宏基因组纳米孔测序</strong> (mNGS)。宏基因组方法不仅能确认尖孢镰刀菌的存在,还能将其与复合体中的近缘种区分开,并提供用于种子处理与喷施的<strong>杀菌剂抗性谱</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:茎部与根部维管束组织匀浆(番茄、黄瓜、谷类)、土壤洗液。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>β-微管蛋白</strong>', 'E198A、E198K', '苯并咪唑类(多菌灵、苯菌灵)'],
      ['<strong>CYP51</strong>(羊毛甾醇 14α-脱甲基化酶)', '点突变', '唑类 / DMI(戊唑醇)'],
      ['<strong>Cytb</strong>(细胞色素 b)', '天然结合位点结构', '甲氧基丙烯酸酯类 / QoI — 固有敏感性低']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>香蕉"巴拿马病"</strong> — 热带小种 <em>f. sp. cubense</em> TR4 正在摧毁亚洲、非洲和拉丁美洲的香蕉种植园,被视为全球香蕉产业的威胁。</li>' +
    '<li><strong>土壤持久性病原</strong> — 厚垣孢子在土壤中可存活数十年;轮作无法解决问题。</li>' +
    '<li><strong>化学防治基本无效</strong> — 对于维管束枯萎病,杀菌剂几乎无法到达病原;早期诊断与健康种植材料是关键。</li>' +
    '<li><strong>近缘种复合体</strong> — 形态学和培养诊断无法区分病原专化型;宏基因组学一次检测即可给出答案。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Fusarium oxysporum</a></li></ul>';

  /* ── 小麦赤霉病 (fusarium-graminearum) ── */
  ZH['/fusarium-graminearum/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_fusarium_graminearum.svg" alt="禾谷镰刀菌 (Fusarium graminearum)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>小麦赤霉病 (FHB) — <em>Fusarium graminearum</em></h1>' +
    '<p style="font-size:1.2em;color:#555">小麦和大麦赤霉病的宏基因组诊断,含霉菌毒素风险评估与杀菌剂抗性谱</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>禾谷镰刀菌(<em>Fusarium graminearum</em>)是小麦和大麦赤霉病 (FHB) 的病原。威胁是双重的:除直接产量损失外,该真菌还<strong>产生霉菌毒素</strong> — 脱氧雪腐镰刀菌烯醇 (DON,呕吐毒素) 和玉米赤霉烯酮,由 <em>TRI</em> 基因簇合成。受污染的谷物不再适合食用和饲用,因此诊断不仅关乎植物保护,也关乎粮批的毒理学控制。</p>' +
    '<p>我们的流程对籽粒和穗部组织进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原种的确认、粮批污染评估以及<strong>杀菌剂抗性谱</strong> — 三唑类仍是穗部保护的骨干药剂,监测其有效性对规划花期施药至关重要。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:小麦/大麦籽粒与穗部匀浆。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 鉴定出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<code>CYP51</code>(旁系同源基因 <code>FgCYP51A/B/C</code>)', '点突变、缺失', '唑类 / DMI(戊唑醇、丙硫菌唑)'],
      ['<code>β-微管蛋白</code>', 'F167Y、E198L、E198Q', '苯并咪唑类(多菌灵)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>FHB 大流行</strong> — 在北美、欧洲和亚洲定期记录;花期多雨天气会急剧增加侵染风险。</li>' +
    '<li><strong>霉菌毒素</strong> — 谷物中 DON 和玉米赤霉烯酮含量受到监管;无论产量损失大小,受污染粮批都会被拒收。</li>' +
    '<li><strong>多菌灵抗性</strong> — 在中国禾谷镰刀菌群体中已记录到对苯并咪唑类的大规模抗性。</li>' +
    '<li><strong>狭窄的保护窗口</strong> — 杀菌剂处理仅在花期有效,因此快速诊断直接决定穗部保护的成败。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Fusarium graminearum</a></li></ul>';

  /* ── 早疫病 (alternaria-solani) ── */
  ZH['/alternaria-solani/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_alternaria_solani.svg" alt="茄链格孢 (Alternaria solani)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>早疫病 — 茄链格孢 Alternaria solani</h1>' +
    '<p style="font-size:1.2em;color:#555">马铃薯和番茄早疫病的宏基因组诊断,监测快速进化的杀菌剂抗性</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>茄链格孢(<em>Alternaria solani</em>)是马铃薯和番茄早疫病(链格孢病)的病原。病原侵染叶片、茎和块茎,形成特征性的同心轮纹病斑,每年都降低茄科作物产量。茄链格孢是<strong>杀菌剂抗性快速进化的经典案例</strong>:2000 年代甲氧基丙烯酸酯类 (QoI) 杀菌剂引入后仅数年,抗性就在群体中扩散开来。</p>' +
    '<p>我们的流程对感病叶片组织与块茎进行<strong>纳米孔宏基因组测序</strong> (mNGS)。数小时内农艺师即可获得病原种的确认与<strong>杀菌剂抗性谱</strong> — 这对早疫病尤为重要:对抗性群体喷施甲氧基丙烯酸酯类毫无作用,只会加速抗性基因型的选择。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:马铃薯叶片/块茎匀浆、番茄叶片与果实。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 鉴定出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>Cytb</strong>(细胞色素 b)', 'F129L', '甲氧基丙烯酸酯类 / QoI(嘧菌酯、吡唑醚菌酯)'],
      ['<strong>SdhB</strong>', 'H278R、H278Y', 'SDHI(啶酰菌胺、氟唑菌酰胺)'],
      ['<strong>SdhC</strong>', 'H134R', 'SDHI(啶酰菌胺、氟唑菌酰胺)'],
      ['<strong>SdhD</strong>', 'D123E', 'SDHI(啶酰菌胺、氟唑菌酰胺)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>进化速度</strong> — 2000 年代 QoI 杀菌剂引入后,细胞色素 b 的 F129L 突变在数年内就在茄链格孢群体中扩散。</li>' +
    '<li><strong>双重威胁</strong> — 继甲氧基丙烯酸酯类之后,在选择压力下正在出现对 SDHI 杀菌剂(啶酰菌胺、氟唑菌酰胺)的抗性。</li>' +
    '<li><strong>寄主</strong> — 马铃薯和番茄等关键粮食作物;早疫病每年在所有种植区均有记录。</li>' +
    '<li><strong>抗性治理策略</strong> — 监测抗性标志物可轮换杀菌剂类别,保持药剂的有效性。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Alternaria solani</a></li></ul>';

  /* ── 灰霉病 (botrytis-cinerea) ── */
  ZH['/botrytis-cinerea/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_botrytis_cinerea.svg" alt="灰葡萄孢 (Botrytis cinerea)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>灰霉病 — 灰葡萄孢 Botrytis cinerea</h1>' +
    '<p style="font-size:1.2em;color:#555">葡萄、草莓和蔬菜灰霉病的宏基因组诊断,含全面的多药抗性谱</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>灰葡萄孢(<em>Botrytis cinerea</em>)是灰霉病的病原,可侵染<strong>200 多种植物</strong>,是葡萄和草莓在田间和储藏期的主要病原。FRAC 将灰葡萄孢列为<strong>最高抗性风险病原</strong>:多药抗性 — 同时对多个杀菌剂类别的抗性 — 在田间群体中已是常态而非例外。</p>' +
    '<p>我们的流程对感病浆果和植物组织进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原种的确认和详尽的<strong>杀菌剂抗性谱</strong>,涵盖靶标基因突变和驱动多药抗性的外排系统 (BcMrr1) 激活。没有这样的谱,灰霉病防治方案的选择就会变成试错式喷施。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:葡萄/草莓浆果匀浆、感病蔬菜组织。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>BcCYP51</strong>', '多重突变 + 启动子区串联重复', '唑类 / DMI(戊唑醇)'],
      ['<strong>BcMrr1</strong>', '激活突变(外排)', '多药抗性,包括 SDHI'],
      ['<strong>BcSdhB/C/D</strong>', 'H272R、P225L', 'SDHI(啶酰菌胺)'],
      ['<strong>β-微管蛋白</strong>', 'E198A、F200Y', '苯并咪唑类(多菌灵、苯菌灵)'],
      ['<strong>Cytb</strong>(细胞色素 b)', 'G143A', '甲氧基丙烯酸酯类 / QoI(嘧菌酯)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>极广的寄主范围</strong> — 超过 200 种植物,从葡萄、草莓到番茄和观赏作物。</li>' +
    '<li><strong>最高抗性风险</strong> — FRAC 将灰葡萄孢列为最高风险病原;对 5 个及以上杀菌剂类别具有抗性的菌株早已为人所知。</li>' +
    '<li><strong>储藏损失</strong> — 灰霉病仍是葡萄和浆果采后损失的首要原因。</li>' +
    '<li><strong>外排介导的多药抗性</strong> — BcMrr1 转运体的激活可同时赋予对多个杀菌剂类别的抗性,这是单一靶标基因无法预测的。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Botrytis cinerea</a></li></ul>';

  /* ── 腐霉根腐病与猝倒病 (pythium) ── */
  ZH['/pythium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pythium.svg" alt="腐霉属 (Pythium spp.)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>根腐病与猝倒病 — 腐霉属 Pythium spp.</h1>' +
    '<p style="font-size:1.2em;color:#555">幼苗根腐病的宏基因组鉴别诊断 — 腐霉属与丝核菌属、镰刀菌属的区分</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>腐霉属 (<em>Pythium spp.</em>) 为卵菌(并非真正的真菌)— 是幼苗和幼株根腐病与猝倒病的病原,温室和苗圃生产损失的首要原因。与所有卵菌一样,腐霉<strong>对唑类和大多数"抗真菌"杀菌剂不敏感</strong>:只有卵菌特异性药剂有效 — 精甲霜灵/甲霜灵、ethaboxam、霜霉威、氰霜唑。诊断错误就意味着使用注定无效的药剂。</p>' +
    '<p>我们的流程对幼苗根系和栽培基质进行<strong>宏基因组纳米孔测序</strong> (mNGS)。在根腐病症状相似的情况下,基质宏基因组学是在一次检测中可靠区分腐霉属与丝核菌属、镰刀菌属的唯一方法,无需多日培养。除物种鉴定外,农艺师还将获得<strong>杀菌剂抗性谱</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:幼苗与幼株根系匀浆、栽培基质、土壤洗液。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>—</strong>(多基因抗性)', '群体多态性', '精甲霜灵 / 甲霜灵(苯基酰胺类)'],
      ['<strong>CesA3</strong>(纤维素合酶)', '点突变', 'CAA 杀菌剂'],
      ['<strong>—</strong>(固有不敏感)', '缺乏靶标(麦角甾醇)', '唑类 / DMI — 对卵菌无效']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>温室与苗圃</strong> — 猝倒病暴发时可在数天内摧毁多达 100% 的幼苗。</li>' +
    '<li><strong>精甲霜灵抗性</strong> — 在常规使用苯基酰胺类的生产单位中,<em>P. irregulare</em> 和 <em>P. ultimum</em> 的抗性群体广泛存在。</li>' +
    '<li><strong>症状相似</strong> — 由腐霉属、丝核菌属和镰刀菌属引起的根腐病在视觉上无法区分,却需要不同的防治方案。</li>' +
    '<li><strong>卵菌 ≠ 真菌</strong> — 标准"抗真菌"药剂(唑类)对腐霉属无效;正确诊断可避免无效施药。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Pythium</a></li></ul>';

  /* ── 葡萄霜霉病 (plasmopara-viticola) ── */
  ZH['/plasmopara-viticola/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_plasmopara_viticola.svg" alt="葡萄生单轴霉 (Plasmopara viticola)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>葡萄霜霉病 — <em>Plasmopara viticola</em></h1>' +
    '<p style="font-size:1.2em;color:#555">葡萄霜霉病的宏基因组诊断,监测对 QoI 和 CAA 杀菌剂的抗性</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>葡萄生单轴霉(<em>Plasmopara viticola</em>)是一种卵菌、专性活体寄生菌,为葡萄霜霉病的病原 — 温带气候区葡萄栽培的首要病害。该病 1878 年从北美传入欧洲;对霜霉病的斗争催生了波尔多液 — 历史上第一种杀菌剂。作为专性寄生菌,葡萄生单轴霉无法在人工培养基上培养,这使分子诊断成为研究和监测的主要工具。</p>' +
    '<p>我们的流程对带"油斑"病斑的叶片进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原确认和<strong>杀菌剂抗性谱</strong>:欧洲群体中对甲氧基丙烯酸酯类 (QoI) 的抗性普遍存在,对 CAA 杀菌剂的抗性自 2007 年起开始出现 — 没有分子监测,葡萄园保护方案会迅速失效。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:带油斑病斑的葡萄叶片匀浆。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>Cytb</strong>(细胞色素 b)', 'G143A', '甲氧基丙烯酸酯类 / QoI(嘧菌酯)'],
      ['<strong>PvCesA3</strong>(纤维素合酶)', 'G1105S、G1105V', 'CAA 杀菌剂(双炔酰菌胺、烯酰吗啉)'],
      ['<strong>—</strong>(多基因抗性)', '群体多态性', '甲霜灵(苯基酰胺类)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>1878 年</strong> — 霜霉病从北美传入欧洲,几十年内成为欧洲葡萄栽培的首要威胁。</li>' +
    '<li><strong>波尔多液</strong> — 对霜霉病的斗争催生了农业史上第一种杀菌剂。</li>' +
    '<li><strong>QoI 抗性</strong> — G143A 突变在欧洲群体中广泛存在;不进行抗性监测,甲氧基丙烯酸酯类就会失效。</li>' +
    '<li><strong>CAA 抗性</strong> — <em>PvCesA3</em> 的突变于 2007 年前后首次被发现,此后被 FRAC 列为优先监测标志物。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Plasmopara viticola</a></li></ul>';

  /* ── 霜霉病 (peronospora) ── */
  ZH['/peronospora/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_peronospora.svg" alt="霜霉属 (Peronospora spp.)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>霜霉病 — Peronospora spp.</h1>' +
    '<p style="font-size:1.2em;color:#555">洋葱和向日葵霜霉病的宏基因组诊断,含生理小种与杀菌剂抗性监测</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>霜霉属 (<em>Peronospora spp.</em>) 为卵菌 — 专性植物寄生菌,是霜霉病的病原。该组包括 <em>P. destructor</em>(洋葱霜霉病)和 <em>Plasmopara halstedii</em>(向日葵霜霉病,同为霜霉科 Peronosporaceae 的近缘卵菌)。病原群体具有明显的<strong>生理小种结构</strong>:流行小种的组成决定哪些杂交种和品种会抗病、哪些会感病。向日葵霜霉病在俄罗斯是具有检疫意义的重要病原。</p>' +
    '<p>我们的流程对感病叶片组织进行<strong>宏基因组纳米孔测序</strong> (mNGS)。数小时内,农艺师即可获得病原确认、群体小种组成评估和<strong>杀菌剂抗性谱</strong> — 这些数据既是保护当季作物所需,也是选育抗病杂交种所需。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:向日葵/洋葱叶片匀浆。</li>' +
    '<li><strong>📤 输出:</strong> 面向农艺师的 HTML 报告 — 检出的病原、定量丰度、杀菌剂抗性谱与防治建议。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 杀菌剂抗性标志物</h2>' +
    tbl(['基因', '突变', '杀菌剂(类别)'], [
      ['<strong>—</strong>(多基因抗性)', '群体多态性', '甲霜灵 / 精甲霜灵(苯基酰胺类)'],
      ['<strong>CesA3</strong>(纤维素合酶)', '点突变', 'CAA 杀菌剂(双炔酰菌胺)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>检疫意义</strong> — 向日葵霜霉病 (<em>P. halstedii</em>) 在俄罗斯是具有检疫意义的病原;受侵染的种子批次须接受管制。</li>' +
    '<li><strong>小种结构</strong> — <em>P. halstedii</em> 的抗甲霜灵小种早已为人所知;小种监测对选育抗病向日葵杂交种必不可少。</li>' +
    '<li><strong>专性寄生菌</strong> — 这些病原无法在人工培养基上培养;宏基因组学是其鉴定与分型的主要方法。</li>' +
    '<li><strong>洋葱作物</strong> — <em>P. destructor</em> 引起洋葱的系统性侵染,并使侵染在种植材料中长期存在。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.frac.info/">FRAC — 杀菌剂抗性行动委员会</a></li>' +
    '<li>📄 <a href="http://www.phi-base.org/">PHI-base — 病原-宿主互作数据库</a></li>' +
    '<li>📄 <a href="https://unite.ut.ee/">UNITE — 真菌与卵菌 ITS 条形码数据库</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — Peronospora</a></li></ul>';

  /* ── DNA 法医画像 (identikit) ── */
  ZH['/identikit/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_identikit.svg" alt="法医 DNA 表型分型" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>法医 DNA 表型分型 — 来自犯罪现场的 DNA 画像</h1>' +
    '<p style="font-size:1.2em;color:#555">从微量 DNA 预测眼睛、头发、肤色、生物地理祖源与年龄 — 就在犯罪现场</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>法医 DNA 表型分型 (Forensic DNA Phenotyping, FDP)</strong> 是法医基因组学的一个分支,可从生物痕迹(血液、唾液、毛囊、上皮细胞)生成未知个体的外貌描述 — 无需数据库中已有 DNA 分型。</p>' +
    '<p>与传统 DNA 分型(用于数据库比对的 STR 分析)不同,FDP <strong>从无到有地创建描述</strong>:即使没有嫌疑人,侦查人员也能获得概率性的表型画像。我们的流程运行于 OnSiteSeq Edge,在现场或移动实验室内完成分析,无需将遗传数据传输到云端。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP) 后的原始 <code>FASTQ</code> 数据。样本:物证上的血液、唾液、毛囊、上皮细胞。</li>' +
    '<li><strong>📤 输出:</strong> 面向侦查人员的 PDF/HTML 报告 — 每项特征带置信区间的概率性表型画像;含标志物覆盖度数据的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🔍 可判定的特征</h2>' +
    tbl(['特征', '方法', '准确度'], [
      ['<strong>眼睛颜色</strong>', 'HIrisPlex-S(41 个 SNP)', 'AUC >0.95(蓝色 vs 棕色)'],
      ['<strong>头发颜色</strong>', 'HIrisPlex-S', 'AUC ~0.89(黑/深色 vs 浅色 vs 红色)'],
      ['<strong>肤色</strong>', 'HIrisPlex-S(FST 1–6 量表)', '灵敏度 ~80%'],
      ['<strong>生物地理祖源</strong>', 'AIMs 面板 + PCA', '洲级准确度 >95%;亚群体 ~80%'],
      ['<strong>生物学年龄</strong>', '表观遗传时钟(DNA 甲基化)', '误差 ±3–5 岁'],
      ['<strong>生物学性别</strong>', '牙釉质蛋白基因 (AMEL X/Y)', '覆盖度足够时 100%'],
      ['<strong>亲缘关系</strong>', 'IBD 片段分析(低深度 WGS + 约 60 万 SNP 填补)', '1–3 级亲缘(侦查系谱学)']
    ]) + '<hr>' +
    '<h2>🎯 关键 SNP 标志物与基因</h2>' +
    '<h3>HIrisPlex-S 系统(眼睛、头发、肤色)</h3>' +
    tbl(['基因', '关键 SNP', '性状'], [
      ['<strong>HERC2 / OCA2</strong>', 'rs12913832', '蓝/棕色眼睛的主要开关'],
      ['<strong>SLC45A2</strong>', 'rs16891982', '肤色与发色(欧洲人浅肤色)'],
      ['<strong>SLC24A4</strong>', 'rs12896399', '蓝/绿色眼睛色调'],
      ['<strong>MC1R</strong>', 'rs1805007、rs1805008', '红发、雀斑'],
      ['<strong>IRF4</strong>', 'rs12203592', '浅色头发、蓝眼睛'],
      ['<strong>TYR</strong>', 'rs1042602', '皮肤色素沉着'],
      ['<strong>KITLG</strong>', 'rs12821256', '浅色头发']
    ]) +
    '<h3>mtDNA 与 Y 染色体单倍群</h3>' +
    '<p>长读长纳米孔读段覆盖整个线粒体基因组和 Y 染色体的决定性区域,可实现单亲谱系归属:</p>' +
    tbl(['标志物', '谱系', '侦查价值'], [
      ['<strong>线粒体 DNA (mtDNA)</strong>', '母系', '单倍群 (H、U、T、J、K 等) — 缩小搜索范围;对核 DNA 含量低的降解样本有用'],
      ['<strong>Y 染色体 (Y-SNP)</strong>', '父系', '单倍群 (R1a、R1b、N、I 等) — 将搜索缩小到某一男性谱系'],
      ['<strong>Y-STR</strong>', '父系', '与经典 Y-STR 数据库兼容']
    ]) +
    '<p>单倍群不能直接识别个体,但可大幅缩小搜索空间,并用于侦查系谱学中的谱系排除。</p>' +
    '<h3>表观遗传年龄</h3>' +
    tbl(['模型', '标志物', '适用范围'], [
      ['<strong>Horvath 时钟</strong>', '353 个 CpG 位点', '通用 — 所有组织'],
      ['<strong>Hannum 时钟</strong>', '71 个 CpG 位点', '血液'],
      ['<strong>DNAmAge(血液/唾液)</strong>', '>800 个 CpG', '法医应用中最准确']
    ]) + '<hr>' +
    '<h2>🆚 FDP 在法医方法中的定位</h2>' +
    tbl(['方法', '提供什么', '何时使用'], [
      ['<strong>STR 分型(CODIS/国家数据库)</strong>', '数据库身份识别', '已有嫌疑人或分型已入库;FDP 不能替代 STR'],
      ['<strong>FDP(HIrisPlex-S + AIMs)</strong>', '概率性外貌画像', '数据库无匹配、无嫌疑人 — 需要描述来指导搜索'],
      ['<strong>纳米孔 WGS(低覆盖度)</strong>', '单倍群、亲缘关系、完整 SNP 谱', '侦查系谱学、复杂混合样本、身份不明遗骸']
    ]) +
    '<p>FDP 是对经典 STR 分析的补充而非替代:画像指导侦查方向,但法律上的身份确认仍来自 STR 分型比对。</p><hr>' +
    '<h2>⚠️ 局限与边界</h2>' +
    '<ul><li><strong>DNA 混合样本</strong> — 痕迹来自 2 名及以上供者时,只有先进行混合物拆分才能构建画像;供者比例差于 1:10 时,次要组分的解读不可靠。</li>' +
    '<li><strong>低模板 DNA (LT-DNA)</strong> — DNA 低于 ~100 pg 时可能出现等位基因丢失;报告必须注明每个标志物的覆盖度。</li>' +
    '<li><strong>降解 DNA</strong> — 片段低于 150 bp 对扩增子方案是关键问题;长读长纳米孔读段通过 WGS 方法可部分补偿。</li>' +
    '<li><strong>概率性质</strong> — FDP 输出的是带概率的类别(如"棕色眼睛,P=0.87"),而非照片;结果是侦查情报,而非证据。</li>' +
    '<li><strong>群体校准</strong> — 模型基于特定队列训练;对混合祖源群体误差更高,报告中会相应注明。</li></ul><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq FDP Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>HIrisPlex-Nano</strong>', '基于 HIrisPlex-S 标志物纳米孔读段的 EVC 预测'],
      ['<strong>AIM-Classifier</strong>', '生物地理祖源分类(RF + NN 集成)'],
      ['<strong>EpiAge-Nano</strong>', '基于纳米孔数据 CpG 甲基化的生物学年龄估计']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>(针对降解 DNA 的设置)'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(参考:GRCh38/hg38)'],
      ['<strong>3. SNP 基因分型</strong>', '<code>clair3</code>、<code>medaka</code>(目标:HIrisPlex-S 与 AIMs 位点)'],
      ['<strong>4. 甲基化检测</strong>', '<code>modkit</code>(来自天然 DNA 的 Nanopore 5mC 模式)'],
      ['<strong>5. 性别(牙釉质蛋白基因)</strong>', '自定义 AMEL X/Y 覆盖度脚本'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>scikit-learn</code>(HIrisPlex-S 模型 + AIM 分类器)']
    ]) + '<hr>' +
    '<h2>⚖️ 法律与伦理背景</h2>' +
    tbl(['方面', '规范框架'], [
      ['<strong>法律依据(俄罗斯)</strong>', '联邦法第 73 号《国家司法鉴定活动法》;联邦法第 144 号《侦查行动法》'],
      ['<strong>基因组数据库</strong>', '联邦 DNA 数据库 (FDBD) — 由俄罗斯内务部(法医中心)维护'],
      ['<strong>个人数据</strong>', '联邦法第 152 号;生物识别数据属特殊类别'],
      ['<strong>国际标准</strong>', 'ENFSI DNA 工作组;ISO/IEC 17025'],
      ['<strong>概率性解读</strong>', '所有 FDP 结果均为<strong>概率性</strong>而非确定性。用于指导侦查 — 不作为证据']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>荷兰 (Erasmus MC)</strong> — HIrisPlex-S 系统的开发者;FDP 已在欧洲、澳大利亚、美国的刑事侦查中应用。</li>' +
    '<li><strong>俄罗斯</strong> — 内务部运营的联邦 DNA 数据库 (FDBD) 已建立;移动 DNA 实验室与现场痕迹分析是执法部门积极关注的方向。</li>' +
    '<li><strong>侦查系谱学</strong> — 通过基因组数据库寻找未知人员亲属的方法(如美国"金州杀手"案)。在俄罗斯需要单独的法律规定。</li></ul><hr>' +
    '<h2>🗺 路线图</h2>' +
    '<ul><li><strong>生成式面部重建</strong> — 从类别性状迈向基于全基因组数据的合成面部画像(Parabon Snapshot 类方案)。</li>' +
    '<li><strong>基于 ML 的混合物拆分</strong> — 从宏基因组痕迹中自动分离 2–3 名供者的分型。</li>' +
    '<li><strong>FDBD 集成</strong> — 将从纳米孔数据获得的 STR 分型与联邦数据库自动比对。</li>' +
    '<li><strong>ISO/IEC 17025 验证</strong> — 实验室间比对与方法认证,以用于法医实践。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://hirisplex.erasmusmc.nl/">HIrisPlex-S — 在线 EVC 预测系统 (Erasmus MC)</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=HIrisPlex-S+system+eye+hair+skin">HIrisPlex-S — 原始论文 (PubMed)</a></li>' +
    '<li>📄 <a href="https://www.visage-h2020.eu/">VISAGE — 欧盟基因组外貌重建联盟</a></li>' +
    '<li>📄 <a href="https://enfsi.eu/working-groups/dna/">ENFSI DNA 工作组 — 法医基因组学标准</a></li>' +
    '<li>📄 <a href="https://www.internationalgenome.org/">1000 Genomes Project(千人基因组计划)</a></li>' +
    '<li>📄 <a href="https://www.hagsc.org/hgdp/">HGDP — 人类基因组多样性计划</a></li></ul>';

  /* ── EDGE 床旁测序一体机 ── */
  ZH['/edge/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Edge(床旁测序一体机)</h1>' +
    '<p style="font-size:1.2em;color:#555">用于床旁测序的自主软硬件一体化系统</p></div><hr>' +
    '<h2>📋 产品介绍</h2>' +
    '<p>OnSiteSeq Edge 是一套用于床旁测序的自主软硬件一体化系统 (HSC)。从 FASTQ 到临床结论,就在患者床旁或医生办公桌上完成。可用于野外、偏远极地地区,以及任何无法长期接入实验室设备或服务器基础设施的场所。</p><hr>' +
    '<h2>🔧 关键技术参数</h2>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'arm64'],
      ['<strong>GPU 模块</strong>', 'Nvidia Jetson AGX'],
      ['<strong>测序仪</strong>', 'Nanoporus(俄罗斯)'],
      ['<strong>交互界面</strong>', '触摸屏'],
      ['<strong>打印</strong>', '内置热敏打印机'],
      ['<strong>通信</strong>', '内置 Wi-Fi/4G 通信模块'],
      ['<strong>存储</strong>', '内置大容量 NVMe SSD'],
      ['<strong>容器镜像仓库</strong>', 'harbor.onsiteseq.io(arm64 Docker 镜像)']
    ]) + '<hr>' +
    '<h2>⚙️ 功能</h2>' +
    '<ul><li>内置样本制备工具</li>' +
    '<li>从内置 Nanoporus 测序仪采集数据</li>' +
    '<li>由 Nvidia Jetson AGX GPU 模块进行数据处理</li>' +
    '<li>在内置热敏打印机上打印临床与生物信息学报告</li>' +
    '<li>OnSiteSeq Cockpit 流程管理系统 — 适配触摸屏的 Edge 版本</li>' +
    '<li>开放架构 — 持续更新的 arm64 容器应用市场</li></ul><hr>' +
    '<h2>📷 硬件组成</h2>' +
    '<p><img src="/assets/images/photo/nvidia_xavier_agx/view.png" alt="OnSiteSeq Edge — 硬件"></p>' +
    '<p><strong>(A)</strong> Flongle 测序芯片盒 &nbsp; <strong>(B)</strong> Nanoporus 纳米孔 NGS 测序仪 &nbsp; <strong>(C)</strong> 触摸屏 &nbsp; <strong>(D)</strong> 注射式分液器 &nbsp; <strong>(E)</strong> Wi-Fi/4G 通信模块 &nbsp; <strong>(F)</strong> 基于 Nvidia Jetson AGX 的 CPU/GPU &nbsp; <strong>(G)</strong> 扩增仪 &nbsp; <strong>(H)</strong> 热敏打印机</p><hr>' +
    '<h2>🔬 工作流程</h2>' +
    '<p><img src="/assets/images/photo/nvidia_xavier_agx/onsiteseq_diagramm.png" alt="OnSiteSeq Edge 工作流程图"></p>' +
    '<ol><li><strong>样本制备</strong></li>' +
    '<li><strong>扩增</strong>:使用莫斯科物理技术学院 (MIPT) 的 YourPCR 扩增仪 <strong>(G)</strong></li>' +
    '<li><strong>样本加载</strong>:通过分液器 <strong>(D)</strong> 将样本注入连接 Nanoporus 测序仪 <strong>(B)</strong> 的 Flongle 测序芯片 <strong>(A)</strong></li>' +
    '<li><strong>启动测序</strong>:在 MinKNOW 中启动运行</li>' +
    '<li><strong>碱基识别 (Basecalling)</strong>:在 Dorado 中生成原始读段文件(<code>fastq.gz</code>)</li>' +
    '<li><strong>启动分析流程</strong>:在 OnSiteSeq Cockpit 中启动,利用 Nvidia Jetson AGX <strong>(F)</strong> 进行 GPGPU 计算</li>' +
    '<li><strong>查看报告</strong>:在内置屏幕 <strong>(C)</strong> 上查看临床与生物信息学报告</li>' +
    '<li><strong>打印报告</strong>:在内置热敏打印机 <strong>(H)</strong> 上打印</li></ol><hr>' +
    '<h2>📦 分析流程</h2>' +
    '<p>生物信息学工具通过 <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> 以 arm64 Docker 容器形式分发。目前已提供:</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — 结核病</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>更多解决方案将持续加入。</p>';

  /* ── DESKTOP 医生工作站 ── */
  ZH['/desktop/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Desktop(医生工作站)</h1>' +
    '<p style="font-size:1.2em;color:#555">面向工作站的生物信息学流程管理系统</p></div><hr>' +
    '<h2>📋 产品介绍</h2>' +
    '<p>OnSiteSeq Desktop 是 OnSiteSeq Cockpit 生物信息学流程管理系统的工作站版本,适配医生或研究人员的计算机。可与 OnSiteSeq Edge 配套使用,也可处理其他设备产生的数据。</p><hr>' +
    '<h2>🔧 关键技术参数</h2>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'x86'],
      ['<strong>目标设备</strong>', '工作站'],
      ['<strong>容器镜像仓库</strong>', 'harbor.onsiteseq.io(x86 Docker 镜像)']
    ]) + '<hr>' +
    '<h2>⚙️ 功能</h2>' +
    '<ul><li>通过 Cockpit Web 界面管理分析流程</li>' +
    '<li>可与 OnSiteSeq Edge 配套使用,也可独立运行</li>' +
    '<li>持续更新的 x86 容器应用市场</li>' +
    '<li>支持来自任何测序设备的 FASTQ 数据</li></ul><hr>' +
    '<h2>📦 分析流程</h2>' +
    '<p>生物信息学工具通过 <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> 以 x86 Docker 容器形式分发。</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — 结核病</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>更多解决方案将持续加入。</p>';

  /* ── CLOUD 云端版 ── */
  ZH['/cloud/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Cloud(云端版)</h1>' +
    '<p style="font-size:1.2em;color:#555">云端生物信息学流程管理系统</p></div><hr>' +
    '<h2>📋 产品介绍</h2>' +
    '<p>OnSiteSeq Cloud 是 OnSiteSeq Cockpit 流程管理系统的云端版本,适配云服务商环境。访问地址:<a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a>。</p><hr>' +
    '<h2>🔧 关键技术参数</h2>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'x86'],
      ['<strong>访问地址</strong>', 'cloud.onsiteseq.io'],
      ['<strong>容器镜像仓库</strong>', 'harbor.onsiteseq.io(x86 Docker 镜像)']
    ]) + '<hr>' +
    '<h2>⚙️ 功能</h2>' +
    '<ul><li>通过浏览器启动分析 — 无需安装任何软件</li>' +
    '<li>面向云服务商的可扩展架构</li>' +
    '<li>持续更新的 x86 容器应用市场</li>' +
    '<li>支持来自任何设备的 FASTQ 数据</li></ul><hr>' +
    '<h2>🔗 进入云端</h2>' +
    '<p><a href="https://cloud.onsiteseq.io">→ cloud.onsiteseq.io</a></p><hr>' +
    '<h2>📦 分析流程</h2>' +
    '<p>生物信息学工具通过 <a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> 以 x86 Docker 容器形式分发。</p>' +
    '<ul><li><a href="/tuberculosis/">OnSiteSeq TUB — 结核病</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1</a></li></ul>' +
    '<p>更多解决方案将持续加入。</p>';

  /* ── COCKPIT 流程管理平台 ── */
  ZH['/cockpit/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<h1>OnSiteSeq Cockpit(流程管理平台)</h1>' +
    '<p style="font-size:1.2em;color:#555">用于管理 Snakemake 生物信息学流程的 Web 应用</p></div><hr>' +
    '<h2>📋 产品介绍</h2>' +
    '<p>OnSiteSeq Cockpit 是用于管理容器化 Snakemake 生物信息学流程的 Web 应用。在浏览器中启动分析:从 Harbor 目录中选择流程,指定输入的 <code>.fastq.gz</code> 样本,即可获得临床报告与质控 (QC) 报告 — 全程无需命令行。</p><hr>' +
    '<h2>🖥 部署形态</h2>' +
    '<h3>Edge</h3><p>面向 OnSiteSeq Edge 软硬件一体机的版本。界面适配触摸屏操作。流程以 <strong>arm64</strong> Docker 容器形式通过 <code>harbor.onsiteseq.io</code> 分发。</p>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'arm64'],
      ['<strong>目标设备</strong>', 'Nvidia Jetson AGX'],
      ['<strong>容器</strong>', 'arm64 Docker 镜像']
    ]) +
    '<h3>Desktop</h3><p>面向医生或研究人员工作站的版本。可独立运行,也可与 OnSiteSeq Edge 配套使用。</p>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'x86'],
      ['<strong>目标设备</strong>', '工作站'],
      ['<strong>容器</strong>', 'x86 Docker 镜像']
    ]) +
    '<h3>Cloud</h3><p>适配云服务商环境的版本。访问地址:<a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a>。</p>' +
    tbl(['参数', '数值'], [
      ['<strong>架构</strong>', 'x86'],
      ['<strong>访问地址</strong>', 'cloud.onsiteseq.io'],
      ['<strong>容器</strong>', 'x86 Docker 镜像']
    ]) + '<hr>' +
    '<h2>⚙️ 技术栈</h2>' +
    tbl(['层级', '技术'], [
      ['<strong>前端</strong>', 'Vue 3 + Vite + Pinia + Axios'],
      ['<strong>后端</strong>', 'Python 3.12 + FastAPI + SQLAlchemy async'],
      ['<strong>数据库</strong>', 'PostgreSQL 16(asyncpg 驱动)'],
      ['<strong>数据库迁移</strong>', 'Alembic(异步)'],
      ['<strong>镜像仓库</strong>', 'Harbor Registry (harbor.onsiteseq.io)'],
      ['<strong>编排</strong>', 'Docker Compose v2'],
      ['<strong>前端 Web 服务器</strong>', 'Nginx(Vite 构建的静态资源)']
    ]) + '<hr>' +
    '<h2>📸 界面截图</h2>' +
    '<h3>流程目录</h3><p>可用流程卡片,带有标签、兼容性状态(Edge / Cockpit / Cloud)和启动按钮。一键与 <code>harbor.onsiteseq.io</code> 同步目录。</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_view.jpg" alt="OnSiteSeq Cockpit 流程目录"></p><hr>' +
    '<h3>启动分析</h3><p>选择流程、运行名称和输入的 <code>.fastq.gz</code> 样本。系统自动从数据文件夹中检测文件。</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_run2.jpg" alt="流程启动表单"></p><hr>' +
    '<h3>结果:临床报告与 QC 报告</h3><p>运行完成后,Cockpit 会显示 Snakemake 各步骤的进度和已生成的报告列表:临床报告(面向医生)和 QC 报告(面向生物信息学专家)。</p>' +
    '<p><img src="/assets/images/cockpit/cockpit_run6.jpg" alt="运行结果与报告"></p><hr>' +
    '<h2>🔗 相关组件</h2>' +
    '<ul><li><a href="https://harbor.onsiteseq.io">OnSiteSeq Harbor</a> — Docker 镜像仓库</li>' +
    '<li><a href="/aboutonsiteseq/">OnSiteSeq Edge</a> — 软硬件一体化系统</li>' +
    '<li><a href="/tuberculosis/">OnSiteSeq TUB — 结核病流程</a></li>' +
    '<li><a href="/hiv/">OnSiteSeq HIV — HIV-1 流程</a></li></ul>';

  /* ── CONTACT 联系我们 ── */
  ZH['/contact/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem"><h1>联系我们</h1></div><hr>' +
    '<h2>📬 联系方式</h2>' +
    '<ul><li><strong>Telegram:</strong> <a href="https://t.me/gorbenkoteh">t.me/gorbenkoteh</a></li>' +
    '<li><strong>电子邮箱:</strong> gorbenko.ra@phystech.edu</li></ul>' +
    '<h2>📬 更多信息</h2>' +
    '<ul><li><strong>Dzen(博客、视频、新闻):</strong> <a href="https://dzen.ru/intermsofbioinformatics">dzen.ru/intermsofbioinformatics</a></li>' +
    '<li><strong>云端版本:</strong> <a href="https://cloud.onsiteseq.io">cloud.onsiteseq.io</a></li>' +
    '<li><strong>容器化流程仓库:</strong> <a href="https://harbor.onsiteseq.io">harbor.onsiteseq.io</a></li></ul><hr>';

  /* ── ABOUT 关于平台 ── */
  ZH['/aboutonsiteseq'] =
    '<h1>关于平台</h1><hr>' +
    '<h2>OnSiteSeq Edge(床旁测序一体机)</h2>' +
    '<p>自主软硬件一体化系统 (HSC)。从 FASTQ 到临床结论,就在患者床旁或医生办公桌上完成。可用于野外、偏远极地地区等场景。</p>' +
    '<p>内置样本制备工具。数据由内置 Nanoporus 测序仪采集,由 Nvidia Jetson AGX GPU 模块处理。可在内置热敏打印机上打印临床与生物信息学报告。</p>' +
    '<p>OnSiteSeq Cockpit 生物信息学容器管理系统已适配触摸屏操作。生物信息学工具通过 OnSiteSeq Harbor 以 arm64 Docker 容器形式分发,所有工具均针对 arm64 架构和 GPGPU 计算进行了适配。开放架构,持续更新的 arm64 容器应用市场。</p>' +
    '<p><a href="/edge/">了解更多 — OnSiteSeq Edge →</a></p><hr>' +
    '<h2>OnSiteSeq Desktop(医生工作站)</h2>' +
    '<p>OnSiteSeq Cockpit 生物信息学容器管理系统的工作站版本,适配医生或研究人员的计算机。可与 OnSiteSeq Edge 配套使用,也可处理其他设备产生的数据。生物信息学工具通过 OnSiteSeq Harbor 以 x86 Docker 容器形式分发,持续更新的 x86 容器应用市场。</p>' +
    '<p><a href="/desktop/">了解更多 — OnSiteSeq Desktop →</a></p><hr>' +
    '<h2>OnSiteSeq Cloud(云端版)</h2>' +
    '<p>OnSiteSeq Cockpit 生物信息学容器管理系统的云端版本,适配云服务商环境。可与 OnSiteSeq Edge 配套使用,也可处理其他设备产生的数据。生物信息学工具通过 OnSiteSeq Harbor 以 x86 Docker 容器形式分发,持续更新的 x86 容器应用市场。</p>' +
    '<p><a href="/cloud/">了解更多 — OnSiteSeq Cloud →</a></p>';

  /* ── MFTI 莫斯科物理技术学院 ── */
  ZH['/mfti'] =
    '<h1>莫斯科物理技术学院 (MIPT) — 创新的摇篮</h1>' +
    '<div style="text-align:center;margin-bottom:2rem"><img src="/assets/images/mfti/mfti.png" alt="莫斯科物理技术学院" style="max-width:100%;border-radius:8px;"></div>' +
    '<h2>项目诞生于 MIPT</h2>' +
    '<p><strong>OnSiteSeq</strong> 是在莫斯科物理技术学院 (MIPT,即 Phystech) 孵化的医疗科技 (medtech) 初创项目。这套基于纳米孔测序、自研容器化流程和机器学习模型的传染病基因组监测软硬件一体化系统,是在 "Pusk"(启动)中心的支持和科学导师 <strong>Nikita Sergeyevich Radchenko</strong>(尼基塔·谢尔盖耶维奇·拉德琴科)的指导下创建的。</p><hr>' +
    '<h2>📰 OnSiteSeq 新闻稿</h2>' +
    '<h3>MIPT 研究人员研发出用于 HIV-1 耐药性与亚型诊断的国产机器学习模型</h3>' +
    '<p>研究生 <strong>Roman Gorbenko</strong>(罗曼·戈尔边科,<a href="https://habr.com/ru/users/romangorbenko/articles/">Habr 主页</a>)与其科学导师 <strong>Nikita Radchenko</strong>(尼基塔·拉德琴科)研发了用于 HIV-1 耐药性与亚型诊断的国产机器学习模型。</p>' +
    '<p>核心成果是实现了两个国外平台的国产化替代:美国 <strong>斯坦福 HIV 耐药数据库 (HIVDB)</strong> 和欧洲网络服务 <strong>COMET</strong>(卢森堡健康研究所)。直到不久前,俄罗斯研究人员仍在无可替代地使用这些平台。</p>' +
    '<p>在 <strong>俄罗斯消费者权益保护局中央流行病学研究所 (CRIFEM Rospotrebnadzor)</strong> 提供的数据集上进行的外部验证显示,平均 <strong>AUC = 0.990</strong> — 达到了诊断应用所需的临床显著准确度。研发的机器学习模型已在全周期生物信息学流程(从原始基因组读段到临床报告)中完成测试,并部署在专门研发的软硬件一体化系统 <strong><a href="https://onsiteseq.io/edge/">OnSiteSeq Edge</a></strong> 上。</p><hr>' +
    '<h2>🔬 MIPT 的其他创新成果</h2>' +
    '<p>Phystech 在科技前沿积极开展研究。近期部分成果:</p>' +
    '<p><strong><a href="https://mipt.ru/news/v-mfti-uskorili-modelirovanie-vzryva-atomnogo-yadra-">MIPT 加速原子核爆炸模拟</a></strong><br>数值模拟核过程的新方法,显著提升计算速度。</p>' +
    '<p><strong><a href="https://www.cnews.ru/news/line/2025-07-30_inzhenery_mfti_podgotovili">MIPT 工程师研制出海洋地震勘探进口替代控制系统</a></strong><br>海洋地质勘探国外控制系统的国产化替代方案。</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855092/">MIPT 为石油与黄金勘探者研发出不受进口限制的软件</a></strong><br>不依赖国外厂商的地质数据解译软件。</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855038/">类脑计算机研发取得进展:俄罗斯科学家研制出柔性人工突触</a></strong><br>类脑计算领域的突破 — 基于新材料的柔性突触。</p>' +
    '<p><strong><a href="https://habr.com/ru/companies/mipt/articles/855084/">MIPT 研制的 5G 射频模块组件成功通过测试</a></strong><br>国产 5G 射频模块完成完整测试周期,确认符合标准。</p>';

  /* ── CITATION 引用本研究 ── */
  ZH['/citation'] =
    '<h2>引用 OnSiteSeq</h2>' +
    '<h3>📕 被 RSCI(俄罗斯科学引文索引) 收录的论文 —— BioMLOps 术语正式进入科学文献</h3>' +
    '<p><strong>Gorbenko R. A.</strong>《生物医学应用中机器学习模型生命周期管理方法论:基于 HIV-1 耐药性数据的研究》//《青年与现代信息技术》:第 23 届国际学生、研究生与青年学者科学实践大会论文集(托木斯克,2026 年 2 月 18–20 日)。—— 托木斯克:托木斯克理工大学,2026 年,第 370–375 页。</p>' +
    '<p>✅ <strong>该论文已被 RSCI 收录</strong>(eLIBRARY ID: 91848892,EDN: WETXLG)。</p>' +
    '<p>本文<strong>首次提出 BioMLOps 术语</strong>——将 MLOps 方法论引入计算生物学:可管理的模型生命周期(从 CNN + Self-Attention 架构选择到基于标准数据的指标持续监控)、带回归测试的实验自动版本化,以及在外部数据库(Stanford HIVDB)更新时触发的再训练流程,可自动检测模型性能退化。该方法已在 HIV-1-Resist-Rus 系统上得到验证;代码与模型权重已在 GitVerse 开源。</p>' +
    '<p>🔗 <a href="https://www.elibrary.ru/item.asp?id=91848892&pff=1">https://www.elibrary.ru/item.asp?id=91848892</a></p>' +
    '<hr>' +
    '<img src="/assets/images/publication/mnsk_1.JPG" alt="MNSK-2026 论文集封面" style="max-width:260px; float:right; margin:0 0 1.5rem 2rem; border-radius:6px; box-shadow:0 2px 14px rgba(0,0,0,0.18);">' +
    '<p>HIV-1-M-Env-Rus 方法发表于第 64 届国际学生科学大会 (ISSC-2026) 论文集,新西伯利亚国立大学 (NSU),2026 年,第 155 页。</p>' +
    '<p>🔗 <a href="https://www.nsu.ru/n/issc/collection/">https://www.nsu.ru/n/issc/collection/</a></p>' +
    '<hr>' +
    '<p>Gorbenko R. A.《基于 OnSiteSeq 软硬件一体化系统的 HIV-1 耐药性判定与亚型分类》// 第 68 届 MIPT 全俄科学大会("生物与医学物理"分会),2026 年。</p>' +
    '<p>🔗 <a href="https://conf.mipt.ru/page/conference-materials">https://conf.mipt.ru/page/conference-materials</a></p>';

  /* ── RUWIKI ── */
  ZH['/ruwiki'] =
    '<h1>RuWiki 百科</h1>' +
    '<h2>网站内容 = RuWiki 百科条目</h2>' +
    '<p>我们认为发展俄语百科全书 RuWiki 十分重要,并积极为其贡献内容。</p>';

  /* ── NORMATIV 法规与创新医疗 ── */
  ZH['/normativ'] =
    '<h1>支持创新与个体化医疗的法规</h1>' +
    '<h2>监管框架</h2>' +
    '<p><strong>俄罗斯:</strong> <a href="http://www.kremlin.ru/acts/bank/50358">第 145 号总统令《俄罗斯联邦科学技术发展战略》</a></p>' +
    '<p><strong>国际社会:</strong> <a href="https://news.un.org/en/story/2024/09/1154891">联合国战略:隐形杀手 — 什么是抗微生物药物耐药性?</a></p>';

  /* ── GxP / GLP / ALCOA+ 标准 ── */
  ZH['/gxp'] =
    '<h1>GxP:质量保障的"良好规范"标准</h1>' +
    '<p>在 OnSiteSeq 的开发中,我们严格遵循国际 GxP 标准,确保从样本采集到临床结论的所有环节的质量与数据完整性。</p><hr>' +
    '<h2>什么是 GxP</h2>' +
    '<p><strong>GxP</strong> 是"良好 X 规范"标准族的统称,用于规范医疗与制药行业的质量:</p>' +
    tbl(['标准', '全称', '适用领域'], [
      ['<strong>GMP</strong>', 'Good Manufacturing Practice(良好生产规范)', '医疗器械生产'],
      ['<strong>GLP</strong>', 'Good Laboratory Practice(良好实验室规范)', '实验室研究'],
      ['<strong>GCP</strong>', 'Good Clinical Practice(良好临床规范)', '临床试验'],
      ['<strong>GDP</strong>', 'Good Distribution Practice(良好流通规范)', '流通分销']
    ]) + '<hr>' +
    '<h2>ALCOA+ 与 OnSiteSeq</h2>' +
    '<p><strong>ALCOA+</strong> 是制药与医疗行业采用的一套数据完整性原则。它确保数据在其生命周期的任何阶段都可靠、真实且可核查。</p>' +
    '<h3>A — Attributable(可追溯至人)</h3><p><em>谁执行了分析?哪个算法产生了结果?</em></p>' +
    '<ul><li><strong>设备授权。</strong>使用触摸屏时,医务人员在启动前须完成授权,日志会准确记录流程的启动者。</li>' +
    '<li><strong>流程、工具与模型版本管理。</strong>OnSiteSeq 生物信息学报告包含所有组件的版本:自研流程、机器学习模型及依赖工具 — 严格遵循可追溯原则。</li></ul>' +
    '<h3>L — Legible(清晰可读)</h3><p><em>多年以后,医生和审计人员还能读懂这些数据吗?</em></p>' +
    '<ul><li><strong>双报告体系。</strong>结果分为面向临床医生的<strong>临床报告</strong>和面向专业人员的<strong>生物信息学 QC 报告</strong>。</li>' +
    '<li><strong>纸质与数字副本。</strong>内置热敏打印机保证现场即时可读;数字 PDF 副本以清晰的文件命名规范保存在 SSD 上。</li></ul>' +
    '<h3>C — Contemporaneous(同步记录)</h3><p><em>数据是否在产生的那一刻即被记录?</em></p>' +
    '<ul><li><strong>时间戳。</strong>所有阶段 — 从 GPU 碱基识别到报告输出 — 均实时记录日志。</li>' +
    '<li><strong>时间同步。</strong>由于 OnSiteSeq Edge 可在野外自主运行,内部时钟不允许用户手动更改;联网时通过 Wi-Fi/4G 模块自动同步。</li></ul>' +
    '<h3>O — Original(原始性)</h3><p><em>原始数据是否得到保存?</em></p>' +
    '<ul><li><strong>信号保存。</strong>在 Dorado 机器学习模型将纳米孔电信号转换为核苷酸之前,系统会将原始数据(POD5/FAST5 格式)保存到 SSD。</li>' +
    '<li><strong>不可变性。</strong>原始读段在基因组组装和分析过程中永远不会被覆盖。</li></ul>' +
    '<h3>A — Accurate(准确性)</h3><p><em>数据是否可靠?是否有质量控制?</em></p>' +
    '<ul><li><strong>QC 指标。</strong>生物信息学报告包含关键指标:基因组覆盖度百分比、平均测序深度和盲区。</li>' +
    '<li><strong>AI 置信度。</strong>临床报告显示神经网络的置信度百分比(例如 B 亚型为 99.98%),医生可据此评估预测的可靠性。</li></ul>' +
    '<h3>+(Plus,补充原则)</h3>' +
    tbl(['原则', '在 OnSiteSeq 中的实现'], [
      ['<strong>Complete(完整性)</strong>', 'OnSiteSeq Cockpit 保存所有运行日志,包括中断或失败的运行(覆盖度 <80% 时状态标记为 "FAIL")'],
      ['<strong>Consistent(一致性)</strong>', '严格的工作流:扩增和测序在硬件层面完成之前,分析流程无法启动']
    ]) + '<hr>' +
    '<h2>俄罗斯与国际标准</h2>' +
    tbl(['标准', '领域'], [
      ['<strong>ISO 13485</strong>', '医疗器械质量管理体系'],
      ['<strong>ISO 14971</strong>', '医疗器械风险管理'],
      ['<strong>GOST R 52600</strong>', '医疗器械(俄罗斯国家标准)'],
      ['<strong>第 61 号联邦法</strong>', '药品流通']
    ]);

  /* ── SBER / GITVERSE 仓库与 CI/CD ── */
  ZH['/sber'] =
    '<h1>GitVerse — OnSiteSeq 项目仓库</h1>' +
    '<h2>什么是 GitVerse</h2>' +
    '<p><strong>GitVerse</strong> 是俄罗斯 Sber(联邦储蓄银行)推出的代码托管与协作开发平台。功能上对标 GitHub:支持 Git、拉取请求 (pull request)、CI/CD、问题跟踪 (issue) 和代码评审。数据存储在俄罗斯境内的服务器上,符合第 152 号联邦法的要求,保障医疗项目的数据主权。</p>' +
    '<p><a href="https://gitverse.ru/onsiteseq"><img src="/assets/images/gitverse/gitverse.png" alt="GitVerse 上的 OnSiteSeq 仓库"></a></p>' +
    '<p><strong>项目仓库:</strong> <a href="https://gitverse.ru/onsiteseq">gitverse.ru/onsiteseq</a></p><hr>' +
    '<h2>OnSiteSeq 的 CI/CD 流水线</h2>' +
    '<p>从代码提交到镜像仓库中可用 Docker 容器的整个周期,均通过 GitVerse CI 实现自动化。</p>' +
    '<h3>流水线阶段</h3>' +
    tbl(['阶段', '执行内容'], [
      ['<strong>1. 推送至 GitVerse</strong>', '开发者将代码变更推送到仓库'],
      ['<strong>2. 代码检查与测试</strong>', '自动化代码检查:linter、流程单元测试'],
      ['<strong>3. 构建 arm64</strong>', '构建 arm64 架构的 Docker 镜像(OnSiteSeq Edge)'],
      ['<strong>4. 构建 x86</strong>', '构建 x86 架构的 Docker 镜像(Desktop、Cloud)'],
      ['<strong>5. 推送 → Harbor</strong>', '将构建完成的镜像发布到 <a href="https://harbor.onsiteseq.io">harbor.onsiteseq.io</a> 仓库'],
      ['<strong>6. 部署</strong>', '更新通过 OnSiteSeq Cockpit 向用户开放']
    ]) + '<hr>' +
    '<h2>GitVerse 对本项目的优势</h2>' +
    '<ul><li><strong>数据主权</strong> — 源代码存储在俄罗斯境内</li>' +
    '<li><strong>符合第 152 号联邦法</strong> — 患者个人数据保护</li>' +
    '<li><strong>与俄罗斯基础设施集成</strong> — Harbor、Cloud.ru</li>' +
    '<li><strong>多平台构建的 CI/CD</strong> — arm64 与 x86 统一流水线</li>' +
    '<li><strong>开放仓库</strong> — 代码面向社区开放:<a href="https://gitverse.ru/onsiteseq">gitverse.ru/onsiteseq</a></li></ul>';

  /* ── 脑膜炎奈瑟菌 (meningitidis) ── */
  ZH['/meningitidis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_meningitidis.svg" alt="脑膜炎奈瑟菌 (Neisseria meningitidis)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>脑膜炎奈瑟菌血清分群与耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">疑似脑膜炎球菌感染时的床旁即时诊断 — 暴发型病程,分秒必争</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>脑膜炎奈瑟菌</em>(脑膜炎球菌)是脑膜炎球菌病的病原体:从鼻咽部携带状态到暴发性脑膜炎球菌血症,后者从出现首批症状到死亡可能仅有数小时。<strong>诊断和治疗每延误一小时,死亡率随之升高。</strong>标准诊断方法——脑脊液或血液培养——需要 1–3 天,且由于已开始的抗生素治疗常呈阴性结果。</p>' +
    '<p>脑膜炎球菌的基因型决定后续所有病例管理:<strong>血清群</strong>(A、B、C、W、Y、X)决定接触者的疫苗预防策略,而<strong>耐药谱</strong>决定疫源地化学预防药物的选择(环丙沙星耐药株日益增多)。</p>' +
    '<p>我们的流程在<strong>患者床旁</strong>完成纳米孔数据的完整分析周期:当日确定血清群、耐药谱和菌株克隆归属,数据不传输至外部服务器。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:脑脊液、血液、咽拭子;最佳方案——荚膜位点与耐药基因扩增子测序或全基因组测序 (WGS)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告——血清群、药敏谱、接触者化学预防建议;以及面向生物信息分析师的质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 血清群与耐药标志物</h2>' +
    '<h3>荚膜位点(血清分群)</h3>' +
    tbl(['位点', '血清群', '意义'], [
      ['<strong>ctrA</strong>', '所有有荚膜型', '荚膜位点通用标志物,菌种确认'],
      ['<strong>sacB</strong>', 'A', '在俄罗斯罕见;在非洲"脑膜炎带"占主导'],
      ['<strong>synD (siaD-B)</strong>', 'B', '俄罗斯和欧洲的主要血清群;疫苗 4CMenB、MenB-fHbp'],
      ['<strong>siaD-C</strong>', 'C', '第二常见;结合疫苗 MenC/ACWY'],
      ['<strong>synG</strong>', 'W', '自 2010 年代以来在俄罗斯和欧洲占比上升(W:cc11 克隆)'],
      ['<strong>synF</strong>', 'Y', '占比上升,尤其在老年人中'],
      ['<strong>csb</strong>', 'X', '非洲"脑膜炎带",尚无疫苗']
    ]) +
    '<h3>耐药基因</h3>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别'], [
      ['<strong>penA</strong> (PBP2)', '镶嵌型等位基因、F504L、A510V', '青霉素(敏感性降低)'],
      ['<strong>gyrA</strong>', 'T91I', '环丙沙星(接触者化学预防)'],
      ['<strong>rpoB</strong>', 'H552Y', '利福平(接触者化学预防)'],
      ['<strong>23S rRNA</strong>', 'C2611T', '阿奇霉素(预防替代方案)']
    ]) +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '用途', '临床意义'], [
      ['<strong>头孢曲松</strong>', '经验性治疗', '疑似细菌性脑膜炎的起始用药'],
      ['<strong>青霉素 G</strong>', '病原靶向治疗', '确认敏感脑膜炎球菌后的首选药物'],
      ['<strong>环丙沙星</strong>', '化学预防', '接触者的主要用药;gyrA T91I 突变 → 需更换'],
      ['<strong>利福平</strong>', '化学预防', '接触者的替代方案'],
      ['<strong>阿奇霉素</strong>', '化学预防', '喹诺酮耐药时的替代方案']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Meningo Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>Meningo-Serogroup</strong>', '直接从原始读长中基于荚膜位点确定血清群'],
      ['<strong>Meningo-Res-Detector</strong>', '预测对青霉素和环丙沙星的耐药性'],
      ['<strong>Meningo-MLST</strong>', '按 PubMLST 方案确定克隆复合体 (cc),用于流行病学监测']
    ]) +
    '<p>计划基于 <strong>PubMLST 奈瑟菌数据库</strong>(>50,000 个基因组)及国家脑膜炎球菌分离株收藏进行训练。</p><hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>、<code>samtools</code>(参考基因组:MC58 / Z2491)'],
      ['<strong>3. 血清分群</strong>', '自建荚膜位点数据库 ctrA/sacB/synD/siaD/synG/synF/csb'],
      ['<strong>4. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>5. 耐药注释</strong>', '自建突变数据库 penA/gyrA/rpoB/23S rRNA'],
      ['<strong>6. MLST 分型</strong>', '<code>mlst</code>(奈瑟菌方案,PubMLST)']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>暴发型</strong> — 暴发性脑膜炎球菌血症在首批症状出现后 6–24 小时内即可致死;即使接受治疗,病死率仍达 10–15%,未治疗可达 50%。</li>' +
    '<li><strong>分秒必争</strong> — 充分治疗每延迟一小时,死亡率和重症结局(截肢、坏死、华弗综合征)比例在统计上显著升高。</li>' +
    '<li><strong>聚集性疫情</strong> — 封闭集体(军营、宿舍、幼儿园)中的暴发需要对接触者进行紧急化学预防;药物选择取决于菌株的耐药性。</li>' +
    '<li><strong>俄罗斯流行病学</strong> — 以 B、C 血清群及占比上升的 W 群为主;流行克隆复合体为 cc11、cc41/44。</li>' +
    '<li><strong>环丙沙星耐药</strong> — 欧洲、美国和亚洲均已报告耐药菌株 (gyrA T91I),正在改变疫源地预防策略。</li></ul>' +
    '<p>标准微生物学方法需要 1–3 天才能给出结果,而疫源地化学预防的问题早已"盲目"决定。我们的流程<strong>当日</strong>即可返回血清群和耐药谱——此时结果仍能影响结局。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/meningococcal-meningitis">WHO — 脑膜炎球菌性脑膜炎(实况报道)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/meningococcal/">CDC — 脑膜炎球菌病</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/neisseria-spp">PubMLST 奈瑟菌数据库</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=ciprofloxacin-resistant+Neisseria+meningitidis">PubMed — 环丙沙星耐药脑膜炎奈瑟菌</a></li></ul>';

  /* ── 生殖支原体 (mycoplasma) ── */
  ZH['/mycoplasma/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_mycoplasma.svg" alt="生殖支原体 (Mycoplasma genitalium)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>生殖支原体耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">治疗前检测对大环内酯类和氟喹诺酮类的耐药性 — 常被漏诊的性传播病原体,多重耐药迅速发展</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>生殖支原体</em>是最小的可自我复制细菌,也是被低估的性传播病原体:导致男性非淋菌性尿道炎、女性宫颈炎和盆腔炎。该菌<strong>没有细胞壁</strong>,因此对所有 β-内酰胺类抗生素天然耐药,常规培养几乎不可能——在常规性病诊断中该病原体<strong>常被漏诊</strong>。</p>' +
    '<p>主要问题在于耐药性的增长速度。部分国家<strong>阿奇霉素</strong>耐药率已超过 50%,而尿道炎经验性治疗方案仍在"盲目"使用阿奇霉素。紧随大环内酯类之后,对储备药物<strong>莫西沙星</strong>的耐药也在蔓延。国际指南(BASHH、澳大利亚性病指南)要求<strong>治疗前进行耐药检测</strong>(耐药指导治疗,resistance-guided therapy):只有掌握具体菌株的基因型才能开药。</p>' +
    '<p>我们的流程分析关键耐药位点(<em>23S rRNA</em>、<em>gyrA</em>、<em>parC</em>)扩增子测序或临床样本宏基因组测序的纳米孔数据,直接输出治疗方案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。最佳方案:<em>23S rRNA</em>、<em>gyrA</em>、<em>parC</em> 位点扩增子测序<strong>或</strong>拭子微生物组测序。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告——大环内酯类和氟喹诺酮类药敏谱及推荐治疗方案;以及面向生物信息分析师的质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    '<p>流程分析<em>生殖支原体</em>耐药的关键遗传决定因素:</p>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别'], [
      ['<strong>23S rRNA</strong>', 'A2058G、A2059G', '阿奇霉素(大环内酯类)'],
      ['<strong>gyrA</strong>', 'S83I、D87N/Y(大肠杆菌编号)', '莫西沙星(氟喹诺酮类)'],
      ['<strong>parC</strong>', 'S80I/R、D84N(大肠杆菌编号)', '莫西沙星(氟喹诺酮类)']
    ]) +
    '<p><em>gyrA</em> 与 <em>parC</em> 突变的组合决定耐药水平:单一 <em>parC</em> 突变降低敏感性,而 <em>gyrA</em> + <em>parC</em> 双重突变导致莫西沙星完全失效。</p>' +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '临床意义'], [
      ['<strong>多西环素</strong>', '四环素类', '耐药指导治疗的第一步——降低细菌载量'],
      ['<strong>阿奇霉素</strong>', '大环内酯类', '仅在无 23S rRNA 突变时有效'],
      ['<strong>莫西沙星</strong>', '氟喹诺酮类', '大环内酯类耐药时的储备药物;需检测 <em>gyrA/parC</em>'],
      ['<strong>普那霉素</strong>', '链阳菌素类', '多重耐药时的备用方案(并非所有国家均可获得)'],
      ['<strong>米诺环素</strong>', '四环素类', '多重耐药时的替代方案']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Mgen Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>Mgen-Res-Detector</strong>', '基于突变谱预测大环内酯类和氟喹诺酮类耐药性'],
      ['<strong>Mgen-Typing</strong>', '菌株基因分型与耐药克隆传播追踪']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>(参考基因组:生殖支原体 G37)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 耐药注释</strong>', '自建突变数据库 23S rRNA/gyrA/parC'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>耐药率 >50%</strong> — 澳大利亚、西欧和日本的<em>生殖支原体</em>大环内酯类耐药株比例已超过 50%;双重耐药(大环内酯类 + 氟喹诺酮类)正在上升。</li>' +
    '<li><strong>耐药指导治疗</strong> — 依据分子耐药检测结果开抗生素,已被澳大利亚性病指南和 BASHH 推荐为<em>生殖支原体</em>感染的标准诊疗方式。</li>' +
    '<li><strong>隐形病原体</strong> — 由于无法培养且很少纳入标准 PCR 检测组合,感染常年得不到诊断,导致慢性尿道炎、宫颈炎和不孕。</li>' +
    '<li><strong>经验性治疗失败</strong> — 不做耐药检测即用阿奇霉素,会导致感染持续和耐药株筛选。</li></ul>' +
    '<p>现行标准是检测单个突变的 PCR 方法。我们的流程可在医疗现场数小时内给出耐药位点的完整基因型。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/std/treatment-guidelines/default.htm">CDC — 性传播感染治疗指南,2021</a></li>' +
    '<li>📄 <a href="https://www.bashhguidelines.org/">BASHH 指南 — 英国生殖支原体感染管理国家指南</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Mycoplasma+genitalium+resistance+guided+therapy">PubMed — 生殖支原体耐药指导治疗</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/taxonomy">NCBI Taxonomy — 生殖支原体</a></li></ul>';

  /* ── 梅毒 (syphilis) ── */
  ZH['/syphilis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/syphilis.png" alt="梅毒螺旋体 (Treponema pallidum)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>梅毒螺旋体大环内酯类耐药性检测与基因分型</h1>' +
    '<p style="font-size:1.2em;color:#555">检测阿奇霉素耐药突变,为青霉素不耐受患者安全选择替代治疗方案</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>梅毒螺旋体</em>是梅毒的病原体,梅毒是最具社会意义的性传播感染之一。梅毒发病率在全球(包括俄罗斯)持续上升。</p>' +
    '<p>一个独特的医学现象:自 1940 年代以来,<em>梅毒螺旋体</em><strong>从未对青霉素产生耐药性</strong>——青霉素至今仍是治疗的金标准。然而约 <strong>10% 的患者</strong>对青霉素过敏。此前这类患者使用<strong>大环内酯类(阿奇霉素)</strong>——一种方便的口服替代方案。但由于 <strong>23S rRNA</strong> 基因的点突变(A2058G、A2059G),梅毒螺旋体已对阿奇霉素<strong>完全不敏感</strong>:在部分地区(美国、中国、欧洲多国),<strong>80–100%</strong> 的流行菌株携带这些突变。</p>' +
    '<p>我们的流程完成纳米孔数据的完整分析周期,可<strong>快速确认</strong>具体菌株的<strong>大环内酯类耐药性</strong>并<strong>精确确定病原体的基因型</strong>——直接在患者床旁或实验室内完成,数据不传输至外部服务器。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据(Dorado 碱基识别模型将 POD5/FAST5 转换为 FASTQ 之后)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的详细 HTML 报告,以及面向生物信息分析师的扩展报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与突变</h2>' +
    '<p>流程分析<em>梅毒螺旋体</em>耐药的关键遗传决定因素:</p>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别', '临床意义'], [
      ['<strong>23S rRNA</strong>', 'A2058G', '<strong>阿奇霉素</strong>(大环内酯类)', '完全耐药——药物无效'],
      ['<strong>23S rRNA</strong>', 'A2059G', '<strong>阿奇霉素</strong>(大环内酯类)', '完全耐药——药物无效']
    ]) +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '临床意义'], [
      ['<strong>苄星青霉素</strong>', 'β-内酰胺类(青霉素类)', '金标准;自 1940 年代以来未记录到耐药'],
      ['<strong>阿奇霉素</strong>', '大环内酯类', '青霉素过敏时的替代方案;80–100% 菌株耐药'],
      ['<strong>多西环素</strong>', '四环素类', '青霉素过敏时的二线替代方案'],
      ['<strong>头孢曲松</strong>', '第三代头孢菌素', '神经梅毒时的替代方案']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<p>我们持续改进流程和机器学习模型,以确保最高准确性。</p>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '当前版本'], [['<strong>OnSiteSeq Syphilis Pipeline</strong>', '<code>1.0</code>']]) +
    '<h3>分析模块</h3>' +
    tbl(['模块', '版本', '描述'], [
      ['<strong>T. pallidum MLST &amp; Genotyping</strong>', '<code>1.0</code>', '确定病原体的分子型别'],
      ['<strong>Macrolide Resistance Detection (23S rRNA)</strong>', '<code>1.1</code>', '检测与阿奇霉素耐药相关的 A2058G 和 A2059G 突变']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中,以保证最大可重复性。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>Python 3.10</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Alignment)</strong>', '<code>minimap2</code>、<code>samtools</code>'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>bcftools</code>、<code>htslib</code>'],
      ['<strong>4. 注释与报告</strong>', '<code>Python</code>、<code>pandas</code>、<code>jinja2</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>青霉素始终有效。</strong>在 80 多年的应用中,<em>梅毒螺旋体</em>从未对其产生任何耐药机制。苄星青霉素仍是首选药物。</li>' +
    '<li><strong>约 10% 的患者</strong>对青霉素过敏,需要替代治疗。</li>' +
    '<li><strong>大环内酯类实际上已被移出</strong>推荐方案:23S rRNA 的 A2058G/A2059G 突变使阿奇霉素完全无效。若无基因确认即对青霉素过敏患者使用阿奇霉素,将导致治疗失败并使感染进展至更严重的阶段。</li>' +
    '<li><strong>世界卫生组织</strong> — 梅毒仍是全球公共卫生问题,尤其是在先天性梅毒和 HIV 合并感染的背景下。</li>' +
    '<li><strong>俄罗斯</strong> — 尽管发病率有所下降,梅毒仍是最主要的性传播感染之一,需要基因组监测。</li></ul>' +
    '<p>我们的流程能够在<strong>数小时而非数天</strong>内确定:对青霉素过敏的患者能否使用大环内酯类替代药物,还是必须采用其他治疗方案。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/syphilis/treatment/index.html">CDC — 梅毒治疗与护理</a></li>' +
    '<li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)">WHO — 性传播感染 (STI)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/treponema-pallidum">PubMLST — 梅毒螺旋体分型</a></li></ul>';

  /* ── 鲍曼不动杆菌 (acinetobacter) ── */
  ZH['/acinetobacter/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/acinetobacter.png" alt="鲍曼不动杆菌 (Acinetobacter baumannii)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>鲍曼不动杆菌耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">对医院感染"最后堡垒"的基因组监测 — WHO"危急"级别重点病原体</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>鲍曼不动杆菌</em>是一种革兰阴性球杆菌,可引起严重的医院获得性(院内)感染:肺炎、菌血症、脑膜炎、尿路感染和手术切口感染。2024 年 WHO 将其列入更新的 <strong>AMR 重点病原体清单"危急"级别(Priority 1: Critical)</strong>——对人类健康的最高威胁等级。</p>' +
    '<p><em>鲍曼不动杆菌</em>的主要危险在于其<strong>积累多重耐药 (MDR) 机制</strong>的惊人能力:基因水平转移、碳青霉烯酶产生(OXA-23、OXA-40、NDM)、主动外排泵 (AdeABC) 以及孔蛋白的修饰。其结果是出现对几乎所有抗生素类别耐药的 <strong>CRAB</strong>(耐碳青霉烯<em>鲍曼不动杆菌</em>)和 <strong>PDRAB</strong>(泛耐药)菌株。</p>' +
    '<p>现行 AMR 诊断标准——培养法加纸片扩散法——需要 3–5 天。在重症监护室 (ICU) 条件下这过于漫长,<strong>正确治疗每延误一小时</strong>,死亡率都会上升。我们的流程将获得完整 AMR 谱的时间缩短至<strong>一个工作日</strong>,且直接在院内完成。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据(Dorado 碱基识别模型将 POD5/FAST5 转换为 FASTQ 之后)。支持关键基因扩增子测序和全基因组测序 (WGS)。</li>' +
    '<li><strong>📤 输出:</strong> 面向感染科医生的完整 AMR 谱临床 HTML 报告,以及面向生物信息分析师的技术质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与机制</h2>' +
    '<p><em>鲍曼不动杆菌</em>是遗传可塑性最强的病原体之一。流程分析全部关键耐药决定因素:</p>' +
    '<h3>碳青霉烯酶(最关键的类别)</h3>' +
    tbl(['基因 / 决定因素', '机制', '抗生素类别'], [
      ['<strong>OXA-23、OXA-40、OXA-58</strong>', 'D 类丝氨酸 β-内酰胺酶', '碳青霉烯类(亚胺培南、美罗培南)'],
      ['<strong>OXA-51-like</strong>(染色体介导)', '组成型 β-内酰胺酶', '碳青霉烯类(菌种标志物)'],
      ['<strong>NDM-1、NDM-2</strong>', 'B 类金属 β-内酰胺酶', '碳青霉烯类及多数 β-内酰胺类'],
      ['<strong>VIM、IMP</strong>', '金属 β-内酰胺酶', '碳青霉烯类']
    ]) +
    '<h3>对其他抗生素类别的耐药</h3>' +
    tbl(['基因 / 决定因素', '机制', '抗生素类别'], [
      ['<strong>AdeABC</strong>(外排泵)', '主动外排', '四环素类、喹诺酮类、β-内酰胺类'],
      ['<strong>AdeIJK</strong>(外排泵)', '主动外排', '替卡西林、氯霉素、甲氧苄啶'],
      ['<strong>armA、rmtB</strong>', '16S rRNA 甲基化', '氨基糖苷类(高水平)'],
      ['<strong>aac(6\')-Ib、aph(3\')-Ia</strong>', '酶促灭活', '氨基糖苷类'],
      ['<strong>gyrA</strong> Ser83Leu/Trp', '靶位修饰', '氟喹诺酮类(环丙沙星)'],
      ['<strong>parC</strong> Ser80Leu', '靶位修饰', '氟喹诺酮类'],
      ['<strong>sul1、sul2</strong>', '替代酶', '磺胺类、复方磺胺甲噁唑'],
      ['<strong>tet(A)、tet(B)</strong>', '外排泵', '四环素类'],
      ['<strong>mcr-1</strong>', '脂质 A 修饰', '黏菌素("最后手段"药物)']
    ]) +
    '<h3>临床报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '临床意义'], [
      ['<strong>美罗培南 / 亚胺培南</strong>', '碳青霉烯类', '重症感染的一线用药;CRAB 是全球性威胁'],
      ['<strong>黏菌素 / 多黏菌素 B</strong>', '多黏菌素类', '"最后手段"药物;具肾毒性;mcr 基因构成威胁'],
      ['<strong>舒巴坦</strong>', 'β-内酰胺酶抑制剂', '本身对不动杆菌有活性;用于联合治疗'],
      ['<strong>头孢地尔</strong>', '铁载体头孢菌素', '最新药物;对 CRAB 和 PDRAB 有活性'],
      ['<strong>替加环素</strong>', '甘氨酰环素类', '多重耐药时的替代方案;对菌血症无活性'],
      ['<strong>环丙沙星</strong>', '氟喹诺酮类', '常见耐药;作为对照'],
      ['<strong>庆大霉素 / 阿米卡星</strong>', '氨基糖苷类', '无 armA/rmt 时可能有效']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq AB Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的分析模块</h3>' +
    tbl(['模块', '版本', '描述'], [
      ['<strong>AB-Carbapenemase-Detector</strong>', '<code>1.0</code>', '检测 OXA-23/40/58、NDM、VIM、IMP — 各类碳青霉烯酶'],
      ['<strong>AB-AMR-Profiler</strong>', '<code>1.0</code>', '覆盖 7 类抗生素的完整耐药谱'],
      ['<strong>AB-MLST</strong>', '<code>1.0</code>', '按 Pasteur 方案(巴斯德研究所)进行分子分型,用于流行病学监测'],
      ['<strong>AB-cgMLST</strong>', '<code>1.0</code>', '高分辨率分型,用于 ICU 暴发调查']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中,以保证最大可重复性。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>Python 3.10</code>、<code>NanoFilt</code>、<code>porechop_abi</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>、<code>samtools</code>(参考基因组:ATCC 19606 / CP000521)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3 ≥1.0.4</code>、<code>bcftools</code>、<code>htslib</code>'],
      ['<strong>4. 耐药基因检测</strong>', '<code>AMRFinderPlus</code> (NCBI)、<code>ResFinder</code>、自建 OXA 型别数据库'],
      ['<strong>5. MLST 分型</strong>', '<code>mlst</code>(Pasteur/不动杆菌方案,PubMLST)'],
      ['<strong>6. 注释与报告</strong>', '<code>Python</code>、<code>pandas</code>、<code>jinja2</code>、<code>snpEff</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO,2024 — 优先级 1:危急。</strong><em>鲍曼不动杆菌</em>位居更新的 AMR 重点病原体清单之首,没有任何其他细菌获得如此明确的威胁评估。</li>' +
    '<li><strong>CRAB 感染的病死率</strong>在 ICU 中高达 <strong>40–70%</strong>——与严重脓毒症相当。</li>' +
    '<li><strong>军事冲突</strong> — <em>鲍曼不动杆菌</em>因伊拉克和阿富汗伤员中的大规模院内暴发而获得非正式名称"Iraqibacter(伊拉克杆菌)",对军事医学具有现实意义。</li>' +
    '<li><strong>对消毒剂的耐受性</strong>:该菌可在干燥表面存活长达 <strong>25 天</strong>,导致其在院内迅速传播。</li>' +
    '<li><strong>俄罗斯</strong>:CRAB 在俄罗斯 ICU 中广泛流行;部分地区耐碳青霉烯分离株的比例超过 <strong>60%</strong>。</li>' +
    '<li><strong>新药</strong>:头孢地尔(2019)和舒巴坦-度洛巴坦(2023)是 PDRAB 仅有的新选择;没有 AMR 谱就无法正确选择治疗方案。</li></ul>' +
    '<p>床旁快速 AMR 分子诊断使医生能够立即<strong>降阶梯</strong>(从广谱转向窄谱药物)或在 CRAB/PDRAB 时<strong>升阶梯</strong>治疗——直接影响 ICU 患者的生存率。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240093461">WHO — 2024 年细菌类重点病原体清单</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/AMRFinder/">AMRFinderPlus (NCBI) — 耐药基因数据库</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/acinetobacter-baumannii">PubMLST — 不动杆菌分型(Pasteur 方案)</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/clinical_breakpoints/">EUCAST — 鲍曼不动杆菌折点</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/drugresistance/biggest-threats.html">CDC — 耐碳青霉烯不动杆菌</a></li></ul>';

  /* ── 铜绿假单胞菌 (pseudomonas) ── */
  ZH['/pseudomonas/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/pseudomonas.png" alt="铜绿假单胞菌 (Pseudomonas aeruginosa)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>铜绿假单胞菌耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">对铜绿假单胞菌的基因组监测 — 适应性大师,囊性纤维化、烧伤及 ICU 慢性感染的关键病原体</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>铜绿假单胞菌</em>是一种革兰阴性非发酵菌,是临床上最危险的机会性病原体之一。2024 年 WHO 再次将其列入<strong>"危急"级别重点病原体清单</strong>,强调耐碳青霉烯菌株 (CRPA) 的迅速增长。</p>' +
    '<p><em>铜绿假单胞菌</em>的适应能力独一无二。它拥有<strong>最大的细菌基因组之一</strong>(约 6.3 Mb),编码极其丰富的耐药与毒力机制。该菌能够<strong>同时</strong>动用多种耐药机制:孔蛋白丢失 (OprD)、外排泵高表达(MexAB-OprM 等)、β-内酰胺酶产生(AmpC、金属 β-内酰胺酶)以及抗生素靶基因突变。</p>' +
    '<p>特别严重的问题是<em>铜绿假单胞菌</em>在<strong>囊性纤维化慢性感染</strong>中的作用:细菌形成生物膜并转为黏液型表型,使抗生素和免疫系统无法触及。对这类患者而言,监测每个菌株的 AMR 谱关乎生存。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据(Dorado 碱基识别模型将 POD5/FAST5 转换为 FASTQ 之后)。支持全基因组测序 (WGS) 和扩增子测序。</li>' +
    '<li><strong>📤 输出:</strong> 面向感染科/呼吸科医生的 AMR 谱临床 HTML 报告,以及面向生物信息分析师的技术质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 耐药基因与机制</h2>' +
    '<p><em>铜绿假单胞菌</em>是最难治疗的病原体之一:其耐药性沿多条独立途径同时形成。流程分析全部决定因素:</p>' +
    '<h3>碳青霉烯酶与 β-内酰胺酶</h3>' +
    tbl(['基因 / 决定因素', '机制', '抗生素类别'], [
      ['<strong>NDM-1、NDM-2</strong>', 'B 类金属 β-内酰胺酶 (MBL)', '碳青霉烯类及多数 β-内酰胺类'],
      ['<strong>VIM-1、VIM-2</strong>', 'B 类 MBL — 铜绿假单胞菌中最常见', '碳青霉烯类'],
      ['<strong>IMP 型</strong>', 'B 类 MBL', '碳青霉烯类'],
      ['<strong>KPC-2、KPC-3</strong>', 'A 类丝氨酸碳青霉烯酶', '碳青霉烯类及所有 β-内酰胺类'],
      ['<strong>AmpC</strong>(染色体介导,去阻遏)', 'C 类头孢菌素酶', '第一至第三代头孢菌素、氨曲南'],
      ['<strong>OXA-10、OXA-14</strong>', 'D 类苯唑西林酶', '碳青霉烯类(中度)、青霉素类']
    ]) +
    '<h3>外排泵(铜绿假单胞菌多重耐药的主要机制)</h3>' +
    tbl(['外排泵', '调控因子', '抗生素类别'], [
      ['<strong>MexAB-OprM</strong>', 'MexR(功能破坏)', 'β-内酰胺类、氟喹诺酮类、四环素类'],
      ['<strong>MexCD-OprJ</strong>', 'NfxB(功能破坏)', '氟喹诺酮类、头孢吡肟'],
      ['<strong>MexEF-OprN</strong>', 'MexT(激活)', '氟喹诺酮类、碳青霉烯类、氯霉素'],
      ['<strong>MexXY-OprM</strong>', 'MexZ(功能破坏)', '氨基糖苷类、氟喹诺酮类']
    ]) +
    '<h3>OprD 孔蛋白丢失与靶位突变</h3>' +
    tbl(['基因 / 改变', '机制', '抗生素类别'], [
      ['<strong>oprD</strong>(突变 / 缺失)', '特异性孔蛋白丢失', '碳青霉烯类(亚胺培南 >> 美罗培南)'],
      ['<strong>gyrA</strong> Thr83Ile、Asp87Gly/Asn', 'DNA 旋转酶修饰', '氟喹诺酮类(环丙沙星)'],
      ['<strong>parC</strong> Ser87Trp', '拓扑异构酶 IV 修饰', '氟喹诺酮类'],
      ['<strong>armA、rmtB、rmtC</strong>', '16S rRNA 甲基化', '氨基糖苷类(高水平)'],
      ['<strong>aac(6\')-II、aph(3\')-IIb</strong>', '酶促灭活', '氨基糖苷类'],
      ['<strong>fosA</strong>(染色体介导)', '磷霉素灭活', '磷霉素']
    ]) +
    '<h3>临床报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '临床意义'], [
      ['<strong>哌拉西林/他唑巴坦</strong>', 'β-内酰胺类 + 抑制剂', '敏感菌株的一线用药'],
      ['<strong>头孢他啶</strong>', '第三代头孢菌素(抗假单胞菌)', '一线用药;无 AmpC 时敏感'],
      ['<strong>头孢吡肟</strong>', '第四代头孢菌素', '对去阻遏 AmpC 有活性'],
      ['<strong>头孢洛扎/他唑巴坦</strong>', '新型头孢菌素 + 抑制剂', '对产 AmpC 的多重耐药株有活性'],
      ['<strong>美罗培南 / 亚胺培南</strong>', '碳青霉烯类', '重症感染的一线用药;CRPA 是全球性威胁'],
      ['<strong>头孢地尔</strong>', '铁载体头孢菌素', '针对 CRPA 和泛耐药株的最新药物'],
      ['<strong>环丙沙星</strong>', '氟喹诺酮类', '常见耐药;通过 gyrA/parC 监测'],
      ['<strong>阿米卡星 / 妥布霉素</strong>', '氨基糖苷类', '囊性纤维化时吸入给药;armA = 耐药'],
      ['<strong>黏菌素 / 多黏菌素 B</strong>', '多黏菌素类', '泛耐药时的最后手段'],
      ['<strong>氨曲南/阿维巴坦</strong>', '单环 β-内酰胺类 + 抑制剂', '对产 MBL 菌株有活性']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq PA Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的分析模块</h3>' +
    tbl(['模块', '版本', '描述'], [
      ['<strong>PA-Carbapenemase-Detector</strong>', '<code>1.0</code>', '检测 NDM、VIM、IMP、KPC、OXA — 各类 MBL 与丝氨酸碳青霉烯酶'],
      ['<strong>PA-Efflux-Profiler</strong>', '<code>1.0</code>', '分析外排泵调控因子 MexR、NfxB、MexT、MexZ 的突变'],
      ['<strong>PA-AMR-Profiler</strong>', '<code>1.0</code>', '覆盖 8 类抗生素的完整 AMR 谱'],
      ['<strong>PA-MLST</strong>', '<code>1.0</code>', '分子分型(PubMLST/假单胞菌方案),用于暴发监测'],
      ['<strong>PA-Biofilm-Predictor</strong>', '<code>1.0</code>', '检测生物膜基因(<em>pelB</em>、<em>pslA</em>、<em>algD</em>、<em>mucA</em>)— 对囊性纤维化至关重要']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中,以保证最大可重复性。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>Python 3.10</code>、<code>NanoFilt</code>、<code>porechop_abi</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code>、<code>samtools</code>(参考基因组:PAO1 / AE004091)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3 ≥1.0.4</code>、<code>bcftools</code>、<code>htslib</code>'],
      ['<strong>4. 耐药基因检测</strong>', '<code>AMRFinderPlus</code>、<code>ResFinder</code>、自建 MBL 与外排泵数据库'],
      ['<strong>5. MLST 分型</strong>', '<code>mlst</code>(PubMLST/铜绿假单胞菌方案)'],
      ['<strong>6. 毒力基因注释</strong>', '<code>VFDB</code>(毒力因子数据库)'],
      ['<strong>7. 报告生成</strong>', '<code>Python</code>、<code>pandas</code>、<code>jinja2</code>、<code>snpEff</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>WHO,2024 — 优先级 1:危急。</strong>CRPA(耐碳青霉烯<em>铜绿假单胞菌</em>)与 CRAB 同列全球健康威胁的最顶端。</li>' +
    '<li><strong>病死率</strong>:ICU 中 CRPA 感染的病死率为 <strong>30–50%</strong>;发生菌血症时可达 <strong>60%</strong>。</li>' +
    '<li><strong>囊性纤维化</strong>:<em>铜绿假单胞菌</em>慢性感染约 <strong>80% 的成年</strong>囊性纤维化患者。转为黏液型表型后,细菌对标准治疗不可及——对每个菌株的 AMR 监测<strong>关乎生死</strong>。</li>' +
    '<li><strong>烧伤中心</strong>:<em>铜绿假单胞菌</em>是烧伤患者感染的首要病原体;CRPA 暴发可使整个病区陷于瘫痪。</li>' +
    '<li><strong>"治疗过程中"的耐药积累</strong>:<em>铜绿假单胞菌</em>能够在<strong>同一患者的治疗期间</strong>获得新的耐药机制——动态复查 AMR 至关重要。</li>' +
    '<li><strong>俄罗斯</strong>:俄罗斯医院中 CRPA 的比例平均超过 <strong>30%</strong>,大型 ICU 中可达 <strong>50–60%</strong>。</li>' +
    '<li><strong>生物膜</strong>:生物膜内的<em>铜绿假单胞菌</em>对抗生素的耐药性提高 <strong>1000 倍</strong>——生物膜基因(<em>pelB</em>、<em>algD</em>)的分子检测可预测治疗失败。</li></ul>' +
    '<p>床旁快速分子分型使医生能够立即换用有活性的药物(头孢洛扎/他唑巴坦、头孢地尔),<strong>不浪费关键时间</strong>在无效的"试探性"治疗方案上。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240093461">WHO — 2024 年细菌类重点病原体清单</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/AMRFinder/">AMRFinderPlus (NCBI)</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/pseudomonas-aeruginosa">PubMLST — 铜绿假单胞菌分型</a></li>' +
    '<li>📄 <a href="https://www.eucast.org/clinical_breakpoints/">EUCAST — 铜绿假单胞菌折点</a></li>' +
    '<li>📄 <a href="http://www.mgc.ac.cn/VFs/">VFDB — 毒力因子数据库</a></li>' +
    '<li>📄 <a href="https://www.cff.org/managing-cf/treatments-and-therapies/infection-management/pseudomonas-aeruginosa">囊性纤维化基金会 — 囊性纤维化中的铜绿假单胞菌</a></li></ul>';

  /* ── 沙眼衣原体 (chlamydia) ── */
  ZH['/chlamydia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/chlamydia.png" alt="沙眼衣原体 (Chlamydia trachomatis)" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>沙眼衣原体耐药性检测与基因分型</h1>' +
    '<p style="font-size:1.2em;color:#555">对全球最常见细菌性传播感染的分子诊断 — 从血清型鉴定到大环内酯类和氟喹诺酮类耐药突变检测</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>沙眼衣原体</em>是专性细胞内寄生菌,是衣原体感染的病原体——<strong>全球最常见的细菌性性传播感染</strong>。据 WHO 数据,每年新增病例超过 <strong>1.27 亿</strong>。在俄罗斯,衣原体感染在性传播感染中居首位。</p>' +
    '<p>病原体独特的生物学特性造成严重的诊断和治疗难题:衣原体以<strong>两种形态</strong>存在——具感染性的原体 (EB) 和细胞内的网状体 (RB)。这使细菌对多数破坏细胞壁合成的抗生素<strong>不可及</strong>(β-内酰胺类完全无效)。</p>' +
    '<p>长期以来首选药物是<strong>阿奇霉素</strong>(单次给药)。然而由于不规范使用,经 23S rRNA 基因突变导致的<strong>大环内酯类耐药</strong>正在增长,同时还出现对<strong>氟喹诺酮类</strong>(<em>gyrA</em>、<em>parC</em> 基因)的耐药。选错治疗方案会导致感染转为慢性、不孕以及异位妊娠风险。</p>' +
    '<p>我们的流程完成纳米孔数据的完整分析周期,用于病原体的<strong>血清型/基因型鉴定</strong>和<strong>耐药突变检测</strong>——直接在医疗现场完成,数据不传输至外部服务器。</p>' +
    '<ul><li><strong>📥 输入:</strong> 原始 <code>FASTQ</code> 数据(Dorado 碱基识别模型将 POD5/FAST5 转换为 FASTQ 之后)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的详细 HTML 报告(含血清型和药敏谱),以及面向生物信息分析师的扩展质控报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 血清型分型与临床疾病</h2>' +
    '<p><em>沙眼衣原体</em>共有 <strong>19 个血清型(A–L)</strong>,每个血清型对应特定的临床表现:</p>' +
    tbl(['血清型', '临床疾病', '意义'], [
      ['<strong>A、B、Ba、C</strong>', '沙眼(感染性角膜结膜炎)', '全球首要的感染性致盲原因'],
      ['<strong>D–K</strong>', '泌尿生殖道衣原体感染', '最常见的性传播感染:尿道炎、宫颈炎、盆腔炎性疾病、不孕'],
      ['<strong>L1、L2、L2a、L2b、L3</strong>', '性病淋巴肉芽肿 (LGV)', '侵袭性形式,严重的全身并发症']
    ]) + '<hr>' +
    '<h2>🔬 耐药基因与突变</h2>' +
    '<p>流程分析<em>沙眼衣原体</em>耐药的关键遗传决定因素:</p>' +
    tbl(['基因 / 位点', '关键突变', '抗生素类别', '临床意义'], [
      ['<strong>23S rRNA</strong>', 'A2058G、A2059G', '<strong>阿奇霉素</strong>(大环内酯类)', '对一线药物耐药'],
      ['<strong>23S rRNA</strong>', 'G2057A、C2611T', '<strong>克拉霉素、红霉素</strong>', '大环内酯类交叉耐药'],
      ['<strong>gyrA</strong>', 'Ser83Leu、Asp87Asn', '<strong>氧氟沙星、左氧氟沙星</strong>(氟喹诺酮类)', '对替代治疗耐药'],
      ['<strong>parC</strong>', 'Ser87Ile', '<strong>氟喹诺酮类</strong>', '耐药水平增强']
    ]) +
    '<h3>报告中的抗生素谱</h3>' +
    tbl(['抗生素', '类别', '临床意义'], [
      ['<strong>阿奇霉素</strong>', '大环内酯类', '一线用药——单次 1 g;耐药性不断增长'],
      ['<strong>多西环素</strong>', '四环素类', '一线用药(7 天)——存在耐药风险时首选'],
      ['<strong>氧氟沙星 / 左氧氟沙星</strong>', '氟喹诺酮类', '替代治疗'],
      ['<strong>克拉霉素</strong>', '大环内酯类', '与阿奇霉素交叉耐药'],
      ['<strong>阿莫西林</strong>', 'β-内酰胺类', '仅限妊娠期(疗效有限)']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<p>我们持续改进流程和机器学习模型,以确保最高准确性。</p>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Chlamydia Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的分析模块</h3>' +
    tbl(['模块', '版本', '描述'], [
      ['<strong>CT-Serovar-Typer</strong>', '<code>1.0</code>', '基于 <em>ompA</em> 基因(主要外膜蛋白)鉴定血清型(A–L3)'],
      ['<strong>CT-Resistance-Detector</strong>', '<code>1.0</code>', '检测大环内酯类(23S rRNA)和氟喹诺酮类(<em>gyrA</em>、<em>parC</em>)耐药突变'],
      ['<strong>CT-MLST</strong>', '<code>1.0</code>', '按 PubMLST/Chlamydiales 方案进行分子分型']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于隔离的 Conda 环境中,以保证最大可重复性。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>Python 3.10</code>、<code>NanoFilt</code>、<code>porechop_abi</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Alignment)</strong>', '<code>minimap2</code>、<code>samtools</code>(参考基因组:D/UW-3/CX,NZ_CP001713)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>bcftools</code>、<code>htslib</code>、<code>clair3</code>'],
      ['<strong>4. 血清型分型</strong>', '自建 <em>ompA</em> 等位基因数据库 + <code>mlst</code>(PubMLST/Chlamydiales)'],
      ['<strong>5. 注释与报告</strong>', '<code>Python</code>、<code>pandas</code>、<code>jinja2</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景</h2>' +
    '<ul><li><strong>每年 1.27 亿新发病例</strong> — 衣原体感染在细菌性性传播感染中居首位(WHO,2020)。</li>' +
    '<li><strong>"无声的流行病"</strong> — <strong>70–80% 的女性和 50% 的男性</strong>感染后无症状,导致感染隐匿传播。</li>' +
    '<li><strong>阿奇霉素耐药性上升</strong> — 23S rRNA 的 A2058G 和 A2059G 突变曾被认为是罕见的,但在欧洲和美国的检出率不断上升;多西环素正成为首选。</li>' +
    '<li><strong>并发症</strong>:慢性输卵管炎 → 输卵管阻塞 → <strong>不孕</strong>(见于 10–15% 未治疗的女性);LGV 血清型可导致严重的破坏性淋巴结病变。</li>' +
    '<li><strong>合并感染</strong>:衣原体感染使性接触中感染 HIV 的风险增加 <strong>3–5 倍</strong>,因此其诊断与其他性传播感染的联合防控至关重要。</li>' +
    '<li><strong>俄罗斯</strong> — 衣原体感染仍是最常报告的性传播感染;由于无症状病程,实际发病率超过官方数据的 5–10 倍。</li></ul>' +
    '<p>现行标准是 PCR 诊断(仅能确认有无感染,无耐药信息)。我们的流程增加了<strong>至关重要的一环</strong>:<strong>是哪种血清型</strong>、<strong>对阿奇霉素是否敏感</strong>,从而可以立即开出正确的治疗方案,避免治疗失败的风险。</p><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/news-room/fact-sheets/detail/chlamydia">WHO — 衣原体感染实况报道</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/std/treatment-guidelines/chlamydia.htm">CDC — 衣原体感染治疗指南</a></li>' +
    '<li>📄 <a href="https://pubmlst.org/organisms/chlamydiales-spp">PubMLST — 衣原体目分型</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/en/chlamydia">ECDC — 欧洲衣原体感染</a></li></ul>';

  /* ── CANDIDA ALBICANS (白色念珠菌) ── */
  ZH['/albicans/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_albicans.svg" alt="白色念珠菌 — 带芽生孢子和假菌丝的酵母细胞" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>白色念珠菌:唑类与棘白菌素类耐药、非整倍体与结构重排</h1>' +
    '<p style="font-size:1.2em;color:#555">单次运行完成 SNV + CNV + 非整倍体分析 — 长读长能看到短读长遗漏的信息</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>白色念珠菌</em>(Candida albicans)是人类侵袭性念珠菌病的首要病原体:<strong>重症监护室的念珠菌血症</strong>(医院血流感染的主要原因之一)、黏膜与皮肤念珠菌病,以及<strong>导管和植入物上的生物膜</strong>——生物膜内对唑类的耐受性比浮游细胞高出数倍。该物种的标志性特征是<strong>"酵母 ↔ 菌丝"双形态转换</strong>:形态切换是毒力、组织侵袭和生物膜形成的关键因素。</p>' +
    '<p>决定流程架构的核心分子特征:<em>C. albicans</em> 是<strong>二倍体</strong>生物,没有完整的有性生殖周期,其耐药性往往不是通过点突变,而是通过<strong>非整倍体和结构重排</strong>发展而来——经典例子是<strong>5L 等臂染色体</strong>,同时携带 <em>ERG11</em>(氟康唑靶标)和调控因子 <em>TAC1</em>。短读长难以解析这类重排;纳米孔测序能看到结构变异和拷贝数变化 (CNV),并可在二倍体基因组中<strong>定相等位基因</strong>。我们的流程在<strong>单次运行中联合分析 SNV + CNV + 非整倍体</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:纯培养分离株或血培养。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于床旁场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — 菌种鉴定 (ITS)、AMR 谱(唑类、棘白菌素类)、CNV/非整倍体(含 5L 等臂染色体)、生物膜标志物;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、耐药、结构变异</h2>' +
    '<h3>菌种鉴定</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS</strong>(核糖体 DNA 内转录间隔区)', '<em>C. albicans</em> 菌种鉴定及与非白念珠菌物种(<em>C. glabrata</em>、<em>C. parapsilosis</em>、<em>C. tropicalis</em>、<em>C. auris</em>)的鉴别']
    ]) +
    '<h3>唑类耐药(氟康唑等)</h3>' +
    tbl(['标志物', '机制', '临床意义'], [
      ['<strong>ERG11</strong>', '氟康唑靶标(羊毛甾醇 14α-去甲基化酶)点突变', '唑类对酶的亲和力下降——主要耐药机制'],
      ['<strong>UPC2</strong>(功能获得性)', '<strong>ERG11</strong> 过表达', '靶标过量产生,抵消唑类作用'],
      ['<strong>TAC1</strong>(功能获得性)', '<strong>CDR1/CDR2</strong> 外排泵(ABC 转运体)过表达', '将唑类泵出细胞'],
      ['<strong>MRR1</strong>(功能获得性)', '<strong>MDR1</strong> 泵(MFS 转运体)过表达', '将唑类泵出细胞']
    ]) +
    '<h3>棘白菌素类与两性霉素 B</h3>' +
    tbl(['标志物', '药物', '临床意义'], [
      ['<strong>FKS1</strong>,热点 <strong>HS1/HS2</strong>(如 S645P)', '卡泊芬净、米卡芬净', '棘白菌素靶标(葡聚糖合酶)突变——ICU 广泛应用棘白菌素背景下的关键耐药'],
      ['<strong>ERG3</strong> 及 ERG 相关改变', '两性霉素 B', '耐药罕见但有报道;膜甾醇组成改变']
    ]) +
    '<h3>结构变异、CNV 与非整倍体 — 长读长优势</h3>' +
    tbl(['变异', '内容', '意义'], [
      ['<strong>5L 等臂染色体</strong>', '同时携带 <strong>ERG11</strong> 和 <strong>TAC1</strong>', '唑类耐药的经典路径:一次重排同时加倍靶标和外排调控因子'],
      ['<strong>染色体重复/非整倍体</strong>', '基因剂量改变', '二倍体念珠菌适应抗真菌药物的常见机制'],
      ['<strong>AMR 基因座 CNV</strong>', 'ERG11、CDR1/CDR2、MDR1 扩增', '无点突变的过表达——面向 SNV 的流程无法发现']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Albicans Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CAL-Azole-Profiler</strong>', '基于 ERG11/UPC2/TAC1/MRR1 谱与 CNV 预测唑类耐药'],
      ['<strong>CAL-FKS-Detector</strong>', '检测 FKS1 热点突变 (HS1/HS2)——棘白菌素耐药风险'],
      ['<strong>CAL-Aneuploidy-Scanner</strong>', '基于覆盖度和结构变异识别非整倍体与 5L 等臂染色体']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 白色念珠菌参考基因组(二倍体)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 带等位基因定相的 SNV/插入缺失'],
      ['<strong>4. 结构变异与 CNV</strong>', '<code>sniffles2</code>、<code>cuteSV</code> — SV、非整倍体、按染色体覆盖度分析(5L 等臂染色体)'],
      ['<strong>5. AMR 标志物检出</strong>', '自建靶标数据库:ERG11、FKS1 HS1/HS2、UPC2/TAC1/MRR1 GoF、生物膜标志物'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>ICU 念珠菌血症</strong> — 念珠菌所致血流感染在重症监护室院内感染中的占比不断上升;念珠菌血症死亡率高,延误充分的抗真菌治疗会恶化预后。数小时内获得基因组学答案,可在经验性用药错误累积之前调整策略。</li>' +
    '<li><strong>棘白菌素耐药上升</strong> — 棘白菌素类已成为念珠菌血症一线用药,其广泛应用伴随 FKS1 突变株的出现;监测 HS1/HS2 热点正成为治疗路径选择的一部分。</li>' +
    '<li><strong>菌种谱向非白念珠菌转移</strong> — 光滑念珠菌、近平滑念珠菌和耳念珠菌的占比不断上升;ITS 菌种鉴定在药敏数据出来之前就决定起始方案。参见念珠菌病宇宙的其他卡片:<a href="/auris/">耳念珠菌</a>与<a href="/glabrata/">光滑念珠菌</a>。</li>' +
    '<li><strong>器械上的生物膜</strong> — 导管和植入物被生物膜定植,对唑类的耐受性成倍提高;基因组谱有助于区分"纯生物膜"问题(解决方案是拔除器械)与菌株的遗传性耐药。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 念珠菌病</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — PubMed / Bookshelf</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 念珠菌病</a></li></ul>';

  /* ── CANDIDA AURIS (耳念珠菌) ── */
  ZH['/auris/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_auris.svg" alt="耳念珠菌 — 出芽酵母细胞与全球暴发分布" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>耳念珠菌的鉴定、进化分支分型与暴发追踪</h1>' +
    '<p style="font-size:1.2em;color:#555">"超级真菌"的分子鉴定、进化分支 (I–VI) 与 AMR 谱 — 数小时内为医院感染控制提供答案</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>耳念珠菌</em>(Candida auris)是一种类酵母真菌,<strong>2009 年</strong>首次被描述(分离自日本一名患者的耳部分泌物——故名 <em>auris</em>,拉丁语"耳")。随后发现了前所未有的现象:多个遗传进化分支(I–V;目前也在描述 VI)<strong>在不同大陆独立且几乎同时出现</strong>——全球同步出现的谜团。一种讨论中的假说将其与气候变暖联系起来:变暖作为选择因子,筛选出能突破哺乳动物体温屏障的耐热真菌;这只是假说,而非已证实的机制。</p>' +
    '<p>CDC 将<em>耳念珠菌</em>列入 <strong>"紧迫威胁" (Urgent Threat)</strong> 类别——抗微生物药物耐药的最高威胁等级。该真菌被称为"超级真菌"有三个原因:</p>' +
    '<ul><li><strong>多重耐药</strong> — 约 <strong>90% 的分离株对氟康唑耐药</strong>,对两性霉素 B 的耐药性不一,对棘白菌素类的耐药性正在上升(<strong>FKS1</strong> 突变,如 S639F);已有对所有三类主要抗真菌药物均不敏感的<strong>泛耐药</strong>菌株报道。</li>' +
    '<li><strong>院内暴发</strong> — 在物体表面和患者皮肤上长期存活,在 ICU 内传播;对多种消毒剂耐受,需使用经证明对耳念珠菌有效的消毒产品。</li>' +
    '<li><strong>鉴定错误</strong> — 表型系统会将其与 <em>C. haemulonii</em> 等酵母混淆;可靠鉴定只能靠<strong>分子方法</strong>(ITS/D1–D2)或更新数据库后的 MALDI-TOF。</li></ul>' +
    '<p>我们的流程基于纳米孔测序数据,执行<strong>菌种分子鉴定</strong>、基于 SNP 面板/全基因组的<strong>进化分支判定 (I–VI)</strong>、<strong>AMR 谱</strong>(ERG11、FKS1)以及<strong>暴发追踪</strong>:分离株亲缘关系的 SNP 分析回答感染控制的核心问题"谁传染了谁",并记录院内传播。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:分离株或筛查拭子(腋窝/腹股沟)。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于医院场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向医院感染控制部门的报告 — 菌种鉴定、进化分支、AMR 谱、暴发分离株 SNP 聚类;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、进化分支、耐药</h2>' +
    '<h3>分子鉴定与鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS / D1–D2</strong>', '耳念珠菌种特异性鉴定——取代易错表型诊断的金标准'],
      ['<strong>全基因组 SNP 分析</strong>', '与 <em>C. haemulonii</em>、<em>C. pseudohaemulonii</em>、<em>C. duobushaemulonii</em> 等形态相似酵母的鉴别']
    ]) +
    '<h3>进化分支(地理系统发育)</h3>' +
    tbl(['分支', '典型地区', '备注'], [
      ['<strong>I</strong>', '南亚', '临床暴发中最常见'],
      ['<strong>II</strong>', '东亚', '2009 年日本原始分离株所属分支'],
      ['<strong>III</strong>', '非洲', '南非等地暴发'],
      ['<strong>IV</strong>', '南美洲', '委内瑞拉、哥伦比亚暴发'],
      ['<strong>V</strong>', '伊朗', '描述较晚,零星分离株'],
      ['<strong>VI</strong>', '—', '新近描述的分支;分类仍在完善']
    ]) +
    '<h3>耐药基因</h3>' +
    tbl(['基因', '药物类别', '临床意义'], [
      ['<strong>ERG11</strong>', '唑类(氟康唑)', '突变(Y132F、K143R 等)——唑类耐药的主要机制;约 90% 分离株对氟康唑耐药'],
      ['<strong>FKS1</strong>', '棘白菌素类(卡泊芬净等)', '热点突变(如 <strong>S639F</strong>)——最后防线药物失效'],
      ['<strong>其他位点</strong>', '两性霉素 B', '机制多样;泛耐药菌株使三类药物全部失效']
    ]) +
    '<h3>感染控制输出</h3>' +
    tbl(['任务', '流程提供的内容'], [
      ['<strong>菌种确认</strong>', '耳念珠菌分子鉴定,无与 <em>C. haemulonii</em> 混淆的风险'],
      ['<strong>暴发流行病学调查</strong>', '分离株 SNP 聚类:谁传染了谁、共同来源、院内传播'],
      ['<strong>治疗选择</strong>', 'AMR 谱(ERG11、FKS1)——默认排除氟康唑,核查棘白菌素风险'],
      ['<strong>流行病学监测</strong>', '进化分支判定 (I–VI)——输入性分离株还是本地流行']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Auris Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CAU-Clade-Typer</strong>', '基于 SNP 谱判定进化分支 (I–VI)'],
      ['<strong>CAU-Res-Detector</strong>', '基于基因组数据预测抗真菌药物耐药性(ERG11、FKS1)'],
      ['<strong>CAU-Outbreak-Tracker</strong>', '基于 SNP 亲缘关系对暴发分离株聚类,用于流行病学调查']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 耳念珠菌各分支 (I–VI) 及近缘物种参考序列,用于鉴别'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. 系统发育与聚类</strong>', '分离株亲缘关系 SNP 分析、进化树构建、自建分支数据库'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) +
    '<p>Oxford Nanopore 长读长还能获得<strong>分离株完整组装</strong>并检出短读长技术无法获得的<strong>结构变异</strong>。</p><hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>全球暴发</strong> — 耳念珠菌已在所有有人居住的大陆报告;据 CDC 和 ECDC 数据,美国和欧洲的病例数持续上升;俄罗斯也有病例报告。每一次新暴发都需要快速回答:菌种、分支、耐药性、传播链。</li>' +
    '<li><strong>紧迫威胁</strong> — CDC 将耳念珠菌列入 AMR 最高威胁类别。多重耐药(直至泛耐药菌株)使没有基因组数据的经验性抗真菌治疗选择几乎不可能。</li>' +
    '<li><strong>念珠菌血症高死亡率</strong> — 侵袭性感染的临床系列死亡率可达 <strong>30–60%</strong>;死亡归因复杂——患者通常有严重的基础疾病(ICU、导管、免疫抑制)。</li>' +
    '<li><strong>医院感染控制</strong> — 耳念珠菌在表面和皮肤上可存活数月;消毒需使用经证明对该真菌有效的消毒剂。快速 SNP 暴发追踪可定位来源,在传播到各病区之前切断传播链。</li>' +
    '<li><strong>出现之谜</strong> — 各分支在不同大陆同时独立出现(假说:变暖背景下耐热真菌被选择),使耳念珠菌成为新一波真菌病原体的典型范例,监测系统必须为此做好准备。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 耳念珠菌</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — 欧洲疾病预防控制中心</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — 美国国家生物技术信息中心</a></li></ul>';

  /* ── CANDIDA GLABRATA (光滑念珠菌) ── */
  ZH['/glabrata/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_glabrata.svg" alt="光滑念珠菌 — 出芽酵母细胞与耐药性进化的螺旋" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>光滑念珠菌耐药性的进化 — 基因组实时监控</h1>' +
    '<p style="font-size:1.2em;color:#555">PDR1 / FKS1 / FKS2 / MSH2 谱与患者连续分离株的微观进化 — 趁治疗还来得及发挥作用</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>光滑念珠菌</em>(Candida glabrata,现名 <em>Nakaseomyces glabratus</em>)是发达国家成人<strong>第二常见的念珠菌血症病因</strong>,也是新栏目"念珠菌病宇宙"的主打物种。与白色念珠菌不同,该病原体是<strong>单倍体</strong>,<strong>不形成真菌丝和假菌丝</strong>——只有小型出芽酵母细胞。其在宿主体内的持留依靠 <strong>EPA 家族</strong>黏附素,而主要的临床"武器"是在治疗过程中进化出耐药性的惊人能力。</p>' +
    '<p>问题的核心是<strong>"在医生眼前"产生的耐药性</strong>。光滑念珠菌天然对氟康唑<strong>敏感性降低</strong>(SDD 类别——剂量依赖性敏感),在治疗压力下迅速获得完全耐药:<strong>PDR1 功能获得性突变</strong>导致 <strong>CDR1/CDR2</strong> 外排泵过表达(唑类耐药),<strong>FKS1 和 FKS2 热点突变</strong>(如 FKS1 的 S629P、FKS2 的 S663P)导致棘白菌素类耐药。经典场景:ICU 患者使用米卡芬净,数周后出现<strong>耐药菌株突破性念珠菌血症</strong>。该物种的另一特征是 <strong>MSH2</strong> 突变(错配修复系统),产生<strong>突变子(超突变)表型</strong>,加速整个进化过程。已有<strong>同时对唑类和棘白菌素类耐药</strong>的分离株报道——此时治疗选择几乎只剩两性霉素 B。</p>' +
    '<p>我们的流程基于<strong>同一患者连续分离株</strong>(治疗前和治疗期间)的纳米孔测序数据,构建关键耐药基因谱,进行 ITS 菌种鉴定,并<strong>将连续分离株相互比较</strong>——追踪患者体内的微观进化。长读长提供靶基因的完整覆盖和 <strong>CNV</strong> 控制(泵和靶标的拷贝数)。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血液及其他无菌部位连续分离株的培养物。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于 ICU 床旁场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生的 HTML 报告 — 菌种鉴定、PDR1/FKS1/FKS2/MSH2 谱、连续分离株的突变动态及<strong>治疗调整建议</strong>;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:耐药、鉴定、微观进化</h2>' +
    '<h3>耐药标志基因</h3>' +
    tbl(['基因', '机制', '临床意义'], [
      ['<strong>PDR1</strong>', '调控因子功能获得性突变 → 外排泵过表达', '获得性<strong>唑类</strong>(氟康唑、伏立康唑)耐药的主要驱动因素'],
      ['<strong>CDR1 / CDR2</strong>', '外排泵(ABC 转运体)', 'PDR1 依赖耐药的效应分子;表达量和拷贝数升高'],
      ['<strong>FKS1</strong>', '热点突变(如 <strong>S629P</strong>)——棘白菌素靶标', '<strong>棘白菌素类</strong>(米卡芬净、卡泊芬净、阿尼芬净)耐药'],
      ['<strong>FKS2</strong>', '热点突变(如 <strong>S663P</strong>)——葡聚糖合酶第二亚基', '在光滑念珠菌中意义不亚于 FKS1——两者必须同时监测'],
      ['<strong>MSH2</strong>', '错配修复 (MMR) 系统缺陷', '<strong>超突变表型</strong> → 加速对任何药物的耐药进化']
    ]) +
    '<h3>菌种鉴定与鉴别诊断</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS</strong>(核糖体 DNA 内转录间隔区)', '<em>C. glabrata</em> / <em>Nakaseomyces glabratus</em> 菌种鉴定'],
      ['<strong>非白念珠菌面板</strong>', '与 <em>C. albicans</em>、<em>C. parapsilosis</em>、<em>C. tropicalis</em> 和 <em>C. auris</em> 鉴别——它们的药敏谱和治疗策略不同']
    ]) +
    '<h3>连续分离株:患者体内的微观进化</h3>' +
    tbl(['分析', '意义'], [
      ['<strong>"治疗前/治疗中"分离株比较</strong>', '检测治疗过程中新出现的 PDR1/FKS1/FKS2 突变——在耐药发生之时即被记录,而非事后发现'],
      ['<strong>长读长 CNV</strong>', '监控 CDR1/CDR2 及靶标拷贝数——扩增会强化耐药表型'],
      ['<strong>超突变特征 (MSH2)</strong>', '预后:MMR 缺陷菌株会更快获得耐药——备用方案需提前准备']
    ]) +
    '<h3>报告中的临床场景</h3>' +
    tbl(['场景', '问题', '基因组学的作用'], [
      ['<strong>经验性氟康唑</strong>', '光滑念珠菌天然 SDD 敏感——标准剂量失效风险', 'ITS 菌种确认 → 及时换用充分方案'],
      ['<strong>棘白菌素治疗中突破性念珠菌血症</strong>', '患者使用米卡芬净数周,培养持续阳性', '在连续分离株中寻找 FKS1/FKS2 突变 → 证实耐药并换药'],
      ['<strong>多重耐药分离株</strong>', '同时对唑类+棘白菌素类耐药', 'PDR1 + FKS 谱 → 为换用<strong>两性霉素 B</strong> 提供依据'],
      ['<strong>复发性念珠菌血症</strong>', '菌株持留还是再次感染', '比较连续分离株基因组:是否为同源菌株']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Glabrata Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CGL-FKS-Caller</strong>', '检测 FKS1/FKS2 热点突变并预测棘白菌素耐药'],
      ['<strong>CGL-Res-Evolution</strong>', '基于 PDR1/MSH2 谱和连续分离株动态预测耐药进化风险'],
      ['<strong>CGL-Species-ID</strong>', '基于 ITS 和基因组特征的非白念珠菌菌种鉴定']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 光滑念珠菌参考基因组 + 非白念珠菌物种面板'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — PDR1/FKS1/FKS2/MSH2 的 SNP,基于长读长覆盖度的 CNV 控制'],
      ['<strong>4. 耐药靶标检出</strong>', '自建靶标数据库(PDR1、CDR1/CDR2、FKS1/FKS2、MSH2)+ 用于菌种鉴定的 ITS'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>向非白念珠菌转移</strong> — 发达国家中非白色念珠菌引起的念珠菌血症占比稳步上升,光滑念珠菌是这一转变的领头羊:按白色念珠菌设计的经验性方案越来越不够用。</li>' +
    '<li><strong>CDC 和 ECDC 的警报</strong> — 棘白菌素耐药光滑念珠菌的增长已被认定为流行病学威胁:棘白菌素类是念珠菌血症一线用药,其失效使临床医生几乎没有安全的选择。</li>' +
    '<li><strong>ICU 实践加剧问题</strong> — 对重症患者常规经验性使用棘白菌素造成持续的选择压力:突破性耐药菌株正是在重症监护室中产生和被筛选出来的。</li>' +
    '<li><strong>微观进化在临床上可测量</strong> — 同一患者的连续分离株显示耐药性在数周而非数年内产生。Edge 设备上的纳米孔测序可实时追踪这一过程,在临床突破发生之前而非之后调整治疗。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 侵袭性念珠菌病与光滑念珠菌</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — 念珠菌血症与耐药监测</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — 光滑念珠菌 (Taxonomy、Bookshelf、PubMed)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 念珠菌病</a></li></ul>';

  /* ── CANDIDA PARAPSILOSIS (近平滑念珠菌) ── */
  ZH['/parapsilosis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_parapsilosis.svg" alt="近平滑念珠菌 — 酵母细胞与导管" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>近平滑念珠菌的鉴定、氟康唑耐药与暴发追踪</h1>' +
    '<p style="font-size:1.2em;color:#555">ERG11 Y132F、暴发分离株 SNP 聚类与物种复合体鉴别 — 新生儿 ICU 中分秒必争</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>近平滑念珠菌</em>(Candida parapsilosis)是一种类酵母真菌,<strong>新生儿重症监护室 (NICU) 暴发</strong>的经典病原体。关键机制是经<strong>医护人员双手</strong>和<strong>侵入性器械</strong>传播:该真菌对聚合物表面生物膜有明显趋向性,因此中心静脉导管和肠外营养系统成为<strong>导管相关念珠菌血症</strong>的入口。历史上近平滑念珠菌被认为毒力低于白色念珠菌,但其暴发能力、在病房内的持留性以及日益增长的耐药性,使其成为新生儿科感染控制的主要难题之一。</p>' +
    '<p>我们的流程基于暴发分离株的纳米孔测序数据,执行<strong>菌种鉴定</strong>(ITS,并与 <em>C. orthopsilosis</em> 和 <em>C. metapsilosis</em> 鉴别——这是流行病学不同的近缘物种复合体)、<strong>AMR 谱</strong>(ERG11 Y132F、TAC1、FKS1)和<strong>基于 SNP 的暴发追踪</strong>——为感染控制提供基因组学答案:是否为同一克隆,来源在哪里——医护人员的手还是设备。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血液分离株、医护人员手和物体表面拭子、导管生物膜。最佳方案:在病房内直接用 <strong>Flongle</strong> 运行,床旁场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向感染控制和临床医生的 HTML 报告 — 菌种鉴定、含治疗建议的 AMR 谱(<strong>ERG11 Y132F 时推荐棘白菌素类</strong>)、暴发分离株 SNP 聚类;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、耐药、暴发</h2>' +
    '<h3>菌种鉴定:物种复合体</h3>' +
    '<p>近平滑念珠菌是一个近缘物种复合体,各物种在流行病学和唑类敏感性上不同;ITS 测序可以可靠区分:</p>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS</strong>(ITS1–5.8S–ITS2)', '狭义近平滑念珠菌 (sensu stricto) 种特异性鉴定'],
      ['<strong>ITS 鉴别 ortho/metapsilosis</strong>', '与 <em>C. orthopsilosis</em> 和 <em>C. metapsilosis</em> 鉴别——复合体中耐药频率不同的物种']
    ]) +
    '<h3>耐药基因:核心是氟康唑</h3>' +
    '<p>主要的新兴问题是通过 <strong>ERG11 Y132F 突变</strong>产生的<strong>氟康唑耐药</strong>(与热带念珠菌相同的突变)。携带 Y132F 的氟康唑耐药近平滑念珠菌暴发已在欧洲、亚洲、拉丁美洲等多国报道;耐药克隆在医院内传播并改变经验性方案。</p>' +
    tbl(['标志物', '机制', '临床意义'], [
      ['<strong>ERG11 Y132F</strong>', '唑类靶标(羊毛甾醇 14α-去甲基化酶)替换', '<strong>关键突变</strong>:氟康唑耐药;Y132F 时报告推荐棘白菌素类'],
      ['<strong>TAC1</strong>(多态性)', 'CDR 外排泵过表达', '增强唑类耐药,表型修饰因子'],
      ['<strong>FKS1</strong>', '棘白菌素靶标(β-1,3-葡聚糖合酶)', '监控棘白菌素类耐药——Y132F 时的首选药物']
    ]) +
    '<h3>暴发追踪</h3>' +
    tbl(['任务', '方法', '报告结果'], [
      ['<strong>分离株关联</strong>', '基于 clair3/medaka 变异的 SNP 聚类', '单一克隆还是多次传入病房'],
      ['<strong>来源</strong>', '将患者分离株与医护人员手和设备拭子比较', '定位储存宿主:医护人员的手 / 导管 / 肠外营养系统'],
      ['<strong>治疗</strong>', 'AMR 谱(ERG11、TAC1、FKS1)', '建议:Y132F 时用棘白菌素类;ERG11 野生型时用氟康唑']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Parapsilosis Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CPAR-Species-ID</strong>', '基于 ITS 鉴别 <em>C. parapsilosis</em> / <em>C. orthopsilosis</em> / <em>C. metapsilosis</em> 复合体'],
      ['<strong>CPAR-Res-Detector</strong>', '基于基因组数据预测耐药谱(ERG11 Y132F、TAC1、FKS1)'],
      ['<strong>CPAR-Outbreak-Tracker</strong>', '暴发分离株 SNP 聚类与来源查找']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 物种复合体参考面板(<em>C. parapsilosis</em>、<em>C. orthopsilosis</em>、<em>C. metapsilosis</em>)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 长读长上的完整基因与分离株组装'],
      ['<strong>4. AMR 标志物检出与 SNP 聚类</strong>', '自建标志物数据库(ERG11、TAC1、FKS1)与暴发分离株 SNP 聚类'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>新生儿 ICU</strong> — 新生儿科近平滑念珠菌暴发是文献中的常见主题:带中心静脉导管和肠外营养的早产儿是最高风险人群。基于 SNP 的克隆追踪能快速找到来源(医护人员的手、设备)并终止暴发。</li>' +
    '<li><strong>地理分布</strong> — 近平滑念珠菌在南欧、拉丁美洲和亚洲的念珠菌血症构成中占比更高,常与白色念珠菌并列为主要病原体。</li>' +
    '<li><strong>新兴耐药</strong> — 携带 ERG11 Y132F 突变的氟康唑耐药近平滑念珠菌暴发已在多国报道;耐药克隆在医院内传播,使经验性治疗转向棘白菌素类。</li>' +
    '<li><strong>感染控制</strong> — 真菌在表面和生物膜上的持留使传统培养监测缓慢;数小时内完成暴发分离株基因组分型,把调查从事后分析变为实时工具。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 侵袭性念珠菌病</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — 近平滑念珠菌(Taxonomy 与文献)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 念珠菌病</a></li></ul>';

  /* ── CANDIDA TROPICALIS & C. KRUSEI (热带念珠菌与克鲁斯念珠菌) ── */
  ZH['/tropicalis/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_tropicalis.svg" alt="热带念珠菌与克鲁斯念珠菌 — 非白念珠菌二重奏" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>热带念珠菌与克鲁斯念珠菌的鉴定与抗真菌耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">亚洲型与先天耐药的念珠菌:菌种鉴定、ERG11/FKS1 谱与耐药克隆追踪</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>"念珠菌病宇宙"栏目以一对具有特殊耐药谱的<strong>非白念珠菌</strong>物种开篇——<em>热带念珠菌</em>(Candida tropicalis)和<em>克鲁斯念珠菌</em>(Candida krusei,有性型 <em>Pichia kudriavzevii</em>)。两者都越来越常引起念珠菌血症,也都打破了针对白色念珠菌设计的标准经验性策略。</p>' +
    '<p><em>热带念珠菌</em>是<strong>亚太地区</strong>念珠菌血症的主要病因之一,也常见于<strong>中性粒细胞减少</strong>的血液科/肿瘤科患者。近年来的关键问题是携带<strong>唑类交叉耐药</strong>的克隆广泛传播(首先在<strong>中国</strong>报道),由 <strong>ERG11</strong> 基因突变(首先是 <strong>Y132F</strong> 和 <strong>A395T</strong>,常联合出现)所致。此类克隆对<strong>氟康唑和伏立康唑</strong>耐药,甚至在<strong>从未使用过唑类药物</strong>的患者中也能检出。这催生了一个讨论中的假说:耐药性存在<strong>环境储存库</strong>,可能与农业中使用唑类杀菌剂有关——典型的<strong>"同一健康" (One Health)</strong> 故事。</p>' +
    '<p><em>克鲁斯念珠菌</em>(<em>Pichia kudriavzevii</em>)具有<strong>先天氟康唑耐药</strong>:这种抗真菌药甚至不等药敏试验结果就不得经验性使用。在<strong>棘白菌素类</strong>的选择压力下,该物种会产生 <strong>FKS1</strong> 突变,使本已有限的武器库进一步收窄。历史事实:该物种以俄罗斯微生物学家<strong>库德里亚夫采夫 (V. I. Kudryavtsev)</strong> 命名,他是酵母分类学研究者。</p>' +
    '<p>我们的流程基于分离株的纳米孔测序数据,执行 <strong>ITS 菌种鉴定</strong>(克鲁斯与热带的鉴别至关重要:两者的起始治疗不同),确定 <strong>AMR 谱</strong>(ERG11 Y132F/A395T、TAC1、FKS1),并基于 SNP 距离<strong>追踪耐药克隆的传播</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:分离株纯培养(血培养、无菌部位)。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,"分离株 → 当班出报告"场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向临床医生/微生物学家的 HTML 报告 — 菌种鉴定、AMR 谱(明确指出克鲁斯念珠菌<strong>禁用氟康唑</strong>)、起始治疗建议;面向流行病学家的 SNP 聚类;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、耐药、克隆</h2>' +
    '<h3>菌种鉴定</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS (ITS1–5.8S–ITS2)</strong>', '种特异性鉴定:<em>C. tropicalis</em> vs <em>C. krusei</em>——起始治疗根本不同'],
      ['<strong>非白念珠菌面板</strong>', '与 <em>C. albicans</em>、<em>C. glabrata</em>、<em>C. parapsilosis</em> 及其他复合体物种鉴别']
    ]) +
    '<h3>唑类耐药基因</h3>' +
    tbl(['基因 / 突变', '物种', '临床意义'], [
      ['<strong>ERG11 Y132F</strong>', '<em>C. tropicalis</em>', '亚洲克隆唑类交叉耐药(氟康唑 + 伏立康唑)的关键突变'],
      ['<strong>ERG11 A395T</strong>', '<em>C. tropicalis</em>', '常与 Y132F 联合——高水平唑类耐药'],
      ['<strong>TAC1</strong>', '<em>C. tropicalis</em>', 'ABC 转运体调控因子;过表达增强唑类外排'],
      ['<strong>ERG11(野生型)</strong>', '<em>C. krusei</em>', '靶标结构特征 → <strong>先天氟康唑耐药</strong>(非获得性!)']
    ]) +
    '<h3>棘白菌素类耐药</h3>' +
    tbl(['基因', '物种', '临床意义'], [
      ['<strong>FKS1(热点)</strong>', '两个物种', '棘白菌素压力下的突变(卡泊芬净、米卡芬净、阿尼芬净)——对武器库本已狭窄的克鲁斯念珠菌尤为关键']
    ]) +
    '<h3>报告中的经验性治疗</h3>' +
    tbl(['场景', '方案', '基因组学的作用'], [
      ['<strong>ITS → <em>C. krusei</em></strong>', '氟康唑<strong>禁用</strong>(先天耐药)——以棘白菌素或两性霉素 B 起始', 'FKS1 谱 → 无热点突变时保留棘白菌素'],
      ['<strong>ITS → <em>C. tropicalis</em>,ERG11 Y132F/A395T+</strong>', '可能存在唑类交叉耐药——优选棘白菌素', 'FKS1 谱 + 耐药克隆 SNP 聚类'],
      ['<strong>ITS → <em>C. tropicalis</em>,ERG11 野生型</strong>', '唑类仍是选择', '确认敏感背景,无 TAC1 过表达']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Tropicalis Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CTR-Species-ID</strong>', '基于 ITS 的菌种鉴定:克鲁斯 vs 热带及与其他非白念珠菌鉴别'],
      ['<strong>CTR-Azole-Res</strong>', '基于 ERG11 (Y132F/A395T) 和 TAC1 谱预测唑类交叉耐药'],
      ['<strong>CTR-Clone-Tracker</strong>', 'SNP 聚类与耐药克隆传播追踪']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 热带念珠菌、克鲁斯念珠菌 (<em>P. kudriavzevii</em>) 及其他非白念珠菌参考面板'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. AMR 基因检出</strong>', '自建 ERG11/TAC1/FKS1 等位基因与 ITS 标志物数据库,兼容 CARD/ResFinder 格式'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>念珠菌血症菌种谱转变</strong> — 非白念珠菌占比稳步上升;在亚太地区热带念珠菌是念珠菌血症的领先病原之一,针对白色念珠菌的经验性氟康唑越来越脱靶。</li>' +
    '<li><strong>来自亚洲的唑类耐药热带念珠菌克隆</strong> — ERG11 Y132F/A395T 克隆广泛传播(首先在中国),包括从未用过唑类药物患者的分离株。这使没有 AMR 谱的菌种鉴定只算半个答案。</li>' +
    '<li><strong>克鲁斯念珠菌的先天耐药</strong> — 唯一一种氟康唑原则上禁用的常见念珠菌。这里的经验性用药错误不是概率问题,而是规则。</li>' +
    '<li><strong>"同一健康"桥梁</strong> — 农业唑类杀菌剂与临床分离株唑类耐药之间讨论中的关联,指向耐药克隆可能存在环境储存库。同样的"田间杀菌剂 → 临床耐药"逻辑也适用于植物病理学——参见农业栏目中的<a href="/phytophthora/">晚疫病</a>。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.cdc.gov/">CDC — 念珠菌血症与侵袭性念珠菌病</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — 热带念珠菌 / 克鲁斯念珠菌 (Taxonomy、PubMed)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 念珠菌病(侵袭性)</a></li></ul>';

  /* ── MALASSEZIA (马拉色菌) ── */
  ZH['/malassezia/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_malassezia.svg" alt="马拉色菌 — 带脂滴的出芽酵母" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>马拉色菌:新生儿重症监护室真菌血症与人畜共患暴发</h1>' +
    '<p style="font-size:1.2em;color:#555">亲脂性酵母的菌种鉴定、暴发源头 SNP 溯源与唑类耐药检测——在培养无能为力之处</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>马拉色菌属</em>(Malassezia)是一类<strong>亲脂性担子菌酵母</strong>(这一点至关重要:既不是念珠菌,也不是子囊菌,而是外担菌纲 Exobasidiomycetes),是人类和温血动物皮肤真菌群落的优势属。该属包含<strong>约 18 个物种</strong>;<em>球形马拉色菌</em>(M. globosa)和<em>限制性马拉色菌</em>(M. restricta)与头皮屑和脂溢性皮炎相关,<em>糠秕马拉色菌</em>(M. furfur)则与花斑癣和马拉色菌毛囊炎相关。坦率地说:<strong>皮肤型属于临床诊断</strong>,刮片镜检已经足够,测序在那里是多余的。我们的流程瞄准的是培养和表型方法系统性失灵的领域——侵袭性感染与暴发流行病学。</p>' +
    '<p><strong>核心一:新生儿重症监护室 (NICU) 真菌血症。</strong>长期接受含<strong>脂质乳剂 (Intralipid)</strong> 肠外营养的早产儿是马拉色菌真菌血症的经典人群:该菌依赖脂质,直接以输注液中的脂质为营养,在中心静脉导管上形成<strong>导管相关真菌血症</strong>。临床表现不具特异性(带导管患儿的发热、血小板减少、呼吸障碍),而马拉色菌在标准血培养基中<strong>不生长</strong>——不添加脂质,培养便始终无菌,诊断被系统性地延误,甚至根本无法做出。</p>' +
    '<p><strong>核心二:培养艰难,分子鉴定更快更可靠。</strong>脂质依赖性要求特殊培养基(添加脂质的 Dixon 琼脂),生长缓慢(以天计),且表型方法<strong>无法区分该属约 18 个物种</strong>。基于 ITS/LSU 从血液、导管尖端或皮肤直接进行分子鉴定,可在数小时内给出种级答案——无需等待可能永远长不出来的培养。</p>' +
    '<p><strong>核心三:人畜共患暴发与"同一健康" (One Health)。</strong><em>厚皮马拉色菌</em>(M. pachydermatis)是该属唯一<strong>不依赖脂质</strong>的物种,是犬皮肤和耳道的常驻菌。已有文献记载的 NICU 暴发中,工作人员<strong>将真菌从自家宠物经双手带入</strong>,通过导管感染早产儿。基于基因组数据的 <strong>SNP 溯源</strong>将临床分离株与源头(某位员工的宠物)关联起来——这把防疫措施从"全面消毒"变为对源头的精准清除。"同一健康"的闭环由耐药性完成:患马拉色菌性耳炎和皮炎的犬在兽医实践中被大规模使用<strong>唑类药物</strong>治疗,耐唑类 <em>M. pachydermatis</em> 菌株已有报道——这是紧邻早产儿病房的潜在耐药储存库。相关主题还有同一 NICU 中近平滑念珠菌的导管相关暴发:参见<a href="/parapsilosis/">近平滑念珠菌页面</a>。</p>' +
    '<p>我们的流程基于纳米孔测序数据,执行<strong>菌种鉴定</strong>(全长 ITS + D1/D2 LSU)、用于暴发溯源的 <strong>SNP 分型</strong>,以及基于 ERG11 和外排机制的<strong>唑类耐药检测</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血液、导管尖端、皮肤刮片、犬外耳道分泌物(兽医样本)。皮肤样本为<strong>低生物量</strong>,因此最佳方案是扩增子方法 (ITS/D1D2) 并在 <strong>Flongle</strong> 上快速运行 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向 NICU 微生物学家/流行病学家的 HTML 报告 — 菌种鉴定、ERG11/外排谱、暴发分离株 SNP 聚类并指明最可能的源头;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、耐药、溯源</h2>' +
    '<h3>菌种鉴定</h3>' +
    '<p>表型方法无法区分马拉色菌属各物种;金标准是分子基因座:</p>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS1 / ITS2(全长 ITS)</strong>', '该属的主要条形码;纳米孔测序可在单条读长中覆盖整个 ITS——无需组装即可达到种级分辨率'],
      ['<strong>D1/D2(LSU,26S rRNA)</strong>', '经典的酵母鉴定基因座;与 ITS 互为印证并解决疑难病例'],
      ['<strong>目标物种</strong>', '<em>糠秕马拉色菌</em>(NICU 真菌血症、花斑癣)、<em>厚皮马拉色菌</em>(犬源人畜共患)、<em>球形马拉色菌</em>与<em>限制性马拉色菌</em>(皮肤真菌群落优势种、脂溢性皮炎)']
    ]) +
    '<h3>耐药基因</h3>' +
    '<p>唑类药物是治疗(氟康唑、伊曲康唑)和兽医实践的基石,但耐药性正在上升:</p>' +
    tbl(['机制', '标志物', '临床意义'], [
      ['<strong>靶点突变</strong>', '<strong>ERG11</strong>(羊毛甾醇 14α-去甲基化酶)', '点突变降低唑类结合——氟康唑耐药的主要机制'],
      ['<strong>外排泵</strong>', 'ABC 转运体(MDR 泵)', '将唑类泵出细胞;调控因子的过表达与超功能等位基因'],
      ['<strong>兽医储存库</strong>', '<em>厚皮马拉色菌</em>的 ERG11 + 外排', '犬体内的唑类选择 → 耐药菌株进入 NICU 可达范围']
    ]) +
    '<h3>流行病学溯源</h3>' +
    tbl(['方法', '任务'], [
      ['<strong>SNP 分型</strong>(克隆核心基因组)', 'NICU 暴发分离株聚类:单一源头 vs 独立带入'],
      ['<strong>"人–宠物"比对</strong>', '证明<em>厚皮马拉色菌</em>由某位员工的犬只人畜共患带入——是采取针对性措施而非关闭病房的依据'],
      ['<strong>与导管的关联</strong>', '血液分离株与导管尖端分离株的一致性证实导管相关真菌血症']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Malassezia Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>MAL-Species-ID</strong>', '基于全长 ITS + D1/D2 的菌种鉴定(覆盖该属全部约 18 个物种)'],
      ['<strong>MAL-Azole-Res</strong>', '基于 ERG11 突变和外排泵特征预测唑类耐药'],
      ['<strong>MAL-Outbreak-Tracer</strong>', '暴发分离株 SNP 聚类并评估源头(患者/员工/宠物)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>;低生物量与宿主 DNA 混入控制'],
      ['<strong>2. 扩增子靶向 (ITS/D1D2)</strong>', 'ITS1/ITS2 与 D1/D2 LSU 引物;完整扩增子读长共识序列'],
      ['<strong>3. 比对 (Mapping)</strong>', '<code>minimap2</code> — 马拉色菌属参考面板(<em>糠秕马拉色菌</em>、<em>厚皮马拉色菌</em>、<em>球形马拉色菌</em>、<em>限制性马拉色菌</em>等)'],
      ['<strong>4. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 用于溯源的 ERG11 与 SNP 核心'],
      ['<strong>5. 分离株聚类</strong>', 'SNP 矩阵、暴发系统发育分析、与兽医分离株比对'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>看不见的 NICU 真菌血症</strong> — 马拉色菌在标准血培养中不生长:没有脂质添加、没有实验室的警觉,培养就是无菌,而带导管、接受肠外营养脂质乳剂的患儿仍在输注喂养真菌的营养液。从血液直接进行分子诊断摆脱了对培养的依赖,将出结果时间从数天缩短到数小时。</li>' +
    '<li><strong>有文献记载的人畜共患暴发</strong> — NICU 工作人员从家养犬携带<em>厚皮马拉色菌</em>的案例在文献中多次报道;SNP 溯源首次让调查有据可依而非基于推测,使关闭病房变为清除具体源头。</li>' +
    '<li><strong>"同一健康"与唑类选择</strong> — 兽医对犬马拉色菌性耳炎和皮炎使用唑类药物,在最脆弱的患者人群近在咫尺之处形成了耐药菌株储存库;ERG11/外排谱监测需要覆盖"人–动物"屏障的两侧。</li>' +
    '<li><strong>可控的皮肤真菌群落</strong> — <em>球形马拉色菌</em>和<em>限制性马拉色菌</em>在健康人皮肤上占主导地位,其失衡与头皮屑、脂溢性皮炎和特应性皮炎相关;精准的种级分辨率 (ITS/D1D2) 为表型真菌学无法企及的真菌群落研究开辟了道路。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 花斑癣 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 真菌感染概述</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 侵袭性念珠菌病与新生儿真菌感染</a></li></ul>';

  /* ── CRYPTOCOCCUS (隐球菌) ── */
  ZH['/cryptococcus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cryptococcus.svg" alt="新生隐球菌 — 带巨大多糖荚膜的酵母细胞" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>新生隐球菌 / 格特隐球菌:菌种鉴定、分子分型与唑类耐药</h1>' +
    '<p style="font-size:1.2em;color:#555">数小时内完成菌种鉴别、CNV 与 1 号染色体二体检测——CrAg 和培养都做不到这一点</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>新生隐球菌</em>(Cryptococcus neoformans)是一种带荚膜的担子菌酵母;<strong>隐球菌性脑膜炎是 HIV 高流行国家成人脑膜炎的首要病因</strong>:估计每年约有 <strong>112 000–152 000 例死亡</strong>,占全部 HIV 相关死亡的 <strong>19%</strong>。2022 年,<strong>WHO 将隐球菌列入真菌重点病原体清单——关键优先级组</strong>。该病在中国的意义也日益上升——包括<strong>非 HIV</strong> 患者,这模糊了人们习以为常的临床画像。</p>' +
    '<p>另一个独立的问题是<em>格特隐球菌</em>(C. gattii):这个历史上的"热带"菌种会感染<strong>免疫功能正常</strong>的人群(著名的温哥华岛及太平洋西北地区暴发,分布范围随气候变化不断扩大),病程更重,可伴神经梗阻性并发症,对氟康唑的反应也更差。该属的标志性特征是<strong>巨大的多糖荚膜</strong>:既是主要毒力因子,同时也是经典 PCR DNA 提取的障碍(但对纳米孔文库制备不是)。</p>' +
    '<p>我们的流程基于纳米孔测序数据,执行<strong>菌种鉴定</strong>(<em>neoformans</em> vs <em>gattii</em>——两者在预后上是不同的疾病),确定<strong>分子型</strong> VNI–VNIV(<em>neoformans</em>)和 VGI–VGIV(<em>gattii</em>),并构建<strong>唑类耐药谱</strong>——包括短读长无法看到的<strong>非整倍体与 CNV</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:纯培养分离株、脑脊液。最佳方案 — 在 <strong>Flongle</strong> 上运行 <strong>ITS / D1–D2</strong> 扩增子,实现快速菌种鉴定 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — 菌种、分子型、氟康唑药敏谱(ERG11、AFR1、1 号染色体二体)、毒力标志物;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、分型、耐药</h2>' +
    '<h3>菌种鉴定与分子分型</h3>' +
    '<p>CrAg(乳胶凝集/侧向层析)是快速且廉价的筛查手段,但<strong>不能区分菌种和分子型</strong>,对耐药也一无所知;培养需要数天。分子诊断能同时回答这两个问题:</p>' +
    tbl(['标志物', '意义'], [
      ['<strong>ITS</strong>(rDNA 内转录间隔区)', '菌种鉴定:<em>新生隐球菌</em> vs <em>格特隐球菌</em>,并与其他酵母鉴别'],
      ['<strong>D1/D2 LSU</strong>(rDNA 大亚基结构域)', '菌种确认、种复合体内部的系统发育分辨率'],
      ['<strong>分子型 VNI–VNIV</strong>', '<em>新生隐球菌</em>基因型:VNI 在临床上占主导;VNIV 为杂交型,较少见'],
      ['<strong>分子型 VGI–VGIV</strong>', '<em>格特隐球菌</em>基因型:VGII — 太平洋西北暴发株;分子型影响预后和对氟康唑的反应']
    ]) +
    '<h3>唑类耐药 — 在资源有限地区至关重要</h3>' +
    '<p>在无法获得两性霉素 B 的地区(大多数 HIV 流行地区),氟康唑是治疗的基石,因此唑类耐药直接决定结局:</p>' +
    tbl(['标志物', '机制', '临床意义'], [
      ['<strong>ERG11</strong>', '氟康唑靶点(羊毛甾醇 14α-去甲基化酶)点突变', '经典的靶点介导耐药'],
      ['<strong>AFR1</strong>', '外排泵(ABC 转运体)', '将唑类泵出细胞'],
      ['<strong>1 号染色体二体</strong>', '非整倍体:<strong>ERG11 与 AFR1 位于同一条染色体上</strong>——额外拷贝使靶点和外排泵同时加倍', '<strong>异质性耐药</strong>的主要机制:带二体的亚群在氟康唑下存活'],
      ['<strong>ERG11/AFR1 基因座 CNV</strong>', '无点突变的扩增', '面向 SNV 的检测看不到;长读长 + 覆盖度分析可直接检出']
    ]) +
    '<p>经 1 号染色体二体产生的异质性耐药,与<strong>白色念珠菌的 5L 等臂染色体</strong>属于同一类机制(参见相邻卡片<a href="/albicans/">/albicans/</a>):纳米孔可在同一次运行中与 SNV 一起读取非整倍体和 CNV。</p>' +
    '<h3>毒力因子</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>CAP59 / CAP64</strong>', '多糖荚膜合成基因——主要毒力因子;无荚膜突变体无毒力'],
      ['<strong>LAC1</strong>', '漆酶、黑色素合成——抵御巨噬细胞内氧化应激,毒力标志物']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Cryptococcus Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>CRY-Species-Typer</strong>', '基于 ITS 和 D1/D2 鉴别<em>新生隐球菌</em> / <em>格特隐球菌</em>及分子型 VNI–VNIV / VGI–VGIV'],
      ['<strong>CRY-Azole-Profiler</strong>', '基于 ERG11、AFR1 和 CNV 预测氟康唑耐药'],
      ['<strong>CRY-Heterores-Scanner</strong>', '检测异质性耐药亚群:基于覆盖度谱的 1 号染色体二体与非整倍体']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — <em>新生隐球菌</em>(H99)与<em>格特隐球菌</em>(WM276)参考序列'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. CNV 与非整倍体</strong>', '<code>sniffles2</code>、逐染色体覆盖度分析 — chr1 二体、深覆盖下的异质性耐药亚群'],
      ['<strong>5. 标志物检测</strong>', '自建数据库:ITS、D1/D2、ERG11、AFR1、CAP59/CAP64、LAC1、分子型标志物'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>WHO 关键优先级</strong> — 隐球菌性脑膜炎每年导致 112 000–152 000 人死亡,占 HIV 相关死亡的 19%;2022 年 WHO 将隐球菌列入真菌重点病原体的关键优先级组。</li>' +
    '<li><strong>仅有 CrAg 不够</strong> — 抗原检测只回答"是/否",不区分菌种和分子型,对耐药保持沉默;分子诊断把筛查变成预后判断。</li>' +
    '<li><strong>格特隐球菌正在改写版图</strong> — 感染免疫功能正常者、病程严重且对氟康唑反应较差的这一菌种,正随气候变化扩大分布;菌种鉴别在热带以外也变得必要,包括中国日益增多的非 HIV 病例。</li>' +
    '<li><strong>异质性耐药对短读长不可见</strong> — 携带 ERG11+AFR1 的 1 号染色体二体是一种非整倍体机制,只有长读长结合 CNV 分析才能可靠看到;逻辑与<a href="/albicans/">白色念珠菌</a>相同。</li>' +
    '<li><strong>荚膜不是障碍</strong> — 多糖荚膜会妨碍 PCR 提取,但不妨碍纳米孔文库制备;Flongle 上的 ITS/D1–D2 扩增子可在床旁 (point-of-care) 场景下完成菌种鉴定。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789240060241">WHO — 真菌重点病原体清单 (2022)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 新生隐球菌与格特隐球菌感染</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/">NCBI — PubMed / Bookshelf</a></li></ul>';

  /* ── PNEUMOCOCCUS (肺炎链球菌) ── */
  ZH['/pneumoniae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pneumoniae.svg" alt="肺炎链球菌 — 柳叶刀状双球菌" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>肺炎链球菌血清分型与青霉素耐药检测</h1>' +
    '<p style="font-size:1.2em;color:#555">镶嵌型 pbp 基因、荚膜血清型与 AMR 耐药谱——长读长能看到表型无法预测的东西</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>肺炎链球菌</em>(Streptococcus pneumoniae,肺炎球菌)是一种革兰氏阳性<strong>柳叶刀状双球菌</strong>,在血琼脂上呈 <strong>α-溶血</strong>,具有明显的多糖荚膜。它是<strong>社区获得性肺炎</strong>、细菌性<strong>脑膜炎</strong>和儿童<strong>急性中耳炎</strong>的首要病因,也可引起老年人鼻窦炎和菌血症。空气飞沫传播和鼻咽部定植(健康儿童携带率高达 20–40%)使肺炎球菌成为人群中的常驻菌——也是侵袭性感染的持续来源。</p>' +
    '<p>肺炎球菌的关键基因组主题是<strong>通过镶嵌型 pbp2x、pbp2b 和 pbp1a 基因产生青霉素耐药</strong>。肺炎球菌具有天然感受态:它摄取 mitis 群共生链球菌(<em>S. mitis</em>、<em>S. oralis</em>)的 DNA,并将其片段整合进自身的青霉素结合蛋白基因。由此产生的<strong>镶嵌型 PBP</strong> 对 β-内酰胺类亲和力降低,MIC 随外源片段的累积呈阶梯式上升。表型检测无法预测这种镶嵌结构——而<strong>测序能直接看到它</strong>,逐块解析。</p>' +
    '<p>第二个主题是<strong>基于荚膜 cps 基因座的血清分型</strong>:已知<strong>超过 90 种血清型</strong>,而荚膜正是结合疫苗的靶点。PCV13 引入后,群体结构发生了偏移:<strong>非疫苗血清型(19A、22F、33F、8 等)</strong>正在上升——这是典型的疫苗逃逸,需要持续的基因组监测。WGS 血清分型(SeroBA 方法)比荚膜肿胀反应 (Quellung) 更准确,且无需抗血清面板。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:痰液、脑脊液、血液、鼻咽拭子。长度 <strong>2–3 kb</strong> 的镶嵌型 pbp 基因和<strong>约 10–20 kb</strong> 的荚膜基因座可完整落入纳米孔长读长——这是 <strong>MinION 配 Flongle</strong> 床旁 (point-of-care) 场景 (Edge) 的理想用例。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — 菌种鉴定、荚膜血清型、药敏谱(β-内酰胺类、大环内酯类、氟喹诺酮类)并附镶嵌型 pbp 解读;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、耐药、血清型</h2>' +
    '<h3>菌种鉴定</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>lytA</strong>(自溶素)', '肺炎球菌菌种鉴定的金标准'],
      ['<strong>cpsA</strong> (wzg)', '荚膜基因座保守基因;确认菌种并作为血清分型的入口'],
      ['<strong>16S rRNA</strong>', '与 mitis 群共生链球菌(<em>S. mitis</em>、<em>S. oralis</em>、<em>S. pseudopneumoniae</em>)鉴别']
    ]) +
    '<h3>β-内酰胺类:镶嵌型 PBP 基因</h3>' +
    '<p>肺炎球菌的青霉素耐药既不是点突变也不是质粒,而是通过与共生链球菌重组拼装起来的<strong>外源片段镶嵌结构</strong>。ONT 长读长可完整读取这类基因,不会把镶嵌结构打断成短片段。</p>' +
    tbl(['基因', '靶标', '临床意义'], [
      ['<strong>pbp2x</strong>', 'PBP2x', '对青霉素和第三代头孢菌素耐药的首要决定因子'],
      ['<strong>pbp2b</strong>', 'PBP2b', '第二个关键决定因子;镶嵌型 pbp2x + pbp2b 是临床青霉素耐药的最低条件'],
      ['<strong>pbp1a</strong>', 'PBP1a', '将 MIC 推至高水平,包括脑膜炎时的头孢曲松耐药']
    ]) +
    '<h3>大环内酯类与氟喹诺酮类</h3>' +
    tbl(['标志物', '抗生素类别', '临床意义'], [
      ['<strong>ermB</strong>', '大环内酯类 (MLSB)', '23S rRNA 甲基化——对阿奇霉素和克拉霉素的高水平耐药'],
      ['<strong>mefA</strong>', '大环内酯类', '外排泵;中度耐药,常位于 Tn1207.3 元件上'],
      ['<strong>gyrA / parC</strong>', '氟喹诺酮类', 'QRDR 点突变(Ser81、Asp83 等)——对左氧氟沙星和莫西沙星耐药']
    ]) +
    '<h3>荚膜基因座与血清型</h3>' +
    tbl(['要素', '意义'], [
      ['<strong>cps 基因座(约 10–20 kb)</strong>', '荚膜多糖的完整合成通路;基因座结构决定血清型(SeroBA 方法)'],
      ['<strong>PCV13 疫苗血清型</strong>', '1、3、4、5、6A、6B、7F、9V、14、18C、19F、23F——监测疫苗接种后其占比变化'],
      ['<strong>非疫苗("逃逸")血清型</strong>', '<strong>19A、22F、33F、8</strong>、15A、35B 等——PCV13 引入后上升;需要监测并修订疫苗面板']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Pneumoniae Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>SPN-PBP-Mosaic</strong>', '重建 pbp2x/pbp2b/pbp1a 镶嵌结构并预测青霉素和头孢曲松 MIC'],
      ['<strong>SPN-SeroTyper</strong>', '基于 cps 基因座的 WGS 血清分型(SeroBA 方法),检出非疫苗血清型'],
      ['<strong>SPN-Res-Detector</strong>', '基于基因组数据预测完整 AMR 耐药谱(β-内酰胺类、大环内酯类、氟喹诺酮类)']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 肺炎球菌及 mitis 群链球菌参考序列'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. AMR 基因与 pbp 镶嵌结构检出</strong>', '自建 pbp 等位基因与耐药基因数据库,兼容 CARD/ResFinder'],
      ['<strong>5. 基于 cps 基因座的血清分型</strong>', '荚膜基因座数据库(SeroBA 方法),基因座长读长组装'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>疾病负担</strong> — 肺炎球菌仍是下呼吸道感染死亡的首要细菌性病因:据 WHO 估计每年数十万人死亡,主要是 5 岁以下儿童和老年人。脑膜炎和菌血症要求立即给予恰当治疗。</li>' +
    '<li><strong>镶嵌结构而非点突变</strong> — 肺炎球菌的青霉素耐药通过来自共生链球菌的水平转移演化。表型微生物学只能看到最终的 MIC;测序能揭示 pbp 镶嵌结构本身,并在培养结果出来之前作出预测——这对以小时计的脑膜炎至关重要。</li>' +
    '<li><strong>疫苗逃逸</strong> — 结合疫苗大幅降低了疫苗血清型的发病率,但生态位被非疫苗血清型(19A、22F、33F、8)占据。血清型基因组监测是现代肺炎球菌流行病学的必备组成部分,也是更新疫苗面板 (PCV15/PCV20) 的基础。</li>' +
    '<li><strong>长读长解决问题</strong> — 镶嵌型 pbp(2–3 kb)和荚膜基因座(10–20 kb)可被纳米孔读长完整覆盖,无组装缺口;紧凑的 MinION + Flongle 组合使此类分析能以 Edge 形态部署在临床实验室旁。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 肺炎链球菌 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 肺炎球菌性疾病</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — 肺炎球菌疫苗</a></li>' +
    '<li>📄 <a href="https://www.microbiologyresearch.org/">SeroBA:基于 WGS 的肺炎链球菌快速血清分型 (Microbial Genomics)</a></li></ul>';

  /* ── GAS (A组链球菌) ── */
  ZH['/pyogenes/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_pyogenes.svg" alt="化脓性链球菌 — 成链状排列的球菌" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>化脓性链球菌 emm 分型与耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">emm 分型、超抗原毒素与大环内酯类耐药——疑似侵袭性 GAS 时数小时出结果</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>化脓性链球菌</em>(Streptococcus pyogenes,A 组 β-溶血性链球菌,<strong>GAS</strong>)是革兰氏阳性球菌,呈链状排列(故名"链"球菌),也是最具"人类专一性"的病原体之一:仅定植和感染人类。疾病谱异常宽广:从<strong>链球菌性咽炎、猩红热和丹毒</strong>到<strong>侵袭性感染</strong>——坏死性筋膜炎和链球菌中毒性休克综合征 (STSS),病死率 <strong>30–70%</strong>。另有单独的<strong>非化脓性并发症</strong>:风湿热和链球菌感染后肾小球肾炎,决定了心内科和肾内科的长期疾病负担。</p>' +
    '<p>我们的流程基于纳米孔测序数据执行 <strong>emm 分型</strong>(基于编码 M 蛋白的 <em>emm</em> 基因 5\' 端)——GAS 流行病学的金标准,已知 <strong>250 余种型别</strong>;确定<strong>超抗原毒素谱</strong>(speA、speC、ssa)和<strong>大环内酯类耐药基因</strong>(ermB、mefA)。测序在 emm 分型中取代 Sanger 法,并同时给出毒力和药敏答案——一次运行全部完成。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:咽拭子、伤口分泌物、病灶穿刺液、血液。基因组很小(约 1.9 Mb):床旁场景 (Edge) 最优方案是在 <strong>Flongle</strong> 上做 emm 扩增子测序;侵袭性感染则做全基因组。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告 — emm 型别、毒素谱(STSS 风险)、大环内酯类耐药标志物及经验性用药建议;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:emm 分型、毒素、耐药</h2>' +
    '<h3>emm 分型与流行病学</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>emm</strong>(5\' 端,M 蛋白高变区)', 'GAS 分型金标准:250 余种型别;ONT 扩增子完全取代 Sanger,包括 Sanger 难以处理的混合读取'],
      ['<strong>emm1 / M1global 克隆</strong>', '侵袭性感染的优势克隆:STSS 与坏死性筋膜炎暴发全球上升,毒力增强(speA 高表达)'],
      ['<strong>emm12</strong>', '中国及东亚猩红热暴发的主要型别'],
      ['<strong>hasA</strong>(透明质酸荚膜操纵子)', '荚膜为毒力因子;黏液型 (mucoid) 菌株与风湿热及侵袭性感染相关'],
      ['<strong>16S rRNA</strong>', '与 <em>S. dysgalactiae</em>、<em>S. agalactiae</em> 及其他 β-溶血性链球菌鉴别']
    ]) +
    '<h3>超抗原毒素</h3>' +
    '<p>超抗原可非特异性激活多达 20% 的 T 淋巴细胞 → 细胞因子风暴与 STSS。其谱决定重症风险,并有助于调查克隆性暴发:</p>' +
    tbl(['基因', '毒素', '意义'], [
      ['<strong>speA</strong>', '致热外毒素 A', 'M1global 克隆 (emm1) 和重症 STSS 的关键标志物'],
      ['<strong>speC</strong>', '致热外毒素 C', '经典的 STSS 与猩红热相关毒素'],
      ['<strong>ssa</strong>', '链球菌超抗原 SSA', '侵袭性菌株标志物,暴发中常与 speA/speC 伴随']
    ]) +
    '<h3>耐药基因</h3>' +
    '<p>一个独特的事实:<strong>青霉素至今仍普遍有效</strong>——有观察史以来从未描述过耐青霉素的 GAS 菌株。但作为 β-内酰胺过敏时二线用药的大环内酯类正在失效:<strong>中国 GAS 对红霉素的耐药率超过 90%</strong>,这使 ermB/mefA 的基因组学检查成为临床必需。</p>' +
    tbl(['基因', '抗生素类别', '临床意义'], [
      ['<strong>ermB</strong>', '大环内酯类 + 林可酰胺类(MLSB 表型,组成型)', '对红霉素、阿奇霉素和<strong>克林霉素</strong>耐药——在中国占主导'],
      ['<strong>mefA</strong>', '大环内酯类(M 表型,外排)', '对 14、15 元环大环内酯类耐药;克林霉素仍保持活性']
    ]) +
    '<h3>报告中的经验性治疗</h3>' +
    tbl(['临床类型', '方案', '基因组学的作用'], [
      ['<strong>咽炎 / 猩红热</strong>', '青霉素(阿莫西林)10 天;过敏者用大环内酯类', 'ermB/mefA 谱 → 选择有效的大环内酯或头孢菌素'],
      ['<strong>侵袭性 GAS(筋膜炎、STSS)</strong>', '急诊外科清创 + 青霉素 G + <strong>克林霉素</strong>(抑制毒素合成)', '快速确认 GAS 及 speA/speC/ssa 谱;ermB 排除克林霉素'],
      ['<strong>携带状态 / 流行病学监测</strong>', '集体机构暴发时进行根除', 'emm 分型用于确认病例间的克隆关联']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Pyogenes Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>SPY-Emm-Typer</strong>', '基于 emm 基因 5\' 端扩增子的 emm 分型,包括新型变异'],
      ['<strong>SPY-Res-Detector</strong>', '预测大环内酯类耐药(ermB/mefA 及 23S/L4/L22 点突变)'],
      ['<strong>SPY-Invasive-Risk</strong>', '基于超抗原与荚膜谱评估侵袭性病程风险']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — β-溶血性链球菌参考面板(<em>S. pyogenes</em>、<em>S. dysgalactiae</em>、<em>S. agalactiae</em>)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code>'],
      ['<strong>4. emm 分型与毒素/AMR 检出</strong>', 'CDC Blast 型别 emm 数据库,自建超抗原与耐药基因数据库,兼容 CARD/ResFinder'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>猩红热回归</strong> — 经历数十年下降后,GAS 正在全球范围内回升:英国和东亚猩红热发病率创纪录,欧洲和澳大利亚 M1global 克隆侵袭性感染上升。流行病学监测需要大规模 emm 分型,而 Sanger 法已成为瓶颈。</li>' +
    '<li><strong>中国:大环内酯类失效</strong> — 中国 GAS 对红霉素耐药率超过 90%(以 ermB、MLSB 表型为主):青霉素过敏时经验性使用大环内酯类,在当地若无基因组学验证几乎失去意义。快速的 emm+AMR 答案对该地区尤为关键。</li>' +
    '<li><strong>侵袭性感染争分夺秒</strong> — 坏死性筋膜炎和 STSS 要求在最初数小时内完成急诊手术和正确的抗菌治疗;在 Edge 设备上确认 GAS 及超抗原谱,把获得答案的时间从数天缩短到数小时。</li>' +
    '<li><strong>风湿热</strong> — 在中低收入国家,风湿性心脏病仍是儿童获得性心脏瓣膜病的首要病因;咽炎时彻底清除 GAS(确认药敏、emm 监测)是预防的基础。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — A 组链球菌感染 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — A 组链球菌:emm 分型与监测</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — 猩红热与侵袭性 GAS 动态</a></li></ul>';

  /* ── GBS (无乳链球菌/B组链球菌) ── */
  ZH['/agalactiae/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_agalactiae.svg" alt="无乳链球菌 — 成对球菌与短链" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>无乳链球菌 (GBS) 血清分型与耐药性检测</h1>' +
    '<p style="font-size:1.2em;color:#555">B 组链球菌:血清型、CC17 克隆与耐药标志物——数小时出结果,就在产房</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>无乳链球菌</em>(Streptococcus agalactiae)是革兰氏阳性 B 组球菌 (GBS),可无害地定植于 <strong>10–30% 孕妇</strong>的胃肠道和泌尿生殖道,却同时是<strong>新生儿脓毒症和脑膜炎的首要病因</strong>。临床上分两型:<strong>早发型(出生 7 天内)</strong>——分娩时由定植母亲垂直传播;以及<strong>晚发型(3 个月内)</strong>——以脑膜炎为主。若无分娩期预防,多达半数受感染新生儿发病;采取预防后风险下降数十倍。标准做法是在孕 <strong>35–37 周</strong>行拭子培养筛查:发现定植即给予<strong>青霉素</strong>分娩期预防。问题在于培养需 <strong>18–48 小时</strong>,对未筛查即入院分娩的产妇毫无帮助——这正是需要快速分子诊断的场景。</p>' +
    '<p>我们的流程基于纳米孔测序数据执行<strong>菌种鉴定</strong>(cfb——CAMP 因子)、<strong>荚膜血清分型</strong>(基于 cps 基因的 Ia、Ib、II–IX 型)、检出<strong>高毒力克隆 CC17 (ST-17)</strong>——新生儿侵袭性感染的主要元凶,并测定<strong>耐药标志物</strong>——对青霉素过敏的孕妇至关重要。小基因组(约 <strong>2.2 Mb</strong>)非常适合在产房直接用 <strong>Flongle</strong> 快速运行。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:阴道-直肠拭子、新生儿脑脊液/血液。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于产房床旁场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向产科医生/新生儿科医生的 HTML 报告 — GBS 菌种鉴定、荚膜血清型、克隆归属 (CC17)、药敏谱及青霉素过敏时的用药建议;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、血清型、耐药</h2>' +
    '<h3>菌种鉴定与毒力</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>cfb</strong>(CAMP 因子)', '<em>S. agalactiae</em> 经典的种特异性标志物——菌种确认的基础'],
      ['<strong>scpB</strong>(C5a 肽酶)', '毒力因子(降解补体);辅助菌种鉴定'],
      ['<strong>16S rRNA</strong>', '与拭子中的 <em>S. pyogenes</em>、<em>S. dysgalactiae</em> 及肠球菌鉴别']
    ]) +
    '<h3>荚膜血清型与克隆性</h3>' +
    '<p>荚膜是 GBS 的主要毒力因子;已知血清型 <strong>Ia、Ib、II–IX</strong>。血清型分布决定临床风险和未来疫苗的格局。</p>' +
    tbl(['血清型 / 克隆', '临床意义'], [
      ['<strong>III 型</strong>', '在<strong>新生儿脑膜炎</strong>和晚发型感染中占主导;疫苗的优先靶点'],
      ['<strong>CC17 (ST-17)</strong>', '<strong>高毒力克隆</strong>——在新生儿侵袭性感染中占优势;检出后应提高警惕'],
      ['<strong>Ia、Ib、II、III、V</strong>', '覆盖母亲和新生儿大多数侵袭性分离株']
    ]) +
    '<h3>耐药基因</h3>' +
    '<p><strong>青霉素仍是首选药物</strong>——GBS 中不存在普遍的青霉素耐药。但青霉素过敏时的替代药物是<strong>克林霉素</strong>,而对克林霉素和红霉素的耐药正稳步上升——因此过敏情况下快速测定标志物具有临床意义。</p>' +
    tbl(['基因', '抗生素类别', '临床意义'], [
      ['<strong>ermB</strong>', '大环内酯类、<strong>克林霉素</strong>(MLSB,组成型)', '克林霉素(过敏时的后备药)耐药的主要机制'],
      ['<strong>mefA / mefE</strong>', '大环内酯类(外排,M 表型)', '红霉素耐药而不影响克林霉素——报告中予以区分'],
      ['<strong>lsaB</strong>', '林可酰胺类、链阳菌素 A、截短侧耳素类', '新兴的克林霉素耐药机制'],
      ['<strong>lnuB</strong>', '林可酰胺类(灭活性核苷酸转移酶)', '克林霉素耐药的补充标志物'],
      ['<strong>pbp2x</strong>(青霉素结合蛋白)', 'β-内酰胺类', '偶见青霉素敏感性降低的突变——需监测']
    ]) +
    '<h3>报告中的分娩期处置</h3>' +
    tbl(['场景', '方案', '基因组学的作用'], [
      ['<strong>孕 35–37 周常规筛查</strong>', '培养;发现定植则分娩期用青霉素', '确认 cfb 阳性 GBS,血清型用于流行病学监测'],
      ['<strong>未筛查即入院分娩</strong>', '按危险因素经验性决策', '数小时的 PCR/测序替代 18–48 小时培养 → 有依据的预防用药'],
      ['<strong>青霉素过敏</strong>', '确认敏感后用克林霉素', 'ermB/mefE/mefA/lsaB/lnuB 谱 → 在克林霉素与万古霉素之间选择']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Agalactiae Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>GBS-Sero-Typer</strong>', '基于 cps 基因的荚膜血清分型(Ia、Ib、II–IX)'],
      ['<strong>GBS-CC17-Detector</strong>', '检出高毒力克隆 CC17 (ST-17)'],
      ['<strong>GBS-Res-Predictor</strong>', '基于基因组数据预测大环内酯类和克林霉素耐药']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — <em>S. agalactiae</em> 参考序列(约 2.2 Mb)及近缘链球菌面板'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 包括 <strong>pbp2x</strong> 突变'],
      ['<strong>4. 血清分型与 AMR 检出</strong>', '自建 cps 基因与耐药标志物数据库,兼容 CARD/ResFinder'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>新生儿负担</strong> — GBS 仍是新生儿脓毒症和脑膜炎的首要病因:据 WHO 估计每年数十万例侵袭性感染,包括早发型(分娩时垂直传播)和晚发型,神经系统后遗症比例高。</li>' +
    '<li><strong>筛查盲区</strong> — 培养需 18–48 小时,未筛查即入院分娩的产妇只能按危险因素"盲目"预防;在产房用 Edge 设备做床旁测序,可在数小时内——即活跃产程开始前——给出答案。</li>' +
    '<li><strong>过敏情况下的耐药上升</strong> — 青霉素地位稳固,但对克林霉素和红霉素的耐药(ermB、mefA/E、lsaB、lnuB)在全球上升;青霉素过敏时,基因组标志物谱直接决定用药选择。</li>' +
    '<li><strong>疫苗时代</strong> — 抗 GBS 六价结合疫苗正处于临床试验阶段;血清型流行病学监测(III 型占比、CC17 克隆)将成为评估其有效性的基础。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — B 组链球菌感染 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/group-b-strep/">CDC — B 组链球菌:临床指南</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — B 组链球菌疫苗研发</a></li></ul>';

  /* ── VRE (屎肠球菌/万古霉素耐药肠球菌) ── */
  ZH['/faecium/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_faecium.svg" alt="屎肠球菌 — 成对及短链状球菌" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>屎肠球菌 (VRE):万古霉素耐药与医院流行病学</h1>' +
    '<p style="font-size:1.2em;color:#555">vanA/vanB 基因型、AMR 耐药谱与 ICU 暴发 WGS 追踪——隔离决定一切时数小时出结果</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>屎肠球菌</em>(Enterococcus faecium)是革兰氏阳性球菌(成对及短链状),属 <strong>ESKAPE 病原体</strong>,是 ICU 医院获得性感染的主要病原之一:<strong>菌血症、尿路感染、腹腔感染</strong>。在免疫抑制患者——<strong>血液肿瘤科和器官移植科</strong>——中尤为凶险:万古霉素耐药 (VRE) 菌血症病死率高,而药物武器库正在枯竭:医院克隆 <strong>CC17</strong> 本已耐受氨苄西林(<em>pbp5</em>)和高水平氨基糖苷类(<em>aac(6\')-aph(2\'\')</em>),对后备药物——<strong>利奈唑胺和达托霉素</strong>——的耐药也在上升(<em>cfr</em>、<em>optrA</em>)。</p>' +
    '<p>治疗与流行病学防控的关键在于位于质粒和转座子 (Tn1546) 上的 <strong>vanA/vanB 基因簇</strong>:<strong>vanA</strong> 导致对万古霉素<strong>和</strong>替考拉宁的高水平耐药,<strong>vanB</strong> 则产生可变耐药,此时替考拉宁可能仍保持活性。因此,选方案时<strong>基因型比表型更重要</strong>。我们的流程基于纳米孔测序数据确定 van 基因型、AMR 耐药谱、克隆归属,并在暴发时进行传播链 WGS 追踪 (cgMLST / 核心基因组 SNP),把直肠拭子筛查变成可控的院感防控工具。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:直肠拭子(定植筛查)、血培养、尿液、腹腔分泌物。最佳方案:在 <strong>Flongle</strong> 上做 vanA/vanB 扩增子筛查测序,数小时出结果 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向重症医生/流行病学家的 HTML 报告 — 菌种鉴定(<em>ddl</em>)、van 基因型及治疗解读、AMR 耐药谱,暴发时附分离株聚类分析;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定、van 基因簇、耐药</h2>' +
    '<h3>菌种鉴定</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>ddl</strong>(D-Ala-D-Ala 连接酶)', '<em>E. faecium</em> 种特异性鉴定,与 <em>E. faecalis</em> 鉴别——两者耐药谱与治疗策略不同'],
      ['<strong>16S rRNA</strong>', '属级鉴定,与其他球菌鉴别']
    ]) +
    '<h3>万古霉素耐药基因簇 (VRE)</h3>' +
    tbl(['基因型', '定位', '临床意义'], [
      ['<strong>vanA</strong>', '转座子 <strong>Tn1546</strong>(约 10 kb)、质粒', '对<strong>万古霉素和替考拉宁</strong>均高水平耐药;医院暴发中最常见的基因型'],
      ['<strong>vanB</strong>', '染色体/质粒 (Tn1549/Tn5382)', '对万古霉素可变耐药;<strong>替考拉宁可能仍有效</strong>——基因型直接改变用药方案']
    ]) +
    '<h3>CC17 的医院适应与后备药物</h3>' +
    tbl(['基因', '抗生素类别', '临床意义'], [
      ['<strong>pbp5</strong>(突变)', 'β-内酰胺类(<strong>氨苄西林</strong>)', '氨苄西林耐药——医院克隆 CC17 的标志性特征'],
      ['<strong>aac(6\')-aph(2\'\')</strong>', '氨基糖苷类', '高水平耐药——心内膜炎时无法与 β-内酰胺类产生协同作用'],
      ['<strong>cfr / optrA</strong>', '<strong>利奈唑胺</strong>', 'VRE 菌血症后备药物耐药的上升'],
      ['<strong>liaFSR 突变</strong>', '<strong>达托霉素</strong>', '对最后手段药物敏感性下降']
    ]) +
    '<h3>流行病学与 WGS 暴发追踪</h3>' +
    tbl(['任务', '方法', '流程的作用'], [
      ['<strong>ICU 暴发</strong>', '传播链 WGS 追踪:cgMLST / 核心基因组 SNP', '证明克隆传播 vs 独立带入——数小时而非数周'],
      ['<strong>定植筛查</strong>', '直肠拭子,在 <strong>Flongle</strong> 上做 vanA/vanB 扩增子测序', '数小时出结果,而外送 PCR 实验室需数天——在传播发生前隔离携带者'],
      ['<strong>流行病学风险</strong>', '长读长解析 <strong>vanA 的质粒背景</strong>(Tn1546 上约 10 kb):拷贝数、可移动性', '评估基因簇水平传播潜力——短读长无法做到']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Faecium Pipeline</strong>', '🟡 开发中']]) +
    tbl(['模型', '目标任务'], [
      ['<strong>EFM-Van-Typer</strong>', 'vanA/vanB 基因分型及治疗解读(vanB 时可用替考拉宁)'],
      ['<strong>EFM-Res-Detector</strong>', '预测完整 AMR 耐药谱,包括利奈唑胺 (cfr/optrA) 和达托霉素'],
      ['<strong>EFM-Outbreak-Tracer</strong>', '分离株聚类分析 (cgMLST/SNP),追踪 ICU 暴发']
    ]) + '<hr>' +
    '<h2>🛠 技术架构:流程依赖与环境</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — <em>E. faecium</em> (CC17) 参考序列及肠球菌面板'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — pbp5、liaFSR 突变'],
      ['<strong>4. van 基因簇与 AMR 基因检出</strong>', '自建 vanA/vanB (Tn1546) 及耐药数据库,兼容 CARD/ResFinder'],
      ['<strong>5. 组装与质粒背景</strong>', '<code>flye</code> — 解析 Tn1546 约 10 kb:拷贝数、可移动性'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>ESKAPE 与 ICU</strong> — 重症监护、血液肿瘤和移植科的 VRE 菌血症病死率高;每一次正确治疗的延误都会恶化预后。数小时获得 vanA/vanB 基因型,可在 vanB 时立即选用替考拉宁,不必为等表型结果浪费数天。</li>' +
    '<li><strong>正在消失的药物武器库</strong> — 医院克隆 CC17 本已耐受氨苄西林和氨基糖苷类;对利奈唑胺 (cfr、optrA) 和达托霉素的耐药正在蔓延。没有基因组学监控,经验性方案就会"失明"。</li>' +
    '<li><strong>暴发处置拼速度</strong> — 直肠拭子筛查加 Flongle 上 vanA/vanB 测序,数小时出结果,而外送 PCR 实验室需数天;WGS 追踪证明传播途径,真正阻断暴发,而不是事后记录。</li>' +
    '<li><strong>长读长的独特优势</strong> — Tn1546 转座子上约 10 kb 的 vanA 基因簇在质粒与染色体之间迁移;只有 ONT 长读长能解析其质粒背景(拷贝数、可移动性),这对预测流行病学风险至关重要。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 万古霉素耐药肠球菌 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — 细菌重点病原体清单 (ESKAPE)</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 医疗机构中的 VRE</a></li></ul>';

  /* ── 流感嗜血杆菌 (haemophilus) ── */
  ZH['/haemophilus/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_haemophilus.svg" alt="流感嗜血杆菌 — 多形性球杆菌" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>流感嗜血杆菌:BLNAR、血清分型与菌种鉴定</h1>' +
    '<p style="font-size:1.2em;color:#555">ftsI 测序能看到 β-内酰胺酶 PCR 漏掉的耐药性——小基因组,数小时出结果</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><em>流感嗜血杆菌</em>(Haemophilus influenzae,Pfeiffer 杆菌)是一种小型革兰氏阴性<strong>多形性球杆菌</strong>,为鼻咽部共生菌,也是中耳炎、鼻窦炎、<strong>慢阻肺急性加重</strong>(仅次于肺炎球菌的第二常见细菌性病原体)和肺炎的病原;在未接种疫苗的儿童中可引起会厌炎和脑膜炎(历史上为荚膜 b 型,即 Hib)。培养诊断缓慢而苛刻:该菌苛养,仅在<strong>巧克力琼脂</strong>上生长,且需要生长因子 <strong>X(血红素)和 V(NAD)</strong>。基因组学绕开了这一难题:结果不取决于培养是否长出来。</p>' +
    '<p>我们的流程基于纳米孔测序数据,确定<strong>AMR 耐药谱(必做 ftsI 突变分析,要点见下文)</strong>,由荚膜基因座判定<strong>血清型(a–f 或无荚膜的 NTHi)</strong>,并进行<strong>菌种鉴定</strong>——与无致病性的"孪生菌"<em>溶血嗜血杆菌</em>(H. haemolyticus)相鉴别。基因组很小(<strong>约 1.8 Mb</strong>),而关键目标——ftsI + blaTEM 扩增子加荚膜基因座——可在医院或门诊的 Edge 设备上用 Flongle <strong>数小时内</strong>给出答案。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:痰液、鼻咽拭子、中耳渗出液、脑脊液、血液。最佳方案——快速建库并在 <strong>Flongle</strong> 上运行,适用于床旁 (point-of-care) 场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向儿科/呼吸科医生的 HTML 报告 — 菌种鉴定、血清型、AMR 耐药谱(含 BLNAR 状态)并附经验性用药建议;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:耐药、血清型、鉴定</h2>' +
    '<h3>核心:β-内酰胺类耐药机制</h3>' +
    '<p><em>流感嗜血杆菌</em>的主要临床问题是对氨基青霉素类和头孢菌素类的敏感性。机制有两种,两者都必须看到:</p>' +
    tbl(['标志物', '机制', '临床意义'], [
      ['<strong>blaTEM-1</strong>', 'β-内酰胺酶(质粒介导)', '对氨苄西林/阿莫西林耐药;可被抑制剂(克拉维酸)克服'],
      ['<strong>blaROB-1</strong>', 'β-内酰胺酶(较少见)', '对氨苄西林耐药;常为联合耐药'],
      ['<strong>ftsI</strong> (PBP3)', '青霉素结合蛋白 3 基因突变', '<strong>BLNAR——β-内酰胺酶阴性氨苄西林耐药</strong>']
    ]) +
    '<p><strong>BLNAR 是常规诊断的最大陷阱。</strong>菌株不产 β-内酰胺酶,但 <strong>ftsI</strong> 突变(经典替换 N526K、S385T、R517H 等)降低了 PBP3 对所有氨基青霉素类和部分头孢菌素类的亲和力。对此类菌株,β-内酰胺酶 PCR 会报"敏感",而患者对阿莫西林无应答——只有 <strong>ftsI 测序</strong>能看到真相。BLNAR 的比例在全球上升,世界最高的是<strong>东亚(日本、韩国、中国)</strong>,那里 BLNAR 和 BLPACR(产 β-内酰胺酶且伴 ftsI 突变的菌株)合计<strong>占临床分离株的数十个百分点</strong>;low-BLNAR(临界敏感)的比例也在上升。</p>' +
    '<h3>耐药基因:其他类别</h3>' +
    tbl(['标志物', '抗生素类别', '临床意义'], [
      ['<strong>gyrA / parC</strong>', '氟喹诺酮类', 'QRDR 突变 → 对左氧氟沙星/莫西沙星耐药(BLNAR 与慢阻肺时的储备用药)']
    ]) +
    '<h3>血清分型与荚膜基因座</h3>' +
    '<p>Hib 疫苗接种后流行病学发生了偏移:侵袭性感染越来越多由<strong>无荚膜菌株 (NTHi)</strong> 和<strong>非 b 血清型</strong>引起——尤其是 <strong>Hia</strong>,在北美原住人群中引起重症侵袭性感染暴发。基于荚膜基因座的基因组血清分型<strong>比血清凝集试验更准确</strong>(后者存在交叉反应和误判)。</p>' +
    tbl(['标志物', '意义'], [
      ['<strong>bexA</strong>', '荚膜存在与否的标志物(荚膜多糖输出);bexA 阴性 → NTHi'],
      ['<strong>荚膜基因座(I–III 区)</strong>', '根据 II 区血清型特异性基因判定血清型 a–f']
    ]) +
    '<h3>菌种鉴定:与溶血嗜血杆菌鉴别</h3>' +
    '<p><em>溶血嗜血杆菌</em>(H. haemolyticus)是<strong>无致病性的共生"孪生菌"</strong>,表型上与 NTHi 几乎无法区分(甚至 MALDI-TOF 也会误判)。错误鉴定会扭曲流行病学数据和用药决策。分子鉴定一次解决:</p>' +
    tbl(['标志物', '意义'], [
      ['<strong>iga</strong>(IgA1 蛋白酶)', '存在于<em>流感嗜血杆菌</em>,不存在于<em>溶血嗜血杆菌</em>'],
      ['<strong>lgtC</strong>(脂寡糖糖基转移酶)', '互补标志物:常不存在于<em>流感嗜血杆菌</em>,存在于<em>溶血嗜血杆菌</em>'],
      ['iga/lgtC 复合谱 + MLST 位点', '基于测序的菌种最终确认']
    ]) +
    '<h3>报告中的经验性治疗</h3>' +
    tbl(['临床类型', '方案', '基因组学的作用'], [
      ['<strong>慢阻肺急性加重 / 肺炎</strong>', '阿莫西林-克拉维酸或头孢菌素', 'ftsI 状态至关重要:BLNAR → 即使加抑制剂,氨基青霉素也无效'],
      ['<strong>中耳炎、鼻窦炎</strong>', '阿莫西林(一线)', 'blaTEM-1 + ftsI 谱 → 在加克拉维酸与换药类别之间选择'],
      ['<strong>侵袭性感染(会厌炎、脑膜炎、脓毒症)</strong>', '经验性头孢曲松', '血清型(Hib?Hia?NTHi?)+ AMR → 调整方案并评估流行病学']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Haemophilus Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>HI-BLNAR-Detector</strong>', '根据 ftsI 突变谱分类 BLNAR / low-BLNAR / 敏感'],
      ['<strong>HI-Sero-Typer</strong>', '基于荚膜基因座和 bexA 的血清分型 a–f / NTHi'],
      ['<strong>HI-Species-ID</strong>', '基于复合标志物(iga、lgtC)鉴别<em>流感嗜血杆菌</em>与<em>溶血嗜血杆菌</em>']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — 参考序列面板(<em>H. influenzae</em> Rd KW20、86-028NP、<em>H. haemolyticus</em>)'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — ftsI、gyrA/parC 突变'],
      ['<strong>4. AMR 与血清型基因检出</strong>', '自建数据库(blaTEM-1/blaROB-1、荚膜基因座 a–f、bexA、iga、lgtC),兼容 CARD/ResFinder'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>BLNAR 陷阱正在扩大</strong> — BLNAR 菌株的比例在全球上升,在东亚(日本、韩国、中国)已达临床分离株的数十个百分点;low-BLNAR 也在上升。β-内酰胺酶检测"看不见"这类菌株,表型药敏又需要培养苛养菌——只有 ftsI 测序能立即给出正确答案。</li>' +
    '<li><strong>慢阻肺是每天的工作</strong> — <em>流感嗜血杆菌</em>是慢阻肺急性加重的第二常见细菌性病原,也是社区获得性肺炎的常见病因;慢阻肺患者经验性用药出错就意味着住院。门诊 Edge 设备数小时出结果,当天即可调整治疗策略。</li>' +
    '<li><strong>后 Hib 时代的流行病学</strong> — Hib 疫苗(史上最成功的疫苗之一)使侵袭性感染转向 NTHi 和非 b 血清型;北美原住人群的 Hia 暴发表明血清分型在临床上和流行病学上仍然重要——而基因组血清分型比凝集试验更可靠。</li>' +
    '<li><strong>苛养性本身就是测序的理由</strong> — <em>流感嗜血杆菌</em>的培养(巧克力琼脂、X 和 V 因子、CO₂ 孵育)缓慢,且在首剂抗生素后常常长不出来。小基因组(约 1.8 Mb)使直接从临床样本测序在 Flongle 上也切实可行。</li>' +
    '<li><strong>溶血嗜血杆菌"孪生菌"</strong> — 没有分子验证,拭子中"NTHi"的比例会被高估;流程中的复合标志物(iga/lgtC)自动解决这一问题。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 流感嗜血杆菌 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 流感嗜血杆菌感染</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 流感嗜血杆菌疾病 (Hib)</a></li>' +
    '<li>📄 <a href="https://www.who.int/">WHO — b 型流感嗜血杆菌 (Hib)</a></li></ul>';

  /* ── 巨细胞病毒 (CMV) ── */
  ZH['/cmv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_cmv.svg" alt="巨细胞病毒——有包膜的疱疹病毒" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>移植医学中的巨细胞病毒 (CMV/HHV-5) 耐药基因分型</h1>' +
    '<p style="font-size:1.2em;color:#555">UL97、UL54、UL56——数小时内查明难治性 CMV 的病因,而无需等待参考实验室数周</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>巨细胞病毒 (CMV,HHV-5) 是一种 β-疱疹病毒,<strong>成人血清阳性率为 60–90%</strong>。在免疫功能正常的携带者体内,它潜伏于单核细胞中;而在<strong>实体器官或骨髓移植</strong>后,它成为最主要的病毒性病原体:CMV 病毒血症、肺炎、结肠炎、视网膜炎、食管炎。除直接损伤器官外,CMV 还产生<strong>间接效应</strong>:增加移植物排斥风险,并为真菌和细菌继发感染敞开大门——正因如此,临床对其实施预防性用药(缬更昔洛韦、莱特莫韦)并监测病毒载量。</p>' +
    '<p>经典的临床陷阱是<strong>难治性 CMV</strong>:在更昔洛韦/缬更昔洛韦治疗下病毒载量数周不降。病因只有两个——免疫不足或<strong>耐药病毒</strong>——而两者的处理截然相反。参考实验室 (Sanger) 需要<strong>数周</strong>才能给出答复;我们的流程基于纳米孔测序数据,在移植中心现场<strong>数小时内</strong>完成耐药基因分型。深度测序能捕获 Sanger 原则上无法看到的<strong>低频耐药亚群 (5–20%)</strong>——而正是这些亚群在治疗压力下被筛选出来,导致该线治疗失败。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:移植后患者的血浆/全血(病毒血症经 PCR 证实)。最佳方案——在移植中心实验室直接用 <strong>Flongle/MinION</strong> 运行 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向移植医生的 HTML 报告 — UL97/UL54/UL56/UL51/UL89 耐药基因型及亚群比例,按药物解读(更昔洛韦/膦甲酸/西多福韦/莱特莫韦/马立巴韦),并由同一数据估算病毒载量;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA(dsDNA)</h2>' +
    '<p>CMV 属于<strong>巴尔的摩分类的 I 类</strong> —— 双链DNA基因组病毒。其表达策略最"细胞化":dsDNA 基因组由 DNA 依赖的 RNA 聚合酶(宿主的和病毒的)转录为 mRNA,随即翻译为蛋白 —— 经典的 <strong>DNA → mRNA → 蛋白</strong> 路线,无逆转录和 RNA 中间体。CMV 基因组约 <strong>235 kb</strong>,是人疱疹病毒中最大的,且遍布重复序列(侧翼于独特区段 UL 和 US 的反向重复 b\'/c\');在单核细胞中病毒进入潜伏,以游离体 dsDNA 形式存留。对流程而言这意味着两点:dsDNA 是<strong>稳定的靶标</strong>,无需逆转录步骤,可由纳米孔直接读取,包括天然甲基化;而 ONT 长读长能够<strong>完整跨越重复序列</strong>,在那里 dsDNA 基因组的短读长会坍塌且无法定相。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:耐药基因与病毒载量</h2>' +
    '<h3>UL97——磷酸转移酶,"更昔洛韦之门"</h3>' +
    '<p>更昔洛韦是前体药物:在靶细胞内由病毒磷酸转移酶 UL97 激活。没有第一步磷酸化,药物就没有活性。因此 UL97 突变是对更昔洛韦/缬更昔洛韦耐药最常见的原因:</p>' +
    tbl(['突变', '药物', '临床意义'], [
      ['<strong>M460V / M460I</strong>', '更昔洛韦', '经典"热点"位点;高水平耐药'],
      ['<strong>H520Q</strong>', '更昔洛韦', '中度耐药,常与 UL54 联合出现'],
      ['<strong>C592G</strong>', '更昔洛韦', '临床系列中最常见的突变'],
      ['<strong>A594V</strong>', '更昔洛韦', '高水平耐药'],
      ['<strong>L595S</strong>', '更昔洛韦', '中度耐药,在缬更昔洛韦选择压力下增多'],
      ['<strong>C603W</strong>', '更昔洛韦', '少见,但为高水平耐药']
    ]) +
    '<h3>UL54——DNA 聚合酶,所有"-洛韦"类药物与膦甲酸的靶点</h3>' +
    '<p>UL54 是病毒 DNA 聚合酶的催化亚基。此处的突变会同时影响多种药物,其模式决定交叉耐药:更昔洛韦、西多福韦、膦甲酸。UL97+UL54 联合分析才能给出完整图景——而这正是纳米孔胜过一切方法之处。</p>' +
    '<h3>UL56 / UL51 / UL89——末端酶复合体</h3>' +
    tbl(['基因', '功能', '药物'], [
      ['<strong>UL56</strong>', '末端酶亚基', '<strong>莱特莫韦</strong>(造血干细胞移植后广泛用于预防——耐药已有报道且在增加)'],
      ['<strong>UL51</strong>', '末端酶复合体', '其他莱特莫韦耐药突变'],
      ['<strong>UL89</strong>', '末端酶亚基', '莱特莫韦耐药(与 UL56 谱系交叉)']
    ]) +
    '<h3>同一数据中的病毒载量</h3>' +
    '<p>同一次运行中病毒基因组的覆盖度是<strong>病毒载量的替代指标</strong>:无需单独的 PCR 参考即可追踪治疗下载量的动态,并与耐药亚群比例的变化同步。</p><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq CMV Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>CMV-Res-Genotyper</strong>', '按药物及耐药水平对 UL97/UL54/UL56/UL51/UL89 突变进行分类'],
      ['<strong>CMV-Subpop-Phaser</strong>', '利用长读长对突变进行定相:同一染色体还是不同亚群'],
      ['<strong>CMV-Load-Tracker</strong>', '由覆盖度估算病毒载量及其动态']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — CMV 参考序列 (Merlin/AD169),穿越约 235 kb 基因组的重复序列完成组装'],
      ['<strong>3. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 设深度阈值以捕获低频变异 (5–20%)'],
      ['<strong>4. 耐药基因分型</strong>', '基于临床参考目录的 UL97/UL54/UL56/UL51/UL89 自建突变数据库'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>难治性 CMV 意味着数周的不确定性。</strong>今天的标准是在参考实验室做 Sanger 基因分型:物流、排队,1–3 周才有答复。在此期间,病毒要么在无效的更昔洛韦下继续增殖,要么患者被迫改用具有肾毒性的膦甲酸。现场 Edge 测序将这一周期压缩到数小时。</li>' +
    '<li><strong>低频亚群决定结局。</strong>耐药 CMV 克隆以百分之几的比例起步,在治疗下被筛选。阈值约 20–25% 的 Sanger 看不到它们;ONT 深度测序能看到。这能在载量临床上"停滞"之前改变该线治疗的预后。</li>' +
    '<li><strong>约 235 kb、富含重复的基因组,纳米孔完全可以胜任。</strong>CMV 基因组充满长重复序列(UL/b′ 和 US/c′ 重复区),短读长在那里既无法组装也无法定相。ONT 读长可完整穿越重复序列。</li>' +
    '<li><strong>定相是长读长独有的王牌。</strong>UL97 与 UL54 突变位于基因组两端:在短读长上无法区分"同一基因组中的两个突变"与"两个各带一个突变的不同亚群"。长读长就是一条分子,连锁关系直接读出。而这对应着不同的临床决策:单耐药群体还是累积性多重耐药群体。</li>' +
    '<li><strong>莱特莫韦使问题升级。</strong>造血干细胞移植后用莱特莫韦预防正成为标准——而 UL56 耐药已有报道;末端酶基因的快速监控需求日益增长。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 巨细胞病毒 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.merckmanuals.com/">Merck Manual — 巨细胞病毒 (CMV) 感染</a></li>' +
    '<li>📄 <a href="https://www.cdc.gov/">CDC — 巨细胞病毒 (CMV) 与先天性 CMV 感染</a></li></ul>';

  /* ── 单纯疱疹病毒 (HSV) ── */
  ZH['/hsv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hsv.svg" alt="单纯疱疹病毒——疱疹病毒颗粒与神经元" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>单纯疱疹病毒 (HSV-1/HSV-2):脑炎与阿昔洛韦耐药</h1>' +
    '<p style="font-size:1.2em;color:#555">脑脊液 mNGS、UL23/UL30 基因分型与长读长全基因组组装——每一小时都意味着神经元的存亡</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>1 型单纯疱疹病毒 (HSV-1,HHV-1) 是成人<strong>散发性致死性脑炎</strong>的首要病因:病毒侵袭<strong>颞叶</strong>,引起出血性坏死。不经治疗病死率约 <strong>70%</strong>;早期静脉阿昔洛韦可将其降至<strong>约 20–30%</strong>——但每延误一小时治疗,都不可逆地损失神经元与认知功能。HSV-2 则导致生殖器感染、<strong>新生儿疱疹</strong>(新生儿脓毒症与脑炎,不治疗病死率高达 60%)以及复发性无菌性脑膜炎。</p>' +
    '<p>脑脊液 PCR 是诊断金标准,但存在盲区:发病<strong>最初 24–72 小时</strong>内 PCR 可呈假阴性,非典型及疫苗相关病例会漏检,更重要的是——<strong>PCR 无法回答耐药问题</strong>。在免疫抑制患者(器官与造血干细胞移植、HIV)中,阿昔洛韦耐药率可达 <strong>4–14%</strong>:表型药敏试验需要病毒培养,耗时<strong>数周</strong>;而基于 <strong>UL23</strong>(胸苷激酶,约占耐药病例 95%)和 <strong>UL30</strong>(DNA 聚合酶)的基因分型数小时内即可给出答案,并直接提示换药方案(膦甲酸、西多福韦)。</p>' +
    '<p>我们的流程基于纳米孔测序数据,在一次运行中合并三项任务:<strong>脑脊液 mNGS</strong>(在鉴别诊断谱中检测 HSV——VZV、肠道病毒、HHV-6、细菌性脑膜炎)、UL23/UL30 <strong>耐药基因分型</strong>以及用于毒株流行病学研究的<strong>全基因组组装</strong>。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:脑脊液(优先)、疱液、黏膜拭子、新生儿感染时的血液。最佳方案——在重症监护室以 <strong>Flongle</strong> 运行,用于急诊场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向神经科/感染科医生的 HTML 报告 — 病毒种类与型别(按 US6 区分 HSV-1/HSV-2)、耐药基因型(含 UL23/UL30 突变解读与换药建议)、mNGS 鉴别诊断谱;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA(dsDNA)</h2>' +
    '<p>HSV-1 和 HSV-2 属于<strong>巴尔的摩分类的 I 类</strong> —— 双链DNA基因组病毒。其表达策略最"细胞化":dsDNA 基因组由 DNA 依赖的 RNA 聚合酶(宿主的和病毒的)转录为 mRNA,随即翻译为蛋白 —— 经典的 <strong>DNA → mRNA → 蛋白</strong> 路线,无逆转录和 RNA 中间体。HSV 基因组为约 <strong>152 kb</strong> 的 dsDNA,具有特征性结构:独特区段 UL 和 US 被<strong>末端及内部反向重复序列</strong>(TRL/IRL/IRS/TRS)环绕;在神经节神经元中病毒建立终身潜伏。对流程而言这意味着两点:dsDNA 是<strong>稳定的靶标</strong>,无需逆转录步骤,可由纳米孔直接读取,包括天然甲基化;而 ONT 长读长能够<strong>完整解析反向重复序列</strong>,使基因组得以组装为单条重叠群,并精确绘制 UL23 同聚物区段的插入缺失。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:鉴定与耐药</h2>' +
    '<h3>关键基因</h3>' +
    tbl(['基因', '蛋白', '临床意义'], [
      ['<strong>UL23</strong>', '胸苷激酶 (TK)', '<strong>约 95% 的阿昔洛韦耐药病例</strong>:点突变、缺失与插入(常位于 G/C 同聚物区);TK 阴性表型 → 换用<strong>膦甲酸</strong>'],
      ['<strong>UL30</strong>', 'DNA 聚合酶 (pol)', '约 5% 的病例;突变导致对阿昔洛韦和膦甲酸交叉耐药——需使用西多福韦'],
      ['<strong>US6</strong>', '糖蛋白 D (gD)', '<strong>HSV-1 / HSV-2 鉴别</strong>——对预后至关重要:HSV-2 脑炎更易复发,治疗应答更差'],
      ['<strong>UL27</strong>', '糖蛋白 B (gB)', '保守的种属鉴定标志物;mNGS 分类的靶点']
    ]) +
    '<h3>报告中的耐药基因型</h3>' +
    tbl(['发现', '解读', '处理'], [
      ['UL23 突变(含缺失/插入)', 'TK 缺陷:阿昔洛韦无法磷酸化', '停用阿昔洛韦 → <strong>膦甲酸</strong>'],
      ['UL30 突变', 'DNA 聚合酶改变', '可能存在交叉耐药 → 膦甲酸或<strong>西多福韦</strong>'],
      ['难治情况下 UL23/UL30 为野生型', '未证实耐药', '核查剂量/依从性,重复腰椎穿刺']
    ]) +
    '<h3>疑似脑炎时的 mNGS 鉴别诊断谱</h3>' +
    '<p>流程一次运行即可排查急性脑炎/脑膜炎的全部常见病因——当 HSV PCR 阴性而临床表现仍在时至关重要:</p>' +
    '<ul><li><strong>VZV</strong>——病毒性脑炎的第二大病因;</li>' +
    '<li><strong>肠道病毒</strong>——无菌性脑膜炎的常见病因;</li>' +
    '<li><strong>HHV-6</strong>——免疫抑制患者的脑炎及移植后再激活;</li>' +
    '<li><strong>细菌性脑膜炎</strong>(<em>脑膜炎奈瑟菌</em>、<em>肺炎链球菌</em>、<em>单核细胞增生李斯特菌</em>)——脑脊液表现不典型时切勿漏诊。</li></ul><hr>' +
    '<h2>🧬 ONT 的技术王牌:含重复序列的基因组</h2>' +
    '<p>HSV 基因组为双链 DNA,约 <strong>152 kb</strong>,结构复杂:独特区 UL 和 US 被<strong>末端及内部反向重复序列</strong>(TRL/IRL/IRS/TRS,各 6–9 kb)包围。短读长 (Illumina) 组装<strong>在重复序列处断裂</strong>:重复区塌陷,TK 中突变及 UL23 同聚物区的上下文丢失,基因组只能拼成碎片。<strong>Oxford Nanopore 长读长可完整穿越重复序列</strong>,以单条重叠群给出全基因组组装——由此实现:</p>' +
    '<ul><li>精确绘制 UL23 中的缺失/插入,包括同聚物区(C₇–C₈、G 串)——耐药最常在此产生;</li>' +
    '<li>HSV-1/HSV-2 毒株的<strong>全基因组流行病学</strong>——无需对单个位点做 PCR 扩增,即可进行医院内与新生儿暴发的系统发育分析;</li>' +
    '<li>按读长比例检测混合群体(耐药准种的潜伏库)。</li></ul><hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq HSV Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>HSV-Res-Geno</strong>', '解读 UL23/UL30 突变:耐药还是多态性(依据人工审核的基因型数据库)'],
      ['<strong>HSV-Typer</strong>', '基于 US6/UL27 及全基因组特征的 HSV-1/HSV-2 鉴别'],
      ['<strong>CNS-mNGS-Classifier</strong>', '脑脊液 mNGS 中的病原体优先级排序:HSV、VZV、肠道病毒与细菌谱']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 去宿主与 mNGS 分类</strong>', '去除人类读长(GRCh38 参考),<code>kraken2</code> / <code>minimap2</code> 对照神经感染面板'],
      ['<strong>3. 比对 (Mapping)</strong>', '<code>minimap2</code> — HSV-1 (strain 17) 与 HSV-2 (strain HG52) 参考序列'],
      ['<strong>4. 变异检测 (Variant Calling)</strong>', '<code>clair3</code>、<code>medaka</code> — 含 UL23 同聚物区中的插入缺失'],
      ['<strong>5. 全基因组组装</strong>', '<code>flye</code> / <code>medaka</code> — 穿越 RL/RS 重复区的贯通组装'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>每一小时都是神经元</strong>——疱疹性脑炎年发病率约为每百万人口 2–4 例,但仍是致死性散发性脑炎最常见的病因。早期 PCR 阴性(最初 24–72 小时)会诱使临床停用阿昔洛韦——导致患者死亡;mNGS 随测序进程累积数据,可提高早期敏感性。</li>' +
    '<li><strong>新生儿疱疹</strong>——分娩时感染的 HSV-2(以及越来越多的 HSV-1)引起新生儿播散性感染与脑炎:不治疗病死率高达 60%,存活者遗留严重神经功能障碍。分型速度决定结局。</li>' +
    '<li><strong>免疫抑制下的耐药</strong>——移植受者与 HIV 患者中阿昔洛韦耐药株比例可达 4–14%;表型试验(培养,数周)在临床上没有价值,UL23/UL30 基因分型是唯一能快速给出答案、指导换用有毒性膦甲酸的手段。</li>' +
    '<li><strong>流行病学</strong>——HSV 全基因组测序揭示了全球范围的重组与毒株地理聚集;长读长首次使这类分析成为常规,包括医院内与新生儿暴发。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/">WHO — 单纯疱疹病毒(实况报道)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/books/">StatPearls — 单纯疱疹脑炎 (NCBI Bookshelf)</a></li>' +
    '<li>📄 <a href="https://www.ecdc.europa.eu/">ECDC — 单纯疱疹病毒</a></li></ul>';

  /* ── EB病毒 (EBV) ── */
  ZH['/ebv/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_ebv.svg" alt="EB病毒——疱疹病毒颗粒与B淋巴细胞" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>EB病毒:鼻咽癌与病毒性肿瘤学</h1>' +
    '<p style="font-size:1.2em;color:#555">首个被发现的人类肿瘤病毒——一次纳米孔运行同时获得完整基因组、肿瘤克隆性与潜伏期甲基化</p></div><hr>' +
    '<h2>🧬 为何 EBV 是最纯粹的病毒性肿瘤学</h2>' +
    '<p>EB病毒 (EBV,人类疱疹病毒 4 型,HHV-4) 是<strong>首个被证实对人类有致癌性的病毒</strong>(1964 年,伯基特淋巴瘤),也是 <strong>IARC 1 类致癌物</strong>。全球几乎所有成年人都已感染:<strong>约 95% 的成人血清阳性</strong>。原发感染后,病毒终身以潜伏形式存在于 B 淋巴细胞中——并在部分携带者中成为恶性转化的驱动因素。</p>' +
    '<p>EBV 与一系列肿瘤和疾病相关:</p>' +
    '<ul><li><strong>鼻咽癌 (NPC)</strong>——未分化型几乎总是与 EBV 相关;</li>' +
    '<li><strong>伯基特淋巴瘤</strong>(地方型与散发型)和<strong>霍奇金淋巴瘤</strong>;</li>' +
    '<li><strong>免疫抑制患者的 B 细胞淋巴增殖</strong>——首先是移植后淋巴增殖性疾病 (<strong>PTLD</strong>);</li>' +
    '<li><strong>约 9% 的胃癌</strong>(EBV 相关胃癌——TCGA 认定的独立分子亚型);</li>' +
    '<li><strong>传染性单核细胞增多症</strong>——原发感染的典型表现;</li>' +
    '<li><strong>多发性硬化</strong>——EBV 感染被公认为首要危险因素(大型队列研究显示几乎是必要条件)。</li></ul>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:血浆(游离 EBV DNA)、肿瘤/淋巴结活检、鼻咽灌洗液、全血(PTLD 监测)。</li>' +
    '<li><strong>📤 输出:</strong> HTML 报告 — 病毒载量、毒株型 (EBV-1/EBV-2)、LMP1 变异、基于末端重复的克隆性评估、甲基化谱与潜伏程序;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>🎯 流程检测内容:三个分析层级</h2>' +
    '<p>与我们的 <a href="/hpv/">HPV 页面</a>一样,纳米孔测序一次运行即可解决 qPCR 和短读长需要三种不同检测——甚至根本无法解决——的任务。</p>' +
    tbl(['层级', '任务', '临床意义'], [
      ['<strong>1. 检测与载量</strong>', '定量测定血浆/样本中的 EBV DNA', '鼻咽癌筛查与监测;移植后 PTLD 管理'],
      ['<strong>2. 基因组分析</strong>', '毒株分型 <strong>EBV-1/EBV-2</strong>(EBNA-2/3 基因)、<strong>LMP1</strong> 变异(含与鼻咽癌相关的 30 bp 缺失 del-LMP1)、<strong>基于末端重复数目的肿瘤克隆性</strong>', '单克隆游离型 EBV = 肿瘤起源于单个感染细胞的证据;缺失型 LMP1——致癌性增强的标志物'],
      ['<strong>3. 潜伏期表观遗传学</strong>', '从天然读长直接读取<strong>病毒基因组甲基化</strong> + 分析 <strong>Cp/Wp</strong> 启动子', '区分潜伏程序 (I/II/III) 与裂解周期——理解肿瘤状态和治疗应答的关键']
    ]) +
    '<p><strong>纳米孔的关键优势:</strong>约 <strong>172 kb</strong> 的 EBV 基因组布满大型串联内部重复 (<strong>IR1–IR4</strong>) 和末端重复 (<strong>TR</strong>)。短读长原则上无法解析这些区域——既数不出重复次数(克隆性!),也拼不出完整基因组。纳米孔长读长可完整跨越重复区,天然 DNA 测序<strong>无需亚硫酸氢盐转化、无需单独检测</strong>即可获得甲基化信息。</p>' +
    '<blockquote>这与 HPV 场景直接对应:病毒性肿瘤学 + 液体活检 + 风险分层,一次运行完成。</blockquote><hr>' +
    '<h2>🇨🇳 "广东癌":流行中心在中国南方</h2>' +
    '<p>鼻咽癌被称为<strong>"广东癌"</strong>:全球发病的中心在<strong>中国南方</strong>(广东、广西两省区、香港、广州市),当地鼻咽癌发病率比全球平均水平高 <strong>20–50 倍</strong>。原因在于流行的致癌性 EBV 变异、遗传易感性 (HLA 位点) 与环境因素(咸鱼、亚硝胺)的叠加。</p>' +
    '<p>筛查的决定性证据正是在那里获得的:</p>' +
    '<ul><li><strong>Chan 等,NEJM 2017(香港)</strong>——对 <strong>20 174 名无症状男性</strong>进行血浆游离 EBV DNA 筛查:34 名受检者检出鼻咽癌,早期 (I–II 期) 比例从约 20%(人群水平)升至 <strong>71%</strong>,3 年无进展生存率达 <strong>97%,而历史队列为 70%</strong>。这项标杆研究证明,基于病毒 DNA 的液体活检能够<strong>前移分期、改善生存</strong>。</li>' +
    '<li>目前 EBV DNA 筛查正在香港、广州和广西的鼻咽癌早检项目中推广;向东南亚流行区扩展也在讨论之中。</li></ul>' +
    '<p><strong>OnSiteSeq 的用武之地:</strong>qPCR 检测只回答"有多少病毒"。同一份血浆或灌洗液的纳米孔测序还能给出<strong>毒株、del-LMP1、克隆性与甲基化</strong>——即在活检之前就不只是筛查,而是对肿瘤进行分子表征。便携式 Edge 架构使这类筛查可以下沉到流行省份的基层医院,无需将样本送往中心实验室。</p><hr>' +
    '<h2>🧫 PTLD 与移植医学</h2>' +
    '<p>器官与骨髓移植后,免疫抑制解除了对潜伏 EBV 的控制——带来<strong>移植后淋巴增殖性疾病 (PTLD)</strong> 风险。标准管理是定期监测血液病毒载量;我们的平台在此基础上增加:</p>' +
    '<ul><li>基于末端重复的<strong>克隆性</strong>——区分多克隆再激活与单克隆淋巴增殖过程;</li>' +
    '<li><strong>潜伏程序</strong>(Cp/Wp 启动子、甲基化)——III 型潜伏是免疫抑制患者早期 PTLD 的典型特征;</li>' +
    '<li><strong>毒株</strong>——用于供受者间传播及移植中心暴发调查。</li></ul><hr>' +
    '<h2>🎯 标志物:我们在 EBV 基因组中读取什么</h2>' +
    tbl(['标志物', '类型', '意义'], [
      ['<strong>LMP1</strong>', '基因(潜伏膜蛋白 1)', '主要病毒癌基因;<strong>30 bp 缺失 (del-LMP1)</strong> 与鼻咽癌及更强侵袭性表型相关'],
      ['<strong>EBNA-1</strong>', '基因', '维持游离体;多态性(含 V-val 变异)与中国南方鼻咽癌相关'],
      ['<strong>EBNA-2 / EBNA-3</strong>', '基因', '毒株分型 <strong>EBV-1(A 型)/ EBV-2(B 型)</strong> 的基础;2 型在免疫抑制患者中更常见'],
      ['<strong>BART</strong>', 'microRNA 位点', '病毒 miRNA 簇,在鼻咽癌和 EBV 相关胃癌中高表达;BART 缺失是鼻咽癌毒株的特征'],
      ['<strong>EBER</strong>', '非编码 RNA (EBER1/2)', '经典的 EBV 组织学标志物 (EBER-ISH);在流程中作为潜伏转录覆盖度的质控'],
      ['<strong>末端重复 (TR)</strong>', '基因组两端约 500 bp 的重复', 'TR 数目 = 细胞克隆的"指纹":肿瘤单克隆性证明 EBV 病因'],
      ['<strong>IR1–IR4</strong>', '内部串联重复', '短读长无法解析;长读长给出约 172 kb 基因组的完整组装'],
      ['<strong>Cp / Wp</strong>', '启动子', '潜伏程序 (0/I/II/III) 与裂解周期的切换;与甲基化联合读取']
    ]) + '<hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA(dsDNA)</h2>' +
    '<p>EBV 属于<strong>巴尔的摩分类的 I 类</strong> —— 双链DNA基因组病毒。其表达策略最"细胞化":dsDNA 基因组由 DNA 依赖的 RNA 聚合酶(宿主的和病毒的)转录为 mRNA,随即翻译为蛋白 —— 经典的 <strong>DNA → mRNA → 蛋白</strong> 路线,无逆转录和 RNA 中间体。EBV 基因组为约 <strong>172 kb</strong> 的 dsDNA,遍布内部串联重复 <strong>IR1–IR4</strong> 和末端重复 <strong>TR</strong>,其拷贝数是肿瘤克隆性的"指纹";在 B 淋巴细胞中病毒以环状游离体形式终身潜伏于某种潜伏程序之中。对流程而言这意味着两点:dsDNA 是<strong>稳定的靶标</strong>,无需逆转录步骤,可由纳米孔直接读取,包括<strong>无需亚硫酸氢盐转化的天然甲基化</strong>(解析潜伏程序的关键);而 ONT 长读长能够<strong>完整解析 IR1–IR4 和 TR</strong> —— 这是短读长从根本上无法企及的。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq EBV Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>EBV-Strain-Typer</strong>', 'EBV-1/EBV-2 毒株分型与 LMP1/EBNA-1 变异检测(架构同 <a href="/ml/hiv/">HIV-1-M-Env-Rus</a>:CNN + Self-Attention)'],
      ['<strong>EBV-Clonality-Caller</strong>', '根据读长中末端重复数目的分布评估克隆性'],
      ['<strong>EBV-Latency-Methyl</strong>', '根据 Cp/Wp 与 BART 甲基化模式分类潜伏程序(0/I/II/III 或裂解周期)']
    ]) +
    '<p>计划使用参考基因组 <strong>NCBI RefSeq(NC_007605,1 型;AG876,2 型)</strong> 和公开鼻咽癌队列数据进行训练,并在临床样本上验证。</p><hr>' +
    '<h2>🛠 内部实现:依赖与环境 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — EBV 参考序列面板(NC_007605、AG876)+ <code>GRCh38</code> 用于扣除宿主背景'],
      ['<strong>3. 组装与变异</strong>', '<code>medaka</code>、<code>clair3</code>、<code>samtools</code>;高载量时进行从头组装(<code>flye</code>)'],
      ['<strong>4. 克隆性与重复区</strong>', '基于跨越读长统计末端/内部重复次数(<code>pysam</code>,自研 caller)'],
      ['<strong>5. 甲基化</strong>', '<code>Dorado</code>(5mC/5hmC 修饰)、<code>modkit</code> — 潜伏期与裂解周期鉴别'],
      ['<strong>6. 机器学习推理</strong>', '<code>PyTorch</code>、<code>BioPython</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>约 95% 的成人血清阳性</strong>——几乎人人携带 EBV;问题不在于感染本身,而在于谁的潜伏感染会走向肿瘤剧本。</li>' +
    '<li><strong>每年约 13 万例新发鼻咽癌</strong>(GLOBOCAN),高达 80% 集中在东亚和东南亚;未分化型鼻咽癌几乎总是与 EBV 相关。</li>' +
    '<li><strong>已获证实的筛查</strong>——香港研究 (NEJM 2017) 显示,通过血浆 EBV DNA 检测可将诊断前移至早期,3 年生存率达 97%:这是极少数证明液体活检具有人群获益的案例之一。</li>' +
    '<li><strong>移植医学</strong>——PTLD 仍是凶险的并发症;早期区分再激活与单克隆过程可改变处理策略(减免疫抑制还是用利妥昔单抗)。</li>' +
    '<li><strong>多发性硬化</strong>——大型队列已证实 EBV 与多发性硬化的因果关系(Bjornevik 等,Science 2022,美国军队队列,HR ≈ 32);血清学与病毒载量正进入神经病学视野。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa1701717">Chan K.C.A. 等 — 血浆 EB 病毒 DNA 分析用于鼻咽癌筛查 (NEJM,2017)</a></li>' +
    '<li>📄 <a href="https://monographs.iarc.who.int/list-of-classifications">IARC 专论 — EB 病毒,1 类致癌物</a></li>' +
    '<li>📄 <a href="https://www.science.org/doi/10.1126/science.abj8222">Bjornevik K. 等 — 纵向分析揭示 EBV 与多发性硬化的高度相关 (Science,2022)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature13480">TCGA — 胃癌分子亚型(EBV 阳性亚型,Nature 2014)</a></li>' +
    '<li>📄 <a href="https://www.ncbi.nlm.nih.gov/nuccore/NC_007605">NCBI RefSeq — EB 病毒完整基因组 (NC_007605)</a></li></ul>';

  /* ── HHV-6 与 iciHHV-6 ── */
  ZH['/hhv6/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_hhv6.svg" alt="整合入染色体的 HHV-6 疱疹病毒" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>HHV-6:染色体整合 (iciHHV-6) 与假病毒载量的陷阱</h1>' +
    '<p style="font-size:1.2em;color:#555">长读长区分染色体整合病毒与活动性再激活——使患者免于数月不必要的更昔洛韦治疗</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p><strong>人类疱疹病毒 6 型 (HHV-6A 和 HHV-6B)</strong> 是终身潜伏的 β-疱疹病毒。HHV-6B 是儿童<strong>幼儿急疹(玫瑰疹)</strong>的病因;在移植患者中,HHV-6 再激活可导致严重并发症:<strong>移植后边缘叶脑炎</strong>(造血干细胞移植 (HSCT) 后的经典并发症)、肺炎和造血抑制。</p>' +
    '<p>但 HHV-6 有一个其他疱疹病毒都不具备的独特陷阱:<strong>iciHHV-6</strong>(遗传性染色体整合 HHV-6)。约 <strong>1% 的人</strong>携带<strong>以生殖系方式整合入染色体</strong>的完整 HHV-6 基因组——病毒在祖先体内嵌入了染色体端粒区,如今像普通基因一样遗传。这类患者的血液 PCR(尤其是全血)会显示<strong>巨大的"病毒载量"——数百万拷贝/毫升</strong>——但这不是活动性感染,而是<strong>他自己的基因组</strong>:每个细胞都带有一份病毒拷贝。后果是:"难治性病毒血症"的误诊,数月不必要的<strong>更昔洛韦/膦甲酸</strong>及其骨髓毒性和肾毒性——甚至被迫停用维持生命的免疫抑制治疗。</p>' +
    '<p>我们的流程用<strong>纳米孔长读长</strong>终结这个问题:长读长可捕获<strong>"病毒-染色体"嵌合读长</strong>以及与端粒重复序列 <strong>(TTAGGG)n</strong> 的连接点——这是生殖系整合的直接证据;而覆盖度比值(iciHHV-6 时<strong>每个细胞约 1 个病毒拷贝</strong>,复制时则升高)可区分整合与活动性再激活。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:全血、血浆、脑脊液(疑似脑炎时)。</li>' +
    '<li><strong>📤 输出:</strong> 面向移植医生/神经科医生的 HTML 报告 — 型别 (HHV-6A/6B)、<strong>整合状态(iciHHV-6 是/否)</strong>、拷贝数估算、"病毒载量"解读;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>🧭 巴尔的摩分类:I — 双链DNA(dsDNA)</h2>' +
    '<p>HHV-6A 和 HHV-6B 属于<strong>巴尔的摩分类的 I 类</strong> —— 双链DNA基因组病毒。其表达策略最"细胞化":dsDNA 基因组由 DNA 依赖的 RNA 聚合酶(宿主的和病毒的)转录为 mRNA,随即翻译为蛋白 —— 经典的 <strong>DNA → mRNA → 蛋白</strong> 路线,无逆转录和 RNA 中间体。HHV-6 基因组为约 <strong>160 kb</strong> 的 dsDNA,两端带有端粒样重复序列,正是它们赋予了疱疹病毒中独一无二的能力 —— <strong>整合入宿主染色体端粒</strong>(iciHHV-6):病毒 dsDNA 嵌入染色体 dsDNA 并沿生殖系遗传。对流程而言这意味着两点:dsDNA 是<strong>稳定的靶标</strong>,无需逆转录步骤,可由纳米孔直接读取,包括天然甲基化;而 ONT 长读长能够<strong>完整捕获"病毒–染色体"嵌合连接</strong>,在 qPCR 根本无能为力之处区分整合与复制。</p>' +
    tbl(['类别', '基因组', '复制策略', '示例'], [
      ['<strong>I</strong>', '<strong>双链DNA</strong>', '<strong>DNA → mRNA(与宿主细胞相同)</strong>', '<strong>疱疹病毒、腺病毒、天花、非洲猪瘟</strong>'],
      ['II', '单链DNA(+)', '经双链DNA中间体', '细小病毒'],
      ['III', '双链RNA', 'RdRp 从双链RNA转录', '轮状病毒'],
      ['IV', '正链ssRNA', '基因组即 mRNA,直接翻译', 'SARS-CoV-2、丙型肝炎'],
      ['V', '负链ssRNA', '先合成(+)链(RdRp)', '流感、SFTS、狂犬病'],
      ['VI', '正链ssRNA-逆转录', '逆转录酶:RNA → DNA', 'HIV、逆转录病毒'],
      ['VII', '双链DNA-逆转录', '经RNA中间体逆转录', '乙型肝炎']
    ]) + '<hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 流程核心:iciHHV-6 与再激活之辨</h2>' +
    '<p>HHV-6 高病毒血症时的首要临床问题是——<strong>这是活动性感染还是遗传性整合?</strong>qPCR 原则上无法区分这两种状态:两者的血液中都有病毒 DNA。长读长可直接回答。</p>' +
    tbl(['特征', 'HHV-6 再激活', 'iciHHV-6(整合)'], [
      ['<strong>"病毒-染色体"嵌合读长</strong>', '无(病毒以游离体形式复制)', '<strong>有</strong>——读长一半为病毒序列,一半为染色体序列'],
      ['<strong>端粒连接点 (TTAGGG)n</strong>', '无', '<strong>有</strong>——病毒基因组与染色体端粒重复序列拼接'],
      ['<strong>拷贝数</strong>', '复制时升高,治疗时下降', '全身所有细胞稳定为约 1 拷贝/细胞'],
      ['<strong>全血 PCR</strong>', '高但有波动', '稳定"爆表"(数百万拷贝/毫升)'],
      ['<strong>血浆 PCR</strong>', '阳性(病毒存在于血浆)', '通常低/阴性——病毒藏在细胞内'],
      ['<strong>临床表现</strong>', '脑炎、肺炎、血细胞减少', '常无;患者健康'],
      ['<strong>正确处理</strong>', '更昔洛韦/膦甲酸', '<strong>观察</strong>;停用不必要的抗病毒治疗']
    ]) +
    '<p><strong>测序如何看到它:</strong>纳米孔长读长(5–50+ kb)完整跨越插入位点——读长的一部分比对到 HHV-6 基因组(U38、U57 等),另一部分比对到宿主染色体,连接点处可读出端粒重复 (TTAGGG)n。这样的读长是生殖系整合的<strong>确凿证据</strong>:任何复制都不会产生嵌合读长。</p>' +
    '<blockquote>这与我们 <a href="/hpv/">HPV 流程</a>中的<strong>"嵌合读长"</strong>分子机制完全相同——在那里,"病毒-人"嵌合读长证明 HPV 整合入宫颈上皮是癌症的驱动因素;在这里,它证明 HHV-6 整合入生殖系是假病毒载量的根源。</blockquote><hr>' +
    '<h2>🏥 临床场景</h2>' +
    tbl(['场景', '问题', '测序带来的价值'], [
      ['<strong>移植医学(HSCT、实体器官)</strong>', '更昔洛韦治疗下不下降的"难治性"HHV-6 病毒血症——常见的升级为膦甲酸的理由', '确认 iciHHV-6 → 停用有毒治疗,回归标准免疫抑制方案'],
      ['<strong>肾内科 / HSCT</strong>', '造血抑制:HHV-6 再激活还是膦甲酸毒性?', '按拷贝数与嵌合读长区分复制与整合'],
      ['<strong>脑炎鉴别</strong>', 'HSCT 后边缘叶脑炎:脑脊液中的 HHV-6 是再激活还是 iciHHV-6?', '脑脊液病毒 DNA 高而无嵌合读长 = 需要治疗的真实再激活'],
      ['<strong>产前诊断</strong>', '胎儿 iciHHV-6 再激活的罕见病例;羊水中的"病毒载量"', '确认父母与胎儿的遗传性整合 → 排除活动性宫内感染']
    ]) + '<hr>' +
    '<h2>🎯 标志物</h2>' +
    tbl(['标志物', '基因/位点', '意义'], [
      ['<strong>U38</strong>', 'DNA 聚合酶', 'qPCR 诊断的主要靶点;在流程中作为覆盖度与拷贝数的基准点'],
      ['<strong>U57</strong>', '主要衣壳蛋白', '复制标志物;U57 覆盖度随时间上升 = 活动性感染'],
      ['<strong>HHV-6A/6B 鉴别</strong>', '含型特异性多态性的基因组区域(U90–U100、末端 DR 重复)', '6B——幼儿急疹与移植再激活;6A——更多见于 iciHHV-6 及中枢神经系统'],
      ['<strong>端粒连接点</strong>', 'HHV-6 末端重复 (DR-L/DR-R) ↔ 染色体 (TTAGGG)n', '染色体整合的直接证据;插入位点定位']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq HHV-6 Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>HHV6-Integration-Caller</strong>', '基于嵌合读长与端粒连接点检测并定位 iciHHV-6(逻辑继承自 <a href="/hpv/">HPV-Integration-Caller</a>)'],
      ['<strong>HHV6-Copy-Estimator</strong>', '估算每个细胞的病毒拷贝数:整合(约 1)与复制(上升)'],
      ['<strong>HHV6-AB-Typer</strong>', '基于型特异性 SNP 鉴别 HHV-6A/HHV-6B']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 比对 (Mapping)</strong>', '<code>minimap2</code> — HHV-6A (U1102)、HHV-6B (Z29/HST) 参考序列 + <code>GRCh38</code> 用于查找整合位点'],
      ['<strong>3. 嵌合读长检测</strong>', '搜索"病毒-染色体" split/supplementary 比对(<code>pysam</code>,自研 caller),连接点 (TTAGGG)n 过滤'],
      ['<strong>4. 拷贝数与覆盖度</strong>', '<code>samtools</code>,病毒/染色体覆盖度比值自研脚本'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>约 1% 的人类</strong>携带 iciHHV-6:这是数千万人,他们任何一次 HHV-6 血液 PCR 都会"爆表"。在疱疹病毒 PCR 监测已成常规的移植领域,iciHHV-6 是系统性假警报和医源性伤害的源头。</li>' +
    '<li><strong>多余治疗的毒性</strong>——更昔洛韦导致骨髓抑制(HSCT 后尤其危险),膦甲酸导致肾毒性和电解质紊乱。因"假病毒血症"接受数月此类治疗,可能使患者付出移植物植入失败的代价。</li>' +
    '<li><strong>边缘叶脑炎</strong>——HSCT 后的经典并发症(顺行性遗忘、癫痫发作、MRI 上海马改变);HHV-6 是其首要病因,但 iciHHV-6 携带者脑脊液 PCR 阳性时,必须证实的是复制而非整合。</li>' +
    '<li><strong>遗传</strong>——iciHHV-6 按孟德尔方式传递:在患者中确认后,应检查供者(HSCT 时)及亲属——携带 iciHHV-6 的供者会让受者从移植第一天起就出现"病毒载量"。</li></ul><hr>' +
    '<h2>🔬 相关 OnSiteSeq 页面与来源</h2>' +
    '<ul><li>🧬 <a href="/hpv/">HPV 与宫颈癌</a>——相关页面:同样基于"病毒-宿主"嵌合读长检测整合的机制</li>' +
    '<li>📄 <a href="https://hhv-6foundation.org/">iciHHV-6 Foundation — HHV-6 染色体整合资源</a></li>' +
    '<li>📄 <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed — 遗传性染色体整合 HHV-6 (iciHHV-6)</a></li>' +
    '<li>📄 <a href="https://www.ecil-leukaemia.com/">ASTS/ECIL — 移植受者 HHV-6 指南</a></li></ul>';

  /* ── 肠道微生物组(CDI、粪菌移植、肠型)── */
  ZH['/microbiome/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_microbiome.svg" alt="肠道微生物组——由多种细菌组成的群落" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>肠道微生物组:CDI、粪菌移植与肠型</h1>' +
    '<p style="font-size:1.2em;color:#555">从属级列表迈向功能与菌株:基于长读长的肠道宏基因组学</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>肠道微生物组是由数百种细菌、古菌、真菌和病毒组成的生态系统,其基因总量比人类基因组丰富约两个数量级。两个国际旗舰项目确立了该领域的现代科学框架:</p>' +
    '<ul><li><strong>人类微生物组计划 (HMP,NIH,2007–2016)</strong>——表明<strong>微生物基因数量约为人类基因的 100 倍</strong>,且<strong>不存在统一的"健康微生物组"</strong>:健康人群的物种组成差异巨大,而<strong>功能谱(代谢通路)比物种名单更稳定</strong>。</li>' +
    '<li><strong>MetaHIT(欧盟,2008–2012)</strong>——构建了包含 <strong>330 万微生物基因</strong>的目录,描述了<strong>肠型</strong>(以 <em>Bacteroides</em>、<em>Prevotella</em> 或 <em>Ruminococcus</em> 为优势的稳定群落构型),并将<strong>微生物组基因丰富度低下与肥胖、系统性炎症及炎症性肠病 (IBD)</strong> 联系起来。</li></ul>' +
    '<p>两大项目的共同结论:<strong>宏基因组学的诊断价值在于功能与菌株,而非属级名单</strong>。我们的流程正是按此构建:基于纳米孔长读长的全长 16S 与鸟枪法宏基因组学,一次运行即可获得物种/菌株级分辨率、功能注释与耐药组分析。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:粪便、直肠拭子、黏膜活检。<strong>Edge 场景 (Flongle)</strong> 最适合 16S/ITS 扩增子与靶向 panel;深度肠道鸟枪测序属于 Desktop/Cloud 任务 (MinION 及以上)。</li>' +
    '<li><strong>📤 输出:</strong> 面向医生的 HTML 报告——物种级分类谱、多样性指标(香农指数、基因丰富度)、菌群失调标志物、FMT 后的恢复动态、耐药组(AMR 基因);面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>——Flongle 上的 16S/ITS 扩增子与靶向 panel'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>——中等覆盖度鸟枪法宏基因组学 (MinION)'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用——深度鸟枪测序与 MAG 组装']
    ]) +
    '<p>关于 Flongle 的坦率说明:Flongle 芯片的通量足以支持扩增子方案 (16S/ITS) 和靶向 panel——这是<strong>理想的 Edge 场景</strong>。深度肠道鸟枪宏基因组需要数千万条读长,超出 Edge 能力范围——那是 Desktop 与 Cloud 的领域。</p><hr>' +
    '<h2>🎯 临床核心 №1:CDI 与 FMT 监测</h2>' +
    '<p><strong>复发性艰难梭菌感染 (CDI)</strong> 是微生物组治疗最主要的已证实适应证。<strong>粪菌移植 (FMT)</strong> 在复发性 CDI 中的有效率达<strong>约 90%</strong>,而抗生素仅为 20–30%。CDI 诊断本身(tcdA/tcdB、027 核糖体型)由我们的 <a href="/cdifficile/">/cdifficile/</a> 页面覆盖——这里讨论的是 <strong>FMT 前后的微生物组谱</strong>:</p>' +
    tbl(['指标', 'FMT 前(CDI 菌群失调)', 'FMT 成功后'], [
      ['<strong>多样性(香农指数)</strong>', '显著降低', '恢复至供体水平'],
      ['<strong>变形菌门 (Proteobacteria)</strong>', '扩张(菌群失调标志)', '被排挤,占比恢复正常'],
      ['<strong>短链脂肪酸产生菌</strong>(<em>Faecalibacterium</em>、<em>Roseburia</em>)', '匮乏——上皮缺乏丁酸', '回归,重建屏障与定植抗性'],
      ['<strong>厚壁菌门/拟杆菌门 (Firmicutes/Bacteroidetes)</strong>', '平衡偏移', '比值恢复正常']
    ]) +
    '<p>FMT 的宏基因组监测回答实际问题:<strong>供体菌群是否定植成功</strong>(供体 → 受体的菌株级追踪)、多样性是否恢复、耐药基因是否随移植物一同传入。</p><hr>' +
    '<h2>🎯 临床核心 №2:肠道耐药组</h2>' +
    '<p>肠道是人体内<strong>抗生素耐药基因(耐药组)的主要储库</strong>:高密度群落、水平基因转移、抗生素选择压力。耐药组的宏基因组筛查在两个场景中具有临床意义:</p>' +
    '<ul><li><strong>ICU 患者</strong>——多重耐药菌定植可预测呼吸机相关性肺炎与脓毒症的病原学;掌握耐药组可缩窄经验性用药方案。</li>' +
    '<li><strong>移植与化疗前</strong>——中性粒细胞减少会使肠道储库成为细菌易位之源;耐药组谱决定去污染与预防方案。</li></ul>' +
    tbl(['基因', '类别/机制', '临床意义'], [
      ['<strong>vanA</strong>', '糖肽类(万古霉素)', 'VRE 流行病学、移植前筛查'],
      ['<strong>blaNDM</strong>', '碳青霉烯类(金属β-内酰胺酶)', '警报标志:肠道 NDM 储库是不可治愈感染的源头'],
      ['<strong>mcr</strong>', '黏菌素("最后防线"抗生素)', '质粒介导传播,流行病学监测']
    ]) +
    '<p>检测基于 <strong>CARD</strong> 与 <strong>ResFinder</strong> 数据库,鸟枪模式下同时报告遗传背景(质粒/染色体)。</p><hr>' +
    '<h2>⚙️ ONT 技术优势:面向宏基因组学的长读长</h2>' +
    '<ul><li><strong>全长 16S(约 1500 bp)取代 V3–V4</strong>——Illumina 短片段只能分辨到属,且原则上无法区分近缘物种(经典例子:<strong>短 16S 无法区分大肠杆菌与志贺菌</strong>)。纳米孔完整读出整个基因——实现<strong>物种级分辨率</strong>,而非属级。</li>' +
    '<li><strong>长读长组装 MAG(宏基因组组装基因组)</strong>——优势物种的染色体组装成重叠群,从而触及参考数据库中不存在的菌株(肠道中"不可培养"的大多数正是新颖性所在)。</li>' +
    '<li><strong>直接读取甲基化</strong>——纳米孔信号无需亚硫酸盐转化即携带碱基修饰信息:微生物组表观遗传学是同一次运行中的附加数据层。</li></ul><hr>' +
    '<h2>🧪 报告标志物与指标</h2>' +
    tbl(['标志物/指标', '测量内容', '解读'], [
      ['<strong>全长 16S(约 1500 bp)</strong>', '物种级分类', '谱分析的基础;无需按属推测的物种分辨率'],
      ['<strong>香农指数</strong>', 'α-多样性', '下降 = 菌群失调;其动态是 FMT 后恢复的主要标志'],
      ['<strong>基因丰富度</strong>(MetaHIT 指标)', '独特微生物基因数量', '低丰富度 ↔ 肥胖、炎症、炎症性肠病'],
      ['<strong>厚壁菌门/拟杆菌门比值</strong>', '两大优势菌门的平衡', '比值偏移与代谢紊乱相关'],
      ['<strong>变形菌门占比</strong>', '条件致病菌扩张', '菌群失调与炎症的标志;抗生素后升高'],
      ['<strong>短链脂肪酸产生菌</strong>(<em>Faecalibacterium</em>、<em>Roseburia</em>)', '丁酸生成', '上皮健康与定植抗性'],
      ['<strong>耐药组 (CARD / ResFinder)</strong>', '群落中的 AMR 基因', 'vanA、blaNDM、mcr——ICU 与移植前筛查']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>NanoPlot</code>'],
      ['<strong>2. 分类学分析</strong>', '全长 16S 分类(SILVA/GTDB 数据库);鸟枪法采用 <code>Kraken2</code> / <code>minimap2</code> 比对参考序列'],
      ['<strong>3. 多样性指标</strong>', 'α- 与 β-多样性、香农指数、基因丰富度、F/B 比值'],
      ['<strong>4. 耐药组</strong>', '<code>CARD</code>、<code>ResFinder</code>——检测 vanA、blaNDM、mcr 及数百种其他 AMR 基因'],
      ['<strong>5. MAG 组装(鸟枪法)</strong>', '<code>metaFlye</code>、<code>medaka</code>——宏基因组组装基因组的组装与抛光'],
      ['<strong>6. 报告</strong>', '面向医生的 HTML 报告 + 面向生物信息分析师的 QC 报告']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>CDI——院内的流行病</strong>——艰难梭菌仍是医院获得性腹泻的首要病因;抗生素后复发率达 30–60%。有效率约 90% 的 FMT 已成为标准疗法,而供体菌群定植的宏基因组监测是其必不可少的科学配套。</li>' +
    '<li><strong>AMR 大流行</strong>——肠道耐药组(vanA、blaNDM、mcr)是隐蔽的储库,最脆弱患者的多重耐药感染正源于此。耐药组筛查正成为 ICU 与移植医学感染控制的新兴组成部分。</li>' +
    '<li><strong>长读长改变分辨率</strong>——从 V3–V4 走向全长 16S 与鸟枪 MAG 组装,使宏基因组学从"属级名单"提升到物种、菌株与功能层面——正如 HMP 与 MetaHIT 所证明的,诊断价值正在于此。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://hmpdacc.org/">NIH 人类微生物组计划 (HMP)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature08821">MetaHIT——人类肠道微生物基因目录 (Nature,2010)</a></li>' +
    '<li>📄 <a href="https://www.nature.com/articles/nature09944">人类肠道微生物组的肠型 (Nature,2011)</a></li>' +
    '<li>📄 <a href="/cdifficile/">我们的页面——艰难梭菌 (Clostridioides difficile)</a></li></ul>';

  /* ── 阴道微生物组(CST、早产、细菌性阴道病)── */
  ZH['/vaginal/'] =
    '<div class="product-header" style="text-align:center;margin-bottom:2rem">' +
    '<img src="/assets/images/logo/icon_vaginal.svg" alt="阴道微生物组——乳杆菌杆" style="max-height:120px;margin-bottom:1rem">' +
    '<h1>阴道微生物组:早产与菌群失调</h1>' +
    '<p style="font-size:1.2em;color:#555">CST 分型、乳杆菌物种级分辨率与风险评估——在 V3–V4 无能为力之处,全长 16S 大显身手</p></div><hr>' +
    '<h2>🧬 流程说明</h2>' +
    '<p>阴道微生物组是<strong>人类微生物组计划</strong>的五个关键部位之一,在人体各生物群落中以<strong>低多样性</strong>独树一帜:与肠道不同,这里的健康不取决于物种丰富度,而取决于<strong>乳杆菌的优势地位</strong>。阴道群落分为五种类型——<strong>社区状态类型 (CST I–V)</strong>:<strong>CST I</strong>(以卷曲乳杆菌 <em>Lactobacillus crispatus</em> 为优势)是低 pH、屏障稳定的保护性状态;<strong>CST IV</strong>(多种厌氧菌——<em>Gardnerella</em>、<em>Prevotella</em>、<em>Atopobium</em>)是菌群失调,临床上对应细菌性阴道病。在预后上,区分"良好"与"过渡"状态至关重要:惰性乳杆菌 <em>L. iners</em> 并非保护者,而是通往菌群失调的桥梁。</p>' +
    '<p>我们的流程基于纳米孔<strong>全长 16S rRNA 基因</strong>测序数据,确定 CST 分型、乳杆菌与关键厌氧菌的物种组成,以及早产和复发性细菌性阴道病的风险标志物——样本自取,数小时出结果。</p>' +
    '<ul><li><strong>📥 输入:</strong> 高精度碱基识别 (Dorado SUP,R10.4.1 化学体系) 后的原始 <code>FASTQ</code> 数据。样本:<strong>自取</strong>阴道拭子(低生物量不构成障碍)。最佳方案:快速建库并在 <strong>Flongle</strong> 上运行,适用于门诊筛查场景 (Edge)。</li>' +
    '<li><strong>📤 输出:</strong> 面向妇产科医生的 HTML 报告——CST 分型、乳杆菌物种谱、菌群失调标志物与风险评估;面向生物信息分析师的技术 QC 报告。</li></ul><hr>' +
    '<h2>📊 产品可用性</h2>' +
    tbl(['平台', '可用状态'], [
      ['<strong>OnSiteSeq Cockpit Edge</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Desktop</strong>', '🟡 <strong>开发中</strong>'],
      ['<strong>OnSiteSeq Cockpit Cloud</strong>', '🔴 不可用']
    ]) + '<hr>' +
    '<h2>🎯 标志物:CST、乳杆菌、厌氧菌</h2>' +
    '<h3>临床核心 №1——早产</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>CST IV</strong>(厌氧性菌群失调)', '与<strong>早产</strong>风险升高相关——早产是全球新生儿死亡的首要原因'],
      ['<strong>卷曲乳杆菌 <em>L. crispatus</em> 耗竭</strong>', '<strong>孕中期</strong>保护性乳杆菌优势地位丧失是不良妊娠结局的预测因子;在此窗口进行微生物组筛查是可行的预防工具'],
      ['<strong>与 GBS 的衔接</strong>', '微生物组谱与<a href="/agalactiae/">孕妇无乳链球菌筛查</a>互为补充:阴道菌群失调与 GBS 携带是分娩感染风险统一评估的两个方面']
    ]) +
    '<h3>临床核心 №2——细菌性阴道病 (BV)</h3>' +
    tbl(['标志物', '意义'], [
      ['<strong>阴道加德纳菌 <em>Gardnerella vaginalis</em>(分支)</strong>', 'BV 生物膜的关键组分;分支级分辨率很重要——各分支在毒力及与复发的关联上存在差异'],
      ['<strong>阴道阿托波菌 <em>Atopobium vaginae</em></strong>', '重症及<strong>复发性</strong> BV 的标志;对甲硝唑耐药——其优势地位解释了标准疗法的失败'],
      ['<strong>普雷沃菌 <em>Prevotella</em> spp.</strong>', 'CST IV 多微生物厌氧联合体的组分;与炎症背景相关'],
      ['<strong>复发率高达 50%</strong>', '甲硝唑治疗后,每两位患者中就有一位 BV 复发——分子谱分析(取代 Nugent 显微镜评分)可揭示原因:生物膜、<em>Atopobium</em>、根除不彻底'],
      ['<strong>性传播感染风险</strong>', 'BV 升高性传播感染风险,包括 <strong>HIV</strong> 与 <strong>HPV 持续感染</strong>——阴道微生物组直接影响人乳头瘤病毒的清除(参见我们的 <a href="/hpv/">HPV 页面</a>)']
    ]) +
    '<h3>技术优势:全长 16S</h3>' +
    tbl(['问题', 'V3–V4 (Illumina)', '全长 16S (ONT)'], [
      ['<strong>L. crispatus 与 L. iners</strong>', '无法区分', '<strong>可以区分</strong>——而这是预后截然相反的两个物种:crispatus 起保护作用,iners 是走向菌群失调的过渡状态'],
      ['<strong>加德纳菌分支</strong>', '属级分辨率', '物种级与种内分辨率'],
      ['<strong>L. crispatus 的 SNV 菌株追踪</strong>', '不可能', '可行——治疗与妊娠过程中的菌株动态追踪'],
      ['<strong>模式</strong>', '固定实验室', '自取样本 → Flongle → 数小时出结果;低生物量无妨']
    ]) + '<hr>' +
    '<h2>⚙️ 版本与机器学习模型</h2>' +
    '<h3>核心工具</h3>' +
    tbl(['组件', '状态'], [['<strong>OnSiteSeq Vaginal Microbiome Pipeline</strong>', '🟡 开发中']]) +
    '<h3>计划中的机器学习模型</h3>' +
    tbl(['模型', '目标任务'], [
      ['<strong>VM-CST-Classifier</strong>', '基于全长 16S 谱自动进行 CST 分型 (I–V)'],
      ['<strong>VM-PTB-Risk</strong>', '基于孕中期微生物组组成评估早产风险'],
      ['<strong>VM-BV-Relapse</strong>', '基于 <em>Atopobium</em> / 加德纳菌分支谱预测治疗后 BV 复发']
    ]) + '<hr>' +
    '<h2>🛠 技术架构 (Pipeline Stack)</h2>' +
    '<p>流程由 Snakemake 框架管理,运行于相互隔离的 Conda 环境中。</p>' +
    tbl(['流程阶段', '库与工具'], [
      ['<strong>1. 质量控制 (QC)</strong>', '<code>porechop_abi</code>、<code>NanoFilt</code>、<code>pigz</code>'],
      ['<strong>2. 全长 16S 分类学分析</strong>', '<code>minimap2</code> + 阴道生物群系 16S 人工整编数据库(乳杆菌与加德纳菌分支的物种级分辨率)'],
      ['<strong>3. CST 分型</strong>', '对照 CST I–V 参考谱进行聚类(VALENCIA 的改进版)'],
      ['<strong>4. SNV 分析</strong>', '<code>clair3</code>、<code>medaka</code>——<em>L. crispatus</em> 菌株动态追踪'],
      ['<strong>5. 机器学习推理</strong>', '<code>PyTorch</code>、<code>pandas</code>、<code>scikit-learn</code>']
    ]) + '<hr>' +
    '<h2>🌍 全球背景:为何重要</h2>' +
    '<ul><li><strong>早产</strong>——全球每年约 1500 万例,是 5 岁以下儿童死亡的首要原因。阴道菌群失调(CST IV、卷曲乳杆菌耗竭)是可干预的危险因素:孕中期微生物组筛查为预防打开了窗口。</li>' +
    '<li><strong>细菌性阴道病</strong>——育龄女性最常见的阴道疾病;甲硝唑治疗后复发率高达 50%。从主观显微镜检查(Nugent 评分)转向分子谱分析,正是测序所能满足的需求。</li>' +
    '<li><strong>与 HIV 和 HPV 的关联</strong>——阴道菌群失调升高 HIV 易感性并阻碍 HPV 清除,因此微生物组状态不仅关乎妇科,也关乎肿瘤与性传播感染的预防。</li>' +
    '<li><strong>筛查的去中心化</strong>——自取样本与 Flongle 快速分析使微生物组检测在门诊层面即可开展,无需固定的测序实验室。</li></ul><hr>' +
    '<h2>🔬 参考来源</h2>' +
    '<ul><li>📄 <a href="https://hmpdacc.org/">人类微生物组计划——阴道微生物组 (NIH HMP)</a></li>' +
    '<li>📄 <a href="https://www.pnas.org/">Ravel 等——育龄女性阴道微生物组 (PNAS,CST I–V)</a></li>' +
    '<li>📄 <a href="https://www.science.org/journal/stm">DiGiulio 等——妊娠期人类微生物组的时空变化 (Science Translational Medicine)</a></li></ul>';

  /* ── BPPB-2026 会议 ── */
  ZH['/conferences/bppb-2026/'] =
    '<div class="product-header" style="text-align: center; margin-bottom: 2rem;">' +
    '<h1>第二届全俄科学与实践会议“面向未来食品工业的生物技术:科学与产业平台”</h1>' +
    '<p style="font-size: 1.2em; color: #555;">OnSiteSeq 关于稻瘟病田间快速诊断的海报</p></div><hr>' +
    '<h2>🎤 关于会议</h2>' +
    '<p>2026 年 9 月 18 日,第二届全俄科学与实践会议<strong>“面向未来食品工业的生物技术:科学与产业平台”(БППБ-2026)</strong>在<strong>俄罗斯科学院恩格尔哈特分子生物学研究所</strong>(莫斯科)举行,莫斯科物理技术学院 (МФТИ) 参与协办。会议汇聚了来自莫斯科、圣彼得堡、沃罗涅日、巴尔瑙尔、科尔佐沃和明斯克的团队——从学术研究所到工业实验室。</p>' +
    '<p><strong>OnSiteSeq</strong> 团队展示了海报:</p>' +
    '<ul><li><strong>海报:</strong>“OnSiteSeq 软硬件一体化系统:稻瘟病快速诊断与稻瘟病菌 <em>Pyricularia oryzae</em> 杀菌剂抗性的田间检测”</li>' +
    '<li><strong>作者:</strong>Gorbenko R.A.(莫斯科物理技术学院 МФТИ)</li>' +
    '<li><strong>主题:</strong>将我们的纳米孔诊断平台从临床转移到田间——直接在田间检测稻瘟病(稻热病)病原体与杀菌剂抗性标志物,无需中心实验室。详见流程页面:<a href="/magnaporthe/">稻瘟病 (Magnaporthe oryzae)</a></li></ul>' +
    '<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">' +
    '<div style="flex: 1; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_main.jpg" alt="Roman Gorbenko 在 БППБ-2026 的 OnSiteSeq 海报旁" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Roman Gorbenko 在海报“OnSiteSeq 软硬件一体化系统:稻瘟病快速诊断与稻瘟病菌 Pyricularia oryzae 杀菌剂抗性的田间检测”旁(Gorbenko R.A.,МФТИ)</p></div>' +
    '<div style="flex: 1; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_photo.jpg" alt="海报专场上的 OnSiteSeq 海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">同一张 OnSiteSeq 海报,第二个镜头:作者在海报专场大厅介绍工作</p></div></div><hr>' +
    '<h2>📋 海报专场</h2>' +
    '<p>海报专场设在俄罗斯科学院分子生物学研究所明亮的大理石大厅:移动展架上的展板在历史悠久的吊灯下排成一排。研究主题从重组凝乳酶、多酶制剂到产油酵母、细菌纳米纤维素与田间快速基因组学。在此背景下,OnSiteSeq 关于稻瘟病田间诊断的海报自然融入了“科学服务产业”的议程:植物病原体的杀菌剂抗性与该项目临床流程中的 AMR 遵循同一逻辑,只是站在农学家一侧。</p>' +
    '<p>以下为同行海报照片,附内容说明:</p>' +
    '<div class="gallery" style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_01.jpg" alt="俄罗斯科学院分子生物学研究所大楼" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">会议举办地:俄罗斯科学院恩格尔哈特分子生物学研究所主楼正面</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_16.jpg" alt="ИМБ РАН 牌匾" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">楼前牌匾:“联邦国家预算科学机构——俄罗斯科学院恩格尔哈特分子生物学研究所”——会议举办地点</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_02.jpg" alt="在 ИМБ РАН 入口" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">Roman Gorbenko 带着卷起的 OnSiteSeq 海报在俄罗斯科学院分子生物学研究所 (ИМБ РАН) 入口</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_15.jpg" alt="展台上的 OnSiteSeq 海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报专场展台上的 OnSiteSeq 海报(Gorbenko R.A.,МФТИ),与相邻展板的全景合影</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_03.jpg" alt="多酶生物传感器海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“基于仿生载体的新一代多酶生物传感器:从单分析物检测到联合诊断与生物催化解毒”(Kraevskaya A.G.;普列汉诺夫俄罗斯经济大学 (РЭУ),谢切诺夫第一莫斯科国立医科大学 (ПМГМУ))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_04.jpg" alt="噬菌体溶素海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“Curtobacterium AYKA 噬菌体病毒粒子相关溶素 gp12 的表达与研究”(Yakimov A.Yu. 等;俄罗斯科学院生物有机化学研究所 (ИБХ РАН),莫斯科国立大学 (МГУ),俄罗斯生物技术大学 (РОСБИОТЕХ),皮罗戈夫俄罗斯国立研究医科大学 (РНИМУ))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_05.jpg" alt="羚牛凝乳酶原海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“Pichia pastoris 酵母中 AOX1 与 GAP 介导的羚牛凝乳酶原表达比较”(Saventseva E.A.,Shcherbakov D.N.;阿尔泰国立大学,国家病毒学与生物技术研究中心“Vector”)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_06.jpg" alt="酪乳加工海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“作为生物活性肽非传统原料来源的酪乳加工”(Stanislavskaya E.B. 等;沃罗涅日国立工程技术大学)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_07.jpg" alt="Debaryomyces hansenii 去饱和酶海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“Debaryomyces hansenii 旁系同源去饱和酶的功能鉴定”(Melnikova S.A.,Polyakova A.N.,Karpov D.S.;俄罗斯科学院分子生物学研究所 (ИМБ РАН),莫斯科物理技术学院 (МФТИ))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_08.jpg" alt="燕麦格瓦斯海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“Bacillus subtilis Ч-13 多酶制剂对燕麦格瓦斯品质与抗氧化潜力的影响”(Burnysheva T.O. 等;圣彼得堡国立工艺学院(技术大学) (СПбГТИ (ТУ)))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_09.jpg" alt="产油酵母海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“从农牧动物乳中分离产油酵母”(Bogdanova A.S. 等;俄罗斯科学院分子生物学研究所 (ИМБ РАН),加马列亚国家流行病学与微生物学研究中心 (НИЦЭМ),高等经济大学 (НИУ ВШЭ))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_10.jpg" alt="胶原肽海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“用于肌肉骨骼疾病功能性食品的禽类副产物生物活性胶原肽”(Kodesnikova T.L.,Polishchuk E.K.;俄罗斯生物技术大学 (РОСБИОТЕХ),俄罗斯科学院戈尔巴托夫食品系统联邦研究中心 (ФНЦ пищевых систем))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_11.jpg" alt="纳米纤维素海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“产纳米纤维素醋酸菌培养物的分离与鉴定”(Bareyko A.A. 等;白俄罗斯国家科学院微生物学研究所,明斯克)</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_12.jpg" alt="凝乳酶规模化海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“以凝乳酶生产菌株为例的实验室条件下食品酶规模化生产成功原则”(Trofimov A.V. 等;俄罗斯科学院生物技术联邦研究中心 (ФИЦ Биотехнологии РАН),门捷列夫化工大学 (РХТУ),莫斯科物理技术学院 (МФТИ))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_13.jpg" alt="凝乳酶纯化海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“以凝乳酶为例获得优质产品的食品酶纯化中试技术”(Borovikova A.O. 等;俄罗斯科学院生物技术联邦研究中心 (ФИЦ Биотехнологии РАН))</p></div>' +
    '<div style="flex: 1 1 300px; min-width: 300px;">' +
    '<img src="/assets/images/conf/bppb2026_14.jpg" alt="产油酵母菌株海报" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
    '<p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 10px;">海报“水果和蔬菜表面产油酵母菌株的筛选与鉴定”(Nandysheva A.A. 等;俄罗斯科学院分子生物学研究所 (ИМБ РАН) / “Cloning Facility”)</p></div></div><hr>' +
    '<h2>💡 我们为何参会</h2>' +
    '<p>БППБ-2026 是一场食品工业会议,我们的水稻海报出现在那里并非偶然。首先,<em>Pyricularia oryzae</em> 的杀菌剂抗性与我们为临床病原体解决的 AMR 分子问题完全相同:标志物、突变、快速应答。其次,食品安全始于田间:耐杀菌剂的病原体意味着产量损失与过量施药。第三,正是在这样的平台上,“科学→产业”的纽带得以形成:对 OnSiteSeq 而言,这是通往农业领域合作的路径。</p><hr>' +
    '<blockquote>💡 <strong>Open Source 倡议:</strong>项目源代码已在 <a href="https://gitverse.ru/onsiteseq/">GitVerse</a> 上开源。</blockquote>' +
    '<p><strong>相关页面:</strong><a href="/magnaporthe/">稻瘟病 (Magnaporthe oryzae)</a> · <a href="/#i18n-sec-farmer">农民助手</a> · <a href="/conferences/msit-2026/">其他会议:MSIT-2026</a></p>';

  /* ════════════════════════════════════════════════════
     HOME PAGE TRANSLATIONS
  ════════════════════════════════════════════════════ */
  var HOME = {
    tagline: 'AI medtech platform for managing containerised bioinformatics pipelines. Drug resistance, pathogen subtype determination and more. Operates under <a href="/gxp">GxP, GLP, ALCOA+</a> standards.',
    dzenText: 'News, videos, project blog on Dzen',
    sections: {
      'Описание компонентов': 'Platform Components',
      'Реализованные пейплайны': 'Implemented Pipelines',
      'Онкология. Пейплайны в работе.': 'Oncology. Pipelines in Development.',
      'Пейплайны в работе. Помощники врача.': 'Pipelines in Development. Clinical Assistants.',
      'Пейплайны в работе. Помощники врача. Вселенная клостридий.': 'Pipelines in Development. Clinical Assistants. Clostridia Universe.',
      'Пейплайны в работе. Помощники врача. Вселенная дрожжевых грибов.': 'Pipelines in Development. Clinical Assistants. Yeast Universe.',
      'Пейплайны в работе. Помощники врача. Вселенная кокков.': 'Pipelines in Development. Clinical Assistants. Cocci Universe.',
      'Пейплайны в работе. Помощники врача. Вселенная герпесвирусов.': 'Pipelines in Development. Clinical Assistants. Herpesvirus Universe.',
      'Пейплайны в работе. Помощники фермера.': 'Pipelines in Development. Agriculture Assistants.',
      'Пейплайны в работе. Помощники криминалиста.': 'Pipelines in Development. Forensic Assistant.'
    },
    navLinks: {
      'О платформе': 'About Platform',
      'Контакты': 'Contacts',
      'Вход в Облако': 'Cloud Login',
      'Главная': 'Home'
    },
    cards: {
      'edge':         ['OnSiteSeq Edge', 'Autonomous hardware-software complex. Point-of-care sequencing at the bedside, in remote regions. arm64 architecture, Nvidia Jetson AGX GPU.'],
      'desktop':      ['OnSiteSeq Desktop', 'Cockpit pipeline management system for the physician\'s workstation. Runs standalone or paired with Edge. x86 architecture.'],
      'cloud':        ['OnSiteSeq Cloud', 'Cockpit version for cloud providers. Available at cloud.onsiteseq.io. x86 architecture.'],
      'hiv':          ['HIV', 'HIV-1 drug resistance and subtype determination'],
      'tuberculosis': ['Tuberculosis', 'Drug resistance and lineage determination of Mycobacterium tuberculosis'],
      'hpv':          ['Human Papillomavirus (HPV)', 'High-risk HPV genotyping, host-genome integration status and methylation triage for cervical cancer prevention — from the root cause to the key element of prevention'],
      'cdifficile':   ['C. difficile (Clostridia)', 'Drug resistance and toxigenicity determination of Clostridioides difficile — causative agent of antibiotic-associated colitis'],
      'perfringens':  ['Gas Gangrene (C. perfringens)', 'Toxinotyping (cpa/cpb/etx/cpe/netB) and AMR profiling of Clostridium perfringens in hours — in myonecrosis every hour counts: ~15 cm/hour spread, up to 100% untreated lethality'],
      'botulinum':    ['Botulism (C. botulinum)', 'bont A–G detection and serotyping in hours — the most potent toxin known; antitoxin works only when given early'],
      'sordellii':    ['Toxic Shock (P. sordellii & C. septicum)', 'Shock without fever after childbirth and spontaneous gangrene as a marker of occult cancer — tcsL/tcsH and csa detection from blood and tissue in hours'],
      'novyi':        ['C. novyi-NT Oncolytic', 'Oncolytic clostridia — genomic QC of the therapeutic strain and monitoring of spore germination in the hypoxic tumour core'],
      'chauvoei':     ['Blackleg (C. chauvoei)', 'Emphysematous carbuncle of cattle — field differentiation from anthrax, cctA detection, molecular epidemiology of outbreaks'],
      'gonorrhoeae':  ['Gonorrhoea (N. gonorrhoeae)', 'Drug resistance determination of Neisseria gonorrhoeae — WHO priority AMR pathogen'],
      'mycoplasma':   ['Mycoplasma genitalium', 'Pre-treatment resistance testing of M. genitalium to macrolides and fluoroquinolones — rapidly emerging multidrug resistance, frequently missed STI pathogen'],
      'syphilis':     ['Syphilis (T. pallidum)', 'Macrolide resistance determination and genotyping of Treponema pallidum'],
      'acinetobacter': ['Acinetobacter baumannii (CRAB)', 'Complete AMR profile and carbapenemase detection (OXA-23, NDM, VIM) — WHO priority "critical" pathogen, the main ICU threat'],
      'pseudomonas':  ['Pseudomonas aeruginosa (CRPA)', 'Complete AMR profile, MBL (VIM, NDM) and efflux pump (MexAB) detection — a master of adaptation, key pathogen of ICUs and cystic fibrosis'],
      'chlamydia':    ['Chlamydia (C. trachomatis)', 'Serovar (A–L) genotyping and macrolide/fluoroquinolone resistance determination — the most common bacterial STI in the world'],
      'albicans':     ['Candida albicans', 'Azole (ERG11, TAC1, efflux) and echinocandin (FKS1) resistance + aneuploidies (isochromosome 5L) — SNV, CNV and structural variants in a single long-read run'],
      'auris':        ['Candida auris Superbug', 'Molecular identification (phenotyping gets it wrong), clade I–VI determination, MDR profile and SNP tracking of nosocomial outbreaks'],
      'glabrata':     ['Candida glabrata (Nakaseomyces)', 'Resistance evolving during therapy — PDR1, FKS1/FKS2 hot spots, MSH2 mutator phenotype; serial isolate monitoring'],
      'parapsilosis': ['Candida parapsilosis', 'Outbreaks in neonatal ICUs and catheter-associated candidaemia — ERG11 Y132F detection and SNP source tracing (staff hands, equipment)'],
      'tropicalis':   ['Candida tropicalis & C. krusei', 'Asian azole-resistant tropicalis clones (ERG11 Y132F/A395T) and intrinsic fluconazole resistance of krusei — species identification decides the starting therapy'],
      'malassezia':   ['Malassezia (lipophilic yeasts)', 'NICU fungaemia in infants on lipid emulsions and zoonotic M. pachydermatis outbreaks from dogs — culture is painful (Dixon agar), molecular ID and SNP tracing solve it'],
      'cryptococcus': ['Cryptococcus neoformans / gattii', 'Cryptococcal meningitis — up to 19% of HIV-related mortality: neoformans/gattii species differentiation, VNI–VNIV/VGI–VGIV typing and azole heteroresistance via chromosome 1 disomy'],
      'meningitidis': ['Meningococcus (N. meningitidis)', 'Point-of-care serogrouping and resistance determination of Neisseria meningitidis — fulminant meningitis where every hour counts'],
      'hbv':          ['Hepatitis B (HBV)', 'HBV genotyping (A–J), polymerase resistance mutations (YMDD), HBeAg status and liver cancer risk markers — from a single assay'],
      'hvkp':         ['Hypervirulent Klebsiella (hvKP)', 'Virulence markers (rmpA, iucA, peg-344), K1/K2 capsular types and convergence with carbapenem resistance — liver abscess and metastatic infections'],
      'sfts':         ['SFTS (Dabie bandavirus)', 'Point-of-care mNGS for severe fever with thrombocytopenia syndrome — L/M/S segment analysis and differential diagnosis of haemorrhagic fevers in endemic areas'],
      'thalassemia':  ['Thalassemia (HBA/HBB)', 'One assay instead of gap-PCR + MLPA + Sanger: α-cluster deletions, HBB mutations and cis/trans phasing on long reads — carrier couple screening and prenatal diagnosis'],
      'magnaporthe':  ['Rice Blast (Magnaporthe oryzae)', 'The most devastating rice disease — race and Avr-effector monitoring, Triticum pathotype (wheat blast), fungicide sensitivity'],
      'hlb': ['Citrus Huanglongbing (HLB)', 'Citrus greening — unculturable Candidatus Liberibacter asiaticus vectored by psyllids: molecular detection, SNP clusters and prophage profiling, CLas/CLaf/CLam species differentiation'],
      'sarscov2':     ['Coronavirus SARS-CoV-2', 'Variant (subtype) and antiviral drug resistance determination'],
      'helicobacter': ['Helicobacter pylori', 'Resistance and virulence profile (cagA/vacA) of H. pylori from a biopsy in one day — for personalised eradication therapy'],
      'staphylococcus': ['S. aureus (Staphylococcus)', 'MRSA/VRSA and full AMR profile determination — leading nosocomial pathogen'],
      'pneumoniae':   ['Pneumococcus (S. pneumoniae)', 'Mosaic pbp2x/pbp2b/pbp1a and cps-locus serotyping: vaccine escape (19A, 22F, 33F) and penicillin resistance that phenotype cannot predict'],
      'pyogenes':     ['Group A Streptococcus (S. pyogenes)', 'emm-typing instead of Sanger, superantigens speA/speC/ssa and macrolide resistance (ermB/mefA) — from pharyngitis to necrotising fasciitis'],
      'agalactiae':   ['Group B Streptococcus (S. agalactiae)', 'Point-of-care screening of pregnant women in the delivery ward in hours instead of an 18–48 h culture — serotypes, CC17 clone and resistance markers in penicillin allergy'],
      'faecium':      ['Vancomycin-Resistant Enterococcus (E. faecium)', 'vanA/vanB with plasmid-context resolution of Tn1546 on long reads — ICU outbreak tracing and genotype over phenotype for therapy choice'],
      'flu':          ['Viral ARTI', 'Metagenomic identification of viral respiratory pathogens — influenza A/B, RSV, rhinovirus, coronaviruses, adenovirus, etc.'],
      'cold':         ['Bacterial ARI', 'Metagenomic identification of bacterial respiratory pathogens and AMR — S. pneumoniae, H. influenzae, K. pneumoniae, etc.'],
      'haemophilus':  ['H. influenzae (Pfeiffer\'s bacillus)', 'BLNAR via ftsI (PBP3) mutations invisible to β-lactamase PCR, a–f/NTHi serotyping and differentiation from H. haemolyticus — otitis, COPD, epiglottitis'],
      'microbiome':   ['Gut Microbiome', 'In the footsteps of HMP and MetaHIT: full-length 16S to species level, before/after FMT profiling in recurrent C. difficile, ICU resistome — enterotypes and functions over genus lists'],
      'vaginal':      ['Vaginal Microbiome', 'CST typing and L. crispatus vs L. iners on full-length 16S — a predictor of preterm birth and bacterial vaginosis relapse'],
      'cmv':          ['Cytomegalovirus (CMV)', 'Resistance genotyping in transplant care: UL97 (ganciclovir), UL54, UL56 (letermovir) — 5–20% minority subpopulations that Sanger cannot see'],
      'hsv':          ['Herpes Simplex (HSV-1/HSV-2)', 'Encephalitis — every hour costs neurons: CSF mNGS and acyclovir resistance (UL23/UL30) in immunocompromised patients within hours'],
      'ebv':          ['Epstein–Barr Virus (EBV)', '"Cantonese cancer" — nasopharyngeal carcinoma screening by plasma EBV DNA, strain typing (del-LMP1) and terminal-repeat clonality; PTLD'],
      'hhv6':         ['HHV-6 & iciHHV-6', 'The integration trap: ~1% of people carry HHV-6 in the germline — chimeric virus–telomere reads tell it from reactivation and spare unneeded ganciclovir'],
      'identikit':    ['DNA Forensic Portrait', 'Appearance, ancestry and age prediction from crime scene DNA — Forensic DNA Phenotyping via nanopore sequencing'],
      'phytophthora': ['Phytophthora & Plant Pathogens', 'Metagenomic identification of plant pathogens and fungicide resistance — P. infestans, Fusarium, Botrytis, etc. Right in the field.'],
      'phytophthora-infestans': ['Late Blight (Phytophthora infestans)', 'Late blight of potato and tomato — resistance markers for metalaxyl, CAA fungicides and strobilurins'],
      'phytophthora-sojae': ['Soybean Root Rot (Phytophthora sojae)', 'Soybean root and stem rot — race monitoring and resistance to phenylamides and CAA'],
      'fusarium-oxysporum': ['Fusarium Wilt (Fusarium oxysporum)', 'Wilt of tomato, cucumber and cereals — detection of formae speciales (f. sp.) and benzimidazole resistance'],
      'fusarium-graminearum': ['Fusarium Head Blight (Fusarium graminearum)', 'Head blight of wheat and barley — DON/zearalenone mycotoxins, resistance to azoles and carbendazim'],
      'alternaria-solani': ['Early Blight (Alternaria solani)', 'Early blight of potato and tomato — resistance to QoI (strobilurins) and SDHI fungicides'],
      'botrytis-cinerea': ['Grey Mould (Botrytis cinerea)', 'Grey mould of grape, strawberry and vegetables — full fungicide multidrug resistance profile'],
      'pythium': ['Pythium spp.', 'Root rots and seedling damping-off — differentiation from Fusarium/Rhizoctonia, mefenoxam resistance'],
      'plasmopara-viticola': ['Grape Downy Mildew (Plasmopara viticola)', 'Downy mildew of grapevine — resistance to QoI, CAA and phenylamides'],
      'peronospora': ['Downy Mildew (Peronospora spp.)', 'Downy mildew of sunflower and onion — race monitoring and phenylamide resistance'],
      'asfv': ['African Swine Fever (ASFV)', 'Farm-gate ASFV detection in hours — p72 genotyping, low-virulence deletion variants (CD2v/MGF), differentiation from classical swine fever']
    },
    footer: {
      'normativ': 'Want to learn about legislation supporting innovation and personalised medicine?',
      'citation': 'Want to cite this research?',
      'mfti':     'Want to know about other startups and discoveries at MIPT?',
      'ruwiki':   'Why do we consider it important to develop this encyclopaedia?',
      'sber':     'Want to learn how GitVerse provides code storage and CI/CD for this project?',
      'gxp':      'Want to learn about the industry standards we follow?',
      'conferences/bppb-2026': 'OnSiteSeq at the conference "Biotechnologies for the Food Industry of the Future" (BPPB-2026, Engelhardt Institute of Molecular Biology RAS)'
    },
    footerDesc: {
      'normativ': '',
      'citation': 'Articles and preprints.',
      'mfti':     'The project was born at MIPT.',
      'ruwiki':   'Website content = article for RuWiki.',
      'sber':     'Repository and CI/CD on GitVerse.',
      'gxp':      'GxP — we followed "best practices" in project design.',
      'conferences/bppb-2026': 'Poster session: field rapid diagnostics of rice blast.'
    }
  };

  /* ════════════════════════════════════════════════════
     HOME PAGE TRANSLATIONS — CHINESE (partial, falls back to EN)
  ════════════════════════════════════════════════════ */
  var ZH_HOME = {
    tagline: 'AI 医疗科技平台:管理容器化生物信息学分析流程。药物耐药性检测、病原体亚型鉴定等。遵循 <a href="/gxp">GxP、GLP、ALCOA+</a> 标准。',
    dzenText: '项目新闻、视频与博客(Dzen)',
    sections: {
      'Описание компонентов': '平台组件',
      'Реализованные пейплайны': '已实现的分析流程',
      'Онкология. Пейплайны в работе.': '肿瘤学 · 开发中的流程',
      'Пейплайны в работе. Помощники врача.': '开发中的流程 · 医生助手',
      'Пейплайны в работе. Помощники врача. Вселенная клостридий.': '开发中的流程 · 医生助手 · 梭菌宇宙',
      'Пейплайны в работе. Помощники врача. Вселенная дрожжевых грибов.': '开发中的流程 · 医生助手 · 酵母菌宇宙',
      'Пейплайны в работе. Помощники врача. Вселенная кокков.': '开发中的流程 · 医生助手 · 球菌宇宙',
      'Пейплайны в работе. Помощники врача. Вселенная герпесвирусов.': '开发中的流程 · 医生助手 · 疱疹病毒宇宙',
      'Пейплайны в работе. Помощники фермера.': '开发中的流程 · 农业助手',
      'Пейплайны в работе. Помощники криминалиста.': '开发中的流程 · 法医助手'
    },
    navLinks: {
      'О платформе': '关于平台',
      'Контакты': '联系我们',
      'Вход в Облако': '云端登录',
      'Главная': '首页'
    },
    cards: {
      'asfv': ['非洲猪瘟 (ASFV)', '猪场门口数小时出结果 — p72 基因分型、低毒力缺失变异株 (CD2v/MGF)、与经典猪瘟鉴别'],
      'perfringens': ['气性坏疽(产气荚膜梭菌)', '产气荚膜梭菌毒素分型 (cpa/cpb/etx/cpe/netB) 与 AMR 谱分析数小时出结果 — 肌坏死分秒必争:蔓延约 15 厘米/小时,未经治疗致死率可达 100%'],
      'cdifficile': ['艰难梭菌 (C. difficile)', '艰难梭菌(Clostridioides difficile)——抗生素相关性结肠炎病原体——的耐药性与产毒能力检测'],
      'botulinum': ['肉毒中毒 (C. botulinum)', '数小时完成 bont A–G 检测与血清分型 — 已知最剧烈的毒素;抗毒素仅在早期给药时有效'],
      'sordellii': ['中毒性休克 (P. sordellii 与 C. septicum)', '产后无发热休克与作为隐匿癌症标志的自发性坏疽 — 数小时内从血液和组织检测 tcsL/tcsH 与 csa'],
      'novyi': ['溶瘤梭菌 C. novyi-NT', '溶瘤梭菌 — 治疗菌株基因组质控与肿瘤缺氧核心孢子萌发监测'],
      'chauvoei': ['气肿疽 (C. chauvoei)', '牛气肿疽 — 现场与炭疽鉴别、cctA 检测、暴发的分子流行病学'],
      'hbv':  ['乙型肝炎 (HBV)', 'HBV 基因分型 (A–J)、聚合酶耐药突变 (YMDD)、HBeAg 状态与肝癌风险标志物 — 一次检测完成'],
      'hvkp': ['高毒力肺炎克雷伯菌 (hvKP)', '毒力标志物 (rmpA、iucA、peg-344)、K1/K2 荚膜血清型与碳青霉烯耐药性汇聚 — 肝脓肿与转移性感染'],
      'sfts': ['发热伴血小板减少综合征 (SFTS)', '床旁 mNGS 检测发热伴血小板减少综合征 — L/M/S 节段分析与流行区出血热鉴别诊断'],
      'thalassemia': ['地中海贫血 (HBA/HBB)', '一次检测替代 gap-PCR + MLPA + Sanger:α-簇缺失、HBB 突变与长读长顺/反式定相 — 携带者夫妇筛查与产前诊断'],
      'magnaporthe': ['稻瘟病 (Magnaporthe oryzae)', '最具破坏性的水稻病害 — 生理小种与 Avr 效应蛋白监测、Triticum 致病型(小麦瘟病)、杀菌剂敏感性'],
      'hlb': ['柑橘黄龙病 (HLB)', '柑橘"青果病" — 由木虱传播、无法人工培养的亚洲韧皮部杆菌 (Candidatus Liberibacter asiaticus):分子检测、SNP 簇与前噬菌体谱分析、CLas/CLaf/CLam 种间鉴别'],
      'tuberculosis': ['结核病', '结核分枝杆菌耐药性与谱系(基因型)鉴定'],
      'helicobacter': ['幽门螺杆菌 (H. pylori)', '基于基因组的耐药与毒力谱分析,用于个体化根除治疗'],
      'sarscov2': ['新型冠状病毒 SARS-CoV-2', '变异株(亚型)鉴定与抗病毒药物耐药性检测'],
      'hpv': ['人乳头瘤病毒 (HPV)', '高危型 HPV 基因分型、宿主基因组整合状态与甲基化分流,用于宫颈癌预防 — 从病因到预防的关键环节'],
      'gonorrhoeae': ['淋病 (淋病奈瑟菌)', '淋病奈瑟菌耐药性检测 — WHO 重点 AMR 病原体'],
      'meningitidis': ['脑膜炎奈瑟菌 (N. meningitidis)', '脑膜炎奈瑟菌床旁血清分群与耐药性检测 — 暴发性脑膜炎,分秒必争'],
      'mycoplasma': ['生殖支原体 (Mycoplasma genitalium)', '治疗前检测生殖支原体对大环内酯类和氟喹诺酮类的耐药性 — 快速发展的多重耐药,常被漏诊的性传播病原体'],
      'syphilis': ['梅毒 (梅毒螺旋体)', '梅毒螺旋体大环内酯类耐药性检测与基因分型'],
      'acinetobacter': ['鲍曼不动杆菌 (CRAB)', '完整 AMR 谱与碳青霉烯酶检测 (OXA-23、NDM、VIM) — WHO"危急"级别重点病原体,ICU 的首要威胁'],
      'pseudomonas': ['铜绿假单胞菌 (CRPA)', '完整 AMR 谱、金属 β-内酰胺酶 (VIM、NDM) 与外排泵 (MexAB) 检测 — 适应性大师,ICU 与囊性纤维化的关键病原体'],
      'chlamydia': ['衣原体感染 (沙眼衣原体)', '血清型 (A–L) 基因分型与大环内酯类/氟喹诺酮类耐药性检测 — 全球最常见的细菌性传播感染'],
      'albicans': ['白色念珠菌', '唑类(ERG11、TAC1、外排泵)与棘白菌素类(FKS1)耐药 + 非整倍体(5L 等臂染色体)— 长读长单次运行完成 SNV、CNV 与结构变异分析'],
      'auris': ['超级真菌耳念珠菌', '分子鉴定(表型易误判)、进化分支 I–VI 判定、MDR 谱与院内暴发的 SNP 追踪'],
      'glabrata': ['光滑念珠菌 (Nakaseomyces)', '治疗过程中不断进化的耐药性 — PDR1、FKS1/FKS2 热点突变、MSH2 突变子表型;连续分离株监测'],
      'parapsilosis': ['近平滑念珠菌', '新生儿 ICU 暴发与导管相关念珠菌血症 — ERG11 Y132F 检测与 SNP 来源追踪(医护人员的手、设备)'],
      'tropicalis': ['热带念珠菌与克鲁斯念珠菌', '亚洲唑类耐药热带念珠菌克隆(ERG11 Y132F/A395T)与克鲁斯念珠菌先天氟康唑耐药 — 菌种鉴定决定起始治疗'],
      'malassezia': ['马拉色菌(亲脂性酵母)', '接受脂质乳剂新生儿的 NICU 真菌血症与源自犬类的厚皮马拉色菌暴发 — 培养困难(Dixon 琼脂),分子鉴定与 SNP 溯源一锤定音'],
      'cryptococcus': ['隐球菌(新生隐球菌/格特隐球菌)', '隐球菌性脑膜炎 — 占 HIV 相关死亡的 19%:新生/格特种鉴别、VNI–VNIV/VGI–VGIV 分型与 1 号染色体二体导致的唑类异质性耐药'],
      'staphylococcus': ['金黄色葡萄球菌 (S. aureus)', 'MRSA/VRSA 鉴定与完整 AMR 谱分析 — 主要的医院感染病原体'],
      'pneumoniae': ['肺炎链球菌 (S. pneumoniae)', '嵌合型 pbp2x/pbp2b/pbp1a 与 cps 基因座血清分型:表型无法预测的疫苗逃逸 (19A、22F、33F) 与青霉素耐药'],
      'pyogenes': ['A 组链球菌 (S. pyogenes)', 'emm 分型取代 Sanger 测序、超抗原 speA/speC/ssa 与大环内酯类耐药 (ermB/mefA) — 从咽炎到坏死性筋膜炎'],
      'agalactiae': ['B 组链球菌 (S. agalactiae)', '产房床旁数小时完成孕妇筛查,替代 18–48 小时培养 — 血清型、CC17 克隆与青霉素过敏时的耐药标志物'],
      'faecium': ['万古霉素耐药肠球菌 (E. faecium)', 'vanA/vanB 检测与长读长解析 Tn1546 质粒背景 — ICU 暴发追踪,以基因型而非表型指导治疗'],
      'flu': ['病毒性急性呼吸道感染', '病毒性呼吸道病原体的宏基因组鉴定 — 甲/乙型流感、RSV、鼻病毒、冠状病毒、腺病毒等'],
      'cold': ['细菌性急性呼吸道感染', '细菌性呼吸道病原体及 AMR 的宏基因组鉴定 — 肺炎链球菌、流感嗜血杆菌、肺炎克雷伯菌等'],
      'haemophilus': ['流感嗜血杆菌(法伊弗杆菌)', 'ftsI (PBP3) 突变导致的 BLNAR — β-内酰胺酶 PCR 无法发现;a–f/NTHi 血清分型与溶血嗜血杆菌鉴别 — 中耳炎、慢阻肺、会厌炎'],
      'microbiome': ['肠道微生物组', '沿袭 HMP 与 MetaHIT:全长 16S 精确到种、复发性艰难梭菌感染 FMT 前后谱分析、ICU 耐药组 — 肠型与功能胜过属级清单'],
      'vaginal': ['阴道微生物组', '基于全长 16S 的 CST 分型与卷曲乳杆菌/惰性乳杆菌鉴别 — 早产与细菌性阴道病复发的预测指标'],
      'cmv': ['巨细胞病毒 (CMV)', '移植医学中的耐药基因分型:UL97(更昔洛韦)、UL54、UL56(莱特莫韦)— Sanger 测序无法发现的 5–20% 少数亚群'],
      'hsv': ['单纯疱疹病毒 (HSV-1/HSV-2)', '脑炎 — 每小时都是神经元:脑脊液 mNGS 与免疫抑制患者的阿昔洛韦耐药 (UL23/UL30),数小时出结果'],
      'ebv': ['EB 病毒 (EBV)', '"广东癌" — 血浆 EBV DNA 鼻咽癌筛查、株型分型 (del-LMP1) 与末端重复序列克隆性分析;PTLD'],
      'hhv6': ['HHV-6 与 iciHHV-6', '整合陷阱:约 1% 人群生殖系携带 HHV-6 — 病毒-端粒嵌合读段区分整合与再激活,避免不必要的更昔洛韦'],
      'hiv':  ['HIV(艾滋病病毒)', 'HIV-1 耐药性与亚型鉴定'],
      'identikit': ['DNA 法医画像', '从犯罪现场 DNA 预测外貌、祖源与年龄 — 基于纳米孔测序的法医 DNA 表型分型'],
      'phytophthora': ['疫霉与植物病原体', '植物病原体及杀菌剂抗性的宏基因组鉴定 — 致病疫霉、镰刀菌、灰葡萄孢等。就在田间。'],
      'phytophthora-infestans': ['晚疫病(致病疫霉)', '马铃薯和番茄晚疫病 — 甲霜灵、CAA 杀菌剂与甲氧基丙烯酸酯类的抗性标志物'],
      'phytophthora-sojae': ['大豆根腐病(大豆疫霉)', '大豆根腐与茎腐病 — 生理小种监测与苯基酰胺类、CAA 抗性'],
      'fusarium-oxysporum': ['镰刀菌枯萎病(尖孢镰刀菌)', '番茄、黄瓜和谷类枯萎病 — 专化型 (f. sp.) 检测与苯并咪唑类抗性'],
      'fusarium-graminearum': ['小麦赤霉病(禾谷镰刀菌)', '小麦和大麦赤霉病 — DON/玉米赤霉烯酮霉菌毒素、唑类与多菌灵抗性'],
      'alternaria-solani': ['早疫病(茄链格孢)', '马铃薯和番茄早疫病 — 对 QoI(甲氧基丙烯酸酯类)和 SDHI 杀菌剂的抗性'],
      'botrytis-cinerea': ['灰霉病(灰葡萄孢)', '葡萄、草莓和蔬菜灰霉病 — 完整的杀菌剂多药抗性谱'],
      'pythium': ['腐霉属 (Pythium spp.)', '根腐病与幼苗猝倒病 — 与镰刀菌/丝核菌鉴别、精甲霜灵抗性'],
      'plasmopara-viticola': ['葡萄霜霉病(葡萄生单轴霉)', '葡萄霜霉病 — 对 QoI、CAA 和苯基酰胺类的抗性'],
      'peronospora': ['霜霉病(霜霉属 Peronospora spp.)', '向日葵和洋葱霜霉病 — 生理小种监测与苯基酰胺类抗性'],
      'edge': ['OnSiteSeq Edge(床旁测序一体机)', '自主软硬件一体化系统。在患者床旁、偏远地区实现床旁测序。arm64 架构,Nvidia Jetson AGX GPU。'],
      'desktop': ['OnSiteSeq Desktop(医生工作站)', '面向医生工作站的 Cockpit 流程管理系统。可独立运行,也可与 Edge 配套使用。x86 架构。'],
      'cloud': ['OnSiteSeq Cloud(云端版)', '面向云服务商的 Cockpit 版本。访问地址:cloud.onsiteseq.io。x86 架构。']
    }
  };

  /* ════════════════════════════════════════════════════
     APPLY / RESTORE FUNCTIONS
  ════════════════════════════════════════════════════ */

  function applyNavLang(lang) {
    var map = Object.assign({}, HOME.navLinks, lang === 'zh' ? ZH_HOME.navLinks : {});
    document.querySelectorAll('.horizontal-list a, .site-nav a').forEach(function (a) {
      var text = a.textContent.replace(/ /g, '').trim();
      if (map[text]) { a.textContent = map[text] + '  '; }
    });
  }

  function applyHomeLang(lang) {
    var H = lang === 'zh'
      ? { tagline: ZH_HOME.tagline, dzenText: ZH_HOME.dzenText,
          sections: Object.assign({}, HOME.sections, ZH_HOME.sections),
          cards: Object.assign({}, HOME.cards, ZH_HOME.cards),
          footer: HOME.footer, footerDesc: HOME.footerDesc }
      : HOME;

    /* Tagline */
    var tg = document.getElementById('i18n-tagline');
    if (tg) tg.innerHTML = H.tagline;

    /* Dzen button text */
    var dz = document.getElementById('i18n-dzen-text');
    if (dz) dz.textContent = H.dzenText;

    /* Section titles */
    ['components', 'projects', 'oncology', 'old', 'clostridia', 'candida', 'cocci', 'herpes', 'farmer', 'criminal'].forEach(function (k) {
      var el = document.getElementById('i18n-sec-' + k);
      if (el) {
        var ru = el.textContent.trim();
        if (H.sections[ru]) el.textContent = H.sections[ru];
      }
    });

    /* Cards — iterate over every li.card, extract slug from href, translate */
    document.querySelectorAll('li.card').forEach(function (li) {
      var a = li.querySelector('a');
      if (!a) return;
      var href = (a.getAttribute('href') || '').replace(/^\/+/, '').replace(/\/+$/, '');
      var info = H.cards[href];
      if (!info) return;
      var header = li.querySelector('.header');
      if (header) header.textContent = info[0];
      var body = li.querySelector('p.body') || li.querySelector('p');
      if (body) body.textContent = info[1];
    });

    /* Footer entries */
    Object.keys(H.footer).forEach(function (slug) {
      ['a[href="/' + slug + '"]', 'a[href="' + slug + '"]'].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (a) {
          var item = a.closest('.footer-item') || a.parentElement;
          a.textContent = H.footer[slug];
          if (item) {
            var p = item.querySelector('p');
            if (p && H.footerDesc[slug] !== undefined) p.textContent = H.footerDesc[slug];
          }
        });
      });
    });
  }

  function applyLang(lang) {
    var path = window.location.pathname;

    /* Nav links (all pages) */
    applyNavLang(lang);

    /* Content page — zh falls back to EN when no ZH entry */
    var wrap = document.getElementById('i18n-content');
    var pageMap = lang === 'zh' ? ZH : EN;
    if (wrap && (pageMap[path] || EN[path])) {
      /* Hide Russian post title if present */
      var postTitle = document.getElementById('i18n-post-title');
      if (postTitle) postTitle.style.display = 'none';
      wrap.innerHTML = pageMap[path] || EN[path];
      return;
    }

    /* Home page */
    if (path === '/' || path === '') {
      applyHomeLang(lang);
    }
  }

  /* ════════════════════════════════════════════════════
     LANGUAGE TOGGLE  (ru → en → zh → ru)
  ════════════════════════════════════════════════════ */
  function toggle() {
    var order = ['ru', 'en', 'zh'];
    var next = order[(order.indexOf(getLang()) + 1) % order.length];
    setLang(next);
    location.reload();
  }

  /* ════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════ */
  window.addEventListener('load', function () {
    var btn = document.getElementById('lang-toggle');
    var l = getLang();
    if (btn) {
      var labels = { ru: '🌐 EN', en: '🌐 中文', zh: '🌐 RU' };
      var titles = { ru: 'Switch to English', en: '切换到中文', zh: 'Переключить на русский' };
      btn.textContent = labels[l] || labels.ru;
      btn.title = titles[l] || titles.ru;
      btn.onclick = toggle;
    }
    if (l === 'en' || l === 'zh') applyLang(l);
  });

})();
