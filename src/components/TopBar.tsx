import { useState } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

interface TopBarProps {
  onContactClick: () => void;
  onDemosClick: () => void;
}

export default function TopBar({ onContactClick, onDemosClick }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Live AI Demos', href: '#demos', special: true },
    { label: 'Academic & Skills', href: '#academic' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090D16]/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <a
          href="#"
          className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-base font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Mehebub Islam
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              AI/ML Engineer · REVA Univ
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                link.special ? 'text-indigo-400 font-semibold hover:text-indigo-300' : ''
              }`}
            >
              {link.special && <Cpu className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap shrink-0 hover:-translate-y-0.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090D16] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-slate-800/60 flex items-center justify-between ${
                  link.special ? 'text-indigo-400 font-medium' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.special && <Cpu className="w-4 h-4 text-indigo-400" />}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-2.5 text-xs font-medium text-white bg-indigo-600 rounded-lg text-center"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
