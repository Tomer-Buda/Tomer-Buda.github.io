# Tomer I. Buda — Engineering Projects Website

A zero-dependency static portfolio website designed with a **Silicon & Hardware Engineering** aesthetic (dark obsidian + blueprint grid with a Light Datasheet theme toggle) to showcase RTL design, formal verification, low-level systems, and applied AI projects.

## Features

- **Curated Architecture Showcases:** Deep-dive datasheet modals with module breakdowns, highlights, CLI run instructions, and verification/gameplay visuals for:
  - `RISC-V-CPU` — Single-Cycle RV32I Processor & SystemVerilog Assertions (SVA) Formal Verification
  - `SiliconLog` — Automated Post-Silicon Validation Dashboard
  - `Snake-Game` — Bare-Metal 16-Bit x86 Assembly Snake (INT 1Ch ISR, VGA `0B800h`, Port I/O)
  - `cpp-cache-simulator` — Configurable Trace-Driven C++ LRU Cache Simulator
  - `formula-to-robdd` — Boolean Formula to ROBDD Visualizer
  - `GarminBot` — Serverless AI Endurance Coach (safe architecture-only showcase, marked Private Repo)
- **Live GitHub Sync & Auto-Discovery:** Refreshes stars, forks, and push timestamps via the public GitHub REST API and automatically lists future public repositories you publish.
- **Interactive Logic Analyzer Hero:** Switchable hardware timing waveforms (`RV32I`, `SVA`, `x86 I/O`).
- **Smart Resume Button:** Automatically opens/downloads `assets/Tomer_Buda_Resume.pdf` once you place it there, and displays a print-ready interactive CV summary until then.

## Quick Customization

1. **Update LinkedIn & Profile Details:** Edit [`data/site-config.js`](data/site-config.js) (`linkedinUrl`, `headline`, `bio`, `email`, `ignoredRepos`).
2. **Add Your Resume PDF:** Drop your PDF at `assets/Tomer_Buda_Resume.pdf` (no code changes needed).
3. **Add New Projects Manually:** Copy the commented template at the bottom of [`data/projects.js`](data/projects.js) to add non-GitHub projects or give newly auto-discovered repos custom schematics and module tables.

## Local Preview

Because the site uses ES modules (`type="module"`), serve it with any static server (Python 3 is already available):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g., `Tomer-Buda.github.io` for `https://tomer-buda.github.io/`, or any repo like `ProjectsWebsite`).
2. Go to **Repository → Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and click **Save**.
