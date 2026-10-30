import { ArrowUp } from 'lucide-react';
import { ACADEMIC_PROFILE } from '../utils/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070A10] border-t border-slate-800/80 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
            M
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Mehebub Islam
            </div>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} · B.Tech in AI & ML, REVA University, Bengaluru
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <a
            href={ACADEMIC_PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={ACADEMIC_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${ACADEMIC_PROFILE.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
