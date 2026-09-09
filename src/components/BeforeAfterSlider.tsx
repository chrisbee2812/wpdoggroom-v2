import React, { useState, useRef } from 'react';
import { Eye, SlidersHorizontal, ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  dogName: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  dogName,
  beforeLabel = 'Before',
  afterLabel = 'After'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'slider' | 'before' | 'after'>('slider');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button (e.g. left click or touch)
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Prevent default browser image dragging / ghost drag preview
    e.preventDefault();

    if (viewMode !== 'slider') {
      setViewMode('slider');
    }

    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if pointer capture is unsupported
    }

    // Immediately snap slider to the clicked position
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== 'slider') return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-stone-100 select-none shadow-sm border border-stone-200/80 group">
      {/* View mode buttons */}
      <div className="absolute top-3 right-3 z-30 flex items-center bg-stone-900/75 backdrop-blur-md rounded-full p-0.5 text-xs text-white shadow-md">
        <button
          type="button"
          onClick={() => setViewMode('slider')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            viewMode === 'slider'
              ? 'bg-[#2A4736] text-white shadow-sm'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Interactive split comparison"
        >
          <span className="flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Split
          </span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('before')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            viewMode === 'before'
              ? 'bg-[#2A4736] text-white shadow-sm'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          Before
        </button>
        <button
          type="button"
          onClick={() => setViewMode('after')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            viewMode === 'after'
              ? 'bg-[#2A4736] text-white shadow-sm'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          After
        </button>
      </div>

      {/* Main image container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label={`Interactive before and after coat transformation for ${dogName}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative aspect-4/3 w-full overflow-hidden touch-none select-none focus:outline-none focus:ring-2 focus:ring-[#2A4736] focus:ring-inset ${
          isDragging ? 'cursor-grabbing' : 'cursor-ew-resize'
        }`}
      >
        {/* Full 'After' image (base layer) with hover transformation */}
        <img
          src={afterImage}
          alt={`${dogName} after grooming`}
          referrerPolicy="no-referrer"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105 select-none"
        />

        {/* 'Before' image (clipped layer) with matching hover transformation */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden ${
            isDragging ? 'transition-none' : 'transition-[clip-path] duration-150 ease-out'
          }`}
          style={{
            clipPath:
              viewMode === 'slider'
                ? `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                : viewMode === 'before'
                ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
          }}
        >
          <img
            src={beforeImage}
            alt={`${dogName} before grooming`}
            referrerPolicy="no-referrer"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105 select-none"
          />
        </div>

        {/* Labels */}
        {viewMode === 'slider' && (
          <>
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none select-none">
              <span className="bg-stone-900/75 backdrop-blur-sm text-stone-100 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                {beforeLabel}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none select-none">
              <span className="bg-[#2A4736]/90 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                {afterLabel}
              </span>
            </div>
          </>
        )}

        {viewMode === 'before' && (
          <div className="absolute bottom-3 left-3 z-20 pointer-events-none select-none">
            <span className="bg-stone-900/80 backdrop-blur-sm text-stone-100 text-xs font-semibold uppercase px-2.5 py-1 rounded">
              Original Coat (Before)
            </span>
          </div>
        )}

        {viewMode === 'after' && (
          <div className="absolute bottom-3 right-3 z-20 pointer-events-none select-none">
            <span className="bg-[#2A4736] text-white text-xs font-semibold uppercase px-2.5 py-1 rounded shadow-sm">
              Styled & Groomed (After)
            </span>
          </div>
        )}

        {/* Slider Divider & Handle (shown in slider mode) */}
        {viewMode === 'slider' && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[#2A4736]/30 transition-transform ${
                isDragging ? 'scale-115 border-[#2A4736] bg-[#FAF8F5]' : 'group-hover:scale-105'
              }`}
            >
              <ChevronsLeftRight className={`w-4 h-4 transition-colors ${isDragging ? 'text-[#2A4736]' : 'text-stone-700'}`} />
            </div>
          </div>
        )}
      </div>

      {/* Helper caption */}
      <div className="px-3 py-1.5 bg-stone-100/90 text-stone-500 text-[11px] flex items-center justify-between border-t border-stone-200/60">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-stone-400" />
          {viewMode === 'slider'
            ? 'Click anywhere or drag slider to compare coat transformation'
            : `Showing ${viewMode} groom view`}
        </span>
        <span className="font-medium text-stone-600">West Park Studio</span>
      </div>
    </div>
  );
};
