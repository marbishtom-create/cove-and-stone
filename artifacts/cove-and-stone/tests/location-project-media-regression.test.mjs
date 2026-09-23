import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const attachedAssetsRoot = resolve(artifactRoot, '..', '..', 'attached_assets');
const locationSource = await readFile(
  resolve(artifactRoot, 'src/pages/location.tsx'),
  'utf8',
);
const projectsSource = await readFile(
  resolve(artifactRoot, 'src/pages/projects.tsx'),
  'utf8',
);
const projectDetailSource = await readFile(
  resolve(artifactRoot, 'src/pages/project-detail.tsx'),
  'utf8',
);
const beforeAfterSource = await readFile(
  resolve(artifactRoot, 'src/components/ui/before-after.tsx'),
  'utf8',
);

const minimumFeatureImageWidth = 1024;
const minimumFeatureImageHeight = 768;
const approvedLocationAsset = 'generated_images/hero-pool.jpg';
const approvedLocationConceptAlt =
  'Concept visualization of a modern pool and outdoor-living environment';
const approvedLocationLabel = 'Pool Builder';
const approvedProjectMedia = [
  {
    importName: 'ponteVedraRetreat',
    asset: 'generated_images/ponte-vedra-private-retreat.png',
    mobileImportName: 'ponteVedraRetreatMobile',
    mobileAsset: 'generated_images/ponte-vedra-private-retreat-mobile.jpg',
    alt: 'Illustrative pool concept with a privacy wall, palms and live oak',
    label: 'Concept rendering',
  },
  {
    importName: 'p2',
    asset: 'generated_images/project-2.jpg',
    mobileImportName: 'p2Mobile',
    mobileAsset: 'generated_images/project-2-mobile.jpg',
    alt: 'Illustrative curved pool concept with a raised spa and fire features',
    label: 'Concept rendering',
  },
  {
    importName: 'conceptNight',
    asset: 'BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed.png',
    mobileImportName: 'conceptNightMobile',
    mobileAsset: 'BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed-mobile.jpg',
    alt: 'Illustrative resort-style backyard concept with a cabana and pool',
    label: 'Concept rendering',
  },
  {
    importName: 'p4',
    asset: 'generated_images/project-4.jpg',
    mobileImportName: 'p4Mobile',
    mobileAsset: 'generated_images/project-4-mobile.jpg',
    alt: 'Illustrative compact plunge-pool concept with a linear fire feature',
    label: 'Concept rendering',
  },
];

function readJpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8);

  let offset = 2;
  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) break;
    const segmentLength = buffer.readUInt16BE(offset);

    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  throw new Error('Could not read JPEG dimensions from the media asset');
}

function readImageDimensions(buffer) {
  const pngSignature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') === pngSignature) {
    return {
      height: buffer.readUInt32BE(20),
      width: buffer.readUInt32BE(16),
    };
  }

  return readJpegDimensions(buffer);
}

function getImportedAssetPath(source, importName) {
  const importMatch = source.match(
    new RegExp(`import ${importName} from '@assets/([^']+)';`),
  );
  assert.ok(importMatch, `page must import ${importName}`);
  return resolve(attachedAssetsRoot, importMatch[1]);
}

async function assertFeatureAsset(importedAssetPath, description) {
  await assert.doesNotReject(
    () => access(importedAssetPath),
    `${description} asset is missing: ${importedAssetPath}`,
  );

  const dimensions = readImageDimensions(await readFile(importedAssetPath));
  assert.ok(
    dimensions.width >= minimumFeatureImageWidth,
    `${description} asset width must be at least ${minimumFeatureImageWidth}px, got ${dimensions.width}px`,
  );
  assert.ok(
    dimensions.height >= minimumFeatureImageHeight,
    `${description} asset height must be at least ${minimumFeatureImageHeight}px, got ${dimensions.height}px`,
  );
}

async function assertMobileAsset(importedAssetPath, description) {
  await assert.doesNotReject(
    () => access(importedAssetPath),
    `${description} mobile asset is missing: ${importedAssetPath}`,
  );

  const dimensions = readImageDimensions(await readFile(importedAssetPath));
  assert.ok(
    dimensions.width >= 320,
    `${description} mobile asset should remain readable at 320px wide, got ${dimensions.width}px`,
  );
  assert.ok(
    dimensions.width < minimumFeatureImageWidth,
    `${description} mobile asset should be smaller than ${minimumFeatureImageWidth}px, got ${dimensions.width}px`,
  );
}

test('keeps the location hero asset, approved accessibility text, and visible label', async () => {
  const locationAssetPath = getImportedAssetPath(locationSource, 'heroImg');
  assert.equal(
    locationAssetPath,
    resolve(attachedAssetsRoot, approvedLocationAsset),
    'location hero must keep the approved asset',
  );
  await assertFeatureAsset(locationAssetPath, 'location hero');

  assert.match(locationSource, /<img\s+[\s\S]*src=\{heroImg\}/);
  assert.match(
    locationSource,
     new RegExp(
       `alt="\\${approvedLocationConceptAlt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
     ),
  );
  assert.doesNotMatch(
    locationSource,
    /Custom pools in \$\{locationInfo\.name\}/,
    'generic concept imagery must not claim a location-specific completed project',
  );
  assert.match(
    locationSource,
    new RegExp(`<br\\s*\\/?>\\s*${approvedLocationLabel}`),
  );
});

test('keeps every project card asset at its approved resolution and copy', async () => {
  for (const projectMedia of approvedProjectMedia) {
    const projectAssetPath = getImportedAssetPath(
      projectsSource,
      projectMedia.importName,
    );
    assert.equal(
      projectAssetPath,
      resolve(attachedAssetsRoot, projectMedia.asset),
      `${projectMedia.importName} must keep its approved asset`,
    );
    await assertFeatureAsset(projectAssetPath, `${projectMedia.importName} project`);

    const mobileAssetPath = getImportedAssetPath(
      projectsSource,
      projectMedia.mobileImportName,
    );
    assert.equal(
      mobileAssetPath,
      resolve(attachedAssetsRoot, projectMedia.mobileAsset),
      `${projectMedia.mobileImportName} must point to the approved project variant`,
    );
    await assertMobileAsset(mobileAssetPath, `${projectMedia.importName} project`);

    assert.match(
      projectsSource,
     new RegExp(
       `alt: "${projectMedia.alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
     ),
      `${projectMedia.importName} must keep its approved alt text`,
    );
    assert.match(
      projectsSource,
      new RegExp(
        `label: "${projectMedia.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
      ),
      `${projectMedia.importName} must keep its approved visible label`,
    );
  }
});

test('renders the approved project media copy on each card', () => {
  assert.match(
    projectsSource,
    /const cardMedia = project\.status === "completed" && project\.media\.completedDay/,
  );
  assert.match(projectsSource, /src=\{cardMedia\.src\}/);
  assert.match(projectsSource, /alt=\{cardMedia\.alt\}/);
   assert.match(
     projectsSource,
     /\{project\.status === "completed" \? cardMedia\.label : "Illustrative concept"\}/,
   );
   assert.match(projectsSource, /label: "Concept rendering"/);
   assert.doesNotMatch(
     projectsSource,
     /copy: "Private Ponte Vedra concept direction"/,
     'project media must not reuse a mismatched location label',
   );
});

test('uses responsive sources for project cards and detail-page media', () => {
  assert.match(
    projectsSource,
    /<picture>\s*<source media="\(max-width: 767px\)" srcSet=\{cardMedia\.mobileSrc\}/,
  );
  assert.match(projectsSource, /<img\s+[\s\S]*src=\{cardMedia\.src\}/);

  assert.match(
    projectDetailSource,
    /<picture>\s*<source media="\(max-width: 767px\)" srcSet=\{heroMedia\.mobileSrc\}/,
  );
  assert.match(projectDetailSource, /srcSet=\{mobileSrc\}/);
  assert.match(projectDetailSource, /beforeMobileImage=\{project\.media\.before\.mobileSrc\}/);
  assert.match(projectDetailSource, /afterMobileImage=\{/);

  assert.match(beforeAfterSource, /srcSet=\{afterMobileImage\}/);
  assert.match(beforeAfterSource, /srcSet=\{beforeMobileImage\}/);
});