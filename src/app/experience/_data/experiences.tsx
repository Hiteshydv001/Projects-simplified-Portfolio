'use client'
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Experience } from "../_types/experience";

export const experiences: Experience[] = [
  {
    title: "Software Development Engineer (SDE) — AI/ML",
    company: "Pharmacoevidence",
    location: "Chandigarh, India · Hybrid",
    period: "Jan 2026 - Present",
    description: [
      "Working on Evaior (evaior.com), an AI-powered research intelligence platform for pharmaceutical and HTA/HEOR teams.",
      "Building and scaling backend and data workflows for AI-assisted research operations.",
      "Contributing to production-grade GenAI and analytics features for domain teams.",
    ],
    technologies: ["Python", "FastAPI", "React", "Redux", "Apache Kafka", "PostgreSQL", "AWS", "Claude LLM", "Plotly", "Docker", "RAG"],
    image: "/images/pharmacoevidence_logo.jpg",
    companyUrl: "https://evaior.com",
    certificateUrl: "https://drive.google.com/file/d/1rceZxiSF4eK9RFk9c_8AnO-GdRxgIt_n/view?usp=sharing",
    slug: "pharmacoevidence-sde-ai-ml",
    content: (
      <div>
        <p>
          Working as an SDE in AI/ML on Evaior, a research intelligence platform focused on pharmaceutical and HTA/HEOR workflows.
        </p>
        <h3>Core Contributions</h3>
        <ul>
          <li>Developing reliable backend APIs and AI pipeline integrations for research use cases</li>
          <li>Designing scalable event/data flows using Kafka and PostgreSQL</li>
          <li>Shipping frontend + backend features with strong focus on performance and usability</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>
          Python, FastAPI, React, Redux, Apache Kafka, PostgreSQL, AWS, Claude LLM, Plotly, Docker, RAG
        </p>
      </div>
    ),
  },
  {
    title: "AI Intern",
    company: "Evalvia.Ai",
    location: "Noida, Uttar Pradesh, India · Remote",
    period: "Nov 2025 - Feb 2026",
    description: [
      "Optimized the OCR -> rubric -> answer generation pipeline from ~2m40s to ~1m30s (~44% faster).",
      "Improved OCR quality for handwritten and multi-page answer sheets.",
      "Implemented robust question-to-answer mapping with accurate bounding-box rendering in review flows.",
    ],
    technologies: ["Machine Learning", "OCR", "Computer Vision", "Pipeline Optimization"],
    image: "/images/evalvia_logo.jpg",
    companyUrl: "https://evalvia.el.r.appspot.com/",
    certificateUrl: "https://drive.google.com/file/d/1oplxC0-WDFYlU9XvDKJfpt5apNvSPeC2/view?usp=sharing",
    slug: "evalvia-ai-intern",
    content: (
      <div>
        <p>
          During my AI internship at Evalvia.Ai, I focused on improving the reliability and speed of the answer-evaluation pipeline.
        </p>
        <h3>Key Outcomes</h3>
        <ul>
          <li>Reduced end-to-end pipeline latency by about 44%</li>
          <li>Increased OCR accuracy on challenging handwritten and multi-page inputs</li>
          <li>Enabled precise location-aware answer mapping for grading and feedback UX</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Project Administrator",
    company: "GirlScript Summer of Code",
    location: "GitHub · Remote",
    period: "Jul 2025 - Nov 2025",
    description: [
      "Led two selected open-source voice AI projects and mentored contributors through implementation and delivery.",
      "Drove architecture and development across real-time voice agents, no-code dashboards, and deployment flows.",
      "Supported feature planning, issue breakdown, contributor onboarding, and release readiness.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Next.js", "React", "TypeScript", "WebSockets", "Docker", "Redis", "Ollama", "faster-whisper", "Coqui TTS"],
    image: "/images/girlscriptsoc_logo.jpg",
    companyUrl: "https://gssoc.girlscript.org/",
    slug: "gssoc-project-administrator",
    content: (
      <div>
        <p>
          Served as Project Administrator for two GSSoC open-source projects centered on voice AI systems and tooling.
        </p>
        <h3>Projects Led</h3>
        <h4>DialogWeaver</h4>
        <ul>
          <li>Provider-agnostic platform for real-time interruptible voice agents</li>
          <li>No-code dashboard for creating and testing agents</li>
          <li>Self-hostable stack with Docker for secure deployments</li>
        </ul>
        <h4>Voice Marketing Agents</h4>
        <ul>
          <li>Framework for low-cost customizable voice AI for business use cases</li>
          <li>Sub-2-second response targeting with optimized speech and LLM pipeline</li>
          <li>Docker Compose based deployment and contributor-friendly architecture</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Contributor",
    company: "Hacktoberfest",
    location: "GitHub · Remote",
    period: "Oct 2025",
    description: [
      "Contributed accepted pull requests for chatbot integrations and UI improvements.",
      "Worked across multiple repositories and followed open-source review cycles.",
      "Documented learnings from both accepted and non-accepted contributions.",
    ],
    technologies: ["Open Source", "Frontend", "AI Chatbot Integration"],
    image: "/images/hacktoberfest_logo.jpg",
    companyUrl: "https://hacktoberfest.com/",
    slug: "hacktoberfest-contributor-2025",
    content: (
      <div>
        <p>
          Contributed to Hacktoberfest projects with focus on chatbot integration and UI enhancement tasks.
        </p>
        <h3>Accepted Contributions</h3>
        <ul>
          <li><a href="https://lnkd.in/g6gkwCvU" target="_blank" rel="noopener noreferrer">Adding Chatbot Integration</a></li>
          <li><a href="https://lnkd.in/g8mC9YFe" target="_blank" rel="noopener noreferrer">Adding Chatbot Integration</a></li>
          <li><a href="https://lnkd.in/gArjzHVx" target="_blank" rel="noopener noreferrer">Changes to UI</a></li>
          <li><a href="https://lnkd.in/g3PkTNWX" target="_blank" rel="noopener noreferrer">Add AI Chatbot Integration</a></li>
        </ul>
        <h3>Learning Contribution</h3>
        <ul>
          <li><a href="https://lnkd.in/gKbPaZwa" target="_blank" rel="noopener noreferrer">Tarjan Algorithm Changes (not accepted)</a></li>
        </ul>
      </div>
    ),
  },
  {
    title: "ML Intern",
  company: "100GAJ (now Algoric — Gajsphere Pvt Ltd)",
    location: "Remote",
    period: "Jun 2025 - Sep 2025",
    description: [
      "Developed a custom RAG (Retrieval-Augmented Generation) chatbot for real estate domain",
      "Integrated chatbot with property data scraping tools using Playwright and BeautifulSoup",
      "Implemented semantic search using vector databases for property listings",
    ],
    technologies: ["RAG", "Playwright", "BeautifulSoup", "Vector Databases", "Semantic Search"],
    image: "/images/100GAJ.jpeg",
    companyUrl: "https://100gaj.vercel.app/",
  certificateUrl: "https://drive.google.com/file/d/1tF8K2gljfjIIMduTOPwCzDwu25piVmRR/view?usp=sharing",
  additionalCertificateUrl: "https://drive.google.com/file/d/14leddMGIZ865mQ4-ejngbDMp31bgwNFN/view?usp=sharing",
  lorUrl: "https://drive.google.com/file/d/1YjfCSw7-Heb2wxxJkbstSxhyDfrEk3kh/view?usp=sharing",
    githubUrl: "https://github.com/Hiteshydv001/100-GAJ-RAG",
    slug: "100gaj",
    content: (
      <div>
        <p>
          As an ML Intern at 100GAJ, I played a key role in developing an AI-powered PropTech solution that revolutionized property discovery and user interaction through a custom RAG chatbot system.
        </p>
        <h3>Project Overview</h3>
        <ul>
          <li>Built a domain-specific RAG architecture for real estate queries</li>
          <li>Created an autonomous data processing pipeline for property information</li>
          <li>Implemented real-time response generation for user queries</li>
          <li>Enhanced user experience through intelligent property matching</li>
        </ul>
        <h3>Technical Implementation</h3>
        <ul>
          <li>Designed and deployed a custom RAG architecture</li>
          <li>Integrated web scraping using Playwright and BeautifulSoup</li>
          <li>Implemented vector database for semantic property search</li>
          <li>Developed preference-based matching algorithms</li>
        </ul>
        <h3>Collaboration & Impact</h3>
        <ul>
          <li>Worked closely with ML Executive for system optimization</li>
          <li>Coordinated with content team for aligned messaging</li>
          <li>Improved customer support automation</li>
          <li>Enhanced user engagement metrics</li>
        </ul>
        <h3>Key Achievements</h3>
        <p>
          Successfully developed and deployed a RAG-based AI system that streamlined property discovery and automated customer support. The project demonstrated the effective application of retrieval-augmented AI in the real estate sector.
        </p>
        <p>
          Note: 100GAJ has been rebranded — currently known as Algoric. The parent company is Gajsphere Pvt Ltd.
        </p>
        <p>
          View the project on <a href="https://github.com/Hiteshydv001/100-GAJ-RAG" target="_blank" rel="noopener noreferrer">GitHub →</a>
        </p>
        <div className="mt-2 flex flex-col space-y-2">
          <a href="https://drive.google.com/file/d/14leddMGIZ865mQ4-ejngbDMp31bgwNFN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">Completion Certificate →</a>
          <a href="https://drive.google.com/file/d/1YjfCSw7-Heb2wxxJkbstSxhyDfrEk3kh/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">Letter of Recommendation (LOR) →</a>
        </div>
      </div>
    ),
  },
  {
    title: "Project Maintainer",
    company: "Delta Winter of Code",
    location: "Github · Remote",
    period: "Jan 2025 - Mar 2025",
    description: [
      "Delta Winter of Code (DWoC) is an open source initiative by Delta Force, NIT Trichy's official coding club, which serves as a platform for any developer, newbie or expert to make open source contributions.",
      "DWoC is structured slightly different from popular open source projects.",
      "Our selected project was Guard AI, an advanced remote proctoring system.",
    ],
    technologies: ["Machine Learning", "Deep Learning", "Remote Proctoring"],
    image: "/images/DWOC.png",
    companyUrl: "https://delta.github.io/dwoc23-docs/docs/about",
    certificateUrl: "https://drive.google.com/file/d/11vrYCd-lK69NKZeIH6y86-Gb0b2yYlEU/view?usp=sharing",
    slug: "delta-winter-of-code",
    content: (
      <div>
        <p>
          As a Project Maintainer at Delta Winter of Code (DWoC), I led the development of Guard AI, a sophisticated remote proctoring system. DWoC is an initiative by Delta Force, NIT Trichy's official coding club, designed to foster open source contributions from developers of all skill levels.
        </p>
        <h3>Project Details - Guard AI</h3>
        <ul>
          <li>Developed a comprehensive remote proctoring system</li>
          <li>Implemented advanced AI-based monitoring features</li>
          <li>Created a user-friendly interface for proctors and examinees</li>
          <li>Project showcase: <a href="https://guard-ai-proctor.vercel.app/" target="_blank" rel="noopener noreferrer">Guard AI Proctor</a></li>
        </ul>
        <h3>Program Structure</h3>
        <ul>
          <li>12-week winter program focused on open source contributions</li>
          <li>Managed varying difficulty levels of issues for contributors</li>
          <li>Provided mentorship to new contributors</li>
          <li>Strengthened the open source community through collaborative development</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Machine Learning for behavior analysis</li>
          <li>Deep Learning for real-time monitoring</li>
          <li>Remote Proctoring systems and protocols</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Project Maintainer",
    company: "JGEC Winter of Code",
    location: "Github · Remote",
    period: "Jan 2025 - Mar 2025",
    description: [
      "JWoC offers an immersive learning experience, fostering a vibrant community of developers. This program selects the best projects to promote open-source excellence.",
      "Selected as project maintainer for two flagship projects: Guard AI and LinkedIn-Automation",
      "Guard AI: An advanced AI-powered proctoring system ensuring fairness and security in remote assessments through cutting-edge machine learning.",
      "LinkedIn-Automation: Revolutionizing professional networking with post scraping, sentiment analysis, and AI-driven comment generation.",
    ],
    technologies: ["Selenium", "Artificial Intelligence", "Machine Learning", "Python"],
    image: "/images/Jwoc.jpeg",
    companyUrl: "https://www.jwoc.in/",
    certificateUrl: "https://drive.google.com/file/d/1PDz0Y5my24paC_IG7prgku_k9_r62gew/view?usp=sharing",
    slug: "jgec-winter-of-code",
    content: (
      <div>
        <p>
          At JGEC Winter of Code (JWoC), I served as a project maintainer for two innovative projects that showcase the intersection of AI and automation. JWoC is a platform that fosters a vibrant community of developers while promoting open-source excellence.
        </p>
        <h3>Project Details</h3>
        <h4>🔹 Guard AI</h4>
        <ul>
          <li>Developed an advanced AI-powered proctoring system</li>
          <li>Implemented cutting-edge machine learning for remote assessment security</li>
          <li>Ensured fairness and integrity in online examinations</li>
          <li>Project showcase: <a href="https://guard-ai-proctor.vercel.app/" target="_blank" rel="noopener noreferrer">Guard AI Proctor</a></li>
        </ul>
        <h4>🔹 LinkedIn-Automation</h4>
        <ul>
          <li>Built a comprehensive LinkedIn automation platform</li>
          <li>Implemented post scraping functionality</li>
          <li>Developed sentiment analysis for content evaluation</li>
          <li>Created AI-driven comment generation system</li>
          <li>Project showcase: <a href="https://linkedin-automate.vercel.app/" target="_blank" rel="noopener noreferrer">LinkedIn Automation Tool</a></li>
        </ul>
        <h3>Key Features of LinkedIn-Automation</h3>
        <ul>
          <li>✅ AI-Powered Post Writing: Generate engaging LinkedIn posts with AI assistance</li>
          <li>✅ Post Summarization: Quickly analyze and summarize LinkedIn posts</li>
          <li>✅ Automated Comment Generation: Create contextual, professional comments</li>
          <li>✅ Sentiment Analysis: Analyze content tone for perfect responses</li>
        </ul>
        <h3>Impact</h3>
        <ul>
          <li>Successfully developed and maintained two major open-source projects</li>
          <li>Fostered collaboration among community members</li>
          <li>Implemented innovative AI solutions for real-world problems</li>
          <li>Promoted open-source excellence through quality code and documentation</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Project Maintainer | Mentor",
    company: "Social Winter of Code (SWOC)",
    location: "Github · Remote",
    period: "Dec 2024 - Mar 2025",
    description: [
      "I invite you to contribute to this open-source project! You can either add value to the entire connected workflow or focus on specific features.",
      "Led open-source project contributions and mentored developers",
      "Managed both complete workflow contributions and feature-specific developments",
    ],
    technologies: ["Artificial Intelligence (AI)", "Python (Programming Language)", "Flask", "Next.js", "MongoDB"],
    image: "/images/SWOC.jpeg",
    companyUrl: "https://www.socialwinterofcode.com/",
    certificateUrl: "https://verification.givemycertificate.com/v/064d0645-ab24-412b-9472-6e072cd03ff4",
    additionalCertificateUrl: "https://drive.google.com/file/d/1OOPB5-An8L81kPzJFltITf7QrG_9GaPD/view?usp=sharing",
    slug: "social-winter-of-code",
    content: (
      <div>
        <p>
          As a Project Maintainer and Mentor at Social Winter of Code (SWOC), I focused on creating an inclusive environment for developers to contribute to open-source projects. The program was designed to allow contributors to either enhance the entire workflow or focus on specific features that matched their expertise.
        </p>
        <h3>Mentorship Highlights</h3>
        <ul>
          <li>Guided developers in choosing contribution areas based on their skills</li>
          <li>Provided support for both comprehensive workflow improvements and feature-specific contributions</li>
          <li>Created detailed documentation and contribution guidelines</li>
          <li>Fostered an inclusive and supportive development environment</li>
        </ul>
        <h3>Technical Leadership</h3>
        <ul>
          <li>Managed project architecture and technical decisions</li>
          <li>Reviewed and merged quality contributions</li>
          <li>Implemented CI/CD pipelines for automated testing</li>
          <li>Maintained code quality and project standards</li>
        </ul>
        <h3>Certificates</h3>
        <div className="flex flex-col space-y-2">
          <a
            href="https://verification.givemycertificate.com/v/064d0645-ab24-412b-9472-6e072cd03ff4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            View Certificate (Verification Link) →
          </a>
          <a
            href="https://drive.google.com/file/d/1OOPB5-An8L81kPzJFltITf7QrG_9GaPD/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            View Certificate (Drive Link) →
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "VOIS & Vodafone Idea Foundation CSR program on Blockchain",
    company: "Vodafone Idea Foundation",
    location: "Remote",
    period: "Jan 2025 - Feb 2025",
    description: [
      "Blockchain-based Land Registry System using Ethereum, Solidity, and Web3.py to ensure secure, transparent, and immutable land ownership records.",
      "Developed as part of VOIS for Tech: University Engagement Program, a CSR initiative of Vodafone Intelligent Solutions.",
      "Implemented smart contracts for land ownership and transfer verification.",
    ],
    technologies: ["Blockchain", "Ganache", "Solidity", "Web3.py", "Ethereum", "Smart Contracts"],
    image: "/images/Vois.jpg",
    companyUrl: "https://voisfortech.com/",
    certificateUrl: "https://drive.google.com/file/d/16wZENUTz111dLnBSHvca9YInTB1QeGLk/view?usp=sharing",
    slug: "vodafone-idea-foundation",
    content: (
      <div>
        <p>
          As part of the VOIS for Tech: University Engagement Program, a CSR initiative by Vodafone Intelligent Solutions (VOIS), I developed a blockchain-based Land Registry System. This project demonstrates the practical application of blockchain technology in solving real-world problems.
        </p>
        <h3>Project Overview</h3>
        <ul>
          <li>Built a decentralized land registration system using Ethereum blockchain</li>
          <li>Implemented smart contracts for secure ownership transfer and verification</li>
          <li>Created a web interface for easy interaction with the blockchain</li>
          <li>Project Repository: <a href="https://github.com/Hiteshydv001/Land-Register-blockchain" target="_blank" rel="noopener noreferrer">Land Register Blockchain →</a></li>
        </ul>
        <h3>Key Features Implemented</h3>
        <ul>
          <li>🏡 Decentralized Land Registration</li>
          <li>🔗 Ownership Transfer with Smart Contracts</li>
          <li>🔍 Secure & Transparent Verification</li>
          <li>⚡ Fast & Immutable Transactions</li>
          <li>🎯 Web3 Integration with Python</li>
        </ul>
        <h3>Technical Implementation</h3>
        <ul>
          <li>Developed smart contracts using Solidity</li>
          <li>Used Ganache for local blockchain development</li>
          <li>Implemented Web3.py for blockchain interaction</li>
          <li>Deployed contracts on Sepolia testnet</li>
          <li>Created API endpoints for land registration and verification</li>
        </ul>
        <h3>Program Impact</h3>
        <p>
          The VOIS for Tech program is designed to enable students to acquire skills to design meaningful tech solutions for real-world problems. Through bootcamps, hackathons, and expert interactions, the program enhances employability in the ITSS sector.
        </p>
      </div>
    ),
  },
  {
    title: "Web Developer",
    company: "African Association of Entrepreneurs",
    location: "United States · Remote",
    period: "Oct 2024 - Jan 2025",
    description: [
      "I have designed french version of their main website also translated all the articles and blogs from english to french, It was based on wordpress CMS",
      "Implemented multilingual solutions using WordPress CMS",
      "Managed content translation and localization for French-speaking audiences",
    ],
    technologies: ["WordPress Design", "ARM", "WordPress CMS"],
    image: "/images/AAE.jpeg",
    companyUrl: "https://aaeafrica.org/",
    frenchWebsiteUrl: "https://aaeafrica.org/fr/home/",
    certificateUrl: "https://drive.google.com/file/d/1VvStie9MzGaqiNTDbAts7-oOIUvqligM/view?usp=sharing",
    slug: "african-association-entrepreneurs",
    content: (
      <div>
        <p>
          As a Web Developer at the African Association of Entrepreneurs (AAE), I was responsible for creating and implementing the French version of their website, making their content accessible to French-speaking audiences across Africa and globally.
        </p>
        <h3>Project Highlights</h3>
        <ul>
          <li>Developed complete French version of the website: <a href="https://aaeafrica.org/fr/home/" target="_blank" rel="noopener noreferrer">AAE French Portal →</a></li>
          <li>Translated and localized all articles and blog content</li>
          <li>Implemented multilingual WordPress solutions</li>
          <li>Maintained consistent branding across language versions</li>
        </ul>
        <h3>Technical Implementation</h3>
        <ul>
          <li>Utilized WordPress CMS for content management</li>
          <li>Implemented multilingual plugins and tools</li>
          <li>Ensured responsive design across all devices</li>
          <li>Optimized site performance for global access</li>
        </ul>
        <h3>Content Management</h3>
        <ul>
          <li>Translated main website content and navigation</li>
          <li>Localized blog posts and articles</li>
          <li>Maintained content parity between English and French versions</li>
          <li>Implemented SEO best practices for French content</li>
        </ul>
        <h3>Organization Impact</h3>
        <p>
          AAE is a volunteer-led organization founded in 2004, dedicated to fostering business development and reducing poverty. The French website expansion has helped them reach a broader audience across French-speaking African nations, supporting their mission of promoting sustainable entrepreneurship through education, information sharing, and networking support.
        </p>
      </div>
    ),
  },
  {
    title: "AI/ML Intern",
    company: "Edunet Foundation",
    location: "Remote · Remote",
    period: "Nov 2024 - Dec 2024",
    description: [
      "Out of 5000 candidates, only 40 projects were selected for the final presentation at a conference organized by the Government of India, evaluated by industry experts.",
      "Developed a waste classification system using CNN and YOLO for organic/non-organic categorization",
      "Built and deployed an interactive web application using Streamlit for real-time waste classification",
    ],
    technologies: ["Convolutional Neural Networks (CNN)", "Streamlit", "Python", "Kaggle", "YOLO"],
    image: "/images/edunet.jpeg",
    companyUrl: "https://edunetfoundation.org/",
    certificateUrl: "https://drive.google.com/file/d/1LabrUMezfBG0v8uir67VjIOj4L1Tc49L/view?usp=sharing",
    githubUrl: "https://github.com/Hiteshydv001/Waste-classification-model-cnn",
    deploymentUrl: "https://waste-classification-model-cnn.streamlit.app/",
    slug: "edunet-foundation",
    content: (
      <div>
        <p>
          During my internship at Edunet Foundation, I worked on an innovative waste classification project organized in collaboration with AICTE and SHELL. My project was among the top 40 selected out of 5000 candidates for the final presentation at a Government of India conference.
        </p>
        <h3>Project Highlights</h3>
        <ul>
          <li>Developed a CNN-based model for classifying waste into organic and non-organic categories</li>
          <li>Integrated YOLO pretrained model for enhanced object detection capabilities</li>
          <li>Created an interactive web application using Streamlit for real-time waste classification</li>
          <li>Project selected among top 40 from 5000+ submissions nationwide</li>
        </ul>
        <h3>Technical Implementation</h3>
        <ul>
          <li>Built and trained a Convolutional Neural Network for waste classification</li>
          <li>Implemented YOLO object detection for precise waste identification</li>
          <li>Developed a user-friendly interface using Streamlit</li>
          <li>Deployed the application for public access: <a href="https://waste-classification-model-cnn.streamlit.app/" target="_blank" rel="noopener noreferrer">Live Demo →</a></li>
        </ul>
        <h3>Project Architecture</h3>
        <ul>
          <li>CNN model with multiple convolutional and pooling layers</li>
          <li>Image preprocessing and normalization pipeline</li>
          <li>Real-time prediction system with confidence scores</li>
          <li>Interactive UI for image upload and classification</li>
        </ul>
        <h3>Impact & Recognition</h3>
        <p>
          The project was recognized for its innovative approach to waste management and environmental sustainability. It was evaluated by industry experts and selected for presentation at a national conference, demonstrating its potential impact on real-world waste management solutions.
        </p>
        <p>
          View the complete project on <a href="https://github.com/Hiteshydv001/Waste-classification-model-cnn" target="_blank" rel="noopener noreferrer">GitHub →</a>
        </p>
      </div>
    ),
  },
  {
    title: "Volunteer",
    company: "Think Blue Data",
    location: "Thailand · Remote",
    period: "Sep 2024 - Oct 2024",
    description: [
      "Helped in annotation of complete dataset of building topology, passive features and building type",
      "Assisted in developing a model dataset for societal planning in Asian countries specifically Thailand",
      "Contributed to data quality improvement and annotation accuracy",
    ],
    technologies: ["Label Studio", "Annotation", "Machine Learning", "Artificial Intelligence (AI)"],
    image: "/images/thinkbluedata.png",
    companyUrl: "https://www.thinkbluedata.com/",
    certificateUrl: "https://drive.google.com/file/d/1kRmkiRSCGeuIPnP-Bozolz4wm3cGNKWp/view?usp=sharing",
    slug: "think-blue-data",
    content: (
      <div>
        <p>
          As a volunteer at Think Blue Data, I contributed to a significant urban planning project focused on Thailand and other Asian countries. The project involved comprehensive data annotation and model dataset development for societal planning initiatives.
        </p>
        <h3>Key Contributions</h3>
        <ul>
          <li>Annotated extensive datasets of building topology and passive features</li>
          <li>Developed structured datasets for urban planning models</li>
          <li>Focused on Thailand-specific architectural and urban patterns</li>
          <li>Enhanced data quality through careful annotation and validation</li>
        </ul>
        <h3>Technical Work</h3>
        <ul>
          <li>Utilized Label Studio for efficient data annotation</li>
          <li>Applied machine learning principles to data organization</li>
          <li>Implemented AI-driven annotation quality checks</li>
          <li>Contributed to building type classification systems</li>
        </ul>
        <h3>Project Impact</h3>
        <ul>
          <li>Improved dataset accuracy for urban planning models</li>
          <li>Supported sustainable development initiatives in Thailand</li>
          <li>Contributed to regional architectural analysis</li>
          <li>Enhanced societal planning data infrastructure</li>
        </ul>
        <h3>Skills Development</h3>
        <p>
          This volunteer experience enhanced my expertise in data annotation, machine learning applications in urban planning, and understanding of architectural topology analysis. Working with international datasets provided valuable insights into cross-cultural urban development patterns.
        </p>
      </div>
    ),
  },
  {
    title: "Generation Green Internship",
    company: "All India Council for Technical Education (AICTE)",
    location: "Remote · Remote",
    period: "Aug 2024 - Oct 2024",
    description: [
      "This internship was organized by AICTE and Oppo India to develop green skills among tech enthusiasts",
      "Learned about e-waste management systems and sustainable technology practices",
      "Participated in AI-focused training sessions for environmental solutions",
    ],
    technologies: ["AI", "Green Skills", "E-Waste Recycling"],
    image: "/images/GenerationGreen.png",
    companyUrl: "https://iamgenerationgreen.in/",
    certificateUrl: "https://drive.google.com/file/d/1oqFGx8rmfTkR2Xll7OAWpgM9d7fAxZtw/view?usp=sharing",
    slug: "generation-green-aicte",
    content: (
      <div>
        <p>
          Participated in the Generation Green Internship program, a collaborative initiative between AICTE and OPPO India designed to empower tech enthusiasts with green skills and environmental awareness.
        </p>
        <h3>Program Highlights</h3>
        <ul>
          <li>Comprehensive training in e-waste management systems and practices</li>
          <li>Integration of AI technologies with environmental solutions</li>
          <li>Focus on sustainable technology development</li>
          <li>Part of a nationwide initiative to build an eco-conscious India</li>
        </ul>
        <h3>Key Learnings</h3>
        <ul>
          <li>E-waste management principles: Repair, Reuse, and Recycle</li>
          <li>Application of AI in environmental sustainability</li>
          <li>Green skills development and implementation</li>
          <li>Sustainable technology practices and innovations</li>
        </ul>
        <h3>Project Contributions</h3>
        <ul>
          <li>Participated in sustainability challenges and activities</li>
          <li>Engaged in environmental awareness initiatives</li>
          <li>Learned about UN sustainable development goals</li>
          <li>Contributed to eco-friendly technology solutions</li>
        </ul>
        <h3>Impact</h3>
        <p>
          The program provided valuable insights into combining technology with environmental consciousness, preparing participants to be catalysts for positive change in the tech industry while promoting sustainable practices and e-waste management solutions.
        </p>
      </div>
    ),
  },
];
