import ayeshaPortrait from '../assets/images/ayesha_portrait_1790880976619.jpg';

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

    role: 'Software & AI Engineer',
    heroTagline: 'I’m interested in the space where human interaction meets artificial minds — where people don’t just use machines, but teach them, shape them, and interact with them.',
    aboutHeadline: 'Building software with curiosity, purpose, and attention to detail.',
    bio: 'I am a Computer Science graduate and software engineer with an interest in modern software development and artificial intelligence. I enjoy turning ideas into practical digital products and continuously learning through building.',
    email: 'ayeshakanwal7838@gmail.com',
    github: 'https://github.com/Ay3-shA',
    linkedin: 'https://www.linkedin.com/in/ayeshaa-kanwal/',
  },

  projects: [
    {
      id: 'lumiere-paris',
      number: '01',
      title: 'LUMIÈRE PARIS',
      subtitle: 'Interactive Luxury Travel Platform',
      tagline: 'A cinematic travel experience for exploring and planning Paris experiences.',
      description:
        'A responsive travel website designed to make exploring Paris feel more interactive and immersive through visual storytelling, smooth scrolling, and thoughtful interface design.',
      whatIBuilt:
        'Designed and developed the frontend experience with interactive sections, smooth scroll-based transitions, responsive layouts, destination and experience browsing, and an interactive trip-planning flow.',
      role: 'Frontend Development & UI Design',
      year: '2026',
      category: 'Web Experience / Frontend',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
      image: lumiereParis,
      accentColor: '#E875A0',
      features: [
        'Responsive experience designed for desktop, tablet, and mobile screens',
        'Interactive travel sections with smooth scroll-based visual transitions',
        'Destination and experience exploration with interactive content',
        'Trip planning and contact interactions through reusable React components',
        'Deployed and maintained through GitHub Pages',
      ],
      demoUrl: 'https://ay3-sha.github.io/Lumiere-Paris/',
      githubUrl: 'https://github.com/Ay3-shA/Lumiere-Paris',
    },

    {
      id: 'medimate-ai',
      number: '02',
      title: 'MEDIMATE AI',
      subtitle: 'AI-Powered Health Companion',
      tagline: 'A web application combining health management features with an AI-assisted conversation experience.',
      description:
        'A health companion web application designed to bring health information, medication management, and AI-assisted conversations together in one place.',
      whatIBuilt:
        'Developed the frontend and backend experience with user authentication, health profiles, medication tracking, conversation history, settings, and an AI assistant for general health information.',
      role: 'Full-Stack Development & AI Integration',
      year: '2026',
      category: 'AI Application / Full-Stack',
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'Express',
        'Tailwind CSS',
        'Vite',
        'Gemini AI',
      ],
      image: medimateAI,
      accentColor: '#F2A9C2',
      features: [
        'User registration, login, and health profile management',
        'Medication tracking and organized health information',
        'AI-assisted conversations for general health information',
        'Conversation history and user settings',
        'Responsive interface built with reusable React components',
        'Automated build and deployment using GitHub Actions and GitHub Pages',
      ],
      demoUrl: 'https://ay3-sha.github.io/MediMateAI/',
      githubUrl: 'https://github.com/Ay3-shA/MediMateAI',
    },

    {
      id: 'ayekan-portfolio',
      number: '03',
      title: 'AYEKAN',
      subtitle: 'Personal Software & AI Portfolio',
      tagline: 'A personal portfolio combining software engineering, AI interests, and creative digital experiences.',
      description:
        'A personal portfolio website created to present my work, technical skills, software engineering background, AI interests, and the ideas that shape how I build digital experiences.',
      whatIBuilt:
        'Designed and developed the portfolio using React and TypeScript, with reusable sections, responsive layouts, animated interactions, project presentations, a dynamic neural-inspired background, and interactive personal content.',
      role: 'Design & Full-Stack Frontend Development',
      year: '2026',
      category: 'Personal Portfolio / Web Development',
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Vite',
        'Motion',
        'Lucide React',
      ],
      image: futureExperiment,
      accentColor: '#9D315C',
      features: [
        'Responsive portfolio experience for desktop, tablet, and mobile',
        'Animated sections and interactive transitions',
        'Dynamic neural-inspired background and custom cursor interactions',
        'Project showcase with detailed project modals',
        'Interactive personal interests and hobby presentations',
        'Deployed and maintained through GitHub Pages',
      ],
      demoUrl: 'https://ay3-sha.github.io/Portfolio_AyeKan/',
      githubUrl: 'https://github.com/Ay3-shA/Portfolio_AyeKan',
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
      tools: ['Python', 'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Clean Code', 'Debugging', 'Git'],
    },
    {
      id: 'ai-ml',
      label: 'AI & Machine Learning',
      angle: 45,
      distance: 215,
      category: 'ai',
      description: 'Working with AI models, integrating LLM APIs, and building practical intelligent features into products.',
      tools: ['LLMs', 'Prompt Engineering', 'RAG', 'Evaluation', 'LangChain', 'Embeddings', 'Vector Databases'],
    },
    {
      id: 'frontend',
      label: 'Frontend Development',
      angle: 90,
      distance: 185,
      category: 'frontend',
      description: 'Crafting responsive, accessible, and fast user interfaces with modern React, TypeScript, and Tailwind CSS.',
      tools: ['Tailwind CSS', 'Vite','JavaScript','HTML5','CSS3','Bootstrap','Material UI','Responsive Design','REST API Integration'],
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      angle: 135,
      distance: 210,
      category: 'backend',
      description: 'Building clean RESTful APIs, routing, and data handling with Python (FastAPI) and Node.js.',
      tools: ['MySQL', 'Node.js', 'REST APIs', 'Authentication','Server-side Logic', 'Data Validation'],
    },
    {
      id: 'python',
      label: 'Python',
      angle: 180,
      distance: 190,
      category: 'engineering',
      description: 'My primary programming language for AI workflows, data scripting, and backend API services.',
      tools: ['PyTorch', 'NumPy', 'Pandas', 'Scripting', 'Jupyter','Automation','Data Processing','Scripting',],
    },
    {
      id: 'data',
      label: 'Data & Search',
      angle: 225,
      distance: 215,
      category: 'core',
      description: 'Handling structured data, clean vector retrieval, and prompt optimization for reliable outputs.',
      tools: ['RAG','LangChain','LLMs','Embeddings','Vector Databases','Vector Search','Semantic Search','Prompt Engineering','Data Pipelines'],
    },
    {
      id: 'web-tech',
      label: 'Web Technologies',
      angle: 270,
      distance: 180,
      category: 'frontend',
      description: 'Modern build tools, performance profiling, responsive CSS, and browser APIs.',
      tools: ['HTML5','CSS3','JavaScript','Responsive Design','Accessibility','Browser APIs','Web Performance','Vite','Git','REST APIs'],
    },
    {
      id: 'ui-design',
      label: 'Product & UX Design',
      angle: 315,
      distance: 210,
      category: 'frontend',
      description: 'Bridging solid engineering with thoughtful design so software is clear, intuitive, and enjoyable to use.',
      tools: ['Figma', 'Responsive Design', 'Hierarchy', 'User Flows'],
    },
  ] as MindNode[],

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
