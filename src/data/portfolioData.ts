import lumiereParis from '../assets/images/lumiere_paris_1790880929872.jpg';
import medimateAI from '../assets/images/medimate_ai_1790880946713.jpg';
import futureExperiment from '../assets/images/future_experiment_1790880962498.jpg';

import music01 from '../assets/images/hobbies/music/01.jpg';
import music02 from '../assets/images/hobbies/music/02.jpg';
import music03 from '../assets/images/hobbies/music/03.jpg';

import travel01 from '../assets/images/hobbies/travel/01.jpg';
import travel02 from '../assets/images/hobbies/travel/02.jpg';
import travel03 from '../assets/images/hobbies/travel/03.jpg';

import photography01 from '../assets/images/hobbies/photography/01.jpg';
import photography02 from '../assets/images/hobbies/photography/02.jpg';
import photography03 from '../assets/images/hobbies/photography/03.jpg';

import design01 from '../assets/images/hobbies/design/01.jpg';
import design02 from '../assets/images/hobbies/design/02.jpg';
import design03 from '../assets/images/hobbies/design/03.jpg';

import coffee01 from '../assets/images/hobbies/coffee/01.jpg';
import coffee02 from '../assets/images/hobbies/coffee/02.jpg';
import coffee03 from '../assets/images/hobbies/coffee/03.jpg';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  whatIBuilt: string;
  role: string;
  year: string;
  category: string;
  technologies: string[];
  image: string;
  accentColor: string;
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface MindNode {
  id: string;
  label: string;
  angle: number; // in degrees
  distance: number; // radius factor
  category: 'core' | 'ai' | 'engineering' | 'frontend' | 'backend';
  description: string;
  tools: string[];
}

export interface LabExperiment {
  id: string;
  title: string;
  category: 'AI experiments' | 'UI experiments' | 'Creative coding' | 'Interaction experiments';
  year: string;
  status: string;
  summary: string;
}

export interface JourneyStage {
  stage: 'LEARNING' | 'BUILDING' | 'EXPERIMENTING' | 'CREATING';
  period: string;
  headline: string;
  narrative: string;
  focusAreas: string[];
}

export interface HobbyImage {
  src: string;
  alt: string;
}

export interface HobbyStory {
  id: string;
  index: string;
  title: string;
  oneLiner: string;
  note: string;
  accentColor: string;
  images: [HobbyImage, HobbyImage, HobbyImage];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Ayesha Kanwal',
    brand: 'AYEKAN',
    role: 'Software & AI Engineer',
    heroTagline: 'I build software, AI systems, and digital experiences.',
    aboutHeadline: 'I like building things that are useful, thoughtful, and well made.',
    bio: 'I am a software engineer who works across modern web development, artificial intelligence, and interactive products. I enjoy the full journey of building — from understanding a user problem and designing an intuitive interface to structuring backend APIs and writing clean, reliable code.',
    email: 'ayeshakanwal2715@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    location: 'Open to Opportunities',
    year: '2026',
  },

  projects: [
    {
      id: 'lumiere-paris',
      number: '01',
      title: 'LUMIÈRE PARIS',
      subtitle: 'Interactive Travel & City Experience',
      tagline: 'A cinematic travel website exploring Paris through interactive visuals and motion.',
      description: 'A travel website exploring Paris through interactive visuals, motion, and a smooth scroll-based narrative.',
      whatIBuilt: 'Designed and developed a responsive web experience with dynamic time-of-day ambient themes, smooth client-side transitions, and clean typography.',
      role: 'Frontend Engineering & UI Design',
      year: '2026',
      category: 'Web Experience / Frontend',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
      image: lumiereParis,
      features: [
        'Responsive layout designed for desktop, tablet, and mobile screens',
        'Interactive chapter navigation with subtle scroll-linked visual changes',
        'Optimized local asset loading with zero external dependencies',
      ],
      demoUrl: 'https://example.com/lumiere',
      githubUrl: 'https://github.com/example/lumiere-paris',
    },
    {
      id: 'medimate-ai',
      number: '02',
      title: 'MEDIMATE AI',
      subtitle: 'Conversational Health Information Assistant',
      tagline: 'Exploring how conversational AI can present medical information clearly and calmly.',
      description: 'An AI-focused healthcare project exploring how conversational AI can help users understand health information in a simpler and calmer way.',
      whatIBuilt: 'Built an interactive conversational interface that organizes complex queries into digestible steps, with structured guidance and friendly tone adjustments.',
      role: 'Full-Stack & AI Integration',
      year: '2025',
      category: 'AI Application / Product Design',
      technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'LLM APIs'],
      image: medimateAI,
      accentColor: '#F2A9C2',
      features: [
        'Clean conversational interface with readable step-by-step guidance',
        'Structured prompt chains designed to emphasize caution and medical disclaimers',
        'Fast and responsive UI built with React and lightweight state management',
      ],
      demoUrl: 'https://example.com/medimate',
      githubUrl: 'https://github.com/example/medimate-ai',
    },
    {
      id: 'future-experiment',
      number: '03',
      title: 'FUTURE EXPERIMENT',
      subtitle: 'Creative Coding & Visual Computing Lab',
      tagline: 'Exploring real-time parametric visuals and interactive canvas systems.',
      description: 'An experimental exploration into generative visual interfaces, real-time math-based graphics, and interactive canvas systems.',
      whatIBuilt: 'Implemented custom HTML5 Canvas rendering loops that respond dynamically to user cursor velocity and parametric slider inputs at 60 FPS.',
      role: 'Creative Coding & Research',
      year: '2026',
      category: 'Creative Development / Canvas',
      technologies: ['TypeScript', 'HTML5 Canvas', 'Mathematics', 'Vite'],
      image: futureExperiment,
      accentColor: '#9D315C',
      features: [
        'Lightweight 60 FPS parametric petal math without heavy 3D engine overhead',
        'Interactive real-time parameter controls for immediate feedback',
        'Clean mathematical simulations structured for modular reuse',
      ],
      demoUrl: 'https://example.com/future-experiment',
      githubUrl: 'https://github.com/example/future-experiment',
    },
  ] as Project[],

  // Simplified, clear skills & engineering areas
  mindNodes: [
    {
      id: 'software',
      label: 'Software Engineering',
      angle: 0,
      distance: 190,
      category: 'engineering',
      description: 'Designing clean architectures, writing maintainable code, and solving real-world engineering problems.',
      tools: ['Architecture', 'Clean Code', 'Debugging', 'Git'],
    },
    {
      id: 'ai-ml',
      label: 'AI & Machine Learning',
      angle: 45,
      distance: 215,
      category: 'ai',
      description: 'Working with AI models, integrating LLM APIs, and building practical intelligent features into products.',
      tools: ['LLMs', 'Prompt Design', 'RAG', 'Evaluation'],
    },
    {
      id: 'frontend',
      label: 'Frontend Development',
      angle: 90,
      distance: 185,
      category: 'frontend',
      description: 'Crafting responsive, accessible, and fast user interfaces with modern React, TypeScript, and Tailwind CSS.',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      angle: 135,
      distance: 210,
      category: 'backend',
      description: 'Building clean RESTful APIs, routing, and data handling with Python (FastAPI) and Node.js.',
      tools: ['FastAPI', 'Node.js', 'REST APIs', 'Authentication'],
    },
    {
      id: 'python',
      label: 'Python',
      angle: 180,
      distance: 190,
      category: 'engineering',
      description: 'My primary programming language for AI workflows, data scripting, and backend API services.',
      tools: ['PyTorch', 'NumPy', 'FastAPI', 'Automation'],
    },
    {
      id: 'data',
      label: 'Data & Search',
      angle: 225,
      distance: 215,
      category: 'core',
      description: 'Handling structured data, clean vector retrieval, and prompt optimization for reliable outputs.',
      tools: ['Vector Stores', 'Data Pipelines', 'JSON Schemas'],
    },
    {
      id: 'web-tech',
      label: 'Web Technologies',
      angle: 270,
      distance: 180,
      category: 'frontend',
      description: 'Modern build tools, performance profiling, responsive CSS, and browser APIs.',
      tools: ['HTML5 Canvas', 'Performance', 'Accessibility', 'Responsive Design'],
    },
    {
      id: 'ui-design',
      label: 'Product & UX Design',
      angle: 315,
      distance: 210,
      category: 'frontend',
      description: 'Bridging solid engineering with thoughtful design so software is clear, intuitive, and enjoyable to use.',
      tools: ['Prototyping', 'Typography', 'Hierarchy', 'User Flows'],
    },
  ] as MindNode[],

  // Honest, developer-playground Lab experiments
  labExperiments: [
    {
      id: 'lab-bloom',
      title: 'Latent Bloom Synthesizer',
      category: 'Creative coding',
      year: '2026',
      status: 'Interactive Sandbox',
      summary: 'A real-time parametric flower and petal generator running on an HTML5 canvas with slider controls.',
    },
    {
      id: 'lab-verse',
      title: 'Semantic Text Search Explorer',
      category: 'AI experiments',
      year: '2025',
      status: 'Prototype',
      summary: 'Testing sentence embeddings and cosine similarity for faster topic discovery.',
    },
    {
      id: 'lab-gaze',
      title: 'Cursor Velocity & Focus',
      category: 'UI experiments',
      year: '2026',
      status: 'Experiment',
      summary: 'Measuring cursor movement speed to subtly adjust interaction feedback.',
    },
    {
      id: 'lab-synapse',
      title: 'Lightweight Canvas Particles',
      category: 'Creative coding',
      year: '2026',
      status: 'Active Module',
      summary: 'A fast, CPU-efficient background particle loop that pauses when out of view.',
    },
  ] as LabExperiment[],

  // Honest, safe conceptual Journey stages
  journeyStages: [
    {
      stage: 'LEARNING',
      period: 'Foundation',
      headline: 'Building Strong Foundations',
      narrative: 'Studying core computer science fundamentals, data structures, algorithms, and practical programming across Python and JavaScript.',
      focusAreas: [
        'Programming fundamentals, data structures & algorithms',
        'Object-oriented and functional programming patterns',
        'Building foundational command-line and web projects',
      ],
    },
    {
      stage: 'BUILDING',
      period: 'Practical Software',
      headline: 'Turning Ideas into Working Applications',
      narrative: 'Developing full-stack web applications and software projects that combine clean engineering with practical utility.',
      focusAreas: [
        'Modern React, TypeScript, and responsive frontend design',
        'Backend API development with Python (FastAPI) and Node.js',
        'Version control, automated testing, and project deployment',
      ],
    },
    {
      stage: 'EXPERIMENTING',
      period: 'AI & Exploration',
      headline: 'Exploring AI & Modern Interfaces',
      narrative: 'Experimenting with modern AI models, LLM APIs, and interactive canvas graphics to understand how AI can improve user experiences.',
      focusAreas: [
        'Integrating generative AI models into working web apps',
        'Retrieval-Augmented Generation (RAG) and prompt engineering',
        'Creative coding and interactive canvas experiments in AYEKAN Lab',
      ],
    },
    {
      stage: 'CREATING',
      period: 'Now & Next',
      headline: 'Software, AI, and Meaningful Work',
      narrative: 'Focusing on building useful, reliable software products with great user experiences, and collaborating with teams on real-world projects.',
      focusAreas: [
        'Building production-ready software and AI-powered tools',
        'Prioritizing accessibility, performance, and clean design',
        'Open to engineering opportunities and collaborations',
      ],
    },
  ] as JourneyStage[],

  // 5 Real, warm, personal hobbies with EXACTLY 3 real photographs each = 15 images
  hobbyStories: [
    {
      id: 'music',
      index: '01',
      title: 'Music',
      oneLiner: 'I always have something playing in the background — from quiet evenings to long coding sessions.',
      note: "Music is usually somewhere in the background when I'm working. It helps me focus, slow down, or sometimes just make a long coding session more enjoyable.",
      accentColor: '#E875A0',
      images: [
        {
          src: music01,
          alt: 'Vintage vinyl records and warm amplifier',
        },
        {
          src: music02,
          alt: 'Acoustic guitar in studio',
        },
        {
          src: music03,
          alt: 'Upright piano keys and sheet music',
        },
      ],
    },
    {
      id: 'travel',
      index: '02',
      title: 'Travel',
      oneLiner: 'I like discovering new places, walking without a strict plan, and noticing little details along the way.',
      note: 'I love seeing new places and noticing how people live, design their spaces, and move through a city.',
      accentColor: '#F2A9C2',
      images: [
        {
          src: travel01,
          alt: 'Historic city architecture in soft dawn light',
        },
        {
          src: travel02,
          alt: 'Cozy cobblestone street with warm evening lanterns',
        },
        {
          src: travel03,
          alt: 'Scenic mountain trail overlooking a serene alpine lake',
        },
      ],
    },
    {
      id: 'photography',
      index: '03',
      title: 'Photography',
      oneLiner: 'Capturing light, architectural lines, and everyday moments.',
      note: 'I like capturing small details that are easy to miss — light falling through a window, architecture, and quiet everyday moments.',
      accentColor: '#9D315C',
      images: [
        {
          src: photography01,
          alt: 'Vintage 35mm rangefinder camera on wooden table',
        },
        {
          src: photography02,
          alt: 'Clean architectural shadows and modern brick facade',
        },
        {
          src: photography03,
          alt: 'Fresh botanical wildflower in soft natural morning light',
        },
      ],
    },
    {
      id: 'design',
      index: '04',
      title: 'Design',
      oneLiner: 'Appreciating thoughtful physical objects, clean typography, and good spacing.',
      note: 'I appreciate thoughtful editorial design, clean typography, and physical objects that are well made.',
      accentColor: '#E875A0',
      images: [
        {
          src: design01,
          alt: 'Art and design books stacked on travertine table',
        },
        {
          src: design02,
          alt: 'Architect workspace with drafting sketches and pencil',
        },
        {
          src: design03,
          alt: 'Handcrafted ceramic vase and textured linen in sunlit studio',
        },
      ],
    },
    {
      id: 'coffee',
      index: '05',
      title: 'Coffee',
      oneLiner: 'Slow pour-overs, quiet mornings, and a moment to think before the day begins.',
      note: 'My morning ritual. A good pour-over, quiet time, and a moment to think before the day gets busy.',
      accentColor: '#F2A9C2',
      images: [
        {
          src: coffee01,
          alt: 'Artisanal morning pour-over coffee ritual',
        },
        {
          src: coffee02,
          alt: 'Steaming ceramic coffee mug beside an open notebook',
        },
        {
          src: coffee03,
          alt: 'Roasted whole coffee beans resting in ceramic bowl',
        },
      ],
    },
  ] as HobbyStory[],

  philosophy: {
    primaryStatement: 'Technology should feel human.',
    expandedStatement: [
      'I don’t just want to build systems that work.',
      'I want to build things people enjoy using.',
    ],
    principles: [
      {
        title: 'Good software respects people',
        body: 'Software should be clear, reliable, and considerate of human attention rather than demanding it with artificial urgency.',
      },
      {
        title: 'Engineering and design belong together',
        body: 'Solid code and thoughtful interface design are not separate disciplines — they make each other stronger.',
      },
      {
        title: 'Keep things simple and dependable',
        body: 'Clarity beats unnecessary complexity. Building straightforward solutions that actually work is where real craft lies.',
      },
    ],
  },
};
