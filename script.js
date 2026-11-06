(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist = false) {
    const selected = theme === "light" ? "light" : "dark";
    root.dataset.theme = selected;
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${selected === "dark" ? "light" : "dark"} theme`,
    );
    themeButton.querySelector(".theme-label").textContent =
      `${selected === "dark" ? "Light" : "Dark"} mode`;
    themeMeta.content = selected === "dark" ? "#0B1220" : "#F5F8FD";
    if (persist) {
      try {
        localStorage.setItem("portfolio-theme", selected);
      } catch (_) {}
    }
  }

  applyTheme(root.dataset.theme);
  themeButton.addEventListener("click", () =>
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true),
  );

  const portfolio = window.PORTFOLIO;
  if (!portfolio || !Array.isArray(portfolio.projects)) {
    document.querySelector("#projects").textContent =
      "Portfolio details could not be loaded. Please refresh or contact Mahmoud by email.";
    return;
  }

  const $ = (selector) => document.querySelector(selector);
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const safeUrl = (value, protocols = ["https:"]) => {
    try {
      const url = new URL(value, window.location.href);
      return protocols.includes(url.protocol) ? url.href : "#";
    } catch (_) {
      return "#";
    }
  };
  const externalLink = (label, href, className) => {
    const link = element("a", className, label);
    link.href = href;
    if (href.startsWith("https:")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  };

  $("#brand-name").textContent = portfolio.name;
  document.title = `${portfolio.name} — ${portfolio.role}`;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[name="twitter:title"]').content = document.title;
  $("#footer-name").textContent = portfolio.name;
  $("#footer-location").textContent = portfolio.location;
  $("#hero-role").textContent = portfolio.role;
  $("#hero-intro").textContent = portfolio.heroIntro;
  $("#education").textContent = portfolio.education;
  $("#summary").textContent = portfolio.summary;

  const renderChips = (container, values) =>
    values.forEach((value) =>
      container.append(element("span", "skill-chip", value)),
    );
  renderChips($("#hero-skills"), portfolio.skills.slice(0, 5));
  renderChips($("#skills"), portfolio.skills);

  function makePhone(src, alt, className, loading = "lazy") {
    const frame = element("div", `phone-frame ${className || ""}`.trim());
    const screen = element("div", "phone-screen");
    if (src) {
      const image = element("img", "phone-image");
      image.addEventListener(
        "error",
        () => {
          screen.replaceChildren(
            element("div", "screen-placeholder", "App preview unavailable"),
          );
        },
        { once: true },
      );
      image.alt = alt;
      image.loading = loading;
      if (loading === "eager") image.fetchPriority = "high";
      image.decoding = "async";
      image.src = safeUrl(src, ["http:", "https:"]);
      screen.append(image);
    } else {
      screen.append(element("div", "screen-placeholder", "App preview"));
    }
    frame.append(screen);
    return frame;
  }

  const showcase = $("#hero-showcase");
  portfolio.projects.slice(0, 2).forEach((project, index) => {
    const phone = makePhone(
      project.screens && project.screens[0],
      `${project.title} app screenshot`,
      index === 0 ? "phone-front" : "phone-back",
      index === 0 ? "eager" : "lazy",
    );
    showcase.append(phone);
  });

  const projects = $("#projects");
  portfolio.projects.forEach((project) => {
    const article = element("article", "project-row");
    const gallery = element("div", "project-gallery");
    (project.screens || []).slice(0, 2).forEach((src, index) => {
      const link = element(
        "a",
        `project-phone-link ${index === 1 ? "phone-secondary" : ""}`,
      );
      link.href = safeUrl(project.link);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.tabIndex = -1;
      link.setAttribute("aria-hidden", "true");
      link.append(makePhone(src, "", "", "lazy"));
      gallery.append(link);
    });
    if (!project.screens || !project.screens.length)
      gallery.append(makePhone(null, "", "", "lazy"));

    const details = element("div", "project-details");
    const eyebrow = element("p", "project-category", project.category);
    const title = element("h3");
    title.append(
      externalLink(project.title, safeUrl(project.link), "project-title-link"),
    );
    const description = element(
      "p",
      "project-description",
      project.description,
    );
    const tags = element("p", "project-tags", project.label);
    const year = element("p", "project-year", project.year);
    details.append(eyebrow, title, description, tags, year);
    article.append(gallery, details);
    projects.append(article);
  });

  portfolio.experience.forEach((item) => {
    const row = element("article", "timeline-item");
    const heading = element("div", "timeline-heading");
    const title = element("h3");
    title.append(document.createTextNode(`${item.role} at ${item.company}`));
    if (item.link)
      title.append(
        document.createTextNode(" "),
        externalLink(
          "View LinkedIn post ↗",
          safeUrl(item.link),
          "experience-link",
        ),
      );
    heading.append(title, element("time", "timeline-date", item.date));
    const detail = element("p", "timeline-detail", item.detail);
    row.append(heading, detail);
    $("#experience-list").append(row);
  });

  const languageList = $("#languages");
  languageList.append(element("span", "language-heading", "Languages"));
  portfolio.languages.forEach((language) =>
    languageList.append(element("span", "language-item", language)),
  );

  portfolio.certificates.forEach((certificate) =>
    $("#certificates").append(
      externalLink(
        `${certificate.name} ↗`,
        safeUrl(certificate.url),
        "certificate-link",
      ),
    ),
  );
  const contacts = $("#contact-links");
  contacts.append(
    externalLink(
      "Email me ↗",
      safeUrl(`mailto:${portfolio.email}`, ["mailto:"]),
      "button button-primary",
    ),
  );
  contacts.append(
    externalLink("GitHub ↗", safeUrl(portfolio.github), "contact-link"),
  );
  contacts.append(
    externalLink("LinkedIn ↗", safeUrl(portfolio.linkedin), "contact-link"),
  );
  contacts.append(
    externalLink(
      "Call ↗",
      safeUrl(`tel:${portfolio.phone.replace(/\s/g, "")}`, ["tel:"]),
      "contact-link",
    ),
  );
})();
