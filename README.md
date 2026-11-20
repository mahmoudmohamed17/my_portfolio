# Mahmoud Mohamed — Flutter developer

A responsive, static portfolio for Mahmoud Mohamed. The site uses plain HTML,
CSS, and JavaScript with no build step or runtime dependencies. GitHub Pages
publishes the repository root through the workflow in `.github/workflows/deploy.yml`.

## Project structure

- `index.html`, `experience.html`, `skills.html`, `about.html`, and
  `contact.html` are the portfolio's separate pages. Each page shares the same
  navigation and theme bootstrap.
- `content.js` is the single source of truth for profile text, skills,
  experience, projects, screenshot paths, certificates, and contact details.
- `script.js` renders page content safely and handles the shared theme toggle,
  project details, and contact form.
- `styles.css` contains theme tokens, layout, phone frames, and responsive rules.
- `assets/projects/` contains the project screenshots used in the portfolio
  frames.
- `assets/Mahmoud-Mohamed-CV.pdf` is the downloadable CV linked from the home
  page.

## Edit portfolio content

Update `content.js`; the page renders profile details and project data from
that file. Keep project descriptions factual and add links only when they are
available. Project metadata such as category, year, and technology label is
also stored there.

## Add project screenshots

1. Export screenshots as WebP and place them in `assets/projects/`.
2. Use a descriptive filename, for example `myapp-home.webp`.
3. Add the relative path to that project's `screens` array in `content.js`.
   The first screenshot is used in its project card and dialog. The current
   design displays one screenshot per project; the home hero illustration is
   `assets/home.jpg`.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static file
server. The theme toggle persists its choice across pages in local storage;
clear the `portfolio-theme` entry to restore system preference.

## GitHub Pages deployment

The workflow deploys the repository root to GitHub Pages after pushes to
`main`, and supports manual runs. In **Settings → Pages**, choose **GitHub
Actions** as the build and deployment source. No build command or repository
secret is required.
