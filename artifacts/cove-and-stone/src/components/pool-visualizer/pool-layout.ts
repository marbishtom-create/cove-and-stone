export const POOL_LAYOUT_ELEMENT_IDS = [
  'pool',
  'pergola',
  'sun-shelf',
  'sheer-descent',
  'pool-lights',
  'infinity-edge',
  'bubblers',
  'spa',
  'outdoor-kitchen',
  'sunken-fire-pit',
  'fire-bowls',
  'outdoor-shower',
] as const;

export type PoolLayoutElementId = (typeof POOL_LAYOUT_ELEMENT_IDS)[number];

export interface PoolLayoutTransform {
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export type PoolLayoutElements = Record<PoolLayoutElementId, PoolLayoutTransform>;

export interface PoolLayoutBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PoolLayoutDescriptor {
  label: string;
  bounds: PoolLayoutBounds;
  parent: 'scene' | 'pool';
  resizable: boolean;
  rotatable: boolean;
}

export const POOL_LAYOUT_SCENE = {
  width: 760,
  height: 430,
  centerX: 380,
  centerY: 220,
  unitsPerPercentX: 7.6,
  unitsPerPercentY: 4.3,
} as const;

export const POOL_LAYOUT_DESCRIPTORS: Record<PoolLayoutElementId, PoolLayoutDescriptor> = {
  pool: {
    label: 'Pool',
    bounds: { x: 106, y: 90, width: 548, height: 260 },
    parent: 'scene',
    resizable: false,
    rotatable: true,
  },
  pergola: {
    label: 'Pergola',
    bounds: { x: 558, y: 137, width: 158, height: 112 },
    parent: 'scene',
    resizable: true,
    rotatable: false,
  },
  'sun-shelf': {
    label: 'Sun shelf',
    bounds: { x: 194, y: 150, width: 154, height: 60 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  'sheer-descent': {
    label: 'Sheer-descent waterfall',
    bounds: { x: 463, y: 120, width: 72, height: 84 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  'pool-lights': {
    label: 'Pool lights',
    bounds: { x: 244, y: 271, width: 255, height: 31 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  'infinity-edge': {
    label: 'Infinity edge',
    bounds: { x: 575, y: 163, width: 23, height: 119 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  bubblers: {
    label: 'Sun-shelf bubblers',
    bounds: { x: 234, y: 166, width: 47, height: 30 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  spa: {
    label: 'Raised spa',
    bounds: { x: 466, y: 232, width: 108, height: 88 },
    parent: 'pool',
    resizable: true,
    rotatable: false,
  },
  'outdoor-kitchen': {
    label: 'Outdoor kitchen',
    bounds: { x: 620, y: 225, width: 114, height: 67 },
    parent: 'scene',
    resizable: true,
    rotatable: false,
  },
  'sunken-fire-pit': {
    label: 'Sunken fire pit',
    bounds: { x: 604, y: 300, width: 108, height: 62 },
    parent: 'scene',
    resizable: true,
    rotatable: false,
  },
  'fire-bowls': {
    label: 'Fire bowls',
    bounds: { x: 124, y: 157, width: 500, height: 163 },
    parent: 'scene',
    resizable: true,
    rotatable: false,
  },
  'outdoor-shower': {
    label: 'Outdoor shower',
    bounds: { x: 692, y: 160, width: 48, height: 88 },
    parent: 'scene',
    resizable: true,
    rotatable: false,
  },
};

export function createDefaultPoolLayoutElements(): PoolLayoutElements {
  return Object.fromEntries(
    POOL_LAYOUT_ELEMENT_IDS.map((id) => [
      id,
      { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
    ]),
  ) as PoolLayoutElements;
}

function rotatePoint(x: number, y: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}

function finiteOr(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

export function clampPoolLayoutTransform(
  id: PoolLayoutElementId,
  transform: PoolLayoutTransform,
  parentScaleX = 1,
  parentScaleY = 1,
  parentRotation = 0,
): PoolLayoutTransform {
  const descriptor = POOL_LAYOUT_DESCRIPTORS[id];
  const isPoolChild = descriptor.parent === 'pool';
  const isPoolBody = id === 'pool';
  const safeParentScaleX = Math.max(0.7, Math.min(1.3, finiteOr(parentScaleX, 1)));
  const safeParentScaleY = Math.max(0.7, Math.min(1.3, finiteOr(parentScaleY, 1)));
  const safeParentRotation = finiteOr(parentRotation, 0);
  const scaleX = descriptor.resizable
    ? Math.max(0.55, Math.min(1.8, finiteOr(transform.scaleX, 1)))
    : 1;
  const scaleY = descriptor.resizable
    ? Math.max(0.55, Math.min(1.8, finiteOr(transform.scaleY, 1)))
    : 1;
  const rotation = descriptor.rotatable
    ? (((finiteOr(transform.rotation, 0) + 180) % 360) + 360) % 360 - 180
    : 0;
  const geometryScaleX = isPoolChild || isPoolBody ? safeParentScaleX : 1;
  const geometryScaleY = isPoolChild || isPoolBody ? safeParentScaleY : 1;
  const geometryRotation = isPoolChild ? safeParentRotation : rotation;
  const centerX = descriptor.bounds.x + descriptor.bounds.width / 2;
  const centerY = descriptor.bounds.y + descriptor.bounds.height / 2;
  const parentCenter = rotatePoint(
    (centerX - POOL_LAYOUT_SCENE.centerX) * (isPoolChild ? safeParentScaleX : 1),
    (centerY - POOL_LAYOUT_SCENE.centerY) * (isPoolChild ? safeParentScaleY : 1),
    isPoolChild ? safeParentRotation : 0,
  );
  const baseCenterX = isPoolChild
    ? POOL_LAYOUT_SCENE.centerX + parentCenter.x
    : centerX;
  const baseCenterY = isPoolChild
    ? POOL_LAYOUT_SCENE.centerY + parentCenter.y
    : centerY;
  const halfWidth = (descriptor.bounds.width * scaleX * geometryScaleX) / 2;
  const halfHeight = (descriptor.bounds.height * scaleY * geometryScaleY) / 2;
  const radians = (geometryRotation * Math.PI) / 180;
  const halfExtentX =
    Math.abs(Math.cos(radians)) * halfWidth +
    Math.abs(Math.sin(radians)) * halfHeight;
  const halfExtentY =
    Math.abs(Math.sin(radians)) * halfWidth +
    Math.abs(Math.cos(radians)) * halfHeight;

  const rawOffsetX = Math.max(-180, Math.min(180, finiteOr(transform.offsetX, 0)));
  const rawOffsetY = Math.max(-180, Math.min(180, finiteOr(transform.offsetY, 0)));
  const proposedMove = isPoolChild
    ? rotatePoint(
        rawOffsetX * POOL_LAYOUT_SCENE.unitsPerPercentX,
        rawOffsetY * POOL_LAYOUT_SCENE.unitsPerPercentY,
        safeParentRotation,
      )
    : {
        x: rawOffsetX * POOL_LAYOUT_SCENE.unitsPerPercentX,
        y: rawOffsetY * POOL_LAYOUT_SCENE.unitsPerPercentY,
      };
  const minCenterX = Math.min(halfExtentX, POOL_LAYOUT_SCENE.width / 2);
  const maxCenterX = Math.max(POOL_LAYOUT_SCENE.width - halfExtentX, POOL_LAYOUT_SCENE.width / 2);
  const minCenterY = Math.min(halfExtentY, POOL_LAYOUT_SCENE.height / 2);
  const maxCenterY = Math.max(POOL_LAYOUT_SCENE.height - halfExtentY, POOL_LAYOUT_SCENE.height / 2);
  const clampedCenterX = Math.max(minCenterX, Math.min(maxCenterX, baseCenterX + proposedMove.x));
  const clampedCenterY = Math.max(minCenterY, Math.min(maxCenterY, baseCenterY + proposedMove.y));
  const clampedRootMove = {
    x: clampedCenterX - baseCenterX,
    y: clampedCenterY - baseCenterY,
  };
  const localMove = isPoolChild
    ? rotatePoint(clampedRootMove.x, clampedRootMove.y, -safeParentRotation)
    : clampedRootMove;

  return {
    offsetX: Math.max(
      -180,
      Math.min(180, localMove.x / POOL_LAYOUT_SCENE.unitsPerPercentX),
    ),
    offsetY: Math.max(
      -180,
      Math.min(180, localMove.y / POOL_LAYOUT_SCENE.unitsPerPercentY),
    ),
    scaleX,
    scaleY,
    rotation,
  };
}

export function getPoolLayoutTransform(
  transform: PoolLayoutTransform,
  bounds: PoolLayoutBounds,
  parentScaleX = 1,
  parentScaleY = 1,
) {
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  const offsetX =
    (transform.offsetX * POOL_LAYOUT_SCENE.unitsPerPercentX) / parentScaleX;
  const offsetY =
    (transform.offsetY * POOL_LAYOUT_SCENE.unitsPerPercentY) / parentScaleY;
  return `translate(${offsetX} ${offsetY}) translate(${centerX} ${centerY}) rotate(${transform.rotation}) scale(${transform.scaleX} ${transform.scaleY}) translate(${-centerX} ${-centerY})`;
}