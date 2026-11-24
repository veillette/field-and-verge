# Working on Field & Verge

Field & Verge is a photo field guide to common Kentucky lawn and garden weeds.

- Edit the checked-in site in `dist/`. `npm run build` creates `_site/` for deployment.
- Add a plant and its photo credits together in `dist/weeds.js`. Put the WebPs
  in `dist/images/` as `<plant-id>-<photo-number>.webp`. Keep each photo number
  with its credit when reordering photos. The first photo appears on the card.
- Keep plant IDs stable because profile links use them. Search, filter choices,
  image paths and result counts come from the catalog. Keep the hero selection
  explicit in `dist/index.html`.
- Keep each photo's label, creator, license name and license URL. Validate new
  or changed profiles and inspect the associated images in the browser.
- Use Node.js 26. Run `npm ci`, `npm run check`, `npm run build`, and
  `node .github/site-smoke.mjs _site --assets-only`. Run `npm run test:browser`
  after installing Chromium with `npx playwright install --only-shell chromium`.
- The README explains the deployment preview and the offline build.
- Shared Pages helpers come from Origami; see Origami's README and
  `tools/sync-site-helpers.mjs`.
