import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outdoorLivingPage = await readFile(
  new URL("../src/pages/outdoor-living.tsx", import.meta.url),
  "utf8",
);

test("shows responsive outdoor-kitchen design imagery with accurate labels", () => {
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-section"/);
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-visuals"/);
  assert.match(outdoorLivingPage, /generated_images\/outdoor-living\.jpg/);
  assert.match(outdoorLivingPage, /generated_images\/outdoor-kitchen-turf-screen-concept\.jpg/);
  assert.match(outdoorLivingPage, /generated_images\/outdoor-kitchen-turf-screen-concept-mobile\.jpg/);
  assert.match(outdoorLivingPage, /<source media="\(max-width: 767px\)" srcSet=\{kitchenLoungeConceptMobileImage\} \/>/);
  assert.match(outdoorLivingPage, /Design visualization of a covered outdoor kitchen with a stone island, large mounted television, screened enclosure, and turf lounge seating/);
  assert.match(outdoorLivingPage, /Outdoor kitchen \+ turf lounge \/ Design visualization/);
  assert.doesNotMatch(outdoorLivingPage, /Pool \+ spa \/ Outdoor room 02/);
  assert.match(outdoorLivingPage, /generated_images\/outdoor-kitchen-user-photo-clean\.jpg/);
  assert.match(outdoorLivingPage, /id="outdoor-kitchen-watermarked-reference"/);
  assert.match(outdoorLivingPage, /data-testid="outdoor-kitchen-watermarked-reference"/);
  assert.match(outdoorLivingPage, /Outdoor kitchen reference/);
  assert.match(outdoorLivingPage, /src="\/brand\/cove-and-stone-approved\.png"/);
  assert.match(outdoorLivingPage, /aria-hidden="true"/);
  assert.match(outdoorLivingPage, /light-stone built-in kitchen with a pizza oven, grill and sink/);
  assert.match(outdoorLivingPage, /\$20,000–\$100,000/);
  assert.match(outdoorLivingPage, /Kitchen islands/);
  assert.match(outdoorLivingPage, /Full bar moments/);
  assert.match(outdoorLivingPage, /Lounge seating/);
});