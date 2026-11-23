import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeServiceWorker } from "./build-worker.js";

const source = fileURLToPath(new URL("../dist/", import.meta.url));
const output = fileURLToPath(new URL("../_site/", import.meta.url));
const assets = readdirSync(source)
  .filter(file => file.endsWith(".js") || file.endsWith(".css"))
  .sort()
  .map(file => ({ file, content: readFileSync(join(source, file)) }));

// Give all modules one versioned directory so relative imports stay in the same release.
const hash = createHash("sha256");
for (const { file, content } of assets) {
  hash.update(file).update("\0").update(content).update("\0");
}
const assetPath = `assets/${hash.digest("hex").slice(0, 16)}`;
const html = readFileSync(join(source, "index.html"), "utf8")
  .replace('href="style.css"', `href="${assetPath}/style.css"`)
  .replace('src="guide.js"', `src="${assetPath}/guide.js"`)
  .replace('<script src="copy-link.js" defer></script>',
    `<script src="${assetPath}/copy-link.js" defer></script>\n  <script src="${assetPath}/pwa.js" defer></script>`);

rmSync(output, { recursive: true, force: true });
mkdirSync(join(output, assetPath), { recursive: true });
for (const { file, content } of assets) {
  writeFileSync(join(output, assetPath, file), content);
}
for (const name of ["images", "icons", "manifest.webmanifest"]) {
  cpSync(join(source, name), join(output, name), { recursive: true });
}
writeFileSync(join(output, "index.html"), html);
await writeServiceWorker(output);
