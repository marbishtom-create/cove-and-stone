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

test('keeps the consultation CTA brand-led and free of the round icon badge', () => {
  assert.match(layoutSource, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layoutSource, /data-testid="link-mobile-appointment-cta"/);
  assert.equal(
    (layoutSource.match(/Start your project today/g) ?? []).length,
    2,
    'desktop and mobile CTAs should use the same direct call to action',
  );
  assert.doesNotMatch(layoutSource, /layout-appointment-cta__icon|<Waves\b/);
  assert.match(layoutSource, /<ArrowUpRight\b/);
});

test('keeps the project-detail CTA in the page flow instead of over its copy', () => {
  assert.match(
    layoutSource,
    /\{!location\.startsWith\("\/projects\/"\) && \(\s*<div className=\{`fixed bottom-6/,
  );
  assert.match(projectDetailSource, /data-testid="link-project-detail-appointment-cta"/);
});

test('animates a saturated horizontal water sweep over the stone surface', () => {
  assert.match(ctaStyles, /linear-gradient\(135deg, #f3ecdc 0%, #cfc4af 46%, #e9dfcc 100%\)/);
  assert.match(ctaStyles, /linear-gradient\(108deg, #075c78 0%, #008d93 22%, #11b8aa 43%, #67ead0 54%, #078c93 72%, #095c7b 100%\)/);
  assert.match(ctaStyles, /@keyframes cove-water-current/);
  assert.match(ctaStyles, /@keyframes cove-water-glint/);
  assert.match(ctaStyles, /@media \(prefers-reduced-motion: reduce\)/);
});