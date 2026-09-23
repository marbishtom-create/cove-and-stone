import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const artifactRoot = resolve(import.meta.dirname, '..');
const showroomSourcePath = resolve(artifactRoot, 'src/pages/showroom.tsx');
const showroomSource = await readFile(showroomSourcePath, 'utf8');

const approvedAltText =
  'Cove & Stone Jacksonville Design Studio & Showroom with pool finishes, water features and outdoor living displays';
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

function getShowroomAssetPath() {
  const importMatch = showroomSource.match(
    /import showroomPhoto from '@assets\/([^']+)';/,
  );
  assert.ok(importMatch, 'showroom page must import the showroom photo');
  return resolve(artifactRoot, '..', '..', 'attached_assets', importMatch[1]);
}

test('imports an available showroom photo at the intended desktop resolution', async () => {
  const assetPath = getShowroomAssetPath();

  await assert.doesNotReject(
    () => access(assetPath),
    `showroom asset is missing: ${assetPath}`,
  );

  const dimensions = readImageDimensions(await readFile(assetPath));
  assert.ok(
    dimensions.width >= minimumDesktopWidth,
    `showroom asset width must be at least ${minimumDesktopWidth}px, got ${dimensions.width}px`,
  );
  assert.ok(
    dimensions.height >= minimumDesktopHeight,
    `showroom asset height must be at least ${minimumDesktopHeight}px, got ${dimensions.height}px`,
  );
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