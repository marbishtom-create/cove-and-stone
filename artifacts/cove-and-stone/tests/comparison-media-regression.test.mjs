import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [home, renovations] = await Promise.all([
  readFile(new URL("../src/pages/home.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/pages/renovations.tsx", import.meta.url), "utf8"),
]);

test("homepage provides a labeled slider for the backyard photo and illustrative pool concept", () => {
  assert.match(home, /id="backyard-pool-comparison"/);
  assert.match(home, /<BeforeAfter/);
  assert.match(home, /beforeImage=\{backyardReference\}/);
  assert.match(home, /afterImage=\{poolDesignStudy\}/);
  assert.match(home, /beforeLabel="Before · Existing backyard"/);
  assert.match(home, /afterLabel="After · Illustrative design"/);
  assert.match(home, /concept, not a photograph of completed construction/);
});

test("renovation references are shown separately with a clear provenance disclaimer", () => {
  assert.doesNotMatch(renovations, /BeforeAfter/);
  assert.match(renovations, /not a before-and-after view of one property/);
  assert.match(renovations, /photographs of a completed Cove & Stone renovation/);
});