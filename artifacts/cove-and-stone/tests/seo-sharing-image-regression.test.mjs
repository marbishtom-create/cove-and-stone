import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../src/pages/home.tsx", import.meta.url), "utf8");
const projects = await readFile(new URL("../src/pages/projects.tsx", import.meta.url), "utf8");
const siteConfig = await readFile(new URL("../src/config/site.ts", import.meta.url), "utf8");
const siteMetadata = await readFile(
  new URL("../src/components/seo/site-metadata.tsx", import.meta.url),
  "utf8",
);
const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("keeps the Nocatee design rendering consistent and clearly labeled", () => {
  const homeAsset = home.match(
    /import nocateeResortRendering from '@assets\/([^']+)'/,
  )?.[1];
  const projectAsset = projects.match(
    /import conceptNight from '@assets\/([^']+)'/,
  )?.[1];
  const homeCard = home.match(
    /<Link href="\/projects\/nocatee-resort\/"[\s\S]*?<\/Link>/,
  )?.[0];
  const nocateeProject = projects.match(
    /\{\s*slug: "nocatee-resort"[\s\S]*?\n  \},/,
  )?.[0];

  assert.ok(homeAsset);
  assert.equal(homeAsset, projectAsset);
  assert.ok(homeCard);
  assert.match(homeCard, /src=\{nocateeResortRendering\}/);
  assert.match(homeCard, /Illustrative resort-style backyard design/);
  assert.match(homeCard, /Design rendering/);
  assert.ok(nocateeProject);
  assert.match(nocateeProject, /status: "concept"/);
  assert.match(nocateeProject, /label: "Design rendering"/);
  assert.doesNotMatch(nocateeProject, /Completed|completed/);
});

test("uses the branded 1200 by 630 card for social previews, not as the schema logo", () => {
  assert.match(
    siteConfig,
    /SITE_OG_IMAGE\s*=\s*`\$\{SITE_URL\}\/brand\/cove-and-stone-social-share\.jpg`/,
  );
  assert.match(siteMetadata, /"og:image", SITE_OG_IMAGE/);
  assert.match(siteMetadata, /"twitter:image", SITE_OG_IMAGE/);
  assert.match(siteMetadata, /"og:image:width", "1200"/);
  assert.match(siteMetadata, /"og:image:height", "630"/);
  assert.match(indexHtml, /property="og:image" content="https:\/\/coveandstonepools\.com\/brand\/cove-and-stone-social-share\.jpg"/);
  assert.match(indexHtml, /name="twitter:image" content="https:\/\/coveandstonepools\.com\/brand\/cove-and-stone-social-share\.jpg"/);
  assert.match(indexHtml, /"logo": "https:\/\/coveandstonepools\.com\/brand\/cove-and-stone-approved\.png"/);
});