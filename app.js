const storageKey = "ashish-portfolio-data";

const defaults = {
  skills: [
    {
      id: crypto.randomUUID(),
      title: "Python",
      icon: "braces",
      description: "Backend logic, scripting, automation, data workflows, and production-ready APIs.",
    },
    {
      id: crypto.randomUUID(),
      title: "FastAPI",
      icon: "zap",
      description: "High-performance REST APIs with clean validation, docs, and async-ready services.",
    },
    {
      id: crypto.randomUUID(),
      title: "Gen AI",
      icon: "brain-circuit",
      description: "LLM integrations, RAG flows, prompt systems, and AI-powered product features.",
    },
    {
      id: crypto.randomUUID(),
      title: "LangChain",
      icon: "langchain",
      description: "LLM application orchestration, retrieval pipelines, tools, and agent workflows.",
    },
    {
      id: crypto.randomUUID(),
      title: "Agentic AI",
      icon: "bot",
      description: "Tool-using agents, workflow orchestration, and autonomous task pipelines.",
    },
    {
      id: crypto.randomUUID(),
      title: "HTML",
      icon: "code-2",
      description: "Semantic page structure, accessible markup, and content-first web foundations.",
    },
    {
      id: crypto.randomUUID(),
      title: "CSS",
      icon: "palette",
      description: "Responsive layouts, visual systems, motion, and polished component styling.",
    },
    {
      id: crypto.randomUUID(),
      title: "JavaScript",
      icon: "braces",
      description: "Interactive frontend behavior, browser APIs, and dynamic product experiences.",
    },
    {
      id: crypto.randomUUID(),
      title: "SQL",
      icon: "database",
      description: "Relational schema design, queries, reports, and app-ready data persistence.",
    },
    {
      id: crypto.randomUUID(),
      title: "C Programming",
      icon: "cpu",
      description: "Core programming foundations, memory-aware thinking, and algorithmic discipline.",
    },
    {
      id: crypto.randomUUID(),
      title: "Email Automation",
      icon: "mail-check",
      description: "Automated campaigns, transactional flows, parsing, and business email workflows.",
    },
    {
      id: crypto.randomUUID(),
      title: "Canva",
      icon: "palette",
      description: "Presentation decks, PPT slides, banners, posters, and social media creatives.",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Atscraft.in",
      icon: "file-check-2",
      description: "An AI-powered ATS resume builder designed to help candidates create stronger, job-ready resumes.",
      tags: "AI, Resume Builder, Web App",
      imageUrl: "assets/projects/atscraft.png",
      ctaLabel: "Live Product",
      link: "https://atscraft.in",
    },
    {
      id: crypto.randomUUID(),
      title: "Web Dev Club Official Webapp",
      icon: "globe-2",
      description: "The official Web Development Club platform for showcasing the community, workshops, projects, and developer activities.",
      tags: "Community, Web Development, Platform",
      imageUrl: "assets/projects/web-dev-club.png",
      link: "https://webdevclub.onrender.com/",
      ctaLabel: "Live Web Platform",
    },
    {
      id: crypto.randomUUID(),
      title: "Certificate Delivery Automation",
      icon: "send",
      description:
        "An email automation workflow that reads student data from Google Sheets and delivers each student’s certificate to the correct email address.",
      tags: "Google Sheets, Email Automation, Python",
      imageUrl: "",
      ctaLabel: "Personal Organisation Build",
      link: "#contact",
    },
  ],
  services: [
    {
      id: crypto.randomUUID(),
      title: "Websites & Apps",
      icon: "layers-3",
      description:
        "Responsive websites and landing pages\nCross-platform Android and iOS apps\nModern web apps with reliable APIs\nClean, scalable, and maintainable builds",
    },
    {
      id: crypto.randomUUID(),
      title: "AI Agents & Solutions",
      icon: "brain-circuit",
      description:
        "Multi-Agent Systems\nAI agents for business tasks and automation\nIntelligent chatbots for websites and support teams\nRAG systems and custom Generative AI solutions",
    },
    {
      id: crypto.randomUUID(),
      title: "Design & Content",
      icon: "palette",
      description:
        "Presentation decks and professional PPT slides\nBanners and posters for events or campaigns\nSocial media posts and branded creatives\nConsistent visual design for your brand",
    },
    {
      id: crypto.randomUUID(),
      title: "Business Automation",
      icon: "workflow",
      description:
        "Email campaigns and transactional email workflows\nSocial media publishing and content workflows\nAutomation for repetitive business tasks\nConnected workflows that save time and reduce manual work",
    },
  ],
  stats: [
    { id: crypto.randomUUID(), value: "12", label: "Core Skills" },
    { id: crypto.randomUUID(), value: "3", label: "Recent Products" },
    { id: crypto.randomUUID(), value: "1:1", label: "Client Collaboration" },
  ],
};

const fields = {
  skills: [
    ["title", "Skill Name"],
    ["icon", "Fallback Lucide Icon Name"],
    ["description", "Description", "textarea"],
  ],
  projects: [
    ["title", "Project Name"],
    ["imageUrl", "Project Image URL (optional)"],
    ["icon", "Lucide Icon Name"],
    ["description", "Description", "textarea"],
    ["tags", "Tags"],
    ["link", "Project Link"],
  ],
  services: [
    ["title", "Service Name"],
    ["icon", "Lucide Icon Name"],
    ["description", "Description", "textarea"],
  ],
  stats: [
    ["value", "Stat Value"],
    ["label", "Stat Label"],
  ],
};

let state = loadData();
let activeType = "skills";
let editingId = null;

const selectors = {
  statsGrid: document.querySelector("#statsGrid"),
  skillsGrid: document.querySelector("#skillsGrid"),
  servicesGrid: document.querySelector("#servicesGrid"),
  projectsGrid: document.querySelector("#projectsGrid"),
  form: document.querySelector("#widgetForm"),
  formFields: document.querySelector("#formFields"),
  adminList: document.querySelector("#adminList"),
  cancelEdit: document.querySelector("#cancelEdit"),
  exportData: document.querySelector("#exportData"),
  importData: document.querySelector("#importData"),
  resetData: document.querySelector("#resetData"),
  adminShell: document.querySelector("#admin"),
};

function loadData() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaults);

  try {
    const data = { ...structuredClone(defaults), ...JSON.parse(saved) };
    const combinedFrontendIndex = data.skills.findIndex(
      (item) => String(item.title).toLowerCase() === "html, css, js",
    );

    if (combinedFrontendIndex !== -1) {
      const [combinedFrontend] = data.skills.splice(combinedFrontendIndex, 1);
      data.skills.push(
        ...["HTML", "CSS", "JavaScript"].map((title) => ({
          ...combinedFrontend,
          id: crypto.randomUUID(),
          title,
        })),
      );
    }

    const savedTitles = new Set(data.skills.map((item) => String(item.title).toLowerCase()));
    defaults.skills.forEach((skill) => {
      if (!savedTitles.has(skill.title.toLowerCase())) {
        data.skills.push(structuredClone(skill));
      }
    });
    data.skills = data.skills.map((skill) =>
      String(skill.title || "").trim().toLowerCase() === "gen ai"
        ? { ...skill, icon: "brain-circuit" }
        : skill,
    );
    data.stats = data.stats.map((stat) =>
      String(stat.label || "").toLowerCase() === "core skills"
        ? { ...stat, value: String(data.skills.length) }
        : stat,
    );

    const serviceUpdates = {
      "full stack development": defaults.services[0],
      "ai agents & gen ai": defaults.services[1],
      "email & process automation": defaults.services[3],
      "ai agents & solutions": defaults.services[1],
    };
    data.services = data.services.map((service) => {
      const updated = serviceUpdates[String(service.title || "").toLowerCase()];
      return updated ? { ...structuredClone(updated), id: service.id } : service;
    });
    const serviceTitles = new Set(data.services.map((service) => String(service.title).toLowerCase()));
    defaults.services.forEach((service) => {
      if (!serviceTitles.has(service.title.toLowerCase())) {
        data.services.push(structuredClone(service));
      }
    });

    const savedProjects = new Map(
      data.projects.map((project) => [String(project.title || "").toLowerCase(), project]),
    );
    data.projects = defaults.projects.map((project) => {
      const savedProject = savedProjects.get(project.title.toLowerCase());
      return savedProject
        ? { ...structuredClone(project), ...savedProject, imageUrl: savedProject.imageUrl || project.imageUrl }
        : structuredClone(project);
    });

    return data;
  } catch {
    return structuredClone(defaults);
  }
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
}

function icon(name) {
  return `<i data-lucide="${name || "circle"}"></i>`;
}

const skillLogoSlugs = {
  python: ["python"],
  fastapi: ["fastapi"],
  "agentic ai": ["crewai"],
  langchain: ["langchain"],
  html: ["html5"],
  css: ["css"],
  javascript: ["javascript"],
  sql: ["postgresql"],
  "c programming": ["c"],
  canva: ["canva"],
};

function skillIcon(item) {
  const title = String(item.title || "").trim().toLowerCase();
  const slugs = skillLogoSlugs[title] || [];

  if (!slugs.length) return icon(item.icon);

  return `
    <span class="skill-logos" aria-label="${escapeAttribute(item.title)} logo">
      ${slugs
        .map(
          (slug) =>
            `<img class="${slug === "langchain" ? "skill-logo--langchain" : slug === "canva" ? "skill-logo--canva" : ""}" src="${slug === "langchain" ? "assets/logos/langchain.svg" : slug === "canva" ? "assets/logos/canva.svg" : `https://cdn.simpleicons.org/${slug}`}" alt="${escapeAttribute(item.title)} logo" loading="lazy" decoding="async" />`,
        )
        .join("")}
    </span>
  `;
}

function renderStats() {
  selectors.statsGrid.innerHTML = state.stats
    .map(
      (item) => `
        <article class="stat-card">
          <span class="stat-value">${escapeHtml(item.value)}</span>
          <span class="stat-label">${escapeHtml(item.label)}</span>
        </article>
      `,
    )
    .join("");
}

function renderSkills() {
  selectors.skillsGrid.innerHTML = state.skills
    .map(
      (item) => `
        <article class="skill-card reveal-card">
          <div class="card-icon">${skillIcon(item)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="card-copy">${escapeHtml(item.description)}</p>
        </article>
      `,
    )
    .join("");
}

function renderServices() {
  selectors.servicesGrid.innerHTML = state.services
    .map(
      (item) => `
        <article class="service-card reveal-card">
          <div class="card-icon">${icon(item.icon)}</div>
          <span class="service-kicker">Freelance service</span>
          <h3>${escapeHtml(item.title)}</h3>
          ${renderServiceDescription(item.description)}
        </article>
      `,
    )
    .join("");
}

function renderServiceDescription(description) {
  const points = String(description || "")
    .split(/\r?\n/)
    .map((point) => point.trim())
    .filter(Boolean);

  if (points.length <= 1) {
    return `<p class="card-copy">${escapeHtml(points[0] || "")}</p>`;
  }

  return `
    <ul class="service-points">
      ${points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
    </ul>
  `;
}

function renderProjects() {
  selectors.projectsGrid.innerHTML = state.projects
    .map(
      (item) =>       ` 
        <article class="project-card reveal-card">
          ${
            item.imageUrl
              ? `<div class="project-preview"><img src="${escapeAttribute(item.imageUrl)}" alt="${escapeAttribute(item.title)} preview" loading="lazy" /></div>`
              : `<div class="project-preview project-preview--automation" aria-hidden="true"><span class="automation-node automation-node--sheet">${icon("table-2")}<b>Sheets</b></span><span class="automation-line"></span><span class="automation-node automation-node--mail">${icon("mail-check")}<b>Email</b></span><span class="automation-badge">${icon("check")} Delivered</span></div>`
          }
          <div class="project-content">
            <div class="card-icon">${icon(item.icon)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="card-copy">${escapeHtml(item.description)}</p>
          <div class="tag-row">
            ${String(item.tags || "")
              .split(",")
              .filter(Boolean)
              .map((tag) => `<span class="tag">${escapeHtml(tag.trim())}</span>`)
              .join("")}
          </div>
          <div class="tag-row">
            ${
              item.ctaLabel
                ? `
                  <span class="project-context"><span class="project-context-dot"></span>${escapeHtml(item.ctaLabel)}</span>
                  ${
                    item.link && item.link !== "#contact"
                      ? `<a class="secondary-action" href="${escapeAttribute(item.link)}" target="_blank" rel="noreferrer">${icon("external-link")}Open Project</a>`
                      : ""
                  }
                `
                : `<a class="secondary-action" href="${escapeAttribute(item.link || "#contact")}">${icon("external-link")}Open</a>`
            }
          </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function syncAdminVisibility() {
  const isAdminRoute = window.location.hash.toLowerCase() === "#admin";
  selectors.adminShell.classList.toggle("is-visible", isAdminRoute);
}

function renderForm() {
  selectors.formFields.innerHTML = fields[activeType]
    .map(([key, label, type]) => {
      const item = state[activeType].find((entry) => entry.id === editingId) || {};
      const value = escapeAttribute(item[key] || "");
      const control =
        type === "textarea"
          ? `<textarea id="${key}" name="${key}" required>${escapeHtml(item[key] || "")}</textarea>`
          : `<input id="${key}" name="${key}" type="${key === "imageUrl" ? "url" : "text"}" value="${value}" ${key === "imageUrl" ? "" : "required"} />`;

      return `
        <div class="field ${type === "textarea" ? "full" : ""}">
          <label for="${key}">${label}</label>
          ${control}
        </div>
      `;
    })
    .join("");
}

function renderAdminList() {
  selectors.adminList.innerHTML = state[activeType]
    .map((item) => {
      const title = item.title || item.label || item.value;
      const detail = item.description || item.tags || item.label || "";

      return `
        <article class="admin-item">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(detail)}</span>
          </div>
          <div class="admin-item-actions">
            <button class="icon-button" type="button" aria-label="Edit ${escapeAttribute(title)}" data-edit="${item.id}">
              ${icon("pencil")}
            </button>
            <button class="icon-button" type="button" aria-label="Delete ${escapeAttribute(title)}" data-delete="${item.id}">
              ${icon("trash-2")}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAll() {
  renderStats();
  renderSkills();
  renderServices();
  renderProjects();
  renderForm();
  renderAdminList();
  lucide.createIcons();
  animateCards();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function setActiveType(type) {
  activeType = type;
  editingId = null;
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.adminType === type);
  });
  renderForm();
  renderAdminList();
  lucide.createIcons();
}

function upsertWidget(event) {
  event.preventDefault();
  const formData = new FormData(selectors.form);
  const widget = Object.fromEntries(formData.entries());

  if (editingId) {
    state[activeType] = state[activeType].map((item) =>
      item.id === editingId ? { ...item, ...widget } : item,
    );
  } else {
    state[activeType].push({ id: crypto.randomUUID(), ...widget });
  }

  editingId = null;
  saveData();
  renderAll();
}

function handleAdminListClick(event) {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (editButton) {
    editingId = editButton.dataset.edit;
    renderForm();
    selectors.form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (deleteButton) {
    state[activeType] = state[activeType].filter((item) => item.id !== deleteButton.dataset.delete);
    saveData();
    renderAll();
  }
}

function exportPortfolioData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "portfolio-data.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function importPortfolioData(event) {
  const [file] = event.target.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      state = { ...structuredClone(defaults), ...imported };
      saveData();
      renderAll();
    } catch {
      alert("JSON file valid nahi hai.");
    }
  });
  reader.readAsText(file);
}

function resetPortfolioData() {
  const confirmed = confirm("Default portfolio data restore karna hai?");
  if (!confirmed) return;
  state = structuredClone(defaults);
  saveData();
  renderAll();
}

function animateCards() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".reveal-card, .stat-card").forEach((card) => {
    gsap.fromTo(
      card,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      },
    );
  });
}

function bootAnimations() {
  if (!window.gsap) return;

  gsap.from("[data-animate='nav']", { y: -24, opacity: 0, duration: 0.75, ease: "power3.out" });
  gsap.from(".eyebrow, h1, .hero-copy, .hero-actions", {
    y: 28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease: "power3.out",
  });
  gsap.from(".hero-stats .stat-card", {
    y: 24,
    opacity: 0,
    duration: 0.7,
    delay: 0.55,
    stagger: 0.1,
    ease: "power3.out",
  });
  gsap.from(".code-window", {
    rotate: -3,
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: "elastic.out(1, 0.7)",
  });
  gsap.to(".orbit-one", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
  gsap.to(".orbit-two", { rotate: -360, duration: 22, repeat: -1, ease: "none" });

  if (window.ScrollTrigger) {
    gsap.utils.toArray(".section-heading, .split-section > div:first-child, .contact-band").forEach((section) => {
      gsap.from(section, {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
    });
    gsap.utils.toArray(".contact-link").forEach((link, index) => {
      gsap.from(link, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: link, start: "top 88%", once: true },
      });
    });
  }
}

function startLoader() {
  const loader = document.querySelector("#pageLoader");
  const progress = document.querySelector(".loader-progress span");
  const percent = document.querySelector(".loader-percent");

  if (!loader) {
    bootAnimations();
    return;
  }

  if (!window.gsap) {
    loader.remove();
    bootAnimations();
    return;
  }

  const counter = { value: 0 };
  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          loader.remove();
          bootAnimations();
        },
      });
    },
  });

  timeline
    .from(".loader-console, .loader-footer", { opacity: 0, y: 12, duration: 0.45, stagger: 0.1 })
    .from(".loader-core", { scale: 0.55, opacity: 0, rotate: -8, duration: 0.8, ease: "back.out(1.7)" }, "-=0.2")
    .from(".loader-orbit", { scale: 0, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=0.55")
    .to(progress, { width: "100%", duration: 2.1, ease: "power2.inOut" }, "-=0.35")
    .to(
      counter,
      {
        value: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          percent.textContent = `${String(Math.round(counter.value)).padStart(2, "0")}%`;
        },
      },
      "<",
    );

  window.setTimeout(() => {
    if (loader.isConnected) {
      loader.remove();
      bootAnimations();
    }
  }, 5200);
}

document.querySelectorAll(".admin-tab").forEach((tab) => {
  tab.addEventListener("click", () => setActiveType(tab.dataset.adminType));
});

selectors.form.addEventListener("submit", upsertWidget);
selectors.adminList.addEventListener("click", handleAdminListClick);
selectors.cancelEdit.addEventListener("click", () => {
  editingId = null;
  selectors.form.reset();
  renderForm();
});
selectors.exportData.addEventListener("click", exportPortfolioData);
selectors.importData.addEventListener("change", importPortfolioData);
selectors.resetData.addEventListener("click", resetPortfolioData);
window.addEventListener("hashchange", syncAdminVisibility);
document.body.classList.add("dark");

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

function initThreeBackground() {
  const canvas = document.querySelector("#threeBackground");
  if (!canvas || !window.THREE) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 10);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.warn("Three.js background unavailable:", error);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  scene.add(new THREE.AmbientLight(0xa8d8ff, 1.7));
  const keyLight = new THREE.DirectionalLight(0x67e8f9, 2.4);
  keyLight.position.set(-4, 7, 6);
  scene.add(keyLight);
  const pinkLight = new THREE.PointLight(0xf472b6, 2.2, 12);
  pinkLight.position.set(4, 2, 4);
  scene.add(pinkLight);

  const group = new THREE.Group();
  group.position.set(0, -1.9, -1.5);
  scene.add(group);

  const material = (color, roughness = 0.72) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 });
  const cyan = material(0x22d3ee);
  const green = material(0x86efac);
  const pink = material(0xf472b6);
  const dark = material(0x172033);
  const screen = material(0x9ff8ff, 0.35);
  const skin = material(0xffc7a8);

  function mesh(geometry, meshMaterial, position) {
    const item = new THREE.Mesh(geometry, meshMaterial);
    item.position.set(...position);
    return item;
  }

  function laptop(parent, scale = 1) {
    const computer = new THREE.Group();
    computer.scale.setScalar(scale);
    computer.add(mesh(new THREE.BoxGeometry(1.25, 0.06, 0.78), dark, [0, 0, 0]));
    const display = mesh(new THREE.BoxGeometry(1.08, 0.62, 0.05), screen, [0, 0.4, -0.36]);
    display.rotation.x = -0.08;
    computer.add(display);
    computer.add(mesh(new THREE.BoxGeometry(1.16, 0.035, 0.65), cyan, [0, 0.07, 0.03]));
    parent.add(computer);
    return computer;
  }

  function character(x, color, seated = false) {
    const person = new THREE.Group();
    person.position.set(x, 0, 0);
    person.userData.phase = x * 0.7;
    person.add(mesh(new THREE.SphereGeometry(0.38, 20, 14), skin, [0, 1.52, 0]));
    person.add(mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.16, 12), skin, [0, 1.13, 0]));
    person.add(mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.72, 14), color, [0, 0.82, 0]));
    const legY = seated ? 0.2 : 0.05;
    const leftLeg = new THREE.Group();
    const rightLeg = new THREE.Group();
    leftLeg.position.set(-0.16, seated ? 0.52 : 0.48, 0);
    rightLeg.position.set(0.16, seated ? 0.52 : 0.48, 0);
    leftLeg.add(mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.48, 10), dark, [0, -0.24, 0]));
    rightLeg.add(mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.48, 10), dark, [0, -0.24, 0]));
    const leftFoot = mesh(new THREE.BoxGeometry(0.16, 0.1, 0.32), dark, [0, -0.53, 0.08]);
    const rightFoot = mesh(new THREE.BoxGeometry(0.16, 0.1, 0.32), dark, [0, -0.53, 0.08]);
    leftLeg.add(leftFoot);
    rightLeg.add(rightFoot);
    if (seated) {
      leftLeg.rotation.z = -0.9;
      rightLeg.rotation.z = 0.9;
    }
    person.add(leftLeg, rightLeg);
    const leftArm = mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.62, 10), skin, [-0.42, 0.78, 0]);
    const rightArm = mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.62, 10), skin, [0.42, 0.78, 0]);
    leftArm.rotation.z = seated ? 1.12 : 0.12;
    rightArm.rotation.z = seated ? -1.12 : -0.12;
    person.add(leftArm, rightArm);
    person.userData.walkParts = { leftLeg, rightLeg, leftArm, rightArm };
    group.add(person);
    return person;
  }

  function tree(x, y, z) {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, y, z);
    treeGroup.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.7, 10), material(0x8b5e3c), [0, 0.85, 0]));
    treeGroup.add(mesh(new THREE.SphereGeometry(0.8, 14, 10), green, [-0.38, 1.75, 0]));
    treeGroup.add(mesh(new THREE.SphereGeometry(0.72, 14, 10), green, [0.4, 1.85, 0]));
    treeGroup.add(mesh(new THREE.SphereGeometry(0.62, 14, 10), green, [0.05, 2.28, 0]));
    group.add(treeGroup);
    return treeGroup;
  }

  const floor = mesh(new THREE.CircleGeometry(6.4, 48), material(0x0b1321), [0, -0.4, -0.5]);
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const treeObject = tree(2.55, -0.35, -0.75);
  const resting = character(-0.9, green);
  resting.position.z = 0.55;
  resting.position.y = -0.05;

  const particles = new THREE.Group();
  for (let index = 0; index < 28; index += 1) {
    const dot = mesh(
      new THREE.SphereGeometry(0.025 + Math.random() * 0.035, 8, 8),
      index % 2 ? cyan : pink,
      [(Math.random() - 0.5) * 10, Math.random() * 4.4 - 0.3, -0.8 - Math.random() * 2],
    );
    particles.add(dot);
  }
  scene.add(particles);

  let frame;
  const animate = (time = 0) => {
    frame = requestAnimationFrame(animate);
    const seconds = time * 0.001;
    const walk = Math.sin(seconds * 2.4);
    const walkParts = resting.userData.walkParts;
    resting.position.y = -0.05 + Math.abs(walk) * 0.035;
    resting.rotation.z = Math.sin(seconds * 2.4) * 0.018;
    walkParts.leftLeg.rotation.x = walk * 0.42;
    walkParts.rightLeg.rotation.x = -walk * 0.42;
    walkParts.leftArm.rotation.x = -walk * 0.28;
    walkParts.rightArm.rotation.x = walk * 0.28;
    treeObject.rotation.z = Math.sin(seconds * 0.45) * 0.012;
    particles.rotation.y = seconds * 0.025;
    renderer.render(scene, camera);
    if (reducedMotion) cancelAnimationFrame(frame);
  };
  animate();

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", resize);
}

renderAll();
syncAdminVisibility();
startLoader();
window.setTimeout(initThreeBackground, 0);
