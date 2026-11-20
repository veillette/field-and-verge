import assert from "node:assert/strict";
import { statSync } from "node:fs";
import test from "node:test";
import { colors, scientificName, searchWeeds } from "../dist/catalog.js";
import { photos } from "../dist/photos.js";
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

test("photo metadata covers every profile and each credited image exists", () => {
  assert.deepEqual(Object.keys(photos).sort(), weeds.map(weed => weed.id).sort());
  for (const [id, gallery] of Object.entries(photos)) {
    assert.ok(Array.isArray(gallery) && gallery.length, `${id}: no photos`);
    for (const photo of gallery) {
      for (const field of ["label", "author", "license"]) assertText(photo[field], `${id}: ${field}`);
      assert.match(photo.licenseURL, /^https?:\/\//, `${id}: invalid license URL`);
      assert.match(photo.file, /^images\/[a-z0-9-]+\.webp$/, `${id}: invalid image path`);
      const image = statSync(new URL(`../dist/${photo.file}`, import.meta.url), { throwIfNoEntry: false });
      assert.ok(image?.isFile() && image.size > 0, `${id}: missing or empty ${photo.file}`);
    }
  }
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
