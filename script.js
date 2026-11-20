(() => {
  const root = document.documentElement;
  const data = window.PORTFOLIO;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const themeButton = $(".theme-toggle");

  function applyTheme(theme, persist = false) {
    root.dataset.theme = theme === "light" ? "light" : "dark";
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    themeButton?.setAttribute("aria-label", `Switch to ${next} theme`);
    const themeMeta = $('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = root.dataset.theme === "dark" ? "#10131d" : "#f5f7fb";
    if (persist) try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch (_) {}
  }
  applyTheme(root.dataset.theme);
  themeButton?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true));

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const safeUrl = (value, protocols = ["https:"]) => {
    try { const url = new URL(value, location.href); return protocols.includes(url.protocol) ? url.href : "#"; }
    catch (_) { return "#"; }
  };
  const externalLink = (label, href, className) => {
    const a = make("a", className, label);
    a.href = href;
    if (href.startsWith("https:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  };
  if (!data) return;

  const brandName = $("#brand-name");
  const brandRole = $("#brand-role");
  if (brandName) brandName.textContent = data.name;
  if (brandRole) brandRole.textContent = data.role;

  const skillIcons = [
    [/(flutter|dart)/i, "mobile"], [/(javascript|oop|solid)/i, "code"],
    [/(database|sqlite|hive|drift|preferences|supabase)/i, "database"],
    [/(api|dio|firebase|backend)/i, "server"], [/(ui|figma|responsive|rtl)/i, "design"],
    [/(bloc|cubit|provider|mvvm)/i, "layers"], [/(architecture|repository|pattern)/i, "architecture"],
    [/(notification)/i, "bell"], [/(maps)/i, "map"], [/(git|ci\/cd|devtools)/i, "tools"],
  ];
  const iconPaths = {
    mobile: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/>',
    code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    server: '<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6m-6 10h6"/>',
    design: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8h8v8H8zM3 10h5m8 4h5M10 3v5m4 8v5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    architecture: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="m10.8 7.2-4.6 9.6m7-9.6 4.6 9.6M7.5 19h9"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
    tools: '<path d="m14 7 3-3 4 4-3 3m-4-4L5 16a2.8 2.8 0 1 0 4 4l9-9M4 4l5 5m-2-7 4 4"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5 1.4 15 3.4a13.3 13.3 0 0 0-7 0C5.5 1.4 3.3 1.6 3.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 7 18v4"/>',
    linkedin: '<path d="M5 9v11M5 5v.01M10 20v-7a4 4 0 0 1 8 0v7m0-7a4 4 0 0 1 4 0v7"/>',
  };
  const makeIcon = name => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("ui-icon");
    svg.innerHTML = iconPaths[name] || iconPaths.code;
    return svg;
  };
  const skillIcon = value => skillIcons.find(([pattern]) => pattern.test(value))?.[1] || "code";
  const renderChips = (container, values) => values.forEach(value => {
    const chip = make("span", "skill-chip");
    chip.append(makeIcon(skillIcon(value)), make("span", "skill-name", value));
    container.append(chip);
  });

  const heroRole = $("#hero-role");
  const heroIntro = $("#hero-intro");
  if (heroRole) heroRole.textContent = data.role;
  if (heroIntro) heroIntro.textContent = data.summary;
  const aboutSummary = $("#about-summary");
  const aboutLocation = $("#about-location");
  if (aboutSummary) aboutSummary.textContent = data.summary;
  if (aboutLocation) aboutLocation.textContent = data.location;

  const projectTags = project => project.label.split(",").map(value => value.trim());
  const projects = $("#projects");
  const dialog = $(".project-dialog");
  let returnFocus = null;
  let savedScrollY = 0;
  let closeTimer = 0;
  function showProject(project, trigger) {
    if (!dialog) return;
    returnFocus = trigger;
    $(".dialog-category").textContent = project.category;
    $("#dialog-title").textContent = project.title;
    $(".dialog-description").textContent = project.description;
    renderChips($(".dialog-tags"), projectTags(project));
    const image = $(".dialog-image");
    image.src = safeUrl(project.screens?.[0], ["http:", "https:"]);
    image.alt = `${project.title} app screenshot`;
    const link = $(".dialog-link");
    link.hidden = !project.link;
    if (project.link) {
      link.href = safeUrl(project.link);
      link.classList.add("skill-chip");
      link.replaceChildren(makeIcon("github"), make("span", "skill-name", "View Code"));
    }
    savedScrollY = window.scrollY;
    document.body.style.top = `-${savedScrollY}px`;
    document.body.classList.add("dialog-open");
    dialog.showModal();
    requestAnimationFrame(() => $(".dialog-close").focus());
  }
  if (projects) data.projects.forEach(project => {
    const card = make("button", "project-card");
    card.type = "button";
    card.setAttribute("aria-label", `Open ${project.title} project details`);
    const preview = make("div", "project-preview");
    if (project.screens?.[0]) {
      const image = make("img", "project-cover");
      image.src = safeUrl(project.screens[0], ["http:", "https:"]);
      image.alt = `${project.title} project preview`;
      image.loading = "lazy";
      image.decoding = "async";
      preview.append(image);
    }
    const body = make("div", "project-card-body");
    body.append(make("p", "project-category", project.category), make("h2", "project-title", project.title), make("p", "project-description", project.description));
    const tags = make("div", "project-tags");
    renderChips(tags, projectTags(project));
    body.append(tags, make("span", "project-year", project.year));
    card.append(preview, body);
    card.addEventListener("click", () => showProject(project, card));
    projects.append(card);
  });

  const skills = $("#skills");
  if (skills) renderChips(skills, data.skills);

  const experienceList = $("#experience-list");
  if (experienceList) data.experience.forEach(item => {
    const row = make("article", "timeline-item reveal");
    const heading = make("div", "timeline-heading");
    const title = make("h2", "", `${item.role} at ${item.company}`);
    if (item.link) title.append(document.createTextNode(" "), externalLink("View LinkedIn post ↗", safeUrl(item.link), "experience-link"));
    heading.append(title, make("time", "timeline-date", item.date));
    row.append(heading, make("p", "timeline-detail", item.detail));
    experienceList.append(row);
  });

  const contactLinks = $("#contact-links");
  if (contactLinks) {
    const contactRows = [
      ["email", "Email", data.email, `mailto:${data.email}`, ["mailto:"]],
      ["phone", "Phone", data.phone, `tel:${data.phone.replace(/\s/g, "")}`, ["tel:"]],
      ["pin", "Location", data.location, null],
      ["github", "GitHub", data.github.replace(/^https:\/\//, ""), data.github],
      ["linkedin", "LinkedIn", data.linkedin.replace(/^https:\/\//, ""), data.linkedin],
    ];
    contactRows.forEach(([iconName, label, value, href, protocols]) => {
      const row = make("div", "contact-item");
      const iconHolder = make("span", "contact-icon");
      iconHolder.append(makeIcon(iconName));
      const copy = make("span", "contact-value");
      copy.append(make("span", "contact-label", label));
      if (href) copy.append(externalLink(value, safeUrl(href, protocols || ["https:"]), "contact-direct-link"));
      else copy.append(make("strong", "", value));
      row.append(iconHolder, copy);
      contactLinks.append(row);
    });
  }

  const contactForm = $(".contact-form");
  if (contactForm) {
    const formStatus = $("#contact-form-status");
    const submitButton = $(".form-submit");
    const submitLabel = $(".submit-label", submitButton);
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();
      submitButton.disabled = true;
      contactForm.setAttribute("aria-busy", "true");
      formStatus.hidden = false;
      formStatus.className = "form-status sending";
      formStatus.textContent = "Sending your message…";
      submitLabel.textContent = "Sending…";
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
        });
        const result = await response.json();
        if (!response.ok || result.success === false || result.success === "false") throw new Error(result.message || "The message could not be sent.");
        contactForm.reset();
        formStatus.className = "form-status success";
        formStatus.textContent = "Your message was submitted. If this is your first message, check your inbox and activate the form.";
      } catch (_) {
        formStatus.className = "form-status error";
        formStatus.replaceChildren(document.createTextNode("Your message could not be submitted. You can still send it using your email app: "));
        const subject = contactForm.elements.subject.value.trim() || "Portfolio contact";
        const body = [`Name: ${contactForm.elements.name.value.trim()}`, `Email: ${contactForm.elements.email.value.trim()}`, "", contactForm.elements.message.value.trim()].join("\n");
        const fallback = make("a", "form-fallback", `Email ${data.email}`);
        fallback.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        formStatus.append(fallback, document.createTextNode(". If this is the first submission, FormSubmit may also need you to activate the recipient address."));
      } finally {
        submitButton.disabled = false;
        submitLabel.textContent = "Send Message";
        contactForm.removeAttribute("aria-busy");
      }
    });
  }

  function closeProject() {
    if (!dialog?.open || closeTimer) return;
    dialog.classList.add("closing");
    closeTimer = window.setTimeout(() => { closeTimer = 0; dialog.close(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
  }
  if (dialog) {
    $(".dialog-close").addEventListener("click", closeProject);
    dialog.addEventListener("cancel", event => { event.preventDefault(); closeProject(); });
    dialog.addEventListener("close", () => {
      dialog.classList.add("closing");
      document.body.classList.remove("dialog-open");
      document.body.style.top = "";
      window.scrollTo(0, savedScrollY);
      returnFocus?.focus({ preventScroll: true });
      window.setTimeout(() => dialog.classList.remove("closing"), 220);
    });
    dialog.addEventListener("click", event => { if (event.target === dialog) closeProject(); });
    dialog.addEventListener("keydown", event => {
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll("button:not(:disabled), a[href]:not([hidden])")];
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    });
  }

  const revealNodes = [...document.querySelectorAll("main section, .project-card, .timeline-item, .contact-layout")];
  revealNodes.forEach((node, index) => { node.classList.add("reveal"); node.style.setProperty("--reveal-delay", `${index % 4 * 70}ms`); });
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    revealNodes.forEach(node => observer.observe(node));
  } else revealNodes.forEach(node => node.classList.add("is-visible"));
})();
