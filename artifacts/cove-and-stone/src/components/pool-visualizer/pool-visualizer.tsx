import {
  Camera,
  ChevronDown,
  Download,
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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './pool-visualizer.css';

export type PoolShape = 'rectangular' | 'freeform' | 'kidney' | 'l-shape';
export type WaterFinish = 'clear-cove' | 'deep-atlas' | 'greenstone';
export type WaterlineTile = 'travertine' | 'ink-line' | 'sea-glass';

export interface PoolVisualizerConfiguration {
  width: number;
  length: number;
  shape: PoolShape;
  waterFinish: WaterFinish;
  waterlineTile: WaterlineTile;
  lights: boolean;
  waterfall: boolean;
  sunShelf: boolean;
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
  waterFinish: 'clear-cove',
  waterlineTile: 'travertine',
  lights: true,
  waterfall: false,
  sunShelf: true,
  photoUrl: null,
  comparisonPosition: 50,
};

const FINISHES: Array<{
  id: WaterFinish;
  label: string;
  detail: string;
  swatch: string;
  deepSwatch: string;
}> = [
  {
    id: 'clear-cove',
    label: 'Clear Cove',
    detail: 'Soft aqua / bright, reflective',
    swatch: '#88c8c2',
    deepSwatch: '#3e8990',
  },
  {
    id: 'deep-atlas',
    label: 'Deep Atlas',
    detail: 'Blue charcoal / architectural',
    swatch: '#6192a0',
    deepSwatch: '#275568',
  },
  {
    id: 'greenstone',
    label: 'Greenstone',
    detail: 'Mineral teal / softly organic',
    swatch: '#8ab1a5',
    deepSwatch: '#416e6c',
  },
];

const TILE_OPTIONS: Array<{ id: WaterlineTile; label: string; detail: string; swatch: string }> = [
  { id: 'travertine', label: 'Warm travertine', detail: 'Quiet sand / honed edge', swatch: '#c8b293' },
  { id: 'ink-line', label: 'Ink line', detail: 'Charcoal / crisp contrast', swatch: '#46565a' },
  { id: 'sea-glass', label: 'Sea glass', detail: 'Mist aqua / hand-cut feel', swatch: '#79aaa5' },
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
  const finish = FINISHES.find((item) => item.id === configuration.waterFinish) ?? FINISHES[0];
  const tile = TILE_OPTIONS.find((item) => item.id === configuration.waterlineTile) ?? TILE_OPTIONS[0];
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
      aria-label={`Illustrative ${configuration.width} by ${configuration.length} foot ${configuration.shape} pool with ${finish.label} water and ${tile.label} waterline tile`}
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
        <filter id="pool-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <pattern id="tile-grain" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={tile.swatch} />
          <path d="M0 8L8 0M5 10L10 5" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
        </pattern>
        <clipPath id="pool-clip">
          <path d={poolPath} />
        </clipPath>
      </defs>
      {configuration.photoUrl ? (
        <>
          <image
            href={configuration.photoUrl}
            x="0"
            y="0"
            width="760"
            height="430"
            preserveAspectRatio="xMidYMid slice"
          />
          <rect width="760" height="430" fill="#183e3c" opacity=".14" />
          <path
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
        <path d={poolPath} fill="#d1c4ac" stroke="#eee4ce" strokeWidth="8" />
        <path d={poolPath} fill={`url(#${poolId})`} stroke="url(#tile-grain)" strokeWidth="13" />
        <path d={poolPath} fill="none" stroke={`url(#${poolId})`} strokeWidth="2" opacity=".8" />
        <g clipPath="url(#pool-clip)" opacity=".24" fill="none" stroke="#d8f5ed" strokeWidth="3">
          <path d="M122 188 C240 158 309 215 424 178 S638 158 677 191" />
          <path d="M87 233 C217 201 327 258 456 220 S635 204 689 241" />
          <path d="M158 283 C262 249 351 301 488 265 S612 252 660 277" />
        </g>
        <path d={poolPath} fill="none" stroke={`url(#tile-grain)`} strokeWidth="9" opacity=".95" />
        {configuration.sunShelf && (
          <g>
            <path d="M213 153 H330 Q345 153 345 168 V205 H198 V168 Q198 153 213 153Z" fill="#a7d0c7" opacity=".84" />
            <path d="M209 157 H329" stroke="#dff5e9" strokeWidth="3" opacity=".8" />
          </g>
        )}
        {configuration.waterfall && (
          <g>
            <path d="M489 126h49v13h-49z" fill="#d8d0bd" />
            <path d="M496 139 C496 170 500 186 504 212 M514 139 C514 169 518 185 522 212 M532 139 C532 165 536 181 540 202" stroke="#d3f4ee" strokeWidth="5" opacity=".75" />
            <path d="M489 129h49" stroke="#fff7e6" strokeWidth="3" />
          </g>
        )}
        {configuration.lights && (
          <g fill="#f4e8b4" stroke="#fff9dd" strokeWidth="3">
            <circle cx="254" cy="280" r="6" /><circle cx="370" cy="292" r="6" /><circle cx="493" cy="278" r="6" />
          </g>
        )}
      </g>
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
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const renderVersionRef = useRef(0);

  useEffect(() => {
    onConfigurationChange?.(configuration);
  }, [configuration, onConfigurationChange]);

  const selectedFinish = useMemo(
    () => FINISHES.find((finish) => finish.id === configuration.waterFinish) ?? FINISHES[0],
    [configuration.waterFinish],
  );

  const clearAiRender = () => {
    renderVersionRef.current += 1;
    setAiRenderDataUrl(null);
    setAiRenderStatus('idle');
  };

  const updateConfiguration = (updates: Partial<PoolVisualizerConfiguration>) => {
    if (Object.keys(updates).some((key) => key !== 'comparisonPosition')) {
      clearAiRender();
      setConceptSendStatus('idle');
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
      waterFinish: DEFAULT_CONFIGURATION.waterFinish,
      waterlineTile: DEFAULT_CONFIGURATION.waterlineTile,
      lights: DEFAULT_CONFIGURATION.lights,
      waterfall: DEFAULT_CONFIGURATION.waterfall,
      sunShelf: DEFAULT_CONFIGURATION.sunShelf,
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

  const sendConceptToTeam = async () => {
    const svg = previewRef.current?.querySelector('.pool-visualizer__after-art svg');
    if (!(svg instanceof SVGSVGElement)) {
      setConceptSendStatus('error');
      return;
    }

    setIsSendingConcept(true);
    setConceptSendStatus('idle');

    try {
      await emailDesignConcept({
        width: configuration.width,
        length: configuration.length,
        shape: configuration.shape,
        waterFinish: configuration.waterFinish,
        waterlineTile: configuration.waterlineTile,
        lights: configuration.lights,
        waterfall: configuration.waterfall,
        sunShelf: configuration.sunShelf,
        svg: new XMLSerializer().serializeToString(svg),
        originalPhotoDataUrl: configuration.photoUrl ?? undefined,
        aiRenderDataUrl: aiRenderDataUrl ?? undefined,
      });
      setConceptSendStatus('sent');
    } catch {
      setConceptSendStatus('error');
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
        waterFinish: configuration.waterFinish,
        waterlineTile: configuration.waterlineTile,
        lights: configuration.lights,
        waterfall: configuration.waterfall,
        sunShelf: configuration.sunShelf,
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
            <div className="pool-visualizer__field-label"><span>Water finish</span><span className="pool-visualizer__unit-note">02</span></div>
            <div className="pool-visualizer__finish-list">
              {FINISHES.map((finish) => (
                <button
                  className={`pool-visualizer__finish-option ${configuration.waterFinish === finish.id ? 'is-selected' : ''}`}
                  type="button"
                  key={finish.id}
                  onClick={() => updateConfiguration({ waterFinish: finish.id })}
                  aria-pressed={configuration.waterFinish === finish.id}
                  data-testid={`button-finish-${finish.id}`}
                >
                  <span className="pool-visualizer__finish-swatch" style={{ background: `linear-gradient(145deg, ${finish.swatch}, ${finish.deepSwatch})` }} />
                  <span><strong>{finish.label}</strong><small>{finish.detail}</small></span>
                  {configuration.waterFinish === finish.id && <span className="pool-visualizer__selected-dot" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pool-visualizer__section">
            <div className="pool-visualizer__field-label"><span>Waterline tile</span><span className="pool-visualizer__unit-note">03</span></div>
            <div className="pool-visualizer__tile-select">
              <span className="pool-visualizer__tile-sample" style={{ backgroundColor: TILE_OPTIONS.find((tile) => tile.id === configuration.waterlineTile)?.swatch }} />
              <select
                value={configuration.waterlineTile}
                onChange={(event) => updateConfiguration({ waterlineTile: event.target.value as WaterlineTile })}
                aria-label="Waterline tile"
                data-testid="select-waterline-tile"
              >
                {TILE_OPTIONS.map((tile) => <option value={tile.id} key={tile.id}>{tile.label} — {tile.detail}</option>)}
              </select>
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="pool-visualizer__section pool-visualizer__features">
            <div className="pool-visualizer__field-label"><span>Atmosphere</span><span className="pool-visualizer__unit-note">04</span></div>
            {[
              { key: 'lights' as const, label: 'Pool lights', detail: 'A quiet glow after sunset', icon: <Lightbulb size={17} /> },
              { key: 'waterfall' as const, label: 'Waterfall', detail: 'A sculptural water moment', icon: <Waves size={17} /> },
              { key: 'sunShelf' as const, label: 'Sun shelf', detail: 'Shallow place to settle in', icon: <Sun size={17} /> },
            ].map((feature) => (
              <label className="pool-visualizer__toggle" key={feature.key}>
                <span className="pool-visualizer__toggle-icon">{feature.icon}</span>
                <span><strong>{feature.label}</strong><small>{feature.detail}</small></span>
                <input
                  type="checkbox"
                  checked={configuration[feature.key]}
                  onChange={(event) => updateConfiguration({ [feature.key]: event.target.checked })}
                  data-testid={`toggle-${feature.key}`}
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
            <div className="pool-visualizer__handoff">
              <button
                className="pool-visualizer__send-button"
                type="button"
                onClick={sendConceptToTeam}
                disabled={isSendingConcept || aiRenderStatus === 'generating'}
                data-testid="button-send-concept"
              >
                <Mail size={14} /> {isSendingConcept ? 'Sending…' : 'Finish & send to our team'}
              </button>
              <span className="pool-visualizer__saved-status" role="status" aria-live="polite" data-testid="status-generated">
                <span /> {conceptSendStatus === 'sent' ? 'Sent internally' : conceptSendStatus === 'error' ? 'Could not send' : 'Concept updated'}
              </span>
            </div>
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
            <div><span className="pool-visualizer__meta-rule" /><span>{selectedFinish.label} water finish</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PoolVisualizer;