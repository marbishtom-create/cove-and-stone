import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const logoSource = await readFile(
  resolve(artifactRoot, 'src/components/ui/logo.tsx'),
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
  { name: 'mobile', width: 'w-\\[92px\\]' },
  { name: 'desktop', width: 'md:w-\\[104px\\]' },
];

test('uses the complete transparent logo lockup in the header', () => {
  assert.match(logoSource, /src="\/brand\/cove-and-stone-approved\.png"/);
  assert.doesNotMatch(logoSource, /cove-and-stone-(monogram|wordmark-exact)\.png/);
  assert.match(logoSource, /bg-transparent/);
  assert.match(logoSource, /data-logo-variant=\{variant\}/);
});

test('keeps the logo aspect ratio stable across mobile and desktop widths', () => {
  assert.match(
    logoSource,
    /className=\{`block w-\[92px\] h-auto object-contain md:w-\[104px\]/,
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
    /<Logo\s+variant=\{isScrolled \? 'light' : 'default'\}(?:\s+imageClassName="[^"]+")?\s+\/>/,
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
    /<Logo\s+variant=\{isScrolled \? 'light' : 'default'\}\s+imageClassName="w-\[96px\] md:w-\[128px\]"\s+\/>/,
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
    /<Logo\s+variant=\{isScrolled \? 'light' : 'default'\}(?:\s+imageClassName="[^"]+")?\s+\/>/,
  );
  assert.match(
    layoutSource,
    /'bg-background\/90 backdrop-blur-md border-b border-border py-2'/,
  );
});