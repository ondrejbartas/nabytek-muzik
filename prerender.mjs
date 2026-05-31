// Build-time prerender: render the app to static HTML and inject it into
// the built dist/index.html so the page ships fully-rendered (better FCP/LCP
// and crawlable content), then hydrated on the client. Also enriches the
// FurnitureStore JSON-LD with the Nejřemeslníci aggregateRating + reviews
// (fetched into src/data/nejremeslnici.json earlier in the build).
import { readFileSync, writeFileSync } from "node:fs";

const { render } = await import("./dist-server/entry-server.js");

const templatePath = "./dist/index.html";
let template = readFileSync(templatePath, "utf-8");

const appHtml = render();

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

template = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Inject aggregateRating + reviews into the existing FurnitureStore JSON-LD.
const rating = JSON.parse(readFileSync("./src/data/nejremeslnici.json", "utf-8"));
const ldRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
const match = template.match(ldRegex);
if (!match) throw new Error("prerender: ld+json block not found in dist/index.html");

const ld = JSON.parse(match[1]);
ld.aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: rating.ratingValue,
  bestRating: rating.bestRating,
  worstRating: rating.worstRating,
  ratingCount: rating.ratingCount,
};
ld.review = rating.reviews.map((r) => ({
  "@type": "Review",
  name: r.title,
  url: r.url,
  author: { "@type": "Person", name: r.author },
  datePublished: r.datePublished,
  reviewRating: {
    "@type": "Rating",
    ratingValue: r.rating,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
  },
  reviewBody: r.reviewBody,
}));

// Escape "<" so the serialized JSON can't terminate the <script> early.
const serialized = JSON.stringify(ld, null, 2).replace(/</g, "\\u003c");
template = template.replace(
  ldRegex,
  `<script type="application/ld+json">\n${serialized}\n    </script>`,
);

writeFileSync(templatePath, template);

console.log(
  `Prerendered ${templatePath} (${appHtml.length} chars of markup, ${ld.review.length} reviews in JSON-LD)`,
);
