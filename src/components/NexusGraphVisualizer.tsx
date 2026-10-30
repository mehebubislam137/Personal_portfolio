import { useEffect, useRef, useState } from 'react';
import { Network, Play, Pause, RefreshCw, Eye, ShieldAlert, Cpu } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  cluster: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isBroker?: boolean;
  score: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
  flowProgress: number;
}

export default function NexusGraphVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [isRunning, setIsRunning] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [highlightBrokers, setHighlightBrokers] = useState(false);
  const [inferenceStep, setInferenceStep] = useState('Layer 2 GCN Convolution [Converged]');
  const [gcnAccuracy, setGcnAccuracy] = useState('98.4%');

  const nodesRef = useRef<Node[]>([
    { id: '1', label: 'Primary Broker (Omega)', cluster: 1, x: 280, y: 150, vx: 0, vy: 0, radius: 11, isBroker: true, score: 0.994 },
    { id: '2', label: 'Financial Conduit A', cluster: 1, x: 200, y: 100, vx: 0, vy: 0, radius: 8, score: 0.88 },
    { id: '3', label: 'Mule Entity 104', cluster: 1, x: 180, y: 220, vx: 0, vy: 0, radius: 7, score: 0.74 },
    { id: '4', label: 'Shell Corp Alpha', cluster: 1, x: 330, y: 80, vx: 0, vy: 0, radius: 7, score: 0.81 },
    { id: '5', label: 'Cross-Border Mule', cluster: 2, x: 420, y: 190, vx: 0, vy: 0, radius: 10, isBroker: true, score: 0.962 },
    { id: '6', label: 'Syndicate Cell B', cluster: 2, x: 500, y: 130, vx: 0, vy: 0, radius: 8, score: 0.89 },
    { id: '7', label: 'Crypto Liquidity Pool', cluster: 2, x: 530, y: 240, vx: 0, vy: 0, radius: 9, score: 0.92 },
    { id: '8', label: 'Transit Node C', cluster: 3, x: 350, y: 280, vx: 0, vy: 0, radius: 7, score: 0.79 },
    { id: '9', label: 'Liaison Relay', cluster: 3, x: 260, y: 320, vx: 0, vy: 0, radius: 8, score: 0.85 },
    { id: '10', label: 'Darknet Gateway', cluster: 3, x: 450, y: 330, vx: 0, vy: 0, radius: 8, score: 0.91 }
  ]);

  const edgesRef = useRef<Edge[]>([
    { source: '1', target: '2', weight: 1.5, flowProgress: 0.1 },
    { source: '1', target: '3', weight: 1.2, flowProgress: 0.4 },
    { source: '1', target: '4', weight: 1.8, flowProgress: 0.7 },
    { source: '1', target: '5', weight: 2.2, flowProgress: 0.2 }, // Cross-cluster link
    { source: '5', target: '6', weight: 1.6, flowProgress: 0.5 },
    { source: '5', target: '7', weight: 1.9, flowProgress: 0.8 },
    { source: '6', target: '7', weight: 1.1, flowProgress: 0.3 },
    { source: '1', target: '8', weight: 1.3, flowProgress: 0.6 },
    { source: '8', target: '9', weight: 1.0, flowProgress: 0.9 },
    { source: '8', target: '10', weight: 1.4, flowProgress: 0.15 },
    { source: '5', target: '10', weight: 1.7, flowProgress: 0.45 }
  ]);

  const clusterColors = ['#818CF8', '#38BDF8', '#F43F5E', '#A855F7'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 600;
      height = 380;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (now: number) => {
      animFrameId.current = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!isRunning) return;

      // Dark canvas clear
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Subtle spring/organic drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += Math.sin(now * 0.001 + i) * 0.2;
        n.y += Math.cos(now * 0.0012 + i * 1.5) * 0.2;

        // Keep within bounds
        n.x = Math.max(50, Math.min(width - 50, n.x));
        n.y = Math.max(40, Math.min(height - 40, n.y));
      }

      // Draw edges
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const sNode = nodes.find((n) => n.id === edge.source);
        const tNode = nodes.find((n) => n.id === edge.target);
        if (!sNode || !tNode) continue;

        const isHighlighted =
          (selectedNode && (selectedNode.id === sNode.id || selectedNode.id === tNode.id)) ||
          (highlightBrokers && (sNode.isBroker || tNode.isBroker));

        ctx.beginPath();
        ctx.moveTo(sNode.x, sNode.y);
        ctx.lineTo(tNode.x, tNode.y);
        ctx.strokeStyle = isHighlighted ? 'rgba(99, 102, 241, 0.8)' : 'rgba(51, 65, 85, 0.5)';
        ctx.lineWidth = isHighlighted ? 2.2 : 1.2;
        ctx.stroke();

        // Animated flow particle along edge
        edge.flowProgress = (edge.flowProgress + dt * 0.45) % 1;
        const px = sNode.x + (tNode.x - sNode.x) * edge.flowProgress;
        const py = sNode.y + (tNode.y - sNode.y) * edge.flowProgress;

        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#38BDF8' : '#818CF8';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isSelected = selectedNode?.id === n.id;
        const isBroker = n.isBroker && highlightBrokers;
        const color = clusterColors[n.cluster % clusterColors.length];

        // Glow ring for brokers or selected node
        if (isSelected || isBroker) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = isBroker ? 'rgba(244, 63, 94, 0.7)' : 'rgba(99, 102, 241, 0.7)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isSelected ? 16 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node label
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(n.label, n.x + n.radius + 6, n.y + 3);
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isRunning, selectedNode, highlightBrokers]);

  const handleTriggerInference = () => {
    setInferenceStep('Running Spectral Convolution on Adjacency Matrix...');
    setTimeout(() => {
      setInferenceStep('Topological Community Aggregation [Epoch 120/120]');
      setTimeout(() => {
        setInferenceStep('Layer 2 GCN Convolution [Converged]');
        setGcnAccuracy('98.4%');
      }, 700);
    }, 600);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Simulation Header */}
      <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                NEXUS · Live GCN Graph Neural Network Simulator
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-pulse">
                LIVE INFERENCE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive topological link prediction & criminal cluster resolution
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHighlightBrokers(!highlightBrokers)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
              highlightBrokers
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{highlightBrokers ? 'Cut Vertices Active' : 'Detect Cut Vertices'}</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerInference}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Re-compute GCN</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label={isRunning ? 'Pause simulation' : 'Play simulation'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div ref={containerRef} className="relative w-full h-[360px] bg-[#080C14]">
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />

        {/* Real-time telemetry badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-slate-500">GCN CONVOLUTION: </span>
            <span className="text-indigo-400 font-semibold">{inferenceStep}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-slate-500">ACCURACY: </span>
            <span className="text-emerald-400 font-semibold">{gcnAccuracy}</span>
            <span className="text-slate-500 ml-2">NODES: </span>
            <span className="text-cyan-400 font-semibold">10</span>
            <span className="text-slate-500 ml-2">EDGES: </span>
            <span className="text-purple-400 font-semibold">11</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center gap-4 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Cluster 1 (Alpha)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Cluster 2 (Beta)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>Cluster 3 (Transit)</span>
          </div>
        </div>
      </div>

      {/* Bottom Insights Strip */}
      <div className="px-6 py-3.5 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-mono font-medium">Topological Insight:</span>
          <span>Nodes #1 and #5 hold highest Betweenness Centrality (0.994 & 0.962).</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          PyTorch Geometric · NetworkX · Neo4j
        </div>
      </div>
    </div>
  );
}
