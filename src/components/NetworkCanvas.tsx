import { useEffect, useRef, useState, useCallback } from 'react';

interface NetworkCanvasProps {
  className?: string;
  interactive?: boolean;
  density?: 'low' | 'medium' | 'high';
  accentClusters?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  layer: number;
  isClusterCenter?: boolean;
  pulsePhase: number;
}

export default function NetworkCanvas({
  className = '',
  interactive = true,
  density = 'medium',
  accentClusters = true
}: NetworkCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [isPaused, setIsPaused] = useState(false);

  const initNodes = useCallback((width: number, height: number) => {
    const counts = { low: 16, medium: 26, high: 36 };
    const count = counts[density];
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      const isCluster = accentClusters && (i % 8 === 0);
      const layer = (i % 3) + 1;
      const baseRadius = isCluster ? 3.5 : 1.2 + layer * 0.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.3 + layer * 0.15),
        vy: (Math.random() - 0.5) * (0.3 + layer * 0.15),
        radius: baseRadius,
        baseRadius,
        layer,
        isClusterCenter: isCluster,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    nodesRef.current = nodes;
  }, [density, accentClusters]);

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
      initNodes(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastTime = performance.now();

    const drawFrame = (time: number) => {
      // True loop termination when invisible or paused - does not consume idle RAF calls!
      if (!isVisibleRef.current || isPaused || document.hidden) {
        animFrameId.current = null;
        return;
      }

      // Schedule next frame
      animFrameId.current = requestAnimationFrame(drawFrame);

      // Frame throttle: max 35 FPS to maintain zero event loop lag
      if (time - lastTime < 28) {
        return;
      }
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Bedrock background fill (#171A19)
      ctx.fillStyle = '#171A19';
      ctx.fillRect(0, 0, width, height);

      // Fine structural grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(57, 72, 62, 0.18)';
      const gridSize = 48;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const maxConnectDist = Math.min(width, height) * 0.28;

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 10) { node.x = 10; node.vx *= -1; }
          if (node.x > width - 10) { node.x = width - 10; node.vx *= -1; }
          if (node.y < 10) { node.y = 10; node.vy *= -1; }
          if (node.y > height - 10) { node.y = height - 10; node.vy *= -1; }

          if (interactive && mouse.active) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 1) {
              const force = (150 - dist) / 150 * 0.45;
              node.x += (dx / dist) * force;
              node.y += (dy / dist) * force;
            }
          }

          node.pulsePhase += dt * 1.5;
        }
      }

      // Batch connections in unified stroke calls
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 184, 160, 0.22)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          if (node.isClusterCenter || other.isClusterCenter) continue;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
          }
        }
      }
      ctx.stroke();

      // Cluster connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(200, 135, 99, 0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node.isClusterCenter) continue;
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
          }
        }
      }
      ctx.stroke();

      // Mouse interactive line
      if (interactive && mouse.active) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(168, 184, 160, 0.45)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          if (dx * dx + dy * dy < 140 * 140) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
          }
        }
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const currentRadius = node.baseRadius + (node.isClusterCenter ? pulse * 1.5 : 0);

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);

        if (node.isClusterCenter) {
          ctx.fillStyle = '#C88763';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200, 135, 99, ${0.35 + pulse * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = node.layer === 3 ? '#A8B8A0' : 'rgba(168, 184, 160, 0.65)';
          ctx.fill();
        }
      }
    };

    const startLoopIfNeeded = () => {
      if (isVisibleRef.current && !isPaused && !document.hidden && !animFrameId.current) {
        lastTime = performance.now();
        animFrameId.current = requestAnimationFrame(drawFrame);
      }
    };

    // IntersectionObserver to pause execution when scrolled off-screen
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
  }, [initNodes, interactive, isPaused]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full h-full block cursor-crosshair touch-none"
        aria-label="Interactive neural network graph simulation"
      />
      <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[11px] font-mono text-[#8F9790] pointer-events-none tracking-wider uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8B8A0] animate-pulse" />
          <span>GRAPH: TOPOLOGICAL</span>
        </span>
        <span className="text-[#39483E]">/</span>
        <span>GCN NODES: {nodesRef.current.length || 26}</span>
      </div>

      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Resume graph physics" : "Pause graph physics"}
        className="absolute bottom-3 right-4 px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#252B28] text-[#8F9790] hover:text-[#F0EEE6] border border-[#39483E] rounded transition-colors"
      >
        {isPaused ? 'RESUME [▶]' : 'FREEZE [❚❚]'}
      </button>
    </div>
  );
}
