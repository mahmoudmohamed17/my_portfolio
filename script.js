const portfolio = window.PORTFOLIO;
const projects = document.querySelector("#projects");
const skills = document.querySelector("#skills");
const contact = document.querySelector("#contact-links");

projects.innerHTML = portfolio.projects.map((project) => `
  <article class="project-card ${project.tone}">
    <a class="project-art" href="${project.link}" target="_blank" rel="noreferrer" aria-label="View ${project.title} on GitHub">
      <span class="project-label">${project.label}</span><div class="project-shape"><span>${project.number}</span></div><span class="project-year">${project.year}</span>
      <span class="project-open" aria-hidden="true">↗</span>
    </a>
    <div class="project-info"><div><p class="mini-label">${project.category}</p><h3><a href="${project.link}" target="_blank" rel="noreferrer">${project.title}</a></h3></div><span class="project-arrow" aria-hidden="true">↗</span><p class="project-description">${project.description}</p></div>
  </article>`).join("");

skills.innerHTML = portfolio.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join("");
document.querySelector("#summary").textContent = portfolio.summary;
document.querySelector("#languages").innerHTML = `<span class="mini-label">LANGUAGES</span><br>${portfolio.languages.join("<br>")}`;
document.querySelector("#experience").innerHTML = portfolio.experience.map((item) => `
  <article class="timeline-item"><div class="timeline-marker"></div><div class="timeline-heading"><div><h3>${item.role}${item.link ? ` · <a href="${item.link}" target="_blank" rel="noreferrer">${item.company} ↗</a>` : ` · ${item.company}`}</h3><p>${item.detail}</p></div><span class="timeline-date">${item.date}</span></div></article>`).join("");
document.querySelector("#certificates").innerHTML = portfolio.certificates.map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer">${item.name}<span aria-hidden="true">↗</span></a>`).join("");
contact.innerHTML = [
  `<a class="button button-dark" href="mailto:${portfolio.email}">Email me <span aria-hidden="true">↗</span></a>`,
  `<a class="social-link" href="tel:${portfolio.phone.replace(/\s/g, "")}">Call <span aria-hidden="true">↗</span></a>`,
  `<a class="social-link" href="${portfolio.linkedin}" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>`,
  `<a class="social-link" href="${portfolio.github}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>`
].join("");
document.querySelector("#year").textContent = new Date().getFullYear();
