import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(
  new URL("../src/pages/home.tsx", import.meta.url),
  "utf8",
);
const heroSection = homePage.slice(
  0,
  homePage.indexOf("{/* 2. Credibility Content */}"),
);

test("keeps all three mobile hero CTAs visible over the background image", () => {
  assert.match(heroSection, /Design My Backyard/);
  assert.match(heroSection, /Visit the Showroom/);
  assert.match(heroSection, /Explore Financing/);
  assert.equal(
    (heroSection.match(/bg-secondary text-secondary-foreground/g) ?? []).length,
    3,
  );
  assert.match(heroSection, /hover:bg-white hover:text-primary/);
  assert.match(heroSection, /focus-visible:bg-white focus-visible:text-primary/);
  assert.match(heroSection, /active:bg-white active:text-primary/);
});