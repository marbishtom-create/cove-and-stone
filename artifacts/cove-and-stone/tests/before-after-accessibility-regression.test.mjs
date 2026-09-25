import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/ui/before-after.tsx", import.meta.url),
  "utf8",
);

test("before-and-after comparison is keyboard and screen-reader accessible", () => {
  assert.match(source, /role="slider"/);
  assert.match(source, /tabIndex=\{0\}/);
  assert.match(source, /aria-valuemin=\{0\}/);
  assert.match(source, /aria-valuemax=\{100\}/);
  assert.match(source, /aria-valuenow=\{Math\.round\(sliderPosition\)\}/);
  assert.match(source, /case 'ArrowLeft'/);
  assert.match(source, /case 'ArrowRight'/);
  assert.match(source, /case 'Home'/);
  assert.match(source, /case 'End'/);
  assert.match(source, /touch-pan-y/);
});

test("before-and-after comparison keeps the image width valid at both endpoints", () => {
  assert.match(source, /sliderPosition === 0 \? 100 : 10000 \/ sliderPosition/);
  assert.match(source, /if \(rect\.width <= 0\) return/);
  assert.doesNotMatch(source, /100\s*\/\s*\(\s*sliderPosition\s*\/\s*100\s*\)/);
});