import assert from "node:assert/strict";
import { readdirSync, statSync } from "node:fs";
import test from "node:test";
import { categories, colors, photoPath, scientificName, searchWeeds } from "../dist/catalog.js";
import { weeds } from "../dist/weeds.js";

function assertText(value, field) {
  assert.equal(typeof value, "string", field);
  assert.ok(value.trim(), field);
}

test("every profile has a unique ID, valid filter, and complete identification text", () => {
  assert.ok(weeds.length > 0);
  const ids = new Set();
  for (const weed of weeds) {
    assert.match(weed.id, /^[a-z]+(?:-[a-z]+)+$/);
    assert.ok(!ids.has(weed.id), `Duplicate profile: ${weed.id}`);
    ids.add(weed.id);
    assert.ok(Object.hasOwn(colors, weed.color), `${weed.id}: unknown category ${weed.color}`);
    for (const field of ["name", "life", "summary", "habitat", "compare", "fact"]) {
      assertText(weed[field], `${weed.id}: ${field}`);
    }
    assert.ok(Array.isArray(weed.clues) && weed.clues.length, `${weed.id}: no field marks`);
    for (const clue of weed.clues) assertText(clue, `${weed.id}: empty field mark`);
  }
});

test("photo credits map to unique, existing images without orphaned WebPs", () => {
  const images = new Set();
  for (const { id, photos } of weeds) {
    assert.ok(Array.isArray(photos) && photos.length, id + ": no photos");
    for (const photo of photos) {
      for (const field of ["label", "author", "license"]) assertText(photo[field], id + ": " + field);
      assert.match(photo.licenseURL, /^https?:\/\//, id + ": invalid license URL");
      assert.ok(Number.isSafeInteger(photo.number) && photo.number >= 0, id + ": invalid photo number");
      const file = photoPath(id, photo);
      assert.ok(!images.has(file), "Duplicate photo: " + file);
      images.add(file);
      const image = statSync(new URL("../dist/" + file, import.meta.url), { throwIfNoEntry: false });
      assert.ok(image?.isFile() && image.size > 0, id + ": missing or empty " + file);
    }
  }
  const assets = readdirSync(new URL("../dist/images/", import.meta.url))
    .filter(file => file.endsWith(".webp"))
    .map(file => "images/" + file);
  assert.deepEqual(new Set(assets), images);
});

test("filter choices cover the catalog and follow the palette order", () => {
  assert.deepEqual(new Set(categories), new Set(weeds.map(weed => weed.color)));
  assert.deepEqual(categories, Object.keys(colors).filter(color => categories.includes(color)));
});

test("search finds common, alternate, and scientific names", () => {
  assert.deepEqual(searchWeeds("SHEPHERD'S PURSE").map(weed => weed.id), ["capsella-bursa-pastoris"]);
  assert.deepEqual(searchWeeds("queen anne's lace").map(weed => weed.id), ["daucus-carota"]);
  assert.deepEqual(searchWeeds("Taráxacum–officinale").map(weed => weed.id), ["taraxacum-officinale"]);
  assert.equal(scientificName("taraxacum-officinale"), "Taraxacum officinale");
});

test("search combines traits with the selected category and keeps catalog order", () => {
  const purple = weeds.filter(weed => weed.color === "Purple flowers");
  assert.deepEqual(searchWeeds("", "Purple flowers"), purple);
  const heartShaped = searchWeeds("heart-shaped", "Purple flowers");
  assert.ok(heartShaped.some(weed => weed.id === "viola-sororia"));
  assert.ok(heartShaped.every(weed => weed.color === "Purple flowers"));
  assert.deepEqual(searchWeeds("heart shaped", "Purple flowers"), heartShaped);
  assert.deepEqual(searchWeeds("queen anne's lace", "Purple flowers"), []);
  assert.deepEqual(searchWeeds(""), weeds);
});
