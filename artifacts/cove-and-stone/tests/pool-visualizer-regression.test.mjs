import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(
  new URL("../src/components/pool-visualizer/pool-visualizer.tsx", import.meta.url),
  "utf8",
);
const componentStyles = await readFile(
  new URL("../src/components/pool-visualizer/pool-visualizer.css", import.meta.url),
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
    "pergolaFinish",
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
  assert.match(component, /data-pool-coping="true"/);
  assert.match(component, /stroke="url\(#continuous-deck-tile\)"/);
  assert.match(component, /stroke="url\(#waterline-tile-pattern\)" strokeWidth="9"/);
  assert.match(component, /data-feature-spa-overflow="true"/);
  assert.match(component, /data-feature-spa-waterline="true"/);
  assert.doesNotMatch(component, /stroke="#eee4ce"/);
  assert.match(component, /poolScaleX/);
  assert.match(component, /poolScaleY/);
  assert.match(component, /aria-label={`Illustrative/);
});

test("invites customers into layout editing and preserves reduced-motion preferences", () => {
  assert.match(component, /data-testid="button-edit-layout"/);
  assert.match(component, /pool-visualizer__edit-layout-nudge/);
  assert.match(componentStyles, /@keyframes pv-edit-float/);
  assert.match(componentStyles, /prefers-reduced-motion: reduce/);
});

test("keeps coping tiles in the deck module and makes spa overflow use the pool waterline tile", () => {
  assert.match(component, /data-pool-coping="true"[\s\S]*?stroke="url\(#continuous-deck-tile\)"/);
  assert.match(component, /data-feature-spa-waterline="true"[\s\S]*?fill="url\(#waterline-tile-pattern\)"/);
  assert.match(designConceptRoute, /consistent large-format module across the deck, flush coping/);
  assert.match(designConceptRoute, /same selected waterline tile as the pool/);
  assert.match(designConceptRoute, /full-perimeter overflow using the same selected waterline tile/);
});

test("uses an uploaded backyard photo as the after-concept canvas", () => {
  assert.match(component, /href=\{configuration\.photoUrl\}/);
  assert.match(component, /PHOTO-BASED DESIGN/);
  assert.match(component, /After · photo design/);
});

test("creates a real AI rendering from a backyard photo and sends it to Sales", () => {
  assert.match(component, /generatePoolConceptRender/);
  assert.match(component, /data-testid="button-generate-ai-render"/);
  assert.match(component, /src=\{aiRenderDataUrl\}/);
  assert.match(component, /aiRenderDataUrl: aiRenderDataUrl \?\? undefined/);
  assert.match(component, /getPoolConceptVideoJob/);
  assert.match(component, /startPoolConceptWalkthrough/);
  assert.match(component, /statusCheckFailures <= 3/);
  assert.match(component, /window\.setTimeout\(pollVideoStatus, 2000\)/);
  assert.match(component, /data-testid="card-ai-walkthrough"/);
  assert.match(component, /status-ai-walkthrough/);
  assert.match(component, /data-testid="button-retry-ai-walkthrough"/);
  assert.match(component, /videoStatus === 'error'[\s\S]*?The MP4 could not be created\. Your AI rendering is ready and unchanged\./);
  assert.match(component, /aiRenderWasErased[\s\S]*?walkthrough needs to be created again/);
  assert.doesNotMatch(
    component,
    /\$\{videoError\}/,
  );
  assert.match(component, /Step 1 · Create the pool image/);
  assert.match(component, /Create a new AI rendering/);
  assert.match(component, /Retrying the MP4 will not change your photo or AI rendering/);
  assert.match(componentStyles, /\.pool-visualizer__walkthrough-step\.is-error/);
  assert.doesNotMatch(component, /<video\b/);
  assert.match(component, /videoJobId: videoStatus === 'ready' \? videoJobId \?\? undefined : undefined/);
  assert.match(component, /videoStatus !== 'ready' \|\| !videoJobId/);
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
  assert.match(component, /Your photo and rendering are sent to our team only when you send your concept/);
  assert.match(designConceptRoute, /renderBackyardPool/);
  assert.match(designConceptRoute, /startPoolConceptVideoJob/);
  assert.match(designConceptRoute, /getReadyPoolConceptVideoId/);
  assert.match(designConceptRoute, /router\.post\("\/design-concepts\/walkthrough"/);
  assert.match(designConceptRoute, /router\.get\("\/design-concepts\/video-jobs\/:videoJobId"/);
  assert.doesNotMatch(designConceptRoute, /router\.get\("\/design-concepts\/videos\/:videoId"/);
  assert.match(designConceptRoute, /pool-walkthrough\.mp4/);
  assert.match(designConceptRoute, /content_type: "video\/mp4"/);
  assert.match(designConceptRoute, /Retry-After/);
  assert.match(designConceptRoute, /MAX_RENDERS_PER_WINDOW = 3/);
  assert.match(designConceptRoute, /MAX_VIDEO_RETRIES_PER_WINDOW = 3/);
  assert.match(designConceptRoute, /cove-stone-ai-pool-design/);
  assert.match(designConceptRoute, /customer-backyard-before\.jpg/);
  assert.match(designConceptRoute, /providerMessage\.toLowerCase\(\)\.includes\("domain"\)/);
  assert.match(designConceptRoute, /providerMessage\.toLowerCase\(\)\.includes\("not verified"\)/);
  assert.match(designConceptRoute, /concept\.features\.map\(\(feature\) => FEATURE_PROMPTS\[feature\]\)/);
  assert.match(designConceptRoute, /escapeHtml\(concept\.customerAddress\)/);
  assert.match(designConceptRoute, /escapeHtml\(concept\.customerPhone\)/);
  assert.match(apiSpec, /\/design-concepts\/render/);
  assert.match(apiSpec, /\/design-concepts\/walkthrough/);
  assert.doesNotMatch(apiSpec, /\/design-concepts\/videos\/\{videoId\}/);
  assert.doesNotMatch(apiSpec, /video\/mp4/);
  assert.match(apiSpec, /videoJobId:/);
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
  assert.match(designConceptRoute, /"pool-pergola-rainfall": "Pergola sheer-descent waterfall add-on"/);
  assert.match(designConceptRoute, /"pool-pergola-rainfall": "one smooth, continuous sheer-descent sheet of water flowing from a narrow horizontal spillway integrated into the front beam of the selected pergola/);
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

test("offers three additional paver styles in the preview, handoff, and API contract", () => {
  const paverOptions = [
    ["terracotta-clay-pavers", "Terracotta clay pavers", "material-deck-terracotta-pavers.jpg"],
    ["blue-gray-bluestone", "Blue-gray bluestone", "material-deck-bluestone-pavers.jpg"],
    ["warm-gray-concrete-pavers", "Warm-gray concrete pavers", "material-deck-concrete-pavers.jpg"],
  ];

  for (const [id, label, texture] of paverOptions) {
    assert.match(component, new RegExp(`id: '${id}', label: '${label}'`));
    assert.match(component, new RegExp(texture));
    assert.match(designConceptRoute, new RegExp(`"${id}": "${label}"`));
    assert.match(designConceptRoute, new RegExp(id));
    assert.equal((apiSpec.match(new RegExp(id, "g")) ?? []).length, 2, `${id} must be accepted by both design endpoints`);
  }
});

test("keeps glass waterline colors and charcoal tile scale visually distinct", () => {
  assert.match(component, /id: 'sea-glass'.*swatch: '#a9ccc5'/);
  assert.match(component, /id: 'lagoon-glass'.*swatch: '#79a9a7'.*tintOpacity: 0\.74/);
  assert.match(component, /id: 'ocean-blue-glass'.*swatch: '#187eae'.*tintOpacity: 0\.88/);
  assert.match(component, /label: 'Deep blue glass', detail: 'Very dark midnight blue', swatch: '#071d3a'.*tintOpacity: 0\.92/);
  assert.match(component, /swatch: '#080b0d'.*tintOpacity: 0\.84, grayscale: true, patternScale: 1\.25/);
  assert.match(component, /const VISUAL_TILE_SCALE = 1\.25/);
  assert.match(component, /const tilePatternScale = VISUAL_TILE_SCALE \* \(tile\.patternScale \?\? 1\)/);
  assert.match(component, /const tilePatternWidth = 54 \* tilePatternScale/);
  assert.match(component, /const deckPatternWidth = 96 \* VISUAL_TILE_SCALE/);
  assert.match(component, /const deckPatternHeight = 72 \* VISUAL_TILE_SCALE/);
  assert.match(component, /backgroundSize: `\$\{VISUAL_TILE_SCALE \* \(tile\.patternScale \?\? 1\) \* 100\}%/);
  assert.match(component, /backgroundSize: `\$\{VISUAL_TILE_SCALE \* 100\}%/);
  assert.match(component, /opacity=\{tileTintOpacity\}/);
  assert.match(component, /filter=\{tile\.grayscale \? 'url\(#waterline-charcoal-filter\)' : undefined\}/);
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
  assert.match(component, /AI designs are illustrative only, not completed-project photography or construction drawings/);
});

test("places AI rendering below the preview, contact details below features, and reset beside history controls", () => {
  const previewMeta = component.indexOf('className="pool-visualizer__preview-meta"');
  const aiRender = component.indexOf("{aiRenderActions}", previewMeta);
  const featureDock = component.indexOf('className="pool-visualizer__feature-dock"');
  const contact = component.indexOf("{contactActions}", featureDock);
  assert.ok(previewMeta < aiRender && aiRender < featureDock, "only AI rendering controls should follow the preview");
  assert.ok(featureDock < contact, "contact details should follow the pool and outdoor feature choices");

  const historyActions = component.indexOf('className="pool-visualizer__history-actions"');
  const historyEnd = component.indexOf("</div>", historyActions);
  assert.ok(
    component.slice(historyActions, historyEnd).includes('data-testid="button-reset-design"'),
    "Reset should sit with undo and redo",
  );
  assert.match(component, /className="pool-visualizer__drag-hint"/);
  assert.match(component, /<strong>Drag &amp; play<\/strong>/);
  assert.match(component, /Move pool items to explore the layout\./);
  assert.match(component, /\(!aiRenderDataUrl \|\| isLayoutEditing\)/);

  const finishSwatchStyles = componentStyles.match(
    /\.pool-visualizer__material-swatch--finish\s*\{([^}]*)\}/,
  )?.[1] ?? "";
  assert.match(finishSwatchStyles, /border-radius:\s*999px/);
  assert.match(finishSwatchStyles, /width:\s*2\.772rem/);
  assert.match(finishSwatchStyles, /height:\s*3\.53rem/);
  assert.match(component, /url\(\$\{finish\.texture\}\)/);
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
  assert.match(component, /Pergola add-on: one smooth sheet of water spills from the beam into the pool/);
  assert.match(component, /const pergolaWaterEnabled = selectedFeatures\.has\('pergola'\) && selectedFeatures\.has\('pool-pergola-rainfall'\)/);
  assert.match(component, /Pergola sheer-descent waterfall/);
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
  assert.match(component, /M623 156 C623 168 624 181 625 193 Q639 197 653 193 C654 181 655 168 655 156Z/);
  assert.match(
    designConceptRoute,
    /spa: "a raised champagne spa integrated with the pool, with a continuous full-perimeter overflow/,
  );
  assert.match(
    designConceptRoute,
    /"pool-pergola-rainfall": "one smooth, continuous sheer-descent sheet of water flowing from a narrow horizontal spillway integrated into the front beam of the selected pergola/,
  );
});

test("retries missing Gemini image payloads without changing the supported model", () => {
  assert.match(geminiImageHelper, /const maxAttempts = 3/);
  assert.match(geminiImageHelper, /candidates[\s\S]*?flatMap/);
  assert.match(geminiImageHelper, /isValidGeneratedImage/);
  assert.match(geminiImageHelper, /isRetryableProviderError/);
  assert.match(geminiImageHelper, /model: "gemini-2\.5-flash-image"/);
  assert.match(geminiImageHelper, /did not return a pool concept image after retrying/);
});

test("keeps pergola finish choices consistent across the preview, AI prompt, and handoff", () => {
  for (const finish of ["white", "black", "wood"]) {
    assert.match(component, new RegExp(`id: '${finish}', label: '${finish[0].toUpperCase()}${finish.slice(1)}'`));
    assert.match(component, new RegExp(`button-pergola-finish-\\$\\{finish\\.id\\}`));
    assert.match(apiSpec, new RegExp(finish));
  }
  assert.match(component, /stroke=\{pergolaFinish\.beam\}/);
  assert.match(component, /updateConfiguration\(\{ pergolaFinish: finish\.id \}\)/);
  assert.match(component, /pergolaFinish: configuration\.pergolaFinish/);
  assert.match(designConceptRoute, /PERGOLA_FINISH_PROMPTS\[concept\.pergolaFinish\]/);
  assert.match(designConceptRoute, /PERGOLA_FINISH_LABELS\[concept\.pergolaFinish\]/);
});

test("moves and rotates pool features across the full preview and removes selected items", () => {
  assert.match(component, /data-testid="button-rotate-pool-clockwise"/);
  assert.match(component, /data-testid="button-rotate-pool-counterclockwise"/);
  assert.match(component, /data-testid="button-remove-selected-layout-item"/);
  assert.match(component, /clampPoolLayoutTransform\(gesture\.id,[\s\S]*?gesture\.parentRotation/);
  assert.match(component, /rotation: current\.layoutElements\.pool\.rotation \+ degrees/);
  assert.match(component, /layoutElements: POOL_LAYOUT_ELEMENT_IDS\.map/);
  assert.match(designConceptRoute, /rotated \$\{item\.rotation > 0 \? "clockwise" : "counterclockwise"\}/);
  assert.match(apiSpec, /offsetX:[\s\S]*?minimum: -180[\s\S]*?maximum: 180/);
  assert.match(apiSpec, /rotation:[\s\S]*?minimum: -180[\s\S]*?maximum: 180/);
});

test("sends white brush masks for approximate AI erasure and warns about spillover changes", () => {
  assert.match(component, /data-testid="button-toggle-erase-mode"/);
  assert.match(component, /data-testid="range-erase-brush-size"/);
  assert.match(component, /data-testid="button-apply-erase"/);
  assert.match(component, /maskContext\.fillStyle = '#000000'/);
  assert.match(component, /maskContext\.strokeStyle = '#ffffff'/);
  assert.match(component, /pixels outside the brush may also change/);
  assert.match(component, /erasePoolConceptArea\(\{/);
  assert.match(component, /setVideoStatus\('error'\)/);
  assert.match(designConceptRoute, /router\.post\("\/design-concepts\/erase"/);
  assert.match(designConceptRoute, /not a pixel-locked inpainting boundary/);
  assert.match(designConceptRoute, /additionalImages: \[maskImage\]/);
  assert.match(geminiImageHelper, /additionalImages\.map/);
  assert.match(apiSpec, /\/design-concepts\/erase/);
  assert.match(apiSpec, /maskDataUrl:/);
});