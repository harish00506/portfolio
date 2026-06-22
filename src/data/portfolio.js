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
  email: 'harish00506@gmail.com',
  phone: '+91 7892855850',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/harish00506/',
    linkedin: 'https://www.linkedin.com/in/harishgreddy/',
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
    role: 'Software Developer',
    company: 'CortexCraft.ai',
    period: 'May 2026 – Present',
    bullets: [
      'Develop AI-driven solutions that integrate LLMs, speech-to-text and text-to-speech into real-world applications.',
      'Build agent-based systems and automation workflows for intelligent task execution.',
      'Apply context management, RAG pipelines and modular AI architectures for scalable solutions.',
      'Contribute to projects involving mathematical models and AI-assisted decision systems.',
      'Integrate AI into daily development workflows to improve efficiency and product intelligence.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'CortexCraft.ai',
    period: 'Jan 2026 – May 2026',
    bullets: [
      'Built and integrated AI features (LLM, STT, TTS) into core company applications.',
      'Developed agent-based automation workflows and RAG pipelines; converted to a full-time role.',
    ],
  },
  {
    role: 'Freelance Web & App Developer',
    company: 'Self-Employed',
    period: '2023 – 2026',
    bullets: [
      'Built responsive landing pages and small business websites for local clients using React and Vite.',
      'Delivered small full-stack apps and automation scripts (Python / Node.js) tailored to client workflows.',
      'Handled ad-hoc bug fixes, feature additions and deployment support on a per-project freelance basis.',
    ],
  },
]

// Categories used for the project filter tabs.
export const projectCategories = ['All', 'AI', 'Full-Stack', 'ML', 'Mobile']

// Each project carries a STAR case study (Situation · Task · Action · Result).
// Flagship projects additionally include `action.samples` (code) and
// `action.screenshots`. NOTE: code snippets are illustrative drafts — replace
// with real excerpts; screenshots point at /public/projects/<slug>/ (add images).
export const projects = [
  {
    slug: 'kisanvoice-ai',
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
    star: {
      situation:
        'Field surveys of rural farmers are slow, expensive and exclude people who can not read or fill in forms. Enumerators travel village to village, and language barriers across regions make consistent data collection hard.',
      task:
        'Build a platform that lets farmers answer surveys in their own language by voice over a channel they already use — WhatsApp — while giving administrators a real-time view of incoming responses and a way to verify audio quality.',
      action: {
        narrative:
          'I built a full-stack system on top of the WhatsApp Business API (via Twilio). Inbound voice notes are transcribed with Sarvam STT, auto-translated, and run through conditional survey logic that decides the next question; replies are synthesised back to the farmer with TTS. A React admin dashboard streams new responses live over Socket.io, supports an audio QC review workflow, and exports clean datasets to Excel. The whole stack is containerised with Docker for reproducible deploys.',
        samples: [
          {
            filename: 'backend/services/voicePipeline.js',
            language: 'javascript',
            code: `// Inbound voice note → transcribe → translate → next question
export async function handleVoiceResponse(msg, session) {
  const audio = await downloadMedia(msg.mediaUrl)
  const { text, lang } = await sarvam.transcribe(audio)        // STT
  const english = lang === 'en' ? text : await sarvam.translate(text, 'en')

  await saveAnswer(session, { raw: text, lang, normalized: english })
  io.to('admins').emit('response:new', { session: session.id, lang })

  const next = nextQuestion(session)                            // conditional logic
  if (!next) return endSurvey(session)

  const prompt = await sarvam.tts(next.text, lang)              // TTS in farmer's language
  return sendWhatsAppAudio(session.phone, prompt)
}`,
          },
        ],
        screenshots: [
          { src: '/projects/kisanvoice-ai/dashboard.png', caption: 'Real-time admin dashboard — live responses & analytics' },
          { src: '/projects/kisanvoice-ai/whatsapp.png', caption: 'WhatsApp voice survey flow in a regional language' },
        ],
      },
      result: {
        narrative:
          'A working multilingual survey platform that removes the literacy barrier: farmers answer by voice in their own language and administrators see and verify responses as they arrive.',
        metrics: [
          { value: '5', label: 'Indian languages' },
          { value: '200+', label: 'commits shipped' },
          { value: 'Real-time', label: 'admin dashboard' },
        ],
      },
    },
  },
  {
    slug: 'medigraph-ai',
    name: 'MediGraph AI',
    featured: true,
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
    star: {
      situation:
        'Clinical questions need answers that are both semantically relevant and factually grounded in how medical entities relate. Pure vector search retrieves similar text but loses the structured relationships between conditions, symptoms, drugs and treatments.',
      task:
        'Design a retrieval pipeline that fuses a medical knowledge graph with semantic search so answers are grounded in real relationships, and gate the data so doctors and patients only see what they are allowed to.',
      action: {
        narrative:
          'I built a hybrid RAG system: a Neo4j knowledge graph captures medical entities and their relationships, while pgvector (on Supabase) holds embeddings for semantic recall. A query first expands through the graph to gather connected entities, then retrieves supporting passages by vector similarity; the merged, de-duplicated context is passed to the LLM. The React frontend renders the retrieved subgraph as an interactive force-directed visualization, and role-based access control isolates patient data from clinician views.',
        samples: [
          {
            filename: 'server/retrieval/hybridRetrieve.js',
            language: 'javascript',
            code: `// Hybrid retrieval: expand via graph, then rank by vector similarity
export async function hybridRetrieve(query, role) {
  const embedding = await embed(query)

  const graphHits = await neo4j.run(\`
    MATCH (e:Entity)-[r]-(n)
    WHERE e.name CONTAINS $term
    RETURN n LIMIT 25\`, { term: keyword(query) })

  const vectorHits = await pg.query(
    'SELECT chunk, 1 - (embedding <=> $1) AS score \\
     FROM passages ORDER BY embedding <=> $1 LIMIT 8',
    [embedding],
  )

  const context = merge(graphHits, vectorHits)
  return enforceAccess(context, role)   // patient-data isolation
}`,
          },
        ],
        screenshots: [
          { src: '/projects/medigraph-ai/graph.png', caption: 'Interactive force-directed graph of medical entities' },
          { src: '/projects/medigraph-ai/chat.png', caption: 'Grounded clinical answer with cited context' },
        ],
      },
      result: {
        narrative:
          'A clinical assistant whose answers are grounded in both meaning and structure, with a visual graph that makes the reasoning inspectable and strict separation between doctor and patient data.',
        metrics: [
          { value: 'Graph + Vector', label: 'hybrid retrieval' },
          { value: '2 roles', label: 'doctor / patient isolation' },
          { value: 'Interactive', label: 'entity visualization' },
        ],
      },
    },
  },
  {
    slug: 'refyne-voice-agent',
    name: 'Refyne Voice Agent',
    featured: true,
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
    star: {
      situation:
        'Businesses want to handle phone calls with an AI agent that feels natural, but real-time telephony is unforgiving: every extra hundred milliseconds of latency makes the conversation feel robotic, and callers switch languages mid-sentence.',
      task:
        'Connect a phone network to a low-latency speech pipeline so an LLM can hold a live, two-way conversation over a real call — detecting the caller’s language automatically and handling both inbound and outbound calls.',
      action: {
        narrative:
          'I built a streaming voice agent in Python/FastAPI using Pipecat to orchestrate the STT → LLM → TTS pipeline, with Plivo bridging the telephony leg over a WebSocket audio stream. Voice activity detection (VAD) segments speech so the agent knows when the caller has finished, language auto-detection routes audio to the right model, and the pipeline streams partial results to keep latency low enough for natural turn-taking. The same service handles inbound and outbound calls.',
        samples: [
          {
            filename: 'app/pipeline.py',
            language: 'python',
            code: `# Streaming telephony pipeline: Plivo audio <-> STT -> LLM -> TTS
pipeline = Pipeline([
    transport.input(),          # Plivo WebSocket audio in
    vad,                        # voice activity detection -> end of turn
    stt,                        # Sarvam STT (auto language detect)
    llm,                        # streaming LLM response
    tts,                        # Sarvam TTS in caller's language
    transport.output(),         # audio back to the call
])

@app.websocket("/call")
async def call(ws: WebSocket):
    await ws.accept()
    await PipelineRunner().run(PipelineTask(pipeline, audio_stream(ws)))`,
          },
        ],
        screenshots: [
          { src: '/projects/refyne-voice-agent/architecture.png', caption: 'Real-time call pipeline architecture' },
        ],
      },
      result: {
        narrative:
          'A live phone agent that holds natural multilingual conversations over real calls, auto-detecting language and handling calls in both directions.',
        metrics: [
          { value: 'Real-time', label: 'STT → LLM → TTS' },
          { value: 'Inbound + Outbound', label: 'call handling' },
          { value: 'Auto-detect', label: 'caller language' },
        ],
      },
    },
  },
  {
    slug: 'stocksense-ai',
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
    star: {
      situation:
        'Retailers lose money at both ends of inventory: overstocking ties up cash, while stockouts lose sales. Manual reorder rules can not keep up with seasonal, item-level demand.',
      task:
        'Forecast demand per item and turn those forecasts into concrete inventory decisions — how much safety stock to hold, when to reorder, and which items matter most.',
      action: {
        narrative:
          'I built a forecasting service with LightGBM and Prophet for item-level time-series prediction, then layered classic inventory science on top: safety stock, reorder points, EOQ and ABC classification. A FastAPI backend serves the models and a React + Streamlit dashboard lets users explore forecasts and optimization output interactively. The stack is Dockerized for deployment.',
      },
      result: {
        narrative:
          'A decision-support platform that converts raw sales history into actionable stocking policy, surfaced through interactive dashboards.',
        metrics: [
          { value: '2 models', label: 'LightGBM + Prophet' },
          { value: 'EOQ / ABC', label: 'optimization' },
          { value: 'Interactive', label: 'forecast dashboards' },
        ],
      },
    },
  },
  {
    slug: 'fingraph-ai',
    name: 'FinGraph AI',
    featured: true,
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
    star: {
      situation:
        'Banking assistants must answer questions over sensitive, highly-connected data while strictly enforcing who is allowed to see what — a customer, a manager and an admin should get very different answers, and every access must be auditable.',
      task:
        'Build a RAG assistant over banking data with hard security guarantees: authenticated access, role-based authorization at the data layer, and a complete audit trail of every query.',
      action: {
        narrative:
          'I modelled accounts, customers and transactions as a Neo4j relationship graph and combined it with pgvector retrieval. Incoming questions are first classified to route them to the right workflow, then answered from retrieved context. Security is enforced end to end: JWT auth with bcrypt-hashed credentials, role-based access control (admin / manager / customer) applied before retrieval, and an append-only audit log recording every request.',
        samples: [
          {
            filename: 'server/middleware/rbac.js',
            language: 'javascript',
            code: `// Role-based access + audit logging on every query
export function authorize(...roles) {
  return async (req, res, next) => {
    const user = verifyJwt(req.headers.authorization)   // throws if invalid
    if (!roles.includes(user.role))
      return res.status(403).json({ error: 'forbidden' })

    await audit.log({ userId: user.id, role: user.role,
                      action: req.path, at: new Date() })
    req.user = user
    next()
  }
}

router.post('/query', authorize('admin', 'manager', 'customer'), handleQuery)`,
          },
        ],
        screenshots: [
          { src: '/projects/fingraph-ai/roles.png', caption: 'Role-scoped answers — admin / manager / customer' },
        ],
      },
      result: {
        narrative:
          'A banking assistant that answers over connected financial data while guaranteeing authenticated, role-scoped access and a full audit trail.',
        metrics: [
          { value: '3 roles', label: 'RBAC enforced' },
          { value: 'JWT + bcrypt', label: 'authentication' },
          { value: '100%', label: 'audited queries' },
        ],
      },
    },
  },
  {
    slug: 'zentrax',
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
    star: {
      situation:
        'Cloud voice assistants send everything you say to a server. For a personal desktop assistant that controls your machine, that is both a privacy and a latency problem.',
      task:
        'Build a privacy-first desktop assistant that runs its intelligence locally and supports both voice and gesture control.',
      action: {
        narrative:
          'I built a Windows assistant that runs an LLM locally through Ollama, uses Whisper for on-device STT and intent recognition, and adds hands-free gesture control via MediaPipe with fallback pipelines for reliability. A WebSocket dashboard provides real-time monitoring, and the components are containerised with Docker.',
      },
      result: {
        narrative:
          'A fully local voice-and-gesture assistant that keeps data on-device while automating desktop tasks.',
        metrics: [
          { value: 'Local LLM', label: 'privacy-first (Ollama)' },
          { value: 'Voice + Gesture', label: 'dual control' },
          { value: 'Real-time', label: 'monitoring dashboard' },
        ],
      },
    },
  },
  {
    slug: 'taskflow',
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
    star: {
      situation:
        'Task apps are easy to start and hard to keep fast and maintainable as the data and feature set grow.',
      task:
        'Build a productivity app with a clean, maintainable backend architecture and APIs that stay fast under realistic data.',
      action: {
        narrative:
          'I designed a Spring Boot backend around a DTO-based architecture for clear separation between persistence and API contracts, backed by PostgreSQL, with a Vite + TypeScript frontend. I profiled the hot endpoints and optimised the underlying queries to cut latency.',
      },
      result: {
        narrative:
          'A maintainable full-stack productivity app with measurably faster APIs.',
        metrics: [
          { value: '~30%', label: 'lower API latency' },
          { value: 'DTO-based', label: 'clean architecture' },
          { value: 'Persistent', label: 'task tracking' },
        ],
      },
    },
  },
  {
    slug: 'grocerygo',
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
    star: {
      situation:
        'Mobile grocery shopping needs to work even on flaky connections and across a wide range of Android versions and devices.',
      task:
        'Build a reliable, modern Android grocery app that stays usable offline and behaves consistently across OS versions.',
      action: {
        narrative:
          'I built the app with Kotlin and Jetpack Compose for a modern declarative UI, backed by Firebase for real-time data. Offline caching with auto-sync keeps the catalog and cart usable without a connection, and I tested across multiple Android OS versions to stamp out crashes.',
      },
      result: {
        narrative:
          'A resilient grocery app that works offline and runs cleanly across a wide device range.',
        metrics: [
          { value: '0%', label: 'crash rate' },
          { value: '5+', label: 'Android OS versions' },
          { value: '100+', label: 'items cached offline' },
        ],
      },
    },
  },
]

// Projects shown on the Home page (in `projects` order).
export const featuredProjects = projects.filter((p) => p.featured)

// Look up a single project by its URL slug (used by the detail page + prerender).
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export const education = {
  degree: 'B.E. — Information Science & Engineering',
  school: 'Vivekananda Institute of Technology, Bangalore',
  achievements: [
    'Built and deployed AI-powered and full-stack applications with real-user testing.',
    'Strong experience in backend optimization, debugging and scalable system design.',
    'Applied a structured development lifecycle with Git-based collaboration.',
  ],
}
