import { allWeeds, colors, scientificName, searchWeeds, weedsById } from "./catalog.js";
import { photos } from "./photos.js";
import { weeds } from "./weeds.js";

const filters = [allWeeds, ...Object.keys(colors)];
const source = id => "https://plants.ces.ncsu.edu/plants/" + encodeURIComponent(id) + "/";
const htmlEntities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = text => text.replace(/[&<>"']/g, character => htmlEntities[character]);

function swatch(color) {
  return Object.hasOwn(colors, color)
    ? `<span class="swatch" style="--swatch:${colors[color]}" aria-hidden="true"></span>`
    : "";
}

function tag(weed) {
  return `<span class="tag">${swatch(weed.color)}${escapeHtml(weed.life)}</span>`;
}

const cards = document.querySelector("#cards");
const search = document.querySelector("#search");
const filterGroup = document.querySelector("#filters");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const dialog = document.querySelector("#profile");
const details = document.querySelector("#details");
let selected = allWeeds;

function renderCard(weed) {
  const id = escapeHtml(weed.id);
  const name = escapeHtml(weed.name);
  const photo = photos[weed.id][0];
  return `
    <article class="card" data-id="${id}">
      <div class="card-photo"><img src="${escapeHtml(photo.file)}" alt="${name}: ${escapeHtml(photo.label)}" loading="lazy">${tag(weed)}</div>
      <div class="card-body">
        <h3>${name}</h3><p class="scientific">${escapeHtml(scientificName(weed.id))}</p>
        <p class="summary">${escapeHtml(weed.summary)}</p>
        <button type="button" class="open" aria-label="View profile for ${name}">View profile <span aria-hidden="true">↗</span></button>
      </div>
    </article>`;
}

function updateResults() {
  const visible = new Set(searchWeeds(search.value, selected).map(weed => weed.id));
  for (const card of cards.children) {
    card.hidden = !visible.has(card.dataset.id);
  }
  for (const button of filterGroup.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === selected));
  }
  const resultCount = `${visible.size} species`;
  if (count.textContent !== resultCount) count.textContent = resultCount;
  empty.hidden = visible.size !== 0;
}

function show(content) {
  details.innerHTML = `<div class="profile-content">${content}</div>`;
  dialog.showModal();
  details.scrollTop = 0;
}

function photoCredit(photo) {
  return `${escapeHtml(photo.author)} · <a href="${escapeHtml(photo.licenseURL)}">${escapeHtml(photo.license)}</a>`;
}

function profile(weed) {
  const name = escapeHtml(weed.name);
  show(`
    ${tag(weed)}
    <h2 id="profile-title">${name}</h2>
    <p class="scientific">${escapeHtml(scientificName(weed.id))}</p>
    <div class="gallery">${photos[weed.id].map(photo => `
      <figure><img src="${escapeHtml(photo.file)}" alt="${name}: ${escapeHtml(photo.label)}"><figcaption>${escapeHtml(photo.label)} · ${photoCredit(photo)}</figcaption></figure>`).join("")}</div>
    <h3>Look for</h3><ul>${weed.clues.map(clue => `<li>${escapeHtml(clue)}</li>`).join("")}</ul>
    <h3>Where it grows</h3><p>${escapeHtml(weed.habitat)}</p>
    <h3>Look-alikes</h3><p>${escapeHtml(weed.compare)}</p>
    <div class="fact"><h3>Did you know?</h3><p>${escapeHtml(weed.fact)}</p></div>
    <a href="${source(weed.id)}">More photos and botanical details from NC State Extension ↗</a>`);
}

cards.innerHTML = weeds.map(renderCard).join("");
filterGroup.innerHTML = filters.map(filter => `<button class="filter" type="button" data-filter="${filter}" aria-pressed="false">${swatch(filter)}${filter}</button>`).join("");

filterGroup.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (button) {
    selected = button.dataset.filter;
    updateResults();
  }
});
search.addEventListener("input", updateResults);
document.querySelector("#reset").addEventListener("click", () => {
  search.value = "";
  selected = allWeeds;
  updateResults();
  search.focus();
});
cards.addEventListener("click", event => {
  const button = event.target.closest(".open");
  if (button) profile(weedsById.get(button.closest(".card").dataset.id));
});
document.querySelector("#credits").addEventListener("click", () => {
  show(`<h2 id="profile-title">Photo credits</h2><p>Photographs sourced from the NC State Extension Gardener Plant Toolbox. Images have been resized and may appear cropped on the main page.</p>
    ${weeds.map(weed => `<h3><a href="${source(weed.id)}">${escapeHtml(weed.name)}</a></h3><ul>
    ${photos[weed.id].map(photo => `<li><a href="${escapeHtml(photo.file)}">${escapeHtml(photo.label)}</a> · ${photoCredit(photo)}</li>`).join("")}</ul>`).join("")}`);
});
updateResults();
