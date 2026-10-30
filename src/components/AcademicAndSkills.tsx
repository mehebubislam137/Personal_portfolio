import { GraduationCap, MapPin, Award, BookOpen, Brain, Network, Mic, Code, Sparkles, CheckCircle } from 'lucide-react';
import { ACADEMIC_PROFILE, TECHNICAL_COMPETENCIES } from '../utils/portfolio-data';

export default function AcademicAndSkills() {
  const interestIcons = [
    { title: 'Artificial Intelligence', desc: 'Neural architectures & probabilistic reasoning', icon: <Brain className="w-5 h-5 text-indigo-400" /> },
    { title: 'Machine Learning', desc: 'Supervised, unsupervised & deep models', icon: <Network className="w-5 h-5 text-purple-400" /> },
    { title: 'Voice-based AI', desc: 'Acoustic streaming & speech-to-intent', icon: <Mic className="w-5 h-5 text-cyan-400" /> },
    { title: 'Graph-based Analysis', desc: 'GCNs, topological link prediction & Neo4j', icon: <Network className="w-5 h-5 text-pink-400" /> },
    { title: 'Intelligent Systems', desc: 'Autonomous pipelines & agents', icon: <Award className="w-5 h-5 text-amber-400" /> },
    { title: 'Conversational AI', desc: 'Context memory & empathetic dialogue', icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
    { title: 'Software Development', desc: 'Scalable distributed system patterns', icon: <Code className="w-5 h-5 text-emerald-400" /> },
    { title: 'Web Development', desc: 'Modern reactive interfaces & APIs', icon: <Code className="w-5 h-5 text-blue-400" /> }
  ];

  return (
    <section id="academic" className="py-20 lg:py-28 border-b border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>EDUCATION & EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Academic & Technical Background
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Rigorous undergraduate training in Artificial Intelligence and Machine Learning at REVA University, Bengaluru.
          </p>
        </div>

        {/* Education & Core Focus Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Degree Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-800">
                <span>HIGHER EDUCATION</span>
                <span className="text-indigo-400 font-semibold">B.TECH CANDIDATE</span>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Bachelor of Technology</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Artificial Intelligence & Machine Learning
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                  <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{ACADEMIC_PROFILE.institution}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{ACADEMIC_PROFILE.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CORE CURRICULUM HIGHLIGHTS
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-['Inter']">
                Deep neural network architectures, graph theory, high-dimensional probability & linear algebra, conversational agents, and production software engineering.
              </p>
            </div>
          </div>

          {/* Technical Interests Grid */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-800 mb-6">
                <span>SPECIALIZATION AREAS</span>
                <span className="text-indigo-400 font-semibold">8 DOMAIN FOCUSES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {interestIcons.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-xl flex items-start gap-3.5 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Dedicated to building reliable, high-impact systems</span>
              <span className="text-indigo-400 font-medium">REVA University</span>
            </div>
          </div>
        </div>

        {/* Technical Competencies Matrix */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Full Technology Stack Matrix</h3>
            <span className="text-xs font-mono text-slate-400">TOOLS & FRAMEWORKS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNICAL_COMPETENCIES.map((cluster) => (
              <div
                key={cluster.category}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{cluster.category}</span>
                  </h4>

                  <ul className="space-y-2 border-t border-slate-800/80 pt-3">
                    {cluster.skills.map((skill) => (
                      <li key={skill} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
