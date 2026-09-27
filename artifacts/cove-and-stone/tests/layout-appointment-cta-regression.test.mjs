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
const waterMask = await readFile(
  resolve(artifactRoot, 'public/brand/appointment-cta-water-mask.svg'),
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

test('uses the shared consultation CTA surface and reference art', () => {
  assert.match(layoutSource, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layoutSource, /data-testid="link-mobile-appointment-cta"/);
  assert.match(layoutSource, /className="layout-appointment-cta__dock fixed z-50 hidden lg:flex"/);
  assert.match(layoutSource, /className="layout-appointment-cta w-full"/);
  assert.equal(
    (layoutSource.match(/Start your project today/g) ?? []).length,
    3,
    'desktop, menu, and sticky mobile CTAs should use the same direct call to action',
  );
  assert.equal((layoutSource.match(/<AppointmentCtaSurface \/>/g) ?? []).length, 3);
  assert.doesNotMatch(layoutSource, /<AppointmentCtaArrow \/>/);
  assert.match(ctaElements, /src="\/brand\/appointment-cta-reference-arrow-small\.png"/);
  assert.match(ctaElements, /className="layout-appointment-cta__duck-medallion"/);
  assert.match(ctaElements, /className="layout-appointment-cta__duck-art"/);
  assert.match(ctaStyles, /aspect-ratio:\s*2007\s*\/\s*420/);
  assert.match(ctaStyles, /width: min\(19\.9584rem, calc\(100\.8vw - 5\.04rem\)\)/);
  assert.match(ctaStyles, /right: max\(0\.75rem, env\(safe-area-inset-right\)\)/);
  assert.match(ctaStyles, /container-type: inline-size/);
});

test('keeps the project-detail CTA in the page flow instead of over its copy', () => {
  assert.match(layoutSource, /\{location === "\/" && \(/);
  assert.match(projectDetailSource, /data-testid="link-project-detail-appointment-cta"/);
  assert.match(projectDetailSource, /layout-appointment-cta--compact-mobile/);
  assert.match(projectDetailSource, /max-w-\[18\.27rem\] sm:max-w-\[24\.948rem\]/);
  assert.equal((projectDetailSource.match(/<AppointmentCtaSurface \/>/g) ?? []).length, 1);
  assert.doesNotMatch(projectDetailSource, /<AppointmentCtaArrow \/>/);
  assert.match(projectDetailSource, /Start your project today/);
  assert.match(ctaStyles, /\.layout-appointment-cta__dock \{[\s\S]*?right: max\(0\.75rem, env\(safe-area-inset-right\)\)/);
});

test('keeps the mobile CTA fixed at the homepage bottom-right only', () => {
  assert.match(layoutSource, /\{location === "\/" && !mobileMenuOpen && \(/);
  assert.match(layoutSource, /className="layout-appointment-cta__dock layout-appointment-cta__dock--mobile fixed z-50 lg:hidden"/);
  assert.match(layoutSource, /data-testid="link-mobile-sticky-appointment-cta"/);
  assert.doesNotMatch(layoutSource, /data-cta-location|mobileStickyCtaVisible|IntersectionObserver/);
  assert.match(ctaStyles, /\.layout-appointment-cta__dock--mobile \{/);
  assert.match(ctaStyles, /bottom: max\(0\.375rem, env\(safe-area-inset-bottom\)\)/);
  assert.match(ctaStyles, /left: auto/);
  assert.match(ctaStyles, /width: min\(15\.12rem, calc\(100\.8vw - 1\.512rem\)\)/);
  assert.match(layoutSource, /layout-appointment-cta layout-appointment-cta--compact-mobile w-full/);
  assert.match(ctaStyles, /right: max\(0\.75rem, env\(safe-area-inset-right\)\)/);
  assert.doesNotMatch(layoutSource, /mobileStickyCtaVisible|IntersectionObserver/);
  assert.match(homeSource, /pt-\[6rem\] lg:h-\[100dvh\]/);
  assert.match(homeSource, /pt-\[1\.25rem\] pb-20/);
  assert.match(homeSource, /mb-8 lg:mb-12 font-light/);
});

test('makes only the sticky mobile CTA 10% taller and keeps its water flow contained', () => {
  assert.match(
    ctaStyles,
    /\.layout-appointment-cta__dock--mobile \.layout-appointment-cta \{\s*aspect-ratio:\s*2007\s*\/\s*462;/,
  );
  assert.doesNotMatch(
    ctaStyles,
    /^\.layout-appointment-cta \{\s*aspect-ratio:\s*2007\s*\/\s*462;/m,
  );
  assert.match(
    ctaStyles,
    /\.layout-appointment-cta__dock--mobile \.layout-appointment-cta::before \{[\s\S]*?animation-duration:\s*8s;[\s\S]*?radial-gradient\(ellipse 30% 34% at 22% 82%/,
  );
  assert.match(
    ctaStyles,
    /\.layout-appointment-cta__dock--mobile \.layout-appointment-cta::after \{\s*animation-duration:\s*7s;/,
  );
  assert.match(
    ctaStyles,
    /\.layout-appointment-cta__dock--mobile \.layout-appointment-cta__reference-art,[\s\S]*?clip-path:\s*inset\(0 round 9999px\)/,
  );
  assert.match(ctaStyles, /mask-size:\s*100% 100%/);
  assert.match(waterMask, /L2007 420[\s\S]*?Z/);
});

test('keeps water motion inside the masked area and honors reduced motion', () => {
  assert.match(ctaStyles, /appointment-cta-water-mask\.svg/);
  assert.match(waterMask, /<path/);
  assert.match(ctaStyles, /cove-cta-water-flow 6s linear infinite/);
  assert.match(ctaStyles, /cove-cta-water-glint 4s linear infinite/);
  assert.match(ctaStyles, /\.layout-appointment-cta__sparkle--one/);
  assert.match(ctaStyles, /\.layout-appointment-cta__sparkle--two/);
  assert.match(ctaStyles, /\.layout-appointment-cta:hover \.layout-appointment-cta__duck-medallion/);
  assert.match(ctaStyles, /transition-delay:\s*3s/);
  assert.match(ctaStyles, /@media \(prefers-reduced-motion: reduce\)/);
});