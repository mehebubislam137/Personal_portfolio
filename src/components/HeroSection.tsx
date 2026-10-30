import { ArrowDown, Sparkles, Github, Linkedin, Mail, Cpu, Network } from 'lucide-react';
import CosmicSynapseCanvas from './CosmicSynapseCanvas';
import AnimatedCounter from './AnimatedCounter';
import { ACADEMIC_PROFILE } from '../utils/portfolio-data';

interface HeroSectionProps {
  onExploreClick: () => void;
  onProjectsClick: () => void;
  onDemosClick: () => void;
}

export default function HeroSection({
  onExploreClick,
  onProjectsClick,
  onDemosClick
}: HeroSectionProps) {
  return (
    <section id="about" className="relative min-h-[92vh] flex flex-col justify-center border-b border-slate-800/80 overflow-hidden">
      {/* 3D Cosmic Synapse Particle Canvas */}
      <CosmicSynapseCanvas />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge with soft breathing glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI/ML ENGINEER & RESEARCHER · BENGALURU</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] [text-wrap:balance]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 animate-gradient">Intelligent Systems</span> & Graph AI.
            </h1>

            {/* Narrative Prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-['Inter']">
              Hello, I am <span className="text-white font-semibold">Mehebub Islam</span>. I specialize in Artificial Intelligence, Graph Neural Networks (GCNs), low-latency Voice AI streaming pipelines, and resilient full-stack systems at <span className="text-indigo-300">REVA University, Bengaluru</span>.
            </p>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onProjectsClick}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 group hover:-translate-y-0.5"
              >
                <span>Explore Featured Systems</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onDemosClick}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold rounded-xl text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/40 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Interactive AI Demos</span>
              </button>
            </div>

            {/* Verified Social Connect Channels */}
            <div className="flex items-center gap-4 pt-4 text-slate-400">
              <span className="text-xs font-mono text-slate-500">CONNECT:</span>
              <a
                href={ACADEMIC_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={ACADEMIC_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${ACADEMIC_PROFILE.email}`}
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Profile Card with Soft Lighting */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl hover:border-indigo-500/40 transition-all group">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                    MI
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Mehebub Islam</h3>
                    <p className="text-xs font-mono text-indigo-400">B.Tech AI & ML Candidate</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    OPEN TO WORK
                  </span>
                </div>
              </div>

              {/* Research Focus Pillars */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>RESEARCH FOCUS & PILLARS</span>
                  <span className="text-indigo-400 text-[10px]">4 PILLARS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-slate-300 flex items-center gap-2 hover:border-indigo-500/30 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>Graph Neural Nets</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-slate-300 flex items-center gap-2 hover:border-cyan-500/30 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Real-Time Voice AI</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-slate-300 flex items-center gap-2 hover:border-purple-500/30 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Conversational NLP</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-slate-300 flex items-center gap-2 hover:border-pink-500/30 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Intelligent Systems</span>
                  </div>
                </div>
              </div>

              {/* Signature Project Teaser */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/20 space-y-2 hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-300 font-semibold flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-indigo-400" />
                    FLAGSHIP ARCHITECTURE
                  </span>
                  <span className="text-emerald-400 font-semibold">98.4% ACCURACY</span>
                </div>
                <div className="text-sm font-semibold text-white">NEXUS — Criminal Network Intelligence</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mapping hidden hierarchies, central brokers, and illicit cluster conduits using Graph Convolutional Networks.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>REVA UNIVERSITY, BENGALURU</span>
                <span className="text-indigo-400">2026 COHORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Animated Metric Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">SYSTEMS ENGINEERED</div>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-white flex items-baseline gap-1.5">
              <AnimatedCounter end={7} prefix="0" className="text-white" />
              <span className="text-sm font-normal text-indigo-400">Artifacts</span>
            </div>
            <div className="text-xs text-slate-500">AI, Voice, Graphs & Web</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">GRAPH INTELLIGENCE</div>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-white flex items-baseline gap-1.5">
              <AnimatedCounter end={98.4} decimals={1} suffix="%" className="text-white" />
              <span className="text-sm font-normal text-cyan-400">GCN Acc</span>
            </div>
            <div className="text-xs text-slate-500">Topological Link Resolution</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">STREAMING LATENCY</div>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-white flex items-baseline gap-1.5">
              <span className="text-white">&lt;</span>
              <AnimatedCounter end={280} suffix="ms" className="text-white" />
              <span className="text-sm font-normal text-purple-400">Audio</span>
            </div>
            <div className="text-xs text-slate-500">QUASER Voice Duplex</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">ACADEMIC FOUNDATION</div>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-white flex items-baseline gap-1.5">
              <span>REVA</span>
              <span className="text-sm font-normal text-pink-400">Univ</span>
            </div>
            <div className="text-xs text-slate-500">B.Tech AI & ML · Bengaluru</div>
          </div>
        </div>
      </div>
    </section>
  );
}
