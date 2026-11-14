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
  },
  {
    "id": "lamium-purpureum",
    "name": "Purple deadnettle",
    "alias": "red deadnettle",
    "color": "Purple flowers",
    "life": "Winter annual",
    "summary": "Look for purplish, triangular upper leaves and small pink-purple flowers on a square stem.",
    "clues": [
      "Upper leaves are stalked, crowded near the top, and often reddish purple.",
      "Leaves grow in opposite pairs and have scalloped edges.",
      "Two-lipped flowers emerge from the upper leaf joints."
    ],
    "habitat": "Lawns, garden beds, fields, and bare soil in early spring.",
    "compare": "Henbit's rounded upper leaves clasp the stem. Purple deadnettle's upper leaves have short stalks.",
    "fact": "“Deadnettle” refers to its resemblance to nettles and its lack of stinging hairs."
  },
  {
    "id": "capsella-bursa-pastoris",
    "name": "Shepherd’s purse",
    "alias": "shepherds purse",
    "color": "White flowers",
    "life": "Annual",
    "summary": "Tiny white flowers sit above flat, heart-shaped seed pods on a slender stalk.",
    "clues": [
      "Young leaves form a ground-level rosette with variable lobing.",
      "White flowers have four tiny petals.",
      "Flat, triangular pods have a notch at the broad end."
    ],
    "habitat": "Gardens, cultivated fields, and disturbed ground.",
    "compare": "Hairy bittercress also has tiny white flowers, but its seed pods are long and narrow.",
    "fact": "The seed pods resemble the small pouches once carried by shepherds."
  },
  {
    "id": "cardamine-hirsuta",
    "name": "Hairy bittercress",
    "alias": "shotweed",
    "color": "White flowers",
    "life": "Winter annual",
    "summary": "Round leaflets form a low rosette beneath tiny white flowers and upright, slender pods.",
    "clues": [
      "Basal leaves are divided into several rounded leaflets.",
      "Small white flowers have four petals.",
      "Slender upright pods rise above the foliage."
    ],
    "habitat": "Moist lawns, garden beds, and nursery containers in cool weather.",
    "compare": "Shepherd’s purse has broad, flat pods with a heart-shaped outline. Bittercress pods are straight and narrow.",
    "fact": "Ripe pods spring open when disturbed and fling their seeds away from the parent."
  },
  {
    "id": "veronica-persica",
    "name": "Persian speedwell",
    "alias": "birdseye speedwell",
    "color": "Blue flowers",
    "life": "Winter annual",
    "summary": "Low, spreading stems carry small blue flowers with dark veins and a pale center.",
    "clues": [
      "Rounded to oval leaves have coarsely toothed edges.",
      "Each flower has four unequal lobes and darker blue veins.",
      "Flowers emerge singly on slender stalks from upper leaf joints."
    ],
    "habitat": "Thin lawns, gardens, and disturbed soil in late winter and spring.",
    "compare": "Creeping speedwell often bears several smaller, paler flowers in a cluster. Persian speedwell flowers are solitary.",
    "fact": "Persian speedwell is also called bird’s-eye speedwell for the pale center of its blue flowers."
  },
  {
    "id": "plantago-lanceolata",
    "name": "Buckhorn plantain",
    "alias": "ribwort plantain",
    "color": "Greenish flowers",
    "life": "Perennial",
    "summary": "Long, strongly ribbed leaves surround bare stalks topped by short, dark flower spikes.",
    "clues": [
      "Narrow lance-shaped leaves grow in a rosette.",
      "Several strong veins run lengthwise along each leaf.",
      "Short, dense spikes often show a ring of pale anthers."
    ],
    "habitat": "Lawns, pastures, compacted paths, and roadsides.",
    "compare": "Broadleaf plantain has wide oval leaves and longer, more slender flowering spikes.",
    "fact": "The pale ring moves upward as flowers open in succession along the spike."
  },
  {
    "id": "rumex-crispus",
    "name": "Curly dock",
    "alias": "yellow dock",
    "color": "Greenish flowers",
    "life": "Perennial",
    "summary": "Wavy-edged leaves grow beneath tall flowering stalks that turn rusty brown.",
    "clues": [
      "Lower leaves are narrow and elongated with strongly wavy edges.",
      "A thin, papery sheath wraps the stem at the leaf joints.",
      "Dense clusters of greenish flowers mature into brown fruiting stalks."
    ],
    "habitat": "Roadsides, fields, and moist disturbed soil.",
    "compare": "Broadleaf dock has broader leaves with more rounded or heart-shaped bases.",
    "fact": "The dry brown fruit clusters often remain on upright stems well after the growing season."
  },
  {
    "id": "chenopodium-album",
    "name": "Common lambsquarters",
    "alias": "white goosefoot",
    "color": "Greenish flowers",
    "life": "Summer annual",
    "summary": "Look for irregularly toothed leaves and a whitish, powdery coating on young growth.",
    "clues": [
      "Lower leaves are often triangular to diamond-shaped.",
      "Young leaves and shoot tips may look dusted with flour.",
      "Tiny green flowers cluster along the upper stem."
    ],
    "habitat": "Vegetable beds, cultivated fields, and bare disturbed soil.",
    "compare": "Redroot pigweed lacks the pale mealy coating and develops dense, bristly flower spikes.",
    "fact": "The leaf outline gives the plant another common name, white goosefoot."
  },
  {
    "id": "euphorbia-maculata",
    "name": "Spotted spurge",
    "alias": "prostrate spurge",
    "color": "Greenish flowers",
    "life": "Summer annual",
    "summary": "Small opposite leaves, often with dark spots, form a flat mat on reddish stems.",
    "clues": [
      "Thin stems spread from a central root and hug the ground.",
      "Tiny oval leaves grow in opposite pairs and may have maroon blotches.",
      "Damaged stems release white, milky sap."
    ],
    "habitat": "Pavement cracks, sparse lawns, gravel, and hot garden edges.",
    "compare": "Common purslane has much thicker, succulent leaves and stems. The dark spots on spurge can be faint or absent.",
    "fact": "Its tiny flower-like structures are actually clusters of highly reduced flowers."
  },
  {
    "id": "cyperus-esculentus",
    "name": "Yellow nutsedge",
    "alias": "nutgrass",
    "color": "Sedges",
    "life": "Perennial",
    "summary": "Shiny yellow-green blades often rise above turf, with three rows of leaves and a triangular flowering stem.",
    "clues": [
      "Leaves are glossy, narrow, and taper to long points.",
      "The upright flowering stem is triangular in cross-section.",
      "Yellow-brown seed clusters form above several long, leaflike bracts."
    ],
    "habitat": "Moist lawns, irrigated beds, and poorly drained soil.",
    "compare": "True grasses usually have leaves in two ranks. On a flowering nutsedge shoot, look for a solid triangular stem and leaves in three ranks.",
    "fact": "Underground stems produce small tubers that store reserves and can sprout into new plants."
  },
  {
    "id": "poa-annua",
    "name": "Annual bluegrass",
    "alias": "Poa",
    "color": "Grasses",
    "life": "Usually annual",
    "summary": "Soft, light-green tufts have boat-shaped leaf tips and small, open seed heads.",
    "clues": [
      "The leaf tip curves inward like the bow of a boat.",
      "The plant forms low, pale-green tufts.",
      "Seed heads branch into a small, open spray."
    ],
    "habitat": "Lawns, compacted paths, and other moist or cool disturbed sites.",
    "compare": "Kentucky bluegrass also has boat-shaped leaf tips. It typically spreads by underground stems, while annual bluegrass usually forms tufts.",
    "fact": "Annual bluegrass can form seed heads even under closely mown turf."
  },
  {
    "id": "eleusine-indica",
    "name": "Goosegrass",
    "alias": "silver crabgrass",
    "color": "Grasses",
    "life": "Summer annual",
    "summary": "Flattened, whitish stems radiate from the center beneath fingerlike seed spikes.",
    "clues": [
      "Leaves and stems spread outward from a pale, compressed center.",
      "Several stiff spikes emerge near the tip of the seed stalk.",
      "Seeds are arranged in closely spaced rows along the spikes."
    ],
    "habitat": "Compacted turf, paths, parking edges, and sunny bare soil.",
    "compare": "Large crabgrass has hairy blades and sheaths. Goosegrass has a conspicuously flattened, often silvery base.",
    "fact": "The pale center explains the nickname silver crabgrass."
  },
  {
    "id": "setaria-viridis",
    "name": "Green foxtail",
    "alias": "bottle grass",
    "color": "Grasses",
    "life": "Summer annual",
    "summary": "Upright grass with a narrow, bristly seed head shaped like a small bottlebrush.",
    "clues": [
      "Seed heads are cylindrical and usually stand upright.",
      "Green or purplish bristles surround the spikelets.",
      "The ligule, where the blade meets the sheath, is a fringe of hairs."
    ],
    "habitat": "Cultivated beds, fields, roadsides, and sunny disturbed soil.",
    "compare": "Yellow foxtail has a coarser seed head and long hairs near the base of the upper surface of its leaf blade.",
    "fact": "The bristles remain on the head after the mature spikelets fall."
  },
  {
    "id": "allium-vineale",
    "name": "Wild garlic",
    "alias": "crow garlic",
    "color": "White to pink flowers",
    "life": "Perennial",
    "summary": "Slender, hollow leaves grow in clumps from underground bulbs and may look like grass.",
    "clues": [
      "Leaves are narrow and tubular, with a hollow center.",
      "Plants grow from small underground bulbs.",
      "Flowering stems often carry a cluster of small aerial bulbils."
    ],
    "habitat": "Lawns, pastures, roadsides, and fields in cool weather.",
    "compare": "Wild onion generally has flat, solid leaves. Check the leaf cross-section and the structure at the top of a flowering stalk.",
    "fact": "Its aerial bulbils can drop to the ground and grow into new plants."
  },
  {
    "id": "convolvulus-arvensis",
    "name": "Field bindweed",
    "alias": "creeping Jenny",
    "color": "White to pink flowers",
    "life": "Perennial",
    "summary": "Twining stems bear small arrow-shaped leaves and white or pale pink funnel flowers.",
    "clues": [
      "Leaves have two small lobes at the base, creating an arrowhead shape.",
      "White or pink flowers have a funnel-shaped corolla.",
      "Two small bracts sit on the flower stalk below the bloom."
    ],
    "habitat": "Sunny gardens, roadsides, cultivated fields, and disturbed soil.",
    "compare": "Hedge bindweed usually has larger flowers and two large bracts that clasp the base of the bloom.",
    "fact": "Its deep root system can send up new shoots from surviving root fragments."
  },
  {
    "id": "cichorium-intybus",
    "name": "Chicory",
    "alias": "blue sailors",
    "color": "Blue flowers",
    "life": "Perennial",
    "summary": "Blue flower heads sit close to the branches of a tall, wiry roadside plant.",
    "clues": [
      "Lower leaves can be deeply lobed and form a basal rosette.",
      "Upper leaves are smaller and sit on stiff, branching stems.",
      "Blue flower heads have squared-off, finely toothed ray tips."
    ],
    "habitat": "Sunny roadsides, dry fields, and disturbed ground.",
    "compare": "Dandelion has a single head on each bare stalk. Chicory grows on branching stems and usually has blue flower heads.",
    "fact": "Chicory flower heads typically open in the morning and close later in the day."
  },
  {
    "id": "ambrosia-artemisiifolia",
    "name": "Common ragweed",
    "alias": "annual ragweed",
    "color": "Greenish flowers",
    "life": "Summer annual",
    "summary": "Deeply divided leaves sit below narrow spikes of small greenish flower clusters.",
    "clues": [
      "Leaves are deeply divided into irregular lobes.",
      "Lower leaves often occur in opposite pairs and upper leaves alternate.",
      "Male flower clusters hang along slender stalks at branch tips."
    ],
    "habitat": "Roadsides, fields, and disturbed garden soil.",
    "compare": "Mugwort often has conspicuously pale, felted leaf undersides and spreads by rhizomes. Common ragweed grows as an annual.",
    "fact": "The small flowers release airborne pollen, a major contributor to late-summer hay fever."
  },
  {
    "id": "potentilla-indica",
    "name": "Mock strawberry",
    "alias": "Indian strawberry Duchesnea indica",
    "color": "Yellow flowers",
    "life": "Perennial",
    "summary": "A creeping plant with three toothed leaflets, yellow flowers, and upright red fruit.",
    "clues": [
      "Leaves are divided into three toothed leaflets.",
      "Flowers have five yellow petals.",
      "Round red fruits stand upright and have a bumpy surface."
    ],
    "habitat": "Lawns, garden beds, and partly shaded ground.",
    "compare": "Wild strawberries typically have white flowers, while mock strawberry flowers are yellow.",
    "fact": "The plant sends out runners that root and produce new plants along the ground."
  },
  {
    "id": "polygonum-aviculare",
    "name": "Prostrate knotweed",
    "alias": "common knotgrass",
    "color": "White to pink flowers",
    "life": "Annual",
    "summary": "Tough, wiry stems form low mats with small oval leaves and papery joints.",
    "clues": [
      "Slender stems spread across the ground from a central root.",
      "Small oval leaves alternate along the stems.",
      "Tiny flowers and papery sheaths occur at the leaf joints."
    ],
    "habitat": "Compacted paths, pavement cracks, athletic fields, and worn patches of lawn.",
    "compare": "Spotted spurge has opposite leaves and milky sap. Knotweed has alternate leaves and papery sheaths.",
    "fact": "Prostrate knotweed can establish early in spring in bare soil heavily compacted by foot traffic."
  },
  {
    "id": "galium-aparine",
    "name": "Catchweed bedstraw",
    "alias": "cleavers sticky willy",
    "color": "White flowers",
    "life": "Annual",
    "summary": "Narrow leaves form rings around weak square stems that cling to other plants.",
    "clues": [
      "Leaves appear in whorls around the stem.",
      "Small backward-pointing hooks make the stems and leaves catch on fabric.",
      "Tiny white flowers develop into pairs of round, bristly fruits."
    ],
    "habitat": "Hedgerows, garden borders, and moist disturbed areas.",
    "compare": "Smooth bedstraw has smoother stems and fruits. Feel or look for the hooked bristles on catchweed bedstraw.",
    "fact": "Its hooked fruits hitch rides on fur and clothing, carrying seeds away from the parent plant."
  },
  {
    "id": "erigeron-canadensis",
    "name": "Horseweed",
    "alias": "marestail Conyza canadensis",
    "color": "White flowers",
    "life": "Annual",
    "summary": "A tall, leafy stem carries a branched spray of many tiny flower heads.",
    "clues": [
      "Young plants begin as a low rosette.",
      "Narrow alternate leaves crowd the upright stem.",
      "Numerous small heads at the tip produce seeds with pale tufts."
    ],
    "habitat": "Roadsides, gardens, and fields with exposed soil.",
    "compare": "Annual fleabane typically has more conspicuous white rays. Horseweed heads are smaller and less daisy-like.",
    "fact": "Its tiny, tufted fruits can drift on air currents and colonize exposed soil."
  }
];

const colors = {
  "Yellow flowers": "#f4c853",
  "White flowers": "#fffdf3",
  "Purple flowers": "#a58bc5",
  "Blue flowers": "#749cc5",
  "White to pink flowers": "#e5bfd1",
  "Greenish flowers": "#b0c18a",
  Grasses: "#7e9d62",
  Sedges: "#a1ac55"
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
