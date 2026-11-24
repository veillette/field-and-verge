# Field & Verge — Kentucky lawn & garden weeds

A photo field guide to common Kentucky lawn and garden weeds. Profiles include identification marks, habitats, look-alikes, and natural history. Photo credits and licenses appear in each profile and in the guide's footer.

Use **Copy profile link** to share a plant. In the built site, open **Install for offline use** and wait for the ready message to use the guide and its photos offline. The build generates the offline file list and cache version from the deployment files.

## Check, build, and preview

Use Node.js 26 and Python 3.

```sh
npm ci
npm run check
npm run build
python3 -m http.server 8000 --directory _site
```

The Pages workflow runs the deployment smoke test against `_site/`. Run `node .github/site-smoke.mjs _site --assets-only` to check the offline file list locally.

## Project layout

- `dist/weeds.js` holds plant profiles and their photo credits. Add the profile and its `photos` in the same record.
- Put each WebP in `dist/images/` under `<plant-id>-<photo-number>.webp`. Each photo number identifies its file and stays the same if you reorder the gallery. The first photo supplies the card image. Keep the label, creator, license name, and license URL with each photo.
- `dist/catalog.js` handles search and categories. `dist/guide.js` wires them to the catalog controls.
- `dist/index.html` contains the page and reusable plant templates. `dist/plant-view.js` fills those templates and opens the profile and credit dialogs.
- `dist/style.css` groups responsive styles by page section.

## Checks

Use Node.js 26. Run `npm test` for the catalog, photo, and search checks. To run the browser checks against the GitHub Pages build:

```sh
npm ci
npx playwright install --only-shell chromium
npm run build
npm run test:browser
```

The browser suite covers phone, tablet, and desktop layouts, including search, filtering, touch controls, and profile dialogs.

## Deploy

In **Settings → Pages**, set the publishing source to **GitHub Actions**. The workflow runs the checks and build on pull requests and pushes to `main`. Successful builds from `main` deploy to GitHub Pages. You can also run the workflow manually from **Actions**.

To preview the deployment build locally, including offline support, run `npm run build` and serve `_site/` in place of `dist/`. The build versions the styles and scripts together based on their contents.
