# Field & Verge

A photo field guide to common Kentucky lawn and garden weeds. Profiles include identification marks, habitats, look-alikes, and natural history. Photo credits and licenses appear in each profile and in the guide's footer.

## Run locally

From the repository root, run `python3 -m http.server --directory dist 8000` and open http://localhost:8000.

## Maintain the catalog

Add plant profiles to `dist/weeds.js`, matching photo credits to each plant ID in `dist/photos.js` and storing the WebP files in `dist/images/`. Run `npm test` with Node.js 24 to check profile data, photo references and credits, and search behavior. There are no npm dependencies to install.

## Deploy

In **Settings → Pages**, set the publishing source to **GitHub Actions**. The workflow runs the checks and build on pull requests and pushes to `main`. Successful builds from `main` deploy to GitHub Pages. You can also run the workflow manually from **Actions**.

To preview the deployment build locally, run `npm run build` and serve `_site/` in place of `dist/`. The build versions the styles and scripts together based on their contents.
