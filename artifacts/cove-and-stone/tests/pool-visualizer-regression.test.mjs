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
const geminiImageHelper = await readFile(
  new URL("../../../lib/integrations-gemini-ai/src/image.ts", import.meta.url),
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
    "infinity-edge",
    "sunken-fire-pit",
    "outdoor-kitchen",
    "pool-lights",
  ]) {
    assert.match(component, new RegExp(`id: '${feature}'`), `${feature} must have its own independent toggle`);
  }
  assert.match(component, /configuration\.features\.includes\(feature\.id\)/);
  assert.match(component, /\[\.\.\.configuration\.features, feature\]/);
  assert.match(component, /configuration\.features\.filter\(\(selected\) => selected !== feature/);
});

test("renders configured values in the concept preview instead of only storing them", () => {
  assert.match(component, /finish\.swatch/);
  assert.match(component, /tile\.swatch/);
  assert.match(component, /deck\.swatch/);
  assert.match(component, /selectedFeatures\.has\('sun-shelf'\)/);
  assert.match(component, /selectedFeatures\.has\('spa'\)/);
  assert.match(component, /selectedFeatures\.has\('infinity-edge'\)/);
  assert.match(component, /selectedFeatures\.has\('pool-pergola-rainfall'\)/);
  assert.match(component, /data-feature-pergola-water="true"/);
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
  assert.match(designConceptRoute, /providerMessage\.toLowerCase\(\)\.includes\("domain"\)/);
  assert.match(designConceptRoute, /providerMessage\.toLowerCase\(\)\.includes\("not verified"\)/);
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

test("uses representative photographed material textures and places feature toggles below the comparison", () => {
  assert.match(component, /material-pool-white-plaster-small\.jpg/);
  assert.match(component, /href=\{finish\.texture\}/);
  assert.match(component, /href=\{tile\.texture\}/);
  assert.match(component, /href=\{deck\.texture\}/);
  assert.match(component, /data-material-texture="true"/);
  assert.match(component, /confirm exact products with physical samples/);
  assert.ok(
    component.indexOf('className="pool-visualizer__feature-dock"') <
      component.indexOf("POOL_FEATURES.map((feature)"),
    "feature controls should live in the dock below the comparison",
  );
  assert.match(designConceptRoute, /"pool-pergola-rainfall": "Optional overhead sheer waterfall from pergola"/);
  assert.match(designConceptRoute, /"pool-pergola-rainfall": "a narrow overhead sheer waterfall falling from the selected pergola overhang/);
  assert.match(apiSpec, /pool-pergola-rainfall/);
});

test("shows distinct material tones and supports darker porcelain deck choices", () => {
  assert.match(component, /material-deck-dark-gray-porcelain-small\.jpg/);
  assert.match(component, /material-deck-black-marble-porcelain-small\.jpg/);
  assert.match(component, /id: 'ivory-porcelain', label: 'Ivory porcelain', detail: 'Bright white matte finish', swatch: '#f7f7f2'/);
  assert.match(component, /id: 'dark-gray-porcelain', label: 'Dark gray porcelain'/);
  assert.match(component, /id: 'black-marble-porcelain', label: 'Black marble-look porcelain'/);
  assert.match(component, /tile\.swatch\}66/);
  assert.match(component, /opacity="\.48"/);
  assert.match(designConceptRoute, /dark-gray-porcelain/);
  assert.match(designConceptRoute, /near-black marble-look porcelain pavers with subtle pale veining/);
  assert.match(apiSpec, /dark-gray-porcelain/);
  assert.match(apiSpec, /black-marble-porcelain/);
});

test("keeps glass waterline colors and charcoal tile scale visually distinct", () => {
  assert.match(component, /id: 'sea-glass'.*swatch: '#a9ccc5'/);
  assert.match(component, /id: 'lagoon-glass'.*swatch: '#79a9a7'.*tintOpacity: 0\.74/);
  assert.match(component, /id: 'ocean-blue-glass'.*swatch: '#187eae'.*tintOpacity: 0\.88/);
  assert.match(component, /label: 'Deep blue glass', detail: 'Very dark midnight blue', swatch: '#071d3a'.*tintOpacity: 0\.92/);
  assert.match(component, /swatch: '#080b0d'.*tintOpacity: 0\.84, grayscale: true, patternScale: 1\.25/);
  assert.match(component, /const tilePatternWidth = 54 \* \(tile\.patternScale \?\? 1\)/);
  assert.match(component, /opacity=\{tileTintOpacity\}/);
  assert.match(component, /filter=\{tile\.grayscale \? 'url\(#waterline-charcoal-filter\)' : undefined\}/);
  assert.match(component, /backgroundSize: tile\.patternScale \?/);
  assert.match(designConceptRoute, /"deep-navy-glass": "Deep blue glass"/);
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

test("keeps edit history accessible without recording comparison-slider movement", () => {
  assert.match(component, /data-testid="button-undo"/);
  assert.match(component, /data-testid="button-redo"/);
  assert.match(component, /disabled=\{!history\.length\}/);
  assert.match(component, /disabled=\{!future\.length\}/);
  assert.match(component, /key !== 'comparisonPosition'/);
  assert.match(component, /\.\.\.previous,[\s\S]*?comparisonPosition: configurationRef\.current\.comparisonPosition/);
  assert.match(component, /\.\.\.next,[\s\S]*?comparisonPosition: configurationRef\.current\.comparisonPosition/);
});

test("keeps pergola waterfall subordinate to the pergola and preserves AI fallback state", () => {
  assert.match(component, /configuration\.features\.includes\('pergola'\)/);
  assert.match(component, /feature === 'pergola' && selected === 'pool-pergola-rainfall'/);
  assert.match(component, /setAiRenderStatus\('generating'\)/);
  assert.doesNotMatch(component.slice(component.indexOf('const generateAiRender')), /setAiRenderDataUrl\(null\)/);
  assert.match(designConceptRoute, /do not add a second pergola/);
});

test("keeps the spa spillover and pergola waterfall distinct in the local and AI concepts", () => {
  assert.match(component, /label: 'Raised spa with pool spillover'/);
  assert.match(component, /const spaEnabled = selectedFeatures\.has\('spa'\)/);
  assert.doesNotMatch(component, /Spa with overhead waterfall/);
  assert.ok(
    component.indexOf('data-feature-pergola="true"') < component.indexOf('<g transform={poolTransform}>'),
    "the pergola should be drawn behind the pool",
  );
  assert.match(component, /data-feature-pergola-water="true"/);
  assert.match(component, /M569 153 C568 165 570 178 571 192/);
  assert.match(
    designConceptRoute,
    /spa: "a separate raised spa beside the pool, with a clean spillover lip flowing directly into the swimming pool"/,
  );
  assert.match(
    designConceptRoute,
    /"pool-pergola-rainfall": "a narrow overhead sheer waterfall falling from the selected pergola overhang directly into the pool/,
  );
});

test("retries missing Gemini image payloads without changing the supported model", () => {
  assert.match(geminiImageHelper, /for \(let attempt = 0; attempt < 2; attempt \+= 1\)/);
  assert.match(geminiImageHelper, /candidates[\s\S]*?flatMap/);
  assert.match(geminiImageHelper, /if \(attempt === 0\)/);
  assert.match(geminiImageHelper, /model: "gemini-2\.5-flash-image"/);
  assert.match(geminiImageHelper, /did not return a pool concept image after retrying/);
});