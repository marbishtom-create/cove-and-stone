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

test("keeps all three mobile hero CTAs with a subtle frosted-glass treatment", () => {
  assert.match(heroSection, /Design My Backyard/);
  assert.match(heroSection, /Visit the Showroom/);
  assert.match(heroSection, /Explore Financing/);
  assert.equal(
    (heroSection.match(/bg-secondary\/80 text-secondary-foreground/g) ?? []).length,
    3,
  );
  assert.equal((heroSection.match(/backdrop-blur-sm/g) ?? []).length, 3);
  assert.equal((heroSection.match(/border-white\/30/g) ?? []).length, 3);
  assert.match(heroSection, /hover:bg-white hover:text-primary/);
  assert.match(heroSection, /focus-visible:bg-white focus-visible:text-primary/);
  assert.match(heroSection, /active:bg-white active:text-primary/);
});