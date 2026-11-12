// Recruiter-facing summary for the homepage. Every fact here mirrors the detailed pages
// (experience, projects, research, patents, certificates); keep the two in sync when either changes.

export const profile = {
  name: 'Hitesh Kumar',
  role: 'AI/ML Engineer',
  summary:
    'I build LLM-powered products end to end: RAG pipelines, agentic and voice-AI systems, and the backend APIs that put them in production. Currently an SDE (AI/ML) at Pharmacoevidence, working on Evaior, an AI research-intelligence platform for pharmaceutical and HTA/HEOR teams.',
  facts: [
    { label: 'Currently', value: 'SDE — AI/ML at Pharmacoevidence', detail: 'Jan 2026 – present · Hybrid' },
    { label: 'Education', value: 'B.E. Computer Science (AI & ML)', detail: 'Chandigarh University' },
    { label: 'Based in', value: 'Chandigarh, India', detail: 'Hybrid & remote experience' },
    { label: 'Focus', value: 'RAG · LLM agents · Voice AI', detail: 'Plus classical ML & computer vision' },
  ],
  proof: [
    { value: '~44%', label: 'faster OCR → answer pipeline at Evalvia.Ai' },
    { value: '2', label: 'research papers (IEEE ICACCTech 2024, ICRAAI 2025)' },
    { value: '3', label: 'patent applications filed' },
    { value: 'Top 40', label: 'of 5,000 at the Edunet × AICTE AI internship' },
  ],
  stack: [
    { group: 'LLMs & agents', items: ['LangChain', 'LlamaIndex', 'Gemini', 'Claude', 'Ollama', 'MCP'] },
    { group: 'RAG & retrieval', items: ['FAISS', 'ChromaDB', 'Vector search', 'Hugging Face'] },
    { group: 'ML & vision', items: ['PyTorch', 'Scikit-learn', 'XGBoost', 'LightGBM', 'OpenCV', 'Stable-Baselines3'] },
    { group: 'Backend & data', items: ['Python', 'FastAPI', 'PostgreSQL', 'Kafka', 'Redis', 'MongoDB', 'WebSockets'] },
    { group: 'Cloud & delivery', items: ['AWS', 'Azure', 'Docker', 'Vercel', 'Render'] },
    { group: 'Front end', items: ['Next.js', 'React', 'TypeScript', 'Streamlit'] },
  ],
  links: {
    resume: '/api/resume?download=1',
    resumeView: '/api/resume',
    github: 'https://github.com/Hiteshydv001',
    linkedin: 'https://www.linkedin.com/in/hitesh-kumar-ai',
    email: 'mailto:hiteshofficial0001@gmail.com',
  },
}

export type Role = { company: string; title: string; dates: string; place: string; href: string; points: string[]; stack: string[]; current?: boolean }

export const roles: Role[] = [
  {
    company: 'Pharmacoevidence', title: 'Software Development Engineer — AI/ML', dates: 'Jan 2026 – Present', place: 'Chandigarh · Hybrid', current: true,
    href: '/experience/pharmacoevidence-sde-ai-ml',
    points: [
      'Building Evaior, an AI research-intelligence platform for pharmaceutical and HTA/HEOR teams.',
      'Designing event and data flows with Kafka and PostgreSQL, and the backend APIs behind AI pipeline features.',
      'Shipping production GenAI and analytics features for domain teams.',
    ],
    stack: ['Python', 'FastAPI', 'Kafka', 'PostgreSQL', 'AWS', 'Claude', 'RAG', 'React'],
  },
  {
    company: 'Evalvia.Ai', title: 'AI Intern', dates: 'Nov 2025 – Feb 2026', place: 'Remote',
    href: '/experience/evalvia-ai-intern',
    points: [
      'Cut the OCR → rubric → answer-generation pipeline from ~2m40s to ~1m30s (~44% faster).',
      'Improved OCR quality on handwritten, multi-page answer sheets.',
      'Built question-to-answer mapping with accurate bounding boxes in the review flow.',
    ],
    stack: ['OCR', 'Computer vision', 'Pipeline optimisation'],
  },
  {
    company: 'GirlScript Summer of Code', title: 'Project Administrator', dates: 'Jul 2025 – Nov 2025', place: 'Remote',
    href: '/experience/gssoc-project-administrator',
    points: [
      'Led two selected open-source voice-AI projects, DialogWeaver and Voice Marketing Agents, and mentored contributors.',
      'Designed a provider-agnostic platform for real-time, interruptible voice agents targeting sub-2-second responses.',
    ],
    stack: ['FastAPI', 'Next.js', 'WebSockets', 'Redis', 'Ollama', 'faster-whisper', 'Docker'],
  },
  {
    company: '100GAJ (now Algoric)', title: 'ML Intern', dates: 'Jun 2025 – Sep 2025', place: 'Remote',
    href: '/experience/100gaj',
    points: [
      'Built a custom RAG chatbot for real-estate search, with semantic search over property listings in a vector database.',
      'Connected it to property-data scrapers built with Playwright and BeautifulSoup.',
    ],
    stack: ['RAG', 'Vector DB', 'Playwright', 'BeautifulSoup'],
  },
  {
    company: 'Edunet Foundation × AICTE', title: 'AI/ML Intern', dates: 'Nov 2024 – Dec 2024', place: 'Remote',
    href: '/experience/edunet-foundation',
    points: [
      'Built a CNN + YOLO waste-classification model with a Streamlit app.',
      'One of 40 projects chosen from 5,000 candidates for the final presentation at a Government of India conference.',
    ],
    stack: ['CNN', 'YOLO', 'Python', 'Streamlit'],
  },
]

export const moreRolesNote = 'Plus open-source maintainer roles (SWoC, JWoC, DWoC), Hacktoberfest and earlier internships.'

/** Selected work: titles must match entries in projects-data.ts; links and stacks are read from there. */
export const selectedWork = [
  { title: 'DialogWeaver', kind: 'Voice AI platform', proof: 'Led as a GSSoC 2025 project', tint: 'sky' },
  { title: 'Multi-RAG-Agent', kind: 'Multi-agent RAG', proof: 'Live demo', tint: 'lilac' },
  { title: 'Voice Marketing Agent', kind: 'Self-hosted voice agents', proof: 'Sub-2-second response target', tint: 'peach' },
  { title: 'AI-Powered Portfolio', kind: 'RAG assistant', proof: 'Deployed on Vercel + Render', tint: 'mint' },
  { title: 'Property Price Predictor', kind: 'Classical ML pipeline', proof: '90.3% R²', tint: 'lilac' },
  { title: 'Guard-AI - Remote Proctoring System', kind: 'Computer vision', proof: 'Maintained in 3 open-source programs', tint: 'sky' },
] as const

export const credentials = {
  research: [
    { title: 'Train waitlisted-ticket confirmation prediction using ML', meta: 'IEEE · ICACCTech 2024 · LightGBM, 96.67% accuracy', href: '/research/train-ticket' },
    { title: 'Weather-integrated traffic routing with dynamic speed prediction', meta: 'ICRAAI 2025 · Accepted for publication', href: '/research/weather-traffic' },
  ],
  patents: [
    { title: 'AI-powered smart earbud with real-time meeting summarisation', meta: 'Application filed · Inventor', href: '/patents/smart-earbud' },
    { title: 'AI-guided autonomous deployment of underwater sensor networks', meta: 'Application filed · Principal inventor', href: '/patents/underwater-sensor' },
    { title: 'The Smart Pillow: non-intrusive health & sleep monitoring', meta: 'Application filed · Co-inventor', href: '/patents/smart-pillow' },
  ],
  certificates: [
    { title: 'Microsoft Certified: Azure AI Engineer Associate', meta: 'Microsoft · Dec 2025', href: '/certificates/azure-ai-engineer' },
    { title: 'Generative AI Foundations', meta: 'AWS Academy · Jan 2026', href: '/certificates/aws-genai-foundations' },
    { title: 'OCI 2024 Generative AI Certified Professional', meta: 'Oracle · Jul 2024', href: '/certificates/oracle-oci-genai' },
    { title: 'Generative AI Fundamentals', meta: 'Databricks · Aug 2024', href: '/certificates/databricks-genai' },
    { title: 'Agentforce Specialist', meta: 'Salesforce · Dec 2025', href: '/certificates/salesforce-agentforce' },
  ],
}
