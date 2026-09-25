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
}

export const POOL_LAYOUT_DESCRIPTORS: Record<PoolLayoutElementId, PoolLayoutDescriptor> = {
  pool: {
    label: 'Pool',
    bounds: { x: 118, y: 102, width: 524, height: 236 },
    parent: 'scene',
    resizable: false,
  },
  pergola: {
    label: 'Pergola',
    bounds: { x: 558, y: 137, width: 158, height: 112 },
    parent: 'scene',
    resizable: true,
  },
  'sun-shelf': {
    label: 'Sun shelf',
    bounds: { x: 194, y: 150, width: 154, height: 60 },
    parent: 'pool',
    resizable: true,
  },
  'sheer-descent': {
    label: 'Sheer-descent waterfall',
    bounds: { x: 463, y: 120, width: 72, height: 84 },
    parent: 'pool',
    resizable: true,
  },
  'pool-lights': {
    label: 'Pool lights',
    bounds: { x: 244, y: 271, width: 255, height: 31 },
    parent: 'pool',
    resizable: true,
  },
  'infinity-edge': {
    label: 'Infinity edge',
    bounds: { x: 575, y: 163, width: 23, height: 119 },
    parent: 'pool',
    resizable: true,
  },
  bubblers: {
    label: 'Sun-shelf bubblers',
    bounds: { x: 234, y: 166, width: 47, height: 30 },
    parent: 'pool',
    resizable: true,
  },
  spa: {
    label: 'Raised spa',
    bounds: { x: 466, y: 232, width: 108, height: 88 },
    parent: 'pool',
    resizable: true,
  },
  'outdoor-kitchen': {
    label: 'Outdoor kitchen',
    bounds: { x: 620, y: 225, width: 114, height: 67 },
    parent: 'scene',
    resizable: true,
  },
  'sunken-fire-pit': {
    label: 'Sunken fire pit',
    bounds: { x: 604, y: 300, width: 108, height: 62 },
    parent: 'scene',
    resizable: true,
  },
  'fire-bowls': {
    label: 'Fire bowls',
    bounds: { x: 124, y: 157, width: 500, height: 163 },
    parent: 'scene',
    resizable: true,
  },
  'outdoor-shower': {
    label: 'Outdoor shower',
    bounds: { x: 692, y: 160, width: 48, height: 88 },
    parent: 'scene',
    resizable: true,
  },
};

export function createDefaultPoolLayoutElements(): PoolLayoutElements {
  return Object.fromEntries(
    POOL_LAYOUT_ELEMENT_IDS.map((id) => [
      id,
      { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 },
    ]),
  ) as PoolLayoutElements;
}

export function clampPoolLayoutTransform(
  id: PoolLayoutElementId,
  transform: PoolLayoutTransform,
): PoolLayoutTransform {
  const canResize = POOL_LAYOUT_DESCRIPTORS[id].resizable;
  return {
    offsetX: Math.max(-18, Math.min(18, transform.offsetX)),
    offsetY: Math.max(-14, Math.min(14, transform.offsetY)),
    scaleX: canResize ? Math.max(0.55, Math.min(1.8, transform.scaleX)) : 1,
    scaleY: canResize ? Math.max(0.55, Math.min(1.8, transform.scaleY)) : 1,
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
  const offsetX = (transform.offsetX * 7.6) / parentScaleX;
  const offsetY = (transform.offsetY * 4.3) / parentScaleY;
  return `translate(${offsetX} ${offsetY}) translate(${centerX} ${centerY}) scale(${transform.scaleX} ${transform.scaleY}) translate(${-centerX} ${-centerY})`;
}