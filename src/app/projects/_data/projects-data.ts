import { Project, ProjectCategory } from "../_types/project-types";

export const majorProjects: Project[] = [
    {
        title: "Multi-RAG-Agent",
        description: "A system using multiple specialized AI agents to automate workflows like text summarization, research article generation, and data sanitization.",
        longDescription: "Multi-RAG-Agent is a sophisticated system that leverages multiple AI agents, each specialized in different tasks, to create a powerful workflow automation platform. The system uses advanced RAG techniques to ensure accurate and contextual processing of information.",
        techStack: ["Python", "Streamlit", "FAISS", "Hugging Face", "Gemini API", "Next.js", "Flask"],
        link: "https://github.com/Hiteshydv001/Multi-Rag-Agent",
        live: "https://multi-rag-agent.vercel.app/",
        category: "ai-fullstack",
        featured: true,
        highlights: ["Multi-Agent System", "Advanced RAG Implementation", "Workflow Automation"],
        keyFeatures: [
            "Multiple specialized AI agents",
            "Automated workflow orchestration",
            "Text summarization and analysis",
            "Research article generation"
        ],
        implementation: [
            "Built multi-agent architecture",
            "Implemented RAG pipeline",
            "Created workflow automation system",
            "Developed web interface"
        ],
        challenges: [
            "Coordinating multiple AI agents",
            "Ensuring consistent output quality",
            "Managing system resources",
            "Optimizing response time"
        ],
        learnings: [
            "Multi-agent system architecture",
            "RAG implementation techniques",
            "Workflow automation patterns",
            "AI system integration"
        ],
        futureWork: [
            "Add more specialized agents",
            "Enhance workflow customization",
            "Implement advanced analytics",
            "Improve resource management"
        ],
        images: [
            {
                src: "/projects/multi-rag.png",
                alt: "Multi-RAG-Agent dashboard"
            }
        ]
    },
    {
        title: "LinkedIn Automate Comment",
        description: "An AI tool that scrapes LinkedIn posts, performs sentiment analysis, and automatically generates context-aware comments to boost professional engagement.",
        longDescription: "This innovative tool combines web scraping, natural language processing, and AI to automate meaningful engagement on LinkedIn. It analyzes post content and context to generate relevant, professional comments that add value to discussions.",
        techStack: ["Python", "Selenium", "Gemini API", "FastAPI", "Streamlit", "Playwright"],
        link: "https://github.com/Hiteshydv001/Linkedin-automate-comment",
        live: "https://linkedin-automate-comment.streamlit.app/",
        category: "ai-fullstack",
        featured: true,
        highlights: ["AI-Powered Comments", "Sentiment Analysis", "Automated Engagement"],
        keyFeatures: [
            "Automated LinkedIn post analysis",
            "Context-aware comment generation",
            "Sentiment analysis integration",
            "Professional engagement automation"
        ],
        implementation: [
            "Built robust web scraping pipeline",
            "Implemented sentiment analysis system",
            "Created AI comment generation logic",
            "Developed user interface"
        ],
        challenges: [
            "Handling LinkedIn's dynamic content",
            "Ensuring comment relevance",
            "Managing rate limits",
            "Maintaining engagement quality"
        ],
        learnings: [
            "Web scraping best practices",
            "NLP and sentiment analysis",
            "AI content generation",
            "Automation system design"
        ],
        futureWork: [
            "Add more engagement features",
            "Enhance comment personalization",
            "Implement advanced analytics",
            "Add more social platforms"
        ],
        images: [
            {
                src: "/projects/linkedin-automate.png",
                alt: "LinkedIn Automate Comment dashboard"
            }
        ]
    },
    {
        title: "Property Price Predictor",
        description: "An end-to-end ML pipeline for predicting real estate prices in India. It includes automated data ingestion, advanced geospatial feature engineering, and a Flask UI, achieving a 90.3% R² score.",
        longDescription: "This comprehensive real estate price prediction system combines advanced machine learning techniques with geospatial analysis to provide accurate property valuations across India. The system features automated data processing and an intuitive user interface.",
        techStack: ["Python", "Scikit-learn", "LightGBM", "XGBoost", "Pandas", "Flask"],
        link: "https://github.com/Hiteshydv001/Property_price_predictor",
        category: "machine-learning",
        featured: true,
        highlights: ["90.3% R² Score", "Geospatial Analysis", "Automated Pipeline"],
        keyFeatures: [
            "Advanced feature engineering",
            "Automated data ingestion",
            "Geospatial analysis integration",
            "High prediction accuracy"
        ],
        implementation: [
            "Built automated data pipeline",
            "Implemented feature engineering system",
            "Created ensemble ML models",
            "Developed web interface"
        ],
        challenges: [
            "Handling diverse property data",
            "Implementing geospatial features",
            "Optimizing model performance",
            "Managing data quality"
        ],
        learnings: [
            "Advanced feature engineering",
            "Geospatial data processing",
            "ML model optimization",
            "End-to-end ML pipeline design"
        ],
        futureWork: [
            "Add more property features",
            "Enhance prediction accuracy",
            "Implement real-time updates",
            "Add visualization features"
        ],
        images: [
            {
                src: "/projects/property-price.png",
                alt: "Property Price Predictor dashboard"
            }
        ]
    },
    {
        title: "Subway Surfer RL Agent",
        description: "A project using Reinforcement Learning (PPO) and computer vision to train an AI agent to automatically play the game Subway Surfers.",
        longDescription: "This innovative project combines computer vision and reinforcement learning to create an AI agent capable of playing Subway Surfers autonomously. The system uses PPO algorithm and real-time image processing to make game-playing decisions.",
        techStack: ["Python", "Stable-Baselines3", "Gymnasium", "OpenCV", "PyAutoGUI"],
        link: "https://github.com/Hiteshydv001/Subway-surfer-rf",
        category: "machine-learning",
        featured: true,
        highlights: ["PPO Implementation", "Computer Vision", "Game Automation"],
        keyFeatures: [
            "Real-time game state analysis",
            "Reinforcement learning implementation",
            "Automated game playing",
            "Performance optimization"
        ],
        implementation: [
            "Implemented PPO algorithm",
            "Built computer vision pipeline",
            "Created game state analyzer",
            "Developed training system"
        ],
        challenges: [
            "Real-time processing speed",
            "Game state recognition",
            "Agent training optimization",
            "Performance consistency"
        ],
        learnings: [
            "PPO algorithm implementation",
            "Computer vision techniques",
            "RL system optimization",
            "Game automation patterns"
        ],
        futureWork: [
            "Enhance agent performance",
            "Add more game support",
            "Implement advanced strategies",
            "Improve training efficiency"
        ],
        images: [
            {
                src: "/projects/subway-rf.png",
                alt: "Subway Surfer RL Agent in action"
            }
        ]
    },
    {
        title: "AI Trip Planner Agent",
        description: "A web app with an AI agent that generates personalized travel itineraries from a single prompt, using LangChain to integrate flights, hotels, and activities.",
        longDescription: "This intelligent travel planning system leverages LangChain and various travel APIs to create comprehensive, personalized travel itineraries. It combines flight booking, hotel selection, and activity planning into a seamless experience.",
        techStack: ["Python", "FastAPI", "LangChain", "Amadeus API", "SerpAPI"],
        link: "https://github.com/Hiteshydv001/Travel-Agent",
        live: "https://travel-agent-sigma.vercel.app/",
        category: "ai-fullstack",
        featured: true,
        highlights: ["AI Travel Planning", "API Integration", "Personalized Itineraries"],
        keyFeatures: [
            "Personalized itinerary generation",
            "Flight and hotel integration",
            "Activity recommendations",
            "Multi-API orchestration"
        ],
        implementation: [
            "Built LangChain integration",
            "Implemented travel API connections",
            "Created itinerary generator",
            "Developed user interface"
        ],
        challenges: [
            "Managing multiple API integrations",
            "Ensuring itinerary coherence",
            "Optimizing response times",
            "Handling travel constraints"
        ],
        learnings: [
            "LangChain implementation",
            "Travel API integration",
            "AI planning systems",
            "User experience design"
        ],
        futureWork: [
            "Add more travel services",
            "Enhance personalization",
            "Implement booking system",
            "Add real-time updates"
        ],
        images: [
            {
                src: "/projects/ai-trip-planner.png",
                alt: "AI Trip Planner interface"
            }
        ]
    },
    {
        title: "Land Registry Blockchain",
        description: "A decentralized application using Ethereum and Solidity smart contracts for a secure and immutable land ownership registry.",
        longDescription: "This blockchain-based land registry system provides a secure, transparent, and immutable platform for managing land ownership records. It leverages Ethereum smart contracts to ensure the integrity and accessibility of land ownership data.",
        techStack: ["Solidity", "Ethereum", "Truffle", "Web3.py", "Python"],
        link: "https://github.com/Hiteshydv001/Land-Register-blockchain",
        category: "blockchain",
        featured: true,
        highlights: ["Smart Contracts", "Decentralized Storage", "Immutable Records"],
        keyFeatures: [
            "Decentralized land registry",
            "Smart contract implementation",
            "Secure ownership transfer",
            "Immutable record keeping"
        ],
        implementation: [
            "Developed smart contracts",
            "Built blockchain integration",
            "Created ownership system",
            "Implemented verification logic"
        ],
        challenges: [
            "Ensuring contract security",
            "Managing gas costs",
            "Implementing ownership verification",
            "Handling complex transactions"
        ],
        learnings: [
            "Smart contract development",
            "Blockchain architecture",
            "Web3 integration",
            "Security best practices"
        ],
        futureWork: [
            "Add more property features",
            "Implement advanced verification",
            "Enhance user interface",
            "Add governance features"
        ],
        images: [
            {
                src: "/projects/land-registry-blockchain.png",
                alt: "Land Registry Blockchain interface"
            }
        ]
    },
    {
        title: "DialogWeaver",
        description: "An end-to-end orchestration platform for building and deploying intelligent, interruptible voice AI agents. It features a multi-tenant API and a no-code UI playground.",
        longDescription: "DialogWeaver is a comprehensive platform that simplifies the creation and deployment of sophisticated voice AI agents. The system features a unique orchestration layer that enables seamless voice interactions with advanced interruption handling.",
        techStack: ["Docker", "Python", "FastAPI", "Next.js", "React", "PostgreSQL", "Redis", "WebSockets"],
        link: "https://github.com/Hiteshydv001/DialogWeaver",
        category: "ai-fullstack",
        featured: true,
        highlights: ["Multi-tenant Architecture", "Real-time Voice Processing", "No-code UI"],
        keyFeatures: [
            "Intelligent voice agent orchestration",
            "Multi-tenant API system",
            "No-code conversation designer",
            "Real-time voice processing"
        ],
        implementation: [
            "Developed multi-tenant architecture",
            "Implemented real-time WebSocket communication",
            "Created no-code conversation designer",
            "Built voice processing pipeline"
        ],
        challenges: [
            "Managing multi-tenant data isolation",
            "Implementing real-time voice processing",
            "Designing intuitive no-code interface",
            "Optimizing system performance"
        ],
        learnings: [
            "Multi-tenant system architecture",
            "WebSocket-based real-time communication",
            "Voice AI system design",
            "No-code platform development"
        ],
        futureWork: [
            "Add more voice customization options",
            "Implement advanced analytics",
            "Enhance conversation designer",
            "Add more integration options"
        ],
        images: [
            {
                src: "/projects/dialogweaver.png",
                alt: "DialogWeaver Interface"
            }
        ]
    },
    {
        title: "AI-Powered Portfolio",
        description: "An interactive, conversational portfolio featuring a custom AI assistant (HiteshBot) trained exclusively on his professional background. Users can ask complex questions and receive accurate, context-aware answers in real-time.",
        longDescription: "This portfolio showcases the intersection of modern web development and artificial intelligence, featuring a custom-trained AI assistant that provides personalized responses about professional experience. The system uses advanced RAG techniques to ensure accurate and contextual responses while maintaining conversation coherence.",
        techStack: ["FastAPI", "LlamaIndex", "Google Gemini", "Python", "Next.js", "React", "TypeScript", "Vercel", "Render"],
        link: "https://github.com/Hiteshydv001/Portfolio",
        live: "https://hitesh-bot-portfolio.vercel.app/",
        featured: true,
        category: "ai-fullstack",
        highlights: ["RAG pipeline implementation", "Real-time AI conversations", "Production deployment"],
        keyFeatures: [
            "Custom-trained AI assistant with deep knowledge of professional background",
            "Real-time, context-aware conversation capabilities",
            "Seamless integration of modern web technologies",
            "Responsive and intuitive user interface"
        ],
        implementation: [
            "Implemented RAG (Retrieval Augmented Generation) pipeline for accurate responses",
            "Utilized LlamaIndex for efficient document indexing and retrieval",
            "Integrated Google Gemini for advanced language processing",
            "Deployed frontend on Vercel and backend on Render for optimal performance"
        ],
        challenges: [
            "Ensuring response accuracy while maintaining low latency",
            "Implementing efficient document retrieval system",
            "Optimizing conversation context management",
            "Handling concurrent user interactions"
        ],
        learnings: [
            "Advanced RAG pipeline architecture and optimization",
            "Real-time AI system deployment considerations",
            "Full-stack TypeScript/Python integration patterns",
            "Production-grade AI service deployment"
        ],
        futureWork: [
            "Implement streaming responses for better user experience",
            "Add multi-language support",
            "Enhance conversation memory management",
            "Integrate more interactive UI elements"
        ],
        images: [
            {
                src: "/projects/ai-portfolio.png",
                alt: "AI-Powered Portfolio Interface"
            }
        ]
    },
    {
        title: "Guard-AI - Remote Proctoring System",
        description: "A sophisticated, open-source AI proctoring system for secure remote assessments, featuring real-time facial recognition, gaze tracking, and lip movement detection. Featured in multiple open-source programs (SWOC, JWOC, DWOC).",
        longDescription: "Guard-AI is a comprehensive remote proctoring solution that leverages advanced computer vision and machine learning techniques to ensure the integrity of online assessments. The system provides real-time monitoring capabilities while maintaining user privacy and system security.",
        techStack: ["Python", "FastAPI", "OpenCV", "Machine Learning", "Streamlit", "Next.js", "Vercel"],
        link: "https://github.com/Hiteshydv001/Guard-AI-Designing-Remote-Proctoring-System",
        live: "https://guard-ai-proctor.vercel.app/",
        featured: true,
        category: "ai-fullstack",
        highlights: ["Real-time monitoring", "Emotion recognition", "Open Source Mentorship"],
        keyFeatures: [
            "Real-time facial recognition and tracking",
            "Gaze detection and analysis",
            "Lip movement monitoring",
            "Privacy-focused design"
        ],
        implementation: [
            "Implemented computer vision pipeline using OpenCV",
            "Developed custom ML models for facial analysis",
            "Created scalable backend architecture with FastAPI",
            "Designed intuitive monitoring dashboard"
        ],
        challenges: [
            "Achieving low-latency real-time processing",
            "Balancing accuracy with privacy concerns",
            "Handling various lighting conditions",
            "Managing system resource usage"
        ],
        learnings: [
            "Advanced computer vision techniques",
            "Real-time video processing optimization",
            "Privacy-preserving AI system design",
            "Open source project management"
        ],
        futureWork: [
            "Implement additional behavioral analysis features",
            "Add support for multiple concurrent sessions",
            "Enhance privacy features",
            "Improve accessibility"
        ],
        images: [
            {
                src: "/projects/guard-ai.png",
                alt: "Guard-AI monitoring dashboard"
            }
        ]
    },
    {
        title: "Voice Marketing Agent",
        description: "A complete, self-hosted framework for building real-time, low-latency AI voice agents for automated marketing calls. The system is fully containerized with Docker and uses a high-performance, open-source AI pipeline.",
        longDescription: "The Voice Marketing Agent is an innovative solution that combines conversational AI with voice synthesis to create natural, engaging automated marketing calls. The system is designed to be self-hosted and highly customizable, making it ideal for businesses of all sizes.",
        techStack: ["Docker", "Python", "FastAPI", "React", "Vite", "PostgreSQL", "Ollama", "Coqui TTS"],
        link: "https://github.com/Hiteshydv001/Voice-Marketing-Agent",
        category: "ai-fullstack",
        featured: true,
        highlights: ["Real-time Voice AI", "Self-Hosted & Open Source", "Dockerized Microservices"],
        keyFeatures: [
            "Real-time voice synthesis and processing",
            "Natural language understanding",
            "Customizable conversation flows",
            "Docker-based deployment"
        ],
        implementation: [
            "Built microservices architecture using Docker",
            "Implemented real-time voice processing pipeline",
            "Created flexible conversation management system",
            "Developed monitoring and analytics dashboard"
        ],
        challenges: [
            "Minimizing voice synthesis latency",
            "Managing complex conversation flows",
            "Ensuring system scalability",
            "Optimizing resource usage"
        ],
        learnings: [
            "Microservices architecture patterns",
            "Voice AI system optimization",
            "Docker container orchestration",
            "Real-time audio processing"
        ],
        futureWork: [
            "Add more voice customization options",
            "Implement advanced analytics",
            "Enhance conversation flexibility",
            "Improve deployment automation"
        ],
        images: [
            {
                src: "/projects/voice-agent.png",
                alt: "Voice Marketing Agent Interface"
            }
        ]
    }
];
