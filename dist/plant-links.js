import { weedsById } from "./catalog.js";

const PLANT_PARAM = "plant";

export function plantLink(id) {
  return "?" + new URLSearchParams({ [PLANT_PARAM]: id });
}

export function plantFromSearch(search) {
  const id = new URLSearchParams(search).get(PLANT_PARAM);
  return weedsById.get(id);
}
