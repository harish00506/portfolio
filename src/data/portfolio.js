// Single source of truth for all portfolio content.
// Edit text, projects, skills and links here. Components read from this file.

// Site-level config used for SEO metadata, canonical URL and structured data.
// `url` is the single source of truth for the domain: the sitemap, robots.txt,
// canonical tags and JSON-LD are all generated from it. No trailing slash.
export const site = {
  url: 'https://harishgreddy.vercel.app',
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
  photo: '/profile.jpg',
  socials: {
    github: 'https://github.com/harish00506/',
    linkedin: 'https://www.linkedin.com/in/harishgreddy/',
  },
  about: [
    'Software Developer at CortexCraft.ai since January 2026, with hands-on experience across the Java, Python and JavaScript ecosystems and several years of freelance web and app development. I build scalable backend systems with Spring Boot, Express.js and FastAPI, and integrate AI technologies such as LLMs, STT, TTS and agent-based workflows into real-world products.',
    'I work the way the repositories show: one issue per branch, architecture decisions written down as ADRs before the code lands, commit messages that cite the requirement they satisfy, and migration and engine tests as the merge gate rather than an afterthought. On the AI side I hold a hard line: deterministic code computes the numbers, and the model only explains them.',
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
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Neo4j', 'Supabase / pgvector', 'Room / SQLCipher'],
  },
  {
    group: 'AI / ML',
    items: [
      'LLM Integration',
      'RAG',
      'Context Management',
      'Agents & Tool Calling',
      'Guardrails / Evaluation',
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
      'ADR-Driven Development',
    ],
  },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'CortexCraft.ai',
    period: 'Jan 2026 – Present',
    bullets: [
      'Built and maintain the voice-agent platform (~270 commits): Gemini Live phone agents over Twilio and Plivo, with per-agent RAG grounding, prompt generation, transcripts and an external REST API that other products call.',
      'Shipped LeadCall AI on that platform: multi-tenant outbound calling with Celery dialing workers, Alembic-migrated PostgreSQL and a React dashboard, plus a second vertical (AI invoice collections) built on the same engine without a rewrite.',
      'Own production reliability of the call pipeline: fixed outbound routing, added reconnect handling for dropped Gemini sockets, and traced a Docker TLS failure to NAT hairpinning. Each incident is documented alongside its fix.',
      'Design prompt frameworks, guardrails and agent orchestration with tool calling and safe escalation, so model output is constrained rather than trusted.',
      'Lead author (217 of 238 commits) on the multilingual farmer survey platform. Migrated it off a Node backend onto FastAPI, swapped Sarvam for Google STT/TTS behind a config-driven registry covering 24 locales, and put it on Jenkins CI without interrupting live surveys.',
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
// `action.screenshots`. NOTE: some code snippets are illustrative drafts. Replace
// with real excerpts; screenshots point at /public/projects/<slug>/ (add images).
export const projects = [
  {
    slug: 'ai-personal-cfo',
    name: 'AI Personal CFO',
    featured: true,
    categories: ['Mobile', 'AI'],
    blurb:
      'Offline-first Android personal-finance app where twelve deterministic Kotlin engines compute every rupee and the LLM is only allowed to explain the numbers, never to produce them. Money is Long paise end to end, behind SQLCipher and the Android Keystore.',
    highlights: [
      'Money as Long paise plus integer basis points, so no float ever touches a rupee',
      'The LLM never computes a figure; a numeric guardrail blocks unverified output',
      'Every core feature works in airplane mode; SQLCipher + Android Keystore at rest',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room / SQLCipher', 'Coroutines / Flow', 'WorkManager', 'Glance', 'Gradle'],
    links: {},
    star: {
      situation:
        'Finance apps get money wrong in two predictable ways: they hold amounts as floating-point numbers, so a paise quietly appears and disappears; and they let a language model do the arithmetic, so the figure on screen has no traceable origin. Both failures stay invisible until a user reconciles against their bank statement and stops trusting the app.',
      task:
        'Build a personal CFO that is correct by construction: exact money arithmetic, every recommendation traceable to the rule that produced it, and no dependency on a network or a cloud model for anything the user does day to day.',
      action: {
        narrative:
          'I split the app into 34 Gradle modules with a strictly one-way dependency graph (feature to domain to data and core), and kept the twelve engines (Safe-to-Spend, budgets, forecasting, recurring detection, credit-card cycle, loan amortisation, net worth, SMS parsing, receipt OCR and more) as pure Kotlin with no Android imports, so they stay unit-testable and portable. Money is a Long-paise value class with checked arithmetic and largest-remainder allocation; rates are integer basis points; time comes from an injected Clock. The LLM layer is hard-limited: it reads through a tool registry rather than the database, and every figure it speaks is checked against engine provenance by a guardrail that repairs or blocks a mismatch. Architecture decisions are written down as ADRs before the code lands, and every schema bump ships a migration test.',
        samples: [
          {
            filename: 'core/model/Money.kt',
            language: 'kotlin',
            code: `// Split an amount by weights so the parts sum EXACTLY to the whole.
// Naive division loses the odd paise; this is largest-remainder (Hamilton).
fun allocate(weights: List<Int>): List<Money> {
    require(weights.isNotEmpty()) { "Weights must not be empty" }
    val totalWeight = weights.fold(0L) { acc, w -> Math.addExact(acc, w.toLong()) }
    require(totalWeight > 0L) { "Weights must not all be zero" }

    val scaled = weights.map { Math.multiplyExact(minor, it.toLong()) }
    val shares = scaled.map { it / totalWeight }.toMutableList()
    val lost = scaled.mapIndexed { i, v -> i to Math.abs(v % totalWeight) }

    // Hand the undistributed paise to the biggest losers first.
    var remainder = minor - shares.sum()
    val step = if (remainder < 0L) -1L else 1L
    for ((i, _) in lost.sortedWith(compareByDescending { it.second })) {
        if (remainder == 0L) break
        shares[i] += step
        remainder -= step
    }
    return shares.map(::Money)   // sum(shares) == minor, always
}`,
          },
        ],
      },
      result: {
        narrative:
          'A working offline finance app at v0.6.2, with twelve deterministic engines, 27 recorded architecture decisions, 160 test files, and a database on schema 17 with a migration test for every step. No figure on screen comes from a language model.',
        metrics: [
          { value: '12', label: 'deterministic engines' },
          { value: '27', label: 'ADRs recorded' },
          { value: '0', label: 'floats in money math' },
        ],
      },
    },
  },
  {
    slug: 'cortexcraft-voice-agent',
    name: 'CortexCraft Voice Agent',
    featured: true,
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
    star: {
      situation:
        'Every client wanted the same thing with a different script: an AI that answers or places phone calls, knows their documents, and hands a transcript back to whatever system they already run. Rebuilding that stack per client would have meant maintaining the same telephony and streaming bugs in several places at once.',
      task:
        'Build one platform where an agent is configuration rather than code: created from a dashboard or an API, grounded in uploaded documents, reachable over more than one telephony provider, and drivable by external systems.',
      action: {
        narrative:
          'I built a FastAPI + React platform where each agent is a JSON config plus a folder of RAG documents. A prompt generator turns that config into the full system prompt and the inbound/outbound greetings. Calls stream over a WebSocket to Gemini Live, with separate Twilio and Plivo handlers behind one interface and a browser channel for testing without burning call minutes; transcripts are written back into each agent’s conversation store. An external REST API exposes agent creation and call placement, so other products consume the platform instead of forking it. Most of the real work was production reliability: fixing outbound-call routing, adding reconnect handling for Gemini 1006 socket drops, tightening goodbye detection so calls end cleanly, and tracing a Docker TLS failure to NAT hairpinning on a self-hosted domain. Each incident is documented next to its fix.',
        samples: [
          {
            filename: 'backend/src/external_api/routes.py',
            language: 'python',
            code: `# One agent = one JSON config + a folder of RAG docs.
# Other products create agents and place calls through this API.
@router.post("/agents/{agent_id}/call")
async def place_call(agent_id: str, req: CallRequest, key: str = Depends(api_key)):
    agent = load_agent(agent_id)                  # backend/src/ai-agents/{id}
    if agent is None:
        raise HTTPException(404, "unknown agent")

    prompt = build_prompt(agent, context=req.context)   # + retrieved RAG chunks
    provider = TELEPHONY[agent.provider]                # "twilio" | "plivo"

    call = await provider.dial(req.to, agent_id=agent_id, prompt=prompt)
    return {"call_id": call.id, "status": call.status}`,
          },
        ],
      },
      result: {
        narrative:
          'One platform now backs several shipped products instead of several codebases. The collections agent, the multi-tenant lead dialer and client-specific assistants all run on it, so a fix to the call pipeline reaches every one of them at once.',
        metrics: [
          { value: '~270', label: 'commits authored' },
          { value: '1 API', label: 'drives every product' },
          { value: 'Live', label: 'in client deployments' },
        ],
      },
    },
  },
  {
    slug: 'leadcall-ai',
    name: 'LeadCall AI & Collections Hub',
    featured: true,
    categories: ['AI', 'Full-Stack'],
    blurb:
      'Two outbound-calling products on top of the voice-agent platform: a multi-tenant lead-calling SaaS, and a collections hub that grew into a visual workflow builder. Compose a call flow as a graph, dry-run it before spending a call, then run it against imported lead groups.',
    highlights: [
      'Graph workflow builder with dry-run execution and per-run logs before a call is spent',
      'Lead groups, XLSX/CSV import, transcript sync and call-log export',
      'Celery dialing + callback workers, pitch-document RAG, Alembic-migrated PostgreSQL',
    ],
    tags: ['Python', 'FastAPI', 'Celery', 'Alembic', 'PostgreSQL', 'React', 'MUI', 'RAG', 'Docker Compose'],
    links: {},
    star: {
      situation:
        'Small teams sit on lead lists they never call. The blocker is not the conversation. It is the operations around it: dialing at the right pace, retrying without double-calling, knowing which calls actually finished, and keeping one client’s data away from another’s.',
      task:
        'Build a service where uploading a lead list and a pitch document is enough to run a calling campaign, and where the person configuring the call can see and test the exact prompt before it dials anyone.',
      action: {
        narrative:
          'Both products are FastAPI + PostgreSQL with Alembic migrations and a React dashboard, dialing through the CortexCraft voice-agent platform. LeadCall AI adds tenant-scoped auth, campaigns and Celery workers for dialing and webhook callbacks, with pitch documents cleared and re-indexed for RAG so the script matches what the client sells. The collections hub started as a Square-invoice CSV reader that called overdue accounts under a threshold, and grew into the more interesting half: a workflow graph the operator composes, a greeting resolver that adapts to time of day and lead context, prompt assembly that merges agent, company and lead context, and a dry-run mode that renders the final assembled prompt against a sample name and number, so you read exactly what the agent will say before spending a call. Every run is logged with its prompt and outcome. Call state took real care: webhooks are not guaranteed, so completion handles terminal statuses explicitly and the app reconciles in-progress calls against telephony probes instead of trusting the last event it happened to receive.',
      },
      result: {
        narrative:
          'A lead list and a pitch document become a running campaign with per-call transcripts and a call log that reconciles. Because the workflow is composed and dry-run rather than coded, a new client script is a configuration change, not a deploy.',
        metrics: [
          { value: '2 products', label: 'on one calling engine' },
          { value: 'Dry-run', label: 'before a call is spent' },
          { value: 'Reconciled', label: 'call-state tracking' },
        ],
      },
    },
  },
  {
    slug: 'kisanvoice-ai',
    name: 'KisanVoice AI',
    featured: true,
    categories: ['AI', 'Full-Stack'],
    blurb:
      'WhatsApp survey platform that lets farmers answer by voice in their own language. A config-driven language registry covers 24 locales (10+ Indian) over Google STT/TTS, with WhatsApp Flows for long option sets, phone-call surveys through the voice-agent platform, and a real-time admin dashboard.',
    highlights: [
      '24 locales from a config-driven registry, 10+ of them Indian, with no redeploy to add one',
      'Migrated the platform off a Node backend and off Sarvam onto FastAPI + Google STT/TTS',
      '217 of the repo\u2019s 238 commits; Jenkins CI, Docker Compose deploys',
    ],
    tags: ['Python', 'FastAPI', 'React', 'MongoDB', 'WhatsApp Flows', 'Google STT/TTS', 'Plivo', 'Socket.io', 'Jenkins', 'Docker'],
    links: {}, // add { github: '...' } / { live: '...' } when ready
    star: {
      situation:
        'Field surveys of rural farmers are slow, expensive and exclude people who can not read or fill in forms. Enumerators travel village to village, and language barriers across regions make consistent data collection hard.',
      task:
        'Build a platform that lets farmers answer surveys in their own language by voice over a channel they already use, WhatsApp, while giving administrators a real-time view of incoming responses and a way to verify audio quality.',
      action: {
        narrative:
          'I built the system on the WhatsApp Business API: inbound voice notes are transcribed, auto-translated, and run through conditional survey logic that picks the next question, with the reply synthesised back in the farmer\u2019s language. Long option sets go out as WhatsApp Flows with pagination rather than unusable text menus, and option matching survives imperfect speech through fuzzy and semantic fallback matching. A React dashboard streams responses live over Socket.io with an audio QC workflow and Excel export. Two migrations did the most for the platform: I replaced the Node backend with FastAPI so Python is the single backend, and moved STT/TTS from Sarvam to Google Cloud behind a config-driven language registry \u2014 adding a locale is now a config row, not a deploy. Phone surveys route through the CortexCraft voice-agent platform, and Jenkins drives the build.',
        samples: [
          {
            filename: 'app/services/language_registry_service.py',
            language: 'python',
            code: `# Adding a language is a config row, not a deploy: the registry resolves
# an alias ("telugu", "te", "te-IN") to one profile carrying its STT/TTS codes.
def resolve(alias: str) -> LanguageProfile:
    _refresh_if_stale()                       # JSON config + DB overrides, TTL cached
    key = alias.strip().lower()
    iso = _ALIAS_TO_ISO.get(key) or _LANG_TOKEN_MAP.get(key) or _DEFAULT_ISO
    return _PROFILES[iso]

async def ask(session, question) -> None:
    lang = resolve(session.language)          # 24 locales configured today
    text = question.localized.get(lang.iso) or await translate(question.text, lang.iso)

    if len(question.options) > 10:            # a 20-item text menu is unusable
        return await send_whatsapp_flow(session.phone, text, question.options)

    audio = await google_tts.synthesize(text, lang.tts)
    await send_whatsapp_audio(session.phone, audio)`
          },
        ],
        screenshots: [
          { src: '/projects/kisanvoice-ai/dashboard.png', caption: 'Real-time admin dashboard with live responses and analytics' },
          { src: '/projects/kisanvoice-ai/whatsapp.png', caption: 'WhatsApp voice survey flow in a regional language' },
        ],
      },
      result: {
        narrative:
          'A deployed multilingual survey platform that removes the literacy barrier. Farmers answer by voice in their own language and administrators verify responses as they arrive. 217 of the repository\u2019s 238 commits are mine, across a backend migration and an STT/TTS provider swap done without losing the running surveys.',
        metrics: [
          { value: '24', label: 'locales configured' },
          { value: '217', label: 'commits authored' },
          { value: 'Node → FastAPI', label: 'backend migrated' },
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
    // Not featured: the CortexCraft Voice Agent entry covers the same ground with
    // production deployments behind it. This stays on /works as the earlier build.
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
    star: {
      situation:
        'Businesses want to handle phone calls with an AI agent that feels natural, but real-time telephony is unforgiving: every extra hundred milliseconds of latency makes the conversation feel robotic, and callers switch languages mid-sentence.',
      task:
        'Connect a phone network to a low-latency speech pipeline so an LLM can hold a live, two-way conversation over a real call, detecting the caller’s language automatically and handling both inbound and outbound calls.',
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
        'Banking assistants must answer questions over sensitive, highly-connected data while strictly enforcing who is allowed to see what. A customer, a manager and an admin should get very different answers, and every access must be auditable.',
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
          { src: '/projects/fingraph-ai/roles.png', caption: 'Role-scoped answers for admin, manager and customer' },
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
    slug: 'jiraflow-agent',
    name: 'JiraFlow Agent',
    featured: false,
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
  degree: 'B.E. in Information Science & Engineering',
  school: 'Vivekananda Institute of Technology, Bangalore',
  achievements: [
    'Built and deployed AI-powered and full-stack applications with real-user testing.',
    'Strong experience in backend optimization, debugging and scalable system design.',
    'Practise a disciplined delivery workflow: one issue per branch, decisions recorded as ADRs, requirement-tagged conventional commits, and migration + engine tests as the merge gate.',
  ],
}
