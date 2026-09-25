import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const artifactRoot = new URL("../", import.meta.url);
const [page, app, projects, seo] = await Promise.all([
  readFile(new URL("src/pages/ongoing-construction.tsx", artifactRoot), "utf8"),
  readFile(new URL("src/App.tsx", artifactRoot), "utf8"),
  readFile(new URL("src/pages/projects.tsx", artifactRoot), "utf8"),
  readFile(new URL("src/config/seo-routes.json", artifactRoot), "utf8").then(JSON.parse),
]);
const sitemap = await readFile(new URL("public/sitemap.xml", artifactRoot), "utf8");

test("construction updates stay in chronological order and clearly show active status", () => {
  const updateTitles = [
    "Excavation begins",
    "Steel, forms & shell work",
    "The pool shell",
    "Steps in detail",
    "Shell & steps, close view",
    "Shell overview",
    "Pool edge, from the side",
    "Site grading underway",
  ];

  let previousIndex = -1;
  for (const title of updateTitles) {
    const currentIndex = page.indexOf(`title="${title}"`);
    assert.notEqual(currentIndex, -1, `missing progress update: ${title}`);
    assert.ok(currentIndex > previousIndex, `${title} is out of chronological order`);
    previousIndex = currentIndex;
  }

  assert.match(page, /Ongoing Construction/);
  assert.match(page, />\s*In progress\s*</);
  assert.doesNotMatch(page, /\bconcept\b/i);
  assert.match(page, /property conditions, permits and inspections, trade coordination and weather/);
});

test("portrait progress videos preserve their orientation and use the lightweight source", () => {
  assert.equal((page.match(/preload="none"/g) ?? []).length, 1);
  assert.match(page, /aspect-\[9\/16\]/);
  assert.match(page, /may14-excavation\.mp4/);
  assert.match(page, /may14-steel-and-shell\.mp4/);
  assert.match(page, /desktopSrc=\{may14Excavation\}/);
  assert.match(page, /desktopSrc=\{may14SteelAndShell\}/);
  assert.match(page, /const videoSource = isMobile \? mobileSrc : desktopSrc/);
  assert.match(page, /src=\{videoSource\}/);
  assert.match(page, /onError=\{\(\) => setHasVideoError\(true\)\}/);
  assert.match(page, /Open the video/);
  assert.match(page, /poster=\{poster\}/);
  assert.match(page, /controls/);
  assert.match(page, /playsInline/);
});

test("the dedicated route, Projects card, and SEO sitemap metadata are registered", () => {
  const ongoingRoute = app.indexOf('<Route path="/projects/ongoing-construction/"');
  const genericProjectRoute = app.indexOf('<Route path="/projects/:slug/"');
  assert.ok(ongoingRoute !== -1 && ongoingRoute < genericProjectRoute);
  assert.match(projects, /href="\/projects\/ongoing-construction\/"/);
  assert.match(projects, /Ongoing Construction/);
  assert.match(projects, /In progress/);

  const routeMetadata = seo.pages["/projects/ongoing-construction"];
  assert.equal(routeMetadata.title, "Ongoing Pool Construction | Cove & Stone Progress Log");
  assert.ok(routeMetadata.description.length > 50);
  assert.equal(seo.projectNames["ongoing-construction"], "Ongoing Construction");
  assert.equal(
    (sitemap.match(/https:\/\/coveandstonepools\.com\/projects\/ongoing-construction\//g) ?? []).length,
    1,
  );
});