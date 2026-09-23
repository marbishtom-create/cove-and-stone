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

test("keeps the responsive 3D design walkthrough on the Design page", () => {
  assert.match(designPage, /designWalkthrough/);
  assert.match(designPage, /<video/);
  assert.match(designPage, /autoPlay/);
  assert.match(designPage, /playsInline/);
  assert.match(designPage, /controls/);
  assert.match(designPage, /3D design walkthrough/);
});

test("keeps the internal concept email contract and Sales recipient wired", () => {
  assert.match(apiRoute, /Sales@coveandstonepools\.com/);
  assert.match(apiRoute, /attachments/);
  assert.match(apiRoute, /concept\.svg/);
  assert.match(apiRoute, /connectors\.proxy\("resend", "\/emails"/);
  assert.match(apiSpec, /\/design-concepts\/email:/);
  assert.match(apiSpec, /DesignConceptEmailRequest/);
});