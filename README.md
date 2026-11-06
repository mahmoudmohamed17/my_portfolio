# Mahmoud Mohamed — Flutter developer

A responsive, static portfolio for Mahmoud Mohamed. The site uses plain HTML,
CSS, and JavaScript with no build step or runtime dependencies. GitHub Pages
publishes the repository root through the workflow in `.github/workflows/deploy.yml`.

## Project structure

- `index.html` contains the page structure, SEO metadata, theme bootstrap, and
  no-JavaScript contact fallback.
- `content.js` is the single source of truth for profile text, skills,
  experience, projects, screenshot paths, certificates, and contact details.
- `script.js` renders content safely and handles the theme toggle.
- `styles.css` contains theme tokens, layout, phone frames, and responsive rules.
- `assets/projects/` contains the WebP screenshots used in the project phone
  frames.

## Edit portfolio content

Update `content.js`; the page renders profile details and project data from
that file. Keep project descriptions factual and add links only when they are
available. Project metadata such as category, year, and technology label is
also stored there.

## Add project screenshots

1. Export screenshots as WebP and place them in `assets/projects/`.
2. Use descriptive filenames, for example `myapp-1-home.webp` and
   `myapp-2-settings.webp`.
3. Add the relative paths to that project's `screens` array in `content.js`.
   The first screenshot is used for the high-priority hero preview; remaining
   screenshots load lazily. If no screenshot is supplied, a styled placeholder
   is shown.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static file
server. The theme toggle persists its choice in local storage; clear the
`portfolio-theme` entry to restore system preference.

## GitHub Pages deployment

The workflow deploys the repository root to GitHub Pages after pushes to
`main`, and supports manual runs. In **Settings → Pages**, choose **GitHub
Actions** as the build and deployment source. No build command or repository
secret is required.
