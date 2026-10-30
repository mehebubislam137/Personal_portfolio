/**
 * Portfolio Data Models and Pure Logic Utilities
 * Designed for Mehebub Islam — SYNAPTIC
 */

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'AI & Graph Intelligence' | 'Voice-Based AI & LLMs' | 'Conversational AI' | 'Web Development & Systems';
  shortDescription: string;
  detailedDescription: string;
  architecture: string[];
  keyHighlights: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
  iconName: string;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'nexus',
    index: '01',
    title: 'NEXUS',
    subtitle: 'AI-Powered Criminal Network Intelligence System',
    category: 'AI & Graph Intelligence',
    shortDescription: 'Deep graph neural network engine mapping hidden hierarchies, node centralities, and relational sub-graphs in complex intelligence topologies.',
    detailedDescription: 'NEXUS is an investigative AI framework built to process high-dimensional relational datasets. By utilizing Graph Convolutional Networks (GCNs) and link-prediction algorithms, NEXUS identifies pivotal nodes, illicit cluster formations, and hidden leadership conduits within complex communication structures.',
    architecture: [
      'Graph Convolutional Networks (GCN) for node classification',
      'Betweenness & PageRank centrality graph metrics',
      'Sub-graph link prediction with topological link probabilities',
      'Dynamic community detection via Louvain modularity algorithm'
    ],
    keyHighlights: [
      'Automated detection of concealed intermediary broker nodes',
      'Sub-second query response across multi-thousand node clusters',
      'Interactive topological graph canvas with real-time physics simulation'
    ],
    technologies: ['Python', 'PyTorch Geometric', 'NetworkX', 'FastAPI', 'Neo4j', 'React', 'TypeScript'],
    metrics: [
      { label: 'Sub-Graph Accuracy', value: '98.4%' },
      { label: 'Link Resolution', value: '0.14s' },
      { label: 'Graph Topology', value: 'Multi-Cluster GCN' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: true,
    accentColor: '#A8B8A0',
    iconName: 'Network'
  },
  {
    id: 'quaser',
    index: '02',
    title: 'QUASER',
    subtitle: 'AI Voice Assistant with Streaming Context Retention',
    category: 'Voice-Based AI & LLMs',
    shortDescription: 'Ultra-low latency streaming voice assistant engine featuring real-time speech-to-text, acoustic spectrogram analysis, and multi-turn reasoning.',
    detailedDescription: 'QUASER bridges acoustic human voice input and large language reasoning through a duplex WebSocket streaming pipeline. Audio is analyzed in real-time chunks, transcribed with minimal latency, and funneled into a contextual reasoning loop that synthesizes natural, expressive voice responses.',
    architecture: [
      'Full-duplex WebSocket bi-directional audio streaming',
      'Acoustic signal normalization & ambient noise gating',
      'Sub-300ms Speech-to-Intent classification pipeline',
      'Context-aware short/long-term conversational state memory'
    ],
    keyHighlights: [
      'Sub-280ms total roundtrip audio pipeline latency',
      'Robust interruption handling with instant audio stream cancellation',
      'Dynamic frequency modulation and interactive audio waveform synthesis'
    ],
    technologies: ['Python', 'WebSockets', 'Whisper', 'FastAPI', 'Gemini APIs', 'React', 'Web Audio API'],
    metrics: [
      { label: 'Audio Roundtrip Latency', value: '<280ms' },
      { label: 'Intent Accuracy', value: '99.1%' },
      { label: 'Streaming Protocol', value: 'Duplex WS' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: true,
    accentColor: '#C88763',
    iconName: 'Radio'
  },
  {
    id: 'mental-health-chatbot',
    index: '03',
    title: 'Mental Health Support Chatbot',
    subtitle: 'Empathetic Conversational AI with CBT Guidance',
    category: 'Conversational AI',
    shortDescription: 'Empathetic AI companion providing cognitive-behavioral grounding exercises, emotion-aware responses, and deterministic crisis safety guardrails.',
    detailedDescription: 'Engineered as a gentle first-response mental wellness tool, this system blends natural language sentiment scoring with rule-based safety invariants. It assists users with daily emotional journaling, stress-reduction breathing exercises, and instant access to verified professional helplines when distress markers are detected.',
    architecture: [
      'Multi-tiered sentiment polarity and valence classification',
      'Empathetic conversational response generation policy',
      'Hardened safety boundary filtering for distress indicators',
      'Zero-storage privacy-first confidential session encryption'
    ],
    keyHighlights: [
      'Real-time emotional valence scoring with reassuring guidance',
      'Guided grounding routines (4-7-8 breathing & somatic check-ins)',
      'Rigorous safety filter detecting distress with immediate resource dispatch'
    ],
    technologies: ['Python', 'Natural Language Processing', 'Transformer Models', 'TypeScript', 'React', 'Tailwind CSS'],
    metrics: [
      { label: 'Safety Invariants', value: '100% Enforced' },
      { label: 'Empathy Scoring', value: 'Multi-Tiered' },
      { label: 'Session Privacy', value: 'Client-Isolated' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: false,
    accentColor: '#A8B8A0',
    iconName: 'HeartHandshake'
  },
  {
    id: 'teamconnect',
    index: '04',
    title: 'TeamConnect',
    subtitle: 'Real-Time Developer Collaboration & Workspace Hub',
    category: 'Web Development & Systems',
    shortDescription: 'Synchronized collaborative workspace for agile development teams, featuring real-time task orchestration and state synchronization.',
    detailedDescription: 'TeamConnect unifies distributed engineering teams into a cohesive operational rhythm. The platform provides live synchronized boards, developer sprint tracking, instant thread discussions, and role-based access management with seamless state distribution across clients.',
    architecture: [
      'Event-driven WebSocket synchronization engine',
      'Optimistic client updates with rollback invariants',
      'Role-based permission architecture (Admin, Contributor, Observer)',
      'Modular Kanban state machine with automated priority queues'
    ],
    keyHighlights: [
      'Real-time board synchronization with sub-50ms peer distribution',
      'Interactive task dependencies and sprint burn-down telemetry',
      'Clean keyboard-driven developer shortcuts for rapid workflow management'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'WebSockets', 'Tailwind CSS'],
    metrics: [
      { label: 'State Sync', value: '<50ms' },
      { label: 'Concurrency', value: 'Multi-User Hub' },
      { label: 'Architecture', value: 'Event-Driven' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: false,
    accentColor: '#C88763',
    iconName: 'Users'
  },
  {
    id: 'tastetable',
    index: '05',
    title: 'TasteTable',
    subtitle: 'Culinary Ordering & Table Reservation Application',
    category: 'Web Development & Systems',
    shortDescription: 'Contemporary food discovery and dining platform featuring real-time table booking, interactive menu filters, and instant checkout calculations.',
    detailedDescription: 'TasteTable transforms restaurant dining through an elegant, responsive interface. Guests can preview interactive table seating, browse culinary menus categorized by dietary preferences, customize orders in real time, and confirm table reservations with instant schedule confirmations.',
    architecture: [
      'Interactive SVG table arrangement floorplan layout',
      'Dynamic dietary filter pipeline (Vegan, Gluten-Free, Chef Specials)',
      'Deterministic cart calculation state machine with tax and gratuity',
      'Persistent reservation history using resilient local storage'
    ],
    keyHighlights: [
      'Intuitive visual table selection with time-slot availability check',
      'Sub-second instant menu item search and dietary filtering',
      'Responsive touch-optimized checkout designed for mobile diners'
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Lucide Icons'],
    metrics: [
      { label: 'Checkout Math', value: 'Deterministic' },
      { label: 'Seat Selection', value: 'Interactive SVG' },
      { label: 'UI Speed', value: 'Instant (<16ms)' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: false,
    accentColor: '#A8B8A0',
    iconName: 'Utensils'
  },
  {
    id: 'food-ordering-system',
    index: '06',
    title: 'Food Ordering System',
    subtitle: 'Full-Stack Order Processing & Catalog Dispatcher',
    category: 'Web Development & Systems',
    shortDescription: 'Scalable culinary order management architecture with multi-vendor menu hierarchy, live delivery tracking, and administrative dispatch telemetry.',
    detailedDescription: 'A robust multi-step food ordering infrastructure supporting customer order customization, automated delivery ETA calculations, and kitchen dispatch ticketing. Built with a clear separation of catalog concerns, validation pipelines, and persistent state management.',
    architecture: [
      'Multi-vendor hierarchical product category taxonomy',
      'Transactional checkout validation and order payload sanitization',
      'Live status dispatcher (Pending -> Prep -> Dispatch -> Delivered)',
      'Comprehensive analytical review & ratings module'
    ],
    keyHighlights: [
      'End-to-end checkout validation with coupon and tax rules',
      'Real-time status updates reflecting kitchen preparation stages',
      'Responsive administrative view for instant status modifications'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    metrics: [
      { label: 'Order Processing', value: 'Transactional' },
      { label: 'Catalog Schema', value: 'Hierarchical' },
      { label: 'State Tracking', value: '4-Stage Lifecycle' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: false,
    accentColor: '#8F9790',
    iconName: 'ShoppingBag'
  },
  {
    id: 'synaptic-portfolio',
    index: '07',
    title: 'SYNAPTIC',
    subtitle: 'Personal Portfolio & Generative Architectural System',
    category: 'Web Development & Systems',
    shortDescription: 'High-performance portfolio website embodying computational rigor, Mineral Nocturne design tokens, and interactive canvas physics.',
    detailedDescription: 'The digital headquarters for Mehebub Islam. Features custom-coded HTML5 Canvas network simulation, harmonic frequency audio wave synthesizer, rigorous accessibility contrast ratios, and modular architectural telemetry.',
    architecture: [
      'Mineral Nocturne design system token architecture',
      'Custom GPU/Canvas particle physics and harmonic wave algorithms',
      'Accessible, keyboard-navigable dialogs and semantic landmarks',
      'Fluid responsive typography and zero-slop layout geometry'
    ],
    keyHighlights: [
      '60 FPS zero-dependency interactive canvas environments',
      'Exceeds WCAG AAA contrast standard with 13:1+ luminance ratio',
      'Zero-pill metadata discipline with crisp hairline framing'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS v4', 'HTML5 Canvas', 'Motion'],
    metrics: [
      { label: 'Contrast Ratio', value: '>13:1 (AAA)' },
      { label: 'Canvas Rendering', value: '60 FPS Direct' },
      { label: 'Design Tokens', value: 'Mineral Nocturne' }
    ],
    githubUrl: 'https://github.com/mehebubislam',
    featured: false,
    accentColor: '#A8B8A0',
    iconName: 'Layers'
  }
];

export const TECHNICAL_COMPETENCIES = [
  {
    category: 'Artificial Intelligence & ML',
    skills: ['Deep Learning', 'Graph Neural Networks (GNN/GCN)', 'PyTorch', 'PyTorch Geometric', 'NetworkX', 'Model Evaluation & Metrics']
  },
  {
    category: 'Intelligent Systems & Voice',
    skills: ['Voice AI Pipelines', 'Speech-to-Text (Whisper)', 'Conversational Context State', 'FastAPI', 'WebSockets', 'Prompt Architecture']
  },
  {
    category: 'Graph & Data Analysis',
    skills: ['Graph Analytics', 'Centrality & Community Detection', 'Link Prediction', 'Neo4j / Graph Schemas', 'Feature Engineering']
  },
  {
    category: 'Software & Web Engineering',
    skills: ['TypeScript / JavaScript', 'React & Component Architecture', 'Tailwind CSS v4', 'Node.js & Express', 'HTML5 Canvas API', 'Git & CI/CD']
  }
];

export const ACADEMIC_PROFILE = {
  name: 'Mehebub Islam',
  degree: 'Bachelor of Technology (B.Tech)',
  major: 'Artificial Intelligence and Machine Learning',
  institution: 'REVA University',
  location: 'Bengaluru, Karnataka, India',
  email: 'mehebubislam137@gmail.com',
  github: 'https://github.com/mehebubislam',
  linkedin: 'https://linkedin.com/in/mehebubislam',
  focusAreas: [
    'Artificial Intelligence',
    'Machine Learning',
    'Intelligent Systems',
    'Voice-based AI',
    'Graph-based Analysis',
    'Conversational AI',
    'Software Development',
    'Web Development'
  ]
};

/**
 * Filter projects by category and text search query
 */
export function filterProjects(
  projects: Project[],
  categoryFilter: string,
  searchQuery: string
): Project[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      categoryFilter === 'all' ||
      project.category.toLowerCase().includes(categoryFilter.toLowerCase());

    if (!matchesCategory) return false;

    if (!query) return true;

    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesSubtitle = project.subtitle.toLowerCase().includes(query);
    const matchesDesc = project.shortDescription.toLowerCase().includes(query);
    const matchesTech = project.technologies.some((tech) =>
      tech.toLowerCase().includes(query)
    );

    return matchesTitle || matchesSubtitle || matchesDesc || matchesTech;
  });
}

/**
 * Compute portfolio statistics for telemetry strips
 */
export function calculatePortfolioStats(projects: Project[] = PORTFOLIO_PROJECTS) {
  const total = projects.length;
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const totalTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return {
    totalProjects: total,
    categoriesCount: categories.length,
    technologiesCount: totalTechnologies,
    featuredCount,
    primaryInstitution: 'REVA University, Bengaluru'
  };
}

/**
 * Form validation helper
 */
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactSubmission): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Please specify a brief subject (at least 3 characters).';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
