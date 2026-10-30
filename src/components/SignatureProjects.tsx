import { useState } from 'react';
import { ArrowUpRight, Cpu, Layers } from 'lucide-react';
import NetworkCanvas from './NetworkCanvas';
import SoundWaveCanvas from './SoundWaveCanvas';
import { Project } from '../utils/portfolio-data';

interface SignatureProjectsProps {
  onSelectProject: (project: Project) => void;
  nexusProject: Project;
  quaserProject: Project;
}

export default function SignatureProjects({
  onSelectProject,
  nexusProject,
  quaserProject
}: SignatureProjectsProps) {
  const [nexusFilter, setNexusFilter] = useState<'all' | 'dense' | 'sparse'>('dense');

  return (
    <section id="research" className="py-16 lg:py-24 border-b border-[#39483E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#39483E]">
          <div>
            <div className="font-mono text-xs text-[#A8B8A0] tracking-widest uppercase mb-2">
              SIGNATURE RESEARCH CHAPTERS
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold text-[#F0EEE6] tracking-tight">
              Pivotal Intelligence Systems
            </h2>
          </div>
          <p className="font-['Inter'] text-sm text-[#8F9790] max-w-md">
            Architectural case studies into graph neural networks and streaming acoustic intelligence engineered for high-consequence operational clarity.
          </p>
        </div>

        {/* 1. NEXUS — CHAPTER 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Visual Container */}
          <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
            <div className="relative w-full h-[380px] sm:h-[460px] bg-[#252B28] border border-[#39483E] rounded overflow-hidden flex flex-col">
              {/* Header Telemetry Bar */}
              <div className="px-4 py-2.5 bg-[#171A19]/90 border-b border-[#39483E] flex items-center justify-between text-[11px] font-mono text-[#8F9790]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B8A0]" />
                  <span className="text-[#F0EEE6]">SIMULATION: TOPOLOGICAL GCN</span>
                </div>
                {/* Interactive Filter Tabs (Functional Buttons) */}
                <div className="flex items-center gap-1 bg-[#252B28] p-0.5 rounded border border-[#39483E]">
                  <button
                    type="button"
                    onClick={() => setNexusFilter('dense')}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                      nexusFilter === 'dense' ? 'bg-[#A8B8A0] text-[#171A19] font-medium' : 'text-[#8F9790] hover:text-[#F0EEE6]'
                    }`}
                  >
                    High Density
                  </button>
                  <button
                    type="button"
                    onClick={() => setNexusFilter('sparse')}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                      nexusFilter === 'sparse' ? 'bg-[#A8B8A0] text-[#171A19] font-medium' : 'text-[#8F9790] hover:text-[#F0EEE6]'
                    }`}
                  >
                    Clustered
                  </button>
                </div>
              </div>

              {/* Live Canvas */}
              <div className="flex-1 relative">
                <NetworkCanvas
                  density={nexusFilter === 'dense' ? 'high' : 'low'}
                  interactive={true}
                  accentClusters={true}
                />
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-between order-1 lg:order-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A8B8A0] tracking-widest uppercase mb-2">
                <span>CHAPTER 01</span>
                <span className="text-[#39483E]">/</span>
                <span>GRAPH INTELLIGENCE</span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold text-[#F0EEE6] tracking-tight mb-2">
                NEXUS
              </h3>
              <p className="font-mono text-xs text-[#8F9790] mb-4">
                AI-Powered Criminal Network Intelligence System
              </p>

              <p className="font-['Inter'] text-sm sm:text-base text-[#8F9790] leading-relaxed mb-6">
                Investigative framework designed to parse multi-thousand node relational datasets. By utilizing Graph Convolutional Networks (GCNs) and Louvain modularity algorithms, NEXUS isolates concealed broker nodes and calculates topological link probabilities across complex communication graphs.
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-2 border-y border-[#39483E] py-4 my-6 text-xs font-mono text-[#F0EEE6]">
                <div className="flex items-start gap-2">
                  <span className="text-[#A8B8A0]">→</span>
                  <span>Betweenness & PageRank centrality metrics computation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#A8B8A0]">→</span>
                  <span>Concealed intermediary node detection with 98.4% accuracy</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#A8B8A0]">→</span>
                  <span>Sub-second link resolution (0.14s) across clustered graphs</span>
                </div>
              </div>

              {/* Technologies unboxed list */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8F9790]">
                <span className="text-[#A8B8A0]">STACK:</span>
                <span>PyTorch Geometric</span>
                <span className="text-[#39483E]">·</span>
                <span>NetworkX</span>
                <span className="text-[#39483E]">·</span>
                <span>Python</span>
                <span className="text-[#39483E]">·</span>
                <span>Neo4j</span>
                <span className="text-[#39483E]">·</span>
                <span>FastAPI</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProject(nexusProject)}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#252B28] text-[#F0EEE6] border border-[#A8B8A0] rounded hover:bg-[#A8B8A0] hover:text-[#171A19] transition-all flex items-center gap-2 group"
              >
                <span>[&gt;] Inspect NEXUS Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="text-right">
                <div className="font-['Space_Grotesk'] text-lg font-semibold text-[#F0EEE6]">98.4%</div>
                <div className="text-[10px] font-mono text-[#8F9790]">SUB-GRAPH ACCURACY</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. QUASER — CHAPTER 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-12 border-t border-[#39483E]/60">
          {/* Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C88763] tracking-widest uppercase mb-2">
                <span>CHAPTER 02</span>
                <span className="text-[#39483E]">/</span>
                <span>VOICE & STREAMING LLMS</span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold text-[#F0EEE6] tracking-tight mb-2">
                QUASER
              </h3>
              <p className="font-mono text-xs text-[#8F9790] mb-4">
                AI Voice Assistant with Streaming Context Retention
              </p>

              <p className="font-['Inter'] text-sm sm:text-base text-[#8F9790] leading-relaxed mb-6">
                Engineered for natural, uninterrupted conversational workflows. QUASER processes real-time acoustic audio chunks through full-duplex WebSockets, performing low-latency speech-to-intent classification and dynamic frequency synthesis with sub-280ms roundtrip audio latency.
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-2 border-y border-[#39483E] py-4 my-6 text-xs font-mono text-[#F0EEE6]">
                <div className="flex items-start gap-2">
                  <span className="text-[#C88763]">→</span>
                  <span>Full-duplex WebSocket bi-directional acoustic streaming</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C88763]">→</span>
                  <span>Sub-280ms end-to-end voice loop with instant barge-in support</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C88763]">→</span>
                  <span>99.1% intent classification accuracy across multi-turn context</span>
                </div>
              </div>

              {/* Technologies unboxed list */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8F9790]">
                <span className="text-[#C88763]">STACK:</span>
                <span>Python</span>
                <span className="text-[#39483E]">·</span>
                <span>WebSockets</span>
                <span className="text-[#39483E]">·</span>
                <span>Whisper STT</span>
                <span className="text-[#39483E]">·</span>
                <span>FastAPI</span>
                <span className="text-[#39483E]">·</span>
                <span>Web Audio API</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProject(quaserProject)}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#252B28] text-[#F0EEE6] border border-[#C88763] rounded hover:bg-[#C88763] hover:text-[#171A19] transition-all flex items-center gap-2 group"
              >
                <span>[&gt;] Inspect QUASER Pipeline</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="text-right">
                <div className="font-['Space_Grotesk'] text-lg font-semibold text-[#F0EEE6]">&lt;280ms</div>
                <div className="text-[10px] font-mono text-[#8F9790]">ROUNDTRIP LATENCY</div>
              </div>
            </div>
          </div>

          {/* Visual Container: SoundWaveCanvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[460px] bg-[#252B28] border border-[#39483E] rounded overflow-hidden flex flex-col">
              <SoundWaveCanvas interactive={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
