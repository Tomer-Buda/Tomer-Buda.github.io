import { siteConfig } from "../data/site-config.js";
import { curatedProjects, categoryLabels } from "../data/projects.js";
import { renderHeroWaveform, getProjectVisualSvg } from "./visuals.js";

const LANGUAGE_COLORS = {
  Verilog: "#f59e0b",
  SystemVerilog: "#10b981",
  Python: "#38bdf8",
  "C++": "#ec4899",
  C: "#64748b",
  Assembly: "#34d399",
  JavaScript: "#facc15",
  TypeScript: "#3b82f6",
  Rust: "#fb923c",
};

const state = {
  projects: curatedProjects.map((p) => ({ ...p, syncedFromGithub: false })),
  activeCategory: "all",
  searchQuery: "",
  sortBy: "featured",
  resumePdfAvailable: false,
  toastTimer: null,
};

/* ============================================================================
 * Utilities
 * ============================================================================ */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatHandle(url) {
  return String(url || "")
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/\/$/, "");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function inferCategoryFromRepo(repo) {
  const haystack = [
    repo.name,
    repo.description,
    repo.language,
    ...(repo.topics || []),
  ]
    .join(" ")
    .toLowerCase();

  if (/(verilog|rtl|fpga|cpu|risc|asic|vhdl|hardware)/.test(haystack)) return "rtl";
  if (/(verif|sva|uvm|valid|bdd|formal|coverage|vlsi)/.test(haystack)) return "verification";
  if (/(assembly|x86|c\+\+|cache|kernel|embedded|firmware|os|bare-metal)/.test(haystack)) return "systems";
  return "ai";
}

/* ============================================================================
 * Site Config & Static Sections Rendering
 * ============================================================================ */

function applySiteConfig() {
  document.title = `${siteConfig.name} — Hardware, Verification & Systems Projects`;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("brand-monogram", siteConfig.monogram);
  setText("brand-name", siteConfig.name);
  setText("hero-role", siteConfig.role);
  setText("hero-headline", siteConfig.headline);
  setText("hero-bio", siteConfig.bio);
  setText("footer-name", siteConfig.name);
  setText("github-handle", formatHandle(siteConfig.githubUrl));
  setText("linkedin-handle", formatHandle(siteConfig.linkedinUrl));

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = `mailto:${siteConfig.email}`;
    emailLink.textContent = siteConfig.email;
  }

  document.querySelectorAll(".github-link").forEach((el) => {
    el.setAttribute("href", siteConfig.githubUrl);
  });

  document.querySelectorAll(".linkedin-link").forEach((el) => {
    el.setAttribute("href", siteConfig.linkedinUrl);
  });

  const downloadLink = document.getElementById("resume-download-link");
  if (downloadLink) {
    downloadLink.setAttribute("href", siteConfig.resumeUrl);
    downloadLink.setAttribute("download", siteConfig.resumeFileName);
  }
}

function renderStackMatrix() {
  const grid = document.getElementById("stack-grid");
  if (!grid) return;

  grid.innerHTML = siteConfig.skillGroups
    .map(
      (group) => `
      <article class="stack-card" data-accent="${escapeHtml(group.accent)}">
        <span class="stack-code">${escapeHtml(group.code)}</span>
        <h3>${escapeHtml(group.title)}</h3>
        <ul class="stack-list">
          ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function renderBackgroundSection() {
  const grid = document.getElementById("background-grid");
  if (!grid) return;

  const eduCards = (siteConfig.education || [])
    .map(
      (edu) => `
      <article class="bg-card">
        <div class="bg-card-top">
          <span class="bg-period">${escapeHtml(edu.period)} · ${escapeHtml(edu.location)}</span>
          ${edu.meta ? `<span class="bg-meta-pill">${escapeHtml(edu.meta)}</span>` : ""}
        </div>
        <h3>${escapeHtml(edu.degree)}</h3>
        <p class="bg-org">${escapeHtml(edu.institution)}</p>
        ${edu.summary ? `<p class="bg-summary">${escapeHtml(edu.summary)}</p>` : ""}
        ${
          edu.courses?.length
            ? `<div class="course-pills">
                 ${edu.courses.map((c) => `<span class="tech-tag">${escapeHtml(c)}</span>`).join("")}
               </div>`
            : ""
        }
      </article>
    `
    )
    .join("");

  const expCards = (siteConfig.experience || [])
    .map(
      (exp) => `
      <article class="bg-card">
        <div class="bg-card-top">
          <span class="bg-period">${escapeHtml(exp.period)}</span>
          <span class="tech-tag">${escapeHtml(exp.org)}</span>
        </div>
        <h3>${escapeHtml(exp.role)}</h3>
        <ul class="card-highlights">
          ${(exp.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");

  const langCard = siteConfig.spokenLanguages?.length
    ? `
      <article class="bg-card">
        <div class="bg-card-top">
          <span class="bg-period">SPOKEN LANGUAGES</span>
        </div>
        <div class="lang-row">
          ${siteConfig.spokenLanguages
            .map(
              (l) => `
            <div class="lang-chip">
              <span>${escapeHtml(l.name)}</span>
              <span>${escapeHtml(l.level)}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </article>
    `
    : "";

  grid.innerHTML = `
    <div class="bg-column">${eduCards}</div>
    <div class="bg-column">${expCards}${langCard}</div>
  `;
}

function updateStats() {
  const projEl = document.getElementById("stat-projects");
  const langEl = document.getElementById("stat-languages");
  if (projEl) projEl.textContent = String(state.projects.length);

  if (langEl) {
    const langs = new Set();
    state.projects.forEach((p) => {
      if (p.primaryLanguage) langs.add(p.primaryLanguage);
      (p.languages || []).forEach((l) => langs.add(l));
    });
    langEl.textContent = String(langs.size);
  }
}

/* ============================================================================
 * Filters & Project Grid Rendering
 * ============================================================================ */

function renderFilterPills() {
  const container = document.getElementById("filter-pills");
  if (!container) return;

  const counts = { all: state.projects.length };
  Object.keys(categoryLabels).forEach((key) => {
    if (key !== "all") {
      counts[key] = state.projects.filter((p) => p.category === key).length;
    }
  });

  container.innerHTML = Object.entries(categoryLabels)
    .map(([key, label]) => {
      const active = state.activeCategory === key ? "active" : "";
      return `
        <button
          class="filter-pill ${active}"
          type="button"
          data-category="${escapeHtml(key)}"
          aria-pressed="${state.activeCategory === key}"
        >
          <span>${escapeHtml(label)}</span>
          <span class="pill-count">${counts[key] || 0}</span>
        </button>
      `;
    })
    .join("");
}

function getFilteredProjects() {
  const query = state.searchQuery.trim().toLowerCase();

  let list = state.projects.filter((project) => {
    if (state.activeCategory !== "all" && project.category !== state.activeCategory) {
      return false;
    }
    if (!query) return true;

    const searchable = [
      project.title,
      project.repoName,
      project.shortTag,
      project.summary,
      project.overview,
      project.primaryLanguage,
      ...(project.languages || []),
      ...(project.techStack || []),
      ...(project.modules || []).map((m) => `${m.name} ${m.role}`),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });

  if (state.sortBy === "recent") {
    list = [...list].sort((a, b) => new Date(b.pushedAt || 0) - new Date(a.pushedAt || 0));
  } else if (state.sortBy === "name") {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Featured order: preserve curated priority, then push recently updated auto-discovered repos
    list = [...list].sort((a, b) => {
      if (a.id === "RISC-V-CPU") return -1;
      if (b.id === "RISC-V-CPU") return 1;
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      return new Date(b.pushedAt || 0) - new Date(a.pushedAt || 0);
    });
  }

  return list;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");
  if (!grid || !empty) return;

  const filtered = getFilteredProjects();
  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  const showFlagship =
    state.activeCategory === "all" &&
    !state.searchQuery.trim() &&
    state.sortBy === "featured" &&
    filtered.length % 2 === 1;

  grid.innerHTML = filtered
    .map((project, index) => {
      const isFlagship = showFlagship && index === 0 && project.featured;
      const langColor = LANGUAGE_COLORS[project.primaryLanguage] || "#94a3b8";

      let visClass = "vis-public";
      let visLabel = "Public · GitHub";
      if (project.visibility === "private") {
        visClass = "vis-private";
        visLabel = "Private Repo";
      } else if (project.syncedFromGithub) {
        visClass = "vis-synced";
        visLabel = "Synced · GitHub";
      }

      const fallbackSvg = getProjectVisualSvg(project.visualType, project.title);
      const visualContent = project.previewImageUrl
        ? `<img
             class="card-visual-img"
             src="${escapeHtml(project.previewImageUrl)}"
             alt="${escapeHtml(project.title)} preview"
             loading="lazy"
             data-fallback-type="${escapeHtml(project.visualType || "generic")}"
           />`
        : fallbackSvg;

      const highlightsBlock =
        isFlagship && project.highlights?.length
          ? `<ul class="card-highlights">
               ${project.highlights
                 .slice(0, 3)
                 .map((h) => `<li>${escapeHtml(h)}</li>`)
                 .join("")}
             </ul>`
          : "";

      const starsText =
        project.visibility === "public" && typeof project.stars === "number" && project.stars > 0
          ? `<span>★ ${project.stars}</span>`
          : "";

      const updatedText = project.pushedAt ? `<span>Updated ${escapeHtml(formatDate(project.pushedAt))}</span>` : "";

      const repoAction =
        project.visibility === "private" || !project.githubUrl
          ? `<span class="private-pill" title="Source withheld for privacy">Private Source</span>`
          : `<a class="btn btn-xs btn-outline" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">
               <span>GitHub</span>
               <svg class="icon icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                 <polyline points="15 3 21 3 21 9"/>
                 <line x1="10" y1="14" x2="21" y2="3"/>
               </svg>
             </a>`;

      return `
        <article class="project-card ${isFlagship ? "card-flagship" : ""}">
          <div class="card-visual">
            ${visualContent}
            <div class="card-visual-badges">
              <span class="tag-chip">${escapeHtml(project.shortTag)}</span>
              <span class="vis-badge ${visClass}">${escapeHtml(visLabel)}</span>
            </div>
          </div>

          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${escapeHtml(project.title)}</h3>
            </div>

            <p class="card-summary">${escapeHtml(project.summary)}</p>
            ${highlightsBlock}

            <div class="tech-tags">
              ${(project.techStack || [])
                .slice(0, isFlagship ? 6 : 4)
                .map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>

            <div class="card-footer">
              <div class="card-meta">
                ${
                  project.primaryLanguage
                    ? `<span><span class="lang-dot" style="background:${langColor}"></span>${escapeHtml(project.primaryLanguage)}</span>`
                    : ""
                }
                ${starsText}
                ${updatedText}
              </div>

              <div class="card-actions">
                <button class="btn btn-xs btn-secondary inspect-btn" type="button" data-project-id="${escapeHtml(project.id)}">
                  Inspect Architecture
                </button>
                ${repoAction}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach graceful image fallbacks for external preview images (e.g. offline mode)
  grid.querySelectorAll(".card-visual-img").forEach((img) => {
    img.addEventListener("error", () => {
      const parent = img.parentElement;
      const fallbackType = img.getAttribute("data-fallback-type") || "generic";
      const badges = parent.querySelector(".card-visual-badges");
      parent.innerHTML = getProjectVisualSvg(fallbackType);
      if (badges) parent.appendChild(badges);
    });
  });
}

/* ============================================================================
 * Project Architecture Datasheet Modal & Lightbox
 * ============================================================================ */

function openProjectModal(projectId) {
  const project = state.projects.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const tagEl = document.getElementById("modal-tag");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");

  tagEl.textContent = `${project.shortTag} // DATASHEET`;
  titleEl.textContent = project.title;

  const modulesHtml = project.modules?.length
    ? `
      <div class="modal-section">
        <h3>Module &amp; File Architecture</h3>
        <div class="module-list">
          ${project.modules
            .map(
              (m) => `
            <div class="module-item">
              <span class="module-name">${escapeHtml(m.name)}</span>
              <span class="module-role">${escapeHtml(m.role)}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const highlightsHtml = project.highlights?.length
    ? `
      <div class="modal-section">
        <h3>Key Engineering Highlights</h3>
        <ul class="card-highlights">
          ${project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  const evidenceHtml = project.evidenceImages?.length
    ? `
      <div class="modal-section">
        <h3>Verification Evidence &amp; Captures</h3>
        <div class="evidence-grid">
          ${project.evidenceImages
            .map(
              (img) => `
            <button
              class="evidence-card"
              type="button"
              data-lightbox-url="${escapeHtml(img.url)}"
              data-lightbox-caption="${escapeHtml(`${img.title} — ${img.caption}`)}"
            >
              <img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.title)}" loading="lazy" />
              <div class="evidence-info">
                <span class="evidence-title">${escapeHtml(img.title)}</span>
                <span class="evidence-caption">${escapeHtml(img.caption)}</span>
              </div>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const runHtml = project.runCommand
    ? `
      <div class="modal-section">
        <h3>${project.visibility === "private" ? "Repository Status" : "Quick Run / Simulation"}</h3>
        <div class="code-bar">
          <code>${escapeHtml(project.runCommand)}</code>
          ${
            project.visibility !== "private"
              ? `<button class="btn-inline copy-cmd-btn" type="button" data-cmd="${escapeHtml(project.runCommand)}">Copy</button>`
              : ""
          }
        </div>
      </div>
    `
    : "";

  const footerActions =
    project.visibility === "private" || !project.githubUrl
      ? `<span class="private-pill">Private Personal Repository — Architecture Showcase Only</span>`
      : `
        <a class="btn btn-primary btn-sm" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">
          Open Repository on GitHub ↗
        </a>
        ${
          project.homepageUrl
            ? `<a class="btn btn-secondary btn-sm" href="${escapeHtml(project.homepageUrl)}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
            : ""
        }
      `;

  bodyEl.innerHTML = `
    <div class="modal-meta-row">
      ${(project.techStack || [])
        .map((t) => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join("")}
    </div>

    <div class="modal-section">
      <h3>Overview</h3>
      <p class="modal-overview">${escapeHtml(project.overview || project.summary)}</p>
    </div>

    ${highlightsHtml}
    ${modulesHtml}
    ${evidenceHtml}
    ${runHtml}

    <div class="modal-footer-actions">
      ${footerActions}
    </div>
  `;

  // Hide individual evidence cards cleanly if external raw images cannot load offline
  bodyEl.querySelectorAll(".evidence-card img").forEach((img) => {
    img.addEventListener("error", () => {
      const card = img.closest(".evidence-card");
      if (card) card.classList.add("hidden");
    });
  });

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.getElementById("modal-close-btn")?.focus();
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  syncBodyModalLock();
}

function openLightbox(url, caption) {
  const lb = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!lb || !img || !cap) return;

  img.src = url;
  img.alt = caption;
  cap.textContent = caption;
  lb.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeLightbox() {
  const lb = document.getElementById("lightbox-modal");
  if (!lb || lb.classList.contains("hidden")) return;
  lb.classList.add("hidden");
  syncBodyModalLock();
}

/* ============================================================================
 * Resume PDF Detection & Interactive CV Fallback Modal
 * ============================================================================ */

async function checkResumePdf() {
  const badge = document.getElementById("resume-status-badge");
  const dlLink = document.getElementById("resume-download-link");

  try {
    const res = await fetch(siteConfig.resumeUrl, { method: "HEAD" });
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (res.ok && (!contentType || contentType.includes("pdf") || contentType.includes("octet-stream"))) {
      state.resumePdfAvailable = true;
      if (badge) badge.textContent = "PDF Ready";
      if (dlLink) dlLink.classList.remove("hidden");
      return;
    }
  } catch {
    // Fallback to interactive resume sheet
  }

  state.resumePdfAvailable = false;
  if (badge) badge.textContent = "Interactive CV";
}

function handleResumeTrigger() {
  if (state.resumePdfAvailable) {
    window.open(siteConfig.resumeUrl, "_blank", "noopener,noreferrer");
    return;
  }
  openResumeModal();
}

function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  const body = document.getElementById("resume-modal-body");
  if (!modal || !body) return;

  const educationHtml = (siteConfig.education || [])
    .map(
      (edu) => `
      <div class="resume-project-item">
        <div class="resume-project-head">
          <strong>${escapeHtml(edu.degree)} — ${escapeHtml(edu.institution)}</strong>
          <span>${escapeHtml(edu.period)} · ${escapeHtml(edu.location)}${edu.meta ? ` · ${escapeHtml(edu.meta)}` : ""}</span>
        </div>
        ${
          edu.courses?.length
            ? `<p>Relevant Courses: ${escapeHtml(edu.courses.join(", "))}</p>`
            : edu.summary
              ? `<p>${escapeHtml(edu.summary)}</p>`
              : ""
        }
      </div>
    `
    )
    .join("");

  const experienceHtml = (siteConfig.experience || [])
    .map(
      (exp) => `
      <div class="resume-project-item">
        <div class="resume-project-head">
          <strong>${escapeHtml(exp.role)} — ${escapeHtml(exp.org)}</strong>
          <span>${escapeHtml(exp.period)}</span>
        </div>
        <p>${escapeHtml((exp.bullets || []).join(" "))}</p>
      </div>
    `
    )
    .join("");

  const projectsSummary = curatedProjects
    .map(
      (p) => `
      <div class="resume-project-item">
        <div class="resume-project-head">
          <strong>${escapeHtml(p.title)}</strong>
          <span>${escapeHtml((p.techStack || []).slice(0, 4).join(" · "))}</span>
        </div>
        <p>${escapeHtml(p.summary)}</p>
      </div>
    `
    )
    .join("");

  const skillsSummary = siteConfig.skillGroups
    .map(
      (g) => `
      <div>
        <strong>${escapeHtml(g.title)}:</strong>
        <span style="color:var(--text-secondary)">${escapeHtml(g.items.join(", "))}</span>
      </div>
    `
    )
    .join("");

  const langsText = (siteConfig.spokenLanguages || [])
    .map((l) => `${l.name} (${l.level})`)
    .join(" · ");

  body.innerHTML = `
    <div class="resume-doc">
      <div class="resume-doc-head">
        <h3>${escapeHtml(siteConfig.name)}</h3>
        <p>${escapeHtml(siteConfig.bio)}</p>
        <div class="resume-doc-links">
          <span>${escapeHtml(siteConfig.location)}</span>
          <span>${escapeHtml(siteConfig.email)}</span>
          <span>${escapeHtml(formatHandle(siteConfig.githubUrl))}</span>
          <span>${escapeHtml(formatHandle(siteConfig.linkedinUrl))}</span>
        </div>
      </div>

      <div class="modal-section">
        <h3>Education</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${educationHtml}
        </div>
      </div>

      <div class="modal-section">
        <h3>Engineering Projects</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${projectsSummary}
        </div>
      </div>

      <div class="modal-section">
        <h3>Professional Experience</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${experienceHtml}
        </div>
      </div>

      <div class="modal-section">
        <h3>Technical Skills &amp; Lab Equipment</h3>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.86rem;">
          ${skillsSummary}
          ${langsText ? `<div><strong>Languages:</strong> <span style="color:var(--text-secondary)">${escapeHtml(langsText)}</span></div>` : ""}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.getElementById("resume-modal-close")?.focus();
}

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  syncBodyModalLock();
}

function syncBodyModalLock() {
  const anyOpen = ["project-modal", "resume-modal", "lightbox-modal"].some((id) => {
    const el = document.getElementById(id);
    return el && !el.classList.contains("hidden");
  });
  document.body.classList.toggle("modal-open", anyOpen);
}

/* ============================================================================
 * Live GitHub API Sync + Future Repo Auto-Discovery
 * ============================================================================ */

function setSyncIndicator(mode, label, shortStat) {
  const dot = document.querySelector(".sync-dot");
  const text = document.getElementById("sync-status-text");
  const statSync = document.getElementById("stat-sync");

  if (dot) {
    dot.classList.remove("syncing", "offline");
    if (mode === "syncing") dot.classList.add("syncing");
    if (mode === "offline") dot.classList.add("offline");
  }
  if (text) text.textContent = label;
  if (statSync && shortStat) statSync.textContent = shortStat;
}

function mergeGitHubRepos(repos) {
  const ignored = new Set(
    (siteConfig.githubSync.ignoredRepos || []).map((n) => n.toLowerCase())
  );

  // Start from fresh curated clone so manual re-syncs never duplicate entries
  const merged = curatedProjects.map((p) => ({ ...p, syncedFromGithub: false }));
  const byRepoName = new Map();
  merged.forEach((p) => {
    if (p.repoName) byRepoName.set(p.repoName.toLowerCase(), p);
  });

  let discoveredCount = 0;

  repos.forEach((repo) => {
    if (!repo || repo.fork || repo.archived) return;
    const key = String(repo.name || "").toLowerCase();
    if (ignored.has(key)) return;

    const existing = byRepoName.get(key);
    if (existing) {
      existing.stars = repo.stargazers_count ?? existing.stars;
      existing.forks = repo.forks_count ?? existing.forks;
      existing.pushedAt = repo.pushed_at || existing.pushedAt;
      if (repo.homepage) existing.homepageUrl = repo.homepage;
      if (repo.html_url) existing.githubUrl = repo.html_url;
      return;
    }

    if (!siteConfig.githubSync.autoDiscoverNewRepos) return;

    // Auto-discover any newly created public repository on GitHub!
    discoveredCount += 1;
    const topics = Array.isArray(repo.topics) ? repo.topics : [];
    const stack = [repo.language, ...topics.slice(0, 4)].filter(Boolean);

    merged.push({
      id: `gh-${repo.name}`,
      repoName: repo.name,
      title: repo.name.replace(/[-_]+/g, " "),
      shortTag: `${(repo.language || "GITHUB").toUpperCase()} · AUTO-SYNCED`,
      category: inferCategoryFromRepo(repo),
      featured: false,
      visibility: "public",
      syncedFromGithub: true,
      githubUrl: repo.html_url,
      homepageUrl: repo.homepage || "",
      primaryLanguage: repo.language || "Code",
      languages: repo.language ? [repo.language] : [],
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      pushedAt: repo.pushed_at || repo.created_at,
      visualType: "generic",
      summary:
        repo.description ||
        "Public repository automatically synced from GitHub. Open on GitHub to inspect source and documentation.",
      overview:
        repo.description ||
        "This repository was automatically discovered via the GitHub REST API. Add a matching entry in data/projects.js to customize its architecture breakdown and schematic.",
      highlights: [],
      modules: [],
      techStack: stack.length ? stack : ["GitHub"],
      evidenceImages: [],
      runCommand: `git clone ${repo.clone_url || repo.html_url}`,
    });
  });

  state.projects = merged;
  updateStats();
  renderFilterPills();
  renderProjects();

  return discoveredCount;
}

async function syncWithGitHub(forceRefresh = false) {
  if (!siteConfig.githubSync?.enabled || !siteConfig.githubUsername) {
    setSyncIndicator("offline", "Static curated mode", "Static");
    return;
  }

  const cacheKey = `tb-gh-repos-${siteConfig.githubUsername}`;

  if (!forceRefresh) {
    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Date.now() - cached.timestamp < siteConfig.githubSync.cacheTtlMs) {
          mergeGitHubRepos(cached.repos);
          setSyncIndicator("live", `Synced @${siteConfig.githubUsername} (cached)`, "Live");
          return;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  setSyncIndicator("syncing", `Syncing @${siteConfig.githubUsername}...`, "Syncing...");

  try {
    const url = `https://api.github.com/users/${encodeURIComponent(
      siteConfig.githubUsername
    )}/repos?sort=pushed&per_page=100`;
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error("Unexpected response");

    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), repos })
      );
    } catch {
      // Ignore quota errors
    }

    const discovered = mergeGitHubRepos(repos);
    const label =
      discovered > 0
        ? `Live synced (+${discovered} new from GitHub)`
        : `Live synced with @${siteConfig.githubUsername}`;
    setSyncIndicator("live", label, "Live");

    if (forceRefresh) {
      showToast("GitHub repository metadata refreshed");
    }
  } catch {
    setSyncIndicator("offline", "Curated showcase (GitHub API unavailable)", "Cached");
    if (forceRefresh) {
      showToast("Could not reach GitHub API — showing curated data");
    }
  }
}

/* ============================================================================
 * Theme & Interactive Wiring
 * ============================================================================ */

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("tb-portfolio-theme", next);
  } catch {
    // Ignore storage errors
  }
  showToast(`Switched to ${next === "dark" ? "Dark Silicon" : "Light Datasheet"} theme`);
}

function initWaveformPanel() {
  const screen = document.getElementById("hero-waveform");
  const caption = document.getElementById("scope-caption");
  const badge = document.getElementById("scope-badge");
  const tabs = document.querySelectorAll(".scope-tab");
  if (!screen) return;

  const setPreset = (key) => {
    const preset = renderHeroWaveform(screen, key);
    if (caption) caption.textContent = preset.caption;
    if (badge) {
      badge.textContent = preset.badge;
      badge.style.background = `var(--${preset.badgeTone}-soft, var(--emerald-soft))`;
      badge.style.color = `var(--${preset.badgeTone}, var(--emerald))`;
      badge.style.borderColor = `var(--${preset.badgeTone}-border, var(--emerald-border))`;
    }
    tabs.forEach((btn) => {
      const isMatch = btn.dataset.preset === key;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-selected", String(isMatch));
    });
  };

  setPreset("riscv");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => setPreset(btn.dataset.preset));
  });
}

function bindEvents() {
  // Theme switcher
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // Filter pills (delegated)
  document.getElementById("filter-pills")?.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    state.activeCategory = pill.dataset.category || "all";
    renderFilterPills();
    renderProjects();
  });

  // Search & Sort
  const searchInput = document.getElementById("project-search");
  searchInput?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProjects();
  });

  document.getElementById("project-sort")?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProjects();
  });

  document.getElementById("reset-filters-btn")?.addEventListener("click", () => {
    state.activeCategory = "all";
    state.searchQuery = "";
    state.sortBy = "featured";
    if (searchInput) searchInput.value = "";
    const sortEl = document.getElementById("project-sort");
    if (sortEl) sortEl.value = "featured";
    renderFilterPills();
    renderProjects();
  });

  // Sync refresh button
  document.getElementById("sync-refresh-btn")?.addEventListener("click", () => {
    syncWithGitHub(true);
  });

  // Project inspect buttons (delegated)
  document.getElementById("projects-grid")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".inspect-btn");
    if (!btn) return;
    openProjectModal(btn.dataset.projectId);
  });

  // Project modal close & inner interactions (copy command / lightbox)
  document.getElementById("modal-close-btn")?.addEventListener("click", closeProjectModal);
  document.getElementById("project-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "project-modal") {
      closeProjectModal();
      return;
    }

    const copyBtn = e.target.closest(".copy-cmd-btn");
    if (copyBtn) {
      navigator.clipboard?.writeText(copyBtn.dataset.cmd || "").then(() => {
        showToast("Command copied to clipboard");
      });
      return;
    }

    const evCard = e.target.closest(".evidence-card");
    if (evCard) {
      openLightbox(evCard.dataset.lightboxUrl, evCard.dataset.lightboxCaption);
    }
  });

  // Lightbox close
  document.getElementById("lightbox-close-btn")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox-modal") closeLightbox();
  });

  // Resume triggers & modal
  document.querySelectorAll(".resume-trigger").forEach((btn) => {
    btn.addEventListener("click", handleResumeTrigger);
  });
  document.getElementById("resume-modal-close")?.addEventListener("click", closeResumeModal);
  document.getElementById("resume-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "resume-modal") closeResumeModal();
  });
  document.getElementById("resume-print-btn")?.addEventListener("click", () => {
    window.print();
  });

  // Copy email
  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    navigator.clipboard?.writeText(siteConfig.email).then(
      () => showToast(`Copied ${siteConfig.email}`),
      () => showToast(siteConfig.email)
    );
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const lb = document.getElementById("lightbox-modal");
      if (lb && !lb.classList.contains("hidden")) {
        closeLightbox();
      } else {
        closeProjectModal();
        closeResumeModal();
      }
      return;
    }

    const tag = (e.target?.tagName || "").toLowerCase();
    const isTyping = tag === "input" || tag === "textarea" || tag === "select";
    if (isTyping) return;

    if (e.key === "/") {
      e.preventDefault();
      searchInput?.focus();
    } else if (e.key === "t" || e.key === "T") {
      toggleTheme();
    }
  });
}

/* ============================================================================
 * Bootstrap
 * ============================================================================ */

function init() {
  applySiteConfig();
  initWaveformPanel();
  renderStackMatrix();
  renderBackgroundSection();
  updateStats();
  renderFilterPills();
  renderProjects();
  bindEvents();
  checkResumePdf();
  syncWithGitHub(false);
}

init();
