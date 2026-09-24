import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const logoSource = await readFile(
  resolve(artifactRoot, 'src/components/ui/logo.tsx'),
  'utf8',
);
const logoAsset = await readFile(
  resolve(artifactRoot, 'public/brand/cove-and-stone-approved.png'),
);
const whiteLogoAsset = await readFile(
  resolve(artifactRoot, 'public/brand/cove-and-stone-approved-white.png'),
);
const waterMaskAsset = await readFile(
  resolve(artifactRoot, 'public/brand/cove-and-stone-water-mask.png'),
);
const logoMotionStyles = await readFile(
  resolve(artifactRoot, 'src/components/ui/logo-motion.css'),
  'utf8',
);
const layoutSource = await readFile(
  resolve(artifactRoot, 'src/components/layout/layout.tsx'),
  'utf8',
);
const appSource = await readFile(resolve(artifactRoot, 'src/App.tsx'), 'utf8');

const representativeInteriorRoutes = [
  { path: '/pools/', component: 'Pools' },
  { path: '/showroom/', component: 'Showroom' },
  { path: '/contact/', component: 'Contact' },
];
const headerViewports = [
  { name: 'mobile', width: 'w-\\[122px\\]' },
  { name: 'desktop', width: 'md:w-\\[137px\\]' },
];

test('uses the complete transparent logo lockup in the header', () => {
  assert.match(logoSource, /src=\{imageSource\}/);
  assert.match(logoSource, /cove-and-stone-approved\.png/);
  assert.match(logoSource, /cove-and-stone-approved-white\.png/);
  assert.match(logoSource, /alt="Cove & Stone Pools, Spas & Outdoor Living"/);
  assert.doesNotMatch(logoSource, /cove-and-stone-(monogram|wordmark-exact)\.png/);
  assert.match(logoSource, /bg-transparent/);
  assert.match(logoSource, /data-logo-variant=\{variant\}/);
});

test('keeps the full logo lockup cropped and transparent', () => {
  assert.equal(logoAsset.toString('ascii', 1, 4), 'PNG');
  assert.equal(logoAsset[25], 6, 'the logo should retain transparency');
  const width = logoAsset.readUInt32BE(16);
  const height = logoAsset.readUInt32BE(20);
  assert.ok(width > height, 'the complete horizontal lockup should remain intact');
  assert.ok(width / height < 1.5, 'the logo should not be cropped down to the wordmark');
  assert.equal(whiteLogoAsset.toString('ascii', 1, 4), 'PNG');
  assert.ok([4, 6].includes(whiteLogoAsset[25]), 'the white logo should retain transparency');
  const whiteWidth = whiteLogoAsset.readUInt32BE(16);
  const whiteHeight = whiteLogoAsset.readUInt32BE(20);
  assert.ok(whiteWidth > whiteHeight, 'the white lockup should retain its full composition');
});

test('animates the logo water without rebuilding the approved lockup', () => {
  assert.match(logoSource, /src=\{imageSource\}/);
  assert.match(logoSource, /data-logo-water-motion=\{variant === "dark" \? undefined : "active"\}/);
  assert.match(logoMotionStyles, /cove-and-stone-water-mask\.png/);
  assert.match(logoMotionStyles, /@keyframes cove-logo-water-flow/);
  assert.match(logoMotionStyles, /@keyframes cove-logo-water-glint/);
  assert.match(logoMotionStyles, /prefers-reduced-motion: reduce/);

  const width = waterMaskAsset.readUInt32BE(16);
  const height = waterMaskAsset.readUInt32BE(20);
  assert.equal(width, logoAsset.readUInt32BE(16));
  assert.equal(height, logoAsset.readUInt32BE(20));
  assert.ok([4, 6].includes(waterMaskAsset[25]), 'the water mask should retain transparency');
});

test('keeps the logo aspect ratio stable across mobile and desktop widths', () => {
  assert.match(
    logoSource,
    /w-\[122px\] md:w-\[137px\]/,
  );
  assert.match(logoSource, /data-testid="site-logo-image"/);
});

test('covers the complete lockup on representative interior routes at both viewport sizes', () => {
  for (const route of representativeInteriorRoutes) {
    assert.match(
      appSource,
      new RegExp(
        `<Route path="${route.path.replace('/', '\\/')}" component=\\{${route.component}\\} \\/>`,
      ),
      `${route.path} should use the shared layout route`,
    );
  }

  assert.match(layoutSource, /data-testid="site-header"/);
  assert.match(
    layoutSource,
    /<Logo\s+variant=\{headerLogoVariant\}\s+imageClassName="w-\[127px\] md:w-\[169px\]"\s+\/>/,
  );

  for (const viewport of headerViewports) {
    assert.match(
      logoSource,
      new RegExp(viewport.width),
      `${viewport.name} header should preserve the approved lockup width`,
    );
  }
});

test('keeps the hero and scrolled header states explicit', () => {
  assert.match(layoutSource, /data-header-state=\{isScrolled \? 'scrolled' : 'hero'\}/);
  assert.match(layoutSource, /data-mobile-menu-state=\{mobileMenuOpen \? 'open' : 'closed'\}/);
  assert.match(
    layoutSource,
    /mobileMenuOpen \|\| isScrolled\s+\?[\s\S]*?'bg-background\/90 backdrop-blur-md border-b border-border py-2'\s*:\s*'bg-background\/95 backdrop-blur-md border-b border-border py-1 lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:py-2'/,
  );
  assert.match(layoutSource, /setIsScrolled\(window\.scrollY > 50\)/);
});

test('keeps photo-backed headers in color and uses the white lockup in the dark footer', () => {
  assert.match(logoSource, /<source\s+media="\(min-width: 1024px\)"\s+srcSet="\/brand\/cove-and-stone-approved-white\.png"/);
  assert.match(
    layoutSource,
    /const headerLogoVariant =\s*isScrolled \|\| mobileMenuOpen\s*\?\s*"light"\s*:\s*"default";/,
  );
  assert.doesNotMatch(layoutSource, /isDarkHeroPage|variant="hero"/);
  assert.match(layoutSource, /<Logo variant="dark" \/>/);
});

test('enlarges the shared logo and outdoor-living watermark', async () => {
  assert.match(logoSource, /w-\[122px\] md:w-\[137px\]/);
  assert.match(layoutSource, /w-\[127px\] md:w-\[169px\]/);
  const outdoorLivingSource = await readFile(
    resolve(artifactRoot, 'src/pages/outdoor-living.tsx'),
    'utf8',
  );
  assert.match(outdoorLivingSource, /w-\[32%\] min-w-\[6\.6rem\] max-w-\[10\.5rem\]/);
  assert.match(outdoorLivingSource, /src="\/brand\/cove-and-stone-approved-white\.png"/);
});

test('keeps the complete logo readable while the mobile menu opens and closes', () => {
  assert.match(layoutSource, /data-testid="mobile-menu-toggle"/);
  assert.match(layoutSource, /aria-controls="mobile-navigation"/);
  assert.match(layoutSource, /aria-expanded=\{mobileMenuOpen\}/);
  assert.match(
    layoutSource,
    /aria-label=\{mobileMenuOpen \? 'Close navigation menu' : 'Open navigation menu'\}/,
  );
  assert.match(layoutSource, /id="mobile-navigation"/);
  assert.match(layoutSource, /data-testid="mobile-menu-overlay"/);
  assert.match(
    layoutSource,
    /data-mobile-menu-state=\{mobileMenuOpen \? 'open' : 'closed'\}/g,
  );
  assert.match(
    layoutSource,
    /mobileMenuOpen \? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'/,
  );
  assert.match(
    layoutSource,
    /<Logo\s+variant=\{headerLogoVariant\}\s+imageClassName="w-\[127px\] md:w-\[169px\]"\s+\/>/,
  );
});

test('closes the mobile menu with Escape and restores focus to the toggle', () => {
  assert.match(
    layoutSource,
    /wasMobileMenuOpenRef\.current = true;[\s\S]*?firstMobileLinkRef\.current\?\.focus\(\{ preventScroll: true \}\);/,
    'opening the menu should move focus into the navigation',
  );
  assert.match(
    layoutSource,
    /const handleKeyDown = \(event: KeyboardEvent\) => \{[\s\S]*?if \(event\.key === 'Escape'\) \{[\s\S]*?setMobileMenuOpen\(false\);/,
    'Escape should close the mobile menu',
  );
  assert.match(
    layoutSource,
    /document\.addEventListener\('keydown', handleKeyDown\);[\s\S]*?document\.removeEventListener\('keydown', handleKeyDown\);/,
    'the Escape listener should only be active while the menu is open',
  );
  assert.match(
    layoutSource,
    /if \(!mobileMenuOpen\) \{[\s\S]*?if \(wasMobileMenuOpenRef\.current\) \{[\s\S]*?mobileMenuToggleRef\.current\?\.focus\(\{ preventScroll: true \}\);/,
    'closing the menu should return focus to its toggle',
  );
  assert.match(
    layoutSource,
    /mobileMenuOpen \? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'/,
    'the closed state should hide and disable the overlay',
  );
});

test('locks document scrolling only while the mobile menu is open', () => {
  assert.match(
    layoutSource,
    /const previousBodyOverflow = document\.body\.style\.overflow;\s*document\.body\.style\.overflow = 'hidden';/,
    'opening the mobile menu should prevent the page from scrolling behind it',
  );
  assert.match(
    layoutSource,
    /return \(\) => \{[\s\S]*?document\.body\.style\.overflow = previousBodyOverflow;[\s\S]*?document\.removeEventListener\('keydown', handleKeyDown\);[\s\S]*?\};/,
    'closing the mobile menu should restore the previous body overflow value',
  );
});

test('resets the header state when navigating between interior routes', () => {
  assert.match(
    layoutSource,
    /setMobileMenuOpen\(false\);\s*setIsScrolled\(false\);\s*window\.scrollTo\(0, 0\);/,
  );
  assert.match(
    layoutSource,
    /<Logo\s+variant=\{headerLogoVariant\}\s+imageClassName="w-\[127px\] md:w-\[169px\]"\s+\/>/,
  );
  assert.match(
    layoutSource,
    /'bg-background\/90 backdrop-blur-md border-b border-border py-2'/,
  );
});