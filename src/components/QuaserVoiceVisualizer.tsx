import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, Radio, Play, Pause, Sparkles, Activity } from 'lucide-react';

export default function QuaserVoiceVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [isListening, setIsListening] = useState(true);
  const [activeQuery, setActiveQuery] = useState('Hey Quaser, resolve topological nodes for syndicate cluster 1');
  const [latencyMs, setLatencyMs] = useState(248);
  const [duplexState, setDuplexState] = useState<'IDLE' | 'LISTENING' | 'SYNTHESIZING' | 'STREAMING'>('STREAMING');

  const sampleQueries = [
    'Hey Quaser, resolve topological nodes for syndicate cluster 1',
    'Calculate betweenness centrality on cross-border conduit #5',
    'Stream real-time audio duplex with under 280ms response',
    'Audit illicit transaction clusters and generate risk report'
  ];

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
      height = 200;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let phase = 0;
    const numBars = 48;

    const render = () => {
      animFrameId.current = requestAnimationFrame(render);

      // Background clear
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, width, height);

      const midY = height / 2;
      phase += 0.04;

      if (!isListening) {
        // Flatline idle state
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(width, midY);
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      // 1. Draw glowing multi-frequency sine wave curves
      const waveConfigs = [
        { freq: 0.02, amp: 26, color: 'rgba(99, 102, 241, 0.55)', width: 2, offset: 0 },
        { freq: 0.035, amp: 38, color: 'rgba(56, 189, 248, 0.75)', width: 2.5, offset: Math.PI / 3 },
        { freq: 0.015, amp: 20, color: 'rgba(168, 85, 247, 0.45)', width: 1.5, offset: Math.PI / 1.5 },
      ];

      waveConfigs.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          // Windowing envelope to taper edges smoothly
          const envelope = Math.sin((x / width) * Math.PI);
          const y = midY + Math.sin(x * w.freq + phase + w.offset) * w.amp * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw vertical spectral bars
      const barWidth = (width / numBars) * 0.5;
      const spacing = width / numBars;

      for (let i = 0; i < numBars; i++) {
        const x = i * spacing + spacing * 0.25;
        const normX = i / numBars;
        const envelope = Math.sin(normX * Math.PI);
        const barAmp = (Math.sin(phase * 2 + i * 0.3) * 0.5 + 0.5) * 55 * envelope + 4;

        const grad = ctx.createLinearGradient(0, midY - barAmp, 0, midY + barAmp);
        grad.addColorStop(0, '#38BDF8');
        grad.addColorStop(0.5, '#6366F1');
        grad.addColorStop(1, '#A855F7');

        ctx.fillStyle = grad;
        ctx.fillRect(x, midY - barAmp / 2, barWidth, barAmp);
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isListening]);

  const handleSimulateVoice = () => {
    setDuplexState('LISTENING');
    setIsListening(true);
    const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
    setActiveQuery(randomQuery);

    setTimeout(() => {
      setDuplexState('SYNTHESIZING');
      setLatencyMs(Math.floor(Math.random() * 40) + 240);
      setTimeout(() => {
        setDuplexState('STREAMING');
      }, 500);
    }, 600);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Visualizer Header */}
      <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                QUASER · Real-Time Audio Duplex Visualizer
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300">
                LOW-LATENCY DUPLEX
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive acoustic frequency spectrum & speech-to-intent pipeline
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateVoice}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Query</span>
          </button>

          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label={isListening ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isListening ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-rose-400" />}
          </button>
        </div>
      </div>

      {/* Waveform Viewport */}
      <div ref={containerRef} className="relative w-full h-[200px] bg-[#080C14]">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Telemetry Overlays */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
          <div className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">STATE: </span>
            <span className="text-indigo-300 font-semibold">{duplexState}</span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-slate-400">STREAMING LATENCY: </span>
            <span className="text-purple-400 font-semibold">{latencyMs}ms</span>
            <span className="text-slate-500 ml-1">(&lt;280ms SLA)</span>
          </div>
        </div>

        {/* Live Audio Transcript Box */}
        <div className="absolute bottom-4 left-4 right-4 px-4 py-2 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 truncate pr-4">
            <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400 shrink-0">INTENT:</span>
            <span className="text-white truncate">&quot;{activeQuery}&quot;</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold shrink-0">99.1% CONF</span>
        </div>
      </div>

      {/* Footer Specs */}
      <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span>Full Duplex Audio Pipeline: Streaming ASR + Intent Resolution + Neural Audio Synthesis</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          WebSockets · AudioContext · Whisper ASR
        </div>
      </div>
    </div>
  );
}
