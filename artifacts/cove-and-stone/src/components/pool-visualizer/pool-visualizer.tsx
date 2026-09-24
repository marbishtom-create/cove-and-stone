import {
  Bath,
  ChefHat,
  Camera,
  Download,
  Droplets,
  Flame,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  MoveHorizontal,
  RefreshCcw,
  Sparkles,
  Sun,
  Upload,
  Waves,
  X,
} from 'lucide-react';
import { emailDesignConcept, generatePoolConceptRender } from '@workspace/api-client-react';
import {
  ChangeEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import './pool-visualizer.css';

export type PoolShape = 'rectangular' | 'freeform' | 'kidney' | 'l-shape';
export type WaterFinish =
  | 'white-plaster'
  | 'arctic-quartz'
  | 'sandbar-quartz'
  | 'sea-glass-quartz'
  | 'lagoon-pebble'
  | 'ocean-blue-pebble'
  | 'silver-pebble'
  | 'greenstone'
  | 'midnight-pebble';
export type WaterlineTile =
  | 'pale-limestone'
  | 'shellstone'
  | 'mist-porcelain'
  | 'warm-travertine'
  | 'sea-glass'
  | 'lagoon-glass'
  | 'ocean-blue-glass'
  | 'deep-navy-glass'
  | 'charcoal-mosaic';
export type DeckTile =
  | 'shell-limestone'
  | 'ivory-porcelain'
  | 'silver-porcelain'
  | 'sand-travertine'
  | 'warm-limestone'
  | 'coastal-shellstone'
  | 'charcoal-porcelain';
export type PoolFeature =
  | 'spa'
  | 'spa-waterfall'
  | 'infinity-edge'
  | 'pool-lights'
  | 'sun-shelf'
  | 'sheer-descent'
  | 'bubblers'
  | 'sunken-fire-pit'
  | 'outdoor-kitchen'
  | 'fire-bowls'
  | 'pergola'
  | 'outdoor-shower';
export type PoolEdgeTreatment = 'flush-continuous';

export interface PoolVisualizerConfiguration {
  width: number;
  length: number;
  shape: PoolShape;
  poolFinish: WaterFinish;
  waterlineTile: WaterlineTile;
  deckTile: DeckTile;
  edgeTreatment: PoolEdgeTreatment;
  features: PoolFeature[];
  photoUrl: string | null;
  comparisonPosition: number;
}

interface PoolVisualizerProps {
  initialPhotoUrl?: string;
  onConfigurationChange?: (configuration: PoolVisualizerConfiguration) => void;
}

const DEFAULT_CONFIGURATION: PoolVisualizerConfiguration = {
  width: 18,
  length: 36,
  shape: 'rectangular',
  poolFinish: 'arctic-quartz',
  waterlineTile: 'sea-glass',
  deckTile: 'shell-limestone',
  edgeTreatment: 'flush-continuous',
  features: ['pool-lights', 'sun-shelf'],
  photoUrl: null,
  comparisonPosition: 50,
};

const customerContactSchema = z.object({
  customerName: z.string().trim().min(2, 'Enter your name.').max(120, 'Name must be 120 characters or fewer.'),
  customerAddress: z.string().trim().min(5, 'Enter the property address.').max(300, 'Address must be 300 characters or fewer.'),
  customerPhone: z.string().trim().min(7, 'Enter a phone number with at least 7 characters.').max(30, 'Phone number must be 30 characters or fewer.').regex(/^[+()0-9 .-]+$/, 'Use digits and common phone punctuation only.'),
});

type CustomerContact = z.infer<typeof customerContactSchema>;

const FINISHES: Array<{
  id: WaterFinish;
  label: string;
  detail: string;
  swatch: string;
  deepSwatch: string;
}> = [
  {
    id: 'white-plaster',
    label: 'White plaster',
    detail: 'Classic smooth white · pale sky water',
    swatch: '#d9e8df',
    deepSwatch: '#6aa9aa',
  },
  {
    id: 'arctic-quartz',
    label: 'Arctic quartz',
    detail: 'Bright quartz · clear light aqua',
    swatch: '#b9dfd8',
    deepSwatch: '#4c9da2',
  },
  {
    id: 'sandbar-quartz',
    label: 'Sandbar quartz',
    detail: 'Warm sand quartz · soft turquoise',
    swatch: '#b7d0bd',
    deepSwatch: '#57928d',
  },
  {
    id: 'sea-glass-quartz',
    label: 'Sea-glass quartz',
    detail: 'Mint aggregate · luminous aqua',
    swatch: '#8fcac0',
    deepSwatch: '#398c91',
  },
  {
    id: 'lagoon-pebble',
    label: 'Lagoon pebble',
    detail: 'Aqua pebble · coastal teal',
    swatch: '#68b3ad',
    deepSwatch: '#28777e',
  },
  {
    id: 'ocean-blue-pebble',
    label: 'Ocean-blue pebble',
    detail: 'Blue aggregate · vivid blue water',
    swatch: '#5e9fb0',
    deepSwatch: '#235e7c',
  },
  {
    id: 'silver-pebble',
    label: 'Silver pebble',
    detail: 'Cool gray aggregate · blue-gray water',
    swatch: '#a8c4c5',
    deepSwatch: '#557d8b',
  },
  {
    id: 'greenstone',
    label: 'Greenstone',
    detail: 'Mineral green · softly organic teal',
    swatch: '#8ab1a5',
    deepSwatch: '#416e6c',
  },
  {
    id: 'midnight-pebble',
    label: 'Midnight pebble',
    detail: 'Charcoal aggregate · deep ink blue',
    swatch: '#526773',
    deepSwatch: '#182f43',
  },
];

const TILE_OPTIONS: Array<{ id: WaterlineTile; label: string; detail: string; swatch: string }> = [
  { id: 'pale-limestone', label: 'Pale limestone', detail: 'Soft ivory stone', swatch: '#ded7c6' },
  { id: 'shellstone', label: 'Shellstone', detail: 'Warm shell and sand tones', swatch: '#cbbb9f' },
  { id: 'mist-porcelain', label: 'Mist porcelain', detail: 'Quiet cloud gray', swatch: '#bbc9c5' },
  { id: 'warm-travertine', label: 'Warm travertine', detail: 'Natural sand with soft movement', swatch: '#c8b293' },
  { id: 'sea-glass', label: 'Sea glass', detail: 'Hand-cut pale aqua', swatch: '#79aaa5' },
  { id: 'lagoon-glass', label: 'Lagoon glass', detail: 'Layered coastal teal', swatch: '#478e8e' },
  { id: 'ocean-blue-glass', label: 'Ocean-blue glass', detail: 'Clear blue iridescence', swatch: '#568fa7' },
  { id: 'deep-navy-glass', label: 'Deep navy glass', detail: 'Inky blue contrast', swatch: '#344d66' },
  { id: 'charcoal-mosaic', label: 'Charcoal mosaic', detail: 'Architectural dark gray', swatch: '#4a5353' },
];

const DECK_TILES: Array<{ id: DeckTile; label: string; detail: string; swatch: string; grout: string }> = [
  { id: 'shell-limestone', label: 'Shell limestone', detail: 'Pale coastal stone', swatch: '#d5cbb7', grout: '#bdb39f' },
  { id: 'ivory-porcelain', label: 'Ivory porcelain', detail: 'Clean light matte', swatch: '#e2ded1', grout: '#c9c5b8' },
  { id: 'silver-porcelain', label: 'Silver porcelain', detail: 'Cool modern gray', swatch: '#bfc5c0', grout: '#a7afaa' },
  { id: 'sand-travertine', label: 'Sand travertine', detail: 'Warm natural variation', swatch: '#c7b395', grout: '#ad9878' },
  { id: 'warm-limestone', label: 'Warm limestone', detail: 'Soft beige with quiet grain', swatch: '#cbbda7', grout: '#b5a68d' },
  { id: 'coastal-shellstone', label: 'Coastal shellstone', detail: 'Sun-washed ivory', swatch: '#d9d1bc', grout: '#c0b6a0' },
  { id: 'charcoal-porcelain', label: 'Charcoal porcelain', detail: 'Deep architectural slate', swatch: '#747b77', grout: '#5c6461' },
];

const POOL_FEATURES: Array<{ id: PoolFeature; label: string; detail: string; icon: ReactElement }> = [
  { id: 'spa', label: 'Integrated spa / Jacuzzi', detail: 'A dedicated hot-water retreat', icon: <Bath size={17} /> },
  { id: 'spa-waterfall', label: 'Spa with overhead waterfall', detail: 'Spa with a dramatic spillover', icon: <Waves size={17} /> },
  { id: 'infinity-edge', label: 'Infinity edge', detail: 'Water flowing over a vanishing edge', icon: <Droplets size={17} /> },
  { id: 'sun-shelf', label: 'Sun shelf', detail: 'Shallow place to settle in', icon: <Sun size={17} /> },
  { id: 'sheer-descent', label: 'Sheer-descent waterfall', detail: 'A clean architectural water wall', icon: <Waves size={17} /> },
  { id: 'bubblers', label: 'Sun-shelf bubblers', detail: 'Gentle vertical water jets', icon: <Droplets size={17} /> },
  { id: 'pool-lights', label: 'Pool lights', detail: 'A quiet glow after sunset', icon: <Lightbulb size={17} /> },
];

const OUTDOOR_FEATURES: Array<{ id: PoolFeature; label: string; detail: string; icon: ReactElement }> = [
  { id: 'sunken-fire-pit', label: 'Sunken fire pit', detail: 'A lower lounge for gathering', icon: <Flame size={17} /> },
  { id: 'outdoor-kitchen', label: 'Outdoor kitchen', detail: 'A built-in place to cook and serve', icon: <ChefHat size={17} /> },
  { id: 'fire-bowls', label: 'Fire bowls', detail: 'Sculptural fire beside the water', icon: <Flame size={17} /> },
  { id: 'pergola', label: 'Pergola', detail: 'Defined shade for outdoor living', icon: <Sun size={17} /> },
  { id: 'outdoor-shower', label: 'Outdoor shower', detail: 'A simple rinse beside the pool', icon: <Droplets size={17} /> },
];

const SHAPES: Array<{ id: PoolShape; label: string; detail: string }> = [
  { id: 'rectangular', label: 'Rectangular', detail: 'Clean geometry' },
  { id: 'freeform', label: 'Freeform', detail: 'Relaxed contour' },
  { id: 'kidney', label: 'Kidney', detail: 'Softly sculpted' },
  { id: 'l-shape', label: 'L-shape', detail: 'Zone the garden' },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getPoolPath(shape: PoolShape) {
  switch (shape) {
    case 'freeform':
      return 'M 170 224 C 170 145, 250 112, 337 125 C 405 135, 478 105, 548 130 C 627 159, 635 252, 576 294 C 524 331, 453 305, 393 321 C 308 342, 216 326, 181 281 C 169 265, 166 244, 170 224 Z';
    case 'kidney':
      return 'M 198 164 C 258 107, 379 119, 417 171 C 446 210, 430 250, 470 267 C 516 286, 579 253, 593 285 C 610 324, 527 347, 456 332 C 382 316, 335 331, 271 317 C 195 299, 143 243, 151 204 C 156 187, 177 180, 198 164 Z';
    case 'l-shape':
      return 'M 190 139 H 507 C 539 139, 560 161, 560 192 V 224 H 447 V 302 H 190 Z';
    default:
      return 'M 174 143 Q 174 127 190 127 H 568 Q 584 127 584 143 V 292 Q 584 308 568 308 H 190 Q 174 308 174 292 Z';
  }
}

function PoolShapeMark({ shape }: { shape: PoolShape }) {
  const paths: Record<PoolShape, string> = {
    rectangular: 'M4 5h16v14H4z',
    freeform: 'M5 10c1-5 7-7 11-4 3 2 5 5 2 8-3 4-10 3-13 0-1-1-1-3 0-4Z',
    kidney: 'M6 7c3-3 8-2 9 1 1 3 5 2 5 5 0 4-8 4-13 1-3-2-3-5-1-7Z',
    'l-shape': 'M4 5h15v6h-6v8H4z',
  };
  return (
    <svg aria-hidden="true" className="pool-visualizer__shape-mark" viewBox="0 0 24 24">
      <path d={paths[shape]} />
    </svg>
  );
}

function ConceptScene({ configuration }: { configuration: PoolVisualizerConfiguration }) {
  const finish = FINISHES.find((item) => item.id === configuration.poolFinish) ?? FINISHES[0];
  const tile = TILE_OPTIONS.find((item) => item.id === configuration.waterlineTile) ?? TILE_OPTIONS[0];
  const deck = DECK_TILES.find((item) => item.id === configuration.deckTile) ?? DECK_TILES[0];
  const selectedFeatures = new Set(configuration.features);
  const spaEnabled = selectedFeatures.has('spa') || selectedFeatures.has('spa-waterfall');
  const selectedFeatureLabels = [...POOL_FEATURES, ...OUTDOOR_FEATURES]
    .filter((feature) => selectedFeatures.has(feature.id))
    .map((feature) => feature.label);
  const poolPath = getPoolPath(configuration.shape);
  const poolId = `pool-${configuration.shape}`;
  const poolScaleX = clamp(0.72 + ((configuration.width - 8) / 52) * 0.58, 0.72, 1.3);
  const poolScaleY = clamp(0.7 + ((configuration.length - 12) / 88) * 0.58, 0.7, 1.28);
  const poolTransform = `translate(380 220) scale(${poolScaleX} ${poolScaleY}) translate(-380 -220)`;

  return (
    <svg
      className="pool-visualizer__concept-scene"
      viewBox="0 0 760 430"
      role="img"
      aria-label={`Illustrative ${configuration.width} by ${configuration.length} foot ${configuration.shape} pool with ${finish.label} interior, ${tile.label} waterline tile, ${deck.label} continuous flush deck edge${selectedFeatureLabels.length ? `, and ${selectedFeatureLabels.join(', ')}` : ''}`}
    >
      <defs>
        <linearGradient id="concept-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdced0" />
          <stop offset="0.66" stopColor="#d9d9c9" />
          <stop offset="1" stopColor="#b2b69e" />
        </linearGradient>
        <linearGradient id="concept-lawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#879b87" />
          <stop offset="1" stopColor="#536e64" />
        </linearGradient>
        <linearGradient id={poolId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={finish.swatch} />
          <stop offset="0.55" stopColor={finish.deepSwatch} />
          <stop offset="1" stopColor="#274b59" />
        </linearGradient>
        <linearGradient id="spa-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={finish.swatch} />
          <stop offset="1" stopColor={finish.deepSwatch} />
        </linearGradient>
        <filter id="pool-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <pattern id="waterline-tile-pattern" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={tile.swatch} />
          <path d="M0 0H12V12H0ZM6 0V12M0 6H12" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.2" />
        </pattern>
        <pattern id="continuous-deck-tile" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill={deck.swatch} />
          <path d="M48 0H0V48M24 0V48" fill="none" stroke={deck.grout} strokeWidth="1.5" />
          <path d="M0 24H48" fill="none" stroke={deck.grout} strokeWidth="1.5" />
          <path d="M4 7C14 4 23 5 33 8M5 34C15 31 23 33 42 29" fill="none" stroke="#fff" strokeOpacity=".17" strokeWidth="1.2" />
        </pattern>
        <clipPath id="pool-clip">
          <path d={poolPath} />
        </clipPath>
      </defs>
      {configuration.photoUrl ? (
        <>
          <image
            data-background-photo="true"
            href={configuration.photoUrl}
            x="0"
            y="0"
            width="760"
            height="430"
            preserveAspectRatio="xMidYMid slice"
          />
          <rect data-background-photo="true" width="760" height="430" fill="#183e3c" opacity=".14" />
          <path
            data-background-photo="true"
            d="M0 330 C152 298 256 349 391 321 C535 292 649 343 760 312 V430 H0Z"
            fill="#d1c4ac"
            opacity=".18"
          />
        </>
      ) : (
        <>
          <rect width="760" height="430" fill="url(#concept-sky)" />
          <path d="M0 146 C110 122 169 153 258 139 C379 120 463 148 574 126 C653 110 705 127 760 117 V0 H0Z" fill="#b1c0bd" opacity=".7" />
          <path d="M0 168 C87 148 137 176 232 161 C358 141 449 174 550 150 C637 131 702 152 760 140 V220 H0Z" fill="#687f78" opacity=".84" />
          <path d="M0 211 C128 189 213 230 330 202 C473 168 586 222 760 186 V430 H0Z" fill="url(#concept-lawn)" />
          <g opacity=".6" fill="#344f4b">
            <path d="M40 196l24-63 21 63Z" /><path d="M664 181l27-74 25 74Z" /><path d="M104 208l19-51 18 51Z" />
          </g>
          <g opacity=".55" fill="#d9d6c4">
            <rect x="58" y="78" width="122" height="62" /><path d="M48 78l72-47 77 47Z" />
            <rect x="83" y="99" width="35" height="41" fill="#7c9290" /><rect x="130" y="99" width="31" height="20" fill="#a1b4ae" />
          </g>
        </>
      )}
      <g transform={poolTransform}>
        <path d={poolPath} transform="translate(0 14)" fill="#294847" opacity=".46" filter="url(#pool-shadow)" />
        <path d={poolPath} fill="none" stroke="url(#continuous-deck-tile)" strokeWidth="48" />
        <path d={poolPath} fill={`url(#${poolId})`} stroke="url(#waterline-tile-pattern)" strokeWidth="9" />
        <path d={poolPath} fill="none" stroke={`url(#${poolId})`} strokeWidth="2" opacity=".8" />
        <g clipPath="url(#pool-clip)" opacity=".24" fill="none" stroke="#d8f5ed" strokeWidth="3">
          <path d="M122 188 C240 158 309 215 424 178 S638 158 677 191" />
          <path d="M87 233 C217 201 327 258 456 220 S635 204 689 241" />
          <path d="M158 283 C262 249 351 301 488 265 S612 252 660 277" />
        </g>
        {selectedFeatures.has('sun-shelf') && (
          <g>
            <path d="M213 153 H330 Q345 153 345 168 V205 H198 V168 Q198 153 213 153Z" fill="#a7d0c7" opacity=".84" />
            <path d="M209 157 H329" stroke="#dff5e9" strokeWidth="3" opacity=".8" />
          </g>
        )}
        {selectedFeatures.has('sheer-descent') && (
          <g>
            <path d="M468 125h62v10h-62z" fill="url(#continuous-deck-tile)" />
            <path d="M475 136 C475 159 478 175 481 195 M493 136 C493 159 496 177 499 199 M511 136 C511 160 514 177 517 194" stroke="#d3f4ee" strokeWidth="4" opacity=".8" />
            <path d="M469 128h60" stroke="#fff7e6" strokeWidth="2.5" />
          </g>
        )}
        {selectedFeatures.has('pool-lights') && (
          <g fill="#f4e8b4" stroke="#fff9dd" strokeWidth="3">
            <circle cx="254" cy="280" r="6" /><circle cx="370" cy="292" r="6" /><circle cx="493" cy="278" r="6" />
          </g>
        )}
        {selectedFeatures.has('infinity-edge') && (
          <g fill="none" stroke="#d4f2ec" strokeLinecap="round">
            <path d="M578 169V278" strokeWidth="3" />
            <path d="M581 181l14 4M581 207l14 4M581 234l14 4M581 261l14 4" strokeWidth="2.5" opacity=".85" />
          </g>
        )}
        {selectedFeatures.has('bubblers') && (
          <g fill="#ebfbf3" fillOpacity=".75" stroke="#e7faf2" strokeWidth="1.5">
            <circle cx="242" cy="186" r="4" /><circle cx="242" cy="176" r="3" />
            <circle cx="273" cy="185" r="3.5" /><circle cx="273" cy="174" r="2.5" />
          </g>
        )}
        {spaEnabled && (
          <g>
            <ellipse cx="520" cy="287" rx="44" ry="26" fill="url(#continuous-deck-tile)" stroke="#eee9da" strokeWidth="2" />
            <ellipse cx="520" cy="287" rx="35" ry="18" fill="url(#spa-water)" stroke="url(#waterline-tile-pattern)" strokeWidth="5" />
            <path d="M497 285c9-6 18-6 27 0s18 6 27 0" fill="none" stroke="#d8f5ed" strokeWidth="2" opacity=".65" />
            {selectedFeatures.has('spa-waterfall') && (
              <g fill="none" stroke="#e4fbf5" strokeLinecap="round" opacity=".9">
                <path d="M507 307v13M520 307v16M533 307v12" strokeWidth="3" />
              </g>
            )}
          </g>
        )}
      </g>
      {selectedFeatures.has('outdoor-kitchen') && (
        <g>
          <path d="M625 230h105v18H625z" fill="#e8e1d1" stroke="#9da79e" strokeWidth="2" />
          <path d="M631 248h93v39h-93z" fill="#8f9a91" stroke="#697871" strokeWidth="2" />
          <path d="M653 251v34M700 251v34" stroke="#d5d8cc" strokeWidth="2" />
          <path d="M637 236h18M663 236h18M689 236h18" stroke="#b7a98f" strokeWidth="2" />
        </g>
      )}
      {selectedFeatures.has('sunken-fire-pit') && (
        <g>
          <ellipse cx="658" cy="332" rx="49" ry="25" fill="url(#continuous-deck-tile)" stroke="#ddd6c5" strokeWidth="3" />
          <ellipse cx="658" cy="331" rx="27" ry="13" fill="#4c4c46" stroke="#d4c5a9" strokeWidth="3" />
          <path d="M650 333c-6-8 5-10 5-17 8 6 12 12 7 18 8-3 10-7 10-9 8 9 1 17-10 17-8 0-14-3-12-9Z" fill="#e18a4d" />
          <path d="M658 336c-3-4 2-7 3-10 4 5 6 9 1 12-3 1-5 0-4-2Z" fill="#ffd28a" />
        </g>
      )}
      {selectedFeatures.has('fire-bowls') && (
        <g>
          <circle cx="141" cy="305" r="13" fill="#d4c6aa" />
          <circle cx="141" cy="302" r="7" fill="#e58a4c" />
          <path d="M139 303c-2-4 2-6 3-9 4 4 4 8 1 10-2 1-4 0-4-1Z" fill="#ffe0a2" />
          <circle cx="609" cy="175" r="12" fill="#d4c6aa" />
          <circle cx="609" cy="172" r="6" fill="#e58a4c" />
          <path d="M607 173c-2-4 2-6 3-8 4 4 4 7 1 9-2 1-4 0-4-1Z" fill="#ffe0a2" />
        </g>
      )}
      {selectedFeatures.has('pergola') && (
        <g fill="none" stroke="#e5ddca" strokeWidth="5" opacity=".82">
          <path d="M48 219h88M54 219v82M130 219v82" />
          <path d="M58 212v14M77 212v14M96 212v14M115 212v14" strokeWidth="3" />
        </g>
      )}
      {selectedFeatures.has('outdoor-shower') && (
        <g fill="none" stroke="#e4e1d4" strokeWidth="4" strokeLinecap="round">
          <path d="M728 176v68M728 179c-7-11-16-12-23-11M705 168v8M699 176h12" />
          <path d="M716 192l-3 7M725 192l-3 7M735 192l-3 7" stroke="#bfe3da" strokeWidth="2.5" />
        </g>
      )}
      <path d="M0 381 C160 356 267 390 391 371 C535 348 649 389 760 365 V430 H0Z" fill="#405c54" opacity=".48" />
      <g fill="#c7bb9f" opacity=".9">
        <path d="M38 353h46v20H38z" /><path d="M92 346h27v27H92z" /><path d="M613 354h58v18H613z" />
      </g>
      <text x="28" y="400" fill="#f8f4eb" fontSize="10" letterSpacing="2.2" fontFamily="sans-serif">
        {configuration.photoUrl ? 'PHOTO-BASED CONCEPT / MATERIAL + LAYOUT' : 'CONCEPT STUDY / MATERIAL + LAYOUT'}
      </text>
    </svg>
  );
}

function BackyardFallback() {
  return (
    <div className="pool-visualizer__backyard-fallback" data-testid="empty-before-preview">
      <div className="pool-visualizer__fallback-sun" />
      <div className="pool-visualizer__fallback-house">
        <span />
        <span />
      </div>
      <div className="pool-visualizer__fallback-yard">
        <div className="pool-visualizer__fallback-note">
          <Camera size={22} strokeWidth={1.3} />
          <strong>Add your backyard photo</strong>
          <span>We will use it as the before view.</span>
        </div>
      </div>
    </div>
  );
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('The backyard photo could not be prepared.'));
    };
    reader.onerror = () => reject(new Error('The backyard photo could not be read.'));
    reader.readAsDataURL(blob);
  });
}

function serializeEmailConceptSvg(svg: SVGSVGElement) {
  const copy = svg.cloneNode(true) as SVGSVGElement;
  copy.querySelectorAll('[data-background-photo="true"]').forEach((element) => element.remove());
  return new XMLSerializer().serializeToString(copy);
}

function getEmailFailureMessage(error: unknown) {
  if (error && typeof error === 'object' && 'data' in error) {
    const responseData = (error as { data?: unknown }).data;
    if (responseData && typeof responseData === 'object' && 'message' in responseData) {
      const message = (responseData as { message?: unknown }).message;
      if (typeof message === 'string' && message.trim()) return message;
    }
  }
  return 'We could not send your concept. Check your connection and try again.';
}

async function compressBackyardPhoto(file: File) {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('The selected photo could not be opened.'));
      image.src = objectUrl;
    });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('This browser could not prepare the selected photo.');

    let scale = Math.min(1, 1536 / Math.max(image.naturalWidth, image.naturalHeight));
    for (let attempt = 0; attempt < 5; attempt += 1) {
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const quality = Math.max(0.62, 0.84 - attempt * 0.06);
      const compressed = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', quality);
      });

      if (compressed && compressed.size <= 2 * 1024 * 1024) {
        return await readBlobAsDataUrl(compressed);
      }
      scale *= 0.8;
    }

    throw new Error('This photo is too large to prepare. Choose a smaller image.');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function PoolVisualizer({ initialPhotoUrl, onConfigurationChange }: PoolVisualizerProps) {
  const [configuration, setConfiguration] = useState<PoolVisualizerConfiguration>(() => ({
    ...DEFAULT_CONFIGURATION,
    photoUrl: initialPhotoUrl ?? null,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [aiRenderDataUrl, setAiRenderDataUrl] = useState<string | null>(null);
  const [aiRenderStatus, setAiRenderStatus] = useState<'idle' | 'generating' | 'ready' | 'error'>('idle');
  const [isSendingConcept, setIsSendingConcept] = useState(false);
  const [conceptSendStatus, setConceptSendStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [conceptSendError, setConceptSendError] = useState('');
  const customerForm = useForm<CustomerContact>({
    resolver: zodResolver(customerContactSchema),
    defaultValues: {
      customerName: '',
      customerAddress: '',
      customerPhone: '',
    },
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const renderVersionRef = useRef(0);

  useEffect(() => {
    onConfigurationChange?.(configuration);
  }, [configuration, onConfigurationChange]);

  const selectedFinish = useMemo(
    () => FINISHES.find((finish) => finish.id === configuration.poolFinish) ?? FINISHES[0],
    [configuration.poolFinish],
  );
  const selectedDeck = DECK_TILES.find((tile) => tile.id === configuration.deckTile) ?? DECK_TILES[0];

  const clearAiRender = () => {
    renderVersionRef.current += 1;
    setAiRenderDataUrl(null);
    setAiRenderStatus('idle');
  };

  const updateConfiguration = (updates: Partial<PoolVisualizerConfiguration>) => {
    if (Object.keys(updates).some((key) => key !== 'comparisonPosition')) {
      clearAiRender();
      setConceptSendStatus('idle');
      setConceptSendError('');
    }
    setConfiguration((current) => ({ ...current, ...updates }));
  };

  const updateSlider = (clientX: number) => {
    const bounds = previewRef.current?.getBoundingClientRect();
    if (!bounds) return;
    updateConfiguration({ comparisonPosition: clamp(((clientX - bounds.left) / bounds.width) * 100, 0, 100) });
  };

  useEffect(() => {
    if (!isDragging) return;
    const move = (event: PointerEvent) => updateSlider(event.clientX);
    const stop = () => setIsDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };
  });

  const onPreviewPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    updateSlider(event.clientX);
  };

  const onSliderKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      updateConfiguration({ comparisonPosition: clamp(configuration.comparisonPosition - step, 0, 100) });
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      updateConfiguration({ comparisonPosition: clamp(configuration.comparisonPosition + step, 0, 100) });
    }
    if (event.key === 'Home') {
      event.preventDefault();
      updateConfiguration({ comparisonPosition: 0 });
    }
    if (event.key === 'End') {
      event.preventDefault();
      updateConfiguration({ comparisonPosition: 100 });
    }
  };

  const processPhotoFile = async (file: File | undefined) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('That image is over 8 MB. Choose a smaller backyard photo.');
      return;
    }
    setUploadError('');
    clearAiRender();
    try {
      updateConfiguration({ photoUrl: await compressBackyardPhoto(file) });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'We could not prepare that image.');
    }
  };

  const onPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    processPhotoFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const resetDesign = () => {
    updateConfiguration({
      width: DEFAULT_CONFIGURATION.width,
      length: DEFAULT_CONFIGURATION.length,
      shape: DEFAULT_CONFIGURATION.shape,
      poolFinish: DEFAULT_CONFIGURATION.poolFinish,
      waterlineTile: DEFAULT_CONFIGURATION.waterlineTile,
      deckTile: DEFAULT_CONFIGURATION.deckTile,
      edgeTreatment: DEFAULT_CONFIGURATION.edgeTreatment,
      features: [...DEFAULT_CONFIGURATION.features],
      comparisonPosition: DEFAULT_CONFIGURATION.comparisonPosition,
    });
  };

  const exportConcept = async () => {
    if (aiRenderDataUrl) {
      const response = await fetch(aiRenderDataUrl);
      if (!response.ok) return;
      const blob = await response.blob();
      const extension = blob.type === 'image/png' ? 'png' : 'jpg';
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `cove-stone-${configuration.width}x${configuration.length}-ai-pool-concept.${extension}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }

    const svg = previewRef.current?.querySelector('.pool-visualizer__after-art svg');
    if (!(svg instanceof SVGSVGElement)) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `cove-stone-${configuration.width}x${configuration.length}-concept.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const sendConceptToTeam = async (customer: CustomerContact) => {
    const svg = previewRef.current?.querySelector('.pool-visualizer__after-art svg');
    if (!(svg instanceof SVGSVGElement)) {
      setConceptSendStatus('error');
      setConceptSendError('The concept preview is not ready yet. Please try again.');
      return;
    }

    setIsSendingConcept(true);
    setConceptSendStatus('idle');
    setConceptSendError('');

    try {
      await emailDesignConcept({
        customerName: customer.customerName,
        customerAddress: customer.customerAddress,
        customerPhone: customer.customerPhone,
        width: configuration.width,
        length: configuration.length,
        shape: configuration.shape,
        poolFinish: configuration.poolFinish,
        waterlineTile: configuration.waterlineTile,
        deckTile: configuration.deckTile,
        edgeTreatment: configuration.edgeTreatment,
        features: configuration.features,
        svg: serializeEmailConceptSvg(svg),
        originalPhotoDataUrl: configuration.photoUrl ?? undefined,
        aiRenderDataUrl: aiRenderDataUrl ?? undefined,
      });
      setConceptSendStatus('sent');
    } catch (error) {
      setConceptSendStatus('error');
      setConceptSendError(getEmailFailureMessage(error));
    } finally {
      setIsSendingConcept(false);
    }
  };

  const generateAiRender = async () => {
    if (!configuration.photoUrl) return;

    const renderVersion = ++renderVersionRef.current;
    setAiRenderDataUrl(null);
    setAiRenderStatus('generating');

    try {
      const result = await generatePoolConceptRender({
        photoDataUrl: configuration.photoUrl,
        width: configuration.width,
        length: configuration.length,
        shape: configuration.shape,
        poolFinish: configuration.poolFinish,
        waterlineTile: configuration.waterlineTile,
        deckTile: configuration.deckTile,
        edgeTreatment: configuration.edgeTreatment,
        features: configuration.features,
      });
      if (renderVersion !== renderVersionRef.current) return;
      setAiRenderDataUrl(result.imageDataUrl);
      setAiRenderStatus('ready');
    } catch {
      if (renderVersion === renderVersionRef.current) {
        setAiRenderStatus('error');
      }
    }
  };

  const beforeImageWidth = configuration.comparisonPosition > 0
    ? 100 / (configuration.comparisonPosition / 100)
    : 100;

  return (
    <section className="pool-visualizer" aria-labelledby="pool-visualizer-title">
      <div className="pool-visualizer__intro">
        <div>
          <p className="pool-visualizer__eyebrow"><Sparkles size={14} /> Material + layout review</p>
          <h2 id="pool-visualizer-title">Shape the feeling of your backyard.</h2>
          <p className="pool-visualizer__lede">
            Start with a photo, then tune the few decisions that make a pool feel considered: proportion, water, edge, and light.
          </p>
        </div>
        <div className="pool-visualizer__intro-mark" aria-hidden="true">
          <span>01</span>
          <i />
          <span>04</span>
        </div>
      </div>

      <div className="pool-visualizer__workspace">
        <aside className="pool-visualizer__controls" aria-label="Pool concept controls">
          <div className="pool-visualizer__control-head">
            <div>
              <span className="pool-visualizer__kicker">Your brief</span>
              <h3>Set the essentials</h3>
            </div>
            <span className="pool-visualizer__step">01 — 04</span>
          </div>

          <div className="pool-visualizer__photo-control">
            <div className="pool-visualizer__field-label">
              <span>Backyard photo</span>
              <span className="pool-visualizer__optional">Optional</span>
            </div>
            <div className="pool-visualizer__upload-row">
              <button className="pool-visualizer__upload-button" type="button" onClick={() => fileInputRef.current?.click()} data-testid="button-load-backyard">
                <Upload size={16} /> {configuration.photoUrl ? 'Replace photo' : 'Load photo'}
              </button>
              <button className="pool-visualizer__camera-button" type="button" onClick={() => cameraInputRef.current?.click()} data-testid="button-take-backyard">
                <Camera size={16} /> Take photo
              </button>
              {configuration.photoUrl && (
                <button
                  className="pool-visualizer__clear-button"
                  type="button"
                  aria-label="Remove backyard photo"
                  onClick={() => updateConfiguration({ photoUrl: null })}
                  data-testid="button-clear-backyard"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <input ref={fileInputRef} className="pool-visualizer__file-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoUpload} aria-label="Load a backyard photo" data-testid="input-backyard-photo" />
            <input ref={cameraInputRef} className="pool-visualizer__file-input" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={onPhotoUpload} aria-label="Take a backyard photo" data-testid="input-backyard-camera" />
            <p className="pool-visualizer__helper">Take a photo or load a JPG, PNG or WebP · 8 MB max</p>
            {uploadError && <p className="pool-visualizer__error" role="alert" data-testid="status-upload-error">{uploadError}</p>}
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label">
              <span>Pool footprint</span>
              <span className="pool-visualizer__unit-note">feet</span>
            </div>
            <div className="pool-visualizer__dimensions">
              <label>
                <span>Width</span>
                <div className="pool-visualizer__number-wrap">
                  <input
                    type="number"
                    min={8}
                    max={60}
                    step={1}
                    value={configuration.width}
                    onChange={(event) => updateConfiguration({ width: clamp(Number(event.target.value) || 8, 8, 60) })}
                    data-testid="input-pool-width"
                  />
                  <b>ft</b>
                </div>
              </label>
              <span className="pool-visualizer__times" aria-hidden="true">×</span>
              <label>
                <span>Length</span>
                <div className="pool-visualizer__number-wrap">
                  <input
                    type="number"
                    min={12}
                    max={100}
                    step={1}
                    value={configuration.length}
                    onChange={(event) => updateConfiguration({ length: clamp(Number(event.target.value) || 12, 12, 100) })}
                    data-testid="input-pool-length"
                  />
                  <b>ft</b>
                </div>
              </label>
            </div>
            <div className="pool-visualizer__dimension-summary" data-testid="text-dimension-summary">
              <span>{configuration.width}′ × {configuration.length}′</span>
              <span>{(configuration.width * configuration.length).toLocaleString()} sq ft surface</span>
            </div>
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label"><span>Pool shape</span><span className="pool-visualizer__unit-note">01</span></div>
            <div className="pool-visualizer__shape-grid">
              {SHAPES.map((shape) => (
                <button
                  className={`pool-visualizer__shape-option ${configuration.shape === shape.id ? 'is-selected' : ''}`}
                  type="button"
                  key={shape.id}
                  onClick={() => updateConfiguration({ shape: shape.id })}
                  aria-pressed={configuration.shape === shape.id}
                  data-testid={`button-shape-${shape.id}`}
                >
                  <PoolShapeMark shape={shape.id} />
                  <span><strong>{shape.label}</strong><small>{shape.detail}</small></span>
                </button>
              ))}
            </div>
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label"><span>Pool interior finish</span><span className="pool-visualizer__unit-note">02</span></div>
            <p className="pool-visualizer__section-note">Choose the surface material and the water color it creates.</p>
            <div className="pool-visualizer__material-grid" aria-label="Pool interior finishes">
              {FINISHES.map((finish) => (
                <button
                  className={`pool-visualizer__material-option ${configuration.poolFinish === finish.id ? 'is-selected' : ''}`}
                  type="button"
                  key={finish.id}
                  onClick={() => updateConfiguration({ poolFinish: finish.id })}
                  aria-label={`${finish.label}: ${finish.detail}`}
                  title={finish.detail}
                  aria-pressed={configuration.poolFinish === finish.id}
                  data-testid={`button-finish-${finish.id}`}
                >
                  <span className="pool-visualizer__material-swatch" style={{ background: `linear-gradient(145deg, ${finish.swatch}, ${finish.deepSwatch})` }} />
                  <strong>{finish.label}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label"><span>Waterline tile</span><span className="pool-visualizer__unit-note">03</span></div>
            <p className="pool-visualizer__section-note">A separate accent band at the waterline; choose a stone, porcelain, glass, or mosaic look.</p>
            <div className="pool-visualizer__material-grid" aria-label="Waterline tile selections">
              {TILE_OPTIONS.map((tile) => (
                <button
                  className={`pool-visualizer__material-option ${configuration.waterlineTile === tile.id ? 'is-selected' : ''}`}
                  type="button"
                  key={tile.id}
                  onClick={() => updateConfiguration({ waterlineTile: tile.id })}
                  aria-label={`${tile.label}: ${tile.detail}`}
                  title={tile.detail}
                  aria-pressed={configuration.waterlineTile === tile.id}
                  data-testid={`button-waterline-tile-${tile.id}`}
                >
                  <span className="pool-visualizer__material-swatch pool-visualizer__material-swatch--tile" style={{ backgroundColor: tile.swatch }} />
                  <strong>{tile.label}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label"><span>Deck tile + pool edge</span><span className="pool-visualizer__unit-note">04</span></div>
            <p className="pool-visualizer__section-note">One continuous, flush surface runs to the water. No raised or differently sized coping band.</p>
            <div className="pool-visualizer__material-grid" aria-label="Continuous deck tile selections">
              {DECK_TILES.map((tile) => (
                <button
                  className={`pool-visualizer__material-option ${configuration.deckTile === tile.id ? 'is-selected' : ''}`}
                  type="button"
                  key={tile.id}
                  onClick={() => updateConfiguration({ deckTile: tile.id, edgeTreatment: 'flush-continuous' })}
                  aria-label={`${tile.label}: ${tile.detail}. Continues to the water as a flush edge.`}
                  title={tile.detail}
                  aria-pressed={configuration.deckTile === tile.id}
                  data-testid={`button-deck-tile-${tile.id}`}
                >
                  <span className="pool-visualizer__material-swatch pool-visualizer__material-swatch--deck" style={{ backgroundColor: tile.swatch, backgroundImage: `linear-gradient(90deg, transparent 48%, ${tile.grout} 49%, ${tile.grout} 51%, transparent 52%), linear-gradient(0deg, transparent 48%, ${tile.grout} 49%, ${tile.grout} 51%, transparent 52%)` }} />
                  <strong>{tile.label}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="pool-visualizer__section pool-visualizer__features">
            <div className="pool-visualizer__field-label"><span>Pool & water features</span><span className="pool-visualizer__unit-note">05</span></div>
            <p className="pool-visualizer__section-note">Every switch works on its own. Choose one feature or any combination.</p>
            {POOL_FEATURES.map((feature) => (
              <label className="pool-visualizer__toggle" key={feature.id}>
                <span className="pool-visualizer__toggle-icon">{feature.icon}</span>
                <span><strong>{feature.label}</strong><small>{feature.detail}</small></span>
                <input
                  type="checkbox"
                  checked={configuration.features.includes(feature.id)}
                  onChange={(event) => {
                    const features = event.target.checked
                      ? [...configuration.features, feature.id]
                      : configuration.features.filter((selected) => selected !== feature.id);
                    updateConfiguration({ features });
                  }}
                  data-testid={`toggle-feature-${feature.id}`}
                />
                <span className="pool-visualizer__switch" aria-hidden="true"><i /></span>
              </label>
            ))}
          </div>

          <div className="pool-visualizer__section pool-visualizer__features">
            <div className="pool-visualizer__field-label"><span>Outdoor living</span><span className="pool-visualizer__unit-note">06</span></div>
            {OUTDOOR_FEATURES.map((feature) => (
              <label className="pool-visualizer__toggle" key={feature.id}>
                <span className="pool-visualizer__toggle-icon">{feature.icon}</span>
                <span><strong>{feature.label}</strong><small>{feature.detail}</small></span>
                <input
                  type="checkbox"
                  checked={configuration.features.includes(feature.id)}
                  onChange={(event) => {
                    const features = event.target.checked
                      ? [...configuration.features, feature.id]
                      : configuration.features.filter((selected) => selected !== feature.id);
                    updateConfiguration({ features });
                  }}
                  data-testid={`toggle-feature-${feature.id}`}
                />
                <span className="pool-visualizer__switch" aria-hidden="true"><i /></span>
              </label>
            ))}
          </div>

          <div className="pool-visualizer__control-actions">
            <div className="pool-visualizer__ai-controls">
              <button
                className="pool-visualizer__ai-button"
                type="button"
                onClick={generateAiRender}
                disabled={!configuration.photoUrl || aiRenderStatus === 'generating'}
                data-testid="button-generate-ai-render"
              >
                <Sparkles size={15} />
                {aiRenderStatus === 'generating'
                  ? 'Creating AI rendering…'
                  : aiRenderDataUrl
                    ? 'Regenerate AI rendering'
                    : 'Create AI pool rendering'}
              </button>
              <p className={`pool-visualizer__ai-note ${aiRenderStatus === 'error' ? 'is-error' : ''}`} role={aiRenderStatus === 'error' ? 'alert' : 'status'} aria-live="polite" data-testid="status-ai-render">
                {aiRenderStatus === 'generating'
                  ? 'Creating a realistic pool concept from your backyard photo. This can take a little while.'
                  : aiRenderStatus === 'ready'
                    ? 'AI rendering ready. Slide to compare it with the original photo.'
                    : aiRenderStatus === 'error'
                      ? 'AI rendering failed. Your photo and visualizer are unchanged; try again.'
                      : 'Your photo is sent to AI to make this concept. The original and rendering are emailed to our team only when you choose to send.'}
              </p>
            </div>
            <button className="pool-visualizer__text-button" type="button" onClick={resetDesign} data-testid="button-reset-design">
              <RefreshCcw size={14} /> Reset design
            </button>
            <Form {...customerForm}>
              <form
                className="pool-visualizer__contact-form"
                onSubmit={customerForm.handleSubmit(sendConceptToTeam)}
                onChange={() => {
                  if (conceptSendError) {
                    setConceptSendError('');
                    setConceptSendStatus('idle');
                  }
                }}
                noValidate
                data-testid="form-send-concept"
              >
                <div>
                  <span className="pool-visualizer__kicker">Tie the concept to you</span>
                  <h4>Your contact details</h4>
                  <p className="pool-visualizer__section-note">Required so our team can review this design with you.</p>
                  <p className="pool-visualizer__helper">Your details, selected design, backyard photo and rendering go to Cove &amp; Stone so the team can follow up.</p>
                </div>
                <div className="pool-visualizer__contact-fields">
                  <FormField
                    control={customerForm.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem className="pool-visualizer__contact-field">
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <input {...field} type="text" autoComplete="name" maxLength={120} required placeholder="Your name" data-testid="input-customer-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={customerForm.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem className="pool-visualizer__contact-field">
                        <FormLabel>Property address</FormLabel>
                        <FormControl>
                          <textarea {...field} autoComplete="street-address" maxLength={300} rows={2} required placeholder="Street, city, state, ZIP" data-testid="input-customer-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={customerForm.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem className="pool-visualizer__contact-field">
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <input {...field} type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required placeholder="(555) 555-5555" data-testid="input-customer-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pool-visualizer__handoff">
                  <button
                    className="pool-visualizer__send-button"
                    type="submit"
                    disabled={isSendingConcept || aiRenderStatus === 'generating'}
                    data-testid="button-send-concept"
                  >
                    <Mail size={14} /> {isSendingConcept ? 'Sending…' : 'Finish & send to our team'}
                  </button>
                  <span className="pool-visualizer__saved-status" data-send-state={conceptSendStatus} role="status" aria-live="polite" data-testid="status-generated">
                    <span /> {conceptSendStatus === 'sent' ? 'Sent to our team' : conceptSendStatus === 'error' ? 'Could not send' : 'Concept updated'}
                  </span>
                  {conceptSendError && <p className="pool-visualizer__error" role="alert" data-testid="status-send-error">{conceptSendError}</p>}
                </div>
              </form>
            </Form>
          </div>
        </aside>

        <div className="pool-visualizer__preview-column">
          <div className="pool-visualizer__preview-header">
            <div>
              <span className="pool-visualizer__kicker">Live concept</span>
              <h3>Compare the direction</h3>
            </div>
            <button className="pool-visualizer__export-button" type="button" onClick={exportConcept} data-testid="button-export-concept">
              <Download size={16} /> <span>{aiRenderDataUrl ? 'Download AI render' : 'Export concept'}</span>
            </button>
          </div>

          <div
            className="pool-visualizer__comparison"
            ref={previewRef}
            onPointerDown={onPreviewPointerDown}
            data-testid="pool-comparison-preview"
          >
            <div className="pool-visualizer__after-art">
              <div style={aiRenderDataUrl ? { display: 'none' } : undefined}>
                <ConceptScene configuration={configuration} />
              </div>
              {aiRenderDataUrl && (
                <img
                  className="pool-visualizer__concept-scene pool-visualizer__ai-image"
                  src={aiRenderDataUrl}
                  alt="AI-generated pool rendering using your uploaded backyard photo"
                  draggable="false"
                />
              )}
              <span className="pool-visualizer__comparison-label pool-visualizer__comparison-label--after">
                {aiRenderDataUrl ? 'After · AI rendering' : configuration.photoUrl ? 'After · photo concept' : 'After · concept'}
              </span>
            </div>
            <div className="pool-visualizer__before-art" style={{ width: `${configuration.comparisonPosition}%` }}>
              {configuration.photoUrl ? (
                <img
                  src={configuration.photoUrl}
                  alt="Your uploaded backyard, before the pool concept"
                  draggable="false"
                  style={{ width: `${beforeImageWidth}%` }}
                />
              ) : (
                <BackyardFallback />
              )}
              <span className="pool-visualizer__comparison-label pool-visualizer__comparison-label--before">Before · photo</span>
            </div>
            <div className={`pool-visualizer__slider ${isDragging ? 'is-dragging' : ''}`} style={{ left: `${configuration.comparisonPosition}%` }}>
              <button
                className="pool-visualizer__slider-handle"
                type="button"
                role="slider"
                aria-label="Before and after comparison position"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(configuration.comparisonPosition)}
                aria-valuetext={`${Math.round(configuration.comparisonPosition)} percent before view`}
                onKeyDown={onSliderKeyDown}
                onPointerDown={(event) => { event.stopPropagation(); setIsDragging(true); }}
                data-testid="slider-before-after"
              >
                <MoveHorizontal size={17} />
              </button>
            </div>
          </div>
          <div className="pool-visualizer__comparison-legend">
            <span><i className="is-aqua" /> Drag or use arrow keys to compare</span>
            <span><i className="is-ivory" /> AI concepts are illustrative only, not completed-project photography or construction drawings.</span>
          </div>
          <div className="pool-visualizer__preview-meta">
            <div><ImageIcon size={16} /><span>{aiRenderDataUrl ? 'AI rendering based on your photo' : 'Illustrative preview updates with every selection'}</span></div>
            <div><span className="pool-visualizer__meta-rule" /><span>{selectedFinish.label} pool finish</span></div>
            <div><span className="pool-visualizer__meta-rule" /><span>{selectedDeck.label} · flush edge</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PoolVisualizer;