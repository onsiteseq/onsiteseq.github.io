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
      'hbv':          ['Hepatitis B (HBV)', 'HBV genotyping (A–J), polymerase resistance mutations (YMDD), HBeAg status and liver cancer risk markers — from a single assay'],
      'hvkp':         ['Hypervirulent Klebsiella (hvKP)', 'Virulence markers (rmpA, iucA, peg-344), K1/K2 capsular types and convergence with carbapenem resistance — liver abscess and metastatic infections'],
      'sfts':         ['SFTS (Dabie bandavirus)', 'Point-of-care mNGS for severe fever with thrombocytopenia syndrome — L/M/S segment analysis and differential diagnosis of haemorrhagic fevers in endemic areas'],
      'thalassemia':  ['Thalassemia (HBA/HBB)', 'One assay instead of gap-PCR + MLPA + Sanger: α-cluster deletions, HBB mutations and cis/trans phasing on long reads — carrier couple screening and prenatal diagnosis'],
      'magnaporthe':  ['Rice Blast (Magnaporthe oryzae)', 'The most devastating rice disease — race and Avr-effector monitoring, Triticum pathotype (wheat blast), fungicide sensitivity'],
      'hlb': ['Citrus Huanglongbing (HLB)', 'Citrus greening — unculturable Candidatus Liberibacter asiaticus vectored by psyllids: molecular detection, SNP clusters and prophage profiling, CLas/CLaf/CLam species differentiation'],
      'sarscov2':     ['Coronavirus SARS-CoV-2', 'Variant (subtype) and antiviral drug resistance determination'],
      'helicobacter': ['Helicobacter pylori', 'Resistance and virulence profile (cagA/vacA) of H. pylori from a biopsy in one day — for personalised eradication therapy'],
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
      'asfv': ['非洲猪瘟 (ASFV)', '猪场门口数小时出结果 — p72 基因分型、低毒力缺失变异株 (CD2v/MGF)、与经典猪瘟鉴别'],
      'hbv':  ['乙型肝炎 (HBV)', 'HBV 基因分型 (A–J)、聚合酶耐药突变 (YMDD)、HBeAg 状态与肝癌风险标志物 — 一次检测完成'],
      'hvkp': ['高毒力肺炎克雷伯菌 (hvKP)', '毒力标志物 (rmpA、iucA、peg-344)、K1/K2 荚膜血清型与碳青霉烯耐药性汇聚 — 肝脓肿与转移性感染'],
      'sfts': ['发热伴血小板减少综合征 (SFTS)', '床旁 mNGS 检测发热伴血小板减少综合征 — L/M/S 节段分析与流行区出血热鉴别诊断'],
      'thalassemia': ['地中海贫血 (HBA/HBB)', '一次检测替代 gap-PCR + MLPA + Sanger:α-簇缺失、HBB 突变与长读长顺/反式定相 — 携带者夫妇筛查与产前诊断'],
      'magnaporthe': ['稻瘟病 (Magnaporthe oryzae)', '最具破坏性的水稻病害 — 生理小种与 Avr 效应蛋白监测、Triticum 致病型(小麦瘟病)、杀菌剂敏感性'],
      'hlb': ['柑橘黄龙病 (HLB)', '柑橘"青果病" — 由木虱传播、无法人工培养的亚洲韧皮部杆菌 (Candidatus Liberibacter asiaticus):分子检测、SNP 簇与前噬菌体谱分析、CLas/CLaf/CLam 种间鉴别'],
      'tuberculosis': ['结核病', '结核分枝杆菌耐药性与谱系(基因型)鉴定'],
      'helicobacter': ['幽门螺杆菌 (H. pylori)', '基于基因组的耐药与毒力谱分析,用于个体化根除治疗'],
      'sarscov2': ['新型冠状病毒 SARS-CoV-2', '变异株(亚型)鉴定与抗病毒药物耐药性检测'],
      'hiv':  ['HIV(艾滋病病毒)', 'HIV-1 耐药性与亚型鉴定']
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
