import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outdoorLivingPage = await readFile(
  new URL("../src/pages/outdoor-living.tsx", import.meta.url),
  "utf8",
);

test("keeps the premium outdoor kitchen feature grounded in poolside visuals", () => {
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-section"/);
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-visuals"/);
  assert.match(outdoorLivingPage, /generated_images\/outdoor-living\.jpg/);
  assert.match(outdoorLivingPage, /pool and raised spa beside a covered outdoor kitchen/);
  assert.match(outdoorLivingPage, /IMG_7976_1790212751526\.jpeg/);
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-reference"/);
  assert.match(outdoorLivingPage, /Outdoor kitchen reference/);
  assert.match(outdoorLivingPage, /\$20,000–\$100,000/);
  assert.match(outdoorLivingPage, /Kitchen islands/);
  assert.match(outdoorLivingPage, /Full bar moments/);
  assert.match(outdoorLivingPage, /Lounge seating/);
});