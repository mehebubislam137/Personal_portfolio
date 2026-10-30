import { useState, useMemo } from 'react';
import { Search, ArrowRight, Network, Radio, HeartHandshake, Users, Utensils, ShoppingBag, Layers, GitBranch, Sparkles } from 'lucide-react';
import { Project, filterProjects } from '../utils/portfolio-data';
import TiltCard from './TiltCard';

interface ProjectShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectShowcase({ projects, onSelectProject }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, selectedCategory, searchQuery);
  }, [projects, selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Projects (7)' },
    { id: 'AI & Graph', label: 'AI & Graph Intelligence' },
    { id: 'Voice', label: 'Voice & NLP' },
    { id: 'Web', label: 'Full-Stack Web' }
  ];

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'Network': return <Network className="w-5 h-5 text-indigo-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-purple-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'Users': return <Users className="w-5 h-5 text-cyan-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    if (category.includes('Graph')) return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    if (category.includes('Voice')) return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    if (category.includes('Conversational')) return 'bg-pink-500/10 text-pink-300 border-pink-500/30';
    return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  };

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#0A0E17]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>ENGINEERING PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured Projects & Systems
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            A curated showcase of artificial intelligence architectures, real-time voice streaming pipelines, and full-stack distributed applications.
          </p>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input Field */}
          <div className="relative flex items-center min-w-[280px]">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-slate-900/80 text-white placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${getCategoryBadgeClass(project.category)}`}>
                    {project.category}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 group-hover:scale-110 group-hover:bg-indigo-950/60 group-hover:border-indigo-500/40 transition-all">
                    {getProjectIcon(project.iconName)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Short narrative */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-['Inter']">
                  {project.shortDescription}
                </p>
              </div>

              {/* Card Footer: Tech tags & Action */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono text-indigo-400 font-medium">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-white pt-1">
                  <span className="flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>

                  {project.githubUrl && (
                    <span className="text-slate-500 hover:text-slate-300 flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center border border-slate-800 rounded-2xl bg-slate-900/40 space-y-3">
            <p className="text-base font-semibold text-white">No projects found matching your criteria</p>
            <p className="text-xs text-slate-400">Try adjusting your category filter or search query.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
