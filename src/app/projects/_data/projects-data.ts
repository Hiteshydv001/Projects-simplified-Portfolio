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
    },
    {
        title: "100-GAJ-RAG",
        description: "RAG-based system for 100-GAJ.",
        longDescription: "A Retrieval-Augmented Generation (RAG) system designed for 100-GAJ to provide intelligent information retrieval.",
        techStack: ["Python", "RAG"],
        link: "https://github.com/Hiteshydv001/100-GAJ-RAG",
        category: "ai-fullstack",
        featured: false,
        highlights: ["RAG Implementation"],
        keyFeatures: ["Information Retrieval", "Contextual Answers"],
        implementation: ["Implemented RAG pipeline"],
        challenges: ["Data processing"],
        learnings: ["RAG architecture"],
        futureWork: ["Enhance retrieval accuracy"],
        images: [{ src: "/placeholder.png", alt: "100-GAJ-RAG" }]
    },
    {
        title: "100GAJ-Chatbot",
        description: "Backend service providing a conversational interface for real estate inquiries.",
        longDescription: "The 100Gaj AI Chatbot is a backend service that provides a conversational interface for real estate inquiries. It can answer general questions about the company and perform specific property searches using natural language. The core technology is a Large Language Model (LLM) agent that uses tools to access a property database and a knowledge base.",
        techStack: ["Python", "LLM", "Railway", "JavaScript"],
        link: "https://github.com/Hiteshydv001/100GAJ-Chatbot",
        live: "https://100gaj-chatbot-production.up.railway.app",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Real Estate Inquiries", "Property Search", "LLM Agent"],
        keyFeatures: ["Conversational Interface", "Property Database Access", "Streaming API"],
        implementation: ["Developed backend service", "Integrated LLM agent"],
        challenges: ["Handling real-time queries", "Database integration"],
        learnings: ["LLM agent development", "Streaming API implementation"],
        futureWork: ["Add more property filters", "Improve response time"],
        images: [{ src: "/placeholder.png", alt: "100GAJ-Chatbot" }]
    },
    {
        title: "AAE_french_version",
        description: "Designed french version of NGO named AAE based on united states.",
        longDescription: "Designed french version of NGO named AAE based on united states.",
        techStack: ["HTML", "CSS"],
        link: "https://github.com/Hiteshydv001/AAE_french_version",
        category: "web-dev",
        featured: false,
        highlights: ["French Localization", "NGO Website"],
        keyFeatures: ["Multilingual Support", "Responsive Design"],
        implementation: ["Translated content", "Adapted UI for French"],
        challenges: ["Localization nuances"],
        learnings: ["Internationalization"],
        futureWork: ["Add more languages"],
        images: [{ src: "/placeholder.png", alt: "AAE_french_version" }]
    },
    {
        title: "ace-iac-day-zero",
        description: "Infrastructure for Aviatrix ACE IaC course.",
        longDescription: "This repository builds out the infrastructure for the Aviatrix ACE IaC course, including Aviatrix Transit in AWS, Spoke in AWS and Azure, and Ubuntu VMs.",
        techStack: ["Terraform", "AWS", "Azure"],
        link: "https://github.com/Hiteshydv001/ace-iac-day-zero",
        category: "utilities",
        featured: false,
        highlights: ["Infrastructure as Code", "Multi-Cloud"],
        keyFeatures: ["Aviatrix Controller", "Terraform Provider", "Multi-Cloud Segmentation"],
        implementation: ["Wrote Terraform scripts", "Configured cloud providers"],
        challenges: ["Multi-cloud networking"],
        learnings: ["Terraform advanced usage", "Aviatrix platform"],
        futureWork: ["Add more cloud providers"],
        images: [{ src: "/placeholder.png", alt: "ace-iac-day-zero" }]
    },
    {
        title: "AI-Meme-Generator",
        description: "AI that learns to tell jokes by watching facial reactions.",
        longDescription: "This project documents an attempt to teach an Artificial Intelligence to be funny. Using Python, Reinforcement Learning, and Computer Vision, this AI learns to tell jokes by watching the user's face and getting rewarded when they laugh.",
        techStack: ["Python", "Reinforcement Learning", "OpenCV", "MediaPipe", "PPO"],
        link: "https://github.com/Hiteshydv001/AI-Meme-Generator",
        category: "machine-learning",
        featured: false,
        highlights: ["Reinforcement Learning", "Computer Vision", "Humor Analysis"],
        keyFeatures: ["Facial Reaction Detection", "Joke Generation", "PPO Algorithm"],
        implementation: ["Implemented RL agent", "Integrated computer vision"],
        challenges: ["Exploration vs Exploitation", "Real-time processing"],
        learnings: ["Reinforcement Learning application", "Human-Computer Interaction"],
        futureWork: ["Improve joke database", "Enhance emotion detection"],
        images: [{ src: "/placeholder.png", alt: "AI-Meme-Generator" }]
    },
    {
        title: "AI-ML-Portfolio",
        description: "Interactive portfolio for an AI/ML Engineer built with Next.js and TypeScript.",
        longDescription: "An interactive portfolio for an AI/ML Engineer built with Next.js and TypeScript. Features a custom AI assistant, a dynamic data pipeline visualization, and an AI-powered sketch recognition game.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel AI SDK"],
        link: "https://github.com/Hiteshydv001/AI-ML-Portfolio",
        live: "https://hitesh-aiml.vercel.app/",
        category: "ai-fullstack",
        featured: true,
        highlights: ["AI Assistant", "RAG Pipeline", "Sketch Recognition"],
        keyFeatures: ["HiteshBot", "Animated AI Workstation", "AI-Powered Drawing Game"],
        implementation: ["Built RAG pipeline", "Developed Next.js frontend"],
        challenges: ["Real-time AI interaction", "Animation performance"],
        learnings: ["Vercel AI SDK", "Advanced Next.js patterns"],
        futureWork: ["Add more AI games", "Expand knowledge base"],
        images: [{ src: "/placeholder.png", alt: "AI-ML-Portfolio" }]
    },
    {
        title: "AI-Waifu",
        description: "Interactive, voice-driven AI companion with a real-time 3D avatar.",
        longDescription: "Project Ananya is an interactive, voice-driven AI companion. She listens, responds, and remembers your conversations, brought to life by a modular engine that combines state-of-the-art AI technologies.",
        techStack: ["Python", "Gradio", "LLM", "TTS", "ChromaDB"],
        link: "https://github.com/Hiteshydv001/AI-Waifu",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Voice-Driven", "3D Avatar", "Long-Term Memory"],
        keyFeatures: ["Multi-Backend LLM", "Dual TTS Engines", "Real-time Interaction"],
        implementation: ["Integrated TTS and LLM", "Built Gradio UI"],
        challenges: ["Latency reduction", "Voice cloning quality"],
        learnings: ["Voice AI integration", "3D model interaction"],
        futureWork: ["Improve avatar animation", "Add more personalities"],
        images: [{ src: "/placeholder.png", alt: "AI-Waifu" }]
    },
    {
        title: "AlgoVisualizer",
        description: "Interactive platform for visualizing algorithms and data structures.",
        longDescription: "AlgoVisualizer is a web-based, interactive platform designed to help users understand complex Data Structures and Algorithms (DSA) by visualizing their step-by-step execution.",
        techStack: ["React", "Tailwind CSS", "Vite"],
        link: "https://github.com/Hiteshydv001/AlgoVisualizer",
        live: "https://algo-visualizer-green.vercel.app/",
        category: "web-dev",
        featured: false,
        highlights: ["Algorithm Visualization", "Interactive Controls"],
        keyFeatures: ["Sorting Visualizer", "Pathfinding Visualizer", "Graph Algorithms"],
        implementation: ["Built visualization engine", "Designed UI components"],
        challenges: ["State management for animations", "Performance optimization"],
        learnings: ["React hooks for animation", "Algorithm complexity"],
        futureWork: ["Add more algorithms", "Mobile support"],
        images: [{ src: "/placeholder.png", alt: "AlgoVisualizer" }]
    },
    {
        title: "Auto-Code-Fix",
        description: "AI-powered coding assistant for debugging, refactoring, and code analysis.",
        longDescription: "Auto Code Fix: AI-powered coding assistant for debugging, refactoring, and code analysis. Features intelligent code analysis, bug detection, and best practices suggestions.",
        techStack: ["Python", "FastAPI", "Gemini LLM", "Gradio"],
        link: "https://github.com/Hiteshydv001/Auto-Code-Fix",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Code Analysis", "Bug Detection", "Refactoring"],
        keyFeatures: ["Intelligent Code Analysis", "Natural Language Interface", "GitHub Integration"],
        implementation: ["Developed analysis engine", "Integrated Gemini API"],
        challenges: ["Code parsing accuracy", "Security vulnerability detection"],
        learnings: ["Static code analysis", "LLM for code generation"],
        futureWork: ["Support more languages", "IDE plugin"],
        images: [{ src: "/placeholder.png", alt: "Auto-Code-Fix" }]
    },
    {
        title: "Blindness-detection-codeclause",
        description: "Blindness detection using machine learning and computer vision.",
        longDescription: "This project aims to develop a Blindness Detection system using machine learning and computer vision techniques. The system is designed to analyze medical images of the eye to identify signs of eye diseases and conditions.",
        techStack: ["Python", "CNN", "Jupyter Notebook"],
        link: "https://github.com/Hiteshydv001/Blindness-detection-codeclause",
        category: "machine-learning",
        featured: false,
        highlights: ["Medical Imaging", "Disease Detection"],
        keyFeatures: ["Retinal Image Analysis", "CNN Model"],
        implementation: ["Trained CNN model", "Processed medical images"],
        challenges: ["Data imbalance", "Image preprocessing"],
        learnings: ["Medical image analysis", "Deep learning for healthcare"],
        futureWork: ["Improve accuracy", "Deploy as web app"],
        images: [{ src: "/placeholder.png", alt: "Blindness-detection-codeclause" }]
    },
    {
        title: "Blockchain-chatbot",
        description: "Chatbot that logs messages immutably on the Ethereum blockchain.",
        longDescription: "A chatbot that integrates Blockchain (Ethereum, Solidity) and AI (Gemini LLM) to log chat messages immutably on the blockchain while generating AI-powered responses.",
        techStack: ["Python", "Solidity", "Ethereum", "Gemini LLM", "Ganache"],
        link: "https://github.com/Hiteshydv001/Blockchain-chatbot",
        category: "blockchain",
        featured: false,
        highlights: ["Immutable Logging", "AI Integration", "Smart Contracts"],
        keyFeatures: ["AI Chatbot", "Ethereum Logging", "Solidity Smart Contract"],
        implementation: ["Wrote smart contract", "Integrated AI with blockchain"],
        challenges: ["Gas optimization", "Blockchain latency"],
        learnings: ["DApp development", "Smart contract security"],
        futureWork: ["Deploy to testnet", "Add frontend"],
        images: [{ src: "/placeholder.png", alt: "Blockchain-chatbot" }]
    },
    {
        title: "Botanica",
        description: "Static web application for plant enthusiasts to collect and track plants.",
        longDescription: "Static web application for plant enthusiasts to collect, organize, and track their plant journey. No backend — everything runs in your browser!",
        techStack: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Hiteshydv001/Botanica",
        category: "web-dev",
        featured: false,
        highlights: ["Plant Collection", "Local Storage"],
        keyFeatures: ["Image Upload", "Care Calendar", "Dark Mode"],
        implementation: ["Built with vanilla JS", "Used LocalStorage"],
        challenges: ["Client-side data persistence"],
        learnings: ["DOM manipulation", "Browser APIs"],
        futureWork: ["Cloud sync", "Plant identification AI"],
        images: [{ src: "/placeholder.png", alt: "Botanica" }]
    },
    {
        title: "chartopia-analytica",
        description: "Data visualization project.",
        longDescription: "A data visualization project built with React and Lovable.",
        techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        link: "https://github.com/Hiteshydv001/chartopia-analytica",
        live: "https://lovable.dev/projects/aa8f0106-454d-42fb-a40c-a62a5a3e2e48",
        category: "web-dev",
        featured: false,
        highlights: ["Data Visualization", "Modern UI"],
        keyFeatures: ["Interactive Charts", "Responsive Design"],
        implementation: ["Built with React", "Styled with Tailwind"],
        challenges: ["Data binding"],
        learnings: ["Chart libraries"],
        futureWork: ["Add more chart types"],
        images: [{ src: "/placeholder.png", alt: "chartopia-analytica" }]
    },
    {
        title: "CodeClock",
        description: "VS Code extension to track and analyze coding time.",
        longDescription: "Code Time Tracker – a sleek, lightweight, and powerful VS Code extension designed to help you track and analyze your coding time effortlessly.",
        techStack: ["VS Code API", "TypeScript"],
        link: "https://github.com/Hiteshydv001/CodeClock",
        category: "utilities",
        featured: false,
        highlights: ["Time Tracking", "VS Code Extension"],
        keyFeatures: ["Real-Time Tracking", "Visual Analytics", "Status Bar Clock"],
        implementation: ["Developed extension", "Integrated charts"],
        challenges: ["VS Code API limitations", "Data persistence"],
        learnings: ["Extension development", "Webviews in VS Code"],
        futureWork: ["Project-based tracking", "Cloud sync"],
        images: [{ src: "/placeholder.png", alt: "CodeClock" }]
    },
    {
        title: "content-based-movie-recommender",
        description: "Recommends movies similar to the ones a user has liked.",
        longDescription: "The Content-Based Movie Recommendation System is a machine learning model that recommends movies to users based on the similarity of movies they have liked or interacted with in the past.",
        techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
        link: "https://github.com/Hiteshydv001/content-based-movie-recommender",
        live: "https://content-based-movie-recommend.streamlit.app/",
        category: "machine-learning",
        featured: false,
        highlights: ["Content-Based Filtering", "Movie Recommendations"],
        keyFeatures: ["Similarity Calculation", "Streamlit Interface"],
        implementation: ["Built recommendation engine", "Created web app"],
        challenges: ["Feature extraction", "Scalability"],
        learnings: ["Recommendation systems", "NLP for content analysis"],
        futureWork: ["Hybrid filtering", "User accounts"],
        images: [{ src: "/placeholder.png", alt: "content-based-movie-recommender" }]
    },
    {
        title: "crosstl",
        description: "Translates native shader languages into CrossGL universal shader language.",
        longDescription: "The CrossTL is a core component of our platform, enabling the conversion of CrossGL shader code directly into various graphics APIs, such as DirectX, Metal, Vulkan, and OpenGL and vice-versa.",
        techStack: ["Python", "GLSL", "HLSL", "Metal"],
        link: "https://github.com/Hiteshydv001/crosstl",
        category: "utilities",
        featured: false,
        highlights: ["Shader Translation", "Cross-Platform Graphics"],
        keyFeatures: ["Universal Shader Language", "Multi-Backend Support"],
        implementation: ["Built parser and generator", "Implemented optimization passes"],
        challenges: ["Shader language differences", "Performance optimization"],
        learnings: ["Compiler design", "Graphics programming"],
        futureWork: ["Support more backends", "WebGPU support"],
        images: [{ src: "/placeholder.png", alt: "crosstl" }]
    },
    {
        title: "CU-chat",
        description: "RAG based chatbot for Chandigarh University.",
        longDescription: "AI Chatbot for Chandigarh University using RAG technology.",
        techStack: ["Python", "RAG"],
        link: "https://github.com/Hiteshydv001/CU-chat",
        category: "ai-fullstack",
        featured: false,
        highlights: ["University Chatbot", "RAG"],
        keyFeatures: ["Information Retrieval", "Student Support"],
        implementation: ["Implemented RAG", "Built chatbot interface"],
        challenges: ["Data accuracy"],
        learnings: ["RAG for education"],
        futureWork: ["Expand knowledge base"],
        images: [{ src: "/placeholder.png", alt: "CU-chat" }]
    },
    {
        title: "daytona",
        description: "The Open Source Dev Environment Manager.",
        longDescription: "Daytona is a radically simple open source development environment manager. Set up a development environment on any infrastructure, with a single command.",
        techStack: ["Go", "Docker"],
        link: "https://github.com/Hiteshydv001/daytona",
        category: "utilities",
        featured: false,
        highlights: ["Dev Environment Management", "Open Source"],
        keyFeatures: ["Single Command Setup", "Multi-Provider Support"],
        implementation: ["Contributed to core logic", "Improved CLI"],
        challenges: ["Cross-platform compatibility"],
        learnings: ["Go programming", "Container orchestration"],
        futureWork: ["Add more providers"],
        images: [{ src: "/placeholder.png", alt: "daytona" }]
    },
    {
        title: "DeepChartAI",
        description: "AI-Powered Chart Builder.",
        longDescription: "An advanced AI-powered data visualization tool. Upload or input data and let AI suggest the best chart type.",
        techStack: ["Python", "React", "Plotly", "LLM"],
        link: "https://github.com/Hiteshydv001/DeepChartAI",
        category: "ai-fullstack",
        featured: false,
        highlights: ["AI Chart Generation", "Data Visualization"],
        keyFeatures: ["Auto-Chart Suggestion", "Interactive Graphs"],
        implementation: ["Integrated LLM for data analysis", "Built React frontend"],
        challenges: ["Data format handling", "LLM prompt engineering"],
        learnings: ["AI-driven visualization", "Full-stack integration"],
        futureWork: ["Support more data sources", "Advanced analytics"],
        images: [{ src: "/placeholder.png", alt: "DeepChartAI" }]
    },
    {
        title: "DevDisplay",
        description: "Global open source community platform for tech needs.",
        longDescription: "DevDisplay is a global open source community platform that brings together all your tech needs in one place. Showcase your skills, connect globally, collaborate, build and promote.",
        techStack: ["React", "Open Source"],
        link: "https://github.com/Hiteshydv001/DevDisplay",
        live: "https://www.devdisplay.org/",
        category: "web-dev",
        featured: false,
        highlights: ["Community Platform", "Tech Hub"],
        keyFeatures: ["Project Showcase", "Global Connection"],
        implementation: ["Built community features", "Designed platform"],
        challenges: ["Community engagement", "Platform scalability"],
        learnings: ["Community building", "Open source management"],
        futureWork: ["Add job board", "Mentorship program"],
        images: [{ src: "/placeholder.png", alt: "DevDisplay" }]
    },
    {
        title: "Docs-Agentic-AI",
        description: "RAG pipeline with FastAPI backend and static frontend.",
        longDescription: "The project couples a FastAPI backend, LangChain-powered Retrieval-Augmented Generation (RAG) pipeline, and a lightweight static frontend that streams answers with cited snippets.",
        techStack: ["FastAPI", "LangChain", "ChromaDB", "Ollama"],
        link: "https://github.com/Hiteshydv001/Docs-Agentic-AI",
        category: "ai-fullstack",
        featured: false,
        highlights: ["RAG Pipeline", "Streaming Responses"],
        keyFeatures: ["Multi-format ingestion", "Local LLM support"],
        implementation: ["Built FastAPI backend", "Implemented RAG"],
        challenges: ["Streaming SSE", "Document parsing"],
        learnings: ["FastAPI streaming", "LangChain advanced usage"],
        futureWork: ["Add user auth", "Cloud deployment"],
        images: [{ src: "/placeholder.png", alt: "Docs-Agentic-AI" }]
    },
    {
        title: "Elavia-OCR",
        description: "Professional-grade OCR and document processing platform.",
        longDescription: "Evalvia.Ai — A professional-grade OCR and document processing platform designed for automated exam paper and answer sheet extraction, parsing, and result management.",
        techStack: ["FastAPI", "MongoDB", "Gemini API", "Tesseract"],
        link: "https://github.com/Hiteshydv001/Elavia-OCR",
        category: "ai-fullstack",
        featured: false,
        highlights: ["OCR Platform", "Document Processing"],
        keyFeatures: ["Multi-engine OCR", "Smart Parsing"],
        implementation: ["Integrated multiple OCR engines", "Built processing pipeline"],
        challenges: ["Handwriting recognition", "Format standardization"],
        learnings: ["OCR technologies", "Document parsing strategies"],
        futureWork: ["Add more OCR engines", "Mobile app"],
        images: [{ src: "/placeholder.png", alt: "Elavia-OCR" }]
    },
    {
        title: "face-Recognition-system",
        description: "Face Authentication system with macOS-inspired UI.",
        longDescription: "Face Authentication system: This project combines advanced face recognition technology with an elegant macOS-inspired user interface. It provides secure authentication through facial recognition.",
        techStack: ["FastAPI", "React", "InsightFace", "PostgreSQL"],
        link: "https://github.com/Hiteshydv001/face-Recognition-system",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Face Authentication", "Modern UI"],
        keyFeatures: ["Real-time Recognition", "Secure Login"],
        implementation: ["Implemented InsightFace", "Designed macOS-style UI"],
        challenges: ["Real-time performance", "Security best practices"],
        learnings: ["Biometric authentication", "UI/UX design"],
        futureWork: ["Liveness detection", "Mobile integration"],
        images: [{ src: "/placeholder.png", alt: "face-Recognition-system" }]
    },
    {
        title: "fastapi_mcp",
        description: "Expose FastAPI endpoints as Model Context Protocol (MCP) tools.",
        longDescription: "A zero-configuration tool for automatically exposing FastAPI endpoints as Model Context Protocol (MCP) tools.",
        techStack: ["Python", "FastAPI", "MCP"],
        link: "https://github.com/Hiteshydv001/fastapi_mcp",
        category: "utilities",
        featured: false,
        highlights: ["MCP Integration", "FastAPI Tooling"],
        keyFeatures: ["Zero Configuration", "Automatic Discovery"],
        implementation: ["Built MCP wrapper", "Implemented auto-discovery"],
        challenges: ["Protocol compliance", "Type inference"],
        learnings: ["Model Context Protocol", "Metaprogramming"],
        futureWork: ["Support more frameworks", "Add authentication"],
        images: [{ src: "/placeholder.png", alt: "fastapi_mcp" }]
    },
    {
        title: "Financial-Analysis-ML",
        description: "Financial analysis system with ML-powered insights.",
        longDescription: "This project fetches financial data, performs machine learning operations to generate insights, and stores results in a MySQL database. Real-time analysis is displayed both in the terminal and via a modern web application.",
        techStack: ["Python", "React", "MySQL", "Pandas"],
        link: "https://github.com/Hiteshydv001/Financial-Analysis-ML",
        live: "https://bluemutualfund.in/server/api/company.php",
        category: "machine-learning",
        featured: false,
        highlights: ["Financial Analysis", "ML Insights"],
        keyFeatures: ["Growth Analysis", "Priority Scoring"],
        implementation: ["Built ML engine", "Developed web dashboard"],
        challenges: ["Data accuracy", "Real-time processing"],
        learnings: ["Financial modeling", "Full-stack ML integration"],
        futureWork: ["Add more metrics", "Predictive modeling"],
        images: [{ src: "/placeholder.png", alt: "Financial-Analysis-ML" }]
    },
    {
        title: "google-account-create",
        description: "Automates Google account creation using Selenium.",
        longDescription: "This project automates the process of creating a Google account using Python and Selenium. It includes fetching a one-time password (OTP) through an API.",
        techStack: ["Python", "Selenium"],
        link: "https://github.com/Hiteshydv001/google-account-create",
        category: "utilities",
        featured: false,
        highlights: ["Automation", "Selenium"],
        keyFeatures: ["OTP Fetching", "Form Automation"],
        implementation: ["Wrote Selenium scripts", "Integrated OTP API"],
        challenges: ["Bot detection", "Dynamic elements"],
        learnings: ["Browser automation", "Anti-bot evasion"],
        futureWork: ["Support more browsers", "Headless mode"],
        images: [{ src: "/placeholder.png", alt: "google-account-create" }]
    },
    {
        title: "Guard-AI",
        description: "AI-powered proctoring system for secure assessments.",
        longDescription: "Guard-AI Proctor: Secure. Reliable. Smart. Transforming remote proctoring with AI! Features AI Monitoring to detect and flag suspicious activity.",
        techStack: ["Python", "FastAPI", "Computer Vision", "AI"],
        link: "https://github.com/Hiteshydv001/Guard-AI-Designing-Remote-Proctoring-System",
        live: "https://guard-ai-proctor.vercel.app/",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Remote Proctoring", "AI Monitoring"],
        keyFeatures: ["Suspicious Activity Detection", "Advanced Reports"],
        implementation: ["Implemented vision models", "Built proctoring dashboard"],
        challenges: ["Privacy concerns", "Real-time analysis"],
        learnings: ["Computer vision for security", "Ethical AI"],
        futureWork: ["Enhanced behavioral analysis", "Mobile support"],
        images: [{ src: "/placeholder.png", alt: "Guard-AI" }]
    },
    {
        title: "bajaj_test",
        description: "Full stack test API project.",
        longDescription: "A lightweight API test project for validating full-stack workflows.",
        techStack: ["API", "JavaScript"],
        link: "https://github.com/Hiteshydv001/bajaj_test",
        category: "utilities",
        featured: false,
        highlights: ["API Testing"],
        keyFeatures: ["Simple API validation", "Minimal setup"],
        images: [{ src: "/placeholder.png", alt: "bajaj_test" }]
    },
    {
        title: "Hiteshydv001",
        description: "GitHub profile configuration repository.",
        longDescription: "Configuration files and assets for the GitHub profile README.",
        techStack: ["Markdown"],
        link: "https://github.com/Hiteshydv001/Hiteshydv001",
        category: "utilities",
        featured: false,
        highlights: ["Profile README"],
        keyFeatures: ["Profile layout", "Badge and media assets"],
        images: [{ src: "/placeholder.png", alt: "Hiteshydv001" }]
    },
    {
        title: "Hiteshydv002",
        description: "Personal repo that tracks GitHub statistics.",
        longDescription: "A personal repository that calculates repositories, commits, stars, followers, and lines of code contributed.",
        techStack: ["GitHub", "Automation"],
        link: "https://github.com/Hiteshydv001/Hiteshydv002",
        category: "utilities",
        featured: false,
        highlights: ["GitHub Stats"],
        keyFeatures: ["Automated metrics", "Profile insights"],
        images: [{ src: "/placeholder.png", alt: "Hiteshydv002" }]
    },
    {
        title: "Image-Generation-using-Stable-Diffusion-ComfyUI",
        description: "AI image generation project using Stable Diffusion and ComfyUI.",
        longDescription: "Explores text-to-image and image-to-image generation using Stable Diffusion with ComfyUI workflows.",
        techStack: ["Python", "Stable Diffusion", "ComfyUI", "Gradio"],
        link: "https://github.com/Hiteshydv001/Image-Generation-using-Stable-Diffusion-ComfyUI",
        category: "machine-learning",
        featured: false,
        highlights: ["Stable Diffusion"],
        keyFeatures: ["Text to image", "Workflow automation"],
        images: [{ src: "/placeholder.png", alt: "Image Generation using Stable Diffusion ComfyUI" }]
    },
    {
        title: "Image-to-pdf",
        description: "Flask app to convert multiple images into a PDF.",
        longDescription: "A simple web application that lets users upload images and export them as a single PDF.",
        techStack: ["Python", "Flask", "ReportLab", "Pillow"],
        link: "https://github.com/Hiteshydv001/Image-to-pdf",
        category: "utilities",
        featured: false,
        highlights: ["Image to PDF"],
        keyFeatures: ["Multi-image upload", "PDF export"],
        images: [{ src: "/placeholder.png", alt: "Image-to-pdf" }]
    },
    {
        title: "Instagram-clone",
        description: "Static Instagram clone built with HTML and CSS.",
        longDescription: "A static website that recreates the Instagram UI using basic web technologies.",
        techStack: ["HTML", "CSS"],
        link: "https://github.com/Hiteshydv001/Instagram-clone",
        category: "web-dev",
        featured: false,
        highlights: ["Static UI"],
        keyFeatures: ["Instagram layout", "Responsive styling"],
        images: [{ src: "/placeholder.png", alt: "Instagram-clone" }]
    },
    {
        title: "iris_classification",
        description: "Iris flower classification using machine learning.",
        longDescription: "A classic ML project that trains a classifier on the Iris dataset to predict species.",
        techStack: ["Python", "Scikit-learn", "Jupyter"],
        link: "https://github.com/Hiteshydv001/iris_classification",
        category: "machine-learning",
        featured: false,
        highlights: ["ML Classification"],
        keyFeatures: ["Iris dataset", "Model evaluation"],
        images: [{ src: "/placeholder.png", alt: "iris_classification" }]
    },
    {
        title: "Kidney-disease-detection",
        description: "End-to-end ML project for kidney disease detection.",
        longDescription: "Machine learning pipeline to detect kidney disease from clinical data.",
        techStack: ["Python", "Machine Learning"],
        link: "https://github.com/Hiteshydv001/Kidney-disease-detection",
        category: "machine-learning",
        featured: false,
        highlights: ["Healthcare ML"],
        keyFeatures: ["Data preprocessing", "Disease prediction"],
        images: [{ src: "/placeholder.png", alt: "Kidney-disease-detection" }]
    },
    {
        title: "legal-drafter-llm",
        description: "Legal document generation engine powered by Gemini with RAG.",
        longDescription: "Production-grade legal document drafting system with FastAPI backend and React frontend.",
        techStack: ["Python", "FastAPI", "React", "LangChain", "Gemini"],
        link: "https://github.com/Hiteshydv001/legal-drafter-llm",
        category: "ai-fullstack",
        featured: false,
        highlights: ["RAG", "Document Generation"],
        keyFeatures: ["DOCX and PDF output", "RAG grounded drafts"],
        images: [{ src: "/placeholder.png", alt: "legal-drafter-llm" }]
    },
    {
        title: "Manual-Design-Command-Center",
        description: "Manual design toolkit with AI-assisted backgrounds.",
        longDescription: "Client-side toolkit for handcrafted quote posters and moodboards with Gemini Nano enhancements.",
        techStack: ["React", "TypeScript", "Vite"],
        link: "https://github.com/Hiteshydv001/Manual-Design-Command-Center",
        category: "web-dev",
        featured: false,
        highlights: ["Design Toolkit"],
        keyFeatures: ["Quote poster builder", "Moodboard builder"],
        images: [{ src: "/placeholder.png", alt: "Manual-Design-Command-Center" }]
    },
    {
        title: "Mask-detection-codeclause",
        description: "Mask detection using machine learning and computer vision.",
        longDescription: "Detects whether a person is wearing a mask using ML and CV pipelines.",
        techStack: ["Python", "OpenCV", "CNN"],
        link: "https://github.com/Hiteshydv001/Mask-detection-codeclause",
        category: "machine-learning",
        featured: false,
        highlights: ["Computer Vision"],
        keyFeatures: ["Mask detection", "Dataset preprocessing"],
        images: [{ src: "/placeholder.png", alt: "Mask-detection-codeclause" }]
    },
    {
        title: "MCP-email-fetch",
        description: "MCP server for email fetch, ranking, and summarization.",
        longDescription: "Email assistant that fetches Gmail, summarizes content, ranks messages, and exposes MCP tools.",
        techStack: ["Python", "FastAPI", "MCP", "MongoDB"],
        link: "https://github.com/Hiteshydv001/MCP-email-fetch",
        category: "ai-fullstack",
        featured: false,
        highlights: ["MCP", "Email AI"],
        keyFeatures: ["Email summarization", "Vector search"],
        images: [{ src: "/placeholder.png", alt: "MCP-email-fetch" }]
    },
    {
        title: "medical_chatbot",
        description: "Medical chatbot project.",
        longDescription: "A chatbot project focused on medical Q and A experiences.",
        techStack: ["Python", "Chatbot"],
        link: "https://github.com/Hiteshydv001/medical_chatbot",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Healthcare Chat"],
        keyFeatures: ["Medical Q and A", "Conversational flow"],
        images: [{ src: "/placeholder.png", alt: "medical_chatbot" }]
    },
    {
        title: "Mowito-Robotics-Challenge",
        description: "Robotics math challenge: rotations and forward kinematics.",
        longDescription: "Implements Euler and quaternion conversion plus forward kinematics using DH parameters.",
        techStack: ["Python", "NumPy", "Matplotlib"],
        link: "https://github.com/Hiteshydv001/Mowito-Robotics-Challenge",
        category: "machine-learning",
        featured: false,
        highlights: ["Robotics"],
        keyFeatures: ["Rotation conversion", "FK visualization"],
        images: [{ src: "/placeholder.png", alt: "Mowito-Robotics-Challenge" }]
    },
    {
        title: "Multi-Feature-AI-Assistant",
        description: "Full-stack AI assistant with Q and A, summarizer, and expense tracker.",
        longDescription: "A full-stack application featuring multiple AI tools built with React and Flask.",
        techStack: ["React", "TypeScript", "Flask", "Gemini"],
        link: "https://github.com/Hiteshydv001/Multi-Feature-AI-Assistant",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Multi-Tool AI"],
        keyFeatures: ["Q and A bot", "Text summarizer"],
        images: [{ src: "/placeholder.png", alt: "Multi-Feature-AI-Assistant" }]
    },
    {
        title: "music_recommendation_system",
        description: "Streamlit app that recommends music based on favorites.",
        longDescription: "Music recommendation system that uses Spotify metadata and similarity modeling.",
        techStack: ["Python", "Streamlit", "Pandas"],
        link: "https://github.com/Hiteshydv001/music_recommendation_system",
        category: "machine-learning",
        featured: false,
        highlights: ["Recommendations"],
        keyFeatures: ["Song similarity", "Spotify metadata"],
        images: [{ src: "/placeholder.png", alt: "music_recommendation_system" }]
    },
    {
        title: "My-OS",
        description: "Experimental project for building a basic OS.",
        longDescription: "An experimental repository exploring operating system fundamentals.",
        techStack: ["Systems"],
        link: "https://github.com/Hiteshydv001/My-OS",
        category: "utilities",
        featured: false,
        highlights: ["Systems"],
        keyFeatures: ["OS fundamentals", "Low-level exploration"],
        images: [{ src: "/placeholder.png", alt: "My-OS" }]
    },
    {
        title: "My-Portfolio",
        description: "Android portfolio app built with Kotlin.",
        longDescription: "Android portfolio application built with Kotlin.",
        techStack: ["Kotlin", "Android"],
        link: "https://github.com/Hiteshydv001/My-Portfolio",
        category: "utilities",
        featured: false,
        highlights: ["Android"],
        keyFeatures: ["Portfolio screens", "Mobile UI"],
        images: [{ src: "/placeholder.png", alt: "My-Portfolio" }]
    },
    {
        title: "my-sql-MCP",
        description: "MCP server for Microsoft SQL Server.",
        longDescription: "Enhanced MSSQL MCP server exposing schemas, tables, and stored procedures to AI agents.",
        techStack: ["Python", "MCP", "SQL Server"],
        link: "https://github.com/Hiteshydv001/my-sql-MCP",
        category: "utilities",
        featured: false,
        highlights: ["MCP", "Database Tools"],
        keyFeatures: ["Schema discovery", "Read-only queries"],
        images: [{ src: "/placeholder.png", alt: "my-sql-MCP" }]
    },
    {
        title: "outlook_mail_fetch",
        description: "Automates Outlook mail fetch with Twilio alerts.",
        longDescription: "Selenium automation that checks Outlook mail and triggers a Twilio call notification.",
        techStack: ["Python", "Selenium", "Twilio"],
        link: "https://github.com/Hiteshydv001/outlook_mail_fetch",
        category: "utilities",
        featured: false,
        highlights: ["Automation"],
        keyFeatures: ["Email polling", "Call notifications"],
        images: [{ src: "/placeholder.png", alt: "outlook_mail_fetch" }]
    },
    {
        title: "Personality-Prediction-System-via-CV-Analysis-codeclause",
        description: "Personality prediction via resume analysis.",
        longDescription: "ML project to infer personality traits from CV data using NLP techniques.",
        techStack: ["Python", "NLP", "Machine Learning"],
        link: "https://github.com/Hiteshydv001/Personality-Prediction-System-via-CV-Analysis-codeclause",
        category: "machine-learning",
        featured: false,
        highlights: ["NLP"],
        keyFeatures: ["Resume parsing", "Trait prediction"],
        images: [{ src: "/placeholder.png", alt: "Personality-Prediction-System-via-CV-Analysis-codeclause" }]
    },
    {
        title: "Pink_sweat",
        description: "AI-based proctoring system for a hackathon.",
        longDescription: "Proctoring system developed for the SkillMingle hackathon.",
        techStack: ["Python", "Computer Vision"],
        link: "https://github.com/Hiteshydv001/Pink_sweat",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Remote Proctoring"],
        keyFeatures: ["Monitoring workflow", "Assessment integrity"],
        images: [{ src: "/placeholder.png", alt: "Pink_sweat" }]
    },
    {
        title: "portfolio-new-ui",
        description: "Portfolio UI built with Vite and Chakra UI.",
        longDescription: "Modern portfolio interface using Chakra UI and Vite tooling.",
        techStack: ["React", "TypeScript", "Chakra UI"],
        link: "https://github.com/Hiteshydv001/portfolio-new-ui",
        category: "web-dev",
        featured: false,
        highlights: ["UI Refresh"],
        keyFeatures: ["Chakra UI components", "Responsive layout"],
        images: [{ src: "/placeholder.png", alt: "portfolio-new-ui" }]
    },
    {
        title: "Portfolio-UI",
        description: "Portfolio website UI project.",
        longDescription: "A portfolio UI repository for experimenting with layout and styling.",
        techStack: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Hiteshydv001/Portfolio-UI",
        category: "web-dev",
        featured: false,
        highlights: ["Portfolio UI"],
        keyFeatures: ["Responsive layout", "UI sections"],
        images: [{ src: "/placeholder.png", alt: "Portfolio-UI" }]
    },
    {
        title: "portfolio.hitesh.aiml",
        description: "Portfolio website repository.",
        longDescription: "Portfolio website project repository.",
        techStack: ["Web"],
        link: "https://github.com/Hiteshydv001/portfolio.hitesh.aiml",
        category: "web-dev",
        featured: false,
        highlights: ["Portfolio"],
        keyFeatures: ["Personal branding", "Web presence"],
        images: [{ src: "/placeholder.png", alt: "portfolio.hitesh.aiml" }]
    },
    {
        title: "Price_predict_House",
        description: "House price prediction using ML.",
        longDescription: "ML pipeline to predict house prices from Kaggle data.",
        techStack: ["Python", "Scikit-learn"],
        link: "https://github.com/Hiteshydv001/Price_predict_House",
        category: "machine-learning",
        featured: false,
        highlights: ["Price Prediction"],
        keyFeatures: ["Feature engineering", "Model evaluation"],
        images: [{ src: "/placeholder.png", alt: "Price_predict_House" }]
    },
    {
        title: "productive",
        description: "Productivity utility project.",
        longDescription: "A utility repository focused on productivity tooling.",
        techStack: ["Utilities"],
        link: "https://github.com/Hiteshydv001/productive",
        category: "utilities",
        featured: false,
        highlights: ["Utility"],
        keyFeatures: ["Lightweight tooling", "Simple setup"],
        images: [{ src: "/placeholder.png", alt: "productive" }]
    },
    {
        title: "ProductizeTech-Assignment",
        description: "CV alignment, visual diffing, and LLM-backed document automation.",
        longDescription: "Three-task assignment covering image alignment, change detection, and LLM document automation with FastAPI.",
        techStack: ["Python", "FastAPI", "OpenCV", "LangChain"],
        link: "https://github.com/Hiteshydv001/ProductizeTech-Assignment",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Computer Vision"],
        keyFeatures: ["Image alignment", "LLM document pipeline"],
        images: [{ src: "/placeholder.png", alt: "ProductizeTech-Assignment" }]
    },
    {
        title: "Projects-simplified-Portfolio",
        description: "Minimal portfolio, blog, and learning documentation site.",
        longDescription: "Modern portfolio site built with Next.js, Tailwind CSS, and TypeScript.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/Hiteshydv001/Projects-simplified-Portfolio",
        category: "web-dev",
        featured: false,
        highlights: ["Portfolio"],
        keyFeatures: ["MDX content", "Responsive design"],
        images: [{ src: "/placeholder.png", alt: "Projects-simplified-Portfolio" }]
    },
    {
        title: "Property-Prices",
        description: "Automated data cleaning pipeline for Delhi real estate datasets.",
        longDescription: "Data processing pipeline that cleans and enriches multiple CSVs into an analysis-ready dataset.",
        techStack: ["Python", "Pandas", "NumPy"],
        link: "https://github.com/Hiteshydv001/Property-Prices",
        category: "machine-learning",
        featured: false,
        highlights: ["Data Cleaning"],
        keyFeatures: ["Feature engineering", "CSV consolidation"],
        images: [{ src: "/placeholder.png", alt: "Property-Prices" }]
    },
    {
        title: "qr-code-generator",
        description: "QR code generator project.",
        longDescription: "Simple QR code generator utility.",
        techStack: ["JavaScript"],
        link: "https://github.com/Hiteshydv001/qr-code-generator",
        category: "utilities",
        featured: false,
        highlights: ["QR Codes"],
        keyFeatures: ["QR generation", "Lightweight UI"],
        images: [{ src: "/placeholder.png", alt: "qr-code-generator" }]
    },
    {
        title: "RAG_Youtube_extractor",
        description: "RAG system using Gemini and YouTube API.",
        longDescription: "Retrieval-augmented generation system that extracts and summarizes YouTube content.",
        techStack: ["Python", "Gemini", "YouTube API"],
        link: "https://github.com/Hiteshydv001/RAG_Youtube_extractor",
        category: "ai-fullstack",
        featured: false,
        highlights: ["RAG", "YouTube"],
        keyFeatures: ["Video extraction", "Contextual QA"],
        images: [{ src: "/placeholder.png", alt: "RAG_Youtube_extractor" }]
    },
    {
        title: "rock_mine_prediction",
        description: "Rock or mine prediction using sonar data.",
        longDescription: "Logistic regression model deployed via Streamlit to classify sonar signals.",
        techStack: ["Python", "Scikit-learn", "Streamlit"],
        link: "https://github.com/Hiteshydv001/rock_mine_prediction",
        category: "machine-learning",
        featured: false,
        highlights: ["Binary Classification"],
        keyFeatures: ["Sonar dataset", "Streamlit demo"],
        images: [{ src: "/placeholder.png", alt: "rock_mine_prediction" }]
    },
    {
        title: "sam2-refine-video-tracking",
        description: "SAM2-based video segmentation and tracking system.",
        longDescription: "Video segmentation pipeline with occlusion recovery and quality gating.",
        techStack: ["Python", "OpenCV", "NumPy"],
        link: "https://github.com/Hiteshydv001/sam2-refine-video-tracking",
        category: "machine-learning",
        featured: false,
        highlights: ["Video Segmentation"],
        keyFeatures: ["Occlusion recovery", "Quality gating"],
        images: [{ src: "/placeholder.png", alt: "sam2-refine-video-tracking" }]
    },
    {
        title: "Spam-Classifier-using-Machine-codeclause-learning",
        description: "Spam classifier using machine learning.",
        longDescription: "Text classification pipeline for spam detection with classic ML techniques.",
        techStack: ["Python", "NLP", "Scikit-learn"],
        link: "https://github.com/Hiteshydv001/Spam-Classifier-using-Machine-codeclause-learning",
        category: "machine-learning",
        featured: false,
        highlights: ["NLP"],
        keyFeatures: ["Text cleaning", "Spam detection"],
        images: [{ src: "/placeholder.png", alt: "Spam-Classifier-using-Machine-codeclause-learning" }]
    },
    {
        title: "Stable-Diffusion-v1.5-VRAM-Estimator",
        description: "Analytical VRAM estimator for Stable Diffusion v1.5 inference.",
        longDescription: "FastAPI backend and static frontend that estimate peak GPU memory for SD v1.5.",
        techStack: ["Python", "FastAPI", "JavaScript"],
        link: "https://github.com/Hiteshydv001/Stable-Diffusion-v1.5-VRAM-Estimator",
        category: "utilities",
        featured: false,
        highlights: ["GPU Estimation"],
        keyFeatures: ["VRAM calculator", "API endpoints"],
        images: [{ src: "/placeholder.png", alt: "Stable-Diffusion-v1.5-VRAM-Estimator" }]
    },
    {
        title: "summarize",
        description: "Summarize web pages.",
        longDescription: "Lightweight summarization utility for web content.",
        techStack: ["Python"],
        link: "https://github.com/Hiteshydv001/summarize",
        category: "utilities",
        featured: false,
        highlights: ["Summarization"],
        keyFeatures: ["Web page summaries", "Simple usage"],
        images: [{ src: "/placeholder.png", alt: "summarize" }]
    },
    {
        title: "Sweet-Shop-Management-System",
        description: "Full-stack app for sweet shop inventory, orders, and analytics.",
        longDescription: "FastAPI backend and React frontend for managing a sweet shop with admin dashboards.",
        techStack: ["FastAPI", "MongoDB", "React", "TypeScript"],
        link: "https://github.com/Hiteshydv001/Sweet-Shop-Management-System",
        category: "web-dev",
        featured: false,
        highlights: ["Full Stack"],
        keyFeatures: ["Inventory management", "Analytics dashboard"],
        images: [{ src: "/placeholder.png", alt: "Sweet-Shop-Management-System" }]
    },
    {
        title: "Text-to-music-ai",
        description: "Text to music generation using PyTorch and MusicGen.",
        longDescription: "AI system that turns text prompts into music compositions using MusicGen.",
        techStack: ["Python", "PyTorch", "Gradio"],
        link: "https://github.com/Hiteshydv001/Text-to-music-ai",
        category: "machine-learning",
        featured: false,
        highlights: ["Music Generation"],
        keyFeatures: ["Text to audio", "Gradio UI"],
        images: [{ src: "/placeholder.png", alt: "Text-to-music-ai" }]
    },
    {
        title: "think_blue_data",
        description: "Dataset annotation for urban planning model development.",
        longDescription: "Annotated building topology and passive feature datasets for urban planning ML models.",
        techStack: ["Data Annotation"],
        link: "https://github.com/Hiteshydv001/think_blue_data",
        category: "machine-learning",
        featured: false,
        highlights: ["Dataset Annotation"],
        keyFeatures: ["Building topology labels", "Passive feature annotation"],
        images: [{ src: "/placeholder.png", alt: "think_blue_data" }]
    },
    {
        title: "Trading-Bot-Internship-Assignment",
        description: "Full-stack crypto trading bot dashboard with FastAPI and Next.js.",
        longDescription: "Trading bot dashboard that connects to Binance Futures Testnet with real-time WebSocket updates.",
        techStack: ["FastAPI", "Next.js", "TypeScript", "WebSockets"],
        link: "https://github.com/Hiteshydv001/Trading-Bot-Internship-Assignment",
        category: "ai-fullstack",
        featured: false,
        highlights: ["Trading Dashboard"],
        keyFeatures: ["Live market data", "Strategy management"],
        images: [{ src: "/placeholder.png", alt: "Trading-Bot-Internship-Assignment" }]
    },
    {
        title: "Tricolorify",
        description: "Independence Day web app for tricolor profile pictures and a game.",
        longDescription: "Patriotic web application with tricolor profile picture generator and a mini-game.",
        techStack: ["Next.js", "Flask", "OpenCV"],
        link: "https://github.com/Hiteshydv001/Tricolorify",
        category: "web-dev",
        featured: false,
        highlights: ["Image Processing"],
        keyFeatures: ["Profile overlay", "Catch-the-tricolor game"],
        images: [{ src: "/placeholder.png", alt: "Tricolorify" }]
    },
    {
        title: "Waste-classification-model-cnn",
        description: "CNN-based waste classification app.",
        longDescription: "Streamlit application that classifies waste into organic or inorganic categories.",
        techStack: ["Python", "TensorFlow", "Streamlit"],
        link: "https://github.com/Hiteshydv001/Waste-classification-model-cnn",
        category: "machine-learning",
        featured: false,
        highlights: ["Sustainability"],
        keyFeatures: ["Image upload", "Real-time prediction"],
        images: [{ src: "/placeholder.png", alt: "Waste-classification-model-cnn" }]
    },
    {
        title: "Weather-Trend-Forecasting",
        description: "Global temperature forecasting pipeline with FastAPI service.",
        longDescription: "Production-grade ML pipeline forecasting global temperature with ensemble models and an API.",
        techStack: ["Python", "FastAPI", "XGBoost", "Scikit-learn"],
        link: "https://github.com/Hiteshydv001/Weather-Trend-Forecasting",
        category: "machine-learning",
        featured: false,
        highlights: ["Forecasting"],
        keyFeatures: ["Ensemble modeling", "Prediction API"],
        images: [{ src: "/placeholder.png", alt: "Weather-Trend-Forecasting" }]
    },
    {
        title: "WebRTc-implement",
        description: "WebRTC implementation project.",
        longDescription: "Next.js app experimenting with WebRTC capabilities.",
        techStack: ["Next.js", "WebRTC"],
        link: "https://github.com/Hiteshydv001/WebRTc-implement",
        category: "web-dev",
        featured: false,
        highlights: ["Realtime"],
        keyFeatures: ["WebRTC setup", "Next.js integration"],
        images: [{ src: "/placeholder.png", alt: "WebRTc-implement" }]
    },
    {
        title: "Whatsapp-MCP",
        description: "MCP server for WhatsApp automation.",
        longDescription: "Model Context Protocol server focused on WhatsApp automation workflows.",
        techStack: ["MCP", "Node.js"],
        link: "https://github.com/Hiteshydv001/Whatsapp-MCP",
        category: "utilities",
        featured: false,
        highlights: ["MCP"],
        keyFeatures: ["WhatsApp automation", "Tool exposure"],
        images: [{ src: "/placeholder.png", alt: "Whatsapp-MCP" }]
    },
    {
        title: "wine-price-predict",
        description: "Wine quality prediction using machine learning.",
        longDescription: "ML regression models to predict wine quality from chemical properties.",
        techStack: ["Python", "Scikit-learn"],
        link: "https://github.com/Hiteshydv001/wine-price-predict",
        category: "machine-learning",
        featured: false,
        highlights: ["Regression"],
        keyFeatures: ["Feature analysis", "Quality prediction"],
        images: [{ src: "/placeholder.png", alt: "wine-price-predict" }]
    }
];
