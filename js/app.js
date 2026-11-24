import { siteConfig } from "../data/site-config.js?v=20261124b";
import { curatedProjects, categoryLabels } from "../data/projects.js?v=20261124b";

const LANGUAGE_COLORS = {
  Verilog: "#d97706",
  SystemVerilog: "#059669",
  Python: "#3b82f6",
  "C++": "#db2777",
  C: "#64748b",
  Assembly: "#10b981",
  JavaScript: "#eab308",
  TypeScript: "#2563eb",
};

const CATEGORY_DISPLAY = {
  rtl: "RTL & Formal Verification",
  verification: "Verification & Formal Methods",
  systems: "Low-Level Systems & Architecture",
  ai: "Applied AI & Automation",
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
  }, 2400);
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
 * Static Content & Config Binding
 * ============================================================================ */

function applySiteConfig() {
  document.title = `${siteConfig.name} — Computer Engineering Portfolio`;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("brand-name", siteConfig.name);
  setText("hero-name", siteConfig.name);
  setText("hero-role", "Computer Engineering (Hardware Major) · Bar-Ilan University");
  setText("hero-bio", siteConfig.bio);
  setText("footer-name", siteConfig.name);
  setText("footer-location", siteConfig.location);
  setText("footer-year", String(new Date().getFullYear()));
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

function renderSkillsSection() {
  const grid = document.getElementById("stack-grid");
  if (!grid) return;

  grid.innerHTML = siteConfig.skillGroups
    .map(
      (group) => `
      <div class="skill-group">
        <h3>${escapeHtml(group.title)}</h3>
        <ul class="skill-list">
          ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
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
          ${edu.meta ? `<span class="bg-badge">${escapeHtml(edu.meta)}</span>` : ""}
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
        <ul class="card-bullets">
          ${(exp.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");

  const langCard = siteConfig.spokenLanguages?.length
    ? `
      <article class="bg-card">
        <h3>Languages</h3>
        <div class="languages-bar">
          ${siteConfig.spokenLanguages
            .map(
              (l) => `
            <span class="lang-item"><strong>${escapeHtml(l.name)}</strong> — ${escapeHtml(l.level)}</span>
          `
            )
            .join("")}
        </div>
      </article>
    `
    : "";

  grid.innerHTML = `
    <div class="bg-column">
      <p class="bg-group-label">Education</p>
      ${eduCards}
    </div>
    <div class="bg-column">
      <p class="bg-group-label">Experience</p>
      ${expCards}
      ${langCard}
    </div>
  `;
}

/* ============================================================================
 * Filters & Clean Typographic Project Cards
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

  grid.innerHTML = filtered
    .map((project) => {
      const langColor = LANGUAGE_COLORS[project.primaryLanguage] || "#64748b";
      const domainLabel = CATEGORY_DISPLAY[project.category] || "Engineering";
      const visLabel =
        project.visibility === "private"
          ? "Private repository"
          : project.syncedFromGithub
            ? "Synced from GitHub"
            : formatDate(project.pushedAt);

      const bullets = (project.highlights || []).slice(0, 2);
      const bulletsHtml = bullets.length
        ? `<ul class="card-bullets">
             ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
           </ul>`
        : "";

      const starsText =
        project.visibility === "public" && typeof project.stars === "number" && project.stars > 0
          ? `<span>★ ${project.stars}</span>`
          : "";

      const repoAction =
        project.visibility === "private" || !project.githubUrl
          ? `<span class="private-note">Private source</span>`
          : `<a class="btn btn-xs btn-outline" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">
               GitHub ↗
             </a>`;

      return `
        <article class="project-card">
          <div class="card-top-meta">
            <span class="card-domain">${escapeHtml(domainLabel)}</span>
            <span class="card-vis">${escapeHtml(visLabel)}</span>
          </div>

          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-summary">${escapeHtml(project.summary)}</p>
          ${bulletsHtml}

          <div class="tech-tags">
            ${(project.techStack || [])
              .slice(0, 5)
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
            </div>

            <div class="card-actions">
              <button class="btn btn-xs btn-outline inspect-btn" type="button" data-project-id="${escapeHtml(project.id)}">
                Details
              </button>
              ${repoAction}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* ============================================================================
 * Project Details Modal & Lightbox
 * ============================================================================ */

function openProjectModal(projectId) {
  const project = state.projects.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const tagEl = document.getElementById("modal-tag");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");

  tagEl.textContent = CATEGORY_DISPLAY[project.category] || "Project Details";
  titleEl.textContent = project.title;

  const highlightsHtml = project.highlights?.length
    ? `
      <div class="modal-section">
        <h3>Key Highlights</h3>
        <ul class="card-bullets">
          ${project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  const modulesHtml = project.modules?.length
    ? `
      <div class="modal-section">
        <h3>Architecture &amp; Modules</h3>
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
        <h3>${project.visibility === "private" ? "Access" : "Build & Run"}</h3>
        <div class="code-bar">
          <code>${escapeHtml(project.runCommand)}</code>
          ${
            project.visibility !== "private"
              ? `<button class="btn btn-xs btn-outline copy-cmd-btn" type="button" data-cmd="${escapeHtml(project.runCommand)}">Copy</button>`
              : ""
          }
        </div>
      </div>
    `
    : "";

  const footerActions =
    project.visibility === "private" || !project.githubUrl
      ? `<span class="private-note">Private personal repository — source withheld for privacy.</span>`
      : `
        <a class="btn btn-primary btn-sm" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">
          View on GitHub ↗
        </a>
        ${
          project.homepageUrl
            ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(project.homepageUrl)}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
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
 * Resume PDF Detection & Print Fallback
 * ============================================================================ */

async function checkResumePdf() {
  const badge = document.getElementById("resume-status-badge");
  const dlLink = document.getElementById("resume-download-link");

  try {
    const res = await fetch(siteConfig.resumeUrl, { method: "HEAD" });
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (res.ok && (!contentType || contentType.includes("pdf") || contentType.includes("octet-stream"))) {
      state.resumePdfAvailable = true;
      if (badge) badge.textContent = "PDF (1 page)";
      if (dlLink) dlLink.classList.remove("hidden");
      return;
    }
  } catch {
    // Fallback to interactive resume sheet
  }

  state.resumePdfAvailable = false;
  if (badge) badge.textContent = "Web Summary";
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
        <div style="display:flex;flex-direction:column;gap:10px;">${educationHtml}</div>
      </div>

      <div class="modal-section">
        <h3>Projects</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">${projectsSummary}</div>
      </div>

      <div class="modal-section">
        <h3>Experience</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">${experienceHtml}</div>
      </div>

      <div class="modal-section">
        <h3>Skills &amp; Languages</h3>
        <div style="display:flex;flex-direction:column;gap:6px;font-size:0.86rem;">
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
 * Live GitHub Sync & Future Repo Auto-Discovery
 * ============================================================================ */

function setSyncText(label) {
  const el = document.getElementById("sync-status-text");
  if (el) el.textContent = label;
}

function mergeGitHubRepos(repos) {
  const ignored = new Set(
    (siteConfig.githubSync.ignoredRepos || []).map((n) => n.toLowerCase())
  );

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

    discoveredCount += 1;
    const topics = Array.isArray(repo.topics) ? repo.topics : [];
    const stack = [repo.language, ...topics.slice(0, 4)].filter(Boolean);

    merged.push({
      id: `gh-${repo.name}`,
      repoName: repo.name,
      title: repo.name.replace(/[-_]+/g, " "),
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
      summary:
        repo.description ||
        "Public repository automatically synced from GitHub.",
      overview:
        repo.description ||
        "This repository was automatically discovered via the GitHub API.",
      highlights: [],
      modules: [],
      techStack: stack.length ? stack : ["GitHub"],
      evidenceImages: [],
      runCommand: `git clone ${repo.clone_url || repo.html_url}`,
    });
  });

  state.projects = merged;
  renderFilterPills();
  renderProjects();

  return discoveredCount;
}

async function syncWithGitHub(forceRefresh = false) {
  if (!siteConfig.githubSync?.enabled || !siteConfig.githubUsername) {
    setSyncText("Curated projects");
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
          setSyncText(`Synced with @${siteConfig.githubUsername}`);
          return;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  setSyncText("Syncing with GitHub...");

  try {
    const url = `https://api.github.com/users/${encodeURIComponent(
      siteConfig.githubUsername
    )}/repos?sort=pushed&per_page=100`;
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error("Unexpected response");

    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), repos }));
    } catch {
      // Ignore storage quota errors
    }

    const discovered = mergeGitHubRepos(repos);
    setSyncText(
      discovered > 0
        ? `Synced with GitHub (+${discovered} new)`
        : `Synced with @${siteConfig.githubUsername}`
    );

    if (forceRefresh) showToast("GitHub metadata refreshed");
  } catch {
    setSyncText("Curated projects");
    if (forceRefresh) showToast("Could not reach GitHub API");
  }
}

/* ============================================================================
 * Theme & Event Wiring
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
}

function bindEvents() {
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  document.getElementById("filter-pills")?.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    state.activeCategory = pill.dataset.category || "all";
    renderFilterPills();
    renderProjects();
  });

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

  document.getElementById("sync-refresh-btn")?.addEventListener("click", () => {
    syncWithGitHub(true);
  });

  document.getElementById("projects-grid")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".inspect-btn");
    if (!btn) return;
    openProjectModal(btn.dataset.projectId);
  });

  document.getElementById("modal-close-btn")?.addEventListener("click", closeProjectModal);
  document.getElementById("project-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "project-modal") {
      closeProjectModal();
      return;
    }

    const copyBtn = e.target.closest(".copy-cmd-btn");
    if (copyBtn) {
      navigator.clipboard?.writeText(copyBtn.dataset.cmd || "").then(() => {
        showToast("Command copied");
      });
      return;
    }

    const evCard = e.target.closest(".evidence-card");
    if (evCard) {
      openLightbox(evCard.dataset.lightboxUrl, evCard.dataset.lightboxCaption);
    }
  });

  document.getElementById("lightbox-close-btn")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox-modal") closeLightbox();
  });

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

  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    navigator.clipboard?.writeText(siteConfig.email).then(
      () => showToast(`Copied ${siteConfig.email}`),
      () => showToast(siteConfig.email)
    );
  });

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
    if (tag === "input" || tag === "textarea" || tag === "select") return;

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
  renderSkillsSection();
  renderBackgroundSection();
  renderFilterPills();
  renderProjects();
  bindEvents();
  checkResumePdf();
  syncWithGitHub(false);
}

init();
