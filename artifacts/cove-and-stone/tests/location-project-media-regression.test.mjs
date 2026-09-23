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

const minimumFeatureImageWidth = 1024;
const minimumFeatureImageHeight = 768;
const approvedLocationAsset = 'generated_images/hero-pool.jpg';
const approvedLocationAltTemplate = 'Custom pools in ${locationInfo.name}';
const approvedLocationLabel = 'Pool Builder';
const approvedProjectMedia = [
  {
    importName: 'ponteVedraRetreat',
    asset: 'generated_images/ponte-vedra-private-retreat.png',
    alt: 'Private Ponte Vedra Beach backyard pool concept with a privacy wall, palms and live oak',
    label: 'Concept rendering',
  },
  {
    importName: 'p2',
    asset: 'generated_images/project-2.jpg',
    alt: 'Concept visualization of the Jacksonville Waterfront pool',
    label: 'Concept rendering',
  },
  {
    importName: 'conceptNight',
    asset: 'BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed.png',
    alt: 'Concept visualization of the Nocatee Resort Backyard',
    label: 'Concept rendering',
  },
  {
    importName: 'p4',
    asset: 'generated_images/project-4.jpg',
    alt: 'Concept visualization of the Atlantic Beach Minimalist pool',
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
      `alt=\\{\\\`${approvedLocationAltTemplate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\\`\\}`,
    ),
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
  assert.match(projectsSource, /\{cardMedia\.label\}/);
});