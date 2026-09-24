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
const projectDetailSource = await readFile(
  resolve(artifactRoot, 'src/pages/project-detail.tsx'),
  'utf8',
);

test('matches the consultation CTA reference with a round teal arrow badge', () => {
  assert.match(layoutSource, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layoutSource, /data-testid="link-mobile-appointment-cta"/);
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
});

test('animates a saturated horizontal water sweep over the stone surface', () => {
  assert.match(ctaStyles, /linear-gradient\(115deg, #f7f8f6 0%, #f8f8f6 69%, #eee7da 100%\)/);
  assert.match(ctaStyles, /linear-gradient\(108deg, #0b8d9b 0%, #07aab5 34%, #12b8b7 53%, #0796a3 100%\)/);
  assert.match(ctaStyles, /@keyframes cove-water-current/);
  assert.match(ctaStyles, /@keyframes cove-water-flow/);
  assert.match(ctaStyles, /@keyframes cove-water-glint/);
  assert.match(ctaStyles, /layout-appointment-cta__arrow-shell/);
  assert.match(ctaStyles, /@media \(prefers-reduced-motion: reduce\)/);
});