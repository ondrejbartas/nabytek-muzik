// Build-time prerender: render the app to static HTML and inject it into
// the built dist/index.html so the page ships fully-rendered (better FCP/LCP
// and crawlable content), then hydrated on the client.
import { readFileSync, writeFileSync } from "node:fs";

const { render } = await import("./dist-server/entry-server.js");

const templatePath = "./dist/index.html";
const template = readFileSync(templatePath, "utf-8");

const appHtml = render();

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(templatePath, html);

console.log(`Prerendered ${templatePath} (${appHtml.length} chars of markup)`);
