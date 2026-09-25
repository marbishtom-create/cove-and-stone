import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [home, renovations] = await Promise.all([
  readFile(new URL("../src/pages/home.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/pages/renovations.tsx", import.meta.url), "utf8"),
]);

test("homepage design references are not presented as a same-property transformation", () => {
  assert.doesNotMatch(home, /BeforeAfter/);
  assert.match(home, /Backyard reference image/);
  assert.match(home, /Illustrative pool design/);
  assert.match(home, /not views of the same property or completed-project photographs/);
});

test("renovation references are shown separately with a clear provenance disclaimer", () => {
  assert.doesNotMatch(renovations, /BeforeAfter/);
  assert.match(renovations, /not a before-and-after view of one property/);
  assert.match(renovations, /photographs of a completed Cove & Stone renovation/);
});