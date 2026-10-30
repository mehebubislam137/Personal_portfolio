/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import InteractiveSystemsShowcase from './components/InteractiveSystemsShowcase';
import ProjectShowcase from './components/ProjectShowcase';
import AcademicAndSkills from './components/AcademicAndSkills';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import { PORTFOLIO_PROJECTS, Project } from './utils/portfolio-data';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-['Inter'] relative selection:bg-indigo-500 selection:text-white">
      {/* Navigation Top Bar */}
      <TopBar
        onContactClick={() => scrollToSection('contact')}
        onDemosClick={() => scrollToSection('demos')}
      />

      {/* Main Content Landmarks */}
      <main>
        {/* Hero Section with Interactive Cosmic Synaptic Canvas & Animated Counters */}
        <HeroSection
          onExploreClick={() => scrollToSection('projects')}
          onProjectsClick={() => scrollToSection('projects')}
          onDemosClick={() => scrollToSection('demos')}
        />

        {/* Live Interactive Systems Simulation & Architecture Demos (NEXUS GCN & QUASER Voice Duplex) */}
        <InteractiveSystemsShowcase />

        {/* Selected Engineering Projects Showcase (7 Artifacts with 3D Tilt Cards) */}
        <ProjectShowcase
          projects={PORTFOLIO_PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Academic Foundations & Technical Competencies */}
        <AcademicAndSkills />

        {/* Contact & Communication */}
        <ContactTerminal />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
