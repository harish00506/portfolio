// Single source of truth for all portfolio content.
// Edit text, projects, skills and links here — components read from this file.

// Site-level config used for SEO metadata, canonical URL and structured data.
// NOTE: `url` is a placeholder — find-and-replace with the real deployed URL.
export const site = {
  url: 'https://harishg.dev',
  ogImage: '/og-image.png', // 1200×630 image (add to /public for rich link previews)
}

export const profile = {
  name: 'Harish G',
  title: 'Full Stack & AI Engineer',
  tagline: 'Multi-stack engineer (Java · Python · JavaScript) building scalable backends and AI-driven applications.',
  location: 'Bengaluru, India',
  email: 'harishgreddy.work@gmail.com',
  phone: '+91 7892855850',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/', // update with your GitHub profile URL
    linkedin: 'https://www.linkedin.com/', // update with your LinkedIn profile URL
  },
  about: [
    'Final-year Information Science Engineering student with hands-on expertise across the Java, Python and JavaScript ecosystems. I build scalable backend systems with Spring Boot, Express.js and FastAPI, and integrate AI technologies — LLMs, STT, TTS and agent-based workflows — into real-world products.',
    'I am passionate about intelligent, automation-driven systems and clean, modular architecture. I am currently looking for roles in AI engineering, backend, or full-stack development where I can ship products that combine solid engineering with practical AI.',
  ],
}

export const skills = [
  {
    group: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'Kotlin', 'SQL'],
  },
  {
    group: 'Backend',
    items: ['Spring Boot', 'Express.js', 'Node.js', 'FastAPI'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'NextUI', 'Jetpack Compose'],
  },
  {
    group: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Neo4j', 'Supabase / pgvector'],
  },
  {
    group: 'AI / ML',
    items: ['LLM Integration', 'RAG', 'Context Management', 'Agents', 'Workflow Automation', 'STT / TTS Systems'],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitLab', 'Docker', 'Postman', 'Android Studio', 'Figma'],
  },
  {
    group: 'Concepts',
    items: [
      'OOP',
      'REST API Design',
      'JWT Auth',
      'MVC Architecture',
      'Multithreading',
      'Query Optimization',
      'System Design',
    ],
  },
]

export const experience = [
  {
    role: 'AI Developer Intern',
    company: 'CortexCraft.ai',
    period: 'Jan 2026 – Present',
    bullets: [
      'Develop AI-driven solutions that integrate LLMs, speech-to-text and text-to-speech into real-world applications.',
      'Build agent-based systems and automation workflows for intelligent task execution.',
      'Apply context management, RAG pipelines and modular AI architectures for scalable solutions.',
      'Contribute to projects involving mathematical models and AI-assisted decision systems.',
      'Integrate AI into daily development workflows to improve efficiency and product intelligence.',
    ],
  },
]

// Categories used for the project filter tabs.
export const projectCategories = ['All', 'AI', 'Full-Stack', 'ML', 'Mobile']

export const projects = [
  {
    name: 'KisanVoice AI',
    featured: true,
    categories: ['AI', 'Full-Stack'],
    blurb:
      'WhatsApp-based farmer survey platform with voice responses in 5 Indian languages, a real-time admin dashboard and an audio QC workflow. Conditional survey logic, multilingual auto-translation and Excel exports.',
    highlights: [
      'Voice + text responses with STT/TTS in Telugu, Hindi, Kannada, Marathi & Tamil',
      'Real-time admin dashboard with Socket.io and analytics',
      'Dockerized full-stack app with 200+ commits',
    ],
    tags: ['Node.js', 'Express', 'React', 'MongoDB', 'Twilio / WhatsApp', 'Groq', 'Sarvam STT/TTS', 'Socket.io', 'Docker'],
    links: {}, // add { github: '...' } / { live: '...' } when ready
  },
  {
    name: 'MediGraph AI',
    featured: false,
    categories: ['AI', 'Full-Stack'],
    blurb:
      'Hybrid RAG clinical assistant combining a Neo4j medical knowledge graph with pgvector semantic search. Interactive force-directed graph visualization and role-based access for doctors and patients.',
    highlights: [
      'Graph + vector hybrid retrieval pipeline',
      'Interactive force-graph visualization of medical entities',
      'Role-based access with patient data isolation',
    ],
    tags: ['Node.js', 'Express', 'React', 'Neo4j', 'Supabase pgvector', 'Groq', 'HF Embeddings'],
    links: {},
  },
  {
    name: 'Refyne Voice Agent',
    featured: false,
    categories: ['AI'],
    blurb:
      'Real-time phone-call voice AI agent connecting telephony to an STT → LLM → TTS pipeline, with multilingual auto-detection and inbound/outbound call handling.',
    highlights: [
      'Live phone-call voice pipeline (STT → LLM → TTS)',
      'Multilingual auto-detection with voice activity detection',
      'Handles both inbound and outbound calls',
    ],
    tags: ['Python', 'FastAPI', 'Pipecat', 'Plivo', 'Sarvam', 'WebSocket', 'VAD'],
    links: {},
  },
  {
    name: 'StockSense AI',
    featured: false,
    categories: ['ML', 'Full-Stack'],
    blurb:
      'ML-powered demand-forecasting and stock-optimization platform: safety stock, reorder points, ABC classification and EOQ optimization with interactive dashboards.',
    highlights: [
      'Time-series forecasting with LightGBM & Prophet models',
      'Safety stock, reorder points and EOQ / ABC optimization',
      'FastAPI backend with React + Streamlit dashboards',
    ],
    tags: ['Python', 'FastAPI', 'LightGBM', 'Prophet', 'PostgreSQL', 'React', 'Streamlit', 'Docker'],
    links: {},
  },
  {
    name: 'FinGraph AI',
    featured: false,
    categories: ['AI', 'Full-Stack'],
    blurb:
      'Banking RAG assistant over a Neo4j relationship graph with JWT authentication, role-based access control (admin / manager / customer) and full audit logging.',
    highlights: [
      'RBAC with admin / manager / customer roles',
      'JWT auth + bcrypt and complete audit trails',
      'Query classification and workflow orchestration',
    ],
    tags: ['Node.js', 'Express', 'React', 'Neo4j', 'Supabase pgvector', 'JWT', 'Tailwind'],
    links: {},
  },
  {
    name: 'Zentrax',
    featured: false,
    categories: ['AI'],
    blurb:
      'FRIDAY-inspired Windows desktop assistant enabling voice commands and gesture-based control, with local LLM execution for privacy-focused automation.',
    highlights: [
      'Whisper STT + LLM intent recognition (Ollama)',
      'Gesture control via MediaPipe with fallback pipelines',
      'Real-time WebSocket monitoring dashboard',
    ],
    tags: ['Python', 'Whisper', 'MediaPipe', 'WebSocket', 'Ollama', 'Docker'],
    links: {},
  },
  {
    name: 'TaskFlow',
    featured: false,
    categories: ['Full-Stack'],
    blurb:
      'Full-stack productivity app with clean Spring Boot REST APIs and a DTO-based architecture. Reduced API latency by ~30% through query optimization.',
    highlights: [
      'Clean REST APIs with DTO-based design',
      '~30% lower API latency via query optimization',
      'Task prioritization, tracking and persistent storage',
    ],
    tags: ['Java', 'Spring Boot', 'Vite', 'TypeScript', 'PostgreSQL'],
    links: {},
  },
  {
    name: 'GroceryGo',
    featured: false,
    categories: ['Mobile'],
    blurb:
      'Android grocery app built with Jetpack Compose. Achieved a 0% crash rate across 5+ Android OS versions with offline caching and auto-sync.',
    highlights: [
      '0% crash rate across 5+ Android OS versions',
      'Offline caching + auto-sync for 100+ items',
      'Firebase-backed real-time data',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    links: {},
  },
]

export const education = {
  degree: 'B.E. — Information Science & Engineering',
  school: 'Vivekananda Institute of Technology, Bangalore',
  period: '2022 – 2026',
  score: 'CGPA: 8.81 / 10',
  achievements: [
    'Built and deployed AI-powered and full-stack applications with real-user testing.',
    'Strong experience in backend optimization, debugging and scalable system design.',
    'Applied a structured development lifecycle with Git-based collaboration.',
  ],
}
