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
  { path: '/pools', component: 'Pools' },
  { path: '/showroom', component: 'Showroom' },
  { path: '/contact', component: 'Contact' },
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
    /className="block w-\[92px\] h-auto object-contain md:w-\[104px\]/,
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
  assert.match(layoutSource, /<Logo variant=\{isScrolled \? 'light' : 'default'\} \/>/);

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
  assert.match(
    layoutSource,
    /isScrolled\s+\?[\s\S]*?'bg-background\/90 backdrop-blur-md border-b border-border py-2'\s*:\s*'bg-transparent py-2'/,
  );
  assert.match(layoutSource, /setIsScrolled\(window\.scrollY > 50\)/);
});

test('resets the header state when navigating between interior routes', () => {
  assert.match(
    layoutSource,
    /setMobileMenuOpen\(false\);\s*setIsScrolled\(false\);\s*window\.scrollTo\(0, 0\);/,
  );
  assert.match(
    layoutSource,
    /<Logo variant=\{isScrolled \? 'light' : 'default'\} \/>/,
  );
  assert.match(
    layoutSource,
    /'bg-background\/90 backdrop-blur-md border-b border-border py-2'/,
  );
});