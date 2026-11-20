import { weeds } from "./weeds.js";

export const allWeeds = "All weeds";

export const colors = {
  "Yellow flowers": "#f4c853",
  "White flowers": "#fffdf3",
  "Purple flowers": "#a58bc5",
  "Orange flowers": "#e99957",
  "Blue flowers": "#749cc5",
  "White to pink flowers": "#e5bfd1",
  "Greenish flowers": "#b0c18a",
  Grasses: "#7e9d62",
  Sedges: "#a1ac55",
  "Spore-bearing": "#52847a"
};

export const weedsById = new Map(weeds.map(weed => [weed.id, weed]));

export function scientificName(id) {
  const name = id.replaceAll("-", " ");
  return name[0].toUpperCase() + name.slice(1);
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "")
    .replace(/['’]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

const searchIndex = weeds.map(weed => ({
  weed,
  text: normalize([
    scientificName(weed.id), weed.name, weed.alias, weed.life, weed.color,
    weed.summary, weed.habitat, ...weed.clues
  ].join(" "))
}));

export function searchWeeds(query, color = allWeeds) {
  const terms = normalize(query).split(" ").filter(Boolean);
  return searchIndex
    .filter(({ weed, text }) =>
      (color === allWeeds || weed.color === color) &&
      terms.every(term => text.includes(term))
    )
    .map(({ weed }) => weed);
}
