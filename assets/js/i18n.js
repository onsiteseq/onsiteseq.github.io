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
    '<li><strong>Bezlotoxumab (Zinplava)</strong> — monoclonal antibody against toxin B for recurrent CDI prevention; requires confirmed toxin B for indication.</li></ul><hr>' +
    '<h2>🔬 Sources</h2>' +
    '<ul><li>📄 <a href="https://www.who.int/publications/i/item/9789241509763">WHO — C. difficile surveillance and infection control</a></li>' +
    '<li>📄 <a href="https://card.mcmaster.ca/">CARD — Comprehensive Antibiotic Resistance Database</a></li>' +
    '<li>📄 <a href="https://www.genomicepidemiology.org/">Center for Genomic Epidemiology — typing tools</a></li></ul>';

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
      'gonorrhoeae':  ['Gonorrhoea (N. gonorrhoeae)', 'Drug resistance determination of Neisseria gonorrhoeae — WHO priority AMR pathogen'],
      'mycoplasma':   ['Mycoplasma genitalium', 'Pre-treatment resistance testing of M. genitalium to macrolides and fluoroquinolones — rapidly emerging multidrug resistance, frequently missed STI pathogen'],
      'meningitidis': ['Meningococcus (N. meningitidis)', 'Point-of-care serogrouping and resistance determination of Neisseria meningitidis — fulminant meningitis where every hour counts'],
      'sarscov2':     ['Coronavirus SARS-CoV-2', 'Variant (subtype) and antiviral drug resistance determination'],
      'staphylococcus': ['S. aureus (Staphylococcus)', 'MRSA/VRSA and full AMR profile determination — leading nosocomial pathogen'],
      'flu':          ['Viral ARTI', 'Metagenomic identification of viral respiratory pathogens — influenza A/B, RSV, rhinovirus, coronaviruses, adenovirus, etc.'],
      'cold':         ['Bacterial ARI', 'Metagenomic identification of bacterial respiratory pathogens and AMR — S. pneumoniae, H. influenzae, K. pneumoniae, etc.'],
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
      'gxp':      'Want to learn about the industry standards we follow?'
    },
    footerDesc: {
      'normativ': '',
      'citation': 'Articles and preprints.',
      'mfti':     'The project was born at MIPT.',
      'ruwiki':   'Website content = article for RuWiki.',
      'sber':     'Repository and CI/CD on GitVerse.',
      'gxp':      'GxP — we followed "best practices" in project design.'
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
      'asfv': ['非洲猪瘟 (ASFV)', '猪场门口数小时出结果 — p72 基因分型、低毒力缺失变异株 (CD2v/MGF)、与经典猪瘟鉴别']
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
    ['components', 'projects', 'oncology', 'old', 'farmer', 'criminal'].forEach(function (k) {
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
