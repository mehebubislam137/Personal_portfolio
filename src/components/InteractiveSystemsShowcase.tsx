import { useState } from 'react';
import { Network, Radio, Sparkles, Layers, Cpu } from 'lucide-react';
import NexusGraphVisualizer from './NexusGraphVisualizer';
import QuaserVoiceVisualizer from './QuaserVoiceVisualizer';

export default function InteractiveSystemsShowcase() {
  const [activeTab, setActiveTab] = useState<'nexus' | 'quaser'>('nexus');

  return (
    <section id="demos" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#090D18]/80 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE SYSTEM SIMULATION & ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Interactive AI Architectures
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Test Mehebub&apos;s real-time AI and graph models in the browser. Toggle between the Graph Neural Network simulator and the Voice AI acoustic duplex.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('nexus')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'nexus'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Network className="w-4 h-4 text-indigo-300" />
            <span>NEXUS: GCN Criminal Network Intelligence</span>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white">
              98.4% Acc
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quaser')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'quaser'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 border border-purple-500'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Radio className="w-4 h-4 text-purple-300" />
            <span>QUASER: Real-Time Voice Duplex Visualizer</span>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white">
              &lt;280ms
            </span>
          </button>
        </div>

        {/* Active System Viewport */}
        <div className="transition-all duration-300">
          {activeTab === 'nexus' ? (
            <div className="space-y-6">
              <NexusGraphVisualizer />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-indigo-400 font-semibold">01 · GRAPH CONVOLUTIONS</span>
                  <p className="text-slate-300 leading-relaxed">
                    Message passing along transaction edges aggregates neighbor feature representations across hidden multi-layer topologies.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-cyan-400 font-semibold">02 · COMMUNITY DETECTION</span>
                  <p className="text-slate-300 leading-relaxed">
                    Louvain modularity optimization isolates cohesive criminal syndicates and identifies covert money laundering conduits.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-pink-400 font-semibold">03 · CENTRALITY RESOLUTION</span>
                  <p className="text-slate-300 leading-relaxed">
                    Betweenness & eigenvector centrality pinpoints high-value illicit brokers who bridge otherwise disconnected underground cells.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <QuaserVoiceVisualizer />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-purple-400 font-semibold">01 · ACOUSTIC STREAMING</span>
                  <p className="text-slate-300 leading-relaxed">
                    Chunked WebAudio capture streams raw PCM packets over low-latency binary WebSockets directly to neural speech models.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-cyan-400 font-semibold">02 · INTENT RESOLUTION</span>
                  <p className="text-slate-300 leading-relaxed">
                    Contextual embeddings parse user spoken commands in parallel with streaming transcription to shave 300ms of end-to-end latency.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-emerald-400 font-semibold">03 · FULL DUPLEX AUDIO</span>
                  <p className="text-slate-300 leading-relaxed">
                    Barge-in detection automatically suppresses ongoing audio synthesis whenever the user interrupts or gives follow-up instructions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
