import { allWeeds, categories, searchWeeds, weedsById } from "./catalog.js";
import { createCard, showCredits, showProfile } from "./plant-view.js";
import { weeds } from "./weeds.js";

const controls = document.querySelector("#catalog-controls");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const reset = document.querySelector("#reset");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const cards = document.querySelector("#cards");
const credits = document.querySelector("#credits");

category.add(new Option(allWeeds, allWeeds, true, true));
for (const color of categories) {
  category.add(new Option(color, color));
}
cards.replaceChildren(...weeds.map(createCard));

function updateResults() {
  const matches = searchWeeds(search.value, category.value);
  const visible = new Set(matches.map(weed => weed.id));
  for (const card of cards.children) {
    card.hidden = !visible.has(card.dataset.id);
  }

  const resultCount = `${matches.length} species`;
  if (count.textContent !== resultCount) count.textContent = resultCount;
  empty.hidden = matches.length > 0;
  reset.hidden = search.value === "" && category.value === allWeeds;
}

search.addEventListener("input", updateResults);
category.addEventListener("change", updateResults);
controls.addEventListener("submit", event => event.preventDefault());
reset.addEventListener("click", () => {
  search.value = "";
  category.value = allWeeds;
  updateResults();
  search.focus();
});
cards.addEventListener("click", event => {
  const button = event.target.closest(".open");
  if (button) showProfile(weedsById.get(button.closest(".card").dataset.id));
});
credits.addEventListener("click", showCredits);

updateResults();
controls.hidden = false;
credits.hidden = false;

const linkedPlant = weedsById.get(new URLSearchParams(location.search).get("plant"));
if (linkedPlant) showProfile(linkedPlant);
