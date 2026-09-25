import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const showroomSourcePath = resolve(artifactRoot, 'src/pages/showroom.tsx');
const showroomSource = await readFile(showroomSourcePath, 'utf8');

const approvedAltText =
  'Cove & Stone Jacksonville showroom display with a central pool, stone finish walls and lounge seating';
const approvedCaption = 'Cove & Stone Jacksonville showroom';
const minimumDesktopWidth = 1440;
const minimumDesktopHeight = 1000;

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

  throw new Error('Could not read JPEG dimensions from the showroom asset');
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

function getShowroomAssetPath(importName) {
  const importMatch = showroomSource.match(
    new RegExp(`import ${importName} from '@assets/([^']+)';`),
  );
  assert.ok(importMatch, `showroom page must import ${importName}`);
  return resolve(artifactRoot, '..', '..', 'attached_assets', importMatch[1]);
}

test('serves the approved showroom photo at mobile and desktop resolutions', async () => {
  const desktopAssetPath = getShowroomAssetPath('showroomPhotoDesktop');
  const mobileAssetPath = getShowroomAssetPath('showroomPhotoMobile');

  await assert.doesNotReject(
    () => access(desktopAssetPath),
    `desktop showroom asset is missing: ${desktopAssetPath}`,
  );
  await assert.doesNotReject(
    () => access(mobileAssetPath),
    `mobile showroom asset is missing: ${mobileAssetPath}`,
  );

  const desktopDimensions = readImageDimensions(await readFile(desktopAssetPath));
  assert.ok(
    desktopDimensions.width >= minimumDesktopWidth,
    `desktop showroom asset width must be at least ${minimumDesktopWidth}px, got ${desktopDimensions.width}px`,
  );
  assert.ok(
    desktopDimensions.height >= minimumDesktopHeight,
    `desktop showroom asset height must be at least ${minimumDesktopHeight}px, got ${desktopDimensions.height}px`,
  );

  const mobileDimensions = readImageDimensions(await readFile(mobileAssetPath));
  assert.ok(
    mobileDimensions.width < minimumDesktopWidth,
    `mobile showroom asset should be smaller than ${minimumDesktopWidth}px, got ${mobileDimensions.width}px`,
  );
  assert.ok(
    mobileDimensions.width >= 320,
    `mobile showroom asset should remain readable at 320px wide, got ${mobileDimensions.width}px`,
  );
});

test('uses the mobile showroom source below the desktop breakpoint', () => {
  assert.match(
    showroomSource,
    /<picture>\s*<source media="\(max-width: 767px\)" srcSet=\{showroomPhotoMobile\}/,
  );
  assert.match(showroomSource, /<img\s+src=\{showroomPhotoDesktop\}/);
});

test('uses the supplied Jacksonville showroom image and gives it slightly more room', () => {
  assert.match(showroomSource, /IMG_8065_1790307659407-showroom-desktop\.jpg/);
  assert.match(showroomSource, /IMG_8065_1790307659407-showroom-mobile\.jpg/);
  assert.match(showroomSource, /lg:grid-cols-\[1\.08fr_0\.92fr\]/);
});

test('keeps the approved showroom accessibility text and visible caption', () => {
  assert.match(
    showroomSource,
    new RegExp(`alt="${approvedAltText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`),
  );
  assert.match(
    showroomSource,
    new RegExp(approvedCaption.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
  );
});

test('includes the supplied showroom gallery photos at their source resolution', async () => {
  const galleryPhotos = [
    { importName: 'showroomLoungeDisplay', width: 676, height: 506 },
    { importName: 'showroomEquipmentDisplay', width: 676, height: 506 },
    { importName: 'showroomOutdoorKitchen', width: 676, height: 506 },
  ];

  for (const photo of galleryPhotos) {
    const assetPath = getShowroomAssetPath(photo.importName);
    await assert.doesNotReject(
      () => access(assetPath),
      `showroom gallery asset is missing: ${assetPath}`,
    );
    assert.deepEqual(readImageDimensions(await readFile(assetPath)), {
      width: photo.width,
      height: photo.height,
    });
  }

  assert.match(showroomSource, /Equipment supplier: Gorman Company/);
  assert.match(showroomSource, /loading="lazy"/);
});