import assert from "node:assert/strict";
import test from "node:test";
import { weedsById } from "../dist/catalog.js";
import { plantFromSearch, plantLink } from "../dist/plant-links.js";

test("profile links keep their query parameter and resolve under a Pages subpath", () => {
  const id = "taraxacum-officinale";
  const expected = weedsById.get(id);
  assert.ok(expected);
  assert.equal(plantLink(id), "?plant=taraxacum-officinale");
  const url = new URL(plantLink(id), "https://example.github.io/field-and-verge/?old=value");
  assert.equal(url.pathname, "/field-and-verge/");
  assert.equal(plantFromSearch(url.search), expected);
  assert.equal(plantFromSearch("?plant=taraxacum%2Dofficinale"), expected);
});

test("missing, malformed and obsolete plant IDs do not resolve", () => {
  for (const search of ["", "?other=taraxacum-officinale", "?plant=", "?plant=%ZZ", "?plant=retired-plant"]) {
    assert.equal(plantFromSearch(search), undefined, search);
  }
});
