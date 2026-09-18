/**
 * Neeraj Kumar Gupta - Portfolio Ultra-Performance Engine
 * Zero Background Loops | Zero Layout Thrashing | Pure Event-Driven
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMetricsCounter();
  initSkillsFilter();
  initPlayground();
  initProjectModals();
  initContactAndClipboard();
  initMobileNav();
  initSmoothScroll();

  // Initialize Lucide icons once on load
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('nkg_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nkg_theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Fast One-Time Metrics Counter (IntersectionObserver)
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.metric-number');
  const metricsBar = document.querySelector('.metrics-bar');
  if (!counters.length || !metricsBar) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        observer.disconnect();

        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          let current = 0;
          const step = Math.max(1, Math.floor(target / 25));

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = current.toLocaleString();
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(metricsBar);
}

/* ==========================================================================
   3. Instant Skills Filter (No Layout Recalculation)
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillPills = document.querySelectorAll('.skill-pill');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillPills.forEach((pill) => {
        const category = pill.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          pill.style.display = 'inline-flex';
        } else {
          pill.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Playground (Zero-Lag Handlers)
   ========================================================================== */
function initPlayground() {
  const tabs = document.querySelectorAll('.pg-tab');
  const contents = document.querySelectorAll('.pg-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      contents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Playground A: RAG Simulation
  const ragInput = document.getElementById('rag-input');
  const runRagBtn = document.getElementById('run-rag-btn');
  const ragResults = document.getElementById('rag-results');
  const sampleBtns = document.querySelectorAll('.sample-query-btn');

  sampleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      if (ragInput) ragInput.value = q;
      executeRagDemo(q);
    });
  });

  if (runRagBtn && ragInput) {
    runRagBtn.addEventListener('click', () => {
      executeRagDemo(ragInput.value.trim());
    });
  }

  function executeRagDemo(query) {
    if (!query || !ragResults) return;

    ragResults.innerHTML = `
      <div class="rag-status-line">
        <span class="status-indicator"></span>
        Querying FAISS index over dense OpenAI embeddings...
      </div>
    `;

    setTimeout(() => {
      let retrievalHtml = '';
      let answerText = '';
      let citations = [];

      if (query.toLowerCase().includes('gpu') || query.toLowerCase().includes('margin') || query.toLowerCase().includes('chip')) {
        retrievalHtml = `
          <div class="rag-retrieval-card">
            <div class="rag-retrieval-meta">
              <span>SOURCE [1]: SEC 10-Q Filing (Semiconductor Div)</span>
              <span>FAISS Cosine Similarity: 0.941</span>
            </div>
            <p class="rag-retrieval-text">"...Advanced packaging bottlenecks and high HBM3e wafer allocations contributed to a 140 bps contraction in quarterly gross margin, anticipated to normalize by Q2 FY27 as secondary foundries ramp yields..."</p>
          </div>
          <div class="rag-retrieval-card">
            <div class="rag-retrieval-meta">
              <span>SOURCE [2]: Reuters Equity Research Report</span>
              <span>FAISS Cosine Similarity: 0.887</span>
            </div>
            <p class="rag-retrieval-text">"...Enterprise capital expenditure in accelerated computing clusters expanded 42% YoY, sustaining high average selling prices (ASPs) that partially offset wafer cost headwinds..."</p>
          </div>
        `;
        answerText = `Based on verified filings [1] and equity research [2], surging AI GPU demand is driving elevated wafer allocation costs and packaging constraints, resulting in a temporary ~140 bps margin compression. However, 42% YoY expansion in enterprise compute capex and resilient ASPs are projected to stabilize gross margins at ~72.5% entering mid-FY27.`;
        citations = ['sec.gov/edgar/data/0001045810/10-q', 'reuters.com/technology/markets-gpu-margin-analysis'];
      } else if (query.toLowerCase().includes('regulat') || query.toLowerCase().includes('liquid')) {
        retrievalHtml = `
          <div class="rag-retrieval-card">
            <div class="rag-retrieval-meta">
              <span>SOURCE [1]: Central Bank Financial Stability Bulletin</span>
              <span>FAISS Cosine Similarity: 0.915</span>
            </div>
            <p class="rag-retrieval-text">"...Decentralized automated market makers (AMMs) face acute capital flight risks during volatility spikes due to impermanent loss and lack of sovereign lender-of-last-resort backstops..."</p>
          </div>
        `;
        answerText = `Regulatory authorities highlight structural liquidity vulnerabilities in decentralized protocols stemming from pro-cyclical capital withdrawal during collateral shock events [1]. Compliance frameworks will mandate baseline reserve auditing and asset segregation by early 2027.`;
        citations = ['bis.org/publ/qtrpdf/r_qt2603.htm', 'finra.org/rules-guidance/notices/liquidity-risk'];
      } else {
        retrievalHtml = `
          <div class="rag-retrieval-card">
            <div class="rag-retrieval-meta">
              <span>SOURCE [1]: Bloomberg Supply Chain Index</span>
              <span>FAISS Cosine Similarity: 0.892</span>
            </div>
            <p class="rag-retrieval-text">"...Lead times across advanced node substrates average 18 to 22 weeks. Strategic buffer inventories have mitigated immediate tier-1 delivery delays..."</p>
          </div>
        `;
        answerText = `Current intelligence synthesizes an average lead time of 18-22 weeks across leading-edge lithography nodes [1]. Downstream equity valuations reflect stabilized inventory buffers with minimal assembly halts.`;
        citations = ['bloomberg.com/news/articles/semiconductor-cycle-update'];
      }

      ragResults.innerHTML = `
        <div style="margin-bottom: 0.65rem;">
          <strong style="color: var(--accent-cyan); font-size: 0.8rem; text-transform: uppercase;">Retrieved Top-k Vector Chunks:</strong>
        </div>
        ${retrievalHtml}
        <div class="rag-answer-box">
          <h5>Synthesized Grounded Response (Zero-Hallucination):</h5>
          <p style="font-size: 0.86rem; color: var(--text-primary); line-height: 1.55;">${answerText}</p>
          <div class="rag-citations">
            <span style="font-size: 0.74rem; color: var(--text-muted);">Verified Citations:</span>
            ${citations.map(c => `<span class="rag-citation-link">[${c}]</span>`).join(' ')}
          </div>
        </div>
      `;
    }, 150);
  }

  // Playground B: HR Attrition Risk Engine (Instant, Pure JS Math)
  const selOvertime = document.getElementById('feat-overtime');
  const rngIncome = document.getElementById('feat-income');
  const rngSatisfaction = document.getElementById('feat-satisfaction');
  const rngYears = document.getElementById('feat-years');
  const rngWorklife = document.getElementById('feat-worklife');

  const valOvertime = document.getElementById('val-overtime');
  const valIncome = document.getElementById('val-income');
  const valSatisfaction = document.getElementById('val-satisfaction');
  const valYears = document.getElementById('val-years');
  const valWorklife = document.getElementById('val-worklife');

  const riskMeterFill = document.getElementById('risk-meter-fill');
  const riskProbText = document.getElementById('risk-prob-text');
  const riskTierBadge = document.getElementById('risk-tier-badge');
  const voteXgb = document.getElementById('vote-xgb');
  const voteRf = document.getElementById('vote-rf');
  const voteLr = document.getElementById('vote-lr');
  const voteDt = document.getElementById('vote-dt');
  const riskRecommendation = document.getElementById('risk-recommendation');

  function updateAttritionModel() {
    if (!selOvertime || !rngIncome) return;

    const isOvertime = parseInt(selOvertime.value, 10);
    const income = parseInt(rngIncome.value, 10);
    const satisfaction = parseInt(rngSatisfaction.value, 10);
    const years = parseInt(rngYears.value, 10);
    const worklife = parseInt(rngWorklife.value, 10);

    if (valOvertime) valOvertime.textContent = isOvertime ? 'Yes (High OverTime)' : 'No (Standard)';
    if (valIncome) valIncome.textContent = `$${income.toLocaleString()}`;
    if (valSatisfaction) {
      const labels = ['', '1 (Low)', '2 (Medium)', '3 (High)', '4 (Very High)'];
      valSatisfaction.textContent = labels[satisfaction];
    }
    if (valYears) valYears.textContent = `${years} Year${years === 1 ? '' : 's'}`;
    if (valWorklife) {
      const wlLabels = ['', '1 (Bad)', '2 (Fair)', '3 (Good)', '4 (Excellent)'];
      valWorklife.textContent = wlLabels[worklife];
    }

    let baseScore = 0.22;
    if (isOvertime === 1) baseScore += 0.38;

    const incomeFactor = (1 - (income - 1500) / 18500) * 0.28;
    baseScore += incomeFactor;
    baseScore += (4 - satisfaction) * 0.06;

    if (years <= 2) baseScore += 0.12;
    else if (years > 10) baseScore -= 0.08;

    baseScore += (3 - worklife) * 0.04;

    const prob = Math.min(Math.max(baseScore, 0.05), 0.96);
    const pct = (prob * 100).toFixed(1);

    if (riskMeterFill) riskMeterFill.style.width = `${pct}%`;
    if (riskProbText) riskProbText.textContent = `${pct}%`;

    if (prob >= 0.55) {
      riskTierBadge.className = 'risk-badge high';
      riskTierBadge.textContent = 'High Risk Cohort';
      riskRecommendation.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      riskRecommendation.innerHTML = `
        <span style="color: #ef4444; font-weight: bold; font-size: 1.1rem; line-height: 1;">&#9888;</span>
        <span><strong>HR Retention Alert Triggered:</strong> Employee falls in the top 15% high-risk cohort (&gt; 0.55). Priority review required: overtime balance and compensation parity.</span>
      `;
    } else if (prob >= 0.35) {
      riskTierBadge.className = 'risk-badge medium';
      riskTierBadge.textContent = 'Moderate Risk Cohort';
      riskRecommendation.style.borderColor = 'rgba(245, 158, 11, 0.3)';
      riskRecommendation.innerHTML = `
        <span style="color: #f59e0b; font-weight: bold; font-size: 1.1rem; line-height: 1;">&#8505;</span>
        <span><strong>Proactive Monitoring Recommended:</strong> Employee crosses the 0.35 threshold. Recommended action: 1-on-1 check-in on project engagement.</span>
      `;
    } else {
      riskTierBadge.className = 'risk-badge low';
      riskTierBadge.textContent = 'Low Risk Cohort';
      riskRecommendation.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      riskRecommendation.innerHTML = `
        <span style="color: #10b981; font-weight: bold; font-size: 1.1rem; line-height: 1;">&#10003;</span>
        <span><strong>Stable Retention Profile:</strong> Model estimates high organizational attachment and low flight probability (&lt; 0.35).</span>
      `;
    }

    const xgbProb = Math.min(Math.max(prob + 0.04, 0.02), 0.98).toFixed(2);
    const rfProb = Math.min(Math.max(prob - 0.03, 0.02), 0.98).toFixed(2);
    const lrProb = Math.min(Math.max(prob + 0.01, 0.02), 0.98).toFixed(2);
    const dtProb = Math.min(Math.max(prob - 0.02, 0.02), 0.98).toFixed(2);

    function formatVote(val) {
      const isFlagged = parseFloat(val) >= 0.35;
      return `<strong class="${isFlagged ? 'text-danger' : 'text-success'}">${val} (${isFlagged ? 'Flagged' : 'Retain'})</strong>`;
    }

    if (voteXgb) voteXgb.innerHTML = formatVote(xgbProb);
    if (voteRf) voteRf.innerHTML = formatVote(rfProb);
    if (voteLr) voteLr.innerHTML = formatVote(lrProb);
    if (voteDt) voteDt.innerHTML = formatVote(dtProb);
  }

  [selOvertime, rngIncome, rngSatisfaction, rngYears, rngWorklife].forEach((ctrl) => {
    if (ctrl) {
      ctrl.addEventListener('input', updateAttritionModel, { passive: true });
    }
  });

  updateAttritionModel();
}

/* ==========================================================================
   5. Project Deep-Dive Modal System
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const footerCloseBtn = document.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalBody = document.getElementById('modal-body');
  const modalGithub = document.getElementById('modal-github');
  const triggers = document.querySelectorAll('.modal-trigger');

  const projectDetails = {
    'rag-equity': {
      title: 'News Research & Equity Analysis AI Tool',
      tag: 'GenAI & RAG Architecture',
      github: 'https://github.com/NeerajGupta65',
      html: `
        <h4>1. System Architecture & Objective</h4>
        <p>Equity analysts process hundreds of pages of daily SEC filings, quarterly earnings transcripts, and financial news. Traditional keyword search misses semantic nuances, while standard LLMs suffer from severe hallucinations. This system guarantees grounded, verifiable research using a low-latency RAG pipeline.</p>
        
        <h4>2. Data Pipeline & Recursive Chunking</h4>
        <ul>
          <li><strong>Dynamic Document Ingestion:</strong> Accepts unstructured URLs, PDFs, and news feeds via automated scrapers.</li>
          <li><strong>Recursive Character Text Splitting:</strong> Preserves tabular balance sheets and financial footnotes with 500-token chunk windows and 50-token overlaps.</li>
          <li><strong>Vector Store:</strong> Embeddings generated via OpenAI <code>text-embedding-3-small</code> and indexed into an optimized FAISS flat inner-product (FlatIP) vector index for sub-50ms nearest-neighbor retrieval.</li>
        </ul>

        <h4>3. Zero-Hallucination Attribution Graph</h4>
        <p>The prompt engineering pipeline enforces strict source citing. The LLM is restricted to synthesizing solely from retrieved vector contexts, appending exact source links and paragraph timestamps to every quantitative claim.</p>

        <h4>4. Production Deployment</h4>
        <p>Built with Streamlit for dynamic parameter controls, interactive URL input, live similarity threshold sliders, and real-time response streaming.</p>
      `
    },
    'snapclass': {
      title: 'SnapClass – AI-Powered Attendance Platform',
      tag: 'Computer Vision & Voice Biometrics',
      github: 'https://github.com/NeerajGupta65',
      html: `
        <h4>1. Multi-Modal Biometric Innovation</h4>
        <p>Proxy attendance and buddy-punching cost institutions thousands of lost instructional hours. SnapClass replaces outdated card swipes and manual roll calls with an intelligent dual-biometric verification platform.</p>

        <h4>2. Vision & Audio Engineering Pipeline</h4>
        <ul>
          <li><strong>Facial Recognition:</strong> Leverages <code>dlib</code>'s 68-point facial landmark detector with <code>face_recognition</code> deep metric learning to generate 128-dimensional facial embedding vectors.</li>
          <li><strong>Voiceprint Verification:</strong> Employs <code>Resemblyzer</code> and <code>librosa</code> to extract acoustic d-vectors, verifying speaker voice characteristics independent of spoken phrase.</li>
          <li><strong>Anti-Spoofing Heuristics:</strong> Dual-layer biometric fusion prevents photo or audio replay attacks.</li>
        </ul>

        <h4>3. Full-Stack Infrastructure & Security</h4>
        <ul>
          <li><strong>Cloud Backend:</strong> Supabase PostgreSQL handles user sessions, class schedules, and real-time attendance logs.</li>
          <li><strong>Security:</strong> Credential salting and hashing via <code>bcrypt</code>.</li>
          <li><strong>Dynamic QR-Code Flow:</strong> Instructors project time-decaying QR codes, allowing students to authenticate on their own devices within seconds.</li>
          <li><strong>Role-Based Portals:</strong> Segmented access for Institutional Admins, Faculty, and Students.</li>
        </ul>
      `
    },
    'hr-attrition': {
      title: 'HR Attrition Prediction & BI Dashboard',
      tag: 'Predictive ML & Executive Intelligence',
      github: 'https://github.com/NeerajGupta65',
      html: `
        <h4>1. Problem Statement & Dataset</h4>
        <p>Employee turnover incurs significant organizational cost in recruitment and institutional knowledge loss. Using the IBM HR Analytics dataset (1,470 employee records, 35 features), this project engineered an actionable retention decision support system.</p>

        <h4>2. Tackling Severe Class Imbalance (SMOTE)</h4>
        <p>The baseline minority class (attrition = 1) accounted for only ~16% of records, causing default classifiers to suffer from a dismal 38% minority recall. By implementing <strong>SMOTE (Synthetic Minority Over-sampling Technique)</strong> on the training fold, minority recall soared from <strong>38% &rarr; 71%</strong> without overfitting.</p>

        <h4>3. Ensemble Model Performance</h4>
        <ul>
          <li>Trained and tuned 4 algorithms: Logistic Regression, Decision Tree, Random Forest (via GridSearchCV), and XGBoost.</li>
          <li>Constructed a <strong>Soft-Voting Ensemble</strong> achieving <strong>87% test accuracy, 0.84 AUC-ROC, 72% precision, and 71% recall</strong>.</li>
          <li>Engineered a 3-tier risk-scoring engine (Low/Medium/High) at an optimal threshold of 0.35, flagging the top 15% high-risk cohort for targeted HR retention interventions.</li>
        </ul>

        <h4>4. 5-Page Power BI Executive Suite</h4>
        <p>Developed an interactive 5-page Power BI dashboard featuring 12+ custom DAX measures, dynamic drill-through filters, and demographic cohort cross-filtering. Uncovered top 5 attrition drivers: OverTime, MonthlyIncome, YearsAtCompany, JobSatisfaction, and WorkLifeBalance.</p>
      `
    },
    'neural-style': {
      title: 'Neural Style Transfer (AdaIN)',
      tag: 'Computer Vision & Deep Learning • Currently Working',
      github: 'https://github.com/NeerajGupta65/Neural_Style_Transfer',
      html: `
        <p style="margin-bottom: 0.85rem;"><span class="badge badge-working"><span class="pulse-dot-sm"></span> Currently Working</span></p>
        <h4>1. System Architecture & Objective</h4>
        <p>A real-time deep learning pipeline implementing Adaptive Instance Normalization (AdaIN) to transfer arbitrary artistic textures and brush strokes onto content photographs without requiring per-style retraining.</p>
        
        <h4>2. Deep Learning Pipeline</h4>
        <ul>
          <li><strong>VGG-19 Feature Encoder:</strong> Pretrained convolutional network extracts multi-scale spatial content features and high-order Gram matrix style statistics.</li>
          <li><strong>AdaIN Layer:</strong> Dynamically adjusts the mean and standard deviation of content feature activations to match those of the style representation.</li>
          <li><strong>Inverted Decoder Network:</strong> Trained to invert stylized feature maps back into high-fidelity image space with minimum distortion.</li>
        </ul>

        <h4>3. Web Deployment</h4>
        <p>Wrapped with a responsive Flask application allowing users to upload custom content and style images with instant GPU/CPU inference.</p>
      `
    },
    'student-score': {
      title: 'Student Performance & Score Predictor',
      tag: 'Applied Machine Learning',
      github: 'https://github.com/NeerajGupta65/Student_score_analysis',
      html: `
        <h4>1. Problem Statement</h4>
        <p>Early identification of at-risk students enables targeted educational interventions. This project builds a statistical and predictive machine learning pipeline on student academic datasets to evaluate outcome drivers.</p>

        <h4>2. Modeling & Analysis Pipeline</h4>
        <ul>
          <li><strong>Exploratory Data Analysis (EDA):</strong> Evaluated correlation between study hours, parental education, test prep courses, and subject scores using Seaborn and Pandas.</li>
          <li><strong>Feature Engineering:</strong> One-hot encoding for categorical factors, standard scaling for quantitative variables.</li>
          <li><strong>Regression & Classification:</strong> Benchmarked Linear Regression, Ridge, Decision Trees, and Random Forest regressors to predict final scores with low Mean Squared Error (MSE).</li>
        </ul>
      `
    },
    'nlp-summarizer': {
      title: 'NLP Automated Text Summarizer',
      tag: 'Natural Language Processing',
      github: 'https://github.com/NeerajGupta65/NLP-text-summarizer',
      html: `
        <h4>1. System Architecture</h4>
        <p>An intelligent text summarization system designed to digest dense research documents, news reports, and articles into coherent executive summaries.</p>

        <h4>2. NLP Pipeline</h4>
        <ul>
          <li><strong>Preprocessing:</strong> Sentence tokenization, stopword filtering, lemmatization, and TF-IDF / embedding extraction.</li>
          <li><strong>Ranking & Generation:</strong> Combines extractive graph-based ranking algorithms with deep transformer representations to retain critical factual content.</li>
          <li><strong>Deployment:</strong> Flask web interface providing immediate text-in / summary-out inference with adjustable compression ratios.</li>
        </ul>
      `
    },
    'finance-tracker': {
      title: 'Personal Finance & Budget Tracker',
      tag: 'Full-Stack Web & FinTech',
      github: 'https://github.com/NeerajGupta65/Personal-Finance-Tracker',
      html: `
        <h4>1. Full-Stack Web Architecture</h4>
        <p>A full-stack personal finance web application built to help individuals monitor expenditures, track recurring subscriptions, and visualize savings progress.</p>

        <h4>2. Technical Capabilities</h4>
        <ul>
          <li><strong>RESTful API:</strong> Node.js and Express backend handling secure transaction logging, category tags, and date range aggregation.</li>
          <li><strong>Interactive Data Visualizations:</strong> Dynamic category breakdown charts (food, rent, investments, leisure) and monthly balance forecasting.</li>
          <li><strong>Local Persistence:</strong> Reliable data store ensuring privacy and zero data leakage.</li>
        </ul>
      `
    },
    'airbnb-clone': {
      title: 'Airbnb Clone – Vacation Rental Platform',
      tag: 'Full-Stack MVC & Cloud Architecture',
      github: 'https://github.com/NeerajGupta65/AIR-BNB',
      html: `
        <h4>1. System Architecture & Overview</h4>
        <p>A production-ready Model-View-Controller (MVC) vacation rental marketplace built with Node.js, Express, MongoDB Atlas, Mapbox GL, and Cloudinary. Designed to replicate core end-to-end booking workflows with high reliability.</p>

        <h4>2. Core Engineering Capabilities</h4>
        <ul>
          <li><strong>Geospatial Mapping:</strong> Integrated Mapbox SDK forward geocoding to automatically convert address queries into geographic coordinates and render interactive cluster maps.</li>
          <li><strong>Cloud Media Pipeline:</strong> Cloudinary and Multer integration for dynamic image transformation, upload optimization, and secure media storage.</li>
          <li><strong>Authentication & Authorization:</strong> Passport.js local strategy with password hashing/salting, session persistence, and role-based permissions preventing unauthorized modifications.</li>
          <li><strong>Schema Validation & Data Integrity:</strong> Strict server-side schema verification with Joi, Mongoose cascading document middleware, and Flash user notification feeds.</li>
        </ul>
      `
    }
  };

  function openModal(projKey) {
    const data = projectDetails[projKey];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalBody.innerHTML = data.html;
    modalGithub.href = data.github;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bulletproof click delegation
  document.addEventListener('click', (e) => {
    // 1. Architecture Deep Dive button clicked
    const trigger = e.target.closest('.modal-trigger');
    if (trigger) {
      e.preventDefault();
      const projKey = trigger.getAttribute('data-project');
      openModal(projKey);
      return;
    }

    // 2. Close button clicked
    if (e.target.closest('#modal-close') || e.target.closest('.modal-close-btn')) {
      e.preventDefault();
      closeModal();
      return;
    }

    // 3. Clicked on dark backdrop outside dialog
    if (e.target === modal) {
      closeModal();
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Contact Actions & Toast Notifications
   ========================================================================== */
function initContactAndClipboard() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const contactForm = document.getElementById('contact-form');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy}`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const mailtoUrl = `mailto:neerajsg.gupta@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.location.href = mailtoUrl;

      showToast('Opening default email client...');
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('nav-backdrop');

  function toggleMenu(forceClose = false) {
    if (!menu) return;
    const shouldOpen = forceClose ? false : !menu.classList.contains('open');
    menu.classList.toggle('open', shouldOpen);
    if (backdrop) backdrop.classList.toggle('open', shouldOpen);
    if (toggle) {
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      toggle.innerHTML = shouldOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    }
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => toggleMenu(true));
    }

    const links = menu.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggleMenu(true);
      }
    });
  }
}

/* ==========================================================================
   8. Smooth Anchor Scrolling (Without Global Wheel Scroll-Lag)
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
