// Single source of truth for all portfolio content.
// Edit text, projects, skills and links here. Components read from this file.

// Site-level config used for SEO metadata, canonical URL and structured data.
// `url` is the single source of truth for the domain: the sitemap, robots.txt,
// canonical tags and JSON-LD are all generated from it. No trailing slash.
export const site = {
  url: 'https://www.harishg.com',
  ogImage: '/og-image.png', // 1200×630 image (add to /public for rich link previews)
}

export const profile = {
  name: 'Harish G',
  title: 'Agentic AI & Automation Engineer',
  tagline: 'Multi-stack engineer (Java · Python · JavaScript) building scalable backends and AI-driven applications.',
  location: 'Bengaluru, India',
  metaDescription:
    'Harish G is an Agentic AI & Automation Engineer in Bengaluru building Gemini Live voice agents, tool-calling systems and RAG with Python, FastAPI and Java.',
  email: 'harishgreddy.work@gmail.com',
  phone: '+91 7892855850',
  resumeUrl: '/resume.pdf',
  photo: '/profile.jpg',
  contactNote:
    'I am open to AI engineering, backend and full-stack roles. Whether you have a role in mind or just want to talk shop, my inbox is always open.',
  socials: {
    github: 'https://github.com/harish00506/',
    linkedin: 'https://www.linkedin.com/in/harishgreddy/',
  },
  about: [
    'Software Developer at CortexCraft.ai since January 2026, with hands-on experience across the Java, Python and JavaScript ecosystems and several years of freelance web and app development. I build scalable backend systems with Spring Boot, Express.js and FastAPI, and integrate AI technologies such as LLMs, STT, TTS and agent-based workflows into real-world products.',
    'I work the way the repositories show: feature branches, a GitLab CI pipeline, and 132 pytest files on the voice-agent platform acting as the merge gate rather than an afterthought. On the AI side I keep the model constrained: tool calls go through declared functions, and extracted call data is coerced to its declared type before anything downstream trusts it.',
    'I focus on intelligent, automation-driven systems and clean, modular architecture, and I am looking for roles in AI engineering, backend, or full-stack development where I can ship products that combine solid engineering with practical AI.',
  ],
}

export const skills = [
  {
    group: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'Kotlin', 'SQL'],
  },
  {
    group: 'Backend',
    items: ['Spring Boot', 'Express.js', 'Node.js', 'FastAPI', 'Celery', 'Alembic'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'NextUI', 'Jetpack Compose'],
  },
  {
    group: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Neo4j', 'Supabase / pgvector', 'Redis'],
  },
  {
    group: 'AI / ML',
    items: [
      'LLM Integration',
      'RAG',
      'Context Management',
      'Agents & Tool Calling',
      'Output Guardrails',
      'Workflow Automation',
      'STT / TTS Systems',
      'Gemini Live',
      'LightGBM / Prophet',
    ],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitLab', 'Docker', 'Postman', 'Android Studio', 'Figma'],
  },
  {
    group: 'Concepts',
    items: [
      'REST API Design',
      'System Design',
      'Modular Architecture',
      'JWT Auth & RBAC',
      'Query Optimization',
    ],
  },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'CortexCraft.ai',
    period: 'Jan 2026 – Present',
    bullets: [
      'Built and maintain the voice-agent platform (589 of 626 commits on the SaaS platform, 67 of 75 on the core engine): Gemini Live phone agents over Twilio and Plivo, with per-agent RAG grounding, prompt generation, transcripts and an external REST API that other products call.',
      'Shipped LeadCall AI on that platform: multi-tenant outbound calling with Celery dial and callback workers, pitch documents re-indexed for RAG, Alembic-migrated PostgreSQL and a React dashboard.',
      'Own production reliability of the call pipeline: fixed outbound routing, added reconnect handling for dropped Gemini sockets, and traced a Docker TLS failure to NAT hairpinning.',
      'Design prompt frameworks, guardrails and agent orchestration with tool calling and safe escalation, so model output is constrained rather than trusted.',
      'Lead author (172 of 192 commits) on the multilingual farmer survey platform. Migrated it off a Node backend onto FastAPI, swapped Sarvam for Google STT/TTS behind a config-driven registry covering 24 locales, and put it on Jenkins CI without interrupting live surveys.',
      'Work AI into the delivery process itself, including an agent that turns Jira tickets into reviewed pull requests.',
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
// `action.screenshots`. Code samples are real excerpts from each project's repo,
// trimmed for length.
//
// `action.screenshots` is currently empty everywhere on purpose. Three entries used to point at
// /projects/<slug>/*.png while public/projects/ did not exist, so two live case studies served
// 404s for every image. Add a screenshot back only once its file is in public/projects/<slug>/:
//   screenshots: [{ src: '/projects/<slug>/<file>.png', caption: '<what it shows>' }]
export const projects = [
  {
    slug: 'cortexcraft-voice-agent',
    name: 'CortexCraft Voice Agent',
    featured: true,
    metaTitle: 'CortexCraft Voice Agent: Gemini Live Phone Agents',
    metaDescription:
      'Gemini Live phone agents over Twilio and Plivo: campaign dispatch, post-call extraction and webhooks. 589 of 626 commits on the SaaS platform.',
    categories: ['AI'],
    blurb:
      'Production platform for building and running Gemini Live phone agents. It gives you a dashboard to configure them, Twilio and Plivo call handling, RAG document grounding, saved transcripts, and an external REST API so other products can drive calls.',
    highlights: [
      'Gemini Live agents over real telephony (Twilio + Plivo) and a browser test channel',
      'Per-agent RAG document upload, search and prompt generation',
      'External REST API, so other products (CRMs, dialers) run calls through it',
    ],
    tags: ['Python', 'FastAPI', 'Gemini Live', 'Twilio', 'Plivo', 'WebSocket', 'RAG', 'React', 'Docker'],
    links: {},
    details: {
      role: 'Software Developer, CortexCraft.ai',
      team: '5 contributors',
      timeline: 'May 2026 to present',
      commits: '589 of 626 (SaaS platform) + 67 of 75 (core engine)',
      responsibilities: [
        'Campaign runner and outbound call dispatch',
        'Gemini Live session handling in the core engine',
        'Post-call transcript extraction and customer webhooks',
        'Call-pipeline reliability: routing, socket reconnects, TLS',
      ],
    },
    diagram: {
      title: 'An outbound call, end to end',
      steps: [
        { label: 'Dashboard', detail: 'frontend/app (Next.js)' },
        { label: 'Campaign API', detail: 'campaigns/routes.py' },
        { label: 'Worker tick', detail: 'campaigns/runner_service.py' },
        { label: 'Gemini Live call', detail: 'core engine: gemini_live/client.py' },
        { label: 'Phone network', detail: 'Twilio or Plivo' },
        { label: 'Post-call extraction', detail: 'calls/extraction_service.py' },
        { label: 'Customer webhook', detail: 'webhooks/emit.py' },
      ],
      stores: ['PostgreSQL', 'Redis'],
    },
    reflection: [
      'Move agent document search from Postgres full-text to embeddings, so agents match meaning rather than exact words.',
      'Write an incident report for every production fix, not only the NAT hairpinning one.',
    ],
    star: {
      situation:
        'Every client wanted the same thing with a different script: an AI that answers or places phone calls, knows their documents, and hands a transcript back to whatever system they already run. Rebuilding that stack per client would have meant maintaining the same telephony and streaming bugs in several places at once.',
      task:
        'Build one platform where an agent is configuration rather than code: created from a dashboard or an API, grounded in uploaded documents, reachable over more than one telephony provider, and drivable by external systems.',
      action: {
        narrative:
          'I built a FastAPI + React platform where each agent is a JSON config plus a folder of RAG documents. A prompt generator turns that config into the full system prompt and the inbound/outbound greetings. Calls stream over a WebSocket to Gemini Live, with separate Twilio and Plivo handlers behind one interface and a browser channel for testing without burning call minutes; transcripts are written back into each agent’s conversation store. An external REST API exposes agent creation and call placement, so other products consume the platform instead of forking it. Most of the real work was production reliability: fixing outbound-call routing, adding reconnect handling for Gemini 1006 socket drops, tightening goodbye detection so calls end cleanly, and tracing a Docker TLS failure to NAT hairpinning on a self-hosted domain.',
        samples: [
          {
            filename: 'voice-agent-core-engine/backend/src/gemini_live/client.py',
            language: 'python',
            code: `# One Gemini Live session per phone call: audio in, audio out, text alongside.
while True:
    config = self._live_config(include_language_code=include_language_code)
    connected = False
    try:
        async with self.client.aio.live.connect(model=self.model, config=config) as session:
            connected = True
            await _maybe_call(session_open_callback)
            event_queue: asyncio.Queue = asyncio.Queue()
            tasks = [
                asyncio.create_task(self._send_audio_loop(session, audio_input_queue, event_queue)),
                asyncio.create_task(self._send_text_loop(session, text_input_queue, event_queue)),
                asyncio.create_task(self._receive_loop(session, event_queue, audio_output_callback, audio_interrupt_callback)),
            ]
            # ... stream events until the call ends, then cancel the tasks
    except Exception as exc:
        if not connected and include_language_code and _language_code_rejected(exc):
            # The 3.1 Live preview may refuse SpeechConfig.language_code:
            # retry once without it so the PSTN call still connects.
            include_language_code = False
            continue
        raise`,
          },
        ],
      },
      result: {
        narrative:
          'One platform now backs several shipped products instead of several codebases. The multi-tenant lead dialer, KisanVoice’s phone surveys and client-specific agents all run on it, so a fix to the call pipeline reaches every one of them at once.',
        metrics: [
          { value: '589', label: 'commits authored' },
          { value: '1 API', label: 'drives every product' },
          { value: 'Live', label: 'in client deployments' },
        ],
      },
    },
  },
  {
    slug: 'leadcall-ai',
    name: 'LeadCall AI',
    featured: true,
    metaTitle: 'LeadCall AI: Multi-Tenant AI Calling SaaS',
    metaDescription:
      'Multi-tenant outbound-calling SaaS on a voice-agent platform, with Celery dial workers, pitch-document RAG and Excel lead import.',
    categories: ['AI', 'Full-Stack'],
    blurb:
      'Multi-tenant outbound-calling SaaS built on the voice-agent platform. Upload a lead list and a pitch document, and Celery workers dial through the platform API, sync transcripts back and keep each tenant’s leads and credentials apart.',
    highlights: [
      'Celery dial and callback workers that call through the voice-agent platform API',
      'Pitch documents re-indexed for RAG so the script matches what the client sells',
      'Excel lead import, transcript sync and call-log export on Alembic-migrated PostgreSQL',
    ],
    tags: ['Python', 'FastAPI', 'Celery', 'Alembic', 'PostgreSQL', 'React', 'RAG', 'Docker Compose'],
    links: {},
    star: {
      situation:
        'Small teams sit on lead lists they never call. The blocker is not the conversation. It is the operations around it: dialing at the right pace, knowing which calls actually finished, and keeping one client’s data away from another’s.',
      task:
        'Build a service where uploading a lead list and a pitch document is enough to run a calling campaign, with each tenant’s leads, credentials and call history kept separate.',
      action: {
        narrative:
          'LeadCall AI is FastAPI + PostgreSQL with Alembic migrations and a React dashboard. It does not run its own telephony: it dials through the CortexCraft voice-agent platform’s external API, and each tenant stores its own platform URL and an encrypted API key. Celery workers handle dialing and webhook callbacks, leads arrive by Excel import, and pitch documents are cleared and re-indexed for RAG so the agent’s script matches what the client sells. Transcripts sync back per call, and the call log exports for the client.',
      },
      result: {
        narrative:
          'A lead list and a pitch document become a running campaign with per-call transcripts and an exportable call log, without the client operating any telephony of their own.',
        metrics: [
          { value: 'Multi-tenant', label: 'encrypted per-tenant keys' },
          { value: 'Celery', label: 'dial + callback workers' },
          { value: 'Excel', label: 'lead import + log export' },
        ],
      },
    },
  },
  {
    slug: 'kisanvoice-ai',
    name: 'KisanVoice AI',
    featured: true,
    metaTitle: 'KisanVoice AI: Multilingual Voice Surveys',
    metaDescription:
      'WhatsApp voice surveys for farmers in 24 locales, 10 of them Indian, on FastAPI with Google speech-to-text, text-to-speech and Gemini answer matching.',
    categories: ['AI', 'Full-Stack'],
    blurb:
      'WhatsApp survey platform that lets farmers answer by voice in their own language. A config-driven language registry covers 24 locales (10 Indian) over Google STT/TTS, with WhatsApp Flows for long option sets, phone-call surveys through the voice-agent platform, and a real-time admin dashboard.',
    highlights: [
      '24 locales from a config-driven registry, 10 of them Indian, with no redeploy to add one',
      'Migrated the platform off a Node backend and off Sarvam onto FastAPI + Google STT/TTS',
      '172 of the repo\u2019s 192 commits; Jenkins CI, Docker Compose deploys',
    ],
    tags: ['Python', 'FastAPI', 'React', 'MongoDB', 'WhatsApp Flows', 'Google STT/TTS', 'Plivo', 'Socket.io', 'Jenkins', 'Docker'],
    links: {}, // add { github: '...' } / { live: '...' } when ready
    details: {
      role: 'Lead author, CortexCraft.ai',
      team: '3 contributors',
      timeline: 'March to August 2026',
      commits: '172 of 192',
      responsibilities: [
        'FastAPI backend that replaced the Node.js one',
        'Google speech-to-text and text-to-speech services',
        'Config-driven language registry (24 locales)',
      ],
    },
    diagram: {
      title: 'A voice answer on WhatsApp, end to end',
      steps: [
        { label: 'WhatsApp webhook', detail: 'routes/whatsapp_routes.py' },
        { label: 'Session controller', detail: 'controllers/whatsapp/whatsapp_controller.py' },
        { label: 'Speech to text', detail: 'services/google_stt_service.py' },
        { label: 'Answer matching', detail: 'services/gemini_llm_service.py' },
        { label: 'Next question', detail: 'services/survey_engine.py' },
        { label: 'Text to speech', detail: 'services/tts_service.py' },
        { label: 'Reply on WhatsApp', detail: 'services/whatsapp_api_service.py' },
      ],
      stores: ['MongoDB'],
    },
    reflection: [
      'Delete the leftover Sarvam guard module, which nothing imports any more.',
      'Consolidate the duplicated WhatsApp route and controller modules into one of each.',
      'Stream WhatsApp survey answers to the dashboard live; today only phone-call events are pushed.',
    ],
    star: {
      situation:
        'Field surveys of rural farmers are slow, expensive and exclude people who can not read or fill in forms. Enumerators travel village to village, and language barriers across regions make consistent data collection hard.',
      task:
        'Build a platform that lets farmers answer surveys in their own language by voice over a channel they already use, WhatsApp, while giving administrators a real-time view of incoming responses and a way to verify audio quality.',
      action: {
        narrative:
          'I built the system on the WhatsApp Business API: inbound voice notes are transcribed, auto-translated, and run through conditional survey logic that picks the next question, with the reply synthesised back in the farmer\u2019s language. Long option sets go out as WhatsApp Flows with pagination rather than unusable text menus, and option matching survives imperfect speech through fuzzy and semantic fallback matching. A React dashboard with an audio QC workflow and Excel export receives live call events over Socket.io. Two migrations did the most for the platform: I replaced the Node backend with FastAPI so Python is the single backend, and moved STT/TTS from Sarvam to Google Cloud behind a config-driven language registry \u2014 adding a locale is now a config row, not a deploy. Phone surveys route through the CortexCraft voice-agent platform, and Jenkins drives the build.',
        samples: [
          {
            filename: 'backend-python/app/services/language_registry_service.py',
            language: 'python',
            code: `# JSON defaults + MongoDB admin overrides, merged into one alias index.
# Adding a language is a config row, not a deploy.
for raw in config.get("languages") or []:
    code = str(raw.get("code") or "").strip().lower()
    if not code:
        continue
    merged = _apply_env_tts_overrides(raw)
    if code in override_by_code:
        merged = _deep_merge(merged, override_by_code[code])
        merged["code"] = code

    canonical = str(merged.get("canonicalName") or code).strip().lower()
    profiles_by_iso[code] = merged
    profiles_by_canonical[canonical] = merged

    for alias in (code, canonical, str(merged.get("locale") or "").lower()):
        if alias:
            alias_to_iso[alias] = code`
          },
        ],
      },
      result: {
        narrative:
          'A deployed multilingual survey platform that removes the literacy barrier. Farmers answer by voice in their own language and administrators verify responses as they arrive. 172 of the repository\u2019s 192 commits are mine, across a backend migration and an STT/TTS provider swap done without losing the running surveys.',
        metrics: [
          { value: '24', label: 'locales configured' },
          { value: '172', label: 'commits authored' },
          { value: 'Node → FastAPI', label: 'backend migrated' },
        ],
      },
    },
  },
  {
    slug: 'stocksense-ai',
    name: 'StockSense AI',
    featured: false,
    metaTitle: 'StockSense AI: ML Demand Forecasting',
    metaDescription:
      'Item-level demand forecasting with LightGBM and Prophet, turned into safety stock, reorder points, EOQ and ABC classes behind a FastAPI service.',
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
    details: {
      team: 'Solo',
      timeline: 'February to April 2026',
      commits: '8 of 8 + 2 of 2 (two repositories)',
    },
    star: {
      situation:
        'Retailers lose money at both ends of inventory: overstocking ties up cash, while stockouts lose sales. Manual reorder rules can not keep up with seasonal, item-level demand.',
      task:
        'Forecast demand per item and turn those forecasts into concrete inventory decisions: how much safety stock to hold, when to reorder, and which items matter most.',
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
    metaTitle: 'FinGraph AI: Graph + Vector RAG Assistant',
    metaDescription:
      'Banking assistant that fuses pgvector semantic search with Neo4j relationships and answers with Groq, behind JWT and bcrypt authentication.',
    categories: ['AI', 'Full-Stack'],
    blurb:
      'Banking assistant over a Neo4j relationship graph. pgvector semantic search finds the relevant customers, loans and chats, Neo4j enriches every match with its relationships, and Groq writes the answer. JWT + bcrypt authentication guards the admin and audit APIs.',
    highlights: [
      'Hybrid retrieval: pgvector similarity search enriched with Neo4j relationships',
      'MiniLM embeddings from Hugging Face, answers generated with Groq',
      'JWT + bcrypt authentication, with ADMIN-only admin and audit routes',
    ],
    tags: ['Node.js', 'Express', 'React', 'Neo4j', 'Supabase pgvector', 'Hugging Face', 'Groq', 'JWT'],
    links: {},
    details: {
      team: 'Solo',
      timeline: 'January 2026',
    },
    diagram: {
      title: 'A question, end to end',
      steps: [
        { label: 'Chat UI', detail: 'frontend/src/api/chat.api.js' },
        { label: 'Chat route', detail: 'api/routes/chat.routes.js' },
        { label: 'Customer profile', detail: 'services/chat.service.js' },
        { label: 'Embed question', detail: 'services/embedding.service.js' },
        { label: 'Vector search', detail: 'db/supabase/driver.js' },
        { label: 'Graph enrichment', detail: 'services/vector.service.js' },
        { label: 'Groq answer', detail: 'services/llm.service.js' },
      ],
      stores: ['Neo4j', 'Supabase pgvector'],
    },
    reflection: [
      'Put JWT middleware on /api/chat and take the role from the verified token, not the request body.',
      'Mount the audit writer, so every question is actually logged.',
    ],
    star: {
      situation:
        'Banking questions are about relationships: which customer holds which loan, what they asked before, how their records connect. Plain vector search finds similar text but loses those links, so answers come back plausible and unanchored.',
      task:
        'Build an assistant that retrieves by meaning and then grounds each result in the graph of customers, loans and conversations.',
      action: {
        narrative:
          'I modelled users, loans and chats as a Neo4j graph and mirrored their text into Supabase pgvector with MiniLM embeddings from Hugging Face. A question is embedded, matched by similarity above a threshold, and every match is enriched with a Cypher query for its relationships (a loan’s borrower, a user’s loans and chats) before Groq writes the answer. Authentication is JWT with bcrypt-hashed passwords stored in Neo4j, and the admin and audit APIs require the ADMIN role.',
        samples: [
          {
            filename: 'backend/src/services/vector.service.js',
            language: 'javascript',
            code: `// Embed the question, find similar items in pgvector, then enrich each hit from Neo4j.
async function semanticSearch(query, contentType = null, limit = 5) {
  const queryEmbedding = await generateEmbedding(query);

  const vectorResults = await searchSimilar({
    queryEmbedding,
    contentType,
    limit,
    threshold: 0.3,
  });

  if (vectorResults.length === 0) {
    return [];
  }

  return enrichWithGraphData(vectorResults);
}`,
          },
        ],
      },
      result: {
        narrative:
          'A banking assistant whose answers carry the relationships behind them, not just the closest matching text.',
        metrics: [
          { value: 'Graph + Vector', label: 'hybrid retrieval' },
          { value: 'Neo4j', label: 'relationship enrichment' },
          { value: 'JWT + bcrypt', label: 'authentication' },
        ],
      },
    },
  },
  {
    slug: 'jiraflow-agent',
    name: 'JiraFlow Agent',
    featured: false,
    metaTitle: 'JiraFlow Agent: Jira Ticket to Pull Request',
    metaDescription:
      'An agent that turns a Jira ticket into a branch, a code change and a pull request, with human review as the merge gate.',
    categories: ['AI'],
    blurb:
      'Agent that picks up a Jira ticket, makes the change in the repository and opens a pull request against it. One branch per ticket, with human review still the merge gate.',
    highlights: [
      'Jira ticket → branch → code change → pull request',
      'One ai/scrum-<id> branch per ticket, traceable back to the issue',
      'The agent proposes and a human merges, so it never pushes to main',
    ],
    tags: ['Python', 'React', 'Vite', 'Jira API', 'GitHub API', 'LLM Agents'],
    links: {},
    details: {
      team: 'Solo',
      timeline: 'January to February 2026',
    },
    star: {
      situation:
        'A large share of any backlog is small, unambiguous tickets: a copy fix, a colour change, a missing prop. Each one still costs a context switch: read the ticket, branch, edit, push, open a PR.',
      task:
        'Automate the mechanical path from ticket to pull request for changes small enough to describe completely, without letting an agent write to the main branch.',
      action: {
        narrative:
          'I built an agent that reads a Jira/SCRUM ticket, locates the files it describes, applies the change, and opens a pull request from a dedicated `ai/scrum-<id>` branch whose commit message cites the ticket. The repository history is the proof, because every change arrived as a reviewed PR from its own ticket branch. The design point is the boundary: the agent proposes and a human merges, so a wrong edit costs a rejected PR rather than a broken main branch.',
      },
      result: {
        narrative:
          'Small tickets close as reviewable pull requests without a context switch, and every automated change is traceable to the issue that asked for it.',
        metrics: [
          { value: 'Ticket → PR', label: 'fully automated' },
          { value: '1 branch', label: 'per ticket' },
          { value: 'Human', label: 'stays the merge gate' },
        ],
      },
    },
  },
  {
    slug: 'zentrax',
    name: 'Zentrax',
    featured: false,
    metaTitle: 'Zentrax: Local AI Desktop Assistant',
    metaDescription:
      'Privacy-first Windows desktop assistant with Whisper speech recognition, MediaPipe gesture control and a local LLM through Ollama.',
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
    details: {
      timeline: 'October 2025 to March 2026',
      commits: '12 of 16',
    },
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
    metaTitle: 'TaskFlow: Spring Boot Productivity App',
    metaDescription:
      'Full-stack productivity app with Spring Boot REST APIs, a DTO-based architecture, PostgreSQL and a Vite + TypeScript front end.',
    categories: ['Full-Stack'],
    blurb:
      'Full-stack productivity app: Spring Boot REST APIs with a DTO-based architecture over PostgreSQL, and a Vite + TypeScript front end.',
    highlights: [
      'Clean REST APIs with DTO-based design',
      'PostgreSQL persistence behind Spring Boot',
      'Task prioritization and tracking in a Vite + TypeScript UI',
    ],
    tags: ['Java', 'Spring Boot', 'Vite', 'TypeScript', 'PostgreSQL'],
    links: {},
    details: {
      timeline: 'May to July 2025',
      commits: '8 of 9',
    },
    star: {
      situation:
        'Task apps are easy to start and hard to keep maintainable as the data and feature set grow.',
      task:
        'Build a productivity app with a clean, maintainable backend and a clear contract between the API and the database.',
      action: {
        narrative:
          'I designed a Spring Boot backend around DTOs, so the API contract stays separate from the persistence model, backed by PostgreSQL, with a Vite + TypeScript front end for prioritizing and tracking tasks.',
      },
      result: {
        narrative:
          'A maintainable full-stack productivity app with a clean split between persistence and API contracts.',
        metrics: [
          { value: 'Spring Boot', label: 'REST API' },
          { value: 'DTO-based', label: 'clean architecture' },
          { value: 'PostgreSQL', label: 'persistent tracking' },
        ],
      },
    },
  },
  {
    slug: 'grocerygo',
    name: 'GroceryGo',
    featured: false,
    metaTitle: 'GroceryGo: Jetpack Compose Grocery App',
    metaDescription:
      'Android grocery-list app in Kotlin with Jetpack Compose, MVVM, and Firebase Authentication and Realtime Database.',
    categories: ['Mobile'],
    blurb:
      'Android grocery-list app built with Kotlin and Jetpack Compose, with Firebase Authentication and Realtime Database behind an MVVM architecture.',
    highlights: [
      'Jetpack Compose UI with ViewModel-held screen state (MVVM)',
      'Firebase Authentication and Realtime Database',
      'Final project of my Internshala Android development training',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    links: {},
    details: {
      team: 'Solo',
      timeline: 'June to July 2025',
      commits: '4 of 4',
    },
    star: {
      situation:
        'Grocery lists live in chat threads and scraps of paper, and they fall apart as soon as two people shop for the same household.',
      task:
        'Build a modern Android app for managing grocery lists, with sign-in and data kept in the cloud.',
      action: {
        narrative:
          'I built the app in Kotlin with Jetpack Compose for a declarative UI and an MVVM structure, with ViewModels holding screen state. Firebase Authentication handles sign-in and the Realtime Database stores the lists.',
      },
      result: {
        narrative:
          'A working Compose + Firebase grocery app, and the project where I learned MVVM on Android.',
        metrics: [
          { value: 'Compose', label: 'declarative UI' },
          { value: 'Firebase', label: 'auth + realtime DB' },
          { value: 'MVVM', label: 'architecture' },
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
  degree: 'B.E. in Information Science & Engineering',
  school: 'Vivekananda Institute of Technology, Bangalore',
  achievements: [
    'Built and deployed AI-powered and full-stack applications with real-user testing.',
    'Strong experience in backend optimization, debugging and scalable system design.',
    'Practise a disciplined delivery workflow: feature branches, conventional commits, and automated tests in CI as the merge gate.',
  ],
}
