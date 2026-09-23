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

test("keeps the pool visualizer wired into both customer entry points", () => {
  assert.match(homePage, /<PoolVisualizer \/>/);
  assert.match(designPage, /<PoolVisualizer \/>/);
});

test("keeps every requested pool configuration in the generated state", () => {
  for (const field of [
    "width",
    "length",
    "shape",
    "waterFinish",
    "waterlineTile",
    "lights",
    "waterfall",
    "sunShelf",
  ]) {
    assert.match(component, new RegExp(`\\b${field}\\b`), `${field} must remain configurable`);
  }

  assert.match(component, /data-testid="input-pool-width"/);
  assert.match(component, /data-testid="input-pool-length"/);
  assert.match(component, /data-testid="select-waterline-tile"/);
  assert.match(component, /data-testid="button-load-backyard"/);
  assert.match(component, /data-testid="button-take-backyard"/);
  assert.match(component, /data-testid="input-backyard-photo"/);
  assert.match(component, /data-testid="input-backyard-camera"/);
  assert.match(component, /capture="environment"/);
  assert.match(component, /data-testid=\{`toggle-\$\{feature\.key\}`\}/);
  assert.match(component, /key: 'lights'/);
  assert.match(component, /key: 'waterfall'/);
  assert.match(component, /key: 'sunShelf'/);
});

test("renders configured values in the concept preview instead of only storing them", () => {
  assert.match(component, /finish\.swatch/);
  assert.match(component, /tile\.swatch/);
  assert.match(component, /configuration\.sunShelf/);
  assert.match(component, /configuration\.waterfall/);
  assert.match(component, /configuration\.lights/);
  assert.match(component, /poolScaleX/);
  assert.match(component, /poolScaleY/);
  assert.match(component, /aria-label={`Illustrative/);
});

test("keeps the before/after comparison and export controls available", () => {
  assert.match(component, /role="slider"/);
  assert.match(component, /onSliderKeyDown/);
  assert.match(component, /data-testid="button-export-concept"/);
  assert.match(component, /data-testid="button-reset-design"/);
  assert.match(component, /data-testid="button-send-concept"/);
  assert.match(component, /emailDesignConcept/);
  assert.match(component, /illustrative study, not completed-project photography/);
});