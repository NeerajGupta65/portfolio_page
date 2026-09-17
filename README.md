# Neeraj Kumar Gupta — AI & Machine Learning Engineer Portfolio

A modern, high-performance, responsive portfolio website highlighting production **GenAI/RAG pipelines**, **Computer Vision**, **Machine Learning ensembles**, and **BI analytics**.

Built for **Neeraj Kumar Gupta** (Computer Science undergraduate with AI Specialization at Manipal Institute of Technology Bengaluru, expected July 2027).

---

## Key Highlights

- **Aesthetic & Modern UI**: High-density glassmorphism with dynamic Neural Particle Network background, dark/light theme switch, and responsive design.
- **Deep-Dive Project Showcases**:
  1. **News Research & Equity Analysis AI Tool**: RAG pipeline with LangChain, FAISS vector index, OpenAI embeddings, recursive chunking, and source-attributed synthesis.
  2. **SnapClass – AI-Powered Attendance Platform**: Dual-biometric verification combining facial landmarks (`dlib`, `face_recognition`) with voiceprints (`Resemblyzer`, `librosa`), backed by Supabase and bcrypt.
  3. **HR Attrition Prediction & BI Dashboard**: End-to-end predictive pipeline on IBM HR Analytics (1,470 records, 35 features). Addressed minority imbalance using SMOTE (boosting minority recall from 38% to 71%), trained a 4-model soft-voting ensemble (87% test accuracy, 0.84 AUC-ROC), and designed a 5-page Power BI dashboard.
- **Interactive Live AI/ML Playground**:
  - **RAG Semantic Search Inspector**: Live simulation of recursive chunking and source citation generation.
  - **HR Attrition Risk Estimator**: Interactive feature sliders (Overtime, Income, Satisfaction, Years at Company, Work-Life Balance) evaluating model probabilities across 4 classifiers and 3 risk tiers.
- **Zero-Dependency Architecture**: Built using pure HTML5, CSS3 (CSS variables, glassmorphism), and vanilla ES6+ JavaScript. No Node.js build process required.

---

## File Structure

```
neeraj-portfolio/
├── index.html       # Semantic HTML5 with SEO meta, OpenGraph tags, schema markup, and UI sections
├── styles.css       # Complete stylesheet with Dark/Light mode, glassmorphism, responsive grid
├── script.js        # Interactivity engine: canvas, typewriter, stats counter, filter, modals, demos
└── README.md        # Project documentation and deployment guide
```

---

## Local Development & Preview

### Option 1: Direct File Open
Simply double-click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Python Local Server (Recommended)
Open a terminal in the `neeraj-portfolio` folder and run:
```bash
python -m http.server 8000
```
Then navigate to:
```
http://localhost:8000
```

---

## Deploying to GitHub Pages (Free Hosting)

Since your GitHub username is `NeerajGupta65`:

1. Create a new repository on your GitHub account named:
   ```
   NeerajGupta65.github.io
   ```
   *(or any repository name like `portfolio`)*.

2. In your local terminal, initialize git and push the files:
   ```bash
   cd C:\Users\Neeraj\.gemini\antigravity\scratch\neeraj-portfolio
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/NeerajGupta65/Portfolio_page.git
   git push -u origin main
   ```

3. Your website will be live at:
   ```
   https://NeerajGupta65.github.io/
   ```

---

## Contact Information

- **Email**: [neerajsg.gupta@gmail.com](mailto:neerajsg.gupta@gmail.com)
- **Phone**: +91 9739150158
- **LinkedIn**: [linkedin.com/in/neerajkumargupta](https://linkedin.com/in/neerajkumargupta)
- **GitHub**: [github.com/NeerajGupta65](https://github.com/NeerajGupta65)
