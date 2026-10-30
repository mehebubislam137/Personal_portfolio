import { useEffect, useRef, useState, useCallback } from 'react';

interface SoundWaveCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function SoundWaveCanvas({
  className = '',
  interactive = true
}: SoundWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState(1.2);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const simulateSpeech = useCallback(() => {
    setIsSpeaking(true);
    setActiveFrequency(2.2);
    const t1 = setTimeout(() => {
      setActiveFrequency(1.4);
    }, 2800);
    const t2 = setTimeout(() => {
      setIsSpeaking(false);
      setActiveFrequency(1.0);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 100);
      height = Math.max(rect.height, 100);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let phase = 0;
    let lastTime = performance.now();

    const drawFrame = (time: number) => {
      if (!isVisibleRef.current || document.hidden) {
        animFrameId.current = null;
        return;
      }

      animFrameId.current = requestAnimationFrame(drawFrame);

      if (time - lastTime < 28) {
        return;
      }
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!prefersReducedMotion) {
        phase += dt * (isSpeaking ? 3.0 : 1.2) * activeFrequency;
      }

      // Obsidian Ink bedrock #171A19
      ctx.fillStyle = '#171A19';
      ctx.fillRect(0, 0, width, height);

      // Acoustic mid-line guide
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(57, 72, 62, 0.25)';
      const midY = height * 0.52;

      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Frequency spectrum analyzer bars
      const barCount = 24;
      const barWidth = width / barCount;
      for (let b = 0; b < barCount; b++) {
        const binPhase = b * 0.28 + phase * 0.8;
        const baseH = (Math.sin(binPhase) * 0.5 + 0.5) * (isSpeaking ? 44 : 18);
        const bx = b * barWidth + 2;
        const by = height - baseH - 12;

        ctx.fillStyle = b % 5 === 0 ? 'rgba(200, 135, 99, 0.45)' : 'rgba(168, 184, 160, 0.25)';
        ctx.fillRect(bx, by, barWidth - 4, baseH);
      }

      // Harmonic wave ribbons
      const waves = [
        { amp: isSpeaking ? 40 : 22, freq: 0.012, speed: 1.0, color: '#A8B8A0', width: 2.0, alpha: 0.9 },
        { amp: isSpeaking ? 30 : 14, freq: 0.018, speed: 1.4, color: '#C88763', width: 1.5, alpha: 0.8 },
        { amp: isSpeaking ? 20 : 10, freq: 0.024, speed: -0.9, color: '#F0EEE6', width: 1.2, alpha: 0.75 },
        { amp: isSpeaking ? 42 : 22, freq: 0.007, speed: 0.6, color: '#39483E', width: 1.8, alpha: 0.55 }
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        const step = 8;
        let started = false;

        for (let x = 0; x <= width; x += step) {
          const progress = x / width;
          const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.25);

          let pointerMod = 0;
          if (interactive && pointerRef.current.active) {
            const pDist = Math.abs(x - pointerRef.current.x);
            if (pDist < 120) {
              pointerMod = (1 - pDist / 120) * (pointerRef.current.y - midY) * 0.45;
            }
          }

          const y = midY + Math.sin(x * w.freq + phase * w.speed) * w.amp * envelope + pointerMod;

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = w.color;
        ctx.globalAlpha = w.alpha;
        ctx.lineWidth = w.width;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // Pointer crosshair indicator
      if (interactive && pointerRef.current.active) {
        const { x, y } = pointerRef.current;
        ctx.strokeStyle = 'rgba(200, 135, 99, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const startLoopIfNeeded = () => {
      if (isVisibleRef.current && !document.hidden && !animFrameId.current) {
        lastTime = performance.now();
        animFrameId.current = requestAnimationFrame(drawFrame);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startLoopIfNeeded();
          } else if (animFrameId.current) {
            cancelAnimationFrame(animFrameId.current);
            animFrameId.current = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      } else {
        const rect = container.getBoundingClientRect();
        isVisibleRef.current = rect.bottom > 0 && rect.top < window.innerHeight;
        startLoopIfNeeded();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    startLoopIfNeeded();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [activeFrequency, interactive, isSpeaking]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full h-full block cursor-crosshair touch-none"
        aria-label="Harmonic audio waveform stream simulation for QUASER"
      />

      <div className="absolute top-3 left-4 flex items-center gap-3 text-[11px] font-mono text-[#8F9790] pointer-events-none tracking-wider uppercase">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-[#C88763] animate-ping' : 'bg-[#A8B8A0]'}`} />
          <span>{isSpeaking ? 'STREAM: VOICE_INGEST' : 'STREAM: ACOUSTIC_IDLE'}</span>
        </span>
        <span className="text-[#39483E]">/</span>
        <span>LATENCY: {isSpeaking ? '142ms' : '<280ms'}</span>
      </div>

      <div className="absolute bottom-3 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={simulateSpeech}
          disabled={isSpeaking}
          aria-label="Test voice stream simulation"
          className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider bg-[#252B28] text-[#F0EEE6] hover:bg-[#A8B8A0] hover:text-[#171A19] border border-[#A8B8A0] rounded transition-all disabled:opacity-50"
        >
          {isSpeaking ? 'VOICE INGEST ACTIVE...' : '[▶] SIMULATE VOICE STREAM'}
        </button>
      </div>
    </div>
  );
}
