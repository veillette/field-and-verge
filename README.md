# Field & Verge

A photo field guide to common Kentucky lawn and garden weeds. Profiles include identification marks, habitats, look-alikes, and natural history. Photo credits and licenses appear in each profile and in the guide's footer.

## Run locally

From the repository root, run `python3 -m http.server --directory dist 8000` and open http://localhost:8000. The site runs in the browser without a package install.

## Project layout

- `dist/weeds.js` holds plant profiles. For each new profile, add matching credits under the same plant ID in `dist/photos.js` and WebP files in `dist/images/`.
- `dist/catalog.js` handles search and categories. `dist/guide.js` wires them to the catalog controls.
- `dist/index.html` contains the page and reusable plant templates. `dist/plant-view.js` fills those templates and opens the profile and credit dialogs.
- `dist/style.css` groups responsive styles by page section.

## Checks

Use Node.js 24. Run `npm test` for the catalog, photo, and search checks. To run the browser checks against the GitHub Pages build:

```sh
npm ci
npx playwright install --only-shell chromium
npm run build
npm run test:browser
```

The browser suite covers phone, tablet, and desktop layouts, including search, filtering, touch controls, and profile dialogs.

## Deploy

In **Settings → Pages**, set the publishing source to **GitHub Actions**. The workflow runs the checks and build on pull requests and pushes to `main`. Successful builds from `main` deploy to GitHub Pages. You can also run the workflow manually from **Actions**.

To preview the deployment build locally, run `npm run build` and serve `_site/` in place of `dist/`. The build versions the styles and scripts together based on their contents.
