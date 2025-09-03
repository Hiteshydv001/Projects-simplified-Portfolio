export type ProjectCategory = 
    | "ai-fullstack"
    | "machine-learning"
    | "blockchain";

// Used for filtering in the UI
export const projectFilters = [
    { value: 'featured', label: 'Featured Projects' },
    { value: 'ai-fullstack', label: 'AI & Full Stack' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'web-dev', label: 'Web Development' }
] as const;

export const categoryLabels: Record<ProjectCategory, string> = {
    "ai-fullstack": "AI & Full Stack",
    "machine-learning": "Machine Learning",
    "blockchain": "Blockchain"
};

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    link: string;
    live?: string;
    featured?: boolean;
    category: ProjectCategory;
    highlights?: string[];
    longDescription?: string;
    images?: {
        src: string;
        alt: string;
    }[];
    keyFeatures?: string[];
    learnings?: string[];
    challenges?: string[];
    implementation?: string[];
    futureWork?: string[];
}
