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
const homeSource = await readFile(
  resolve(artifactRoot, 'src/pages/home.tsx'),
  'utf8',
);
const ctaElements = await readFile(
  resolve(artifactRoot, 'src/components/layout/appointment-cta-elements.tsx'),
  'utf8',
);

test('matches the consultation CTA reference with a round teal arrow badge', () => {
  assert.match(layoutSource, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layoutSource, /data-testid="link-mobile-appointment-cta"/);
  assert.match(
    layoutSource,
    /className="layout-appointment-cta__dock fixed z-50 hidden .*? lg:flex"/,
  );
  assert.match(layoutSource, /className="layout-appointment-cta min-h-\[4\.1rem\] w-full"/);
  assert.match(layoutSource, /mx-auto min-h-\[4\.1rem\] w-full/);
  assert.equal(
    (layoutSource.match(/Start your project today/g) ?? []).length,
    3,
    'desktop, menu, and sticky mobile CTAs should use the same direct call to action',
  );
  assert.doesNotMatch(layoutSource, /<Waves\b/);
  assert.equal((layoutSource.match(/<AppointmentCtaArrow \/>/g) ?? []).length, 3);
  assert.equal((layoutSource.match(/<AppointmentCtaSurface \/>/g) ?? []).length, 3);
  assert.match(ctaElements, /<ArrowRight\b/);
  assert.match(ctaElements, /className="layout-appointment-cta__duck"/);
  assert.match(ctaElements, /fill="#f4c64b"/);
  assert.match(ctaElements, /fill="#ef9138"/);
  assert.match(ctaElements, /fill="#f9dc82"/);
  assert.match(ctaElements, /circle cx="33\.2" cy="12\.1" r="1\.25" fill="#173943"/);
  assert.match(ctaElements, /d="M 0 40 C 15 39, 28 72, 44 86 C 56 96, 68 88, 79 65 C 84 54, 95 72, 100 83"/);
  assert.match(ctaElements, /stroke="rgba\(255,255,255,\.78\)"/);
  assert.match(ctaElements, /strokeWidth="0\.9"/);
  assert.match(ctaStyles, /aspect-ratio: 4\.82 \/ 1/);
  assert.match(ctaStyles, /width: min\(19\.8rem, calc\(100vw - 5rem\)\)/);
  assert.match(ctaStyles, /padding: 0\.4rem 4% 0\.4rem 17\.5%/);
  assert.match(ctaStyles, /container-type: inline-size/);
  assert.match(ctaStyles, /transition-delay: 3\.05s/);
  assert.match(ctaStyles, /layout-appointment-cta__arrow-shell:hover \.layout-appointment-cta__duck/);
});

test('keeps the project-detail CTA in the page flow instead of over its copy', () => {
  assert.match(layoutSource, /\{!location\.startsWith\("\/projects\/"\) && \(/);
  assert.match(projectDetailSource, /data-testid="link-project-detail-appointment-cta"/);
  assert.match(projectDetailSource, /min-h-\[4\.1rem\] w-full max-w-\[19\.8rem\]/);
  assert.equal((projectDetailSource.match(/<AppointmentCtaSurface \/>/g) ?? []).length, 1);
  assert.equal((projectDetailSource.match(/<AppointmentCtaArrow \/>/g) ?? []).length, 1);
});

test('keeps the mobile CTA fixed at the homepage bottom-right only', () => {
  assert.match(layoutSource, /\{location === "\/" && !mobileMenuOpen && \(/);
  assert.match(
    layoutSource,
    /className="layout-appointment-cta__dock layout-appointment-cta__dock--mobile fixed z-50 .*? lg:hidden"/,
  );
  assert.match(layoutSource, /data-testid="link-mobile-sticky-appointment-cta"/);
  assert.doesNotMatch(layoutSource, /data-cta-location|mobileStickyCtaVisible|IntersectionObserver/);
  assert.match(ctaStyles, /\.layout-appointment-cta__dock--mobile \{/);
  assert.match(ctaStyles, /bottom: max\(0\.75rem, env\(safe-area-inset-bottom\)\)/);
  assert.match(ctaStyles, /left: auto/);
  assert.match(ctaStyles, /width: min\(18rem, calc\(100vw - 1\.5rem\)\)/);
  assert.match(ctaStyles, /right: max\(0\.75rem, env\(safe-area-inset-right\)\)/);
  assert.doesNotMatch(layoutSource, /mobileStickyCtaVisible|IntersectionObserver/);
  assert.match(homeSource, /pt-\[6rem\] lg:h-\[100dvh\]/);
  assert.match(homeSource, /pt-\[1\.25rem\] pb-20/);
  assert.match(homeSource, /mb-8 lg:mb-12 font-light/);
});

test('animates a saturated horizontal water sweep over the stone surface', () => {
  assert.match(ctaStyles, /url\("\/brand\/cove-stone-button-texture\.webp"\)/);
  assert.match(ctaStyles, /url\("\/brand\/cove-water-caustics\.svg"\)/);
  assert.match(waterTexture, /<path/);
  assert.match(waterTexture, /<circle/);
  assert.equal(
    (waterTexture.match(/<circle /g) ?? []).length,
    3,
    'keep only three restrained water glints in the repeating texture',
  );
  assert.match(waterTexture, /stroke-opacity="\.35" stroke-width="\.7"/);
  assert.match(waterTexture, /opacity="\.42"/);
  assert.doesNotMatch(waterTexture, /<path d="M12 4\.5/);
  assert.match(ctaStyles, /background-blend-mode: normal, normal, normal/);
  assert.match(ctaStyles, /linear-gradient\(115deg, #ece7dd 0%, #f5f1e9 64%, #eee6d8 100%\)/);
  assert.match(ctaStyles, /\.layout-appointment-cta__surface[\s\S]*?clip-path: polygon/);
  assert.match(ctaStyles, /linear-gradient\(108deg, #0ea0aa 0%, #16b3b8 18%, #23c9c5 36%, #53ddd1 49%/);
  assert.match(ctaStyles, /rgba\(2, 88, 107, 0\.42\)/);
  assert.match(ctaStyles, /rgba\(111, 239, 221, 0\.46\)/);
  assert.match(ctaStyles, /background-size: 240px 168px, 100% 100%, 240% 100%, 250% 100%/);
  assert.doesNotMatch(ctaStyles, /drop-shadow\(0 -2px 0 rgba\(255, 255, 255/);
  assert.match(ctaStyles, /--appointment-water-mask: polygon/);
  assert.equal(
    (ctaStyles.match(/clip-path: var\(--appointment-water-mask\)/g) ?? []).length,
    2,
    'water color and glint should share the exact same smooth mask',
  );
  assert.match(ctaStyles, /48% 88\.7%,\s*50% 89\.5%,\s*52% 90%,\s*54% 90\.2%/);
  assert.match(ctaStyles, /linear-gradient\(rgba\(255, 255, 255, 0\.16\)/);
  assert.match(ctaStyles, /54% 77\.2%, 52% 77%, 50% 77%/);
  assert.equal(
    (ctaStyles.match(/animation: cove-water-current 7\.2s ease-in-out infinite/g) ?? []).length,
    2,
    'the colored water and its glint should move as one surface',
  );
  assert.match(ctaStyles, /@keyframes cove-water-current/);
  assert.match(ctaStyles, /@keyframes cove-water-flow/);
  assert.match(ctaStyles, /@keyframes cove-water-glint/);
  assert.match(ctaStyles, /layout-appointment-cta__arrow-shell/);
  assert.match(ctaStyles, /@media \(prefers-reduced-motion: reduce\)/);
});