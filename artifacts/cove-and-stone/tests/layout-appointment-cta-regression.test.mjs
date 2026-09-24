import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const layoutSource = await readFile(
  resolve(artifactRoot, 'src/components/layout/layout.tsx'),
  'utf8',
);
const ctaStyles = await readFile(
  resolve(artifactRoot, 'src/components/layout/appointment-cta.css'),
  'utf8',
);
const waterTexture = await readFile(
  resolve(artifactRoot, 'public/brand/cove-water-caustics.svg'),
  'utf8',
);
const projectDetailSource = await readFile(
  resolve(artifactRoot, 'src/pages/project-detail.tsx'),
  'utf8',
);

test('matches the consultation CTA reference with a round teal arrow badge', () => {
  assert.match(layoutSource, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layoutSource, /data-testid="link-mobile-appointment-cta"/);
  assert.match(layoutSource, /min-h-\[4\.35rem\] w-\[19\.8rem\]/);
  assert.match(layoutSource, /mx-auto min-h-\[4\.5rem\] w-\[90%\]/);
  assert.equal(
    (layoutSource.match(/Start your project today/g) ?? []).length,
    2,
    'desktop and mobile CTAs should use the same direct call to action',
  );
  assert.doesNotMatch(layoutSource, /<Waves\b/);
  assert.equal((layoutSource.match(/layout-appointment-cta__arrow-shell/g) ?? []).length, 2);
  assert.match(layoutSource, /<ArrowRight\b/);
});

test('keeps the project-detail CTA in the page flow instead of over its copy', () => {
  assert.match(
    layoutSource,
    /\{!location\.startsWith\("\/projects\/"\) && \(\s*<div className=\{`fixed bottom-6/,
  );
  assert.match(projectDetailSource, /data-testid="link-project-detail-appointment-cta"/);
  assert.match(projectDetailSource, /w-\[19\.8rem\] max-w-\[90%\]/);
});

test('animates a saturated horizontal water sweep over the stone surface', () => {
  assert.match(ctaStyles, /url\("\/brand\/cove-stone-button-texture\.webp"\)/);
  assert.match(ctaStyles, /url\("\/brand\/cove-water-caustics\.svg"\)/);
  assert.match(waterTexture, /<path/);
  assert.match(waterTexture, /<circle/);
  assert.match(ctaStyles, /background-blend-mode: normal, normal, normal, normal, normal/);
  assert.match(ctaStyles, /linear-gradient\(115deg, #f7f8f6 0%, #f8f8f6 69%, #eee7da 100%\)/);
  assert.match(ctaStyles, /linear-gradient\(108deg, #078e9e 0%, #10c1c6 34%, #2bd2cb 53%, #0799a7 100%\)/);
  assert.match(ctaStyles, /@keyframes cove-water-current/);
  assert.match(ctaStyles, /@keyframes cove-water-flow/);
  assert.match(ctaStyles, /@keyframes cove-water-glint/);
  assert.match(ctaStyles, /layout-appointment-cta__arrow-shell/);
  assert.match(ctaStyles, /@media \(prefers-reduced-motion: reduce\)/);
});