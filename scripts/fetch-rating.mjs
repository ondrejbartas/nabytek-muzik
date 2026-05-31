// Fetches Nejřemeslníci data and writes it to src/data/nejremeslnici.json,
// consumed at build time so the rating + reviews are baked into the
// prerendered HTML (badge, visible references, LocalBusiness structured data).
//
// Two sources:
//   1. The profile page — for the aggregateRating (value, count, best/worst).
//   2. The reviews filter endpoint (offset=0&up_to=200) — returns every
//      reference as a card with its own /reference/ link + JSON-LD Review.
//      We parse all of them, sort by datePublished, and keep the 6 latest.
//
// Runs as the first step of `npm run build` and on a daily CI cron. On any
// failure (network, parsing, missing data) it logs a warning and leaves the
// committed JSON untouched, so a flaky fetch never breaks the build.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, "../src/data/nejremeslnici.json");

const ORIGIN = "https://www.nejremeslnici.cz";
const PROFILE_URL = `${ORIGIN}/remeslnik/1392-pro-int-stanislav-muzik-cesky-brod`;
const REVIEWS_URL = `${ORIGIN}/profil/1392-pro-int-stanislav-muzik/filter?reviews_filter=reviews_and_examples&provider_profile=true&offset=0&up_to=200`;

const UA =
  "Mozilla/5.0 (compatible; nabytekmuzik.cz rating bot; +https://nabytekmuzik.cz)";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// aggregateRating lives in the profile page's JSON-LD.
function extractAggregateRating(html) {
  const blocks = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch {
      continue;
    }
    const nodes = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed["@graph"])
        ? parsed["@graph"]
        : [parsed];
    for (const node of nodes) {
      const r = node?.aggregateRating;
      if (r && r.ratingValue != null && r.ratingCount != null) {
        return {
          ratingValue: Number(r.ratingValue),
          ratingCount: Number(r.ratingCount),
          bestRating: Number(r.bestRating ?? 5),
          worstRating: Number(r.worstRating ?? 1),
        };
      }
    }
  }
  return null;
}

// Each reference is a `.nr-review` card carrying its slug, title, /reference/
// link, and a JSON-LD Review. Parse them all and return the 6 latest.
function extractLatestReviews(html, limit = 6) {
  const blocks = html
    .split(/(?=<div class="nr-review)/)
    .filter((b) => b.includes("data-job-param-id"));

  const reviews = [];
  for (const block of blocks) {
    const link = block.match(
      /<h3[^>]*>\s*<a[^>]*href="(\/reference\/[^"?#]+)[^"]*"[^>]*>([^<]+)<\/a>/,
    );
    const ld = block.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/,
    );
    if (!link || !ld) continue;

    let rev;
    try {
      rev = JSON.parse(ld[1].trim())?.review;
    } catch {
      continue;
    }
    if (!rev?.author?.name || !rev.datePublished) continue;

    reviews.push({
      title: link[2].trim(),
      author: rev.author.name,
      datePublished: rev.datePublished,
      rating: Number(rev.reviewRating?.ratingValue ?? 5),
      reviewBody: (rev.reviewBody ?? "")
        .replace(/\r\n?/g, "\n") // normalize CRLF/CR to LF
        .replace(/[ \t]+/g, " ") // collapse runs of spaces/tabs
        .replace(/[ \t]*\n[ \t]*/g, "\n") // trim spaces around line breaks
        .replace(/\n{3,}/g, "\n\n") // cap blank-line runs
        .trim(),
      url: `${ORIGIN}${link[1]}`,
    });
  }

  reviews.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  return reviews.slice(0, limit);
}

async function main() {
  const [profileHtml, reviewsHtml] = await Promise.all([
    fetchText(PROFILE_URL),
    fetchText(REVIEWS_URL),
  ]);

  const aggregate = extractAggregateRating(profileHtml);
  if (!aggregate) throw new Error("aggregateRating not found in profile JSON-LD");

  const reviews = extractLatestReviews(reviewsHtml);
  if (reviews.length === 0) throw new Error("no reviews parsed from filter endpoint");

  const next = {
    ...aggregate,
    reviews,
    profileUrl: PROFILE_URL,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  writeFileSync(dataPath, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `Updated rating: ${next.ratingValue}/${next.bestRating} from ${next.ratingCount} reviews; kept ${reviews.length} latest (newest ${reviews[0].datePublished}).`,
  );
}

main().catch((err) => {
  let existing = "(none)";
  try {
    existing = readFileSync(dataPath, "utf-8").trim();
  } catch {
    // ignore
  }
  console.warn(
    `fetch-rating: keeping committed data (${err.message}).\nCurrent: ${existing}`,
  );
});
