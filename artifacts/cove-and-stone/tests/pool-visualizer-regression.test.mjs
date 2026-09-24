import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(
  new URL("../src/components/pool-visualizer/pool-visualizer.tsx", import.meta.url),
  "utf8",
);
const homePage = await readFile(
  new URL("../src/pages/home.tsx", import.meta.url),
  "utf8",
);
const designPage = await readFile(
  new URL("../src/pages/design.tsx", import.meta.url),
  "utf8",
);
const designConceptRoute = await readFile(
  new URL("../../api-server/src/routes/design-concepts.ts", import.meta.url),
  "utf8",
);
const apiSpec = await readFile(
  new URL("../../../lib/api-spec/openapi.yaml", import.meta.url),
  "utf8",
);

test("keeps the pool visualizer wired into both customer entry points", () => {
  assert.match(homePage, /<PoolVisualizer \/>/);
  assert.match(designPage, /<PoolVisualizer \/>/);
});

test("keeps every requested pool configuration in the generated state", () => {
  for (const field of [
    "width",
    "length",
    "shape",
    "poolFinish",
    "waterlineTile",
    "deckTile",
    "edgeTreatment",
    "features",
  ]) {
    assert.match(component, new RegExp(`\\b${field}\\b`), `${field} must remain configurable`);
  }

  assert.match(component, /data-testid="input-pool-width"/);
  assert.match(component, /data-testid="input-pool-length"/);
  assert.match(component, /data-testid=\{`button-waterline-tile-\$\{tile\.id\}`\}/);
  assert.match(component, /data-testid=\{`button-deck-tile-\$\{tile\.id\}`\}/);
  assert.match(component, /data-testid="button-load-backyard"/);
  assert.match(component, /data-testid="button-take-backyard"/);
  assert.match(component, /data-testid="input-backyard-photo"/);
  assert.match(component, /data-testid="input-backyard-camera"/);
  assert.match(component, /capture="environment"/);
  assert.match(component, /data-testid=\{`toggle-feature-\$\{feature\.id\}`\}/);
  for (const feature of [
    "spa",
    "spa-waterfall",
    "infinity-edge",
    "sunken-fire-pit",
    "outdoor-kitchen",
    "pool-lights",
  ]) {
    assert.match(component, new RegExp(`id: '${feature}'`), `${feature} must have its own independent toggle`);
  }
  assert.match(component, /configuration\.features\.includes\(feature\.id\)/);
  assert.match(component, /\[\.\.\.configuration\.features, feature\.id\]/);
  assert.match(component, /configuration\.features\.filter\(\(selected\) => selected !== feature\.id\)/);
});

test("renders configured values in the concept preview instead of only storing them", () => {
  assert.match(component, /finish\.swatch/);
  assert.match(component, /tile\.swatch/);
  assert.match(component, /deck\.swatch/);
  assert.match(component, /selectedFeatures\.has\('sun-shelf'\)/);
  assert.match(component, /selectedFeatures\.has\('spa-waterfall'\)/);
  assert.match(component, /selectedFeatures\.has\('infinity-edge'\)/);
  assert.match(component, /selectedFeatures\.has\('sunken-fire-pit'\)/);
  assert.match(component, /selectedFeatures\.has\('outdoor-kitchen'\)/);
  assert.match(component, /stroke="url\(#continuous-deck-tile\)" strokeWidth="48"/);
  assert.match(component, /stroke="url\(#waterline-tile-pattern\)" strokeWidth="9"/);
  assert.doesNotMatch(component, /stroke="#eee4ce"/);
  assert.match(component, /poolScaleX/);
  assert.match(component, /poolScaleY/);
  assert.match(component, /aria-label={`Illustrative/);
});

test("uses an uploaded backyard photo as the after-concept canvas", () => {
  assert.match(component, /href=\{configuration\.photoUrl\}/);
  assert.match(component, /PHOTO-BASED CONCEPT/);
  assert.match(component, /After · photo concept/);
});

test("creates a real AI rendering from a backyard photo and sends it to Sales", () => {
  assert.match(component, /generatePoolConceptRender/);
  assert.match(component, /data-testid="button-generate-ai-render"/);
  assert.match(component, /src=\{aiRenderDataUrl\}/);
  assert.match(component, /aiRenderDataUrl: aiRenderDataUrl \?\? undefined/);
  assert.match(component, /customerName: customer\.customerName/);
  assert.match(component, /customerAddress: customer\.customerAddress/);
  assert.match(component, /customerPhone: customer\.customerPhone/);
  assert.match(component, /data-testid="input-customer-name"/);
  assert.match(component, /data-testid="input-customer-address"/);
  assert.match(component, /data-testid="input-customer-phone"/);
  assert.match(component, /data-testid="form-send-concept"/);
  assert.match(component, /serializeEmailConceptSvg\(svg\)/);
  assert.match(component, /data-background-photo="true"/);
  assert.match(component, /querySelectorAll\('\[data-background-photo="true"\]'\)/);
  assert.match(component, /Your photo is sent to AI/);
  assert.match(designConceptRoute, /renderBackyardPool/);
  assert.match(designConceptRoute, /MAX_RENDERS_PER_WINDOW = 3/);
  assert.match(designConceptRoute, /cove-stone-ai-pool-concept/);
  assert.match(designConceptRoute, /customer-backyard-before\.jpg/);
  assert.match(designConceptRoute, /concept\.features\.map\(\(feature\) => FEATURE_PROMPTS\[feature\]\)/);
  assert.match(designConceptRoute, /escapeHtml\(concept\.customerAddress\)/);
  assert.match(designConceptRoute, /escapeHtml\(concept\.customerPhone\)/);
  assert.match(apiSpec, /\/design-concepts\/render/);
  assert.match(apiSpec, /aiRenderDataUrl/);
  assert.match(apiSpec, /originalPhotoDataUrl/);
  assert.match(apiSpec, /customerName:/);
  assert.match(apiSpec, /customerAddress:/);
  assert.match(apiSpec, /customerPhone:/);
  assert.match(apiSpec, /features:/);
});

test("keeps the 3D walkthrough video visible in the mobile layout", () => {
  assert.match(designPage, /designWalkthrough/);
  assert.match(designPage, /max-h-\[72svh\]/);
  assert.equal([...designPage.matchAll(/<video\b/g)].length, 1);
  assert.match(designPage, /preload="none"/);
  assert.match(designPage, /playsInline/);
  assert.match(designPage, /<source src=\{designWalkthrough\} type="video\/mp4" \/>/);
  assert.doesNotMatch(designPage, /autoPlay/);
  assert.match(designPage, /className="block aspect-square w-full object-cover shadow-2xl md:aspect-video"/);
});

test("keeps the before/after comparison and export controls available", () => {
  assert.match(component, /role="slider"/);
  assert.match(component, /onSliderKeyDown/);
  assert.match(component, /data-testid="button-export-concept"/);
  assert.match(component, /data-testid="button-reset-design"/);
  assert.match(component, /data-testid="button-send-concept"/);
  assert.match(component, /emailDesignConcept/);
  assert.match(component, /AI concepts are illustrative only, not completed-project photography or construction drawings/);
});