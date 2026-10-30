import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

export default function CosmicSynapseCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const colors = [
      '#6366F1', // Indigo
      '#818CF8', // Light Indigo
      '#38BDF8', // Sky Cyan
      '#A855F7', // Purple
      '#EC4899', // Pink
    ];

    const initParticles = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 22000) + 24, 55);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 2 + 0.5, // 0.5 to 2.5 depth scale
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          vz: (Math.random() - 0.5) * 0.005,
          baseRadius: Math.random() * 1.6 + 1.2,
          color: colors[i % colors.length],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      particlesRef.current = particles;
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 200);
      height = Math.max(rect.height, 200);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastTime = performance.now();

    const draw = (time: number) => {
      if (!isVisibleRef.current || isPaused || document.hidden) {
        animFrameId.current = null;
        return;
      }

      animFrameId.current = requestAnimationFrame(draw);

      if (time - lastTime < 26) {
        return; // ~38 FPS throttle for zero lag
      }
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Deep Cosmic Obsidian bedrock (#090D16)
      ctx.fillStyle = '#090D16';
      ctx.fillRect(0, 0, width, height);

      // Soft ambient radial aura in upper center
      const auraGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.2, 50,
        width * 0.5, height * 0.2, width * 0.8
      );
      auraGradient.addColorStop(0, 'rgba(99, 102, 241, 0.07)');
      auraGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.03)');
      auraGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const maxDist = Math.min(width, height) * 0.22;

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          p.z += p.vz;

          if (p.z < 0.5 || p.z > 2.5) p.vz *= -1;

          if (p.x < 0) { p.x = width; }
          if (p.x > width) { p.x = 0; }
          if (p.y < 0) { p.y = height; }
          if (p.y > height) { p.y = 0; }

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && dist > 1) {
              const force = (180 - dist) / 180 * 0.6;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          p.pulsePhase += dt * 1.8;
        }
      }

      // Draw dynamic synaptic connections with gradient luminance
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35 * Math.min(p1.z, p2.z);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.min(p1.z, p2.z) * 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw cursor connection web
      if (pointer.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = '#38BDF8';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // Pointer pulse
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw particle nodes with soft bloom
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(p.pulsePhase) * 0.4 + 0.6;
        const radius = p.baseRadius * p.z * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Subtle soft glow for foreground nodes
        if (p.z > 1.4) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10 * (p.z - 1.2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }
    };

    const startLoop = () => {
      if (isVisibleRef.current && !isPaused && !document.hidden && !animFrameId.current) {
        lastTime = performance.now();
        animFrameId.current = requestAnimationFrame(draw);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      } else {
        const rect = container.getBoundingClientRect();
        isVisibleRef.current = rect.bottom > 0 && rect.top < window.innerHeight;
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility, { passive: true });

    startLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [isPaused]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
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
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full h-full block cursor-crosshair"
        aria-label="Interactive 3D cosmic synaptic particle mesh"
      />

      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Resume background animation" : "Pause background animation"}
        className="absolute bottom-4 right-6 z-20 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 rounded backdrop-blur-md transition-all shadow-sm"
      >
        {isPaused ? '▶ Motion' : '❚❚ Motion'}
      </button>
    </div>
  );
}
