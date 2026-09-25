import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { GripVertical } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage: string;
  beforeMobileImage?: string;
  afterImage: string;
  afterMobileImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfter({
  beforeImage,
  beforeMobileImage,
  afterImage,
  afterMobileImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  const startDrag = (e: ReactMouseEvent | ReactTouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    let nextPosition: number | undefined;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        nextPosition = Math.max(0, sliderPosition - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        nextPosition = Math.min(100, sliderPosition + step);
        break;
      case 'Home':
        nextPosition = 0;
        break;
      case 'End':
        nextPosition = 100;
        break;
      default:
        return;
    }

    e.preventDefault();
    setSliderPosition(nextPosition);
  };

  return (
    <div 
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and after image comparison"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuetext={`${Math.round(sliderPosition)}% before`}
      onKeyDown={handleKeyDown}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none cursor-ew-resize touch-pan-y focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary focus-visible:ring-inset"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <picture>
          {afterMobileImage ? (
            <source media="(max-width: 767px)" srcSet={afterMobileImage} />
          ) : null}
          <img
            src={afterImage}
            alt={afterAlt}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </picture>
           <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-primary/80 backdrop-blur text-primary-foreground px-2 md:px-4 py-2 text-[9px] md:text-xs uppercase tracking-[0.08em] md:tracking-widest whitespace-nowrap">
           {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <picture>
          {beforeMobileImage ? (
            <source media="(max-width: 767px)" srcSet={beforeMobileImage} />
          ) : null}
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${sliderPosition === 0 ? 100 : 10000 / sliderPosition}%`, maxWidth: 'none' }}
            draggable="false"
          />
        </picture>
          <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-primary/80 backdrop-blur text-primary-foreground px-2 md:px-4 py-2 text-[9px] md:text-xs uppercase tracking-[0.08em] md:tracking-widest whitespace-nowrap">
           {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary transition-transform hover:scale-110 active:scale-95">
          <GripVertical size={24} />
        </div>
      </div>
    </div>
  );
}
