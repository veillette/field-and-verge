import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname } from "node:path";
import test, { after, before } from "node:test";
import { chromium } from "playwright";
import { weedsById } from "../dist/catalog.js";
import { weeds } from "../dist/weeds.js";

const site = new URL("../_site/", import.meta.url);
const prefix = "/field-and-verge/";
const mediaTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
  if (request.url?.startsWith(prefix)) {
    const pathname = new URL(request.url, "http://localhost").pathname;
    const file = new URL(pathname.slice(prefix.length) || "index.html", site);
    const type = mediaTypes[extname(file.pathname)];
    if (file.href.startsWith(site.href) && type) {
      const content = await readFile(file).catch(() => null);
      if (content) {
        response.writeHead(200, { "Content-Type": type });
        response.end(content);
        return;
      }
    }
  }
  response.writeHead(404).end();
});

let browser;
let guideUrl;

before(async () => {
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  guideUrl = `http://127.0.0.1:${server.address().port}${prefix}`;
});

after(async () => {
  await browser?.close();
  if (server.listening) await new Promise(resolve => server.close(resolve));
});

const viewports = [
  { name: "small phone", width: 320, height: 568, touch: true, columns: 1 },
  { name: "phone", width: 390, height: 844, touch: true, columns: 1 },
  { name: "portrait tablet", width: 768, height: 1024, touch: true, columns: 2 },
  { name: "landscape tablet", width: 1024, height: 768, touch: true, columns: 3 },
  { name: "desktop", width: 1280, height: 800, touch: false, columns: 3 }
];

for (const { name, width, height, touch, columns } of viewports) {
  test(`field guide works on ${name} (${width} × ${height})`, { timeout: 30_000 }, async context => {
    const page = await browser.newPage({
      viewport: { width, height },
      isMobile: touch,
      hasTouch: touch,
      reducedMotion: "reduce"
    });
    context.after(() => page.close());
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.route("https://fonts.googleapis.com/**", route => route.abort());
    await page.goto(guideUrl);

    const search = page.getByRole("searchbox", { name: "Search by name or trait" });
    const filter = page.getByRole("combobox", { name: "Flower color or plant type" });
    const count = page.getByRole("status");
    await count.waitFor();
    assert.equal(await count.textContent(), `${weeds.length} species`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    const cardColumns = await page.locator(".card").evaluateAll(cards =>
      new Set(cards.slice(0, 3).map(card => card.offsetLeft)).size
    );
    assert.equal(cardColumns, columns);

    const searchBox = await search.boundingBox();
    const filterBox = await filter.boundingBox();
    for (const box of [searchBox, filterBox]) assert.ok(box.width >= 44 && box.height >= 44);
    if (columns === 1) {
      assert.ok(filterBox.y >= searchBox.y + searchBox.height);
    } else {
      assert.equal(filterBox.y, searchBox.y);
    }
    assert.equal(await search.evaluate(input => getComputedStyle(input).fontSize), "16px");

    await search.fill("shepherd's purse");
    assert.equal(await count.textContent(), "1 species");
    assert.ok(await page.getByRole("heading", { name: "Shepherd’s purse" }).isVisible());
    await filter.selectOption("Purple flowers");
    assert.equal(await count.textContent(), "0 species");
    assert.ok(await page.getByText("No matches.", { exact: false }).isVisible());
    const clear = page.getByRole("button", { name: "Clear search and filters" });
    if (touch) await clear.tap();
    else await clear.click();
    assert.equal(await count.textContent(), `${weeds.length} species`);
    assert.ok(await search.evaluate(input => input === document.activeElement));

    await search.fill("taraxacum officinale");
    const open = page.getByRole("button", { name: "View profile for Common dandelion" });
    if (touch) await open.tap();
    else await open.press("Enter");
    const profile = page.getByRole("dialog", { name: "Common dandelion" });
    await profile.waitFor();
    const images = profile.getByRole("img");
    assert.equal(await images.count(), weedsById.get("taraxacum-officinale").photos.length);
    await images.evaluateAll(images => Promise.all(images.map(image => image.decode())));
    const close = profile.getByRole("button", { name: "Close" });
    const closeBox = await close.boundingBox();
    assert.ok(closeBox.width >= 44 && closeBox.height >= 44);
    assert.ok(closeBox.x >= 0 && closeBox.x + closeBox.width <= width);
    assert.ok(closeBox.y >= 0 && closeBox.y + closeBox.height <= height);

    const scrolled = await profile.locator("#details").evaluate(body => {
      body.scrollTop = body.scrollHeight;
      return body.scrollTop;
    });
    assert.ok(scrolled > 0);
    assert.deepEqual(await close.boundingBox(), closeBox);
    if (touch) await close.tap();
    else await page.keyboard.press("Escape");
    assert.ok(await profile.isHidden());
    if (!touch) assert.ok(await open.evaluate(button => button === document.activeElement));

    await page.getByRole("button", { name: "Photo credits" }).click();
    const credits = page.getByRole("dialog", { name: "Photo credits" });
    assert.ok(await credits.isVisible());
    const photoCount = weeds.reduce((count, weed) => count + weed.photos.length, 0);
    assert.equal(await credits.getByRole("listitem").count(), photoCount);
    assert.deepEqual(errors, []);
  });
}

test("a copied profile opens with its photos while offline", { timeout: 30_000 }, async (t) => {
  const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  t.after(() => context.close());
  const page = await context.newPage();
  await page.goto(guideUrl);
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.locator(".card .open").first().click();
  await page.getByRole("button", { name: "Copy profile link" }).click();
  const link = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(new URL(link).searchParams.get("plant"), weeds[0].id);

  await context.setOffline(true);
  await page.goto(link);
  const profile = page.getByRole("dialog", { name: weeds[0].name });
  await profile.waitFor();
  await profile.locator(".gallery img").first().evaluate((image) => image.decode());
});
