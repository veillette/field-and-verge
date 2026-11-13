const weeds = [
  {
    id: "taraxacum-officinale", name: "Common dandelion", color: "Yellow flowers", life: "Perennial",
    summary: "Toothed leaves, a yellow flower head on each bare stalk, and a familiar white puffball.",
    clues: ["Deeply toothed leaves form a flat rosette. The teeth often point back toward the base.", "Each hollow, leafless stalk carries one yellow flower head.", "Mature fruits carry fine white hairs that form a round seed head."],
    habitat: "Lawns, roadsides, garden beds, and disturbed soil.",
    compare: "Cat’s ear can look similar. Check for hairy leaves and flower stalks that branch. Dandelion flower stalks are unbranched.",
    fact: "Each yellow head is a cluster of many tiny flowers. The white parachutes that follow carry individual dry fruits, each containing a seed."
  },
  {
    id: "trifolium-repens", name: "White clover", color: "White flowers", life: "Perennial",
    summary: "Three rounded leaflets with pale chevrons and ball-shaped clusters of white flowers.",
    clues: ["Each leaf usually has three oval leaflets, often marked with a pale V.", "Rounded flower heads are made of tiny white or pink-tinged flowers.", "Creeping stems spread across the soil and root at the joints."],
    habitat: "Lawns, paths, pastures, and other sunny openings.",
    compare: "Yellow woodsorrel also has three leaflets. Its leaflets are distinctly heart-shaped, and its flowers are yellow with five petals.",
    fact: "Bacteria in nodules on clover roots convert nitrogen gas into compounds the plant can use."
  },
  {
    id: "plantago-major", name: "Broadleaf plantain", color: "Greenish flowers", life: "Perennial",
    summary: "A low rosette of broad, strongly ribbed leaves with narrow upright seed spikes.",
    clues: ["Broad oval leaves spread outward from one central point.", "Several prominent veins run lengthwise from the base of each leaf.", "Tiny greenish flowers are packed along long, nearly leafless spikes."],
    habitat: "Compacted lawns, paths, and pavement edges.",
    compare: "Buckhorn plantain has much narrower, lance-shaped leaves and a short, dense flower head at the tip of a long stalk.",
    fact: "The seeds become sticky when wet, which can help them travel on footwear or animal feet."
  },
  {
    id: "glechoma-hederacea", name: "Ground ivy", alias: "creeping Charlie", color: "Purple flowers", life: "Perennial",
    summary: "Scalloped, kidney-shaped leaves on trailing stems with small purple flowers.",
    clues: ["Rounded or kidney-shaped leaves grow in opposite pairs, with softly scalloped edges.", "Square stems creep along the ground and root at the nodes.", "Small lavender-blue, two-lipped flowers appear near leaf joints."],
    habitat: "Moist, partly shaded lawns, garden edges, and open woodland.",
    compare: "Henbit has upright flowering stems and upper leaves that clasp them. Ground ivy leaves have stalks and grow along trailing runners.",
    fact: "Ground ivy belongs to the mint family and has an aromatic scent when the leaves are crushed."
  },
  {
    id: "viola-sororia", name: "Common blue violet", alias: "wild violet", color: "Purple flowers", life: "Perennial",
    summary: "Heart-shaped leaves and five-petaled violet flowers, each on its own slender stalk.",
    clues: ["Look for heart-shaped leaves with gently scalloped edges.", "Leaves and flower stalks rise directly from the base.", "The lower petal commonly shows dark veins near its base."],
    habitat: "Lawns, woodland edges, and moist, partly shaded ground.",
    compare: "Ground ivy has rounded leaves on creeping stems. Violet leaves rise from the base on individual stalks.",
    fact: "This native violet also produces small, closed flowers that can self-pollinate and set seed."
  },
  {
    id: "digitaria-sanguinalis", name: "Large crabgrass", alias: "hairy crabgrass", color: "Grasses", life: "Summer annual",
    summary: "A sprawling grass with hairy leaves and several narrow seed spikes that spread like fingers.",
    clues: ["Stems spread outward and sometimes root at lower joints.", "Look closely for hairs on the leaf blades and leaf sheaths.", "Several slender seed-bearing branches radiate near the tip of a stem."],
    habitat: "Sunny lawns, garden beds, and disturbed ground, especially in warm weather.",
    compare: "Smooth crabgrass has much less hair on its leaf blades. Check the blades and sheaths together.",
    fact: "Large crabgrass starts from seed in warm weather and completes its life cycle in one growing season."
  },
  {
    id: "lamium-amplexicaule", name: "Henbit", color: "Purple flowers", life: "Winter annual",
    summary: "Pink-purple tubular flowers above rounded upper leaves that clasp a square stem.",
    clues: ["Upper leaves wrap around the stem and have rounded, scalloped edges.", "The stem is square, a common feature of the mint family.", "Slender pink-purple flowers project above the upper leaves."],
    habitat: "Garden beds, fields, and open patches of lawn, especially in early spring.",
    compare: "Purple deadnettle usually has triangular upper leaves on short stalks, often with a purplish tint. Henbit’s rounded upper leaves clasp the stem.",
    fact: "Henbit often germinates in fall, survives winter as a small plant, and flowers early the following spring."
  },
  {
    id: "portulaca-oleracea", name: "Common purslane", color: "Yellow flowers", life: "Summer annual",
    summary: "Smooth, fleshy leaves and reddish stems that spread flat across bare soil.",
    clues: ["Thick, smooth, paddle-shaped leaves cluster near the ends of the stems.", "The juicy stems often have a reddish color and form low mats.", "Small yellow flowers appear among the leaves."],
    habitat: "Sunny vegetable beds, sidewalk cracks, and other warm, disturbed ground.",
    compare: "Spotted spurge also forms low mats. Its leaves are thinner, and broken stems release milky sap. Purslane has noticeably fleshy leaves.",
    fact: "Purslane can change how it takes up carbon dioxide during drought, using a water-saving pathway common among succulent plants."
  }
];

const colors = {
  "Yellow flowers": "#f4c853",
  "White flowers": "#fffdf3",
  "Purple flowers": "#a58bc5",
  "Greenish flowers": "#b0c18a",
  Grasses: "#7e9d62"
};
const filters = ["All weeds", ...Object.keys(colors)];
const source = id => "https://plants.ces.ncsu.edu/plants/" + id + "/";
const slugName = weed => weed.id.replaceAll("-", " ");
const swatch = color => colors[color] ? `<span class="swatch" style="--swatch:${colors[color]}" aria-hidden="true"></span>` : "";
const tag = weed => `<span class="tag">${swatch(weed.color)}${weed.life}</span>`;

const cards = document.querySelector("#cards");
const search = document.querySelector("#search");
const filterGroup = document.querySelector("#filters");
const dialog = document.querySelector("#profile");
const details = document.querySelector("#details");
const close = document.querySelector("#close");
let selected = "All weeds";

function render() {
  const terms = search.value.trim().toLowerCase().replaceAll(/[‐‑–—]/g, "-").split(/\s+/).filter(Boolean);
  const visible = weeds.filter(weed => {
    const searchable = [slugName(weed), weed.name, weed.alias, weed.life, weed.color, weed.summary, weed.habitat, ...weed.clues].join(" ").toLowerCase();
    return (selected === "All weeds" || selected === weed.color) && terms.every(term => searchable.includes(term));
  });
  for (const button of filterGroup.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === selected));
  }
  document.querySelector("#count").textContent = `${visible.length} species`;
  document.querySelector("#empty").hidden = visible.length !== 0;
  cards.innerHTML = visible.map(weed => `
    <article class="card">
      <div class="card-photo"><img src="${photos[weed.id][0].file}" alt="${weed.name}" loading="lazy">${tag(weed)}</div>
      <div class="card-body">
        <h3>${weed.name}</h3><p class="scientific">${slugName(weed).replace(/^./, character => character.toUpperCase())}</p>
        <p class="summary">${weed.summary}</p>
        <button class="open" data-id="${weed.id}" aria-label="View profile for ${weed.name}">View profile <span aria-hidden="true">↗</span></button>
      </div>
    </article>`).join("");
}

function show(content) {
  details.innerHTML = `<div class="profile-content">${content}</div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  close.focus();
}

function photoCredit(photo) {
  return `${photo.author} · <a href="${photo.licenseURL}">${photo.license}</a>`;
}

function profile(weed) {
  show(`
    ${tag(weed)}
    <h2 id="profile-title">${weed.name}</h2>
    <p class="scientific">${slugName(weed).replace(/^./, character => character.toUpperCase())}</p>
    <div class="gallery">${photos[weed.id].slice(0, 2).map(photo => `
      <figure><img src="${photo.file}" alt="${weed.name}: ${photo.label}"><figcaption>${photo.label} · ${photoCredit(photo)}</figcaption></figure>`).join("")}</div>
    <h3>Look for</h3><ul>${weed.clues.map(clue => `<li>${clue}</li>`).join("")}</ul>
    <h3>Where it grows</h3><p>${weed.habitat}</p>
    <h3>Look-alikes</h3><p>${weed.compare}</p>
    <div class="fact"><h3>Did you know?</h3><p>${weed.fact}</p></div>
    <a href="${source(weed.id)}">More photos and botanical details from NC State Extension ↗</a>`);
}

filterGroup.innerHTML = filters.map(filter => `<button class="filter" type="button" data-filter="${filter}" aria-pressed="false">${swatch(filter)}${filter}</button>`).join("");
filterGroup.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (button) {
    selected = button.dataset.filter;
    render();
  }
});
search.addEventListener("input", render);
document.querySelector("#reset").addEventListener("click", () => {
  search.value = "";
  selected = "All weeds";
  render();
  search.focus();
});
cards.addEventListener("click", event => {
  const button = event.target.closest(".open");
  if (button) profile(weeds.find(weed => weed.id === button.dataset.id));
});
close.addEventListener("click", () => dialog.close());
document.querySelector("#credits").addEventListener("click", () => {
  show(`<h2 id="profile-title">Photo credits</h2><p>Photographs sourced from the NC State Extension Gardener Plant Toolbox. Images have been resized and may appear cropped on the main page.</p>
    ${weeds.map(weed => `<h3><a href="${source(weed.id)}">${weed.name}</a></h3><ul>
    ${photos[weed.id].map(photo => `<li><a href="${photo.file}">${photo.label}</a> · ${photoCredit(photo)}</li>`).join("")}</ul>`).join("")}`);
});
render();
