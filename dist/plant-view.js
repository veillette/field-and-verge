import { colors, scientificName } from "./catalog.js";
import { photos } from "./photos.js";
import { weeds } from "./weeds.js";

const cardTemplate = document.querySelector("#card-template");
const profileTemplate = document.querySelector("#profile-template");
const photoTemplate = document.querySelector("#photo-template");
const creditsTemplate = document.querySelector("#credits-template");
const dialog = document.querySelector("#profile");
const title = document.querySelector("#profile-title");
const details = document.querySelector("#details");

function plantSource(id) {
  return `https://plants.ces.ncsu.edu/plants/${encodeURIComponent(id)}/`;
}

function fillPlantLabel(view, weed) {
  view.querySelector(".plant-life").textContent = weed.life;
  view.querySelector(".swatch").style.setProperty("--swatch-color", colors[weed.color]);
  view.querySelector(".scientific").textContent = scientificName(weed.id);
}

function fillPhoto(image, weed, photo) {
  image.src = photo.file;
  image.alt = `${weed.name}: ${photo.label}`;
}

function link(text, url) {
  const anchor = document.createElement("a");
  anchor.textContent = text;
  anchor.href = url;
  return anchor;
}

export function createCard(weed) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.id = weed.id;
  card.querySelector("h3").textContent = weed.name;
  card.querySelector(".summary").textContent = weed.summary;
  card.querySelector(".open").setAttribute("aria-label", `View profile for ${weed.name}`);
  fillPlantLabel(card, weed);
  fillPhoto(card.querySelector("img"), weed, photos[weed.id][0]);
  return card;
}

function showDialog(name, content) {
  title.textContent = name;
  details.replaceChildren(content);
  dialog.showModal();
  details.scrollTop = 0;
}

export function showProfile(weed) {
  const view = profileTemplate.content.cloneNode(true);
  fillPlantLabel(view, weed);
  view.querySelector(".habitat").textContent = weed.habitat;
  view.querySelector(".compare").textContent = weed.compare;
  view.querySelector(".fact-text").textContent = weed.fact;
  view.querySelector(".plant-source").href = plantSource(weed.id);

  const clues = view.querySelector(".clues");
  for (const clue of weed.clues) {
    const item = document.createElement("li");
    item.textContent = clue;
    clues.append(item);
  }

  const gallery = view.querySelector(".gallery");
  for (const photo of photos[weed.id]) {
    const figure = photoTemplate.content.cloneNode(true);
    fillPhoto(figure.querySelector("img"), weed, photo);
    figure.querySelector("figcaption").append(
      `${photo.label} · ${photo.author} · `, link(photo.license, photo.licenseURL)
    );
    gallery.append(figure);
  }

  showDialog(weed.name, view);
}

export function showCredits() {
  const view = creditsTemplate.content.cloneNode(true);
  const groups = view.querySelector(".credit-list");
  for (const weed of weeds) {
    const heading = document.createElement("h3");
    heading.append(link(weed.name, plantSource(weed.id)));

    const items = document.createElement("ul");
    for (const photo of photos[weed.id]) {
      const item = document.createElement("li");
      item.append(link(photo.label, photo.file), ` · ${photo.author} · `, link(photo.license, photo.licenseURL));
      items.append(item);
    }
    groups.append(heading, items);
  }

  showDialog("Photo credits", view);
}
