import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const poolsPage = await readFile(
  new URL("../src/pages/pools.tsx", import.meta.url),
  "utf8",
);

test("keeps the pools philosophy visual framed and transparent", () => {
  assert.match(poolsPage, /generated_images\/hero-pool\.jpg/);
  assert.match(poolsPage, /0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673\.png/);
  assert.match(poolsPage, /St\. Johns River concept/);
  assert.match(poolsPage, /bg-white\/10/);
  assert.match(poolsPage, /backdrop-blur-md/);
  assert.match(poolsPage, /-bottom-12 -right-6 hidden h-52 w-52/);
  assert.match(poolsPage, /Purity of Form/);
});