import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(
  new URL("../src/pages/home.tsx", import.meta.url),
  "utf8",
);

test("keeps all three mobile hero CTAs visible over the background image", () => {
  assert.match(homePage, /Design My Backyard/);
  assert.match(homePage, /Visit the Showroom/);
  assert.match(homePage, /Explore Financing/);
  assert.match(homePage, /bg-secondary text-secondary-foreground/);
  assert.match(homePage, /bg-white\/95 text-primary/);
});