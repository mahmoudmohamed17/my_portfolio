# Mahmoud Mohamed — Portfolio

A responsive, static portfolio site for Mahmoud Mohamed, a Flutter developer. It features his portrait, internships, mobile app projects, skills, certificates, and contact links. It has no build step or runtime dependencies.

## Personalize the content

Portfolio details are stored in `content.js`. The portrait is `assets/mahmoud-mohamed.jpg`.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static file server.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` deploys the root of the repository to GitHub Pages after every push to `main`, and supports manual runs.

1. Push this repository to GitHub with the default branch named `main`.
2. In **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
3. The first deployment will publish the site; subsequent pushes to `main` trigger deployment automatically.

No build command or repository secret is needed for this static site.
