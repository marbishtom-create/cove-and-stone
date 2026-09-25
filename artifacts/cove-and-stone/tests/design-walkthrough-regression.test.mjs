import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const designPage = await readFile(
  new URL("../src/pages/design.tsx", import.meta.url),
  "utf8",
);
const apiRoute = await readFile(
  new URL("../../api-server/src/routes/design-concepts.ts", import.meta.url),
  "utf8",
);
const apiSpec = await readFile(
  new URL("../../../lib/api-spec/openapi.yaml", import.meta.url),
  "utf8",
);
const productionServer = await readFile(
  new URL("../scripts/serve-production.mjs", import.meta.url),
  "utf8",
);

test("keeps the responsive 3D design walkthrough on the Design page", () => {
  assert.match(designPage, /designWalkthrough/);
  assert.equal([...designPage.matchAll(/<video\b/g)].length, 1);
  assert.match(designPage, /<source src=\{designWalkthrough\} type="video\/mp4" \/>/);
  assert.match(designPage, /preload="none"/);
  assert.doesNotMatch(designPage, /autoPlay/);
  assert.match(designPage, /playsInline/);
  assert.match(designPage, /controls/);
  assert.match(designPage, /onError=\{\(\) => setWalkthroughFailed\(true\)\}/);
  assert.match(designPage, /Open the walkthrough/);
  assert.match(designPage, /3D design walkthrough/);
});

test("serves video files with an iPhone-compatible type and byte ranges", () => {
  assert.match(productionServer, /"\.mp4": "video\/mp4"/);
  assert.match(productionServer, /"Accept-Ranges": "bytes"/);
  assert.match(productionServer, /"Content-Range": `bytes \$\{range\.start\}-\$\{range\.end\}\/\$\{fileStats\.size\}`/);
  assert.match(productionServer, /createReadStream\(routeFile\.file, range\)/);
});

test("keeps the internal concept email contract and Sales recipient wired", () => {
  assert.match(apiRoute, /Sales@coveandstonepools\.com/);
  assert.match(apiRoute, /attachments/);
  assert.match(apiRoute, /design\.svg/);
  assert.match(apiRoute, /connectors\.proxy\("resend", "\/emails"/);
  assert.match(apiSpec, /\/design-concepts\/email:/);
  assert.match(apiSpec, /DesignConceptEmailRequest/);
});